import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Printer, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  ShoppingCart, 
  ChevronDown, 
  ChevronRight, 
  Ruler, 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  Type, 
  Eye, 
  QrCode, 
  Maximize2, 
  Building2, 
  ShoppingBag, 
  Store, 
  Music, 
  Ticket, 
  Megaphone, 
  Landmark, 
  Calendar, 
  GraduationCap, 
  UtensilsCrossed, 
  Crosshair, 
  Award, 
  AlertTriangle,
  FileCheck,
  Image as ImageIcon
} from 'lucide-react';
import { AFIS_DATA } from '../data/productData';
import { CategoryHero } from './CategoryHero';
import { RelatedBlogPosts } from './RelatedBlogPosts';
import { WhatsAppIcon } from './WhatsAppIcon';

const WA_PHONE = "905366022373";
const WA_BASE = `https://wa.me/${WA_PHONE}`;

// KAĞIT KARŞILAŞTIRMASI VERİLERİ
const KAGIT_KARSILASTIRMASI = [
  {
    badge: "Ekonomik & Geniş Dağıtım",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    title: "105 gr Parlak Kuşe Afiş",
    features: [
      "Hafif ve pratik yapıştırma avantajı",
      "Yüksek tirajlı kampanya ve indirim duyuruları",
      "Geniş alan sokak ve bina afişlemeleri için ekonomik afiş kağıdı",
      "Ofset baskıda canlı renk doyum oranı"
    ],
    recommendedFor: "Geniş alan kampanya, indirim, duyuru ve reklam afiş baskı çalışmaları."
  },
  {
    badge: "Standart Vitrin & İç Mekan",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
    title: "135 gr Parlak Kuşe Afiş",
    features: [
      "İdeal kağıt tokluğu; arka gösterimini azaltmaya yardımcı olan yapı",
      "Mağaza içi, koridor ve vitrin camı uygulamaları",
      "Canlı görsel ve fotoğraf baskılarında dengeli kontrast",
      "Işık yansımasını kıran dengeli parlak yüzey"
    ],
    recommendedFor: "Mağaza vitrinleri, AVM panoları ve etkinlik afiş poster baskı uygulamaları."
  },
  {
    badge: "Premium & Sergi Posteri",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    title: "170 gr Tok Kuşe Poster",
    features: [
      "Kalın ve tok gövde yapısıyla daha dengeli bir duruş sunabilir",
      "Çerçeve içi ve uygun asma afiş çıtalarında kullanım için değerlendirilebilir",
      "Sergi, sinema, tiyatro ve sanat lansmanları",
      "İsteğe bağlı mat veya parlak selefon kaplama imkanı"
    ],
    recommendedFor: "Sanat sergileri, konser posterleri ve kurumsal çerçeveli afiş poster örnekleri."
  },
  {
    badge: "Dış Mekan & Billboard",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    title: "120 gr Blueback Dış Mekan Kağıdı",
    features: [
      "Mavi arka yüzeyiyle alttaki görselin görünürlüğünü azaltır",
      "Billboard, raket ve sokak duvarı panoları için özel afiş kağıdı",
      "Su bazlı afiş tutkallarıyla uyumlu yapı",
      "Geniş format dış mekan pano standardı"
    ],
    recommendedFor: "Açık hava billboardları, sokak panoları ve kentsel pano yapıştırmaları."
  }
];

// 14 SEKTÖREL KULLANIM ALANI VERİSİ
const KULLANIM_ALANLARI = [
  { icon: ShoppingBag, title: "Perakende & Mağazacılık", desc: "İndirim, sezon sonu ve yeni kreasyon tanıtımları" },
  { icon: UtensilsCrossed, title: "Restoran & Kafe", desc: "Yeni menü lansmanları ve şube açılış duyuruları" },
  { icon: Music, title: "Konser & Festival", desc: "Sahne sanatları, bilet satış ve müzik etkinlikleri" },
  { icon: Building2, title: "Gayrimenkul & Emlak", desc: "Satılık, kiralık ve proje lansman posterleri" },
  { icon: Store, title: "Süpermarket & AVM", desc: "Haftalık indirim bültenleri ve kampanya afişleri" },
  { icon: Ticket, title: "Sinema & Tiyatro", desc: "Film vizyon tarihleri ve oyun tanıtım afişleri" },
  { icon: Megaphone, title: "Siyasi & Seçim", desc: "Miting duyuruları ve aday tanıtım çalışmaları" },
  { icon: Landmark, title: "Belediye & Kamu", desc: "Kültür sanat takvimi ve resmi duyuru panoları" },
  { icon: Calendar, title: "Fuar & Kongre", desc: "Sektörel etkinlik, stant ve sempozyum afişleri" },
  { icon: GraduationCap, title: "Eğitim & Kurslar", desc: "Erken kayıt indirimleri ve bursluluk sınav afişleri" },
  { icon: Crosshair, title: "Spor & Fitness", desc: "Salon üyelik kampanyaları ve turnuva duyuruları" },
  { icon: Award, title: "Kültür & Sanat", desc: "Resim sergileri, atölyeler ve müze afişleri" },
  { icon: Sparkles, title: "Güzellik & Kuaför", desc: "Sezon bakım paketleri ve özel işlem tanıtımları" },
  { icon: Building2, title: "Otomotiv & Servis", desc: "Mevsimlik servis kampanyaları ve araç tanıtımları" }
];

// GALERİ ÖRNEKLERİ
const AFIS_GALLERY = [
  {
    filename: "afis-baski-fiyatlari.webp",
    src: "/images/afis/afis-baski-fiyatlari.webp",
    title: "Afiş Baskı Fiyatları ve Çeşitleri",
    desc: "105 gr, 135 gr ve 170 gr kuşe kâğıt seçenekleriyle farklı ebatlarda ofset afiş baskı çözümleri.",
    badge: "105 - 170 gr Kuşe"
  },
  {
    filename: "duvar-afisi-ornegi.webp",
    src: "/images/afis/duvar-afisi-ornegi.webp",
    title: "Duvar Afişi ve Poster Baskı Örneği",
    desc: "34×49 cm ve 49×69 cm net kesim ölçüleri ile büyük afiş boyutlarının karşılaştırmalı sunumu.",
    badge: "Duvar Afişi"
  },
  {
    filename: "afis-ve-poster-baski.webp",
    src: "/images/afis/afis-ve-poster-baski.webp",
    title: "Kuşe Afiş ve Poster Baskı",
    desc: "Ekonomik ve tok gramajlı afiş kağıdı dokuları, parlak yüzey yansıması ve renk doygunluğu.",
    badge: "Parlak Kuşe Kâğıt"
  },
  {
    filename: "reklam-afis-tasarimi.webp",
    src: "/images/afis/reklam-afis-tasarimi.webp",
    title: "Reklam ve Kampanya Afiş Tasarımı",
    desc: "Vitrin, mağaza içi ve sokak duyurularında kullanılan reklam afiş baskı ve tanıtım tasarımları.",
    badge: "Reklam Afişi"
  },
  {
    filename: "afis-baski-detayi.webp",
    src: "/images/afis/afis-baski-detayi.webp",
    title: "Afiş ve Poster Baskı Detayı",
    desc: "CMYK renk modu, taşma payı ve tipografi hiyerarşisiyle profesyonel afiş hazırlama adımları.",
    badge: "Baskı Detayı"
  },
  {
    filename: "afis-baski-fiyatlari.webp",
    src: "/images/afis/afis-baski-fiyatlari.webp",
    title: "Ofset Afiş Baskı Çözümleri",
    desc: "Yüksek tirajlı kampanya ve duyurular için ofset baskı, paketleme ve sevk aşaması.",
    badge: "Ofset Baskı"
  }
];

// 10 ADET SSS (TAM OLARAK server.ts VE JSON-LD İLE EŞLEŞİR)
const AFIS_SSS = [
  {
    q: "Afiş baskı fiyatları ve afiş bastırma fiyatları nasıl hesaplanır?",
    a: "Afiş baskı fiyatları ve afiş bastırma fiyatları; tercih edilen baskı ebadı (34×49 cm / 35×50 cm veya 49×69 cm / 50×70 cm), kâğıt gramajı (105 gr, 135 gr veya 170 gr kuşe ile 120 gr Blueback), sipariş adedi ve selefon gibi ek işlemlere göre hesaplanır."
  },
  {
    q: "35x50 cm ve 50x70 cm afiş ölçüleri ile net kesim ebatları nelerdir?",
    a: "Matbaacılık tabaka kesim standartlarında 35×50 cm afiş için satın alınabilir net kesim ölçüsü 34×49 cm; 50×70 cm afiş için satın alınabilir net kesim ölçüsü 49×69 cm olarak uygulanmaktadır. Büyük boy 70×100 cm afişler ise tam tabaka olarak işlenir."
  },
  {
    q: "Fiyat listesinde olmayan adet, gramaj ve ölçüler için özel teklif alınabilir mi?",
    a: "Evet, fiyat listemizde yer almayan 135 gr, 170 gr kuşe, 70×100 cm dev boy, 120 gr Blueback dış mekan kağıdı veya farklı adetler için talep ettiğiniz ebat, gramaj ve adet bilgilerini ileterek özel teklif alabilirsiniz."
  },
  {
    q: "Kuşe kağıt afiş ile Blueback afiş arasındaki fark nedir?",
    a: "Kuşe kağıt afişler iç mekan, mağaza vitrini ve duyuru panoları için yüksek renk canlılığı sunar. 120 gr Blueback afişler ise arka yüzeyindeki mavi opak kaplama sayesinde alttaki görselin görünürlüğünü azaltmaya yardımcı olan bir afiş kâğıdıdır. Dış mekân uygunluğu; malzeme, baskı yöntemi, uygulama yüzeyi, hava koşulları ve kullanım süresine göre sipariş öncesinde teyit edilmelidir."
  },
  {
    q: "Afiş baskı dosyası nasıl hazırlanmalı, çözünürlük nasıl olmalıdır?",
    a: "Afiş baskı dosyalarının CMYK renk modunda, 4 kenarından en az +3 mm kesim taşma payı (bleed) verilerek ve yazılar konvertlenmiş şekilde PDF, TIFF veya AI formatında hazırlanması gerekir. Nihai baskı ölçüsündeki raster görseller için kullanım ve izleme mesafesine göre genellikle 150–300 PPI aralığı değerlendirilebilir. Logo, yazı ve ikonlar mümkünse vektörel korunmalıdır."
  },
  {
    q: "Afiş baskısında minimum sipariş adedi kaçtır?",
    a: "Ofset büyük boy afiş baskılarında ekonomik kalıp maliyeti avantajı için fiyat listemizdeki standart seçenekler 250 adet, 500 adet ve 1.000 adettir. Özel projeler için farklı tirajlarda teklif verilebilir."
  },
  {
    q: "KDV ve kargo ücreti afiş fiyatlarına dahil midir?",
    a: "Fiyat listemizde yer alan tutarlar %20 KDV ve kargo bedeli hariçtir. İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası üzerinden Türkiye geneline anlaşmalı kargo ile gönderim sağlanmaktadır."
  },
  {
    q: "Afişler kargo ve sevkiyatta nasıl paketlenir?",
    a: "Afişleriniz kargo sürecinde ezilme, katlanma ve kırışma riskine karşı dayanıklı rulo silindir tüplere veya koruyucu mukavva destekli ambalajlara sarılarak güvenle sevk edilir."
  },
  {
    q: "Afiş siparişinde dijital prova onayı sunuluyor mu?",
    a: "Evet, tarafımıza iletilen tasarım dosyaları teknik kontrollerden geçirilir ve baskı öncesinde dijital PDF prova onayı sunularak onayınız alındıktan sonra üretime geçilir."
  },
  {
    q: "Üretim ve kargoya teslim süresi ne kadardır?",
    a: "Üretim ve kargoya teslim süresi; ürün, adet, dosya onayı ve sipariş yoğunluğuna göre teklif aşamasında bildirilir."
  }
];

export const AfisPage: React.FC = () => {
  const openWhatsApp = (item: any) => {
    const text = `Merhaba, Mavi Basım web sitenizden Afiş Baskı ürünü için bilgi almak ve sipariş vermek istiyorum.\n\n` +
      `📋 Ürün Kodu: ${item.code}\n` +
      `📐 Ebat: ${item.ebat}\n` +
      `📄 Özellik: ${item.desc}\n` +
      `📦 Adet: ${item.miktar}\n` +
      `💰 Fiyat: ${item.price} + KDV\n\n` +
      `Tasarım dosyamı ileterek süreç hakkında bilgi alabilir miyim?`;
    window.open(`${WA_BASE}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const customQuoteWhatsappUrl = useMemo(() => {
    const text = `Merhaba, web sitenizdeki /afis sayfasından ulaşıyorum. Fiyat listesinde yer almayan afiş ölçüsü, kağıt türü, gramaj, adet ve tasarım seçenekleri için özel teklif almak istiyorum.`;
    return `${WA_BASE}?text=${encodeURIComponent(text)}`;
  }, []);

  // JSON-LD SCHEMAS
  const jsonLdBreadcrumb = {
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
        "name": "Matbaa Ürünleri",
        "item": "https://mavibasim.com/matbaa"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Afiş Baskı Fiyatları",
        "item": "https://mavibasim.com/afis"
      }
    ]
  };

  const jsonLdProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Afiş Baskı Fiyatları ve Poster Ölçüleri",
    "image": "https://mavibasim.com/images/afis/afis-baski-fiyatlari-ve-cesitleri.webp",
    "description": "35x50, 50x70 ve 70x100 cm afiş baskı fiyatlarını inceleyin. 105, 135, 170 gr kuşe ve Blueback afiş poster baskı seçenekleri için teklif alın.",
    "brand": {
      "@type": "Brand",
      "name": "Mavi Basım"
    },
    "category": "Afiş Baskı",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "TRY",
      "lowPrice": "2550",
      "highPrice": "4550",
      "offerCount": "6",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock"
    }
  };

  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": AFIS_SSS.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div data-page-root="afis" className="bg-[#f8fafc] min-h-screen pb-20">
      <Helmet>
        <title>Afiş Baskı Fiyatları | 35x50 - 50x70 - 70x100 cm</title>
        <meta name="description" content="35x50, 50x70 ve 70x100 cm afiş baskı fiyatlarını inceleyin. 105, 135, 170 gr kuşe ve Blueback afiş poster baskı seçenekleri için teklif alın." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mavibasim.com/afis" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Afiş Baskı Fiyatları | 35x50 - 50x70 - 70x100 cm" />
        <meta property="og:description" content="35x50, 50x70 ve 70x100 cm afiş baskı fiyatlarını inceleyin. 105, 135, 170 gr kuşe ve Blueback afiş poster baskı seçenekleri için teklif alın." />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://mavibasim.com/afis" />
        <meta property="og:image" content="https://mavibasim.com/images/afis/afis-baski-fiyatlari-ve-cesitleri.webp" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLdBreadcrumb)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(jsonLdProduct)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(jsonLdFAQ)}
        </script>
      </Helmet>

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          <ChevronRight size={12} />
          <Link to="/matbaa" className="hover:text-primary transition-colors">Matbaa Ürünleri</Link>
          <ChevronRight size={12} />
          <span className="text-slate-900 font-bold">Afiş Baskı Fiyatları</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pt-6">
        {/* CATEGORY HERO */}
        <CategoryHero 
          title="Afiş Baskı Fiyatları ve Poster Ölçüleri"
          description="35x50 cm, 50x70 cm ve 70x100 cm ebatlarında 105 gr, 135 gr, 170 gr kuşe ve Blueback afiş poster baskı seçenekleri. İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası üzerinden Türkiye geneline afiş baskı ve poster çözümleri sunuyoruz. Vitrin, mağaza içi, konser, etkinlik ve reklam afiş baskı siparişlerinizde dijital PDF prova onayı ile güvenle ilerleyebilirsiniz."
          badge="Afiş &amp; Poster Baskı Çözümleri"
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
            Güncel Afiş Baskı Fiyatları Listesi
          </h2>
          <p className="text-slate-700 text-xs md:text-sm leading-relaxed mb-3">
            Afiş baskı fiyatları 2026 yılı için mevcut ürün kodları ve adet seçenekleriyle gösterilmektedir. 50x70 afiş fiyatları ve 50x70 afiş baskı fiyatı AF4–AF6 kodlarında incelenebilir. Büyük afiş fiyatları, kağıt afiş fiyatları, afiş tasarım fiyatları ve fiyat listesinde olmayan afiş bastırma fiyatları için özelliklerinizi ileterek özel teklif alabilirsiniz.
          </p>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            Ucuz afiş baskı arayışında yalnızca birim fiyat değil; net ölçü, afiş kağıdı, gramaj, adet ve gönderim koşulları birlikte değerlendirilmelidir.
          </p>
        </div>

        {/* PRICE TABLE SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-300 overflow-hidden mb-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px]">
              <caption className="sr-only">Afiş Baskı Fiyat Tablosu</caption>
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
                {AFIS_DATA.map((category, cIdx) => {
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
                                      AFİŞ BASKI
                                    </span>
                                    <span className="text-sm font-black text-primary my-0.5">
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
                                  className="min-h-[44px] bg-primary hover:bg-secondary text-white px-3.5 py-2.5 rounded-xl font-black text-xs transition-all shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
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
          Fiyat listemizde yer alan 250 adet, 500 adet ve 1.000 adet seçeneklerinin yanı sıra daha yüksek tirajlar, 70x100 cm dev boy afişler veya 135 gr, 170 gr kuşe ve 120 gr Blueback afiş seçenekleri için WhatsApp destek hattımızdan özel teklif alabilirsiniz.
        </div>

        {/* ÖZEL ÖLÇÜ, KÂĞIT VE GRAMAJ TEKLİFİ ALANI */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 mb-2">
                <Sparkles size={14} /> Farklı Ebat &amp; Gramaj Seçenekleri
              </span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">
                Fiyat Listesinde Olmayan Afiş ve Poster Seçenekleri
              </h2>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed mb-2">
                Fiyat listesinde yer almayan özel afiş ölçüleri, farklı kâğıt türleri, gramajlar ve baskı seçenekleri malzeme tedariki ve teknik uygunluğa göre değerlendirilebilir. 135 gr, 170 gr kuşe afiş, 70×100 cm dev boy afişler ve 120 gr Blueback dış mekan kâğıdı seçenekleri de malzeme tedariki ve teknik uygunluğa göre özel teklif kapsamında değerlendirilebilir.
              </p>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                Afiş poster farkı çoğunlukla kullanım amacı, kâğıt seçimi ve sunum biçiminden kaynaklanır. Reklam afiş baskı çalışmalarında kampanya mesajı öne çıkarken, afiş poster baskı uygulamalarında dekoratif veya etkinlik odaklı görsel sunum öne çıkabilir.
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

        {/* AFİŞ EBATLARI VE KULLANIM ALANLARI */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-12 shadow-sm">
          <div className="max-w-3xl mb-6">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20 mb-2">
              <Layers size={14} /> Ebat &amp; Kesim Standartları
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
              Afiş Ölçüleri ve Kullanım Alanları
            </h2>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Matbaacılık standartlarında kullanılan ebat sınıfları ve üretim sonrasında elde edilen net kesim ölçüleri:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 35x50 Ebat */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-slate-800 text-white text-xs font-black px-2.5 py-1 rounded">35×50 cm Standardı</span>
                  <span className="text-[11px] font-bold text-slate-500">AF1 - AF3</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-1">35x50 Afiş Baskı</h3>
                <div className="space-y-1 my-3 text-xs text-slate-600">
                  <p className="text-primary font-bold"><strong>Satın Alınabilir Net Kesim:</strong> 34 × 49 cm</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mağaza vitrinleri, cam içi indirim duyuruları, koridor panoları ve bina içi asılı ilanlar için en popüler afiş ebadıdır.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                Tavsiye: 105 gr - 135 gr Kuşe
              </div>
            </div>

            {/* 50x70 Ebat */}
            <div className="bg-sky-50/50 p-5 rounded-xl border border-sky-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-primary text-white text-xs font-black px-2.5 py-1 rounded">50×70 cm Standardı</span>
                  <span className="text-[11px] font-bold text-slate-500">AF4 - AF6</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-1">50x70 Afiş Baskı</h3>
                <div className="space-y-1 my-3 text-xs text-slate-600">
                  <p className="text-primary font-bold"><strong>Satın Alınabilir Net Kesim:</strong> 49 × 69 cm</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  50×70 cm afişler için net satın alınabilir kesim ölçüsü 49×69 cm olup konser, festival, emlak ve etkinlik duyuruları için ideal boyuttur.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-sky-200 text-[11px] text-slate-600 font-medium">
                Tavsiye: 105 gr - 170 gr Kuşe
              </div>
            </div>

            {/* 70x100 Ebat */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-slate-800 text-white text-xs font-black px-2.5 py-1 rounded">Dev Boy / Tabaka</span>
                  <span className="text-[11px] font-bold text-slate-500">Özel Teklif</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-1">70x100 Afiş Baskı</h3>
                <div className="space-y-1 my-3 text-xs text-slate-600">
                  <p className="text-primary font-bold"><strong>Satın Alınabilir Net Kesim:</strong> 68 × 98 cm</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  AVM ana girişleri, açık hava etkinlik alanları, büyük boy sergi ve sinema salonu posterleri için kullanılan dev boy afiş seçeneğidir.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                Tavsiye: 135 gr - 170 gr Kuşe
              </div>
            </div>

            {/* Blueback Dış Mekan */}
            <div className="bg-amber-50/50 p-5 rounded-xl border border-amber-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-amber-600 text-white text-xs font-black px-2.5 py-1 rounded">Billboard Standardı</span>
                  <span className="text-[11px] font-bold text-slate-500">Özel Teklif</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Blueback Afiş</h3>
                <div className="space-y-1 my-3 text-xs text-slate-600">
                  <p className="text-amber-800 font-bold"><strong>Özellik:</strong> 120 gr Mavi Arkalı Opak Kağıt</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Blueback, mavi arka yüzeyi sayesinde alttaki görselin görünürlüğünü azaltmaya yardımcı olan bir afiş kâğıdıdır. Dış mekân uygunluğu sipariş öncesinde teyit edilmelidir.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-200 text-[11px] text-amber-800 font-medium">
                Tavsiye: 120 gr Blueback Dış Mekan
              </div>
            </div>
          </div>
        </section>

        {/* KAĞIT KARŞILAŞTIRMASI REHBERİ */}
        <section id="kagit-rehberi" className="scroll-mt-24 bg-slate-900 text-white p-6 md:p-10 rounded-3xl mb-12 shadow-sm">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/20 text-primary-light px-4 py-1.5 rounded-full inline-block mb-3">
              Kağıt Karşılaştırma Rehberi
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
              Afiş Baskısında Doğru Kağıt Gramajı Nasıl Seçilir?
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-2">
              Reklam alanınızın özelliğine, bütçenize ve kullanım sürenize en uygun afiş kağıdı seçeneğini hemen belirleyin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {KAGIT_KARSILASTIRMASI.map((k, idx) => (
              <div key={idx} className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between hover:border-primary transition-all">
                <div>
                  <span className={`inline-block text-[11px] font-black uppercase px-3 py-1 rounded-full border mb-4 ${k.badgeColor}`}>
                    {k.badge}
                  </span>
                  <h3 className="text-lg font-black text-white mb-3 border-b border-slate-700 pb-2">
                    {k.title}
                  </h3>
                  <ul className="space-y-2.5 mb-6 text-xs text-slate-300">
                    {k.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 text-[11px] font-medium text-slate-300">
                  <strong className="text-primary block font-black mb-1">Tavsiye Edilen Kullanım:</strong>
                  {k.recommendedFor}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GALERİ VE BASKI ÖRNEKLERİ (6 KART - RESPONSIVE 2 COLS MOBILE, 3 COLS TABLET/DESKTOP) */}
        <section id="gorsel-galeri" className="scroll-mt-24 mb-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-2">
              Üretim &amp; Baskı Örnekleri
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Afiş Baskı Örnekleri
            </h2>
            <p className="text-slate-600 text-xs md:text-sm mt-2 max-w-2xl mx-auto">
              Afiş örnekleri ve afiş resimleri; reklam kampanyaları, etkinlik duyuruları ve afiş poster örnekleri üzerinden farklı kullanım biçimlerini gösterir. Afiş resmi ve afiş poster resmi alanlarına gerçek görseller daha sonra eklenecektir.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            {AFIS_GALLERY.map((g, idx) => (
              <div 
                key={idx} 
                data-expected-filename={g.filename}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[3/2] bg-slate-100 overflow-hidden border-b border-slate-100 group">
                    <img 
                      src={g.src} 
                      alt={g.title} 
                      loading="lazy" 
                      decoding="async" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider z-10">
                      {g.badge}
                    </div>
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="text-sm md:text-base font-black text-slate-900 mb-1.5 group-hover:text-primary transition-colors">
                      {g.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                      {g.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TEKNİK ÖZELLİKLER TABLOSU */}
        <section id="teknik-ozellikler" className="scroll-mt-24 mb-12">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Ruler className="text-primary shrink-0" size={28} />
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Afiş Baskı Teknik Özellikler Tablosu
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs md:text-sm bg-white rounded-xl overflow-hidden border border-slate-200">
                <thead>
                  <tr className="bg-slate-900 text-white text-left font-black">
                    <th scope="col" className="p-3.5 w-1/3 border-b border-slate-800">Teknik Parametre</th>
                    <th scope="col" className="p-3.5 border-b border-slate-800">Baskı Standardı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">Kağıt Türleri</td>
                    <td className="p-3.5">105 gr, 135 gr, 170 gr Parlak Kuşe &amp; 120 gr Blueback Dış Mekan Kağıdı</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">Baskı Ebatları</td>
                    <td className="p-3.5">34×49 cm (35×50 cm Standardı), 49×69 cm (50×70 cm Standardı), 70×100 cm (Dev Boy / Tabaka)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">Baskı Teknolojisi</td>
                    <td className="p-3.5">Ürün, adet ve teknik uygunluğa göre ofset veya dijital baskı yöntemi</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">Renk Modu</td>
                    <td className="p-3.5">4 Renk CMYK Renk Standartları</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">Baskı Yönü</td>
                    <td className="p-3.5">Tek Yön Renkli Baskı (4/0)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">Kesim Taşma Payı (Bleed)</td>
                    <td className="p-3.5">Her taraftan +3 mm kesim payı (Emniyet marjı en az 5 mm)</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">Çözünürlük Hassasiyeti</td>
                    <td className="p-3.5">Nihai baskı ölçüsündeki raster görseller için kullanım ve izleme mesafesine göre genellikle 150–300 PPI aralığı değerlendirilebilir. Logo, yazı ve ikonlar mümkünse vektörel korunmalıdır.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">Minimum Sipariş Adedi</td>
                    <td className="p-3.5">Standart Ofset Seçeneklerinde 250 Adet / Özel Projelerde İsteğe Göre Tiraj</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-900">Ekstra Bitiş İşlemleri</td>
                    <td className="p-3.5">Mat / Parlak Selefon Kaplama, Koruyucu Rulo Ambalaj</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* AFİŞ NASIL HAZIRLANIR? (PROFESYONEL TASARIM REHBERİ) */}
        <section id="tasarim-rehberi" className="scroll-mt-24 mb-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-2">
              Tasarım Standartları
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Afiş Nasıl Hazırlanır? (Profesyonel Tasarım Rehberi)
            </h2>
            <p className="text-slate-600 text-xs md:text-sm mt-2 max-w-2xl mx-auto">
              Afiş nedir, afiş hazırlama süreci nasıl ilerler ve baskıya uygun dosya nasıl oluşturulur? Afiş resmi çizimi veya afiş poster çizimi talep edildiğinde sıfırdan grafik tasarım ayrıca fiyatlandırılabilir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Type,
                title: "1. Okunabilir Font & Tipografi",
                desc: "Yüksek kontrastlı Sans-Serif tipografiler tercih edilmelidir. Tırnaklı veya el yazısı fontlar uzaktan okunabilirliği düşürür."
              },
              {
                icon: Eye,
                title: "2. İzleme Mesafesi & Font Boyutları",
                desc: "35x50 cm için 1-2m, 50x70 cm için 2-4m, 70x100 cm için 4-8m izleme mesafesi hesaplanmalıdır. Detaylar en az 24 pt, başlıklar min 72 pt olmalıdır."
              },
              {
                icon: QrCode,
                title: "3. Güvenli Logo & Emniyet Alanı",
                desc: "Kesim taşmasından ayrı olarak, çerçevenin ve çıtanın altında kalmaması için logonuz ve metinler kenarlardan en az 1.5 cm - 2 cm içeride tutulmalıdır."
              },
              {
                icon: Sparkles,
                title: "4. Billboard 1/10 Ölçekleme",
                desc: "Geniş ebatlı billboard çalışmaları 1/10 ölçekte hazırlanabilir ve baskı hazırlık aşamasında ölçeklenerek işlenir."
              },
              {
                icon: Maximize2,
                title: "5. Rulo Sarım Yönü & Paketleme",
                desc: "Afişler görsellerin çizilmesini engellemek amacıyla baskı yüzeyi içte kalacak şekilde rulo yapılarak koruyucu ambalajlara yerleştirilir."
              },
              {
                icon: FileCheck,
                title: "6. CMYK & Vektörel PDF Kayıt",
                desc: "Renk sapmasını önlemek için dosya CMYK renk modunda hazırlanmalı, logolar vektörel çizim olarak konvertlenmiş PDF formatında gönderilmelidir."
              }
            ].map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-primary transition-all shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black mb-3">
                    <ItemIcon size={20} />
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* AFİŞTE SIK YAPILAN 5 HATA (UYARI BÖLÜMÜ) */}
        <section className="bg-red-50 p-6 md:p-8 rounded-3xl border border-red-200 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-red-600 shrink-0" size={28} />
            <h2 className="text-xl md:text-2xl font-black text-red-900 uppercase tracking-tight">
              Afişte Sık Yapılan 5 Kritik Tasarım Hatası
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Eksik İletişim & QR Kod: Tarih, adres, telefon veya web adresinin çok küçük ya da unutulmuş olması.",
              "Düşük Çözünürlük (RGB): İnternetten indirilen düşük çözünürlüklü pikselli görsellerin büyük boyutta basılması.",
              "Karmaşık & Kalabalık Düzen: Tek bir afişe onlarca paragraf metin doldurarak okunabilirliğin ciddi şekilde azalması.",
              "Taşma Payı Bırakmamak: Kesimde yazıların veya logonun kesim bıçağı altında kalarak kırpılması.",
              "Zayıf Kağıt Seçimi: Vitrin ve dış mekan kullanımında ince kâğıt seçilerek afişin pot yapması."
            ].map((err, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-red-100 shadow-xs">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  !
                </span>
                <p className="text-xs md:text-sm font-bold text-red-950 leading-relaxed">
                  {err}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 14 SEKTÖREL KULLANIM ALANI */}
        <section id="kullanim-alanlari" className="scroll-mt-24 mb-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-2">
              Sektörel İhtiyaçlar
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Afiş Baskının Kullanıldığı 14 Ana Sektör
            </h2>
            <p className="text-slate-600 text-xs md:text-sm mt-2">
              Farklı iş kollarına özel tasarımlarla yüksek görünürlük sağlayan ve hedef kitlenizin dikkatini çeken afiş çözümlerimiz.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 md:gap-4">
            {KULLANIM_ALANLARI.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-3.5 text-center hover:border-primary hover:shadow-md transition-all flex flex-col items-center justify-center group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-primary group-hover:text-white text-slate-800 flex items-center justify-center transition-all mb-2 shadow-xs">
                    <IconComponent size={20} />
                  </div>
                  <h3 className="text-xs font-black text-slate-900 mb-1 group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium leading-tight hidden md:block">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SSS BÖLÜMÜ (10 SORU) */}
        <section id="faq-section" className="scroll-mt-24 mb-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-2">
              Sıkça Sorulan Sorular
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Afiş Baskı Hakkında Sıkça Sorulan Sorular (SSS)
            </h2>
            <p className="text-slate-600 text-xs md:text-sm mt-2">
              Ebatlar, kâğıt gramajları, sipariş süreçleri ve teslimat şartları hakkında tüm sorularınızın yanıtları.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto items-stretch">
            {AFIS_SSS.map((faq, idx) => (
              <div 
                key={idx} 
                className="h-full border border-slate-200 rounded-2xl bg-white p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-black text-xs md:text-sm text-slate-900 mb-2.5 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    <span className="leading-snug">{faq.q}</span>
                  </h3>
                  <div className="h-px bg-slate-100 my-2.5 w-full" />
                  <p className="text-xs md:text-sm font-medium text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BLOG & TOPİKAL MATBAA REHBERLERİ */}
        <div className="my-10">
          <RelatedBlogPosts category="afis" />
        </div>

        {/* AFİŞ İLE İLGİLİ ÖNE ÇIKAN REHBER YAZILARI */}
        <section className="bg-slate-900 p-6 md:p-8 rounded-3xl text-white border border-slate-800 shadow-md mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/20 px-3 py-1 rounded-full inline-block mb-1">
                Matbaa &amp; Tasarım Kütüphanesi
              </span>
              <h3 className="text-lg md:text-xl font-black uppercase text-white tracking-tight">
                Afiş &amp; Poster Baskı İle İlgili Popüler Rehber Konuları
              </h3>
            </div>
            <Link to="/blog" className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5 shrink-0">
              Tüm Blog Rehberlerini İncele
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-medium">
            {[
              { title: "50x70 Afiş Baskı Rehberi", desc: "Vitrin ve sokak panolarında 50x70 cm afişlerin en çok tercih edilme nedenleri ve görünürlük avantajları." },
              { title: "Blueback Billboard Afiş Kullanımı", desc: "Arka yüzü mavi kaplamalı Blueback kağıdın dış mekan billboard ve duvar yapıştırmalarındaki özellikleri." },
              { title: "Mağaza & Vitrin Afiş Seçimi", desc: "Cam içi indirim ve sezon lansmanı afişlerinde doğru kağıt gramajı (135 gr - 170 gr) belirleme yöntemleri." },
              { title: "Seçim & Etkinlik Afişi Uygulamaları", desc: "Yüksek adetli kampanya ve festival afişlerinde ofset baskı planlaması ve dağıtım avantajları." }
            ].map((card, idx) => (
              <div 
                key={idx} 
                className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl transition-all block group"
              >
                <h4 className="font-black text-white text-xs md:text-sm mb-1.5 leading-snug">
                  {card.title}
                </h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* İÇ BAĞLANTILAR & İLGİLİ ÜRÜNLER */}
        <section className="bg-slate-100 p-6 md:p-8 rounded-3xl border border-slate-200 mb-12">
          <h2 className="text-lg md:text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">
            Afiş Siparişinizi Tamamlayan Diğer Matbaa Ürünlerimiz
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {[
              { title: "Broşür Baskı", path: "/brosur", desc: "Katlamalı tanıtım broşürleri" },
              { title: "El İlanı Baskı", path: "/el-ilani", desc: "Ekonomik elden dağıtım ilanları" },
              { title: "Magnet Baskı", path: "/magnet", desc: "Buzdolabı paket servis magneti" },
              { title: "Etiket Baskı", path: "/etiket", desc: "Çıkartma ve ambalaj etiketleri" },
              { title: "Kartvizit Baskı", path: "/kartvizit", desc: "Sıvama ve kabartma laklı kartlar" },
              { title: "Roll Up Banner", path: "/reklam-urunleri", desc: "Açılır kapanır mekanizmalı banner" },
              { title: "Karton Çanta", path: "/karton-canta", desc: "Lüks ipli kurumsal ambalaj çantası" },
              { title: "Zarf Baskı", path: "/zarf", desc: "Pencereli ve penceresiz antetli zarf" },
              { title: "Amerikan Servis", path: "/amerikan-servis", desc: "Restoranlar için kağıt masa örtüsü" },
              { title: "Makbuz & Formlar", path: "/makbuz-ve-formlar", desc: "Otokopili fatura ve adisyonlar" }
            ].map((item, idx) => (
              <Link 
                key={idx} 
                to={item.path} 
                className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-primary hover:shadow-md transition-all group"
              >
                <h3 className="text-xs md:text-sm font-black text-slate-900 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-[10px] text-slate-500 font-medium mt-1">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AfisPage;
