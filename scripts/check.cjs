const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.name === 'vendor' ? [] : entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]); }
const files = [...walk(path.join(root, 'dist')), ...walk(path.join(root, 'scripts')), ...walk(path.join(root, 'research')), path.join(root, 'prepare-heights.cjs')];
for (const filename of files) {
  if (/\.(js|cjs)$/.test(filename)) {
    const result = cp.spawnSync(process.execPath, ['--check', filename], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
  }
  if (filename.endsWith('.json')) JSON.parse(fs.readFileSync(filename, 'utf8'));
}
const dist = path.join(root, 'dist');
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  const url = match[1].split(/[?#]/)[0];
  if (!url || /^(?:[a-z]+:|\/\/)/i.test(url)) continue;
  assert(fs.existsSync(path.join(dist, url)), `Missing local asset: ${url}`);
}
for (const filename of ['campus.json', 'heights.json', 'parking.json', 'reported-entrances.json']) JSON.parse(fs.readFileSync(path.join(dist, filename), 'utf8'));
assert(fs.existsSync(path.join(root, 'docs/AccessPath-ULeth-Project-Report.docx')));
console.log('JavaScript syntax, JSON data, report presence and local asset links passed.');
