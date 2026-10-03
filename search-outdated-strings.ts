import * as fs from 'fs';
import * as path from 'path';

const searchTerms = [
  'mavibasdoc.com',
  'www.mavibasim.com',
  '+902120000000',
  'Topkapı Matbaacılar Sitesi',
  'Litros Yolu'
];

function searchDir(dir: string, term: string, matches: string[]) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist' && f !== 'schema-audit' && f !== 'backup_files') {
        searchDir(p, term, matches);
      }
    } else if (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.json') || f.endsWith('.html')) {
      if (f.endsWith('.json') && (f.includes('audit') || f.includes('results'))) continue;
      const content = fs.readFileSync(p, 'utf-8');
      if (content.includes(term)) {
        content.split('\n').forEach((line, lineNo) => {
          if (line.includes(term)) {
            matches.push(`${p}:${lineNo + 1} -> ${line.trim()}`);
          }
        });
      }
    }
  }
}

console.log('=== SOURCE CODE SEARCH RESULTS FOR OUTDATED STRINGS ===\n');

for (const term of searchTerms) {
  console.log(`--- Searching for: "${term}" ---`);
  const matches: string[] = [];
  searchDir(path.join(process.cwd(), 'src'), term, matches);
  if (fs.existsSync(path.join(process.cwd(), 'index.html'))) {
    searchDir(process.cwd(), term, matches);
  }
  if (matches.length === 0) {
    console.log('No matches found.\n');
  } else {
    matches.forEach(m => console.log(`  ${m}`));
    console.log('');
  }
}
