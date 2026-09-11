import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ShoppingCart, 
  Layers,
  CheckCircle,
  Maximize2,
  X,
  FileCheck,
  Printer,
  Wrench,
  Truck,
  Settings,
  FileText,
  Clock,
  ShieldCheck,
  Sliders,
  Anchor,
  Compass,
  ArrowUp
} from 'lucide-react';
import { useCart, FireWarning, AgencyDiscountCTA, FeatureTooltip } from '../App';
import { YAG_KARTI_DATA, ReklamItem } from './ReklamUrunleri';

// 6 Real Product Images Gallery Data
const YAG_KARTI_GALLERY = [
  {
    src: "/images/yag-karti/oto-yag-degisim-karti.webp",
    alt: "Oto Servis Yağ Değişim Kartı Ön Yüz Baskısı",
    title: "Yağ Kartı Ön Yüz (Servis ve Bakım Tablosu)",
    subtitle: "Bakım Verileri & Filtre Onay Kutucukları",
    desc: "Motor yağı viskozitesi (5W-30, 10W-40 vb.), yağ değişim tarihi, kilometresi ile hava, polen ve yakıt filtresi onay kutucuklarının yer aldığı yazım alanlı ön yüz tasarımı."
  },
  {
    src: "/images/yag-karti/yag-takip-karti-ornegi.webp",
    alt: "Yağ Kartı Arka Yüz Kurumsal Logo ve Telefon Baskısı",
    title: "Yağ Kartı Arka Yüz (Kurumsal Marka ve İletişim)",
    subtitle: "Servis Logosu, Randevu Hattı & QR Kod",
    desc: "Oto servisin logosu, randevu hattı telefon numarası, servis adresi ve dijital hızlı iletişim bağlantılarını (QR kod) barındıran kurumsal marka arka yüzü."
  },
  {
    src: "/images/yag-karti/yag-karti-baski.webp",
    alt: "350 gr Kuşe Mat Selefonlu Yağ Değişim Takip Kartı",
    title: "350 gr Kuşe Karton Yağ Değişim Kartı",
    subtitle: "Standart Kuşe Karton & Mat Yüzey",
    desc: "Mat selefonlu yüzey seçeneği, kullanım ve tasarım tercihlerine göre değerlendirilebilir."
  },
  {
    src: "/images/yag-karti/promosyon-yag-karti-tasarimi.webp",
    alt: "700 gr Sıvama Mukavemetli Oto Servis Takip Kartı",
    title: "700 gr Çift Kat (Sıvama) Yağ Kartı",
    subtitle: "Sıvama Gövde & Tok Yapı",
    desc: "İki tabaka kartonun sıvama tekniğiyle birleştirildiği, 350 gr modele kıyasla daha kalın ve tok bir gövde yapısı sunan 700 gr sıvama yağ takip kartı."
  },
  {
    src: "/images/yag-karti/yag-karti-baski-fiyatlari.webp",
    alt: "İp Delikli Oto Yağ Değişim Kartı ve İplik Aksesuarı",
    title: "İp Delikli ve Bağlama İpli Yağ Kartı Yapısı",
    subtitle: "4 mm Standart Asma Deliği & İplik Aksesuarı",
    desc: "Üst ortasında 4 mm standart delik bulunan ve araç dikiz aynasına, sinyal koluna veya uygun alana asılmayı sağlayan montaj iplikli sevk paketi."
  },
  {
    src: "/images/yag-karti/mat-selefon-yag-karti.webp",
    alt: "Mat Selefon Kaplamalı Yağ Değişim Kartı",
    title: "Mat Selefon Yüzey Detayı",
    subtitle: "Mat Laminasyon Seçeneği",
    desc: "Mat selefonlu yüzey seçeneği, kullanım ve tasarım tercihlerine göre değerlendirilebilir."
  }
];

// Sektörel Kullanım Alanları
const SEKTOREL_KULLANIM_ALANLARI = [
  {
    icon: Wrench,
    title: "Oto Servisleri & Bakım Noktaları",
    desc: "Binek ve hafif ticari araçlarda değişen motor yağı viskozitesini (5W-30, 10W-40), değişim kilometresini ve filtre onaylarını kaydeden özel ve yetkili servisler."
  },
  {
    icon: Truck,
    title: "Ağır Vasıta & Kamyon/TIR Servisleri",
    desc: "Yüksek kilometreli çekici, otobüs ve kamyon filolarının periyodik motor yağı ve şanzıman yağı değişim aralıklarını belgeleyen teknik servisler."
  },
  {
    icon: Sliders,
    title: "Motosiklet & ATV Bakım Servisleri",
    desc: "İki tekerlekli, skuter ve ATV motor gruplarında sezonsal yağ ve sıvı değişim tarihlerini kayıt altında tutan yetkili atölyeler."
  },
  {
    icon: Settings,
    title: "İş Makinesi & Jeneratör Birimleri",
    desc: "Şantiye ve sahadaki jeneratör, ekskavatör, vinç ve kepçe gruplarının çalışma saati bazlı periyodik yağ değişim takibi."
  },
  {
    icon: Compass,
    title: "Traktör & Tarım Makinesi Servisleri",
    desc: "Çiftlik ve tarım araçlarının ekim ve hasat sezonu öncesi yağ, hidrolik ve filtre değişimlerini belgeleyen bakım noktaları."
  },
  {
    icon: Anchor,
    title: "Deniz Motorları & Marin Servisleri",
    desc: "Tekne, yat ve dıştan takma marin motorlarının sezonluk çalışma saati ve kışlama öncesi yağ değişim periyotlarının takibi."
  },
  {
    icon: ShieldCheck,
    title: "Araç Filoları & Kiralama Şirketleri",
    desc: "Filodaki ticari ve kiralık araçların periyodik bakım takvimini araç üzerinde düzenli takip eden operasyon birimleri."
  }
];

// Dosya Hazırlama Rehberi
const DOSYA_HAZIRLAMA_ADIMLARI = [
  {
    title: "PDF, AI veya CDR Formatı",
    desc: "Tercih edilen teslim formatı vektörel PDF'tir. AI ve CDR dosyalarında yazı tipleri eğriye (convert/outline) çevrilmeli; raster görseller en az 300 DPI olmalıdır."
  },
  {
    title: "CMYK Renk Modu",
    desc: "Renk sapmalarını önlemek amacıyla tasarım dosyalarınızı CMYK renk profilinde hazırlayınız."
  },
  {
    title: "Font Outline (Yazıları Çizgiye Çevirme)",
    desc: "Baskı aşamasında yazı tipi kayması veya eksik font sorunu yaşanmaması için tüm metinler vektörel çizgiye dönüştürülmelidir."
  },
  {
    title: "3 mm Taşma Payı (Bleed)",
    desc: "Kesim sonrası kenarlarda beyaz kâğıt izi kalmaması için zemin görselinizi kesim çizgisinden en az 3 mm dışarı taşırınız."
  },
  {
    title: "Güvenli Alan & 15 mm Delik Payı",
    desc: "Önemli metin ve logoları kesim çizgisinden 3 mm içeride konumlandırınız. Üst kısımdaki 4 mm asma deliği için üstten en az 15 mm boşluk bırakınız."
  },
  {
    title: "Tek Renk Siyah Metin (100K)",
    desc: "Küçük punto yazıların net çıkması için siyah metinleri C:0 M:0 Y:0 K:100 (tek renk siyah) olarak tanımlayınız."
  }
];

// 8 Curated SSS / FAQ Items
const YAG_KARTI_FAQS = [
  {
    q: "Yağ kartı siparişlerinde minimum üretim adedi nedir?",
    a: "Minimum sipariş adedi standart modellerde 1.000 adettir. Fiyat tablosunda yer almayan farklı adet talepleri teklif aşamasında değerlendirilir."
  },
  {
    q: "350 gr kuşe ile 700 gr sıvama karton arasındaki fark nedir?",
    a: "350 gr kuşe standart kalınlıkta ve esnek karton seçeneğidir. 700 gr sıvama ise iki tabaka kartonun preslenerek birleştirilmesiyle elde edilen daha rijit ve kalın gövde yapısına sahip modeldir."
  },
  {
    q: "Yağ kartlarında hangi ebat seçenekleri bulunmaktadır?",
    a: "Standart olarak 5,4x10,2 cm (küçük boy) ve 6,5x12,5 cm (büyük boy) seçenekleri sunulmaktadır. Kullanım alanına ve yer verilecek bilgi yoğunluğuna göre ebat tercihi yapılabilir."
  },
  {
    q: "Yağ kartı tasarım dosyası nasıl hazırlanmalıdır?",
    a: "Baskıya hazır PDF, AI veya CDR formatındaki vektörel çalışmalar tercih edilir. Tasarımlarınızın CMYK renk modunda, 3 mm taşma payı ve üstte 15 mm delik payı bırakılarak hazırlanması önerilir."
  },
  {
    q: "Baskı öncesinde kontrol amacıyla onay provası iletiliyor mu?",
    a: "Evet. Siparişinizin baskı aşamasına geçmeden önce kontrol edilmesi için dijital PDF onay provası paylaşılır ve teyidiniz alınır."
  },
  {
    q: "Yağ kartları delikli ve ipliğiyle birlikte mi gönderilir?",
    a: "Evet. Kartların üst kısmında standart 4 mm asma deliği açılır ve araç içine veya aynaya asılmasını sağlayan bağlama iplikleri paket içeriğinde teslim edilir."
  },
  {
    q: "Listede yer almayan özel ölçü veya farklı adetlerde sipariş verilebilir mi?",
    a: "Evet. Standart ölçü ve tirajların dışındaki özel bıçak kesimli veya farklı adetlerdeki talepleriniz için WhatsApp veya iletişim kanallarımız üzerinden teklif alabilirsiniz."
  },
  {
    q: "Üretim ve kargo planı nasıl belirlenir?",
    a: "Tasarım onayının tamamlanması ve üretim sürecinin ardından siparişiniz anlaşmalı kargo ile adresinize sevk edilir. Net kargo ve teslimat planı teklif veya sipariş aşamasında paylaşılır."
  }
];

export const YagKartiPage = () => {
  const { openProductDetail, cart, setIsCartOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState<typeof YAG_KARTI_GALLERY[0] | null>(null);
  const [showMobileSticky, setShowMobileSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const tableEl = document.getElementById('fiyat-tablosu');
      if (tableEl) {
        const rect = tableEl.getBoundingClientRect();
        // Show sticky bar on mobile when scrolled past pricing table
        setShowMobileSticky(rect.bottom < 80);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Structured Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Anasayfa",
        "item": "https://mavibasim.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Reklam Ürünleri",
        "item": "https://mavibasim.com/reklam-urunleri"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Yağ Kartı Baskı",
        "item": "https://mavibasim.com/yag-karti"
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Oto Servis Logolu Yağ Değişim Kartı Baskısı",
    "image": YAG_KARTI_GALLERY.map(img => `https://mavibasim.com${img.src}`),
    "description": "Oto servisleri ve bakım istasyonları için 350 gr ve 700 gr mat selefonlu, 4 mm delikli, ipli özel kesim araç periyodik bakım ve yağ değişim takip kartı imalatı.",
    "sku": "YAG-KARTI-1000",
    "brand": {
      "@type": "Brand",
      "name": "Mavi Basım"
    },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "2760",
      "highPrice": "4100",
      "priceCurrency": "TRY",
      "offerCount": "4",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "128",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": YAG_KARTI_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-sans text-slate-800">
      <Helmet>
        <title>Yağ Değişim Kartı Baskı Fiyatları | 350 gr Kuşe - Mavi Basım</title>
        <meta name="description" content="Oto servisleri ve yıkamalar için 350 gr mat selefonlu oto yağ değişim takip kartı baskısı. Topkapı matbaasından kapınıza hızlı kargo imkanıyla." />
        <meta name="keywords" content="yağ kartı baskı, oto servis bakım kartı, motor yağı bakım kartı, oto servis kartı, araç bakım kartı, periyodik bakım kartı, yağ değişim etiketi, araç bakım etiketi, bakım takip kartı, servis takip kartı" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200/80">
          <Link to="/" className="hover:text-primary transition-colors">Anasayfa</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-400">Reklam Ürünleri</span>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-primary font-bold">Yağ Kartı Baskı</span>
        </nav>

        {/* Page Title & Subtitle */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-slate-900">
              Oto Servis Logolu Yağ Değişim Kartı Baskısı
            </h1>
          </div>
          <p className="text-sm md:text-base font-bold text-slate-700 mb-2">
            350 gr kuşe veya 700 gr sıvama seçenekleri, mat selefonlu yüzey, asma deliği ve bağlama ipliği içeren yağ kartı modellerini inceleyebilirsiniz.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Sipariş öncesinde ürün modeli, adet, tasarım dosyası ve baskı onayı değerlendirilir. Üretim ve kargo planı teklif veya sipariş aşamasında netleştirilir.
          </p>
        </div>

        {/* Pricing Table Section */}
        <div id="fiyat-tablosu" className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8 relative z-10 scroll-mt-20">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 w-10"></th>
                  <th className="p-4 w-28 text-left font-black uppercase tracking-wider text-xs sm:text-sm border-r border-slate-800">KOD</th>
                  <th className="p-4 text-center font-black uppercase tracking-wider text-xs sm:text-sm border-r border-slate-800">EBAT</th>
                  <th className="p-4 text-center font-black uppercase tracking-wider text-xs sm:text-sm border-r border-slate-800">AÇIKLAMA</th>
                  <th className="p-4 text-center font-black uppercase tracking-wider text-xs sm:text-sm border-r border-slate-800">ADET</th>
                  <th className="p-4 w-32 text-center font-black uppercase tracking-wider text-xs sm:text-sm border-r border-slate-800">FİYAT</th>
                  <th className="p-4 w-44 text-center font-black uppercase tracking-wider text-xs sm:text-sm">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {YAG_KARTI_DATA[0].items.map((item: ReklamItem, idx: number) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-primary/5 transition-all group">
                    {idx === 0 && (
                      <td 
                        rowSpan={YAG_KARTI_DATA[0].items.length}
                        className="bg-blue-700 text-white font-black text-center p-2 w-10 border-r border-blue-800"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        <span className="tracking-widest uppercase text-[10px]">YAĞ KARTI BASKI</span>
                      </td>
                    )}
                    <td className="p-4 text-left font-bold text-primary border-r border-slate-100 group-hover:text-secondary transition-colors">{item.code}</td>
                    <td className="p-4 text-center text-slate-900 font-bold border-r border-slate-100">{item.ebat}</td>
                    <td className="p-4 text-center font-medium border-r border-slate-100 text-slate-800">
                      {item.desc}
                      <FeatureTooltip code={item.code} />
                    </td>
                    <td className="p-4 text-center text-slate-900 font-bold border-r border-slate-100">{item.miktar}</td>
                    <td className="p-4 text-center font-black text-slate-900 border-r border-slate-100 bg-slate-50/50 group-hover:bg-primary/10 transition-colors">
                      {item.price}
                    </td>
                    <td className="p-4 text-center whitespace-nowrap">
                      <button 
                        onClick={() => openProductDetail(item, "Yağ Kartı")}
                        aria-label={`${item.code} - ${item.ebat} ${item.miktar} Yağ Kartı Hemen Sipariş Ver`}
                        className="inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-sky-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold tracking-tight transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
                      >
                        <ShoppingCart size={15} className="shrink-0" />
                        <span>Hemen Sipariş Ver</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-medium">
            <span>* Fiyatlarımıza %20 KDV dahil değildir. Tüm yağ kartı siparişlerinde bağlama iplikleri paket içinde teslim edilir.</span>
          </div>
        </div>

        {/* Yağ Kartı Modeli Nasıl Seçilir? */}
        <section className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">
            Yağ Kartı Modeli Nasıl Seçilir?
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
              <span><strong>350 gr Kuşe:</strong> Standart kullanım için karton seçeneklerini inceleyebilirsiniz.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
              <span><strong>700 gr Sıvama:</strong> Daha kalın karton gövde tercihleri için değerlendirilebilir.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
              <span><strong>Küçük veya Büyük Ebat:</strong> Kullanım alanı ve tasarım içeriğine göre seçim yapılabilir.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
              <span><strong>Tasarım Dosyası:</strong> Baskıya hazır dosyanızı iletebilir veya tasarım ihtiyacınızı paylaşabilirsiniz.</span>
            </li>
          </ul>
        </section>

        {/* Pricing Guide Explanations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-primary uppercase block mb-1">Maliyet Faktörü</span>
            <h3 className="font-black text-slate-900 text-sm mb-1.5">Fiyatlar Neye Göre Değişiyor?</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Fiyatlar; seçilen ebat, karton türü, baskı sonrası uygulamalar ve sipariş adedine göre değişebilir. Standart 1.000 adet seçenekleri fiyat tablosunda yer alır; farklı adet talepleri teklif aşamasında değerlendirilir.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-primary uppercase block mb-1">Model Karşılaştırma</span>
            <h3 className="font-black text-slate-900 text-sm mb-1.5">Neden 700 gr Farklı Fiyatlıdır?</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              İki tabaka kartonun preslenerek birleştirilmesi (sıvama) ve ilave kesim işlemi gerektirdiği için 350 gr modele göre farklı fiyatlandırılır.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-primary uppercase block mb-1">Model Tercihi</span>
            <h3 className="font-black text-slate-900 text-sm mb-1.5">Hangi Model Yaygın Kullanılıyor?</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Binek araç servisleri tarafından fiyat-performans dengesi nedeniyle sıklıkla 350 gr mat selefonlu paketler tercih edilmektedir.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-primary uppercase block mb-1">Sektörel Öneri</span>
            <h3 className="font-black text-slate-900 text-sm mb-1.5">Hangi Sektör Hangisini Seçmeli?</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              350 gr model standart binek araç servisleri; 700 gr sıvama model ise ağır vasıta, iş makinesi ve kurumsal filo servisleri için değerlendirilebilir.
            </p>
          </div>
        </div>

        <FireWarning />
        <AgencyDiscountCTA />

        {/* 1. Real Product Image Gallery */}
        <section className="mt-12 mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-primary block mb-1">
                BASKI GÖRSELLERİ VE DETAYLAR
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
                Yağ Kartı Baskı Görselleri ve Detaylar
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Oto servislerinde kullanılan 350 gr kuşe, 700 gr sıvama, mat selefon yüzey, 4 mm ip delikli ve ipli montajlı yağ takip kartı detayları.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {YAG_KARTI_GALLERY.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedImage(img)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200 hover:border-primary/50 hover:shadow-xl transition-all overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
                      <Maximize2 size={14} /> Detaylı İncele
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    Fotoğraf 0{idx + 1}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between bg-slate-50/50">
                  <div>
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider block mb-1">
                      {img.subtitle}
                    </span>
                    <h3 className="font-black text-slate-900 text-base mb-2 group-hover:text-primary transition-colors">
                      {img.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {img.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Technical Specifications Table */}
        <section className="mb-14 bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#00E5FF] block mb-2">
              TEKNİK DOKÜMANTASYON VE MALZEME STANDARTLARI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-3">
              Yağ Kartı Baskı ve Malzeme Standartları
            </h2>
            <p className="text-sm text-slate-300 font-medium">
              Araç periyodik bakım takip kartlarında kullanılan kâğıt gramajları, yüzey kaplamaları, toleranslar ve dosya hazırlık parametreleri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 flex items-start gap-3">
              <Printer className="text-[#00E5FF] shrink-0 mt-0.5" size={20} />
              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Baskı Türü</span>
                <p className="font-bold text-white mt-0.5">CMYK 4 Renk Ofset Baskı</p>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 flex items-start gap-3">
              <Layers className="text-[#00E5FF] shrink-0 mt-0.5" size={20} />
              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Karton Gramajı</span>
                <p className="font-bold text-white mt-0.5">350 gr Kuşe Karton veya 700 gr Sıvama Gövde</p>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 flex items-start gap-3">
              <FileCheck className="text-[#00E5FF] shrink-0 mt-0.5" size={20} />
              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Yüzey Kaplaması</span>
                <p className="font-bold text-white mt-0.5">Mat selefonlu yüzey seçeneği, kullanım ve tasarım tercihlerine göre değerlendirilebilir.</p>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 flex items-start gap-3">
              <Sliders className="text-[#00E5FF] shrink-0 mt-0.5" size={20} />
              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Kesim & Form</span>
                <p className="font-bold text-white mt-0.5">Özel Bıçaklı Oval Kesim</p>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 flex items-start gap-3">
              <CheckCircle className="text-[#00E5FF] shrink-0 mt-0.5" size={20} />
              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Ebat Seçenekleri</span>
                <p className="font-bold text-white mt-0.5">5,4 x 10,2 cm (Küçük) ve 6,5 x 12,5 cm (Büyük)</p>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 flex items-start gap-3">
              <CheckCircle className="text-[#00E5FF] shrink-0 mt-0.5" size={20} />
              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Asma Deliği & İplik</span>
                <p className="font-bold text-white mt-0.5">4 mm Standart Delik + Paket İçi Bağlama İplikleri</p>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 flex items-start gap-3">
              <FileText className="text-[#00E5FF] shrink-0 mt-0.5" size={20} />
              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Dosya Formatı</span>
                <p className="font-bold text-white mt-0.5">PDF, AI, CDR (Min. 300 DPI, Yazılar Convertli)</p>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 flex items-start gap-3">
              <ShieldCheck className="text-[#00E5FF] shrink-0 mt-0.5" size={20} />
              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Taşma & Güvenli Alan</span>
                <p className="font-bold text-white mt-0.5">3 mm Taşma Payı / 3 mm İç Güvenli Alan</p>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 flex items-start gap-3">
              <Clock className="text-[#00E5FF] shrink-0 mt-0.5" size={20} />
              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Tiraj & Paket</span>
                <p className="font-bold text-white mt-0.5">Standart fiyat tablosunda 1.000 adet; farklı adetler için teklif değerlendirmesi</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Sektörel Kullanım Alanları */}
        <section className="mb-14">
          <div className="mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-primary block mb-1">
              KULLANIM ALANLARI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Sektörel Yağ Kartı Kullanım Senaryoları
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Binek otomobillerden iş makinelerine ve deniz araçlarına kadar farklı bakım gruplarının takip gereksinimleri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEKTOREL_KULLANIM_ALANLARI.map((sektor, idx) => {
              const IconComp = sektor.icon;
              return (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 hover:bg-white hover:border-primary/40 hover:shadow-lg transition-all">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                    <IconComp size={20} />
                  </div>
                  <h3 className="font-black text-slate-900 text-base mb-2">{sektor.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{sektor.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Prepress File Preparation Guide */}
        <section className="mb-14 bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200">
          <div className="mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-primary block mb-1">
              TEKNİK GRAFİK HAZIRLIK REHBERİ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Baskıya Gönderilecek Yağ Kartı Dosyası Hazırlama Rehberi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Baskıda netlik ve doğru kesim elde etmek için dikkat edilmesi gereken 6 temel teknik kural.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOSYA_HAZIRLAMA_ADIMLARI.map((adim, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-black text-primary bg-primary/10 px-2.5 py-1 rounded-md inline-block mb-3">
                    Kural 0{idx + 1}
                  </span>
                  <h3 className="font-black text-slate-900 text-base mb-2">{adim.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{adim.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Internal Links Section */}
        <section className="mb-14 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-3">
            Oto Servis ve Bakım İstasyonları İçin Tamamlayıcı Baskı Çözümleri
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            Araç bakım teslimatında araç zemin temizliğini korumak için <Link to="/oto-paspas" className="text-primary hover:underline font-bold">Oto Paspas Baskı</Link> ürünlerimizin yanı sıra, servis kayıtları ve ödeme işlemleri için <Link to="/makbuz-ve-formlar" className="text-primary hover:underline font-bold">Tahsilat Makbuzu ve Form Baskı</Link> koçanlarımızı inceleyebilirsiniz. Servis danışmanlarınız ve ustalarınız için kurumsal <Link to="/kartvizit" className="text-primary hover:underline font-bold">Kartvizit Baskı</Link>, dönemsel araç bakım kampanyalarınızı duyurmak için <Link to="/brosur" className="text-primary hover:underline font-bold">Broşür Baskı</Link>, yedek parça ve filtre kutularında kullanabileceğiniz <Link to="/etiket" className="text-primary hover:underline font-bold">Yapışkanlı Etiket Baskı</Link> ve acil yol yardım numaralarınızı hatırlatacak <Link to="/magnet" className="text-primary hover:underline font-bold">Promosyon Magnet</Link> siparişlerinizi birlikte planlayabilirsiniz.
          </p>
        </section>

        {/* 6. 8 SSS / FAQ Section */}
        <section className="mb-14">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1">
              SIKÇA SORULAN SORULAR
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Yağ Kartı Baskı Sıkça Sorulan Sorular
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2">
              Kâğıt seçenekleri, ebatlar, tasarım dosyası, asma deliği ve sipariş süreçleriyle ilgili merak edilenler.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {YAG_KARTI_FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className="h-full bg-white rounded-2xl border border-slate-200 p-5 transition-all shadow-xs flex flex-col justify-between text-black"
              >
                <div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm mb-2.5 flex items-start gap-2.5">
                    <span className="text-xs font-black text-primary bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{faq.q}</span>
                  </h3>
                  <div className="h-px bg-slate-100 my-2.5 w-full" />
                  <p className="text-xs sm:text-sm text-slate-650 font-normal leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Sabit Mobil Sipariş / İnceleme Aksiyonu */}
      <AnimatePresence>
        {showMobileSticky && (
          <motion.div 
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            className="fixed bottom-3 inset-x-3 z-40 md:hidden flex items-center gap-2 p-2 bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700"
          >
            <button
              onClick={() => {
                document.getElementById('fiyat-tablosu')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-sky-600 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <ArrowUp size={14} className="shrink-0" />
              <span>Yağ Kartı Modellerini İncele</span>
            </button>
            {cart.length > 0 && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
                aria-label={`Sepeti Aç (${cart.length} Ürün)`}
              >
                <ShoppingCart size={14} />
                <span>Sepet ({cart.length})</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative"
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
              <div className="relative aspect-[4/3] bg-slate-100">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 bg-white">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                  {selectedImage.subtitle}
                </span>
                <h3 className="font-black text-slate-900 text-lg mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {selectedImage.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

