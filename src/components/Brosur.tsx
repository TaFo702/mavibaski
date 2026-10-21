import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ShoppingCart, 
  Truck, 
  HelpCircle, 
  ChevronDown, 
  Printer,
  Info,
  CheckCircle2,
  FileCheck,
  Layers,
  FoldHorizontal,
  Maximize2,
  Image as ImageIcon
} from 'lucide-react';
import { 
  useCart, 
  AgencyDiscountCTA, 
  FireWarning, 
  FeatureTooltip 
} from '../App';
import { BROSUR_FAQS } from '../data/brosurFaqs';
import { CategoryHero } from './CategoryHero';
import { RelatedBlogPosts } from './RelatedBlogPosts';
import { 
  KUSE_115_DATA, 
  KUSE_128_DATA, 
  KUSE_130_DATA, 
  KUSE_200_DATA, 
  BROSUR_DATA 
} from '../data/extraProductData';

export { KUSE_115_DATA, KUSE_128_DATA, KUSE_130_DATA, KUSE_200_DATA, BROSUR_DATA };

interface BrosurGalleryItem {
  id: number;
  title: string;
  shortDesc: string;
  alt: string;
  hasRealImage?: boolean;
  imageSrc?: string;
}

const BROSUR_GALLERY_ITEMS: BrosurGalleryItem[] = [
  {
    id: 1,
    title: "Restoran Broşürü Örneği",
    shortDesc: "Menü ve kampanya sunumu",
    alt: "Dürüm menüsü ve kampanya bilgileri içeren restoran broşürü",
    hasRealImage: true,
    imageSrc: "/images/brosur/tanitim-brosuru-ornegi.webp"
  },
  {
    id: 2,
    title: "Düz Broşür Baskı Örneği",
    shortDesc: "Eğitim merkezi tanıtımı",
    alt: "Çocuk etkinlikleri ve eğitim programlarını tanıtan broşür örneği",
    hasRealImage: true,
    imageSrc: "/images/brosur/brosur-baski-fiyatlari.webp"
  },
  {
    id: 3,
    title: "Katlamalı Broşür Örneği",
    shortDesc: "İç mimarlık tanıtımı",
    alt: "Üç paneli açık görünen iç mimarlık tanıtım broşürü",
    hasRealImage: true,
    imageSrc: "/images/brosur/katlamali-brosur-baski.webp"
  },
  {
    id: 4,
    title: "Güzellik Salonu Broşürü",
    shortDesc: "Hizmet ve kampanya tanıtımı",
    alt: "Güzellik salonu hizmetlerini tanıtan pembe broşür örneği",
    hasRealImage: true,
    imageSrc: "/images/brosur/ucuz-brosur-baski.webp"
  },
  {
    id: 5,
    title: "Üç Panelli Broşür Tasarımı",
    shortDesc: "Açık hâlde panel yerleşimi",
    alt: "Mobilya görselleri bulunan üç panelli broşürün açık tasarımı",
    hasRealImage: true,
    imageSrc: "/images/brosur/brosur-tasarimi-ve-baski.webp"
  },
  {
    id: 6,
    title: "Eğitim Tanıtım Broşürü",
    shortDesc: "Etkinlik ve program sunumu",
    alt: "Eğitim merkezi programlarını tanıtan broşürlerin görünümü",
    hasRealImage: true,
    imageSrc: "/images/brosur/brosur-baski-fiyatlari.webp"
  }
];

export const BrosurPage = () => {
  const { openProductDetail } = useCart();
  const [selectedEbatFilter, setSelectedEbatFilter] = useState<string>('HEPSİ');
  const [showAdvancedTech, setShowAdvancedTech] = useState<boolean>(false);
  const [activeLightIndex, setActiveLightIndex] = useState<number>(0);

  // Ebat butonları arasında mobilde ve masaüstünde sırayla gezen canlı ışıklandırma döngüsü
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLightIndex((prev) => (prev + 1) % 6);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Broşür");
  };

  // Shared questions keep visible answers and structured data in sync.
  const faqItems = BROSUR_FAQS;

  const renderBrosurTable = (
    title: string,
    gramaj: string,
    paperDetail: string,
    dataGroup: typeof KUSE_115_DATA
  ) => {
    const allItems = dataGroup.flatMap(group => group.items).filter(item => {
      if (selectedEbatFilter === 'HEPSİ') return true;
      if (selectedEbatFilter === 'Özel Ebat / Kare' || selectedEbatFilter === 'A7x2') {
        return item.size === 'A7x2';
      }
      return item.size === selectedEbatFilter;
    });

    const groupedByEbat: Array<{ ebat: string; items: typeof allItems }> = [];
    allItems.forEach(item => {
      let group = groupedByEbat.find(g => g.ebat === item.ebat);
      if (!group) {
        group = { ebat: item.ebat, items: [] };
        groupedByEbat.push(group);
      }
      group.items.push(item);
    });

    return (
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-1.5 bg-primary rounded-full"></div>
          <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">
            {title}
          </h3>
        </div>

        <div className="bg-white rounded-2xl border border-slate-300 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <caption className="sr-only">{title} Fiyat Tablosu</caption>
              <thead>
                <tr className="bg-slate-900 text-white text-xs font-black uppercase tracking-wider">
                  <th scope="col" className="p-3.5 text-center w-48 border-r border-slate-700">ÜRÜN TÜRÜ</th>
                  <th scope="col" className="p-3.5 text-center border-r border-slate-700">EBAT</th>
                  <th scope="col" className="p-3.5 text-center border-r border-slate-700">KOD</th>
                  <th scope="col" className="p-3.5 text-center border-r border-slate-700">ÖZELLİKLER</th>
                  <th scope="col" className="p-3.5 text-center border-r border-slate-700">ADET</th>
                  <th scope="col" className="p-3.5 text-center border-r border-slate-700">FİYAT</th>
                  <th scope="col" className="p-3.5 text-center pr-5">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold text-slate-800">
                {groupedByEbat.length > 0 ? (
                  groupedByEbat.map((ebatGroup, groupIdx) => (
                    ebatGroup.items.map((item, itemIdx) => {
                      const isLastInGroup = itemIdx === ebatGroup.items.length - 1;
                      const isLastGroup = groupIdx === groupedByEbat.length - 1;

                      return (
                        <tr 
                          key={`${groupIdx}-${itemIdx}`} 
                          className={`hover:bg-sky-50/60 transition-colors ${
                            isLastInGroup && !isLastGroup 
                              ? 'border-b-2 border-slate-300' 
                              : 'border-b border-slate-200'
                          }`}
                        >
                          {itemIdx === 0 && (
                            <td 
                              rowSpan={ebatGroup.items.length} 
                              className="p-4 text-center bg-white border-r-2 border-slate-300 align-middle w-48 border-b-2 border-slate-300"
                            >
                              <div className="flex flex-col items-center justify-center font-black">
                                <span className="text-sm font-black text-slate-900 tracking-wider">BROŞÜR</span>
                                <span className="text-sm font-black text-amber-600 my-0.5">{gramaj}</span>
                                <span className="text-[10px] text-slate-600 font-extrabold uppercase tracking-tight leading-tight max-w-[130px]">{paperDetail}</span>
                              </div>
                            </td>
                          )}

                          <td className="p-3 text-center border-r border-slate-200">
                            <span className="inline-block bg-slate-100 px-3 py-1 rounded-md text-slate-900 border border-slate-200 font-black text-xs">
                              {item.ebat.replace('x', '×')}
                            </span>
                          </td>

                          <td className="p-3 text-center font-black text-primary border-r border-slate-200">
                            {item.code}
                            <FeatureTooltip code={item.code} />
                          </td>

                          <td className="p-3 text-center text-slate-800 font-medium border-r border-slate-200">
                            {item.desc}
                          </td>

                          <td className="p-3 text-center font-black text-slate-900 border-r border-slate-200">
                            {item.miktar}
                          </td>

                          <td className="p-3 text-center text-sm font-black text-slate-900 border-r border-slate-200">
                            {item.price}
                          </td>

                          <td className="p-3 text-center pr-5">
                            <button
                              onClick={() => openWhatsApp(item)}
                              title={`Hemen Sipariş Ver – ${item.code} – ${item.miktar}`}
                              aria-label={`Hemen Sipariş Ver – ${item.code} – ${item.miktar}`}
                              className="inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-sky-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold tracking-tight transition-all shadow-xs hover:shadow-md active:scale-95"
                            >
                              <ShoppingCart size={14} className="shrink-0" />
                              <span>Hemen Sipariş Ver</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 font-medium">
                      Seçilen ebat filtresine uygun ürün bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      {/* RouteSEOHead owns JSON-LD in the head for initial HTML and navigation. */}
      <Helmet>
        <title>Broşür Baskı Fiyatları | A4, A5 ve Katlamalı Broşür</title>
        <meta name="description" content="A4, A5 ve A3 broşür baskı fiyatlarını; 115, 130 ve 200 gr kuşe seçeneklerini inceleyin. Katlama, ölçü ve baskı dosyası bilgilerini öğrenin." />
        <link rel="canonical" href="https://mavibasim.com/brosur" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Broşür Baskı Fiyatları | A4, A5 ve Katlamalı Broşür" />
        <meta property="og:description" content="A4, A5 ve A3 broşür baskı fiyatlarını; 115, 130 ve 200 gr kuşe seçeneklerini inceleyin. Katlama, ölçü ve baskı dosyası bilgilerini öğrenin." />
        <meta property="og:url" content="https://mavibasim.com/brosur" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mavibasim.com/images/brosur/brosur-baski-fiyatlari.webp" />
        <meta property="og:image:secure_url" content="https://mavibasim.com/images/brosur/brosur-baski-fiyatlari.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="1536" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:image:alt" content="Mavi Basım broşür baskı fiyatları, A4, A5 ve katlamalı broşür çeşitleri" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Broşür Baskı Fiyatları | A4, A5 ve Katlamalı Broşür" />
        <meta name="twitter:description" content="A4, A5 ve A3 broşür baskı fiyatlarını; 115, 130 ve 200 gr kuşe seçeneklerini inceleyin. Katlama, ölçü ve baskı dosyası bilgilerini öğrenin." />
        <meta name="twitter:image" content="https://mavibasim.com/images/brosur/brosur-baski-fiyatlari.webp" />
      </Helmet>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        {/* 1. Breadcrumb and Hero Section */}
        <CategoryHero
          title="Broşür Baskı Fiyatları ve Ölçüleri"
          titleId="brosur-hero-title"
          badge="Ofset Baskı &amp; Katlama Çözümleri"
          description={
            <div className="space-y-3">
              <p>
                İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktamız üzerinden Türkiye geneline broşür ve matbaa çözümleri sunuyoruz. 115 gr, 130 gr ve 200 gr kuşe seçenekleriyle <strong className="text-slate-900">A4, A5, A3 ve katlamalı broşür</strong> baskı çözümleri sunuyoruz.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#fiyat-listesi"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs"
                >
                  <Printer size={14} /> Fiyat Listesini İncele
                </a>
                <a
                  href="#ebat-rehberi"
                  className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
                >
                  <Maximize2 size={14} /> Ölçü &amp; Katlama Rehberi
                </a>
              </div>
            </div>
          }
          trustSignals={[
            { icon: Printer, text: "Topkapı Hizmet ve Koordinasyon Noktası" },
            { icon: CheckCircle2, text: "Baskıya Hazır Dosya Kontrolü" },
            { icon: FileCheck, text: "Dijital PDF Prova" },
            { icon: Truck, text: "Türkiye Geneline Anlaşmalı Kargo" }
          ]}
          relatedLinks={[
            { label: "Katalog Baskı", path: "/kataloglar" },
            { label: "El İlanı", path: "/el-ilani" },
            { label: "Kartvizit", path: "/kartvizit" },
            { label: "Magnet Baskı", path: "/magnet" },
            { label: "Karton Çanta", path: "/karton-canta" }
          ]}
          customCtaText="Broşür Fiyat Teklifi Al"
        />

        {/* 2. Filterable Price Tables */}
        <section id="fiyat-listesi" className="my-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
                <Printer size={13} /> GÜNCEL BASKI TARİFELERİ
              </div>
              <h2 id="fiyat-listesi-title" className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Güncel Broşür Baskı Fiyat Listesi
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Broşür baskı fiyatları; ebat, kâğıt gramajı, selefon, kırım ve sipariş adedine göre değişir. A4 broşür fiyatları ve A5 broşür seçeneklerini; 1.000, 2.000, 5.000 ve 10.000 adet tirajlarıyla aşağıdaki tablolardan karşılaştırabilirsiniz.
              </p>
            </div>
          </div>

          {/* Sub-Filter by Ebat */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-extrabold text-slate-500 mr-2">Ebat Filtrele:</span>
            {['HEPSİ', 'A5', 'A4', 'A3', 'A7', 'Özel Ebat / Kare'].map((ebat, index) => {
              const isLit = activeLightIndex === index;
              const isSelected = selectedEbatFilter === ebat;
              return (
                <button
                  key={ebat}
                  onClick={() => setSelectedEbatFilter(ebat)}
                  className={`relative overflow-hidden px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer select-none touch-manipulation border ${
                    isSelected
                      ? 'bg-slate-900 text-white font-black shadow-xs border-slate-900'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-transparent'
                  } ${
                    isLit
                      ? '!border-[#00E5FF] !shadow-[0_0_18px_3px_rgba(0,229,255,0.9),0_0_4px_1px_#29ADDF] brightness-125 scale-[1.04]'
                      : ''
                  }`}
                >
                  <span className="relative z-10">{ebat === 'HEPSİ' ? 'Tüm Ebatlar' : ebat}</span>
                  {/* Moving Light Sheen Sweep */}
                  <span
                    className={`absolute top-0 bottom-0 w-full pointer-events-none transition-all duration-700 ${
                      isLit
                        ? 'left-[150%] opacity-100 bg-gradient-to-r from-transparent via-white/80 to-[#00E5FF]/70'
                        : '-left-[150%] opacity-0 bg-gradient-to-r from-transparent via-white/50 to-transparent'
                    }`}
                    style={{ transform: 'skewX(-20deg)' }}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          {/* 3 Separate Tables */}
          {renderBrosurTable("115 gr. Kuşe Broşürler (Ekonomik Tiraj)", "115 gr.", "KUŞE ÇİFT YÖN RENKLİ", KUSE_115_DATA)}
          {renderBrosurTable("130 gr. Kuşe Broşürler (Standart Kurumsal)", "130 gr.", "KUŞE ÇİFT YÖN RENKLİ", KUSE_130_DATA)}
          {renderBrosurTable("200 gr. Kuşe Broşürler (Selefon Kaplamalı Prestij)", "200 gr.", "KUŞE ÇİFT YÖN RENKLİ PARLAK SELEFONLU", KUSE_200_DATA)}

          <p className="text-xs text-slate-600 font-medium leading-relaxed my-4">
            1.000 adet broşür fiyatı başlangıç maliyetini gösterirken 2.000 adet broşür seçeneği daha yüksek tirajlı ihtiyaçlara yöneliktir. 5.000 adet broşür fiyatı ve 10.000 adet broşür fiyatı, ebat ve kâğıt gramajına göre yukarıdaki tablolardan karşılaştırılabilir.
          </p>

          <div className="bg-slate-50 p-4 px-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-medium">
            <span>* Fiyat listesinde belirtilen tutarlar %20 KDV hariçtir. Kargo ücreti varış noktasına ve paket ağırlığına göre ayrıca hesaplanır.</span>
            {" "}
            <span className="font-bold text-slate-800 flex items-center gap-1.5 shrink-0">
              <Truck size={14} className="text-primary" /> Türkiye Geneline Anlaşmalı Kargo
            </span>
          </div>
        </section>

        <FireWarning />

        {/* 3. Broşür Ölçüleri ve Ebat Rehberi */}
        <section id="ebat-rehberi" className="my-14 bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xs">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
              <Maximize2 size={15} /> TEKNİK EBAT KARŞILAŞTIRMASI
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
              Broşür Ölçüleri ve Kullanım Alanları
            </h2>
            <p className="text-xs md:text-sm text-slate-600 font-medium mb-6 leading-relaxed">
              Broşür ölçüleri, ürün grubuna ve kullanım amacına göre sınıflandırılır. Sipariş öncesinde ürün kodunun yanında belirtilen net kesim ölçüsü esas alınmalıdır:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase">A4 Sınıfı</span>
                  <h3 className="font-black text-slate-900 text-sm mt-2 mb-1">A4 Broşür</h3>
                  <div className="text-xs text-slate-600 space-y-1 mb-3">
                    <p><strong className="text-slate-800">115 gr:</strong> 20×28 cm</p>
                    <p><strong className="text-slate-800">130/200 gr:</strong> 21×30 cm</p>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Kurumsal tanıtımlar, ürün föyleri, tek kırım veya Z-kırım çok panelli menüler için geniş sunum alanı sağlar.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md uppercase">A5 Sınıfı</span>
                  <h3 className="font-black text-slate-900 text-sm mt-2 mb-1">A5 Broşür</h3>
                  <div className="text-xs text-slate-600 space-y-1 mb-3">
                    <p><strong className="text-slate-800">115 gr:</strong> 14×20 cm</p>
                    <p><strong className="text-slate-800">130/200 gr:</strong> 15×21 cm</p>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    A5 broşür ölçüleri, ürün grubuna göre 14×20 cm veya 15×21 cm olarak sunulur. A5 broşür baskı fiyatı; gramaj, adet ve varsa selefon ya da kırım işlemine göre değişir. Posta kutusu, elden dağıtım ve kampanya duyuruları için uygundur.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md uppercase">A3 Sınıfı</span>
                  <h3 className="font-black text-slate-900 text-sm mt-2 mb-1">A3 Broşür</h3>
                  <div className="text-xs text-slate-600 space-y-1 mb-3">
                    <p><strong className="text-slate-800">115 gr:</strong> 28×40 cm</p>
                    <p><strong className="text-slate-800">130/200 gr:</strong> 30×42 cm</p>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Katlandığında A4 panellere dönüşen geniş katalog föyleri, harita broşürleri ve sektörel ürün bültenleri için kullanılır.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md uppercase">Dar &amp; Özel Ebat</span>
                  <h3 className="font-black text-slate-900 text-sm mt-2 mb-1">Dar &amp; Kare Format</h3>
                  <div className="text-xs text-slate-600 space-y-1 mb-3">
                    <p><strong className="text-slate-800">Dar Ebat:</strong> 9,5×20 cm / 10×21 cm</p>
                    <p><strong className="text-slate-800">Kare Ebat:</strong> 20×20 cm / 20×21 cm</p>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Stant içi broşürlükler, dikey kuponlar ve kare formatlı tanıtımlar için alternatif ölçüler.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Kâğıt ve Gramaj Seçenekleri */}
        <section className="my-14 bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xs">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
              <Layers size={15} /> KUŞE KÂĞIT TÜRLERİ
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
              Kâğıt Gramajı ve Yüzey Kaplama Seçenekleri
            </h2>
            <p className="text-xs md:text-sm text-slate-600 font-medium mb-6">
              Tanıtım amacınıza ve bütçenize göre seçebileceğiniz üç temel kuşe kâğıt seçeneği:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-black text-slate-900 text-sm">115 gr. Kuşe</span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">Ekonomik</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                    Hafif gövde yapısı sayesinde yüksek tirajlı dağıtımlarda birim maliyet avantajı sunar.
                  </p>
                </div>
                <div className="text-[11px] text-slate-500 font-bold bg-white p-2.5 rounded-xl border border-slate-200">
                  Kullanım: Kapı altı, posta kutusu, geniş kitle dağıtımı
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-black text-slate-900 text-sm">130 gr. Kuşe</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Standart</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                    Daha tok kâğıt yapısı ve canlı renk geçirgenliği ile kurumsal firma föyleri, menüler ve ürün tanıtımlarında yaygın tercihtir.
                  </p>
                </div>
                <div className="text-[11px] text-slate-500 font-bold bg-white p-2.5 rounded-xl border border-slate-200">
                  Kullanım: Mağaza içi, fuar föyleri, kurumsal tanıtım
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-black text-slate-900 text-sm">200 gr. Selefonlu</span>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">Prestij</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                    Daha tok kâğıt yapısı ve parlak selefon kaplamasıyla sürtünme, parmak izi ve hafif nem sıçramalarına karşı ek koruma sağlayabilir. Kullanım koşullarına göre değerlendirilmelidir.
                  </p>
                </div>
                <div className="text-[11px] text-slate-500 font-bold bg-white p-2.5 rounded-xl border border-slate-200">
                  Kullanım: Restoran menüsü, prestijli lansman, dayanıklı tanıtım föyü
                </div>
              </div>
            </div>

            {/* Özel Gramaj Seçenekleri ve Teklif Alanı */}
            <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="max-w-3xl">
                <h3 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-tight mb-2">
                  170, 250, 300 ve 350 gr Kuşe Kâğıt Broşür Seçenekleri
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Standart fiyat listemizdeki 115, 130 ve 200 gr seçeneklerin dışında; 170 gr kuşe kâğıt broşür ile 250 gr, 300 gr ve 350 gr kuşe kâğıt seçenekleri de özel çalışmalar için değerlendirilebilir. Kalın gramajlarda uygun ölçü, katlama ve pilyaj işlemi; sipariş adedi, kullanım amacı, malzeme tedariki ve teknik uygunluğa göre belirlenir. Fiyat listesinde bulunmayan ölçü ve gramajlar için bilgilerinizi ileterek size özel teklif alabilirsiniz.
                </p>
              </div>
              <button
                onClick={() => openWhatsApp({ code: "OZEL-GRAMAJ", title: "Özel Gramaj Kuşe Broşür", desc: "170, 250, 300 veya 350 gr kuşe broşür özel teklif talebi" })}
                title="170, 250, 300 ve 350 gr Kuşe Kâğıt Broşür Özel Teklif Al"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-xs shrink-0 cursor-pointer"
              >
                <ShoppingCart size={14} />
                <span>Özel Teklif Al</span>
              </button>
            </div>
          </div>
        </section>

        {/* 5. Katlama & Kırım Modelleri Showcase Cards */}
        <section className="my-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-3 mb-6 gap-2">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                <FoldHorizontal size={15} /> KIRIM &amp; KATLAMA TÜRLERİ
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Broşür Çeşitleri &amp; Katlama Modelleri
              </h2>
              <p className="text-xs text-slate-500 font-medium">İçerik yoğunluğunuza göre seçebileceğiniz kırım ve panel yapıları</p>
            </div>
            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-xl self-start md:self-auto">
              * Kırım işlemi opsiyoneldir
            </span>
          </div>

          <div className="mb-6 space-y-3 text-sm text-slate-600 leading-relaxed">
            <h3 className="font-bold text-slate-900">A4 İki Kırımlı Broşür Ölçüleri ve Panel Yerleşimi</h3>
            <p>
              A4 iki kırımlı broşürde açık ölçü, katlama öncesindeki net kesim ebadını; kapalı ölçü ise katlanmış boyutu belirtir.
              İki kırım üç bölüm oluşturur; kâğıdın ön ve arka yüzü birlikte altı paneldir.
              Panel genişlikleri seçilen katlama düzenine göre kontrol edilir; içe kapanan panelin payı baskı dosyasında ayrıca değerlendirilir.
            </p>
            <h3 className="font-bold text-slate-900">C-Kırım ve Z-Kırım Broşür Seçimi</h3>
            <p>
              C-kırım broşürde paneller içe doğru kapanır; Z-kırımda zıt yönlere katlanarak akordeon biçiminde açılır.
              Menü, ürün listesi veya kurumsal tanıtım için seçim yaparken okuma sırasını ve panel yerleşimini birlikte değerlendirin.
              Ayrıntılar için{' '}
              <Link to="/blog/brosur-katlama-kirim-modelleri-nelerdir" className="text-primary underline underline-offset-2">broşür katlama ve kırım modelleri rehberini</Link> inceleyebilirsiniz.
              Restoran menüsü için{' '}
              <Link to="/sektor/restoran-brosur-baski" className="text-primary underline underline-offset-2">restoran broşür baskı seçeneklerine</Link> bakabilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "A4 Tek Kırımlı Broşür",
                size: "20×28 cm / 21×30 cm (Açık Hali)",
                fold: "Ortadan Tek Kırım (4 Panel)",
                paper: "115 gr / 130 gr / 200 gr Kuşe",
                startingPrice: "2.200 ₺",
                code: "1CA4",
                desc: "Kurumsal hizmet tanıtımları, lansman föyleri ve 4 panelli menü çözümleri için ortadan katlamalı model."
              },
              {
                title: "A4 2 Kırımlı Broşür (Z-Kırım)",
                size: "21×30 cm (Açık Hali)",
                fold: "2 Kırımlı Z-Kırım veya Akordeon (6 Panel)",
                paper: "115 gr / 130 gr / 200 gr Kuşe",
                startingPrice: "2.450 ₺",
                code: "PRO1A4",
                desc: "6 ayrı panelde kategori bazlı ürün listeleme, detaylı fiyat tarifeleri ve çoklu dil sunumları için kırım yapısı."
              },
              {
                title: "A3 Tek Kırımlı Broşür",
                size: "28×40 cm / 30×42 cm (Açık Hali)",
                fold: "Ortadan Tek Kırım (A4 Panel Boyutu)",
                paper: "115 gr / 130 gr / 200 gr Kuşe",
                startingPrice: "3.350 ₺",
                code: "1CA3",
                desc: "Geniş yüzeyli harita, fuar bülteni, sektörel bülten ve büyük ebat görsel sunumlar için katlandığında A4 olan model."
              },
              {
                title: "A5 Standart Broşür",
                size: "14×20 cm / 15×21 cm",
                fold: "Düz Kesim / Katlamasız",
                paper: "115 gr / 130 gr / 200 gr Kuşe",
                startingPrice: "1.650 ₺",
                code: "1CA5",
                desc: "Saha ve posta kutusu dağıtımlarında pratik ve ekonomik standart tanıtım broşürü."
              },
              {
                title: "A7 Dikey Cep Broşürü",
                size: "9,5×20 cm / 10×21 cm",
                fold: "Düz Kesim / Dikey Format",
                paper: "115 gr / 130 gr Kuşe",
                startingPrice: "1.550 ₺",
                code: "1CA7",
                desc: "Kasa önü stantları, broşürlükler ve hızlı kupon dağıtımları için dikey formda üretilen dar ebat föy."
              },
              {
                title: "200 gr Selefonlu Prestij Broşür",
                size: "A4 (21×30 cm) / A5 / A3",
                fold: "İsteğe Bağlı Kırım / Parlak Selefonlu",
                paper: "200 gr Kuşe + Parlak Selefon",
                startingPrice: "3.350 ₺",
                code: "CBS7",
                desc: "Yüksek gramajlı kâğıt yapısı ve koruyucu selefon kaplaması sayesinde dayanıklı kurumsal tanıtım broşürü."
              }
            ].map((variant, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] font-black text-primary bg-primary/10 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                      {variant.code}
                    </span>
                    <span className="text-xs font-extrabold text-amber-600">
                      {variant.startingPrice}'den başlayan
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-primary transition-colors mb-2">
                    {variant.title}
                  </h3>
                  <div className="space-y-1.5 text-xs text-slate-600 font-medium mb-4">
                    <p><span className="font-bold text-slate-900">Ebat:</span> {variant.size}</p>
                    <p><span className="font-bold text-slate-900">Katlama:</span> {variant.fold}</p>
                    <p><span className="font-bold text-slate-900">Kâğıt:</span> {variant.paper}</p>
                    <p className="pt-1 text-[11px] text-slate-500 leading-snug">{variant.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => openWhatsApp({ code: variant.code, price: variant.startingPrice, desc: variant.desc, ebat: variant.size, miktar: "1.000 Adet" })}
                  title={`${variant.title} Sipariş Teklifi Al`}
                  className="w-full bg-slate-900 hover:bg-black text-white font-black text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <ShoppingCart size={14} />
                  <span>Sipariş Oluştur</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Broşür Baskı Örnekleri - 6'lı Kompakt Galeri (3x2 Masaüstü/Tablet, 2x3 Mobil) */}
        <section className="my-14 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xs max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
              <ImageIcon size={15} /> BASKI VE ÜRÜN NUMUNELERİ
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
              Broşür Baskı Örnekleri
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Broşür örneklerini incelerken açık ve kapalı ölçüyü, kâğıt gramajını, katlama yönünü ve panel sayısını birlikte değerlendirin.
              Aynı ebatta görünen iki çalışma, kırım ve yüzey kaplaması farklıysa aynı teknik özelliklere sahip değildir.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {BROSUR_GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-2 sm:p-2.5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col"
              >
                <div className="w-full aspect-[3/2] rounded-xl overflow-hidden bg-slate-100 relative">
                  {item.hasRealImage && item.imageSrc ? (
                    <img
                      src={item.imageSrc}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      data-placeholder="true"
                      data-image-placeholder="true"
                      data-placeholder-number={item.id}
                      className="w-full h-full border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-2 text-center bg-slate-50/90"
                    >
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-200/80 text-slate-500 flex items-center justify-center mb-1 shrink-0">
                        <ImageIcon size={13} />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                        GÖRSEL {item.id}
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold text-slate-800 line-clamp-1 mt-0.5 px-1">
                        {item.title}
                      </span>
                    </div>
                  )}
                </div>
                <div className="pt-2 px-0.5 text-center sm:text-left">
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                    {item.shortDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Baskı Dosyası Hazırlama Kılavuzu */}
        <section className="my-14 bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xs">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <FileCheck size={14} /> TEKNİK BASKI REHBERİ
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
              Broşür Baskı Dosyası Hazırlama Kılavuzu
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium mb-6">
              Baskınızın net çıkması ve kenarlardan kesilmemesi için dikkat edilmesi gereken temel teknik kriterler:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
              <div className="bg-sky-50/70 p-5 rounded-2xl border border-sky-100 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-black text-xs mb-3">1</div>
                  <h3 className="font-black text-slate-900 text-sm mb-1">Baskı İçin Görsel Çözünürlüğü</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Nihai baskı ölçüsünde kullanılan raster fotoğraflar için genellikle 300 PPI önerilir. Logo, ikon ve metinler mümkünse vektörel olarak korunmalıdır; düşük çözünürlüklü raster görseller baskıda piksellenebilir.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-100 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs mb-3">2</div>
                  <h3 className="font-black text-slate-900 text-sm mb-1">CMYK Renk Modu</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Beklenmedik ton farkı riskini azaltmak için dosyanın uygun CMYK profiliyle hazırlanması önerilir. Ekran görüntüsü ile baskı sonucu birebir aynı olmayabilir.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-100 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-black text-xs mb-3">3</div>
                  <h3 className="font-black text-slate-900 text-sm mb-1">3 mm Taşma Payı (Bleed)</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Giyotin kesim esnasında beyaz kenar boşlukları kalmaması için zemin renklerini 3 mm dışarı taşırın; yazılarınızı kenarlardan en az 3 mm içeride tutun.
                  </p>
                </div>
              </div>
            </div>

            {/* Collapsible Advanced Technical Details for Graphic Designers */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 mb-6">
              <button
                type="button"
                aria-expanded={showAdvancedTech}
                aria-controls="brosur-advanced-tech"
                onClick={() => setShowAdvancedTech(!showAdvancedTech)}
                className="w-full text-left p-4 font-black text-xs md:text-sm text-slate-800 flex justify-between items-center hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Info size={16} className="text-primary" />
                  <span>Grafikerler ve Ajanslar İçin İleri Teknik Parametreler</span>
                </div>
                <ChevronDown size={16} className={`transition-transform text-slate-400 ${showAdvancedTech ? 'rotate-180' : ''}`} />
              </button>

              <div id="brosur-advanced-tech" hidden={!showAdvancedTech} className="p-5 pt-0 text-xs text-slate-600 font-medium border-t border-slate-200 space-y-4 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <div className="font-black text-slate-900 mb-1">ICC Renk Profili Standartları</div>
                      <p className="text-[11px] leading-relaxed text-slate-600">
                        Ofset baskı standartlarına uygun ICC renk profillerinde hazırlanan vektörel çıktılarda renk kararlılığı desteklenir. Ofset baskıda renk, kesim ve adet toleransları hakkında ayrıntılı bilgi için <Link to="/teslimat-sartlari" className="text-primary underline">Teslimat ve İade Şartları</Link> sayfasını inceleyebilirsiniz.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <div className="font-black text-slate-900 mb-1">Maksimum Mürekkep Yoğunluğu (TAC)</div>
                      <p className="text-[11px] leading-relaxed text-slate-600">
                        Arka yüze mürekkep geçmesini ve kuruma gecikmelerini önlemek için toplam mürekkep yoğunluğunun (TAC) %280-%300 arasında tutulması önerilir.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <div className="font-black text-slate-900 mb-1">PDF/X Formatı ve Font Convert</div>
                      <p className="text-[11px] leading-relaxed text-slate-600">
                        Metin kayması ve eksik font hatalarını önlemek için tüm metinler Convert/Outline yapılmalı, dosya PDF/X-1a veya PDF/X-4 formatında iletilmelidir.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                      <div className="font-black text-slate-900 mb-1">Kırım &amp; Katlama Toleransı</div>
                      <p className="text-[11px] leading-relaxed text-slate-600">
                        Z-kırım veya C-kırım tasarımlarında içe kıvrılan panel, katlanma kalınlığı sebebiyle dış panellerden 2 mm daha dar çizilmelidir.
                      </p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Sipariş, Teknik Kontrol ve Dijital PDF Prova Süreci */}
        <section className="my-14 bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xs">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
              <CheckCircle2 size={15} /> SİPARİŞ ADIMLARI
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
              Teknik Kontrol ve Dijital PDF Prova Onay Süreci
            </h2>
            <p className="text-xs md:text-sm text-slate-600 font-medium mb-6">
              Siparişiniz üretime alınmadan önce teknik kontrol ve prova süreçlerinden geçer:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs mb-2">1</span>
                <h3 className="font-black text-slate-900 text-xs mb-1">Dosya İletimi</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Tasarım dosyanız e-posta veya WhatsApp üzerinden iletilir.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs mb-2">2</span>
                <h3 className="font-black text-slate-900 text-xs mb-1">Baskıya Hazır Dosya Kontrolü</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Çözünürlük, CMYK modu, taşma payı ve kırım çizgileri incelenir.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs mb-2">3</span>
                <h3 className="font-black text-slate-900 text-xs mb-1">Dijital PDF Prova</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Kontrol edilen dosya, onayınız için dijital PDF prova olarak paylaşılır.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center font-black text-xs mb-2">4</span>
                <h3 className="font-black text-slate-900 text-xs mb-1">Baskı &amp; Sevk</h3>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  Onaylanan iş ofset baskıya alınır, paketlenerek kargoya teslim edilir.
                </p>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium">
              <strong>Önemli Bilgilendirme:</strong> Baskıya hazır dosyalar teknik açıdan kontrol edilir ve baskı öncesinde dijital PDF prova onaya sunulur. PDF prova, içeriğin yerleşim doğruluğunu gösterir; fiziksel baskı rengini ve kâğıt dokusunu birebir garanti etmez. Üretim ve kargoya teslim süresi; ürün, adet, katlama işlemi, dosya onayı ve sipariş yoğunluğuna göre teklif aşamasında bildirilir.
            </div>
          </div>
        </section>

        {/* 8. Sıkça Sorulan Sorular (SSS) - 2 SIRA / 2 KOLON */}
        <section className="my-14 bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="text-primary" size={28} />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Broşür Baskı Sıkça Sorulan Sorular
              </h2>
              <p className="text-xs text-slate-500 font-medium">Ölçü, gramaj, katlama, dosya hazırlığı ve sipariş süreçlerine dair detaylı bilgiler</p>
            </div>
          </div>

          {/* 2 SIRA / 2 KOLON Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
            {faqItems.map((faq, idx) => {
              const faqId = `brosur-faq-${idx}`;

              return (
                <div key={idx} className="h-full bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 id={faqId} className="font-black text-xs md:text-sm text-slate-900 mb-2.5 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      <span className="leading-snug">{faq.q}</span>
                    </h3>
                    <div className="h-px bg-slate-100 my-2.5 w-full" />
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. Agency Discount & Related Section */}
        <div className="my-10">
          <AgencyDiscountCTA />
        </div>

        <RelatedBlogPosts category="brosur" />

        {/* 10. Regional City Delivery Grid with Contextual Descriptions */}
        <section className="mt-12 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xs">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mb-1">
              Türkiye Geneli 81 İle Anlaşmalı Kargo Teslimatı
            </h2>
            <p className="text-slate-600 font-medium text-xs md:text-sm">
              İstanbul Topkapı koordinasyon noktamızdan basılan broşür ve matbaa ürünleriniz il bazlı kurumsal ihtiyaçlarınıza özel paketlenerek adresinize sevk edilir.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {[
              { path: "/istanbul-matbaa", title: "İstanbul Matbaa", desc: "Topkapı üzerinden A4, A5 ve katlamalı broşür baskı çözümleri." },
              { path: "/ankara-matbaa", title: "Ankara Matbaa", desc: "Kamu kurumları, eğitim merkezleri ve kurumsal işletmeler için broşürler." },
              { path: "/izmir-matbaa", title: "İzmir Matbaa", desc: "Ege bölgesi otelleri, kafeler ve ticari işletmeler için ofset broşürler." },
              { path: "/bursa-matbaa", title: "Bursa Matbaa", desc: "Otomotiv sanayisi, tekstil ve gıda firmaları için 130 gr ve 200 gr broşürler." },
              { path: "/antalya-matbaa", title: "Antalya Matbaa", desc: "Turizm tesisleri ve restoranlar için menü ve tanıtım broşürleri." },
              { path: "/adana-matbaa", title: "Adana Matbaa", desc: "Restoranlar ve tarım sanayisi için yüksek tirajlı tanıtım broşürleri." },
              { path: "/konya-matbaa", title: "Konya Matbaa", desc: "Sanayi siteleri, makine imalatçıları ve gıda firmaları için broşür baskısı." },
              { path: "/kayseri-matbaa", title: "Kayseri Matbaa", desc: "Mobilya ve üretim firmaları için çok panelli A3/A4 ürün tanıtım föyleri." },
              { path: "/samsun-matbaa", title: "Samsun Matbaa", desc: "Restoranlar ve yerel işletmeler için A5 dağıtım broşürleri." },
              { path: "/trabzon-matbaa", title: "Trabzon Matbaa", desc: "Turizm acenteleri ve işletmeler için Z-kırım tanıtım broşürleri." },
              { path: "/rize-matbaa", title: "Rize Matbaa", desc: "Konaklama tesisleri ve yerel markalar için kuşe broşürler." },
              { path: "/malatya-matbaa", title: "Malatya Matbaa", desc: "Gıda üreticileri ve ticari firmalar için tanıtım föyleri." }
            ].map((city, idx) => (
              <Link
                key={idx}
                to={city.path}
                className="p-3.5 bg-slate-50 hover:bg-sky-50 hover:border-primary/50 rounded-2xl border border-slate-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <h3 className="text-xs font-black text-slate-900 group-hover:text-primary transition-colors mb-1">
                    {city.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium leading-snug">
                    {city.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
