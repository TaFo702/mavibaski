import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart, FeatureTooltip, ProductSEOSection } from '../App';
import { LOCAL_ASSETS } from '../constants/assets';
import { WHATSAPP_LINK } from '../constants/contact';

export const BLOKNOTLAR_DATA = {
  kapakli: [
    {
      ebat: "9.4x14.3cm",
      color: "bg-black",
      items: [
        { code: "B16", kapak: "NK", ic: "80 gr. 1.Hamur Tek Renk (9.4x14.3cm)", p500: "11.600 ₺", p1000: "14.200 ₺", image: LOCAL_ASSETS.bloknot },
        { code: "B17", kapak: "CYP", ic: "80 gr. 1.Hamur Tek Renk (9.4x14.3cm)", p500: "12.300 ₺", p1000: "14.700 ₺", image: LOCAL_ASSETS.bloknot },
        { code: "B18", kapak: "CYM", ic: "80 gr. 1.Hamur Tek Renk (9.4x14.3cm)", p500: "12.400 ₺", p1000: "14.800 ₺", image: LOCAL_ASSETS.bloknot },
        { code: "B19", kapak: "CYML4", ic: "80 gr. 1.Hamur Tek Renk (9.4x14.3cm)", p500: "13.700 ₺", p1000: "16.400 ₺", image: LOCAL_ASSETS.bloknot },
      ]
    },
    {
      ebat: "14x20cm",
      color: "bg-secondary",
      items: [
        { code: "B20", kapak: "NK", ic: "80 gr. 1.Hamur Tek Renk (14x20cm)", p500: "14.400 ₺", p1000: "18.700 ₺", image: LOCAL_ASSETS.bloknot },
        { code: "B21", kapak: "CYP", ic: "80 gr. 1.Hamur Tek Renk (14x20cm)", p500: "15.200 ₺", p1000: "19.200 ₺", image: LOCAL_ASSETS.bloknot },
        { code: "B22", kapak: "CYM", ic: "80 gr. 1.Hamur Tek Renk (14x20cm)", p500: "15.300 ₺", p1000: "19.300 ₺", image: LOCAL_ASSETS.bloknot },
        { code: "B23", kapak: "CYML4", ic: "80 gr. 1.Hamur Tek Renk (14x20cm)", p500: "16.700 ₺", p1000: "20.700 ₺", image: LOCAL_ASSETS.bloknot },
      ]
    }
  ],
  kapaksiz: [
    {
      ebat: "9.4x14.3cm",
      color: "bg-black",
      items: [
        { code: "B28", ic: "80 gr. 1.Hamur Tek Renk (9.4x14.3cm)", p500: "6.200 ₺", p1000: "8.200 ₺", image: LOCAL_ASSETS.bloknot },
      ]
    },
    {
      ebat: "14x20cm",
      color: "bg-secondary",
      items: [
        { code: "B29", ic: "80 gr. 1.Hamur Tek Renk (14x20cm)", p500: "8.200 ₺", p1000: "12.700 ₺", image: LOCAL_ASSETS.bloknot },
      ]
    }
  ]
};

export const BloknotlarPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any, type: string) => {
    openProductDetail({
      ...item,
      price: item.p1000,
      miktar: '1000 Cilt',
      desc: `${type} ${item.kapak ? '- Kapak: ' + item.kapak : ''} - İç: ${item.ic}`
    }, "Bloknot");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Bloknot Baskı | Mavi Basım Matbaa &amp; Reklam</title>
        <meta name="description" content="Kapaklı ve kapaksız bloknot baskı hizmetleri. A4, A5 ve A6 bloknot seçenekleri, 80 gr 1. hamur kağıt ve kurumsal promosyon bloknot çözümleri." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Bloknotlar</h1>
          </div>
        </div>

        {/* Kapaklı Bloknot Section */}
        <div className="mb-12 border border-gray-300 rounded-xl overflow-visible shadow-xl relative z-10">
          <div className="bg-secondary text-white p-3 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-xl font-bold uppercase tracking-tight">Kapaklı Bloknot</h2>
            <div className="text-right text-[10px] md:text-xs font-medium">
              <p>Amerikan Cilt - 50'lik Cilt</p>
              <p>Özel kesim kapak farkı 550 TL. dir..</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans">
              <thead>
                <tr className="bg-black text-white font-black uppercase tracking-tight">
                  <th className="p-2 border border-gray-300 w-10"></th>
                  <th className="p-2 border border-gray-300">KOD</th>
                  <th className="p-2 border border-gray-300">KAPAK</th>
                  <th className="p-2 border border-gray-300">İÇ YAPRAKLAR</th>
                  <th className="p-2 border border-gray-300">500 Cilt</th>
                  <th className="p-2 border border-gray-300">1000 Cilt</th>
                  <th className="p-2 border border-gray-300 w-16">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {BLOKNOTLAR_DATA.kapakli.map((group, gIdx) => (
                  <React.Fragment key={gIdx}>
                    {group.items.map((item, iIdx) => (
                      <tr key={iIdx} className="bg-white hover:bg-primary/5 transition-colors">
                        {iIdx === 0 && (
                          <td 
                            rowSpan={group.items.length} 
                            className={`${group.color} text-white font-black text-center p-2 w-10 border border-gray-300`}
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            <span className="text-[12px] whitespace-nowrap tracking-widest">{group.ebat}</span>
                          </td>
                        )}
                        <td className="p-2 border border-gray-300 text-center font-bold text-primary">{item.code}</td>
                        <td className="p-2 border border-gray-300 text-center font-black text-black">
                          {item.kapak}
                          <FeatureTooltip code={item.kapak} />
                        </td>
                        <td className="p-2 border border-gray-300 text-center text-black font-medium">{item.ic}</td>
                        <td className="p-2 border border-gray-300 text-center font-black text-black text-sm md:text-lg">{item.p500}</td>
                        <td className="p-2 border border-gray-300 text-center font-black text-black text-sm md:text-lg">{item.p1000}</td>
                        <td className="p-2 border border-gray-300 text-center">
                          <button onClick={() => openWhatsApp(item, 'Kapaklı Bloknot')} className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors">
                            <ShoppingCart size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kapaksız Bloknot Section */}
        <div className="border border-gray-300 rounded-xl overflow-visible shadow-xl relative z-10">
          <div className="bg-secondary text-white p-3 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-xl font-bold uppercase tracking-tight">Kapaksız Bloknot</h2>
            <div className="text-right text-[10px] md:text-xs font-medium">
              <p>50'lik Tutkallı Cilt</p>
              <p>Alt karton baskısızdır..</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans">
              <thead>
                <tr className="bg-black text-white font-black uppercase tracking-tight">
                  <th className="p-2 border border-gray-300 w-10"></th>
                  <th className="p-2 border border-gray-300">KOD</th>
                  <th className="p-2 border border-gray-300">İÇ YAPRAKLAR</th>
                  <th className="p-2 border border-gray-300">500 Cilt</th>
                  <th className="p-2 border border-gray-300">1000 Cilt</th>
                  <th className="p-2 border border-gray-300 w-16">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {BLOKNOTLAR_DATA.kapaksiz.map((group, gIdx) => (
                  <React.Fragment key={gIdx}>
                    {group.items.map((item, iIdx) => (
                      <tr key={iIdx} className="bg-white hover:bg-primary/5 transition-colors">
                        {iIdx === 0 && (
                          <td 
                            rowSpan={group.items.length} 
                            className={`${group.color} text-white font-black text-center p-2 w-10 border border-gray-300`}
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            <span className="text-[12px] whitespace-nowrap tracking-widest">{group.ebat}</span>
                          </td>
                        )}
                        <td className="p-2 border border-gray-300 text-center font-bold text-primary">{item.code}</td>
                        <td className="p-2 border border-gray-300 text-center text-black font-medium">{item.ic}</td>
                        <td className="p-2 border border-gray-300 text-center font-black text-black text-sm md:text-lg">{item.p500}</td>
                        <td className="p-2 border border-gray-300 text-center font-black text-black text-sm md:text-lg">{item.p1000}</td>
                        <td className="p-2 border border-gray-300 text-center">
                          <button onClick={() => openWhatsApp(item, 'Kapaksız Bloknot')} className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors">
                            <ShoppingCart size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* New Content Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16">
        <section>
          <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">Bloknot Baskı Çözümleri</h2>
          <div className="prose prose-slate max-w-none text-black">
            <p className="text-lg leading-relaxed mb-6">
              <strong className="font-black text-primary">Mavi Basım Matbaa & Reklam</strong> olarak bloknot ve bloknot baskı modellerinde Türkiye’nin en çok tercih edilen matbaasıyız. A5 bloknot, A4 bloknot ve A6 bloknot seçeneklerimizle ofis, eğitim, toplantı, promosyon ve hediye ihtiyaçlarınıza pratik, kaliteli ve şık çözuyoruz.
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

        <section className="bg-black rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full -ml-48 -mb-48 blur-3xl" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
              Matbaa ve Reklam Ajanslarına Özel İndirim!
            </h2>
            <p className="text-xl text-gray-400 mb-10 font-medium leading-relaxed">
              Toptan siparişlerde ekstra avantajlar ve ajanslara özel fiyat listemiz için bizimle iletişime geçin. <span className="text-white"><strong>Mavi Basım Matbaa & Reklam</strong></span> olarak 2026'da da en uygun fiyat garantisi sunuyoruz.
            </p>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl shadow-primary/20"
            >
              <ShoppingCart size={24} />
              Hemen Teklif Al
            </a>
          </div>
        </section>
      </div>
      <ProductSEOSection categoryKey="bloknot" />
    </div>
  );
};
