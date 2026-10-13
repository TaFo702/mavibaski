const fs = require('node:fs');
const assert = require('node:assert/strict');
const { JSDOM, VirtualConsole } = require('jsdom');
const client = require('esbuild').buildSync({ entryPoints: ['src/main.tsx'], bundle: true,
  platform: 'browser', format: 'iife', write: false, loader: { '.css': 'empty' } }).outputFiles[0].text;
const errors = [];
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function state(doc) {
  return {
    h1: [...doc.querySelectorAll('h1')].map(n => n.textContent.trim()),
    titles: [...doc.querySelectorAll('title')].map(n => n.textContent),
    description: [...doc.querySelectorAll('meta[name="description"]')].map(n => n.content),
    canonical: [...doc.querySelectorAll('link[rel="canonical"]')].map(n => n.href),
    og: [...doc.querySelectorAll('meta[property="og:title"]')].map(n => n.content),
    image: [...doc.querySelectorAll('meta[property="og:image"]')].map(n => n.content),
    schemas: [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(n => {
      const value=JSON.parse(n.textContent); return Array.isArray(value) ? value : [value];
    }),
    faq: [...doc.querySelectorAll('#faq h3')].map(n => n.textContent.trim()),
    rootLinks: doc.querySelectorAll('#root a[href]').length,
  };
}

async function open(path) {
  const file = path === '/' ? 'dist/index.html' : `dist${path}/index.html`;
  const html=fs.readFileSync(file,'utf8');
  const vc=new VirtualConsole();
  vc.on('error', (...args) => errors.push(args.map(String).join(' ')));
  vc.on('jsdomError', error => errors.push(String(error)));
  const dom=new JSDOM(html,{url:`https://mavibasim.com${path}`,runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc});
  const w=dom.window;
  w.scrollTo=()=>{};
  w.HTMLElement.prototype.scrollIntoView=function(){w.__lastScrollTarget=this.id;};
  w.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
  const before=state(w.document);
  const initialText=w.document.querySelector('#root').textContent.replace(/\s+/g,' ').trim();
  const initialLinks=[...w.document.querySelectorAll('#root a[href]')].map(n=>n.getAttribute('href'));
  const prices=w.document.querySelector('#fiyatlar')?.outerHTML;
  w.eval(client);
  await sleep(1200);
  return {dom,w,before,prices,initialText,initialLinks};
}

async function waitHome(w) {
  for(let i=0;i<60;i++) {
    const s=state(w.document);
    if(s.h1.length===1 && s.h1[0]==='Matbaa ve Baskı Çözümleri' && s.canonical.length===1 && s.canonical[0]==='https://mavibasim.com/') return s;
    await sleep(100);
  }
  throw Error('Home route did not settle: '+JSON.stringify(state(w.document)));
}
function checkHome(w, s) {
  const doc=w.document;
  assert.equal(s.titles.length,1); assert.equal(s.description.length,1); assert.equal(s.canonical.length,1);
  assert.equal(s.titles[0],doc.title); assert.equal(s.og.length,1); assert.equal(s.og[0],doc.title);
  assert.equal(s.image[0],'https://mavibasim.com/mavilogo.png');
  assert.equal(doc.querySelector('meta[property="og:image:width"]').content,'512');
  assert.equal(doc.querySelector('meta[property="og:image:height"]').content,'512');
  for(const [key,value] of [['twitter:title',doc.title],['twitter:description',s.description[0]],['twitter:image','https://mavibasim.com/mavilogo.png']]) {
    const tags=doc.querySelectorAll(`meta[name="${key}"]`);
    assert.equal(tags.length,1,key);assert.equal(tags[0].content,value,key);
  }
  for(const attribute of ['name','property']) {
    const tags=[...doc.querySelectorAll(`head meta[${attribute}]`)].filter(n=>/^(og:|twitter:)/.test(n.getAttribute(attribute)));
    const names=tags.map(n=>n.getAttribute(attribute));
    assert.equal(new Set(names).size,names.length,'Duplicate sharing metadata');
  }
  assert.equal(s.schemas.filter(x=>x['@id']==='https://mavibasim.com/#organization').length,1);
  assert.equal(s.schemas.filter(x=>x['@id']==='https://mavibasim.com/#website').length,1);
  assert.equal(s.schemas.filter(x=>x['@type']==='FAQPage').length,1);
  assert(!s.schemas.some(x=>['Product','BreadcrumbList'].includes(x['@type'])));
  assert(!JSON.stringify(s.schemas).includes('PrintingService'));
  assert(!JSON.stringify(s.schemas).includes('SearchAction'));
  const faq=s.schemas.find(x=>x['@type']==='FAQPage');
  assert.deepEqual(faq.mainEntity.map(x=>x.name),s.faq);
  const answers=[...doc.querySelectorAll('#faq h3')].map(n=>n.parentElement.parentElement.querySelector('p').textContent.trim());
  assert.deepEqual(faq.mainEntity.map(x=>x.acceptedAnswer.text),answers);
  assert.equal(s.faq.length,17); assert(s.rootLinks>100);
  assert.equal(doc.querySelectorAll('#featured-products > div').length>0,true);
  assert.equal(doc.querySelectorAll('#fiyatlar tbody tr').length,7);
}
async function go(w, href, label) {
  const candidates=[...w.document.querySelectorAll('a')].filter(n=>n.getAttribute('href')===href && (!label || n.textContent.includes(label)) && !n.target);
  const link=candidates.find(n=>n.closest(href==='/'?'nav':'#featured-products')) || candidates[0];
  assert(link,'Missing link '+href+' '+(label||''));
  const target=new URL(href,w.location.href);
  link.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));
  for(let i=0;i<100;i++) {
    const routeReady=w.location.pathname===target.pathname && w.location.hash===target.hash;
    const contentReady=target.pathname==='/' || !w.document.querySelector('#featured-products');
    const anchorReady=!target.hash || w.__lastScrollTarget===target.hash.slice(1);
    if(routeReady&&contentReady&&anchorReady) { await sleep(150);break; }
    await sleep(100);
  }
  assert.equal(w.location.pathname,target.pathname,'Route navigation failed: '+href);
  assert.equal(w.location.hash,target.hash,'Hash navigation failed: '+href);
  console.log('Navigation:', href, w.location.href);
}

(async()=>{
  const results={};
  const home=await open('/');
  const s=await waitHome(home.w);checkHome(home.w,s);
  assert.equal(home.w.document.querySelector('#fiyatlar').outerHTML,home.prices,'Price section changed during hydration');
  assert.deepEqual(home.before.h1,s.h1);assert.deepEqual(home.before.faq,s.faq);
  assert.equal(home.w.document.querySelector('#root').textContent.replace(/\s+/g,' ').trim(),home.initialText,'Homepage text changed during hydration');
  assert.deepEqual([...home.w.document.querySelectorAll('#root a[href]')].map(n=>n.getAttribute('href')),home.initialLinks,'Homepage links changed during hydration');
  const links=home.w.document.querySelectorAll('#products a'); assert.equal(links.length,30);
  for(const id of ['matbaa-urunleri-btn','fiyat-listesi-btn']) {
    const btn=home.w.document.getElementById(id);
    btn.parentElement.dispatchEvent(new home.w.MouseEvent('mouseover',{bubbles:true}));await sleep(50);
    btn.dispatchEvent(new home.w.MouseEvent('click',{bubbles:true,detail:1}));await sleep(50);
    assert.equal(btn.getAttribute('aria-expanded'),'true');
    home.w.dispatchEvent(new home.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));await sleep(50);
    assert.equal(btn.getAttribute('aria-expanded'),'false');
  }
  await go(home.w,'/#products');assert.equal(home.w.__lastScrollTarget,'products', home.w.location.href);
  await go(home.w,'/#fiyatlar','Matbaa Fiyatları');assert.equal(home.w.__lastScrollTarget,'fiyatlar');
  await go(home.w,'/#siparis-sureci','Online Matbaa');assert.equal(home.w.__lastScrollTarget,'siparis-sureci');
  results.home={firstHTMLLinks:home.before.rootLinks,clientLinks:s.rootLinks,faq:17,priceRows:7,title:home.w.document.title,titleCharacters:[...home.w.document.title].length,hydrationPriceParity:true};
  await go(home.w,'/kartvizit');assert(home.w.document.querySelector('h1').textContent.includes('Kartvizit'));
  await go(home.w,'/','MAVİ BASIM');checkHome(home.w,await waitHome(home.w));
  results.homeProductHome='passed';
  const categoryCases=[
    ['Sigorta Poliçeleri Baskı','/sigorta-policeleri','Sigorta Poliçesi'],
    ['Tahsilat Makbuzu Baskı','/tahsilat-makbuzu','Tahsilat Makbuzu'],
    ['Araç Kiralama Baskı','/arac-kiralama','Araç Kiralama'],
    ['Gider Makbuzu Baskı','/gider-makbuzu','Gider Makbuzu'],
    ['Giriş Bileti Baskı','/giris-bileti','Giriş'],
    ['Reçete Baskı','/recete','Reçete'],
    ['Tediye Makbuzu Baskı','/tediye-makbuzu','Tediye Makbuzu'],
  ];
  results.categoryProductReturns=[];
  for(const [label,path,heading] of categoryCases) {
    const link=[...home.w.document.querySelectorAll('#products a')].find(n=>n.textContent.trim()===label);
    assert(link,'Missing category '+label);assert.equal(link.getAttribute('href'),path,label);
    assert.equal(home.dom.window.location.pathname,'/');
    link.dispatchEvent(new home.w.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));
    for(let i=0;i<100;i++) {
      if(home.w.location.pathname===path && home.w.document.querySelector('h1')?.textContent.includes(heading)) break;
      await sleep(100);
    }
    assert.equal(home.w.location.pathname,path,label);
    assert(home.w.document.querySelector('h1')?.textContent.includes(heading),'Wrong product content: '+label);
    await go(home.w,'/','MAVİ BASIM');checkHome(home.w,await waitHome(home.w));
    // Client remounts omit React's empty SSR separator comments; compare all remaining markup exactly.
    assert.equal(home.w.document.querySelector('#fiyatlar').outerHTML.replace(/<!-- -->/g,''),home.prices.replace(/<!-- -->/g,''),'Price section changed after '+label);
    results.categoryProductReturns.push(path);
  }
  const productPaths=[...new Set([...home.w.document.querySelectorAll('#featured-products a[href]')].map(n=>n.getAttribute('href')).filter(href=>href.startsWith('/')&&!href.includes('#')))];
  results.featuredProductReturns=[];
  for(const path of productPaths) {
    await go(home.w,path);
    await go(home.w,'/','MAVİ BASIM');
    checkHome(home.w,await waitHome(home.w));
    results.featuredProductReturns.push(path);
  }
  home.dom.window.close();
  const product=await open('/kartvizit');
  await go(product.w,'/','MAVİ BASIM');checkHome(product.w,await waitHome(product.w));
  results.directProductHome='passed';product.dom.window.close();
  const reload=await open('/');checkHome(reload.w,await waitHome(reload.w));reload.dom.window.close();results.reload='passed';
  assert.deepEqual(errors,[],'Browser/hydration errors');
  if(process.env.HOME_AUDIT_RESULT_PATH) fs.writeFileSync(process.env.HOME_AUDIT_RESULT_PATH,JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
})().catch(e=>{console.error(e);console.error(errors);process.exit(1);});
