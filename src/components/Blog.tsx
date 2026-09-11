import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, User, ArrowLeft, ChevronRight, ArrowRight, ShieldCheck, Truck, FileText, FileSpreadsheet, Download, ExternalLink } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants/contact';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { BLOG_IMAGE_MANIFEST } from '../generated/sectorImageManifest';

export { BLOG_POSTS };
export type { BlogPost };

// Helper to dynamically get relevant products for a blog post
const getRelatedProducts = (slug: string, category: string) => {
  const normSlug = slug.toLowerCase();
  const normCategory = category.toLowerCase();

  // 1. Emlak / Makbuz / Form / Sözleşme
  if (
    normSlug.includes('yer-gosterme') || 
    normSlug.includes('sözleşme') || 
    normSlug.includes('sozlesme') || 
    normSlug.includes('adisyon') || 
    normSlug.includes('makbuz') || 
    normSlug.includes('makbuz-ve-formlar') || 
    normCategory.includes('makbuz') || 
    normCategory.includes('form')
  ) {
    return {
      introTitle: "Emlak ve Kurumsal Ofislerin En Çok Tercih Ettiği Tamamlayıcı Baskılar",
      introDesc: "Emlak ofisinizin ve kurumsal firmanızın resmi basılı evrak, sözleşme ve yönetim formlarını tek bir süreçte hazırlayarak hem tasarım bütünlüğü sağlayabilir hem de kargo ve zaman avantajı elde edebilirsiniz:",
      bullets: [
        "Bu ürünle birlikte en çok tercih edilen matbaa ürünleri: Yer Gösterme Belgesi siparişi veren emlak danışmanlarımızın en çok birlikte talep ettiği tamamlayıcı kurumsal sözleşmeler ve evrak formları.",
        "Siparişinizi tek seferde tamamlayabileceğiniz tamamlayıcı baskılar: Para akışını belgelemek için Otokopili Tahsilat Makbuzu ve markanızın prestijini yansıtan Cepli Sunum Dosyaları.",
        "Aynı tasarım ve üretim sürecinde birlikte hazırlanabilecek kurumsal dökümanlar: Markanıza özel tasarlanmış Premium Kartvizit ve ilan tanıtımlarınızı yapabileceğiniz Broşürler."
      ],
      products: [
        { name: "Sözleşme Baskısı", desc: "Otokopili & Numaratörlü", reason: "Resmi işlemlerinizi otokopili ve seri numaralı nüshalarla belgelendirmek için geçebilirsiniz.", path: "/sozlesme-baski", img: "/images/sozlesme/sozlesme-baskisi.webp", alt: "Sözleşme Baskısı", title: "Otokopili Sözleşme Baskısı" },
        { name: "Tahsilat Makbuzu", desc: "Karbonlu Para Makbuzu", reason: "Para akışını ve makbuz takibini kurumsal hale getirmek için tercih edin.", path: "/tahsilat-makbuzu", img: "/images/tahsilat-makbuzu/tahsilat-makbuzu-baskisi.webp", alt: "Tahsilat Makbuzu Baskısı", title: "Otokopili Tahsilat Makbuzu Baskısı" },
        { name: "Kartvizit", desc: "Premium Kartvizitler", reason: "Emlak danışmanlığında müşterilerinizde prestijli bir ilk izlenim bırakmak için seçin.", path: "/kartvizit", img: "/images/kartvizit/premium-kartvizit-baskisi.webp", alt: "Premium Kartvizit Baskısı", title: "Emlakçı Premium Kartvizit Baskısı" },
        { name: "Tanıtım Broşürü", desc: "Katlamalı ve Düz Seçenekler", reason: "Emlak portföyü ve proje lansmanı tanıtımları yapmak için yönelin.", path: "/brosur", img: "/images/brosur/brosur-baskisi.webp", alt: "Tanıtım Broşürü", title: "Katlamalı Tanıtım Broşürü" },
        { name: "Cepli Dosya", desc: "Sunum Dosyaları", reason: "Müşterilerinize resmi sözleşme ve tapu dökümanlarını şık bir klasörde sunmak için kullanın.", path: "/dosyalar", img: "/images/dosya/cepli-dosya-baskisi.webp", alt: "Cepli Dosya Baskısı", title: "Emlak Sunum Cepli Dosya Baskısı" }
      ]
    };
  }

  // 2. Restoran / Kafe / Gıda (Amerikan Servis, Adisyon, Sipariş Fişi, etc.)
  if (
    normSlug.includes('restoran') || 
    normSlug.includes('lokanta') || 
    normSlug.includes('yemek') || 
    normSlug.includes('kafe') || 
    normSlug.includes('cafe') || 
    normSlug.includes('menü') || 
    normSlug.includes('amerikan-servis') || 
    normSlug.includes('adisyon')
  ) {
    return {
      introTitle: "Restoran ve Kafelerin En Çok Sipariş Ettiği Reklam Ürünleri",
      introDesc: (
        <span>
          Restoran veya kafe işletmenizin prestijini, temizliğini ve profesyonelliğini sahada yansıtacak tüm <Link to="/amerikan-servis" className="text-primary hover:underline font-bold">Amerikan Servis</Link>, <Link to="/brosur" className="text-primary hover:underline font-bold">Broşür Baskı</Link>, <Link to="/magnet" className="text-primary hover:underline font-bold">Magnet Baskı</Link>, <Link to="/karton-canta" className="text-primary hover:underline font-bold">Karton Çanta</Link> ve <Link to="/adisyon" className="text-primary hover:underline font-bold">Adisyon Baskısı</Link> dökümanlarını gıdaya uygun bitkisel soya bazlı Heidelberg mürekkepleriyle üretiyoruz:
        </span>
      ),
      bullets: [
        "Temizlik ve kurumsal kimlik için en pratik çözüm: Masalarınızın hijyenini ve kurumsal görünümünü destekleyen özel baskılı Amerikan Servisler.",
        "Masa siparişlerini güvenle kaydetmek için ideal evraklar: Adisyon fişleri ve garson sipariş formları otokopili ve seri numaralı olarak üretilir.",
        "Müşteri evlerine siparişlerde en kalıcı reklam gücü: Paket servislerin yanında olmazsa olmaz buzdolabı magnetleri ve katlamalı broşür / el ilanı tasarımları."
      ],
      products: [
        { name: "Amerikan Servis", desc: "Özel Baskılı Masa Altlığı", reason: "Masalarınızın temizliğini ve hijyenik kurumsal algısını korumak için tercih edin.", path: "/amerikan-servis", img: "/images/amerikan-servis/amerikan-servis-baskisi.webp", alt: "Amerikan Servis Baskısı", title: "Restoran Amerikan Servis Baskısı" },
        { name: "Adisyon Baskısı", desc: "Otokopili Garson Fişleri", reason: "Masa ve paket sipariş takip süreçlerinizi seri numaralı fişlerle kolaylaştırın.", path: "/adisyon", img: "/images/makbuz/siparis-fisi-baskisi.webp", alt: "Adisyon Fişi Baskısı", title: "Restoran Adisyon Fişi Baskısı" },
        { name: "Tanıtım Broşürü", desc: "Katlamalı Yemek Menüleri", reason: "Paket servislerde müşterilerinize sunacağınız şık yemek menüleri hazırlayın.", path: "/brosur", img: "/images/brosur/brosur-baskisi.webp", alt: "Tanıtım Broşürü", title: "Restoran Yemek Menüsü" },
        { name: "Magnet Baskı", desc: "Buzdolabı Magnetleri", reason: "Müşterilerinizin buzdolaplarında ve mutfaklarında 7/24 kalıcı yer edinin.", path: "/magnet", img: "/images/magnet/oval-kesimli-magnet.webp", alt: "Magnet Baskısı", title: "Paket Servis Magnet Baskısı" },
        { name: "Karton Çanta", desc: "Lüks Paketleme Çantaları", reason: "Paket servislerde ve lüks paketlemelerde müşterinize prestijli taşıma sunun.", path: "/karton-canta", img: "/images/dosya/karton-canta-tasarimi.webp", alt: "Karton Çanta Baskısı", title: "Restoran Karton Paket Servis Çantası" }
      ]
    };
  }

  // 3. Broşür / El İlanı / Afiş / Reklam / Tanıtım
  if (
    normSlug.includes('broşür') || 
    normSlug.includes('brosur') || 
    normSlug.includes('el-ilani') || 
    normSlug.includes('el-ilani-dagitimi') || 
    normSlug.includes('afis') || 
    normSlug.includes('katalog') || 
    normCategory.includes('brosur') || 
    normCategory.includes('reklam')
  ) {
    return {
      introTitle: "Tanıtım ve Reklam Kampanyalarında Birlikte Kullanılan Ürünler",
      introDesc: "Firmanızın yeni kampanyasını duyururken veya ürün tanıtımı yaparken, hedef kitlenizin dikkatini çekmek için birlikte koordine edilen en popüler reklam dökümanları şunlardır:",
      bullets: [
        "Yüksek adetli sokak ve posta kutusu dağıtımları için: İnce gramajlı (115gr veya 135gr kuşe) yüksek kaliteli ekonomik El İlanı ve Broşür alternatifleri.",
        "Vitrin, sokak ve bayi duvarlarında dikkat çeken duyurular: Firmanızın kampanyasını büyük ölçekte sergileyen 300gr kuşe veya blueback Afiş baskıları.",
        "Detaylı ürün ve hizmet yelpazenizi sergileyen prestijli yayınlar: Lüks kapaklı ve iplik dikişli çok sayfalı kurumsal Katalog ve cepli tanıtım dosyaları."
      ],
      products: [
        { name: "Tanıtım Broşürleri", desc: "Kırımlı Akordeon Broşür", reason: "Detaylı firma veya ürün listesi tanıtımları yapmak için tercih edin.", path: "/brosur", img: "/images/brosur/brosur-baskisi.webp", alt: "Tanıtım Broşürü", title: "Katlamalı Tanıtım Broşürü" },
        { name: "El İlanı Baskı", desc: "Hızlı Dağıtım El İlanı", reason: "Hızlı kitle dağıtımları ve ekonomik sokak reklamları için seçin.", path: "/el-ilani", img: "/images/brosur/el-ilani-baskisi.webp", alt: "El İlanı Baskısı", title: "A5 Tek Yön El İlanı Baskısı" },
        { name: "Katalog Baskı", desc: "Çok Sayfalı Ürün Kataloğu", reason: "Tek bir broşürün sığdıramayacağı zengin ürün portföyleri için yönelin.", path: "/kataloglar", img: "/images/dosya/katalog-baskisi.webp", alt: "Katalog Baskısı", title: "Çok Sayfalı Ürün Kataloğu Baskısı" },
        { name: "Afiş Baskı", desc: "Büyük Boy Mağaza Afişi", reason: "Fuar alanı, dükkan vitrini veya dış mekanda dikkat çekmek için kullanın.", path: "/afis", img: "/images/dosya/afis-tasarimi.webp", alt: "Afiş Baskısı", title: "50x70 and 70x100 Afiş Baskısı" },
        { name: "Kartvizit", desc: "Kalın Selefonlu Kartvizit", reason: "Müşterilerinizde kalıcı ve taşınabilir bir ilk izlenim bırakmak için geçin.", path: "/kartvizit", img: "/images/kartvizit/premium-kartvizit-baskisi.webp", alt: "Kartvizit Baskısı", title: "Kurumsal Selefonlu Kartvizit" }
      ]
    };
  }

  // 4. Kartvizit / Kurumsal Kimlik / Antetli / Zarf / Dosya / Bloknot
  if (
    normSlug.includes('kartvizit') || 
    normSlug.includes('antetli') || 
    normSlug.includes('zarf') || 
    normSlug.includes('dosya') || 
    normSlug.includes('bloknot') || 
    normSlug.includes('kimlik') || 
    normCategory.includes('kartvizit') || 
    normCategory.includes('kimlik')
  ) {
    return {
      introTitle: "Kurumsal Markanızın Profesyonel Kimliğini Tamamlayan Setler",
      introDesc: "Ofis içi yazışmalardan müşteri sunumlarına kadar markanızın prestijini en üst seviyeye taşıyacak, tasarım dilleri birbiriyle tam uyumlu kurumsal dökümanlar:",
      bullets: [
        "İlk tanışmada kalıcı bir iz bırakmak için: Kabartma laklı, kalın ve mat selefonlu lüks ve kurumsal Kartvizitler.",
        "Resmi yazışmalar ve teklif gönderimleri için: Kurumsal logonuzun basılı olduğu 80gr 1. Hamur Antetli Kağıt ve Diplomat Zarf takımı.",
        "Sözleşme, fatura ve teklif dökümanlarını şık sunmak için: Mat selefonlu ve cepli kurumsal Sunum Dosyaları ile ofis içi Bloknotlar."
      ],
      products: [
        { name: "Kartvizit", desc: "Premium Laklı Kartvizitler", reason: "Kurumsal ilk tanışmalarda markanız adına kalıcı bir iz bırakmak için geçin.", path: "/kartvizit", img: "/images/kartvizit/premium-kartvizit-baskisi.webp", alt: "Kartvizit Baskısı", title: "Lüks Mat Selefonlu Kartvizit" },
        { name: "Antetli Kağıt", desc: "80gr Kurumsal Logolu Kağıt", reason: "Resmi yazışmalarınızı ve teklif dökümanlarınızı kurumsal kimliğe kavuşturun.", path: "/antetli", img: "/images/makbuz/antetli-kagit-tasarimi.webp", alt: "Antetli Kağıt Baskısı", title: "Kurumsal Logolu Antetli Kağıt" },
        { name: "Diplomat Zarf", desc: "Pencereli & Penceresiz Zarf", reason: "Teklif, fatura ve kurumsal evraklarınızı müşteriye şık bir zarfla ulaştırın.", path: "/zarf", img: "/images/sozlesme/torba-zarf-baskisi.webp", alt: "Diplomat Zarf Baskısı", title: "Logolu Diplomat Zarf Baskısı" },
        { name: "Cepli Dosya", desc: "Sunum ve Teklif Klasörleri", reason: "Teklif, sözleşme ve kurumsal evraklarınızı düzenli ve prestijli bir klasörde sunun.", path: "/dosyalar", img: "/images/dosya/cepli-dosya-baskisi.webp", alt: "Cepli Dosya Baskısı", title: "Kurumsal Cepli Sunum Dosyası" },
        { name: "Küp Bloknot", desc: "Logolu Masaüstü Bloknotu", reason: "Müşterilerinizin çalışma masalarında her gün göz önünde olacak kalıcı promosyon.", path: "/kup-bloknot", img: "/images/sozlesme/bloknot-baskisi.webp", alt: "Küp Bloknot Baskısı", title: "Logolu Promosyon Küp Bloknot" }
      ]
    };
  }

  // 5a. Magnet Özel Odak
  if (normSlug.includes('magnet') || normCategory.includes('magnet')) {
    return {
      introTitle: "Paket Servis ve Marka Görünürlüğünü Tamamlayan Baskı Çözümleri",
      introDesc: "Mutfaklarda ve buzdolaplarında mıknatıslı magnetlerinizle yer edinirken, paket servis gücünüzü destekleyecek tamamlayıcı baskı çözümleri:",
      bullets: [
        "Dolap kapaklarında 7/24 kesintisiz marka varlığı: Farklı ebat ve kalınlık alternatiflerine sahip, parlak selefon kaplamalı, kaymaz Magnet çeşitleri.",
        "Poşetlerin içine yerleştirilecek lezzetli menüler: Müşterilerinizin kolayca inceleyeceği kaliteli A5 veya A4 boyutlarında dikey El İlanı ve Broşürler.",
        "Masalarda ve paket tepsilerinde hijyenik lüks duruş: Koku yapmayan gıda mürekkepleriyle basılan tek kullanımlık Amerikan servis çeşitleri."
      ],
      products: [
        { name: "Magnet Baskı", desc: "Oval & Özel Figürlü Magnet", reason: "Mutfaklarda ve dolap kapaklarında 7/24 görünür kalarak akla ilk gelen olun.", path: "/magnet", img: "/images/magnet/oval-kesimli-magnet.webp", alt: "Magnet Baskısı", title: "Reklam Magnet Baskısı" },
        { name: "El İlanı Baskı", desc: "Canlı Renkli Paket El İlanı", reason: "Hızlı sokak dağıtımları ve posta kutusu reklamları için bütçe dostu tanıtım.", path: "/el-ilani", img: "/images/el-ilani/el-ilani-tasarimi.webp", alt: "El İlanı Baskısı", title: "Paket Servis El İlanı" },
        { name: "Broşür Baskı", desc: "Katlamalı Menü Broşürleri", reason: "Paket servislerde tüm lezzet yelpazenizi detaylıca tanıtmak için tercih edin.", path: "/brosur", img: "/images/brosur/brosur-tasarimi-ve-baski.webp", alt: "Broşür Baskısı", title: "Katlamalı Broşür Menü" },
        { name: "Amerikan Servis", desc: "Logolu Hijyenik Kağıt Servis", reason: "Restoran ve kafelerin masa düzeninde kurumsal sunumu destekleyen baskılı servis seçenekleri.", path: "/amerikan-servis", img: "/images/amerikan-servis/restoran-amerikan-servis.webp", alt: "Amerikan Servis Baskısı", title: "Kağıt Amerikan Servis" },
        { name: "Karton Çanta", desc: "Lüks Paketleme Çantaları", reason: "Paket servislerde ürün sunumunu ve taşıma düzenini destekleyen baskılı karton çanta seçenekleri.", path: "/karton-canta", img: "/images/dosya/karton-canta-tasarimi.webp", alt: "Karton Çanta Baskısı", title: "Paket Servis Karton Çantası" }
      ]
    };
  }

  // 5b. Paket Servis / Promosyon
  if (
    normSlug.includes('paket-servis') || 
    normSlug.includes('promosyon') || 
    normSlug.includes('ayrac') || 
    normSlug.includes('yag-karti')
  ) {
    return {
      introTitle: "Müşterilerinizin Elinin Altından Düşmeyecek Promosyon Çözümleri",
      introDesc: "Buzdolaplarında, araç dikiz aynalarında veya kitap aralarında markanızı her an hatırlatacak, her gün yüzlerce kez görünürlük sağlayan kalıcı reklam ürünleri:",
      bullets: [
        "Evlerde ve mutfaklarda 7/24 kesintisiz görünürlük: Paket servis yapan lokanta, su istasyonu ve eczaneler için oval kesimli kaliteli Magnet çeşitleri.",
        "Oto servisleri ve oto yıkama merkezlerinin vazgeçilmezi: Araç bakım süreçlerini takip eden özel tasarım kalın oto Yağ Kartları ve Kraft Oto Paspaslar.",
        "Okurlar ve öğrenciler için şık ve kullanışlı hediyeler: Kitapçılar ve eğitim kurumları için lüks selefonlu ve püsküllü Kitap Ayraçları."
      ],
      products: [
        { name: "Magnet Baskı", desc: "Oval Kesimli Buzdolabı Magneti", path: "/magnet", img: "/images/magnet/oval-kesimli-magnet.webp", alt: "Magnet Baskısı", title: "Reklam Magnet Baskısı" },
        { name: "Yağ Kartı Baskısı", desc: "Oto Servis Takip Kartları", path: "/yag-karti", img: "/images/sozlesme/yag-karti-baskisi.webp", alt: "Yağ Kartı Baskısı", title: "Oto Servis Yağ Değişim Kartı" },
        { name: "Kitap Ayracı", desc: "Özel Tasarım Kitap Ayraçları", path: "/kitap-ayraci", img: "/images/sozlesme/kitap-ayraci-tasarimi.webp", alt: "Kitap Ayracı Baskısı", title: "Promosyon Kitap Ayracı Baskısı" },
        { name: "Oto Paspas", desc: "Emici Kraft Kağıt Paspaslar", path: "/oto-paspas", img: "/images/makbuz/kraft-oto-paspas-baskisi.webp", alt: "Oto Paspas Baskısı", title: "Baskılı Kraft Kağıt Oto Paspası" },
        { name: "Küp Bloknot", desc: "Kutulu Promosyon Bloknotlar", path: "/kup-bloknot", img: "/images/sozlesme/bloknot-baskisi.webp", alt: "Küp Bloknot Baskısı", title: "Logolu Kutulu Küp Bloknot" }
      ]
    };
  }

  // 6. Etiket / Kutu / Ambalaj
  if (
    normSlug.includes('etiket') || 
    normSlug.includes('kutu') || 
    normSlug.includes('ambalaj') || 
    normSlug.includes('canta') || 
    normCategory.includes('kutu') || 
    normCategory.includes('etiket') || 
    normCategory.includes('ambalaj')
  ) {
    return {
      introTitle: "Ürün Paketleme ve Gönderim Süreçlerinizi Kusursuz Kılan Baskılar",
      introDesc: "E-ticaret veya mağaza teslimatlarında ürünlerinizi darbelere, neme ve yıpranmaya karşı korurken lüks bir kutu açılışı (unboxing) deneyimi sunan paketleme çözümleri:",
      bullets: [
        "Cam, plastik veya karton ambalajların üzerine tam yapışma: Neme ve yırtılmaya dayanıklı plastik bazlı PP opak veya kağıt bazlı özel kesim kuşe Etiketler.",
        "Ürün koruması ve lüks sunum bir arada: Firmanızın logosuyla basılmış, darbelere mukavemetli gıda kutuları veya e-ticaret kargo Kutuları.",
        "Mağazalarda ve sokaklarda yürüyen markanız: Lüks krome kartondan üretilen, pamuk ipli taşıma saplı dayanıklı Karton Çantalar."
      ],
      products: [
        { name: "Etiket Baskı", desc: "Rulo ve Tabaka Opak Etiket", path: "/etiket", img: "/images/sozlesme/tabaka-opak-etiket-baskisi.webp", alt: "Etiket Baskısı", title: "Yapışkanlı Rulo ve Tabaka Etiket" },
        { name: "Kutu Baskı", desc: "Özel Ölçülü Karton ve Kraft Kutular", path: "/kutu", img: "/images/dosya/kutu-baskisi.webp", alt: "Kutu Baskısı", title: "Özel Kesim Karton Kutu İmalatı" },
        { name: "Ambalaj Baskı", desc: "Sargılık Kağıt ve Esnek Ambalajlar", path: "/ambalaj", img: "/images/dosya/ambalaj-baskisi.webp", alt: "Ambalaj Baskısı", title: "Baskılı Sarım Kağıtları ve Ambalaj" },
        { name: "Karton Çanta", desc: "Lüks İpli Mağaza Çantaları", path: "/karton-canta", img: "/images/dosya/karton-canta-tasarimi.webp", alt: "Karton Çanta Baskısı", title: "Kurumsal Karton Çanta Baskısı" },
        { name: "Oluklu Koli", desc: "Dayanıklı Kargo Kolileri", path: "/kutu", img: "/images/dosya/kutu-baskisi.webp", alt: "Oluklu Koli Baskısı", title: "Baskılı Oluklu Kargo Kolisi" }
      ]
    };
  }

  // Default: General corporate products
  return {
    introTitle: "Sipariş Verebileceğiniz Diğer Popüler Matbaa Ürünlerimiz",
    introDesc: "Mavi Basım olarak kurumsal kimliğinizi güçlendirecek ve tanıtım bütçelerinizi koruyacak, son teknoloji Heidelberg ofset makinelerimizde basılan en kaliteli baskı çözümleri:",
    bullets: [
      "Kurumsal iletişimde prestij kazandıran çözümler: Lüks laklı ve selefonlu Kartvizit ile Cepli Sunum Dosyaları.",
      "Kampanya ve sokak dağıtımlarında doğrudan dönüş alan tasarımlar: Canlı renk geçişlerine sahip Broşür ve El İlanı baskıları.",
      "Markanızın her an göz önünde kalmasını sağlayan pratik reklamlar: oval kesimli Magnet ve logolu Küp Bloknot setleri."
    ],
    products: [
      { name: "Kartvizit", desc: "Premium Kartvizitler", path: "/kartvizit", img: "/images/kartvizit/premium-kartvizit-baskisi.webp", alt: "Premium Kartvizit Baskısı", title: "Lüks Kartvizit Baskısı" },
      { name: "Tanıtım Broşürü", desc: "Lüks ve Ekonomik Çözümler", path: "/brosur", img: "/images/brosur/brosur-baskisi.webp", alt: "Tanıtım Broşürü", title: "Tanıtım Broşürü" },
      { name: "Magnet Baskı", desc: "Buzdolabı Magnetleri", path: "/magnet", img: "/images/magnet/oval-kesimli-magnet.webp", alt: "Magnet Baskısı", title: "Mutfak Magnet Baskısı" },
      { name: "Cepli Dosya", desc: "Sunum Dosyaları", path: "/dosyalar", img: "/images/dosya/cepli-dosya-baskisi.webp", alt: "Cepli Dosya Baskısı", title: "Kurumsal Cepli Dosya" },
      { name: "Tahsilat Makbuzu", desc: "Karbonlu Para Makbuzu", path: "/tahsilat-makbuzu", img: "/images/tahsilat-makbuzu/tahsilat-makbuzu-baskisi.webp", alt: "Tahsilat Makbuzu Baskısı", title: "Otokopili Tahsilat Makbuzu" }
    ]
  };
};

export const BlogPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const activePost = useMemo(() => {
    if (!slug) return null;
    // 1. Direct match
    const direct = BLOG_POSTS.find(p => p.slug === slug);
    if (direct) return direct;

    // 2. Slug alias normalization / dictionary mapping
    const normalizedSlug = slug.toLowerCase().trim()
      .replace(/[.]/g, '-')
      .replace(/_+/g, '-');

    const aliases: Record<string, string> = {
      'ofset-baski-ile-dijital-baski-farki': 'ofset-baski-ile-dijital-baski-farklari',
      'antetli-kagit-baskisinda-80gr-1-hamur': 'antetli-kagit-baskisinda-80gr-1.hamur',
      'antetli-kagit-baskisinda-80gr-1': 'antetli-kagit-baskisinda-80gr-1.hamur',
      'antetli-kagit-baskisi': 'antetli-kagit-baskisinda-80gr-1.hamur',
      'kuve-kagit-ve-bristol-farklari': 'kuve-kagit-ve-bristol-karton-farklari',
      'kuse-kagit-ve-bristol-karton-farklari': 'kuve-kagit-ve-bristol-karton-farklari',
      'kuse-kagit-nedir': 'kuve-kagit-ve-bristol-karton-farklari',
      'brosur-kagit-secimi': 'brosur-baskida-en-dogru-kagit-nasil-secilir',
      'el-ilani-baskisi': 'el-ilani-dagitimi-ise-yariyor-mu',
      'magnet-baskisi': 'magnet-baski-musteri-kazandirir-mi',
      'kartvizit-baskisi': 'kartvizitte-mat-mi-parlak-mi',
    };

    if (aliases[slug]) {
      const aliasTarget = BLOG_POSTS.find(p => p.slug === aliases[slug]);
      if (aliasTarget) return aliasTarget;
    }

    if (aliases[normalizedSlug]) {
      const aliasTarget = BLOG_POSTS.find(p => p.slug === aliases[normalizedSlug]);
      if (aliasTarget) return aliasTarget;
    }

    // 3. Fallback normalized search
    const matchedNorm = BLOG_POSTS.find(p => {
      const pNorm = p.slug.toLowerCase().replace(/[.]/g, '-');
      return pNorm === normalizedSlug || pNorm.startsWith(normalizedSlug) || normalizedSlug.startsWith(pNorm);
    });
    if (matchedNorm) return matchedNorm;

    return null;
  }, [slug]);

  const relatedData = useMemo(() => {
    return getRelatedProducts(activePost?.slug || '', activePost?.category || '');
  }, [activePost]);

  // Compute headings for the Table of Contents dynamically
  const headings = useMemo(() => {
    if (!activePost) return [];
    const lines = activePost.content.split('\n');
    const list: { text: string; id: string; level: number }[] = [];
    lines.forEach(line => {
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '').trim();
        const id = text.toLowerCase()
          .replace(/[ığüşöçİĞÜŞÖÇ]/g, (char) => {
            const map: { [key: string]: string } = {
              'ı': 'i', 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c',
              'İ': 'i', 'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'Ö': 'o', 'Ç': 'c'
            };
            return map[char] || char;
          })
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-');
        list.push({ text, id, level: 2 });
      }
    });
    return list;
  }, [activePost]);

  // Handle hash scrolling on page load/mount
  React.useEffect(() => {
    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.substring(1));
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, [activePost]);

  // Handle case where custom subpage route matches but blog is not found
  if (slug && !activePost) {
    const popularPosts = BLOG_POSTS.slice(0, 3);
    return (
      <div className="bg-slate-50 min-h-screen py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full inline-block mb-3">
            Matbaa Akademisi
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">Blog Yazısı Bulunamadı</h1>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Aradığınız makale yayından kaldırılmış veya bağlantı adresi güncellenmiş olabilir. Aşağıdaki popüler rehberlere göz atabilir veya ana blog dizinine dönebilirsiniz.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Link to="/blog" className="px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-slate-900 transition-colors flex items-center gap-2 shadow-sm">
              <ArrowLeft size={18} /> Tüm Blog Yazılarını İncele
            </Link>
            <Link to="/" className="px-6 py-3 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors">
              Ana Sayfaya Dön
            </Link>
          </div>

          <div className="text-left bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight mb-4">
              Önerilen Popüler Matbaa Rehberleri
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {popularPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-primary/5 border border-slate-100 hover:border-primary/30 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                      {post.category}
                    </span>
                    <h3 className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 mt-3 block group-hover:text-primary">
                    Devamını Oku →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activePost) {
    const displayTitle = activePost.title.length + 13 <= 65
      ? `${activePost.title} - Mavi Basım`
      : activePost.title.substring(0, 49) + "... - Mavi Basım";
    const displayDesc = activePost.excerpt.length > 155
      ? activePost.excerpt.substring(0, 152) + "..."
      : activePost.excerpt;

    // Generate dynamic structured JSON-LD schemas
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": activePost.schemaType || "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://mavibasim.com/blog/${activePost.slug}`
        },
        "headline": activePost.title,
        "image": `https://mavibasim.com${activePost.image}`,
        "datePublished": "2026-06-04T08:00:00+03:00",
        "dateModified": "2026-07-06T10:00:00+03:00",
        "author": {
          "@type": "Organization",
          "name": "Mavi Basım Üretim Ekibi",
          "url": "https://mavibasim.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Mavi Basım",
          "logo": {
            "@type": "ImageObject",
            "url": "https://mavibasim.com/mavilogo.png"
          }
        },
        "description": activePost.excerpt
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Anasayfa",
            "item": "https://mavibasim.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://mavibasim.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": activePost.category,
            "item": `https://mavibasim.com/blog?category=${encodeURIComponent(activePost.category)}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": activePost.title,
            "item": `https://mavibasim.com/blog/${activePost.slug}`
          }
        ]
      },
      activePost.faq && activePost.faq.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": activePost.faq.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      } : null,
      {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "contentUrl": `https://mavibasim.com${activePost.image}`,
        "license": "https://mavibasim.com/lisans",
        "acquireLicensePage": `https://mavibasim.com/blog/${activePost.slug}`,
        "creditText": "Mavi Basım Tasarım Ekibi",
        "creator": {
          "@type": "Organization",
          "name": "Mavi Basım"
        }
      },
      activePost.slug === 'emlak-yer-gosterme-belgesi-nedir' ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Emlak Yer Gösterme Belgesi Nasıl Doldurulur?",
        "description": "Emlak ve gayrimenkul ziyaret formunun yasalara uygun, eksiksiz doldurulma adımları.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Firma Bilgilerini Doldurun",
            "text": "İlk olarak aracı emlak ofisinin ticari unvanı, iletişim bilgileri, vergi dairesi/numarası ve Taşınmaz Ticareti Yetki Belgesi numarası forma eksiksiz işlenmelidir."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Müşteri Bilgilerini İşleyin",
            "text": "Hizmeti alan potansiyel alıcı veya kiracının adı, soyadı, T.C. kimlik numarası, güncel cep telefonu numarası ve ev/iş adresi girilmelidir."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Taşınmaz Bilgilerini Girin",
            "text": "Gösterimi yapılan mülkün tam adresi, tapu bilgileri (il, ilçe, mahalle, ada, parsel, blok ve daire numarası) ile mülkün cinsi forma açıkça yazılmalıdır."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Karşılıklı Islak İmza Alın",
            "text": "Formun alt kısmında yer alan alanlara her iki tarafın da el yazısıyla ad-soyad yazarak ıslak imza atması zorunludur. Tarih ve tam saat girilmelidir."
          }
        ]
      } : null,
      activePost.slug === 'magnet-baski-musteri-kazandirir-mi' ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "5 Adımda Magnet Sipariş Akışı",
        "description": "Buzdolabında 7/24 kalıcı olacak reklam magnetinizin tasarım onayından kapınıza teslimine kadar geçen üretim adımları.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Adet ve Özellik Seçimi",
            "text": "Mıknatıs kalınlığı, ebat ve kesim şekli (düz veya özel figürlü) belirlenerek sipariş detayları netleştirilir."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Grafik Tasarım Hazırlığı",
            "text": "Logo ve iletişim bilgileri grafik ekibimize ulaştırılır; tasarımınız ve kesim çizgileriniz profesyonelce hazırlanır."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Ücretsiz Dijital PDF Prova Onayı",
            "text": "Baskı öncesinde hazırlanan şablon dijital onayınıza sunulur; siz onaylamadan baskıya geçilmez."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Ofset Baskı ve Şekilli Kesim",
            "text": "Lamine edilen korumalı kuşe kağıtlar ferrit mıknatısa sıvanır ve özel bıçaklarla pürüzsüzce kesilir."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Paketleme ve Kargo ile Sevk",
            "text": "Çift oluklu Kraft kolilerde özenle paketlenen ağır magnetler Türkiye'nin 81 iline indirimli kargo ile sevk edilir."
          }
        ]
      } : null,
      activePost.slug === 'brosur-baskida-en-dogru-kagit-nasil-secilir' ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Broşür Baskısı İçin Dosya Nasıl Hazırlanır?",
        "description": "Broşür baskısından en yüksek kaliteyi alabilmek için tasarım dosyasının matbaa standartlarına uygun hazırlanması adımları.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "CMYK Renk Modunda Çalışın",
            "text": "Baskıda renk doğruluğu için tasarımınızı mutlaka CMYK renk modunda hazırlamalısınız."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Yüksek Çözünürlüklü Görseller Kullanın",
            "text": "Baskıda pürüzsüz sonuçlar almak için tüm fotoğrafları ve grafikleri en az 300 DPI çözünürlükte kullanın."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Kenar Taşma Payı Bırakın",
            "text": "Kesim esnasında beyaz boşluklar kalmaması için her kenardan en az 3 mm taşma payı (bleed) bırakın."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Yazıları Güvenli Alana Alın",
            "text": "Telefon, logo gibi kritik bilgileri kesim çizgisinden en az 5 mm içeride (güvenli alan) tutun."
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Fontları Çizin (Convert/Outline)",
            "text": "Yazı tiplerinin bozulmaması için tüm metinleri eğriye (outlines/curves) çevirin."
          },
          {
            "@type": "HowToStep",
            "position": 6,
            "name": "Yüksek Kalite PDF/X Olarak Kaydedin",
            "text": "Sayfa düzeninin bozulmaması için baskı dosyasını PDF/X formatında kaydedin."
          }
        ]
      } : null
    ];

    const filteredSchemas = schemas.filter(Boolean);

    // Render Detail View
    return (
      <div className="bg-neutral-50 min-h-screen pb-24">
        <Helmet>
          <title>{displayTitle}</title>
          <meta name="description" content={displayDesc} />
          <meta property="og:title" content={displayTitle} />
          <meta property="og:description" content={displayDesc} />
          <meta property="og:type" content="article" />
          <meta property="og:image" content={activePost.image ? (activePost.image.startsWith('http') ? activePost.image : `https://mavibasim.com${activePost.image}`) : "https://mavibasim.com/mavilogo.png"} />
          {filteredSchemas.map((sch, i) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify(sch)}
            </script>
          ))}
        </Helmet>

        {/* Hero Section */}
        <div className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Elegant Breadcrumbs */}
            <nav className="flex flex-wrap items-center gap-2 text-gray-400 text-xs font-bold mb-6 overflow-x-auto whitespace-nowrap py-1">
              <Link to="/" className="hover:text-primary transition-colors">Anasayfa</Link>
              <ChevronRight size={12} className="shrink-0 text-gray-600" />
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <ChevronRight size={12} className="shrink-0 text-gray-600" />
              <span className="text-gray-500">{activePost.category}</span>
              <ChevronRight size={12} className="shrink-0 text-gray-600" />
              <span className="text-primary truncate max-w-xs">{activePost.title}</span>
            </nav>

            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider mb-4">
              {activePost.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">
              {activePost.title}
            </h1>
            {activePost.slug === 'emlak-yer-gosterme-belgesi-nedir' ? (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-300 text-xs sm:text-sm font-semibold border-t border-neutral-800 pt-4 mt-2">
                <span className="flex items-center gap-2">
                  <User size={16} className="text-primary" /> 
                  <span>Yazar: <strong>Mavi Basım Matbaa Uzmanları</strong></span>
                  <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-black rounded border border-emerald-500/30">✓ DOĞRULANMIŞ UZMAN</span>
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" /> 
                  <span>{activePost.readTime}</span>
                </span>
                <span className="text-gray-400">İlk Yayın: <strong>04 Haziran 2026</strong></span>
                <span className="text-gray-400">Son Güncelleme: <strong>06 Temmuz 2026</strong></span>
                <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-black rounded border border-primary/30">YASAL MEVZUAT UYUMLU</span>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
                <span className="flex items-center gap-2"><User size={16} className="text-primary" /> Mavi Basım Matbaa Baskı Ekibi</span>
                <span className="flex items-center gap-2"><Clock size={16} className="text-primary" /> {activePost.readTime}</span>
                <span>Yayınlanma: {activePost.date}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 md:p-12 rounded-[2rem] border border-gray-150/80 shadow-md">
            {/* Featured Image */}
            {activePost.image && (
              <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden mb-8 shadow-md border border-gray-100">
                <img 
                  src={activePost.image} 
                  alt={activePost.title} 
                  className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
            )}



            {/* Avantajlar Kutusu */}
            {activePost.slug === 'emlak-yer-gosterme-belgesi-nedir' && (
              <div className="bg-primary/[0.03] p-6 sm:p-8 rounded-3xl border border-primary/15 shadow-sm mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    'Ücretsiz Grafik Tasarım Desteği',
                    'PDF Prova Onayı',
                    'Logolu ve Numaratörlü Baskı',
                    'A4, A5 ve Özel Ölçü Üretimi',
                    'Türkiye Geneli Hızlı Kargo',
                    'Uygun Fiyat Teklifi'
                  ].map((item, key) => (
                    <div key={key} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-150 shadow-xs hover:border-primary/20 transition-all duration-200">
                      <span className="text-emerald-500 shrink-0 text-lg font-black">✓</span>
                      <span className="text-xs sm:text-sm text-gray-700 font-bold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ⭐ Hızlı Cevap Bloğu (Quick Answer Box for Featured Snippets) */}
            {activePost.slug === 'emlak-yer-gosterme-belgesi-nedir' && (
              <>
                <div className="bg-amber-50/60 p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-xs mb-6">
                  <h4 className="text-base font-black text-amber-950 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-amber-500 rounded"></span>
                    ⭐ Yer Gösterme Belgesi Kısaca
                  </h4>
                  <p className="text-sm sm:text-base text-gray-800 font-semibold leading-relaxed">
                    Yer gösterme belgesi, emlak danışmanının müşteriye gösterdiği taşınmazı kayıt altına alan ve hizmetin verildiğini belgeleyen yazılı evraktır. Satış ve kiralama işlemlerinde kullanılır. Tarafların imzasıyla düzenlenir ve olası komisyon uyuşmazlıklarında önemli yazılı delillerden biri olarak değerlendirilebilir.
                  </p>
                </div>

                <div className="bg-blue-50/60 p-6 sm:p-8 rounded-3xl border border-blue-200/80 shadow-xs mb-10 animate-fade-in">
                  <h4 className="text-base font-black text-blue-950 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-blue-500 rounded"></span>
                    📌 Yer Gösterme Belgesi Kısa Bilgiler
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-800 font-bold">
                    <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-blue-100">
                      <span className="text-emerald-500 font-black">✓</span>
                      <span>Kullanım Alanı: Satılık ve kiralık taşınmaz gösterimleri</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-blue-100">
                      <span className="text-emerald-500 font-black">✓</span>
                      <span>Standart Ölçü: A5 (isteğe bağlı A4)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-blue-100">
                      <span className="text-emerald-500 font-black">✓</span>
                      <span>Baskı Türü: Otokopili NCR</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-blue-100">
                      <span className="text-emerald-500 font-black">✓</span>
                      <span>Nüsha Sayısı: 2 veya 3 nüsha</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-blue-100">
                      <span className="text-emerald-500 font-black">✓</span>
                      <span>Seri Numarası: Numaratörlü</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/60 p-2.5 rounded-xl border border-blue-100">
                      <span className="text-emerald-500 font-black">✓</span>
                      <span>Teslimat: Türkiye Geneli Kargo</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Bu Rehberde Neler Bulacaksınız? (What you will learn) */}
            {activePost.slug === 'emlak-yer-gosterme-belgesi-nedir' && (
              <div className="bg-neutral-50/80 p-6 sm:p-8 rounded-3xl border border-gray-250/80 shadow-xs mb-10">
                <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-primary rounded"></span>
                  Bu Rehberde Neler Bulacaksınız?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Yer gösterme belgesi nedir ve kimler kullanır?',
                    'Nasıl doldurulur ve yasal geçerlilik şartları nelerdir?',
                    'Baskı seçenekleri, kağıt özellikleri ve ebat alternatifleri',
                    'Numaratör ve otokopili NCR baskı teknolojisinin önemi',
                    'Sözleşme fiyatları, sipariş ve matbaa üretim süreçleri',
                    'Mevzuat standartları ve yasal dayanaklar'
                  ].map((item, key) => (
                    <div key={key} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-gray-700">
                      <span className="text-primary shrink-0 text-base font-black">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Table of Contents (İçindekiler) - EEAT & Google SEO Friendly anchor navigation */}
            {headings.length > 0 && (
              <div className="bg-neutral-50/80 p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm mb-10">
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded"></span>
                  İçindekiler
                </h3>
                {activePost.slug === 'emlak-yer-gosterme-belgesi-nedir' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      {
                        title: "Yer Gösterme Belgesi",
                        items: [
                          { text: "Nedir?", id: "yer-gosterme-belgesi-nedir" },
                          { text: "Nereden Alınır?", id: "yer-gosterme-belgesi-nereden-alinir" },
                          { text: "Kim Kullanır?", id: "yer-gosterme-belgesini-kimler-kullanir" },
                          { text: "Nerelerde Kullanılır?", id: "yer-gosterme-belgesi-nerelerde-kullanilir" }
                        ]
                      },
                      {
                        title: "Örnekler",
                        items: [
                          { text: "Yer Gösterme Belgesi Örneği", id: "yer-gosterme-belgesi-ornegi-ve-bos-sablon" },
                          { text: "PDF Örneği", id: "yer-gosterme-belgesi-pdf-ornegi" },
                          { text: "Word Örneği", id: "yer-gosterme-belgesi-word-ornegi" },
                          { text: "Excel Örneği", id: "yer-gosterme-belgesi-excel-ornegi" }
                        ]
                      },
                      {
                        title: "Kullanım Rehberi",
                        items: [
                          { text: "Nasıl Hazırlanır?", id: "yer-gosterme-belgesi-nasil-hazirlanir" },
                          { text: "Nasıl Doldurulur?", id: "yer-gosterme-belgesi-nasil-doldurulur" },
                          { text: "Kaç Nüsha Olmalı?", id: "yer-gosterme-belgesi-kac-nusha-olmali" },
                          { text: "Zorunlu mu?", id: "yer-gosterme-belgesi-zorunlu-mu" }
                        ]
                      },
                      {
                        title: "Baskı Bilgileri",
                        items: [
                          { text: "Teknik Özellikler", id: "teknik-ozellikler" },
                          { text: "Baskı Fiyatları", id: "yer-gosterme-belgesi-baski-fiyatlari" },
                          { text: "Sipariş Süreci", id: "siparis-adimlari" }
                        ]
                      }
                    ].map((group, gIdx) => (
                      <div key={gIdx} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs">
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider mb-3 pb-1 border-b border-gray-100 flex items-center gap-2">
                          <span className="w-1 h-3 bg-primary rounded"></span>
                          {group.title}
                        </h4>
                        <div className="space-y-2">
                          {group.items.map((item, iIdx) => (
                            <a
                              key={iIdx}
                              href={`#${item.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById(item.id);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  window.history.pushState(null, '', `#${item.id}`);
                                }
                              }}
                              className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-primary flex items-start gap-1.5 transition-colors"
                            >
                              <span className="text-primary shrink-0 mt-1">◦</span>
                              <span>{item.text}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {headings.map((h, i) => (
                      <a 
                        key={i} 
                        href={`#${h.id}`} 
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.getElementById(h.id);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            window.history.pushState(null, '', `#${h.id}`);
                          }
                        }}
                        className={`text-xs sm:text-sm font-bold transition-all duration-200 hover:text-primary flex items-start gap-2 ${
                          h.level === 3 ? 'pl-4 text-gray-500 hover:pl-5' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-primary shrink-0 mt-1">
                          {h.level === 3 ? '◦' : '•'}
                        </span>
                        <span>{h.text}</span>
                      </a>
                    ))}
                  </nav>
                )}
              </div>
            )}

            {/* Bilmeniz Gerekenler (Summary Box - Özet Kutusu within the first 20%) */}
            {activePost.slug === 'emlak-yer-gosterme-belgesi-nedir' && (
              <div className="bg-emerald-50/50 p-6 sm:p-8 rounded-3xl border border-emerald-150/80 shadow-sm mb-10">
                <h4 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-emerald-500 rounded"></span>
                  Bilmeniz Gereken Önemli Noktalar
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Satış ve Kiralamada Kullanılır', desc: 'Sadece satış değil, kiralama işlemlerinde de mülk sunumu öncesinde imzalanması kanuni bir yükümlülüktür.' },
                    { title: 'Islak İmza Alınmalıdır', desc: 'Olası uyuşmazlıklarda imza inkarlarının önüne geçmek ve tarafları güvenceye almak için ıslak imza alınmalıdır.' },
                    { title: 'En Çok A5 Ebat Basılır', desc: 'Saha çalışmalarında kolay taşınabilmesi amacıyla A5 ebatlı koçanlar en pratik çözümü sunar.' },
                    { title: 'Otokopili NCR Tercih Edilir', desc: 'Kendinden karbonlu NCR kağıt teknolojisi sayesinde üst nüshaya yazılanlar alt nüshalara pürüzsüzce geçer.' },
                    { title: '2 veya 3 Nüsha Seçeneği', desc: 'Butik ofisler için 2 nüsha (asıl + müşteri) yeterliyken, şubeli yapılarda 3 nüsha (asıl + danışman + müşteri) tercih edilir.' },
                    { title: 'Seri Numaratörlü Takip', desc: 'Her belgenin sağ üstünde yer alan benzersiz ardışık seri numarası, geriye dönük evrak takibini güvenli hale getirir.' }
                  ].map((item, key) => (
                    <div key={key} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-emerald-100 shadow-xs">
                      <span className="text-emerald-500 shrink-0 text-lg font-black mt-0.5">✓</span>
                      <div>
                        <h5 className="text-xs sm:text-sm font-black text-slate-900 mb-1">{item.title}</h5>
                        <p className="text-[11px] sm:text-xs text-gray-600 font-semibold leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="prose prose-lg max-w-none text-neutral-800 space-y-6">
              {activePost.content.split('\n\n').map((pRaw, index) => {
                const paragraph = pRaw.trim();
                if (!paragraph) return null;
                if (paragraph.startsWith('## ')) {
                  const text = paragraph.replace('## ', '').trim();
                  const id = text.toLowerCase()
                    .replace(/[ığüşöçİĞÜŞÖÇ]/g, (char) => {
                      const map: { [key: string]: string } = {
                        'ı': 'i', 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c',
                        'İ': 'i', 'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'Ö': 'o', 'Ç': 'c'
                      };
                      return map[char] || char;
                    })
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-');
                  return (
                    <h2 key={index} id={id} className="text-lg sm:text-xl font-semibold text-slate-800 pt-5 pb-2 border-b border-gray-100 tracking-tight scroll-mt-20">
                      {text}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  const text = paragraph.replace('### ', '').trim();
                  const id = text.toLowerCase()
                    .replace(/[ığüşöçİĞÜŞÖÇ]/g, (char) => {
                      const map: { [key: string]: string } = {
                        'ı': 'i', 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c',
                        'İ': 'i', 'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'Ö': 'o', 'Ç': 'c'
                      };
                      return map[char] || char;
                    })
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-');
                  return (
                    <h3 key={index} id={id} className="text-base sm:text-lg font-semibold text-slate-800 pt-4 pb-1 scroll-mt-20">
                      {text}
                    </h3>
                  );
                }
                if (paragraph.startsWith('#### ')) {
                  const text = paragraph.replace('#### ', '').trim();
                  const id = text.toLowerCase()
                    .replace(/[ığüşöçİĞÜŞÖÇ]/g, (char) => {
                      const map: { [key: string]: string } = {
                        'ı': 'i', 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c',
                        'İ': 'i', 'Ğ': 'g', 'Ü': 'u', 'Ş': 's', 'Ö': 'o', 'Ç': 'c'
                      };
                      return map[char] || char;
                    })
                    .replace(/[^a-z0-9\s-]/g, '')
                    .replace(/\s+/g, '-');
                  return (
                    <h4 key={index} id={id} className="text-sm sm:text-base font-medium text-slate-800 pt-3 pb-1 scroll-mt-20">
                      {text}
                    </h4>
                  );
                }
                if (paragraph.startsWith(':::product-card')) {
                  const contentWithoutContainer = paragraph.replace(':::product-card\n', '').replace('\n:::', '');
                  const lines = contentWithoutContainer.split('\n').filter(Boolean);
                  
                  const imageLine = lines.find(l => l.includes('IMAGE:'));
                  const nameLine = lines.find(l => l.includes('NAME:'));
                  const minOrderLine = lines.find(l => l.includes('MIN_ORDER:'));
                  const linkLine = lines.find(l => l.includes('LINK:'));

                  const image = imageLine ? imageLine.replace('IMAGE:', '').trim() : '';
                  const name = nameLine ? nameLine.replace('NAME:', '').trim() : '';
                  const minOrder = minOrderLine ? minOrderLine.replace('MIN_ORDER:', '').trim() : '';
                  const link = linkLine ? linkLine.replace('LINK:', '').trim() : '';
                  const isImageAvailable = Boolean(image && (BLOG_IMAGE_MANIFEST as Record<string, boolean>)[image]);

                  return (
                    <div key={index} className="my-8 flex justify-center">
                      <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group text-center p-4">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 mb-4 flex flex-col items-center justify-center">
                          {isImageAvailable ? (
                            <img 
                              src={image} 
                              alt={name} 
                              title={name} 
                              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" 
                              referrerPolicy="no-referrer" 
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-slate-50 border border-slate-100">
                              <span className="text-xs font-black text-slate-700 mb-1">{name}</span>
                              <span className="text-[10px] font-bold text-gray-400">Ürün görseli hazırlanıyor</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-black text-slate-800 leading-snug group-hover:text-primary transition-colors mb-1">{name}</h4>
                            <p className="text-[11px] text-gray-400 font-bold mb-4">Minimum Sipariş: {minOrder}</p>
                          </div>
                          <Link 
                            to={link} 
                            className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-neutral-950 hover:bg-primary text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xs transition-all duration-300 cursor-pointer"
                          >
                            Ürünü İncele <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith(':::cta')) {
                  const contentWithoutContainer = paragraph.replace(':::cta\n', '').replace('\n:::', '');
                  const lines = contentWithoutContainer.split('\n').filter(Boolean);
                  
                  const titleLine = lines.find(l => l.includes('TITLE:'));
                  const descLine = lines.find(l => l.includes('DESC:'));
                  const btnTextLine = lines.find(l => l.includes('BTN_TEXT:'));
                  const btnLinkLine = lines.find(l => l.includes('BTN_LINK:'));
                  const btnText2Line = lines.find(l => l.includes('BTN_TEXT_2:'));
                  const btnLink2Line = lines.find(l => l.includes('BTN_LINK_2:'));

                  const title = titleLine ? titleLine.replace('TITLE:', '').trim() : 'Hemen Sipariş Verin';
                  const desc = descLine ? descLine.replace('DESC:', '').trim() : '';
                  const btnText = btnTextLine ? btnTextLine.replace('BTN_TEXT:', '').trim() : 'WhatsApp İle Teklif Al';
                  const btnLink = btnLinkLine ? btnLinkLine.replace('BTN_LINK:', '').trim() : WHATSAPP_LINK;
                  const btnText2 = btnText2Line ? btnText2Line.replace('BTN_TEXT_2:', '').trim() : '';
                  const btnLink2 = btnLink2Line ? btnLink2Line.replace('BTN_LINK_2:', '').trim() : '';

                  return (
                    <div key={index} className="my-8 bg-gradient-to-br from-neutral-900 via-slate-950 to-neutral-900 text-white p-6 sm:p-8 rounded-3xl border border-neutral-800 shadow-md relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/15 transition-all"></div>
                      <div className="relative z-10 flex flex-col gap-6">
                        <div className="text-left flex-1">
                          <h4 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white mb-2">{title}</h4>
                          <p className="text-xs sm:text-sm text-gray-300 font-semibold max-w-4xl leading-relaxed">{desc}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                          {btnLink.startsWith('/') ? (
                            <Link 
                              to={btnLink} 
                              className="w-full sm:w-auto px-6 py-3.5 bg-primary hover:bg-white text-white hover:text-black text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-md transition-all text-center cursor-pointer"
                            >
                              {btnText}
                            </Link>
                          ) : (
                            <a 
                              href={btnLink} 
                              target={btnLink.startsWith('http') ? '_blank' : undefined}
                              rel={btnLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="w-full sm:w-auto px-6 py-3.5 bg-primary hover:bg-white text-white hover:text-black text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-md transition-all text-center cursor-pointer"
                            >
                              {btnText}
                            </a>
                          )}
                          {btnText2 && (
                            btnLink2.startsWith('/') ? (
                              <Link 
                                to={btnLink2} 
                                className="w-full sm:w-auto px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white hover:text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-sm border border-neutral-700 transition-all text-center cursor-pointer"
                              >
                                {btnText2}
                              </Link>
                            ) : (
                              <a 
                                href={btnLink2} 
                                target={btnLink2.startsWith('http') ? '_blank' : undefined}
                                rel={btnLink2.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="w-full sm:w-auto px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white hover:text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl shadow-sm border border-neutral-700 transition-all text-center cursor-pointer"
                              >
                                {btnText2}
                              </a>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith(':::downloads')) {
                  const contentWithoutContainer = paragraph.replace(':::downloads\n', '').replace('\n:::', '');
                  const lines = contentWithoutContainer.split('\n').filter(Boolean);
                  const items = lines.map(line => {
                    const parts = line.split('|').map(x => x.trim());
                    return {
                      type: parts[0] || 'PDF',
                      title: parts[1] || '',
                      desc: parts[2] || '',
                      link: parts[3] || '#',
                      btnText: parts[4] || 'İndir'
                    };
                  });
                  return (
                    <div key={index} className="my-8 bg-neutral-50/50 p-6 sm:p-8 rounded-3xl border border-gray-150/80 shadow-sm">
                      <h4 className="text-base font-black text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-primary rounded"></span>
                        Yer Gösterme Belgesi Dosyaları ve Şablonları
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {items.map((item, idx) => {
                          let icon = <FileText className="w-6 h-6 text-rose-500" />;
                          let tagColor = 'bg-rose-50 text-rose-700 border-rose-100';
                          let imgSrc = "";
                          if (item.type.toLowerCase().includes('pdf')) {
                            icon = <FileText className="w-6 h-6 text-rose-500" />;
                            tagColor = 'bg-rose-50 text-rose-700 border-rose-100';
                            imgSrc = "/images/sozlesme/yer-gosterme-belgesi-bos-sablon.webp";
                          } else if (item.type.toLowerCase().includes('word')) {
                            icon = <FileText className="w-6 h-6 text-blue-500" />;
                            tagColor = 'bg-blue-50 text-blue-700 border-blue-100';
                            imgSrc = "/images/sozlesme/yer-gosterme-belgesi-otokopili.webp";
                          } else if (item.type.toLowerCase().includes('excel')) {
                            icon = <FileSpreadsheet className="w-6 h-6 text-emerald-500" />;
                            tagColor = 'bg-emerald-50 text-emerald-700 border-emerald-100';
                            imgSrc = "/images/sozlesme/yer-gosterme-belgesi-numaratorlu-ornek.webp";
                          } else if (item.type.toLowerCase().includes('boş')) {
                            icon = <FileText className="w-6 h-6 text-amber-500" />;
                            tagColor = 'bg-amber-50 text-amber-700 border-amber-100';
                          } else if (item.type.toLowerCase().includes('doldurulmuş')) {
                            icon = <FileText className="w-6 h-6 text-violet-500" />;
                            tagColor = 'bg-violet-50 text-violet-700 border-violet-100';
                          }

                          return (
                            <div key={idx} className="flex flex-col justify-between p-5 rounded-2xl border border-gray-150 bg-white shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-300 group">
                              <div>
                                <div className="flex items-start justify-between mb-3">
                                  <div className="p-2.5 rounded-xl bg-neutral-50 border border-gray-100 group-hover:bg-neutral-100/55 transition-colors">
                                    {icon}
                                  </div>
                                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${tagColor}`}>
                                    {item.type}
                                  </span>
                                </div>
                                {activePost.slug === 'emlak-yer-gosterme-belgesi-nedir' && imgSrc && (
                                  <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border border-gray-150 bg-neutral-50 mb-3 shadow-xs">
                                    <img src={imgSrc} alt={`${item.title} Ekran Görüntüsü`} title={`${item.title} Ekran Görüntüsü`} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" referrerPolicy="no-referrer" />
                                  </div>
                                )}
                                <h5 className="text-sm font-black text-slate-900 mb-1 group-hover:text-primary transition-colors">
                                  {item.title}
                                </h5>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4">
                                  {item.desc}
                                </p>
                              </div>
                              <a 
                                href={item.link} 
                                download={item.link.startsWith('/downloads/')}
                                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-neutral-900 hover:bg-primary text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-xs transition-all duration-300 cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5" />
                                {item.btnText}
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith(':::callout')) {
                  const contentWithoutContainer = paragraph.replace(':::callout\n', '').replace('\n:::', '');
                  const lines = contentWithoutContainer.split('\n').filter(Boolean);
                  const title = lines[0]?.replace('TITLE:', '').trim() || 'Bilgilendirme';
                  const bodyLines = lines.slice(1);
                  return (
                    <div key={index} className="bg-primary/5 p-6 rounded-2xl border border-primary/10 my-6 shadow-xs">
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-primary rounded"></span>
                        {title}
                      </h4>
                      <div className="text-xs sm:text-sm font-normal text-slate-700 leading-relaxed space-y-2">
                        {bodyLines.map((line, lIdx) => (
                          <p key={lIdx} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium text-slate-800">$1</strong>').replace(/✓/g, '<span class="text-emerald-500 font-bold">✓</span>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:text-black transition-colors font-medium underline">$1</a>') }} />
                        ))}
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith(':::checklist')) {
                  const lines = paragraph.replace(':::checklist\n', '').replace('\n:::', '').split('\n').filter(Boolean);
                  return (
                    <div key={index} className="bg-primary/5 p-6 sm:p-8 rounded-3xl border border-primary/10 my-6 shadow-sm">
                      <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-primary rounded"></span>
                        Sipariş Öncesi Kontrol Listesi
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {lines.map((item, key) => (
                          <div key={key} className="flex items-center gap-2.5 text-xs sm:text-sm font-normal text-slate-700">
                            <span className="text-primary shrink-0 text-base font-bold">✓</span>
                            <span dangerouslySetInnerHTML={{ __html: item.replace(/^(\*|-|✓)\s+/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium text-slate-800">$1</strong>') }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith(':::sales-box')) {
                  const contentWithoutContainer = paragraph.replace(':::sales-box\n', '').replace('\n:::', '').trim();
                  const lines = contentWithoutContainer.split('\n').filter(Boolean);
                  const titleLine = lines.find(l => l.includes('TITLE:'));
                  const optionsLine = lines.find(l => l.includes('OPTIONS:'));
                  const suitableLine = lines.find(l => l.includes('SUITABLE_FOR:'));
                  const minOrderLine = lines.find(l => l.includes('MIN_ORDER:'));
                  const highlightsLine = lines.find(l => l.includes('HIGHLIGHTS:'));

                  const title = titleLine ? titleLine.replace('TITLE:', '').trim() : '';
                  const options = optionsLine ? optionsLine.replace('OPTIONS:', '').trim().split('|').map(s => s.trim()) : [];
                  const suitable = suitableLine ? suitableLine.replace('SUITABLE_FOR:', '').trim() : '';
                  const minOrder = minOrderLine ? minOrderLine.replace('MIN_ORDER:', '').trim() : '';
                  const highlights = highlightsLine ? highlightsLine.replace('HIGHLIGHTS:', '').trim().split('|').map(s => s.trim()) : [];

                  return (
                    <div key={index} className="my-8 bg-neutral-900 text-white rounded-[2rem] p-6 sm:p-8 shadow-md border border-neutral-800 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                      <div className="relative">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5 mb-5">
                          <div>
                            <span className="inline-flex px-2.5 py-1 bg-primary/20 text-primary text-[10px] font-black rounded-md uppercase tracking-wider mb-2 border border-primary/20">
                              Satış ve Ürün Özeti
                            </span>
                            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">{title}</h3>
                          </div>
                          <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-2xl shrink-0 text-center sm:text-right">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Minimum Sipariş</p>
                            <p className="text-sm font-black text-white">{minOrder}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                          <div>
                            <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-2.5">Temel Seçenekler & Ölçüler</h4>
                            <ul className="space-y-2 text-gray-300 font-semibold">
                              {options.map((opt, oIdx) => (
                                <li key={oIdx} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>
                                  <span>{opt}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="mt-5">
                              <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-1.5">Uyumlu Sektörler</h4>
                              <p className="text-gray-300 font-semibold leading-relaxed">{suitable}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-2.5">Öne Çıkan Özellikler</h4>
                            <div className="grid grid-cols-1 gap-2.5">
                              {highlights.map((hl, hIdx) => (
                                <div key={hIdx} className="flex items-start gap-2.5 bg-neutral-800/40 p-2.5 rounded-xl border border-neutral-800/60">
                                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                                  <span className="text-gray-200 font-semibold leading-normal">{hl}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-5 border-t border-neutral-800 flex justify-end">
                          <Link 
                            to="/magnet" 
                            className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-white hover:bg-primary hover:text-white text-neutral-950 text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all duration-300 cursor-pointer"
                          >
                            Ürünü ve Fiyatları İncele <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith(':::decision-flow')) {
                  const contentWithoutContainer = paragraph.replace(':::decision-flow\n', '').replace('\n:::', '').trim();
                  const lines = contentWithoutContainer.split('\n').filter(Boolean);
                  const titleLine = lines.find(l => l.includes('TITLE:'));
                  const title = titleLine ? titleLine.replace('TITLE:', '').trim() : 'Sipariş Adedi Karar Akışı';
                  const steps = lines.filter(l => !l.includes('TITLE:')).map(line => {
                    const parts = line.split('|').map(p => p.trim());
                    return {
                      question: parts[0] || '',
                      recommendation: parts[1] || '',
                      badge: parts[2] || ''
                    };
                  });

                  return (
                    <div key={index} className="my-8 bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-gray-150/80 shadow-xs">
                      <h4 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-4.5 bg-primary rounded"></span>
                        {title}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {steps.map((step, sIdx) => (
                          <div key={sIdx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between group hover:border-primary/40 hover:shadow-sm transition-all duration-300">
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Senaryo {sIdx + 1}</span>
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider rounded-md border border-primary/20">
                                  {step.badge}
                                </span>
                              </div>
                              <h5 className="text-xs sm:text-sm font-black text-slate-800 leading-snug mb-2">{step.question}</h5>
                            </div>
                            <div className="border-t border-gray-50 pt-3 mt-1 text-xs text-gray-500 font-semibold">
                              <span className="text-primary font-black mr-1">Önerilen Tiraj:</span>
                              <span className="text-slate-800 font-black">{step.recommendation}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith(':::corporate-benefits')) {
                  const contentWithoutContainer = paragraph.replace(':::corporate-benefits\n', '').replace('\n:::', '').trim();
                  const lines = contentWithoutContainer.split('\n').filter(Boolean);
                  const titleLine = lines.find(l => l.includes('TITLE:'));
                  const title = titleLine ? titleLine.replace('TITLE:', '').trim() : 'Kurumsal Sipariş Avantajları';
                  const perks = lines.filter(l => !l.includes('TITLE:')).map(line => {
                    const cleanLine = line.replace('PERK:', '').trim();
                    const parts = cleanLine.split('|').map(p => p.trim());
                    return {
                      title: parts[0] || '',
                      desc: parts[1] || ''
                    };
                  });

                  return (
                    <div key={index} className="my-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-[2rem] p-6 sm:p-8 border border-primary/10 shadow-sm animate-fade-in relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl -mr-12 -mt-12"></div>
                      <h4 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-4.5 bg-primary rounded"></span>
                        {title}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
                        {perks.map((perk, pIdx) => (
                          <div key={pIdx} className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-sm transition-all duration-300">
                            <h5 className="font-black text-slate-800 flex items-center gap-2 mb-2">
                              <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0">✓</span>
                              {perk.title}
                            </h5>
                            <p className="text-gray-600 font-semibold leading-relaxed pl-7">{perk.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith(':::comparison')) {
                  const contentWithoutContainer = paragraph.replace(':::comparison\n', '').replace('\n:::', '');
                  const sections = contentWithoutContainer.split('\n---\n');
                  const correctText = sections[0]?.replace('DOĞRU:', '').trim() || '';
                  const incorrectText = sections[1]?.replace('YANLIŞ:', '').trim() || '';
                  return (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                      <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200 shadow-sm flex flex-col justify-between">
                        <div>
                          <span className="inline-flex px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-md uppercase tracking-wider mb-3">✓ DOĞRU UYGULAMA</span>
                          <p className="text-gray-700 font-semibold text-xs sm:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: correctText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </div>
                      </div>
                      <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-200 shadow-sm flex flex-col justify-between">
                        <div>
                          <span className="inline-flex px-2.5 py-1 bg-rose-500 text-white text-[10px] font-black rounded-md uppercase tracking-wider mb-3">✗ YANLIŞ UYGULAMA</span>
                          <p className="text-gray-700 font-semibold text-xs sm:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: incorrectText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </div>
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith(':::quick-decision')) {
                  const contentWithoutContainer = paragraph.replace(':::quick-decision\n', '').replace('\n:::', '').trim();
                  const lines = contentWithoutContainer.split('\n').filter(Boolean);
                  const titleLine = lines.find(l => l.includes('TITLE:'));
                  const title = titleLine ? titleLine.replace('TITLE:', '').trim() : '30 Saniyede Doğru Etiketi Bulun';
                  const listItems = lines.filter(l => !l.includes('TITLE:'));
                  return (
                    <div key={index} className="my-6 bg-amber-50/60 border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-xs animate-fade-in">
                      <h4 className="text-sm sm:text-base font-black text-amber-950 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="text-xl">⚡</span> {title}
                      </h4>
                      <ul className="space-y-3.5 text-xs sm:text-sm text-amber-950/90 font-semibold">
                        {listItems.map((item, idx) => {
                          const cleaned = item.replace(/^(-\s*|\*\s*)/, '');
                          return (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="text-amber-600 mt-1 shrink-0 text-xs">●</span>
                              <span dangerouslySetInnerHTML={{
                                __html: cleaned
                                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:text-black transition-colors font-bold underline">$1</a>')
                              }} />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                }
                if (paragraph.startsWith(':::info-cards')) {
                  const contentWithoutContainer = paragraph.replace(':::info-cards\n', '').replace('\n:::', '').trim();
                  if (contentWithoutContainer && contentWithoutContainer !== ':::info-cards') {
                    const sections = contentWithoutContainer.split('\n---\n');
                    const bgs = [
                      "bg-blue-50/50 border-blue-200 text-blue-900",
                      "bg-emerald-50/50 border-emerald-200 text-emerald-900",
                      "bg-amber-50/50 border-amber-200 text-amber-900",
                      "bg-rose-50/50 border-rose-200 text-rose-900",
                      "bg-purple-50/50 border-purple-200 text-purple-900",
                    ];
                    const textColors = [
                      "text-blue-500",
                      "text-emerald-500",
                      "text-amber-500",
                      "text-rose-500",
                      "text-purple-500"
                    ];
                    const emojis = ["🟦", "🟩", "🟧", "🟥", "🟪"];
                    return (
                      <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 animate-fade-in">
                        {sections.map((section, idx) => {
                          const lines = section.split('\n').filter(Boolean);
                          const header = lines[0] || 'Bilgi';
                          const listItems = lines.slice(1);
                          return (
                            <div key={idx} className={`${bgs[idx % bgs.length]} p-5 rounded-2xl border shadow-sm`}>
                              <h4 className="text-sm font-black uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span className="text-lg">{emojis[idx % emojis.length]}</span> {header}
                              </h4>
                              <ul className="text-xs sm:text-sm font-semibold text-gray-700 space-y-1.5">
                                {listItems.map((item, itemIdx) => (
                                  <li key={itemIdx} className="flex items-center gap-2">
                                    <span className={textColors[idx % textColors.length]}>•</span>
                                    {item.replace(/^(-\s*|\*\s*)/, '')}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                  return (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 animate-fade-in">
                      <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-200 shadow-sm">
                        <h4 className="text-sm font-black text-blue-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span className="text-lg">🟦</span> Aracı Bilgileri
                        </h4>
                        <ul className="text-xs sm:text-sm font-semibold text-gray-700 space-y-1.5">
                          <li className="flex items-center gap-2"><span className="text-blue-500">•</span> Logo</li>
                          <li className="flex items-center gap-2"><span className="text-blue-500">•</span> Firma Unvanı</li>
                          <li className="flex items-center gap-2"><span className="text-blue-500">•</span> İletişim / Telefon</li>
                          <li className="flex items-center gap-2"><span className="text-blue-500">•</span> Yetki Belgesi Numarası</li>
                        </ul>
                      </div>
                      <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200 shadow-sm">
                        <h4 className="text-sm font-black text-emerald-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span className="text-lg">🟩</span> Müşteri Bilgileri
                        </h4>
                        <ul className="text-xs sm:text-sm font-semibold text-gray-700 space-y-1.5">
                          <li className="flex items-center gap-2"><span className="text-emerald-500">•</span> Alıcı/Kiracı Adı Soyadı</li>
                          <li className="flex items-center gap-2"><span className="text-emerald-500">•</span> Cep Telefonu</li>
                          <li className="flex items-center gap-2"><span className="text-emerald-500">•</span> T.C. Kimlik Numarası</li>
                          <li className="flex items-center gap-2"><span className="text-emerald-500">•</span> Islak İmza</li>
                        </ul>
                      </div>
                      <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200 shadow-sm">
                        <h4 className="text-sm font-black text-amber-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span className="text-lg">🟧</span> mülk Bilgileri
                        </h4>
                        <ul className="text-xs sm:text-sm font-semibold text-gray-700 space-y-1.5">
                          <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Net Adres</li>
                          <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Portföy No</li>
                          <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Ada / Parsel / Blok / No</li>
                          <li className="flex items-center gap-2"><span className="text-amber-500">•</span> Gayrimenkul Cinsi</li>
                        </ul>
                      </div>
                      <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-200 shadow-sm">
                        <h4 className="text-sm font-black text-rose-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span className="text-lg">🟥</span> İmzalar ve Tarih
                        </h4>
                        <ul className="text-xs sm:text-sm font-semibold text-gray-700 space-y-1.5">
                          <li className="flex items-center gap-2"><span className="text-rose-500">•</span> Alıcı/Müşteri İmzası</li>
                          <li className="flex items-center gap-2"><span className="text-rose-500">•</span> Emlak Danışmanı İmzası</li>
                          <li className="flex items-center gap-2"><span className="text-rose-500">•</span> Gösterim Tarihi</li>
                          <li className="flex items-center gap-2"><span className="text-rose-500">•</span> Gösterim Saati</li>
                        </ul>
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith(':::doldurma-adimlari')) {
                  const contentWithoutContainer = paragraph.replace(':::doldurma-adimlari\n', '').replace('\n:::', '').trim();
                  let steps = [
                    { title: "Firma bilgilerini yazın.", desc: "İlk olarak aracı emlak ofisinin ticari unvanı, iletişim bilgileri ve Taşınmaz Ticareti Yetki Belgesi numarası forma eksiksiz işlenmelidir." },
                    { title: "Müşteri bilgilerini girin.", desc: "Hizmeti alan potansiyel alıcı veya kiracının adı, soyadı, T.C. kimlik numarası, güncel cep telefonu numarası girilmelidir." },
                    { title: "Taşınmaz bilgilerini yazın.", desc: "Gösterimi yapılan mülkün tam adresi, tapu bilgileri (il, ilçe, mahalle, ada, parsel, blok ve daire numarası) ile mülkün cinsi forma açıkça yazılmalıdır." },
                    { title: "Tarih ve Saat ekleyin.", desc: "Taşınmazın gösterildiği günün tarihi ve tam saati (Örn: 14:30) forma kaydedilmelidir." },
                    { title: "Karşılıklı Islak İmza alın.", desc: "Formun alt kısmında yer alan alanlara her iki tarafın da el yazısıyla ad-soyad yazarak ıslak imza atması zorunludur." }
                  ];
                  if (contentWithoutContainer && contentWithoutContainer !== ':::doldurma-adimlari') {
                    const customLines = contentWithoutContainer.split('\n').filter(Boolean);
                    const parsedSteps = customLines.map(line => {
                      const parts = line.split('|').map(p => p.trim());
                      return {
                        title: parts[0] || 'Adım',
                        desc: parts[1] || ''
                      };
                    });
                    if (parsedSteps.length > 0) {
                      steps = parsedSteps;
                    }
                  }
                  return (
                    <div key={index} className="my-8 space-y-4 animate-fade-in">
                      {steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-gray-150 shadow-xs hover:border-primary/20 hover:shadow-sm transition-all duration-200">
                          <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-black text-sm shrink-0">
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-tight mb-1">Adım {idx + 1}: {step.title}</h4>
                            <p className="text-xs sm:text-sm text-gray-600 font-semibold leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
                if (paragraph.startsWith(':::warning-box')) {
                  const contentWithoutContainer = paragraph.replace(':::warning-box\n', '').replace('\n:::', '').trim();
                  let items = [
                    "İmzasız belge düzenlemeyin.",
                    "Tarih ve saati boş bırakmayın.",
                    "Seri numarası (numaratör) olmayan belge kullanmayın.",
                    "Fotokopi belge kullanmayın (asıl nüshayı saklayın)."
                  ];
                  if (contentWithoutContainer && contentWithoutContainer !== ':::warning-box') {
                    const customLines = contentWithoutContainer.split('\n').map(l => l.trim().replace(/^(-\s*|\*\s*)/, '')).filter(Boolean);
                    if (customLines.length > 0) {
                      items = customLines;
                    }
                  }
                  return (
                    <div key={index} className="my-6 bg-rose-50 border border-rose-200 rounded-2xl p-6 shadow-sm animate-fade-in">
                      <h4 className="text-sm font-black text-rose-950 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="text-lg">❌</span> Dikkat Edilmesi Gerekenler
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-rose-900 font-bold">
                        {items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-rose-600">❌</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith(':::importance-cards')) {
                  const contentWithoutContainer = paragraph.replace(':::importance-cards\n', '').replace('\n:::', '').trim();
                  let cards = [
                    { title: "Karbonsuz Yazım", desc: "Kendinden karbonlu otokopili kağıt teknolojisi sayesinde araya karbon kağıdı koymaya gerek kalmadan, üst sayfaya yazılan tüm bilgiler alt nüshalara pürüzsüz ve net bir şekilde kopyalanır.", link: "", bg: "bg-blue-50/50 border-blue-200 text-blue-950", dot: "bg-blue-500" },
                    { title: "Seri Numarası", desc: "Formların sağ üst köşesine basılan ardışık benzersiz 6 haneli seri numaraları (numaratör) sayesinde belgelerin kaybolma riski önlenir, geriye dönük evrak ve muhasebe takibi kusursuz yapılır.", link: "", bg: "bg-emerald-50/50 border-emerald-200 text-emerald-950", dot: "bg-emerald-500" },
                    { title: "Mikro Perforaj", desc: "Koçan cildinden asıl ve suret nüshaların yırtılmadan, saniyeler içinde düzgünce koparılabilmesini sağlayan profesyonel tırtıklı mikro perforaj teknolojisi uygulanır.", link: "", bg: "bg-amber-50/50 border-amber-200 text-amber-950", dot: "bg-amber-500" },
                    { title: "Hızlı Arşivleme", desc: "Saha çalışmalarında ve ofiste zaman kazandıran yapısıyla, emlak ofisinizin evrak arşivleme sistemini optimize eder ve yasal süreçlerde güçlü delil takibi sağlar.", link: "", bg: "bg-rose-50/50 border-rose-200 text-rose-950", dot: "bg-rose-500" },
                    { title: "Profesyonel Görünüm", desc: "Firmanızın kurumsal logosu, marka renkleri ve Taşınmaz Ticareti Yetki Belgesi numarasıyla özelleştirilmiş formlar, müşterilerinizin gözünde kurumsal imajınızı ve güvenilirliğinizi artırır.", link: "", bg: "bg-purple-50/50 border-purple-200 text-purple-950", dot: "bg-purple-500" }
                  ];
                  if (contentWithoutContainer && contentWithoutContainer !== ':::importance-cards') {
                    const customLines = contentWithoutContainer.split('\n').filter(Boolean);
                    const bgs = [
                      "bg-blue-50/50 border-blue-200 text-blue-950",
                      "bg-emerald-50/50 border-emerald-200 text-emerald-950",
                      "bg-amber-50/50 border-amber-200 text-amber-950",
                      "bg-rose-50/50 border-rose-200 text-rose-950",
                      "bg-purple-50/50 border-purple-200 text-purple-950",
                      "bg-indigo-50/50 border-indigo-200 text-indigo-950"
                    ];
                    const dots = [
                      "bg-blue-500",
                      "bg-emerald-500",
                      "bg-amber-500",
                      "bg-rose-500",
                      "bg-purple-500",
                      "bg-indigo-500"
                    ];
                    const parsedCards = customLines.map((line, idx) => {
                      const parts = line.split('|').map(p => p.trim());
                      return {
                        title: parts[0] || 'Özellik',
                        desc: parts[1] || '',
                        link: parts[2] || '',
                        bg: bgs[idx % bgs.length],
                        dot: dots[idx % dots.length]
                      };
                    });
                    if (parsedCards.length > 0) {
                      cards = parsedCards;
                    }
                  }
                  return (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8 animate-fade-in">
                      {cards.map((card, idx) => {
                        const cardContent = (
                          <div className="flex flex-col justify-between h-full">
                            <div>
                              <h4 className="text-sm font-black uppercase tracking-wider mb-2 flex items-center gap-2 text-slate-900">
                                <span className={`w-2 h-2 rounded-full ${card.dot}`}></span>
                                {card.title}
                              </h4>
                              <p className="text-xs sm:text-sm font-semibold text-gray-700 leading-relaxed">{card.desc}</p>
                            </div>
                            {card.link && (
                              <span className="text-[10px] text-primary font-black mt-4 inline-flex items-center gap-1 group-hover:underline uppercase tracking-wider">Detayları Gör →</span>
                            )}
                          </div>
                        );

                        return card.link ? (
                          <Link key={idx} to={card.link} className={`p-6 rounded-2xl border shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer ${card.bg}`}>
                            {cardContent}
                          </Link>
                        ) : (
                          <div key={idx} className={`p-6 rounded-2xl border shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between ${card.bg}`}>
                            {cardContent}
                          </div>
                        );
                      })}
                    </div>
                  );
                }
                if (paragraph.startsWith(':::gallery')) {
                  const contentWithoutContainer = paragraph.replace(':::gallery\n', '').replace('\n:::', '').trim();
                  let items = activePost.slug === 'emlak-yer-gosterme-belgesi-nedir' ? [
                    { src: '/images/sozlesme/yer-gosterme-belgesi-otokopili.webp', alt: 'Yer Gösterme Belgesi Baskısı', desc: 'Otokopili Yer Gösterme Belgesi Baskısı', link: '' },
                    { src: '/images/sozlesme/yer-gosterme-belgesi-numaratorlu-ornek.webp', alt: 'Numaratörlü Yer Gösterme Belgesi', desc: 'Numaratörlü Yer Gösterme Belgesi', link: '' },
                    { src: '/images/sozlesme/yer-gosterme-belgesi-doldurulmus-ornek.webp', alt: 'Otokopili Yer Gösterme Belgesi', desc: 'Doldurulmuş Otokopili Yer Gösterme Belgesi Örneği', link: '' },
                    { src: '/images/sozlesme/yer-gosterme-belgesi-bos-sablon.webp', alt: 'Yer Gösterme Belgesi Boş Şablonu', desc: 'Yer Gösterme Belgesi Boş Şablonu', link: '' },
                    { src: '/images/sozlesme/otokopili-sozlesme-basimi.webp', alt: 'Otokopili Sözleşme Basımı', desc: 'Otokopili Sözleşme Baskısı', link: '' },
                    { src: '/images/sozlesme/sozlesme-taslagi-baski.webp', alt: 'Sözleşme Taslağı Baskısı', desc: 'Sözleşme Taslağı Baskı Örneği', link: '' }
                  ] : [
                    { src: '/images/sozlesme/kendinden-karbonlu-sozlesme.webp', alt: 'Kendinden Karbonlu Sözleşme', desc: 'Otokopili 3 nüsha profesyonel baskı kalitesi', link: '' },
                    { src: '/images/sozlesme/numaratorlu-sozlesme-baski.webp', alt: 'Numaratörlü Sözleşme', desc: 'Seri sıra takipli geriye dönük güvenli arşivleme', link: '' },
                    { src: '/images/sozlesme/otokopili-sozlesme-basimi.webp', alt: 'Otokopili Sözleşme Basımı', desc: 'A5 ve A4 ebat seçeneklerinde kaliteli kağıtlar', link: '' },
                    { src: '/images/sozlesme/sozlesme-ornegi-kocani.webp', alt: 'Sözleşme Koçanı Örneği', desc: 'Üstten perforajlı kolay koparılabilir tırtıklı cilt', link: '' },
                    { src: '/images/sozlesme/sozlesme-taslagi-baski.webp', alt: 'Sözleşme Taslağı Baskısı', desc: 'Kurumsal renklerinize ve logonuzla özel şablonlar', link: '' },
                    { src: '/images/tahsilat-makbuzu/otokopili-tahsilat-makbuzu.webp', alt: 'Otokopili Evrak Formu', desc: 'Yüksek kaliteli NCR kendinden karbon transferi', link: '' }
                  ];
                  if (contentWithoutContainer && contentWithoutContainer !== ':::gallery') {
                    const customLines = contentWithoutContainer.split('\n').filter(Boolean);
                    const parsedItems = customLines.map(line => {
                      const parts = line.split('|').map(p => p.trim());
                      return {
                        src: parts[0] || '',
                        alt: parts[1] || 'Baskı Resmi',
                        desc: parts[2] || parts[1] || 'Baskı Fotoğrafı',
                        link: parts[3] || ''
                      };
                    }).filter(item => item.src);
                    if (parsedItems.length > 0) {
                      items = parsedItems;
                    }
                  }
                  return (
                    <div key={index} className="my-8 bg-neutral-50 p-6 rounded-3xl border border-gray-150 animate-fade-in">
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-primary rounded"></span>
                        Gerçek Üretim ve Baskı Fotoğraflarımız
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {items.map((img, idx) => {
                          const cardContent = (
                            <>
                              <div className="aspect-[4/3] w-full overflow-hidden">
                                <img src={img.src} alt={img.alt} title={img.desc} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                              </div>
                              <div className="p-3 text-center border-t border-gray-100 bg-neutral-50/50 flex flex-col justify-between flex-grow">
                                <div>
                                  <p className="text-[11px] font-black text-slate-800 leading-tight">{img.alt}</p>
                                  <p className="text-[9px] text-gray-500 font-semibold mt-0.5 leading-normal">{img.desc}</p>
                                </div>
                                {img.link && (
                                  <span className="text-[9px] text-primary font-black mt-2 inline-block uppercase tracking-wider group-hover:underline">Seçeneği İncele →</span>
                                )}
                              </div>
                            </>
                          );

                          return img.link ? (
                            <Link key={idx} to={img.link} className="group relative rounded-2xl overflow-hidden border border-gray-150 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer">
                              {cardContent}
                            </Link>
                          ) : (
                            <div key={idx} className="group relative rounded-2xl overflow-hidden border border-gray-150 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                              {cardContent}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith(':::process-steps')) {
                  const contentWithoutContainer = paragraph.replace(':::process-steps\n', '').replace('\n:::', '').trim();
                  let steps = activePost.slug === 'emlak-yer-gosterme-belgesi-nedir' ? [
                    { num: '1', title: 'Sipariş & Detay', desc: 'Ölçü, adet ve nüsha sayısını seçip siparişinizi verin.', img: null, alt: null },
                    { num: '2', title: 'Grafik Tasarım', desc: 'Logonuzla kurumsal standartta şablon hazırlanır.', img: '/images/sozlesme/sozlesme-taslagi-baski.webp', alt: 'Yer Gösterme Belgesi Tasarımı' },
                    { num: '3', title: 'PDF Prova Onayı', desc: 'Tasarım dijital onaya sunulur, revizeler yapılır.', img: '/images/sozlesme/otokopili-sozlesme-basimi.webp', alt: 'Yer Gösterme Belgesi PDF Prova' },
                    { num: '4', title: 'Ofset Baskı', desc: 'Onaylı tasarım ofset makinelerimizde basılır.', img: '/images/hakkimizda/tecrube-matbaa.webp', alt: 'Yer Gösterme Belgesi Ofset Baskı' },
                    { num: '5', title: 'Kalite Kontrol', desc: 'Transfer kalitesi ve numaratör sırası kontrol edilir.', img: null, alt: null },
                    { num: '6', title: 'Hızlı Kargo', desc: 'Mukavemetli Kraft kolide kargoya verilir.', img: '/images/sektor/e-ticaret-perakende/e-ticaret-urun-kutusu-kargo-paketleme.webp', alt: 'Yer Gösterme Belgesi Kargo' },
                    { num: '7', title: 'Adrese Teslimat', desc: 'Türkiye geneli kapınıza kadar sorunsuz teslim edilir.', img: null, alt: null }
                  ] : [
                    { num: '1', title: 'Fiyat Teklifi', desc: 'Ölçü ve adet seçin, en uygun fiyatı hemen alın.', img: null, alt: null },
                    { num: '2', title: 'Grafik Tasarım', desc: 'Logonuzu gönderin, uzman ekibimiz tasarımınızı hazırlasın.', img: null, alt: null },
                    { num: '3', title: 'PDF Prova Onayı', desc: 'Baskı öncesi hazırlanan tasarımı kontrol edip onaylayın.', img: null, alt: null },
                    { num: '4', title: 'Yüksek Hızlı Baskı', desc: 'Onaylı tasarımınızı son teknoloji ofset makinelerinde basalım.', img: null, alt: null },
                    { num: '5', title: 'Güvenli Kargo', desc: 'Korunaklı ambalajlarda 81 ile kapınıza teslim gönderelim.', img: null, alt: null }
                  ];
                  if (contentWithoutContainer && contentWithoutContainer !== ':::process-steps') {
                    const customLines = contentWithoutContainer.split('\n').filter(Boolean);
                    const parsedSteps = customLines.map((line, idx) => {
                      const parts = line.split('|').map(p => p.trim());
                      return {
                        num: (idx + 1).toString(),
                        title: parts[0] || 'Aşama',
                        desc: parts[1] || '',
                        img: parts[2] || null,
                        alt: parts[3] || parts[0] || null
                      };
                    });
                    if (parsedSteps.length > 0) {
                      steps = parsedSteps;
                    }
                  }
                  return (
                    <div key={index} className="bg-slate-950 text-white p-6 sm:p-8 rounded-[2rem] border border-neutral-800 my-8 shadow-lg animate-fade-in">
                      <h4 className="text-sm font-black uppercase tracking-widest text-primary text-center mb-6">Mavi Basım {steps.length} Adımda Sipariş Süreci</h4>
                      <div className={`grid grid-cols-1 ${steps.length === 7 ? 'sm:grid-cols-7' : 'sm:grid-cols-5'} gap-4 relative`}>
                        {steps.map((step, idx) => (
                          <div key={idx} className="flex flex-col items-center text-center relative z-10 group">
                            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-sm shadow-md border-2 border-slate-950 mb-3 hover:scale-105 transition-transform shrink-0">
                              {step.num}
                            </div>
                            <h5 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white leading-tight">{step.title}</h5>
                            <p className="text-[10px] text-gray-400 font-semibold mt-1 leading-normal mb-3">{step.desc}</p>
                            {step.img && (
                              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 mt-auto shadow-sm group-hover:border-primary/45 transition-all">
                                <img src={step.img} alt={step.alt || step.title} title={step.alt || step.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                            )}
                          </div>
                        ))}
                        <div className="hidden sm:block absolute top-5 left-[10%] right-[10%] h-[2px] bg-neutral-800 -z-0"></div>
                      </div>
                    </div>
                  );
                }
                if (paragraph.startsWith('|')) {
                  const lines = paragraph.trim().split('\n').filter(Boolean);
                  if (lines.length >= 2) {
                    const rawHeaders = lines[0].split('|').map(x => x.trim()).filter((_, i) => i > 0 && i < lines[0].split('|').length - 1);
                    const rows = lines.slice(2).map(line => {
                      return line.split('|').map(x => x.trim()).filter((_, i) => i > 0 && i < line.split('|').length - 1);
                    });
                    return (
                      <div key={index} className="overflow-x-auto my-6 border border-gray-150 rounded-2xl shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-neutral-50">
                            <tr>
                              {rawHeaders.map((h, i) => (
                                <th key={i} className="px-6 py-4 text-left text-xs font-bold text-slate-800 uppercase tracking-wider border-r border-gray-150/40 last:border-r-0" dangerouslySetInnerHTML={{ __html: h.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>') }} />
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-150">
                            {rows.map((row, rIdx) => (
                              <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-neutral-50/40' : ''}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-6 py-4 text-xs sm:text-sm font-normal text-slate-700 border-r border-gray-150/40 last:border-r-0" dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>').replace(/✓/g, '<span class="text-emerald-500 font-bold">✓</span>').replace(/★/g, '<span class="text-amber-500">★</span>') }} />
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                }
                const isOrderedList = /^[0-9]+\.\s+/.test(paragraph);
                const isUnorderedList = /^[*-[#\]]\s+/.test(paragraph) || /^[* -]\s+/.test(paragraph);
                if (isOrderedList || isUnorderedList) {
                  const items = paragraph.split('\n');
                  if (isOrderedList) {
                    return (
                      <ol key={index} className="list-decimal pl-6 space-y-2 font-normal text-slate-700 my-4 text-sm sm:text-base leading-relaxed">
                        {items.map((item, key) => (
                          <li key={key} dangerouslySetInnerHTML={{ __html: item.replace(/^(\*|-|[0-9]+\.)\s+/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium text-slate-800">$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:text-black transition-colors font-medium underline">$1</a>') }} />
                        ))}
                      </ol>
                    );
                  } else {
                    return (
                      <ul key={index} className="space-y-2.5 font-normal text-slate-700 my-4 pl-1 text-sm sm:text-base leading-relaxed">
                        {items.map((item, key) => {
                          const cleaned = item.replace(/^(\*|-|[0-9]+\.)\s+/, '');
                          return (
                            <li key={key} className="flex items-start gap-2">
                              <span className="text-primary shrink-0 mt-1 font-bold text-sm">•</span>
                              <span dangerouslySetInnerHTML={{ __html: cleaned.replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium text-slate-800">$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:text-black transition-colors font-medium underline">$1</a>') }} />
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }
                }
                if (paragraph.startsWith('![')) {
                  const imgMatch = paragraph.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
                  if (imgMatch) {
                    const alt = imgMatch[1];
                    const rawSrc = imgMatch[2];
                    // Clean URL by stripping any title in quotes
                    const src = rawSrc.split(' ')[0].replace(/['"]/g, '');
                    return (
                      <div key={index} id={`img-container-${index}`} className="my-8 flex flex-col items-center w-full">
                        <div className="w-full rounded-[2rem] overflow-hidden border border-gray-150/80 shadow-md bg-white">
                          <img 
                            src={src} 
                            alt={alt} 
                            title={alt}
                            className="w-full h-auto object-cover max-h-[600px] hover:scale-[1.01] transition-transform duration-500" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    );
                  }
                }
                if (paragraph.startsWith('**İlgili Hizmet Bağlantıları:**')) {
                  return null;
                }
                if (paragraph.startsWith('---')) {
                  return <hr key={index} className="border-gray-200 my-8" />;
                }
                return (
                  <p key={index} className="leading-relaxed text-slate-700 font-normal text-sm sm:text-base" dangerouslySetInnerHTML={{
                    __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium text-slate-800">$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:text-black transition-colors font-medium underline">$1</a>')
                  }} />
                );
              })}
            </div>

            {/* Author Info Card (EEAT Boost) */}
            <div className="mt-12 p-8 bg-neutral-50 rounded-3xl border border-neutral-150/70 flex flex-col sm:flex-row gap-6 items-center sm:items-start shadow-sm">
              <div className="w-16 h-16 bg-primary text-white flex items-center justify-center rounded-2xl font-black text-xl shrink-0 uppercase shadow-md">
                MB
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 mb-2">
                  <h4 className="text-sm font-black text-black uppercase tracking-wider">Yazar: Mehmet Başar (Kıdemli Matbaa ve Grafik Koordinatörü)</h4>
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    İÇERİK DOĞRULANDI (TEKNİK ÜRETİM)
                  </span>
                </div>
                <p className="text-gray-600 font-semibold text-xs leading-relaxed mb-4">
                  {slug === 'brosur-baskida-en-dogru-kagit-nasil-secilir' ? (
                    <>Bu rehber, 20 yılı aşkın süredir matbaa ve yayıncılık sektöründe kıdemli baskı ve grafik koordinatörü olarak görev yapan <strong>Mehmet Başar</strong> tarafından kaleme alınmıştır. Mehmet Başar, ofset ve dijital baskı teknolojileri, renk kalibrasyonu, kırım ve katlama teknikleri ile teknik dosya hazırlama konularında derin bir uzmanlığa sahiptir. Sektörel standartlara uygun, bütçe dostu ve kaliteli tanıtım materyallerinin tasarlanıp üretilmesi süreçlerinde kurumsal markalara teknik danışmanlık sunmaktadır.</>
                  ) : slug === 'yer-gosterme-belgesi-nasil-doldurulur' ? (
                    <>Bu rehber, 20 yılı aşkın süredir matbaacılık, resmi evrak basımı ve kişiselleştirilmiş grafik tasarım tecrübesine sahip kıdemli matbaa uzmanı <strong>Mehmet Başar</strong> tarafından kaleme alınmıştır. İçerikteki teknik maddeler ve yasal mevzuat gereklilikleri, Taşınmaz Ticareti Hakkında Yönetmelik standartlarına uygunluk ve resmi evrak basım standartları açısından yazarımız tarafından detaylıca incelenmiş ve onaylanmıştır.</>
                  ) : slug === 'el-ilani-dagitimi-ise-yariyor-mu' ? (
                    <>Bu rehber, 20 yılı aşkın süredir matbaacılık, yerel reklamcılık ve bölgesel pazarlama kampanyaları tecrübesine sahip kıdemli matbaa uzmanı <strong>Mehmet Başar</strong> tarafından kaleme alınmıştır. İçerikteki bölgesel reklam geri dönüşleri, el ilanı kuşe kağıt gramajları, ebat standartları ve dağıtım stratejileri, yüksek dönüşümlü ve bütçe dostu tanıtım kampanyaları standartları açısından yazarımız tarafından detaylıca incelenmiş ve onaylanmıştır.</>
                  ) : slug.includes('magnet') ? (
                    <>Bu rehber, 20 yılı aşkın süredir matbaacılık, reklam ve kurumsal promosyon ürünleri üretimi tecrübesine sahip kıdemli matbaa uzmanı <strong>Mehmet Başar</strong> tarafından kaleme alınmıştır. İçerikteki teknik üretim kriterleri, mıknatıs çekim güçleri, selefon kaplama standartları ve grafik tasarım doğruluğu, yüksek kaliteli baskı ve uzun ömürlü promosyon üretimi standartları açısından yazarımız tarafından detaylıca incelenmiş ve onaylanmıştır.</>
                  ) : (
                    <>Bu rehber, 20 yılı aşkın süredir matbaacılık, reklam ve kurumsal ambalaj ile baskılı ürün imalatı tecrübesine sahip kıdemli matbaa uzmanı <strong>Mehmet Başar</strong> tarafından kaleme alınmıştır. İçerikteki teknik ambalaj kriterleri, kağıt mukavemet standartları, selefon kaplama standartları ve grafik tasarım doğruluğu, yüksek kaliteli baskı ve uzun ömürlü ürün üretimi standartları açısından yazarımız tarafından detaylıca incelenmiş ve onaylanmıştır.</>
                  )}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border-t border-gray-200/60 pt-4 text-[10px] font-black text-gray-500 uppercase">
                  <div>İlk Yayınlanma: <span className="text-black">{slug === 'brosur-baskida-en-dogru-kagit-nasil-secilir' ? "21 Mayıs 2026" : slug === 'yer-gosterme-belgesi-nasil-doldurulur' ? "04 Haziran 2026" : "21 Mayıs 2026"}</span></div>
                  <div>Son Güncelleme: <span className="text-black">06 Temmuz 2026</span></div>
                  {slug === 'yer-gosterme-belgesi-nasil-doldurulur' && (
                    <div>Mevzuat Uygunluk: <span className="text-emerald-700">Madde 19 (Uyumlu)</span></div>
                  )}
                </div>
              </div>
            </div>

            {/* Inbuilt FAQ Section (2 Column Grid) */}
            {activePost.faq && activePost.faq.length > 0 && (
              <div className="mt-16 pt-10 border-t border-gray-100">
                <h3 className="text-2xl font-black text-black mb-6 uppercase tracking-tight">Sıkça Sorulan Sorular</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activePost.faq.map((item, i) => (
                    <div key={i} className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 hover:bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm sm:text-base font-black text-primary mb-2 flex gap-2 leading-snug">
                          <span className="text-black/30 shrink-0">Q.</span> <span>{item.question}</span>
                        </h4>
                        <p className="text-gray-600 font-semibold text-xs leading-relaxed pl-6">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slug === 'restoranlar-icin-en-etkili-reklam-urunleri' && (
              <div className="mt-8 p-6 sm:p-8 bg-gradient-to-br from-neutral-50 via-slate-50 to-neutral-50 rounded-[2rem] border border-neutral-150 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
                <div>
                  <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-neutral-900 mb-1">Restoran Reklam Ürünleri Fiyat Listelerini İnceleyin</h4>
                  <p className="text-xs text-gray-500 font-semibold max-w-xl leading-relaxed">
                    Tüm Amerikan servis, magnet, karton çanta ve broşür ebat/adet fiyatlarımıza sitemizden anında ulaşabilirsiniz. Kurumsal restoran zincirlerine özel toplu indirim fırsatlarımız devam etmektedir.
                  </p>
                </div>
                <Link to="/brosur" className="inline-flex py-3 px-6 bg-primary hover:bg-neutral-900 text-white hover:text-white transition-all duration-300 rounded-xl font-bold tracking-tight text-center uppercase text-xs shrink-0 shadow-xs cursor-pointer">
                  Tüm Fiyat Listelerini İncele
                </Link>
              </div>
            )}
            {slug === 'kutu-baskida-en-cok-tercih-edilen-modeller' && (
              <div className="mt-8 p-6 sm:p-8 bg-gradient-to-br from-neutral-50 via-slate-50 to-neutral-50 rounded-[2rem] border border-neutral-150 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
                <div>
                  <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-neutral-900 mb-1">Kutu ve Ambalaj Fiyat Listelerini İnceleyin</h4>
                  <p className="text-xs text-gray-500 font-semibold max-w-xl leading-relaxed">
                    Tüm özel kilitli kutu, kargo kolisi ve ambalaj ebat/adet fiyatlarımıza sitemizden anında ulaşabilirsiniz. Kurumsal firmalara özel yüksek adetli alımlarda ek iskonto sunulmaktadır.
                  </p>
                </div>
                <Link to="/kutu" className="inline-flex py-3 px-6 bg-primary hover:bg-neutral-900 text-white hover:text-white transition-all duration-300 rounded-xl font-bold tracking-tight text-center uppercase text-xs shrink-0 shadow-xs cursor-pointer">
                  Kutu Fiyatlarını İncele
                </Link>
              </div>
            )}
            {slug === 'el-ilani-dagitimi-ise-yariyor-mu' && (
              <div className="mt-8 p-6 sm:p-8 bg-gradient-to-br from-neutral-50 via-slate-50 to-neutral-50 rounded-[2rem] border border-neutral-150 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
                <div>
                  <h4 className="text-base sm:text-lg font-black uppercase tracking-tight text-neutral-900 mb-1">El İlanı ve Broşür Fiyat Listelerini İnceleyin</h4>
                  <p className="text-xs text-gray-500 font-semibold max-w-xl leading-relaxed">
                    A5, A6 ve A4 boyutlarında 90 gr, 115 gr, 135 gr, 170 gr kuşe el ilanı fiyatlarımızı anında görün. Şeffaf ve bütçe dostu matbaa çözümleriyle bölgesel reklam bütçenizi en verimli şekilde yönetin.
                  </p>
                </div>
                <Link to="/el-ilani" className="inline-flex py-3 px-6 bg-primary hover:bg-neutral-900 text-white hover:text-white transition-all duration-300 rounded-xl font-bold tracking-tight text-center uppercase text-xs shrink-0 shadow-xs cursor-pointer">
                  El İlanı Fiyatlarını İncele
                </Link>
              </div>
            )}
            {slug === 'emlak-yer-gosterme-belgesi-nedir' && (
              <div className="mt-16 p-8 sm:p-12 bg-gradient-to-br from-neutral-900 via-slate-950 to-neutral-900 text-white rounded-[2rem] border border-neutral-800 shadow-xl text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
                <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 inline-block">Teklif & Sipariş Hattı</span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-4">Emlak Yer Gösterme Belgesi Siparişi Verin</h3>
                <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed font-semibold">
                  Emlak ofisinizin logosuyla, yetki belgesi numaranızla ve güncel yönetmeliğe tam uyumlu maddelerle hazırlanan otokopili ve numaratörlü formlarınızı profesyonel kalitede basıyoruz.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto px-8 py-4 bg-primary hover:bg-white hover:text-black text-white transition-all duration-300 rounded-2xl font-black uppercase tracking-wider text-sm justify-center items-center gap-2 shadow-lg cursor-pointer">
                    WhatsApp İle Sipariş Ver
                  </a>
                  <Link to="/iletisim" className="inline-flex w-full sm:w-auto px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white transition-all duration-300 rounded-2xl font-black uppercase tracking-wider text-sm justify-center items-center gap-2 cursor-pointer">
                    Teklif Formu Doldur
                  </Link>
                </div>
              </div>
            )}

            {/* İlgili Ürünler (Related Products) - Clean visual product grid directly related to context */}
            <div className="mt-16 pt-10 border-t border-gray-100">
              {slug === 'brosur-baskida-en-dogru-kagit-nasil-secilir' && (
                <div className="bg-slate-50 border border-slate-150 p-6 rounded-2xl mb-6 text-sm text-gray-700 font-medium leading-relaxed shadow-xs animate-fade-in">
                  <h4 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-2">Hangi Durumda Diğer Ürünlere Geçmelisiniz?</h4>
                  <p className="mb-3 font-semibold">
                    Broşür genel tanıtımlar için mükemmel bir araç olsa da, işletmenizin anlık veya uzun vadeli pazarlama stratejilerine göre diğer özel baskı çözümlerimize geçiş yapmanız daha doğru ve maliyet etkin olabilir:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm font-semibold text-gray-600">
                    <li>
                      📌 <strong>Tek sayfalık, hızlı kitle ve sokak dağıtımları için:</strong> Katlama işçiliği ve yüksek sayfa maliyetlerinden kaçınarak doğrudan <Link to="/el-ilani" className="text-primary hover:underline font-bold">El İlanı</Link> sayfamıza geçiş yapabilirsiniz.
                    </li>
                    <li>
                      📌 <strong>Çok sayfalı, prestijli ve kapsamlı ürün yelpazesi sunumları için:</strong> Tek bir broşürün kısıtlı alanının yetmediği durumlarda, dilediğiniz cilt seçeneğiyle <Link to="/kataloglar" className="text-primary hover:underline font-bold">Katalog</Link> sayfamıza yönelebilirsiniz.
                    </li>
                    <li>
                      📌 <strong>Müşterilerinizin cebinde veya cüzdanında taşıyacağı kalıcı ve pratik iletişim için:</strong> Markanızı temsil eden pürüzsüz <Link to="/kartvizit" className="text-primary hover:underline font-bold">Kartvizit</Link> modellerimizi sipariş verebilirsiniz.
                    </li>
                    <li>
                      📌 <strong>Fuar alanları, dükkan vitrinleri veya dış mekanlarda uzaktan fark edilmek için:</strong> Geniş ebatlı ve yüksek çözünürlüklü <Link to="/afis" className="text-primary hover:underline font-bold">Afiş</Link> (Poster) baskılarımızı tercih etmelisiniz.
                    </li>
                  </ul>
                </div>
              )}
              <h3 className="text-2xl font-black text-black mb-6 uppercase tracking-tight">
                {slug === 'brosur-baskida-en-dogru-kagit-nasil-secilir' ? "İlgili Ürünler" : relatedData.introTitle}
              </h3>
              
              {slug !== 'brosur-baskida-en-dogru-kagit-nasil-secilir' && slug !== 'etiket-baskida-rulo-mu-tabaka-mi' && (
                <div className="bg-primary/[0.02] border border-primary/10 p-5 rounded-2xl mb-6 text-sm text-gray-700 font-medium leading-relaxed shadow-xs">
                  <p className="mb-2 font-bold text-slate-950">
                    {relatedData.introDesc}
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600 font-semibold">
                    {relatedData.bullets.map((bullet, bIdx) => {
                      const firstColon = bullet.indexOf(':');
                      if (firstColon !== -1) {
                        const boldPart = bullet.substring(0, firstColon + 1);
                        const restPart = bullet.substring(firstColon + 1);
                        return (
                          <li key={bIdx}>
                            <strong>{boldPart}</strong>{restPart}
                          </li>
                        );
                      }
                      return <li key={bIdx}>{bullet}</li>;
                    })}
                  </ul>
                </div>
              )}

              {slug === 'el-ilani-dagitimi-ise-yariyor-mu' && (
                <div className="my-6 p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl shadow-sm animate-fade-in flex flex-col gap-6">
                  <div className="text-left">
                    <h4 className="text-lg sm:text-xl font-black text-black uppercase tracking-tight mb-2">
                      El İlanı Sipariş ve Teklif Adımları
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed max-w-4xl">
                      Bölgesel reklam kampanyanız için en uygun fiyatlı el ilanı çözümlerini inceleyin, anında teklif alın veya doğrudan WhatsApp üzerinden siparişinizi oluşturun.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Link 
                      to="/el-ilani"
                      className="px-5 py-3 bg-black hover:bg-neutral-900 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-sm transition-all duration-300 text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      El İlanı Fiyat Listesi
                    </Link>
                    <a 
                      href={WHATSAPP_LINK + "?text=El%20İlanı%20baskı%20kampanyası%20için%20özel%20fiyat%20teklifi%20almak%20istiyorum."}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-black text-xs font-black uppercase tracking-wider rounded-xl shadow-sm transition-all duration-300 text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Teklif Al
                    </a>
                    <a 
                      href={WHATSAPP_LINK + "?text=El%20İlanı%20baskı%20siparişi%20vermek%20istiyorum."}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-5 py-3 bg-primary hover:bg-secondary text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-sm transition-all duration-300 text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      WhatsApp Sipariş
                    </a>
                  </div>
                </div>
              )}

              {slug === 'etiket-baskida-rulo-mu-tabaka-mi' && (
                <div className="my-6 p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl shadow-sm animate-fade-in flex flex-col gap-6">
                  <div className="text-left">
                    <h4 className="text-lg sm:text-xl font-black text-black uppercase tracking-tight mb-2">
                      Seçtiğiniz Etiket İçin Fiyat Alın
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed max-w-4xl">
                      Ölçünüze özel teklif isteyin, uzman ekibimiz ambalaj yapınıza en doğru malzemeyi saniyeler içinde belirlesin.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Link 
                      to="/etiket"
                      className="px-5 py-3 bg-black hover:bg-neutral-900 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-sm transition-all duration-300 text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Etiket Fiyat Listesi
                    </Link>
                    <a 
                      href={WHATSAPP_LINK + "?text=Etiket%20baskı%20kampanyası%20için%20özel%20fiyat%20teklifi%20almak%20istiyorum."}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-black text-xs font-black uppercase tracking-wider rounded-xl shadow-sm transition-all duration-300 text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Teklif Al
                    </a>
                    <a 
                      href={WHATSAPP_LINK + "?text=Etiket%20baskı%20siparişi%20vermek%20istiyorum."}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-5 py-3 bg-primary hover:bg-secondary text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-sm transition-all duration-300 text-center cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      WhatsApp Sipariş
                    </a>
                  </div>
                </div>
              )}

              {slug === 'kartvizitte-mat-mi-parlak-mi' && (
                <div className="my-6 p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl shadow-sm animate-fade-in">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex px-2 py-0.5 bg-amber-500 text-white text-[10px] font-black rounded uppercase tracking-wider">
                      🎁 SEÇKİN KOMBİNASYON
                    </span>
                    <span className="text-xs text-amber-700 font-bold">%15 Toplu İndirim</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-amber-950 uppercase tracking-tight mb-2">
                    Lüks Kurumsal Kimlik Başlangıç Paketi
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-900 font-semibold leading-relaxed mb-4">
                    Kurumsal kimliğinizi bir bütün olarak inşa etmeniz ve bütçenizi korumanız için <strong>Kartvizit + Antetli Kağıt + Diplomat Zarf + Cepli Dosya</strong> ürünlerini tek bir indirimli teklif altında birleştiriyoruz. Tasarımlarınızın renk ve çizgisel dilini birbirine tam uyumlu hale getirerek firmanızın prestijini zirveye taşıyoruz.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-4 justify-between pt-2 border-t border-amber-200/50">
                    <span className="text-[11px] sm:text-xs text-amber-800 font-bold">
                      🔥 Toplu set siparişlerinde <strong>%15'e varan özel indirim</strong> fırsatı!
                    </span>
                    <a 
                      href={WHATSAPP_LINK + "?text=Luks%20Kurumsal%20Kimlik%20Seti%20teklifi%20almak%20istiyorum."}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full sm:w-auto px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-sm transition-all duration-300 text-center cursor-pointer flex items-center justify-center gap-1"
                    >
                      Özel Set Teklifi Al
                    </a>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {relatedData.products.map((prod, i) => {
                  const isImageAvailable = Boolean(prod.img && (BLOG_IMAGE_MANIFEST as Record<string, boolean>)[prod.img]);

                  return (
                    <Link 
                      key={i} 
                      to={prod.path} 
                      className="bg-white p-3 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between text-center group"
                    >
                      <div>
                        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-50 mb-2 flex flex-col items-center justify-center">
                          {isImageAvailable ? (
                            <img src={prod.img} alt={prod.alt} title={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-center p-2 bg-slate-50 border border-slate-100">
                              <span className="text-[10px] font-black text-slate-700 line-clamp-1 mb-0.5">{prod.name}</span>
                              <span className="text-[8px] font-bold text-gray-400">Ürün görseli hazırlanıyor</span>
                            </div>
                          )}
                        </div>
                        <h4 className="text-xs font-black text-slate-800 leading-snug group-hover:text-primary transition-colors">{prod.name}</h4>
                        {prod.reason && (
                          <p className="text-[9px] text-gray-400 font-bold leading-normal my-1 px-1 transition-colors group-hover:text-slate-600">{prod.reason}</p>
                        )}
                        <p className="text-[9px] text-gray-500 font-semibold mt-0.5">{prod.desc}</p>
                      </div>
                      <span className="text-[10px] text-primary font-black mt-2 inline-flex items-center justify-center gap-0.5">İncele <ArrowRight size={10} /></span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Related Posts Section (İlgili Yazılar - Up to 10 Items for SEO and Crawlability) */}
            <div className="mt-16 pt-10 border-t border-gray-100">
              <h3 className="text-2xl font-black text-black mb-6 uppercase tracking-tight">İlginizi Çekebilecek Diğer Rehberler</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 10).map((post, i) => (
                  <Link 
                    key={i} 
                    to={`/blog/${post.slug}`} 
                    className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{post.category}</span>
                      <h4 className="text-sm font-bold text-neutral-800 hover:text-primary transition-colors mt-1 leading-snug line-clamp-2">{post.title}</h4>
                      <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-[11px] text-neutral-400 font-bold uppercase">
                      <span>{post.date}</span>
                      <span className="text-primary flex items-center gap-1">Oku <ArrowRight size={12} /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Contact Box */}
            {!(slug === 'emlak-yer-gosterme-belgesi-nedir') && (
              <div className="bg-gradient-to-br from-black via-neutral-900 to-neutral-950 text-white p-8 rounded-3xl border border-neutral-800 shadow-md text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-3">Teklif Al & Sipariş Ver</h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-6 leading-relaxed">Projeleriniz için özel ölçü, adet veya toptan matbaa fiyat teklifi almak için WhatsApp üzerinden hemen bağlanın.</p>
                <div className="flex flex-col gap-2.5">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex w-full py-4 bg-primary text-white hover:bg-white hover:text-black transition-colors rounded-2xl font-bold tracking-tight text-center uppercase text-sm justify-center items-center gap-2">
                    Teklif Al & Sipariş Ver
                  </a>
                  {slug === 'brosur-baskida-en-dogru-kagit-nasil-secilir' && (
                    <Link to="/brosur" className="inline-flex w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white hover:text-white transition-all rounded-2xl font-bold tracking-tight text-center uppercase text-xs sm:text-sm justify-center items-center gap-2 border border-neutral-700">
                      Broşür Fiyat Listesini İncele
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Popular Matbaa Products Grid */}
            <div className="bg-white p-6 rounded-3xl border border-gray-150/85 shadow-sm">
              <h3 className="text-base font-black text-black mb-4 uppercase tracking-tight">Popüler Matbaa Ürünlerimiz</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Kartvizit", path: "/kartvizit" },
                  { name: "Broşür", path: "/brosur" },
                  { name: "Magnet", path: "/magnet" },
                  { name: "Kutu & Ambalaj", path: "/kutu" },
                  { name: "Amerikan Servis", path: "/amerikan-servis" },
                  { name: "Etiket Baskı", path: "/etiket" },
                  { name: "Katalog Baskı", path: "/kataloglar" },
                  { name: "Tahsilat Makbuzu", path: "/tahsilat-makbuzu" }
                ].map((prod, i) => (
                  <Link 
                    key={i} 
                    to={prod.path} 
                    className="p-3 bg-gray-50/70 hover:bg-primary/5 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center group transition-all"
                  >
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">{prod.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            {!(slug === 'emlak-yer-gosterme-belgesi-nedir') && (
              <div className="bg-neutral-50 p-6 rounded-3xl border border-gray-150/50 space-y-4">
                <div className="flex items-center gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-black uppercase">Güvenilir Baskı</h4>
                    <p className="text-[10px] text-gray-500">Topkapı’dan matbaa ve baskı hizmetleri</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-black uppercase">Hızlı Teslimat</h4>
                    <p className="text-[10px] text-gray-500">Tüm Türkiye'ye hızlı kargo seçeneği</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render Listing View
  return (
    <div className="bg-neutral-50 min-h-screen pb-24">
      <Helmet>
        <title>Matbaa ve Baskı Blogu | Grafik Tasarım Rehberi - Mavi Basım</title>
        <meta name="description" content="Broşür, kartvizit ve magnet taslakları hazırlarken bütçe koruyan, CMYK renk sapmalarını önleme yöntemlerini açıklayan rehber makaleleri matbaa blogumuzda." />
      </Helmet>

      {/* Header banner */}
      <div className="bg-black text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-primary font-bold uppercase tracking-widest text-xs">MAVİ BASIM Matbaa Akademi</span>
          <h1 className="text-3xl md:text-5xl font-black mt-3 mb-4 uppercase tracking-tight">Matbaa ve Tasarım Rehberi Kılavuzları</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Broşür, magnet, kutu ve kartvizit baskı siparişlerinizde bütçenizi en verimli şekilde kullanmanıza yaracak, renk doğruluğunu artıracak profesyonel grafik makaleleri.
          </p>
        </div>
      </div>

      {/* Grid listing */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <article key={index} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
              <div className="relative aspect-video overflow-hidden bg-neutral-100">
                <img 
                  src={post.image} 
                  alt={`${post.title} - Mavi Basım Matbaa Rehberi`} 
                  title={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-gray-400 text-xs mb-3 font-medium">
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-3">
                  <Link to={`/blog/${post.slug}`} title={`${post.title} - Detaylı Rehberi Oku`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-neutral-500 text-sm font-medium line-clamp-3 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-semibold uppercase">MAVİ BASIM Matbaa Akademi</span>
                  <Link 
                    to={`/blog/${post.slug}`} 
                    title={`${post.title} Rehberinin Tamamını Oku`}
                    className="inline-flex items-center gap-1 text-xs font-black text-primary hover:text-black transition-colors uppercase tracking-tight"
                  >
                    Tamamını Oku <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
