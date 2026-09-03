import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Package, 
  ShoppingCart, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Truck, 
  HelpCircle, 
  Check, 
  FileText, 
  Ruler, 
  Palette, 
  Printer, 
  Scissors, 
  Boxes,
  Info
} from 'lucide-react';
import { FireWarning, AgencyDiscountCTA } from '../App';
import { WHATSAPP_LINK } from '../constants/contact';
import { KUTU_DATA } from '../data/productData';
import { CategoryHero } from './CategoryHero';
import { 
  KUTU_SEO_METADATA, 
  KUTU_FAQS, 
  KUTU_GALLERY, 
  KUTU_H2_SECTIONS 
} from '../data/kutuPageContent';

export const Kutu = () => {
  const openWhatsApp = (item: any) => {
    const text = `Merhaba, ${item.code} - ${item.name} (${item.olcu}, ${item.ozellik}, ${item.miktar}) için fiyat teklifi ve detaylı bilgi almak istiyorum.`;
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://mavibasim.com/kutu/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Ana Sayfa",
            "item": "https://mavibasim.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Matbaa Ürünleri",
            "item": "https://mavibasim.com/matbaa"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Karton Kutu Baskı",
            "item": "https://mavibasim.com/kutu"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://mavibasim.com/kutu/#service",
        "name": "Karton Kutu Baskı & Özel Kesim Ambalaj Kutusu",
        "description": KUTU_SEO_METADATA.desc,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Mavi Basım Matbaa & Reklam",
          "url": "https://mavibasim.com"
        },
        "areaServed": "Türkiye",
        "url": "https://mavibasim.com/kutu"
      },
      {
        "@type": "FAQPage",
        "@id": "https://mavibasim.com/kutu/#faqpage",
        "mainEntity": KUTU_FAQS.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>{KUTU_SEO_METADATA.title}</title>
        <meta name="description" content={KUTU_SEO_METADATA.desc} />
        <link rel="canonical" href={KUTU_SEO_METADATA.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Mavi Basım Matbaa & Reklam" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:url" content={KUTU_SEO_METADATA.canonical} />
        <meta property="og:title" content={KUTU_SEO_METADATA.title} />
        <meta property="og:description" content={KUTU_SEO_METADATA.ogDescription || KUTU_SEO_METADATA.desc} />
        <meta property="og:image" content="https://mavibasim.com/images/kutu/ozel-kesim-kutu-tasarimi.webp" />
        <meta property="og:image:secure_url" content="https://mavibasim.com/images/kutu/ozel-kesim-kutu-tasarimi.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="533" />
        <meta property="og:image:alt" content="Mavi Basım özel kesim karton kutu ve ambalaj baskı örnekleri" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLdSchema)}
        </script>
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
                  <span className="text-gray-900 font-semibold" aria-current="page">Karton Kutu Baskı</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2 animate-in fade-in duration-500">
        <CategoryHero
          title={KUTU_SEO_METADATA.h1}
          badge="Amerikan Bristol / Kroma Karton Kesim"
          description={
            <p>
              Amerikan Bristol ve Kroma Kartondan özel kesimli karton kutular hazırlıyoruz. Baskılı kutu ve baskılı karton kutu seçenekleri; ürün ölçüsü, kullanım amacı, karton türü ve sipariş adedine göre değerlendirilir. Kurumsal ambalaj takımınızı tamamlamak için <Link to="/etiket" className="text-primary hover:underline font-bold">yapışkanlı etiket</Link>, <Link to="/karton-canta" className="text-primary hover:underline font-bold">karton çanta</Link>, <Link to="/ambalaj" className="text-primary hover:underline font-bold">ambalaj baskı</Link>, <Link to="/brosur" className="text-primary hover:underline">broşür</Link> ve <Link to="/kartvizit" className="text-primary hover:underline">kartvizit</Link> ürünlerimizi inceleyebilirsiniz.
            </p>
          }
          relatedLinks={[
            { label: "Sticker Etiket", path: "/etiket" },
            { label: "Karton Çanta", path: "/karton-canta" },
            { label: "Ambalaj Baskı", path: "/ambalaj" },
            { label: "Broşür Baskı", path: "/brosur" }
          ]}
          customCtaText="Özel Bıçaklı Kutu Teklifi Al"
        />

        {/* Safe Shipping & Delivery Terms Note */}
        <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3 text-xs md:text-sm text-slate-700 font-medium">
          <Truck className="text-primary shrink-0" size={20} aria-hidden="true" focusable="false" />
          <span>
            <strong>Türkiye geneline anlaşmalı kargo ile sevk edilmektedir:</strong> Hazırlık ve gönderim süresi; kutunun ölçüsü, sipariş adedi, karton türü, kalıp ihtiyacı, yüzey uygulamaları ve onay sürecine göre teklif aşamasında belirlenir.
          </span>
        </div>

        {/* Section 1: Karton Kutu Baskısı ve Fiyat Teklifi */}
        <section id="fiyat-ve-teklif" className="mt-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                Model &amp; Teklif Bilgileri
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-black mt-2 uppercase tracking-tight">
                Karton Kutu Baskısı ve Fiyat Teklifi
              </h2>
              <p className="text-sm font-medium text-slate-600 mt-1">
                Standart model seçeneklerine göre kutu modelleri, teknik özellikler ve kurumsal teklif süreci.
              </p>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm shrink-0"
            >
              <ShoppingCart size={16} aria-hidden="true" focusable="false" />
              <span>Özel Ölçü İçin Fiyat Alın</span>
            </a>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[11px] md:text-[13px]">
                <thead>
                  <tr className="bg-black text-white border-b border-black">
                    <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                    <th className="p-4 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 text-left">ÜRÜN ADI</th>
                    <th className="p-4 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 text-center">ÖLÇÜ</th>
                    <th className="p-4 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 text-left">ÖZELLİK</th>
                    <th className="p-4 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 text-center">MİKTAR</th>
                    <th className="p-4 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 text-center">FİYAT</th>
                    <th className="p-4 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {KUTU_DATA.map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-3 text-center font-black text-primary border-r border-gray-100">
                        {item.code}
                      </td>
                      <td className="p-3 font-bold text-black border-r border-gray-100">
                        {item.name}
                      </td>
                      <td className="p-3 text-center font-semibold text-slate-700 border-r border-gray-100 whitespace-nowrap">
                        {item.olcu}
                      </td>
                      <td className="p-3 text-slate-600 border-r border-gray-100">
                        {item.ozellik}
                      </td>
                      <td className="p-3 text-center font-bold text-black border-r border-gray-100">
                        {item.miktar}
                      </td>
                      <td className="p-3 text-center font-black text-black border-r border-gray-100">
                        {item.price}
                      </td>
                      <td className="p-3 text-center">
                        <button 
                          onClick={() => openWhatsApp(item)}
                          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                        >
                          <ShoppingCart size={14} className="shrink-0" aria-hidden="true" focusable="false" />
                          <span>Hemen Sipariş Ver</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 px-5 py-3 border-t border-gray-150 flex flex-col sm:flex-row justify-center items-center text-xs text-slate-500 font-medium font-sans">
              <span>* Hazırlanacak fiyat teklifinde KDV durumu, sipariş kapsamı ve varsa ek uygulamalar ayrıca belirtilir. Standart özellikler içindir; özel ölçü, gramaj ve ek yüzey uygulamalarına göre teklif verilmektedir.</span>
            </div>
          </div>
          
          <div className="mt-4">
            <FireWarning />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <article id="standart-kutu-fiyatlari" className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg font-black text-slate-900 mb-2">Standart Kutu Modelleri ve Teklif Bilgileri</h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                Standart ürün kutusu ve ambalaj modellerimiz 1.000 adetlik paketler için tekliflendirilmektedir. Listede yer alan modeller standart özellikler içindir; özel ölçü, gramaj ve ek yüzey uygulamalarına göre özel teklif hazırlanmaktadır.
              </p>
            </article>
            <article id="ozel-olcu-teklif-sureci" className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg font-black text-slate-900 mb-2">Özel Ölçü ve Kurumsal Teklif Süreci</h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
                Standart ölçülerin dışındaki tüm ürün kutuları için en, boy ve yükseklik ölçülerine göre özel bıçak çizimi hazırlanır. Kutu içine girecek ürünün ağırlığına ve kullanım amacına göre karton türü ve gramajı değerlendirilerek uygun tiraj ve maliyet dengesine göre teklif sunulur.
              </p>
            </article>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <Info size={16} className="text-amber-700 shrink-0 mt-0.5" aria-hidden="true" focusable="false" />
            <p>
              <strong>Doğrudan gıda temas uyarısı:</strong> Doğrudan gıda temasının bulunduğu projelerde kâğıt, karton, kaplama ve mürekkep seçimi; ürünün sıcaklık, yağ, nem ve kullanım süresi gibi koşulları ile tedarikçi belgelerine göre ayrıca değerlendirilmelidir. Standart karton kutu çözümleri genellikle dış ambalaj ve ikincil paketleme amaçlıdır.
            </p>
          </div>
        </section>

        {/* Section 2: Bristol ve Kroma Karton Seçenekleri */}
        <section id="karton-secenekleri" className="mt-16 bg-white p-6 sm:p-10 rounded-[32px] border border-slate-200 shadow-xs">
          <div className="mb-8">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Karton Türleri &amp; Gramajlar
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-black mt-2 uppercase tracking-tight">
              Bristol ve Kroma Karton Seçenekleri
            </h2>
            <p className="text-sm font-medium text-slate-600 mt-1">
              Ürününüzün ağırlığı, raf sunumu ve maliyet hedeflerine uygun karton alternatifleri.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <article id="amerikan-bristol-karton" className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Sparkles size={20} aria-hidden="true" focusable="false" />
                  <span className="text-xs font-black uppercase tracking-wider">Beyaz Çift Yüzey</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">Amerikan Bristol Karton (230 - 400 gr)</h3>
                <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                  Amerikan Bristol karton, ön ve arka yüzeyi beyaz, pürüzsüz selüloz yapısıyla ofset baskı netliği ve renk doygunluğu sunar. 230, 250, 300, 350 ve 400 gr seçenekleriyle kozmetik, parfüm, medikal dış ambalaj, takı, butik hediyelik ve perakende ürün ambalajlarında yaygın olarak tercih edilir. Doğru bıçak ve pilyaj yapısı katlama sırasında çatlama riskini azaltmaya yardımcı olabilir. İlaç ve medikal ambalajlarda içerik, yasal işaretler ve ölçüler müşterinin sağladığı onaylı baskıya hazır dosyaya göre uygulanır. Mavi Basım tıbbi, hukuki veya mevzuata ilişkin içerik hazırlamaz.
                </p>
              </div>
              <ul className="space-y-2 pt-4 border-t border-slate-200 text-xs font-bold text-slate-700">
                <li className="flex items-center gap-2"><Check size={14} className="text-primary shrink-0" aria-hidden="true" focusable="false" /> 230 - 250 gr: Küçük ve hafif ürünler, takı ve numune kutuları.</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-primary shrink-0" aria-hidden="true" focusable="false" /> 300 - 350 gr: Parfüm, krem, serum, hediyelik eşya ve tekstil kutuları.</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-primary shrink-0" aria-hidden="true" focusable="false" /> 400 gr: Daha tok gövde istenen sunum kutularında değerlendirilebilir. Cam şişe ve kavanozlarda ürün ağırlığı, kutu ölçüsü, taban yapısı ve separatör ihtiyacı birlikte değerlendirilmelidir.</li>
              </ul>
            </article>

            <article id="kroma-karton" className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Layers size={20} aria-hidden="true" focusable="false" />
                  <span className="text-xs font-black uppercase tracking-wider">Ekonomik &amp; Rijit</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">Kroma Karton (Arkası Gri, Yüksek Rijitlik)</h3>
                <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                  Kroma kartonun yüzey, arka yüz rengi ve lif yapısı tedarik edilen karton türüne göre değişebilir. Kullanılacak kartonun teknik özellikleri sipariş öncesinde değerlendirilmelidir. Bütçe ve tiraj dengesi; karton, ölçü, montaj, adet ve yüzey uygulamalarına göre değişir. Pastane, kuru gıda dış ambalajı, hırdavat ve yedek parça kutusu projelerinde değerlendirilebilir.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-slate-700">
                <span>Mukavemet ihtiyacı ürün ağırlığına, ölçüye, karton türüne ve kullanım koşullarına göre değerlendirilir.</span>
              </div>
            </article>

            <article id="kraft-ve-ozel-kartonlar" className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Boxes size={20} aria-hidden="true" focusable="false" />
                  <span className="text-xs font-black uppercase tracking-wider">Özel Karton Seçenekleri</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">Kraft ve Özel Dokulu Karton Alternatifleri</h3>
                <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                  Kraft veya özel dokulu karton seçenekleri; ürün ölçüsü, kullanım amacı, sipariş adedi ve tedarik durumuna göre ayrıca değerlendirilebilir. Kraft kutu baskı seçenekleri; ürün ölçüsü, istenen baskı görünümü, sipariş adedi ve kartonun tedarik durumuna göre ayrıca değerlendirilebilir. Mikro ondüle sıvama veya benzeri güçlendirici seçenekler, sipariş özellikleri ve uygulama imkânına göre ayrıca değerlendirilebilir.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-bold text-slate-700">
                <span>Özel lamine ve güçlendirici seçenekler sipariş ihtiyacına göre değerlendirilir.</span>
              </div>
            </article>
          </div>
        </section>

        {/* Section 3: Kutu Modelleri ve Kullanım Alanları */}
        <section id="kutu-modelleri" className="mt-16 bg-slate-50 p-6 sm:p-10 rounded-[32px] border border-slate-200">
          <div className="mb-8">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Sektörel Kutu Modelleri
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-black mt-2 uppercase tracking-tight">
              Kutu Modelleri ve Kullanım Alanları
            </h2>
            <p className="text-sm font-medium text-slate-600 mt-1">
              Farklı sektörlerin paketleme, sunum ve koruma gereksinimlerine göre geliştirilen kutu tipleri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article id="kozmetik-ve-bakim-kutulari" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-black text-slate-900 mb-2">Kozmetik, Parfüm ve Kişisel Bakım Kutuları</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed mb-3">
                Parfüm, losyon, krem, şampuan, serum ve cilt bakım ürünleri için tasarlanan Bristol kutular. Detaylı ofset baskı, altın varak yaldız ve gofre kabartma ile kurumsal sunumu destekler.
              </p>
              <ul className="space-y-1.5 text-xs font-bold text-slate-700 pt-3 border-t border-slate-100">
                <li className="flex items-center gap-1.5"><Check size={13} className="text-primary" aria-hidden="true" focusable="false" /> Şişe ve kavanozlar için iç koruma separatörü</li>
                <li className="flex items-center gap-1.5"><Check size={13} className="text-primary" aria-hidden="true" focusable="false" /> Soft Touch selefon ile kadifemsi yüzey hissi</li>
                <li className="flex items-center gap-1.5"><Check size={13} className="text-primary" aria-hidden="true" focusable="false" /> Kilitli dip mekanizmasıyla taşımayı kolaylaştıran yapı</li>
              </ul>
            </article>

            <article id="e-ticaret-ve-kargo-kutulari" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-black text-slate-900 mb-2">E-Ticaret, Kargo ve Ürün Gönderim Kutuları</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Online satış kanalları ve kargo gönderimleri için hazırlanan kargo ve ürün kutusu seçenekleri. Mukavemet ihtiyacı ürün ağırlığına, ölçüye, karton türüne ve kullanım koşullarına göre değerlendirilir. Kutu iç kapağına özel baskı ve karşılama mesajları eklenebilir.
              </p>
            </article>

            <article id="tekstil-ve-hediyelik-kutulari" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-black text-slate-900 mb-2">Tekstil, Hediyelik ve Aksesuar Kutuları</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Gömlek, fular, kravat, çorap, cüzdan, kemer ve takı ürünleri için pencereli, geçmeli veya çekmeceli sunum kutusu alternatifleri.
              </p>
            </article>

            <article id="pasta-tatli-ve-firin-kutulari" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-black text-slate-900 mb-2">Pasta, Tatlı ve Fırın Dış Ambalaj Kutuları</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Baklava, kuru pasta, kurabiye, makaron ve çikolata sunumları için dış ambalaj kutuları. Kulaklı kilit sistemi kutunun taşınmasını kolaylaştırır.
              </p>
            </article>

            <article id="restoran-ve-paket-servis-kutulari" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-black text-slate-900 mb-2">Restoran ve Paket Servis Dış Sunum Kutuları</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Hamburger, dürüm, patates, nugget ve tako gibi paket servis ürünleri için katlanabilir, pratik dış sunum kutuları.
              </p>
            </article>

            <article id="teshir-askili-ve-kilif-kutular" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-black text-slate-900 mb-2">Raf Tipi Teşhir, Askılı ve Kılıf Kutular</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Mağaza raflarında dikey sergileme sağlayan Euro delikli askılı kutular, açıldığında tezgâh standına dönüşen display kutular ve iç tepsiyi saran sleeve kılıflar.
              </p>
            </article>
          </div>
        </section>

        {/* Section 4: Kutu ve Ambalaj Baskı Örnekleri */}
        <section id="baski-ornekleri" className="mt-16 bg-white p-6 sm:p-10 rounded-[32px] border border-slate-200 shadow-xs">
          <div className="mb-8">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Örnek Çalışmalar Galerisi
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-black mt-2 uppercase tracking-tight">
              Kutu ve Ambalaj Baskı Örnekleri
            </h2>
            <p className="text-sm font-medium text-slate-600 mt-1">
              Bristol ve kroma karton kullanılarak hazırlanan kutu ve ambalaj baskı uygulama örnekleri.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {KUTU_GALLERY.map((imgItem) => (
              <div 
                key={imgItem.id} 
                className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 group hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                    <img 
                      src={imgItem.img} 
                      alt={`${imgItem.title} - Mavi Basım Ambalaj`} 
                      title={imgItem.title}
                      loading="lazy"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md border border-white/10">
                      {imgItem.tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <span className="block text-sm font-black text-slate-900 mb-1 leading-snug">{imgItem.title}</span>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{imgItem.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
            <article id="uygulama-ornekleri-genel" className="bg-slate-50 p-5 rounded-xl border border-slate-200/80">
              <h3 className="text-base font-black text-slate-900 mb-1.5">Hazırlanan Kutu ve Ambalaj Uygulama Çeşitleri</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Amerikan Bristol ve Kroma Karton kullanılarak hazırlanan ürün kutusu, hediyelik kutu, kozmetik ambalajı ve özel kesim kutu uygulama örneklerimizi galerimizde inceleyebilirsiniz. Her kutu projesinde ürünün boyutları ve kullanım koşulları göz önünde bulundurulur.
              </p>
            </article>
            <article id="sektorel-tasarim-detaylari" className="bg-slate-50 p-5 rounded-xl border border-slate-200/80">
              <h3 className="text-base font-black text-slate-900 mb-1.5">Sektörel Kutu Tasarımı ve Baskı Detayları</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Galeride yer alan örneklerde mat selefon, parlak selefon, Soft Touch kadife laminasyon, varak yaldız, gofre kabartma ve bölgesel UV lak gibi yüzey işlemlerinin uygulama örnekleri üzerindeki görsel duruşunu inceleyebilirsiniz.
              </p>
            </article>
          </div>
        </section>

        {/* Section 5: Kutu Ölçüsü, Bıçak ve Kalıp Yapısı */}
        <section id="olcu-bicak-ve-kalip" className="mt-16 bg-slate-50 p-6 sm:p-10 rounded-[32px] border border-slate-200">
          <div className="mb-8">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Mekanik &amp; Bıçak Yapısı
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-black mt-2 uppercase tracking-tight">
              Kutu Ölçüsü, Bıçak ve Kalıp Yapısı
            </h2>
            <p className="text-sm font-medium text-slate-600 mt-1">
              Kutunun gövde yapısını, kapanış biçimini ve paketleme hızını belirleyen mekanik yapılar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article id="taban-kilit-mekanizmalari" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Scissors size={20} aria-hidden="true" focusable="false" />
                  <span className="text-xs font-black uppercase tracking-wider">Taban Mekaniği</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Düz Dip, Kilitli Dip ve Otomatik Kilit Mekanizmaları</h3>
                <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                  Kutunun taban yapısı, taşınacak ürünün ağırlığına ve dolum hızına göre seçilir:
                </p>
              </div>
              <ul className="space-y-2 pt-3 border-t border-slate-100 text-xs font-bold text-slate-700">
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" /><span><strong>Düz Dip:</strong> Manuel katlanan, hafif ürünler için ekonomik model.</span></li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" /><span><strong>Ters Kilitli Dip:</strong> Karşılıklı kapakların farklı yönlerde kapandığı standart taban modellerinden biridir. Ürün ağırlığı, kutu ölçüsü ve kullanım biçimine göre ayrıca değerlendirilmelidir.</span></li>
                <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" /><span><strong>Otomatik Kilit (Oto Kilit):</strong> Hızlı kurulan pratik paketleme modeli.</span></li>
              </ul>
            </article>

            <article id="kapak-ve-govde-tipleri" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Boxes size={20} aria-hidden="true" focusable="false" />
                  <span className="text-xs font-black uppercase tracking-wider">Kapak Çeşitleri</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Geçmeli Kapak, Çekmeceli ve Kılıf (Sleeve) Yapılar</h3>
                <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                  Üst kapanış sisteminde tırnaklı kilitli kapak, çift taraflı geçme kapak, sürgülü çekmeceli mekanizma veya kutu gövdesini saran kılıf (sleeve) tasarımları uygulanabilir.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-bold text-slate-700">
                <span>Kapak ve taban modeli, ürün ölçüsü ve kullanım biçimine göre belirlenir.</span>
              </div>
            </article>

            <article id="bicak-izi-ve-kirim-cizgileri" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Ruler size={20} aria-hidden="true" focusable="false" />
                  <span className="text-xs font-black uppercase tracking-wider">Hassas Tolerans</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Bıçak İzi, Kırım Çizgisi ve Katlama Payları</h3>
                <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                  Kutu kesim kalıbı; çelik kesim bıçakları (düz çizgi), pilyaj/kırım bıçakları (katlama çizgisi) ve perfore bıçaklarından oluşur. Özel kutu tasarımı, ürün ölçüsüne ve kutunun açık açınımına uygun hazırlanan bıçak çizimi üzerinden planlanmalıdır. Ölçülendirme teknik çizim ve kalıp toleranslarına uygun olarak yapılır.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-bold text-slate-700">
                <span>Doğru pilyaj payı kartonun katlanırken çatlama riskini azaltmaya yardımcı olur.</span>
              </div>
            </article>
          </div>
        </section>

        {/* Section 6: Selefon, Varak, Gofre ve Yüzey Uygulamaları */}
        <section id="yuzey-uygulamalari" className="mt-16 bg-white p-6 sm:p-10 rounded-[32px] border border-slate-200 shadow-xs">
          <div className="mb-8">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Yüzey İşlemleri &amp; Lak
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-black mt-2 uppercase tracking-tight">
              Selefon, Varak, Gofre ve Yüzey Uygulamaları
            </h2>
            <p className="text-sm font-medium text-slate-600 mt-1">
              Kutunun dış etkenlere karşı korunmasına yardımcı olan ve markanıza şıklık katan ek işlemler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article id="selefon-laminasyon" className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-2 text-primary mb-3">
                <ShieldCheck size={20} aria-hidden="true" focusable="false" />
                <span className="text-xs font-black uppercase tracking-wider">Koruyucu Film</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Koruyucu Mat, Parlak ve Soft Touch Selefon</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Selefon laminasyonu, kartonun dış yüzeyini ince bir polipropilen film ile kaplayarak sürtünmeye, neme ve yıpranmaya karşı korumaya yardımcı olur. Mat selefon zarif ve kurumsal bir görünüm verirken; parlak selefon renkleri canlı gösterir. Soft Touch selefon ise dokunulduğunda ipeksi ve kadifemsi bir his sunar.
              </p>
            </article>

            <article id="varak-yaldiz-baski" className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Sparkles size={20} aria-hidden="true" focusable="false" />
                <span className="text-xs font-black uppercase tracking-wider">Metalik Yaldız</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Sıcak Varak Yaldız (Altın, Gümüş ve Bakır)</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Kutu üzerinde marka logosu, ürün ismi veya dekoratif çerçeveler sıcak klişe yardımıyla altın, gümüş, rose gold veya hologram varak yaldız ile kaplanır. Işık altında parlayarak ürününüze estetik bir hava katar.
              </p>
            </article>

            <article id="gofre-kabartma-ve-uv-lak" className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Palette size={20} aria-hidden="true" focusable="false" />
                <span className="text-xs font-black uppercase tracking-wider">3D Kabartma</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">3D Gofre Kabartma ve Bölgesel Lokal UV Lak</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Gofre uygulaması, erkek-dişi klişe ile karton yüzeyine baskı yaparak logonun kabartmalı görünmesini sağlar. Lokal UV lak ise mat selefonlu kutu üzerinde belirli alanlara parlak vernik uygulayarak kontrast oluşturur.
              </p>
            </article>
          </div>
        </section>

        {/* Section 7: Kutu Baskı Fiyatlarını Belirleyen Unsurlar */}
        <section id="fiyat-belirleyen-unsurlar" className="mt-16 bg-slate-50 p-6 sm:p-10 rounded-[32px] border border-slate-200">
          <div className="mb-8">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Maliyet Analizi &amp; Bütçe
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-black mt-2 uppercase tracking-tight">
              Kutu Baskı Fiyatlarını Belirleyen Unsurlar
            </h2>
            <p className="text-sm font-medium text-slate-600 mt-1">
              Birim maliyetleri doğrudan etkileyen teknik parametreler ve bütçe optimizasyonu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article id="tabaka-ebadi-ve-fire" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-black text-slate-900 mb-2">Ebat, Açık Tabaka Boyutu ve Fire Optimizasyonu</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Kutunun açık açınım ebadı, ofset baskı tabakasına kaç adet kutunun sığacağını (montaj sayısını) belirler. Ofset baskılı kutu projelerinde karton türü, renk kullanımı, açık tabaka yerleşimi ve yüzey uygulamaları birlikte değerlendirilir. Uygun tabaka yerleşimi ve ebat optimizasyonu sayesinde kâğıt firesi azaltılarak birim maliyet düşürülür.
              </p>
            </article>

            <article id="siparis-tiraji-ve-maliyet" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-black text-slate-900 mb-2">Sipariş Tirajı ve Birim Maliyet Dengesi</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Ofset baskıdaki sabit hazırlık, kalıp ve montaj giderleri daha fazla adede dağıtılabildiği için birim maliyet çoğu projede düşebilir. Kesin sonuç kutu ölçüsü ve sipariş özelliklerine göre hesaplanır.
              </p>
            </article>

            <article id="gramaj-ve-ekstra-islemler" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-black text-slate-900 mb-2">Karton Gramajı ve Ekstra Yüzey İşlemleri</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Seçilen kartonun cinsi (Bristol veya Kroma), gramajı (230 gr ile 400 gr arası) ve talep edilen selefon, varak yaldız, gofre veya lak gibi ek uygulamalar toplam teklif tutarını şekillendirir. Özel kutu baskı ve ambalaj kutusu fiyatları; kutunun açık ebadı, karton gramajı, baskı özellikleri, bıçak veya kalıp ihtiyacı ve yüzey uygulamalarına göre hesaplanır.
              </p>
            </article>
          </div>
        </section>

        {/* Section 8: Baskıya Hazır Dosya ve PDF Prova */}
        <section id="dosya-ve-pdf-prova" className="mt-16 bg-white p-6 sm:p-10 rounded-[32px] border border-slate-200 shadow-xs">
          <div className="mb-8">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Grafik &amp; Dosya Onayı
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-black mt-2 uppercase tracking-tight">
              Baskıya Hazır Dosya ve PDF Prova
            </h2>
            <p className="text-sm font-medium text-slate-600 mt-1">
              Baskı öncesinde yerleşim ve hazırlık sorunlarının azaltılması için gereken grafik dosya hazırlık adımları.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article id="vektorel-bicak-sablonu" className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg font-black text-slate-900 mb-2">Vektörel Bıçak İzi ve Katlama Katmanları</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Kutu tasarımı vektörel bıçak çizimi üzerine oturtulmalıdır. Tasarım dosyasında kesim çizgileri, kırım çizgileri ve yapıştırma kulakları ayrı katmanlarda (spot renk olarak) tanımlanmalıdır.
              </p>
            </article>

            <article id="cmyk-ve-tasma-payi" className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg font-black text-slate-900 mb-2">CMYK Renk Ayrımı ve 3 mm Taşma Payı (Bleed)</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Tüm görseller ve renk paletleri CMYK modunda olmalı, bıçak kesim hatlarının dışına en az 3 mm taşma payı (bleed) verilmelidir. Yazı karakterleri (fontlar) konvertlenerek eğriye dönüştürülmelidir.
              </p>
            </article>

            <article id="pdf-prova-ve-onay" className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg font-black text-slate-900 mb-2">Dijital PDF Prova Kontrol ve Onay Adımları</h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Tarafımıza iletilen tasarım dosyası teknik incelemeden geçirilir; metin, yerleşim ve kırım hatlarını gösteren dijital PDF prova hazırlanarak onayınıza sunulur. Dijital PDF prova yerleşim ve metin kontrolü için kullanılır; fiziksel baskı rengini ve karton yapısını birebir garanti etmez.
              </p>
            </article>
          </div>
        </section>

        {/* Section 9: Baskı, Kesim, Kırım, Yapıştırma ve Gönderim */}
        <section id="baski-kesim-ve-gonderim" className="mt-16 bg-slate-50 p-6 sm:p-10 rounded-[32px] border border-slate-200">
          <div className="mb-8">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Süreç &amp; Teslimat
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-black mt-2 uppercase tracking-tight">
              Baskı, Kesim, Kırım, Yapıştırma ve Gönderim
            </h2>
            <p className="text-sm font-medium text-slate-600 mt-1">
              Sipariş onayından paket teslimine kadar aşamalı olarak yürütülen teknik süreç.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <article id="ofset-baski-sureci" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-3 font-black">1</div>
              <h3 className="text-base font-black text-slate-900 mb-2">Dosya Hazırlığı ve Renk Kontrolü</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Onaylanan tasarım dosyası belirlenen baskı yöntemine göre hazırlanır. Sipariş özelliklerine göre baskı ve renk kontrolü gerçekleştirilir.
              </p>
            </article>

            <article id="kazanli-kesim-ve-kirim" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-3 font-black">2</div>
              <h3 className="text-base font-black text-slate-900 mb-2">Kesim, Pilyaj ve Kırım İşlemleri</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Baskısı ve yüzey uygulaması tamamlanan tabakalar, özel çelik bıçak kalıpları ile teknik çizime uygun şekilde kesilir, pilyaj ve katlama kırım izleri oluşturulur.
              </p>
            </article>

            <article id="yapistirma-ve-montaj" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-3 font-black">3</div>
              <h3 className="text-base font-black text-slate-900 mb-2">Kutu Modelinde Yapıştırma ve Katlama</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Yan yapıştırma ve kilitli dip taban kulakçıkları, kutu modeline uygun yapıştırıcılarla birleştirilerek sevkiyata hazır hale getirilir.
              </p>
            </article>

            <article id="ambalaj-ve-sevk" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-3 font-black">4</div>
              <h3 className="text-base font-black text-slate-900 mb-2">Paketleme ve Anlaşmalı Kargoya Teslim</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Tamamlanan kutular, taşıma sırasında korunmasına yardımcı olacak biçimde düz katlanmış olarak koli veya paketlere yerleştirilir. İstanbul Topkapı hizmet ve koordinasyon noktamız üzerinden anlaşmalı kargo ile Türkiye'nin tüm illerine sevk edilir.
              </p>
            </article>
          </div>
        </section>

        {/* Section 10: Sıkça Sorulan Sorular */}
        <section id="sikca-sorulan-sorular" className="mt-16 bg-white p-6 sm:p-10 rounded-[32px] border border-slate-200 shadow-xs">
          <div className="mb-8">
            <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Sıkça Sorulan Sorular
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-black mt-2 uppercase tracking-tight">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-sm font-medium text-slate-600 mt-1">
              Karton kutu baskısı, karton çeşitleri, sipariş adedi, prova ve teslimat süreçleri hakkında merak edilenler.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {KUTU_FAQS.map((faq, index) => (
              <article 
                key={index}
                id={`faq-${index + 1}`}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-start h-full"
              >
                <h3 className="text-base font-black text-slate-900 mb-3 leading-snug">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Semantic CTA Area without H2 */}
        <aside className="mt-12 p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xl md:text-2xl font-black tracking-tight">
              Kurumsal Siparişler &amp; Toptan Baskı Teklifi
            </p>
            <p className="text-xs md:text-sm text-slate-400 font-medium mt-1.5 max-w-xl">
              Farklı ebat, gramaj veya özel bıçaklı kutu talepleriniz için müşteri temsilcimizle WhatsApp üzerinden iletişime geçebilirsiniz.
            </p>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md shrink-0"
          >
            <ShoppingCart size={18} aria-hidden="true" focusable="false" />
            <span>WhatsApp ile Teklif İsteyin</span>
          </a>
        </aside>

      </div>
    </div>
  );
};
export const KutuPage = Kutu;
export default Kutu;
