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

const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

// --- Constants ---
const getImageUrl = (key: string, defaultUrl: string) => {
  return LOCAL_ASSETS[key] || defaultUrl;
};

const LOCAL_ASSETS: Record<string, string> = {
  "afis": "/afis.webp",
  "ambalaj": "/ambalaj.webp",
  "amerikan_servis": "/amerikan_servis.webp",
  "anteli_kagit": "/anteli_kagit.webp",
  "b1": "/b1.webp",
  "b2": "/b2.webp",
  "b3": "/b3.webp",
  "b4": "/b4.webp",
  "b5": "/b5.webp",
  "bloknot": "/bloknot.webp",
  "brosur": "/brosur.webp",
  "el_ilani": "/el_ilani.webp",
  "etiket": "/etiket.webp",
  "karton_canta": "/karton_canta.webp",
  "kartvizit": "/kartvizit.webp",
  "katalog": "/katalog.webp",
  "kutu": "/kutu.webp",
  "magnet": "/magnet.webp",
  "makbuz": "/makbuz.webp",
  "otopaspas": "/otopaspas.webp",
  "tecrube": "/tecrube.webp",
  "zarf": "/zarf.webp",
  "cep": "/cep.webp",
  "kup": "/kup.webp",
  "logo": "/mavilogo.png"
};

const sortedBannerUrls = ["/b1.webp", "/b2.webp", "/b3.webp", "/b4.webp", "/b5.webp"];

const PHONE_NUMBER = "0536 602 23 73";
const PHONE_LINK = "tel:05366022373";
const WHATSAPP_NUMBER = "905366022373";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Merhaba, fiyat teklifi almak istiyorum.")}`;

const FireWarning = () => (
  <div className="mt-6 text-center">
    <p className="text-red-600 font-black text-sm md:text-base uppercase tracking-tight">
      Lütfen Dikkat : Siparişlerinizin Renk, Adet ve Ölçülerinde %1 ila %5 Arasında Fire Olabilmektedir.
    </p>
  </div>
);

const AgencyDiscountCTA = () => (
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
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100048115954138";
const INSTAGRAM_URL = "https://www.instagram.com/mavi_basim/";
const ADDRESS = "Mavi Basım Matbaa ve Reklam\nLitros Yolu 2. Matbaacılar Sit. 2NC Topkapı, 34025 Zeytinburnu / İstanbul";

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
                        disabled={item.category === "Dosyalar" && item.baseQuantity === 500}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-20 text-center font-black text-xs">{item.quantity.toLocaleString('tr-TR')}</span>
                      <button 
                        onClick={() => updateQuantity(idx, item.quantity + item.baseQuantity)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-primary disabled:opacity-20"
                        disabled={item.category === "Dosyalar" && item.baseQuantity === 500}
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
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    if (product) {
      const baseQty = product.miktar ? parseInt(product.miktar.replace(/[^\d]/g, '')) : 1000;
      setQuantity(baseQty);
      setShowSuccess(false);
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const basePrice = parsePrice(product.price);
  const extraPrice = product.extraPrice ? parsePrice(product.extraPrice) : null;
  const baseQuantity = product.miktar ? parseInt(product.miktar.replace(/[^\d]/g, '')) : 1000;
  
  const calculateTotalPrice = (q: number) => {
    const d = calculateDiscount(q, category);
    if (extraPrice !== null) {
      const additionalUnits = Math.max(0, (q - baseQuantity) / baseQuantity);
      return basePrice + (additionalUnits * extraPrice);
    }
    return basePrice * (q / baseQuantity) * (1 - d);
  };

  const totalPrice = calculateTotalPrice(quantity);

  const handleAdd = () => {
    onAddToCart({
      id: Math.random().toString(36).substr(2, 9),
      name: product.model || product.name || category,
      code: product.code,
      basePrice,
      baseQuantity,
      quantity,
      category,
      description: product.desc + (product.note ? ` - ${product.note}` : "") || "",
      ebat: product.ebat,
    });
    setShowSuccess(true);
  };

  const handleQuantityChange = (newQty: number) => {
    if (newQty < baseQuantity) return;
    if (category === "Dosyalar" && product.miktar === "500 Adet") return;
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
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Adet Seçimi</label>
                  <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden bg-white w-full shadow-sm">
                    <button 
                      onClick={() => handleQuantityChange(quantity - baseQuantity)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 text-black transition-colors disabled:opacity-20"
                      disabled={quantity <= baseQuantity || (category === "Dosyalar" && product.miktar === "500 Adet")}
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
                      disabled={category === "Dosyalar" && product.miktar === "500 Adet"}
                    >
                      <Plus size={20} strokeWidth={3} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-50">
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

const PRODUCT_FEATURES_INFO: Record<string, string> = {
  "NK": "Tek taraflı, arkası baskısızdır. Mürekkebi emen dokusu sayesinde arka yüzüne kalemle yazı yazılabilir. Ekonomik ve ince bir seçenektir. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "NKA": "Arkası tek renk siyah baskılıdır. Kuyumcu, restoran ve kaşe kullananlar için idealdir; arkasına rahatça not alınabilir. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "MNA": "İlaç kutusu sertliğinde, orta kalınlıktadır. Mat yüzeyiyle şıktır; mühür ve randevu notu için uygundur. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "CYM": "350 gr. Kuşe - Çift Yön Renkli Mat Selefonlu. Dergi kapağı kalınlığındadır. Üzerine yazı yazılabilir (3-4 sn. kuruma süresi gerekir). Kağıt kalınlığını anlamanız için; tek parmağınızla bile bükebilirsiniz.",
  "CYP": "Dergi kapağı kalınlığında, parlak ve canlıdır. Selefon kaplı olduğu için kalemle yazı yazmaya uygun değildir. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "KL": "Mat yüzeyli, orta kalınlıkta. Seçilen bölgeler kabartma lak sayesinde ışıkta parlar ve dokunulduğunda yükseklik hissi verir. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "LAKKL": "Mat yüzeyli, orta kalınlıkta. Seçilen bölgeler kabartma lak sayesinde ışıkta parlar ve dokunulduğunda yükseklik hissi verir. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "CYML4": "400 gr. Kuşe - Çift Yön Renkli Mat Selefonlu Laklı. Kalın bir karttır. Mat yüzey üzerinde Lak seçili alanların, resimlerin ve yazıların üstü parlar. Kalemle yazı yazılırsa 3-4 sn. kuruması beklenmelidir. Ortalamanın üstü bir kalınlıktadır.",
  "O-COK": "Modern oval (yuvarlak) köşelidir. Kabartma lak ile derinlik kazandırılmış, şık ve ekonomik bir prestij ürünüdür. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "S-COK": "Standart kalıpların dışında özel formda (aşçı, otomobil vb.) kesilebilir. Kabartma laklı, görsel kalitesi yüksek bir üründür. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "O-SEK": "700 gr. Çok sert ve kalın (iki kağıdın birleşimi). En popüler prestij ürünümüzdür; köşeleri ovaldir ve çift yönlü kabartma laklıdır. Çok sert bir yapıdadır; parmağınızla zor bükülür ve katlanır.",
  "EKO-SEK": "Ekonomik ama kalın (sıvama) seçenektir. Köşeleri ovaldir ve çift yönlü kabartma lak mevcuttur. Çok sert bir yapıdadır; parmağınızla zor bükülür ve katlanır.",
  "S-SEK": "700 gr. Oldukça sert ve dayanıklıdır. İstediğiniz forma göre özel kesim yapılır; çift yönlü kabartma lak ile yüksek prestij sağlar. Çok sert bir yapıdadır; parmağınızla zor bükülür ve katlanır.",
  "A-SEK": "Maksimum sertliktedir. Ön yüzde Altın Yaldız ve Kabartma Lak, arka yüzde sadece Kabartma Lak bulunur. Özel kesimlidir. Çok sert bir yapıdadır; parmağınızla zor bükülür ve katlanır.",
  "AC-SEK": "En üst segment. Çift taraflı Altın Yaldız ve Kabartma Lak uygulanabilir. Özel kesimi ve kalınlığıyla markanızın ağırlığını yansıtır. Çok sert bir yapıdadır; parmağınızla zor bükülür ve katlanır.",
  "TANK": "800 gr. Bristol Sıvama - Mat Selefonlu Kabartma Laklı. Koleksiyonumuzun en kalın ve sert kartıdır. Çok sert bir yapıdadır; parmağınızla zor bükülür ve katlanır.",
  "AY": "Ön yüzünde şık Altın Yaldız detayları vardır. Arka yüzü siyah baskılıdır ve kalemle not almaya uygundur. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "GY": "Ön yüzünde Gümüş Yaldız parıltısı mevcuttur. Arkasına kalemle yazı yazılabildiği için randevu kartı olarak idealdir. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "VIP": "Ön yüzünde Altın Yaldız ve Özel Kesim detayları barındıran, hem modern hem de estetik duran orta kalınlıkta şık bir karttır. Kağıt kalınlığını anlamanız için; bu gramajdaki bir kağıdı tek parmağınızla bile rahatça bükebilirsiniz.",
  "E": "Bu ürünler kağıt bazlı olduğu için sudan, güneşten ve rüzgardan etkilenebilirler; bu nedenle iç mekan kullanımı için uygundur. Arkasındaki taşıyıcı kağıtta bulunan kesikler (slit) sayesinde kolayca çıkarılıp istenilen yüzeye yapıştırılabilir.",
  "ES": "Bu ürünler kağıt bazlı olduğu için sudan, güneşten ve rüzgardan etkilenebilirler; bu nedenle iç mekan kullanımı için uygundur. Arkasındaki taşıyıcı kağıtta bulunan kesikler (slit) sayesinde kolayca çıkarılıp istenilen yüzeye yapıştırılabilir.",
  "EO": "Bu ürünler kağıt bazlı olduğu için sudan, güneşten ve rüzgardan etkilenebilirler; bu nedenle iç mekan kullanımı için uygundur. Arkasındaki taşıyıcı kağıtta bulunan kesikler (slit) sayesinde kolayca çıkarılıp istenilen yüzeye yapıştırılabilir.",
  "EOY": "Bu ürünler kağıt bazlı olduğu için sudan, güneşten ve rüzgardan etkilenebilirler; bu nedenle iç mekan kullanımı için uygundur. Arkasındaki taşıyıcı kağıtta bulunan kesikler (slit) sayesinde kolayca çıkarılıp istenilen yüzeye yapıştırılabilir.",
  "MAG1": "60 mikron kalınlığında, parlak selefon kaplıdır. Sudan ve nemden etkilenmez. Metal yüzeylere (buzdolabı vb.) güçlü tutunur. Özel kesimlidir.",
  "MAG2": "60 mikron kalınlığında, parlak selefon kaplıdır. Sudan ve nemden etkilenmez. Metal yüzeylere (buzdolabı vb.) güçlü tutunur. Kenarları oval kesimlidir.",
  "MAG3": "Büyük ebatlı magnetler için CM kare üzerinden fiyatlandırılır. 60 mikron kalınlığında, dayanıklı ve yüksek tutunma gücüne sahiptir.",
  "P1": "Esmer renkte kağıttır siyah baskı güzel durur. su emzici özelliği vardır. araçlarınız için paket kağıtlarınız için mükemmel.",
  "P2": "Esmer renkte kağıttır siyah baskı güzel durur. su emzici özelliği vardır. araçlarınız için paket kağıtlarınız için mükemmel.",
  "P3": "Esmer renkte kağıttır siyah baskı güzel durur. su emzici özelliği vardır. araçlarınız için paket kağıtlarınız için mükemmel.",
  "PVC": "Plastik (PVC) kartvizitler, standart kağıt kartvizitlerin monotonluğunu kırarak markanıza yenilikçi ve unutulmaz bir imaj kazandırır. Şeffaf, buzlu veya metalik yüzey seçenekleri; özel kesim formları (meyve, araç vb.); kabartma, folyo yaldız, platin yüzeyler; QR kod, barkod ve manyetik şerit gibi gelişmiş özellikleri sayesinde rakiplerinizden ayrışmanızı sağlar. Suya dayanıklı, yırtılmaz ve uzun ömürlü prestij ürünüdür."
};

const FeatureTooltip = ({ code }: { code: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const getInfo = (code: string) => {
    if (PRODUCT_FEATURES_INFO[code]) return PRODUCT_FEATURES_INFO[code];
    
    // Generic handlers for categories without specific codes
    if (code.startsWith('ELI')) return "130 gr. kuşe kağıttan üretilmiştir. Parlak ve canlı renkler için idealdir. Tek yön veya çift yön baskı seçeneği mevcuttur.";
    if (code.startsWith('AF')) return "Afişler, etkinlik ve duyurularınız için yüksek görünürlük sağlar. Kaliteli kağıt ve canlı baskı ile dikkat çeker.";
    if (code.startsWith('Z')) return "Zarflar, kurumsal kimliğinizin tamamlayıcısıdır. Farklı ebat ve kağıt seçenekleri ile profesyonel bir görünüm sunar.";
    if (code.startsWith('P')) return "Oto paspaslar, araç içi temizliği korurken markanızın reklamını yapar. 85 gr. kart kağıttan üretilmiştir.";
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

const KARTVIZIT_DATA = [
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
      { code: "EKO-SEK", price: "800 ₺", desc: "A.Bristol Sıvama Mat Selefon Kabartma Laklı Oval Kesim Çift Yön, Bitmiş Ebat 82x50", isNew: true, image: LOCAL_ASSETS.kartvizit },
      { code: "S-SEK", price: "1.070 ₺", desc: "700 gr. Sıvama Mat Selefon Kabartma Laklı Özel Kesim Çift Yön", image: LOCAL_ASSETS.kartvizit },
      { code: "A-SEK", price: "1.180 ₺", desc: "700 gr. Sıvama Mat Selefon Kabartma Laklı Çift Yön (Tek Yön Altın Yaldız) Özel Kesim", image: LOCAL_ASSETS.kartvizit },
      { code: "AC-SEK", price: "1.300 ₺", desc: "700 gr. Sıvama Mat Selefon Kabartma Laklı Çift Yön Altın Yaldız Özel Kesim Çift Yön", image: LOCAL_ASSETS.kartvizit },
      { code: "TANK", price: "1.030 ₺", desc: "800 gr. Bristol Sıvama Mat Selefon Kabartma Laklı Özel Kesim Çift Yön", image: LOCAL_ASSETS.kartvizit },
    ]
  },
  { 
    cat: "VİP", 
    color: "bg-amber-500",
    items: [
      { code: "AY", price: "900 ₺", desc: "350 gr. Bristol Tek Yön Renkli Mat Selefonlu Altın Yaldızlı Arkası Tek Renk Siyah", image: LOCAL_ASSETS.kartvizit },
      { code: "GY", price: "930 ₺", desc: "350 gr. Bristol Tek Yön Renkli Mat Selefonlu Gümüş Yaldızlı Arkası Tek Renk Siyah", image: LOCAL_ASSETS.kartvizit },
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
        note: "İndirim uygulanmaz. 500 ve katları şeklinde üretilir.",
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

const AFIS_DATA = [
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

const KUSE_115_DATA = [
  {
    cat: "Broşür",
    color: "bg-red-600",
    subTitle: "115 gr. Kuşe Çift Yön Renkli",
    items: [
      { code: "1CA7", price: "1.200 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A7 (9.5x20 cm) 1.000 Adet", size: "A7", ebat: "9.5x20 cm", miktar: "1.000 Adet" },
      { code: "2CA7", price: "1.450 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A7 (9.5x20 cm) 2.000 Adet", size: "A7", ebat: "9.5x20 cm", miktar: "2.000 Adet" },
      { code: "5CA7", price: "2.100 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A7 (9.5x20 cm) 5.000 Adet", size: "A7", ebat: "9.5x20 cm", miktar: "5.000 Adet" },
      { code: "10CA7", price: "3.500 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A7 (9.5x20 cm) 10.000 Adet", size: "A7", ebat: "9.5x20 cm", miktar: "10.000 Adet" },
      { code: "1CA5", price: "1.300 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A5 (14x20 cm) 1.000 Adet", size: "A5", ebat: "14x20 cm", miktar: "1.000 Adet" },
      { code: "2CA5", price: "1.500 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A5 (14x20 cm) 2.000 Adet", size: "A5", ebat: "14x20 cm", miktar: "2.000 Adet" },
      { code: "5CA5", price: "2.350 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A5 (14x20 cm) 5.000 Adet", size: "A5", ebat: "14x20 cm", miktar: "5.000 Adet" },
      { code: "10CA5", price: "3.900 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A5 (14x20 cm) 10.000 Adet", size: "A5", ebat: "14x20 cm", miktar: "10.000 Adet" },
      { code: "1CA4", price: "1.750 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A4 (20x28 cm) 1.000 Adet", size: "A4", ebat: "20x28 cm", miktar: "1.000 Adet" },
      { code: "2CA4", price: "2.150 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A4 (20x28 cm) 2.000 Adet", size: "A4", ebat: "20x28 cm", miktar: "2.000 Adet" },
      { code: "5CA4", price: "3.700 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A4 (20x28 cm) 5.000 Adet", size: "A4", ebat: "20x28 cm", miktar: "5.000 Adet" },
      { code: "10CA4", price: "6.600 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A4 (20x28 cm) 10.000 Adet", size: "A4", ebat: "20x28 cm", miktar: "10.000 Adet" },
      { code: "1CA3", price: "2.800 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A3 (28x40 cm) 1.000 Adet", size: "A3", ebat: "28x40 cm", miktar: "1.000 Adet" },
      { code: "2CA3", price: "3.600 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A3 (28x40 cm) 2.000 Adet", size: "A3", ebat: "28x40 cm", miktar: "2.000 Adet" },
      { code: "5CA3", price: "6.500 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A3 (28x40 cm) 5.000 Adet", size: "A3", ebat: "28x40 cm", miktar: "5.000 Adet" },
      { code: "10CA3", price: "12.200 ₺", desc: "115 gr. Kuşe Çift Yön Renkli A3 (28x40 cm) 10.000 Adet", size: "A3", ebat: "28x40 cm", miktar: "10.000 Adet" },
    ]
  }
];

const KUSE_128_DATA = [
  {
    cat: "Pro Broşür",
    color: "bg-red-600",
    subTitle: "128 gr. Kuşe Çift Yön Renkli",
    items: [
      { code: "PRO1A7", price: "1.350 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A7 (10x21 cm) 1.000 Adet", size: "A7", ebat: "10x21 cm", miktar: "1.000 Adet" },
      { code: "PRO2A7", price: "1.550 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A7 (10x21 cm) 2.000 Adet", size: "A7", ebat: "10x21 cm", miktar: "2.000 Adet" },
      { code: "PRO1A5", price: "1.500 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A5 (15x21 cm) 1.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "1.000 Adet" },
      { code: "PRO2A5", price: "1.700 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A5 (15x21 cm) 2.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "2.000 Adet" },
      { code: "PRO1A4", price: "2.100 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A4 (21x30 cm) 1.000 Adet", size: "A4", ebat: "21x30 cm", miktar: "1.000 Adet" },
      { code: "PRO2A4", price: "2.600 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A4 (21x30 cm) 2.000 Adet", size: "A4", ebat: "21x30 cm", miktar: "2.000 Adet" },
      { code: "PRO1A3", price: "3.450 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A3 (30x42 cm) 1.000 Adet", size: "A3", ebat: "30x42 cm", miktar: "1.000 Adet" },
      { code: "PRO2A3", price: "4.500 ₺", desc: "128 gr. Kuşe Çift Yön Renkli A3 (30x42 cm) 2.000 Adet", size: "A3", ebat: "30x42 cm", miktar: "2.000 Adet" },
    ]
  }
];

const KUSE_200_DATA = [
  {
    cat: "Selefonlu Broşür",
    color: "bg-red-600",
    subTitle: "200 gr. Kuşe Çift Yön Renkli",
    desc: "Parlak Selefonlu",
    items: [
      { code: "CBS1", price: "3.200 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A7 (10x21 cm) 3.000 Adet", size: "A7", ebat: "10x21 cm", miktar: "3.000 Adet" },
      { code: "CBS2", price: "5.600 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A7 (10x21 cm) 6.000 Adet", size: "A7", ebat: "10x21 cm", miktar: "6.000 Adet" },
      { code: "CBS3", price: "10.400 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A7 (10x21 cm) 12.000 Adet", size: "A7", ebat: "10x21 cm", miktar: "12.000 Adet" },
      { code: "CBS4", price: "3.100 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A5 (15x21 cm) 2.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "2.000 Adet" },
      { code: "CBS5", price: "5.400 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A5 (15x21 cm) 4.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "4.000 Adet" },
      { code: "CBS6", price: "7.600 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A5 (15x21 cm) 6.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "6.000 Adet" },
      { code: "CBS7", price: "2.900 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A4 (21x30 cm) 1.000 Adet", size: "A4", ebat: "21x30 cm", miktar: "1.000 Adet" },
      { code: "CBS8", price: "4.800 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A4 (21x30 cm) 2.000 Adet", size: "A4", ebat: "21x30 cm", miktar: "2.000 Adet" },
      { code: "CBS9", price: "8.700 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A4 (21x30 cm) 4.000 Adet", size: "A4", ebat: "21x30 cm", miktar: "4.000 Adet" },
      { code: "CBS10", price: "4.800 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A3 (30x42 cm) 1.000 Adet", size: "A3", ebat: "30x42 cm", miktar: "1.000 Adet" },
      { code: "CBS11", price: "8.700 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A3 (30x42 cm) 2.000 Adet", size: "A3", ebat: "30x42 cm", miktar: "2.000 Adet" },
      { code: "CBS12", price: "16.000 ₺", desc: "200 gr. Kuşe Çift Yön Renkli Parlak Selefonlu A3 (30x42 cm) 4.000 Adet", size: "A3", ebat: "30x42 cm", miktar: "4.000 Adet" },
    ]
  }
];

const BROSUR_DATA = [...KUSE_115_DATA, ...KUSE_128_DATA, ...KUSE_200_DATA];

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

const AMERIKAN_SERVIS_DATA = [
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

const KATALOG_DATA = {
  title: "Katalog Baskı Fiyatları 2026 - 135 gr Kuşe + 300 gr Kapak (KDV Hariç)",
  note: "Acil Katalog Baskıları için %30 fark ile 36 saat sonra teslimat",
  footerNote: "Standart A4 / A5 dikey ebatlar için geçerlidir. Kare ve yatay ebatlarda %5-10 fire farkı eklenebilir. Yüksek adetlerde ekstra indirim!",
  headers: ["Adet", "Fiyat", "Sipariş"],
  rows: [
    { label: "A4 4 Sayfa + Kapak", total: "8 Sayfa", p50: "5.400 TL", p100: "8.500 TL", p250: "11.800 TL", p500: "13.500 TL", p1000: "15.500 TL" },
    { label: "A4 8 Sayfa + Kapak", total: "12 Sayfa", p50: "6.500 TL", p100: "11.500 TL", p250: "14.500 TL", p500: "15.900 TL", p1000: "19.000 TL" },
    { label: "A4 12 Sayfa + Kapak", total: "16 Sayfa", p50: "7.500 TL", p100: "12.800 TL", p250: "18.000 TL", p500: "19.750 TL", p1000: "23.350 TL" },
    { label: "A4 16 Sayfa + Kapak", total: "20 Sayfa", p50: "8.800 TL", p100: "14.000 TL", p250: "19.900 TL", p500: "22.000 TL", p1000: "26.000 TL" },
    { label: "A4 20 Sayfa + Kapak", total: "24 Sayfa", p50: "9.900 TL", p100: "16.000 TL", p250: "23.500 TL", p500: "25.800 TL", p1000: "30.700 TL" },
    { label: "A4 24 Sayfa + Kapak", total: "28 Sayfa", p50: "11.000 TL", p100: "18.300 TL", p250: "25.500 TL", p500: "28.300 TL", p1000: "34.700 TL" },
    { label: "A4 28 Sayfa + Kapak", total: "32 Sayfa", p50: "12.300 TL", p100: "20.000 TL", p250: "29.000 TL", p500: "32.300 TL", p1000: "38.900 TL" },
    { label: "A4 32 Sayfa + Kapak", total: "36 Sayfa", p50: "13.300 TL", p100: "22.200 TL", p250: "31.000 TL", p500: "34.800 TL", p1000: "41.000 TL" },
    { label: "A4 36 Sayfa + Kapak", total: "40 Sayfa", p50: "13.250 TL", p100: "24.050 TL", p250: "34.500 TL", p500: "38.300 TL", p1000: "45.500 TL" },
    { label: "40 Sayfa ve Üzeri", total: "Özel Teklif", p50: "", p100: "", p250: "", p500: "", p1000: "Fiyat Alabilirsiniz", isSpecial: true },
  ]
};

const KUP_BLOKNOT_DATA = [
  {
    cat: "250'LİK",
    items: [
      { code: "NKKB-250-100", desc: "Yapraklar; 80gr. 1.Hamur, Tek Yön, Tek Renk 78x78 mm.", miktar: "100", price: "7.450 ₺" },
      { code: "NKKB-250-250", desc: "Yapraklar; 80gr. 1.Hamur, Tek Yön, Tek Renk 78x78 mm.", miktar: "250", price: "8.700 ₺" },
      { code: "NKKB-250-500", desc: "Yapraklar; 80gr. 1.Hamur, Tek Yön, Tek Renk 78x78 mm.", miktar: "500", price: "10.700 ₺" },
      { code: "NKKB-250-1000", desc: "Yapraklar; 80gr. 1.Hamur, Tek Yön, Tek Renk 78x78 mm.", miktar: "1.000", price: "15.700 ₺" },
    ]
  },
  {
    cat: "500'LÜK",
    items: [
      { code: "NKKB-500-100", desc: "Yapraklar; 80gr. 1.Hamur, Tek Yön, Tek Renk 78x78 mm.", miktar: "100", price: "9.200 ₺" },
      { code: "NKKB-500-250", desc: "Yapraklar; 80gr. 1.Hamur, Tek Yön, Tek Renk 78x78 mm.", miktar: "250", price: "12.200 ₺" },
      { code: "NKKB-500-500", desc: "Yapraklar; 80gr. 1.Hamur, Tek Yön, Tek Renk 78x78 mm.", miktar: "500", price: "16.200 ₺" },
    ]
  }
];

const banners = [
  {
    img: LOCAL_ASSETS.b1,
    alt: "Mavi Basım Matbaa Hizmetleri Banner 1",
    title: "Türkiye Geneli Profesyonel Matbaa Hizmetleri",
    subtitle: "✅ Kaliteli ve Hızlı Çözümler\n✅ Markanıza Değer Katan Matbaa Hizmetleri",
    primaryBtn: { text: "Hemen Sipariş Ver", link: WHATSAPP_LINK },
    secondaryBtn: { text: "Ürünlerimizi İnceleyin", link: "#products" }
  },
  {
    img: LOCAL_ASSETS.b2,
    alt: "Mavi Basım Broşür Baskı Banner 2",
    title: "Tanıtımınızı Şansa Bırakmayın, Kaliteye Yatırım Yapın!",
    subtitle: "✅ 115gr Parlak Kuşe Kağıt\n✅ 1000 Adet A5 Broşürde Rakipsiz Fiyat ve Ücretsiz Tasarım Desteği\n✅ Aracı yok, matbaadan direkt halka! Hızlı Kargo",
    primaryBtn: { text: "Hemen Sipariş Ver", link: WHATSAPP_LINK },
    secondaryBtn: { text: "Ürünlerimizi İnceleyin", link: "#products" }
  },
  {
    img: LOCAL_ASSETS.b3,
    alt: "Mavi Basım Magnet Baskı Banner 3",
    title: "1.000 Adet Özel Kesim Magnet’te İnanılmaz Fiyat!",
    subtitle: "✅ 1.000 Adet Özel Kesim Magnet’te İnanılmaz Fiyat! (Matbaadan Direkt)\n✅ 48x68mm Standart veya Özel Kesim\n✅ Aracı yok, matbaadan direkt halka!\n✅ 81 İle Güvenli ve Hızlı Kargo",
    primaryBtn: { text: "Hemen Sipariş Ver", link: WHATSAPP_LINK },
    secondaryBtn: { text: "Ürünlerimizi İnceleyin", link: "#products" }
  },
  {
    img: LOCAL_ASSETS.b4,
    alt: "Mavi Basım Kurumsal Matbaa Banner 4",
    title: "Kurumsal Matbaa ve Baskı Hizmetleri",
    subtitle: "✅ İşinize Özel Profesyonel Matbaa Baskıları\n✅ Sigorta Poliçeleri • Tahsilat Makbuzu • Araç Kiralama Sözleşmesi\n✅ Gider Makbuzu • Giriş Bileti • Reçete • Senet • Tediye Makbuzu\n✅ Otokopili / Karbonlu Baskı\n✅ Numaralı & Ciltli Üretim\n✅ Firma Logolu Özel Tasarım\n✅ Hızlı Üretim – Uygun Fiyat",
    primaryBtn: { text: "Hemen Sipariş Ver", link: WHATSAPP_LINK },
    secondaryBtn: { text: "Ürünlerimizi İnceleyin", link: "#products" }
  },
  {
    img: LOCAL_ASSETS.b5,
    alt: "Mavi Basım Kutu ve Ambalaj Banner 5",
    title: "Profesyonel Kutu ve Ambalaj Çözümleri",
    subtitle: "✅ Markanıza Değer ve Kimlik Katın\n✅ Her Bütçeye Uygun Özel Tasarım Kutu Çözümleri",
    primaryBtn: { text: "Hemen Sipariş Ver", link: WHATSAPP_LINK },
    secondaryBtn: { text: "Ürünlerimizi İnceleyin", link: "/kutu" }
  }
];

const PRODUCTS = [
  { id: "kartvizit", name: "KARTVİZİT", price: "580 ₺", desc: "1.000 Adet", image: LOCAL_ASSETS.kartvizit, type: "kartvizit" },
  { id: "el_ilani", name: "EL İLANI", price: "1.150 ₺", desc: "2.000 Adet", image: LOCAL_ASSETS.el_ilani, type: "el-ilani" },
  { id: "brosur", name: "BROŞÜR", price: "1.200 ₺", desc: "1.000 Adet", image: LOCAL_ASSETS.brosur, type: "brosur" },
  { id: "magnet", name: "MAGNET", price: "960 ₺", desc: "1.000 Adet", image: LOCAL_ASSETS.magnet, type: "magnet" },
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

const BLOKNOTLAR_DATA = {
  kapakli: [
    {
      ebat: "9.4x14.3cm",
      color: "bg-black",
      items: [
        { code: "B16", kapak: "NK", ic: "80 gr. 1.Hamur Tek Renk (9.4x14.3cm)", p500: "11.600 ₺", p1000: "14.200 ₺", image: LOCAL_ASSETS.bloknot },
        { code: "B17", kapak: "CYP", ic: "80 gr. 1.Hamur Tek Renk (9.4x14.3cm)", p500: "12.300 ₺", p1000: "14.700 ₺", image: LOCAL_ASSETS.bloknot },
        { code: "B18", kapak: "CYM", ic: "80 gr. 1.Hamur Tek Renk (9.4x14.3cm)", p500: "12.400 ₺", p1000: "14.800 ₺", image: LOCAL_ASSETS.bloknot },
        { code: "B19", kapak: "CYML4", ic: "80 gr. 1.Hamur Tek Renk (9.4x14.3cm)", p500: "13.700 ₺", p1000: "16.400 ₺", image: LOCAL_ASSETS.bloknot },
      ]
    },
    {
      ebat: "14x20cm",
      color: "bg-secondary",
      items: [
        { code: "B20", kapak: "NK", ic: "80 gr. 1.Hamur Tek Renk (14x20cm)", p500: "14.400 ₺", p1000: "18.700 ₺", image: LOCAL_ASSETS.bloknot },
        { code: "B21", kapak: "CYP", ic: "80 gr. 1.Hamur Tek Renk (14x20cm)", p500: "15.200 ₺", p1000: "19.200 ₺", image: LOCAL_ASSETS.bloknot },
        { code: "B22", kapak: "CYM", ic: "80 gr. 1.Hamur Tek Renk (14x20cm)", p500: "15.300 ₺", p1000: "19.300 ₺", image: LOCAL_ASSETS.bloknot },
        { code: "B23", kapak: "CYML4", ic: "80 gr. 1.Hamur Tek Renk (14x20cm)", p500: "16.700 ₺", p1000: "20.700 ₺", image: LOCAL_ASSETS.bloknot },
      ]
    }
  ],
  kapaksiz: [
    {
      ebat: "9.4x14.3cm",
      color: "bg-black",
      items: [
        { code: "B28", ic: "80 gr. 1.Hamur Tek Renk (9.4x14.3cm)", p500: "6.200 ₺", p1000: "8.200 ₺", image: LOCAL_ASSETS.bloknot },
      ]
    },
    {
      ebat: "14x20cm",
      color: "bg-secondary",
      items: [
        { code: "B29", ic: "80 gr. 1.Hamur Tek Renk (14x20cm)", p500: "8.200 ₺", p1000: "12.700 ₺", image: LOCAL_ASSETS.bloknot },
      ]
    }
  ]
};

const ZARF_DATA = [
  {
    cat: "Zarf",
    subTitle: "110 gr. 1.Hamur",
    items: [
      { code: "Z1", price: "2.100 ₺", ebat: "10.5x24 cm.", desc: "110 gr. Diplomat Tek Renk", miktar: "1.000 Adet", extra: "Her 1000 Adet için", extraPrice: "1.550 ₺", note: "Z1 için İlave Renk 400 ₺, 1000 Tiraj 100 ₺", image: LOCAL_ASSETS.zarf },
      { code: "Z2", price: "2.600 ₺", ebat: "10.5x24 cm.", desc: "110 gr. Diplomat Renkli", miktar: "1.000 Adet", extra: "Her 1000 Adet için", extraPrice: "1.700 ₺", image: LOCAL_ASSETS.zarf },
      { code: "Z3", price: "3.500 ₺", ebat: "24x32 cm.", desc: "110 gr. Torba Zarf Renkli", miktar: "500 Adet", extra: "Her 500 Adet için", extraPrice: "2.200 ₺", image: LOCAL_ASSETS.zarf },
    ],
    note: "Lütfen Dikkat : Siparişlerinizin Renk, Adet ve Ölçülerinde %1 ila %5 Arasında Fire Olabilmektedir."
  }
];

const KARTON_CANTA_DATA = [
  {
    ebat: "16x25x6 cm",
    items: [
      { code: "KC15-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "500 Adet", price: "8.400 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC15-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "500 Adet", price: "8.400 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC11-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "11.150 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC11-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "11.150 ₺", image: LOCAL_ASSETS.karton_canta },
    ]
  },
  {
    ebat: "27x16x6 cm",
    items: [
      { code: "KC25-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "500 Adet", price: "9.610 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC25-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "500 Adet", price: "9.610 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC21-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "13.020 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC21-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "13.020 ₺", image: LOCAL_ASSETS.karton_canta },
    ]
  },
  {
    ebat: "25x37x8 cm",
    items: [
      { code: "KC35-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "500 Adet", price: "9.500 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC35-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "500 Adet", price: "9.500 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC31-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "13.900 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC31-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "13.900 ₺", image: LOCAL_ASSETS.karton_canta },
    ]
  },
  {
    ebat: "51x33x13 cm",
    items: [
      { code: "KC45-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "500 Adet", price: "13.350 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC45-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "500 Adet", price: "13.350 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC41-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "20.500 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC41-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "20.500 ₺", image: LOCAL_ASSETS.karton_canta },
    ]
  }
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

const SOZLESME_BASKI_DATA = [
  {
    id: "sozlesme-baski",
    title: "SÖZLEŞME BASKI",
    ebat: "20,5 x 28,5 cm (TAM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı",
    headers: ["5 CİLT", "10 CİLT", "15 CİLT", "20 CİLT", "25 CİLT", "30 CİLT", "35 CİLT", "40 CİLT", "50 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1550, 1900, 2500, 2750, 3200, 3500, 4050, 4400, 5050, 8300] },
      { label: "1 Asl+2 Su.", values: [1750, 2350, 3000, 3400, 4050, 4550, 5100, 5550, 6800, 11800] },
      { label: "1 Asl+3 Su.", values: [1900, 2600, 3400, 4050, 4700, 5400, 6550, 7000, 8300, 14800] },
      { label: "2. Renk Farkı", values: [650, 750, 900, 950, 1000, 1000, 1100, 1200, 1500, 2200] }
    ]
  }
];

const SIPARIS_FISI_DATA = [
  {
    id: "siparis-fisi",
    title: "SİPARİŞ FİŞİ",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı",
    headers: ["5 CİLT", "10 CİLT", "15 CİLT", "20 CİLT", "25 CİLT", "30 CİLT", "40 CİLT", "50 CİLT", "75 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1500, 1550, 1750, 1900, 2250, 2500, 2800, 3300, 4300, 5050] },
      { label: "1 Asl+2 Su.", values: [1550, 1750, 2050, 2350, 2750, 3000, 3400, 4050, 5300, 7050] },
      { label: "1 Asl+3 Su.", values: [1650, 1900, 2400, 2600, 3200, 3400, 4050, 4700, 7200, 9200] },
      { label: "2. Renk Farkı", values: [650, 650, 750, 750, 900, 900, 1000, 1100, 1300, 1700] }
    ]
  }
];

const PARA_MAKBUZU_DATA = [
  {
    id: "para-makbuzu",
    title: "PARA MAKBUZU",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "50 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1450, 1500, 1600, 1850, 2250] },
      { label: "1 Asl+2 Su.", values: [1500, 1600, 1700, 2100, 2750] },
      { label: "1 Asl+3 Su.", values: [1550, 1650, 1900, 2400, 3300] },
      { label: "2. Renk Farkı", values: [650, 650, 650, 700, 800] }
    ]
  }
];

const ADISYON_DATA = [
  {
    id: "adisyon",
    title: "ADİSYON BASKI (ADİSYON TABLOSU)",
    ebat: "14 x 20 cm",
    ozellik: "Tek Nüsha 70-80 Gr. 1. Hamur 100'lük Adisyon 1 Renk Baskılı",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "40 CİLT", "50 CİLT", "75 CİLT", "100 CİLT", "200 CİLT", "250 CİLT", "300 CİLT", "500 CİLT", "1000 CİLT"],
    rows: [
      { label: "Fiyat", values: [1450, 1500, 1550, 2000, 2100, 2450, 2950, 4400, 5250, 5650, 9300, 16300] },
      { label: "Renk Farkı", values: [650, 650, 650, 700, 700, 950, 950, 1100, 1200, 1300, 2200, 2700] }
    ]
  }
];

const SIGORTA_POLICELERI_DATA = [
  {
    id: "sigorta-policeleri",
    title: "SİGORTA POLİÇELERİ",
    ebat: "20,5 x 28,5 cm (TAM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı",
    headers: ["5 CİLT", "10 CİLT", "15 CİLT", "20 CİLT", "25 CİLT", "30 CİLT", "35 CİLT", "40 CİLT", "50 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1550, 1900, 2500, 2750, 3200, 3500, 4050, 4400, 5050, 8300] },
      { label: "1 Asl+2 Su.", values: [1750, 2350, 3000, 3400, 4050, 4550, 5100, 5550, 6800, 11800] },
      { label: "2. Renk Farkı", values: [650, 750, 900, 950, 1000, 1000, 1100, 1200, 1500, 2200] }
    ]
  }
];

const TAHSILAT_MAKBUZU_DATA = [
  {
    id: "tahsilat-makbuzu",
    title: "TAHSİLAT MAKBUZU",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "50 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1450, 1500, 1600, 1850, 2250] },
      { label: "1 Asl+2 Su.", values: [1500, 1600, 1700, 2100, 2750] },
      { label: "2. Renk Farkı", values: [650, 650, 650, 700, 800] }
    ]
  }
];

const ARAC_KIRALAMA_DATA = [
  {
    id: "arac-kiralama",
    title: "ARAÇ KİRALAMA",
    ebat: "20,5 x 28,5 cm (TAM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı",
    headers: ["5 CİLT", "10 CİLT", "15 CİLT", "20 CİLT", "25 CİLT", "30 CİLT", "35 CİLT", "40 CİLT", "50 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1550, 1900, 2500, 2750, 3200, 3500, 4050, 4400, 5050, 8300] },
      { label: "1 Asl+2 Su.", values: [1750, 2350, 3000, 3400, 4050, 4550, 5100, 5550, 6800, 11800] },
      { label: "2. Renk Farkı", values: [650, 750, 900, 950, 1000, 1000, 1100, 1200, 1500, 2200] }
    ]
  }
];

const GIDER_MAKBUZU_DATA = [
  {
    id: "gider-makbuzu",
    title: "GİDER MAKBUZU",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "50 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1450, 1500, 1600, 1850, 2250] },
      { label: "1 Asl+2 Su.", values: [1500, 1600, 1700, 2100, 2750] },
      { label: "2. Renk Farkı", values: [650, 650, 650, 700, 800] }
    ]
  }
];

const GIRIS_BILETI_DATA = [
  {
    id: "giris-bileti",
    title: "GİRİŞ BİLETİ",
    ebat: "14 x 20 cm",
    ozellik: "Tek Nüsha 70-80 Gr. 1. Hamur 100'lük 1 Renk Baskılı",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "40 CİLT", "50 CİLT", "75 CİLT", "100 CİLT"],
    rows: [
      { label: "Fiyat", values: [1450, 1500, 1550, 2000, 2100, 2450, 2950] },
      { label: "Renk Farkı", values: [650, 650, 650, 700, 700, 950, 950] }
    ]
  }
];

const RECETE_DATA = [
  {
    id: "recete",
    title: "REÇETE",
    ebat: "14 x 20 cm",
    ozellik: "Tek Nüsha 70-80 Gr. 1. Hamur 100'lük 1 Renk Baskılı",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "40 CİLT", "50 CİLT", "75 CİLT", "100 CİLT"],
    rows: [
      { label: "Fiyat", values: [1450, 1500, 1550, 2000, 2100, 2450, 2950] },
      { label: "Renk Farkı", values: [650, 650, 650, 700, 700, 950, 950] }
    ]
  }
];

const SENET_DATA = [
  {
    id: "senet",
    title: "SENET",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "50 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1450, 1500, 1600, 1850, 2250] },
      { label: "1 Asl+2 Su.", values: [1500, 1600, 1700, 2100, 2750] },
      { label: "2. Renk Farkı", values: [650, 650, 650, 700, 800] }
    ]
  }
];

const TEDIYE_MAKBUZU_DATA = [
  {
    id: "tediye-makbuzu",
    title: "TEDİYE MAKBUZU",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "50 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1450, 1500, 1600, 1850, 2250] },
      { label: "1 Asl+2 Su.", values: [1500, 1600, 1700, 2100, 2750] },
      { label: "2. Renk Farkı", values: [650, 650, 650, 700, 800] }
    ]
  }
];

const generateDiscountedData = (baseData: any[], newEbat: string, discount: number) => {
  return baseData.map(item => ({
    ...item,
    id: `${item.id}-${newEbat.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`,
    ebat: newEbat,
    rows: item.rows.map((row: any) => {
      if (row.label.includes('Renk Farkı')) return row;
      return {
        ...row,
        values: row.values.map((v: number) => v - discount)
      };
    })
  }));
};

const PERAKENDE_SATIS_FISI_DATA = [
  {
    id: "perakende-satis-fisi",
    title: "PERAKENDE SATIŞ FİŞİ (GAYRİRESMİ)",
    ebat: "10 X 14 cm. (KÜÇÜK BOY)",
    ozellik: "Otocopy Kağıda 1 Renk Baskılı",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "50 CİLT", "75 CİLT", "100 CİLT", "200 CİLT", "250 CİLT", "300 CİLT", "500 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1450, 1500, 1600, 2250, 2900, 3300, 5400, 6550, 7400, 10800] },
      { label: "1 Asl+2 Su.", values: [1500, 1600, 1700, 2750, 3000, 4050, 6800, 8300, 10300, 14800] },
      { label: "1 Asl+3 Su.", values: [1550, 1650, 1900, 3300, 4200, 4700, 8300, 11300, 12800, 18800] },
      { label: "2. Renk Farkı", values: [650, 650, 650, 800, 900, 1000, 1450, 1700, 1700, 2200] }
    ]
  }
];

const MAKBUZ_FORMLAR_ALL_DATA = [
  ...PERAKENDE_SATIS_FISI_DATA,
  ...ADISYON_DATA,
  ...SIPARIS_FISI_DATA,
  ...PARA_MAKBUZU_DATA,
  ...GIDER_MAKBUZU_DATA,
  ...GIRIS_BILETI_DATA,
  ...RECETE_DATA,
  ...SENET_DATA,
  ...TEDIYE_MAKBUZU_DATA,
  ...SOZLESME_BASKI_DATA,
  ...SIGORTA_POLICELERI_DATA,
  ...TAHSILAT_MAKBUZU_DATA,
  ...ARAC_KIRALAMA_DATA,
];

const CILT_ISLERI_DATA = [
  ...PERAKENDE_SATIS_FISI_DATA,
  ...ADISYON_DATA,
  ...PARA_MAKBUZU_DATA,
  ...SIPARIS_FISI_DATA,
  ...SOZLESME_BASKI_DATA
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
  ...KARTVIZIT_DATA.flatMap(cat => cat.items.map(item => ({ 
    title: `Kartvizit - ${item.desc}`, 
    desc: `${item.desc} 1000 Adet`, // Adding 1000 Adet as it's the standard for these prices
    type: 'Kartvizit', 
    path: '/kartvizit' 
  }))),
  ...EL_ILANI_DATA.flatMap(cat => cat.items.map(item => ({ title: `El İlanı - ${item.desc}`, desc: item.desc, type: 'El İlanı', path: '/el-ilani' }))),
  ...AFIS_DATA.flatMap(cat => cat.items.map(item => ({ title: `Afiş - ${item.desc}`, desc: item.desc, type: 'Afiş', path: '/afis' }))),
  ...ANTETLI_DATA.flatMap(cat => cat.items.map(item => ({ title: `Antetli - ${item.desc}`, desc: item.desc, type: 'Antetli', path: '/antetli' }))),
  ...BROSUR_DATA.flatMap(cat => cat.items.map(item => ({ title: `Broşür - ${item.desc}`, desc: item.desc, type: 'Broşür', path: '/brosur' }))),
  ...DOSYALAR_DATA.map(item => ({ title: `Dosya - ${item.desc}`, desc: item.desc, type: 'Dosya', path: '/dosyalar' })),
  ...ETIKET_DATA.map(item => ({ title: `Etiket - ${item.desc}`, desc: item.desc, type: 'Etiket', path: '/etiket' })),
  ...OTO_PASPAS_DATA.map(item => ({ title: `Oto Paspas - ${item.miktar} Adet`, desc: `Oto Paspas ${item.miktar} Adet`, type: 'Oto Paspas', path: '/oto-paspas' })),
  ...KARTON_CANTA_DATA.flatMap(cat => cat.items.map(item => ({ title: `Karton Çanta - ${item.desc}`, desc: item.desc, type: 'Karton Çanta', path: '/karton-canta' }))),
  ...KUTU_DATA.map(item => ({ title: `Kutu Baskı - ${item.desc}`, desc: item.desc, type: 'Kutu Baskı', path: '/kutu' })),
  ...AMBALAJ_DATA.map(item => ({ title: `Ambalaj Baskı - ${item.desc}`, desc: item.desc, type: 'Ambalaj Baskı', path: '/ambalaj' })),
  ...BLOKNOTLAR_DATA.kapakli.flatMap(cat => cat.items.map(item => ({ title: `Kapaklı Bloknot - ${item.ic}`, desc: item.ic, type: 'Bloknot', path: '/bloknotlar' }))),
  ...BLOKNOTLAR_DATA.kapaksiz.flatMap(cat => cat.items.map(item => ({ title: `Kapaksız Bloknot - ${item.ic}`, desc: item.ic, type: 'Bloknot', path: '/bloknotlar' }))),
  ...ZARF_DATA.flatMap(cat => cat.items.map(item => ({ title: `Zarf - ${item.desc}`, desc: item.desc, type: 'Zarf', path: '/zarf' }))),
  ...MAGNET_DATA.flatMap(cat => cat.items.map(item => ({ title: `Magnet - ${item.desc}`, desc: item.desc, type: 'Magnet', path: '/magnet' }))),
  ...AMERIKAN_SERVIS_DATA.flatMap(cat => cat.items.map(item => ({ title: `Amerikan Servis - ${item.desc}`, desc: item.desc, type: 'Amerikan Servis', path: '/amerikan-servis' }))),
  ...KATALOG_DATA.rows.map(row => ({ title: `Katalog - ${row.label}`, desc: row.label, type: 'Katalog', path: '/kataloglar' })),
  ...KUP_BLOKNOT_DATA.flatMap(cat => cat.items.map(item => ({ title: `Küp Bloknot - ${item.desc}`, desc: item.desc, type: 'Küp Bloknot', path: '/kup-bloknot' })))
].map(item => ({
  ...item,
  searchKey: normalizeSearchText(`${item.title} ${(item as any).desc || ''}`)
}));

// --- Components ---

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
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
            className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] transition-all hover:scale-110 active:scale-95 group"
          >
            <img src="/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </motion.a>

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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { cart, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const fuse = React.useMemo(() => new Fuse(SEARCH_DATA, {
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
  }, [isSearchOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar (Design from Image) */}
      <div className="bg-primary text-white py-2">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-[10px] md:text-[11px] font-bold">
          {/* Left Section */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 md:gap-3">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Mavi Basım Facebook Sayfası">
                <Facebook size={14} className="md:w-4 md:h-4" />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="Mavi Basım Instagram Sayfası">
                <Instagram size={14} className="md:w-4 md:h-4" />
              </a>
            </div>
            <div className="h-3 w-px bg-white/30"></div>
            <div className="flex items-center gap-2 md:gap-4">
              <a href={PHONE_LINK} className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                <PhoneCall size={12} className="md:w-3.5 md:h-3.5" />
                <span>{PHONE_NUMBER}</span>
              </a>
              <span className="hidden xl:block font-medium opacity-90">Türkiye'nin En Uygun Fiyatlı Online Matbaası</span>
              
              {/* Moved Search Bar */}
              <div className="hidden lg:block relative search-container ml-2">
                <input 
                  type="text" 
                  placeholder="Ürün ara..." 
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => searchQuery.length > 1 && setIsSearchOpen(true)}
                  className="bg-white border-none rounded-full py-1 px-8 text-[11px] text-black placeholder:text-gray-400 focus:ring-2 focus:ring-white/20 outline-none transition-all w-52"
                />
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
                
                <AnimatePresence>
                  {isSearchOpen && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden z-[100]"
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
                            className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 text-left"
                          >
                            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Search size={12} className="text-slate-400" />
                            </div>
                            <div>
                              <div className="text-[12px] font-bold text-black">{result.title}</div>
                              <div className="text-[10px] text-black">{result.type}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            <motion.button 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hover:opacity-80 transition-opacity uppercase tracking-wider text-black"
            >
              Teklif İste
            </motion.button>
            
            <div className="h-3 w-px bg-white/30"></div>
            
            <div className="flex items-center gap-1.5">
              <Truck size={14} className="md:w-4 md:h-4" />
              <span className="uppercase hidden sm:inline">TÜRKİYENİN HER YERİNE KARGO</span>
            </div>

            <div className="h-3 w-px bg-white/30"></div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center justify-center gap-1 px-2 py-0.5 bg-white text-primary rounded hover:bg-gray-100 transition-all text-[10px] md:text-[11px] h-5 min-w-[75px] font-bold"
              >
                <User size={12} />
                <span>Giriş Yap</span>
              </button>
              <button 
                onClick={() => {
                  setAuthMode('register');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center justify-center gap-1 px-2 py-0.5 bg-white text-primary rounded hover:bg-gray-100 transition-all text-[10px] md:text-[11px] h-5 min-w-[75px] font-bold"
              >
                <span>Üye Ol</span>
              </button>
            </div>
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
                  <button className="flex items-center text-[13px] font-bold text-black hover:text-secondary px-3 py-2 transition-colors uppercase">
                    FİYAT LİSTESİ <ChevronDown size={14} className="ml-1" />
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
              <a href={banners[current].primaryBtn.link} target="_blank" rel="noopener noreferrer" className="bg-secondary hover:bg-secondary/90 text-white px-3 py-2 md:px-8 md:py-4 rounded-xl font-bold text-[11px] md:text-lg transition-all shadow-2xl shadow-secondary/20 flex items-center">
                {banners[current].primaryBtn.text}
              </a>
              <button 
                onClick={() => handleSecondaryClick(banners[current].secondaryBtn.link)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-3 py-2 md:px-8 md:py-4 rounded-xl font-bold text-[11px] md:text-lg transition-all"
              >
                {banners[current].secondaryBtn.text}
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

const Footer = () => {
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
              Mavi Basım, profesyonel matbaa ve reklam çözümleriyle markanızı geleceğe taşır.
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
        
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <p>© 2024 Mavi Basım Matbaa ve Reklam. Tüm Hakları Saklıdır.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Gizlilik Politikası</a>
            <a href="#" className="hover:text-white">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
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
        <title>Mavi Basım | Türkiye'nin En Uygun Fiyatlı Online Matbaası</title>
        <meta name="description" content="Mavi Basım - Türkiye'nin en uygun fiyatlı online matbaası. Kartvizit, broşür, magnet, kutu ve ambalaj baskı çözümleri." />
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
                  Mavi Basım İstanbul Topkapı Matbaacılar Sitesi’nde faaliyet gösteren profesyonel bir matbaa ve reklam üretim merkezidir.
                </p>
                <p>
                  Kartvizit baskı, broşür baskı, el ilanı baskı, afiş baskı, katalog baskı, magnet baskı, bloknot baskı, karton çanta baskı, etiket baskı ve ambalaj baskı hizmetleri sunmaktayız.
                </p>
                <p>
                  İstanbul’da bulunan üretim merkezimizden Türkiye’nin tüm illerine hızlı üretim ve kargo ile matbaa hizmeti vermekteyiz.
                </p>
                <div className="pt-4 flex items-center gap-3 text-primary font-bold">
                  <MapPin size={20} />
                  <span className="text-sm md:text-base">İstanbul Zeytinburnu Topkapı 2. Matbaacılar Sitesi’nde bulunan üretim merkezimiz ile Türkiye’nin tüm illerine matbaa hizmeti sunmaktayız.</span>
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
                    Mavi Basım olarak Türkiye’nin tüm illerine kargo ile matbaa ürünleri gönderiyoruz.
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

const SmartProductFinder = () => {
  const { openProductDetail } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any[] | null>(null);

  const displayData = KARTVIZIT_DATA;

  const questions = [
    // ... (rest of the questions array)
    {
      id: 'finish',
      text: 'Yüzey (Selefon)?',
      options: [
        { label: 'Parlak Selefon', value: 'Parlak Selefon' },
        { label: 'Mat Selefon', value: 'Mat Selefon' },
        { label: 'Selefonsuz', value: 'Selefonsuz' },
        { label: 'Fikrim yok', value: 'skip' }
      ]
    },
    {
      id: 'thickness',
      text: 'Kağıt Kalınlığı?',
      options: [
        { label: '250 gr', value: '250 gr' },
        { label: '280 gr', value: '280 gr' },
        { label: '300 gr', value: '300 gr' },
        { label: '350 gr', value: '350 gr' },
        { label: '400 gr', value: '400 gr' },
        { label: '700 gr', value: '700 gr' },
        { label: '800 gr', value: '800 gr' },
        { label: 'Fikrim yok', value: 'skip' }
      ]
    },
    {
      id: 'sides',
      text: 'Baskı Yönü?',
      options: [
        { label: 'Tek Yön', value: 'Tek Yön' },
        { label: 'Çift Yön', value: 'Çift Yön' },
        { label: 'Fikrim yok', value: 'skip' }
      ]
    },
    {
      id: 'special',
      text: 'Özel İşlem?',
      options: [
        { label: 'Düz Kesim', value: 'Düz Kesim' },
        { label: 'Laklı', value: 'Lak' },
        { label: 'Sıvama', value: 'Sıvama' },
        { label: 'Yaldız', value: 'Yaldız' },
        { label: 'Özel Kesim', value: 'Özel Kesim' },
        { label: 'Fikrim yok', value: 'skip' }
      ]
    }
  ];

  const checkAvailability = (currentAnswers: Record<string, string>, nextId: string, nextValue: string) => {
    if (nextValue === 'skip') return true;
    
    const testAnswers = { ...currentAnswers, [nextId]: nextValue };
    
    return displayData.some((cat: any) => 
      cat.items.some((item: any) => {
        const desc = item.desc.toLowerCase();
        let match = true;
        
        if (testAnswers.finish && testAnswers.finish !== 'skip') {
          const finish = testAnswers.finish.toLowerCase();
          if (testAnswers.finish === 'Selefonsuz') {
            if (desc.includes('selefon')) match = false;
          } else {
            if (!desc.includes(finish)) match = false;
          }
        }
        
        if (match && testAnswers.sides && testAnswers.sides !== 'skip') {
          const sides = testAnswers.sides.toLowerCase();
          const isSivama = desc.includes('sıvama') || cat.cat.toLowerCase() === 'sıvama';
          
          if (sides === 'tek yön') {
            if (isSivama) {
              match = false;
            } else if (!desc.includes('tek yön')) {
              match = false;
            }
          } else if (sides === 'çift yön') {
            if (!isSivama && !desc.includes('çift yön')) {
              match = false;
            }
          }
        }
        
        if (match && testAnswers.thickness && testAnswers.thickness !== 'skip') {
          const thickness = testAnswers.thickness.toLowerCase();
          if (!desc.includes(thickness)) match = false;
        }
        
        if (match && testAnswers.special && testAnswers.special !== 'skip') {
          const special = testAnswers.special.toLowerCase();
          let specialMatch = false;
          
          if (testAnswers.special === 'Düz Kesim') {
            // Düz kesim seçildiğinde özel veya oval kesim olmayanları getir
            specialMatch = !desc.includes('özel kesim') && !desc.includes('oval kesim');
          } else if (special === 'lak') {
            // "parlak" kelimesinin içindeki "lak" ile karışmaması için "laklı" kontrolü yapıyoruz
            specialMatch = desc.includes('laklı') || cat.cat.toLowerCase() === 'lak';
          } else {
            specialMatch = desc.includes(special) || cat.cat.toLowerCase() === special;
            if (!specialMatch && testAnswers.special === 'Özel Kesim') {
              specialMatch = desc.includes('oval kesim');
            }
          }
          
          if (!specialMatch) match = false;
        }
        return match;
      })
    );
  };

  const handleAnswer = (value: string) => {
    const currentQuestion = questions[step];
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      let nextStep = step + 1;
      let currentAnswers = newAnswers;
      
      // Auto-skip steps that have only one valid option
      while (nextStep < questions.length) {
        const nextQuestion = questions[nextStep];
        const validOptions = nextQuestion.options.filter(opt => 
          opt.value !== 'skip' && checkAvailability(currentAnswers, nextQuestion.id, opt.value)
        );

        if (validOptions.length > 1) {
          // Found a question with multiple choices, stop here
          setStep(nextStep);
          setAnswers(currentAnswers);
          return;
        } else if (validOptions.length === 1) {
          // Only one choice available, auto-select it and check next step
          currentAnswers = { ...currentAnswers, [nextQuestion.id]: validOptions[0].value };
          nextStep++;
        } else {
          // No valid options at all for the next step, finish early
          findProduct(currentAnswers);
          return;
        }
      }
      
      // If we reached here, we auto-skipped all remaining steps
      findProduct(currentAnswers);
    } else {
      findProduct(newAnswers);
    }
  };

  const findProduct = (finalAnswers: Record<string, string>) => {
    let filtered: any[] = [];
    displayData.forEach((cat: any) => {
      cat.items.forEach((item: any) => {
        const desc = item.desc.toLowerCase();
        let isMatch = true;
        
        if (finalAnswers.finish && finalAnswers.finish !== 'skip') {
          const finish = finalAnswers.finish.toLowerCase();
          if (finalAnswers.finish === 'Selefonsuz') {
            if (desc.includes('selefon')) isMatch = false;
          } else {
            if (!desc.includes(finish)) isMatch = false;
          }
        }

        if (isMatch && finalAnswers.sides && finalAnswers.sides !== 'skip') {
          const sides = finalAnswers.sides.toLowerCase();
          const isSivama = desc.includes('sıvama') || cat.cat.toLowerCase() === 'sıvama';
          
          if (sides === 'tek yön') {
            // Sıvama ürünler asla tek yön değildir
            if (isSivama) {
              isMatch = false;
            } else if (!desc.includes('tek yön')) {
              isMatch = false;
            }
          } else if (sides === 'çift yön') {
            // Sıvama ürünler her zaman çift yöndür
            if (!isSivama && !desc.includes('çift yön')) {
              isMatch = false;
            }
          }
        }

        if (isMatch && finalAnswers.thickness && finalAnswers.thickness !== 'skip') {
          const thickness = finalAnswers.thickness.toLowerCase();
          if (!desc.includes(thickness)) isMatch = false;
        }
        
        if (isMatch && finalAnswers.special && finalAnswers.special !== 'skip') {
          const special = finalAnswers.special.toLowerCase();
          let specialMatch = false;
          
          if (finalAnswers.special === 'Düz Kesim') {
            // Düz kesim seçildiğinde özel veya oval kesim olmayanları getir
            specialMatch = !desc.includes('özel kesim') && !desc.includes('oval kesim');
          } else if (special === 'lak') {
            // "parlak" kelimesinin içindeki "lak" ile karışmaması için "laklı" kontrolü yapıyoruz
            specialMatch = desc.includes('laklı') || cat.cat.toLowerCase() === 'lak';
          } else {
            specialMatch = desc.includes(special) || cat.cat.toLowerCase() === special;
            if (!specialMatch && finalAnswers.special === 'Özel Kesim') {
              specialMatch = desc.includes('oval kesim');
            }
          }
          
          if (!specialMatch) isMatch = false;
        }
        
        if (isMatch) {
          filtered.push({ ...item });
        }
      });
    });

    setResult(filtered.slice(0, 4)); // Show up to 4 matches in the 2x2 grid
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="bg-blue-50 rounded-2xl shadow-lg border border-primary/30 p-3 overflow-hidden relative w-full">
      <div className="absolute top-3 right-3 flex gap-1 w-16 z-20">
        {questions.map((_, idx) => (
          <div key={idx} className={`h-1 flex-1 rounded-full transition-all ${idx <= step ? 'bg-primary' : 'bg-gray-100'}`} />
        ))}
      </div>
      
      {!result ? (
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-3 shrink-0 md:border-r md:border-gray-100 md:pr-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
              <Search size={20} />
            </div>
            <div>
              <h2 className="text-[11px] font-black text-black uppercase tracking-tight">Akıllı Bulucu</h2>
              <p className="text-[9px] text-black font-medium">Size en uygun kartı bulalım.</p>
            </div>
          </div>

          <div className="flex-grow w-full">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {step > 0 && (
                    <button 
                      onClick={() => setStep(step - 1)}
                      className="flex items-center gap-1 px-2 py-1 bg-secondary text-white rounded-lg transition-all hover:bg-primary font-black text-[9px] uppercase shadow-sm"
                    >
                      <ArrowLeft size={10} />
                      Geri
                    </button>
                  )}
                  <h3 className="text-[11px] font-black text-black">{questions[step].text}</h3>
                </div>
                {questions[step].id === 'special' && answers.finish === 'Parlak Selefon' && (
                  <span className="text-[9px] text-red-500 font-bold">Parlak selefonda lak ve özel kesim yapılamaz.</span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {questions[step].options.map((opt, idx) => {
                  const isAvailable = checkAvailability(answers, questions[step].id, opt.value);
                  const isDisabled = !isAvailable;
                  
                  const isPopularOption = (
                    opt.value === '350 gr' || 
                    opt.value === '700 gr' || 
                    opt.value === 'Mat Selefon' || 
                    opt.value === 'Sıvama' || 
                    opt.value === 'Çift Yön' || 
                    opt.value === 'Düz Kesim' || 
                    opt.value === 'Özel Kesim'
                  );
                  
                  return (
                    <button
                      key={idx}
                      disabled={isDisabled}
                      onClick={() => handleAnswer(opt.value)}
                      className={`px-3 py-1.5 rounded-xl border transition-all font-black text-[10px] flex-1 md:flex-none text-center relative ${
                        isDisabled
                        ? 'opacity-20 cursor-not-allowed bg-gray-50 border-gray-100 text-gray-400'
                        : opt.value === 'skip' 
                          ? 'border-primary/50 bg-primary/10 text-primary hover:bg-primary/20 shadow-md ring-2 ring-primary/5' 
                          : isPopularOption
                            ? 'border-orange-400 bg-orange-50 text-orange-600 hover:bg-orange-100 shadow-sm ring-2 ring-orange-400/10'
                            : 'border-primary/10 bg-white text-secondary hover:border-primary hover:bg-primary/5'
                      }`}
                    >
                      {isPopularOption && (
                        <span className="absolute -top-2 -right-1 bg-orange-400 text-white text-[6px] font-black px-1 rounded-full shadow-sm">EN ÇOK İSTENDİ</span>
                      )}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center justify-between shrink-0 md:border-r md:border-gray-100 md:pr-4 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                <Search size={20} />
              </div>
              <h2 className="text-[11px] font-black text-black uppercase tracking-tight">Öneriler</h2>
            </div>
            <button onClick={reset} className="text-secondary font-black text-[10px] hover:underline md:hidden bg-gray-100 px-2 py-0.5 rounded-lg">Sıfırla</button>
          </div>
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            {result.length > 0 ? result.map((item, idx) => {
              const desc = item.desc.toLowerCase();
              const isPopular = (
                desc.includes('350 gr') || 
                desc.includes('700 gr') || 
                desc.includes('sıvama') || 
                desc.includes('mat selefon') || 
                desc.includes('çift yön') || 
                desc.includes('özel kesim') ||
                (!desc.includes('özel kesim') && !desc.includes('oval kesim'))
              ) && !['VIP', 'S-COK', 'S-SEK', 'A-SEK', 'AC-SEK'].some(code => item.code.includes(code));
              return (
                <div key={idx} className={`bg-primary/5 rounded-xl p-1.5 px-3 border border-primary/10 flex items-center justify-between gap-3 relative overflow-hidden group ${isPopular ? 'ring-2 ring-orange-400/20' : ''}`}>
                  {isPopular && (
                    <div className="absolute top-0 right-0 bg-orange-400 text-white text-[6px] font-black px-1.5 py-0.5 rounded-bl-lg uppercase tracking-tighter z-10">
                      En Çok İstendi
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[10px] font-black text-black truncate">{item.code}</h4>
                    </div>
                    <p className="text-[8px] text-slate-400 font-medium truncate">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[12px] md:text-[14px] font-black text-black">{item.price}</span>
                    <button 
                      onClick={() => {
                        openProductDetail(item, "Kartvizit");
                      }}
                      className="bg-primary text-white p-1 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <ShoppingCart size={12} />
                    </button>
                  </div>
                </div>
              );
            }) : (
              <div className="flex items-center justify-center gap-3 w-full py-1">
                <p className="text-[9px] text-black font-bold">Uygun ürün bulunamadı.</p>
                <button onClick={reset} className="bg-primary text-white px-3 py-1 rounded-lg font-bold text-[9px]">Tekrar Dene</button>
              </div>
            )}
          </div>
          <button onClick={reset} className="hidden md:block text-secondary font-black text-[11px] hover:text-primary transition-colors shrink-0 bg-gray-100 px-4 py-2 rounded-xl shadow-sm border border-gray-200">Sıfırla</button>
        </div>
      )}
    </div>
  );
};

const SmartBrosurFinder = () => {
  const { openProductDetail } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any[] | null>(null);

  const questions = [
    {
      id: 'weight',
      text: 'Kağıt Gramajı?',
      options: [
        { label: '115 gr', value: '115 gr', isPopular: true },
        { label: '128 gr', value: '128 gr' },
        { label: '200 gr', value: '200 gr' },
        { label: 'Fikrim yok', value: 'skip' }
      ]
    },
    {
      id: 'size',
      text: 'Ebat?',
      options: [
        { label: 'A7', value: 'A7' },
        { label: 'A5', value: 'A5', isPopular: true },
        { label: 'A4', value: 'A4' },
        { label: 'A3', value: 'A3' },
        { label: '34x49', value: '34x49' },
        { label: '49x69', value: '49x69' },
        { label: 'Fikrim yok', value: 'skip' }
      ]
    },
    {
      id: 'quantity',
      text: 'Adet?',
      options: [
        { label: '250 Adet', value: '250 Adet' },
        { label: '500 Adet', value: '500 Adet' },
        { label: '1.000 Adet', value: '1.000 Adet' },
        { label: '2.000 Adet', value: '2.000 Adet' },
        { label: '3.000 Adet', value: '3.000 Adet' },
        { label: '4.000 Adet', value: '4.000 Adet', isPopular: true },
        { label: '5.000 Adet', value: '5.000 Adet' },
        { label: '6.000 Adet', value: '6.000 Adet' },
        { label: '8.000 Adet', value: '8.000 Adet' },
        { label: '10.000 Adet', value: '10.000 Adet' },
        { label: '12.000 Adet', value: '12.000 Adet' },
        { label: 'Fikrim yok', value: 'skip' }
      ]
    }
  ];

  const checkAvailability = (currentAnswers: Record<string, string>, nextId: string, nextValue: string) => {
    if (nextValue === 'skip') return true;
    const testAnswers = { ...currentAnswers, [nextId]: nextValue };
    
    return BROSUR_DATA.some(cat => 
      cat.items.some(item => {
        let match = true;
        if (testAnswers.weight && testAnswers.weight !== 'skip' && !item.desc.toLowerCase().includes(testAnswers.weight.toLowerCase())) match = false;
        if (match && testAnswers.size && testAnswers.size !== 'skip' && item.size !== testAnswers.size) match = false;
        if (match && testAnswers.quantity && testAnswers.quantity !== 'skip' && item.miktar !== testAnswers.quantity) match = false;
        return match;
      })
    );
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      findProduct(newAnswers);
    }
  };

  const findProduct = (finalAnswers: Record<string, string>) => {
    let filtered: any[] = [];
    BROSUR_DATA.forEach(cat => {
      cat.items.forEach(item => {
        let isMatch = true;
        if (finalAnswers.weight && finalAnswers.weight !== 'skip' && !item.desc.toLowerCase().includes(finalAnswers.weight.toLowerCase())) isMatch = false;
        if (isMatch && finalAnswers.size && finalAnswers.size !== 'skip' && item.size !== finalAnswers.size) isMatch = false;
        if (isMatch && finalAnswers.quantity && finalAnswers.quantity !== 'skip' && item.miktar !== finalAnswers.quantity) isMatch = false;
        if (isMatch) filtered.push({ ...item });
      });
    });
    setResult(filtered.slice(0, 4));
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="bg-blue-50 rounded-2xl shadow-lg border border-primary/30 p-3 overflow-hidden relative w-full">
      <div className="absolute top-3 right-3 flex gap-1 w-16 z-20">
        {questions.map((_, idx) => (
          <div key={idx} className={`h-1 flex-1 rounded-full transition-all ${idx <= step ? 'bg-primary' : 'bg-gray-100'}`} />
        ))}
      </div>
      
      {!result ? (
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-3 shrink-0 md:border-r md:border-gray-100 md:pr-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
              <Search size={20} />
            </div>
            <div>
              <h2 className="text-[11px] font-black text-black uppercase tracking-tight">Broşür Bulucu</h2>
              <p className="text-[9px] text-black font-medium">Size en uygun broşürü bulalım.</p>
            </div>
          </div>

          <div className="flex-grow w-full">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {step > 0 && (
                    <button 
                      onClick={() => setStep(step - 1)}
                      className="flex items-center gap-1 px-2 py-1 bg-secondary text-white rounded-lg transition-all hover:bg-primary font-black text-[9px] uppercase shadow-sm"
                    >
                      <ArrowLeft size={10} />
                      Geri
                    </button>
                  )}
                  <h3 className="text-[11px] font-black text-black">{questions[step].text}</h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {questions[step].options.map((opt, idx) => {
                  const isAvailable = checkAvailability(answers, questions[step].id, opt.value);
                  const isDisabled = !isAvailable;
                  return (
                    <button
                      key={idx}
                      disabled={isDisabled}
                      onClick={() => handleAnswer(opt.value)}
                      className={`px-3 py-1.5 rounded-xl border transition-all font-black text-[10px] flex-1 md:flex-none text-center relative ${
                        isDisabled
                        ? 'opacity-20 cursor-not-allowed bg-gray-50 border-gray-100 text-gray-400'
                        : opt.value === 'skip' 
                          ? 'border-sky-200 bg-sky-50 text-sky-600 hover:bg-sky-100 shadow-sm' 
                          : (opt as any).isPopular
                            ? 'border-orange-400 bg-white text-orange-500 hover:bg-orange-50 shadow-sm'
                            : 'border-gray-200 bg-white text-black hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {(opt as any).isPopular && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-400 text-white text-[5px] px-1 py-0.5 rounded-full whitespace-nowrap">
                          EN ÇOK SATILAN
                        </span>
                      )}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center justify-between shrink-0 md:border-r md:border-gray-100 md:pr-4 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                <Search size={20} />
              </div>
              <h2 className="text-[11px] font-black text-black uppercase tracking-tight">Öneriler</h2>
            </div>
            <button onClick={reset} className="text-secondary font-black text-[10px] hover:underline md:hidden bg-gray-100 px-2 py-0.5 rounded-lg">Sıfırla</button>
          </div>
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            {result.length > 0 ? result.map((item, idx) => (
              <div key={idx} className="bg-primary/5 rounded-xl p-1.5 px-3 border border-primary/10 flex items-center justify-between gap-3 relative overflow-hidden group">
                <div className="min-w-0">
                  <h4 className="text-[10px] font-black text-secondary truncate">
                    {item.code}
                    <FeatureTooltip code={item.code} />
                  </h4>
                  <p className="text-[8px] text-slate-400 font-medium truncate">
                    {item.desc.replace(/(\d{4,})/g, (match: string) => Number(match).toLocaleString('tr-TR'))}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[12px] md:text-[14px] font-black text-black">{item.price}</span>
                  <button 
                    onClick={() => {
                      openProductDetail(item, "Broşür");
                    }}
                    className="bg-primary text-white p-1 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <ShoppingCart size={12} />
                  </button>
                </div>
              </div>
            )) : (
              <div className="flex items-center justify-center gap-3 w-full py-1">
                <p className="text-[9px] text-black font-bold">Uygun ürün bulunamadı.</p>
                <button onClick={reset} className="bg-primary text-white px-3 py-1 rounded-lg font-bold text-[9px]">Tekrar Dene</button>
              </div>
            )}
          </div>
          <button onClick={reset} className="hidden md:block text-secondary font-black text-[11px] hover:text-primary transition-colors shrink-0 bg-gray-100 px-4 py-2 rounded-xl shadow-sm border border-gray-200">Sıfırla</button>
        </div>
      )}
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
            <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">Markanıza Özel Kutu Çözümleri | Mavi Basım Matbaa ve Reklam</h2>
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
            <p className="text-lg text-gray-600 mb-8">Mavi Basım kalitesiyle üretilmiş kutu modelleri</p>
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
              <h2 className="text-2xl font-black text-primary mb-6 uppercase tracking-tight">Mavi Basım Farkı</h2>
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

const AmbalajPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Ambalaj");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
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
            <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">Markanıza Özel Ambalaj Çözümleri | Mavi Basım Matbaa ve Reklam</h2>
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
            <p className="text-lg text-gray-600 mb-8">Mavi Basım kalitesiyle üretilmiş ambalaj modelleri</p>
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
              <h2 className="text-2xl font-black text-primary mb-6 uppercase tracking-tight">Mavi Basım Farkı</h2>
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

const ProductSEOSection = ({ categoryKey }: { categoryKey: string }) => {
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

const KartvizitPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail({ ...item, miktar: item.miktar || "1000 Adet" }, "Kartvizit");
  };

  const displayData = KARTVIZIT_DATA;

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap shrink-0">
            <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
              <ChevronRight size={20} className="rotate-180 text-secondary" />
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Kartvizitler</h1>
              <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
              <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">Ebat 82x52 mm - 1.000 Adet</p>
            </div>
          </div>
          <div className="flex-grow">
            <SmartProductFinder />
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
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                  <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((category: any, cIdx: number) => (
                  <React.Fragment key={cIdx}>
                    {category.items.map((item: any, iIdx: number) => (
                      <tr key={`${cIdx}-${iIdx}`} className="border-b border-gray-100 hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group">
                        {iIdx === 0 && (
                          <td 
                            rowSpan={category.items.length}
                            className={`${category.color} text-white font-black text-center p-1 w-10 border-r border-white/10`}
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            <span className="tracking-[0.1em] uppercase text-[10px]">{category.cat}</span>
                          </td>
                        )}
                        <td className="p-3 text-center font-bold text-black border-r border-gray-100 group-hover:text-secondary transition-colors">
                          <div className="flex flex-col items-center gap-1">
                            {item.code}
                            {item.img && (
                              <div className="w-12 h-8 rounded overflow-hidden border border-gray-100 shadow-sm">
                                <img src={item.img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-center text-black font-medium border-r border-gray-100">
                          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
                            {'isNew' in item && (item as any).isNew && (
                              <span className="text-primary font-black text-[9px]">YENİ ÜRÜN</span>
                            )}
                            <span className="group-hover:font-bold transition-all">
                              {item.desc}
                              <FeatureTooltip code={item.code} />
                            </span>
                          </div>
                          {item.note && (
                            <div className="text-[10px] text-red-600 font-bold mt-1 leading-tight">
                              {item.note}
                            </div>
                          )}
                        </td>
                        <td className="p-3 text-center text-black font-medium border-r border-gray-100 transition-colors">
                          {item.miktar || "1.000 ADET"}
                        </td>
                        <td className="p-3 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[14px] md:text-[16px] transition-colors">
                          {item.price}
                        </td>
                        <td className="p-3 text-center">
                          <button 
                            onClick={() => openWhatsApp(item)}
                            className="bg-primary text-white hover:bg-secondary transition-all p-2 rounded-lg shadow-sm scale-90 group-hover:scale-100"
                            title="WhatsApp ile Sipariş Ver"
                          >
                            <ShoppingCart size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <FireWarning />

        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* Kartvizit Özellikleri */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Kartvizit Özellikleri (2026 Güncel)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Kağıt", value: "350 gr mat veya parlak kuşe (standart)" },
                { label: "Baskı", value: "Tek taraflı veya çift taraflı full renk CMYK" },
                { label: "Ebat", value: "Standart 8x5 cm – istenirse özel ebat yapılabilir" },
                { label: "Adet", value: "100 – 10.000 adet" }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-primary font-black uppercase text-xs mb-1">{item.label}</h3>
                  <p className="font-bold text-black">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg font-medium text-black italic border-l-4 border-primary pl-6 py-2">
              "Kartvizit baskı, profesyonel ilk izlenimi belirleyen temel unsurdur. Mat kartvizit şık ve premium bir his verirken, parlak kartvizit canlı renklerle dikkat çeker."
            </p>
          </section>

          {/* Kartvizit Hangi Sektörler İçin En Uygun? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Kartvizit Hangi Sektörler İçin En Uygun?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: "Avukat Kartviziti", desc: "Hukuk büroları için sade ve güvenilir" },
                { title: "Kuaför Kartviziti", desc: "Güzellik salonları için renkli ve yaratıcı" },
                { title: "Muhasebe Kartviziti", desc: "Mali müşavirler için profesyonel ve net" },
                { title: "Emlak Kartviziti", desc: "Emlak danışmanları için QR kodlu" },
                { title: "Doktor Kartviziti", desc: "Hekimler için diploma no vurgulu" }
              ].map((sector, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-black text-black mb-2">{sector.title}</h3>
                  <p className="text-sm font-medium text-gray-500">{sector.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Özel Kartvizit Seçenekleri */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Özel Kartvizit Seçenekleri</h2>
            <p className="text-gray-500 font-medium mb-8">İhtiyacınıza uygun farklı materyal ve baskı teknikleri</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Ekonomik Kartvizit", desc: "Uygun fiyata kurumsal kimliğinizi tamamlayın." },
                { title: "Kabartma Laklı", desc: "Dokunulduğunda fark yaratan lüks ve prestijli kartlar." },
                { title: "Sıvama Kartvizit", desc: "Ekstra kalın, dayanıklı ve akılda kalıcı premium seçim." },
                { title: "Tuale Fantezi", desc: "Dokulu kağıt ile şık ve benzersiz bir farklılık yaratın." },
                { title: "Şeffaf Kartvizit", desc: "Modern, yenilikçi ve dikkat çekici şeffaf tasarımlar." },
                { title: "Plastik Kartvizit", desc: "Su geçirmez, uzun ömürlü ve prestijli plastik kartlar." }
              ].map((option, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-xl hover:border-primary/30 transition-all group">
                  <h3 className="text-xl font-black text-black mb-3">{option.title}</h3>
                  <p className="text-gray-600 font-medium mb-6">{option.desc}</p>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm group-hover:gap-4 transition-all">
                    Detaylı Bilgi Al <ArrowRight size={18} />
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Tasarım Nasıl Yapılır? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Tasarım Nasıl Yapılır?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Hedef & Konsept", desc: "Adet, logo ve iletişim detaylarını belirleyin." },
                { step: "2", title: "İçerik Planlama", desc: "Ön yüz logo/unvan, arka yüz iletişim/QR kod." },
                { step: "3", title: "Teknik Hazırlık", desc: "PDF, CMYK, 300 dpi ve +3 mm taşma payı." },
                { step: "4", title: "Onay & Baskı", desc: "Tasarımı gönderin, aynı gün onay ile üretim başlasın." }
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

          {/* Sık Yapılan 5 Hata */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="bg-red-50 p-8 rounded-[32px] border border-red-100">
              <h2 className="text-2xl font-black text-red-600 mb-6 uppercase tracking-tight">Sık Yapılan 5 Hata</h2>
              <ul className="space-y-4">
                {[
                  "Logo veya iletişim bilgileri eksikliği",
                  "Yanlış kağıt seçimi (profesyonelliği düşürür)",
                  "Baskı renk uyumsuzluğu",
                  "Tasarımın çok kalabalık ve karmaşık olması",
                  "Ebat hatası (dağıtımı zorlaştırır)"
                ].map((error, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-lg font-bold text-red-900">
                    <div className="w-2 h-2 bg-red-600 rounded-full" />
                    {error}
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-white rounded-xl border border-red-100">
                <p className="text-black font-bold">
                  💡 İpucu: Tasarım ücretimiz 200 TL'dir. Hazır tasarım getirirseniz ücretsiz baskı yapıyoruz!
                </p>
              </div>
            </section>

            <AgencyDiscountCTA />
          </div>
        </div>
      </div>
      <ProductSEOSection categoryKey="kartvizit" />
    </div>
  );
};
            const BrosurPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Broşür");
  };

  const BrosurTable = ({ category, chunks }: { category: any, chunks: any[][] }) => (
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
          {chunks.map((chunk, chunkIdx) => (
            <React.Fragment key={chunkIdx}>
              {chunk.map((item, itemIdx) => (
                <tr key={`${chunkIdx}-${itemIdx}`} className="border-b border-gray-100 hover:bg-primary/5 transition-all cursor-default group">
                  {itemIdx === 0 && (
                    <td 
                      rowSpan={chunk.length}
                      className="bg-white border-r border-gray-200 p-1.5 w-48 text-center align-middle"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-[18px] font-black text-black uppercase mb-0.5 leading-tight">
                          {category.cat.includes('Broşür') ? 'BROŞÜR' : category.cat.toUpperCase()}
                        </span>
                        <span className="text-[21px] font-black text-[#f27d26] mb-0.5 leading-tight">
                          {category.subTitle.split(' ')[0]} {category.subTitle.split(' ')[1]}
                        </span>
                        <span className="text-[11px] font-bold text-black uppercase tracking-tight text-center leading-tight">
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
                  <td className="p-1.5 text-center font-bold text-black border-r border-gray-100 group-hover:text-primary transition-colors">
                    {item.code}
                  </td>
                  <td className="p-1.5 text-center text-black font-medium border-r border-gray-100">
                    <span className="group-hover:font-bold transition-all">
                      {item.desc.split('(')[0].replace(/\s[Aa][3457]\b/g, '').trim()}
                      <FeatureTooltip code={item.code} />
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
                      className="bg-primary text-white hover:bg-secondary transition-all p-1.5 rounded-full shadow-sm scale-95 group-hover:scale-100"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {chunkIdx < chunks.length - 1 && (
                <tr className="border-b-[3px] border-[#cbd5e0]">
                  <td colSpan={7} className="h-0 p-0"></td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap shrink-0">
            <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
              <ChevronRight size={20} className="rotate-180 text-secondary" />
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Broşürler</h1>
              <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
              <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">115 - 128 - 200 gr. Kuşe - Renkli</p>
            </div>
          </div>
          <div className="flex-grow">
            <SmartBrosurFinder />
          </div>
        </div>

        <div className="space-y-16">
          {[
            { title: "115 gr. Kuşe Broşürler", data: KUSE_115_DATA },
            { title: "128 gr. Kuşe Broşürler", data: KUSE_128_DATA },
            { title: "200 gr. Kuşe Broşürler", data: KUSE_200_DATA }
          ].map((group, gIdx) => (
            <div key={gIdx} className="space-y-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1.5 h-8 bg-[#29abe2] rounded-full" />
                <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">{group.title}</h2>
              </div>
              
              <div className="space-y-12">
                {group.data.map((category, cIdx) => {
                  const chunks: any[][] = [];
                  let currentChunk: any[] = [];
                  let lastEbat: string | null = null;

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
                    <div key={cIdx} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-fit">
                      <BrosurTable category={category} chunks={chunks} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <FireWarning />

        {/* New Content Section */}
        <div className="mt-20 space-y-20">
          {/* Giriş */}
          <section>
            <h2 className="text-2xl md:text-4xl font-black text-black mb-8 uppercase tracking-tight">Broşür Baskı ile Kampanyalarınızı Duyurun</h2>
            <div className="prose prose-slate max-w-none text-black">
              <p className="text-xl leading-relaxed mb-8">
                <strong className="font-black text-primary">Broşür baskı ve el ilanı baskı hizmetlerinde Türkiye’nin en çok tercih edilen matbaasıyız.</strong> A5 broşür ve A4 broşür seçeneklerimizle tanıtım, kampanya, etkinlik ve ürün duyurularınıza etkili çözümler sunuyoruz. Katlamalı broşür, üç kırımlı broşür, flyer baskı, tanıtım broşürü, reklam broşürü, ucuz broşür baskı ve online broşür baskı ihtiyaçlarınızda yüksek kaliteli baskı ve hızlı teslimat sağlıyoruz.
              </p>
            </div>
          </section>

          {/* Hangi Broşür Kimler İçin Uygun? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-10 uppercase tracking-tight text-center">Hangi Broşür Kimler İçin Uygun?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { id: "1", title: "A5 Broşür", desc: "Küçük alanlı dağıtım, cepte taşınabilirlik (etkinlik, restoran menüsü, klinik tanıtımı)." },
                { id: "2", title: "A4 Broşür", desc: "Detaylı ürün/hizmet tanıtımı, fuar standı, yıllık rapor." },
                { id: "3", title: "Katlamalı Broşür (Üç Kırımlı)", desc: "Çoklu ürün/kampanya duyurusu, turizm broşürü, menü." },
                { id: "4", title: "Tek Kırım Broşür", desc: "Basit indirim duyurusu, hızlı dağıtım." }
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
              <h2 className="text-2xl font-black mb-8 uppercase tracking-tight text-primary">Broşür Baskı Özellikleri (2026 Güncel)</h2>
              <ul className="space-y-6">
                {[
                  { label: "Ebat", value: "A4 (21x29,7 cm) ve A5 (14,8x21 cm) standart" },
                  { label: "Kağıt", value: "115 gr parlak veya mat kuşe (standart)" },
                  { label: "Kalın Kağıt", value: "135 gr, 170 gr, 200 gr veya 250 gr kuşe seçenekleri" },
                  { label: "Katlama", value: "Tek kırım, çift kırım, üç kırımlı broşür (6 panel)" },
                  { label: "Baskı", value: "Full renk CMYK (canlı ve dikkat çekici sonuçlar)" },
                  { label: "Tasarım", value: "Profesyonel grafik tasarım desteği" }
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
              <h2 className="text-2xl font-black text-black mb-8 uppercase tracking-tight">Mavi Basım Farkı</h2>
              <ul className="space-y-6">
                {[
                  "Profesyonel sayfa düzeni ve görsel uyum",
                  "115 gr kuşe iç sayfa + 300 gr kuşe kapak seçeneği",
                  "Katlamalı seçenekler (tek, çift, üç kırımlı)",
                  "Yüksek hacimli üretim – stok kolaylığı",
                  "Aynı gün tasarım onayı – hızlı onay süreci",
                  "🎨 Tasarım ücreti: 250 TL (+KDV) – Hazır tasarım ücretsiz!"
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
                { step: "1", title: "Hedef & Konsept", desc: "Sayfa sayısı, ebat, katlama türü ve hedef kitleyi belirleyin." },
                { step: "2", title: "İçerik ve Görsel Planlama", desc: "Kapak tasarımı, ürün görselleri, fiyat/kampanya vurgusu yerleşimi." },
                { step: "3", title: "Teknik Hazırlık", desc: "Dosya PDF, CMYK, 300 dpi. Her taraftan +3 mm taşma payı bırakın." },
                { step: "4", title: "Onay & Baskı", desc: "Tasarımınızı gönderin, aynı gün onay ile üretim başlar." }
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

          {/* Broşürde Sık Yapılan 5 Hata */}
          <section className="bg-red-50 rounded-[50px] p-10 md:p-16 border border-red-100">
            <h2 className="text-2xl md:text-3xl font-black text-red-600 mb-10 uppercase tracking-tight text-center">Broşürde Sık Yapılan 5 Hata</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                { title: "Kalabalık Düzen", desc: "Okunabilirlik düşer, mesaj kaybolur." },
                { title: "Zayıf Kapak", desc: "İlk izlenim olumsuz olur, broşür açılmaz." },
                { title: "Yanlış Kağıt", desc: "Renk solması veya kağıtta yırtılma." },
                { title: "Renk Uyumu", desc: "Marka tutarsızlığı ve amatör görünüm." },
                { title: "Katlama Hatası", desc: "Sayfa düzeni ve akış bozulur." }
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
                { title: "Dergi", desc: "Yayınlarınızı profesyonelleştirin.", path: "/dergi" },
                { title: "Kartvizit", desc: "İlk izleniminizi güçlendirin.", path: "/kartvizit" },
                { title: "Cepli Dosya", desc: "Evraklarınızı prestijli hale getirin.", path: "/cepli-dosya" },
                { title: "Katalog", desc: "Ürünlerinizi en iyi şekilde tanıtın.", path: "/katalog" }
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
      </div>
      <ProductSEOSection categoryKey="brosur" />
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
              <h2 className="text-2xl font-black text-black mb-8 uppercase tracking-tight">Mavi Basım Farkı</h2>
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
                  Antetli kağıt, kurumsal belgelerin prestijini belirleyen unsurdur. <span className="text-primary font-bold">Mavi Basım Matbaa ve Reklam</span> olarak antetli kağıt baskı tasarımında şu üstünlükleri sunuyoruz:
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
                  Cepli dosya, kurumsal sunumların prestijini belirleyen unsurdur. <span className="text-primary font-bold">Mavi Basım Matbaa ve Reklam</span> olarak cepli dosya baskı tasarımında şu üstünlükleri sunuyoruz:
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
                Toptan siparişlerde ekstra avantajlar ve ajanslara özel fiyat listemiz için hemen iletişime geçin. <span className="text-white">Mavi Basım Matbaa ve Reklam</span> olarak 2026'da da en uygun fiyatlı cepli dosya çözümlerini sunuyoruz.
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

const KupBloknotPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Küp Bloknot");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Küp Bloknot</h1>
            <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
            <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">İç yapraklar müşteri tarafından yerleştirilecektir</p>
          </div>
        </div>

        <div className="space-y-12">
          {KUP_BLOKNOT_DATA.map((category, cIdx) => (
            <div key={cIdx}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-8 bg-primary rounded-full" />
                <h2 className="text-xl font-black text-black uppercase tracking-tight">{category.cat}</h2>
              </div>
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-visible relative z-10">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-[11px] md:text-[13px]">
                    <thead>
                      <tr className="bg-black text-white border-b border-black">
                        <th className="p-4 w-10"></th>
                        <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                        <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                        <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                        <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                        <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item, iIdx) => (
                        <tr key={iIdx} className="border-b border-gray-100 hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group">
                          {iIdx === 0 && (
                            <td 
                              rowSpan={category.items.length}
                              className="bg-primary text-white font-black text-center p-1 w-10 border-r border-white/10"
                              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                            >
                              <span className="tracking-[0.1em] uppercase text-[10px]">{category.cat}</span>
                            </td>
                          )}
                          <td className="p-3 text-center font-bold text-black border-r border-gray-100 group-hover:text-secondary transition-colors">{item.code}</td>
                          <td className="p-3 text-center text-black font-medium border-r border-gray-100">
                            {item.desc}
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
              <div className="mt-2 text-center">
                <p className="text-black font-bold text-[10px] md:text-xs">
                  Yukarıdaki ürünlerin kutuları Mat Selefonlu olursa 240 TL ilave olur / Mat Selefon - Kabartma Lak olursa 1500 TL ilave olur.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Content Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16">
        <section>
          <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">Küp Bloknot Baskı Çözümleri</h2>
          <div className="prose prose-slate max-w-none text-black">
            <p className="text-lg leading-relaxed mb-6">
              <strong className="font-black">Mavi Basım Matbaa ve Reklam</strong> olarak bloknot ve bloknot baskı modellerinde Türkiye’nin en çok tercih edilen matbaasıyız. A5 bloknot, A4 bloknot ve A6 bloknot seçeneklerimizle ofis, eğitim, toplantı, promosyon ve hediye ihtiyaçlarınıza pratik, kaliteli ve şık çözümler sunuyoruz.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Bloknot modelleri çizgili, kareli veya numaralı iç sayfa seçenekleriyle çeşitlenir. Bloknot 50 yaprak standart kapasitesi günlük kullanım için yeterlidir. Standart bloknotlar 50 yapraklıdır; istenildiği takdirde 25 yaprak veya 100 yaprak da yapabiliriz.
            </p>
            <p className="text-lg leading-relaxed">
              Bloknot baskı, kurumsal hediye, promosyon ve günlük kullanımda en etkili araçlardan biridir. Özellikle promosyon bloknot ile marka bilinirliği artar, ucuz bloknot ile maliyet avantajı sağlanır. A5 bloknot not alma ve sunum için idealdir, A6 bloknot cepte taşınabilirlik için tercih edilir, A4 bloknot ise geniş not alanı gerektiren işlerde uygundur.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
            <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tight">Bloknot Özellikleri (2026)</h2>
            <ul className="space-y-4">
              {[
                { label: "Ebat", value: "A4, A5, A6 (Özel ebat yapılabilir)" },
                { label: "İç Sayfa", value: "80 gr 1. hamur (Çizgili, Kareli vb.)" },
                { label: "Kapak", value: "350 gr Kuşe veya Bristol" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <span className="font-black text-primary uppercase text-xs tracking-widest">{item.label}</span>
                  <span className="font-bold text-black text-sm">{item.value}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-red-50 p-8 rounded-[32px] border border-red-100">
            <h2 className="text-2xl font-black text-red-700 mb-6 uppercase tracking-tight">Bloknotta Sık Yapılan 5 Hata</h2>
            <ul className="space-y-4">
              {[
                { title: "Eksik Bilgi", desc: "Logo veya iletişim bilgileri eksik kalması." },
                { title: "Yanlış Ebat", desc: "Kullanım amacına uygun olmayan boyut seçimi." },
                { title: "Düşük Kağıt Kalitesi", desc: "Dayanıklılığın ve prestijin azalması." },
                { title: "Renk Uyumsuzluğu", desc: "Marka kimliği ile uyuşmayan baskı renkleri." },
                { title: "Yetersiz İç Tasarım", desc: "Kullanım değerini düşüren karmaşık sayfalar." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-200 text-red-700 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-1">{idx + 1}</div>
                  <div>
                    <p className="font-black text-red-700 text-sm">{item.title}</p>
                    <p className="text-red-900/60 text-xs font-medium">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section>
          <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">Bloknot Tasarımı Nasıl Yapılır?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Hedef & Konsept", desc: "Adet, logo ve iletişim detaylarını belirleyin." },
              { step: "2", title: "İçerik Planlama", desc: "Kapak ve iç sayfa (çizgili/kareli) tasarımını yapın." },
              { step: "3", title: "Teknik Hazırlık", desc: "PDF, CMYK, 300 dpi ve +3mm taşma payı." },
              { step: "4", title: "Onay & Baskı", desc: "Tasarımı gönderin, onay sonrası üretime geçelim." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl text-center group hover:border-primary transition-all">
                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto mb-6 group-hover:bg-primary transition-colors">
                  {item.step}
                </div>
                <h3 className="text-lg font-black text-black mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <div className="inline-block p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="text-black font-bold">🎨 Tasarım ücretimiz 400 TL'dir. Hazır tasarım getirirseniz ücretsiz!</p>
            </div>
          </div>
        </section>

        <AgencyDiscountCTA />
      </div>
      <ProductSEOSection categoryKey="kup_bloknot" />
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
                Magnet baskı, etkili promosyon ve reklam aracıdır. Buzdolabı magneti olarak kalıcı görünürlük sağlar, mıknatıs üzerine ofset baskı ile logo ve iletişim bilgisi eklenir. Magnet bastırma ile markanızı evlere taşır, ucuz magnet baskı ile bütçenizi korursunuz. <strong className="font-black text-primary">Mavi Basım Matbaa ve Reklam</strong> olarak magnet hizmetini en uygun fiyata sunuyoruz. Tasarımı hazır gelen magnetler anında baskıya alınır. 1000 adet ve üzeri siparişlerde magnet fiyatları ekonomik seviyeye iner.
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
                Matbaa ve reklam ajanslarına özel indirimlerimiz ile magnet fiyatlarımız en uygun seviyede. <span className="text-white">Mavi Basım Matbaa ve Reklam</span> olarak magnet fiyatları 2026 ile şeffaf, hızlı ve kaliteli hizmet sunuyoruz.
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

const BloknotlarPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any, type: string) => {
    openProductDetail({
      ...item,
      price: item.p1000,
      miktar: '1000 Cilt',
      desc: `${type} ${item.kapak ? '- Kapak: ' + item.kapak : ''} - İç: ${item.ic}`
    }, "Bloknot");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Bloknotlar</h1>
          </div>
        </div>

        {/* Kapaklı Bloknot Section */}
        <div className="mb-12 border border-gray-300 rounded-xl overflow-visible shadow-xl relative z-10">
          <div className="bg-secondary text-white p-3 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-xl font-bold uppercase tracking-tight">Kapaklı Bloknot</h2>
            <div className="text-right text-[10px] md:text-xs font-medium">
              <p>Amerikan Cilt - 50'lik Cilt</p>
              <p>Özel kesim kapak farkı 550 TL. dir..</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans">
              <thead>
                <tr className="bg-black text-white font-black uppercase tracking-tight">
                  <th className="p-2 border border-gray-300 w-10"></th>
                  <th className="p-2 border border-gray-300">KOD</th>
                  <th className="p-2 border border-gray-300">KAPAK</th>
                  <th className="p-2 border border-gray-300">İÇ YAPRAKLAR</th>
                  <th className="p-2 border border-gray-300">500 Cilt</th>
                  <th className="p-2 border border-gray-300">1000 Cilt</th>
                  <th className="p-2 border border-gray-300 w-16">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {BLOKNOTLAR_DATA.kapakli.map((group, gIdx) => (
                  <React.Fragment key={gIdx}>
                    {group.items.map((item, iIdx) => (
                      <tr key={iIdx} className="bg-white hover:bg-primary/5 transition-colors">
                        {iIdx === 0 && (
                          <td 
                            rowSpan={group.items.length} 
                            className={`${group.color} text-white font-black text-center p-2 w-10 border border-gray-300`}
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            <span className="text-[12px] whitespace-nowrap tracking-widest">{group.ebat}</span>
                          </td>
                        )}
                        <td className="p-2 border border-gray-300 text-center font-bold text-primary">{item.code}</td>
                        <td className="p-2 border border-gray-300 text-center font-black text-black">
                          {item.kapak}
                          <FeatureTooltip code={item.kapak} />
                        </td>
                        <td className="p-2 border border-gray-300 text-center text-black font-medium">{item.ic}</td>
                        <td className="p-2 border border-gray-300 text-center font-black text-black text-sm md:text-lg">{item.p500}</td>
                        <td className="p-2 border border-gray-300 text-center font-black text-black text-sm md:text-lg">{item.p1000}</td>
                        <td className="p-2 border border-gray-300 text-center">
                          <button onClick={() => openWhatsApp(item, 'Kapaklı Bloknot')} className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors">
                            <ShoppingCart size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kapaksız Bloknot Section */}
        <div className="border border-gray-300 rounded-xl overflow-visible shadow-xl relative z-10">
          <div className="bg-secondary text-white p-3 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-xl font-bold uppercase tracking-tight">Kapaksız Bloknot</h2>
            <div className="text-right text-[10px] md:text-xs font-medium">
              <p>50'lik Tutkallı Cilt</p>
              <p>Alt karton baskısızdır..</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans">
              <thead>
                <tr className="bg-black text-white font-black uppercase tracking-tight">
                  <th className="p-2 border border-gray-300 w-10"></th>
                  <th className="p-2 border border-gray-300">KOD</th>
                  <th className="p-2 border border-gray-300">İÇ YAPRAKLAR</th>
                  <th className="p-2 border border-gray-300">500 Cilt</th>
                  <th className="p-2 border border-gray-300">1000 Cilt</th>
                  <th className="p-2 border border-gray-300 w-16">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {BLOKNOTLAR_DATA.kapaksiz.map((group, gIdx) => (
                  <React.Fragment key={gIdx}>
                    {group.items.map((item, iIdx) => (
                      <tr key={iIdx} className="bg-white hover:bg-primary/5 transition-colors">
                        {iIdx === 0 && (
                          <td 
                            rowSpan={group.items.length} 
                            className={`${group.color} text-white font-black text-center p-2 w-10 border border-gray-300`}
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            <span className="text-[12px] whitespace-nowrap tracking-widest">{group.ebat}</span>
                          </td>
                        )}
                        <td className="p-2 border border-gray-300 text-center font-bold text-primary">{item.code}</td>
                        <td className="p-2 border border-gray-300 text-center text-black font-medium">{item.ic}</td>
                        <td className="p-2 border border-gray-300 text-center font-black text-black text-sm md:text-lg">{item.p500}</td>
                        <td className="p-2 border border-gray-300 text-center font-black text-black text-sm md:text-lg">{item.p1000}</td>
                        <td className="p-2 border border-gray-300 text-center">
                          <button onClick={() => openWhatsApp(item, 'Kapaksız Bloknot')} className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors">
                            <ShoppingCart size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* New Content Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16">
        <section>
          <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase tracking-tight">Bloknot Baskı Çözümleri</h2>
          <div className="prose prose-slate max-w-none text-black">
            <p className="text-lg leading-relaxed mb-6">
              <strong className="font-black">Mavi Basım Matbaa ve Reklam</strong> olarak bloknot ve bloknot baskı modellerinde Türkiye’nin en çok tercih edilen matbaasıyız. A5 bloknot, A4 bloknot ve A6 bloknot seçeneklerimizle ofis, eğitim, toplantı, promosyon ve hediye ihtiyaçlarınıza pratik, kaliteli ve şık çözümler sunuyoruz.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Bloknot modelleri çizgili, kareli veya numaralı iç sayfa seçenekleriyle çeşitlenir. Bloknot 50 yaprak standart kapasitesi günlük kullanım için yeterlidir. Standart bloknotlar 50 yapraklıdır; istenildiği takdirde 25 yaprak veya 100 yaprak da yapabiliriz.
            </p>
            <p className="text-lg leading-relaxed">
              Bloknot baskı, kurumsal hediye, promosyon ve günlük kullanımda en etkili araçlardan biridir. Özellikle promosyon bloknot ile marka bilinirliği artar, ucuz bloknot ile maliyet avantajı sağlanır. A5 bloknot not alma ve sunum için idealdir, A6 bloknot cepte taşınabilirlik için tercih edilir, A4 bloknot ise geniş not alanı gerektiren işlerde uygundur.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
            <h2 className="text-2xl font-black text-black mb-6 uppercase tracking-tight">Bloknot Özellikleri (2026)</h2>
            <ul className="space-y-4">
              {[
                { label: "Ebat", value: "A4, A5, A6 (Özel ebat yapılabilir)" },
                { label: "İç Sayfa", value: "80 gr 1. hamur (Çizgili, Kareli vb.)" },
                { label: "Kapak", value: "350 gr Kuşe veya Bristol" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <span className="font-black text-primary uppercase text-xs tracking-widest">{item.label}</span>
                  <span className="font-bold text-black text-sm">{item.value}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-red-50 p-8 rounded-[32px] border border-red-100">
            <h2 className="text-2xl font-black text-red-700 mb-6 uppercase tracking-tight">Bloknotta Sık Yapılan 5 Hata</h2>
            <ul className="space-y-4">
              {[
                { title: "Eksik Bilgi", desc: "Logo veya iletişim bilgileri eksik kalması." },
                { title: "Yanlış Ebat", desc: "Kullanım amacına uygun olmayan boyut seçimi." },
                { title: "Düşük Kağıt Kalitesi", desc: "Dayanıklılığın ve prestijin azalması." },
                { title: "Renk Uyumsuzluğu", desc: "Marka kimliği ile uyuşmayan baskı renkleri." },
                { title: "Yetersiz İç Tasarım", desc: "Kullanım değerini düşüren karmaşık sayfalar." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-200 text-red-700 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-1">{idx + 1}</div>
                  <div>
                    <p className="font-black text-red-700 text-sm">{item.title}</p>
                    <p className="text-red-900/60 text-xs font-medium">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section>
          <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">Bloknot Tasarımı Nasıl Yapılır?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Hedef & Konsept", desc: "Adet, logo ve iletişim detaylarını belirleyin." },
              { step: "2", title: "İçerik Planlama", desc: "Kapak ve iç sayfa (çizgili/kareli) tasarımını yapın." },
              { step: "3", title: "Teknik Hazırlık", desc: "PDF, CMYK, 300 dpi ve +3mm taşma payı." },
              { step: "4", title: "Onay & Baskı", desc: "Tasarımı gönderin, onay sonrası üretime geçelim." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl text-center group hover:border-primary transition-all">
                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto mb-6 group-hover:bg-primary transition-colors">
                  {item.step}
                </div>
                <h3 className="text-lg font-black text-black mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <div className="inline-block p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="text-black font-bold">🎨 Tasarım ücretimiz 400 TL'dir. Hazır tasarım getirirseniz ücretsiz!</p>
            </div>
          </div>
        </section>

        <section className="bg-black rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full -ml-48 -mb-48 blur-3xl" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
              Matbaa ve Reklam Ajanslarına Özel İndirim!
            </h2>
            <p className="text-xl text-gray-400 mb-10 font-medium leading-relaxed">
              Toptan siparişlerde ekstra avantajlar ve ajanslara özel fiyat listemiz için bizimle iletişime geçin. <span className="text-white">Mavi Basım Matbaa ve Reklam</span> olarak 2026'da da en uygun fiyat garantisi sunuyoruz.
            </p>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl shadow-primary/20"
            >
              <ShoppingCart size={24} />
              Hemen Teklif Al
            </a>
          </div>
        </section>
      </div>
      <ProductSEOSection categoryKey="bloknot" />
    </div>
  );
};

const ReferanslarPage = () => {
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

const SikcaSorulanPage = () => {
  const faqs = [
    {
      q: "Siparişim Ne Kadar Sürede Elime Ulaşır - Ofisten Teslim Alabilir miyim?",
      a: "Teslimat süresi üründen ürüne farklılık göstermektedir. Ürün sayfalarındaki açıklamalarda belirtilen süreler 'üretim süresi'dir. Üretim tamamlandıktan sonra siparişinizi Topkapı'daki ofisimizden teslim alabilir veya kargo ile gönderimini talep edebilirsiniz.",
      icon: <Truck size={20} />
    },
    {
      q: "Tasarım Hizmeti Veriyor musunuz? Ya Memnun Kalmazsam?",
      a: "Mavi Basım olarak profesyonel tasarım desteği sunuyoruz. Tasarım ücretleri ürün bazlı değişmekte olup sipariş sırasında belirtilmektedir. Tasarım sürecinde 3 revize hakkınız bulunmaktadır. Ayrıca yakında aktif olacak 'Kendin Tasarla' modülümüz ile tasarımlarınızı sitemiz üzerinden ücretsiz yapabileceksiniz.",
      icon: <Settings size={20} />
    },
    {
      q: "Tasarım Hizmeti İçin Hangi Bilgileri Vermem Gerekiyor?",
      a: "Logonuzun vektörel formatını (PDF, AI, CDR) ve basılmasını istediğiniz adres, telefon gibi bilgileri iletmeniz yeterlidir. Vektörel logonuz yoksa, yüksek çözünürlüklü bir görselini gönderirseniz ek ücretle yeniden çizebiliriz.",
      icon: <User size={20} />
    },
    {
      q: "Baskı Öncesi Tasarım Kontrolü Yapıyor musunuz?",
      a: "Evet, gönderdiğiniz tüm çalışmalar kesim payı, çözünürlük ve yerleşim açısından ücretsiz kontrol edilir. Bir hata tespit edilirse size bilgi verilerek düzeltilmesi istenir. Onayınız alınmadan baskıya geçilmez.",
      icon: <ShieldCheck size={20} />
    },
    {
      q: "Baskıda Sorun Yaşamamak İçin Tasarımı Nasıl Göndermeliyim?",
      a: "Çalışmalarınızı CMYK renk formatında ve 300 DPI çözünürlükte hazırlamalısınız. Efekt kullandıysanız (gölge, transparanlık vb.) bunları görsele çevirmeniz renk sapmalarını önleyecektir.",
      icon: <Printer size={20} />
    },
    {
      q: "Hangi Dosya Formatlarını Kabul Ediyorsunuz?",
      a: "PDF, CDR, AI, PNG, JPEG ve TIFF formatlarını kabul ediyoruz. 100 MB'a kadar olan dosyaları sitemizden yükleyebilir, daha büyük dosyalar için WeTransfer linki iletebilirsiniz.",
      icon: <ShoppingCart size={20} />
    },
    {
      q: "İstediğim Adet veya Ürün Listede Yoksa Ne Yapmalıyım?",
      a: "Sitede görmediğiniz adetler veya özel ürünler için WhatsApp hattımızdan veya mail yoluyla bizimle iletişime geçebilirsiniz. Müşteri temsilcilerimiz size özel fiyatlandırma yapacaktır.",
      icon: <img src="/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
    },
    {
      q: "Ürünüm Hatalı veya Yanlış Basılmışsa Süreç Nasıl İşler?",
      a: "Müşteri memnuniyeti önceliğimizdir. Bizden kaynaklı bir hata durumunda, görsellerle birlikte bize bilgi vermeniz halinde işiniz ücretsiz olarak yeniden basılarak programımıza dahil edilir.",
      icon: <ShieldCheck size={20} />
    },
    {
      q: "Kargo Ücretli mi? Ne Kadar Ödemem Gerekiyor?",
      a: "Gönderimlerimizi anlaşmalı kargomuz ile 'karşı ödemeli' (alıcı ödemeli) olarak yapmaktayız. Kargo ücreti ürünün ağırlığına ve mesafeye göre değişmektedir.",
      icon: <Truck size={20} />
    },
    {
      q: "Ödememi Nasıl Yapabilirim?",
      a: "Havale/EFT veya sitemiz üzerinden 3D Secure güvenli ödeme sistemi ile kredi kartı/banka kartı kullanarak ödemenizi gerçekleştirebilirsiniz.",
      icon: <ShoppingCart size={20} />
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#fafafa] min-h-screen pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-black text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            Destek Merkezi
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4 leading-none">
            Sıkça Sorulan <span className="text-primary">Sorular</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.3em] max-w-xl mx-auto">
            Mavi Basım ile ilgili tüm merak ettiklerinize buradan ulaşabilirsiniz.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx} 
                initial={false}
                animate={{ 
                  backgroundColor: isOpen ? "#ffffff" : "#ffffff",
                  scale: isOpen ? 1.02 : 1
                }}
                className={`border ${isOpen ? 'border-primary/30 shadow-xl shadow-primary/5' : 'border-gray-100 shadow-sm'} rounded-3xl overflow-hidden transition-all duration-300`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'}`}>
                      {faq.icon}
                    </div>
                    <span className={`font-black uppercase text-sm md:text-lg tracking-tight transition-colors ${isOpen ? 'text-black' : 'text-gray-600'}`}>
                      {faq.q}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className={`${isOpen ? 'text-primary' : 'text-gray-300'} shrink-0 ml-4`}
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 md:pb-10 ml-0 md:ml-16">
                        <div className="h-px bg-gray-100 mb-6 w-full" />
                        <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 relative overflow-hidden bg-black rounded-[40px] p-10 md:p-16 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
              Hala Sorularınız mı Var?
            </h3>
            <p className="text-gray-400 mb-10 font-bold uppercase text-xs tracking-widest">
              Ekibimiz size yardımcı olmak için burada.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-secondary hover:scale-105 transition-all shadow-lg shadow-primary/20"
              >
                <img src="/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
                WhatsApp Destek Hattı
              </a>
              <a 
                href="mailto:info@mavibasim.com" 
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-white/10 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                E-Posta Gönder
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const MatbaaPage = () => {
  const { openProductDetail } = useCart();
  const [currentBanner, setCurrentBanner] = React.useState(0);

  const banners = [
    {
      title: "Kurumsal Matbaa Çözümleri",
      subtitle: "Türkiye’nin Güvenilir Baskı Merkezi",
      image: "/b1.webp",
      primaryBtn: { text: "Fiyat Listesi", link: "#fiyatlar" },
      secondaryBtn: { text: "Teklif Alın", link: WHATSAPP_LINK }
    },
    {
      title: "1000 Adet Kartvizit Sadece 580 TL",
      subtitle: "En Uygun Fiyat Garantisi ile Profesyonel Kartvizit Baskısı",
      image: "/b2.webp",
      primaryBtn: { text: "Hemen Sipariş Ver", link: "/kartvizit" },
      secondaryBtn: { text: "WhatsApp Destek", link: WHATSAPP_LINK }
    },
    {
      title: "2000 Adet El İlanı 1150 TL",
      subtitle: "Tanıtımınız İçin En Ekonomik Çözüm - Hızlı Üretim",
      image: "/b3.webp",
      primaryBtn: { text: "Fiyatları Gör", link: "/el-ilani" },
      secondaryBtn: { text: "Hızlı Teklif", link: WHATSAPP_LINK }
    },
    {
      title: "1000 Adet Broşür Sadece 1200 TL",
      subtitle: "Kaliteli Kuşe Kağıda Canlı Renkler ve Profesyonel Baskı",
      image: "/b4.webp",
      primaryBtn: { text: "Ürünleri İncele", link: "/brosur" },
      secondaryBtn: { text: "Bize Yazın", link: WHATSAPP_LINK }
    },
    {
      title: "1000 Adet Magnet Sadece 960 TL",
      subtitle: "Firmanızın Akılda Kalıcılığını Artırın - Dev Kampanya",
      image: "/b5.webp",
      primaryBtn: { text: "Kampanyayı Yakala", link: "/magnet" },
      secondaryBtn: { text: "Müşteri Hattı", link: WHATSAPP_LINK }
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const popularProducts = [
    {
      title: "Afiş / Poster Baskı",
      category: "Afiş",
      path: "/afis",
      items: [
        { qty: "250 Adet", price: AFIS_DATA[0].items[0].price, desc: AFIS_DATA[0].items[0].desc, item: AFIS_DATA[0].items[0] },
        { qty: "500 Adet", price: AFIS_DATA[0].items[1].price, desc: AFIS_DATA[0].items[1].desc, item: AFIS_DATA[0].items[1] },
        { qty: "1.000 Adet", price: AFIS_DATA[0].items[2].price, desc: AFIS_DATA[0].items[2].desc, item: AFIS_DATA[0].items[2] },
      ]
    },
    {
      title: "Amerikan Servis Baskı",
      category: "Amerikan Servis",
      path: "/amerikan-servis",
      items: [
        { qty: "2.000 Adet", price: AMERIKAN_SERVIS_DATA[0].items[0].price, desc: AMERIKAN_SERVIS_DATA[0].items[0].desc, item: AMERIKAN_SERVIS_DATA[0].items[0] },
        { qty: "2.000 Adet", price: AMERIKAN_SERVIS_DATA[0].items[1].price, desc: AMERIKAN_SERVIS_DATA[0].items[1].desc, item: AMERIKAN_SERVIS_DATA[0].items[1] },
        { qty: "2.000 Adet", price: AMERIKAN_SERVIS_DATA[0].items[2].price, desc: AMERIKAN_SERVIS_DATA[0].items[2].desc, item: AMERIKAN_SERVIS_DATA[0].items[2] },
      ]
    },
    {
      title: "Bloknot Baskı",
      category: "Bloknot",
      path: "/bloknotlar",
      items: [
        { qty: "500 Adet", price: BLOKNOTLAR_DATA.kapaksiz[0].items[0].p500, desc: BLOKNOTLAR_DATA.kapaksiz[0].items[0].ic, item: { ...BLOKNOTLAR_DATA.kapaksiz[0].items[0], miktar: "500 Adet", price: BLOKNOTLAR_DATA.kapaksiz[0].items[0].p500 } },
        { qty: "1.000 Adet", price: BLOKNOTLAR_DATA.kapaksiz[0].items[0].p1000, desc: BLOKNOTLAR_DATA.kapaksiz[0].items[0].ic, item: { ...BLOKNOTLAR_DATA.kapaksiz[0].items[0], miktar: "1.000 Adet", price: BLOKNOTLAR_DATA.kapaksiz[0].items[0].p1000 } },
      ]
    },
    {
      title: "Broşür Baskı",
      category: "Broşür",
      path: "/brosur",
      items: [
        { qty: "1.000 Adet", price: KUSE_115_DATA[0].items[4].price, desc: KUSE_115_DATA[0].items[4].desc, item: KUSE_115_DATA[0].items[4] },
        { qty: "2.000 Adet", price: KUSE_115_DATA[0].items[5].price, desc: KUSE_115_DATA[0].items[5].desc, item: KUSE_115_DATA[0].items[5] },
        { qty: "5.000 Adet", price: KUSE_115_DATA[0].items[6].price, desc: KUSE_115_DATA[0].items[6].desc, item: KUSE_115_DATA[0].items[6] },
      ]
    },
    {
      title: "Karton Çanta Baskı",
      category: "Karton Çanta",
      path: "/karton-canta",
      items: [
        { qty: "500 Adet", price: KARTON_CANTA_DATA[0].items[0].price, desc: KARTON_CANTA_DATA[0].items[0].desc, item: KARTON_CANTA_DATA[0].items[0] },
        { qty: "1.000 Adet", price: KARTON_CANTA_DATA[0].items[2].price, desc: KARTON_CANTA_DATA[0].items[2].desc, item: KARTON_CANTA_DATA[0].items[2] },
      ]
    },
    {
      title: "Katalog Baskı",
      category: "Katalog",
      path: "/katalog",
      items: [
        { qty: "50 Adet", price: KATALOG_DATA.rows[0].p50, desc: KATALOG_DATA.rows[0].label, item: { ...KATALOG_DATA.rows[0], miktar: "50 Adet", price: KATALOG_DATA.rows[0].p50, name: KATALOG_DATA.rows[0].label, desc: KATALOG_DATA.rows[0].label, code: 'KAT' } },
        { qty: "100 Adet", price: KATALOG_DATA.rows[0].p100, desc: KATALOG_DATA.rows[0].label, item: { ...KATALOG_DATA.rows[0], miktar: "100 Adet", price: KATALOG_DATA.rows[0].p100, name: KATALOG_DATA.rows[0].label, desc: KATALOG_DATA.rows[0].label, code: 'KAT' } },
      ]
    },
    {
      title: "Kartvizit Baskı",
      category: "Kartvizit",
      path: "/kartvizit",
      items: [
        { qty: "1.000 Adet", price: KARTVIZIT_DATA[0].items[0].price, desc: KARTVIZIT_DATA[0].items[0].desc, item: KARTVIZIT_DATA[0].items[0] },
        { qty: "1.000 Adet", price: KARTVIZIT_DATA[0].items[3].price, desc: KARTVIZIT_DATA[0].items[3].desc, item: KARTVIZIT_DATA[0].items[3] },
        { qty: "1.000 Adet", price: KARTVIZIT_DATA[1].items[0].price, desc: KARTVIZIT_DATA[1].items[0].desc, item: KARTVIZIT_DATA[1].items[0] },
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section Slider */}
      <section className="relative h-[300px] md:h-[400px] bg-black text-white overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img 
              src={banners[currentBanner].image} 
              alt={banners[currentBanner].title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
              <div className="max-w-4xl">
                <motion.h1 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none"
                >
                  {banners[currentBanner].title}
                </motion.h1>
                <motion.p 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl font-bold text-primary mb-6"
                >
                  {banners[currentBanner].subtitle}
                </motion.p>
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <a href={banners[currentBanner].primaryBtn.link} className="bg-primary text-white px-6 py-3 rounded-full font-black uppercase tracking-widest hover:bg-secondary transition-all text-sm">
                    {banners[currentBanner].primaryBtn.text}
                  </a>
                  <a href={banners[currentBanner].secondaryBtn.link} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-6 py-3 rounded-full font-black uppercase tracking-widest hover:bg-gray-100 transition-all text-sm">
                    {banners[currentBanner].secondaryBtn.text}
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBanner(idx)}
              className={`h-1 transition-all duration-300 rounded-full ${currentBanner === idx ? 'w-12 bg-primary' : 'w-4 bg-white/30'}`}
            />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <div className="bg-gray-50 border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <Truck className="text-primary" size={32} />
            <h3 className="font-black uppercase text-sm">Tüm Türkiye'ye Gönderim</h3>
            <p className="text-xs text-gray-500 font-bold">Güvenli teslimat.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="text-primary" size={32} />
            <h3 className="font-black uppercase text-sm">Müşteri Memnuniyeti</h3>
            <p className="text-xs text-gray-500 font-bold">Kaliteli çözümler.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img src="/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8" />
            <h3 className="font-black uppercase text-sm">WhatsApp Destek Hattı</h3>
            <p className="text-xs text-gray-500 font-bold">Hafta içi 09:00 - 18:00</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest text-center">
              Hakkımızda
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
              Profesyonel Baskı Çözümleri
            </h2>
            <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
              <p>
                2004 yılında sektöre adım atarak profesyonel baskı hizmetlerini modern bir vizyonla sunmaya başladık. Bu yolculuk, bugün Topkapı 2. Matbaacılar Sitesi’ndeki modern fabrikamız ile devam ediyor.
              </p>
              <p>
                Matbaa sektöründe 20 yılı aşkın tecrübemizle ofset baskı, dijital baskı ve özel baskı çözümlerinde lider konumdayız. Tüm üretim süreçleri kendi bünyemizde profesyonelce yönetiliyor.
              </p>
              <p>
                81 ilin tamamına kargo ile gönderim yapıyoruz – Türkiye’nin her köşesine hızlı, güvenli ve uygun maliyetli baskı hizmeti ulaştırıyoruz.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <div className="text-2xl font-black text-primary">20+</div>
                <div className="text-[10px] font-bold uppercase text-gray-400">Yıllık Tecrübe</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <div className="text-2xl font-black text-primary">81</div>
                <div className="text-[10px] font-bold uppercase text-gray-400">İl Kargo Ağı</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-2xl">
                <div className="text-2xl font-black text-primary">15k+</div>
                <div className="text-[10px] font-bold uppercase text-gray-400">Mutlu Müşteri</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="/b4.webp" alt="Fabrika" className="rounded-3xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Machine Park Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Makine Parkurumuz</h2>
            <p className="text-gray-500 font-bold uppercase text-sm tracking-widest">En son teknoloji ekipmanlarımızla tüm üretim süreçlerini kendi bünyemizde yönetiyoruz.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "KOMORI S/40 70x100 cm", desc: "2008 model – 4 renk. Büyük formatlı katalog, broşür, dergi ve afiş baskıları için." },
              { title: "KOMORI 28 50x70 cm", desc: "2005 model – 4 renk. Orta format katalog, broşür, dergi ve afiş baskıları için." },
              { title: "HEIDELBERG SM 52", desc: "2002 model – 2 renk. Orta format zarf, garanti belgesi, makbuz ve diplomat zarf baskıları için." },
              { title: "HEIDELBERG Kazanlı", desc: "56x77 cm & 38x52 cm. Karton çanta, cepli dosya özel kesimler." },
              { title: "POLAR & Wohlenberg", desc: "115’lik & 72’lik Giyotin. Hassas ve yüksek hacimli kesim." },
              { title: "Ciltleme & Yapıştırma", desc: "Tam otomatik kırım, harman ve Amerikan cilt sistemleri." }
            ].map((machine, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Settings size={24} />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-4">{machine.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{machine.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Neden Bizi Tercih Etmelisiniz?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { id: "1", title: "Online Öncüsü", desc: "Türkiye'de online matbaacılığı ilk başlatan firma (2004)." },
            { id: "2", title: "81 İl Kargo", desc: "Kapınıza kadar güvenli teslimat." },
            { id: "3", title: "Kendi Fabrikamız", desc: "Aracı yok, doğrudan üretim ile fiyat avantaj." },
            { id: "4", title: "Yüksek Kalite", desc: "Güncel Komori & Heidelberg makineleri." },
            { id: "5", title: "Hızlı Onay", desc: "Tasarım onayı sonrası üretim." },
            { id: "6", title: "Ekonomik Çözümler", desc: "Rekabetçi fiyatlarla en kaliteli baskı." },
            { id: "7", title: "Ücretsiz Destek", desc: "Profesyonel grafik tasarım ekibi." },
            { id: "8", title: "Tam Kontrol", desc: "Tüm süreçler kendi bünyemizde." }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="text-4xl font-black text-primary/20 shrink-0">{item.id}</div>
              <div>
                <h3 className="font-black uppercase text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="fiyatlar" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Popüler Ürünler ve Fiyatlar</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {popularProducts.map((prod, idx) => (
              <div key={idx} className="bg-white/5 rounded-3xl p-8 border border-white/10">
                <h3 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-primary rounded-full" />
                  <Link to={prod.path} className="hover:text-primary transition-colors">
                    {prod.title}
                  </Link>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-gray-400 font-bold uppercase tracking-widest text-[10px] border-b border-white/10">
                        <th className="pb-4">Adet</th>
                        <th className="pb-4">Fiyat</th>
                        <th className="pb-4">Özellikler</th>
                        <th className="pb-4 text-right">İşlem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {prod.items.map((item, iIdx) => (
                        <tr key={iIdx} className="group">
                          <td className="py-4 font-bold">{item.qty}</td>
                          <td className="py-4 font-black text-primary">{item.price}</td>
                          <td className="py-4 text-xs text-gray-400 max-w-[200px] truncate">{item.desc}</td>
                          <td className="py-4 text-right">
                            <button 
                              onClick={() => openProductDetail(item.item, prod.category)}
                              className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-all"
                            >
                              <ShoppingCart size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <div className="bg-primary/10 rounded-3xl p-12 border border-primary/20 max-w-3xl mx-auto">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Ajanslara Özel Çözümler</h3>
              <p className="text-gray-400 font-medium mb-8">Matbaa ve reklam ajanslarına özel indirimli fiyatlarımız ve öncelikli üretim avantajlarımızdan yararlanmak için hemen iletişime geçin.</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white px-12 py-4 rounded-full font-black uppercase tracking-widest hover:bg-secondary transition-all">
                Ajans Kaydı Başlat
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const GrafikTasarimPage = () => {
  const services = [
    { title: "Logo Tasarımı", desc: "Markanızın temel taşı olan özgün logo tasarımları" },
    { title: "Kartvizit Tasarımı", desc: "Profesyonel ilk izlenim için şık ve etkili kartvizitler" },
    { title: "Broşür & Katalog Tasarımı", desc: "Ürün/hizmet tanıtımı için detaylı ve satış odaklı tasarımlar" },
    { title: "Afiş & Poster Tasarımı", desc: "Etkinlik, kampanya ve fuar duyuruları için dikkat çekici tasarımlar" },
    { title: "Ambalaj & Etiket Tasarımı", desc: "Ürün kutusu, etiket, sticker tasarımları" },
    { title: "Kurumsal Kimlik Paketi", desc: "Logo + kartvizit + zarf + antetli + bloknot" },
  ];

  const process = [
    { title: "Brief Alma & Analiz", desc: "Markanızı, hedef kitlenizi ve beklentilerinizi detaylı öğreniyoruz." },
    { title: "Konsept & Taslak Sunumu", desc: "2-3 farklı konsept hazırlayıp ilk taslakları sunuyoruz." },
    { title: "Revizyon & Son Hal", desc: "Geri bildirimlerinizle tasarımları revize edip son haline getiriyoruz." },
    { title: "Teslim & Baskı Hazırlığı", desc: "Baskıya hazır PDF dosyalarını teslim ediyoruz. İsterseniz baskı + kargo paketiyle birlikte gönderiyoruz." },
  ];

  const pricing = [
    { service: "Logo Tasarımı", price: "500 – 4.500 TL", package: "Dahil", time: "3–7 gün" },
    { service: "Kartvizit Tasarımı", price: "200 – 800 TL", package: "Dahil", time: "1–2 gün" },
    { service: "Broşür / Flyer Tasarımı", price: "400 – 2.000 TL", package: "Dahil", time: "1–2 gün" },
    { service: "Katalog Tasarımı (8–32 sayfa)", price: "2.500 – 8.000 TL", package: "Dahil", time: "1–5 gün" },
    { service: "Afiş / Poster Tasarımı", price: "600 – 1.500 TL", package: "Dahil", time: "1–2 gün" },
    { service: "Ambalaj / Etiket Tasarımı", price: "300 – 3.500 TL", package: "Dahil", time: "1–2 gün" },
    { service: "Tam Kurumsal Kimlik Paketi", price: "—", package: "6.500 – 15.000 TL", time: "10–20 gün", isBold: true },
  ];

  const reasons = [
    "20+ yıllık sektör tecrübesi",
    "Baskı öncesi ve sonrası uyumlu tasarım (baskıya hazır dosya teslimi)",
    "Ücretsiz ilk revizyonlar (paketlere göre)",
    "Tasarım + baskı paketi indirimleri",
    "81 il kargo ile Türkiye’nin her yerine teslimat",
    "Kendi fabrikamızda üretim – aracı yok, fiyat avantajı",
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-6">
            Grafik Tasarım Hizmetleri
          </h1>
          <p className="text-lg text-black max-w-4xl mx-auto leading-relaxed font-medium">
            Mavi Basım grafik tasarım ekibi, 20 yılı aşkın tecrübesiyle markaların görsel kimliğini oluşturuyor. 
            Logo, kartvizit, broşür, katalog, afiş, ambalaj, sosyal medya görselleri ve kurumsal kimlik paketleri hazırlıyoruz. 
            Tüm tasarımlarımız baskıya hazır formatta teslim edilir – ekstra düzeltme maliyeti çıkmaz.
          </p>
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-20">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-12">
            Grafik Tasarım Hizmetlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:translate-x-1 transition-transform">{s.title}</h3>
                <p className="text-black text-sm font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-12">
            Grafik Tasarım Sürecimiz (4 Adım)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {process.map((p, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">{p.title}</h3>
                  <p className="text-black font-medium leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-20">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-12">
            Grafik Tasarım Fiyatları (2026 Güncel – KDV Hariç)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gray-200 text-secondary font-black uppercase text-sm">
                  <th className="p-4 text-left border border-gray-300">Hizmet</th>
                  <th className="p-4 text-center border border-gray-300">Tek Tasarım Fiyatı</th>
                  <th className="p-4 text-center border border-gray-300">Kurumsal Kimlik Paketi</th>
                  <th className="p-4 text-center border border-gray-300">Teslim Süresi</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((p, idx) => (
                  <tr key={idx} className={`hover:bg-primary/5 transition-colors ${p.isBold ? 'font-black bg-gray-50' : ''}`}>
                    <td className="p-4 border border-gray-300 text-black font-bold">{p.service}</td>
                    <td className="p-4 border border-gray-300 text-center text-black font-medium">{p.price}</td>
                    <td className="p-4 border border-gray-300 text-center text-black font-medium">{p.package}</td>
                    <td className="p-4 border border-gray-300 text-center text-black font-medium">{p.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-secondary/50 text-xs italic mt-6">
            Tasarım + baskı paketi alırsanız tasarım ücreti %50'ye varan oranda indirimli uygulanır.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-12">
            Neden Mavi Basım Grafik Tasarım Ekibini Tercih Etmelisiniz?
          </h2>
          <div className="space-y-6">
            {reasons.map((r, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                  <Check size={14} strokeWidth={4} />
                </div>
                <p className="text-secondary font-bold text-lg">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductSEOSection categoryKey="grafik_tasarim" />
    </div>
  );
};

const SmartKatalogFinder = ({ onClose }: { onClose: () => void }) => {
  const { openProductDetail } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [foundPrice, setFoundPrice] = useState<string | null>(null);

  const questions = [
    {
      id: 'sayfa',
      text: 'Sayfa Sayısı?',
      options: KATALOG_DATA.rows.filter(r => !r.isSpecial).map(r => ({
        label: r.total,
        value: r.total
      }))
    },
    {
      id: 'adet',
      text: 'Sipariş Adeti?',
      options: [
        { label: '50 Adet', value: 'p50' },
        { label: '100 Adet', value: 'p100' },
        { label: '250 Adet', value: 'p250' },
        { label: '500 Adet', value: 'p500' },
        { label: '1000 Adet', value: 'p1000' }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Find the price
      const row = KATALOG_DATA.rows.find(r => r.total === newAnswers.sayfa);
      if (row) {
        const price = (row as any)[newAnswers.adet];
        setFoundPrice(price);
      }
      setShowResult(true);
    }
  };

  const getQuote = () => {
    openProductDetail({
      code: "KATALOG",
      desc: `${answers.sayfa} Sayfa Katalog`,
      price: foundPrice || "0",
      miktar: questions[1].options.find(o => o.value === answers.adet)?.label || "1000"
    }, "Kataloglar");
    onClose();
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl max-w-md w-full mx-auto relative overflow-hidden border border-gray-100">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors">
        <X size={24} />
      </button>

      {!showResult ? (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500" 
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-black text-primary whitespace-nowrap uppercase tracking-tighter">{step + 1} / {questions.length}</span>
          </div>

          <h2 className="text-xl font-black text-black uppercase tracking-tight text-center">
            {questions[step].text}
          </h2>

          <div className="grid grid-cols-1 gap-2">
            {questions[step].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.value)}
                className="p-4 rounded-2xl border-2 border-gray-50 hover:border-primary hover:bg-primary/5 text-center transition-all group"
              >
                <span className="block font-black text-black group-hover:text-primary uppercase tracking-tight">{opt.label}</span>
              </button>
            ))}
          </div>

          {step > 0 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="w-full text-gray-400 font-bold text-xs flex items-center justify-center gap-1 hover:text-black transition-colors"
            >
              <ChevronLeft size={14} /> Önceki Adım
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 py-2"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 size={32} strokeWidth={3} />
          </div>
          
          <div>
            <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-1">Hesaplama Sonucu</h2>
            <p className="text-black text-xs font-bold uppercase tracking-widest">{answers.sayfa} - {questions[1].options.find(o => o.value === answers.adet)?.label}</p>
          </div>

          <div className="bg-black text-white p-6 rounded-3xl shadow-xl">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block mb-1">Net Fiyat (KDV Hariç)</span>
            <span className="text-4xl font-black text-primary">{foundPrice}</span>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={getQuote}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-tight hover:bg-secondary transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              <ShoppingCart size={20} />
              Siparişi Tamamla
            </button>
            <button
              onClick={() => {
                setStep(0);
                setAnswers({});
                setShowResult(false);
              }}
              className="text-black font-bold text-xs uppercase tracking-widest hover:text-black transition-colors"
            >
              Yeni Hesaplama Yap
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const KatalogPage = () => {
  const { openProductDetail } = useCart();
  const [showFinder, setShowFinder] = useState(false);
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Kataloglar");
  };

  return (
    <div className="bg-[#f3f4f6] min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-sm transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Katalog Baskı Fiyatları</h1>
          <button 
            onClick={() => setShowFinder(true)}
            className="ml-auto bg-primary text-white px-6 py-3 rounded-2xl font-black uppercase tracking-tighter hover:bg-secondary transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <RefreshCw size={18} />
            Akıllı Hesaplayıcı
          </button>
        </div>

        <AnimatePresence>
          {showFinder && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-2xl"
              >
                <SmartKatalogFinder onClose={() => setShowFinder(false)} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {KATALOG_DATA.rows.map((row, rIdx) => (
            <div key={rIdx} className="bg-white rounded-3xl overflow-visible shadow-2xl border border-gray-100 flex flex-col">
              <div className="p-6 bg-black text-white rounded-t-3xl">
                <h3 className="text-lg font-black uppercase tracking-tight leading-tight mb-1">{row.label}</h3>
                <p className="text-primary font-bold text-sm uppercase">{row.total} Katalog</p>
              </div>
              
              <div className="p-6 flex-grow">
                <div className="flex gap-4 mb-6">
                  <div className="w-1/2 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-black">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      İç Sayfalar: 135 gr Kuşe
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-black">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Kapaklar: 300 gr Kuşe
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-black">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Cilt: Tel Dikiş
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-black">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Kapaklar: Mat/Parlak Selefon
                    </div>
                  </div>
                  <div className="w-1/2 rounded-xl overflow-hidden border border-gray-100 shadow-inner">
                    <img 
                      src="/katalog.webp" 
                      alt="Katalog Baskı" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>

                <div className="overflow-visible rounded-2xl border border-gray-200">
                  <table className="w-full text-center text-xs">
                    <thead>
                      <tr className="bg-gray-100 text-black font-black uppercase tracking-widest border-b border-gray-200">
                        <th className="p-3 border-r border-gray-200">ADET</th>
                        <th className="p-3 border-r border-gray-200">FİYAT</th>
                        <th className="p-3">SİPARİŞ</th>
                      </tr>
                    </thead>
                    <tbody className="font-bold">
                      {[
                        { qty: '50', price: row.p50 },
                        { qty: '100', price: row.p100 },
                        { qty: '250', price: row.p250 },
                        { qty: '500', price: row.p500 },
                        { qty: '1000', price: row.p1000 }
                      ].filter(item => item.price).map((item, iIdx) => (
                        <tr key={iIdx} className="border-b border-gray-100 last:border-0 hover:bg-primary/5 transition-colors">
                          <td className="p-3 border-r border-gray-200 text-black">
                            {item.qty} Adet
                          </td>
                          <td className="p-3 border-r border-gray-200 text-black font-black text-sm">{item.price}</td>
                          <td className="p-2">
                            <button 
                              onClick={() => openWhatsApp({
                                code: "KATALOG",
                                desc: row.label,
                                price: item.price,
                                miktar: `${item.qty} Adet`
                              })}
                              className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-all hover:scale-110 active:scale-95"
                            >
                              <ShoppingCart size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}

                      {row.isSpecial && (
                        <tr>
                          <td colSpan={3} className="p-4">
                            <button 
                              onClick={() => window.open(WHATSAPP_LINK, '_blank')}
                              className="w-full bg-primary text-white py-3 rounded-xl font-black uppercase tracking-tighter hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                            >
                              <PhoneCall size={18} />
                              ÖZEL TEKLİF ALIN
                            </button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <FireWarning />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
          <p className="text-black font-bold text-center text-sm italic leading-relaxed">
            {KATALOG_DATA.footerNote}
            <br />
            <span className="text-black not-italic mt-2 block font-black uppercase tracking-tight">{KATALOG_DATA.note}</span>
          </p>
        </div>

        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* Neden Tasarım + Baskı Tek Yerde? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Neden Tasarım + Baskı Tek Yerde?</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="p-4 font-black uppercase tracking-tight border-r border-white/10">AVANTAJ</th>
                    <th className="p-4 font-black uppercase tracking-tight">AÇIKLAMA</th>
                  </tr>
                </thead>
                <tbody className="text-black font-medium">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-100 font-black">Zaman Tasarrufu</td>
                    <td className="p-4">Tek iletişim noktası, hızlı revizyon süreçleri.</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-100 font-black">Maliyet Avantajı</td>
                    <td className="p-4">Tasarım dahil paketlerde daha uygun fiyatlar.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-100 font-black">Renk Uyumu</td>
                    <td className="p-4">Tasarımcı ve matbaa ekibi aynı çatı altında tam uyum.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Forma Mantığı ve Katalog Fiyatları */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Forma Mantığı ve Katalog Fiyatları</h2>
            <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
              Matbaada kağıt firesini azaltmak, katalog baskı fiyatlarını düşürmenin en etkili yoludur. Bir formadan (64x90 cm standart kağıt) çıkan sayfa sayısı, maliyeti doğrudan etkiler.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="p-4 font-black uppercase tracking-tight border-r border-white/10">EBAT</th>
                    <th className="p-4 font-black uppercase tracking-tight border-r border-white/10">SAYFA/FORMA</th>
                    <th className="p-4 font-black uppercase tracking-tight">MALİYET ETKİSİ</th>
                  </tr>
                </thead>
                <tbody className="text-black font-medium">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-100 font-black">A4</td>
                    <td className="p-4 border-r border-gray-100">16 Sayfa</td>
                    <td className="p-4 text-green-600 font-black">En düşük birim maliyet</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-100 font-black">A5</td>
                    <td className="p-4 border-r border-gray-100">32 Sayfa</td>
                    <td className="p-4 text-green-600 font-black">%20'ye varan tasarruf</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-100 font-black">Kare (20x20)</td>
                    <td className="p-4 border-r border-gray-100">24 Sayfa</td>
                    <td className="p-4">Düşük fire, ekonomik</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-100 font-black">Yatay (A4 Yatay)</td>
                    <td className="p-4 border-r border-gray-100">16 Sayfa</td>
                    <td className="p-4">150+ adet için ekonomik</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Hangi Ebat Sizin İçin Uygun? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Hangi Ebat Sizin İçin Uygun?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "A4 Katalog", desc: "Kurumsal firmalar, B2B şirketler ve teknik sunumlar için idealdir." },
                { title: "A5 Katalog", desc: "Bayiler, fuar katılımcıları ve taşınabilir tanıtım için en çok tercih edilen." },
                { title: "Kare Katalog", desc: "Butik mağazalar, sanat galerileri ve görsel ağırlıklı portfolyolar için şık." },
                { title: "Yatay Katalog", desc: "Mimarlık ofisleri ve mobilya markaları için panoramik sunum avantajı." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl hover:border-primary transition-all group">
                  <h3 className="text-xl font-black text-black mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4 İş Gününde Teslimat Garantisi! */}
          <section className="bg-black rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full -ml-48 -mb-48 blur-3xl" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                4 İş Gününde Teslimat Garantisi!
              </h2>
              <p className="text-xl text-gray-400 mb-10 font-medium leading-relaxed">
                <span className="text-white">Mavi Basım Matbaa ve Reklam</span> olarak katalog baskı sürecimiz standart 4 iş günüdür. Her projeye %100 özgün tasarım ve yüksek baskı kalitesi sunuyoruz. Matbaa ve reklam ajanslarına özel indirimlerimiz için hemen iletişime geçin!
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
      <ProductSEOSection categoryKey="katalog" />
    </div>
  );
};

const ZarfPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Zarf");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Zarf</h1>
            <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
            <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">110 gr. 1.Hamur</p>
          </div>
        </div>

        <div className="border border-gray-300 rounded-xl overflow-hidden shadow-xl">
          <div className="bg-secondary text-white p-3 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-xl font-bold uppercase tracking-tight">Zarf</h2>
            <div className="text-right text-[10px] md:text-xs font-medium">
              <p>110 gr. 1.Hamur</p>
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
                {ZARF_DATA[0].items.map((item, idx) => (
                  <tr key={idx} className="bg-white hover:bg-primary/5 transition-colors">
                    <td className="p-2 border border-gray-300 text-center font-bold text-primary">{item.code}</td>
                    <td className="p-2 border border-gray-300 text-center font-black text-black text-sm md:text-lg">{item.price}</td>
                    <td className="p-2 border border-gray-300 text-center font-medium text-black">{item.ebat}</td>
                    <td className="p-2 border border-gray-300 text-center text-black font-medium">
                      {item.desc}
                      {item.note && <div className="text-[10px] text-red-600 font-bold mt-1">{item.note}</div>}
                    </td>
                    <td className="p-2 border border-gray-300 text-center font-bold leading-tight">
                      <span className="text-black">{item.extra.split(' ')[0]} </span>
                      <span className="text-primary">{item.extra.split(' ')[1]} </span>
                      <br />
                      <span className="text-primary">{item.extra.split(' ')[2]} </span>
                      <span className="text-black">{item.extra.split(' ')[3]}</span>
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

        <FireWarning />

        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* Hangi Zarfı Seçmelisiniz? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Hangi Zarfı Seçmelisiniz?</h2>
            <p className="text-gray-500 font-medium mb-6 text-lg">İhtiyacınıza en uygun zarf türünü belirleyin</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 font-black text-black uppercase tracking-tight text-sm">Zarf Türü</th>
                    <th className="p-4 font-black text-black uppercase tracking-tight text-sm">Ebat Önerisi</th>
                    <th className="p-4 font-black text-black uppercase tracking-tight text-sm">Avantajları</th>
                    <th className="p-4 font-black text-black uppercase tracking-tight text-sm">Kimler İçin İdeal?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { type: "Pencereli Zarf", size: "A5, A4, A3", benefits: "Alıcı bilgileri pencereden görünür – adres yazmaya gerek yok, hızlı gönderim", ideal: "Fatura, ekstre gönderenler" },
                    { type: "Çift Pencereli Zarf", size: "A4, A3", benefits: "Hem gönderici hem alıcı görünür - profesyonel ve hatasız gönderim", ideal: "Kurumsal ve yüksek hacimli gönderimler" },
                    { type: "Penceresiz Zarf", size: "A5, A4, A3", benefits: "Gizlilik sağlar - içerik görünmez, özel evraklar için güvenli", ideal: "Özel evrak, sözleşme, teklif gönderenler" },
                    { type: "Kraft Kağıttan Zarf", size: "A5, A4, A3", benefits: "Doğal, çevre dostu ve rustik görünüm", ideal: "Çevre dostu imajı ön planda tutan markalar" },
                    { type: "Amerikan Bristol Zarf", size: "A4, A3", benefits: "Premium, lüks ve parlak doku - en yüksek prestij ve kalite hissi", ideal: "Lüks ve prestij odaklı kurumsal firmalar" },
                    { type: "Özel Ebat Zarf", size: "Herhangi boyut", benefits: "Standart dışı boyutlarda üretim – tam ihtiyacınıza göre özelleştirme", ideal: "Standart dışı özel projeler" }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-bold text-black">{row.type}</td>
                      <td className="p-4 text-gray-600 font-medium">{row.size}</td>
                      <td className="p-4 text-gray-600 text-sm leading-relaxed">{row.benefits}</td>
                      <td className="p-4 font-bold text-primary text-sm">{row.ideal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Zarf Baskı Tasarımı ve Farkımız */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Zarf Baskı Tasarımı ve Farkımız</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Baskı İçeriği", value: "Logo, unvan, vergi no, adres, telefon, web sitesi" },
                { label: "Kağıt Türü", value: "110 gr 1. hamur veya özel kağıt (kraft, Bristol vb.)" },
                { label: "Baskı Kalitesi", value: "1-4 renkli baskı – Heidelberg SM 52 kalitesi" },
                { label: "Özel Çeşitler", value: "Çift pencereli, kraft, Amerikan Bristol" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-primary font-black uppercase text-xs mb-2 tracking-widest">{item.label}</h3>
                  <p className="font-bold text-black leading-tight">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                <Zap size={24} />
              </div>
              <p className="text-black font-bold text-lg">
                💡 Tasarım ücretimiz 250 TL'dir. Hazır tasarım getirirseniz ücretsiz baskı yapıyoruz!
              </p>
            </div>
          </section>

          {/* Zarfta Sık Yapılan 5 Hata */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Zarfta Sık Yapılan 5 Hata</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { step: "1", title: "Bilgi Eksikliği", desc: "Logo veya adres eksikliği kurumsal kimliği zayıf kalır." },
                { step: "2", title: "Yanlış Ebat", desc: "Belge katlama sorunlarına yol açar." },
                { step: "3", title: "Düşük Kalite", desc: "Düşük kaliteli kağıt prestij kaybına neden olur." },
                { step: "4", title: "Renk Uyumsuzluğu", desc: "Baskı renk uyumsuzluğu marka tutarsızlığı yaratır." },
                { step: "5", title: "Hatalı Pencere", desc: "Pencere yerleşimi hatalıysa içerik görünürlüğü bozulur." }
              ].map((item, idx) => (
                <div key={idx} className="bg-red-50 p-6 rounded-2xl border border-red-100 relative pt-10">
                  <span className="absolute top-4 left-6 text-4xl font-black text-red-200/50">{item.step}</span>
                  <h3 className="font-black text-red-700 mb-2 relative z-10">{item.title}</h3>
                  <p className="text-sm font-medium text-red-900/70 leading-relaxed relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <AgencyDiscountCTA />
        </div>
      </div>
      <ProductSEOSection categoryKey="zarf" />
    </div>
  );
};

const KartonCantaPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any, ebat: string) => {
    openProductDetail({ ...item, ebat }, "Karton Çanta");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Karton Çanta</h1>
          </div>
        </div>

        {KARTON_CANTA_DATA.map((group, gIdx) => (
          <div key={gIdx} className="mb-10 border border-gray-300 rounded-xl overflow-visible shadow-xl relative z-10">
            <div className="bg-secondary text-white p-3 flex flex-col md:flex-row justify-between items-start md:items-center">
              <h2 className="text-xl font-bold uppercase tracking-tight">Karton Çanta - {group.ebat}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans">
                <thead>
                  <tr className="bg-black text-white font-black uppercase tracking-tight">
                    <th className="p-2 border border-gray-300">KOD</th>
                    <th className="p-2 border border-gray-300">AÇIKLAMA</th>
                    <th className="p-2 border border-gray-300">ADET</th>
                    <th className="p-2 border border-gray-300">FİYAT</th>
                    <th className="p-2 border border-gray-300 w-16">SİPARİŞ</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((item, iIdx) => (
                    <tr key={iIdx} className="bg-white hover:bg-primary/5 transition-colors">
                      <td className="p-2 border border-gray-300 text-center font-bold text-primary">{item.code}</td>
                      <td className="p-2 border border-gray-300 text-black font-medium">
                        {item.desc}
                        <FeatureTooltip code={item.code} />
                      </td>
                      <td className="p-2 border border-gray-300 text-center text-black font-medium">{item.miktar}</td>
                      <td className="p-2 border border-gray-300 text-center font-black text-black text-sm md:text-lg">{item.price}</td>
                      <td className="p-2 border border-gray-300 text-center">
                        <button onClick={() => openWhatsApp(item, group.ebat)} className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors">
                          <ShoppingCart size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* Hangi Ebat Sizin İçin En Uygun? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Hangi Ebat Sizin İçin En Uygun?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { size: "17x25x7 cm", desc: "Optikçiler, eczaneler, küçük butikler, hediyelik eşya mağazaları" },
                { size: "20x25x10 cm", desc: "Kozmetik mağazaları, bijuteri dükkanları, küçük elektronikçiler" },
                { size: "25x35x8 cm (dikey)", desc: "Giyim mağazaları, ayakkabı dükkanları, kitapçılar, fuar boy" },
                { size: "35x25x8 cm (yatay)", desc: "Fuar katılımcıları, katalog dağıtımı yapan firmalar" },
                { size: "54x38x13 cm (yatay)", desc: "Mobilya mağazaları, ev tekstili, büyük hediye paketleri" },
                { size: "35x47x12 cm (dikey)", desc: "Elektronik mağazaları, büyük giyim zincirleri" }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:shadow-xl transition-all group">
                  <h3 className="text-xl font-black text-primary mb-2 group-hover:text-secondary transition-colors">{item.size}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Karton Çanta Özellikleri */}
          <section className="bg-black rounded-[40px] p-8 md:p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <h2 className="text-2xl md:text-3xl font-black mb-8 uppercase tracking-tight relative z-10">Karton Çanta Özellikleri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { label: "Kağıt", value: "210 gr Amerikan Bristol (Yüksek Dayanıklılık)" },
                { label: "Kaplama", value: "Mat veya Parlak Selefon (Standart)" },
                { label: "Baskı", value: "Full Renk CMYK (Logo, Slogan, İletişim)" },
                { label: "Adet", value: "100 – 1.000 Adet (Kurumsal Kullanım)" }
              ].map((item, idx) => (
                <div key={idx} className="border-l-2 border-primary pl-4">
                  <p className="text-primary font-black uppercase text-xs tracking-widest mb-1">{item.label}</p>
                  <p className="font-bold text-lg">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Karton Çanta Tasarımı Nasıl Yapılır? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">Karton Çanta Tasarımı Nasıl Yapılır?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Hedef & Konsept", desc: "Kaç adet? Logo, slogan, iletişim bilgileri gibi detayları belirleyin." },
                { step: "2", title: "İçerik Planlama", desc: "Ön yüz: Logo, slogan. Yan yüzler: İletişim bilgileri veya görsel." },
                { step: "3", title: "Teknik Hazırlık", desc: "Dosya PDF, CMYK, 300 dpi ve +3 mm taşma payı." },
                { step: "4", title: "Onay & Baskı", desc: "Tasarımınızı gönderin, aynı gün onay ile üretim başlar." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl text-center group hover:border-primary transition-all">
                  <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto mb-6 group-hover:bg-primary transition-colors">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-black text-black mb-4">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <div className="inline-block p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-black font-bold">🎨 Tasarım ücretimiz 400 TL'dir. Hazır tasarım getirirseniz ücretsiz!</p>
              </div>
            </div>
          </section>

          {/* Karton Çantada Sık Yapılan 5 Hata */}
          <section className="bg-red-50 p-8 md:p-12 rounded-[40px] border border-red-100">
            <h2 className="text-2xl md:text-3xl font-black text-red-600 mb-8 uppercase tracking-tight">Karton Çantada Sık Yapılan 5 Hata</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Eksik Bilgi", desc: "Logo veya iletişim bilgileri eksik kalması markayı unutturur." },
                { title: "Yanlış Ebat", desc: "Ürünün sığmaması veya çantanın fazla boş kalması." },
                { title: "Düşük Kağıt Kalitesi", desc: "Kolay yırtılan veya bükülen dayanıksız malzemeler." },
                { title: "Renk Uyumsuzluğu", desc: "Marka kimliği ile uyuşmayan baskı renkleri." },
                { title: "Karmaşık Tasarım", desc: "Görsel etkiyi azaltan çok kalabalık tasarımlar." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-black shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-black text-red-600 uppercase text-sm mb-1">{item.title}</h3>
                    <p className="text-red-900/70 text-sm font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Kurumsal Kimliğinizi Güçlendirin! */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">Kurumsal Kimliğinizi Güçlendirin!</h2>
            <p className="text-center text-gray-500 font-medium mb-8">Karton çanta siparişinizin yanına bunları da ekleyebilirsiniz.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Katalog", desc: "Ürünlerinizi detaylı tanıtın.", path: "/kataloglar" },
                { title: "Kartvizit", desc: "Profesyonel imaj yaratın.", path: "/kartvizit" },
                { title: "Antetli Kağıt", desc: "Resmi yazışmalarınız için.", path: "/antetli-kagit" },
                { title: "Zarf", desc: "Kurumsal gönderileriniz için.", path: "/zarf" }
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
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full -ml-48 -mb-48 blur-3xl" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                Matbaa ve Reklam Ajanslarına Özel İndirim!
              </h2>
              <p className="text-xl text-gray-400 mb-10 font-medium leading-relaxed">
                Toptan siparişlerde ekstra avantajlar ve ajanslara özel fiyat listemiz için hemen iletişime geçin. <span className="text-white">Mavi Basım Matbaa ve Reklam</span> olarak 2026'da da en uygun fiyatlı karton çanta çözümlerini sunuyoruz.
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
      <ProductSEOSection categoryKey="karton_canta" />
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
                Amerikan servis baskı talepleri genellikle restoran sahipleri, kafe işletmecileri, catering firmaları, otel restoranları, fast food zincirleri, pastaneler ve dönercilerden gelir. Günlük 1.000-5.000 adet kullanılırken, yüksek hacimli zincirler 10.000+ adet sipariş verir. Amerikan servis baskı fiyatları adet, kağıt kalitesi ve baskı türüne göre değişir. <strong className="font-black text-primary">Mavi Basım</strong> olarak amerikan servis baskı konusunda Türkiye’nin en hızlı ve en uygun fiyatlı matbaasıyız.
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

const HakkimizdaPage = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-6">
            Hakkımızda
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-lg md:text-xl text-black leading-relaxed font-medium mb-6">
                2004 yılında Türkiye’de ilk kez online matbaa sipariş sistemini hayata geçirdik. 
                O dönemde internet üzerinden baskı siparişi vermek hayal gibi görünürken, biz bu hayali gerçeğe dönüştürdük.
              </p>
              <p className="text-lg md:text-xl text-black leading-relaxed font-medium">
                Bugün ise Topkapı 2. Matbaacılar Sitesi’ndeki modern üretim merkezimiz ve Bayrampaşa’daki grafik tasarım & satış ofisimiz ile hizmet veriyoruz.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Tüm Türkiye'ye Teslimat</h3>
                  <p className="text-black font-medium">81 ilin tamamına kargo ile gönderim yaparak Türkiye’nin her köşesine kaliteli baskı ulaştırıyoruz.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
                  <Printer size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Aracısız Üretim</h3>
                  <p className="text-black font-medium">Kendi üretim tesisimizde kesim-yapıştırma-ciltleme ve güncel makine parkuru ile fark yaratıyoruz.</p>
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
            <div className="absolute -bottom-8 -left-8 bg-primary text-white p-8 rounded-3xl shadow-xl hidden md:block">
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
        </div>
      </div>
    </div>
  );
};

const SmartCiltFinder = ({ data, isModalMode = false }: { data: any[], isModalMode?: boolean }) => {
  const allEbatOptions = Array.from(new Set([
    ...data.map(d => d.ebat)
  ]));
  
  // Sort by area (approximate)
  const getArea = (s: string) => {
    const matches = s.match(/(\d+[,.]?\d*)\s*x\s*(\d+[,.]?\d*)/);
    if (!matches) return 0;
    const w = parseFloat(matches[1].replace(',', '.'));
    const h = parseFloat(matches[2].replace(',', '.'));
    return w * h;
  };
  
  const ebatOptions = allEbatOptions.sort((a, b) => getArea(a) - getArea(b));
  const [selectedEbat, setSelectedEbat] = useState(ebatOptions[0]);
  
  const effectiveEbat = selectedEbat;

  const filteredByEbat = data.filter(d => d.ebat === effectiveEbat);
  const nushaOptions = Array.from(new Set(filteredByEbat.flatMap(d => d.rows.filter((r: any) => !r.label.includes('Renk Farkı')).map((r: any) => r.label))));
  
  const [selectedNusha, setSelectedNusha] = useState(nushaOptions[0]);
  const [selectedAdetIdx, setSelectedAdetIdx] = useState(0);
  const [is2Renk, setIs2Renk] = useState(false);

  // Sync nusha when ebat changes
  useEffect(() => {
    const newNushaOptions = Array.from(new Set(data.filter(d => d.ebat === effectiveEbat).flatMap(d => d.rows.filter((r: any) => !r.label.includes('Renk Farkı')).map((r: any) => r.label))));
    if (!newNushaOptions.includes(selectedNusha)) {
      setSelectedNusha(newNushaOptions[0]);
    }
  }, [selectedEbat, data, effectiveEbat]);

  const selectedProduct = filteredByEbat.find(d => d.rows.some((r: any) => r.label === selectedNusha)) || filteredByEbat[0];
  const adetOptions = selectedProduct.headers;
  const colorDiffRow = selectedProduct.rows.find((r: any) => r.label.includes('Renk Farkı'));

  const basePrice = selectedProduct.rows.find((r: any) => r.label === selectedNusha)?.values[selectedAdetIdx] || 0;
  const colorDiff = is2Renk && colorDiffRow ? colorDiffRow.values[selectedAdetIdx] : 0;
  
  let totalPrice = basePrice + colorDiff;

  const openWhatsApp = () => {
    window.open(WHATSAPP_LINK, '_blank');
  };

  return (
    <div className={`${isModalMode ? 'bg-transparent border-0 shadow-none p-0' : 'bg-blue-50 rounded-2xl shadow-lg border border-primary/30 p-4 mb-8'} overflow-hidden relative w-full`}>
      {!isModalMode && (
        <div className="absolute top-0 right-0 bg-secondary/10 text-secondary text-[9px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
          5 Ciltte Bir Ayraç Dahildir
        </div>
      )}

      <div className={`flex flex-col ${isModalMode ? 'gap-8' : 'md:flex-row items-center gap-6 mt-2 md:mt-0'}`}>
        {!isModalMode && (
          <div className="flex items-center gap-3 shrink-0 md:border-r md:border-gray-100 md:pr-6">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-secondary/20">
              <Zap size={24} />
            </div>
            <div>
              <h2 className="text-sm font-black text-black uppercase tracking-tight">Akıllı Fiyat Hesaplayıcı</h2>
              <p className="text-[10px] text-black font-medium">İstediğiniz özellikleri seçin, fiyatı görün.</p>
            </div>
          </div>
        )}

        <div className={`flex-grow w-full grid grid-cols-1 ${isModalMode ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-4`}>
          <div className="space-y-1">
            <label className="text-[12px] font-black text-black uppercase ml-1">Ebat Seçimi</label>
            <div className="flex flex-col gap-1">
              {ebatOptions.map((opt: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedEbat(opt)}
                  className={`px-2 py-2 rounded-lg border text-[11px] font-black transition-all w-full text-left ${
                    selectedEbat === opt 
                    ? 'bg-secondary text-white border-secondary shadow-md' 
                    : 'bg-white text-black border-gray-200 hover:border-secondary/30'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[12px] font-black text-black uppercase ml-1">Nüsha Sayısı</label>
            <div className="flex flex-col gap-1">
              {nushaOptions.map((opt: any, idx: number) => {
                // Calculate price for this specific nusha option
                const optBasePrice = selectedProduct.rows.find((r: any) => r.label === opt)?.values[selectedAdetIdx] || 0;
                const optColorDiff = is2Renk && colorDiffRow ? colorDiffRow.values[selectedAdetIdx] : 0;
                let optTotalPrice = optBasePrice + optColorDiff;

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedNusha(opt)}
                    className={`px-2 py-2 rounded-lg border text-[11px] font-black transition-all w-full text-left ${
                      selectedNusha === opt 
                      ? 'bg-secondary text-white border-secondary shadow-md' 
                      : 'bg-white text-black border-gray-200 hover:border-secondary/30'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span>{opt}</span>
                      <span className={`text-[9px] font-bold ${selectedNusha === opt ? 'text-white/80' : 'text-primary'}`}>
                        {optTotalPrice} ₺
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[12px] font-black text-black uppercase ml-1">Adet (Cilt)</label>
            <div className="grid grid-cols-2 gap-1">
              {adetOptions.map((opt: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAdetIdx(idx)}
                  className={`px-2 py-2 rounded-lg border text-[11px] font-black transition-all w-full ${
                    selectedAdetIdx === idx 
                    ? 'bg-secondary text-white border-secondary shadow-md' 
                    : 'bg-white text-black border-gray-200 hover:border-secondary/30'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between ml-1">
              <label className="text-[12px] font-black text-black uppercase">Renk Seçimi</label>
            </div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setIs2Renk(false)}
                className={`px-3 py-2 rounded-lg border text-[11px] font-black transition-all w-full ${
                  !is2Renk 
                  ? 'bg-secondary text-white border-secondary shadow-md' 
                  : 'bg-white text-black border-gray-200 hover:border-secondary/30'
                }`}
              >
                1 RENK
              </button>
              <button
                onClick={() => setIs2Renk(true)}
                className={`px-3 py-2 rounded-lg border text-[11px] font-black transition-all w-full ${
                  is2Renk 
                  ? 'bg-secondary text-white border-secondary shadow-md' 
                  : 'bg-white text-black border-gray-200 hover:border-secondary/30'
                }`}
              >
                2 RENK
              </button>
            </div>
          </div>
        </div>

        <div className={`shrink-0 flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-4 border border-gray-100 min-w-[140px] ${isModalMode ? 'mt-4' : ''}`}>
          <span className="text-[10px] font-bold text-black uppercase">Toplam Fiyat</span>
          <div className="text-2xl font-black text-primary my-1">
            {totalPrice} ₺
          </div>
          <button 
            onClick={openWhatsApp}
            className="w-full mt-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/20"
          >
            <img src="/WhatsApp.svg" alt="WhatsApp" className="w-4 h-4" />
            SİPARİŞ VER
          </button>
        </div>
      </div>
    </div>
  );
};

const SiparisFisiCalculatorModal = ({ isOpen, onClose, data }: { isOpen: boolean, onClose: () => void, data: any[] }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl border border-white/20"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-gray-100 hover:bg-red-500 hover:text-white rounded-2xl transition-all z-10 group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform" />
        </button>
        
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tighter leading-none mb-3 flex items-center gap-3">
                <span>{data[0]?.title.includes("ADİSYON") ? "ADİSYON" : data[0]?.title.includes("SÖZLEŞME") ? "SÖZLEŞME" : data[0]?.title.includes("PARA MAKBUZU") ? "MAKBUZ" : "SİPARİŞ FİŞİ"}</span>
                <span className="text-gray-300 font-light">|</span>
                <span className="text-primary font-medium">{data[0]?.ebat}</span>
              </h2>
              <p className="text-sm text-black font-medium">Özellikleri seçin, anında fiyat alın ve sipariş verin.</p>
            </div>
          </div>
          
          <div className="bg-gray-50/50 rounded-[2rem] p-6 md:p-8 border border-gray-100">
            <SmartCiltFinder data={data} isModalMode={true} />
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

const SiparisFisiHorizontalTable = ({ data }: { data: any[] }) => {
  const { openProductDetail } = useCart();
  const section = data[0];
  if (!section) return null;

  const openWhatsApp = (title: string, label: string, ebat: string, header: string, price: number) => {
    openProductDetail({
      code: title,
      desc: `${label} - ${ebat} - ${header}`,
      price: price.toString(),
      miktar: header
    }, title);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-12">
      <div className="bg-secondary p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            {section.title.includes("ADİSYON") ? "ADİSYON" : section.title.includes("SÖZLEŞME") ? "SÖZLEŞME" : section.title}
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
            <span className="text-white/40 text-xl font-light hidden md:block">|</span>
            <p className="text-sm md:text-base font-bold text-white/90">
              Ölçü: {section.ebat} ({section.ozellik.split(' - ')[0]})
            </p>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-4 border-r border-white/10 font-black text-left uppercase text-sm md:text-base whitespace-nowrap min-w-[140px]">
                {section.title.includes("ADİSYON") ? "ADET" : section.title.includes("SÖZLEŞME") ? "TAM BOY" : section.ebat.includes("KÜÇÜK BOY") ? "KÜÇÜK BOY" : "YARIM BOY"}
              </th>
              {section.headers.map((header: string, idx: number) => (
                <th key={idx} className="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">
                  {header}
                </th>
              ))}
              <th className="p-4 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">SİPARİŞ</th>
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row: any, rIdx: number) => (
              <tr key={rIdx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                <td className="p-4 border-r border-gray-200 font-black text-black bg-gray-50/50 text-sm md:text-base">
                  {row.label}
                </td>
                {row.values.map((val: number, vIdx: number) => (
                  <td key={vIdx} className="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm group-hover:bg-primary/5 transition-colors">
                    {val.toLocaleString('tr-TR')}
                  </td>
                ))}
                <td className="p-4 text-center">
                  <button 
                    onClick={() => openWhatsApp(section.title, row.label, section.ebat, section.headers[0], row.values[0])}
                    className="bg-primary hover:bg-secondary text-white p-2 rounded-lg transition-all shadow-lg shadow-primary/20"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const MakbuzFormlarPage = () => {
  const location = useLocation();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const pathId = location.pathname.replace('/', '');

  const getCategoryKey = (pathId: string) => {
    const mapping: Record<string, string> = {
      'adisyon': 'adisyon',
      'siparis-fisi': 'siparis_fisi',
      'para-makbuzu': 'para_makbuzu',
      'sozlesme-baski': 'sozlesme',
      'sigorta-policeleri': 'sigorta_policeleri',
      'tahsilat-makbuzu': 'tahsilat_makbuzu',
      'arac-kiralama': 'arac_kiralama',
      'gider-makbuzu': 'gider_makbuzu',
      'giris-bileti': 'giris_bileti',
      'recete': 'recete',
      'senet': 'senet',
      'tediye-makbuzu': 'tediye_makbuzu',
      'perakende-satis-fisi': 'perakende_satis_fisi',
    };
    return mapping[pathId] || 'makbuz_fisler';
  };

  const filteredData = pathId && pathId !== 'makbuz-ve-formlar'
    ? MAKBUZ_FORMLAR_ALL_DATA.filter(item => item.id === pathId)
    : MAKBUZ_FORMLAR_ALL_DATA;

  const pageTitle = pathId && pathId !== 'makbuz-ve-formlar'
    ? filteredData[0]?.title || "MAKBUZ & FİŞLER"
    : "MAKBUZ & FİŞLER";

  const isAllPage = pathId === 'makbuz-ve-formlar' || !pathId;

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-black text-primary uppercase tracking-tighter mb-4">
            {pageTitle}
          </h1>
          <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
        </div>

        <div className="space-y-20">
          {filteredData.map((item, idx) => (
            <div key={idx} id={item.id} className="scroll-mt-24 group">
              <div className="flex justify-between items-center mb-6 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-6 bg-secondary rounded-full" />
                  <span className="text-sm font-black text-gray-400 uppercase tracking-widest">{item.ebat}</span>
                </div>
                
                {!isAllPage && (
                  <button 
                    onClick={() => setIsCalculatorOpen(true)}
                    className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all flex items-center gap-2 shadow-xl shadow-primary/20 group/btn"
                  >
                    <Zap size={16} className="fill-white group-hover/btn:scale-110 transition-transform" />
                    Akıllı Hesaplayıcı
                  </button>
                )}
              </div>
              <SiparisFisiHorizontalTable data={[item]} />
            </div>
          ))}
        </div>

        {!isAllPage && (
          <SiparisFisiCalculatorModal 
            isOpen={isCalculatorOpen} 
            onClose={() => setIsCalculatorOpen(false)} 
            data={filteredData} 
          />
        )}
      </div>
      <div className="text-black">
        <ProductSEOSection categoryKey={getCategoryKey(pathId)} />
      </div>
    </div>
  );
};

const GenericPriceTablePage = ({ data }: { data: any[] }) => {
  const { openProductDetail } = useCart();
  const navigate = useNavigate();
  const isSiparisFisi = data[0]?.title === "SİPARİŞ FİŞİ";
  const isAdisyon = data[0]?.title.includes("ADİSYON");
  const isSozlesme = data[0]?.title.includes("SÖZLEŞME");
  const isParaMakbuzu = data[0]?.title.includes("PARA MAKBUZU");
  const isSpecialPage = isSiparisFisi || isAdisyon || isSozlesme || isParaMakbuzu;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  const openWhatsApp = (title: string, label: string, ebat: string, header: string, price: number) => {
    openProductDetail({
      code: title,
      desc: `${label} - ${ebat} - ${header}`,
      price: price.toString(),
      miktar: header
    }, title);
  };
  const groupedByEbat = data.reduce((acc: any, item: any) => {
    const key = item.ebat;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4 flex-wrap shrink-0">
            <button 
              onClick={() => navigate(-1)}
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
            >
              <ChevronLeft size={20} className="text-secondary" />
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-secondary whitespace-nowrap">
                {data.length === 1 ? (data[0].title.includes("ADİSYON") ? "ADİSYON" : data[0].title.includes("SÖZLEŞME") ? "SÖZLEŞME" : data[0].title.includes("PARA MAKBUZU") ? "PARA MAKBUZU" : data[0].title) : "Cilt İşleri"}
              </h1>
              <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
              <p className="text-sm md:text-base font-bold text-black whitespace-nowrap">
                {data.length === 1 ? `${data[0].ebat} Cilt İşleri` : "Fiyat Listesi"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-16">
          {isSpecialPage ? (
            <SiparisFisiHorizontalTable data={data} />
          ) : (
            Object.entries(groupedByEbat).map(([ebat, sections]: [string, any], gIdx) => (
              <div key={gIdx}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-secondary rounded-full" />
                    <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">{ebat} Cilt İşleri</h2>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-[11px] md:text-[13px]">
                      <thead>
                        <tr className="bg-black text-white border-b border-black">
                          <th className="p-4 w-10"></th>
                          <th className="p-4 text-left font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                          <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 text-center">ADET</th>
                          <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 text-center">FİYAT</th>
                          <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sections.map((section: any, sIdx: number) => (
                          <React.Fragment key={sIdx}>
                            {section.rows.map((row: any, rIdx: number) => (
                              <React.Fragment key={rIdx}>
                                {section.headers.map((header: string, hIdx: number) => (
                                  <tr key={hIdx} className="border-b border-gray-100 hover:bg-secondary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all group">
                                    {rIdx === 0 && hIdx === 0 && (
                                      <td 
                                        rowSpan={section.rows.length * section.headers.length + (section.rows.length - 1)}
                                        className="bg-secondary text-white font-black text-center p-1 w-10 border-r border-white/10"
                                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                                      >
                                        <span className="tracking-[0.1em] uppercase text-[10px]">{section.title}</span>
                                      </td>
                                    )}
                                    <td className="p-4 font-medium text-black border-r border-gray-100">
                                      <div className="flex flex-col">
                                        <span className="transition-all font-black tracking-tight text-black">
                                          {row.label}
                                        </span>
                                        <span className="text-[9px] text-gray-400 font-bold uppercase">{section.ozellik}</span>
                                      </div>
                                    </td>
                                    <td className="p-4 text-center font-bold text-black border-r border-gray-100">
                                      {header}
                                    </td>
                                    <td className="p-4 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-secondary/5 transition-colors">
                                      {row.values[hIdx].toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} TL
                                    </td>
                                    <td className="p-4 text-center">
                                      <button 
                                        onClick={() => openWhatsApp(section.title, row.label, ebat, header, row.values[hIdx])}
                                        className="bg-secondary hover:bg-black text-white p-2 rounded-lg transition-all shadow-lg shadow-secondary/20 hover:scale-110"
                                      >
                                        <ShoppingCart size={18} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                                {rIdx < section.rows.length - 1 && (
                                  <tr className="bg-gray-100/50 h-3 border-b border-gray-200">
                                    <td colSpan={4} className="p-0"></td>
                                  </tr>
                                )}
                              </React.Fragment>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const IletisimPage = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-6">
            İletişim
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-black font-medium max-w-2xl mx-auto">
            Sorularınız, fiyat teklifleri veya projeleriniz için bizimle iletişime geçebilirsiniz.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Phone size={32} />
              </div>
              <h2 className="text-xl font-bold text-primary mb-2">Telefon</h2>
              <p className="text-black font-medium mb-4">Hafta içi: 09:00 - 19:00</p>
              <a href={PHONE_LINK} className="text-primary font-black text-xl hover:underline">
                {PHONE_NUMBER}
              </a>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <img src="/WhatsApp.svg" alt="WhatsApp" className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-green-600 mb-2">WhatsApp</h2>
              <p className="text-black font-medium mb-4">Hızlı fiyat teklifi için</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-green-600 font-black text-xl hover:underline">
                {PHONE_NUMBER}
              </a>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Mail size={32} />
              </div>
              <h2 className="text-xl font-bold text-primary mb-2">E-posta</h2>
              <p className="text-black font-medium mb-4">7/24 yazabilirsiniz</p>
              <div className="flex flex-col gap-2">
                <a href="mailto:info@mavibasim.com" className="text-primary font-black text-lg hover:underline">
                  info@mavibasim.com
                </a>
                <a href="mailto:mavibasimonline@gmail.com" className="text-primary font-black text-lg hover:underline">
                  mavibasimonline@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 md:p-12 rounded-[40px] border border-gray-100">
            <div className="flex flex-col gap-10">
              {/* Header Section: Icon, Title, Address */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#e1f5fe] text-primary rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={28} />
                  </div>
                  <h2 className="text-3xl font-black text-primary uppercase tracking-tight">Adresimiz</h2>
                </div>
                <p className="text-lg text-gray-800 font-semibold leading-relaxed whitespace-pre-line">
                  {ADDRESS}
                </p>
              </div>

              {/* Button Section */}
              <div>
                <a 
                  href="https://www.google.com/maps/place/2.Matbaac%C4%B1lar+Sitesi/@41.0236937,28.9187786,3a,51.3y,352.99h,103.6t/data=!3m7!1e1!3m5!1sRYiQ_iivkjBRKj3EDSHdeQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-13.59532873188705%26panoid%3DRYiQ_iivkjBRKj3EDSHdeQ%26yaw%3D352.98972298407017!7i16384!8i8192!4m6!3m5!1s0x14cabca4f6550031:0x2c2e120875705a27!8m2!3d41.0244134!4d28.9185197!16s%2Fg%2F11r8bwb1f?entry=ttu&g_ep=EgoyMDI2MDMzMS4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                >
                  Haritada Görüntüle <ChevronRight size={20} />
                </a>
              </div>

              {/* Content Section: Image and Map side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-[32px] overflow-hidden border border-gray-200 shadow-md h-[320px]">
                  <a 
                    href="https://www.google.com/maps/place/2.Matbaac%C4%B1lar+Sitesi/@41.0245828,28.9184887,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIDksoH9vQE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHVAweqJPA1MAXmxi0IYY_4WmKyIMiBpYNdpmfpzHo7F7lhU86iyjfd8lF1t_6BABNI8_abPkskRBZ07XOw1WrjId-Q-7Hw8o9i5dJYIZl0GtZv3hNsgtPaCZtOGINzXiJIz5rryCtJvgg%3Dw203-h114-k-no!7i1920!8i1080!4m7!3m6!1s0x14cabca4f6550031:0x2c2e120875705a27!8m2!3d41.0244134!4d28.9185197!10e5!16s%2Fg%2F11r8bwb1f?entry=ttu&g_ep=EgoyMDI2MDMzMS4wIKXMDSoASAFQAw%3D%3D" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block h-full hover:opacity-95 transition-opacity"
                  >
                    <img 
                      src="https://lh3.googleusercontent.com/gps-cs-s/AHVAweqJPA1MAXmxi0IYY_4WmKyIMiBpYNdpmfpzHo7F7lhU86iyjfd8lF1t_6BABNI8_abPkskRBZ07XOw1WrjId-Q-7Hw8o9i5dJYIZl0GtZv3hNsgtPaCZtOGINzXiJIz5rryCtJvgg=w1000-h600-k-no" 
                      alt="Mavi Basım Matbaa ve Reklam" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                </div>
                <div className="rounded-[32px] overflow-hidden border border-gray-200 shadow-md h-[320px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.518!2d28.9175434!3d41.0246024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb8bf13e4f21%3A0x6f7152e1b85729f3!2sMavi%20Bas%C4%B1m%20Matbaa%20ve%20Reklam!5e0!3m2!1str!2str!4v1712140000000!5m2!1str!2str" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
