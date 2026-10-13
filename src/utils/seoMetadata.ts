// SEO metadata duplicate cleanup
// Replaces SEO metadata inside index.html templates safely and without duplicates
export function injectSEOMetadata(
  html: string,
  title: string,
  desc: string,
  canonicalUrl: string,
  is404 = false,
  extraHead = '',
  h1Text = '',
  bodyContent = '',
  ogImage?: string
): string {
  const escapeAttribute = (value: string): string =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;');

  const readExtraMeta = (
    attribute: 'name' | 'property',
    value: string
  ): string => {
    const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const pattern = new RegExp(
      `<meta\\b(?=[^>]*\\b${attribute}\\s*=\\s*["']${escapedValue}["'])[^>]*\\bcontent\\s*=\\s*["']([^"']*)["'][^>]*\\/?>`,
      'i'
    );

    return pattern.exec(extraHead)?.[1] || '';
  };

  const removeManagedMetadata = (source: string): string =>
    source
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
      .replace(
        /<meta\b(?=[^>]*\b(?:name|property)\s*=\s*["'](?:description|keywords|robots|og:[^"']+|twitter:[^"']+)["'])[^>]*\/?>/gi,
        ''
      )
      .replace(
        /<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*\/?>/gi,
        ''
      );

  const resolvedOgImage =
    ogImage ||
    readExtraMeta('property', 'og:image') ||
    'https://mavibasim.com/mavilogo.png';

  const resolvedOgSecureUrl =
    readExtraMeta('property', 'og:image:secure_url') || resolvedOgImage;

  const resolvedOgType =
    readExtraMeta('property', 'og:image:type') ||
    (resolvedOgImage.endsWith('.webp')
      ? 'image/webp'
      : resolvedOgImage.endsWith('.png')
        ? 'image/png'
        : 'image/jpeg');

  const resolvedOgWidth =
    readExtraMeta('property', 'og:image:width') ||
    (resolvedOgImage.endsWith('.webp') ? '800' : '1200');

  const resolvedOgHeight =
    readExtraMeta('property', 'og:image:height') ||
    (resolvedOgImage.endsWith('.webp') ? '533' : '630');

  const resolvedOgAlt =
    readExtraMeta('property', 'og:image:alt') || title;

  const resolvedOgDescription =
    readExtraMeta('property', 'og:description') || desc;

  const resolvedOgSiteName =
    readExtraMeta('property', 'og:site_name') ||
    'Mavi Basım Matbaa & Reklam';

  const resolvedOgLocale =
    readExtraMeta('property', 'og:locale') || 'tr_TR';

  const resolvedTwitterCard =
    readExtraMeta('name', 'twitter:card') || 'summary_large_image';

  const resolvedTwitterImage =
    readExtraMeta('name', 'twitter:image') || resolvedOgImage;

  const safeTitle = escapeAttribute(title);
  const safeDescription = escapeAttribute(desc);
  const safeCanonical = escapeAttribute(canonicalUrl);
  const safeOgImage = escapeAttribute(resolvedOgImage);
  const safeOgSecureUrl = escapeAttribute(resolvedOgSecureUrl);
  const safeOgType = escapeAttribute(resolvedOgType);
  const safeOgWidth = escapeAttribute(resolvedOgWidth);
  const safeOgHeight = escapeAttribute(resolvedOgHeight);
  const safeOgAlt = escapeAttribute(resolvedOgAlt);
  const safeOgDescription = escapeAttribute(resolvedOgDescription);
  const safeOgSiteName = escapeAttribute(resolvedOgSiteName);
  const safeOgLocale = escapeAttribute(resolvedOgLocale);
  const safeTwitterCard = escapeAttribute(resolvedTwitterCard);
  const safeTwitterImage = escapeAttribute(resolvedTwitterImage);

  const robotsContent = is404 ? 'noindex, follow' : 'index, follow';

  let result = removeManagedMetadata(html);
  const cleanedExtraHead = removeManagedMetadata(extraHead).trim()
    .replace(/<script\b/gi, '<script data-prerender-seo="true"');

  const managedMetadata = [
    `<title data-rh="true" data-prerender-seo="true">${safeTitle}</title>`,
    `<meta data-rh="true" data-prerender-seo="true" name="description" content="${safeDescription}" />`,
    `<link data-rh="true" data-prerender-seo="true" rel="canonical" href="${safeCanonical}" />`,
    `<meta data-rh="true" data-prerender-seo="true" name="robots" content="${robotsContent}" />`,
    `<meta data-rh="true" data-prerender-seo="true" property="og:title" content="${safeTitle}" />`,
    `<meta data-rh="true" data-prerender-seo="true" property="og:description" content="${safeOgDescription}" />`,
    `<meta data-rh="true" data-prerender-seo="true" property="og:url" content="${safeCanonical}" />`,
    `<meta data-rh="true" data-prerender-seo="true" property="og:type" content="website" />`,
    `<meta data-rh="true" data-prerender-seo="true" property="og:site_name" content="${safeOgSiteName}" />`,
    `<meta data-rh="true" data-prerender-seo="true" property="og:locale" content="${safeOgLocale}" />`,
    `<meta data-rh="true" data-prerender-seo="true" property="og:image" content="${safeOgImage}" />`,
    `<meta data-rh="true" data-prerender-seo="true" property="og:image:secure_url" content="${safeOgSecureUrl}" />`,
    `<meta data-rh="true" data-prerender-seo="true" property="og:image:type" content="${safeOgType}" />`,
    `<meta data-rh="true" data-prerender-seo="true" property="og:image:width" content="${safeOgWidth}" />`,
    `<meta data-rh="true" data-prerender-seo="true" property="og:image:height" content="${safeOgHeight}" />`,
    `<meta data-rh="true" data-prerender-seo="true" property="og:image:alt" content="${safeOgAlt}" />`,
    `<meta data-rh="true" data-prerender-seo="true" name="twitter:card" content="${safeTwitterCard}" />`,
    `<meta data-rh="true" data-prerender-seo="true" name="twitter:title" content="${safeTitle}" />`,
    `<meta data-rh="true" data-prerender-seo="true" name="twitter:description" content="${safeDescription}" />`,
    `<meta data-rh="true" data-prerender-seo="true" name="twitter:image" content="${safeTwitterImage}" />`
  ].join('\n  ');

  const headAdditions =
    `  ${managedMetadata}\n` +
    (cleanedExtraHead ? `  ${cleanedExtraHead}\n` : '');

  if (/<\/head>/i.test(result)) {
    result = result.replace(/<\/head>/i, `${headAdditions}</head>`);
  }

  const rootInner =
    bodyContent || (h1Text ? `<h1>${escapeAttribute(h1Text)}</h1>` : '');

  if (rootInner) {
    result = result.replace(
      '<div id="root"></div>',
      `<div id="root">${rootInner}</div>`
    );
  }

  return result;
}
