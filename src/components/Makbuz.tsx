Warning: truncated output (original token count: 76637)
Total output lines: 4067

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, ChevronLeft, X, Zap, ChevronDown, ShieldCheck, Truck, Paintbrush, Hash, HeartHandshake, Timer, Phone, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart, FireWarning } from '../App';
import { 
  MAKBUZ_DETAILS,
  SOZLESME_BASKI_DATA,
  SIPARIS_FISI_DATA,
  PARA_MAKBUZU_DATA,
  ADISYON_DATA,
  SIGORTA_POLICELERI_DATA,
  TAHSILAT_MAKBUZU_DATA,
  ARAC_KIRALAMA_DATA,
  GIDER_MAKBUZU_DATA,
  GIRIS_BILETI_DATA,
  RECETE_DATA,
  TEDIYE_MAKBUZU_DATA,
  PERAKENDE_SATIS_FISI_DATA,
  MAKBUZ_FORMLAR_ALL_DATA,
  CILT_ISLERI_DATA
} from '../data/makbuzData';
import { WHATSAPP_LINK } from '../constants/contact';
import { RelatedBlogPosts } from './RelatedBlogPosts';
import { DeliveryBadge } from './DeliveryBadge';

// --- Components ---

const PRODUCT_DETAIL_LINKS: Record<string, { to: string; label: string }> = {
  'adisyon': { to: '/adisyon', label: 'Adisyon baskı ayrıntılarını inceleyin.' },
  'siparis-fisi': { to: '/siparis-fisi', label: 'Sipariş fişi baskı ayrıntılarını inceleyin.' },
  'para-makbuzu': { to: '/para-makbuzu', label: 'Para makbuzu baskı ayrıntılarını inceleyin.' },
  'gider-makbuzu': { to: '/gider-makbuzu', label: 'Gider makbuzu baskı ayrıntılarını inceleyin.' },
  'giris-bileti': { to: '/giris-bileti', label: 'Giriş bileti baskı ayrıntılarını inceleyin.' },
  'recete': { to: '/recete', label: 'Reçete baskı ayrıntılarını inceleyin.' },
  'tediye-makbuzu': { to: '/tediye-makbuzu', label: 'Tediye makbuzu baskı ayrıntılarını inceleyin.' },
  'sozlesme-baski': { to: '/sozlesme-baski', label: 'Sözleşme baskı ayrıntılarını inceleyin.' },
  'sigorta-policeleri': { to: '/sigorta-policeleri', label: 'Sigorta poliçesi baskı ayrıntılarını inceleyin.' },
  'tahsilat-makbuzu': { to: '/tahsilat-makbuzu', label: 'Tahsilat makbuzu baskı ayrıntılarını inceleyin.' },
  'arac-kiralama': { to: '/arac-kiralama', label: 'Araç kiralama formu baskı ayrıntılarını inceleyin.' },
};

const SiparisFisiHorizontalTable = ({ data, showDetailLink = false }: { data: any[], showDetailLink?: boolean }) => {
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
          {section.id === 'recete' && (
            <caption className="sr-only">Reçete 10 x 14 cm Fiyat Listesi</caption>
          )}
          {section.id === 'tediye-makbuzu' && (
            <caption className="sr-only">Tediye Makbuzu 14 x 20 cm Yarım Boy Fiyat Listesi</caption>
          )}
          {section.id === 'tahsilat-makbuzu' && (
            <caption className="sr-only">Tahsilat Makbuzu 14 x 20 cm Fiyat Listesi</caption>
          )}
          {section.id === 'para-makbuzu' && (
            <caption className="sr-only">Para Makbuzu 14 x 20 cm Yarım Boy Fiyat Listesi</caption>
          )}
          <thead>
            <tr className="bg-black text-white">
              <th scope="col" className="p-4 border-r border-white/10 font-black text-left uppercase text-sm md:text-base whitespace-nowrap min-w-[140px]">
                {section.title.includes("ADİSYON") ? "ADET" : (section.ebat.includes("TAM BOY") || section.title.includes("SÖZLEŞME") || section.id === "arac-kiralama") ? "TAM BOY" : section.ebat.includes("KÜÇÜK BOY") ? "KÜÇÜK BOY" : "YARIM BOY"}
              </th>
              {section.headers.map((header: string, idx: number) => (
                <th scope="col" key={idx} className="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">
                  {header}
                </th>
              ))}
              <th scope="col" className="p-4 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">SİPARİŞ</th>
            </tr>
          </thead>
          <tbody>
            {section.rows.filter((row: any) => !row.label.includes('Renk Farkı')).map((row: any, rIdx: number) => (
              <tr key={rIdx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                <th scope="row" className="p-4 border-r border-gray-200 font-black text-black bg-gray-50/50 text-sm md:text-base text-left font-normal md:font-bold">
                  {row.label
                    .replace('1 Asl+1 Su.', '1 Asıl + 1 Suret')
                    .replace('1 Asl+2 Su.', '1 Asıl + 2 Suret')
                    .replace('1 Asl+3 Su.', '1 Asıl + 3 Suret')
                    .replace('1 Asl + 1 Su.', '1 Asıl + 1 Suret')
                    .replace('1 Asl + 2 Su.', '1 Asıl + 2 Suret')
                  }
                </th>
                {row.values.map((val: number, vIdx: number) => {
                  return (
                    <td key={vIdx} className="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm group-hover:bg-primary/5 transition-colors">
                      <div>{val.toLocaleString('tr-TR')} ₺</div>
                    </td>
                  );
                })}
                <td className="p-4 text-center">
                  <button 
                    onClick={() => openWhatsApp(section.title, row.label, section.ebat, section.headers[0], row.values[0], section.headers, row.values, section.rows.find((r: any) => r.label.includes('Renk Farkı')))}
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                  >
                    <ShoppingCart size={14} className="shrink-0" />
                    <span>Hemen Sipariş Ver</span>
                  </button>
                </td>
              </tr>
            ))}
            {/* Show Renk Farkı as an info row at the bottom */}
            {section.rows.filter((row: any) => row.label.includes('Renk Farkı')).map((row: any, rIdx: number) => (
              <tr key={`info-${rIdx}`} className="bg-gray-50/80 border-b border-gray-100">
                <th scope="row" className="p-4 border-r border-gray-200 font-black text-black text-sm md:text-base py-3 leading-normal text-left font-normal md:font-bold">
                  <div className="flex flex-col">
                    <span>{row.label}</span>
                    <span className="text-xs text-slate-500 font-medium normal-case mt-0.5">(İlave Her Renk İçin)</span>
                  </div>
                </th>
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
      <div className="bg-slate-50 px-5 py-3 border-t border-gray-150 flex flex-col sm:flex-row justify-center items-center text-xs text-slate-500 font-medium font-sans">
        <span>* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</span>
      </div>
      <div className="mt-4">
        <FireWarning />
      </div>
      {showDetailLink && PRODUCT_DETAIL_LINKS[section.id] && (
        <div className="p-4 pt-1 pb-4 text-center">
          <Link
            to={PRODUCT_DETAIL_LINKS[section.id].to}
            className="text-sm font-medium text-slate-800 hover:text-primary underline transition-colors"
          >
            {PRODUCT_DETAIL_LINKS[section.id].label}
          </Link>
        </div>
      )}
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

  const newNushaOptions = Array.from(new Set(data.filter(d => d.ebat === effectiveEbat).flatMap(d => d.rows.filter((r: any) => !r.label.includes('Renk Farkı')).map((r: any) => r.label))));
  const effectiveNusha = newNushaOptions.includes(selectedNusha) ? selectedNusha : (newNushaOptions[0] || selectedNusha);

  const { openProductDetail } = useCart();

  const selectedProduct = filteredByEbat.find(d => d.rows.some((r: any) => r.label === effectiveNusha)) || filteredByEbat[0];
  const adetOptions = selectedProduct.headers;
  const colorDiffRow = selectedProduct.rows.find((r: any) => r.label.includes('Renk Farkı'));

  const basePrice = selectedProduct.rows.find((r: any) => r.label === effectiveNusha)?.values[selectedAdetIdx] || 0;
  const colorDiff = colorCount > 1 && colorDiffRow ? colorDiffRow.values[selectedAdetIdx] * (colorCount - 1) : 0;
  
  const totalPrice = basePrice + colorDiff;

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
                const optTotalPrice = optBasePrice + optColorDiff;

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

const DynamicImageContainer = ({ 
  src, 
  alt, 
  title, 
  isTallLayoutDefault = false,
  className = "",
  imgClassName = "",
  isPriority = false
}: { 
  src: string; 
  alt: string; 
  title?: string; 
  isTallLayoutDefault?: boolean;
  className?: string;
  imgClassName?: string;
  isPriority?: boolean;
}) => {
  const [aspect, setAspect] = useState<'tall' | 'wide' | null>(null);

  return (
    <div className={`overflow-hidden rounded-xl bg-white mb-4 flex items-center justify-center p-1.5 w-fit mx-auto transition-all duration-300 ${
      aspect === 'tall' 
        ? 'h-[360px] md:h-[400px]' 
        : aspect === 'wide' 
          ? 'h-[230px] md:h-[270px]' 
          : isTallLayoutDefault 
            ? 'h-[360px] md:h-[400px]' 
            : 'h-[230px] md:h-[270px]'
    } ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        title={title}
        loading={isPriority ? "eager" : "lazy"}
        fetchPriority={isPriority ? "high" : "auto"}
        decoding="async"
        width={1200}
        height={800}
        referrerPolicy="no-referrer"
        onLoad={(e) => {
          const img = e.currentTarget;
          if (img.naturalHeight > img.naturalWidth) {
            setAspect('tall');
          } else {
            setAspect('wide');
          }
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/images/adisyon/otokopili-adisyon-baski.webp";
        }}
        className={`h-full w-auto object-contain rounded-lg transition-all duration-300 ${imgClassName}`} 
      />
    </div>
  );
};

const MAKBUZ_QUICK_LINKS = [
  { id: 'perakende-satis-fisi', label: 'Perakende Satış Fişi' },
  { id: 'adisyon', label: 'Adisyon' },
  { id: 'siparis-fisi', label: 'Sipariş Fişi' },
  { id: 'para-makbuzu', label: 'Para Makbuzu' },
  { id: 'gider-makbuzu', label: 'Gider Makbuzu' },
  { id: 'giris-bileti', label: 'Giriş Bileti' },
  { id: 'recete', label: 'Reçete' },
  { id: 'tediye-makbuzu', label: 'Tediye Makbuzu' },
  { id: 'sozlesme-baski', label: 'Sözleşme' },
  { id: 'sigorta-policeleri', label: 'Sigorta Poliçeleri' },
  { id: 'tahsilat-makbuzu', label: 'Tahsilat Makbuzu' },
  { id: 'arac-kiralama', label: 'Araç Kiralama' }
];

export const MakbuzFormlarPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const rawPath = location.pathname.replace('/', '');
  const pathId = rawPath === 'siparis-fisi-baski-fiyatlari' ? 'siparis-fisi' : rawPath;
  const isTallLayout = pathId === 'arac-kiralama' || 
                       pathId === 'sigorta-policeleri' || 
                       pathId === 'recete' || 
                       pathId === 'sozlesme-baski' ||
                       pathId === 'adisyon' ||
                       pathId === 'siparis-fisi' ||
                       pathId === 'perakende-satis-fisi';

  const filteredData = pathId && pathId !== 'makbuz-ve-formlar'
    ? MAKBUZ_FORMLAR_ALL_DATA.filter(item => item.id === pathId)
    : MAKBUZ_FORMLAR_ALL_DATA.filter(item => item.id !== 'senet');

  const currentDetails = MAKBUZ_DETAILS[pathId];

  const getRelatedProducts = (currentPathId: string) => {
    if (currentPathId === 'tahsilat-makbuzu') {
      return [
        { label: "Tediye Makbuzu", path: "/tediye-makbuzu", desc: "Nakit kasa çıkış makbuzu" },
        { label: "Para Makbuzu", path: "/para-makbuzu", desc: "Seri numaralı para makbuzu" },
        { label: "Gider Makbuzu", path: "/gider-makbuzu", desc: "Harcama takip koçanı" },
        { label: "Sipariş Fişi", path: "/siparis-fisi", desc: "İşletme içi sipariş takibi" }
      ];
    }
    const allSubProducts = [
      { label: "Adisyon Baskı", path: "/adisyon", desc: "14x20 cm garson adisyonu" },
      { label: "Sipariş Fişi", path: "/siparis-fisi", desc: "İşletme içi sipariş takibi" },
      { label: "Perakende Fişi", path: "/perakende-satis-fisi", desc: "Perakende satış kayıt fişi" },
      { label: "Para Makbuzu", path: "/para-makbuzu", desc: "Seri numaralı para makbuzu" },
      { label: "Sözleşme Baskı", path: "/sozlesme-baski", desc: "A4 ebatlı sözleşme koçanı" },
      { label: "Tahsilat Makbuzu", path: "/tahsilat-makbuzu", desc: "Otokopili tahsilat koçanı" },
      { label: "Gider Makbuzu", path: "/gider-makbuzu", desc: "Harcama takip koçanı" },
      { label: "Giriş Bileti", path: "/giris-bileti", desc: "Perforeli seri numaralı bilet" },
      { label: "Reçete Koçanı", path: "/recete", desc: "Doktor ve klinik reçetesi" },
      { label: "Tediye Makbuzu", path: "/tediye-makbuzu", desc: "Nakit kasa çıkış makbuzu" },
      { label: "Sigorta Poliçesi", path: "/sigorta-policeleri", desc: "Acente poliçe baskısı" },
      { label: "Araç Kiralama", path: "/arac-kiralama", desc: "Otokopili kiralama formu" }
    ];
    return allSubProducts.filter(p => !p.path.includes(currentPathId)).slice(0, 4);
  };

  const getSubHeaderName = (id: string) => {
    if (id === 'adisyon') return "Sipariş Fişi";
    if (id === 'siparis-fisi') return "Fatura / E-Fatura";
    if (id === 'perakende-satis-fisi') return "Yazarkasa Fişi";
    if (id === 'para-makbuzu') return "Tediye Makbuzu";
    if (id === 'sozlesme-baski') return "Dijital Sözleşme";
    if (id === 'sigorta-policeleri') return "E-Poliçe";
    if (id === 'tahsilat-makbuzu') return "Tediye Makbuzu";
    if (id === 'arac-kiralama') return "Dijital Teslim Formu";
    if (id === 'gider-makbuzu') return "Tediye Makbuzu";
    if (id === 'giris-bileti') return "QR Kod Bilet";
    if (id === 'recete') return "Otokopili / Çift Nüsha Reçete";
    return "Tahsilat Makbuzu";
  };

  const pageTitle = pathId && pathId !== 'makbuz-ve-formlar'
    ? filteredData[0]?.title || "MAKBUZ & FİŞLER"
    : "Makbuz ve Form Baskı Fiyatları";

  const pageTitleForSEO = pathId === 'para-makbuzu'
    ? "Numaratörlü Para Makbuzu Baskı Fiyatları | Mavi Basım Matbaa"
    : currentDetails
      ? currentDetails.seoTitle
      : pathId && pathId !== 'makbuz-ve-formlar'
        ? `${filteredData[0]?.title || "Makbuz ve Form"} Baskı Fiyatları - Mavi Basım`
        : "Makbuz ve Form Baskı Fiyatları | Mavi Basım";

  const pageDescForSEO = pathId === 'para-makbuzu'
    ? "14×20 cm numaratörlü, otokopili para makbuzu baskı fiyatlarını; 2, 3 ve 4 nüsha seçenekleriyle 5 ciltten itibaren inceleyin."
    : currentDetails
      ? currentDetails.seoDescription
      : pathId && pathId !== 'makbuz-ve-formlar'
        ? `${filteredData[0]?.title || "Makbuz ve form"} baskı çözümleri, otokopili kendinden karbonlu tahsilat makbuzu ve fişler. Topkapı matbaasından kapınıza hızlı kargo.`
        : "Adisyon, sipariş fişi, makbuz ve matbu form fiyatlarını; cilt, nüsha ve baskı seçenekleriyle tek sayfada inceleyin.";

  if (currentDetails) {
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    };

    const item = filteredData[0];

    const allPrices: number[] = [];
    if (filteredData && filteredData.length > 0) {
      filteredData.forEach((subItem: any) => {
        subItem.rows?.forEach((row: any) => {
          row.values?.forEach((val: any) => {
            if (typeof val === 'number' && !isNaN(val) && val > 0) {
              allPrices.push(val);
            }
          });
        });
      });
    }
    const calculatedLowPrice = allPrices.length > 0 ? Math.min(...allPrices) : 1450;
    const calculatedHighPrice = allPrices.length > 0 ? Math.max(...allPrices) : 4800;
    const calculatedOfferCount = allPrices.length > 0 ? allPrices.length : 15;

    // Note: For 'para-makbuzu', productSchema is handled centrally in App.tsx to avoid 2. Renk Farkı skewing lowPrice.
    const isParaMakbuzu = pathId === 'para-makbuzu';
    const productSchema = isParaMakbuzu ? null : {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `https://mavibasim.com/${pathId}`,
      "name": currentDetails.h1Title,
      "image": [
        `https://mavibasim.com${currentDetails.featureImage}`,
        ...currentDetails.gallery.map(g => `https://mavibasim.com${g.src}`)
      ],
      "description": currentDetails.seoDescription,
      "category": "Matbu Evrak / Koçan Baskı",
      "material": "1. Sınıf Otokopili Kağıt",
      "color": "Asıl Beyaz, Suretler Renkli",
      "size": "Standart Koçan Ebadı",
      "url": `https://mavibasim.com/${pathId}`,
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "offers": {
        "@type": "AggregateOffer",
        "url": `https://mavibasim.com/${pathId}`,
        "priceCurrency": "TRY",
        "lowPrice": calculatedLowPrice.toFixed(2),
        "highPrice": calculatedHighPrice.toFixed(2),
        "offerCount": String(calculatedOfferCount),
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "Mavi Basım",
          "url": "https://mavibasim.com",
          "telephone": "+905366022373",
          "email": "info@mavibasim.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB",
            "addressLocality": "İstanbul",
            "addressCountry": "TR"
          }
        }
      }
    };

    const imageObjectSchemas = [
      {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "url": `https://mavibasim.com${currentDetails.featureImage}`,
        "contentUrl": `https://mavibasim.com${currentDetails.featureImage}`,
        "license": "https://mavibasim.com/lisans",
        "acquireLicensePage": "https://mavibasim.com/lisans",
        "creditText": "Mavi Basım Topkapı Matbaa",
        "creator": { "@type": "Organization", "name": "Mavi Basım" },
        "copyrightNotice": "Mavi Basım Matbaacılık",
        "caption": currentDetails.featureImageAlt || currentDetails.h1Title
      },
      ...currentDetails.gallery.map(g => ({
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "url": `https://mavibasim.com${g.src}`,
        "contentUrl": `https://mavibasim.com${g.src}`,
        "license": "https://mavibasim.com/lisans",
        "acquireLicensePage": "https://mavibasim.com/lisans",
        "creditText": "Mavi Basım Topkapı Matbaa",
        "creator": { "@type": "Organization", "name": "Mavi Basım" },
        "copyrightNotice": "Mavi Basım Matbaacılık",
        "caption": g.alt || g.title
      }))
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": currentDetails.faqList.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };

    return (
      <div className="bg-white min-h-screen pb-20">
        {pathId !== 'recete' && pathId !== 'tediye-makbuzu' && pathId !== 'tahsilat-makbuzu' && pathId !== 'gider-makbuzu' && pathId !== 'arac-kiralama' && (
          <Helmet>
            <title>{pageTitleForSEO}</title>
            <meta name="description" content={pageDescForSEO} />
            <link rel="canonical" href={`https://mavibasim.com/${pathId}`} />

            {/* Open Graph */}
            <meta property="og:type" content="product" />
            <meta property="og:title" content={pageTitleForSEO} />
            <meta property="og:description" content={pageDescForSEO} />
            <meta property="og:url" content={`https://mavibasim.com/${pathId}`} />
            <meta property="og:image" content={`https://mavibasim.com${currentDetails.featureImage || '/images/tediye-makbuzu/tediye-baski.webp'}`} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitleForSEO} />
            <meta name="twitter:description" content={pageDescForSEO} />
            <meta name="twitter:image" content={`https://mavibasim.com${currentDetails.featureImage || '/images/tediye-makbuzu/tediye-baski.webp'}`} />

            {/* JSON-LD Schemas */}
            {pathId !== 'para-makbuzu' && imageObjectSchemas.map((imgSchema, idx) => (
              <script key={idx} type="application/ld+json">{JSON.stringify(imgSchema)}</script>
            ))}
            {pathId !== 'para-makbuzu' && faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
          </Helmet>
        )}
        
        {pathId === 'gider-makbuzu' && (
  <Helmet>
    {imageObjectSchemas.map((imgSchema, idx) => (
      <script key={`gider-image-${idx}`} type="application/ld+json">
        {JSON.stringify(imgSchema)}
      </script>
    ))}
  </Helmet>
)}{/* Breadcrumb Alanı */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <nav className="text-xs font-bold text-gray-500 uppercase tracking-tight flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <ChevronDown size={12} className="-rotate-90 text-gray-400 shrink-0" />
            <Link to="/makbuz-ve-formlar" className="hover:text-primary transition-colors">Makbuz & Formlar</Link>
            <ChevronDown size={12} className="-rotate-90 text-gray-400 shrink-0" />
            <span className="text-gray-800 font-extrabold truncate" aria-current="page">{currentDetails.breadcrumbTitle}</span>
          </nav>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-black">
          {/* H1 BAŞLIK */}
          <div className="text-center mb-6">
            <h1 className="text-[19px] md:text-[26px] lg:text-[31px] font-black text-primary uppercase tracking-tight mb-4 leading-tight">
              {currentDetails.h1Title}
            </h1>
            <div className="w-20 h-1.5 bg-primary mx-auto mb-6 rounded-full"></div>
            {pathId === 'siparis-fisi' || pathId === 'para-makbuzu' ? (
              <div className="text-slate-650 max-w-[1200px] mx-auto text-sm md:text-base text-left font-semibold space-y-4 mb-8 leading-relaxed">
                <h2 className="text-lg md:text-xl font-black text-slate-900 text-center uppercase tracking-tight">
                  {pathId === 'para-makbuzu' ? "Firmanıza Özel Numaratörlü Para Makbuzu Baskısı" : "Firmanıza Özel Numaratörlü Sipariş Fişi Baskısı"}
                </h2>
                <p className="text-center md:text-justify text-slate-700">
                  {pathId === 'para-makbuzu'
                    ? "Otokopili, logolu ve numaratörlü para makbuzlarıyla nakit teslimat ve tahsilat süreçlerinizi düzenli yönetin. Emlak ofisleri, inşaat firmaları, avukatlar, muhasebeciler, dernekler ve elden ödeme alıp veren tüm işletmeler için yüksek kalitede para makbuzu koçanı üretiyoruz."
                    : "Otokopili, logolu ve numaratörlü sipariş fişleriyle sipariş süreçlerinizi düzenli yönetin. Mağaza, atölye, üretici, toptancı, mobilya firmaları, oto servisleri ve sipariş üzerine çalışan tüm işletmeler için yüksek kalitede sipariş koçanı üretiyoruz."}
                </p>

                {/* Kısa Cevap Kutusu */}
                <div className="bg-emerald-50/90 border-l-4 border-emerald-600 p-4 rounded-r-2xl text-left text-xs md:text-sm font-semibold text-slate-800 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2 font-black text-emerald-900 uppercase tracking-tight text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>Kısa Cevap</span>
                  </div>
                  <p className="leading-relaxed">
                    {pathId === 'para-makbuzu' ? (
                      <>
                        <strong>Para makbuzu;</strong> iki taraf veya firma arasında gerçekleşen nakit ödeme, kapora ve para teslim işlemlerinin yazılı olarak kayıt altına alınmasına yardımcı olan kopyalı bir belgedir. Genellikle 14×20 cm ölçüsünde, numaratörlü ve 1 asıl + 1, 2 veya 3 suret olarak basılır.
                      </>
                    ) : (
                      <>
                        <strong>Sipariş fişi;</strong> müşteriden alınan siparişleri kayıt altına almak için kullanılan otokopili ticari formdur. Genellikle 14×20 cm ölçüsünde, numaratörlü ve 1 asıl + 1, 2 veya 3 suret olarak basılır.
                      </>
                    )}
                  </p>
                </div>

                {/* AI Snippet - Hızlı Soru Cevap Kutuları */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left pt-1">
                  <div className="bg-white border border-slate-200 p-3.5 rounded-2xl shadow-2xs">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight mb-1 flex items-center gap-1.5">
                      <span className="text-emerald-600 font-extrabold">?</span> {pathId === 'para-makbuzu' ? "Para Makbuzu Nedir?" : "Sipariş Fişi Nedir?"}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {pathId === 'para-makbuzu'
                        ? "İki taraf arasında gerçekleşen nakit ödeme, kapora ve borç-alacak transferlerini kayıt altına alan kopyalı belgedir."
                        : "Müşteriden alınan siparişlerin miktar, birim fiyat, teslim tarihi ve peşinat detaylarını kayıt altına alan kopyalı ticari belgedir."}
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 p-3.5 rounded-2xl shadow-2xs">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight mb-1 flex items-center gap-1.5">
                      <span className="text-emerald-600 font-extrabold">?</span> Otokopili Makbuz Nedir?
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Üst nüshaya yazılan metni araya karbon kağıdı koymaya gerek kalmadan alt suretlere kendiliğinden aktaran kopyalı kağıttır.
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 p-3.5 rounded-2xl shadow-2xs">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight mb-1 flex items-center gap-1.5">
                      <span className="text-emerald-600 font-extrabold">?</span> Numaratör Neden Kullanılır?
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {pathId === 'para-makbuzu'
                        ? "Kasaya giren ve çıkan parayı seri numarasıyla takip etmek, işlemlerin sıra numarasına göre izlenmesini kolaylaştırmak ve kayıt düzeni sağlamak için kırmızı basılır."
                        : "Siparişlerin karışmasını önlemek, koçan takibini kolaylaştırmak ve muhasebe arşivinde sıralı arama yapabilmek için kırmızı basılır."}
                    </p>
                  </div>
                </div>

                <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-center">
                  {[
                    "5 Ciltten Başlayan Üretim",
                    "Grafik Desteği",
                    "PDF Prova Onayı",
                    "Türkiye Geneli Kargo",
                    "Yıllara Dayanan Üretim Deneyimi"
                  ].map((bullet, bIdx) => (
                    <div key={bIdx} className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs font-bold text-slate-800 shadow-2xs flex items-center justify-center gap-1.5">
                      <span className="text-emerald-600 font-extrabold">✓</span> {bullet}
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <a 
                    href="#fiyat-tablosu" 
                    onClick={(e) => scrollToSection(e, 'fiyat-tablosu')}
                    className="bg-secondary hover:bg-primary text-white font-black text-xs md:text-sm px-6 py-3 rounded-full shadow-md transition-all uppercase tracking-tight flex items-center gap-2 cursor-pointer"
                  >
                    <span>Fiyatları İncele</span>
                  </a>
                  <a 
                    href={pathId === 'para-makbuzu'
                      ? "https://wa.me/905366022373?text=Merhaba,%20Para%20Makbuzu%20baskısı%20hakkında%20bilgi%20ve%20fiyat%20almak%20istiyorum."
                      : "https://wa.me/905366022373?text=Merhaba,%20Sipariş%20Fişi%20baskısı%20hakkında%20bilgi%20ve%20fiyat%20almak%20istiyorum."}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs md:text-sm px-6 py-3 rounded-full shadow-md transition-all uppercase tracking-tight flex items-center gap-2"
                  >
                    <img src="/WhatsApp.svg" alt="WhatsApp" width={16} height={16} loading="lazy" decoding="async" className="w-4 h-4" />
                    <span>WhatsApp’tan Sipariş Ver</span>
                  </a>
                </div>
              </div>
            ) : pathId === 'adisyon' ? (
              <div className="text-slate-650 max-w-[1200px] mx-auto text-sm md:text-base text-left md:text-justify font-semibold space-y-3 mb-8 leading-relaxed">
                <p>{currentDetails.subtitle}</p>
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-800 text-xs sm:text-sm font-semibold">
                  Standart adisyon ürünümüz 14 × 20 cm, tek nüsha ve numaratörlüdür. Otokopili, farklı ölçülü ve çok renkli seçenekler ayrıca fiyatlandırılır.
                </div>
              </div>
            ) : pathId === 'arac-kiralama' || pathId === 'gider-makbuzu' || pathId === 'tahsilat-makbuzu' ? (
              <div className="text-slate-650 max-w-[1200px] mx-auto text-sm md:text-base text-left md:text-justify font-semibold space-y-4 mb-8 leading-relaxed">
                {currentDetails.subtitle.split('\n\n').map((para, pIdx) => (
                  <p key={pIdx}>
                    {para.split(/(\*\*.*?\*\*)/).map((part, partIdx) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={partIdx} className="text-primary font-bold">{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    })}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 max-w-none mx-auto font-medium text-xs md:text-sm lg:text-base text-center block">
                {currentDetails.subtitle}
              </p>
            )}
          </div>

          {/* İÇİNDEKİLER (TOC) HIZLI GEZİNME KUTUSU */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 md:p-5 mb-8 text-left shadow-2xs">
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight">İçindekiler (Hızlı Gezinme)</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TOC</span>
            </div>
            <nav className={`grid ${(pathId === 'para-makbuzu' || pathId === 'arac-kiralama') ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'} gap-2 text-xs font-bold text-slate-700`} aria-label="Sayfa İçindekiler Navigasyonu">
              <a 
                href="#fiyat-tablosu" 
                onClick={(e) => scrollToSection(e, 'fiyat-tablosu')}
                className="bg-white hover:bg-primary hover:text-white border border-slate-200 p-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs group cursor-pointer"
              >
                <span className="text-primary group-hover:text-white font-black">1.</span> Fiyat Tablosu
              </a>
              <a 
                href="#ozellikler" 
                onClick={(e) => scrollToSection(e, 'ozellikler')}
                className="bg-white hover:bg-primary hover:text-white border border-slate-200 p-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs group cursor-pointer"
              >
                <span className="text-primary group-hover:text-white font-black">2.</span> Özellikler
              </a>
              <a 
                href="#kimler-kullanir" 
                onClick={(e) => scrollToSection(e, 'kimler-kullanir')}
                className="bg-white hover:bg-primary hover:text-white border border-slate-200 p-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs group cursor-pointer"
              >
                <span className="text-primary group-hover:text-white font-black">3.</span> Kimler Kullanır
              </a>
              <a 
                href="#uretim-sureci" 
                onClick={(e) => scrollToSection(e, 'uretim-sureci')}
                className="bg-white hover:bg-primary hover:text-white border border-slate-200 p-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs group cursor-pointer"
              >
                <span className="text-primary group-hover:text-white font-black">4.</span> Üretim Süreci
              </a>
              {pathId !== 'para-makbuzu' && pathId !== 'arac-kiralama' && (
                <a 
                  href="#nasil-doldurulur" 
                  onClick={(e) => scrollToSection(e, 'nasil-doldurulur')}
                  className="bg-white hover:bg-primary hover:text-white border border-slate-200 p-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs group cursor-pointer"
                >
                  <span className="text-primary group-hover:text-white font-black">5.</span> Nasıl Doldurulur
                </a>
              )}
              <a 
                href="#sss-bolumu" 
                onClick={(e) => scrollToSection(e, 'sss-bolumu')}
                className="bg-white hover:bg-primary hover:text-white border border-slate-200 p-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs group cursor-pointer"
              >
                <span className="text-primary group-hover:text-white font-black">{(pathId === 'para-makbuzu' || pathId === 'arac-kiralama') ? '5.' : '6.'}</span> Sıkça Sorulan Sorular
              </a>
            </nav>
          </div>

          {/* FİYAT LİSTESİ TABLOSU - BAŞTA BAŞLAR VE GENİŞLİĞİ DİĞERLERİYLE AYNIDIR */}
          <div id="fiyat-tablosu" className="scroll-mt-24 group mb-12">
            <div className="flex justify-between items-center mb-6 px-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-secondary rounded-full" />
                <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2 flex-wrap">
                  {pathId === 'adisyon'
                    ? "Adisyon Fiyat Tablosu"
                    : pathId === 'tahsilat-makbuzu'
                    ? "Tahsilat Makbuzu Baskı Fiyatları"
                    : `${item ? item.title : currentDetails.breadcrumbTitle} - ${item ? item.ebat : "14 x 20 cm"} Fiyat Listesi`}
                </h2>
              </div>
            </div>
            {/* ADISYON_FIYAT_TABLOSU_BASLANGIC */}
            {item && <SiparisFisiHorizontalTable data={[item]} />}
            {/* ADISYON_FIYAT_TABLOSU_BITIS */}
            {pathId === 'adisyon' && (
              <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Standart Ürün Bilgisi
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 text-xs text-slate-800 font-bold">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">Ebat</span>
                    14 × 20 cm
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">Cilt İçeriği</span>
                    100 Yaprak
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">Nüsha</span>
                    Tek Nüsha
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">Kâğıt Türü</span>
                    70–80 gr 1. Hamur
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">Seri No</span>
                    Ardışık Numaratör
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">Baskı Türü</span>
                    Tek Renk Baskı
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs col-span-2 sm:col-span-1">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase mb-0.5">Kullanım Alanı</span>
                    Restoran, Kafe, Lokanta
                  </div>
                </div>
                <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-slate-800 text-xs font-semibold leading-relaxed">
                  Yukarıdaki fiyatlar 14 × 20 cm, tek nüsha, 100 yapraklı, tek renk ve numaratörlü adisyon koçanı için geçerlidir. Otokopili, çok nüshalı, farklı ölçülü ve çok renkli üretimler ayrıca fiyatlandırılır. Fiyat tablosundaki standart tek nüsha adisyon koçanlarında ardışık numaratör baskısı liste fiyatına dahildir.
                </div>
              </div>
            )}
            {pathId === 'sozlesme-baski' && (
              <div className="mt-6 p-6 bg-slate-50 border border-slate-150 rounded-[2rem] shadow-sm">
                <h3 className="text-base md:text-lg font-black text-black mb-2 uppercase tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                  Sözleşme Baskı Fiyatları Nasıl Hesaplanır?
                </h3>
                <p className="text-slate-650 text-sm leading-relaxed font-semibold">
                  Sözleşme baskı fiyatları; cilt adedi, nüsha sayısı (1 asıl + 1 suret, 1 asıl + 2 suret vb.), baskı rengi, numaratör kullanımı ve tasarım özelliklerine göre değişiklik göstermektedir. Yüksek adetli siparişlerde birim maliyet düşerken, kurumsal logo ve standart numaratör uygulamaları fiyat listesine dahil olarak sunulmaktadır.
                </p>
              </div>
            )}
            {(pathId === 'gider-makbuzu' || pathId === 'tahsilat-makbuzu') && (
              <div className="space-y-6">
                <div className="mt-6 p-6 bg-slate-50 border border-slate-150 rounded-[2rem] shadow-sm">
                  <h2 className="text-base md:text-lg font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-secondary rounded-full" />
                    {pathId === 'gider-makbuzu' ? 'Gider Makbuzu Fiyatları' : 'Tahsilat Makbuzu Fiyatları'}
                  </h2>
                  <div className="text-slate-650 text-sm leading-relaxed font-semibold space-y-4 text-left">
                    {pathId === 'gider-makbuzu' ? (
                      <>
                        <p>
                          Bu sayfadaki <strong>gider makbuzu fiyatları</strong>; ölçü, nüsha sayısı, baskı rengi ve numaratör özelliklerine göre değişiklik gösterebilir. <strong>Otokopili gider makbuzu</strong> koçanı üretimlerinde 1 asıl + 1 suret veya 1 asıl + 2 suret seçenekleri tercih edilmektedir. <strong>Numaratörlü gider makbuzu</strong> baskıları, evrak takibini kolaylaştırdığı için işletmeler tarafından en çok talep edilen modeller arasındadır.
                        </p>
                        <p>
                          <strong>Gider makbuzu bastırma</strong> sürecinde kullanılacak kağıt türü, baskı adedi ve özel tasarım talepleri fiyatları etkileyebilir. <strong>Logolu gider makbuzu</strong> ve <strong>özel tasarım gider makbuzu</strong> çalışmalarında firmanıza özel grafik düzenlemeleri uygulanabilmektedir. Güncel <strong>gider makbuzu baskı fiyatları</strong> için yukarıdaki tabloyu inceleyebilir veya hızlı <strong>gider makbuzu siparişi</strong> oluşturabilirsiniz.
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          Tahsilat makbuzu fiyatları; tercih edilen ölçü, nüsha sayısı, baskı rengi ve uygulanacak özel üretim özelliklerine göre belirlenmektedir. En ekonomik seçenek olan <strong>1 Asıl + 1 Suret</strong> modelleri, günlük kullanım için yeterli olurken, muhasebe, müşteri ve arşiv için ek kopyaya ihtiyaç duyan işletmeler <strong>1 Asıl + 2 Suret</strong> seçeneklerini tercih etmektedir. İlave nüsha kullanılması, daha fazla otokopili kağıt tüketimi ve üretim süreci gerektirdiğinden maliyeti artırmaktadır.
                        </p>
                        <p>
                          Tek renk baskılar en uygun fiyatlı seçenek olurken, kurumsal kimliğe uygun iki veya daha fazla renk kullanılan çalışmalarda her ilave renk için ayrı baskı hazırlığı yapıldığından fiyat değişebilmektedir. Standart ölçüler dışında özel ebatlarda üretim yapılması veya tasarımda ilave tablo, alan ve özel bilgiler istenmesi de maliyeti etkileyen unsurlar arasındadır. Numaratör uygulaması ise belge takibini kolaylaştıran standart bir üretim özelliğidir. Sayfamızdaki fiyatlarda numaratör hizmeti dahildir. Güncel fiyatlar için yukarıdaki tabloyu inceleyebilir veya firmanıza özel talepleriniz hakkında bizimle iletişime geçebilirsiniz.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {pathId === 'tahsilat-makbuzu' && (
                  <div className="p-6 bg-slate-50 border border-slate-150 rounded-[2rem] shadow-sm">
                    <h2 className="text-base md:text-lg font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-secondary rounded-full" />
                      Tahsilat Makbuzu Baskı Seçenekleri
                    </h2>
                    <div className="text-slate-650 text-sm leading-relaxed font-semibold space-y-4 text-left">
                      <p>
                        Mavi Basım'da tahsilat makbuzları, sayfadaki mevcut seçeneklere göre logolu, kendinden karbonlu (otokopili) ve seri numaralı olarak hazırlanabilir. Ölçü, nüsha ve adet seçeneklerini ürün tablosundan inceleyerek ihtiyacınıza uygun ürünü seçebilirsiniz.
                      </p>
                      <p>
                        Üretim İstanbul Topkapı'daki tesisimizde yapılır; siparişler Türkiye geneline gönderilir. Kasadan yapılan nakit çıkışlarını belgelemek için <Link to="/tediye-makbuzu" className="text-primary hover:underline font-bold">tediye makbuzu</Link> veya tüm matbuat çeşitleri için <Link to="/makbuz-ve-formlar" className="text-primary hover:underline font-bold">makbuz ve form baskı</Link> kategorimizi inceleyebilirsiniz.
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-6 bg-slate-50 border border-slate-150 rounded-[2rem] shadow-sm">
                  <h2 className="text-base md:text-lg font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-secondary rounded-full" />
                    {pathId === 'gider-makbuzu' ? 'Gider Makbuzu Nedir?' : 'Tahsilat Makbuzu Nedir?'}
                  </h2>
                  <div className="text-slate-650 text-sm leading-relaxed font-semibold space-y-4 text-left">
                    {pathId === 'gider-makbuzu' ? (
                      <>
                        <p>
                          Gider makbuzu, işletmeler tarafından yapılan harcamaların ve ödemelerin kayıt altına alınmasına yardımcı olan matbu bir evraktır. Şirket içi mali hareketlerin düzenli şekilde takip edilmesi, yapılan giderlerin belgelenmesi ve evrak düzeninin korunması amacıyla kullanılmaktadır. Özellikle ön muhasebe süreçlerinde tercih edilen bu belgeler, geçmiş işlemlerin arşivlenmesini ve gerektiğinde kolayca incelenmesini sağlar.
                        </p>
                        <p>
                          Gider makbuzları genellikle tarih, belge numarası, açıklama alanı, tutar bilgisi, firma bilgileri ve imza bölümlerinden oluşur. İşletmenin ihtiyaçlarına göre özel tasarlanabilen bu formlar, farklı sektörlerde yaygın olarak kullanılmaktadır. Ticari işletmeler, üretim firmaları, hizmet şirketleri, mağazalar, restoranlar ve çeşitli kurumsal kuruluşlar günlük operasyonlarında gider makbuzu kullanabilmektedir.
                        </p>
                        <p>
                          Otokopili gider makbuzu modellerinde üst nüshaya yazılan bilgiler alt nüshalara otomatik olarak aktarılır. Numaratörlü gider makbuzu seçenekleri…46637 tokens truncated…", title: "CTP Kalıp Pozlama", desc: "Onaylanan tasarım CTP sisteminde ofset kalıbına pozlanır." },
                      { step: "05", title: "Ofset Baskı", desc: "Otokopili otantik kağıtlara yüksek çözünürlüklü CMYK / panteon ofset baskı gerçekleştirilir." },
                      { step: "06", title: "Kırmızı Numaratör", desc: "İstediğiniz başlangıç numarasından itibaren seri kırmızı numaratör basılır." },
                      { step: "07", title: "Perforaj & Ciltleme", desc: "Yaprakların koçandan kolayca kopması için perforaj çekilir ve sağlam üst dikiş cilt yapılır." },
                      { step: "08", title: "Kalite Kontrol", desc: "Nüsha kopyalama netliği ve numaratör sıralaması titizlikle denetlenir." },
                      { step: "09", title: "Türkiye Geneli Kargo", desc: "Özenle paketlenen sipariş fişi koçanları anlaşmalı kargo ile adresinize sevk edilir." }
                    ].map((st, stIdx) => (
                      <div key={stIdx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500 hover:bg-white transition-all duration-300">
                        <span className="text-3xl font-black text-slate-200 group-hover:text-emerald-100 transition-colors absolute top-2 right-3 font-mono">{st.step}</span>
                        <h3 className="text-sm font-black text-black mb-1.5 relative z-10">{st.title}</h3>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed relative z-10">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. İlgili Baskı Ürünleri (Ağ İçi Bağlantılar) */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    İlgili Kurumsal Matbu Ürünlerimiz
                  </h2>
                  <p className="text-slate-650 text-base leading-relaxed font-medium mb-6">
                    Sipariş fişi siparişinizin yanında işletmenizin ihtiyaç duyabileceği diğer matbu belgeler:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { name: "Adisyon Baskı", path: "/adisyon", desc: "Restoran ve kafeler için numaratörlü otokopili adisyon koçanları." },
                      { name: "Perakende Satış Fişi", path: "/perakende-satis-fisi", desc: "Mağaza ve perakende satış noktaları için resmi satış fişi." },
                      { name: "Para Makbuzu Baskı", path: "/para-makbuzu", desc: "Nakit alım-satım ve elden ödeme kayıtları için." },
                      { name: "Tahsilat Makbuzu Baskı", path: "/tahsilat-makbuzu", desc: "Cari hesap tahsilatları ve müşteri ödeme belgeleri." },
                      { name: "Tediye Makbuzu Baskı", path: "/tediye-makbuzu", desc: "Kasadan yapılan ödeme ve avans kayıt formları." },
                      { name: "Gider Makbuzu Baskı", path: "/gider-makbuzu", desc: "İşletme içi masraf ve gider takip belgeleri." },
                      { name: "Sözleşme Koçanı Baskı", path: "/sozlesme-baski", desc: "Hizmet ve satış sözleşmeleri için otokopili formlar." },
                      { name: "Servis Formu Baskı", path: "/arac-kiralama", desc: "Teknik servis cihaz teslim ve bakım formları." }
                    ].map((prod, pIdx) => (
                      <Link 
                        to={prod.path} 
                        key={pIdx} 
                        className="bg-gray-50 border border-gray-150 hover:border-primary hover:bg-white rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-primary transition-colors shrink-0" />
                            <span className="text-sm text-gray-900 font-black tracking-tight group-hover:text-primary transition-colors leading-normal">{prod.name}</span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed pl-4">{prod.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 4. İlgili Rehber & Makaleler */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    İlgili Makaleler & Rehberler
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: "Baskıya Uygun Tasarım Nasıl Hazırlanır?", path: "/blog/baskiya-uygun-tasarim-nasil-hazirlanir", desc: "Sipariş fişi ve matbu evraklarda vektörel logo, cmYK renk modülü ve çözünürlük kuralları." },
                      { title: "Kaliteli Baskı Nasıl Anlaşılır?", path: "/blog/kaliteli-baski-nasil-anlasilir", desc: "Otokopi kâğıt kalitesi, net kopyalama yeteneği ve kaliteli ciltleme kriterleri." },
                      { title: "Matbaa Fiyatlarını Neler Belirler?", path: "/blog/matbaa-fiyatlarini-neler-belirler", desc: "Sipariş adedi, cilt sayısı, suret adedi ve numaratör maliyet hesaplama detayları." },
                      { title: "Hızlı Üretim Süreci Nasıl Planlanır?", path: "/blog/hizli-uretim-sureci-nasil-planlanir", desc: "Sipariş koçanlarının grafik onayından kargoya kadar acil üretim aşamaları." },
                      { title: "Baskılı Ürünlerle Pazarlama", path: "/blog/baskili-urunlerle-pazarlama-markanizi-buyuten-matbaa-urunleri", desc: "Kurumsal sipariş koçanlarının müşteri güveni ve marka imajına katkısı." },
                      { title: "Broşür Baskıda En Doğru Kâğıt", path: "/blog/brosur-baskida-en-dogru-kagit-nasil-secilir", desc: "1. hamur, otokopi ve kuşe kâğıt gramaj farkları ve kullanım alanları." }
                    ].map((blog, bIdx) => (
                      <Link 
                        to={blog.path} 
                        key={bIdx} 
                        className="bg-gray-50 border border-gray-150 hover:border-primary hover:bg-white rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
                      >
                        <div>
                          <span className="text-xs text-primary font-black uppercase tracking-wider mb-2 block">Kılavuz & Makale</span>
                          <h3 className="text-sm font-black text-black tracking-tight group-hover:text-primary transition-colors leading-snug">{blog.title}</h3>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">{blog.desc}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-black text-slate-700 group-hover:text-primary transition-colors uppercase tracking-tight mt-4">
                          Okumaya Başla ➔
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}

            {pathId === 'tediye-makbuzu' && (
              <>
                {/* 1. Tediye Makbuzu Fiyatları */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Tediye Makbuzu Fiyatları
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      Tediye makbuzu baskı fiyatları; nüsha sayısı, cilt adedi ve baskı seçeneklerine göre değişir. 14 × 20 cm yarım boy seçeneklerinin fiyatlarını yukarıdaki tabloda inceleyebilir, farklı talepleriniz için bilgi alabilirsiniz.
                    </p>
                    <p>
                      Otokopili ve numaratörlü baskı seçenekleriyle hazırlanan tediye makbuzları için firma bilgilerinizi ve ihtiyacınızı ileterek teklif alabilirsiniz. Standart ölçü 14 × 20 cm yarım boydur; farklı ebat talepleri ayrıca değerlendirilebilir.
                    </p>
                  </div>
                </div>

                {/* 2. Tediye Makbuzu Örnek Metinleri */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Tediye Makbuzu Örnek Metinleri
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      Aşağıdaki örnek alanlar, tediye makbuzunda bulunabilecek bilgileri gösteren genel metin taslaklarıdır. İşletmenizin kullandığı formata göre düzenleyebilirsiniz.
                    </p>
                    <p>
                      Taslakta tarih, sıra numarası, ödeyen ve ödeme alan bilgileri, tutar, açıklama ve imza alanları yer alır.
                    </p>
                    <p>
                      Numaratör ve otokopili nüsha seçenekleri, basılı koçanlarda kayıtların izlenmesine ve nüshaların birlikte hazırlanmasına yardımcı olur.
                    </p>
                    <p>
                      Bu indirmeler örnek metin dosyalarıdır; resmî veya muhasebe kullanımı için hazır belge niteliğinde değildir.
                    </p>

                    {/* ÜCRETSİZ ÖRNEKLER İNDİRME BÖLÜMÜ */}
                    <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-5">
                      <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <span>📂 Örnek Metin Dosyaları</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mb-4">
                        Örnekleri düz metin (.txt) dosyası olarak indirebilirsiniz:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            const blob = new Blob([
                              `TEDİYE MAKBUZU ÖRNEK METNİ\n\nTarih: __________\nMakbuz No: __________\nÖdeyen Ünvanı: __________\nÖdeme Alan: __________\nÖdeme Tutarı: __________ TL\nÖdeme Açıklaması: __________\n\nÖdeyen İmza: __________    Teslim Alan İmza: __________`
                            ], { type: 'text/plain;charset=utf-8' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'tediye-makbuzu-ornek-metni.txt';
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200 hover:border-red-400 hover:shadow-xs transition-all group cursor-pointer text-left"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 font-black text-xs flex items-center justify-center">TXT</span>
                            <div>
                              <div className="text-xs font-bold text-slate-800 group-hover:text-red-600 transition-colors">Örnek Makbuz Metni</div>
                              <div className="text-[10px] text-slate-500">TXT dosyası indir</div>
                            </div>
                          </div>
                          <span className="text-slate-400 group-hover:text-red-600 text-sm font-bold">↓</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const blob = new Blob([
                              `TEDİYE MAKBUZU DÜZENLENEBİLİR ÖRNEK\n\nTarih: __________\nMakbuz No: __________\nÖdeyen Ünvanı: __________\nÖdeme Alan: __________\nÖdeme Tutarı: __________ TL\nÖdeme Açıklaması: __________\n\nÖdeyen İmza: __________\nTeslim Alan İmza: __________`
                            ], { type: 'text/plain;charset=utf-8' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'tediye-makbuzu-duzenlenebilir-ornek.txt';
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all group cursor-pointer text-left"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 font-black text-xs flex items-center justify-center">TXT</span>
                            <div>
                              <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Düzenlenebilir Örnek</div>
                              <div className="text-[10px] text-slate-500">TXT dosyası indir</div>
                            </div>
                          </div>
                          <span className="text-slate-400 group-hover:text-blue-600 text-sm font-bold">↓</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const blob = new Blob([
                              `Tarih\tMakbuz No\tÖdeyen\tÖdeme Alan\tTutar\tAçıklama\n__________\t__________\t__________\t__________\t__________ TL\t__________`
                            ], { type: 'text/plain;charset=utf-8' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'tediye-makbuzu-tab-ayrimli-ornek.txt';
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all group cursor-pointer text-left"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 font-black text-xs flex items-center justify-center">TXT</span>
                            <div>
                              <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">Tab Ayrımlı Örnek</div>
                              <div className="text-[10px] text-slate-500">TXT dosyası indir</div>
                            </div>
                          </div>
                          <span className="text-slate-400 group-hover:text-emerald-600 text-sm font-bold">↓</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Tediye Makbuzu Ölçüleri Nelerdir? */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Tediye Makbuzu Ölçüleri Nelerdir?
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      Tediye makbuzları için fiyat tablosunda yer alan standart ebat <strong>14 × 20 cm yarım boy</strong> ölçüsüdür. Farklı ölçü talepleri ayrıca değerlendirilebilir.
                    </p>
                    <p>
                      Fiyat tablosu dışındaki ölçü ve üretim seçeneklerinin uygunluğu, talep edilen özelliklere göre teklif aşamasında netleştirilir.
                    </p>

                    {/* CTA BENNER / PROVA İSTE BÖLÜMÜ */}
                    <div className="mt-4 p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-800">
                      <p className="text-xs sm:text-sm font-semibold">
                        Grafik desteği var. Baskıya hazır dosyanın teknik kontrolü ve PDF prova kontrolü ücretsizdir.
                      </p>
                      <a
                        href="https://wa.me/905366022373?text=Merhaba,%20Tediye%20Makbuzu%20bask%C4%B1s%C4%B1%20ve%20tasar%C4%B1m%C4%B1%20hakk%C4%B1nda%20bilgi%20ve%20ücretsiz%20PDF%20prova%20almak%20istiyorum."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-2 shrink-0"
                      >
                        <span>WhatsApp ile Bilgi Al</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 3. Tediye Makbuzu Üretim ve Teslim Süreci */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Tediye Makbuzu Üretim ve Teslim Süreci
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      Sipariş ve dosya bilgileri netleştirildikten sonra baskı öncesi dosya kontrolü yapılır. Baskı, müşteri onayı alındıktan sonra başlatılır.
                    </p>
                    <p>
                      Üretim ve teslim süresi; ürün, adet ve onay sürecine göre teklif aşamasında paylaşılır.
                    </p>
                  </div>
                </div>

                {/* 4. Neden Numaratörlü Tediye Makbuzu Kullanılmalıdır? */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Neden Numaratörlü Tediye Makbuzu Kullanılmalıdır?
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      Seri numarası, basılı makbuzların sıra numarasına göre izlenmesine yardımcı olur. Numaratör seçeneği ve baskı ayrıntıları sipariş öncesinde belirlenebilir.
                    </p>
                    <p>
                      Otokopili nüsha ve firma bilgileriyle özelleştirilmiş tediye makbuzu baskısı için teklif alabilirsiniz.
                    </p>
                  </div>
                </div>

                {/* 5. Tediye Makbuzu Neden Kesilir? */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Tediye Makbuzu Neden Kesilir?
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      Tediye makbuzu; personel ödemeleri, avans ödemeleri, tedarikçi ödemeleri ve diğer kasa çıkışlarının kayıt altına alınması amacıyla düzenlenir. Yapılan ödemenin belgelenmesini sağlayarak işletmeler için düzenli arşivleme imkânı sunar.
                    </p>
                  </div>
                </div>

                {/* 6. Tediye Makbuzuna Ne Yazılır? */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Tediye Makbuzuna Ne Yazılır?
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      Tediye makbuzuna düzenleme tarihi, ödeyen ve ödenen taraf bilgileri, tutar, ödeme açıklaması ve yetkili imzaları yazılır.
                    </p>
                  </div>
                </div>
              </>
            )}

            {pathId === 'recete' && (
              <>
                {/* 1. Reçete Baskı Fiyatları ve Özellikleri */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Reçete Baskı Fiyatları ve İmalat Özellikleri
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      Mavi Basım olarak <strong>reçete baskı fiyatları</strong> ve <strong>reçete koçanı baskısı</strong> alanında en uygun maliyetli kurumsal çözümleri sunuyoruz. İstanbul Topkapı matbaa tesisimizde 80 gr 1. hamur beyaz kağıt veya kopyalı otokopi kağıtlarına yüksek kaliteli <strong>numaratörlü reçete koçanı</strong> ve <strong>A5 reçete baskısı</strong> yapılmaktadır.
                    </p>
                    <p>
                      Sipariş fiyatları adet (5, 10, 20, 50 veya 100 cilt), kağıt cinsi ve ebadına göre belirlenir. Standart A5 ölçü veya <strong>özel ebat reçete koçanı</strong> ve <strong>otokopili reçete formu</strong> ihtiyaçlarınızda doğrudan imalatçı garantisiyle hizmet veriyoruz.
                    </p>
                    
                    {/* Üst CTA Küçük Uyarı Kutusu */}
                    <div className="my-3 p-3 bg-slate-100/90 border border-slate-200/80 rounded-xl text-[11px] md:text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-800 font-semibold">Önemli:</strong> Mavi Basım yalnızca basılı matbuat üretimi yapmaktadır. Resmî kullanım uygunluğu ve içerik sorumluluğu sipariş veren kuruma aittir.
                    </div>

                    {/* Dönüşüm Barları & Hızlı Eylem Butonları */}
                    <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <a
                        href="https://wa.me/905366022373?text=Merhaba,%20re%C3%A7ete%20ko%C3%A7an%C4%B1%20bask%C4%B1%20fiyatlar%C4%B1%20hakk%C4%B1nda%20hemen%20teklif%20almak%20istiyorum."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm py-3 px-3 rounded-xl text-center shadow-xs transition-colors flex items-center justify-center"
                      >
                        Hemen Teklif Al
                      </a>
                      <a
                        href="https://wa.me/905366022373?text=Merhaba,%20re%C3%A7ete%20i%C3%A7in%20%C3%BCcretsiz%20PDF%20prova%20talep%20ediyorum."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm py-3 px-3 rounded-xl text-center shadow-xs transition-colors flex items-center justify-center"
                      >
                        PDF Prova Talep Et
                      </a>
                      <a
                        href="https://wa.me/905366022373?text=Merhaba,%20re%C3%A7ete%20ko%C3%A7an%C4%B1%20numune%20g%C3%B6rseli%20istiyorum."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm py-3 px-3 rounded-xl text-center transition-colors flex items-center justify-center"
                      >
                        Numune Görsel İste
                      </a>
                      <a
                        href="https://wa.me/905366022373?text=Merhaba,%20re%C3%A7ete%20ko%C3%A7an%C4%B1%20tek%20t%C4%B1kla%20sipari%C5%9F%20vermek%20istiyorum."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm py-3 px-3 rounded-xl text-center shadow-xs transition-colors flex items-center justify-center"
                      >
                        Tek Tıkla Sipariş
                      </a>
                    </div>
                  </div>
                </div>

                {/* YMYL & Yasal Bilgilendirme Notu */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 my-2 text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                  <span className="font-bold text-slate-900 block mb-1">⚖️ Yasal Bilgilendirme ve Kullanım Sorumluluğu:</span>
                  Bu sayfada sunulan reçete koçanları; kurum içi takip, hasta bilgilendirme ve fiziki arşiv süreçlerine yönelik basılı matbuat ürünleridir (matbu evrak). Mavi Basım, yalnızca müşteri tarafından iletilen ve onaylanan içeriklerin basılı üretimini gerçekleştirmekte olup, basılan evrakların ilgili mevzuata uygunluğu ve kullanım amacı tamamen sipariş sahibi kurumun sorumluluğundadır.
                </div>

                {/* 2. Numaratörlü Reçete Koçanı Baskısı */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Numaratörlü Reçete Koçanı Baskısı
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      Kurumsal kayıt ve arşiv süreçlerinde düzen sağlamak amacıyla <strong>numaratörlü reçete koçanı</strong> baskısı tercih edilmektedir. Sıralı seri numarası basılan koçan yaprakları sayesinde evrak takibi kolaylaşır, kayıp veya atlanan sayfalar anında tespit edilir. Kliniklerin ve sağlık merkezlerinin kurum içi denetimlerini sorunsuz yürütmelerine imkan tanır.
                    </p>
                  </div>
                </div>

                {/* 3. Otokopili Reçete Baskısı Özellikleri */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Otokopili Reçete Baskısı Özellikleri
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      Nüshalı kullanım gerektiren durumlar için <strong>otokopili reçete baskısı</strong> (kendinden kopyalı otokopi kağıdı) ideal çözümdür. Üst nüshaya yazılan bilgiler, ilave karbon kağıdına ihtiyaç duyulmadan alt nüshaya net bir şekilde aktarılır. Genellikle 2 nüsha (1 asıl + 1 kopya) olarak üretilen <strong>otokopili reçete koçanı</strong> seçeneklerinde bir nüsha kurum arşivinde saklanabilir.
                    </p>
                  </div>
                </div>

                {/* 4. A5 ve Yarım Boy Reçete Ölçüleri */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    A5 ve Yarım Boy Reçete Ölçüleri
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      Matbaamızda <strong>reçete baskısı</strong> standart olarak <strong>A5 reçete baskısı</strong> (14,8 x 21 cm) ve <strong>yarım boy reçete</strong> (14 x 20 cm) ebatlarında gerçekleştirilmektedir. Kullanım kolaylığı için üstten tutkallı (bloknot tipi) veya perforeli (tırtıklı kolay kopan cilt) seçenekleriyle imal edilir. İsteğe göre <strong>özel ebat reçete koçanı</strong> üretimi de yapılmaktadır. Standart A5 (14,8x21 cm) ve yarım boy (14x20 cm) ölçülerinin yanı sıra, promosyon amaçlı kullanılan 9x21 cm ve 10x20 cm özel reçete ebatları da talebe göre üretilebilmektedir.
                    </p>
                  </div>
                </div>

                {/* 5. Doktor Reçetesi Baskısı ve Kullanım Alanları */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Doktor Reçetesi Baskısı ve Kullanım Alanları
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      Özel muayenehaneler, klinikler, poliklinikler, ağız ve diş sağlığı merkezleri ile fizik tedavi kurumları için kurumsal <strong>doktor reçetesi baskısı</strong> yapılmaktadır. Kurum logosu, doktor unvanı, iletişim ve adres bilgileri müşterinin ilettiği onaylı tasarıma uygun olarak basılır.
                    </p>
                    <p>
                      <strong>Doktor reçetesi baskısı</strong>; özel muayenehaneler, diş hekimleri, poliklinikler ve sağlık merkezleri tarafından tercih edilen kurumsal matbuat ürünlerinden biridir. <strong>Reçete kağıdı baskısı</strong>, kurum logosu, unvan, iletişim bilgileri ve isteğe bağlı seri numarası ile kişiselleştirilebilir. Günümüzde <strong>e-reçete</strong> kullanımının yaygınlaşmasına rağmen, fiziki arşiv ve kurum içi süreçler için <strong>reçete kağıdı</strong> kullanımı devam etmektedir.
                    </p>
                  </div>
                </div>

                {/* 5.1 Doktor Promosyon Reçetesi ve Özel Ölçü Baskılar */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Doktor Promosyon Reçetesi ve Özel Ölçü Baskılar
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      <strong>Doktor promosyon reçetesi</strong>; ilaç firmaları, klinikler ve sağlık kuruluşları tarafından tercih edilen özel ölçülü matbuat ürünleridir. Standart A5 ve yarım boy ölçülerin yanı sıra 9x21 cm ve 10x20 cm gibi <strong>slim reçete</strong> ebatlarında da üretilebilmektedir. Kurum logosu, iletişim bilgileri ve özel tasarım detayları ile hazırlanabilir.
                    </p>
                  </div>
                </div>

                {/* 6. Reçete Baskı Fiyatları Nasıl Belirlenir? */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Reçete Baskı Fiyatları Nasıl Belirlenir?
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      Reçete baskı fiyatları; sipariş adedi, kağıt türü, baskı rengi ve numaratör tercihine göre değişmektedir. Mavi Basım olarak <strong>A5 reçete baskısı</strong>, <strong>yarım boy reçete baskısı</strong>, <strong>numaratörlü reçete koçanı</strong> ve <strong>otokopili reçete baskısı</strong> hizmetlerini doğrudan üretici fiyatlarıyla sunuyoruz. Özellikle <strong>doktor reçetesi baskısı</strong> ve klinik reçete koçanı ihtiyaçlarında uygun maliyetli çözümler sağlıyoruz.
                    </p>
                    <p>
                      <strong>Reçete koçanı fiyatları</strong> belirlenirken cilt sayısı, otokopili nüsha sayısı ve özel tasarım talepleri dikkate alınmaktadır. İstanbul'daki üretim tesisimizde hazırlanan <strong>reçete baskıları</strong> Türkiye'nin 81 iline gönderilmektedir.
                    </p>
                  </div>
                </div>

                {/* 3. Reçete Baskısı Sipariş Süreci */}
                <div id="uretim-sureci" className="scroll-mt-24 relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Reçete Baskısı Sipariş ve Üretim Süreci
                  </h2>
                  <p className="text-slate-650 text-sm md:text-base leading-relaxed font-medium mb-6">
                    Kurumsal matbu evrak siparişlerinizi hızlı ve hatasız tamamlamak için 4 adımlı standart matbaa sürecini uyguluyoruz:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 relative">
                      <span className="text-xs font-black text-primary bg-primary/10 px-2.5 py-1 rounded-full inline-block mb-2">1. ADIM</span>
                      <h3 className="font-bold text-slate-900 text-sm mb-1">Tasarım & Bilgi İletimi</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">Logo, unvan ve iletişim bilgilerinizi WhatsApp veya e-posta ile tarafımıza iletin.</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 relative">
                      <span className="text-xs font-black text-primary bg-primary/10 px-2.5 py-1 rounded-full inline-block mb-2">2. ADIM</span>
                      <h3 className="font-bold text-slate-900 text-sm mb-1">Ücretsiz PDF Prova</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">Grafik ekibimizce hazırlanan dizgi ve yerleşim provası onayınıza sunulur.</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 relative">
                      <span className="text-xs font-black text-primary bg-primary/10 px-2.5 py-1 rounded-full inline-block mb-2">3. ADIM</span>
                      <h3 className="font-bold text-slate-900 text-sm mb-1">Matbaa İmalatı</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">Onaylanan tasarım hamur veya otokopili kağıda basılır, ciltleme ve numaratör işlemleri yapılır.</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 relative">
                      <span className="text-xs font-black text-primary bg-primary/10 px-2.5 py-1 rounded-full inline-block mb-2">4. ADIM</span>
                      <h3 className="font-bold text-slate-900 text-sm mb-1">Hızlı Kargo Teslimatı</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">Özenle paketlenen koçanlar Türkiye'nin tüm illerine doğrudan kargolanır.</p>
                    </div>
                  </div>
                </div>

                {/* 4. Sağlık Kuruluşları İçin Diğer Baskı Ürünleri */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Kurumsal Diğer Matbu Baskı Ürünleri
                  </h2>
                  <p className="text-slate-650 text-sm md:text-base leading-relaxed font-medium mb-4">
                    Kurumunuzun tüm matbuat ve kağıt baskı ihtiyaçları için tesisimizde sunulan tamamlayıcı ürünler:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    <Link to="/antetli-kagit" className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary hover:bg-white transition-all text-center group flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">Antetli Kağıt</span>
                    </Link>
                    <Link to="/kartvizit" className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary hover:bg-white transition-all text-center group flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">Klinik Kartvizit</span>
                    </Link>
                    <Link to="/cepli-dosya" className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary hover:bg-white transition-all text-center group flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">Cepli Dosya</span>
                    </Link>
                    <Link to="/tutkalli-bloknot" className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary hover:bg-white transition-all text-center group flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">Tutkallı Bloknot</span>
                    </Link>
                    <Link to="/diplomat-zarf" className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary hover:bg-white transition-all text-center group flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">Diplomat Zarf</span>
                    </Link>
                    <Link to="/brosur" className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary hover:bg-white transition-all text-center group flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">Broşür</span>
                    </Link>
                  </div>
                </div>

                {/* Önemli Bilgilendirme Kutusu (Footer Öncesi) */}
                <div className="relative z-10 border-t border-gray-100 pt-6">
                  <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-xs md:text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 block mb-1">📌 Önemli Bilgilendirme:</strong>
                    Bu ürün, basılı matbuat kapsamında üretilmektedir. Mavi Basım; içerik oluşturma, düzenleme veya resmi kullanım onayı hizmeti sunmamaktadır. Siparişe konu tüm içeriklerin hukuki ve idari sorumluluğu sipariş veren kuruma aittir.
                  </div>
                </div>

                {/* EEAT & Editör Bilgisi */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-black text-sm flex items-center justify-center shrink-0">
                        MB
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Mavi Basım Matbaa İçerik Ekibi</div>
                        <div className="text-[11px] text-slate-500">Bu içerik, matbaa sektöründe 20+ yıllık baskı deneyimine sahip Mavi Basım üretim ekibi tarafından hazırlanmış ve kalite kontrol sürecinden geçirilmiştir.</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500 shrink-0">
                      <span>Son Güncelleme: {new Date().getFullYear()}</span>
                      <span>•</span>
                      <span>Topkapı 2. Matbaacılar Sitesi</span>
                    </div>
                  </div>
                </div>
              </>
            )}

        {/* SSS (FAQ) ALANI */}
          <div id="sss-bolumu" className="scroll-mt-24 mb-14 text-black">
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight mb-5 flex items-center gap-2">
              <span className="w-2.5 h-6 bg-secondary rounded-full" />
              {pathId === 'adisyon' ? "Sıkça Sorulan Sorular (SSS)" : "Sıkça Sorulan Sorular"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              {currentDetails.faqList.map((faq, idx) => (
                <div key={idx} className="h-full border border-gray-200 rounded-2xl p-5 bg-white shadow-xs text-black flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 md:text-base text-sm leading-snug mb-2 flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-2" />
                      <span>{faq.q}</span>
                    </h3>
                    <div className="h-px bg-gray-100 my-2.5 w-full" />
                    <p className="text-slate-650 md:text-sm text-xs leading-relaxed font-normal">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Güven ve Neden Mavi Basım Özet Kutusu */}
          <div className="mt-12 p-6 md:p-8 bg-slate-900 text-white rounded-3xl shadow-xl border border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                  <span className="w-2 h-6 bg-primary rounded-full" />
                  Mavi Basım İmalat Güvencesi
                </h3>
                <p className="text-xs md:text-sm text-slate-300 font-medium max-w-xl leading-relaxed">
                  Doğrudan imalathanemizden hızlı, güvenli ve kurumsal kalitede matbu evrak baskı çözümleri sunuyoruz.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 shrink-0">
                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 text-center">
                  <span className="block text-emerald-400 font-black text-sm mb-0.5">✓</span>
                  <span className="text-xs font-bold text-white">Yıllara Dayanan Üretim</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 text-center">
                  <span className="block text-emerald-400 font-black text-sm mb-0.5">✓</span>
                  <span className="text-xs font-bold text-white">Topkapı Üretim Tesisi</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 text-center">
                  <span className="block text-emerald-400 font-black text-sm mb-0.5">✓</span>
                  <span className="text-xs font-bold text-white">PDF Prova Onayı</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 text-center">
                  <span className="block text-emerald-400 font-black text-sm mb-0.5">✓</span>
                  <span className="text-xs font-bold text-white">Türkiye Geneli Kargo</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 text-center col-span-2 sm:col-span-1">
                  <span className="block text-emerald-400 font-black text-sm mb-0.5">✓</span>
                  <span className="text-xs font-bold text-white">Ücretsiz Grafik Desteği</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>{pageTitleForSEO}</title>
        <meta name="description" content={pageDescForSEO} />
      </Helmet>
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* 1. Küçük breadcrumb */}
        <nav className="text-xs font-medium text-slate-500 flex items-center gap-1.5 mb-4" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-800 font-semibold">Makbuz & Formlar</span>
        </nav>

        {/* 2. Tek H1 */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">
          Makbuz ve Form Baskı Fiyatları
        </h1>

        {/* 3. Metin */}
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-8 max-w-4xl">
          Adisyon, sipariş fişi, makbuz ve diğer matbu form fiyatlarını aynı sayfada inceleyebilirsiniz. İhtiyacınıza uygun cilt, nüsha ve baskı seçeneğini seçerek sipariş verebilirsiniz.
        </p>

        {/* 4. H2 ve 5. Sade Bağlantılar */}
        <div className="mb-10">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
            Fiyat Listesinde Yer Alan Ürünler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {MAKBUZ_QUICK_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="border border-slate-200 hover:border-slate-400 hover:bg-slate-50 rounded px-3 py-2 text-xs sm:text-sm font-medium text-slate-800 transition-colors block text-center sm:text-left"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* 12 Ürün Fiyat Tablosu */}
        <div className="space-y-12">
          {filteredData.map((item, idx) => (
            <div key={idx} id={item.id} className="scroll-mt-24">
              {item && <SiparisFisiHorizontalTable data={[item]} showDetailLink={true} />}
            </div>
          ))}
        </div>
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
  const currentDetails = data[0]?.id ? MAKBUZ_DETAILS[data[0].id] : undefined;

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

  const dynTitle = data.length === 1 ? `${data[0].title} Baskı Fiyatları` : "Cilt İşleri ve Form Baskıları";
  const seoTitle = `${dynTitle} - Mavi Basım`;
  const seoDesc = data.length === 1 
    ? `Otokopili kendinden karbonlu numaratörlü kurumsal ${data[0].title.toLowerCase()} baskısı. Topkapı fabrikasından matbaa fiyatı seçenekleri ve kargo.`
    : "Mavi Basım bünyesinde otokopili kendinden karbonlu numaratörlü tahsilat makbuzu, adisyon, sipariş fişi ve form cilt işleri baskısı. İmalattan hızlı teslimat.";

  const displayH1 = data.length === 1 
    ? `${data[0].title} Tasarım ve Matbaa Baskısı` 
    : "Cilt İşleri ve Form Baskıları";

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
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
                {displayH1}
              </h1>
              <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
              <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">
                {data.length === 1 ? `${data[0].ebat} Cilt İşleri` : "Fiyat Listesi"}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Delivery Date Banner */}
        <DeliveryBadge categoryKey="makbuz" days={4} variant="banner" className="mb-8" />

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
                                        className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-3 py-2 rounded-full text-xs font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                                      >
                                        <ShoppingCart size={12} className="shrink-0" />
                                        <span>Sipariş Ver</span>
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
                                <td className="p-4 font-black border-r border-gray-100 py-3 leading-normal">
                                  <div className="flex flex-col">
                                    <span>{row.label}</span>
                                    <span className="text-xs text-slate-500 font-medium normal-case mt-0.5">(İlave Her Renk İçin)</span>
                                  </div>
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
                  <div className="bg-slate-50 px-5 py-3 border-t border-gray-150 flex flex-col sm:flex-row justify-center items-center text-xs text-slate-500 font-medium font-sans">
                    <span>* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <RelatedBlogPosts category="makbuz" excludeImages={currentDetails?.gallery ? currentDetails.gallery.map(g => g.src) : []} />
      </div>
    </div>
  );
};
