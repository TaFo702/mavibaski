const fs = require('node:fs');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { JSDOM, VirtualConsole } = require('jsdom');
const client = require('esbuild').buildSync({ entryPoints: ['src/main.tsx'], bundle: true,
  platform: 'browser', format: 'iife', write: false, loader: { '.css': 'empty' } }).outputFiles[0].text;
const errors = [];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const normalize = text => text.replace(/\s+/g, ' ').trim();
const links = doc => [...doc.querySelectorAll('#root a[href]')].map(n => n.getAttribute('href'));
const schemas = doc => [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(n => {
  const value = JSON.parse(n.textContent); return Array.isArray(value) ? value : value['@graph'] || [value];
});
const priceTable = doc => [...doc.querySelectorAll('table')].find(n => n.querySelector('caption')?.textContent.includes('Baskı Fiyat Listesi'));

function checkZarf(doc) {
  assert.equal(doc.querySelectorAll('h1').length, 1);
  assert.equal(doc.querySelector('h1').textContent, 'Diplomat Zarf Baskı Fiyatları & Torba Zarf');
  assert.equal(doc.querySelectorAll('title').length, 1);
  assert.equal(doc.title, 'Zarf Baskı Fiyatları | Diplomat ve Torba Zarf - Mavi Basım');
  assert.equal(doc.querySelectorAll('meta[name="description"]').length, 1);
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://mavibasim.com/zarf');
  const keys = [...doc.querySelectorAll('meta[name],meta[property]')].map(n => n.name || n.getAttribute('property'));
  assert.equal(new Set(keys).size, keys.length, 'Duplicate metadata');
  assert.equal(doc.querySelector('meta[property="og:title"]').content, doc.title);
  assert.equal(doc.querySelector('meta[name="twitter:title"]').content, doc.title);
  assert.equal(doc.querySelector('meta[property="og:image"]').content, 'https://mavibasim.com/images/zarf/kurumsal-zarf-baski.webp');
  assert.equal(doc.querySelector('meta[property="og:image:width"]').content, '800');
  assert.equal(doc.querySelector('meta[property="og:image:height"]').content, '533');
  assert.equal(doc.querySelectorAll('main h2').length, 11, 'Incomplete visible route');
  assert(!doc.querySelector('main [hidden]'), 'Prerender left route content hidden');
  assert(!doc.querySelector('main template'), 'Prerender left an unresolved Suspense boundary');
  const table = priceTable(doc);
  assert(table, 'Price table missing');
  assert.equal(table.querySelectorAll('tbody tr').length, 3);
  assert.equal(table.querySelectorAll('button').length, 3);
  assert.equal(table.querySelectorAll('a').length, 0, 'Existing order actions became links');
  const text = normalize(table.textContent);
  for (const value of ['Z1', 'Z2', 'Z3', '2.500 ₺', '3.000 ₺', '3.900 ₺', '1.950 ₺', '2.100 ₺', '2.600 ₺'])
    assert(text.includes(value), 'Missing protected price '+value);
  for (const href of ['/antetli','/dosyalar','/kartvizit','/makbuz-ve-formlar','/brosur','/kataloglar','/magnet','/etiket','/kutu','/blog/zarf-baskisinda-diplomat-ve-torba-zarf'])
    assert(doc.querySelector('main a[href="'+href+'"]'), 'Missing existing internal link '+href);
  assert.equal(doc.querySelectorAll('figure img').length, 6);
  const data = schemas(doc);
  assert(!data.some(n => ['Product','Offer','AggregateOffer'].includes(n['@type'])), 'Misleading aggregate product schema returned');
  const breadcrumb = data.filter(n => n['@type']==='BreadcrumbList');
  assert.equal(breadcrumb.length, 1);
  assert.equal(breadcrumb[0].itemListElement.at(-1).name, 'Zarf Baskı');
  assert.equal(breadcrumb[0].itemListElement.at(-1).item, 'https://mavibasim.com/zarf');
  const faq = data.filter(n => n['@type']==='FAQPage');
  assert.equal(faq.length, 1);
  assert.equal(faq[0].mainEntity.length, 9);
  for (const item of faq[0].mainEntity) {
    assert(doc.body.textContent.includes(item.name));
    assert(doc.body.textContent.includes(item.acceptedAnswer.text));
  }
}

async function wait(w, path) {
  for (let i=0;i<100;i++) {
    const heading = w.document.querySelector('h1');
    const canonical = w.document.querySelector('link[rel="canonical"]');
    if (w.location.pathname===path && heading && canonical?.href==='https://mavibasim.com'+path &&
        (path!=='/zarf'||heading.textContent.includes('Diplomat Zarf'))) { await sleep(300); return; }
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
  if(path==='/zarf') {
    assert.equal(w.document.querySelector('#root').dataset.prerendered,'zarf');
    checkZarf(w.document);
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
    const z=await open('/zarf'), doc=z.w.document;
    checkZarf(doc);
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
      assert(doc.body.textContent.includes('110 gr. Diplomat Tek Renk'));
      close.dispatchEvent(new z.w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));
      await sleep(300);
      assert(!doc.querySelector('button svg.lucide-x'),'Product detail did not close');
      assert.equal(priceTable(doc).outerHTML,z.before.tableHTML);
      await go(z.w,'/antetli'); assert(doc.querySelector('h1').textContent.includes('Antetli'));
      await go(z.w,'/','MAVİ BASIM');
      assert(!schemas(doc).some(n=>['Product','BreadcrumbList'].includes(n['@type'])),'Previous route schema leaked to home');
      await go(z.w,'/zarf'); checkZarf(doc);
      results.directProductHomeZarf='passed';
      results.orderDetailAction='passed';
    }
    results[attempt===0?'directHydration':'reloadHydration']={links:z.before.links.length,mainH2:11,priceRows:3,priceNodePreserved:true};
    z.dom.window.close();
  }
  const home=await open('/');
  await go(home.w,'/zarf'); checkZarf(home.w.document);
  await go(home.w,'/','MAVİ BASIM');
  assert.equal(home.w.document.title,'Matbaa ve Baskı Çözümleri | Mavi Basım');
  assert(!schemas(home.w.document).some(n=>['Product','BreadcrumbList'].includes(n['@type'])));
  results.homeZarfHome='passed';
  home.dom.window.close();
  assert.equal(errors.length,0,errors.join('\n'));

  const child=spawn(process.execPath,['dist/server.cjs'],{env:{...process.env,NODE_ENV:'production'},stdio:['ignore','pipe','pipe']});
  let output='';
  child.stdout.on('data',chunk=>{output+=chunk;});child.stderr.on('data',chunk=>{output+=chunk;});
  try {
    for(let i=0;i<50&&!output.includes('Server running');i++) await sleep(100);
    assert(output.includes('Server running'),output);
    results.http=[];
    for(const path of ['/zarf','/zarf?utm_source=audit']) {
      const response=await fetch('http://127.0.0.1:3000'+path);
      assert.equal(response.status,200,path);
      const doc=new JSDOM(await response.text()).window.document;
      checkZarf(doc);
      results.http.push({path,status:200,mainH2:11,priceButtons:3});
    }
  } finally { child.kill('SIGTERM'); }
  results.siteErrors=errors;
  if(process.env.ZARF_AUDIT_RESULT_PATH) fs.writeFileSync(process.env.ZARF_AUDIT_RESULT_PATH,JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
})().catch(error=>{console.error(error);process.exitCode=1;});

