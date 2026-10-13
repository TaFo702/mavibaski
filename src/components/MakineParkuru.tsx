import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Cpu, 
  Printer, 
  Settings, 
  Layers, 
  Scissors, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Zap,
  BookOpen,
  FolderOpen
} from 'lucide-react';
import { PHONE_LINK, PHONE_NUMBER, WHATSAPP_LINK } from '../constants/contact';

export const MakineParkuruPage = () => {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Mavi Basım Makine Parkuru ve Üretim Altyapısı",
    "url": "https://mavibasim.com/makine-parkuru",
    "image": "https://mavibasim.com/images/hakkimizda/tecrube-matbaa.webp",
    "description": "Mavi Basım İstanbul Topkapı ve Zeytinburnu entegre tesislerimizde yer alan Heidelberg ofset baskı makineleri, Polar giyotin, selefon, sıcak varak ve lak ünitelerinden oluşan modern makine parkurumuz.",
    "publisher": {
      "@type": "Organization",
      "name": "Mavi Basım",
      "url": "https://mavibasim.com",
      "logo": "https://mavibasim.com/mavilogo.png"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://mavibasim.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Makine Parkuru",
          "item": "https://mavibasim.com/makine-parkuru"
        }
      ]
    }
  };

  const technicalProcesses = [
    {
      title: "Ofset Baskı",
      tagline: "Yüksek Tiraj ve Kusursuz Renkler",
      desc: "Heidelberg Speedmaster CD 102 (5 Renkli + Lak Ofset) ve Heidelberg SM 52 ofset baskı ünitelerimizle, büyük adetli kurumsal işlerinizde uluslararası standartlarda renk tutarlılığı ve aracısız imalat fiyatı sağlıyoruz.",
      icon: <Printer className="text-primary" size={24} />,
      details: "Kataloglar, broşürler, cepli dosyalar, yüksek adetli kutular ve ambalajlar için en ekonomik ve kaliteli çözümdür."
    },
    {
      title: "Dijital Baskı",
      tagline: "Hızlı, Esnek ve Az Adetli Çözümler",
      desc: "Kalıp hazırlama süresi gerektirmeyen, doğrudan bilgisayar kontrollü modern HP Indigo ve dijital baskı makinelerimizle kişiselleştirilmiş veya düşük tirajlı acil siparişlerinizi dakikalar içinde üretiyoruz.",
      icon: <Zap className="text-primary" size={24} />,
      details: "Butik menüler, acil kartvizitler, az adetli etiketler ve hızlı prova örnekleri için mükemmeldir."
    },
    {
      title: "Kesim",
      tagline: "Polar Giyotin ve Milimetrik Hassasiyet",
      desc: "Bilgisayar programlı yüksek hassasiyetli Polar giyotin kesim ünitelerimiz ve Heidelberg kazanlı özel bıçak kesim makinelerimizle, ürünleri sıfır hata ve milimetrik doğrulukla ebatlandırıyoruz.",
      icon: <Scissors className="text-primary" size={24} />,
      details: "Kartvizitlerden lüks kutu katlama kulakçıklarına kadar tüm kenarlar pürüzsüz ve simetrik kesilir."
    },
    {
      title: "Selefon",
      tagline: "Yırtılmaya ve Suya Karşı Dayanıklılık",
      desc: "Ürünlerin yüzeyini korumak, yırtılmasını ve nemden etkilenmesini önlemek için uyguladığımız ultra ince mat selefon ve parlak selefon kaplama sistemlerimizle basılı evraklarınıza lüks bir doku katıyoruz.",
      icon: <Layers className="text-primary" size={24} />,
      details: "Genellikle 170gr ve üzeri kalın kuşe ile Amerikan Bristol karton çantalar ve kurumsal dosyalar için uygulanır."
    },
    {
      title: "Kırım",
      tagline: "Hızlı ve Kusursuz Katlama Çözümleri",
      desc: "Çok kırımlı akordeon broşürler, cepli dosyalar ve kitapçıklar için otomatik kırım makinelerimiz, kağıt liflerine zarar vermeden, çatlama ve yırtılma yapmadan hassas katlama işlemi gerçekleştirir.",
      icon: <FileText className="text-primary" size={24} />,
      details: "A4 katlamalı broşürler, harita kırımları ve el ilanları milimetrik katlama çizgileriyle şekillenir."
    },
    {
      title: "Harman",
      tagline: "Hızlı Sayfa Sıralama ve Tasnif",
      desc: "Çok nüshalı otokopili makbuzlarda, adisyon koçanlarında, fatura ve sipariş fişlerinde asıl ve suret nüshaların doğru sırayla bir araya getirilmesini sağlayan otomatik harmanlama ünitelerimiz kesintisiz çalışır.",
      icon: <Layers className="text-primary" size={24} />,
      details: "Manuel sıralama hatalarını tamamen eleyen elektronik sensörlü harmanlama teknolojisi."
    },
    {
      title: "Ciltleme",
      tagline: "Katalog ve Makbuzlarda Kalıcı Birleştirme",
      desc: "Ürünlerinizin kullanım amacına göre iplik dikiş, tel dikiş, spiral ciltleme ve sıcak tutkallı Amerikan cilt tekniklerini uyguluyor; yaprak dökülmesini engelleyen yüksek dayanıklılık sunuyoruz.",
      icon: <BookOpen className="text-primary" size={24} />,
      details: "Çok sayfalı lüks kataloglarda, şirket raporlarında ve otokopili resmi evraklarda sağlam cilt."
    },
    {
      title: "Sıvama",
      tagline: "Sert Mukavva ve Lüks Kutu Mukavemeti",
      desc: "Lüks hediye kutuları, sert kapaklı kataloglar ve klasörler için kuşe kağıdı veya özel dokulu fantezi kağıtları sert gri mukavvaya pürüzsüz ve hava kabarcığı kalmayacak şekilde sıvama makinelerimizde yapıştırıyoruz.",
      icon: <Settings className="text-primary" size={24} />,
      details: "Premium kutu imalatı ve lüks ambalajların mukavemetini artıran ana sonlandırma işlemidir."
    },
    {
      title: "Lak",
      tagline: "Kısmi Parlaklık ve 3D Dokusal Efekt",
      desc: "Tasarımınızda logonuzun veya belirli bir görselin üzerine uyguladığımız lokal (kısmi) lak ve kabartma lak (3D UV lak) teknikleriyle basılı materyallerinize derinlik ve yüksek ışık yansıtma gücü kazandırıyoruz.",
      icon: <Sparkles className="text-primary" size={24} />,
      details: "Özellikle mat selefon kaplı kartvizit ve katalog kapaklarında harika bir zıtlık oluşturur."
    },
    {
      title: "Varak",
      tagline: "Sıcak Altın ve Gümüş Yaldız Prestiji",
      desc: "Pirinç veya magnezyum kalıplarla (klişelerle) yüksek ısı ve basınç altında uyguladığımız altın varak, gümüş varak ve hologram yaldız baskılarla ürünlerinize seçkin bir lüks algısı katıyoruz.",
      icon: <Sparkles className="text-primary" size={24} />,
      details: "Lüks çikolata kutuları, kozmetik kutusu imalatı ve kurumsal premium kartvizitlerde vazgeçilmezdir."
    }
  ];

  const internalProducts = [
    { name: "Kartvizit Baskı", path: "/kartvizit", desc: "Kabartma laklı, mat selefonlu lüks kartvizitler" },
    { name: "Broşür Baskı", path: "/brosur", desc: "Katlamalı kuşe el ilanları ve bütçe dostu tanıtımlar" },
    { name: "Katalog Baskı", path: "/kataloglar", desc: "Amerikan ciltli, iplik dikişli prestijli ürün katalogları" },
    { name: "Kutu & Ambalaj imalatı", path: "/kutu", desc: "Bristol, kroma, kraft gıda ve kozmetik kutuları" },
    { name: "Etiket Çözümleri", path: "/etiket", desc: "Ruloopak, şeffaf, kuşe ve barkod yapışkanlı etiketler" },
    { name: "Karton Çanta", path: "/karton-canta", desc: "İp saplı, lüks selefonlu kurumsal karton çantalar" }
  ];

  return (
    <>
      <Helmet>
        <title>Makine Parkurumuz ve Teknik Üretim Altyapımız | Mavi Basım Matbaa</title>
        <meta name="description" content="Mavi Basım İstanbul Topkapı ve Zeytinburnu entegre tesislerimizde yer alan Heidelberg ofset baskı, dijital baskı, Polar giyotin, selefon, kırım, sıvama, lak ve varak yaldız ünitelerinden oluşan teknik üretim parkurumuz." />
        <meta name="keywords" content="makine parkuru, ofset baskı, dijital baskı, giyotin kesim, selefon, kırım, harmanlama, ciltleme, sıvama, lokal lak, varak yaldız, matbaa fabrikası, topkapı matbaacılar sitesi" />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      {/* Hero Header */}
      <section className="relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.15),transparent)] pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4">
              <Cpu size={14} /> ENTEGRE ÜRETİM TESİSİMİZ
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 leading-tight">
              Mavi Basım <span className="text-primary">Makine Parkurumuz</span> ve Teknik Üretim Altyapımız
            </h1>
            <p className="text-slate-300 font-medium text-sm md:text-base leading-relaxed max-w-3xl">
              İstanbul Zeytinburnu Topkapı 2. Matbaacılar Sitesi'ndeki entegre fabrikamızda, <strong className="text-white">Ofset Baskı</strong> ve <strong className="text-white">Dijital Baskı</strong> güçlerini tek çatı altında birleştiriyoruz. Kaliteli kağıdı, profesyonel boyayı ve milimetrik kesim teknolojisini deneyimli ustalıkla harmanlayarak Türkiye'nin 81 ilindeki kurumsal firmalara doğrudan üretici fiyat avantajıyla hizmet veriyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* 10 Teknik Süreç Grid */}
      <section className="bg-white py-12 md:py-20 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-4">
              Baskıdan Sonlandırmaya <span className="text-primary">Tüm Teknik Süreçlerimiz</span>
            </h2>
            <p className="text-slate-600 font-semibold text-sm md:text-base leading-relaxed">
              Mavi Basım bünyesinde, siparişlerinizin her aşaması bilgisayar kontrollü üretim ünitelerimizde el değmeden işlenir. İşte kalitemizin sırrı olan 10 temel üretim ve sonlandırma (mücellit) sürecimiz:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {technicalProcesses.map((process, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-3xl hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1.5 bg-primary h-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {process.icon}
                </div>
                <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight mb-1">
                  {process.title}
                </h3>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-black uppercase tracking-wider inline-block mb-3">
                  {process.tagline}
                </span>
                <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed mb-4">
                  {process.desc}
                </p>
                <p className="text-slate-500 font-bold text-[11px] md:text-xs border-t border-slate-200/60 pt-3 flex items-center gap-1.5">
                  <span className="text-primary">⚙</span> {process.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Üretim Kapasitesi Section */}
      <section className="bg-slate-50 py-12 md:py-20 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
                📊 GÜÇLÜ KAPASİTE
              </span>
              <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-6">
                Yüksek Tirajlı <span className="text-primary">Endüstriyel Üretim</span> ve Hızlı Teslimat Gücü
              </h2>
              <p className="text-slate-600 font-semibold text-sm md:text-base leading-relaxed mb-6">
                Fabrikamız, günlük binlerce tabaka baskı kapasitesiyle <strong className="text-slate-900">seri üretim</strong> standartlarında çalışmaktadır. Lojistik ve üretim planlama yazılımlarımız sayesinde, siparişlerinizde iş sırası ve kargo terminleri otomatik hesaplanır. 
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "Yüksek Adetli Üretim", desc: "Heidelberg 5 renkli ofset teknolojimiz sayesinde milyonlarca adet broşür veya kutu baskısını çok kısa sürede, sıfır renk sapmasıyla tamamlıyoruz." },
                  { title: "Seri Üretim Esnekliği", desc: "Gelişmiş mücellit (baskı sonrası) parkurumuz sayesinde kırım, selefon ve ciltleme işlemleri kesintisiz seri hatlarda yürütülür." },
                  { title: "Hassas Kesim ve Ebatlama", desc: "Giyotin kesim makinelerimizde her tabaka, optik sensörler yardımıyla milimetrik paylarla kesilerek kayma hatalarını tamamen ortadan kaldırır." },
                  { title: "Kurumsal Üretim Altyapısı", desc: "Tüm kurumsal evrak, katalog ve ambalaj malzemeleriniz arşivlenerek, tekrar siparişlerinizde aynı renk ve kalite standartlarında basılır." }
                ].map((cap, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black shrink-0 text-xs">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight">{cap.title}</h4>
                      <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed mt-0.5">{cap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-6 md:p-10 rounded-[2.5rem] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-12 translate-x-12" />
              <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
                Aktif Makine Parkuru Detay Listemiz
              </h3>
              <p className="text-xs text-slate-500 font-bold mb-6">Topkapı üretim tesisimizde çalışan gerçek makinelerimiz ve teknik detayları:</p>
              
              <div className="space-y-6">
                {[
                  {
                    name: "Heidelberg Speedmaster CD 102",
                    type: "5 Renkli + Lak Ofset Baskı Makinesi",
                    usage: "Yüksek tirajlı kataloglar, broşürler, cepli dosyalar, gıda & ambalaj kutuları, karton çantalar",
                    specs: "Saatlik 15.000 tabaka hızı, 72x102 cm tabaka ebadı, dahili spektrofotometre renk kontrolü, inline koruyucu lak ünitesi",
                    advantages: "Mükemmel renk tutarlılığı, hızlı kalıp pozlandırma, aracısız yüksek tiraj maliyet avantajı"
                  },
                  {
                    name: "Heidelberg Speedmaster SM 52",
                    type: "Çok Renkli Ofset Baskı Makinesi",
                    usage: "Kurumsal antetli kağıtlar, diplomat zarflar, kartvizitler, reçete ve küçük boyat matbu evraklar",
                    specs: "37x52 cm hassas tabaka ebadı, bilgisayar kontrollü mürekkep hazneleri, hassas registro hizalaması",
                    advantages: "Orta ve küçük ebatlı ürünlerde yüksek renk tutarlılığı, ekonomik kalıp maliyeti ve hızlı baskı hazırlık süresi"
                  },
                  {
                    name: "Polar Yüksek Programlı Bilgisayarlı Giyotin",
                    type: "Hassas Kesim Makinesi",
                    usage: "Tabaka halindeki basılı kağıt ve kartonların milimetrik hassasiyetle ebatlandırılması",
                    specs: "Optik okuyucu sensörler, dijital hafızalı programlama, hidrolik baskı ve bıçak sistemi",
                    advantages: "Maksimum hassasiyetle pürüzsüz kesim, temiz kenarlar, gönyeden sapmayan milimetrik doğruluk"
                  },
                  {
                    name: "Tam Otomatik Termal Selefon Kaplama Hattı",
                    type: "Yüzey Koruma & Lüks Kaplama Ünitesi",
                    usage: "Kartvizit, broşür kapağı, katalog kapağı, kutu ve karton çantaların yüzey koruması",
                    specs: "Sıcak/Soğuk termal selefon kaplama, mat ve parlak selefon, yüksek yapışma mukavemeti",
                    advantages: "Suya, neme ve yırtılmaya karşı üstün dayanıklılık, kadifemsi lüks doku"
                  },
                  {
                    name: "Otomatik Vakumlu Kırım & Akordeon Katlama",
                    type: "Katlama & Pilyaj Ünitesi",
                    usage: "A4 kırım broşürler, akordeon katlamalı haritalar, el ilanları ve cepli dosya katlamaları",
                    specs: "Çok gözlü vakumlu besleme, otomatik kağıt yönlendirme, lif çatlamasını önleyici pilyaj",
                    advantages: "Yüksek hızda katlama, kağıt yüzeyinde veya selofonda çatlama yapmayan pürüzsüz kırım"
                  },
                  {
                    name: "Sensörlü Otomatik Harmanlama Ünitesi",
                    type: "Nüsha Sayfalama & Tasnif Makinesi",
                    usage: "Otokopili makbuzlar, fatura koçanları, tahsilat makbuzları, sipariş fişleri",
                    specs: "Elektronik çift kağıt ve eksik sayfa sensörleri, otomatik harmanlama ve sayfalama",
                    advantages: "Nüsha karışıklığını ve insan hatasını %100 engelleyen kesintisiz sıralama"
                  },
                  {
                    name: "Müller Martini Tel Dikiş & Amerikan Cilt",
                    type: "Otomatik Ciltleme Kombinesi",
                    usage: "Çok sayfalı dergiler, kurumsal kataloglar, faaliyet raporları, şirket defterleri",
                    specs: "Sıcak PUR tutkallı ciltleme, otomatik tel dikiş ve üç bıçaklı otomatik kenar tıraşlama",
                    advantages: "Yaprak dökülmesini tamamen önleyen yüksek cilt mukavemeti, estetik ve sağlam görünüm"
                  },
                  {
                    name: "Sıcak Varak Yaldız Presleme & UV Lak Üniteleri",
                    type: "Lüks Sonlandırma Ünitesi",
                    usage: "Lüks kartvizitler, çikolata kutuları, kozmetik kutuları, özel davetiyeler ve prestij kapaklar",
                    specs: "Yüksek ısı ve basınçlı magnezyum klişe presleme, lokal 3D kabartma UV lak fırınları",
                    advantages: "Altın/gümüş ışıltılı varak yaldız ve dokunsal kabartma lak ile markanıza üst düzey lüks ve prestij katma"
                  }
                ].map((machine, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-sm font-black text-slate-900 uppercase">{machine.name}</h4>
                      <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase w-fit">
                        {machine.type}
                      </span>
                    </div>
                    <div className="text-xs text-slate-700 space-y-1">
                      <div><strong className="text-slate-900">• Kullanım Alanı:</strong> {machine.usage}</div>
                      <div><strong className="text-slate-900">• Teknik Özellikleri:</strong> {machine.specs}</div>
                      <div><strong className="text-primary">• Baskı / Üretim Avantajı:</strong> {machine.advantages}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Linking / Ürün Sayfalarımıza Bağlantılar */}
      <section className="bg-white py-12 md:py-20 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
              🔗 HIZLI SİPARİŞ
            </span>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-4">
              Üretim Parkurumuzdan <span className="text-primary">Doğrudan Ürün Siparişi</span>
            </h2>
            <p className="text-slate-600 font-semibold text-sm md:text-base leading-relaxed">
              Teknik altyapımızda doğrudan imal ettiğimiz popüler ürün kategorilerini inceleyebilir ve logonuzu yükleyerek hemen aracısız fabrika fiyatlarıyla sipariş verebilirsiniz:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {internalProducts.map((p, idx) => (
              <Link 
                key={idx} 
                to={p.path} 
                className="bg-slate-50 border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex items-center justify-between group"
              >
                <div>
                  <h3 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-tight group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed mt-0.5">
                    {p.desc}
                  </p>
                </div>
                <div className="w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary/20 transition-colors shrink-0 ml-3">
                  <ChevronRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SSS Section */}
      <section className="bg-slate-50 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
              ❓ SIKÇA SORULAN SORULAR
            </span>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-4">
              Teknik Altyapı ve <span className="text-primary">Baskı Hakkında</span> Sorular
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Mavi Basım bir aracı ajans mıdır yoksa üretici mi?",
                a: "Mavi Basım, İstanbul Topkapı 2. Matbaacılar Sitesi'ndeki üretim tesisinde doğrudan üretim gerçekleştiren imalatçı bir matbaa firmasıdır. Aracılar ve komisyoncular olmadığı için fiyatlarımız piyasaya göre son derece ekonomiktir."
              },
              {
                q: "Tasarımımın baskıda hata payı kontrol ediliyor mu?",
                a: "Evet. Gönderdiğiniz tüm grafik tasarımları, teknik ekibimiz tarafından kesim payı (taşma payı), renk formatı (CMYK doğruluğu) ve mizanpaj kuralları açısından ücretsiz kontrol edilip tarafınıza dijital PDF onay provası olarak sunulmaktadır."
              },
              {
                q: "Pantone özel renk baskısı yapabiliyor musunuz?",
                a: "Evet, kurumsal kimlik standartlarında marka renk tutarlılığı gerektiren yüksek tirajlı ofset işlerinizde orijinal Pantone kataloğu mürekkepleriyle birebir renk garantili üretim yapmaktayız."
              },
              {
                q: "Baskı sonrası özel işçilikler ürün maliyetini nasıl etkiler?",
                a: "Mat/parlak selefon, kırım gibi işlemler yüksek adetli üretimlerde standarttır ve maliyeti çok az etkiler. Ancak sıcak altın varak, gofre veya lokal lak gibi işlemler için magnezyum klişe (özel kalıp) hazırlanması gerektiğinden kurulum maliyetleri adet yükseldikçe daha ekonomik hale gelmektedir."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
                <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight mb-2 flex items-center gap-2">
                  <span className="text-primary">Q.</span> {faq.q}
                </h3>
                <p className="text-[11px] md:text-xs text-slate-600 font-semibold leading-relaxed pl-6 border-l-2 border-slate-100">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="bg-slate-900 text-white rounded-[2rem] p-6 md:p-10 mt-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.1),transparent)] pointer-events-none" />
            <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-3">
              Teknik Detayları Whatsapp Üzerinden Konuşalım
            </h3>
            <p className="text-slate-300 font-semibold text-xs md:text-sm max-w-2xl mx-auto mb-6">
              Baskı gramajları, bıçak şablonları veya makine parkuru teknik detayları hakkında aklınıza takılan soruları doğrudan grafik ve teknik departmanımıza sorabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all"
              >
                💬 WhatsApp Teknik Destek
              </a>
              <a 
                href={PHONE_LINK}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all border border-white/20"
              >
                📞 {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
