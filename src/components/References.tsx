import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Check } from 'lucide-react';
import { AgencyDiscountCTA } from '../App';

export const ReferanslarPage = () => {
  const corporateRefs = [
    { category: "Kurumsal", items: "Global Lojistik, Tekno Market, Arda İnşaat, Yıldız Holding, Kuzey Sigorta" },
    { category: "Eğitim", items: "Akademi Koleji, Bilim Fen Lisesi, Özel Başarı Kursları" },
    { category: "Perakende", items: "Moda Dünyası, Evim Mağazaları, Ucuzluk Pazarı, Stil Giyim, Trend Ayakkabı" },
    { category: "Gıda", items: "Lezzet Durağı, Kahve Keyfi, Hızlı Atıştırmalık, Saray Mutfağı" },
    { category: "Sağlık", items: "Şifa Hastanesi, Sağlık Polikliniği, Hayat Tıp Merkezi" }
  ];

  const workExamples = [
    { title: "Katalog", desc: "Teknoloji marketleri, moda markaları ve sanayi kuruluşları için ürün katalogları", path: "/kataloglar" },
    { title: "Kartvizit", desc: "Avukatlık, muhasebe ve mimarlık ofisleri için özel tasarımlar", path: "/kartvizit" },
    { title: "Karton Çanta", desc: "Giyim mağazaları, kozmetik zincirleri ve butikler için lüks çantalar", path: "/karton-canta" },
    { title: "Zarf", desc: "Kurumsal firmalar ve hukuk büroları için diplomat zarflar", path: "/zarf" }
  ];

  const strengths = [
    "20+ yıllık kesintisiz hizmet",
    "Kendi fabrikamızda üretim",
    "Dünya lideri makineler",
    "81 ile kargo gönderimi",
    "Müşteri memnuniyeti odaklı",
    "Tasarım onayı sonrası üretim"
  ];

  return (
    <div className="bg-white min-h-screen pt-8 pb-16 md:pt-12 md:pb-24">
      <Helmet>
        <title>Referanslarımız | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="2004'ten beri binlerce firmaya sunduğumuz matbaa ve reklam hizmetleri. Kurumsal referanslarımız ve çalışma örneklerimizi inceleyin." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-black text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            Güven ve Kalite
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4 leading-none">
            Referanslarımız
          </h1>
          <p className="text-gray-500 font-medium text-lg max-w-3xl mx-auto leading-relaxed">
            2004 yılından beri binlerce firmaya, kuruma ve markaya baskı hizmeti sunduk. Bu referanslar, kalitemizin ve güvenilirliğimizin en güzel kanıtıdır.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="space-y-12">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-4">
              <div className="w-2 h-10 bg-primary rounded-full" />
              Kurumsal Referanslar
            </h2>
            <div className="space-y-6">
              {corporateRefs.map((ref, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-all"
                >
                  <h3 className="font-black uppercase text-primary text-sm mb-2">{ref.category}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{ref.items}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-4">
              <div className="w-2 h-10 bg-secondary rounded-full" />
              Çalışma Örnekleri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workExamples.map((example, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link 
                    to={example.path}
                    className="block p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all group h-full"
                  >
                    <h3 className="font-black uppercase text-black mb-3 group-hover:text-primary transition-colors">{example.title}</h3>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{example.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                      Ürünleri Gör <ChevronRight size={14} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-10 bg-black text-white rounded-[40px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] -mr-16 -mt-16" />
              <h3 className="text-xl font-black uppercase tracking-tight mb-8 relative z-10">
                Neden MAVİ BASIM Referansları Güçlü?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {strengths.map((strength, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-300">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <AgencyDiscountCTA />
      </div>
    </div>
  );
};
