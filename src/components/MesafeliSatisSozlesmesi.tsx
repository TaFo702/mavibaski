import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Scale, 
  ShieldCheck, 
  FileCheck, 
  Truck, 
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
  RefreshCw,
  Lock
} from 'lucide-react';
import { WHATSAPP_LINK, PHONE_NUMBER } from '../constants/contact';

export const MesafeliSatisSozlesmesiPage: React.FC = () => {
  const canonicalUrl = "https://mavibasim.com/mesafeli-satis-sozlesmesi";

  // Schema Definitions
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    "url": canonicalUrl,
    "name": "Mesafeli Satış Sözleşmesi | Mavi Basım Matbaa & Reklam",
    "description": "Mavi Basım Matbaa & Reklam mavibasim.com mesafeli satış sözleşmesi, online matbaa sipariş şartları, 6502 sayılı kanun kişiselleştirilmiş ürün yönetmeliği ve cayma hakkı istisnası.",
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
        "name": "Mesafeli Satış Sözleşmesi",
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
        "name": "Matbaa ve baskı ürünlerinde cayma hakkı var mıdır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği Madde 15/1-b uyarınca; tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan kişiselleştirilmiş (baskılı) mallarda cayma hakkı kullanılamaz."
        }
      },
      {
        "@type": "Question",
        "name": "Sipariş henüz baskıya girmediyse iptal edilebilir mi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet. Tasarım aşamasında olan veya henüz dijital PDF provasına onay verilip imalata gönderilmemiş siparişleriniz ücretsiz olarak iptal edilebilir ve paranız iade edilir."
        }
      },
      {
        "@type": "Question",
        "name": "Baskı hatası oluşursa süreç nasıl işler?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Firmamız kaynaklı yanlış renk baskısı, hatalı kesim veya eksik imalat durumunda; hatalı ürün görselleri ile bildirim yapıldığında siparişiniz öncelikli olarak ücretsiz yeniden basılarak adresinize sevk edilir."
        }
      },
      {
        "@type": "Question",
        "name": "Kargo teslimatında hasarlı paket görürsem ne yapmalıyım?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kargo görevlisinin yanında paketi açıp 'Hasar Tespit Tutanağı' tutturmalı ve ürünü teslim almamalısınız. Tutanak tarafımıza ulaştığında yeni ürününüz derhal basılır."
        }
      },
      {
        "@type": "Question",
        "name": "Hangi mahkeme veya hakem heyeti yetkilidir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tüketici işlemlerinde Ticaret Bakanlığı'nca ilan edilen parasal sınırlar dahilinde Tüketici Hakem Heyetleri ile İstanbul Bakırköy Tüketici Mahkemeleri ve İcra Daireleri yetkilidir."
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
    "name": "Mavi Basım Mesafeli Satış Sözleşmesi Şartları",
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
      q: "Matbaa ve baskı ürünlerinde cayma hakkı var mıdır?",
      a: "6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği Madde 15/1-b bendi gereğince; 'Tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan mallara ilişkin sözleşmelerde' cayma hakkı kullanılamaz. Kartvizit, broşür, kutu, etiket gibi size özel basılan ürünler başka bir müşteriye satılamayacağı için imalata girdikten sonra cayma hakkı kapsamı dışındadır."
    },
    {
      q: "Sipariş henüz baskıya girmediyse iptal edilebilir mi?",
      a: "Evet. Henüz grafik aşamasında olan, kalıbı pozlanmamış veya dijital PDF provasına onay verilmemiş siparişlerinizi koşulsuz ve ücretsiz iptal edebilirsiniz."
    },
    {
      q: "Baskı hatası oluşursa süreç nasıl işler?",
      a: "Mavi Basım kaynaklı imalat hatası (onaylanan PDF provadan farklı basılması, hatalı kesim, lekeli baskı vb.) durumunda müşteri memnuniyeti garantimiz kapsamında siparişiniz öncelikli olarak derhal yeniden basılır ve ücretsiz kargolanır."
    },
    {
      q: "Kargo teslimatında hasarlı paket görürsem ne yapmalıyım?",
      a: "Teslimat sırasında pakette ezilme, yırtılma veya ıslanma görürseniz kargo kuryesinden 'Kargo Hasar Tespit Tutanağı' düzenlemesini isteyerek paketi teslim almayınız ve durumu bize bildiriniz."
    },
    {
      q: "Hangi mahkeme veya hakem heyeti yetkilidir?",
      a: "Uyuşmazlıklarda Ticaret Bakanlığı tarafından her yıl belirlenen parasal sınırlar dahilinde Alıcının veya Satıcının yerleşim yerindeki Tüketici Hakem Heyetleri ile İstanbul Bakırköy Tüketici Mahkemeleri yetkilidir."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Helmet SEO Metadata */}
      <Helmet>
        <title>Mesafeli Satış Sözleşmesi | Mavi Basım Matbaa &amp; Reklam</title>
        <meta name="description" content="Mavi Basım Matbaa & Reklam mavibasim.com mesafeli satış sözleşmesi, online matbaa sipariş şartları, 6502 sayılı kanun kişiselleştirilmiş ürün yönetmeliği ve cayma hakkı istisnası." />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* OpenGraph & Twitter */}
        <meta property="og:title" content="Mesafeli Satış Sözleşmesi | Mavi Basım Matbaa & Reklam" />
        <meta property="og:description" content="Mavi Basım Matbaa online sipariş mesafeli satış sözleşmesi, haklar ve yükümlülükler." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://mavibasim.com/mavilogo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mesafeli Satış Sözleşmesi | Mavi Basım Matbaa" />
        <meta name="twitter:description" content="Mavi Basım Matbaa resmi mesafeli satış sözleşmesi metni." />

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
            <span className="text-slate-900">Mesafeli Satış Sözleşmesi</span>
          </nav>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-purple-500/30">
                <Scale size={16} /> 6502 Sayılı TKHK &amp; Mesafeli Sözleşmeler Yönetmeliği
              </div>
              <h1 id="hero-title" className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white">
                Mesafeli Satış Sözleşmesi
              </h1>
              <p id="intro-summary" className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">
                İşbu sözleşme, Mavi Basım Matbaa &amp; Reklam (mavibasim.com) üzerinden elektronik ortamda verilmiş olan matbaa, reklam ve ambalaj baskı siparişlerinin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun hükümleri uyarınca tarafların hak ve yükümlülüklerini düzenler.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 shrink-0 space-y-3 text-xs font-semibold">
              <div className="flex items-center gap-2 text-purple-300">
                <FileCheck size={16} />
                <span>6502 Sayılı Kanun Uyumlu Hizmet</span>
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
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-4">
              <Building2 size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Satıcı Bilgileri</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Mavi Basım Matbaa &amp; Reklam, Topkapı 2. Matbaacılar Sitesi B Blok No:2NB Zeytinburnu / İstanbul.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 text-cyan-600 flex items-center justify-center font-bold mb-4">
              <FileCheck size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">PDF Prova Onayı</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              İmalat öncesinde dijital PDF prova onayı alınarak sipariş basıma iletilir.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">
              <AlertTriangle size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Cayma Hakkı İstisnası</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Yönetmelik Madde 15/1-b uyarınca kişiye/kuruma özel basılan matbaa ürünlerinde imalat sonrası cayma hakkı uygulanmaz.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
              <RefreshCw size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Baskı Garantisi</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Firma kaynaklı imalat ve renk hatalarında ürünleriniz koşulsuz yeniden ücretsiz basılır.
            </p>
          </div>
        </div>

        {/* Detailed Contract Sections */}
        <div className="space-y-8">
          
          {/* Madde 1: Taraflar */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">1</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Madde 1 - Taraflar
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider text-primary">SATICI BİLGİLERİ</h4>
                  <p className="text-xs text-slate-700"><strong>Unvan:</strong> Mavi Basım Matbaa &amp; Reklam</p>
                  <p className="text-xs text-slate-700"><strong>Adres:</strong> Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB Zeytinburnu / İstanbul</p>
                  <p className="text-xs text-slate-700"><strong>Telefon:</strong> +90 536 602 23 73</p>
                  <p className="text-xs text-slate-700"><strong>E-Posta:</strong> info@mavibasim.com</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider text-primary">ALICI BİLGİLERİ</h4>
                  <p className="text-xs text-slate-700">mavibasim.com adresinden sipariş veren, sipariş formunda iletişim ve teslimat bilgileri beyan edilen gerçek veya tüzel kişidir.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Madde 2: Konu ve Kapsam */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">2</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Madde 2 - Sözleşmenin Konusu
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>
                İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait <strong>mavibasim.com</strong> web sitesinden elektronik ortamda siparişini yaptığı matbaa (kartvizit, broşür, el ilanı, etiket, kutu, karton çanta vb.) ürünlerinin satışı, üretimi ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
              </p>
            </div>
          </section>

          {/* Madde 3: Cayma Hakkı ve İstisnaları */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">3</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Madde 3 - Cayma Hakkı ve Yasal İstisnası
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-2">
                <h4 className="font-black text-amber-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-600" /> Kişiselleştirilmiş Ürün İstisnası (Yönetmelik Madde 15/1-b):
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesinin 1. fıkrasının (b) bendi uyarınca; <strong>"Tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan mallara ilişkin sözleşmelerde"</strong> tüketicinin cayma hakkı bulunmamaktadır. Sipariş verilen matbaa ürünleri müşteri unvanı, logosu, adresi ve özel tasarımı ile kişiselleştirilerek basıldığından, imalata giren siparişlerde cayma hakkı ve iade kabul edilmemektedir.
                </p>
              </div>

              <p className="text-xs text-slate-600">
                Henüz baskı kalıbı hazırlanmamış veya PDF provaya onay verilmemiş siparişlerde iptal talebi iletildiği takdirde ödenen tutar 3 iş günü içinde kesintisiz iade edilir.
              </p>
            </div>
          </section>

          {/* Madde 4: Teslimat ve Kargo Esasları */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">4</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Madde 4 - Teslimat Esasları ve Kargo Şartları
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>
                Üretimi tamamlanan basılı materyaller, koruyucuift oluklu kolilerle paketlenerek anlaşmalı kargo şirketleri vasıtasıyla ALICI'nın sipariş formunda belirttiği teslimat adresine sevk edilir. Türkiye'nin 81 iline kargo sevkiyatı yapılmaktadır.
              </p>
            </div>
          </section>

          {/* Madde 5: Yetkili Mahkeme */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">5</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Madde 5 - Uyuşmazlıkların Çözümü
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>
                İşbu sözleşmeden doğan uyuşmazlıklarda, Ticaret Bakanlığı'nca ilan edilen parasal sınırlar dahilinde ALICI'nın veya SATICI'nın yerleşim yerindeki Tüketici Hakem Heyetleri ile <strong>İstanbul Bakırköy Tüketici Mahkemeleri ve İcra Daireleri</strong> yetkilidir.
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
                Mesafeli Satış Sözleşmesi Sık Sorulan Sorular
              </h2>
              <p className="text-xs text-slate-500 font-medium">Sözleşme kuralları ve cayma hakkı istisnaları hakkında yanıtlar</p>
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
        <section className="my-16 bg-gradient-to-r from-purple-700 via-indigo-800 to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Sözleşme ve Sipariş Sorularınız İçin Yanınızdayız
            </h2>
            <p className="text-xs md:text-sm text-purple-100 font-medium max-w-2xl">
              Sipariş şartları, basım öncesi onaylar ve teslimat durumunuz için müşteri destek hattımıza ulaşabilirsiniz.
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
              <span>WhatsApp İle Bilgi Al</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};
