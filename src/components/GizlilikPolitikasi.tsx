import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileCheck, 
  UserCheck, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Building2, 
  Phone, 
  Mail, 
  Printer, 
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { WHATSAPP_LINK, PHONE_NUMBER } from '../constants/contact';

export const GizlilikPolitikasiPage: React.FC = () => {
  const canonicalUrl = "https://mavibasim.com/gizlilik-politikasi";

  // Schema Definitions
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    "url": canonicalUrl,
    "name": "Gizlilik Politikası ve KVKK Aydınlatma Metni | Mavi Basım Matbaa",
    "description": "Mavi Basım Matbaa & Reklam mavibasim.com 6698 sayılı KVKK kapsamında kişisel verilerin işlenmesi, verilerinizin korunması, grafik tasarım dosyalarınızın gizliliği ve veri sahibi hakları.",
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
        "name": "Gizlilik Politikası",
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
        "name": "Grafik tasarım dosyalarım üçüncü şahıslarla paylaşılır mı?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kesinlikle hayır. Mavi Basım'a ilettiğiniz tüm özel tasarım dosyaları, logolar, ürün görselleri ve içerikler sır niteliğinde korunur; üçüncü şahıslarla veya rakip firmalarla asla paylaşılmaz."
        }
      },
      {
        "@type": "Question",
        "name": "KVKK kapsamında hangi verilerim toplanmaktadır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sipariş verilebilmesi ve fatura düzenlenebilmesi amacıyla ad-soyad, T.C. Kimlik / Vergi numarası, telefon numarası, e-posta adresi, teslimat adresi ve kurumsal fatura bilgileri toplanmaktadır."
        }
      },
      {
        "@type": "Question",
        "name": "Kişisel verilerimin silinmesini veya güncellenmesini nasıl talep edebilirim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "6698 Sayılı KVKK Madde 11 uyarınca info@mavibasim.com e-posta adresine yazılı başvuruda bulunarak verilerinizin silinmesini, anonimleştirilmesini veya güncellenmesini talep edebilirsiniz."
        }
      },
      {
        "@type": "Question",
        "name": "Ödeme bilgilerim ve kredi kartı verilerim saklanıyor mu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hayır. Kredi kartı ödemeleriniz 256-Bit SSL şifrelemeli BDDK lisanslı Sanal POS altyapıları üzerinden gerçekleşir. Kart bilgileriniz sunucularımızda kesinlikle saklanmaz."
        }
      },
      {
        "@type": "Question",
        "name": "Kişisel verilerim kimlere aktarılabilir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verileriniz yalnızca sipariş teslimatını sağlayan kargo/kurye şirketlerine ve yasal e-fatura zorunluluğu nedeniyle Gelir İdaresi Başkanlığı entegratörlerine kanuni sınırlar içinde aktarılmaktadır."
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
    "name": "Mavi Basım KVKK ve Gizlilik Bildirimi",
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
      q: "Grafik tasarım dosyalarım üçüncü şahıslarla paylaşılır mı?",
      a: "Kesinlikle hayır. Mavi Basım Matbaa & Reklam olarak müşterilerimizin fikri mülkiyetine saygı duyuyoruz. Baskı amacıyla tarafımıza ilettiğiniz PDF, AI, PSD veya görsel dosyaları yalnızca imalat ve prova süreçlerinde kullanılır; hiçbir üçüncü taraf veya rakip firma ile paylaşılmaz."
    },
    {
      q: "KVKK kapsamında hangi verilerim toplanmaktadır?",
      a: "Sipariş teyidi, fatura kesimi ve kargo gönderimi için ad-soyad, firma unvanı, T.C. Kimlik No / Vergi Dairesi ve Numarası, telefon numarası, e-posta adresi ve teslimat adresi bilgileri toplanmaktadır."
    },
    {
      q: "Kişisel verilerimin silinmesini veya güncellenmesini nasıl talep edebilirim?",
      a: "6698 Sayılı Kanun'un 11. maddesi uyarınca, info@mavibasim.com e-posta adresimize kayıtlı e-postanızdan yazılı bildirim göndererek sistemimizdeki verilerinizin silinmesini, anonimleştirilmesini veya güncellenmesini talep edebilirsiniz."
    },
    {
      q: "Ödeme bilgilerim ve kredi kartı verilerim saklanıyor mu?",
      a: "Hayır. Online ödeme işlemleriniz BDDK onaylı ve 256-bit SSL güvenlik sertifikalı banka altyapıları (Sanal POS) üzerinden şifreli olarak gerçekleşmektedir. Kredi kartı numaranız veya son kullanma tarihiniz sunucularımızda saklanmamaktadır."
    },
    {
      q: "Kişisel verilerim kimlere aktarılabilir?",
      a: "Verileriniz yalnızca ürününüzün adresinize teslimini gerçekleştiren anlaşmalı kargo/lojistik firmalarına ve yasal mali zorunluluklar gereği E-Fatura entegratörü ile Gelir İdaresi Başkanlığı'na kanuni sınırlar içinde aktarılmaktadır."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Helmet SEO Metadata */}
      <Helmet>
        <title>Gizlilik Politikası ve KVKK Aydınlatma Metni | Mavi Basım Matbaa</title>
        <meta name="description" content="Mavi Basım Matbaa & Reklam mavibasim.com KVKK 6698 sayılı kanun kapsamında kişisel verilerin korunması, gizlilik politikası, veri güvenliği ve müşteri hakları aydınlatma metni." />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* OpenGraph & Twitter */}
        <meta property="og:title" content="Gizlilik Politikası ve KVKK Aydınlatma Metni | Mavi Basım Matbaa" />
        <meta property="og:description" content="Mavi Basım Matbaa & Reklam kişisel verilerin korunması kanunu (KVKK) aydınlatma metni ve veri güvenliği ilkeleri." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://mavibasim.com/mavilogo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gizlilik Politikası | Mavi Basım Matbaa" />
        <meta name="twitter:description" content="Mavi Basım Matbaa resmi gizlilik politikası ve KVKK veri koruma standartları." />

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
            <span className="text-slate-900">Gizlilik Politikası</span>
          </nav>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-500/30">
                <ShieldCheck size={16} /> KVKK 6698 Sayılı Kanun Uyumlu Veri Koruması
              </div>
              <h1 id="hero-title" className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white">
                Gizlilik Politikası ve KVKK Aydınlatma Metni
              </h1>
              <p id="intro-summary" className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">
                Mavi Basım Matbaa &amp; Reklam olarak, müşterilerimizin ve web sitemizi ziyaret eden kullanıcıların kişisel verilerinin gizliliğine, grafik tasarım dosyalarının güvenliğine ve 6698 sayılı KVKK standartlarına azami önem veriyoruz.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 shrink-0 space-y-3 text-xs font-semibold">
              <div className="flex items-center gap-2 text-emerald-400">
                <Lock size={16} />
                <span>256-Bit SSL Şifreli Güvenli Sunucular</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Building2 size={16} className="text-primary" />
                <span>İstanbul Topkapı İmalat Tesisimiz</span>
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
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Veri Sorumlusu</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Verileriniz Mavi Basım Matbaa &amp; Reklam güvencesiyle 6698 sayılı kanun uyarınca korunur.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4">
              <FileCheck size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Tasarım Dosyaları</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Baskı için gönderdiğiniz logo ve görsel tasarımlar sır saklama yükümlülüğüyle saklanır.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">
              <Lock size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Kredi Kartı Güvenliği</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Kart bilgileriniz sunucularımızda saklanmaz, 256-bit SSL Sanal POS üzerinden işlem yapılır.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-4">
              <UserCheck size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">KVKK Haklarınız</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Dilediğiniz zaman verilerinizin silinmesini, güncellenmesini veya aktarımını talep edebilirsiniz.
            </p>
          </div>
        </div>

        {/* Detailed Privacy Content Sections */}
        <div className="space-y-8">
          
          {/* Section 1: Veri Sorumlusunun Kimliği */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">1</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Veri Sorumlusunun Kimliği
              </h2>
            </div>
            <div className="prose max-w-none text-slate-700 text-sm md:text-base font-medium space-y-4 leading-relaxed">
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; veri sorumlusu sıfatıyla <strong>Mavi Basım Matbaa &amp; Reklam</strong> (Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB Zeytinburnu / İstanbul) tarafından aşağıda açıklanan kapsamda işlenmektedir.
              </p>
            </div>
          </section>

          {/* Section 2: İşlenen Kişisel Veri Kategorileri */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">2</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                İşlenen Kişisel Veri Kategorileri
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>
                Mavi Basım, matbaa imalat ve satış süreçlerinde aşağıdaki veri türlerini hukuka uygun olarak işlemektedir:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-black text-slate-900 text-sm mb-1">Kimlik &amp; İletişim Verileri</h4>
                  <p className="text-xs text-slate-600 font-medium">Ad, soyad, T.C. Kimlik No, telefon numarası, e-posta adresi, teslimat adresi.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-black text-slate-900 text-sm mb-1">Fatura &amp; Finans Verileri</h4>
                  <p className="text-xs text-slate-600 font-medium">Firma unvanı, vergi dairesi ve numarası, banka dekontları, e-fatura kayıtları.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-black text-slate-900 text-sm mb-1">Grafik &amp; İmalat Dosyaları</h4>
                  <p className="text-xs text-slate-600 font-medium">Baskıya gönderilen PDF, AI, PNG, JPEG formattaki logolar ve tasarımlar.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-black text-slate-900 text-sm mb-1">Dijital İşlem Güvenliği</h4>
                  <p className="text-xs text-slate-600 font-medium">IP adresi, web sitesi giriş-çıkış logları, tarayıcı çerez verileri.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Verilerin İşlenme Amaçları */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">3</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Verilerin İşlenme Amaçları ve Hukuki Sebepleri
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
              
              <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-slate-600">
                <li>Siparişlerinizin üretilmesi, baskı öncesi PDF provanın iletilmesi ve onay süreçlerinin yürütülmesi.</li>
                <li>Türkiye'nin 81 iline ürünlerinizin anlaşmalı kargo/kurye şirketleri vasıtasıyla ulaştırılması.</li>
                <li>Maliye Bakanlığı ve Gelir İdaresi Başkanlığı mevzuatına uygun e-fatura ve resmi belgelerin tanzimi.</li>
                <li>Müşteri taleplerinin yanıtlanması, satış sonrası destek ve şikayet süreçlerinin takibi.</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Grafik Tasarım Dosyalarının Gizliliği */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">4</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Grafik Tasarım Dosyalarınızın Güvenliği
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
                <h4 className="font-black text-emerald-900 text-sm mb-2 flex items-center gap-2">
                  <Lock size={18} className="text-emerald-600" /> Sır Saklama Garanti Sözü
                </h4>
                <p className="text-xs md:text-sm text-emerald-800 leading-relaxed font-medium">
                  Mavi Basım; broşür, etiket, kartvizit, özel ambalaj kutusu veya kurumsal evrak baskı siparişlerinizde tarafımıza ilettiğiniz özel mizanpaj ve vektörel çizimleri ticari sır olarak kabul eder. Tasarımlarınız hiçbir koşulda başka müşterilere örnek olarak gösterilmez veya 3. şahıslara verilmez.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: KVKK Madde 11 Kapsamındaki Haklarınız */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">5</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                KVKK Madde 11 Kapsamındaki Haklarınız
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>Veri sahibi olarak 6698 sayılı Kanun'un 11. maddesi uyarınca şu haklara sahipsiniz:</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>Kişisel verilerinizin işlenip işlenmediğini öğrenme</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>İşlenmişse buna ilişkin bilgi talep etme</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>Yanlış veya eksik verilerin düzeltilmesini isteme</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>Verilerin silinmesini veya anonim kılınmasını isteme</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-4">
                Başvurularınızı <strong>info@mavibasim.com</strong> e-posta adresimize yazılı olarak iletebilirsiniz. Talepleriniz en geç 30 gün içerisinde ücretsiz olarak sonuçlandırılacaktır.
              </p>
            </div>
          </section>

        </div>

        {/* Accordion FAQ Section */}
        <section className="my-16 bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle size={24} className="text-primary" />
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                Gizlilik &amp; KVKK Sık Sorulan Sorular
              </h2>
              <p className="text-xs text-slate-500 font-medium">Veri güvenliği ve kişisel haklarınız ile ilgili merak edilenler</p>
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
        <section className="my-16 bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Kişisel Verileriniz Mavi Basım Güvencesinde
            </h2>
            <p className="text-xs md:text-sm text-emerald-100 font-medium max-w-2xl">
              KVKK bildirimleriniz ve veri güncellemeleriniz için müşteri destek ekibimizle iletişime geçebilirsiniz.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="mailto:info@mavibasim.com"
              className="bg-white text-slate-900 hover:bg-slate-100 font-black text-xs md:text-sm uppercase px-6 py-3.5 rounded-2xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <Mail size={16} className="text-emerald-600" />
              <span>KVKK Başvurusu Gönder</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
