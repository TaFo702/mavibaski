import type { BlogPost } from '../data/blogData';

// Authorship corrected across the blog catalogue on this date.
export const BLOG_AUTHOR_NAME = 'Tayfun Akan';
export const BLOG_METADATA_UPDATED_DATE = '14 Ekim 2026';
export const BLOG_AUTHOR = {
  '@type': 'Person',
  name: BLOG_AUTHOR_NAME,
  affiliation: { '@type': 'Organization', name: 'Mavi Basım' },
};

const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

export function blogDateISO(label: string): string {
  const match = /^(\d{1,2}) (\S+) (\d{4})$/.exec(label.trim());
  if (!match) throw new Error(`Invalid recorded blog date: ${label}`);
  const month = MONTHS.indexOf(match[2]) + 1;
  if (!month) throw new Error(`Invalid recorded blog month: ${label}`);
  return `${match[3]}-${String(month).padStart(2, '0')}-${match[1].padStart(2, '0')}`;
}

export function getBlogMetadata(post: BlogPost) {
  const modifiedLabel = post.updatedDate || BLOG_METADATA_UPDATED_DATE;
  return {
    title: post.seoTitle || `${post.title} - Mavi Basım`,
    author: BLOG_AUTHOR,
    publishedLabel: post.date,
    modifiedLabel,
    datePublished: blogDateISO(post.date),
    dateModified: blogDateISO(modifiedLabel),
  };
}
