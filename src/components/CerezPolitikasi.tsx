import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FileText, 
  ShieldCheck, 
  Settings, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Building2, 
  Clock,
  Lock,
  Globe,
  Sliders
} from 'lucide-react';
import { WHATSAPP_LINK } from '../constants/contact';

export const CerezPolitikasiPage: React.FC = () => {
  const canonicalUrl = "https://mavibasim.com/cerez-politikasi";

  // Schema Definitions
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    "url": canonicalUrl,
    "name": "Çerez Politikası ve Cookie Yönetimi | Mavi Basım Matbaa",
    "description": "Mavi Basım Matbaa & Reklam mavibasim.com web sitesinde kullanılan çerez türleri, zorunlu ve analitik çerezler, saklanma süreleri ve tarayıcı çerez ayarları rehberi.",
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
        "name": "Çerez Politikası",
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
        "name": "Çerez (Cookie) nedir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcınız aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır."
        }
      },
      {
        "@type": "Question",
        "name": "Mavi Basım sitemizde zorunlu çerezler neden kullanılır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zorunlu çerezler, sepetinizdeki matbaa ürünlerini hatırlamak, oturum güvenliğini sağlamak ve form gönderimlerini doğru yönetmek için teknik olarak şarttır."
        }
      },
      {
        "@type": "Question",
        "name": "Tarayıcımdan çerezleri tamamen engelleyebilir miyim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet, Chrome, Safari, Edge ve Firefox tarayıcı ayarlarından çerezleri dilediğiniz zaman engelleyebilirsiniz. Ancak zorunlu çerezlerin engellenmesi sepet ve sipariş işlevlerinin çalışmamasına neden olabilir."
        }
      },
      {
        "@type": "Question",
        "name": "Çerezler aracılığıyla kişisel şifrelerim veya kart bilgilerim saklanır mı?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hayır. Çerezler hiçbir şekilde şifre, kredi kartı numarası veya hassas kişisel verilerinizi depolamaz."
        }
      },
      {
        "@type": "Question",
        "name": "Çerez politikası ne sıklıkla güncellenir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mavi Basım, yasal mevzuatlar ve web teknolojilerindeki gelişmelere bağlı olarak çerez politikasını periyodik olarak güncellemektedir."
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
    "name": "Mavi Basım Çerez ve Teknoloji Bildirimi",
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
      q: "Çerez (Cookie) nedir?",
      a: "Çerezler, bir web sitesini ziyaret ettiğinizde bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Web sitesinin sizi hatırlamasını, oturumunuzu sürdürmesini ve tercihlerinizi kaydetmesini sağlar."
    },
    {
      q: "Mavi Basım sitemizde zorunlu çerezler neden kullanılır?",
      a: "Zorunlu çerezler, alışveriş sepetinizdeki kartvizit, broşür, etiket gibi ürün adedini tutmak, sayfa geçişlerinde oturum verilerini kaybetmemek ve güvenlik doğrulamalarını yapmak için teknik olarak zorunludur."
    },
    {
      q: "Tarayıcımdan çerezleri tamamen engelleyebilir miyim?",
      a: "Evet, kullandığınız tarayıcının (Google Chrome, Safari, Mozilla Firefox, Microsoft Edge) gizlilik ayarlarından çerez kullanımını kısıtlayabilir veya silebilirsiniz. Ancak zorunlu çerezlerin kapatılması durumunda online sipariş sepeti gibi temel işlevler düzgün çalışmayabilir."
    },
    {
      q: "Çerezler aracılığıyla kişisel şifrelerim veya kart bilgilerim saklanır mı?",
      a: "Hayır. Çerezler vasıtasıyla hiçbir şekilde kredi kartı bilgileriniz, şifreleriniz veya gizli finansal verileriniz saklanmaz."
    },
    {
      q: "Çerez politikası ne sıklıkla güncellenir?",
      a: "Mavi Basım Matbaa & Reklam, veri koruma kanunları ve teknik ihtiyaçlara bağlı olarak Çerez Politikası metnini güncelleme hakkını saklı tutar."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Helmet SEO Metadata */}
      <Helmet>
        <title>Çerez Politikası ve Cookie Yönetimi | Mavi Basım Matbaa</title>
        <meta name="description" content="Mavi Basım Matbaa & Reklam mavibasim.com web sitesinde kullanılan çerez türleri, zorunlu ve analitik çerezler, saklanma süreleri ve tarayıcı çerez ayarları rehberi." />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* OpenGraph & Twitter */}
        <meta property="og:title" content="Çerez Politikası ve Cookie Yönetimi | Mavi Basım Matbaa" />
        <meta property="og:description" content="mavibasim.com çerez kullanımı, cookie türleri, performans ve analitik çerezler ile tarayıcı gizlilik ayarları." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://mavibasim.com/mavilogo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Çerez Politikası | Mavi Basım Matbaa" />
        <meta name="twitter:description" content="Mavi Basım Matbaa web sitesi çerez kullanım rehberi ve gizlilik yönetimi." />

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
            <span className="text-slate-900">Çerez Politikası</span>
          </nav>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-blue-500/30">
                <FileText size={16} /> Web Teknolojileri &amp; Gizlilik Standartları
              </div>
              <h1 id="hero-title" className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white">
                Çerez (Cookie) Politikası ve Yönetim Rehberi
              </h1>
              <p id="intro-summary" className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">
                mavibasim.com web sitemizi ziyaret ettiğinizde alışveriş deneyiminizi iyileştirmek, sepet tercihlerinizi hatırlamak ve site performansını analiz etmek amacıyla kullanılan çerezler hakkında şeffaf bilgilendirme sunuyoruz.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 shrink-0 space-y-3 text-xs font-semibold">
              <div className="flex items-center gap-2 text-blue-400">
                <Globe size={16} />
                <span>Şeffaf Web Deneyimi &amp; Çerez Kontrolü</span>
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
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
              <Lock size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Zorunlu Çerezler</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Sepetinizin korunması ve güvenli oturum yönetimi için teknik olarak şarttır.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
              <Sliders size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Performans &amp; Analiz</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Site hızını ve ziyaretçi deneyimini anonim istatistiklerle geliştirmemizi sağlar.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-4">
              <Settings size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Tarayıcı Kontrolü</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Chrome, Safari veya Edge ayarlarından çerezleri dilediğiniz an kapatabilirsiniz.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">KVKK Uyumluluk</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Çerezler vasıtasıyla hassas kişisel veri veya kredi kartı şifreleri depolanmaz.
            </p>
          </div>
        </div>

        {/* Detailed Cookie Content Sections */}
        <div className="space-y-8">
          
          {/* Section 1: Çerez Nedir? */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">1</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Çerez (Cookie) Nedir ve Nasıl Çalışır?
              </h2>
            </div>
            <div className="prose max-w-none text-slate-700 text-sm md:text-base font-medium space-y-4 leading-relaxed">
              <p>
                Çerezler, bir web sitesini ziyaret ettiğinizde internet tarayıcınız (örneğin Google Chrome, Safari, Mozilla Firefox) aracılığıyla bilgisayarınıza, tabletinize veya akıllı telefonunuza kaydedilen küçük boyutlu metin dosyalarıdır. Çerezler, web sitesinin daha verimli çalışmasını, kullanıcı tercihlerinin hatırlanmasını ve site sahiplerine analitik bilgi sunulmasını sağlar.
              </p>
            </div>
          </section>

          {/* Section 2: Kullanılan Çerez Türleri */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">2</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                mavibasim.com Web Sitemizde Kullanılan Çerez Türleri
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-black text-slate-900 text-sm mb-2">1. Kesinlikle Zorunlu Çerezler</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Web sitemizin düzgün çalışabilmesi, alışveriş sepetinizin hatırlanması ve güvenli alanlara erişim sağlanması için bu çerezler teknik olarak şarttır. Devre dışı bırakılamazlar.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-black text-slate-900 text-sm mb-2">2. Performans ve Analitik Çerezleri</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Ziyaretçilerin web sitemizi nasıl kullandığını, en çok hangi sayfaların (Kartvizit, Broşür vb.) incelendiğini anonim olarak analiz etmemizi sağlar.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-black text-slate-900 text-sm mb-2">3. İşlevsellik Çerezleri</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Dil seçimi, konum tercihi veya kişiselleştirilmiş ayarlarınızın hatırlanmasını sağlayarak web sitesi deneyiminizi kolaylaştırır.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-black text-slate-900 text-sm mb-2">4. Oturum ve Kalıcı Çerezler</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Oturum çerezleri tarayıcınızı kapattığınızda silinirken; kalıcı çerezler belirlenen geçerlilik süresi sonuna kadar cihazınızda saklanır.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Tarayıcı Üzerinden Çerez Yönetimi */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">3</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Tarayıcınız Üzerinden Çerezleri Nasıl Yönetebilirsiniz?
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>
                Çoğu internet tarayıcısı çerezleri otomatik olarak kabul edecek şekilde ayarlanmıştır. Dilediğiniz zaman tarayıcı ayarlarınızı değiştirerek çerezleri reddedebilir veya silinebilirsiniz:
              </p>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-black text-slate-900 text-xs uppercase">Google Chrome:</h4>
                    <p className="text-xs text-slate-600">Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Diğer Site Verileri adımlarını takip edin.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-black text-slate-900 text-xs uppercase">Apple Safari:</h4>
                    <p className="text-xs text-slate-600">Tercihler &gt; Gizlilik &gt; Tüm Çerezleri Engelle seçeneğini işaretleyin.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-black text-slate-900 text-xs uppercase">Mozilla Firefox:</h4>
                    <p className="text-xs text-slate-600">Seçenekler &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Site Verileri menüsünden temizleyin.</p>
                  </div>
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
                Çerez Politikası Sık Sorulan Sorular
              </h2>
              <p className="text-xs text-slate-500 font-medium">Çerez teknolojileri ve tarayıcı ayarlarınız hakkında merak edilenler</p>
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
        <section className="my-16 bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Güvenli ve Şeffaf İnternet Deneyimi
            </h2>
            <p className="text-xs md:text-sm text-blue-100 font-medium max-w-2xl">
              Çerez tercihleriniz ve gizlilik haklarınız konusunda daha fazla bilgi almak için destek ekibimize ulaşabilirsiniz.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/iletisim"
              className="bg-white text-slate-900 hover:bg-slate-100 font-black text-xs md:text-sm uppercase px-6 py-3.5 rounded-2xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Destek Ekibimize Yazın</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
