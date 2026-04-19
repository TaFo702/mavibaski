import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, ChevronLeft, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart, ProductSEOSection } from '../App';

// --- Data ---
const SOZLESME_BASKI_DATA = [
  {
    id: "sozlesme-baski",
    title: "SÖZLEŞME BASKI",
    ebat: "20,5 x 28,5 cm (TAM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "15 CİLT", "20 CİLT", "25 CİLT", "30 CİLT", "35 CİLT", "40 CİLT", "50 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1550, 1900, 2500, 2750, 3200, 3500, 4050, 4400, 5050, 8300] },
      { label: "1 Asl+2 Su.", values: [1750, 2350, 3000, 3400, 4050, 4550, 5100, 5550, 6800, 11800] },
      { label: "1 Asl+3 Su.", values: [1900, 2600, 3400, 4050, 4700, 5400, 6550, 7000, 8300, 14800] },
      { label: "2. Renk Farkı", values: [650, 750, 900, 950, 1000, 1000, 1100, 1200, 1500, 2200] }
    ]
  }
];

const SIPARIS_FISI_DATA = [
  {
    id: "siparis-fisi",
    title: "SİPARİŞ FİŞİ",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "15 CİLT", "20 CİLT", "25 CİLT", "30 CİLT", "40 CİLT", "50 CİLT", "75 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1500, 1550, 1750, 1900, 2250, 2500, 2800, 3300, 4300, 5050] },
      { label: "1 Asl+2 Su.", values: [1550, 1750, 2050, 2350, 2750, 3000, 3400, 4050, 5300, 7050] },
      { label: "1 Asl+3 Su.", values: [1650, 1900, 2400, 2600, 3200, 3400, 4050, 4700, 7200, 9200] },
      { label: "2. Renk Farkı", values: [650, 650, 750, 750, 900, 900, 1000, 1100, 1300, 1700] }
    ]
  }
];

const PARA_MAKBUZU_DATA = [
  {
    id: "para-makbuzu",
    title: "PARA MAKBUZU",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "50 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1450, 1500, 1600, 1850, 2250] },
      { label: "1 Asl+2 Su.", values: [1500, 1600, 1700, 2100, 2750] },
      { label: "1 Asl+3 Su.", values: [1550, 1650, 1900, 2400, 3300] },
      { label: "2. Renk Farkı", values: [650, 650, 650, 700, 800] }
    ]
  }
];

const ADISYON_DATA = [
  {
    id: "adisyon",
    title: "ADİSYON BASKI (ADİSYON TABLOSU)",
    ebat: "14 x 20 cm",
    ozellik: "Tek Nüsha 70-80 Gr. 1. Hamur 100'lük Adisyon 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "40 CİLT", "50 CİLT", "75 CİLT", "100 CİLT", "200 CİLT", "250 CİLT", "300 CİLT", "500 CİLT", "1000 CİLT"],
    rows: [
      { label: "Fiyat", values: [1450, 1500, 1550, 2000, 2100, 2450, 2950, 4400, 5250, 5650, 9300, 16300] },
      { label: "Renk Farkı", values: [650, 650, 650, 700, 700, 950, 950, 1100, 1200, 1300, 2200, 2700] }
    ]
  }
];

const SIGORTA_POLICELERI_DATA = [
  {
    id: "sigorta-policeleri",
    title: "SİGORTA POLİÇELERİ",
    ebat: "20,5 x 28,5 cm (TAM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "15 CİLT", "20 CİLT", "25 CİLT", "30 CİLT", "35 CİLT", "40 CİLT", "50 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1550, 1900, 2500, 2750, 3200, 3500, 4050, 4400, 5050, 8300] },
      { label: "1 Asl+2 Su.", values: [1750, 2350, 3000, 3400, 4050, 4550, 5100, 5550, 6800, 11800] },
      { label: "2. Renk Farkı", values: [650, 750, 900, 950, 1000, 1000, 1100, 1200, 1500, 2200] }
    ]
  }
];

const TAHSILAT_MAKBUZU_DATA = [
  {
    id: "tahsilat-makbuzu",
    title: "TAHSİLAT MAKBUZU",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "50 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1450, 1500, 1600, 1850, 2250] },
      { label: "1 Asl+2 Su.", values: [1500, 1600, 1700, 2100, 2750] },
      { label: "2. Renk Farkı", values: [650, 650, 650, 700, 800] }
    ]
  }
];

const ARAC_KIRALAMA_DATA = [
  {
    id: "arac-kiralama",
    title: "ARAÇ KİRALAMA",
    ebat: "20,5 x 28,5 cm (TAM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "15 CİLT", "20 CİLT", "25 CİLT", "30 CİLT", "35 CİLT", "40 CİLT", "50 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1550, 1900, 2500, 2750, 3200, 3500, 4050, 4400, 5050, 8300] },
      { label: "1 Asl+2 Su.", values: [1750, 2350, 3000, 3400, 4050, 4550, 5100, 5550, 6800, 11800] },
      { label: "2. Renk Farkı", values: [650, 750, 900, 950, 1000, 1000, 1100, 1200, 1500, 2200] }
    ]
  }
];

const GIDER_MAKBUZU_DATA = [
  {
    id: "gider-makbuzu",
    title: "GİDER MAKBUZU",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "50 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1450, 1500, 1600, 1850, 2250] },
      { label: "1 Asl+2 Su.", values: [1500, 1600, 1700, 2100, 2750] },
      { label: "2. Renk Farkı", values: [650, 650, 650, 700, 800] }
    ]
  }
];

const GIRIS_BILETI_DATA = [
  {
    id: "giris-bileti",
    title: "GİRİŞ BİLETİ",
    ebat: "14 x 20 cm",
    ozellik: "Tek Nüsha 70-80 Gr. 1. Hamur 100'lük 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "40 CİLT", "50 CİLT", "75 CİLT", "100 CİLT"],
    rows: [
      { label: "Fiyat", values: [1450, 1500, 1550, 2000, 2100, 2450, 2950] },
      { label: "Renk Farkı", values: [650, 650, 650, 700, 700, 950, 950] }
    ]
  }
];

const RECETE_DATA = [
  {
    id: "recete",
    title: "REÇETE",
    ebat: "14 x 20 cm",
    ozellik: "Tek Nüsha 70-80 Gr. 1. Hamur 100'lük 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "40 CİLT", "50 CİLT", "75 CİLT", "100 CİLT"],
    rows: [
      { label: "Fiyat", values: [1450, 1500, 1550, 2000, 2100, 2450, 2950] },
      { label: "Renk Farkı", values: [650, 650, 650, 700, 700, 950, 950] }
    ]
  }
];

const SENET_DATA = [
  {
    id: "senet",
    title: "SENET",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "50 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1450, 1500, 1600, 1850, 2250] },
      { label: "1 Asl+2 Su.", values: [1500, 1600, 1700, 2100, 2750] },
      { label: "1 Asl+3 Su.", values: [1550, 1650, 1900, 2400, 3300] },
      { label: "2. Renk Farkı", values: [650, 650, 650, 700, 800] }
    ]
  }
];

const TEDIYE_MAKBUZU_DATA = [
  {
    id: "tediye-makbuzu",
    title: "TEDİYE MAKBUZU",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "50 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1450, 1500, 1600, 1850, 2250] },
      { label: "1 Asl+2 Su.", values: [1500, 1600, 1700, 2100, 2750] },
      { label: "2. Renk Farkı", values: [650, 650, 650, 700, 800] }
    ]
  }
];

const PERAKENDE_SATIS_FISI_DATA = [
  {
    id: "perakende-satis-fisi",
    title: "PERAKENDE SATIŞ FİŞİ (GAYRİRESMİ)",
    ebat: "10 X 14 cm. (KÜÇÜK BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "50 CİLT", "75 CİLT", "100 CİLT", "200 CİLT", "250 CİLT", "300 CİLT", "500 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1450, 1500, 1600, 2250, 2900, 3300, 5400, 6550, 7400, 10800] },
      { label: "1 Asl+2 Su.", values: [1500, 1600, 1700, 2750, 3000, 4050, 6800, 8300, 10300, 14800] },
      { label: "1 Asl+3 Su.", values: [1550, 1650, 1900, 3300, 4200, 4700, 8300, 11300, 12800, 18800] },
      { label: "2. Renk Farkı", values: [650, 650, 650, 800, 900, 1000, 1450, 1700, 1700, 2200] }
    ]
  }
];

export const MAKBUZ_FORMLAR_ALL_DATA = [
  ...PERAKENDE_SATIS_FISI_DATA,
  ...ADISYON_DATA,
  ...SIPARIS_FISI_DATA,
  ...PARA_MAKBUZU_DATA,
  ...GIDER_MAKBUZU_DATA,
  ...GIRIS_BILETI_DATA,
  ...RECETE_DATA,
  ...SENET_DATA,
  ...TEDIYE_MAKBUZU_DATA,
  ...SOZLESME_BASKI_DATA,
  ...SIGORTA_POLICELERI_DATA,
  ...TAHSILAT_MAKBUZU_DATA,
  ...ARAC_KIRALAMA_DATA,
];

export const CILT_ISLERI_DATA = [
  ...PERAKENDE_SATIS_FISI_DATA,
  ...ADISYON_DATA,
  ...PARA_MAKBUZU_DATA,
  ...SIPARIS_FISI_DATA,
  ...SOZLESME_BASKI_DATA
];

// --- Components ---

const SiparisFisiHorizontalTable = ({ data }: { data: any[] }) => {
  const { openProductDetail } = useCart();
  const section = data[0];
  if (!section) return null;

  const openWhatsApp = (title: string, label: string, ebat: string, header: string, price: number, headers: string[], values: number[], colorDiffRow: any) => {
    openProductDetail({
      code: title,
      desc: `${label} - ${ebat}`,
      price: price.toString(),
      miktar: header,
      availableOptions: headers.map((h, i) => ({ miktar: h, price: values[i] })),
      colorDiffValues: colorDiffRow ? colorDiffRow.values : null
    }, title);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-12">
      <div className="bg-secondary p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            {section.title.includes("ADİSYON") ? "ADİSYON" : section.title.includes("SÖZLEŞME") ? "SÖZLEŞME" : section.title}
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
            <span className="text-white/40 text-xl font-light hidden md:block">|</span>
            <p className="text-sm md:text-base font-bold text-white/90">
              Ölçü: {section.ebat} ({section.ozellik.split(' - ')[0]})
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <span className="text-white text-lg font-medium uppercase tracking-widest">
            Numaratörlü
          </span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-4 border-r border-white/10 font-black text-left uppercase text-sm md:text-base whitespace-nowrap min-w-[140px]">
                {section.title.includes("ADİSYON") ? "ADET" : section.title.includes("SÖZLEŞME") ? "TAM BOY" : section.ebat.includes("KÜÇÜK BOY") ? "KÜÇÜK BOY" : "YARIM BOY"}
              </th>
              {section.headers.map((header: string, idx: number) => (
                <th key={idx} className="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">
                  {header}
                </th>
              ))}
              <th className="p-4 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">SİPARİŞ</th>
            </tr>
          </thead>
          <tbody>
            {section.rows.filter((row: any) => !row.label.includes('Renk Farkı')).map((row: any, rIdx: number) => (
              <tr key={rIdx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                <td className="p-4 border-r border-gray-200 font-black text-black bg-gray-50/50 text-sm md:text-base">
                  {row.label}
                </td>
                {row.values.map((val: number, vIdx: number) => (
                  <td key={vIdx} className="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm group-hover:bg-primary/5 transition-colors">
                    {val.toLocaleString('tr-TR')}
                  </td>
                ))}
                <td className="p-4 text-center">
                  <button 
                    onClick={() => openWhatsApp(section.title, row.label, section.ebat, section.headers[0], row.values[0], section.headers, row.values, section.rows.find((r: any) => r.label.includes('Renk Farkı')))}
                    className="bg-primary hover:bg-secondary text-white p-2 rounded-lg transition-all shadow-lg shadow-primary/20"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {/* Show Renk Farkı as an info row at the bottom */}
            {section.rows.filter((row: any) => row.label.includes('Renk Farkı')).map((row: any, rIdx: number) => (
              <tr key={`info-${rIdx}`} className="bg-gray-50/80 border-b border-gray-100">
                <td className="p-4 border-r border-gray-200 font-black text-black text-sm md:text-base">
                  {row.label} (İlave Her Renk İçin)
                </td>
                {row.values.map((val: number, vIdx: number) => (
                  <td key={vIdx} className="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">
                    +{val.toLocaleString('tr-TR')} ₺
                  </td>
                ))}
                <td className="p-4 bg-gray-100/30"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SmartCiltFinder = ({ data, isModalMode = false }: { data: any[], isModalMode?: boolean }) => {
  const allEbatOptions = Array.from(new Set([
    ...data.map(d => d.ebat)
  ]));
  
  // Sort by area (approximate)
  const getArea = (s: string) => {
    const matches = s.match(/(\d+[,.]?\d*)\s*x\s*(\d+[,.]?\d*)/);
    if (!matches) return 0;
    const w = parseFloat(matches[1].replace(',', '.'));
    const h = parseFloat(matches[2].replace(',', '.'));
    return w * h;
  };
  
  const ebatOptions = allEbatOptions.sort((a, b) => getArea(a) - getArea(b));
  const [selectedEbat, setSelectedEbat] = useState(ebatOptions[0]);
  
  const effectiveEbat = selectedEbat;

  const filteredByEbat = data.filter(d => d.ebat === effectiveEbat);
  const nushaOptions = Array.from(new Set(filteredByEbat.flatMap(d => d.rows.filter((r: any) => !r.label.includes('Renk Farkı')).map((r: any) => r.label))));
  
  const [selectedNusha, setSelectedNusha] = useState(nushaOptions[0]);
  const [selectedAdetIdx, setSelectedAdetIdx] = useState(0);
  const [colorCount, setColorCount] = useState(1);

  // Sync nusha when ebat changes
  useEffect(() => {
    const newNushaOptions = Array.from(new Set(data.filter(d => d.ebat === effectiveEbat).flatMap(d => d.rows.filter((r: any) => !r.label.includes('Renk Farkı')).map((r: any) => r.label))));
    if (!newNushaOptions.includes(selectedNusha)) {
      setSelectedNusha(newNushaOptions[0]);
    }
  }, [selectedEbat, data, effectiveEbat]);

  const { openProductDetail } = useCart();

  const selectedProduct = filteredByEbat.find(d => d.rows.some((r: any) => r.label === selectedNusha)) || filteredByEbat[0];
  const adetOptions = selectedProduct.headers;
  const colorDiffRow = selectedProduct.rows.find((r: any) => r.label.includes('Renk Farkı'));

  const basePrice = selectedProduct.rows.find((r: any) => r.label === selectedNusha)?.values[selectedAdetIdx] || 0;
  const colorDiff = colorCount > 1 && colorDiffRow ? colorDiffRow.values[selectedAdetIdx] * (colorCount - 1) : 0;
  
  let totalPrice = basePrice + colorDiff;

  const handleOrder = () => {
    openProductDetail({
      code: selectedProduct.title,
      desc: `${selectedNusha} - ${effectiveEbat}`,
      price: totalPrice.toString(),
      miktar: adetOptions[selectedAdetIdx],
      availableOptions: adetOptions.map((h: string, i: number) => ({ 
        miktar: h, 
        price: (selectedProduct.rows.find((r: any) => r.label === selectedNusha)?.values[i] || 0)
      })),
      colorDiffValues: colorDiffRow ? colorDiffRow.values : null
    }, selectedProduct.title);
  };

  return (
    <div className={`${isModalMode ? 'bg-transparent border-0 shadow-none p-0' : 'bg-blue-50 rounded-2xl shadow-lg border border-primary/30 p-4 mb-8'} overflow-hidden relative w-full`}>
      {!isModalMode && (
        <div className="absolute top-0 right-0">
          <div className="bg-secondary/10 text-secondary text-[9px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            5 Ciltte Bir Ayraç Dahildir
          </div>
        </div>
      )}

      <div className={`flex flex-col ${isModalMode ? 'gap-8' : 'md:flex-row items-center gap-6 mt-2 md:mt-0'}`}>
        {!isModalMode && (
          <div className="flex items-center gap-3 shrink-0 md:border-r md:border-gray-100 md:pr-6">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-secondary/20">
              <Zap size={24} />
            </div>
            <div>
              <h2 className="text-sm font-black text-black uppercase tracking-tight">Akıllı Fiyat Hesaplayıcı</h2>
              <p className="text-[10px] text-black font-medium">İstediğiniz özellikleri seçin, fiyatı görün.</p>
            </div>
          </div>
        )}

        <div className={`flex-grow w-full grid grid-cols-1 ${isModalMode ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-4`}>
          <div className="space-y-1">
            <label className="text-[12px] font-black text-black uppercase ml-1">Ebat Seçimi</label>
            <div className="flex flex-col gap-1">
              {ebatOptions.map((opt: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedEbat(opt)}
                  className={`px-2 py-2 rounded-lg border text-[11px] font-black transition-all w-full text-left ${
                    selectedEbat === opt 
                    ? 'bg-secondary text-white border-secondary shadow-md' 
                    : 'bg-white text-black border-gray-200 hover:border-secondary/30'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[12px] font-black text-black uppercase ml-1">Nüsha Sayısı</label>
            <div className="flex flex-col gap-1">
              {nushaOptions.map((opt: any, idx: number) => {
                const optBasePrice = selectedProduct.rows.find((r: any) => r.label === opt)?.values[selectedAdetIdx] || 0;
                const optColorDiff = colorCount > 1 && colorDiffRow ? colorDiffRow.values[selectedAdetIdx] * (colorCount - 1) : 0;
                let optTotalPrice = optBasePrice + optColorDiff;

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedNusha(opt)}
                    className={`px-2 py-2 rounded-lg border text-[11px] font-black transition-all w-full text-left ${
                      selectedNusha === opt 
                      ? 'bg-secondary text-white border-secondary shadow-md' 
                      : 'bg-white text-black border-gray-200 hover:border-secondary/30'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span>{opt}</span>
                      <span className={`text-[9px] font-bold ${selectedNusha === opt ? 'text-white/80' : 'text-primary'}`}>
                        {optTotalPrice} ₺
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[12px] font-black text-black uppercase ml-1">Adet (Cilt)</label>
            <div className="grid grid-cols-2 gap-1">
              {adetOptions.map((opt: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAdetIdx(idx)}
                  className={`px-2 py-2 rounded-lg border text-[11px] font-black transition-all w-full ${
                    selectedAdetIdx === idx 
                    ? 'bg-secondary text-white border-secondary shadow-md' 
                    : 'bg-white text-black border-gray-200 hover:border-secondary/30'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between ml-1">
              <label className="text-[12px] font-black text-black uppercase">Renk Seçimi</label>
            </div>
            <div className="flex flex-col gap-1">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setColorCount(num)}
                  className={`px-3 py-2 rounded-lg border text-[11px] font-black transition-all w-full ${
                    colorCount === num 
                    ? 'bg-secondary text-white border-secondary shadow-md' 
                    : 'bg-white text-black border-gray-200 hover:border-secondary/30'
                  }`}
                >
                  {num} RENK
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`shrink-0 flex flex-col gap-2 ${isModalMode ? 'mt-4' : ''}`}>
          <div className="text-right">
            <span className="text-primary text-lg font-medium uppercase tracking-widest">
              Numaratörlü
            </span>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-4 border border-gray-100 min-w-[140px]">
            <span className="text-[10px] font-bold text-black uppercase">Toplam Fiyat</span>
            <div className="text-2xl font-black text-primary my-1">
              {totalPrice} ₺
            </div>
            <button 
              onClick={handleOrder}
              className="w-full mt-2 bg-primary hover:bg-secondary text-white py-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
            >
              <ShoppingCart size={16} />
              SİPARİŞ VER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SiparisFisiCalculatorModal = ({ isOpen, onClose, data }: { isOpen: boolean, onClose: () => void, data: any[] }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl border border-white/20"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-gray-100 hover:bg-red-500 hover:text-white rounded-2xl transition-all z-10 group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform" />
        </button>
        
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tighter leading-none mb-3 flex items-center gap-3">
                <span>{data[0]?.title.includes("ADİSYON") ? "ADİSYON" : data[0]?.title.includes("SÖZLEŞME") ? "SÖZLEŞME" : data[0]?.title.includes("PARA MAKBUZU") ? "MAKBUZ" : "SİPARİŞ FİŞİ"}</span>
                <span className="text-gray-300 font-light">|</span>
                <span className="text-primary font-medium">{data[0]?.ebat}</span>
              </h2>
              <p className="text-sm text-black font-medium">Özellikleri seçin, anında fiyat alın ve sipariş verin.</p>
            </div>
          </div>
          
          <div className="bg-gray-50/50 rounded-[2rem] p-6 md:p-8 border border-gray-100">
            <SmartCiltFinder data={data} isModalMode={true} />
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

export const MakbuzFormlarPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const pathId = location.pathname.replace('/', '');

  const getCategoryKey = (pathId: string) => {
    const mapping: Record<string, string> = {
      'adisyon': 'adisyon',
      'siparis-fisi': 'siparis_fisi',
      'para-makbuzu': 'para_makbuzu',
      'sozlesme-baski': 'sozlesme',
      'sigorta-policeleri': 'sigorta_policeleri',
      'tahsilat-makbuzu': 'tahsilat_makbuzu',
      'arac-kiralama': 'arac_kiralama',
      'gider-makbuzu': 'gider_makbuzu',
      'giris-bileti': 'giris_bileti',
      'recete': 'recete',
      'senet': 'senet',
      'tediye-makbuzu': 'tediye_makbuzu',
      'perakende-satis-fisi': 'perakende_satis_fisi',
    };
    return mapping[pathId] || 'makbuz_fisler';
  };

  const filteredData = pathId && pathId !== 'makbuz-ve-formlar'
    ? MAKBUZ_FORMLAR_ALL_DATA.filter(item => item.id === pathId)
    : MAKBUZ_FORMLAR_ALL_DATA;

  const pageTitle = pathId && pathId !== 'makbuz-ve-formlar'
    ? filteredData[0]?.title || "MAKBUZ & FİŞLER"
    : "MAKBUZ & FİŞLER";

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>{pageTitle} | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Profesyonel makbuz, fiş ve form baskı hizmetleri. Tahsilat makbuzu, adisyon, sipariş fişi, sözleşme ve reçete baskısı. Numaratörlü ve otocopy kağıt seçenekleri." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-black text-primary uppercase tracking-tighter mb-4">
            {pageTitle}
          </h1>
          <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
        </div>

        <div className="space-y-12">
          {filteredData.map((item, idx) => (
            <div key={idx} id={item.id} className="scroll-mt-24 group">
              <div className="flex justify-between items-center mb-6 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-secondary rounded-full" />
                  <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                    {item.title} - {item.ebat} Fiyat Listesi
                  </h2>
                </div>
              </div>
              <SiparisFisiHorizontalTable data={[item]} />
            </div>
          ))}
        </div>
      </div>
      <div className="text-black">
        <ProductSEOSection categoryKey={getCategoryKey(pathId)} />
      </div>
    </div>
  );
};

export const GenericPriceTablePage = ({ data }: { data: any[] }) => {
  const { openProductDetail } = useCart();
  const navigate = useNavigate();
  const isSiparisFisi = data[0]?.title === "SİPARİŞ FİŞİ";
  const isAdisyon = data[0]?.title.includes("ADİSYON");
  const isSozlesme = data[0]?.title.includes("SÖZLEŞME");
  const isParaMakbuzu = data[0]?.title.includes("PARA MAKBUZU");
  const isSpecialPage = isSiparisFisi || isAdisyon || isSozlesme || isParaMakbuzu;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  const openWhatsApp = (section: any, row: any, ebat: string, header: string, price: number) => {
    const colorDiffRow = section.rows.find((r: any) => r.label.includes('Renk Farkı'));
    openProductDetail({
      code: section.title,
      desc: `${row.label} - ${ebat}`,
      price: price.toString(),
      miktar: header,
      availableOptions: section.headers.map((h: string, i: number) => ({ miktar: h, price: row.values[i] })),
      colorDiffValues: colorDiffRow ? colorDiffRow.values : null
    }, section.title);
  };
  const groupedByEbat = data.reduce((acc: any, item: any) => {
    const key = item.ebat;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>{data.length === 1 ? data[0].title : "Cilt İşleri"} | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Kurumsal cilt işleri ve form baskı hizmetleri. Otocopy kağıt, numaratörlü baskı ve farklı ebatlarda makbuz, fiş, sözleşme çözümleri." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap shrink-0">
            <button 
              onClick={() => navigate(-1)}
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
            >
              <ChevronLeft size={20} className="text-secondary" />
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-secondary whitespace-nowrap">
                {data.length === 1 ? (data[0].title.includes("ADİSYON") ? "ADİSYON" : data[0].title.includes("SÖZLEŞME") ? "SÖZLEŞME" : data[0].title.includes("PARA MAKBUZU") ? "PARA MAKBUZU" : data[0].title) : "Cilt İşleri"}
              </h1>
              <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
              <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">
                {data.length === 1 ? `${data[0].ebat} Cilt İşleri` : "Fiyat Listesi"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-16">
          {isSpecialPage ? (
            <SiparisFisiHorizontalTable data={data} />
          ) : (
            Object.entries(groupedByEbat).map(([ebat, sections]: [string, any], gIdx) => (
              <div key={gIdx}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-secondary rounded-full" />
                    <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">{ebat} Cilt İşleri</h2>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-[11px] md:text-[13px]">
                      <thead>
                        <tr className="bg-black text-white border-b border-black">
                          <th className="p-4 w-10"></th>
                          <th className="p-4 text-left font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                          <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 text-center">ADET</th>
                          <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 text-center">FİYAT</th>
                          <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sections.map((section: any, sIdx: number) => (
                          <React.Fragment key={sIdx}>
                            {section.rows.filter((row: any) => !row.label.includes('Renk Farkı')).map((row: any, rIdx: number) => (
                              <React.Fragment key={rIdx}>
                                {section.headers.map((header: string, hIdx: number) => (
                                  <tr key={hIdx} className="border-b border-gray-100 hover:bg-secondary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all group">
                                    {rIdx === 0 && hIdx === 0 && (
                                      <td 
                                        rowSpan={section.rows.filter((r: any) => !r.label.includes('Renk Farkı')).length * section.headers.length + (section.rows.filter((r: any) => !r.label.includes('Renk Farkı')).length - 1)}
                                        className="bg-secondary text-white font-black text-center p-1 w-10 border-r border-white/10"
                                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                                      >
                                        <span className="tracking-[0.1em] uppercase text-[10px]">{section.title}</span>
                                      </td>
                                    )}
                                    <td className="p-4 font-medium text-black border-r border-gray-100">
                                      <div className="flex flex-col">
                                        <span className="transition-all font-black tracking-tight text-black">
                                          {row.label}
                                        </span>
                                        <span className="text-[9px] text-gray-400 font-bold uppercase">{section.ozellik}</span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-center font-bold text-black border-r border-gray-100">
                                      {header}
                                    </td>
                                    <td className="p-4 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-secondary/5 transition-colors">
                                      {row.values[hIdx].toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} TL
                                    </td>
                                    <td className="p-4 text-center">
                                      <button 
                                        onClick={() => openWhatsApp(section, row, ebat, header, row.values[hIdx])}
                                        className="bg-secondary hover:bg-black text-white p-2 rounded-lg transition-all shadow-lg shadow-secondary/20 hover:scale-110"
                                      >
                                        <ShoppingCart size={18} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                                {rIdx < section.rows.filter((r: any) => !r.label.includes('Renk Farkı')).length - 1 && (
                                  <tr className="bg-gray-100/50 h-3 border-b border-gray-200">
                                    <td colSpan={4} className="p-0"></td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))}
                            {/* Show Renk Farkı info row */}
                            {section.rows.filter((row: any) => row.label.includes('Renk Farkı')).map((row: any, rIdx: number) => (
                              <tr key={`info-${rIdx}`} className="bg-gray-50/80 border-b border-gray-100 text-black">
                                <td className="p-1 w-10 border-r border-white/10 bg-gray-200"></td>
                                <td className="p-4 font-black border-r border-gray-100">
                                  {row.label} (İlave Her Renk İçin)
                                </td>
                                <td className="p-4 text-center font-bold border-r border-gray-100">TÜM ADETLER</td>
                                <td className="p-4 text-center font-black border-r border-gray-100">
                                  +{row.values[0]} ₺'den Başlayan
                                </td>
                                <td className="p-4 bg-gray-100/30"></td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
