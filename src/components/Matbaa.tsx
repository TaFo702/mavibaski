import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Truck, ShieldCheck, Settings, ShoppingCart, Zap, FileText } from 'lucide-react';
import { 
  useCart, 
  AFIS_DATA, 
  AMERIKAN_SERVIS_DATA, 
  KARTVIZIT_DATA 
} from '../App';
import { KARTON_CANTA_DATA } from './KartonCanta';
import { BLOKNOTLAR_DATA } from './Bloknotlar';
import { KATALOG_DATA } from './Katalog';
import { KITAP_AYRACI_DATA, YAG_KARTI_DATA } from './ReklamUrunleri';
import { KUSE_115_DATA } from './Brosur';
import { WHATSAPP_LINK } from '../constants/contact';

export const MatbaaPage = () => {
  const { openProductDetail } = useCart();
  const [currentBanner, setCurrentBanner] = React.useState(0);

  const banners = [
    {
      title: "Kurumsal Matbaa Çözümleri",
      subtitle: "Türkiye’nin Güvenilir Baskı Merkezi",
      image: "/b1.webp",
      blueBtn: { text: "Hemen Sipariş Ver", link: WHATSAPP_LINK },
      outlineBtn: { text: "Ürünlerimizi İnceleyin", link: "/matbaa" }
    },
    {
      title: "1.000 Adet A5 Broşür Sadece 1.300 ₺!",
      subtitle: "✅ 115gr Parlak Kuşe Kağıt\n✅ Çift Yön Renkli Baskı\n✅ Ücretsiz Tasarım Desteği\n✅ Matbaadan Direkt Halkın Hizmetinde!",
      image: "/b2.webp",
      blueBtn: { text: "Hemen Sipariş Ver", link: "/brosur" },
      outlineBtn: { text: "Ürünlerimizi İnceleyin", link: "/brosur" }
    },
    {
      title: "1.000 Adet Oval Kesim Magnet 960 ₺!",
      subtitle: "✅ 46x68 mm Standart Boyut\n✅ Parlak Selefonlu & Dayanıklı\n✅ En Uygun Fiyat Garantisi\n✅ Hızlı Üretim ve Kargo",
      image: "/b3.webp",
      blueBtn: { text: "Hemen Sipariş Ver", link: "/magnet" },
      outlineBtn: { text: "Ürünlerimizi İnceleyin", link: "/magnet" }
    },
    {
      title: "5 Cilt Para Makbuzu Sadece 1.450 ₺!",
      subtitle: "✅ 14x20 cm Yarım Boy\n✅ Otocopy Kağıda 1 Renk Baskı\n✅ Numaralı ve Ciltli Üretim\n✅ Kurumsal Kimliğinize Özel Tasarım",
      image: "/b4.webp",
      blueBtn: { text: "Hemen Sipariş Ver", link: WHATSAPP_LINK },
      outlineBtn: { text: "Ürünlerimizi İnceleyin", link: "/makbuz-ve-formlar" }
    },
    {
      title: "Markanıza Özel Kutu ve Ambalaj Çözümleri",
      subtitle: "✅ Dürüm, Hamburger, Pasta ve Baklava Kutuları\n✅ 350 gr Bristol + Mat Selefon Kalitesi\n✅ Adetli Üretimlerde Dev İndirimler\n✅ Hemen Teklif Alın!",
      image: "/b5.webp",
      blueBtn: { text: "Hemen Sipariş Ver", link: "/kutu" },
      outlineBtn: { text: "Ürünlerimizi İnceleyin", link: "/kutu" }
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const popularProducts = [
    {
      title: "Afiş / Poster Baskı",
      category: "Afiş",
      path: "/afis",
      items: [
        { qty: "250 Adet", price: AFIS_DATA[0].items[0].price, desc: AFIS_DATA[0].items[0].desc, item: AFIS_DATA[0].items[0] },
        { qty: "500 Adet", price: AFIS_DATA[0].items[1].price, desc: AFIS_DATA[0].items[1].desc, item: AFIS_DATA[0].items[1] },
        { qty: "1.000 Adet", price: AFIS_DATA[0].items[2].price, desc: AFIS_DATA[0].items[2].desc, item: AFIS_DATA[0].items[2] },
      ]
    },
    {
      title: "Amerikan Servis Baskı",
      category: "Amerikan Servis",
      path: "/amerikan-servis",
      items: [
        { qty: "2.000 Adet", price: AMERIKAN_SERVIS_DATA[0].items[0].price, desc: AMERIKAN_SERVIS_DATA[0].items[0].desc, item: AMERIKAN_SERVIS_DATA[0].items[0] },
        { qty: "2.000 Adet", price: AMERIKAN_SERVIS_DATA[0].items[1].price, desc: AMERIKAN_SERVIS_DATA[0].items[1].desc, item: AMERIKAN_SERVIS_DATA[0].items[1] },
        { qty: "2.000 Adet", price: AMERIKAN_SERVIS_DATA[0].items[2].price, desc: AMERIKAN_SERVIS_DATA[0].items[2].desc, item: AMERIKAN_SERVIS_DATA[0].items[2] },
      ]
    },
    {
      title: "Bloknot Baskı",
      category: "Bloknot",
      path: "/bloknotlar",
      items: [
        { qty: "500 Adet", price: BLOKNOTLAR_DATA.kapaksiz[0].items[0].p500, desc: BLOKNOTLAR_DATA.kapaksiz[0].items[0].ic, item: { ...BLOKNOTLAR_DATA.kapaksiz[0].items[0], miktar: "500 Adet", price: BLOKNOTLAR_DATA.kapaksiz[0].items[0].p500 } },
        { qty: "1.000 Adet", price: BLOKNOTLAR_DATA.kapaksiz[0].items[0].p1000, desc: BLOKNOTLAR_DATA.kapaksiz[0].items[0].ic, item: { ...BLOKNOTLAR_DATA.kapaksiz[0].items[0], miktar: "1.000 Adet", price: BLOKNOTLAR_DATA.kapaksiz[0].items[0].p1000 } },
      ]
    },
    {
      title: "Broşür Baskı",
      category: "Broşür",
      path: "/brosur",
      items: [
        { qty: "1.000 Adet", price: KUSE_115_DATA[0].items[4].price, desc: KUSE_115_DATA[0].items[4].desc, item: KUSE_115_DATA[0].items[4] },
        { qty: "2.000 Adet", price: KUSE_115_DATA[0].items[5].price, desc: KUSE_115_DATA[0].items[5].desc, item: KUSE_115_DATA[0].items[5] },
        { qty: "5.000 Adet", price: KUSE_115_DATA[0].items[6].price, desc: KUSE_115_DATA[0].items[6].desc, item: KUSE_115_DATA[0].items[6] },
      ]
    },
    {
      title: "Karton Çanta Baskı",
      category: "Karton Çanta",
      path: "/karton-canta",
      items: [
        { qty: "500 Adet", price: KARTON_CANTA_DATA[0].items[0].price, desc: KARTON_CANTA_DATA[0].items[0].desc, item: KARTON_CANTA_DATA[0].items[0] },
        { qty: "1.000 Adet", price: KARTON_CANTA_DATA[0].items[2].price, desc: KARTON_CANTA_DATA[0].items[2].desc, item: KARTON_CANTA_DATA[0].items[2] },
      ]
    },
    {
      title: "Katalog Baskı",
      category: "Katalog",
      path: "/katalog",
      items: [
        { qty: "50 Adet", price: KATALOG_DATA.rows[0].p50, desc: KATALOG_DATA.rows[0].label, item: { ...KATALOG_DATA.rows[0], miktar: "50 Adet", price: KATALOG_DATA.rows[0].p50, name: KATALOG_DATA.rows[0].label, desc: KATALOG_DATA.rows[0].label, code: 'KAT' } },
        { qty: "100 Adet", price: KATALOG_DATA.rows[0].p100, desc: KATALOG_DATA.rows[0].label, item: { ...KATALOG_DATA.rows[0], miktar: "100 Adet", price: KATALOG_DATA.rows[0].p100, name: KATALOG_DATA.rows[0].label, desc: KATALOG_DATA.rows[0].label, code: 'KAT' } },
      ]
    },
    {
      title: "Kartvizit Baskı",
      category: "Kartvizit",
      path: "/kartvizit",
      items: [
        { qty: "1.000 Adet", price: KARTVIZIT_DATA[0].items[0].price, desc: KARTVIZIT_DATA[0].items[0].desc, item: KARTVIZIT_DATA[0].items[0] },
        { qty: "1.000 Adet", price: KARTVIZIT_DATA[0].items[3].price, desc: KARTVIZIT_DATA[0].items[3].desc, item: KARTVIZIT_DATA[0].items[3] },
        { qty: "1.000 Adet", price: KARTVIZIT_DATA[1].items[0].price, desc: KARTVIZIT_DATA[1].items[0].desc, item: KARTVIZIT_DATA[1].items[0] },
      ]
    },
    {
      title: "Kitap Ayracı Baskı",
      category: "Kitap Ayracı",
      path: "/kitap-ayraci",
      items: [
        { qty: "1.000 Adet", price: KITAP_AYRACI_DATA[0].items[0].price, desc: KITAP_AYRACI_DATA[0].items[0].desc, item: KITAP_AYRACI_DATA[0].items[0] },
      ]
    },
    {
      title: "Yağ Kartı Baskı",
      category: "Yağ Kartı",
      path: "/yag-karti",
      items: [
        { qty: "1.000 Adet", price: YAG_KARTI_DATA[0].items[0].price, desc: YAG_KARTI_DATA[0].items[0].desc, item: YAG_KARTI_DATA[0].items[0] },
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Matbaa Hizmetleri | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="İstanbul Zeytinburnu Topkapı 2. Matbaacılar Sitesi'nde profesyonel matbaa çözümleri. Ofset baskı, dijital baskı, katalog, broşür, kartvizit ve kurumsal matbaa hizmetleri." />
      </Helmet>
      {/* Hero Section Slider */}
      <section className="relative h-[300px] md:h-[400px] bg-black text-white overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img 
              src={banners[currentBanner].image} 
              alt={banners[currentBanner].title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
              <div className="max-w-4xl">
                <motion.h1 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none"
                >
                  {banners[currentBanner].title}
                </motion.h1>
                <motion.p 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl font-bold text-primary mb-6"
                >
                  {banners[currentBanner].subtitle}
                </motion.p>
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  {/* Blue Button */}
                  {banners[currentBanner].blueBtn.link.startsWith('/') ? (
                    <Link to={banners[currentBanner].blueBtn.link} className="bg-[#29abe2] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-tight hover:scale-105 transition-all text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
                      <Zap size={18} fill="currentColor" />
                      {banners[currentBanner].blueBtn.text}
                    </Link>
                  ) : (
                    <a href={banners[currentBanner].blueBtn.link} target="_blank" rel="noopener noreferrer" className="bg-[#29abe2] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-tight hover:scale-105 transition-all text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
                      <Zap size={18} fill="currentColor" />
                      {banners[currentBanner].blueBtn.text}
                    </a>
                  )}

                  {/* Outline Button */}
                  {banners[currentBanner].outlineBtn.link.startsWith('/') ? (
                    <Link to={banners[currentBanner].outlineBtn.link} className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-tight hover:bg-white/10 transition-all text-sm">
                      {banners[currentBanner].outlineBtn.text}
                    </Link>
                  ) : (
                    <a href={banners[currentBanner].outlineBtn.link} target="_blank" rel="noopener noreferrer" className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-tight hover:bg-white/10 transition-all text-sm">
                      {banners[currentBanner].outlineBtn.text}
                    </a>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBanner(idx)}
              className={`h-1 transition-all duration-300 rounded-full ${currentBanner === idx ? 'w-12 bg-primary' : 'w-4 bg-white/30'}`}
            />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <div className="bg-gray-50 border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <Truck className="text-primary" size={32} />
            <h3 className="font-black uppercase text-sm">Fabrikadan Doğrudan Teslimat</h3>
            <p className="text-xs text-gray-500 font-bold">Tüm Türkiye'ye hızlı kargo.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="text-primary" size={32} />
            <h3 className="font-black uppercase text-sm">Aracısız Topkapı Matbaa</h3>
            <p className="text-xs text-gray-500 font-bold">Üretici fiyat avantajı.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img src="/WhatsApp.svg" alt="Topkapı Mavi Basım WhatsApp Hattı" className="w-8 h-8" />
            <h3 className="font-black uppercase text-sm">Hızlı Teklif Hattı</h3>
            <p className="text-xs text-gray-500 font-bold">Dosya gönder, 15 dk'da teklif al.</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 lg:-mt-12">
            <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              Hakkımızda
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              Profesyonel Baskı Çözümleri
            </h2>
            <div className="space-y-6 text-black font-medium leading-relaxed">
              <p className="text-xl md:text-2xl font-bold">
                2004 yılında Türkiye’de ilk kez online matbaa sipariş sistemini hayata geçirdik. 
                O dönemde internet üzerinden baskı siparişi vermek hayal gibi görünürken, biz bu hayali gerçeğe dönüştürdük.
              </p>
              <p className="text-lg text-gray-600">
                Bugün ise Topkapı 2. Matbaacılar Sitesi’ndeki modern üretim merkezimiz ile hizmet veriyoruz.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-2xl font-black text-primary">20+</div>
                <div className="text-[10px] font-bold uppercase text-gray-400">Yıllık Tecrübe</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-2xl font-black text-primary">81</div>
                <div className="text-[10px] font-bold uppercase text-gray-400">İl Kargo Ağı</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-2xl font-black text-primary">15k+</div>
                <div className="text-[10px] font-bold uppercase text-gray-400">Mutlu Müşteri</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video md:aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/tecrube.webp" 
                alt="Mavi Basım Tecrübe" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary text-white p-8 rounded-3xl shadow-xl hidden md:block">
              <div className="text-4xl font-black mb-1">20+</div>
              <div className="text-sm font-bold uppercase tracking-widest opacity-80">Yıllık Tecrübe</div>
            </div>
          </div>
        </div>
      </section>

      {/* Machine Park Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Makine Parkurumuz</h2>
            <p className="text-gray-500 font-bold uppercase text-sm tracking-widest">En son teknoloji ekipmanlarımızla tüm üretim süreçlerini kendi bünyemizde yönetiyoruz.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "KOMORI S/40 70x100 cm", desc: "2008 model – 4 renk. Büyük formatlı katalog, broşür, dergi ve afiş baskıları için." },
              { title: "KOMORI 28 50x70 cm", desc: "2005 model – 4 renk. Orta format katalog, broşür, dergi ve afiş baskıları için." },
              { title: "HEIDELBERG SM 52", desc: "2002 model – 2 renk. Orta format zarf, garanti belgesi, makbuz ve diplomat zarf baskıları için." },
              { title: "HEIDELBERG Kazanlı", desc: "56x77 cm & 38x52 cm. Karton çanta, cepli dosya özel kesimler." },
              { title: "POLAR & Wohlenberg", desc: "115’lik & 72’lik Giyotin. Hassas ve yüksek hacimli kesim." },
              { title: "Ciltleme & Yapıştırma", desc: "Tam otomatik kırım, harman ve Amerikan cilt sistemleri." }
            ].map((machine, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Settings size={24} />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-4">{machine.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{machine.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Neden Bizi Tercih Etmelisiniz?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { id: "1", title: "Online Öncüsü", desc: "Türkiye'de online matbaacılığı ilk başlatan firma (2004)." },
            { id: "2", title: "81 İl Kargo", desc: "Kapınıza kadar güvenli teslimat." },
            { id: "3", title: "Kendi Fabrikamız", desc: "Aracı yok, doğrudan üretim ile fiyat avantaj." },
            { id: "4", title: "Yüksek Kalite", desc: "Güncel Komori & Heidelberg makineleri." },
            { id: "5", title: "Hızlı Onay", desc: "Tasarım onayı sonrası üretim." },
            { id: "6", title: "Ekonomik Çözümler", desc: "Rekabetçi fiyatlarla en kaliteli baskı." },
            { id: "7", title: "Ücretsiz Destek", desc: "Profesyonel grafik tasarım ekibi." },
            { id: "8", title: "Tam Kontrol", desc: "Tüm süreçler kendi bünyemizde." }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="text-4xl font-black text-primary/20 shrink-0">{item.id}</div>
              <div>
                <h3 className="font-black uppercase text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="fiyatlar" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Popüler Ürünler ve Fiyatlar</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {popularProducts.map((prod, idx) => (
              <div key={idx} className="bg-white/5 rounded-3xl p-8 border border-white/10">
                <h3 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  <Link to={prod.path} className="hover:text-primary transition-colors">
                    {prod.title}
                  </Link>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-gray-400 font-bold uppercase tracking-widest text-[10px] border-b border-white/10">
                        <th className="pb-4">Adet</th>
                        <th className="pb-4">Fiyat</th>
                        <th className="pb-4">Özellikler</th>
                        <th className="pb-4 text-right">İşlem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {prod.items.map((item, iIdx) => (
                        <tr key={iIdx} className="group">
                          <td className="py-4 font-bold">{item.qty}</td>
                          <td className="py-4 font-black text-primary">{item.price}</td>
                          <td className="py-4 text-xs text-gray-400 max-w-[200px] truncate">{item.desc}</td>
                          <td className="py-4 text-right">
                            <button 
                              onClick={() => openProductDetail(item.item, prod.category)}
                              className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-all"
                            >
                              <ShoppingCart size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <div className="bg-primary/10 rounded-3xl p-12 border border-primary/20 max-w-3xl mx-auto">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Ajanslara Özel Çözümler</h3>
              <p className="text-gray-400 font-medium mb-8">Matbaa ve reklam ajanslarına özel indirimli fiyatlarımız ve öncelikli üretim avantajlarımızdan yararlanmak için hemen iletişime geçin.</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white px-12 py-4 rounded-full font-black uppercase tracking-widest hover:bg-secondary transition-all">
                Ajans Kaydı Başlat
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
