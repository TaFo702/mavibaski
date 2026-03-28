/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  Printer, 
  Package, 
  Palette, 
  Menu, 
  X,
  PhoneCall,
  MessageCircle,
  Info,
  Facebook,
  Instagram,
  User,
  Truck,
  ShieldCheck,
  Search,
  ShoppingCart,
  ArrowLeft,
  Check,
  CheckCircle2,
  Zap,
  Settings,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  Image as ImageIcon,
  LogOut,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import Fuse from 'fuse.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReactMarkdown from 'react-markdown';
import { PRODUCT_DESCRIPTIONS } from './constants/productTexts';
import { 
  auth, 
  signInWithGoogle, 
  logout,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from './firebase';

// import logo from './assets/mna.jpeg'; // Removed as requested
const logo = null; 

// --- Constants ---

const LOCAL_ASSETS: Record<string, string> = {
  "LOGO": "./mavilogo.png",
  "afis": "./afis.jpg",
  "ambalaj": "./ambalaj.jpg",
  "amerikan_servis": "./amerikan_servis.jpg",
  "anteli_kagit": "./anteli_kagit.jpg",
  "b1": "./b1.jpg", 
  "b2": "./b2.jpg",
  "b3": "./b3.jpg",
  "b4": "./b4.jpg",
  "b5": "./b5.jpg",
  "bloknot": "./bloknot.jpg",
  "brosur": "./brosur.jpg",
  "el_ilani": "./el_ilani.jpg",
  "etiket": "./etiket.jpg",
  "karton_canta": "./karton_canta.jpg",
  "kartvizit": "./kartvizit.jpg",
  "katalog": "./katalog.jpg",
  "kutu": "./kutu.jpg",
  "magnet": "./magnet.jpg",
  "makbuz": "./makbuz.jpg",
  "otopaspas": "./otopaspas.jpg",
  "tecrube": "./tecrube.jpg",
  "zarf": "./zarf.jpg"
};
// IndexedDB Utility for Image Overrides
const DB_NAME = 'MaviBasimDB';
const STORE_NAME = 'ImageOverrides';

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveImageToDB = async (key: string, base64: string) => {
  const db = await initDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(base64, key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

const getAllImagesFromDB = async (): Promise<{ [key: string]: string }> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    const keysRequest = store.getAllKeys();
    
    request.onsuccess = () => {
      keysRequest.onsuccess = () => {
        const result: { [key: string]: string } = {};
        const data = request.result as string[];
        const keys = keysRequest.result as string[];
        keys.forEach((key, i) => {
          result[key] = data[i];
        });
        resolve(result);
      };
    };
    request.onerror = () => reject(request.error);
  });
};

const deleteImageFromDB = async (key: string) => {
  const db = await initDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

const clearAllImagesFromDB = async () => {
  const db = await initDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Global cache for image overrides to avoid async calls in getImageUrl
let imageOverridesCache: { [key: string]: string } = {};

const getImageUrl = (key: string, defaultUrl: string) => {
  if (imageOverridesCache[key]) return imageOverridesCache[key];
  const lowerKey = key.toLowerCase();
  if (LOCAL_ASSETS[lowerKey]) return LOCAL_ASSETS[lowerKey];
  if (LOCAL_ASSETS[key]) return LOCAL_ASSETS[key];
  return defaultUrl;
};

const PHONE_NUMBER = "0536 602 23 73";
const PHONE_LINK = "tel:05366022373";
const WHATSAPP_NUMBER = "905366022373";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Merhaba, fiyat teklifi almak istiyorum.")}`;
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=100048115954138";
const INSTAGRAM_URL = "https://www.instagram.com/mavi_basim/";
const ADDRESS = "Litros Yolu 2. Matbaacılar Sit. 2NC Topkapı, 34025 Zeytinburnu / İstanbul";

const KARTVIZIT_DATA = [
  { 
    cat: "EKO", 
    color: "bg-primary",
    items: [
      { code: "NK", price: "580 ₺", desc: "250 gr. Bristol Tek Yön Renkli Parlak Selefonlu", image: getImageUrl('nsk', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi.png") },
      { code: "NKA", price: "590 ₺", desc: "250 gr. Bristol Tek Yön Renkli Parlak Selefonlu Arkası Tek Renk Siyah", image: getImageUrl('nsk', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi.png") },
      { code: "MNA", price: "600 ₺", desc: "350 gr. Bristol Tek Yön Renkli Mat Selefonlu Arkası Tek renk Siyah", image: getImageUrl('mna', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi.png") },
      { code: "CYM", price: "640 ₺", desc: "350 gr. Kuşe Çift Yön Renkli Mat Selefonlu", image: getImageUrl('cym', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi.png") },
      { code: "CYP", price: "640 ₺", desc: "350 gr. Kuşe Çift Yön Renkli Parlak Selefonlu", image: getImageUrl('cyp', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi.png") },
    ]
  },
  { 
    cat: "LAK", 
    color: "bg-purple-600",
    items: [
      { code: "KL", price: "720 ₺", desc: "350 gr. Kuşe Tek Yön Renkli Mat Selefonlu Kabartma Laklı", image: getImageUrl('kl', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi.png") },
      { code: "CYML4", price: "800 ₺", desc: "400 gr. Kuşe Çift Yön Renkli Mat Selefonlu Laklı", image: getImageUrl('CYML4', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi.png") },
      { code: "O-COK", price: "820 ₺", desc: "350 gr. Kuşe Çift Yön Renkli Mat Selefonlu Kabartma Laklı Oval Kesim", image: getImageUrl('o-cok', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi-oval.png") },
      { code: "S-COK", price: "880 ₺", desc: "350 gr. Kuşe Çift Yön Renkli Mat Selefonlu Kabartma Laklı Özel Kesim", image: getImageUrl('o-cok', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi-oval.png") },
    ]
  },
  {
    cat: "SIVAMA",
    color: "bg-orange-500",
    items: [
      { code: "O-SEK", price: "970 ₺", desc: "700 gr. Sıvama Mat Selefon Kabartma Laklı Oval Kesim Çift Yön", image: getImageUrl('o-sek', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi-oval.png") },
      { code: "EKO-SEK", price: "800 ₺", desc: "A.Bristol Sıvama Mat Selefon Kabartma Laklı Oval Kesim Çift Yön, Bitmiş Ebat 82x50", isNew: true, image: getImageUrl('EKO-SEK', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi-oval.png") },
      { code: "S-SEK", price: "1.070 ₺", desc: "700 gr. Sıvama Mat Selefon Kabartma Laklı Özel Kesim Çift Yön", image: getImageUrl('o-sek', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi-oval.png") },
      { code: "A-SEK", price: "1.180 ₺", desc: "700 gr. Sıvama Mat Selefon Kabartma Laklı Çift Yön (Tek Yön Altın Yaldız) Özel Kesim", image: getImageUrl('AC-SEK', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi-oval.png") },
      { code: "AC-SEK", price: "1.300 ₺", desc: "700 gr. Sıvama Mat Selefon Kabartma Laklı Çift Yön Altın Yaldız Özel Kesim Çift Yön", image: getImageUrl('AC-SEK', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi-oval.png") },
      { code: "TANK", price: "1.030 ₺", desc: "800 gr. Bristol Sıvama Mat Selefon Kabartma Laklı Özel Kesim Çift Yön", image: getImageUrl('TANK', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi-oval.png") },
    ]
  },
  { 
    cat: "VİP", 
    color: "bg-amber-500",
    items: [
      { code: "AY", price: "900 ₺", desc: "350 gr. Bristol Tek Yön Renkli Mat Selefonlu Altın Yaldızlı Arkası Tek Renk Siyah", image: getImageUrl('ay', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi.png") },
      { code: "GY", price: "930 ₺", desc: "350 gr. Bristol Tek Yön Renkli Mat Selefonlu Gümüş Yaldızlı Arkası Tek Renk Siyah", image: getImageUrl('gy', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi.png") },
      { code: "VIP", price: "1.100 ₺", desc: "350 gr. Kuşe Çift Yön Renkli Mat Selefonlu Özel Kesim Laklı - Ön Yüz Altın Yaldız", image: getImageUrl('vip', "https://storage.googleapis.com/mavi-basim-assets/business-card-netmedi-oval.png") },
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
      { code: "ANT1", price: "1.900 ₺", desc: "90 gr. 1. Hamur Tek Yön Renkli A5 (15x21 cm) 4.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "4.000 Adet", image: getImageUrl('ANT1', "https://storage.googleapis.com/mavi-basim-assets/letterhead-kimya.png") },
      { code: "ANT2", price: "3.100 ₺", desc: "90 gr. 1. Hamur Tek Yön Renkli A5 (15x21 cm) 8.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "8.000 Adet", image: getImageUrl('ANT2', "https://storage.googleapis.com/mavi-basim-assets/letterhead-kimya.png") },
      { code: "ANT3", price: "4.300 ₺", desc: "90 gr. 1. Hamur Tek Yön Renkli A5 (15x21 cm) 12.000 Adet", size: "A5", ebat: "15x21 cm", miktar: "12.000 Adet", image: getImageUrl('ANT3', "https://storage.googleapis.com/mavi-basim-assets/letterhead-kimya.png") },
      { code: "ANT4", price: "1.800 ₺", desc: "90 gr. 1. Hamur Tek Yön Renkli A4 (21x29.7 cm) 2.000 Adet", size: "A4", ebat: "21x29.7 cm", miktar: "2.000 Adet", image: getImageUrl('ANT4', "https://storage.googleapis.com/mavi-basim-assets/letterhead-kimya.png") },
      { code: "ANT5", price: "2.900 ₺", desc: "90 gr. 1. Hamur Tek Yön Renkli A4 (21x29.7 cm) 4.000 Adet", size: "A4", ebat: "21x29.7 cm", miktar: "4.000 Adet", image: getImageUrl('ANT5', "https://storage.googleapis.com/mavi-basim-assets/letterhead-kimya.png") },
      { code: "ANT6", price: "4.100 ₺", desc: "90 gr. 1. Hamur Tek Yön Renkli A4 (21x29.7 cm) 6.000 Adet", size: "A4", ebat: "21x29.7 cm", miktar: "6.000 Adet", image: getImageUrl('ANT6', "https://storage.googleapis.com/mavi-basim-assets/letterhead-kimya.png") },
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
      { code: "MAG1", price: "1.030 ₺", desc: "Parlak Selefonlu Özel Kesimli", ebat: "46x68 mm.", miktar: "1000 Adet", image: getImageUrl('MAG1', "https://picsum.photos/seed/mag1/400/300") },
      { code: "MAG2", price: "960 ₺", desc: "Parlak Selefonlu Kenarları Oval Kesimli", ebat: "46x68 mm.", miktar: "1000 Adet", image: getImageUrl('MAG2', "https://picsum.photos/seed/mag/400/300") },
      { code: "MAG3", price: "23.00 ₺", desc: "CM Kare Fiyatıdır", ebat: "1 cm. Kare", miktar: "1000 Adet", isCustom: true, image: getImageUrl('MAG3', "https://picsum.photos/seed/mag3/400/300") },
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
    { label: "4 Sayfa + Kapak", total: "8 Sayfa", p50: "5.400 TL", p100: "8.500 TL", p250: "11.800 TL", p500: "13.500 TL", p1000: "15.500 TL" },
    { label: "8 Sayfa + Kapak", total: "12 Sayfa", p50: "6.500 TL", p100: "11.500 TL", p250: "14.500 TL", p500: "15.900 TL", p1000: "19.000 TL" },
    { label: "12 Sayfa + Kapak", total: "16 Sayfa", p50: "7.500 TL", p100: "12.800 TL", p250: "18.000 TL", p500: "19.750 TL", p1000: "23.350 TL" },
    { label: "16 Sayfa + Kapak", total: "20 Sayfa", p50: "8.800 TL", p100: "14.000 TL", p250: "19.900 TL", p500: "22.000 TL", p1000: "26.000 TL" },
    { label: "20 Sayfa + Kapak", total: "24 Sayfa", p50: "9.900 TL", p100: "16.000 TL", p250: "23.500 TL", p500: "25.800 TL", p1000: "30.700 TL" },
    { label: "24 Sayfa + Kapak", total: "28 Sayfa", p50: "11.000 TL", p100: "18.300 TL", p250: "25.500 TL", p500: "28.300 TL", p1000: "34.700 TL" },
    { label: "28 Sayfa + Kapak", total: "32 Sayfa", p50: "12.300 TL", p100: "20.000 TL", p250: "29.000 TL", p500: "32.300 TL", p1000: "38.900 TL" },
    { label: "32 Sayfa + Kapak", total: "36 Sayfa", p50: "13.300 TL", p100: "22.200 TL", p250: "31.000 TL", p500: "34.800 TL", p1000: "41.000 TL" },
    { label: "36 Sayfa + Kapak", total: "40 Sayfa", p50: "13.250 TL", p100: "24.050 TL", p250: "34.500 TL", p500: "38.300 TL", p1000: "45.500 TL" },
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
    img: LOCAL_ASSETS.banner4,
    title: "Mavi Basım Matbaa & Reklam",
    subtitle: "Markanıza Değer ve Kimlik Katın\nHer Bütçeye Uygun Özel Tasarım Kutu Çözümleri",
    primaryBtn: { text: "Hemen Sipariş Ver", link: WHATSAPP_LINK },
    secondaryBtn: { text: "Ürünlerimizi İnceleyin", link: "/kutu" }
  },
  {
    img: LOCAL_ASSETS.banner5,
    title: "Mavi Basım Matbaa & Reklam",
    subtitle: "İşinize Özel Profesyonel Matbaa Baskıları\nSigorta Poliçeleri • Tahsilat Makbuzu • Araç Kiralama Sözleşmesi • Gider Makbuzu • Giriş Bileti • Reçete • Senet • Tediye Makbuzu\n✔ Otokopili / Karbonlu Baskı\n✔ Numaralı & Ciltli Üretim\n✔ Firma Logolu Özel Tasarım\n✔ Hızlı Üretim – Uygun Fiyat",
    primaryBtn: { text: "Hemen Sipariş Ver", link: WHATSAPP_LINK },
    secondaryBtn: { text: "Ürünlerimizi İnceleyin", link: "#products" }
  },
  {
    img: LOCAL_ASSETS.banner2,
    title: "Tanıtımınızı Şansa Bırakmayın, Kaliteye Yatırım Yapın!",
    subtitle: "115gr Parlak Kuşe Kağıt\n1000 Adet A5 Broşürde Rakipsiz Fiyat ve Ücretsiz Tasarım Desteği\nAracı yok, matbaadan direkt halka\" Hızlı Kargo",
    primaryBtn: { text: "Hemen Sipariş Ver", link: WHATSAPP_LINK },
    secondaryBtn: { text: "Ürünlerimizi İnceleyin", link: "#products" }
  },
  {
    img: LOCAL_ASSETS.banner3,
    title: "Müşterinizin Gözü Önünde Olun: Rakipsiz Fiyatla Magnet Basımı!",
    subtitle: "1.000 Adet Özel Kesim Magnet’te İnanılmaz Fiyat! (Matbaadan Direkt)\n✅ 48x68mm Standart veya Özel Kesim\n✅ Aracı yok, matbaadan direkt halka!\n✅ 81 İle Güvenli ve Hızlı Kargo",
    primaryBtn: { text: "Hemen Sipariş Ver", link: WHATSAPP_LINK },
    secondaryBtn: { text: "Ürünlerimizi İnceleyin", link: "#products" }
  },
  {
    img: LOCAL_ASSETS.banner1,
    title: "Türkiye Geneli Profesyonel Matbaa Hizmetleri",
    subtitle: "Kaliteli ve Hızlı Çözümler. Markanıza Değer Katan Matbaa Hizmetleri.",
    primaryBtn: { text: "Hemen Sipariş Ver", link: WHATSAPP_LINK },
    secondaryBtn: { text: "Ürünlerimizi İnceleyin", link: "#products" }
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
  { id: "bloknot", name: "BLOKNOT", price: "6.200 ₺", desc: "500 Adet", image: LOCAL_ASSETS.bloknot, type: "bloknotlar" },
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
        { code: "B16", kapak: "NK", ic: "80 gr. 1.Hamur Tek Renk (9.4x14.3cm)", p500: "11.600 ₺", p1000: "14.200 ₺", image: getImageUrl('nka', "https://picsum.photos/seed/bloknot1/400/300") },
        { code: "B17", kapak: "CYP", ic: "80 gr. 1.Hamur Tek Renk (9.4x14.3cm)", p500: "12.300 ₺", p1000: "14.700 ₺", image: getImageUrl('nka', "https://picsum.photos/seed/bloknot2/400/300") },
        { code: "B18", kapak: "CYM", ic: "80 gr. 1.Hamur Tek Renk (9.4x14.3cm)", p500: "12.400 ₺", p1000: "14.800 ₺", image: getImageUrl('nka', "https://picsum.photos/seed/bloknot3/400/300") },
        { code: "B19", kapak: "CYML4", ic: "80 gr. 1.Hamur Tek Renk (9.4x14.3cm)", p500: "13.700 ₺", p1000: "16.400 ₺", image: getImageUrl('nka', "https://picsum.photos/seed/bloknot4/400/300") },
      ]
    },
    {
      ebat: "14x20cm",
      color: "bg-secondary",
      items: [
        { code: "B20", kapak: "NK", ic: "80 gr. 1.Hamur Tek Renk (14x20cm)", p500: "14.400 ₺", p1000: "18.700 ₺", image: getImageUrl('nka', "https://picsum.photos/seed/bloknot5/400/300") },
        { code: "B21", kapak: "CYP", ic: "80 gr. 1.Hamur Tek Renk (14x20cm)", p500: "15.200 ₺", p1000: "19.200 ₺", image: getImageUrl('nka', "https://picsum.photos/seed/bloknot6/400/300") },
        { code: "B22", kapak: "CYM", ic: "80 gr. 1.Hamur Tek Renk (14x20cm)", p500: "15.300 ₺", p1000: "19.300 ₺", image: getImageUrl('nka', "https://picsum.photos/seed/bloknot7/400/300") },
        { code: "B23", kapak: "CYML4", ic: "80 gr. 1.Hamur Tek Renk (14x20cm)", p500: "16.700 ₺", p1000: "20.700 ₺", image: getImageUrl('nka', "https://picsum.photos/seed/bloknot8/400/300") },
      ]
    }
  ],
  kapaksiz: [
    {
      ebat: "9.4x14.3cm",
      color: "bg-black",
      items: [
        { code: "B28", ic: "80 gr. 1.Hamur Tek Renk (9.4x14.3cm)", p500: "6.200 ₺", p1000: "8.200 ₺", image: getImageUrl('nka', "https://picsum.photos/seed/bloknot9/400/300") },
      ]
    },
    {
      ebat: "14x20cm",
      color: "bg-secondary",
      items: [
        { code: "B29", ic: "80 gr. 1.Hamur Tek Renk (14x20cm)", p500: "8.200 ₺", p1000: "12.700 ₺", image: getImageUrl('nka', "https://picsum.photos/seed/bloknot10/400/300") },
      ]
    }
  ]
};

const ZARF_DATA = [
  {
    cat: "Zarf",
    subTitle: "110 gr. 1.Hamur",
    items: [
      { code: "Z1", price: "2.100 ₺", ebat: "10.5x24 cm.", desc: "110 gr. Diplomat Tek Renk", miktar: "1.000 Adet", extra: "Her 1000 Adet için", extraPrice: "1.550 ₺", note: "Z1 için İlave Renk 400 ₺, 1000 Tiraj 100 ₺", image: getImageUrl('Z1', "https://picsum.photos/seed/zarf1/400/300") },
      { code: "Z2", price: "2.600 ₺", ebat: "10.5x24 cm.", desc: "110 gr. Diplomat Renkli", miktar: "1.000 Adet", extra: "Her 1000 Adet için", extraPrice: "1.700 ₺", image: getImageUrl('Z2', "https://storage.googleapis.com/mavi-basim-assets/diplomat-envelope-sigorta.png") },
      { code: "Z3", price: "3.500 ₺", ebat: "24x32 cm.", desc: "110 gr. Torba Zarf Renkli", miktar: "500 Adet", extra: "Her 500 Adet için", extraPrice: "2.200 ₺", image: getImageUrl('Z3', "https://picsum.photos/seed/zarf3/400/300") },
    ],
    note: "Lütfen Dikkat : Siparişlerinizin Renk, Adet ve Ölçülerinde %1 ila %5 Arasında Fire Olabilmektedir."
  }
];

const KARTON_CANTA_DATA = [
  {
    ebat: "16x25x6 cm",
    items: [
      { code: "KC15-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "500 Adet", price: "8.400 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag1/400/300") },
      { code: "KC15-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "500 Adet", price: "8.400 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag2/400/300") },
      { code: "KC11-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "11.150 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag3/400/300") },
      { code: "KC11-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "11.150 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag4/400/300") },
    ]
  },
  {
    ebat: "27x16x6 cm",
    items: [
      { code: "KC25-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "500 Adet", price: "9.610 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag5/400/300") },
      { code: "KC25-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "500 Adet", price: "9.610 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag6/400/300") },
      { code: "KC21-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "13.020 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag7/400/300") },
      { code: "KC21-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "13.020 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag8/400/300") },
    ]
  },
  {
    ebat: "25x37x8 cm",
    items: [
      { code: "KC35-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "500 Adet", price: "9.500 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag9/400/300") },
      { code: "KC35-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "500 Adet", price: "9.500 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag10/400/300") },
      { code: "KC31-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "13.900 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag11/400/300") },
      { code: "KC31-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "13.900 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag12/400/300") },
    ]
  },
  {
    ebat: "51x33x13 cm",
    items: [
      { code: "KC45-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "500 Adet", price: "13.350 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag13/400/300") },
      { code: "KC45-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "500 Adet", price: "13.350 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag14/400/300") },
      { code: "KC41-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "20.500 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag15/400/300") },
      { code: "KC41-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "20.500 ₺", image: getImageUrl('cym', "https://picsum.photos/seed/bag16/400/300") },
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
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
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
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
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
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
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
    ozellik: "Tek Nüsha 70-80 Gr. 1. Hamur 100'lük Adisyon 1 Renk Baskılı - Numaratörlü",
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
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
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
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
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
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
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
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
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
    ozellik: "Tek Nüsha 70-80 Gr. 1. Hamur 100'lük 1 Renk Baskılı - Numaratörlü",
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
    ozellik: "Tek Nüsha 70-80 Gr. 1. Hamur 100'lük 1 Renk Baskılı - Numaratörlü",
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
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
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
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
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
    ozellik: "Otocopy Kağıda 1 Renk Baskılı - Numaratörlü",
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

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: { isOpen: boolean, onClose: () => void, initialMode?: 'login' | 'signup' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('05');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setError('');
    if (isOpen) setPhone('05');
  }, [initialMode, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      } else {
        const cleanPhone = phone.replace(/\s/g, '');
        if (cleanPhone.length !== 11 || !cleanPhone.startsWith('05')) {
          setError('Telefon numarası 05 ile başlamalı ve 11 haneli olmalıdır.');
          setLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: `${firstName} ${lastName}`
        });
        onClose();
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('E-posta veya şifre hatalı.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Bu e-posta adresi zaten kullanımda.');
      } else if (err.code === 'auth/weak-password') {
        setError('Şifre en az 6 karakter olmalıdır.');
      } else {
        setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Lütfen e-posta adresinizi girin.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
    } catch (err) {
      setError('Şifre sıfırlama e-postası gönderilemedi.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#f8f9fa] w-full max-w-[480px] rounded-[32px] shadow-2xl overflow-hidden relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-3 bg-gray-100 hover:bg-red-500 hover:text-white rounded-2xl transition-all z-10 group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform" />
        </button>

        <div className="p-8 sm:p-12">
          <h2 className="text-[32px] font-bold text-[#444b59] text-center mb-10">
            {mode === 'login' ? 'Giriş Yap' : 'Üye Ol'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#444b59] ml-1">İsim</label>
                  <input 
                    type="text" 
                    placeholder="İsminiz"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl py-4 px-5 text-[#444b59] placeholder:text-gray-300 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-[#444b59] ml-1">Soyisim</label>
                  <input 
                    type="text" 
                    placeholder="Soyisminiz"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl py-4 px-5 text-[#444b59] placeholder:text-gray-300 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#444b59] ml-1">E-Posta</label>
              <input 
                type="email" 
                placeholder="E-Posta Adresiniz"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl py-4 px-5 text-[#444b59] placeholder:text-gray-300 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#444b59] ml-1">Telefon Numarası</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    placeholder="05XX XXX XX XX"
                    required
                    maxLength={14}
                    value={phone}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '');
                      if (!val.startsWith('05')) {
                        val = '05' + val.replace(/^0?5?/, '');
                      }
                      val = val.slice(0, 11);
                      
                      let formatted = val;
                      if (val.length > 4) {
                        formatted = val.slice(0, 4) + ' ' + val.slice(4);
                      }
                      if (val.length > 7) {
                        formatted = formatted.slice(0, 8) + ' ' + val.slice(7);
                      }
                      if (val.length > 9) {
                        formatted = formatted.slice(0, 11) + ' ' + val.slice(9);
                      }
                      setPhone(formatted);
                    }}
                    className="w-full bg-white border border-gray-200 rounded-xl py-4 px-5 text-[#444b59] placeholder:text-gray-300 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-sm font-medium text-[#444b59]">Şifre</label>
                {mode === 'login' && (
                  <button 
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm font-bold text-secondary hover:underline"
                  >
                    Şifremi Unuttum
                  </button>
                )}
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Şifreniz"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl py-4 px-5 pr-12 text-[#444b59] placeholder:text-gray-300 focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-all disabled:opacity-50"
            >
              {loading ? 'İşlem yapılıyor...' : (mode === 'login' ? 'Giriş Yap' : 'Üye Ol')}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <span className="relative px-4 bg-[#f8f9fa] text-sm text-gray-400">veya</span>
            </div>

            <button 
              onClick={() => signInWithGoogle().then(onClose)}
              className="w-full bg-white border border-gray-200 text-[#444b59] py-3 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-all mb-6"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Google ile {mode === 'login' ? 'Giriş Yap' : 'Devam Et'}
            </button>

            <div className="text-center">
              <p className="text-sm text-[#444b59]">
                {mode === 'login' ? (
                  <>
                    Ceptematbaa'ya üye değil misiniz? <button onClick={() => { setMode('signup'); setPhone('05'); }} className="text-secondary font-bold hover:underline">Üye Ol</button>
                  </>
                ) : (
                  <>
                    Zaten üye misiniz? <button onClick={() => { setMode('login'); setPhone('05'); }} className="text-secondary font-bold hover:underline">Giriş Yap</button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

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
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <motion.a
            initial={{ opacity: 0, scale: 0.5, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 20 }}
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-lg shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:bg-[#128C7E] transition-colors group"
          >
            <MessageCircle size={20} className="mb-0 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-black uppercase leading-tight text-center">
              Destek<br />Hattı
            </span>
          </motion.a>

          <motion.button
            initial={{ opacity: 0, scale: 0.5, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 20 }}
            onClick={scrollToTop}
            className="flex flex-col items-center justify-center w-12 h-12 bg-secondary text-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.4)] hover:bg-black transition-colors group"
          >
            <ChevronUp size={18} className="mb-0 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[9px] font-black uppercase leading-tight text-center">
              Başa<br />Dön
            </span>
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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPriceListOpen, setIsPriceListOpen] = useState(false);
  const [isMakbuzOpen, setIsMakbuzOpen] = useState(false);
  const [isAllProductsOpen, setIsAllProductsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  const handleAuth = async () => {
    if (user) {
      if (window.confirm('Çıkış yapmak istediğinize emin misiniz?')) {
        await logout();
      }
    } else {
      setAuthMode('login');
      setIsAuthModalOpen(true);
    }
  };

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
      {/* Top Bar (Social, Phone, Campaign) */}
      <div className="bg-secondary text-white py-2 hidden md:block">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-[13px]">
          <div className="flex items-center gap-4">
            <div className="flex gap-3 border-r border-white/20 pr-4">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                <Facebook size={16} className="cursor-pointer hover:opacity-80" />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                <Instagram size={16} className="cursor-pointer hover:opacity-80" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} fill="white" />
              <span className="font-bold">{PHONE_NUMBER}</span>
              <span className="text-white/80 ml-2">Türkiye'nin En Uygun Fiyatlı Online Matbaası</span>
            </div>
          </div>
          <div className="flex items-center gap-6 font-bold">
            <div className="flex items-center gap-2">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-black">
                <motion.span 
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  Teklif İste
                </motion.span>
              </a>
            </div>
            <div className="flex items-center gap-6 border-l border-white/20 pl-6">
              <div className="flex items-center gap-2">
                <Truck size={16} />
                <span>TÜRKİYENİN HER YERİNE KARGO</span>
              </div>
              {user ? (
                <button 
                  onClick={handleAuth}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden border border-white/30">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                    ) : (
                      user.displayName?.charAt(0) || 'U'
                    )}
                  </div>
                  <span className="max-w-[100px] truncate">{user.displayName}</span>
                  <LogOut size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setAuthMode('login'); setIsAuthModalOpen(true); }}
                    className="flex items-center justify-center gap-1 w-[82px] py-1 bg-white border-2 border-primary text-primary rounded-lg text-[11px] font-black hover:bg-white/90 transition-all shadow-sm"
                  >
                    <User size={12} strokeWidth={3} />
                    Giriş Yap
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setAuthMode('signup'); setIsAuthModalOpen(true); }}
                    className="flex items-center justify-center w-[82px] py-1 bg-white border-2 border-primary text-primary rounded-lg text-[11px] font-black hover:bg-white/90 transition-all shadow-sm"
                  >
                    Üye Ol
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
      />

      {/* Main Nav */}
      <nav className="bg-white shadow-md border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center w-full">
              <Link 
                to="/" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex-shrink-0 flex items-center gap-3 mr-8"
              >
                <img src={LOCAL_ASSETS.LOGO} alt="Mavi Basım Logo" className="h-10 w-auto" />
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-black text-black leading-none tracking-tight">MAVİ BASIM</span>
                  <span className="text-[10px] md:text-xs font-bold text-secondary tracking-[0.2em] mt-1 uppercase">Matbaa & Reklam</span>
                </div>
              </Link>
              
              <div className="hidden lg:flex items-center space-x-4 flex-1 justify-end">
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
                                    className="text-[13px] font-medium text-gray-600 hover:text-primary transition-colors text-left"
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
                                    className="text-[13px] font-medium text-gray-600 hover:text-primary transition-colors text-left"
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


                {/* Makbuz & Formlar Dropdown */}
                <div 
                  className="relative group"
                  onMouseEnter={() => setIsMakbuzOpen(true)}
                  onMouseLeave={() => setIsMakbuzOpen(false)}
                >
                  <button className="flex items-center text-[13px] font-bold text-black hover:text-secondary px-3 py-2 transition-colors uppercase">
                    MAKBUZ & FORMLAR <ChevronDown size={14} className="ml-1" />
                  </button>
                  <AnimatePresence>
                    {isMakbuzOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-0 w-[240px] bg-white border border-gray-100 shadow-2xl rounded-b-2xl overflow-hidden z-[100]"
                      >
                        <div className="flex flex-col py-4">
                          {MAKBUZ_FORMLAR_MENU.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                navigate(item.path);
                                setIsMakbuzOpen(false);
                              }}
                              className="px-6 py-2 text-[13px] font-medium text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors text-left"
                            >
                              {item.name}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>


                <Link to="/grafik-tasarim" className="text-[13px] font-bold text-black hover:text-secondary px-3 py-2 transition-colors uppercase">
                  GRAFİK TASARIM
                </Link>

                <Link to="/hakkimizda" className="text-[13px] font-bold text-black hover:text-secondary px-3 py-2 transition-colors uppercase">
                  Hakkımızda
                </Link>

                <Link to="/iletisim" className="text-[13px] font-bold text-black hover:text-secondary px-3 py-2 transition-colors uppercase">
                  İletişim
                </Link>

                {/* Search Bar in Nav */}
                <div className="relative w-40 xl:w-56 ml-4 search-container">
                  <input 
                    type="text" 
                    placeholder="Ürün ara..." 
                    value={searchQuery}
                    onChange={handleSearch}
                    onFocus={() => searchQuery.length > 1 && setIsSearchOpen(true)}
                    className="w-full bg-gray-100 border-none rounded-full py-2 px-10 text-sm text-secondary placeholder:text-gray-400 focus:ring-2 focus:ring-secondary/10 outline-none transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  
                  <AnimatePresence>
                    {isSearchOpen && searchResults.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden z-[60]"
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
                              className="w-full px-4 py-3 hover:bg-gray-50 flex items-center justify-between group transition-colors text-left"
                            >
                              <div className="flex items-center gap-3">
                                <Search size={14} className="text-gray-400 group-hover:text-secondary" />
                                <span className="text-sm font-medium text-secondary group-hover:text-secondary transition-colors">
                                  {result.title}
                                </span>
                              </div>
                              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold bg-gray-100 px-2 py-0.5 rounded-full group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
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
            </div>

            <div className="flex items-center lg:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-secondary hover:text-secondary p-2"
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
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    
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
                                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold bg-gray-100 px-2 py-0.5 rounded-full group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
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
                    <span className="text-base font-black text-secondary uppercase tracking-tight">GRAFİK TASARIM</span>
                    <ChevronRight size={18} className="text-secondary group-hover:translate-x-1 transition-transform" />
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
                    <span className="text-base font-black text-secondary uppercase tracking-tight">MEDYA YÖNETİMİ</span>
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
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 16000); // Slower transition (16 seconds)
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
    <div className="relative h-[200px] md:h-[500px] overflow-hidden bg-secondary group">
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
            className="w-full h-full transition-all duration-1000 object-cover saturate-150 opacity-100 scale-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>
      
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={current}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div>
              <span className="inline-block bg-secondary text-white text-[9px] md:text-xs font-black px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase tracking-widest mb-2 md:mb-4">
                Mavi Basım Matbaa & Reklam
              </span>
              <h1 className="text-xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 md:mb-6 uppercase tracking-tight text-shadow-strong">
                {banners[current].title.split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    {word === 'Profesyonel' || word === 'Değer' || word === 'Kimlik' ? <span className="text-primary">{word} </span> : word + ' '}
                    {i === 2 && banners[current].title.includes('Profesyonel') && <br />}
                  </React.Fragment>
                ))}
              </h1>
              <p className="text-xs md:text-lg text-white mb-4 md:mb-8 max-w-lg leading-relaxed font-bold text-shadow-strong whitespace-pre-line">
                {banners[current].subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-4">
              <a href={banners[current].primaryBtn.link} target="_blank" rel="noopener noreferrer" className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2.5 md:px-8 md:py-4 rounded-xl font-bold text-xs md:text-lg transition-all shadow-2xl shadow-secondary/20 flex items-center">
                {banners[current].primaryBtn.text}
              </a>
              <button 
                onClick={() => handleSecondaryClick(banners[current].secondaryBtn.link)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-4 py-2.5 md:px-8 md:py-4 rounded-xl font-bold text-xs md:text-lg transition-all"
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
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-secondary/50 hover:bg-secondary text-white rounded-full flex items-center justify-center transition-all z-10"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 right-8 hidden md:flex gap-3">
        {banners.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 transition-all rounded-full ${current === idx ? 'bg-secondary w-12' : 'bg-white/20 w-6 hover:bg-white/40'}`}
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
                <div className="text-gray-400 group-hover:text-secondary transition-colors shrink-0">
                  {item.icon}
                </div>
                <h3 className="text-[11px] font-bold text-gray-600 uppercase tracking-tight">
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
                    <p className="text-[10px] text-gray-500 leading-tight mt-2 max-w-[250px] text-center md:text-left">
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
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-gray-100">
          <span className="text-[10px] font-black text-secondary uppercase tracking-tight">
            {product.desc}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-sm font-black text-black mb-1 uppercase tracking-tight leading-tight h-10 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
              BAŞLAYAN FİYATLAR
            </span>
            <span className="text-xl font-black text-secondary">{product.price}</span>
          </div>
          <div className="bg-secondary/5 p-3 rounded-2xl">
            <Phone size={20} className="text-secondary" />
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
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
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
                <span className="text-gray-400">info@mavibasim.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <p>© 2024 Mavi Basım. Tüm Hakları Saklıdır.</p>
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
      <Hero />
      <TrustBar />

      <section id="products" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
          <div className="text-center md:text-left">
            <span className="text-primary font-bold tracking-widest uppercase text-[10px] md:text-xs mb-2 block">Matbaa Hizmetlerimiz</span>
            <h2 className="text-2xl md:text-3xl font-black text-black">Matbaa Ürünleri</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
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
              <p className="text-[10px] font-bold text-gray-500 uppercase">{result.desc}</p>
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
                const text = `Merhaba, Mavi Basım. Akıllı Bulucu ile bulduğum ${result.model} ürünü hakkında bilgi almak istiyorum.`;
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
            <p className="text-[10px] font-bold text-gray-500 uppercase">{questions[0].text}</p>
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
              <p className="text-[9px] text-gray-500 font-medium">Size en uygun kartı bulalım.</p>
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
                            ? 'border-orange-500 bg-orange-50 text-orange-700 hover:bg-orange-100 shadow-sm ring-2 ring-orange-500/10'
                            : 'border-primary/10 bg-white text-secondary hover:border-primary hover:bg-primary/5'
                      }`}
                    >
                      {isPopularOption && (
                        <span className="absolute -top-2 -right-1 bg-orange-500 text-white text-[6px] font-black px-1 rounded-full shadow-sm">EN ÇOK İSTENDİ</span>
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
                <div key={idx} className={`bg-primary/5 rounded-xl p-1.5 px-3 border border-primary/10 flex items-center justify-between gap-3 relative overflow-hidden group ${isPopular ? 'ring-2 ring-orange-500/20' : ''}`}>
                  {isPopular && (
                    <div className="absolute top-0 right-0 bg-orange-500 text-white text-[6px] font-black px-1.5 py-0.5 rounded-bl-lg uppercase tracking-tighter z-10">
                      En Çok İstendi
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[10px] font-black text-black truncate">{item.code}</h4>
                    </div>
                    <p className="text-[8px] text-gray-600 font-medium truncate">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[12px] md:text-[14px] font-black text-black">{item.price}</span>
                    <button 
                      onClick={() => {
                        const text = `Merhaba, Akıllı Bulucu ile seçtiğim ürün: ${item.code} - ${item.desc} - ${item.price}. Bilgi almak istiyorum.`;
                        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
                <p className="text-[9px] text-gray-500 font-bold">Uygun ürün bulunamadı.</p>
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
              <p className="text-[9px] text-gray-500 font-medium">Size en uygun broşürü bulalım.</p>
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
                            ? 'border-orange-500 bg-white text-orange-500 hover:bg-orange-50 shadow-sm'
                            : 'border-gray-200 bg-white text-black hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {(opt as any).isPopular && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[5px] px-1 py-0.5 rounded-full whitespace-nowrap">
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
                  <h4 className="text-[10px] font-black text-secondary truncate">{item.code}</h4>
                  <p className="text-[8px] text-gray-600 font-medium truncate">
                    {item.desc.replace(/(\d{4,})/g, (match: string) => Number(match).toLocaleString('tr-TR'))}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[12px] md:text-[14px] font-black text-black">{item.price}</span>
                  <button 
                    onClick={() => {
                      const text = `Merhaba, Broşür Bulucu ile seçtiğim ürün: ${item.code} - ${item.desc} - ${item.price}. Bilgi almak istiyorum.`;
                      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="bg-primary text-white p-1 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <ShoppingCart size={12} />
                  </button>
                </div>
              </div>
            )) : (
              <div className="flex items-center justify-center gap-3 w-full py-1">
                <p className="text-[9px] text-gray-500 font-bold">Uygun ürün bulunamadı.</p>
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
  const openWhatsApp = (item: any) => {
    const text = `Merhaba, Mavi Basım. Kutu Baskı ürününüz hakkında bilgi almak istiyorum: ${item.desc} - ${item.miktar}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
              <p className="text-sm md:text-base font-bold text-gray-500 whitespace-nowrap">Özel Tasarım ve Ölçülerde</p>
            </div>
          </div>
          <div className="flex-grow">
            <KutuSmartProductFinder />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
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
                    <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors">
                      {item.code}
                    </td>
                    <td className="p-3 text-center font-medium text-black border-r border-gray-100 uppercase tracking-tight">
                      {item.model}
                    </td>
                    <td className="p-3 font-medium text-black border-r border-gray-100">
                      {item.desc}
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
                        <MessageCircle size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ProductSEOSection categoryKey="kutu" />
    </div>
  );
};

const AmbalajPage = () => {
  const openWhatsApp = (item: any) => {
    const text = `Merhaba, Mavi Basım. Ambalaj Baskı ürününüz hakkında bilgi almak istiyorum: ${item.desc} - ${item.miktar}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
              <p className="text-sm md:text-base font-bold text-gray-500 whitespace-nowrap">Endüstriyel ve Gıda Ambalajları</p>
            </div>
          </div>
          <div className="flex-grow">
            <SmartProductFinder />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
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
                    <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors">
                      {item.code}
                    </td>
                    <td className="p-3 font-medium text-secondary border-r border-gray-100">
                      {item.desc}
                    </td>
                    <td className="p-3 text-center font-bold text-secondary border-r border-gray-100">
                      {item.miktar}
                    </td>
                    <td className="p-3 text-center font-black text-secondary border-r border-gray-100">
                      {item.price}
                    </td>
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => openWhatsApp(item)}
                        className="bg-primary hover:bg-secondary text-white p-2 rounded-lg transition-all shadow-lg shadow-primary/20 hover:scale-110"
                      >
                        <MessageCircle size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
        
        <div className={`relative prose prose-slate max-w-none 
          prose-h2:text-3xl prose-h2:font-black prose-h2:text-black prose-h2:mb-6 prose-h2:uppercase prose-h2:tracking-tight
          ${['recete', 'adisyon', 'siparis_fisi', 'para_makbuzu', 'sozlesme', 'sigorta_policeleri', 'tahsilat_makbuzu', 'arac_kiralama', 'gider_makbuzu', 'giris_bileti', 'senet', 'tediye_makbuzu', 'perakende_satis_fisi', 'makbuz_fisler'].includes(categoryKey) ? 'prose-p:text-black' : 'prose-p:text-gray-600'} prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6
          prose-strong:text-primary prose-strong:font-bold
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
              <p className={`text-sm font-medium ${['recete', 'adisyon', 'siparis_fisi', 'para_makbuzu', 'sozlesme', 'sigorta_policeleri', 'tahsilat_makbuzu', 'arac_kiralama', 'gider_makbuzu', 'giris_bileti', 'senet', 'tediye_makbuzu', 'perakende_satis_fisi', 'makbuz_fisler'].includes(categoryKey) ? 'text-black' : 'text-gray-500'}`}>Güvenilir ve Kaliteli Baskı</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-black">81 İle Kargo</h4>
              <p className={`text-sm font-medium ${['recete', 'adisyon', 'siparis_fisi', 'para_makbuzu', 'sozlesme', 'sigorta_policeleri', 'tahsilat_makbuzu', 'arac_kiralama', 'gider_makbuzu', 'giris_bileti', 'senet', 'tediye_makbuzu', 'perakende_satis_fisi', 'makbuz_fisler'].includes(categoryKey) ? 'text-black' : 'text-gray-500'}`}>Hızlı ve Güvenli Teslimat</p>
            </div>
          </div>
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-secondary transition-all shadow-xl shadow-primary/20 flex items-center gap-3"
          >
            <MessageCircle size={20} />
            HEMEN TEKLİF AL
          </a>
        </div>
      </div>
    </div>
  );
};

const KartvizitPage = () => {
  const openWhatsApp = (item: any) => {
    const text = `Merhaba, Mavi Basım. Seçili ürün: ${item.code} - ${item.desc} - ${item.price}. Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
              <p className="text-sm md:text-base font-bold text-gray-500 whitespace-nowrap">Ebat 82x52 mm - 1.000 Adet</p>
            </div>
          </div>
          <div className="flex-grow">
            <SmartProductFinder />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
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
                        <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors">
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
                            <span className="group-hover:font-bold transition-all">{item.desc}</span>
                          </div>
                        </td>
                        <td className="p-3 text-center text-black font-medium border-r border-gray-100 transition-colors">
                          1.000 ADET
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
      </div>
      <ProductSEOSection categoryKey="kartvizit" />
    </div>
  );
};
            const BrosurPage = () => {
  const openWhatsApp = (item: any) => {
    const text = `Merhaba, Mavi Basım. Seçili ürün: ${item.code} - ${item.desc} - ${item.price}. Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
                        <span className="text-[24px] font-black text-[#f27d26] mb-0.5 leading-tight">
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
              <p className="text-sm md:text-base font-bold text-gray-500 whitespace-nowrap">115 - 128 - 200 gr. Kuşe - Renkli</p>
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

        <div className="mt-12 text-center">
          <p className="text-red-600 font-black text-sm md:text-base uppercase tracking-tight">
            Lütfen Dikkat : Siparişlerinizin Renk, Adet ve Ölçülerinde %1 ila %5 Arasında Fire Olabilmektedir.
          </p>
        </div>
      </div>
      <ProductSEOSection categoryKey="brosur" />
    </div>
  );
};

const ElIlaniPage = () => {
  const openWhatsApp = (item: any) => {
    const text = `Merhaba, Mavi Basım. Seçili ürün: ${item.code} - ${item.desc} - ${item.price}. Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
            <p className="text-sm md:text-base font-bold text-gray-500 whitespace-nowrap">105 gr. Kuşe - Renkli</p>
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
                                    <span className="text-[24px] font-black text-[#f27d26] mb-0.5 leading-tight">
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
        <div className="mt-8 text-center">
          <p className="text-red-600 font-black text-sm md:text-base uppercase tracking-tight">
            Lütfen Dikkat : Siparişlerinizin Renk, Adet ve Ölçülerinde %1 ila %5 Arasında Fire Olabilmektedir.
          </p>
        </div>
      </div>
      <ProductSEOSection categoryKey="el_ilani" />
    </div>
  );
};

const AfisPage = () => {
  const openWhatsApp = (item: any) => {
    const text = `Merhaba, Mavi Basım. Seçili ürün: ${item.code} - ${item.desc} - ${item.price}. Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
            <p className="text-sm md:text-base font-bold text-gray-500 whitespace-nowrap">105 gr. Kuşe - Renkli</p>
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
                                    <span className="text-[24px] font-black text-[#f27d26] mb-0.5 leading-tight">
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
        <div className="mt-8 text-center">
          <p className="text-red-600 font-black text-sm md:text-base uppercase tracking-tight">
            Lütfen Dikkat : Siparişlerinizin Renk, Adet ve Ölçülerinde %1 ila %5 Arasında Fire Olabilmektedir.
          </p>
        </div>
      </div>
      <ProductSEOSection categoryKey="afis" />
    </div>
  );
};

const AntetliPage = () => {
  const openWhatsApp = (item: any) => {
    const text = `Merhaba, Mavi Basım. Seçili ürün: ${item.code} - ${item.desc} - ${item.price}. Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
            <p className="text-sm md:text-base font-bold text-gray-500 whitespace-nowrap">90 gr. 1. Hamur - Renkli</p>
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
                                    <span className="text-[24px] font-black text-[#f27d26] mb-0.5 leading-tight">
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
        <div className="mt-8 text-center">
          <p className="text-red-600 font-black text-sm md:text-base uppercase tracking-tight">
            Lütfen Dikkat : Siparişlerinizin Renk, Adet ve Ölçülerinde %1 ila %5 Arasında Fire Olabilmektedir.
          </p>
        </div>
      </div>
      <ProductSEOSection categoryKey="antetli_kagit" />
    </div>
  );
};

const DosyalarPage = () => {
  const openWhatsApp = (item: any) => {
    const text = `Merhaba, Mavi Basım. Seçili ürün: ${item.code} - ${item.desc} - ${item.price}. Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
            <p className="text-sm md:text-base font-bold text-gray-500 whitespace-nowrap">Kapalı Hali 22.5x31 cm. Renkli - 1.000 Adet</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
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
                    <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors">{item.code}</td>
                    <td className="p-3 text-center font-medium text-black border-r border-gray-100">{item.miktar}</td>
                    <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.desc}</td>
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
          <p className="text-primary font-black text-sm uppercase tracking-tight">Fiyatlara kulakçık yapıştırma dahildir.</p>
        </div>
      </div>
      <ProductSEOSection categoryKey="dosya" />
    </div>
  );
};

const EtiketPage = () => {
  const openWhatsApp = (item: any) => {
    const text = `Merhaba, Mavi Basım. Seçili ürün: ${item.code} - ${item.desc} - ${item.price}. Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
            <p className="text-sm md:text-base font-bold text-gray-500 whitespace-nowrap">90 gr. Kuşe Çıkartma - Renkli - 1.000 Adet</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
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
                    <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.desc}</td>
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
      </div>
      <ProductSEOSection categoryKey="etiket" />
    </div>
  );
};

const OtoPaspasPage = () => {
  const openWhatsApp = (item: any) => {
    const text = `Merhaba, Mavi Basım. Seçili ürün: ${item.code} - ${item.miktar} - ${item.price}. Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
            <p className="text-sm md:text-base font-bold text-gray-500 whitespace-nowrap">34x49 cm Tek Renk - 85 gr. Kart</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
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
                    <td className="p-3 text-center text-black font-medium border-r border-gray-100">85 gr. Kart</td>
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
        <div className="mt-8 text-center">
          <p className="text-primary font-black text-sm md:text-base uppercase tracking-tight">
            Lütfen Dikkat : Siparişlerinizin Renk, Adet ve Ölçülerinde %1 ila %5 Arasında Fire Olabilmektedir.
          </p>
        </div>
      </div>
      <ProductSEOSection categoryKey="otopaspas" />
    </div>
  );
};

const KupBloknotPage = () => {
  const openWhatsApp = (item: any) => {
    const text = `Merhaba, Mavi Basım. Seçili ürün: ${item.code} - ${item.desc} - ${item.price}. Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
            <p className="text-sm md:text-base font-bold text-gray-500 whitespace-nowrap">İç yapraklar müşteri tarafından yerleştirilecektir</p>
          </div>
        </div>

        <div className="space-y-12">
          {KUP_BLOKNOT_DATA.map((category, cIdx) => (
            <div key={cIdx}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-8 bg-primary rounded-full" />
                <h2 className="text-xl font-black text-black uppercase tracking-tight">{category.cat}</h2>
              </div>
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
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
                          <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors">{item.code}</td>
                          <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.desc}</td>
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
                <p className="text-red-500 font-bold text-[10px] md:text-xs">
                  Yukarıdaki ürünlerin kutuları Mat Selefonlu olursa 240 TL ilave olur / Mat Selefon - Kabartma Lak olursa 1500 TL ilave olur.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProductSEOSection categoryKey="kup_bloknot" />
    </div>
  );
};

const MagnetPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const calculatePrice = (w: number, h: number) => {
    const effectiveW = Math.max(w, 5);
    const effectiveH = Math.max(h, 5);
    return effectiveW * effectiveH * 18;
  };

  const openWhatsApp = (item: any) => {
    if (item.isCustom) {
      setSelectedItem(item);
      setIsModalOpen(true);
    } else {
      const text = `Merhaba, Mavi Basım. Seçili ürün: ${item.code} - ${item.miktar} - ${item.price}. Bilgi almak istiyorum.`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const handleCustomOrder = () => {
    const price = calculatePrice(width, height);
    const text = `Merhaba, Mavi Basım. Özel Magnet Siparişi: ${selectedItem.code} - ${width}x${height} cm - 1000 Adet - Fiyat: ${price} ₺. Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
            <p className="text-sm md:text-base font-bold text-gray-500 whitespace-nowrap">60 Mikron - Renkli - 1000 Adet</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
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
                    <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.desc}</td>
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

        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mt-8">
          <p className="text-secondary/80 font-medium leading-relaxed">
            Mavi Basım olarak restoran, kafe ve işletmeler için profesyonel magnet baskı hizmeti sunuyoruz. 
            Türkiye geneline kargo ile magnet baskı gönderimi yapılmaktadır.
          </p>
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
                  <label className="block text-sm font-bold text-gray-500 uppercase mb-2">En (cm)</label>
                  <input 
                    type="number" 
                    value={width} 
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-primary outline-none transition-all font-bold text-lg"
                    min="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Boy (cm)</label>
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
                    <span className="text-2xl font-black text-primary">{calculatePrice(width, height)} ₺</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 italic">* 5x5 cm altı ölçüler 5x5 cm olarak hesaplanır.</p>
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
                    className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-secondary transition-all"
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
  const openWhatsApp = (item: any, type: string) => {
    const text = `Merhaba, Mavi Basım. ${type}: ${item.code} - ${item.ic} - 500 Cilt: ${item.p500} / 1000 Cilt: ${item.p1000}. Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
        <div className="mb-12 border border-gray-300 rounded-xl overflow-hidden shadow-xl">
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
                        <td className="p-2 border border-gray-300 text-center font-black text-black">{item.kapak}</td>
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
        <div className="border border-gray-300 rounded-xl overflow-hidden shadow-xl">
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
      <ProductSEOSection categoryKey="bloknot" />
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
          <p className="text-lg text-secondary/70 max-w-4xl mx-auto leading-relaxed font-medium">
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
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{s.desc}</p>
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
                  <p className="text-gray-500 font-medium leading-relaxed">{p.desc}</p>
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
    const adetLabel = questions[1].options.find(o => o.value === answers.adet)?.label;
    const text = `Merhaba, Mavi Basım. Katalog Hesaplayıcı Sonucu:\nSayfa: ${answers.sayfa}\nAdet: ${adetLabel}\nFiyat: ${foundPrice}\nSipariş vermek istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
                <span className="block font-black text-gray-700 group-hover:text-primary uppercase tracking-tight">{opt.label}</span>
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
          <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 size={32} strokeWidth={3} />
          </div>
          
          <div>
            <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-1">Hesaplama Sonucu</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{answers.sayfa} - {questions[1].options.find(o => o.value === answers.adet)?.label}</p>
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
              className="text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-black transition-colors"
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
  const [showFinder, setShowFinder] = useState(false);
  const openWhatsApp = (row: any, adet: string, fiyat: string) => {
    const text = `Merhaba, Mavi Basım. Katalog (${row.label} - ${row.total}) - ${adet}: ${fiyat}. Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {KATALOG_DATA.rows.map((row, rIdx) => (
            <div key={rIdx} className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
              <div className="p-6 bg-black text-white">
                <h3 className="text-lg font-black uppercase tracking-tight leading-tight mb-1">{row.label}</h3>
                <p className="text-primary font-bold text-sm uppercase">{row.total} Katalog Baskı Fiyatları</p>
              </div>
              
              <div className="p-6 flex-grow">
                <div className="flex gap-4 mb-6">
                  <div className="w-1/2 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      İç Sayfalar: 135 gr Kuşe
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Kapaklar: 300 gr Kuşe
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Cilt: Tel Dikiş
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      Kapaklar: Mat/Parlak Selefon
                    </div>
                  </div>
                  <div className="w-1/2 rounded-xl overflow-hidden border border-gray-100 shadow-inner">
                    <img 
                      src={`https://picsum.photos/seed/katalog-${rIdx}/300/200`} 
                      alt={row.label} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200">
                  <table className="w-full text-center text-xs">
                    <thead>
                      <tr className="bg-gray-100 text-secondary font-black uppercase tracking-widest border-b border-gray-200">
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
                          <td className="p-3 border-r border-gray-200 text-gray-500">{item.qty} Adet</td>
                          <td className="p-3 border-r border-gray-200 text-black font-black text-sm">{item.price}</td>
                          <td className="p-2">
                            <button 
                              onClick={() => openWhatsApp(row, `${item.qty} Adet`, item.price)}
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
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
          <p className="text-secondary font-bold text-center text-sm italic leading-relaxed">
            {KATALOG_DATA.footerNote}
            <br />
            <span className="text-primary not-italic mt-2 block font-black uppercase tracking-tight">{KATALOG_DATA.note}</span>
          </p>
        </div>
      </div>
      <ProductSEOSection categoryKey="katalog" />
    </div>
  );
};

const ZarfPage = () => {
  const openWhatsApp = (item: any) => {
    const text = `Merhaba, Mavi Basım. Seçili ürün: ${item.code} - ${item.desc} - ${item.ebat} - ${item.price}. Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
            <p className="text-sm md:text-base font-bold text-gray-500 whitespace-nowrap">110 gr. 1.Hamur</p>
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
                      {item.note && <div className="text-[10px] text-primary font-bold mt-1">{item.note}</div>}
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

        <div className="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-xl">
          <p className="text-primary font-black text-center uppercase tracking-tighter text-sm md:text-base">
            Lütfen Dikkat : Siparişlerinizin Renk, Adet ve Ölçülerinde %1 ila %5 Arasında Fire Olabilmektedir.
          </p>
        </div>
      </div>
      <ProductSEOSection categoryKey="zarf" />
    </div>
  );
};

const KartonCantaPage = () => {
  const openWhatsApp = (item: any, ebat: string) => {
    const text = `Merhaba, Mavi Basım. Karton Çanta (${ebat}): ${item.code} - ${item.desc} - ${item.miktar} - ${item.price}. Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
          <div key={gIdx} className="mb-10 border border-gray-300 rounded-xl overflow-hidden shadow-xl">
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
                      <td className="p-2 border border-gray-300 text-black font-medium">{item.desc}</td>
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
      </div>
      <ProductSEOSection categoryKey="karton_canta" />
    </div>
  );
};

const AmerikanServisPage = () => {
  const navigate = useNavigate();

  const openWhatsApp = (item: any) => {
    const text = `Merhaba, Mavi Basım. Seçili ürün: ${item.code} - ${item.ebat} - ${item.price}. Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
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
            <p className="text-sm md:text-base font-bold text-gray-500 whitespace-nowrap">Tek Yön Renkli Baskı - 2000 Adet</p>
          </div>
        </div>

        <div className="border border-gray-300 rounded-xl overflow-hidden shadow-xl">
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
                    <td className="p-2 border border-gray-300 text-center text-black font-medium">{item.desc}</td>
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
          <p className="text-primary font-bold text-center text-sm md:text-lg uppercase tracking-tight">
            {AMERIKAN_SERVIS_DATA[0].note}
          </p>
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
                src={getImageUrl('TECRUBE', "https://picsum.photos/seed/printing-factory/800/800")} 
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

const compressImage = (base64Str: string, maxWidth = 600, maxHeight = 600, quality = 0.6): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
  });
};

const getStorageUsage = () => {
  let total = 0;
  for (let x in localStorage) {
    if (!localStorage.hasOwnProperty(x)) continue;
    total += ((localStorage[x].length + x.length) * 2);
  }
  return (total / 1024 / 1024).toFixed(2); // MB
};

const MediaManagementPage = () => {
  const [overrides, setOverrides] = useState<{ [key: string]: string }>({});
  const [customKey, setCustomKey] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [storageUsage, setStorageUsage] = useState("0");

  useEffect(() => {
    const loadOverrides = async () => {
      try {
        const loadedOverrides = await getAllImagesFromDB();
        setOverrides(loadedOverrides);
        imageOverridesCache = loadedOverrides;
        
        // Calculate usage (approximate for IndexedDB)
        let total = 0;
        Object.entries(loadedOverrides).forEach(([k, v]) => {
          total += (k.length + (v as string).length) * 2;
        });
        setStorageUsage((total / 1024 / 1024).toFixed(2));
      } catch (error) {
        console.error("Failed to load overrides:", error);
      }
    };
    loadOverrides();
  }, []);

  const handleFileUpload = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        let base64String = reader.result as string;
        
        // Always compress to ensure it fits in localStorage and reduces quota usage
        base64String = await compressImage(base64String);
        
        await saveImageToDB(key, base64String);
        const newOverrides = { ...overrides, [key]: base64String };
        setOverrides(newOverrides);
        imageOverridesCache = newOverrides;
        
        // Update usage
        let total = 0;
        Object.entries(newOverrides).forEach(([k, v]) => {
          total += (k.length + (v as string).length) * 2;
        });
        setStorageUsage((total / 1024 / 1024).toFixed(2));
      } catch (error: any) {
        console.error("Storage error:", error);
        alert("Resim kaydedilirken bir hata oluştu: " + (error.message || "Bilinmeyen hata"));
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = async (key: string) => {
    try {
      await deleteImageFromDB(key);
      const newOverrides = { ...overrides };
      delete newOverrides[key];
      setOverrides(newOverrides);
      imageOverridesCache = newOverrides;
      
      // Update usage
      let total = 0;
      Object.entries(newOverrides).forEach(([k, v]) => {
        total += (k.length + (v as string).length) * 2;
      });
      setStorageUsage((total / 1024 / 1024).toFixed(2));
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  const handleResetAll = async () => {
    if (!confirm("Tüm resim değişikliklerini sıfırlamak istediğinize emin misiniz?")) return;
    try {
      await clearAllImagesFromDB();
      setOverrides({});
      imageOverridesCache = {};
      setStorageUsage("0.00");
      window.location.reload();
    } catch (error) {
      console.error("Failed to clear all images:", error);
    }
  };

  const commonKeys = [
    { label: "Banner 1", key: "banner1" },
    { label: "Banner 2", key: "banner2" },
    { label: "Banner 3", key: "banner3" },
    { label: "Banner 4", key: "banner4" },
    { label: "Banner 5", key: "banner5" },
    { label: "Magnet 1 (Özel Kesim)", key: "MAG1" },
    { label: "Magnet 2 (Oval Kesim)", key: "MAG2" },
    { label: "Magnet 3 (CM Kare)", key: "MAG3" },
    { label: "Antetli 1", key: "ANT1" },
    { label: "Antetli 2", key: "ANT2" },
    { label: "Antetli 3", key: "ANT3" },
    { label: "Antetli 4", key: "ANT4" },
    { label: "Antetli 5", key: "ANT5" },
    { label: "Antetli 6", key: "ANT6" },
    { label: "Antetli 13", key: "ANT13" },
    { label: "Zarf 1", key: "Z1" },
    { label: "Zarf 2", key: "Z2" },
    { label: "Zarf 3", key: "Z3" },
    { label: "Kartvizit (nsk)", key: "nsk" },
    { label: "Kartvizit (mna)", key: "mna" },
    { label: "Kartvizit (cym)", key: "cym" },
    { label: "Kartvizit (cyp)", key: "cyp" },
    { label: "Kartvizit (kl)", key: "kl" },
    { label: "Kartvizit (CYML4)", key: "CYML4" },
    { label: "Kartvizit (o-cok)", key: "o-cok" },
    { label: "Kartvizit (o-sek)", key: "o-sek" },
    { label: "Kartvizit (EKO-SEK)", key: "EKO-SEK" },
    { label: "Kartvizit (AC-SEK)", key: "AC-SEK" },
    { label: "Kartvizit (TANK)", key: "TANK" },
    { label: "Kartvizit (ay)", key: "ay" },
    { label: "Kartvizit (fan)", key: "fan" },
    { label: "Kartvizit (gy)", key: "gy" },
    { label: "Kartvizit (nka)", key: "nka" },
    { label: "Kartvizit (vip)", key: "vip" },
    { label: "Kartvizit (NK)", key: "NK" },
    { label: "Kartvizit (NKA)", key: "NKA" },
    { label: "Kartvizit (MNA)", key: "MNA" },
    { label: "Kartvizit (O-COK)", key: "O-COK" },
    { label: "Kartvizit (O-SEK)", key: "O-SEK" },
    { label: "Makbuz & Formlar", key: "MAKBUZ" },
    { label: "Kutu", key: "KUTU" },
    { label: "Ambalaj", key: "AMBALAJ" },
    { label: "Küp Bloknot", key: "KUP_BLOKNOT" },
  ];

  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-black uppercase tracking-tight mb-2">Medya Yönetimi</h1>
            <p className="text-gray-500 font-medium">Uygulama genelindeki resimleri buradan güncelleyebilirsiniz.</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${Number(storageUsage) > 4 ? 'bg-red-500' : 'bg-secondary'}`}
                  style={{ width: `${Math.min(100, (Number(storageUsage) / 5) * 100)}%` }}
                />
              </div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Depolama: {storageUsage}MB / 5MB
              </span>
            </div>
          </div>
          <button 
            onClick={handleResetAll}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
          >
            <RefreshCw size={20} />
            Tümünü Sıfırla
          </button>
        </div>

        <div className="grid gap-6">
          {commonKeys.map(({ label, key }) => (
            <div key={key} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-black mb-1">{label}</h3>
                <code className="text-xs bg-gray-200 px-2 py-1 rounded text-secondary/70">{key}</code>
              </div>
              
              <div className="flex items-center gap-4">
                {overrides[key] && (
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary">
                    <img src={overrides[key]} alt={label} className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className="flex gap-2">
                  <label className={`cursor-pointer flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {isProcessing ? <RefreshCw size={16} className="animate-spin" /> : <Upload size={16} />}
                    Yükle
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      disabled={isProcessing}
                      onChange={(e) => handleFileUpload(key, e)}
                    />
                  </label>
                  
                  {overrides[key] && (
                    <button 
                      onClick={() => handleReset(key)}
                      disabled={isProcessing}
                      className={`p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title="Sıfırla"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="bg-secondary/5 p-8 rounded-3xl border-2 border-dashed border-secondary/10 mt-8">
            <h3 className="text-xl font-bold text-black mb-4">Özel Kod ile Yükle</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Resim Kodu (Örn: MAG1)" 
                className="flex-grow px-6 py-3 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
              />
              <label className={`cursor-pointer flex items-center justify-center gap-2 px-8 py-3 bg-secondary text-white rounded-2xl font-bold transition-all ${(!customKey || isProcessing) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-secondary/90'}`}>
                {isProcessing ? <RefreshCw size={20} className="animate-spin" /> : <Upload size={20} />}
                Dosya Seç ve Yükle
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  disabled={!customKey || isProcessing}
                  onChange={(e) => {
                    handleFileUpload(customKey, e);
                    setCustomKey("");
                  }}
                />
              </label>
            </div>
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
    const message = `Merhaba, Akıllı Hesaplayıcı ile fiyat aldım:
Ebat: ${selectedEbat}
Nüsha: ${selectedNusha}
Adet: ${adetOptions[selectedAdetIdx]}
Baskı: ${is2Renk ? '2 Renk' : '1 Renk'}
Özellik: Numaratörlü
Toplam Fiyat: ${totalPrice} TL
Bilgi almak istiyorum.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
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
              <p className="text-[10px] text-gray-500 font-medium">İstediğiniz özellikleri seçin, fiyatı görün.</p>
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
              <div className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-md uppercase">Numaratörlü</div>
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
          <span className="text-[10px] font-bold text-gray-500 uppercase">Toplam Fiyat</span>
          <div className="text-2xl font-black text-primary my-1">
            {totalPrice} ₺
          </div>
          <button 
            onClick={openWhatsApp}
            className="w-full mt-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/20"
          >
            <MessageCircle size={14} />
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
                <span className="text-gray-300 font-light">|</span>
                <span className="text-primary font-medium">Numaratörlü</span>
              </h2>
              <p className="text-sm text-gray-500 font-medium">Özellikleri seçin, anında fiyat alın ve sipariş verin.</p>
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
  const section = data[0];
  if (!section) return null;

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
        <span className="text-white font-black text-sm md:text-base tracking-[0.2em] uppercase opacity-80">NUMARATÖRLÜ</span>
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
  const navigate = useNavigate();
  const isSiparisFisi = data[0]?.title === "SİPARİŞ FİŞİ";
  const isAdisyon = data[0]?.title.includes("ADİSYON");
  const isSozlesme = data[0]?.title.includes("SÖZLEŞME");
  const isParaMakbuzu = data[0]?.title.includes("PARA MAKBUZU");
  const isSpecialPage = isSiparisFisi || isAdisyon || isSozlesme || isParaMakbuzu;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  const openWhatsApp = (title: string, label: string, ebat: string, miktar: string, price: number) => {
    const message = `Merhaba, ${title} - ${label} - ${ebat} - ${miktar} için bilgi almak istiyorum. Fiyat: ${price} TL`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Group data by ebat
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
              <p className="text-sm md:text-base font-bold text-gray-500 whitespace-nowrap">
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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Fiyat Teklifi Almak İstiyorum',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:info@mavibasim.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Ad Soyad: ${formData.name}\nTelefon: ${formData.phone}\nE-posta: ${formData.email}\n\nMesaj:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Telefon</h3>
                <p className="text-black font-medium mb-4">Hafta içi: 09:00 - 19:00</p>
                <a href={PHONE_LINK} className="text-primary font-black text-lg hover:underline">
                  {PHONE_NUMBER}
                </a>
              </div>

              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <Mail size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">E-posta</h3>
                <p className="text-black font-medium mb-4">7/24 yazabilirsiniz</p>
                <a href="mailto:info@mavibasim.com" className="text-primary font-black text-lg hover:underline">
                  info@mavibasim.com
                </a>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Adres</h3>
              <p className="text-black font-medium leading-relaxed mb-6">
                {ADDRESS}
              </p>
              <div className="space-y-4">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=2.+Matbaacılar+Sitesi+Topkapı+Zeytinburnu+İstanbul" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                >
                  Haritada Görüntüle <ChevronRight size={16} />
                </a>
                <div className="w-full h-48 rounded-2xl overflow-hidden border border-gray-200">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.569424754564!2d28.9105433!3d41.0237697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab00000000001%3A0x0!2zMi4gTWF0YmFhY8SxbGFyIFNpdGVzaQ!5e0!3m2!1str!2str!4v1710946422000!5m2!1str!2str" 
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

          {/* Contact Form Placeholder */}
          <div className="bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/50">
            <h3 className="text-2xl font-black text-primary mb-8 uppercase tracking-tight">Bize Mesaj Gönderin</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black ml-1">Adınız Soyadınız</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                    placeholder="Örn: Ahmet Yılmaz"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-black ml-1">Telefon Numaranız</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                    placeholder="Örn: 05xx xxx xx xx"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-black ml-1">E-posta Adresiniz</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                  placeholder="Örn: ahmet@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-black ml-1">Konu</label>
                <select 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium appearance-none"
                >
                  <option>Fiyat Teklifi Almak İstiyorum</option>
                  <option>Sipariş Durumu Hakkında</option>
                  <option>Grafik Tasarım Desteği</option>
                  <option>Diğer</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-black ml-1">Mesajınız</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium resize-none"
                  placeholder="Mesajınızı buraya yazın..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 uppercase tracking-widest"
              >
                MESAJI GÖNDER
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        // Load image overrides from IndexedDB at startup
        const loadedOverrides = await getAllImagesFromDB();
        imageOverridesCache = loadedOverrides;
      } catch (error) {
        console.error("Failed to load image overrides:", error);
      } finally {
        setIsReady(true);
      }
    };
    initApp();
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <RefreshCw size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
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
            <Route path="/grafik-tasarim" element={<GrafikTasarimPage />} />
            <Route path="/hakkimizda" element={<HakkimizdaPage />} />
            <Route path="/iletisim" element={<IletisimPage />} />
            <Route path="/medya-yonetimi" element={<MediaManagementPage />} />
          </Routes>
        </main>

        <Footer />
        <BackToTopButton />
      </div>
    </BrowserRouter>
  );
}
