// Post-build fix for Next 16 static export: segment prefetch payloads are written
// as nested files (e.g. __next.projects/$d$slug.txt) but the client requests the
// flattened name (__next.projects.$d$slug.txt), so every prefetch 404s and
// client-side navigation loses its instant feel. Write flattened copies next to
// the originals. Safe to keep if Next changes its layout: it only copies what exists.
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('out');
let copied = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('__next.')) flatten(full, dir, entry.name);
    else walk(full);
  }
}

function flatten(segDir, parent, prefix) {
  for (const entry of fs.readdirSync(segDir, { withFileTypes: true })) {
    const full = path.join(segDir, entry.name);
    const flatName = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) flatten(full, parent, flatName);
    else if (entry.name.endsWith('.txt')) {
      const target = path.join(parent, flatName);
      if (!fs.existsSync(target)) {
        fs.copyFileSync(full, target);
        copied++;
      }
    }
  }
}

if (fs.existsSync(OUT)) walk(OUT);
console.log(`flatten-rsc-segments: wrote ${copied} file(s)`);
