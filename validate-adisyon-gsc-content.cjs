const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { JSDOM, VirtualConsole } = require('jsdom');
const route = '/blog/adisyon-ve-makbuzlarda-otokopili-kagit';
const normalize = text => text.replace(/\s+/g, ' ').trim();
const schemas = doc => [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(node => {
  const value = JSON.parse(node.textContent);
  return Array.isArray(value) ? value : value['@graph'] || [value];
});
const text = doc => normalize(doc.querySelector('main').textContent);
const links = doc => [...doc.querySelectorAll('main a[href]')].map(node => node.getAttribute('href'));
const priceHash = doc => crypto.createHash('sha256').update(doc.querySelector('#fiyat-tablosu > .bg-white').outerHTML.replace(/<!-- -->/g, '').replaceAll(' data-discover="true"', '')).digest('hex');
const errors = [];
const client = require('esbuild').buildSync({entryPoints:['src/main.tsx'],bundle:true,platform:'browser',format:'iife',write:false,loader:{'.css':'empty'}}).outputFiles[0].text;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function checkGuide(doc) {
  for (const selector of ['title','h1','meta[name="description"]','link[rel="canonical"]']) assert.equal(doc.querySelectorAll(selector).length, 1, selector);
  assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://mavibasim.com'+route);
  assert.equal(doc.title, 'Resmi Evraklarda Otokopili (Kendinden Karbonlu) Kağıt Teknolojisi - Mavi Basım');
  const prose=doc.querySelector('main .prose');assert(prose, 'Full article missing');
  assert(prose.querySelector('h2').textContent.includes('Otokopili Kâğıt Nedir'));
  assert(prose.querySelector('table'), 'Comparison must render as a table');
  for (const marker of [':::info-cards',':::warning-box',':::importance-cards',':::cta','BTN_LINK:']) assert(!prose.textContent.includes(marker), marker);
  for(const href of ['/adisyon','/adisyon#fiyat-tablosu','/siparis-fisi','/makbuz-ve-formlar']) assert(prose.querySelector(`a[href="${href}"]`),href);
  assert(text(doc).includes('Otokopili Kâğıtla Basılan Form ve Koçanlar'));
  assert(!text(doc).includes('Emlak ve Kurumsal Ofislerin En Çok Tercih Ettiği'));
  const all=schemas(doc);
  for(const type of ['Article','FAQPage','BreadcrumbList']) assert.equal(all.filter(x=>x['@type']===type).length,1,type);
  const faq=all.find(x=>x['@type']==='FAQPage').mainEntity;
  assert.equal(faq.length,3);
  for(const item of faq){assert(text(doc).includes(normalize(item.name)));assert(text(doc).includes(normalize(item.acceptedAnswer.text)));}
  assert.equal(all.find(x=>x['@type']==='Article').dateModified,'2026-10-19');
  assert(text(doc).includes('Son Güncelleme: 19 Ekim 2026'));
}
async function settle(w,path){for(let i=0;i<80;i++){if(w.location.pathname===path && (path===route?w.document.querySelector('main .prose'):w.document.querySelector('#fiyat-tablosu table'))){await sleep(500);return;}await sleep(100);}throw new Error('Route not ready '+path);}
(async()=>{
  const vc=new VirtualConsole();vc.on('error',(...args)=>errors.push(args.map(String).join(' ')));vc.on('jsdomError',error=>errors.push(String(error)));
  const dom=new JSDOM(fs.readFileSync('dist'+route+'/index.html','utf8'),{url:'https://mavibasim.com'+route,runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
  const w=dom.window;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};w.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
  checkGuide(w.document);const before={text:text(w.document),links:links(w.document),article:w.document.querySelector('main .prose')};
  w.eval(client);await settle(w,route);checkGuide(w.document);
  assert.strictEqual(w.document.querySelector('main .prose'),before.article,'Hydration replaced article');
  assert.equal(text(w.document),before.text);assert.deepEqual(links(w.document),before.links);
  const product=w.document.querySelector('main .prose a[href="/adisyon"]');assert(product);
  // Markdown links use normal document navigation, which jsdom does not perform.
  w.history.pushState({},'',product.getAttribute('href'));w.dispatchEvent(new w.PopStateEvent('popstate'));await settle(w,'/adisyon');
  assert.equal(priceHash(w.document),'475648c7ce3cf27f2c53d56bb7a312432a771b00468b29126b202a1bee8a4331','Adisyon protected pricing changed');
  assert(text(w.document).includes('Boş adisyon örneğinde'));
  assert(w.document.querySelector('nav[aria-label="Sayfa İçindekiler Navigasyonu"] a[href="#adisyon-baski-ornekleri"]'));
  assert.equal(w.document.querySelectorAll('#adisyon-baski-ornekleri').length,1);
  const back=w.document.querySelector(`main a[href="${route}"]`);assert(back);back.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));await settle(w,route);checkGuide(w.document);
  dom.window.close();assert.equal(errors.length,0,errors.join('\n'));
  console.log('PASS: full guide first HTML, hydration node/text/link parity, single metadata/schema, visible FAQ parity, recorded date, guide–Adisyon navigation and protected pricing.');
})().catch(error=>{console.error(error);process.exitCode=1;});
