import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const htmlPath = path.resolve('dist/etiket/index.html');
if (!fs.existsSync(htmlPath)) {
  console.error('FAIL: dist/etiket/index.html does not exist!');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

console.log('=== ETİKET COMPREHENSIVE VERIFICATION AUDIT ===\n');

let passed = true;
function assert(cond, msg) {
  if (cond) {
    console.log(`[PASS] ${msg}`);
  } else {
    console.error(`[FAIL] ${msg}`);
    passed = false;
  }
}

// 1. Title
const titleMatches = html.match(/<title[^>]*>([\s\S]*?)<\/title>/gi) || [];
const expectedTitle = 'Yapışkanlı Etiket ve Sticker Baskı Fiyatları | Mavi Basım';
assert(titleMatches.length === 1 && titleMatches[0].includes(expectedTitle), `Title matches exactly once: ${titleMatches[0]}`);

// 2. Meta description
const descMatches = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/gi) || [];
const expectedDesc = 'Kuşe, PP opak, şeffaf ve özel kesim yapışkanlı etiket baskı fiyatlarını inceleyin. Ambalaj etiketi ve sticker baskı seçenekleri için teklif alın.';
assert(descMatches.length === 1 && descMatches[0].includes(expectedDesc), `Meta description matches exactly once: ${descMatches[0]}`);

// 3. Canonical
const canonicalMatches = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/gi) || [];
assert(canonicalMatches.length === 1 && canonicalMatches[0].includes('https://mavibasim.com/etiket'), `Canonical matches exactly once: ${canonicalMatches[0]}`);

// 4. Robots
const robotsMatches = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/gi) || [];
assert(robotsMatches.length === 1 && robotsMatches[0].includes('index, follow'), `Robots matches exactly once: ${robotsMatches[0]}`);

// 5. H1
const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
const expectedH1 = 'Yapışkanlı Etiket ve Sticker Baskı Fiyatları';
assert(h1Matches.length === 1 && h1Matches[0].includes(expectedH1), `H1 matches exactly once: ${h1Matches[0]}`);

// 6. Open Graph & Twitter
assert(html.includes('property="og:image" content="https://mavibasim.com/images/etiket/etiket-baski-fiyatlari.webp"'), 'og:image is etiket-baski-fiyatlari.webp');
assert(html.includes('property="og:image:width" content="1536"'), 'og:image:width is 1536');
assert(html.includes('property="og:image:height" content="1024"'), 'og:image:height is 1024');
assert(html.includes('property="og:image:alt" content="Mavi Basım yapışkanlı etiket ve sticker baskı fiyatları"'), 'og:image:alt is correct');
assert(html.includes('name="twitter:card" content="summary_large_image"'), 'twitter:card is summary_large_image');

// 7. Schemas
const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
assert(jsonLdMatches.length >= 4, `Found ${jsonLdMatches.length} JSON-LD blocks`);

let foundBreadcrumb = false;
let foundProduct = false;
let foundFAQ = false;
let faqCount = 0;

jsonLdMatches.forEach(tag => {
  const content = tag.replace(/<script[^>]*>|<\/script>/gi, '').trim();
  try {
    const parsed = JSON.parse(content);
    const items = Array.isArray(parsed) ? parsed : [parsed];
    items.forEach(item => {
      if (item['@type'] === 'BreadcrumbList') {
        foundBreadcrumb = true;
        assert(item.itemListElement?.length === 3, `Breadcrumb has 3 items (found: ${item.itemListElement?.length})`);
        assert(item.itemListElement?.[0]?.name === 'Ana Sayfa', 'Breadcrumb first item is Ana Sayfa');
        assert(item.itemListElement?.[1]?.name === 'Matbaa Ürünleri', 'Breadcrumb second item is Matbaa Ürünleri');
        assert(item.itemListElement?.[2]?.name === 'Etiket Baskı Fiyatları', 'Breadcrumb third item is Etiket Baskı Fiyatları');
      }
      if (item['@type'] === 'Product') {
        foundProduct = true;
        assert(item.name === 'Yapışkanlı Etiket ve Sticker Baskı Fiyatları', 'Product name is correct');
        assert(item.offers?.lowPrice === '980', 'Product lowPrice is 980');
        assert(item.offers?.highPrice === '1350', 'Product highPrice is 1350');
        assert(item.offers?.offerCount === '4', 'Product offerCount is 4');
        assert(!item.offers?.availability, 'Product has no unverified availability');
        assert(!item.offers?.priceValidUntil, 'Product has no priceValidUntil');
        assert(!item.offers?.shippingDetails, 'Product has no shippingDetails');
      }
      if (item['@type'] === 'FAQPage') {
        foundFAQ = true;
        faqCount = item.mainEntity?.length || 0;
        assert(faqCount === 16, `FAQPage has 16 questions (found ${faqCount})`);
      }
    });
  } catch (e) {
    assert(false, `Failed to parse JSON-LD: ${e.message}`);
  }
});

assert(foundBreadcrumb, 'BreadcrumbList schema present');
assert(foundProduct, 'Product schema present');
assert(foundFAQ, 'FAQPage schema present');

// 7.5. Visible Breadcrumb HTML Validation
const navMatches = html.match(/<nav\b[^>]*aria-label=["']Breadcrumb["'][^>]*>([\s\S]*?)<\/nav>/gi) || [];
assert(navMatches.length === 1, `Visible breadcrumb <nav aria-label="Breadcrumb"> matches exactly once (found: ${navMatches.length})`);
if (navMatches.length === 1) {
  const navHtml = navMatches[0];
  assert(navHtml.includes('href="/"') && navHtml.includes('Ana Sayfa'), 'Visible breadcrumb contains link to Ana Sayfa (/)');
  assert(navHtml.includes('href="/matbaa"') && navHtml.includes('Matbaa Ürünleri'), 'Visible breadcrumb contains link to Matbaa Ürünleri (/matbaa)');
  assert(navHtml.includes('aria-current="page"') && navHtml.includes('Etiket Baskı Fiyatları'), 'Visible breadcrumb contains current page Etiket Baskı Fiyatları with aria-current="page"');
  const visibleText = navHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`[INFO] Visible breadcrumb text: "${visibleText}"`);
  assert(visibleText.includes('Ana Sayfa') && visibleText.includes('Matbaa Ürünleri') && visibleText.includes('Etiket Baskı Fiyatları'), 'Visible text has all 3 breadcrumb steps');
}

// 8. Table Semantics
assert(html.includes('Etiket Baskı Fiyat Listesi'), 'Price table has caption "Etiket Baskı Fiyat Listesi"');
assert(html.includes('Etiket Malzemeleri Karşılaştırması'), 'Comparison table has caption "Etiket Malzemeleri Karşılaştırması"');
assert(html.includes('scope="col"'), 'Table headers include scope="col"');
assert(html.includes('scope="row"'), 'Table row headers include scope="row"');
assert(html.includes('scope="rowgroup"'), 'Group row header includes scope="rowgroup"');

// 9. Forbidden unverified claims check
const forbiddenPatterns = [
  'Topkapı imalat tesisi',
  'üretim tesisi',
  'doğrudan üretici',
  'üreticiden doğrudan tedarik',
  'kesin dayanıklılık garantisi',
  'bulaşık makinesine kesin dayanıklılık',
  'bütçe dostu',
  'en ekonomik',
  'avantajlı ve rekabetçi fiyat garantisi'
];

forbiddenPatterns.forEach(pattern => {
  const found = html.includes(pattern);
  assert(!found, `Forbidden claim absent: "${pattern}" (found: ${found})`);
});

// Approved location text check
assert(
  html.includes('İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktası'),
  'Approved location phrasing is present'
);

// 10. SHA-256 Check of Protected Files
const protectedFiles = [
  { file: 'src/components/Kutu.tsx', hash: '8f79addb2bf6e63d6118655e63a18970a1849d7cfc1739395ad248b1dbce2666' },
  { file: 'src/data/kutuPageContent.ts', hash: '16a02775277401d9665e765c4807c9ddea7d433c4ed6b7a736f3c42e3711b030' },
  { file: 'src/components/Ambalaj.tsx', hash: '14205b4d35c49812fdd5b5141b687f6a6da1f3cc774803b23bee184eff4091e2' },
  { file: 'src/data/ambalajPageContent.ts', hash: '739aadde6d5a62d7e656ad416260a1ea752de2ad7a64b844464e906868965c76' },
  { file: 'src/components/KupBloknot.tsx', hash: 'ed0f37f9532e72be08b59d0277b42a8208c1fb61d82918dfc8a7954fdd048272' },
  { file: 'src/data/kupBloknotPageContent.ts', hash: 'c08fcc1f303ba4728c4657d7022f093fbea39f7864c0bc37a978f7e6caed7a1f' }
];

protectedFiles.forEach(({ file, hash: expectedHash }) => {
  const content = fs.readFileSync(file);
  const actualHash = crypto.createHash('sha256').update(content).digest('hex');
  assert(actualHash === expectedHash, `Protected file integrity ${file} (expected: ${expectedHash}, actual: ${actualHash})`);
});

if (!passed) {
  console.error('\n❌ AUDIT FAILED! Review errors above.');
  process.exit(1);
} else {
  console.log('\n✅ ALL ETİKET AUDIT CHECKS PASSED WITH 100% SUCCESS!');
}
