import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ShoppingCart, Zap } from 'lucide-react';
import { useCart, FireWarning, AgencyDiscountCTA, ProductSEOSection } from '../App';
import { LOCAL_ASSETS } from '../constants/assets';

export const ZARF_DATA = [
  {
    cat: "Zarf",
    subTitle: "110 gr. 1.Hamur",
    items: [
      { code: "Z1", price: "2.100 ₺", ebat: "10.5x24 cm.", desc: "110 gr. Diplomat Tek Renk", miktar: "1.000 Adet", extra: "Her 1000 Adet için", extraPrice: "1.550 ₺", note: "Z1 için İlave Renk 400 ₺, 1000 Tiraj 100 ₺", image: LOCAL_ASSETS.zarf },
      { code: "Z2", price: "2.600 ₺", ebat: "10.5x24 cm.", desc: "110 gr. Diplomat Renkli", miktar: "1.000 Adet", extra: "Her 1000 Adet için", extraPrice: "1.700 ₺", image: LOCAL_ASSETS.zarf },
      { code: "Z3", price: "3.500 ₺", ebat: "24x32 cm.", desc: "110 gr. Torba Zarf Renkli", miktar: "500 Adet", extra: "Her 500 Adet için", extraPrice: "2.200 ₺", image: LOCAL_ASSETS.zarf },
    ],
    note: "Lütfen Dikkat : Siparişlerinizin Renk, Adet ve Ölçülerinde %1 ila %5 Arasında Fire Olabilmektedir."
  }
];

const ZarfPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Zarf");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Zarf Baskı | Mavi Basım Matbaa &amp; Reklam</title>
        <meta name="description" content="Kurumsal zarf baskı hizmetleri. Diplomat zarf, torba zarf ve pencereli zarf seçenekleri. 110 gr 1. hamur kağıt ile kaliteli zarf çözümleri." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Zarf</h1>
            <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
            <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">110 gr. 1.Hamur</p>
          </div>
        </div>

        <div className="border border-gray-300 rounded-xl overflow-hidden shadow-xl">
          <div className="bg-secondary text-white p-3 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-xl font-bold uppercase tracking-tight">Zarf</h2>
            <div className="text-right text-[10px] md:text-xs font-medium">
              <p>110 gr. 1.Hamur</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans">
              <thead>
                <tr className="bg-black text-white font-black uppercase tracking-tight">
                  <th className="p-2 border border-gray-300">KOD</th>
                  <th className="p-2 border border-gray-300">FİYAT</th>
                  <th className="p-2 border border-gray-300">EBAT</th>
                  <th className="p-2 border border-gray-300">ÖZELLİKLER</th>
                  <th className="p-2 border border-gray-300">EKSTRA</th>
                  <th className="p-2 border border-gray-300">EKSTRA FİYAT</th>
                  <th className="p-2 border border-gray-300 w-16">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {ZARF_DATA[0].items.map((item, idx) => (
                  <tr key={idx} className="bg-white hover:bg-primary/5 transition-colors">
                    <td className="p-2 border border-gray-300 text-center font-bold text-primary">{item.code}</td>
                    <td className="p-2 border border-gray-300 text-center font-black text-black text-sm md:text-lg">{item.price}</td>
                    <td className="p-2 border border-gray-300 text-center font-medium text-black">{item.ebat}</td>
                    <td className="p-2 border border-gray-300 text-center text-black font-medium">
                      {item.desc}
                      {item.note && <div className="text-[10px] text-red-600 font-bold mt-1">{item.note}</div>}
                    </td>
                    <td className="p-2 border border-gray-300 text-center font-bold leading-tight">
                      <span className="text-black">{item.extra.split(' ')[0]} </span>
                      <span className="text-primary">{item.extra.split(' ')[1]} </span>
                      <br />
                      <span className="text-primary">{item.extra.split(' ')[2]} </span>
                      <span className="text-black">{item.extra.split(' ')[3]}</span>
                    </td>
                    <td className="p-2 border border-gray-300 text-center font-black text-black text-sm md:text-lg">{item.extraPrice}</td>
                    <td className="p-2 border border-gray-300 text-center">
                      <button onClick={() => openWhatsApp(item)} className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors">
                        <ShoppingCart size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <FireWarning />

        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* Hangi Zarfı Seçmelisiniz? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Hangi Zarfı Seçmelisiniz?</h2>
            <p className="text-gray-500 font-medium mb-6 text-lg">İhtiyacınıza en uygun zarf türünü belirleyin</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 font-black text-black uppercase tracking-tight text-sm">Zarf Türü</th>
                    <th className="p-4 font-black text-black uppercase tracking-tight text-sm">Ebat Önerisi</th>
                    <th className="p-4 font-black text-black uppercase tracking-tight text-sm">Avantajları</th>
                    <th className="p-4 font-black text-black uppercase tracking-tight text-sm">Kimler İçin İdeal?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { type: "Pencereli Zarf", size: "A5, A4, A3", benefits: "Alıcı bilgileri pencereden görünür – adres yazmaya gerek yok, hızlı gönderim", ideal: "Fatura, ekstre gönderenler" },
                    { type: "Çift Pencereli Zarf", size: "A4, A3", benefits: "Hem gönderici hem alıcı görünür - profesyonel ve hatasız gönderim", ideal: "Kurumsal ve yüksek hacimli gönderimler" },
                    { type: "Penceresiz Zarf", size: "A5, A4, A3", benefits: "Gizlilik sağlar - içerik görünmez, özel evraklar için güvenli", ideal: "Özel evrak, sözleşme, teklif gönderenler" },
                    { type: "Kraft Kağıttan Zarf", size: "A5, A4, A3", benefits: "Doğal, çevre dostu ve rustik görünüm", ideal: "Çevre dostu imajı ön planda tutan markalar" },
                    { type: "Amerikan Bristol Zarf", size: "A4, A3", benefits: "Premium, lüks ve parlak doku - en yüksek prestij ve kalite hissi", ideal: "Lüks ve prestij odaklı kurumsal firmalar" },
                    { type: "Özel Ebat Zarf", size: "Herhangi boyut", benefits: "Standart dışı boyutlarda üretim – tam ihtiyacınıza göre özelleştirme", ideal: "Standart dışı özel projeler" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-bold text-black">{row.type}</td>
                      <td className="p-4 text-gray-600 font-medium">{row.size}</td>
                      <td className="p-4 text-gray-600 text-sm leading-relaxed">{row.benefits}</td>
                      <td className="p-4 font-bold text-primary text-sm">{row.ideal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Zarf Baskı Tasarımı ve Farkımız */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Zarf Baskı Tasarımı ve Farkımız</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Baskı İçeriği", value: "Logo, unvan, vergi no, adres, telefon, web sitesi" },
                { label: "Kağıt Türü", value: "110 gr 1. hamur veya özel kağıt (kraft, Bristol vb.)" },
                { label: "Baskı Kalitesi", value: "1-4 renkli baskı – Heidelberg SM 52 kalitesi" },
                { label: "Özel Çeşitler", value: "Çift pencereli, kraft, Amerikan Bristol" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-primary font-black uppercase text-xs mb-2 tracking-widest">{item.label}</h3>
                  <p className="font-bold text-black leading-tight">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                <Zap size={24} />
              </div>
              <p className="text-black font-bold text-lg">
                💡 Tasarım ücretimiz 250 TL'dir. Hazır tasarım getirirseniz ücretsiz baskı yapıyoruz!
              </p>
            </div>
          </section>

          {/* Zarfta Sık Yapılan 5 Hata */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Zarfta Sık Yapılan 5 Hata</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { step: "1", title: "Bilgi Eksikliği", desc: "Logo veya adres eksikliği kurumsal kimliği zayıf kalır." },
                { step: "2", title: "Yanlış Ebat", desc: "Belge katlama sorunlarına yol açar." },
                { step: "3", title: "Düşük Kalite", desc: "Düşük kaliteli kağıt prestij kaybına neden olur." },
                { step: "4", title: "Renk Uyumsuzluğu", desc: "Baskı renk uyumsuzluğu marka tutarsızlığı yaratır." },
                { step: "5", title: "Hatalı Pencere", desc: "Pencere yerleşimi hatalıysa içerik görünürlüğü bozulur." }
              ].map((item, idx) => (
                <div key={idx} className="bg-red-50 p-6 rounded-2xl border border-red-100 relative pt-10">
                  <span className="absolute top-4 left-6 text-4xl font-black text-red-200/50">{item.step}</span>
                  <h3 className="font-black text-red-700 mb-2 relative z-10">{item.title}</h3>
                  <p className="text-sm font-medium text-red-900/70 leading-relaxed relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <AgencyDiscountCTA />
        </div>
      </div>
      <ProductSEOSection categoryKey="zarf" />
    </div>
  );
};

export default ZarfPage;
