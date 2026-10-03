import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  RefreshCw, 
  ShieldCheck, 
  FileCheck, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Building2, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  CreditCard
} from 'lucide-react';
import { WHATSAPP_LINK } from '../constants/contact';

export const IptalVeiadeSartlariPage: React.FC = () => {
  const canonicalUrl = "https://mavibasim.com/iptal-ve-iade-sartlari";

  // Schema Definitions
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    "url": canonicalUrl,
    "name": "İptal ve İade Şartları | Mavi Basım Matbaa & Reklam",
    "description": "Mavi Basım Matbaa & Reklam sipariş iptali, ücret iadesi şartları, matbaa ve ambalaj ürünlerinde imalat hatası iadesi ve geri ödeme prosedürleri rehberi.",
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
        "name": "İptal ve İade Şartları",
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
        "name": "Siparişimi iptal etmek istediğimde ücret iadesi nasıl yapılır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Henüz imalata girmemiş veya PDF provaya onay verilmemiş siparişlerde iptal talebiniz alındığında ödemeniz Kredi Kartı iadelerinde 3-7 iş günü, Havale/EFT ödemelerinde 24 saat içinde hesabınıza iade edilir."
        }
      },
      {
        "@type": "Question",
        "name": "Baskı onayından sonra sipariş iptal edilebilir mi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Grafik PDF provası onaylanıp kalıplar pozlandıktan veya dijital üniteye gönderildikten sonra kağıt ve kalıp maliyetleri oluştuğundan iptal ve iade yapılamamaktadır."
        }
      },
      {
        "@type": "Question",
        "name": "Mavi Basım kaynaklı baskı hatasında süreç nasıl işler?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Onaylanan PDF provadan farklı basılmış, yanlış renk veya hatalı kesim yapılmış ürünlerde fotoğraflı bildiriminiz sonrası siparişiniz ücretsiz olarak en baştan basılır."
        }
      },
      {
        "@type": "Question",
        "name": "İade edilecek tutar hesabıma ne zaman yansır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "İade onayından itibaren Havale/EFT ödemeleri aynı gün veya ertesi iş günü; Kredi kartı ödemeleri ise bankanızın süreçlerine bağlı olarak 3-7 iş günü içerisinde ekstrenize yansır."
        }
      },
      {
        "@type": "Question",
        "name": "Müşterinin onayladığı PDF provadaki imla hatasından ötürü iade alınır mı?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hayır. Müşteri tarafından yazılı onay verilen PDF provadaki adres, telefon veya metin hatalarından Mavi Basım sorumlu tutulamayacağı için bu durumlarda iade kabul edilmez."
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
    "name": "Mavi Basım İptal ve İade Standartları",
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
      q: "Siparişimi iptal etmek istediğimde ücret iadesi nasıl yapılır?",
      a: "Henüz imalata veya kalıp aşamasına geçilmemiş siparişlerde iptal talebiniz onaylandığı anda ödeme yönteminize göre iade süreci başlatılır. Kredi kartı iadeleri bankanıza bağlı olarak 3-7 iş günü, Havale/EFT iadeleri ise 24 saat içerisinde hesabınıza aktarılır."
    },
    {
      q: "Baskı onayından sonra sipariş iptal edilebilir mi?",
      a: "Grafik PDF provası tarafınızdan onaylanıp imalat kalıpları pozlandıktan sonra kağıt kesimi ve hammadde kullanımı gerçekleştiğinden iptal ve iade işlemi gerçekleştirilememektedir."
    },
    {
      q: "Mavi Basım kaynaklı baskı hatasında süreç nasıl işler?",
      a: "Onaylanan dijital PDF provadaki mizanpaj ile basılan ürün arasında imalat hatası, yanlış renk, kayık kesim veya leke tespit edilirse; hatalı ürün görselleri ile başvurduğunuzda ürünleriniz ücretsiz olarak derhal yeniden basılarak sevk edilir."
    },
    {
      q: "İade edilecek tutar hesabıma ne zaman yansır?",
      a: "İade talebinizin muhasebe birimimiz tarafından onaylanmasını takiben Havale/EFT ödemeleri 24 saat içinde; kredi kartı ödemeleri ise bankanızın prosedürlerine göre 3-7 iş günü içerisinde kart ekstrenize artı bakiye olarak yansır."
    },
    {
      q: "Müşterinin onayladığı PDF provadaki imla hatasından ötürü iade alınır mı?",
      a: "Hayır. Baskı öncesinde tarafınıza iletilen PDF provada müşterinin gözünden kaçan harf, telefon, adres veya fiyat hataları müşterinin sorumluluğundadır. Onay verilen içerikler basıldığı için bu gerekçeyle iade kabul edilmez."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Helmet SEO Metadata */}
      <Helmet>
        <title>İptal ve İade Şartları | Mavi Basım Matbaa &amp; Reklam</title>
        <meta name="description" content="Mavi Basım Matbaa & Reklam sipariş iptali, ücret iadesi şartları, matbaa ve ambalaj ürünlerinde imalat hatası iadesi ve geri ödeme prosedürleri rehberi." />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* OpenGraph & Twitter */}
        <meta property="og:title" content="İptal ve İade Şartları | Mavi Basım Matbaa & Reklam" />
        <meta property="og:description" content="Mavi Basım Matbaa sipariş iptal koşulları, imalat kusurlarında %100 yeniden basım garantisi ve ücret iadesi prosedürleri." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://mavibasim.com/mavilogo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="İptal ve İade Şartları | Mavi Basım Matbaa" />
        <meta name="twitter:description" content="Mavi Basım Matbaa resmi sipariş iptal ve iade politikası rehberi." />

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
            <span className="text-slate-900">İptal ve İade Şartları</span>
          </nav>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-rose-500/30">
                <RotateCcw size={16} /> Müşteri Memnuniyeti &amp; Şeffaf İade Güvencesi
              </div>
              <h1 id="hero-title" className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white">
                İptal ve İade Koşulları
              </h1>
              <p id="intro-summary" className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">
                Mavi Basım Matbaa &amp; Reklam olarak matbaa ve ambalaj siparişlerinizde şeffaf iptal, iade ve garanti prosedürleri sunuyoruz. İmalat hatalarında koşulsuz yeniden baskı garantimiz ile haklarınızı koruyoruz.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 shrink-0 space-y-3 text-xs font-semibold">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck size={16} />
                <span>%100 Ücretsiz Yeniden Baskı Garantisi</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Building2 size={16} className="text-primary" />
                <span>Mavi Basım Matbaa &amp; Reklam</span>
              </div>
              <div className="flex items-center gap-2 text-[#00E5FF]">
                <Clock size={16} />
                <span>Güncelleme: 1 Ocak 2026</span>
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
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
              <RotateCcw size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Onay Öncesi İptal</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              PDF provaya onay vermediğiniz sürece siparişinizi koşulsuz ücretsiz iptal edebilirsiniz.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Baskı Kusur Garantisi</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Firmamız kaynaklı hatalı imalatta siparişiniz sıfır ücretle derhal yeniden basılır.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-4">
              <CreditCard size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Hızlı Geri Ödeme</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              İade edilen tutarlar EFT ödemelerinde 24 saatte, kredi kartında 3-7 günde aktarılır.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">
              <AlertTriangle size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Özel İmalat kuralı</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              6502 sayılı kanun gereği onay verilip basıma giren kişiselleştirilmiş ürünlerde iade olmaz.
            </p>
          </div>
        </div>

        {/* Detailed Refund Content Sections */}
        <div className="space-y-8">
          
          {/* Section 1: Sipariş İptal Koşulları */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">1</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Sipariş İptal Koşulları ve Sınırları
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>
                Mavi Basım Matbaa &amp; Reklam üzerinden verdiğiniz siparişleri belirli aşamalara kadar ücretsiz iptal etme hakkınız bulunmaktadır:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                  <h4 className="font-black text-emerald-900 text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" /> PDF Onayı Öncesi İptal (Ücretsiz)
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                    Grafik çalışması aşamasındaki veya PDF provasına henüz onay verilmemiş siparişlerinizi temsilcilerimize bildirerek anında ve kesintisiz iptal edebilirsiniz.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200">
                  <h4 className="font-black text-rose-900 text-sm mb-1 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-rose-600" /> Onay Sonrası İmalat Aşaması
                  </h4>
                  <p className="text-xs text-rose-800 leading-relaxed font-medium">
                    PDF provaya onay verildikten sonra kalıp pozlama, kağıt kesimi veya baskı işlemi başladığı için sipariş iptal edilemez.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Hatalı Baskı ve Yeniden Basım Garantisi */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">2</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Kusurlu Baskılarda %100 Ücretsiz Yeniden Basım
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>
                Müşteri memnuniyeti ana ilkemizdir. Baskı sonrası tarafınıza ulaşan üründe aşağıdaki firma kaynaklı kusurlar tespit edilirse, Mavi Basım siparişinizi öncelikli olarak sıfır ücretle yeniden basar:
              </p>

              <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-slate-600">
                <li>Onay verilen dijital PDF provadan farklı bir grafik yerleşimi veya içerik basılması.</li>
                <li>Giyotin kesimde bıçak kayması sonucu metin veya görsellerin kesilmesi.</li>
                <li>Kağıt üzerinde leke, boya sıçraması veya yanlış selefon kaplama yapılması.</li>
              </ul>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider mb-2">Başvuru Süresi:</h4>
                <p className="text-xs text-slate-600">
                  Kusurlu baskı bildirimlerinin kargo teslim tarihinden itibaren <strong>7 iş günü</strong> içerisinde fotoğraflı olarak info@mavibasim.com veya WhatsApp hattımıza iletilmesi gerekmektedir.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Ücret İadesi Süreci */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">3</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Geri Ödeme Süreçleri ve Zamanlaması
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>
                Onaylanan iptal veya iade taleplerinizde ödeme yapılan yönteme sadık kalınarak geri ödeme yapılır:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-black text-slate-900 text-sm mb-1">Havale / EFT İadeleri</h4>
                  <p className="text-xs text-slate-600 font-medium">Banka hesabınıza 24 saat (1 iş günü) içerisinde aktarılır.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-black text-slate-900 text-sm mb-1">Kredi Kartı İadeleri</h4>
                  <p className="text-xs text-slate-600 font-medium">Sanal POS iadesi tarafımızca aynı gün yapılır; bankanıza bağlı olarak 3 - 7 iş gününde ekstrenize yansır.</p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Accordion FAQ Section */}
        <section className="my-16 bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle size={24} className="text-primary" />
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                İptal ve İade Sık Sorulan Sorular
              </h2>
              <p className="text-xs text-slate-500 font-medium">Geri ödemeler, imalat garantileri ve başvuru adımları</p>
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
        <section className="my-16 bg-gradient-to-r from-rose-600 via-pink-700 to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              İade Talebiniz İçin Yanınızdayız
            </h2>
            <p className="text-xs md:text-sm text-rose-100 font-medium max-w-2xl">
              Hatalı baskı bildirimi veya sipariş iptali için görsellerinizle birlikte müşteri destek ekibimizle iletişime geçebilirsiniz.
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
              <span>WhatsApp Destek Hattı</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
