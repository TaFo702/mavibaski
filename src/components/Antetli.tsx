import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  ShoppingCart, 
  CheckCircle, 
  Printer, 
  FileText
} from 'lucide-react';
import { useCart, ANTETLI_DATA, AgencyDiscountCTA, FireWarning } from '../App';
import { CategoryHero } from './CategoryHero';
import { RelatedBlogPosts } from './RelatedBlogPosts';
import {
  ANTETLI_GALLERY_DATA,
  ANTETLI_FAQ_DATA,
  ANTETLI_SCHEMAS
} from '../data/antetliPageContent';

const DynamicImageContainer = ({ 
  src, 
  alt, 
  title, 
  width,
  height,
  className = "",
  imgClassName = ""
}: { 
  src: string; 
  alt: string; 
  title?: string; 
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
}) => {
  return (
    <div className={`overflow-hidden rounded-xl bg-white mb-4 flex items-center justify-center p-1.5 w-full aspect-[4/3] relative transition-all duration-300 border border-gray-100 ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        title={title}
        width={width}
        height={height}
        loading="lazy"
        referrerPolicy="no-referrer"
        className={`w-full h-full object-contain rounded-lg transition-all duration-300 ${imgClassName}`} 
      />
    </div>
  );
};

export const AntetliPage = () => {
  const { openProductDetail } = useCart();

    useEffect(() => {
    const appSeoScript = document.getElementById('app-seo-metadata-jsonld');

    if (appSeoScript) {
      appSeoScript.textContent = JSON.stringify([
        ANTETLI_SCHEMAS.orgSchema,
        ANTETLI_SCHEMAS.websiteSchema
      ]);
    }
  }, []);

  const openWhatsApp = (item: any, ebat: string) => {
    openProductDetail({ ...item, ebat }, "Antetli Kağıt");
  };

  // Group by ebat for row-spanning logic in the table
  const flatItems: any[] = [];
  const groups: { [key: string]: any[] } = {};
  
  ANTETLI_DATA.forEach((category) => {
    category.items.forEach((item) => {
      if (!groups[item.ebat]) {
        groups[item.ebat] = [];
      }
      groups[item.ebat].push(item);
    });
  });

  Object.keys(groups).forEach((ebat) => {
    groups[ebat].forEach((item, index) => {
      flatItems.push({
        ...item,
        groupIndex: index,
        groupSize: groups[ebat].length
      });
    });
  });

  return (
    <div className="bg-white min-h-screen pb-20">
            {/* Breadcrumb Navigation */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <nav className="text-xs font-semibold text-slate-500 uppercase tracking-tight flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          <ChevronDown size={12} className="-rotate-90 text-slate-400 shrink-0" />
          <Link to="/matbaa" className="hover:text-primary transition-colors">Matbaa Ürünleri</Link>
          <ChevronDown size={12} className="-rotate-90 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-bold" aria-current="page">Antetli Kağıt</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-black animate-in fade-in duration-500">
                <CategoryHero
          title="Antetli Kağıt Baskı Fiyatları"
          badge="A4 / A5 Ebat - 80 gr / 90 gr 1. Hamur"
          description={
            <div className="space-y-2">
              <p>
                A4 ve A5 ölçülerinde logolu ve kurumsal antetli kağıt baskı fiyatlarını inceleyebilirsiniz. 80 gr ve 90 gr 1. hamur seçenekleriyle antetli kağıt basımı ve antetli kağıt siparişi için fiyat tablosundaki ürün kodlarını değerlendirebilirsiniz.
              </p>
            </div>
          }
          relatedLinks={[
            { label: "Diplomat Zarf", path: "/zarf" },
            { label: "Cepli Dosya", path: "/dosyalar" },
            { label: "Kartvizit Baskı", path: "/kartvizit" },
            { label: "Makbuz & Fiş", path: "/makbuz-ve-formlar" }
          ]}
          customCtaText="Antetli Kağıt Teklifi Al"
          customCtaLink={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, antetli kağıt baskı fiyatları hakkında bilgi ve teklif almak istiyorum.")}`}
        />

        {/* FİYAT LİSTESİ TABLOSU */}
        <div className="scroll-mt-24 group mb-12">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2 flex-wrap">
                Antetli Kağıt Baskı Fiyatları
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-150 text-[11px] font-bold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>80 gr / 90 gr 1. Hamur - Renkli Baskı</span>
            </div>
          </div>

          <p className="text-gray-650 text-xs sm:text-sm font-semibold mb-6 px-2 leading-relaxed">
  A4 ve A5 antetli kağıt baskı fiyatlarını aşağıdaki tabloda inceleyebilirsiniz. Tabloda 90 gr 1. hamur standart fiyat seçenekleri yer alır; 80 gr antetli kağıt talepleri ayrıca değerlendirilir.
</p>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-300 overflow-visible relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans border-2 border-slate-300">
                <caption className="sr-only">Antetli Kağıt Baskı Fiyat Listesi</caption>
                <thead>
                  <tr className="bg-black text-white border-b-2 border-slate-300 text-center font-black uppercase tracking-tight">
                    <th scope="col" className="p-4 w-10"><span className="sr-only">Kategori</span></th>
                    <th scope="col" className="p-4 w-24 border-r-2 border-slate-700/30">KOD</th>
                    <th scope="col" className="p-4 text-center border-r-2 border-slate-700/30">ADET</th>
                    <th scope="col" className="p-4 text-center border-r-2 border-slate-700/30">EBAT / TÜR</th>
                    <th scope="col" className="p-4 text-left border-r-2 border-slate-700/30">AÇIKLAMA</th>
                    <th scope="col" className="p-4 w-32 border-r-2 border-slate-700/30">FİYAT</th>
                    <th scope="col" className="p-4 w-44 text-center">SİPARİŞ</th>
                  </tr>
                </thead>
                <tbody>
                  {flatItems.map((item, idx) => {
                    const isFirstRow = idx === 0;
                    const isGroupFirstRow = item.groupIndex === 0;

                    return (
                      <tr 
                        key={idx} 
                        className={`${
                          item.groupIndex === item.groupSize - 1 && idx < flatItems.length - 1
                            ? 'border-b-4 border-primary'
                            : 'border-b-2 border-slate-200'
                        } hover:bg-primary/5 hover:shadow-[inset_4px_0_0_0_#29ADDF] transition-all cursor-default group`}
                      >
                        {isFirstRow && (
                          <td 
                            rowSpan={flatItems.length}
                            className="bg-primary text-white font-black text-center p-1 w-10 border-r-2 border-slate-300/40"
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            <span className="tracking-[0.1em] uppercase text-[10px] md:text-[12px] whitespace-nowrap">ANTETLİ KAĞIT BASKI</span>
                          </td>
                        )}
                        <th scope="row" className="p-3 text-center font-bold text-primary border-r-2 border-slate-200 group-hover:text-secondary transition-colors">{item.code}</th>
                        <td className="p-3 text-center text-black font-medium border-r-2 border-slate-200">{item.miktar}</td>
                                                {isGroupFirstRow && (
                          <th
                            scope="rowgroup"
                            rowSpan={item.groupSize}
                            className="p-3 text-center text-black font-black border-r-2 border-slate-200 align-middle text-sm md:text-base whitespace-nowrap bg-gray-50/10"
                          >
                            {item.ebat}
                          </th>
                        )}
                        <td className="p-3 text-left font-medium border-r-2 border-slate-200 text-black whitespace-pre-line">
                          {item.desc}
                        </td>
                        <td className="p-3 text-center font-black text-black border-r-2 border-slate-200 bg-gray-50/30 group-hover:bg-primary/5 text-[14px] md:text-[16px] transition-colors">{item.price}</td>
                        <td className="p-3 text-center">
                          <button 
                            onClick={() => openWhatsApp(item, item.ebat)}
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                          >
                            <ShoppingCart size={14} className="shrink-0" />
                            <span>Hemen Sipariş Ver</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 px-5 py-3 border-t border-gray-150 rounded-b-2xl flex flex-col sm:flex-row justify-center items-center text-xs text-slate-500 font-medium font-sans">
              <span>* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</span>
            </div>
          </div>
          <div className="mt-4">
            <FireWarning />
          </div>
        </div>

        {/* ÜRÜN FOTOĞRAFLARI GALERİSİ */}
        <div className="mb-12 scroll-mt-24">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Antetli Kağıt Ürün Fotoğrafları Galerisi
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ANTETLI_GALLERY_DATA.map((img, idx) => (
              <figure 
                key={idx} 
                className="bg-gray-50 border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:bg-white hover:shadow-md transition-all group"
              >
                <DynamicImageContainer 
                  src={img.src} 
                  alt={img.alt} 
                  title={img.title} 
                  width={img.width}
                  height={img.height}
                  imgClassName="group-hover:scale-105"
                />
                <div className="mt-2">
                  <h3 className="text-sm font-black text-black uppercase mb-1.5">{img.title}</h3>
                  <figcaption className="text-gray-550 text-xs font-semibold leading-relaxed">
                    {img.desc}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

                <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Antetli Kağıt Baskı ve Sipariş Süreci
            </h2>
          </div>

          <div className="bg-sky-50/50 border border-sky-100 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
            <span className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xl shrink-0 font-bold">💬</span>

            <div className="text-center sm:text-left">
              <h3 className="text-sm font-black text-slate-900 uppercase mb-1">
                Antetli Kağıt Sipariş Adımları
              </h3>

              <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                Fiyat listesinden ürün kodu, ebat ve adet seçimini yaptıktan sonra <strong>Hemen Sipariş Ver</strong> butonuyla WhatsApp sipariş hattımıza ulaşabilirsiniz. Logo, firma bilgileri ve sipariş detaylarını paylaşmanız yeterlidir. Baskı süreci sipariş bilgilerine göre planlanır.
              </p>
            </div>
          </div>
        </div>
            
                <div className="mb-12 text-black scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-base md:text-lg font-black text-black uppercase tracking-tight mb-4">
                  Antetli Kağıt Baskı Seçenekleri
                </h2>

                <p className="text-xs text-gray-650 font-semibold leading-relaxed text-justify">
                  Antetli kağıt baskısında renk tercihi ve baskı seçeneği, firmanın kurumsal tasarımına ve sipariş detaylarına göre belirlenir. 80 gr ve 90 gr 1. hamur kağıt seçenekleri A4 ve A5 ürünlerde kullanılmaktadır.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-base md:text-lg font-black text-black uppercase tracking-tight mb-4">
                  Antetli Kağıt Baskı Dosyası Nasıl Hazırlanır?
                </h2>

                <p className="text-xs text-gray-650 font-semibold leading-relaxed text-justify">
                  Baskı dosyasında logo, firma bilgileri, ebat ve baskı detaylarının yer alması gerekir. Dosya hazırlama koşulları ve sipariş bilgileri, baskı öncesinde paylaşılır.
                </p>
              </div>
            </div>
          </div>
        </div>
          {/* NEDEN BİZ TERCİH EDİLİYORUZ? */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Antetli Kağıt Baskıda Öne Çıkan Bilgiler
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                            {[
                {
                  title: "A4 ve A5 Seçenekleri",
                  desc: "Fiyat tablosunda A4 ve A5 antetli kağıt seçenekleri yer almaktadır."
                },
                {
                  title: "80 gr / 90 gr Seçenekleri",
                  desc: "Antetli kağıt ürünlerinde 80 gr ve 90 gr 1. hamur seçenekleri sunulmaktadır."
                },
                {
                  title: "Ürün Kodlarıyla Sipariş",
                  desc: "ANT1–ANT6 ürün kodları üzerinden ebat, adet ve fiyat bilgileri incelenebilir."
                },
                {
                  title: "Kurumsal Antetli Kağıt",
                  desc: "Logo, firma bilgileri ve kurumsal iletişim unsurları antetli kağıt tasarımında kullanılabilir."
                },
                {
                  title: "WhatsApp Sipariş Hattı",
                  desc: "Ürün kodu ve sipariş bilgileri WhatsApp hattı üzerinden paylaşılabilir."
                }
                ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                    <h3 className="font-black text-black uppercase text-[12px] leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-xs text-gray-650 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FİYATI ETKİLEYEN FAKTÖRLER */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Antetli Kağıt Fiyatını Neler Belirler?
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
                        <p className="text-sm font-semibold text-gray-650 mb-6 leading-relaxed text-justify">
              Antetli kağıt baskı fiyatları; sipariş adedi, A4 veya A5 ebatı ve 90 gr 1. hamur standart ürünlere göre listelenir. 80 gr antetli kağıt talepleri ayrıca değerlendirilir.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Sipariş Adedi",
                  desc: "Fiyat tablosundaki adet seçenekleri sipariş miktarının belirlenmesine yardımcı olur."
                },
                {
                  title: "Ebat Seçeneği",
                  desc: "A4 ve A5 ebatları ürün kodlarına göre ayrı seçenekler olarak listelenmiştir."
                },
                {
                  title: "Kağıt Gramajı",
                  desc: "80 gr ve 90 gr 1. hamur seçenekleri ürün ve sipariş detaylarına göre değerlendirilir."
                },
                {
                  title: "Baskı Detayı",
                  desc: "Baskı rengi ve tasarım bilgileri sipariş sırasında paylaşılabilir."
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm">
                  <h3 className="font-extrabold text-primary uppercase text-xs mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-550 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ÜRETİM SÜRECİ */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-secondary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Antetli Kağıt Baskı Süreci
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
            <p className="text-sm font-semibold text-gray-650 mb-6 leading-relaxed">
              Antetli kağıt baskı süreci; ürün kodu, ebat, adet ve baskı bilgilerinin belirlenmesi, baskı planlaması ve ürünün hazırlanması adımlarından oluşur:
            </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Ürün Seçimi",
                  desc: "Ürün kodu, ebat ve adet bilgileri fiyat tablosundan belirlenir."
                },
                {
                  step: "2",
                  title: "Sipariş Bilgileri",
                  desc: "Logo, firma bilgileri ve baskı detayları sipariş sırasında paylaşılır."
                },
                {
                  step: "3",
                  title: "Baskı Planlaması",
                  desc: "80 gr veya 90 gr 1. hamur ve baskı seçeneğine göre sipariş planlanır."
                },
                {
                  step: "4",
                  title: "Hazırlama ve Paketleme",
                  desc: "Hazırlanan antetli kağıtlar sipariş bilgilerine göre düzenlenir ve paketleme aşamasına alınır."
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-black shrink-0 text-xs">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-black text-black uppercase text-xs mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-650 font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

                {/* ÖLÇÜLER VE KAĞIT ÖZELLİKLERİ */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Antetli Kağıt Ölçüleri &amp; Özellikleri
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-950 uppercase mb-4">
                  Ebat Karşılaştırması
                </h3>

                <p className="text-xs text-gray-650 mb-4 font-semibold">
                  Fiyat tablosunda A4 ve A5 antetli kağıt seçenekleri yer almaktadır. Ebat tercihi ürün kodu ve sipariş detaylarına göre belirlenir.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold leading-relaxed mb-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-150">
                    <h4 className="font-extrabold text-primary uppercase mb-2">
                      A4 Ebat (21 × 29,7 cm)
                    </h4>

                    <p className="text-slate-650 mb-2 leading-relaxed">
                      A4, antetli kağıt ürünlerinde kullanılan ebat seçeneklerinden biridir.
                    </p>

                    <ul className="space-y-1 text-slate-700">
                      <li>✓ A4 ebat seçeneği</li>
                      <li>✓ Logo ve firma bilgileri için kullanılabilir</li>
                      <li>✓ Kurumsal yazışma tasarımlarında değerlendirilebilir</li>
                      <li>✓ Fiyat tablosundaki ürün kodlarıyla incelenebilir</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-150">
                    <h4 className="font-extrabold text-secondary uppercase mb-2">
                      A5 Ebat (15 × 21 cm)
                    </h4>

                    <p className="text-slate-650 mb-2 leading-relaxed">
                      A5, antetli kağıt ürünlerinde kullanılan diğer ebat seçeneğidir.
                    </p>

                    <ul className="space-y-1 text-slate-700">
                      <li>✓ A5 ebat seçeneği</li>
                      <li>✓ Logo ve firma bilgileri için kullanılabilir</li>
                      <li>✓ Kurumsal doküman tasarımlarında değerlendirilebilir</li>
                      <li>✓ Fiyat tablosundaki ürün kodlarıyla incelenebilir</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-950 uppercase mb-4">
                  Kağıt ve Baskı Seçenekleri
                </h3>

                <p className="text-xs text-gray-650 mb-4 font-semibold">
                  Antetli kağıt baskısında 80 gr ve 90 gr 1. hamur seçenekleri sunulmaktadır. Fiyat tablosunda 90 gr standart ürünler listelenir; 80 gr talepleri ayrıca değerlendirilir.
                </p>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-150 flex gap-4">
                    <FileText className="text-primary w-6 h-6 shrink-0 mt-0.5" />

                    <div>
                      <h4 className="font-extrabold text-black uppercase text-xs mb-1">
                        80 gr / 90 gr 1. Hamur
                      </h4>

                      <p className="text-xs text-gray-650 font-semibold leading-relaxed">
                        Antetli kağıt ürünlerinde 80 gr ve 90 gr 1. hamur seçenekleri bulunmaktadır; fiyat tablosunda 90 gr standart ürünler listelenir.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-gray-150 flex gap-4">
                    <Printer className="text-secondary w-6 h-6 shrink-0 mt-0.5" />

                    <div>
                      <h4 className="font-extrabold text-black uppercase text-xs mb-1">
                        Baskı ve Sipariş Bilgileri
                      </h4>

                      <p className="text-xs text-gray-650 font-semibold leading-relaxed">
                        Logo, firma bilgileri ve baskı detayları sipariş sırasında paylaşılabilir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SSS (FAQ) ALANI */}
        <div className="mb-14 text-black scroll-mt-24">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Antetli Kağıt Baskı Hakkında Sıkça Sorulan Sorular
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {ANTETLI_FAQ_DATA.map((faq, idx) => (
              <div key={idx} className="h-full border border-gray-200 rounded-2xl p-5 bg-white shadow-xs flex flex-col justify-between text-black">
                <div>
                  <h3 className="md:text-base text-sm leading-relaxed mb-2.5 text-black font-bold flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" />
                    <span>{faq.q}</span>
                  </h3>
                  <div className="h-px bg-gray-100 my-2.5 w-full" />
                  <p className="text-slate-650 md:text-sm text-xs leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <AgencyDiscountCTA />
        <RelatedBlogPosts category="antetli" />
      </div>
    </div>
  );
};
