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
const KitapAyraciPage = React.lazy(() => import('./components/ReklamUrunleri').then(m => ({ default: m.KitapAyraciPage })));
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
      * Ofset baskıda renk, kesim ve adet toleransları oluşabilir. Ayrıntılı bilgi için <a href="/teslimat-ve-iade" className="underline hover:text-primary transition-colors">Teslimat ve İade Şartları</a> sayfasını inceleyebilirsiniz.
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
    
    // Explicit exclusion if category or code contains 'afiş' or 'afis'
    if (normCategory.includes("afis") || normProductTitle.includes("afis")) return false;
    
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

    onAddToCart({
      id: Math.random().toString(36).substr(2, 9),
      name: product.model || product.name || category,
      code: product.code,
      basePrice: effectiveBasePrice,
      baseQuantity: effectiveBaseQuantity,
      quantity,
      category,
      description: (product.desc || "") + (colorCount > 1 ? ` - ${colorCount} Renk` : " - 1 Renk") + (product.note ? ` - ${product.note}` : ""),
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
                      * Bu ürün sadece liste paketleri şeklinde sipariş edilebilir.
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
        <div className="p-4 sm:p-8 pt-0 shrink-0 flex justify-center">
          <button 
            onClick={handleAdd}
            className="w-full max-w-xs bg-[#0ea5e9] text-white p-4 rounded-2xl font-black text-base hover:bg-[#0284c7] transition-all shadow-[0_20px_40px_-12px_rgba(14,165,233,0.3)] uppercase tracking-tight flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <ShoppingCart size={20} className="stroke-[3px]" />
            SEPETE EKLE
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
  { id: "kup", name: "KÜP BLOKNOT BASKI", price: "7.450 ₺", desc: "100 Adet", subtext: "Masalarda her an el altında olan pratik ve kalıcı küp bloknotlar.", image: LOCAL_ASSETS.kup, type: "kup-bloknot" },
  { id: "katalog", name: "KATALOG BASKI", price: "5.400 ₺", desc: "50 Adet", subtext: "Ürün ve hizmetlerinizi detaylı anlatan çok sayfalı kaliteli kataloglar.", image: LOCAL_ASSETS.katalog, type: "katalog" },
  { id: "amerikan_servis", name: "AMERİKAN SERVİS BASKI", price: "2.900 ₺", desc: "2.000 Adet", subtext: "Restoran ve kafeler için hijyenik ve özel marka logolu masa örtüleri.", image: LOCAL_ASSETS.amerikan_servis, type: "amerikan-servis" },
  { id: "karton_canta", name: "KARTON ÇANTA BASKI", price: "8.400 ₺", desc: "500 Adet", subtext: "Doğa dostu, şık ve dayanıklı kurumsal ambalaj taşıma çantaları.", image: LOCAL_ASSETS.karton_canta, type: "karton-canta" },
  { id: "otopaspas", name: "OTO PASPAS BASKI", price: "2.300 ₺", desc: "1.000 Adet", subtext: "Oto yıkamalar için kalın kuşe kağıttan üretilmiş emici oto paspas kağıdı.", image: LOCAL_ASSETS.otopaspas, type: "oto-paspas" },
  { id: "afis", name: "AFİŞ BASKI", price: "2.100 ₺", desc: "250 Adet", subtext: "Etkinlik duyuruları ve campaigns için canlı renklerde büyük boy afişler.", image: LOCAL_ASSETS.afis, type: "afis" },
  { id: "siparis_fisi", name: "SİPARİŞ FİŞİ BASKI", price: "1.500 ₺", desc: "5 Cilt", subtext: "Sipariş ve satış süreçlerini hızlandıran, kendinden karbonlu pratik sipariş fişleri.", image: LOCAL_ASSETS.siparis_fisi, type: "siparis-fisi" },
  { id: "ambalaj", name: "AMBALAJ BASKI", price: "Fiyat Alınız", desc: "100 kg", subtext: "Esnek, hijyenik ve gıdaya uygun özel ambalaj paketleme kağıtları.", image: LOCAL_ASSETS.ambalaj, type: "ambalaj" },
  { id: "makbuz", name: "MAKBUZ & FORM BASKI", price: "650 ₺", desc: "5 Cilt", subtext: "Sipariş fişi, fatura, adisyon ve tediye makbuzu gibi otokopili resmi formlar.", image: LOCAL_ASSETS.makbuz, type: "makbuz-ve-formlar" },
  { id: "kutu", name: "KUTU BASKI", price: "Fiyat Alınız", desc: "1.000 Adet", subtext: "Gıda, giyim ve e-ticaret sektörü için özel ölçülerde kurumsal kutular.", image: LOCAL_ASSETS.kutu, type: "kutu" },
];

// KUTU_DATA, AMBALAJ_DATA, and PRICE_LIST are imported from ./data/productData


const ALL_PRODUCTS_CATEGORIES = [
  "Kartvizit Baskı",
  "Broşür Baskı",
  "El İlanı Baskı",
  "Magnet Baskı",
  "Kitap Ayracı Baskı",
  "Yağ Kartı Baskı",
  "Etiket Baskı",
  "Zarf Baskı",
  "Antetli Kağıt Baskı",
  "Afiş Baskı",
  "Amerikan Servis Baskı",
  "Dosya Baskı",
  "Bloknot Baskı",
  "Karton Çanta Baskı",
  "Küp Bloknot Baskı",
  "Oto Paspas Baskı",
  "Katalog Baskı",
  "Kutu Baskı",
  "Ambalaj Baskı",
  "Adisyon Baskı",
  "Sipariş Fişi Baskı",
  "Para Makbuzu Baskı",
  "Sözleşme Baskı",
  "Sigorta Poliçeleri Baskı",
  "Tahsilat Makbuzu Baskı",
  "Araç Kiralama Baskı",
  "Gider Makbuzu Baskı",
  "Giriş Bileti Baskı",
  "Reçete Baskı",
  "Tediye Makbuzu Baskı",
];

const getCategoryPath = (cat: string) => {
  if (cat === "Kitap Ayracı Baskı") return "/kitap-ayraci";
  if (cat === "Yağ Kartı Baskı") return "/yag-karti";
  if (cat === "Kutu Baskı") return "/kutu";
  if (cat === "Ambalaj Baskı") return "/ambalaj";
  if (cat === "Kartvizit Baskı") return "/kartvizit";
  if (cat === "Broşür Baskı") return "/brosur";
  if (cat === "El İlanı Baskı") return "/el-ilani";
  if (cat === "Magnet Baskı") return "/magnet";
  if (cat === "Etiket Baskı") return "/etiket";
  if (cat === "Zarf Baskı") return "/zarf";
  if (cat === "Antetli Kağıt Baskı") return "/antetli";
  if (cat === "Afiş Baskı") return "/afis";
  if (cat === "Amerikan Servis Baskı") return "/amerikan-servis";
  if (cat === "Dosya Baskı") return "/dosyalar";
  if (cat === "Bloknot Baskı") return "/bloknotlar";
  if (cat === "Karton Çanta Baskı") return "/karton-canta";
  if (cat === "Küp Bloknot Baskı") return "/kup-bloknot";
  if (cat === "Oto Paspas Baskı") return "/oto-paspas";
  if (cat === "Katalog Baskı") return "/kataloglar";
  if (cat === "Adisyon Baskı") return "/adisyon";
  if (cat === "Sipariş Fişi Baskı") return "/siparis-fisi";
  if (cat === "Para Makbuzu Baskı") return "/para-makbuzu";
  if (cat === "Sözleşme Baskı") return "/sozlesme-baski";
  if (cat === "Sigorta Poliçeleri Baskı") return "/sozlesme-baski";
  if (cat === "Tahsilat Makbuzu Baskı") return "/para-makbuzu";
  if (cat === "Araç Kiralama Baskı") return "/sozlesme-baski";
  if (cat === "Gider Makbuzu Baskı") return "/para-makbuzu";
  if (cat === "Giriş Bileti Baskı") return "/adisyon";
  if (cat === "Reçete Baskı") return "/adisyon";
  if (cat === "Tediye Makbuzu Baskı") return "/para-makbuzu";
  return "/";
};

// --- Components ---

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

import { BLOG_POSTS } from './data/blogData';
import { SEO_PAGES_DATA } from './data/seoPagesData';

const getAbsoluteUrl = (url: string) => {
  if (!url) return 'https://mavibasim.com/logo.png';
  if (url.startsWith('https://') || url.startsWith('http://')) return url;
  if (url.startsWith('/')) return `https://mavibasim.com${url}`;
  return `https://mavibasim.com/${url}`;
};

export const parsePriceString = (priceStr: string | undefined | null): number => {
  if (!priceStr) return NaN;
  let str = String(priceStr).trim();
  if (str.includes('–') || str.includes('-')) {
    str = str.split(/[–-]/)[0].trim();
  }
  str = str.replace(/[TL|₺\s]/gi, '');
  const hasComma = str.includes(',');
  const hasDot = str.includes('.');
  if (hasComma && hasDot) {
    const lastComma = str.lastIndexOf(',');
    const lastDot = str.lastIndexOf('.');
    if (lastComma > lastDot) {
      str = str.replace(/\./g, '').replace(/,/g, '.');
    } else {
      str = str.replace(/,/g, '');
    }
  } else if (hasComma) {
    const parts = str.split(',');
    if (parts[1] && parts[1].length === 3) {
      str = str.replace(/,/g, '');
    } else {
      str = str.replace(/,/g, '.');
    }
  } else if (hasDot) {
    const parts = str.split('.');
    if (parts[1] && parts[1].length === 3) {
      str = str.replace(/\./g, '');
    }
  }
  const parsed = parseFloat(str);
  return isNaN(parsed) ? NaN : parsed;
};

export const CanonicalLink = () => {
  const location = useLocation();
  
  // Rule 8: Standart Trailing Slash standardı (Hepsi non-trailing slash ile bitecek, ana sayfa hariç)
  let path = location.pathname;
  if (path.endsWith('/') && path.length > 1) {
    path = path.slice(0, -1);
  }
  if (path === '/') {
    path = '';
  }

  const isInvalidSectorPage = path.startsWith('/sektor/') && !SEO_PAGES_DATA[path.substring(8)];
  
  // Rule 9: Pagination varsa canonical URL'e "page" query parametresi dahil edilmeli, diğerleri temizlenmeli
  const searchParams = new URLSearchParams(location.search);
  const canonicalParams = new URLSearchParams();
  if (searchParams.has('page')) {
    canonicalParams.set('page', searchParams.get('page')!);
  }
  
  const querySuffix = canonicalParams.toString() ? `?${canonicalParams.toString()}` : '';
  const canonicalUrl = `https://mavibasim.com${path}${querySuffix}`;
  
  // Centralized structured data schemas array
  const schemas: any[] = [];

  // 1. Dynamic Breadcrumb Generator
  const itemListElement: any[] = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Ana Sayfa",
      "item": "https://mavibasim.com"
    }
  ];

  const standardProductsMap: Record<string, string> = {
    "/kutu": "Özel Kesim Kutu",
    "/ambalaj": "Ambalaj Kutu Baskı",
    "/kartvizit": "Kartvizit Baskı",
    "/brosur": "Broşür Baskı",
    "/el-ilani": "El İlanı Baskı",
    "/afis": "Afiş Baskı",
    "/antetli": "Antetli Kağıt",
    "/dosyalar": "Cepli Dosya",
    "/etiket": "Etiket Baskı",
    "/oto-paspas": "Oto Paspas Baskı",
    "/kup-bloknot": "Küp Bloknot",
    "/magnet": "Özel Kesim Magnet",
    "/kitap-ayraci": "Kitap Ayracı Baskı",
    "/yag-karti": "Yağ Kartı Baskı",
    "/bloknotlar": "Bloknot Çeşitleri",
    "/amerikan-servis": "Amerikan Servis",
    "/karton-canta": "Karton Çanta Baskı",
    "/zarf": "Zarf Baskı",
    "/kataloglar": "Katalog Baskı",
    "/makbuz-ve-formlar": "Makbuz ve Formlar",
    "/adisyon": "Adisyon Basımı",
    "/siparis-fisi": "Sipariş Fişi",
    "/perakende-satis-fisi": "Perakende Satış Fişi",
    "/para-makbuzu": "Para Makbuzu",
    "/sozlesme-baski": "Sözleşme Baskısı",
    "/sigorta-policeleri": "Sigorta Poliçesi",
    "/tahsilat-makbuzu": "Tahsilat Makbuzu",
    "/arac-kiralama": "Araç Kiralama Formu",
    "/gider-makbuzu": "Gider Makbuzu",
    "/giris-bileti": "Giriş Bileti",
    "/recete": "Reçete Koçanı",
    "/tediye-makbuzu": "Tediye Makbuzu",
    "/cilt-isleri": "Cilt İşleri",
    "/matbaa": "Matbaa ve Grafik",
    "/referanslar": "Referanslarımız",
    "/sikca-sorulan": "Sıkça Sorulan Sorular",
    "/grafik-tasarim": "Grafik Tasarım Hizmeti",
    "/hakkimizda": "Hakkımızda",
    "/iletisim": "İletişim"
  };

  // Add Breadcrumb parts based on pathname
  if (path === '/blog') {
    itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://mavibasim.com/blog"
    });
  } else if (path.startsWith('/blog/')) {
    const blogSlug = path.substring(6);
    const activePost = BLOG_POSTS.find(p => p.slug === blogSlug);
    itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://mavibasim.com/blog"
    });
    itemListElement.push({
      "@type": "ListItem",
      "position": 3,
      "name": activePost ? activePost.title : "Blog Yazısı",
      "item": `https://mavibasim.com/blog/${blogSlug}`
    });
  } else if (path.startsWith('/sektor/')) {
    const sectorSlug = path.substring(8);
    const seoPage = SEO_PAGES_DATA[sectorSlug];
    const parentName = sectorSlug.includes('brosur') 
      ? "Broşür Baskı" 
      : (sectorSlug.includes('kozmetik') || sectorSlug.includes('kutu') || sectorSlug.includes('ambalaj') || sectorSlug.includes('e-ticaret') || sectorSlug.includes('perakende')) 
      ? "Matbaa Ürünleri" 
      : "Kartvizit Baskı";
    const parentItem = sectorSlug.includes('brosur') 
      ? "https://mavibasim.com/brosur" 
      : (sectorSlug.includes('kozmetik') || sectorSlug.includes('kutu') || sectorSlug.includes('ambalaj') || sectorSlug.includes('e-ticaret') || sectorSlug.includes('perakende')) 
      ? "https://mavibasim.com/matbaa" 
      : "https://mavibasim.com/kartvizit";

    itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": parentName,
      "item": parentItem
    });
    itemListElement.push({
      "@type": "ListItem",
      "position": 3,
      "name": seoPage ? seoPage.h1 : "Kutu ve Ambalaj Baskı Çözümleri",
      "item": `https://mavibasim.com/sektor/${sectorSlug}`
    });
  } else if (path && SEO_PAGES_DATA[path.substring(1)]) {
    const seoPage = SEO_PAGES_DATA[path.substring(1)];
    itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": seoPage ? seoPage.h1 : "Baskı Çözümleri",
      "item": `https://mavibasim.com${path}`
    });
  } else if (path && standardProductsMap[path]) {
    itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": standardProductsMap[path],
      "item": `https://mavibasim.com${path}`
    });
  }

  // Push Breadcrumb list to schemas
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  });

  // Global Organization Schema available across all routes
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://mavibasim.com/#organization",
    "name": "Mavi Basım Matbaa & Reklam",
    "description": "Mavi Basım Matbaa & Reklam, İstanbul Topkapı Matbaacılar Sitesi’nde faaliyet gösteren profesyonel bir matbaa firmasıdır. Kartvizit, broşür, katalog, etiket, kutu ve ambalaj baskı hizmetleri sunmaktadır.",
    "url": "https://mavibasim.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mavibasim.com/mavi-basim-logo.webp",
      "caption": "Mavi Basım Matbaa ve Reklam"
    },
    "sameAs": [
      "https://www.instagram.com/mavibasimmatbaa",
      "https://www.facebook.com/profile.php?id=100048115954138"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-536-602-23-73",
      "contactType": "customer service",
      "areaServed": "TR",
      "availableLanguage": ["Turkish"]
    },
    "email": "info@mavibasim.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB",
      "addressLocality": "Zeytinburnu",
      "addressRegion": "İstanbul",
      "postalCode": "34010",
      "addressCountry": "TR"
    }
  };
  schemas.push(orgSchema);

  // 2. LocalBusiness (PrintingService), WebSite, WebPage, FAQ, Product, Service, Navigation, Image Schemas (Homepage only)
  if (!path || path === '/') {

    const localSchema = {
      "@context": "https://schema.org",
      "@type": ["Organization", "LocalBusiness", "PrintingService"],
      "@id": "https://mavibasim.com/#organization",
      "name": "Mavi Basım Matbaa & Reklam",
      "image": "https://mavibasim.com/mavilogo.png",
      "telephone": "+90 536 602 23 73",
      "email": "info@mavibasim.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB",
        "addressLocality": "Zeytinburnu",
        "addressRegion": "İstanbul",
        "postalCode": "34010",
        "addressCountry": "TR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "41.0189",
        "longitude": "28.9161"
      },
      "url": "https://mavibasim.com",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:30",
          "closes": "18:30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday"],
          "opens": "09:00",
          "closes": "14:00"
        }
      ],
      "areaServed": {
        "@type": "Country",
        "name": "Türkiye"
      },
      "priceRange": "₺₺",
      "knowsAbout": "Matbaa ve Baskı Hizmetleri"
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://mavibasim.com/#website",
      "name": "Mavi Basım",
      "url": "https://mavibasim.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://mavibasim.com/?s={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    const webpageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://mavibasim.com/#webpage",
      "url": "https://mavibasim.com",
      "name": "Matbaa ve Baskı Çözümleri | Mavi Basım",
      "description": "Kartvizit, broşür, kutu, etiket, makbuz, ambalaj ve kurumsal baskı ürünleri için Mavi Basım'dan baskı çözümleri ve teklif alın.",
      "publisher": {
        "@id": "https://mavibasim.com/#organization"
      },
      "inLanguage": "tr"
    };

    const homeFaqs = [
      {
        q: "Online matbaa siparişi nasıl verilir?",
        a: "Ürün sayfasından istediğiniz özellikleri (ebat, kağıt gramajı, adet) belirledikten sonra WhatsApp hattımız (+90 536 602 23 73) veya e-posta üzerinden tasarım dosyanızı bize ileterek hızlıca sipariş oluşturabilirsiniz. Ücretsiz teknik dosya kontrolü ve dijital PDF prova onayınızın ardından üretime başlanır."
      },
      {
        q: "Baskı öncesi dijital PDF prova onayı veriliyor mu?",
        a: "Evet. Gönderdiğiniz tasarımların çözünürlüğü, renk modu (CMYK), taşma ve kesim payları grafik ekibimizce kontrol edilir. Onayınız için dijital PDF prova hazırlanır; sizin yazılı onayınız olmadan baskıya geçilmez."
      },
      {
        q: "Türkiye geneline kargo gönderimi var mı?",
        a: "Evet. İstanbul Topkapı hizmet ve koordinasyon merkezimizden Türkiye'nin 81 iline anlaşmalı kargo firmaları ve koruyucu paketleme ile güvenli gönderim sağlıyoruz."
      },
      {
        q: "Kurumsal ve toptan matbaa siparişlerinde avantaj sağlanıyor mu?",
        a: "Evet. Ajanslar, kurumsal firmalar ve yüksek adetli siparişler için şeffaf birim maliyet avantajları ve sözleşmeli kurumsal faturalama imkanları sunulmaktadır."
      },
      {
        q: "Hangi baskı ve matbaa ürünleri üretilmektedir?",
        a: "Kartvizit, broşür, el ilanı, katalog, magnet, etiket, kutu, ambalaj, karton çanta, antetli kağıt, cepli dosya, bloknot, otokopili makbuz ve sipariş fişleri dahil tüm kurumsal matbaa ürünleri üretilmektedir."
      }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://mavibasim.com/#faq",
      "mainEntity": homeFaqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Online Matbaa ve Baskı Hizmetleri",
      "serviceType": "Printing Service",
      "provider": {
        "@id": "https://mavibasim.com/#organization"
      },
      "areaServed": "TR",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Online Matbaa Hizmet Kataloğu",
        "itemListElement": [
          { "@type": "OfferCatalog", "name": "Kartvizit ve Kurumsal Baskı" },
          { "@type": "OfferCatalog", "name": "Broşür ve Katalog Baskı" },
          { "@type": "OfferCatalog", "name": "Kutu ve Ambalaj Baskı" },
          { "@type": "OfferCatalog", "name": "Magnet ve Etiket Baskı" },
          { "@type": "OfferCatalog", "name": "Makbuz ve Resmi Form Basımı" }
        ]
      }
    };

    const navigationSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Ana Menü",
      "itemListElement": [
        { "@type": "SiteNavigationElement", "position": 1, "name": "Ana Sayfa", "url": "https://mavibasim.com/" },
        { "@type": "SiteNavigationElement", "position": 2, "name": "Kartvizit", "url": "https://mavibasim.com/kartvizit" },
        { "@type": "SiteNavigationElement", "position": 3, "name": "Broşür", "url": "https://mavibasim.com/brosur" },
        { "@type": "SiteNavigationElement", "position": 4, "name": "El İlanı", "url": "https://mavibasim.com/el-ilani" },
        { "@type": "SiteNavigationElement", "position": 5, "name": "Katalog", "url": "https://mavibasim.com/kataloglar" },
        { "@type": "SiteNavigationElement", "position": 6, "name": "Magnet", "url": "https://mavibasim.com/magnet" },
        { "@type": "SiteNavigationElement", "position": 7, "name": "Etiket", "url": "https://mavibasim.com/etiket" },
        { "@type": "SiteNavigationElement", "position": 8, "name": "Kutu", "url": "https://mavibasim.com/kutu" },
        { "@type": "SiteNavigationElement", "position": 9, "name": "Ambalaj", "url": "https://mavibasim.com/ambalaj" },
        { "@type": "SiteNavigationElement", "position": 10, "name": "Makbuz & Formlar", "url": "https://mavibasim.com/makbuz-ve-formlar" },
        { "@type": "SiteNavigationElement", "position": 11, "name": "İletişim", "url": "https://mavibasim.com/iletisim" }
      ]
    };

    schemas.push(localSchema, websiteSchema, webpageSchema, faqSchema, serviceSchema, navigationSchema);
  }

  // 3. Dynamic Price Sync Engine & Rule-Based Structured Data Router
  // We strictly pair Product schemas ONLY with pages where a real pricing grid/table is visible on-screen.
  // All other pages (e.g., /kutu, /ambalaj, custom packaging, doorway sectors, city SEO endpoints) use Service schema.
  const getPricesForPath = (targetPath: string): number[] => {
    const normalizedPath = targetPath.toLowerCase().trim();

    // If path is ambalaj/kutu or any custom quotation-only service, return empty prices to block Product schema layout
    if (
      normalizedPath === '/ambalaj' ||
      normalizedPath === '/kutu' ||
      normalizedPath === '/matbaa' ||
      normalizedPath === '/grafik-tasarim' ||
      normalizedPath.includes('ozel-uretim') ||
      normalizedPath.includes('ozel-olcu')
    ) {
      return [];
    }

    try {
      switch (normalizedPath) {
        case '/kartvizit': {
          return KARTVIZIT_DATA.flatMap(cat => 
            cat.items.map(item => parsePriceString(item.price))
          ).filter(p => !isNaN(p) && p > 0);
        }
        case '/brosur': {
          return BROSUR_DATA.flatMap(cat => 
            cat.items.map(item => parsePriceString(item.price))
          ).filter(p => !isNaN(p) && p > 0);
        }
        case '/el-ilani': {
          return EL_ILANI_DATA.flatMap(cat => 
            cat.items.map(item => parsePriceString(item.price))
          ).filter(p => !isNaN(p) && p > 0);
        }
        case '/afis': {
          return AFIS_DATA.flatMap(cat => 
            cat.items.map(item => parsePriceString(item.price))
          ).filter(p => !isNaN(p) && p > 0);
        }
        case '/antetli': {
          return ANTETLI_DATA.flatMap(cat => 
            cat.items.map(item => parsePriceString(item.price))
          ).filter(p => !isNaN(p) && p > 0);
        }
        case '/dosyalar': {
          return DOSYALAR_DATA.map(item => 
            parsePriceString(item.price)
          ).filter(p => !isNaN(p) && p > 0);
        }
        case '/etiket': {
          return ETIKET_DATA.map(item => 
            parsePriceString(item.price)
          ).filter(p => !isNaN(p) && p > 0);
        }
        case '/oto-paspas': {
          return OTO_PASPAS_DATA.map(item => 
            parsePriceString(item.price)
          ).filter(p => !isNaN(p) && p > 0);
        }
        case '/kup-bloknot': {
          return KUP_BLOKNOT_DATA.flatMap(cat => 
            cat.items.map(item => parsePriceString(item.price))
          ).filter(p => !isNaN(p) && p > 0);
        }
        case '/magnet': {
          return MAGNET_DATA.flatMap(cat => 
            cat.items.filter(item => !item.isCustom).map(item => parsePriceString(item.price))
          ).filter(p => !isNaN(p) && p > 0);
        }
        case '/kitap-ayraci': {
          return KITAP_AYRACI_DATA.flatMap(cat => 
            cat.items.map(item => parsePriceString(item.price))
          ).filter(p => !isNaN(p) && p > 0);
        }
        case '/yag-karti': {
          return YAG_KARTI_DATA.flatMap(cat => 
            cat.items.map(item => parsePriceString(item.price))
          ).filter(p => !isNaN(p) && p > 0);
        }
        case '/bloknotlar': {
          const pricesKapakli = (BLOKNOTLAR_DATA?.kapakli || []).flatMap(g => 
            (g.items || []).flatMap(item => [
              parsePriceString(item.p500),
              parsePriceString(item.p1000)
            ])
          );
          const pricesKapaksiz = (BLOKNOTLAR_DATA?.kapaksiz || []).flatMap(g => 
            (g.items || []).flatMap(item => [
              parsePriceString(item.p500),
              parsePriceString(item.p1000)
            ])
          );
          return [...pricesKapakli, ...pricesKapaksiz].filter(p => !isNaN(p) && p > 0);
        }
        case '/amerikan-servis': {
          return AMERIKAN_SERVIS_DATA.flatMap(cat => 
            cat.items.map(item => parsePriceString(item.price))
          ).filter(p => !isNaN(p) && p > 0);
        }
        case '/karton-canta': {
          return KARTON_CANTA_DATA.flatMap(cat => 
            cat.items.map(item => parsePriceString(item.price))
          ).filter(p => !isNaN(p) && p > 0);
        }
        case '/zarf': {
          return ZARF_DATA.flatMap(cat => 
            cat.items.map(item => parsePriceString(item.price))
          ).filter(p => !isNaN(p) && p > 0);
        }
        case '/kataloglar': {
          return (KATALOG_DATA?.rows || []).filter(r => !r.isSpecial).flatMap(r => [
            parsePriceString(r.p50),
            parsePriceString(r.p100),
            parsePriceString(r.p250),
            parsePriceString(r.p500),
            parsePriceString(r.p1000)
          ]).filter(p => !isNaN(p) && p > 0);
        }
        case '/makbuz-ve-formlar': {
          return (MAKBUZ_FORMLAR_ALL_DATA || []).flatMap(sec => 
            sec.rows
              .filter((r: any) => !r.label.includes('Renk Farkı'))
              .flatMap((r: any) => r.values)
          ).filter(v => typeof v === 'number' && v > 0);
        }
        case '/cilt-isleri': {
          return (CILT_ISLERI_DATA || []).flatMap(sec => 
            sec.rows
              .filter((r: any) => !r.label.includes('Renk Farkı'))
              .flatMap((r: any) => r.values)
          ).filter(v => typeof v === 'number' && v > 0);
        }
        default: {
          const idToMatch = normalizedPath.replace('/', '');
          const items = (MAKBUZ_FORMLAR_ALL_DATA || []).filter(sec => {
            if (sec.id === idToMatch) return true;
            const normalizedTitle = sec.title.toLowerCase().replace(/[\s-]/g, '');
            const normalizedTarget = idToMatch.toLowerCase().replace(/[\s-]/g, '');
            return normalizedTitle.includes(normalizedTarget) || normalizedTarget.includes(normalizedTitle);
          });
          if (items.length > 0) {
            return items.flatMap(sec => 
              sec.rows
                .filter((r: any) => !r.label.includes('Renk Farkı'))
                .flatMap((r: any) => r.values)
            ).filter(v => typeof v === 'number' && v > 0);
          }
        }
      }
    } catch (err) {
      console.error("Error extracting dynamic price list in Structured Data module:", err);
    }
    return [];
  };

  const parsedPrices = path ? getPricesForPath(path) : [];
  const productName = standardProductsMap[path] || (path ? path.replace('/', '').toUpperCase() : "Baskı");

  // 4AB. Centralized Schema Decision Engine - Spam Prevention & Content Parity System
  const normalizedPath = (path || '').toLowerCase().trim();
  
  const isStandardizedProduct = [
    "/kartvizit", "/brosur", "/el-ilani", "/afis", "/antetli", "/dosyalar", "/etiket",
    "/oto-paspas", "/kup-bloknot", "/magnet", "/kitap-ayraci", "/yag-karti", "/bloknotlar",
    "/amerikan-servis", "/karton-canta", "/zarf", "/kataloglar", "/makbuz-ve-formlar",
    "/adisyon", "/siparis-fisi", "/perakende-satis-fisi", "/para-makbuzu", "/sozlesme-baski",
    "/sigorta-policeleri", "/tahsilat-makbuzu", "/arac-kiralama", "/gider-makbuzu",
    "/giris-bileti", "/recete", "/tediye-makbuzu", "/cilt-isleri"
  ].some(p => normalizedPath === p);

  const hasVisibleNumericPricing = parsedPrices.length > 0 && parsedPrices.every(p => !isNaN(p) && p > 0);
  const hasFixedSpecs = isStandardizedProduct;
  const pricingMatchesDOM = hasVisibleNumericPricing;

  const isCustomQuoteOnly = (
    normalizedPath === '/kutu' ||
    normalizedPath === '/ambalaj' ||
    normalizedPath === '/matbaa' ||
    normalizedPath === '/grafik-tasarim' ||
    normalizedPath.includes('ozel-uretim') ||
    normalizedPath.includes('ozel-olcu') ||
    normalizedPath.startsWith('/sektor/') ||
    normalizedPath.includes('-baski') ||
    normalizedPath.includes('-fiyatlari') ||
    normalizedPath === '/'
  );

  const determineSchemaType = (): "Product" | "Service" => {
    const shouldUseProduct =
      hasVisibleNumericPricing &&
      pricingMatchesDOM &&
      isStandardizedProduct &&
      hasFixedSpecs &&
      !isCustomQuoteOnly;

    if (shouldUseProduct) {
      return "Product";
    }
    return "Service";
  };

  const schemaType = determineSchemaType();

  // 4. Dynamic SEO Lands (Sector/City pages)
  let seoSlug: string | null = null;
  if (path.startsWith('/sektor/')) {
    seoSlug = path.substring(8);
  } else if (path) {
    const pk = path.substring(1);
    if (SEO_PAGES_DATA[pk]) {
      seoSlug = pk;
    }
  }

  const isMakbuzFormlarMainPage = normalizedPath === '/makbuz-ve-formlar';

  if (schemaType === "Product" && !isMakbuzFormlarMainPage) {
    const minVal = Math.min(...parsedPrices);
    const maxVal = Math.max(...parsedPrices);
    const countVal = parsedPrices.length;
    const uniquePrices = Array.from(new Set(parsedPrices));
    const isSinglePrice = uniquePrices.length === 1;

    const offersObj = isSinglePrice ? {
      "@type": "Offer",
      "price": String(uniquePrices[0]),
      "priceCurrency": "TRY",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "PrintingService",
        "@id": "https://mavibasim.com/#localbusiness"
      }
    } : {
      "@type": "AggregateOffer",
      "priceCurrency": "TRY",
      "lowPrice": String(minVal),
      "highPrice": String(maxVal),
      "offerCount": String(countVal),
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "PrintingService",
        "@id": "https://mavibasim.com/#localbusiness"
      }
    };

    const seoImagesMap: Record<string, string> = {
      "/brosur": "/images/brosur/brosur-tasarimi-ve-baski.webp",
      "/el-ilani": "/images/el-ilani/el-ilani-baski-fiyatlari.webp",
      "/afis": "/images/afis/afis-baski-fiyatlari.webp",
      "/magnet": "/images/magnet/magnet-baski-tasarimi.webp",
      "/kitap-ayraci": "/images/kitap-ayraci/kitap-ayraci-baski.webp",
      "/yag-karti": "/images/yag-karti/yag-karti-baski.webp",
      "/etiket": "/images/etiket/yapiskanli-etiket-baski.webp",
      "/amerikan-servis": "/images/amerikan-servis/amerikan-servis-tasarimi.webp",
      "/oto-paspas": "/images/oto-paspas/oto-paspas-kagit-baski.webp",
      "/kutu": "/images/kutu/ozel-kesim-kutu-tasarimi.webp",
      "/ambalaj": "/images/ambalaj/ambalaj-baski-fiyatlari.webp",
      "/kartvizit": "/images/kartvizit/kartvizit-baski.webp",
      "/zarf": "/images/zarf/kurumsal-zarf-baski.webp",
      "/antetli": "/images/antetli-kagit/antetli-kagit-baski-fiyatlari.webp",
      "/dosyalar": "/images/dosya/cepli-dosya-tasarimi.webp",
      "/kataloglar": "/images/katalog/tanitim-katalogu-ornegi.webp",
      "/bloknotlar": "/images/bloknot/spiralli-bloknot-baski.webp",
      "/kup-bloknot": "/images/kup-bloknot/kup-bloknot-baski-fiyatlari.webp",
      "/karton-canta": "/images/karton-canta/karton-canta-baski-fiyatlari.webp",
      "/adisyon": "/images/adisyon/otokopili-adisyon-baski.webp",
      "/siparis-fisi": "/images/siparis-fisi/otokopili-siparis-fisi.webp",
      "/para-makbuzu": "/images/para-makbuzu/para-makbuzu-ornegi.webp",
      "/sozlesme-baski": "/images/sozlesme/sozlesme-taslagi-baski.webp",
      "/sigorta-policeleri": "/images/sigorta-policesi/sigorta-policesi-basimi.webp",
      "/tahsilat-makbuzu": "/images/tahsilat-makbuzu/otokopili-tahsilat-makbuzu.webp",
      "/gider-makbuzu": "/images/gider-makbuzu/gider-makbuzu-basimi.webp",
      "/tediye-makbuzu": "/images/tediye-makbuzu/tediye-baski.webp",
      "/arac-kiralama": "/images/arac-kiralama/arac-kiralama-sozlesmesi-baski.webp",
      "/giris-bileti": "/images/giris-bileti/numaratorlu-giris-bileti-baski.webp",
      "/recete": "/images/recete/doktor-recetesi-basimi.webp",
    };
    const mappedImg = seoImagesMap[path] || `/${path.replace('/', '')}-baski.webp`;

    const prodSchemaName = path === '/kartvizit' ? "Kartvizit Baskı Fiyatları" : `${productName} Baskı Fiyatları`;
    const prodSchemaDesc = path === '/kartvizit'
      ? "Mavi Basım güvencesiyle 350 gr mat selefonlu, kabartma laklı, 700 gr sıvama ve PVC kartvizit baskı çözümleri. İstanbul Topkapı Üretim Tesisimizde üretilmektedir."
      : `Mavi Basım güvencesiyle yüksek kaliteli, profesyonel ${productName.toLowerCase()} imalatı. İstanbul Topkapı Üretim Tesisimizde üretilmektedir.`;
    
    const prodSchemaImages = path === '/kartvizit' ? [
      getAbsoluteUrl(mappedImg),
      "https://mavibasim.com/images/kartvizit/kartvizit-baski-detayi.webp",
      "https://mavibasim.com/images/kartvizit/kartvizit-yakin-cekim.webp"
    ] : [
      getAbsoluteUrl(mappedImg)
    ];

    const prodSchemaImagesObj = prodSchemaImages.map((imgUrl, idx) => ({
      "@type": "ImageObject",
      "@id": `${canonicalUrl}#image-${idx + 1}`,
      "url": imgUrl,
      "contentUrl": imgUrl,
      "caption": `${prodSchemaName} - Görsel ${idx + 1}`
    }));

    // Strict Product Standard Schema with 0 placeholder metrics (No fake SKU / fake GTIN / fake reviews / fake aggregateRating)
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${canonicalUrl}#product`,
      "mainEntityOfPage": canonicalUrl,
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://mavibasim.com/#website"
      },
      "name": prodSchemaName,
      "description": prodSchemaDesc,
      "image": prodSchemaImagesObj,
      "category": `${productName} Baskı`,
      "url": canonicalUrl,
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "offers": offersObj
    });
  } else if (seoSlug && SEO_PAGES_DATA[seoSlug]) {
    const page = SEO_PAGES_DATA[seoSlug];
    // Since SEO Pages do not present an on-screen pricing table/grid, we strictly output Service schema.
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonicalUrl}#service`,
      "name": page.h1,
      "serviceType": `${page.h1} Hizmeti`,
      "provider": {
        "@type": "Organization",
        "@id": "https://mavibasim.com/#organization",
        "name": "Mavi Basım Matbaa & Reklam"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Türkiye"
      },
      "url": canonicalUrl,
      "description": page.metaDesc
    });

    if (page.faqs && page.faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": page.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      });
    }
  } else if (path && path !== '/' && !path.startsWith('/blog')) {
    // Elegant fallback Service Schema mapping quote-only customized prints
    const serviceName = standardProductsMap[path] || (path === '/matbaa' ? 'Kurumsal Matbaa' : 'Profesyonel Grafik Tasarım');
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": canonicalUrl,
      "name": `${serviceName} Hizmeti`,
      "serviceType": "Printing Service",
      "provider": {
        "@type": "PrintingService",
        "@id": "https://mavibasim.com/#localbusiness"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Türkiye"
      },
      "url": canonicalUrl,
      "description": `Mavi Basım güvencesi ile kurumsal ve sektörel ${serviceName.toLowerCase()} imalat çözümleri. WhatsApp üzerinden anında özel fiyat teklifi alın.`
    });
  }

  // 6. Dynamic Sıkça Sorulan Sorular FAQPage Schema
  if (path === '/sikca-sorulan') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Siparişim Ne Kadar Sürede Elime Ulaşır - Ofisten Teslim Alabilir miyim?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Teslimat süresi üründen ürüne farklılık göstermektedir. Ürün sayfalarındaki açıklamalarda belirtilen süreler 'üretim süresi'dir. Üretim tamamlandıktan sonra siparişinizi Zeytinburnu Topkapı'daki ofisimizden teslim alabilir veya kargo ile gönderimini talep edebilirsiniz."
          }
        },
        {
          "@type": "Question",
          "name": "Tasarım Hizmeti Veriyor musunuz? Ya Memnun Kalmazsam?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mavi Basım Matbaa & Reklam olarak profesyonel tasarım desteği sunuyoruz. Tasarım ücretleri ürün bazlı değişmekte olup sipariş sırasında belirtilmektedir. Tasarım sürecinde 3 revize hakkınız bulunmaktadır."
          }
        },
        {
          "@type": "Question",
          "name": "Baskı Öncesi Tasarım Kontrolü Yapıyor musunuz?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Evet, gönderdiğiniz tüm çalışmalar kesim payı, çözünürlük ve yerleşim açısından ücretsiz kontrol edilir. Bir hata tespit edilirse size bilgi verilerek düzeltilmesi istenir. Onayınız alınmadan baskıya geçilmez."
          }
        },
        {
          "@type": "Question",
          "name": "Baskıda Sorun Yaşamamak İçin Tasarımı Nasıl Göndermeliyim?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Çalışmalarınızı CMYK renk formatında ve 300 DPI çözünürlükte hazırlamalısınız. Efekt kullandıysanız (gölge, transparanlık vb.) bunları görsele çevirmeniz renk sapmalarını önleyecektir."
          }
        },
        {
          "@type": "Question",
          "name": "İstediğim Adet veya Ürün Listede Yoksa Ne Yapmalıyım?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sitede görmediğiniz adetler veya özel ürünler için WhatsApp hattımızdan veya mail yoluyla bizimle iletişime geçebilirsiniz. Müşteri temsilcilerimiz size özel fiyatlandırma yapacaktır."
          }
        }
      ]
    });
  }

  useEffect(() => {
    if (isInvalidSectorPage) return;
    let scriptEl = document.getElementById('app-seo-metadata-jsonld') as HTMLScriptElement;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'app-seo-metadata-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schemas);
  }, [canonicalUrl, schemas, isInvalidSectorPage]);

  if (isInvalidSectorPage) {
    return null;
  }

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
    </Helmet>
  );
};

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <Helmet>
        <title>404 - Sayfa Bulunamadı | Mavi Basım Matbaa & Reklam</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <h1 className="text-9xl font-black text-[#29abe2] mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Aradığınız Sayfa Bulunamadı</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Ulaşmaya çalıştığınız sayfa silinmiş, taşınmış veya adresi değiştirilmiş olabilir.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 bg-[#29abe2] text-white px-8 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-md hover:shadow-lg"
      >
        <ArrowLeft size={20} />
        Ana Sayfaya Dön
      </Link>
    </div>
  );
};

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* WhatsApp Button - Always Visible */}
      <div className="fixed bottom-24 right-6 z-50">
        <motion.a
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] transition-all hover:scale-110 active:scale-95 group"
        >
          <img src="/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8 group-hover:scale-110 transition-transform" />
        </motion.a>
      </div>

      {/* Back to Top Button - Shows only when scrolled down */}
      <AnimatePresence>
        {isVisible && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.button
              initial={{ opacity: 0, scale: 0.5, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 20 }}
              onClick={scrollToTop}
              className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 group"
            >
              <ArrowUp size={32} className="group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const MEGA_MENU_DATA = [
  {
    title: "Broşürler & El İlanları",
    items: [
      { name: "Broşür", path: "/brosur" },
      { name: "El İlanı", path: "/el-ilani" },
      { name: "Afiş", path: "/afis" },
    ]
  },
  {
    title: "Reklam Ürünleri",
    items: [
      { name: "Magnet", path: "/magnet" },
      { name: "Kitap Ayracı", path: "/kitap-ayraci" },
      { name: "Yağ Kartı", path: "/yag-karti" },
      { name: "Etiket", path: "/etiket" },
      { name: "Amerikan Servis", path: "/amerikan-servis" },
      { name: "Oto Paspas", path: "/oto-paspas" },
      { name: "Kutu", path: "/kutu" },
      { name: "Ambalaj", path: "/ambalaj" },
    ]
  },
  {
    title: "Kurumsal Ürünler",
    items: [
      { name: "Kartvizit", path: "/kartvizit" },
      { name: "Zarf", path: "/zarf" },
      { name: "Antetli Kağıt", path: "/antetli" },
      { name: "Dosya", path: "/dosyalar" },
      { name: "Katalog", path: "/kataloglar" },
      { name: "Bloknot", path: "/bloknotlar" },
      { name: "Küp Bloknot", path: "/kup-bloknot" },
      { name: "Karton Çanta", path: "/karton-canta" },
    ]
  },
  {
    title: "Makbuz & Formlar",
    items: [
      { name: "Adisyon", path: "/adisyon" },
      { name: "Sipariş Fişi", path: "/siparis-fisi" },
      { name: "Para Makbuzu", path: "/para-makbuzu" },
      { name: "Sözleşme", path: "/sozlesme-baski" },
      { name: "Sigorta Poliçeleri", path: "/sigorta-policeleri" },
      { name: "Tahsilat Makbuzu", path: "/tahsilat-makbuzu" },
      { name: "Araç Kiralama", path: "/arac-kiralama" },
      { name: "Gider Makbuzu", path: "/gider-makbuzu" },
      { name: "Giriş Bileti", path: "/giris-bileti" },
      { name: "Reçete", path: "/recete" },
      { name: "Tediye Makbuzu", path: "/tediye-makbuzu" },
      { name: "Tüm Makbuz İşleri", path: "/makbuz-ve-formlar" },
    ]
  }
];

const MATBAA_URUNLERI_DATA = [
  {
    title: "Broşürler & El İlanları",
    items: [
      { name: "Broşür Baskı", path: "/brosur" },
      { name: "El İlanı Baskı", path: "/el-ilani" },
      { name: "Afiş Baskı", path: "/afis" },
    ]
  },
  {
    title: "Reklam Ürünleri",
    items: [
      { name: "Magnet Baskı", path: "/magnet" },
      { name: "Kitap Ayracı Baskı", path: "/kitap-ayraci" },
      { name: "Yağ Kartı Baskı", path: "/yag-karti" },
      { name: "Etiket Baskı", path: "/etiket" },
      { name: "Amerikan Servis Baskı", path: "/amerikan-servis" },
      { name: "Oto Paspas Baskı", path: "/oto-paspas" },
      { name: "Kutu Baskı", path: "/kutu" },
      { name: "Ambalaj Baskı", path: "/ambalaj" },
    ]
  },
  {
    title: "Kurumsal Ürünler",
    items: [
      { name: "Kartvizit Baskı", path: "/kartvizit" },
      { name: "Zarf Baskı", path: "/zarf" },
      { name: "Antetli Kağıt Baskı", path: "/antetli" },
      { name: "Dosya Baskı", path: "/dosyalar" },
      { name: "Katalog Baskı", path: "/kataloglar" },
      { name: "Bloknot Baskı", path: "/bloknotlar" },
      { name: "Küp Bloknot Baskı", path: "/kup-bloknot" },
      { name: "Karton Çanta Baskı", path: "/karton-canta" },
    ]
  },
  {
    title: "Makbuz & Formlar",
    items: [
      { name: "Perakende Satış Fişi Baskı", path: "/makbuz-ve-formlar#perakende-satis-fisi" },
      { name: "Adisyon Baskı", path: "/makbuz-ve-formlar#adisyon" },
      { name: "Sipariş Fişi Baskı", path: "/makbuz-ve-formlar#siparis-fisi" },
      { name: "Para Makbuzu Baskı", path: "/makbuz-ve-formlar#para-makbuzu" },
      { name: "Gider Makbuzu Baskı", path: "/makbuz-ve-formlar#gider-makbuzu" },
      { name: "Giriş Bileti Baskı", path: "/makbuz-ve-formlar#giris-bileti" },
      { name: "Reçete Baskı", path: "/makbuz-ve-formlar#recete" },
      { name: "Tediye Makbuzu Baskı", path: "/makbuz-ve-formlar#tediye-makbuzu" },
      { name: "Sözleşme Baskı", path: "/makbuz-ve-formlar#sozlesme-baski" },
      { name: "Sigorta Poliçeleri Baskı", path: "/makbuz-ve-formlar#sigorta-policeleri" },
      { name: "Tahsilat Makbuzu Baskı", path: "/makbuz-ve-formlar#tahsilat-makbuzu" },
      { name: "Araç Kiralama Baskı", path: "/makbuz-ve-formlar#arac-kiralama" },
    ]
  }
];

const MAKBUZ_FORMLAR_MENU = [
  { name: "Perakende Satış Fişi", path: "/perakende-satis-fisi" },
  { name: "Adisyon", path: "/adisyon" },
  { name: "Sipariş Fişi", path: "/siparis-fisi" },
  { name: "Para Makbuzu", path: "/para-makbuzu" },
  { name: "Gider Makbuzu", path: "/gider-makbuzu" },
  { name: "Giriş Bileti", path: "/giris-bileti" },
  { name: "Reçete", path: "/recete" },
  { name: "Tediye Makbuzu", path: "/tediye-makbuzu" },
  { name: "Sözleşme", path: "/sozlesme-baski" },
  { name: "Sigorta Poliçeleri", path: "/sigorta-policeleri" },
  { name: "Tahsilat Makbuzu", path: "/tahsilat-makbuzu" },
  { name: "Araç Kiralama", path: "/arac-kiralama" },
  { name: "Tüm Makbuz İşleri", path: "/makbuz-ve-formlar" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPriceListOpen, setIsPriceListOpen] = useState(false);
  const [isMakbuzOpen, setIsMakbuzOpen] = useState(false);
  const [isAllProductsOpen, setIsAllProductsOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const searchProps = useProductSearch();
  const { searchQuery, handleSearch, isSearchOpen, setIsSearchOpen, searchResults, setSearchQuery } = searchProps;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSearchOpen && 
          !(event.target as HTMLElement).closest('.search-container') && 
          !(event.target as HTMLElement).closest('.search-container-mobile')) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen, setIsSearchOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar (Design from Image) */}
      <div className="bg-primary text-white py-2">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-[10px] md:text-[11px] font-bold">
          {/* Left Section */}
          <div className="flex items-center gap-2 md:gap-6">
            <div className="flex items-center gap-3">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Mavi Basım Facebook Sayfası">
                <Facebook size={16} className="md:w-4.5 md:h-4.5" />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Mavi Basım Instagram Sayfası">
                <Instagram size={16} className="md:w-4.5 md:h-4.5" />
              </a>
            </div>
            <div className="h-4 w-px bg-white/30"></div>
            <div className="flex items-center gap-4">
              <a href={PHONE_LINK} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <PhoneCall size={14} className="md:w-4 md:h-4" />
                <span className="text-[13px] font-black">{PHONE_NUMBER}</span>
              </a>
              <span className="hidden xl:block font-medium text-[13px] opacity-95">Avantajlı Fiyatlarla Online Matbaa</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search Bar (Desktop) */}
            <div className="hidden lg:block relative search-container">
              <input 
                type="text" 
                placeholder="Ürün ara..." 
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => searchQuery.length > 1 && setIsSearchOpen(true)}
                className="bg-white border-none rounded-full py-1 px-10 text-[13px] text-black placeholder:text-gray-400 focus:ring-2 focus:ring-white/20 outline-none transition-all w-56 shadow-sm"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              
              <AnimatePresence>
                {isSearchOpen && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden z-[100]"
                  >
                    <div className="max-h-80 overflow-y-auto py-2">
                      {searchResults.map((result, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            navigate(result.path);
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 text-left"
                        >
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Search size={14} className="text-slate-400" />
                          </div>
                          <div>
                            <div className="text-[13px] font-bold text-black">{result.title}</div>
                            <div className="text-[11px] text-gray-500">{result.type}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden xl:flex items-center gap-4">
              <div className="flex items-center gap-1.5 whitespace-nowrap text-[12px] font-black">
                <Truck size={16} className="stroke-[2.5px]" />
                <span className="uppercase">TÜRKİYENİN HER YERİNE KARGO</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white shadow-md border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full h-20">
            <Link 
              to="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex-shrink-0 flex flex-col items-start group"
            >
              <span className="text-[20px] md:text-[23px] font-black text-black tracking-tight leading-none">MAVİ BASIM</span>
              <span className="text-[8px] md:text-[9.2px] font-bold text-primary tracking-[0.35em] mt-0.5 uppercase leading-none">MATBAA ve REKLAM</span>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-1">
                {/* Ürünlerimiz Dropdown */}
                <div 
                  className="relative group"
                  onMouseEnter={() => setIsAllProductsOpen(true)}
                  onMouseLeave={() => setIsAllProductsOpen(false)}
                >
                  <button className="flex items-center text-[13px] font-bold text-black hover:text-secondary px-3 py-2 transition-colors uppercase gap-2 bg-secondary/5 rounded-lg">
                    <Menu size={18} className="text-black" />
                    Matbaa Ürünleri <ChevronDown size={14} className={`ml-1 transition-transform ${isAllProductsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isAllProductsOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-0 w-[800px] bg-white border border-gray-100 shadow-2xl rounded-b-2xl overflow-hidden z-[100]"
                      >
                        <div className="grid grid-cols-4 p-8 gap-8">
                          {MATBAA_URUNLERI_DATA.map((section, sIdx) => (
                            <div key={sIdx} className="space-y-4">
                              <h4 className="text-[13px] font-black text-black uppercase tracking-wider border-b border-gray-100 pb-2">
                                {section.title}
                              </h4>
                              <div className="flex flex-col gap-2">
                                {section.items.map((item, iIdx) => (
                                  <button
                                    key={iIdx}
                                    onClick={() => {
                                      navigate(item.path);
                                      setIsAllProductsOpen(false);
                                    }}
                                    className="text-[13px] font-medium text-black hover:text-primary transition-colors text-left"
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Fiyat Listesi Dropdown */}
                <div 
                  className="relative group"
                  onMouseEnter={() => setIsPriceListOpen(true)}
                  onMouseLeave={() => setIsPriceListOpen(false)}
                >
                  <button className="flex items-center text-[13px] font-black text-white bg-secondary hover:bg-black px-4 py-2.5 transition-all uppercase gap-2 rounded-xl shadow-lg shadow-secondary/20">
                    <FileText size={18} />
                    FİYAT LİSTESİ <ChevronDown size={14} className={`ml-1 transition-transform ${isPriceListOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isPriceListOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-0 w-[800px] bg-white border border-gray-100 shadow-2xl rounded-b-2xl overflow-hidden z-[100]"
                      >
                        <div className="grid grid-cols-4 p-8 gap-8">
                          {MEGA_MENU_DATA.map((section, sIdx) => (
                            <div key={sIdx} className="space-y-4">
                              <h4 className="text-[13px] font-black text-black uppercase tracking-wider border-b border-gray-100 pb-2">
                                {section.title}
                              </h4>
                              <div className="flex flex-col gap-2">
                                {section.items.map((item, iIdx) => (
                                  <button
                                    key={iIdx}
                                    onClick={() => {
                                      navigate(item.path);
                                      setIsPriceListOpen(false);
                                    }}
                                    className="text-[13px] font-medium text-black hover:text-primary transition-colors text-left"
                                  >
                                    {item.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>


                <Link to="/grafik-tasarim" className="text-[13px] font-bold text-black hover:text-secondary px-3 py-2 transition-colors uppercase whitespace-nowrap">
                  GRAFİK TASARIM
                </Link>

                <Link to="/matbaa" className="text-[13px] font-bold text-black hover:text-secondary px-3 py-2 transition-colors uppercase">
                  MATBAA
                </Link>

                <Link to="/sikca-sorulan" className="text-[13px] font-bold text-black hover:text-secondary px-3 py-2 transition-colors uppercase whitespace-nowrap">
                  SIKÇA SORULAN
                </Link>

                <Link to="/hakkimizda" className="text-[13px] font-bold text-black hover:text-secondary px-3 py-2 transition-colors uppercase">
                  Hakkımızda
                </Link>

                <Link to="/referanslar" className="text-[13px] font-bold text-black hover:text-secondary px-3 py-2 transition-colors uppercase">
                  REFERANSLAR
                </Link>

                <div className="flex items-center gap-4 ml-4">
                  <Link to="/iletisim" className="text-[13px] font-bold text-black hover:text-secondary transition-colors uppercase">
                    İletişim
                  </Link>

                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-2 text-black hover:text-primary transition-colors group"
                    aria-label="Sepetim"
                  >
                    <ShoppingCart size={20} />
                    {cart.length > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        {cart.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center lg:hidden gap-2">
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-black hover:text-primary transition-colors"
                  aria-label="Sepetim"
                >
                  <ShoppingCart size={24} />
                  {cart.length > 0 && (
                    <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                      {cart.length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-secondary hover:text-secondary p-2"
                  aria-label={isMenuOpen ? "Menüyü Kapat" : "Menüyü Aç"}
                >
                  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                <div className="px-3 py-4 bg-primary/5 rounded-2xl border border-primary/10 mb-4 mt-2">
                  <span className="block text-xs font-black text-primary uppercase tracking-widest mb-3">Öncelikli Siparişler</span>
                  <div className="grid grid-cols-2 gap-2">
                    <Link 
                      to="/kartvizit" 
                      onClick={() => setIsMenuOpen(false)}
                      className="bg-white border border-gray-100 p-2 rounded-xl text-center text-xs font-bold text-black hover:text-primary transition-all flex flex-col justify-center items-center gap-1 shadow-sm"
                    >
                      <span className="text-[13px]">💳</span>
                      <span>Kartvizit Baskı</span>
                    </Link>
                    <Link 
                      to="/brosur" 
                      onClick={() => setIsMenuOpen(false)}
                      className="bg-white border border-gray-100 p-2 rounded-xl text-center text-xs font-bold text-black hover:text-primary transition-all flex flex-col justify-center items-center gap-1 shadow-sm"
                    >
                      <span className="text-[13px]">📄</span>
                      <span>Broşür Baskı</span>
                    </Link>
                    <Link 
                      to="/magnet" 
                      onClick={() => setIsMenuOpen(false)}
                      className="bg-white border border-gray-100 p-2 rounded-xl text-center text-xs font-bold text-black hover:text-primary transition-all flex flex-col justify-center items-center gap-1 shadow-sm"
                    >
                      <span className="text-[13px]">🧲</span>
                      <span>Magnet Baskı</span>
                    </Link>
                    <Link 
                      to="/kataloglar" 
                      onClick={() => setIsMenuOpen(false)}
                      className="bg-white border border-gray-100 p-2 rounded-xl text-center text-xs font-bold text-black hover:text-primary transition-all flex flex-col justify-center items-center gap-1 shadow-sm"
                    >
                      <span className="text-[13px]">📖</span>
                      <span>Katalog Baskı</span>
                    </Link>
                    <Link 
                      to="/kutu" 
                      onClick={() => setIsMenuOpen(false)}
                      className="bg-white border border-gray-100 p-2 rounded-xl text-center text-xs font-bold text-black hover:text-primary transition-all col-span-2 flex justify-center items-center gap-2 shadow-sm"
                    >
                      <span className="text-[13px]">📦</span>
                      <span>Kutu Baskı</span>
                    </Link>
                  </div>
                </div>

                <div className="px-3 pt-4 pb-2">
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/makbuz-ve-formlar');
                    }}
                    className="w-full bg-secondary text-white py-4 rounded-2xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-secondary/20"
                  >
                    <FileText size={20} />
                    Fiyat Listesi
                  </button>
                </div>
                <div className="px-3 py-4">
                  <div className="relative search-container-mobile">
                    <input 
                      type="text" 
                      placeholder="Ürün ara..." 
                      value={searchQuery}
                      onChange={handleSearch}
                      onFocus={() => searchQuery.length > 1 && setIsSearchOpen(true)}
                      className="w-full bg-gray-100 border-none rounded-full py-2 px-10 text-sm text-secondary placeholder:text-gray-400 focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    
                    <AnimatePresence>
                      {isSearchOpen && searchResults.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden z-[60]"
                        >
                          <div className="max-h-60 overflow-y-auto py-2">
                            {searchResults.map((result, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  navigate(result.path);
                                  setIsSearchOpen(false);
                                  setIsMenuOpen(false);
                                  setSearchQuery("");
                                }}
                                className="w-full px-4 py-3 hover:bg-gray-50 flex items-center justify-between group transition-colors text-left"
                              >
                                <div className="flex items-center gap-3">
                                  <Search size={14} className="text-gray-400 group-hover:text-secondary" />
                                  <span className="text-sm font-medium text-secondary group-hover:text-secondary transition-colors">
                                    {result.title}
                                  </span>
                                </div>
                                <span className="text-[10px] uppercase tracking-wider text-black font-bold bg-gray-100 px-2 py-0.5 rounded-full group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                                  {result.type}
                                </span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="px-3 py-4">
                  <span className="block text-base font-bold text-secondary mb-2">Matbaa Ürünleri</span>
                  <div className="grid grid-cols-1 gap-1 pl-2">
                    {ALL_PRODUCTS_CATEGORIES.map((cat, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate(getCategoryPath(cat));
                        }}
                        className="flex items-center gap-2 py-2 text-sm w-full text-left border-b border-gray-50 last:border-0"
                      >
                        <ChevronRight size={12} className="text-black" />
                        <span className="text-black font-medium uppercase tracking-tight">{cat}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="px-3 py-4">
                  <span className="block text-base font-bold text-black mb-2 uppercase tracking-tight">Makbuz & Formlar</span>
                  <div className="grid grid-cols-1 gap-1 pl-2">
                    {MAKBUZ_FORMLAR_MENU.map((item, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate(item.path);
                        }}
                        className="flex items-center gap-2 py-2 text-sm w-full text-left border-b border-gray-50 last:border-0"
                      >
                        <ChevronRight size={12} className="text-black" />
                        <span className="text-black font-medium uppercase tracking-tight">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-3 py-4">
                  <span className="block text-base font-bold text-black mb-2 uppercase tracking-tight">Fiyat Listesi</span>
                  <div className="grid grid-cols-1 gap-1 pl-2">
                    {PRICE_LIST
                      .filter(item => !['115', '128', '200'].some(gr => item.includes(gr)))
                      .map((item, idx) => (
                      <button 
                        key={idx}
                        onClick={() => {
                          setIsMenuOpen(false);
                          if (item === "KUTULAR") {
                            navigate("/kutu");
                          } else if (item === "AMBALAJLAR") {
                            navigate("/ambalaj");
                          } else if (item === "KARTVİZİTLER") {
                            navigate("/kartvizit");
                          } else if (item === "BROŞÜRLER") {
                            navigate("/brosur");
                          } else if (item === "EL İLANLARI") {
                            navigate("/el-ilani");
                          } else if (item === "AFİŞLER") {
                            navigate("/afis");
                          } else if (item === "ANTETLİLER") {
                            navigate("/antetli");
                          } else if (item === "DOSYALAR") {
                            navigate("/dosyalar");
                          } else if (item === "ETİKETLER") {
                            navigate("/etiket");
                          } else if (item === "OTO PASPASLAR") {
                            navigate("/oto-paspas");
                          } else if (item === "KÜP BLOKNOTLAR") {
                            navigate("/kup-bloknot");
                          } else if (item === "MAGNETLER") {
                            navigate("/magnet");
                          } else if (item === "KİTAP AYRACI") {
                            navigate("/kitap-ayraci");
                          } else if (item === "YAĞ KARTI") {
                            navigate("/yag-karti");
                          } else if (item === "BLOKNOTLAR") {
                            navigate("/bloknotlar");
                          } else if (item === "AMERİKAN SERVİSLER") {
                            navigate("/amerikan-servis");
                          } else if (item === "KARTON ÇANTALAR") {
                            navigate("/karton-canta");
                          } else if (item === "ZARFLAR") {
                            navigate("/zarf");
                          } else if (item === "KATALOGLAR") {
                            navigate("/kataloglar");
                          } else if (item === "SİPARİŞ FORMU") {
                            navigate("/siparis-formu");
                          } else if (item === "ADİSYON BASKI") {
                            navigate("/adisyon");
                          } else if (item === "SÖZLEŞME BASKI") {
                            navigate("/sozlesme-baski");
                          } else if (item === "PARA MAKBUZU") {
                            navigate("/para-makbuzu");
                          }
                        }}
                        className="flex items-center gap-2 py-2 text-sm w-full text-left border-b border-gray-50 last:border-0"
                      >
                        <ChevronRight size={12} className="text-black" />
                        <span className="text-black font-medium uppercase tracking-tight">{item}</span>
                      </button>
                    ))}
                    
                    {/* Brochure Grammages - Only shown as part of Brochure context or here if requested */}
                    <div className="mt-2 pt-2 border-t border-gray-50">
                      <span className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1 block">Broşür Seçenekleri</span>
                      {['115 GR. KUŞE', '128 GR. KUŞE', '200 GR. SELEFONLU'].map((item, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            setIsMenuOpen(false);
                            navigate("/brosur");
                          }}
                          className="flex items-center gap-2 py-1 text-[11px] w-full text-left pl-2"
                        >
                          <div className="w-1 h-1 rounded-full bg-black" />
                          <span className="text-black font-medium uppercase">{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>


                <div className="px-3 py-2">
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/grafik-tasarim");
                    }}
                    className="w-full text-left py-3 px-3 bg-secondary/5 rounded-xl flex items-center justify-between group"
                  >
                    <span className="text-base font-black text-black uppercase tracking-tight">GRAFİK TASARIM</span>
                    <ChevronRight size={18} className="text-black group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="px-3 py-2">
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/medya-yonetimi");
                    }}
                    className="w-full text-left py-3 px-3 bg-secondary/5 rounded-xl flex items-center justify-between group"
                  >
                    <span className="text-base font-black text-black uppercase tracking-tight">MEDYA YÖNETİMİ</span>
                  </button>
                </div>

                <div className="px-3 py-2">
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/hakkimizda");
                    }}
                    className="w-full text-left py-3 px-3 bg-gray-50 rounded-xl flex items-center justify-between group"
                  >
                    <span className="text-base font-black text-black uppercase tracking-tight">HAKKIMIZDA</span>
                    <ChevronRight size={18} className="text-black group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="px-3 py-2">
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/iletisim");
                    }}
                    className="w-full text-left py-3 px-3 bg-gray-50 rounded-xl flex items-center justify-between group"
                  >
                    <span className="text-base font-black text-black uppercase tracking-tight">İLETİŞİM</span>
                    <ChevronRight size={18} className="text-black group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="pt-4">
                  <a 
                    href={PHONE_LINK}
                    className="flex items-center justify-center gap-2 bg-secondary text-white w-full py-4 rounded-xl font-bold"
                  >
                    <PhoneCall size={20} />
                    <span>Sipariş Ver: {PHONE_NUMBER}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

const SEOQuickCategoryBar = () => {
  return (
    <>
      {/* Üst Kategori Alanı / SEO Quick Category links bar */}
      <div className="bg-gray-50 border-b border-gray-100 py-3 hidden md:block">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-8 text-[13px] font-bold uppercase tracking-wide">
            <span className="text-gray-400 font-extrabold text-[11px] uppercase mr-2 text-secondary">Öne Çıkanlar:</span>
            <Link to="/kartvizit" className="text-gray-700 hover:text-primary transition-all flex items-center gap-1.5 group">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
              Kartvizit Baskı
            </Link>
            <Link to="/brosur" className="text-gray-700 hover:text-primary transition-all flex items-center gap-1.5 group">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
              Broşür Baskı
            </Link>
            <Link to="/magnet" className="text-gray-700 hover:text-primary transition-all flex items-center gap-1.5 group">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
              Magnet Baskı
            </Link>
            <Link to="/kataloglar" className="text-gray-700 hover:text-primary transition-all flex items-center gap-1.5 group">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
              Katalog Baskı
            </Link>
            <Link to="/kutu" className="text-gray-700 hover:text-primary transition-all flex items-center gap-1.5 group">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
              Kutu Baskı
            </Link>
          </div>
        </div>
      </div>
      
      {/* Swipeable SEO Category Bar for Mobile */}
      <div className="bg-gray-50 border-b border-gray-100 py-2.5 md:hidden overflow-x-auto scrollbar-none flex whitespace-nowrap px-4 gap-4 text-xs font-bold uppercase tracking-tight">
        <span className="text-primary font-black shrink-0">Hızlı Sipariş:</span>
        <Link to="/kartvizit" className="text-gray-700 hover:text-primary shrink-0 font-bold">Kartvizit Baskı</Link>
        <span className="text-gray-300 shrink-0">|</span>
        <Link to="/brosur" className="text-gray-700 hover:text-primary shrink-0 font-bold">Broşür Baskı</Link>
        <span className="text-gray-300 shrink-0">|</span>
        <Link to="/magnet" className="text-gray-700 hover:text-primary shrink-0 font-bold">Magnet Baskı</Link>
        <span className="text-gray-300 shrink-0">|</span>
        <Link to="/kataloglar" className="text-gray-700 hover:text-primary shrink-0 font-bold">Katalog Baskı</Link>
        <span className="text-gray-300 shrink-0">|</span>
        <Link to="/kutu" className="text-gray-700 hover:text-primary shrink-0 font-bold">Kutu Baskı</Link>
      </div>
    </>
  );
};

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sortedBannerUrls.length);
    }, 15000); // 15 seconds transition
    return () => clearInterval(timer);
  }, []);

  const handleSecondaryClick = (link: string) => {
    if (link.startsWith('#')) {
      document.getElementById(link.substring(1))?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(link);
    }
  };

  return (
    <div className="relative w-full min-h-[300px] sm:min-h-[340px] md:h-[380px] lg:h-[400px] bg-slate-900 group flex items-center overflow-hidden py-3 sm:py-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src={banners[current].img}
            alt={banners[current].alt}
            className="w-full h-full transition-all duration-1000 object-cover opacity-100 scale-100"
            referrerPolicy="no-referrer"
            fetchPriority={current === 0 ? "high" : "auto"}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/10" />
        </motion.div>
      </AnimatePresence>
      
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center">
        <div className="max-w-3xl py-1 sm:py-2 pr-4 sm:pr-0 w-full">
          {/* Statik, Tekil ve Türkiye Geneli Odaklı Ana SEO H1 Başlığı */}
          <h1 className="text-base sm:text-2xl md:text-3xl font-black text-white leading-tight mb-2 uppercase tracking-tight text-shadow-strong">
            Matbaa ve Baskı Çözümleri
          </h1>

          <AnimatePresence mode="wait">
            <motion.div 
              key={current}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.5 }}
            >
              {/* Slider içi dinamik kampanya başlıkları H2 olarak yapılandırılmıştır */}
              <h2 className="text-sm sm:text-base md:text-lg font-extrabold text-amber-300 leading-snug mb-2 uppercase tracking-tight text-shadow-strong">
                {banners[current].title}
              </h2>
              
              <p className="text-xs sm:text-sm font-semibold text-slate-100 mb-3 max-w-2xl leading-relaxed text-shadow-strong">
                İstanbul Topkapı 2. Matbaacılar Sitesi'ndeki hizmet ve koordinasyon noktamız üzerinden Türkiye geneline matbaa ve ambalaj çözümleri sunuyoruz.
              </p>

              {/* Subtitle List with Green Check Square Badges */}
              {banners[current].subtitle && (
                <div className="mb-3 space-y-1 max-w-2xl">
                  {banners[current].subtitle
                    .split('\n')
                    .map(line => line.trim())
                    .filter(Boolean)
                    .map((line, idx) => (
                      <div key={idx} className="text-xs sm:text-sm text-white font-bold text-shadow-strong flex items-center gap-2">
                        <span className="w-4 h-4 rounded-[3px] bg-[#00C853] border border-black flex items-center justify-center shrink-0 shadow-sm">
                          <Check size={11} className="text-white stroke-[3.5]" />
                        </span>
                        <span className="leading-snug">{line.replace(/^•\s*/, '').replace(/^✅\s*/, '')}</span>
                      </div>
                    ))}
                </div>
              )}

              {/* Action Buttons - 2 Focused Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Blue Button */}
                {banners[current].blueBtn.link.startsWith('/') ? (
                  <Link to={banners[current].blueBtn.link} className="bg-[#29abe2] hover:bg-[#29abe2]/90 text-white min-h-[44px] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md inline-flex items-center justify-center">
                    {banners[current].blueBtn.text}
                  </Link>
                ) : (
                  <a href={banners[current].blueBtn.link} target="_blank" rel="noopener noreferrer" className="bg-[#29abe2] hover:bg-[#29abe2]/90 text-white min-h-[44px] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md inline-flex items-center justify-center">
                    {banners[current].blueBtn.text}
                  </a>
                )}

                {/* Black Button */}
                {banners[current].blackBtn.link.startsWith('/') ? (
                  <Link to={banners[current].blackBtn.link} className="bg-slate-900 hover:bg-black text-white border border-slate-700/80 min-h-[44px] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md inline-flex items-center justify-center">
                    {banners[current].blackBtn.text}
                  </Link>
                ) : (
                  <a href={banners[current].blackBtn.link} target="_blank" rel="noopener noreferrer" className="bg-slate-900 hover:bg-black text-white border border-slate-700/80 min-h-[44px] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md inline-flex items-center justify-center">
                    {banners[current].blackBtn.text}
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={() => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all z-10 backdrop-blur-xs shadow-md"
        aria-label="Önceki Banner"
      >
        <ChevronLeft size={22} />
      </button>
      <button 
        onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 min-w-[44px] min-h-[44px] bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all z-10 backdrop-blur-xs shadow-md"
        aria-label="Sonraki Banner"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot Indicators - Visible on both mobile and desktop with comfortable touch area */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-8 flex gap-1 z-10 items-center">
        {banners.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 group"
            aria-label={`Banner ${idx + 1}`}
          >
            <span className={`h-1.5 transition-all rounded-full block ${current === idx ? 'bg-[#29abe2] w-8 md:w-12' : 'bg-white/40 w-3 md:w-6 group-hover:bg-white/70'}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

const TrustBar = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const items = [
    { 
      icon: <Truck size={20} />, 
      title: "5.000 TL ve Üzeri (KDV Hariç) Ücretsiz Kargo", 
      desc: "5.000 TL ve üzeri (KDV Hariç) alışverişlerinizde, Türkiye'nin her iline ücretsiz kargo ile teslim ediyoruz." 
    },
    { 
      icon: <Package size={20} />, 
      title: "Zamanında Teslimat", 
      desc: "Ürünleri sitede belirtilen kargo tarihlerinde kargoya veriyor ve tarafınıza gönderiyoruz." 
    },
    { 
      icon: <ShieldCheck size={20} />, 
      title: "Güvenli Alışveriş", 
      desc: "Kişisel verilerinizi koruyor, ödemelerde 3D secure seçeneği sunarak ödemelerinizi güvende yapmanızı sağlıyoruz." 
    },
  ];

  return (
    <div className="bg-white border-b border-gray-100 py-1.5">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center md:items-start cursor-pointer group select-none relative"
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            >
              <div className="flex items-center gap-3">
                <div className="text-black group-hover:text-secondary transition-colors shrink-0">
                  {item.icon}
                </div>
                <h3 className="text-[11px] font-bold text-black uppercase tracking-tight">
                  {item.title}
                </h3>
              </div>
              
              <AnimatePresence>
                {expandedIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[10px] text-black leading-tight mt-2 max-w-[250px] text-center md:text-left">
                      {item.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: typeof PRODUCTS[0];
  setIsKartvizitModalOpen: (val: boolean) => void;
}

const toTurkishTitleCase = (str: string) => {
  if (!str) return "";
  return str
    .toLocaleLowerCase("tr-TR")
    .split(" ")
    .map((word) => {
      if (!word) return "";
      return word.charAt(0).toLocaleUpperCase("tr-TR") + word.slice(1);
    })
    .join(" ");
};

const PRODUCT_SEO_DATA: Record<string, {
  seoDesc: string;
  features: string[];
  pricingKey: string;
  orderKey: string;
}> = {
  kartvizit: {
    seoDesc: "İş ortaklarınızda kurumsal ve akılda kalıcı bir ilk izlenim bırakmak için kartvizit baskı çözümleri.",
    features: ["350 gr Kuşe Kağıt", "Mat veya Parlak Selefon", "Lokal Lak / Özel Kesim", "Çift Yön Ofset Baskı"],
    pricingKey: "Kartvizit Fiyatları",
    orderKey: "Online Kartvizit Siparişi"
  },
  el_ilani: {
    seoDesc: "Geniş kitlelere avantajlı ve etkili şekilde ulaşarak kampanya veya duyurularınızı ulaştıran el ilanları.",
    features: ["90 gr / 115 gr Kuşe", "Tek veya Çift Yön Baskı", "Canlı Renkli Ofset Baskı", "Hızlı Üretim Avantajı"],
    pricingKey: "El İlanı Fiyatları",
    orderKey: "Online El İlanı Siparişi"
  },
  brosur: {
    seoDesc: "Ürün ve hizmetlerinizi detaylı, şık ve katlamalı kırımlarla müşterilerinize sunan tanıtım broşürleri.",
    features: ["130 gr / 115 / 170 gr Kuşe", "Tek / Çift Kırım Katlama", "Yüksek Baskı Kalitesi", "A5 / A4 Ebat"],
    pricingKey: "Broşür Fiyatları",
    orderKey: "Online Broşür Siparişi"
  },
  magnet: {
    seoDesc: "Müşterilerinizin buzdolabı ve metal yüzeylerinde her an gözünün önünde yer alacak kalıcı magnet reklamları.",
    features: ["0.5 mm Mıknatıs", "Mat / Parlak Selefonlu", "Oval veya Özel Kesim", "Canlı Ofset Renkler"],
    pricingKey: "Magnet Fiyatları",
    orderKey: "Online Magnet Siparişi"
  },
  kitap_ayraci: {
    seoDesc: "Okurlarınız ve müşterileriniz için her kitap açıldığında markanızı hatırlatacak lüks kitap ayraçları.",
    features: ["350 gr Kuşe Kağıt", "Özel Delikli ve Püsküllü", "Mat veya Parlak Selefon", "Çift Yön Ofset Baskı"],
    pricingKey: "Kitap Ayracı Fiyatları",
    orderKey: "Online Kitap Ayracı Siparişi"
  },
  yag_karti: {
    seoDesc: "Oto servisler için araç periyodik bakım takibini kolaylaştıran, dayanıklı ve kurumsal oto bakım kartları.",
    features: ["350 gr Kalın Kuşe", "Özel Askı Delikli", "Yazı Yazılabilir Arka Yüz", "Kurumsal Logo Baskısı"],
    pricingKey: "Yağ Kartı Fiyatları",
    orderKey: "Online Yağ Kartı Siparişi"
  },
  etiket: {
    seoDesc: "Ambalajlarınızı markalaştıran, rulo veya tabaka olarak üretilen dayanıklı kendinden yapışkanlı etiketler.",
    features: ["Kuşe veya PP Opak Etiket", "Şeffaf veya Kraft Seçeneği", "Özel Şekilli Lazer Kesim", "Solmayan Canlı Mürekkep"],
    pricingKey: "Etiket Fiyatları",
    orderKey: "Online Etiket Siparişi"
  },
  zarf: {
    seoDesc: "Kurumsal yazışmalarınız ve fatura gönderimleriniz için prestij katan logo baskılı silikonlu diplomat zarflar.",
    features: ["110 gr 1. Hamur Kağıt", "Pencereli / Penceresiz", "Silikonlu Yapışkan Bant", "Kurumsal Logo Baskılı"],
    pricingKey: "Zarf Fiyatları",
    orderKey: "Online Diplomat Zarf Siparişi"
  },
  anteli_kagit: {
    seoDesc: "Kurumsal yazışmalarınızda resmiyetinizi ve kurumsal kimliğinizi en üst düzeyde yansıtan antetli kağıtlar.",
    features: ["80 gr 1. Hamur Kağıt", "A4 Standart Ebat", "Firma Logolu Özel Baskı", "Pürüzsüz Emici Doku"],
    pricingKey: "Antetli Kağıt Fiyatları",
    orderKey: "Online Antetli Kağıt Siparişi"
  },
  cep: {
    seoDesc: "Teklif, sözleşme, fatura ve kurumsal evraklarınızı bir arada tutarak prestij sunan cepli sunum dosyaları.",
    features: ["350 gr Kuşe Kağıt", "Tek veya Çift Cepli", "Mat / Parlak Selefonlu", "Kartvizit Takma Bölmesi"],
    pricingKey: "Cepli Dosya Fiyatları",
    orderKey: "Online Cepli Dosya Siparişi"
  },
  bloknot: {
    seoDesc: "Toplantılarda ve günlük iş akışında müşterilerinizin sürekli elinin altında olacak kurumsal bloknot not defterleri.",
    features: ["Spiralli / Tutkallı / Kapaklı", "80 gr 1. Hamur İç Sayfa", "350 gr Kuşe Kapak", "Logolu Özel Baskılı"],
    pricingKey: "Bloknot Fiyatları",
    orderKey: "Online Bloknot Siparişi"
  },
  kup: {
    seoDesc: "Çalışma masalarında her an not alma ihtiyacını çözen, uzun süre masada kalarak reklam yapan küp bloknotlar.",
    features: ["Logolu Özel Baskılı", "Tutkallı veya Kutulu", "80 gr 1. Hamur Kağıt", "Yüksek Sayfa Sayısı"],
    pricingKey: "Küp Bloknot Fiyatları",
    orderKey: "Online Küp Bloknot Siparişi"
  },
  katalog: {
    seoDesc: "Geniş ürün gamınızı ve kurumsal hikayenizi müşterilerinize en detaylı ve prestijli şekilde aktaran kataloglar.",
    features: ["Kuşe İç ve Kapak Kağıdı", "Tel Dikiş / Amerikan Cilt", "Mat / Parlak Selefon", "Çoklu Sayfa Seçeneği"],
    pricingKey: "Katalog Fiyatları",
    orderKey: "Online Katalog Siparişi"
  },
  amerikan_servis: {
    seoDesc: "Restoran ve kafeler için hem masa temizliği sağlayan hem de marka reklamınızı yapan kağıt Amerikan servisler.",
    features: ["Kraft veya Kuşe Kağıt", "Gıdaya Uygun Canlı Boya", "Tek Kullanımlık Pratik", "Firma Logolu Özel Tasarım"],
    pricingKey: "Amerikan Servis Fiyatları",
    orderKey: "Online Amerikan Servis Siparişi"
  },
  karton_canta: {
    seoDesc: "Müşterilerinizin mağazanızdan çıkıp sokaklarda markanızı taşımasını sağlayan şık kurumsal karton çantalar.",
    features: ["Amerikan Bristol / Kraft", "Mat / Parlak Selefon Kaplama", "İpli / Lüks Sonlandırma", "Toptan Matbaa Avantajı"],
    pricingKey: "Karton Çanta Fiyatları",
    orderKey: "Online Karton Çanta Siparişi"
  },
  otopaspas: {
    seoDesc: "Oto yıkama ve servis firmaları için araç içini temiz tutarken kurumsal reklamınızı yapan baskılı oto paspas kağıtları.",
    features: ["Kalın Emici Kraft / Kuşe", "Firma Logolu Özel Baskılı", "Ekonomik Toptan Üretim", "Hızlı Kuruma Özelliği"],
    pricingKey: "Oto Paspas Fiyatları",
    orderKey: "Online Oto Paspas Siparişi"
  },
  afis: {
    seoDesc: "Etkinlik, duyuru ve kampanyalarınızı geniş kitlelere ulaştıran dikkat çekici büyük boy afiş baskıları.",
    features: ["130 gr / 170 gr Kuşe", "A3 / A2 / 50x70 / 70x100 Ebat", "Yüksek Çözünürlüklü Ofset", "Canlı ve Solmaz Renkler"],
    pricingKey: "Afiş Fiyatları",
    orderKey: "Online Afiş Siparişi"
  },
  siparis_fisi: {
    seoDesc: "Satış ve sipariş süreçlerinizi kayıt altında tutarak iş takibini kolaylaştıran otokopili sipariş fişleri.",
    features: ["Kendinden Karbonlu", "Numaratörlü Seri Takibi", "Ciltli ve Perforajlı", "1. Sınıf Mikrokapsüllü"],
    pricingKey: "Sipariş Fişi Fiyatları",
    orderKey: "Online Sipariş Fişi Siparişi"
  },
  ambalaj: {
    seoDesc: "Gıda ve gıda dışı ürünlerinizi güvenle paketleyen ve markanızı sergileyen ambalaj paketleme kağıtları.",
    features: ["Sülfit veya Kraft Kağıt", "Gıdaya Uygun Boyalar", "Yağ ve Nem Dayanımı", "Logolu Özel Ambalaj"],
    pricingKey: "Ambalaj Fiyatları",
    orderKey: "Online Ambalaj Siparişi"
  },
  makbuz: {
    seoDesc: "Tahsilat, tediye, teslimat ve irsaliye gibi operasyonlarınızı düzenleyen otokopili resmi veya özel makbuz ve formlar.",
    features: ["Otokopili (Çok Nüshalı)", "Otomatik Seri Numaralı", "Perforajlı Kolay Koparma", "Firma Logolu Tasarım"],
    pricingKey: "Makbuz Fiyatları",
    orderKey: "Online Makbuz Siparişi"
  },
  kutu: {
    seoDesc: "Ürünlerinizi dış etkenlerden korurken şık sunumuyla kargo ve satış değerini artıran kurumsal kutular.",
    features: ["Amerikan Bristol / Mikro Kırma", "Gıda veya E-ticaret Kutusu", "Selefonlu ve Varak Yaldızlı", "Özel Ölçülerde Kesim"],
    pricingKey: "Kutu Fiyatları",
    orderKey: "Online Kutu Siparişi"
  }
};

const getProductPath = (type: string): string => {
  switch (type) {
    case "kutu": return "/kutu";
    case "ambalaj": return "/ambalaj";
    case "kartvizit": return "/kartvizit";
    case "brosur": return "/brosur";
    case "el-ilani": return "/el-ilani";
    case "afis": return "/afis";
    case "antetli": return "/antetli";
    case "dosyalar": return "/dosyalar";
    case "etiket": return "/etiket";
    case "oto-paspas": return "/oto-paspas";
    case "kup-bloknot": return "/kup-bloknot";
    case "bloknotlar": return "/bloknotlar";
    case "magnet": return "/magnet";
    case "amerikan-servis": return "/amerikan-servis";
    case "karton-canta": return "/karton-canta";
    case "katalog": return "/kataloglar";
    case "zarf": return "/zarf";
    case "makbuz-ve-formlar": return "/makbuz-ve-formlar";
    case "kitap-ayraci": return "/kitap-ayraci";
    case "yag-karti": return "/yag-karti";
    case "siparis-fisi": return "/siparis-fisi";
    default: return "#products";
  }
};

const ProductCard = (props: any) => {
  const { product } = props;
  const [imgFailed, setImgFailed] = useState(false);
  const productPath = getProductPath(product.type);
  const seoInfo = PRODUCT_SEO_DATA[product.id] || {
    seoDesc: product.subtext,
    features: ["1. Sınıf Malzeme", "Canlı Baskı Standartları", "Hızlı Üretim Garantisi"],
    pricingKey: toTurkishTitleCase(product.name) + " Fiyatları",
    orderKey: "Online Matbaa Siparişi"
  };

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden group flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover:border-secondary/30"
    >
      <div className="flex flex-col flex-1 min-w-0">
        <Link 
          to={productPath}
          title={`${product.name} Fiyatları ve Özellikleri`}
          className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-100 flex items-center justify-center shrink-0 block"
        >
          {!imgFailed ? (
            <img 
              src={LOCAL_ASSETS[product.id]} 
              srcSet={`${LOCAL_ASSETS[product.id]} 1x`}
              alt={`${product.name} - Mavi Basım Online Matbaa Baskı`} 
              title={`${product.name} - Mavi Basım Matbaa`}
              width="400"
              height="300"
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-sky-50 to-indigo-50 relative select-none">
              <span className="text-[9px] font-black tracking-widest text-secondary/40 uppercase mb-1">MAVİ BASIM</span>
              <span className="text-xs font-black text-slate-800 text-center uppercase tracking-tight max-w-[150px] leading-tight mb-2">
                {product.name}
              </span>
              <div className="flex items-center gap-1.5 bg-white/75 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border border-slate-100">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-[8px] font-bold text-slate-500 tracking-tight">Görsel Hazırlanıyor</span>
              </div>
            </div>
          )}
          <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
            <span className="text-[9px] font-black text-white uppercase tracking-wider">
              {product.desc}
            </span>
          </div>
        </Link>
        
        <div className="p-4 sm:p-5 flex-1 flex flex-col">
          <div className="mb-2 min-h-[50px] flex flex-col justify-start">
            <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tight mb-1 self-start">
              {seoInfo.orderKey}
            </span>
            <h3 className="text-xs sm:text-sm md:text-base font-black text-slate-950 uppercase tracking-tight leading-tight line-clamp-2">
              <Link 
                to={productPath}
                className="hover:text-primary transition-colors block"
                title={`${product.name} Online Fiyatları ve Siparişi`}
              >
                {product.name}
              </Link>
            </h3>
          </div>
          
          <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3 line-clamp-2 min-h-[36px] flex items-center">
            {seoInfo.seoDesc}
          </p>

          {/* Ürün Özellikleri / Teknik Özellikler */}
          <div className="grid grid-cols-2 gap-1.5 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 min-h-[68px] content-center flex-none">
            {seoInfo.features.map((feature: string, fIdx: number) => (
              <span key={fIdx} className="text-[10px] font-bold text-slate-700 leading-tight flex items-start gap-1.5 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1" />
                <span className="break-words line-clamp-1" title={feature}>{feature}</span>
              </span>
            ))}
          </div>

          <div className="mt-auto space-y-2.5 pt-1">
            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex-none">
              <div>
                <span className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest block mb-0.5">
                  BAŞLAYAN FİYATLAR
                </span>
                <span className="text-xs sm:text-sm md:text-base font-black text-primary tracking-tighter">
                  {typeof product.price === 'number' ? formatPrice(product.price) : product.price}
                </span>
              </div>
            </div>

            {/* Kısa Avantaj Metni / Değer Rozetleri */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-center gap-1 w-full flex-none">
              <span className="text-[8px] sm:text-[9px] font-black bg-black text-white px-1.5 py-1 rounded uppercase tracking-tight whitespace-nowrap flex-1 flex items-center justify-center min-h-[22px]">
                Hızlı Üretim
              </span>
              <span className="text-[8px] sm:text-[9px] font-black bg-black text-white px-1.5 py-1 rounded uppercase tracking-tight whitespace-nowrap flex-1 flex items-center justify-center min-h-[22px]">
                Kaliteli Baskı
              </span>
              <span className="text-[8px] sm:text-[9px] font-black bg-black text-white px-1.5 py-1 rounded uppercase tracking-tight whitespace-nowrap flex-1 flex items-center justify-center min-h-[22px]">
                Uygun Fiyat
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 sm:px-5 sm:pb-5 flex-none">
        <Link 
          to={productPath}
          title={`${product.name} Fiyat Listesi ve Sipariş Sayfası`}
          className="w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-extrabold flex items-center justify-between transition-all duration-300 bg-secondary text-white hover:bg-secondary/90 shadow-sm hover:shadow-md group-hover:bg-primary"
        >
          <div className="flex flex-col text-left truncate min-w-0">
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-white/80">MAVİ BASIM MATBAA</span>
            <span className="truncate text-[11px] sm:text-xs font-black mt-0.5">{seoInfo.pricingKey} &amp; Sipariş</span>
          </div>
          <ArrowRight size={14} className="flex-shrink-0 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
};

const CategoryList = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-xl font-bold text-black mb-8 flex items-center gap-3">
        <Package className="text-black" />
        Hizmet Kategorilerimiz
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ALL_PRODUCTS_CATEGORIES.map((cat, idx) => (
          <button 
            key={idx} 
            onClick={() => navigate(getCategoryPath(cat))}
            className="flex items-center gap-3 p-4 rounded-2xl hover:bg-secondary/5 border border-transparent hover:border-secondary/10 transition-all group text-left w-full"
          >
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
              <ChevronRight size={16} />
            </div>
            <span className="text-xs font-medium text-black group-hover:text-black">{cat}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const HOME_FAQS = [
  {
    question: "Tasarım onayı ne kadar sürer?",
    answer: "Grafik tasarım dosyanızı veya logonuzu WhatsApp ya da e-posta ile iletmenizin ardından, uzman grafik ekibimiz çalışmayı teknik (kesim payları, CMYK renk uyumu vb.) olarak inceleyip onayınıza sunulacak dijital PDF provayı ortalama 1-2 saat içinde hazırlar. Aynı gün PDF prova onayı sistemimiz sayesinde süreç son derece hızlıdır."
  },
  {
    question: "Baskı süreci ne zaman başlar?",
    answer: "Siparişlerinizin baskı makinelerimize alınması, hazırlanan PDF prova onayına WhatsApp veya yazılı kanallar üzerinden basılı onay vermeniz ve ödeme teyidinin yapılmasıyla birlikte 24 saat içinde gerçekleşir. Onayınız ve ödeme teyidi alınmadan hiçbir sipariş fiziksel olarak basılmaz."
  },
  {
    question: "Mavi Basım online matbaa sipariş süreci nasıl işler?",
    answer: "Süreç oldukça basittir: 1) İhtiyacınız olan ürün, ölçü ve adet bilgisini WhatsApp veya telefonla bize iletirsiniz. 2) Uzman ekibimiz en uygun fiyat teklifini sunar. 3) Grafik ekibimiz gönderdiğiniz tasarımı teknik (kesim payı, CMYK vb.) olarak ücretsiz kontrol edip dijital PDF prova hazırlar. 4) PDF provaya onay vermenizin ardından ödeme alınır ve üretime başlanır. 5) 2-4 iş günü içinde üretim tamamlanıp adresinize sevk edilir."
  },
  {
    question: "Kargo ücretli mi, teslimat süreci nasıl işler?",
    answer: "5.000 TL ve üzeri (KDV Hariç) siparişlerinizde kargo ücretsizdir. Baskısı tamamlanan tüm ürünleriniz, kargoda ezilme, ıslanma ve bükülmeyi önleyici koruyucu özel ambalajlar ve çift oluklu kalın kolilerle paketlenir. Anlaşmalı kargo firmalarımız aracılığıyla Türkiye'nin 81 ilindeki adresinize sigortalı ve güvenli şekilde sevk edilir."
  },
  {
    question: "Kendi tasarımım hazır değil, tasarım desteği veriyor musunuz?",
    answer: "Evet, tasarımınız hazır olmasa bile uzman grafik ekibimiz logonuzu yerleştirme, yazılarınızı düzenleme, taşma paylarını ayarlama ve matbaa standartlarına uygun şık şablonlar oluşturma konularında size ücretsiz teknik destek sunar. Sipariş vermeden önce logonuzu yüksek çözünürlüklü olarak iletmeniz yeterlidir."
  },
  {
    question: "Baskı öncesi PDF onay provası nedir, neden önemlidir?",
    answer: "PDF onay provası, tasarımınızın matbaa kesim çizgilerine ve taşma paylarına göre fiziksel olarak nasıl basılacağını gösteren son dijital önizlemedir. Yazım hatalarını, telefon numaralarını veya görsel kaymalarını son kez kontrol etmenizi sağlayarak hatalı basımları %100 engeller. Siz onay provasına yazılı 'BASKI ONAYI' vermeden üretim makinelerimiz kesinlikle çalıştırılmaz."
  },
  {
    question: "Siparişlerimin imalatı ne kadar sürer ve ne zaman teslim edilir?",
    answer: "Yazılı PDF prova onayınız alındıktan sonra 24 saat içinde üretime başlanır. Kartvizit, broşür, etiket, magnet gibi standart tanıtım ürünlerinin üretimi genellikle 2-3 iş günü; kutu, ambalaj ve katalog gibi özel işçilik (lak, gofre, özel kesim bıçağı) gerektiren ürünler ise 3-5 iş günü içinde tamamlanarak kargoya teslim edilir."
  },
  {
    question: "İstanbul dışından (Anadolu'dan) sipariş verebilir miyim?",
    answer: "Kesinlikle! Mavi Basım olarak İstanbul Topkapı 2. Matbaacılar Sitesi'ndeki hizmet ve koordinasyon noktamız üzerinden online sistemimiz sayesinde tüm Türkiye geneline ulaştırıyoruz. Ankara, İzmir, Bursa, Antalya, Samsun, Gaziantep, Trabzon ve Van dahil 81 ile her gün korunaklı paketlerle sevkiyat yapmaktayız."
  },
  {
    question: "Minimum sipariş adetleriniz ne kadardır?",
    answer: "Tabaka kuşe etiket, kartvizit ve tanıtım ürünlerinde minimum siparişimiz 100 adet olup butik işletmeler için son derece ekonomiktir. Ancak endüstriyel bobine sarılı rulo etiketler, özel ambalaj kutuları ve kataloglar gibi yüksek kurulum ve makine ayar firesi olan ürünlerde minimum üretim limitimiz 1.000 adettir (optimum bütçe için 5.000 adet önerilir)."
  },
  {
    question: "Ödeme seçenekleri ve şartlarınız nelerdir?",
    answer: "Kurumsal sipariş süreçlerimizde, onay provasının ardından banka havalesi/EFT veya 3D Secure güvenli ödeme altyapımız üzerinden kredi kartıyla (tek çekim veya taksit seçenekleriyle) ödemenizi kolayca gerçekleştirebilirsiniz. Ödeme teyidinin ardından siparişiniz anında üretim planlamasına alınır."
  },
  {
    question: "Kendi hazır tasarımımızı hangi formatlarda göndermeliyiz?",
    answer: "Baskı kalitesinin kusursuz çıkması için tasarımlarınızı vektörel formatlarda (PDF, AI, CDR) veya yüksek çözünürlüklü PSD katmanları şeklinde göndermenizi tercih ederiz. Eğer görsel (JPEG, PNG) gönderecekseniz, tasarımın çözünürlüğünün en az 300 DPI ve renk modunun baskıya uyumlu CMYK olmasına dikkat etmelisiniz."
  },
  {
    question: "Baskıda renk farklılığı veya ton kayması yaşanır mı?",
    answer: "Bilgisayar ve telefon ekranları ışıklı RGB renk uzayını kullanırken, matbaa baskı makineleri fiziksel mürekkeplerden oluşan CMYK renk uzayını kullanır. Bu teknik farktan dolayı ekrandaki renkler ile kağıttaki renkler arasında %5-10 oranında minimal ton farkları olabilir. Mavi Basım olarak bu farkı önlemek adına tüm makinelerimizi spektofotometre cihazlarıyla uluslararası standartlarda kalibre etmekteyiz."
  },
  {
    question: "Rulo etiket siparişi verirken sarım yönü neden önemlidir?",
    answer: "Eğer bastırdığınız yapışkanlı etiketleri el ile tek tek yapıştıracaksanız sarım yönünün bir önemi yoktur. Ancak etiketleri otomatik etiketleme makinesiyle kavanoz veya şişelere yapıştıracaksanız, makinenizin rulo akış yönüne (sarım pozisyonu) uygun bir yön seçmelisiniz. Yanlış sarım yönü, etiketlerin makineden ters veya yan çıkmasına sebob olur."
  },
  {
    question: "Gıda ambalajlarında kullandığınız kartonlar gıda sağlığına uygun mudur?",
    answer: "Evet. Doğrudan gıda ürünleriyle temas eden (pasta, pizza, pide, kurabiye, fast-food ambalajları vb.) tüm kutularımızda, Tarım ve Orman Bakanlığı gıda temas sertifikalı, koku yapmayan, %100 saf selüloz Amerikan Bristol gıda kartonları kullanıyoruz. Geri dönüştürülmüş fason kartonlar kesinlikle kullanılmaz."
  },
  {
    question: "Matbaa fiyatlarınız neden diğer yerlere göre daha uygun?",
    answer: "Mavi Basım, İstanbul Zeytinburnu Topkapı 2. Matbaacılar Sitesi'ndeki koordinasyon ve hizmet noktası üzerinden doğrudan matbaa ve baskı süreçlerini yönetmektedir. Gereksiz aracı maliyetlerini ortadan kaldırarak kurumsal ve perakende müşterilerimize şeffaf, avantajlı fiyatlar sunuyoruz."
  },
  {
    question: "Baskıda hata, kayma veya üretim kusuru olması durumunda ne yapıyorsunuz?",
    answer: "Mavi Basım olarak ürettiğimiz her basılı materyalde %100 müşteri memnuniyeti garantisi sunuyoruz. Bizden kaynaklanan herhangi bir kesim kayması, hatalı gofre/lak uygulaması veya bariz renk hatası durumunda, hatalı ürünlerinizi hızla sıfırdan yeniden basarak adresinize ücretsiz olarak sevk ediyoruz."
  },
  {
    question: "Daha önce bastırdığımız ürünün tekrar siparişinde kalıp ücreti alınıyor mu?",
    answer: "Hayır. Ürünleriniz için hazırlanan özel kesim bıçakları, kabartma klişeleri ve lazer kalıpları teknik arşivimizde 5 yıl boyunca güvenle muhafaza edilir. Aynı ürünü tekrar bastırmak istediğinizde sistemimiz eski kalıpları otomatik eşleştirir ve sizden kesinlikle yeni bir kalıp veya bıçak ücreti talep edilmez."
  }
];

const HomePage = () => {
  const randomProducts = PRODUCTS.slice(0, 18);
  const [activeGuideTab, setActiveGuideTab] = useState<'tech' | 'gramaj' | 'mucellit' | 'ebat'>('tech');

  return (
    <>
      <Helmet>
        <title>Mavi Basım Matbaa &amp; Reklam | İstanbul Online Matbaa ve Baskı Hizmetleri</title>
        <meta name="description" content="İstanbul Topkapı Matbaacılar Sitesi’ndeki hizmet ve koordinasyon merkezimizde kartvizit, broşür, magnet, katalog, kutu ve ambalaj baskı çözümleri sunuyoruz. Türkiye genelinde hızlı teslimat ve bütçe dostu matbaa çözümleri." />
        <meta name="keywords" content="mavi basım, matbaa, baskı, kartvizit, broşür, magnet, kutu baskı, ambalaj, reklam" />
      </Helmet>
      <Hero />
      <SEOQuickCategoryBar />

      {/* Türkiye'nin Önde Gelen Matbaa Çözüm Merkezlerinden Biri - Otorite Bandı */}
      <section className="bg-gray-50 text-slate-900 py-6 md:py-8 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto md:max-w-7xl bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between shadow-sm">
            <div className="space-y-2 flex-1">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Award size={14} /> KURUMSAL MATBAA GÜVENCESİ
              </div>
              <h2 className="text-lg md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                20+ Yıllık Tecrübeyle Güvenilir Baskı Çözümleri
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                Mavi Basım Matbaa &amp; Reklam olarak yıllara dayanan tecrübemizi dijital sipariş kolaylığıyla buluşturuyoruz. Topkapı 2. Matbaacılar Sitesi'ndeki hizmet noktamızda kartvizitten lüks ambalaj kutusuna kadar tüm siparişleri yüksek baskı kalitesi, şeffaf maliyet yapısı ve zamanında kargo garantisiyle sunuyoruz.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0 w-full md:w-auto">
              <a
                href="https://wa.me/905325852504?text=Merhaba,%20matbaa%20baskı%20hizmetleriniz%20hakkında%20bilgi%20ve%20fiyat%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs uppercase px-5 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                <WhatsAppIcon size={16} /> WhatsApp Destek
              </a>
              <Link
                to="/hakkimizda"
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase px-5 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                Hakkımızda &amp; Tesis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Altı - Doğal SEO ve Matbaa Baskı Çözümleri Özeti */}
      <section className="bg-white border-b border-gray-100 py-6 md:py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto md:max-w-7xl bg-slate-50 rounded-2xl border border-slate-100 p-5 md:p-6 flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-xs font-black tracking-widest text-[#00E5FF] uppercase mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" /> OFSET VE DİJİTAL BASKI MERKEZİ
              </h2>
              <p className="text-xs md:text-sm text-slate-600 font-semibold leading-relaxed">
                İşletmenizin kurumsal kimliğini ve pazarlama materyallerini güçlendiren <strong className="text-slate-900">ofset baskı</strong> ve <strong className="text-slate-900">dijital baskı</strong> çözümlerimiz, Topkapı merkezimiz koordinasyonunda özenle hazırlanmaktadır. Farklı tiraj ve malzeme ihtiyaçlarınıza uygun şeffaf fiyat listelerimizi kategorilerimizden inceleyebilir, dosyanızı yükleyerek siparişinizi güvenle başlatabilirsiniz.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link to="/brosur" className="bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-md">
                Broşür Çözümleri
              </Link>
              <Link to="/kartvizit" className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-md">
                Kartvizit Seçenekleri
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GERÇEK ATÖLYE VE ÜRETİM TESİSİMİZDEN KARELER (E-E-A-T GALERİSİ) */}
      <section className="bg-white text-slate-900 py-14 md:py-20 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-3 border border-primary/20">
              E-E-A-T ŞEFFAFLIK &amp; ÜRETİM STANDARTLARI
            </div>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-4">
              Topkapı Hizmet ve <span className="text-primary">Koordinasyon Noktamızdan Kareler</span>
            </h2>
            <p className="text-slate-600 font-semibold leading-relaxed text-xs md:text-sm">
              Tüm siparişlerinizi Topkapı 2. Matbaacılar Sitesi'ndeki hizmet noktamız koordinasyonunda ofset ve dijital baskı makineleri, hassas giyotinler, otomatik selefon kaplama ve kırım-ciltleme parkurumuzla yönetiyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Gallery Item 1 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src="/images/hakkimizda/baski-kalitesini-etkileyen-faktorler-teknik-detaylar.webp" 
                  alt="Ofset Baskı Parkuru" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-white/10">
                  OFSET BASKI PARKURU
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  Çok Renkli Ofset Baskı Parkuru
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Yüksek tirajlı broşür, katalog ve ambalaj siparişlerinizde yüksek renk doğruluğu sağlayan çok renkli ofset baskı sistemlerimiz.
                </p>
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src="/images/hakkimizda/baski-sonrasi-islemler-mucellit-surecleri.webp" 
                  alt="Giyotin ve Mücellit İşlemleri" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-white/10">
                  MÜCELLİT &amp; KESİM
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  Hassas Giyotin &amp; Ebatlama
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Baskısı tamamlanan tabakaların milimetrik hassasiyetle kesimi, kırım katlama ve otomatik harmanlama süreçleri.
                </p>
              </div>
            </div>

            {/* Gallery Item 3 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src="/images/hakkimizda/selefon-nedir-mat-parlak-selefon-farklari.webp" 
                  alt="Selefon Kaplama Makinesi" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-white/10">
                  YÜZEY KORUMA
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  Mat &amp; Parlak Selefon Kaplama
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Kartvizit, cepli dosya ve kutu yüzeylerini suya, çizilmeye ve yırtılmaya karşı koruyan termal lüks selefon hattı.
                </p>
              </div>
            </div>

            {/* Gallery Item 4 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src="/images/hakkimizda/varak-baski-nedir-altin-gumus-yaldiz-teknikleri.webp" 
                  alt="Varak Yaldız ve Özel Kesim" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-white/10">
                  ÖZEL UYGULAMALAR
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  Sıcak Varak Yaldız &amp; Kabartma Lak
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Prestijli kurumsal materyaller için altın/gümüş varak yaldız ve bölgesel parlak kabartma lak dokunuşları.
                </p>
              </div>
            </div>

            {/* Gallery Item 5 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src="/images/hakkimizda/hizli-uretim-sureci-acil-matbaa-baski.webp" 
                  alt="Paketleme ve Kargo Sevk" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-white/10">
                  LOJİSTİK &amp; SEVK
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  Özel Çift Oluklu Koli Paketleme
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Baskısı ve kontrolü tamamlanan siparişler nem ve darbeye dirençli korumalı kolilerle 81 ile sevk edilir.
                </p>
              </div>
            </div>

            {/* Gallery Item 6 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-md">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src="/images/hakkimizda/tecrube-matbaa.webp" 
                  alt="Deneyimli Üretim Ekibimiz" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-white/10">
                  UZMAN KADRO
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  20+ Yıllık Usta Ekip Tecrübesi
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Matbaa ustalarımız ve grafik uzmanlarımızla basım öncesinden teslimata kadar tüm süreci denetliyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sipariş Süreci / Nasıl Sipariş Verilir? Section */}
      <section id="siparis-sureci" className="bg-slate-50 py-12 md:py-16 border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
              KOLAY SİPARİŞ ADIMLARI
            </div>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-4">
              Online Matbaa <span className="text-primary">Sipariş Süreci</span> Nasıl İşler?
            </h2>
            <p className="text-slate-600 font-semibold leading-relaxed text-sm md:text-base">
              Mavi Basım aracılığıyla dükkanınızdan veya ofisinizden çıkmadan, sadece 5 kolay adımda <strong className="text-slate-900">Acil ve Hızlı</strong> matbaa siparişinizi oluşturun. Tüm süreç profesyonel ve güvencelidir.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line for Desktop */}
            <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 relative z-10">
              {[
                {
                  step: "01",
                  title: "Teklif Al",
                  desc: "İstediğiniz ürünün ebat, kağıt ve adet detaylarını WhatsApp veya telefonla bize ileterek anında en uygun fiyat teklifini alın.",
                  badge: "Hızlı Dönüş"
                },
                {
                  step: "02",
                  title: "Tasarım Gönder",
                  desc: "Hazır tasarımınızı (PDF, AI, CDR) iletin. Tasarımınız yoksa kurumsal logonuz ve bilgilerinizle grafik ekibimizden ücretsiz teknik destek alın.",
                  badge: "Ücretsiz Grafik"
                },
                {
                  step: "03",
                  title: "PDF Prova Onayı",
                  desc: "Baskı öncesi hazırladığımız dijital mizanpajı inceleyin. PDF Prova Onayı ile üretime başlayın.",
                  badge: "Dijital Onay"
                },
                {
                  step: "04",
                  title: "Üretim",
                  desc: "Onayınızın ardından İstanbul Topkapı'daki tesislerimizde ofset veya yüksek hızlı dijital parkurumuzda baskıya geçilir.",
                  badge: "Modern Parkur"
                },
                {
                  step: "05",
                  title: "Kargo",
                  desc: "Siparişleriniz koruyucu ambalajlarla paketlenir. Anlaşmalı kargo firmaları aracılığıyla adresinize sevk edilir.",
                  badge: "81 İl Kargo"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl font-black text-primary/20 font-mono tracking-tighter group-hover:text-primary/30 transition-colors">
                        {item.step}
                      </span>
                      <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 font-semibold text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Welcome SEO Section */}
      <section className="bg-white py-8 md:py-14 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-none">
            <span className="inline-block bg-primary/10 text-primary text-[10px] md:text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3">
              Güvenilir İstanbul Topkapı Matbaa Merkezi
            </span>
            <h2 className="text-xl md:text-2.5xl lg:text-3.25xl font-black text-slate-900 tracking-tight mb-3 uppercase leading-tight">
              20+ Yıllık Tecrübeyle <span className="text-primary">İstanbul Topkapı Hizmet Merkezimiz</span> &amp; Profesyonel Baskı Çözümleri
            </h2>
            <h3 className="text-md md:text-lg font-bold text-slate-600 mb-6 max-w-5xl mx-auto leading-relaxed">
              Topkapı Koordinasyon Noktamızdan Baskı Hizmetleri, Kurumsal Çözümler ve Güvenilir Matbaa Altyapısı
            </h3>
 
            {/* Güven Sinyalleri & Rozet Alanı (İlk Ekran Altı) */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6 text-left max-w-7xl mx-auto">
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary font-black text-base sm:text-lg">Yılların Tecrübesi</span>
                  <Award className="text-primary stroke-[2.2] w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-slate-900 font-extrabold text-xs mb-1">Kurumsal İmalat Tecrübesi</div>
                <div className="text-slate-600 text-[11px] font-semibold leading-snug">20 yılı aşkın köklü matbaa ve profesyonel baskı birikimi.</div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary font-black text-base sm:text-lg">Topkapı Merkezimiz</span>
                  <Printer className="text-primary stroke-[2.2] w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-slate-900 font-extrabold text-xs mb-1">Matbaa &amp; Baskı Çözümleri</div>
                <div className="text-slate-500 text-[11px] font-semibold leading-snug">İstanbul Topkapı Matbaacılar Sitesi'nde profesyonel hizmet.</div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary font-black text-base sm:text-lg">81 İle Gönderim</span>
                  <Truck className="text-primary stroke-[2.2] w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-slate-900 font-extrabold text-xs mb-1">Özenli Paketleme</div>
                <div className="text-slate-500 text-[11px] font-semibold leading-snug">Dayanıklı koliler ile korumalı paketleme.</div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary font-black text-base sm:text-lg">Bütçe Dostu</span>
                  <Boxes className="text-primary stroke-[2.2] w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-slate-900 font-extrabold text-xs mb-1">Şeffaf &amp; Net Bütçe</div>
                <div className="text-slate-500 text-[11px] font-semibold leading-snug">Sürpriz maliyetsiz, doğrudan avantajlı fiyat politikası.</div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-between col-span-2 md:col-span-1 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary font-black text-base sm:text-lg">PDF Prova Onayı</span>
                  <CheckCircle2 className="text-primary stroke-[2.2] w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-slate-900 font-extrabold text-xs mb-1">Ücretsiz Grafik Kontrol</div>
                <div className="text-slate-500 text-[11px] font-semibold leading-snug">Baskı öncesi renk, çözünürlük ve kırım denetimi.</div>
              </div>
            </div>

            {/* Hızlı Güven & Tasarım Destek CTA Bağlantısı */}
            <div className="mb-8 max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 bg-emerald-50/80 border border-emerald-200/70 p-3.5 sm:p-4 rounded-2xl text-left">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-emerald-600 w-6 h-6 shrink-0" />
                <div className="text-xs sm:text-sm font-bold text-slate-800">
                  <span className="text-emerald-700 font-black uppercase">Sıfır Hatalı Baskı Güvencesi:</span> Tasarımlarınız üretime girmeden önce grafik ekibimizce ücretsiz incelenir ve PDF onayınız alınır.
                </div>
              </div>
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs px-4 py-2 rounded-xl transition-all inline-flex items-center gap-1.5 shadow-sm shrink-0"
              >
                Tasarımını Ücretsiz Denetlet
              </a>
            </div>
 
            <div className="space-y-4 text-slate-600 font-semibold leading-relaxed text-sm md:text-base bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-[2rem] shadow-sm text-left max-w-7xl mx-auto">
              <p>
                Mavi Basım, İstanbul Topkapı Matbaacılar Sitesi'nde yer alan koordinasyon ve hizmet merkezinde, donanımlı bir <strong className="text-slate-900">İstanbul Topkapı Matbaa Hizmet Noktası</strong> ve güvenilir bir <strong className="text-slate-900">Baskı Çözüm Merkezi</strong> olarak faaliyetlerini sürdürmektedir. Tüm kurumsal ve ticari sipariş taleplerinizi yüksek kalite standartları ve zamanında teslimat ilkesiyle karşılamaktadır.
              </p>
              <p>
                Mavi Basım ile dükkanınızdan veya ofisinizden çıkmadan, sadece 5 kolay adımda profesyonel <strong className="text-primary">Baskı Siparişi</strong> oluşturabilirsiniz. <strong className="text-slate-900">Uygun fiyatlı matbaa</strong> ve <strong className="text-slate-900">kaliteli baskı</strong> arayışınızda, kaliteden ödün vermeden güvenilir bir iş ortağı olarak çalışıyoruz. Web sitemiz üzerinden <strong className="text-slate-900">güncel matbaa fiyatları</strong> ve <strong className="text-slate-900">baskı maliyetleri</strong> bilgilerine şeffafça ulaşabilir, kolayca online sipariş verebilirsiniz.
              </p>
              <p className="text-primary font-bold border-t border-slate-200/60 pt-3">
                81 ile kargo güvenceli <strong className="text-primary">Kurumsal Baskı Çözümleri</strong> kapsamında; <a href="/kartvizit" className="underline hover:text-slate-900">Kartvizit Fiyatları</a>, <a href="/brosur" className="underline hover:text-slate-900">Broşür Fiyatları</a>, <a href="/kataloglar" className="underline hover:text-slate-900">Katalog Fiyatları</a>, <a href="/etiket" className="underline hover:text-slate-900">Etiket Fiyatları</a>, <a href="/kutu" className="underline hover:text-slate-900">Kutu Fiyatları</a>, <a href="/magnet" className="underline hover:text-slate-900">Magnet Fiyatları</a> ve <a href="/karton-canta" className="underline hover:text-slate-900">Karton Çanta Fiyatları</a> incelemesi yapabilir, siparişinizi hemen iletebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>
 
      {/* Öne Çıkan Ürünler Section */}
      <section id="featured-products" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="text-center max-w-none mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3.5xl font-black uppercase tracking-tight text-slate-900 mb-4">
            Online <span className="text-primary">Matbaa Ürünleri</span> ve Online Baskı Çözümleri
          </h2>
          <p className="text-slate-600 font-semibold leading-relaxed text-sm md:text-base mb-6 w-full max-w-7xl mx-auto">
            Mavi Basım olarak <strong className="text-slate-900">Uygun Fiyatlı Matbaa</strong> arayışlarınızda, bütçenizi koruyan <Link to="/kartvizit" className="text-primary hover:underline font-bold">Kartvizit</Link> ve <Link to="/brosur" className="text-primary hover:underline font-bold">Broşür</Link> seçenekleri de dahil olmak üzere zengin bir ürün yelpazesi sunuyoruz. Kurumsal <Link to="/brosur" className="text-slate-900 hover:text-primary underline">broşür</Link>, şık <Link to="/magnet" className="text-slate-900 hover:text-primary underline">magnet</Link>, yapışkanlı <Link to="/etiket" className="text-slate-900 hover:text-primary underline">etiket</Link>, ambalaj <Link to="/kutu" className="text-slate-900 hover:text-primary underline">kutusu</Link>, <Link to="/karton-canta" className="text-slate-900 hover:text-primary underline">karton çanta</Link>, <Link to="/antetli" className="text-slate-900 hover:text-primary underline">antetli kağıt</Link> ve otokopili <Link to="/makbuz-ve-formlar" className="text-slate-900 hover:text-primary underline">makbuz form</Link> siparişlerinizi <strong className="text-primary">Online Baskı Siparişi</strong> kolaylığıyla, Zeytinburnu ve Topkapı merkezimiz koordinasyonunda güvenli şekilde adresinize teslim ediyoruz.
          </p>
          <div className="bg-primary/5 border border-primary/10 p-5 rounded-2xl text-xs md:text-sm font-bold text-slate-700 w-full max-w-7xl mx-auto leading-relaxed">
            <strong>2026 Güncel Matbaa Fiyatları &amp; Sipariş:</strong> 2026 yılında en çok tercih edilen kurumsal baskı çözümleri arasında <strong className="text-primary">Online Matbaa Fiyatları</strong> ile bütçe dostu, kaliteli <Link to="/el-ilani" className="text-primary hover:underline">el ilanları</Link>, <Link to="/etiket" className="text-primary hover:underline">etiketler</Link>, <Link to="/kutu" className="text-primary hover:underline">kutular</Link>, <Link to="/kartvizit" className="text-primary hover:underline">kartvizitler</Link> ve <Link to="/kataloglar" className="text-primary hover:underline">kataloglar</Link> yer almaktadır. Mavi Basım ile <strong className="text-slate-900">Online Baskı Siparişi</strong> vererek işinizi büyütecek kurumsal basılı tanıtım materyallerine sahip olabilirsiniz.
          </div>
        </div>
 
        <div className="flex flex-col items-center justify-center text-center mb-6 gap-2">
          <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-slate-900">
            <span className="text-primary">Öne Çıkan</span> Ürünler
          </h3>
        </div>
 
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {randomProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Kurumsal & Toptan Teklif Bölümü */}
      <section id="wholesale-corporate" className="bg-slate-50 text-slate-900 py-12 md:py-16 border-t border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full text-center space-y-4 max-w-4xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-primary/20 shadow-sm">
              <Boxes size={16} /> TOPTAN BASKI &amp; KURUMSAL SİPARİŞ MERKEZİ
            </div>
            <h2 className="text-2xl md:text-3.5xl font-black uppercase tracking-tight text-slate-900">
              Kurumsal &amp; Toptan <span className="text-primary">Matbaa Siparişleri</span>
            </h2>
            <p className="text-sm md:text-base text-slate-600 font-semibold leading-relaxed">
              Mavi Basım olarak reklam ajansları, matbaalar, kurumsal şirketler, bayiler ve zincir markalar için yüksek hacimli toptan baskı çözümleri sunuyoruz. İhtiyacınız olan <Link to="/kartvizit" className="text-primary hover:underline font-bold">kurumsal kartvizit</Link>, <Link to="/brosur" className="text-primary hover:underline font-bold">broşür</Link>, <Link to="/kataloglar" className="text-primary hover:underline font-bold">firma kataloğu</Link>, <Link to="/kutu" className="text-primary hover:underline font-bold">karton kutu</Link>, <Link to="/karton-canta" className="text-primary hover:underline font-bold">karton çanta</Link> ve <Link to="/etiket" className="text-primary hover:underline font-bold">etiket</Link> siparişlerinizde Topkapı merkezimizden özel bütçe avantajı sunuyoruz.
            </p>
          </div>

          {/* Kurumsal Avantajlar Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 max-w-7xl mx-auto text-left">
            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black mb-3">
                <Boxes size={20} />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1.5">
                Avantajlı Toptan Fiyatlar
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Şeffaf fiyat politikamız ve yüksek adetli siparişlerinize özel net birim maliyet avantajları.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black mb-3">
                <FileText size={20} />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1.5">
                Baskı Öncesi Prova &amp; Denetim
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Grafik ekibimizce ücretsiz dosya kontrolü ve yüksek hacimli siparişlerde teknik baskı öncesi PDF prova onayı.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black mb-3">
                <Award size={20} />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1.5">
                Anlaşmalı Kurumsal Faturalama
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Sözleşmeli kurumsal müşteriler, bayiler ve ajanslar için düzenli faturalandırma ve cari süreç takibi.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black mb-3">
                <Truck size={20} />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-1.5">
                81 İle Güvenli Lojistik
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Çift oluklu dayanıklı koliler ve koruyucu ambalajlarla Türkiye'nin tüm illerine güvenli ve hızlı sevk imkanı.
              </p>
            </div>
          </div>

          {/* Toptan Sipariş Süreci Adımları */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 max-w-7xl mx-auto shadow-sm text-left mb-8">
            <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight mb-6 text-center md:text-left">
              4 Adımda Kurumsal &amp; Toptan Sipariş Süreci
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase mb-1">Talebinizi İletin</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">Ürün çeşidi, ebat, kağıt gramajı ve adet bilgilerinizi bize ulaştırın.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">2</span>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase mb-1">Özel Fiyat &amp; Prova</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">Toplu alım bütçeniz ve baskı prova belgeniz kısa sürede hazırlansın.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">3</span>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase mb-1">Seri Üretim Aşaması</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">Yazılı onayınızın ardından Topkapı merkezimiz koordinasyonunda seri baskı başlasın.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">4</span>
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase mb-1">Adrese Teslimat</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">Korumalı paketleme ile siparişleriniz kapınıza kadar ulaştırılsın.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Çift Yönlü CTA Alanı */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs md:text-sm uppercase px-8 py-3.5 rounded-xl transition-all shadow-md shadow-[#25D366]/20 hover:scale-105 active:scale-95"
            >
              <WhatsAppIcon size={20} /> WhatsApp ile Toptan Teklif Al
            </a>
            <Link
              to="/iletisim"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs md:text-sm uppercase px-8 py-3.5 rounded-xl transition-all shadow-md"
            >
              <Mail size={18} /> Kurumsal Teklif Formu
            </Link>
          </div>
        </div>
      </section>

      {/* 2026 Güncel Matbaa Fiyatları Link Grid Section */}
      <section className="bg-white py-12 md:py-16 border-t border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-none mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
              DOĞRUDAN ÜRETİCİ FİYATLARI
            </div>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-4">
              2026 GÜNCEL <span className="text-primary">MATBAA FİYATLARI</span> LİSTESİ
            </h2>
            <p className="text-slate-600 font-semibold leading-relaxed text-sm md:text-base max-w-none mx-auto mb-6">
              Mavi Basım Online Matbaa sistemimiz üzerinden güncel toptan fiyat listelerine anında ulaşabilirsiniz. Kurumsal ihtiyaçlarınız için <strong className="text-slate-900">online matbaa fiyatları</strong> ve <strong className="text-slate-900">güncel baskı fiyatları</strong> karşılaştırması yaparak bütçenizi en verimli şekilde yönetin. Aşağıdaki popüler ürün kategorilerimizin üzerine tıklayarak ilgili <strong className="text-primary">kartvizit fiyatları</strong>, <strong className="text-primary">broşür fiyatları</strong> ve ambalaj detaylarını saniyeler içinde inceleyebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                title: "Kartvizit Fiyatları",
                link: "/kartvizit",
                desc: "350 gr kuşe kartvizit, özel kesim, lak ve selefon seçeneklerinin güncel toptan fiyatlarını inceleyin."
              },
              {
                title: "Broşür Fiyatları",
                link: "/brosur",
                desc: "A5 ve A4 tek/çift kırım 130 gr kuşe tanıtım broşürleri için güncel baskı fiyatları listesi."
              },
              {
                title: "El İlanı Fiyatları",
                link: "/el-ilani",
                desc: "90 gr ve 115 gr parlak kuşe ucuz el ilanı siparişleriniz için ekonomik fiyatlandırmalar."
              },
              {
                title: "Katalog Fiyatları",
                link: "/kataloglar",
                desc: "Çok sayfalı kurumsal firma katalogları, dergi ve kitapçıkların adet bazlı imalat maliyetleri."
              },
              {
                title: "Etiket Fiyatları",
                link: "/etiket",
                desc: "Su geçirmez opak, şeffaf ve kraft rulo/tabaka etiketlerin özel kesim toptan fiyatları."
              },
              {
                title: "Magnet Fiyatları",
                link: "/magnet",
                desc: "0.5 mm kalın mıknatıslı, selefonlu, özel kesim reklam magnetleri için güncel fiyat listesi."
              },
              {
                title: "Kutu Fiyatları",
                link: "/kutu",
                desc: "Amerikan Bristol ve mikro kırma lüks karton kutular için avantajlı toptan fiyatlar."
              },
              {
                title: "Karton Çanta Fiyatları",
                link: "/karton-canta",
                desc: "Lüks karton poşetler, ipli ve selefonlu kurumsal karton çanta toptan imalat fiyatları."
              },
              {
                title: "Cepli Dosya Fiyatları",
                link: "/dosyalar",
                desc: "350 gr kuşe ve Amerikan Bristol kurumsal sunum cepli dosyaları için güncel fiyatlar."
              },
              {
                title: "Antetli Kağıt Fiyatları",
                link: "/antetli",
                desc: "80 gr ve 1. hamur logolu antetli kağıtların kurumsal toptan baskı fiyat listesi."
              },
              {
                title: "Diplomat Zarf Fiyatları",
                link: "/zarf",
                desc: "Pencereli ve penceresiz silikonlu diplomat zarf çeşitlerinin güncel toptan fiyatları."
              },
              {
                title: "Bloknot Fiyatları",
                link: "/bloknotlar",
                desc: "Spiralli, tutkallı veya kapaklı kurumsal bloknotların adet bazlı üretim fiyat listesi."
              },
              {
                title: "Makbuz Fiyatları",
                link: "/tahsilat-makbuzu",
                desc: "Otokopili fatura, tahsilat makbuzu ve sevk irsaliyelerinin resmi standartlı fiyatlandırmaları."
              },
              {
                title: "Adisyon Fiyatları",
                link: "/adisyon",
                desc: "Restoran ve kafeler için otokopili veya kendinden karbonlu adisyon fişi üretim fiyatları."
              },
              {
                title: "Amerikan Servis Fiyatları",
                link: "/amerikan-servis",
                desc: "Gıda sektörü için kraft veya kuşe kağıt tek kullanımlık Amerikan servis toptan fiyatları."
              },
              {
                title: "Kitap Ayracı Fiyatları",
                link: "/kitap-ayraci",
                desc: "Özel kesimli, püsküllü veya delikli kurumsal kitap ayraçlarının toptan baskı fiyatları."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <Link 
                    to={item.link} 
                    className="text-sm font-black text-slate-900 hover:text-primary transition-colors uppercase tracking-tight block mb-2"
                  >
                    {item.title} →
                  </Link>
                  <p className="text-slate-500 font-semibold text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Güncel Matbaa Fiyat Listesi Section */}
      <section id="fiyatlar" className="bg-slate-50 py-12 md:py-16 border-t border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-none mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
              GÜNCEL MATBAA FİYAT LİSTESİ
            </div>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-4">
              Güncel <span className="text-primary">Matbaa &amp; Baskı Fiyatları</span> Listesi
            </h2>
            <div className="space-y-4 text-slate-600 font-semibold leading-relaxed text-sm md:text-base max-w-none mx-auto text-left md:text-center">
              <p>
                Mavi Basım platformumuz üzerinden avantajlı <strong className="text-slate-900">matbaa fiyatları</strong> ve kurumsal <strong className="text-slate-900">baskı çözümleri</strong> listelerine doğrudan ulaşabilirsiniz. Şeffaf fiyat politikamız sayesinde kurumsal ihtiyaçlarınız için doğrudan fiyat teklifi alabilir ve siparişinizi oluşturabilirsiniz.
              </p>
              <p className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-xs md:text-sm">
                Geniş ürün yelpazemizde yer alan kurumsal <strong className="text-slate-900">Baskı Ürünleri</strong> için maliyetleri inceleyebilirsiniz: <Link to="/kartvizit" className="text-primary font-black hover:underline">Kartvizit Fiyatları</Link>, <Link to="/brosur" className="text-primary font-black hover:underline">Broşür Fiyatları</Link>, <Link to="/el-ilani" className="text-primary font-black hover:underline">El İlanı Fiyatları</Link>, <Link to="/kataloglar" className="text-primary font-black hover:underline">Katalog Fiyatları</Link>, <Link to="/etiket" className="text-primary font-black hover:underline">Etiket Fiyatları</Link>, <Link to="/magnet" className="text-primary font-black hover:underline">Magnet Fiyatları</Link>, <Link to="/kutu" className="text-primary font-black hover:underline">Kutu Fiyatları</Link>, <Link to="/karton-canta" className="text-primary font-black hover:underline">Karton Çanta Fiyatları</Link>, <Link to="/bloknotlar" className="text-primary font-black hover:underline">Bloknot Fiyatları</Link>, <Link to="/dosyalar" className="text-primary font-black hover:underline">Cepli Dosya Fiyatları</Link>, <Link to="/antetli" className="text-primary font-black hover:underline">Antetli Kağıt Fiyatları</Link>, <Link to="/zarf" className="text-primary font-black hover:underline">Diplomat Zarf Fiyatları</Link> ve <Link to="/amerikan-servis" className="text-primary font-black hover:underline">Amerikan Servis Fiyatları</Link>. İlgili kategorilerden ürün detaylarını inceleyebilir, anında teklif alabilirsiniz.
              </p>
              <p className="text-xs text-slate-500 font-medium italic">
                ℹ️ Not: Fiyatlar; ebat, kağıt türü, gramaj, sipariş adedi ve baskı sonrası özel uygulamalara (selefon kaplama, lokal lak, özel kesim, varak yaldız) göre değişiklik gösterebilir.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden max-w-none">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                    <th className="p-6">Ürün Grubu / Hizmet</th>
                    <th className="p-6">Standart Ölçü</th>
                    <th className="p-6">Popüler Tiraj</th>
                    <th className="p-6">Malzeme &amp; Kağıt Gramajı</th>
                    <th className="p-6">Fiyat Türü</th>
                    <th className="p-6 text-right">Detaylar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                  {[
                    { name: "Kurumsal Kartvizit", size: "8.4x5.2 cm", qty: "1000 Adet", mat: "350g Kuşe / Amerikan Bristol", priceLink: "/kartvizit", label: "Kartvizit Fiyatları" },
                    { name: "Tanıtım Broşürü & El İlanı", size: "A5 (14.8x21 cm)", qty: "1000 Adet", mat: "130g Kuşe, Çift Yön Renkli", priceLink: "/brosur", label: "Broşür Fiyatları" },
                    { name: "Ürün Kataloğu & Dergi", size: "A4 (21x29.7 cm)", qty: "500 Adet", mat: "170g Kuşe, 16 Sayfa, Tel Dikiş", priceLink: "/kataloglar", label: "Katalog Fiyatları" },
                    { name: "Opak & Şeffaf Etiket", size: "Özel Kesim (5x5 cm)", qty: "1000 Adet", mat: "Su Geçirmez PP Opak / Şeffaf", priceLink: "/etiket", label: "Etiket Fiyatları" },
                    { name: "Ambalaj Kutusu", size: "Özel Ebat İmalat", qty: "1000 Adet", mat: "300g Amerikan Bristol / Kroma", priceLink: "/kutu", label: "Kutu Fiyatları" },
                    { name: "Mıknatıslı Magnet", size: "Özel Kesim (5x7 cm)", qty: "1000 Adet", mat: "0.5 mm Kalın Magnet, Selefonlu", priceLink: "/magnet", label: "Magnet Fiyatları" },
                    { name: "Kurumsal Karton Çanta", size: "25x35x8 cm", qty: "500 Adet", mat: "250g Amerikan Bristol, İpli", priceLink: "/karton-canta", label: "Karton Çanta Fiyatları" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-6 font-black text-slate-900">{row.name}</td>
                      <td className="p-6 font-mono text-xs">{row.size}</td>
                      <td className="p-6 font-bold text-primary">{row.qty}</td>
                      <td className="p-6 font-medium text-slate-500 text-xs">{row.mat}</td>
                      <td className="p-6">
                        <span className="inline-flex bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                          2026 GÜNCEL FİYAT
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <Link 
                          to={row.priceLink}
                          className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:text-slate-900 transition-colors border-b-2 border-primary/20 hover:border-slate-900"
                        >
                          {row.label} →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden divide-y divide-slate-100">
              {[
                { name: "Kurumsal Kartvizit", size: "8.4x5.2 cm", qty: "1000 Adet", mat: "350g Kuşe / Amerikan Bristol", priceLink: "/kartvizit", label: "Kartvizit Fiyatları" },
                { name: "Tanıtım Broşürü & El İlanı", size: "A5 (14.8x21 cm)", qty: "1000 Adet", mat: "130g Kuşe, Çift Yön Renkli", priceLink: "/brosur", label: "Broşür Fiyatları" },
                { name: "Ürün Kataloğu & Dergi", size: "A4 (21x29.7 cm)", qty: "500 Adet", mat: "170g Kuşe, 16 Sayfa, Tel Dikiş", priceLink: "/kataloglar", label: "Katalog Fiyatları" },
                { name: "Opak & Şeffaf Etiket", size: "Özel Kesim (5x5 cm)", qty: "1000 Adet", mat: "Su Geçirmez PP Opak / Şeffaf", priceLink: "/etiket", label: "Etiket Fiyatları" },
                { name: "Ambalaj Kutusu", size: "Özel Ebat İmalat", qty: "1000 Adet", mat: "300g Amerikan Bristol / Kroma", priceLink: "/kutu", label: "Kutu Fiyatları" },
                { name: "Mıknatıslı Magnet", size: "Özel Kesim (5x7 cm)", qty: "1000 Adet", mat: "0.5 mm Kalın Magnet, Selefonlu", priceLink: "/magnet", label: "Magnet Fiyatları" },
                { name: "Kurumsal Karton Çanta", size: "25x35x8 cm", qty: "500 Adet", mat: "250g Amerikan Bristol, İpli", priceLink: "/karton-canta", label: "Karton Çanta Fiyatları" }
              ].map((row, idx) => (
                <div key={idx} className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-black text-slate-900 text-sm leading-tight">{row.name}</h3>
                      <p className="text-[11px] text-slate-400 font-bold mt-0.5">{row.size} / {row.qty}</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      2026 GÜNCEL FİYAT
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold">{row.mat}</p>
                  <div className="pt-2 border-t border-slate-50 flex justify-end">
                    <Link 
                      to={row.priceLink}
                      className="text-xs font-black text-primary hover:text-slate-900 transition-colors"
                    >
                      {row.label} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fiyat Bölümü CTA Butonları */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs md:text-sm uppercase px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <span>WhatsApp'tan Fiyat Sor</span>
            </a>
            <Link
              to="/kataloglar"
              className="bg-primary hover:bg-primary/90 text-white font-black text-xs md:text-sm uppercase px-6 py-3.5 rounded-xl transition-all shadow-md"
            >
              Online Sipariş Ver
            </Link>
            <Link
              to="/iletisim"
              className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs md:text-sm uppercase px-6 py-3.5 rounded-xl transition-all shadow-md"
            >
              Hemen Fiyat Teklifi Al
            </Link>
          </div>
          <p className="text-center text-[11px] text-slate-400 font-bold mt-5 uppercase tracking-wide leading-relaxed">
            * Tablodaki tirajlar en sık tercih edilen popüler adetlerdir. Farklı ebat, adet, lak/gofre/yaldız veya özel kağıt istekleri için lütfen WhatsApp destek hattımızdan güncel matbaa fiyat listesi teklifi talep edin.
          </p>
        </div>
      </section>

      {/* İNTERAKTİF TEKNİK BASKI VE ÜRETİM REHBERİ (MODÜLER TABS) */}
      <section id="teknik-rehber" className="bg-white py-12 md:py-16 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
              <BookOpen size={14} /> KAPSAMLI UZMAN REHBERİ
            </div>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-4">
              Matbaa ve Baskı Teknolojileri <span className="text-primary">Uzman Rehberi</span>
            </h2>
            <p className="text-slate-600 font-semibold leading-relaxed text-sm md:text-base">
              Baskı siparişiniz için en doğru kağıt gramajını, makine teknolojisini, ölçü standartlarını ve baskı sonrası işlemleri sekmentlere ayrılmış rehberimizden detaylıca inceleyebilirsiniz.
            </p>

            {/* Tab Control Buttons */}
            <div className="flex flex-wrap justify-center gap-2.5 mt-8">
              {[
                { id: 'tech', label: '⚙️ Baskı Teknolojileri' },
                { id: 'gramaj', label: '📄 Kağıt Gramajları' },
                { id: 'mucellit', label: '✂️ Baskı Sonrası İşlemler' },
                { id: 'ebat', label: '📐 Ölçüler Rehberi' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveGuideTab(tab.id as any)}
                  className={`px-5 py-3 rounded-2xl font-black text-xs md:text-sm uppercase tracking-tight transition-all duration-200 border ${
                    activeGuideTab === tab.id
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content 1: Baskı Teknolojileri */}
          {activeGuideTab === 'tech' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-base font-black text-slate-900 uppercase mb-2 flex items-center gap-2">
                  <Printer className="text-primary" size={20} /> Çok Renkli Ofset Baskı
                </h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-4">
                  Yüksek tirajlı broşür, katalog, cepli dosya ve karton kutularda ekonomik birim maliyeti ve yüksek renk doğruluğu sağlayan ana üretim yöntemidir.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700 font-bold">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> 1.000 adet ve üzeri yüksek tiraj avantajı</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> CMYK ve özel Pantone renk kalibrasyonu</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Tüm kuşe ve karton gramajlarında yüksek hız</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-base font-black text-slate-900 uppercase mb-2 flex items-center gap-2">
                  <Zap className="text-primary" size={20} /> Dijital Ekspres Baskı
                </h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-4">
                  Düşük adetli ve acil teslimat gerektiren kartvizit, davetiye veya numune baskılarında kalıp maliyeti olmadan aynı gün imalat olanağı sunar.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700 font-bold">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Aynı gün teslimat seçeneği</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Düşük adetli kişiselleştirilmiş baskı</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Sıfır kalıp ücreti</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-base font-black text-slate-900 uppercase mb-2 flex items-center gap-2">
                  <Boxes className="text-primary" size={20} /> Flexo Rulo Etiket Baskı
                </h3>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed mb-4">
                  Gıda, kozmetik ve e-ticaret ambalajları için suya, yağa ve ısıya dayanıklı PP opak ve şeffaf yapışkanlı rulo etiket imalat teknolojisi.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700 font-bold">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Otomatik etiketleme makinelerine uyumlu rulo</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Suya ve neme dayanıklı yırtılmaz malzeme</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Şeffaf, gümüş ve şık mat görünüm</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab Content 2: Kağıt Gramajları */}
          {activeGuideTab === 'gramaj' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fadeIn">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <span className="text-primary font-mono font-black text-xl block mb-1">115g - 130g</span>
                <h4 className="font-black text-slate-900 uppercase text-xs mb-2">Hafif Kuşe Kağıt</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Broşür, el ilanı, insört ve gazete ekleri için en ekonomik hafif gramaj seçeneğidir. Dağıtım kolaylığı sağlar.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <span className="text-primary font-mono font-black text-xl block mb-1">170g - 250g</span>
                <h4 className="font-black text-slate-900 uppercase text-xs mb-2">Orta Tok Gramaj</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Katalog iç sayfaları, kurumsal sunum föyleri, menüler ve şık broşür kapaklarında tercih edilen kaliteli kağıttır.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <span className="text-primary font-mono font-black text-xl block mb-1">300g - 350g</span>
                <h4 className="font-black text-slate-900 uppercase text-xs mb-2">Amerikan Bristol &amp; Kuşe</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Kartvizitler, karton çantalar, cepli sunum dosyaları ve ambalaj kutuları için yüksek sertlik ve mukavemet sunar.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <span className="text-primary font-mono font-black text-xl block mb-1">400g+</span>
                <h4 className="font-black text-slate-900 uppercase text-xs mb-2">Lüks Sıvama &amp; Sert Mukavva</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Kabartma laklı lüks kartvizitler, hediye kutuları ve sert kapak katalog ciltleri için premium sert yapı.
                </p>
              </div>
            </div>
          )}

          {/* Tab Content 3: Baskı Sonrası */}
          {activeGuideTab === 'mucellit' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h4 className="font-black text-slate-900 uppercase text-sm mb-2 flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={18} /> Mat &amp; Parlak Selefon
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Kağıt yüzeyini nem, yırtılma ve aşınmaya karşı koruyan estetik koruyucu lüks kaplama türü.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h4 className="font-black text-slate-900 uppercase text-sm mb-2 flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={18} /> Varak Yaldız &amp; Kabartma Lak
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Logolarda veya özel metinlerde dikkat çekici parlaklık ve dokunsal his oluşturan altın/gümüş varak yaldız uygulamaları.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h4 className="font-black text-slate-900 uppercase text-sm mb-2 flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={18} /> Kırım, Cilt &amp; Perforaj
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Broşür katlama (akordeon/tekli), Amerikan sıcak tutkal cilt, tel dikiş ve koparılabilir tırtıklı perforaj işlemleri.
                </p>
              </div>
            </div>
          )}

          {/* Tab Content 4: Ölçüler Rehberi */}
          {activeGuideTab === 'ebat' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <h4 className="font-black text-slate-900 uppercase text-xs mb-2">Broşür &amp; El İlanı</h4>
                <ul className="text-xs text-slate-600 space-y-1 font-semibold">
                  <li>• A5 (14.8x21 cm) - En Popüler</li>
                  <li>• A4 (21x29.7 cm) - Katlamalı</li>
                  <li>• A3 (29.7x42 cm) - Afiş/Poster</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <h4 className="font-black text-slate-900 uppercase text-xs mb-2">Kurumsal Evraklar</h4>
                <ul className="text-xs text-slate-600 space-y-1 font-semibold">
                  <li>• Kartvizit (8.4x5.2 cm)</li>
                  <li>• Diplomat Zarf (10.5x24 cm)</li>
                  <li>• Antetli Kağıt (A4 21x29.7 cm)</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <h4 className="font-black text-slate-900 uppercase text-xs mb-2">Otokopili Formlar</h4>
                <ul className="text-xs text-slate-600 space-y-1 font-semibold">
                  <li>• Tam Boy Form (20.5x28.5 cm)</li>
                  <li>• Yarım Boy Makbuz (14x20 cm)</li>
                  <li>• Küçük Fiş (10x14 cm)</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <h4 className="font-black text-slate-900 uppercase text-xs mb-2">Ambalaj &amp; Çanta</h4>
                <ul className="text-xs text-slate-600 space-y-1 font-semibold">
                  <li>• Küçük Çanta (16x25x6 cm)</li>
                  <li>• Orta Çanta (25x37x8 cm)</li>
                  <li>• Özel Kutu Ebatlamaları</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="products" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col items-center justify-center text-center mb-8 md:mb-12 gap-4">
          <div className="w-full text-center">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900">
              <span className="text-primary">Matbaa Hizmetlerimiz</span>
              <span className="mx-3 text-slate-300 font-light">&amp;</span>
              <span>Matbaa Ürünleri</span>
            </h2>
          </div>
        </div>

        <CategoryList />
      </section>

      {/* Hangi Baskıları Yapıyoruz? Section */}
      <section className="bg-white py-12 md:py-16 border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-4">
              Hangi <span className="text-primary">Baskıları</span> Yapıyoruz?
            </h2>
            <p className="text-slate-600 font-semibold leading-relaxed text-sm md:text-base">
              Mavi Basım olarak son teknoloji ofset ve dijital makine parkurumuzla kurumsal tanıtım ürünlerinden butik ambalaj kutularına kadar geniş bir yelpazede baskı hizmeti veriyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Kurumsal Tanıtım Materyalleri",
                desc: "Şirketinizin profesyonel yüzünü yansıtacak kartvizit, broşür, magnet, katalog, afiş, antetli kağıt, cepli dosya ve zarf baskı çözümleri.",
                items: ["Prestijli Kartvizitler", "Tanıtım Broşürleri", "Çok Sayfalı Kataloglar", "Kurumsal Bloknotlar"]
              },
              {
                title: "Kutu & Ambalaj Çözümleri",
                desc: "Ürünlerinize değer katacak özel ölçülü Amerikan Bristol kutular, kromo karton ambalajlar, karton çantalar ve kendinden yapışkanlı rulo/tabaka etiketler.",
                items: ["Gıda ve Pizza Kutuları", "Lüks Karton Çantalar", "PP Opak ve Şeffaf Etiketler", "Özel Üretim Ambalajlar"]
              },
              {
                title: "Sektörel Matbuu Formlar",
                desc: "İşletmenizin operasyonel iş akışını düzenleyen otokopili tahsilat makbuzları, sipariş fişleri, adisyonlar, Amerikan servisler ve oto paspasları.",
                items: ["Otokopili Sipariş Fişi", "Tediye & Para Makbuzu", "Kağıt Amerikan Servisler", "Oto Paspas & Yağ Kartları"]
              }
            ].map((cat, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-3xl relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="absolute top-0 left-0 w-1.5 bg-primary h-full" />
                <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed mb-6">
                  {cat.desc}
                </p>
                <ul className="space-y-2">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24 border-y border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-black mb-6 uppercase tracking-tight">
                Türkiye Geneli <span className="text-primary">Profesyonel Matbaa</span> Hizmetleri
              </h2>
              <div className="space-y-4 text-black/70 font-medium leading-relaxed text-base md:text-lg">
                <p>
                  <strong>Mavi Basım Matbaa & Reklam</strong> İstanbul Zeytinburnu Topkapı 2. Matbaacılar Sitesi’nde faaliyet gösteren profesyonel bir matbaa ve reklam üretim merkezidir.
                </p>
                <p>
                  Kartvizit baskı, broşür baskı, el ilanı baskı, afiş baskı, katalog baskı, magnet baskı, bloknot baskı, karton çanta baskı, etiket baskı ve ambalaj baskı hizmetleri sunmaktayız.
                </p>
                <p>
                  İstanbul’da bulunan üretim merkezimizden Türkiye’nin tüm illerine hızlı üretim ve kargo ile matbaa hizmeti vermekteyiz.
                </p>
                <div className="pt-4 flex items-center gap-3 text-primary font-bold">
                  <MapPin size={20} />
                  <span className="text-sm md:text-base">Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB Zeytinburnu / İstanbul adresindeki üretim merkezimiz ile hizmetinizdeyiz.</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-primary/5 border border-primary/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Truck className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-black text-black mb-4 uppercase tracking-tight">Kargo Bilgisi</h3>
                <div className="space-y-4 text-black/70 font-medium leading-relaxed">
                  <p>
                    <strong>Mavi Basım Matbaa & Reklam</strong> olarak Türkiye’nin tüm illerine kargo ile matbaa ürünleri gönderiyoruz.
                  </p>
                  <p>
                    Kartvizit, broşür, magnet, katalog, etiket ve diğer baskı ürünleriniz güvenli şekilde adresinize teslim edilir.
                  </p>
                  <p className="font-bold text-primary">
                    Türkiye geneline hızlı üretim ve güvenli kargo ile matbaa hizmeti sunmaktayız.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Türkiye Geneli Matbaa Hizmetleri Section */}
      <CityLinksSection />

      {/* Sipariş Süreci Section */}
      <section className="bg-slate-50 py-16 md:py-24 border-t border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-none mb-12">
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-4">
              5 Adımda Kolay <span className="text-primary">Online Matbaa Siparişi</span> Nasıl Verilir?
            </h2>
            <p className="text-slate-600 font-semibold leading-relaxed text-sm md:text-base max-w-none">
              Mavi Basım <strong className="text-slate-900">Online Matbaa</strong> sistemiyle, dükkanınızdan veya ofisinizden çıkmadan, sadece 5 kolay adımda profesyonel <strong className="text-slate-900">Online Matbaa Siparişi</strong> verebilir ve <strong className="text-slate-900">Online Baskı Siparişi</strong> sürecinizi hemen başlatabilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 relative">
            {[
              {
                step: "01",
                icon: <PhoneCall className="text-primary" size={24} />,
                title: "Talebinizi İletin",
                desc: "WhatsApp, telefon veya e-posta yoluyla istediğiniz ürün, ölçü ve adet detaylarını ekibimize iletin."
              },
              {
                step: "02",
                icon: <Coins className="text-primary" size={24} />,
                title: "Fiyat Teklifi Alın",
                desc: "Talebinize göre en avantajlı, aracısız net imalat fiyat teklifini dakikalar içinde hazırlayalım."
              },
              {
                step: "03",
                icon: <FileText className="text-primary" size={24} />,
                title: "Tasarım & Prova",
                desc: "Gönderdiğiniz tasarımları inceliyor, baskı standartlarına uygun PDF prova dosyasıyla onayınızı alıyoruz."
              },
              {
                step: "04",
                icon: <Printer className="text-primary" size={24} />,
                title: "Aracısız Üretim",
                desc: "Onayınızın ardından siparişiniz modern ofset ve dijital baskı parkurlarımızda sıfır hata hedefiyle basılır."
              },
              {
                step: "05",
                icon: <Truck className="text-primary" size={24} />,
                title: "Paketleme & Kargo",
                desc: "Baskısı biten ürünler koruyucu kalın kolilerle paketlenir, Türkiye genelindeki adresinize sigortalı sevk edilir."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-6 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="absolute top-4 right-6 text-3xl font-black text-slate-100 font-mono select-none">
                  {item.step}
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hangi Sektörlere Hizmet Veriyoruz? Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-4">
              Hangi Sektörlere <span className="text-primary">Hizmet Veriyoruz</span>?
            </h2>
            <p className="text-slate-600 font-semibold leading-relaxed text-sm md:text-base">
              Farklı sektörlerin dinamiklerine ve yasal gereksinimlerine uygun özel baskı, etiket ve ambalaj çözümleri geliştiriyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Restoran & Catering",
                desc: "Islak mendiller, Amerikan servisler, hamburger ve pizza kutuları, adisyon koçanları ve kurye paket etiketleri.",
                link: "/sektor/restoran-brosur-baski"
              },
              {
                title: "Kuaför & Güzellik Salonları",
                desc: "Kuaför, berber ve güzellik salonları için kartvizit, randevu kartı, broşür, fiyat listesi ve etiket baskı çözümleri.",
                link: "/sektor/kuafor-kartvizit-baski"
              },
              {
                title: "E-Ticaret & Perakende",
                desc: "Kargo kolileri, yapışkanlı rulo barkod etiketleri, kraft çantalar, fatura formları ve marka teşekkür kartları.",
                link: "/sektor/e-ticaret-perakende-baski"
              },
              {
                title: "Güzellik Merkezleri & Kozmetik",
                desc: "Parfüm kutusu, seans takip formu, randevu kartı, broşür, kozmetik etiketi ve karton çanta baskı çözümleri.",
                link: "/sektor/kozmetik-guzellik-merkezi-baski"
              },
              {
                title: "Eğitim Kurumları",
                desc: "Deneme kitapçığı, fasikül, kayıt evrakları ve eğitim yayınları.",
                link: "/sektor/egitim-kurumlari-baski"
              },
              {
                title: "Kutu & Ambalaj Çözümleri",
                desc: "300–400 gr Bristol, kraft ve kuşe ambalaj kâğıdı ile ilaç, parfüm, fast-food, tatlı ve özel ambalaj kutuları.",
                link: "/sektor/kutu-ambalaj-baski-cozumleri"
              }
            ].map((sector, idx) => (
              sector.link ? (
                <Link key={idx} to={sector.link} className="bg-slate-50 border border-slate-100 hover:border-primary/40 p-6 rounded-2xl hover:bg-slate-100/50 transition-all duration-300 flex flex-col group">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-1.5 h-6 bg-primary rounded-full shrink-0 group-hover:bg-black transition-colors" />
                    <h3 className="text-base md:text-lg font-black text-slate-900 group-hover:text-primary transition-colors uppercase tracking-tight">
                      {sector.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed">
                    {sector.desc}
                  </p>
                </Link>
              ) : (
                <div key={idx} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:bg-slate-100/50 transition-colors duration-300 flex flex-col">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className="w-1.5 h-6 bg-primary rounded-full shrink-0" />
                    <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight">
                      {sector.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed">
                    {sector.desc}
                  </p>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Matbaa Rehberi – Son Blog Yazıları Section */}
      <section className="bg-white py-16 md:py-24 border-t border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-6xl mx-auto md:max-w-7xl mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
              <BookOpen size={14} /> MATBAA REHBERİ
            </div>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-4">
              Matbaa Rehberi – <span className="text-primary">Faydalı Bilgiler &amp; İpuçları</span>
            </h2>
            <p className="text-slate-600 font-semibold leading-relaxed text-sm md:text-base max-w-none">
              Baskı kalitenizi artırmak, tasarım bütçenizi korumak ve doğru teknik özellikler seçmek için hazırladığımız güncel rehber yazılarımızı okuyun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Card 1 */}
            <div className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-3xl hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-primary font-black font-mono tracking-widest uppercase bg-primary/10 px-2.5 py-1 rounded-full">BİLGİ REHBERİ</span>
                <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight mt-4 mb-3">
                  Online Matbaa Nedir &amp; Nasıl Çalışır?
                </h3>
                <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed mb-4">
                  İnternetten 7/24 kesintisiz kurumsal baskı siparişi vermenin, dosya yükleme ve dijital prova kontrolü süreçlerinin detayları. <strong className="text-slate-900">Online Matbaa Nedir?</strong> ve geleneksel matbaacılıktan farkları nelerdir, tüm detaylarıyla keşfedin.
                </p>
              </div>
              <Link to="/brosur" className="text-xs font-black text-primary hover:text-secondary uppercase tracking-wider flex items-center gap-1 mt-auto">
                Yazıyı Oku <span>→</span>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-3xl hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-primary font-black font-mono tracking-widest uppercase bg-primary/10 px-2.5 py-1 rounded-full">SİPARİŞ REHBERİ</span>
                <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight mt-4 mb-3">
                  Online Matbaa Siparişi Nasıl Verilir?
                </h3>
                <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed mb-4">
                  Ofisinizden çıkmadan kartvizit, broşür, katalog veya kutu imalatı siparişlerinizi vermenin yolları. <strong className="text-slate-900">Online Matbaa Siparişi Nasıl Verilir?</strong> ve basım onayına kadar geçen dijital prova süreçleri hakkında ipuçları.
                </p>
              </div>
              <Link to="/brosur" className="text-xs font-black text-primary hover:text-secondary uppercase tracking-wider flex items-center gap-1 mt-auto">
                Yazıyı Oku <span>→</span>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-3xl hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-primary font-black font-mono tracking-widest uppercase bg-primary/10 px-2.5 py-1 rounded-full">BÜTÇE &amp; SEÇİM</span>
                <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight mt-4 mb-3">
                  Online Matbaa mı Yerel Matbaa mı?
                </h3>
                <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed mb-4">
                  Fiziki olarak matbaa aramaktansa internet üzerinden sipariş vermenin bütçe ve zaman kazançları. <strong className="text-slate-900">Online Matbaa mı Yerel Matbaa mı?</strong> sorusuna yanıt arıyor, imalatçı hızı ve <strong className="text-slate-900">Online Baskı Avantajları</strong> değerlendirmesi yapıyoruz.
                </p>
              </div>
              <Link to="/brosur" className="text-xs font-black text-primary hover:text-secondary uppercase tracking-wider flex items-center gap-1 mt-auto">
                Yazıyı Oku <span>→</span>
              </Link>
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
              <Link to="/brosur" className="text-xs font-black text-primary hover:text-secondary uppercase tracking-wider flex items-center gap-1 mt-auto">
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
              <Link to="/brosur" className="text-xs font-black text-primary hover:text-secondary uppercase tracking-wider flex items-center gap-1 mt-auto">
                Yazıyı Oku <span>→</span>
              </Link>
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
              <Link to="/brosur" className="text-xs font-black text-primary hover:text-secondary uppercase tracking-wider flex items-center gap-1 mt-auto">
                Yazıyı Oku <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Neden Online Matbaa? Section */}
      <section className="bg-slate-50 py-16 md:py-24 border-t border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[2rem] shadow-xl relative overflow-hidden">
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
              HIZLI ERİŞİM &amp; İÇ LİNKLEME MERKEZİ
            </div>
            <h2 className="text-2xl md:text-3.5xl font-black text-white uppercase tracking-tight mb-4">
              En Çok Aranan <span className="text-[#00E5FF]">Matbaa Ürünleri</span>
            </h2>
            <p className="text-slate-300 font-medium leading-relaxed text-xs md:text-sm max-w-4xl mx-auto">
              Mavi Basım, işletmeniz için en kaliteli <strong className="text-white">Matbaa Ürünleri</strong> sunan Türkiye'nin lider <strong className="text-[#00E5FF]">Online Matbaa</strong> ve <strong className="text-[#00E5FF]">Online Baskı</strong> merkezidir. İhtiyacınıza özel bütçe dostu <strong className="text-white">Matbaa Fiyatları</strong> ile profesyonel <strong className="text-white">Baskı Hizmetleri</strong> alabilir, hızlı online siparişinizi güvenle verebilirsiniz.
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
                <Link to="/kataloglar" className="text-[#00E5FF] hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40 font-black">
                  <span>Matbaa Fiyatları</span> <span className="text-[10px] text-[#00E5FF]">★</span>
                </Link>
                <Link to="/brosur" className="text-[#00E5FF] hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 border-b border-slate-700/40 font-black">
                  <span>Online Matbaa</span> <span className="text-[10px] text-[#00E5FF]">★</span>
                </Link>
                <Link to="/kartvizit" className="text-[#00E5FF] hover:text-white hover:translate-x-1 transition-all flex items-center justify-between py-1 font-black">
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
                to="/kataloglar"
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
    paper: "230 gr, 250 gr. Amerikan Bristol Karton, Kraft ve Esmer Ambalaj Kağıtları.",
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
    role: "Zarf Üreticisi",
    authority: "Zarf üretimi yüksek hızlı otomatik makinelerimizde yapılmaktadır.",
    process: "1. Hamur bobin veya tabaka kağıtlar otomatik zarf makinelerinde kesilir, pencereli modellerde asetat yapıştırılır ve kapaklarına silikon yapışkan şerit bant uygulanır.",
    machines: "Otomatik Zarf Katlama ve Yapıştırma Makineleri, Silikon Bant Sürme Hatları, Pencere Asetat Yapıştırma Üniteleri.",
    paper: "90 gr, 110 gr, 120 gr. Birinci Sınıf Hamur Kağıtlar, Esmer Kraft Kağıdı.",
    postPress: "İç Görünmez Güvenlik Deseni Baskısı, Pencereli/Penceresiz Kesim, Silikonlu Yapışkan Şerit Uygulaması, Kutulama."
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
            İstanbul Topkapı Tesisimizden <span className="text-[#00E5FF]">{spec.role}</span> Hizmeti
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
              <img src="/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
              HEMEN TEKLİF AL
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

// MagnetPage is imported from ./components/Magnet.tsx












export const AppRoutes = () => {
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
      <Route path="/kartvizit" element={<KartvizitPage />} />
      <Route path="/brosur" element={<BrosurPage />} />
      <Route path="/el-ilani" element={<ElIlaniPage />} />
      <Route path="/afis" element={<AfisPage />} />
      <Route path="/antetli" element={<AntetliPage />} />
      <Route path="/dosyalar" element={<DosyalarPage />} />
      <Route path="/etiket" element={<EtiketPage />} />
      <Route path="/oto-paspas" element={<OtoPaspasPage />} />
      <Route path="/kup-bloknot" element={<KupBloknotPage />} />
      <Route path="/magnet" element={<MagnetPage />} />
      <Route path="/kitap-ayraci" element={<KitapAyraciPage />} />
      <Route path="/yag-karti" element={<YagKartiPage />} />
      <Route path="/bloknotlar" element={<BloknotlarPage />} />
      <Route path="/bloknot" element={<Navigate to="/bloknotlar" replace />} />
      <Route path="/amerikan-servis" element={<AmerikanServisPage />} />
      <Route path="/karton-canta" element={<KartonCantaPage />} />
      <Route path="/zarf" element={<ZarfPage />} />
      <Route path="/kataloglar" element={<KatalogPage />} />
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
      <Route path="/tediye-makbuzu" element={<MakbuzFormlarPage />} />
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
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPage />} />
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
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;

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

    if (pathname !== '/' && !pathname.startsWith('/blog')) {
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

export default function App() {
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
        <BrowserRouter>
          <ScrollToTop />
          <CanonicalLink />
          <SEOMetadataManager />
          <div className="min-h-screen bg-[#f8fafc] font-sans text-secondary flex flex-col">
            <Navbar />
            
            <main className="flex-grow">
              <AppRoutes />
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
        </BrowserRouter>
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
