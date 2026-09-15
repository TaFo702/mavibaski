import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';

interface RelatedBlogPostsProps {
  category: string; // e.g. 'kartvizit', 'brosur', 'katalog', 'etiket', 'kutu', 'karton-canta', 'magnet', 'antetli', 'makbuz', 'zarf', 'el-ilani', 'dosya'
  title?: string;
}

export const RelatedBlogPosts: React.FC<RelatedBlogPostsProps> = ({
  category,
  title = "İlgili Matbaa & Tasarım Rehberleri"
}) => {
  const normCategory = category.toLowerCase().trim();

  // Find posts matching the product category keywords
  const matchedPosts = BLOG_POSTS.filter((post) => {
    const slug = post.slug.toLowerCase();
    const postTitle = post.title.toLowerCase();
    const postCategory = post.category.toLowerCase();
    const content = post.content.toLowerCase();

    if (normCategory === 'kartvizit') {
      return slug.includes('kartvizit') || postTitle.includes('kartvizit') || postCategory.includes('kartvizit');
    }
    if (normCategory === 'brosur' || normCategory === 'broşür') {
      return slug.includes('brosur') || slug.includes('broşür') || slug.includes('115-gr') || slug.includes('135-gr') || slug.includes('el-ilani') || postTitle.includes('broşür') || postTitle.includes('brosur');
    }
    if (normCategory === 'katalog' || normCategory === 'kataloglar') {
      return slug.includes('katalog') || postTitle.includes('katalog') || postCategory.includes('katalog');
    }
    if (normCategory === 'etiket') {
      return slug.includes('etiket') || postTitle.includes('etiket') || postCategory.includes('etiket');
    }
    if (normCategory === 'kutu' || normCategory === 'ambalaj') {
      return slug.includes('kutu') || slug.includes('ambalaj') || postTitle.includes('kutu') || postTitle.includes('ambalaj');
    }
    if (normCategory === 'karton-canta' || normCategory === 'canta') {
      return slug.includes('canta') || slug.includes('çanta') || postTitle.includes('çanta') || postTitle.includes('canta');
    }
    if (normCategory === 'magnet') {
      return slug.includes('magnet') || postTitle.includes('magnet') || postCategory.includes('magnet');
    }
    if (normCategory === 'antetli' || normCategory === 'zarf' || normCategory === 'dosya' || normCategory === 'dosyalar') {
      return slug.includes('antetli') || slug.includes('zarf') || slug.includes('dosya') || slug.includes('kimlik') || postTitle.includes('antetli') || postTitle.includes('zarf') || postTitle.includes('dosya');
    }
    if (normCategory === 'makbuz' || normCategory === 'sozlesme' || normCategory === 'adisyon') {
      return slug.includes('makbuz') || slug.includes('otokopili') || slug.includes('sozlesme') || slug.includes('sözleşme') || slug.includes('yer-gosterme') || slug.includes('adisyon');
    }
    if (normCategory === 'el-ilani') {
      return slug.includes('el-ilani') || slug.includes('brosur') || slug.includes('115-gr') || postTitle.includes('el ilanı');
    }
    if (normCategory === 'afis' || normCategory === 'afiş') {
      return slug.includes('brosur') || slug.includes('baski') || slug.includes('pazarlama') || postTitle.includes('baskı') || postTitle.includes('reklam') || postTitle.includes('afiş');
    }
    if (normCategory === 'amerikan-servis') {
      return slug.includes('amerikan-servis') || slug.includes('restoran') || postTitle.includes('amerikan servis') || postTitle.includes('restoran');
    }
    if (normCategory === 'oto-paspas') {
      return slug.includes('oto-paspas') || slug.includes('kraft') || postTitle.includes('paspas');
    }
    if (normCategory === 'bloknot' || normCategory === 'kup-bloknot' || normCategory === 'bloknotlar') {
      return slug.includes('antetli') || slug.includes('baskili-urunler') || slug.includes('kaliteli-baski') || postTitle.includes('bloknot') || postTitle.includes('kurumsal');
    }
    if (normCategory === 'yag-karti' || normCategory === 'ayrac') {
      return slug.includes('etiket') || slug.includes('kartvizit') || slug.includes('selefon') || postTitle.includes('etiket') || postTitle.includes('kart');
    }

    return slug.includes(normCategory) || postTitle.includes(normCategory) || postCategory.includes(normCategory) || content.includes(normCategory);
  });

  // Fallback: If not enough matches, add top general marketing & printing guides
  const fallbackPosts = BLOG_POSTS.filter(p => !matchedPosts.includes(p));
  const finalPosts = [...matchedPosts, ...fallbackPosts].slice(0, 3);

  if (finalPosts.length === 0) return null;

  return (
    <section className="my-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest mb-1">
            <Sparkles size={16} />
            <span>Matbaa Akademisi &amp; Rehberler</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
            {title}
          </h2>
        </div>
        <Link
          to="/blog"
          title="Tüm Matbaa ve Tasarım Blog Yazılarını İnceleyin"
          className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:text-slate-900 transition-colors uppercase tracking-wider shrink-0"
        >
          <span>Tüm Rehberleri Gör</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {finalPosts.map((post, index) => (
          <article
            key={index}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                <img
                  src={post.image}
                  alt={`${post.title} - Mavi Basım Matbaa Rehberi`}
                  title={`${post.title} İpuçları ve Detaylı Rehber`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-400 text-[11px] font-bold mb-2">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.readTime}
                </span>
                <span>•</span>
                <span>{post.date}</span>
              </div>

              <h3 className="text-sm font-black text-slate-800 group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                <Link
                  to={`/blog/${post.slug}`}
                  title={`${post.title} İncele ve Oku`}
                  className="hover:underline"
                >
                  {post.title}
                </Link>
              </h3>

              <p className="text-slate-500 text-xs font-semibold line-clamp-2 leading-relaxed mb-4">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
              <Link
                to="/hakkimizda"
                title="Mavi Basım Matbaa ve Grafik Uzmanları Biyografisi"
                className="text-[10px] font-bold text-slate-600 hover:text-primary transition-colors uppercase tracking-wider flex items-center gap-1.5 bg-slate-100/80 px-2 py-1 rounded-md"
              >
                <UserCheck size={12} className="text-primary shrink-0" />
                <span>Yazar: Mavi Basım Baskı &amp; Grafik Uzmanları</span>
              </Link>
              <Link
                to={`/blog/${post.slug}`}
                title={`${post.title} Detaylı Makalesini Oku`}
                className="inline-flex items-center gap-1 text-xs font-black text-primary group-hover:text-slate-900 transition-colors uppercase tracking-tight"
              >
                <span>Rehberi Oku</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedBlogPosts;
