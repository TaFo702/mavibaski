import * as fs from 'fs';
import * as path from 'path';

function searchInDir(dir: string, term: string) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git') searchInDir(p, term);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      const txt = fs.readFileSync(p, 'utf-8');
      if (txt.includes(term)) {
        console.log(`Found "${term}" in ${p}`);
        txt.split('\n').forEach((line, i) => {
          if (line.includes(term)) {
            console.log(`  Line ${i+1}: ${line.trim()}`);
          }
        });
      }
    }
  }
}

searchInDir(path.join(process.cwd(), 'src'), 'CityLinksSection');
