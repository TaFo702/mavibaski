import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  MapPin
} from 'lucide-react';
import { useCart, ProductSEOSection, FireWarning } from '../App';
import { WHATSAPP_LINK, PHONE_LINK, PHONE_NUMBER } from '../constants/contact';
import { CategoryHero } from './CategoryHero';
import { RelatedBlogPosts } from './RelatedBlogPosts';
import { DeliveryBadge } from './DeliveryBadge';
import { KATALOG_DATA } from '../data/extraProductData';

export { KATALOG_DATA };

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
      <Helmet>
        <title>Katalog Baskı Fiyatları | Çok Sayfalı Ürün Kataloğu - Mavi Basım</title>
        <meta name="description" content="A4 ve A5 ebatlarında, tel dikiş veya Amerikan ciltli, kuşe kağıda basılan profesyonel kurumsal tanıtım ve ürün katalog baskıları. En uygun imalat fiyatı." />
      </Helmet>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <CategoryHero
          title="Kurumsal Ürün Kataloğu Tasarımı &amp; Katalog Baskı Fiyatları"
          badge="A4 / A5 Ebat - Tel Dikiş &amp; Amerikan Cilt"
          description={
            <p>
              A4 ve A5 ebatlarında, 135 gr kuşe iç sayfalar ve 300 gr mat/parlak selefonlu kapak alternatifiyle tel dikiş veya Amerikan ciltli profesyonel <strong className="text-slate-900">ürün katalog baskı</strong> çözümleri sunuyoruz. Kurumsal tanıtım materyalleriniz için <Link to="/brosur" className="text-primary hover:underline font-bold">broşür</Link>, <Link to="/karton-canta" className="text-primary hover:underline font-bold">karton çanta</Link>, <Link to="/dosyalar" className="text-primary hover:underline">cepli dosya</Link> ve <Link to="/kartvizit" className="text-primary hover:underline">kartvizit</Link> ürünlerini fabrikamızdan sipariş edebilirsiniz.
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
                  İstanbul Topkapı 2. Matbaacılar Sitesi'ndeki modern ofset tesislerimizde kaliteli kuşe kağıt, selefon ve tel dikiş/Amerikan cilt katalog üretimi.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-primary font-black text-xs uppercase mb-1">
                  <Check size={16} className="text-primary stroke-[3]" />
                  <span>Kuşe Kağıt, Tel Dikiş &amp; Amerikan Cilt</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  135 gr kuşe iç sayfalar, 300 gr mat/parlak selefonlu kapak, sağlam tel dikiş veya tutkallı Amerikan ciltleme seçenekleri.
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
                          className="w-full h-48 object-cover rounded-lg"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = KATALOG_CARD_IMAGES[0];
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-visible rounded-2xl border border-gray-200">
                    <table className="w-full text-center text-xs">
                      <thead>
                        <tr className="bg-gray-100 text-black font-black uppercase tracking-widest border-b border-gray-200">
                          <th className="p-3 border-r border-gray-200">ADET</th>
                          <th className="p-3 border-r border-gray-200">FİYAT</th>
                          <th className="p-3">SİPARİŞ</th>
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
                            <td className="p-3 border-r border-gray-200 text-black text-sm">
                              {item.qty} Adet
                            </td>
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
            {KATALOG_DATA.footerNote}
            <br />
            <span className="text-black not-italic mt-2 block font-black uppercase tracking-tight">{KATALOG_DATA.note}</span>
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
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = KATALOG_CARD_IMAGES[idx % 5];
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
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="p-4 font-black uppercase tracking-tight border-r border-white/10">AVANTAJ</th>
                    <th className="p-4 font-black uppercase tracking-tight">AÇIKLAMA</th>
                  </tr>
                </thead>
                <tbody className="text-black font-medium">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-100 font-black">Zaman Tasarrufu</td>
                    <td className="p-4">Tek iletişim noktası, hızlı revizyon süreçleri.</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-100 font-black">Maliyet Avantajı</td>
                    <td className="p-4">Tasarım dahil paketlerde daha uygun fiyatlar.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-100 font-black">Renk Uyumu</td>
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
              Matbaada kağıt firesini azaltmak, katalog baskı fiyatlarını düşürmenin en etkili yoludur. Bir formadan (64x90 cm standart kağıt) çıkan sayfa sayısı, maliyeti doğrudan etkiler.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="p-4 font-black uppercase tracking-tight border-r border-white/10">EBAT</th>
                    <th className="p-4 font-black uppercase tracking-tight border-r border-white/10">SAYFA/FORMA</th>
                    <th className="p-4 font-black uppercase tracking-tight">MALİYET ETKİSİ</th>
                  </tr>
                </thead>
                <tbody className="text-black font-medium">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-100 font-black">A4</td>
                    <td className="p-4 border-r border-gray-100">16 Sayfa</td>
                    <td className="p-4 text-green-600 font-black">En düşük birim maliyet</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-100 font-black">A5</td>
                    <td className="p-4 border-r border-gray-100">32 Sayfa</td>
                    <td className="p-4 text-green-600 font-black">%20'ye varan tasarruf</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-100 font-black">Kare (20x20)</td>
                    <td className="p-4 border-r border-gray-100">24 Sayfa</td>
                    <td className="p-4">Düşük fire, ekonomik</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-100 font-black">Yatay (A4 Yatay)</td>
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
                { title: "A4 Katalog", desc: "Kurumsal firmalar, B2B şirketler ve teknik sunumlar için idealdir." },
                { title: "A5 Katalog", desc: "Bayiler, fuar katılımcıları ve taşınabilir tanıtım için en çok tercih edilen." },
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

          {/* 4 İş Gününde Teslimat Garantisi! */}
          <section className="bg-black rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full -ml-48 -mb-48 blur-3xl" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                4 İş Gününde Teslimat Garantisi!
              </h2>
              <p className="text-xl text-gray-400 mb-10 font-medium leading-relaxed">
                <span className="text-white"><strong>Mavi Basım Matbaa & Reklam</strong></span> olarak katalog baskı sürecimiz standart 4 iş günüdür. Her projeye %100 özgün tasarım ve yüksek baskı kalitesi sunuyoruz. Matbaa ve reklam ajanslarına özel indirimlerimiz için hemen iletişime geçin!
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
          <RelatedBlogPosts category="katalog" />

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
      <ProductSEOSection categoryKey="katalog" />
    </div>
  );
};
