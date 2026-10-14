import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const production = process.env.PUBLIC_SITE_MODE === 'production';
const base = production ? '/' : '/personal-website/';

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const filename = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(filename));
    else out.push(filename);
  }
  return out;
}

function toFile(url, fromFile) {
  if (/^(?:https?:)?\/\//i.test(url) || /^(?:mailto:|tel:|data:|#)/i.test(url)) return null;
  const clean = url.split('#')[0].split('?')[0];
  if (!clean) return null;
  let rel;
  if (clean.startsWith('/')) {
    if (!clean.startsWith(base)) return { error: `missing ${base} prefix`, url };
    rel = clean.slice(base.length);
  } else {
    rel = path.relative(root, path.resolve(path.dirname(fromFile), clean));
  }
  const target = path.resolve(root, rel);
  if (!target.startsWith(`${root}${path.sep}`) && target !== root) return { error: 'path escapes output directory', url };
  return { target: path.extname(target) ? target : path.join(target, 'index.html'), url };
}

const missing = [];
const htmlFiles = (await walk(root)).filter(file => file.endsWith('.html'));
for (const file of htmlFiles) {
  const html = await fs.readFile(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const value = toFile(match[1], file);
    if (!value) continue;
    if (value.error) { missing.push(`${path.relative(root, file)}: ${value.url} (${value.error})`); continue; }
    try { await fs.access(value.target); }
    catch { missing.push(`${path.relative(root, file)}: ${value.url} missing target ${path.relative(root, value.target)}`); }
  }
}
if (missing.length) {
  console.error(`Found ${missing.length} broken/prefix-invalid local URLs:\n${missing.join('\n')}`);
  process.exitCode = 1;
} else console.log(`Link + asset audit PASS (${htmlFiles.length} generated pages, mode: ${production ? 'production' : 'preview'}).`);
