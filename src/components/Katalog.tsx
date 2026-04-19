import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronRight, 
  RefreshCw, 
  ShoppingCart, 
  PhoneCall, 
  Zap, 
  X, 
  CheckCircle2, 
  ChevronLeft 
} from 'lucide-react';
import { useCart, FireWarning, ProductSEOSection } from '../App';
import { WHATSAPP_LINK } from '../constants/contact';

export const KATALOG_DATA = {
  title: "Katalog Baskı Fiyatları 2026 - 135 gr Kuşe + 300 gr Kapak (KDV Hariç)",
  note: "Acil Katalog Baskıları için %30 fark ile 36 saat sonra teslimat",
  footerNote: "Standart A4 / A5 dikey ebatlar için geçerlidir. Kare ve yatay ebatlarda %5-10 fire farkı eklenebilir. Yüksek adetlerde ekstra indirim!",
  headers: ["Adet", "Fiyat", "Sipariş"],
  rows: [
    { label: "A4 4 Sayfa + Kapak", total: "8 Sayfa", p50: "5.400 TL", p100: "8.500 TL", p250: "11.800 TL", p500: "13.500 TL", p1000: "15.500 TL" },
    { label: "A4 8 Sayfa + Kapak", total: "12 Sayfa", p50: "6.500 TL", p100: "11.500 TL", p250: "14.500 TL", p500: "15.900 TL", p1000: "19.000 TL" },
    { label: "A4 12 Sayfa + Kapak", total: "16 Sayfa", p50: "7.500 TL", p100: "12.800 TL", p250: "18.000 TL", p500: "19.750 TL", p1000: "23.350 TL" },
    { label: "A4 16 Sayfa + Kapak", total: "20 Sayfa", p50: "8.800 TL", p100: "14.000 TL", p250: "19.900 TL", p500: "22.000 TL", p1000: "26.000 TL" },
    { label: "A4 20 Sayfa + Kapak", total: "24 Sayfa", p50: "9.900 TL", p100: "16.000 TL", p250: "23.500 TL", p500: "25.800 TL", p1000: "30.700 TL" },
    { label: "A4 24 Sayfa + Kapak", total: "28 Sayfa", p50: "11.000 TL", p100: "18.300 TL", p250: "25.500 TL", p500: "28.300 TL", p1000: "34.700 TL" },
    { label: "A4 28 Sayfa + Kapak", total: "32 Sayfa", p50: "12.300 TL", p100: "20.000 TL", p250: "29.000 TL", p500: "32.300 TL", p1000: "38.900 TL" },
    { label: "A4 32 Sayfa + Kapak", total: "36 Sayfa", p50: "13.300 TL", p100: "22.200 TL", p250: "31.000 TL", p500: "34.800 TL", p1000: "41.000 TL" },
    { label: "A4 36 Sayfa + Kapak", total: "40 Sayfa", p50: "13.250 TL", p100: "24.050 TL", p250: "34.500 TL", p500: "38.300 TL", p1000: "45.500 TL" },
    { label: "40 Sayfa ve Üzeri", total: "Özel Teklif", p50: "", p100: "", p250: "", p500: "", p1000: "Fiyat Alabilirsiniz", isSpecial: true },
  ]
};

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
        { label: '1000 Adet', value: 'p1000' }
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
      miktar: questions[1].options.find(o => o.value === answers.adet)?.label || "1000"
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

export const KatalogPage = () => {
  const { openProductDetail } = useCart();
  const [showFinder, setShowFinder] = useState(false);
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Kataloglar");
  };

  return (
    <div className="bg-[#f3f4f6] min-h-screen pb-20">
      <Helmet>
        <title>Katalog Baskı Fiyatları | Mavi Basım Matbaa &amp; Reklam</title>
        <meta name="description" content="Profesyonel katalog baskı hizmetleri. A4 ve A5 katalog fiyatları, 135 gr kuşe iç sayfa, 300 gr kapak seçenekleri ile kaliteli ve hızlı katalog üretimi." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-sm transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Katalog Baskı Fiyatları</h1>
          <button 
            onClick={() => setShowFinder(true)}
            className="ml-auto bg-primary text-white px-6 py-3 rounded-2xl font-black uppercase tracking-tighter hover:bg-secondary transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <RefreshCw size={18} />
            Akıllı Hesaplayıcı
          </button>
        </div>

        <AnimatePresence>
          {showFinder && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-2xl"
              >
                <SmartKatalogFinder onClose={() => setShowFinder(false)} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {KATALOG_DATA.rows.map((row, rIdx) => (
            <div key={rIdx} className="bg-white rounded-3xl overflow-visible shadow-2xl border border-gray-100 flex flex-col">
              <div className="p-6 bg-black text-white rounded-t-3xl">
                <h3 className="text-lg font-black uppercase tracking-tight leading-tight mb-1">{row.label}</h3>
                <p className="text-primary font-bold text-sm uppercase">{row.total} Katalog</p>
              </div>
              
              <div className="p-6 flex-grow">
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
                  <div className="w-1/2 rounded-xl overflow-hidden border border-gray-100 shadow-inner">
                    <img 
                      src="/katalog.webp" 
                      alt="Katalog Baskı" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
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
                        { qty: '1000', price: row.p1000 }
                      ].filter(item => item.price).map((item, iIdx) => (
                        <tr key={iIdx} className="border-b border-gray-100 last:border-0 hover:bg-primary/5 transition-colors">
                          <td className="p-3 border-r border-gray-200 text-black">
                            {item.qty} Adet
                          </td>
                          <td className="p-3 border-r border-gray-200 text-black font-black text-sm">{item.price}</td>
                          <td className="p-2">
                            <button 
                              onClick={() => openWhatsApp({
                                code: "KATALOG",
                                desc: row.label,
                                price: item.price,
                                miktar: `${item.qty} Adet`
                              })}
                              className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-all hover:scale-110 active:scale-95"
                            >
                              <ShoppingCart size={14} />
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
                </div>
                <FireWarning />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
          <p className="text-black font-bold text-center text-sm italic leading-relaxed">
            {KATALOG_DATA.footerNote}
            <br />
            <span className="text-black not-italic mt-2 block font-black uppercase tracking-tight">{KATALOG_DATA.note}</span>
          </p>
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
        </div>
      </div>
      <ProductSEOSection categoryKey="katalog" />
    </div>
  );
};
