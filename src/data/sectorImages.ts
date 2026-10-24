export interface SectorImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Selected by visual inspection of the actual artwork, not filenames.
export const SECTOR_HERO_IMAGES: Readonly<Record<string, SectorImage>> = {
  "/sektor/kuafor-kartvizit-baski": {
    "src": "/images/kartvizit/kartvizit-baski.webp",
    "alt": "Kuaför ve hizmet işletmelerinde kullanılabilecek mat yüzeyli kartvizit baskı örneği",
    "width": 800,
    "height": 533
  },
  "/sektor/restoran-brosur-baski": {
    "src": "/images/el-ilani/ucuz-el-ilani-basimi.webp",
    "alt": "Restoran için yemek fotoğrafları ve menü içeren katlamalı broşür",
    "width": 1536,
    "height": 1024
  },
  "/sektor/donerci-magnet-baski": {
    "src": "/images/magnet/magnet-baski.webp",
    "alt": "Dönerci için baskılı paket servis magneti ve mıknatıslı arka yüzü",
    "width": 1536,
    "height": 1024
  },
  "/sektor/fast-food-cips-kutusu-baski": {
    "src": "/images/ambalaj/ambalaj-baski-fiyatlari.webp",
    "alt": "Fast food servisi için baskılı patates, popcorn ve yiyecek kutuları",
    "width": 800,
    "height": 533
  },
  "/sektor/pastane-kutu-baski": {
    "src": "/images/kutu/gida-ambalaji-baski-ornegi.webp",
    "alt": "Pastaneler için baskılı kapaklı baklava kutuları",
    "width": 1536,
    "height": 1024
  },
  "/sektor/kozmetik-guzellik-merkezi-baski": {
    "src": "/images/brosur/ucuz-brosur-baski.webp",
    "alt": "Güzellik merkezi için hizmet tanıtım broşürleri",
    "width": 1536,
    "height": 1024
  },
  "/sektor/e-ticaret-perakende-baski": {
    "src": "/images/etiket/kuse-gorsel-etiket.webp",
    "alt": "E-ticaret gönderileri için baskılı etiketle kapatılmış kraft kutular",
    "width": 1536,
    "height": 1024
  },
  "/sektor/egitim-kurumlari-baski": {
    "src": "/images/brosur/brosur-baski-fiyatlari.webp",
    "alt": "Eğitim kurumu için kayıt ve program tanıtım broşürleri",
    "width": 1536,
    "height": 1024
  },
  "/sektor/kutu-ambalaj-baski-cozumleri": {
    "src": "/images/kutu/ozel-kesim-kutu-tasarimi.webp",
    "alt": "Gıda, hediye ve perakende ürünleri için farklı baskılı karton kutular",
    "width": 800,
    "height": 533
  },
  "/sektor/eczane-el-ilani-baski": {
    "src": "/images/el-ilani/baski-sonrasi-islemler-mucellit-surecleri.webp",
    "alt": "Vitamin ve sağlık ürünlerini tanıtan baskılı el ilanları",
    "width": 1536,
    "height": 1024
  },
  "/sektor/emlakci-kartvizit-baski": {
    "src": "/images/kartvizit/plastik-pvc-kartvizit.webp",
    "alt": "Gayrimenkul firması için baskılı kurumsal kartvizit",
    "width": 1536,
    "height": 1024
  },
  "/sektor/kafe-menu-baski": {
    "src": "/images/el-ilani/cuz-el-ilani-basimi.webp",
    "alt": "Kafe ve restoranlar için içecek ve yemek görselli katlamalı menü",
    "width": 1536,
    "height": 1024
  },
  "/sektor/lokanta-amerikan-servis-baski": {
    "src": "/images/amerikan-servis/kagit-amerikan-servis.webp",
    "alt": "Lokanta için yemek menüsü ve iletişim bilgileri basılmış Amerikan servis",
    "width": 768,
    "height": 512
  },
  "/emlakci-kartvizit": {
    "src": "/images/kartvizit/plastik-pvc-kartvizit.webp",
    "alt": "Emlak firması için kurumsal kartvizit baskı örneği",
    "width": 1536,
    "height": 1024
  },
  "/emlak-afis-baski": {
    "src": "/images/afis/afis-baski-fiyatlari.webp",
    "alt": "Sahibinden satılık ve kiralık emlak afişi örnekleri",
    "width": 800,
    "height": 533
  },
  "/hali-koltuk-yikama-baski": {
    "src": "/images/magnet/magnet-baski-tasarimi.webp",
    "alt": "Halı yıkama firmasına ait baskılı reklam magneti",
    "width": 800,
    "height": 533
  },
  "/fast-food-cips-kutusu": {
    "src": "/images/kutu/ambalaj-baski-fiyatlari.webp",
    "alt": "Patates ve atıştırmalık servisi için baskılı karton kutu",
    "width": 1536,
    "height": 1024
  },
  "/fast-food-kampanya-brosuru": {
    "src": "/images/brosur/tanitim-brosuru-ornegi.webp",
    "alt": "Döner ve paket servis kampanyası için renkli tanıtım broşürü",
    "width": 1536,
    "height": 1024
  },
  "/lokanta-amerikan-servis": {
    "src": "/images/amerikan-servis/logolu-amerikan-servis.webp",
    "alt": "Lokanta için baskılı menü içeren kâğıt Amerikan servis",
    "width": 768,
    "height": 512
  },
  "/restaurant-siparis-fisi": {
    "src": "/images/siparis-fisi/siparis-fisi-ornegi.webp",
    "alt": "Sipariş bilgilerinin yazılması için otokopili sipariş fişi koçanı",
    "width": 1536,
    "height": 1024
  },
  "/samsun-restoran-brosur-baski": {
    "src": "/images/el-ilani/ucuz-el-ilani-basimi.webp",
    "alt": "Restoran menüsü ve paket servis bilgileri içeren katlamalı broşür",
    "width": 1536,
    "height": 1024
  },
  "/trabzon-kafe-menu-baski": {
    "src": "/images/el-ilani/cuz-el-ilani-basimi.webp",
    "alt": "Kafe ve restoran için baskılı katlamalı menü örneği",
    "width": 1536,
    "height": 1024
  },
  "/ordu-findik-firmasi-katalog-baski": {
    "src": "/images/katalog/katalog-tasarimi-ve-baski.webp",
    "alt": "Tarım ürünlerinin tanıtımı için basılı ürün kataloğu örneği",
    "width": 1536,
    "height": 1024
  },
  "/antalya-emlakci-kartvizit-baski": {
    "src": "/images/kartvizit/plastik-pvc-kartvizit.webp",
    "alt": "Gayrimenkul danışmanlığı için kartvizit baskı örneği",
    "width": 1536,
    "height": 1024
  },
  "/rize-lokanta-amerikan-servis": {
    "src": "/images/amerikan-servis/amerikan-servis-baski.webp",
    "alt": "Kafe ve lokanta masasında kullanılan baskılı kraft Amerikan servis",
    "width": 768,
    "height": 512
  },
  "/giresun-fast-food-cips-kutusu-baski": {
    "src": "/images/ambalaj/ambalaj-baski-fiyatlari.webp",
    "alt": "Paket servis için baskılı patates ve yiyecek kutuları",
    "width": 800,
    "height": 533
  },
  "/gebze-eczane-etiket-baski": {
    "src": "/images/kutu/kutu-baski-detayi.webp",
    "alt": "Vitamin ürünü için renkli baskılı kutu ve kutunun açık baskı taslağı",
    "width": 1536,
    "height": 1024
  },
  "/bitlis-restaurant-siparis-fisi": {
    "src": "/images/siparis-fisi/siparis-fisi-ornegi.webp",
    "alt": "Restoran sipariş takibi için otokopili sipariş fişi",
    "width": 1536,
    "height": 1024
  },
  "/erzurum-emlakci-katalog-baski": {
    "src": "/images/katalog/amerikan-cilt-katalog.webp",
    "alt": "İç mekân ve mobilya görselleri içeren katalog baskı ve sayfa yerleşimi örneği",
    "width": 1536,
    "height": 1024
  },
  "/kayseri-emlakci-afis-baski": {
    "src": "/images/afis/duvar-afisi-ornegi.webp",
    "alt": "Gayrimenkul tanıtımı için baskılı emlak afişi",
    "width": 1536,
    "height": 1024
  }
};
