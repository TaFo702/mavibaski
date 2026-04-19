import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronRight, 
  ShoppingCart, 
  ArrowRight, 
  Search, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { 
  useCart, 
  ProductSEOSection, 
  AgencyDiscountCTA, 
  FireWarning, 
  FeatureTooltip 
} from '../App';
import { WHATSAPP_LINK } from '../constants/contact';

export const KUSE_115_DATA = [
  {
    cat: "Standart Broşür",
    color: "bg-blue-600",
    subTitle: "115 gr. Kuşe Çift Yön Renkli",
    items: [
      { code: "1CA7", price: "1.200 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A7", ebat: "9.5x20 cm", miktar: "1.000 Adet" },
      { code: "2CA7", price: "1.450 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A7", ebat: "9.5x20 cm", miktar: "2.000 Adet" },
      { code: "5CA7", price: "2.100 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A7", ebat: "9.5x20 cm", miktar: "5.000 Adet" },
      { code: "10CA7", price: "3.500 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A7", ebat: "9.5x20 cm", miktar: "10.000 Adet" },
      { code: "1CA5", price: "1.300 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A5", ebat: "14x20 cm", miktar: "1.000 Adet" },
      { code: "2CA5", price: "1.500 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A5", ebat: "14x20 cm", miktar: "2.000 Adet" },
      { code: "5CA5", price: "2.350 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A5", ebat: "14x20 cm", miktar: "5.000 Adet" },
      { code: "10CA5", price: "3.900 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A5", ebat: "14x20 cm", miktar: "10.000 Adet" },
      { code: "1CA4", price: "1.750 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A4", ebat: "20x28 cm", miktar: "1.000 Adet" },
      { code: "2CA4", price: "2.150 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A4", ebat: "20x28 cm", miktar: "2.000 Adet" },
      { code: "5CA4", price: "3.700 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A4", ebat: "20x28 cm", miktar: "5.000 Adet" },
      { code: "10CA4", price: "6.600 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A4", ebat: "20x28 cm", miktar: "10.000 Adet" },
      { code: "1CA3", price: "2.800 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A3", ebat: "28x40 cm", miktar: "1.000 Adet" },
      { code: "2CA3", price: "3.600 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A3", ebat: "28x40 cm", miktar: "2.000 Adet" },
      { code: "5CA3", price: "6.500 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A3", ebat: "28x40 cm", miktar: "5.000 Adet" },
      { code: "10CA3", price: "12.200 ₺", desc: "115 gr. Kuşe Çift Yön Renkli", size: "A3", ebat: "28x40 cm", miktar: "10.000 Adet" },
    ]
  }
];

export const KUSE_128_DATA = [
  {
    cat: "Pro Broşür",
    color: "bg-red-600",
    subTitle: "128 gr. Kuşe Çift Yön Renkli",
    items: [
      { code: "PRO1A7", price: "1.350 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A7 (10x21 cm) 1.000 Adet", size: "A7", ebat: "10x21 cm", miktar: "1.000 Adet" },
      { code: "PRO2A7", price: "1.550 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A7 (10x21 cm) 2.000 Adet", size: "A7", ebat: "10x21 cm", miktar: "2.000 Adet" },
      { code: "PRO1A5", price: "1.500 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A5 (15x21 cm) 1.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "1.000 Adet" },
      { code: "PRO2A5", price: "1.700 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A5 (15x21 cm) 2.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "2.000 Adet" },
      { code: "PRO1A4", price: "2.100 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A4 (21x30 cm) 1.000 Adet", size: "A4", ebat: "21x30 cm", miktar: "1.000 Adet" },
      { code: "PRO2A4", price: "2.600 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A4 (21x30 cm) 2.000 Adet", size: "A4", ebat: "21x30 cm", miktar: "2.000 Adet" },
      { code: "PRO1A3", price: "3.450 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A3 (30x42 cm) 1.000 Adet", size: "A3", ebat: "30x42 cm", miktar: "1.000 Adet" },
      { code: "PRO2A3", price: "4.500 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A3 (30x42 cm) 2.000 Adet", size: "A3", ebat: "30x42 cm", miktar: "2.000 Adet" },
    ]
  }
];

export const KUSE_200_DATA = [
  {
    cat: "Selefonlu Broşür",
    color: "bg-red-600",
    subTitle: "200 gr. Kuşe Çift Yön Renkli",
    desc: "Parlak Selefonlu",
    items: [
      { code: "CBS1", price: "3.200 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A7 (10x21 cm) 3.000 Adet", size: "A7", ebat: "10x21 cm", miktar: "3.000 Adet" },
      { code: "CBS2", price: "5.600 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A7 (10x21 cm) 6.000 Adet", size: "A7", ebat: "10x21 cm", miktar: "6.000 Adet" },
      { code: "CBS3", price: "10.400 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A7 (10x21 cm) 12.000 Adet", size: "A7", ebat: "10x21 cm", miktar: "12.000 Adet" },
      { code: "CBS4", price: "3.100 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A5 (15x21 cm) 2.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "2.000 Adet" },
      { code: "CBS5", price: "5.400 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A5 (15x21 cm) 4.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "4.000 Adet" },
      { code: "CBS6", price: "7.600 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A5 (15x21 cm) 6.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "6.000 Adet" },
      { code: "CBS7", price: "2.900 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A4 (21x30 cm) 1.000 Adet", size: "A4", ebat: "21x30 cm", miktar: "1.000 Adet" },
      { code: "CBS8", price: "4.800 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A4 (21x30 cm) 2.000 Adet", size: "A4", ebat: "21x30 cm", miktar: "2.000 Adet" },
      { code: "CBS9", price: "8.700 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A4 (21x30 cm) 4.000 Adet", size: "A4", ebat: "21x30 cm", miktar: "4.000 Adet" },
      { code: "CBS10", price: "4.800 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A3 (30x42 cm) 1.000 Adet", size: "A3", ebat: "30x42 cm", miktar: "1.000 Adet" },
      { code: "CBS11", price: "8.700 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A3 (30x42 cm) 2.000 Adet", size: "A3", ebat: "30x42 cm", miktar: "2.000 Adet" },
      { code: "CBS12", price: "16.000 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A3 (30x42 cm) 4.000 Adet", size: "A3", ebat: "30x42 cm", miktar: "4.000 Adet" },
    ]
  }
];

export const BROSUR_DATA = [...KUSE_115_DATA, ...KUSE_128_DATA, ...KUSE_200_DATA];

export const SmartBrosurFinder = () => {
  const { openProductDetail } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any[] | null>(null);

  const questions = [
    {
      id: 'weight',
      text: 'Kağıt Gramajı?',
      options: [
        { label: '115 gr', value: '115 gr', isPopular: true },
        { label: '128 gr', value: '128 gr' },
        { label: '200 gr', value: '200 gr' },
        { label: 'Fikrim yok', value: 'skip' }
      ]
    },
    {
      id: 'size',
      text: 'Ebat?',
      options: [
        { label: 'A7', value: 'A7' },
        { label: 'A5', value: 'A5', isPopular: true },
        { label: 'A4', value: 'A4' },
        { label: 'A3', value: 'A3' },
        { label: '34x49', value: '34x49' },
        { label: '49x69', value: '49x69' },
        { label: 'Fikrim yok', value: 'skip' }
      ]
    },
    {
      id: 'quantity',
      text: 'Adet?',
      options: [
        { label: '250 Adet', value: '250 Adet' },
        { label: '500 Adet', value: '500 Adet' },
        { label: '1.000 Adet', value: '1.000 Adet' },
        { label: '2.000 Adet', value: '2.000 Adet' },
        { label: '3.000 Adet', value: '3.000 Adet' },
        { label: '4.000 Adet', value: '4.000 Adet', isPopular: true },
        { label: '5.000 Adet', value: '5.000 Adet' },
        { label: '6.000 Adet', value: '6.000 Adet' },
        { label: '8.000 Adet', value: '8.000 Adet' },
        { label: '10.000 Adet', value: '10.000 Adet' },
        { label: '12.000 Adet', value: '12.000 Adet' },
        { label: 'Fikrim yok', value: 'skip' }
      ]
    }
  ];

  const checkAvailability = (currentAnswers: Record<string, string>, nextId: string, nextValue: string) => {
    if (nextValue === 'skip') return true;
    const testAnswers = { ...currentAnswers, [nextId]: nextValue };
    
    return BROSUR_DATA.some(cat => 
      cat.items.some(item => {
        let match = true;
        if (testAnswers.weight && testAnswers.weight !== 'skip' && !item.desc.toLowerCase().includes(testAnswers.weight.toLowerCase())) match = false;
        if (match && testAnswers.size && testAnswers.size !== 'skip' && item.size !== testAnswers.size) match = false;
        if (match && testAnswers.quantity && testAnswers.quantity !== 'skip' && item.miktar !== testAnswers.quantity) match = false;
        return match;
      })
    );
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      findProduct(newAnswers);
    }
  };

  const findProduct = (finalAnswers: Record<string, string>) => {
    let filtered: any[] = [];
    BROSUR_DATA.forEach(cat => {
      cat.items.forEach(item => {
        let isMatch = true;
        if (finalAnswers.weight && finalAnswers.weight !== 'skip' && !item.desc.toLowerCase().includes(finalAnswers.weight.toLowerCase())) isMatch = false;
        if (isMatch && finalAnswers.size && finalAnswers.size !== 'skip' && item.size !== finalAnswers.size) isMatch = false;
        if (isMatch && finalAnswers.quantity && finalAnswers.quantity !== 'skip' && item.miktar !== finalAnswers.quantity) isMatch = false;
        if (isMatch) filtered.push({ ...item });
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
              <h2 className="text-[11px] font-black text-black uppercase tracking-tight">Broşür Bulucu</h2>
              <p className="text-[9px] text-black font-medium">Size en uygun broşürü bulalım.</p>
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
              </div>
              <div className="flex flex-wrap gap-1.5">
                {questions[step].options.map((opt, idx) => {
                  const isAvailable = checkAvailability(answers, questions[step].id, opt.value);
                  const isDisabled = !isAvailable;
                  return (
                    <button
                      key={idx}
                      disabled={isDisabled}
                      onClick={() => handleAnswer(opt.value)}
                      className={`px-3 py-1.5 rounded-xl border transition-all font-black text-[10px] flex-1 md:flex-none text-center relative ${
                        isDisabled
                        ? 'opacity-20 cursor-not-allowed bg-gray-50 border-gray-100 text-gray-400'
                        : opt.value === 'skip' 
                          ? 'border-sky-200 bg-sky-50 text-sky-600 hover:bg-sky-100 shadow-sm' 
                          : (opt as any).isPopular
                            ? 'border-orange-400 bg-white text-orange-500 hover:bg-orange-50 shadow-sm'
                            : 'border-gray-200 bg-white text-black hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {(opt as any).isPopular && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-400 text-white text-[5px] px-1 py-0.5 rounded-full whitespace-nowrap">
                          EN ÇOK SATILAN
                        </span>
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
            {result.length > 0 ? result.map((item, idx) => (
              <div key={idx} className="bg-primary/5 rounded-xl p-1.5 px-3 border border-primary/10 flex items-center justify-between gap-3 relative overflow-hidden group">
                <div className="min-w-0">
                  <h4 className="text-[10px] font-black text-secondary truncate">
                    {item.code}
                    <FeatureTooltip code={item.code} />
                  </h4>
                  <p className="text-[8px] text-slate-400 font-medium truncate">
                    {item.desc.replace(/(\d{4,})/g, (match: string) => Number(match).toLocaleString('tr-TR'))}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[12px] md:text-[14px] font-black text-black">{item.price}</span>
                  <button 
                    onClick={() => {
                      openProductDetail(item, "Broşür");
                    }}
                    className="bg-primary text-white p-1 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <ShoppingCart size={12} />
                  </button>
                </div>
              </div>
            )) : (
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

export const BrosurPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Broşür");
  };

  const BrosurTable = ({ category, chunks }: { category: any, chunks: any[][] }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[11px] md:text-[13px]">
        <thead>
          <tr className="bg-black text-white border-b border-black">
            <th className="p-4 w-40"></th>
            <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EBAT</th>
            <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
            <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
            <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
            <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
            <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
          </tr>
        </thead>
        <tbody>
          {chunks.map((chunk, chunkIdx) => (
            <React.Fragment key={chunkIdx}>
              {chunk.map((item, itemIdx) => (
                <tr key={`${chunkIdx}-${itemIdx}`} className="border-b border-gray-100 hover:bg-primary/5 transition-all cursor-default group">
                  {itemIdx === 0 && (
                    <td 
                      rowSpan={chunk.length}
                      className="bg-white border-r border-gray-200 p-1.5 w-48 text-center align-middle"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-[18px] font-black text-black uppercase mb-0.5 leading-tight">
                          {category.cat.includes('Broşür') ? 'BROŞÜR' : category.cat.toUpperCase()}
                        </span>
                        <span className="text-[21px] font-black text-[#f27d26] mb-0.5 leading-tight">
                          {category.subTitle.split(' ')[0]} {category.subTitle.split(' ')[1]}
                        </span>
                        <span className="text-[11px] font-bold text-black uppercase tracking-tight text-center leading-tight">
                          {category.subTitle.split(' ').slice(2).join(' ')}
                          {(category as any).desc && <><br />{(category as any).desc}</>}
                        </span>
                      </div>
                    </td>
                  )}
                  <td className="p-1.5 text-center border-r border-gray-100">
                    <span className="inline-block px-3 py-1 rounded border border-[#cbd5e0] bg-[#edf2f7] text-black font-bold text-[14px] whitespace-nowrap">
                      {item.ebat}
                    </span>
                  </td>
                  <td className="p-1.5 text-center font-bold text-black border-r border-gray-100 group-hover:text-primary transition-colors">
                    {item.code}
                  </td>
                  <td className="p-1.5 text-center text-black font-medium border-r border-gray-100">
                    <span className="group-hover:font-bold transition-all">
                      {item.desc.split('(')[0].replace(/\s[Aa][3457]\b/g, '').trim()}
                      <FeatureTooltip code={item.code} />
                    </span>
                  </td>
                  <td className="p-1.5 text-center text-black font-medium border-r border-gray-100 transition-colors">
                    <span className="font-bold">{item.miktar.split(' ')[0]}</span> {item.miktar.split(' ')[1]}
                  </td>
                  <td className="p-1.5 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[16px] transition-colors">
                    {item.price}
                  </td>
                  <td className="p-1.5 text-center">
                    <button 
                      onClick={() => openWhatsApp(item)}
                      className="bg-primary text-white hover:bg-secondary transition-all p-1.5 rounded-full shadow-sm scale-95 group-hover:scale-100"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {chunkIdx < chunks.length - 1 && (
                <tr className="border-b-[3px] border-[#cbd5e0]">
                  <td colSpan={7} className="h-0 p-0"></td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Broşür Baskı | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="A5 ve A4 broşür baskı hizmetleri. 115 gr, 128 gr and 200 gr kuşe kağıt seçenekleri ile kaliteli ve ucuz broşür baskı çözümleri." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap shrink-0">
            <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
              <ChevronRight size={20} className="rotate-180 text-secondary" />
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Broşürler</h1>
              <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
              <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">115 - 128 - 200 gr. Kuşe - Renkli</p>
            </div>
          </div>
          <div className="flex-grow">
            <SmartBrosurFinder />
          </div>
        </div>

        <div className="space-y-16">
          {[
            { title: "115 gr. Kuşe Broşürler", data: KUSE_115_DATA },
            { title: "128 gr. Kuşe Broşürler", data: KUSE_128_DATA },
            { title: "200 gr. Kuşe Broşürler", data: KUSE_200_DATA }
          ].map((group, gIdx) => (
            <div key={gIdx} className="space-y-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-8 bg-[#29abe2] rounded-full" />
                <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">{group.title}</h2>
              </div>
              
              <div className="space-y-12">
                {group.data.map((category, cIdx) => {
                  const chunks: any[][] = [];
                  let currentChunk: any[] = [];
                  let lastEbat: string | null = null;

                  category.items.forEach((item) => {
                    if (lastEbat !== null && item.ebat !== lastEbat) {
                      chunks.push(currentChunk);
                      currentChunk = [];
                    }
                    currentChunk.push(item);
                    lastEbat = item.ebat;
                  });
                  if (currentChunk.length > 0) chunks.push(currentChunk);

                  return (
                    <div key={cIdx} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-fit">
                      <BrosurTable category={category} chunks={chunks} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <FireWarning />

        {/* New Content Section */}
        <div className="mt-20 space-y-20">
          {/* Giriş */}
          <section>
            <h2 className="text-2xl md:text-4xl font-black text-black mb-8 uppercase tracking-tight">Broşür Baskı ile Kampanyalarınızı Duyurun</h2>
            <div className="prose prose-slate max-w-none text-black">
              <p className="text-xl leading-relaxed mb-8">
                <strong className="font-black text-primary">Broşür baskı ve el ilanı baskı hizmetlerinde Türkiye’nin en çok tercih edilen matbaasıyız.</strong> A5 broşür ve A4 broşür seçeneklerimizle tanıtım, kampanya, etkinlik ve ürün duyurularınıza etkili çözümler sunuyoruz. Katlamalı broşür, üç kırımlı broşür, flyer baskı, tanıtım broşürü, reklam broşürü, ucuz broşür baskı ve online broşür baskı ihtiyaçlarınızda yüksek kaliteli baskı ve hızlı teslimat sağlıyoruz.
              </p>
            </div>
          </section>

          {/* Hangi Broşür Kimler İçin Uygun? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-10 uppercase tracking-tight text-center">Hangi Broşür Kimler İçin Uygun?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { id: "1", title: "A5 Broşür", desc: "Küçük alanlı dağıtım, cepte taşınabilirlik (etkinlik, restoran menüsü, klinik tanıtımı)." },
                { id: "2", title: "A4 Broşür", desc: "Detaylı ürün/hizmet tanıtımı, fuar standı, yıllık rapor." },
                { id: "3", title: "Katlamalı Broşür (Üç Kırımlı)", desc: "Çoklu ürün/kampanya duyurusu, turizm broşürü, menü." },
                { id: "4", title: "Tek Kırım Broşür", desc: "Basit indirim duyurusu, hızlı dağıtım." }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 relative group hover:bg-white hover:shadow-2xl transition-all">
                  <span className="text-6xl font-black text-primary/10 absolute top-4 right-6 group-hover:text-primary/20 transition-colors">{item.id}</span>
                  <h3 className="text-xl font-black text-black mb-4 relative z-10">{item.title}</h3>
                  <p className="text-gray-600 font-medium relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Özellikler & Fark */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="bg-black p-10 rounded-[40px] text-white shadow-2xl">
              <h2 className="text-2xl font-black mb-8 uppercase tracking-tight text-primary">Broşür Baskı Özellikleri (2026 Güncel)</h2>
              <ul className="space-y-6">
                {[
                  { label: "Ebat", value: "A4 (21x29,7 cm) ve A5 (14,8x21 cm) standart" },
                  { label: "Kağıt", value: "115 gr parlak veya mat kuşe (standart)" },
                  { label: "Kalın Kağıt", value: "135 gr, 170 gr, 200 gr veya 250 gr kuşe seçenekleri" },
                  { label: "Katlama", value: "Tek kırım, çift kırım, üç kırımlı broşür (6 panel)" },
                  { label: "Baskı", value: "Full renk CMYK (canlı ve dikkat çekici sonuçlar)" },
                  { label: "Tasarım", value: "Profesyonel grafik tasarım desteği" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 border-b border-white/10 pb-4 last:border-0">
                    <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                    <p className="text-lg font-bold">
                      <span className="text-gray-400">{item.label}:</span> {item.value}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-gray-50 p-10 rounded-[40px] border border-gray-100 shadow-inner">
              <h2 className="text-2xl font-black text-black mb-8 uppercase tracking-tight"><strong>Mavi Basım Matbaa & Reklam</strong> Farkı</h2>
              <ul className="space-y-6">
                {[
                  "Profesyonel sayfa düzeni ve görsel uyum",
                  "115 gr kuşe iç sayfa + 300 gr kuşe kapak seçeneği",
                  "Katlamalı seçenekler (tek, çift, üç kırımlı)",
                  "Yüksek hacimli üretim – stok kolaylığı",
                  "Aynı gün tasarım onayı – hızlı onay süreci",
                  "🎨 Tasarım ücreti: 250 TL (+KDV) – Hazır tasarım ücretsiz!"
                ].map((diff, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-lg font-bold text-black">
                    <div className="w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/40" />
                    {diff}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Tasarım Nasıl Yapılır? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-10 uppercase tracking-tight">Tasarım Nasıl Yapılır? (4 Adımda)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Hedef & Konsept", desc: "Sayfa sayısı, ebat, katlama türü ve hedef kitleyi belirleyin." },
                { step: "2", title: "İçerik ve Görsel Planlama", desc: "Kapak tasarımı, ürün görselleri, fiyat/kampanya vurgusu yerleşimi." },
                { step: "3", title: "Teknik Hazırlık", desc: "Dosya PDF, CMYK, 300 dpi. Her taraftan +3 mm taşma payı bırakın." },
                { step: "4", title: "Onay & Baskı", desc: "Tasarımınızı gönderin, aynı gün onay ile üretim başlar." }
              ].map((item, idx) => (
                <div key={idx} className="relative p-8 bg-white rounded-[32px] border border-gray-100 shadow-xl group hover:border-primary/30 transition-all">
                  <span className="absolute -top-5 -left-5 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-black text-black mb-4 mt-2">{item.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Broşürde Sık Yapılan 5 Hata */}
          <section className="bg-red-50 rounded-[50px] p-10 md:p-16 border border-red-100">
            <h2 className="text-2xl md:text-3xl font-black text-red-600 mb-10 uppercase tracking-tight text-center">Broşürde Sık Yapılan 5 Hata</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                { title: "Kalabalık Düzen", desc: "Okunabilirlik düşer, mesaj kaybolur." },
                { title: "Zayıf Kapak", desc: "İlk izlenim olumsuz olur, broşür açılmaz." },
                { title: "Yanlış Kağıt", desc: "Renk solması veya kağıtta yırtılma." },
                { title: "Renk Uyumu", desc: "Marka tutarsızlığı and amatör görünüm." },
                { title: "Katlama Hatası", desc: "Sayfa düzeni ve akış bozulur." }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <span className="text-2xl font-black text-red-600">!</span>
                  </div>
                  <h3 className="text-lg font-black text-red-700 mb-2">{item.title}</h3>
                  <p className="text-sm font-medium text-red-900/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Products */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-10 uppercase tracking-tight text-center">Kurumsal Kimliğinizi Güçlendirin!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Dergi", desc: "Yayınlarınızı profesyonelleştirin.", path: "/dergi" },
                { title: "Kartvizit", desc: "İlk izleniminizi güçlendirin.", path: "/kartvizit" },
                { title: "Cepli Dosya", desc: "Evraklarınızı prestijli hale getirin.", path: "/cepli-dosya" },
                { title: "Katalog", desc: "Ürünlerinizi en iyi şekilde tanıtın.", path: "/katalog" }
              ].map((product, idx) => (
                <Link key={idx} to={product.path} className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all">
                  <h3 className="text-xl font-black text-black mb-3 group-hover:text-primary transition-colors">{product.title}</h3>
                  <p className="text-gray-500 font-medium mb-4">{product.desc}</p>
                  <span className="text-primary font-black text-sm uppercase tracking-widest group-hover:translate-x-2 inline-block transition-transform">Fiyatları Gör →</span>
                </Link>
              ))}
            </div>
          </section>

          <AgencyDiscountCTA />
        </div>
      </div>
      <ProductSEOSection categoryKey="brosur" />
    </div>
  );
};
