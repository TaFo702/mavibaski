import { BLOG_POSTS } from './src/data/blogData.js';
import fs from 'fs';
import path from 'path';

const blogSlugs = new Set(BLOG_POSTS.map(p => p.slug));

function scanDir(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== 'backup_files') {
        scanDir(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.html') || file.endsWith('.xml') || file.endsWith('.json')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = scanDir('.');

console.log('--- Scanning entire project for all /blog/ links ---');
const missingMap = new Map<string, { file: string; line: number; text: string }[]>();

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const regex = /\/blog\/([a-zA-Z0-9_-]+)/g;
    let match;
    while ((match = regex.exec(line)) !== null) {
      const slug = match[1];
      if (!blogSlugs.has(slug)) {
        if (!missingMap.has(slug)) missingMap.set(slug, []);
        missingMap.get(slug)!.push({ file, line: idx + 1, text: line.trim() });
      }
    }
  });
}

for (const [slug, refs] of missingMap.entries()) {
  console.log(`\n❌ Missing slug: "${slug}" (${refs.length} references)`);
  refs.forEach(r => console.log(`   ${r.file}:${r.line} -> ${r.text.substring(0, 120)}`));
}

console.log('\n--- Checking sitemap.xml for blog entries ---');
if (fs.existsSync('public/sitemap.xml')) {
  const sitemap = fs.readFileSync('public/sitemap.xml', 'utf-8');
  const blogUrls: string[] = sitemap.match(/<loc>[^<]*\/blog\/([^<]+)<\/loc>/g) || [];
  console.log(`Total /blog/ urls in sitemap.xml: ${blogUrls.length}`);
  blogUrls.forEach(u => {
    const slugMatch = u.match(/\/blog\/([^<]+)/);
    if (slugMatch) {
      const slug = slugMatch[1];
      if (!blogSlugs.has(slug)) {
        console.log(`❌ Sitemap has missing blog slug: ${slug}`);
      }
    }
  });
}

console.log('\n--- Checking generate-complete-sitemap.ts ---');
if (fs.existsSync('generate-complete-sitemap.ts')) {
  const genScript = fs.readFileSync('generate-complete-sitemap.ts', 'utf-8');
  const matches = genScript.matchAll(/\/blog\/([a-zA-Z0-9_-]+)/g);
  for (const m of matches) {
    if (!blogSlugs.has(m[1])) {
      console.log(`❌ generate-complete-sitemap.ts references missing: ${m[1]}`);
    }
  }
}
