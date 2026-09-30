import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Scale, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Building2, 
  Phone, 
  Mail, 
  Printer, 
  Lock, 
  FileCheck,
  Clock,
  ExternalLink
} from 'lucide-react';
import { WHATSAPP_LINK, PHONE_NUMBER } from '../constants/contact';

export const KullanimSartlariPage: React.FC = () => {
  const canonicalUrl = "https://mavibasim.com/kullanim-sartlari";

  // Schema Definitions
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    "url": canonicalUrl,
    "name": "Kullanım Şartları ve Hizmet Sözleşmesi | Mavi Basım Matbaa",
    "description": "Mavi Basım Matbaa & Reklam web sitesi kullanım şartları, online sipariş koşulları, grafik tasarım telif hakları, PDF onay süreçleri ve yasal sorumluluklar.",
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
        "name": "Kullanım Şartları",
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
        "name": "Siteden sipariş verirken üyelik zorunlu mudur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hayır, mavibasim.com üzerinden üye olmadan misafir kullanıcı olarak da hızlıca teklif alabilir ve siparişinizi WhatsApp veya web formu aracılığıyla oluşturabilirsiniz."
        }
      },
      {
        "@type": "Question",
        "name": "Baskı öncesinde grafik tasarım dosyaları nasıl kontrol edilir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tarafınızdan iletilen tüm grafik dosyalar uzman grafik ekibimiz tarafından CMYK renk formatı, 300 DPI çözünürlük ve +3 mm bleed (taşma payı) açısından ücretsiz kontrol edilerek dijital PDF prova olarak onayınıza sunulur."
        }
      },
      {
        "@type": "Question",
        "name": "Onaylanan grafik dosyasındaki imla veya bilgi hatalarından kim sorumludur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Müşteri tarafından yazılı veya dijital olarak onaylanan PDF prova dosyasındaki tüm içerik, telefon numarası, adres ve yazım hatalarının sorumluluğu müşteriye aittir. Onay sonrası baskıya giren işlerde değişiklik yapılamaz."
        }
      },
      {
        "@type": "Question",
        "name": "Web sitesindeki fiyatlara KDV dahil midir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sitemizde aksi açıkça belirtilmedikçe matbaa ürün fiyatları KDV hariç olarak listelenmektedir. Sipariş ödeme aşamasında yasal KDV oranı (+%20) eklenerek toplam tutar hesaplanır."
        }
      },
      {
        "@type": "Question",
        "name": "Uyuşmazlık durumunda yetkili mahkeme neresidir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "İşbu kullanım şartlarından doğabilecek her türlü hukuki uyuşmazlığın çözümünde İstanbul Bakırköy Mahkemeleri ve İcra Daireleri yetkilidir."
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
    "name": "Mavi Basım Matbaa & Reklam Hizmet Şartları",
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
      q: "Siteden sipariş verirken üyelik zorunlu mudur?",
      a: "Hayır, mavibasim.com üzerinden üyelik şartı bulunmamaktadır. Dilerseniz sipariş formlarımız veya WhatsApp hattımız üzerinden doğrudan müşteri temsilcilerimizle iletişime geçerek hızlıca sipariş oluşturabilirsiniz."
    },
    {
      q: "Baskı öncesinde grafik tasarım dosyaları nasıl kontrol edilir?",
      a: "Tarafınızdan iletilen tüm grafik dosyaları (PDF, AI, CDR, PSD, TIFF vb.) tecrübeli grafik ekibimiz tarafından teknik kontrolden geçirilir. CMYK renk uzayı, 300 DPI çözünürlük, kırım çizgileri ve +3 mm kesim payı (bleed) incelenip onay için dijital PDF prova olarak tarafınıza iletilir."
    },
    {
      q: "Onaylanan grafik dosyasındaki imla veya bilgi hatalarından kim sorumludur?",
      a: "Müşteri tarafından dijital veya yazılı olarak onaylanan PDF prova belgesinde yer alan tüm yazım, adres, telefon ve tasarım hatalarının sorumluluğu müşteriye aittir. Onay alınan dosyalar doğrudan Heidelberg ve dijital baskı ünitelerine gönderildiğinden, onay sonrası revize kabul edilmemektedir."
    },
    {
      q: "Web sitesindeki fiyatlara KDV dahil midir?",
      a: "Sitemizde sunulan matbaa ve reklam baskı fiyatları aksi belirtilmedikçe net tutarlar olup yasal KDV (+%20) ödeme adımında eklenecektir. Tüm siparişler resmi kurumsal fatura ile sevk edilmektedir."
    },
    {
      q: "Uyuşmazlık durumunda yetkili mahkeme neresidir?",
      a: "İşbu sözleşme ve kullanım şartlarından kaynaklanan tüm hukuki süreçlerde Türk Hukuku geçerli olup, yetkili yargı mercii İstanbul Bakırköy Mahkemeleri ve İcra Daireleridir."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Helmet SEO Metadata */}
      <Helmet>
        <title>Kullanım Şartları ve Hizmet Sözleşmesi | Mavi Basım Matbaa</title>
        <meta name="description" content="Mavi Basım Matbaa & Reklam mavibasim.com web sitesi kullanım şartları, online sipariş kuralları, fikri mülkiyet hakları, grafik tasarım onay süreçleri ve yasal sorumluluklar." />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* OpenGraph & Twitter */}
        <meta property="og:title" content="Kullanım Şartları ve Hizmet Sözleşmesi | Mavi Basım Matbaa" />
        <meta property="og:description" content="Mavi Basım Matbaa & Reklam web sitesi kullanım şartları, sipariş onay süreçleri ve yasal yükümlülükler rehberi." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://mavibasim.com/mavilogo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kullanım Şartları | Mavi Basım Matbaa" />
        <meta name="twitter:description" content="Mavi Basım Matbaa & Reklam resmi web sitesi hizmet kullanım şartları ve telif hakları." />

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
            <span className="text-slate-900">Kullanım Şartları</span>
          </nav>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-[#00E5FF] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-primary/30">
                <Scale size={16} /> Yasal Bildirim &amp; Kullanım Kuralları
              </div>
              <h1 id="hero-title" className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight text-white">
                Web Sitesi Kullanım Şartları ve Hizmet Sözleşmesi
              </h1>
              <p id="intro-summary" className="text-slate-300 text-sm md:text-base font-medium leading-relaxed">
                Mavi Basım Matbaa &amp; Reklam (mavibasim.com) web platformunu kullanan, sipariş oluşturan ve matbaa hizmetlerimizden yararlanan tüm bireysel ve kurumsal kullanıcılar işbu sözleşme hükümlerini kabul etmiş sayılır.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/15 shrink-0 space-y-3 text-xs font-semibold">
              <div className="flex items-center gap-2 text-[#00E5FF]">
                <Clock size={16} />
                <span>Son Güncelleme: 1 Ocak 2026</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Building2 size={16} className="text-primary" />
                <span>İstanbul Topkapı İmalat Tesisleri</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck size={16} />
                <span>%100 Yasal &amp; Kurumsal Güvence</span>
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
              <FileCheck size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Sipariş &amp; PDF Onayı</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Tüm siparişlerde dijital PDF prova onayı alınır. Onaylanan dosya doğrudan üretime sevk edilir.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
              <Lock size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Fikri Mülkiyet &amp; Telif</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Müşterinin ilettiği grafik tasarımların telif ve lisans sorumluluğu tamamen sipariş verene aittir.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4">
              <Printer size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Üretim Toleransları</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Ofset ve dijital baskı standartlarında %1-%3 renk ve kesim milimetrik toleransı uluslararası normdur.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-4">
              <Scale size={20} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Yetkili Yargı</h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Hukuki uyuşmazlıklarda İstanbul Bakırköy Mahkemeleri ve İcra Daireleri münhasıran yetkilidir.
            </p>
          </div>
        </div>

        {/* Detailed Terms Content Sections */}
        <div className="space-y-8">
          
          {/* Section 1: Taraflar ve Tanımlar */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">1</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Taraflar ve Tanımlar
              </h2>
            </div>
            <div className="prose max-w-none text-slate-700 text-sm md:text-base font-medium space-y-4 leading-relaxed">
              <p>
                İşbu Kullanım Şartları Sözleşmesi; Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB Zeytinburnu / İstanbul adresinde mukim <strong>Mavi Basım Matbaa &amp; Reklam</strong> ("Mavi Basım" veya "Şirket") ile <strong>mavibasim.com</strong> alan adlı web sitesine erişim sağlayan, içeriklerden faydalanan, teklif alan veya sipariş oluşturan gerçek ya da tüzel kişiler ("Kullanıcı" veya "Müşteri") arasında akdedilmiştir.
              </p>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-black text-slate-900 uppercase text-xs tracking-wider">Tanımlar:</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm text-slate-600">
                  <li><strong>Web Sitesi:</strong> mavibasim.com ve buna bağlı tüm alt sayfalar.</li>
                  <li><strong>Hizmet:</strong> Mavi Basım tarafından sunulan ofset baskı, dijital baskı, grafik tasarım, kutu ambalaj üretimi, kargo sevkiyatı ve danışmanlık faaliyetleri.</li>
                  <li><strong>Ürün:</strong> Kartvizit, broşür, el ilanı, etiket, kutu, karton çanta, buzdolabı magneti, afiş, diplomat zarf, antetli kağıt ve benzeri matbaa materyalleri.</li>
                  <li><strong>PDF Prova:</strong> Baskı öncesinde müşterinin yazılı onayına sunulan dijital mizanpaj belgesi.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Hizmet Kapsamı ve Online Sipariş Koşulları */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">2</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Hizmet Kapsamı ve Sipariş Koşulları
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>
                Mavi Basım, kullanıcılarına kişiselleştirilmiş matbaa ve reklam baskı hizmeti sunmaktadır. Kullanıcı, web sitesi veya WhatsApp hattı üzerinden tercih ettiği ürünlerin ebat, gramaj, selefon kaplama, lak, kırım ve adet özelliklerini belirleyerek sipariş talebinde bulunur.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200">
                  <h4 className="font-black text-blue-900 text-sm mb-1 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-blue-600" /> Sipariş Sürecinin Başlaması
                  </h4>
                  <p className="text-xs text-blue-800 leading-relaxed font-medium">
                    Siparişler, grafik tasarım dosyasının iletilmesi, teknik kontrolden geçmesi, ödeme teyidinin alınması ve dijital PDF provaya onay verilmesi ile resmen imalat sürecine girer.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <h4 className="font-black text-amber-900 text-sm mb-1 flex items-center gap-2">
                    <AlertTriangle size={16} className="text-amber-600" /> Üretim Adet ve Renk Toleransları
                  </h4>
                  <p className="text-xs text-amber-800 leading-relaxed font-medium">
                    Ofset toplu baskı teknolojilerinde uluslararası kabul görmüş %1 ila %3 oranında adet firesi ve ekran (RGB) ile kağıt (CMYK) renkleri arasında ton farkı oluşması doğaldır.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Fikri Mülkiyet ve Grafik Tasarım Hakları */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">3</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Fikri Mülkiyet ve Tasarım Telif Sorumluluğu
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>
                Kullanıcı tarafından basılmak üzere Mavi Basım'a iletilen logo, görsel, metin, tipografi ve grafik tasarımların tüm fikri mülkiyet ve telif hakları sorumluluğu sipariş verene aittir.
              </p>
              
              <div className="bg-red-50 p-5 rounded-2xl border border-red-200 space-y-2">
                <h4 className="font-black text-red-900 text-xs uppercase tracking-wider">Yasal Sorumluluk Reddi (Copyright Disclaimer):</h4>
                <p className="text-xs text-red-800 leading-relaxed">
                  Müşteri; ilettiği tasarımın üçüncü şahıslara ait marka, patent, telif veya lisans haklarını ihlal etmediğini beyan ve taahhüt eder. Mavi Basım, telif hakkı ihlali iddialarından doğacak her türlü tazminat, idari para cezası ve hukuki giderlerden muaf olup; bu hususta doğacak tüm zararlar doğrudan müşteriye rücu edilecektir.
                </p>
              </div>

              <p className="text-xs text-slate-600">
                Mavi Basım web sitesindeki tüm tasarımlar, metinler, logolar, kodlar ve görsel içerikler Mavi Basım Matbaa &amp; Reklam'a aittir. Yazılı izin olmaksızın kopyalanamaz, çoğaltılamaz veya ticari amaçla kullanılamaz.
              </p>
            </div>
          </section>

          {/* Section 4: Dijital PDF Prova ve Onay Protokolü */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">4</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Dijital PDF Prova ve Baskı Onay Protokolü
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>
                Mavi Basım, müşteri memnuniyeti ilkesi gereği baskı işleminden önce hazırlanan mizanpajı dijital PDF formatında onay için müşteriye iletir.
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-slate-600">
                <li><strong>Kontrol Yükümlülüğü:</strong> Müşteri, gönderilen PDF provada yer alan telefon numaraları, adres bilgileri, isimler, fiyatlar, ürün kodları, imla kuralları ve grafik yerleşimlerini eksiksiz kontrol etmekle yükümlüdür.</li>
                <li><strong>Yazılı Onay:</strong> Müşterinin WhatsApp veya e-posta üzerinden "Baskı Onaylanmıştır" ibaresini iletmesiyle onay süreci tamamlanır.</li>
                <li><strong>Onay Sonrası Revize İmkansızlığı:</strong> Onaylanan dosyalar anında kalıp pozlama veya dijital üniteye aktarıldığından, onay sonrasında fark edilen hatalardan Mavi Basım sorumlu tutulamaz.</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Fiyatlandırma, Vergilendirme ve Ödeme Şartları */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">5</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Fiyatlandırma, Vergi ve Ödeme Koşulları
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>
                mavibasim.com web sitemizde ve fiyat listelerimizde aksi açıkça ifade edilmedikçe tutarlar KDV hariç olarak sergilenmektedir. Sipariş kesinleştirme adımında yasal %20 KDV oranı eklenerek resmi fatura düzenlenir.
              </p>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider mb-2">Ödeme Yöntemleri:</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ödemeler Havale/EFT ve Güvenli Sanal POS (Kredi Kartı) aracılığıyla yapılabilir. Özel üretim matbaa materyallerinde ödeme teyidi alınmadan hammaddeler kesilmez ve üretime başlanmaz.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Uyuşmazlıkların Çözümü ve Yetkili Mahkeme */}
          <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm">6</span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Mücbir Sebepler ve Yetkili Mahkeme
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 text-sm md:text-base font-medium leading-relaxed">
              <p>
                Deprem, yangın, sel gibi doğal afetler, savaş, grev, ulusal elektrik veya internet altyapı çöküntüleri ve hammadde ithalat krizleri gibi mücbir sebep hallerinde Mavi Basım gecikmelerden ötürü sorumlu tutulamaz.
              </p>
              <p className="text-xs text-slate-600">
                İşbu sözleşmenin uygulanmasından veya yorumlanmasından doğacak her türlü uyuşmazlığın çözümünde Türk Hukuku uygulanacak olup, <strong>İstanbul Bakırköy Mahkemeleri ve İcra Daireleri</strong> yetkilidir.
              </p>
            </div>
          </section>

        </div>

        {/* Process Timeline Section */}
        <section className="my-16 bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black text-primary uppercase tracking-widest block mb-1">Adım Adım Güvenli İşleyiş</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Sipariş &amp; Üretim Kullanım Süreç Adımları
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center relative">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center mx-auto mb-3">1</span>
              <h3 className="font-black text-slate-900 text-sm mb-1">Talep Oluşturma</h3>
              <p className="text-xs text-slate-600 font-medium">Siteden ürün seçip özellik ve adet belirleme.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center relative">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center mx-auto mb-3">2</span>
              <h3 className="font-black text-slate-900 text-sm mb-1">Grafik &amp; PDF Kontrolü</h3>
              <p className="text-xs text-slate-600 font-medium">300 DPI ve CMYK teknik mizanpaj denetimi.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center relative">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center mx-auto mb-3">3</span>
              <h3 className="font-black text-slate-900 text-sm mb-1">Yazılı Onay &amp; Ödeme</h3>
              <p className="text-xs text-slate-600 font-medium">PDF provaya onay ve ödeme teyidinin alınması.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center relative">
              <span className="w-8 h-8 rounded-full bg-primary text-white font-black text-xs flex items-center justify-center mx-auto mb-3">4</span>
              <h3 className="font-black text-slate-900 text-sm mb-1">İmalat &amp; Kargo</h3>
              <p className="text-xs text-slate-600 font-medium">Heidelberg baskı sonrası 81 ile sevk.</p>
            </div>
          </div>
        </section>

        {/* Accordion FAQ Section */}
        <section className="my-16 bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle size={24} className="text-primary" />
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                Kullanım Şartları Sık Sorulan Sorular
              </h2>
              <p className="text-xs text-slate-500 font-medium">Yasal şartlar ve sipariş süreci hakkında merak edilenler</p>
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

        {/* Internal Linking Section */}
        <section className="my-16 bg-slate-900 text-white rounded-3xl p-8 md:p-10 border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black text-primary uppercase tracking-widest block mb-1">Kurumsal Baskı Kataloğumuz</span>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                Mavi Basım Popüler Matbaa Ürünleri
              </h2>
            </div>
            <Link to="/brosur" className="text-xs font-black text-primary hover:text-white uppercase tracking-wider inline-flex items-center gap-1 transition-colors">
              <span>Tüm Ürünleri Gör</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { title: "Kartvizit Baskı", path: "/kartvizit" },
              { title: "Broşür Baskı", path: "/brosur" },
              { title: "El İlanı Baskı", path: "/el-ilani" },
              { title: "Sticker & Etiket", path: "/etiket" },
              { title: "Kutu & Ambalaj", path: "/kutu" },
              { title: "Karton Çanta", path: "/karton-canta" }
            ].map((prod, idx) => (
              <Link 
                key={idx} 
                to={prod.path}
                className="bg-slate-800/80 hover:bg-slate-800 p-4 rounded-xl border border-slate-700/80 hover:border-primary text-center group transition-all"
              >
                <span className="text-xs font-black text-slate-200 group-hover:text-primary transition-colors block">
                  {prod.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="my-16 bg-gradient-to-r from-primary via-blue-600 to-indigo-700 rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Kullanım Şartları Hakkında Sorunuz mu Var?
            </h2>
            <p className="text-xs md:text-sm text-blue-100 font-medium max-w-2xl">
              Hukuki bildirimlerimiz veya sipariş süreçleriniz hakkında bilgi almak için müşteri temsilcilerimizle haftanın 6 günü iletişime geçebilirsiniz.
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
              <span>WhatsApp İle Ulaşın</span>
            </a>
            <Link
              to="/iletisim"
              className="bg-white text-slate-900 hover:bg-slate-100 font-black text-xs md:text-sm uppercase px-6 py-3.5 rounded-2xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>İletişim Sayfası</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
