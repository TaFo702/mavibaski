import React, { useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  CheckCircle, 
  HelpCircle, 
  ArrowRight, 
  PhoneCall, 
  Award, 
  FileText, 
  ShieldCheck, 
  Briefcase, 
  Clock, 
  Truck,
  Utensils,
  Home as HomeIcon,
  Coffee,
  PlusCircle,
  Sprout,
  MapPin,
  Layers,
  Tag
} from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_LINK } from '../constants/contact';
import { SEO_PAGES_DATA, SEOPageData } from '../data/seoPagesData';

export { SEO_PAGES_DATA };
export type { SEOPageData };

// Sektörel Semantic Hub / Cluster Veritabanı
const CLUSTERS: Record<string, {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  parentPath: string;
  siblings: { path: string; text: string }[];
  popularPrints: { path: string; text: string; spec: string }[];
}> = {
  RESTORAN: {
    name: "Restoran & Lokanta Baskıları",
    icon: Utensils,
    parentPath: "/sektor/restoran-brosur-baski",
    siblings: [
      { path: "/restoran-brosur-baski", text: "Restoran Broşür & Menü" },
      { path: "/restoran-magnet-baski", text: "Restoran Magnet Çözümleri" },
      { path: "/restaurant-siparis-fisi", text: "Restoran Sipariş Fişi" },
      { path: "/lokanta-amerikan-servis", text: "Lokanta Amerikan Servis" },
      { path: "/samsun-restoran-brosur-baski", text: "Samsun Restoran Broşürü" },
      { path: "/bitlis-restaurant-siparis-fisi", text: "Bitlis Restoran Sipariş Fişi" },
      { path: "/rize-lokanta-amerikan-servis", text: "Rize Lokanta Servis Kağıdı" }
    ],
    popularPrints: [
      { path: "/brosur", text: "Kuşe Tanıtım Broşürleri", spec: "135 Gr Parlak Kuşe, Çift Kırım Pilyajlı" },
      { path: "/magnet", text: "Oval Kesim Dolap Magneti", spec: "0.40 Mm Mıknatıs, Parlak Selefon Sıvamalı" },
      { path: "/amerikan-servis", text: "Logolu Amerikan Servis", spec: "80 Gr 1. Hamur, Gıda Onaylı Organik Boya" },
      { path: "/kataloglar", text: "Ciltli Kalın Restoran Menüsü", spec: "300 Gr Bristol, Spiral ve Mat Lak Sıvama" },
      { path: "/karton-canta", text: "Logolu Paket Servis Çantası", spec: "Kraft Kağıt, V-Dip Mukavemet Takviyeli" }
    ]
  },
  EMLAK: {
    name: "Temizlik & Emlak Baskıları",
    icon: HomeIcon,
    parentPath: "/sektor/emlakci-kartvizit-baski",
    siblings: [
      { path: "/emlakci-kartvizit", text: "Emlakçı Prestij Kartvizit" },
      { path: "/emlak-afis-baski", text: "Emlak Branda Afişi" },
      { path: "/hali-koltuk-yikama-baski", text: "Halı ve Koltuk Yıkama" },
      { path: "/antalya-emlakci-kartvizit-baski", text: "Antalya Emlakçı Kartvizit" },
      { path: "/erzurum-emlakci-katalog-baski", text: "Erzurum Emlakçı Kataloğu" },
      { path: "/kayseri-emlakci-afis-baski", text: "Kayseri Emlakçı Afiş Baskı" }
    ],
    popularPrints: [
      { path: "/kartvizit", text: "Lüks Kabartmalı Kartvizit", spec: "350 Gr Bristol, Mat Kadife Selefon, Kısmi Lak" },
      { path: "/afis", text: "Dış Mekan Satılık Brandası", spec: "440 Gr Avrupa Döküm Vinil, Kuşgözü Halkalı" },
      { path: "/kataloglar", text: "Lüks Gayrimenkul Kataloğu", spec: "170 Gr Mat Kuşe İç, Lüks Amerikan Ciltleme" },
      { path: "/dosyalar", text: "Kurumsal Bloknot & Dosya", spec: "350 Gr Bristol Cepli Dosya, Kabartma Laklı" }
    ]
  },
  KUAFOR: {
    name: "Ambalaj & Fast Food Baskıları",
    icon: Layers,
    parentPath: "/sektor/fast-food-cips-kutusu-baski",
    siblings: [
      { path: "/fast-food-cips-kutusu", text: "Fast Food Cips Kutusu" },
      { path: "/fast-food-kampanya-brosuru", text: "Fast Food Kampanya Broşürü" },
      { path: "/giresun-fast-food-cips-kutusu-baski", text: "Giresun Cips Kutusu" }
    ],
    popularPrints: [
      { path: "/kutu", text: "Logolu Cips Kutusu", spec: "Gıda Temas Onaylı Karton, Nem Delikli" },
      { path: "/el-ilani", text: "Restoran El İlanı", spec: "115 Gr Ekonomik Parlak Kuşe, Full Renkli" },
      { path: "/etiket", text: "Paket Servis Etiketi", spec: "Kuşe Yapışkanlı Etiket, Sıcaklığa Dayanıklı" }
    ]
  },
  KAFE: {
    name: "Kafe & Coffee Shop Baskıları",
    icon: Coffee,
    parentPath: "/sektor/kafe-menu-baski",
    siblings: [
      { path: "/kafe-menu-baski", text: "Kafe Klasik Menü Baskısı" },
      { path: "/amerikan-servis", text: "Logolu Kafe Servis Kağıdı" },
      { path: "/trabzon-kafe-menu-baski", text: "Trabzon Kafe Menü Baskı" }
    ],
    popularPrints: [
      { path: "/amerikan-servis", text: "Kişiselleştirilmiş Servis Örtüsü", spec: "80 Gr Hamur Kağıt, Akma Yapmaz Su Mürekkebi" },
      { path: "/kutu", text: "Sıcak Kruvasan / Kurabiye Kutusu", spec: "Gıda Kartonu, Gözenekli Isı Tahliye Delikli" },
      { path: "/etiket", text: "Bardak & Paket Yapıştırma Etiketi", spec: "Kuşe Yapışkanlı Etiket, Akrilik Özel Zamklı" }
    ]
  },
  ECZANE: {
    name: "Eczane & Sağlık Sektörü Baskıları",
    icon: PlusCircle,
    parentPath: "/sektor/eczane-el-ilani-baski",
    siblings: [
      { path: "/sektor/eczane-el-ilani-baski", text: "Dönerci El İlanı Çözümü" },
      { path: "/gebze-eczane-etiket-baski", text: "Gebze Eczane Etiketi" }
    ],
    popularPrints: [
      { path: "/etiket", text: "Eczane İlaç Tarifi Etiketleri", spec: "Rulo Termal Etiket, Hızlı Yapışan Güçlü Yapışkan" },
      { path: "/el-ilani", text: "Nöbetçi Eczane & Sağlık İlanları", spec: "115 Gr Mat Kuşe, Parlak Renk Hassasiyeti" },
      { path: "/zarf", text: "Eczane Reçete Zarfları", spec: "110 Gr Birinci Sınıf Beyaz Zarf Birleştirme" }
    ]
  },
  FINDIK: {
    name: "Fındık Sanayii & Tarım Baskıları",
    icon: Sprout,
    parentPath: "/ordu-findik-firmasi-katalog-baski",
    siblings: [
      { path: "/ordu-findik-firmasi-katalog-baski", text: "Ordu Fındık Firması Kataloğu" }
    ],
    popularPrints: [
      { path: "/kataloglar", text: "İhracat Görsel Kataloğu", spec: "170 Gr Parlak Kuşe, Gofreli Kabartmalı Kapak" },
      { path: "/kutu", text: "Lüks Hediyelik Fındık Kutusu", spec: "300 Gr Bristol Karton, İç Bölmeli Pilyajlı" },
      { path: "/etiket", text: "Hasat ve Sevkiyat Etiketi", spec: "Lamine Termal Sökülmez Barkod Etiketi" }
    ]
  }
};

const getProductPagePath = (key: string): string => {
  const k = key.toLowerCase();
  
  if (k.includes('kartvizit')) return '/kartvizit';
  if (k.includes('brosur') || k.includes('broşür')) return '/brosur';
  if (k.includes('magnet')) return '/magnet';
  if (k.includes('katalog')) return '/kataloglar';
  if (k.includes('kutu')) return '/kutu';
  if (k.includes('amerikan-servis')) return '/amerikan-servis';
  if (k.includes('etiket')) return '/etiket';
  if (k.includes('siparis-fisi') || k.includes('sipariş-fişi')) return '/makbuz-ve-formlar';
  if (k.includes('afis') || k.includes('afiş')) return '/afis';
  
  return '/matbaa';
};

export const SEOPages = () => {
  const { slug } = useParams<{ slug?: string }>();
  const location = useLocation();

  // URL'den veya slug'dan tam eşleşen SEO kaydı anahtarını çek
  const activeKey = useMemo(() => {
    const rawPath = location.pathname.startsWith('/') ? location.pathname : `/${location.pathname}`;
    const cleanSlug = slug || location.pathname.substring(1);
    
    return Object.keys(SEO_PAGES_DATA).find(key => 
      key === cleanSlug || 
      SEO_PAGES_DATA[key].path === rawPath ||
      SEO_PAGES_DATA[key].path === `/${cleanSlug}` ||
      SEO_PAGES_DATA[key].path === `/sektor/${cleanSlug}`
    ) || null;
  }, [slug, location.pathname]);

  const page = useMemo(() => {
    if (!activeKey) return null;
    return SEO_PAGES_DATA[activeKey];
  }, [activeKey]);

  // Sayfaya özel ait olduğu sektörel cluster'ı tespit et (Sorgu ve Link Graph kurumu için)
  const activeClusterKey = useMemo(() => {
    if (!activeKey) return null;
    const keyLower = activeKey.toLowerCase();
    if (keyLower.includes('restoran') || keyLower.includes('lokanta') || keyLower.includes('doner') || keyLower.includes('paket-servis') || keyLower.includes('siparis-fisi')) {
      return 'RESTORAN';
    }
    if (keyLower.includes('emlak') || keyLower.includes('afis') || keyLower.includes('katalog') && keyLower.includes('emlak') || keyLower.includes('hali-koltuk-yikama')) {
      return 'EMLAK';
    }
    if (keyLower.includes('kuafor') || keyLower.includes('guzellik') || keyLower.includes('salon') || keyLower.includes('cips-kutusu')) {
      return 'KUAFOR';
    }
    if (keyLower.includes('kafe') || keyLower.includes('bardak-altligi') || keyLower.includes('coaster')) {
      return 'KAFE';
    }
    if (keyLower.includes('eczane') || keyLower.includes('etiket')) {
      return 'ECZANE';
    }
    if (keyLower.includes('findik')) {
      return 'FINDIK';
    }
    return null;
  }, [activeKey]);

  const cluster = useMemo(() => {
    if (!activeClusterKey) return null;
    return CLUSTERS[activeClusterKey];
  }, [activeClusterKey]);

  // Şehri dynamic tespit et
  const detectedCity = useMemo(() => {
    if (!page) return 'TR';
    const cities = [
      'Samsun', 'Ordu', 'Trabzon', 'Rize', 'Gebze', 'Antalya', 'Giresun', 'Sinop', 'Bitlis', 'Erzurum', 'Kayseri', 'Adana', 'Malatya', 'Elazığ', 'Van', 'Konya', 'Ankara', 'Muğla', 'İstanbul'
    ];
    return cities.find(city => page.h1.toLowerCase().includes(city.toLowerCase())) || 'TR';
  }, [page]);

  if (!page) {
    return (
      <div className="bg-white min-h-screen py-24 flex flex-col items-center justify-center px-4">
        <Helmet>
          <title>404 Sayfa Bulunamadı | Mavi Basım</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <h1 className="text-4xl font-extrabold text-black mb-4">SEO Sayfası Bulunamadı</h1>
        <p className="text-gray-600 mb-8 max-w-md text-center">İlgili sektörel veya şehre özel SEO matbaa sayfamız henüz yayına girmemiştir.</p>
        <Link to="/" className="px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-black transition-colors">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDesc} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.metaDesc} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Banner Area */}
      <div className="bg-gradient-to-br from-neutral-900 via-black to-neutral-900 text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:30px_30px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        
        {/* Breadcrumb Navigation - Crawl Depth & Structure indicator */}
        <div className="max-w-4xl mx-auto mb-8 relative z-10">
          <nav className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400 tracking-wide bg-neutral-950/40 py-2 px-4 rounded-full w-fit mx-auto border border-neutral-800/50">
            <Link to="/" className="hover:text-primary transition-colors text-neutral-300">Ana Sayfa</Link>
            <span className="text-neutral-600">/</span>
            {cluster ? (
              <>
                <Link to={cluster.parentPath} className="hover:text-primary transition-colors text-neutral-300">{cluster.name}</Link>
                <span className="text-neutral-600">/</span>
              </>
            ) : null}
            <span className="text-primary font-bold truncated">{page.h1.substring(0, 30)}...</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="flex justify-center items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em]">
            <Award size={14} /> Mavi Basım Matbaa &amp; Reklam <Award size={14} />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase font-sans">
            {page.h1}
          </h1>
          <p className="text-primary text-lg sm:text-xl font-medium tracking-wide">
            {page.tagline}
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {page.intro}
          </p>
          <div className="pt-4">
            <Link 
              to={getProductPagePath(activeKey || "")} 
              className="inline-flex items-center gap-2 bg-primary text-black font-black uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl hover:scale-105"
            >
              🚀 {page.h1} Fiyatlarını Gör & Sipariş Ver →
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Factors Row */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-neutral-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="mx-auto w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Truck size={20} />
            </div>
            <p className="text-xs font-black text-black">81 İL HIZLI SEVKİYAT</p>
            <p className="text-[10px] text-gray-500">Güvenli Ambalajlı Kargo</p>
          </div>
          <div className="space-y-1">
            <div className="mx-auto w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <p className="text-xs font-black text-black">ARACISIZ DOĞRUDAN İMALAT</p>
            <p className="text-[10px] text-gray-500">Topkapı Matbaa Güvencesi</p>
          </div>
          <div className="space-y-1">
            <div className="mx-auto w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <CheckCircle size={20} />
            </div>
            <p className="text-xs font-black text-black">YÜKSEK ÇÖZÜNÜRLÜK (300 DPI)</p>
            <p className="text-[10px] text-gray-500">Renk Sapmasız Gerçek Ofset</p>
          </div>
          <div className="space-y-1">
            <div className="mx-auto w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Clock size={20} />
            </div>
            <p className="text-xs font-black text-black">EN UYGUN ONLINE FİYAT</p>
            <p className="text-[10px] text-gray-500">Doğru Fiyat &amp; Adet Dengesi</p>
          </div>
        </div>
      </div>

      {/* Main Copy Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Editorial Content */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-neutral-100 space-y-10">
            {page.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-center gap-2 border-b border-gray-100 pb-2">
                  <Briefcase size={20} className="text-primary shrink-0" />
                  {section.title}
                </h2>
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">
                    {para}
                  </p>
                ))}
              </section>
            ))}

            {/* Sektörel Tercih Edilen Ürün Baskı Tipleri (Vertical Linking) */}
            {cluster && (
              <div className="pt-8 border-t border-gray-100 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-black uppercase tracking-tight">
                      Bu Sektörde En Çok Tercih Edilen Baskı Tipleri
                    </h3>
                    <p className="text-xs font-medium text-gray-500 mt-0.5">Mavi Basım tarafından paketlenen ve imalatı tamamlanan tavsiye ürünler</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cluster.popularPrints.map((print, pIdx) => (
                    <Link 
                      key={pIdx} 
                      to={print.path} 
                      className="group p-5 bg-neutral-50 hover:bg-neutral-900 border border-neutral-100 hover:border-neutral-900 transition-all rounded-2xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-primary font-bold tracking-wider uppercase bg-primary/10 px-2 py-0.5 rounded-md group-hover:bg-primary group-hover:text-black">Matbaa Standardı</span>
                          <span className="text-[10px] text-neutral-400 group-hover:text-neutral-500 font-mono">300 DPI Ofset</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-extrabold text-neutral-950 group-hover:text-white transition-colors">
                          {print.text}
                        </h4>
                        <p className="text-xs text-neutral-500 group-hover:text-neutral-400 mt-2 font-medium">
                          {print.spec}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-primary mt-4 group-hover:text-primary-400">
                        Fiyat Listesini İncele <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Accordion Section */}
            <div className="pt-8 border-t border-gray-100 space-y-6">
              <h3 className="text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2">
                <HelpCircle size={24} className="text-primary" /> Sık Sorulan Sorular
              </h3>
              <div className="space-y-4">
                {page.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 space-y-2">
                    <h4 className="text-base sm:text-lg font-bold text-primary flex items-start gap-2">
                      <span className="text-black/30">Q.</span> {faq.question}
                    </h4>
                    <p className="text-gray-700 font-medium leading-relaxed pl-6 text-sm sm:text-base">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quick CTA & SEO Link Block */}
        <div className="lg:col-span-4 space-y-8">
          {/* Main Booking Panel */}
          <div className="bg-black text-white p-8 rounded-3xl border border-neutral-800 shadow-xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <FileText className="mx-auto text-primary mb-4" size={44} />
            <span className="text-xs text-primary font-bold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">Matbaa Teklif &amp; Sipariş</span>
            <h3 className="text-2xl font-black text-white mt-4 mb-3 uppercase tracking-tight">Hızlı Online İletişim</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed font-medium text-center">
              Sektörünüze özel el ilanı, broşür, magnet, kutu ve ambalaj siparişlerinizde en doğru matbaa fiyat teklifini saniyeler içinde WhatsApp üzerinden alın.
            </p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 w-full py-4 bg-primary text-white hover:bg-white hover:text-black transition-colors rounded-2xl font-black text-sm tracking-wide uppercase shadow-lg">
              <span className="flex items-center gap-2 justify-center">
                <PhoneCall size={18} /> WhatsApp Teklif Hattı
              </span>
              <span className="text-sm tracking-wider opacity-95 block font-bold">
                {PHONE_NUMBER}
              </span>
            </a>
          </div>

          {/* Sibling Links / Benzer Baskı Çözümleri (Horizontal Linking within Cluster) */}
          {cluster && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                <div className="w-8 h-8 bg-neutral-100 text-neutral-800 rounded-lg flex items-center justify-center shrink-0">
                  <Tag size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-black uppercase tracking-tight">Benzer Baskı Çözümleri</h3>
                  <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mt-0.5">{cluster.name}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {cluster.siblings
                  .filter(sib => sib.path !== page.path && sib.path !== `/sektor/${activeKey}`)
                  .map((link, lIdx) => (
                    <Link 
                      key={lIdx} 
                      to={link.path} 
                      className="flex items-center justify-between p-3.5 bg-neutral-50 hover:bg-primary/5 hover:text-primary rounded-xl border border-neutral-100 transition-all group"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-neutral-800 group-hover:text-primary transition-colors">{link.text}</span>
                      <ArrowRight size={14} className="text-neutral-400 group-hover:translate-x-1 group-hover:text-primary transition-all shrink-0" />
                    </Link>
                  ))}
              </div>
            </div>
          )}

          {/* Sektörel Hub List (Authority distribution for crawl-depth reduction) */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
            <h3 className="text-sm font-black text-black mb-4 uppercase tracking-tight border-b border-gray-100 pb-3">Sektörel Matbaa Çözümleri</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/sektor/restoran-brosur-baski" className="p-3 bg-neutral-50 border border-neutral-100 hover:border-primary/30 rounded-xl text-center flex flex-col items-center justify-center gap-1.5 transition-all group">
                <Utensils size={18} className="text-neutral-500 group-hover:text-primary" />
                <span className="text-[10px] font-bold text-neutral-700">RESTORAN</span>
              </Link>
              <Link to="/sektor/emlakci-kartvizit-baski" className="p-3 bg-neutral-50 border border-neutral-100 hover:border-primary/30 rounded-xl text-center flex flex-col items-center justify-center gap-1.5 transition-all group">
                <HomeIcon size={18} className="text-neutral-500 group-hover:text-primary" />
                <span className="text-[10px] font-bold text-neutral-700">EMLAK</span>
              </Link>
              <Link to="/sektor/fast-food-cips-kutusu-baski" className="p-3 bg-neutral-50 border border-neutral-100 hover:border-primary/30 rounded-xl text-center flex flex-col items-center justify-center gap-1.5 transition-all group">
                <Layers size={18} className="text-neutral-500 group-hover:text-primary" />
                <span className="text-[10px] font-bold text-neutral-700">AMBALAJ</span>
              </Link>
              <Link to="/sektor/kafe-menu-baski" className="p-3 bg-neutral-50 border border-neutral-100 hover:border-primary/30 rounded-xl text-center flex flex-col items-center justify-center gap-1.5 transition-all group">
                <Coffee size={18} className="text-neutral-500 group-hover:text-primary" />
                <span className="text-[10px] font-bold text-neutral-700">KAFE</span>
              </Link>
            </div>
          </div>

          {/* Internal Link Suggestions */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
            <h3 className="text-sm font-black text-black mb-6 uppercase tracking-tight border-b border-gray-100 pb-2">Popüler Baskı Hizmetlerimiz</h3>
            <div className="grid grid-cols-1 gap-3">
              {page.internalLinks.map((link, lIdx) => (
                <Link 
                  key={lIdx} 
                  to={link.path} 
                  className="flex items-center justify-between p-3 bg-neutral-50 hover:bg-primary/5 hover:text-primary rounded-xl border border-neutral-100 transition-all group"
                >
                  <span className="text-xs sm:text-sm font-semibold text-neutral-800 group-hover:text-primary transition-colors">{link.text}</span>
                  <ArrowRight size={14} className="text-neutral-400 group-hover:translate-x-1 group-hover:text-primary transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Anadolu Şehirleri & Bölgesel Matbaa Ağımız (Footer Authority Distribution / Geo link graph) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-neutral-100 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <MapPin size={16} /> Anadolu Matbaa Hizmet Ağımız
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-neutral-950 uppercase tracking-tight">Türkiye Genelinde Profesyonel Baskı Sevk Noktaları</h3>
            </div>
            <p className="text-xs sm:text-sm font-medium text-neutral-500 max-w-md md:text-right">
              Topkapı matbaa merkezimizden çıkan sigortalı ambalajlı koliler, kapıda ödeme seçeneği ve döküm garantisiyle adresinize teslim edilir.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { path: "/samsun-kartvizit-baski", label: "Samsun Kartvizit" },
              { path: "/trabzon-brosur-baski", label: "Trabzon Broşür" },
              { path: "/ordu-magnet-baski", label: "Ordu Magnet" },
              { path: "/antalya-katalog-baski", label: "Antalya Katalog" },
              { path: "/gebze-kutu-baski", label: "Gebze Kutu Baskı" },
              { path: "/giresun-kartvizit-baski", label: "Giresun Kartvizit" },
              { path: "/rize-brosur-baski", label: "Rize Broşür" },
              { path: "/sinop-magnet-baski", label: "Sinop Magnet" },
              { path: "/bitlis-kutu-baski", label: "Bitlis Kutu Baskı" },
              { path: "/erzurum-katalog-baski", label: "Erzurum Katalog" },
              { path: "/kayseri-kutu-baski", label: "Kayseri Kutu Baskı" },
              { path: "/adana-kartvizit-baski", label: "Adana Kartvizit" }
            ].map((city, cIdx) => (
              <Link 
                key={cIdx} 
                to={getProductPagePath(city.path)}
                className="p-3.5 bg-neutral-50 hover:bg-neutral-950 hover:text-white border border-neutral-100 hover:border-neutral-950 rounded-xl transition-all text-center flex flex-col items-center justify-center group"
              >
                <span className="text-xs font-bold text-neutral-800 group-hover:text-white transition-colors">{city.label}</span>
                <span className="text-[9px] text-neutral-400 group-hover:text-primary transition-colors font-mono uppercase tracking-widest mt-1">Sipariş Alımı</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
