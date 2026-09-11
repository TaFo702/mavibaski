import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ShoppingCart, ChevronDown, ShieldCheck, Truck, Phone } from 'lucide-react';
import { useCart, ProductSEOSection, FireWarning } from '../App';
import { LOCAL_ASSETS } from '../constants/assets';
import { WHATSAPP_LINK } from '../constants/contact';
import { DeliveryBadge } from './DeliveryBadge';
import RelatedBlogPosts from './RelatedBlogPosts';

import { BLOKNOTLAR_DATA } from '../data/extraProductData';
export { BLOKNOTLAR_DATA };

const BLOKNOT_DETAILS = {
  breadcrumbTitle: "Promosyon Bloknot",
  h1Title: "Promosyon ve Kapaklı Bloknot Baskısı",
  subtitle: "Masaüstünde uzun vadeli marka prestiji ve kalıcılık sağlayan promosyon bloknot defterler, firmanızın logosunu her not almada müşterilerinizin gözü önünde tutar.",
  gallery: [
    {
      src: "/images/bloknot/bloknot-baski-fiyatlari.webp",
      alt: "kapakli-promosyon-bloknot-gercek-foto",
      title: "Promosyon Bloknot Baskısı",
      desc: "Markanızın prestijini artıran kalın kuşe kapaklı bloknotlar, müşterinizin her kullanımda firmanızın kalitesini hissetmesini sağlar."
    },
    {
      src: "/images/bloknot/bloknot-ornegi.webp",
      alt: "tutkalli-bloknot-gercek-baski",
      title: "Tutkallı Kapaksız Bloknot",
      desc: "Üstten tutkallı ekonomik yapısıyla hızlı not almayı kolaylaştırırken, her koparılan sayfada logonuzun kalıcı olmasını sağlar."
    },
    {
      src: "/images/bloknot/bloknot-tasarimi.webp",
      alt: "bloknot-tasarimi-ve-baski-detayi",
      title: "Özel Tasarımlı Bloknot",
      desc: "Yıllarca dağılmayan ve sayfaların kopmamasını sağlayan özel yapıştırma teknolojisi ve kurumsal tasarım."
    },
    {
      src: "/images/bloknot/kocanli-bloknot-baski.webp",
      alt: "kocanli-bloknot-baski-kalitesi",
      title: "Koçanlı Bloknot Baskısı",
      desc: "Yüksek kaliteli 80 gr. 1. sınıf hamur kağıt, kalemin yağ gibi kaymasını sağlayarak yazım keyfi sunar."
    },
    {
      src: "/images/bloknot/spiralli-bloknot-baski.webp",
      alt: "spiralli-promosyon-bloknot",
      title: "Spiralli Bloknot Modelleri",
      desc: "Sıra dışı logo baskıları ve spiralli mekanizması ile dayanıklı kurumsal not defterleri."
    },
    {
      src: "/images/kup-bloknot/promosyon-kup-bloknot-ornegi.webp",
      alt: "kup-bloknot-promosyon-baski",
      title: "Küp Bloknot ve Notluk Seti",
      desc: "Masaüstünde uzun süreli marka görünürlüğü sağlayan kutulu küp bloknot çeşitleri."
    }
  ],
  usageGallery: [
    {
      src: "/images/bloknot/bloknot-baski-fiyatlari.webp",
      alt: "toplanti-masasinda-kapakli-bloknot-kullanimi",
      title: "Yönetim Toplantılarında Prestij",
      desc: "Toplantı masalarındaki yöneticilerin ve iş ortaklarının prestijli not alma deneyimi için mükemmel bir tamamlayıcı."
    },
    {
      src: "/images/bloknot/spiralli-bloknot-baski.webp",
      alt: "fuar-standinda-promosyon-bloknot-dagitimi",
      title: "Fuar Standında Etkili Tanıtım",
      desc: "Etkinlik ve fuar standınızda ziyaretçilere dağıtarak akıllarda kalıcı bir marka izlenimi bırakın."
    },
    {
      src: "/images/kup-bloknot/kutulu-kup-bloknot-baski.webp",
      alt: "ofis-calisani-masasinda-not-defteri-kullanimi",
      title: "Günlük Ofis Çalışmalarında Konfor",
      desc: "Ofis çalışanlarının masasında her an el altında bulunan, hızlı not alma ve planlama pratikliği sunan yapı."
    },
    {
      src: "/images/bloknot/kocanli-bloknot-baski.webp",
      alt: "saha-satis-temsilcisi-elinde-cep-boy-bloknot",
      title: "Saha ve Mobil Satış Pratikliği",
      desc: "Saha ekiplerinin cep ve çanta boy pratikliği ile sahada kolayca not alabilmesi için tasarlanan ergonomi."
    }
  ],
  faqList: [
    {
      q: "Promosyon ve kapaklı bloknot siparişlerinde minimum sipariş adedi nedir?",
      a: "Promosyon ve kapaklı bloknot baskılarımız minimum 500 cilt olarak üretilmektedir. Fiyatlarımız 500 ve 1.000 cilt için hazırlanmıştır. Daha yüksek adetli siparişlerde özel fiyat teklifi sunulmaktadır."
    },
    {
      q: "Kapaklı bloknot ile kapaksız bloknot arasındaki fark nedir?",
      a: "Kapaklı bloknotlarda 350 gr kuşe kartondan üretilen dayanıklı bir ön kapak bulunur ve Amerikan cilt sistemi kullanılır. Kapaksız bloknotlar ise ekonomik çözümler sunan, üstten tutkallı ciltleme ile hazırlanan pratik not bloklarıdır."
    },
    {
      q: "Bloknotlarda kaç yaprak bulunur?",
      a: "Hem kapaklı hem de kapaksız bloknot modellerimiz standart olarak 50 yaprak şeklinde üretilmektedir."
    },
    {
      q: "İç sayfalarda hangi kağıt kullanılır?",
      a: "İç sayfalarda 80 gr 1. hamur beyaz kağıt kullanılmaktadır. Tükenmez kalem, kurşun kalem ve dolma kalem ile rahat yazım sağlar."
    },
    {
      q: "Kapakta hangi malzemeler kullanılıyor?",
      a: "Kapaklı modellerde 350 gr kuşe karton kullanılmaktadır. İsteğe bağlı olarak mat veya parlak selefon uygulanarak hem dayanıklılık hem de şık bir görünüm elde edilir."
    },
    {
      q: "Kendi logomuzu ve tasarımımızı bastırabilir miyiz?",
      a: "Evet. Hazırladığınız baskıya uygun tasarım dosyasını gönderebilir veya yalnızca logonuzu ileterek tasarım desteğimizden yararlanabilirsiniz."
    },
    {
      q: "Hazır tasarımımız yoksa yardımcı oluyor musunuz?",
      a: "Evet. Logonuz ve iletişim bilgileriniz doğrultusunda grafik ekibimiz profesyonel mizanpajı tamamen ücretsiz hazırlar. Tasarım sürecinde tam 3 adet ücretsiz revize hakkınız bulunmaktadır. Baskı öncesinde dijital PDF prova tarafınıza gönderilir ve sizden kesin onay alınmadan üretime geçilmez."
    },
    {
      q: "Baskı öncesinde onay alıyor musunuz?",
      a: "Evet. Hazırlanan dijital PDF prova size gönderilir. Renk, yazı ve yerleşimi kontrol edip onay verdikten sonra üretim süreci başlatılır."
    },
    {
      q: "Üretim süresi kaç iş günüdür?",
      a: "PDF onayının ardından üretim süreci ortalama 5-7 iş günü içerisinde tamamlanır. Üretim bittikten sonra ürünler güvenli şekilde kargoya teslim edilir."
    },
    {
      q: "Türkiye'nin her yerine gönderim yapıyor musunuz?",
      a: "Evet. İstanbul dahil Türkiye'nin 81 iline anlaşmalı kargo firmaları ile güvenli sevkiyat yapılmaktadır. Ürünler hasar riskini azaltacak şekilde korumalı koliler içerisinde gönderilir."
    },
    {
      q: "Bloknot ölçüleri nelerdir?",
      a: "Standart üretim seçeneklerimiz 9,4 × 14,3 cm ve 14 × 20 cm ölçüleridir. İhtiyacınıza uygun özel ölçüler için ayrıca teklif talep edebilirsiniz."
    },
    {
      q: "Özel kesim kapak yaptırabilir miyim?",
      a: "Evet. Kapaklı bloknot modellerimizde dilediğiniz özel logo şekilli veya pencereli özel kesim kapak uygulayabilmekteyiz. Özel kesimli kapak uygulamamız sipariş toplamına sadece 550 TL ek bıçak ve kalıp ücreti olarak yansıtılmaktadır."
    },
    {
      q: "Bloknotlar hangi alanlarda kullanılır?",
      a: "Kurumsal firmalar, fabrikalar, ofisler, eğitim kurumları, fuarlar, seminerler, bayi toplantıları, satış ekipleri ve promosyon organizasyonlarında yaygın olarak kullanılmaktadır."
    },
    {
      q: "Bloknotlar promosyon ürünü olarak etkili midir?",
      a: "Evet. Bloknotlar uzun süre masa üzerinde kullanılan ürünler olduğu için marka bilinirliğini artıran ve firmanızın sürekli görünür olmasını sağlayan etkili promosyon ürünleri arasında yer alır."
    },
    {
      q: "Baskıda hata olması durumunda ne yapıyorsunuz?",
      a: "Mavi Basım olarak baskı kalitemize %100 güvence veriyoruz. Üretim, kesim veya ciltlemeden kaynaklı tüm hatalarda, hiçbir mazeret öne sürmeksizin siparişinizi derhal ücretsiz olarak yeniden basıp en hızlı şekilde adresinize sevk ediyoruz."
    },
    {
      q: "Sipariş nasıl verebilirim?",
      a: "Telefon veya WhatsApp üzerinden bizimle iletişime geçerek; istediğiniz ebat, adet, kağıt ve kapak modelini iletirsiniz. Grafik ekibimizle birlikte tasarım kontrolü/mizanpaj hazırlanır ve size onay için PDF prova sunulur. Onayınız ve ödeme sonrasında kalıplar hazırlanarak Heidelberg ofset makinelerimizde üretime geçilir. Üretim tamamlandığında ürünleriniz hasarsızlık garantili ambalajlarla sevk edilir."
    },
    {
      q: "Fiyatlara KDV dahil mi?",
      a: "Tablomuzda belirtilen promosyon bloknot fiyatlarımıza %20 KDV dahil değildir. Sektörel mevzuata uygun şekilde %20 KDV eklenerek adınıza veya şirketinize e-Fatura kesilir."
    },
    {
      q: "Kargo ücreti nasıl hesaplanıyor?",
      a: "Siparişleriniz çift katlı kalın Kraft koliler içinde hasar almayacak şekilde paketlenir. Anlaşmalı kargo firmalarımızla (Aras, Yurtiçi veya MNG) matbaa çıkışlı en düşük kargo tarifesinden sevk edilir. İstanbul dışı sevkiyatlarda kargo ücreti alıcıya aittir ve paket ağırlığına göre hesaplanır."
    },
    {
      q: "Farklı iç sayfa baskıları (kareli, çizgili, noktalı) yaptırabilir miyim?",
      a: "Evet. Bloknot iç sayfalarını isteğinize göre tamamen çizgili, kareli, noktalı, kılavuz çizgili veya arkalı-önlü farklı tasarımlarla basabiliriz. Bu özelleştirmeler için ekstra bir kalıp ücreti talep edilmemektedir."
    },
    {
      q: "Tek renk yerine renkli (CMYK) iç sayfa baskısı yapılabiliyor mu?",
      a: "Evet. Fiyat listemizdeki standart fiyatlar tek renk (gradyan tonları dahil) iç sayfa baskısına göredir. İç sayfalarda çok renkli, resimli veya özel Pantone renkli baskı talepleriniz için WhatsApp hattımızdan hızlıca özel fiyat teklifi alabilirsiniz."
    },
    {
      q: "Özel ölçü ve ebatta bloknot üretebiliyor musunuz?",
      a: "Evet. Heidelberg kesim ve kırım makinelerimiz sayesinde standart dışı dilediğiniz özel ölçülerde (örneğin kare veya daha büyük A4 boyutunda) bloknot imalatı yapabiliyoruz. Özel ölçü siparişleriniz için lütfen müşteri temsilcimizle görüşün."
    },
    {
      q: "Bloknot sayfa adedi (yaprak sayısı) artırılabilir mi?",
      a: "Evet. Standart 50 yaprak (100 sayfa) yerine; 60 yaprak, 80 yaprak veya 100 yaprak şeklinde daha kalın bloknotlar üretebiliriz. Yaprak sayısı arttıkça sırt kalınlığı ve fiyatlandırma değişmektedir."
    },
    {
      q: "Bloknotların altında destekleyici arka karton bulunuyor mu?",
      a: "Evet. Hem kapaklı hem de kapaksız tüm bloknot modellerimizin en arkasında 300 gr kalınlığında baskısız gri mukavva / karton destek yer alır. Bu sayede bloknotu elinizde tutarken bile altlığın sertliği sayesinde pürüzsüzce yazım yapabilirsiniz."
    },
    {
      q: "Ödeme seçenekleri ve süreç nasıl işliyor?",
      a: "Siparişiniz için PDF prova onayı verdikten sonra kurumsal banka hesaplarımıza Havale, EFT veya FAST yoluyla ödemenizi gerçekleştirebilirsiniz. Kurumsal e-Faturanız sevkiyat günü elektronik ortamda adresinize gönderilir."
    }
  ]
};

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

export const BloknotlarPage = () => {
  const { openProductDetail } = useCart();

  const openWhatsApp = (item: any, type: string, quantity: string, price: string) => {
    // Fiyatları sayıya çevirelim
    const p500Val = parseInt(item.p500.replace(/[^\d]/g, ''));
    const p1000Val = parseInt(item.p1000.replace(/[^\d]/g, ''));

    // Modal içinde 500 ve 1000 seçeneklerini sunalım
    const availableOptions = [
      { miktar: '500 Cilt', price: p500Val },
      { miktar: '1000 Cilt', price: p1000Val }
    ];

    openProductDetail({
      ...item,
      price: price, // Seçilen butonun fiyatı
      miktar: quantity, // Seçilen butonun miktarı
      desc: `${type} ${item.kapak ? '- Kapak: ' + item.kapak : ''} - İç: ${item.ic}`,
      availableOptions
    }, "Bloknot");
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProductGroup",
        "name": "Promosyon ve Kapaklı Bloknot Grubu",
        "image": [
          "https://mavibasim.com/images/bloknot/uretim-kapakli-bloknot.webp",
          "https://mavibasim.com/images/bloknot/kapaksiz-tutkalli-gercek.webp"
        ],
        "description": "Toptan kapaklı, kapaksız ve promosyon bloknot defter baskısı. İstanbul Topkapı matbaamızdan 81 ile hasarsız kargo sevkiyatı ve ücretsiz mizanpaj desteği.",
        "brand": {
          "@type": "Brand",
          "name": "Mavi Basım"
        },
        "productGroupID": "bloknot-group-01",
        "variesBy": ["https://schema.org/size", "https://schema.org/model"],
        "hasVariant": [
          {
            "@type": "Product",
            "name": "Kapaklı Bloknot 9.4x14.3cm NK",
            "sku": "B16",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "TRY",
              "lowPrice": "12300",
              "highPrice": "14900",
              "offerCount": "2"
            }
          },
          {
            "@type": "Product",
            "name": "Kapaklı Bloknot 14x20cm NK",
            "sku": "B20",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "TRY",
              "lowPrice": "15100",
              "highPrice": "19400",
              "offerCount": "2"
            }
          },
          {
            "@type": "Product",
            "name": "Kapaksız Bloknot 9.4x14.3cm",
            "sku": "B28",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "TRY",
              "lowPrice": "6900",
              "highPrice": "8900",
              "offerCount": "2"
            }
          },
          {
            "@type": "Product",
            "name": "Kapaksız Bloknot 14x20cm",
            "sku": "B29",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "TRY",
              "lowPrice": "8900",
              "highPrice": "13400",
              "offerCount": "2"
            }
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": BLOKNOT_DETAILS.faqList.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Anasayfa",
            "item": "https://mavibasim.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Promosyon Bloknot",
            "item": "https://mavibasim.com/bloknotlar"
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Promosyon ve Kapaklı Bloknot Baskısı Fiyatları | Mavi Basım</title>
        <meta name="description" content="Toptan kapaklı, kapaksız ve promosyon bloknot defter baskısı. İstanbul Topkapı matbaamızdan 81 ile hasarsız kargo sevkiyatı ve ücretsiz mizanpaj desteği." />
      </Helmet>

      {/* Breadcrumb Alanı */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="text-xs font-bold text-gray-500 uppercase tracking-tight flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          <ChevronDown size={12} className="-rotate-90 text-gray-400 shrink-0" />
          <span className="text-gray-800 font-extrabold truncate">{BLOKNOT_DETAILS.breadcrumbTitle}</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-black animate-in fade-in duration-500">
        {/* H1 BAŞLIK */}
        <div className="text-center mb-6">
          <h1 className="text-[19px] md:text-[26px] lg:text-[31px] font-black text-primary uppercase tracking-tight mb-3 leading-tight">
            {BLOKNOT_DETAILS.h1Title}
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* İLK BÖLÜM: METİN ALANI */}
        <div className="max-w-[1200px] mx-auto text-slate-700 text-sm md:text-[15px] leading-relaxed font-semibold text-justify space-y-4 mb-10">
          <p>
            Masaüstünde uzun vadeli marka prestiji ve kalıcılık sağlayan <strong className="text-primary font-bold">promosyon bloknot defterler</strong>, firmanızın logosunu her not almada müşterilerinizin gözü önünde tutar. Geleneksel reklam ve tanıtım materyalleri kaybolurken, markanıza özel tasarlanmış kaliteli bir <strong className="text-primary font-bold">Kapaklı Bloknot</strong> veya <strong className="text-primary font-bold">promosyon bloknot</strong> masalarda her an aktif bir şekilde kullanılarak markanızın sürekli hafızalarda kalmasını sağlar.
          </p>
          <p>
            Kurumsal kimlik çalışmalarınızı taçlandırmak için promosyon bloknot defterlerinizi <Link to="/kup-bloknot" className="text-primary hover:underline font-bold">Küp Bloknot</Link>, resmi yazışmalarınız için <Link to="/antetli" className="text-primary hover:underline font-bold">Antetli Kağıt</Link> ve kurumsal evraklarınızı sunmak üzere <Link to="/dosyalar" className="text-primary hover:underline font-bold">Cepli Dosya</Link> baskılarıyla zenginleştirerek eksiksiz bir bayi seti oluşturabilirsiniz. Firma içi kurumsal yazışmalar için <Link to="/zarf" className="text-primary hover:underline font-bold">Zarf Baskı</Link> seçeneklerimizi de inceleyebilirsiniz.
          </p>
        </div>

        {/* Dynamic Delivery Date Banner */}
        <DeliveryBadge categoryKey="bloknot" days={7} variant="banner" className="mb-8" />

        {/* Kapaklı Bloknot Section */}
        <div id="fiyat-tablosu" className="mb-12 border border-gray-200 rounded-2xl overflow-visible shadow-xl relative z-10 scroll-mt-24 bg-white">
          <div className="bg-secondary text-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center rounded-t-2xl">
            <h2 className="text-xl font-bold uppercase tracking-tight">Kapaklı Kurumsal Bloknot</h2>
            <div className="text-right text-[10px] md:text-xs font-semibold">
              <p>50 Yapraklı Amerikan Cilt</p>
              <p>Özel kesim kapak farkı 550 TL'dir.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans">
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th className="p-4 w-10"></th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap">KOD</th>
                  <th className="p-4 w-28 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap text-center">KAPAK</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">İÇ YAPRAKLAR</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap text-center">500 CİLT</th>
                  <th className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center whitespace-nowrap border-r border-white/10">SİPARİŞ</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap text-center">1000 CİLT</th>
                  <th className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center whitespace-nowrap">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {BLOKNOTLAR_DATA.kapakli.map((group, gIdx) => (
                  <React.Fragment key={gIdx}>
                    {group.items.map((item, iIdx) => (
                      <tr key={iIdx} className="hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group border-b border-gray-100">
                        {iIdx === 0 && (
                          <td 
                            rowSpan={group.items.length} 
                            className={`${group.color} text-white font-black text-center p-3 w-10 border-r border-white/10`}
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            <span className="text-[12px] whitespace-nowrap tracking-widest">{group.ebat}</span>
                          </td>
                        )}
                        <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors whitespace-nowrap">{item.code}</td>
                        <td className="p-3 text-center font-black text-black border-r border-gray-100">
                          {item.kapak}
                        </td>
                        <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.ic}</td>
                        <td className="p-3 text-center font-black text-black text-[14px] md:text-[16px] bg-gray-50/30 group-hover:bg-primary/5 border-r border-gray-100 whitespace-nowrap transition-colors">{item.p500}</td>
                        <td className="p-3 text-center border-r border-gray-100">
                          <button 
                            onClick={() => openWhatsApp(item, 'Kapaklı Bloknot', '500 Cilt', item.p500)} 
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                          >
                            <ShoppingCart size={14} className="shrink-0" />
                            <span>Hemen Sipariş Ver</span>
                          </button>
                        </td>
                        <td className="p-3 text-center font-black text-black text-[14px] md:text-[16px] bg-gray-50/30 group-hover:bg-primary/5 border-r border-gray-100 whitespace-nowrap transition-colors">{item.p1000}</td>
                        <td className="p-3 text-center">
                          <button 
                            onClick={() => openWhatsApp(item, 'Kapaklı Bloknot', '1000 Cilt', item.p1000)} 
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                          >
                            <ShoppingCart size={14} className="shrink-0" />
                            <span>Hemen Sipariş Ver</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 px-5 py-5 border-t border-gray-150 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs font-sans">
            <span className="text-slate-500 font-bold">* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</span>
            <div className="grid grid-cols-2 sm:flex flex-wrap gap-2 w-full lg:w-auto">
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, Kapaklı Bloknot siparişi vermek istiyorum. Yardımcı olabilir misiniz?")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all shadow-md hover:shadow-lg text-center"
              >
                💬 HEMEN SİPARİŞ VER
              </a>
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, hazır bir logomuz/tasarımımız var. Ücretsiz baskı uygunluk kontrolü yaptırmak istiyoruz.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-secondary text-white hover:bg-black px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all shadow-md text-center"
              >
                📤 TASARIM GÖNDER / KONTROL ET
              </a>
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, Kapaklı/Kapaksız bloknot örneklerinden numune talep etmek istiyorum.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-white text-secondary hover:bg-gray-100 border border-gray-300 px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all text-center"
              >
                📦 NUMUNE İSTİYORUM
              </a>
              <a 
                href="/Mavi-Basim-Fiyat-Listesi.pdf"
                target="_blank" 
                className="inline-flex items-center justify-center gap-1.5 bg-primary/10 text-primary hover:bg-primary/25 border border-primary/20 px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all text-center"
              >
                📥 FİYAT LİSTESİNİ İNDİR (PDF)
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-6">
          <FireWarning />
        </div>

        {/* Kapaksız Bloknot Section */}
        <div className="mb-12 border border-gray-200 rounded-2xl overflow-visible shadow-xl relative z-10 bg-white">
          <div className="bg-secondary text-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center rounded-t-2xl">
            <h2 className="text-xl font-bold uppercase tracking-tight">Kapaksız Not Defteri</h2>
            <div className="text-right text-[10px] md:text-xs font-semibold">
              <p>50 Yapraklı Tutkallı Bloknot</p>
              <p>Alt karton baskısızdır.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans">
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th className="p-4 w-10"></th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap">KOD</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">İÇ YAPRAKLAR</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap text-center">500 CİLT</th>
                  <th className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center whitespace-nowrap border-r border-white/10">SİPARİŞ</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap text-center">1000 CİLT</th>
                  <th className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center whitespace-nowrap">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {BLOKNOTLAR_DATA.kapaksiz.map((group, gIdx) => (
                  <React.Fragment key={gIdx}>
                    {group.items.map((item, iIdx) => (
                      <tr key={iIdx} className="hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group border-b border-gray-100">
                        {iIdx === 0 && (
                          <td 
                            rowSpan={group.items.length} 
                            className={`${group.color} text-white font-black text-center p-3 w-10 border-r border-white/10`}
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            <span className="text-[12px] whitespace-nowrap tracking-widest">{group.ebat}</span>
                          </td>
                        )}
                        <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors whitespace-nowrap">{item.code}</td>
                        <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.ic}</td>
                        <td className="p-3 text-center font-black text-black text-[14px] md:text-[16px] bg-gray-50/30 group-hover:bg-primary/5 border-r border-gray-100 whitespace-nowrap transition-colors">{item.p500}</td>
                        <td className="p-3 text-center border-r border-gray-100">
                          <button 
                            onClick={() => openWhatsApp(item, 'Kapaksız Bloknot', '500 Cilt', item.p500)} 
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                          >
                            <ShoppingCart size={14} className="shrink-0" />
                            <span>Hemen Sipariş Ver</span>
                          </button>
                        </td>
                        <td className="p-3 text-center font-black text-black text-[14px] md:text-[16px] bg-gray-50/30 group-hover:bg-primary/5 border-r border-gray-100 whitespace-nowrap transition-colors">{item.p1000}</td>
                        <td className="p-3 text-center">
                          <button 
                            onClick={() => openWhatsApp(item, 'Kapaksız Bloknot', '1000 Cilt', item.p1000)} 
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                          >
                            <ShoppingCart size={14} className="shrink-0" />
                            <span>Hemen Sipariş Ver</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 px-5 py-5 border-t border-gray-150 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs font-sans">
            <span className="text-slate-500 font-bold">* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</span>
            <div className="grid grid-cols-2 sm:flex flex-wrap gap-2 w-full lg:w-auto">
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, Kapaksız Bloknot siparişi vermek istiyorum. Yardımcı olabilir misiniz?")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all shadow-md hover:shadow-lg text-center"
              >
                💬 HEMEN SİPARİŞ VER
              </a>
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, hazır bir logomuz/tasarımımız var. Kapaksız bloknot için baskı uygunluk kontrolü yaptırmak istiyoruz.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-secondary text-white hover:bg-black px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all shadow-md text-center"
              >
                📤 TASARIM GÖNDER / KONTROL ET
              </a>
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, Kapaksız bloknot örneklerinden numune talep etmek istiyorum.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-white text-secondary hover:bg-gray-100 border border-gray-300 px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all text-center"
              >
                📦 NUMUNE İSTİYORUM
              </a>
              <a 
                href="/Mavi-Basim-Fiyat-Listesi.pdf"
                target="_blank" 
                className="inline-flex items-center justify-center gap-1.5 bg-primary/10 text-primary hover:bg-primary/25 border border-primary/20 px-4 py-2.5 rounded-xl font-black uppercase tracking-wider text-[11px] transition-all text-center"
              >
                📥 FİYAT LİSTESİNİ İNDİR (PDF)
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-6">
          <FireWarning />
        </div>
        <div className="mb-12 p-5 bg-blue-50/40 border border-blue-150 rounded-2xl">
          <p className="text-xs sm:text-sm text-blue-950 font-bold leading-relaxed text-center">
            ℹ️ <strong className="text-primary font-extrabold">Fiyatlandırma Bilgilendirmesi:</strong> Promosyon Bloknot fiyatları; tercih edilen bloknot ebatları (9.4x14.3 cm veya 14x20 cm), kapak ve ciltleme modeli (Nezih kapak, mat/parlak selefon kaplama, laklı kapak), iç sayfa tasarım özellikleri ve toplam sipariş adedine bağlı olarak belirlenmektedir.
          </p>
        </div>

        {/* Teknik Bilgilendirme ve Güvence Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Üretim Toleransı Kartı */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-xs text-amber-950 font-semibold leading-relaxed">
            <h3 className="font-black text-amber-950 uppercase text-xs sm:text-sm flex items-center gap-1.5 mb-3">
              ⚠️ Üretim Toleransı & Fiyatlandırma Güvencesi
            </h3>
            <p className="mb-2">
              Ofset baskı ve ciltleme süreçlerinde makine ayarları nedeniyle <strong>%1 ila %5 arasında fire (ürün adetlerinde eksiklik veya fazlalık)</strong> oluşması teknik bir standarttır.
            </p>
            <p>
              Mavi Basım olarak dürüst ticaret ilkemiz gereğince; eksik teslimat durumunda teslim edilmeyen adetlerin bedeli faturanızdan kesilerek <strong>anında tarafınıza iade edilir</strong> veya sonraki siparişiniz için indirim tanımlanır. Size teslim edilmeyen hiçbir ürünün ücreti yansıtılmaz.
            </p>
          </div>

          {/* Özel Kesim Kapak Detayları Kartı */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 text-xs text-blue-950 font-semibold leading-relaxed">
            <h3 className="font-black text-blue-950 uppercase text-xs sm:text-sm flex items-center gap-1.5 mb-3">
              💡 Özel Kesim Kapak Farkı Detayları (550 TL Fark)
            </h3>
            <p className="mb-2">
              Kapaklı modellerimizin başlığında yer alan <strong>"Özel kesim kapak farkı 550 TL'dir"</strong> ibaresi şu hususları kapsar:
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Kapsam:</strong> Standart düz kesim yerine, ön kapağa markanızın logosuna özel dış kontur kesimleri, oval köşeler veya pencereli oyma pencereler uygulanmasını kapsar.</li>
              <li><strong>Hangi Ürünlerde?:</strong> Sadece 350 gr Kuşe ön kapağı olan Amerikan ciltli Kapaklı Bloknot modellerinde uygulanabilir.</li>
              <li><strong>Limit Sınırı:</strong> Minimum ölçü sınırı yoktur. Grafik ekibimiz logonuzun kesim hattını üretime en uygun şekilde optimize eder.</li>
            </ul>
          </div>
        </div>

        {/* KAPAK SEÇENEKLERİ REHBERİ VE KARAR VERME TABLOSU (POINT 3 & 7) */}
        <div className="mb-14 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="mb-8">
            <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-black uppercase tracking-wider">
              KAPAK SEÇENEKLERİ & KARAR REHBERİ
            </span>
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight mt-2 flex items-center gap-2">
              📊 Bloknot Kapak Seçenekleri & Karşılaştırma Tablosu
            </h2>
            <p className="text-xs sm:text-sm text-gray-550 mt-1 font-semibold leading-relaxed">
              Fiyat tablomuzda yer alan <strong>NK, CYP, CYM ve CYML4</strong> kodlarının detaylı açıklamalarını ve projenize en uygun bloknot modelini aşağıdaki tablodan tek bakışta inceleyebilirsiniz.
            </p>
          </div>

          {/* 1. Kapak Seçenekleri Kartları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="border border-gray-150 rounded-2xl p-4 bg-gray-50/50 hover:bg-white hover:border-gray-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs text-slate-400 font-bold">KOD: NK</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded">💰 BÜTÇE DOSTU</span>
                </div>
                <h3 className="font-black text-sm text-gray-900 uppercase mt-1 mb-2">Nezih Kapak (Standart)</h3>
                <p className="text-[11px] text-gray-650 font-medium leading-relaxed">
                  350 gr mat kuşe karton üzerine selefon (koruyucu kaplama) uygulanmayan en ekonomik kapak seçeneğidir. Hızlı dağıtımlar ve bütçe dostu promosyon projeleri için mükemmeldir.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-bold">Fiyat Seviyesi: Taban Fiyat</div>
            </div>
            <div className="border border-gray-150 rounded-2xl p-4 bg-gray-50/50 hover:bg-white hover:border-emerald-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs text-emerald-500 font-black">KOD: CYP</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded">⚡ EKONOMİK SELEFON</span>
                </div>
                <h3 className="font-black text-sm text-emerald-900 uppercase mt-1 mb-2">Ciltli Yarı-Parlak (Parlak Selefonlu)</h3>
                <p className="text-[11px] text-gray-650 font-medium leading-relaxed">
                  Kapak üzerine uygulanan parlak koruyucu selefon sayesinde renkler çok daha canlı, parlak ve dikkat çekici görünür. Kapağı çizilmelere ve suya karşı korur.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-bold">Fiyat Seviyesi: Ekonomik (+%10)</div>
            </div>
            <div className="border border-gray-150 rounded-2xl p-4 bg-gray-50/50 hover:bg-white hover:border-primary/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs text-primary font-black">KOD: CYM</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded">⭐ EN ÇOK SATAN</span>
                </div>
                <h3 className="font-black text-sm text-primary uppercase mt-1 mb-2">Ciltli Yüzey Mat (Mat Selefonlu)</h3>
                <p className="text-[11px] text-gray-650 font-medium leading-relaxed">
                  Kapak üzerine çekilen özel mat selefon, bloknota son derece elit, kadifemsi ve yansıma yapmayan ağır bir duruş kazandırır. Kurumsal kimlik projelerinde en çok tercih edilen seçenektir.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-bold">Fiyat Seviyesi: Standart Fiyat (+%12)</div>
            </div>
            <div className="border border-gray-150 rounded-2xl p-4 bg-gray-50/50 hover:bg-white hover:border-amber-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs text-amber-600 font-black">KOD: CYML4</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded">👑 PRESTİJLİ LÜKS</span>
                </div>
                <h3 className="font-black text-sm text-amber-950 uppercase mt-1 mb-2">Ciltli Mat + Lokal Laklı</h3>
                <p className="text-[11px] text-gray-650 font-medium leading-relaxed">
                  Mat selefonlu kapağın üzerindeki logo veya başlık gibi belirli alanlara parlak lak uygulanarak kabartma hissi ve görsel derinlik kazandırılan en lüks/prestijli kapak seçeneğidir.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-bold">Fiyat Seviyesi: Premium Segment (+%25)</div>
            </div>
          </div>

          {/* 2. Karşılaştırma / Karar Verme Tablosu */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="bg-slate-900 text-white text-[11px] sm:text-xs uppercase font-black tracking-wider">
                  <th className="p-3">Bloknot Türü</th>
                  <th className="p-3">Kapak & Cilt Türü</th>
                  <th className="p-3">En Uygun Olduğu Kullanım Alanı</th>
                  <th className="p-3 text-center">Fiyat Seviyesi / Bütçe Etkisi</th>
                  <th className="p-3 text-center">Ekonomiklik</th>
                  <th className="p-3 text-center">Prestij Puanı</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-xs text-gray-700 font-medium">
                <tr className="hover:bg-slate-50 transition-all">
                  <td className="p-3 font-bold text-slate-950 text-xs sm:text-sm">A5 Kapaklı (14x20 cm)</td>
                  <td className="p-3">350 gr Kuşe Kapak + Amerikan Cilt</td>
                  <td className="p-3">Fuar ve kongre dağıtımları, bayi toplantıları, prestijli kurumsal hediyeler.</td>
                  <td className="p-3 text-center text-slate-600 font-bold">Dengeli Yatırım (Orta Segment)</td>
                  <td className="p-3 text-center text-amber-600 font-bold">Orta / Dengeli</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐⭐ Premium</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-all">
                  <td className="p-3 font-bold text-slate-950 text-xs sm:text-sm">A6 Kapaklı (9.4x14.3 cm)</td>
                  <td className="p-3">350 gr Kuşe Kapak + Amerikan Cilt</td>
                  <td className="p-3">Saha satış ekipleri, şantiye/doktor cep notları, mobil kullanıma uygun pratik tanıtım.</td>
                  <td className="p-3 text-center text-emerald-600 font-bold">Ekonomik Tanıtım (Bütçe Dostu)</td>
                  <td className="p-3 text-center text-emerald-600 font-bold">Yüksek</td>
                  <td className="p-3 text-center">⭐⭐⭐⭐ Prestijli</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-all">
                  <td className="p-3 font-bold text-slate-950 text-xs sm:text-sm">A5 Kapaksız (14x20 cm)</td>
                  <td className="p-3">Kapaksız + Üstten Tutkal Cilt</td>
                  <td className="p-3">Şirket içi ofis masaları, dahili not alma, eğitim kurumları, hızlı eskiz.</td>
                  <td className="p-3 text-center text-emerald-700 font-black">Düşük Bütçeli (Maksimum Tasarruf)</td>
                  <td className="p-3 text-center text-emerald-600 font-black">Çok Yüksek</td>
                  <td className="p-3 text-center">⭐⭐⭐ Standart</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-all">
                  <td className="p-3 font-bold text-slate-950 text-xs sm:text-sm">A6 Kapaksız (9.4x14.3 cm)</td>
                  <td className="p-3">Kapaksız + Üstten Tutkal Cilt</td>
                  <td className="p-3">Reçete defterleri, restoran sipariş fişleri, çok yoğun adetli kitle dağıtımları.</td>
                  <td className="p-3 text-center text-emerald-700 font-black">En Düşük Maliyet (Yüksek Adetli)</td>
                  <td className="p-3 text-center text-emerald-600 font-black">⭐⭐⭐⭐⭐ Maksimum</td>
                  <td className="p-3 text-center">⭐⭐ Temel Sınıf</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6 RESİMLİ ÜRÜN GALERİSİ */}
        <div className="mt-16 mb-12 text-black scroll-mt-24" id="galeri">
          <div className="flex items-center gap-3 mb-4 px-2">
            <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Promosyon ve Kapaklı Bloknot Galeri
            </h2>
          </div>

          {/* Alt Başlık 1: Ürün Görselleri */}
          <div className="mb-6 px-2">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-800 uppercase tracking-tight border-b border-gray-200 pb-2 flex items-center gap-2">
              📸 1. Ürün Görselleri (Detaylar ve Teknik Yapı)
            </h3>
            <p className="text-xs text-gray-550 mt-1 font-semibold leading-relaxed">
              Ürünlerimizin sırt kalınlığı, kapak dokusu, ciltleme dayanıklılığı ve iç sayfa netliğini yakından inceleyin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {BLOKNOT_DETAILS.gallery.map((img, idx) => (
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

          {/* Alt Başlık 2: Kullanım Görselleri */}
          <div className="mb-6 px-2 mt-12">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-800 uppercase tracking-tight border-b border-gray-200 pb-2 flex items-center gap-2">
              💼 2. Ürün Kullanım Görselleri (Saha ve Ofis Uygulamaları)
            </h3>
            <p className="text-xs text-gray-550 mt-1 font-semibold leading-relaxed">
              Bloknotlarımızın kurumsal ofislerden saha satış ekiplerine kadar farklı alanlardaki gerçek kullanım senaryolarını görüntüleyin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BLOKNOT_DETAILS.usageGallery && BLOKNOT_DETAILS.usageGallery.map((img, idx) => (
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

        {/* ÜRÜN VARYASYONU KARŞILAŞTIRMA TABLOSU */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Kapaklı vs. Kapaksız Bloknot Karşılaştırması
            </h2>
          </div>
          <div className="overflow-x-auto border border-gray-300 rounded-2xl shadow-md">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-semibold">
              <thead>
                <tr className="bg-secondary text-white uppercase tracking-wider text-[11px] md:text-xs">
                  <th className="p-3 border-b border-gray-300">ÖZELLİK</th>
                  <th className="p-3 border-b border-gray-300 bg-primary/10 text-primary">KAPAKLI BLOKNOT</th>
                  <th className="p-3 border-b border-gray-300">KAPAKSIZ BLOKNOT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="p-3 font-black text-gray-900 bg-gray-50">Ön Kapak</td>
                  <td className="p-3 text-primary bg-primary/5">350 gr Kuşe Karton, Koruyucu Selefonlu</td>
                  <td className="p-3 text-gray-700">Kapak Bulunmaz (Doğrudan Not Sayfaları)</td>
                </tr>
                <tr>
                  <td className="p-3 font-black text-gray-900 bg-gray-50">Ciltleme Tipi</td>
                  <td className="p-3 text-primary bg-primary/5">Amerikan Cilt (Sağlam Sırt Yapıştırma)</td>
                  <td className="p-3 text-gray-700">Ekonomik Üstten Tutkallı Cilt</td>
                </tr>
                <tr>
                  <td className="p-3 font-black text-gray-900 bg-gray-50">Dayanıklılık</td>
                  <td className="p-3 text-primary bg-primary/5">Çantada taşımaya ve uzun süreli arşivlemeye uygun</td>
                  <td className="p-3 text-gray-700">Masaüstü hızlı not alma ve koparmaya özel</td>
                </tr>
                <tr>
                  <td className="p-3 font-black text-gray-900 bg-gray-50">Kullanım Amacı</td>
                  <td className="p-3 text-primary bg-primary/5">Kurumsal Prestij Dağıtımı & Bayi Hediyeleri</td>
                  <td className="p-3 text-gray-700">Saha Personeli, Ofis İçi Pratik Kullanım</td>
                </tr>
                <tr>
                  <td className="p-3 font-black text-gray-900 bg-gray-50">Fiyat Avantajı</td>
                  <td className="p-3 text-primary bg-primary/5">Premium Segment, Yüksek Reklam Değeri</td>
                  <td className="p-3 text-gray-700">Ekonomik Fiyat, Toptan Alımda Maksimum Tasarruf</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* CTA for Comparison Table */}
          <div className="mt-4 flex flex-col sm:flex-row justify-end items-center gap-3">
            <a 
              href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, Kapaklı ve Kapaksız bloknot karşılaştırmasını inceledim. Bizim için en uygun modeli belirleyip sipariş vermek istiyorum.")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 px-4 py-2 rounded-full text-xs font-black uppercase transition-all shadow-sm"
            >
              💬 Karşılaştırmaya Göre Teklif Al
            </a>
          </div>
        </div>

        {/* Neden Promosyon ve Kapaklı Bloknot Tercih Edilmelidir? */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-2.5 h-6 bg-secondary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Neden Promosyon ve Kapaklı Bloknot Tercih Edilmelidir?
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-150 rounded-3xl p-6 md:p-8 space-y-4 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650">
            <p>
              Günümüz kurumsal tanıtım dünyasında, masalarda sürekli yer bulan fiziksel materyaller uzun vadeli marka prestiji için büyük öneme sahiptir. <strong className="text-black">Tanıtım not defterleri ve kapaklı bloknotlar</strong>, diğer broşür veya kartvizitlere kıyasla hedef kitlenizin çalışma masasında en çok kullanılan alanda kendine yer bulur. Not defterleri, müşterilerinizin günlük iş akışında sürekli el altında bulundurduğu pratik ve uzun ömürlü bir ofis materyalidir. Düşük birim maliyetine karşılık yüksek marka bilinirliği sağlayan son derece ekonomik bir tanıtım yatırımıdır.
            </p>
            {/* İÇ LİNKLER BÖLÜMÜ */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="font-bold text-black mb-2 uppercase text-xs">Kurumsal Setinizi Tamamlayacak Alakalı Ürünlerimiz:</p>
              <div className="flex flex-wrap gap-2">
                <Link to="/kup-bloknot" className="bg-white hover:bg-primary/10 text-primary hover:text-secondary border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                  Küp Bloknot Baskısı
                </Link>
                <Link to="/dosyalar" className="bg-white hover:bg-primary/10 text-primary hover:text-secondary border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                  Cepli Dosya Baskısı
                </Link>
                <Link to="/antetli" className="bg-white hover:bg-primary/10 text-primary hover:text-secondary border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                  Antetli Kağıt Baskısı
                </Link>
                <Link to="/kartvizit" className="bg-white hover:bg-primary/10 text-primary hover:text-secondary border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                  Kartvizit Baskısı
                </Link>
                <Link to="/zarf" className="bg-white hover:bg-primary/10 text-primary hover:text-secondary border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                  Zarf Baskısı
                </Link>
              </div>
            </div>

            {/* Hızlı Fiyat Geçiş CTA */}
            <div className="mt-4 pt-4 border-t border-gray-150 flex flex-col sm:flex-row justify-end items-center gap-3">
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, promosyon ve kapaklı bloknot için özel ölçü, farklı adet veya farklı özelliklerde özel fiyat teklifi alabilir miyim?")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 px-4 py-2 rounded-full text-xs font-black uppercase transition-all shadow-sm"
              >
                💬 Özel Ölçü/Teklif Al (WhatsApp)
              </a>
            </div>
          </div>
        </div>

        {/* MALZEME & TEKNİK ÖZELLİKLER */}
        <div className="mb-12 text-black">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Malzeme & Teknik Özellikler
              </h2>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch font-medium">
              
              {/* 80 gr 1. Hamur Kağıt */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">80 gr 1. Hamur</h3>
                  <ul className="text-xs text-gray-750 space-y-2 list-none font-semibold">
                    <li><strong className="text-black">Yaprak kağıt kalınlığı:</strong> 80 gr/m²</li>
                    <li><strong className="text-black">Yazım konforu:</strong> Tükenmez, kurşun ve dolma kalemle pürüzsüz yazım</li>
                    <li><strong className="text-black">Yüzey kalitesi:</strong> Parlak beyaz zemin üzerine yüksek kontrastlı ofset baskı</li>
                  </ul>
                </div>
              </div>

              {/* 350 gr Kuşe Kapak */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">350 gr Kuşe Kapak</h3>
                  <ul className="text-xs text-gray-750 space-y-2 list-none font-semibold">
                    <li><strong className="text-black">Karton ağırlığı:</strong> 350 gr/m²</li>
                    <li><strong className="text-black">Kapak türü:</strong> Kalın parlak kuşe (sağlam ve rijit kapak)</li>
                    <li><strong className="text-black">Dayanıklılık:</strong> Çantada veya masada nem ve yıpranmayı önleyen koruyucu selefon kaplaması</li>
                  </ul>
                </div>
              </div>

              {/* Mat / Parlak Selefon */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">Koruyucu Selefon</h3>
                  <ul className="text-xs text-gray-750 space-y-2 list-none font-semibold">
                    <li><strong className="text-black">Yüzey koruması:</strong> Çizilmelere ve solmaya karşı mat/parlak selefon</li>
                    <li><strong className="text-black">Nem direnci:</strong> Ofis masalarındaki dökülmelere karşı mukavemetli yüzey</li>
                    <li><strong className="text-black">Dokunma hissi:</strong> Premium ve lüks karton hissi</li>
                  </ul>
                </div>
              </div>

              {/* Cilt Seçenekleri */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">Cilt Seçenekleri</h3>
                  <ul className="text-xs text-gray-750 space-y-2 list-none font-semibold">
                    <li><strong className="text-black">Tutkallı Cilt:</strong> Üst kısımdan cilt tutkalıyla birleştirilmiş koparmalı model</li>
                    <li><strong className="text-black">Amerikan Cilt:</strong> Kapaklı modeller için son derece sağlam sırt yapıştırması</li>
                    <li><strong className="text-black">Pratiklik:</strong> Sayfaların çanta içinde dağılmasını önleyen pürüzsüz mekanizma</li>
                  </ul>
                </div>
              </div>

            </div>
            {/* CTA for Technical Specs */}
            <div className="pt-4 border-t border-gray-150 flex flex-col sm:flex-row justify-end items-center gap-3">
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, promosyon bloknot malzeme ve teknik özelliklerini inceledim. Bizim için baskı yaptırmak istiyoruz.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 px-4 py-2 rounded-full text-xs font-black uppercase transition-all shadow-sm"
              >
                💬 Baskı Malzemeleri Hakkında Bilgi Al
              </a>
            </div>
          </div>
        </div>

        {/* EBAT VE BOYUT KARŞILAŞTIRMA TABLOSU */}
        <div id="teknik-ozellikler" className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Ebat & Boyut Seçenekleri
            </h2>
          </div>
          <div className="overflow-x-auto border border-gray-300 rounded-2xl shadow-md">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-semibold">
              <thead>
                <tr className="bg-secondary text-white uppercase tracking-wider text-[11px] md:text-xs">
                  <th className="p-3 border-b border-gray-300">EBAT ADI</th>
                  <th className="p-3 border-b border-gray-300">ÖLÇÜ (cm)</th>
                  <th className="p-3 border-b border-gray-300">YAPRAK SAYISI</th>
                  <th className="p-3 border-b border-gray-300">EN UYGUN SEKTÖRLER & KULLANIM ALANI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
                <tr>
                  <td className="p-3 font-black text-black bg-gray-50">9.4x14.3 cm</td>
                  <td className="p-3 font-bold text-primary">9.4 x 14.3 cm</td>
                  <td className="p-3">50 Yaprak</td>
                  <td className="p-3">Cep boy olup saha personeli, doktorlar ve ilaç firmaları için mükemmeldir.</td>
                </tr>
                <tr>
                  <td className="p-3 font-black text-black bg-gray-50">14x20 cm</td>
                  <td className="p-3 font-bold text-primary">14.0 x 20.0 cm</td>
                  <td className="p-3">50 Yaprak</td>
                  <td className="p-3">Standart defter boyudur. Toplantı notları, tasarım eskizleri ve ofis masaları için en popüler ebattır.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tasarım, Üretim & Sipariş Verme Süreci */}
        <section className="bg-white p-8 rounded-[32px] border border-gray-150 shadow-sm scroll-mt-24 mb-12" id="siparis-sureci">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Tasarım, Üretim & Sipariş Verme Süreci
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-gray-650 font-semibold leading-relaxed mb-6">
            Kurumsal bloknot siparişinizi oluşturmak, mizanpaj onayını vermek ve fabrikada üretime almak son derece pratik ve şeffaftır. Tüm üretim akışımız adım adım şu şekildedir:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650 mb-6">
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-150 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">1</span>
                  <h3 className="font-black text-black uppercase text-[11px]">Sipariş & Taslak (Aynı Gün)</h3>
                </div>
                <p className="text-[11px]">WhatsApp hattımızdan adet, cilt şekli ve özellik taleplerinizi belirterek siparişinizi anında başlatırsınız.</p>
              </div>
            </div>

            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-150 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">2</span>
                  <h3 className="font-black text-black uppercase text-[11px]">Mizanpaj & Prova (24 Saat)</h3>
                </div>
                <p className="text-[11px]">Logonuzu iletirsiniz. Grafik ekibimiz mizanpaj şablonunu ve PDF provasını hazırlar. <strong>3 adet ücretsiz revize hakkınız</strong> vardır. Onayınızdan sonra kalıp alındığından tasarımda değişiklik yapılamaz.</p>
              </div>
            </div>

            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-150 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">3</span>
                  <h3 className="font-black text-black uppercase text-[11px]">Ofset Baskı (3-4 Gün)</h3>
                </div>
                <p className="text-[11px]">Baskı onayınızın ardından, Heidelberg ofset makinelerimizde 80 gram birinci sınıf beyaz kağıtlara kurumsal logonuz tam renk doğruluğuyla basılır.</p>
              </div>
            </div>

            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-150 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">4</span>
                  <h3 className="font-black text-black uppercase text-[11px]">Selefon & Mücellit (2-3 Gün)</h3>
                </div>
                <p className="text-[11px]">Mukavemetli 350 gr kuşe kapağa koruyucu mat/parlak selefon kaplanır. Amerikan cilt sırt yapıştırması veya ekonomik üstten tutkallama işlemleri tamamlanır.</p>
              </div>
            </div>

            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-150 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">5</span>
                  <h3 className="font-black text-black uppercase text-[11px]">Koruyucu Paket & Sevk (1 Gün)</h3>
                </div>
                <p className="text-[11px]">Bloknotlar çift kat Kraft kolilere yerleştirilir. İstanbul içi kendi araçlarımızla veya şehir dışı sigortalı lojistikle sevk edilip takip numarası iletilir.</p>
              </div>
            </div>
          </div>

          {/* Ödeme Seçenekleri (Item 14) */}
          <div className="mt-8 pt-6 border-t border-gray-150 text-black">
            <h3 className="text-base sm:text-lg font-black uppercase text-black mb-3 flex items-center gap-2">
              💳 Ödeme Seçenekleri & Resmi Faturalandırma
            </h3>
            <div className="bg-slate-50 p-5 rounded-2xl border border-gray-150 text-xs sm:text-sm font-semibold leading-relaxed text-gray-700 space-y-3">
              <p>
                Siparişinizi tamamladıktan ve hazırlanan dijital PDF provasına onay verdikten sonra ödeme ve faturalandırma işlemleriniz şu şekilde yürütülür:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs font-bold text-gray-650">
                <li><strong>Kolay Havale / EFT:</strong> Ödemelerinizi kurumsal banka hesaplarımıza dilediğiniz banka üzerinden Havale veya FAST/EFT ile güvenli şekilde yapabilirsiniz.</li>
                <li><strong>Resmi %20 KDV'li Kurumsal Fatura:</strong> Mavi Basım bünyesinde yapılan her promosyon çalışması gibi bloknot imalatlarımız da tamamen faturalıdır. Sektörel mevzuat gereğince <strong>%20 KDV'li kurumsal e-Fatura</strong> düzenlenerek sevkiyat gününde kayıtlı mail adresinize gönderilir.</li>
                <li><strong>Üretim Başlangıç Koşulu:</strong> Özel sipariş üretim planlamasına dahil edilmek ve basım kalıbınızın çıkarılabilmesi için ödemenin şirket hesaplarımıza ulaşmış olması gerekmektedir.</li>
              </ul>
            </div>
          </div>

          {/* Fiyat Listesine Geçiş CTA */}
          <div className="pt-4 border-t border-gray-150 flex flex-col sm:flex-row justify-end items-center gap-3">
            <a 
              href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, promosyon bloknot sipariş süreci ve üretim zaman çizelgesi hakkında bilgi alıp sipariş vermek istiyorum.")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 px-4 py-2 rounded-full text-xs font-black uppercase transition-all shadow-sm"
            >
              💬 Özel Ölçü/Teklif Al (WhatsApp)
            </a>
          </div>
        </section>

        {/* Matbaa Parkurumuz & Üretim Güvencemiz */}
        <section className="bg-white p-8 rounded-[32px] border border-gray-150 shadow-sm scroll-mt-24 mb-12" id="matbaa-parkurumuz">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Matbaa Parkurumuz & Üretim Güvencemiz
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-650 font-semibold leading-relaxed mb-6">
            Siparişlerinizi doğrudan <strong className="text-black">İstanbul Topkapı Matbaacılar Sitesi'ndeki</strong> kendi tesisimizde üretiyoruz. Deneyimli ustalarımız yönetiminde, günlük <strong className="text-black">5.000 adet</strong> bloknot üretim kapasitemizle kurumsal projelerinizi sorunsuzca yürütüyor ve kargo merkezlerine yakın konumumuz sayesinde sevkiyatlarınızı hızla yapıyoruz. İstanbul Topkapı'daki modern entegre matbaa tesisimizde ürettiğimiz promosyon bloknot siparişlerini, başta Ankara, İzmir, Bursa ve Kocaeli olmak üzere Türkiye genelindeki tüm il ve ilçelerimize hasarsız sevkiyat ağımızla güvenle ulaştırıyoruz.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-semibold text-gray-700 mb-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-gray-150">
              <h3 className="font-black text-black uppercase text-xs mb-1.5">Ofset Baskı Parkuru</h3>
              <p className="text-[11px] leading-relaxed">Heidelberg ofset makinelerimizde kurumsal logonuz yüksek renk hassasiyeti ve netlikle basılır.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-gray-150">
              <h3 className="font-black text-black uppercase text-xs mb-1.5">Amerikan Cilt & Tutkal</h3>
              <p className="text-[11px] leading-relaxed">Kapaklılarda Amerikan cilt, kapaksızlarda ise esnek ve sayfa kopması yaşatmayan özel tutkallama kullanılır.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-gray-150">
              <h3 className="font-black text-black uppercase text-xs mb-1.5">Hasarsız Çift Kat Paket</h3>
              <p className="text-[11px] leading-relaxed">Ezilme ve yıpranmaları önlemek adına ürünler çift kat mikro-doping mukavva kolilerde sevk edilir.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-gray-150">
              <h3 className="font-black text-black uppercase text-xs mb-1.5">Kalite Kontrol</h3>
              <p className="text-[11px] leading-relaxed">Her bir ürün tutkal kalitesi, selefon kaplaması ve baskı hizalaması açısından detaylıca incelenir.</p>
            </div>
          </div>
 
          {/* %100 Hata Çözüm ve Koşulsuz Yeniden Basım Garantisi */}
          <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-6 text-black">
            <div className="space-y-2 max-w-3xl text-left">
              <h3 className="font-black text-rose-950 uppercase text-xs sm:text-sm flex items-center gap-1.5">
                🛡️ %100 Hata Çözüm ve Koşulsuz Yeniden Basım Garantisi
              </h3>
              <p className="text-xs text-rose-900 leading-relaxed font-semibold">
                <strong>Matbaa Sorumluluğu & Kapsam:</strong> Üretici hatasından kaynaklanan baskı kayması, bariz renk sapması, yanlış/kusurlu ciltleme ve kargoda oluşabilecek ambalaj hasarı durumlarında, hiçbir ek ücret talep etmeksizin siparişinizin tamamını <strong>koşulsuz olarak baştan üretiyor</strong> ve adresinize en hızlı şekilde sevk ediyoruz.
              </p>
              <p className="text-xs text-rose-800 leading-relaxed font-semibold">
                <strong>Garanti Kapsamı Sınırları (Önemli):</strong> Tarafınızca kontrol edilip dijital olarak onaylanmış PDF baskı provasında yer alan <strong>yazım (imla) hataları, yanlış adres/telefon bilgileri, düşük çözünürlüklü görseller veya hatalı gönderilen grafik dosyaları</strong> garanti kapsamı dışındadır. Bu nedenle baskı onayından önce PDF provasını dikkatle incelemenizi önemle rica ederiz.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-slate-50 p-8 rounded-[32px] border border-gray-200 shadow-sm scroll-mt-24 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Gerçek Müşteri Çalışmaları
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-650 font-semibold leading-relaxed mb-6">
            Mavi Basım olarak bugüne kadar yüzlerce kurumsal marka için özel promosyon bloknot üretimi gerçekleştirdik. İşte son dönemde başarıyla tamamlayıp teslim ettiğimiz gerçek müşteri projelerimizden bazıları:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                client: "ABC Uluslararası Lojistik",
                industry: "Lojistik & Nakliyat",
                details: "1.000 Adet - A5 Boyut",
                spec: "Kapaklı - Mat Selefonlu Ön Kapak"
              },
              {
                client: "Global Gümrük Müşavirliği",
                industry: "Gümrük & Dış Ticaret",
                details: "500 Adet - A5 Boyut",
                spec: "Tutkallı Kapaksız Not Defteri"
              },
              {
                client: "Limit Sigorta Acenteliği",
                industry: "Sigorta & Finans",
                details: "2.500 Adet - A5 Boyut",
                spec: "Kapaklı - Parlak Selefonlu"
              },
              {
                client: "Merkez Ortodonti Kliniği",
                industry: "Sağlık & Medikal",
                details: "1.000 Adet - A6 Boyut",
                spec: "Kapaklı - Mat Selefon + Lokal Laklı"
              }
            ].map((proj, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] bg-primary/10 text-primary font-black uppercase px-2 py-0.5 rounded-full mb-2 inline-block">
                    {proj.industry}
                  </span>
                  <h3 className="font-black text-black text-sm uppercase mb-1.5 leading-tight">{proj.client}</h3>
                  <ul className="text-xs text-gray-600 space-y-1 font-semibold list-none pl-0">
                    <li><strong>Üretim Adedi:</strong> {proj.details}</li>
                    <li><strong>Özellikler:</strong> {proj.spec}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Hızlı ve Hasarsız Sevkiyat CTA (Point 4) */}
          <div className="mt-8 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl shrink-0">🚚</span>
              <p className="text-xs sm:text-sm text-emerald-950 font-extrabold leading-relaxed">
                Anadolu Geneline Hasarsız ve Hızlı Teslimat! Siparişleriniz sigortalı korumalı çift kat kolilerimizle Türkiye'nin her yerine hasarsız ulaştırılır.
              </p>
            </div>
            <a 
              href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, Merkez Ortodonti Kliniği referansınızı gördüm. Şehrimize hasarsız sevkiyat güvenceli bloknot siparişi için bilgi almak istiyorum.")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black uppercase px-5 py-2.5 rounded-xl transition-all shadow-md text-center whitespace-nowrap shrink-0"
            >
              💬 HEMEN TEKLİF AL (WHATSAPP)
            </a>
          </div>
        </section>

        {/* Anadolu Geneline Hasarsız ve Hızlı Teslimat Güvencesi */}
        <section className="bg-white p-8 rounded-[32px] border border-gray-150 shadow-sm scroll-mt-24 mb-12" id="anadolu-teslimat">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-6 bg-emerald-500 rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Anadolu Geneline Hasarsız ve Hızlı Teslimat
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650">
            <div className="space-y-4 lg:col-span-2">
              <p>
                Türkiye'nin 81 iline ve tüm sanayi bölgelerine (Ankara Ostim, İzmir Kemalpaşa, Bursa, Gaziantep, Konya, Kocaeli, Adana başta olmak üzere) <strong className="text-black">sigortalı ve hasarsız kargo güvencesiyle</strong> sevkiyat yapıyoruz. OSB'ler ve holdinglerin lojistik beklentilerini tam olarak karşılıyoruz.
              </p>
              <p>
                <strong className="text-black">Lojistik Güvencelerimiz:</strong> Çok şubeli markalar için <strong className="text-black">şube bazlı paketleme</strong> ve kurumsal irsaliye yönetimi yapıyoruz. Bloknotları nem geçirmez koruyucu şirink naylonlarla kaplayıp, dayanıklı çift kat Kraft kolilerde sevk ediyoruz. Siparişiniz masanıza fabrikadan çıktığı günkü gibi hasarsız ulaşır.
              </p>

              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-150 space-y-3 mt-4 text-xs font-semibold text-gray-700">
                <span className="text-primary font-black block uppercase text-[11px] tracking-wide">💼 Hangi Sektör İçin Hangi Bloknot Modeli Daha Uygun?</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <strong className="text-black block font-bold text-xs">🏭 Organize Sanayi & Ağır Sanayi</strong>
                    <p className="text-gray-550 leading-relaxed text-[11px]">
                      <strong>Önerilen:</strong> A5 Kapaksız Tutkallı Not Defteri.<br />
                      <em>Neden:</em> Sahada ve üretim hattında anlık not alınıp sayfaların kolayca koparılıp ilgili personele hızlıca iletilmesi gerektiği için kapaksız, hızlı erişimli tutkallı modeller tercih edilir.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-black block font-bold text-xs">🩺 Sağlık, İlaç & Medikal Sektörü</strong>
                    <p className="text-gray-550 leading-relaxed text-[11px]">
                      <strong>Önerilen:</strong> A6 Kapaklı Amerikan Ciltli Bloknot (Mat Selefonlu).<br />
                      <em>Neden:</em> Doktor ve eczacıların önlük cebinde taşınabileceği boyuttadır. Ön kapağın koruyucu selefonu sayesinde cebe girip çıkarken yıpranmaz ve prestijli görünümünü korur.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-black block font-bold text-xs">🏫 Eğitim Kurumları & Okullar</strong>
                    <p className="text-gray-550 leading-relaxed text-[11px]">
                      <strong>Önerilen:</strong> A5 Kapaksız Çizgili/Kareli Not Defteri.<br />
                      <em>Neden:</em> Çok sayıda öğrenci ve öğretmene dağıtıldığı için birim maliyeti en düşük modeldir. İç sayfaların çizgili veya kareli basılabilmesi, derslerde aktif kullanımı destekler.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-black block font-bold text-xs">🏦 Finans, Lojistik & Kurumsal Şirketler</strong>
                    <p className="text-gray-550 leading-relaxed text-[11px]">
                      <strong>Önerilen:</strong> A5 Kapaklı Lokal Laklı & Mat Selefonlu Bloknot.<br />
                      <em>Neden:</em> Müşteri görüşmelerinde, bayi toplantılarında ve kurumsal ziyaretlerde en üst düzey prestiji temsil eder. Kapağın kabartmalı lokal laklı yapısı kalitesini yansıtır.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 flex flex-col justify-between text-black">
              <div>
                <h3 className="font-black uppercase text-xs text-emerald-800 mb-2">📌 Şehir Dışı Sipariş Süreci Nasıl İşler?</h3>
                <ul className="space-y-2 text-xs list-none pl-0 font-medium text-gray-700">
                  <li className="flex items-start gap-1.5">💬 <span className="text-[11px]">WhatsApp'tan bilgilerinizi iletip dijital taslak onayını verirsiniz.</span></li>
                  <li className="flex items-start gap-1.5">💳 <span className="text-[11px]">Ödeme işleminin ardından siparişiniz anında üretim planına dahil edilir.</span></li>
                  <li className="flex items-start gap-1.5">🚚 <span className="text-[11px]">Üretim bitiminde şube adreslerinize göre sevk edilip kargo takip bilgileri iletilir.</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Fiyat Listesine Geçiş CTA */}
          <div className="mt-6 pt-4 border-t border-gray-150 flex flex-col sm:flex-row justify-end items-center gap-3">
            <a 
              href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, Anadolu teslimat güvencesi ile şehrimize kargo sevkiyatı yapılacak promosyon bloknot siparişi için teklif alabilir miyim?")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 px-4 py-2 rounded-full text-xs font-black uppercase transition-all shadow-sm"
            >
              💬 Özel Ölçü/Teklif Al (WhatsApp)
            </a>
          </div>
        </section>

        {/* SSS (FAQ) ALANI */}
        <div className="mb-14 text-black scroll-mt-24">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Sıkça Sorulan Sorular
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {BLOKNOT_DETAILS.faqList.map((faq, idx) => (
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



        {/* Blog Rehberleri */}
        <div className="my-10">
          <RelatedBlogPosts category="bloknot" />
        </div>

      </div>
      <ProductSEOSection categoryKey="bloknot" />
    </div>
  );
};

export default BloknotlarPage;
