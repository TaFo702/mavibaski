const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const {JSDOM, VirtualConsole} = require('jsdom');
const client = require('esbuild').buildSync({entryPoints:['src/main.tsx'],bundle:true,platform:'browser',format:'iife',write:false,loader:{'.css':'empty'}}).outputFiles[0].text;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const normalize = s => s.replace(/\s+/g, ' ').trim();
const errors = [];
// Baseline captured from the unchanged, published price component before this fix.
// Ignore only React SSR text separators and Router's discovery marker.
const expectedPriceHash = '63e416eaabfa1a384feb6d12e27542cd9f27ca8bde319621ae738e28b33a73c5';
const priceHTML = d => d.querySelector('#fiyat-tablosu > .bg-white').outerHTML;
const hash = d => crypto.createHash('sha256').update(priceHTML(d).replace(/<!-- -->/g,'').replaceAll(' data-discover="true"','')).digest('hex');
function check(d) {
  assert.equal(d.querySelectorAll('h1').length, 1);
  assert.equal(d.querySelector('h1').textContent, 'Numaratörlü Sipariş Fişi Baskı Fiyatları');
  for (const selector of ['title','meta[name="description"]','link[rel="canonical"]','meta[name="robots"]']) assert.equal(d.querySelectorAll(selector).length, 1, selector);
  assert.equal(d.querySelector('title').textContent, 'Sipariş Fişi Baskı Fiyatları 2026 | Otokopili ve Numaratörlü');
  assert.equal(d.querySelector('link[rel="canonical"]').href, 'https://mavibasim.com/siparis-fisi');
  for (const key of ['og:title','og:description','og:url','og:image','og:image:width','og:image:height']) assert.equal(d.querySelectorAll(`meta[property="${key}"]`).length, 1, key);
  for (const key of ['twitter:title','twitter:description','twitter:image']) assert.equal(d.querySelectorAll(`meta[name="${key}"]`).length, 1, key);
  assert.equal(d.querySelector('meta[property="og:image"]').content, 'https://mavibasim.com/images/siparis-fisi/siparis-fisi-basimi.webp');
  assert.equal(d.querySelector('meta[property="og:image:width"]').content, '1536');
  assert.equal(d.querySelector('meta[property="og:image:height"]').content, '1024');
  assert.equal(hash(d), expectedPriceHash, 'Protected pricing markup, values, styling or controls changed');
  const ids = [...d.querySelectorAll('[id]')].map(e => e.id);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate IDs');
  const toc = d.querySelector('nav[aria-label="Sayfa İçindekiler Navigasyonu"]');
  for (const link of toc.querySelectorAll('a[href^="#"]')) assert.equal(d.querySelectorAll(link.getAttribute('href')).length, 1, link.textContent);
  assert.ok(toc.textContent.includes('Sipariş Nasıl Verilir'));
  for (const id of ['kimler-kullanir','uretim-sureci','nasil-doldurulur','sss-bolumu']) assert.equal(d.querySelectorAll('#'+id).length, 1, id);
  const schemas = [...d.querySelectorAll('script[type="application/ld+json"]')].flatMap(e => {const value=JSON.parse(e.textContent);return Array.isArray(value)?value:[value]});
  for (const type of ['Product','FAQPage','BreadcrumbList']) assert.equal(schemas.filter(s=>s['@type']===type).length, 1, type);
  const breadcrumb = schemas.find(s=>s['@type']==='BreadcrumbList').itemListElement;
  assert.deepEqual(breadcrumb.map(x=>x.name), ['Ana Sayfa','Makbuz & Formlar','Sipariş Fişi']);
  const visible = normalize(d.querySelector('#sss-bolumu').textContent);
  for (const q of schemas.find(s=>s['@type']==='FAQPage').mainEntity) {
    assert.ok(visible.includes(normalize(q.name)), q.name);
    assert.ok(visible.includes(normalize(q.acceptedAnswer.text)), q.name+' answer');
  }
  assert.ok(!/Heidelberg|3[–-]5 [İi]ş [Gg]ünü|Aynı Gün Tasarım|24 Saat İçinde|İmalatçı Garantisi|sıfır hata|Ücretsiz Grafik Desteği|Topkapı Üretim Tesisi/.test(d.querySelector('main').textContent));
  const related = [...d.querySelectorAll('main a[href="/arac-kiralama"]')];
  assert.ok(related.some(a=>a.textContent.includes('Araç Kiralama Formu')));
  assert.ok(!related.some(a=>a.textContent.includes('Servis Formu')));
  assert.ok(d.querySelector('main').textContent.includes('Sipariş Fişi Ürün Fotoğraf Galerisi'));
}
async function settle(w, path) {
  for (let i=0; i<100; i++) {
    if (w.location.pathname===path && w.document.querySelector('link[rel="canonical"]')?.href==='https://mavibasim.com'+path && w.document.querySelector('h1')) {await sleep(400);return;}
    await sleep(50);
  }
  throw new Error('Route did not settle: '+path);
}
async function open() {
  const vc = new VirtualConsole();
  vc.on('error', (...args)=>errors.push(args.map(String).join(' ')));
  vc.on('jsdomError', e=>errors.push(String(e)));
  const dom = new JSDOM(fs.readFileSync('dist/siparis-fisi/index.html','utf8'), {url:'https://mavibasim.com/siparis-fisi',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
  const w=dom.window,d=w.document;
  w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){w.__target=this.id};
  w.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
  check(d);
  const before={price:priceHTML(d),table:d.querySelector('#fiyat-tablosu table'),text:normalize(d.querySelector('main').textContent),links:[...d.querySelectorAll('main a[href]')].map(e=>e.getAttribute('href'))};
  w.eval(client);await settle(w,'/siparis-fisi');check(d);
  assert.strictEqual(d.querySelector('#fiyat-tablosu table'),before.table,'Hydration replaced the protected table node');
  assert.equal(priceHTML(d),before.price,'Hydration changed protected pricing markup');
  assert.equal(normalize(d.querySelector('main').textContent),before.text,'Hydration changed visible content');
  assert.deepEqual([...d.querySelectorAll('main a[href]')].map(e=>e.getAttribute('href')),before.links,'Hydration changed links');
  return dom;
}
function click(w, element) {assert.ok(element,'Missing control');element.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));}
(async()=>{
  const dom=await open(),w=dom.window,d=w.document;
  for(const id of ['kimler-kullanir','uretim-sureci','nasil-doldurulur']) {click(w,d.querySelector(`a[href="#${id}"]`));assert.equal(w.__target,id);}
  for(const path of ['/para-makbuzu','/sozlesme-baski','/tahsilat-makbuzu','/']) {
    click(w,[...d.querySelectorAll('a[href]')].find(a=>a.getAttribute('href')===path&&!a.target));
    await settle(w,path);w.history.back();await settle(w,'/siparis-fisi');check(d);
  }
  w.history.pushState({},'', '/siparis-fisi-baski-fiyatlari');
  w.dispatchEvent(new w.PopStateEvent('popstate'));
  await settle(w,'/siparis-fisi');check(d);
  assert.ok(JSON.parse(fs.readFileSync('vercel.json','utf8')).redirects.some(r=>r.source==='/siparis-fisi-baski-fiyatlari'&&r.destination==='/siparis-fisi'&&r.permanent));
  const sitemap=fs.readFileSync('public/sitemap.xml','utf8');
  assert.ok(!sitemap.includes('<loc>https://mavibasim.com/siparis-fisi-baski-fiyatlari</loc>'));
  assert.equal((sitemap.match(/<loc>https:\/\/mavibasim.com\/siparis-fisi<\/loc>/g)||[]).length,1);
  click(w,d.querySelector('#fiyat-tablosu table button'));await sleep(200);
  const quote=()=>decodeURIComponent([...d.querySelectorAll('a[href^="https://wa.me/"]')].find(a=>a.textContent.includes('WhatsApp ile İletişim')).href);
  assert.ok(quote().includes('5 cilt'));assert.ok(quote().includes('Ebat: 14 x 20 cm (YARIM BOY)'));assert.ok(quote().includes('1.900'));
  assert.ok(!/Aynı Gün Tasarım Onayı|Ortalama 3–4 iş günü/.test(d.body.textContent));
  click(w,[...d.querySelectorAll('button')].find(b=>normalize(b.textContent).startsWith('100 CİLT')));await sleep(150);
  assert.ok(quote().includes('100 cilt'));assert.ok(quote().includes('5.750'));
  click(w,[...d.querySelectorAll('button')].find(b=>/^2\s*RENK$/.test(normalize(b.textContent))));await sleep(150);
  assert.ok(quote().includes('8.150'),'Existing color surcharge calculation changed');
  assert.equal(hash(d),expectedPriceHash);
  dom.window.close();const reload=await open();reload.window.close();
  assert.deepEqual(errors,[],'Runtime or hydration errors');
  console.log('PASS: initial HTML, reload, hydration table node/markup/content/link parity, four return navigations, single metadata/schema ownership, FAQ parity, working anchors, and WhatsApp size/cilt/quantity/color-price flow.');
})().catch(error=>{console.error(error);process.exit(1)});
