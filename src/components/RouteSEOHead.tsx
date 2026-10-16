import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getHomeSEO } from '../data/homePageContent';
import { injectSEOMetadata } from '../utils/seoMetadata';

// React 19 hoists Helmet tags. Prerender tags therefore need explicit ownership:
// remove the previous route's tags and retain native page tags where present.
export function RouteSEOHead() {
  const { pathname } = useLocation();
  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | undefined;
    const path = pathname.replace(/\/$/, '') || '/';
    const install = (seo: { title: string; desc: string; canonical: string; extraHead?: string; ogImage?: string }) => {
      if (cancelled) return;
      document.head.querySelectorAll('[data-prerender-seo]').forEach(tag => tag.remove());
      if (path === '/' || ['/arac-kiralama', '/blog/zarf-baskisinda-diplomat-ve-torba-zarf', '/blog/antetli-kagit-baskisinda-80gr-1.hamur'].includes(path)) document.getElementById('app-seo-metadata-jsonld')?.remove();
      const html = injectSEOMetadata('<html><head></head><body></body></html>',
        seo.title, seo.desc, seo.canonical, false, seo.extraHead, '', '', seo.ogImage);
      const head = new DOMParser().parseFromString(html, 'text/html').head;
      const owned = Array.from(head.children);
      owned.forEach(tag => document.head.appendChild(document.importNode(tag, true)));

      // Lazy product pages can add native tags after the route effect. Only
      // discard our fallback copy, never a page component's metadata or schema.
      const deduplicateFallbacks = () => {
        const native = Array.from(document.head.children).filter(tag => !tag.hasAttribute('data-prerender-seo'));
        document.head.querySelectorAll('[data-prerender-seo]').forEach(tag => {
          const duplicate = native.some(other => {
            if (other.tagName !== tag.tagName) return false;
            if (tag.tagName === 'TITLE') return true;
            if (tag.tagName === 'LINK') return other.getAttribute('rel') === 'canonical';
            if (tag.tagName === 'META') {
              const attr = tag.hasAttribute('property') ? 'property' : 'name';
              return other.getAttribute(attr) === tag.getAttribute(attr);
            }
            if (tag.tagName === 'SCRIPT' && other.getAttribute('type') === 'application/ld+json') {
              try {
                const value = JSON.parse(tag.textContent || 'null');
                const candidate = JSON.parse(other.textContent || 'null');
                const entities = Array.isArray(candidate) ? candidate : [candidate];
                return entities.some(entity => value?.['@id'] && entity?.['@id'] === value['@id'] &&
                  JSON.stringify(entity['@type']) === JSON.stringify(value['@type']));
              } catch { return false; }
            }
            return false;
          });
          if (duplicate) tag.remove();
        });
      };
      deduplicateFallbacks();
      observer = new MutationObserver(deduplicateFallbacks);
      observer.observe(document.head, { childList: true, subtree: true, attributes: true });
    };

    if (path === '/') install(getHomeSEO());
    else import('../utils/seoGenerator').then(({ getRouteSEO }) => {
      const seo = getRouteSEO(path);
      // Preserve existing route-specific share images and dimensions.
      install(seo);
    }).catch(error => console.error('Route SEO metadata could not be loaded', error));
    return () => { cancelled = true; observer?.disconnect(); };
  }, [pathname]);
  return null;
}
