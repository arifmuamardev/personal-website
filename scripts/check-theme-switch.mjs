import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const layout = readFileSync('src/layouts/Layout.astro', 'utf8');
const css = readFileSync('src/styles/global.css', 'utf8');
const projects = readFileSync('src/pages/projects.astro', 'utf8');
const fails = [];

function check(condition, why) {
  if (!condition) fails.push(why);
}

check(css.includes(':root[data-theme="dark"]'), 'missing explicit dark palette');
check(!css.includes('@media (prefers-color-scheme: dark)'), 'legacy OS-only dark palette remains in global CSS');
check(!projects.includes('@media (prefers-color-scheme: dark)'), 'projects badge colors ignore user-selected theme');
check(projects.includes(':global(html[data-theme="dark"])'), 'projects lack dark-theme badge selector');
check(layout.includes('data-theme-toggle'), 'header theme control absent');
check(layout.includes('aria-pressed="false"'), 'theme button missing initial toggle state');
check(layout.includes('data-theme-label'), 'theme label missing');
check(layout.includes('theme-icon-sun') && layout.includes('theme-icon-moon'), 'sun/moon visual states missing');
check(layout.includes("localStorage.setItem(themeKey, nextTheme)"), 'selected preference not persisted');
check(layout.includes("themeMedia.addEventListener('change'"), 'system theme changes not followed in automatic mode');

const bootstrap = layout.match(/<script is:inline>([\s\S]*?)<\/script>/)?.[1];
check(Boolean(bootstrap), 'prepaint initialization script is absent');

if (bootstrap) {
  try {
    const program = new vm.Script(bootstrap, { filename: 'Layout.astro#prepaint' });
    for (const testCase of [
      { name: 'system dark', stored: null, systemDark: true, expected: 'dark' },
      { name: 'system light', stored: null, systemDark: false, expected: 'light' },
      { name: 'saved light overrides dark OS', stored: 'light', systemDark: true, expected: 'light' },
      { name: 'saved dark overrides light OS', stored: 'dark', systemDark: false, expected: 'dark' },
      { name: 'invalid saved value', stored: 'auto', systemDark: true, expected: 'dark' },
      { name: 'blocked storage', stored: null, systemDark: true, expected: 'dark', blocked: true },
    ]) {
      const documentElement = { dataset: {} };
      const themeColor = { value: null, setAttribute(key, val) { if (key === 'content') this.value = val; } };
      const context = {
        document: {
          documentElement,
          querySelector(sel) { return sel === 'meta[name="theme-color"]' ? themeColor : null; },
        },
        window: { matchMedia() { return { matches: testCase.systemDark }; } },
        localStorage: {
          getItem() { if (testCase.blocked) throw new Error('storage unavailable'); return testCase.stored; },
        }
      };
      program.runInNewContext(context);
      check(documentElement.dataset.theme === testCase.expected, testCase.name + ': expected ' + testCase.expected + ', got ' + documentElement.dataset.theme);
      check(themeColor.value === (testCase.expected === 'dark' ? '#141c20' : '#ffffff'), testCase.name + ': theme-color mismatch');
    }
  } catch (error) {
    fails.push('Prepaint theme script error: ' + error.message);
  }
}

const headerScript = layout.match(/<!-- Theme preference:[\s\S]*?<script>([\s\S]*?)<\/script>/)?.[1];
check(Boolean(headerScript), 'interactive theme switch handler not found');
if (headerScript) {
  try { new vm.Script(headerScript, { filename: 'Layout.astro#theme-interaction' }); }
  catch (error) { fails.push('Interactive script syntax: ' + error.message); }
}

if (fails.length) {
  console.error('Theme contract FAIL:\n' + fails.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Theme contract PASS: saved preference, system defaults, blocked storage, accessible control and both theme palettes.');
}
