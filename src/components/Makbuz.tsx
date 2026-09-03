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
          <thead>
            <tr className="bg-black text-white">
              <th className="p-4 border-r border-white/10 font-black text-left uppercase text-sm md:text-base whitespace-nowrap min-w-[140px]">
                {section.title.includes("ADİSYON") ? "ADET" : (section.ebat.includes("TAM BOY") || section.title.includes("SÖZLEŞME") || section.id === "arac-kiralama") ? "TAM BOY" : section.ebat.includes("KÜÇÜK BOY") ? "KÜÇÜK BOY" : "YARIM BOY"}
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
                  {row.label
                    .replace('1 Asl+1 Su.', '1 Asıl + 1 Suret')
                    .replace('1 Asl+2 Su.', '1 Asıl + 2 Suret')
                    .replace('1 Asl+3 Su.', '1 Asıl + 3 Suret')
                    .replace('1 Asl + 1 Su.', '1 Asıl + 1 Suret')
                    .replace('1 Asl + 2 Su.', '1 Asıl + 2 Suret')
                  }
                </td>
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
                <td className="p-4 border-r border-gray-200 font-black text-black text-sm md:text-base py-3 leading-normal">
                  <div className="flex flex-col">
                    <span>{row.label}</span>
                    <span className="text-xs text-slate-500 font-medium normal-case mt-0.5">(İlave Her Renk İçin)</span>
                  </div>
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
    ? "Numaratörlü Para Makbuzu Baskı Fiyatları | Mavi Basım"
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
        "contentUrl": `https://mavibasim.com${currentDetails.featureImage}`,
        "license": "https://mavibasim.com",
        "acquireLicensePage": `https://mavibasim.com/${pathId}`,
        "creditText": "Mavi Basım Topkapı Matbaa",
        "creator": { "@type": "Organization", "name": "Mavi Basım" },
        "copyrightNotice": "Mavi Basım Matbaacılık",
        "caption": currentDetails.featureImageAlt || currentDetails.h1Title
      },
      ...currentDetails.gallery.map(g => ({
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "contentUrl": `https://mavibasim.com${g.src}`,
        "license": "https://mavibasim.com",
        "acquireLicensePage": `https://mavibasim.com/${pathId}`,
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
          {imageObjectSchemas.map((imgSchema, idx) => (
            <script key={idx} type="application/ld+json">{JSON.stringify(imgSchema)}</script>
          ))}
          {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
        </Helmet>
        
        {/* Breadcrumb Alanı */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <nav className="text-xs font-bold text-gray-500 uppercase tracking-tight flex items-center gap-1.5" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <ChevronDown size={12} className="-rotate-90 text-gray-400 shrink-0" />
            <Link to="/makbuz-ve-formlar" className="hover:text-primary transition-colors">Makbuz & Formlar</Link>
            <ChevronDown size={12} className="-rotate-90 text-gray-400 shrink-0" />
            <span className="text-gray-800 font-extrabold truncate">{currentDetails.breadcrumbTitle}</span>
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
                    "Ücretsiz Grafik Tasarımı",
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
            <nav className={`grid ${pathId === 'para-makbuzu' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'} gap-2 text-xs font-bold text-slate-700`} aria-label="Sayfa İçindekiler Navigasyonu">
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
              {pathId !== 'para-makbuzu' && (
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
                <span className="text-primary group-hover:text-white font-black">{pathId === 'para-makbuzu' ? '5.' : '6.'}</span> Sıkça Sorulan Sorular
              </a>
            </nav>
          </div>

          {/* FİYAT LİSTESİ TABLOSU - BAŞTA BAŞLAR VE GENİŞLİĞİ DİĞERLERİYLE AYNIDIR */}
          <div id="fiyat-tablosu" className="scroll-mt-24 group mb-12">
            <div className="flex justify-between items-center mb-6 px-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-secondary rounded-full" />
                <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2 flex-wrap">
                  {pathId === 'adisyon' ? "Adisyon Fiyat Tablosu" : `${item ? item.title : currentDetails.breadcrumbTitle} - ${item ? item.ebat : "14 x 20 cm"} Fiyat Listesi`}
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
                          Otokopili gider makbuzu modellerinde üst nüshaya yazılan bilgiler alt nüshalara otomatik olarak aktarılır. Numaratörlü gider makbuzu seçeneklerinde ise her yaprak ardışık sıra numarası ile basılarak belge takibi kolaylaştırılır. İhtiyaca göre 1 asıl + 1 suret veya 1 asıl + 2 suret şeklinde üretilebilen gider makbuzu koçanları, düzenli kayıt tutmak isteyen işletmeler için pratik ve kullanışlı bir çözüm sunmaktadır.
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          Tahsilat makbuzu, işletmelerin müşterilerinden veya iş ortaklarından tahsil ettiği ödemeleri kayıt altına almak amacıyla düzenlediği resmi nitelikte bir ticari evraktır. Vergi Usul Kanunu kapsamında tek başına fatura yerine geçen bir belge olmamakla birlikte, işletmelerin iç muhasebe kayıtlarının düzenli tutulmasına, yapılan tahsilatların ispatına ve finansal hareketlerin kontrol edilmesine yardımcı olur.
                        </p>
                        <p>
                          Ön muhasebe süreçlerinde kullanılan tahsilat makbuzları; ödeme tarihinin, tahsil edilen tutarın, ödeme nedeninin ve taraf bilgilerinin kayıt altına alınmasını sağlar. Düzenli şekilde saklanan makbuzlar, hesap mutabakatlarında, şirket içi denetimlerde ve geçmiş işlemlerin incelenmesinde önemli bir referans niteliği taşır.
                        </p>
                        <p>
                          Tahsilat makbuzu kullanımı birçok sektörde yasal zorunluluk olmasa da belge düzenini sağlamak isteyen işletmeler tarafından yaygın olarak tercih edilmektedir. Toptan ve perakende ticaret firmaları, üreticiler, servis işletmeleri, sağlık kuruluşları, eğitim kurumları, emlak ofisleri, otomotiv sektörü ve çeşitli hizmet işletmeleri günlük tahsilat işlemlerini kayıt altına almak için bu belgelerden yararlanmaktadır.
                        </p>
                        <p>
                          Firmanın çalışma sistemine göre logo, iletişim bilgileri, ödeme şekli, açıklama alanları ve diğer kurumsal bilgiler eklenerek hazırlanan tahsilat makbuzları, hem profesyonel bir kurumsal görünüm sunar hem de işletme içindeki evrak düzeninin standart hale gelmesine katkı sağlar.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-150 rounded-[2rem] shadow-sm">
                  <h2 className="text-base md:text-lg font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-secondary rounded-full" />
                    {pathId === 'gider-makbuzu' ? 'Gider Makbuzu Nasıl Doldurulur?' : 'Tahsilat Makbuzu Nasıl Doldurulur?'}
                  </h2>
                  <div className="text-slate-650 text-sm leading-relaxed font-semibold space-y-4 text-left">
                    {pathId === 'gider-makbuzu' ? (
                      <>
                        <p>
                          Gider makbuzu nasıl doldurulur sorusu, özellikle işletmelerde belge düzenini sağlamak isteyen kişiler tarafından sıkça araştırılmaktadır. Gider makbuzu düzenlenirken öncelikle işlem tarihi eksiksiz şekilde belirtilmelidir. Daha sonra yapılan harcamaya veya ödemeye ilişkin açıklama bölümü doldurularak işlemin konusu açık ve anlaşılır şekilde yazılmalıdır. Ödeme tutarı rakam ve gerekli durumlarda yazı ile belirtilmeli, ilgili kişi veya firma bilgileri eksiksiz olarak eklenmelidir.
                        </p>
                        <p>
                          Bir gider makbuzu örneği incelendiğinde genellikle tarih, belge numarası, açıklama alanı, tutar bilgisi, firma unvanı ve imza bölümlerinin yer aldığı görülmektedir. İşletmeler ihtiyaçlarına göre bu alanlara ek sütunlar veya özel bilgiler de ekleyebilmektedir. Düzenli ve standart bir tasarım kullanılması, belgelerin daha kolay arşivlenmesini ve gerektiğinde hızlı şekilde bulunmasını sağlar.
                        </p>
                        <p>
                          Gider makbuzu üzerinde bulunması gereken bilgiler işletmenin kullanım amacına göre değişebilse de temel alanların eksiksiz doldurulması önemlidir. Belge numarası, işlem tarihi, ödeme veya harcama açıklaması, tutar bilgisi ve imza alanları en sık kullanılan bölümler arasında yer alır. Özellikle otokopili ve numaratörlü koçanlarda bilgilerin okunaklı şekilde yazılması, hem arşivleme hem de belge takibi açısından avantaj sağlar. Düzenli doldurulan gider makbuzları, işletmelerin kayıt süreçlerini daha kontrollü ve düzenli yürütmesine yardımcı olur.
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          Tahsilat makbuzu nasıl doldurulur sorusu, özellikle işletmelerde belge düzenini sağlamak isteyen kişiler tarafından sıkça araştırılmaktadır. Tahsilat makbuzu düzenlenirken öncelikle işlem tarihi eksiksiz şekilde belirtilmelidir. Daha sonra alınan ödemeye veya tahsilata ilişkin açıklama bölümü doldurularak işlemin konusu açık ve anlaşılır şekilde yazılmalıdır. Ödeme tutarı rakam ve gerekli durumlarda yazı ile belirtilmeli, ilgili kişi veya firma bilgileri eksiksiz olarak eklenmelidir.
                        </p>
                        <p>
                          Bir tahsilat makbuzu örneği incelendiğinde genellikle tarih, belge numarası, açıklama alanı, tutar bilgisi, firma unvanı ve imza bölümlerinin yer aldığı görülmektedir. İşletmeler ihtiyaçlarına göre bu alanlara ek sütunlar veya özel bilgiler de ekleyebilmektedir. Düzenli ve standart bir tasarım kullanılması, belgelerin daha kolay arşivlenmesini ve gerektiğinde hızlı şekilde bulunmasını sağlar.
                        </p>
                        <p>
                          Tahsilat makbuzu üzerinde bulunması gereken bilgiler işletmenin kullanım amacına göre değişebilse de temel alanların eksiksiz doldurulması önemlidir. Belge numarası, işlem tarihi, ödeme veya tahsilat açıklaması, tutar bilgisi ve imza alanları en sık kullanılan bölümler arasında yer alır. Özellikle otokopili ve numaratörlü koçanlarda bilgilerin okunaklı şekilde yazılması, hem arşivleme hem de belge takibi açısından avantaj sağlar. Düzenli doldurulan tahsilat makbuzları, işletmelerin kayıt süreçlerini daha kontrollü ve düzenli yürütmesine yardımcı olur.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sipariş Yönlendirme Açıklaması */}
          <div className="mb-8 bg-sky-50/50 border border-sky-100 rounded-[2rem] p-5 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
            <span className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-lg shrink-0 font-bold">💬</span>
            <div className="text-center sm:text-left">
              <h4 className="text-sm font-black text-slate-900 uppercase mb-0.5">Siparişinizi Nasıl Oluşturabilirsiniz?</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Fiyat listesinden seçtiğiniz adedin yanında yer alan <strong>"Hemen Sipariş Ver"</strong> butonuna tıkladığınızda WhatsApp hattımıza yönlendirilirsiniz. Siparişiniz için logo ve bilgilerinizi WhatsApp üzerinden göndermeniz yeterlidir. PDF prova onayınız alındıktan sonra üretim başlatılır.
              </p>
            </div>
          </div>

          {/* GÜVEN UNSURU DETAYLARI */}
          <div className="mb-12 bg-gray-50 border border-gray-200 rounded-[2rem] p-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-base shrink-0 font-bold">✓</span>
                <div>
                  <h4 className="text-sm font-black text-black uppercase mb-0.5">Ücretsiz Tasarım</h4>
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                    Mevcut logonuzla hazırlanan mizanpaj şablonu ve baskı provaları (en fazla 3 revizyona kadar) tamamen <strong>ücretsizdir</strong> (yeni logo ve kurumsal kimlik çizimi hariç).
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-base shrink-0 font-bold">✓</span>
                <div>
                  <h4 className="text-sm font-black text-black uppercase mb-0.5">Türkiye Geneli Kargo</h4>
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                    <strong>5.000 TL ve üzeri (KDV Hariç)</strong> siparişlerde kargo ücretsizdir. Altındaki siparişlerde alıcı ödemeli anlaşmalı indirimli kargo uygulanır.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-base shrink-0 font-bold">✓</span>
                <div>
                  <h4 className="text-sm font-black text-black uppercase mb-0.5">Onaylı Güvenli Baskı</h4>
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                    Hazırlanan PDF taslak tasarımı siz onaylamadan baskı işlemine girmez. PDF prova sayesinde baskı öncesi içerik ve yerleşim hatalarının önemli ölçüde önüne geçilir.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-base shrink-0 font-bold">✓</span>
                <div>
                  <h4 className="text-sm font-black text-black uppercase mb-0.5">Numaratör Dahil</h4>
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                    {pathId === 'adisyon'
                      ? "Fiyat tablosunda yer alan standart tek nüsha adisyon koçanlarında ardışık seri numaratör baskısı dahildir."
                      : `${currentDetails.breadcrumbTitle || "Ürün"} koçanlarında ardışık numaratör (seri no) baskısı liste fiyatımıza dahildir, ek ücret talep edilmez.`}
                  </p>
                </div>
              </div>
            </div>
          </div>


          {/* ÜRÜN FOTOĞRAF GALERİSİ */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6 px-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full" />
                <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                  {pathId === 'adisyon' ? "Numaratörlü Adisyon Baskı Örnekleri" : `${currentDetails.breadcrumbTitle} Ürün Fotoğraf Galerisi`}
                </h2>
              </div>
            </div>
            
            <div className={`grid gap-6 ${pathId === 'arac-kiralama' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
              {currentDetails.gallery.map((img, idx) => (
                <figure 
                  key={idx} 
                  className="bg-gray-50 border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:bg-white hover:shadow-md transition-all group"
                >
                                <DynamicImageContainer 
                    src={img.src} 
                    alt={img.alt} 
                    title={img.title} 
                    isTallLayoutDefault={isTallLayout}
                    className="mb-4"
                    imgClassName="group-hover:scale-105"
                  />
                  <div>
                    <h3 className="text-sm font-black text-black uppercase mb-1.5">{img.title}</h3>
                    <figcaption className="text-gray-550 text-xs font-medium leading-relaxed">
                      {img.desc}
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>
          </div>

          {(pathId === 'gider-makbuzu' || pathId === 'tahsilat-makbuzu') && (
            <div className="mb-12 bg-slate-50 border border-slate-150 rounded-[2rem] p-6 md:p-8 shadow-sm">
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-secondary rounded-full" />
                {pathId === 'gider-makbuzu' ? 'Gider Makbuzu Örnekleri' : 'Tahsilat Makbuzu Örnekleri'}
              </h2>
              <div className="text-slate-650 text-base leading-relaxed font-semibold space-y-4 text-left md:text-justify text-black">
                {pathId === 'gider-makbuzu' ? (
                  <>
                    <p>
                      Farklı sektörlerde kullanılan <strong>gider makbuzu örnekleri</strong>, firma ihtiyaçlarına göre tasarlanabilir. Şirket unvanı, iletişim bilgileri ve logo gibi firma bilgilerinin yer aldığı <strong>logolu gider makbuzu</strong> tasarımları, hem resmiyet kazandırır hem de marka bütünlüğünü her işlemde korumanıza yardımcı olur. Bu sayede işletmenizin <strong>gider makbuzu baskı</strong> gereksinimleri kurumsal bir standartta karşılanmış olur.
                    </p>
                    <p>
                      Belge takibinde ve nüshaların paylaşımında pratikliği artırmak için kendinden karbonlu kağıda basılan <strong>otokopili gider makbuzu baskı</strong> koçanları en çok tercih edilen modeller arasındadır. Yazılan bilgilerin alt nüshalara anında ve net şekilde geçmesi, muhasebe süreçlerini hızlandırır. Bununla birlikte, her bir belgenin kaybolmasını önlemek ve muhasebe kayıtlarını sıralı bir şekilde yürütebilmek adına ardışık seri numaralarıyla üretilen <strong>numaratörlü gider makbuzu baskı</strong> koçanları da evrak takibini hatasız yapmanızı sağlar.
                    </p>
                    <p>
                      İşletmenizin ihtiyaç duyduğu özelliklere sahip, kaliteli ve uzun ömürlü <strong>gider makbuzu bastırma</strong> süreçlerinizde Mavi Basım olarak profesyonel tasarım desteği sunmaktayız. Kurumsal standartlarınıza uygun nüsha sayısı, numaratör sırası ve boyut seçenekleriyle siparişlerinizi hızla hazırlayıp teslim ediyoruz.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Farklı sektörlerde kullanılan <strong>tahsilat makbuzu örnekleri</strong>, firma ihtiyaçlarına göre tasarlanabilir. Şirket unvanı, iletişim bilgileri ve logo gibi firma bilgilerinin yer aldığı <strong>logolu tahsilat makbuzu</strong> tasarımları, hem resmiyet kazandırır hem de marka bütünlüğünü her işlemde korumanıza yardımcı olur. Bu sayede işletmenizin <strong>tahsilat makbuzu baskı</strong> gereksinimleri kurumsal bir standartta karşılanmış olur.
                    </p>
                    <p>
                      Belge takibinde ve nüshaların paylaşımında pratikliği artırmak için kendinden karbonlu kağıda basılan <strong>otokopili tahsilat makbuzu baskı</strong> koçanları en çok tercih edilen modeller arasındadır. Yazılan bilgilerin alt nüshalara anında ve net şekilde geçmesi, ön muhasebe süreçlerini hızlandırır. Bununla birlikte, her bir belgenin kaybolmasını önlemek ve muhasebe kayıtlarını sıralı bir şekilde yürütebilmek adına ardışık seri numaralarıyla üretilen <strong>numaratörlü tahsilat makbuzu baskı</strong> koçanları da evrak takibini hatasız yapmanızı sağlar.
                    </p>
                    <p>
                      Tahsilat makbuzu örnekleri hazırlanırken her işletmenin çalışma şekli, bilgi alanları ve kurumsal kimliği dikkate alınır. Perakende mağazaları, üretim firmaları, servis işletmeleri, sağlık kuruluşları, eğitim kurumları ve çeşitli hizmet sektörleri ihtiyaçlarına göre farklı mizanpajlar tercih edebilmektedir. Firma logosu, vergi bilgileri, ödeme şekli, açıklama alanları, teslim eden ve teslim alan bölümleri gibi alanlar işletmenin kullanım alışkanlıklarına göre düzenlenebilir. Bu sayede hem belge düzeni standart hale gelir hem de günlük muhasebe ve arşiv işlemleri daha pratik şekilde yürütülebilir.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* GÖRSEL ALANI VE NÜSHA DETAYLARI - YAN YANA 3 SÜTUN */}
          <div className="mb-10">
            <div className={`bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm grid grid-cols-1 md:grid-cols-2 ${pathId === 'gider-makbuzu' || pathId === 'tahsilat-makbuzu' ? '' : 'lg:grid-cols-3'} gap-6 md:gap-8 items-stretch font-medium`}>
              {/* SÜTUN 1: GÖRSEL */}
              <figure className="flex flex-col justify-center items-center bg-white p-3 border border-gray-150 rounded-2xl shadow-sm w-fit mx-auto">
                <DynamicImageContainer 
                  src={currentDetails.featureImage} 
                  alt={currentDetails.featureImageAlt} 
                  title={currentDetails.featureImageAlt} 
                  isTallLayoutDefault={isTallLayout}
                  className="mb-2"
                  imgClassName="p-1 hover:scale-105"
                  isPriority={true}
                />
                <figcaption className="text-gray-550 text-[11px] mt-2.5 text-center font-bold leading-normal max-w-[280px]">
                  {pathId === 'adisyon'
                    ? "Önyüz yakın çekim. 14 × 20 cm standart numaratörlü adisyon koçanı örneği."
                    : `Önyüz yakın çekim. Otokopili numaratörlü ${currentDetails.breadcrumbTitle.toLowerCase()} koçanı ve baskı modeli.`}
                </figcaption>
              </figure>

              
              {/* SÜTUN 2: BASKI TANITIMI */}
              <div className="space-y-4 flex flex-col justify-start">
                <div>
                  <h2 className="text-lg font-black text-black uppercase tracking-tight mb-3">
                    {pathId === 'adisyon' ? "Neden Numaratörlü Adisyon Kullanılır?" : pathId === 'sozlesme-baski' ? "Numaratörlü Sözleşme Formu Özellikleri" : pathId === 'siparis-fisi' ? "Sipariş Fişi Öne Çıkan Avantajları" : pathId === 'para-makbuzu' ? "Para Makbuzu Öne Çıkan Avantajları" : "Ürün Öne Çıkan Özellikleri"}
                  </h2>
                  {pathId === 'adisyon' ? (
                    <ul className="space-y-2 text-gray-700 text-xs sm:text-sm font-semibold pl-1 list-none">
                      <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> Siparişlerin düzenli kayıt altına alınmasını sağlar.</li>
                      <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> Mutfak, bar ve kasa arası sipariş aktarımını düzenler.</li>
                      <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> Kurumsal logo ve iletişim bilgilerinizle kişiselleştirilir.</li>
                      <li className="flex items-center gap-2"><span className="text-primary font-bold">✓</span> Ardışık seri numaratör baskısı ile takip etmeyi kolaylaştırır.</li>
                    </ul>
                  ) : (pathId === 'siparis-fisi' || pathId === 'para-makbuzu') ? (
                    <ul className="space-y-2 text-gray-700 text-xs sm:text-sm font-bold pl-1 list-none">
                      <li className="flex items-center gap-2"><span className="text-emerald-600">✓</span> Otokopili kopyalama kâğıdı (karbon gerektirmez)</li>
                      <li className="flex items-center gap-2"><span className="text-emerald-600">✓</span> Kırmızı otomatik seri numaratör baskısı dahil</li>
                      <li className="flex items-center gap-2"><span className="text-emerald-600">✓</span> 1 asıl + 1, 2 veya 3 suret nüsha seçenekleri</li>
                      <li className="flex items-center gap-2"><span className="text-emerald-600">✓</span> Üstten tırtıklı perfore ve telli dikişli cilt</li>
                      <li className="flex items-center gap-2"><span className="text-emerald-600">✓</span> Ücretsiz mizanpaj ve baskı öncesi PDF prova</li>
                      <li className="flex items-center gap-2"><span className="text-emerald-600">✓</span> Türkiye geneli hızlı kargo teslimatı</li>
                    </ul>
                  ) : (
                    <ul className="space-y-2 text-gray-700 text-xs sm:text-sm font-bold pl-1 list-none">
                      {currentDetails.specifications.slice(0, 7).map((spec, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-primary">✓</span> {spec.title}: {spec.value}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* SÜTUN 3: ASIL VE SURET DETAYLARI */}
              {pathId !== 'gider-makbuzu' && pathId !== 'tahsilat-makbuzu' && (
                <div className="space-y-4 border-t border-gray-200 pt-4 md:border-t-0 md:pt-0 lg:border-l lg:pl-6 col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-center gap-4">
                  {pathId === 'adisyon' ? (
                    <div className="space-y-3">
                      <div className="flex items-start gap-2.5">
                        <div className="w-2.5 h-2.5 bg-slate-500 rounded-full mt-1.5 shrink-0" />
                        <p className="leading-relaxed text-xs sm:text-sm">
                          <strong className="text-slate-900 font-black uppercase text-xs block mb-0.5">Tek Nüsha Adisyon (100'lük Cilt):</strong> 
                          80 gr 1. hamur beyaz kâğıda basılır. Mutfak, kasa veya garson kullanımı için pratik standart koçandır.
                        </p>
                      </div>
                      <div className="border-t border-gray-200 pt-3 flex items-start gap-2.5">
                        <div className="w-2.5 h-2.5 bg-primary rounded-full mt-1.5 shrink-0" />
                        <p className="leading-relaxed text-xs sm:text-sm">
                          <strong className="text-primary font-black uppercase text-xs block mb-0.5">Otokopili Adisyon (50'lik Takım):</strong> 
                          Otokopili seçeneğinde kendinden karbonlu kâğıda basım yapılır. Üst nüshaya yazılanlar doğrudan alt kopyaya geçer.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start gap-2.5">
                        <div className="w-2.5 h-2.5 bg-primary rounded-full mt-1.5 shrink-0" />
                        <p className="leading-relaxed text-sm">
                          <strong className="text-primary font-black uppercase text-xs block mb-0.5">1 Asıl + 1 Suret (50x2 Cilt):</strong> 
                          Cilt başına toplam 100 yapraktan oluşur (50 asıl + 50 suret takımı). Üst yazılanlar alt nüshaya otomatik aktarılır.
                        </p>
                      </div>
                      <div className="border-t border-gray-200 pt-4 flex items-start gap-2.5">
                        <div className="w-2.5 h-2.5 bg-secondary rounded-full mt-1.5 shrink-0" />
                        <p className="leading-relaxed text-sm">
                          <strong className="text-secondary font-black uppercase text-xs block mb-0.5">1 Asıl + 2 Suret (50x3 Cilt):</strong> 
                          Cilt başına toplam 150 yapraktan oluşur (50 asıl + 100 suret takımı). Üst yazılanlar alt iki nüshaya birden aktarılır.
                        </p>
                      </div>
                      {filteredData.some(sec => sec.rows.some((r: any) => r.label.includes('1 Asl+3 Su.'))) && (
                        <div className="border-t border-gray-200 pt-4 flex items-start gap-2.5">
                          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                          <p className="leading-relaxed text-sm">
                            <strong className="text-emerald-600 font-black uppercase text-xs block mb-0.5">1 Asıl + 3 Suret (50x4 Cilt):</strong> 
                            Cilt başına toplam 200 yapraktan oluşur (50 asıl + 150 suret takımı). Muhasebe, müşteri ve acente kopyasını aynı anda dökerek alt üç nüshaya aktarır.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* TEKNİK ÖZELLİKLER */}
          <div id="ozellikler" className="scroll-mt-24 mb-12">
            <div className="flex justify-between items-center mb-6 px-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full" />
                <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                  {pathId === 'adisyon' ? 'Adisyon Standart ve Özel Seçenekleri' : pathId === 'sozlesme-baski' ? 'Teknik Bilgiler Tablosu' : pathId === 'recete' ? 'Reçete Koçanı Teknik Özellikleri' : 'Teknik Özellikler'}
                </h2>
              </div>
            </div>
            {pathId === 'adisyon' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl shadow-sm">
                  <h3 className="text-base md:text-lg font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="w-2 h-6 bg-primary rounded-full" />
                    Fiyat Tablosundaki Standart Adisyon Özellikleri
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm font-semibold text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <span className="text-primary font-bold">✓</span>
                      <div><strong className="text-black font-bold">Ebat:</strong> 14 × 20 cm</div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-primary font-bold">✓</span>
                      <div><strong className="text-black font-bold">Kâğıt Türü:</strong> 70–80 gr 1. Hamur Beyaz Kâğıt</div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-primary font-bold">✓</span>
                      <div><strong className="text-black font-bold">Cilt Yapısı:</strong> 100 Yaprak / Cilt (Tek Nüsha / Otokopisiz)</div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-primary font-bold">✓</span>
                      <div><strong className="text-black font-bold">Baskı Rengi:</strong> Tek Renk Kurumsal Baskı</div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-primary font-bold">✓</span>
                      <div><strong className="text-black font-bold">Numaratör:</strong> Ardışık Seri Numaralı Baskı (Fiyata Dahil)</div>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-blue-50/50 border border-blue-150 rounded-3xl shadow-sm">
                  <h3 className="text-base md:text-lg font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="w-2 h-6 bg-secondary rounded-full" />
                    Talebe Göre Üretilebilen Özel Seçenekler
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm font-semibold text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <span className="text-secondary font-bold">→</span>
                      <div><strong className="text-black font-bold">Farklı Ölçü:</strong> 10 × 14 cm veya özel ebat üretimi</div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-secondary font-bold">→</span>
                      <div><strong className="text-black font-bold">Otokopili Kâğıt:</strong> Kendinden karbonlu (1 asıl + 1 veya 2 suret) kâğıt</div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-secondary font-bold">→</span>
                      <div><strong className="text-black font-bold">Cilt Kapasitesi:</strong> Otokopililerde 50 Takım koçan imalatı</div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-secondary font-bold">→</span>
                      <div><strong className="text-black font-bold">Çok Renkli Baskı:</strong> Kurumsal logonuzun tüm renklerinde özel baskı</div>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (pathId === 'sozlesme-baski' || pathId === 'siparis-fisi' || pathId === 'para-makbuzu') ? (
              <div className="overflow-hidden border border-gray-150 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left border-collapse font-sans">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-150">
                      <th className="p-4 text-xs font-black text-slate-700 uppercase tracking-wider w-1/3">Özellik</th>
                      <th className="p-4 text-xs font-black text-slate-700 uppercase tracking-wider w-2/3">Açıklama</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150">
                    {(pathId === 'para-makbuzu' ? [
                      { key: "Ürün Türü", val: "Numaratörlü Otokopili Para Makbuzu Koçanı" },
                      { key: "Ebat / Ölçü", val: "14 × 20 cm (Yarım Boy Standart Ebat)" },
                      { key: "Kâğıt Türü", val: "1. Sınıf Kendinden Karbonlu Otokopi Kâğıdı" },
                      { key: "Cilt Kapasitesi", val: "50 Takım / Cilt" },
                      { key: "Nüsha Seçenekleri", val: "1 Asıl + 1 Suret, 1 Asıl + 2 Suret, 1 Asıl + 3 Suret" },
                      { key: "Baskı Yöntemi", val: "Heidelberg Ofset Baskı (Siyah, Lacivert veya Özel Renk)" },
                      { key: "Numaratör", val: "Kırmızı Otomatik Seri Numarası Baskısı (Dahil)" },
                      { key: "Cilt ve Perforaj", val: "Üstten Tel Dikişli & Tırtıklı Koparma Hattı" },
                      { key: "Tasarım Desteği", val: "Ücretsiz Mizanpaj ve PDF Prova Onayı" },
                      { key: "İmalat Süresi", val: "PDF Onayından Sonra 3–5 İş Günü" },
                      { key: "Minimum Sipariş", val: "5 Cilt" },
                      { key: "Teslimat", val: "Çift Oluklu Kolilerle Türkiye Geneli Kargo" }
                    ] : pathId === 'siparis-fisi' ? [
                      { key: "Ürün Türü", val: "Numaratörlü Otokopili Sipariş Fişi Koçanı" },
                      { key: "Ebat / Ölçü", val: "14 × 20 cm (Yarım Boy Standart Ebat)" },
                      { key: "Kâğıt Türü", val: "1. Sınıf Kendinden Karbonlu Otokopi Kâğıdı" },
                      { key: "Cilt Kapasitesi", val: "50 Takım / Cilt" },
                      { key: "Nüsha Seçenekleri", val: "1 Asıl + 1 Suret, 1 Asıl + 2 Suret, 1 Asıl + 3 Suret" },
                      { key: "Baskı Yöntemi", val: "Heidelberg Ofset Baskı (1 Renk veya Özel Pantone)" },
                      { key: "Numaratör", val: "Kırmızı Otomatik Seri Numarası Baskısı (Dahil)" },
                      { key: "Cilt ve Perforaj", val: "Üstten Tel Dikişli & Tırtıklı Koparma Hattı" },
                      { key: "Tasarım Desteği", val: "Ücretsiz Mizanpaj ve PDF Prova Onayı" },
                      { key: "İmalat Süresi", val: "PDF Onayından Sonra 3–5 İş Günü" },
                      { key: "Minimum Sipariş", val: "5 Cilt" },
                      { key: "Teslimat", val: "Çift Oluklu Kolilerle Türkiye Geneli Kargo" }
                    ] : [
                      { key: "Ürün Türü", val: "Numaratörlü Otokopili Sözleşme Koçanı" },
                      { key: "Ebat", val: "20,5 x 28,5 cm (A4 Net Bitmiş Boyut)" },
                      { key: "Baskı Tekniği", val: "Ofset Baskı" },
                      { key: "Kağıt Türü", val: "1. Sınıf Kendinden Karbonlu Otokopi Kağıdı" },
                      { key: "Nüsha Seçenekleri", val: "1 Asıl + 1 Suret, 1 Asıl + 2 Suret, 1 Asıl + 3 Suret" },
                      { key: "Numaratör", val: "Kırmızı Otomatik Seri Numaralı" },
                      { key: "Perfore", val: "Talebe Bağlı, Ücretsiz" },
                      { key: "Ciltleme", val: "Üstten Bezli Tutkallı Cilt" },
                      { key: "Tasarım Desteği", val: "Ücretsiz PDF Prova" },
                      { key: "Teslim Süresi", val: "3-5 İş Günü" }
                    ]).map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-slate-50/50" : "bg-slate-50/30 hover:bg-slate-50/55"}>
                        <td className="p-4 text-sm font-black text-slate-900">{row.key}</td>
                        <td className="p-4 text-sm font-semibold text-slate-650 leading-relaxed">{row.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentDetails.specifications.map((spec, idx) => (
                  <div key={idx} className="p-5 bg-white border border-gray-150 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="text-sm font-black text-slate-900 mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {spec.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-650 leading-relaxed">
                      {spec.value}
                    </p>
                    {spec.desc && (
                      <p className="text-[11px] font-medium text-slate-400 mt-2">
                        {spec.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {(pathId === 'gider-makbuzu' || pathId === 'tahsilat-makbuzu') && (
              <div className="mt-8 p-6 bg-slate-50 border border-slate-150 rounded-[2rem] shadow-sm">
                <h3 className="text-lg md:text-xl font-black text-black mb-3 uppercase tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-secondary rounded-full" />
                  {pathId === 'gider-makbuzu' ? 'Gider Makbuzu Teknik Baskı Özellikleri' : 'Tahsilat Makbuzu Teknik Baskı Özellikleri'}
                </h3>
                <div className="text-slate-650 text-sm md:text-base leading-relaxed font-semibold space-y-4">
                  {pathId === 'gider-makbuzu' ? (
                    <>
                      <p>
                        Gider makbuzu, işletmelerin yaptığı ödemeleri ve harcamaları kayıt altına almak için kullanılan önemli matbu evraklardan biridir. Mavi Basım tarafından üretilen gider makbuzu koçanları, firmanıza özel bilgilerle hazırlanır ve otokopili (kendinden karbonlu) kağıda basılır.
                      </p>
                      <p>
                        Üst nüshaya yazılan bilgiler alt nüshalara otomatik olarak aktarılır. Her yaprak sıralı numaratör ile basılarak belge takibi kolaylaştırılır. Perfore (tırtık) hattı sayesinde sayfalar düzenli şekilde kopartılabilir ve sağlam ciltleme sistemi uzun süreli kullanım sağlar.
                      </p>
                      <p>
                        Firmanızın logosu, unvanı, adres bilgileri ve vergi bilgileri baskıya eklenebilir. Baskı öncesinde ücretsiz dijital prova gönderilir and onay sonrasında üretime başlanır.
                      </p>
                      <p>
                        İş hayatında sıklıkla karıştırılan <strong>gider pusulası</strong> ile <strong>gider makbuzu koçanı</strong> aslında farklı kullanım amaçlarına sahip, apayrı iki mali belgedir. Gider pusulası vergi mükellefi olmayan kişilerden alınan mal ve hizmetleri belgelendirmek için düzenlenirken, gider makbuzları şirketlerin kendi iç muhasebe akışında veya kasa çıkışlarında ödemeleri izlemek için kullanılır.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Tahsilat makbuzu, işletmelerin aldığı ödemeleri ve tahsilatları kayıt altına almak için kullanılan en önemli matbu evraklardan biridir. Mavi Basım tarafından yüksek kalitede üretilen tahsilat makbuzu koçanları, firmanıza özel bilgilerle hazırlanır ve otokopili (kendinden karbonlu) kağıda basılır.
                      </p>
                      <p>
                        Üst nüshaya yazılan bilgiler alt nüshalara otomatik olarak aktarılır. Her yaprak sıralı numaratör ile basılarak belge takibi kolaylaştırılır. Perfore (tırtık) hattı sayesinde sayfalar düzenli şekilde kopartılabilir ve sağlam ciltleme sistemi uzun süreli kullanım ve arşivleme sağlar.
                      </p>
                      <p>
                        Firmanızın logosu, unvanı, adres bilgileri ve vergi bilgileri baskıya eklenebilir. Baskı öncesinde ücretsiz dijital prova gönderilir ve onay sonrasında üretime başlanır.
                      </p>
                      <p>
                        İş hayatında sıklıkla tamamlayıcısı olarak kullanılan <strong>tediye makbuzu</strong> ile <strong>tahsilat makbuzu koçanı</strong> aslında nakit akışını çift taraflı yönetmenizi sağlayan apayrı iki evraktır. Tahsilat makbuzu işletmenize para girişi olduğunda düzenlenirken, tediye makbuzu ise kasadan nakit ödemeler yapılırken tanzim edilir.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ÜRÜN AÇIKLAMALARI */}
          {pathId !== "para-makbuzu" && (
            <div className="bg-white border border-gray-150 rounded-3xl p-8 md:p-12 shadow-sm mb-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
              <div className="space-y-8 relative z-10">
                {/* GÜVEN VE DÖNÜŞÜM ROZETLERİ (TRUST & CONVERSION BADGES) */}
                <div className="p-4 bg-gradient-to-r from-blue-50/80 via-slate-50 to-indigo-50/80 border border-blue-100 rounded-2xl shadow-xs">
                  {pathId === 'adisyon' ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-3">
                        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center">
                          <span className="text-primary font-extrabold text-xs sm:text-sm">Ücretsiz Tasarım</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center">
                          <span className="text-emerald-600 font-extrabold text-xs sm:text-sm">24 Saat İçinde PDF Prova</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center">
                          <span className="text-amber-600 font-extrabold text-xs sm:text-sm">Numaratör Baskısı Dahil</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center">
                          <span className="text-blue-600 font-extrabold text-xs sm:text-sm">Türkiye’nin 81 İline Kargo</span>
                        </div>
                      </div>
                      <p className="text-center text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                        Logo ve bilgileriniz eksiksiz ulaştığında tasarım provaları çoğunlukla aynı iş günü veya 24 saat içinde hazırlanır. PDF prova sayesinde baskı öncesi içerik ve yerleşim hatalarının önemli ölçüde önüne geçilir.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 text-center mb-3">
                        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center">
                          <span className="text-emerald-600 font-extrabold text-xs sm:text-sm">Bugün Sipariş Verin</span>
                          <span className="text-[11px] text-slate-500 font-medium mt-0.5">Aynı Gün Tasarım</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center">
                          <span className="text-primary font-extrabold text-xs sm:text-sm">24 Saat İçinde PDF Prova</span>
                          <span className="text-[11px] text-slate-500 font-medium mt-0.5">WhatsApp Onaylı</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center">
                          <span className="text-blue-600 font-extrabold text-xs sm:text-sm">81 İle Hızlı Kargo</span>
                          <span className="text-[11px] text-slate-500 font-medium mt-0.5">Özenli Paketleme</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center">
                          <span className="text-amber-600 font-extrabold text-xs sm:text-sm">Yüksek Baskı Kalitesi</span>
                          <span className="text-[11px] text-slate-500 font-medium mt-0.5">İmalatçı Garantisi</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center col-span-2 sm:col-span-1">
                          <span className="text-indigo-600 font-extrabold text-xs sm:text-sm">Ücretsiz Tasarım</span>
                          <span className="text-[11px] text-slate-500 font-medium mt-0.5">Kurumsal Logolu</span>
                        </div>
                      </div>
                      <p className="text-center text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                        {pathId === 'recete' 
                          ? "Mavi Basım, kurumsal kullanım amaçlı reçete koçanı baskı hizmeti ve matbu evrak imalatı sunmaktadır."
                          : "Mavi Basım, işletmeler için numaratörlü ve otokopili matbu koçan baskıları üretmektedir."
                        }
                      </p>
                    </>
                  )}
                </div>

                {pathId !== 'gider-makbuzu' && pathId !== 'tahsilat-makbuzu' && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-black mb-3 uppercase tracking-tight flex items-center gap-2">
                      {currentDetails.whatIsTitle}
                    </h2>
                    <p className="text-slate-650 text-base leading-relaxed mb-4 font-medium">
                      {currentDetails.whatIsContent}
                    </p>
                  </div>
                )}

                {pathId === 'adisyon' && (
                  <>
                    <div id="uretim-sureci" className="scroll-mt-24 border-t border-gray-100 pt-8">
                      <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                        Numaratörlü Adisyon Siparişi ve Üretim Süreci
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5">
                          <div className="w-8 h-8 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center mb-3">1</div>
                          <h3 className="text-sm font-black text-black uppercase mb-1">Adet ve Özellik Seçimi</h3>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">Fiyat tablosundan ihtiyacınız olan cilt adetini belirleyin.</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5">
                          <div className="w-8 h-8 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center mb-3">2</div>
                          <h3 className="text-sm font-black text-black uppercase mb-1">WhatsApp Üzerinden İletişim</h3>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">Sipariş butonuna tıklayarak firmanıza ait logo ve detayları bize iletin.</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5">
                          <div className="w-8 h-8 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center mb-3">3</div>
                          <h3 className="text-sm font-black text-black uppercase mb-1">Ücretsiz Tasarım Onayı</h3>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">Grafik ekibimizin hazırladığı adisyon taslağını onaylayın.</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5">
                          <div className="w-8 h-8 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center mb-3">4</div>
                          <h3 className="text-sm font-black text-black uppercase mb-1">Üretim ve Teslimat</h3>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">Onaylanan adisyon koçanları 3–5 iş günü içinde basılarak adresinize kargolanır.</p>
                        </div>
                      </div>
                    </div>

                    <div id="kimler-kullanir" className="scroll-mt-24 border-t border-gray-100 pt-8">
                      <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                        {currentDetails.whoUsesTitle || "Kimler Adisyon Kullanır?"}
                      </h2>
                      <p className="text-slate-650 text-base leading-relaxed mb-4 font-medium">
                        Adisyon koçanları, masa ve sipariş takibi yapan yeme-içme ve ağırlama işletmelerinde yaygın olarak kullanılır:
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                        {currentDetails.whoUsesItems.map((itemStr, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 bg-slate-50 border border-slate-150 p-3 rounded-xl font-bold text-slate-800 text-xs sm:text-sm">
                            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                            <span>{itemStr}</span>
                          </div>
                        ))}
                      </div>
                      <h3 className="text-lg font-black text-black mb-3 uppercase tracking-tight">
                        Adisyon Koçanının İşletmeler İçin Avantajları
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 border border-gray-150 rounded-2xl p-5 flex items-start gap-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <div>
                            <h3 className="text-sm font-black text-black mb-1">Düzenli Hesap ve Sipariş Takibi</h3>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">Sipariş akışının düzenli yürütülmesine yardımcı olur.</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-150 rounded-2xl p-5 flex items-start gap-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <div>
                            <h3 className="text-sm font-black text-black mb-1">Numaratör ile Güvenli Kayıt</h3>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">Ardışık numaralar sayesinde kayıp veya eksik adisyon takibini kolaylaştırır.</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-150 rounded-2xl p-5 flex items-start gap-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <div>
                            <h3 className="text-sm font-black text-black mb-1">Kurumsal Kimliğe Uygun Baskı</h3>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">Firmanıza ait logo ve bilgiler tüm koçanlarda standart olarak yer alabilir.</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-150 rounded-2xl p-5 flex items-start gap-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <div>
                            <h3 className="text-sm font-black text-black mb-1">Hızlı ve Pratik Kullanım</h3>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed">Otokopili seçeneklerde kendinden kopyalı kâğıt yapısı sayesinde alt nüshaya anında kopyalama sağlar.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}


                  {pathId === 'sozlesme-baski' && (
                    <>
                      <div id="kimler-kullanir" className="scroll-mt-24 mt-6 pt-6 border-t border-gray-100">
                        <h3 className="text-lg md:text-xl font-black text-black mb-3 uppercase tracking-tight">
                          Otokopili Sözleşme Baskı Hizmeti
                        </h3>
                        <p className="text-slate-650 text-base leading-relaxed font-semibold">
                          Otokopili sözleşme baskı ürünleri, işletmelerin satış, üyelik, kiralama ve hizmet süreçlerinde kullandıkları önemli kurumsal evraklar arasında yer almaktadır. Mavi Basım tarafından üretilen numaratörlü sözleşme koçanı baskıları; firma logosu, iletişim bilgileri ve özel şartnameler eklenerek tamamen kuruma özel hazırlanır.
                        </p>
                        <p className="text-slate-650 text-base leading-relaxed font-semibold mt-4">
                          İstanbul Topkapı Matbaacılar Sitesi'ndeki üretim tesisimizde hazırlanan sözleşme koçanı baskı siparişleri; İstanbul, Ankara, İzmir, Bursa, Antalya, Konya, Adana ve Türkiye'nin 81 iline gönderilmektedir. İsteğe bağlı olarak tek nüsha, çift nüsha veya çok nüshalı otokopili sözleşme baskı seçenekleri sunulmaktadır.
                        </p>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <h2 className="text-xl md:text-2xl font-black text-black mb-3 uppercase tracking-tight">
                          Firma Logolu Sözleşme Koçanı Baskı
                        </h2>
                        <p className="text-slate-650 text-base leading-relaxed font-medium">
                          Kurumsal kimliğinizi yansıtan firma logolu sözleşme koçanları; üyelik işlemleri, hizmet satışları, araç kiralama, eğitim kayıtları ve emlak işlemlerinde profesyonel görünüm sağlar. Firmanıza özel hazırlanan sözleşme formları logo, adres, iletişim bilgileri ve özel maddelerle baskıya hazırlanır.
                        </p>
                      </div>
                    </>
                  )}

                {pathId !== 'adisyon' && pathId !== 'sozlesme-baski' && pathId !== 'gider-makbuzu' && pathId !== 'tahsilat-makbuzu' && pathId !== 'tediye-makbuzu' && pathId !== 'siparis-fisi' && pathId !== 'para-makbuzu' && (
                  <div id="kimler-kullanir" className="scroll-mt-24 border-t border-gray-100 pt-8">
                    <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                      {currentDetails.whoUsesTitle}
                    </h2>
                    <p className="text-slate-650 text-base leading-relaxed mb-4 font-medium">
                      {pathId === 'tediye-makbuzu'
                        ? "Tediye makbuzu birçok işletme tarafından ödeme kayıtlarının tutulması amacıyla kullanılır:"
                        : pathId === 'recete'
                        ? "Özel muayenehaneler, klinikler ve sağlık kuruluşlarının kurumsal matbuat ihtiyaçlarına yönelik üretilmektedir:"
                        : `${currentDetails.breadcrumbTitle}, kayıtların düzenli tutulması ve evrak takibi amacıyla birçok işletme tarafından kullanılır:`}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-slate-800 text-sm md:text-base font-bold pl-2">
                      {pathId === "sozlesme-baski" ? (
                        <>
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] shrink-0">➔</span>
                            <Link to="/sozlesme-baski?type=spor-salonu" className="text-black hover:text-emerald-700 hover:underline transition-all font-bold">
                              Spor Salonları ve Fitness Merkezleri
                            </Link>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] shrink-0">➔</span>
                            <Link to="/sozlesme-baski?type=emlak-formlari" className="text-black hover:text-emerald-700 hover:underline transition-all font-bold">
                              Emlak ve Gayrimenkul Ofisleri
                            </Link>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] shrink-0">➔</span>
                            <Link to="/arac-kiralama" className="text-black hover:text-emerald-700 hover:underline transition-all font-bold">
                              Araç Kiralama Firmaları
                            </Link>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] shrink-0">➔</span>
                            <Link to="/sozlesme-baski?type=guzellik" className="text-black hover:text-emerald-700 hover:underline transition-all font-bold">
                              Güzellik Merkezleri
                            </Link>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] shrink-0">➔</span>
                            <Link to="/siparis-fisi" className="text-black hover:text-emerald-700 hover:underline transition-all font-bold">
                              Teknik Servis Firmaları
                            </Link>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] shrink-0">➔</span>
                            <Link to="/sozlesme-baski?type=egitim" className="text-black hover:text-emerald-700 hover:underline transition-all font-bold">
                              Eğitim Kurumları
                            </Link>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] shrink-0">➔</span>
                            <Link to="/sozlesme-baski?type=saglik" className="text-black hover:text-emerald-700 hover:underline transition-all font-bold">
                              Sağlık ve Danışmanlık Merkezleri
                            </Link>
                          </div>
                        </>
                      ) : (
                        currentDetails.whoUsesItems.map((itemStr, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] shrink-0">➔</span>
                            <span>{itemStr}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {pathId !== 'adisyon' && pathId !== 'para-makbuzu' && pathId !== 'siparis-fisi' && pathId !== 'recete' && pathId !== 'gider-makbuzu' && pathId !== 'tahsilat-makbuzu' && (
                  <div id="uretim-sureci" className="scroll-mt-24 border-t border-gray-100 pt-8">
                    <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                      {currentDetails.breadcrumbTitle} Sipariş ve Üretim Süreci
                    </h2>
                    <p className="text-slate-650 text-base leading-relaxed mb-6 font-medium">
                      Tüm kurumsal matbu evrak siparişleriniz grafik tasarımdan kargoya kadar 4 adımlı standart kalite sürecinden geçer:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5">
                        <div className="w-8 h-8 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center mb-3">1</div>
                        <h3 className="text-sm font-black text-black uppercase mb-1">Adet ve Nüsha Seçimi</h3>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">İhtiyacınıza uygun cilt adedini ve nüsha sayısını fiyat tablosundan belirleyin.</p>
                      </div>
                      <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5">
                        <div className="w-8 h-8 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center mb-3">2</div>
                        <h3 className="text-sm font-black text-black uppercase mb-1">WhatsApp İletişim</h3>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">Firmanızın logosunu, unvan ve iletişim bilgilerini WhatsApp hattımıza iletin.</p>
                      </div>
                      <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5">
                        <div className="w-8 h-8 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center mb-3">3</div>
                        <h3 className="text-sm font-black text-black uppercase mb-1">Ücretsiz PDF Prova</h3>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">Grafik ekibimizin hazırladığı baskı şablonunu ve numaratör konumunu onaylayın.</p>
                      </div>
                      <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5">
                        <div className="w-8 h-8 rounded-xl bg-primary text-white font-black text-sm flex items-center justify-center mb-3">4</div>
                        <h3 className="text-sm font-black text-black uppercase mb-1">Ofset Baskı ve Teslimat</h3>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">Heidelberg ofset makinelerimizde basılıp ciltlenen koçanlarınız kargoya verilir.</p>
                      </div>
                    </div>
                  </div>
                )}

                {pathId !== 'adisyon' && pathId !== 'gider-makbuzu' && pathId !== 'tahsilat-makbuzu' && pathId !== 'para-makbuzu' && (
                  <div className="border-t border-gray-100 pt-8">
                    <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                      {currentDetails.usageAreasTitle}
                    </h2>
                    <p className="text-slate-650 text-base leading-relaxed mb-6 font-medium">
                      {pathId === 'sozlesme-baski'
                        ? "Firma logolu ve seri numaralı sözleşme formları, işlemlerin düzenli şekilde kayıt altına alınmasına ve arşivlenmesine yardımcı olur:"
                        : `Firma logolu ve numaratörlü ${currentDetails.breadcrumbTitle.toLowerCase()} koçanları, işlemlerin kayıt altına alınmasına ve arşivlenmesine yardımcı olur:`}
                    </p>
                    <div className="space-y-4">
                      {currentDetails.usageAreasItems.map((area, idx) => (
                        <div key={idx} className="bg-gray-50 border border-gray-150 rounded-2xl p-5">
                          <h3 className="text-sm font-black text-black mb-1.5">{area.title}</h3>
                          <p className="text-gray-600 text-xs md:text-sm font-medium leading-relaxed">
                            {area.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DÖNÜŞÜM / LEAD CTA BLOĞU */}
          <div className={`${pathId === 'gider-makbuzu' || pathId === 'tahsilat-makbuzu' ? 'hidden' : ''} bg-gradient-to-br from-gray-50 to-white border-2 border-emerald-500/20 rounded-3xl p-8 md:p-10 shadow-sm mb-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8`}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50/50 rounded-full -mr-24 -mt-24 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16 blur-xl pointer-events-none" />
            
            <div className="relative z-10 space-y-4 max-w-xl text-center md:text-left">
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs md:text-sm px-3.5 py-1 rounded-full font-black uppercase tracking-wider">
                Hızlı Tasarım Desteği
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight leading-tight">
                {pathId === "sozlesme-baski" ? "Sözleşme" : currentDetails.breadcrumbTitle} Tasarımınız Hazır mı?
              </h2>
              <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
                PDF, Word veya eski {pathId === "sozlesme-baski" ? "sözleşme" : currentDetails.breadcrumbTitle.toLowerCase()} örneğinizi bize gönderin.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
                <div className="flex items-center gap-2 bg-white/60 border border-gray-100 px-3 py-2 rounded-xl text-xs md:text-sm font-bold text-gray-800">
                  <span className="text-emerald-600 text-base">✓</span>
                  <span>Ücretsiz kontrol</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 border border-gray-150 px-3 py-2 rounded-xl text-xs md:text-sm font-bold text-gray-800">
                  <span className="text-emerald-600 text-base">✓</span>
                  <span>Baskıya uygun düzenleme</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 border border-gray-150 px-3 py-2 rounded-xl text-xs md:text-sm font-bold text-gray-800">
                  <span className="text-emerald-600 text-base">✓</span>
                  <span>Hızlı fiyat teklifi</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 shrink-0 flex flex-col items-center gap-3 w-full md:w-auto">
              <div className="text-center md:text-right w-full md:w-auto">
                <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Müşteri Hattı</span>
                <span className="block text-lg md:text-xl font-black text-black tracking-tight flex items-center gap-1.5 justify-center md:justify-end">
                  <Phone size={16} className="text-emerald-600 shrink-0" />
                  WhatsApp: 0536 602 23 73
                </span>
              </div>
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent(`Merhaba, ${pathId === "sozlesme-baski" ? "sözleşme" : currentDetails.breadcrumbTitle.toLowerCase()} baskısı için tasarım örneğimiz var. Kontrol edip fiyat teklifi verebilir misiniz?`)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full text-sm md:text-base font-black tracking-tight transition-all shadow-lg hover:shadow-emerald-500/20 hover:scale-105 active:scale-95 duration-200"
              >
                <Phone size={18} className="fill-current rotate-12 shrink-0" />
                <span>WhatsApp'tan Teklif Al</span>
              </a>
            </div>
          </div>

          {/* ALAKALI ÜRÜNLER (İÇ LİNKLER) */}
          {pathId !== "arac-kiralama" && (
            <div className="bg-gray-50 border border-gray-150 rounded-3xl p-6 md:p-8 mb-14">
              <h2 className="text-lg md:text-xl font-black text-black uppercase tracking-tight mb-4 flex items-center gap-2">
                <span className="w-2 h-5 bg-primary rounded-full" />
                İlginizi Çekebilecek Diğer Baskı Ürünlerimiz
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getRelatedProducts(pathId).map((rel, rIdx) => (
                  <Link key={rIdx} to={rel.path} className="bg-white border border-gray-150 rounded-2xl p-4 hover:border-primary/40 hover:shadow-md transition-all text-center flex flex-col justify-center items-center group">
                    <span className="text-black font-black text-sm uppercase group-hover:text-primary transition-colors text-center">{rel.label}</span>
                    <span className="text-gray-500 text-[11px] mt-1 font-bold">{rel.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* DETAYLI BİLGİLENDİRME VE REHBER ALANI */}
          <div className="bg-white border border-gray-150 rounded-3xl p-8 md:p-12 shadow-sm mb-14 relative overflow-hidden space-y-12 text-black">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />

            {/* EK GÖRSEL BLOĞU */}
            <div className="relative z-10 bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-5 bg-secondary rounded-full" />
                <h3 className="text-lg md:text-xl font-black text-black uppercase tracking-tight">{pathId === 'sozlesme-baski' ? 'Kurumsal Sözleşme Koçanı Tasarımı' : `${currentDetails.breadcrumbTitle} Örneği`}</h3>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-stretch">
                <figure className="w-fit shrink-0 overflow-hidden rounded-xl border border-gray-150 bg-white p-3 flex flex-col items-center justify-center mx-auto md:max-w-md lg:max-w-lg">
                  <DynamicImageContainer 
                    src={currentDetails.gallery[1]?.src || currentDetails.featureImage} 
                    alt={pathId === 'sozlesme-baski' ? 'Kurumsal Sözleşme Formu Şablonu' : pathId === 'arac-kiralama' ? 'araç teslim tutanağı örneği' : pathId === 'sigorta-policeleri' ? 'sigorta teklif formu örneği' : `${currentDetails.breadcrumbTitle} Şablonu`} 
                    title={pathId === 'sozlesme-baski' ? 'Kurumsal Sözleşme Formu Şablonu' : pathId === 'arac-kiralama' ? 'Araç Teslim Tutanağı Örneği' : pathId === 'sigorta-policeleri' ? 'Sigorta Teklif Formu Örneği' : `${currentDetails.breadcrumbTitle} Şablonu`} 
                    isTallLayoutDefault={isTallLayout}
                    className="mb-2"
                    imgClassName="p-1 hover:scale-105"
                  />
                  <figcaption className="text-gray-550 text-[11px] mt-2.5 text-center font-bold leading-normal text-gray-650">
                    {pathId === 'gider-makbuzu' || pathId === 'tahsilat-makbuzu'
                      ? `Örnek ${pathId === 'gider-makbuzu' ? 'gider' : 'tahsilat'} makbuzu tasarımı üzerinde tarih, unvan, miktar ve tutar alanları gösterilmektedir.`
                      : pathId === 'adisyon'
                      ? `Örnek adisyon tasarımı üzerinde tarih, ürün, miktar ve tutar alanları gösterilmektedir.`
                      : pathId === 'sozlesme-baski'
                      ? 'Örnek otokopili sözleşme tasarımı üzerinde tarih, unvan, imzalar ve şartnameler gösterilmektedir.'
                      : `Örnek ${currentDetails.breadcrumbTitle.toLowerCase()} tasarımı üzerinde tarih, unvan, adet ve ıslak imza alanları gösterilmektedir.`}
                  </figcaption>
                </figure>
                <div className="flex-1 flex flex-col justify-center space-y-4">
                  {pathId === 'gider-makbuzu' || pathId === 'tahsilat-makbuzu' ? (
                    <>
                      <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
                        Sitemizde incelediğiniz <strong>{pathId === 'gider-makbuzu' ? 'gider' : 'tahsilat'} makbuzu örneği</strong>, firmanıza göre uyarlanabilir bir şablon sunmaktadır. Hazırlanacak olan <strong>{pathId === 'gider-makbuzu' ? 'gider' : 'tahsilat'} makbuzu koçanı</strong> üzerindeki tüm tablo alanları, logo konumlandırması ve renk tercihleri firmanıza özel olarak tasarlanır.
                      </p>
                      <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
                        Elinizde halihazırda kullandığınız veya internetten bulduğunuz bir <strong>boş {pathId === 'gider-makbuzu' ? 'gider' : 'tahsilat'} makbuzu</strong> tasarımı varsa, uzman grafik ekibimiz bu çalışmayı logonuzla entegre ederek baskıya hazır hale getirir. Sıfırdan profesyonel bir <strong>{pathId === 'gider-makbuzu' ? 'gider' : 'tahsilat'} makbuzu bastırma</strong> hizmeti almak isteyen müşterilerimiz için de sektörel standartlara uygun mizanpaj desteği sağlıyoruz.
                      </p>
                    </>
                  ) : pathId === 'adisyon' ? (
                    <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
                      Adisyon basımı siparişlerinizde firma logonuz, adres bilgileriniz ve masa düzeninize uygun sütun alanları kurumsal kimliğinize özel olarak hazırlanmaktadır.
                    </p>
                  ) : (
                    <>
                      <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
                        {pathId === 'sozlesme-baski'
                          ? "Sözleşme tasarımlarınız, firma logonuz ve kurumsal şartlarınıza göre uyarlanarak baskıya hazırlanmaktadır."
                          : pathId === 'arac-kiralama'
                          ? "Araç kiralama sözleşmesi ve teslim tutanağı tasarımlarınız, markanıza özel logo ve hukuki maddelerinize uygun olarak hazırlanır."
                          : pathId === 'recete'
                          ? "Siparişe konu matbu evraklar, müşteri tarafından iletilen bilgi ve içeriklere göre baskıya hazırlanır."
                          : `${currentDetails.breadcrumbTitle} siparişlerinizde, firma bilgilerine göre düzenlenerek baskıya hazırlanır.`}
                      </p>
                      <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
                        {pathId === 'arac-kiralama'
                          ? "Örnek hasar şeması ve kiralama şartları alanları, firmanızın ihtiyaçlarına göre tamamen özelleştirilebilir."
                          : "Bu örnek şablon ihtiyaçlarınıza ve kurumsal şartlarınıza göre revize edilebilir."}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {pathId === 'recete' && (
                <div className="mt-8 pt-8 border-t border-gray-200/85 space-y-4">
                  <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2">
                    <span className="w-2 h-6 bg-secondary rounded-full" />
                    Reçete Kağıdı Örneği ve Şablonları
                  </h2>
                  <p className="text-gray-650 text-sm md:text-base font-medium leading-relaxed">
                    <strong>Reçete kağıdı örneği</strong>; tarih alanı, hasta bilgileri, kurum unvanı, doktor bilgileri ve imza bölümlerinden oluşan standart bir yerleşime sahiptir. Müşterilerimizin talebi doğrultusunda mevcut <strong>boş reçete örneği</strong> veya <strong>reçete örneği PDF</strong> şablonları üzerinden yeni baskı çalışmaları hazırlanabilmektedir.
                  </p>
                  <div className="pt-2">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                      Reçete Örneği PDF ve Boş Reçete Şablonları
                    </h3>
                    <p className="text-gray-650 text-sm md:text-base font-medium leading-relaxed">
                      Kurumunuza özel hazırlanan <strong>boş reçete örneği</strong> ve <strong>reçete örneği PDF</strong> dosyaları dijital baskı öncesinde tarafınıza iletilerek taslak onayı alınmaktadır.
                    </p>
                  </div>
                </div>
              )}

              {currentDetails.extraSampleTitle && currentDetails.extraSampleContent && (
                <div className="mt-8 pt-8 border-t border-gray-200/85 space-y-4">
                  <h4 className="text-base md:text-lg font-black text-black uppercase tracking-tight flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-3 bg-secondary rounded-full" />
                    {currentDetails.extraSampleTitle}
                  </h4>
                  {currentDetails.extraSampleContent.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-gray-650 text-sm md:text-base font-medium leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {(pathId === 'gider-makbuzu' || pathId === 'tahsilat-makbuzu') && (
              <div id="kimler-kullanir" className="scroll-mt-24 relative z-10 border-t border-gray-100 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-secondary rounded-full" />
                  {pathId === 'gider-makbuzu' ? 'Özel Tasarım Gider Makbuzu Baskı ve Kullanım Alanları' : 'Özel Tasarım Tahsilat Makbuzu Baskı ve Kullanım Alanları'}
                </h2>
                <div className="text-slate-650 text-base leading-relaxed font-semibold space-y-4 text-left md:text-justify text-black">
                  {pathId === 'gider-makbuzu' ? (
                    <>
                      <p>
                        Her firmanın kullandığı evrak yapısı ve bilgi alanları farklılık gösterebilir. Bu nedenle <strong>gider makbuzu baskı</strong> işlemleri hazır şablonlarla sınırlı kalmadan, talep edilen alanlara göre özel olarak tasarlanabilmektedir. Firma logosu, iletişim bilgileri, vergi bilgileri, açıklama alanları ve özel tablolar baskıya eklenebilir.
                      </p>
                      <p>
                        Otokopili ve numaratörlü olarak üretilebilen özel tasarım gider makbuzu koçanları, kullanım alışkanlıklarına uygun şekilde hazırlanır. 1 asıl + 1 suret veya 1 asıl + 2 suret seçenekleriyle üretim yapılabilir. İstenilen başlangıç numarası uygulanabilir ve baskı öncesinde PDF prova onayı alınarak <strong>gider makbuzu baskısı</strong> çalışması kesinleştirilebilir.
                      </p>
                      <p>
                        Logolu ve özel tasarımlı gider makbuzu baskıları, belge düzeninin korunmasına yardımcı olurken firmanıza özgü bir kullanım kolaylığı da sağlar. Profesyonel kalitede <strong>gider makbuzu bastırma</strong> ve hızlı sipariş süreçlerimizle firmanızın tüm matbu evrak ihtiyaçlarını karşılıyoruz.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Her işletmenin kullandığı tahsilat makbuzu aynı yapıda olmak zorunda değildir. İş akışınıza uygun olarak ihtiyaç duyduğunuz bilgi alanları eklenebilir, gereksiz bölümler kaldırılabilir ve tamamen firmanıza özel bir mizanpaj hazırlanabilir. Böylece belge düzeni hem daha pratik hale gelir hem de günlük kullanımda zaman kazandırır.
                      </p>
                      <p>
                        Özel tasarım çalışmalarda ödeme şekli (nakit, kredi kartı, havale/EFT), IBAN bilgisi, QR kod, açıklama alanı, teslim eden ve teslim alan bölümleri, kaşe alanı, cari hesap kodu, proje numarası, sipariş numarası veya firmanızın kullandığı diğer özel bilgi alanları makbuza eklenebilmektedir. İstenirse farklı sütun yapıları, ek tablolar ve kurumsal renk düzeni de uygulanabilir.
                      </p>
                      <p>
                        Hazırlanan tasarım, firmanızın çalışma sistemine uygun şekilde düzenlenerek baskıya hazır hale getirilir. Böylece kullanılan tahsilat makbuzu sadece ödeme kaydı oluşturan bir evrak olmaktan çıkar, işletmenizin muhasebe ve belge yönetim süreçlerine uygun, tamamen size özel bir çalışma haline gelir.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {(pathId === 'gider-makbuzu' || pathId === 'tahsilat-makbuzu') && (
              <div className="relative z-10 border-t border-gray-100 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-secondary rounded-full" />
                  {pathId === 'gider-makbuzu' ? 'Gider Makbuzu Baskı ve Bastırma Hizmeti' : 'Tahsilat Makbuzu Baskı ve Bastırma Hizmeti'}
                </h2>
                <div className="text-slate-650 text-base leading-relaxed font-semibold space-y-4 text-left md:text-justify text-black">
                  {pathId === 'gider-makbuzu' ? (
                    <>
                      <p>
                        <strong>Gider makbuzu baskı</strong> hizmeti, harcama ve ödeme kayıtlarını düzenli şekilde takip etmek isteyen firmalar tarafından tercih edilmektedir. Kullanım amacına göre hazırlanan gider makbuzu koçanları, otokopili ve numaratörlü olarak üretilebilmektedir. Firmanızın logo, unvan og iletişim bilgileri baskıya eklenerek kullanıma hazır hale getirilir.
                      </p>
                      <p>
                        <strong>Otokopili gider makbuzu baskı</strong> seçeneklerinde üst nüshaya yazılan bilgiler alt nüshalara otomatik olarak aktarılır. Bu sayede karbon kağıdı kullanmadan hızlı ve pratik bir kullanım elde edilir. <strong>Numaratörlü gider makbuzu baskı</strong> modellerinde ise her yaprak ardışık sıra numarası ile basılarak evrak takibi kolaylaştırılır.
                      </p>
                      <p>
                        <strong>Logolu gider makbuzu baskı</strong> çözümleri, firma bilgilerinin tüm koçanlarda standart şekilde yer almasını sağlar. İhtiyaca göre 1 asıl + 1 suret veya 1 asıl + 2 suret olarak üretim yapılabilmektedir. <strong>Gider makbuzu bastırma</strong> sürecinde baskı öncesi tasarım kontrolü yapılarak çalışma onaya sunulur ve onay sonrasında üretime alınır.
                      </p>
                      <p>
                        Farklı ölçü, nüsha ve <strong>gider makbuzu baskı</strong> seçenekleriyle hazırlanan ürünler, günlük evrak düzeninin sağlanmasına ve kayıt süreçlerinin daha düzenli yürütülmesine yardımcı olur.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Tahsilat makbuzu baskı süreci, onaylanan tasarımın üretime hazırlanmasıyla başlar. Baskıda kullanılan kağıt türü, nüsha sayısı, baskı rengi ve ciltleme özellikleri sipariş detaylarına göre belirlenir. Üretim aşamasında baskı kalitesi, sayfa hizalaması ve kesim ölçüleri kontrol edilerek tüm koçanların aynı standartta hazırlanması sağlanır.
                      </p>
                      <p>
                        Baskısı tamamlanan makbuzlar, ciltleme ve kalite kontrol işlemlerinin ardından paketlenerek sevkiyata hazır hale getirilir. Sipariş öncesinde belirlenen başlangıç numarası, özel bilgi alanları ve diğer üretim detayları baskı sırasında uygulanır. Böylece teslim edilen tüm koçanlar kullanıma hazır şekilde hazırlanmış olur.
                      </p>
                      <p>
                        Standart ölçülerin yanı sıra işletmenizin talep ettiği farklı ebatlarda ve özel mizanpajlarda üretim yapılabilmektedir. Hazırlanan ürünler güvenli şekilde paketlenerek Türkiye'nin her yerine kargo ile gönderilir ve teslimat öncesinde son kalite kontrol aşamasından geçirilir.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {(pathId === 'gider-makbuzu' || pathId === 'tahsilat-makbuzu') && (
              <div id="uretim-sureci" className="scroll-mt-24 relative z-10 border-t border-gray-100 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-secondary rounded-full" />
                  {pathId === 'gider-makbuzu' ? 'Gider Makbuzu Siparişi ve Üretim Süreci' : 'Tahsilat Makbuzu Siparişi ve Üretim Süreci'}
                </h2>
                <div className="text-slate-650 text-base leading-relaxed font-semibold space-y-4 text-left md:text-justify text-black">
                  <p>
                    {pathId === 'gider-makbuzu' ? (
                      <>
                        <strong>Gider makbuzu siparişi</strong> vermek için firmanızın logosunu, iletişim bilgilerini ve talep ettiğiniz nüsha sayısını iletmeniz yeterlidir. İhtiyacınıza göre <strong>otokopili gider makbuzu</strong> veya <strong>numaratörlü gider makbuzu</strong> seçenekleri hazırlanabilir. <strong>Özel tasarım gider makbuzu</strong> çalışmalarında tüm alanlar firmanıza göre düzenlenebilir. Onaylanan tasarım sonrasında <strong>gider makbuzu basımı</strong> süreci başlatılır ve baskılar kısa sürede üretime alınır.
                      </>
                    ) : (
                      <>
                        <strong>Tahsilat makbuzu siparişi</strong> vermek için firmanızın logosunu, iletişim bilgilerini ve talep ettiğiniz nüsha sayısını iletmeniz yeterlidir. İhtiyacınıza göre <strong>otokopili tahsilat makbuzu</strong> veya <strong>numaratörlü tahsilat makbuzu</strong> seçenekleri hazırlanabilir. <strong>Özel tasarım tahsilat makbuzu</strong> çalışmalarında tüm alanlar firmanıza göre düzenlenebilir. Onaylanan tasarım sonrasında <strong>tahsilat makbuzu basımı</strong> süreci başlatılır ve baskılar kısa sürede üretime alınır.
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}

            {pathId !== 'arac-kiralama' ? (
              <div id="nasil-doldurulur" className={`scroll-mt-24 relative z-10 grid grid-cols-1 ${pathId === 'gider-makbuzu' ? '' : 'md:grid-cols-2'} gap-8 border-t border-gray-100 pt-8`}>
                {/* Nasıl Doldurulur? */}
                <div className={pathId === 'gider-makbuzu' ? 'max-w-4xl' : ''}>
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    {pathId === 'gider-makbuzu' ? 'Gider Makbuzu Nasıl Doldurulur?' : currentDetails.howToFillTitle}
                  </h2>
                  {pathId === 'gider-makbuzu' ? (
                    <div className="text-slate-650 text-base leading-relaxed font-semibold space-y-4 text-left md:text-justify">
                      <p>
                        Gider makbuzu düzenlenirken işlem tarihi, açıklama bilgisi ve ödeme tutarı eksiksiz şekilde belirtilmelidir. Yapılan harcamanın konusu açık ve anlaşılır olarak yazılmalı, gerekli durumlarda firma bilgileri ve imza alanları doldurulmalıdır.
                      </p>
                      <p>
                        Standart bir gider makbuzu üzerinde tarih, belge numarası, açıklama alanı, tutar bilgisi ve imza bölümleri bulunur. İşletmeler ihtiyaçlarına göre bu alanları genişletebilir veya özel tablo düzenleri oluşturabilir.
                      </p>
                      <p>
                        Otokopili gider makbuzu koçanlarında üst nüshaya yazılan bilgiler alt nüshalara otomatik olarak aktarılır. Numaratörlü gider makbuzu modellerinde ise her yaprak ardışık sıra numarası ile basılarak evrak takibi kolaylaştırılır. Düzenli ve okunaklı şekilde doldurulan gider makbuzları, işletmelerin muhasebe ve arşiv süreçlerini daha düzenli yürütmesine yardımcı olur.
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-3 pl-1">
                      {currentDetails.howToFillContent.map((para, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-slate-650 text-base leading-relaxed font-medium">
                          <span className="text-primary mt-1.5 shrink-0 text-xs">•</span>
                          <span>{para}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Bulunması Gereken Bilgiler */}
                {pathId !== 'gider-makbuzu' && (
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                      {currentDetails.requiredInfoTitle}
                    </h2>
                    <ul className="space-y-3 pl-1">
                      {currentDetails.requiredInfoContent.map((para, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-slate-650 text-base leading-relaxed font-medium">
                          <span className="text-primary mt-1.5 shrink-0 text-xs">•</span>
                          <span>{para}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : null}

            {pathId === 'para-makbuzu' && (
              <>
                {/* BU ÜRÜN KİMLER İÇİN ÜRETİLİYOR? */}
                <div id="kimler-kullanir" className="scroll-mt-24 relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="w-2 h-7 bg-primary rounded-full" />
                    Bu Ürün Kimler İçin Üretiliyor?
                  </h2>
                  <p className="text-slate-650 text-sm md:text-base leading-relaxed mb-6 font-semibold">
                    Numaratörlü ve otokopili para makbuzu koçanları, elden nakit ödeme, kapora, borç ve teslimat kaydı tutan tüm kurum ve işletmeler tarafından tercih edilmektedir:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { title: "Emlak ve Gayrimenkul Ofisleri", desc: "Müşterilerden alınan emlak kaporaları ve kira teslimatlarının yazılı belgesi için." },
                      { title: "İnşaat Firmaları ve Şantiyeler", desc: "Şantiye nakit harcamaları ve taşeron avans ödemelerini kayıt altına almak için." },
                      { title: "Avukatlar ve Hukuk Büroları", desc: "Müvekkillerden alınan masraf avansları ve nakit tahsilatların dökümü için." },
                      { title: "Muhasebe ve Mali Müşavirler", desc: "Mükellef masraf ve harç ödemelerinin kayıt altına alınması için." },
                      { title: "Dernekler, Vakıflar ve Kulüpler", desc: "Makbuz karşılığı nakit bağış, aidat ve katılım payı ödemelerini belgelemek için." },
                      { title: "Oto Galeriler ve Araç Satışı", desc: "Araç alım-satım kaporaları ve peşinat ödemelerini güvenle arşivlemek için." },
                      { title: "Organizasyon Firmaları", desc: "Etkinlik, düğün ve kiralama kaporalarının resmi ve düzenli kaydı için." },
                      { title: "Toptan ve Perakende Ticaret", desc: "Saha kuryeleri, teslimat elemanları ve elden yapılan nakit tahsilatlar için." }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between hover:border-primary/40 hover:bg-white transition-all shadow-2xs">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                            <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight">{item.title}</h3>
                          </div>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* GERÇEK ÜRETİM SÜRECİ */}
                <div id="uretim-sureci" className="scroll-mt-24 relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="w-2 h-7 bg-emerald-600 rounded-full" />
                    Gerçek Üretim Süreci
                  </h2>
                  <p className="text-slate-650 text-sm md:text-base leading-relaxed mb-6 font-semibold">
                    Para makbuzu siparişiniz grafik tasarımdan adresinize teslim edilene kadar 6 aşamalı yüksek kalitede matbaa imalat sürecinden geçer:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { step: "01", title: "CTP Kalıp Pozlama", desc: "PDF provası onaylanan tasarımlarınız yüksek çözünürlüklü termal CTP kalıplara sıfır hatayla pozlanır." },
                      { step: "02", title: "Heidelberg Ofset Baskı", desc: "Alman kalitesi Heidelberg ofset baskı makinelerimizde kurumsal renginiz net ve canlı olarak basılır." },
                      { step: "03", title: "Otomatik Kırmızı Numaratör", desc: "Seri ve sıra takibini sağlayan 6 haneli kırmızı numaratör baskısı yüksek hassasiyetle vurulur." },
                      { step: "04", title: "Hassas Perforaj (Tırtık)", desc: "Sayfaların koçandan pürüzsüz ve kolayca kopması için tırtıklı perforaj hattı çekilir." },
                      { step: "05", title: "Tel Dikiş & Ciltleme", desc: "Koçanın dağılmasını önleyen telli dikiş, dip tutkal ve sırta bez kaplama dikiş cilt yapılır." },
                      { step: "06", title: "Kalite Kontrol & Paketleme", desc: "Numaratör sırası ve sayfa adedi kontrol edilerek koruyucu çift oluklu kolilerde adresinize kargolanır." }
                    ].map((step, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-2 right-3 text-3xl font-black text-slate-100 select-none">{step.step}</div>
                        <div className="relative z-10">
                          <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight mb-2 flex items-center gap-2">
                            <span className="w-5 h-5 rounded-lg bg-emerald-100 text-emerald-800 font-black text-[10px] flex items-center justify-center">{step.step}</span>
                            {step.title}
                          </h3>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* İLGİLİ MATBU EVRAKLAR & İÇ LİNKLEME */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    <span className="w-2 h-7 bg-blue-600 rounded-full" />
                    İlgili Matbu Evrak Ürünleri & Makaleler
                  </h2>
                  <p className="text-slate-650 text-sm md:text-base leading-relaxed mb-6 font-semibold">
                    Kasa ve muhasebe süreçlerinizin eksiksiz yürümesi için para makbuzu ile birlikte sıklıkla tercih edilen diğer otokopili matbu evrak çözümlerimiz:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: "Tahsilat Makbuzu", path: "/tahsilat-makbuzu", desc: "Müşterilerden alınan ödeme ve alacakların resmi kayıt altına alınması için." },
                      { title: "Tediye Makbuzu", path: "/tediye-makbuzu", desc: "Kasadan tedarikçi ve üçüncü şahıslara yapılan nakit çıkışlarının belgelenmesi için." },
                      { title: "Gider Makbuzu", path: "/gider-makbuzu", desc: "Şirket içi harcama ve küçük masrafların düzenli kaydı için." },
                      { title: "Sipariş Fişi", path: "/siparis-fisi", desc: "Alınan ürün ve hizmet siparişlerinin detaylı takibi için." },
                      { title: "Adisyon Baskı", path: "/adisyon", desc: "Hizmet ve gıda sektörüne özel masasal adisyon takibi için." },
                      { title: "Servis Formu", path: "/arac-kiralama", desc: "Teknik servis ve teslimat süreçlerinin kayıt altına alınması için." }
                    ].map((linkItem, idx) => (
                      <Link key={idx} to={linkItem.path} className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-500/50 p-4 rounded-2xl transition-all shadow-2xs group flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{linkItem.title}</h3>
                            <span className="text-blue-600 font-black text-xs group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">{linkItem.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* PARA MAKBUZU İLE TAHSİLAT/TEDİYE MAKBUZU ARASINDAKİ FARK */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Para Makbuzu ile Tahsilat ve Tediye Makbuzu Arasındaki Farklar
                  </h2>
                  <div className="text-slate-700 text-xs md:text-sm leading-relaxed font-medium space-y-3 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
                    <p>
                      <strong>Para makbuzu;</strong> iki taraf veya şahıs arasında kapora, emanet, borç ve nakit teslimatlarında anlık yazılı mutabakat sağlayan ve işlemlerin kayıt altına alınmasına yardımcı olan özel bir ticari belgedir.
                    </p>
                    <p>
                      <strong>Tahsilat makbuzu;</strong> işletmenize giren nakit veya çek tahsilatlarını temsil ederken, <strong>tediye makbuzu</strong> ise şirket kasasından çıkan ödemelerin karşı tarafça teslim alındığını belgelendirir.
                    </p>
                    <p>
                      Para makbuzu koçanlarımız kendinden karbonlu otokopi kâğıdına, kırmızı seri numaralı ve firma logonuz basılı olarak 5 ciltten başlayan miktarlarla üretilmektedir.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Karşılaştırma Farkı */}
            {pathId !== "para-makbuzu" && pathId !== "sozlesme-baski" && currentDetails.comparisonTitle && currentDetails.comparisonTableRows && (
              <div className="relative z-10 border-t border-gray-100 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                  {currentDetails.comparisonTitle}
                </h2>
                {pathId !== 'adisyon' && (
                  <p className="text-slate-650 text-base leading-relaxed font-medium mb-6">
                    İşlemlerin karmaşasını önlemek adına, her ticari matbu formun kendine has kullanım kuralları ve özellikleri mevcuttur. Farkları net şekilde görebilmek amacıyla hazırlanan tablo size yol gösterecektir:
                  </p>
                )}

                {/* Tablo */}
                <div className="overflow-x-auto mb-6 border border-gray-200 rounded-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-4 font-black text-sm text-black">Özellik</th>
                        <th className="p-4 font-black text-sm text-black">{currentDetails.breadcrumbTitle}</th>
                        <th className="p-4 font-black text-sm text-black">{getSubHeaderName(pathId)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentDetails.comparisonTableRows.map((row, rIdx) => (
                        <tr key={rIdx} className={`border-b border-gray-200/60 ${rIdx % 2 === 1 ? 'bg-gray-50/30' : ''}`}>
                          <td className="p-4 font-bold text-xs md:text-sm text-gray-900">{row.label}</td>
                          <td className="p-4 text-xs md:text-sm text-gray-700">{row.col1}</td>
                          <td className="p-4 text-xs md:text-sm text-gray-700">{row.col2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {(pathId === 'gider-makbuzu' || pathId === 'tahsilat-makbuzu') && (
              <div className="relative z-10 border-t border-gray-100 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                  İlgili Matbu Evrak Ürünleri
                </h2>
                <div className="text-slate-650 text-base leading-relaxed font-semibold space-y-4 text-left md:text-justify text-black">
                  {pathId === 'gider-makbuzu' ? (
                    <>
                      <p>
                        Gider makbuzu, işletmelerin harcama ve ödeme kayıtlarını düzenli şekilde takip etmesini sağlayan önemli bir matbu evrak türüdür. Ancak günlük iş akışlarında yalnızca gider makbuzu kullanımı yeterli olmayabilir. Muhasebe, finans, satış ve operasyon süreçlerinde farklı amaçlara hizmet eden tamamlayıcı matbu formlara da ihtiyaç duyulur.
                      </p>
                      <p>
                        <strong><Link to="/makbuz/tahsilat-makbuzu" className="font-extrabold text-primary hover:underline">Tahsilat Makbuzu</Link></strong>, müşterilerden alınan nakit, çek veya havale ödemelerinin kayıt altına alınması amacıyla kullanılır. Özellikle düzenli tahsilat yapan işletmeler için belge takibi ve arşivleme açısından önemli avantajlar sağlar. Otokopili ve numaratörlü olarak hazırlanabilen tahsilat makbuzu koçanları, ön muhasebe süreçlerinin daha düzenli yürütülmesine yardımcı olur.
                      </p>
                      <p>
                        <strong><Link to="/makbuz/tediye-makbuzu" className="font-extrabold text-primary hover:underline">Tediye Makbuzu</Link></strong> ise şirket kasasından yapılan ödemelerin teslim edildiğini belgelemek amacıyla kullanılır. Tedarikçilere, çalışanlara veya iş ortaklarına yapılan ödemelerin kayıt altına alınmasını sağlayan bu formlar, şirket içi mali kontrol açısından önemli bir evraktır.
                      </p>
                      <p>
                        <strong><Link to="/makbuz/para-makbuzu" className="font-extrabold text-primary hover:underline">Para Makbuzu</Link></strong>, daha küçük ölçekli nakit teslimlerinde tercih edilen pratik bir belgedir. Personel avansları, emanet para teslimleri veya günlük nakit işlemlerinde kullanılabilir. Düzenli kayıt tutulmasını sağlayarak olası karışıklıklerin önüne geçer.
                      </p>
                      <p>
                        <strong><Link to="/makbuz/adisyon" className="font-extrabold text-primary hover:underline">Adisyon</Link></strong> ve <strong><Link to="/makbuz/siparis-fisi" className="font-extrabold text-primary hover:underline">Sipariş Fişi</Link></strong> ürünleri ise restoran, kafe, lokanta ve perakende işletmelerinde yoğun olarak kullanılmaktadır. Müşteri siparişlerinin eksiksiz alınması, ürün adetlerinin takip edilmesi ve servis süreçlerinin düzenli ilerlemesi açısından önemli bir görev üstlenirler.
                      </p>
                      <p>
                        Mavi Basım, otokopili gider makbuzu, numaratörlü gider makbuzu ve logolu gider makbuzu üretimlerinde uzmanlaşmış bir matbaa firmasıdır. İşletmenize özel hazırlanan gider makbuzu koçanı tasarımları, kullanım alışkanlıklarınıza göre düzenlenebilmektedir. Gider makbuzu basımı sürecinde ücretsiz tasarım desteği sağlanırken, onaylanan çalışmalar kısa sürede baskıya alınmaktadır. Türkiye'nin her yerinden gider makbuzu siparişi verebilir ve ürünlerinizi güvenli şekilde teslim alabilirsiniz.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Tahsilat makbuzu, işletmelerin müşterilerinden aldıkları ödeme ve tahsilatları düzenli şekilde kayıt altına almasını sağlayan vazgeçilmez bir matbu evraktır. Günlük iş akışlarında finansal süreçlerin sağlıklı takibi için sadece tahsilat makbuzu değil, diğer tamamlayıcı muhasebe ve kayıt belgelerine de ihtiyaç duyulmaktadır.
                      </p>
                      <p>
                        <strong><Link to="/makbuz/gider-makbuzu" className="font-extrabold text-primary hover:underline">Gider Makbuzu</Link></strong>, işletme dışı yapılan harcamaları ve nakit ödemeleri belgelemek için düzenlenirken; <strong><Link to="/makbuz/tediye-makbuzu" className="font-extrabold text-primary hover:underline">Tediye Makbuzu</Link></strong>, kasadan çıkan nakit ödemelerin alıcısı tarafından teslim alındığını kayıt altına almak üzere düzenlenir.
                      </p>
                      <p>
                        <strong><Link to="/makbuz/para-makbuzu" className="font-extrabold text-primary hover:underline">Para Makbuzu</Link></strong>, personelden personele veya anlık küçük emanet nakit akışlarında pratik bir kayıt çözümü sunar. <strong><Link to="/makbuz/adisyon" className="font-extrabold text-primary hover:underline">Adisyon</Link></strong> ve <strong><Link to="/makbuz/siparis-fisi" className="font-extrabold text-primary hover:underline">Sipariş Fişi</Link></strong> ise hizmet sektöründeki sipariş ve servis süreçlerinin noksansız takibini sağlar.
                      </p>
                      <p>
                        Mavi Basım olarak; kurumsal logolu, kendinden karbonlu otokopili ve seri numaralı tahsilat makbuzu koçanlarının basımında uzman kadromuz ve ücretsiz grafik tasarım desteğimizle hizmet veriyoruz. İstanbul Topkapı'daki tesisimizde üretilen kaliteli evraklarınızı Türkiye'nin tüm bölgelerine güvenli kargo ile ulaştırıyoruz.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {(pathId === 'gider-makbuzu' || pathId === 'tahsilat-makbuzu') && (
              <div className="relative z-10 border-t border-gray-100 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-secondary rounded-full" />
                  {pathId === 'gider-makbuzu' ? 'Gider Makbuzu ile Gider Pusulası Arasındaki Farklar' : 'Tahsilat Makbuzu ile Tediye Makbuzu Arasındaki Farklar'}
                </h2>
                <div className="text-slate-650 text-base leading-relaxed font-semibold space-y-4 text-left md:text-justify text-black">
                  {pathId === 'gider-makbuzu' ? (
                    <>
                      <p>
                        Gider makbuzu ve gider pusulası farklı amaçlarla kullanılan iki ayrı belgedir. Gider makbuzu, yapılan harcamaların ve ödemelerin kayıt altına alınmasına yardımcı olan matbu evraktır. Belge düzeninin sağlanması, ödeme kayıtlarının takip edilmesi ve arşivleme işlemlerinde kullanılır.
                      </p>
                      <p>
                        Gider pusulası ise Vergi Usul Kanunu kapsamında belirli durumlarda düzenlenen resmi bir belgedir. Genellikle vergi mükellefi olmayan kişilerden mal veya hizmet alınması halinde kullanılır. Bu nedenle gider pusulası ile gider makbuzu aynı belge değildir.
                      </p>
                      <p>
                        Kısaca, gider makbuzu işletme içi kayıt düzenine yardımcı olurken gider pusulası belirli ticari işlemlerin yasal olarak belgelendirilmesi amacıyla düzenlenmektedir.
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        Tahsilat makbuzu ve tediye makbuzu işletmelerin nakit akışını yönetirken kullandıkları birbirini tamamlayan iki ayrı belgedir. Tahsilat makbuzu, şirkete herhangi bir kaynaktan para girişi olduğunda (müşteri ödemesi, tahsilat, vb.) düzenlenir ve nakit teslim alındığını belgeler.
                      </p>
                      <p>
                        Tediye makbuzu ise şirket kasasından dışarıya bir ödeme yapıldığında (tedarikçi ödemesi, personel avansı, vb.) düzenlenir ve nakdin karşı tarafa teslim edildiğini belgeler.
                      </p>
                      <p>
                        Özetle, tahsilat makbuzu nakit girişini (para alımını) kayıt altına alırken, tediye makbuzu nakit çıkışını (para ödemesini) belgelemek amacıyla düzenlenmektedir.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Önem / Numaratör */}
            {pathId !== "para-makbuzu" && pathId !== "gider-makbuzu" && pathId !== "tahsilat-makbuzu" && currentDetails.importanceTitle && currentDetails.importanceContent && (
              <div className="relative z-10 border-t border-gray-100 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                  {currentDetails.importanceTitle}
                </h2>
                <p className="text-slate-650 text-base leading-relaxed font-medium">
                  {currentDetails.importanceContent}
                </p>
              </div>
            )}

            {/* Otokopi */}
            {pathId !== "para-makbuzu" && pathId !== "gider-makbuzu" && pathId !== "tahsilat-makbuzu" && currentDetails.otokopiTitle && currentDetails.otokopiContent && (
              <div className="relative z-10 border-t border-gray-100 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                  {currentDetails.otokopiTitle}
                </h2>
                <p className="text-slate-650 text-base leading-relaxed font-medium">
                  {currentDetails.otokopiContent}
                </p>
              </div>
            )}

            {pathId === 'sozlesme-baski' && (
              <div className="relative z-10 border-t border-gray-100 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                  Otokopili Sözleşme Baskı Siparişi
                </h2>
                <p className="text-slate-650 text-base leading-relaxed font-medium">
                  Otokopili sözleşme baskı ürünleri, işletmelerin satış, üyelik, kiralama ve hizmet süreçlerinde kullandıkları önemli kurumsal evraklar arasında yer almaktadır. Mavi Basım tarafından üretilen numaratörlü sözleşme koçanı baskıları; firma logosu, iletişim bilgileri ve özel şartnameler eklenerek tamamen kuruma özel hazırlanır. İstanbul'da üretilen sözleşme baskıları Türkiye'nin 81 iline gönderilmektedir.
                </p>
              </div>
            )}

            {/* Sektörler */}
            {pathId !== "para-makbuzu" && pathId !== 'adisyon' && pathId !== 'arac-kiralama' && pathId !== 'gider-makbuzu' && pathId !== 'tahsilat-makbuzu' && pathId !== 'sozlesme-baski' && pathId !== 'sigorta-policeleri' && (
              <div className="relative z-10 border-t border-gray-100 pt-8">
                <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                  {pathId === 'tediye-makbuzu'
                    ? "Tediye Makbuzu Kimler Tarafından Kullanılır?"
                    : (currentDetails.sectoralTitle || `${currentDetails.breadcrumbTitle} Sektörel Kullanım Dağılımı`)}
                </h2>
                <p className="text-slate-650 text-base leading-relaxed font-medium mb-6">
                  {pathId === 'tediye-makbuzu'
                    ? "Tediye makbuzu farklı sektörlerde kullanılabilmektedir."
                    : "En doğru kullanım, firmanıza özel kurumsal logolu belgelerle süreçlerin takip edilmesiyle başlar. Hizmet verdiğimiz başlıca sektörler:"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(currentDetails.sectoralItems || currentDetails.whoUsesItems || []).map((text, sIdx) => {
                    const hasColon = text.includes(':');
                    const title = hasColon ? text.split(':')[0].trim() : text;
                    const desc = hasColon ? text.split(':').slice(1).join(':').trim() : '';
                    return (
                      <div key={sIdx} className="bg-gray-50 border border-gray-150 rounded-2xl p-4 flex flex-col gap-1 hover:bg-slate-50/50 hover:border-slate-300 transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] shrink-0 font-bold">➔</span>
                          <span className="text-sm text-gray-900 font-extrabold">{title}</span>
                        </div>
                        {desc && (
                          <p className="text-xs text-slate-500 pl-8 font-medium leading-relaxed">
                            {desc}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {pathId === 'sozlesme-baski' && (
              <>
                {/* Çok Güçlü SEO Paragrafı */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <div className="bg-emerald-950/5 border-l-4 border-emerald-600 p-6 rounded-r-2xl m-0 shadow-sm">
                    <p className="text-slate-700 text-base leading-relaxed font-semibold">
                      Numaratörlü otokopili sözleşme koçanları; hizmet sözleşmeleri, üyelik kayıt formları, satış sözleşmeleri, araç kiralama belgeleri, emlak yer gösterme formları ve kurumsal taahhütnameler için tercih edilen en güvenilir matbu evraklar arasında yer almaktadır. Firma logolu ve özel tasarımlı sözleşme formları, işletmelerin kayıt ve arşiv süreçlerini kolaylaştırırken müşterilerinize kurumsal ve güven veren bir imaj sunar.
                    </p>
                    <p className="text-slate-700 text-base leading-relaxed font-semibold mt-4">
                      Mavi Basım olarak İstanbul Topkapı Matbaacılar Sitesi'ndeki yüksek kapasiteli üretim tesisimizde hazırladığımız sözleşme baskıları; isteğe bağlı kırmızı seri numaratör, tırtıklı perfore ve çok nüshalı (2-3-4 nüsha) kendinden karbonlu otokopi kağıdı seçenekleriyle üretilmektedir. Türkiye'nin tüm il ve ilçelerine hızlı ve güvenli kargo ile ulaştırılır.
                    </p>
                  </div>
                </div>

                {/* 1. SÖZLEŞME TÜRLERİ (KART YAPISI) */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-2 uppercase tracking-tight flex items-center gap-2">
                    Kurumsal Sözleşme Türleri
                  </h2>
                  <p className="text-slate-650 text-sm md:text-base leading-relaxed font-medium mb-6">
                    Sektörünüze ve hukuki ihtiyaçlarınıza özel olarak tasarlayıp bastığımız başlıca otokopili sözleşme çeşitleri:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { title: "Hizmet Sözleşmesi", desc: "Genel hizmet alım-satım şartları, iş kapsamı, teslimat süreci, ödeme planı ve yasal taahhütnameler.", badge: "Otokopili / Numaratörlü", icon: "📋" },
                      { title: "Üyelik Sözleşmesi", desc: "Spor salonları, fitness merkezleri, yüzme havuzları ve kulüpler için üye kayıt ve salon kuralları belgesi.", badge: "A4 / 2-3 Nüsha", icon: "🏋️" },
                      { title: "Araç Kiralama Sözleşmesi", desc: "Rent a car firmaları için kasko şartları, günlük km sınırı, kaza/hasar sorumluluğu ve teslim tutanağı.", badge: "Yasal Standart", icon: "🚗" },
                      { title: "Emlak Yer Gösterme", desc: "Gayrimenkul danışmanları için taşınmaz gösterme, portföy yetki ve komisyon haklarını koruyan yasal form.", badge: "Numaratörlü", icon: "🏢" },
                      { title: "Eğitim Kurumu Sözleşmesi", desc: "Özel okul, kurs ve dershaneler için öğrenci kayıt, veli muvafakati ve taksitli ödeme taahhüt belgeleri.", badge: "Kurumsal Logolu", icon: "🎓" },
                      { title: "Güzellik Merkezi Sözleşmesi", desc: "Epilasyon, cilt bakımı ve estetik seans paketleri için müşteri açık rıza ve uygulama onay sözleşmeleri.", badge: "Hijyenik Kayıt", icon: "✨" },
                      { title: "Teknik Servis Sözleşmesi", desc: "Cihaz kabul, arıza teşhis, parça değişim ve garanti teslimat otokopili matbu kayıt formları.", badge: "2-3 Nüsha Cilt", icon: "🛠️" },
                      { title: "Danışmanlık Sözleşmesi", desc: "Yönetim, finans, bilişim ve hukuk alanlarında proje kapsamı, hakediş ve NDA gizlilik anlaşmaları.", badge: "Gizlilik Uyumlu", icon: "💼" }
                    ].map((card, cIdx) => (
                      <div key={cIdx} className="bg-white border border-gray-150 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-500 hover:shadow-md transition-all duration-300 group">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="text-2xl">{card.icon}</span>
                            <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100/80">{card.badge}</span>
                          </div>
                          <h3 className="text-base font-extrabold text-black mb-2 group-hover:text-emerald-700 transition-colors">{card.title}</h3>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">{card.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. "KİMLER KULLANIR?" SEKTÖR KART YAPISI */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-2 uppercase tracking-tight flex items-center gap-2">
                    Sözleşme Koçanlarını Hangi Sektörler Kullanır?
                  </h2>
                  <p className="text-slate-650 text-sm md:text-base leading-relaxed font-medium mb-6">
                    Müşteri kayıtlarını ve hukuki taahhütlerini otokopili sözleşme formlarıyla kayıt altına alan başlıca kurumsal sektörler:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: "Spor Salonları & Fitness", desc: "Üyelik kayıtları, üye taahhütnameleri ve paket kullanım sözleşmeleri.", icon: "🏋️‍♂️" },
                      { title: "Hastaneler & Sağlık Merkezleri", desc: "Hasta kabul formları, tıp merkezi bilgilendirilmiş rıza onay belgeleri.", icon: "🏥" },
                      { title: "Özel Klinikler & Muayenehaneler", desc: "Diş ve estetik muayenehane hasta kayıt ve tedavi rıza mukaveleleri.", icon: "🩺" },
                      { title: "Eğitim Kurumları & Özel Kurslar", desc: "Öğrenci kayıt formları, veli ödeme taahhütleri ve eğitim sözleşmeleri.", icon: "📚" },
                      { title: "Sigorta Acenteleri & Eksperler", desc: "Sigorta teklif kayıtları, poliçe bilgilendirme ve ekspertiz formları.", icon: "🛡️" },
                      { title: "Bayiler & Distribütör Ağları", desc: "Bayi satış sözleşmeleri, mal teslimat ve teminat taahhüt formları.", icon: "🤝" },
                      { title: "Teknik Servisler & Bakım", desc: "Cihaz teslim alım formları, arıza onarım ve parça değişim sözleşmeleri.", icon: "🔧" },
                      { title: "Emlak Ofisleri & Gayrimenkul", desc: "Alıcı/satıcı yer gösterme sözleşmeleri ve portföy yetki belgeleri.", icon: "🏠" },
                      { title: "Oto Kiralama (Rent a Car)", desc: "Günlük/aylık kiralama şartnameleri, km sınırı ve araç teslim tutanakları.", icon: "🚘" },
                      { title: "Danışmanlık Firmaları", desc: "Kurumsal yönetim, finans ve bilişim danışmanlığı hizmet sözleşmeleri.", icon: "💡" },
                      { title: "Yazılım & Bilişim Şirketleri", desc: "SLA bakım anlaşmaları, lisans kullanımı ve proje yazılım sözleşmeleri.", icon: "💻" },
                      { title: "Organizasyon & Davet Acenteleri", desc: "Düğün, lansman ve fuar ekipman kiralama hizmet sözleşmeleri.", icon: "🎉" }
                    ].map((sec, sIdx) => (
                      <div key={sIdx} className="bg-slate-50/70 border border-gray-150 rounded-2xl p-4 flex items-start gap-3.5 hover:bg-white hover:border-emerald-500 hover:shadow-sm transition-all duration-300">
                        <span className="text-2xl shrink-0 mt-0.5">{sec.icon}</span>
                        <div>
                          <h3 className="text-sm font-extrabold text-black mb-1">{sec.title}</h3>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">{sec.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. 4 ADIMLIK GÖRSEL İMALAT SÜRECİ AKIŞI */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-2 uppercase tracking-tight flex items-center gap-2">
                    Sözleşme Baskı 4 Adımlı İmalat Süreci
                  </h2>
                  <p className="text-slate-650 text-sm md:text-base leading-relaxed font-medium mb-6">
                    İstanbul Topkapı Matbaacılar Sitesi'ndeki tesisimizde sözleşme siparişlerinizin aşama aşama imalat akışı:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { step: "01", title: "Tasarım & Mizanpaj", desc: "Şirket logonuz, adres bilgileriniz ve yasal maddeleriniz grafik ekibimizce mizanpaj yapılır.", icon: "🎨" },
                      { step: "02", title: "Dijital PDF Onayı", desc: "Baskı öncesinde hazırlanan sözleşme taslağı WhatsApp / E-posta ile onayınıza sunulur.", icon: "📄" },
                      { step: "03", title: "Ofset Baskı & Cilt", desc: "Otokopili kağıtlara HD kalitede baskı, kırmızı numaratör ve dikişli ciltleme uygulanır.", icon: "🖨️" },
                      { step: "04", title: "Adrese Hızlı Kargo", desc: "Çift oluklu kolilerde paketlenen sözleşme koçanlarınız kargoya verilerek teslim edilir.", icon: "📦" }
                    ].map((step, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-slate-50 to-white border border-gray-150 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between hover:border-emerald-500 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl">{step.icon}</span>
                          <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">{step.step}</span>
                        </div>
                        <div>
                          <h3 className="text-base font-extrabold text-black mb-1.5">{step.title}</h3>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. SEKTÖR VE SÖZLEŞME EŞLEŞTİRME TABLOSU */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-2 uppercase tracking-tight flex items-center gap-2">
                    Hangi Sözleşme Hangi Sektör İçin Kullanılır?
                  </h2>
                  <p className="text-slate-650 text-sm md:text-base leading-relaxed font-medium mb-6">
                    Sektörünüze özel geliştirilen otokopili sözleşme türleri ve temel kullanım amaçları karşılaştırma tablosu:
                  </p>
                  <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                    <table className="w-full text-left text-xs md:text-sm border-collapse bg-white">
                      <thead>
                        <tr className="bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider">
                          <th className="p-3.5 md:p-4 border-b border-slate-800">Sektör</th>
                          <th className="p-3.5 md:p-4 border-b border-slate-800">Kullanılan Sözleşme / Form Türü</th>
                          <th className="p-3.5 md:p-4 border-b border-slate-800">Temel Kullanım Amacı & Yasal Koruma</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-150 text-slate-700 font-medium">
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🏋️</span> Spor Salonu & Fitness
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-emerald-800 bg-emerald-50/50">Üyelik ve Taahhüt Sözleşmesi</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm">Salon kuralları, üyelik süresi, paket dökümü ve aylık ödeme taahhüdü.</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🏢</span> Emlak & Gayrimenkul
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-emerald-800 bg-emerald-50/50">Yer Gösterme ve Portföy Yetki Belgesi</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm">Taşınmaz gösterme kaydı, gayrimenkul detayları ve komisyon hakkı güvencesi.</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🚗</span> Araç Kiralama (Rent a Car)
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-emerald-800 bg-emerald-50/50">Kiralama Sözleşmesi ve Teslim Tutanağı</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm">Kasko muafiyet şartları, günlük/aylık km sınırı, kaza ve ceza sorumluluk kaydı.</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🛠️</span> Teknik Servis & Bakım
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-emerald-800 bg-emerald-50/50">Cihaz Kabul ve Garanti Teslim Formu</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm">Arızalı cihaz teslim alımı, onarım onayı, parça değişim kaydı ve servis garantisi.</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>✨</span> Güzellik & Estetik Merkezi
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-emerald-800 bg-emerald-50/50">Hizmet ve Seans Onay Sözleşmesi</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm">Epilasyon/cilt bakımı seans takibi, hedeflenen paket dökümü ve açık rıza onayı.</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🎓</span> Eğitim Kurumu & Kurs
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-emerald-800 bg-emerald-50/50">Öğrenci Kayıt ve Taksit Sözleşmesi</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm">Kurs kayıt şartları, müfredat süresi, taksitli ödeme planı ve veli muvafakati.</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>💼</span> Danışmanlık Firması
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-emerald-800 bg-emerald-50/50">Hizmet ve Gizlilik (NDA) Sözleşmesi</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm">Proje kapsamı, danışmanlık hakediş bedelleri ve ticari bilgi gizliliği garantisi.</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>💻</span> Yazılım & Bilişim
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-emerald-800 bg-emerald-50/50">Bakım, Lisans ve SLA Sözleşmesi</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm">Yazılım teknik destek kapsamı, sunucu bakımı ve servis seviyesi taahhüdü.</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🩺</span> Sağlık & Klinik
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-emerald-800 bg-emerald-50/50">Aydınlatılmış Rıza ve Tedavi Formu</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm">Tıbbi müdahale öncesi hasta bilgilendirmesi, muafiyet şartları ve onay imzası.</td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🛡️</span> Sigorta Acentesi
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-emerald-800 bg-emerald-50/50">Teklif ve Poliçe Bilgilendirme Formu</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm">Sigorta poliçe şartları, prim ödemeleri, kasko istisnaları ve teminatlar.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Türkiye Geneli Sözleşme Koçanı Baskı Hizmeti */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Türkiye Geneli Sözleşme Koçanı Baskı Hizmeti
                  </h2>
                  <p className="text-slate-650 text-base leading-relaxed font-medium">
                    Mavi Basım tarafından üretilen numaratörlü sözleşme koçanı baskıları; İstanbul, Ankara, İzmir, Bursa, Antalya, Kocaeli, Sakarya, Tekirdağ, Balıkesir, Konya, Kayseri, Gaziantep, Adana, Mersin, Samsun, Trabzon, Eskişehir, Denizli ve Türkiye'nin tüm illerine gönderilmektedir.
                  </p>
                  <p className="text-slate-650 text-base leading-relaxed font-medium mt-4">
                    Otokopili sözleşme baskı siparişleri, İstanbul Topkapı Matbaacılar Sitesi'ndeki üretim tesisimizde hazırlanmakta ve anlaşmalı kargo ile adreslere teslim edilmektedir. Firma logolu sözleşme formu, üyelik sözleşmesi, hizmet sözleşmesi, araç kiralama sözleşmesi ve emlak sözleşmesi baskıları için Türkiye'nin her bölgesine hizmet vermekteyiz.
                  </p>
                </div>

                {/* Otokopili Sözleşme Baskı Fiyatları Nasıl Belirlenir? ve Sektörel Detaylar */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Otokopili Sözleşme Baskı Fiyatları Nasıl Belirlenir?
                  </h2>
                  <p className="text-slate-650 text-base leading-relaxed font-medium">
                    Otokopili sözleşme baskı fiyatları; cilt adedi, nüsha sayısı (1 asıl 1 suret, 1 asıl 2 suret vb.), baskı rengi ve üretim miktarına göre değişmektedir. Sektörde <strong>sözleşme koçanı fiyatları</strong> belirlenirken, yüksek adetli siparişlerde birim maliyetlerin düşüşüyle birlikte <strong>sözleşme koçanı baskı fiyatları</strong> çok daha ekonomik seviyelere gelmektedir. Numaratörlü sözleşme koçanı baskıları standart olarak seri numaralı şekilde üretilebilmektedir. Güncel fiyatlar için yukarıdaki tabloyu inceleyebilir veya WhatsApp üzerinden teklif talep edebilirsiniz.
                  </p>
                </div>

                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Firma Logolu Sözleşme Koçanı Baskısı
                  </h2>
                  <p className="text-slate-650 text-base leading-relaxed font-medium">
                    Kurumsal kimliğinizi güçlendirmek amacıyla hazırlanan firma logolu sözleşme koçanları; şirket unvanı, adres bilgileri, vergi bilgileri ve özel sözleşme maddeleri eklenerek hazırlanabilmektedir. Talebinize özel tasarlanan ve basılan <strong>otokopili sözleşme formu</strong> çeşitleri veya <strong>karbonlu sözleşme formu</strong> nüshaları, firmanızın operasyon süreçlerini mükemmel şekilde düzene sokar. Her baskı öncesinde tamamen size özel PDF prova onayı alınarak üretime geçilmektedir.
                  </p>
                </div>

                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Numaratörlü Sözleşme Baskı Neden Tercih Edilir?
                  </h2>
                  <p className="text-slate-650 text-base leading-relaxed font-medium">
                    Numaratörlü sözleşme baskı ürünleri; sözleşmelerin sıralı şekilde takip edilmesini sağlar. Özellikle emlak ofisleri, araç kiralama firmaları, spor salonları, güzellik merkezleri ve eğitim kurumları tarafından yaygın olarak tercih edilmektedir. İstanbul geneli ve Türkiye geneli hizmet veren profesyonel bir <strong>sözleşme matbaası</strong> olan Mavi Basım, belgelerinizi en yüksek baskı döküm kalitesinde sizlere sunmaktadır.
                  </p>
                </div>

                {/* Neden Mavi Basım? */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Neden Mavi Basım?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      "İstanbul Topkapı Matbaacılar Sitesi üretimi",
                      "5 ciltten başlayan düşük adet baskı imkanı",
                      "Ücretsiz grafik düzenleme desteği",
                      "PDF prova onayı sonrası üretim",
                      "Numaratör ve perfore seçenekleri",
                      "Türkiye geneli kargo gönderimi",
                      "Kurumsal logolu özel tasarım",
                      "3-5 iş günü üretim süresi"
                    ].map((feat, fIdx) => (
                      <div key={fIdx} className="bg-gray-50 border border-gray-150 rounded-2xl p-4 flex gap-3 hover:bg-white hover:border-emerald-500 hover:shadow-md transition-all duration-300">
                        <span className="text-emerald-600 text-lg font-black shrink-0">✓</span>
                        <span className="text-sm font-bold text-black leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* İstanbul'da Sözleşme Baskı Yaptırmak İsteyen Firmalar İçin */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    İstanbul'da Sözleşme Baskı Yaptırmak İsteyen Firmalar İçin
                  </h2>
                  <p className="text-slate-650 text-base leading-relaxed font-medium">
                    İstanbul sözleşme baskı hizmetlerimiz kapsamında; Zeytinburnu, Topkapı, Bayrampaşa, Güngören, Bakırköy, Bahçelievler, Esenler, Bağcılar, Küçükçekmece, Avcılar, Başakşehir, Ümraniye, Pendik, Kartal ve İstanbul'un tüm ilçelerine hizmet sunmaktayız.
                  </p>
                  <p className="text-slate-650 text-base leading-relaxed font-medium mt-4">
                    İstanbul'da faaliyet gösteren spor salonları, güzellik merkezleri, emlak ofisleri, eğitim kurumları, teknik servisler ve araç kiralama firmaları için kurumsal sözleşme koçanı baskıları hazırlamaktayız.
                  </p>
                </div>

                {/* Sözleşme Koçanı Baskı Siparişi Nasıl Verilir? */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Sözleşme Koçanı Baskı Siparişi Nasıl Verilir?
                  </h2>
                  <p className="text-slate-650 text-base leading-relaxed font-medium">
                    Numaratörlü sözleşme baskı siparişleriniz için mevcut Word, PDF veya eski sözleşme örneğinizi tarafımıza göndermeniz yeterlidir. Grafik ekibimiz baskıya uygun mizanpaj çalışmasını hazırlayarak ücretsiz PDF prova sunar. Onayınızın ardından otokopili sözleşme koçanı baskı üretimi başlatılır ve ürünleriniz kısa sürede kargoya teslim edilir.
                  </p>
                </div>

                {/* En Çok Bastırılan Sözleşme Türleri */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    En Çok Bastırılan Sözleşme Türleri
                  </h2>
                  <p className="text-slate-650 text-base leading-relaxed font-medium mb-6">
                    Her biri farklı hukuki ve ticari şartlar içeren matbu sözleşmeleri, firmanızın kurumsal kimliği ve yasal şartlarına göre tam uyumlulukta üretiyoruz:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      "Hizmet sözleşmesi",
                      "Üyelik sözleşmesi",
                      "Araç kiralama sözleşmesi",
                      "Emlak yer gösterme sözleşmesi",
                      "Güzellik merkezi sözleşmesi",
                      "Eğitim kurumu kayıt sözleşmesi",
                      "Teknik servis teslim formu",
                      "Danışmanlık sözleşmesi"
                    ].map((title, sIdx) => (
                      <div key={sIdx} className="bg-gray-50 border border-gray-150 rounded-2xl p-4 flex items-center gap-2.5 hover:bg-slate-100/50 hover:border-slate-300 transition-all duration-300">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="text-sm text-gray-900 font-bold leading-normal">{title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* İlgili Baskı Ürünleri */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    İlgili Baskı Ürünleri
                  </h2>
                  <p className="text-slate-650 text-base leading-relaxed font-medium mb-6">
                    Sözleşme koçanı baskısının yanı sıra işletmenizin ihtiyaç duyabileceği diğer matbu basılı evraklar:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { name: "Tahsilat Makbuzu Baskı", path: "/tahsilat-makbuzu", desc: "Ödeme ve tahsilat kayıtlarınız için otokopili makbuz." },
                      { name: "Tediye Makbuzu Baskı", path: "/tediye-makbuzu", desc: "Ödeme çıkışlarınız için logolu tediye koçanı." },
                      { name: "Para Makbuzu Baskı", path: "/para-makbuzu", desc: "Saha teslimatları ve elden tahsilat makbuzu." },
                      { name: "Sipariş Fişi Baskı", path: "/siparis-fisi", desc: "Müşteri ve tedarikçi sipariş kayıt formları." }
                    ].map((prod, pIdx) => (
                      <Link 
                        to={prod.path} 
                        key={pIdx} 
                        className="bg-gray-50 border border-gray-150 hover:border-emerald-600 hover:bg-white rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-emerald-600 transition-colors shrink-0" />
                            <span className="text-sm text-gray-900 font-black tracking-tight group-hover:text-emerald-600 transition-colors leading-normal">{prod.name}</span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed pl-4">{prod.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}

            {pathId === 'sigorta-policeleri' && (
              <>
                {/* 1. SEO VURUCU GİRİŞ PARAGRAFI BANNER */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <div className="bg-sky-950/5 border-l-4 border-sky-600 p-6 rounded-r-2xl m-0 shadow-sm">
                    <p className="text-slate-700 text-base leading-relaxed font-semibold">
                      Acentenize özel logo baskılı, numaratörlü ve otokopili sigorta poliçesi ve <strong>teklif formu</strong> koçanları; acenteler, brokerlar, eksperler ve finans kuruluşları için hızlı, ıslak imzalı ve yasal uyumlu evrak tanzim etme imkanı sunar. Müşterilerinize sunduğunuz teminat miktarlarını, peşin veya taksitli <strong>prim tahsilatı</strong> şartlarını, poliçe <strong>yenileme</strong> taahhütlerini ve <strong>zeyilname</strong> değişikliklerini anında kayıt altına alan otokopili koçanlar; siber kesintilerde veya sistem arızalarında fiziksel arşiv güvencesi sağlar. Olası kaza durumlarında hızlı <strong>hasar ihbarı</strong> kaydı oluşturulmasına imkan tanır.
                    </p>
                    <p className="text-slate-700 text-base leading-relaxed font-semibold mt-4">
                      Mavi Basım olarak İstanbul Topkapı Matbaacılar Sitesi'ndeki yüksek kapasiteli tesisimizde ürettiğimiz sigorta poliçe formları; kasko, trafik, DASK, sağlık, iş yeri ve nakliyat sigortaları için özel şablonlarla basılmaktadır. İsteğe bağlı kırmızı seri numaratör, dikişli cilt ve arka yüz şartname baskısıyla Türkiye'nin tüm illerine kargo ile ulaştırılır.
                    </p>
                  </div>
                </div>

                {/* 2. ⭐ POLİÇE TÜRLERİ (KART YAPISI) */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-2 uppercase tracking-tight flex items-center gap-2">
                    Acente Baskılı Sigorta Poliçesi ve Teklif Formu Türleri
                  </h2>
                  <p className="text-slate-650 text-sm md:text-base leading-relaxed font-medium mb-6">
                    Acentenizin kurumsal kimliğine ve sunduğunuz sigortacılık ürünlerine özel olarak tasarlayıp bastığımız başlıca poliçe ve teklif formu çeşitleri:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                      { title: "Trafik Sigortası", desc: "Zorunlu karayolları motorlu araçlar mali sorumluluk sigortası teklif ve bilgilendirme formları.", badge: "A4 / Numaratörlü", icon: "🚗" },
                      { title: "Kasko Poliçesi", desc: "Araç kaza, yanma, çalınma, cam kırılması ve kasko muafiyet detaylı teklif ve onay belgeleri.", badge: "A4 / 2-3 Nüsha", icon: "🚘" },
                      { title: "DASK Deprem", desc: "Zorunlu deprem sigortası başvuru, bina beyan ve poliçe bilgilendirme kayıt formları.", badge: "Yasal Standart", icon: "🏠" },
                      { title: "Konut Sigortası", desc: "Ev, eşya, hırsızlık, su baskını, yangın ve dahili su teminatları teklif ve poliçe koçanları.", badge: "Kurumsal Logolu", icon: "🏡" },
                      { title: "İş Yeri Sigortası", desc: "Ticari bina, demirbaş, emtia stok, hırsızlık ve iş durması teminatlı iş yeri poliçe formları.", badge: "A4 Geniş Form", icon: "🏢" },
                      { title: "Sağlık Sigortası", desc: "Özel sağlık sigortası yatarak/ayakta tedavi teminat tablosu ve medikal beyan formları.", badge: "Hassas Kayıt", icon: "🏥" },
                      { title: "Tamamlayıcı Sağlık", desc: "SGK anlaşmalı özel hastane fark ücreti teminat dökümü ve katılım onay belgeleri.", badge: "SGK Uyumlu", icon: "🩺" },
                      { title: "Nakliyat Sigortası", desc: "Kara, hava, deniz yük taşımacılığı emtia nakliyat teminat ve sevkiyat poliçe formları.", badge: "Lojistik Uyumlu", icon: "🚢" },
                      { title: "Ferdi Kaza Sigortası", desc: "Kaza sonucu vefat, sürekli sakatlık ve sağlık giderleri teminatı teklif belgeleri.", badge: "Garantili Teminat", icon: "🛡️" },
                      { title: "Seyahat Sigortası", desc: "Yurt dışı vize uyumlu acil sağlık, bagaj kaybı, seyahat iptali ve asistans hizmet formları.", badge: "Vize Uyumlu", icon: "✈️" }
                    ].map((card, cIdx) => (
                      <div key={cIdx} className="bg-white border border-gray-150 rounded-2xl p-4 flex flex-col justify-between hover:border-sky-500 hover:shadow-md transition-all duration-300 group">
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-2.5">
                            <span className="text-2xl">{card.icon}</span>
                            <span className="text-[10px] font-extrabold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">{card.badge}</span>
                          </div>
                          <h3 className="text-sm font-extrabold text-black mb-1.5 group-hover:text-sky-700 transition-colors">{card.title}</h3>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">{card.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* GÖRSEL ÇEŞİTLİLİĞİ: POLİÇE VE TEKLİF FORMU ŞABLON MOKÖPLERİ */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-2 uppercase tracking-tight flex items-center gap-2">
                    Acente Sigorta Poliçesi & Teklif Formu Örnek Baskı Şablonları
                  </h2>
                  <p className="text-slate-650 text-sm md:text-base leading-relaxed font-medium mb-6">
                    Mavi Basım kalitesiyle acentenizin kurumsal kimliğine ve SEDDK standartlarına uygun üretilen örnek form düzenleri:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                      {
                        title: "Trafik & Kasko Teklif Formu",
                        tag: "A4 - 2 / 3 Nüsha Otokopili",
                        color: "from-sky-900 to-slate-900",
                        fields: ["Acente Logosu & Levha No", "Müşteri T.C. / Plaka / Şasi", "Kasko / Trafik Teminat Tablosu", "Prim Tahsilat Şekli & Vade", "Acente Kaşe & Islak İmza"],
                        icon: "🚗"
                      },
                      {
                        title: "DASK & Konut Poliçe Formu",
                        tag: "A4 - Seri Numaratörlü",
                        color: "from-blue-900 to-indigo-950",
                        fields: ["Acente İletişim & Unvanı", "Bina Adresi & DASK Beyanı", "Deprem / Yangın Limitleri", "Yenileme & Zeyil Notları", "Soru / Bilgilendirme Klozu"],
                        icon: "🏠"
                      },
                      {
                        title: "Özel Sağlık & TSS Formu",
                        tag: "A4 - Hassas Tablo Baskı",
                        color: "from-teal-900 to-slate-900",
                        fields: ["Acente Yetki Kodu", "Sigortalı Medikal Beyanı", "Yatarak / Ayakta Limit Tablosu", "SGK Katılım Onay Alanı", "Müşteri Onay İmzası"],
                        icon: "🩺"
                      },
                      {
                        title: "Arka Yüz Şartname Baskısı",
                        tag: "Tek Renk Yasal Metin",
                        color: "from-slate-800 to-gray-900",
                        fields: ["Poliçe Genel Şartları Metni", "SEDDK / TOBB Yasal Bilgi", "Muafiyet & Kloz Maddeleri", "Hasar İhbarı & Tahkim Bilgisi", "Uyuşmazlık Çözüm Alanı"],
                        icon: "📜"
                      }
                    ].map((tmpl, tIdx) => (
                      <div key={tIdx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-sky-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                        <div>
                          {/* Visual Paper Header Bar */}
                          <div className={`bg-gradient-to-r ${tmpl.color} p-4 text-white relative`}>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-2xl">{tmpl.icon}</span>
                              <span className="text-[10px] font-black uppercase bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-white border border-white/30">
                                {tmpl.tag}
                              </span>
                            </div>
                            <h3 className="text-sm font-black text-white tracking-tight">{tmpl.title}</h3>
                          </div>
                          {/* Simulated Paper Content Area */}
                          <div className="p-4 bg-slate-50/50">
                            <span className="text-[11px] font-extrabold uppercase text-slate-500 tracking-wider block mb-2">Form İçerik Bölümleri:</span>
                            <ul className="space-y-1.5">
                              {tmpl.fields.map((fld, fIdx) => (
                                <li key={fIdx} className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 shrink-0" />
                                  <span>{fld}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 border-t border-gray-150 flex items-center justify-between text-xs font-bold text-sky-800 group-hover:text-sky-900">
                          <span>Acentenize Özel Mizanpaj</span>
                          <span>Baskıya Hazır ✓</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. "KİMLER KULLANIR?" SEKTÖR KART YAPISI */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-2 uppercase tracking-tight flex items-center gap-2">
                    Sigorta Poliçe ve Teklif Koçanlarını Kimler Kullanır?
                  </h2>
                  <p className="text-slate-650 text-sm md:text-base leading-relaxed font-medium mb-6">
                    Saha satışlarında, müşteri görüşmelerinde ve evrak arşivlemede otokopili poliçe koçanı kullanan başlıca kurum ve işletmeler:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                      { title: "Sigorta Acenteleri", desc: "Müşteri ziyaretlerinde anında teklif verip prim tahsilatı şartlarını yazılı belgelendiren acenteler.", icon: "📋" },
                      { title: "Sigorta Brokerleri", desc: "Farklı şirketlerden aldıkları fiyat ve teminat dökümlerini müşteriye fiziki evrakla sunan brokerlar.", icon: "💼" },
                      { title: "Sigorta Eksperleri", desc: "Kaza yeri incelemelerinde, hasar ihbarı kayıtlarında ve ekspertiz süreçlerinde tespit tutanağı tutan eksperler.", icon: "🔍" },
                      { title: "Oto Galerileri", desc: "Araç devir ve tescil tanziminde alıcılara geçici teminat belgesi ve poliçe başvuru dökümü hazırlayan galeriler.", icon: "🏎️" },
                      { title: "Rent a Car Firmaları", desc: "Araç teslimatlarında ikame araç teminat onayını ve muafiyet şartlarını kiralayan müşteriye imzalatan işletmeler.", icon: "🚗" },
                      { title: "Bankalar & Finans", desc: "Kredi kullandırımlarında ipotekli gayrimenkul ve taşıt sigorta taahhütnamelerini müşteri dosyasında saklayan şubeler.", icon: "🏦" },
                      { title: "Leasing Şirketleri", desc: "Kiralık iş makinesi ve ekipman portföyünün yıllık yenileme durumlarını ve poliçe zeyil kayıtlarını takip eden kurumlar.", icon: "📑" },
                      { title: "Filo Yönetimi", desc: "Şirket araç filolarının periyodik kasko/trafik zeyilname onaylarını ve poliçe vadesi takibini yürüten yöneticiler.", icon: "🚙" },
                      { title: "Kurumsal Satış Ekipleri", desc: "Müşteri lokasyonunda yapılan görüşmelerde anında yazılı ön onay, poliçe teklifi ve başvuru koçanı sunan temsilciler.", icon: "👥" },
                      { title: "Teknik Servis & Oto Sanayi", desc: "Hasarlı araç kabul işlemlerinde kasko/trafik sigorta dosya takip formlarını ve eksper evrak kopyalarını klasörleyen servisler.", icon: "🔧" }
                    ].map((sec, sIdx) => (
                      <div key={sIdx} className="bg-slate-50/70 border border-gray-150 rounded-2xl p-4 flex flex-col justify-between hover:bg-white hover:border-sky-500 hover:shadow-sm transition-all duration-300">
                        <div>
                          <span className="text-2xl mb-2 block">{sec.icon}</span>
                          <h3 className="text-sm font-extrabold text-black mb-1">{sec.title}</h3>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">{sec.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. 4 ADIMLIK GÖRSEL İMALAT SÜRECİ AKIŞI */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-2 uppercase tracking-tight flex items-center gap-2">
                    Sigorta Poliçesi 4 Adımlı Baskı İmalat Süreci
                  </h2>
                  <p className="text-slate-650 text-sm md:text-base leading-relaxed font-medium mb-6">
                    Topkapı Matbaacılar Sitesi'ndeki tesisimizde poliçe koçanı siparişlerinizin aşama aşama imalat akışı:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { step: "01", title: "Tasarım & Mizanpaj", desc: "Acente logonuz, TOBB/SEDDK levha no ve teminat tablolarınız grafikerlerimizce mizanpaj yapılır.", icon: "🎨" },
                      { step: "02", title: "Dijital PDF Onayı", desc: "Hazırlanan şablon WhatsApp / E-posta ile tarafınıza iletilerek birebir PDF kontrolü ve onayı alınır.", icon: "📄" },
                      { step: "03", title: "Ofset Baskı & Cilt", desc: "Otokopili kağıtlara kurumsal renklerinizde HD ofset baskı, kırmızı numaratör ve dikişli ciltleme uygulanır.", icon: "🖨️" },
                      { step: "04", title: "Kargo & Adrese Teslim", desc: "Çift oluklu dayanıklı kolilerde paketlenen poliçe koçanlarınız anlaşmalı kargo ile adresinize ulaştırılır.", icon: "📦" }
                    ].map((step, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-slate-50 to-white border border-gray-150 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between hover:border-sky-500 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl">{step.icon}</span>
                          <span className="text-xs font-black text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">{step.step}</span>
                        </div>
                        <div>
                          <h3 className="text-base font-extrabold text-black mb-1.5">{step.title}</h3>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. KARŞILAŞTIRMA / POLİÇE EŞLEŞTİRME TABLOSU */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-2 uppercase tracking-tight flex items-center gap-2">
                    Hangi Sigorta Poliçesi Hangi Amaçla Kullanılır?
                  </h2>
                  <p className="text-slate-650 text-sm md:text-base leading-relaxed font-medium mb-6">
                    Acentelerin en sık düzenlediği sigorta poliçe türleri, kullanım amaçları ve yasal koruma kapsamı karşılaştırma tablosu:
                  </p>
                  <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                    <table className="w-full text-left text-xs md:text-sm border-collapse bg-white">
                      <thead>
                        <tr className="bg-slate-900 text-white font-extrabold text-xs uppercase tracking-wider">
                          <th className="p-3.5 md:p-4 border-b border-slate-800">Poliçe / Teklif Türü</th>
                          <th className="p-3.5 md:p-4 border-b border-slate-800">Kullanım Amacı & Teminat Kapsamı</th>
                          <th className="p-3.5 md:p-4 border-b border-slate-800">Yasal Durum & Avantaj</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-150 text-slate-700 font-medium">
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🚗</span> Trafik Sigortası
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-sky-900 bg-sky-50/50">Zorunlu karayolu motorlu araç mali sorumluluk ve 3. şahıs kaza güvencesi.</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[11px]">Yasal Zorunlu</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🚘</span> Kasko Poliçesi
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-sky-900 bg-sky-50/50">Araç kaza, devrilme, yanma, çalınma, cam kırılması ve kasko muafiyet tazminatları.</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">Gönüllü Güvence</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🏠</span> DASK (Deprem Sigortası)
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-sky-900 bg-sky-50/50">Zorunlu deprem, deprem kaynaklı yangın, infilak ve tsunami konut bina güvencesi.</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[11px]">Yasal Zorunlu</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🏡</span> Konut Sigortası
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-sky-900 bg-sky-50/50">Ev, eşya, hırsızlık, su baskını, yangın ve komşuluk mali sorumluluk koruması.</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm"><span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold text-[11px]">Geniş Teminat</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🏢</span> İş Yeri Sigortası
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-sky-900 bg-sky-50/50">Ticari bina, demirbaş, emtia stok, hırsızlık, yangın ve iş durması riskleri.</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm"><span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[11px]">Ticari Güvence</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🏥</span> Özel Sağlık Sigortası
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-sky-900 bg-sky-50/50">Yatarak/ayakta tedavi, ameliyat, tahlil, medikal harcama ve doktor muayene teminatı.</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[11px]">Bireysel / Kurumsal</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🩺</span> Tamamlayıcı Sağlık (TSS)
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-sky-900 bg-sky-50/50">SGK anlaşmalı özel hastanelerde doktor ve ameliyat fark ücreti teminat dökümü.</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm"><span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold text-[11px]">SGK Destekli</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🚢</span> Nakliyat Sigortası
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-sky-900 bg-sky-50/50">Kara, hava ve deniz yük taşımacılığında taşınan emtia ve ticari mal güvencesi.</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm"><span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[11px]">Lojistik Güvence</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>🛡️</span> Ferdi Kaza Sigortası
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-sky-900 bg-sky-50/50">Kaza sonucu vefat, sürekli sakatlık ve kaza tedavi masrafları teminatı.</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold text-[11px]">Kişisel Koruma</span></td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 md:p-4 font-bold text-slate-900 flex items-center gap-2">
                            <span>✈️</span> Seyahat Sağlık Sigortası
                          </td>
                          <td className="p-3.5 md:p-4 font-semibold text-sky-900 bg-sky-50/50">Yurt dışı vize başvuruları için acil sağlık, bagaj kaybı ve seyahat iptali güvencesi.</td>
                          <td className="p-3.5 md:p-4 text-xs md:text-sm"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[11px]">Vize Uyumlu</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 6. TÜRKİYE GENELİ SİGORTA POLİÇESİ BASKI HİZMETİ */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Türkiye Geneli Sigorta Poliçesi Baskı Hizmeti
                  </h2>
                  <p className="text-slate-650 text-base leading-relaxed font-medium">
                    Mavi Basım tarafından üretilen numaratörlü sigorta poliçesi ve teklif formu koçanları; İstanbul, Ankara, İzmir, Bursa, Antalya, Adana, Konya, Gaziantep, Kocaeli, Kayseri, Mersin, Eskişehir, Denizli, Samsun, Trabzon, Şanlıurfa, Malatya, Erzurum ve Türkiye'nin tüm illerine gönderilmektedir.
                  </p>
                  <p className="text-slate-650 text-base leading-relaxed font-medium mt-4">
                    Otokopili sigorta poliçesi siparişleriniz, İstanbul Topkapı Matbaacılar Sitesi'ndeki tesisimizde hazırlanmakta ve koruyucu ambalaj ile kargoya verilmektedir. Sigorta acenteleri, brokerlar ve eksperler için yasal uyumlu, logo baskılı ve seri numaralı matbu belgeler üretiyoruz.
                  </p>
                </div>

                {/* 7. NEDEN MAVİ BASIM SİGORTA MATBAASI? */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Acentelerin Tercihi: Neden Mavi Basım?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      "İstanbul Topkapı Matbaacılar Sitesi üretimi",
                      "5 ciltten başlayan esnek sipariş olanağı",
                      "TOBB ve SEDDK standartlarına uygun mizanpaj",
                      "Baskı öncesi ücretsiz PDF prova onayı",
                      "Kırmızı sıralı numaratör ve perfore imkanı",
                      "İsteğe bağlı arka yüz şartname baskısı",
                      "CMYK ve özel Pantone kurumsal renk baskı",
                      "Türkiye geneli sigortalı hızlı kargo"
                    ].map((feat, fIdx) => (
                      <div key={fIdx} className="bg-gray-50 border border-gray-150 rounded-2xl p-4 flex gap-3 hover:bg-white hover:border-sky-500 hover:shadow-md transition-all duration-300">
                        <span className="text-sky-600 text-lg font-black shrink-0">✓</span>
                        <span className="text-sm font-bold text-black leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 8. İLGİLİ BASKI ÜRÜNLERİ */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Acenteler İçin Diğer Matbu Baskı Ürünleri
                  </h2>
                  <p className="text-slate-650 text-base leading-relaxed font-medium mb-6">
                    Sigorta poliçesi ve teklif formu baskısının yanında acentenizin ihtiyaç duyabileceği diğer matbu kurumsal evraklar:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { name: "Tahsilat Makbuzu Baskı", path: "/tahsilat-makbuzu", desc: "Acente prim ve poliçe tahsilatları için otokopili makbuz." },
                      { name: "Tediye Makbuzu Baskı", path: "/tediye-makbuzu", desc: "Müşteri veya şirkete yapılan ödemeler için tediye koçanı." },
                      { name: "Sözleşme Koçanı Baskı", path: "/sozlesme-baski", desc: "Acente kurumsal hizmet ve taahhüt sözleşmeleri baskısı." },
                      { name: "Para Makbuzu Baskı", path: "/para-makbuzu", desc: "Saha ödemeleri ve elden tahsilatlar için seri numaralı makbuz." },
                      { name: "Gider Makbuzu Baskı", path: "/gider-makbuzu", desc: "Acente içi harcama ve giderlerin takibi için logolu koçan." },
                      { name: "Araç Kiralama Sözleşmesi", path: "/arac-kiralama", desc: "Rent a car ve filo müşterileri için kiralama sözleşmesi." },
                      { name: "Teslimat Formu Baskı", path: "/makbuz-ve-formlar", desc: "Poliçe ve evrak teslimat kayıtları için matbu teslim formu." },
                      { name: "Sipariş Fişi Baskı", path: "/siparis-fisi", desc: "Acente malzeme ve stok sipariş takip koçanları." }
                    ].map((prod, pIdx) => (
                      <Link 
                        to={prod.path} 
                        key={pIdx} 
                        className="bg-gray-50 border border-gray-150 hover:border-sky-600 hover:bg-white rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-sky-600 transition-colors shrink-0" />
                            <span className="text-sm text-gray-900 font-black tracking-tight group-hover:text-sky-600 transition-colors leading-normal">{prod.name}</span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed pl-4">{prod.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}

            {pathId === 'siparis-fisi' && (
              <>
                {/* 1. Bu Ürün Kimler İçin Üretiliyor? (E-E-A-T) */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Bu Ürün Kimler İçin Üretiliyor?
                  </h2>
                  <p className="text-slate-650 text-base leading-relaxed font-medium mb-6">
                    Sipariş fişi koçanları, özel üretim yapan veya sipariş üzerine çalışan işletmelerin operasyon ve teslimat süreçlerini eksiksiz yönetmeleri için tasarlanmıştır. Hizmet verdiğimiz başlıca sektörler:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { title: "Mobilyacılar & Ahşap Atölyeleri", desc: "Özel ölçülü imalat, kapora takibi ve teslimat aşamalarını kayıt altına almak için." },
                      { title: "Beyaz Eşya & Elektronik Servisleri", desc: "Müşteriden alınan cihazların durumunu ve servis ücretini detaylandırmak için." },
                      { title: "Tekstil & Konfeksiyon İmalathaneleri", desc: "Toptan kumaş ve dikim siparişlerinin nüshalı takibi için." },
                      { title: "Halı Yıkama & Temizlik Tesisleri", desc: "Adresten alınan halı ve koltuk teslimat formları için." },
                      { title: "Oto Servis & Tamir Merkezleri", desc: "Araç kabul, iş emri ve parça değişim detaylarını müşteriye sunmak için." },
                      { title: "İnşaat, Yapı & Taahhüt Firmaları", desc: "Şantiye malzeme teslimatı ve peşinat kayıtları için." },
                      { title: "Organizasyon & Etkinlik Acenteleri", desc: "Düğün, davet ve kiralık ekipman sipariş taahhütleri için." },
                      { title: "Reklam Ajansları & Tabela Üreticileri", desc: "Işıklı tabela, dijital baskı ve cephe giydirme sipariş detayları için." },
                      { title: "Toptancılar & Mutfak Ekipmanları", desc: "Sıcak satış ve depodan ürün çıkış sipariş fişleri için." }
                    ].map((sec, sIdx) => (
                      <div key={sIdx} className="bg-gray-50 border border-gray-150 rounded-2xl p-4 flex flex-col gap-1 hover:bg-white hover:border-primary/40 hover:shadow-sm transition-all duration-300">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                          <span className="text-sm text-gray-900 font-extrabold">{sec.title}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed pl-4">
                          {sec.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Gerçek Üretim Sürecimiz (Adım Adım) */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Sipariş Fişi Gerçek Üretim Sürecimiz
                  </h2>
                  <p className="text-slate-650 text-base leading-relaxed font-medium mb-6">
                    Sipariş fişleriniz İstanbul Topkapı Matbaacılar Sitesi’ndeki tesislerimizde sıfır hata prensibiyle üretilmektedir:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { step: "01", title: "Logo & Bilgi İletimi", desc: "Logonuzu WhatsApp veya e-posta ile iletin. Vektörel formatlar (PDF, AI, CDR) veya yüksek çözünürlüklü görseller kabul edilir." },
                      { step: "02", title: "Grafik Mizanpajı", desc: "Grafik ekibimiz firmanıza özel tablo düzenini, iletişim alanlarını ve şartnameleri ekleyerek tasarlar." },
                      { step: "03", title: "Ücretsiz PDF Prova", desc: "Baskı öncesinde sipariş fişinizin dijital PDF provası WhatsApp üzerinden tarafınıza gönderilir ve yazılı onayınız alınır." },
                      { step: "04", title: "CTP Kalıp Pozlama", desc: "Onaylanan tasarım CTP sisteminde ofset kalıbına pozlanır." },
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
                      { name: "Servis Formu Baskı", path: "/servis-formu", desc: "Teknik servis cihaz teslim ve bakım formları." }
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
                          <h4 className="text-sm font-black text-black tracking-tight group-hover:text-primary transition-colors leading-snug">{blog.title}</h4>
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
                      Tediye makbuzu baskı fiyatları; nüsha sayısı, cilt adedi, baskı rengi ve numaratör seçeneklerine göre değişmektedir. 14x20 cm yarım boy tediye makbuzu fiyatları için yukarıdaki tabloyu inceleyebilir veya özel üretim talepleriniz için bizimle iletişime geçebilirsiniz.
                    </p>
                    <p>
                      İstanbul tediye makbuzu baskı merkezimizde, otokopili tediye makbuzu fiyatı ve numaratörlü tediye makbuzu fiyatı doğrudan tediye makbuzu matbaa üreticisi olarak en uygun bütçelerle sunulmaktadır. A5 tediye makbuzu ve özel ebat tediye makbuzu bastırma talepleriniz için online tediye makbuzu siparişi oluşturabilir, tediye makbuzu basımı sürecini Mavi Basım güvencesiyle başlatabilirsiniz.
                    </p>
                  </div>
                </div>

                {/* 2. Tediye Makbuzu Örneği Word, Excel ve PDF */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Tediye Makbuzu Örneği Word, Excel ve PDF
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      Kullanıcılar tarafından en çok aranan konular arasında tediye makbuzu örneği Word, Excel ve PDF dosyaları yer almaktadır. İşletmeler, kendi muhasebe süreçlerine uygun örnek şablonları inceleyerek ihtiyaçlarına göre düzenleme yapabilmektedir.
                    </p>
                    <p>
                      İnternette sıkça aranan tediye makbuzu PDF, tediye makbuzu indir, tediye makbuzu örneği Word ve tediye makbuzu örneği Excel sorgularına yönelik örnek şablonlar aşağıdan incelenebilir.
                    </p>
                    <p>
                      Ancak düzenli kullanım, seri takibi ve arşivleme açısından numaratörlü ve otokopili tediye makbuzu baskıları çok daha profesyonel ve güvenli bir çözüm sunmaktadır.
                    </p>
                    <p>
                      Mavi Basım olarak firmanıza özel logolu, seri numaralı tediye makbuzu ve otokopili tediye makbuzu koçanı üretimi yapıyoruz.
                    </p>

                    {/* ÜCRETSİZ ÖRNEKLER İNDİRME BÖLÜMÜ */}
                    <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-5">
                      <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                        <span>📂 Ücretsiz Örnekler ve Hazır Şablonlar</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mb-4">
                        Aşağıdaki butonları kullanarak tediye makbuzu PDF, Word ve Excel örnek dosyalarını cihazınıza indirebilirsiniz:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            const blob = new Blob([
                              `========================================\n        TEDİYE MAKBUTU ÖRNEĞİ (PDF)\n========================================\n\nTarih: ${new Date().toLocaleDateString('tr-TR')}\nMakbuz No: 000001\nÖdeyen Ünvanı: Mavi Basım Matbaa\nÖdenen Kişi / Firma: Sample Şirketi\nÖdeme Tutarı: 2.500 TL (İki Bin Beş Yüz Türk Lirası)\nÖdeme Açıklaması: Kasadan nakit cari hesap ödemesi\n\n----------------------------------------\nÖdeyen İmza: __________    Teslim Alan İmza: __________\n========================================`
                            ], { type: 'text/plain;charset=utf-8' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'tediye-makbuzu-ornegi-mavi-basim.pdf';
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200 hover:border-red-400 hover:shadow-xs transition-all group cursor-pointer text-left"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 font-black text-xs flex items-center justify-center">PDF</span>
                            <div>
                              <div className="text-xs font-bold text-slate-800 group-hover:text-red-600 transition-colors">Tediye Makbuzu PDF</div>
                              <div className="text-[10px] text-slate-500">Ücretsiz İndir</div>
                            </div>
                          </div>
                          <span className="text-slate-400 group-hover:text-red-600 text-sm font-bold">↓</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const blob = new Blob([
                              `========================================\n        TEDİYE MAKBUTU WORD ŞABLONU\n========================================\n\nTarih: _________\nMakbuz No: _____\nÖdeyen Unvanı: _____________________\nÖdenen Kişi / Firma: _________________\nÖdeme Tutarı: ______________ TL\nÖdeme Açıklaması: __________________\n\nİmza: _________`
                            ], { type: 'text/plain;charset=utf-8' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'tediye-makbuzu-word-sablonu.doc';
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all group cursor-pointer text-left"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 font-black text-xs flex items-center justify-center">DOC</span>
                            <div>
                              <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Tediye Makbuzu Word</div>
                              <div className="text-[10px] text-slate-500">Düzenlenebilir Şablon</div>
                            </div>
                          </div>
                          <span className="text-slate-400 group-hover:text-blue-600 text-sm font-bold">↓</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const blob = new Blob([
                              `Tarih\tMakbuz No\tÖdeyen\tÖdenen\tTutar\tAçıklama\n${new Date().toLocaleDateString('tr-TR')}\t000001\tMavi Basım\tTedarikçi A.Ş.\t2500 TL\tCari Ödeme`
                            ], { type: 'text/plain;charset=utf-8' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'tediye-makbuzu-excel-sablonu.xls';
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all group cursor-pointer text-left"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 font-black text-xs flex items-center justify-center">XLS</span>
                            <div>
                              <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">Tediye Makbuzu Excel</div>
                              <div className="text-[10px] text-slate-500">Formüllü Tablo</div>
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
                      Tediye makbuzu baskılarında en sık tercih edilen standart ebat <strong>14x20 cm (yarım boy - A5 ebadı)</strong> ölçüsüdür. Bu boyut, kullanım ve taşıma kolaylığı sunarken muhasebe klasörlerinde de düzenli bir arşivleme imkânı sağlar.
                    </p>
                    <p>
                      İşletmenizin kullanım ihtiyacına göre 10x14 cm (çeyrek boy) veya özel ebatlarda tediye makbuzu koçanı üretimi de yapılabilmektedir. İhtiyacınıza uygun 14x20 tediye makbuzu ve A5 tediye makbuzu basımı için matbaamızla iletişime geçebilirsiniz.
                    </p>

                    {/* CTA BENNER / PROVA İSTE BÖLÜMÜ */}
                    <div className="mt-4 p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-800">
                      <p className="text-xs sm:text-sm font-semibold">
                        Firmanıza özel tediye makbuzu tasarımı için WhatsApp üzerinden örnek dosyanızı gönderebilir ve 24 saat içinde ücretsiz PDF prova alabilirsiniz.
                      </p>
                      <a
                        href="https://wa.me/905366022373?text=Merhaba,%20Tediye%20Makbuzu%20bask%C4%B1s%C4%B1%20ve%20tasar%C4%B1m%C4%B1%20hakk%C4%B1nda%20bilgi%20ve%20ücretsiz%20PDF%20prova%20almak%20istiyorum."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-2 shrink-0"
                      >
                        <span>WhatsApp ile Prova İste</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* 3. Tediye Makbuzu Baskısı Kaç Günde Teslim Edilir? */}
                <div className="relative z-10 border-t border-gray-100 pt-8">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-2">
                    Tediye Makbuzu Baskısı Kaç Günde Teslim Edilir?
                  </h2>
                  <div className="text-slate-650 text-sm md:text-base leading-relaxed font-medium space-y-4">
                    <p>
                      Online tediye makbuzu siparişi tamamlandıktan sonra firmanıza özel hazırlanan tasarım WhatsApp üzerinden onayınıza sunulur. Onayınızın ardından Mavi Basım tediye makbuzu İstanbul Topkapı matbaa tesisimizde baskı süreci başlatılır.
                    </p>
                    <p>
                      Üretim süreci ortalama <strong>3-5 iş günü</strong> içinde tamamlanmaktadır. Basımı tamamlanan tediye makbuzu koçanı siparişleri İstanbul içi kurye veya kargo teslimatının yanı sıra Türkiye genelindeki tüm illere hızlı kargo ile güvenle sevk edilir.
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
                      Seri numaralı tediye makbuzu kullanımı, kasa nakit hareketlerinde mükerrer ödeme, kayıt kaybı veya yetkisiz işlem risklerinin önüne geçer. Otomatik numaratörlü baskı sistemi sayesinde her tediye makbuzu koçanı takip edilebilir bir sıra izler.
                    </p>
                    <p>
                      Mavi Basım olarak güvenilir tediye makbuzu üreticisi konumuyla, tediye makbuzu bastırma ve toptan tediye makbuzu baskı taleplerinizde kendinden karbonlu ve seri numaralı yüksek kaliteli baskı çözümleri sunuyoruz.
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

        <RelatedBlogPosts category="makbuz" />
      </div>
    </div>
  );
};
