const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const {JSDOM, VirtualConsole} = require('jsdom');
const client = require('esbuild').buildSync({entryPoints:['src/main.tsx'],bundle:true,platform:'browser',format:'iife',write:false,loader:{'.css':'empty'}}).outputFiles[0].text;
const path='/perakende-satis-fisi', url='https://mavibasim.com'+path;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const normalize=s=>s.replace(/\s+/g,' ').trim();
const errors=[];
// Captured from the unmodified page's existing pricing section before this fix.
const expectedPriceHash='f6caf7d14a180c408eebcb8e9cd0d1a835728b0f46c934e41440777f07a5ff51';
const pricing=d=>d.querySelector('#fiyat-tablosu').outerHTML;
const hash=d=>crypto.createHash('sha256').update(pricing(d).replace(/<!-- -->/g,'').replaceAll(' data-discover="true"','')).digest('hex');
const schemas=d=>[...d.querySelectorAll('script[type="application/ld+json"]')].flatMap(e=>{const v=JSON.parse(e.textContent);return Array.isArray(v)?v:[v]});
function check(d){
 assert.equal(d.querySelectorAll('h1').length,1);
 assert.equal(d.querySelector('h1').textContent,'Perakende Satış Fişi Baskısı');
 for(const s of ['title','meta[name="description"]','link[rel="canonical"]','meta[name="robots"]'])assert.equal(d.querySelectorAll(s).length,1,s);
 assert.equal(d.querySelector('link[rel="canonical"]').href,url);
 for(const key of ['og:title','og:description','og:url','og:image','og:type'])assert.equal(d.querySelectorAll(`meta[property="${key}"]`).length,1,key);
 for(const key of ['twitter:title','twitter:description','twitter:image'])assert.equal(d.querySelectorAll(`meta[name="${key}"]`).length,1,key);
 assert.equal(d.querySelector('meta[property="og:url"]').content,url);
 assert.equal(d.querySelector('meta[property="og:image"]').content,'https://mavibasim.com/images/siparis-fisi/kendinden-karbonlu-siparis-fisi.webp');
 assert.equal(hash(d),expectedPriceHash,'Protected pricing section changed');
 const all=schemas(d);
 for(const type of ['Product','FAQPage','BreadcrumbList'])assert.equal(all.filter(s=>s['@type']===type).length,1,type);
 const product=all.find(s=>s['@type']==='Product');
 assert.equal(product.name,d.querySelector('h1').textContent);
 assert.equal(product.review,undefined);assert.equal(product.aggregateRating,undefined);
 const values=[...d.querySelectorAll('#fiyat-tablosu tbody tr')].filter(r=>!r.textContent.includes('Renk Farkı')).flatMap(r=>[...r.querySelectorAll('td')].filter(x=>x.textContent.includes('₺')).map(x=>Number(x.textContent.replace(/[^0-9]/g,''))));
 assert.equal(values.length,27);
 assert.deepEqual(product.offers,{'@type':'AggregateOffer',priceCurrency:'TRY',lowPrice:String(Math.min(...values)),highPrice:String(Math.max(...values)),offerCount:String(values.length),url});
 const breadcrumb=all.find(s=>s['@type']==='BreadcrumbList').itemListElement;
 assert.deepEqual(breadcrumb.map(x=>x.name),['Ana Sayfa','Makbuz & Formlar','Perakende Satış Fişi']);
 const visible=normalize(d.querySelector('#sss-bolumu').textContent);
 for(const q of all.find(s=>s['@type']==='FAQPage').mainEntity){assert.ok(visible.includes(normalize(q.name)));assert.ok(visible.includes(normalize(q.acceptedAnswer.text)));}
 const ids=[...d.querySelectorAll('[id]')].map(x=>x.id);assert.equal(new Set(ids).size,ids.length,'Duplicate IDs');
 const toc=d.querySelector('nav[aria-label="Sayfa İçindekiler Navigasyonu"]');
 for(const a of toc.querySelectorAll('a[href^="#"]'))assert.equal(d.querySelectorAll(a.getAttribute('href')).length,1,a.textContent);
 assert.ok(!/\bTOC\b/.test(d.querySelector('main').textContent));
 for(const img of d.querySelectorAll('main img')){assert.ok(img.alt);assert.ok(img.width>0&&img.height>0);assert.ok(fs.existsSync('public'+img.getAttribute('src')));}
}
async function settle(w,p){for(let i=0;i<100;i++){if(w.location.pathname===p&&w.document.querySelector('link[rel="canonical"]')?.href==='https://mavibasim.com'+p&&w.document.querySelector('h1')){await sleep(500);return;}await sleep(50);}throw Error('Route failed '+p);}
function click(w,e){assert.ok(e,'Missing control');e.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));}
async function open(){
 const vc=new VirtualConsole();vc.on('error',(...a)=>errors.push(a.map(String).join(' ')));vc.on('jsdomError',e=>errors.push(String(e)));
 const dom=new JSDOM(fs.readFileSync('dist/perakende-satis-fisi/index.html','utf8'),{url,runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
 const w=dom.window,d=w.document;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){w.__target=this.id};w.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
 check(d);const table=d.querySelector('#fiyat-tablosu table'),before=pricing(d),body=normalize(d.querySelector('main').textContent);
 w.eval(client);await settle(w,path);check(d);
 assert.strictEqual(d.querySelector('#fiyat-tablosu table'),table,'Hydration replaced price table');assert.equal(pricing(d),before);assert.equal(normalize(d.querySelector('main').textContent),body);
 return dom;
}
(async()=>{
 const dom=await open(),w=dom.window,d=w.document;
 for(const a of d.querySelectorAll('nav[aria-label="Sayfa İçindekiler Navigasyonu"] a[href^="#"]')){click(w,a);assert.equal(w.__target,a.getAttribute('href').slice(1));}
 click(w,d.querySelector('#matbaa-urunleri-btn'));await sleep(150);
 assert.ok(d.querySelector('#matbaa-urunleri-dropdown-menu a[href="/perakende-satis-fisi"]'),'Missing desktop menu link');
 click(w,d.querySelector('#matbaa-urunleri-btn'));await sleep(150);
 click(w,d.querySelector('button[aria-label="Menüyü Aç"]'));await sleep(150);
 assert.ok(d.querySelector('nav a[href="/perakende-satis-fisi"]'),'Mobile menu link missing');
 click(w,d.querySelector('button[aria-label="Menüyü Kapat"]'));await sleep(100);
 for(const p of ['/siparis-fisi','/adisyon','/makbuz-ve-formlar','/']){
  click(w,[...d.querySelectorAll('a[href]')].find(a=>a.getAttribute('href')===p&&!a.target));await settle(w,p);
  assert.ok(!schemas(d).some(s=>s['@type']==='Product'&&s.name==='Perakende Satış Fişi Baskısı'),'Stale Product leaked to '+p);
  w.history.back();await settle(w,path);check(d);
 }
 click(w,d.querySelector('#fiyat-tablosu table button'));await sleep(200);
 const quote=()=>decodeURIComponent([...d.querySelectorAll('a[href^="https://wa.me/"]')].find(a=>a.textContent.includes('WhatsApp ile İletişim')).href);
 assert.ok(quote().includes('5 cilt'));assert.ok(quote().includes('10 X 14 cm. (KÜÇÜK BOY)'));assert.ok(quote().includes('1.850'));
 click(w,[...d.querySelectorAll('button')].find(b=>normalize(b.textContent).startsWith('500 CİLT')));await sleep(150);assert.ok(quote().includes('12.500'));
 click(w,[...d.querySelectorAll('button')].find(b=>/^2\s*RENK$/.test(normalize(b.textContent))));await sleep(150);assert.ok(quote().includes('15.900'));assert.equal(hash(d),expectedPriceHash);
 dom.window.close();const reload=await open();reload.window.close();assert.deepEqual(errors,[],'Console/hydration errors');
 console.log('PASS: complete initial HTML, reload, price HTML and node preservation, single metadata and schema, 27 table-matched offers, FAQ parity, anchors, desktop/mobile menu, four return navigations, and WhatsApp size/quantity/color quote.');
})().catch(e=>{console.error(e);process.exit(1)});
