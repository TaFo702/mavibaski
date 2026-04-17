import React from 'react';
import { Truck, Printer } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const HakkimizdaPage = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Hakkımızda | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="2004'ten beri online matbaa sektöründe öncü olan Mavi Basım Matbaa & Reklam, Topkapı 2. Matbaacılar Sitesi'ndeki modern tesisinde profesyonel baskı çözümleri sunar." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-6">
            Hakkımızda
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 lg:-mt-12">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-black leading-relaxed font-bold">
                2004 yılında Türkiye’de ilk kez online matbaa sipariş sistemini hayata geçirdik. 
                O dönemde internet üzerinden baskı siparişi vermek hayal gibi görünürken, biz bu hayali gerçeğe dönüştürdük.
              </p>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                Bugün ise Zeytinburnu Topkapı 2. Matbaacılar Sitesi’ndeki modern üretim merkezimiz ile hizmet veriyoruz.
              </p>
            </div>

            <div className="space-y-8 pt-4">
              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Truck size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-black mb-2 uppercase tracking-tight">Tüm Türkiye'ye Teslimat</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">81 ilin tamamına kargo ile gönderim yaparak Türkiye’nin her köşesine kaliteli baskı ulaştırıyoruz.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Printer size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-black mb-2 uppercase tracking-tight">Aracısız Üretim</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">Kendi üretim tesisimizde kesim-yapıştırma-ciltleme ve güncel makine parkuru ile fark yaratıyoruz.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
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

        <div className="mt-24">
          <h2 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-tight text-center mb-12">
            Hizmet Verdiğimiz Sektörler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Kurumsal Firmalar", items: "Katalog, broşür, zarf, bloknot, kartvizit" },
              { title: "Yayınevleri & Eğitim Kurumları", items: "Dergi, kitap, kullanım kılavuzu, garanti belgesi" },
              { title: "Perakende & E-ticaret", items: "Karton çanta, etiket, broşür, ambalaj" },
              { title: "Restoran, Kafe & Oteller", items: "Menü, kartvizit, zarf, promosyon ürünleri" },
              { title: "Klinikler & Sağlık Kurumları", items: "Reçete bloknotu, garanti belgesi, tanıtım materyalleri" },
              { title: "Emlak Ofisleri & Danışmanlık", items: "Kartvizit, broşür, zarf, bloknot" }
            ].map((sector, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all group">
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:translate-x-1 transition-transform">{sector.title}</h3>
                <p className="text-black font-medium leading-relaxed">{sector.items}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-primary/5 p-8 rounded-[32px] border-l-8 border-primary max-w-4xl mx-auto shadow-sm">
            <p className="text-gray-900 font-black text-lg md:text-xl leading-relaxed text-center">
              Önemli Not: "Mavi Basım Yayın" (Yayınevi) ile herhangi bir bağımız bulunmamaktadır. 
              Biz, Topkapı Matbaacılar Sitesi merkezli bir "Matbaa Üreticisi" ve "Reklam Fabrikasıyız".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
