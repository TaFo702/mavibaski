import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ShoppingCart, 
  Phone, 
  FileText, 
  Layers, 
  CheckCircle2, 
  Info,
  ExternalLink
} from 'lucide-react';
import { 
  useCart, 
  AMERIKAN_SERVIS_DATA, 
  FeatureTooltip, 
  FireWarning 
} from '../App';
import RelatedBlogPosts from './RelatedBlogPosts';

// Özel teklif WhatsApp mesajı ve linki
const SPECIAL_QUOTE_MESSAGE = "Merhaba, web sitenizdeki /amerikan-servis sayfasından ulaşıyorum. Fiyat listesinde bulunmayan Amerikan servis ölçüsü, kağıt türü, gramaj ve adet seçeneği için özel teklif almak istiyorum.";
const SPECIAL_QUOTE_WHATSAPP_LINK = `https://wa.me/905366022373?text=${encodeURIComponent(SPECIAL_QUOTE_MESSAGE)}`;

// 10 Adet Senkronize Sıkça Sorulan Sorular Listesi
export const AMERIKAN_SERVIS_FAQS = [
  {
    q: "Amerikan servis baskı fiyatları nasıl hesaplanır?",
    a: "Amerikan servis baskı fiyatları; seçilen ebat, kâğıt türü ve gramajı (90 gr 1. Hamur, 100 gr kuşe veya 120 gr 1. Hamur), baskı adedi ve renk seçeneklerine göre belirlenir. Standart paketlerimiz 2.000 adet üzerinden sunulmakta olup ilave adetlerde birim maliyet avantajı sağlanmaktadır."
  },
  {
    q: "Amerikan servis nedir ve işletmelere ne tür faydalar sağlar?",
    a: "Amerikan servis nedir sorusu; restoran, kafe ve otellerde masa düzenini korumak, servis öncesi düzenli bir alan oluşturmak ve marka tanıtımı yapmak amacıyla kullanılan baskılı servis materyali olarak tanımlanabilir. Amerikan servis altlığı, masa sunumunu zenginleştirirken menü veya kampanya detaylarının müşteriye aktarılmasını sağlar."
  },
  {
    q: "Standart ve özel Amerikan servis ölçüleri nelerdir?",
    a: "Sıkça tercih edilen standart Amerikan servis ölçüleri 31x44 cm (A3 ebadına yakın), 27x38 cm ve 34x49 cm boyutlarıdır. Masa boyutlarına ve servis gereksinimlerine göre bu standart ebatlar seçilebileceği gibi özel ebat talepleri de değerlendirilmektedir."
  },
  {
    q: "90 gr ve 120 gr 1. Hamur ile 100 gr kuşe kağıt seçeneklerinin farkları nelerdir?",
    a: "90 gr 1. Hamur mat dokusuyla doğal bir görünüm sunar ve üzerine kalemle kolayca not alınabilir. 120 gr 1. Hamur daha tok bir gövdeye sahiptir. 100 gr kuşe kağıt ise pürüzsüz ve hafif parlak yüzeyi sayesinde fotoğraf ve renkli görsellerin daha canlı görünmesini sağlar."
  },
  {
    q: "Amerikan servis kağıdı fiyatları hangi unsurlara göre değişir?",
    a: "Amerikan servis kağıdı fiyatları; kâğıt ham maddesinin gramajına, seçilen kâğıt cinsine (1. Hamur veya kuşe), sipariş tirajına ve dönemsel hammadde maliyetlerine bağlı olarak değişiklik gösterir."
  },
  {
    q: "Amerikan servis baskısı üzerine logo ve QR kod eklenebilir mi?",
    a: "Evet. Amerikan servis baskısı tasarımında firma logosu, kurumsal renkler, sosyal medya bilgileri ve dijital menüye yönlendiren QR kodlar yer alabilir. Bu sayede Amerikan servis baskılı tasarımı müşterileriniz için interaktif bir menüye dönüşür."
  },
  {
    q: "Kullan at Amerikan servis seçenekleri pratiklik sağlar mı?",
    a: "Kullan at Amerikan servis ürünleri, her servis döngüsünde yeni bir sayfa serilmesine olanak tanıyarak restoran ve kafelerde hızlı servis hazırlığı ve pratik bir masa düzeni sunar."
  },
  {
    q: "Lokanta servis kağıdı ve kağıt servis altlığı tercih edilirken nelere dikkat edilmelidir?",
    a: "Lokanta servis kağıdı ve kağıt servis altlığı seçiminde masa ölçüsü, servis yoğunluğu ve tasarımın okunabilirliği dikkate alınmalıdır. Doğal ve sade bir sunum için Amerikan servis kağıt seçenekleri, görsel ağırlıklı menüler için ise kuşe Amerikan servis modelleri tercih edilir."
  },
  {
    q: "Fiyat listesinde bulunmayan seçenekler için özel teklif nasıl alınır?",
    a: "Fiyat listesinde yer almayan Amerikan servis kağıt modelleri, farklı gramajlar veya yüksek tirajlı siparişler için web sitemizdeki Özel Teklif Al bağlantısı üzerinden talebinizi ileterek özel teklif alabilirsiniz."
  },
  {
    q: "Amerikan servis kağıdı baskı için tasarım dosyası nasıl hazırlanmalıdır?",
    a: "Amerikan servis kağıdı baskı dosyaları 300 DPI çözünürlükte, CMYK renk modunda ve kesim kenarlarından en az 3 mm taşma payı bırakılarak PDF/X formatında hazırlanmalıdır. Baskıya hazır dosyanız için teknik kontrol ve dijital PDF prova sunulmakta olup sıfırdan tasarım ve kapsamlı düzenlemeler ayrıca fiyatlandırılabilir."
  }
];

// 6 Görsel Galeri Alanı
export const AMERIKAN_SERVIS_GALLERY = [
  {
    filename: "amerikan-servis-baski.webp",
    src: "/images/amerikan-servis/amerikan-servis-baski.webp",
    alt: "Amerikan Servis Baskı Fiyatları ve Kağıt Servis Altlığı Modelleri",
    title: "Amerikan Servis Baskı Fiyatları ve Modelleri",
    desc: "Restoran ve kafeler için renkli ofset baskılı kağıt servis altlığı modelleri."
  },
  {
    filename: "kagit-amerikan-servis.webp",
    src: "/images/amerikan-servis/kagit-amerikan-servis.webp",
    alt: "Kağıt Amerikan Servis Ölçüleri ve 1. Hamur Kağıt Baskı",
    title: "Kağıt Amerikan Servis Ölçüleri",
    desc: "31x44 cm ölçüsünde, geniş masa yerleşimlerine uygun 1. Hamur Amerikan servis baskı örneği."
  },
  {
    filename: "logolu-amerikan-servis.webp",
    src: "/images/amerikan-servis/logolu-amerikan-servis.webp",
    alt: "Logolu ve QR Menülü Kağıt Servis Altlığı Baskısı",
    title: "Logolu Kağıt Servis Altlığı",
    desc: "Marka logosu, sosyal medya hesapları ve dijital menü QR kodlu servis altlığı."
  },
  {
    filename: "placemat-baski.webp",
    src: "/images/amerikan-servis/placemat-baski.webp",
    alt: "Kuşe ve 1. Hamur Placemat Amerikan Servis Baskı",
    title: "Placemat Servis Altlığı Baskısı",
    desc: "Canlı renk geçişleri ve görsel ağırlıklı menüler için placemat servis altlığı."
  },
  {
    filename: "restoran-amerikan-servis.webp",
    src: "/images/amerikan-servis/restoran-amerikan-servis.webp",
    alt: "Restoran ve Lokanta İçin Amerikan Servis Kağıdı",
    title: "Restoran Amerikan Servis Kağıdı",
    desc: "Geniş masalar ve yoğun servisler için lokanta ve restoran servis kağıdı seçeneği."
  },
  {
    filename: "amerikan-servis-baski.webp",
    src: "/images/amerikan-servis/amerikan-servis-baski.webp",
    alt: "Tek Kullanımlık Kullan At Amerikan Servis Baskı Örnekleri",
    title: "Kullan At Amerikan Servis Örnekleri",
    desc: "Pratik masa düzeni ve hızlı servis için tek kullanımlık kullan at Amerikan servis modelleri."
  }
];

export const AmerikanServisPage = () => {
  const { openProductDetail } = useCart();

  const openWhatsApp = (item: any) => {
    openProductDetail({ ...item, miktar: "2.000 Adet" }, "Amerikan Servis");
  };

  // JSON-LD Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": "https://mavibasim.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Amerikan Servis Baskı",
        "item": "https://mavibasim.com/amerikan-servis"
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Amerikan Servis Baskı Fiyatları ve Kağıt Modelleri",
    "image": "https://mavibasim.com/images/amerikan-servis/amerikan-servis-baski-fiyatlari-ve-modelleri.webp",
    "description": "2.000 adet Amerikan servis baskı fiyatlarını inceleyin. 90 gr ve 120 gr 1. hamur ile 100 gr kuşe kağıt servis altlığı seçenekleri.",
    "brand": {
      "@type": "Brand",
      "name": "Mavi Basım"
    },
    "category": "Amerikan Servis Baskı",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "TRY",
      "lowPrice": "3600",
      "highPrice": "4850",
      "offerCount": "3",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": AMERIKAN_SERVIS_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div data-page-root="amerikan-servis" className="bg-white min-h-screen pb-16">
      <Helmet>
        <title>Amerikan Servis Baskı Fiyatları | Kağıt Servis Altlığı</title>
        <meta 
          name="description" 
          content="2.000 adet Amerikan servis baskı fiyatlarını inceleyin. 90 gr ve 120 gr 1. hamur ile 100 gr kuşe kağıt servis altlığı seçenekleri." 
        />
        <link rel="canonical" href="https://mavibasim.com/amerikan-servis" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Breadcrumb Alanı */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="text-xs font-bold text-gray-500 uppercase tracking-tight flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          <ChevronDown size={12} className="-rotate-90 text-gray-400 shrink-0" />
          <span className="text-gray-800 font-extrabold truncate">Amerikan Servis Baskı</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-black">
        
        {/* H1 BAŞLIK */}
        <div className="text-center mb-6">
          <h1 className="text-[19px] md:text-[26px] lg:text-[31px] font-black text-primary uppercase tracking-tight mb-3 leading-tight">
            Amerikan Servis Baskı Fiyatları ve Kağıt Modelleri
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* GİRİŞ METNİ */}
        <div className="max-w-[1200px] mx-auto text-slate-700 text-sm md:text-[15px] leading-relaxed font-semibold text-justify space-y-4 mb-8">
          <p>
            Restoran, kafe, lokanta ve otel gibi yiyecek-içecek işletmelerinde masa düzenini tamamlayan <strong>Amerikan servis baskı</strong> çözümleri, kurumsal kimliğinizi masada sergilemenin ve servis organizasyonunu düzenlemenin pratik bir yoludur. Masalarda kullanılan <strong>kağıt servis altlığı</strong> ürünleri; firmanızın logosunu, güncel menü alternatiflerini, sosyal medya hesaplarını ve dijital menü QR kodlarını müşterilerinizle buluşturur.
          </p>
          <p>
            Farklı masa ebatlarına uygun olarak hazırlanan <strong>Amerikan servis modelleri</strong>; 90 gr 1. Hamur, 100 gr Kuşe ve 120 gr 1. Hamur kâğıt seçenekleriyle sunulmaktadır. Günlük yoğun kullanıma uygun <strong>kullan at Amerikan servis</strong> çeşitleri, her servis döngüsünde yeni bir sayfa açarak masaların düzenli kalmasına yardımcı olur.
          </p>
        </div>

        {/* FİYAT LİSTESİ TABLOSU */}
        <div className="scroll-mt-24 group mb-10" id="fiyat-tablosu">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2 flex-wrap">
                Amerikan Servis Fiyat Listesi
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 text-[11px] font-bold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>Tek Yön - Renkli - 2.000 Adet</span>
            </div>
          </div>

          <p className="text-gray-650 text-xs sm:text-sm font-semibold mb-6 px-2 leading-relaxed">
            Bu sayfadaki standart Amerikan servis baskı paketleri 2.000 adetten başlamaktadır. İlave adetlerin fiyatları tabloda ayrıca gösterilmektedir.
          </p>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-visible relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[11px] md:text-[13px]">
                <thead>
                  <tr className="bg-black text-white border-b border-black">
                    <th className="p-4 w-10"></th>
                    <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                    <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                    <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EBAT</th>
                    <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">AÇIKLAMA</th>
                    <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                    <th className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EKSTRA ADET</th>
                    <th className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                  </tr>
                </thead>
                <tbody>
                  {AMERIKAN_SERVIS_DATA[0].items.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group">
                      {idx === 0 && (
                        <td 
                          rowSpan={AMERIKAN_SERVIS_DATA[0].items.length}
                          className="bg-primary text-white font-black text-center p-1 w-10 border-r border-white/10"
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          <span className="tracking-[0.1em] uppercase text-[10px]">SERVİS</span>
                        </td>
                      )}
                      <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors">{item.code}</td>
                      <td className="p-3 text-center text-black font-medium border-r border-gray-100">2.000 Adet</td>
                      <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.ebat}</td>
                      <td className="p-3 text-center font-medium border-r border-gray-100 text-black">
                        {item.desc}
                        <FeatureTooltip code={item.code} />
                      </td>
                      <td className="p-3 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[14px] md:text-[16px] transition-colors">{item.price}</td>
                      <td className="p-3 text-center font-bold border-r border-gray-100 text-[11px] leading-tight">
                        <span className="text-black">Her </span>
                        <span className="text-primary font-extrabold">2.000 Adet </span>
                        <span className="text-black">için </span>
                        <span className="text-emerald-600 font-extrabold">{item.extraPrice}</span>
                      </td>
                      <td className="p-3 text-center">
                        <button 
                          onClick={() => openWhatsApp(item)} 
                          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
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

            {/* KDV Açıklama Kutusu */}
            <div className="bg-slate-50 px-5 py-3 border-t border-gray-150 rounded-b-2xl flex flex-col sm:flex-row justify-center items-center text-xs text-slate-500 font-medium font-sans">
              <span>* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <FireWarning />
        </div>

        {/* 1. ÖZEL TEKLİF ÇAĞRISI (ÖZEL TEKLİF AL BAĞLANTISI 1) */}
        <div className="mt-8 mb-10 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-150 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Layers size={24} />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-black text-black uppercase tracking-tight">
                Farklı Ölçü, Kağıt ve Adetler İçin Teklif Alın
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Fiyat listesinde yer almayan özel <strong>Amerikan servis ölçüleri</strong>, kâğıt gramajları veya yüksek adetli siparişleriniz için doğrudan teklif isteyebilirsiniz.
              </p>
            </div>
          </div>
          <a
            href={SPECIAL_QUOTE_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-6 py-3 rounded-full text-xs md:text-sm font-black uppercase tracking-tight transition-all shadow-md shrink-0 cursor-pointer"
          >
            <span>Özel Teklif Al</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* KAĞIT MODELLERİ VE SEÇENEKLERİ */}
        <div className="mb-12 text-black">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2 h-8 bg-primary rounded-full" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Amerikan Servis Kağıt Modelleri ve Özellikleri
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch font-medium">
              
              {/* 90 gr 1. Hamur */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">90 gr 1. Hamur Kağıt</h3>
                  <ul className="text-xs text-gray-700 space-y-3 list-none font-semibold">
                    <li><strong className="text-black block mb-0.5">Yüzey Yapısı:</strong> Mat yüzeyli, doğal dokulu ve üzerine kalemle rahatça not alınabilen kullanışlı bir kâğıt türüdür.</li>
                    <li><strong className="text-black block mb-0.5">Gramaj Özelliği:</strong> 90 gr ağırlığıyla günlük restoran ve kafe servis düzeni için ideal bir hafiflik sağlar.</li>
                    <li><strong className="text-black block mb-0.5">Kullanım Alanı:</strong> Lokantalar, esnaf restoranları, kafeler ve menü üzerine not düşülebilen alanlar için uygundur.</li>
                    <li><strong className="text-black block mb-0.5">Öne Çıkan Yönü:</strong> Sade masa sunumu oluşturur ve bütçe dostu bir <strong>Amerikan servis kağıdı</strong> alternatifidir.</li>
                  </ul>
                </div>
              </div>

              {/* 100 gr Kuşe Kağıt */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">100 gr Kuşe Kağıt</h3>
                  <ul className="text-xs text-gray-700 space-y-3 list-none font-semibold">
                    <li><strong className="text-black block mb-0.5">Yüzey Yapısı:</strong> Pürüzsüz ve hafif parlak dokusuyla renklerin ve görsel detayların canlı görünmesini destekler.</li>
                    <li><strong className="text-black block mb-0.5">Gramaj Özelliği:</strong> 100 gr kuşe gövdesi masada düzgün ve estetik bir duruş sergiler.</li>
                    <li><strong className="text-black block mb-0.5">Kullanım Alanı:</strong> Fast food işletmeleri, pastaneler, pizzacılar ve görsel menü kullanan restoranlar için uygundur.</li>
                    <li><strong className="text-black block mb-0.5">Öne Çıkan Yönü:</strong> Ürün fotoğrafları ve renkli reklam alanlarının net aktarılmasını sağlar.</li>
                  </ul>
                </div>
              </div>

              {/* 120 gr 1. Hamur */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">120 gr 1. Hamur Kağıt</h3>
                  <ul className="text-xs text-gray-700 space-y-3 list-none font-semibold">
                    <li><strong className="text-black block mb-0.5">Yüzey Yapısı:</strong> Kalın ve tok yapılı mat kâğıt yüzeyiyle prestijli masa sunumlarını destekler.</li>
                    <li><strong className="text-black block mb-0.5">Gramaj Özelliği:</strong> Üç standart alternatif arasındaki en kalın 1. Hamur seçeneğidir.</li>
                    <li><strong className="text-black block mb-0.5">Kullanım Alanı:</strong> Butik restoranlar, oteller, steakhouse işletmeleri ve özenli masa dekorasyonu arayan markalar.</li>
                    <li><strong className="text-black block mb-0.5">Öne Çıkan Yönü:</strong> 90 gr seçeneğe göre daha tok yapısıyla kurumsal ve düzenli masa sunumlarını destekler.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* GÖRSEL GALERİ ALANI (6 ADET GÖRSEL, MOBİL: 2x3, TABLET & DESKTOP: 3x2) */}
        <div className="mb-12 scroll-mt-24" id="gorsel-galeri">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Amerikan Servis Baskı Örnekleri
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {AMERIKAN_SERVIS_GALLERY.map((img, idx) => (
              <figure 
                key={idx} 
                data-expected-filename={img.filename}
                className="bg-gray-50 border border-gray-150 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="overflow-hidden rounded-xl bg-white mb-3 flex items-center justify-center p-1 w-full aspect-[4/3] relative border border-gray-100">
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    title={img.title} 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105" 
                  />
                </div>
                <div className="mt-1">
                  <h3 className="text-xs sm:text-sm font-black text-black uppercase mb-1 leading-tight">{img.title}</h3>
                  <figcaption className="text-gray-600 text-[11px] sm:text-xs font-semibold leading-relaxed">
                    {img.desc}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        {/* BİLGİLENDİRME VE REHBER ALANLARI */}
        <div className="space-y-8 mb-12 text-black">
          
          {/* Masa Düzeni ve Tek Kullanımlık Sunum */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-gray-150 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
              <h2 className="text-lg md:text-xl font-black text-black uppercase tracking-tight">
                Masa Düzeninde Kağıt Servis Altlığı Kullanımı
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650 text-justify">
              <p>
                Yiyecek-içecek sektöründe masa sunumu, müşterilerin işletmenizle ilk temas noktasıdır. <strong>Kağıt servis altlığı</strong> kullanımı, masalarda temiz bir görsel zemin oluştururken tabak ve bardakların masa yüzeyiyle temasını düzenler. Tek kullanımlık yapısıyla her misafire taze bir masa deneyimi sunulmasını kolaylaştırır.
              </p>
              <p>
                <strong>Lokanta servis kağıdı</strong> olarak da bilinen bu ürünler, işletmeler için pratik bir servis hazırlığı sağlar. Masanın hızlıca toplanıp bir sonraki servise hazır hale getirilmesine katkıda bulunur.
              </p>
            </div>
          </section>

          {/* Dosya Hazırlık ve Teknik Kontrol Rehberi */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-gray-150 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
              <h2 className="text-lg md:text-xl font-black text-black uppercase tracking-tight">
                Amerikan Servis Baskı Dosyası Hazırlık Kriterleri
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs mb-2">1</div>
                <h4 className="font-black text-black uppercase text-xs mb-1">Ebat ve Taşma Payı</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Tasarım ebadına dıştan en az 3 mm kesim taşma payı (bleed) eklenmeli, yazılar kesim çizgisinden 4 mm içeride tutulmalıdır.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs mb-2">2</div>
                <h4 className="font-black text-black uppercase text-xs mb-1">Renk ve Çözünürlük</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Dosyanın CMYK renk modunda ve görsellerin en az 300 DPI çözünürlükte hazırlanması baskıya uygun teknik hazırlığa yardımcı olur. Ekran ve baskı arasında ton farklılıkları oluşabilir.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs mb-2">3</div>
                <h4 className="font-black text-black uppercase text-xs mb-1">Vektörel Fontlar</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Çalışmadaki tüm yazı tipleri eğriye (convert) dönüştürülmeli, logonun vektörel formatta yer almasına özen gösterilmelidir.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs mb-2">4</div>
                <h4 className="font-black text-black uppercase text-xs mb-1">Teknik Kontrol & Prova</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Baskıya hazır dosyanız için teknik kontrol ve PDF provası sunulmaktadır. Sıfırdan tasarım ve kapsamlı revizyonlar ayrıca fiyatlandırılabilir.
                </p>
              </div>
            </div>
          </section>

          {/* Hizmet Noktası ve Teslimat Bilgilendirmesi */}
          <section className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
              <h3 className="text-base md:text-lg font-black text-black uppercase tracking-tight">
                Sipariş, Koordinasyon ve Teslimat Süreci
              </h3>
            </div>
            <div className="space-y-2 text-xs sm:text-sm font-semibold text-gray-650 leading-relaxed">
              <p>
                Siparişleriniz, <strong>İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası</strong> üzerinden planlanmakta ve süreçleri takip edilmektedir.
              </p>
              <p>
                Teslimat süresi; sipariş adedi, baskı dosyasının onaylanması, kâğıt seçimi ve dönemsel iş yoğunluğuna bağlı olarak teklif ve sipariş aşamasında tarafınıza bildirilmektedir.
              </p>
            </div>
          </section>

        </div>

        {/* 2. ÖZEL TEKLİF VE DESTEK ÇAĞRISI (ÖZEL TEKLİF AL BAĞLANTISI 2) */}
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-250 rounded-3xl p-6 md:p-8 shadow-sm mb-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 text-black">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-black uppercase tracking-wider">
              Hızlı İletişim &amp; Teklif
            </span>
            <h3 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight leading-tight">
              Özel Ölçü ve Adetler İçin Teklif Alın
            </h3>
            <p className="text-xs sm:text-sm text-gray-650 font-semibold leading-relaxed">
              İhtiyacınıza uygun Amerikan servis kağıdı baskı seçenekleri, kurumsal logo mizanpajı ve özel adet talepleriniz için WhatsApp destek hattımızdan bize ulaşabilirsiniz.
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
            <div className="text-center md:text-right">
              <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Destek ve Sipariş Hattı</span>
              <span className="block text-base md:text-lg font-black text-black tracking-tight flex items-center gap-1.5 justify-center md:justify-end">
                <Phone size={16} className="text-emerald-600 shrink-0" />
                0536 602 23 73
              </span>
            </div>
            <a 
              href={SPECIAL_QUOTE_WHATSAPP_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3.5 rounded-full text-xs md:text-sm font-black tracking-tight transition-all shadow-md hover:scale-105 active:scale-95 duration-200 cursor-pointer"
            >
              <Phone size={16} className="fill-current rotate-12 shrink-0" />
              <span>Özel Teklif Al</span>
            </a>
          </div>
        </div>

        {/* SSS (FAQ) ALANI - 10 SORU (MOBİL: 1 SÜTUN, TABLET & DESKTOP: 2 SÜTUN) */}
        <div className="mb-12 text-black scroll-mt-24" id="faq-section">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Sıkça Sorulan Sorular
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {AMERIKAN_SERVIS_FAQS.map((faq, idx) => (
              <div key={idx} className="h-full border border-gray-200 rounded-2xl p-5 bg-white shadow-xs flex flex-col justify-between text-black">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2.5 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    <span className="leading-snug">{faq.q}</span>
                  </h3>
                  <div className="h-px bg-gray-100 my-2.5 w-full" />
                  <p className="text-slate-650 text-xs sm:text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Rehberleri */}
        <div className="my-10">
          <RelatedBlogPosts category="amerikan-servis" />
        </div>

        {/* İlgili Ürünler */}
        <section className="mb-10">
          <h2 className="text-lg md:text-xl font-black text-black mb-3 uppercase tracking-tight text-center">İlgili Matbaa Çözümleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Adisyon Baskı", desc: "Restoran ve kafeler için kendinden karbonlu adisyon basımı.", path: "/adisyon" },
              { title: "Sipariş Fişi", desc: "Sipariş alımı ve mutfak takibi için pratik sipariş fişleri.", path: "/siparis-fisi" },
              { title: "Broşür Baskı", desc: "Kampanya ve menü duyurularınız için kaliteli broşürler.", path: "/brosur" },
              { title: "Karton Çanta", desc: "Paket servis ve teslimatlar için logo baskılı karton çantalar.", path: "/karton-canta" }
            ].map((product, idx) => (
              <Link key={idx} to={product.path} className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all">
                <h3 className="text-sm font-black text-black mb-1 group-hover:text-primary transition-colors">{product.title}</h3>
                <p className="text-xs font-medium text-gray-500 mb-3">{product.desc}</p>
                <span className="text-primary font-black text-[10px] uppercase tracking-widest group-hover:text-secondary transition-colors">İncele →</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AmerikanServisPage;
