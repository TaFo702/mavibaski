const fs = require('node:fs');
const assert = require('node:assert/strict');
const {createHash} = require('node:crypto');
const {JSDOM, VirtualConsole} = require('jsdom');
const client = require('esbuild').buildSync({entryPoints:['src/main.tsx'],bundle:true,platform:'browser',format:'iife',write:false,loader:{'.css':'empty'}}).outputFiles[0].text;
const pause = ms => new Promise(resolve=>setTimeout(resolve,ms));
const normalize = text => text.replace(/\s+/g,' ').trim();
const errors=[];
function check(d) {
  for(const selector of ['h1','title','meta[name="description"]','link[rel="canonical"]']) assert.equal(d.querySelectorAll(selector).length,1,selector);
  assert.equal(d.querySelector('link[rel="canonical"]').href,'https://mavibasim.com/el-ilani');
  assert.equal(d.querySelectorAll('#app-seo-metadata-jsonld').length,0);
  assert.equal(d.querySelectorAll('main table').length,1);
  assert.equal(d.querySelectorAll('main table tbody tr').length,14);
  const schemas=[...d.querySelectorAll('script[type="application/ld+json"]')].flatMap(e=>{const v=JSON.parse(e.textContent);return Array.isArray(v)?v:v['@graph']||[v]});
  for(const type of ['Service','FAQPage','BreadcrumbList']) assert.equal(schemas.filter(e=>e['@type']===type).length,1,type);
  assert.equal(schemas.filter(e=>e['@type']==='Product').length,0);
  const service=schemas.find(e=>e['@type']==='Service');
  const offers=service.hasOfferCatalog.itemListElement;
  const rows=[...d.querySelectorAll('main table tbody tr')];
  assert.equal(offers.length,rows.length);
  for(const row of rows) {
    const cells=[...row.querySelectorAll('td')].slice(-6);
    const offer=offers.find(e=>e['@id'].endsWith('#teklif-'+cells[1].textContent.trim()));
    assert.ok(offer);
    assert.equal(offer.price,cells[4].textContent.replace(/\./g,'').replace(/[^0-9,]/g,'').replace(',','.'));
    assert.equal(offer.priceCurrency,'TRY');
    assert.equal(offer.priceSpecification.valueAddedTaxIncluded,false);
    assert.ok(offer.itemOffered.name.includes(normalize(cells[0].textContent)));
    assert.ok(offer.itemOffered.name.includes(normalize(cells[3].textContent)));
    assert.ok(!('availability' in offer)&&!('priceValidUntil' in offer));
  }
  const faqs=schemas.find(e=>e['@type']==='FAQPage').mainEntity;
  assert.equal(faqs.length,8);
  const faqText=normalize(d.querySelector('#faq-section').textContent);
  for(const item of faqs){assert.ok(faqText.includes(normalize(item.name)));assert.ok(faqText.includes(normalize(item.acceptedAnswer.text)));}
  const ids=[...d.querySelectorAll('[id]')].map(e=>e.id);assert.equal(new Set(ids).size,ids.length);
  assert.equal(d.querySelectorAll('main img[src^="/images/el-ilani/"]').length,6);
}
(async()=>{
  // Baseline hashes protect the existing pricing markup, styles and tariff.
  const hash = text => createHash('sha256').update(text).digest('hex');
  const source = fs.readFileSync('src/components/ElIlani.tsx', 'utf8');
  assert.equal(hash(source.slice(source.indexOf('        {/* PRICE TABLE SECTION */}'),source.indexOf('        {/* FİYAT TABLOSU ALTI'))), 'd0e77a4d83319dcf79991e300a5e71571c8d5915172eb08961ed5c8fd283282d', 'Protected pricing markup changed');
  assert.equal(hash(fs.readFileSync('src/data/productData.ts')), '6f1d1f55befcf92660884061c5c29fbb27c42afc24f9e286e61a73ad0211095a', 'Protected tariff changed');
  const vc=new VirtualConsole();vc.on('error',(...v)=>errors.push(v.map(String).join(' ')));vc.on('jsdomError',e=>errors.push(String(e)));
  const dom=new JSDOM(fs.readFileSync('dist/el-ilani/index.html','utf8'),{url:'https://mavibasim.com/el-ilani',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc});
  try{
    const w=dom.window,d=w.document;w.scrollTo=()=>{};w.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
    check(d);const table=d.querySelector('main table');const html=table.outerHTML;const text=normalize(d.querySelector('main').textContent);
    w.eval(client);await pause(700);check(d);
    assert.strictEqual(d.querySelector('main table'),table,'Hydration replaced table');assert.equal(table.outerHTML,html);assert.equal(normalize(d.querySelector('main').textContent),text);
    d.querySelector('table button').click();await pause(100);
    const order = [...d.querySelectorAll('a[href^="https://wa.me/"]')].find(e=>e.textContent.includes('WhatsApp ile İletişim'));
    assert.ok(order, 'Order modal did not open');
    const message = new URL(order.href).searchParams.get('text');
    for (const value of ['ELI3', '9.2x20 cm', '6.000 adet']) assert.ok(message.includes(value), value + ' missing from order');
    const home=[...d.querySelectorAll('a[href="/"]')].find(e=>!e.target);home.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));await pause(400);
    w.history.back();await pause(500);check(d);
    assert.deepEqual(errors,[],'Runtime or hydration errors');
  }finally{dom.window.close();}
  console.log('PASS: protected price source, 14 rows, six gallery images, eight FAQs, single schemas/canonical, hydration node/content preservation, order and return navigation.');
})().catch(e=>{console.error(e.stack);process.exit(1)});
