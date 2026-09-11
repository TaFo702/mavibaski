import fs from 'fs';
import path from 'path';

function checkAllComponents() {
  const dir = './src/components';
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f.endsWith('.tsx')) {
      const content = fs.readFileSync(path.join(dir, f), 'utf-8');
      if (content.includes('BLOG_POSTS') && f !== 'Blog.tsx' && f !== 'RelatedBlogPosts.tsx') {
        console.log(`BLOG_POSTS used directly in: ${f}`);
      }
    }
  }
}

checkAllComponents();
