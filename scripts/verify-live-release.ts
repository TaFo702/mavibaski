import assert from 'node:assert/strict';
import { appendFileSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const baseURL = new URL(process.env.LIVE_BASE_URL || 'https://mavibasim.com');
assert.ok(['https:', 'http:'].includes(baseURL.protocol));
assert.ok(baseURL.protocol === 'https:' || ['127.0.0.1', 'localhost'].includes(baseURL.hostname), 'HTTP is allowed only for local verification');
const deadline = Date.now() + Number(process.env.LIVE_RETRY_SECONDS || 600) * 1000;
const routes = ['/', '/bloknotlar', '/blog/emlak-yer-gosterme-belgesi-nedir', '/blog/baskili-urunlerle-pazarlama-markanizi-buyuten-matbaa-urunleri', '/sektor/e-ticaret-perakende-baski', '/dosyalar', '/kartvizit', '/kataloglar', '/ankara-matbaa', '/kullanim-sartlari', '/gizlilik-politikasi', '/cerez-politikasi', '/mesafeli-satis-sozlesmesi', '/iptal-ve-iade-sartlari'];
const removedTargets = ['/menu-baski', '/Mavi-Basim-Fiyat-Listesi.pdf', '/downloads/portfoy-gosterim-takip-cetveli.xlsx', '/downloads/yer-gosterme-belgesi-bos-sablon.docx', '/downloads/yer-gosterme-belgesi-bos-sablon.pdf'];
const normalize = (text: string | null) => (text || '').replace(/\s+/gu, ' ').trim();

function describeHTML(html: string) {
  const dom = new JSDOM(html);
  try {
    const document = dom.window.document;
    const values = (selector: string, attribute?: string) => [...document.querySelectorAll(selector)].map(node => normalize(attribute ? node.getAttribute(attribute) : node.textContent));
    return {
      title: values('title'), description: values('meta[name="description"]', 'content'), canonical: values('link[rel="canonical"]', 'href'), robots: values('meta[name="robots"]', 'content'), h1: values('#root h1'),
      tables: values('#root table'), rootText: normalize(document.getElementById('root')?.textContent || ''),
      anchors: values('#root a[href]', 'href'), menuParagraphs: [...document.querySelectorAll('#root p')].filter(node => node.textContent?.includes('Gıda sektöründeki işletmeler için masada hijyen sağlayan')).map(node => ({ text: normalize(node.textContent), menuLinks: [...node.querySelectorAll('a')].filter(anchor => anchor.textContent?.includes('Menü Baskıları')).length })),
      ecommerceImages: values('#root img[src^="/images/sektor/e-ticaret-perakende/"]', 'src'),
    };
  } finally { dom.window.close(); }
}

const expected = new Map(routes.map(route => {
  const file = path.join(process.cwd(), 'dist', route.slice(1), 'index.html');
  const description = describeHTML(readFileSync(file, 'utf8'));
  for (const field of ['title', 'description', 'canonical', 'h1'] as const) assert.equal(description[field].length, 1, `Local release must have one ${field}: ${route}`);
  return [route, description] as const;
}));

function requestURL(route: string) {
  const url = new URL(route, baseURL);
  url.searchParams.set('release_check', process.env.GITHUB_SHA || 'local-verification');
  return url;
}

async function checkRelease() {
  let priceTables = 0;
  for (const route of routes) {
    const response = await fetch(requestURL(route), { redirect: 'manual', signal: AbortSignal.timeout(15000), headers: { 'Cache-Control': 'no-cache' } });
    assert.equal(response.status, 200, `${route}: expected HTTP 200`);
    assert.ok((response.headers.get('content-type') || '').includes('text/html'), `${route}: expected HTML`);
    const actual = describeHTML(await response.text());
    const local = expected.get(route)!;
    for (const field of ['title', 'description', 'canonical', 'robots', 'h1', 'tables'] as const) assert.deepEqual(actual[field], local[field], `${route}: ${field} differs from the checked release`);
    assert.ok(actual.rootText, `${route}: empty application content`);
    priceTables += actual.tables.length;
    for (const href of actual.anchors) {
      const target = new URL(href, baseURL);
      if (target.origin === baseURL.origin) assert.ok(!removedTargets.includes(target.pathname), `${route}: removed link still exists: ${target.pathname}`);
    }
    if (route.includes('baskili-urunlerle-pazarlama')) {
      assert.equal(actual.menuParagraphs.length, 1);
      assert.ok(actual.menuParagraphs[0].text.includes('Menü Baskıları'));
      assert.equal(actual.menuParagraphs[0].menuLinks, 0);
    }
    if (route === '/bloknotlar') assert.ok(!actual.rootText.includes('FİYAT LİSTESİNİ İNDİR (PDF)'));
    if (route.includes('emlak-yer-gosterme')) {
      for (const label of ['Hemen İndir (PDF)', 'Düzenle & İndir (Word)', 'Excel İndir (Excel)']) assert.ok(!actual.rootText.includes(label), `Removed download button still exists: ${label}`);
    }
    if (route === '/sektor/e-ticaret-perakende-baski') {
      assert.equal(actual.ecommerceImages.length, 6);
      for (const imagePath of actual.ecommerceImages) {
        const image = await fetch(new URL(imagePath, baseURL), { signal: AbortSignal.timeout(15000) });
        assert.equal(image.status, 200, `Image did not load: ${imagePath}`);
        const bytes = Buffer.from(await image.arrayBuffer());
        assert.ok(bytes.length >= 12 && bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP', `Invalid WebP: ${imagePath}`);
      }
    }
  }
  for (const [source, destination] of [['/bloknot', '/bloknotlar'], ['/teslimat-ve-iade', '/teslimat-sartlari']]) {
    const response = await fetch(requestURL(source), { redirect: 'manual', signal: AbortSignal.timeout(15000) });
    assert.ok([301, 308].includes(response.status), `Permanent redirect missing: ${source}`);
    const target = new URL(response.headers.get('location') || '', baseURL);
    assert.equal(target.pathname, destination);
    assert.equal(target.origin, baseURL.origin);
    assert.equal(target.searchParams.get('release_check'), process.env.GITHUB_SHA || 'local-verification', `Redirect lost its query: ${source}`);
    await response.body?.cancel();
  }
  assert.ok(priceTables > 0, 'Release verification must compare actual price tables');
  return { routes: routes.length, redirects: 2, priceTables, ecommerceImages: 6, removedTargets: removedTargets.length };
}

async function verifyRelease() {
  for (;;) {
    try {
      const result = await checkRelease();
      console.log('PASS checked release on', baseURL.origin, JSON.stringify(result));
      if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n## Production release verified\n\n- Site: ${baseURL.origin}\n- Commit: ${process.env.GITHUB_SHA || 'local-verification'}\n- Checks: ${result.routes} pages, ${result.redirects} permanent redirects, ${result.priceTables} matching price tables, ${result.ecommerceImages} WebP images.\n- Menu wording preserved; five removed targets/buttons absent.\n`);
      return;
    } catch (error) {
      if (Date.now() >= deadline) throw error;
      console.log('Release is not ready yet:', error instanceof Error ? error.message : String(error));
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
}

verifyRelease().catch(error => {
  console.error('LIVE RELEASE VERIFICATION FAILED:', error);
  process.exitCode = 1;
});
