import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronRight, 
  ShoppingCart,
  CheckCircle2,
  Package,
  FileCheck,
  MapPin,
  Truck,
  HelpCircle,
  Sparkles,
  MessageCircle,
  Phone,
  FileText,
  Layers,
  ShieldCheck,
  AlertCircle,
  UserCheck,
  Calendar,
  Settings,
  Palette,
  Check,
  Clock,
  ArrowRight,
  Image as ImageIcon
} from 'lucide-react';
import { useCart, FireWarning, AgencyDiscountCTA, FeatureTooltip } from '../App';
import { AMBALAJ_DATA } from '../data/productData';
import { 
  AMBALAJ_SEO_METADATA, 
  AMBALAJ_PRODUCTS, 
  AMBALAJ_TECH_SPECS, 
  AMBALAJ_PRICE_FACTORS, 
  AMBALAJ_FILE_PREP_STEPS, 
  AMBALAJ_CONSIDERATIONS, 
  AMBALAJ_RELATED_PRODUCTS, 
  AMBALAJ_FAQS, 
  AMBALAJ_BLOG_GUIDES, 
  AMBALAJ_SCHEMAS 
} from '../data/ambalajPageContent';

export const AmbalajPage = () => {
  const { openProductDetail } = useCart();

  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Ambalaj");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>{AMBALAJ_SEO_METADATA.title}</title>
        <meta name="description" content={AMBALAJ_SEO_METADATA.desc} />
        <link rel="canonical" href={AMBALAJ_SEO_METADATA.canonical} />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={AMBALAJ_SEO_METADATA.canonical} />
        <meta property="og:site_name" content="Mavi Basım Matbaa & Reklam" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:title" content={AMBALAJ_SEO_METADATA.title} />
        <meta property="og:description" content={AMBALAJ_SEO_METADATA.ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={AMBALAJ_SEO_METADATA.ogImage} />
        <meta property="og:image:secure_url" content={AMBALAJ_SEO_METADATA.ogImage} />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="500" />
        <meta property="og:image:alt" content="Mavi Basım baskılı ambalaj kâğıdı, sülfit ve pelür kâğıt örnekleri" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={AMBALAJ_SEO_METADATA.title} />
        <meta name="twitter:description" content={AMBALAJ_SEO_METADATA.desc} />
        <meta name="twitter:image" content={AMBALAJ_SEO_METADATA.ogImage} />
        <link rel="preload" as="image" href="/images/ambalaj/ambalaj-baski-cozumleri.webp" fetchPriority="high" />
        <script type="application/ld+json">{JSON.stringify(AMBALAJ_SCHEMAS.breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(AMBALAJ_SCHEMAS.serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(AMBALAJ_SCHEMAS.faqSchema)}</script>
      </Helmet>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 animate-in fade-in duration-500">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link to="/matbaa" className="hover:text-primary transition-colors">Matbaa Ürünleri</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-black font-bold">Ambalaj Baskı</span>
        </nav>

        {/* Page Title & Subtitle */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-full transition-colors shrink-0" aria-label="Ana Sayfaya Dön">
              <ChevronRight size={20} className="rotate-180 text-secondary" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-black">
                {AMBALAJ_SEO_METADATA.h1}
              </h1>
              <p className="text-xs md:text-sm font-medium text-gray-600 mt-1">
                {AMBALAJ_SEO_METADATA.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges / Value Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Package size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-black">Farklı Kâğıt &amp; Ölçüler</p>
              <p className="text-xs text-gray-600 mt-0.5">Sülfit, 135 gr kuşe ve pelür kâğıt seçenekleri</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <FileCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-black">Dosya Kontrolü &amp; Prova</p>
              <p className="text-xs text-gray-600 mt-0.5">Baskı öncesi dijital PDF prova onayı</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-black">Topkapı Koordinasyon</p>
              <p className="text-xs text-gray-600 mt-0.5">2. Matbaacılar Sitesi hizmet noktamız</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-black">Türkiye Geneline Gönderim</p>
              <p className="text-xs text-gray-600 mt-0.5">Anlaşmalı kargo ile korunaklı paketleme</p>
            </div>
          </div>
        </div>

        {/* Hero & Editorial Intro Section */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-100 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                <Sparkles size={14} />
                Kurumsal Paketleme ve Sarım Malzemeleri
              </span>
              <p className="text-xl md:text-2xl lg:text-3xl font-black text-black uppercase tracking-tight">
                Markanıza Özel Baskılı Ambalaj ve Sarım Çözümleri
              </p>
              <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-3">
                <p>
                  Müşterilerinize sunduğunuz ürünlerin paketlenmesi ve sarımı, markanızın kurumsal algısını doğrudan şekillendiren ilk temas noktasıdır. <strong>Ambalaj kâğıdı baskısı</strong>, <strong>baskılı sarım kâğıdı</strong>, <strong>sülfit kâğıt</strong>, <strong>kuşe ambalaj kâğıdı</strong> ve <strong>butik pelür kâğıdı</strong> seçeneklerimiz; kurumsal kimliğinizi ve ürün sunumunuzu öne çıkarır. Ambalaj baskı seçenekleri; markaya özel baskılı ambalaj kâğıdı, paketleme kâğıdı ve farklı ürün sarım ihtiyaçlarına göre değerlendirilen kâğıt seçeneklerini kapsar.
                </p>
                <p>
                  Tekstil mağazalarından restoranlara, butik işletmelerden e-ticaret markalarına kadar her sektörün sarım ihtiyacı farklıdır. Butik giyim ve ayakkabı markaları için <strong>baskılı pelür kâğıdı</strong> esnek bir sarım sağlarken, restoran paket servislerinde <strong>70 gr sülfit ambalaj kâğıdı</strong> pratik bir sarım seçeneği sunar. Ürünlerinizin yanında kullanabileceğiniz tamamlayıcı <Link to="/karton-canta" className="text-primary font-bold hover:underline">karton çanta çözümlerimizi</Link> ve <Link to="/kutu" className="text-primary font-bold hover:underline">kutu baskı hizmetlerimizi</Link> inceleyerek bütünsel bir paketleme deneyimi oluşturabilirsiniz.
                </p>
                <p>
                  Siparişleriniz, <strong>İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktamız</strong> üzerinden titizlikle planlanarak Türkiye geneline anlaşmalı kargo firmalarıyla sevk edilmektedir.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-3 flex-wrap">
                <a 
                  href="https://wa.me/905366022373?text=Merhaba,%20ambalaj%20kağıdı%20baskısı%20hakkında%20bilgi%20ve%20fiyat%20teklifi%20almak%20istiyorum." 
                  target="_blank" 
                  rel="nofollow noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white font-bold rounded-xl text-xs md:text-sm hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp ile Ambalaj Teklifi Al</span>
                </a>
                <a 
                  href="tel:+905366022373" 
                  className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white font-bold rounded-xl text-xs md:text-sm hover:bg-secondary transition-colors shadow-sm"
                >
                  <Phone size={16} />
                  <span>0536 602 23 73</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-slate-100">
                <img 
                  src="/images/ambalaj/ambalaj-baski-cozumleri.webp" 
                  alt="Ambalaj kâğıdı baskısı, sülfit ve pelür sarım çözümleri" 
                  className="w-full h-auto object-cover"
                  loading="eager"
                  fetchPriority="high"
                  width={800}
                  height={500}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: H2 - Baskılı Ambalaj Kâğıdı Seçenekleri ve Malzemeler */}
        <section id="secenekler" className="space-y-6 mb-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                Baskılı Ambalaj Kâğıdı Seçenekleri ve Malzemeler
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                70 gr sülfit ambalaj kâğıdı, 135 gr kuşe ve 30 gr pelür sarım kâğıdı seçenekleri
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AMBALAJ_PRODUCTS.map((prod, index) => {
              const productDataMatch = AMBALAJ_DATA[index] || AMBALAJ_DATA[0];
              return (
                <div key={prod.code} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                      {prod.image ? (
                        <img 
                          src={prod.image} 
                          alt={prod.imgAlt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                          width={600}
                          height={400}
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          data-placeholder="true"
                          data-image-placeholder="true"
                          data-placeholder-number={index + 1}
                          className="w-full h-full border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-4 text-center bg-slate-50/90"
                        >
                          <div className="w-8 h-8 rounded-full bg-slate-200/80 text-slate-500 flex items-center justify-center mb-1.5 shrink-0">
                            <ImageIcon size={18} />
                          </div>
                          <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                            GÖRSEL {index + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-800 line-clamp-1 mt-0.5 px-2">
                            {prod.name}
                          </span>
                          <span className="text-[10px] text-slate-400 mt-0.5">
                            WebP görseli daha sonra eklenecek
                          </span>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-black/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
                        {prod.code} • {prod.gramaj}
                      </span>
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-black text-black">{prod.name}</h3>
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        {prod.desc}
                      </p>
                      <ul className="text-xs text-gray-700 space-y-1.5 pt-2 border-t border-gray-100">
                        {prod.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-primary shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <button 
                      onClick={() => openWhatsApp(productDataMatch)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2.5 rounded-xl text-xs md:text-sm font-black transition-all shadow-sm cursor-pointer"
                    >
                      <ShoppingCart size={15} />
                      <span>Teklif ve Bilgi Al</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Standard Price List Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-6">
            <div className="p-4 bg-slate-50 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-sm text-black">Standart Ambalaj Baskı Seçenekleri ve Paketleri</h3>
              <span className="text-xs text-gray-500">KDV ve Kargo Hariçtir</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="p-3.5 w-24 font-bold text-center border-r border-white/10">KOD</th>
                    <th className="p-3.5 text-left font-bold border-r border-white/10">ÜRÜN VE KÂĞIT ÖZELLİĞİ</th>
                    <th className="p-3.5 w-32 font-bold text-center border-r border-white/10">STANDART MİKTAR</th>
                    <th className="p-3.5 w-36 font-bold text-center border-r border-white/10">FİYAT</th>
                    <th className="p-3.5 w-40 font-bold text-center">BİLGİ &amp; SİPARİŞ</th>
                  </tr>
                </thead>
                <tbody>
                  {AMBALAJ_DATA.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-primary/5 transition-all">
                      <td className="p-3.5 text-center font-bold text-black border-r border-gray-100">
                        {item.code}
                      </td>
                      <td className="p-3.5 font-medium text-black border-r border-gray-100">
                        <div className="flex items-center gap-2">
                          <span>{item.desc}</span>
                          <FeatureTooltip code={item.code} />
                        </div>
                      </td>
                      <td className="p-3.5 text-center font-bold text-black border-r border-gray-100">
                        {item.miktar}
                      </td>
                      <td className="p-3.5 text-center font-black text-black border-r border-gray-100">
                        {item.price}
                      </td>
                      <td className="p-3.5 text-center">
                        <button 
                          onClick={() => openWhatsApp(item)}
                          className="inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-secondary text-white px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <ShoppingCart size={13} />
                          <span>Fiyat &amp; Bilgi</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4">
            <FireWarning />
          </div>
        </section>

        {/* Section 2: H2 - Sülfit, Kuşe ve Pelür Kâğıt Karşılaştırması */}
        <section id="malzeme-karsilastirmasi" className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-sm space-y-6 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight flex items-center gap-3">
                <Layers size={24} className="text-primary shrink-0" />
                <span>Sülfit, Kuşe ve Pelür Kâğıt Karşılaştırması</span>
              </h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Ambalaj kâğıdında malzeme seçimi, sarılacak ürünün fiziksel özelliklerine, ağırlığına, nem ve yağ durumuna göre titizlikle belirlenmelidir. Kullanım alanına göre kâğıt türü, gramaj, ebat, renk seçenekleri ve adet/kilogram miktarı dengelenmelidir.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-black text-sm mb-1 flex items-center gap-2">
                    <Check size={16} className="text-primary" /> Kâğıt Türü ve Gramaj
                  </h3>
                  <p className="text-xs text-gray-600">
                    70 gr sülfit kâğıt ekonomik sarımlar için, 135 gr kuşe parlak sunumlar için, 30 gr pelür ise hafif ve zarif kutu içi sarımlar için kullanılır.
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-black text-sm mb-1 flex items-center gap-2">
                    <Check size={16} className="text-primary" /> Baskı Renk Seçenekleri
                  </h3>
                  <p className="text-xs text-gray-600">
                    Tek renk veya çift renk kurumsal logo baskısının yanı sıra 4 renk CMYK ofset ve özel Pantone spot renk ayrımı uygulanabilmektedir.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-slate-100">
                <img 
                  src="/images/ambalaj/ambalaj-kagit-ve-malzemeleri.webp" 
                  alt="Ambalaj kağıdı ve sarım malzemesi özellikleri" 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>

          {/* Teknik Karşılaştırma Tablosu */}
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-base md:text-lg font-bold text-black mb-3">
              Kâğıt Türleri Teknik Özellikleri
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-black border-b border-slate-300">
                    <th className="p-3 font-bold">Kâğıt Türü</th>
                    <th className="p-3 font-bold">Gramaj</th>
                    <th className="p-3 font-bold">Standart Ebat</th>
                    <th className="p-3 font-bold">Öne Çıkan Kullanım Alanı</th>
                    <th className="p-3 font-bold">Baskı Türü</th>
                    <th className="p-3 font-bold">Kullanım &amp; Gıda Özelliği</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-gray-700">
                  {AMBALAJ_TECH_SPECS.map((spec, sIdx) => (
                    <tr key={sIdx} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-black">{spec.kagitTuru}</td>
                      <td className="p-3">{spec.gramaj}</td>
                      <td className="p-3">{spec.standartEbat}</td>
                      <td className="p-3">{spec.kullanimAlani}</td>
                      <td className="p-3">{spec.baskiTuru}</td>
                      <td className="p-3 font-medium text-slate-700">{spec.gidaOzelligi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: H2 - Ambalaj Kâğıdı Baskı Fiyatlarını Belirleyen Unsurlar */}
        <section id="fiyat-unsurlari" className="bg-slate-50/90 rounded-3xl p-6 sm:p-10 border border-slate-200/80 space-y-6 mb-14">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight flex items-center gap-3">
              <Settings size={24} className="text-primary shrink-0" />
              <span>Ambalaj Kâğıdı Baskı Fiyatlarını Belirleyen Unsurlar</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              Ambalaj kâğıdı fiyatları ve ambalaj kâğıdı baskı fiyatları; ölçü, kâğıt türü, gramaj, renk sayısı, sipariş miktarı ve sonlandırma özelliklerine göre değişir.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AMBALAJ_PRICE_FACTORS.map((factor) => (
              <div key={factor.id} id={factor.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {factor.num}
                </div>
                <h3 className="font-bold text-black text-sm">{factor.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {factor.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: H2 - Baskıya Hazır Dosya Hazırlığı ve PDF Prova Onayı */}
        <section id="dosya-ve-prova" className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-100 shadow-sm space-y-6 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight flex items-center gap-3">
                <FileCheck size={24} className="text-primary shrink-0" />
                <span>Baskıya Hazır Dosya Hazırlığı ve PDF Prova Onayı</span>
              </h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Tasarım dosyanız baskı öncesi teknik kontrollerden geçirilir. <strong>Baskıya hazır dosya kontrolü ve dijital PDF prova</strong> hizmetimiz kapsamında çözünürlük (en az 300 DPI), CMYK renk modu, 3 mm taşma payı ve font convert kontrolleri yapılır. Dijital PDF prova; metin, ölçü, taşma payı ve yerleşimin ekran üzerinden kontrol edilmesini sağlar. Fiziksel baskı rengini, kâğıt dokusunu veya nihai ürünü birebir garanti etmez. Baskıya hazır dosyanın teknik kontrolü ile sıfırdan grafik tasarım farklı hizmetlerdir. Sıfırdan tasarım ve kapsamlı revizyonlar ayrıca fiyatlandırılabilir. Baskı süreci, dijital PDF prova ve müşteri onay aşamasından sonra planlanır.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {AMBALAJ_FILE_PREP_STEPS.map((st, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-150">
                    <h3 className="font-bold text-black text-xs md:text-sm">{st.num}. {st.title}</h3>
                    <p className="text-[11px] text-gray-600 mt-0.5">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-slate-100">
                <img 
                  src="/images/ambalaj/ambalaj-baski-pdf-prova.webp" 
                  alt="Baskı öncesi grafik kontrolü ve dijital PDF prova süreci" 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: H2 - Ambalaj Kâğıdı Kullanımında Dikkat Edilmesi Gerekenler */}
        <section id="dikkat-edilecekler" className="bg-slate-50/80 p-6 sm:p-10 rounded-3xl border border-slate-200/80 space-y-6 mb-14">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight flex items-center gap-3">
              <ShieldCheck size={26} className="text-primary shrink-0" />
              <span>Ambalaj Kâğıdı Kullanımında Dikkat Edilmesi Gerekenler</span>
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Doğru ürün tercihi, renk uyumu ve kullanım amacına uygun teknik yönlendirmeler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AMBALAJ_CONSIDERATIONS.map((item) => (
              <div key={item.id} id={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-base">
                  {item.id === 'dikkat-gida' && <AlertCircle size={20} className="shrink-0" />}
                  {item.id === 'dikkat-kesim' && <FileCheck size={20} className="shrink-0" />}
                  {item.id === 'dikkat-renk' && <Palette size={20} className="shrink-0" />}
                  {item.id === 'dikkat-sarim' && <Package size={20} className="shrink-0" />}
                  <h3 className="font-bold text-black text-sm md:text-base">{item.title}</h3>
                </div>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: H2 - Ambalaj Kâğıdı Baskısını Tamamlayan İlgili Ürünler */}
        <section id="ilgili-baski-urunleri" className="space-y-6 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-2">
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                Ambalaj Kâğıdı Baskısını Tamamlayan İlgili Ürünler
              </h2>
              <p className="text-xs md:text-sm text-gray-600">
                Ambalaj kâğıdı siparişlerinizle birlikte ürün sunumu ve kurumsal paketleme bütünlüğü sağlayan diğer matbaa baskı ürünlerimiz
              </p>
            </div>
            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-slate-100">
                <img 
                  src="/images/ambalaj/ambalaj-baski-urunleri.webp" 
                  alt="Ambalaj baskısını tamamlayan kurumsal matbaa ürünleri" 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {AMBALAJ_RELATED_PRODUCTS.map((product, idx) => (
              <Link 
                key={idx} 
                to={product.path} 
                className="group bg-white p-5 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold text-black mb-1.5 group-hover:text-primary transition-colors flex items-center justify-between">
                    <span>{product.title}</span>
                    <ChevronRight size={14} className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{product.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 7: H2 - Sıkça Sorulan Sorular */}
        <section id="sikca-sorulan-sorular" className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-100 shadow-sm space-y-6 mb-14 scroll-mt-24">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <HelpCircle size={22} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Sıkça Sorulan Sorular
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Ambalaj kâğıdı baskısı, kâğıt seçenekleri, minimum sipariş miktarı, PDF prova ve teslimat süreçleri hakkında merak edilenler
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 items-stretch">
            {AMBALAJ_FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                id={`faq-${idx + 1}`}
                className="h-full border border-gray-200 rounded-2xl bg-white p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-sm md:text-base text-black mb-2 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                    <span>{faq.q}</span>
                  </h3>
                  <div className="h-px bg-gray-100 my-2.5 w-full" />
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: İlgili Rehberler (Curated for Ambalaj) */}
        <section id="ilgili-rehberler" className="my-10 space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Teknik Bilgi &amp; İpuçları</p>
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Matbaa ve Baskı Hazırlık Rehberleri
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              Baskıya uygun tasarım hazırlığı, renk yönetimi ve kâğıt seçimleri hakkında uzman teknik makalelerimiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {AMBALAJ_BLOG_GUIDES.map((guide, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                    <img
                      src={guide.image}
                      alt={`${guide.title} - Mavi Basım Matbaa Rehberi`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {guide.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-400 text-[11px] font-bold mb-2">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {guide.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-slate-800 group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                    <Link
                      to={`/blog/${guide.slug}`}
                      className="hover:underline"
                    >
                      {guide.title}
                    </Link>
                  </h3>

                  <p className="text-slate-500 text-xs font-semibold line-clamp-2 leading-relaxed mb-4">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 bg-slate-100/80 px-2 py-1 rounded-md">
                    <UserCheck size={12} className="text-primary shrink-0" />
                    <span>Mavi Basım Teknik Ekibi</span>
                  </span>
                  <Link
                    to={`/blog/${guide.slug}`}
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

        {/* Author & Last Modified Badge */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 mb-8">
          <div className="flex items-center gap-2.5">
            <UserCheck size={18} className="text-primary" />
            <span>Bu içerik <strong>Mavi Basım Teknik ve Baskı Öncesi Ekibi</strong> tarafından hazırlanmıştır.</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar size={15} />
            <span>Son Güncelleme: <strong>21 Ağustos 2026</strong></span>
          </div>
        </div>

        {/* Triple CTA */}
        <div className="bg-gradient-to-br from-slate-900 via-black to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
              Özel Ebat veya Yüksek Tiraj Ambalaj Talepleriniz mi Var?
            </p>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              Standart seçeneklerimizin yanı sıra firmanıza özel gramaj, Pantone renk ve özel ebat kesimli ambalaj siparişleriniz için dilediğiniz kanaldan hemen bilgi alın.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a 
                href="https://wa.me/905366022373?text=Merhaba,%20ambalaj%20kağıdı%20baskısı%20hakkında%20bilgi%20ve%20fiyat%20teklifi%20almak%20istiyorum." 
                target="_blank" 
                rel="nofollow noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-full text-sm transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Destek</span>
              </a>
              <a 
                href="tel:+905366022373" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white font-bold px-6 py-3.5 rounded-full text-sm transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                <Phone size={18} />
                <span>0536 602 23 73</span>
              </a>
              <button 
                onClick={() => openWhatsApp(AMBALAJ_DATA[0])}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3.5 rounded-full text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <FileText size={18} />
                <span>Teklif Formu &amp; Bilgi</span>
              </button>
            </div>
          </div>
        </div>

        <AgencyDiscountCTA />
      </div>
    </div>
  );
};

export default AmbalajPage;
