import fs from 'node:fs';
import path from 'node:path';
import postcss, { type ChildNode, type Container } from 'postcss';
import { JSDOM } from 'jsdom';

function decodeClassName(value: string): string {
  return value.replace(/\\([0-9a-f]{1,6}\s?|.)/gi, (_, escaped: string) =>
    /^[0-9a-f]{1,6}\s?$/i.test(escaped)
      ? String.fromCodePoint(parseInt(escaped.trim(), 16)) : escaped);
}

// Copy existing CSS rules; never recreate the price table's styles by hand.
function criticalStyles(css: string, classes: Set<string>): string {
  const root = postcss.parse(css);
  const retain = (container: Container) => {
    for (const node of [...(container.nodes || [])] as ChildNode[]) {
      if (node.type === 'rule') {
        const usedClasses = [...node.selector.matchAll(/\.((?:\\(?:[0-9a-f]{1,6}\s?|.)|[\w-])+)/gi)]
          .map(match => decodeClassName(match[1]));
        if (usedClasses.length && !usedClasses.some(name => classes.has(name))) node.remove();
      } else if (node.type === 'atrule' && node.nodes) {
        // Base/theme declarations, property registrations and keyframes retain
        // their original ordering and values, including Tailwind's CSS layers.
        if (node.name === 'layer' && /^(theme|base|properties)$/.test(node.params)) continue;
        if (node.name === 'keyframes' || node.name === 'property') continue;
        retain(node);
        if (!node.nodes.length) node.remove();
      }
    }
  };
  retain(root);
  return root.toString();
}

export function optimizeReceteHTML(html: string, distDirectory: string): string {
  const doc = new JSDOM(html).window.document;
  const hero = doc.querySelector('main h1')?.parentElement;
  const contents = doc.querySelector('nav[aria-label="Sayfa İçindekiler Navigasyonu"]')?.parentElement;
  const targets = [doc.querySelector('header'), hero, contents,
    doc.querySelector('nav[aria-label="Breadcrumb"]'), doc.querySelector('#fiyat-tablosu')];
  if (targets.some(target => !target)) throw new Error('Reçete critical CSS: expected first-screen sections.');
  const classes = new Set<string>();
  for (const target of targets) {
    for (const element of [target!, ...target!.querySelectorAll('*')]) {
      element.classList.forEach(name => classes.add(name));
    }
    let ancestor = target!.parentElement;
    while (ancestor) {
      ancestor.classList.forEach(name => classes.add(name));
      ancestor = ancestor.parentElement;
    }
  }

  let optimized = html.replace(/<link\b[^>]*rel="stylesheet"[^>]*href="(\/assets\/[^"<>]+\.css)"[^>]*>/g,
    (_link, href: string) => {
      const css = fs.readFileSync(path.join(distDirectory, href.slice(1)), 'utf8');
      const critical = criticalStyles(css, classes);
      if (!critical.length || critical.length >= css.length) throw new Error('Reçete critical CSS extraction failed.');
      return `<style data-recete-critical-css>${critical}</style>` +
        `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'" />` +
        `<noscript><link rel="stylesheet" href="${href}" /></noscript>`;
    });
  if (!optimized.includes('data-recete-critical-css')) throw new Error('Reçete stylesheet not found.');

  // Paint the server-rendered first screen before executing the application.
  // Preload its unchanged module so this does not introduce a network waterfall.
  let entry = '';
  optimized = optimized.replace(/<script\b[^>]*type="module"[^>]*src="(\/assets\/[\w.-]+\.js)"[^>]*><\/script>/,
    (_script, href: string) => {
      entry = href;
      return `<link rel="modulepreload" crossorigin href="${href}" />`;
    });
  if (!entry) throw new Error('Reçete module entry not found.');
  const bootstrap = `<script data-recete-bootstrap>(()=>{const start=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>import(${JSON.stringify(entry)})));if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start()})();</script>`;
  optimized = optimized.replace('</body>', `${bootstrap}</body>`);
  // Optional font loading avoids replacing the LCP text with a late web font.
  return optimized.replaceAll('display=swap', 'display=optional');
}
