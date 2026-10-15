import ReactMarkdown from 'react-markdown';
import { Cpu, Printer, Layers, Settings, ShieldCheck, Truck } from 'lucide-react';
import { PRODUCT_DESCRIPTIONS } from '../constants/productTexts';
import { WHATSAPP_LINK } from '../constants/contact';

const SEO_SPECS: Record<string, {
  role: string;
  authority: string;
  process: string;
  machines: string;
  paper: string;
  postPress: string;
}> = {
  "kartvizit": {
    role: "Kartvizit Çözümleri",
    authority: "Kartvizit siparişleriniz kalite standartlarımıza uygun olarak Topkapı merkezimiz koordinasyonunda hazırlanmaktadır.",
    process: "Yüksek çözünürlüklü tabaka montajının ardından, gelişmiş ofset veya dijital baskı parkurunda basılır, hassas giyotin kesimlerle tamamlanır.",
    machines: "Yüksek Hassasiyetli Ofset ve Dijital Baskı Sistemleri, Polar Giyotin, Lokal Lak ve Gofre Üniteleri.",
    paper: "350 gr. Mat/Parlak Kuşe, 350 gr. Birinci Sınıf Bristol Karton, 700 gr. Çift Kat Sıvama Karton ve Fantezi Özel Dokulu Kağıtlar.",
    postPress: "Mat/Parlak Selefon Kaplama, Lokal Kabartma Lak, Altın/Gümüş Varak Yaldız, Oval Köşe Kesimi."
  },
  "brosur": {
    role: "Broşür Çözümleri",
    authority: "Broşür siparişleriniz standartlara uygun olarak hazırlanmaktadır.",
    process: "Tasarım mizanpaj onayı sonrası tabaka montajı yapılır, çift taraflı basılıp kırım ünitelerinde katlanır.",
    machines: "4-Renk Ofset Baskı, Otomatik Kırım ve Katlama Sistemleri, Hassas Giyotin Kesim Sistemleri.",
    paper: "115 gr, 130 gr Parlak ve Mat Kuşe Kağıt Çeşitleri.",
    postPress: "Tek Kırım, Çift Kırım (C Kırım), Üç Kırım Akordeon Katlama, Koruyucu Selefon Uygulaması."
  },
  "el_ilani": {
    role: "El İlanı Çözümleri",
    authority: "El ilanı siparişleriniz Topkapı merkezimizde titizlikle hazırlanmaktadır.",
    process: "Dağıtım ve lokasyon tanıtımları için tabaka halinde basılır ve pürüzsüz giyotin bıçaklarla tam ebatında kesilerek ambalajlanır.",
    machines: "Ofset Baskı Üniteleri, Hassas Giyotin Hatları, Paketleme Üniteleri.",
    paper: "105 gr, 115 gr, 130 gr Parlak Kuşe ve Birinci Hamur Kağıtlar.",
    postPress: "Düz Giyotin Kesim, İsteğe Bağlı Kısmi Parlak Lak, Korunaklı Paketleme ve Hızlı Kargo Hazırlığı."
  },
  "katalog": {
    role: "Katalog Çözümleri",
    authority: "Katalog baskı süreçleriniz profesyonel olarak tamamlanmaktadır.",
    process: "Çok sayfalı mizanpaj montajı kalıplara aktarılır, basılan sayfalar harmanlanıp iplik dikiş veya Amerikan sıcak tutkal ciltle birleştirilir.",
    machines: "Ofset Baskı Üniteleri, Otomatik Harman Üniteleri, Amerikan Cilt Sıcak Tutkal Hatları, Tel Dikiş ve İplik Dikiş Sistemleri.",
    paper: "Kapak için 250-350 gr. Kuşe Kağıt, İç Sayfalar için 115 gr, 130 gr Parlak/Mat Kuşe Kağıtlar.",
    postPress: "Kapak Mat/Parlak Selefon, Kısmi Kabartma Lak, Sıcak Amerikan Cilt, Tel/İplik Dikiş, Gofre Kabartma."
  },
  "etiket": {
    role: "Etiket Çözümleri",
    authority: "Etiket siparişleriniz rulo ve tabaka olarak hassasiyetle hazırlanır.",
    process: "Rulo etiketlerde bobinden bobine baskı teknikleri, tabaka etiketlerde ise baskı sonrası özel bıçaklı yarı-kesim (kiss-cut) uygulanır.",
    machines: "Flekso Bobin Baskı Hattı, Rulo Dijital Baskı, Otomatik Rulo Sarım ve Dilimleme Sistemleri, Optik Kesim Ünitesi.",
    paper: "Kendinden Yapışkanlı Çıkartma Kağıdı, PP Opak (Suya Dayanıklı Plastik), PP Şeffaf Etiket, Termal Yapışkanlı Kağıtlar.",
    postPress: "Mat/Parlak Selefon Kaplama, Özel Şekilli Yarı Kesim, Altın/Gümüş Varak Yaldız, Bobine Dilimleme ve Rulo Sarım."
  },
  "kutu": {
    role: "Kutu Çözümleri",
    authority: "Kutu ve ambalaj siparişleriniz titizlikle tamamlanmaktadır.",
    process: "Amerikan Bristol veya kroma karton üzerine yapılan baskı sonrası mukavemet artırıcı selefon kaplanır. Ardından preslerde şekilli kesim yapılıp yapıştırma alanlarında katlanır.",
    machines: "Ofset Baskı Sistemleri, Şekilli Kesim Presleri, Otomatik Yan ve Dip Yapıştırma Hatları.",
    paper: "230 gr, 250 gr, 300 gr, 350 gr Amerikan Bristol Karton ve Kroma Karton Çeşitleri.",
    postPress: "Mat/Parlak Selefon, Pencereli Kutularda Şeffaf Asetat Yapıştırma, Gofre (Kabartma), Varak Yaldız, Otomatik Dip Yapıştırma."
  },
  "karton_canta": {
    role: "Karton Çanta Üreticisi",
    authority: "Karton çanta üretimi Topkapı üretim tesisimizde imal edilir.",
    process: "Kalın Amerikan Bristol kartona yapılan baskı ve selefon sonrası otomatik kazanlı preslerde kesim yapılır, alt ve ağız takviye kartonları sıvanarak el işçiliğiyle sap ipleri takılır.",
    machines: "Büyük Format Ofset Baskı, Kazanlı Kesim Presleri, Otomatik Delik Delme ve Kuşgözü Çakma Makineleri.",
    paper: "210 gr, 250 gr. Amerikan Bristol Karton, Kraft ve Esmer Ambalaj Kağıtları.",
    postPress: "Mat/Parlak Selefon, Gofre Kabartma, Altın Varak Yaldız, Kurdele veya PP İp Sap Takılması, Taban Takviye Kartonu Sıvama."
  },
  "ambalaj": {
    role: "Ambalaj Üreticisi",
    authority: "Ambalaj üretimi standartlara uygun olarak tesisimizde basılır.",
    process: "Uygun kağıtlar üzerine kokusuz, su bazlı mürekkeplerle flekso veya ofset baskı yapılır, rulo veya tabaka olarak dilimlenir.",
    machines: "Flekso Ambalaj Baskı Makineleri, Büyük Format Ofset Baskı, Bobinden Tabakaya Ebatlama Hatları.",
    paper: "Gıdaya Uygun Kraft Kağıt, Yağ Geçirmez Sülfit ve Şamua Kağıtları, OPP/PE Laminasyonlu Esnek Ambalaj Malzemeleri.",
    postPress: "Otomatik Dilimleme ve Bobine Sarım, Tabaka Kesim, Kese Kağıdı Formunda Katlama ve Yan Yapıştırma."
  },
  "zarf": {
  role: "Zarf Baskı Çözümleri",
  authority: "Zarf baskı siparişleri İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktamız üzerinden planlanmaktadır.",
  process: "Zarf seçenekleri; diplomat veya torba zarf modeli, ürün kodu, ölçü ve adet bilgilerine göre değerlendirilir.",
  machines: "Baskı, kesim ve paketleme süreçleri ürün detaylarına göre planlanır.",
  paper: "110 gr 1. Hamur kağıt seçeneği.",
  postPress: "Baskı sonrası kontrol, ebatlama ve paketleme işlemleri ürün detaylarına göre uygulanır."
},
  "magnet": {
    role: "Magnet Üreticisi",
    authority: "Magnet üretimi Topkapı üretim tesisimizde yapılmaktadır.",
    process: "Kuşe kağıda yapılan ofset baskı ve selefon kaplamanın ardından, otomatik laminasyon makinesinde rulo mıknatısa (magnet) sıvanır ve kazanlı preslerde şekilli bıçaklarla kesilir.",
    machines: "Ofset Baskı, Otomatik Magnet Sıvama (Laminasyon) Hatları, Yüksek Tonajlı Kazanlı Kesim Presleri.",
    paper: "300 gr, 350 gr. Kuşe Kağıt, 0,40 mm veya 0,50 mm Kalınlıkta İthal Rulo Mıknatıs (Magnet Tabakası).",
    postPress: "Parlak/Mat Selefon Kaplama, Özel Şekilli Bıçak Kesimi, Çapak Ayıklama, Otomatik Sayım ve Korunaklı Paketleme."
  },
  "yağ_kartı": {
    role: "Yağ Kartı Üreticisi",
    authority: "Yağ kartı imalatı İstanbul Topkapı tesisimizde gerçekleştirilmektedir.",
    process: "Tasarımı onaylanan yağ kartları tabaka montajına alınır. Ofset baskı sonrası mat selefon lamine edilir ve 4 mm delik payları ile özel bıçaklı kesim preslerinde ebatlanır.",
    machines: "Ofset Baskı Makineleri, Selefon Laminasyon Üniteleri, Kazanlı Kesim Presleri.",
    paper: "350 gr Kuşe Kağıt ve 700 gr Çift Kat (Sıvama) Karton Seçenekleri.",
    postPress: "Mat Selefon Kaplama, Özel Kesim, 4 mm İp Deliği Delme ve İp İlavesi."
  },
  "yag_karti": {
    role: "Yağ Kartı Üreticisi",
    authority: "Yağ kartı imalatı İstanbul Topkapı tesisimizde gerçekleştirilmektedir.",
    process: "Tasarımı onaylanan yağ kartları tabaka montajına alınır. Ofset baskı sonrası mat selefon lamine edilir ve 4 mm delik payları ile özel bıçaklı kesim preslerinde ebatlanır.",
    machines: "Ofset Baskı Makineleri, Selefon Laminasyon Üniteleri, Kazanlı Kesim Presleri.",
    paper: "350 gr Kuşe Kağıt ve 700 gr Çift Kat (Sıvama) Karton Seçenekleri.",
    postPress: "Mat Selefon Kaplama, Özel Kesim, 4 mm İp Deliği Delme ve İp İlavesi."
  },
  "afis": {
    role: "Afiş ve Poster Baskı Hizmetleri",
    authority: "Afiş ve poster baskı siparişleriniz kalite standartlarımıza uygun olarak Topkapı hizmet noktamız koordinasyonunda titizlikle hazırlanmaktadır.",
    process: "300 DPI yüksek çözünürlüklü tabaka montajının ardından çok renkli Heidelberg ofset baskı makinelerinde basılır, hassas giyotin kesimlerle ebatlanır ve koruyucu rulo paketleme yapılır.",
    machines: "Heidelberg Ofset Baskı Makineleri, Geniş Format Dijital Baskı Hatları, Polar Giyotin Kesim Sistemleri.",
    paper: "105 gr, 135 gr, 170 gr Parlak Kuşe Kağıtlar ve 120 gr Blueback Dış Mekan Kağıdı.",
    postPress: "Düz Giyotin Kesim, Mat/Parlak Selefon Kaplama, Rulo Sarım ve Koruyucu Tüp Paketleme."
  }
};

export const ProductSEOSection = ({ categoryKey, hideTrustFooter }: { categoryKey: string; hideTrustFooter?: boolean }) => {
  const content = PRODUCT_DESCRIPTIONS[categoryKey];
  if (!content) return null;

  const spec = SEO_SPECS[categoryKey] || {
    role: "Matbaa Üreticisi",
    authority: "Üretim süreçleri İstanbul Topkapı tesisimizde gerçekleştirilmektedir.",
    process: "Tasarımı onaylanan siparişler baskı kalıplarına aktarılır. Baskı sonrası ebatlama ve yüzey işlemleri uygulanır.",
    machines: "Ofset Baskı Makineleri, Dijital Baskı Hatları, Otomatik Mücellithane Ekipmanları.",
    paper: "Kullanım amacına uygun kuşe kağıt, Amerikan Bristol veya kroma karton seçenekleri.",
    postPress: "Selefon kaplama, kesim, kırım ve paketleme işlemleri."
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-20">
      {/* Üretici Odaklı Otorite Başlığı */}
      <div className="bg-slate-900 text-white rounded-[32px] p-8 md:p-12 shadow-2xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#00E5FF]/10 text-[#00E5FF] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            DOĞRUDAN TESLİMAT
          </div>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4 text-white">
  {categoryKey === 'zarf' ? (
    <>
      İstanbul Topkapı Hizmet ve Koordinasyon Noktamızdan{' '}
      <span className="text-[#00E5FF]">{spec.role}</span>
    </>
  ) : (
    <>
      İstanbul Topkapı Tesisimizden{' '}
      <span className="text-[#00E5FF]">{spec.role}</span> Hizmeti
    </>
  )}
</h2>
          <p className="text-gray-300 font-bold text-base md:text-lg leading-relaxed mb-0">
            {spec.authority} Siparişleriniz özenle basılarak paketlenmekte ve kargo ile adresinize sevk edilmektedir.
          </p>
        </div>
      </div>

      {/* 4 Bölümlü Üretim Süreci Detayları */}
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-gray-100 mb-12">
        <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
          <span className="w-2.5 h-6 bg-primary rounded-full" />
          <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
            Üretim Detayları &amp; Teknik Özellikleri
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <Cpu size={20} />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Üretim Süreci</h4>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              {spec.process}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <Printer size={20} />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Kullanılan Makineler</h4>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              {spec.machines}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <Layers size={20} />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Kullanılan Kağıt</h4>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              {spec.paper}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <Settings size={20} />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Baskı Sonrası İşlemler</h4>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              {spec.postPress}
            </p>
          </div>
        </div>
      </div>

      {/* Teslimat ve Onboarding Süreci Bilgilendirme Kutusu */}
      <div className="bg-slate-50 rounded-[32px] p-8 md:p-12 shadow-md border border-slate-100 mb-12">
        <div className="max-w-4xl mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
            GÜVENLİ SİPARİŞ &amp; TESLİMAT SÜRECİ
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
            Tasarım Onayı, Üretim ve Kargo Süreçleri
          </h3>
          <p className="text-slate-600 font-semibold text-xs md:text-sm mt-2">
            Siparişinizin her adımı Topkapı üretim tesisimizde titizlikle takip edilir. Hata riskini en aza indirmek ve yüksek kalite standardı sunmak için uyguladığımız standart iş akışımız:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          {[
            {
              title: "Tasarım Onayı",
              desc: "Gönderdiğiniz grafik dosyaları teknik kontrolümüzden geçer. Hataları önlemek için hazırladığımız PDF prova onayınızı almadan üretime başlamayız.",
              badge: "Aynı Gün Prova"
            },
            {
              title: "Üretim Süresi",
              desc: "Baskı onayı ve ödeme teyidinin ardından siparişiniz üretim parkuruna alınır. Standart ürünlerimizin üretim süresi ortalama 2-3 iş günüdür.",
              badge: "Seri Üretim"
            },
            {
              title: "Kargo Süresi",
              desc: "Paketler kalın çift oluklu karton korumalarla hazırlanır. Türkiye geneli 81 ile anlaşmalı kargo ağımızla gönderilir. Kargo süresi 1-2 iş günüdür.",
              badge: "81 İl Sevk"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-end mb-4">
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  {item.title}
                </h4>
                <p className="text-slate-600 font-semibold text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Ortak SSS Soruları */}
        {categoryKey !== 'karton_canta' && (
          <div className="border-t border-slate-200/60 pt-8">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
              Sıkça Sorulan Sipariş ve Onay Soruları
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                <h5 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  Tasarım onayı ne kadar sürer?
                </h5>
                <p className="text-[11px] md:text-xs text-slate-600 font-semibold leading-relaxed">
                  Logonuzu ve hazır çalışmanızı iletmenizin ardından, grafik ekibimiz en geç 1-2 saat içinde teknik kontrolü tamamlar. Baskı hatalarını en aza indirmek ve yüksek kalite standardı sunmak amacıyla size dijital PDF prova sunar. "Aynı Gün PDF Prova Onayı" sistemimiz sayesinde iş akışınız aksamaz.
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                <h5 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  Baskı süreci ne zaman başlar?
                </h5>
                <p className="text-[11px] md:text-xs text-slate-600 font-semibold leading-relaxed">
                  Siparişinizin fiziksel üretimi, hazırlanan PDF prova mizanpajına WhatsApp veya e-posta üzerinden yazılı "BASKI ONAYI" vermeniz ve ödeme teyidinin alınmasıyla birlikte 24 saat içinde otomatik olarak başlar.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Standart Markdown İçeriği */}
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -ml-32 -mb-32 blur-3xl" />
        
        <div className={`relative prose prose-slate max-w-none text-black
          prose-headings:text-black
          prose-h2:text-3xl prose-h2:font-black prose-h2:text-black prose-h2:mb-6 prose-h2:uppercase prose-h2:tracking-tight
          prose-h3:text-2xl prose-h3:font-bold prose-h3:text-black prose-h3:mb-4
          prose-p:text-black prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
          prose-li:text-black prose-li:text-lg
          prose-strong:text-black prose-strong:font-black
          prose-em:text-black
        `}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        
        {!hideTrustFooter && categoryKey !== 'arac_kiralama' && categoryKey !== 'amerikan_servis' && categoryKey !== 'antetli_kagit' && categoryKey !== 'bloknot' && (
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-black">Yıllara Dayanan Tecrübe</h4>
                <p className="text-sm font-medium text-black">Güvenilir ve Kaliteli Baskı</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-black">81 İle Kargo</h4>
                <p className="text-sm font-medium text-black">Hızlı ve Güvenli Teslimat</p>
              </div>
            </div>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-secondary transition-all shadow-xl shadow-primary/20 flex items-center gap-3"
            >
              <img src="/WhatsApp.svg" alt="WhatsApp" width={24} height={24} className="w-6 h-6" />
              HEMEN TEKLİF AL
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
