import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ShoppingCart, Zap } from 'lucide-react';
import { useCart, ProductSEOSection, AgencyDiscountCTA, FireWarning, FeatureTooltip } from '../App';

export const KITAP_AYRACI_DATA = [
  {
    cat: "Kitap Ayracı",
    color: "bg-orange-600",
    subTitle: "350 gr. Kuşe - Çift Yön Renkli - Parlak Selefonlu - 1000 Adet",
    items: [
      { code: "KODCYP", price: "1.280 ₺", desc: "350 gr. Kuşe Çift Yön Renkli Parlak Selefonlu", ebat: "5,2x16 cm", miktar: "1000 Adet" },
      { code: "KODCYM", price: "1.280 ₺", desc: "350 gr. Kuşe Çift Yön Renkli Mat Selefonlu", ebat: "5,2x16 cm", miktar: "1000 Adet" },
      { code: "KODSEK", price: "2.140 ₺", desc: "700 gr. Sıvama Mat Selefon Kabartma Laklı", ebat: "5,2x16 cm", miktar: "1000 Adet" },
    ]
  }
];

export const YAG_KARTI_DATA = [
  {
    cat: "Yağ Kartı",
    color: "bg-blue-700",
    subTitle: "Özel Kesim - Selefonlu - İp Delikli - 1000 Adet",
    items: [
      { code: "Yag-cok-k", price: "1.760 ₺", desc: "350 gr. Kuşe Çift Yön Renkli Mat Selefonlu Kabartma Laklı Özel Kesim", ebat: "5,4x10,2 cm", miktar: "1000 Adet" },
      { code: "Yag-sek-k", price: "2.140 ₺", desc: "700 gr. Sıvama Mat Selefon Kabartma Laklı Özel Kesim", ebat: "5,4x10,2 cm", miktar: "1000 Adet" },
      { code: "Yag-cok-b", price: "2.640 ₺", desc: "350 gr. Kuşe Çift Yön Renkli Mat Selefonlu Kabartma Laklı Özel Kesim", ebat: "6,5x12,5 cm", miktar: "1000 Adet" },
      { code: "Yag-sek-b", price: "3.100 ₺", desc: "700 gr. Sıvama Mat Selefon Kabartma Laklı Özel Kesim", ebat: "6,5x12,5 cm", miktar: "1000 Adet" },
    ]
  }
];

const GenericProductPage = ({ title, subTitle, data, category }: { title: string, subTitle: string, data: any[], category: string }) => {
  const { openProductDetail } = useCart();

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>{title} | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content={`Profesyonel ${title.toLowerCase()} hizmetleri. ${subTitle} seçenekleri ile kaliteli ve hızlı üretim.`} />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">{title}</h1>
            <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
            <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">{subTitle}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-visible relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px]">
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th className="p-4 w-10"></th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EBAT</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">AÇIKLAMA</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {data[0].items.map((item: any, idx: number) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group">
                    {idx === 0 && (
                      <td 
                        rowSpan={data[0].items.length}
                        className={`${data[0].color} text-white font-black text-center p-1 w-10 border-r border-white/10`}
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        <span className="tracking-[0.1em] uppercase text-[10px]">{category.toUpperCase()}</span>
                      </td>
                    )}
                    <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors">{item.code}</td>
                    <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.ebat}</td>
                    <td className="p-3 text-center font-medium border-r border-gray-100 text-black">
                      {item.desc}
                      <FeatureTooltip code={item.code} />
                    </td>
                    <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.miktar}</td>
                    <td className="p-3 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 transition-colors">
                      {item.price}
                    </td>
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => openProductDetail(item, category)}
                        className="bg-primary hover:bg-secondary text-white p-2 rounded-lg transition-all shadow-lg shadow-primary/20 hover:scale-110"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <FireWarning />
        <AgencyDiscountCTA />
        <ProductSEOSection categoryKey={category.toLowerCase().replace(' ', '_')} />
      </div>
    </div>
  );
};

export const KitapAyraciPage = () => (
  <GenericProductPage 
    title="Kitap Ayracı Baskı" 
    subTitle="350 gr. Kuşe - Çift Yön Renkli - Parlak Selefonlu" 
    data={KITAP_AYRACI_DATA} 
    category="Kitap Ayracı" 
  />
);

export const YagKartiPage = () => (
  <GenericProductPage 
    title="Yağ Kartı Baskı" 
    subTitle="350 gr. Kuşe - Selefonlu - İp Delikli" 
    data={YAG_KARTI_DATA} 
    category="Yağ Kartı" 
  />
);
