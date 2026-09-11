import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Truck, 
  PackageCheck, 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  AlertTriangle,
  Phone
} from 'lucide-react';
import { WHATSAPP_LINK } from '../constants/contact';

export const TeslimatSartlariPage: React.FC = () => {
  const canonicalUrl = "https://mavibasim.com/teslimat-sartlari";

  // Schema Definitions
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    "url": canonicalUrl,
    "name": "Teslimat Şartları ve Kargo Gönderim Rehberi | Mavi Basım Matbaa",
    "description": "Mavi Basım Matbaa & Reklam Türkiye geneli 81 il kargo teslimat şartları, matbaa ürün paketleme standartları, kargo süreleri ve hasarlı kargo süreçleri rehberi.",
    "publisher": {
      "@type": "Organization",
      "name": "Mavi Basım Matbaa & Reklam",
      "url": "https://mavibasim.com",
      "logo": "https://mavibasim.com/mavilogo.png"
    },
    "inLanguage": "tr-TR"
  };

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
        "name": "Teslimat Şartları",
        "item": canonicalUrl
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Siparişler ne kadar sürede kargoya verilir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Acil dijital baskılı kartvizit veya etiket siparişleri 24 saat içinde; offset matbaa baskıları (broşür, el ilanı, karton çanta) ise 2 ila 4 iş günü içerisinde tamamlanarak kargoya teslim edilir."
        }
      },
      {
        "@type": "Question",
        "name": "Türkiye'nin hangi illerine kargo gönderimi yapılmaktadır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "İstanbul Topkapı üretim tesisimizden Türkiye'nin 81 iline (Ankara, İzmir, Bursa, Antalya, Adana, Trabzon, Gaziantep vb.) anlaşmalı kargo şirketleri ile kapınıza kadar teslimat yapılmaktadır."
        }
      },
      {
        "@type": "Question",
        "name": "Ürünler kargoda zarar görmemesi için nasıl paketlenir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Matbaa ürünlerimiz önce neme dayanıklı şrink jelatin kaplamayla sarılır, ardından darbeye dayanıklı çift oluklu ağır hizmet tipi mukavva kolilerde paletlenerek kargolanır."
        }
      },
      {
        "@type": "Question",
        "name": "Kargo paketi yırtık veya ezik gelirse ne yapmalıyım?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Teslimat anında paketi açıp kargo görevlisine 'Hasar Tespit Tutanağı' tutturmalı ve ürünü teslim almamalısınız. Tutanak tarafımıza ulaştığında ürün derhal yeniden basılır."
        }
      },
      {
        "@type": "Question",
        "name": "İstanbul içi özel motorlu kurye ile hızlı teslimat var mı?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, İstanbul içi acil siparişlerinizde talebinize bağlı olarak vip VIP motor kurye veya araç kurye ile aynı gün adrese teslimat seçeneği mevcuttur."
        }
      }
    ]
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "SpeakableSpecification",
    "cssSelector": ["#hero-title", "#intro-summary"]
  };

  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Mavi Basım Kargo ve Teslimat Standartları",
    "url": canonicalUrl,
    "telephone": "+905366022373",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB",
      "addressLocality": "Zeytinburnu",
      "addressRegion": "İstanbul",
      "addressCountry": "TR"
    }
  };

  const faqs = [
    {
      q: "Siparişler ne kadar sürede kargoya verilir?",
      a: "Ürün türüne ve baskı tekniğine göre imalat süreleri değişmektedir. Acil dijital kartvizit ve etiketler 24 saat içinde; Heidelberg ofset makinede basılan broşür, el ilanı ve matbu evraklar ise 2 ila 4 iş günü içerisinde tamamlanarak kargoya teslim edilir."
    },
    {
      q: "Türkiye'nin hangi illerine kargo gönderimi yapılmaktadır?",
      a: "İstanbul Topkapı 2. Matbaacılar Sitesi'ndeki tesisimizden Türkiye'nin 81 iline ve tüm ilçelerine anlaşmalı kurumsal kargo firmaları (Yurtiçi, Aras, MNG, Sürat Kargo vb.) vasıtasıyla adrese teslimat yapılmaktadır."
    },
    {
      q: "Ürünler kargoda zarar görmemesi için nasıl paketlenir?",
      a: "Kağıt ve karton ürünlerimiz kargoda köşelerinin ezilmemesi ve ıslanmaması için öncelikle vakumlu şrink polietilen jelatin ile ambalajlanır, ardından ekstra dayanıklı çift oluklu kraft mukavva kolilere yerleştirilip koli bandı ile mühürlenir."
    },
    {
      q: "Kargo paketi yırtık veya ezik gelirse ne yapmalıyım?",
      a: "Paket kurye tarafından getirildiğinde dış ambalajda yırtık, ıslaklık veya ezilme tespit ederseniz kargo görevlisini bekletip 'Kargo Durum / Hasar Tespit Tutanağı' tuttirmalı ve paketi kabul etmemelisiniz. Tutanak bilgisi elimize ulaştığında ürünleriniz derhal sıfırdan basılarak kargolanır."
    },
    {
      q: "İstanbul içi özel kurye veya ambar teslimatı var mı?",
      a: "Evet. İstanbul Avrupa ve Anadolu yakasındaki müşterilerimiz için acil siparişlerde VIP Motor Kurye veya Araç Kurye teslimatı sağlanmaktadır. Çok yüksek adetli paletli veya tonajlı ambalaj/kutu siparişlerinizde ise şehirler arası ambar kargo seçenekleri sunulmaktadır."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Helmet SEO Metadata */}
      <Helmet>
        <title>Teslimat Şartları ve Kargo Gönderim Rehberi | Mavi Basım Matbaa</title>
        <meta name="description" content="Mavi Basım Matbaa & Reklam Türkiye geneli 81 il kargo teslimat şartları, matbaa ürün paketleme standartları, kargo süreleri ve hasarlı kargo süreçleri rehberi." />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* OpenGraph & Twitter */}
        <meta property="og:title" content="Teslimat Şartları ve Kargo Gönderim Rehberi | Mavi Basım Matbaa" />
        <meta property="og:description" content="Mavi Basım Matbaa & Reklam kargo gönderim süreleri, koruyucu ambalaj standartları ve 81 il teslimat rehberi." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://mavibasim.com/mavilogo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Teslimat Şartları | Mavi Basım Matbaa" />
        <meta name="twitter:description" content="Mavi Basım Matbaa 81 ile güvenli ve hızlı kargo teslimat şartları." />

        {/* Structured Data Scripts */}
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(speakableSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(legalServiceSchema)}</script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-slate-900">Teslimat Şartları</span>
          </nav>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#00E5FF]/20 text-[#00E5FF] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-[#00E5FF]/30">
                <Truck size={16} /> Türkiye Geneli 81 İle Hızlı &amp; Güvenli Teslimat
              </div>
              <h1 id="hero-title" className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white">
                Teslimat Şartları ve Kargo Politikası
              </h1>
              <p id="intro-summary" className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">
                Mavi Basım Matbaa &amp; Reklam olarak, İstanbul Topkapı üretim merkezimizde özenle bastığımız tüm matbaa ve ambalaj ürünlerini Türkiye'nin 81 iline darbeye ve neme korumalı özel koli paketlemesiyle güvenle ulaştırıyoruz.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 shrink-0 space-y-3 text-xs font-semibold">
              <div className="flex items-center gap-2 text-[#00E5FF]">
                <PackageCheck size={16} />
                <span>Çift Oluklu Dayanıklı Mukavva Kolileme</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <MapPin size={16} className="text-primary" />
                <span>81 İl Adrese Kargo Teslimatı</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Clock size={16} />
                <span>2-4 İş Günü Hızlı İmalat &amp; Sevk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Quick Summary Cards (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold mb-4">
              <Truck size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">81 İl Kargo Ağı</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Tüm şehir ve ilçelere anlaşmalı kargo firmaları ile kapıda teslimat yapılır.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
              <PackageCheck size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Koruyucu Paketleme</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Ürünleriniz vakumlu şrink jelatin ve çift oluklu ağır mukavva kolilerle korunur.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">
              <Clock size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Kargo Süresi</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Marmara bölgesi 24 saat, diğer iller 48-72 saat kargo varış süresine sahiptir.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Hasar Garantisi</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Kargo esnasında oluşan ezilme veya yıpranmalarda tutanak ile anında yenisi basılır.
            </p>
          </div>
        </div>

        {/* Detailed Delivery Content Sections */}
        <div className="space-y-8">
          
          {/* Section 1: Kargo Süreçleri ve İmalat Süreleri */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">1</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                İmalat ve Kargo Gönderim Süreleri
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>
                Matbaa ürünleri fabrikasyon standart üretimler olmayıp, her siparişe özel grafik hazırlığı, kalıp pozlama, Heidelberg ofset baskı, selefon kaplama, kırım ve Polar giyotin kesim aşamalarından geçer.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-black text-slate-900 text-sm mb-1">Ofset Baskı Siparişleri</h4>
                  <p className="text-xs text-slate-600 font-medium">Broşür, el ilanı, kartvizit, cepli dosya vb. toplu işlerde üretim süresi ortalama <strong>2 - 4 iş günüdür</strong>.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-black text-slate-900 text-sm mb-1">Acil Dijital Baskılar</h4>
                  <p className="text-xs text-slate-600 font-medium">Az adetli etiket, acil kartvizit veya özel makbuzlarda üretim aynı gün veya <strong>24 saatte</strong> kargoya verilir.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Ambalaj ve Paketleme Standartları */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">2</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Koruyucu Paketleme ve Ambalaj Kalitesi
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>
                Kağıt materyaller neme ve darbelere karşı oldukça hassastır. Mavi Basım olarak teslimat güvenliğini garantiye almak için şu ambalaj standartlarını uyguluyoruz:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-slate-600">
                <li><strong>Şrink Jelatin Paketleme:</strong> Basılan broşür veya kartvizitler 100'erli veya 500'erli paketler halinde vakumlu şrink polietilen jelatin ile sarılarak nemden korunur.</li>
                <li><strong>Çift Oluklu Kolileme:</strong> Taşıma esnasında ezilmeyi önlemek için ağır hizmet tipi çift oluklu kraft mukavva koli kullanılır.</li>
                <li><strong>Güvenlik Bandı:</strong> Koliler açılmaya karşı Mavi Basım güvenlik bandı ile mühürlenir.</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Hasarlı Kargo Teslimatında Yapılması Gerekenler */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">3</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Hasarlı Kargo Teslimatı ve Tutanak Prosedürü
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <div className="bg-red-50 p-6 rounded-2xl border border-red-200 space-y-3">
                <h4 className="font-black text-red-900 text-sm flex items-center gap-2">
                  <AlertTriangle size={18} className="text-red-600" /> Dikkat Edilmesi Gereken Kargo Teslim Adımları:
                </h4>
                <ol className="list-decimal pl-5 space-y-2 text-xs md:text-sm text-red-800 font-medium">
                  <li>Teslimat anında kargo paketinin dışını mutlaka kontrol ediniz.</li>
                  <li>Koli üzerinde yırtık, ezilme, delik veya ıslaklık tespit ederseniz kargo kuryesine derhal <strong>"Kargo Hasar Tespit Tutanağı"</strong> düzenletiniz.</li>
                  <li>Hasarlı koliyi teslim almayıp kargo kuryesine geri veriniz.</li>
                  <li>Düzenlenen tutanağın fotoğrafını çekerek WhatsApp veya e-posta ile tarafımıza ilettiğinizde, ürünleriniz beklemeden <strong>ücretsiz olarak yeniden basılır</strong>.</li>
                </ol>
              </div>
            </div>
          </section>

        </div>

        {/* Process Timeline Section */}
        <section className="my-16 bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black text-primary uppercase tracking-widest block mb-1">Topkapı'dan Adresinize Yolculuk</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Kargo &amp; Teslimat İşleyiş Adımları
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center mx-auto mb-3">1</span>
              <h3 className="font-black text-slate-900 text-sm mb-1">İmalat Sonu Kalite</h3>
              <p className="text-xs text-slate-600 font-medium">Baskı ve kesim sonrası son kalite kontrol.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center mx-auto mb-3">2</span>
              <h3 className="font-black text-slate-900 text-sm mb-1">Vakumlu Şrink &amp; Koli</h3>
              <p className="text-xs text-slate-600 font-medium">Neme dayanıklı ambalaj ve çift oluklu koli.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center mx-auto mb-3">3</span>
              <h3 className="font-black text-slate-900 text-sm mb-1">Kargo Çıkışı</h3>
              <p className="text-xs text-slate-600 font-medium">Takip numarası sms/whatsapp ile iletilir.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center mx-auto mb-3">4</span>
              <h3 className="font-black text-slate-900 text-sm mb-1">Kapıda Teslimat</h3>
              <p className="text-xs text-slate-600 font-medium">Türkiye'nin 81 ilinde adrese teslim.</p>
            </div>
          </div>
        </section>

        {/* Accordion FAQ Section */}
        <section className="my-16 bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle size={24} className="text-primary" />
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                Teslimat Sık Sorulan Sorular
              </h2>
              <p className="text-xs text-slate-500 font-medium">Kargo takibi, paketleme ve teslimat süreleri hakkında merak edilenler</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2.5 flex items-start gap-2.5">
                    <span className="text-primary font-mono text-xs bg-primary/10 px-2 py-0.5 rounded-full shrink-0 mt-0.5">#{idx + 1}</span>
                    <span>{faq.q}</span>
                  </h3>
                  <div className="h-px bg-slate-100 my-2.5 w-full" />
                  <p className="text-slate-650 text-xs md:text-sm leading-relaxed font-normal">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="my-16 bg-gradient-to-r from-cyan-600 via-blue-700 to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Kargo &amp; Teslimat Takibiniz İçin Ulaşın
            </h2>
            <p className="text-xs md:text-sm text-cyan-100 font-medium max-w-2xl">
              Siparişinizin hangi aşamada olduğunu veya kargo takip numaranızı öğrenmek için müşteri destek ekibimize yazabilirsiniz.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs md:text-sm uppercase px-6 py-3.5 rounded-2xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <Phone size={16} />
              <span>WhatsApp İle Kargo Sorgula</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
