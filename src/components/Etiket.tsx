import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ShoppingCart, 
  HelpCircle, 
  ChevronDown, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Scissors, 
  Droplets, 
  Info, 
  Sparkles, 
  FileText, 
  AlertTriangle,
  Zap,
  Check
} from 'lucide-react';
import { 
  useCart, 
  ETIKET_DATA, 
  FeatureTooltip, 
  FireWarning
} from '../App';
import { CategoryHero } from './CategoryHero';
import { RelatedBlogPosts } from './RelatedBlogPosts';
import { DeliveryBadge } from './DeliveryBadge';

const ETIKET_GALLERY = [
  {
    src: "/images/etiket/yapiskanli-etiket-baski.webp",
    alt: "Kuşe Yapışkanlı Etiket Baskısı",
    title: "Kuşe Çıkartma Etiket",
    desc: "90 gr kuşe kağıt üzerine yüksek çözünürlüklü CMYK renkli baskı ve parlak selefon kaplamalı, ambalaj ve kutu etiketleme için ekonomik çözüm."
  },
  {
    src: "/images/etiket/kuse-gorsel-etiket.webp",
    alt: "PP Opak Plastik Etiket Baskısı",
    title: "PP Opak Suya Dayanıklı Etiket",
    desc: "Plastik bazlı, suya, yağa, neme ve yırtılmaya dayanıklı yapısıyla soğuk zincir, gıda, şampuan ve kozmetik ambalajlarında uzun ömürlü kullanım."
  },
  {
    src: "/images/etiket/seffaf-etiket-baski.webp",
    alt: "Şeffaf Sticker ve Etiket Baskısı",
    title: "Şeffaf Etiket (Transparan Sticker)",
    desc: "Zemin rengini ve ambalajın içini gösteren, cam şişelerde ve şeffaf kavanozlarda bütünleşik, estetik ve şık görünüm sunan kaplama."
  },
  {
    src: "/images/etiket/rulet-etiket-tasarimi.webp",
    alt: "Rulo ve Tabaka Etiket Baskısı",
    title: "Rulo ve Tabaka Etiket",
    desc: "Otomatik etiketleme makineleri veya manuel el ile yapıştırmaya uygun rulo ve tabaka kesimli etiket modelleri."
  },
  {
    src: "/images/etiket/etiket-baski-fiyatlari.webp",
    alt: "Özel Kesimli Sticker Baskı",
    title: "Özel Kesim Yapışkanlı Sticker",
    desc: "Yuvarlak, oval veya logonuzun formuna özel hassas kesimli, markanızı ve ürün ambalajlarınızı öne çıkaran sticker çözümleri."
  },
  {
    src: "/images/etiket/etiket-baski-ornegi.webp",
    alt: "Kavanoz ve Ambalaj Etiketi",
    title: "Kavanoz ve Ambalaj Etiketi",
    desc: "Gıda, baharat, bal ve kozmetik kavanozları için içeriği net gösteren, kuvvetli yapışkanlı kurumsal ürün etiketleri."
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
        referrerPolicy="no-referrer"
        className={`w-full h-full object-contain rounded-lg transition-all duration-300 ${imgClassName}`} 
      />
    </div>
  );
};

export const EtiketPage = () => {
  const { openProductDetail } = useCart();

  const openWhatsApp = (item: any) => {
    openProductDetail({ ...item, miktar: "1.000 Adet" }, "Etiket");
  };

  const etiketFaqs = [
    {
      q: "PP Opak etiket ile Kuşe kağıt etiket arasındaki temel fark nedir?",
      a: "PP Opak (Polipropilen) plastik bazlı bir malzeme olduğu için suya, neme, yağa, kimyasallara ve yırtılmaya karşı yüksek dayanıklılığa sahiptir. Kuşe etiket ise kağıt bazlıdır; iç mekan ambalajları, kuru gıda kutuları ve kargo paketlemeleri için ekonomik/maliyet etkin bir çözümdür, ancak ıslandığında yırtılabilir."
    },
    {
      q: "Şeffaf etiket yapıştırıldığı yüzeyde zamanla sararma veya hava kabarcığı izi yapar mı?",
      a: "Işık ve UV korumalı şeffaf polipropilen malzemelerimiz sararma yapmaz. Yüksek kaliteli transparan yapışkan katmanı sayesinde cam, şeffaf pet şişe veya kavanoz yüzeylerine uygulandığında zemin rengini aynen gösterir ve estetik bir ambalaj görünümü sunar."
    },
    {
      q: "Etiketleriniz suya, neme ve bulaşık makinesine dayanıklı mıdır?",
      a: "PP Opak ve Şeffaf (Plastik) etiketlerimiz su, nem ve sıvı temasına yüksek dayanıklılık gösterir. Sıvı sabun, şampuan, zeytinyağı, kozmetik ambalajları ve soğuk zincir gıda ürünlerinde güvenle kullanılır."
    },
    {
      q: "Derin dondurucu (-18°C) veya soğuk dolap şartlarında etiketin yapışkanı sökülür mü?",
      a: "Soğuk zincir ve derin dondurucu ortamları için özel Hotmelt veya kuvvetlendirilmiş akrilik tutkallı PP Opak etiketler tercih edilmelidir. Doğru yapışkan seçildiğinde donma ve nemlenme durumunda yapışkan sökülmez."
    },
    {
      q: "Kozmetik, şampuan ve yağ şişeleri için hangi etiket türü seçilmelidir?",
      a: "Sıvı ve yağ temasına maruz kalan kozmetik, temizlik ve gıda ambalajlarında kesinlikle koruyucu selefon kaplamalı PP Opak Plastik Etiket kullanılması tavsiye edilir."
    },
    {
      q: "Barkod ve QR kodların optik okuyucularda sorunsuz okunması için ne yapılmalı?",
      a: "Barkodlar grafik tasarım dosyasında CMYK karışımı yerine tercihen %100 K (Siyah) vektörel katman olarak hazırlanmalıdır. QR kodlarda ise zemin ile renk kontrastının yüksek olmasına ve etrafında en az 4 modül sessiz (boşluk) alan kalmasına dikkat edilmelidir."
    },
    {
      q: "Etiket malzemeleriniz gıda ambalajı ve kavanoz etiketlemeye uygun mudur?",
      a: "Etiketlerimiz gıda ambalajının, cam kavanozun veya kutunun dış yüzeyine uygulanan ikincil ambalaj etiketidir. Ambalaj dış yüzeyi için hijyenik ISO belgeli taşıyıcılarda üretilir. Doğrudan gıdayla temas eden iç yüzeyler için ise gıda temas sertifikalı özel malzeme ve mürekkep tercih edilmelidir."
    },
    {
      q: "Rulo etiket mi yoksa tabaka etiket mi tercih edilmelidir?",
      a: "Otomatik etiketleme makinesi kullanan fabrikalar ve yüksek montajlı üretim hatları için rulo etiket uygundur. Manuel el ile yapıştırma yapan butik işletmeler için ise tabaka kesimli etiketlerimiz büyük kullanım kolaylığı sunar."
    },
    {
      q: "Özel formda (dairesel, oval veya amorf logo şeklinde) kesim yapıyor musunuz?",
      a: "Evet. Hassas bıçaklı kesim makinelerimiz sayesinde (üretim yöntemine göre ±1 mm kesim toleransıyla) logonuzun veya ambalajınızın formuna özel dairesel, oval veya özel kesimli yapışkanlı etiket üretimi gerçekleştirmekteyiz."
    },
    {
      q: "Etiket baskıda minimum sipariş adedi ve kalıp maliyeti nasıldır?",
      a: "Standart ebatlı kuşe ve PP opak etiketlerimizde minimum sipariş adedi 1.000 adettir. Üreticiden doğrudan tedarik sağladığımız için ekstra kalıp maliyetleri birim fiyatlarımıza şeffaf olarak yansıtılmaktadır."
    },
    {
      q: "Kiss-cut (yarım kesim) nedir ve etiketin kullanımını nasıl kolaylaştırır?",
      a: "Kiss-cut, alt taşıyıcı silikonlu kağıda zarar vermeden sadece üstteki etiket malzemesini hassas biçimde kesme işlemidir. Bu sayede etiketi parmağınızla taşıyıcıdan kolayca soyup saniyeler içinde ambalaja uygulayabilirsiniz."
    },
    {
      q: "Sıcak ve soğuk hava şartlarına en dayanıklı yapışkan türü hangisidir?",
      a: "Pürüzlü, kavisli ve değişken ısıdaki yüzeyler için Hotmelt (eriyik esaslı) yapışkanlar; düz ve oda sıcaklığındaki ambalajlar için ise Akrilik esaslı yapışkanlar en yüksek tutuculuk performansını gösterir."
    },
    {
      q: "Şeffaf etiketlerin altına beyaz mürekkep (White Ink) baskısı yapılıyor mu?",
      a: "Şeffaf etiketlerde renklerin koyu ambalaj yüzeyinde soluk görünmemesi için örtücü beyaz mürekkep (White Ink) katman baskısı özel teklif ve üretim kapsamında sunulmaktadır."
    },
    {
      q: "Mat selefon kaplama mı yoksa parlak selefon kaplama mı tercih edilmelidir?",
      a: "Canlı ve dikkat çekici renkler için Parlak Selefon; parlamayan, zarif, premium ve doğal bir dokunuş için Mat Selefon kaplama tercih edilmelidir."
    },
    {
      q: "Etiket tasarımında bıçak kesim toleransı nedir ve ne kadar pay bırakılmalıdır?",
      a: "Bıçak makinelerinin milimetrik kayma riskini engellemek amacıyla tasarımda bıçak çizgisinin dışına en az +2 mm taşma payı (bleed) ve bıçak çizgisinden içeriye en az 2 mm güvenli alan (safe zone) bırakılmalıdır."
    },
    {
      q: "Etiket siparişlerinde üretim ve teslimat süresi ne kadardır?",
      a: "İstanbul Topkapı üretim tesisimizde üretilen etiket siparişleriniz standart olarak 3-4 iş günü içerisinde tamamlanarak Türkiye genelindeki adresinize kargo ile sevk edilmektedir."
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Sticker ve Etiket Baskı Fiyatları | PP Opak &amp; Kuşe - Mavi Basım</title>
        <meta name="description" content="Ürün ambalajlarınız için suya dayanıklı PP opak plastik etiket, kuşe yapışkanlı sticker ve şeffaf etiket baskısı. İstanbul Topkapı matbaasından kapınıza hızlı kargo." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <CategoryHero
          title="Sticker &amp; Etiket Baskı Fiyatları (PP Opak &amp; Kuşe Çıkartma)"
          badge="Özel Kesimli &amp; Suya Dayanıklı Etiketler"
          description={
            <p>
              Ürün ambalajlarınız ve kurumsal etiket ihtiyaçlarınız için yırtılmaya yüksek dirençli, suya dayanıklı PP opak plastik etiket, şeffaf sticker ve 90 gr kuşe yapışkanlı <strong className="text-slate-900">etiket baskı</strong> çözümleri sunuyoruz. Ambalaj çözümlerinizi tamamlamak için <Link to="/kutu" className="text-primary hover:underline font-bold">karton kutu</Link>, <Link to="/karton-canta" className="text-primary hover:underline font-bold">karton çanta</Link> ve <Link to="/brosur" className="text-primary hover:underline font-bold">broşür</Link> siparişlerinizi Topkapı imalat tesisimizden doğrudan ve pratik sipariş süreciyle verebilirsiniz.
            </p>
          }
          relatedLinks={[
            { label: "Karton Kutu Baskı", path: "/kutu" },
            { label: "Karton Çanta", path: "/karton-canta" },
            { label: "Ambalaj Çözümleri", path: "/ambalaj" },
            { label: "Broşür Baskı", path: "/brosur" }
          ]}
          customCtaText="Özel Kesim Etiket Teklifi Al"
        />

        {/* Dynamic Delivery Date Banner */}
        <DeliveryBadge categoryKey="etiket" days={3} variant="banner" className="my-6" />

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-visible relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px]">
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th className="p-4 w-10"></th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EBAT</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                  <th className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {ETIKET_DATA.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group">
                    {idx === 0 && (
                      <td 
                        rowSpan={ETIKET_DATA.length}
                        className="bg-secondary text-white font-black text-center p-1 w-10 border-r border-white/10"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        <span className="tracking-[0.1em] uppercase text-[10px]">ETİKET</span>
                      </td>
                    )}
                    <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors">{item.code}</td>
                    <td className="p-3 text-center font-medium text-black border-r border-gray-100">{item.ebat}</td>
                    <td className="p-3 text-center text-black font-medium border-r border-gray-100">
                      {item.desc}
                      <FeatureTooltip code={item.code} />
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
          <div className="bg-amber-50/80 px-4 py-3.5 border-t border-amber-200/80 flex flex-col gap-2 text-xs font-medium font-sans">
            <div className="flex items-start gap-2 text-amber-900 font-bold text-xs md:text-sm leading-snug">
              <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <span>* Tablomuz standart kuşe çıkartma etiket fiyatlarını içermektedir. PP Opak, şeffaf, sökülebilir ve rulo etiket talepleriniz özel teklif kapsamındadır.</span>
            </div>
            <div className="text-slate-500 text-[11px] md:text-xs pl-6">
              * Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.
            </div>
          </div>
        </div>
        <div className="mt-4">
          <FireWarning />
        </div>

        {/* ÜRÜN FOTOĞRAFLARI GALERİSİ */}
        <div className="mt-12 mb-12 scroll-mt-24">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Etiket &amp; Sticker Ürün Fotoğrafları Galerisi
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ETIKET_GALLERY.map((img, idx) => (
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

        {/* DETAYLI TEKNİK REHBER & İÇERİK BÖLÜMÜ */}
        <div className="mt-16 space-y-16">
          {/* Giriş & Genel Bilgi */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">
              Etiket Baskı Fiyatları | Yapışkanlı Sticker ve Ambalaj Etiketi Çözümleri
            </h2>
            <div className="prose prose-slate max-w-none text-black leading-relaxed">
              <p className="text-base md:text-lg mb-6">
                <strong className="font-black text-black">Mavi Basım Matbaa &amp; Reklam</strong> olarak, Türkiye genelinde hizmet veren, İstanbul Topkapı üretim tesisimizde yıllara dayanan matbaa ve baskı tecrübesine sahip uzman üretim ve kalite kontrol ekibimizle kurumsal etiket ve yapışkanlı sticker imalatı yapmaktayız. Ürünlerin ambalaj kimliğini güçlendiren, tüketiciye güven veren ve sektörel standartlara uygun etiket çözümleri üretiyoruz.
              </p>
              <p className="text-base md:text-lg mb-6">
                Etiket baskı taleplerinizde üreticiden şeffaf fiyatlandırma ve rekabetçi fiyatlar sunuyoruz. İç mekan kuru ambalajlardan soğuk zincir gıda ürünlerine, kozmetik cam şişelerinden e-ticaret kargo paketlerine kadar geniş bir malzeme yelpazesi kullanmaktayız. Standart üretimlerimizde 90 gr kuşe çıkartma kağıdı ve suya dayanıklı PP Opak plastik taşıyıcılar kullanılmaktadır.
              </p>
              <p className="text-base md:text-lg">
                Etiket baskı, ambalaj ürünlerinde sık tercih edilen çözümlerden biridir ve markaların ürün üzerindeki ilk iletişim noktasıdır. Online etiket sipariş sürecimizde grafik kontrol ekiplerimiz tasarımınızı baskı öncesinde tanımlanan kesim toleranslarına ve bıçak çizgisine göre inceler. Bütçe dostu ve maliyet etkin etiket çözümlerimizle ürün ambalajlarınızı profesyonel görünüme kavuşturabilirsiniz.
              </p>
            </div>
          </section>

          {/* MALZEME KARŞILAŞTIRMA MATRİSİ */}
          <section className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="text-primary shrink-0" size={28} />
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                Etiket Malzeme Karşılaştırma Rehberi
              </h2>
            </div>
            <p className="text-gray-600 font-medium mb-8">
              Ürününüzün maruz kalacağı çevresel şartlara (su, nem, yağ, sıcaklık) göre en doğru etiket malzemesini seçebilirsiniz:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 rounded-tl-xl font-black uppercase">Malzeme Türü</th>
                    <th className="p-4 font-black uppercase">Su &amp; Nem Dayanımı</th>
                    <th className="p-4 font-black uppercase">Yırtılma Direnci</th>
                    <th className="p-4 font-black uppercase">Yüzey Görünümü</th>
                    <th className="p-4 rounded-tr-xl font-black uppercase">Önerilen Kullanım Alanı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="p-4 font-black text-black">Kuşe Kağıt Etiket</td>
                    <td className="p-4 text-amber-600 font-bold">Hassas (Düşük)</td>
                    <td className="p-4 text-amber-600 font-bold">Yırtılabilir (Kağıt)</td>
                    <td className="p-4 text-gray-700 font-medium">Parlak veya Mat Selefonlu</td>
                    <td className="p-4 text-gray-700 font-medium">Kuru gıda kutuları, kargo koli etiketleri, kampanya stickerları</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-black text-black">PP Opak Plastik Etiket</td>
                    <td className="p-4 text-emerald-600 font-black">✔ Suya &amp; Neme Dayanıklı</td>
                    <td className="p-4 text-emerald-600 font-black">✔ Yırtılmaya Dirençli Plastik Yapı</td>
                    <td className="p-4 text-gray-700 font-medium">Beyaz Opak Plastik Zemin</td>
                    <td className="p-4 text-gray-700 font-medium">Şampuan, kozmetik, zeytinyağı, temizlik ve dondurulmuş gıda</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-black text-black">Şeffaf (Transparan) Etiket</td>
                    <td className="p-4 text-emerald-600 font-black">✔ Suya &amp; Neme Dayanıklı</td>
                    <td className="p-4 text-emerald-600 font-black">✔ Yırtılmaya Dirençli Plastik Yapı</td>
                    <td className="p-4 text-gray-700 font-medium">Saydam Transparan Film</td>
                    <td className="p-4 text-gray-700 font-medium">Cam şişe, kavanoz ve şeffaf plastik ambalaj kaplamaları</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-black text-black">Sökülebilir (Removable) Etiket</td>
                    <td className="p-4 text-gray-600 font-bold">Orta</td>
                    <td className="p-4 text-gray-600 font-bold">Esnek Taşıyıcı</td>
                    <td className="p-4 text-gray-700 font-medium">Düşük Kalıntılı Sökülebilir Yapışkan</td>
                    <td className="p-4 text-gray-700 font-medium">Cam, züccaciye, beyaz eşya ve geçici kampanya etiketleri</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs md:text-sm text-amber-900 font-medium">
              <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
              <p>
                <strong>Gıda Teması Uyarısı:</strong> Standart etiketlerimiz ambalajın, kutunun veya cam kavanozun dış yüzeyine uygulanır; doğrudan gıdayla temas eden iç yüzeyler için ise gıda temas sertifikalı özel malzeme ve mürekkep tercih edilmelidir.
              </p>
            </div>
          </section>

          {/* YAPIŞKAN VE LAMINASYON TEKNOLOJİLERİ */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">
              Yapışkan Türleri ve Yüzey Kaplama Seçenekleri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 font-black">
                  <ShieldCheck size={26} />
                </div>
                <h3 className="text-lg font-black text-black mb-2">Akrilik Tutkal (Standart Yapışkan)</h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed">
                  Oda sıcaklığındaki düz cam, plastik, kağıt ve karton yüzeyler için standart yüksek tutuculuk sunan akrilik esaslı yapışkan türüdür.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 font-black">
                  <Zap size={26} />
                </div>
                <h3 className="text-lg font-black text-black mb-2">Hotmelt Yapışkan (Ekstra Tutuculuk)</h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed">
                  Pürüzlü, kavisli, tutunması zor metal veya plastik yüzeyler ile soğuk zincir ambalajları için geliştirilmiş kuvvetli tutkal formu.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 font-black">
                  <Droplets size={26} />
                </div>
                <h3 className="text-lg font-black text-black mb-2">Parlak &amp; Mat Selefon Lamine</h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed">
                  Baskının üzerine çekilen mikronluk koruyucu film. Parlak selefon renkleri canlı gösterirken, mat selefon parlamasız doku kazandırır.
                </p>
              </div>
            </div>
          </section>

          {/* TEKNİK ÖZELLİKLER & SIK YAPILAN HATALAR */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="bg-gray-50 p-8 rounded-[32px] border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="text-primary" size={26} />
                <h2 className="text-2xl font-black text-black uppercase tracking-tight">Etiket Teknik Özellikleri</h2>
              </div>
              <ul className="space-y-4">
                {[
                  { label: "Baskı Yüzeyi", value: "Tek taraflı CMYK renkli yüksek hassasiyetli baskı (Arka yüzey silikonlu taşıyıcı kağıt)" },
                  { label: "Malzeme Türü", value: "90 gr Kuşe Çıkartma veya Suya Dayanıklı PP Opak Plastik / Şeffaf Film" },
                  { label: "Ebat & Kesim", value: "83x51 mm düz kesim, dairesel, oval veya logonun formuna özel hassas özel bıçak kesimi (±1 mm kesim toleransı)" },
                  { label: "Yüzey Koruma", value: "Sürtünmeye dayanıklı Parlak veya Mat Koruyucu Selefon Kaplama" },
                  { label: "Kesim Tipi", value: "Kiss-Cut (taşıyıcıdan kolay soyulabilir yarım kesim) veya Tabaka Giyotin Kesim" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary shrink-0 mt-1" size={18} />
                    <p className="text-sm md:text-base font-bold text-black">
                      <span className="text-primary font-black">{item.label}:</span> {item.value}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-red-50 p-8 rounded-[32px] border border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="text-red-600" size={26} />
                <h2 className="text-2xl font-black text-red-700 uppercase tracking-tight">Etikette Sık Yapılan 5 Teknik Hata</h2>
              </div>
              <ul className="space-y-4">
                {[
                  { title: "Nemli Yüzeyde Kağıt Etiket Kullanımı", desc: "Sıvı veya şampuan ambalajlarında Kuşe Etiket seçilerek ıslanıp yırtılmasına sebep olunması." },
                  { title: "CMYK Çoklu Renk Barkod Hazırlığı", desc: "Barkodların CMYK karışımı yapılması (Barkodlar okuyucu hassasiyeti için tercihen %100 K Siyah hazırlanmalıdır)." },
                  { title: "Bıçak Taşma Payı (Bleed) Bırakılmaması", desc: "Kesim çizgisinde +2 mm taşma payı bırakılmayıp bıçak kaymasında kenarlarda beyaz boşluk kalması." },
                  { title: "Küçük Tipografi & Font Boyutu", desc: "Arka etiket içindekiler metninde 6 pt altı font kullanılarak okunabilirliğin kaybedilmesi." },
                  { title: "Kavisli Yüzeyde Standart Yapışkan Tercihi", desc: "Tutunması zor bombeli ambalajlarda Hotmelt yerine standart akrilik yapışkan kullanılması." }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0" />
                    <p className="text-sm md:text-base font-bold text-red-950">
                      {item.title} <span className="text-red-700 font-medium block text-xs mt-0.5">→ {item.desc}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* TEKNİK TASARIM REHBERİ */}
          <section className="bg-slate-900 text-white p-8 md:p-12 rounded-[32px]">
            <div className="flex items-center gap-3 mb-8">
              <Scissors className="text-primary shrink-0" size={32} />
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Etiket Baskı İçin Teknik Tasarım Rehberi
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <div className="text-primary font-black text-lg mb-2">01. Güvenli Alan</div>
                <p className="text-gray-300 text-xs md:text-sm font-medium leading-relaxed">
                  Metin, logo ve kritik görseller bıçak çizgisinden en az <strong>2 mm içeride</strong> yer almalıdır.
                </p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <div className="text-primary font-black text-lg mb-2">02. Taşma Payı (Bleed)</div>
                <div className="text-gray-300 text-xs md:text-sm font-medium leading-relaxed">
                  Tasarım zemin rengi ve desenleri kesim bıçağının dışına en az <strong>+2 mm taşırılmalıdır</strong>.
                </div>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <div className="text-primary font-black text-lg mb-2">03. Barkod &amp; QR Kod</div>
                <p className="text-gray-300 text-xs md:text-sm font-medium leading-relaxed">
                  Barkodlar tercihen <strong>%100 K Siyah</strong> vektörel; QR kodlar ise yüksek zemin kontrastı ve en az <strong>4 modül sessiz alanla</strong> eklenmelidir.
                </p>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <div className="text-primary font-black text-lg mb-2">04. Çözünürlük &amp; Renk</div>
                <p className="text-gray-300 text-xs md:text-sm font-medium leading-relaxed">
                  Baskı dosyaları <strong>300 DPI çözünürlükte</strong> ve <strong>CMYK renk modunda</strong> vektörel PDF hazırlanmalıdır.
                </p>
              </div>
            </div>
          </section>

          {/* 6 ADIMDA ÜRETİM SÜRECİ */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="text-primary shrink-0" size={28} />
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                Etiket İmalat ve Üretim Adımları
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { step: "1", title: "Grafik Kontrol", desc: "Taşma payı ve bıçak çizgisi teknik toleranslara göre kontrol edilir." },
                { step: "2", title: "CTP & Baskı", desc: "CMYK renk modunda yüksek çözünürlüklü baskı gerçekleştirilir." },
                { step: "3", title: "Laminasyon", desc: "Koruyucu mat veya parlak selefon çekilir." },
                { step: "4", title: "Kiss-Cut Kesim", desc: "Hassas bıçakla yarım kesim uygulanır." },
                { step: "5", title: "Kalite Kontrol", desc: "Fire ve yapışkan kalitesi incelenir." },
                { step: "6", title: "Paket & Sevkiyat", desc: "Özenle ambalajlanıp kargoya verilir." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative pt-8">
                  <span className="absolute -top-3 left-4 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center font-black text-xs shadow-md">
                    {item.step}
                  </span>
                  <h3 className="font-black text-black text-sm mb-1.5">{item.title}</h3>
                  <p className="text-xs text-gray-550 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* KAPSAMLI SIKÇA SORULAN SORULAR (SSS - 16 Soru) */}
          <section className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-10 scroll-mt-24" id="faq">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="text-primary shrink-0" size={30} />
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                Etiket Baskı Hakkında Sıkça Sorulan Sorular (SSS)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              {etiketFaqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="h-full bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-black text-black text-xs md:text-sm mb-3 flex items-start gap-2.5">
                      <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />
                      <span className="leading-snug">{faq.q}</span>
                    </h3>
                    <div className="h-px bg-gray-100 mb-3 w-full" />
                    <p className="text-gray-650 text-xs md:text-sm font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* İLGİLİ DİĞER ÜRÜNLER */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">
              Kurumsal Ambalaj Ve Tanıtım Ürünleri
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Karton Kutu Baskı", desc: "Özel kesimli ambalaj ve ürün kutuları.", path: "/kutu" },
                { title: "Karton Çanta", desc: "Lüks ipli kurumsal mağaza çantaları.", path: "/karton-canta" },
                { title: "Broşür Baskı", desc: "Ürün ve hizmet tanıtım broşürleri.", path: "/brosur" },
                { title: "Kartvizit Baskı", desc: "Kurumsal ilk izlenim kartvizitleri.", path: "/kartvizit" }
              ].map((product, idx) => (
                <Link key={idx} to={product.path} className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-primary transition-all">
                  <h3 className="text-lg font-black text-black mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                  <p className="text-sm font-medium text-gray-500">{product.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <RelatedBlogPosts category="etiket" />
        </div>
      </div>
    </div>
  );
};
