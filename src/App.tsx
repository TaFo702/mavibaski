/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
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
  Lock
} from 'lucide-react';
import Fuse from 'fuse.js';
import ReactMarkdown from 'react-markdown';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { PRODUCT_DESCRIPTIONS } from './constants/productTexts';
import { SikcaSorulanPage } from './components/FAQ';
import { HakkimizdaPage } from './components/About';
import { MatbaaPage } from './components/Matbaa';
import { GrafikTasarimPage } from './components/GrafikTasarim';
import { ReferanslarPage } from './components/References';
import { IletisimPage } from './components/Contact';
import { HeaderActions, useProductSearch } from './components/HeaderActions';

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

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

import { LOCAL_ASSETS } from './constants/assets';

// --- Constants ---
const getImageUrl = (key: string, defaultUrl: string) => {
  return LOCAL_ASSETS[key] || defaultUrl;
};

const sortedBannerUrls = ["/b1.webp", "/b2.webp", "/b3.webp", "/b4.webp", "/b5.webp"];

import { KartvizitPage } from './components/Kartvizit';
import { BrosurPage } from './components/Brosur';
import { KatalogPage } from './components/Katalog';
import { MakbuzFormlarPage, GenericPriceTablePage, CILT_ISLERI_DATA } from './components/Makbuz';
import { KitapAyraciPage, YagKartiPage } from './components/ReklamUrunleri';
import ZarfPage from './components/Zarf';
import { KartonCantaPage, KARTON_CANTA_DATA } from './components/KartonCanta';
import { KupBloknotPage, KUP_BLOKNOT_DATA } from './components/KupBloknot';
import { BloknotlarPage, BLOKNOTLAR_DATA } from './components/Bloknotlar';
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

export const FireWarning = () => (
  <div className="mt-6 text-center">
    <p className="text-red-600 font-black text-sm md:text-base uppercase tracking-tight">
      Lütfen Dikkat : Siparişlerinizin Renk, Adet ve Ölçülerinde %1 ila %5 Arasında Fire Olabilmektedir.
    </p>
  </div>
);

export const AgencyDiscountCTA = () => (
  <section className="bg-black rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl mt-20">
    <div className="absolute top-0 right-0 w-96 h-96 bg-[#29abe2]/10 rounded-full -mr-48 -mt-48 blur-3xl opacity-50" />
    <div className="relative z-10">
      <h2 className="text-2xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
        MATBAA VE REKLAM AJANSLARINA ÖZEL İNDİRİM!
      </h2>
      <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto font-medium">
        Ajanslara özel indirimli fiyatlarımız ve öncelikli üretim avantajlarımız için hemen iletişime geçin. Toptan siparişlerde ekstra avantajlar!
      </p>
      <button 
        onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Merhaba, ajans kaydı başlatmak ve özel fiyatlar hakkında bilgi almak istiyorum.`, '_blank')}
        className="inline-flex items-center gap-3 bg-[#29abe2] text-white px-10 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 shadow-xl uppercase tracking-tight"
      >
        <Zap size={24} fill="currentColor" />
        AJANS KAYDI BAŞLAT
      </button>
    </div>
  </section>
);

const calculateDiscount = (quantity: number, category: string) => {
  const excludedCategories = [
    "Kataloglar", "Makbuz", "Ambalaj", "Kutu", "Zarf", "Form", 
    "Fiş", "Bilet", "Reçete", "Senet", "Poliçe", "Sözleşme", "Adisyon", "Kiralama", "Oto Paspas", "Amerikan Servis", "Antetli Kağıt", "Dosya"
  ];

  if (excludedCategories.some(cat => category.toLowerCase().includes(cat.toLowerCase()))) {
    return 0;
  }

  // Uniform discount structure for all other products (including Magnet)
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
  return restrictedCategories.some(cat => category.toUpperCase().includes(cat)) || 
         description.toUpperCase().includes("CİLT");
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
    const discount = calculateDiscount(item.quantity, item.category);
    const discountedPrice = item.basePrice * (item.quantity / item.baseQuantity) * (1 - discount);
    return acc + discountedPrice;
  }, 0);

  const sendOrder = () => {
    let message = "Merhaba Sipariş vermek istiyorum\n\n";
    cart.forEach((item, idx) => {
      const discount = calculateDiscount(item.quantity, item.category);
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
              const discount = calculateDiscount(item.quantity, item.category);
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
  
  useEffect(() => {
    if (product) {
      const baseQty = product.miktar ? parseInt(product.miktar.replace(/[^\d]/g, '')) : 1000;
      setQuantity(baseQty);
      setColorCount(1);
      setShowSuccess(false);
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const basePrice = parsePrice(product.price);
  const extraPrice = product.extraPrice ? parsePrice(product.extraPrice) : null;
  const baseQuantity = product.miktar ? parseInt(product.miktar.replace(/[^\d]/g, '')) : 1000;
  
  const calculateTotalPrice = (q: number) => {
    let price = 0;
    if (product.availableOptions) {
      const optIdx = product.availableOptions.findIndex((opt: any) => parseInt(opt.miktar.replace(/[^\d]/g, '')) === q);
      const option = product.availableOptions[optIdx];
      if (option) {
        price = option.price;
        if (colorCount > 1 && product.colorDiffValues) {
          price += product.colorDiffValues[optIdx] * (colorCount - 1);
        }
        return price;
      }
    }
    const d = calculateDiscount(q, category);
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

    if (product.availableOptions) {
      const optIdx = product.availableOptions.findIndex((opt: any) => parseInt(opt.miktar.replace(/[^\d]/g, '')) === quantity);
      if (optIdx !== -1) {
        effectiveBasePrice = product.availableOptions[optIdx].price;
        if (colorCount > 1 && product.colorDiffValues) {
          effectiveBasePrice += product.colorDiffValues[optIdx] * (colorCount - 1);
        }
        effectiveBaseQuantity = quantity; // Set baseQuantity to current quantity for restricted products
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
    if (isRestrictedQuantityProduct(category, product.miktar || product.desc)) return;
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
              {["Kataloglar", "Makbuz", "Ambalaj", "Kutu", "Zarf", "Form", "Fiş", "Bilet", "Reçete", "Senet", "Poliçe", "Sözleşme", "Adisyon", "Kiralama", "Antetli Kağıt", "Dosya"].some(cat => category.toLowerCase().includes(cat.toLowerCase())) ? (
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
                    const d = calculateDiscount(q, category);
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
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    {product.availableOptions ? "Adet Seçimi (Fiyat Listesi)" : "Adet Seçimi"}
                  </label>
                  
                  {product.availableOptions ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
                      {product.availableOptions.map((opt: any, idx: number) => {
                        const optQty = parseInt(opt.miktar.replace(/[^\d]/g, ''));
                        return (
                          <button
                            key={idx}
                            onClick={() => setQuantity(optQty)}
                            className={`py-3 px-2 rounded-xl border-2 font-black text-xs transition-all ${
                              quantity === optQty 
                              ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                              : 'bg-white border-gray-100 text-black hover:border-primary/30'
                            }`}
                          >
                            <div className="flex flex-col">
                              <span>{opt.miktar}</span>
                              <span className={`text-[9px] font-bold ${quantity === optQty ? 'text-white/70' : 'text-primary'}`}>
                                {opt.price.toLocaleString('tr-TR')} ₺
                              </span>
                            </div>
                          </button>
                        );
                      })}
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
                          className={`py-3 rounded-xl border-2 font-black text-xs transition-all ${
                            colorCount === num 
                            ? 'bg-secondary border-secondary text-white shadow-lg shadow-secondary/20' 
                            : 'bg-white border-gray-100 text-black hover:border-primary/30'
                          }`}
                        >
                          {num} RENK
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2 pt-2 border-t border-gray-50">
                  {["Makbuz", "Form", "Fiş", "Bilet", "Reçete", "Senet", "Poliçe", "Sözleşme", "Adisyon", "Kiralama"].some(cat => category.toLowerCase().includes(cat.toLowerCase())) && (
                    <div className="text-right mb-2">
                      <span className="text-primary text-lg font-medium uppercase tracking-widest">
                        Numaratörlü
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-gray-400">Seçilen Adet:</span>
                    <span className="font-black text-gray-700">{quantity.toLocaleString('tr-TR')} Adet</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-gray-400">Birim Fiyat:</span>
                    <span className="font-black text-gray-700">{(totalPrice / quantity).toLocaleString('tr-TR', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} ₺</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-gray-400">Toplam Tutar:</span>
                    <span className="font-black text-gray-700">{formatPrice(totalPrice)}</span>
                  </div>
                  
                  {quantity >= 7000 && quantity < 10000 && !["Kataloglar", "Makbuz", "Ambalaj", "Kutu", "Zarf", "Form", "Fiş", "Bilet", "Reçete", "Senet", "Poliçe", "Sözleşme", "Adisyon", "Kiralama"].some(cat => category.toLowerCase().includes(cat.toLowerCase())) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl text-[11px] font-bold text-amber-800 leading-tight"
                    >
                      Sadece {formatPrice(Math.max(0, (basePrice * (10000 / baseQuantity) * (1 - calculateDiscount(10000, category))) - totalPrice))} daha ödeyerek 10.000 adet alabilirsiniz, bu sizin için çok daha kârlı!
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

export const PRODUCT_FEATURES_INFO: Record<string, string> = {
  "NK": "Tek taraflı, arkası baskısızdır. Mürekkebi emen dokusu sayesinde arka yüzüne kalemle yazı yazılabilir. Ekonomik ve ince bir seçenektir. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "NKA": "Arkası tek renk siyah baskılıdır. Kuyumcu, restoran ve kaşe kullananlar için idealdir; arkasına rahatça not alınabilir. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "MNA": "İlaç kutusu sertliğinde, orta kalınlıktadır. Mat yüzeyiyle şıktır; mühür ve randevu notu için uygundur. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "CYM": "350 gr. Kuşe - Çift Yön Renkli Mat Selefonlu. Dergi kapağı kalınlığındadır. Üzerine yazı yazılabilir (3-4 sn. kuruma süresi gerekir). Kağıt kalınlığını anlamanız için; tek parmağınızla bile bükebilirsiniz.",
  "CYP": "Dergi kapağı kalınlığında, parlak ve canlıdır. Selefon kaplı olduğu için kalemle yazı yazmaya uygun değildir. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "KODCYP": "Dergi kapağı kalınlığında, parlak ve canlıdır. Selefon kaplı olduğu için kalemle yazı yazmaya uygun değildir. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "KODCYM": "350 gr. Kuşe - Çift Yön Renkli Mat Selefonlu. Dergi kapağı kalınlığındadır. Üzerine yazı yazılabilir (3-4 sn. kuruma süresi gerekir). Kağıt kalınlığını anlamanız için; tek parmağınızla bile bükebilirsiniz.",
  "KODSEK": "700 gr. Çok sert ve kalın (iki kağıdın birleşimi). En popüler prestij ürünümüzdür; köşeleri ovaldir ve çift yönlü kabartma laklıdır. Çok sert bir yapıdadır; parmağınızla zor bükülür ve katlanır.",
  "SEK": "700 gr. Çok sert ve kalın (iki kağıdın birleşimi). En popüler prestij ürünümüzdür; köşeleri ovaldir ve çift yönlü kabartma laklıdır. Çok sert bir yapıdadır; parmağınızla zor bükülür ve katlanır.",
  "KL": "Mat yüzeyli, orta kalınlıkta. Seçilen bölgeler kabartma lak sayesinde ışıkta parlar ve dokunulduğunda yükseklik hissi verir.",
  "LAKKL": "Mat yüzeyli, orta kalınlıkta. Seçilen bölgeler kabartma lak sayesinde ışıkta parlar ve dokunulduğunda yükseklik hissi verir. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "CYML4": "400 gr. Kuşe - Çift Yön Renkli Mat Selefonlu Laklı. Kalın bir karttır. Mat yüzey üzerinde Lak seçili alanların, resimlerin ve yazıların üstü parlar. Kalemle yazı yazılırsa 3-4 sn. kuruması beklenmelidir. Ortalamanın üstü bir kalınlıktadır.",
  "O-COK": "Modern oval (yuvarlak) köşelidir. Kabartma lak ile derinlik kazandırılmış, şık ve ekonomik bir prestij ürünüdür. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "S-COK": "Standart kalıpların dışında özel formda (aşçı, otomobil vb.) kesilebilir. Kabartma laklı, görsel kalitesi yüksek bir üründür. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "O-SEK": "700 gr. Çok sert ve kalın (iki kağıdın birleşimi). En popüler prestij ürünümüzdür; köşeleri ovaldir ve çift yönlü kabartma laklıdır. Çok sert bir yapıdadır; parmağınızla zor bükülür ve katlanır.",
  "S-SEK": "700 gr. Oldukça sert ve dayanıklıdır. İstediğiniz forma göre özel kesim yapılır; çift yönlü kabartma lak ile yüksek prestij sağlar. Çok sert bir yapıdadır; parmağınızla zor bükülür ve katlanır.",
  "A-SEK": "Maksimum sertliktedir. Ön yüzde Altın Yaldız ve Kabartma Lak, arka yüzde sadece Kabartma Lak bulunur. Özel kesimlidir. Çok sert bir yapıdadır; parmağınızla zor bükülür ve katlanır.",
  "AC-SEK": "En üst segment. Çift taraflı Altın Yaldız ve Kabartma Lak uygulanabilir. Özel kesimi ve kalınlığıyla markanızın ağırlığını yansıtır. Çok sert bir yapıdadır; parmağınızla zor bükülür ve katlanır.",
  "TANK": "800 gr. Bristol Sıvama - Mat Selefonlu Kabartma Laklı. Koleksiyonumuzun en kalın ve sert kartıdır. Çok sert bir yapıdadır; parmağınızla zor bükülür ve katlanır.",
  "AY": "Ön yüzünde şık Altın Yaldız detayları vardır. Arka yüzü siyah baskılıdır ve kalemle not almaya uygundur. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "VIP": "Ön yüzünde Altın Yaldız ve Özel Kesim detayları barındıran, hem modern hem de estetik duran orta kalınlıkta şık bir karttır. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "E": "Bu ürünler kağıt bazlı olduğu için sudan, güneşten ve rüzgardan etkilenebilirler; bu nedenle iç mekan kullanımı için uygundur. Arkasındaki taşıyıcı kağıtta bulunan kesikler (slit) sayesinde kolayca çıkarılıp istenilen yüzeye yapıştırılabilir.",
  "ES": "Bu ürünler kağıt bazlı olduğu için sudan, güneşten ve rüzgardan etkilenebilirler; bu nedenle iç mekan kullanımı için uygundur. Arkasındaki taşıyıcı kağıtta bulunan kesikler (slit) sayesinde kolayca çıkarılıp istenilen yüzeye yapıştırılabilir.",
  "EO": "Bu ürünler kağıt bazlı olduğu için sudan, güneşten ve rüzgardan etkilenebilirler; bu nedenle iç mekan kullanımı için uygundur. Arkasındaki taşıyıcı kağıtta bulunan kesikler (slit) sayesinde kolayca çıkarılıp istenilen yüzeye yapıştırılabilir.",
  "EOY": "Bu ürünler kağıt bazlı olduğu için sudan, güneşten ve rüzgardan etkilenebilirler; bu nedenle iç mekan kullanımı için uygundur. Arkasındaki taşıyıcı kağıtta bulunan kesikler (slit) sayesinde kolayca çıkarılıp istenilen yüzeye yapıştırılabilir.",
  "MAG1": "60 mikron kalınlığında, parlak selefon kaplıdır. Sudan ve nemden etkilenmez. Metal yüzeylere (buzdolabı vb.) güçlü tutunur. Özel kesimlidir.",
  "MAG2": "60 mikron kalınlığında, parlak selefon kaplıdır. Sudan ve nemden etkilenmez. Metal yüzeylere (buzdolabı vb.) güçlü tutunur. Kenarları oval kesimlidir.",
  "MAG3": "Büyük ebatlı magnetler için CM kare üzerinden fiyatlandırılır. 60 mikron kalınlığında, dayanıklı ve yüksek tutunma gücüne sahiptir.",
  "YAG-COK": "350 gr. Kuşe - Çift Yön Renkli Mat Selefonlu Kabartma Laklı Oval Kesim. Şık ve ekonomik bir prestij ürünüdür.",
  "YAG-SEK": "700 gr. Çok sert ve kalın (iki kağıdın birleşimi). En popüler prestij ürünümüzdür; köşeleri ovaldir ve çift yönlü kabartma laklıdır.",
  "Yag-cok-k": "350 gr. Kuşe Çift Yön Renkli Mat Selefonlu Kabartma Laklı Özel Kesim. Görsel kalitesi yüksek bir üründür. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "Yag-sek-k": "700 gr. Oldukça sert ve dayanıklıdır. İstediğiniz forma göre özel kesim yapılır; çift yönlü kabartma lak ile yüksek prestij sağlar. Çok sert bir yapıdadır; parmağınızla zor bükülür ve katlanır.",
  "Yag-cok-b": "350 gr. Kuşe Çift Yön Renkli Mat Selefonlu Kabartma Laklı Özel Kesim. Görsel kalitesi yüksek bir üründür. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "Yag-sek-b": "700 gr. Oldukça sert ve dayanıklıdır. İstediğiniz forma göre özel kesim yapılır; çift yönlü kabartma lak ile yüksek prestij sağlar. Çok sert bir yapıdadır; parmağınızla zor bükülür ve katlanır.",
  "P1": "Esmer renkte kağıttır siyah baskı güzel durur. su emzici özelliği vardır. araçlarınız için paket kağıtlarınız için mükemmel.",
  "P2": "Esmer renkte kağıttır siyah baskı güzel durur. su emzici özelliği vardır. araçlarınız için paket kağıtlarınız için mükemmel.",
  "P3": "Esmer renkte kağıttır siyah baskı güzel durur. su emzici özelliği vardır. araçlarınız için paket kağıtlarınız için mükemmel.",
  "PVC": "Plastik (PVC) kartvizitler, standart kağıt kartvizitlerin monotonluğunu kırarak markanıza yenilikçi ve unutulmaz bir imaj kazandırır. Şeffaf, buzlu veya metalik yüzey seçenekleri; özel kesim formları (meyve, araç vb.); kabartma, folyo yaldız, platin yüzeyler; QR kod, barkod ve manyetik şerit gibi gelişmiş özellikleri sayesinde rakiplerinizden ayrışmanızı sağlar. Suya dayanıklı, yırtılmaz ve uzun ömürlü prestij ürünüdür."
};

export const FeatureTooltip = ({ code }: { code: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const getInfo = (code: string) => {
    if (PRODUCT_FEATURES_INFO[code]) return PRODUCT_FEATURES_INFO[code];
    
    // Generic handlers for categories without specific codes
    if (code.startsWith('ELI')) return "130 gr. kuşe kağıttan üretilmiştir. Parlak ve canlı renkler için idealdir. Tek yön veya çift yön baskı seçeneği mevcuttur.";
    if (code.startsWith('AF')) return "Afişler, etkinlik ve duyurularınız için yüksek görünürlük sağlar. Kaliteli kağıt ve canlı baskı ile dikkat çeker.";
    if (code.startsWith('Z')) return "Zarflar, kurumsal kimliğinizin tamamlayıcısıdır. Farklı ebat ve kağıt seçenekleri ile profesyonel bir görünüm sunar.";
    if (code.startsWith('P') && !code.startsWith('PRO')) return "Oto paspaslar, araç içi temizliği korurken markanızın reklamını yapar. 85 gr. kart kağıttan üretilmiştir.";
    if (code.startsWith('ANT')) return "90 gr. 1. hamur kağıttan üretilmiştir. Kurumsal kimliğinizin önemli bir parçasıdır. Lazer ve mürekkep püskürtmeli yazıcılar için uygundur.";
    if (code.startsWith('KB') || code.startsWith('NKKB')) return "Küp bloknotlar, ofis masalarının vazgeçilmezidir. Kutulu veya kutusuz seçenekleri mevcuttur. Not almak için pratik ve şıktır.";
    if (code === 'KATALOG') return "İç sayfalar 135 gr. kuşe, kapaklar 300 gr. kuşe kağıttan üretilmiştir. Tel dikiş ciltlidir. Kapaklarda mat veya parlak selefon seçeneği mevcuttur.";
    if (code.startsWith('SRV')) return "Amerikan servisler, restoran ve kafeler için hem hijyenik hem de reklam amaçlı mükemmel bir üründür. Tek yön renkli baskılıdır.";
    if (code.startsWith('KC')) return "210 gr. Amerikan Bristol kağıttan üretilmiştir. Parlak selefon kaplıdır. Dayanıklı ve prestijli bir taşıma çözümüdür.";
    if (code.startsWith('B') && !code.startsWith('B-')) return "Bloknotlar, toplantı ve günlük kullanım için idealdir. Kapaklı modeller Amerikan ciltli, kapaksız modeller tutkallı ciltlidir. İç sayfalar 80 gr. 1. hamur kağıttır.";
    
    return null;
  };

  const info = getInfo(code);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<any>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isClicked) return;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsClicked(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!info) return null;

  return (
    <div 
      className="relative inline-block ml-1.5 align-middle" 
      ref={tooltipRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="w-5 h-5 rounded-full flex items-center justify-center text-[#FF0000] hover:text-[#cc0000] transition-all cursor-help border border-[#FF0000]/30 hover:border-[#cc0000] bg-white shadow-sm"
        onClick={(e) => {
          e.stopPropagation();
          const nextState = !isClicked;
          setIsClicked(nextState);
          setIsOpen(nextState || true);
        }}
        title="Özellik Bilgisi"
      >
        <span className="text-[11px] font-black">?</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            className={`absolute bottom-full left-1/2 mb-2 w-[450px] max-w-[calc(100vw-40px)] p-5 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 z-[9999] text-left ${isClicked ? 'pointer-events-auto' : 'pointer-events-none'}`}
          >
            <p className="text-[13px] leading-relaxed text-black font-medium">{info}</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[10px] border-transparent border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const KARTVIZIT_DATA = [
  { 
    cat: "EKO", 
    color: "bg-primary",
    items: [
      { code: "NK", price: "580 ₺", desc: "250 gr. Bristol Tek Yön Renkli Parlak Selefonlu", image: LOCAL_ASSETS.kartvizit },
      { code: "NKA", price: "590 ₺", desc: "250 gr. Bristol Tek Yön Renkli Parlak Selefonlu Arkası Tek Renk Siyah", image: LOCAL_ASSETS.kartvizit },
      { code: "MNA", price: "600 ₺", desc: "350 gr. Bristol Tek Yön Renkli Mat Selefonlu Arkası Tek renk Siyah", image: LOCAL_ASSETS.kartvizit },
      { code: "CYM", price: "640 ₺", desc: "350 gr. Kuşe Çift Yön Renkli Mat Selefonlu", image: LOCAL_ASSETS.kartvizit },
      { code: "CYP", price: "640 ₺", desc: "350 gr. Kuşe Çift Yön Renkli Parlak Selefonlu", image: LOCAL_ASSETS.kartvizit },
    ]
  },
  { 
    cat: "LAK", 
    color: "bg-purple-600",
    items: [
      { code: "KL", price: "720 ₺", desc: "350 gr. Kuşe Tek Yön Renkli Mat Selefonlu Kabartma Laklı", image: LOCAL_ASSETS.kartvizit },
      { code: "CYML4", price: "800 ₺", desc: "400 gr. Kuşe Çift Yön Renkli Mat Selefonlu Laklı", image: LOCAL_ASSETS.kartvizit },
      { code: "O-COK", price: "820 ₺", desc: "350 gr. Kuşe Çift Yön Renkli Mat Selefonlu Kabartma Laklı Oval Kesim", image: LOCAL_ASSETS.kartvizit },
      { code: "S-COK", price: "880 ₺", desc: "350 gr. Kuşe Çift Yön Renkli Mat Selefonlu Kabartma Laklı Özel Kesim", image: LOCAL_ASSETS.kartvizit },
    ]
  },
  {
    cat: "SIVAMA",
    color: "bg-orange-400",
    items: [
      { code: "O-SEK", price: "970 ₺", desc: "700 gr. Sıvama Mat Selefon Kabartma Laklı Oval Kesim Çift Yön", image: LOCAL_ASSETS.kartvizit },
      { code: "S-SEK", price: "1.070 ₺", desc: "700 gr. Sıvama Mat Selefon Kabartma Laklı Özel Kesim Çift Yön", image: LOCAL_ASSETS.kartvizit },
      { code: "A-SEK", price: "1.180 ₺", desc: "700 gr. Sıvama Mat Selefon Kabartma Laklı Çift Yön (Tek Yön Altın Yaldız) Özel Kesim", image: LOCAL_ASSETS.kartvizit },
      { code: "AC-SEK", price: "1.300 ₺", desc: "700 gr. Sıvama Mat Selefon Kabartma Laklı Çift Yön Altın Yaldız Özel Kesim Çift Yön", image: LOCAL_ASSETS.kartvizit },
      { code: "TANK", price: "1.030 ₺", desc: "800 gr. Bristol Sıvama Mat Selefon Kabartma Laklı Özel Kesim Çift Yön", image: LOCAL_ASSETS.kartvizit },
    ]
  },
  { 
    cat: "VİP", 
    color: "bg-yellow-400",
    items: [
      { code: "AY", price: "900 ₺", desc: "350 gr. Bristol Tek Yön Renkli Mat Selefonlu Altın Yaldızlı Arkası Tek Renk Siyah", image: LOCAL_ASSETS.kartvizit },
      { code: "VIP", price: "1.100 ₺", desc: "350 gr. Kuşe Çift Yön Renkli Mat Selefonlu Özel Kesim Laklı - Ön Yüz Altın Yaldız", image: LOCAL_ASSETS.kartvizit },
    ]
  },
  {
    cat: "PVC",
    color: "bg-blue-600",
    items: [
      { 
        code: "PVC", 
        price: "3.700 ₺", 
        desc: "0,560 mc Beyaz plastik PVC Kartvizit - Çift taraf renkli - Oval Kesim", 
        miktar: "500 ADET",
        isNew: true,
        image: LOCAL_ASSETS.kartvizit 
      },
    ]
  }
];

const EL_ILANI_DATA = [
  {
    cat: "El İlanı",
    color: "bg-red-600",
    subTitle: "105 gr. Kuşe Tek Yön Renkli",
    items: [
      { code: "ELI3", price: "1.800 ₺", desc: "105 gr. Kuşe Tek Yön Renkli A7 (9.2x20 cm) 6.000 Adet", size: "A7", ebat: "9.2x20 cm", miktar: "6.000 Adet" },
      { code: "ELI4", price: "2.900 ₺", desc: "105 gr. Kuşe Tek Yön Renkli A7 (9.2x20 cm) 12.000 Adet", size: "A7", ebat: "9.2x20 cm", miktar: "12.000 Adet" },
      { code: "ELI5", price: "1.150 ₺", desc: "105 gr. Kuşe Tek Yön Renkli A5 (13.8x20 cm) 2.000 Adet", size: "A5", ebat: "13.8x20 cm", miktar: "2.000 Adet" },
      { code: "ELI6", price: "1.700 ₺", desc: "105 gr. Kuşe Tek Yön Renkli A5 (13.8x20 cm) 4.000 Adet", size: "A5", ebat: "13.8x20 cm", miktar: "4.000 Adet" },
      { code: "ELI7", price: "2.250 ₺", desc: "105 gr. Kuşe Tek Yön Renkli A5 (13.8x20 cm) 6.000 Adet", size: "A5", ebat: "13.8x20 cm", miktar: "6.000 Adet" },
      { code: "ELI8", price: "2.800 ₺", desc: "105 gr. Kuşe Tek Yön Renkli A5 (13.8x20 cm) 8.000 Adet", size: "A5", ebat: "13.8x20 cm", miktar: "8.000 Adet" },
      { code: "ELI9", price: "1.600 ₺", desc: "105 gr. Kuşe Tek Yön Renkli A4 (19x27.2 cm) 2.000 Adet", size: "A4", ebat: "19x27.2 cm", miktar: "2.000 Adet" },
      { code: "ELI10", price: "2.600 ₺", desc: "105 gr. Kuşe Tek Yön Renkli A4 (19x27.2 cm) 4.000 Adet", size: "A4", ebat: "19x27.2 cm", miktar: "4.000 Adet" },
      { code: "ELI11", price: "3.600 ₺", desc: "105 gr. Kuşe Tek Yön Renkli A4 (19x27.2 cm) 6.000 Adet", size: "A4", ebat: "19x27.2 cm", miktar: "6.000 Adet" },
      { code: "ELI12", price: "4.500 ₺", desc: "105 gr. Kuşe Tek Yön Renkli A4 (19x27.2 cm) 8.000 Adet", size: "A4", ebat: "19x27.2 cm", miktar: "8.000 Adet" },
      { code: "ELI13", price: "2.600 ₺", desc: "105 gr. Kuşe Tek Yön Renkli A3 (27.5x40 cm) 2.000 Adet", size: "A3", ebat: "27.5x40 cm", miktar: "2.000 Adet" },
      { code: "ELI14", price: "4.500 ₺", desc: "105 gr. Kuşe Tek Yön Renkli A3 (27.5x40 cm) 4.000 Adet", size: "A3", ebat: "27.5x40 cm", miktar: "4.000 Adet" },
      { code: "ELI15", price: "6.500 ₺", desc: "105 gr. Kuşe Tek Yön Renkli A3 (27.5x40 cm) 6.000 Adet", size: "A3", ebat: "27.5x40 cm", miktar: "6.000 Adet" },
      { code: "ELI16", price: "8.300 ₺", desc: "105 gr. Kuşe Tek Yön Renkli A3 (27.5x40 cm) 8.000 Adet", size: "A3", ebat: "27.5x40 cm", miktar: "8.000 Adet" },
    ]
  }
];

export const AFIS_DATA = [
  {
    cat: "Afişler",
    color: "bg-red-600",
    subTitle: "105 gr. Kuşe Tek Yön Renkli",
    items: [
      { code: "AF1", price: "2.100 ₺", desc: "105 gr. Kuşe Tek Yön Renkli (34x49 cm) 250 Adet", size: "34x49", ebat: "34x49 cm", miktar: "250 Adet" },
      { code: "AF2", price: "2.500 ₺", desc: "105 gr. Kuşe Tek Yön Renkli (34x49 cm) 500 Adet", size: "34x49", ebat: "34x49 cm", miktar: "500 Adet" },
      { code: "AF3", price: "3.000 ₺", desc: "105 gr. Kuşe Tek Yön Renkli (34x49 cm) 1.000 Adet", size: "34x49", ebat: "34x49 cm", miktar: "1.000 Adet" },
      { code: "AF4", price: "2.700 ₺", desc: "105 gr. Kuşe Tek Yön Renkli (49x69 cm) 250 Adet", size: "49x69", ebat: "49x69 cm", miktar: "250 Adet" },
      { code: "AF5", price: "3.100 ₺", desc: "105 gr. Kuşe Tek Yön Renkli (49x69 cm) 500 Adet", size: "49x69", ebat: "49x69 cm", miktar: "500 Adet" },
      { code: "AF6", price: "4.000 ₺", desc: "105 gr. Kuşe Tek Yön Renkli (49x69 cm) 1.000 Adet", size: "49x69", ebat: "49x69 cm", miktar: "1.000 Adet" },
    ]
  }
];

const ANTETLI_DATA = [
  {
    cat: "Antetli",
    color: "bg-red-600",
    subTitle: "90 gr. 1. Hamur Tek Yön Renkli",
    items: [
      { code: "ANT1", price: "1.900 ₺", desc: "90 gr. 1. Hamur Tek Yön Renkli A5 (15x21 cm) 4.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "4.000 Adet", image: LOCAL_ASSETS.anteli_kagit },
      { code: "ANT2", price: "3.100 ₺", desc: "90 gr. 1. Hamur Tek Yön Renkli A5 (15x21 cm) 8.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "8.000 Adet", image: LOCAL_ASSETS.anteli_kagit },
      { code: "ANT3", price: "4.300 ₺", desc: "90 gr. 1. Hamur Tek Yön Renkli A5 (15x21 cm) 12.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "12.000 Adet", image: LOCAL_ASSETS.anteli_kagit },
      { code: "ANT4", price: "1.800 ₺", desc: "90 gr. 1. Hamur Tek Yön Renkli A4 (21x29.7 cm) 2.000 Adet", size: "A4", ebat: "21x29.7 cm", miktar: "2.000 Adet", image: LOCAL_ASSETS.anteli_kagit },
      { code: "ANT5", price: "2.900 ₺", desc: "90 gr. 1. Hamur Tek Yön Renkli A4 (21x29.7 cm) 4.000 Adet", size: "A4", ebat: "21x29.7 cm", miktar: "4.000 Adet", image: LOCAL_ASSETS.anteli_kagit },
      { code: "ANT6", price: "4.100 ₺", desc: "90 gr. 1. Hamur Tek Yön Renkli A4 (21x29.7 cm) 6.000 Adet", size: "A4", ebat: "21x29.7 cm", miktar: "6.000 Adet", image: LOCAL_ASSETS.anteli_kagit },
    ]
  }
];

const DOSYALAR_DATA = [
  { code: "MND500", price: "5.600 ₺", miktar: "500 Adet", desc: "350 gr. Kuşe Tek Yön Çok Renkli Mat Selefon - İçi Tek Renk" },
  { code: "KLD500", price: "6.000 ₺", miktar: "500 Adet", desc: "350 gr. Kuşe Tek Yön Çok Renkli Mat Selefon Kabartma Lak - İçi Tek Renk" },
  { code: "PD", price: "7.500 ₺", miktar: "1.000 Adet", desc: "350 gr. Kuşe Tek Yön Çok Renkli Parlak Selefon" },
  { code: "MND", price: "7.600 ₺", miktar: "1.000 Adet", desc: "350 gr. Kuşe Tek Yön Çok Renkli Mat Selefon - İçi Tek Renk" },
  { code: "KLD", price: "8.000 ₺", miktar: "1.000 Adet", desc: "350 gr. Kuşe Tek Yön Çok Renkli Mat Selefon Kabartma Lak - İçi Tek Renk" },
  { code: "CYPD", price: "10.000 ₺", miktar: "1.000 Adet", desc: "350 gr. Kuşe Çift Yön Baskı Parlak Selefonlu" },
  { code: "CYMD", price: "10.200 ₺", miktar: "1.000 Adet", desc: "350 gr. Kuşe Çift Yön Baskı Mat Selefonlu" },
  { code: "CYML4D", price: "12.500 ₺", miktar: "1.000 Adet", desc: "400 gr. Kuşe Çift Yön Renkli Baskı Mat Selefon Laklı" },
];

const ETIKET_DATA = [
  { code: "E", price: "700 ₺", ebat: "53x83 mm.", desc: "90 gr. Kuşe Çıkartma Tek Yön Renkli Parlak Selefonlu" },
  { code: "ES", price: "690 ₺", ebat: "53x83 mm.", desc: "90 gr. Kuşe Çıkartma Tek Yön Renkli Selefonsuz" },
  { code: "EO", price: "880 ₺", ebat: "52x82 mm.", desc: "90 gr. Kuşe Çıkartma Tek Yön Renkli Parlak Selefonlu özel Kesim" },
  { code: "EOY", price: "1.050 ₺", ebat: "52x82 mm.", desc: "90 gr. Kuşe Çıkartma Tek Yön Renkli Parlak Selefonlu Altın Yaldız" },
];

const OTO_PASPAS_DATA = [
  { code: "P1", price: "2.300 ₺", miktar: "1.000 Adet" },
  { code: "P2", price: "3.100 ₺", miktar: "2.000 Adet" },
  { code: "P3", price: "4.800 ₺", miktar: "5.000 Adet" },
];

const MAGNET_DATA = [
  {
    cat: "Magnet",
    color: "bg-red-600",
    subTitle: "60 Mikron - Renkli - 1000 Adet",
    items: [
      { code: "MAG1", price: "1.030 ₺", desc: "Parlak Selefonlu Özel Kesimli", ebat: "46x68 mm.", miktar: "1000 Adet", image: LOCAL_ASSETS.magnet },
      { code: "MAG2", price: "960 ₺", desc: "Parlak Selefonlu Kenarları Oval Kesimli", ebat: "46x68 mm.", miktar: "1000 Adet", image: LOCAL_ASSETS.magnet },
      { code: "MAG3", price: "23.00 ₺", desc: "Büyük ebatlı Magnetler. CM Kare Fiyatıdır. Büyük ebatlı Magnetler.", ebat: "1 cm. Kare", miktar: "1000 Adet", isCustom: true, image: LOCAL_ASSETS.magnet },
    ]
  }
];

export const AMERIKAN_SERVIS_DATA = [
  {
    cat: "Amerikan Servis",
    color: "bg-secondary",
    subTitle: "Tek Yön Renkli Baskı - 2000 Adet",
    items: [
      { code: "SRV1", price: "3.300 ₺", ebat: "31x44 cm.", desc: "Tek Yön Renkli Baskı (90 gr. 1.Hamur)", extra: "Her 2000 Adet için", extraPrice: "3.100 ₺" },
      { code: "SRV2", price: "2.900 ₺", ebat: "27x38 cm.", desc: "Tek Yön Renkli Baskı (100 gr. Kuşe)", extra: "Her 2000 Adet için", extraPrice: "2.650 ₺" },
      { code: "SRV3", price: "4.100 ₺", ebat: "34x49 cm.", desc: "Tek Yön Renkli Baskı (120 gr. 1.Hamur)", extra: "Her 2000 Adet için", extraPrice: "3.200 ₺" },
    ],
    note: "Lütfen Dikkat : Siparişlerinizin Renk, Adet ve Ölçülerinde %1 ila %5 Arasında Fire Olabilmektedir."
  }
];

const banners = [
  {
    img: LOCAL_ASSETS.b1,
    alt: "Mavi Basım Matbaa Hizmetleri Banner 1",
    title: "Türkiye Geneli Profesyonel Matbaa Hizmetleri",
    subtitle: "✅ Kaliteli ve Hızlı Çözümler\n✅ Markanıza Değer Katan Matbaa Hizmetleri",
    blueBtn: { text: "Hemen Sipariş Ver", link: WHATSAPP_LINK },
    blackBtn: { text: "Fiyat Listesi", link: "/kataloglar" },
    outlineBtn: { text: "Ürünlerimizi İnceleyin", link: "#products" }
  },
  {
    img: LOCAL_ASSETS.b2,
    alt: "Mavi Basım Broşür Baskı Banner 2",
    title: "Tanıtımınızı Şansa Bırakmayın, Kaliteye Yatırım Yapın!",
    subtitle: "✅ 115gr Parlak Kuşe Kağıt\n✅ 1000 Adet A5 Broşürde Rakipsiz Fiyat ve Ücretsiz Tasarım Desteği\n✅ Aracı yok, matbaadan direkt halka! Hızlı Kargo",
    blueBtn: { text: "Hemen Sipariş Ver", link: "/brosur" },
    blackBtn: { text: "Fiyat Listesi", link: "/brosur" },
    outlineBtn: { text: "Ürünlerimizi İnceleyin", link: "#products" }
  },
  {
    img: LOCAL_ASSETS.b3,
    alt: "Mavi Basım Magnet Baskı Banner 3",
    title: "1.000 Adet Özel Kesim Magnet’te İnanılmaz Fiyat!",
    subtitle: "✅ 1.000 Adet Özel Kesim Magnet’te İnanılmaz Fiyat! (Matbaadan Direkt)\n✅ 48x68mm Standart veya Özel Kesim\n✅ Aracı yok, matbaadan direkt halka!\n✅ 81 İle Güvenli ve Hızlı Kargo",
    blueBtn: { text: "Hemen Sipariş Ver", link: "/magnet" },
    blackBtn: { text: "Fiyat Listesi", link: "/magnet" },
    outlineBtn: { text: "Ürünlerimizi İnceleyin", link: "#products" }
  },
  {
    img: LOCAL_ASSETS.b4,
    alt: "Mavi Basım Kurumsal Matbaa Banner 4",
    title: "Kurumsal Matbaa ve Baskı Hizmetleri",
    subtitle: "✅ İşinize Özel Profesyonel Matbaa Baskıları\n✅ Sigorta Poliçeleri • Tahsilat Makbuzu • Araç Kiralama Sözleşmesi\n✅ Gider Makbuzu • Giriş Bileti • Reçete • Senet • Tediye Makbuzu\n✅ Otokopili / Karbonlu Baskı\n✅ Numaralı & Ciltli Üretim\n✅ Firma Logolu Özel Tasarım\n✅ Hızlı Üretim – Uygun Fiyat",
    blueBtn: { text: "Hemen Sipariş Ver", link: WHATSAPP_LINK },
    blackBtn: { text: "Fiyat Listesi", link: "/makbuz-ve-formlar" },
    outlineBtn: { text: "Ürünlerimizi İnceleyin", link: "#products" }
  },
  {
    img: LOCAL_ASSETS.b5,
    alt: "Mavi Basım Kutu ve Ambalaj Banner 5",
    title: "Profesyonel Kutu ve Ambalaj Çözümleri",
    subtitle: "✅ Markanıza Değer ve Kimlik Katın\n✅ Her Bütçeye Uygun Özel Tasarım Kutu Çözümleri",
    blueBtn: { text: "Hemen Sipariş Ver", link: "/kutu" },
    blackBtn: { text: "Fiyat Listesi", link: "/kutu" },
    outlineBtn: { text: "Ürünlerimizi İnceleyin", link: "/kutu" }
  }
];

const PRODUCTS = [
  { id: "kartvizit", name: "KARTVİZİT", price: "580 ₺", desc: "1.000 Adet", image: LOCAL_ASSETS.kartvizit, type: "kartvizit" },
  { id: "el_ilani", name: "EL İLANI", price: "1.150 ₺", desc: "2.000 Adet", image: LOCAL_ASSETS.el_ilani, type: "el-ilani" },
  { id: "brosur", name: "BROŞÜR", price: "1.200 ₺", desc: "1.000 Adet", image: LOCAL_ASSETS.brosur, type: "brosur" },
  { id: "magnet", name: "MAGNET", price: "960 ₺", desc: "1.000 Adet", image: LOCAL_ASSETS.magnet, type: "magnet" },
  { id: "kitap_ayraci", name: "KİTAP AYRACI", price: "1.250 ₺", desc: "1.000 Adet", image: LOCAL_ASSETS.kitap_ayraci, type: "kitap-ayraci" },
  { id: "yag_karti", name: "YAĞ KARTI", price: "950 ₺", desc: "1.000 Adet", image: LOCAL_ASSETS.yag_karti, type: "yag-karti" },
  { id: "etiket", name: "ETİKET", price: "690 ₺", desc: "1.000 Adet", image: LOCAL_ASSETS.etiket, type: "etiket" },
  { id: "zarf", name: "ZARF", price: "2.100 ₺", desc: "1.000 Adet", image: LOCAL_ASSETS.zarf, type: "zarf" },
  { id: "anteli_kagit", name: "ANTETLİ KAĞIT", price: "1.800 ₺", desc: "2.000 Adet", image: LOCAL_ASSETS.anteli_kagit, type: "antetli" },
  { id: "cep", name: "CEPLİ DOSYA", price: "5.600 ₺", desc: "500 Adet", image: LOCAL_ASSETS.cep, type: "dosyalar" },
  { id: "bloknot", name: "BLOKNOT", price: "6.200 ₺", desc: "500 Adet", image: LOCAL_ASSETS.bloknot, type: "bloknotlar" },
  { id: "kup", name: "KÜP BLOKNOT", price: "7.450 ₺", desc: "100 Adet", image: LOCAL_ASSETS.kup, type: "kup-bloknot" },
  { id: "katalog", name: "KATALOG", price: "5.400 ₺", desc: "50 Adet", image: LOCAL_ASSETS.katalog, type: "katalog" },
  { id: "amerikan_servis", name: "AMERİKAN SERVİS", price: "2.900 ₺", desc: "2.000 Adet", image: LOCAL_ASSETS.amerikan_servis, type: "amerikan-servis" },
  { id: "karton_canta", name: "KARTON ÇANTA", price: "8.400 ₺", desc: "500 Adet", image: LOCAL_ASSETS.karton_canta, type: "karton-canta" },
  { id: "otopaspas", name: "OTO PASPAS", price: "2.300 ₺", desc: "1.000 Adet", image: LOCAL_ASSETS.otopaspas, type: "oto-paspas" },
  { id: "afis", name: "AFİŞ", price: "2.100 ₺", desc: "250 Adet", image: LOCAL_ASSETS.afis, type: "afis" },
  { id: "ambalaj", name: "AMBALAJ", price: "Fiyat Alınız", desc: "100 kg", image: LOCAL_ASSETS.ambalaj, type: "ambalaj" },
  { id: "makbuz", name: "MAKBUZ & FORMLAR", price: "650 ₺", desc: "5 Cilt", image: LOCAL_ASSETS.makbuz, type: "makbuz-ve-formlar" },
  { id: "kutu", name: "KUTU", price: "Fiyat Alınız", desc: "1.000 Adet", image: LOCAL_ASSETS.kutu, type: "kutu" },
];

const KUTU_DATA = [
  { code: "KUTU1", model: "Dürüm Kutusu", price: "Fiyat Alınız", desc: "350 gr Bristol + mat selefon + yapıştırma", miktar: "1.000 Adet", image: getImageUrl('kutu', "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop") },
  { code: "KUTU2", model: "Hamburger Kutusu", price: "Fiyat Alınız", desc: "350 gr Bristol + mat selefon + yapıştırma", miktar: "1.000 Adet", image: getImageUrl('kutu', "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop") },
  { code: "KUTU3", model: "Cips Kutusu", price: "Fiyat Alınız", desc: "350 gr Bristol + mat selefon + yapıştırma", miktar: "1.000 Adet", image: getImageUrl('kutu', "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop") },
  { code: "KUTU4", model: "Popcorn Kutusu", price: "Fiyat Alınız", desc: "350 gr Bristol + mat selefon + yapıştırma", miktar: "1.000 Adet", image: getImageUrl('kutu', "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop") },
  { code: "KUTU5", model: "Baklava Kutusu", price: "Fiyat Alınız", desc: "350 gr Bristol + mat selefon + yapıştırma", miktar: "1.000 Adet", image: getImageUrl('kutu', "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop") },
  { code: "KUTU6", model: "Tatlı Kutuları", price: "Fiyat Alınız", desc: "350 gr Bristol + mat selefon + yapıştırma", miktar: "1.000 Adet", image: getImageUrl('kutu', "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop") },
  { code: "KUTU7", model: "Pasta Kutuları", price: "Fiyat Alınız", desc: "350 gr Bristol + mat selefon + yapıştırma", miktar: "1.000 Adet", image: getImageUrl('kutu', "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop") },
  { code: "KUTU8", model: "Gömlek Kutusu", price: "Fiyat Alınız", desc: "350 gr Bristol + mat selefon + yapıştırma", miktar: "1.000 Adet", image: getImageUrl('kutu', "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop") },
];

const AMBALAJ_DATA = [
  { code: "AMB1", price: "Fiyat Alınız", desc: "Ambalaj Kağıdı Baskı - 70 gr. Sülfit Kağıt", miktar: "100 kg", image: getImageUrl('ambalaj', "https://images.unsplash.com/photo-1517146492065-22008823c04d?q=80&w=400&auto=format&fit=crop") },
  { code: "AMB2", price: "Fiyat Alınız", desc: "Doypack Ambalaj - Kilitli ve Pencereli", miktar: "1.000 Adet", image: getImageUrl('ambalaj', "https://images.unsplash.com/photo-1517146492065-22008823c04d?q=80&w=400&auto=format&fit=crop") },
  { code: "AMB3", price: "Fiyat Alınız", desc: "Naylon Poşet Baskı - LDPE/HDPE Seçenekleri", miktar: "5.000 Adet", image: getImageUrl('ambalaj', "https://images.unsplash.com/photo-1517146492065-22008823c04d?q=80&w=400&auto=format&fit=crop") },
];

const PRICE_LIST = [
  "BROŞÜRLER",
  "KARTVİZİTLER",
  "EL İLANLARI",
  "MAGNETLER",
  "ETİKETLER",
  "ZARFLAR",
  "ANTETLİLER",
  "AFİŞLER",
  "AMERİKAN SERVİSLER",
  "DOSYALAR",
  "BLOKNOTLAR",
  "KARTON ÇANTALAR",
  "KÜP BLOKNOTLAR",
  "OTO PASPASLAR",
  "KATALOGLAR",
  "115 GR. KUŞE",
  "128 GR. KUŞE",
  "200 GR. KUŞE PARLAK SELEFONLU",
  "KUTULAR",
  "AMBALAJLAR",
  "SİPARİŞ FİŞİ",
  "ADİSYON BASKI",
  "SÖZLEŞME BASKI",
  "PARA MAKBUZU",
];


const ALL_PRODUCTS_CATEGORIES = [
  "Kartvizit Baskı",
  "Broşür Baskı",
  "El İlanı Baskı",
  "Magnet Baskı",
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
  "Senet Baskı",
  "Tediye Makbuzu Baskı",
];

const getCategoryPath = (cat: string) => {
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
  if (cat === "Senet Baskı") return "/para-makbuzu";
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

const CanonicalLink = () => {
  const location = useLocation();
  let path = location.pathname;
  if (path.endsWith('/') && path.length > 1) {
    path = path.slice(0, -1);
  }
  const canonicalUrl = `https://www.mavibasim.com${path}`;
  
  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
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
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
          <motion.a
            initial={{ opacity: 0, scale: 0.5, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 20 }}
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp Hızlı Teklif Hattı - 15 Dakika'da Teklif Alın"
            aria-label="WhatsApp Hızlı Teklif Hattı"
            className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] transition-all hover:scale-110 active:scale-95 group"
          >
            <img src="/WhatsApp.svg" alt="Hızlı Teklif" className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </motion.a>

          <motion.button
            initial={{ opacity: 0, scale: 0.5, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 20 }}
            onClick={scrollToTop}
            title="Yukarı Dön"
            aria-label="Yukarı Dön"
            className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 group"
          >
            <ArrowUp size={32} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
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
      { name: "Senet", path: "/senet" },
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
      { name: "Senet Baskı", path: "/makbuz-ve-formlar#senet" },
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
  { name: "Senet", path: "/senet" },
  { name: "Tediye Makbuzu", path: "/tediye-makbuzu" },
  { name: "Sözleşme", path: "/sozlesme-baski" },
  { name: "Sigorta Poliçeleri", path: "/sigorta-policeleri" },
  { name: "Tahsilat Makbuzu", path: "/tahsilat-makbuzu" },
  { name: "Araç Kiralama", path: "/arac-kiralama" },
  { name: "Tüm Makbuz İşleri", path: "/makbuz-ve-formlar" },
];

const LoginRegisterModal = ({ isOpen, onClose, initialMode = 'login' }: { isOpen: boolean, onClose: () => void, initialMode?: 'login' | 'register' }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-[440px] bg-white rounded-[32px] shadow-2xl overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-slate-400 transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-[32px] font-bold text-[#424b5a] mb-2">
              {mode === 'login' ? 'Giriş Yap' : 'Üye Ol'}
            </h2>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {mode === 'register' ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#424b5a] ml-1">İsim</label>
                    <input 
                      type="text" 
                      placeholder="İsminiz"
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#e9ecef] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[14px] text-gray-700 placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-semibold text-[#424b5a] ml-1">Soyisim</label>
                    <input 
                      type="text" 
                      placeholder="Soyisminiz"
                      className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#e9ecef] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[14px] text-gray-700 placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-[#424b5a] ml-1">E-Posta</label>
                  <input 
                    type="email" 
                    placeholder="E-Posta Adresiniz"
                    className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#e9ecef] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[14px] text-gray-700 placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-[#424b5a] ml-1">Telefon Numarası</label>
                  <input 
                    type="tel" 
                    placeholder="05"
                    className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#e9ecef] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[14px] text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-[#424b5a] ml-1">E-Posta</label>
                <input 
                  type="email" 
                  placeholder="E-Posta Adresiniz"
                  className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#e9ecef] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[14px] text-gray-700 placeholder:text-gray-400"
                />
              </div>
            )}
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[13px] font-semibold text-[#424b5a]">Şifre</label>
                {mode === 'login' && (
                  <button type="button" className="text-[12px] font-bold text-primary hover:underline">Şifremi Unuttum</button>
                )}
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Şifreniz"
                  className="w-full px-4 py-3 bg-[#f8f9fa] border border-[#e9ecef] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[14px] text-gray-700 placeholder:text-gray-400 pr-12"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all text-[16px] mt-2">
              {mode === 'login' ? 'Giriş Yap' : 'Üye Ol'}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[12px] uppercase">
              <span className="bg-white px-4 text-black font-medium">veya</span>
            </div>
          </div>

          <button className="w-full py-3 bg-white border border-[#e9ecef] text-[#424b5a] font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3 text-[14px]">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {mode === 'login' ? 'Google ile Giriş Yap' : 'Google ile Devam Et'}
          </button>

          <div className="mt-8 text-center">
            <p className="text-[13px] text-black font-medium">
              {mode === 'login' ? "Ceptematbaa'ya üye değil misiniz?" : 'Zaten üye misiniz?'}
              <button 
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="ml-1.5 text-primary font-bold hover:underline"
              >
                {mode === 'login' ? 'Üye Ol' : 'Giriş Yap'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPriceListOpen, setIsPriceListOpen] = useState(false);
  const [isMakbuzOpen, setIsMakbuzOpen] = useState(false);
  const [isAllProductsOpen, setIsAllProductsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
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
              <span className="hidden xl:block font-medium text-[13px] opacity-95">Türkiye'nin En Uygun Fiyatlı Online Matbaası</span>
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
              <div className="h-4 w-px bg-white/30"></div>
            </div>

            <HeaderActions 
              onOpenAuth={(mode) => {
                setAuthMode(mode);
                setIsAuthModalOpen(true);
              }} 
            />
          </div>
        </div>
      </div>

      <LoginRegisterModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
      />

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
    <div className="relative h-[450px] md:h-[500px] overflow-hidden bg-secondary group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src={banners[current].img}
            alt={banners[current].alt}
            className="w-full h-full transition-all duration-1000 object-cover saturate-150 opacity-100 scale-100"
            referrerPolicy="no-referrer"
            fetchPriority={current === 0 ? "high" : "auto"}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>
      
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-16 lg:px-24 h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={current}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <div>
              <span className="inline-block bg-secondary text-white text-[9px] md:text-xs font-black px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase tracking-widest mb-2 md:mb-4">
                Mavi Basım Matbaa ve Reklam
              </span>
              <h1 className="text-lg md:text-4xl lg:text-5xl font-black text-white leading-tight mb-2 md:mb-6 uppercase tracking-tight text-shadow-strong max-w-4xl">
                {banners[current].title}
              </h1>
              <p className="text-[11px] md:text-lg text-white mb-4 md:mb-8 max-w-2xl lg:max-w-3xl leading-relaxed font-bold text-shadow-strong whitespace-pre-line">
                {banners[current].subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-4">
              {/* Blue Button */}
              {banners[current].blueBtn.link.startsWith('/') ? (
                <Link to={banners[current].blueBtn.link} className="bg-[#29abe2] hover:bg-[#29abe2]/90 text-white px-3 py-2 md:px-8 md:py-4 rounded-xl font-bold text-[11px] md:text-lg transition-all shadow-2xl shadow-primary/20 flex items-center gap-2">
                  <Zap size={20} className="hidden md:block fill-white" />
                  {banners[current].blueBtn.text}
                </Link>
              ) : (
                <a href={banners[current].blueBtn.link} target="_blank" rel="noopener noreferrer" className="bg-[#29abe2] hover:bg-[#29abe2]/90 text-white px-3 py-2 md:px-8 md:py-4 rounded-xl font-bold text-[11px] md:text-lg transition-all shadow-2xl shadow-primary/20 flex items-center gap-2">
                  <Zap size={20} className="hidden md:block fill-white" />
                  {banners[current].blueBtn.text}
                </a>
              )}

              {/* Black Button */}
              {banners[current].blackBtn.link.startsWith('/') ? (
                <Link to={banners[current].blackBtn.link} className="bg-black hover:bg-black/90 text-white px-3 py-2 md:px-8 md:py-4 rounded-xl font-bold text-[11px] md:text-lg transition-all shadow-2xl flex items-center gap-2">
                  <FileText size={20} className="hidden md:block" />
                  {banners[current].blackBtn.text}
                </Link>
              ) : (
                <a href={banners[current].blackBtn.link} target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-black/90 text-white px-3 py-2 md:px-8 md:py-4 rounded-xl font-bold text-[11px] md:text-lg transition-all shadow-2xl flex items-center gap-2">
                  <FileText size={20} className="hidden md:block" />
                  {banners[current].blackBtn.text}
                </a>
              )}

              {/* Outline Button */}
              <button 
                onClick={() => handleSecondaryClick(banners[current].outlineBtn.link)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-3 py-2 md:px-8 md:py-4 rounded-xl font-bold text-[11px] md:text-lg transition-all"
              >
                {banners[current].outlineBtn.text}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={() => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-secondary/50 hover:bg-secondary text-white rounded-full flex items-center justify-center transition-all z-10"
        aria-label="Önceki Banner"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-secondary/50 hover:bg-secondary text-white rounded-full flex items-center justify-center transition-all z-10"
        aria-label="Sonraki Banner"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 right-8 hidden md:flex gap-3">
        {banners.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 transition-all rounded-full ${current === idx ? 'bg-secondary w-12' : 'bg-white/20 w-6 hover:bg-white/40'}`}
            aria-label={`Banner ${idx + 1}`}
          />
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
      title: "5.000 TL Üzeri Ücretsiz Kargo", 
      desc: "5.000 TL üzeri alışverişlerinizde, Türkiye'nin her iline ücretsiz kargo ile kapıda teslim ediyoruz." 
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
                <h2 className="text-[11px] font-bold text-black uppercase tracking-tight">
                  {item.title}
                </h2>
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

const ProductCard = (props: any) => {
  const { product } = props;
  const navigate = useNavigate();
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group cursor-pointer"
      onClick={() => {
        if (product.type === "kutu") navigate("/kutu");
        else if (product.type === "ambalaj") navigate("/ambalaj");
        else if (product.type === "kartvizit") navigate("/kartvizit");
        else if (product.type === "brosur") navigate("/brosur");
        else if (product.type === "el-ilani") navigate("/el-ilani");
        else if (product.type === "afis") navigate("/afis");
        else if (product.type === "antetli") navigate("/antetli");
        else if (product.type === "dosyalar") navigate("/dosyalar");
        else if (product.type === "etiket") navigate("/etiket");
        else if (product.type === "oto-paspas") navigate("/oto-paspas");
        else if (product.type === "kup-bloknot") navigate("/kup-bloknot");
        else if (product.type === "bloknotlar") navigate("/bloknotlar");
        else if (product.type === "magnet") navigate("/magnet");
        else if (product.type === "amerikan-servis") navigate("/amerikan-servis");
        else if (product.type === "karton-canta") navigate("/karton-canta");
        else if (product.type === "katalog") navigate("/kataloglar");
        else if (product.type === "zarf") navigate("/zarf");
        else if (product.type === "makbuz-ve-formlar") navigate("/makbuz-ve-formlar");
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={LOCAL_ASSETS[product.id]} 
          alt={product.name} 
          width="400"
          height="300"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-gray-100">
          <span className="text-[11px] font-black text-black uppercase tracking-tight">
            {product.desc}
          </span>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <h3 className="text-sm md:text-base font-black text-black mb-2 uppercase tracking-tight leading-tight h-12 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-0.5">
              BAŞLAYAN FİYATLAR
            </span>
            <span className="text-lg md:text-xl font-black text-primary tracking-tighter">
              {typeof product.price === 'number' ? formatPrice(product.price) : product.price}
            </span>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
            <ArrowRight size={20} />
          </div>
        </div>
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

const HomePage = () => {
  const [randomProducts, setRandomProducts] = useState<any[]>([]);

  useEffect(() => {
    // Use first 17 products for the homepage grid
    setRandomProducts(PRODUCTS.slice(0, 17));
  }, []);

  return (
    <>
      <Helmet>
        <title>Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa | Kartvizit, Broşür, Magnet Baskı</title>
        <meta name="description" content="İstanbul Topkapı’da profesyonel matbaa hizmetleri. Kartvizit, broşür, magneti El ilanı, Zarf, Antetli. Makbuz, Sipariş Fişi, katalog ve ambalaj baskı çözümleri. Uygun fiyat, kaliteli üretim ve Türkiye geneli kargo." />
        <meta name="keywords" content="mavi basım, matbaa, baskı, kartvizit, broşür, magnet, kutu baskı, ambalaj, reklam" />
      </Helmet>
      <Hero />
      <TrustBar />

      <section id="products" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div className="text-center md:text-left">
            <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">Matbaa Hizmetlerimiz</span>
            <h2 className="text-2xl md:text-3xl font-black text-black">Matbaa Ürünleri</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 mb-16">
          {randomProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <CategoryList />
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
                  <span className="text-sm md:text-base">Topkapı 2. Matbaacılar Sitesi, 2NC Zeytinburnu, İstanbul, Türkiye adresindeki üretim merkezimiz ile hizmetinizdeyiz.</span>
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
    </>
  );
};

const KutuSmartProductFinder = () => {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<any | null>(null);

  const questions = [
    {
      id: 'model',
      text: 'Hangi Kutu Modelini Arıyorsunuz?',
      options: [
        { label: 'Dürüm Kutusu', value: 'Dürüm Kutusu' },
        { label: 'Hamburger Kutusu', value: 'Hamburger Kutusu' },
        { label: 'Cips Kutusu', value: 'Cips Kutusu' },
        { label: 'Popcorn Kutusu', value: 'Popcorn Kutusu' },
        { label: 'Baklava Kutusu', value: 'Baklava Kutusu' },
        { label: 'Tatlı Kutuları', value: 'Tatlı Kutuları' },
        { label: 'Pasta Kutuları', value: 'Pasta Kutuları' },
        { label: 'Gömlek Kutusu', value: 'Gömlek Kutusu' }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const found = KUTU_DATA.find(item => item.model === value);
    setResult(found);
    setStep(1); // Show result
  };

  const reset = () => {
    setStep(0);
    setResult(null);
  };

  if (step === 1 && result) {
    return (
      <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Package className="text-primary" size={24} />
            </div>
            <div>
              <h4 className="font-medium text-black uppercase tracking-tight leading-none mb-1">{result.model}</h4>
              <p className="text-[10px] font-bold text-black uppercase">{result.desc}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={reset}
              className="text-[10px] font-black text-primary uppercase hover:underline px-2"
            >
              Yeniden Ara
            </button>
            <button 
              onClick={() => {
                window.open(WHATSAPP_LINK, '_blank');
              }}
              className="bg-primary text-white text-[10px] font-black px-4 py-2 rounded-lg hover:bg-black transition-all uppercase tracking-tight"
            >
              Fiyat Al
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
            <Search size={20} />
          </div>
          <div>
            <h3 className="text-sm font-black text-black uppercase tracking-tight leading-none mb-1">Kutu Akıllı Bulucu</h3>
            <p className="text-[10px] font-bold text-black uppercase">{questions[0].text}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {questions[0].options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] font-medium text-black hover:border-primary hover:text-primary transition-all uppercase tracking-tight"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const KutuPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Kutu");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Kutu Baskı | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Özel tasarım kutu baskı hizmetleri. Ürünlerinize değer katan kaliteli ve uygun fiyatlı kutu çözümleri." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap shrink-0">
            <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
              <ChevronRight size={20} className="rotate-180 text-secondary" />
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Kutu Baskı</h1>
              <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
              <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">Özel Tasarım ve Ölçülerde</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-visible relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px]">
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">MODEL</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {KUTU_DATA.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-primary/10 transition-all group">
                    <td className="p-3 text-center font-bold text-black border-r border-gray-100 group-hover:text-secondary transition-colors">
                      {item.code}
                    </td>
                    <td className="p-3 text-center font-medium text-black border-r border-gray-100 uppercase tracking-tight">
                      {item.model}
                    </td>
                    <td className="p-3 font-medium text-black border-r border-gray-100">
                      {item.desc}
                      <FeatureTooltip code={item.code} />
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
                        className="bg-primary hover:bg-secondary text-white p-2 rounded-lg transition-all shadow-lg shadow-primary/20 hover:scale-110"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <FireWarning />

        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* Kutu Baskı Nedir? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">Markanıza Özel Kutu Çözümleri | <strong>Mavi Basım Matbaa & Reklam</strong></h2>
            <div className="prose prose-slate max-w-none text-black">
              <p className="text-lg leading-relaxed mb-6">
                <strong className="font-black text-primary">Markanıza özel kutu çözümleri üretiyoruz.</strong> Özel kutu yaptırmak, karton kutu baskı, kutu baskı, baskılı karton kutu, karton kutu bastırma, özel kutu baskı, kutu bastırma, karton kutu fiyatları, logo baskılı kutu, kutu baskı fiyatları, ambalaj kutu baskı, karton kutu imalatı, kutu matbaa, ucuz kutu baskı, baskılı kutu, özel baskılı kutu, ambalaj kutusu bastırma, ürün kutusu baskı, taslama kutu, sıvama kutu ve markama özel kutu gibi tüm taleplerinizde yüksek kaliteli baskı, hızlı teslimat ve rekabetçi fiyatlarla yanınızdayız.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Karton kutu baskı, ürünlerinizi korurken aynı zamanda markanızı en etkili şekilde tanıtan ambalaj çözümüdür. Logo baskılı kutu ile kutu her açıldığında profesyonel bir izlenim bırakır. Özel kutu baskı talepleri genellikle şu sektörlerden gelir:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { title: "Kozmetik & Parfüm", items: "Ürün kutusu, hediye seti, parfüm, krem, makyaj kutusu." },
                  { title: "Gıda & Tatlı", items: "Çikolata, baklava, kurabiye, lokum, hediyelik gıda kutusu." },
                  { title: "Tekstil & Moda", items: "Tişört, kazak, ayakkabı, çanta, şapka, eşarp kutusu." },
                  { title: "E-ticaret", items: "Kargo kutusu, hediye kutusu, ürün kutusu, ambalaj kutusu." },
                  { title: "Takı & Aksesuar", items: "Yüzük, kolye, küpe, bileklik, saat kutusu." },
                  { title: "Kitap & Kırtasiye", items: "Hediye kutusu, set kutusu, defter, kalem kutusu." },
                  { title: "Elektronik & Aksesuar", items: "Kulaklık, şarj aleti, telefon aksesuar, kablo kutusu." },
                  { title: "Hediyelik Eşya", items: "Kişiye özel, doğum günü, yılbaşı, sevgililer günü kutusu." }
                ].map((sector, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h3 className="font-black text-primary mb-1">{sector.title}</h3>
                    <p className="text-sm text-gray-600">{sector.items}</p>
                  </div>
                ))}
              </div>
              <p className="text-lg leading-relaxed mb-6">
                Kutu baskı fiyatları ebat, adet, kağıt gramajı, baskı türü (CMYK full renk), kaplama (parlak/mat selefon, spot UV vb.), ekstra işlem (yaldız, kabartma, lak, kısmi lak) gibi detaylara göre belirlenir. Fiyat almak için lütfen şu bilgileri belirtin: kutu ebatı, adet, kağıt türü (krome karton mu, Amerikan Bristol mu), kapak işlemi (selefon, yaldız, lak vb.) – hemen teklif hazırlıyoruz.
              </p>
              <p className="text-lg leading-relaxed">
                Karton kutu baskı, ürünlerinizi sadece korumakla kalmaz, satışa katkı sağlar. Baskılı karton kutu modelleri, mağaza rafında, e-ticaret kargo paketinde veya hediye olarak kullanıldığında markanızı güçlendirir. Özel kutu baskı taleplerinde kutu içini de baskılı yapabiliyoruz (iç astar baskısı ekstra ücretle). Kutu bastırma sürecinde kutu kapanış tipi (manyetik kapak, yapışkan bant, kurdele, lastikli kapak vb.) de özelleştirilebilir.
              </p>
              <p className="text-lg font-bold text-primary mt-6">Tüm Türkiye’ye kargo ile gönderim yapıyoruz.</p>
            </div>
          </section>

          {/* Örnek Çalışmalarımız */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Örnek Çalışmalarımız</h2>
            <p className="text-lg text-gray-600 mb-8"><strong>Mavi Basım Matbaa & Reklam</strong> kalitesiyle üretilmiş kutu modelleri</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 font-bold">Kozmetik Kutusu Görseli</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-black mb-2">Kozmetik Kutusu</h3>
                  <p className="text-gray-600">350 gr krome karton, parlak selefon + kısmi lak</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 font-bold">Amerikan Bristol Kutu Görseli</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-black mb-2">Amerikan Bristol Kutu</h3>
                  <p className="text-gray-600">Mat selefon + logo baskılı premium görünüm</p>
                </div>
              </div>
            </div>
          </section>

          {/* Kutu Baskı Özellikleri & Mavi Basım Farkı */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
              <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tight">Kutu Baskı Özellikleri (2026 Güncel)</h2>
              <ul className="space-y-4">
                {[
                  { label: "Kağıt", value: "Krome karton 200-400 gr veya Amerikan Bristol 200-400 gr" },
                  { label: "Baskı", value: "Full renk CMYK (logo, ürün görseli, iletişim baskısı)" },
                  { label: "Kaplamalar", value: "Parlak/mat selefon, spot UV, kabartma, yaldız, kısmi lak" },
                  { label: "Yapı", value: "Yapıştırma, taslama, sıvama mukavva seçenekleri mevcut" },
                  { label: "Ebat", value: "İstenilen her ebatta (standart A4, A5, özel kutu ebatları)" },
                  { label: "Adet", value: "100 – 10.000 adet (toptan indirimli)" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                    <p className="text-lg font-bold text-black">
                      <span className="text-primary">{item.label}:</span> {item.value}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-primary/5 p-8 rounded-[32px] border border-primary/10">
              <h2 className="text-2xl font-black text-primary mb-6 uppercase tracking-tight"><strong>Mavi Basım Matbaa & Reklam</strong> Farkı</h2>
              <ul className="space-y-4">
                {[
                  "Logo, ürün görseli, iletişim bilgileri baskısı",
                  "200-400 gr krome karton veya Amerikan Bristol – yüksek kaliteli ve dayanıklı",
                  "Full renk CMYK baskı + ekstra işlemler (selefon, kabartma, yaldız, lak)",
                  "Yüksek hacimli üretim – stok kolaylığı",
                  "Aynı gün tasarım onayı – hızlı onay süreci",
                  "🎨 Tasarım ücreti: 350 TL (+KDV) – Hazır tasarım ücretsiz!"
                ].map((diff, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-lg font-bold text-black">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {diff}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Kutuda Sık Yapılan 5 Hata */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Kutuda Sık Yapılan 5 Hata</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: "Eksik Bilgi", desc: "Logo veya iletişim bilgileri eksik. Marka hatırlanmaz." },
                { title: "Yanlış Ebat", desc: "Ürün uyumu bozulur, kutu içinde sallanma." },
                { title: "Düşük Kalite", desc: "Kutuda yırtılma, bükülme veya taşıma sorunları." },
                { title: "Renk Uyumu", desc: "Marka tutarsızlığına ve amatör görünüme neden olur." },
                { title: "İşlem Eksikliği", desc: "Görsel etki azalır, ürün rafta sönük kalır." }
              ].map((item, idx) => (
                <div key={idx} className="bg-red-50 p-6 rounded-2xl border border-red-100 text-center">
                  <h3 className="text-lg font-black text-red-600 mb-2">{item.title}</h3>
                  <p className="text-sm font-medium text-red-900">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tasarım Nasıl Yapılır? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Tasarım Nasıl Yapılır? (4 Adımda)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Hedef & Konsept", desc: "Kaç adet? Ebat, ürün boyutu, kağıt türü belirleyin." },
                { step: "2", title: "İçerik & Görsel", desc: "Logo, ürün görseli, renk şeması, iletişim yerleşimi." },
                { step: "3", title: "Teknik Hazırlık", desc: "Dosya PDF, CMYK, 300 dpi. +3 mm taşma payı." },
                { step: "4", title: "Onay & Baskı", desc: "Tasarım onayı ile üretim hemen başlar." }
              ].map((item, idx) => (
                <div key={idx} className="relative p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <span className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-black text-black mb-3 mt-2">{item.title}</h3>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Products */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">Kurumsal Kimliğinizi Güçlendirin!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Kartvizit", desc: "Profesyonel ilk izlenim bırakın.", path: "/kartvizit" },
                { title: "Karton Çanta", desc: "Alışverişi markanıza dönüştürün.", path: "/karton-canta" },
                { title: "Cepli Dosya", desc: "Tekliflerinizi prestijli hale getirin.", path: "/cepli-dosya" },
                { title: "Katalog", desc: "Ürünlerinizi en iyi şekilde tanıtın.", path: "/katalog" }
              ].map((product, idx) => (
                <Link key={idx} to={product.path} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
                  <h3 className="text-lg font-black text-black mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                  <p className="text-sm font-medium text-gray-500">{product.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <AgencyDiscountCTA />
        </div>
      </div>
      <ProductSEOSection categoryKey="kutu" />
    </div>
  );
};

export const ProductSEOSection = ({ categoryKey }: { categoryKey: string }) => {
  const content = PRODUCT_DESCRIPTIONS[categoryKey];
  if (!content) return null;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-20">
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
        
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-black">20 Yıllık Tecrübe</h4>
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
      </div>
    </div>
  );
};

const AmbalajPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Ambalaj");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Ambalaj Baskı | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Profesyonel ambalaj baskı çözümleri. Ürünleriniz için şık ve dayanıklı ambalaj tasarımları." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap shrink-0">
            <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
              <ChevronRight size={20} className="rotate-180 text-secondary" />
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Ambalaj Baskı</h1>
              <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
              <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">Endüstriyel ve Gıda Ambalajları</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-visible relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px]">
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET/MİKTAR</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {AMBALAJ_DATA.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-primary/10 transition-all group">
                    <td className="p-3 text-center font-bold text-black border-r border-gray-100 group-hover:text-secondary transition-colors">
                      {item.code}
                    </td>
                    <td className="p-3 font-medium text-black border-r border-gray-100">
                      {item.desc}
                      <FeatureTooltip code={item.code} />
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
                        className="bg-primary hover:bg-secondary text-white p-2 rounded-lg transition-all shadow-lg shadow-primary/20 hover:scale-110"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <FireWarning />

        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* Ambalaj Baskı Nedir? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">Markanıza Özel Ambalaj Çözümleri | <strong>Mavi Basım Matbaa & Reklam</strong></h2>
            <div className="prose prose-slate max-w-none text-black">
              <p className="text-lg leading-relaxed mb-6">
                <strong className="font-black text-primary">Markanıza özel ambalaj çözümleri üretiyoruz.</strong> Özel ambalaj yaptırmak, ambalaj kağıdı baskı, ambalaj baskı, baskılı ambalaj, ambalaj bastırma, özel ambalaj baskı, ambalaj fiyatları, logo baskılı ambalaj, ambalaj baskı fiyatları, ürün ambalajı baskı, ambalaj matbaa, ucuz ambalaj baskı, baskılı ambalaj, özel baskılı ambalaj, ürün ambalajı bastırma, gıda ambalajı baskı ve markama özel ambalaj gibi tüm taleplerinizde yüksek kaliteli baskı, hızlı teslimat ve rekabetçi fiyatlarla yanınızdayız.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Ambalaj baskı, ürünlerinizi korurken aynı zamanda markanızı en etkili şekilde tanıtan çözümdür. Logo baskılı ambalaj ile her paketleme profesyonel bir izlenim bırakır. Özel ambalaj baskı talepleri genellikle şu sektörlerden gelir:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {[
                  { title: "Gıda & Restoran", items: "Dürüm kağıdı, hamburger kağıdı, tepsi örtüsü, kese kağıdı." },
                  { title: "Kozmetik & Bakım", items: "Sabun ambalajı, krem ambalajı, hediye paketleme." },
                  { title: "Tekstil & Mağaza", items: "Pelur kağıdı, ürün sarma kağıdı, hediye paketleme kağıdı." },
                  { title: "E-ticaret", items: "Ürün koruma ve sunum ambalajları." },
                  { title: "Hediyelik Eşya", items: "Özel tasarım paketleme kağıtları." }
                ].map((sector, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h3 className="font-black text-primary mb-1">{sector.title}</h3>
                    <p className="text-sm text-gray-600">{sector.items}</p>
                  </div>
                ))}
              </div>
              <p className="text-lg leading-relaxed mb-6">
                Ambalaj baskı fiyatları ebat, adet, kağıt gramajı (sülfit, kuşe, yağlı kağıt vb.), baskı türü (tek renk veya CMYK) gibi detaylara göre belirlenir. Fiyat almak için lütfen şu bilgileri belirtin: ambalaj ebatı, adet, kağıt türü – hemen teklif hazırlıyoruz.
              </p>
              <p className="text-lg leading-relaxed">
                Ambalaj baskı, ürünlerinizi sadece korumakla kalmaz, marka değerini artırır. Baskılı ambalaj modelleri, müşteriye ulaştığında markanızı güçlendirir. Özel ambalaj baskı taleplerinde farklı kağıt türleri ve baskı teknikleri sunuyoruz.
              </p>
              <p className="text-lg font-bold text-primary mt-6">Tüm Türkiye’ye kargo ile gönderim yapıyoruz.</p>
            </div>
          </section>

          {/* Örnek Çalışmalarımız */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Örnek Çalışmalarımız</h2>
            <p className="text-lg text-gray-600 mb-8"><strong>Mavi Basım Matbaa & Reklam</strong> kalitesiyle üretilmiş ambalaj modelleri</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 font-bold">Gıda Ambalaj Görseli</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-black mb-2">Gıda Ambalaj Kağıdı</h3>
                  <p className="text-gray-600">40 gr sülfit kağıt, gıda uyumlu baskı</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 font-bold">Pelur Kağıdı Görseli</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-black mb-2">Baskılı Pelur Kağıdı</h3>
                  <p className="text-gray-600">17-22 gr pelur kağıt, logo baskılı şık sunum</p>
                </div>
              </div>
            </div>
          </section>

          {/* Ambalaj Baskı Özellikleri & Mavi Basım Farkı */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
              <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tight">Ambalaj Baskı Özellikleri (2026 Güncel)</h2>
              <ul className="space-y-4">
                {[
                  { label: "Kağıt Türleri", value: "Sülfit, kuşe, yağlı kağıt, pelur, kraft seçenekleri" },
                  { label: "Baskı", value: "Full renk CMYK veya Pantone özel renk baskısı" },
                  { label: "Gıda Uyumu", value: "Gıda ile temasa uygun sertifikalı mürekkep ve kağıt" },
                  { label: "Kullanım", value: "Sarım kağıdı, tepsi örtüsü, ürün paketleme" },
                  { label: "Ebat", value: "İstenilen her ebatta (standart 25x35, 35x50, 50x70 cm)" },
                  { label: "Adet", value: "Düşük ve yüksek adetli üretim seçenekleri" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                    <p className="text-lg font-bold text-black">
                      <span className="text-primary">{item.label}:</span> {item.value}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-primary/5 p-8 rounded-[32px] border border-primary/10">
              <h2 className="text-2xl font-black text-primary mb-6 uppercase tracking-tight"><strong>Mavi Basım Matbaa & Reklam</strong> Farkı</h2>
              <ul className="space-y-4">
                {[
                  "Logo ve marka görselleri ile yüksek çözünürlüklü baskı",
                  "Gıda güvenliğine uygun materyal seçimi",
                  "Hızlı üretim ve zamanında teslimat garantisi",
                  "Yüksek hacimli üretim – stok kolaylığı",
                  "Aynı gün tasarım onayı – hızlı onay süreci",
                  "🎨 Tasarım ücreti: 350 TL (+KDV) – Hazır tasarım ücretsiz!"
                ].map((diff, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-lg font-bold text-black">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {diff}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Ambalajda Sık Yapılan 5 Hata */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Ambalajda Sık Yapılan 5 Hata</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: "Yanlış Kağıt", desc: "Ürüne uygun olmayan kağıt seçimi (yağ geçirme vb.)." },
                { title: "Düşük Çözünürlük", desc: "Baskıda pikselleşme ve kalitesiz görünüm." },
                { title: "Gıda Uyumu", desc: "Gıda ile temasa uygun olmayan mürekkep kullanımı." },
                { title: "Renk Sapması", desc: "Marka renklerinin yanlış basılması." },
                { title: "Ebat Hatası", desc: "Ürünü tam sarmayan veya çok büyük gelen ölçüler." }
              ].map((item, idx) => (
                <div key={idx} className="bg-red-50 p-6 rounded-2xl border border-red-100 text-center">
                  <h3 className="text-lg font-black text-red-600 mb-2">{item.title}</h3>
                  <p className="text-sm font-medium text-red-900">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tasarım Nasıl Yapılır? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Tasarım Nasıl Yapılır? (4 Adımda)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "İhtiyaç Analizi", desc: "Ürün türü, kağıt seçimi ve ebat belirleme." },
                { step: "2", title: "Görsel Tasarım", desc: "Logo yerleşimi, desen ve renk çalışmaları." },
                { step: "3", title: "Teknik Kontrol", desc: "Baskı formatı, CMYK ve taşma payı kontrolü." },
                { step: "4", title: "Baskı & Teslimat", desc: "Onay sonrası hızlı üretim ve kargo süreci." }
              ].map((item, idx) => (
                <div key={idx} className="relative p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <span className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-black text-black mb-3 mt-2">{item.title}</h3>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Products */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">Kurumsal Kimliğinizi Güçlendirin!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Kutu Baskı", desc: "Ürünlerinize özel şık kutular.", path: "/kutu" },
                { title: "Karton Çanta", desc: "Alışverişi markanıza dönüştürün.", path: "/karton-canta" },
                { title: "Amerikan Servis", desc: "Masalarınızda marka rüzgarı estirin.", path: "/amerikan-servis" },
                { title: "Etiket", desc: "Ürünlerinize profesyonel dokunuş.", path: "/etiket" }
              ].map((product, idx) => (
                <Link key={idx} to={product.path} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
                  <h3 className="text-lg font-black text-black mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                  <p className="text-sm font-medium text-gray-500">{product.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          <AgencyDiscountCTA />
        </div>
      </div>
      <ProductSEOSection categoryKey="ambalaj" />
    </div>
  );
};

const ElIlaniPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "El İlanı");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>El İlanı Baskı | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Hızlı ve ucuz el ilanı baskı hizmetleri. Kampanyalarınızı geniş kitlelere ulaştırın." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">El İlanı</h1>
            <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
            <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">105 gr. Kuşe - Renkli</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px]">
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th className="p-4 w-40"></th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EBAT</th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {EL_ILANI_DATA.map((category, cIdx) => {
                  const chunks = [];
                  let currentChunk = [];
                  let lastEbat = null;

                  category.items.forEach((item) => {
                    if (lastEbat !== null && item.ebat !== lastEbat) {
                      chunks.push(currentChunk);
                      currentChunk = [];
                    }
                    currentChunk.push(item);
                    lastEbat = item.ebat;
                  });
                  if (currentChunk.length > 0) chunks.push(currentChunk);

                  return (
                    <React.Fragment key={cIdx}>
                      {chunks.map((chunk, chunkIdx) => (
                        <React.Fragment key={`${cIdx}-${chunkIdx}`}>
                          {chunk.map((item, itemIdx) => (
                            <tr key={`${cIdx}-${chunkIdx}-${itemIdx}`} className="border-b border-gray-100 hover:bg-primary/5 transition-all cursor-default group">
                              {itemIdx === 0 && (
                                <td 
                                  rowSpan={chunk.length}
                                  className="bg-white border-r border-gray-200 p-1.5 w-48 text-center align-middle"
                                >
                                  <div className="flex flex-col items-center justify-center">
                                    <span className="text-[18px] font-black text-black uppercase mb-0.5 leading-tight">
                                      {category.cat.includes('El İlanı') ? 'EL İLANI' : category.cat.toUpperCase()}
                                    </span>
                                    <span className="text-[21px] font-black text-[#f27d26] mb-0.5 leading-tight">
                                      {category.subTitle.split(' ')[0]} {category.subTitle.split(' ')[1]}
                                    </span>
                                    <span className="text-[11px] font-bold text-[#718096] uppercase tracking-tight text-center leading-tight">
                                      {category.subTitle.split(' ').slice(2).join(' ')}
                                      {(category as any).desc && <><br />{(category as any).desc}</>}
                                    </span>
                                  </div>
                                </td>
                              )}
                              <td className="p-1.5 text-center border-r border-gray-100">
                                <span className="inline-block px-3 py-1 rounded border border-[#cbd5e0] bg-[#edf2f7] text-black font-bold text-[14px] whitespace-nowrap">
                                  {item.ebat}
                                </span>
                              </td>
                              <td className="p-1.5 text-center font-bold text-[#2d3748] border-r border-gray-100 group-hover:text-primary transition-colors">
                                {item.code}
                              </td>
                              <td className="p-1.5 text-center text-black font-medium border-r border-gray-100">
                                <span className="group-hover:font-bold transition-all">
                                  {item.desc.split('(')[0].replace(/\s[Aa][3457]\b/g, '').trim()}
                                </span>
                              </td>
                              <td className="p-1.5 text-center text-black font-medium border-r border-gray-100 transition-colors">
                                <span className="font-bold">{item.miktar.split(' ')[0]}</span> {item.miktar.split(' ')[1]}
                              </td>
                              <td className="p-1.5 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[16px] transition-colors">
                                {item.price}
                              </td>
                              <td className="p-1.5 text-center">
                                <button 
                                  onClick={() => openWhatsApp(item)}
                                  className="bg-primary text-white hover:bg-secondary transition-all p-1.5 rounded-lg shadow-sm scale-95 group-hover:scale-100"
                                >
                                  <ShoppingCart size={18} />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {(chunkIdx < chunks.length - 1 || cIdx < EL_ILANI_DATA.length - 1) && (
                            <tr className="border-b-[3px] border-[#cbd5e0]">
                              <td colSpan={7} className="h-0 p-0"></td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Content Section */}
        <div className="mt-20 space-y-20">
          {/* Giriş */}
          <section>
            <h2 className="text-2xl md:text-4xl font-black text-black mb-8 uppercase tracking-tight">El İlanı Baskı ile Hızlı Tanıtım</h2>
            <div className="prose prose-slate max-w-none text-black">
              <p className="text-xl leading-relaxed mb-8">
                <strong className="font-black text-primary">El ilanı baskı hizmetlerinde Türkiye’nin en çok tercih edilen matbaasıyız.</strong> A5 el ilanı ve A4 el ilanı seçeneklerimizle kampanya, açılış, indirim ve yerel duyurularınıza en hızlı ve ekonomik çözümü sunuyoruz. Flyer baskı, tanıtım ilanı, ucuz el ilanı baskı ve online el ilanı siparişi ihtiyaçlarınızda yüksek kaliteli baskı ve hızlı teslimat sağlıyoruz.
              </p>
            </div>
          </section>

          {/* Hangi El İlanı Kimler İçin Uygun? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-10 uppercase tracking-tight text-center">Hangi El İlanı Kimler İçin Uygun?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { id: "1", title: "A5 El İlanı", desc: "Sokak dağıtımı, kapı altı bırakma, hızlı kampanya duyuruları için en ideal ve ekonomik boyut." },
                { id: "2", title: "A4 El İlanı", desc: "Daha fazla ürün görseli veya detaylı kampanya bilgisi gerektiren durumlar için geniş alan." },
                { id: "3", title: "A6 El İlanı", desc: "Kupon, indirim kodu veya küçük hatırlatmalar için cep boy pratik çözüm." }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 relative group hover:bg-white hover:shadow-2xl transition-all">
                  <span className="text-6xl font-black text-primary/10 absolute top-4 right-6 group-hover:text-primary/20 transition-colors">{item.id}</span>
                  <h3 className="text-xl font-black text-black mb-4 relative z-10">{item.title}</h3>
                  <p className="text-gray-600 font-medium relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Özellikler & Fark */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="bg-black p-10 rounded-[40px] text-white shadow-2xl">
              <h2 className="text-2xl font-black mb-8 uppercase tracking-tight text-primary">El İlanı Baskı Özellikleri (2026 Güncel)</h2>
              <ul className="space-y-6">
                {[
                  { label: "Ebat", value: "A4, A5 ve A6 standart seçenekler" },
                  { label: "Kağıt", value: "105 gr parlak kuşe (ekonomik ve kaliteli)" },
                  { label: "Baskı", value: "Tek yön full renk CMYK" },
                  { label: "Yüzey", value: "Parlak kuşe kağıt ile canlı renkler" },
                  { label: "Adet", value: "1000 adetten başlayan yüksek tirajlı üretim" },
                  { label: "Teslimat", value: "Hızlı üretim ve Türkiye geneli kargo" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 border-b border-white/10 pb-4 last:border-0">
                    <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                    <p className="text-lg font-bold">
                      <span className="text-gray-400">{item.label}:</span> {item.value}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-gray-50 p-10 rounded-[40px] border border-gray-100 shadow-inner">
              <h2 className="text-2xl font-black text-black mb-8 uppercase tracking-tight"><strong>Mavi Basım Matbaa & Reklam</strong> Farkı</h2>
              <ul className="space-y-6">
                {[
                  "En uygun fiyat garantisi ile yüksek tirajlı baskı",
                  "Canlı renkler ve kaliteli kağıt seçimi",
                  "Hızlı dağıtıma uygun paketleme",
                  "Yerel işletmeler için en etkili reklam aracı",
                  "Aynı gün tasarım onayı – hızlı üretim süreci",
                  "🎨 Tasarım desteği: 200 TL (+KDV) – Hazır tasarım ücretsiz!"
                ].map((diff, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-lg font-bold text-black">
                    <div className="w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/40" />
                    {diff}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Tasarım Nasıl Yapılır? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-10 uppercase tracking-tight">Tasarım Nasıl Yapılır? (4 Adımda)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Mesajınızı Belirleyin", desc: "Tek bir ana mesaj veya kampanya üzerine odaklanın." },
                { step: "2", title: "Görsel Seçimi", desc: "Dikkat çekici, yüksek çözünürlüklü tek bir ana görsel kullanın." },
                { step: "3", title: "İletişim Bilgileri", desc: "Adres, telefon ve varsa QR kodunuzu net bir şekilde yerleştirin." },
                { step: "4", title: "Baskı Onayı", desc: "Tasarımınızı gönderin, kontrol edelim ve hemen baskıya alalım." }
              ].map((item, idx) => (
                <div key={idx} className="relative p-8 bg-white rounded-[32px] border border-gray-100 shadow-xl group hover:border-primary/30 transition-all">
                  <span className="absolute -top-5 -left-5 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-black text-black mb-4 mt-2">{item.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* El İlanında Sık Yapılan 5 Hata */}
          <section className="bg-red-50 rounded-[50px] p-10 md:p-16 border border-red-100">
            <h2 className="text-2xl md:text-3xl font-black text-red-600 mb-10 uppercase tracking-tight text-center">El İlanında Sık Yapılan 5 Hata</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                { title: "Çok Fazla Yazı", desc: "Okuyucu sıkılır, mesajı almadan geçer." },
                { title: "Küçük Fontlar", desc: "Okunması zorlaşır, profesyonellikten uzaklaşır." },
                { title: "Kötü Görsel", desc: "Marka imajına zarar verir, güven sarsar." },
                { title: "Eksik İletişim", desc: "Müşteri size nasıl ulaşacağını bulamaz." },
                { title: "Karışık Tasarım", desc: "Nereye bakılacağı belli olmaz, etki azalır." }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <span className="text-2xl font-black text-red-600">!</span>
                  </div>
                  <h3 className="text-lg font-black text-red-700 mb-2">{item.title}</h3>
                  <p className="text-sm font-medium text-red-900/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Products */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-10 uppercase tracking-tight text-center">Kurumsal Kimliğinizi Güçlendirin!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Magnet", desc: "Müşterilerinizin gözü önünde olun.", path: "/magnet" },
                { title: "Kartvizit", desc: "Profesyonel ağınızı genişletin.", path: "/kartvizit" },
                { title: "Bloknot", desc: "Markanızı her notta hatırlatın.", path: "/bloknot" },
                { title: "Amerikan Servis", desc: "Restoranınız için şık çözümler.", path: "/amerikan-servis" }
              ].map((product, idx) => (
                <Link key={idx} to={product.path} className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all">
                  <h3 className="text-xl font-black text-black mb-3 group-hover:text-primary transition-colors">{product.title}</h3>
                  <p className="text-gray-500 font-medium mb-4">{product.desc}</p>
                  <span className="text-primary font-black text-sm uppercase tracking-widest group-hover:translate-x-2 inline-block transition-transform">Fiyatları Gör →</span>
                </Link>
              ))}
            </div>
          </section>

          <AgencyDiscountCTA />
        </div>
        <FireWarning />

        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* El İlanı Baskı Nedir? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">El İlanı Baskı Nedir?</h2>
            <div className="prose prose-slate max-w-none text-black">
              <p className="text-lg leading-relaxed mb-6">
                El ilanları ve broşürler, bir işletmenin ürünlerini, hizmetlerini veya kampanyalarını geniş kitlelere duyurmak için kullandığı en temel pazarlama aracıdır. Genellikle 115 gr veya 130 gr kuşe kağıda basılan bu ürünler, hem ekonomik olmaları hem de doğrudan hedef kitleye ulaşabilmeleri nedeniyle tercih edilir.
              </p>
              <p className="text-lg leading-relaxed">
                <strong className="font-black">MAVİ BASIM MATBAA & REKLAM</strong> olarak, el ilanı baskı süreçlerinde yüksek kaliteli ofset makinelerimizle en canlı renkleri ve en net görüntüleri sunuyoruz. A5 (yarım sayfa), A4 (tam sayfa) veya özel kesim seçenekleriyle markanızın profesyonel görünmesini sağlıyoruz.
              </p>
            </div>
          </section>

          {/* Neden El İlanı Bastırmalısınız? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Neden El İlanı Bastırmalısınız?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Geniş Erişim", desc: "Sokakta, mağazada veya posta kutularında doğrudan müşteriye ulaşır." },
                { step: "2", title: "Ekonomik", desc: "Birim maliyeti en düşük reklam araçlarından biridir." },
                { step: "3", title: "Bilgilendirici", desc: "Ürünleriniz hakkında detaylı bilgi ve görseller sunmanıza olanak tanır." },
                { step: "4", title: "Güven Verici", desc: "Fiziksel bir materyal olması, markanızın ciddiyetini yansıtır." }
              ].map((item, idx) => (
                <div key={idx} className="relative p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <span className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-black text-black mb-3 mt-2">{item.title}</h3>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sık Yapılan Hatalar */}
          <section className="bg-red-50 p-8 md:p-12 rounded-[32px] border border-red-100">
            <h2 className="text-2xl md:text-3xl font-black text-red-600 mb-8 uppercase tracking-tight">El İlanı Tasarımında Sık Yapılan 5 Hata</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Logo veya iletişim bilgileri eksikliği",
                "Yanlış ebat seçimi",
                "Düşük kaliteli kağıt kullanımı",
                "Baskı renk uyumsuzluğu",
                "Tasarımın çok kalabalık olması"
              ].map((error, idx) => (
                <li key={idx} className="flex items-center gap-3 text-lg font-bold text-red-900">
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                  {error}
                </li>
              ))}
            </ul>
          </section>

          {/* Related Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Broşür Fiyatları", desc: "Renkli broşür baskıları ile tanıtımlarınızı uçurun.", path: "/brosur" },
              { title: "Sıvama Kartvizit", desc: "Lüks, dayanıklı and akılda kalıcı premium kartlar.", path: "/kartvizit" },
              { title: "Kartvizit Fiyatları", desc: "Hızlı, kaliteli and ekonomik kurumsal kimlik.", path: "/kartvizit" },
              { title: "Karton Çanta", desc: "Şık, çevre dostu and unutulmaz çantalar.", path: "/karton-canta" }
            ].map((product, idx) => (
              <Link key={idx} to={product.path} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
                <h3 className="text-lg font-black text-black mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                <p className="text-sm font-medium text-gray-500">{product.desc}</p>
              </Link>
            ))}
          </div>

          <AgencyDiscountCTA />
        </div>
      </div>
      <ProductSEOSection categoryKey="el_ilani" />
    </div>
  );
};

const AfisPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Afiş");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Afiş Baskı | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Yüksek kaliteli afiş ve poster baskı hizmetleri. Etkinliklerinizi dev boyutlarda duyurun." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Afişler</h1>
            <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
            <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">105 gr. Kuşe - Renkli</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px]">
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th className="p-4 w-40"></th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EBAT</th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {AFIS_DATA.map((category, cIdx) => {
                  const chunks = [];
                  let currentChunk = [];
                  let lastEbat = null;

                  category.items.forEach((item) => {
                    if (lastEbat !== null && item.ebat !== lastEbat) {
                      chunks.push(currentChunk);
                      currentChunk = [];
                    }
                    currentChunk.push(item);
                    lastEbat = item.ebat;
                  });
                  if (currentChunk.length > 0) chunks.push(currentChunk);

                  return (
                    <React.Fragment key={cIdx}>
                      {chunks.map((chunk, chunkIdx) => (
                        <React.Fragment key={`${cIdx}-${chunkIdx}`}>
                          {chunk.map((item, itemIdx) => (
                            <tr key={`${cIdx}-${chunkIdx}-${itemIdx}`} className="border-b border-gray-100 hover:bg-primary/5 transition-all cursor-default group">
                              {itemIdx === 0 && (
                                <td 
                                  rowSpan={chunk.length}
                                  className="bg-white border-r border-gray-200 p-1.5 w-48 text-center align-middle"
                                >
                                  <div className="flex flex-col items-center justify-center">
                                    <span className="text-[18px] font-black text-black uppercase mb-0.5 leading-tight">
                                      {category.cat.includes('Afiş') ? 'AFİŞ' : category.cat.toUpperCase()}
                                    </span>
                                    <span className="text-[21px] font-black text-[#f27d26] mb-0.5 leading-tight">
                                      {category.subTitle.split(' ')[0]} {category.subTitle.split(' ')[1]}
                                    </span>
                                    <span className="text-[11px] font-bold text-[#718096] uppercase tracking-tight text-center leading-tight">
                                      {category.subTitle.split(' ').slice(2).join(' ')}
                                      {(category as any).desc && <><br />{(category as any).desc}</>}
                                    </span>
                                  </div>
                                </td>
                              )}
                              <td className="p-3.5 text-center border-r border-gray-100">
                                <span className="inline-block px-3 py-1 rounded border border-[#cbd5e0] bg-[#edf2f7] text-[#2d3748] font-bold text-[14px] whitespace-nowrap">
                                  {item.ebat}
                                </span>
                              </td>
                              <td className="p-3.5 text-center font-bold text-[#2d3748] border-r border-gray-100 group-hover:text-primary transition-colors">
                                {item.code}
                              </td>
                              <td className="p-3.5 text-center text-[#4a5568] font-medium border-r border-gray-100">
                                <span className="group-hover:font-bold transition-all">
                                  {item.desc.split('(')[0].replace(/\s[Aa][3457]\b/g, '').trim()}
                                </span>
                              </td>
                              <td className="p-3.5 text-center text-[#4a5568] font-medium border-r border-gray-100 transition-colors">
                                <span className="font-bold">{item.miktar.split(' ')[0]}</span> {item.miktar.split(' ')[1]}
                              </td>
                              <td className="p-3.5 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[16px] transition-colors">
                                {item.price}
                              </td>
                              <td className="p-3.5 text-center">
                                <button 
                                  onClick={() => openWhatsApp(item)}
                                  className="bg-primary text-white hover:bg-secondary transition-all p-2 rounded-lg shadow-sm scale-95 group-hover:scale-100"
                                >
                                  <ShoppingCart size={20} />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {(chunkIdx < chunks.length - 1 || cIdx < AFIS_DATA.length - 1) && (
                            <tr className="border-b-[3px] border-[#cbd5e0]">
                              <td colSpan={7} className="h-0 p-0"></td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <FireWarning />
        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* Afiş Baskı Nedir? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">Afiş Baskı Nedir?</h2>
            <div className="prose prose-slate max-w-none text-black">
              <p className="text-lg leading-relaxed mb-6">
                Afiş baskı, etkinlik duyuruları, kampanya tanıtımları, mağaza indirimleri, emlak ilanları, restoran menüleri ve tüm tanıtım çalışmalarında kullanılan en etkili büyük format baskı ürünüdür. Afişler genellikle 135 gr parlak kuşe kağıda basılır; istenildiği takdirde farklı kağıt gramajı ve ebatlarda da üretim yapılabilmektedir.
              </p>
              <p className="text-lg leading-relaxed">
                Afiş bastırma talepleri genellikle emlakçılar, restoranlar, etkinlik organizatörleri, belediyeler, mağazalar, okullar ve spor kulüpleri tarafından yapılır. <strong className="font-black">MAVİ BASIM MATBAA & REKLAM</strong> olarak afiş baskı konusunda Türkiye’nin en hızlı ve en uygun fiyatlı matbaasıyız.
              </p>
            </div>
          </section>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "35x50 cm", desc: "Küçük vitrin ve iç mekan için idealdir." },
              { title: "50x70 cm", desc: "Orta büyüklükteki duvarlar için tercih edilir." },
              { title: "70x100 cm", desc: "Büyük alan ve uzak mesafe görünürlüğü." },
              { title: "135 gr Kuşe", desc: "Yüksek renk tutumu ve dayanıklılık." }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                <h3 className="text-xl font-black text-primary mb-2">{feature.title}</h3>
                <p className="text-sm font-medium text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Afiş Tasarımı Nasıl Yapılır? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Afiş Tasarımı Nasıl Yapılır?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Hedef & Konsept Belirleme", desc: "Logo, slogan, iletişim bilgileri ve görsel detayları belirleyin." },
                { step: "2", title: "İçerik ve Görsel Planlama", desc: "Ana görsel, metin, logo ve çağrı cümlesi yerleştirilir." },
                { step: "3", title: "Teknik Hazırlık", desc: "Dosya PDF, CMYK, 300 dpi ve her taraftan +3 mm taşma payı." },
                { step: "4", title: "Onay & Baskı", desc: "Tasarımınızı gönderin, onay ile üretim başlar." }
              ].map((item, idx) => (
                <div key={idx} className="relative p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <span className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-black text-black mb-3 mt-2">{item.title}</h3>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Afişte Sık Yapılan 5 Hata */}
          <section className="bg-red-50 p-8 md:p-12 rounded-[32px] border border-red-100">
            <h2 className="text-2xl md:text-3xl font-black text-red-600 mb-8 uppercase tracking-tight">Afişte Sık Yapılan 5 Hata</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Logo veya iletişim bilgileri eksikliği",
                "Yanlış ebat seçimi",
                "Düşük kaliteli kağıt kullanımı",
                "Baskı renk uyumsuzluğu",
                "Tasarımın çok kalabalık olması"
              ].map((error, idx) => (
                <li key={idx} className="flex items-center gap-3 text-lg font-bold text-red-900">
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                  {error}
                </li>
              ))}
            </ul>
          </section>

          {/* Related Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Broşür Fiyatları", desc: "Renkli broşür baskıları ile tanıtımlarınızı uçurun.", path: "/brosur" },
              { title: "Sıvama Kartvizit", desc: "Lüks, dayanıklı and akılda kalıcı premium kartlar.", path: "/kartvizit" },
              { title: "Kartvizit Fiyatları", desc: "Hızlı, kaliteli and ekonomik kurumsal kimlik.", path: "/kartvizit" },
              { title: "Karton Çanta", desc: "Şık, çevre dostu and unutulmaz çantalar.", path: "/karton-canta" }
            ].map((product, idx) => (
              <Link key={idx} to={product.path} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
                <h3 className="text-lg font-black text-black mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                <p className="text-sm font-medium text-gray-500">{product.desc}</p>
              </Link>
            ))}
          </div>

          <AgencyDiscountCTA />
        </div>
      </div>
      <ProductSEOSection categoryKey="afis" />
    </div>
  );
};

const AntetliPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Antetli Kağıt");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Antetli Kağıt Baskı | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Kurumsal kimliğinizi tamamlayan antetli kağıt baskı çözümleri." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Antetli Kağıt</h1>
            <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
            <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">90 gr. 1. Hamur - Renkli</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px]">
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th className="p-4 w-40"></th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EBAT</th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {ANTETLI_DATA.map((category, cIdx) => {
                  const chunks = [];
                  let currentChunk = [];
                  let lastEbat = null;

                  category.items.forEach((item) => {
                    if (lastEbat !== null && item.ebat !== lastEbat) {
                      chunks.push(currentChunk);
                      currentChunk = [];
                    }
                    currentChunk.push(item);
                    lastEbat = item.ebat;
                  });
                  if (currentChunk.length > 0) chunks.push(currentChunk);

                  return (
                    <React.Fragment key={cIdx}>
                      {chunks.map((chunk, chunkIdx) => (
                        <React.Fragment key={`${cIdx}-${chunkIdx}`}>
                          {chunk.map((item, itemIdx) => (
                            <tr key={`${cIdx}-${chunkIdx}-${itemIdx}`} className="border-b border-gray-100 hover:bg-primary/5 transition-all cursor-default group">
                              {itemIdx === 0 && (
                                <td 
                                  rowSpan={chunk.length}
                                  className="bg-white border-r border-gray-200 p-1.5 w-48 text-center align-middle"
                                >
                                  <div className="flex flex-col items-center justify-center">
                                    <span className="text-[18px] font-black text-black uppercase mb-0.5 leading-tight">
                                      {category.cat.includes('Antetli') ? 'ANTETLİ' : category.cat.toUpperCase()}
                                    </span>
                                    <span className="text-[21px] font-black text-[#f27d26] mb-0.5 leading-tight">
                                      {category.subTitle.split(' ')[0]} {category.subTitle.split(' ')[1]}
                                    </span>
                                    <span className="text-[11px] font-bold text-[#718096] uppercase tracking-tight text-center leading-tight">
                                      {category.subTitle.split(' ').slice(2).join(' ')}
                                      {(category as any).desc && <><br />{(category as any).desc}</>}
                                    </span>
                                  </div>
                                </td>
                              )}
                              <td className="p-3.5 text-center border-r border-gray-100">
                                <span className="inline-block px-3 py-1 rounded border border-[#cbd5e0] bg-[#edf2f7] text-[#2d3748] font-bold text-[14px] whitespace-nowrap">
                                  {item.ebat}
                                </span>
                              </td>
                              <td className="p-3.5 text-center font-bold text-[#2d3748] border-r border-gray-100 group-hover:text-primary transition-colors">
                                {item.code}
                              </td>
                              <td className="p-3.5 text-center text-[#4a5568] font-medium border-r border-gray-100">
                                <span className="group-hover:font-bold transition-all">
                                  {item.desc.split('(')[0].replace(/\s[Aa][3457]\b/g, '').trim()}
                                </span>
                              </td>
                              <td className="p-3.5 text-center text-[#4a5568] font-medium border-r border-gray-100 transition-colors">
                                <span className="font-bold">{item.miktar.split(' ')[0]}</span> {item.miktar.split(' ')[1]}
                              </td>
                              <td className="p-3.5 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[16px] transition-colors">
                                {item.price}
                              </td>
                              <td className="p-3.5 text-center">
                                <button 
                                  onClick={() => openWhatsApp(item)}
                                  className="bg-primary text-white hover:bg-secondary transition-all p-2 rounded-lg shadow-sm scale-95 group-hover:scale-100"
                                >
                                  <ShoppingCart size={20} />
                                </button>
                              </td>
                            </tr>
                          ))}
                          {(chunkIdx < chunks.length - 1 || cIdx < ANTETLI_DATA.length - 1) && (
                            <tr className="border-b-[3px] border-[#cbd5e0]">
                              <td colSpan={7} className="h-0 p-0"></td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <FireWarning />
        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* Quick Info Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Standart Ebat", value: "A4 (Ofis Uyumlu)" },
              { label: "Kağıt Kalitesi", value: "80 gr 1. Hamur" },
              { label: "Baskı Türü", value: "Tek, 2 veya Full Renk" }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                <h3 className="text-primary font-black uppercase text-xs mb-1 tracking-widest">{item.label}</h3>
                <p className="text-xl font-black text-black">{item.value}</p>
              </div>
            ))}
          </section>

          {/* Antetli Kağıt Tasarımı ve Farkımız */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Antetli Kağıt Tasarımı ve Farkımız</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                  Antetli kağıt, kurumsal belgelerin prestijini belirleyen unsurdur. <span className="text-primary font-bold"><strong>Mavi Basım Matbaa & Reklam</strong></span> olarak antetli kağıt baskı tasarımında şu üstünlükleri sunuyoruz:
                </p>
                <ul className="space-y-4">
                  {[
                    "Logo, unvan, vergi no, adres, telefon, web sitesi baskısı",
                    "80 gr 1. hamur standart (Farklı gramaj seçenekleri mevcut)",
                    "Tek renk, 2 renk veya full renk CMYK baskı",
                    "Yüksek hacimli üretim – stok yönetimi kolay",
                    "Aynı gün tasarım onayı – hızlı onay süreci"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-black font-bold">
                      <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 inline-block">
                  <p className="text-black font-bold">
                    🎨 Tasarım ücretimiz 250 TL'dir. Hazır tasarım getirirseniz ücretsiz baskı yapıyoruz!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Antetli Kağıtta Sık Yapılan 5 Hata */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Antetli Kağıtta Sık Yapılan 5 Hata</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { step: "1", title: "Bilgi Eksikliği", desc: "Logo veya iletişim bilgileri eksik → Kurumsal kimlik zayıf kalır." },
                { step: "2", title: "Yanlış Gramaj", desc: "Yanlış gramaj seçimi → Kalite ve uyum sorunu yaratır." },
                { step: "3", title: "Renk Uyumsuzluğu", desc: "Baskı renk uyumsuzluğu → Marka tutarsızlığına yol açar." },
                { step: "4", title: "Kalabalık Tasarım", desc: "Tasarım kalabalık → Okunabilirlik düşer." },
                { step: "5", title: "Düşük Kağıt Kalitesi", desc: "Kağıt kalitesi düşük → Profesyonellik azalır." }
              ].map((item, idx) => (
                <div key={idx} className="bg-red-50 p-6 rounded-2xl border border-red-100 relative pt-12">
                  <span className="absolute top-4 left-6 text-5xl font-black text-red-200/40">{item.step}</span>
                  <h3 className="font-black text-red-700 mb-2 relative z-10">{item.title}</h3>
                  <p className="text-sm font-medium text-red-900/70 leading-relaxed relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Antetli Kağıt Tasarımı Nasıl Yapılır? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">Antetli Kağıt Tasarımı Nasıl Yapılır?</h2>
            <p className="text-center text-gray-500 font-medium mb-12 text-lg">4 Adımda Profesyonel Sonuç</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Hedef & Konsept", desc: "Logo, unvan, adres, telefon, vergi no gibi bilgileri belirleyin." },
                { step: "2", title: "Görsel Planlama", desc: "Üst kısım kurumsal kimlik alanı, alt kısım boş bırakılır." },
                { step: "3", title: "Teknik Hazırlık", desc: "Dosya PDF, CMYK, 300 dpi. Her taraftan +3 mm taşma." },
                { step: "4", title: "Onay & Baskı", desc: "Tasarımınızı gönderin → aynı gün tasarım onayı ile üretim başlar." }
              ].map((item, idx) => (
                <div key={idx} className="relative p-8 bg-white rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black text-xl mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-black text-black mb-4">{item.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Kurumsal Kimliğinizi Tamamlayın */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Kurumsal Kimliğinizi Tamamlayın</h2>
            <p className="text-gray-500 font-medium mb-8">Diğer Ürünlerimize Göz Atın</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Diplomat Zarf", desc: "Resmi yazışmalar için şık ve prestijli.", path: "/zarf" },
                { title: "Özel Zarf Baskı", desc: "Kişiye özel ve akılda kalıcı çözümler.", path: "/zarf" },
                { title: "Torba Zarf", desc: "Büyük evrak gönderimleri için dayanıklı.", path: "/zarf" },
                { title: "Katalog Baskı", desc: "Ürünlerinizi en iyi şekilde tanıtın.", path: "/katalog" }
              ].map((product, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary transition-colors group">
                  <h3 className="font-black text-black mb-2">{product.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 font-medium">{product.desc}</p>
                  <Link to={product.path} className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                    Fiyatları Gör <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <AgencyDiscountCTA />
        </div>
      </div>
      <ProductSEOSection categoryKey="antetli_kagit" />
    </div>
  );
};

const DosyalarPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Dosyalar");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Cepli Dosya Baskı | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Profesyonel cepli dosya baskı hizmetleri. Evraklarınızı şık bir şekilde sunun." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Dosyalar</h1>
            <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
            <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">Kapalı Hali 22.5x31 cm. Renkli - 1.000 Adet</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-visible relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px]">
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th className="p-4 w-10"></th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {DOSYALAR_DATA.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group">
                    {idx === 0 && (
                      <td 
                        rowSpan={DOSYALAR_DATA.length}
                        className="bg-primary text-white font-black text-center p-1 w-10 border-r border-white/10"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        <span className="tracking-[0.1em] uppercase text-[10px]">DOSYALAR</span>
                      </td>
                    )}
                    <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors">
                      {item.code}
                    </td>
                    <td className="p-3 text-center font-medium text-black border-r border-gray-100">{item.miktar}</td>
                    <td className="p-3 text-center text-black font-medium border-r border-gray-100">
                      {item.desc}
                      {item.code !== 'PD' && <FeatureTooltip code={item.code} />}
                    </td>
                    <td className="p-3 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[14px] md:text-[16px] transition-colors">{item.price}</td>
                    <td className="p-3 text-center">
                      <button onClick={() => openWhatsApp(item)} className="bg-primary text-white hover:bg-secondary transition-all p-2 rounded-lg shadow-sm scale-90 group-hover:scale-100">
                        <ShoppingCart size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-black font-black text-sm uppercase tracking-tight">Fiyatlara kulakçık yapıştırma dahildir.</p>
        </div>

        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* Tasarımı ve Farkımız */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Tasarımı ve Farkımız</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                  Cepli dosya, kurumsal sunumların prestijini belirleyen unsurdur. <span className="text-primary font-bold"><strong>Mavi Basım Matbaa & Reklam</strong></span> olarak cepli dosya baskı tasarımında şu üstünlükleri sunuyoruz:
                </p>
                <ul className="space-y-4">
                  {[
                    "Logo, unvan, adres, telefon baskısı",
                    "300 gr Amerikan Bristol veya 350 gr mat kuşe seçenekleri",
                    "Tek renk, 2 renk veya full renk CMYK baskı",
                    "Kabartma, lak, varak, yaldız gibi ekstra işlemler",
                    "Aynı gün tasarım onayı – hızlı onay süreci"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-black font-bold">
                      <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 inline-block">
                  <p className="text-black font-bold">
                    🎨 Tasarım ücretimiz 250 TL'dir. Hazır tasarım getirirseniz ücretsiz baskı yapıyoruz!
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Printer size={120} className="text-primary/20 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-8 left-8 right-8 bg-white p-6 rounded-2xl shadow-xl">
                  <p className="text-xs font-black text-primary uppercase mb-1 tracking-widest">Hızlı Üretim</p>
                  <p className="text-lg font-black text-black">Aynı Gün Tasarım Onayı</p>
                </div>
              </div>
            </div>
          </section>

          {/* Cepli Dosyada Sık Yapılan 5 Hata */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Cepli Dosyada Sık Yapılan 5 Hata</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { step: "1", title: "Bilgi Eksikliği", desc: "Logo veya iletişim bilgileri eksik → Kurumsal kimlik zayıf kalır." },
                { step: "2", title: "Yanlış Ebat", desc: "Yanlış ebat seçimi → Sunum uyumu bozulur." },
                { step: "3", title: "Düşük Kalite", desc: "Düşük kaliteli kağıt → Prestij kaybına neden olur." },
                { step: "4", title: "Renk Uyumsuzluğu", desc: "Baskı renk uyumsuzluğu → Marka tutarsızlığı yaratır." },
                { step: "5", title: "Hatalı Cep", desc: "Cep tasarımı hatalı → Belgeler düşer ve düzensiz görünür." }
              ].map((item, idx) => (
                <div key={idx} className="bg-red-50 p-6 rounded-2xl border border-red-100 relative pt-12">
                  <span className="absolute top-4 left-6 text-5xl font-black text-red-200/40">{item.step}</span>
                  <h3 className="font-black text-red-700 mb-2 relative z-10">{item.title}</h3>
                  <p className="text-sm font-medium text-red-900/70 leading-relaxed relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Kurumsal Kimliğinizi Güçlendirin */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Kurumsal Kimliğinizi Güçlendirin</h2>
            <p className="text-gray-500 font-medium mb-8">Diğer Ürünlerimize Göz Atın</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Diplomat Zarf", desc: "Resmi yazışmalar için şık ve prestijli.", path: "/zarf" },
                { title: "Karton Çanta", desc: "Alışverişi markanıza dönüştürün.", path: "/karton-canta" },
                { title: "Torba Zarf", desc: "Büyük evrak gönderimleri için dayanıklı.", path: "/zarf" },
                { title: "Katalog Baskı", desc: "Ürünlerinizi en iyi şekilde tanıtın.", path: "/katalog" }
              ].map((product, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-primary transition-colors group">
                  <h3 className="font-black text-black mb-2">{product.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 font-medium">{product.desc}</p>
                  <Link to={product.path} className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                    Fiyatları Gör <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Banner */}
          <section className="bg-black rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full -ml-48 -mb-48 blur-3xl" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                Matbaa ve Reklam Ajanslarına Özel İndirim!
              </h2>
              <p className="text-xl text-gray-400 mb-10 font-medium leading-relaxed">
                Toptan siparişlerde ekstra avantajlar ve ajanslara özel fiyat listemiz için hemen iletişime geçin. <span className="text-white"><strong>Mavi Basım Matbaa & Reklam</strong></span> olarak 2026'da da en uygun fiyatlı cepli dosya çözümlerini sunuyoruz.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl shadow-primary/20"
                >
                  <ShoppingCart size={24} />
                  Hemen Teklif Al
                </a>
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  <Zap size={24} />
                  Ajans İndirimi
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ProductSEOSection categoryKey="dosya" />
    </div>
  );
};

const EtiketPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail({ ...item, miktar: "1000 Adet" }, "Etiket");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Etiket Baskı | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Her türlü yüzeye uygun etiket baskı çözümleri. Rulo ve tabaka etiket seçenekleri." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Etiket</h1>
            <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
            <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">90 gr. Kuşe Çıkartma - Renkli - 1.000 Adet</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-visible relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px]">
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th className="p-4 w-10"></th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EBAT</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {ETIKET_DATA.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group">
                    {idx === 0 && (
                      <td 
                        rowSpan={ETIKET_DATA.length}
                        className="bg-secondary text-white font-black text-center p-1 w-10 border-r border-white/10"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        <span className="tracking-[0.1em] uppercase text-[10px]">ETİKET</span>
                      </td>
                    )}
                    <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors">{item.code}</td>
                    <td className="p-3 text-center font-medium text-black border-r border-gray-100">{item.ebat}</td>
                    <td className="p-3 text-center text-black font-medium border-r border-gray-100">
                      {item.desc}
                      <FeatureTooltip code={item.code} />
                    </td>
                    <td className="p-3 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[14px] md:text-[16px] transition-colors">{item.price}</td>
                    <td className="p-3 text-center">
                      <button onClick={() => openWhatsApp(item)} className="bg-primary text-white hover:bg-secondary transition-all p-2 rounded-lg shadow-sm scale-90 group-hover:scale-100">
                        <ShoppingCart size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <FireWarning />

        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* Etiket Baskı Nedir? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">Etiket Baskı Fiyatları | Özel & Yapışkanlı Etiket</h2>
            <div className="prose prose-slate max-w-none text-black">
              <p className="text-lg leading-relaxed mb-6">
                <strong className="font-black">MAVİ BASIM MATBAA & REKLAM</strong> olarak etiket baskı ve sticker üretiminde Türkiye’nin en çok tercih edilen matbaasıyız. Ürünlerinizi öne çıkarmak, ambalajlarınızı tamamlamak veya kampanyalarınızı duyurmak için yüksek kaliteli etiket çözümleri üretiyoruz.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Etiket baskı fiyatları ve etiket bastırma taleplerinde en rekabetçi seçenekleri sunuyoruz. Özellikle parlak selefon etiket modelleri ile canlı ve dikkat çekici sonuçlar elde edebilirsiniz. Standart olarak kuşe çıkartma etiket (parlak selefon arkası yapışkanlı) kullanıyoruz; mat selefon istenirse özel fiyat alınır. Etiket sipariş veren firmalar için profesyonel tasarım desteği ve hızlı teslimat sağlıyoruz.
              </p>
              <p className="text-lg leading-relaxed">
                Etiket baskı, ürün tanıtımı, kutu etiketleme, ambalaj etiketleme ve kampanya duyurularında en etkili araçlardan biridir. Online etiket baskı siparişleriniz için kolay sistemimiz mevcut. Ucuz etiket baskı arayanlar için ekonomik seçeneklerimiz var. 8x5 cm parlak etiket ve A5 parlak etiket modelleri en çok talep edilen boyutlardır. Kutu etiketi parlak selefon ile ürünleriniz daha profesyonel görünür.
              </p>
            </div>
          </section>

          {/* Etiket Baskı Özellikleri & Sık Yapılan Hatalar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
              <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tight">Etiket Baskı Özellikleri</h2>
              <ul className="space-y-4">
                {[
                  { label: "Ebat", value: "83x51 mm düz kesim (standart) – istenildiği takdirde özel ebat ve kesim yapılabilir" },
                  { label: "Kağıt", value: "Kuşe çıkartma (parlak selefon arkası yapışkanlı) – mat selefon istenirse özel fiyat alınır" },
                  { label: "Baskı", value: "Çift taraflı full renk CMYK (canlı ve net sonuçlar)" },
                  { label: "Adet", value: "1.000 – 10.000 adet (promosyon ve ürün etiketleme için ideal)" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                    <p className="text-lg font-bold text-black">
                      <span className="text-primary">{item.label}:</span> {item.value}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-red-50 p-8 rounded-[32px] border border-red-100">
              <h2 className="text-2xl font-black text-red-600 mb-6 uppercase tracking-tight">Etikette Sık Yapılan 5 Hata</h2>
              <ul className="space-y-4">
                {[
                  { title: "Logo veya ürün bilgileri eksik", desc: "Etki azalır" },
                  { title: "Yanlış ebat seçimi", desc: "Ürün uyumu bozulur" },
                  { title: "Düşük kaliteli kağıt", desc: "Yapışma veya yırtılma sorunu" },
                  { title: "Baskı renk uyumsuzluğu", desc: "Marka tutarsızlığı" },
                  { title: "Tasarım kalabalık", desc: "Okunabilirlik düşer" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0" />
                    <p className="text-lg font-bold text-red-900">
                      {item.title} <span className="text-red-600 font-medium">→ {item.desc}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Etiket Baskı Tasarımı Nasıl Yapılır? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Etiket Baskı Tasarımı Nasıl Yapılır?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Hedef & Konsept", desc: "Kaç adet? Logo, ürün adı, barkod, fiyat gibi detayları belirleyin." },
                { step: "2", title: "İçerik & Görsel", desc: "Ürün görseli, logo, fiyat vurgusu yerleşimi." },
                { step: "3", title: "Teknik Hazırlık", desc: "Dosya PDF, CMYK, 300 dpi. Her taraftan +3 mm taşma." },
                { step: "4", title: "Onay & Baskı", desc: "Tasarımınızı gönderin → aynı gün onay ile üretim başlar." }
              ].map((item, idx) => (
                <div key={idx} className="relative p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <span className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-black text-black mb-3 mt-2">{item.title}</h3>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Products */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">Kurumsal Kimliğinizi Güçlendirin!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Kartvizit", desc: "Profesyonel ilk izlenim bırakın.", path: "/kartvizit" },
                { title: "Broşür", desc: "Ürünlerinizi ve hizmetlerinizi tanıtın.", path: "/brosur" },
                { title: "Magnet", desc: "Markanızı hatırlatın.", path: "/magnet" },
                { title: "Diplomat Zarf", desc: "Resmi yazışmalarınızı prestijli hale getirin.", path: "/zarf" }
              ].map((product, idx) => (
                <Link key={idx} to={product.path} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
                  <h3 className="text-lg font-black text-black mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                  <p className="text-sm font-medium text-gray-500">{product.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Agency Discount CTA */}
          <section className="bg-black rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
                Matbaa ve Reklam Ajanslarına Özel İndirim!
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 font-medium">
                Matbaa ve reklam ajanslarına özel indirimlerimiz ile etiket baskı fiyatlarımız en uygun seviyede. Toptan siparişlerde ekstra avantajlar – detaylı bilgi için hemen iletişime geçin!
              </p>
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl shadow-primary/20"
              >
                <Zap size={24} />
                Ajans Kaydı Başlat
              </a>
            </div>
          </section>
        </div>
      </div>
      <ProductSEOSection categoryKey="etiket" />
    </div>
  );
};

const OtoPaspasPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Oto Paspas");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Oto Paspas Baskı | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Oto servisleri için kağıt oto paspas baskı hizmetleri." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Oto Paspas</h1>
            <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
            <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">34x49 cm Tek Renk - 85 gr. Kart</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-visible relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px]">
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th className="p-4 w-10"></th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {OTO_PASPAS_DATA.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group">
                    {idx === 0 && (
                      <td 
                        rowSpan={OTO_PASPAS_DATA.length}
                        className="bg-primary text-white font-black text-center p-1 w-10 border-r border-white/10"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        <span className="tracking-[0.1em] uppercase text-[10px]">OTO PASPAS</span>
                      </td>
                    )}
                    <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors">{item.code}</td>
                    <td className="p-3 text-center text-black font-medium border-r border-gray-100">
                      85 gr. Kart
                      <FeatureTooltip code={item.code} />
                    </td>
                    <td className="p-3 text-center font-medium text-black border-r border-gray-100">{item.miktar}</td>
                    <td className="p-3 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[14px] md:text-[16px] transition-colors">{item.price}</td>
                    <td className="p-3 text-center">
                      <button onClick={() => openWhatsApp(item)} className="bg-primary text-white hover:bg-secondary transition-all p-2 rounded-lg shadow-sm scale-90 group-hover:scale-100">
                        <ShoppingCart size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <FireWarning />
      </div>
      <ProductSEOSection categoryKey="otopaspas" />
    </div>
  );
};

const MagnetPage = () => {
  const { openProductDetail, addToCart, setIsCartOpen } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const calculatePrice = (w: number, h: number) => {
    if (w < 5 || h < 5) return 0;
    return w * h * 23;
  };

  const openWhatsApp = (item: any, customData?: any) => {
    if (customData) {
      addToCart({
        id: Math.random().toString(36).substr(2, 9),
        name: item.desc,
        code: item.code,
        basePrice: customData.total,
        baseQuantity: 1000,
        quantity: 1000,
        category: "Magnet",
        description: `Ölçü: ${customData.w}x${customData.h} cm`,
      });
      setIsCartOpen(true);
      return;
    }
    openProductDetail({ ...item, miktar: "1000 Adet" }, "Magnet");
  };

  const handleCustomOrder = () => {
    if (width < 5 || height < 5) return;
    const total = calculatePrice(width, height);
    openWhatsApp(selectedItem || { code: 'MAG3', desc: 'Özel Magnet' }, { w: width, h: height, total });
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Magnet Baskı Fiyatları | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Özel kesim magnet baskı hizmetleri. Buzdolabı magneti, 48x68mm standart ve özel ebat magnet fiyatları. 1000 adet magnet baskı ile markanızı evlere taşıyın." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Magnet Baskı</h1>
            <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
            <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">60 Mikron - Renkli - 1000 Adet</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-visible relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px]">
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th className="p-4 w-10"></th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EBAT</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">AÇIKLAMA</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {MAGNET_DATA[0].items.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group">
                    {idx === 0 && (
                      <td 
                        rowSpan={MAGNET_DATA[0].items.length}
                        className="bg-primary text-white font-black text-center p-1 w-10 border-r border-white/10"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        <span className="tracking-[0.1em] uppercase text-[10px]">MAGNET</span>
                      </td>
                    )}
                    <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors">{item.code}</td>
                    <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.miktar}</td>
                    <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.ebat}</td>
                    <td className={`p-3 text-center font-medium border-r border-gray-100 ${item.code === 'MAG3' ? 'text-red-600' : 'text-black'}`}>
                      {item.desc}
                      <FeatureTooltip code={item.code} />
                    </td>
                    <td className="p-3 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[14px] md:text-[16px] transition-colors">{item.price}</td>
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => {
                          if (item.code === 'MAG3') {
                            setSelectedItem(item);
                            setIsModalOpen(true);
                          } else {
                            openWhatsApp(item);
                          }
                        }} 
                        className="bg-primary text-white hover:bg-secondary transition-all p-2 rounded-lg shadow-sm scale-90 group-hover:scale-100"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <FireWarning />

        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* Highlights Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Kalıcı Görünürlük", desc: "Buzdolabı üzerinde yıllarca reklam", icon: <Zap className="text-primary" /> },
              { title: "0.40 Mikron", desc: "Standart ve dayanıklı mıknatıs", icon: <Zap className="text-primary" /> },
              { title: "Özel Kesim", desc: "Oval veya istediğiniz şekilde kesim", icon: <Zap className="text-primary" /> },
              { title: "Ofset Baskı", desc: "Canlı renkler ve yüksek kalite", icon: <Zap className="text-primary" /> }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-black text-black uppercase text-sm mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </section>

          {/* Magnet Baskı Nedir? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">Magnet Baskı Nedir ve Neden Tercih Edilir?</h2>
            <div className="prose prose-slate max-w-none text-black">
              <p className="text-lg leading-relaxed mb-6">
                Magnet baskı, etkili promosyon ve reklam aracıdır. Buzdolabı magneti olarak kalıcı görünürlük sağlar, mıknatıs üzerine ofset baskı ile logo ve iletişim bilgisi eklenir. Magnet bastırma ile markanızı evlere taşır, ucuz magnet baskı ile bütçenizi korursunuz. <strong className="font-black text-primary">Mavi Basım Matbaa & Reklam</strong> olarak magnet hizmetini en uygun fiyata sunuyoruz. Tasarımı hazır gelen magnetler anında baskıya alınır. 1000 adet ve üzeri siparişlerde magnet fiyatları ekonomik seviyeye iner.
              </p>
            </div>
          </section>

          {/* Magnet Tasarımı Nasıl Yapılır? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">Magnet Tasarımı Nasıl Yapılır?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Logo & Bilgi Planlama", desc: "Firma adı, telefon, web, slogan gibi temel bilgileri belirleyin." },
                { step: "2", title: "Ebat & Şekil Seçimi", desc: "Standart 4,6x6,7 cm, oval veya özel kesim seçeneklerinden birini seçin." },
                { step: "3", title: "Baskı & Onay", desc: "CMYK renkli baskı ve PDF kontrolü sonrası üretime geçilir." }
              ].map((item, idx) => (
                <div key={idx} className="relative p-8 bg-white rounded-3xl border border-gray-100 shadow-xl text-center group hover:border-primary transition-all">
                  <span className="inline-flex w-12 h-12 bg-black text-white rounded-2xl items-center justify-center font-black text-xl mb-6 group-hover:bg-primary transition-colors">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-black text-black mb-4">{item.title}</h3>
                  <p className="text-sm font-medium text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <div className="inline-block p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-black font-bold">🎨 Tasarımınız yoksa 200 TL ile magnet tasarımınızı hazırlıyoruz. Logolarınızın olması yeterlidir.</p>
              </div>
            </div>
          </section>

          {/* Malzeme Özellikleri & Türler */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="bg-black rounded-[40px] p-8 md:p-12 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <h2 className="text-2xl font-black mb-8 uppercase tracking-tight relative z-10">Malzeme & Teknik Özellikler</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
                {[
                  { label: "Mıknatıs", value: "0.40 Mikron (Standart)" },
                  { label: "Baskı Kağıdı", value: "250 gr Amerikan Bristol" },
                  { label: "Kaplama", value: "Parlak Selefon (Dahil)" },
                  { label: "Baskı Türü", value: "Ofset CMYK Baskı" }
                ].map((item, idx) => (
                  <div key={idx} className="border-l-2 border-primary pl-4">
                    <p className="text-primary font-black uppercase text-xs tracking-widest mb-1">{item.label}</p>
                    <p className="font-bold text-lg">{item.value}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-gray-400 text-sm font-medium leading-relaxed relative z-10">
                CMYK tam renkli baskı ile logolarınız vurgulanır. Sıvama sonrası özel kesim ve paketleme işlemleri titizlikle yapılır.
              </p>
            </section>

            <section className="bg-white p-8 rounded-[40px] border border-gray-200 shadow-2xl overflow-hidden">
              <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tight">Hangi Magnet Türü Sizin İçin En Uygun?</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-100">
                      <th className="py-3 font-black text-primary uppercase text-xs tracking-widest">TÜR</th>
                      <th className="py-3 font-black text-primary uppercase text-xs tracking-widest">KİMLER TERCİH EDER?</th>
                      <th className="py-3 font-black text-primary uppercase text-xs tracking-widest">KULLANIM ALANLARI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { type: "Oval Kesim", who: "Kebapçı, dönerci, pideci", area: "Menü, adres, telefon" },
                      { type: "Özel Kesim", who: "Çiğ köfteci, market", area: "Dekoratif, promosyon" },
                      { type: "Standart", who: "Eczane, su bayisi", area: "Acil telefon, hatırlatma" }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 font-black text-black text-sm">{row.type}</td>
                        <td className="py-4 text-xs font-bold text-gray-600">{row.who}</td>
                        <td className="py-4 text-xs font-bold text-gray-500">{row.area}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-[11px] text-gray-400 font-medium italic">
                * Her magnet sipariş projesinde %100 özgün tasarım sunuyoruz. Markanıza uygun benzersiz görseller ile dikkat çekici buzdolabı magneti hazırlıyoruz.
              </p>
            </section>
          </div>

          {/* Üretim Süreci & Önemli Bilgiler */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Üretim Süreci</h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "Tasarım Onayı",
                  "Ofset Baskı",
                  "Sıvama",
                  "Parlak Selefon",
                  "Özel Kesim",
                  "Paketleme"
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm group hover:border-primary transition-all">
                    <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-black text-sm group-hover:bg-primary transition-colors">{idx + 1}</span>
                    <span className="font-bold text-black uppercase text-xs tracking-wider">{step}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-red-50 p-8 rounded-[40px] border border-red-100">
              <h2 className="text-2xl font-black text-red-600 mb-6 uppercase tracking-tight flex items-center gap-3">
                <Zap size={24} />
                Önemli Bilgiler
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0" />
                  <p className="text-lg font-black text-red-900 leading-tight uppercase tracking-tight">
                    ⚠️ Magnet üretim süremiz 6 iş günüdür. Acil baskı yapılmamaktadır.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 shrink-0" />
                  <p className="text-sm font-bold text-red-800">
                    Tasarımınız yoksa 200 TL ile magnet tasarımınızı hazırlıyoruz. Logolarınızın olması yeterlidir.
                  </p>
                </li>
              </ul>
            </section>
          </div>

          {/* Related Products */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">Markanızı Güçlendirin!</h2>
            <p className="text-center text-gray-500 font-medium mb-8">Magnet siparişinizin yanına bunları da ekleyebilirsiniz.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "El İlanı & Broşür", desc: "Geniş kitlelere ulaşmak için etkili tanıtım.", path: "/el-ilani" },
                { title: "Kartvizit", desc: "Profesyonel imaj yaratmak için vazgeçilmez.", path: "/kartvizit" },
                { title: "Etiket", desc: "Ürünlerinizi markalamak için şık çözümler.", path: "/etiket" },
                { title: "Karton Çanta", desc: "Logolu ve şık ambalaj çözümleri.", path: "/karton-canta" }
              ].map((product, idx) => (
                <Link key={idx} to={product.path} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
                  <h3 className="text-lg font-black text-black mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                  <p className="text-xs font-medium text-gray-500 mb-4">{product.desc}</p>
                  <span className="text-primary font-black text-[10px] uppercase tracking-widest group-hover:text-secondary transition-colors">Fiyatları Gör →</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Agency Discount CTA */}
          <section className="bg-black rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full -ml-48 -mb-48 blur-3xl" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                Matbaa ve Reklam Ajanslarına Özel İndirim!
              </h2>
              <p className="text-xl text-gray-400 mb-10 font-medium leading-relaxed">
                Matbaa ve reklam ajanslarına özel indirimlerimiz ile magnet fiyatlarımız en uygun seviyede. <span className="text-white"><strong>Mavi Basım Matbaa & Reklam</strong></span> olarak magnet fiyatları 2026 ile şeffaf, hızlı ve kaliteli hizmet sunuyoruz.
              </p>
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl shadow-primary/20"
              >
                <Zap size={24} />
                Ajans Fiyatı Al
              </a>
            </div>
          </section>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-3 bg-gray-100 hover:bg-red-500 hover:text-white rounded-2xl transition-all z-10 group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform" />
              </button>
              <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tight">Özel Magnet Hesaplama</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-black uppercase mb-2">En (cm)</label>
                  <input 
                    type="number" 
                    value={width} 
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-primary outline-none transition-all font-bold text-lg"
                    min="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black uppercase mb-2">Boy (cm)</label>
                  <input 
                    type="number" 
                    value={height} 
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-primary outline-none transition-all font-bold text-lg"
                    min="5"
                  />
                </div>
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-secondary uppercase">Toplam Fiyat:</span>
                    <span className="text-2xl font-black text-primary">
                      {width >= 5 && height >= 5 ? `${calculatePrice(width, height)} ₺` : '---'}
                    </span>
                  </div>
                  { (width < 5 || height < 5) && (
                    <p className="text-[11px] text-red-500 mt-2 font-bold uppercase tracking-tight animate-pulse">
                      * Minimum ölçü 5x5 cm olmalıdır.
                    </p>
                  )}
                  <p className="text-[10px] text-black mt-2 italic">* En x Boy x 23 ₺ olarak hesaplanır.</p>
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all"
                  >
                    İPTAL
                  </button>
                  <button 
                    onClick={handleCustomOrder}
                    disabled={width < 5 || height < 5}
                    className={`flex-1 py-4 rounded-2xl font-bold shadow-lg transition-all ${
                      width < 5 || height < 5 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-primary text-white shadow-primary/20 hover:bg-secondary'
                    }`}
                  >
                    SİPARİŞ VER
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ProductSEOSection categoryKey="magnet" />
    </div>
  );
};









const AmerikanServisPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail({ ...item, miktar: "2000 Adet" }, "Amerikan Servis");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Amerikan Servis Baskı | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Restoran ve kafeler için özel tasarım kağıt amerikan servis baskı hizmetleri." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Amerikan Servis</h1>
            <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
            <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">Tek Yön Renkli Baskı - 2000 Adet</p>
          </div>
        </div>

        <div className="border border-gray-300 rounded-xl overflow-visible shadow-xl relative z-10">
          <div className="bg-black text-white p-3 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-xl font-bold uppercase tracking-tight">Amerikan Servis</h2>
            <div className="text-right text-[10px] md:text-xs font-medium">
              <p>Tek Yön Renkli Baskı - 2000 Adet</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans">
              <thead>
                <tr className="bg-black text-white font-black uppercase tracking-tight">
                  <th className="p-2 border border-gray-300">KOD</th>
                  <th className="p-2 border border-gray-300">FİYAT</th>
                  <th className="p-2 border border-gray-300">EBAT</th>
                  <th className="p-2 border border-gray-300">ÖZELLİKLER</th>
                  <th className="p-2 border border-gray-300">EKSTRA</th>
                  <th className="p-2 border border-gray-300">EKSTRA FİYAT</th>
                  <th className="p-2 border border-gray-300 w-16">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {AMERIKAN_SERVIS_DATA[0].items.map((item, idx) => (
                  <tr key={idx} className="bg-white hover:bg-primary/5 transition-colors">
                    <td className="p-2 border border-gray-300 text-center font-bold text-primary">{item.code}</td>
                    <td className="p-2 border border-gray-300 text-center font-black text-black text-sm md:text-lg">{item.price}</td>
                    <td className="p-2 border border-gray-300 text-center font-medium text-black">{item.ebat}</td>
                    <td className="p-2 border border-gray-300 text-center text-black font-medium">
                      {item.desc}
                      <FeatureTooltip code={item.code} />
                    </td>
                    <td className="p-2 border border-gray-300 text-center font-bold leading-tight">
                      <span className="text-black">Her </span>
                      <span className="text-primary">2000 </span>
                      <br />
                      <span className="text-primary">Adet </span>
                      <span className="text-black">için</span>
                    </td>
                    <td className="p-2 border border-gray-300 text-center font-black text-black text-sm md:text-lg">{item.extraPrice}</td>
                    <td className="p-2 border border-gray-300 text-center">
                      <button onClick={() => openWhatsApp(item)} className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors">
                        <ShoppingCart size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-red-600 font-bold text-center text-sm md:text-lg uppercase tracking-tight">
            {AMERIKAN_SERVIS_DATA[0].note}
          </p>
        </div>

        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* Amerikan Servis Baskı Nedir? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">Amerikan Servis Baskı Fiyatları | Kağıt Amerikan Servis</h2>
            <div className="prose prose-slate max-w-none text-black">
              <p className="text-lg leading-relaxed mb-6">
                <strong className="font-black text-primary">MAVİ BASIM MATBAA & REKLAM</strong> olarak restoranlar, kafeler ve catering firmaları için en çok tercih edilen kağıt amerikan servis baskı çözümlerini sunuyoruz. Amerikan servis baskı, amerikan servis baskı fiyatları, restoran amerikan servis baskı, kafe amerikan servis baskı, logo baskılı amerikan servis, tek kullanımlık amerikan servis baskı, özel baskılı amerikan servis, kişiye özel amerikan servis baskı, QR kodlu amerikan servis baskı ve ekonomik amerikan servis baskı gibi tüm ihtiyaçlarınızda Türkiye’nin en çok tercih edilen matbaasıyız.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Amerikan servis (kağıt amerikan servis), masaya serilen tek kullanımlık placemat’tir. Hem hijyen sağlar hem de logo, menü, kampanya, QR kod gibi bilgileri müşteriye doğrudan iletir. Standart ebat 31x44 cm olup, 80 gr 1. hamur veya 90 gr kuşe kağıda basılır. Tek renk siyah baskılı amerikan servis ekonomik seçenekken, full renk CMYK baskılı amerikan servis görsel zenginlik sunar. İstenildiği takdirde farklı ebat, boy ve kağıt özelliklerinde de üretim yapılabilmektedir.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Amerikan servis baskı talepleri genellikle restoran sahipleri, kafe işletmecileri, catering firmaları, otel restoranları, fast food zincirleri, pastaneler ve dönercilerden gelir. Günlük 1.000-5.000 adet kullanılırken, yüksek hacimli zincirler 10.000+ adet sipariş verir. Amerikan servis baskı fiyatları adet, kağıt kalitesi ve baskı türüne göre değişir. <strong className="font-black text-primary">Mavi Basım Matbaa & Reklam</strong> olarak amerikan servis baskı konusunda Türkiye’nin en hızlı ve en uygun fiyatlı matbaasıyız.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Kağıt amerikan servis, işletmenin hijyen standartlarını yükseltirken etkili bir pazarlama aracıdır. Özellikle logo baskılı amerikan servis ile marka bilinirliği artar, ekonomik amerikan servis baskı ile maliyet avantajı sağlanır. Tek kullanımlık amerikan servis baskı hijyenik ve pratiktir. Özel baskılı amerikan servis veya kişiye özel amerikan servis baskı ile menü, kampanya veya QR kod gibi detaylar özelleştirilir. QR kodlu amerikan servis baskı dijital menüye geçişte en çok tercih edilen çözümdür. Restoran amerikan servis baskı ve kafe amerikan servis baskı ile masalarınız daha profesyonel görünür. A3 amerikan servis baskı büyük masalar için idealdir.
              </p>
              <p className="text-lg leading-relaxed">
                Amerikan servis kağıdı baskı fiyatları 2026 aramalarında en rekabetçi seçenekleri sunuyoruz. Hem küçük işletmeler hem de büyük zincirler için uygun fiyat, yüksek kalite ve hızlı teslimat garantisi veriyoruz. Amerikan servis bastırma taleplerinde profesyonel tasarım desteği ve güvenilir hizmet ile masalarınızı prestijli hale getiriyoruz.
              </p>
            </div>
          </section>

          {/* Amerikan Servis Özellikleri & Sık Yapılan Hatalar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
              <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tight">Amerikan Servis Özellikleri</h2>
              <ul className="space-y-4">
                {[
                  { label: "Ebat", value: "31 × 44 cm (restoran/kafe masalarına tam uyumlu)" },
                  { label: "Kağıt", value: "80 gr 1. hamur veya 90 gr kuşe" },
                  { label: "Baskı", value: "Tek renk siyah veya full renk CMYK" },
                  { label: "Adet", value: "1.000 – 10.000 adet (yüksek hacimli kullanım)" },
                  { label: "Kullanım", value: "Tek kullanımlık – hijyenik ve pratik" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                    <p className="text-lg font-bold text-black">
                      <span className="text-primary">{item.label}:</span> {item.value}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-red-50 p-8 rounded-[32px] border border-red-100">
              <h2 className="text-2xl font-black text-red-600 mb-6 uppercase tracking-tight">Amerikan Serviste Sık Yapılan 5 Hata</h2>
              <ul className="space-y-4">
                {[
                  "Logo veya işletme bilgisi eksik",
                  "Yanlış ebat seçimi",
                  "Düşük kaliteli kağıt kullanımı",
                  "Baskı renk uyumsuzluğu",
                  "Tasarımın çok kalabalık olması"
                ].map((error, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-lg font-bold text-red-900">
                    <div className="w-2 h-2 bg-red-600 rounded-full" />
                    {error}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Related Products */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">Markanızı Güçlendirin!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Broşür", desc: "Renkli broşür baskıları ile tanıtımlarınızı uçurun.", path: "/brosur" },
                { title: "Sıvama Kartvizit", desc: "Lüks, dayanıklı ve akılda kalıcı premium kartlar.", path: "/kartvizit" },
                { title: "Karton Çanta", desc: "Şık, çevre dostu ve unutulmaz çantalar.", path: "/karton-canta" },
                { title: "Magnet", desc: "Markanızı hatırlatın.", path: "/magnet" }
              ].map((product, idx) => (
                <Link key={idx} to={product.path} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
                  <h3 className="text-lg font-black text-black mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                  <p className="text-sm font-medium text-gray-500">{product.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Agency Discount CTA */}
          <section className="bg-black rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
                Matbaa ve Reklam Ajanslarına Özel İndirim!
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 font-medium">
                Ajanslara özel indirimli fiyatlarımız ve öncelikli üretim avantajlarımız için hemen iletişime geçin. Toptan siparişlerde ekstra avantajlar!
              </p>
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl shadow-primary/20"
              >
                <Zap size={24} />
                Ajans Kaydı Başlat
              </a>
            </div>
          </section>
        </div>
      </div>
      <ProductSEOSection categoryKey="amerikan_servis" />
    </div>
  );
};


export default function App() {
  const [isReady, setIsReady] = useState(false);
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

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <RefreshCw size={48} className="animate-spin text-primary" />
      </div>
    );
  }

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
          <div className="min-h-screen bg-[#f8fafc] font-sans text-secondary flex flex-col">
            <Navbar />
            
            <main className="flex-grow">
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
                <Route path="/amerikan-servis" element={<AmerikanServisPage />} />
                <Route path="/karton-canta" element={<KartonCantaPage />} />
                <Route path="/zarf" element={<ZarfPage />} />
                <Route path="/kataloglar" element={<KatalogPage />} />
                <Route path="/makbuz-ve-formlar" element={<MakbuzFormlarPage />} />
                <Route path="/adisyon" element={<MakbuzFormlarPage />} />
                <Route path="/siparis-fisi" element={<MakbuzFormlarPage />} />
                <Route path="/perakende-satis-fisi" element={<MakbuzFormlarPage />} />
                <Route path="/para-makbuzu" element={<MakbuzFormlarPage />} />
                <Route path="/sozlesme-baski" element={<MakbuzFormlarPage />} />
                <Route path="/sigorta-policeleri" element={<MakbuzFormlarPage />} />
                <Route path="/tahsilat-makbuzu" element={<MakbuzFormlarPage />} />
                <Route path="/arac-kiralama" element={<MakbuzFormlarPage />} />
                <Route path="/gider-makbuzu" element={<MakbuzFormlarPage />} />
                <Route path="/giris-bileti" element={<MakbuzFormlarPage />} />
                <Route path="/recete" element={<MakbuzFormlarPage />} />
                <Route path="/senet" element={<MakbuzFormlarPage />} />
                <Route path="/tediye-makbuzu" element={<MakbuzFormlarPage />} />
                <Route path="/cilt-isleri" element={<GenericPriceTablePage data={CILT_ISLERI_DATA} />} />
                <Route path="/matbaa" element={<MatbaaPage />} />
                <Route path="/referanslar" element={<ReferanslarPage />} />
                <Route path="/sikca-sorulan" element={<SikcaSorulanPage />} />
                <Route path="/grafik-tasarim" element={<GrafikTasarimPage />} />
                <Route path="/hakkimizda" element={<HakkimizdaPage />} />
                <Route path="/iletisim" element={<IletisimPage />} />
              </Routes>
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
