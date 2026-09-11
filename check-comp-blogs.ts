import fs from 'fs';
import path from 'path';

const compDir = './src/components';
const files = fs.readdirSync(compDir).filter(f => f.endsWith('.tsx'));

console.log('--- Components checking for RelatedBlogPosts or blog links ---');
for (const file of files) {
  const content = fs.readFileSync(path.join(compDir, file), 'utf-8');
  const hasRelated = content.includes('RelatedBlogPosts');
  const hasBlogLink = content.includes('/blog');
  console.log(`${file.padEnd(25)} -> RelatedBlogPosts: ${hasRelated ? 'YES' : ' NO'}, has /blog link: ${hasBlogLink ? 'YES' : ' NO'}`);
}
