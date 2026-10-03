import * as fs from 'fs';
import * as path from 'path';

function searchFiles(dir: string, pattern: RegExp) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        searchFiles(fullPath, pattern);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (pattern.test(content)) {
        console.log(`Match in ${fullPath}`);
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
          if (pattern.test(line)) {
            console.log(`  Line ${idx + 1}: ${line.trim()}`);
          }
        });
      }
    }
  }
}

console.log('Searching for "ItemList"...');
searchFiles(path.join(process.cwd(), 'src'), /ItemList/i);
searchFiles(process.cwd(), /ItemList/i);
