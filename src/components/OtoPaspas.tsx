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
  ExternalLink,
  ShieldAlert,
  Printer,
  Truck,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';
import { 
  useCart, 
  OTO_PASPAS_DATA
} from '../App';
import { WhatsAppIcon } from './WhatsAppIcon';
import RelatedBlogPosts from './RelatedBlogPosts';

// Özel teklif WhatsApp mesajı ve linki
const SPECIAL_QUOTE_MESSAGE = "Merhaba, web sitenizdeki /oto-paspas sayfasından ulaşıyorum. Fiyat listesinde bulunmayan oto paspas ölçüsü, kağıt türü, baskı rengi ve adet seçeneği için özel teklif almak istiyorum.";
const SPECIAL_QUOTE_WHATSAPP_LINK = `https://wa.me/905366022373?text=${encodeURIComponent(SPECIAL_QUOTE_MESSAGE)}`;

// 10 Adet Senkronize Sıkça Sorulan Sorular Listesi
export const OTO_PASPAS_FAQS = [
  {
    q: "Oto paspas fiyatları nasıl belirlenir?",
    a: "Oto paspas fiyatları; tercih edilen baskı adedi (1.000, 2.000 veya 5.000 adet), kağıt gramajı ve ebatına göre belirlenir. Standart fiyat listemizde 34x49 cm 80 gr esmer kraft kağıt ve tek yön tek renk baskılı seçenekler yer almakta olup adet arttıkça birim maliyet avantajı sağlanır."
  },
  {
    q: "80 gr kraft oto paspas kağıdı hangi özelliklere sahiptir?",
    a: "80 gr kraft oto paspas kağıdı, doğal esmer lifli yapısıyla araç içi taban korumasında sıkça tercih edilen tek kullanımlık bir oto paspas kağıt türüdür. Servis ve oto yıkama sonrası araç içi halı yüzeyinin geçici olarak kirlenmesini azaltmaya yardımcı olur."
  },
  {
    q: "Standart 34x49 cm dışında oto paspas kağıdı 50x70 cm üretilebilir mi?",
    a: "Standart paketlerimizde 34x49 cm ebat sunulmaktadır. Daha geniş taban alanları için talep edilen oto paspas kağıdı 50x70 ebadı veya farklı özel ölçüler standart fiyat tablosunda yer almamakta olup özel teklif kapsamında değerlendirilmektedir."
  },
  {
    q: "Oto kağıt paspas 100 adet sipariş edilebilir mi, tiraj seçenekleri nelerdir?",
    a: "Standart ofset baskı fiyat listemiz oto kağıt paspas 1000 adet ve oto kağıt paspas 5000 adet gibi ekonomik tirajlardan başlamaktadır. Oto kağıt paspas 100 adet seçeneği standart listede bulunmamakta; düşük veya ara adet talepleri için özel teklif alınması gerekmektedir."
  },
  {
    q: "Suya dayanıklı kağıt paspas var mıdır ve kraft paspas su geçirir mi?",
    a: "Piyasada suya dayanıklı kağıt paspas olarak anılsa da kâğıt paspaslar su geçirmez (waterproof) özellikte değildir. 80 gr kraft kâğıt, ayakkabı tabanındaki sınırlı miktardaki nem ve tozu emmeye yardımcı olabilir; ancak yoğun sıvı veya su birikintisiyle temas için uygun değildir."
  },
  {
    q: "Kağıt oto paspas modelleri ve baskı türleri nelerdir?",
    a: "İşletmeler için sunulan oto paspas modelleri; üzerine marka logosu, iletişim bilgileri ve kurumsal renklerin uygulandığı baskılı oto paspas ve baskılı oto paspas kağıdı seçeneklerinden oluşur. Doğal görünüm için esmer kraft, parlak zeminler için ise beyaz kâğıt modelleri tercih edilebilir."
  },
  {
    q: "Oto kağıt paspas tasarla aşamasında ve baskıya hazır dosya hazırlığında nelere dikkat edilmelidir?",
    a: "Kendi firmanız için oto kağıt paspas tasarla sürecinde firma logonuz, adresiniz ve telefon numaralarınız vektörel formatta (PDF, AI) ve en az 300 DPI çözünürlükte hazırlanmalıdır. Kesim payı olarak 3 mm taşma bırakılmalıdır. Baskıya hazır dosyanız için teknik kontrol ve dijital PDF prova sunulmaktadır; sıfırdan tasarım veya kapsamlı revizyonlar ayrıca fiyatlandırılabilir."
  },
  {
    q: "Oto kağıt paspas baskı için tek renk ile CMYK çok renkli baskı arasındaki fark nedir?",
    a: "Standart paketlerimiz tek yön tek renk (genellikle siyah veya kurumsal tek bir renk) baskılıdır. Çok renkli (CMYK) renk geçişleri veya beyaz 1. hamur kâğıt içeren özel baskı oto paspas talepleri standart tabloda bulunmayıp özel teklif ile fiyatlandırılmaktadır."
  },
  {
    q: "Kâğıt paspas araç içi pedalların altına konulabilir mi ve sürüş güvenliği için ne yapılmalıdır?",
    a: "Hayır. Kâğıt oto paspas kesinlikle gaz, fren veya debriyaj pedallarının altına yerleştirilmemeli ve pedal hareketini engelleyecek şekilde konumlandırılmamalıdır. Araç hareket etmeden önce sürücü tabanındaki kâğıt paspasın konumu mutlaka kontrol edilmeli veya gerektiğinde kaldırılmalıdır."
  },
  {
    q: "Fiyat listesinde bulunmayan özel ölçü, malzeme, renk ve teslimat süresi nasıl belirlenir?",
    a: "Standart dışı ölçüler, beyaz kâğıt seçenekleri veya çok renkli baskılar için Özel Teklif Al bağlantısı üzerinden talebinizi iletebilirsiniz. Siparişlerin teslim süresi; talep edilen adet, baskıya hazır dosya onayı, kâğıt seçimi, baskı rengi ve iş yoğunluğuna bağlı olarak teklif aşamasında netleştirilmektedir."
  }
];

// 6 Görsel Galeri Alanı
export const OTO_PASPAS_GALLERY = [
  {
    filename: "oto-paspas-baski-fiyatlari.webp",
    src: "/images/oto-paspas/oto-paspas-baski-fiyatlari.webp",
    alt: "Oto Paspas Baskı Fiyatları ve 80 gr Kraft Kağıt Paspas Modelleri",
    title: "Oto Paspas Baskı Fiyatları",
    desc: "Oto servis ve oto yıkama işletmeleri için ekonomik kraft oto paspas fiyatları."
  },
  {
    filename: "kagit-oto-paspas-ornegi.webp",
    src: "/images/oto-paspas/kagit-oto-paspas-ornegi.webp",
    alt: "Kağıt Baskılı Oto Paspas Örneği",
    title: "Kağıt Oto Paspas Örneği",
    desc: "Standart binek ve hafif ticari araç tabanına uygun kaliteli kağıt paspas baskısı."
  },
  {
    filename: "otopaspas-baski.webp",
    src: "/images/oto-paspas/otopaspas-baski.webp",
    alt: "80 gr Esmer Kraft Kağıt Oto Paspas Kağıdı",
    title: "80 gr Kraft Oto Paspas Kağıdı",
    desc: "Doğal esmer kraft dokulu, tek kullanımlık araç içi zemin koruma kâğıdı."
  },
  {
    filename: "oto-paspas-kagit-baski.webp",
    src: "/images/oto-paspas/oto-paspas-kagit-baski.webp",
    alt: "Oto Servis ve Bakım İstasyonları İçin Kağıt Paspas Baskı",
    title: "Oto Servis Kağıt Paspas Baskı",
    desc: "Periyodik bakım ve mekanik servis sonrası müşteri araçları için koruyucu kâğıt paspas."
  },
  {
    filename: "oto-yikama-paspas-baski.webp",
    src: "/images/oto-paspas/oto-yikama-paspas-baski.webp",
    alt: "Oto Yıkama ve Detailing İçin Tek Kullanımlık Oto Paspas",
    title: "Oto Yıkama Tek Kullanımlık Paspas",
    desc: "İç temizlik ve detaylı uygulama sonrası tabanı temiz tutmaya yardımcı kâğıt paspas."
  },
  {
    filename: "oto-paspas-tasarimi.webp",
    src: "/images/oto-paspas/oto-paspas-tasarimi.webp",
    alt: "Özel Baskılı ve Logolu Oto Paspas Tasarımı",
    title: "Özel Baskı Oto Paspas Tasarımı",
    desc: "Firma logosu, iletişim bilgileri ve sosyal medya hesapları yer alan baskı tasarımı."
  }
];

export const OtoPaspasPage = () => {
  const { openProductDetail } = useCart();

  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Oto Paspas");
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
        "name": "Oto Paspas Baskı",
        "item": "https://mavibasim.com/oto-paspas"
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Oto Paspas Baskı Fiyatları ve Logolu Kağıt Paspas",
    "image": "https://mavibasim.com/images/oto-paspas/oto-paspas-baski-fiyatlari.webp",
    "description": "1.000, 2.000 ve 5.000 adet logolu oto paspas baskı fiyatlarını inceleyin. 34x49 cm, 80 gr kraft kağıt ve tek renk baskı seçenekleri.",
    "brand": {
      "@type": "Brand",
      "name": "Mavi Basım"
    },
    "category": "Oto Paspas Baskı",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "TRY",
      "lowPrice": "2500",
      "highPrice": "5000",
      "offerCount": "3",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": OTO_PASPAS_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div data-page-root="oto-paspas" className="bg-white min-h-screen pb-16">
      <Helmet>
        <title>Oto Paspas Baskı Fiyatları | Logolu Kağıt Oto Paspas</title>
        <meta 
          name="description" 
          content="1.000, 2.000 ve 5.000 adet logolu oto paspas baskı fiyatlarını inceleyin. 34x49 cm, 80 gr kraft kağıt ve tek renk baskı seçenekleri." 
        />
        <link rel="canonical" href="https://mavibasim.com/oto-paspas" />
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
                  <span className="text-gray-900 font-semibold">Oto Paspas Baskı</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-10 md:py-14 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200 mb-4">
                <Layers size={14} className="text-slate-700" />
                Oto Servis ve Yıkama Baskı Çözümleri
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Oto Paspas Baskı Fiyatları ve Logolu Kağıt Paspas
              </h1>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Oto servis, bakım istasyonları, ekspertiz ve oto yıkama işletmeleri için kurumsal kimliğinizi yansıtan <strong className="text-slate-900 font-semibold">baskılı oto paspas</strong> ve <strong className="text-slate-900 font-semibold">baskılı oto paspas kağıdı</strong> çözümleri sunuyoruz. 80 gr esmer kraft kâğıt üzerine tek renk ofset baskı ile hazırlanan <strong className="text-slate-900 font-semibold">oto kağıt paspas</strong> ürünleri, servis ve temizlik işlemleri sırasında araç tabanının kirlenmesini azaltmaya yardımcı olan pratik ve tek kullanımlık bir koruma sağlar. Siparişleriniz <strong className="text-slate-900 font-semibold">İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası</strong> üzerinden koordine edilerek anlaşmalı kargo ile tarafınıza ulaştırılır.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Üretim &amp; Sipariş Özeti
                </div>
                <div className="space-y-2.5 text-xs text-slate-700 font-medium mb-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-slate-800 shrink-0" />
                    <span>34x49 cm Standart Ebat, 80 gr Esmer Kraft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Printer size={16} className="text-slate-800 shrink-0" />
                    <span>Tek Yön Tek Renk Net Ofset Baskı</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-slate-800 shrink-0" />
                    <span>Topkapı Hizmet ve Koordinasyon Noktası</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-slate-800 shrink-0" />
                    <span>Türkiye Geneline Anlaşmalı Kargo</span>
                  </div>
                </div>
                <a
                  href={SPECIAL_QUOTE_WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs px-4 py-3 rounded-xl transition-all shadow-sm hover:scale-105 active:scale-95"
                >
                  <WhatsAppIcon size={16} />
                  Özel Ölçü / Farklı Gramaj Teklifi Al
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Fiyat Tablosu Alanı */}
        <section id="fiyat-tablosu" className="mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 px-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-black">
                Oto Paspas Fiyat Tablosu (80 gr Esmer Kraft)
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                34x49 cm standart ebat, 80 gr esmer kraft kağıt ve tek yön tek renk baskı seçenekleri.
              </p>
            </div>
            <div className="mt-2 md:mt-0 text-xs font-semibold text-gray-500">
              * Fiyatlarımıza %20 KDV dahil değildir.
            </div>
          </div>

          <p className="text-gray-650 text-xs sm:text-sm font-semibold mb-6 px-2 leading-relaxed">
            Aşağıdaki tabloda güncel <strong>oto paspas fiyatları</strong> yer almaktadır. Standart sipariş paketlerimiz 1.000 adetten başlamakta olup <strong>oto kağıt paspas 1000 adet</strong> ve <strong>oto kağıt paspas 5000 adet</strong> gibi ekonomik tirajlarda birim maliyet avantajı sağlanmaktadır. Beyaz 1. hamur kâğıt, çok renkli CMYK baskı ve <strong>oto paspas kağıdı 50x70</strong> gibi özel seçenekler standart listede yer almamakta olup özel teklif ile hazırlanmaktadır.
          </p>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-visible relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-gray-900 text-white text-xs uppercase tracking-wider font-bold">
                    <th scope="col" className="py-4 px-4 sm:px-6">Kod</th>
                    <th scope="col" className="py-4 px-4 sm:px-6">Adet</th>
                    <th scope="col" className="py-4 px-4 sm:px-6">Ölçü</th>
                    <th scope="col" className="py-4 px-4 sm:px-6">Malzeme</th>
                    <th scope="col" className="py-4 px-4 sm:px-6">Baskı Türü</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 text-right">FİYAT</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 text-center">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                  {OTO_PASPAS_DATA.map((item, idx) => (
                    <tr 
                      key={item.code} 
                      className={`hover:bg-blue-50/40 transition-colors ${idx % 2 === 1 ? 'bg-gray-50/60' : 'bg-white'}`}
                    >
                      <td className="py-4 px-4 sm:px-6 font-mono font-bold text-primary">
                        {item.code}
                      </td>
                      <td className="py-4 px-4 sm:px-6 font-bold text-gray-900">
                        {item.miktar}
                      </td>
                      <td className="py-4 px-4 sm:px-6 font-semibold text-gray-800">
                        {item.ebat}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-gray-700">
                        {item.malzeme}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-gray-700 font-medium">
                        {item.baski}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base">
                        {item.price}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-center">
                        <button
                          onClick={() => openWhatsApp({
                            code: item.code,
                            name: `Oto Paspas (${item.miktar})`,
                            price: item.price,
                            basePrice: parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0,
                            miktar: item.miktar,
                            ebat: item.ebat,
                            description: `${item.ebat} - ${item.malzeme} - ${item.baski}`
                          })}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-xs shadow-sm hover:shadow transition-all"
                        >
                          <ShoppingCart size={13} />
                          <span>Hemen Sipariş Ver</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tablo Altı Özel Teklif ve Bilgilendirme Kutusu */}
          <div className="mt-6 bg-blue-50/70 border border-blue-150 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Info className="text-primary mt-0.5 shrink-0" size={18} />
              <div className="text-xs sm:text-sm text-gray-700">
                <p className="font-bold text-gray-900 mb-0.5">
                  Farklı Ölçü, Kağıt ve Renk Seçenekleri İçin Teklif Alın
                </p>
                <p>
                  Beyaz 1. hamur kâğıt, renkli CMYK baskı, 50x70 cm büyük ebat veya ara tiraj talepleriniz standart tabloda yer almamaktadır. İhtiyacınıza uygun <strong>özel baskı oto paspas</strong> çözümleri için WhatsApp üzerinden bize ulaşabilirsiniz.
                </p>
              </div>
            </div>
            <a
              href={SPECIAL_QUOTE_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
            >
              <Phone size={14} />
              <span>Özel Teklif Al</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </section>

        {/* Sürüş Güvenliği ve Yerleştirme Uyarısı */}
        <section className="mb-14">
          <div className="bg-amber-50/80 border-2 border-amber-250 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-amber-500 text-white rounded-xl shrink-0 mt-0.5">
                <ShieldAlert size={24} />
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-amber-950">
                <h3 className="text-base sm:text-lg font-black text-amber-900">
                  Araç İçi Güvenlik ve Kâğıt Paspas Yerleşim Uyarısı
                </h3>
                <p className="leading-relaxed">
                  <strong>Kâğıt oto paspas</strong> ürünleri, servis ve temizlik işlemleri sırasında araç tabanının kirlenmesini azaltmaya yardımcı olan tek kullanımlık geçici koruyuculardır. Ürünün sürüş esnasında gaz, fren veya debriyaj pedallarının altına kaymaması ve pedal hareketlerini engellememesi hayati önem taşır.
                </p>
                <ul className="list-disc list-inside space-y-1 text-amber-900 font-medium pl-1">
                  <li>Kâğıt paspası kesinlikle pedalların altına doğru yerleştirmeyiniz.</li>
                  <li>Araç sürüşe başlamadan önce sürücü tarafındaki kâğıt paspasın konumunu kontrol ediniz ve gerekirse kaldırınız.</li>
                  <li>Kâğıt paspaslar sabit kauçuk veya halı paspasların yerini tutmaz; tek kullanımlık geçici koruma amaçlıdır.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Görsel Galeri Alanı (6 WebP Görsel) */}
        <section id="gorsel-galeri" className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-black">
              Oto Paspas Modelleri ve Görsel Örnekler
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              Oto yıkama, detaylı temizlik ve servis istasyonları için hazırlanan <strong>oto paspas modelleri</strong> ve <strong>oto paspas kağıdı</strong> örnekleri.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {OTO_PASPAS_GALLERY.map((img) => (
              <div 
                key={img.filename}
                data-expected-filename={img.filename}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden border-b border-gray-100">
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    title={img.title}
                    loading="lazy" 
                    decoding="async" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-black mb-1">
                      {img.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed line-clamp-2">
                      {img.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Teknik Rehber ve Bilgilendirme Kartları */}
        <section className="mb-16">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-black text-black mb-6 flex items-center gap-2">
              <CheckCircle2 className="text-primary" size={20} />
              Oto Paspas Kağıdı Özellikleri ve Tasarım Rehberi
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h3 className="font-bold text-sm text-black mb-2">80 gr Kraft Kağıt Yapısı</h3>
                <p className="text-xs text-gray-650 leading-relaxed">
                  Doğal esmer dokulu <strong>oto paspas kağıt</strong> materyali, hafif ve ekonomik yapısıyla araç tabanına rahatça serilir. Ayakkabı tabanındaki kuru toz ve yüzeysel kirlerin halıya geçmesini azaltmaya yardımcı olur.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h3 className="font-bold text-sm text-black mb-2">Baskı ve Renk Seçenekleri</h3>
                <p className="text-xs text-gray-650 leading-relaxed">
                  Standart <strong>oto kağıt paspas baskı</strong> tek yön tek renk olarak uygulanır. Esmer kraft zemin üzerinde siyah, lacivert veya kırmızı gibi koyu baskı renkleri okunaklılığa ve marka görünürlüğüne katkı sağlayabilir.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h3 className="font-bold text-sm text-black mb-2">Dosya Kontrolü ve PDF Prova</h3>
                <p className="text-xs text-gray-650 leading-relaxed">
                  Baskıya hazır olarak ilettiğiniz tasarım dosyaları için teknik kontrol ve dijital PDF prova sunulmaktadır. Sıfırdan tasarım veya kapsamlı düzenleme talepleri ayrıca fiyatlandırılabilir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* İkinci Özel Teklif Alanı (WhatsApp CTA) */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-lg sm:text-xl font-black">
                Fiyat Listesinde Bulunmayan Seçenekler İçin Özel Teklif Alın
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                Beyaz kâğıt, çok renkli baskı, 50x70 cm ebat veya yüksek tirajlı siparişleriniz için müşteri temsilcimizle WhatsApp üzerinden görüşebilir ve hızlı teklif alabilirsiniz.
              </p>
            </div>
            <a
              href={SPECIAL_QUOTE_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all whitespace-nowrap shrink-0"
            >
              <Phone size={16} />
              <span>Özel Teklif Al</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </section>

        {/* SSS - Sıkça Sorulan Sorular (10 Adet, 2 Sütun Masaüstü) */}
        <section id="faq-section" className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary mb-2">
              Sıkça Sorulan Sorular
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-black">
              Oto Paspas Baskı Hakkında Merak Edilenler
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              Oto paspas fiyatları, kâğıt özellikleri, ölçüler ve sipariş süreçleriyle ilgili en çok sorulan 10 soru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
            {OTO_PASPAS_FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className="h-full bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col justify-between text-black"
              >
                <div>
                  <h3 className="font-bold text-sm text-black mb-2 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" />
                    <span>{faq.q}</span>
                  </h3>
                  <div className="h-px bg-gray-100 my-2 w-full" />
                  <p className="text-xs sm:text-sm text-gray-650 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Rehberleri */}
        <div className="my-10">
          <RelatedBlogPosts category="oto-paspas" />
        </div>

      </div>
    </div>
  );
};
export default OtoPaspasPage;
