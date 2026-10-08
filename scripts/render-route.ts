import { pathToFileURL } from 'node:url';
import { PassThrough } from 'node:stream';
import { createElement, type ComponentType, type ReactNode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';

export async function createRouteRenderer(distDir: string, { timeoutMs = 30000 } = {}) {
  // Each renderer owns its directory, including failed builds and imports.
  const bundleDir = fs.mkdtempSync(path.join(distDir, '.seo-renderer-'));
  const bundlePath = path.join(bundleDir, 'renderer.mjs');
  let routeComponents: {
    AppRoutes: ComponentType;
    FooterPageLinks: ComponentType;
    TestWrapper: ComponentType<{ initialPath: string; children?: ReactNode }>;
  };
  try {
    await build({ absWorkingDir: process.cwd(), entryPoints: ['src/App.tsx'], bundle: true, platform: 'node', format: 'esm', packages: 'external', outfile: bundlePath, logLevel: 'silent' });
    routeComponents = await import(pathToFileURL(bundlePath).href);
  } catch (error) {
    fs.rmSync(bundleDir, { recursive: true, force: true });
    throw error;
  }
  const { AppRoutes, FooterPageLinks, TestWrapper } = routeComponents;
  const activeRenders = new Set<() => void>();
  let disposed = false;
  return {
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const cancel of activeRenders) cancel();
      fs.rmSync(bundleDir, { recursive: true, force: true });
    },
    async render(pathname: string, fallbackHTML: string): Promise<string> {
      if (disposed) throw new Error('SSR renderer has been disposed.');
      const fragment = await new Promise<string>((resolve, reject) => {
        const output = new PassThrough();
        let html = '';
        let settled = false;
        let stream: ReturnType<typeof renderToPipeableStream> | undefined;
        const finish = (error?: unknown) => {
          if (settled) return;
          settled = true;
          clearTimeout(timeout);
          activeRenders.delete(cancel);
          output.destroy();
          if (error !== undefined) {
            stream?.abort();
            reject(error);
          } else {
            resolve(html);
          }
        };
        const cancel = () => finish(new Error(`SSR renderer disposed during render: ${pathname}`));
        activeRenders.add(cancel);
        output.on('data', chunk => { html += chunk.toString(); });
        output.on('end', () => finish());
        output.on('error', error => finish(error));
        const timeout = setTimeout(() => finish(new Error(`SSR zaman aşımı: ${pathname}`)), timeoutMs);
        try {
          stream = renderToPipeableStream(createElement(TestWrapper, { initialPath: pathname },
            createElement('div', null, createElement(AppRoutes), createElement('footer', null, createElement(FooterPageLinks)))), {
            onAllReady: () => { if (!settled) stream?.pipe(output); },
            onError: error => finish(error),
            onShellError: error => finish(error)
          });
          // A synchronous callback may settle before the stream is returned.
          if (settled) stream.abort();
        } catch (error) {
          finish(error);
        }
      });
      let page: JSDOM | undefined;
      let rendered: JSDOM | undefined;
      try {
        page = new JSDOM(fallbackHTML);
        rendered = new JSDOM(`<html><head></head><body><div id="rendered-route">${fragment}</div></body></html>`);
        const root = rendered.window.document.getElementById('rendered-route')!;
        const head = page.window.document.head;
        const metadata = [...rendered.window.document.querySelectorAll('title,meta,link,script[type="application/ld+json"]')];
        for (const node of metadata) {
          if (node.tagName === 'TITLE') head.querySelectorAll('title').forEach(old => old.remove());
          if (node.tagName === 'META') {
            const attribute = node.hasAttribute('name') ? 'name' : 'property';
            const value = node.getAttribute(attribute);
            if (value) [...head.querySelectorAll('meta')].filter(old => old.getAttribute(attribute) === value).forEach(old => old.remove());
          }
          if (node.tagName === 'LINK' && node.getAttribute('rel') === 'canonical') head.querySelectorAll('link[rel="canonical"]').forEach(old => old.remove());
          // Preserve different schema assertions. Only remove exact repeated records.
          if (node.tagName === 'SCRIPT') [...head.querySelectorAll('script[type="application/ld+json"]')].filter(old => old.textContent?.trim() === node.textContent?.trim()).forEach(old => old.remove());
          head.appendChild(page.window.document.importNode(node, true));
          node.remove();
        }
        const targetRoot = page.window.document.getElementById('root');
        if (!targetRoot) throw new Error(`SSR template has no root element: ${pathname}`);
        targetRoot.innerHTML = root.innerHTML;
        return page.serialize();
      } finally {
        page?.window.close();
        rendered?.window.close();
      }
    }
  };
}
