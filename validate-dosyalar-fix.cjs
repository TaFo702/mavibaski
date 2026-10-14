const fs = require('node:fs');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { JSDOM, VirtualConsole } = require('jsdom');
const client = require('esbuild').buildSync({ entryPoints: ['src/main.tsx'], bundle: true,
  platform: 'browser', format: 'iife', write: false, loader: { '.css': 'empty' } }).outputFiles[0].text;
const errors = [];
const crypto = require('node:crypto');
const initial = new JSDOM(fs.readFileSync('dist/dosyalar/index.html','utf8')).window.document;
const categoryHeader = initial.querySelector('main table thead th');
assert.equal(categoryHeader.getAttribute('scope'), 'col');
assert.equal(categoryHeader.getAttribute('aria-label'), 'Kategori');
// The only authorized table change is the category header's accessible name/scope.
const preservedTables = [...initial.querySelectorAll('main table')].map(n => {
  const copy = n.cloneNode(true);
  if (n === initial.querySelector('main table')) {
    copy.querySelector('thead th').removeAttribute('scope');
    copy.querySelector('thead th').removeAttribute('aria-label');
  }
  return crypto.createHash('sha256').update(copy.outerHTML).digest('hex');
});
assert.deepEqual(preservedTables,
  ['ec3e1077ebf58703a1544d1f7ae17c48f53cbc186433b43c88569e2374e23596','768a5ab308b75f9199937e7caaf17edd0c97c92f6eabc22cd202082b59e976dd'], 'Existing tables changed');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const normalize = text => text.replace(/\s+/g, ' ').trim();
const links = doc => [...doc.querySelectorAll('#root a[href]')].map(n => n.getAttribute('href'));
const schemas = doc => [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(n => {
  const value = JSON.parse(n.textContent); return Array.isArray(value) ? value : value['@graph'] || [value];
});
const priceTable = doc => doc.querySelector('main table');

function checkDosyalar(doc) {
  assert.equal(doc.querySelectorAll('h1').length,1);
  assert.equal(doc.querySelector('h1').textContent,'Cepli Dosya Baskı Fiyatları');
  assert.equal(doc.querySelectorAll('title').length,1);
  assert.equal(doc.title,'Cepli Dosya Baskı Fiyatları | Kuşe ve Selefon | Mavi Basım');
  assert.equal(doc.querySelectorAll('meta[name="description"]').length,1);
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length,1);
  assert.equal(doc.querySelector('link[rel="canonical"]').href,'https://mavibasim.com/dosyalar');
  const keys=[...doc.querySelectorAll('meta[name],meta[property]')].map(n=>n.name||n.getAttribute('property'));
  assert.equal(new Set(keys).size,keys.length,'Duplicate metadata');
  assert.equal(doc.querySelector('meta[property="og:title"]').content,doc.title);
  assert.equal(doc.querySelector('meta[name="twitter:title"]').content,doc.title);
  assert.equal(doc.querySelector('meta[property="og:url"]').content,'https://mavibasim.com/dosyalar');
  assert.equal(doc.querySelector('meta[property="og:image"]').content,'https://mavibasim.com/images/dosya/cepli-dosya-baski-fiyatlari.webp');
  assert(!doc.querySelector('main template'),'Unresolved Suspense boundary');
  const table=priceTable(doc);assert(table);
  assert.equal(table.querySelectorAll('tbody tr').length,8);
  assert.equal(table.querySelectorAll('button').length,8);
  assert.equal(doc.querySelectorAll('figure img').length,6);
  const data=schemas(doc);
  assert(!data.some(n=>['Product','Offer','AggregateOffer'].includes(n['@type'])));
  const breadcrumb=data.filter(n=>n['@type']==='BreadcrumbList');assert.equal(breadcrumb.length,1);
  assert.equal(breadcrumb[0].itemListElement.at(-1).name,'Cepli Dosya Baskı');
  const faq=data.filter(n=>n['@type']==='FAQPage');assert.equal(faq.length,1);assert.equal(faq[0].mainEntity.length,10);
  for(const item of faq[0].mainEntity){assert(doc.body.textContent.includes(item.name));assert(doc.body.textContent.includes(item.acceptedAnswer.text));}
  const headings=[...doc.querySelectorAll('main h1,main h2,main h3,main h4')];
  for(let i=1;i<headings.length;i++)assert(Number(headings[i].tagName[1])<=Number(headings[i-1].tagName[1])+1,'Heading level skipped');
  assert(doc.querySelector('main').textContent.includes('butonuyla ürün detayını açabilirsiniz.'));
}

async function wait(w, path) {
  for (let i=0;i<100;i++) {
    const heading = w.document.querySelector('h1');
    const canonical = w.document.querySelector('link[rel="canonical"]');
    if (w.location.pathname===path && heading && canonical?.href==='https://mavibasim.com'+path &&
        (path!=='/dosyalar'||heading.textContent.includes('Cepli Dosya'))) { await sleep(300); return; }
    await sleep(100);
  }
  throw Error('Route did not settle: '+path);
}
async function open(path) {
  const html = fs.readFileSync(path==='/'?'dist/index.html':'dist'+path+'/index.html','utf8');
  const console = new VirtualConsole();
  console.on('error', (...args) => errors.push(args.map(String).join(' ')));
  console.on('jsdomError', error => errors.push(String(error)));
  const dom = new JSDOM(html, { url:'https://mavibasim.com'+path, runScripts:'dangerously', pretendToBeVisual:true, virtualConsole:console });
  const w=dom.window;
  w.scrollTo=()=>{};
  w.HTMLElement.prototype.scrollIntoView=function(){};
  w.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
  const before={ text:normalize(w.document.querySelector('#root').textContent), links:links(w.document),
    table:priceTable(w.document), tableHTML:priceTable(w.document)?.outerHTML };
  if(path==='/dosyalar') {
    assert.equal(w.document.querySelector('#root').dataset.prerendered,'dosyalar');
    checkDosyalar(w.document);
  }
  w.eval(client);
  await wait(w,path);
  return {dom,w,before};
}
async function go(w,path,label) {
  const link=[...w.document.querySelectorAll('a[href]')].find(n=>n.getAttribute('href')===path&&!n.target&&(!label||n.textContent.includes(label)));
  assert(link,'Navigation link missing: '+path);
  link.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));
  await wait(w,path);
}

(async()=>{
  const results={};
  for(let attempt=0;attempt<2;attempt++) {
    const z=await open('/dosyalar'), doc=z.w.document;
    checkDosyalar(doc);
    assert.strictEqual(priceTable(doc),z.before.table,'Hydration replaced the existing price table');
    assert.equal(priceTable(doc).outerHTML,z.before.tableHTML,'Hydration changed protected price markup');
    assert.equal(normalize(doc.querySelector('#root').textContent),z.before.text,'Hydration changed route text');
    assert.deepEqual(links(doc),z.before.links,'Hydration changed route links');
    if(attempt===0) {
      const button=priceTable(doc).querySelector('button');
      button.dispatchEvent(new z.w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));
      let close;
      for(let i=0;i<100;i++) {
        close=doc.querySelector('button svg.lucide-x')?.closest('button');
        if(close) break;
        await sleep(50);
      }
      assert(close,'Existing product detail action failed after hydration');
      assert(doc.body.textContent.includes('350 gr. Kuşe Tek Yön Çok Renkli Mat Selefon'));
      close.dispatchEvent(new z.w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));
      await sleep(300);
      assert(!doc.querySelector('button svg.lucide-x'),'Product detail did not close');
      assert.equal(priceTable(doc).outerHTML,z.before.tableHTML);
      await go(z.w,'/zarf'); assert(doc.querySelector('h1').textContent.includes('Diplomat'));
      assert(!schemas(doc).some(n=>n['@type']==='BreadcrumbList'&&n.itemListElement.at(-1).name==='Cepli Dosya'));
      await go(z.w,'/','MAVİ BASIM');
      assert(!schemas(doc).some(n=>['Product','BreadcrumbList'].includes(n['@type'])),'Previous route schema leaked to home');
      await go(z.w,'/dosyalar'); checkDosyalar(doc);
      results.directProductHomeDosyalar='passed';
      results.orderDetailAction='passed';
    }
    results[attempt===0?'directHydration':'reloadHydration']={links:z.before.links.length,mainH2:doc.querySelectorAll('main h2').length,priceRows:8,priceNodePreserved:true};
    z.dom.window.close();
  }
  const home=await open('/');
  await go(home.w,'/dosyalar'); checkDosyalar(home.w.document);
  await go(home.w,'/','MAVİ BASIM');
  assert.equal(home.w.document.title,'Matbaa ve Baskı Çözümleri | Mavi Basım');
  assert(!schemas(home.w.document).some(n=>['Product','BreadcrumbList'].includes(n['@type'])));
  results.homeDosyalarHome='passed';
  home.dom.window.close();
  assert.equal(errors.length,0,errors.join('\n'));

  const child=spawn(process.execPath,['dist/server.cjs'],{env:{...process.env,NODE_ENV:'production'},stdio:['ignore','pipe','pipe']});
  let output='';
  child.stdout.on('data',chunk=>{output+=chunk;});child.stderr.on('data',chunk=>{output+=chunk;});
  try {
    for(let i=0;i<50&&!output.includes('Server running');i++) await sleep(100);
    assert(output.includes('Server running'),output);
    results.http=[];
    for(const path of ['/dosyalar','/dosyalar?utm_source=audit']) {
      const response=await fetch('http://127.0.0.1:3000'+path);
      assert.equal(response.status,200,path);
      const doc=new JSDOM(await response.text()).window.document;
      checkDosyalar(doc);
      results.http.push({path,status:200,mainH2:doc.querySelectorAll('main h2').length,priceButtons:8});
    }
  } finally { child.kill('SIGTERM'); }
  results.siteErrors=errors;
  if(process.env.DOSYALAR_AUDIT_RESULT_PATH) fs.writeFileSync(process.env.DOSYALAR_AUDIT_RESULT_PATH,JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
})().catch(error=>{console.error(error);process.exitCode=1;});

