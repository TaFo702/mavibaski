import fs from 'node:fs';
import crypto from 'node:crypto';
import { JSDOM } from 'jsdom';
import { chromium } from 'playwright';
import { knownStaticRoutes, URL_REDIRECTS } from '../src/utils/seoGenerator.ts';
import { SEO_PAGES_DATA } from '../src/data/seoPagesData.ts';
import { CITIES_DATA } from '../src/data/cityData.ts';
import { BLOG_POSTS } from '../src/data/blogData.ts';
const app=fs.readFileSync('src/App.tsx','utf8');
const declared=[...app.matchAll(/<Route path="([^":*]+)"/g)].map(m=>m[1]);
const clientRedirects=Object.fromEntries([...app.matchAll(/<Route path="([^"]+)" element=\{<Navigate to="([^"]+)"/g)].map(m=>[m[1],m[2]]));
const sitemap=[...fs.readFileSync('public/sitemap.xml','utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const urls=[...new Set([...knownStaticRoutes,...declared,...Object.values(SEO_PAGES_DATA).map(p=>p.path),...CITIES_DATA.map(c=>'/'+c.slug),...BLOG_POSTS.map(p=>'/blog/'+p.slug),...sitemap,...Object.keys(URL_REDIRECTS)])].sort();
const entries=urls.map(path=>({path,category:BLOG_POSTS.some(p=>'/blog/'+p.slug===path)?'blog':CITIES_DATA.some(c=>'/'+c.slug===path)?'city':Object.values(SEO_PAGES_DATA).some(p=>p.path===path)?'sector':'static',sitemap:sitemap.includes(path),redirect:URL_REDIRECTS[path]||clientRedirects[path]||null,canonicalTarget:path==='/siparis-fisi-baski-fiyatlari'?'/siparis-fisi':path}));
const inventory={entries,counts:{all:entries.length,blog:BLOG_POSTS.length,city:CITIES_DATA.length,sector:Object.keys(SEO_PAGES_DATA).length,sitemap:sitemap.length}};

const mode=process.argv[2]||'after';
const baseURL=process.env.TEST_BASE_URL||'http://127.0.0.1:3000';
const isApplicationAsset=(url,type)=>new URL(url).origin===new URL(baseURL).origin&&['script','stylesheet'].includes(type);
const output='reports/seo-'+mode+'.json';
function extract(doc){
 const vals=s=>[...doc.querySelectorAll(s)].map(e=>e.getAttribute('content')||e.getAttribute('href')||e.textContent.trim());
 const nodes=[];const invalid=[];
 const walk=v=>{if(Array.isArray(v))v.forEach(walk);else if(v&&typeof v==='object'){if(v['@type'])nodes.push(v);if(v['@graph'])walk(v['@graph']);}};
 for(const el of doc.querySelectorAll('script[type="application/ld+json"]')){try{walk(JSON.parse(el.textContent));}catch(e){invalid.push(String(e));}}
 const types={};for(const n of nodes)for(const t of Array.isArray(n['@type'])?n['@type']:[n['@type']])types[t]=(types[t]||0)+1;
 const ids={};for(const n of nodes)if(n['@id'])ids[n['@id']]=(ids[n['@id']]||0)+1;
 const main=doc.querySelector('#root main')||doc.querySelector('#root');
 const mainText=main?.textContent?.replace(/\s+/g,' ').trim()||'';
 return {titles:vals('title'),descriptions:vals('meta[name="description"]'),canonicals:vals('link[rel="canonical"]'),robots:vals('meta[name="robots"]'),h1:vals('h1'),ogTitle:vals('meta[property="og:title"]'),ogDescription:vals('meta[property="og:description"]'),ogUrl:vals('meta[property="og:url"]'),ogImages:vals('meta[property="og:image"]'),schemaTypes:types,duplicateSchemaIds:Object.entries(ids).filter(([id,n])=>n>1),invalidJsonLd:invalid,mainCharacters:mainText.length,mainHash:crypto.createHash('sha256').update(mainText).digest('hex'),links:[...doc.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>h.startsWith('/')),imagesWithoutAlt:[...doc.querySelectorAll('img')].filter(i=>!i.hasAttribute('alt')).length};
}
function issues(entry,data,label){const result=[];if(data.titles.length!==1||!data.titles[0])result.push(label+':title-count');if(data.descriptions.length!==1||!data.descriptions[0])result.push(label+':description-count');if(data.canonicals.length!==1)result.push(label+':canonical-count');if(data.h1.length!==1)result.push(label+':h1-count');if(data.robots.some(v=>/noindex/i.test(v)))result.push(label+':noindex');if(data.invalidJsonLd.length)result.push(label+':invalid-jsonld');if(data.canonicals.length===1){try{if(new URL(data.canonicals[0]).href!==new URL(entry.redirect||entry.canonicalTarget||entry.path,'https://mavibasim.com').href)result.push(label+':canonical-target');}catch{result.push(label+':canonical-invalid');}}if(data.schemaTypes.BreadcrumbList>1)result.push(label+':multiple-breadcrumbs');if(data.duplicateSchemaIds.length)result.push(label+':duplicate-schema-id');return result;}
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||(fs.existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),headless:true});
const context=await browser.newContext();
// These external resources cannot provide SEO metadata for the local page and are blocked in this environment.
await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(baseURL).origin?r.continue():r.abort());
const rows=[];let index=0;
try{await Promise.all(Array.from({length:3},async()=>{
 const page=await context.newPage();page.setDefaultTimeout(15000);page.setDefaultNavigationTimeout(30000);
 while(index<inventory.entries.length){const entry=inventory.entries[index++];const row={...entry,issues:[],runtimeErrors:[],assetErrors:[]};
 const onPageError=error=>row.runtimeErrors.push(error.message);
 const onRequestFailed=request=>{if(isApplicationAsset(request.url(),request.resourceType()))row.assetErrors.push(`${request.url()}: ${request.failure()?.errorText}`);};
 const onResponse=response=>{
  const type=response.request().resourceType();if(!isApplicationAsset(response.url(),type))return;
  if(response.status()>=400)row.assetErrors.push(`${response.url()}: HTTP ${response.status()}`);
  else if(response.status()>=200&&response.status()<300){const mime=(response.headers()['content-type']||'').split(';')[0].trim().toLowerCase();const validMime=type==='stylesheet'?mime==='text/css':/^(text|application)\/(javascript|ecmascript|x-javascript)$/.test(mime);if(!validMime)row.assetErrors.push(`${response.url()}: invalid ${type} MIME type ${mime||'(missing)'}`);}
 };
 page.on('pageerror',onPageError);page.on('requestfailed',onRequestFailed);page.on('response',onResponse);
 try{
  const res=await fetch(new URL(entry.path,baseURL).href,{redirect:'manual',signal:AbortSignal.timeout(15000)});row.status=res.status;row.location=res.headers.get('location');const rawHtml=await res.text();const dom=new JSDOM(rawHtml);row.raw=extract(dom.window.document);dom.window.close();
  if(entry.redirect){if(row.status!==301||row.location!==entry.redirect)row.issues.push('redirect-response');}
  else{if(entry.sitemap&&entry.canonicalTarget!==entry.path)row.issues.push('sitemap:noncanonical-url');if(row.status!==200)row.issues.push('http-status');row.issues.push(...issues(entry,row.raw,'raw'));}
  const navigation=await page.goto(new URL(entry.path,baseURL).href,{waitUntil:'load'});
  if(navigation?.status()!==200)row.issues.push('rendered:http-status');
  await page.locator('#root nav').first().waitFor({state:'visible'});
  await page.locator('#root main h1').first().waitFor({state:'visible'});
  await page.getByText('Yükleniyor...',{exact:true}).first().waitFor({state:'hidden'});
  if(!(await page.locator('#root').innerText()).trim())throw new Error('Application root has no visible content');
  await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  row.finalPath=new URL(page.url()).pathname;const html=await page.content();const renderedDom=new JSDOM(html);row.rendered=extract(renderedDom.window.document);renderedDom.window.close();
  row.issues.push(...issues(entry,row.rendered,'rendered'));
  if(!entry.redirect){if(JSON.stringify(row.raw.titles)!==JSON.stringify(row.rendered.titles))row.issues.push('title-raw-rendered-difference');if(JSON.stringify(row.raw.descriptions)!==JSON.stringify(row.rendered.descriptions))row.issues.push('description-raw-rendered-difference');}
 }catch(error){row.error=String(error);row.issues.push('audit-incomplete');}
 finally{page.off('pageerror',onPageError);page.off('requestfailed',onRequestFailed);page.off('response',onResponse);if(row.runtimeErrors.length)row.issues.push('rendered:runtime-error');if(row.assetErrors.length)row.issues.push('rendered:asset-load-error');}
 rows.push(row);if(rows.length%30===0)console.log('Audited',rows.length,'/',inventory.entries.length);
 }
 await page.close();
}));}finally{await browser.close();fs.mkdirSync('reports',{recursive:true});}
rows.sort((a,b)=>a.path.localeCompare(b.path));
const counts={};for(const row of rows)for(const issue of row.issues)counts[issue]=(counts[issue]||0)+1;
const dup=(key)=>{const map=new Map();for(const r of rows)if(!r.redirect&&r.rendered&&r.rendered[key].length===1){const v=r.rendered[key][0];if(v)map.set(v,[...(map.get(v)||[]),r.path]);}return [...map].filter(([v,p])=>p.length>1).map(([value,paths])=>({value,paths}));};
const report={generatedAt:new Date().toISOString(),scope:'Local production HTML and Chromium-rendered DOM; not a live-site or Search Console audit',inventory:inventory.counts,total:rows.length,incomplete:rows.filter(r=>r.error).length,issueCounts:counts,duplicateRenderedTitles:dup('titles'),duplicateRenderedDescriptions:dup('descriptions'),rows};fs.writeFileSync(output,JSON.stringify(report,null,2));
const csvCell=value=>'"'+String(value??'').replaceAll('"','""')+'"';
const csvRows=[['adres','kategori','HTTP','sitemap','ilk_HTML_basliklari','tarayici_basliklari','canonical_sayisi','ilk_HTML_H1','tarayici_H1','bulgular'],...rows.map(r=>[r.path,r.category,r.status,r.sitemap,r.raw?.titles.join(' | '),r.rendered?.titles.join(' | '),r.rendered?.canonicals.length,r.raw?.h1.length,r.rendered?.h1.length,r.issues.join(' | ')])];
fs.writeFileSync('reports/seo-'+mode+'.csv',csvRows.map(row=>row.map(csvCell).join(',')).join('\n')+'\n');console.log(JSON.stringify({total:report.total,incomplete:report.incomplete,issueCounts:counts,duplicateTitleGroups:report.duplicateRenderedTitles.length,duplicateDescriptionGroups:report.duplicateRenderedDescriptions.length},null,2));const failures=Object.entries(counts).filter(([key])=>!/multiple-breadcrumbs|duplicate-schema-id/.test(key));
if(report.incomplete||failures.length)process.exitCode=1;
