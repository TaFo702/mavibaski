const fs=require('node:fs');
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const {JSDOM,VirtualConsole}=require('jsdom');
const client=require('esbuild').buildSync({entryPoints:['src/main.tsx'],bundle:true,platform:'browser',format:'iife',write:false,loader:{'.css':'empty'}}).outputFiles[0].text;
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const errors=[];
const normalize=s=>s.replace(/\s+/g,' ').trim();
// Ignore only React SSR text separators and React Router's discovery marker.
// Prices, classes, attributes, labels, links and order controls remain protected.
const hash=d=>crypto.createHash('sha256').update(d.querySelector('#fiyat-tablosu > .bg-white').outerHTML.replace(/<!-- -->/g,'').replaceAll(' data-discover="true"','')).digest('hex');
const expectedPriceHash='558ff9fbb8d3a81a96777731d75c74d59832af0b63494dc2d6c888eca3dc0237';
function check(d){
 assert.equal(d.querySelectorAll('h1').length,1);
 assert.equal(d.querySelector('h1').textContent,'Numaratörlü Para Makbuzu Baskı Fiyatları');
 for(const s of ['title','meta[name="description"]','link[rel="canonical"]'])assert.equal(d.querySelectorAll(s).length,1,s);
 assert.equal(d.querySelector('link[rel="canonical"]').href,'https://mavibasim.com/para-makbuzu');
 const ids=[...d.querySelectorAll('[id]')].map(x=>x.id);assert.equal(new Set(ids).size,ids.length,'Duplicate IDs');
 assert.equal(hash(d),expectedPriceHash);
 for(const s of ['og:title','og:description','og:url','og:image'])assert.equal(d.querySelectorAll(`meta[property="${s}"]`).length,1,s);
 for(const s of ['twitter:title','twitter:description','twitter:image'])assert.equal(d.querySelectorAll(`meta[name="${s}"]`).length,1,s);
 const schemas=[...d.querySelectorAll('script[type="application/ld+json"]')].flatMap(s=>{const value=JSON.parse(s.textContent);return Array.isArray(value)?value:[value];});
 for(const t of ['Product','FAQPage','BreadcrumbList'])assert.equal(schemas.filter(s=>s['@type']===t).length,1,t);
 assert.equal(schemas.find(s=>s['@type']==='Product').offers.lowPrice,'1900');
 assert.equal(d.querySelectorAll('a[href^="/makbuz/"]').length,0);
 const product=schemas.find(s=>s['@type']==='Product');
 assert.equal(product.offers.highPrice,'9250');assert.equal(product.offers.offerCount,'18');
 assert.equal(schemas.find(s=>s['@type']==='BreadcrumbList').itemListElement.length,3);
 assert.ok(!/3[–-]5 İş Günü|Heidelberg|sıfır hatayla|Doğrudan imalathanemizden|Ücretsiz Grafik Desteği|Topkapı Üretim Tesisi/.test(d.querySelector('main').textContent));
 for(const id of ['kimler-kullanir','nasil-doldurulur','uretim-sureci','sss-bolumu'])assert.equal(d.querySelectorAll('#'+id).length,1,id);
 assert.equal(d.querySelector('meta[property="og:image:width"]').content,'1536');
 assert.equal(d.querySelector('meta[property="og:image:height"]').content,'1024');
 const toc=d.querySelector('nav[aria-label="Sayfa İçindekiler Navigasyonu"]');
 for(const link of toc.querySelectorAll('a[href^="#"]'))assert.equal(d.querySelectorAll(link.getAttribute('href')).length,1,'Invalid TOC '+link.href);
 assert.ok(d.querySelector('meta[property="og:image"]').content.includes('/images/para-makbuzu/'));
 const faq=schemas.find(s=>s['@type']==='FAQPage').mainEntity;assert.equal(faq.length,6);
 const related=[...d.querySelectorAll('main a[href="/arac-kiralama"]')];assert.ok(related.some(a=>a.textContent.includes('Araç Kiralama Formu')));
 assert.ok(!related.some(a=>a.textContent.includes('Servis Formu')));
 const visible=normalize(d.querySelector('#sss-bolumu').textContent);
 for(const q of faq){assert.ok(visible.includes(normalize(q.name)),q.name);assert.ok(visible.includes(normalize(q.acceptedAnswer.text)),q.name+' answer');}
}
async function settle(w,path){
 for(let i=0;i<100;i++){
  if(w.location.pathname===path&&w.document.querySelector('link[rel="canonical"]')?.href==='https://mavibasim.com'+path&&w.document.querySelector('h1')){await sleep(400);return;}
  await sleep(100);
 }
 throw new Error('Route did not settle: '+path);
}
async function open(){
 const vc=new VirtualConsole();vc.on('error',(...a)=>errors.push(a.map(String).join(' ')));vc.on('jsdomError',e=>errors.push(String(e)));
 const dom=new JSDOM(fs.readFileSync('dist/para-makbuzu/index.html','utf8'),{url:'https://mavibasim.com/para-makbuzu',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc});
 const w=dom.window;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){w.__target=this.id;};
 w.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
 const d=w.document;check(d);assert.equal(crypto.createHash('sha256').update(d.querySelector('#fiyat-tablosu > .bg-white').outerHTML).digest('hex'),'cc0f124a41b3ad11d4672fc74d8709514716e1d35f415872fc8cd33c2e2da74d','Initial price card changed');
 const before={priceHTML:d.querySelector('#fiyat-tablosu > .bg-white').outerHTML,table:d.querySelector('main table'),text:normalize(d.querySelector('main').textContent),links:[...d.querySelectorAll('main a[href]')].map(x=>x.getAttribute('href'))};
 w.eval(client);await settle(w,'/para-makbuzu');check(d);
 assert.strictEqual(d.querySelector('main table'),before.table,'Hydration replaced the protected table');
 assert.equal(d.querySelector('#fiyat-tablosu > .bg-white').outerHTML,before.priceHTML,'Hydration changed protected price card');
 assert.equal(normalize(d.querySelector('main').textContent),before.text,'Hydration changed visible content');
 assert.deepEqual([...d.querySelectorAll('main a[href]')].map(x=>x.getAttribute('href')),before.links,'Hydration changed links');
 return dom;
}
async function go(w,path){
 const a=[...w.document.querySelectorAll('a[href]')].find(x=>x.getAttribute('href')===path&&!x.target);
 assert.ok(a,'Missing navigation '+path);a.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));await settle(w,path);
}
(async()=>{
 const dom=await open(),w=dom.window,d=w.document;
 d.querySelector('a[href="#uretim-sureci"]').dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));
 assert.equal(w.__target,'uretim-sureci');assert.ok(d.querySelector('#uretim-sureci h2').textContent.includes('Baskı Süreci'));
 for(const path of ['/tahsilat-makbuzu','/sozlesme-baski','/tediye-makbuzu','/']){
  await go(w,path);w.history.back();await settle(w,'/para-makbuzu');check(d);
 }
 d.querySelector('#fiyat-tablosu table button').dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));await sleep(300);
 assert.ok(d.body.textContent.includes('WhatsApp ile İletişim'),'Order selection did not open');
 assert.equal(hash(d),expectedPriceHash);
 assert.ok(!/Aynı Gün Tasarım Onayı|PDF prova aynı gün|Ortalama 3–4 iş günü/.test(d.body.textContent),'Unverified modal lead-time claim');
 assert.ok(d.body.textContent.includes('Ürün, adet, malzeme ve onay sürecine göre teklif aşamasında paylaşılır.'));
 const wa=[...d.querySelectorAll('a[href^="https://wa.me/"]')].find(a=>a.textContent.includes('WhatsApp ile İletişim'));
 assert.ok(decodeURIComponent(wa.href).includes('5 cilt'),'Para makbuzu quantity unit must be cilt');
 assert.ok(decodeURIComponent(wa.href).includes('Ebat: 14 x 20 cm (YARIM BOY)'),'Para makbuzu quote must include its existing size');
 dom.window.close();
 const reload=await open();reload.window.close();
 assert.deepEqual(errors,[],'Runtime or hydration errors');
 console.log('PASS: direct load, reload, hydration keeps price table node/markup/text/links, 4 return navigations, metadata/schema ownership, anchor and order selection.');
})().catch(e=>{console.error(e);process.exit(1)});
