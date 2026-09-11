import * as fs from 'fs';
import * as path from 'path';

function searchSchemaScript(dir: string) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist' && f !== 'schema-audit') {
        searchSchemaScript(p);
      }
    } else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.html')) {
      const txt = fs.readFileSync(p, 'utf-8');
      if (txt.includes('application/ld+json') || txt.includes('schema.org')) {
        console.log(`Schema code in: ${p}`);
      }
    }
  }
}

console.log('=== ALL FILES WITH JSON-LD / SCHEMA.ORG CODE ===');
searchSchemaScript(path.join(process.cwd(), 'src'));
if (fs.existsSync(path.join(process.cwd(), 'index.html'))) {
  searchSchemaScript(process.cwd());
}
