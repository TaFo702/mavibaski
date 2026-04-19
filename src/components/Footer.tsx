import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { FACEBOOK_URL, INSTAGRAM_URL, PHONE_LINK, PHONE_NUMBER, ADDRESS } from '../constants/contact';

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer id="contact" className="bg-black text-white pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-xl font-black text-white leading-none tracking-tight">MAVİ BASIM</span>
                <span className="text-[10px] font-bold text-primary tracking-[0.2em] mt-1 uppercase">Matbaa & Reklam</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              Mavi Basım Matbaa & Reklam, İstanbul Topkapı 2. Matbaacılar Sitesi’nde faaliyet gösteren **aracısız fabrika üretimi** yapan profesyonel bir matbaa firmasıdır.<br />
              Kartvizit, broşür, magnet, katalog, etiket, kutu ve ambalaj baskı hizmetleri sunmaktayız.<br />
              Türkiye genelinde en uygun fiyatlı ve kaliteli baskı çözümleri sağlıyoruz.<br />
              <strong>Uyarı: Yayınevi olan "Mavi Basım Yayın" ile hiçbir bağımız yoktur. Biz Matbaa Üreticisiyiz.</strong>
            </p>
            <div className="flex gap-4">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Mavi Basım Facebook Hesabı">
                <Facebook size={18} />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" aria-label="Mavi Basım Instagram Hesabı">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Hızlı Menü</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
              <li>
                <button 
                  onClick={() => {
                    if (window.location.pathname !== '/') {
                      navigate('/');
                      setTimeout(() => {
                        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Hizmetlerimiz
                </button>
              </li>
              <li><Link to="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</Link></li>
              <li><a href={PHONE_LINK} className="hover:text-white transition-colors">İletişim</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Hizmetlerimiz</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/kutu" className="hover:text-white transition-colors">Kutu Baskı</Link></li>
              <li><Link to="/ambalaj" className="hover:text-white transition-colors">Ambalaj Baskı</Link></li>
              <li><Link to="/kartvizit" className="hover:text-white transition-colors">Kartvizit Baskı</Link></li>
              <li><Link to="/brosur" className="hover:text-white transition-colors">Broşür Baskı</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">İletişim</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-primary shrink-0" size={20} />
                <span className="text-gray-400">{ADDRESS}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-primary shrink-0" size={20} />
                <a href={PHONE_LINK} className="text-gray-400 hover:text-primary transition-colors">{PHONE_NUMBER}</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-primary shrink-0" size={20} />
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400">info@mavibasim.com</span>
                  <span className="text-gray-400">mavibasimonline@gmail.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 mb-8">
            <p>© 2024 <strong>Mavi Basım Matbaa & Reklam</strong>. Tüm Hakları Saklıdır.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white">Kullanım Şartları</a>
            </div>
          </div>
          <p className="text-center text-gray-400 text-xs max-w-4xl mx-auto leading-relaxed">
            Mavi Basım Matbaa & Reklam, İstanbul Topkapı’da faaliyet gösteren matbaa firmasıdır. Yayınevi olan Mavi Basım ile bağlantısı yoktur.
          </p>
          <p className="text-center text-gray-500 text-[10px] mt-2 font-medium uppercase tracking-wider">
            İstanbul matbaa hizmetleri için Mavi Basım Matbaa & Reklam
          </p>
        </div>
      </div>
    </footer>
  );
};
