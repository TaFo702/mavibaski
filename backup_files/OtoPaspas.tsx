import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { 
  ChevronDown, 
  ChevronRight, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  HeartHandshake, 
  Timer,
  Phone,
  Scale,
  Settings,
  HelpCircle,
  Clock,
  Layers,
  Sparkles,
  Scissors,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useCart, FireWarning } from '../App';
import { LOCAL_ASSETS } from '../constants/assets';

export const OTO_PASPAS_TABLE_DATA = [
  {
    ebat: "34x49 cm Esmer Kraft Kağıt",
    items: [
      { code: "P1", desc: "80 gr emici kraft kağıt\nSuyu Hızla Emen Doğal Kahverengi Yapı - Tek Renk Baskılı", miktar: "1.000 Adet", price: "2.500 ₺", image: LOCAL_ASSETS.otopaspas },
      { code: "P2", desc: "80 gr emici kraft kağıt\nSuyu Hızla Emen Doğal Kahverengi Yapı - Tek Renk Baskılı", miktar: "2.000 Adet", price: "3.300 ₺", image: LOCAL_ASSETS.otopaspas },
      { code: "P3", desc: "80 gr emici kraft kağıt\nSuyu Hızla Emen Doğal Kahverengi Yapı - Tek Renk Baskılı", miktar: "5.000 Adet", price: "5.000 ₺", image: LOCAL_ASSETS.otopaspas },
    ]
  }
];

const OTO_PASPAS_GALLERY: Array<{ src: string; alt: string; title: string; desc: React.ReactNode }> = [
  {
    src: "/images/oto-paspas/oto-yikama-paspas-baski.webp",
    alt: "Oto Servis Paspası",
    title: "Oto Servis Paspası",
    desc: "Periyodik bakım, mekanik onarım ve servis kabul işlemlerinde araç içi zeminini kir, yağ ve ayak izlerinden korumak amacıyla kullanılan tek kullanımlık logo baskılı servis paspasıdır."
  },
  {
    src: "/images/oto-paspas/oto-paspas-baski-fiyatlari.webp",
    alt: "Oto Yıkama Paspası",
    title: "Oto Yıkama Paspası",
    desc: "Araç yıkama ve detaylı iç temizlik sonrasında zeminin temiz kalmasını sağlayan yüksek emiciliğe sahip kağıt oto paspasıdır. Araç teslimlerinde hijyenik ve profesyonel bir görünüm oluşturur."
  },
  {
    src: "/images/oto-paspas/oto-paspas-kagit-baski.webp",
    alt: "Araç Koruma Paspası",
    title: "Araç Koruma Paspası",
    desc: "Servis, ekspertiz ve showroom süreçlerinde araç içine taşınabilecek su, çamur ve kirin taban bölgesine ulaşmasını azaltmaya yardımcı olan tek kullanımlık araç zemin koruma kağıdıdır."
  },
  {
    src: "/images/oto-paspas/oto-paspas-tasarimi.webp",
    alt: "Logo Baskı Uygulaması",
    title: "Logo Baskı Uygulaması",
    desc: "Logo, firma bilgileri ve kurumsal renkler ofset baskı sistemiyle net ve okunaklı şekilde basılır. Tek renk veya CMYK baskı seçenekleri sayesinde baskılar son derece kurumsal bir görünüm sunar."
  },
  {
    src: "/images/oto-paspas/kagit-oto-paspas-ornegi.webp",
    alt: "Kraft ve Beyaz Kağıt Seçenekleri",
    title: "Kraft ve Beyaz Kağıt Seçenekleri",
    desc: "80 gr esmer kraft kağıt ekonomik olup sıvıyı hızla emen yapıya sahipken, 1. hamur beyaz kağıt CMYK baskılarda logo ve kurumsal renklerin daha canlı görünmesini sağlar. İşletmenin baskı ihtiyacına göre ekonomik kraft kağıt veya çok renkli tasarımlar için 1. hamur beyaz kağıt tercih edilebilir."
  }
];

const OTO_PASPAS_FAQ = [
  {
    q: "Tek kullanımlık kağıt paspas baskılarında minimum sipariş miktarı neden 1.000 adettir?",
    a: "Ofset baskıda kalıp ve makine hazırlık maliyetleri nedeniyle 1.000 adet, birim fiyat açısından en ekonomik başlangıç miktarıdır."
  },
  {
    q: "Hangi baskı sistemini kullanıyorsunuz?",
    a: "Üretimlerimizde kaliteli ofset baskı teknolojisi kullanıyoruz. Bu sayede logolarınız ve iletişim bilgileriniz kağıt üzerinde son derece net ve kaliteli görünür."
  },
  {
    q: "Servis paspası olarak neden kraft kağıt tercih edilmektedir?",
    a: "Kraft kağıt, yüksek sıvı emiciliği ve dayanıklı yapısıyla temizlik ve koruma amacıyla en ekonomik ve kullanışlı çözümdür."
  },
  {
    q: "Kraft mı yoksa beyaz kağıt mı tercih etmeliyim?",
    a: "Doğal ve rustik bir görünüm istiyorsanız emici esmer kraft kağıt; çok renkli, canlı ve parlak logolar tercih ediyorsanız 1. Hamur Beyaz Kağıt modellerini seçebilirsiniz."
  },
  {
    q: "Tek kullanımlık paspas modellerinde neden plastik malzeme kullanılmaz?",
    a: "Plastik paspaslar sıvı emici değildir ve ıslak ayakkabı tabanının kaymasına neden olarak sürüş güvenliğini tehlikeye atar. Bu yüzden kağıt paspas modelleri tercih edilmektedir."
  },
  {
    q: "Ürettiğiniz kağıt paspaslar çevre dostu mu?",
    a: "Evet, kullandığımız kağıtlar doğada hızla çözünen ve %100 geri dönüştürülebilir çevre dostu malzemelerdir."
  },
  {
    q: "Paspas üzerine özel logo basılabilir mi?",
    a: "Evet, marka renklerinize uygun çok renkli veya tek renk ofset baskı seçenekleriyle logonuzu uygulayabiliyoruz."
  },
  {
    q: "Oto yıkama paspası ıslaklığa ne kadar dayanıklıdır?",
    a: "Yapımında kullanılan 80 gr kraft ve beyaz kağıtlar, suyu hızla emerek dağılmadan dayanıklı bir kullanım sunar."
  },
  {
    q: "Kağıt paspas ölçüleri değiştirilebilir mi?",
    a: "Evet. Standart 34x49 cm ölçüsünün yanı sıra, talebinize göre özel ebatlarda da üretim yapabilmekteyiz."
  },
  {
    q: "Tasarım desteği ve PDF prova ücretli midir?",
    a: "Hayır. Firmanıza özel tasarım desteği sağlıyoruz ve onayınız için hazırladığımız PDF prova tamamen ücretsizdir."
  },
  {
    q: "Siparişler ne kadar sürede teslim edilir ve elden alabilir miyiz?",
    a: "Tasarım onayının ardından 3-4 iş günü içerisinde üretim tamamlanır. Türkiye'nin 81 iline güvenli kargo ile sevk ediyoruz. Dilerseniz İstanbul Topkapı matbaamızdan elden de teslim alabilirsiniz."
  }
];

const SECTORS = [
  "Oto Yıkama",
  "Yetkili Servis",
  "Oto Servis",
  "Kaporta Servisleri",
  "Boya Koruma Merkezleri",
  "Oto Kuaför",
  "Araç Ekspertiz Firmaları",
  "Rent A Car",
  "Oto Galeri",
  "Vale",
  "Detailing",
  "Lastik Bayileri",
  "Filo Firmaları",
  "Oto Elektrik Servisleri",
  "Ağır Vasıta Servisleri",
  "Traktör Bayileri",
  "Motosiklet Servisleri",
  "Oto Mekanik Servisleri"
];

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
        loading="lazy"
        referrerPolicy="no-referrer"
        className={`w-full h-full object-contain rounded-lg transition-all duration-300 ${imgClassName}`} 
      />
    </div>
  );
};

export const OtoPaspasPage = () => {
  const { openProductDetail } = useCart();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const openWhatsApp = (item: any, ebat: string) => {
    openProductDetail({ ...item, ebat }, "Oto Paspas");
  };

  // Flatten products for row-spanning logic in the table
  const flatItems: any[] = [];
  OTO_PASPAS_TABLE_DATA.forEach((group) => {
    group.items.forEach((item, index) => {
      flatItems.push({
        ...item,
        ebat: group.ebat,
        groupIndex: index,
        groupSize: group.items.length
      });
    });
  });

  // --- JSON-LD Structured Data / Schema.org ---
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": OTO_PASPAS_FAQ.map(faq => ({
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
        <title>Logolu Oto Paspas Baskı Fiyatları | Servis Paspası Üreticisi | Mavi Basım</title>
        <meta name="description" content="Logolu oto paspas baskı, servis paspası üretimi ve araç zemin koruma kağıdı imalatı. 34x49 cm, 80 gr kraft veya beyaz kağıt, Heidelberg ofset baskı, ücretsiz PDF prova, hızlı üretim ve Türkiye geneli güvenli kargo." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Breadcrumb Alanı */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="text-xs font-bold text-gray-500 uppercase tracking-tight flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          <ChevronDown size={12} className="-rotate-90 text-gray-400 shrink-0" />
          <Link to="/" className="hover:text-primary transition-colors">Matbaa Ürünleri</Link>
          <ChevronDown size={12} className="-rotate-90 text-gray-400 shrink-0" />
          <span className="text-gray-800 font-extrabold truncate">Oto Paspas</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-black animate-in fade-in duration-500">
        
        {/* H1 BAŞLIK */}
        <div className="text-center mb-6">
          <h1 className="text-[19px] md:text-[26px] lg:text-[31px] font-black text-primary uppercase tracking-tight mb-3 leading-tight">
            Logolu Oto Paspas Baskı Fiyatları
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* METİN ALANI */}
        <div className="max-w-[1200px] mx-auto text-slate-700 text-sm md:text-[15px] leading-relaxed font-semibold text-justify space-y-4 mb-10">
          <p>
            İstanbul oto paspas baskı ihtiyaçlarına yönelik sunduğumuz logolu oto paspas çözümleri; oto servisleri, yetkili servisler, oto yıkamalar, ekspertiz merkezleri, araç kiralama firmaları ve oto galerileri tarafından araç içi zemini korumak amacıyla kullanılan tek kullanımlık kağıt koruma paspasıdır. Araç zemin koruma kağıdı, kağıt servis paspası ve araç servis paspası olarak da adlandırılan bu pratik araç teslim paspası, araç teslimlerinde hijyenik, temiz ve profesyonel bir görünüm sunar. Aynı zamanda firmanızın logosunu ve iletişim bilgilerini müşterilerinize doğrudan ulaştırarak son derece etkili bir reklam aracı haline gelir.
          </p>
          <p>
            Türkiye geneli oto paspas üretimi gerçekleştiren tesisimizde, 80 gr esmer kraft kağıt ve 1. hamur beyaz kağıt seçenekleri kullanılmaktadır. Standart 34x49 cm ölçüsündeki oto servis yer paspası, servis zemin koruma kağıdı ve araç taban koruma kağıdı modellerimiz sıvıyı hızla emen yapıya sahiptir. Tek renk veya CMYK ofset baskı seçenekleriyle hazırlanan tek kullanımlık servis paspası, servis koruma paspası ve oto bakım paspası çeşitleri araç içi zeminin korunmasına yardımcı olan son derece ekonomik ve kurumsal bir çözümdür. İstanbul'da oto paspas üreticisi arayan işletmeler için doğrudan imalattan en uygun maliyetli çözümleri sunuyoruz. Aşağıdaki fiyat listesinden sipariş adedine göre güncel İstanbul oto servis paspası fiyatları, logolu oto paspas üretimi detayları ve baskı seçeneklerini inceleyebilirsiniz.
          </p>
        </div>

        {/* ÜRETİM BİLGİLERİ KUTUSU */}
        <div className="max-w-[1200px] mx-auto mb-10 bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-2.5 mb-3">
            <CheckCircle className="text-primary w-5 h-5 shrink-0" />
            <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight">Oto Paspas Üretim Bilgileri</h3>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-6 leading-relaxed">
            Mavi Basım olarak İstanbul Topkapı'daki üretim tesisimizde logolu oto paspas üretimi gerçekleştiriyoruz. Tesisimizde standart ölçülerde araç koruma paspası, oto servis yer paspası ve araç servis paspası imalatı yapılmaktadır. Teknik özellikleri ve üretim detaylarını aşağıdan inceleyebilirsiniz:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
            <div className="bg-white p-4 rounded-xl border border-gray-150 flex flex-col justify-between shadow-sm">
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Minimum Sipariş</span>
              <span className="text-sm font-black text-slate-900 mt-1">1.000 Adet</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-150 flex flex-col justify-between shadow-sm">
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Standart Ölçü</span>
              <span className="text-sm font-black text-slate-900 mt-1">34×49 cm</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-150 flex flex-col justify-between shadow-sm">
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Üretim Süresi</span>
              <span className="text-sm font-black text-slate-900 mt-1">2–4 İş Günü</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-150 flex flex-col justify-between shadow-sm">
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Tasarım Onayı</span>
              <span className="text-sm font-black text-slate-900 mt-1">Ücretsiz PDF Prova</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-150 flex flex-col justify-between shadow-sm">
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Baskı Türü</span>
              <span className="text-sm font-black text-slate-900 mt-1">Heidelberg Ofset Baskı</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-150 flex flex-col justify-between shadow-sm">
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Üretim Tesisi</span>
              <span className="text-sm font-black text-slate-900 mt-1">İstanbul Topkapı</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-150 flex flex-col justify-between shadow-sm col-span-1 sm:col-span-2">
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Gönderim Alanı</span>
              <span className="text-sm font-black text-slate-900 mt-1">Türkiye'nin 81 İline Güvenli Sevk</span>
            </div>
          </div>
        </div>

        {/* FİYAT LİSTESİ TABLOSU */}
        <div className="scroll-mt-24 group mb-12">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2 flex-wrap">
                Oto Paspas Fiyat Listesi
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-150 text-[11px] font-bold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>34x49 cm - 80 gr. Emici Kağıt - Tek Renk Baskı</span>
            </div>
          </div>

          <p className="text-gray-650 text-xs sm:text-sm font-semibold mb-6 px-2 leading-relaxed">
            Aşağıdaki tabloda 34x49 cm ölçüsünde üretilen tek kullanımlık oto paspas modellerinin güncel baskı fiyatlarını inceleyebilirsiniz.
          </p>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-300 overflow-visible relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans border-2 border-slate-300">
                <thead>
                  <tr className="bg-black text-white border-b-2 border-slate-300 text-center font-black uppercase tracking-tight">
                    <th className="p-4 w-10"></th>
                    <th className="p-4 w-24 border-r-2 border-slate-700/30">KOD</th>
                    <th className="p-4 text-center border-r-2 border-slate-700/30">ADET</th>
                    <th className="p-4 text-center border-r-2 border-slate-700/30">EBAT / TÜR</th>
                    <th className="p-4 text-left border-r-2 border-slate-700/30">AÇIKLAMA</th>
                    <th className="p-4 w-32 border-r-2 border-slate-700/30">FİYAT</th>
                    <th className="p-4 w-44 text-center">SİPARİŞ</th>
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
                            <span className="tracking-[0.1em] uppercase text-[10px] md:text-[12px] whitespace-nowrap">OTO PASPAS BASKI</span>
                          </td>
                        )}
                        <td className="p-3 text-center font-bold text-primary border-r-2 border-slate-200 group-hover:text-secondary transition-colors">{item.code}</td>
                        <td className="p-3 text-center text-black font-medium border-r-2 border-slate-200">{item.miktar}</td>
                        {isGroupFirstRow && (
                          <td 
                            rowSpan={item.groupSize} 
                            className="p-3 text-center text-black font-black border-r-2 border-slate-200 align-middle text-sm md:text-base whitespace-nowrap bg-gray-50/10"
                          >
                            {item.ebat}
                          </td>
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
            <div className="bg-slate-50 px-5 py-3 border-t-2 border-slate-300 rounded-b-2xl flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-medium font-sans">
              <span>* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</span>
            </div>
          </div>
          <div className="mt-4">
            <FireWarning />
          </div>
        </div>

        {/* ÜRÜN FOTOĞRAFLARI GALERİSİ */}
        <div className="mb-12 scroll-mt-24">
          <div className="flex flex-col mb-6 px-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2.5 h-7 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Logolu Oto Paspas Baskı Modelleri
              </h2>
            </div>
            <p className="text-gray-650 text-xs sm:text-sm font-semibold leading-relaxed">
              Aşağıda oto servisleri, oto yıkamalar, ekspertiz merkezleri, araç kiralama firmaları ve oto galerileri için hazırlanan farklı kullanım amaçlarına uygun oto paspas modellerini inceleyebilirsiniz. Ürünler kraft veya beyaz kağıt seçenekleriyle firmanıza özel olarak üretilmektedir.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {OTO_PASPAS_GALLERY.map((img, idx) => (
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

        {/* Nasıl Sipariş Verilir? */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Oto Paspas Baskı Siparişi Nasıl Verilir?
            </h2>
          </div>
          <div className="bg-sky-50/50 border border-sky-100 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
            <span className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xl shrink-0 font-bold">💬</span>
            <div className="text-center sm:text-left">
              <h3 className="text-sm font-black text-slate-900 uppercase mb-1">Kolay Sipariş ve Ücretsiz Tasarım Provası</h3>
              <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                Sipariş adedi belirlendikten sonra fiyat onayı alınır. Logo ve bilgileriniz tasarıma yerleştirilerek ücretsiz PDF prova hazırlanır. Onayınızın ardından üretime geçilir ve ürünler adresinize gönderilir.
              </p>
            </div>
          </div>
        </div>

        {/* OTO PASPAS BASKISINDA HANGİ BASKI TÜRÜ KULLANILIR & DOSYA HAZIRLIĞI */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-base md:text-lg font-black text-black uppercase tracking-tight mb-4">
                    Hangi Baskı Türü Kullanılır?
                  </h2>
                  <div className="space-y-3 text-xs text-gray-650 font-semibold leading-relaxed text-justify">
                    <p className="mb-3">
                      Oto paspas baskılarında yüksek adetli üretimler için profesyonel ofset baskı teknolojisi kullanılmaktadır. 80 gr emici kraft veya 1. hamur beyaz kağıt üzerine uygulanan bu baskı yöntemi; logo, yazı ve kurumsal renklerin son derece net ve yüksek çözünürlüklü basılmasını sağlarken ekonomik seri üretim avantajı da sunar.
                    </p>
                    <ul className="space-y-2 list-disc list-inside font-bold">
                      <li>Ofset baskı makinelerinde net ve profesyonel logo ve görseller basılır</li>
                      <li>80 gr emici kraft ve 1. hamur beyaz kağıt kullanılır</li>
                      <li>Standart ölçü 34x49 cm’dir</li>
                      <li>Üretim süresi ortalama 2–4 iş günüdür</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h2 className="text-base md:text-lg font-black text-black uppercase tracking-tight mb-4">
                    Üretim Süresi
                  </h2>
                  <p className="text-xs text-gray-650 font-semibold leading-relaxed text-justify">
                    Standart üretim süresi, PDF prova onayının ardından ortalama 2–4 iş günüdür. Üretim tamamlandıktan sonra siparişler güvenli şekilde paketlenerek anlaşmalı kargo firmasıyla Türkiye'nin 81 iline gönderilmektedir.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-base md:text-lg font-black text-black uppercase tracking-tight mb-4">
                  Oto Paspas Baskısı İçin Dosya Nasıl Hazırlanmalıdır?
                </h2>
                <div className="space-y-3 text-xs text-gray-650 font-semibold leading-relaxed text-justify">
                  <p>
                    Baskı için PDF, AI, CDR veya EPS gibi vektörel dosyalar önerilir. Vektörel dosyanız bulunmuyorsa yüksek çözünürlüklü JPG veya PNG dosyaları da kabul edilmektedir. Uygun olmayan dosyalar grafik ekibimiz tarafından ücretsiz kontrol edilerek baskıya hazırlanır.
                  </p>
                  <p>
                    Logo dosyanız bulunmuyorsa yalnızca firma adınızı ve iletişim bilgilerinizi göndermeniz yeterlidir. Grafik ekibimiz baskıya uygun tasarımı hazırlayarak onayınıza sunar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NEDEN MAVİ BASIM? */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Neden Mavi Basım?
            </h2>
          </div>
          <p className="text-gray-650 text-xs sm:text-sm font-semibold mb-6 px-2 leading-relaxed">
            Mavi Basım, İstanbul Topkapı'daki kendi üretim tesisinde minimum 1.000 adet siparişten başlayarak oto paspas üretimi gerçekleştirmektedir. Ofset baskı makineleriyle hazırlanan ürünler, ücretsiz grafik kontrolü ve PDF prova onayının ardından ortalama 2–4 iş günü içerisinde üretilir ve Türkiye'nin 81 iline güvenli kargo ile gönderilir. Sipariş öncesinde ücretsiz grafik kontrolü ve PDF prova hizmetimizden yararlanarak üretim sürecini güvenle başlatabilirsiniz.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Direkt Üretici", desc: "Siparişleriniz aracısız olarak İstanbul Topkapı'daki kendi üretim tesisimizde hazırlanır. Üretimin tüm aşamaları tek merkezden yönetildiği için daha uygun fiyat, hızlı üretim ve baskı sürecinde tam kalite kontrol sağlanır." },
                { title: "Heidelberg Ofset Baskı Parkuru", desc: "Logolu oto paspas baskılarında yüksek kaliteli ofset baskı makineleri kullanılmaktadır. Logo, yazı ve kurumsal renkler yüksek baskı kalitesiyle net ve okunaklı şekilde basılır." },
                { title: "Ücretsiz Grafik Kontrolü ve PDF Prova", desc: "Baskı öncesinde gönderdiğiniz logo ve dosyalar grafik ekibimiz tarafından ücretsiz kontrol edilir. Hazırlanan PDF prova onayınız alınmadan üretime başlanmaz." },
                { 
                  title: "Otomotiv Sektörüne Özel Üretim", 
                  desc: (
                    <span>
                      Oto servisleri, oto yıkamalar, ekspertiz merkezleri ve araç kiralama firmaları için kurumsal baskı ürünleri üretiyoruz. <Link to="/oto-paspas" className="text-primary hover:underline font-bold">Oto paspas</Link>, <Link to="/yag-karti" className="text-primary hover:underline font-bold">yağ kartı</Link> ve <Link to="/yag-karti" className="text-primary hover:underline font-bold">servis bakım kartları</Link> aynı üretim sürecinde hazırlanarak siparişler tek sevkiyatta gönderilir.
                    </span>
                  ) 
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between gap-3 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="text-primary w-6 h-6 shrink-0" />
                    <h3 className="font-black text-black uppercase text-[13px] leading-tight mt-1">{item.title}</h3>
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
              Oto Paspas Fiyatlarını Etkileyen Faktörler
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Sipariş Adedi", desc: "Sipariş adedi arttıkça makine kurulumu gibi sabit maliyetler bölündüğü için birim fiyat önemli ölçüde düşer." },
                { title: "Kağıt Cinsi", desc: "Kraft kağıt ekonomik ve yüksek emicidir. Beyaz kağıt ise baskı renklerinin daha canlı görünmesini sağlar." },
                { title: "Baskı Rengi", desc: "Tek renk baskılar en ekonomik üretim seçeneğidir. Çok renkli (CMYK) baskılar ise logo ve kurumsal renklerin daha canlı ve detaylı görünmesini sağlar. Baskıda kullanılan renk sayısı arttıkça kalıp ve üretim maliyeti de buna bağlı olarak değişebilir." },
                { title: "Ebat Seçeneği", desc: "Standart 34x49 cm ölçüsü en ekonomik üretim ölçüsüdür. Özel ebatlarda kağıt firesi arttığından maliyet değişebilir." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm">
                  <h3 className="font-extrabold text-primary uppercase text-xs mb-1">{item.title}</h3>
                  <p className="text-[11px] text-gray-550 font-semibold leading-relaxed text-justify">{item.desc}</p>
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
              Oto Paspas Baskısı Nasıl Yapılır?
            </h2>
          </div>
          <p className="text-gray-650 text-xs sm:text-sm font-semibold mb-6 px-2 leading-relaxed">
            Gönderdiğiniz logo ve baskı dosyaları grafik ekibimiz tarafından ücretsiz kontrol edilir. Hazırlanan PDF prova onaylandıktan sonra üretim süreci başlar. Tasarım ofset baskı makinelerinde basılır, standart ölçülerde kesilir, kalite kontrolünden geçirilir ve paketlenerek kargoya teslim edilir.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "1", title: "PDF Prova", desc: "Logo yerleştirilir ve onay alınır." },
                { step: "2", title: "Ofset Baskı", desc: "Onaylanan tasarım yüksek çözünürlükte basılır." },
                { step: "3", title: "Kesim", desc: "Standart ölçülerde kesilir." },
                { step: "4", title: "Paketleme ve Kargo", desc: "Kalite kontrolü sonrası gönderilir." }
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

        {/* Oto Paspas Hangi Kağıttan Üretilir? */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Oto Paspas Hangi Kağıttan Üretilir?
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8">
            <p className="text-xs text-gray-650 mb-6 font-semibold">
              İhtiyacınıza en uygun kağıt seçeneğini belirleyin:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-semibold leading-relaxed">
              <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-primary uppercase text-sm mb-3">80 gr. Esmer Kraft Kağıt</h4>
                  <p className="text-slate-650 mb-4 leading-relaxed">
                    Yüksek emicilik sağlayan ekonomik kağıt seçeneğidir. Araç tabanına taşınan su, çamur ve kirin emilmesine yardımcı olur. Oto servisleri, oto yıkamalar ve ekspertiz merkezleri tarafından yaygın olarak tercih edilen kağıt türlerinden biridir.
                  </p>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-primary w-4 h-4 shrink-0" />
                      <span>Ekonomik fiyat avantajı</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-primary w-4 h-4 shrink-0" />
                      <span>Yüksek sıvı emicilik kapasitesi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-primary w-4 h-4 shrink-0" />
                      <span>Doğal kağıt dokusuyla ayak altında kaymaz</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-secondary uppercase text-sm mb-3">1. Hamur Beyaz Kağıt</h4>
                  <p className="text-slate-650 mb-4 leading-relaxed">
                    Beyaz zemini sayesinde CMYK baskılarda logo, yazılar ve kurumsal renkler daha canlı, net ve yüksek kontrastla görünür. Çok renkli tasarımlar ve marka görünürlüğünün ön planda olduğu çalışmalar için tercih edilir.
                  </p>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-secondary w-4 h-4 shrink-0" />
                      <span>Net ve canlı baskı kalitesi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-secondary w-4 h-4 shrink-0" />
                      <span>Yüksek kontrast sunan beyaz zemin</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-secondary w-4 h-4 shrink-0" />
                      <span>Temiz ve profesyonel görünüm</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Oto Paspas Teknik Özellikleri */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Oto Paspas Teknik Özellikleri
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8">
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200 text-slate-800 font-extrabold uppercase tracking-wider">
                    <th className="p-4">Özellik</th>
                    <th className="p-4">Detay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150 font-semibold text-slate-700">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-extrabold text-slate-900 uppercase">Kağıt Gramajı</td>
                    <td className="p-4">80 gr</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-extrabold text-slate-900 uppercase">Standart Ölçü</td>
                    <td className="p-4">34x49 cm</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-extrabold text-slate-900 uppercase">Baskı Türü</td>
                    <td className="p-4">Ofset Baskı</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-extrabold text-slate-900 uppercase">Kağıt Cinsi</td>
                    <td className="p-4">Kraft / 1. Hamur</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-extrabold text-slate-900 uppercase">Kullanım Tipi</td>
                    <td className="p-4">Tek Kullanımlık</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-extrabold text-slate-900 uppercase">Baskı Renk Sayısı</td>
                    <td className="p-4">Tek Renk / CMYK</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-extrabold text-slate-900 uppercase">Baskı Yönü</td>
                    <td className="p-4">Tek Yüz</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-extrabold text-slate-900 uppercase">Baskı Kalitesi</td>
                    <td className="p-4">Yüksek Çözünürlüklü Ofset Baskı</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-extrabold text-slate-900 uppercase">Kullanım Amacı</td>
                    <td className="p-4">Araç İçi Zemin Koruma</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-extrabold text-slate-900 uppercase">Minimum Sipariş</td>
                    <td className="p-4">1.000 Adet</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-extrabold text-slate-900 uppercase">Kullanım Alanı</td>
                    <td className="p-4">Oto Servisleri, Oto Yıkamalar, Ekspertiz, Araç Kiralama ve Galeriler</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* NEDEN TEK KULLANIMLIK OTO PASPAS KULLANILMALIDIR? */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-secondary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Neden Tek Kullanımlık Oto Paspası Kullanılmalıdır?
            </h2>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm font-semibold text-slate-700">
              {[
                { title: "Araç İçinin Kirlenmesini Azaltır", desc: "Servis kabulünden teslim anına kadar dışarıdan kabine taşınabilecek toz, çamur, yağ ve kirlerin araç zeminine temas etmesini doğrudan engeller." },
                { title: "Müşteriye Profesyonel Teslim Sağlar", desc: "Bakım veya yıkama sonrası serilen temiz bir paspas, müşteriye aracına değer verildiğini hissettirir ve hizmet kalitesini artırır." },
                { title: "Temizlik Maliyetlerini Düşürür", desc: "Araç içindeki taban halılarının kalıcı olarak lekelenmesini ve kirlenmesini önleyerek yıkama ve detaylı temizlik masraflarından tasarruf etmenizi sağlar." },
                { title: "Marka Görünürlüğünü Artırır", desc: "Direksiyon başına her geçildiğinde firmanızın logosunu ve iletişim bilgilerini sürücünün göz hizasında tutarak sürekli bir marka hatırlatıcısı görevi görür." },
                { title: "Kurumsal İmaj Oluşturur", desc: "Firmanızın kurumsal renkleriyle basılan özel tasarım paspaslar, işletmenizin profesyonelliğini ve kurumsal standartlarını yansıtır." },
                { title: "Maksimum Hijyen Sağlar", desc: "Tek kullanımlık yapısı sayesinde her araç sahibine tamamen kişiselleştirilmiş, hijyenik ve steril bir teslimat deneyimi sunulmuş olur." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between hover:border-secondary/20 hover:shadow-md transition-all">
                  <div>
                    <h3 className="font-extrabold text-slate-900 uppercase text-xs sm:text-sm mb-2 text-secondary">{item.title}</h3>
                    <p className="text-xs text-gray-650 leading-relaxed text-justify">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KULLANIM ALANLARI VE SEKTÖRLER */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Oto Servis Paspası Nerelerde Kullanılır?
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 text-xs sm:text-sm font-semibold leading-relaxed">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(
                [
                  { title: "Yetkili Servisler", desc: "Mekanik onarım, periyodik bakım ve arıza tespiti gibi uzun süreli işlemler boyunca teknisyenlerin kabin içine girip çıkarken zemine yağ, gres ve kir bulaşmasını azaltmaya yardımcı olur." },
                  { title: "Oto Yıkamalar", desc: "Detaylı iç-dış temizlik ve oto kuaför uygulamaları sonrasında temizlenen araç tabanının kirlenmesini azaltmaya yardımcı olur. Araç teslimi öncesinde daha temiz, düzenli ve profesyonel bir sunum yapılmasına katkı sağlar." },
                  { title: "Ekspertiz Merkezleri ve Bayileri", desc: "Alım-satım öncesi yapılan testlerde, detaylı kontrollerde ve ekspertiz bayilerinde araç içine binen personelin dışarıdaki toz ve kiri kabine taşımasını önler." },
                  { title: "Araç Kiralama ve Filo Firmaları", desc: "Teslim öncesinde serilen tek kullanımlık oto paspas, kiralama ve filo yönetim süreçlerinde araç içi zeminin temiz kalmasına yardımcı olur ve sonraki temizlik işlemlerini kolaylaştırır." },
                  { title: "Oto Galerileri", desc: "Showroom'da sergilenen sıfır veya ikinci el araçlarda yapılan test sürüşleri ve ziyaretçi incelemeleri sırasında araç içi zemininin temiz kalmasına yardımcı olur." },
                  { title: "Ağır Vasıta ve İş Makinesi Servisleri", desc: "Tır, kamyon, otobüs ve iş makinesi gibi ticari araçların bakım süreçlerinde, kabin zeminine taşınabilecek yağ, çamur ve kirin taban döşemesine bulaşmasını azaltmaya yardımcı olur." },
                  { title: "Lastik Servisleri", desc: "Lastik değişimi ve rot-balans ayarları esnasında aracı atölyeye alan ustaların ayakkabılarındaki balata tozunu ve çamuru temiz taban halısına bulaştırmasını engeller." },
                  { title: "Kaporta ve Boya Servisleri", desc: "Macun, astar, zımpara tozları ve fırın boya işlemleri sırasında kabin içine toz zerrelerinin nüfuz etmesini ve döşemelerin kirlenmesini önlemek için zemin koruması sağlar." },
                  { title: "Elektrikli Araç Servisleri", desc: "Yeni nesil elektrikli ve hibrit araçların yüksek teknolojili iç mekan ve taban kaplamalarını korumak, servis sürecinde kurumsal bir hijyen standardı sunmak için idealdir." }
                ] as Array<{ title: string; desc: React.ReactNode }>
              ).map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between hover:border-primary/20 hover:shadow-md transition-all">
                  <div>
                    <h3 className="font-extrabold text-slate-900 uppercase text-xs mb-2 leading-tight">{item.title}</h3>
                    <div className="text-[11px] text-gray-550 font-semibold leading-relaxed text-justify">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KİMLER TERCİH EDİYOR? */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Logolu Oto Paspasları Kimler Tercih Ediyor?
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-6 leading-relaxed">
              Logolu oto paspaslar aşağıdaki işletmeler ve araç bakım merkezleri tarafından yoğun olarak kullanılmaktadır:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                "Yetkili Servisler",
                "Özel Oto Servisleri",
                "Oto Yıkamalar",
                "Detaylı Temizlik Firmaları",
                "Ekspertiz Merkezleri",
                "Oto Galerileri",
                "Araç Kiralama Firmaları",
                "Filo Yönetim Şirketleri"
              ].map((title, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm flex items-center justify-center text-center hover:shadow-md transition-shadow min-h-[56px]">
                  <span className="text-xs font-bold text-slate-800 uppercase leading-tight">{title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BİRLİKTE TERCİH EDİLEN ÜRÜNLER (İÇ LİNKLER) */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-secondary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Birlikte Tercih Edilen Ürünler
            </h2>
          </div>
          <div className="space-y-3 mb-6 px-2 text-sm font-semibold text-gray-650 leading-relaxed text-justify">
            <p>
              Oto servisleri ve araç bakım merkezleri tarafından oto paspas ile birlikte en sık sipariş edilen diğer kurumsal matbaa ürünleri aşağıda yer almaktadır.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
            {[
              { name: "Yağ Kartı Baskı", path: "/yag-karti", desc: "Özel Tasarım Yağ Değişim Kartları" },
              { name: "Servis Bakım Kartı", path: "/yag-karti", desc: "Araç Takip ve Bakım Kartları" },
              { name: "Araç Teslim Formu", path: "/makbuz-ve-formlar", desc: "Otokopili Araç Teslim Formu" },
              { name: "Araç Kabul Formu", path: "/makbuz-ve-formlar", desc: "Otokopili Servis Giriş Formu" },
              { name: "Kartvizit Baskı", path: "/kartvizit", desc: "Şık ve Kaliteli Kartvizitler" },
              { name: "Magnet Baskı", path: "/magnet", desc: "Buzdolabı ve Araç Tipi Magnetler" },
              { name: "Etiket Baskı", path: "/etiket", desc: "Suya Dayanıklı Yapışkanlı Etiketler" },
              { name: "Sipariş Fişi", path: "/makbuz-ve-formlar", desc: "Bloknot ve Sipariş Fişi Basımı" }
            ].map((prod, idx) => (
              <Link 
                key={idx} 
                to={prod.path}
                className="bg-white hover:bg-primary/5 p-4 rounded-2xl border-2 border-gray-150 hover:border-primary/40 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors uppercase leading-tight">{prod.name}</h3>
                  <p className="text-[10px] text-gray-500 font-semibold mt-1">{prod.desc}</p>
                </div>
                <div className="text-[10px] text-primary font-black uppercase tracking-wider flex items-center gap-1 mt-4">
                  <span>İncele</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SIKÇA SORULAN SORULAR */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Sıkça Sorulan Sorular
              </h2>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sol Sütun (6 Soru) */}
            <div className="space-y-3.5">
              {OTO_PASPAS_FAQ.slice(0, 6).map((faq, fIdx) => {
                const globalIdx = fIdx;
                const isOpen = activeFaq === globalIdx;
                return (
                  <div key={globalIdx} className="border border-gray-150 rounded-2xl overflow-hidden bg-gray-50/50 hover:bg-white transition-all text-black">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === globalIdx ? null : globalIdx)}
                      className="w-full text-left p-5 flex justify-between items-center font-bold text-slate-900 focus:outline-none transition-all"
                    >
                      <h3 className="md:text-base text-sm leading-relaxed pr-4 text-black font-bold">{faq.q}</h3>
                      <ChevronDown 
                        size={20} 
                        className={`text-primary transform transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} 
                      />
                    </button>
                    <motion.div 
                      initial={false}
                      animate={{ 
                        height: isOpen ? "auto" : 0, 
                        opacity: isOpen ? 1 : 0 
                      }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-slate-650 border-t border-gray-100/60 md:text-sm text-xs leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Sağ Sütun (5 Soru) */}
            <div className="space-y-3.5">
              {OTO_PASPAS_FAQ.slice(6, 11).map((faq, fIdx) => {
                const globalIdx = 6 + fIdx;
                const isOpen = activeFaq === globalIdx;
                return (
                  <div key={globalIdx} className="border border-gray-150 rounded-2xl overflow-hidden bg-gray-50/50 hover:bg-white transition-all text-black">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === globalIdx ? null : globalIdx)}
                      className="w-full text-left p-5 flex justify-between items-center font-bold text-slate-900 focus:outline-none transition-all"
                    >
                      <h3 className="md:text-base text-sm leading-relaxed pr-4 text-black font-bold">{faq.q}</h3>
                      <ChevronDown 
                        size={20} 
                        className={`text-primary transform transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} 
                      />
                    </button>
                    <motion.div 
                      initial={false}
                      animate={{ 
                        height: isOpen ? "auto" : 0, 
                        opacity: isOpen ? 1 : 0 
                      }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-slate-650 border-t border-gray-100/60 md:text-sm text-xs leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
