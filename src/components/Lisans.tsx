import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Building2, 
  Phone, 
  Mail, 
  Printer, 
  Clock,
  Sparkles,
  Camera,
  ExternalLink,
  Lock
} from 'lucide-react';
import { WHATSAPP_LINK, PHONE_NUMBER } from '../constants/contact';

export const LisansPage: React.FC = () => {
  const canonicalUrl = "https://mavibasim.com/lisans";

  // Schema Definitions
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    "url": canonicalUrl,
    "name": "Görsel Lisansı ve Telif Hakları Politikası | Mavi Basım Matbaa",
    "description": "Mavi Basım Matbaa & Reklam web sitesinde ve blog sayfalarında yer alan görsel materyallerin lisanslama koşulları, telif hakları ve kullanım izinleri.",
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
        "name": "Görsel Lisansı",
        "item": canonicalUrl
      }
    ]
  };

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Blog makalelerinizdeki infografik ve görselleri sitemde kullanabilir miyim?",
      a: "Blog yazılarımızdaki bilgilendirici grafikler ve görseller, ticari olmayan eğitim veya haber amaçlı kullanımlarda; 'Mavi Basım' adı ve ilgili blog yazısına tıklanabilir aktif bağlantı (backlink) verilmesi şartıyla kaynak gösterilerek kullanılabilir."
    },
    {
      q: "Ürün fotoğraflarını ticari amaçla başka bir e-ticaret sitesinde kullanabilir miyim?",
      a: "Hayır. Mavi Basım web sitesinde yer alan ürün çekimleri, mockup tasarımları ve tanıtım görselleri izinsiz olarak başka bir ticari platformda, katalogda veya satış kanalında kullanılamaz. İhlaller durumunda 5846 sayılı Fikir ve Sanat Eserleri Kanunu kapsamında yasal işlem başlatılır."
    },
    {
      q: "Tasarımını yaptırdığım matbaa işinin görsel telif hakları kime aittir?",
      a: "Mavi Basım grafik ekibine yaptırdığınız tasarımlarda, nihai onay ve teslimat sonrasında tasarımın kullanım ve baskı hakları tamamen müşteriye aittir. Çalışmalarınız için ek telif veya lisans ücreti talep edilmez."
    },
    {
      q: "Yüksek çözünürlüklü basın ve medya görselleri için nasıl izin alabilirim?",
      a: "Sektörel haber, akademik araştırma veya medya yayınları için yüksek çözünürlüklü görsel ve materyal izin taleplerinizi info@mavibasim.com adresine ya da WhatsApp hattımıza iletebilirsiniz."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <Helmet>
        <title>Görsel Lisansı ve Telif Hakları Politikası | Mavi Basım Matbaa</title>
        <meta name="description" content="Mavi Basım Matbaa & Reklam web sitesi ve blog içeriklerinde kullanılan görsel materyallerin lisans koşulları, telif hakları ve kullanım şartları." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Görsel Lisansı ve Telif Hakları Politikası | Mavi Basım" />
        <meta property="og:description" content="Mavi Basım Matbaa & Reklam görsel lisanslama şartları, telif koruması ve atıf kuralları." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Görsel Lisansı ve Telif Hakları | Mavi Basım" />
        <meta name="twitter:description" content="Mavi Basım Matbaa & Reklam görsel materyalleri lisanslama koşulları." />
        <script type="application/ld+json">
          {JSON.stringify(webPageSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Hero / Header Section */}
      <section className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#29ADDF_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-xs md:text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
              </li>
              <li className="flex items-center space-x-2">
                <span>/</span>
                <span className="text-white font-medium">Görsel Lisansı</span>
              </li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold mb-4">
            <Camera size={14} />
            <span>Fikir ve Sanat Eserleri Koruma İlkeleri</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
            Görsel Lisansı &amp; Telif Hakları
          </h1>
          
          <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Mavi Basım Matbaa &amp; Reklam web sitesi (<span className="text-primary font-semibold">mavibasim.com</span>) ve Matbaa Akademi blog sayfalarında yer alan tüm görsel, grafik ve tasarım materyallerinin lisans koşulları aşağıda tanımlanmıştır.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-primary" />
              <span>Son Güncelleme: 1 Ocak 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 size={14} className="text-primary" />
              <span>Mavi Basım Matbaa &amp; Reklam San. Tic.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>5846 Sayılı FSEK Kapsamında Korunmaktadır</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Legal Content */}
          <div className="lg:col-span-8 space-y-8">

            {/* Madde 1: Genel Kapsam */}
            <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black text-sm">
                  1
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Görsel Materyallerin Mülkiyeti ve Telif Hakları
                </h2>
              </div>
              <div className="text-slate-650 text-sm leading-relaxed space-y-3 font-medium">
                <p>
                  <strong>mavibasim.com</strong> alan adı altında ve Mavi Basım Matbaa &amp; Reklam resmi iletişim kanallarında yayınlanan tüm ürün fotoğrafları, 3D maketler (mockup), teknik şablonlar, infografikler, sektörel çizimler ve blog kapak görselleri; Türkiye Cumhuriyeti 5846 sayılı Fikir ve Sanat Eserleri Kanunu ile uluslararası telif hakları mevzuatı çerçevesinde münhasıran <strong>Mavi Basım</strong> mülkiyetindedir.
                </p>
                <p>
                  Sitede yer alan hiçbir görsel materyal, aksi açıkça yazılı olarak belirtilmedikçe kamu malı (public domain) veya telifsiz (royalty-free) olarak değerlendirilemez.
                </p>
              </div>
            </article>

            {/* Madde 2: Blog Görselleri Lisans Şartları */}
            <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black text-sm">
                  2
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Blog ve Eğitim İçerikleri Görsel Lisansı (Atıf Şartı)
                </h2>
              </div>
              <div className="text-slate-650 text-sm leading-relaxed space-y-3 font-medium">
                <p>
                  Matbaa Akademi ve sektörel blog sayfalarımızdaki özgün görseller, bilgi paylaşımını ve sektörel standartları teşvik amacıyla aşağıdaki koşullarla paylaşılabilir:
                </p>
                <ul className="space-y-2.5 pt-2">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Atıf Yapma Zorunluluğu:</strong> Görselin kullanıldığı sayfada görünür şekilde <em>"Kaynak: Mavi Basım Matbaa"</em> ifadesi ve görselin ait olduğu blog sayfasına veya doğrudan <code className="text-xs bg-slate-100 px-1 py-0.5 rounded text-slate-800">https://mavibasim.com</code> adresine dofollow tıklanabilir bağlantı verilmelidir.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Ticari Olmayan Amaç (Non-Commercial):</strong> Blog görselleri eğitim, akademik araştırma, haber ve bilgilendirme amaçlı kullanılabilir; rakip ticari matbaa veya baskı hizmeti satışı amacıyla doğrudan kullanılamaz.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Tahrif Etmeme (Değişiklik Yasağı):</strong> Görseller üzerindeki Mavi Basım logosu, filigranı veya telif ibareleri silinemez ve yanıltıcı içeriklerle birleştirilemez.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Madde 3: Ürün Fotoğrafları ve Mockuplar */}
            <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black text-sm">
                  3
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Ürün Sayfaları ve Ticari Çekimler
                </h2>
              </div>
              <div className="text-slate-650 text-sm leading-relaxed space-y-3 font-medium">
                <p>
                  Kartvizit, broşür, kutu, ambalaj, oto paspas, amerikan servis, etiket ve makbuz kategorilerimizde sergilenen gerçek ürün numune fotoğrafları ve stüdyo çekimleri ticari satış teşhirine tabidir.
                </p>
                <p>
                  Bu görsellerin herhangi bir e-ticaret platformunda, sosyal medya reklamında veya pazaryerinde (Trendyol, Hepsiburada, Amazon vb.) satıcılar tarafından yetkisiz olarak kopyalanması, tescilli fikri mülkiyet ihlali teşkil eder ve derhal ihtarnameli yasal sürece konu edilir.
                </p>
              </div>
            </article>

            {/* Madde 4: Müşteri Tasarımları */}
            <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black text-sm">
                  4
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Müşteri Baskı Dosyaları ve Özel Tasarım Telifi
                </h2>
              </div>
              <div className="text-slate-650 text-sm leading-relaxed space-y-3 font-medium">
                <p>
                  Müşterilerimizin baskı siparişleri için ilettiği kurumsal logolar, ticari belgeler, fatura şablonları ve özel tasarım dosyaları gizlilik politikamız uyarınca korunur. Müşteri izni olmaksızın portföy veya blog görseli olarak yayınlanmaz.
                </p>
                <p>
                  Aynı şekilde, Mavi Basım tarafından sıfırdan hazırlanan grafik tasarım çalışmalarının nihai onayından sonra katmanlı orijinal baskı dosyaları eksiksiz olarak müşteriye devredilir ve ek lisans ücreti talep edilmez.
                </p>
              </div>
            </article>

            {/* Madde 5: İhlal Bildirimi */}
            <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-black text-sm">
                  5
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Telif İhlali Bildirimi ve Lisans Talepleri
                </h2>
              </div>
              <div className="text-slate-650 text-sm leading-relaxed space-y-3 font-medium">
                <p>
                  Tarafınıza ait tescilli bir görsel veya markanın sitemizde yer aldığını düşünüyorsanız veya görsel materyallerimizin ticari lisansını edinmek istiyorsanız aşağıdaki resmi iletişim kanallarımız üzerinden başvurabilirsiniz. Bildirimleriniz hukuk ve grafik koordinasyon birimimizce en geç 48 saat içerisinde değerlendirilir.
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5 font-semibold text-slate-700">
                  <p><strong>Unvan:</strong> Mavi Basım Matbaa &amp; Reklam</p>
                  <p><strong>Adres:</strong> Topkapı 2. Matbaacılar Sitesi B Blok No:2NB Zeytinburnu / İstanbul</p>
                  <p><strong>E-posta:</strong> info@mavibasim.com</p>
                  <p><strong>Telefon / WhatsApp:</strong> {PHONE_NUMBER}</p>
                </div>
              </div>
            </article>

            {/* FAQ Section */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mb-4 flex items-center gap-2">
                <HelpCircle size={20} className="text-primary" />
                <span>Görsel Lisansı Hakkında Sıkça Sorulan Sorular</span>
              </h2>
              <div className="divide-y divide-slate-100">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="py-3.5 first:pt-0 last:pb-0">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left flex justify-between items-center gap-4 py-1 text-slate-900 hover:text-primary transition-colors focus:outline-none"
                    >
                      <span className="font-bold text-xs sm:text-sm">{faq.q}</span>
                      {openFaq === idx ? (
                        <ChevronUp size={16} className="text-primary shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-slate-400 shrink-0" />
                      )}
                    </button>
                    {openFaq === idx && (
                      <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pl-1">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar / Quick Links */}
          <aside className="lg:col-span-4 space-y-6">

            {/* Quick Contact Card */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-sm space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">
                <Sparkles size={12} />
                <span>Lisans &amp; Görsel Talepleri</span>
              </div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                Görsel Kullanım İzni İsteyin
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Yayın, tez, basın bülteni veya akademik çalışmalarınız için yüksek çözünürlüklü görsel materyalleri talep edebilirsiniz.
              </p>
              <div className="space-y-2.5 pt-2">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-colors"
                >
                  <span>WhatsApp ile İletişime Geçin</span>
                </a>
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-colors border border-white/15"
                >
                  <Phone size={14} />
                  <span>{PHONE_NUMBER}</span>
                </a>
              </div>
            </div>

            {/* Related Legal Policies */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                İlgili Hukuki Belgelerimiz
              </h3>
              <nav className="space-y-2 text-xs font-bold">
                <Link
                  to="/kullanim-sartlari"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary text-slate-700 transition-colors"
                >
                  <span>Kullanım Şartları</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/gizlilik-politikasi"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary text-slate-700 transition-colors"
                >
                  <span>Gizlilik Politikası (KVKK)</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/mesafeli-satis-sozlesmesi"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary text-slate-700 transition-colors"
                >
                  <span>Mesafeli Satış Sözleşmesi</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/teslimat-sartlari"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary text-slate-700 transition-colors"
                >
                  <span>Teslimat Koşulları</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/cerez-politikasi"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary text-slate-700 transition-colors"
                >
                  <span>Çerez Politikası</span>
                  <ArrowRight size={14} />
                </Link>
              </nav>
            </div>

            {/* Matbaa Akademi Link */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Matbaa Akademi &amp; Blog
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Matbaa ve ofset baskı dünyasıyla ilgili rehberlerimizi, teknik dosya hazırlama kurallarını ve sektörel makalelerimizi inceleyin.
              </p>
              <div className="pt-2">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:underline"
                >
                  <span>Blog Yazılarına Göz Atın</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

          </aside>

        </div>
      </main>
    </div>
  );
};
