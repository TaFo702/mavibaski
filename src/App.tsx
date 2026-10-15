Warning: truncated output (original token count: 77682)
Total output lines: 5641

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation, MemoryRouter, Navigate } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ArrowUp,
  Printer, 
  Package, 
  Palette, 
  Menu, 
  X,
  FileText,
  PhoneCall,
  Info,
  Facebook,
  Instagram,
  Truck,
  ShieldCheck,
  Search,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Zap,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  Minus,
  Plus,
  Maximize,
  Image as ImageIcon,
  Eye,
  EyeOff,
  AlertCircle,
  User,
  Lock,
  Coins,
  PenTool,
  HelpCircle,
  Ruler,
  Scale,
  Layers,
  Cpu,
  BookOpen,
  Award,
  Boxes,
  Clock,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import Fuse from 'fuse.js';
import ReactMarkdown from 'react-markdown';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { PRODUCT_DESCRIPTIONS } from './constants/productTexts';
import { useProductSearch } from './components/HeaderActions';
import { CityLinksSection } from './components/CityLinksSection';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { HOME_FAQS } from './data/homePageContent';
import { RouteSEOHead } from './components/RouteSEOHead';

// Route Pages lazy loading
const SikcaSorulanPage = React.lazy(() => import('./components/FAQ').then(m => ({ default: m.SikcaSorulanPage })));
const HakkimizdaPage = React.lazy(() => import('./components/About').then(m => ({ default: m.HakkimizdaPage })));
const MatbaaPage = React.lazy(() => import('./components/Matbaa').then(m => ({ default: m.MatbaaPage })));
const GrafikTasarimPage = React.lazy(() => import('./components/GrafikTasarim').then(m => ({ default: m.GrafikTasarimPage })));
const ReferanslarPage = React.lazy(() => import('./components/References').then(m => ({ default: m.ReferanslarPage })));
const IletisimPage = React.lazy(() => import('./components/Contact').then(m => ({ default: m.IletisimPage })));
const BlogPage = React.lazy(() => import('./components/Blog').then(m => ({ default: m.BlogPage })));
const MakineParkuruPage = React.lazy(() => import('./components/MakineParkuru').then(m => ({ default: m.MakineParkuruPage })));
const SEOPages = React.lazy(() => import('./components/SEOPages').then(m => ({ default: m.SEOPages })));
const CityPage = React.lazy(() => import('./components/CityPage').then(m => ({ default: m.CityPage })));

// --- Types ---
interface CartItem {
  id: string;
  name: string;
  code: string;
  basePrice: number;
  baseQuantity: number;
  quantity: number;
  category: string;
  description: string;
  ebat?: string;
  features?: string[];
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, newQuantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openProductDetail: (product: any, category: string) => void;
}

export const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

import { LOCAL_ASSETS } from './constants/assets';
import { 
  PRODUCT_FEATURES_INFO,
  KARTVIZIT_DATA,
  EL_ILANI_DATA,
  AFIS_DATA,
  ANTETLI_DATA,
  DOSYALAR_DATA,
  ETIKET_DATA,
  OTO_PASPAS_DATA,
  MAGNET_DATA,
  AMERIKAN_SERVIS_DATA,
  KUTU_DATA,
  AMBALAJ_DATA,
  PRICE_LIST
} from './data/productData';

export {
  PRODUCT_FEATURES_INFO,
  KARTVIZIT_DATA,
  EL_ILANI_DATA,
  AFIS_DATA,
  ANTETLI_DATA,
  DOSYALAR_DATA,
  ETIKET_DATA,
  OTO_PASPAS_DATA,
  MAGNET_DATA,
  AMERIKAN_SERVIS_DATA,
  KUTU_DATA,
  AMBALAJ_DATA,
  PRICE_LIST
};

// --- Constants ---
const getImageUrl = (key: string, defaultUrl: string) => {
  return LOCAL_ASSETS[key] || defaultUrl;
};

const sortedBannerUrls = ["/b1.webp", "/b2.webp", "/b3.webp", "/b4.webp", "/b5.webp"];

import { BROSUR_DATA, KATALOG_DATA, ZARF_DATA, KARTON_CANTA_DATA, KUP_BLOKNOT_DATA, BLOKNOTLAR_DATA, KITAP_AYRACI_DATA, YAG_KARTI_DATA } from './data/extraProductData';
import { CILT_ISLERI_DATA, MAKBUZ_FORMLAR_ALL_DATA } from './data/makbuzData';

const KartvizitPage = React.lazy(() => import('./components/Kartvizit').then(m => ({ default: m.KartvizitPage })));
const ElIlaniPage = React.lazy(() => import('./components/ElIlani').then(m => ({ default: m.ElIlaniPage })));
const AntetliPage = React.lazy(() => import('./components/Antetli').then(m => ({ default: m.AntetliPage })));
const DosyalarPage = React.lazy(() => import('./components/Dosyalar').then(m => ({ default: m.DosyalarPage })));
const EtiketPage = React.lazy(() => import('./components/Etiket').then(m => ({ default: m.EtiketPage })));
const OtoPaspasPage = React.lazy(() => import('./components/OtoPaspas').then(m => ({ default: m.OtoPaspasPage })));
const AmerikanServisPage = React.lazy(() => import('./components/AmerikanServis').then(m => ({ default: m.AmerikanServisPage })));
const BrosurPage = React.lazy(() => import('./components/Brosur').then(m => ({ default: m.BrosurPage })));
const KatalogPage = React.lazy(() => import('./components/Katalog').then(m => ({ default: m.KatalogPage })));
const MakbuzFormlarPage = React.lazy(() => import('./components/Makbuz').then(m => ({ default: m.MakbuzFormlarPage })));
const GenericPriceTablePage = React.lazy(() => import('./components/Makbuz').then(m => ({ default: m.GenericPriceTablePage })));
const KitapAyraciPage = React.lazy(() => import('./components/KitapAyraci').then(m => ({ default: m.KitapAyraciPage })));
const YagKartiPage = React.lazy(() => import('./components/YagKarti').then(m => ({ default: m.YagKartiPage })));
const ZarfPage = React.lazy(() => import('./components/Zarf'));
const KartonCantaPage = React.lazy(() => import('./components/KartonCanta').then(m => ({ default: m.KartonCantaPage })));
const KupBloknotPage = React.lazy(() => import('./components/KupBloknot').then(m => ({ default: m.KupBloknotPage })));
const BloknotlarPage = React.lazy(() => import('./components/Bloknotlar').then(m => ({ default: m.BloknotlarPage })));
const KutuPage = React.lazy(() => import('./components/Kutu').then(m => ({ default: m.KutuPage })));
const AmbalajPage = React.lazy(() => import('./components/Ambalaj').then(m => ({ default: m.AmbalajPage })));
const AfisPage = React.lazy(() => import('./components/Afis').then(m => ({ default: m.AfisPage })));
const MagnetPage = React.lazy(() => import('./components/Magnet').then(m => ({ default: m.MagnetPage })));
const KullanimSartlariPage = React.lazy(() => import('./components/KullanimSartlari').then(m => ({ default: m.KullanimSartlariPage })));
const GizlilikPolitikasiPage = React.lazy(() => import('./components/GizlilikPolitikasi').then(m => ({ default: m.GizlilikPolitikasiPage })));
const CerezPolitikasiPage = React.lazy(() => import('./components/CerezPolitikasi').then(m => ({ default: m.CerezPolitikasiPage })));
const MesafeliSatisSozlesmesiPage = React.lazy(() => import('./components/MesafeliSatisSozlesmesi').then(m => ({ default: m.MesafeliSatisSozlesmesiPage })));
const TeslimatSartlariPage = React.lazy(() => import('./components/TeslimatSartlari').then(m => ({ default: m.TeslimatSartlariPage })));
const IptalVeiadeSartlariPage = React.lazy(() => import('./components/IptalVeiadeSartlari').then(m => ({ default: m.IptalVeiadeSartlariPage })));
const LisansPage = React.lazy(() => import('./components/Lisans').then(m => ({ default: m.LisansPage })));
import { Footer } from './components/Footer';
import { 
  PHONE_NUMBER, 
  PHONE_LINK, 
  WHATSAPP_NUMBER, 
  WHATSAPP_LINK, 
  FACEBOOK_URL, 
  INSTAGRAM_URL, 
  ADDRESS 
} from './constants/contact';
export { WHATSAPP_LINK };

export const FireWarning = () => (
  <div className="mt-4 text-center max-w-4xl mx-auto px-4">
    <p className="text-slate-500 font-semibold text-xs text-center leading-relaxed">
      * Ofset baskıda renk, kesim ve adet toleransları oluşabilir. Ayrıntılı bilgi için <Link to="/teslimat-sartlari" className="underline hover:text-primary transition-colors">Teslimat ve İade Şartları</Link> sayfasını inceleyebilirsiniz.
    </p>
  </div>
);

export const AgencyDiscountCTA = () => null;

const getBrosurBaseQuantity = (code?: string): number => {
  if (!code) return 5000;
  const c = code.toUpperCase();
  // 1. CBS products (Selefonlu Broşür)
  if (c.startsWith("CBS")) {
    const num = parseInt(c.slice(3));
    if (num >= 1 && num <= 3) return 3000;
    if (num >= 4 && num <= 6) return 2000;
    if (num >= 7 && num <= 12) return 1000;
  }
  // 2. ELI products (El İlanı)
  if (c.startsWith("ELI")) {
    const num = parseInt(c.slice(3));
    if (num === 3) return 6000;
    if (num === 4) return 12000;
    return 2000; // All other ELI are 2000 Adet base (A5, A4, A3)
  }
  // 3. CA products (Standart Broşür)
  if (c.startsWith("1CA")) return 1000;
  if (c.startsWith("2CA")) return 2000;
  if (c.startsWith("5CA")) return 5000;
  if (c.startsWith("10CA")) return 10000;
  // 4. PRO products (Pro Broşür)
  if (c.startsWith("PRO1")) return 1000;
  if (c.startsWith("PRO2")) return 2000;
  
  return 1000;
};

const calculateDiscount = (quantity: number, category: string, code?: string) => {
  const normCategory = category.replace(/İ/g, 'i').replace(/ı/g, 'i').toLowerCase();
  
  // Absolute exclusion for Broşür, El İlanı, Etiket, Kitap Ayracı, Yağ Kartı, and Karton Çanta products from any discounts
  if (
    normCategory.includes("brosur") || 
    normCategory.includes("broşür") || 
    normCategory.includes("el ilani") || 
    normCategory.includes("el ilan") ||
    normCategory.includes("etiket") ||
    normCategory.includes("kitap ayraci") ||
    normCategory.includes("yag kart") ||
    normCategory.includes("karton canta") ||
    category.toLowerCase().includes("broşür") ||
    category.toLowerCase().includes("brosur") ||
    category.toLowerCase().includes("el ilanı") ||
    category.toLowerCase().includes("el ilani") ||
    category.toLowerCase().includes("etiket") ||
    category.toLowerCase().includes("kitap ayracı") ||
    category.toLowerCase().includes("kitap ayraci") ||
    category.toLowerCase().includes("yağ kartı") ||
    category.toLowerCase().includes("yag kartı") ||
    category.toLowerCase().includes("yag karti") ||
    category.toLowerCase().includes("karton çanta") ||
    category.toLowerCase().includes("karton canta")
  ) {
    return 0;
  }

  const excludedCategories = [
    "Kataloglar", "Makbuz", "Ambalaj", "Kutu", "Zarf", "Form", 
    "Fiş", "Bilet", "Reçete", "Senet", "Poliçe", "Sözleşme", "Adisyon", "Kiralama", "Oto Paspas", "Amerikan Servis", "Antetli Kağıt", "Dosya", "Bloknot",
    "broşür", "brosur", "el ilanı", "el ilani", "etiket", "kitap ayracı", "kitap ayraci", "yağ kartı", "yag karti", "karton çanta", "karton canta"
  ];

  if (excludedCategories.some(cat => category.toLowerCase().includes(cat.toLowerCase()))) {
    return 0;
  }

  // Do not discount MAG3 custom big magnets
  if (code?.toUpperCase() === "MAG3") {
    return 0;
  }

  // Handle Magnet-specific discounts
  if (category.toLowerCase().includes("magnet")) {
    if (quantity >= 9000) return 0.25;  // 9000 Adet ve Üzeri (10.000 dahil): %25 İndirim
    if (quantity >= 7000) return 0.15;  // 7000 - 8000 Adet: %15 İndirim
    if (quantity >= 5000) return 0.10;  // 5000 - 6000 Adet: %10 İndirim
    if (quantity >= 4000) return 0.06;  // 4000 Adet: %6 İndirim
    if (quantity >= 3000) return 0.04;  // 3000 Adet: %4 İndirim
    if (quantity >= 2000) return 0.03;  // 2000 Adet: %3 İndirim
    return 0;                           // 1000 Adet: %0 İndirim (İndirim uygulanmaz)
  }

  // Handle Kartvizit-specific discounts
  if (category.toLowerCase().includes("kartvizit")) {
    if (quantity >= 9000) return 0.36;  // 9000 Adet ve Üzeri (10.000 dahil): %36 İndirim
    if (quantity >= 7000) return 0.28;  // 7000 - 8000 Adet: %28 İndirim
    if (quantity >= 5000) return 0.20;  // 5000 - 6000 Adet: %20 İndirim
    if (quantity >= 3000) return 0.10;  // 3000 - 4000 Adet: %10 İndirim
    return 0;                           // 1000 - 2000 Adet: %0 İndirim (İndirim uygulanmaz)
  }

  // Uniform discount structure for all other products
  if (quantity >= 10000) return 0.25;
  if (quantity >= 5000) return 0.10;
  if (quantity >= 4000) return 0.05;
  if (quantity >= 3000) return 0.02;
  if (quantity >= 2000) return 0.01;
  
  return 0;
};

const isRestrictedQuantityProduct = (category: string, description: string = "") => {
  const restrictedCategories = [
    "ETİKET",
    "PARA MAKBUZU",
    "TAHSİLAT MAKBUZU",
    "GİDER MAKBUZU",
    "TEDİYE MAKBUZU",
    "ADİSYON",
    "SİPARİŞ FİŞİ",
    "SÖZLEŞME",
    "POLİÇELERİ",
    "KİRALAMA",
    "BİLETİ",
    "REÇETE",
    "SENET",
    "PERAKENDE SATIŞ FİŞİ"
  ];
  const isBloknot = category.toLowerCase().includes("bloknot");
  return (restrictedCategories.some(cat => category.toUpperCase().includes(cat)) || 
         description.toUpperCase().includes("CİLT")) && !isBloknot;
};

const formatPrice = (price: number) => {
  if (isNaN(price)) return "Fiyat Alınız";
  const formatted = new Intl.NumberFormat('tr-TR', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(price));
  return `${formatted} ₺`;
};

const parsePrice = (priceStr: string) => {
  return parseFloat(priceStr.replace(/[^\d,]/g, '').replace(',', '.'));
};

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen } = useCart();
  
  const total = cart.reduce((acc, item) => {
    const discount = calculateDiscount(item.quantity, item.category, item.code);
    const discountedPrice = item.basePrice * (item.quantity / item.baseQuantity) * (1 - discount);
    return acc + discountedPrice;
  }, 0);

  const sendOrder = () => {
    let message = "Merhaba Sipariş vermek istiyorum\n\n";
    cart.forEach((item, idx) => {
      const discount = calculateDiscount(item.quantity, item.category, item.code);
      const discountedPrice = item.basePrice * (item.quantity / item.baseQuantity) * (1 - discount);
      message += `${idx + 1}. ${item.name} (${item.code})\n`;
      message += `Adet: ${item.quantity.toLocaleString('tr-TR')}\n`;
      message += `Özellikler: ${item.description}\n`;
      message += `Fiyat: ${formatPrice(discountedPrice)}\n`;
      if (discount > 0) message += `İndirim: %${(discount * 100).toFixed(0)}\n`;
      message += `-------------------\n`;
    });
    message += `\nToplam Tutar: ${formatPrice(total)}`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-primary text-white">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} />
            <h2 className="text-lg font-black uppercase tracking-tight">Sepetim ({cart.length})</h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-1.5 hover:bg-white/10 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart size={48} className="mx-auto text-gray-200 mb-3" />
              <p className="text-gray-500 font-bold text-sm">Sepetiniz boş.</p>
            </div>
          ) : (
            cart.map((item, idx) => {
              const discount = calculateDiscount(item.quantity, item.category, item.code);
              const discountedPrice = item.basePrice * (item.quantity / item.baseQuantity) * (1 - discount);
              
              return (
                <div key={idx} className="bg-gray-50 rounded-xl p-3 border border-gray-100 relative group">
                  <button 
                    onClick={() => removeFromCart(idx)}
                    className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-white text-red-600 rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition-all z-10"
                  >
                    <Trash2 size={12} />
                  </button>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-grow pr-3">
                      <h4 className="font-black text-black text-xs uppercase leading-tight line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold">{item.code}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-primary text-sm">{formatPrice(discountedPrice)}</p>
                      {discount > 0 && (
                        <p className="text-[11px] text-red-600 font-black">-%{(discount * 100).toFixed(0)}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 mb-3 line-clamp-1">{item.description}</p>
                  
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
                      <button 
                        onClick={() => updateQuantity(idx, Math.max(item.baseQuantity, item.quantity - item.baseQuantity))}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-primary disabled:opacity-20"
                        disabled={(item.category === "Dosyalar" && item.baseQuantity === 500) || isRestrictedQuantityProduct(item.category, item.description)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-20 text-center font-black text-xs">{item.quantity.toLocaleString('tr-TR')}</span>
                      <button 
                        onClick={() => updateQuantity(idx, item.quantity + item.baseQuantity)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-primary disabled:opacity-20"
                        disabled={(item.category === "Dosyalar" && item.baseQuantity === 500) || isRestrictedQuantityProduct(item.category, item.description)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Adet</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-bold uppercase text-xs">Toplam Tutar</span>
              <span className="text-2xl font-black text-primary">{formatPrice(total)}</span>
            </div>
            <button 
              onClick={sendOrder}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-green-700 transition-all shadow-lg flex items-center justify-center gap-3 uppercase tracking-tight"
            >
              Siparişi Gönder
            </button>
            <button 
              onClick={clearCart}
              className="w-full text-gray-400 font-bold text-xs hover:text-red-600 transition-colors uppercase"
            >
              Sepeti Temizle
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const ProductDetailModal = ({ product, category, isOpen, onClose, onAddToCart }: { product: any, category: string, isOpen: boolean, onClose: () => void, onAddToCart: (item: CartItem) => void }) => {
  const { setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [colorCount, setColorCount] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const normalizeForSearch = (str: string) => {
    if (!str) return "";
    return str
      .replace(/İ/g, 'i')
      .replace(/ı/g, 'i')
      .replace(/Ş/g, 's')
      .replace(/ş/g, 's')
      .replace(/Ç/g, 'c')
      .replace(/ç/g, 'c')
      .replace(/Ğ/g, 'g')
      .replace(/ğ/g, 'g')
      .replace(/Ö/g, 'o')
      .replace(/ö/g, 'o')
      .replace(/Ü/g, 'u')
      .replace(/ü/g, 'u')
      .toLowerCase();
  };

  const isMakbuzVeForm = (() => {
    const normCategory = normalizeForSearch(category);
    const normProductTitle = product ? normalizeForSearch(product.code || product.desc || "") : "";
    
    // Explicit exclusion if category or code contains 'afiş' or 'afis' or 'etiket'
    if (normCategory.includes("afis") || normProductTitle.includes("afis") || normCategory.includes("etiket")) return false;
    
    const keywords = ["makbuz", "form", "fis", "bilet", "recete", "senet", "police", "sozlesme", "adisyon", "kiralama"];
    return keywords.some(word => normCategory.includes(word) || normProductTitle.includes(word));
  })();
  
  const [prevProductKey, setPrevProductKey] = useState<string | null>(null);
  const currentKey = product ? `${product.code}-${isOpen}` : null;
  if (currentKey !== prevProductKey) {
    setPrevProductKey(currentKey);
    if (product && isOpen) {
      let baseQty = product.miktar ? parseInt(product.miktar.replace(/[^\d]/g, '')) : 1000;
      if (product.availableOptions && product.availableOptions.length > 0) {
        const optionExists = product.availableOptions.some((opt: any) => parseInt(opt.miktar.replace(/[^\d]/g, '')) === baseQty);
        if (!optionExists) {
          baseQty = parseInt(product.availableOptions[0].miktar.replace(/[^\d]/g, ''));
        }
      }
      setQuantity(baseQty);
      setColorCount(1);
      setShowSuccess(false);
    }
  }

  if (!isOpen || !product) return null;

  const basePrice = parsePrice(product.price);
  const extraPrice = product.extraPrice ? parsePrice(product.extraPrice) : null;
  const baseQuantity = product.miktar ? parseInt(product.miktar.replace(/[^\d]/g, '')) : 1000;
  
  const calculateTotalPrice = (q: number) => {
    let price: number;
    if (product.availableOptions && product.availableOptions.length > 0) {
      // Try exact match first
      const optIdx = product.availableOptions.findIndex((opt: any) => parseInt(opt.miktar.replace(/[^\d]/g, '')) === q);
      const option = product.availableOptions[optIdx];
      
      if (option) {
        price = option.price;
        if (colorCount > 1 && product.colorDiffValues) {
          price += (product.colorDiffValues[optIdx] || 0) * (colorCount - 1);
        }
        return price;
      } else if (category.toLowerCase().includes("bloknot") && q > 1000 && q % 1000 === 0) {
        // Multiples of 1000 logic for Bloknot
        const thousandIdx = product.availableOptions.findIndex((opt: any) => parseInt(opt.miktar.replace(/[^\d]/g, '')) === 1000);
        if (thousandIdx !== -1) {
          const thousandPrice = product.availableOptions[thousandIdx].price;
          const multiplier = q / 1000;
          price = thousandPrice * multiplier;
          if (colorCount > 1 && product.colorDiffValues) {
            price += ((product.colorDiffValues[thousandIdx] || 0) * multiplier) * (colorCount - 1);
          }
          return price;
        }
      } else {
        // Fallback for availableOptions list: strictly return first/valid option price, avoiding arbitrary linear extrapolation
        const fallbackOpt = product.availableOptions[0];
        price = fallbackOpt.price;
        if (colorCount > 1 && product.colorDiffValues) {
          price += (product.colorDiffValues[0] || 0) * (colorCount - 1);
        }
        return price;
      }
    }
    const d = calculateDiscount(q, category, product.code);
    if (extraPrice !== null) {
      const additionalUnits = Math.max(0, (q - baseQuantity) / baseQuantity);
      return basePrice + (additionalUnits * extraPrice);
    }
    return basePrice * (q / baseQuantity) * (1 - d);
  };

  const totalPrice = calculateTotalPrice(quantity);

  const handleAdd = () => {
    let effectiveBasePrice = basePrice;
    let effectiveBaseQuantity = baseQuantity;

    if (product.availableOptions && product.availableOptions.length > 0) {
      const optIdx = product.availableOptions.findIndex((opt: any) => parseInt(opt.miktar.replace(/[^\d]/g, '')) === quantity);
      if (optIdx !== -1) {
        effectiveBasePrice = product.availableOptions[optIdx].price;
        if (colorCount > 1 && product.colorDiffValues) {
          effectiveBasePrice += (product.colorDiffValues[optIdx] || 0) * (colorCount - 1);
        }
        effectiveBaseQuantity = quantity; // Set baseQuantity to current quantity for restricted products
      } else if (category.toLowerCase().includes("bloknot") && quantity > 1000 && quantity % 1000 === 0) {
        // Handle multiples for Bloknot
        const thousandIdx = product.availableOptions.findIndex((opt: any) => parseInt(opt.miktar.replace(/[^\d]/g, '')) === 1000);
        if (thousandIdx !== -1) {
          const thousandPrice = product.availableOptions[thousandIdx].price;
          const multiplier = quantity / 1000;
          effectiveBasePrice = thousandPrice * multiplier;
          if (colorCount > 1 && product.colorDiffValues) {
            effectiveBasePrice += ((product.colorDiffValues[thousandIdx] || 0) * multiplier) * (colorCount - 1);
          }
          effectiveBaseQuantity = quantity;
        }
      } else {
        const fallbackOpt = product.availableOptions[0];
        effectiveBasePrice = fallbackOpt.price;
        if (colorCount > 1 && product.colorDiffValues) {
          effectiveBasePrice += (product.colorDiffValues[0] || 0) * (colorCount - 1);
        }
        effectiveBaseQuantity = parseInt(fallbackOpt.miktar.replace(/[^\d]/g, ''));
      }
    }

    const isEtiket = category.toLowerCase().includes("etiket");
    const colorSuffix = (isEtiket || !isMakbuzVeForm)
      ? (colorCount > 1 ? ` - ${colorCount} Renk` : "")
      : (colorCount > 1 ? ` - ${colorCount} Renk` : " - 1 Renk");

    onAddToCart({
      id: Math.random().toString(36).substr(2, 9),
      name: product.model || product.name || category,
      code: product.code,
      basePrice: effectiveBasePrice,
      baseQuantity: effectiveBaseQuantity,
      quantity,
      category,
      description: (product.desc || "") + colorSuffix + (product.note ? ` - ${product.note}` : ""),
      ebat: product.ebat,
    });
    setShowSuccess(true);
  };

  const handleQuantityChange = (newQty: number) => {
    if (newQty < baseQuantity) return;
    if (category === "Dosyalar" && product.miktar === "500 Adet") return;
    
    // Bloknot special handling
    if (category.toLowerCase().includes("bloknot")) {
      if (quantity === 500) return; // 500 is fixed
      if (newQty < 1000) return; // Cannot go below 1000 if 1000 was selected
    } else if (isRestrictedQuantityProduct(category, product.miktar || product.desc)) {
      return;
    }
    
    setQuantity(newQty);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-xl md:max-w-3xl max-h-[85vh] rounded-[24px] sm:rounded-[32px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] overflow-hidden border border-white/20 relative flex flex-col"
      >
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-white p-8 sm:p-12 rounded-xl shadow-2xl max-w-2xl w-full relative"
              >
                <button 
                  onClick={() => { setShowSuccess(false); onClose(); }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
                >
                  <X size={24} />
                </button>
                
                <div className="text-center space-y-10">
                  <p className="text-gray-600 font-medium text-lg sm:text-xl">
                    Ürün Başarılı Bir Şekilde Sepetinize Eklendi!...
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button 
                      onClick={() => { setShowSuccess(false); onClose(); }}
                      className="w-full sm:w-auto px-8 py-4 bg-[#33C3F0] text-white font-bold rounded-lg border-2 border-[#A2D149] hover:opacity-90 transition-all uppercase text-sm sm:text-base tracking-wide shadow-lg"
                    >
                      ALIŞVERİŞE DEVAM ET
                    </button>
                    <button 
                      onClick={() => { setShowSuccess(false); onClose(); setIsCartOpen(true); }}
                      className="w-full sm:w-auto px-12 py-4 bg-[#33C3F0] text-white font-bold rounded-lg hover:opacity-90 transition-all uppercase text-sm sm:text-base tracking-wide shadow-lg"
                    >
                      SİPARİŞ VER
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-4 sm:p-6 pb-2 border-b border-gray-100 bg-white/90 backdrop-blur-md z-20 shrink-0">
          {/* Header */}
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-3 text-black font-black uppercase tracking-tighter text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <span className="text-primary">{category}</span>
                <span className="text-gray-300 font-light">|</span>
                <span className="text-gray-500">{product.code}</span>
                <span className="text-gray-300 font-light">|</span>
                <span className="line-clamp-1 text-black">{product.desc}</span>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-full text-gray-900 hover:text-black transition-all shrink-0 border border-gray-100"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Discount List or Product Info */}
            <div className="md:col-span-8 space-y-4">
              {product.availableOptions ? (
                <div className="space-y-1">
                  {product.availableOptions.map((opt: any, idx: number) => {
                    const optQty = parseInt(opt.miktar.replace(/[^\d]/g, ''));
                    const colorDiff = (colorCount > 1 && product.colorDiffValues) ? (product.colorDiffValues[idx] || 0) * (colorCount - 1) : 0;
                    const rowTotal = opt.price + colorDiff;
                    const isCurrent = (category.toLowerCase().includes("bloknot") && quantity >= 1000 && optQty === 1000) || quantity === optQty;
                    
                    return (
                      <button 
                        key={idx}
                        onClick={() => setQuantity(optQty)}
                        className={`w-full text-left p-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-between group border ${
                          isCurrent 
                            ? 'bg-primary/5 border-primary/20 shadow-sm' 
                            : 'hover:bg-gray-50 border-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`text-sm sm:text-base font-black ${isCurrent ? 'text-primary' : 'text-gray-800'}`}>
                            {opt.miktar}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-sm sm:text-base font-black ${isCurrent ? 'text-primary' : 'text-gray-700'}`}>
                            {formatPrice(rowTotal)}
                          </span>
                          {isCurrent && <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : isRestrictedQuantityProduct(category, product.miktar || product.desc) ? (
                <div className="space-y-4">
                  <div className="w-full text-left p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-black text-primary">
                        {quantity.toLocaleString('tr-TR')} Adet (Sabit Liste Paketi)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm sm:text-base font-black text-primary">
                        {formatPrice(totalPrice)}
                      </span>
                      <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600 space-y-1.5">
                    <p className="font-bold text-gray-800">Ürün Bilgileri:</p>
                    <p>• {product.desc}</p>
                    {product.ebat && <p>• Ebat: {product.ebat}</p>}
                    <p>• Miktar: {quantity.toLocaleString('tr-TR')} Adet</p>
                  </div>
                </div>
              ) : ["Kataloglar", "Ambalaj", "Kutu", "Zarf", "Antetli Kağıt", "Dosya"].some(cat => category.toLowerCase().includes(cat.toLowerCase())) ? (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-lg font-black text-black mb-4 uppercase tracking-tight">Ürün Bilgileri</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <p className="text-gray-600 font-medium leading-relaxed">{product.desc}</p>
                    </div>
                    {product.model && (
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <p className="text-gray-600 font-medium leading-relaxed">Model: {product.model}</p>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <p className="text-gray-600 font-medium leading-relaxed">Minimum Sipariş: {product.miktar}</p>
                    </div>
                    {product.note && (
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <p className="text-red-600 font-bold leading-relaxed">Önemli Not: {product.note}</p>
                      </div>
                    )}
                    <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                      <p className="text-xs font-bold text-primary uppercase tracking-wide">Not:</p>
                      <p className="text-xs text-gray-500 mt-1">Bu ürün için güncel fiyat bilgisi almak üzere lütfen sepetinize ekleyip sipariş talebi oluşturunuz.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  {[1, 2, 3, 4, 5, 10].map(multiplier => {
                    const q = baseQuantity * multiplier;
                    const d = calculateDiscount(q, category, product.code);
                    const total = calculateTotalPrice(q);
                    const isCurrent = quantity === q;
                    
                    return (
                      <button 
                        key={multiplier}
                        onClick={() => setQuantity(q)}
                        className={`w-full text-left p-2 px-4 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                          isCurrent 
                            ? 'bg-primary/5 border border-primary/20' 
                            : 'hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`text-sm sm:text-base font-bold ${isCurrent ? 'text-primary' : 'text-gray-700'}`}>
                            {q.toLocaleString('tr-TR')} Adet
                          </span>
                          {d > 0 && extraPrice === null && (
                            <span className="text-[11px] font-black text-red-600 uppercase tracking-tight">
                              %{(d * 100).toFixed(0)} İndirimli
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-sm sm:text-base font-black ${isCurrent ? 'text-primary' : 'text-gray-400'}`}>
                            {formatPrice(total)}
                          </span>
                          {isCurrent && <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Controls & Total */}
            <div className="md:col-span-4 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2 flex flex-col items-center">
                  {!isMakbuzVeForm && (
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest text-center block">
                      {product.availableOptions ? "Paket Seçimi (Fiyat Listesi)" : "Adet Seçimi"}
                    </label>
                  )}
                  {isRestrictedQuantityProduct(category, product.miktar || product.desc) && !isMakbuzVeForm && (
                    <p className="text-[10px] text-red-500 font-bold text-center mt-1 uppercase tracking-tight">
                      * Bu ürün sadece listedeki paketler halinde sipariş edilebilir.
                    </p>
                  )}
                  
                  {product.availableOptions ? (
                    <div className="space-y-4 w-full">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
                        {product.availableOptions.map((opt: any, idx: number) => {
                          const optQty = parseInt(opt.miktar.replace(/[^\d]/g, ''));
                          const isSelected = (category.toLowerCase().includes("bloknot") && quantity >= 1000 && optQty === 1000) || quantity === optQty;
                          return (
                            <button
                              key={idx}
                              onClick={() => setQuantity(optQty)}
                              className={`py-3 px-2 rounded-xl border-2 font-black text-xs transition-all ${
                                isSelected 
                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                                : 'bg-white border-gray-100 text-black hover:border-primary/30'
                              }`}
                            >
                              <div className="flex flex-col">
                                <span>{opt.miktar}</span>
                                <span className={`text-[9px] font-bold ${isSelected ? 'text-white/70' : 'text-primary'}`}>
                                  {opt.price.toLocaleString('tr-TR')} ₺
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Multiply quantity for 1000 Cilt option in Bloknot */}
                      {category.toLowerCase().includes("bloknot") && quantity >= 1000 && (
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Miktar Artır (1000 ve Katları)</span>
                          <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden bg-white w-full shadow-sm max-w-[200px]">
                            <button 
                              onClick={() => handleQuantityChange(quantity - 1000)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-black transition-colors disabled:opacity-20"
                              disabled={quantity <= 1000}
                            >
                              <Minus size={16} strokeWidth={3} />
                            </button>
                            <div className="flex-grow text-center border-x-2 border-gray-50 py-2 bg-gray-50/30">
                              <span className="text-sm font-black text-black block leading-none tabular-nums">
                                {quantity.toLocaleString('tr-TR')}
                              </span>
                            </div>
                            <button 
                              onClick={() => handleQuantityChange(quantity + 1000)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-black transition-colors"
                            >
                              <Plus size={16} strokeWidth={3} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden bg-white w-full shadow-sm">
                      <button 
                        onClick={() => handleQuantityChange(quantity - baseQuantity)}
                        className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 text-black transition-colors disabled:opacity-20"
                        disabled={quantity <= baseQuantity || (category === "Dosyalar" && product.miktar === "500 Adet") || isRestrictedQuantityProduct(category, product.miktar || product.desc)}
                      >
                        <Minus size={20} strokeWidth={3} />
                      </button>
                      <div className="flex-grow text-center border-x-2 border-gray-50 py-3 bg-gray-50/30">
                        <span className="text-xl font-black text-black block leading-none tabular-nums">
                          {quantity.toLocaleString('tr-TR')}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleQuantityChange(quantity + baseQuantity)}
                        className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 text-black transition-colors disabled:opacity-20"
                        disabled={(category === "Dosyalar" && product.miktar === "500 Adet") || isRestrictedQuantityProduct(category, product.miktar || product.desc)}
                      >
                        <Plus size={20} strokeWidth={3} />
                      </button>
                    </div>
                  )}
                </div>

                {product.colorDiffValues && (
                  <div className="space-y-2 flex flex-col items-center">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Renk Seçimi</label>
                    <div className="grid grid-cols-4 gap-2 w-full">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          onClick={() => setColorCount(num)}
                          className={`py-2 rounded-xl border-2 font-black transition-all flex flex-col items-center justify-center ${
                            colorCount === num 
                            ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/20' 
                            : 'bg-white border-gray-100 text-black hover:border-primary/30'
                          }`}
                        >
                          <span className="text-sm leading-none block">{num}</span>
                          <span className="text-[10px] tracking-tight block mt-0.5">RENK</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2 pt-2 border-t border-gray-50">
                  {isMakbuzVeForm && (
                    <div className="text-right mb-2">
                       <span className="text-primary text-lg font-medium uppercase tracking-widest">
                         Numaratörlü
                       </span>
                     </div>
                   )}
                  {!isMakbuzVeForm && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-gray-400">Seçilen Adet:</span>
                      <span className="font-black text-gray-700">{quantity.toLocaleString('tr-TR')} Adet</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-gray-400">Birim Fiyat:</span>
                    <span className="font-black text-gray-700">{(totalPrice / quantity).toLocaleString('tr-TR', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} ₺</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-gray-400">Toplam Tutar:</span>
                    <span className="font-black text-gray-700">{formatPrice(totalPrice)}</span>
                  </div>
                  
                  {quantity >= 7000 && quantity < 10000 && !["Kataloglar", "Makbuz", "Ambalaj", "Kutu", "Zarf", "Form", "Fiş", "Bilet", "Reçete", "Senet", "Poliçe", "Sözleşme", "Adisyon", "Kiralama", "broşür", "brosur", "el ilanı", "el ilani", "etiket", "kitap ayracı", "kitap ayraci", "yağ kartı", "yag karti", "karton çanta", "karton canta"].some(cat => category.toLowerCase().includes(cat.toLowerCase())) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl text-[11px] font-bold text-amber-800 leading-tight"
                    >
                      Sadece {formatPrice(Math.max(0, (basePrice * (10000 / baseQuantity) * (1 - calculateDiscount(10000, category, product.code))) - totalPrice))} daha ödeyerek 10.000 adet alabilirsiniz, bu sizin için çok daha kârlı!
                    </motion.div>
                  )}
                </div>

                <div className="bg-[#f8fbfc] p-6 rounded-2xl border border-[#eef2f3] text-center space-y-1 shadow-sm">
                  <p className="text-[10px] font-black text-[#94a3b8] uppercase tracking-[0.2em]">TOPLAM ÖDENECEK</p>
                  <div className="text-3xl sm:text-4xl font-black text-[#0ea5e9] tracking-tighter flex items-center justify-center gap-1">
                    {isNaN(totalPrice) ? (
                      <span className="text-xl sm:text-2xl">Fiyat Alınız</span>
                    ) : (
                      <>
                        <span>{new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(totalPrice)}</span>
                        <span className="text-2xl sm:text-3xl mt-1">₺</span>
                      </>
                    )}
                  </div>
                </div>

                {/* KDV Hariç Bilgilendirme - Fiyat Tablosu Altı */}
                <div className="text-center">
                  <p className="text-[11px] text-slate-500 font-bold">
                    * Tabloda ve hesaplamada belirtilen fiyatlarımıza %20 KDV dahil değildir.
                  </p>
                </div>

                {/* Proof and Delivery Time Indicators */}
                <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 text-left space-y-2 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-900 uppercase tracking-tight">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>Aynı Gün Tasarım Onayı</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 font-semibold leading-relaxed pl-6">
                    Onay gerektiren siparişlerde PDF prova aynı gün iletilir.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-tight pt-2 border-t border-emerald-200/60">
                    <Truck size={16} className="text-primary shrink-0" />
                    <span>Üretim Süresi: Ortalama 3–4 iş günü</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-semibold pl-6">
                    (Ürün grubuna ve adede göre değişiklik gösterebilir.)
                  </p>
                  <div className="pt-2 border-t border-emerald-200/60">
                    <p className="text-[11px] text-slate-700 font-bold leading-relaxed flex items-start gap-1.5">
                      <Zap size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>⚡ Acil teslimat talebiniz varsa sipariş öncesinde bizimle iletişime geçerek uygunluk durumu hakkında bilgi alabilirsiniz.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Action */}
        <div className="p-4 sm:p-8 pt-0 shrink-0 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Merhaba, ${category} - ${product.code} (${product.desc}, Ebat: ${product.ebat || '-'}) için ${quantity.toLocaleString('tr-TR')} adet (${formatPrice(totalPrice)} + KDV) hakkında bilgi almak ve sipariş vermek istiyorum.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm uppercase tracking-tight flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
          >
            <MessageCircle size={18} />
            <span>WhatsApp ile İletişim</span>
          </a>
          <button 
            onClick={handleAdd}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0ea5e9] text-white rounded-2xl font-black text-sm hover:bg-[#0284c7] transition-all shadow-[0_20px_40px_-12px_rgba(14,165,233,0.3)] uppercase tracking-tight flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <ShoppingCart size={18} className="stroke-[3px]" />
            <span>SEPETE EKLE</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const FeatureTooltip = (_props: { code: string }) => {
  return null;
};

// KARTVIZIT_DATA and EL_ILANI_DATA are imported from `./data/productData`

// AFIS_DATA, ANTETLI_DATA, DOSYALAR_DATA, ETIKET_DATA, OTO_PASPAS_DATA, and MAGNET_DATA are imported from `./data/productData`

// AMERIKAN_SERVIS_DATA, KUTU_DATA, AMBALAJ_DATA, and PRICE_LIST are imported from `./data/productData`

const banners = [
  {
    img: LOCAL_ASSETS.b3,
    alt: "Mavi Basım Magnet Baskı Banner",
    title: "Özel Kesim Reklam Magnetlerinde Avantajlı Baskı Çözümleri",
    subtitle: "✅ Topkapı Koordinasyon Noktamızdan — 81 İle Hızlı Kargo\n✅ Özel Kesim & Yüksek Mıknatıs Tutuculuğu",
    blueBtn: { text: "Magnet Fiyatları", link: "/magnet" },
    blackBtn: { text: "Hızlı Sipariş Ver", link: WHATSAPP_LINK }
  },
  {
    img: LOCAL_ASSETS.b4,
    alt: "Mavi Basım Kurumsal Matbaa ve Makbuz Form Baskı Banner",
    title: "Kurumsal Matbaa, Makbuz ve Resmi Form Baskıları",
    subtitle: "✅ Otokopili Makbuz, Fatura, Adisyon & Sözleşme Basımı\n✅ Numaratörlü & Ciltli Üretim — Türkiye Geneli Teslimat",
    blueBtn: { text: "Makbuz & Form Fiyatları", link: "/makbuz-ve-formlar" },
    blackBtn: { text: "WhatsApp'tan Fiyat Al", link: WHATSAPP_LINK }
  },
  {
    img: LOCAL_ASSETS.b5,
    alt: "Mavi Basım Kutu ve Ambalaj Baskı Banner",
    title: "Özel Kesim Kutu ve Ambalaj Baskı Çözümleri",
    subtitle: "✅ Markanıza Özel Kutular ve Kargo Ambalajları\n✅ Topkapı Hizmet Noktası ve Hızlı Gönderim",
    blueBtn: { text: "Kutu & Ambalaj İncele", link: "/kutu" },
    blackBtn: { text: "Tasarım Desteği Al", link: "/grafik-tasarim" }
  },
  {
    img: LOCAL_ASSETS.b1,
    alt: "Mavi Basım Türkiye Geneli Profesyonel Matbaa Banner",
    title: "Türkiye Geneli Uygun Fiyatlı Profesyonel Matbaa Baskı",
    subtitle: "✅ Kartvizit, Broşür, Magnet, Katalog ve Etiket\n✅ Topkapı Hizmet Noktasından 81 İle Gönderim",
    blueBtn: { text: "Fiyat Listesini İncele", link: "/makbuz-ve-formlar" },
    blackBtn: { text: "Hızlı Sipariş Ver", link: WHATSAPP_LINK }
  },
  {
    img: LOCAL_ASSETS.b2,
    alt: "Mavi Basım Broşür ve El İlanı Baskı Banner",
    title: "Broşür ve El İlanında Yüksek Kalite, Bütçe Dostu Fiyat",
    subtitle: "✅ 115gr & 128gr Kuşe Kağıt • A6, A5, A4 Baskı\n✅ Parlak / Mat Selefon ve Katlama Seçenekleri",
    blueBtn: { text: "Broşür Fiyatları", link: "/brosur" },
    blackBtn: { text: "WhatsApp'tan Fiyat Al", link: WHATSAPP_LINK }
  }
];

const PRODUCTS = [
  { id: "kartvizit", name: "KARTVİZİT BASKI", price: "580 ₺", desc: "1.000 Adet", subtext: "Profesyonel çift taraflı kartvizit baskı çözümleri.", image: LOCAL_ASSETS.kartvizit, type: "kartvizit" },
  { id: "el_ilani", name: "EL İLANI BASKI", price: "1.150 ₺", desc: "2.000 Adet", subtext: "Hızlı, ucuz ve etkili kitlelere ulaşım sağlayan çift taraflı el ilanı.", image: LOCAL_ASSETS.el_ilani, type: "el-ilani" },
  { id: "brosur", name: "BROŞÜR BASKI", price: "1.200 ₺", desc: "1.000 Adet", subtext: "A6, A5, A4 ve kırım katlamalı yüksek kaliteli broşür baskı seçenekleri.", image: LOCAL_ASSETS.brosur, type: "brosur" },
  { id: "magnet", name: "MAGNET BASKI", price: "960 ₺", desc: "1.000 Adet", subtext: "Dolaplarda kalıcı reklam sağlayan oval/özel kesim magnet baskı.", image: LOCAL_ASSETS.magnet, type: "magnet" },
  { id: "kitap_ayraci", name: "KİTAP AYRACI BASKI", price: "1.250 ₺", desc: "1.000 Adet", subtext: "Kitap kurtları için özel tasarımlı parlak/mat selefonlu kitap ayraçları.", image: LOCAL_ASSETS.kitap_ayraci, type: "kitap-ayraci" },
  { id: "yag_karti", name: "YAĞ KARTI BASKI", price: "950 ₺", desc: "1.000 Adet", subtext: "Oto servisler için dayanıklı ve pratik araç periyodik bakım takip kartı.", image: LOCAL_ASSETS.yag_karti, type: "yag-karti" },
  { id: "etiket", name: "ETİKET BASKI", price: "690 ₺", desc: "1.000 Adet", subtext: "Ürünlerinizi ön plana çıkaran dayanıklı kendinden yapışkanlı etiket çeşitleri.", image: LOCAL_ASSETS.etiket, type: "etiket" },
  { id: "zarf", name: "ZARF BASKI", price: "2.100 ₺", desc: "1.000 Adet", subtext: "Kurumsal yazışmalarınız için pencereli ve penceresiz antetli diplomatik zarflar.", image: LOCAL_ASSETS.zarf, type: "zarf" },
  { id: "anteli_kagit", name: "ANTETLİ KAĞIT BASKI", price: "1.800 ₺", desc: "2.000 Adet", subtext: "Marka prestijinizi yansıtan yüksek kaliteli kurumsal antetli kağıt.", image: LOCAL_ASSETS.anteli_kagit, type: "antetli" },
  { id: "cep", name: "CEPLİ DOSYA BASKI", price: "5.600 ₺", desc: "500 Adet", subtext: "Teklif, sözleşme ve evraklarınızı koruyan prestijli cepli dosyalar.", image: LOCAL_ASSETS.cep, type: "dosyalar" },
  { id: "bloknot", name: "BLOKNOT BASKI", price: "6.200 ₺", desc: "500 Adet", subtext: "Baş tarafı tutkallı veya tel dikişli pratik kurumsal not defterleri.", image: LOCAL_ASSETS.bloknot, type: "bloknotlar" },
  { id: "kup", name: "KÜP BLOKNOT BASKI", price: "8.350 ₺", desc: "100 Adet", subtext: "Masalarda her an el altında olan pratik ve kalıcı küp bloknotlar.", image: LOCAL_ASSETS.kup, type: "kup-bloknot" },
  { id: "katalog", name: "KATALOG BASKI", price: "5.400 ₺", desc: "50 Adet", subtext: "Ürün ve hizmetlerinizi detaylı anlatan çok sayfalı kaliteli kataloglar.", image: LOCAL_ASSETS.katalog, type: "katalog" },
  { id: "amerikan_servis", name: "AMERİKAN SERVİS BASKI", price: "2.900 ₺", desc: "2.000 Adet", subtext: "Restoran ve kafeler için hijyenik ve özel marka logolu masa örtüleri.", image: LOCAL_ASSETS.amerikan_servis, type: "amerikan-servis" },
  { id: "karton_canta", name: "KARTON ÇANTA BASKI", price: "8.400 ₺", desc: "500 Adet", subtext: "Doğa dostu, şık ve dayanıklı kurumsal ambalaj taşıma çantaları.", image: LOCAL_ASSETS.karton_canta, type: "karton-canta" },
  { id: "otopaspa…47682 tokens truncated…="text-slate-900">Online Baskı Avantajları</strong> değerlendirmesi yapıyoruz.
                </p>
              </div>

            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-3xl hover:shadow-lg transition-all duration-300 flex flex-col justify-between mt-0 md:mt-4">
              <div>
                <span className="text-[10px] text-primary font-black font-mono tracking-widest uppercase bg-primary/10 px-2.5 py-1 rounded-full">Maliyet Hesaplama</span>
                <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight mt-4 mb-3">
                  Matbaa Fiyatları Nasıl Hesaplanır?
                </h3>
                <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed mb-4">
                  Baskı bütçenizi belirleyen temel etkenler: Ebat, sayfa sayısı, kağıt cinsi ve tiraj oranları. <strong className="text-slate-900">Matbaa Fiyatları Nasıl Hesaplanır?</strong> ve kuşe gramajı ile selefon tercihlerinin <strong className="text-slate-900">Online Matbaa Fiyatları</strong> üzerindeki doğrudan etkisi.
                </p>
              </div>
              <Link to="/blog/matbaa-fiyatlarini-neler-belirler" className="text-xs font-black text-primary hover:text-secondary uppercase tracking-wider flex items-center gap-1 mt-auto">
                Yazıyı Oku <span>→</span>
              </Link>
            </div>

            {/* Card 5 */}
            <div className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-3xl hover:shadow-lg transition-all duration-300 flex flex-col justify-between mt-0 md:mt-4">
              <div>
                <span className="text-[10px] text-primary font-black font-mono tracking-widest uppercase bg-primary/10 px-2.5 py-1 rounded-full">ÜRÜN BAZLI MALİYET</span>
                <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight mt-4 mb-3">
                  Broşür &amp; Kartvizit Fiyatları Neye Göre Değişir?
                </h3>
                <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed mb-4">
                  Broşürde katlama ve kırım sayısı, kartvizitte ise lokal lak, kabartma yaldız ve bıçaklı kesim özellikleri maliyeti etkiler. <strong className="text-slate-900">Broşür Baskı Fiyatlarını Etkileyen Faktörler</strong> ile <strong className="text-slate-900">Kartvizit Baskı Fiyatları Neye Göre Değişir?</strong> sorusunun yanıtı bu rehberimizde.
                </p>
              </div>

            </div>

            {/* Card 6 */}
            <div className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-3xl hover:shadow-lg transition-all duration-300 flex flex-col justify-between mt-0 md:mt-4">
              <div>
                <span className="text-[10px] text-primary font-black font-mono tracking-widest uppercase bg-primary/10 px-2.5 py-1 rounded-full">FİRMA REHBERİ</span>
                <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight mt-4 mb-3">
                  İstanbul Matbaa Firmaları Seçim Rehberi
                </h3>
                <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed mb-4">
                  İyi bir üreticiyle çalışarak sorunsuz baskı almanın püf noktaları. <strong className="text-slate-900">İstanbul'da Matbaa Firmaları Arasında Seçim Rehberi</strong> ve <strong className="text-slate-900">Kurumsal Matbaa Firması Seçerken Dikkat Edilecekler</strong>. <strong className="text-slate-900">Uygun Fiyatlı Matbaa Seçerken Nelere Dikkat Edilmeli?</strong> sorusuna profesyonel bakış.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Neden Online Matbaa? Section */}
      <section className="bg-slate-50 py-16 md:py-24 border-t border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-100 p-5 sm:p-8 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -mr-40 -mt-40 blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-6">
                  Neden <span className="text-primary">Online Matbaa</span> Çözümleri?
                </h2>
                <div className="space-y-5 text-slate-600 font-semibold leading-relaxed text-sm md:text-base">
                  <p>
                    Geleneksel matbaacılıkta yaşanan zaman kayıpları, sınırlı tasarım seçenekleri ve yüksek aracı maliyetleri artık geride kaldı. <strong>Online Matbaa</strong> sistemleri sayesinde işletmenizin tüm basılı ihtiyaçlarını dükkanınızdan çıkmadan, bilgisayar veya cep telefonunuz üzerinden kolayca yönetebilirsiniz.
                  </p>
                  <p>
                    Mavi Basım olarak online matbaacılığı İstanbul Topkapı'ndaki hizmet noktamızın güvencesiyle birleştiriyoruz. Siparişlerinizi doğrudan avantajlı fiyatlarla alırken, grafik tasarım ekibimizle iletişimde kalarak yüksek kaliteli sonuçlar elde edersiniz. Esnek sipariş adetleri, şeffaf fiyat politikası ve kargo teslimatı sayesinde zamandan ve bütçenizden tasarruf sağlarsınız.
                  </p>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl space-y-6">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">
                  Online Matbaa Avantajları
                </h3>
                <ul className="space-y-4">
                  {[
                    "Topkapı merkezimizden şeffaf ve net imalat fiyatları",
                    "Uzman grafik ekibimizle WhatsApp üzerinden anlık iletişim",
                    "Baskı öncesi ücretsiz kesim ve renk kalibrasyonu kontrolü",
                    "Baskı öncesi dijital PDF prova kontrolü",
                    "Türkiye genelinde 81 ile koruyucu ambalajlarla kargo teslimatı"
                  ].map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs md:text-sm font-bold text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sık Sorulan Sorular (FAQ) Section */}
      <section id="faq" className="bg-white py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
              SIK SORULAN SORULAR
            </div>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-4">
              Matbaa ve Baskı Hakkında <span className="text-primary">Merak Edilenler</span>
            </h2>
            <p className="text-slate-600 font-semibold leading-relaxed text-sm md:text-base">
              Online matbaa siparişi, tasarım onay süreci, kargo ve teslimat süreleri hakkında en çok sorulan soruların yanıtları.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
            {HOME_FAQS.map((faq, i) => (
              <div key={i} className="h-full border border-slate-200 rounded-2xl p-5 md:p-6 bg-slate-50/50 hover:bg-white hover:border-primary/40 transition-all duration-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-xs md:text-sm text-slate-900 mb-3 flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                    <span className="leading-snug">{faq.question}</span>
                  </h3>
                  <div className="h-px bg-slate-100 mb-3 w-full" />
                  <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* En Çok Aranan Matbaa Ürünleri (YENİ SEO İÇ LİNKLEME BÖLÜMÜ - FOOTER ÖNCESİ) */}
      <section className="bg-slate-900 text-white py-14 md:py-20 border-t border-slate-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#00E5FF]/10 text-[#00E5FF] px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3 border border-[#00E5FF]/20">
              HIZLI ERİŞİM
            </div>
            <h2 className="text-2xl md:text-3.5xl font-black text-white uppercase tracking-tight mb-4">
              En Çok Aranan <span className="text-[#00E5FF]">Matbaa Ürünleri</span>
            </h2>
            <p className="text-slate-300 font-medium leading-relaxed text-xs md:text-sm max-w-4xl mx-auto">
              Mavi Basım, işletmeniz için en kaliteli <strong className="text-white">Matbaa Ürünleri</strong> sunan, Türkiye geneline hizmet veren <strong className="text-[#00E5FF]">Online Matbaa</strong> ve <strong className="text-[#00E5FF]">Online Baskı</strong> merkezidir. İhtiyacınıza özel bütçe dostu <strong className="text-white">Matbaa Fiyatları</strong> ile profesyonel <strong className="text-white">Baskı Hizmetleri</strong> alabilir, hızlı online siparişinizi güvenle verebilirsiniz.
            </p>
          </div>

          {/* Categorized Internal Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Category 1: Kurumsal Ürünler */}
            <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl">
              <h3 className="text-sm font-black text-[#00E5FF] uppercase tracking-wider mb-4 pb-2 border-b border-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF]" /> Kurumsal Ürünler
              </h3>
              <div className="grid grid-cols-1 gap-2 text-xs font-bold">
                <Link to="/kartvizit" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Kartvizit Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/kartvizit" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Kartvizit Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/antetli" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Antetli Kağıt Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/antetli" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Antetli Kağıt Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/zarf" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Diplomat Zarf Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/zarf" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Diplomat Zarf Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/dosyalar" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Cepli Dosya Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/dosyalar" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Cepli Dosya Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/bloknotlar" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Bloknot Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/bloknotlar" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1">
                  <span>Bloknot Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
              </div>
            </div>

            {/* Category 2: Reklam Ürünleri */}
            <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl">
              <h3 className="text-sm font-black text-[#00E5FF] uppercase tracking-wider mb-4 pb-2 border-b border-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF]" /> Reklam Ürünleri
              </h3>
              <div className="grid grid-cols-1 gap-2 text-xs font-bold">
                <Link to="/brosur" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Broşür Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/brosur" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Broşür Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/el-ilani" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>El İlanı Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/el-ilani" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>El İlanı Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/kataloglar" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Katalog Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/kataloglar" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Katalog Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/magnet" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Magnet Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/magnet" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Magnet Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/afis" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Afiş Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/afis" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1">
                  <span>Afiş Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
              </div>
            </div>

            {/* Category 3: Ambalaj Ürünleri */}
            <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl">
              <h3 className="text-sm font-black text-[#00E5FF] uppercase tracking-wider mb-4 pb-2 border-b border-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF]" /> Ambalaj Ürünleri
              </h3>
              <div className="grid grid-cols-1 gap-2 text-xs font-bold">
                <Link to="/etiket" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Etiket Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/etiket" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Etiket Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/kutu" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Kutu Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/kutu" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Kutu Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/karton-canta" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Karton Çanta Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/karton-canta" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Karton Çanta Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/ambalaj" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Ambalaj Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/oto-paspas" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Oto Paspas Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/yag-karti" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1">
                  <span>Yağ Kartı Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
              </div>
            </div>

            {/* Category 4: Makbuz & Formlar ve Ana Kelimeler */}
            <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl">
              <h3 className="text-sm font-black text-[#00E5FF] uppercase tracking-wider mb-4 pb-2 border-b border-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF]" /> Makbuz &amp; Formlar
              </h3>
              <div className="grid grid-cols-1 gap-2 text-xs font-bold">
                <Link to="/makbuz-ve-formlar" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Makbuz Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/makbuz-ve-formlar" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Makbuz Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/siparis-fisi" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Sipariş Fişi Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/siparis-fisi" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Sipariş Fişi Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/amerikan-servis" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Amerikan Servis Baskı</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/amerikan-servis" className="text-slate-300 hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span>Amerikan Servis Fiyatları</span> <span className="text-[10px] text-slate-500">→</span>
                </Link>
                <Link to="/#fiyatlar" className="text-[#00E5FF] hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40 font-black">
                  <span>Matbaa Fiyatları</span> <span className="text-[10px] text-[#00E5FF]">★</span>
                </Link>
                <Link to="/#siparis-sureci" className="text-[#00E5FF] hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40 font-black">
                  <span>Online Matbaa</span> <span className="text-[10px] text-[#00E5FF]">★</span>
                </Link>
                <Link to="/#products" className="text-[#00E5FF] hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 font-black">
                  <span>Online Baskı</span> <span className="text-[10px] text-[#00E5FF]">★</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Ticari CTA Bandı (Satın Alma Niyetli SEO) */}
          <div className="mt-10 max-w-7xl mx-auto bg-gradient-to-r from-primary to-blue-700 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
            <div className="text-center md:text-left">
              <span className="bg-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block">
                TOPKAPI HİZMET MERKEZİNDEN
              </span>
              <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-tight">
                Kurumsal Baskı Çözümleri &amp; Toptan Baskı Avantajları
              </h3>
              <p className="text-xs md:text-sm text-white/80 font-medium mt-1">
                Avantajlı fiyatlar ile Online Matbaa Siparişi oluşturun. Hemen teklif alın, hızlı üretim başlasın!
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs md:text-sm uppercase px-5 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>WhatsApp ile Sipariş</span>
              </a>
              <Link
                to="/#products"
                className="bg-white text-slate-900 hover:bg-slate-100 font-black text-xs md:text-sm uppercase px-5 py-3.5 rounded-xl transition-all shadow-md"
              >
                Online Sipariş Ver
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

// KutuPage is imported from ./components/Kutu.tsx

const SEO_SPECS: Record<string, {
  role: string;
  authority: string;
  process: string;
  machines: string;
  paper: string;
  postPress: string;
}> = {
  "kartvizit": {
    role: "Kartvizit Çözümleri",
    authority: "Kartvizit siparişleriniz kalite standartlarımıza uygun olarak Topkapı merkezimiz koordinasyonunda hazırlanmaktadır.",
    process: "Yüksek çözünürlüklü tabaka montajının ardından, gelişmiş ofset veya dijital baskı parkurunda basılır, hassas giyotin kesimlerle tamamlanır.",
    machines: "Yüksek Hassasiyetli Ofset ve Dijital Baskı Sistemleri, Polar Giyotin, Lokal Lak ve Gofre Üniteleri.",
    paper: "350 gr. Mat/Parlak Kuşe, 350 gr. Birinci Sınıf Bristol Karton, 700 gr. Çift Kat Sıvama Karton ve Fantezi Özel Dokulu Kağıtlar.",
    postPress: "Mat/Parlak Selefon Kaplama, Lokal Kabartma Lak, Altın/Gümüş Varak Yaldız, Oval Köşe Kesimi."
  },
  "brosur": {
    role: "Broşür Çözümleri",
    authority: "Broşür siparişleriniz standartlara uygun olarak hazırlanmaktadır.",
    process: "Tasarım mizanpaj onayı sonrası tabaka montajı yapılır, çift taraflı basılıp kırım ünitelerinde katlanır.",
    machines: "4-Renk Ofset Baskı, Otomatik Kırım ve Katlama Sistemleri, Hassas Giyotin Kesim Sistemleri.",
    paper: "115 gr, 130 gr Parlak ve Mat Kuşe Kağıt Çeşitleri.",
    postPress: "Tek Kırım, Çift Kırım (C Kırım), Üç Kırım Akordeon Katlama, Koruyucu Selefon Uygulaması."
  },
  "el_ilani": {
    role: "El İlanı Çözümleri",
    authority: "El ilanı siparişleriniz Topkapı merkezimizde titizlikle hazırlanmaktadır.",
    process: "Dağıtım ve lokasyon tanıtımları için tabaka halinde basılır ve pürüzsüz giyotin bıçaklarla tam ebatında kesilerek ambalajlanır.",
    machines: "Ofset Baskı Üniteleri, Hassas Giyotin Hatları, Paketleme Üniteleri.",
    paper: "105 gr, 115 gr, 130 gr Parlak Kuşe ve Birinci Hamur Kağıtlar.",
    postPress: "Düz Giyotin Kesim, İsteğe Bağlı Kısmi Parlak Lak, Korunaklı Paketleme ve Hızlı Kargo Hazırlığı."
  },
  "katalog": {
    role: "Katalog Çözümleri",
    authority: "Katalog baskı süreçleriniz profesyonel olarak tamamlanmaktadır.",
    process: "Çok sayfalı mizanpaj montajı kalıplara aktarılır, basılan sayfalar harmanlanıp iplik dikiş veya Amerikan sıcak tutkal ciltle birleştirilir.",
    machines: "Ofset Baskı Üniteleri, Otomatik Harman Üniteleri, Amerikan Cilt Sıcak Tutkal Hatları, Tel Dikiş ve İplik Dikiş Sistemleri.",
    paper: "Kapak için 250-350 gr. Kuşe Kağıt, İç Sayfalar için 115 gr, 130 gr Parlak/Mat Kuşe Kağıtlar.",
    postPress: "Kapak Mat/Parlak Selefon, Kısmi Kabartma Lak, Sıcak Amerikan Cilt, Tel/İplik Dikiş, Gofre Kabartma."
  },
  "etiket": {
    role: "Etiket Çözümleri",
    authority: "Etiket siparişleriniz rulo ve tabaka olarak hassasiyetle hazırlanır.",
    process: "Rulo etiketlerde bobinden bobine baskı teknikleri, tabaka etiketlerde ise baskı sonrası özel bıçaklı yarı-kesim (kiss-cut) uygulanır.",
    machines: "Flekso Bobin Baskı Hattı, Rulo Dijital Baskı, Otomatik Rulo Sarım ve Dilimleme Sistemleri, Optik Kesim Ünitesi.",
    paper: "Kendinden Yapışkanlı Çıkartma Kağıdı, PP Opak (Suya Dayanıklı Plastik), PP Şeffaf Etiket, Termal Yapışkanlı Kağıtlar.",
    postPress: "Mat/Parlak Selefon Kaplama, Özel Şekilli Yarı Kesim, Altın/Gümüş Varak Yaldız, Bobine Dilimleme ve Rulo Sarım."
  },
  "kutu": {
    role: "Kutu Çözümleri",
    authority: "Kutu ve ambalaj siparişleriniz titizlikle tamamlanmaktadır.",
    process: "Amerikan Bristol veya kroma karton üzerine yapılan baskı sonrası mukavemet artırıcı selefon kaplanır. Ardından preslerde şekilli kesim yapılıp yapıştırma alanlarında katlanır.",
    machines: "Ofset Baskı Sistemleri, Şekilli Kesim Presleri, Otomatik Yan ve Dip Yapıştırma Hatları.",
    paper: "230 gr, 250 gr, 300 gr, 350 gr Amerikan Bristol Karton ve Kroma Karton Çeşitleri.",
    postPress: "Mat/Parlak Selefon, Pencereli Kutularda Şeffaf Asetat Yapıştırma, Gofre (Kabartma), Varak Yaldız, Otomatik Dip Yapıştırma."
  },
  "karton_canta": {
    role: "Karton Çanta Üreticisi",
    authority: "Karton çanta üretimi Topkapı üretim tesisimizde imal edilir.",
    process: "Kalın Amerikan Bristol kartona yapılan baskı ve selefon sonrası otomatik kazanlı preslerde kesim yapılır, alt ve ağız takviye kartonları sıvanarak el işçiliğiyle sap ipleri takılır.",
    machines: "Büyük Format Ofset Baskı, Kazanlı Kesim Presleri, Otomatik Delik Delme ve Kuşgözü Çakma Makineleri.",
    paper: "210 gr, 250 gr. Amerikan Bristol Karton, Kraft ve Esmer Ambalaj Kağıtları.",
    postPress: "Mat/Parlak Selefon, Gofre Kabartma, Altın Varak Yaldız, Kurdele veya PP İp Sap Takılması, Taban Takviye Kartonu Sıvama."
  },
  "ambalaj": {
    role: "Ambalaj Üreticisi",
    authority: "Ambalaj üretimi standartlara uygun olarak tesisimizde basılır.",
    process: "Uygun kağıtlar üzerine kokusuz, su bazlı mürekkeplerle flekso veya ofset baskı yapılır, rulo veya tabaka olarak dilimlenir.",
    machines: "Flekso Ambalaj Baskı Makineleri, Büyük Format Ofset Baskı, Bobinden Tabakaya Ebatlama Hatları.",
    paper: "Gıdaya Uygun Kraft Kağıt, Yağ Geçirmez Sülfit ve Şamua Kağıtları, OPP/PE Laminasyonlu Esnek Ambalaj Malzemeleri.",
    postPress: "Otomatik Dilimleme ve Bobine Sarım, Tabaka Kesim, Kese Kağıdı Formunda Katlama ve Yan Yapıştırma."
  },
  "zarf": {
  role: "Zarf Baskı Çözümleri",
  authority: "Zarf baskı siparişleri İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktamız üzerinden planlanmaktadır.",
  process: "Zarf seçenekleri; diplomat veya torba zarf modeli, ürün kodu, ölçü ve adet bilgilerine göre değerlendirilir.",
  machines: "Baskı, kesim ve paketleme süreçleri ürün detaylarına göre planlanır.",
  paper: "110 gr 1. Hamur kağıt seçeneği.",
  postPress: "Baskı sonrası kontrol, ebatlama ve paketleme işlemleri ürün detaylarına göre uygulanır."
},
  "magnet": {
    role: "Magnet Üreticisi",
    authority: "Magnet üretimi Topkapı üretim tesisimizde yapılmaktadır.",
    process: "Kuşe kağıda yapılan ofset baskı ve selefon kaplamanın ardından, otomatik laminasyon makinesinde rulo mıknatısa (magnet) sıvanır ve kazanlı preslerde şekilli bıçaklarla kesilir.",
    machines: "Ofset Baskı, Otomatik Magnet Sıvama (Laminasyon) Hatları, Yüksek Tonajlı Kazanlı Kesim Presleri.",
    paper: "300 gr, 350 gr. Kuşe Kağıt, 0,40 mm veya 0,50 mm Kalınlıkta İthal Rulo Mıknatıs (Magnet Tabakası).",
    postPress: "Parlak/Mat Selefon Kaplama, Özel Şekilli Bıçak Kesimi, Çapak Ayıklama, Otomatik Sayım ve Korunaklı Paketleme."
  },
  "yağ_kartı": {
    role: "Yağ Kartı Üreticisi",
    authority: "Yağ kartı imalatı İstanbul Topkapı tesisimizde gerçekleştirilmektedir.",
    process: "Tasarımı onaylanan yağ kartları tabaka montajına alınır. Ofset baskı sonrası mat selefon lamine edilir ve 4 mm delik payları ile özel bıçaklı kesim preslerinde ebatlanır.",
    machines: "Ofset Baskı Makineleri, Selefon Laminasyon Üniteleri, Kazanlı Kesim Presleri.",
    paper: "350 gr Kuşe Kağıt ve 700 gr Çift Kat (Sıvama) Karton Seçenekleri.",
    postPress: "Mat Selefon Kaplama, Özel Kesim, 4 mm İp Deliği Delme ve İp İlavesi."
  },
  "yag_karti": {
    role: "Yağ Kartı Üreticisi",
    authority: "Yağ kartı imalatı İstanbul Topkapı tesisimizde gerçekleştirilmektedir.",
    process: "Tasarımı onaylanan yağ kartları tabaka montajına alınır. Ofset baskı sonrası mat selefon lamine edilir ve 4 mm delik payları ile özel bıçaklı kesim preslerinde ebatlanır.",
    machines: "Ofset Baskı Makineleri, Selefon Laminasyon Üniteleri, Kazanlı Kesim Presleri.",
    paper: "350 gr Kuşe Kağıt ve 700 gr Çift Kat (Sıvama) Karton Seçenekleri.",
    postPress: "Mat Selefon Kaplama, Özel Kesim, 4 mm İp Deliği Delme ve İp İlavesi."
  },
  "afis": {
    role: "Afiş ve Poster Baskı Hizmetleri",
    authority: "Afiş ve poster baskı siparişleriniz kalite standartlarımıza uygun olarak Topkapı hizmet noktamız koordinasyonunda titizlikle hazırlanmaktadır.",
    process: "300 DPI yüksek çözünürlüklü tabaka montajının ardından çok renkli Heidelberg ofset baskı makinelerinde basılır, hassas giyotin kesimlerle ebatlanır ve koruyucu rulo paketleme yapılır.",
    machines: "Heidelberg Ofset Baskı Makineleri, Geniş Format Dijital Baskı Hatları, Polar Giyotin Kesim Sistemleri.",
    paper: "105 gr, 135 gr, 170 gr Parlak Kuşe Kağıtlar ve 120 gr Blueback Dış Mekan Kağıdı.",
    postPress: "Düz Giyotin Kesim, Mat/Parlak Selefon Kaplama, Rulo Sarım ve Koruyucu Tüp Paketleme."
  }
};

export const ProductSEOSection = ({ categoryKey, hideTrustFooter }: { categoryKey: string; hideTrustFooter?: boolean }) => {
  const content = PRODUCT_DESCRIPTIONS[categoryKey];
  if (!content) return null;

  const spec = SEO_SPECS[categoryKey] || {
    role: "Matbaa Üreticisi",
    authority: "Üretim süreçleri İstanbul Topkapı tesisimizde gerçekleştirilmektedir.",
    process: "Tasarımı onaylanan siparişler baskı kalıplarına aktarılır. Baskı sonrası ebatlama ve yüzey işlemleri uygulanır.",
    machines: "Ofset Baskı Makineleri, Dijital Baskı Hatları, Otomatik Mücellithane Ekipmanları.",
    paper: "Kullanım amacına uygun kuşe kağıt, Amerikan Bristol veya kroma karton seçenekleri.",
    postPress: "Selefon kaplama, kesim, kırım ve paketleme işlemleri."
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-20">
      {/* Üretici Odaklı Otorite Başlığı */}
      <div className="bg-slate-900 text-white rounded-[32px] p-8 md:p-12 shadow-2xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#00E5FF]/10 text-[#00E5FF] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            DOĞRUDAN TESLİMAT
          </div>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4 text-white">
  {categoryKey === 'zarf' ? (
    <>
      İstanbul Topkapı Hizmet ve Koordinasyon Noktamızdan{' '}
      <span className="text-[#00E5FF]">{spec.role}</span>
    </>
  ) : (
    <>
      İstanbul Topkapı Tesisimizden{' '}
      <span className="text-[#00E5FF]">{spec.role}</span> Hizmeti
    </>
  )}
</h2>
          <p className="text-gray-300 font-bold text-base md:text-lg leading-relaxed mb-0">
            {spec.authority} Siparişleriniz özenle basılarak paketlenmekte ve kargo ile adresinize sevk edilmektedir.
          </p>
        </div>
      </div>

      {/* 4 Bölümlü Üretim Süreci Detayları */}
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-gray-100 mb-12">
        <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
          <span className="w-2.5 h-6 bg-primary rounded-full" />
          <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
            Üretim Detayları &amp; Teknik Özellikleri
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <Cpu size={20} />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Üretim Süreci</h4>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              {spec.process}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <Printer size={20} />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Kullanılan Makineler</h4>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              {spec.machines}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <Layers size={20} />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Kullanılan Kağıt</h4>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              {spec.paper}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
              <Settings size={20} />
            </div>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">Baskı Sonrası İşlemler</h4>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              {spec.postPress}
            </p>
          </div>
        </div>
      </div>

      {/* Teslimat ve Onboarding Süreci Bilgilendirme Kutusu */}
      <div className="bg-slate-50 rounded-[32px] p-8 md:p-12 shadow-md border border-slate-100 mb-12">
        <div className="max-w-4xl mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
            GÜVENLİ SİPARİŞ &amp; TESLİMAT SÜRECİ
          </div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
            Tasarım Onayı, Üretim ve Kargo Süreçleri
          </h3>
          <p className="text-slate-600 font-semibold text-xs md:text-sm mt-2">
            Siparişinizin her adımı Topkapı üretim tesisimizde titizlikle takip edilir. Hata riskini en aza indirmek ve yüksek kalite standardı sunmak için uyguladığımız standart iş akışımız:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          {[
            {
              title: "Tasarım Onayı",
              desc: "Gönderdiğiniz grafik dosyaları teknik kontrolümüzden geçer. Hataları önlemek için hazırladığımız PDF prova onayınızı almadan üretime başlamayız.",
              badge: "Aynı Gün Prova"
            },
            {
              title: "Üretim Süresi",
              desc: "Baskı onayı ve ödeme teyidinin ardından siparişiniz üretim parkuruna alınır. Standart ürünlerimizin üretim süresi ortalama 2-3 iş günüdür.",
              badge: "Seri Üretim"
            },
            {
              title: "Kargo Süresi",
              desc: "Paketler kalın çift oluklu karton korumalarla hazırlanır. Türkiye geneli 81 ile anlaşmalı kargo ağımızla gönderilir. Kargo süresi 1-2 iş günüdür.",
              badge: "81 İl Sevk"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-end mb-4">
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  {item.title}
                </h4>
                <p className="text-slate-600 font-semibold text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Ortak SSS Soruları */}
        {categoryKey !== 'karton_canta' && (
          <div className="border-t border-slate-200/60 pt-8">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
              Sıkça Sorulan Sipariş ve Onay Soruları
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                <h5 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  Tasarım onayı ne kadar sürer?
                </h5>
                <p className="text-[11px] md:text-xs text-slate-600 font-semibold leading-relaxed">
                  Logonuzu ve hazır çalışmanızı iletmenizin ardından, grafik ekibimiz en geç 1-2 saat içinde teknik kontrolü tamamlar. Baskı hatalarını en aza indirmek ve yüksek kalite standardı sunmak amacıyla size dijital PDF prova sunar. "Aynı Gün PDF Prova Onayı" sistemimiz sayesinde iş akışınız aksamaz.
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                <h5 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  Baskı süreci ne zaman başlar?
                </h5>
                <p className="text-[11px] md:text-xs text-slate-600 font-semibold leading-relaxed">
                  Siparişinizin fiziksel üretimi, hazırlanan PDF prova mizanpajına WhatsApp veya e-posta üzerinden yazılı "BASKI ONAYI" vermeniz ve ödeme teyidinin alınmasıyla birlikte 24 saat içinde otomatik olarak başlar.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Standart Markdown İçeriği */}
      <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -ml-32 -mb-32 blur-3xl" />
        
        <div className={`relative prose prose-slate max-w-none text-black
          prose-headings:text-black
          prose-h2:text-3xl prose-h2:font-black prose-h2:text-black prose-h2:mb-6 prose-h2:uppercase prose-h2:tracking-tight
          prose-h3:text-2xl prose-h3:font-bold prose-h3:text-black prose-h3:mb-4
          prose-p:text-black prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
          prose-li:text-black prose-li:text-lg
          prose-strong:text-black prose-strong:font-black
          prose-em:text-black
        `}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        
        {!hideTrustFooter && categoryKey !== 'arac_kiralama' && categoryKey !== 'amerikan_servis' && categoryKey !== 'antetli_kagit' && categoryKey !== 'bloknot' && (
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-black">Yıllara Dayanan Tecrübe</h4>
                <p className="text-sm font-medium text-black">Güvenilir ve Kaliteli Baskı</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-black">81 İle Kargo</h4>
                <p className="text-sm font-medium text-black">Hızlı ve Güvenli Teslimat</p>
              </div>
            </div>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-secondary transition-all shadow-xl shadow-primary/20 flex items-center gap-3"
            >
              <img src="/WhatsApp.svg" alt="WhatsApp" width={24} height={24} className="w-6 h-6" />
              HEMEN TEKLİF AL
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

// MagnetPage is imported from ./components/Magnet.tsx












export const AppRoutes = ({ ZarfComponent = ZarfPage, BlogComponent = BlogPage, AntetliComponent = AntetliPage, DosyalarComponent = DosyalarPage, BloknotlarComponent = BloknotlarPage, KatalogComponent = KatalogPage, KartvizitComponent = KartvizitPage, MakbuzComponent = MakbuzFormlarPage }: { ZarfComponent?: React.ComponentType; BlogComponent?: React.ComponentType; AntetliComponent?: React.ComponentType; DosyalarComponent?: React.ComponentType; BloknotlarComponent?: React.ComponentType; KatalogComponent?: React.ComponentType; KartvizitComponent?: React.ComponentType; MakbuzComponent?: React.ComponentType } = {}) => {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/kutu" element={<KutuPage />} />
      <Route path="/ambalaj" element={<AmbalajPage />} />
      <Route path="/kartvizit" element={<KartvizitComponent />} />
      <Route path="/brosur" element={<BrosurPage />} />
      <Route path="/el-ilani" element={<ElIlaniPage />} />
      <Route path="/afis" element={<AfisPage />} />
      <Route path="/antetli" element={<AntetliComponent />} />
      <Route path="/dosyalar" element={<DosyalarComponent />} />
      <Route path="/etiket" element={<EtiketPage />} />
      <Route path="/oto-paspas" element={<OtoPaspasPage />} />
      <Route path="/kup-bloknot" element={<KupBloknotPage />} />
      <Route path="/magnet" element={<MagnetPage />} />
      <Route path="/kitap-ayraci" element={<KitapAyraciPage />} />
      <Route path="/yag-karti" element={<YagKartiPage />} />
      <Route path="/bloknotlar" element={<BloknotlarComponent />} />
      <Route path="/bloknot" element={<Navigate to="/bloknotlar" replace />} />
      <Route path="/amerikan-servis" element={<AmerikanServisPage />} />
      <Route path="/karton-canta" element={<KartonCantaPage />} />
      <Route path="/zarf" element={<ZarfComponent />} />
      <Route path="/kataloglar" element={<KatalogComponent />} />
      <Route path="/katalog" element={<Navigate to="/kataloglar" replace />} />
      <Route path="/makbuz-ve-formlar" element={<MakbuzFormlarPage />} />
      <Route path="/makbuz" element={<Navigate to="/makbuz-ve-formlar" replace />} />
      <Route path="/adisyon" element={<MakbuzFormlarPage />} />
      <Route path="/siparis-fisi" element={<MakbuzFormlarPage />} />
      <Route path="/siparis-fisi-baski-fiyatlari" element={<MakbuzFormlarPage />} />
      <Route path="/perakende-satis-fisi" element={<MakbuzFormlarPage />} />
      <Route path="/para-makbuzu" element={<MakbuzFormlarPage />} />
      <Route path="/sozlesme-baski" element={<MakbuzFormlarPage />} />
      <Route path="/sigorta-policeleri" element={<MakbuzFormlarPage />} />
      <Route path="/tahsilat-makbuzu" element={<MakbuzFormlarPage />} />
      <Route path="/arac-kiralama" element={<MakbuzFormlarPage />} />
      <Route path="/gider-makbuzu" element={<MakbuzFormlarPage />} />
      <Route path="/giris-bileti" element={<MakbuzFormlarPage />} />
      <Route path="/recete" element={<MakbuzFormlarPage />} />
      <Route path="/tediye-makbuzu" element={<MakbuzComponent />} />
      <Route path="/cilt-isleri" element={<GenericPriceTablePage data={CILT_ISLERI_DATA} />} />
      <Route path="/matbaa" element={<MatbaaPage />} />
      <Route path="/referanslar" element={<ReferanslarPage />} />
      <Route path="/sikca-sorulan" element={<SikcaSorulanPage />} />
      <Route path="/grafik-tasarim" element={<GrafikTasarimPage />} />
      <Route path="/hakkimizda" element={<HakkimizdaPage />} />
      <Route path="/iletisim" element={<IletisimPage />} />
      <Route path="/kullanim-sartlari" element={<KullanimSartlariPage />} />
      <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasiPage />} />
      <Route path="/cerez-politikasi" element={<CerezPolitikasiPage />} />
      <Route path="/mesafeli-satis-sozlesmesi" element={<MesafeliSatisSozlesmesiPage />} />
      <Route path="/teslimat-sartlari" element={<TeslimatSartlariPage />} />
      <Route path="/iptal-ve-iade-sartlari" element={<IptalVeiadeSartlariPage />} />
      <Route path="/teslimat-ve-iade" element={<Navigate to="/teslimat-sartlari" replace />} />
      <Route path="/lisans" element={<LisansPage />} />
      <Route path="/servis-formu" element={<Navigate to="/arac-kiralama" replace />} />
      <Route path="/blog" element={<BlogComponent />} />
      <Route path="/blog/:slug" element={<BlogComponent />} />
      <Route path="/makine-parkuru" element={<MakineParkuruPage />} />
      <Route path="/sektor/gida-kooperatif-baski" element={<Navigate to="/sektor/kutu-ambalaj-baski-cozumleri" replace />} />
      <Route path="/sektor/:slug" element={<SEOPages />} />
      
      {/* Dynamically register all static and dynamic SEO pages */}
      {Object.keys(SEO_PAGES_DATA).map(key => {
        const pData = SEO_PAGES_DATA[key];
        return (
          <Route 
            key={key} 
            path={pData.path} 
            element={<SEOPages />} 
          />
        );
      })}

      {/* Dynamic 81 Cities SEO Landing Pages */}
      <Route path="/:citySlug" element={<CityPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </React.Suspense>
  );
};

const SEOMetadataManager = () => {
  const { pathname } = useLocation();
  return pathname === '/' || ['/blog/zarf-baskisinda-diplomat-ve-torba-zarf', '/blog/antetli-kagit-baskisinda-80gr-1.hamur'].includes(pathname.replace(/\/$/, '')) ? null : <LegacySEOMetadataManager />;
};

const LegacySEOMetadataManager = () => {
  const location = useLocation();

  useEffect(() => {
    let pathname = location.pathname;
    if (pathname.endsWith('/') && pathname.length > 1) {
      pathname = pathname.slice(0, -1);
    }

    // Zarf schema'sı CanonicalLink tarafından oluşturulur.
    // Global schema yöneticisi onu ezmemelidir.
    if (pathname === '/zarf') {
      return;
    }

if (
  pathname === '/kutu' ||
  pathname === '/ambalaj' ||
  pathname === '/kup-bloknot' ||
  pathname === '/etiket' ||
  pathname === '/bloknotlar' ||
  pathname === '/antetli' ||
  pathname === '/amerikan-servis' ||
  pathname === '/oto-paspas' ||
    pathname === '/kataloglar' ||
  pathname === '/katalog' ||
  pathname === '/karton-canta' ||
  pathname === '/tahsilat-makbuzu' ||
  pathname === '/yag-karti' ||
  pathname === '/recete' ||
  pathname === '/para-makbuzu' ||
pathname === '/kartvizit' ||
  pathname === '/dosyalar'
) {
  const scriptEl = document.getElementById('app-seo-metadata-jsonld');
  if (scriptEl) scriptEl.remove();
  return;
}

    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://mavibasim.com/#organization",
      "name": "Mavi Basım Matbaa & Reklam",
      "url": "https://mavibasim.com",
      "logo": "https://mavibasim.com/mavilogo.png",
      "image": "https://mavibasim.com/mavilogo.png",
      "telephone": "+905366022373",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB",
        "addressLocality": "Zeytinburnu",
        "addressRegion": "İstanbul",
        "addressCountry": "TR"
      }
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://mavibasim.com/#website",
      "url": "https://mavibasim.com",
      "name": "Mavi Basım Matbaa",
      "publisher": { "@id": "https://mavibasim.com/#organization" }
    };

    const schemas: any[] = [orgSchema, websiteSchema];

    if (pathname !== '/' && !pathname.startsWith('/blog') && pathname !== '/ambalaj' && pathname !== '/oto-paspas' && pathname !== '/kataloglar' && pathname !== '/katalog' && pathname !== '/gider-makbuzu' && pathname !== '/tahsilat-makbuzu') {
      const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Ana Sayfa",
            "item": "https://mavibasim.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": pathname.replace('/', '').replace('-', ' ').toUpperCase(),
            "item": `https://mavibasim.com${pathname}`
          }
        ]
      };
      schemas.push(breadcrumb);
    }

    let scriptEl = document.getElementById('app-seo-metadata-jsonld') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'app-seo-metadata-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schemas);

  }, [location.pathname]);

  return null;
};

export default function App({ Router = BrowserRouter, ZarfComponent, BlogComponent, AntetliComponent, DosyalarComponent, BloknotlarComponent, KatalogComponent, KartvizitComponent, MakbuzComponent }: {
  Router?: React.ComponentType<{ children: React.ReactNode }>;
  ZarfComponent?: React.ComponentType;
  BlogComponent?: React.ComponentType;
  AntetliComponent?: React.ComponentType;
  DosyalarComponent?: React.ComponentType;
  BloknotlarComponent?: React.ComponentType;
  KatalogComponent?: React.ComponentType;
  KartvizitComponent?: React.ComponentType;
  MakbuzComponent?: React.ComponentType;
} = {}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState<{product: any, category: string} | null>(null);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
  };

  const clearCart = () => setCart([]);

  const openProductDetail = (product: any, category: string) => {
    setDetailProduct({ product, category });
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      isCartOpen, 
      setIsCartOpen,
      openProductDetail
    }}>
      <HelmetProvider>
        <Router>
          <RouteSEOHead />
          <ScrollToTop />
          <CanonicalLink />
          <SEOMetadataManager />
          <div className="min-h-screen bg-[#f8fafc] font-sans text-secondary flex flex-col">
            <Navbar />
            
            <main className="flex-grow">
              <AppRoutes ZarfComponent={ZarfComponent} BlogComponent={BlogComponent} AntetliComponent={AntetliComponent} DosyalarComponent={DosyalarComponent} BloknotlarComponent={BloknotlarComponent} KatalogComponent={KatalogComponent} KartvizitComponent={KartvizitComponent} MakbuzComponent={MakbuzComponent} />
            </main>

            <Footer />
            <BackToTopButton />
            
            <CartDrawer />
            <ProductDetailModal 
              product={detailProduct?.product} 
              category={detailProduct?.category || ""} 
              isOpen={!!detailProduct} 
              onClose={() => setDetailProduct(null)}
              onAddToCart={addToCart}
            />
          </div>
        </Router>
      </HelmetProvider>
    </CartContext.Provider>
  );
}

export const TestWrapper = ({ children, initialPath }: { children: React.ReactNode, initialPath: string }) => {
  const mockCartContext = {
    cart: [],
    isCartOpen: false,
    detailProduct: null,
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    openProductDetail: () => {},
    setIsCartOpen: () => {}
  } as any;

  return (
    <HelmetProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <CartContext.Provider value={mockCartContext}>
          {children}
        </CartContext.Provider>
      </MemoryRouter>
    </HelmetProvider>
  );
};

export const CityPageWrapper = () => {
  return (
    <Routes>
      <Route path="/:citySlug" element={<CityPage />} />
    </Routes>
  );
};
