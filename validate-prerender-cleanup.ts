import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { createRouteRenderer } from './scripts/render-route';

// All injected app, sitemap and build output changes stay in this temporary fixture.
const repoDir = path.dirname(fileURLToPath(import.meta.url));
const fixtureDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mavibaski-prerender-cleanup-'));
const originalCwd = process.cwd();
const distDir = path.join(fixtureDir, 'dist');
const appPath = path.join(fixtureDir, 'src', 'App.tsx');
const template = '<!doctype html><html><head><title>Fallback</title></head><body><div id="root"></div></body></html>';
const safeApp = `import { createElement } from 'react';
export function TestWrapper({ children }) { return children; }
export function AppRoutes() { return createElement('main', null, 'Rendered fixture'); }`;
const rendererFiles = () => fs.readdirSync(distDir).filter(name => name.startsWith('.seo-renderer'));
const noRendererFiles = () => assert.deepEqual(rendererFiles(), [], 'Temporary SSR bundles must be removed.');
let passed = 0;
async function check(name: string, run: () => Promise<void> | void) {
  await run();
  passed++;
  console.log(`PASS ${name}`);
}

try {
  fs.mkdirSync(path.join(fixtureDir, 'src', 'utils'), { recursive: true });
  fs.mkdirSync(path.join(fixtureDir, 'scripts'));
  fs.mkdirSync(path.join(fixtureDir, 'public'));
  fs.mkdirSync(distDir);
  fs.symlinkSync(path.join(repoDir, 'node_modules'), path.join(fixtureDir, 'node_modules'), 'dir');
  fs.writeFileSync(path.join(fixtureDir, 'package.json'), '{"type":"module"}');
  fs.copyFileSync(path.join(repoDir, 'scripts', 'prerender.ts'), path.join(fixtureDir, 'scripts', 'prerender.ts'));
  fs.copyFileSync(path.join(repoDir, 'scripts', 'render-route.ts'), path.join(fixtureDir, 'scripts', 'render-route.ts'));
  fs.writeFileSync(path.join(fixtureDir, 'src', 'utils', 'seoGenerator.ts'), `
export const URL_REDIRECTS = {}; export const knownStaticRoutes = ['/'];
export function getRouteSEO() { return { title: 'Fixture', desc: 'Fixture', canonical: 'https://mavibasim.com/' }; }
export function injectSEOMetadata(template: string) { return template; }`);
  fs.writeFileSync(path.join(fixtureDir, 'public', 'sitemap.xml'), '<urlset><url><loc>https://mavibasim.com/</loc></url></urlset>');
  fs.writeFileSync(path.join(distDir, 'index.html'), template);
  process.chdir(fixtureDir);

  await check('build error removes owned temporary directory', async () => {
    fs.writeFileSync(appPath, 'export function broken( {');
    await assert.rejects(createRouteRenderer(distDir));
    noRendererFiles();
  });

  await check('import error removes a successfully built bundle', async () => {
    fs.writeFileSync(appPath, `throw new Error('INJECTED_IMPORT_FAILURE'); ${safeApp}`);
    await assert.rejects(createRouteRenderer(distDir), /INJECTED_IMPORT_FAILURE/);
    noRendererFiles();
  });

  await check('renderers have separate bundles, fresh imports and independent disposal', async () => {
    fs.writeFileSync(appPath, safeApp);
    const first = await createRouteRenderer(distDir);
    fs.writeFileSync(appPath, safeApp.replace('Rendered fixture', 'Second fixture'));
    const second = await createRouteRenderer(distDir);
    try {
      assert.equal(rendererFiles().length, 2);
      assert.match(await first.render('/', template), /Rendered fixture/);
      first.dispose();
      assert.equal(rendererFiles().length, 1);
      assert.match(await second.render('/', template), /Second fixture/);
      await assert.rejects(first.render('/', template), /disposed/);
      first.dispose();
    } finally {
      first.dispose();
      second.dispose();
    }
    noRendererFiles();
  });

  await check('render error clears its timeout and rejects promptly', async () => {
    fs.writeFileSync(appPath, 'export function TestWrapper({children}) { return children; } export function AppRoutes() { throw new Error("INJECTED_RENDER_FAILURE"); }');
    const timeoutMs = 5000;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const originalSetTimeout = globalThis.setTimeout;
    const originalClearTimeout = globalThis.clearTimeout;
    globalThis.setTimeout = ((callback, delay, ...args) => {
      const timer = originalSetTimeout(callback, delay, ...args);
      if (delay === timeoutMs) timers.add(timer);
      return timer;
    }) as typeof setTimeout;
    globalThis.clearTimeout = timer => {
      timers.delete(timer as ReturnType<typeof setTimeout>);
      originalClearTimeout(timer);
    };
    let renderer: Awaited<ReturnType<typeof createRouteRenderer>> | undefined;
    try {
      renderer = await createRouteRenderer(distDir, { timeoutMs });
      await assert.rejects(renderer.render('/', template), /INJECTED_RENDER_FAILURE/);
      assert.equal(timers.size, 0, 'Render failures must clear the pending timeout.');
    } finally {
      renderer?.dispose();
      for (const timer of timers) originalClearTimeout(timer);
      globalThis.setTimeout = originalSetTimeout;
      globalThis.clearTimeout = originalClearTimeout;
    }
    noRendererFiles();
  });

  await check('suspended render times out and disposal cancels an active render', async () => {
    fs.writeFileSync(appPath, 'const pending = new Promise(() => {}); export function TestWrapper({children}) { return children; } export function AppRoutes() { throw pending; }');
    const renderer = await createRouteRenderer(distDir, { timeoutMs: 40 });
    try {
      await assert.rejects(renderer.render('/', template), /SSR zaman aşımı/);
      const active = renderer.render('/active', template);
      renderer.dispose();
      await assert.rejects(active, /disposed during render/);
    } finally {
      renderer.dispose();
    }
    noRendererFiles();
  });

  await check('HTML assembly errors close both JSDOM windows', async () => {
    fs.writeFileSync(appPath, safeApp);
    const renderer = await createRouteRenderer(distDir);
    const descriptor = Object.getOwnPropertyDescriptor(JSDOM.prototype, 'window')!;
    const observed = new WeakSet<object>();
    let closed = 0;
    Object.defineProperty(JSDOM.prototype, 'window', {
      ...descriptor,
      get() {
        const window = descriptor.get!.call(this);
        if (!observed.has(window)) {
          observed.add(window);
          const close = window.close.bind(window);
          window.close = () => { closed++; close(); };
        }
        return window;
      }
    });
    try {
      await assert.rejects(renderer.render('/', '<html><body>Missing root</body></html>'), /no root element/);
      assert.equal(closed, 2, 'Both JSDOM windows must close after assembly failure.');
    } finally {
      Object.defineProperty(JSDOM.prototype, 'window', descriptor);
      renderer.dispose();
    }
    noRendererFiles();
  });

  await check('prerender process fails without skipping bundle cleanup or overwriting the page', () => {
    fs.writeFileSync(appPath, 'export function TestWrapper({children}) { return children; } export function AppRoutes() { throw new Error("INJECTED_ROUTE_FAILURE"); }');
    const result = spawnSync(process.execPath, [path.join(repoDir, 'node_modules', 'tsx', 'dist', 'cli.mjs'), 'scripts/prerender.ts'], { cwd: fixtureDir, encoding: 'utf8', timeout: 15000 });
    assert.ifError(result.error);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /INJECTED_ROUTE_FAILURE/);
    assert.equal(fs.readFileSync(path.join(distDir, 'index.html'), 'utf8'), template);
    noRendererFiles();
  });

  console.log(`Prerender cleanup: ${passed}/${passed} checks passed.`);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  process.chdir(originalCwd);
  fs.rmSync(fixtureDir, { recursive: true, force: true });
}
