import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ShoppingCart, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { 
  useCart, 
  KARTVIZIT_DATA, 
  FireWarning 
} from '../App';
import { CategoryHero } from './CategoryHero';
import { BLOG_POSTS } from '../data/blogData';

// Özel teklif WhatsApp mesajı ve linki
const SPECIAL_QUOTE_MESSAGE = "Merhaba, web sitenizdeki /kartvizit sayfasından ulaşıyorum. Fiyat listesinde bulunmayan kartvizit adedi, ölçüsü, kağıt türü, gramajı, kesim veya baskı sonrası uygulaması için özel teklif almak istiyorum.";
const SPECIAL_QUOTE_WHATSAPP_LINK = `https://wa.me/905366022373?text=${encodeURIComponent(SPECIAL_QUOTE_MESSAGE)}`;

// 10 Adet Senkronize Sıkça Sorulan Sorular Listesi
export const KARTVIZIT_FAQS = [
  {
    q: "Kartvizit nedir ve hangi bilgiler bulunmalıdır?",
    a: "Kartvizit; bir kurumun veya profesyonelin iletişim bilgilerini, unvanını ve marka kimliğini karşı tarafa ileten basılı tanıtım kartıdır. Standart bir kartvizit baskı üzerinde firma logosu, ad-soyad, unvan, telefon, e-posta, web sitesi adresi ve isteğe bağlı olarak dijital menü veya kurumsal portföye yönlendiren QR kod yer almalıdır."
  },
  {
    q: "Kartvizit ölçüleri nasıl belirlenir?",
    a: "Kartvizit ölçüleri seçilen kesim ve modele göre sipariş aşamasında netleştirilir. Cüzdan ve kartlıklara pratik uyum sağlayan standart ebatların yanı sıra oval köşe kesimli veya özel bıçak kesimli modellerde farklı ebat seçenekleri tercih edilebilir."
  },
  {
    q: "100, 500 ve 1.000 adet seçenekleri nelerdir?",
    a: "Standart kağıt kartvizit paketlerimiz 1.000 adetten başlamaktadır. 100 kartvizit veya kartvizit fiyatları 100 adet gibi ara adetler standart fiyat listesinde bulunmamakta olup özel teklif kapsamında değerlendirilmektedir. Plastik PVC modelimiz ise kartvizit fiyatları 500 adet olarak listelenmiştir; kağıt modellerde 500 adet standart tabloda yer almamaktadır."
  },
  {
    q: "Kartvizit fiyatları hangi özelliklere göre değişir?",
    a: "Kartvizit fiyatları; seçilen kâğıt gramajı (250 gr, 350 gr, 400 gr, 700 gr veya 800 gr), baskı yönü (tek yön veya çift yön), selefon kaplama (mat veya parlak), kabartma lak, altın yaldız, özel kesim ve adet tirajına göre değişiklik gösterir. Kalın kartvizit fiyatları ve kabartmalı kartvizit fiyatları uygulanan ek işçilik ve malzeme katmanlarına göre farklılaşır."
  },
  {
    q: "Kalın kartvizit kağıdı ve 700–800 gr sıvama nedir?",
    a: "Kalın kartvizit kağıdı, iki veya daha fazla katman kartonun özel presleme yöntemiyle birleştirilmesiyle oluşturulur. 700 gr ve 800 gr kalın sıvama kartvizit ve kalın karton kartvizit çeşitleri, yüksek rijitliği ve bükülmeye karşı tok gövdesiyle üst segment prestij arayan yöneticiler ve markalar tarafından tercih edilir."
  },
  {
    q: "Kabartmalı kartvizit ile laklı kartvizit arasındaki ilişki nedir?",
    a: "Kabartmalı kartvizit veya laklı kartvizit modellerinde mat selefon kaplı yüzey üzerine şeffaf özel lak tabakası uygulanır. Bu sayede logonuz ve belirlenen grafik alanlar ışıkta parlayarak parmakla dokunulduğunda hissedilir bir kabartma dokusu kazanır. Kalın laklı kartvizit ve kalın kabartmalı kartvizit seçenekleri tok kâğıt yapısıyla estetik bir derinlik sunar."
  },
  {
    q: "Mat ve parlak selefon arasındaki fark nedir?",
    a: "Mat selefon kaplama yansıma yapmayan, şık ve kurumsal bir görünüm sunar ve üzerine kabartma lak uygulamasına imkan tanır. Parlak selefon ise renk tonlarını daha canlı ve ışıltılı gösteren koruyucu bir yüzey sağlar; ancak üzerine kalemle kolay not yazmaya elverişli değildir."
  },
  {
    q: "Özel kesim, oval kesim ve altın yaldız nasıl seçilir?",
    a: "Özel kesim ve oval kesim modellerinde standart dikdörtgen köşelerin dışına çıkılarak markanızın sektörüne veya tasarımınıza uygun geometrik formlar ve yumuşatılmış köşeler elde edilir. Altın yaldız uygulaması ise logo, unvan veya kenar çerçevelerinde metalik altın parıltısı oluşturarak prestijli bir görsel etki sağlar."
  },
  {
    q: "Kartvizit tasarım dosyası nasıl hazırlanır?",
    a: "Baskı öncesinde kartvizit tasarla ve dosya hazırlığı sürecinde CMYK renk modu ve en az 300 DPI çözünürlük tercih edilmelidir. Kesim toleransı için her kenardan 3 mm taşma payı bırakılmalı ve metinler eğriye (convert/outline) dönüştürülmelidir. Baskıya hazır dosyalarınız için teknik kontrol ve dijital PDF prova sunulmakta olup sıfırdan tasarım ve kapsamlı revizyonlar ayrıca fiyatlandırılabilir."
  },
  {
    q: "Teslim süresi ve listede olmayan seçenekler nasıl belirlenir?",
    a: "Teslim süresi; talep edilen kartvizit modeli, sipariş adedi, baskıya hazır dosya onayı, baskı sonrası lak/yaldız/özel kesim uygulamaları ve operasyonel yoğunluğa bağlı olarak teklif veya sipariş aşamasında netleştirilir. Fiyat listesinde bulunmayan ara adet, özel ölçü ve özel kâğıt talepleri için web sitemizdeki Özel Teklif Al bağlantısı üzerinden bilgi alabilirsiniz."
  }
];

// 6 Görsel Galeri Alanı
export const KARTVIZIT_GALLERY = [
  {
    filename: "kartvizit-baski.webp",
    src: "/images/kartvizit/kartvizit-baski.webp",
    alt: "Kartvizit Baskı Fiyatları ve 1.000 Adet Kalın Kartvizit Modelleri",
    title: "Kartvizit Baskı Fiyatları ve Modelleri",
    desc: "250 gr'dan 800 gr'a kadar mat selefonlu, laklı ve sıvama kartvizit çeşitleri."
  },
  {
    filename: "kartvizit-baski-detayi.webp",
    src: "/images/kartvizit/kartvizit-baski-detayi.webp",
    alt: "350 gr Kuşe Mat Selefonlu Kurumsal Kartvizit Detayı",
    title: "350 gr Mat Selefonlu Kartvizit",
    desc: "Yansıma yapmayan pürüzsüz dokusuyla kurumsal kimlik için standart mat kartvizit."
  },
  {
    filename: "kartvizit-ornegi.webp",
    src: "/images/kartvizit/kartvizit-ornegi.webp",
    alt: "Kabartma Laklı ve Özel Dokulu Kartvizit Örnekleri",
    title: "Kabartma Laklı Kartvizit Örnekleri",
    desc: "Logo ve seçili alanlarda parlayan 3D hissedilir kabartma lak uygulaması."
  },
  {
    filename: "kartvizit-tasarimi.webp",
    src: "/images/kartvizit/kartvizit-tasarimi.webp",
    alt: "Özel Tasarım ve Kurumsal Kartvizit Grafiği",
    title: "Kurumsal Kartvizit Tasarımı",
    desc: "İki kat kartonun sıvama yöntemiyle birleştirilmesiyle hazırlanan daha tok yapılı kartvizit örneği."
  },
  {
    filename: "kartvizit-yakin-cekim.webp",
    src: "/images/kartvizit/kartvizit-yakin-cekim.webp",
    alt: "Özel Kesim ve Oval Köşeli Kartvizit Modelleri",
    title: "Özel Kesim ve Oval Kartvizit",
    desc: "Yuvarlatılmış köşeler ve sektöre özel bıçak kesimli estetik kartvizit formları."
  },
  {
    filename: "plastik-pvc-kartvizit.webp",
    src: "/images/kartvizit/plastik-pvc-kartvizit.webp",
    alt: "Beyaz ve Şeffaf Plastik PVC Kartvizit Baskı Örnekleri",
    title: "PVC Kartvizit Baskı Örnekleri",
    desc: "Beyaz plastik PVC malzemeli, çift taraf renkli ve oval kesimli kartvizit örneği."
  }
];

export const KartvizitPage = () => {
  const { openProductDetail } = useCart();

  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Kartvizit");
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
        "name": "Kartvizit Baskı",
        "item": "https://mavibasim.com/kartvizit"
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Kartvizit Baskı Fiyatları ve Kalın Kartvizit Modelleri",
    "image": "https://mavibasim.com/images/kartvizit/kartvizit-baski.webp",
    "description": "1.000 adet kartvizit baskı fiyatlarını inceleyin. 250–800 gr, mat veya parlak selefon, kabartma lak, sıvama, özel kesim ve PVC seçenekleri.",
    "brand": {
      "@type": "Brand",
      "name": "Mavi Basım"
    },
    "category": "Kartvizit Baskı",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "TRY",
      "lowPrice": "840",
      "highPrice": "4400",
      "offerCount": "17",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": KARTVIZIT_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div data-page-root="kartvizit" className="bg-white min-h-screen pb-16">
      <Helmet>
        <title>Kartvizit Baskı Fiyatları | 1.000 Adet ve Kalın Kartvizit</title>
        <meta 
          name="description" 
          content="1.000 adet kartvizit baskı fiyatlarını inceleyin. 250–800 gr, mat veya parlak selefon, kabartma lak, sıvama, özel kesim ve PVC seçenekleri." 
        />
        <link rel="canonical" href="https://mavibasim.com/kartvizit" />
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

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-xs text-gray-500 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-900 font-semibold">Kartvizit Baskı</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <CategoryHero
          title="Kartvizit Baskı Fiyatları ve Kalın Kartvizit Modelleri"
          badge="250–800 gr · Kabartma Lak · Sıvama · Özel Kesim · PVC"
          description={
            <p>
              Kurumsal kimliğinizi ve iletişim bilgilerinizi temsil eden <strong>kartvizit baskı</strong> ve <strong>kalın kartvizit</strong> modellerinde zengin kağıt ve yüzey işleme seçenekleri sunuyoruz. 250 gr'dan 800 gr'a uzanan gramajlar, mat ve parlak selefon kaplamalar, özel kabartma lak, altın yaldız, özel kesim ve PVC alternatifleriyle <strong>kartvizit sipariş</strong> ve <strong>kartvizit bastırma</strong> süreçlerinizi kolaylaştırıyoruz. Siparişleriniz <strong>İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası</strong> üzerinden koordine edilerek anlaşmalı kargo ile tarafınıza ulaştırılır.
            </p>
          }
          relatedLinks={[
            { label: "Broşür Baskı", path: "/brosur" },
            { label: "Antetli Kağıt", path: "/antetli" },
            { label: "Cepli Dosya", path: "/dosyalar" },
            { label: "Sticker Etiket", path: "/etiket" }
          ]}
          customCtaText="Özel Teklif Al"
          customCtaLink={SPECIAL_QUOTE_WHATSAPP_LINK}
        />

        {/* Fiyat Tablosu Alanı */}
        <section id="fiyat-tablosu" className="mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 px-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-black">
                Kartvizit Fiyat Tablosu (17 Gerçek Ürün Seçeneği)
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                250–800 gr kalınlıklar, mat/parlak selefon, kabartma lak, sıvama, yaldız, özel kesim ve PVC alternatifleri.
              </p>
            </div>
            <div className="mt-2 md:mt-0 text-xs font-semibold text-gray-500">
              * Fiyatlarımıza %20 KDV dahil değildir.
            </div>
          </div>

          <p className="text-gray-650 text-xs sm:text-sm font-semibold mb-6 px-2 leading-relaxed">
            Aşağıdaki tabloda güncel <strong>kartvizit fiyatları</strong>, <strong>kalın kartvizit fiyatları</strong> ve <strong>kartvizit fiyatları 1000 adet</strong> seçenekleri yer almaktadır. Kağıt kartvizit modellerimiz standart olarak 1.000 adet üzerinden üretilmektedir. Plastik PVC modelimiz ise 500 adetlik tiraj ile sunulmaktadır. Fiyat listesinde yer almayan ara adetler veya özel projeler için teklif alabilirsiniz.
          </p>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px] text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-900 text-white text-xs uppercase tracking-wider font-bold">
                    <th scope="col" className="py-4 px-1 text-center w-7 sm:w-8" title="Grup"></th>
                    <th scope="col" className="py-4 px-3 sm:px-4 text-center w-20">Kod</th>
                    <th scope="col" className="py-4 px-4 sm:px-6">Ürün Açıklaması &amp; Özellikler</th>
                    <th scope="col" className="py-4 px-3 sm:px-4 text-center w-28 whitespace-nowrap">Adet</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 text-right w-32 whitespace-nowrap">FİYAT</th>
                    <th scope="col" className="py-4 px-3 sm:px-4 text-center w-40 whitespace-nowrap">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {KARTVIZIT_DATA.map((category: any, cIdx: number) => (
                    <React.Fragment key={cIdx}>
                      {category.items.map((item: any, iIdx: number) => (
                        <tr 
                          key={`${cIdx}-${iIdx}`} 
                          className="hover:bg-blue-50/40 transition-colors group"
                        >
                          {iIdx === 0 && (
                            <td 
                              rowSpan={category.items.length}
                              className={`${category.color} text-white font-black text-center p-1 w-7 sm:w-8 border-r border-white/20 select-none`}
                              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                            >
                              <span className="tracking-[0.12em] uppercase text-[10px] font-bold inline-block py-1">
                                {category.cat}
                              </span>
                            </td>
                          )}
                          <td className="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">
                            {item.code}
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-gray-800 font-medium">
                            <div className="flex items-center gap-2">
                              {item.isNew && item.code !== 'PVC' && (
                                <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase shrink-0">
                                  Yeni
                                </span>
                              )}
                              <span>{item.code === 'PVC' ? 'Beyaz plastik PVC kartvizit – çift taraf renkli – oval kesim' : item.desc}</span>
                            </div>
                            {item.note && (
                              <div className="text-[11px] text-red-600 font-bold mt-1">
                                {item.note}
                              </div>
                            )}
                          </td>
                          <td className="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">
                            {item.miktar || "1.000 ADET"}
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 group-hover:bg-blue-50/20 whitespace-nowrap">
                            {item.price}
                          </td>
                          <td className="py-4 px-3 sm:px-4 text-center">
                            <button 
                              onClick={() => openWhatsApp(item)}
                              className="inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-secondary text-white px-3.5 py-2 rounded-xl text-xs font-black tracking-tight transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                            >
                              <ShoppingCart size={14} className="shrink-0" />
                              <span>Hemen Sipariş Ver</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4">
            <FireWarning />
          </div>
        </section>

        {/* Özel Teklif Banner Alanı (2. WhatsApp Bağlantısı) */}
        <section className="my-12 bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-800/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full">
                <Sparkles size={14} />
                Özel Ölçü &amp; Tiraj Seçenekleri
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Fiyat Listesinde Bulunmayan Bir Kartvizit Mi Arıyorsunuz?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                Farklı adetler, fantezi dokulu özel kağıtlar, çift taraflı altın yaldız, gofre kabartma veya özel kalıp kesimli kartvizit talepleriniz için özel teklif alabilirsiniz.
              </p>
            </div>
            <div className="shrink-0">
              <a
                href={SPECIAL_QUOTE_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-black text-sm uppercase px-6 py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95"
              >
                <span>Özel Teklif Al</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* 6 Görsel Galeri Alanı */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <span className="w-2.5 h-6 bg-primary rounded-full" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Kartvizit Örnekleri ve Baskı Modelleri
              </h2>
              <p className="text-slate-500 font-medium text-xs sm:text-sm mt-0.5">
                İstanbul Topkapı 2. Matbaacılar Sitesi koordinasyonunda hazırlanan farklı gramaj, selefon ve özel lak uygulamalı kartvizit örnekleri:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {KARTVIZIT_GALLERY.map((img, idx) => (
              <div 
                key={idx}
                data-expected-filename={img.filename}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                  <img 
                    src={img.src} 
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-[11px] font-bold text-white leading-tight">
                      {img.title}
                    </span>
                  </div>
                </div>
                <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1 leading-snug">
                      {img.title}
                    </h3>
                    <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">
                      {img.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kartvizit Türleri & Materyal Rehberi */}
        <section className="mb-14 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <span className="w-2.5 h-6 bg-primary rounded-full" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Kartvizit Türleri ve Doğru Kağıt Seçim Rehberi
              </h2>
              <p className="text-slate-500 font-medium text-xs sm:text-sm mt-0.5">
                Kullanım amacınıza, sektörünüze ve hedef kitlenize göre en uygun kartvizit materyalini belirleyin:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="text-xs font-black text-primary uppercase tracking-wider mb-1">Bütçe Dostu &amp; Pratik</div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Eko &amp; Standart Kartlar</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-4">
                  250 gr Bristol veya 350 gr Kuşe kağıda uygulanan tek veya çift yönlü baskı seçeneğidir. Standart paketlerimiz 1.000 adetten başlar; <strong>100 kartvizit</strong> veya <strong>kartvizit fiyatları 100 adet</strong> gibi ara tirajlar standart listede yer almamaktadır. Mühür basılacak veya tükenmez kalemle not yazılacak kullanımlar için mat veya arka yüzü selefonsuz modeller tercih edilebilir.
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700">
                💡 İdeal Kullanım: Toptan dağıtım, servis fişi, randevu kartları.
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="text-xs font-black text-purple-600 uppercase tracking-wider mb-1">Şık &amp; Doku Vurgulu</div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Kabartma Laklı &amp; Özel Kesim</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-4">
                  Mat selefon kaplama üzerine uygulanan özel şeffaf kabartma lak sayesinde logonuz ve grafik öğeleriniz parmağınızla dokunulduğunda hissedilir. Şık bir <strong>kabartmalı kartvizit</strong> ve <strong>laklı kartvizit</strong> çözümü için <strong>kabartmalı kartvizit fiyatları</strong> tablomuzdaki seçenekleri değerlendirebilirsiniz.
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700">
                💡 İdeal Kullanım: Kurumsal şirketler, mimarlar, ajanslar, danışmanlar.
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="text-xs font-black text-orange-600 uppercase tracking-wider mb-1">Maksimum Prestij</div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Kalın Kartvizit Baskı Seçenekleri</h3>
                <div className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-4 space-y-2">
                  <p>
                    Kalın kartvizit baskı, iki kartonun sıvama yöntemiyle bir araya getirilmesiyle daha tok bir yapı sunan seçenekleri kapsar. Kalın karton kartvizit için fiyat tablosunda 700 ve 800 gr alternatifleri bulunmaktadır.
                  </p>
                  <p>
                    Kalın kabartmalı kartvizit veya kalın laklı kartvizit isteyenler, kabartma lak uygulamalı modelleri inceleyebilir. Kabartmalı kartvizit fiyatları; karton gramajına, selefon seçimine ve lak uygulamasına göre değişir.
                  </p>
                  <p>
                    Kalın kartvizit basımı için kullanılan 700–800 gr kalın kartvizit kağıdı ve kalın sıvama kartvizit seçenekleri, fiyat tablosunda ürün kodlarına göre ayrı ayrı gösterilmektedir.
                  </p>
                  <p>
                    PVC satırındaki kartvizit fiyatları 500 adet içindir; 500 adet kağıt kartvizit paketi standart fiyat listesinde bulunmamaktadır. 100 kartvizit ve kartvizit fiyatları 100 adet seçenekleri de standart tabloda yer almadığından bu adetler için özel teklif alınmalıdır.
                  </p>
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700">
                💡 İdeal Kullanım: Üst düzey yöneticiler, lüks markalar, VIP iş ortaklıkları.
              </div>
            </div>
          </div>
        </section>

        {/* Sipariş ve Baskı Aşamaları */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                <span className="w-2 h-5 bg-primary rounded-full"></span>
                4 Adımda Hızlı Kartvizit Siparişi
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { step: "1", title: "Model & Gramaj", desc: "250–800 gr kağıt, lak veya sıvama seçeneğini belirleyin." },
                  { step: "2", title: "Dosya Gönderimi", desc: "Kartvizit tasarla adımında hazırlanan PDF veya AI dosyanızı iletin." },
                  { step: "3", title: "Dijital Prova", desc: "Teknik kontrol sonrası dijital PDF provayı onaylayın." },
                  { step: "4", title: "Üretim & Teslimat", desc: "Topkapı koordinasyonu ile basılarak anlaşmalı kargoya verilir." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                    <div className="text-primary font-black text-sm mb-1">Adım {item.step}</div>
                    <div className="font-bold text-slate-900 mb-0.5">{item.title}</div>
                    <div className="text-slate-500 font-medium text-[11px]">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-amber-50/80 p-6 sm:p-8 rounded-3xl border border-amber-200/80 flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-amber-950 uppercase tracking-tight mb-4 flex items-center gap-2">
                <ShieldCheck className="text-amber-600" size={22} />
                Baskı Öncesi Dosya Hazırlık Kontrolü
              </h3>
              <p className="text-xs text-amber-950 font-medium mb-3">
                <strong>Kartvizit nedir</strong> ve <strong>kartvizit ölçüleri</strong> nasıl planlanır sorusuna yönelik olarak, baskı öncesi dikkat edilmesi gereken teknik detaylar:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-amber-900">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 shrink-0" />
                  <span><strong>CMYK Renk Modu:</strong> Baskı tasarımlarınızı RGB yerine CMYK formatında hazırlayın.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 shrink-0" />
                  <span><strong>3 mm Taşma Payı:</strong> Kesim toleransı için çalışma alanının her kenarından 3 mm pay bırakın.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 shrink-0" />
                  <span><strong>Yazıları Eğriye Çevirme:</strong> Yazı karakterlerini (font) convert / outline yaparak kaydedin.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 p-3 bg-white/80 rounded-xl border border-amber-200 text-xs font-bold text-amber-900">
              💡 Baskıya hazır dosyalarınız için teknik kontrol ve dijital PDF prova sunulmaktadır; sıfırdan tasarım veya kapsamlı revizyonlar ayrıca fiyatlandırılabilir.
            </div>
          </section>
        </div>

        {/* Sıkça Sorulan Sorular (10 Soru / Cevap) */}
        <section id="sss" className="mb-14">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <span className="w-2.5 h-6 bg-primary rounded-full" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Kartvizit Baskı Hakkında Sıkça Sorulan Sorular
              </h2>
              <p className="text-slate-500 font-medium text-xs sm:text-sm mt-0.5">
                Kartvizit modelleri, kağıt gramajları, adet seçenekleri ve teslimat süreçleri hakkında detaylı bilgiler:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {KARTVIZIT_FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className="h-full bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-gray-900 mb-2 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <div className="h-px bg-gray-100 my-2.5 w-full" />
                  <p className="text-xs sm:text-sm text-gray-650 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* İlgili Blog Yazıları */}
        <section className="my-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/60">
            <div>
              <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest mb-1">
                <Sparkles size={16} />
                <span>Matbaa Akademisi &amp; Rehberler</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                İlgili Matbaa &amp; Tasarım Rehberleri
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BLOG_POSTS.filter(p => p.slug === "kartvizit-tasarimi-ve-baski-rehberi" || p.slug === "lakli-kabartmali-kartvizit-rehberi").map((post, index) => (
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
                      title={post.title}
                      className="focus:outline-none"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                    <UserCheck size={13} className="text-primary" />
                    <span>Mavi Basım Editörü</span>
                  </span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                  >
                    <span>Oku</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
