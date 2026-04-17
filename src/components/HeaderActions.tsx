import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import Fuse from 'fuse.js';

// --- Helper for Search Normalization ---
const normalizeSearchText = (str: string) => {
  if (!str) return "";
  return str.toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/(\d)\.(\d)/g, '$1$2') // 2.000 -> 2000
    .replace(/(\d)\s+(\d)/g, '$1$2') // 2 000 -> 2000
    .trim();
};

const SEARCH_DATA = [
  { title: 'Kartvizit', desc: 'Kartvizit Baskı Hizmetleri', type: 'Ürün', path: '/kartvizit' },
  { title: 'El İlanı', desc: 'El İlanı Baskı Hizmetleri', type: 'Ürün', path: '/el-ilani' },
  { title: 'Afiş', desc: 'Afiş Baskı Hizmetleri', type: 'Ürün', path: '/afis' },
  { title: 'Antetli Kağıt', desc: 'Antetli Kağıt Baskı Hizmetleri', type: 'Ürün', path: '/antetli' },
  { title: 'Broşür', desc: 'Broşür Baskı Hizmetleri', type: 'Ürün', path: '/brosur' },
  { title: 'Cepli Dosya', desc: 'Cepli Dosya Baskı Hizmetleri', type: 'Ürün', path: '/dosyalar' },
  { title: 'Etiket', desc: 'Etiket Baskı Hizmetleri', type: 'Ürün', path: '/etiket' },
  { title: 'Oto Paspas', desc: 'Oto Paspas Baskı Hizmetleri', type: 'Ürün', path: '/oto-paspas' },
  { title: 'Küp Bloknot', desc: 'Küp Bloknot Baskı Hizmetleri', type: 'Ürün', path: '/kup-bloknot' },
  { title: 'Magnet', desc: 'Magnet Baskı Hizmetleri', type: 'Ürün', path: '/magnet' },
  { title: 'Kitap Ayracı', desc: 'Kitap Ayracı Baskı Hizmetleri', type: 'Ürün', path: '/kitap-ayraci' },
  { title: 'Yağ Kartı', desc: 'Yağ Kartı Baskı Hizmetleri', type: 'Ürün', path: '/yag-karti' },
  { title: 'Bloknotlar', desc: 'Bloknot Baskı Hizmetleri', type: 'Ürün', path: '/bloknotlar' },
  { title: 'Amerikan Servis', desc: 'Amerikan Servis Baskı Hizmetleri', type: 'Ürün', path: '/amerikan-servis' },
  { title: 'Karton Çanta', desc: 'Karton Çanta Baskı Hizmetleri', type: 'Ürün', path: '/karton-canta' },
  { title: 'Zarf', desc: 'Zarf Baskı Hizmetleri', type: 'Ürün', path: '/zarf' },
  { title: 'Katalog', desc: 'Katalog Baskı Hizmetleri', type: 'Ürün', path: '/kataloglar' },
  { title: 'Kutu Baskı', desc: 'Kutu Baskı Hizmetleri', type: 'Ürün', path: '/kutu' },
  { title: 'Ambalaj Baskı', desc: 'Ambalaj Baskı Hizmetleri', type: 'Ürün', path: '/ambalaj' },
  { title: 'Makbuz ve Formlar', desc: 'Makbuz ve Form Baskı Hizmetleri', type: 'Ürün', path: '/makbuz-ve-formlar' },
  { title: 'Grafik Tasarım', desc: 'Grafik Tasarım Hizmetleri', type: 'Ürün', path: '/grafik-tasarim' },
].map(item => ({
  ...item,
  searchKey: normalizeSearchText(`${item.title} ${item.desc}`)
}));

export const useProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const fuse = useMemo(() => new Fuse(SEARCH_DATA, {
    keys: ['searchKey'],
    threshold: 0.4,
    ignoreLocation: true,
    useExtendedSearch: true,
  }), []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) {
      const normalizedQuery = normalizeSearchText(query);
      const results = fuse.search(normalizedQuery);
      setSearchResults(results.map(r => r.item));
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearchOpen,
    setIsSearchOpen,
    handleSearch,
    navigate
  };
};

interface HeaderActionsProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({ onOpenAuth }) => {
  return (
    <div className="flex items-center gap-2 ml-2">
      {/* Auth Buttons */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onOpenAuth('login')}
          className="flex items-center justify-center gap-1.5 w-[95px] py-1 bg-white text-primary rounded-lg hover:bg-gray-50 transition-all text-[12px] font-semibold shadow-sm whitespace-nowrap"
        >
          <User size={14} className="stroke-[3px]" />
          <span>Giriş Yap</span>
        </button>
        <button 
          onClick={() => onOpenAuth('register')}
          className="flex items-center justify-center w-[95px] py-1 bg-white text-primary rounded-lg hover:bg-gray-50 transition-all text-[12px] font-semibold shadow-sm whitespace-nowrap"
        >
          <span>Üye Ol</span>
        </button>
      </div>
    </div>
  );
};
