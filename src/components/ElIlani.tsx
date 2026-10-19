import React from 'react';
import { EL_ILANI_FAQS as FAQ_ITEMS } from '../data/elIlaniSeo';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronRight, 
  ShoppingCart, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  HelpCircle, 
  ShieldCheck, 
  Check, 
  Info, 
  MessageCircle,
  ImageIcon,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  Printer,
  Truck
} from 'lucide-react';
import { 
  useCart, 
  EL_ILANI_DATA, 
  AgencyDiscountCTA 
} from '../App';
import { CategoryHero } from './CategoryHero';
import { RelatedBlogPosts } from './RelatedBlogPosts';
import { WhatsAppIcon } from './WhatsAppIcon';

// 6 Galeri Kartı Tanımı (Kompakt 2x3 Mobil / 3x2 Masaüstü)
const GALLERY_ITEMS = [
  {
    id: "fiyat-cesit",
    title: "Renkli Tanıtım El İlanı Örnekleri",
    src: "/images/el-ilani/el-ilani-baski-fiyatlari.webp",
    desc: "Yeşil ve turuncu zeminli, farklı yazı ve görsel yerleşimleri içeren tanıtım tasarımları.",
    badge: "Tanıtım Tasarımı"
  },
  {
    id: "olculer",
    title: "Diş Kliniği El İlanı Örneği",
    src: "/images/el-ilani/a5-el-ilani-baski.webp",
    desc: "Diş kliniği hizmetlerini ve iletişim bilgilerini görsellerle bir araya getiren tasarım örneği.",
    badge: "Sağlık Tanıtımı"
  },
  {
    id: "kagit-secenekleri",
    title: "Dönerci Menü El İlanı Örneği",
    src: "/images/el-ilani/ucuz-el-ilani-basimi.webp",
    desc: "Döner görseli, menü seçenekleri ve iletişim bilgileri içeren siyah zeminli tanıtım tasarımı.",
    badge: "Menü Tasarımı"
  },
  {
    id: "sektorel-ornekler",
    title: "Sağlık Hizmeti Tanıtım Tasarımı",
    src: "/images/el-ilani/sektorel-el-ilani-dagitim.webp",
    desc: "Diş kliniği el ilanında başlık, hizmet açıklaması ve iletişim alanlarının yerleşimi.",
    badge: "Sektörel Tasarım"
  },
  {
    id: "cmyk-tasma-payi",
    title: "Güzellik Merkezi El İlanı Örneği",
    src: "/images/el-ilani/el-ilani-tasarimi.webp",
    desc: "Güzellik merkezi hizmetleri ve kampanyalarını tanıtan pembe tasarım örneği.",
    badge: "Güzellik & Bakım"
  },
  {
    id: "prova-kargo",
    title: "PDF Prova, Paketleme ve Sevk",
    src: "/images/el-ilani/el-ilani-prova-paketleme-sevk.webp",
    desc: "Baskı öncesi dijital PDF prova onayı ve Türkiye geneli anlaşmalı kargo süreci.",
    badge: "Prova & Sevk"
  }
];

// 8 Adet Dengeli Sıkça Sorulan Soru (2 Sütunlu Grid İçin Çift Sayı)

export const ElIlaniPage: React.FC = () => {
  const { openProductDetail } = useCart();

  const openWhatsApp = (item: any) => {
    openProductDetail(item, "El İlanı");
  };

  // Structured Data Schemas for Google SEO
  const customQuoteWhatsappUrl = `https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, web sitenizdeki /el-ilani sayfasından ulaşıyorum. Fiyat listesinde yer almayan özel el ilanı ölçüleri, kâğıt gramajı ve adet seçenekleri için özel teklif almak istiyorum.")}`;

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <Helmet>
        <title>El İlanı Baskı Fiyatları | A3, A4, A5 ve Dar Ebat</title>
        <meta name="description" content="A3, A4, A5 ve dar ebat el ilanı baskı fiyatlarını inceleyin. 105 gr kuşe fiyatları ile farklı gramaj, ölçü, baskı yönü ve adet teklifleri." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mavibasim.com/el-ilani" />
        
        {/* Open Graph */}
        <meta property="og:title" content="El İlanı Baskı Fiyatları | A3, A4, A5 ve Dar Ebat" />
        <meta property="og:description" content="A3, A4, A5 ve dar ebat el ilanı baskı fiyatlarını inceleyin. 105 gr kuşe fiyatları ile farklı gramaj, ölçü, baskı yönü ve adet teklifleri." />
        <meta property="og:url" content="https://mavibasim.com/el-ilani" />
        <meta property="og:type" content="product" />
        <meta property="og:image" content="https://mavibasim.com/images/el-ilani/el-ilani-baski-fiyatlari.webp" />
        <meta property="og:image:secure_url" content="https://mavibasim.com/images/el-ilani/el-ilani-baski-fiyatlari.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="533" />
        <meta property="og:image:alt" content="Yeşil ve turuncu tasarımlı tanıtım el ilanı örnekleri" />
        <meta property="og:site_name" content="Mavi Basım" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="El İlanı Baskı Fiyatları | A3, A4, A5 ve Dar Ebat" />
        <meta name="twitter:description" content="A3, A4, A5 ve dar ebat el ilanı baskı fiyatlarını inceleyin. 105 gr kuşe fiyatları ile farklı gramaj, ölçü, baskı yönü ve adet teklifleri." />
        <meta name="twitter:image" content="https://mavibasim.com/images/el-ilani/el-ilani-baski-fiyatlari.webp" />

        {/* RouteSEOHead owns the shared JSON-LD for this route. */}
      </Helmet>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        
        {/* VISUAL BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="py-2.5 text-xs text-slate-500 font-medium flex items-center gap-1.5 border-b border-slate-200/60 mb-3">
          <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          <ChevronRight size={12} className="text-slate-400" />
          <Link to="/matbaa" className="hover:text-primary transition-colors">Matbaa Ürünleri</Link>
          <ChevronRight size={12} className="text-slate-400" />
          <span className="text-slate-900 font-bold">El İlanı Baskı Fiyatları</span>
        </nav>

        <CategoryHero
          title="El İlanı Baskı Fiyatları ve Ölçüleri"
          badge="105 gr • 115 gr • 135 gr Kuşe"
          description={
            <div className="space-y-3">
              <p>
                Kurumsal tanıtım ve bölgesel dağıtım projeleriniz için 105 gr kuşe başta olmak üzere tek ve çift yön <strong className="text-slate-900 font-black">el ilanı baskı</strong> seçeneklerimizi inceleyebilirsiniz. İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası üzerinden Türkiye geneline anlaşmalı kargo seçeneği sunulmaktadır.
              </p>
              <p className="text-xs text-slate-600">
                El ilanı veya el broşürü, kampanya ve hizmet bilgilerini tek yaprak üzerinde sunan tanıtım materyalidir. A5 el broşürü gibi kompakt seçeneklerde kısa mesaj ve iletişim bilgileri öne çıkar. Daha fazla içeriği katlama panellerine ayırmak istediğinizde <Link to="/brosur" className="text-primary font-bold hover:underline">katlamalı broşür baskı</Link> seçeneklerimizi inceleyebilirsiniz.
              </p>
            </div>
          }
          relatedLinks={[
            { label: "Broşür Fiyatları", path: "/brosur" },
            { label: "Magnet Fiyatları", path: "/magnet" },
            { label: "Kartvizit Fiyatları", path: "/kartvizit" },
            { label: "Etiket Fiyatları", path: "/etiket" },
            { label: "Afiş Fiyatları", path: "/afis" }
          ]}
          customCtaText="Özel Teklif Al"
          customCtaLink={customQuoteWhatsappUrl}
          trustSignals={[
            { icon: Printer, text: "Topkapı Hizmet ve Koordinasyon Noktası" },
            { icon: CheckCircle2, text: "Baskıya Hazır Dosya İçin Teknik Kontrol" },
            { icon: Truck, text: "Türkiye Geneline Anlaşmalı Kargo" },
            { icon: ShieldCheck, text: "Farklı Ebat ve Gramaj İçin Özel Teklif" }
          ]}
        />

        {/* FİYAT TABLOSU GİRİŞ AÇIKLAMASI */}
        <div className="bg-white rounded-2xl p-5 md:p-6 mb-6 border border-slate-200 shadow-sm">
          <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
            Güncel El İlanı Fiyat Listesi
          </h2>
          <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
            El ilanı fiyatları; net kesim ölçüsü, kâğıt gramajı, tek veya çift yön baskı ve sipariş adedine göre değişir. A4 el ilanı fiyatları ile A5 el ilanı fiyatlarını mevcut ürün kodları ve adet seçenekleri üzerinden karşılaştırabilirsiniz.
          </p>
        </div>

        {/* PRICE TABLE SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-300 overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px]">
              <caption className="sr-only">El İlanı Fiyat Tablosu</caption>
              <thead>
                <tr className="bg-slate-900 text-white border-b border-slate-800">
                  <th scope="col" className="p-3.5 w-48 text-center text-xs font-black uppercase tracking-wider border-r border-slate-700">ÜRÜN TÜRÜ</th>
                  <th scope="col" className="p-3.5 w-36 text-center text-xs font-black uppercase tracking-wider border-r border-slate-700">EBAT</th>
                  <th scope="col" className="p-3.5 w-24 text-center text-xs font-black uppercase tracking-wider border-r border-slate-700">KOD</th>
                  <th scope="col" className="p-3.5 text-center text-xs font-black uppercase tracking-wider border-r border-slate-700">ÖZELLİKLER</th>
                  <th scope="col" className="p-3.5 w-32 text-center text-xs font-black uppercase tracking-wider border-r border-slate-700">ADET</th>
                  <th scope="col" className="p-3.5 w-32 text-center text-xs font-black uppercase tracking-wider border-r border-slate-700">FİYAT</th>
                  <th scope="col" className="p-3.5 w-44 text-center text-xs font-black uppercase tracking-wider">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold text-slate-800">
                {EL_ILANI_DATA.map((category, cIdx) => {
                  const chunks: any[][] = [];
                  let currentChunk: any[] = [];
                  let lastEbat: string | null = null;

                  category.items.forEach((item) => {
                    if (lastEbat !== null && item.ebat !== lastEbat) {
                      chunks.push(currentChunk);
                      currentChunk = [];
                    }
                    currentChunk.push(item);
                    lastEbat = item.ebat;
                  });
                  if (currentChunk.length > 0) chunks.push(currentChunk);

                  return (
                    <React.Fragment key={cIdx}>
                      {chunks.map((chunk, chunkIdx) => (
                        <React.Fragment key={`${cIdx}-${chunkIdx}`}>
                          {chunk.map((item, itemIdx) => (
                            <tr key={`${cIdx}-${chunkIdx}-${itemIdx}`} className="border-b border-slate-200 hover:bg-sky-50/60 transition-colors">
                              {itemIdx === 0 && (
                                <td 
                                  rowSpan={chunk.length}
                                  className="bg-white border-r-2 border-slate-300 p-4 text-center align-middle w-48 border-b-2 border-slate-300"
                                >
                                  <div className="flex flex-col items-center justify-center font-black">
                                    <span className="text-sm font-black text-slate-900 uppercase tracking-wider">
                                      {category.cat.includes('El İlanı') ? 'EL İLANI' : category.cat.toUpperCase()}
                                    </span>
                                    <span className="text-sm font-black text-amber-600 my-0.5">
                                      {category.subTitle.split(' ')[0]} {category.subTitle.split(' ')[1]}
                                    </span>
                                    <span className="text-[10px] text-slate-600 font-extrabold uppercase tracking-tight leading-tight max-w-[130px]">
                                      {category.subTitle.split(' ').slice(2).join(' ')}
                                    </span>
                                  </div>
                                </td>
                              )}
                              <td className="p-3 text-center border-r border-slate-200">
                                <span className="inline-block bg-slate-100 px-3 py-1 rounded-md text-slate-900 border border-slate-200 font-black text-xs whitespace-nowrap">
                                  {item.ebat}
                                </span>
                              </td>
                              <td className="p-3 text-center font-black text-primary border-r border-slate-200">
                                {item.code}
                              </td>
                              <td className="p-3 text-center text-slate-800 font-medium border-r border-slate-200">
                                {item.desc}
                              </td>
                              <td className="p-3 text-center font-black text-slate-900 border-r border-slate-200 whitespace-nowrap">
                                {item.miktar}
                              </td>
                              <td className="p-3 text-center text-sm font-black text-slate-900 border-r border-slate-200 whitespace-nowrap">
                                {item.price}
                              </td>
                              <td className="p-3 text-center">
                                <button 
                                  onClick={() => openWhatsApp(item)}
                                  title={`Hemen Sipariş Ver – ${item.code} – ${item.miktar}`}
                                  aria-label={`Hemen Sipariş Ver – ${item.code} – ${item.miktar}`}
                                  className="inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-sky-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold tracking-tight transition-all shadow-xs hover:shadow-md active:scale-95"
                                >
                                  <ShoppingCart size={14} className="shrink-0" />
                                  <span>Hemen Sipariş Ver</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 text-xs text-slate-600 font-medium leading-relaxed">
            * Tabloda belirtilen fiyatlara %20 KDV dahil değildir. Üretim ve kargoya teslim süresi; ürün, adet, dosya onayı ve sipariş yoğunluğuna göre teklif aşamasında bildirilir.
          </div>
        </div>

        {/* FİYAT TABLOSU ALTI GÖRÜNÜR AÇIKLAMA */}
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 md:p-5 mb-8 text-xs md:text-sm text-sky-950 leading-relaxed font-medium">
          1.000 adet el ilanı fiyatı, 5.000 adet el ilanı fiyatı ve 10.000 adet el ilanı fiyatı için ebat, kâğıt gramajı ve baskı yönü bilgilerinizi ileterek özel teklif alabilirsiniz. 2.000 adet el ilanı seçeneklerini mevcut fiyat tablosundan inceleyebilirsiniz.
        </div>

        {/* ÖZEL ÖLÇÜ, KÂĞIT VE GRAMAJ TEKLİFİ ALANI */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 mb-2">
                <Sparkles size={14} /> Farklı Ebat &amp; Gramaj Seçenekleri
              </span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">
                Fiyat Listesinde Olmayan El İlanı Seçenekleri
              </h2>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
                Fiyat listesinde yer almayan özel el ilanı ölçüleri, farklı kâğıt türleri, gramajlar, tek veya çift yön baskı seçenekleri; malzeme tedariki ve teknik uygunluğa göre değerlendirilebilir. 170 gr, 250 gr, 300 gr ve 350 gr kuşe kâğıt seçenekleri de malzeme tedariki ve teknik uygunluğa göre özel teklif kapsamında değerlendirilebilir. İhtiyacınız olan ebat, adet, kâğıt ve baskı yönü bilgilerini ileterek size özel teklif alabilirsiniz.
              </p>
            </div>
            <a
              href={customQuoteWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-black text-xs md:text-sm uppercase tracking-wider transition-all shadow-sm shrink-0 hover:scale-105 active:scale-95"
            >
              <WhatsAppIcon size={18} />
              <span>Özel Teklif Al</span>
            </a>
          </div>
        </section>

        {/* EL İLANI ÖLÇÜLERİ VE KULLANIM ALANLARI */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-12 shadow-sm">
          <div className="max-w-3xl mb-6">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20 mb-2">
              <Layers size={14} /> Ebat &amp; Kesim Standartları
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
              El İlanı Ölçüleri ve Kullanım Alanları
            </h2>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Matbaacılık standartlarında kullanılan ebat sınıfları ve üretim sonrasında elde edilen net kesim ölçüleri:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Dar Ebat */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-slate-800 text-white text-xs font-black px-2.5 py-1 rounded">Dar Ebat</span>
                  <span className="text-[11px] font-bold text-slate-500">ELI3 - ELI4</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Dar Ebat – 9,2×20 cm</h3>
                <div className="space-y-1 my-3 text-xs text-slate-600">
                  <p className="text-primary font-bold"><strong>Satın Alınabilir Net Kesim:</strong> 9,2 × 20 cm</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Kupon, bilet, araba silecek kartı ve pratik elden dağıtımlar için tercih edilen dar ebat seçeneğidir.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                Tavsiye: 105 gr Kuşe Tek Yön
              </div>
            </div>

            {/* A5 Ebat */}
            <div className="bg-sky-50/50 p-5 rounded-xl border border-sky-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-primary text-white text-xs font-black px-2.5 py-1 rounded">A5 Sınıfı</span>
                  <span className="text-[11px] font-bold text-slate-500">ELI5 - ELI8</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Standart Dağıtım El İlanı</h3>
                <div className="space-y-1 my-3 text-xs text-slate-700">
                  <p><strong>Standart Referans:</strong> 14,8 × 21 cm</p>
                  <p className="text-primary font-bold"><strong>Satın Alınabilir Net Kesim:</strong> 13,8 × 20 cm</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A5 el ilanı ölçüleri, satın alınacak ürünün net kesim ölçüsüne göre belirtilir. A5 el ilanı baskı fiyatı; kâğıt gramajı, baskı yönü ve sipariş adedine göre değişir. Restoran paket servis menüleri ve mahalle duyuruları için idealdir.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-sky-200 text-[11px] text-slate-600 font-medium">
                Tavsiye: 105 gr / 115 gr Kuşe
              </div>
            </div>

            {/* A4 Ebat */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-slate-800 text-white text-xs font-black px-2.5 py-1 rounded">A4 Sınıfı</span>
                  <span className="text-[11px] font-bold text-slate-500">ELI9 - ELI12</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Geniş Bilgi &amp; Aktüel İlan</h3>
                <div className="space-y-1 my-3 text-xs text-slate-600">
                  <p><strong>Standart Referans:</strong> 21 × 29,7 cm</p>
                  <p className="text-primary font-bold"><strong>Satın Alınabilir Net Kesim:</strong> 19 × 27,2 cm</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Market aktüel listeleri, eğitim kurumu kayıt formları ve detaylı ürün katalog föyleri için geniş baskı alanı sağlar.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                Tavsiye: 105 gr / 135 gr Kuşe
              </div>
            </div>

            {/* A3 Ebat */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-slate-800 text-white text-xs font-black px-2.5 py-1 rounded">A3 Sınıfı</span>
                  <span className="text-[11px] font-bold text-slate-500">ELI13 - ELI16</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Büyük Boy &amp; Poster Föyü</h3>
                <div className="space-y-1 my-3 text-xs text-slate-600">
                  <p><strong>Standart Referans:</strong> 29,7 × 42 cm</p>
                  <p className="text-primary font-bold"><strong>Satın Alınabilir Net Kesim:</strong> 27,5 × 40 cm</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Geniş kampanya panoları, cam duyuruları ve çok ürünlü indirim bültenleri için maksimum görünürlük sunar.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                Tavsiye: 105 gr Kuşe
              </div>
            </div>
          </div>
        </section>

        {/* KOMPAKT 6 KARTLI GÖRSEL GALERİSİ (Mobil: 2x3, MD+: 3x2) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-12 shadow-sm">
          <div className="max-w-3xl mb-6">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20 mb-2">
              <ImageIcon size={14} /> Örnekler &amp; Süreç
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
              El İlanı Baskı Örnekleri
            </h2>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Farklı ebat, kâğıt gramajı ve baskı özelliklerine göre hazırlanan el ilanı tasarım ve üretim aşamaları:
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {GALLERY_ITEMS.map((card) => (
              <div
                key={card.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-xs"
              >
                <div>
                  {/* Görsel Alanı (aspect-[3/2]) */}
                  <div className="aspect-[3/2] w-full rounded-lg bg-slate-100 border border-slate-200/80 mb-3 relative overflow-hidden group">
                    <img 
                      src={card.src} 
                      alt={card.title} 
                      loading="lazy" 
                      decoding="async" 
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.fallback) {
                          target.dataset.fallback = 'true';
                          target.src = '/images/el-ilani/el-ilani-baski-fiyatlari.webp';
                        }
                      }}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xs md:text-sm font-black text-slate-900 mb-1 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[11px] md:text-xs text-slate-600 font-medium leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TEKNİK BİLGİ VE GRAFİK KONTROL KURALLARI */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Baskı Dosyası Hazırlığı */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                  <FileText size={18} />
                </div>
                <h2 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight">
                  Baskı Öncesi Dosya Hazırlığı
                </h2>
              </div>
              <ul className="space-y-2.5 text-xs md:text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Renk Formatı:</strong> Tasarımların CMYK 4 renk modunda hazırlanması gereklidir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Çözünürlük:</strong> Nihai baskı ölçüsünde kullanılan raster fotoğraflar için genellikle 300 PPI önerilir. Logo, ikon ve metinler mümkünse vektörel olarak korunmalıdır.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Taşma Payı:</strong> Giyotin kesim payı için 4 kenardan 3 mm bleed payı bırakılmalıdır.</span>
                </li>
              </ul>
            </div>
            <p className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
              Baskıya hazır dosya için teknik kontrol ve dijital PDF prova onayı sunulmaktadır.
            </p>
          </div>

          {/* Grafik Hizmeti & Renk Bilgisi */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center font-bold">
                  <Info size={18} />
                </div>
                <h2 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight">
                  Tasarım ve Renk Bilgilendirmesi
                </h2>
              </div>
              <ul className="space-y-2.5 text-xs md:text-sm text-slate-700 font-medium">
                <li className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Grafik Tasarım:</strong> Grafik desteği var. Baskıya hazır dosyanın teknik kontrolü ile yeni el ilanı tasarımı farklı ihtiyaçlardır. Yeni tasarım veya mevcut dosyada düzenleme talebinizi sipariş öncesinde ileterek kapsam ve varsa ek ücret hakkında bilgi alabilirsiniz.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Ekran ve Baskı Farkı:</strong> Beklenmedik ton farkı riskini azaltmak için baskı dosyasının uygun CMYK profiliyle hazırlanması önerilir. Ekran görüntüsü ile baskı sonucu birebir aynı olmayabilir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Teslimat:</strong> Üretim ve kargoya teslim süresi; ürün, adet, dosya onayı ve sipariş yoğunluğuna göre teklif aşamasında bildirilir.</span>
                </li>
              </ul>
              <p className="mt-4 text-xs md:text-sm text-slate-700 leading-relaxed">
                El broşürü baskı fiyatlarını karşılaştırırken aynı net kesim ölçüsünü, kâğıt gramajını, baskı yönünü ve adedi esas alın. Daha küçük ebat veya tek yön baskı her tanıtım ihtiyacını karşılamayabilir; önce aktaracağınız içeriğe uygun seçeneği belirleyip aynı özellikler için teklif isteyin. Tasarım ve ek işlem taleplerini de karşılaştırmaya dahil edin.
              </p>
            </div>
            <p className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
              İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası üzerinden destek verilmektedir.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SIKÇA SORULAN SORULAR (8 Soru, Mobil: 1 Sütun, MD+: 2 Sütun) */}
        {/* ========================================================= */}
        <section id="faq-section" className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-12 scroll-mt-24">
          <div className="max-w-3xl mb-6">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20 mb-2">
              <HelpCircle size={14} /> Sıkça Sorulan Sorular
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
              El İlanı Baskısı Hakkında Merak Edilenler
            </h2>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Ölçüler, kâğıt seçenekleri, fiyat hesaplama ve sipariş süreci hakkında yanıtlar:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {FAQ_ITEMS.map((item, idx) => {
              const faqId = `el-ilani-faq-${idx}`;

              return (
                <div 
                  key={idx} 
                  className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <h3 id={faqId} className="font-bold text-slate-900 text-xs md:text-sm mb-2.5 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      <span className="leading-snug">{item.q}</span>
                    </h3>
                    <div className="h-px bg-slate-100 my-2.5 w-full" />
                    <p className="text-slate-700 text-xs leading-relaxed font-normal">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">
              Diğer Kurumsal Baskı Ürünleri
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { title: "Broşür", desc: "Katlamalı föy ve menüler", path: "/brosur" },
              { title: "Magnet", desc: "Buzdolabı magnetleri", path: "/magnet" },
              { title: "Kartvizit", desc: "Kurumsal kartvizitler", path: "/kartvizit" },
              { title: "Etiket", desc: "Kuşe ve özel kesim etiket seçenekleri", path: "/etiket" },
              { title: "Katalog", desc: "Ürün ve firma katalogları", path: "/kataloglar" },
              { title: "Afiş", desc: "Kuşe poster ve afiş", path: "/afis" }
            ].map((product, idx) => (
              <Link 
                key={idx} 
                to={product.path} 
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-primary/50 transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  <h3 className="text-xs md:text-sm font-black text-slate-900 mb-1 group-hover:text-primary transition-colors">{product.title}</h3>
                  <p className="text-slate-500 font-medium text-[11px] leading-snug">{product.desc}</p>
                </div>
                <span className="mt-3 text-primary font-bold text-xs inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  İncele &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>

        <RelatedBlogPosts category="el-ilani" title="El İlanı ve Matbaa Baskı Rehberi" />

        <div className="mt-8">
          <AgencyDiscountCTA />
        </div>
      </div>
    </div>
  );
};
