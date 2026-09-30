import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve('dist/kup-bloknot/index.html');
if (!fs.existsSync(htmlPath)) {
  console.error('FAIL: dist/kup-bloknot/index.html does not exist!');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

console.log('=== KÜP BLOKNOT COMPREHENSIVE VERIFICATION AUDIT ===\n');

// 1. Title verification
const titleMatches = html.match(/<title[^>]*>([\s\S]*?)<\/title>/gi) || [];
console.log('Titles found:', titleMatches.length);
titleMatches.forEach(t => console.log('  ', t));
const expectedTitleText = 'Küp Bloknot Baskı Fiyatları | Logolu Promosyon Küp Bloknot';
const titleValid = titleMatches.length === 1 && titleMatches[0].includes(expectedTitleText);
console.log('Title Check:', titleValid ? 'PASS' : 'FAIL');

// 2. Meta description verification
const descMatches = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/gi) || 
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/gi) || [];
console.log('\nMeta Descriptions found:', descMatches.length);
descMatches.forEach(d => console.log('  ', d));
const expectedDesc = 'Küp bloknot baskı fiyatlarını, logolu ve promosyon küp bloknot seçeneklerini inceleyin. 250 ve 500 yapraklı masaüstü modeller için teklif alın.';
const descValid = descMatches.length === 1 && descMatches[0].includes(expectedDesc);
console.log('Description Check:', descValid ? 'PASS' : 'FAIL');

// 3. Canonical verification
const canonicalMatches = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/gi) ||
                         html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/gi) || [];
console.log('\nCanonical links found:', canonicalMatches.length);
canonicalMatches.forEach(c => console.log('  ', c));
const canonicalValid = canonicalMatches.length === 1 && canonicalMatches[0].includes('https://mavibasim.com/kup-bloknot');
console.log('Canonical Check:', canonicalValid ? 'PASS' : 'FAIL');

// 4. Robots verification
const robotsMatches = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/gi) ||
                      html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']robots["'][^>]*>/gi) || [];
console.log('\nRobots tags found:', robotsMatches.length);
robotsMatches.forEach(r => console.log('  ', r));
const robotsValid = robotsMatches.length === 1 && robotsMatches[0].includes('index, follow');
console.log('Robots Check:', robotsValid ? 'PASS' : 'FAIL');

// 5. H1 verification
const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
console.log('\nH1 tags found:', h1Matches.length);
h1Matches.forEach(h => console.log('  ', h.replace(/\s+/g, ' ')));
const h1Valid = h1Matches.length === 1 && h1Matches[0].includes('Küp Bloknot Baskı Fiyatları ve Logolu Promosyon Küp Bloknot');
console.log('H1 Check:', h1Valid ? 'PASS' : 'FAIL');

// 6. Heading counts
const h2Matches = html.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi) || [];
const h3Matches = html.match(/<h3[^>]*>[\s\S]*?<\/h3>/gi) || [];
console.log(`\nHeadings Summary: H1=${h1Matches.length}, H2=${h2Matches.length}, H3=${h3Matches.length}`);

// 7. Schema JSON-LD verification
const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
console.log(`\nJSON-LD scripts found: ${jsonLdMatches.length}`);
let foundProduct = false;
let foundFAQ = false;
let foundBreadcrumb = false;
let productHasAvailability = false;
let productHasPriceValidUntil = false;
let foundMinOrder100 = false;
let foundWrongMinOrder1000 = false;
let faqQuestions = [];

jsonLdMatches.forEach((scriptTag, idx) => {
  const content = scriptTag.replace(/<script[^>]*>|<\/script>/gi, '').trim();
  try {
    const parsed = JSON.parse(content);
    const items = Array.isArray(parsed) ? parsed : [parsed];
    items.forEach(item => {
      console.log(`  Script #${idx + 1} @type:`, item['@type']);
      if (item['@type'] === 'Product') {
        foundProduct = true;
        console.log('    Product Name:', item.name);
        if (item.offers) {
          console.log('    Offers lowPrice:', item.offers.lowPrice, 'highPrice:', item.offers.highPrice);
          if (item.offers.availability) {
            productHasAvailability = true;
            console.log('    [WARNING] Product offers contains availability:', item.offers.availability);
          } else {
            console.log('    Offers availability: clean (no unverified stock claim) ✅');
          }
          if (item.offers.priceValidUntil) {
            productHasPriceValidUntil = true;
            console.log('    [WARNING] Product offers contains priceValidUntil:', item.offers.priceValidUntil);
          } else {
            console.log('    Offers priceValidUntil: clean (no unverified priceValidUntil claim) ✅');
          }
        }
      }
      if (item['@type'] === 'FAQPage') {
        foundFAQ = true;
        if (item.mainEntity) {
          faqQuestions = item.mainEntity.map(q => q.name);
          console.log(`    FAQ Questions count: ${faqQuestions.length}`);
          faqQuestions.forEach((q, qIdx) => console.log(`      ${qIdx + 1}. ${q}`));
        }
      }
      if (item['@type'] === 'BreadcrumbList') {
        foundBreadcrumb = true;
        console.log('    BreadcrumbList items:', item.itemListElement?.length);
      }
    });
  } catch (e) {
    console.error('    Error parsing JSON-LD:', e.message);
  }
});

// 8. Prohibited terms check
const prohibitedTerms = [
  'yapışkanlı',
  'Topkapı matbaasında imalatı',
  'üretim fabrikası',
  'doğrudan imalat',
  '7.450',
  'run.app'
];

console.log('\n--- Prohibited Terms Audit ---');
let hasProhibited = false;
prohibitedTerms.forEach(term => {
  const count = (html.match(new RegExp(term, 'gi')) || []).length;
  console.log(`  "${term}": ${count} occurrences`);
  if (count > 0) hasProhibited = true;
});

// Check standalone "fabrika"
const fabrikaMatches = html.match(/fabrika[a-zçğıöşü]*/gi) || [];
console.log(`  "fabrika*": ${fabrikaMatches.length} occurrences:`, fabrikaMatches);
if (fabrikaMatches.length > 0) hasProhibited = true;

// 9. Preload check
const preloadMatches = html.match(/<link[^>]*rel=["']preload["'][^>]*>/gi) || [];
console.log('\n--- Preload Images / Assets ---');
preloadMatches.forEach(p => console.log(' ', p));
const imagePreloads = preloadMatches.filter(p => p.includes('as="image"') || p.includes("as='image'"));
console.log(`Image preloads count: ${imagePreloads.length}`);
let preloadValid = true;
imagePreloads.forEach(p => {
  const hrefMatch = p.match(/href=["']([^"']*)["']/);
  if (hrefMatch) {
    const href = hrefMatch[1];
    const fullPath = path.resolve('public' + href);
    const exists = fs.existsSync(fullPath);
    console.log(`  Preload ${href} exists: ${exists}`);
    if (!exists) preloadValid = false;
  }
});

// 10. Image existence check in SSR DOM
const imgMatches = html.match(/<img\s+[^>]*src=["']([^"']*)["'][^>]*>/gi) || [];
console.log(`\n--- Images in SSR DOM: ${imgMatches.length} ---`);
let missingImageCount = 0;
imgMatches.forEach(imgTag => {
  const srcMatch = imgTag.match(/src=["']([^"']*)["']/);
  if (srcMatch) {
    const src = srcMatch[1];
    if (src.startsWith('/')) {
      const fullPath = path.resolve('public' + src);
      const exists = fs.existsSync(fullPath);
      console.log(`  ${src} -> ${exists ? 'EXISTS' : 'MISSING'}`);
      if (!exists) missingImageCount++;
    }
  }
});

console.log(`Missing images in DOM: ${missingImageCount}`);

// 11. Table content check
console.log('\n--- Price Table Content Check ---');
const hasGroupDivider = html.includes('border-top: 4px solid #cbd5e1') || html.includes('border-t-4 border-slate-300');
console.log('Group separator in table:', hasGroupDivider ? 'PASS' : 'FAIL');
const hasStartingPrice = html.includes('8.350 ₺');
console.log('Contains starting price 8.350 ₺:', hasStartingPrice ? 'PASS' : 'FAIL');
const hasOldPrice = html.includes('7.450');
console.log('Contains old price 7.450:', hasOldPrice ? 'FAIL' : 'CLEAN');

// 12. Check duplicate tags (Twitter/OG)
const twitterTitleMatches = html.match(/<meta[^>]*name=["']twitter:title["'][^>]*>/gi) || [];
console.log('\n--- Duplicate Tag Checks ---');
console.log(`twitter:title count: ${twitterTitleMatches.length} (${twitterTitleMatches.length === 1 ? 'PASS' : 'FAIL'})`);

// 13. Check Minimum Order Text & Product Schema Stock Unverified Claims
const hasCorrectMinOrder = html.includes('Minimum sipariş adedi 100 adettir');
const hasWrongMinOrder = html.includes('Minimum sipariş adedi: 1.000 adettir') || html.includes('Minimum sipariş adedi 1.000 adettir');
console.log('\n--- Minimum Order & Schema Availability Checks ---');
console.log(`Contains 'Minimum sipariş adedi 100 adettir': ${hasCorrectMinOrder ? 'PASS' : 'FAIL'}`);
console.log(`Contains wrong '1.000 adettir' min order: ${hasWrongMinOrder ? 'FAIL (Found)' : 'CLEAN'}`);
console.log(`Product Schema has availability: ${productHasAvailability ? 'FAIL (Unverified claim present)' : 'CLEAN (None) ✅'}`);
console.log(`Product Schema has priceValidUntil: ${productHasPriceValidUntil ? 'FAIL (Unverified claim present)' : 'CLEAN (None) ✅'}`);

// Overall verdict
const allPass = titleValid && descValid && canonicalValid && robotsValid && h1Valid && 
  foundProduct && foundFAQ && foundBreadcrumb && !hasProhibited && missingImageCount === 0 && 
  hasGroupDivider && hasStartingPrice && !hasOldPrice && preloadValid && twitterTitleMatches.length === 1 &&
  hasCorrectMinOrder && !hasWrongMinOrder && !productHasAvailability && !productHasPriceValidUntil;

console.log('\n========================================');
console.log('OVERALL AUDIT RESULT:', allPass ? 'ALL CHECKS PASSED ✅' : 'SOME CHECKS FAILED ❌');
console.log('========================================');
