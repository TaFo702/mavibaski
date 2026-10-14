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

function checkAntetli(doc) {
  assert.equal(doc.querySelectorAll('h1').length, 1);
  assert.equal(doc.querySelector('h1').textContent, 'Antetli Kağıt Baskı Fiyatları');
  assert.equal(doc.querySelectorAll('title').length, 1);
  assert.equal(doc.title, 'Antetli Kağıt Baskı Fiyatları | A4 ve A5 | Mavi Basım');
  assert.equal(doc.querySelectorAll('meta[name="description"]').length, 1);
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://mavibasim.com/antetli');
  const keys = [...doc.querySelectorAll('meta[name],meta[property]')].map(n => n.name || n.getAttribute('property'));
  assert.equal(new Set(keys).size, keys.length, 'Duplicate metadata');
  assert.equal(doc.querySelector('meta[property="og:title"]').content, doc.title);
  assert.equal(doc.querySelector('meta[name="twitter:title"]').content, doc.title);
  assert.equal(doc.querySelector('meta[property="og:url"]').content, 'https://mavibasim.com/antetli');
  assert.equal(doc.querySelector('meta[property="og:image"]').content, 'https://mavibasim.com/images/antetli-kagit/antetli-kagit-baski-fiyatlari.webp');
  assert.equal(doc.querySelectorAll('main h2').length, 10, 'Incomplete visible route');
  assert(!doc.querySelector('main template'), 'Unresolved Suspense boundary');
  const table = priceTable(doc);
  assert(table, 'Price table missing');
  assert.equal(table.querySelectorAll('tbody tr').length, 6);
  assert.equal(table.querySelectorAll('button').length, 6);
  assert.equal(table.querySelectorAll('a').length, 0, 'Existing order actions became links');
  for (const value of ['ANT1','ANT2','ANT3','ANT4','ANT5','ANT6','2.450 ₺','3.750 ₺','5.000 ₺','2.350 ₺','3.550 ₺','4.800 ₺'])
    assert(normalize(table.textContent).includes(value),'Missing protected price '+value);
  for (const href of ['/zarf','/dosyalar','/kartvizit','/makbuz-ve-formlar','/blog/antetli-kagit-baskisinda-80gr-1.hamur'])
    assert(doc.querySelector('main a[href="'+href+'"]'),'Missing existing link '+href);
  assert.equal(doc.querySelectorAll('figure img').length,5);
  const data=schemas(doc);
  assert(!data.some(n=>['Product','Offer','AggregateOffer'].includes(n['@type'])),'Aggregate variant schema returned');
  const breadcrumb=data.filter(n=>n['@type']==='BreadcrumbList');
  assert.equal(breadcrumb.length,1);
  assert.equal(breadcrumb[0].itemListElement.at(-1).name,'Antetli Kağıt');
  assert.equal(breadcrumb[0].itemListElement.at(-1).item,'https://mavibasim.com/antetli');
  const faq=data.filter(n=>n['@type']==='FAQPage');
  assert.equal(faq.length,1);assert.equal(faq[0].mainEntity.length,11);
  for (const item of faq[0].mainEntity) {
    assert(doc.body.textContent.includes(item.name));assert(doc.body.textContent.includes(item.acceptedAnswer.text));
  }
  assert(doc.querySelector('main').textContent.includes('butonuyla ürün detayını açabilirsiniz.'));
}

async function wait(w, path) {
  for (let i=0;i<100;i++) {
    const heading = w.document.querySelector('h1');
    const canonical = w.document.querySelector('link[rel="canonical"]');
    if (w.location.pathname===path && heading && canonical?.href==='https://mavibasim.com'+path &&
        (path!=='/antetli'||heading.textContent.includes('Antetli Kağıt'))) { await sleep(300); return; }
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
  if(path==='/antetli') {
    assert.equal(w.document.querySelector('#root').dataset.prerendered,'antetli');
    checkAntetli(w.document);
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
    const z=await open('/antetli'), doc=z.w.document;
    checkAntetli(doc);
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
      assert(doc.body.textContent.includes('90 gr. 1. Hamur Tek Yön Renkli A5'));
      close.dispatchEvent(new z.w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));
      await sleep(300);
      assert(!doc.querySelector('button svg.lucide-x'),'Product detail did not close');
      assert.equal(priceTable(doc).outerHTML,z.before.tableHTML);
      await go(z.w,'/zarf'); assert(doc.querySelector('h1').textContent.includes('Diplomat'));
      assert(!schemas(doc).some(n=>n['@type']==='BreadcrumbList'&&n.itemListElement.at(-1).name==='Antetli Kağıt'));
      await go(z.w,'/','MAVİ BASIM');
      assert(!schemas(doc).some(n=>['Product','BreadcrumbList'].includes(n['@type'])),'Previous route schema leaked to home');
      await go(z.w,'/antetli'); checkAntetli(doc);
      results.directProductHomeAntetli='passed';
      results.orderDetailAction='passed';
    }
    results[attempt===0?'directHydration':'reloadHydration']={links:z.before.links.length,mainH2:10,priceRows:6,priceNodePreserved:true};
    z.dom.window.close();
  }
  const home=await open('/');
  await go(home.w,'/antetli'); checkAntetli(home.w.document);
  await go(home.w,'/','MAVİ BASIM');
  assert.equal(home.w.document.title,'Matbaa ve Baskı Çözümleri | Mavi Basım');
  assert(!schemas(home.w.document).some(n=>['Product','BreadcrumbList'].includes(n['@type'])));
  results.homeAntetliHome='passed';
  home.dom.window.close();
  assert.equal(errors.length,0,errors.join('\n'));

  const child=spawn(process.execPath,['dist/server.cjs'],{env:{...process.env,NODE_ENV:'production'},stdio:['ignore','pipe','pipe']});
  let output='';
  child.stdout.on('data',chunk=>{output+=chunk;});child.stderr.on('data',chunk=>{output+=chunk;});
  try {
    for(let i=0;i<50&&!output.includes('Server running');i++) await sleep(100);
    assert(output.includes('Server running'),output);
    results.http=[];
    for(const path of ['/antetli','/antetli?utm_source=audit']) {
      const response=await fetch('http://127.0.0.1:3000'+path);
      assert.equal(response.status,200,path);
      const doc=new JSDOM(await response.text()).window.document;
      checkAntetli(doc);
      results.http.push({path,status:200,mainH2:10,priceButtons:6});
    }
  } finally { child.kill('SIGTERM'); }
  results.siteErrors=errors;
  if(process.env.ANTETLI_AUDIT_RESULT_PATH) fs.writeFileSync(process.env.ANTETLI_AUDIT_RESULT_PATH,JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
})().catch(error=>{console.error(error);process.exitCode=1;});

