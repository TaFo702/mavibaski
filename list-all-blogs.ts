import { BLOG_POSTS } from './src/data/blogData.js';

console.log('--- ALL EXISTING BLOG POSTS ---');
BLOG_POSTS.forEach((p, i) => {
  console.log(`${i + 1}. [${p.slug}] -> "${p.title}" (${p.category})`);
});
