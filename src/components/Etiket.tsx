import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ShoppingCart, 
  HelpCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Scissors, 
  Droplets, 
  FileText, 
  AlertTriangle,
  Zap,
  Sparkles
} from 'lucide-react';
import { 
  useCart, 
  FeatureTooltip
} from '../App';
import { CategoryHero } from './CategoryHero';
import { RelatedBlogPosts } from './RelatedBlogPosts';
import { 
  ETIKET_DATA, 
  ETIKET_SEO_METADATA, 
  ETIKET_FAQS, 
  ETIKET_GALLERY, 
  ETIKET_COMPARISON_DATA, 
  ETIKET_SCHEMAS 
} from '../data/etiketPageContent';
import { ETIKET_IMAGE_MANIFEST } from '../generated/sectorImageManifest';

const DynamicImageContainer = ({ 
  src, 
  alt, 
  title, 
  width,
  height,
  idx,
  className = "",
  imgClassName = ""
}: { 
  src: string; 
  alt: string; 
  title?: string; 
  width: number;
  height: number;
  idx: number;
  className?: string;
  imgClassName?: string;
}) => {
  const isAvailable = Boolean(ETIKET_IMAGE_MANIFEST[src as keyof typeof ETIKET_IMAGE_MANIFEST]);

  return (
    <div className={`overflow-hidden rounded-xl bg-white mb-4 flex items-center justify-center p-1.5 w-full aspect-[4/3] relative transition-all duration-300 border border-gray-100 ${className}`}>
      {isAvailable ? (
        <img 
          src={src} 
          alt={alt} 
          title={title}
          width={width}
          height={height}
          loading={idx === 0 ? "eager" : "lazy"}
          {...(idx === 0 ? { fetchPriority: "high" as const } : {})}
          className={`w-full h-full object-contain rounded-lg transition-all duration-300 ${imgClassName}`} 
        />
      ) : (
        <div data-placeholder-number={idx + 1} className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-6 text-center rounded-lg">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Görsel Hazırlanıyor</span>
          <span className="text-[11px] text-slate-400 mt-1">Yuva {idx + 1}</span>
        </div>
      )}
    </div>
  );
};

export const EtiketPage = () => {
  const { openProductDetail } = useCart();

  const handleOrderClick = (item: (typeof ETIKET_DATA)[number]) => {
    openProductDetail({ ...item, miktar: "1.000 Adet" }, "Etiket");
  };

  useEffect(() => {
    // Synchronize route-specific schemas
    const schemasToManage = [
      { id: 'etiket-breadcrumb-schema', data: ETIKET_SCHEMAS.breadcrumbSchema },
      { id: 'etiket-product-schema', data: ETIKET_SCHEMAS.productSchema },
      { id: 'etiket-faq-schema', data: ETIKET_SCHEMAS.faqSchema },
    ];

    schemasToManage.forEach(({ id, data }) => {
      let el = document.getElementById(id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement('script');
        el.id = id;
        el.type = 'application/ld+json';
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(data);
    });

    return () => {
      schemasToManage.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{ETIKET_SEO_METADATA.title}</title>
        <meta name="description" content={ETIKET_SEO_METADATA.desc} />
        <link rel="canonical" href={ETIKET_SEO_METADATA.canonical} />
        <meta name="robots" content={ETIKET_SEO_METADATA.robots} />
        
        {/* Open Graph */}
        <meta property="og:title" content={ETIKET_SEO_METADATA.title} />
        <meta property="og:description" content={ETIKET_SEO_METADATA.desc} />
        <meta property="og:url" content={ETIKET_SEO_METADATA.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ETIKET_SEO_METADATA.ogImage} />
        <meta property="og:image:secure_url" content={ETIKET_SEO_METADATA.ogImage} />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="1536" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:image:alt" content="Mavi Basım yapışkanlı etiket ve sticker baskı fiyatları" />
        <meta property="og:site_name" content="Mavi Basım Matbaa & Reklam" />
        <meta property="og:locale" content="tr_TR" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ETIKET_SEO_METADATA.title} />
        <meta name="twitter:description" content={ETIKET_SEO_METADATA.desc} />
        <meta name="twitter:image" content={ETIKET_SEO_METADATA.ogImage} />
      </Helmet>

      {/* BREADCRUMB NAVIGATION */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 flex-wrap">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            </li>
            <li className="text-slate-400">/</li>
            <li>
              <Link to="/matbaa" className="hover:text-primary transition-colors">Matbaa Ürünleri</Link>
            </li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-900 font-bold" aria-current="page">Etiket Baskı Fiyatları</li>
          </ol>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-7xl pt-4 pb-12">
        <CategoryHero 
          title="Yapışkanlı Etiket ve Sticker Baskı Fiyatları"
          description="Ürün ambalajlarınız, kutularınız, cam kavanoz veya şişeleriniz için kuşe çıkartma, PP opak suya dayanıklı ve şeffaf yapışkanlı etiket çözümleri. Baskıya hazır dosyalarınızı ileterek siparişlerinizi İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktamız üzerinden kolayca planlayabilirsiniz."
          badge="Yapışkanlı Sticker ve Ambalaj Etiketi"
          trustSignals={[
            { text: "İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktası" },
            { text: "Baskıya hazır dosyanın teknik kontrolü ve PDF prova kontrolü ücretsizdir." },
            { text: "Grafik tasarım desteği sunuyoruz." },
            { text: "Dijital onay alınmadan baskıya başlanmaz." }
          ]}
        />

        <div className="mb-8 -mt-2 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs md:text-sm text-slate-700">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="text-primary shrink-0" size={18} />
            <span className="font-semibold">Baskıya hazır dosyanın teknik kontrolü ve PDF prova kontrolü ücretsizdir. Grafik tasarım desteği sunuyoruz. Dijital onay alınmadan baskıya başlanmaz.</span>
          </div>
          <span className="text-slate-500 font-medium text-xs shrink-0">
            İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktası
          </span>
        </div>

        {/* FİYAT LİSTESİ TABLOSU */}
        <section id="fiyat-tablosu" className="scroll-mt-24 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-7 bg-primary rounded-full shrink-0" />
                <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  Etiket Baskı Fiyat Listesi
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Kuşe, şeffaf ve PP opak suya dayanıklı yapışkanlı etiket ve sticker fiyatları
              </p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Kuşe &amp; PP Opak • Canlı Baskı</span>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
              <caption className="sr-only">Etiket Baskı Fiyat Listesi</caption>
              <thead>
                <tr className="bg-black text-white">
                  <th scope="col" className="p-4 w-10"></th>
                  <th scope="col" className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                  <th scope="col" className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EBAT</th>
                  <th scope="col" className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                  <th scope="col" className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                  <th scope="col" className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {ETIKET_DATA.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group">
                    {idx === 0 && (
                      <th 
                        scope="rowgroup"
                        rowSpan={ETIKET_DATA.length}
                        className="bg-secondary text-white font-black text-center p-1 w-10 border-r border-white/10"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        <span className="tracking-[0.1em] uppercase text-[10px]">ETİKET</span>
                      </th>
                    )}
                    <th scope="row" className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors font-sans">{item.code}</th>
                    <td className="p-3 text-center font-medium text-black border-r border-gray-100">{item.ebat}</td>
                    <td className="p-3 text-center text-black font-medium border-r border-gray-100">
                      {item.desc}
                      <FeatureTooltip code={item.code} />
                    </td>
                    <td className="p-3 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[14px] md:text-[16px] transition-colors">{item.price}</td>
                    <td className="p-3 text-center">
                      <button 
                        type="button"
                        onClick={() => handleOrderClick(item)} 
                        className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                      >
                        <ShoppingCart size={14} className="shrink-0" />
                        <span>Hemen Sipariş Ver</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50/80 px-4 py-3.5 border-t border-amber-200/80 flex flex-col gap-2 text-xs font-medium font-sans">
            <div className="flex items-start gap-2 text-amber-900 font-bold text-xs md:text-sm leading-snug">
              <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <span>* Tablomuz standart kuşe çıkartma etiket fiyatlarını içermektedir. PP Opak, şeffaf, sökülebilir ve rulo etiket talepleriniz özel teklif kapsamındadır.</span>
            </div>
            <div className="text-slate-500 text-[11px] md:text-xs pl-6">
              * Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.
            </div>
          </div>
        </div>
      </section>

        {/* ÜRÜN FOTOĞRAFLARI GALERİSİ */}
        <div className="mt-12 mb-12 scroll-mt-24">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Etiket &amp; Sticker Ürün Fotoğrafları Galerisi
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ETIKET_GALLERY.map((img, idx) => (
              <figure 
                key={idx} 
                className="bg-gray-50 border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:bg-white hover:shadow-md transition-all group"
              >
                <DynamicImageContainer 
                  src={img.src} 
                  alt={img.alt} 
                  title={img.title} 
                  width={img.width}
                  height={img.height}
                  idx={idx}
                  imgClassName="group-hover:scale-105"
                />
                <div className="mt-2">
                  <h3 className="text-sm font-black text-black uppercase mb-1.5">{img.title}</h3>
                  <figcaption className="text-gray-550 text-xs font-semibold leading-relaxed">
                    {img.desc}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        {/* DETAYLI TEKNİK REHBER & İÇERİK BÖLÜMÜ */}
        <div className="mt-16 space-y-16">
          {/* Giriş & Genel Bilgi */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">
              Yapışkanlı Etiket ve Sticker Çözümleri
            </h2>
            <div className="prose prose-slate max-w-none text-black leading-relaxed">
              <p className="text-base md:text-lg mb-6">
                <strong className="font-black text-black">Mavi Basım Matbaa &amp; Reklam</strong> olarak, İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktamızdan kurumsal etiket ve yapışkanlı sticker çözümleri sunuyoruz. Ürünlerin ambalaj kimliğini güçlendiren, tüketiciye güven veren ve kullanım alanına uygun etiket alternatifleri hazırlıyoruz.
              </p>
              <p className="text-base md:text-lg mb-6">
                Etiket baskı taleplerinizde malzeme ve teknik özelliklere göre şeffaf fiyatlandırma sunuyoruz. Kuru gıda kutularından soğuk zincir ambalajlarına, kozmetik şişelerinden kargo paketlerine kadar farklı malzeme alternatifleri mevcuttur. Kuşe çıkartma kağıdı ve neme dayanıklı PP Opak plastik taşıyıcılar en sık tercih edilen seçenekler arasındadır.
              </p>
              <p className="text-base md:text-lg">
                Etiket baskı, ambalaj ürünlerinde markaların ürün üzerindeki ilk iletişim noktasıdır. Sipariş sürecimizde grafik ekibimiz baskıya hazır dosyanızı kesim toleranslarına ve bıçak çizgisine göre ücretsiz kontrol eder. Dijital PDF prova onayı alınmadan baskıya geçilmez.
              </p>
            </div>
          </section>

          {/* MALZEME KARŞILAŞTIRMA MATRİSİ */}
          <section className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="text-primary shrink-0" size={28} />
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                Etiket Malzemeleri Karşılaştırması
              </h2>
            </div>
            <p className="text-gray-600 font-medium mb-8">
              Ürününüzün maruz kalacağı çevresel şartlara (su, nem, yağ, sıcaklık) göre en doğru etiket malzemesini seçebilirsiniz:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <caption className="sr-only">Etiket Malzemeleri Karşılaştırması</caption>
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th scope="col" className="p-4 rounded-tl-xl font-black uppercase">Malzeme Türü</th>
                    <th scope="col" className="p-4 font-black uppercase">Su &amp; Nem Dayanımı</th>
                    <th scope="col" className="p-4 font-black uppercase">Yırtılma Direnci</th>
                    <th scope="col" className="p-4 font-black uppercase">Yüzey Görünümü</th>
                    <th scope="col" className="p-4 rounded-tr-xl font-black uppercase">Önerilen Kullanım Alanı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {ETIKET_COMPARISON_DATA.map((item, idx) => (
                    <tr key={idx}>
                      <th scope="row" className="p-4 font-black text-black text-left">{item.material}</th>
                      <td className="p-4 font-bold text-slate-800">{item.waterResist}</td>
                      <td className="p-4 font-bold text-slate-800">{item.tearResist}</td>
                      <td className="p-4 text-gray-700 font-medium">{item.surface}</td>
                      <td className="p-4 text-gray-700 font-medium">{item.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs md:text-sm text-amber-900 font-medium">
              <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
              <p>
                <strong>Gıda Teması ve Kullanım Koşulları:</strong> Standart etiketlerimiz ambalajın, kutunun veya cam kavanozun dış yüzeyine uygulanan ikincil ambalaj etiketidir. Doğrudan gıdayla temas eden iç yüzeyler için kullanılmaz. Su, nem, yağ, sıcaklık ve kimyasal temas performansı kullanım koşullarına göre değişebilir; özel gıda teması gerektiren ambalaj taleplerinizi sipariş öncesinde teklif aşamasında belirtmeniz önerilir.
              </p>
            </div>
          </section>

          {/* YAPIŞKAN VE LAMINASYON TEKNOLOJİLERİ */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">
              Yapışkan Türleri ve Yüzey Kaplama Seçenekleri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 font-black">
                  <ShieldCheck size={26} />
                </div>
                <h3 className="text-lg font-black text-black mb-2">Akrilik Tutkal (Standart Yapışkan)</h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed">
                  Oda sıcaklığındaki düz cam, plastik, kağıt ve karton yüzeyler için standart tutuculuk sunan akrilik esaslı yapışkan türüdür.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 font-black">
                  <Zap size={26} />
                </div>
                <h3 className="text-lg font-black text-black mb-2">Özel Yapışkan Seçenekleri</h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed">
                  Yapışkan türü uygulama yüzeyi ve kullanım koşullarına göre belirlenir. Pürüzlü, kavisli veya farklı sıcaklık koşullarına maruz kalan yüzeyler için uygun yapışkan alternatifleri teklif aşamasında değerlendirilir.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 font-black">
                  <Droplets size={26} />
                </div>
                <h3 className="text-lg font-black text-black mb-2">Parlak &amp; Mat Selefon Lamine</h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed">
                  Baskının üzerine çekilen koruyucu film katmanı. Parlak selefon renkleri canlı gösterirken, mat selefon parlamasız kurumsal bir doku kazandırır.
                </p>
              </div>
            </div>
          </section>

          {/* TEKNİK ÖZELLİKLER & SIK YAPILAN HATALAR */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="bg-gray-50 p-8 rounded-[32px] border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="text-primary" size={26} />
                <h2 className="text-2xl font-black text-black uppercase tracking-tight">Etiket Teknik Özellikleri</h2>
              </div>
              <ul className="space-y-4">
                {[
                  { label: "Baskı Yüzeyi", value: "Tek taraflı CMYK renkli baskı (Arka yüzey silikonlu taşıyıcı kağıt)" },
                  { label: "Malzeme Türü", value: "90 gr Kuşe Çıkartma veya Neme Dayanıklı PP Opak Plastik / Şeffaf Film" },
                  { label: "Ebat & Kesim", value: "Düz kesim, dairesel, oval veya logonun formuna özel bıçak kesimi. Özel kesim talepleri işin ölçüsü ve tasarımına göre teklif aşamasında değerlendirilir." },
                  { label: "Yüzey Koruma", value: "Sürtünmeye karşı Parlak veya Mat Koruyucu Selefon Kaplama" },
                  { label: "Kesim Tipi", value: "Kiss-Cut (taşıyıcıdan kolay soyulabilir yarım kesim) veya Tabaka Kesim" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary shrink-0 mt-1" size={18} />
                    <p className="text-sm md:text-base font-bold text-black">
                      <span className="text-primary font-black">{item.label}:</span> {item.value}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-red-50 p-8 rounded-[32px] border border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="text-red-600" size={26} />
                <h2 className="text-2xl font-black text-red-700 uppercase tracking-tight">Etikette Sık Yapılan 5 Teknik Hata</h2>
              </div>
              <ul className="space-y-4">
                {[
                  { title: "Nemli Yüzeyde Kağıt Etiket Kullanımı", desc: "Sıvı veya şampuan ambalajlarında Kuşe Etiket seçilerek ıslanıp yırtılmasına sebep olunması." },
                  { title: "CMYK Çoklu Renk Barkod Hazırlığı", desc: "Barkodların CMYK karışımı yapılması (Barkodlar okuyucu hassasiyeti için tercihen %100 K Siyah hazırlanmalıdır)." },
                  { title: "Bıçak Taşma Payı (Bleed) Bırakılmaması", desc: "Kesim çizgisinde +2 mm taşma payı bırakılmayıp bıçak kaymasında kenarlarda beyaz boşluk kalması." },
                  { title: "Küçük Tipografi & Font Boyutu", desc: "Arka etiket içindekiler metninde 6 pt altı font kullanılarak okunabilirliğin kaybedilmesi." },
                  { title: "Yüzeye Uygun Olmayan Yapışkan Tercihi", desc: "Tutunması zor ambalajlarda yapışkan türü uygulama yüzeyi ve kullanım koşullarına göre belirlenmelidir." }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0" />
                    <p className="text-sm md:text-base font-bold text-red-950">
                      {item.title} <span className="text-red-700 font-medium block text-xs mt-0.5">→ {item.desc}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* TEKNİK TASARIM REHBERİ */}
          <section className="bg-slate-900 text-white p-8 md:p-12 rounded-[32px]">
            <div className="flex items-center gap-3 mb-8">
              <Scissors className="text-primary shrink-0" size={32} />
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Etiket Baskı İçin Teknik Tasarım Rehberi
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <div className="text-primary font-black text-lg mb-2">01. Güvenli Alan</div>
                <p className="text-gray-300 text-xs md:text-sm font-medium leading-relaxed">
                  Metin, logo ve kritik görseller bıçak çizgisinden en az <strong>2 mm içeride</strong> yer almalıdır.
                </p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <div className="text-primary font-black text-lg mb-2">02. Taşma Payı (Bleed)</div>
                <div className="text-gray-300 text-xs md:text-sm font-medium leading-relaxed">
                  Tasarım zemin rengi ve desenleri kesim bıçağının dışına en az <strong>+2 mm taşırılmalıdır</strong>.
                </div>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <div className="text-primary font-black text-lg mb-2">03. Barkod &amp; QR Kod</div>
                <p className="text-gray-300 text-xs md:text-sm font-medium leading-relaxed">
                  Barkodlar tercihen <strong>%100 K Siyah</strong> vektörel; QR kodlar ise yüksek zemin kontrastı ve en az <strong>4 modül sessiz alanla</strong> eklenmelidir.
                </p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <div className="text-primary font-black text-lg mb-2">04. Çözünürlük &amp; Renk</div>
                <p className="text-gray-300 text-xs md:text-sm font-medium leading-relaxed">
                  Baskı dosyaları <strong>300 DPI çözünürlükte</strong> ve <strong>CMYK renk modunda</strong> vektörel PDF hazırlanmalıdır.
                </p>
              </div>
            </div>
          </section>

          {/* 6 ADIMDA BASKI VE SİPARİŞ SÜRECİ */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="text-primary shrink-0" size={28} />
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                Etiket Baskı ve Sipariş Süreci
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { step: "1", title: "Dosya & Kontrol", desc: "Baskıya hazır dosyanız kesim ve taşma paylarına göre ücretsiz kontrol edilir." },
                { step: "2", title: "Dijital Prova", desc: "PDF prova onayınız alınmadan baskıya geçilmez." },
                { step: "3", title: "CTP & Baskı", desc: "CMYK renk modunda hassas ofset veya dijital baskı gerçekleştirilir." },
                { step: "4", title: "Selefon Kaplama", desc: "Koruyucu mat veya parlak selefon uygulaması yapılır." },
                { step: "5", title: "Hassas Kesim", desc: "Kiss-cut yarım kesim veya tabaka kesim uygulanır." },
                { step: "6", title: "Paket & Teslim", desc: "Üretim ve teslim süresi ürün, adet, malzeme ve onay sürecine göre teklif aşamasında paylaşılır." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative pt-8">
                  <span className="absolute -top-3 left-4 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center font-black text-xs shadow-md">
                    {item.step}
                  </span>
                  <h3 className="font-black text-black text-sm mb-1.5">{item.title}</h3>
                  <p className="text-xs text-gray-550 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* KAPSAMLI SIKÇA SORULAN SORULAR (SSS - 16 Soru) */}
          <section className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-10 scroll-mt-24" id="faq">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="text-primary shrink-0" size={30} />
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                Etiket Baskı Hakkında Sıkça Sorulan Sorular (SSS)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              {ETIKET_FAQS.map((faq, index) => (
                <div 
                  key={index} 
                  className="h-full bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-black text-black text-xs md:text-sm mb-3 flex items-start gap-2.5">
                      <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />
                      <span className="leading-snug">{faq.q}</span>
                    </h3>
                    <div className="h-px bg-gray-100 mb-3 w-full" />
                    <p className="text-gray-650 text-xs md:text-sm font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* İLGİLİ DİĞER ÜRÜNLER */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">
              Kurumsal Ambalaj Ve Tanıtım Ürünleri
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Karton Kutu Baskı", desc: "Özel kesimli ambalaj ve ürün kutuları.", path: "/kutu" },
                { title: "Karton Çanta", desc: "Lüks ipli kurumsal mağaza çantaları.", path: "/karton-canta" },
                { title: "Broşür Baskı", desc: "Ürün ve hizmet tanıtım broşürleri.", path: "/brosur" },
                { title: "Kartvizit Baskı", desc: "Kurumsal ilk izlenim kartvizitleri.", path: "/kartvizit" }
              ].map((product, idx) => (
                <Link key={idx} to={product.path} className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-primary transition-all">
                  <h3 className="text-lg font-black text-black mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                  <p className="text-sm font-medium text-gray-500">{product.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <RelatedBlogPosts category="etiket" />
        </div>
      </div>
    </div>
  );
};
