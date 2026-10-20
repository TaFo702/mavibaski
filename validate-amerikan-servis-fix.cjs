const fs = require('node:fs');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const {JSDOM, VirtualConsole} = require('jsdom');
const normalize = s => s.replace(/\s+/g, ' ').trim();
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const original = file => execFileSync('git', ['show', 'a9c219fb1af837726a51c295dfc426fadeb47c83:' + file], {encoding:'utf8'});
function check(d) {
  for (const selector of ['h1','title','meta[name="description"]','link[rel="canonical"]','meta[name="robots"]','meta[property="og:image"]','meta[name="twitter:image"]']) assert.equal(d.querySelectorAll(selector).length, 1, selector);
  assert.equal(d.querySelector('link[rel="canonical"]').href, 'https://mavibasim.com/amerikan-servis');
  assert.equal(d.querySelector('meta[property="og:image:width"]').content,'768');
  assert.equal(d.querySelector('meta[property="og:image:height"]').content,'512');
  assert.equal(d.querySelectorAll('main table').length,1);
  assert.equal(d.querySelectorAll('#gorsel-galeri img').length,6);
  const ids = [...d.querySelectorAll('[id]')].map(e=>e.id); assert.equal(new Set(ids).size,ids.length);
  const schemas = [...d.querySelectorAll('script[type="application/ld+json"]')].map(e=>JSON.parse(e.textContent));
  for (const type of ['Product','FAQPage','BreadcrumbList']) assert.equal(schemas.filter(s=>s['@type']===type).length,1,type);
  const faq = schemas.find(s=>s['@type']==='FAQPage').mainEntity;
  assert.equal(faq.length,10);
  for (const q of faq) {
    assert.ok(normalize(d.querySelector('#faq-section').textContent).includes(normalize(q.name)));
    assert.ok(normalize(d.querySelector('#faq-section').textContent).includes(normalize(q.acceptedAnswer.text)));
  }
  assert.deepEqual(schemas.find(s=>s['@type']==='Product').offers, {'@type':'AggregateOffer',priceCurrency:'TRY',lowPrice:'3600',highPrice:'4850',offerCount:'3'});
  for(const image of d.querySelectorAll('#gorsel-galeri img')) assert.ok(fs.existsSync('public'+image.getAttribute('src')));
}
(async()=>{
  for(const file of ['src/components/AmerikanServis.tsx','src/data/productData.ts']) assert.equal(fs.readFileSync(file,'utf8'),original(file),'Protected page/table/tariff source changed');
  const client = require('esbuild').buildSync({entryPoints:['src/main.tsx'],bundle:true,platform:'browser',format:'iife',write:false,loader:{'.css':'empty'}}).outputFiles[0].text;
  for(let attempt=0;attempt<2;attempt++) {
    const errors=[]; const vc=new VirtualConsole(); vc.on('error',(...a)=>errors.push(a.map(String).join(' '))); vc.on('jsdomError',e=>errors.push(String(e)));
    const dom=new JSDOM(fs.readFileSync('dist/amerikan-servis/index.html','utf8'),{url:'https://mavibasim.com/amerikan-servis',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc});
    try {
      const w=dom.window,d=w.document;w.scrollTo=()=>{};w.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
      check(d);const table=d.querySelector('main table'), html=table.outerHTML, text=normalize(d.querySelector('main').textContent);
      w.eval(client);await pause(900);check(d);
      assert.strictEqual(d.querySelector('main table'),table,'Hydration replaced protected table');assert.equal(table.outerHTML,html);assert.equal(normalize(d.querySelector('main').textContent),text);
      d.querySelector('main table button').click();await pause(100);
      assert.ok(d.body.textContent.includes('SRV1'),'Order dialog missing correct product');
      const link=d.querySelector('main a[href="/adisyon"]');link.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));await pause(600);
      assert.equal(d.querySelector('link[rel="canonical"]').href,'https://mavibasim.com/adisyon');
      assert.ok(![...d.querySelectorAll('script[type="application/ld+json"]')].some(e=>e.textContent.includes('Amerikan Servis Baskı Fiyatları ve Kağıt Modelleri')));
      w.history.back();await pause(600);check(d);assert.deepEqual(errors,[],'Runtime/hydration errors');
    } finally {dom.window.close();}
  }
  console.log('PASS: unchanged page/table/tariff; complete initial HTML; metadata; 10 FAQ pairs; 6 gallery assets; hydration preserves table node and content; order dialog; route transition and return; repeated initialization.');
})().catch(e=>{console.error(e.stack);process.exit(1)});
