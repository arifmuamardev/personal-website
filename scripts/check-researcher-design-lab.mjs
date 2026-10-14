import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';

const filename = 'public/design-lab/researcher-directions/index.html';
const html = readFileSync(filename, 'utf8');
const errors = [];
const must = (condition, message) => { if (!condition) errors.push(message); };

must(/<meta\s+name="robots"\s+content="noindex/i.test(html), 'Design Lab must be noindex.');
must(/<main\s+id="content"/.test(html), 'Missing main landmark.');
must(/data-pick="a"/.test(html) && /data-pick="b"/.test(html) && /data-pick="c"/.test(html), 'Missing a design selector.');
for (const id of ['a', 'b', 'c']) {
  const section = new RegExp('class="concept concept-' + id + '"[^>]*data-concept="' + id + '"');
  must(section.test(html), 'Missing prototype for ' + id.toUpperCase());
}
must(/data-concept="b"[^>]*>/.test(html), 'B should exist as the default prototype.');
must(/data-concept="a" hidden/.test(html) && /data-concept="c" hidden/.test(html), 'Only B should be visible by default.');
must(/data-device-pick="phone"/.test(html), '390px comparison control not found.');
must(/id="theme-toggle"/.test(html), 'Theme switch is missing.');
must(/@container\s*\(max-width:/.test(html), 'Container-query support for 390px preview is missing.');
must(!/<img\b[^>]+src=["']https?:/i.test(html), 'Lab must not hotlink third-party portraits/screenshots.');
must(!/https?:\/\/[^"']+supabase\.co/i.test(html), 'No live app/backend API endpoint should be placed in a mockup.');

const inlineScripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)];
must(inlineScripts.length === 1, 'Expected one inline interactive script.');
for (const [index, match] of inlineScripts.entries()) {
  try { new Script(match[1], { filename: filename + '#script-' + index }); }
  catch (error) { errors.push('JavaScript syntax: ' + error.message); }
}
if (errors.length) {
  console.error('Design comparison lab audit FAIL:\n' + errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Design comparison lab audit PASS: A/B/C, responsive controls, noindex and valid JavaScript.');
}
