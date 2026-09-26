import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ChevronDown } from 'lucide-react';
import { useCart, ProductSEOSection, FireWarning } from '../App';
import RelatedBlogPosts from './RelatedBlogPosts';
import { BLOKNOTLAR_FAQS, BLOKNOTLAR_SCHEMAS } from '../data/bloknotlarPageContent';
import { BLOKNOTLAR_DATA } from '../data/extraProductData';

export { BLOKNOTLAR_DATA };

const BLOKNOT_DETAILS = {
  breadcrumbTitle: "Promosyon Bloknot",
  h1Title: "Promosyon ve Kapaklı Bloknot Baskısı",
   subtitle: "Kurumsal bloknot baskı çözümlerini A5 ve A6 ölçülerinde, kapaklı veya kapaksız modellerle planlayabilirsiniz. Firmanızın logosuna ve tasarımına göre baskılı bloknot, logolu bloknot ve firmaya özel bloknot seçenekleri sunulur.",
  gallery: [
    {
      src: "/images/bloknot/bloknot-baski-fiyatlari.webp",
      alt: "Kapaklı promosyon bloknot baskı örneği ve sırt dikiş kalitesi",
      title: "Promosyon Bloknot Baskısı",
      desc: "Kalın kuşe kapaklı promosyon bloknot baskı örneği."
    },
    {
      src: "/images/bloknot/bloknot-ornegi.webp",
      alt: "Tutkallı kapaksız bloknot not defteri baskısı ve yaprak yapısı",
      title: "Tutkallı Kapaksız Bloknot",
      desc: "Üstten tutkallı kapaksız bloknotlar, pratik not alma amacıyla tercih edilebilir."
    },
    {
      src: "/images/bloknot/bloknot-tasarimi.webp",
      alt: "Özel tasarım kurumsal logolu bloknot baskı detayı",
      title: "Özel Tasarımlı Bloknot",
      desc: "Özel tasarımlı bloknotlar, kurumsal kimliğinize uygun baskı ve cilt seçenekleriyle hazırlanabilir."
    },
    {
      src: "/images/bloknot/kocanli-bloknot-baski.webp",
      alt: "Koçanlı bloknot baskısı ve 80 gr 1. hamur kağıt kalitesi",
      title: "Koçanlı Bloknot Baskısı",
      desc: "80 gr 1. hamur kağıt üzerine hazırlanan koçanlı bloknot baskısı."
    },
    {
      src: "/images/bloknot/spiralli-bloknot-baski.webp",
      alt: "Spiralli kurumsal promosyon bloknot modeli",
      title: "Spiralli Bloknot Modelleri",
      desc: "Logo baskısı ve spiralli cilt seçeneğiyle hazırlanan kurumsal not defterleri."
    },
    {
      src: "/images/kup-bloknot/promosyon-kup-bloknot-ornegi.webp",
      alt: "Promosyon küp bloknot ve masaüstü notluk seti",
      title: "Küp Bloknot ve Notluk Seti",
      desc: "Kutulu küp bloknot ve masaüstü notluk seçenekleri."
    }
  ],
  usageGallery: [
    {
      src: "/images/bloknot/bloknot-baski-fiyatlari.webp",
      alt: "Yönetim toplantı masasında kurumsal kapaklı bloknot kullanımı",
      title: "Yönetim Toplantılarında Prestij",
      desc: "Toplantı ve ofis kullanımı için not alma amacıyla değerlendirilebilir."
    },
    {
      src: "/images/bloknot/spiralli-bloknot-baski.webp",
      alt: "Fuar ve kongre standında promosyon bloknot dağıtımı",
      title: "Fuar Standında Etkili Tanıtım",
      desc: "Etkinlik ve fuar standlarında tanıtım amacıyla kullanılabilir."
    },
    {
      src: "/images/kup-bloknot/kutulu-kup-bloknot-baski.webp",
      alt: "Ofis çalışma masasında hızlı not alma amaçlı bloknot kullanımı",
      title: "Günlük Ofis Çalışmalarında Konfor",
      desc: "Ofis çalışanlarının masasında her an el altında bulunan, hızlı not alma ve planlama pratikliği sunan yapı."
    },
    {
      src: "/images/bloknot/kocanli-bloknot-baski.webp",
      alt: "Saha satış temsilcileri için pratik cep boy not defteri kullanımı",
      title: "Saha ve Mobil Satış Pratikliği",
      desc: "Saha ekiplerinin cep ve çanta boy pratikliği ile sahada kolayca not alabilmesi için tasarlanan ergonomi."
    }
  ],
  faqList: BLOKNOTLAR_FAQS
};

const DynamicImageContainer = ({ 
  src, 
  alt, 
  title, 
  className = "",
  imgClassName = ""
}: { 
  src: string; 
  alt: string; 
  title?: string; 
  className?: string;
  imgClassName?: string;
}) => {
  return (
    <div className={`overflow-hidden rounded-xl bg-white mb-4 flex items-center justify-center p-1.5 w-full aspect-[4/3] relative transition-all duration-300 border border-gray-100 ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        title={title}
        width={400}
        height={300}
        loading="lazy"
        referrerPolicy="no-referrer"
        className={`w-full h-full object-contain rounded-lg transition-all duration-300 ${imgClassName}`} 
      />
    </div>
  );
};

export const BloknotlarPage = () => {
  const { openProductDetail } = useCart();

  useEffect(() => {
    const schemasToManage = [
      {
        id: 'bloknotlar-breadcrumb-schema',
        data: BLOKNOTLAR_SCHEMAS.breadcrumbSchema
      },
      {
        id: 'bloknotlar-product-schema',
        data: BLOKNOTLAR_SCHEMAS.productSchema
      },
      {
        id: 'bloknotlar-faq-schema',
        data: BLOKNOTLAR_SCHEMAS.faqSchema
      }
    ];

    schemasToManage.forEach(({ id, data }) => {
      let element = document.getElementById(id) as HTMLScriptElement | null;

      if (!element) {
        element = document.createElement('script');
        element.id = id;
        element.type = 'application/ld+json';
        document.head.appendChild(element);
      }

      element.textContent = JSON.stringify(data);
    });

    return () => {
      schemasToManage.forEach(({ id }) => {
        document.getElementById(id)?.remove();
      });
    };
  }, []);

  const openWhatsApp = (
    item: any,
    type: string,
    quantity: string,
    price: string
  ) => {
    const p500Val = parseInt(item.p500.replace(/[^\d]/g, ''));
    const p1000Val = parseInt(item.p1000.replace(/[^\d]/g, ''));

    const availableOptions = [
      { miktar: '500 Cilt', price: p500Val },
      { miktar: '1000 Cilt', price: p1000Val }
    ];

    openProductDetail({
      ...item,
      price,
      miktar: quantity,
      desc: `${type} ${item.kapak ? '- Kapak: ' + item.kapak : ''} - İç: ${item.ic}`,
      availableOptions
    }, 'Bloknot');
  };

   return (
    <div className="bg-white min-h-screen pb-20">

      {/* Breadcrumb Alanı */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="text-xs font-bold text-gray-500 uppercase tracking-tight flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          <ChevronDown size={12} className="-rotate-90 text-gray-400 shrink-0" />
          <span className="text-gray-800 font-extrabold truncate">{BLOKNOT_DETAILS.breadcrumbTitle}</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-black animate-in fade-in duration-500">
        {/* H1 BAŞLIK */}
        <div className="text-center mb-6">
          <h1 className="text-[19px] md:text-[26px] lg:text-[31px] font-black text-primary uppercase tracking-tight mb-3 leading-tight">
            {BLOKNOT_DETAILS.h1Title}
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* İLK BÖLÜM: METİN ALANI */}
        <div className="max-w-[1200px] mx-auto text-slate-700 text-sm md:text-[15px] leading-relaxed font-semibold text-justify space-y-4 mb-10">
          <p>
  Bloknot baskısı; kurumsal tanıtım, toplantı ve günlük not alma ihtiyaçları için kullanılabilen basılı ürünlerdir. Kapaklı veya kapaksız modeller; A5 ve A6 ölçüleri, iç sayfa özellikleri ve sipariş adedine göre değerlendirilir. Logolu bloknot ve firmaya özel bloknot talepleriniz için WhatsApp üzerinden bilgi alabilirsiniz.
          </p>
          <p>
            Kurumsal kimlik çalışmalarınızı taçlandırmak için promosyon bloknot defterlerinizi <Link to="/kup-bloknot" className="text-primary hover:underline font-bold">Küp Bloknot</Link>, resmi yazışmalarınız için <Link to="/antetli" className="text-primary hover:underline font-bold">Antetli Kağıt</Link> ve kurumsal evraklarınızı sunmak üzere <Link to="/dosyalar" className="text-primary hover:underline font-bold">Cepli Dosya</Link> baskılarıyla zenginleştirerek eksiksiz bir bayi seti oluşturabilirsiniz. Firma içi kurumsal yazışmalar için <Link to="/zarf" className="text-primary hover:underline font-bold">Zarf Baskı</Link> seçeneklerimizi de inceleyebilirsiniz.
          </p>
        </div>

              {/* Kapaklı Bloknot Section */}
        <div id="fiyat-tablosu" className="mb-12 border border-gray-200 rounded-2xl overflow-visible shadow-xl relative z-10 scroll-mt-24 bg-white">
          <div className="bg-secondary text-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center rounded-t-2xl">
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight">Kapaklı Kurumsal Bloknot</h2>
              <p className="text-xs text-blue-100 font-medium mt-1">Güncel bloknot baskı fiyatları, toptan bloknot fiyatları ve 14x20 cm A5 bloknot fiyatları</p>
            </div>
            <div className="text-right text-[10px] md:text-xs font-semibold mt-2 md:mt-0">
              <p>50 Yapraklı Amerikan Cilt</p>
              <p>Özel kesim kapak farkı 550 TL'dir.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans">
              <caption className="sr-only">Kapaklı Bloknot Baskı Fiyatları ve Ebat Tablosu</caption>
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th scope="col" className="p-4 w-10"><span className="sr-only">Ebat Grubu</span></th>
                  <th scope="col" className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap">KOD</th>
                  <th scope="col" className="p-4 w-28 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap text-center">KAPAK</th>
                  <th scope="col" className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">İÇ YAPRAKLAR</th>
                  <th scope="col" className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap text-center">500 CİLT</th>
                  <th scope="col" className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center whitespace-nowrap border-r border-white/10">SİPARİŞ</th>
                  <th scope="col" className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap text-center">1000 CİLT</th>
                  <th scope="col" className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center whitespace-nowrap">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {BLOKNOTLAR_DATA.kapakli.map((group, gIdx) => (
                  <React.Fragment key={gIdx}>
                    {group.items.map((item, iIdx) => (
                      <tr key={iIdx} className="hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group border-b border-gray-100">
                        {iIdx === 0 && (
                          <th 
                            scope="rowgroup"
                            rowSpan={group.items.length} 
                            className={`${group.color} text-white font-black text-center p-3 w-10 border-r border-white/10`}
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            <span className="text-[12px] whitespace-nowrap tracking-widest">{group.ebat === "14x20cm" ? "14x20cm (A5)" : group.ebat === "9.4x14.3cm" ? "9.4x14.3cm (A6)" : group.ebat}</span>
                          </th>
                        )}
                        <th scope="row" className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors whitespace-nowrap font-sans font-normal">{item.code}</th>
                        <td className="p-3 text-center font-black text-black border-r border-gray-100">
                          {item.kapak}
                        </td>
                        <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.ic}</td>
                        <td className="p-3 text-center font-black text-black text-[14px] md:text-[16px] bg-gray-50/30 group-hover:bg-primary/5 border-r border-gray-100 whitespace-nowrap transition-colors">{item.p500}</td>
                        <td className="p-3 text-center border-r border-gray-100">
                          <button 
                            onClick={() => openWhatsApp(item, 'Kapaklı Bloknot', '500 Cilt', item.p500)} 
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                          >
                            <ShoppingCart size={14} className="shrink-0" />
                            <span>Hemen Sipariş Ver</span>
                          </button>
                        </td>
                        <td className="p-3 text-center font-black text-black text-[14px] md:text-[16px] bg-gray-50/30 group-hover:bg-primary/5 border-r border-gray-100 whitespace-nowrap transition-colors">{item.p1000}</td>
                        <td className="p-3 text-center">
                          <button 
                            onClick={() => openWhatsApp(item, 'Kapaklı Bloknot', '1000 Cilt', item.p1000)} 
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                          >
                            <ShoppingCart size={14} className="shrink-0" />
                            <span>Hemen Sipariş Ver</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 px-5 py-5 border-t border-gray-150 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs font-sans">
            <span className="text-slate-500 font-bold">* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</span>
            <div className="grid grid-cols-2 sm:flex flex-wrap gap-2 w-full lg:w-auto">
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, Kapaklı Bloknot siparişi vermek istiyorum. Yardımcı olabilir misiniz?")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all shadow-md hover:shadow-lg text-center"
              >
                HEMEN SİPARİŞ VER
              </a>
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, hazır bir logomuz/tasarımımız var. Ücretsiz baskı uygunluk kontrolü yaptırmak istiyoruz.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-secondary text-white hover:bg-black px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all shadow-md text-center"
              >
                TASARIM GÖNDER / KONTROL ET
              </a>
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, Kapaklı/Kapaksız bloknot örneklerinden numune talep etmek istiyorum.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-white text-secondary hover:bg-gray-100 border border-gray-300 px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all text-center"
              >
                NUMUNE İSTİYORUM
              </a>
              <a 
                href="#fiyat-tablosu"
                target="_blank" 
                className="inline-flex items-center justify-center gap-1.5 bg-primary/10 text-primary hover:bg-primary/25 border border-primary/20 px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all text-center"
              >
                FİYAT TABLOSUNA GİT
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-6">
          <FireWarning />
        </div>

        {/* Kapaksız Bloknot Section */}
        <div className="mb-12 border border-gray-200 rounded-2xl overflow-visible shadow-xl relative z-10 bg-white">
          <div className="bg-secondary text-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center rounded-t-2xl">
            <h2 className="text-xl font-bold uppercase tracking-tight">Kapaksız Not Defteri</h2>
            <div className="text-right text-[10px] md:text-xs font-semibold">
              <p>50 Yapraklı Tutkallı Bloknot</p>
              <p>Alt karton baskısızdır.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans">
              <caption className="sr-only">Kapaksız Tutkallı Not Defteri ve Bloknot Baskı Fiyatları Tablosu</caption>
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th scope="col" className="p-4 w-10"><span className="sr-only">Ebat Grubu</span></th>
                  <th scope="col" className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap">KOD</th>
                  <th scope="col" className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">İÇ YAPRAKLAR</th>
                  <th scope="col" className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap text-center">500 CİLT</th>
                  <th scope="col" className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center whitespace-nowrap border-r border-white/10">SİPARİŞ</th>
                  <th scope="col" className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap text-center">1000 CİLT</th>
                  <th scope="col" className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center whitespace-nowrap">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {BLOKNOTLAR_DATA.kapaksiz.map((group, gIdx) => (
                  <React.Fragment key={gIdx}>
                    {group.items.map((item, iIdx) => (
                      <tr key={iIdx} className="hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group border-b border-gray-100">
                        {iIdx === 0 && (
                          <th 
                            scope="rowgroup"
                            rowSpan={group.items.length} 
                            className={`${group.color} text-white font-black text-center p-3 w-10 border-r border-white/10`}
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            <span className="text-[12px] whitespace-nowrap tracking-widest">{group.ebat === "14x20cm" ? "14x20cm (A5)" : group.ebat === "9.4x14.3cm" ? "9.4x14.3cm (A6)" : group.ebat}</span>
                          </th>
                        )}
                        <th scope="row" className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors whitespace-nowrap font-sans font-normal">{item.code}</th>
                        <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.ic}</td>
                        <td className="p-3 text-center font-black text-black text-[14px] md:text-[16px] bg-gray-50/30 group-hover:bg-primary/5 border-r border-gray-100 whitespace-nowrap transition-colors">{item.p500}</td>
                        <td className="p-3 text-center border-r border-gray-100">
                          <button 
                            onClick={() => openWhatsApp(item, 'Kapaksız Bloknot', '500 Cilt', item.p500)} 
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                          >
                            <ShoppingCart size={14} className="shrink-0" />
                            <span>Hemen Sipariş Ver</span>
                          </button>
                        </td>
                        <td className="p-3 text-center font-black text-black text-[14px] md:text-[16px] bg-gray-50/30 group-hover:bg-primary/5 border-r border-gray-100 whitespace-nowrap transition-colors">{item.p1000}</td>
                        <td className="p-3 text-center">
                          <button 
                            onClick={() => openWhatsApp(item, 'Kapaksız Bloknot', '1000 Cilt', item.p1000)} 
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                          >
                            <ShoppingCart size={14} className="shrink-0" />
                            <span>Hemen Sipariş Ver</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 px-5 py-5 border-t border-gray-150 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs font-sans">
            <span className="text-slate-500 font-bold">* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</span>
            <div className="grid grid-cols-2 sm:flex flex-wrap gap-2 w-full lg:w-auto">
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, Kapaksız Bloknot siparişi vermek istiyorum. Yardımcı olabilir misiniz?")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all shadow-md hover:shadow-lg text-center"
              >
                HEMEN SİPARİŞ VER
              </a>
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, hazır bir logomuz/tasarımımız var. Kapaksız bloknot için baskı uygunluk kontrolü yaptırmak istiyoruz.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-secondary text-white hover:bg-black px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all shadow-md text-center"
              >
                TASARIM GÖNDER / KONTROL ET
              </a>
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, Kapaksız bloknot örneklerinden numune talep etmek istiyorum.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-white text-secondary hover:bg-gray-100 border border-gray-300 px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all text-center"
              >
                NUMUNE İSTİYORUM
              </a>
              <a 
                href="/Mavi-Basim-Fiyat-Listesi.pdf"
                target="_blank" 
                className="inline-flex items-center justify-center gap-1.5 bg-primary/10 text-primary hover:bg-primary/25 border border-primary/20 px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all text-center"
              >
                FİYAT LİSTESİNİ İNDİR (PDF)
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-6">
          <FireWarning />
        </div>
        <div className="mb-12 p-5 bg-blue-50/40 border border-blue-150 rounded-2xl">
          <p className="text-xs sm:text-sm text-blue-950 font-bold leading-relaxed text-center">
            <strong className="text-primary font-extrabold">Fiyatlandırma Bilgilendirmesi:</strong> Promosyon Bloknot fiyatları; tercih edilen bloknot ebatları (9.4x14.3 cm veya 14x20 cm), kapak ve ciltleme modeli (Nezih kapak, mat/parlak selefon kaplama, laklı kapak), iç sayfa tasarım özellikleri ve toplam sipariş adedine bağlı olarak belirlenmektedir.
          </p>
        </div>

        {/* Teknik Bilgilendirme ve Güvence Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Üretim Toleransı Kartı */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-xs text-amber-950 font-semibold leading-relaxed">
            <h3 className="font-black text-amber-950 uppercase text-xs sm:text-sm mb-3">
              Üretim Toleransı & Fiyatlandırma Güvencesi
            </h3>
            <p className="mb-2">
              Ofset baskı ve ciltleme süreçlerinde makine ayarları nedeniyle <strong>%1 ila %5 arasında fire (ürün adetlerinde eksiklik veya fazlalık)</strong> oluşması teknik bir standarttır.
            </p>
            <p>
              Mavi Basım olarak dürüst ticaret ilkemiz gereğince; eksik teslimat durumunda teslim edilmeyen adetlerin bedeli faturanızdan kesilerek <strong>anında tarafınıza iade edilir</strong> veya sonraki siparişiniz için indirim tanımlanır. Size teslim edilmeyen hiçbir ürünün ücreti yansıtılmaz.
            </p>
          </div>

          {/* Özel Kesim Kapak Detayları Kartı */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 text-xs text-blue-950 font-semibold leading-relaxed">
            <h3 className="font-black text-blue-950 uppercase text-xs sm:text-sm mb-3">
              Özel Kesim Kapak Farkı Detayları (550 TL Fark)
            </h3>
            <p className="mb-2">
              Kapaklı modellerimizin başlığında yer alan <strong>"Özel kesim kapak farkı 550 TL'dir"</strong> ibaresi şu hususları kapsar:
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Kapsam:</strong> Standart düz kesim yerine, ön kapağa markanızın logosuna özel dış kontur kesimleri, oval köşeler veya pencereli oyma pencereler uygulanmasını kapsar.</li>
              <li><strong>Hangi Ürünlerde?:</strong> Sadece 350 gr Kuşe ön kapağı olan Amerikan ciltli Kapaklı Bloknot modellerinde uygulanabilir.</li>
              <li><strong>Limit Sınırı:</strong> Minimum ölçü sınırı yoktur. Grafik ekibimiz logonuzun kesim hattını üretime en uygun şekilde optimize eder.</li>
            </ul>
          </div>
        </div>

        {/* KAPAK SEÇENEKLERİ REHBERİ VE KARAR VERME TABLOSU (POINT 3 & 7) */}
        <div className="mb-14 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="mb-8">
            <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-black uppercase tracking-wider">
              KAPAK SEÇENEKLERİ & KARAR REHBERİ
            </span>
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight mt-2">
              Bloknot Kapak Seçenekleri & Karşılaştırma Tablosu
            </h2>
            <p className="text-xs sm:text-sm text-gray-550 mt-1 font-semibold leading-relaxed">
              Fiyat tablomuzda yer alan <strong>NK, CYP, CYM ve CYML4</strong> kodlarının detaylı açıklamalarını ve projenize en uygun bloknot modelini aşağıdaki tablodan tek bakışta inceleyebilirsiniz.
            </p>
          </div>

          {/* 1. Kapak Seçenekleri Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="border border-gray-150 rounded-2xl p-4 bg-gray-50/50 hover:bg-white hover:border-gray-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs text-slate-400 font-bold">KOD: NK</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded">STANDART KAPAK</span>
                </div>
                <h3 className="font-black text-sm text-gray-900 uppercase mt-1 mb-2">Nezih Kapak (Standart)</h3>
                <p className="text-[11px] text-gray-650 font-medium leading-relaxed">
                 350 gr mat kuşe karton üzerine selefonsuz kapak seçeneğidir. Kapak tercihi sipariş detaylarına göre belirlenir.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-bold">Fiyat Seviyesi: Taban Fiyat</div>
            </div>
            <div className="border border-gray-150 rounded-2xl p-4 bg-gray-50/50 hover:bg-white hover:border-emerald-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs text-emerald-500 font-black">KOD: CYP</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded">EKONOMİK SELEFON</span>
                </div>
                <h3 className="font-black text-sm text-emerald-900 uppercase mt-1 mb-2">Ciltli Yarı-Parlak (Parlak Selefonlu)</h3>
                <p className="text-[11px] text-gray-650 font-medium leading-relaxed">
                  Bloknotlar, kurumsal tanıtım ve günlük not alma süreçlerinde kullanılabilen basılı ürünlerdir. Kapaklı veya kapaksız modeller, firmanın kullanım amacına ve sipariş detaylarına göre değerlendirilebilir.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-bold">Fiyat Seviyesi: Ekonomik (+%10)</div>
            </div>
            <div className="border border-gray-150 rounded-2xl p-4 bg-gray-50/50 hover:bg-white hover:border-primary/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs text-primary font-black">KOD: CYM</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded">EN ÇOK SATAN</span>
                </div>
                <h3 className="font-black text-sm text-primary uppercase mt-1 mb-2">Ciltli Yüzey Mat (Mat Selefonlu)</h3>
                <p className="text-[11px] text-gray-650 font-medium leading-relaxed">
                  Kapak üzerine çekilen özel mat selefon, bloknota son derece elit, kadifemsi ve yansıma yapmayan ağır bir duruş kazandırır. Kurumsal kimlik projelerinde en çok tercih edilen seçenektir.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-bold">Fiyat Seviyesi: Standart Fiyat (+%12)</div>
            </div>
            <div className="border border-gray-150 rounded-2xl p-4 bg-gray-50/50 hover:bg-white hover:border-amber-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs text-amber-600 font-black">KOD: CYML4</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded">PRESTİJLİ LÜKS</span>
                </div>
                <h3 className="font-black text-sm text-amber-950 uppercase mt-1 mb-2">Ciltli Mat + Lokal Laklı</h3>
                <p className="text-[11px] text-gray-650 font-medium leading-relaxed">
                  Mat selefonlu kapağın belirli alanlarına logo veya başlık için lokal lak uygulanabilir. Uygulama tasarım ve sipariş detaylarına göre netleştirilir.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-bold">Fiyat Seviyesi: Premium Segment (+%25)</div>
            </div>
          </div>

          {/* 2. Karşılaştırma / Karar Verme Tablosu */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse font-sans">
              <caption className="sr-only">Bloknot Türleri, Kapak ve Cilt Karşılaştırma Tablosu</caption>
              <thead>
                <tr className="bg-slate-900 text-white text-[11px] sm:text-xs uppercase font-black tracking-wider">
                  <th scope="col" className="p-3">Bloknot Türü</th>
                  <th scope="col" className="p-3">Kapak & Cilt Türü</th>
                  <th scope="col" className="p-3">En Uygun Olduğu Kullanım Alanı</th>
                  <th scope="col" className="p-3 text-center">Fiyat Seviyesi / Bütçe Etkisi</th>
                  <th scope="col" className="p-3 text-center">Ekonomiklik</th>
                  <th scope="col" className="p-3 text-center">Prestij Düzeyi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs text-gray-700 font-medium">
                <tr className="hover:bg-slate-50 transition-all">
                  <th scope="row" className="p-3 font-bold text-slate-950 text-xs sm:text-sm text-left font-sans font-normal">A5 Kapaklı (14x20 cm)</th>
                  <td className="p-3">350 gr Kuşe Kapak + Amerikan Cilt</td>
                  <td className="p-3">Fuar ve kongre dağıtımları, bayi toplantıları, prestijli kurumsal hediyeler.</td>
                  <td className="p-3 text-center text-slate-600 font-bold">Dengeli Yatırım (Orta Segment)</td>
                  <td className="p-3 text-center text-amber-600 font-bold">Orta / Dengeli</td>
                  <td className="p-3 text-center font-bold text-slate-800">Premium</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-all">
                  <th scope="row" className="p-3 font-bold text-slate-950 text-xs sm:text-sm text-left font-sans font-normal">A6 Kapaklı (9.4x14.3 cm)</th>
                  <td className="p-3">350 gr Kuşe Kapak + Amerikan Cilt</td>
                  <td className="p-3">Saha satış ekipleri, şantiye/doktor cep notları, mobil kullanıma uygun pratik tanıtım.</td>
                  <td className="p-3">350 gr kuşe kapakta mat veya parlak selefon seçenekleri</td>
                  <td className="p-3 text-center text-emerald-600 font-bold">Yüksek</td>
                  <td className="p-3 text-center font-bold text-slate-800">Prestijli</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-all">
                  <th scope="row" className="p-3 font-bold text-slate-950 text-xs sm:text-sm text-left font-sans font-normal">A5 Kapaksız (14x20 cm)</th>
                  <td className="p-3">Kapaksız + Üstten Tutkal Cilt</td>
                  <td className="p-3">Şirket içi ofis masaları, dahili not alma, eğitim kurumları, hızlı eskiz.</td>
                  <td className="p-3 text-center text-emerald-700 font-black">Düşük Bütçeli (Maksimum Tasarruf)</td>
                  <td className="p-3 text-center text-emerald-600 font-black">Çok Yüksek</td>
                  <td className="p-3 text-center font-bold text-slate-800">Standart</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-all">
                  <th scope="row" className="p-3 font-bold text-slate-950 text-xs sm:text-sm text-left font-sans font-normal">A6 Kapaksız (9.4x14.3 cm)</th>
                  <td className="p-3">Kapaksız + Üstten Tutkal Cilt</td>
                  <td className="p-3">Reçete defterleri, restoran sipariş fişleri, çok yoğun adetli kitle dağıtımları.</td>
                  <td className="p-3 text-center text-emerald-700 font-black">En Düşük Maliyet (Yüksek Adetli)</td>
                  <td className="p-3 text-center text-emerald-600 font-black">Maksimum</td>
                  <td className="p-3 text-center font-bold text-slate-800">Temel Sınıf</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6 RESİMLİ ÜRÜN GALERİSİ */}
        <div className="mt-16 mb-12 text-black scroll-mt-24" id="galeri">
          <div className="flex items-center gap-3 mb-4 px-2">
            <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Promosyon ve Kapaklı Bloknot Galeri
            </h2>
          </div>

          {/* Alt Başlık 1: Ürün Görselleri */}
          <div className="mb-6 px-2">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-800 uppercase tracking-tight border-b border-gray-200 pb-2">
              1. Ürün Görselleri (Detaylar ve Teknik Yapı)
            </h3>
            <p className="text-xs text-gray-550 mt-1 font-semibold leading-relaxed">
              Ürünlerimizin sırt kalınlığını, kapak dokusunu, ciltleme yapısını ve iç sayfa düzenini yakından inceleyin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {BLOKNOT_DETAILS.gallery.map((img, idx) => (
              <figure 
                key={idx} 
                className="bg-gray-50 border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:bg-white hover:shadow-md transition-all group"
              >
                <DynamicImageContainer 
                  src={img.src} 
                  alt={img.alt} 
                  title={img.title} 
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

          {/* Alt Başlık 2: Kullanım Görselleri */}
          <div className="mb-6 px-2 mt-12">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-800 uppercase tracking-tight border-b border-gray-200 pb-2">
              2. Ürün Kullanım Görselleri (Saha ve Ofis Uygulamaları)
            </h3>
            <p className="text-xs text-gray-550 mt-1 font-semibold leading-relaxed">
              Bloknotlarımızın kurumsal ofislerden saha satış ekiplerine kadar farklı alanlardaki gerçek kullanım senaryolarını görüntüleyin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BLOKNOT_DETAILS.usageGallery && BLOKNOT_DETAILS.usageGallery.map((img, idx) => (
              <figure 
                key={idx} 
                className="bg-gray-50 border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:bg-white hover:shadow-md transition-all group"
              >
                <DynamicImageContainer 
                  src={img.src} 
                  alt={img.alt} 
                  title={img.title} 
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

        {/* ÜRÜN VARYASYONU KARŞILAŞTIRMA TABLOSU */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Kapaklı vs. Kapaksız Bloknot Karşılaştırması
            </h2>
          </div>
          <div className="overflow-x-auto border border-gray-300 rounded-2xl shadow-md">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-semibold">
              <caption className="sr-only">Kapaklı ve Kapaksız Bloknot Özellik Karşılaştırma Tablosu</caption>
              <thead>
                <tr className="bg-secondary text-white uppercase tracking-wider text-[11px] md:text-xs">
                  <th scope="col" className="p-3 border-b border-gray-300">ÖZELLİK</th>
                  <th scope="col" className="p-3 border-b border-gray-300 bg-primary/10 text-primary">KAPAKLI BLOKNOT</th>
                  <th scope="col" className="p-3 border-b border-gray-300">KAPAKSIZ BLOKNOT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <th scope="row" className="p-3 font-black text-gray-900 bg-gray-50 text-left font-sans font-normal">Ön Kapak</th>
                  <td className="p-3 text-primary bg-primary/5">350 gr Kuşe Karton, Koruyucu Selefonlu</td>
                  <td className="p-3 text-gray-700">Kapak Bulunmaz (Doğrudan Not Sayfaları)</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-black text-gray-900 bg-gray-50 text-left font-sans font-normal">Ciltleme Tipi</th>
                  <td className="p-3 text-primary bg-primary/5">Amerikan Cilt (Sağlam Sırt Yapıştırma)</td>
                  <td className="p-3 text-gray-700">Ekonomik Üstten Tutkallı Cilt</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-black text-gray-900 bg-gray-50 text-left font-sans font-normal">Kapak ve Selefon</th>
                  <td className="p-3 text-primary bg-primary/5">350 gr kuşe kapak ve selefon seçeneği</td>
                  <td className="p-3 text-gray-700">Kapaksız modelde masaüstü not alma ve sayfa koparma seçeneği</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-black text-gray-900 bg-gray-50 text-left font-sans font-normal">Kullanım Amacı</th>
                  <td className="p-3 text-primary bg-primary/5">Kurumsal tanıtım ve dağıtım için değerlendirilir</td>
                  <td className="p-3 text-gray-700">Ofis ve saha not alma kullanımı için değerlendirilir</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-black text-gray-900 bg-gray-50 text-left font-sans font-normal">Fiyat Avantajı</th>
                  <td className="p-3 text-primary bg-primary/5">Fiyat seviyesi ürün özelliklerine göre değişir</td>
                  <td className="p-3 text-gray-700">Toptan siparişlerde adet ve özelliklere göre fiyatlandırılır</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* CTA for Comparison Table */}
          <div className="mt-4 flex flex-col sm:flex-row justify-end items-center gap-3">
            <a 
              href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, Kapaklı ve Kapaksız bloknot karşılaştırmasını inceledim. Bizim için en uygun modeli belirleyip sipariş vermek istiyorum.")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 px-4 py-2 rounded-full text-xs font-black uppercase transition-all shadow-sm"
            >
              Karşılaştırmaya Göre Teklif Al
            </a>
          </div>
        </div>

        {/* Neden Promosyon ve Kapaklı Bloknot Tercih Edilmelidir? */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-2.5 h-6 bg-secondary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Neden Promosyon ve Kapaklı Bloknot Tercih Edilmelidir?
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-150 rounded-3xl p-6 md:p-8 space-y-4 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650">
            <p>
              Bloknotlar; kurumsal tanıtım, toplantı ve günlük not alma süreçlerinde kullanılabilen basılı ürünlerdir. Kapaklı veya kapaksız modeller, kullanım amacına, ölçüye, iç sayfa özelliklerine ve sipariş adedine göre değerlendirilir.
            </p>
            {/* İÇ LİNKLER BÖLÜMÜ */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="font-bold text-black mb-2 uppercase text-xs">Kurumsal Setinizi Tamamlayacak Alakalı Ürünlerimiz:</p>
              <div className="flex flex-wrap gap-2">
                <Link to="/kup-bloknot" className="bg-white hover:bg-primary/10 text-primary hover:text-secondary border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                  Küp Bloknot Baskısı
                </Link>
                <Link to="/dosyalar" className="bg-white hover:bg-primary/10 text-primary hover:text-secondary border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                  Cepli Dosya Baskısı
                </Link>
                <Link to="/antetli" className="bg-white hover:bg-primary/10 text-primary hover:text-secondary border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                  Antetli Kağıt Baskısı
                </Link>
                <Link to="/kartvizit" className="bg-white hover:bg-primary/10 text-primary hover:text-secondary border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                  Kartvizit Baskısı
                </Link>
                <Link to="/zarf" className="bg-white hover:bg-primary/10 text-primary hover:text-secondary border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                  Zarf Baskısı
                </Link>
              </div>
            </div>

            {/* Hızlı Fiyat Geçiş CTA */}
            <div className="mt-4 pt-4 border-t border-gray-150 flex flex-col sm:flex-row justify-end items-center gap-3">
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, promosyon ve kapaklı bloknot için özel ölçü, farklı adet veya farklı özelliklerde özel fiyat teklifi alabilir miyim?")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 px-4 py-2 rounded-full text-xs font-black uppercase transition-all shadow-sm"
              >
                Özel Ölçü / Teklif Al (WhatsApp)
              </a>
            </div>
          </div>
        </div>

        {/* MALZEME & TEKNİK ÖZELLİKLER */}
        <div className="mb-12 text-black">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Malzeme & Teknik Özellikler
              </h2>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch font-medium">
              
              {/* 80 gr 1. Hamur Kağıt */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">80 gr 1. Hamur</h3>
                  <ul className="text-xs text-gray-750 space-y-2 list-none font-semibold">
                    <li><strong className="text-black">Yaprak kağıt kalınlığı:</strong> 80 gr/m²</li>
                    <li><strong className="text-black">Yazım konforu:</strong> Tükenmez, kurşun ve dolma kalemle pürüzsüz yazım</li>
                    <li><strong className="text-black">Yüzey kalitesi:</strong> Parlak beyaz zemin üzerine yüksek kontrastlı ofset baskı</li>
                  </ul>
                </div>
              </div>

              {/* 350 gr Kuşe Kapak */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">350 gr Kuşe Kapak</h3>
                  <ul className="text-xs text-gray-750 space-y-2 list-none font-semibold">
                    <li><strong className="text-black">Karton ağırlığı:</strong> 350 gr/m²</li>
                    <li><strong className="text-black">Kapak türü:</strong> Kalın parlak kuşe (sağlam ve rijit kapak)</li>
                    <li><strong className="text-black">Kapak yüzeyi:</strong> 350 gr kuşe kapakta mat veya parlak selefon seçenekleri</li>
                  </ul>
                </div>
              </div>

              {/* Mat / Parlak Selefon */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">Koruyucu Selefon</h3>
                  <ul className="text-xs text-gray-750 space-y-2 list-none font-semibold">
                    <li><strong className="text-black">Kapak yüzeyi:</strong> 350 gr kuşe kapakta mat veya parlak selefon seçenekleri</li>
<li><strong className="text-black">Selefon seçeneği:</strong> Mat veya parlak yüzey tercihi</li>
<li><strong className="text-black">Yüzey görünümü:</strong> Selefon türüne göre değişen mat veya parlak görünüm</li>
                  </ul>
                </div>
              </div>

              {/* Cilt Seçenekleri */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">Cilt Seçenekleri</h3>
                  <ul className="text-xs text-gray-750 space-y-2 list-none font-semibold">
                    <li><strong className="text-black">Tutkallı Cilt:</strong> Üst kısımdan cilt tutkalıyla birleştirilmiş koparmalı model</li>
                    <li><strong className="text-black">Amerikan Cilt:</strong> Kapaklı modeller için son derece sağlam sırt yapıştırması</li>
                    <li><strong className="text-black">Pratiklik:</strong> Sayfaların çanta içinde dağılmasını önleyen pürüzsüz mekanizma</li>
                  </ul>
                </div>
              </div>

            </div>
            {/* CTA for Technical Specs */}
            <div className="pt-4 border-t border-gray-150 flex flex-col sm:flex-row justify-end items-center gap-3">
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, promosyon bloknot malzeme ve teknik özelliklerini inceledim. Bizim için baskı yaptırmak istiyoruz.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 px-4 py-2 rounded-full text-xs font-black uppercase transition-all shadow-sm"
              >
                Baskı Malzemeleri Hakkında Bilgi Al
              </a>
            </div>
          </div>
        </div>

        {/* EBAT VE BOYUT KARŞILAŞTIRMA TABLOSU */}
        <div id="teknik-ozellikler" className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Ebat & Boyut Seçenekleri
            </h2>
          </div>
          <div className="overflow-x-auto border border-gray-300 rounded-2xl shadow-md">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-semibold">
              <caption className="sr-only">Bloknot Ebat ve Boyut Seçenekleri Tablosu</caption>
              <thead>
                <tr className="bg-secondary text-white uppercase tracking-wider text-[11px] md:text-xs">
                  <th scope="col" className="p-3 border-b border-gray-300">EBAT ADI</th>
                  <th scope="col" className="p-3 border-b border-gray-300">ÖLÇÜ (cm)</th>
                  <th scope="col" className="p-3 border-b border-gray-300">YAPRAK SAYISI</th>
                  <th scope="col" className="p-3 border-b border-gray-300">EN UYGUN SEKTÖRLER & KULLANIM ALANI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
                               <tr>
                  <th scope="row" className="p-3 font-black text-black bg-gray-50 text-left font-sans font-normal">
                    9.4x14.3 cm (A6)
                  </th>
                  <td className="p-3 font-bold text-primary">9.4 x 14.3 cm</td>
                  <td className="p-3">50 Yaprak</td>
                  <td className="p-3">Cep boy kullanım için pratik bir bloknot seçeneğidir.</td>
                </tr>
                <tr>
                  <th scope="row" className="p-3 font-black text-black bg-gray-50 text-left font-sans font-normal">14x20 cm (A5)</th>
                  <td className="p-3 font-bold text-primary">14.0 x 20.0 cm</td>
                  <td className="p-3">50 Yaprak</td>
                  <td className="p-3">Standart defter boyudur. Toplantı notları, tasarım eskizleri ve ofis masaları için en popüler ebattır.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tasarım, Üretim & Sipariş Verme Süreci */}
        <section className="bg-white p-8 rounded-[32px] border border-gray-150 shadow-sm scroll-mt-24 mb-12" id="siparis-sureci">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Tasarım, Üretim & Sipariş Verme Süreci
            </h2>
          </div>
                           <p className="text-xs sm:text-sm text-gray-650 font-semibold leading-relaxed mb-6">
            Kurumsal <strong>bloknot yaptırma</strong> ve <strong>bloknot siparişi</strong> için adet, ebat, kapak ve cilt bilgilerini netleştiriyoruz. Sipariş akışı şu şekildedir:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650 mb-6">
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-150 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">1</span>
                  <h3 className="font-black text-black uppercase text-[11px]">Sipariş Bilgileri</h3>
                </div>
                <p className="text-[11px]">WhatsApp hattımızdan adet, ebat, kapak ve cilt bilgilerini iletirsiniz.</p>
              </div>
            </div>

            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-150 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">2</span>
                  <h3 className="font-black text-black uppercase text-[11px]">Tasarım Bilgileri</h3>
                </div>
                <p className="text-[11px]">Logo ve tasarım bilgilerinizi paylaşırsınız; baskı hazırlığı sipariş detaylarına göre netleştirilir.</p>
              </div>
            </div>

            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-150 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">3</span>
                  <h3 className="font-black text-black uppercase text-[11px]">Bloknot Baskısı</h3>
                </div>
                <p className="text-[11px]">Baskı, sipariş bilgilerinde belirtilen kağıt ve baskı özelliklerine göre gerçekleştirilir.</p>
              </div>
            </div>

            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-150 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">4</span>
                  <h3 className="font-black text-black uppercase text-[11px]">Selefon ve Ciltleme</h3>
                </div>
                <p className="text-[11px]">Kapaklı veya kapaksız model seçimine göre selefon ve ciltleme işlemleri tamamlanır.</p>
              </div>
            </div>

            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-150 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">5</span>
                  <h3 className="font-black text-black uppercase text-[11px]">Paketleme ve Sevk</h3>
                </div>
                <p className="text-[11px]">Bloknotlar paketlenir; sevkiyat yöntemi ve takip bilgileri sipariş sürecinde paylaşılır.</p>
              </div>
            </div>
          </div>
                        <div className="mt-6">
            <h3 className="font-black text-slate-900 uppercase text-xs sm:text-sm mb-3">
              Ödeme Seçenekleri & Resmi Faturalandırma
            </h3>

            <div className="bg-slate-50 p-5 rounded-2xl border border-gray-150 text-xs sm:text-sm font-semibold leading-relaxed text-gray-700 space-y-3">
              <p>
                Sipariş detayları ve baskı hazırlığı netleştirildikten sonra ödeme ve faturalandırma bilgileri paylaşılır.
              </p>

              <ul className="list-disc pl-5 space-y-1.5 text-xs font-bold text-gray-650">
                <li>
                  Havale, EFT veya FAST ile ödeme yapılabilir.
                </li>
                <li>
                  Fiyatlara %20 KDV dahil değildir.
                </li>
                <li>
                  Üretim başlangıcı ve sipariş planlaması ödeme bilgileri netleştirildikten sonra yapılır.
                </li>
              </ul>
            </div>
          </div>

          {/* Fiyat Listesine Geçiş CTA */}
          <div className="pt-4 border-t border-gray-150 flex flex-col sm:flex-row justify-end items-center gap-3">
            <a 
              href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, promosyon bloknot sipariş süreci ve üretim zaman çizelgesi hakkında bilgi alıp sipariş vermek istiyorum.")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 px-4 py-2 rounded-full text-xs font-black uppercase transition-all shadow-sm"
            >
              Özel Ölçü / Teklif Al (WhatsApp)
            </a>
          </div>
        </section>
                {/* Baskı ve Sipariş Bilgileri */}
        <section
          className="bg-white p-8 rounded-[32px] border border-gray-150 shadow-sm scroll-mt-24 mb-12"
          id="baski-ve-siparis-bilgileri"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Baskı ve Sipariş Bilgileri
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-gray-650 font-semibold leading-relaxed mb-6">
            Bloknot siparişlerinde adet, ebat, kapak ve cilt bilgileri netleştirilir. Baskı ve sipariş hazırlığı, iletilen ürün bilgilerine göre planlanır.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-semibold text-gray-700">
            <div className="bg-slate-50 p-5 rounded-2xl border border-gray-150">
              <h3 className="font-black text-black uppercase text-xs mb-1.5">
                Baskı Bilgileri
              </h3>
              <p className="text-[11px] leading-relaxed">
                Kağıt ve baskı özellikleri sipariş detaylarına göre netleştirilir.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-gray-150">
              <h3 className="font-black text-black uppercase text-xs mb-1.5">
                Kapak ve Cilt
              </h3>
              <p className="text-[11px] leading-relaxed">
                Kapaklı veya kapaksız model ile cilt bilgileri sipariş sırasında belirlenir.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-gray-150">
              <h3 className="font-black text-black uppercase text-xs mb-1.5">
                Sipariş Detayları
              </h3>
              <p className="text-[11px] leading-relaxed">
                Adet, ebat, kapak ve cilt bilgilerini WhatsApp üzerinden iletebilirsiniz.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-gray-150">
              <h3 className="font-black text-black uppercase text-xs mb-1.5">
                Sevkiyat Bilgileri
              </h3>
              <p className="text-[11px] leading-relaxed">
                Sevkiyat yöntemi ve adres bilgileri sipariş sürecinde paylaşılır.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-white p-8 rounded-[32px] border border-gray-150 shadow-sm scroll-mt-24 mb-12" id="sevkiyat-bilgileri">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-6 bg-emerald-500 rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Sipariş ve Sevkiyat Bilgileri
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-gray-650 font-semibold leading-relaxed">
            Bloknot siparişlerinde adet, ebat, kapak ve cilt bilgileri netleştirildikten sonra sevkiyat yöntemi paylaşılır. Şehir dışı siparişler için adres ve teslimat bilgilerinizi WhatsApp üzerinden iletebilirsiniz.
          </p>

          <div className="mt-6 pt-4 border-t border-gray-150 flex flex-col sm:flex-row justify-end items-center gap-3">
            <a
              href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, bloknot siparişi için adres ve sevkiyat bilgisi almak istiyorum.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 px-4 py-2 rounded-full text-xs font-black uppercase transition-all shadow-sm"
            >
              Sevkiyat Bilgisi Al (WhatsApp)
            </a>
          </div>
        </section>
                {/* SSS (FAQ) ALANI */}
        <div className="mb-14 text-black scroll-mt-24">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Sıkça Sorulan Sorular
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {BLOKNOT_DETAILS.faqList.map((faq, idx) => (
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

        {/* Blog Rehberleri */}
        <div className="my-10">
          <RelatedBlogPosts category="bloknot" />
        </div>

      </div>

      <ProductSEOSection categoryKey="bloknot" />
    </div>
  );
};

export default BloknotlarPage;