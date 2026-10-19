const fs=require('node:fs');
const assert=require('node:assert/strict');
const {createHash}=require('node:crypto');
const {JSDOM,VirtualConsole}=require('jsdom');
const normalize=t=>t.replace(/\s+/g,' ').trim();
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const hash=t=>createHash('sha256').update(t).digest('hex');
const source=fs.readFileSync('src/components/Afis.tsx','utf8');
const priceSection=s=>s.slice(s.indexOf('        {/* FİYAT TABLOSU GİRİŞ AÇIKLAMASI */}'),s.indexOf('        {/* ÖZEL ÖLÇÜ, KÂĞIT VE GRAMAJ TEKLİFİ ALANI */}'));
const technical=s=>s.slice(s.indexOf('        {/* TEKNİK ÖZELLİKLER TABLOSU */}'),s.indexOf('        {/* AFİŞ NASIL HAZIRLANIR?',s.indexOf('        {/* TEKNİK ÖZELLİKLER TABLOSU */}')));
function check(d){
 for(const selector of ['h1','title','meta[name="description"]','link[rel="canonical"]','meta[name="robots"]','meta[property="og:title"]','meta[property="og:description"]','meta[property="og:url"]','meta[property="og:image"]','meta[name="twitter:title"]','meta[name="twitter:description"]','meta[name="twitter:image"]']) assert.equal(d.querySelectorAll(selector).length,1,selector);
 assert.equal(d.querySelector('title').textContent,'Afiş Baskı Fiyatları | 35x50 - 50x70 - 70x100 cm');
 assert.equal(d.querySelector('link[rel="canonical"]').href,'https://mavibasim.com/afis');
 assert.equal(d.querySelectorAll('main table').length,2);
 assert.equal(d.querySelectorAll('#gorsel-galeri img').length,6);
 assert.equal(d.querySelectorAll('#app-seo-metadata-jsonld').length,0);
 const ids=[...d.querySelectorAll('[id]')].map(e=>e.id);assert.equal(new Set(ids).size,ids.length);
 const schemas=[...d.querySelectorAll('script[type="application/ld+json"]')].flatMap(e=>{const v=JSON.parse(e.textContent);return Array.isArray(v)?v:v['@graph']||[v]});
 for(const type of ['Service','FAQPage','BreadcrumbList'])assert.equal(schemas.filter(e=>e['@type']===type).length,1,type);
 assert.equal(schemas.filter(e=>e['@type']==='Product').length,0);
 const service=schemas.find(e=>e['@type']==='Service');assert.ok(fs.existsSync('public'+new URL(service.image).pathname));
 const rows=[...d.querySelectorAll('main table')[0].querySelectorAll('tbody tr')];assert.equal(rows.length,6);
 const offers=service.hasOfferCatalog.itemListElement;assert.equal(offers.length,rows.length);
 for(const row of rows){
  const cells=[...row.querySelectorAll('td')].slice(-6);
  const offer=offers.find(e=>e['@id'].endsWith('#teklif-'+cells[1].textContent.trim()));assert.ok(offer);
  assert.equal(offer.price,cells[4].textContent.replace(/\./g,'').replace(/[^0-9,]/g,'').replace(',','.'));
  assert.equal(offer.priceCurrency,'TRY');assert.equal(offer.priceSpecification.valueAddedTaxIncluded,false);
  for(const i of [0,2,3])assert.ok(offer.itemOffered.name.includes(normalize(cells[i].textContent)));
  assert.ok(!('availability' in offer)&&!('priceValidUntil' in offer));
 }
 const faq=schemas.find(e=>e['@type']==='FAQPage').mainEntity;assert.equal(faq.length,10);
 const visibleFaq=normalize(d.querySelector('#faq-section').textContent);
 for(const q of faq){assert.ok(visibleFaq.includes(normalize(q.name)));assert.ok(visibleFaq.includes(normalize(q.acceptedAnswer.text)));}
 const breadcrumb=schemas.find(e=>e['@type']==='BreadcrumbList');
 assert.deepEqual(breadcrumb.itemListElement.map(e=>e.name),['Ana Sayfa','Matbaa Ürünleri','Afiş Baskı Fiyatları']);
 assert.ok(!d.querySelector('main').textContent.includes('görseller daha sonra eklenecektir'));
}
(async()=>{
 assert.equal(hash(priceSection(source)),'07db6e6a860ad96459f3cd57e0fdef07f25975a40a280798a8a2742d19bfc288','Protected price list including explanations changed');
 assert.equal(hash(technical(source)),'6c2a73caed27564a2b56e99e2734c296995b280fcd85dd52e8dc7cf8cbf6e038','Protected technical table changed');
 assert.equal(hash(fs.readFileSync('src/data/productData.ts')),'6f1d1f55befcf92660884061c5c29fbb27c42afc24f9e286e61a73ad0211095a','Tariff source changed');
 const client=require('esbuild').buildSync({entryPoints:['src/main.tsx'],bundle:true,platform:'browser',format:'iife',write:false,loader:{'.css':'empty'}}).outputFiles[0].text;
 for(let attempt=0;attempt<2;attempt++){
  const errors=[],opened=[];
  const vc=new VirtualConsole();vc.on('error',(...a)=>errors.push(a.map(String).join(' ')));vc.on('jsdomError',e=>errors.push(String(e)));
  const dom=new JSDOM(fs.readFileSync('dist/afis/index.html','utf8'),{url:'https://mavibasim.com/afis',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc});
  try{
   const w=dom.window,d=w.document;w.scrollTo=()=>{};w.open=url=>opened.push(url);w.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
   check(d);const tables=[...d.querySelectorAll('main table')];const html=tables.map(e=>e.outerHTML);const text=normalize(d.querySelector('main').textContent);
   w.eval(client);await pause(900);check(d);
   tables.forEach((table,i)=>{assert.strictEqual(d.querySelectorAll('main table')[i],table,'Hydration replaced table');assert.equal(table.outerHTML,html[i]);});
   assert.equal(normalize(d.querySelector('main').textContent),text,'Hydration changed visible content');
   d.querySelector('main table button').click();assert.equal(opened.length,1);
   const message=new URL(opened[0]).searchParams.get('text');for(const value of ['AF1','34x49 cm (35x50)','250 Adet','2.550 ₺'])assert.ok(message.includes(value));
   const link=d.querySelector('a[href="/brosur"]');link.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));await pause(500);
   assert.equal(d.querySelector('link[rel="canonical"]').href,'https://mavibasim.com/brosur');assert.equal(d.querySelectorAll('link[rel="canonical"]').length,1);
   assert.ok(![...d.querySelectorAll('script[type="application/ld+json"]')].some(e=>e.textContent.includes('afis#')));
   w.history.back();await pause(500);check(d);assert.deepEqual(errors,[],'Runtime/hydration errors');
  }finally{dom.window.close();}
 }
 console.log('PASS: protected price/technical tables and tariff; full first HTML; single metadata/schema; six tariff offers; ten matching FAQs; hydration preserves nodes/content; order message; route transition/return; repeated direct initialization.');
})().catch(e=>{console.error(e.stack);process.exit(1)});
