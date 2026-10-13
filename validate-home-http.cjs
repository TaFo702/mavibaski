const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { JSDOM } = require('jsdom');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const development=process.argv.includes('--dev');
  const child = spawn(process.execPath, development ? ['--import', 'tsx', 'server.ts'] : ['dist/server.cjs'], { env: { ...process.env, NODE_ENV: development ? 'development' : 'production' }, stdio: ['ignore', 'pipe', 'pipe'] });
  let output = '';
  child.stdout.on('data', data => { output += data; });
  child.stderr.on('data', data => { output += data; });
  try {
    for(let i=0;i<50&&!output.includes('Server running');i++) await sleep(100);
    assert(output.includes('Server running'), output);
    const results=[];
    for(const [path, status] of [['/',200],['/?s=kartvizit',200],['/kartvizit',200],['/denetim-olmayan-sayfa',404]]) {
      const response = await fetch('http://127.0.0.1:3000'+path);
      assert.equal(response.status,status);
      const html=await response.text();const doc=new JSDOM(html).window.document;
      assert.equal(doc.querySelectorAll('title').length,1);
      assert.equal(doc.querySelectorAll('meta[name="description"]').length,1);
      assert.equal(doc.querySelectorAll('link[rel="canonical"]').length,1);
      if(path.startsWith('/?')||path==='/') {
        if(!development) assert.equal(html,fs.readFileSync('dist/index.html','utf8'));
        assert.equal(doc.querySelector('#root').dataset.prerendered,'home');
        assert.equal(doc.querySelectorAll('#fiyatlar tbody tr').length,7);
        assert.equal(doc.querySelectorAll('#faq h3').length,17);
        assert.equal(doc.querySelectorAll('head script[type="application/ld+json"]').length,4);
        if(!development && path==='/') {
          const images=[...new Set([...doc.querySelectorAll('#root img[src]')].map(n=>n.getAttribute('src')).filter(src=>src.startsWith('/')))];
          for(const src of images) {
            const image=await fetch(new URL(src,'http://127.0.0.1:3000'));
            assert.equal(image.status,200,src);
            assert(image.headers.get('content-type').startsWith('image/'),src);
            await image.arrayBuffer();
          }
          results.push({localImageResources:images.length,status:200});
        }
      }
      if(status===404) {
        assert.equal(doc.querySelector('#products'),null);
        assert.equal(doc.querySelector('meta[name="robots"]').content,'noindex, follow');
      }
      results.push({path,status,title:doc.title});
    }
    if(process.env.HOME_AUDIT_RESULT_PATH) fs.writeFileSync(process.env.HOME_AUDIT_RESULT_PATH,JSON.stringify(results,null,2));
    console.log(JSON.stringify(results,null,2));
  } finally { child.kill('SIGTERM'); }
})().catch(error=>{console.error(error);process.exitCode=1;});
