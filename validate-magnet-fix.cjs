const fs = require('node:fs');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const {JSDOM, VirtualConsole} = require('jsdom');
const normalize = s => s.replace(/\s+/g, ' ').trim();
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const original = file => execFileSync('git', ['show', '2d09e29874fd1398eed77e5e4e97565816baea49:' + file], {encoding:'utf8'});
function check(d) {
  for (const selector of ['h1','title','meta[name="description"]','link[rel="canonical"]','meta[name="robots"]','meta[property="og:image"]','meta[name="twitter:image"]']) assert.equal(d.querySelectorAll(selector).length, 1, selector);
  assert.equal(d.querySelector('link[rel="canonical"]').href, 'https://mavibasim.com/magnet');
  assert.equal(d.querySelector('meta[property="og:image:width"]').content,'1536');
  assert.equal(d.querySelector('meta[property="og:image:height"]').content,'1024');
  assert.equal(d.querySelectorAll('main table').length,2);
  const content=normalize(d.querySelector('main').textContent).toLocaleLowerCase('tr-TR');
  for(const term of ['toptan magnet baskı','toplu magnet siparişi','logolu magnet','promosyon magnet','reklam magneti','magnetli kartvizit','magnet imalatı']) assert.ok(content.includes(term),term);
  for(const href of ['/sektor/donerci-magnet-baski','/blog/magnet-baski-olculeri-ve-tasarim-rehberi']) assert.ok(d.querySelector('main a[href="'+href+'"]'),href);

  assert.equal(d.querySelectorAll('#gorsel-galeri img').length,6);
  const ids = [...d.querySelectorAll('[id]')].map(e=>e.id); assert.equal(new Set(ids).size,ids.length);
  const schemas = [...d.querySelectorAll('script[type="application/ld+json"]')].map(e=>JSON.parse(e.textContent));
  assert.equal(schemas.filter(s=>s['@type']==='Product').length,2);
  for (const type of ['FAQPage','BreadcrumbList']) assert.equal(schemas.filter(s=>s['@type']===type).length,1,type);
  const faq = schemas.find(s=>s['@type']==='FAQPage').mainEntity;
  assert.equal(faq.length,10);
  for (const q of faq) {
    assert.ok(normalize(d.querySelector('#faq-section').textContent).includes(normalize(q.name)));
    assert.ok(normalize(d.querySelector('#faq-section').textContent).includes(normalize(q.acceptedAnswer.text)));
  }
  assert.deepEqual(schemas.filter(s=>s['@type']==='Product').map(s=>[s.sku,s.offers.price,s.offers.priceCurrency]), [['MAG1','1250','TRY'],['MAG2','1180','TRY']]);
  for(const s of schemas.filter(s=>s['@type']==='Product')) {assert.equal(s.offers['@type'],'Offer'); assert.ok(fs.existsSync('public'+new URL(s.image).pathname));}
  for(const image of d.querySelectorAll('#gorsel-galeri img')) assert.ok(fs.existsSync('public'+image.getAttribute('src')));
}
(async()=>{
  assert.equal(fs.readFileSync('src/data/productData.ts','utf8'),original('src/data/productData.ts'),'Protected tariff data changed');
  const oldPage=original('src/components/Magnet.tsx');
  const newPage=fs.readFileSync('src/components/Magnet.tsx','utf8');
  const tables = page => page.match(/<table[\s\S]*?<\/table>/g);
  assert.deepEqual(tables(newPage),tables(oldPage),'Protected price and specification tables changed');
  const tariffSection = page => page.match(/<section id="fiyat-tablosu"[\s\S]*?<\/section>/)[0];
  assert.equal(tariffSection(newPage),tariffSection(oldPage),'Protected price section changed');
  const loadPages = source => {
    const compiled = require('esbuild').transformSync(source,{loader:'ts',format:'cjs'}).code;
    const mod={exports:{}};
    require('node:vm').runInNewContext(compiled,{module:mod,exports:mod.exports});
    return JSON.parse(JSON.stringify(mod.exports.SEO_PAGES_DATA));
  };
  const before=loadPages(original('src/data/seoPagesData.ts'));
  const after=loadPages(fs.readFileSync('src/data/seoPagesData.ts','utf8'));
  const targets=['donerci-magnet-baski','ankara-magnet-baski','ordu-magnet-baski','sinop-magnet-baski','elazig-magnet-baski'];
  for(const key of Object.keys(before)) {
    if(!targets.includes(key)) {assert.deepEqual(after[key],before[key],key);continue;}
    const page=after[key], old=before[key];
    for(const field of ['title','metaDesc','h1','intro','tagline','offers','faqs']) assert.deepEqual(page[field],old[field],key+': '+field);
    assert.deepEqual(page.sections.slice(1),old.sections,'Existing commercial sections changed: '+key);
    assert.deepEqual(page.internalLinks.map(x=>x.path),old.internalLinks.map(x=>x.path));
    const dom=new JSDOM(fs.readFileSync('dist'+page.path+'/index.html','utf8'));
    try {
      const d=dom.window.document;
      assert.equal(d.title,page.title);
      assert.equal(d.querySelector('meta[name="description"]').content,page.metaDesc);
      assert.equal(d.querySelector('link[rel="canonical"]').href,'https://mavibasim.com'+page.path);
      assert.ok(normalize(d.querySelector('main').textContent).includes(page.sections[0].paragraphs[0]),key);
    } finally {dom.window.close();}
  }
  const client = require('esbuild').buildSync({entryPoints:['src/main.tsx'],bundle:true,platform:'browser',format:'iife',write:false,loader:{'.css':'empty'}}).outputFiles[0].text;
  for(let attempt=0;attempt<2;attempt++) {
    const errors=[]; const vc=new VirtualConsole(); vc.on('error',(...a)=>errors.push(a.map(String).join(' '))); vc.on('jsdomError',e=>errors.push(String(e)));
    const dom=new JSDOM(fs.readFileSync('dist/magnet/index.html','utf8'),{url:'https://mavibasim.com/magnet',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc});
    try {
      const w=dom.window,d=w.document;w.scrollTo=()=>{};w.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
      check(d);const table=d.querySelector('main table'), html=table.outerHTML, text=normalize(d.querySelector('main').textContent);
      w.eval(client);await pause(900);check(d);
      assert.strictEqual(d.querySelector('main table'),table,'Hydration replaced protected table');assert.equal(table.outerHTML,html);assert.equal(normalize(d.querySelector('main').textContent),text);
      d.querySelector('main table button').click();await pause(100);
      assert.ok(d.body.textContent.includes('MAG1'),'Order dialog missing correct product');
      const link=d.querySelector('main a[href="/etiket"]');link.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));await pause(600);
      assert.equal(d.querySelector('link[rel="canonical"]').href,'https://mavibasim.com/etiket');
      assert.ok(![...d.querySelectorAll('script[type="application/ld+json"]')].some(e=>e.textContent.includes('https://mavibasim.com/magnet#mag')));
      w.history.back();await pause(600);check(d);assert.deepEqual(errors,[],'Runtime/hydration errors');
    } finally {dom.window.close();}
  }
  console.log('PASS: protected table/tariff unchanged; target content and links; complete initial HTML; metadata; 10 FAQ pairs; 6 gallery assets; hydration preserves table node and content; order dialog; route transition and return; repeated initialization.');
})().catch(e=>{console.error(e.stack);process.exit(1)});
