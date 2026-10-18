import type { SearchMetadata } from '../data/pageSearchMetadata';

// Native page components may mount after the route fallback. Keep their text
// consistent with the first HTML without removing React-owned head elements.
export function synchronizeSearchMetadata(head: HTMLHeadElement, seo: SearchMetadata): void {
  head.querySelectorAll('title').forEach(tag => {
    if (tag.textContent !== seo.title) tag.textContent = seo.title;
  });
  for (const [selector, value] of [
    ['meta[name="description"]', seo.desc],
    ['meta[property="og:title"]', seo.title],
    ['meta[property="og:description"]', seo.desc],
    ['meta[name="twitter:title"]', seo.title],
    ['meta[name="twitter:description"]', seo.desc],
  ]) {
    head.querySelectorAll<HTMLMetaElement>(selector).forEach(tag => {
      if (tag.content !== value) tag.content = value;
    });
  }
}
