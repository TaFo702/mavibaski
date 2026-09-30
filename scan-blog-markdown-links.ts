import { BLOG_POSTS } from './src/data/blogData.js';

console.log('--- Scanning all markdown links inside blogData.ts ---');

const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
const internalLinks = new Set<string>();

BLOG_POSTS.forEach((post) => {
  let match;
  while ((match = linkRegex.exec(post.content)) !== null) {
    const href = match[2];
    internalLinks.add(href);
  }
});

console.log('Total markdown links found in blog contents:', internalLinks.size);
for (const link of Array.from(internalLinks).sort()) {
  console.log(' - ', link);
}
