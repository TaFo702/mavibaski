import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  PhoneCall, 
  Zap, 
  X, 
  CheckCircle2, 
  ChevronLeft,
  Check,
  ExternalLink,
  Youtube,
  MapPin,
  Cpu,
  Printer,
  Layers,
  Settings,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useCart, FireWarning } from '../App';
import { WHATSAPP_LINK, PHONE_LINK, PHONE_NUMBER } from '../constants/contact';
import { CategoryHero } from './CategoryHero';
import { RelatedBlogPosts } from './RelatedBlogPosts';
import { DeliveryBadge } from './DeliveryBadge';
import { KATALOG_DATA, KATALOG_FAQS } from '../data/extraProductData';

export { KATALOG_DATA, KATALOG_FAQS };

const SmartKatalogFinder = ({ onClose }: { onClose: () => void }) => {
  const { openProductDetail } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [foundPrice, setFoundPrice] = useState<string | null>(null);

  const questions = [
    {
      id: 'sayfa',
      text: 'Sayfa Sayısı?',
      options: KATALOG_DATA.rows.filter(r => !r.isSpecial).map(r => ({
        label: r.total,
        value: r.total
      }))
    },
    {
      id: 'adet',
      text: 'Sipariş Adeti?',
      options: [
        { label: '50 Adet', value: 'p50' },
        { label: '100 Adet', value: 'p100' },
        { label: '250 Adet', value: 'p250' },
        { label: '500 Adet', value: 'p500' },
        { label: '1.000 Adet', value: 'p1000' }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Find the price
      const row = KATALOG_DATA.rows.find(r => r.total === newAnswers.sayfa);
      if (row) {
        const price = (row as any)[newAnswers.adet];
        setFoundPrice(price);
      }
      setShowResult(true);
    }
  };

  const getQuote = () => {
    openProductDetail({
      code: "KATALOG",
      desc: `${answers.sayfa} Sayfa Katalog`,
      price: foundPrice || "0",
      miktar: questions[1].options.find(o => o.value === answers.adet)?.label || "1.000"
    }, "Kataloglar");
    onClose();
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl max-w-md w-full mx-auto relative overflow-hidden border border-gray-100">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors">
        <X size={24} />
      </button>

      {!showResult ? (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500" 
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-black text-primary whitespace-nowrap uppercase tracking-tighter">{step + 1} / {questions.length}</span>
          </div>

          <h2 className="text-xl font-black text-black uppercase tracking-tight text-center">
            {questions[step].text}
          </h2>

          <div className="grid grid-cols-1 gap-2">
            {questions[step].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.value)}
                className="p-4 rounded-2xl border-2 border-gray-50 hover:border-primary hover:bg-primary/5 text-center transition-all group"
              >
                <span className="block font-black text-black group-hover:text-primary uppercase tracking-tight">{opt.label}</span>
              </button>
            ))}
          </div>

          {step > 0 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="w-full text-gray-400 font-bold text-xs flex items-center justify-center gap-1 hover:text-black transition-colors"
            >
              <ChevronLeft size={14} /> Önceki Adım
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 py-2"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 size={32} strokeWidth={3} />
          </div>
          
          <div>
            <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-1">Hesaplama Sonucu</h2>
            <p className="text-black text-xs font-bold uppercase tracking-widest">{answers.sayfa} - {questions[1].options.find(o => o.value === answers.adet)?.label}</p>
          </div>

          <div className="bg-black text-white p-6 rounded-3xl shadow-xl">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block mb-1">Net Fiyat (KDV Hariç)</span>
            <span className="text-4xl font-black text-primary">{foundPrice}</span>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={getQuote}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-tight hover:bg-secondary transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              <ShoppingCart size={20} />
              Siparişi Tamamla
            </button>
            <button
              onClick={() => {
                setStep(0);
                setAnswers({});
                setShowResult(false);
              }}
              className="text-black font-bold text-xs uppercase tracking-widest hover:text-black transition-colors"
            >
              Yeni Hesaplama Yap
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const KATALOG_CARD_IMAGES = [
  "/images/katalog/tanitim-katalogu-ornegi.webp",
  "/images/katalog/katalog-baski-fiyatlari.webp",
  "/images/katalog/katalog-tasarimi-ve-baski.webp",
  "/images/katalog/reklam-katalogu-tasarimi.webp",
  "/images/katalog/katalog-baski-detayi.webp",
  "/images/katalog/amerikan-cilt-katalog.webp"
];

const KATALOG_IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "/images/katalog/tanitim-katalogu-ornegi.webp": { width: 800, height: 533 },
  "/images/katalog/katalog-baski-fiyatlari.webp": { width: 1536, height: 1024 },
  "/images/katalog/katalog-tasarimi-ve-baski.webp": { width: 1536, height: 1024 },
  "/images/katalog/reklam-katalogu-tasarimi.webp": { width: 1536, height: 1024 },
  "/images/katalog/katalog-baski-detayi.webp": { width: 1536, height: 1024 },
  "/images/katalog/amerikan-cilt-katalog.webp": { width: 1536, height: 1024 },
};

const KATALOG_GALLERY = [
  {
    src: "/images/katalog/tanitim-katalogu-ornegi.webp",
    alt: "A4 Tel Dikiş Tanıtım ve Ürün Kataloğu Baskısı",
    title: "A4 Tel Dikiş Ürün Kataloğu",
    desc: "135 gr parlak/mat kuşe iç sayfalar, 300 gr selefonlu kapak ve sağlam tel dikiş cilt yapısıyla kurumsal ürün tanıtım kataloğu."
  },
  {
    src: "/images/katalog/katalog-baski-fiyatlari.webp",
    alt: "Çok Sayfalı Kuşe Katalog Baskı Fiyatları ve Modelleri",
    title: "Katalog Baskı Fiyatları ve Çeşitleri",
    desc: "8, 12, 16, 24 ve 32 sayfa alternatifleriyle işletmenizin tüm ürün gamını tanıtan ekonomik katalog çözümleri."
  },
  {
    src: "/images/katalog/katalog-tasarimi-ve-baski.webp",
    alt: "Katalog Tasarımı, Mizanpaj ve Ofset Baskı Aşaması",
    title: "Katalog Tasarımı ve Sayfa Düzeni",
    desc: "300 DPI yüksek çözünürlüklü görseller, CMYK renk kalibrasyonu ve estetik sayfa mizanpajı ile profesyonel tasarım."
  },
  {
    src: "/images/katalog/reklam-katalogu-tasarimi.webp",
    alt: "Reklam ve Fuar Tanıtım Kataloğu Tasarımı",
    title: "Fuar ve Lansman Kataloğu",
    desc: "Bayi toplantıları, sektörel fuarlar ve yeni ürün tanıtımları için yüksek baskı kalitesine sahip prestij kataloğu."
  },
  {
    src: "/images/katalog/katalog-baski-detayi.webp",
    alt: "Lokal Laklı ve Selefonlu Kapak Katalog Baskı Detayı",
    title: "Kapak Selefon ve Lak Uygulaması",
    desc: "Kapakta mat/parlak selefon laminasyonu ve logo üzerine lokal kabartma lak ile zenginleştirilmiş prestijli görünüm."
  },
  {
    src: "/images/katalog/amerikan-cilt-katalog.webp",
    alt: "Amerikan Ciltli ve Çok Sayfalı Prestij Kataloğu",
    title: "Amerikan Ciltli Kalın Katalog",
    desc: "48 sayfa ve üzeri kalın kurumsal kataloglar için dayanıklı tutkallı Amerikan cilt ve sıcak presleme tekniği."
  }
];

export const KatalogPage = () => {
  const { openProductDetail } = useCart();

  useEffect(() => {
    document.title = "Katalog Baskı Fiyatları | Çok Sayfalı Ürün Kataloğu - Mavi Basım";

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": KATALOG_FAQS.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };

    let el = document.getElementById('katalog-faq-schema') as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.id = 'katalog-faq-schema';
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(faqSchema);

    return () => {
      const script = document.getElementById('katalog-faq-schema');
      if (script) script.remove();
    };
  }, []);

  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Kataloglar");
  };

  const YOUTUBE_VIDEO_ID = "DqFzFZeCMKA";
  const YOUTUBE_SHORTS_URL = "https://youtube.com/shorts/DqFzFZeCMKA";
  const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/DqFzFZeCMKA";
  const VIDEO_TITLE = "Katalog Üretimi | Mavi Basım Matbaa";
  const VIDEO_DESC = "Katalog üretimi ve profesyonel baskı çözümleri. Mavi Basım Matbaa olarak işletmeleriniz için kaliteli katalog, broşür, kartvizit, etiket ve diğer matbaa ürünlerini üretiyoruz.";

  return (
    <div className="bg-[#f3f4f6] min-h-screen pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-xs text-gray-500 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400" aria-hidden="true">/</span>
                  <Link to="/matbaa" className="text-gray-600 hover:text-primary transition-colors">
                    Matbaa Ürünleri
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400" aria-hidden="true">/</span>
                  <span className="text-gray-900 font-semibold" aria-current="page">
                    Katalog Baskı Fiyatları
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <CategoryHero
          title="Kurumsal Ürün Kataloğu Tasarımı &amp; Katalog Baskı Fiyatları"
          badge="A4 / A5 Ebat - Tel Dikiş &amp; Amerikan Cilt"
          description={
            <p>
              Katalog baskı ve katalog basım fiyatları; seçilen ebat, sayfa sayısı, kuşe kâğıt, cilt türü ve adet bilgilerine göre belirlenir. A4 ve A5 ebatlarında, 135 gr kuşe iç sayfalar ve 300 gr mat/parlak selefonlu kapak alternatifiyle tel dikiş veya Amerikan ciltli profesyonel <strong className="text-slate-900">ürün katalog baskı</strong> çözümleri sunuyoruz. Kurumsal tanıtım materyalleriniz için <Link to="/brosur" className="text-primary hover:underline font-bold">broşür</Link>, <Link to="/karton-canta" className="text-primary hover:underline font-bold">karton çanta</Link>, <Link to="/dosyalar" className="text-primary hover:underline">cepli dosya</Link> ve <Link to="/kartvizit" className="text-primary hover:underline">kartvizit</Link> ürünlerini fabrikamızdan sipariş edebilirsiniz.
            </p>
          }
          relatedLinks={[
            { label: "Broşür Baskı", path: "/brosur" },
            { label: "Karton Çanta", path: "/karton-canta" },
            { label: "Cepli Dosya", path: "/dosyalar" },
            { label: "Kartvizit", path: "/kartvizit" }
          ]}
          customCtaText="Özel Katalog Teklifi Al"
        />

        {/* Dynamic Delivery Date Banner */}
        <DeliveryBadge categoryKey="katalog" days={5} variant="banner" className="my-6" />

        {/* 🎬 DEDICATED YOUTUBE SHORTS VIDEO SHOWCASE SECTION */}
        <div className="my-12 bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 border border-slate-200/80 shadow-xl overflow-hidden relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-black uppercase tracking-wider border border-red-200">
                <Youtube size={15} className="text-red-600 fill-current" />
                <span>YouTube Video Tanıtımı</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tight">
                Katalog Üretimi ve Baskı Çözümleri
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-medium max-w-3xl leading-relaxed">
                {VIDEO_DESC}
              </p>
            </div>

            <a
              href={YOUTUBE_SHORTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start lg:self-center inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-md shrink-0"
            >
              <Youtube size={16} className="fill-current" />
              <span>YouTube Shorts'ta İzle</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* YouTube Embed Player & Highlights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden bg-black aspect-video shadow-2xl border border-slate-200">
                <iframe
                  src={YOUTUBE_EMBED_URL}
                  title={VIDEO_TITLE}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  className="w-full h-full rounded-[24px] sm:rounded-[32px] border-0"
                />
              </div>
            </div>

            {/* Video Feature Badges & Contact Info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase">
                  <MapPin size={16} className="text-primary" />
                  <span>Üretim Tesisi: Topkapı / İstanbul</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  İstanbul Topkapı 2. Matbaacılar Sitesi bünyesindeki modern ofset tesislerimizde matbaacılar sitesi katalog baskı güvencesiyle yüksek kaliteli üretim yapıyoruz.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-primary font-black text-xs uppercase mb-1">
                  <Check size={16} className="text-primary stroke-[3]" />
                  <span>Kuşe Kağıt, Tel Dikiş &amp; Amerikan Cilt</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  135 gr kuşe iç sayfalar ve 300 gr selefonlu kapakla sunulan kuşe katalog baskı fiyatları; tel dikiş katalog baskı ve Amerikan cilt katalog baskı seçenekleriyle ihtiyacınıza uygun ciltleme sağlar.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="text-[11px] font-bold text-slate-500 mb-1">Etiketler</p>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-primary">
                  <span>#MaviBasım</span>
                  <span>#Katalog</span>
                  <span>#KatalogBaskı</span>
                  <span>#Matbaa</span>
                  <span>#TopkapıMatbaa</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={PHONE_LINK}
                  className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wide transition-all shadow-md"
                >
                  <PhoneCall size={15} />
                  <span>{PHONE_NUMBER}</span>
                </a>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wide transition-all shadow-lg shadow-primary/20"
                >
                  <ShoppingCart size={15} />
                  <span>Fiyat &amp; Teklif Al</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 📋 KATALOG ÜRÜNLERİ VE FİYAT TABLOLARI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {KATALOG_DATA.rows.map((row, rIdx) => {
            const productImage = KATALOG_CARD_IMAGES[rIdx % KATALOG_CARD_IMAGES.length];

            return (
              <div key={rIdx} className="bg-white rounded-3xl overflow-visible shadow-2xl border border-gray-100 flex flex-col">
                <div className="p-6 bg-black text-white rounded-t-3xl flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight leading-tight mb-1">{row.label}</h3>
                    <p className="text-primary font-bold text-sm uppercase">{row.total} Katalog</p>
                  </div>
                  <span className="text-[10px] bg-primary/20 text-primary border border-primary/30 px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
                    Kuşe Baskı
                  </span>
                </div>
                
                <div className="p-6 flex-grow flex flex-col justify-between">
                  {/* Top Spec & Photo */}
                  <div className="flex gap-4 mb-6">
                    <div className="w-1/2 space-y-2">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-black">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        İç Sayfalar: 135 gr Kuşe
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-black">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        Kapaklar: 300 gr Kuşe
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-black">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        Cilt: Tel Dikiş
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-black">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        Kapaklar: Mat/Parlak Selefon
                      </div>
                    </div>

                    {/* Product Photo */}
                    <div className="w-1/2 rounded-xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 flex items-center justify-center relative min-h-[192px]">
                      <div className="relative w-full h-48 group">
                        <img 
                          src={productImage} 
                          alt={`Katalog Baskı ${row.label}`} 
                          width={KATALOG_IMAGE_DIMENSIONS[productImage]?.width || 1536}
                          height={KATALOG_IMAGE_DIMENSIONS[productImage]?.height || 1024}
                          className="w-full h-48 object-cover rounded-lg"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            if (!target.dataset.fallback) {
                              target.dataset.fallback = 'true';
                              target.src = KATALOG_CARD_IMAGES[0];
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-visible rounded-2xl border border-gray-200">
                    <table className="w-full text-center text-xs">
                      <caption className="sr-only">{row.label} - {row.total} Katalog Baskı Fiyat Tablosu</caption>
                      <thead>
                        <tr className="bg-gray-100 text-black font-black uppercase tracking-widest border-b border-gray-200">
                          <th scope="col" className="p-3 border-r border-gray-200">ADET</th>
                          <th scope="col" className="p-3 border-r border-gray-200">FİYAT</th>
                          <th scope="col" className="p-3">SİPARİŞ</th>
                        </tr>
                      </thead>
                      <tbody className="font-bold">
                        {[
                          { qty: '50', price: row.p50 },
                          { qty: '100', price: row.p100 },
                          { qty: '250', price: row.p250 },
                          { qty: '500', price: row.p500 },
                          { qty: '1.000', price: row.p1000 }
                        ].filter(item => item.price).map((item, iIdx) => (
                          <tr key={iIdx} className="border-b border-gray-100 last:border-0 hover:bg-primary/5 transition-colors">
                            <th scope="row" className="p-3 border-r border-gray-200 text-black text-sm font-bold text-center">
                              {item.qty} Adet
                            </th>
                            <td className="p-3 border-r border-gray-200 text-black font-black text-base">{item.price}</td>
                            <td className="p-2">
                              <button 
                                onClick={() => openWhatsApp({
                                  code: "KATALOG",
                                  desc: row.label,
                                  price: item.price,
                                  miktar: `${item.qty} Adet`
                                })}
                                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                              >
                                <ShoppingCart size={14} className="shrink-0" />
                                <span>Hemen Sipariş Ver</span>
                              </button>
                            </td>
                          </tr>
                        ))}

                        {row.isSpecial && (
                          <tr>
                            <td colSpan={3} className="p-4">
                              <button 
                                onClick={() => window.open(WHATSAPP_LINK, '_blank')}
                                className="w-full bg-primary text-white py-3 rounded-xl font-black uppercase tracking-tighter hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                              >
                                <PhoneCall size={18} />
                                ÖZEL TEKLİF ALIN
                              </button>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="bg-slate-50 px-5 py-3 border-t border-gray-150 flex flex-col sm:flex-row justify-center items-center text-[10px] sm:text-xs text-slate-500 font-medium font-sans">
                      <span>* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
          <p className="text-black font-bold text-center text-sm italic leading-relaxed">
            Yukarıdaki katalog baskı fiyat listesi içerisinde yer alan katalog fiyatları; 50, 100, 250, 500 ve 1.000 adetlik sipariş kademelerine göre hazırlanmıştır. Tanıtım bütçenize göre 100 adet katalog veya yüksek tirajlı 1000 adet katalog fiyatı alternatiflerini tablodan karşılaştırabilirsiniz.
            <br className="my-1" />
            {KATALOG_DATA.footerNote}
          </p>
        </div>
        <div className="mt-4">
          <FireWarning />
        </div>

        {/* KATALOG ÜRÜN FOTOĞRAFLARI GALERİSİ */}
        <div className="mt-16 mb-8 text-black">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-7 bg-primary rounded-full" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Katalog Ürün Fotoğrafları ve Örnekleri
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {KATALOG_GALLERY.map((img, idx) => (
              <figure 
                key={idx} 
                className="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all group"
              >
                <div className="overflow-hidden rounded-xl bg-gray-50 mb-4 flex items-center justify-center p-1.5 w-full aspect-[4/3] relative transition-all duration-300 border border-gray-100">
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    title={img.title} 
                    width={KATALOG_IMAGE_DIMENSIONS[img.src]?.width || 1536}
                    height={KATALOG_IMAGE_DIMENSIONS[img.src]?.height || 1024}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (!target.dataset.fallback) {
                        target.dataset.fallback = 'true';
                        target.src = KATALOG_CARD_IMAGES[0];
                      }
                    }}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-all duration-300" 
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-sm font-black text-black uppercase mb-1.5">{img.title}</h3>
                  <figcaption className="text-gray-600 text-xs font-semibold leading-relaxed">
                    {img.desc}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* Neden Tasarım + Baskı Tek Yerde? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Neden Tasarım + Baskı Tek Yerde?</h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-6">
              Profesyonel katalog tasarımı hizmetini ofset baskıyla bir arada sunarak şeffaf katalog tasarım fiyatları ve bütçenize uygun katalog hazırlama fiyatları avantajı sağlıyoruz.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left border-collapse">
                <caption className="sr-only">Neden Tasarım ve Baskı Tek Yerde Avantaj Tablosu</caption>
                <thead>
                  <tr className="bg-black text-white">
                    <th scope="col" className="p-4 font-black uppercase tracking-tight border-r border-white/10">AVANTAJ</th>
                    <th scope="col" className="p-4 font-black uppercase tracking-tight">AÇIKLAMA</th>
                  </tr>
                </thead>
                <tbody className="text-black font-medium">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <th scope="row" className="p-4 border-r border-gray-100 font-black text-left">Zaman Tasarrufu</th>
                    <td className="p-4">Tek iletişim noktası, hızlı revizyon süreçleri.</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <th scope="row" className="p-4 border-r border-gray-100 font-black text-left">Maliyet Avantajı</th>
                    <td className="p-4">Tasarım dahil paketlerde daha uygun fiyatlar ve avantajlı üretim imkanı.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <th scope="row" className="p-4 border-r border-gray-100 font-black text-left">Renk Uyumu</th>
                    <td className="p-4">Tasarımcı ve matbaa ekibi aynı çatı altında tam uyum.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Forma Mantığı ve Katalog Fiyatları */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Forma Mantığı ve Katalog Fiyatları</h2>
            <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
              Matbaada kağıt firesini azaltmak, katalog baskı fiyatlarını düşürmenin en etkili yoludur. Forma düzenine tam oturan 8 sayfa katalog baskı, 12 sayfa katalog baskı ve 16 sayfa katalog baskı gibi seçeneklerde birim maliyet düşer. Standart ebatlarda hesaplanan A4 katalog fiyatları ve taşınabilir A5 katalog baskı seçenekleri forma verimliliği sayesinde bütçenizi korur.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left border-collapse">
                <caption className="sr-only">Forma Mantığı ve Katalog Ebat Maliyet Tablosu</caption>
                <thead>
                  <tr className="bg-primary text-white">
                    <th scope="col" className="p-4 font-black uppercase tracking-tight border-r border-white/10">EBAT</th>
                    <th scope="col" className="p-4 font-black uppercase tracking-tight border-r border-white/10">SAYFA/FORMA</th>
                    <th scope="col" className="p-4 font-black uppercase tracking-tight">MALİYET ETKİSİ</th>
                  </tr>
                </thead>
                <tbody className="text-black font-medium">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <th scope="row" className="p-4 border-r border-gray-100 font-black text-left">A4</th>
                    <td className="p-4 border-r border-gray-100">16 Sayfa</td>
                    <td className="p-4 text-green-600 font-black">En düşük birim maliyet</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <th scope="row" className="p-4 border-r border-gray-100 font-black text-left">A5</th>
                    <td className="p-4 border-r border-gray-100">32 Sayfa</td>
                    <td className="p-4 text-green-600 font-black">%20'ye varan tasarruf</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <th scope="row" className="p-4 border-r border-gray-100 font-black text-left">Kare (20x20)</th>
                    <td className="p-4 border-r border-gray-100">24 Sayfa</td>
                    <td className="p-4">Düşük fire, ekonomik</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <th scope="row" className="p-4 border-r border-gray-100 font-black text-left">Yatay (A4 Yatay)</th>
                    <td className="p-4 border-r border-gray-100">16 Sayfa</td>
                    <td className="p-4">150+ adet için ekonomik</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Hangi Ebat Sizin İçin Uygun? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Hangi Ebat Sizin İçin Uygun?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "A4 Katalog", desc: "A4 katalog baskı; kurumsal firmalar, B2B şirketler ve teknik sunumlar için en çok tercih edilen standart formattır." },
                { title: "A5 Katalog", desc: "A5 katalog baskı; bayiler, fuar katılımcıları ve taşınabilir tanıtım için ideal ve ekonomik bir çözümdür." },
                { title: "Kare Katalog", desc: "Butik mağazalar, sanat galerileri ve görsel ağırlıklı portfolyolar için şık." },
                { title: "Yatay Katalog", desc: "Mimarlık ofisleri ve mobilya markaları için panoramik sunum avantajı." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl hover:border-primary transition-all group">
                  <h3 className="text-xl font-black text-black mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tahmini 5 İş Gününde Kargoya Teslim */}
          <section className="bg-black rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full -ml-48 -mb-48 blur-3xl" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                Tahmini 5 İş Gününde Kargoya Teslim
              </h2>
              <p className="text-xl text-gray-400 mb-10 font-medium leading-relaxed">
                <span className="text-white"><strong>Mavi Basım Matbaa & Reklam</strong></span> bünyesinde baskıya uygun dosya, ödeme ve PDF prova onayı tamamlandığında katalog siparişleri tahmini olarak 5 iş gününde kargoya verilir. Kargo teslim süresi gönderim adresine ve kargo firmasına göre değişebilir. Her projeye %100 özgün tasarım ve yüksek baskı kalitesi sunuyoruz. Matbaa ve reklam ajanslarına özel indirimlerimiz için hemen iletişime geçin!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl shadow-primary/20"
                >
                  <ShoppingCart size={24} />
                  Hemen Teklif Al
                </a>
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  <Zap size={24} />
                  Ajans İndirimi
                </a>
              </div>
            </div>
          </section>

          {/* Hangi Şehirlere Hizmet Veriyoruz? SEO link grid */}
          <RelatedBlogPosts category="katalog" excludeImages={KATALOG_CARD_IMAGES} />

          <section className="mt-12 bg-white p-8 rounded-[32px] border border-gray-150 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black text-black mb-4 uppercase tracking-tight">Hangi Şehirlere Hizmet Veriyoruz?</h2>
            <p className="text-gray-600 font-medium mb-8 text-sm md:text-base">Mavi Basım olarak Türkiye genelinde kaliteli ve hızlı üretim çözümleri sunuyoruz.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[
                { path: "/samsun-restoran-brosur-baski", text: "Samsun Restoran Broşür Baskı" },
                { path: "/trabzon-kafe-menu-baski", text: "Trabzon Kafe Menü Baskı" },
                { path: "/ordu-findik-firmasi-katalog-baski", text: "Ordu Fındık Firması Katalog" },
                { path: "/antalya-emlakci-kartvizit-baski", text: "Antalya Emlakçı Kartvizit" },
                { path: "/rize-lokanta-amerikan-servis", text: "Rize Lokanta Amerikan Servis" },
                { path: "/samsun-kartvizit-baski", text: "Samsun Kartvizit Baskı" },
                { path: "/giresun-kartvizit-baski", text: "Giresun Kartvizit Baskı" },
                { path: "/adana-kartvizit-baski", text: "Adana Kartvizit Baskı" },
                { path: "/trabzon-brosur-baski", text: "Trabzon Broşür Baskı" },
                { path: "/rize-brosur-baski", text: "Rize Broşür Baskı" },
                { path: "/malatya-brosur-baski", text: "Malatya Broşür Baskı" },
                { path: "/ankara-brosur-baski", text: "Ankara Broşür Baskı" },
                { path: "/ordu-magnet-baski", text: "Ordu Magnet Baskı" },
                { path: "/sinop-magnet-baski", text: "Sinop Magnet Baskı" },
                { path: "/elazig-magnet-baski", text: "Elazığ Magnet Baskı" },
                { path: "/antalya-katalog-baski", text: "Antalya Katalog Baskı" },
                { path: "/erzurum-katalog-baski", text: "Erzurum Katalog Baskı" },
                { path: "/konya-katalog-baski", text: "Konya Katalog Baskı" },
                { path: "/gebze-kutu-baski", text: "Gebze Kutu Baskı" },
                { path: "/bitlis-kutu-baski", text: "Bitlis Kutu Baskı" },
                { path: "/kayseri-kutu-baski", text: "Kayseri Kutu Baskı" },
                { path: "/van-kutu-baski", text: "Van Kutu Baskı" },
                { path: "/mugla-kutu-baski", text: "Muğla Kutu Baskı" }
              ].map((city, idx) => (
                <Link
                  key={idx}
                  to={city.path}
                  className="p-3 bg-gray-50 hover:bg-primary/5 hover:text-primary rounded-xl border border-gray-100 transition-all text-xs font-bold text-slate-800 text-center flex items-center justify-center min-h-[44px]"
                >
                  {city.text}
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
      <KatalogSEOSection />
    </div>
  );
};

const KatalogSEOSection = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-20">
      {/* Üretici Odaklı Otorite Başlığı */}
      <div className="bg-slate-900 text-white rounded-[32px] p-8 md:p-12 shadow-2xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#00E5FF]/10 text-[#00E5FF] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            DOĞRUDAN TESLİMAT
          </div>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4 text-white">
            İstanbul Topkapı Tesisimizden <span className="text-[#00E5FF]">Katalog Çözümleri</span> Hizmeti
          </h2>
          <p className="text-gray-300 font-bold text-base md:text-lg leading-relaxed mb-0">
            Katalog baskı süreçleriniz profesyonel olarak tamamlanmaktadır. Siparişleriniz özenle basılarak paketlenmekte ve kargo ile adresinize sevk edilmektedir.
          </p>
        </div>
      </div>

      {/* 4 Bölümlü Üretim Süreci Detayları */}
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-gray-100 mb-12">
        <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
          <span className="w-2.5 h-6 bg-primary rounded-full" />
          <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
            Üretim Detayları &amp; Teknik Özellikleri
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <Cpu size={20} />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Üretim Süreci</h4>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              Çok sayfalı mizanpaj montajı kalıplara aktarılır, basılan sayfalar harmanlanıp iplik dikiş veya Amerikan sıcak tutkal ciltle birleştirilir.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <Printer size={20} />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Kullanılan Makineler</h4>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              Ofset Baskı Üniteleri, Otomatik Harman Üniteleri, Amerikan Cilt Sıcak Tutkal Hatları, Tel Dikiş ve İplik Dikiş Sistemleri.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <Layers size={20} />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Kullanılan Kâğıt &amp; Malzeme</h4>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              Kapak için 300 gr Kuşe Kağıt, İç Sayfalar için 135 gr Parlak veya Mat Kuşe Kağıtlar.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <Settings size={20} />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Baskı Sonrası İşlemler</h4>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              Kapak Mat/Parlak Selefon, Kısmi Kabartma Lak, Sıcak Amerikan Cilt, Tel Dikiş, Gofre Kabartma.
            </p>
          </div>
        </div>
      </div>

      {/* Teslimat ve Onboarding Süreci Bilgilendirme Kutusu */}
      <div className="bg-slate-50 rounded-[32px] p-8 md:p-12 shadow-md border border-slate-100 mb-12">
        <div className="max-w-4xl mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
            GÜVENLİ SİPARİŞ &amp; TESLİMAT SÜRECİ
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
            Tasarım Onayı, Üretim ve Kargo Süreçleri
          </h3>
          <p className="text-slate-600 font-semibold text-xs md:text-sm mt-2">
            Siparişinizin her adımı Topkapı üretim tesisimizde titizlikle takip edilir. Hata riskini en aza indirmek ve yüksek kalite standardı sunmak için uyguladığımız standart iş akışımız:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          {[
            {
              title: "Tasarım Onayı",
              desc: "Gönderdiğiniz grafik dosyaları teknik kontrolümüzden geçer. Hataları önlemek için hazırladığımız PDF prova onayınızı almadan üretime başlamayız.",
              badge: "Aynı Gün Prova"
            },
            {
              title: "Üretim ve Kargolama",
              desc: "Baskıya uygun dosya, ödeme ve PDF prova onayı tamamlandığında katalog siparişleri tahmini olarak 5 iş gününde kargoya verilir. Kargo teslim süresi gönderim adresine ve kargo firmasına göre değişebilir.",
              badge: "Tahmini 5 İş Günü"
            },
            {
              title: "Kargo ve Sevkiyat",
              desc: "Kataloglar kalın çift oluklu mukavva kolilerde özenle paketlenir. Türkiye geneli 81 ile anlaşmalı kargo ağımızla güvenle adresinize sevk edilir.",
              badge: "81 İl Sevk"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-end mb-4">
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  {item.title}
                </h4>
                <p className="text-slate-600 font-semibold text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Ortak SSS Soruları */}
        <div className="border-t border-slate-200/60 pt-8">
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            Sıkça Sorulan Sipariş ve Onay Soruları
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <h5 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                Tasarım onayı ne kadar sürer?
              </h5>
              <p className="text-[11px] md:text-xs text-slate-600 font-semibold leading-relaxed">
                Logonuzu ve hazır çalışmanızı iletmenizin ardından, grafik ekibimiz en geç 1-2 saat içinde teknik kontrolü tamamlar. Baskı hatalarını en aza indirmek ve yüksek kalite standardı sunmak amacıyla size dijital PDF prova sunar. "Aynı Gün PDF Prova Onayı" sistemimiz sayesinde iş akışınız aksamaz.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <h5 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                Baskı süreci ne zaman başlar?
              </h5>
              <p className="text-[11px] md:text-xs text-slate-600 font-semibold leading-relaxed">
                Siparişinizin fiziksel üretimi, hazırlanan PDF prova mizanpajına WhatsApp veya e-posta üzerinden yazılı "BASKI ONAYI" vermeniz ve ödeme teyidinin alınmasıyla birlikte 24 saat içinde otomatik olarak başlar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Standart Rehber ve SSS İçeriği */}
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -ml-32 -mb-32 blur-3xl" />
        
        <div className="relative space-y-8 text-black">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-4">
              Profesyonel Katalog Baskı ile Ürün ve Hizmet Dünyanızı Prestijli Bir Kitaba Dönüştürün
            </h2>
            <p className="text-gray-700 font-medium leading-relaxed text-base md:text-lg">
              Müşterilerinize satacağınız onlarca ürünü, tamamladığınız büyük projeleri ve şirketinizin vizyonunu dijital ekranların ötesinde, dokunulabilir lüks bir baskıyla sunmanın yolu <strong>katalog baskı</strong> hizmetidir. <strong>Mavi Basım Matbaa &amp; Reklam</strong> olarak, mükemmel cilt işçiliği ve yüksek çözünürlüklü renk doğruluğuyla kataloglarınızı birer kurumsal vitrine dönüştürüyoruz.
            </p>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-black mb-3">Katalog Kimler İçin Uygun?</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 font-medium">
              <li><strong>Mobilya, Mimari &amp; İnşaat Grupları:</strong> Büyük ölçekli ürün kreasyonlarını, lüks projeleri ve dekorasyon detaylarını sergileyen markalar.</li>
              <li><strong>Makine, Sanayi &amp; Endüstriyel İmalatçılar:</strong> Teknik parçaları, makine detaylarını, yedek parça tablolarını çizimleriyle sunan üreticiler.</li>
              <li><strong>Kozmetik, Tekstil &amp; Mücevherat Markaları:</strong> Sezonluk kreasyonları, pürüzsüz cilt geçişlerini ve takı zarafetini yüksek çözünürlüklü fotoğraflarla sergileyen butikler.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-black mb-3">Teknik Özellikler ve Cilt Seçenekleri</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 font-medium">
              <li><strong>Lüks Amerikan Cilt (Tutkallı):</strong> Sayfaların sırttan özel sıcak tutkalla birleştirilip kapakla bütünleştirildiği şık kitap benzeri profesyonel cilt sistemi.</li>
              <li><strong>Tel Dikiş (Broşür Cilt):</strong> Sayfa sayısı az (8-32 sayfa arası) kataloglar için son derece ekonomik, esnek ve ortadan zımbalı kompakt ciltleme.</li>
              <li><strong>Kağıt Özellikleri:</strong> Kapak kısmı için 300 gr kuşe (mat veya parlak selefon kaplamalı); iç sayfalar için 135 gr kuşe kağıt kullanılmaktadır.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-black mb-3">Katalog Tasarım Rehberi</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 font-medium">
              <li><strong>Kapak Çapı:</strong> Kapağı mat selefon ve bölgesel parlak logo kabartması (Spot UV) ile kurumsal ağırlığa kavuşturun. İlk dokunuş hissi satışı tetikler.</li>
              <li><strong>Yüksek Çözünürlüklü Baskı Dosyası:</strong> Ürün resimlerinizin pürüzsüz çıkması için katalog tasarımlarındaki tüm görsellerin en az 300-350 DPI çözünürlükte olmasına özen gösterin.</li>
              <li><strong>Temiz Mizanpaj:</strong> Sayfaları teknik verilerle boğmak yerine beyaz boşlukları dengeli bırakın; her sayfada tek bir ana ürüne odaklanarak gözü yönlendirin.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-black mb-3">Sık Yapılan Katalog Tasarım Hataları</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 font-medium">
              <li><strong>Hatalı Sayfa Sayısı Hesaplama:</strong> Tel dikişli (ortadan zımbalı) kataloglarda toplam sayfa sayısının 4'ün katı (8-12-16-20 sayfa vb.) olarak tasarlanmaması (Forma kuralı gereği iç sayfalar 4'ün katı olmalıdır).</li>
              <li><strong>Cilt Payı Unutulması:</strong> Sırttan ciltleme alanına çok yakın yerleştirilen önemli şemaların ve fotoğrafların cilt yapıştırıcısının içinde kalıp kaybolması.</li>
              <li><strong>Düşük Çözünürlüklü Görsel:</strong> Baskı netliğini düşüren web boyutlu fotoğraflar yerine yüksek çözünürlüklü orijinal ürün fotoğrafları tercih edilmelidir.</li>
            </ul>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-4">Sıkça Sorulan Sorular (SSS)</h3>
            <div className="space-y-4">
              {KATALOG_FAQS.map((faq, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-black mb-1">{faq.q}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Sezonluk ürünlerinizi katalog halinde bastırdıktan sonra, satış ekiplerinizin sunumlarda kullanacağı şık <Link to="/dosyalar" className="text-primary hover:underline font-bold">Cepli Dosya Baskı</Link> ve kurumsal yazışmalar için <Link to="/antetli" className="text-primary hover:underline font-bold">Antetli Kağıt</Link> taleplerinizi de güncelleyebilirsiniz.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-black">Yıllara Dayanan Tecrübe</h4>
              <p className="text-sm font-medium text-black">Güvenilir ve Kaliteli Baskı</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-black">Türkiye Geneli Hızlı Sevkiyat</h4>
              <p className="text-sm font-medium text-black">Anlaşmalı Kargo Sevkiyatı</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
