import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronRight, 
  ShoppingCart, 
  ArrowRight, 
  Search, 
  ArrowLeft 
} from 'lucide-react';
import { 
  useCart, 
  KARTVIZIT_DATA, 
  ProductSEOSection, 
  AgencyDiscountCTA, 
  FireWarning, 
  FeatureTooltip 
} from '../App';
import { WHATSAPP_LINK } from '../constants/contact';

export const SmartProductFinder = () => {
  const { openProductDetail } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any[] | null>(null);

  const displayData = KARTVIZIT_DATA;

  const questions = [
    {
      id: 'finish',
      text: 'Yüzey (Selefon)?',
      options: [
        { label: 'Parlak Selefon', value: 'Parlak Selefon' },
        { label: 'Mat Selefon', value: 'Mat Selefon' },
        { label: 'Selefonsuz', value: 'Selefonsuz' },
        { label: 'Fikrim yok', value: 'skip' }
      ]
    },
    {
      id: 'thickness',
      text: 'Kağıt Kalınlığı?',
      options: [
        { label: '250 gr', value: '250 gr' },
        { label: '280 gr', value: '280 gr' },
        { label: '300 gr', value: '300 gr' },
        { label: '350 gr', value: '350 gr' },
        { label: '400 gr', value: '400 gr' },
        { label: '700 gr', value: '700 gr' },
        { label: '800 gr', value: '800 gr' },
        { label: 'Fikrim yok', value: 'skip' }
      ]
    },
    {
      id: 'sides',
      text: 'Baskı Yönü?',
      options: [
        { label: 'Tek Yön', value: 'Tek Yön' },
        { label: 'Çift Yön', value: 'Çift Yön' },
        { label: 'Fikrim yok', value: 'skip' }
      ]
    },
    {
      id: 'special',
      text: 'Özel İşlem?',
      options: [
        { label: 'Düz Kesim', value: 'Düz Kesim' },
        { label: 'Laklı', value: 'Lak' },
        { label: 'Sıvama', value: 'Sıvama' },
        { label: 'Yaldız', value: 'Yaldız' },
        { label: 'Özel Kesim', value: 'Özel Kesim' },
        { label: 'Fikrim yok', value: 'skip' }
      ]
    }
  ];

  const checkAvailability = (currentAnswers: Record<string, string>, nextId: string, nextValue: string) => {
    if (nextValue === 'skip') return true;
    
    const testAnswers = { ...currentAnswers, [nextId]: nextValue };
    
    return displayData.some((cat: any) => 
      cat.items.some((item: any) => {
        const desc = item.desc.toLowerCase();
        let match = true;
        
        if (testAnswers.finish && testAnswers.finish !== 'skip') {
          const finish = testAnswers.finish.toLowerCase();
          if (testAnswers.finish === 'Selefonsuz') {
            if (desc.includes('selefon')) match = false;
          } else {
            if (!desc.includes(finish)) match = false;
          }
        }
        
        if (match && testAnswers.sides && testAnswers.sides !== 'skip') {
          const sides = testAnswers.sides.toLowerCase();
          const isSivama = desc.includes('sıvama') || cat.cat.toLowerCase() === 'sıvama';
          
          if (sides === 'tek yön') {
            if (isSivama) {
              match = false;
            } else if (!desc.includes('tek yön')) {
              match = false;
            }
          } else if (sides === 'çift yön') {
            if (!isSivama && !desc.includes('çift yön')) {
              match = false;
            }
          }
        }
        
        if (match && testAnswers.thickness && testAnswers.thickness !== 'skip') {
          const thickness = testAnswers.thickness.toLowerCase();
          if (!desc.includes(thickness)) match = false;
        }
        
        if (match && testAnswers.special && testAnswers.special !== 'skip') {
          const special = testAnswers.special.toLowerCase();
          let specialMatch = false;
          
          if (testAnswers.special === 'Düz Kesim') {
            specialMatch = !desc.includes('özel kesim') && !desc.includes('oval kesim');
          } else if (special === 'lak') {
            specialMatch = desc.includes('laklı') || cat.cat.toLowerCase() === 'lak';
          } else {
            specialMatch = desc.includes(special) || cat.cat.toLowerCase() === special;
            if (!specialMatch && testAnswers.special === 'Özel Kesim') {
              specialMatch = desc.includes('oval kesim');
            }
          }
          
          if (!specialMatch) match = false;
        }
        return match;
      })
    );
  };

  const handleAnswer = (value: string) => {
    const currentQuestion = questions[step];
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      let nextStep = step + 1;
      let currentAnswers = newAnswers;
      
      while (nextStep < questions.length) {
        const nextQuestion = questions[nextStep];
        const validOptions = nextQuestion.options.filter(opt => 
          opt.value !== 'skip' && checkAvailability(currentAnswers, nextQuestion.id, opt.value)
        );

        if (validOptions.length > 1) {
          setStep(nextStep);
          setAnswers(currentAnswers);
          return;
        } else if (validOptions.length === 1) {
          currentAnswers = { ...currentAnswers, [nextQuestion.id]: validOptions[0].value };
          nextStep++;
        } else {
          findProduct(currentAnswers);
          return;
        }
      }
      
      findProduct(currentAnswers);
    } else {
      findProduct(newAnswers);
    }
  };

  const findProduct = (finalAnswers: Record<string, string>) => {
    let filtered: any[] = [];
    displayData.forEach((cat: any) => {
      cat.items.forEach((item: any) => {
        const desc = item.desc.toLowerCase();
        let isMatch = true;
        
        if (finalAnswers.finish && finalAnswers.finish !== 'skip') {
          const finish = finalAnswers.finish.toLowerCase();
          if (finalAnswers.finish === 'Selefonsuz') {
            if (desc.includes('selefon')) isMatch = false;
          } else {
            if (!desc.includes(finish)) isMatch = false;
          }
        }

        if (isMatch && finalAnswers.sides && finalAnswers.sides !== 'skip') {
          const sides = finalAnswers.sides.toLowerCase();
          const isSivama = desc.includes('sıvama') || cat.cat.toLowerCase() === 'sıvama';
          
          if (sides === 'tek yön') {
            if (isSivama) {
              isMatch = false;
            } else if (!desc.includes('tek yön')) {
              isMatch = false;
            }
          } else if (sides === 'çift yön') {
            if (!isSivama && !desc.includes('çift yön')) {
              isMatch = false;
            }
          }
        }

        if (isMatch && finalAnswers.thickness && finalAnswers.thickness !== 'skip') {
          const thickness = finalAnswers.thickness.toLowerCase();
          if (!desc.includes(thickness)) isMatch = false;
        }
        
        if (isMatch && finalAnswers.special && finalAnswers.special !== 'skip') {
          const special = finalAnswers.special.toLowerCase();
          let specialMatch = false;
          
          if (finalAnswers.special === 'Düz Kesim') {
            specialMatch = !desc.includes('özel kesim') && !desc.includes('oval kesim');
          } else if (special === 'lak') {
            specialMatch = desc.includes('laklı') || cat.cat.toLowerCase() === 'lak';
          } else {
            specialMatch = desc.includes(special) || cat.cat.toLowerCase() === special;
            if (!specialMatch && finalAnswers.special === 'Özel Kesim') {
              specialMatch = desc.includes('oval kesim');
            }
          }
          
          if (!specialMatch) isMatch = false;
        }
        
        if (isMatch) {
          filtered.push({ ...item });
        }
      });
    });

    setResult(filtered.slice(0, 4));
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="bg-blue-50 rounded-2xl shadow-lg border border-primary/30 p-3 overflow-hidden relative w-full">
      <div className="absolute top-3 right-3 flex gap-1 w-16 z-20">
        {questions.map((_, idx) => (
          <div key={idx} className={`h-1 flex-1 rounded-full transition-all ${idx <= step ? 'bg-primary' : 'bg-gray-100'}`} />
        ))}
      </div>
      
      {!result ? (
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-3 shrink-0 md:border-r md:border-gray-100 md:pr-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
              <Search size={20} />
            </div>
            <div>
              <h2 className="text-[11px] font-black text-black uppercase tracking-tight">Akıllı Bulucu</h2>
              <p className="text-[9px] text-black font-medium">Size en uygun kartı bulalım.</p>
            </div>
          </div>

          <div className="flex-grow w-full">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {step > 0 && (
                    <button 
                      onClick={() => setStep(step - 1)}
                      className="flex items-center gap-1 px-2 py-1 bg-secondary text-white rounded-lg transition-all hover:bg-primary font-black text-[9px] uppercase shadow-sm"
                    >
                      <ArrowLeft size={10} />
                      Geri
                    </button>
                  )}
                  <h3 className="text-[11px] font-black text-black">{questions[step].text}</h3>
                </div>
                {questions[step].id === 'special' && answers.finish === 'Parlak Selefon' && (
                  <span className="text-[9px] text-red-500 font-bold">Parlak selefonda lak ve özel kesim yapılamaz.</span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {questions[step].options.map((opt, idx) => {
                  const isAvailable = checkAvailability(answers, questions[step].id, opt.value);
                  const isDisabled = !isAvailable;
                  
                  const isPopularOption = (
                    opt.value === '350 gr' || 
                    opt.value === '700 gr' || 
                    opt.value === 'Mat Selefon' || 
                    opt.value === 'Sıvama' || 
                    opt.value === 'Çift Yön' || 
                    opt.value === 'Düz Kesim' || 
                    opt.value === 'Özel Kesim'
                  );
                  
                  return (
                    <button
                      key={idx}
                      disabled={isDisabled}
                      onClick={() => handleAnswer(opt.value)}
                      className={`px-3 py-1.5 rounded-xl border transition-all font-black text-[10px] flex-1 md:flex-none text-center relative ${
                        isDisabled
                        ? 'opacity-20 cursor-not-allowed bg-gray-50 border-gray-100 text-gray-400'
                        : opt.value === 'skip' 
                          ? 'border-primary/50 bg-primary/10 text-primary hover:bg-primary/20 shadow-md ring-2 ring-primary/5' 
                          : isPopularOption
                            ? 'border-orange-400 bg-orange-50 text-orange-600 hover:bg-orange-100 shadow-sm ring-2 ring-orange-400/10'
                            : 'border-primary/10 bg-white text-secondary hover:border-primary hover:bg-primary/5'
                      }`}
                    >
                      {isPopularOption && (
                        <span className="absolute -top-2 -right-1 bg-orange-400 text-white text-[6px] font-black px-1 rounded-full shadow-sm">EN ÇOK İSTENDİ</span>
                      )}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center justify-between shrink-0 md:border-r md:border-gray-100 md:pr-4 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                <Search size={20} />
              </div>
              <h2 className="text-[11px] font-black text-black uppercase tracking-tight">Öneriler</h2>
            </div>
            <button onClick={reset} className="text-secondary font-black text-[10px] hover:underline md:hidden bg-gray-100 px-2 py-0.5 rounded-lg">Sıfırla</button>
          </div>
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            {result.length > 0 ? result.map((item, idx) => {
              const desc = item.desc.toLowerCase();
              const isPopular = (
                desc.includes('350 gr') || 
                desc.includes('700 gr') || 
                desc.includes('sıvama') || 
                desc.includes('mat selefon') || 
                desc.includes('çift yön') || 
                desc.includes('özel kesim') ||
                (!desc.includes('özel kesim') && !desc.includes('oval kesim'))
              ) && !['VIP', 'S-COK', 'S-SEK', 'A-SEK', 'AC-SEK'].some(code => item.code.includes(code));
              return (
                <div key={idx} className={`bg-primary/5 rounded-xl p-1.5 px-3 border border-primary/10 flex items-center justify-between gap-3 relative overflow-hidden group ${isPopular ? 'ring-2 ring-orange-400/20' : ''}`}>
                  {isPopular && (
                    <div className="absolute top-0 right-0 bg-orange-400 text-white text-[6px] font-black px-1.5 py-0.5 rounded-bl-lg uppercase tracking-tighter z-10">
                      En Çok İstendi
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[10px] font-black text-black truncate">{item.code}</h4>
                    </div>
                    <p className="text-[8px] text-slate-400 font-medium truncate">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[12px] md:text-[14px] font-black text-black">{item.price}</span>
                    <button 
                      onClick={() => {
                        openProductDetail(item, "Kartvizit");
                      }}
                      className="bg-primary text-white p-1 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <ShoppingCart size={12} />
                    </button>
                  </div>
                </div>
              );
            }) : (
              <div className="flex items-center justify-center gap-3 w-full py-1">
                <p className="text-[9px] text-black font-bold">Uygun ürün bulunamadı.</p>
                <button onClick={reset} className="bg-primary text-white px-3 py-1 rounded-lg font-bold text-[9px]">Tekrar Dene</button>
              </div>
            )}
          </div>
          <button onClick={reset} className="hidden md:block text-secondary font-black text-[11px] hover:text-primary transition-colors shrink-0 bg-gray-100 px-4 py-2 rounded-xl shadow-sm border border-gray-200">Sıfırla</button>
        </div>
      )}
    </div>
  );
};

export const KartvizitPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail({ ...item, miktar: item.miktar || "1000 Adet" }, "Kartvizit");
  };

  const displayData = KARTVIZIT_DATA;

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Kartvizit Baskı | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Profesyonel kartvizit baskı hizmetleri. 1.000 adet kartvizit, kabartma laklı, sıvama, tuale ve şeffaf kartvizit seçenekleri ile markanızı güçlendirin." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap shrink-0">
            <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
              <ChevronRight size={20} className="rotate-180 text-secondary" />
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Kartvizitler</h1>
              <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
              <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">Ebat 82x52 mm - 1.000 Adet</p>
            </div>
          </div>
          <div className="flex-grow">
            <SmartProductFinder />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-visible relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px]">
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th className="p-4 w-10"></th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((category: any, cIdx: number) => (
                  <React.Fragment key={cIdx}>
                    {category.items.map((item: any, iIdx: number) => (
                      <tr key={`${cIdx}-${iIdx}`} className="border-b border-gray-100 hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group">
                        {iIdx === 0 && (
                          <td 
                            rowSpan={category.items.length}
                            className={`${category.color} text-white font-black text-center p-1 w-10 border-r border-white/10`}
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            <span className="tracking-[0.1em] uppercase text-[10px]">{category.cat}</span>
                          </td>
                        )}
                        <td className="p-3 text-center font-bold text-black border-r border-gray-100 group-hover:text-secondary transition-colors">
                          <div className="flex flex-col items-center gap-1">
                            {item.code}
                            {item.img && (
                              <div className="w-12 h-8 rounded overflow-hidden border border-gray-100 shadow-sm">
                                <img src={item.img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-center text-black font-medium border-r border-gray-100">
                          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
                            {'isNew' in item && (item as any).isNew && (
                              <span className="text-primary font-black text-[9px]">YENİ ÜRÜN</span>
                            )}
                            <span className="group-hover:font-bold transition-all">
                              {item.desc}
                              <FeatureTooltip code={item.code} />
                            </span>
                          </div>
                          {item.note && (
                            <div className="text-[10px] text-red-600 font-bold mt-1 leading-tight">
                              {item.note}
                            </div>
                          )}
                        </td>
                        <td className="p-3 text-center text-black font-medium border-r border-gray-100 transition-colors">
                          {item.miktar || "1.000 ADET"}
                        </td>
                        <td className="p-3 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[14px] md:text-[16px] transition-colors">
                          {item.price}
                        </td>
                        <td className="p-3 text-center">
                          <button 
                            onClick={() => openWhatsApp(item)}
                            className="bg-primary text-white hover:bg-secondary transition-all p-2 rounded-lg shadow-sm scale-90 group-hover:scale-100"
                            title="WhatsApp ile Sipariş Ver"
                          >
                            <ShoppingCart size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <FireWarning />

        <div className="mt-16 space-y-16">
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Kartvizit Özellikleri (2026 Güncel)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Kağıt", value: "350 gr mat veya parlak kuşe (standart)" },
                { label: "Baskı", value: "Tek taraflı veya çift taraflı full renk CMYK" },
                { label: "Ebat", value: "Standart 8x5 cm – istenirse özel ebat yapılabilir" },
                { label: "Adet", value: "100 – 10.000 adet" }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-primary font-black uppercase text-xs mb-1">{item.label}</h3>
                  <p className="font-bold text-black">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg font-medium text-black italic border-l-4 border-primary pl-6 py-2">
              "Kartvizit bask, profesyonel ilk izlenimi belirleyen temel unsurdur. Mat kartvizit şık ve premium bir his verirken, parlak kartvizit canlı renklerle dikkat çeker."
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Kartvizit Hangi Sektörler İçin En Uygun?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: "Avukat Kartviziti", desc: "Hukuk büroları için sade ve güvenilir" },
                { title: "Kuaför Kartviziti", desc: "Güzellik salonları için renkli ve yaratıcı" },
                { title: "Muhasebe Kartviziti", desc: "Mali müşavirler için profesyonel ve net" },
                { title: "Emlak Kartviziti", desc: "Emlak danışmanları için QR kodlu" },
                { title: "Doktor Kartviziti", desc: "Hekimler için diploma no vurgulu" }
              ].map((sector, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-black text-black mb-2">{sector.title}</h3>
                  <p className="text-sm font-medium text-gray-500">{sector.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Özel Kartvizit Seçenekleri</h2>
            <p className="text-gray-500 font-medium mb-8">İhtiyacınıza uygun farklı materyal ve baskı teknikleri</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Ekonomik Kartvizit", desc: "Uygun fiyata kurumsal kimliğinizi tamamlayın." },
                { title: "Kabartma Laklı", desc: "Dokunulduğunda fark yaratan lüks ve prestijli kartlar." },
                { title: "Sıvama Kartvizit", desc: "Ekstra kalın, dayanıklı ve akılda kalıcı premium seçim." },
                { title: "Tuale Fantezi", desc: "Dokulu kağıt ile şık ve benzersiz bir farklılık yaratın." },
                { title: "Şeffaf Kartvizit", desc: "Modern, yenilikçi ve dikkat çekici şeffaf tasarımlar." },
                { title: "Plastik Kartvizit", desc: "Su geçirmez, uzun ömürlü ve prestijli plastik kartlar." }
              ].map((option, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-xl hover:border-primary/30 transition-all group">
                  <h3 className="text-xl font-black text-black mb-3">{option.title}</h3>
                  <p className="text-gray-600 font-medium mb-6">{option.desc}</p>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm group-hover:gap-4 transition-all">
                    Detaylı Bilgi Al <ArrowRight size={18} />
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Tasarım Nasıl Yapılır?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Hedef & Konsept", desc: "Adet, logo ve iletişim detaylarını belirleyin." },
                { step: "2", title: "İçerik Planlama", desc: "Ön yüz logo/unvan, arka yüz iletişim/QR kod." },
                { step: "3", title: "Teknik Hazırlık", desc: "PDF, CMYK, 300 dpi ve +3 mm taşma payı." },
                { step: "4", title: "Onay & Baskı", desc: "Tasarımı gönderin, aynı gün onay ile üretim başlasın." }
              ].map((item, idx) => (
                <div key={idx} className="relative p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <span className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-black text-black mb-3 mt-2">{item.title}</h3>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="bg-red-50 p-8 rounded-[32px] border border-red-100">
              <h2 className="text-2xl font-black text-red-600 mb-6 uppercase tracking-tight">Sık Yapılan 5 Hata</h2>
              <ul className="space-y-4">
                {[
                  "Logo veya iletişim bilgileri eksikliği",
                  "Yanlış kağıt seçimi (profesyonelliği düşürür)",
                  "Baskı renk uyumsuzluğu",
                  "Tasarımın çok kalabalık ve karmaşık olması",
                  "Ebat hatası (dağıtımı zorlaştırır)"
                ].map((error, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-lg font-bold text-red-900">
                    <div className="w-2 h-2 bg-red-600 rounded-full" />
                    {error}
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-white rounded-xl border border-red-100">
                <p className="text-black font-bold">
                  💡 İpucu: Tasarım ücretimiz 200 TL'dir. Hazır tasarım getirirseniz ücretsiz baskı yapıyoruz!
                </p>
              </div>
            </section>

            <AgencyDiscountCTA />
          </div>
        </div>
      </div>
      <ProductSEOSection categoryKey="kartvizit" />
    </div>
  );
};
