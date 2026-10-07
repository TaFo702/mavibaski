import fs from 'fs';
import path from 'path';

function scanAll(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist' && f !== 'backup_files') {
        scanAll(full, fileList);
      }
    } else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.json') || f.endsWith('.html')) {
      fileList.push(full);
    }
  }
  return fileList;
}

const allFiles = scanAll('./src');
console.log(`Total files to scan: ${allFiles.length}`);

const allBlogLinks = new Map<string, { file: string; line: number; text: string }[]>();

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Check for any /blog/... or blog/...
    const regex = /(?:href=|to=|["'`(])\/blog\/([a-zA-Z0-9_.-]+)/g;
    let match;
    while ((match = regex.exec(line)) !== null) {
      const slug = match[1];
      if (!allBlogLinks.has(slug)) allBlogLinks.set(slug, []);
      allBlogLinks.get(slug)!.push({ file, line: idx + 1, text: line.trim() });
    }
  });
}

console.log(`Found ${allBlogLinks.size} unique blog link targets:`);
for (const [slug, refs] of allBlogLinks.entries()) {
  console.log(`- ${slug} (${refs.length} occurrences in ${new Set(refs.map(r => r.file)).size} files)`);
}
