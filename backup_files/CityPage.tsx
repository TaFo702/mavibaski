import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Truck, 
  ShieldCheck, 
  Printer, 
  CheckCircle2, 
  HelpCircle, 
  MessageCircle, 
  PhoneCall, 
  MapPin, 
  ChevronRight,
  Sparkles,
  Building2,
  PackageCheck,
  FileCheck2,
  Clock,
  Box,
  BadgeCheck,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';
import { getCityBySlug, getPriorityCityContent, CITIES_DATA } from '../data/cityData';
import { WHATSAPP_LINK, PHONE_LINK, PHONE_NUMBER } from '../constants/contact';

export const CityPage: React.FC = () => {
  const { citySlug } = useParams<{ citySlug: string }>();

  if (!citySlug) {
    return <Navigate to="/" replace />;
  }

  const city = getCityBySlug(citySlug);

  if (!city) {
    return (
      <>
        <Helmet>
          <title>404 - Şehir Matbaa Sayfası Bulunamadı | Mavi Basım</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-black text-slate-900 mb-4">Şehir Matbaa Sayfası Bulunamadı</h1>
          <p className="text-slate-600 mb-6 font-semibold">Aradığınız şehre ait matbaa sayfası bulunamadı. Ana sayfaya veya tüm kategorilerimize göz atabilirsiniz.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl">
            Ana Sayfaya Dön
          </Link>
        </div>
      </>
    );
  }

  const priorityContent = getPriorityCityContent(city.slug);

  const nearbyCities = CITIES_DATA.filter(c => c.region === city.region && c.slug !== city.slug).slice(0, 8);

  // Workflow steps
  const workflowSteps = [
    { step: "01", title: "Ürün ve Adet Seçimi", desc: "Sitemizdeki ürün kategorisinden ihtiyacınıza uygun ebat ve adedi belirleyin." },
    { step: "02", title: "Tasarım Gönderimi", desc: "Hazır çalışmanızı yükleyin veya WhatsApp hattımızdan teknik ekibimize iletin." },
    { step: "03", title: "Ücretsiz PDF Prova", desc: "Grafik ekibimizce hazırlanan baskı provasını kontrol edip onay verin." },
    { step: "04", title: "Baskı Onayı", desc: "Onayınızın ardından siparişiniz hemen üretim hattına alınır." },
    { step: "05", title: "Topkapı İmalatı", desc: "İstanbul Topkapı tesisimizde Heidelberg & Indigo makinelerde yüksek kalitede basılır." },
    { step: "06", title: "Korumalı Ambalaj", desc: "Çift oluklu kolilerle nem, toz ve ezilmeye karşı emniyete alınır." },
    { step: "07", title: "Şehre Kargo Teslimi", desc: "Anlaşmalı kargo ile adrese teslim güvenle sevk edilir." }
  ];

  if (priorityContent) {
    return (
      <>
        <Helmet>
          <title>{priorityContent.metaTitle}</title>
          <meta name="description" content={priorityContent.metaDescription} />
          <link rel="canonical" href={`https://mavibasim.com/${priorityContent.slug}`} />
        </Helmet>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-400">Şehir Matbaa</span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-900 font-extrabold">{priorityContent.name} Matbaa</span>
          </nav>

          {/* HERO SECTION */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 mb-8 shadow-sm relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap mb-3">
                  <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin size={14} />
                    {city.region} - {priorityContent.name} Sevkiyatlı
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock size={13} />
                    Teslimat: {city.deliveryDays}
                  </span>
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Printer size={13} />
                    İstanbul Topkapı İmalatı
                  </span>
                </div>

                <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                  {priorityContent.h1}
                </h1>
                
                <p className="text-base md:text-lg font-bold text-primary">
                  {priorityContent.heroText}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-sm px-5 py-3 rounded-xl transition-all shadow-md"
                >
                  <MessageCircle size={18} className="fill-white stroke-none" />
                  <span>{priorityContent.name} Özel Teklif Al</span>
                </a>
                <a
                  href={PHONE_LINK}
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all"
                >
                  <PhoneCall size={18} />
                  <span>Müşteri Hizmetleri</span>
                </a>
              </div>
            </div>

            {/* City Specific Intro */}
            <div className="mt-6 text-slate-700 font-semibold text-sm md:text-base leading-relaxed space-y-4">
              <p>{priorityContent.intro}</p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs md:text-sm text-slate-800 font-bold flex items-start gap-3">
                <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong>Üretim & Şeffaflık İlkesi:</strong> Mavi Basım Matbaa & Reklam ürünleri İstanbul Topkapı’daki 2. Matbaacılar Sitesi imalat tesisimizde hazırlanarak {priorityContent.name} ve ilçelerine koruyucu ambalajla güvenli kargo ile gönderilir.
                </span>
              </div>
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <Printer className="text-primary w-4 h-4 shrink-0" />
                <span>Topkapı Fabrika İmalatı</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <FileCheck2 className="text-emerald-600 w-4 h-4 shrink-0" />
                <span>Ücretsiz PDF Prova</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <Truck className="text-primary w-4 h-4 shrink-0" />
                <span>{priorityContent.name} Güvenli Kargo</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <ShieldCheck className="text-emerald-600 w-4 h-4 shrink-0" />
                <span>Komisyonsuz Fabrika Fiyatı</span>
              </div>
            </div>
          </div>

          {/* SECTORS IN CITY */}
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <Building2 className="text-primary w-6 h-6" />
                <span>{priorityContent.name} Sektörlerine Özel Baskı İhtiyaçları</span>
              </h2>
              <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">
                {priorityContent.name} bölgesindeki öne çıkan sektörler ve işletmelere sunduğumuz uzman matbaa çözümleri.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {priorityContent.sectors.map((sec, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-primary/40 transition-all">
                  <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                    <span>{sec.title}</span>
                  </h3>
                  <p className="text-slate-600 font-semibold text-xs leading-relaxed">
                    {sec.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FEATURED PRODUCTS IN CITY */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <Box className="text-primary w-6 h-6" />
                  <span>{priorityContent.name} İşletmelerine Önerilen Baskı Ürünleri</span>
                </h2>
                <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">
                  Doğrudan ürün kategorilerini inceleyebilir ve sipariş hesaplamanızı yapabilirsiniz.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {priorityContent.featuredProducts.map((prod, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                        {priorityContent.name} Özel
                      </span>
                      <Sparkles className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mb-1.5 group-hover:text-primary transition-colors">
                      {prod.name}
                    </h3>
                    
                    <div className="text-[11px] font-bold text-primary mb-2.5">
                      {prod.badge}
                    </div>

                    <p className="text-slate-600 font-semibold text-xs leading-relaxed mb-4">
                      {prod.reason}
                    </p>
                  </div>

                  <Link
                    to={prod.slug}
                    className="inline-flex items-center justify-between bg-slate-900 hover:bg-primary text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-colors mt-2"
                  >
                    <span>Fiyat ve Seçenekleri İncele</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* DISTRICTS & REGIONAL COVERAGE */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-12 shadow-sm">
            <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
              {priorityContent.name} İlçe ve Bölge Sevkiyat Bilgisi
            </h2>
            <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed mb-4">
              {priorityContent.districtsIntro}
            </p>
            <div className="flex flex-wrap gap-2">
              {priorityContent.districts.map((d, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200/80">
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* PRODUCTION & SHIPPING PROCESS (7-STEP WORKFLOW) */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 mb-12 shadow-md">
            <div className="mb-6 text-center max-w-2xl mx-auto">
              <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/20 px-3 py-1 rounded-full inline-block mb-2">
                Şeffaf Hizmet Süreci
              </span>
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">
                Siparişten {priorityContent.name} Teslimatına 7 Adımlı Süreç
              </h2>
              <p className="text-xs md:text-sm font-semibold text-slate-300 mt-1">
                Tüm siparişleriniz adım adım kontrollü şekilde üretilip kargolanır.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {workflowSteps.map((ws, idx) => (
                <div key={idx} className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60 relative">
                  <span className="text-2xl font-black text-primary/40 block mb-1">{ws.step}</span>
                  <h3 className="text-sm font-black text-white uppercase tracking-tight mb-1">{ws.title}</h3>
                  <p className="text-xs font-medium text-slate-300 leading-relaxed">{ws.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DETAILS & BUSINESS ADVANTAGES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <Truck size={22} />
              </div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mb-2">
                Kargo ve Lojistik Güvencesi
              </h3>
              <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed">
                {priorityContent.shippingText}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                <Award size={22} />
              </div>
              <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mb-2">
                Fabrikadan Doğrudan Maliyet Avantajı
              </h3>
              <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed">
                {priorityContent.businessNeedsText}
              </p>
            </div>
          </div>

          {/* FREQUENTLY ASKED QUESTIONS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-12 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <HelpCircle size={22} />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">
                  {priorityContent.name} Matbaa Sıkça Sorulan Sorular
                </h2>
                <p className="text-xs font-semibold text-slate-500">Sipariş, grafik onay, kargo ve teslimat merak edilenler</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {priorityContent.faq.map((f, idx) => (
                <div key={idx} className="bg-slate-50/80 p-5 rounded-xl border border-slate-100">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2 flex items-start gap-2">
                    <span className="text-primary font-black">S.</span>
                    <span>{f.question}</span>
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 leading-relaxed pl-5">
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* REGIONAL / NEARBY CITIES LINKS */}
          <div className="bg-slate-100/80 rounded-2xl p-6 border border-slate-200/60">
            <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-wider mb-3">
              {city.region} Bölgesinde Hizmet Verdiğimiz Diğer İller
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              {nearbyCities.map((near, idx) => (
                <Link
                  key={idx}
                  to={`/${near.slug}`}
                  className="bg-white hover:bg-primary hover:text-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition-colors"
                >
                  {near.name} Matbaa Baskı
                </Link>
              ))}
              <Link
                to="/"
                className="bg-primary/10 hover:bg-primary hover:text-white text-primary text-xs font-extrabold px-3 py-1.5 rounded-lg border border-primary/20 transition-colors ml-auto"
              >
                Tüm 81 İle Hizmet Veriyoruz
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // DEFAULT TEMPLATE FOR THE OTHER CITIES
  const defaultProducts = [
    {
      title: `${city.name} Kartvizit Baskı`,
      path: "/kartvizit",
      badge: "350gr Mat Selefonlu & Kabartma Laklı",
      desc: "Lüks kabartma laklı, şeffaf PVC ve Amerikan Bristol kağıda özel kaliteli kartvizit imalatı."
    },
    {
      title: `${city.name} Broşür Baskı`,
      path: "/brosur",
      badge: "115gr / 135gr / 200gr Kuşe",
      desc: "A5, A4 ve A3 ebatlarında, tek kırım veya z kırım katlamalı canlı renkli tanıtım broşürleri."
    },
    {
      title: `${city.name} Katalog Baskı`,
      path: "/kataloglar",
      badge: "Tel Dikiş & Amerikan Cilt",
      desc: "Çok sayfalı ürün katalogları, kurumsal tanıtım kitapçıkları ve dergi baskı çözümleri."
    },
    {
      title: `${city.name} Kutu Baskı`,
      path: "/kutu",
      badge: "Özel Kesimli Karton Ambalaj",
      desc: "Amerikan Bristol ve kroma kartondan gıda, kozmetik, tekstil ve ürün ambalaj kutuları."
    },
    {
      title: `${city.name} Etiket & Sticker`,
      path: "/etiket",
      badge: "PP Opak Su Geçirmez & Kuşe",
      desc: "Yırtılmaz plastik PP opak etiket, şeffaf sticker ve kuşe yapışkanlı ürün etiketleri."
    },
    {
      title: `${city.name} Buzdolabı Magneti`,
      path: "/magnet",
      badge: "0.40mm / 0.50mm İthal Mıknatıs",
      desc: "Özel bıçak kesimli, selefonlu kalıcı reklam magnetleri ve promosyon ürünleri."
    },
    {
      title: `${city.name} Karton Çanta`,
      path: "/karton-canta",
      badge: "İpli & Lüks Bristol",
      desc: "Mağaza ve butikler için logo baskılı, ipli ve lüks Amerikan Bristol karton poşet imalatı."
    },
    {
      title: `${city.name} Sipariş Fişi & Makbuz`,
      path: "/makbuz-ve-formlar",
      badge: "Oto-Kopyalı Numaratörlü",
      desc: "Ciltli, koçanlı, kendinden karbonlu tahsilat makbuzu, tediye makbuzu ve sipariş fişleri."
    }
  ];

  const defaultFaqs = [
    {
      q: `${city.name} iline matbaa siparişlerinin kargo teslimat süresi ne kadardır?`,
      a: `İstanbul Topkapı imalat tesisimizde üretimi tamamlanan ürünler, özenle paketlenerek ${city.name} iline ve tüm ilçelerine (${city.districts.slice(0, 4).join(', ')}) kargo şirketleriyle ortalama ${city.deliveryDays} içerisinde ulaştırılmaktadır.`
    },
    {
      q: `Baskı öncesi dijital tasarım kontrolü ve onay süreci nasıl işler?`,
      a: `Hazırladığınız çalışma teknik açıdan denetlenir. WhatsApp üzerinden ücretsiz PDF prova sunulur. Siz yazılı "BASKI ONAYI" vermeden üretime geçilmez.`
    },
    {
      q: `${city.name} içerisindeki kurumsal firmalar ve ajanslar için toptan indirim var mıdır?`,
      a: `${city.name} bölgesinde faaliyet gösteren kurumlar ve yüksek adetli sipariş veren firmalar için aracısız doğrudan fabrika fiyat avantajı sunulmaktadır.`
    },
    {
      q: `Özel ebat veya farklı kağıt türlerinde sipariş verebilir miyim?`,
      a: `Evet, özel boyutlu ambalaj kutuları veya etiketler için müşteri temsilcilerimizle WhatsApp hattımız üzerinden iletişime geçebilirsiniz.`
    }
  ];

  const defaultFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": defaultFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>{`${city.name} Matbaa | Kartvizit, Broşür, Kutu Baskı Fiyatları`}</title>
        <meta name="description" content={`İstanbul Topkapı üretim tesisimizden ${city.name} ve tüm ilçelerine kargo ile kartvizit, broşür, etiket, kutu, ambalaj ve kurumsal matbaa baskı hizmeti.`} />
        <link rel="canonical" href={`https://mavibasim.com/${city.slug}`} />
      </Helmet>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-400">Şehir Matbaa Hizmetleri</span>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-extrabold">{city.name} Matbaa</span>
        </nav>

        {/* HERO SECTION */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 mb-8 shadow-sm relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin size={14} />
                  {city.region} - {city.name} Sevkiyatlı
                </span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
                  Kargo Süresi: {city.deliveryDays}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 uppercase tracking-tight leading-tight">
                {city.name} Matbaa Baskı Hizmetleri
              </h1>
              <p className="text-base md:text-lg font-bold text-primary mt-2">
                {city.name} ve tüm ilçelerine kartvizit, broşür, katalog, kutu, etiket ve kurumsal baskı çözümleri.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-sm px-5 py-3 rounded-xl transition-all shadow-md"
              >
                <MessageCircle size={18} className="fill-white stroke-none" />
                <span>{city.name} Özel Teklif Al</span>
              </a>
              <a
                href={PHONE_LINK}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all"
              >
                <PhoneCall size={18} />
                <span>Müşteri Hizmetleri</span>
              </a>
            </div>
          </div>

          {/* Intro Paragraph */}
          <div className="mt-6 text-slate-700 font-semibold text-sm md:text-base leading-relaxed space-y-3">
            <p>
              Mavi Basım Matbaa & Reklam ürünleri İstanbul Topkapı’daki üretim tesisimizde hazırlanarak <strong className="text-slate-900">{city.name}</strong> ve tüm ilçelerine (<strong className="text-slate-900">{city.districts.join(', ')}</strong>) güvenli kargo ile gönderilir. {city.economyNote}
            </p>
            <p>
              Aracısız doğrudan fabrika imalatı sayesinde <strong className="text-slate-900">{city.name}</strong> bölgesindeki ticari işletmelerin matbaa ve ambalaj bütçelerinde yüksek maliyet avantajı sunuyoruz. Tüm siparişleriniz Heidelberg ofset ve Indigo dijital parkurumuzda basılmakta, nem ve ezilmeye karşı dayanıklı koruyucu paketlerde adresinize ulaştırılmaktadır. Baskı öncesi WhatsApp ile ücretsiz dijital PDF prova sunulur.
            </p>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 text-xs font-bold text-slate-800">
            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <Printer className="text-primary w-4 h-4 shrink-0" />
              <span>Topkapı Entegre İmalat</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <CheckCircle2 className="text-emerald-600 w-4 h-4 shrink-0" />
              <span>Ücretsiz PDF Prova</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <Truck className="text-primary w-4 h-4 shrink-0" />
              <span>{city.name} Hızlı Kargo</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <ShieldCheck className="text-emerald-600 w-4 h-4 shrink-0" />
              <span>Aracısız Fabrika Fiyatı</span>
            </div>
          </div>
        </div>

        {/* PRODUCTS & SERVICES GRID */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                {city.name} Bölgesine Özel Baskı Ürünlerimiz
              </h2>
              <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">
                İhtiyacınıza uygun kategoriyi seçerek anında hesaplama yapabilir ve sipariş verebilirsiniz.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {defaultProducts.map((prod, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                      {city.name} Özel
                    </span>
                    <Sparkles className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mb-1.5 group-hover:text-primary transition-colors">
                    {prod.title}
                  </h3>
                  
                  <div className="text-[11px] font-bold text-primary mb-2.5">
                    {prod.badge}
                  </div>

                  <p className="text-slate-600 font-semibold text-xs leading-relaxed mb-4">
                    {prod.desc}
                  </p>
                </div>

                <Link
                  to={prod.path}
                  className="inline-flex items-center justify-between bg-slate-900 hover:bg-primary text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-colors mt-2"
                >
                  <span>Fiyat Listesini İncele</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <Truck size={22} />
            </div>
            <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mb-2">
              {city.name} Kargo ve Lojistik Süreci
            </h3>
            <p className="text-slate-600 font-semibold text-xs leading-relaxed">
              İstanbul Topkapı imalat tesisimizden {city.name} merkezine ve <strong className="text-slate-800">{city.districts.slice(0, 5).join(', ')}</strong> dahil tüm ilçelerine anlaşmalı kargo ağımızla ortalama <strong className="text-slate-900">{city.deliveryDays}</strong> içerisinde çift oluklu korumalı paketlerde sevk edilmektedir.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
              <Printer size={22} />
            </div>
            <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mb-2">
              Topkapı Entegre Üretim Tesisimiz
            </h3>
            <p className="text-slate-600 font-semibold text-xs leading-relaxed">
              Tüm baskı, kırım, selefon kaplama ve kesim işlemleri İstanbul Zeytinburnu Topkapı 2. Matbaacılar Sitesi'ndeki tesislerimizde üretilir.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 mb-4">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mb-2">
              {city.name} Kurumsal Sipariş Avantajları
            </h3>
            <p className="text-slate-600 font-semibold text-xs leading-relaxed">
              {city.name} bölgesindeki ajanslar ve kurumsal firmalar için özel toptan fiyatlandırma ve baskı öncesi ücretsiz dijital PDF prova denetimi sunulmaktadır.
            </p>
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-12 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <HelpCircle size={22} />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">
                {city.name} Matbaa Baskı Sıkça Sorulan Sorular
              </h2>
              <p className="text-xs font-semibold text-slate-500">Sipariş, onay ve kargo teslimatı hakkında merak edilenler</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {defaultFaqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50/80 p-5 rounded-xl border border-slate-100">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2 flex items-start gap-2">
                  <span className="text-primary font-black">S.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* REGIONAL / NEARBY CITIES LINKS */}
        <div className="bg-slate-100/80 rounded-2xl p-6 border border-slate-200/60">
          <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-wider mb-3">
            {city.region} Bölgesinde Hizmet Verdiğimiz Diğer İller
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {nearbyCities.map((near, idx) => (
              <Link
                key={idx}
                to={`/${near.slug}`}
                className="bg-white hover:bg-primary hover:text-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition-colors"
              >
                {near.name} Matbaa Baskı
              </Link>
            ))}
            <Link
              to="/"
              className="bg-primary/10 hover:bg-primary hover:text-white text-primary text-xs font-extrabold px-3 py-1.5 rounded-lg border border-primary/20 transition-colors ml-auto"
            >
              Tüm 81 İle Hizmet Veriyoruz
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
