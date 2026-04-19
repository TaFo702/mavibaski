import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ShoppingCart, Zap } from 'lucide-react';
import { useCart, FeatureTooltip, ProductSEOSection, AgencyDiscountCTA } from '../App';

export const KUP_BLOKNOT_DATA = [
  {
    cat: "250'LİK",
    items: [
      { code: "NKKB-250-100", desc: "Yapraklar; 80gr. 1.Hamur, Tek Yön, Tek Renk 78x78 mm.", miktar: "100", price: "7.450 ₺" },
      { code: "NKKB-250-250", desc: "Yapraklar; 80gr. 1.Hamur, Tek Yön, Tek Renk 78x78 mm.", miktar: "250", price: "8.700 ₺" },
      { code: "NKKB-250-500", desc: "Yapraklar; 80gr. 1.Hamur, Tek Yön, Tek Renk 78x78 mm.", miktar: "500", price: "10.700 ₺" },
      { code: "NKKB-250-1000", desc: "Yapraklar; 80gr. 1.Hamur, Tek Yön, Tek Renk 78x78 mm.", miktar: "1.000", price: "15.700 ₺" },
    ]
  },
  {
    cat: "500'LÜK",
    items: [
      { code: "NKKB-500-100", desc: "Yapraklar; 80gr. 1.Hamur, Tek Yön, Tek Renk 78x78 mm.", miktar: "100", price: "9.200 ₺" },
      { code: "NKKB-500-250", desc: "Yapraklar; 80gr. 1.Hamur, Tek Yön, Tek Renk 78x78 mm.", miktar: "250", price: "12.200 ₺" },
      { code: "NKKB-500-500", desc: "Yapraklar; 80gr. 1.Hamur, Tek Yön, Tek Renk 78x78 mm.", miktar: "500", price: "16.200 ₺" },
    ]
  }
];

export const KupBloknotPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Küp Bloknot");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Küp Bloknot Baskı | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Kurumsal küp bloknot baskı hizmetleri. 80 gr 1. hamur iç yapraklar, özel tasarım kutulu küp bloknotlar ve promosyon bloknot çözümleri." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Küp Bloknot</h1>
            <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
            <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">İç yapraklar müşteri tarafından yerleştirilecektir</p>
          </div>
        </div>

        <div className="space-y-12">
          {KUP_BLOKNOT_DATA.map((category, cIdx) => (
            <div key={cIdx}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-8 bg-primary rounded-full" />
                <h2 className="text-xl font-black text-black uppercase tracking-tight">{category.cat}</h2>
              </div>
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-visible relative z-10">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-[11px] md:text-[13px]">
                    <thead>
                      <tr className="bg-black text-white border-b border-black">
                        <th className="p-4 w-10"></th>
                        <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                        <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                        <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                        <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                        <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item, iIdx) => (
                        <tr key={iIdx} className="border-b border-gray-100 hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group">
                          {iIdx === 0 && (
                            <td 
                              rowSpan={category.items.length}
                              className="bg-primary text-white font-black text-center p-1 w-10 border-r border-white/10"
                              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                            >
                              <span className="tracking-[0.1em] uppercase text-[10px]">{category.cat}</span>
                            </td>
                          )}
                          <td className="p-3 text-center font-bold text-black border-r border-gray-100 group-hover:text-secondary transition-colors">{item.code}</td>
                          <td className="p-3 text-center text-black font-medium border-r border-gray-100">
                            {item.desc}
                            <FeatureTooltip code={item.code} />
                          </td>
                          <td className="p-3 text-center font-medium text-black border-r border-gray-100">{item.miktar}</td>
                          <td className="p-3 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[14px] md:text-[16px] transition-colors">{item.price}</td>
                          <td className="p-3 text-center">
                            <button onClick={() => openWhatsApp(item)} className="bg-primary text-white hover:bg-secondary transition-all p-2 rounded-lg shadow-sm scale-90 group-hover:scale-100">
                              <ShoppingCart size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-2 text-center">
                <p className="text-black font-bold text-[10px] md:text-xs">
                  Yukarıdaki ürünlerin kutuları Mat Selefonlu olursa 240 TL ilave olur / Mat Selefon - Kabartma Lak olursa 1500 TL ilave olur.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Content Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16">
        <section>
          <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">Küp Bloknot Baskı Çözümleri</h2>
          <div className="prose prose-slate max-w-none text-black">
            <p className="text-lg leading-relaxed mb-6">
              <strong className="font-black text-primary">Mavi Basım Matbaa & Reklam</strong> olarak bloknot ve bloknot baskı modellerinde Türkiye’nin en çok tercih edilen matbaasıyız. A5 bloknot, A4 bloknot ve A6 bloknot seçeneklerimizle ofis, eğitim, toplantı, promosyon ve hediye ihtiyaçlarınıza pratik, kaliteli ve şık çözümler sunuyoruz.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Bloknot modelleri çizgili, kareli veya numaralı iç sayfa seçenekleriyle çeşitlenir. Bloknot 50 yaprak standart kapasitesi günlük kullanım için yeterlidir. Standart bloknotlar 50 yapraklıdır; istenildiği takdirde 25 yaprak veya 100 yaprak da yapabiliriz.
            </p>
            <p className="text-lg leading-relaxed">
              Bloknot baskı, kurumsal hediye, promosyon ve günlük kullanımda en etkili araçlardan biridir. Özellikle promosyon bloknot ile marka bilinirliği artar, ucuz bloknot ile maliyet avantajı sağlanır. A5 bloknot not alma ve sunum için idealdir, A6 bloknot cepte taşınabilirlik için tercih edilir, A4 bloknot ise geniş not alanı gerektiren işlerde uygundur.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
            <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tight">Bloknot Özellikleri (2026)</h2>
            <ul className="space-y-4">
              {[
                { label: "Ebat", value: "A4, A5, A6 (Özel ebat yapılabilir)" },
                { label: "İç Sayfa", value: "80 gr 1. hamur (Çizgili, Kareli vb.)" },
                { label: "Kapak", value: "350 gr Kuşe veya Bristol" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <span className="font-black text-primary uppercase text-xs tracking-widest">{item.label}</span>
                  <span className="font-bold text-black text-sm">{item.value}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-red-50 p-8 rounded-[32px] border border-red-100">
            <h2 className="text-2xl font-black text-red-700 mb-6 uppercase tracking-tight">Bloknotta Sık Yapılan 5 Hata</h2>
            <ul className="space-y-4">
              {[
                { title: "Eksik Bilgi", desc: "Logo veya iletişim bilgileri eksik kalması." },
                { title: "Yanlış Ebat", desc: "Kullanım amacına uygun olmayan boyut seçimi." },
                { title: "Düşük Kağıt Kalitesi", desc: "Dayanıklılığın ve prestijin azalması." },
                { title: "Renk Uyumsuzluğu", desc: "Marka kimliği ile uyuşmayan baskı renkleri." },
                { title: "Yetersiz İç Tasarım", desc: "Kullanım değerini düşüren karmaşık sayfalar." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-200 text-red-700 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-1">{idx + 1}</div>
                  <div>
                    <p className="font-black text-red-700 text-sm">{item.title}</p>
                    <p className="text-red-900/60 text-xs font-medium">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section>
          <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">Bloknot Tasarımı Nasıl Yapılır?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Hedef & Konsept", desc: "Adet, logo ve iletişim detaylarını belirleyin." },
              { step: "2", title: "İçerik Planlama", desc: "Kapak ve iç sayfa (çizgili/kareli) tasarımını yapın." },
              { step: "3", title: "Teknik Hazırlık", desc: "PDF, CMYK, 300 dpi ve +3mm taşma payı." },
              { step: "4", title: "Onay & Baskı", desc: "Tasarımı gönderin, onay sonrası üretime geçelim." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl text-center group hover:border-primary transition-all">
                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto mb-6 group-hover:bg-primary transition-colors">
                  {item.step}
                </div>
                <h3 className="text-lg font-black text-black mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <div className="inline-block p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="text-black font-bold">🎨 Tasarım ücretimiz 400 TL'dir. Hazır tasarım getirirseniz ücretsiz!</p>
            </div>
          </div>
        </section>

        <AgencyDiscountCTA />
      </div>
      <ProductSEOSection categoryKey="kup_bloknot" />
    </div>
  );
};
