import fs from 'fs';
import path from 'path';

function scanComponents() {
  const dir = './src/components';
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f.endsWith('.tsx')) {
      const content = fs.readFileSync(path.join(dir, f), 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (line.includes('/blog')) {
          console.log(`${f}:${idx + 1} -> ${line.trim()}`);
        }
      });
    }
  }
}

scanComponents();
