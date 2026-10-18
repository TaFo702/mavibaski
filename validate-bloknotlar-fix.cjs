const fs = require('node:fs');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { JSDOM, VirtualConsole } = require('jsdom');
const client = require('esbuild').buildSync({ entryPoints: ['src/main.tsx'], bundle: true,
  platform: 'browser', format: 'iife', write: false, loader: { '.css': 'empty' } }).outputFiles[0].text;
const errors = [];
const crypto = require('node:crypto');
const initial = new JSDOM(fs.readFileSync('dist/bloknotlar/index.html','utf8')).window.document;
const expectedTableHashes = ['d37f7f28e86977e07dcb029d050815f828a2922fc76984ed584aef4e5456335d','2e5bf4da9b447cae684bb1798db7b8313e7ef19c18cccc3bb786024049d500d0','aafc6250c43460a240c1f8684352cb4c0f758b73ab9c19142960efd7afd77f5a','9a2f447966bef4e1e544562888ddfa27eb716bba53f099e97f89f4757aac9bb9','7de73f5460f14f57b3f64aca90fbde13ca9c6216f1d72798663e62b8cf5d692e'];
// React SSR and client rendering serialize identical inline CSS with different whitespace.
const hashes = d => [...d.querySelectorAll('main table')].map(n => {
  const copy = n.cloneNode(true);
  copy.querySelectorAll('[style]').forEach(el => el.setAttribute('style', el.style.cssText));
  return crypto.createHash('sha256').update(copy.outerHTML).digest('hex');
});
assert.deepEqual(hashes(initial), expectedTableHashes, 'Tables differ from approved output (comparison table contains one authorized cell correction)');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const normalize = text => text.replace(/\s+/g, ' ').trim();
const links = doc => [...doc.querySelectorAll('#root a[href]')].map(n => n.getAttribute('href'));
const schemas = doc => [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(n => {
  const value = JSON.parse(n.textContent); return Array.isArray(value) ? value : value['@graph'] || [value];
});
const priceTable = doc => doc.querySelector('main table');

function checkBloknotlar(doc) {
  assert.equal(doc.querySelectorAll('h1').length, 1);
  assert.equal(doc.querySelector('h1').textContent.trim(), 'Bloknot Baskı Fiyatları: Kapaklı ve Tutkallı Modeller');
  assert.equal(doc.querySelectorAll('title').length, 1);
  assert.equal(doc.title, 'Bloknot Baskı Fiyatları | Kapaklı ve Tutkallı Bloknot - Mavi Basım');
  assert.equal(doc.querySelectorAll('meta[name="description"]').length, 1);
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://mavibasim.com/bloknotlar');
  assert.equal(doc.querySelector('meta[property="og:title"]').content, doc.title);
  assert.equal(doc.querySelector('meta[name="twitter:title"]').content, doc.title);
  assert.equal(doc.querySelector('meta[property="og:image:width"]').content, '1536');
  assert.equal(doc.querySelector('meta[property="og:image:height"]').content, '1024');
  const keys=[...doc.querySelectorAll('meta[name],meta[property]')].map(n=>n.name||n.getAttribute('property'));
  assert.equal(new Set(keys).size,keys.length);
  const ids=[...doc.querySelectorAll('[id]')].map(n=>n.id);assert.equal(new Set(ids).size,ids.length);
  assert.deepEqual(hashes(doc), expectedTableHashes);
  assert.equal(doc.querySelectorAll('main table').length,5);
  assert.equal(doc.querySelectorAll('main table button').length,20);
  assert.equal(doc.querySelectorAll('figure img').length,6);
  assert.equal(doc.querySelectorAll('main template').length,0);
  const data=schemas(doc);assert(!data.some(n=>['Product','AggregateOffer','Offer'].includes(n['@type'])));
  assert.equal(data.filter(n=>n['@type']==='BreadcrumbList').length,1);
  const faqs=data.filter(n=>n['@type']==='FAQPage');assert.equal(faqs.length,1);assert.equal(faqs[0].mainEntity.length,20);
  for(const q of faqs[0].mainEntity){assert(doc.body.textContent.includes(q.name));assert(doc.body.textContent.includes(q.acceptedAnswer.text));}
  const h=[...doc.querySelectorAll('main h1,main h2,main h3,main h4')];for(let i=1;i<h.length;i++)assert(+h[i].tagName[1]<=+h[i-1].tagName[1]+1);
  assert(doc.querySelector('main').textContent.includes('CYP modelinde kuşe kapak üzerine parlak selefon uygulanır.'));
  assert(doc.querySelector('main').textContent.includes('İç sayfa gramajı:'));
  assert(doc.querySelector('main').textContent.includes('Bloknot Baskı Dosyası Hazırlama'));
  assert(doc.querySelector('main').textContent.includes('PDF, AI veya CDR'));
  assert(doc.querySelector('main').textContent.includes('kapaklı ve tutkallı fiyat listeleri spiralli modellere uygulanmaz'));
  assert(!/\+%10|\+%12|\+%25/.test(doc.querySelector('main').textContent));
}

async function wait(w, path) {
  for (let i=0;i<100;i++) {
    const heading = w.document.querySelector('h1');
    const canonical = w.document.querySelector('link[rel="canonical"]');
    if (w.location.pathname===path && heading && canonical?.href==='https://mavibasim.com'+path &&
        (path!=='/bloknotlar'||heading.textContent.includes('Bloknot'))) { await sleep(300); return; }
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
  if(path==='/bloknotlar') {
    assert.equal(w.document.querySelector('#root').dataset.prerendered,'bloknotlar');
    checkBloknotlar(w.document);
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
    const z=await open('/bloknotlar'), doc=z.w.document;
    checkBloknotlar(doc);
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
      assert(doc.body.textContent.includes('80 gr. 1.Hamur Tek Renk'));
      close.dispatchEvent(new z.w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));
      await sleep(300);
      assert(!doc.querySelector('button svg.lucide-x'),'Product detail did not close');
      assert.equal(priceTable(doc).outerHTML,z.before.tableHTML);
      await go(z.w,'/zarf'); assert(doc.querySelector('h1').textContent.includes('Diplomat'));
      assert(!schemas(doc).some(n=>n['@type']==='BreadcrumbList'&&n.itemListElement.at(-1).name==='Bloknot'));
      await go(z.w,'/','MAVİ BASIM');
      assert(!schemas(doc).some(n=>['Product','BreadcrumbList'].includes(n['@type'])),'Previous route schema leaked to home');
      await go(z.w,'/bloknotlar'); checkBloknotlar(doc);
      results.directProductHomeBloknotlar='passed';
      results.orderDetailAction='passed';
    }
    results[attempt===0?'directHydration':'reloadHydration']={links:z.before.links.length,mainH2:doc.querySelectorAll('main h2').length,priceRows:10,priceNodePreserved:true};
    z.dom.window.close();
  }
  const home=await open('/');
  await go(home.w,'/bloknotlar'); checkBloknotlar(home.w.document);
  await go(home.w,'/','MAVİ BASIM');
  assert.equal(home.w.document.title,'Online Matbaa ve Baskı Fiyatları | Mavi Basım');
  assert(!schemas(home.w.document).some(n=>['Product','BreadcrumbList'].includes(n['@type'])));
  results.homeBloknotlarHome='passed';
  home.dom.window.close();
  assert.equal(errors.length,0,errors.join('\n'));

  const child=spawn(process.execPath,['dist/server.cjs'],{env:{...process.env,NODE_ENV:'production'},stdio:['ignore','pipe','pipe']});
  let output='';
  child.stdout.on('data',chunk=>{output+=chunk;});child.stderr.on('data',chunk=>{output+=chunk;});
  try {
    for(let i=0;i<50&&!output.includes('Server running');i++) await sleep(100);
    assert(output.includes('Server running'),output);
    const hostingRedirect = JSON.parse(fs.readFileSync('vercel.json','utf8')).redirects.find(r=>r.source==='/bloknot');
    assert.deepEqual(hostingRedirect,{source:'/bloknot',destination:'/bloknotlar',permanent:true});
    for(const method of ['GET','HEAD']) {
      for(const path of ['/bloknot','/bloknot/','/bloknot?utm_source=audit']) {
        const response=await fetch('http://127.0.0.1:3000'+path,{method,redirect:'manual'});
        assert.equal(response.status,301,path);
        assert.equal(response.headers.get('location'),path.includes('?')?'/bloknotlar?utm_source=audit':'/bloknotlar');
      }
    }
    results.legacyUrlRedirect='GET/HEAD: 301 to canonical URL; query string preserved';
    results.http=[];
    for(const path of ['/bloknotlar','/bloknotlar?utm_source=audit']) {
      const response=await fetch('http://127.0.0.1:3000'+path);
      assert.equal(response.status,200,path);
      const doc=new JSDOM(await response.text()).window.document;
      checkBloknotlar(doc);
      results.http.push({path,status:200,mainH2:doc.querySelectorAll('main h2').length,priceButtons:20});
    }
  } finally { child.kill('SIGTERM'); }
  results.siteErrors=errors;
  if(process.env.BLOKNOTLAR_AUDIT_RESULT_PATH) fs.writeFileSync(process.env.BLOKNOTLAR_AUDIT_RESULT_PATH,JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
})().catch(error=>{console.error(error);process.exitCode=1;});

