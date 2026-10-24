import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { TestWrapper } from './src/App';
import { SEOPages } from './src/components/SEOPages';
import { SEO_PAGES_DATA } from './src/data/seoPagesData';
import { SECTOR_PRICE_PRODUCTS, getSectorPriceExamples } from './src/data/sectorPriceExamples';
import { BROSUR_DATA, KATALOG_DATA } from './src/data/extraProductData';
import { MAGNET_DATA } from './src/data/productData';
import { SECTOR_HERO_IMAGES } from './src/data/sectorImages';

const amount = (price: string) => Number(price.replace(/[^\d,]/g, '').replace(',', '.'));
const a5Minimum = Math.min(...BROSUR_DATA.flatMap(g => g.items).filter(r => r.size === 'A5').map(r => amount(r.price)));
const magnetMinimum = Math.min(...MAGNET_DATA.flatMap(g => g.items).filter(r => !('isCustom' in r && r.isCustom)).map(r => amount(r.price)));
const routes = Object.keys(SECTOR_PRICE_PRODUCTS);
assert.deepEqual(Object.keys(SECTOR_HERO_IMAGES).sort(), [...routes].sort(), 'All 30 sectors need a reviewed hero');
assert.equal(routes.length, 30);
assert.equal(routes.filter(path => path.startsWith('/sektor/')).length, 13);
assert.equal(getSectorPriceExamples('/ordu-matbaa').length, 0);
const thirds = new Set<string>();
for (const pathname of routes) {
  assert.ok(Object.values(SEO_PAGES_DATA).some(page => page.path === pathname), pathname);
  const examples = getSectorPriceExamples(pathname);
  assert.equal(examples.length, 3, pathname);
  assert.equal(amount(examples[0].item.price), a5Minimum, pathname);
  assert.equal(amount(examples[1].item.price), magnetMinimum, pathname);
  assert.equal(new Set(examples.map(p => p.path)).size, 3, pathname);
  thirds.add(examples[2].path);
  const client = new JSDOM(renderToStaticMarkup(<TestWrapper initialPath={pathname}><SEOPages /></TestWrapper>)).window.document;
  const initial = new JSDOM(fs.readFileSync(`dist${pathname}/index.html`, 'utf8')).window.document;
  for (const doc of [client, initial]) {
    const hero = doc.querySelector('[data-sector-hero] img');
    const reviewed = SECTOR_HERO_IMAGES[pathname];
    assert.ok(hero, `${pathname}: missing hero image`);
    assert.equal(hero.getAttribute('src'), reviewed.src, pathname);
    assert.equal(hero.getAttribute('alt'), reviewed.alt, pathname);
    assert.equal(hero.getAttribute('width'), String(reviewed.width), pathname);
    assert.equal(hero.getAttribute('height'), String(reviewed.height), pathname);
    assert.equal(doc.querySelectorAll('[data-placeholder]').length, 0, `${pathname}: unfinished image placeholder`);
    for (const img of doc.querySelectorAll('main img')) {
      const src = img.getAttribute('src');
      if (!src?.startsWith('/images/')) continue;
      assert.ok(fs.existsSync(`public${src}`), `${pathname}: missing image ${src}`);
      assert.ok(!src.startsWith('/images/sektor/'), `${pathname}: unreviewed legacy sector artwork`);
      assert.ok(img.getAttribute('alt'), `${pathname}: missing image description`);
    }
    const cards = doc.querySelectorAll('[data-sector-price-cards] [data-price-example]');
    assert.equal(cards.length, 3, pathname);
    assert.equal(doc.querySelectorAll('h1').length, 1, pathname);
    cards.forEach((card, index) => {
      const anchor = card.querySelector('a');
      const product = examples[index];
      assert.equal(anchor?.getAttribute('href'), product.path, pathname);
      assert.ok(anchor?.contains(card.querySelector('img')), `${pathname}: image must be clickable`);
      assert.ok(anchor?.contains(card.querySelector('table')), `${pathname}: details must be clickable`);
      assert.ok(anchor?.textContent?.includes(product.item.price), pathname);
      assert.ok(anchor?.textContent?.includes(product.quantity), pathname);
      assert.ok(!product.item.isCustom, `${pathname}: unit rate must not be a pack price`);
      assert.ok(fs.existsSync(`public${product.image}`), `${pathname}: image exists`);
      assert.ok(fs.existsSync(`dist${product.path}/index.html`), `${pathname}: destination exists`);
    });
    assert.ok(doc.querySelector('[data-sector-price-cards]')?.textContent?.includes('KDV hariç'));
    if (pathname === '/erzurum-emlakci-katalog-baski') {
      const card = cards[2];
      assert.equal(card.querySelector('a')?.getAttribute('href'), '/kataloglar');
      for (const detail of [KATALOG_DATA.rows[0].p50, '50 Adet', '4 iç + 4 kapak', '135 gr', '300 gr', 'Tel dikiş']) {
        assert.ok(card.textContent?.includes(detail), `Missing catalogue tariff detail: ${detail}`);
      }
      const quoteLinks = doc.querySelectorAll('[data-sector-custom-quote]');
      assert.equal(quoteLinks.length, 2, 'Product-specific quote in hero and sidebar');
      for (const anchor of quoteLinks) {
        const url = new URL(anchor.getAttribute('href') || '');
        assert.equal(url.hostname, 'wa.me');
        assert.equal(url.pathname, '/905366022373');
        for (const field of ['Erzurum', 'Bitmiş ebat', 'Kapak dahil toplam sayfa', 'Baskı adedi', 'Cilt', 'PDF', 'Teslimat ilçesi']) {
          assert.ok(url.searchParams.get('text')?.includes(field), `Missing catalogue quote field: ${field}`);
        }
      }
      assert.ok([...doc.querySelectorAll('nav a')].some(a => a.getAttribute('href') === '/kataloglar' && a.textContent === 'Katalog Baskı'));
      assert.ok(!/Topkapı fabrikamızdaki|350 DPI ultra|parmak izi lekelerini barındırmaz|kopmasına izin vermiyoruz|5-6 iş gününde/.test(doc.body.textContent || ''));
    }
    if (pathname === '/kayseri-emlakci-afis-baski') {
      const mainText = doc.body.textContent || '';
      const quote = doc.querySelector('#branda-teklif');
      assert.ok(quote?.textContent?.includes('440 gr vinil branda'), 'Branda needs its own quote area');
      const href = quote?.querySelector('[data-branda-custom-quote]')?.getAttribute('href');
      const whatsapp = new URL(href || '');
      assert.equal(whatsapp.hostname, 'wa.me');
      assert.equal(whatsapp.pathname, '/905366022373');
      for (const field of ['440 gr vinil branda', 'En × boy', 'Adet:', 'Teslimat ilçesi:', 'üretim tarihi']) {
        assert.ok(whatsapp.searchParams.get('text')?.includes(field), `Missing branda quote field: ${field}`);
      }
      const priceRows = doc.querySelectorAll('[data-afis-offer]');
      assert.equal(priceRows.length, 3, 'Three user-confirmed print prices');
      for (const [id, price, material] of [
        ['folyo-50x70', '500 TL', 'Selefonlu Folyo'],
        ['branda-200x100', '700 TL', '440 gr Vinil Branda'],
        ['branda-35x50', '350 TL', '440 gr Vinil Branda'],
      ]) {
        const row = doc.querySelector(`[data-afis-offer="${id}"]`);
        assert.ok(row?.textContent?.includes(price));
        assert.ok(row?.textContent?.includes(material));
        const selectedQuote = new URL(row?.querySelector('a')?.getAttribute('href') || '');
        assert.ok(selectedQuote.searchParams.get('text')?.includes(price));
        assert.ok(selectedQuote.searchParams.get('text')?.includes(material));
      }
      assert.ok(!doc.querySelector('[data-kayseri-afis-prices]')?.textContent?.includes('800 TL'), 'Later 700 TL correction supersedes 800 TL');
      assert.ok(doc.querySelector('a[href="#branda-teklif"]'), 'Hero must link to branda quote');
      assert.ok(cards[2].textContent?.includes('Kuşe Kâğıt Afiş'));
      assert.ok(cards[2].textContent?.includes('105 gr. Kuşe'));
      assert.ok(doc.querySelector('[data-branda-price-note]')?.textContent?.includes('ayrı fiyatlandırılır'));
      assert.ok(!/solmaz|sigortalı sevk|hasar riski sıfırlanmış|en geç 3 iş gününde/.test(mainText), 'Unverified promises must be removed');
      const breadcrumb = doc.querySelector('nav');
      // TestWrapper contains only the page; the complete initial HTML includes site navigation.
      assert.ok([...doc.querySelectorAll('nav a')].some(a => a.getAttribute('href') === '/afis' && a.textContent === 'Afiş Baskı'), breadcrumb?.textContent || 'Breadcrumb');
    }
  }
  if (pathname === '/erzurum-emlakci-katalog-baski') {
    const schemas = [...initial.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => {
      const value = JSON.parse(el.textContent || '{}');
      return Array.isArray(value) ? value : [value];
    });
    assert.equal(schemas.filter(s => s['@type'] === 'Service').length, 1);
    const breadcrumbs = schemas.filter(s => s['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumbs.length, 1);
    assert.equal(breadcrumbs[0].itemListElement[1].item, 'https://mavibasim.com/kataloglar');
    const faqs = schemas.filter(s => s['@type'] === 'FAQPage');
    assert.equal(faqs.length, 1);
    const expected = SEO_PAGES_DATA['erzurum-emlakci-katalog-baski'].faqs;
    assert.equal(expected.length, 8);
    assert.deepEqual(faqs[0].mainEntity.map(q => ({ question: q.name, answer: q.acceptedAnswer.text })), expected);
    assert.ok(initial.title.length <= 60);
    const descriptionLength = initial.querySelector('meta[name="description"]')?.getAttribute('content')?.length || 0;
    assert.ok(descriptionLength >= 155 && descriptionLength <= 160);
  }
  if (pathname === '/kayseri-emlakci-afis-baski') {
    const schemas = [...initial.querySelectorAll('script[type="application/ld+json"]')].flatMap(el => {
      const value = JSON.parse(el.textContent || '{}');
      return Array.isArray(value) ? value : [value];
    });
    const breadcrumbs = schemas.filter(s => s['@type'] === 'BreadcrumbList');
    assert.equal(breadcrumbs.length, 1);
    assert.equal(breadcrumbs[0].itemListElement[1].item, 'https://mavibasim.com/afis');
    const faq = schemas.filter(s => s['@type'] === 'FAQPage');
    assert.equal(faq.length, 1);
    assert.equal(faq[0].mainEntity.length, 7);
    const priceAnswer = faq[0].mainEntity.find(q => q.name.includes('fiyatları ne kadar'));
    for (const price of ['500 TL', '700 TL', '350 TL']) assert.ok(priceAnswer?.acceptedAnswer.text.includes(price));
    assert.ok(initial.title.length <= 60);
  }
  assert.equal(initial.querySelector('meta[property="og:image"]')?.getAttribute('content'), `https://mavibasim.com${SECTOR_HERO_IMAGES[pathname].src}`, `${pathname}: sharing image must match hero`);
  const selectors = '[data-sector-price-cards] [data-price-example]';
  assert.deepEqual([...initial.querySelectorAll(selectors)].map(c => c.textContent), [...client.querySelectorAll(selectors)].map(c => c.textContent), `${pathname}: first HTML/client prices differ`);
}
assert.ok(thirds.size >= 8, 'Third products should vary across sectors');
console.log(`PASS: ${routes.length} sector pages; three linked cards each; lowest A5/magnet packs; ${thirds.size} sector product choices; first HTML/client parity.`);
