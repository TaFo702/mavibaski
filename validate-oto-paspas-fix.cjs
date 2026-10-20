const fs=require('node:fs');
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const {JSDOM,VirtualConsole}=require('jsdom');
const norm=s=>s.replace(/\s+/g,' ').trim();
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const section=s=>s.slice(s.indexOf('        {/* Fiyat Tablosu Alanı */}'),s.indexOf('        {/* Sürüş Güvenliği'));
// Baseline includes the entire protected section: headings, copy, table and controls.
const baseline=execFileSync('git',['show','e26039b7948ea365896e54183e8645a090a1ead5:src/components/OtoPaspas.tsx'],{encoding:'utf8'});
assert.equal(section(fs.readFileSync('src/components/OtoPaspas.tsx','utf8')),section(baseline));
const client=require('esbuild').buildSync({entryPoints:['src/main.tsx'],bundle:true,platform:'browser',format:'iife',write:false,loader:{'.css':'empty'}}).outputFiles[0].text;
function check(d){
 for(const s of ['h1','title','meta[name="description"]','link[rel="canonical"]','meta[name="robots"]','meta[property="og:url"]','meta[property="og:image"]','meta[name="twitter:image"]'])assert.equal(d.querySelectorAll(s).length,1,s);
 assert.equal(d.querySelector('link[rel="canonical"]').href,'https://mavibasim.com/oto-paspas');
 assert.equal(d.querySelectorAll('main table tbody tr').length,3);
 assert.equal(d.querySelectorAll('#gorsel-galeri img').length,6);
 const schemas=[...d.querySelectorAll('script[type="application/ld+json"]')].flatMap(e=>{const v=JSON.parse(e.textContent);return Array.isArray(v)?v:[v]});
 for(const t of ['Product','FAQPage','BreadcrumbList'])assert.equal(schemas.filter(e=>e['@type']===t).length,1,t);
 const faq=schemas.find(e=>e['@type']==='FAQPage');assert.equal(faq.mainEntity.length,10);
 for(const q of faq.mainEntity){assert.ok(norm(d.querySelector('#faq-section').textContent).includes(norm(q.name)));assert.ok(norm(d.querySelector('#faq-section').textContent).includes(norm(q.acceptedAnswer.text)));}
 const offer=schemas.find(e=>e['@type']==='Product').offers;
 assert.deepEqual([offer.lowPrice,offer.highPrice,offer.offerCount,offer.priceCurrency],['2500','5000','3','TRY']);
 const ids=[...d.querySelectorAll('[id]')].map(e=>e.id);assert.equal(new Set(ids).size,ids.length);
}
(async()=>{
 const errors=[];const vc=new VirtualConsole();vc.on('error',(...a)=>errors.push(a.join(' ')));vc.on('jsdomError',e=>errors.push(String(e)));
 const dom=new JSDOM(fs.readFileSync('dist/oto-paspas/index.html','utf8'),{url:'https://mavibasim.com/oto-paspas',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc});
 try{
 const w=dom.window,d=w.document;w.scrollTo=()=>{};w.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
 check(d);const table=d.querySelector('main table'),html=table.outerHTML,text=norm(d.querySelector('main').textContent);
 w.eval(client);await pause(1200);check(d);assert.strictEqual(d.querySelector('main table'),table);assert.equal(table.outerHTML,html);assert.equal(norm(d.querySelector('main').textContent),text);
 table.querySelector('button').click();await pause(100);assert.ok([...d.querySelectorAll('button')].some(e=>e.textContent.includes('SEPETE EKLE')));
 assert.deepEqual(errors,[]);
 console.log('PASS: protected section, first HTML, hydration node/content preservation, single metadata/schema, matching FAQs, tariff metadata and order dialog.');
 }finally{dom.window.close();}
})().catch(e=>{console.error(e.stack);process.exit(1)});
