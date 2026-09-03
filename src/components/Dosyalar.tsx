import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  Phone
} from 'lucide-react';
import { 
  useCart, 
  DOSYALAR_DATA, 
  FeatureTooltip, 
  FireWarning
} from '../App';
import { CategoryHero } from './CategoryHero';
import RelatedBlogPosts from './RelatedBlogPosts';

// --- Local Data ---
const DOSYALAR_DETAILS = {
  breadcrumbTitle: "Cepli Dosya",
  h1Title: "Cepli Dosya Baskı Fiyatları",
  faqList: [
    {
      q: "Cepli dosya baskısı hangi kağıtlarla üretilir?",
      a: "Cepli dosya baskısında 350 gr ve 400 gr kuşe kağıt tercih edilmektedir."
    },
    {
      q: "Mat selefon mu, parlak selefon mu tercih etmeliyim?",
      a: "Mat selefon daha kurumsal ve sade bir görünüm sunarken, parlak selefon renklerin daha canlı görünmesini sağlar. Tercihinize göre seçim yapabilirsiniz."
    },
    {
      q: "Cepli dosyanın içine hangi belgeler konulabilir?",
      a: "Teklif dosyaları, sözleşmeler, antetli kağıtlar, kataloglar, broşürler, fiyat listeleri ve kurumsal evraklar yerleştirilebilir."
    },
    {
      q: "Cepli dosya üzerine kabartma lak uygulanabilir mi?",
      a: "Evet. Logo veya belirli tasarım alanlarına lokal kabartma lak uygulanan modeller mevcuttur."
    },
    {
      q: "Kurumsal renklere uygun baskı yapılabilir mi?",
      a: "Evet. Tasarımınız CMYK renk formatında hazırlandığında kurumsal renklerinize uygun baskı elde edilir."
    },
    {
      q: "Cepli dosyalar tek taraflı mı çift taraflı mı basılabilir?",
      a: "Her iki seçenek de mevcuttur. İsteğe göre yalnızca dış yüzeye veya hem iç hem dış yüzeye renkli baskı yapılabilir."
    },
    {
      q: "Cepli dosya fuar ve toplantılar için uygun mudur?",
      a: "Evet. Fuarlar, bayi toplantıları, kurumsal sunumlar ve müşteri tekliflerinin sunulması için tercih edilmektedir."
    },
    {
      q: "Tasarım desteği alabilir miyim?",
      a: "Evet. Firmanızın logosu ve kurumsal bilgileri doğrultusunda baskıya uygun dosya tasarımı konusunda bilgi alabilirsiniz."
    },
    {
      q: "Baskı öncesinde tasarım kontrolü yapılıyor mu?",
      a: "Evet. Üretime geçilmeden önce tasarımınız kontrol edilerek onayınız doğrultusunda baskı süreci yürütülür."
    }
  ]
};

const DOSYALAR_GALLERY = [
  {
    src: "/images/dosya/cepli-dosya-baski-fiyatlari.webp",
    alt: "kurumsal-logo-baskili-mat-selefonlu-cepli-dosya",
    title: "Mat Selefonlu Cepli Dosya",
    desc: "Ön kapakta kurumsal logo ile şirketin sloganını taşıyan, mat selefon kaplamalı sunum dosyası. Kullanım Alanı: Kurumsal şirket sunumları ve resmi yazışmalar."
  },
  {
    src: "/images/dosya/cepli-dosya-tasarimi.webp",
    alt: "350-gr-kuse-kartvizit-yuvali-sunum-dosyasi",
    title: "350 gr Cepli Sunum Dosyası",
    desc: "350 gr kuşe kağıda basılan cepli sunum dosyası. Kullanım Alanı: Satış temsilcileri, müşteri ilişkileri birimleri ve teklif sunumları."
  },
  {
    src: "/images/dosya/cepli-dosya-baski-detayi.webp",
    alt: "kullanisli-tasarima-sahip-cepli-dosya",
    title: "Lokal Kabartma Laklı Sunum Dosyası",
    desc: "Kapak üzerindeki logo veya unvan gibi alanların parlak kabartma lak ile belirginleştirildiği özel dosya. Kullanım Alanı: Ürün tanıtımları ve üst düzey iş ortaklığı teklifleri."
  },
  {
    src: "/images/dosya/sunum-dosyasi-ornegi.webp",
    alt: "koruklu-cepli-dosya-tasarimi",
    title: "Körüklü Cepli Dosya",
    desc: "Çok sayıda evrak, katalog ve kalın belgeleri muhafaza etmek için tasarlanmış model. Kullanım Alanı: Proje dosyaları, sözleşmeler ve teknik şartnameler."
  },
  {
    src: "/images/dosya/sunum-ve-cepli-dosya.webp",
    alt: "cift-cepli-kurumsal-dosya",
    title: "Çift Cepli Dosya",
    desc: "Evrak tutucu cepler bulunduran geniş kapasiteli kurumsal dosya seçeneği. Kullanım Alanı: Kurum kayıt evrakları ve çoklu departman dökümanları."
  },
  {
    src: "/images/dosya/cepli-dosya-baski.webp",
    alt: "fuar-tipi-promosyon-cepli-dosya",
    title: "Fuar ve Tanıtım Dosyası",
    desc: "Fuar ziyaretçilerine broşür, fiyat listesi ve kurumsal belgelerinizi sunmanızı sağlayan tanıtım ürünü. Kullanım Alanı: Fuar organizasyonları ve tanıtım etkinlikleri."
  }
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
        decoding="async"
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/images/dosya/cepli-dosya-baski-fiyatlari.webp";
        }}
        className={`w-full h-full object-contain rounded-lg transition-all duration-300 ${imgClassName}`} 
      />
    </div>
  );
};

export const DosyalarPage = () => {
  const { openProductDetail } = useCart();

  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Dosyalar");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Cepli Dosya Baskı Fiyatları | Kuşe ve Selefon | Mavi Basım</title>
        <meta name="description" content="Kuşe cepli dosya baskı fiyatlarını; 500 ve 1.000 adet, tek veya çift yön baskı, mat/parlak selefon ve lak seçenekleriyle inceleyin." />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-xs text-gray-500 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400" aria-hidden="true">/</span>
                  <Link to="/matbaa" className="text-gray-600 hover:text-primary transition-colors">
                    Matbaa Ürünleri
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400" aria-hidden="true">/</span>
                  <span className="text-gray-900 font-semibold" aria-current="page">Cepli Dosya Baskı</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-black animate-in fade-in duration-500">
        <CategoryHero
          title="Cepli Dosya Baskı Fiyatları"
          badge="350 gr - 400 gr Kuşe - Mat / Parlak Selefonlu"
          description={
            <div className="space-y-2">
              <p>
                Mavi Basım olarak 350 gr ve 400 gr kuşe kağıda mat ve parlak selefon kaplamalı, lak seçenekli <strong className="text-slate-900">cepli dosya baskı</strong> seçenekleri sunuyoruz. Kurumsal teklif ve sunum setinizi tamamlamak için iç evraklarınız için <Link to="/antetli" className="text-primary hover:underline font-bold">antetli kağıt</Link>, <Link to="/kartvizit" className="text-primary hover:underline font-bold">kartvizit</Link>, <Link to="/zarf" className="text-primary hover:underline font-bold">diplomat zarf</Link> ve <Link to="/kataloglar" className="text-primary hover:underline font-bold">ürün kataloğu</Link> sipariş edebilirsiniz.
              </p>
            </div>
          }
          relatedLinks={[
            { label: "Antetli Kağıt", path: "/antetli" },
            { label: "Kartvizit Baskı", path: "/kartvizit" },
            { label: "Diplomat Zarf", path: "/zarf" },
            { label: "Katalog Baskı", path: "/kataloglar" }
          ]}
          customCtaText="Cepli Dosya Teklifi Al"
        />

        {/* FİYAT LİSTESİ TABLOSU */}
        <div className="scroll-mt-24 group my-6">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2 flex-wrap">
                {DOSYALAR_DETAILS.breadcrumbTitle} Fiyat Listesi
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 text-[11px] font-bold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>500 ve 1.000 Adet Seçenekleri</span>
            </div>
          </div>

          <p className="text-gray-650 text-xs sm:text-sm font-semibold mb-6 px-2 leading-relaxed">
            Aşağıdaki tabloda güncel cepli dosya baskı fiyatlarımızı inceleyebilirsiniz. Fiyatlara kulakçık yapıştırma dahildir. Siparişiniz, tasarım onayınızın ardından üretime alınmaktadır.
          </p>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-visible relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[11px] md:text-[13px]">
                <thead>
                  <tr className="bg-black text-white border-b border-black">
                    <th className="p-4 w-10"></th>
                    <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                    <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                    <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                    <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                    <th className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                  </tr>
                </thead>
                <tbody>
                  {DOSYALAR_DATA.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group">
                      {idx === 0 && (
                        <td 
                          rowSpan={DOSYALAR_DATA.length}
                          className="bg-primary text-white font-black text-center p-1 w-10 border-r border-white/10"
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          <span className="tracking-[0.1em] uppercase text-[10px]">DOSYALAR</span>
                        </td>
                      )}
                      <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors">{item.code}</td>
                      <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.miktar}</td>
                      <td className="p-3 text-center text-black font-medium border-r border-gray-100">
                        {item.desc}
                        {item.code !== 'PD' && <FeatureTooltip code={item.code} />}
                      </td>
                      <td className="p-3 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[14px] md:text-[16px] transition-colors">{item.price}</td>
                      <td className="p-3 text-center">
                        <button 
                          onClick={() => openWhatsApp(item)} 
                          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                        >
                          <ShoppingCart size={14} className="shrink-0" />
                          <span>Hemen Sipariş Ver</span>
                        </button>
                      </td>
                    </tr>
                  ))}
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

        {/* GEÇİŞ / ARA CTA BANNER */}
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl shrink-0">🤝</span>
            <p className="text-xs sm:text-sm text-emerald-950 font-extrabold leading-relaxed">
              Dosyanızı Birlikte Planlayalım! Sipariş ve tasarım detaylarınız için doğrudan iletişime geçebilirsiniz.
            </p>
          </div>
          <a 
            href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, kurumsal cepli dosya siparişi vermek ve detayları birlikte planlamak istiyorum.")}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black uppercase px-5 py-2.5 rounded-xl transition-all shadow-md text-center whitespace-nowrap shrink-0"
          >
            💬 WHATSAPP İLE BİLGİ ALIN
          </a>
        </div>

        {/* PAKETLEME VE TESLİMAT BÖLÜMÜ */}
        <div className="mt-6 mb-10 text-black">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              📦 Paketleme ve Teslimat Detayları
            </h2>
          </div>
          <div className="bg-slate-50 border border-gray-200 rounded-3xl p-6 md:p-8 space-y-6 text-xs sm:text-sm font-semibold leading-relaxed text-gray-700">
            <p>
              Kurumsal sunum dosyalarınızın sevkıyat sürecinde korunması amacıyla paketleme ve sevkiyat aşamalarına özen gösteriyoruz.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-medium">
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-2">
                <h4 className="font-black text-primary uppercase text-xs flex items-center gap-1.5">🛡️ Kolileme Standartları</h4>
                <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                  Basılan dosyalarınız, taşıma esnasında düzenli kalması için mukavemetli karton kolilerle paketlenir.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-2">
                <h4 className="font-black text-primary uppercase text-xs flex items-center gap-1.5">💧 Koruyucu Ambalaj</h4>
                <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                  Dış ortam etkilerine karşı koruma sağlamak amacıyla ürünler ambalajlanarak kolilere yerleştirilir.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-2">
                <h4 className="font-black text-primary uppercase text-xs flex items-center gap-1.5">🚚 Kargo Gönderimi</h4>
                <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                  Anlaşmalı kargo firmaları aracılığıyla Türkiye genelindeki adresinize sevk edilir.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 mt-6 bg-sky-50/50 border border-sky-100 rounded-[2rem] p-5 flex flex-col sm:flex-row items-center gap-4 shadow-sm text-black">
          <span className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-lg shrink-0 font-bold">💬</span>
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-black text-slate-900 uppercase mb-0.5">Sipariş Oluşturma Adımları</h4>
            <p className="text-xs text-slate-650 font-semibold leading-relaxed">
              Dilediğiniz seçeneğin yanındaki <strong>"Hemen Sipariş Ver"</strong> butonuna tıklayarak WhatsApp destek hattımız üzerinden sipariş oluşturabilir ve detayları iletebilirsiniz.
            </p>
          </div>
        </div>

        {/* MODEL SEÇİMİ VE TEKLİF ALMA DESTEĞİ CTA BLOK */}
        <div className="mb-10 p-6 sm:p-8 bg-gradient-to-r from-primary to-[#1d82b0] rounded-[2rem] shadow-lg text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
          <div className="space-y-2 text-center md:text-left relative z-10 max-w-2xl">
            <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight">Hangi Cepli Dosya Modelini Seçeceğinizden Emin Değil Misiniz?</h3>
            <p className="text-xs sm:text-sm text-white/90 font-semibold leading-relaxed">
              Tasarımınıza ve kullanım amacınıza uygun gramaj ve selefon kombinasyonu hakkında bilgi almak için ekibimizle iletişime geçebilirsiniz.
            </p>
          </div>
          <div className="relative z-10 shrink-0 w-full md:w-auto text-center">
            <a 
              href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, cepli dosya yaptırmak istiyorum ama hangi modeli seçeceğime karar veremedim. Yardımcı olur musunuz?")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-primary hover:bg-slate-50 font-black text-sm uppercase px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <ShoppingCart size={16} />
              Model Seç & Teklif Al
            </a>
          </div>
        </div>

        {/* H2: Cepli Dosya Kimler İçin Uygun? */}
        <div className="mb-10 text-black">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Cepli Dosya Kimler İçin Uygun?
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-150 rounded-3xl p-6 md:p-8 space-y-6 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650">
            <p>
              Kurumsal cepli dosyalar; iş ortaklarına veya müşterilerine evrak, teklif, proje veya sözleşmeler sunmak isteyen şirketler için yaygın olarak kullanılan bir tanıtım ürünüdür. Logolu cepli dosyalar şirketinizin kurumsal görünümünü destekler.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-2">
                  <h3 className="font-black text-black uppercase text-xs sm:text-sm">🏗️ İnşaat, Mimarlık & Mühendislik</h3>
                  <p className="text-xs text-gray-600 font-semibold">Proje planlarını, sözleşmeleri ve malzeme teklif formlarını düzenli sunmak isteyenler.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-2">
                  <h3 className="font-black text-black uppercase text-xs sm:text-sm">🩺 Sağlık, Klinikler & Eğitim</h3>
                  <p className="text-xs text-gray-600 font-semibold">Kayıt evraklarını, tahlil sonuçlarını ve bilgilendirme formlarını muhafaza eden kurumlar.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-2">
                  <h3 className="font-black text-black uppercase text-xs sm:text-sm">🎪 Fuar, Kurumsal Satış & İhracat</h3>
                  <p className="text-xs text-gray-600 font-semibold">Ziyaretçilere broşür, katalog ve fiyat listesini bir arada sunmak isteyen ekipler.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-2">
                  <h3 className="font-black text-black uppercase text-xs sm:text-sm">⚖️ Hukuk Büroları & Danışmanlık</h3>
                  <p className="text-xs text-gray-600 font-semibold">Dava dosyalarını, sözleşmeleri ve resmi evrakları düzenli teslim etmek isteyenler.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-2">
                  <h3 className="font-black text-black uppercase text-xs sm:text-sm">🚗 Otomotiv & Sanayi</h3>
                  <p className="text-xs text-gray-600 font-semibold">Araç teslim ve servis dökümanlarını, şartnameleri ve sertifikaları gruplayanlar.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-2">
                  <h3 className="font-black text-black uppercase text-xs sm:text-sm">🏛️ Kurumlar & Kuruluşlar</h3>
                  <p className="text-xs text-gray-600 font-semibold">Bültenleri, stratejik raporları ve resmi dökümanları takdim eden birimler.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ÜRÜN FOTOĞRAFLARI GALERİSİ */}
        <div className="mb-12 scroll-mt-24">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Cepli Dosya Ürün Fotoğrafları Galerisi
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOSYALAR_GALLERY.map((img, idx) => (
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

        {/* H2: Teknik Özellikler ve Dosya Seçenekleri */}
        <div className="mb-12 text-black">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-2.5 h-6 bg-secondary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Teknik Özellikler ve Dosya Seçenekleri
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-150 rounded-3xl p-6 md:p-8 space-y-4 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650">
            <p>
              Cepli dosya seçeneklerinde kullanılan kağıt türleri, baskı yönü ve koruyucu yüzey selefon kaplamaları hakkında temel bilgiler:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-2">
                <h4 className="font-black text-primary uppercase text-xs flex items-center gap-1.5">💪 Kağıt & Gramaj</h4>
                <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                  • <strong>350 gr Kuşe:</strong> Standart ve dengeli kalınlık sunan kurumsal dosya seçeneği.<br />
                  • <strong>400 gr Kuşe:</strong> Daha tok ve yüksek gramajlı dosya tercihi.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-2">
                <h4 className="font-black text-primary uppercase text-xs flex items-center gap-1.5">✨ Selefon & Yüzey</h4>
                <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                  Mat selefon veya parlak selefon kaplamaları ile yüzey koruması sağlanır. Belirli modellerde <strong>lokal lak</strong> uygulaması mevcuttur.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm space-y-2">
                <h4 className="font-black text-primary uppercase text-xs flex items-center gap-1.5">🖨️ Baskı Yönü & Adet</h4>
                <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                  Tek yön veya çift yön renkli baskı seçenekleri sunulmaktadır. 500 ve 1.000 adetlik paketlerde sipariş verilebilir.
                </p>
              </div>
            </div>

            {/* HANGİ SEÇENEĞİ TERCİH ETMELİYİM? ÖZET KARAR KUTUSU */}
            <div className="mt-8 p-6 bg-amber-50/70 border border-amber-200 rounded-3xl text-black">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-xl">💡</span>
                <h4 className="text-sm font-black text-amber-950 uppercase">Hangi Seçeneği Tercih Etmeliyim?</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed mb-4">
                İhtiyacınıza uygun cepli dosya modelini belirlemek için aşağıdaki karşılaştırmayı inceleyebilirsiniz:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-semibold list-disc pl-5">
                <li>
                  <strong className="text-black">Mat Selefon & Laklı (KLD):</strong> Mat selefon üzerine lokal kabartma lak uygulanan model.
                </li>
                <li>
                  <strong className="text-black">Mat Selefonlu (MND):</strong> Kurumsal sunumlar için mat yüzeyli standart model.
                </li>
                <li>
                  <strong className="text-black">Parlak Selefonlu (PD):</strong> Renklerin daha canlı öne çıktığı parlak yüzeyli model.
                </li>
                <li>
                  <strong className="text-black">Çift Yön Baskılı (CYPD / CYMD / CYML4D):</strong> Hem dış hem iç yüzeyde baskı içeren seçenekler.
                </li>
              </ul>
            </div>

            {/* KARŞILAŞTIRMA TABLOSU: Hangi Cepli Dosya Modelini Seçmeliyim? */}
            <div className="mt-8 scroll-mt-24">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-2 h-6 bg-secondary rounded-full shrink-0" />
                <h3 className="text-lg font-black text-black uppercase tracking-tight">
                  Hangi Cepli Dosya Modelini Seçmeliyim?
                </h3>
              </div>
              
              <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-900 text-white border-b border-slate-950">
                        <th className="p-4 font-black uppercase tracking-wider text-[11px] sm:text-xs">Model Adı</th>
                        <th className="p-4 font-black uppercase tracking-wider text-[11px] sm:text-xs">Gramaj</th>
                        <th className="p-4 font-black uppercase tracking-wider text-[11px] sm:text-xs">Selefon Türü</th>
                        <th className="p-4 font-black uppercase tracking-wider text-[11px] sm:text-xs">Baskı Yönü</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-semibold">
                      {[
                        {
                          name: "Mat Selefonlu Cepli Dosya",
                          weight: "350 gr Kuşe",
                          cellophane: "Mat Selefon",
                          direction: "Tek Yön"
                        },
                        {
                          name: "Parlak Selefonlu Cepli Dosya",
                          weight: "350 gr Kuşe",
                          cellophane: "Parlak Selefon",
                          direction: "Tek Yön"
                        },
                        {
                          name: "Kabartma Laklı Cepli Dosya",
                          weight: "350 gr Kuşe",
                          cellophane: "Mat Selefon + Lak",
                          direction: "Tek Yön"
                        },
                        {
                          name: "Çift Yön Baskılı Cepli Dosya",
                          weight: "350 gr Kuşe",
                          cellophane: "Mat / Parlak Selefon",
                          direction: "Çift Yön"
                        },
                        {
                          name: "400 gr Laklı Cepli Dosya",
                          weight: "400 gr Kuşe",
                          cellophane: "Mat Selefon + Lak",
                          direction: "Çift Yön"
                        }
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 text-slate-900 font-black text-[12px] sm:text-[13px]">{row.name}</td>
                          <td className="p-4 text-gray-700">{row.weight}</td>
                          <td className="p-4 text-gray-700">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100">
                              {row.cellophane}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600 leading-relaxed text-[12px] sm:text-[13px]">{row.direction}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CEPLİ DOSYA TASARIM REHBERİ */}
        <div className="mb-12 text-black">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Cepli Dosya Tasarım Rehberi
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Kapak Düzeni", desc: "Ön kapakta kurumsal logo ile şirketin ana unvanını sade bir hiyerarşiyle konumlandırın. Aşırı metin kalabalığından kaçının." },
              { title: "İletişim Alanı", desc: "Müşterilerinizin size kolayca ulaşabilmesi için iletişim bilgilerinizi okunaklı bir alana yerleştirin." },
              { title: "Kurumsal Renkler", desc: "Dosyanın iç ve dış alanlarında kurumsal kimliğinizle uyumlu CMYK renk tonlarını tercih edin." }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-150 rounded-2xl p-5 hover:bg-white hover:shadow-md transition-all">
                <span className="text-xs font-black text-primary block mb-1">Öneri 0{idx + 1}</span>
                <h3 className="text-sm font-black text-black uppercase mb-2">{item.title}</h3>
                <p className="text-xs text-gray-650 font-semibold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SIK YAPILAN CEPLİ DOSYA TASARIM HATALARI */}
        <div className="mb-12 text-black">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Sık Yapılan Cepli Dosya Tasarım Hataları
              </h2>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch font-medium">
              {[
                { title: "Katlama Payı Eksikliği", desc: "İçerisine çok sayıda evrak yerleştirildiğinde dosyanın rahat kapanması için katlama ve mizanpaj paylarına dikkat edilmemesi." },
                { title: "Ters Yönlü İç Grafik", desc: "Dosya kapatıldığında veya açıldığında ters görünebilecek hatalı iç yön yerleşimleri yapılması." },
                { title: "Düşük Çözünürlüklü Görseller", desc: "Baskı kalitesini düşürecek düşük çözünürlüklü logo veya görsellerin tasarıma eklenmesi." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-black text-red-500 block mb-1">HATA 0{idx + 1}</span>
                    <h3 className="text-sm font-black text-black uppercase mb-3">{item.title}</h3>
                    <p className="text-xs text-gray-650 font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ANINDA İLETİŞİM & FİYAT WHATSAPP TEKLİF AL ALTI ÇAĞRI */}
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-250 rounded-3xl p-8 md:p-10 shadow-sm mb-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-black">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gray-50/50 rounded-full -mr-24 -mt-24 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16 blur-xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-xl text-center md:text-left">
            <span className="inline-block bg-primary/10 text-primary text-xs md:text-sm px-3.5 py-1 rounded-full font-black uppercase tracking-wider">
              İletişim &amp; Bilgi
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight leading-tight">
              Tasarım Desteği ve Özel Teklif
            </h3>
            <p className="text-xs sm:text-sm text-gray-650 font-semibold leading-relaxed">
              Özel adet veya tasarım desteğine mi ihtiyacınız var? Logolarınızı ve bilgilerinizi iletin, ekibimiz sipariş sürecinizde yardımcı olsun.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex flex-col items-center gap-3 w-full md:w-auto">
            <div className="text-center md:text-right w-full md:w-auto">
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Müşteri Destek Hattı</span>
              <span className="block text-lg md:text-xl font-black text-black tracking-tight flex items-center gap-1.5 justify-center md:justify-end">
                <Phone size={16} className="text-emerald-600 shrink-0" />
                WhatsApp: 0536 602 23 73
              </span>
            </div>
            <a 
              href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, kurumsal cepli dosya baskısı için tasarım örneğimiz var. Kontrol edip fiyat teklifi verebilir misiniz?")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full text-sm md:text-base font-black tracking-tight transition-all shadow-lg hover:shadow-emerald-500/20 hover:scale-105 active:scale-95 duration-200"
            >
              <Phone size={18} className="fill-current rotate-12 shrink-0" />
              <span>WhatsApp'tan Teklif Al</span>
            </a>
          </div>
        </div>

        {/* ÖNERİLEN İÇ BAĞLANTILAR */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-black text-black mb-4 uppercase tracking-tight text-center">Kurumsal Setinizi Tamamlayın!</h2>
          <p className="text-center text-gray-500 font-medium mb-8">Cepli dosya siparişlerinizin içerisine yerleştireceğiniz diğer tamamlayıcı ürünlerimizi inceleyin.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Antetli Kağıt Baskı", desc: "Resmi yazışmalar ve teklif sunumları için antetli kağıt.", path: "/antetli" },
              { title: "Kartvizit Baskı", desc: "Kurumsal tanıtımınız için kartvizit seçenekleri.", path: "/kartvizit" },
              { title: "Diplomat Zarf", desc: "Resmi evrak gönderimleri için kurumsal zarf çözümleri.", path: "/zarf" },
              { title: "Katalog & Broşür", desc: "Sunum dosyanızda sunabileceğiniz broşür ve kataloglar.", path: "/kataloglar" }
            ].map((product, idx) => (
              <Link key={idx} to={product.path} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
                <h3 className="text-lg font-black text-black mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                <p className="text-xs font-medium text-gray-500 mb-4">{product.desc}</p>
                <span className="text-primary font-black text-[10px] uppercase tracking-widest group-hover:text-secondary transition-colors">Fiyatları Gör →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* SSS (FAQ) ALANI */}
        <div className="mb-14 text-black scroll-mt-24" id="sss">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Cepli Dosya Baskı Hakkında Sıkça Sorulan Sorular
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {DOSYALAR_DETAILS.faqList.map((faq, idx) => (
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

        {/* GÜVENCE KARTLARI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Deneyim ve Baskı Çözümleri */}
          <div className="bg-gray-50 border border-gray-150 rounded-3xl p-6 md:p-8 flex items-start gap-5 hover:border-primary/35 hover:bg-white hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShieldCheck size={26} />
            </div>
            <div className="space-y-2 text-xs sm:text-sm">
              <h3 className="font-black text-black uppercase">Deneyim ve Baskı Çözümleri</h3>
              <p className="text-gray-550 font-semibold leading-relaxed">
                Kurumsal dosya siparişlerinizde kuşe kağıt, selefon ve lak uygulamalarıyla kaliteli baskı çözümleri sunuyoruz.
              </p>
            </div>
          </div>

          {/* Kargo Gönderimi */}
          <div className="bg-gray-50 border border-gray-150 rounded-3xl p-6 md:p-8 flex items-start gap-5 hover:border-primary/35 hover:bg-white hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Truck size={26} />
            </div>
            <div className="space-y-2 text-xs sm:text-sm">
              <h3 className="font-black text-black uppercase">Türkiye Geneline Kargo Gönderimi</h3>
              <p className="text-gray-550 font-semibold leading-relaxed">
                İstanbul ve tüm şehirlere anlaşmalı kargo ağımız ile gönderim yapılmaktadır. Ürünleriniz korumalı kolilerde sevk edilir.
              </p>
            </div>
          </div>
        </div>

        {/* Blog Rehberleri */}
        <div className="my-10">
          <RelatedBlogPosts category="dosyalar" />
        </div>

      </div>

    </div>
  );
};

export default DosyalarPage;

