import { Children, Fragment, isValidElement, type ReactNode } from 'react';
import routeHeadFallback from '../generated/routeHeadFallback.json';

export interface HeadTag {
  tag: string;
  attrs: Record<string, string>;
  text: string;
}

const managedSelector = 'title,meta[name="description"],meta[name="keywords"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"],link[rel="canonical"],script[type="application/ld+json"]';

export function readHead(document: Document): HeadTag[] {
  return [...document.head.querySelectorAll(managedSelector)]
    .filter(node => node.id !== 'app-seo-metadata-jsonld')
    .map(node => ({ tag: node.tagName.toLowerCase(), attrs: Object.fromEntries([...node.attributes].filter(attr => !attr.name.startsWith('data-')).map(attr => [attr.name, attr.value])), text: node.textContent || '' }));
}

export function childrenToHead(children: ReactNode): HeadTag[] {
  const tags: HeadTag[] = [];
  Children.forEach(children, child => {
    if (!isValidElement<Record<string, unknown>>(child)) return;
    if (child.type === Fragment) {
      tags.push(...childrenToHead(child.props.children as ReactNode));
      return;
    }
    if (typeof child.type !== 'string') return;
    const attrs: Record<string, string> = {};
    for (const [key, value] of Object.entries(child.props)) {
      if (['children', 'dangerouslySetInnerHTML'].includes(key) || value == null) continue;
      attrs[key === 'charSet' ? 'charset' : key === 'httpEquiv' ? 'http-equiv' : key] = String(value);
    }
    const inner = child.props.dangerouslySetInnerHTML as { __html?: string } | undefined;
    const text = inner?.__html ?? Children.toArray(child.props.children as ReactNode).join('');
    tags.push({ tag: child.type, attrs, text });
  });
  return tags;
}

function keyFor(tag: HeadTag): string {
  if (tag.tag === 'title') return 'title';
  if (tag.tag === 'meta') return `meta:${tag.attrs.name || tag.attrs.property || tag.attrs['http-equiv'] || 'charset'}`;
  if (tag.tag === 'link') return `link:${tag.attrs.rel}:${tag.attrs.rel === 'canonical' ? '' : tag.attrs.href}`;
  // Only identical JSON-LD is deduplicated. Different business assertions are preserved for review.
  return `${tag.tag}:${tag.attrs.id || ''}:${tag.text}`;
}

function routeHead(pathname: string): HeadTag[] {
  let normalized = pathname.trim().toLowerCase();
  if (normalized.length > 1 && normalized.endsWith('/')) normalized = normalized.slice(0, -1);
  if (!normalized) normalized = '/';
  const known = Object.hasOwn(routeHeadFallback.routes, normalized);
  const fallback: [string, string, string, Record<string, string>] = known ? routeHeadFallback.routes[normalized] : [
    '404 Sayfa Bulunamadı | Mavi Basım',
    'Aradığınız sayfa veya dijital matbaa ürünü bulunamadı.',
    `https://mavibasim.com${pathname}`,
    { robots: 'noindex, follow' },
  ];
  const [title, description, canonical, overrides] = fallback;
  // This small map is generated from the same direct-visit metadata source. It
  // contains no SSR body markup or JSON-LD from a previous page.
  const metas = {
    ...routeHeadFallback.defaults,
    'og:title': title,
    'og:description': description,
    'og:url': canonical,
    'twitter:title': title,
    'twitter:description': description,
    ...overrides,
  };
  return [
    { tag: 'title', attrs: {}, text: title },
    { tag: 'meta', attrs: { name: 'description', content: description }, text: '' },
    { tag: 'link', attrs: { rel: 'canonical', href: canonical }, text: '' },
    ...Object.entries(metas).map(([name, content]) => ({ tag: 'meta', attrs: { [name.startsWith('og:') ? 'property' : 'name']: name, content }, text: '' })),
  ];
}

export class HeadRegistry {
  private base: HeadTag[];
  private entries = new Map<string, { tags: HeadTag[]; priority: number }>();
  private queued = false;
  private pathname = typeof window === 'undefined' ? '' : window.location.pathname;
  private request?: AbortController;

  constructor() {
    this.base = typeof document === 'undefined' ? [] : readHead(document);
  }

  register(id: string, tags: HeadTag[], priority: number): void {
    this.entries.set(id, { tags, priority });
    this.schedule();
  }

  unregister(id: string): void {
    this.entries.delete(id);
    this.schedule();
  }

  async navigate(pathname: string): Promise<void> {
    if (this.pathname === pathname) return;
    this.pathname = pathname;
    this.request?.abort();
    const request = new AbortController();
    this.request = request;
    // Replace the old route immediately, including old noindex/JSON-LD tags. A
    // rejected or delayed request must never leave the previous page's metadata.
    this.base = routeHead(pathname);
    const expectedCanonical = this.base.find(tag => tag.tag === 'link' && tag.attrs.rel === 'canonical')?.attrs.href;
    this.schedule();
    try {
      // Pages without their own Helmet use the same server metadata as a direct visit.
      // Fetch only on client-side navigation; initial visits already contain this metadata.
      const response = await fetch(pathname, { signal: request.signal, headers: { Accept: 'text/html' } });
      if (![200, 404].includes(response.status) || !/^text\/html\b/i.test(response.headers.get('Content-Type') || '')) {
        throw new Error(`Geçersiz metadata yanıtı: HTTP ${response.status}`);
      }
      const html = await response.text();
      if (request.signal.aborted || this.pathname !== pathname) return;
      const tags = readHead(new DOMParser().parseFromString(html, 'text/html'));
      const title = tags.find(tag => tag.tag === 'title')?.text.trim();
      const description = tags.find(tag => tag.tag === 'meta' && tag.attrs.name === 'description')?.attrs.content?.trim();
      const canonical = tags.find(tag => tag.tag === 'link' && tag.attrs.rel === 'canonical')?.attrs.href;
      if (!title || !description || canonical !== expectedCanonical) {
        throw new Error('Metadata yanıtı eksik veya başka bir sayfaya ait.');
      }
      // The successful server document remains authoritative. Explicit status
      // handling also keeps genuine 404 pages out of search results.
      this.base = tags.filter(tag => !(tag.tag === 'meta' && tag.attrs.name === 'robots'));
      this.base.push({ tag: 'meta', attrs: { name: 'robots', content: response.status === 404 ? 'noindex, follow' : tags.find(tag => tag.tag === 'meta' && tag.attrs.name === 'robots')?.attrs.content || 'index, follow' }, text: '' });
      this.schedule();
    } catch (error) {
      if (!request.signal.aborted) console.error('Sayfa metadata bilgisi okunamadı:', error);
    }
  }

  private schedule(): void {
    if (this.queued || typeof document === 'undefined') return;
    this.queued = true;
    queueMicrotask(() => {
      this.queued = false;
      const tags = new Map(this.base.map(tag => [keyFor(tag), tag]));
      for (const { tags: declared, priority: _priority } of [...this.entries.values()].sort((a, b) => a.priority - b.priority)) {
        for (const tag of declared) tags.set(keyFor(tag), tag);
      }
      for (const node of document.head.querySelectorAll(`${managedSelector},[data-page-head]`)) {
        if (node.id !== 'app-seo-metadata-jsonld') node.remove();
      }
      for (const tag of tags.values()) {
        const node = document.createElement(tag.tag);
        for (const [name, value] of Object.entries(tag.attrs)) node.setAttribute(name, value);
        node.setAttribute('data-page-head', 'true');
        node.textContent = tag.text;
        document.head.appendChild(node);
      }
    });
  }
}
