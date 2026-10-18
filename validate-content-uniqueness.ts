import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { CITIES_DATA } from './src/data/cityData';
import { CITY_PRODUCT_GROUPS, getCityOrderGuides, getCityOrderFAQ } from './src/data/cityOrderGuide';
import { isKnownRoute } from './src/utils/seoGenerator';

const textSets: Array<{ name: string; words: Set<string> }> = [];
const guideCombinations = new Set<string>();
const normalize = (text: string) => text.toLocaleLowerCase('tr').replace(/\s+/g, ' ').trim();
for (const city of CITIES_DATA) {
  const dom = new JSDOM(fs.readFileSync(path.join('dist', city.slug, 'index.html'), 'utf8'));
  const d = dom.window.document;
  const content = d.querySelector(`[data-city-content="${city.slug}"]`);
  assert.ok(content, `${city.slug}: real first-HTML city content missing`);
  assert.equal(content.querySelectorAll('h1').length, 1, city.slug);
  const text = normalize(content.textContent || '');
  assert.ok(!/fabrika|tesisimiz|doğrudan üretici|aracısız|komisyonsuz|anlaşmalı kargo|24\s*saat|48\s*saat|garantili/.test(text), `${city.slug}: unverified claim`);
  for (const id of ['urun-secimi', 'teklif-bilgileri', 'tum-urunler', 'dosya-onay', 'kargo-plani', 'sehir-sss']) {
    assert.ok(content.querySelector(`#${id}`), `${city.slug}: missing ${id}`);
  }
  const guidePaths = [...content.querySelectorAll('[data-order-guide]')].map(el => el.getAttribute('data-order-guide') || '');
  assert.deepEqual(guidePaths, getCityOrderGuides(city).map(guide => guide.path));
  const key = [...guidePaths].sort().join('|');
  assert.ok(!guideCombinations.has(key), `${city.slug}: repeated product decision guide trio`);
  guideCombinations.add(key);
  for (const guide of getCityOrderGuides(city)) {
    assert.ok(text.includes(normalize(guide.use)), city.slug);
    for (const field of guide.quoteFields) assert.ok(text.includes(normalize(field)), `${city.slug}: quote field ${field}`);
  }
  for (const group of CITY_PRODUCT_GROUPS) for (const [,href] of group.products) {
    assert.ok(content.querySelector(`a[href="${href}"]`), `${city.slug}: missing product ${href}`);
  }
  for (const a of content.querySelectorAll('a[href^="/"]')) {
    assert.ok(isKnownRoute(new URL(a.getAttribute('href')!, 'https://mavibasim.com').pathname), `${city.slug}: broken route`);
  }
  const quote = content.querySelector<HTMLAnchorElement>('a[href^="https://wa.me/"]');
  const message = new URL(quote!.href).searchParams.get('text') || '';
  assert.ok(message.includes(city.name) && message.includes('Adet / cilt adedi:') && message.includes('Dosya durumu:'), `${city.slug}: quote message`);
  const schemas = [...d.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent || '{}'));
  assert.equal(schemas.filter(s => s['@type'] === 'Service').length, 1, `${city.slug}: Service ownership`);
  const faqs = schemas.filter(s => s['@type'] === 'FAQPage');
  assert.equal(faqs.length, 1, `${city.slug}: FAQ ownership`);
  assert.deepEqual(faqs[0].mainEntity.map((q: { name: string; acceptedAnswer: { text: string } }) => ({ question: q.name, answer: q.acceptedAnswer.text })), getCityOrderFAQ(city));
  for (const item of getCityOrderFAQ(city)) assert.ok(text.includes(normalize(item.answer)), `${city.slug}: visible/schema FAQ mismatch`);
  let stripped = text;
  for (const term of [city.name, ...city.districts].sort((a,b) => b.length-a.length)) stripped = stripped.replaceAll(normalize(term), ' ');
  const words = stripped.match(/[\p{L}\p{N}]+/gu) || [];
  const shingles = new Set(words.slice(0,-4).map((_,i) => words.slice(i,i+5).join(' ')));
  textSets.push({ name: city.name, words: shingles });
  dom.window.close();
}
const nearest = textSets.map((a,i) => Math.max(...textSets.filter((_,j) => i !== j).map(b => {
  const intersection = [...a.words].filter(word => b.words.has(word)).length;
  return intersection / (a.words.size + b.words.size - intersection);
})));
console.log(`PASS: ${CITIES_DATA.length} actual city HTML pages; product decisions, quote fields, links, claims, matching FAQ schema and city-specific order message.`);
console.log(`ASSESSMENT: nearest-body five-word similarity ${Math.round(Math.min(...nearest)*100)}–${Math.round(Math.max(...nearest)*100)}%. Shared service information remains; this is not a Google score or proof of local value.`);
