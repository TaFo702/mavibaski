import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { JSDOM } from 'jsdom';
import { BLOG_POSTS } from './src/data/blogData';
import { getBlogMetadata } from './src/utils/blogMetadata';

for (const post of BLOG_POSTS) {
  const meta = getBlogMetadata(post);
  const doc = new JSDOM(fs.readFileSync(`dist/blog/${post.slug}/index.html`, 'utf8')).window.document;
  const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')]
    .map(tag => JSON.parse(tag.textContent || '{}'));
  const article = schemas.find(schema => schema['@type'] === post.schemaType);
  assert(article, `Article missing: ${post.slug}`);
  assert.equal(article.author.name, 'Tayfun Akan', post.slug);
  assert.equal(article.author['@type'], 'Person', post.slug);
  assert.equal(article.datePublished, meta.datePublished, post.slug);
  assert.equal(article.dateModified, post.slug === 'adisyon-ve-makbuzlarda-otokopili-kagit' ? '2026-10-19' : '2026-10-14', post.slug);
  assert(doc.body.textContent?.includes('Tayfun Akan'), `Visible author missing: ${post.slug}`);
  assert(doc.body.textContent?.includes(meta.publishedLabel), `Recorded publication date missing: ${post.slug}`);
  assert(!doc.body.textContent?.includes('Mehmet Başar'), `Old author leaked: ${post.slug}`);
}

const slug = 'zarf-baskisinda-diplomat-ve-torba-zarf';
const blog = new JSDOM(fs.readFileSync(`dist/blog/${slug}/index.html`, 'utf8')).window.document;
assert.equal(blog.title, 'Diplomat ve Torba Zarf Seçim Rehberi | Mavi Basım');
assert(blog.title.length <= 60);
assert.equal(blog.querySelectorAll('h1').length, 1);
assert.equal(blog.querySelector('h1')?.textContent, BLOG_POSTS.find(post => post.slug === slug)?.title);
assert(blog.body.textContent?.includes('İlk Yayınlanma: 02 Mayıs 2026'));
assert(blog.body.textContent?.includes('Son Güncelleme: 14 Ekim 2026'));
assert(!blog.body.textContent?.includes('İlk Yayınlanma: 21 Mayıs 2026'));

const product = new JSDOM(fs.readFileSync('dist/zarf/index.html', 'utf8')).window.document;
const priceTable = (doc: Document) => [...doc.querySelectorAll('table')]
  .find(table => table.querySelector('caption')?.textContent?.includes('Baskı Fiyat Listesi'));
assert.equal(createHash('sha256').update(priceTable(product)?.outerHTML || '').digest('hex'),
  'd4a1a973a0e002ff3562cbafc931af07bc3e1c0e45f3fc964c2b75ec8d760b2c', 'Protected price table changed');
const text = product.querySelector('main')?.textContent || '';
assert(!text.includes('Doğrudan Üretici Fabrika'));
assert(!text.includes('tesislerimizde'));
assert(text.includes('PDF, AI veya CDR'));
assert(text.includes('Diplomat zarflarda silikon bantlı veya tutkallı kapatma'));
console.log(`PASS: ${BLOG_POSTS.length} blog authors/dates/schema; zarf title, recorded date, copy and protected price table.`);
