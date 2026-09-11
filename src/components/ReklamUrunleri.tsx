import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart, ProductSEOSection, AgencyDiscountCTA, FireWarning, FeatureTooltip } from '../App';

export interface ReklamItem {
  code: string;
  price: string;
  desc: string;
  ebat: string;
  miktar: string;
}

export interface ReklamCategoryData {
  cat: string;
  color: string;
  subTitle: string;
  items: ReklamItem[];
}

import { KITAP_AYRACI_DATA, YAG_KARTI_DATA } from '../data/extraProductData';
export { KITAP_AYRACI_DATA, YAG_KARTI_DATA };

const KITAP_AYRACI_GALLERY = [
  {
    src: "/images/kitap-ayraci/kitap-ayraci-baski.webp",
    alt: "Kitap ayracı baskısı, 350 gr kuşe parlak selefonlu",
    title: "Kitap Ayracı Baskısı",
    desc: "350 gr kuşe kağıt üzerine yüksek çözünürlüklü ofset baskı ve koruyucu parlak selefon kaplama."
  },
  {
    src: "/images/kitap-ayraci/kitap-ayraci-ornegi.webp",
    alt: "Püsküllü ve özel tasarımlı kitap ayracı örneği",
    title: "Püsküllü Kitap Ayracı",
    desc: "Üst kısmında delik ve şık püskül detayı bulunan özel promosyon kitap ayracı modelleri."
  },
  {
    src: "/images/kitap-ayraci/kitap-ayraci-tasarimi.webp",
    alt: "Kurumsal ve yayınevi kitap ayracı tasarımı",
    title: "Özel Tasarım Kitap Ayracı",
    desc: "Yayınevleri, yazarlar ve markalar için çift yön renkli kurumsal tasarım uygulaması."
  },
  {
    src: "/images/kitap-ayraci/ozel-kesim-kitap-ayraci.webp",
    alt: "Özel bıçak kesimli formlu kitap ayracı",
    title: "Özel Kesim Kitap Ayracı",
    desc: "Farklı geometrik formlarda ve özel bıçak kesimli dikkat çekici ayrac modelleri."
  },
  {
    src: "/images/kitap-ayraci/promosyon-kitap-ayraci.webp",
    alt: "Promosyon kitap ayracı imalatı ve toptan fiyatlar",
    title: "Promosyon Kitap Ayracı",
    desc: "Fuarlar, etkinlikler ve kurumsal tanıtımlar için ekonomik ve etkili promosyon ürünü."
  }
];

const GenericProductPage = ({ subTitle, data, category }: { title?: string, subTitle: string, data: ReklamCategoryData[], category: string }) => {
  const { openProductDetail } = useCart();
  const isKitap = category === "Kitap Ayracı";
  const seoTitle = isKitap ? "Kitap Ayracı Baskı Fiyatları | 350 gr Kuşe - Mavi Basım" : "Yağ Değişim Kartı Baskı Fiyatları | 350 gr Kuşe - Mavi Basım";
  const seoDesc = isKitap
    ? "Özel tasarımlı 350 gr kuşe mat selefonlu püsküllü kitap ayracı baskısı. Topkapı fabrikasından en ucuz promosyon kitap ayracı fiyatları ile hemen sipariş verin."
    : "Oto servisleri ve yıkamalar için 350 gr mat selefonlu oto yağ değişim takip kartı baskısı. Topkapı matbaasından kapınıza hızlı kargo imkanıyla.";

  const displayH1 = isKitap ? "Promosyon Kitap Ayracı Tasarımı ve Baskısı" : "Oto Servis Logolu Yağ Değişim Kartı Baskısı";

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">{displayH1}</h1>
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
                {data[0].items.map((item: ReklamItem, idx: number) => (
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
          <div className="bg-slate-50 px-5 py-3 border-t border-gray-150 flex flex-col sm:flex-row justify-center items-center text-xs text-slate-500 font-medium font-sans">
            <span>* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</span>
          </div>
        </div>

        <div className="mt-4">
          <FireWarning />
        </div>

        {isKitap && (
          <div className="my-12">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-black">
                Kitap Ayracı Modelleri ve Görsel Örnekler
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                Yayınevleri, yazarlar ve kurumsal tanıtımlar için hazırlanan <strong>kitap ayracı baskı</strong> örnekleri.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {KITAP_AYRACI_GALLERY.map((img, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden border-b border-gray-100">
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      title={img.title}
                      loading="lazy" 
                      decoding="async" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-black mb-1">
                        {img.title}
                      </h3>
                      <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2">
                        {img.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
