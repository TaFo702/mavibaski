import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Award } from 'lucide-react';
import { FACEBOOK_URL, INSTAGRAM_URL, PHONE_LINK, PHONE_NUMBER, WHATSAPP_LINK } from '../constants/contact';
import { LegalPolicyModal, PolicyType } from './LegalPolicies';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer = () => {
  const location = useLocation();
  const isGiderMakbuzu = location.pathname.includes('gider-makbuzu');
  const isKutuPage = location.pathname === '/kutu';
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  return (
    <footer id="contact" className="bg-black text-white pt-10 pb-8 border-t border-zinc-900 relative">
      {/* Footer Top CTA Banner (Excluded on /kutu to maintain single CTA and exact 10 H2 hierarchy) */}
      {!isKutuPage && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="bg-gradient-to-r from-slate-900 via-zinc-900 to-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 bg-primary/20 text-[#00E5FF] px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">
                <Award size={13} /> KURUMSAL BASKI ÇÖZÜMLERİ
              </div>
              <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tight">
                Kurumsal Siparişler &amp; Toptan Baskı Teklifi
              </h2>
              <p className="text-xs text-gray-300 font-medium leading-relaxed max-w-2xl">
                Yüksek tirajlı basım ve kurumsal matbaa ihtiyaçlarınız için Mavi Basım ile iletişime geçerek avantajlı teklif alın.
              </p>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-md shrink-0 hover:scale-105 active:scale-95"
            >
              <WhatsAppIcon size={18} /> Toptan Teklif Al
            </a>
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid - Compact 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          
          {/* Col 1: Brand & Office */}
          <div className="space-y-4">
            <div>
              <span className="text-xl font-black text-white leading-none tracking-tight block">MAVİ BASIM</span>
              <span className="text-[11px] font-bold text-[#00E5FF] tracking-widest mt-1 uppercase block">Matbaa &amp; Reklam</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed font-medium">
              İstanbul Topkapı 2. Matbaacılar Sitesi'ndeki koordinasyon ve hizmet noktamızla 81 ilimize teknik standartlara uygun matbaa ve ambalaj çözümleri sunuyoruz.
            </p>
            <div className="flex gap-3 pt-1">
              <a 
                href={FACEBOOK_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-gray-300 hover:text-white" 
                aria-label="Facebook Sayfamız"
              >
                <Facebook size={18} />
              </a>
              <a 
                href={INSTAGRAM_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all text-gray-300 hover:text-white" 
                aria-label="Instagram Profilimiz"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Essential Products */}
          <div>
            <h3 className="text-xs font-black tracking-widest text-[#00E5FF] uppercase mb-4">BASKI ÜRÜNLERİ</h3>
            <ul className="space-y-2.5 text-xs font-semibold text-gray-200">
              <li><Link to="/kartvizit" className="hover:text-white transition-colors py-1 inline-block">Kartvizit Baskı</Link></li>
              <li><Link to="/brosur" className="hover:text-white transition-colors py-1 inline-block">Broşür &amp; El İlanı Baskı</Link></li>
              <li><Link to="/kataloglar" className="hover:text-white transition-colors py-1 inline-block">Katalog &amp; Dergi Baskı</Link></li>
              <li><Link to="/magnet" className="hover:text-white transition-colors py-1 inline-block">Magnet &amp; Reklam Ürünleri</Link></li>
              <li><Link to="/etiket" className="hover:text-white transition-colors py-1 inline-block">Etiket &amp; Stiker Baskı</Link></li>
              <li><Link to="/kutu" className="hover:text-white transition-colors py-1 inline-block">Kutu &amp; Ambalaj Çözümleri</Link></li>
              <li><Link to="/makbuz-ve-formlar" className="hover:text-white transition-colors py-1 inline-block">Makbuz &amp; Resmi Evraklar</Link></li>
            </ul>
          </div>

          {/* Col 3: Corporate & Help */}
          <div>
            <h3 className="text-xs font-black tracking-widest text-[#00E5FF] uppercase mb-4">KURUMSAL &amp; BİLGİ</h3>
            <ul className="space-y-2.5 text-xs font-semibold text-gray-200">
              <li><Link to="/hakkimizda" className="hover:text-white transition-colors py-1 inline-block">Hakkımızda</Link></li>
              <li><Link to="/makine-parkuru" className="hover:text-white transition-colors py-1 inline-block">Makine Parkurumuz</Link></li>
              <li><Link to="/referanslar" className="hover:text-white transition-colors py-1 inline-block">Referanslarımız</Link></li>
              <li><Link to="/sikca-sorulan" className="hover:text-white transition-colors py-1 inline-block">Sıkça Sorulan Sorular</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors py-1 inline-block">Matbaa Akademi &amp; Blog</Link></li>
              <li><Link to="/iletisim" className="hover:text-white transition-colors py-1 inline-block">İletişim &amp; Adres Bilgisi</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="space-y-3">
            <h3 className="text-xs font-black tracking-widest text-[#00E5FF] uppercase mb-4">İLETİŞİM &amp; ADRES</h3>
            
            <a 
              href={PHONE_LINK} 
              className="flex items-center gap-3 p-3 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all text-left group"
            >
              <Phone size={16} className="text-[#00E5FF] shrink-0" />
              <div>
                <span className="block text-[9px] font-black text-gray-400 uppercase">MÜŞTERİ HATLARI</span>
                <span className="block text-xs font-black text-white group-hover:text-[#00E5FF]">{PHONE_NUMBER}</span>
              </div>
            </a>

            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 p-3 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-emerald-500/30 transition-all text-left group"
            >
              <WhatsAppIcon size={16} className="text-[#10B981] shrink-0" />
              <div>
                <span className="block text-[9px] font-black text-[#10B981] uppercase">WHATSAPP SİPARİŞ</span>
                <span className="block text-xs font-black text-white">Anında Sohbet Başlat</span>
              </div>
            </a>

            <div className="p-3 rounded-xl bg-[#0a0a0a] border border-white/5 text-left flex items-start gap-2.5">
              <MapPin size={16} className="text-[#00E5FF] shrink-0 mt-0.5" />
              <p className="text-[11px] text-gray-400 font-medium leading-snug">
                Topkapı 2. Matbaacılar Sitesi B Blok No:2NB Zeytinburnu / İstanbul
              </p>
            </div>
          </div>

        </div>

        {/* Turkey-wide Service & Cities Bar */}
        {!isGiderMakbuzu && (
          <div className="py-6 border-b border-white/10 text-center space-y-2">
            <span className="text-white text-xs font-black uppercase tracking-widest block">Türkiye Geneli Kargo Gönderimi</span>
            <p className="text-gray-400 text-xs max-w-2xl mx-auto font-medium">
              Türkiye geneline anlaşmalı kargo ile gönderim yapılmaktadır.
            </p>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs font-bold text-gray-400 pt-1">
              <Link to="/istanbul-matbaa" className="hover:text-[#00E5FF] transition-colors">İstanbul Matbaa</Link>
              <span>•</span>
              <Link to="/ankara-matbaa" className="hover:text-[#00E5FF] transition-colors">Ankara Matbaa</Link>
              <span>•</span>
              <Link to="/izmir-matbaa" className="hover:text-[#00E5FF] transition-colors">İzmir Matbaa</Link>
              <span>•</span>
              <Link to="/antalya-matbaa" className="hover:text-[#00E5FF] transition-colors">Antalya Matbaa</Link>
              <span>•</span>
              <Link to="/bursa-matbaa" className="hover:text-[#00E5FF] transition-colors">Bursa Matbaa</Link>
            </div>
          </div>
        )}

        {/* Copyright & Legal */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-300 font-medium">
          <p>© 2026 <strong>Mavi Basım Matbaa &amp; Reklam</strong>. Tüm Hakları Saklıdır.</p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-xs text-gray-300">
            <button onClick={() => setActivePolicy('terms')} className="hover:text-[#00E5FF] transition-colors py-1 px-1.5">Mesafeli Satış Sözleşmesi</button>
            <span className="text-gray-600">•</span>
            <button onClick={() => setActivePolicy('refund')} className="hover:text-[#00E5FF] transition-colors py-1 px-1.5">İptal ve İade Koşulları</button>
            <span className="text-gray-600">•</span>
            <button onClick={() => setActivePolicy('delivery')} className="hover:text-[#00E5FF] transition-colors py-1 px-1.5">Teslimat Koşulları</button>
          </div>
        </div>

        {/* Legal Modal */}
        <LegalPolicyModal 
          type={activePolicy} 
          onClose={() => setActivePolicy(null)} 
        />

      </div>
    </footer>
  );
};
