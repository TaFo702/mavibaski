export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
  faq?: { question: string; answer: string }[];
  faqList?: { question: string; answer: string }[];
  schemaType: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'baskiya-uygun-tasarim-nasil-hazirlanir',
    title: 'Baskıya Uygun Tasarım Nasıl Hazırlanır? Matbaa İçin Eksiksiz Rehber',
    excerpt: 'Baskıya uygun tasarım hazırlamanın tüm püf noktaları: CMYK renk modu, taşma payı (bleed), 300 DPI çözünürlük, PDF/X formatı ve yazıları eğriye çevirme kılavuzu.',
    date: '18 Temmuz 2026',
    readTime: '9 Dk Okuma',
    category: 'Tasarım & Hazırlık',
    image: '/images/hakkimizda/baskiya-uygun-tasarim-hazirlama-rehberi.webp',
    schemaType: 'Article',
    content: `## Baskıya Uygun Tasarım Hazırlama Rehberi

Grafik çalışmalarınızın ekranda göründüğü gibi matbaadan canlı, net ve hatasız çıkması için **baskıya uygun tasarım** kriterlerine dikkat edilmesi gerekir. Bu rehberimizde, grafik tasarımcıların ve işletmelerin baskı öncesinde kontrol etmesi gereken tüm teknik detayları açıklıyoruz.

### Baskıya Uygun Tasarım Nedir?
Baskıya uygun tasarım; renk modu, çözünürlük, kesim payları ve dosya formatı açısından matbaa makinelerinin (ofset ve dijital) okuyabileceği ve hatasız basabileceği standartlara sahip dijital çalışmadır.

### CMYK ve RGB Arasındaki Farklar
Ekranda gördüğünüz renkler ışık tabanlı **RGB (Red, Green, Blue)** sistemidir. Matbaa makineleri ise mürekkep tabanlı **CMYK (Cyan, Magenta, Yellow, Black)** renk modunu kullanır. RGB formatında hazırlanan tasarımlar baskıya girdiğinde renklerde solma ve sapma meydana gelebilir. Tasarımlarınızı mutlaka CMYK formatına çevirmelisiniz.

### Taşma Payı (Bleed) Neden Gereklidir?
Giyotin kesim aşamasında milimetrik kaymalar kağıt kenarlarında beyaz boşluk kalmasına neden olabilir. Bu durumu önlemek için tasarım alanınızın dışına her kenardan en az **3 mm taşma payı (bleed)** eklenmelidir.

### Kesim Payı ve Güvenli Alan Nasıl Ayarlanır?
Yazılar, logolar ve önemli kontak bilgileri kesim çizgisinin en az **3 mm ila 5 mm içerisinde (güvenli alan)** konumlandırılmalıdır. Aksi halde kesim sırasında kelimelerinizin veya logonuzun uçları kesilebilir.

### Çözünürlük (300 DPI) Neden Önemlidir?
Baskı kalitesinin pürüzsüz ve net olması için görsellerin en az **300 DPI (Dots Per Inch)** çözünürlükte hazırlanması zorunludur. İnternetten indirilen 72 DPI görseller baskıda pikselleşir ve bulanık çıkar.

### PDF/X Formatı ile Baskıya Hazır Dosya Oluşturma
Matbaaya dosya iletirken en güvenilir format **PDF/X-1a** veya **PDF/X-4** standartlarıdır. Bu format renk profillerini ve fontları dosya içerisine gömerek kaymaları önler.

### Yazıları Eğriye (Outline) Çevirme
Kullandığınız özel fontların matbaa bilgisayarında eksik olması durumunda fontlar değişebilir. Tasarımınızdaki tüm metinleri **Create Outlines (Ctrl+Shift+O)** veya **Convert to Curves (Ctrl+Q)** kısayolu ile çizgiye (eğriye) dönüştürmelisiniz.

### Baskıya Göndermeden Önce Kontrol Edilmesi Gerekenler
* Renk modunun **CMYK** olduğunu doğrulayın.
* Görsellerin en az **300 DPI** çözünürlükte olduğunu kontrol edin.
* Her kenara **3 mm taşma payı** verildiğinden emin olun.
* Metinlerin **outline (eğri)** yapıldığını onaylayın.

:::callout
TITLE: Mavi Basım Ücretsiz Teknik Kontrol Desteği
Tasarım dosyanızdan emin değilseniz; [Kartvizit](/kartvizit), [Broşür](/brosur), [El İlanı](/el-ilani), [Katalog](/kataloglar), [Etiket](/etiket) veya [Kutu](/kutu) siparişlerinizde grafik ekibimiz teknik kontrolleri ücretsiz yaparak tarafınıza PDF prova onayı sunar.
:::`,
    faq: [
      { question: "Baskı için ideal renk modu nedir?", answer: "Matbaa baskıları için tek doğru renk modu CMYK'dır." },
      { question: "Taşma payı kaç mm olmalıdır?", answer: "Genel matbaa standartlarında her kenardan 3 mm taşma payı verilmesi önerilir." }
    ]
  },
  {
    slug: 'baskili-urunlerle-pazarlama-markanizi-buyuten-matbaa-urunleri',
    title: 'Baskılı Ürünlerle Pazarlama: Markanızı Büyüten Etkili Matbaa Ürünleri',
    excerpt: 'Baskılı ürünlerle pazarlama stratejileri: Kartvizit, broşür, magnet, katalog ve ambalaj baskılarının satış artışına ve marka imajına doğrudan katkıları.',
    date: '20 Temmuz 2026',
    readTime: '11 Dk Okuma',
    category: 'Pazarlama & Strateji',
    image: '/images/hakkimizda/baskili-urunlerle-pazarlama-matbaa-urunleri.webp',
    schemaType: 'Article',
    content: `## Baskılı Ürünlerle Pazarlama Stratejileri

Dijital pazarlamanın yaygınlaşmasına rağmen, fiziksel dokunma hissi uyandıran **baskılı ürünlerle pazarlama**, potansiyel müşteriler üzerinde %70 daha kalıcı bir etki bırakmaktadır. Kaliteli basılı materyaller, markanıza güven ve kurumsallık katar.

### Baskılı Ürünlerle Pazarlama Nedir?
İşletmenizin mesajını, ürünlerini ve hizmetlerini kartvizit, broşür, katalog, etiket ve ambalaj gibi basılı matbaa materyalleri vasıtasıyla hedef kitleye ulaştırma stratejisidir.

### Broşür ve El İlanı ile Yerel Pazarlama
Yerel işletmeler, restoranlar ve mağazalar için hedef bölgedeki müşterilere ulaşmanın en hızlı yolu [Broşür](/brosur) ve [El İlanı](/el-ilani) dağıtmaktır. Kampanya ve indirim duyurularında yüksek dönüşüm sağlar.

### Kartvizitin Marka İmajına Katkısı
İlk izlenim asla ikinci kez yaşanmaz. Kaliteli kuşe veya fantezi kağıda basılmış bir [Kartvizit](/kartvizit), iş görüşmelerinizde ve fuarlarda profesyonelliğinizi temsil eder.

### Magnet ile Kalıcı Reklam Avantajı
Buzdolabı ve metal yüzeylere yapışan [Magnet](/magnet) baskılar, müşterilerinizin evinde ve ofisinde aylar boyunca göz önünde kalarak markanızın akılda kalıcılığını sağlar.

### Katalog ve Cepli Dosya ile Kurumsal Tanıtım
Ürün gamınızı detaylı sergilemek için hazırlanan bir [Katalog](/kataloglar) ve sunum klasörünüz olan [Cepli Dosya](/cepli-dosya), kurumsal müşterilerinizin satın alma kararlarını doğrudan etkiler.

### Etiket ve Ambalaj Baskılarının Satışa Etkisi
Raftaki ürünün albenisini belirleyen en temel unsur [Etiket](/etiket) ve ürün kutusudur. Özel tasarımlı kaliteli ambalaj baskıları, ürünün algılanan değerini ve satış fiyatını artırır.

### Restoranlar İçin Amerikan Servis ve Menü Baskıları
Gıda sektöründeki işletmeler için masada hijyen sağlayan [Amerikan Servis](/amerikan-servis) ve iştah kabartan [Menü Baskıları](/menu-baski), müşteri memnuniyetini yükseltir.

### İşletmeniz İçin Doğru Baskılı Ürün Nasıl Seçilir?
Bütçenize ve sektörünüze uygun ürün grubunu belirlerken hedef kitlenizin kullanım alışkanlıklarını analiz etmeli ve doğrudan üretici matbaa firmalarından toptan fiyat avantajı almalısınız.

:::callout
TITLE: Kurumsal Pazarlama Ürünlerinde Toptan Fiyat Fırsatı
Mavi Basım Topkapı üretim merkezinden tüm pazarlama ürünlerinizi doğrudan imalatçı fiyatlarıyla sipariş edebilir, Türkiye geneli kargo imkanından faydalanabilirsiniz.
:::`,
    faq: [
      { question: "En etkili yerel reklam aracı hangisidir?", answer: "A5 veya kırımlı kuşe broşürler ile yapışkanlı magnetler yerel pazarlamada en yüksek dönüş sağlayan araçlardır." }
    ]
  },
  {
    slug: 'kaliteli-baski-nasil-anlasilir',
    title: 'Kaliteli Baskı Nasıl Anlaşılır? Profesyonel Matbaa Seçim Rehberi',
    excerpt: 'Kurumsal tanıtım evraklarında kaliteli baskıyı anlamanın pratik yollarını, renk doğruluğu, kağıt seçimi ve mürekkep detaylarıyla inceleyin.',
    date: '12 Temmuz 2026',
    readTime: '5 Dk Okuma',
    category: 'Matbaa Akademi',
    image: '/images/hakkimizda/kaliteli-baski-nasil-anlasilir-matbaa-secim-rehberi.webp',
    schemaType: 'Article',
    content: `## Kaliteli Baskı Nasıl Anlaşılır?

Profesyonel bir tanıtım veya kurumsal kimlik çalışması için kaliteli baskı, işletmenizin prestijini doğrudan belirler. Google aramalarında en çok merak edilen sorulardan biri olan **"Kaliteli Baskı Nasıl Anlaşılır?"** sorusunu, uzman imalat tecrübemizle cevaplıyoruz.

### 1. Renklerin Doğruluğu ve Canlılığı
İyi bir baskı, tasarım dosyasındaki renk kodları (özellikle **CMYK** formatı) ile birebir örtüşmelidir. Renk geçişlerinde pürüz, solma veya noktasal kaymalar olmamalıdır. Mavi Basım gibi **Profesyonel Matbaa Firmaları** bu uyumu yakalamak için Heidelberg gibi uluslararası standartlardaki baskı makineleriyle çalışır.

### 2. Kesim Hassasiyeti ve Taşma Payı
Sıfır hata ile üretilmiş bir broşür veya kartvizitte kenar kesimleri pürüzsüz ve simetrik olmalıdır. Kesim giyotinlerinin kalitesi ve milimetrik doğruluğu, ürünün lüks hissini doğrudan artırır.

### 3. Kullanılan Kağıdın ve Malzemenin Tokluğu
Baskı yapılan kağıdın türü ve gramajı son derece önemlidir. Örneğin, 350g kuşe kartvizitler veya 250g Amerikan Bristol karton çantalar tok duruşuyla yüksek kaliteli baskı hissiyatı uyandırır.

:::callout
TITLE: Güvenilir Matbaa Hizmeti Farkı
Mavi Basım olarak baskıya girmeden önce tüm tasarımlarınızı teknik kontrolden geçirip size dijital mizanpaj provası sunuyor ve yazılı onayınızdan sonra üretime başlıyoruz.
:::`,
    faq: [
      { question: "Kaliteli kartvizit baskı nasıl olmalıdır?", answer: "Tok bir kağıda (en az 350 gr kuşe veya fantezi kağıt), net renklere ve pürüzsüz kesim kenarlarına sahip olmalıdır." }
    ]
  },
  {
    slug: 'baski-kalitesini-etkileyen-faktorler',
    title: 'Baskı Kalitesini Etkileyen Faktörler ve Teknik Detaylar',
    excerpt: 'Çözünürlük, CMYK renk yönetimi, makine parkuru kalitesi ve mücellit sonlandırma işlemlerinin nihai baskı kalitesine olan doğrudan etkileri.',
    date: '10 Temmuz 2026',
    readTime: '6 Dk Okuma',
    category: 'Baskı Teknolojileri',
    image: '/images/hakkimizda/baski-kalitesini-etkileyen-faktorler-teknik-detaylar.webp',
    schemaType: 'Article',
    content: `## Baskı Kalitesini Etkileyen Temel Faktörler

Matbaadan çıkan bir ürünün kalitesi, sadece baskı makinesinin düğmesine basmaktan ibaret değildir. Kusursuz bir **Yüksek Baskı Kalitesi** elde etmek için şu teknik kriterlere dikkat edilmesi gerekir:

### 1. Tasarım Dosyasının Çözünürlüğü
Baskıya gönderilen görsel ve grafiklerin en az **300 DPI** çözünürlükte olması gerekir. Düşük çözünürlükle hazırlanan çalışmalar ne kadar kaliteli makinede basılırsa basılsın pikselleşme veya bulanıklık yapacaktır.

### 2. Doğru Renk Modu (CMYK)
Ekranda gördüğünüz RGB renkler ışık tabanlıdır. Matbaa makinelerinde ise mürekkep tabanlı CMYK sistemi kullanılır. RGB olarak tasarlanan çalışmalar baskıda matlaşabilir. Tasarımlarınızı mutlaka CMYK formatında kaydetmelisiniz.

### 3. Makine Parkuru ve Mürekkep Seçimi
Modern Heidelberg ofset baskı makineleri ve yüksek çözünürlüklü dijital baskı parkurları, kağıt üzerine uygulanan boya kalınlığını bilgisayar kontrolü ile milimetrik ayarlar. Bu durum kurumsal renklerinizin her baskıda birebir aynı çıkmasını sağlar.`,
    faq: [
      { question: "Baskı kalitesi için en iyi çözünürlük nedir?", answer: "Baskılı tüm materyaller için en ideal çözünürlük 300 DPI (dots per inch) değeridir." }
    ]
  },
  {
    slug: 'matbaa-fiyatlarini-neler-belirler',
    title: 'Matbaa Fiyatlarını Neler Belirler? Uygun Maliyetli Baskı İpuçları',
    excerpt: 'Tiraj, ebat, kağıt gramajı ve sonlandırma işçiliklerinin matbaa fiyatları üzerindeki etkisi ve bütçe dostu, doğrudan üretim avantajları.',
    date: '08 Temmuz 2026',
    readTime: '5 Dk Okuma',
    category: 'Fiyat Rehberi',
    image: '/images/hakkimizda/matbaa-fiyatlarini-neler-belirler-maliyet-ipuclari.webp',
    schemaType: 'Article',
    content: `## Matbaa Fiyatlarını Belirleyen Temel Unsurlar

İşletmeler bütçelerini yönetirken **"Uygun Fiyatlı Matbaa"** ve **"Uygun Maliyetli Baskı"** arayışına girerler. Fiyat listelerini ve maliyetleri doğrudan etkileyen parametreleri bilmek, bütçenizi en verimli şekilde kullanmanızı sağlar.

### 1. Sipariş Tirajı (Adet)
Ofset baskıda adet yükseldikçe birim maliyet inanılmaz ölçüde düşer. Kalıp ve kurulum maliyeti sabit olduğundan, 1000 adet broşür ile 5000 adet broşür arasındaki toplam fiyat farkı çok azdır. Kurumsal işlerinizde yüksek adetleri tercih etmek size **Fabrika Fiyatları** avantajı sunar.

### 2. Kağıt Gramajı ve Malzeme Türü
Kullanılan kağıdın kalınlığı (115g, 135g, 170g, 350g) ve cinsi (kuşe, Amerikan Bristol, fantezi kağıt, kraft) fiyatı doğrudan etkiler. Dağıtım amaçlı el ilanlarında 115g veya 135g kuşe kağıtlar en ekonomik çözümdür.

### 3. Özel İşçilikler ve Sonlandırma
Selefon kaplama, kısmi lokal lak, gofre kabartma ve sıcak altın/gümüş varak yaldız gibi işlemler ek işçilik ve kalıp gerektirdiği için maliyeti artırır. Ancak markanıza yüksek bir prestij kazandırdığı için kurumsal kutu ve kartvizitlerde sıklıkla tercih edilir.

:::callout
TITLE: Doğrudan Üretim Avantajı
Mavi Basım olarak Topkapı fabrikamızda gerçekleştirdiğimiz aracısız üretimlerle, müşterilerimize piyasadaki en ekonomik toptan matbaa fiyatlarını sunuyoruz.
:::`,
    faq: [
      { question: "En uygun fiyatlı broşür baskı nasıl yapılır?", answer: "115g veya 135g kuşe kağıt tercih edilerek ve yüksek adetli (ofset) basılarak en uygun maliyet yakalanır." }
    ]
  },
  {
    slug: 'hizli-uretim-sureci-nasil-planlanir',
    title: 'Hızlı Üretim Süreci Nasıl Planlanır? Acil Matbaa ve Hızlı Baskı Çözümleri',
    excerpt: 'İşletmeler için zaman kazandıran hızlı dijital baskı çözümleri, grafik mizanpaj hızı ve aynı gün PDF onay süreçlerinin planlanması.',
    date: '06 Temmuz 2026',
    readTime: '5 Dk Okuma',
    category: 'Üretim ve Lojistik',
    image: '/images/hakkimizda/hizli-uretim-sureci-acil-matbaa-baski.webp',
    schemaType: 'Article',
    content: `## Hızlı Baskı ve Hızlı Matbaa Sipariş Planlaması

Zamanın en değerli sermaye olduğu günümüzde, acil fuar katılımları, lansmanlar veya kurumsal evrak ihtiyaçları için **"Hızlı Matbaa"** ve **"Hızlı Baskı"** vazgeçilmez hale gelir. Peki, süreçlerinizi aksatmadan en hızlı üretimi nasıl planlayabilirsiniz?

### 1. Doğru Tasarım Dosyası Hazırlama
Sürecin yavaşlamasındaki en büyük etken hatalı tasarım dosyalarıdır. Tasarımınızın kesim çizgileri, taşma payları ve CMYK renk formatı baskıya uygun hazırlandığında, onay süresi dakikalara iner.

### 2. Dijital Baskı Teknolojisinden Yararlanma
Eğer sipariş adetleriniz düşükse veya çok acilse, kalıp hazırlama süresi gerektirmeyen yüksek kaliteli dijital baskı ünitelerimizi tercih edebilirsiniz. Bu teknolojiyle az adetli etiketler, kartvizitler veya broşürler aynı gün üretilebilir.

### 3. Hızlı Onay ve İletişim
Mavi Basım'ın sunduğu **"Aynı Gün PDF Prova Onayı"** sistemi sayesinde, grafik ekibimiz çalışmanızı 1-2 saat içinde kontrol eder. WhatsApp üzerinden vereceğiniz hızlı yazılı onay ile baskı süreci anında başlatılır.`,
    faq: [
      { question: "Acil matbaa siparişlerinde teslimat ne kadar sürer?", answer: "Hızlı dijital baskılı işler 24-48 saat içinde tamamlanarak kargoya teslim edilmektedir." }
    ]
  },
      {
    slug: 'brosur-baskida-en-dogru-kagit-nasil-secilir',
    title: 'Broşür İçin En Uygun Kağıt Hangisi? Ölçüler, Gramajlar ve Baskı Rehberi',
    excerpt: 'Tanıtım materyallerinin tasarım ve üretim süreçlerinde 115 gr, 135 gr ve 170 gr kuşe kağıtlar arasındaki farkları, kullanım alanlarını ve doğru dosya hazırlama detaylarını öğrenin.',
    date: '21 Mayıs 2026',
    readTime: '8 Dk Okuma',
    category: 'Broşür & Reklam',
    image: '/images/brosur/brosur-tasarimi-ve-baski.webp',
    schemaType: 'Article',
    content: `## Kağıt Seçiminin Tanıtım Materyallerindeki Önemi

Broşür ve benzeri basılı pazarlama materyallerinde doğru kağıt cinsi ve gramaj seçimi; renklerin canlılığını, görsellerin netliğini ve tanıtım belgesinin dayanıklılığını doğrudan belirler. Uygun kağıt tercihi sayesinde hem şık bir görünüm elde edilir hem de marka kimliği hedef kitleye aktarılır. Kullanım amacına göre doğru kağıt ve baskı parametrelerinin seçilmesi, üretim bütçesini dengelerken tanıtım çalışmalarının verimini artırır.

Tanıtım materyallerinde kağıdın dokusu, mürekkep emme kapasitesi ve ışığı yansıtma biçimi tasarımın algısını değiştirir. Örneğin, parlak yüzeyli kaplamalı kağıtlar fotoğraflardaki renk doygunluğunu artırırken; mat kaplamalı kağıtlar ise yoğun metinlerin yansıma yapmadan kolayca okunmasını sağlar.

![Doğru Gramaj Seçimi](/images/brosur/katlamali-brosur-baski.webp "Gramaj ve Kağıt Türü Karşılaştırması")

:::callout
TITLE: Mavi Basım Üretim Deneyimine Göre Gramaj Tercihleri
Mavi Basım'ın geniş üretim portföyü ve sipariş verilerine dayanan kurumsal verilerine göre kağıt kalınlığı tercihleri şu şekildedir:
- **Sık Kullanılan Gramaj:** Siparişlerin büyük çoğunluğunda en popüler kalınlık olan **135 gr kuşe** kağıt tercih edilmektedir.
- **Hafif Dağıtım Gramajı:** Kurye ve sokak dağıtımları gibi bütçe odaklı işlerde en ekonomik seçenek olan **115 gr kuşe** kağıt tercih edilmektedir.
- **Prestijli Lansman Gramajı:** Klinik bilgilendirmeleri, gayrimenkul katalogları ve özel lansmanlarda tok duruşuyla **170 gr kuşe** kağıt öne çıkmaktadır.
:::

### Broşür Hangi Kağıda Basılır?

Renkli tasarımlarda kuşe kağıtlar, mürekkep performansını iyi yansıtan seçenektir. Ürün fotoğraflarının ön planda olduğu tanıtımlarda parlak kuşe ön plana çıkarken, bilgi ağırlıklı bültenlerde mat kuşe kağıtlar sıklıkla kullanılır. Kalemle üzerine not alınması veya form doldurulması gereken özel bültenlerde ise mürekkebi emen ve yazımı kolaylaştıran 1. hamur kağıtlar kullanılır. (Detaylı bilgi için ➡️ [Kuşe Kağıt Nedir?](/blog/kuve-kagit-ve-bristol-karton-farklari) rehberimizi inceleyebilirsiniz. Gramaj seçimi yaparken kararsız kaldıysanız [115 gr Kuşe mi 135 gr Kuşe mi?](/blog/115-gr-mi-135-gr-mi) ya da [135 gr ile 170 gr Kuşe Arasındaki Farklar](/blog/135-gr-ve-170-gr-kuse-farklari) karşılaştırma kılavuzlarımıza göz atabilirsiniz.)

---

## Broşür Baskı Süreci

Baskı süreci, tasarım aşamasındaki ölçülerden katlama işlemlerine kadar titiz bir planlama gerektirir. Baskı yöntemlerinin farklarını detaylı incelemek için **[Ofset Baskı ile Dijital Baskı Arasındaki Farklar](/blog/ofset-baski-ile-dijital-baski-farklari)** rehberimize göz atabilirsiniz. Süreç temel olarak şu aşamalardan oluşur:

#### 1. Baskı Yönteminin Belirlenmesi

Sipariş adedine göre uygun yöntemi belirliyoruz. Yüksek tirajlı (1000 adet ve üzeri) çalışmalarda, ofset baskı makineleri kullanılarak birim maliyetler minimize edilir. Ofset baskıda kurulum maliyetleri yüksek adetlere bölündüğünden son derece bütçe dostu bir fiyat sunar. Düşük adetli veya hızlı teslimat gerektiren işlerde ise kalıp gerektirmeyen, doğrudan toner veya dijital mürekkep transferi yapan hızlı dijital baskı sistemleri öncelikli olarak devreye girer.

#### 2. Baskı ve Prova Onayı

Tasarımın son hali, kesim çizgileri ve katlama kırım noktaları işaretlenmiş şekilde PDF prova olarak onayınıza sunulur. Onayınızın ardından üretim başlatılır.

#### 3. Kesim ve Katlama (Kırım)

Baskısı tamamlanan tabaka kağıtlar, giyotin kesim makinelerinde kesilir. Ardından talebe göre tek kırımlı, çift kırımlı veya akordeon katlama işlemlerine tabi tutulur.

#### 4. Kalite Kontrol ve Sevkiyat

Üretimi tamamlanan tüm materyaller; renk yoğunluğu, katlama doğruluğu ve kesim kalitesi açısından kontrol edilir. Ürünler, taşıma esnasında zarar görmeyecek şekilde korunaklı paketlenerek gönderime hazır hale getirilir.

### Ortalama Üretim ve Teslim Süresi

Kullanıcı sipariş verdiğinde ürünün ne zaman eline ulaşacağını saniyeler içinde görebilmesi için hazırladığımız güncel imalat ve teslimat tablosu aşağıdaki gibidir:

| Baskı Türü / İşlem | Ortalama Üretim Süresi | Kargo / Teslimat Süresi |
| :--- | :--- | :--- |
| **Dijital Baskı** (Az Adetli) | 24 - 48 Saat | 1 - 2 İş Günü |
| **Ofset Baskı** (Yüksek Adetli) | 3 - 5 İş Günü | 1 - 2 İş Günü |
| **Katlamalı Broşür** (Ek Kırım İşçilikli) | 4 - 5 İş Günü | 1 - 2 İş Günü |

### Anadolu ve Uzaktan Sipariş Süreci

Türkiye'nin neresinde olursanız olun, Mavi Basım olarak uzaktan sipariş süreçlerinizi tamamen şeffaf ve güvenli bir şekilde yönetiyoruz:
1. **Online Dosya İletimi ve Teknik Kontrol:** Web sitemiz veya WhatsApp üzerinden siparişinizi oluşturup tasarımınızı gönderirsiniz.
2. **Ücretsiz Dijital PDF Prova Onayı:** Grafik departmanımız dosyanızı kontrol edip hazırladığı yüksek çözünürlüklü dijital PDF provayı onayınıza sunar. Sizin onayınız olmadan üretime kesinlikle başlanmaz.
3. **Ofset Üretim:** Onaylanan tasarımınız Topkapı fabrikamızdaki modern ofset tesislerimizde hızla basılır ve katlanır.
4. **Hasarsız Kargo ve Teslimat:** Özenle çift oluklu kolilerle paketlenen broşürleriniz, anlaşmalı kargo firmalarımızla Türkiye'nin 81 ilindeki adresinize kargo takip numarasıyla güvenle sevk edilir.

---

## Broşür Kaç Gram Olmalı?

| Kullanım Senaryosu / İhtiyaç | Önerilen Gramaj | Tercih Nedeni ve Avantajı |
| :--- | :--- | :--- |
| **Kurye Dağıtımı ve Posta Kutuları** | 115 gr Kuşe | Hafif yapısıyla kolay katlanır, dağıtım maliyetlerini ve bütçeyi minimuma indirir. |
| **Kurumsal Tanıtım ve Standlar** | 135 gr Kuşe | Sektör standardıdır; ne çok ince ne çok kalındır. Fiyat/performans dengesi mükemmeldir. |
| **Lüks Lansman, Emlak ve Klinikler** | 170 gr Kuşe | Oldukça tok ve prestijli bir duruş sergiler, kolay yıpranmaz, seçkin bir marka algısı yaratır. |

### Hangi Broşürü Seçmeliyim? (Gramaj + Selefon + Katlama + Adet Karar Tablosu)

Aşağıdaki detaylı karar tablosu, bütçenize ve kullanım amacınıza en uygun broşür kombinasyonunu (gramaj, selefon koruması, katlama şekli ve ideal üretim adedi) saniyeler içinde belirlemenizi sağlar:

| Kullanım Amacı | Önerilen Gramaj | Selefon Tercihi | Katlama Tipi | Önerilen Baskı Adedi | Kimler İçin Uygun? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Kampanya dağıtımı** | 115 gr | Selefonsuz | Katlamasız | 5.000+ adet | Yaygın sokak, kurye dağıtımları ve posta kutuları için |
| **Kurumsal firma tanıtımı** | 135 gr | Mat Selefon | Çift Kırım | 1.000 adet | Ofis içi, stantlar ve standart kurumsal tanıtımlar için |
| **Premium katalog tarzı tanıtım** | 170 gr | Mat Selefon | Akordeon | 500-1.000 adet | Lüks lansman, emlak ve seçkin klinik tanıtımları için |

<br/>

:::callout
TITLE: 🖐️ Kağıt Gramajlarının Eldeki Hissiyatı ve Kalınlık Karşılaştırması
Sipariş vermeden önce kağıdın elinizde nasıl duracağını tahmin etmek için bu pratik karşılaştırmaya göz atabilirsiniz:
- **115 gr Kuşe Kağıt (Ekonomik):** Standart A4 fotokopi kağıdından (80 gr) yaklaşık %45 daha tok ve kalındır. Magazin iç sayfaları veya el ilanları benzeri, kolay bükülebilen, hafif bir his verir.
- **135 gr Kuşe Kağıt (Standart):** İdeal bir broşür kalınlığıdır. Kaliteli broşürlerin ve tanıtım bültenlerinin elinizde duruşu gibidir; bükülmeye karşı hafif dirençlidir ve tok bir his bırakır.
- **170 gr Kuşe Kağıt (Premium):** Oldukça tok, kalın ve lüks bir kartonumsudur. Prestijli marka kataloglarının kapakları veya seçkin klinik broşürleri gibi bükülmeye karşı dirençli, ağırbaşlı ve üst düzey bir prestij hissi sunar.
:::

Baskıda kullanılacak kağıdın gramajı (metrekare başına düşen gram ağırlığı), tanıtım materyalinin ömrünü, el hissini ve bütçeyi doğrudan belirler. En popüler gramajlar şunlardır:

- **115 gr Kuşe Kağıt:** Hafifliği sayesinde kurye veya sokak dağıtımları için uygun ve bütçe dostu bir alternatiftir. Detaylı karşılaştırma için **➡️ [115 gr mı 135 gr mı?](/blog/115-gr-mi-135-gr-mi)** rehberimizi inceleyebilirsiniz.
- **135 gr Kuşe Kağıt:** Sektör standardı olarak kabul edilen en popüler gramajdır. Fiyat ve performans dengesi yüksek bir seçenektir. Tok duruşuyla hem firma tanıtımlarında hem de geniş kitle dağıtımlarında güvenle kullanılır.
- **170 gr Kuşe Kağıt:** Kalın ve tok bir yapıya sahiptir. Seçkin lansmanlar, klinik bilgilendirme broşürleri, emlak sunumları ve resmi belgeler için etkileyici bir görünüm yaratır.

---

## Sektörel Malzeme ve Tasarım Önerileri

Farklı iş kollarında tanıtım faaliyetlerinin hedefine ulaşması için önerilen en ideal malzeme eşleşmeleri ve tasarım tüyoları şunlardır:

- **Restoran & Kafe:** Canlı yemek fotoğrafları için **135 gr parlak kuşe** veya **170 gr mat kuşe** tercih edilmeli, iştah açıcı ve kokusuz bitkisel soya bazlı mürekkepler kullanılmalıdır.
- **Sağlık & Klinik:** Steril ve seçkin bir algı için yumuşak tonlar barındıran, yansıma yapmayan pürüzsüz **170 gr mat kuşe** kağıt kullanılmalıdır.
- **Gayrimenkul & İnşaat:** Kat planları ve lüks konut sunumlarında ağır ve tok duruşuyla prestij yaratan **170 gr mat kuşe** tercih edilmelidir.
- **Turizm & Seyahat:** Stantlarda ve acentelerde kolayca cebe sığan portatif dikey kırım DL boyutu ile **135 gr kuşe** kağıt mükemmel sonuç verir.
- **Eğitim Kurumları:** Kayıt döneminde sunulan müfredat ve broşürlerde A4 kırım katlamalı **135 gr veya 170 gr kuşe** kağıtlar idealdir.

---

## Ölçüler ve Katlama Çeşitleri

Standart ölçüler genellikle A4, A5, A6 ve DL formatlarından oluşur. Kullanım amacı, katlama (kırım) şekli ve içerik yoğunluğu doğru ebatın belirlenmesinde önemli rol oynar. Mavi Basım matbaamızda uyguladığımız akordeon, c-kırım, kapı katlama gibi tüm profesyonel kırım tekniklerini ve güncel şablonları yakından incelemek için [Broşür Baskı ürün sayfamızı](/brosur) ziyaret edebilirsiniz.

| Standart Ebat | Milimetre (mm) | Santimetre (cm) | İnç (inch) | En Sık Kullanım Alanı ve Amacı |
| :--- | :--- | :--- | :--- | :--- |
| **A4 Ebat** | 210 x 297 mm | 21.0 x 29.7 cm | 8.27 x 11.69 inch | Detaylı ürün tanıtımları ve kurumsal sunum materyalleri |
| **A5 Ebat** | 148 x 210 mm | 14.8 x 21.0 cm | 5.83 x 8.27 inch | Klasik el ilanı, firma tanıtım kağıdı ve promosyon baskısı |
| **A6 Ebat** | 105 x 148 mm | 10.5 x 14.8 cm | 4.13 x 5.83 inch | Portatif el ilanları ve indirim duyuruları |
| **DL Ebat** | 99 x 210 mm | 9.9 x 21.0 cm | 3.90 x 8.27 inch | Şık dikey formda restoran menüsü, cafe ilanları ve el broşürleri |

### En Sık Kullanılan Ebatlar

Standart baskı ebatları dendiğinde akla ilk gelenler A4, A5 ve DL formatlarıdır. Bu ölçüler, hem baskı tabakalarının firesiz kullanılmasına imkan tanır hem de kargo ve dağıtım maliyetlerini optimize eder. Tasarımınızın amacına göre dikey veya yatay olarak bu standart ölçüleri seçmek sağlıklı bir yaklaşımdır.

:::callout
TITLE: 📦 Ebat Seçiminin Koli Hacmi ve Kargo/Dağıtım Maliyetlerine Etkisi
Yüksek adetli siparişlerde ve geniş kitle dağıtımlarında seçeceğiniz broşür ebadı, koli hacmini ve dolayısıyla kargo ile sokak dağıtım bütçenizi doğrudan etkiler:
- **DL ve A5 Ebatlar (Hafif & Kompakt):** A4 ebadına kıyasla koli bazında %50 daha az hacim ve ağırlık kaplar. Bu sayede kargo gönderim maliyetlerinde ciddi tasarruf sağlar, elden sokak dağıtımlarında veya posta kutusu yerleştirmelerinde dağıtıcı personel için muazzam taşıma kolaylığı sunar.
- **A4 Ebatlar (Büyük & Hacimli):** Geniş bilgi alanı sunsa da kolilenmesi ve taşınması daha ağırdır. Yüksek adetli (örneğin 5.000+ adet) A4 siparişlerinde koli hacmi artacağından, sevkiyat ve nakliye süreçlerini ya da dağıtım bütçesini bu ek ağırlığa göre planlamanız önerilir.
:::

| Sektör Grubu | Tercih Edilen Ebat | Tercih Nedeni ve Sektörel Kullanım |
| :--- | :--- | :--- |
| **Restoran & Kafe** | **A5 veya DL Ebat** | Menü listeleri ve paket servis broşürleri için idealdir, az yer kaplar ve cebe rahat sığar. |
| **Emlak & İnşaat** | **A4 Ebat** | Büyük kat planlarını, yüksek çözünürlüklü bina renderlarını ve projeleri göstermek için geniş alan sunar. |
| **Klinik & Sağlık** | **A5 veya DL Ebat** | Hizmetlerin, operasyon süreçlerinin ve uzman kadronun hijyenik, kompakt ve şık tanıtımı için uygundur. |
| **Okul & Eğitim** | **A4 Ebat** | Müfredat detayları, eğitim paketleri ve kayıt formlarının detaylıca listelenmesini sağlar. |
| **Fuar & Lansman** | **A5 veya A6 Ebat** | Stantlarda ziyaretçilerin eline kolayca verilebilecek, çanta içinde kırışmayacak portatif ebatlardır. |

#### A4 Broşür Kullanım Alanları

A4 broşürler, geniş ebatları sayesinde zengin ve detaylı bilgi sunmak isteyen işletmeler için uygundur:

- **Kapsamlı Ürün Sunumları:** Çok sayıda ürünün, görselin ve teknik özelliğin bir arada sunulması gereken durumlar.
- **Fiyat Listeleri ve Menüler:** Tabloların ve detaylı listelerin kolayca okunmasını sağlayan tasarımlar.
- **Proje Tanıtımları:** İnşaat, mimarlık ve emlak projelerinde büyük kat planlarını ve görselleri sergilemek.

#### A5 Broşür Kullanım Alanları

A5 broşürler, pratik boyutları ve uygun üretim maliyetleriyle elden dağıtım ve kitle reklamlarında popüler seçenektir:

- **Kampanya ve İndirim Duyuruları:** Mağaza açılışları, indirim günleri veya özel gün kampanyaları için el broşürleri.
- **Restoran ve Kafe İlanları:** Paket servis menüleri ve lokasyon odaklı promosyonlar.
- **Fuar ve Elden Dağıtım:** Fuarlarda stant ziyaretçilerine sunulabilecek, taşınması ve cebe/çantaya konulması kolay tanıtım kağıtları.

---

## Karşılaştırmalı Broşür ve Seçim Kriterleri

Bütçe ve verimliliği optimize etmek için hızlı özet:

| Seçim Kriteri | Seçenek A | Seçenek B | En Uygun Kullanım Senaryosu | Maliyet Seviyesi |
| :--- | :--- | :--- | :--- | :--- |
| **Format** | **El İlanı** (Katlamasız & Ekonomik) | **Broşür** (Katlamalı & Detaylı) | Hızlı kitle dağıtımları için el ilanı, kapsamlı firma/hizmet tanıtımları için broşür tercih edilir. | **El İlanı:** Ekonomik <br/> **Broşür:** Orta / Prestijli |
| **Ebat** | **A5 Ebat** (Pratik & Kolay Taşınır) | **A4 Ebat** (Geniş Bilgi Alanı) | Taşınabilirlik ve elden dağıtım için A5, zengin görsel ve detaylı tablolar için A4 seçilir. | **A5:** Ekonomik <br/> **A4:** Orta Seviye |
| **Baskı Yöntemi** | **Dijital Baskı** (Hızlı & Az Adetli) | **Ofset Baskı** (Ekonomik & Yüksek Adetli) | Acil ve 1000 adet altı işler için dijital; 1000 adet ve üzeri yüksek tirajlar için ofset baskı uygundur. | **Dijital:** Orta <br/> **Ofset:** Düşük Birim Maliyet (Yüksek Adette) |

:::cta
TITLE: Güncel Broşür Fiyatlarını İnceleyin
DESC: Broşür tipinize, ebatına ve baskı adetine karar verdiyseniz, hemen fiyat listelerimizi inceleyebilir veya özel talepleriniz için ekibimizden özel ölçü ve adet teklifi alabilirsiniz.
BTN_TEXT: Broşür Fiyatlarını İncele
BTN_LINK: /brosur
BTN_TEXT_2: Özel Ölçü ve Adet İçin Teklif Al
BTN_LINK_2: https://wa.me/905366022373?text=Brosur%20icin%20ozel%20olcu%20ve%20adet%20teklifi%20almak%20istiyorum.
:::

---

## Baskı Öncesi Dosya Hazırlama ve Temel Kurallar

Kusursuz bir baskı sonucu elde etmek ve baskı öncesindeki hataları önlemek için tasarım dosyalarınızı hazırlarken şu temel kurallara dikkat etmelisiniz:

1. **CMYK Renk Modu:** Tasarım dosyalarında ekran tabanlı RGB yerine matbaa tabanlı CMYK renk modeli kullanılmalıdır. Bu sayede ekrandaki renkler ile basılan ürün arasındaki fark minimum seviyeye indirilir.
2. **300 DPI Çözünürlük:** Web sitelerinden indirilen düşük çözünürlüklü görseller baskıda bulanık görünebilir. Kaliteli bir baskı için tasarımdaki tüm görsellerin yüksek çözünürlüklü olması gerekir.
3. **Bleed (+3 mm Taşma Payı):** Kesim makinelerinin kayma payları nedeniyle kenarlarda beyaz boşluk kalmasını önlemek için tasarımın her kenarından en az +3 mm taşma payı bırakılmalıdır. Örneğin, nihai boyutu 148x210 mm olan bir A5 broşürün tasarım dosyası 154x216 mm olarak ayarlanmalıdır.
4. **Safe Area (5 mm Güvenli Alan):** İletişim bilgileri ve logolar gibi önemli içeriklerin kesilmesini önlemek için, bu öğeleri kesim çizgisinden en az 5 mm içeriye yerleştirmelisiniz.
5. **Yazı ve Renk Ayarları:** Baskıda yazıların kaymasını veya bulanıklaşmasını önlemek için fontlar vektörel eğrilere (convert) dönüştürülmeli ve ince siyah metinlerde netlik için tek renk siyah tercih edilmelidir.

:::callout
TITLE: 📐 Hazır Baskı Şablonları ile Zaman Kazanın
Tasarımınızı sıfırdan hazırlarken ölçü, kesim payı veya kırım çizgileriyle vakit kaybetmek istemiyorsanız; **A4, A5, A6 ve DL** ebatlarındaki hazır broşür baskı şablonlarımızı indirerek çalışmanızı doğrudan bu şablonlar üzerinde tasarlayabilirsiniz. Hemen [Broşür Ürün Sayfamıza](/brosur) geçiş yaparak şablonları edinebilirsiniz.
:::

---

## Üretim ve Kalite Kriterleri

Baskı siparişlerinizin sorunsuz tamamlanması için matbaa üretim süreçlerinde şu standartlar uygulanır:

- **Standart Üretim Süreleri:** Ofset baskı işleri 3-5 iş gününde, hızlı dijital işler ise 24-48 saatlik sürelerde tamamlanarak sevkiyata hazır edilir.
- **Baskı Öncesi Ücretsiz Kontrol Kapsamı:** Grafik departmanımız, ilettiğiniz her broşür tasarım dosyasını baskıya girmeden önce yasal taşma payı (bleed), CMYK renk uzayı, 300 DPI görsel çözünürlüğü, yazı fontlarının convert kontrolü ve katlama kırım çizgileri açısından ücretsiz olarak teknik kontrolden geçirir. Hatasız bir baskı için onayınıza sunulur.
- **Dayanıklı Ambalaj:** Bitmiş ürünler taşıma esnasında nemden ve darbelerden zarar görmeyecek mukavemetli paketlerde muhafaza edilerek ulaştırılır.

:::cta
TITLE: Ücretsiz Dosya Kontrolü ve Fiyat Teklifi
DESC: Tasarımınızı hemen kontrol ettirmek ve fiyat teklifi almak için bizimle iletişime geçebilir ya da doğrudan güncel fiyatlarımızı karşılaştırabilirsiniz.
BTN_TEXT: WhatsApp ile Teklif Al
BTN_LINK: https://wa.me/905366022373?text=Brosur%20tasarimi%20kontrolu%20ve%20fiyat%20teklifi%20almak%20istiyorum.
BTN_TEXT_2: Güncel Broşür Fiyat Listesini İncele
BTN_LINK_2: /brosur
:::`,
    faq: [
      {
        question: 'Tasarım desteği veriyor musunuz?',
        answer: 'Evet. Deneyimli grafik tasarım ekibimiz, sipariş veren tüm müşterilerimiz için mizanpaj ve teknik düzenleme desteğini ücretsiz olarak sunmaktadır.'
      },
      {
        question: 'Minimum sipariş miktarı nedir?',
        answer: 'Ofset üretimde kalıp ve hazırlık maliyetlerinden ötürü ekonomik bir birim fiyat sunabilmek amacıyla minimum sipariş adedi genellikle 1000 adettir. Dijital sistemlerde ise az adetli siparişler de verilebilmektedir.'
      },
      {
        question: 'Aynı tasarımdan tekrar sipariş verebilir miyim?',
        answer: 'Evet. Sipariş ettiğiniz tasarımlar Mavi Basım arşivlerinde güvenli şekilde saklanmaktadır. Tekrar sipariş vermek istediğinizde tasarımınızda değişiklik yoksa doğrudan üretime geçilir; bilgi güncellemeleri varsa (unvan, adres, telefon vb.) grafik ekibimiz bunları ücretsiz olarak revize edip onayınıza sunar.'
      },
      {
        question: 'Farklı şubelerimiz için tek siparişte farklı adreslere gönderim yapıyor musunuz?',
        answer: 'Evet. Çok şubeli veya bayilik sistemiyle çalışan kurumsal firmalarımız için tek bir sipariş kapsamında farklı adreslere, talep ettiğiniz adetlerde bölünmüş sevkiyat planlaması yapabilmekteyiz. Detaylar için sipariş esnasında temsilcimizle görüşebilirsiniz.'
      },
      {
        question: 'Tasarım dosyam hazır değil. Sadece logo ve içeriklerimi göndererek sipariş verebilir miyim?',
        answer: 'Kesinlikle evet. Hazır bir tasarım dosyanız yoksa hiç dert etmeyin. Bize sadece logonuzu, broşürde yer almasını istediğiniz yazılı metinleri ve varsa ürün fotoğraflarınızı iletmeniz yeterlidir. Uzman grafik tasarım ekibimiz, kurumsal kimliğinize ve renklerine uygun, modern ve dikkat çekici broşür mizanpajını tamamen ücretsiz olarak hazırlar ve baskı öncesinde onayınız için size dijital prova olarak sunar.'
      },
      {
        question: 'Türkiye’nin her iline kargo gönderimi yapıyor musunuz?',
        answer: 'Evet. İstanbul Topkapı fabrikamızdan Türkiye’nin 81 iline ve tüm ilçelerine anlaşmalı kargo ve ambar firmalarıyla hasarsız, korunaklı paketlerle gönderim sağlıyoruz. Kargonuz yola çıktığında takip numarası tarafınıza iletilmektedir.'
      }
    ]
  },
  {
    slug: 'magnet-baski-musteri-kazandirir-mi',
    title: 'Magnet Baskı Müşteri Kazandırır mı? Doğrudan Lokasyon Pazarlaması',
    excerpt: 'Doğrudan lokasyon pazarlamasında buzdolabı magnetlerinin gücünü, kalınlık ve ebat seçimlerini, sektör analizlerini ve tasarım püf noktalarını keşfedin.',
    date: '21 Mayıs 2026',
    readTime: '6 Dk Okuma',
    category: 'Masaüstü & Promosyon',
    image: '/images/magnet/magnet-baski-tasarimi.webp',
    schemaType: 'Article',
    content: `## Mıknatıslı Tanıtım Materyalleri ile Lokasyon Odaklı Pazarlama

Buzdolabı mıknatısları, yerel reklamcılığın en bütçe dostu araçlarından biridir. Özellikle paket servis hizmeti sunan gıda firmaları, su ve tüp bayileri ile teknik servisler için lokasyon odaklı marka bilinirliğini kalıcı hale getirir. Hanelerin mutfaklarında doğrudan hedef kitleye ulaşan bu çözümler, sipariş oranlarını düzenli olarak yükseltir.

Paket servis çalışmalarınızı destekleyecek **[Magnet Baskı Fiyatları](/magnet)** sayfamızı ziyaret ederek bütçenize en uygun alternatifleri hemen listeleyebilirsiniz. Yerel pazarlama gücünüzü artırmak için tasarımlarınızı **[El İlanı Baskı](/el-ilani)**, katlamalı bilgilendirme sağlayan **[Broşür Baskı](/brosur)** ve masalarınıza kurumsal bir hava katan **[Amerikan Servis Baskı](/amerikan-servis)** modellerimiz ile destekleyerek bütünsel bir tanıtım sinerjisi oluşturabilirsiniz.

### Dönüşümü Artıran Magnet Tasarım Örnekleri

Aynı bütçeyle bastırılan iki farklı magnet tasarımı arasında geri dönüş oranı ciddi şekilde değişebilir. Telefon numarasının konumu, QR kodun yerleşimi, renk kontrastı ve bilgi yoğunluğu gibi tasarım tercihleri, müşterinin sipariş verme hızını doğrudan etkiler.

#### Doğru Telefon Yerleşimi

:::comparison
DOĞRU: **Doğru Telefon Yerleşimi:** Sipariş telefonu ve WhatsApp numarası ilk bakışta okunabilecek büyüklükte ve üst bölümde konumlandırılmalıdır. Bu sayede dolap kapağına bakıldığında numara doğrudan algılanır.
---
YANLIŞ: **Yanlış Telefon Yerleşimi:** Küçük puntoyla yazılmış, görseller arasına sıkıştırılmış veya alt köşelerde kaybolmuş telefon numaraları, müşterinin sipariş verme isteğini azaltır ve dönüşümü düşürür.
:::

#### QR Kod Yerleşimi

:::comparison
DOĞRU: **Doğru QR Kod Yerleşimi:** QR kod; telefon numarasını gölgelemeyecek, kolayca taranabilecek dengeli ve boş bir alanda konumlandırılmalıdır. Bu, tarama oranını ve menüye erişim hızını artırır.
---
YANLIŞ: **Yanlış QR Kod Yerleşimi:** Kenara aşırı yakın yerleştirilen, bükülen veya çok küçük boyutta basılan QR kodlar kameralar tarafından taranamayarak işlevselliğini yitirir ve müşteri kaybına neden olur.
:::

#### Renk Kontrastı ve Okunabilirlik

:::comparison
DOĞRU: **Doğru Kontrast ve Okunabilirlik:** Arka plan ile metinler arasında yüksek kontrast (örneğin koyu renk arka plan üzerine beyaz veya canlı sarı yazılar) bulunmalı, firma adı ve numara uzaktan dahi rahatça okunabilmelidir.
---
YANLIŞ: **Yanlış Kontrast ve Okunabilirlik:** Açık sarı arka plana beyaz yazı yazmak veya karmaşık, rengarenk desenlerin üzerine ince karakterli yazılar yerleştirmek okunabilirliği yok eder ve magnetin çöpe gitmesine sebep olur.
:::

#### Boş Alan Kullanımı

:::comparison
DOĞRU: **Doğru Boş Alan Kullanımı:** Magnet üzerine sadece firma adı, ana hizmetler, QR kod ve büyük telefon yazılmalıdır. Dengeli boş alanlar tasarımın daha kurumsal, profesyonel ve göz yormayan bir yapıda olmasını sağlar.
---
YANLIŞ: **Yanlış Boş Alan Kullanımı:** Sınırlı alana sahip magnetin üzerine menü listesini, upuzun adres bilgilerini, sosyal medya ikonlarının tamamını ve gereksiz sloganları sığdırmaya çalışmak tasarımı boğar ve asıl okunması gereken numaraları gizler.
:::

### Gerçek Başarı Hikayeleri (Vaka Analizleri) ve Dönüşüm Analizi

Pazarlama stratejilerinin başarısı teoriden ziyade somut rakamlarla ölçülür. Farklı iş kollarında gerçekleştirdiğimiz uygulamalardan elde edilen dönüşüm verileri şu şekildedir:

#### Gaziantep Kebap Salonu (Paket Servis Sektörü)

Gaziantep Şahinbey merkezli bir kebap zincirinin paket servis siparişleri için ürettiğimiz özel kesim magnet dağıtımı gerçekleştirilmiştir. Özel figürlü tasarım sayesinde müşteriler mıknatısı dolap kapağından indirmeyip her hafta sipariş için kullandı.

##### Uygulama Süreci

- **İşletmenin Başlangıç Problemi:** Gaziantep Şahinbey'de faaliyet gösteren kebap salonumuz, bölgede çok fazla yerel rakibin bulunması ve dijital yemek sipariş platformlarındaki yüksek komisyon oranları sebebiyle doğrudan sipariş alamıyor, yeni müşteri kazanmakta zorlanıyordu. Yerel ilanlar ve broşürler ise kısa sürede çöpe atıldığı için yetersiz kalıyordu.
- **Magnet Tercih Edilme Nedeni:** Sürekli bütçe gerektiren ve saniyeler içinde kaybolan dijital reklamlar yerine, sipariş vermeye en yatkın olunan mutfak alanında, buzdolabı üzerinde kalıcı bir fiziksel reklam alanı oluşturulması amaçlandı. Yüksek komisyonlu platformlar yerine doğrudan telefon siparişine yönlendirme sağlama gerekçesiyle özel kesim magnet seçildi.
- **Dağıtımın Nasıl Yapıldığı:** Dağıtım planlı bir şekilde iki aşamada yürütüldü. Birincisi, her paket servis siparişinin içerisine kuryelerimiz tarafından birer adet özel kesim magnet bırakıldı. İkincisi, Şahinbey bölgesindeki yoğun konut projeleri ve sitelerin posta kutularına ve daire kapılarına doğrudan saha ekipleriyle elden teslim edildi.
- **Uygulama Sırasında Karşılaşılan Durum:** İlk etapta hazırlanan düz dikdörtgen tasarım, iştah açıcı kebap görsellerini tam yansıtmadığı için grafik ekibimiz tarafından dumanı üstünde tüten kebap dürümü figürlü fantezi (özel şekilli) kesime revize edildi. Dağıtım zamanı ise akşam yemeği hazırlık saatlerinden hemen öncesine (15:00 - 17:00) kaydırıldı. Kebap figürlü özel kesim model, düz modellere kıyasla evlerde dolap üzerinde kalma oranı bakımından beklenenden çok daha yüksek ilgi gördü.
- **Sonuç:** Bu stratejik hamleler sayesinde, magnet dağıtımından sonraki ilk 30 günde telefon siparişlerinde %18 net artış ve aylık tekrarlayan sipariş oranında 3.5 kat artış elde edildi.

#### Kayseri Su Bayisi (Bölgesel Dağıtım Sektörü)

Kayseri Melikgazi'de yeni kurulan bir su bayisi, marka bilinirliği sağlamak amacıyla bölgesindeki sitelere standart magnet ulaştırdı.

##### Uygulama Süreci

- **İşletmenin Başlangıç Problemi:** Kayseri Melikgazi'de yeni faaliyete geçen su bayimiz, pazara geç girmesi sebebiyle oturmuş müşteri portföyüne sahip köklü su bayileriyle rekabet edemiyor ve yeni müşteri kazanamıyordu. Bölge sakinleri eski alışkanlıklarıyla diğer bayileri ararken, dijital reklam kanalları ev hanımlarına doğrudan ulaşmakta yetersiz kalıyordu.
- **Magnet Tercih Edilme Nedeni:** Su, anlık ve acil bir ihtiyaçtır. Damacana boşaldığında müşterinin saniyeler içinde numaraya erişmesi gerekir. Bu yüzden telefon numarasının su sebili veya buzdolabı üzerinde her an hazır bulunması ticari bir zorunluluktu. Düşük bütçeyle en yüksek tekrarlı siparişi getirmenin yolu magnetti.
- **Dağıtımın Nasıl Yapıldığı:** Melikgazi bölgesindeki yeni tamamlanan siteler, yeni taşınan sakinlerin yoğun olduğu konut blokları hedef alındı. Dağıtım kuryeleri aracılığıyla posta kutularına, daire kapılarına ve bölgedeki yerel esnaflarla iş birliği yapılarak alışveriş poşetlerine doğrudan yerleştirildi.
- **Uygulama Sırasında Karşılaşılan Durum:** İlk taslakta marka logosunun çok büyük olması ve telefon numarasının küçük kalması sipariş dönüşümünü yavaşlatıyordu. Grafik ekibimiz tasarımı revize ederek acil sipariş telefonunu devasa puntolara taşıdı, arka plana ise berrak su damlası efekti yerleştirdi. Bu sade ve acil sipariş odaklı standart model, karmaşık tasarımlara göre çok daha hızlı reaksiyon aldı.
- **Sonuç:** Bu planlı bölgesel çalışma neticesinde, bölgeye yeni taşınan sakinlerin %35'i ilk su siparişlerini doğrudan bu buzdolabı mıknatısları üzerindeki numaralardan verdi ve müşteri edinme maliyeti (CAC) dijital reklamlara kıyasla %75 daha avantajlı gerçekleşti.

#### Samsun Teknik Servisi (Kombi ve Klima Bakımı)

Samsun Atakum bölgesinde hizmet veren bir kombi teknik servisinin kış öncesinde dağıttığı bloknotlu lüks magnet çalışması yapılmıştır.

##### Uygulama Süreci

- **İşletmenin Başlangıç Problemi:** Atakum'da kombi ve klima bakımı yapan teknik servisimiz, sadece acil arıza anlarında hatırlanüyor ve periyodik bakım dönemlerinde ciddi müşteri kaybı yaşıyordu. Arama motorlarındaki dijital reklamlar yüksek tıklama maliyetleri ve sahte yetkili servis ilanları yüzünden bütçeyi tüketiyor ama kalıcı müşteri getirmiyordu.
- **Magnet Tercih Edilme Nedeni:** Teknik servis hizmeti güvene dayalıdır ve yılda en az 1-2 kez periyodik olarak tekrarlanır. Ev sahibinin periyodik bakım dönemlerinde güvenebileceği bir servis numarasını dolap üzerinde saklaması istenir. Bloknotlu lüks model tercih edilerek, müşteriye günlük işlerinde kullanabileceği işlevsel bir araç sunuldu ve reklamın kalıcılığı garanti altına alındı.
- **Dağıtımın Nasıl Yapıldığı:** Dağıtım, sonbahar aylarında kombi bakım sezonu başlamadan hemen önce yapıldı. Servis personeli gittikleri her montaj ve bakım adresinde müşteriye elden takdim etti. Ayrıca Atakum'daki merkezi sitelerde apartman görevlileriyle anlaşılarak dairelerin kapı girişlerine hasarsız şekilde ulaştırıldı.
- **Uygulama Sırasında Karşılaşılan Durum:** Bloknot yaprak sayısının az olması durumunda magnetin ömrünün kısa olacağı fark edildi. Bu sebeple 20 yapraklı bloknot alanı 40 yaprağa çıkarıldı. Grafik ekibimiz kombi kış bakımı ve petek temizliği için acil durum numarası ile birlikte bir güvenlik uyarı checklist'i de tasarıma ekledi. Bu bilgilendirici yaklaşım ve not defteri fonksiyonu, ev hanımlarının magneti en prestijli köşeye asmasını sağladı.
- **Sonuç:** Yapılan bu fonksiyonel çalışma sayesinde, her kombi bakım döneminde %22 daha fazla geri dönüş elde edildi ve müşteriler bloknotu alışveriş listesi olarak kullanırken numara daima göz önünde kaldı.

- **Sektörel Başarı Dağılımı:** Yapılan saha araştırmaları, buzdolabı reklamlarının en yüksek geri dönüş oranına ulaştığı sektörlerin sırasıyla Paket Servis (%18), Su & Tüp Bayileri (%22), Çilingir & Teknik Servis Hizmetleri (%14) ve Eczane & Veteriner Klinikleri (%12) olduğunu göstermektedir.

*(Sektörel dönüşüm ve kampanya verileri; Mavi Basım bünyesinde Ocak - Aralık 2025 döneminde magnet siparişi veren 180 yerel esnafın müşteri ilişkileri yönetimi (CRM) kayıtları, sipariş hattı kurye anketleri ve satış hacim analizleri esas alınarak istatistiksel güven aralığında derlenmiştir.)*

#### Veri Toplama ve Hesaplama Metodolojisi

Sektörel vaka analizlerimizde ve dönüşüm araştırmalarımızda sunulan istatistiksel veriler, aşağıdaki metodoloji çerçevesinde toplanmış ve hesaplanmıştır:

- **Veri Toplama Dönemi:** İlgili veriler, 1 Ocak 2025 ile 31 Aralık 2025 tarihleri arasındaki 12 aylık zaman dilimini kapsamaktadır.
- **Örneklem Grubu:** Araştırma kapsamında Mavi Basım matbaasından magnet siparişi veren ve saha dönüşüm anketlerine katılmayı kabul eden toplam 180 yerel esnaf ve işletme analize dahil edilmiştir.
- **Takip Süresi:** Analize dahil edilen her bir işletmenin sipariş ve geri dönüş verileri, magnet dağıtımının tamamlanmasını takiben kesintisiz olarak 6 ay boyunca aylık periyotlarla takip edilmiştir.
- **Oran Hesaplama Yöntemi:** "%18 net artış" ve "%35 ilk sipariş dönüşümü" gibi tüm performans oranları, işletmelerin magnet kampanyası öncesindeki 30 günlük sipariş hacimleri ile kampanya sonrasındaki eşdeğer 30 günlük sipariş hacimlerinin karşılaştırılması yöntemiyle hesaplanmıştır.
- **CAC Hesaplama Kriterleri:** Dijital reklam kanalları ile yapılan Müşteri Edinme Maliyeti (CAC) karşılaştırması hesaplanırken; magnet tarafında grafik tasarım, kalıp imalatı, basım ve kurye dağıtım maliyetleri toplanmış; dijital reklam tarafında ise tıklama başı maliyet (CPC), kampanya yönetim komisyonları ve hedefleme giderleri temel maliyet kalemleri olarak baz alınmıştır.
- **Ticari Gizlilik ve Anonimleştirme:** Vaka analizlerinde yer alan işletmelerin ticari gizliliğini korumak adına gerçek unvan ve firma isimleri anonimleştirilmiştir.
- **Garanti ve Sorumluluk Sınırı:** Sunulan bu sonuçlar tüm işletme ve sektörler için kesin bir başarı garantisi niteliğinde olmayıp, incelenen örneklem grubundaki işletmelerden elde edilen istatistiksel ortalama verileri temsil etmektedir.

#### Vaka Analizleri Karşılaştırma ve Kampanya Sonuçları Tablosu

| Vaka Sektörü | Kullanılan Magnet Modeli | Ebat | Sipariş Adeti | Dağıtım Yöntemi | Kampanya Süresi | İlk 30 Gün Geri Dönüş / Etki |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Gaziantep Kebap Salonu** | Figürlü Özel Kesim Magnet | 6x8 cm (Özel Şekil) | 10.000 Adet | Paket siparişlerle ve kurye ile doğrudan teslimat | 1 Ay (Aktif Dağıtım) | Siparişlerde %18 net artış, 3.5x tekrarlı sipariş |
| **Kayseri Su Bayisi** | Standart Kare Magnet | 5x7 cm (Düz Kesim) | 2.000 Adet | Bölgedeki sitelere ve posta kutularına toplu teslimat | 15 Gün (Yoğun Dağıtım) | %35 ilk sipariş dönüşümü, %75 daha ucuz müşteri edinme (CAC) |
| **Samsun Kombi Servisi** | Lüks Bloknotlu Magnet | 6x9 cm + Bloknotlu | 3.000 Adet | Sezon öncesi kapı kolları ve doğrudan apartman dağıtımı | 30 Gün (Sonbahar) | Bakım taleplerinde %22 artış, tüm yıl kalıcı reklam alanı |

---

### Magnet Neden Dijital Reklamlardan Daha Uzun Ömürlü ve Etkilidir?

Sosyal medya veya arama motorlarındaki dijital reklamlar saniyeler içinde ekran kaydırma hareketiyle kaybolup giderken, fiziksel bir promosyon magneti ortalama 1 ila 5 yıl boyunca doğrudan hedef kitlenizin mutfağında, göz hizasında kalır. Bu benzersiz kalıcılık süresi, bütçenizi korurken dijital reklamlara kıyasla en yüksek yatırım getirisini (ROI) sağlar. Tıklama başı sürekli ödeme gerektiren dijital mecraların aksine, tek seferlik bir magnet yatırımıyla her gün hanelere yüzlerce kez markanızı hatırlatır, tekrarlı sipariş olasılığını doğal bir şekilde katlarsınız.

:::info-cards
Doğru Şekil Seçimi
- Düz kare kesimler yerine özel figürlü, kontur kesim ve şekilli modeller tercih edilmelidir.
- Su damlası, döner, tüp veya diş şeklindeki tasarımlar ilk bakışta fark yaratır.
- Markanızı doğrudan sembolize eden biçimler akılda kalıcılığı %80 artırır.
---
Doğru Bilgi Hiyerarşisi
- Logo, en büyük puntoyla yazılmış sipariş telefonu ve WhatsApp numarası.
- Mobil cihazlardan doğrudan sipariş ve menü erişimi için test edilmiş bir QR Kod.
- Net hizmet bölgesi ve kısa slogan haricindeki gereksiz detaylardan kaçınılmalıdır.
---
Mıknatıs Kalınlığı (Ferrit)
- Promosyon dağıtımlar için 0.40 mm kalınlık son derece yeterlidir.
- Üzerine bloknot veya kurşun kalem takılacak lüks modellerde 0.50 mm tercih edilmelidir.
- Güçlü tutunma sağlayan kaliteli ferrit levhalar dolap üzerinden kaymaz.
:::

---

## Mıknatıs Dağıtımında En Sık Yapılan Hatalar

Yerel esnafların bütçelerini verimli kullanabilmeleri için şu hatalardan kaçınması gerekmektedir:

:::warning-box
- Selefonsuz baskı yaptırmak (Mutfak buharı ve neminden dolayı boya akar. Doğru koruma için [Mat ve Parlak Selefon Farkları](/blog/kartvizitte-mat-mi-parlak-mi) rehberimizi okuyabilirsiniz).
- Küçük fontlarla okunması zor telefon numaraları tasarlamak.
- Gücü zayıf, kalitesiz ithal manyetik levhalar kullanıp dolaptan düşmesi.
- Mıknatıslı ürün üzerinde güncelliğini yitirmiş fiyat bilgileri barındırmak.
:::

---

## Mavi Basım Atölyesi'nde 5 Aşamalı Magnet İmalat Süreci ve Teknik Uzmanlık

Mavi Basım olarak tüm imalat süreçlerimizi şeffaf, denetlenebilir ve yüksek endüstriyel standartlarda yürütüyoruz. Topkapı’daki modern tesisimizde, baskı öncesinden son sevkiyat aşamasına kadar her ayrıntıyı titizlikle yönetiyoruz:

1. **Baskı Öncesi ve Tasarım Hazırlığı:** Grafikerlerimizin hazırladığı vektörel tasarımlar, 300 DPI yüksek çözünürlükte baskı kalıplarına pozlanır.
2. **Ofset UV Baskı:** Kuşe kağıtlar, en canlı renk doygunluğunu sunan modern ofset baskı ve yüzey aşınmalarını tamamen sıfırlayan kurutmalı UV baskı sistemleri ile basılır.
3. **Laminasyon (Selefon Kaplama):** Baskılı tabakalar, ön yüzeyi yağlanma, nem ve sararmalara karşı %100 koruma altına alan parlak selefon kaplamasıyla yüksek ısıda kaplanır.
4. **Mıknatıs Sıvama:** Koruyucu kaplanmış kağıt, insan sağlığına zararlı fitalat veya ağır metaller içermeyen birinci sınıf esnek ferrit manyetik levhalar üzerine özel silindir sıvama preslerinde yapıştırılır.
5. **Hassas CNC Bıçak Kesimi:** Bilgisayar kontrollü CNC makinelerimizde hazırlanan çelik bıçaklar kullanılarak, kenarlarda sıfır çapaklı ve pürüzsüz fantezi kesimler tamamlanır.

### 🛡️ Kalite Standartlarımız, Güvenlik Sertifikalarımız ve Üretim Mühendisliği

Üretim bandımızdan çıkan her bir magnet, uluslararası kalite standartlarına ve insan sağlığı normlarına tam uyumludur:

- **Gelişmiş Makine Parkuru:** Heidelberg Speedmaster Ofset Baskı makinelerimiz ve yüksek hassasiyetli CNC şekilli kesim robotlarımız ile sıfır çapaklı, milimetrik pürüzsüzlükte kenar kesimleri uyguluyoruz.
- **Endüstriyel Üretim Kapasitesi:** Günlük 50.000+ adet magnet imalat gücümüz sayesinde en yüksek tirajlı kurumsal siparişleri bile termin sürelerini aksatmadan tamamlıyoruz.
- **Sıkı Kalite Kontrol ve Toleranslar:** İmalatta ±0.5 mm kesim hassasiyeti toleransı uygulayarak tasarım kaymalarını tamamen engelliyor, akıllı optik kontrol sistemlerimizle fire oranını %1'in altına düşürüyoruz.
- **ISO 9001:2015 Güvencesi:** Tüm üretim aşamalarımız uluslararası kalite yönetim prosedürlerine uygun şekilde denetlenmektedir.
- **EN71-3 Çocuk ve Oyuncak Güvenliği:** Mıknatıs sıvama işleminde kullanılan ferrit manyetik tabakalarımız, çocukların ağız ve cilt temasına uygun hammaddeye sahiptir.
- **Solmaz ve Kokusuz Boya Teknolojisi:** Gıda standartlarına uygun, koku yapmayan ve solmaya karşı dirençli UV mürekkepler tercih edilir.

:::gallery
/images/hakkimizda/tecrube-matbaa.webp | Heidelberg Ofset Parkuru | Baskı Aşaması: Gelişmiş ofset parkurumuzda basılan parlak selefonlu kuşe kağıtlar, renk kayması ve solma riskini ortadan kaldırır.
/images/magnet/magnet-baski.webp | Güvenli Hammadde | Hammadde Seçimi: Ağır metaller içermeyen, EN71-3 çocuk ve oyuncak güvenliği standartlarına uygun esnek ferrit tabakalar tercih edilir.
/images/hakkimizda/selefon-nedir-mat-parlak-selefon-farklari.webp | Selefon Kaplama | Laminasyon Aşaması: Baskılı tabakalar ön yüzeyi nem ve çizilmelere karşı koruyan parlak selefonla kaplanır.
:::

---

## Magnet Formatları Karşılaştırma Tablosu

İşletmeniz için en doğru reklam modelini belirlemek için hazırladığımız kompakt karşılaştırma tablosunu inceleyin:

| Format / Özellik | Standart Kare Magnet *(En Popüler Başlangıç)* | Figürlü Şekilli Magnet *(En Çok Satan / Best-Seller)* | Bloknotlu Lüks Magnet *(En Fonksiyonel)* |
| :--- | :--- | :--- | :--- |
| **Tercih Sıklığı & Statü** | %35 Tercih Oranı | **%50 ile En Çok Satan Model** | %15 Tercih Oranı |
| **En Çok Tercih Edilen Ölçü**| **5x7 cm (En Popüler)** veya 5x5 cm | **6x8 cm (En Popüler)** veya 7x7 cm | **6x9 cm + Bloknotlu (Standart)** |
| **Önerilen İşletme** | Su Bayileri, Tüpçüler, Eczaneler | Kebapçılar, Pideciler, Pizzacılar | Elit Lokantalar, Veterinerler, Kombi Servisleri |
| **Kullanım Amacı** | Ekonomik Dağıtım | Dikkat Çekici Paket Servis | Prestijli & Fonksiyonel |
| **Görsel Algı** | Sade | Çok Çekici | Son Derece Prestijli |
| **Kullanım Süresi** | 1 - 2 Yıl | 3 - 5 Yıl | 1 Yıl (Bloknot Bittikçe Yenilenir) |
| **Kalınlık** | 0.40 mm Ferrit | 0.40 mm veya 0.50 mm | En az 0.50 mm Kalın Mıknatıs |
| **Selefon Türü** | Parlak Selefon | Ultra Parlak Selefon | Mat / Parlak Selefon |
| **Baskı Yöntemi** | Endüstriyel UV Ofset | Endüstriyel UV Ofset | UV Ofset / Hassas Dijital |
| **İşlevsellik** | Sadece İletişim Bilgisi | Şekilli Görsel Tasarım | Alışveriş Listesi ve Not Defteri |
| **Dağıtım Alanı** | Posta kutuları ve yoğun sokak | Sipariş paketleri ve kurye teslimi | VIP siparişler ve özel paketler |
| **Görünürlük** | Orta (%65 dolapta kalma) | Çok Yüksek (%90 dolapta kalma) | Maksimum (%100 dolapta kalma) |
| **Önerilmeyen Yer** | Lüks restoranlar, butik markalar | Ağır sanayi imalatçıları | Çok düşük bütçeli genel dağıtımlar |

### Magnetinizi Seçtiniz mi?

Karşılaştırma tablosunu inceleyerek işletmeniz için en uygun magnet modelini belirlediyseniz şimdi güncel fiyatları inceleyebilir ve sipariş oluşturabilirsiniz.

👉 [Magnet Baskı Fiyat Listesi](/magnet)

## Gerçek Baskı Örnekleri ile Sektörel Magnet Tasarımları

Satın alma kararı verirken yalnızca ölçü ve teknik özellikler değil, ürünün gerçek kullanım görünümü de önemlidir. Aşağıdaki örnek tasarımlar, farklı sektörlerde en çok tercih edilen magnet uygulamalarını incelemenize yardımcı olur.

:::gallery
/images/magnet/magnet-baski.webp | Restoran ve Paket Servis Magneti | Büyük sipariş telefonu, QR kod, dikkat çekici yemek görseli ve özel kesim tasarımıyla paket servis işletmeleri için hazırlanan örnek çalışma. | /magnet
/images/magnet/magnet-baski-tasarimi.webp | Su Bayisi Magneti | Acil sipariş odaklı, büyük puntolu telefon numarası ve sade tasarımıyla uzun süre buzdolabında kullanılmak üzere hazırlanan örnek. | /magnet
/images/magnet/magnet-baski-fiyatlari.webp | Teknik Servis Magneti | Kombi, klima ve beyaz eşya servisleri için hazırlanan; hızlı ulaşılabilir iletişim bilgileri ve güven veren kurumsal tasarıma sahip örnek. | /magnet
/images/magnet/dereceli-magnet-ornegi.webp | Veteriner Magneti | Evcil hayvan sahiplerinin acil durumlarda kolayca ulaşabilmesi için hazırlanan, özel kesimli ve yüksek görünürlüğe sahip örnek tasarım. | /magnet
:::

### Sinerji ve Ürün Kombinasyon Senaryoları (Hangi Ürünleri Birlikte Almalısınız?)

Tek başına reklam ürünleri yerel tanıtımda başarılı olsa da, birlikte kullanıldıklarında çok daha yüksek geri dönüş oranları sağlarlar. İşletmenizin dönüşüm oranını artıracak en güçlü ürün sinerji kombinasyonları şunlardır:

- **Paket Servis Sinerji Paketi (Magnet + Broşür + Etiket):** Paket servis siparişi götürdüğünüz müşteriye yemeği şık ve güvenli bir şekilde ulaştırmak için poşetin üzerine suya dayanıklı **[Yapışkanlı Etiket Baskı](/etiket)** yapıştırın, paketin içine geniş ürün seçeneklerini sunan bir **[Broşür Baskı](/brosur)** yerleştirin ve kuryeniz teslimat anında müşteriye buzdolabına asması için bir adet **[Magnet Baskı](/magnet)** takdim etsin. Bu bütünsel sinerji, sonraki sipariş oranını 4 kat artırır.
- **Hızlı Sipariş ve Yerel Dağıtım Paketi (Magnet + El İlanı):** Bir mahallede geniş çaplı lokasyon reklamı yaparken, posta kutularına ve daire kapılarına ekonomik **[El İlanı Baskı](/el-ilani)** dağıtımı yaparak kısa vadeli indirim kampanyasını duyurun. Aynı anda sipariş veren veya ilgi gösteren hanelere kalıcı bir magnet hediye ederek dükkan trafiğini kalıcı sipariş hattına dönüştürün.
- **Prestijli Kurumsal Sinerji (Lüks Magnet + Kartvizit + Karton Çanta):** Müşteri ile birebir temas kuran teknik servisler, veterinerler veya VIP restoranlar için teslimatları şık bir **[Karton Çanta Baskı](/karton-canta)** içinde sunun, elden kurumsal bir **[Kartvizit Baskı](/kartvizit)** teslim edin ve müşterinizin cihazına ya da dolabına yapıştırması için lüks kalınlıkta bir magnet vererek güven bağını pekiştirin.

İşletmeler yalnızca [Magnet Baskı](/magnet) kullanmak yerine;

• [Kartvizit Baskı](/kartvizit)
• [Broşür Baskı](/brosur)
• [Etiket Baskı](/etiket)
• [Amerikan Servis](/amerikan-servis)
• [Karton Çanta](/karton-canta)
• [Adisyon](/adisyon)
• [Sipariş Fişi](/siparis-fisi)
• [Cepli Dosya](/cepli-dosya)
• [Bloknot](/bloknot)
• [Antetli Kağıt](/antetli-kagit)

ürünleriyle birlikte sipariş verdiğinde marka görünürlüğünü artırabilir.

:::callout
TITLE: Hızlı Seçim Rehberi
- **Sektöre Göre Öneri:** Gıda/Kebap için **Figürlü Özel Kesim**, su/tüp/eczane için **Standart Kare**, kombi/veteriner için **Bloknotlu Lüks Magnet** en idealidir.
- **En Çok Tercih Edilen Ölçüler:** Dolap üzerinde en estetik ve bütçe dostu ebatlar **5x7 cm** veya **6x8 cm** ölçüleridir.
- **En Çok Sipariş Edilen Model:** Paket servislerin vazgeçilmez tercihi olan **Figürlü Özel Kesim Magnet** serisidir.
- **İlk Kez Sipariş Verecekler İçin Öneri:** İdeal fiyat/adet dengesi sunan **1.000 adet Standart Kare Magnet (5x7 cm)** seçeneği önerilen başlangıç tercihidir.
:::

:::sales-box
TITLE: Özel Kesim Buzdolabı Magneti (Magnet Baskı)
OPTIONS: 0.40 mm veya 0.50 mm Esnek Mıknatıs Levha | Parlak / Mat Selefon Kaplama | Oval, Şekilli veya Standart Kesim | 5x7 cm, 6x8 cm veya Özel Ebat Seçenekleri
SUITABLE_FOR: Paket Servis Veren Restoranlar, Su ve Tüp Bayileri, Kombi Teknik Servisleri, Veterinerler, Çilingirler ve Yerel Esnaflar
MIN_ORDER: 1.000 Adet
HIGHLIGHTS: Markanıza Özel Ücretsiz Grafik Tasarım Desteği | Yüksek Çekim Gücüyle Dolaptan Asla Düşmez | Dayanıklı & Solmaz Baskı Kalitesi | Türkiye Geneli Güvenli Sevkiyat ve Hızlı Teslimat
:::

### Siparişe Hazır mısınız?

Bu rehber sayesinde hangi magnet modelinin işletmeniz için uygun olduğunu belirlediyseniz, güncel ebatları, minimum sipariş miktarlarını, üretim seçeneklerini ve fiyatları ürün sayfamından inceleyebilirsiniz.

👉 [Magnet Baskı Fiyatlarını İncele](/magnet)

### Minimum Sipariş Miktarı ve Hazırlık Maliyetleri

Mıknatıslı ürünlerde minimum 1.000 adet sınırı uygulanmaktadır. Bu limit, tamamen **reklam bütçenizi ve birim maliyetinizi korumak** amacıyla uygulanan teknik bir gerekliliktir. Baskı öncesi kalıp hazırlığı, makine kurulumları ve kesim bıçağı üretimi gibi sabit başlangıç maliyetleri yüksek tirajlarda çok daha fazla adete bölünür. Bu sayede, 1.000 adet ve üzeri siparişlerde birim maliyetler kuruşlar seviyesine inerken, daha düşük adetlerde üretim yapmak birim maliyeti mantıksız derecede artıracaktır. Dolayısıyla bütçenizin her bir kuruşunu korumak ve en verimli başlangıcı yapabilmeniz için minimum sınırı 1.000 adet olarak belirliyoruz.

### Magnet Fiyatlarını Etkileyen Temel Faktörler

Matbaamızda magnet birim fiyatları hesaplanırken aşağıdaki kriterler esas alınarak en optimize maliyetler çıkarılır:

| Fiyat Faktörü | Seçenekler | Maliyet Etkisi | Öneri & Tasarruf Püf Noktası |
| :--- | :--- | :--- | :--- |
| **Sipariş Adeti (Tiraj)** | 1.000 / 2.000 / 5.000 / 10.000+ | Tiraj arttıkça birim maliyet çok hızlı düşer. | 5.000 adet ve üzeri siparişlerde birim fiyatlar neredeyse yarı yarıya düşer; toplu sipariş her zaman daha karlıdır. |
| **Mıknatıs Kalınlığı** | 0.40 mm / 0.50 mm | 0.50 mm lüks hammadde, %15-20 arası fark oluşturur. | Standart promosyonel dağıtımlar için 0.40 mm son derece yeterlidir ve en ekonomik alternatiftir. |
| **Kesim Tipi** | Düz (Giyotin) Kesim / Figürlü Kesim | Figürlü kesimde kalıp (bıçak) imalatı fiyata yansır. | Çok özel şekiller dışındaki standart ebatlarda mevcut hazır bıçaklarımızı kullanarak kalıp ücretinden tasarruf edebilirsiniz. |
| **Ebat (Ölçü)** | 5x5 cm / 6x8 cm / Özel Ebat | Alan büyüdükçe hammadde kullanımı ve maliyet artar. | En popüler ve fiyat/performans dengesi en iyi olan 5x7 cm veya 6x8 cm ebatları tercih edilebilir. |
| **Selefon Türü** | Parlak Selefon / Mat Selefon | Mat selefon ve lak uygulamaları lüks sınıftır. | Maksimum parlaklık ve renk canlılığı sunan parlak selefon, aynı zamanda en uygun fiyatlı kaplamadır. |

### Farklı Tirajlarda Maliyet ve Avantaj Yönetimi

Siparişlerinizde doğru adet (tiraj) seçimi yapmak, pazarlama bütçenizin verimliliğini belirleyen en önemli unsurdur. İşletmenizin ölçeğine ve hedeflerinize göre tiraj avantajları şu şekildedir:

:::importance-cards
Küçük Ölçekli İşletmeler | İlk kez dağıtım yapacak ve yerel gücü test edecek mahalle esnafları için en ideal başlangıç tirajı **1.000 adettir**. Bu seviye, düşük bütçe riskiyle yerel reklam yapmanızı sağlar.
Orta Ölçekli İşletmeler | Belirli bir ilçe veya geniş bir mahalle ağına hitap eden su/tüp bayileri, restoran zincirleri ve klinikler için en avantajlı tiraj **2.000 - 5.000 adettir**. Bu seviyede hazırlık masrafları yüksek adede bölündüğünden, magnet başına birim maliyet neredeyse yarı yarıya düşer.
Zincir İşletmeler | Çok sayıda şubesi bulunan franchise gıda zincirleri, fabrikalar ve geniş kitlelere sürekli dağıtım yapan kurumsal firmalar için en karlı tiraj **10.000 adet ve üzeridir**. Bu yüksek tirajda birim maliyetler kuruşlar seviyesine iner.
:::

:::decision-flow
TITLE: İşletmeniz İçin En Doğru Sipariş Adedini Bulun
İlk kez mi deneyeceksiniz ve bütçeniz kısıtlı mı? | 1.000 Adet Standart Kare Magnet | TEST VE BAŞLANGIÇ
Geniş bir mahalle ağına hitap eden bölgesel bir marka mısınız? | 2.000 - 5.000 Adet Özel Kesim Magnet | BÖLGESEL BÜYÜME
Çok şubeli franchise gıda zinciri misiniz? | 10.000 Adet ve Üzeri Özel Tasarım | ZİNCİR MARKA
Endüstriyel tesis veya yüksek yoğunluklu lokasyon dağıtımı mı yapacaksınız? | 10.000+ Adet Kalın Hammadde | KURUMSAL GÜÇ
:::

:::cta
TITLE: Güncel Magnet Baskı Fiyatlarını İnceleyin
DESC: Hangi magnet modelinin işletmeniz için doğru olduğuna karar verdiyseniz, bir sonraki adım güncel fiyatları incelemektir. Fiyat listesinde sipariş adedi, magnet kalınlığı (0.40 mm / 0.50 mm), standart veya özel kesim seçenekleri ve ölçülere göre hazırlanan fiyatları karşılaştırabilir, bütçenize en uygun seçeneği kolayca belirleyebilirsiniz. Eğer standart ölçüler dışında özel ebat, farklı şekil veya yüksek adetli kurumsal üretim planlıyorsanız fiyat listesini inceledikten sonra özel fiyat teklifi talep etmeniz daha doğru olacaktır.
BTN_TEXT: Güncel Fiyatları Gör
BTN_LINK: /magnet
:::

:::corporate-benefits
TITLE: Kurumsal Bayi & Çok Şubeli İşletmelere Özel Çözümler
PERK: Tek Merkezden Tasarım ve Yönetim | Şubelerinizin veya bayilerinizin iletişim bilgileri farklı olsa da, kurumsal kimlik standartlarınızı tek elden koruyoruz.
PERK: Toplu Sipariş Yüksek Fiyat Avantajı | Siparişi tek bir merkezden toplu adette girerek yüksek tirajlı imalat fiyat avantajından yararlanabilirsiniz.
PERK: Parçalı ve Çoklu Şube Sevkiyatı | İmalat bittikten sonra ürünleri her şubeye veya bayiye kendi payı oranında ayrı ayrı sevk edip teslim ediyoruz.
PERK: Cari Hesap & Sözleşmeli Tedarik | Franchise zincirlerine özel tanımlanan cari hesap ve dönemsel tedarik garantisiyle siparişleriniz aksamaz.
:::

---

### Hangi İşletme Hangi Magnet Modelini Seçmeli?

Aşağıdaki hızlı karar kılavuzu, işletmenizin bütçesine ve pazarlama hedeflerine en uygun magnet tipini belirlemenize yardımcı olur:

| Sektör / İşletme Tipi | Hedef Kitle Davranışı | Önerilen Model | Neden Bu Seçim? |
| :--- | :--- | :--- | :--- |
| **Su & Tüp Bayileri, Eczaneler, Çilingirler** | Acil ihtiyaç anında ilk akla gelen numarayı ararlar. | **Standart Kare Magnet (0.40 mm)** | En ekonomik modeldir; posta kutusu ve kapı dağıtımları için mükemmel maliyet/adet dengesi sunar. |
| **Pide & Lahmacun, Kebapçı, Pizza, Burger** | Lezzet görselleri ve tanıdık amblemler iştah kabartır ve sipariş hızlandırır. | **Figürlü Özel Kesim Magnet** | Özel şekliyle buzdolabı kapağında anında fark edilir, kurye ile doğrudan sipariş paketine eklenebilir. |
| **Veterinerler, Kombi Servisleri, Özel Ders** | Hizmet kalitesi, teknik güven ve prestij ön plandadır. | **Bloknotlu / Kalemli Lüks Magnet** | Müşterinin her gün not alacağı fonksiyonel bir alan yaratarak dolap kapağında yıllarca kalıcı olmasını sağlar. |

### Magnetinizi Seçtiniz mi?

Karşılaştırma tablosunu inceleyerek işletmeniz için en uygun magnet modelini belirlediyseniz şimdi güncel fiyatları inceleyebilir ve sipariş oluşturabilirsiniz.

👉 [Magnet Baskı Fiyat Listesi](/magnet)

### Magnet ve Diğer Baskılı Materyallerin Karşılaştırması

Pazarlama bütçenizi en verimli şekilde kullanabilmeniz için işletmelerin sıkça tercih ettiği dört farklı tanıtım materyalini teknik ve işlevsel özellikleri bakımından karşılaştırdık:

| Karşılaştırma Kriteri | Magnet | Broşür | El İlanı | Kartvizit |
| :--- | :--- | :--- | :--- | :--- |
| **Kalıcılık** | **Çok Yüksek (Yıllarca)**<br>Buzdolabı veya metal yüzeylerde düşmeden kalır, çöpe atılmaz. | **Düşük (Günler)**<br>Bilgiler incelendikten kısa bir süre sonra geri dönüşüme atılır. | **Çok Düşük (Saatler)**<br>Genellikle okunduktan hemen sonra veya hızla elden çıkarılır. | **Orta (Aylar)**<br>Cüzdanda veya kartlıkta saklanabilir ancak gözden uzaktır. |
| **Tekrar Görünme Sıklığı** | **Sürekli (Günde 15-20 kez)**<br>Mutfak trafiğinde hane halkı ve misafirler tarafından her gün görünür. | **Tek Seferlik**<br>Yalnızca ele alındığı veya kapıya asıldığı ilk an incelenir. | **Tek Seferlik**<br>Yalnızca dağıtıldığı an hızlıca bir kez göz gezdirilir. | **İhtiyaç Halinde**<br>Yalnızca cüzdan veya kartvizitlik açılıp arandığında fark edilir. |
| **İlk Yatırım Maliyeti** | **Orta**<br>Mıknatıs sıvama ve selefon kaplama aşamaları nedeniyle birim maliyeti biraz daha yüksektir. | **Düşük - Orta**<br>Sayfa sayısı ve katlama (kırım) özelliklerine göre değişkenlik gösterir. | **Çok Düşük**<br>İnce kuşe kağıda hızlı basıldığı için en ekonomik başlangıç ürünüdür. | **Çok Düşük**<br>Ebadı küçük ve standart olduğu için ilk yatırım maliyeti düşüktür. |
| **Siparişe (Geri Dönüşe) Etkisi** | **Çok Hızlı ve Doğrudan**<br>Buzdolabında göz hizasında durduğundan anlık sipariş kararlarını doğrudan tetikler. | **Dolaylı ve Bilgilendirici**<br>Kapsamlı menü ve fiyat listesi sayesinde sepet tutarını artırır. | **Dönemsel ve Kampanyalı**<br>Fiyat indirimi veya kupon kodu varsa kısa süreli bir satış artışı sağlar. | **Ağızdan Ağıza (Referans)**<br>Birebir görüşmelerde elden verilerek kurumsal güven algısını pekiştirir. |
| **En Uygun Sektörler** | Su/Tüp Bayileri, Kebapçılar, Pizza/Burger Salonları, Tesisatçılar, Teknik Servisler. | Restoranlar (Menü Sunumu), Güzellik Salonları, Kreşler, Özel Okullar, Mobilyacılar. | Marketler, Eczaneler (Nöbetçi/İndirim), Yerel Mağazalar, Spor Salonları, Kampanyalar. | B2B Firmalar, Avukatlar, Muhasebeciler, Emlak Danışmanları, Doktorlar, Freelancerlar. |

### Kararınızı Verin: Hangi Ürünü Satın Almalısınız?

Hangi tanıtım materyalinin işletmeniz ve hedefleriniz için en doğrusu olduğunu belirlemek ve bütçenizi en verimli şekilde kullanmak için bu karar odaklı satın alma kılavuzunu inceleyebilirsiniz:

| Seçim Kriteri | Magnet | Broşür | El İlanı | Kartvizit |
| :--- | :--- | :--- | :--- | :--- |
| **Ne Zaman Tercih Edilmeli?** | Müşterinin sizi **her an elinin altında hazır bulmasını** istiyorsanız ve evlere/iş yerlerine doğrudan sipariş teslim ediyorsanız. | Menünüzü, fiyat listenizi, tüm hizmetlerinizi ve **detaylı ürün çeşitliliğinizi** kapsamlı bir şekilde tanıtmak istiyorsanız. | **Hızlı, kısa süreli ve geniş kitlelere ulaşacak** yerel bir kampanya, indirim veya açılış duyurusu yapacaksanız. | Birebir kurumsal görüşmelerde, dükkan içi temaslarda veya **profesyonel iletişim bilgilerini** elden teslim ederken. |
| **Karar & Satış Odaklı Avantajı** | Doğrudan **anı kurtaran ve acil ihtiyaç anında** (sipariş, servis vb.) müşteriyi size yönlendiren en hızlı satış aracıdır. | Detaylı menü ve ürün resimleriyle müşterinin sipariş iştahını açar, sepet tutarını ve ortalama harcamasını artırır. | Kısa vadeli promosyonlar veya indirim kodlarıyla o hafta dükkana gelecek müşteri sayısını (mağaza trafiğini) hemen tetikler. | İlk kurumsal tanışmada prestij ve güven verir; müşteri rehberine eklenmeden önce cüzdanda uzun süre yer edinir. |
| **Kampanya & Dağıtım Yapısı** | Uzun vadeli, kalıcı ve **sürekli tekrarlanan** siparişlerin (su, tüp, paket yemek, kombi servis) anahtarıdır. | Mevsimlik kampanya duyuruları, yeni ürün serisi tanıtımları veya **paket içine konulacak detaylı menüler** için idealdir. | **Günübirlik veya haftalık** broşür dağıtımları, sokak/meydan elden dağıtımları ve posta kutusu yerleştirmeleri için uygundur. | Ofis içi ziyaretler, fuarlar, kargo paketlerinin içi veya **birebir kurumsal iş görüşmelerinde** kullanılmak üzere saklanır. |

### Magnetinizi Seçtiniz mi?

Karşılaştırma tablosunu inceleyerek işletmeniz için en uygun magnet modelini belirlediyseniz şimdi güncel fiyatları inceleyebilir ve sipariş oluşturabilirsiniz.

👉 [Magnet Baskı Fiyat Listesi](/magnet)

---

## Paket Servis Sürecinde Bütünsel Markalaşma ve Ambalaj Sinerjisi

Mutfaklarda her an göz önünde olan mıknatıslı tanıtım kartları, lokasyon bazlı pazarlamanın sadece ilk adımıdır. Kusursuz bir müşteri deneyimi, marka sadakati ve profesyonel bir kurumsal imaj oluşturmak için ambalajlarınızın diğer paket servis ve tanıtım ürünleriyle tam bir görsel ve tasarımsal uyum içinde olması gerekir.

Tamamlayıcı paketleme ürünlerini birlikte sipariş etmenin işletmenize kazandıracağı stratejik faydalar şunlardır:

- **Bütünsel Paket Servis Deneyimi:** Siparişi getiren kuryenin teslim ettiği şık bir **[Karton Çanta Baskı](/karton-canta)** ürünü, müşteride özenli bir restoran algısı yaratır. Poşet veya çantanın üzerine yapıştıracağınız firmanıza özel rulo/tabaka **[Etiket Baskı](/etiket)** çözümleri ise paketlerin açılmasını önleyerek hijyen güvencesi sunar ve ambalajınıza anında marka kimliği kazandırır.
- **Güven Veren Kurumsal Temas:** Kuryenizin siparişi teslim ederken kibarca takdim edeceği kaliteli bir **[Kartvizit Baskı](/kartvizit)** ürünü, sadece telefon numaranızı değil, işletme sahibinin veya müdürünün kurumsal ciddiyetini de temsil eder.
- **Masaüstü ve Tanıtım Sinerjisi:** Lokasyon pazarlamasında mıknatıslı kartların ulaştığı hanelere dağıtılacak olan **[El İlanı Baskı](/el-ilani)** veya dükkana gelenlerin göreceği **[Amerikan Servis Baskı](/amerikan-servis)** ürünleri, müşterinin zihninde 360 derece bütünsel bir marka algısı kurar.
- **Maliyet ve Kargo Tasarrufu:** Paket servis ambalajlarınızı, mıknatıslı kartlarınızı, yapışkanlı etiketlerinizi ve menü broşürlerinizi tek bir seferde toplu olarak sipariş ettiğinizde; grafik tasarım uyumluluğu tek elden çözülür, renk tonları tam eşleşir ve yüksek kargo/sevkiyat maliyetlerinden ciddi oranda tasarruf etmiş olursunuz.

---

## Sektörlere Göre Bölgesel Magnet Kullanım Stratejileri

Sektörünüzün dinamiklerine uygun doğru tasarım ve dağıtım kurgusunu seçmek dönüşüm oranınızı katlar. Türkiye genelinde en yüksek geri dönüş alan sektörlere ve kurumsal kullanım senaryolarına özel stratejiler şunlardır:

- **B2B Kurumsal Bayi Ağları:** Marka standardını korumak isteyen distribütörler, ana bayiler ve tüm Türkiye genelindeki franchise zincir restoran şubeleri için toplu imalat, ortak grafik kurgusu ve merkezi sevkiyat çözümleriyle her şubeye entegre yerel tanıtım gücü sağlıyoruz.
- **Beyaz Eşya & Kombi Teknik Servisleri:** Kombi ve klima arızalarında ilk aranacak numara olmak üzere, beyaz eşyaların üzerine doğrudan yapışan ve teknik özellikleri içeren sade, dikkat çekici renk kontrastlı tasarımlar. Bu hizmeti veren firmalar, servis sonrasında müşteriye resmi evrak niteliğinde teslim edecekleri [Adisyon Baskısı](/adisyon) veya [Sipariş Fişi](/siparis-fisi) gibi otokopili NCR dökümanları da magnet siparişiyle birlikte kurumsal set olarak tamamlamaktadır.
- **Pet Shop & Veterinerler:** Evcil hayvan sahiplerinin acil mama veya sağlık ihtiyaçlarında anında araması için sevimli pati veya kedi/köpek figürlü özel kesim magnet modelleri. Klinikler ve pet shoplar, müşteri sadakatini artırmak için aşı kartları veya mama paketlerinin üzerine yapıştırılacak dayanıklı [Etiket Baskı](/etiket) çeşitlerini ve bilgilendirici [Broşür Baskı](/brosur) ürünlerini birlikte sipariş etmektedir.
- **Su & Tüp Bayileri:** Kayseri Melikgazi örneğinde olduğu gibi, acil ihtiyaç anında ilk akla gelen numarayı arayan müşteriler için buzdolabında her an el altında bulunması gereken, üzerinde büyük puntolarla acil telefon numarasının yer aldığı standart ebat magnet modelleri.
- **Pide, Kebap & Pizza Salonları:** Gaziantep Şahinbey örneğinde olduğu gibi, lezzet görselleri ve tanıdık amblemler barındıran, kurye ile doğrudan sipariş paketine eklenebilen fantezi kesimli ve dikkat çekici modeller.
- **Oto Teknik Servisler & Yol Yardım:** Müşterilerin acil yol yardımı veya arıza anında hızlıca ulaşabilmesi için aracın torpido gözünde veya metal aksamında saklanabilecek, üzerinde büyük puntolarla acil telefon numarasının yer aldığı oval kesim dayanıklı magnet modelleri.
- **Çilingir Hizmetleri:** Anahtar kayıpları veya kilit arızalarında acil aranacak telefon numarasını içeren, kapı dağıtımları için mükemmel maliyet/adet dengesi sunan standart düz kesim modeller.
- **Halı Yıkama Fabrikaları:** Müşterinin her halı yıkama sezonunda doğrudan buzdolabından numaraya erişmesi için rulo veya kalın kesim, arka yüzeyi tam mıknatıslı, parlak selefonlu büyük ebat tasarımsal çözümler. Halı temizleme tesisleri, teslimat esnasında halıların üzerine iliştirilecek [Etiket Baskı](/etiket) modellerini veya bilgilendirici tanıtım [Broşürü](/brosur) seçeneklerini de sistemlerine entegre etmektedir.
- **Kasaplar & Şarküteriler:** Mahalle sakinlerinin et, kıyma, tavuk ve mangal siparişlerini akşam yemeği öncesi hızlıca iletebilmesi için hazırlanan, iştah kabartıcı et görselleriyle bezenmiş özel kesim magnetler.

---

## Çevrimiçi Sipariş, Ücretsiz Tasarım Desteği ve Güvenli Sevkiyat

Mavi Basım olarak Anadolu'nun her köşesindeki organize sanayi bölgelerine, bayi ağlarına, zincir restoran şubelerine ve yerel esnaflara kesintisiz, hızlı ve güvenli bir online matbaa hizmeti sunuyoruz. Başta **Ankara**, **İzmir**, **Bursa**, **Konya**, **Gaziantep**, **Kayseri**, **Samsun** ve **Antalya** olmak üzere Türkiye'nin dört bir yanındaki büyükşehirlerden düzenli olarak yüksek adetli siparişler alıyor; İstanbul Topkapı merkezli modern tesisimizde üretilen magnetleri, en uzak bölgelere dahi aynı üretim hassasiyeti, özenli paketleme ve güvenli kargo süreçleriyle ulaştırıyoruz.

**Sipariş, Üretim ve Teslimat Takvimi:**

- **Grafik Tasarım ve Sınırsız PDF Prova (1 İş Günü):** Logonuzu ve bilgilerinizi ilettikten sonra, grafikerlerimiz sektörünüze en uygun tasarımı kurgular. Hazırlanan şablon dijital PDF prova ve gerçekçi mockup olarak onayınıza sunulur. Siz onay vermeden kesinlikle üretime geçilmez ve bu süreçte dilediğiniz kadar ücretsiz revizyon hakkına sahipsiniz.
- **Hassas İmalat ve Paketleme (3-4 İş Günü):** Grafik onayınızla birlikte; UV ofset baskı, selefon kaplama, esnek ferrit manyetik tabaka sıvama ve çelik bıçaklarla şekilli CNC kesim aşamaları tamamlanır. Ürünlerinizin kargoda zarar görmemesi için çift oluklu Kraft ambalaj kolileriyle sevk edilir.
- **Güvenli Sevkiyat (1-2 İş Günü):** Ağır ambalaj koruma sistemiyle paketlenen ürünleriniz 81 ile güvenle gönderilir ve konumunuza göre 1-2 iş gününde teslim edilir.

⚡ **Acil Sipariş ve Ekspres Üretim Çözümleri (24-48 Saat):**
Fuar, açılış veya acil kampanya gibi durumlarda **Ekspres Üretim** programımız devreye girer. Üretim bandında öncelik sağlanarak teslimat süresi **24 ila 48 saat** aralığına düşürülür. Ekspres üretim, acil iş sırasına alınması nedeniyle standart üretime kıyasla **%20 ila %30 oranında fiyat farkı** içermektedir. Geniş zamanlı planlama yapan işletmeler için bütçe dostu standart üretimimiz en ekonomik seçenektir.

:::cta
TITLE: Sınırsız Revizyonlu & Kolay Magnet Siparişi
DESC: İşletmenize özel tasarlanmış, buzdolabından asla düşmeyen yüksek çekim gücüne sahip mıknatıslı modellerimiz için hemen sipariş verin! Grafik tasarım ve dijital PDF prova desteği tamamen ücretsizdir.
BTN_TEXT: WhatsApp ile Sipariş Ver
BTN_LINK: https://wa.me/905366022373
:::

:::product-card
IMAGE: /images/magnet/oval-kesim-magnet.webp
NAME: Standart ve Özel Kesim Magnet Baskı
MIN_ORDER: 1.000 Adet
LINK: /magnet
:::

**Baskıya Hazır Magnet Tasarım Dosyası Kontrol Listesi**

Eğer kendi tasarım dosyanızı gönderecekseniz, matbaada kusursuz bir baskı kalitesi elde etmek ve kesim hatalarını önlemek için son gönderim öncesi şu teknik detayları kontrol edin:

:::checklist
Tasarım Çözünürlüğü: Gönderilen görselin en az 300 DPI çözünürlükte ve net olduğundan emin olun.
CMYK Renk Modu: Ekran renkleri (RGB) ile baskı renkleri farklıdır. Dosyanın CMYK modunda kaydedildiğini doğrulayın.
Taşma ve Kesim Payı: Kesim sırasında yazıların gitmemesi için kenarlardan en az 3 mm taşma payı bırakın.
Güvenli Alan Sınırı: Telefon, logo gibi tüm kritik bilgileri kesim çizgisinden en az 4 mm içeride tutun.
Yazıların Convert Edilmesi: Kullanılan yazı tiplerinin kaymaması için tüm metinleri vektörele (create outlines/convert) çevirin.
Dosya Formatı Uyumu: Tasarımınızı AI, PDF, EPS veya yüksek çözünürlüklü PSD/CDR formatlarında kaydedip iletin.
:::

Tüm sipariş detayları, manyetik çekim gücü ve teslimat süreçleri ile ilgili aklınıza takılan soruların yanıtlarını aşağıda bulunan **Sıkça Sorulan Sorular** bölümünde bulabilirsiniz. Hemen güncel fiyatlarımıza göz atmak ve sipariş oluşturmak için **[Magnet Baskı Fiyatları](/magnet)** sayfamızı ziyaret etmeyi unutmayın!`,
    faq: [
      {
        question: 'Magnet kaç mm olmalı?',
        answer: 'Standart reklam magnetleri için ideal ve en çok tercih edilen kalınlık 0.40 mm\'dir. Bloknotlu veya daha ağır lüks modellerde ise 0.50 mm veya 0.70 mm mıknatıslar tercih edilmelidir.'
      },
      {
        question: 'Magnetler buzdolabına hazır mı gönderiliyor, arkasındaki mıknatıslar yapışık mı?',
        answer: 'Evet. Matbaamızdan sevk edilen tüm magnetler, arka yüzeyindeki mıknatıs levhaları sıvanmış (yapıştırılmış), seçtiğiniz ebatta pürüzsüzce kesilmiş ve kutudan çıkar çıkmaz buzdolabına asılmaya hazır (bütünleşik ürün) olarak gönderilir. Ekstra bir yapıştırma veya montaj işlemi yapmanıza kesinlikle gerek yoktur.'
      },
      {
        question: 'Magnet kaç yıl dayanır?',
        answer: 'Nemsiz ortamlarda ve doğrudan güneş ışığına maruz kalmadığı sürece kaliteli bir magnet buzdolabı üzerinde 3 ila 5 yıl boyunca manyetik çekimini koruyabilir.'
      },
      {
        question: 'Magnet baskıda hangi kağıt kullanılır?',
        answer: 'Mıknatıs levhanın üzerine sıvanmak üzere genellikle 250 gr veya 300 gr kuşe kağıt kullanılır ve üzeri selefon laminasyonu ile kaplanır.'
      },
      {
        question: 'Magnet üzerine QR kod eklemek mantıklı mı ve eklenebilir mi?',
        answer: 'Evet, kesinlikle eklenebilir ve son derece mantıklıdır. Magnet üzerine yerleştirilecek yüksek çözünürlüklü bir QR kod sayesinde, müşterileriniz kağıt menü arama derdiyle uğraşmadan telefon kameralarıyla güncel dijital menünüze veya WhatsApp sipariş hattınıza saniyeler içinde ulaşabilir. Bu durum paket servis sipariş dönüşümlerini ciddi oranda artırır.'
      },
      {
        question: 'Özel kesim magnet yaptırılır mı?',
        answer: 'Evet, standart dikdörtgen magnetlerin yanı sıra firmanın faaliyet gösterdiği alana uygun (su damlası, ev, tüp, anahtar gibi) özel kesimli bıçaklar üretilerek kesim yapılabilir.'
      },
      {
        question: 'Magnet suya dayanıklı mı?',
        answer: 'Magnetin ön yüzeyi selefon laminasyon kaplı olduğu için su sıçramalarına ve neme karşı dayanıklıdır. Ancak tamamen suya batırılması veya yoğun ıslaklığa maruz kalması durumunda kenarlardan açılma yapabilir.'
      },
      {
        question: 'Magnet baskı ofset mi dijital mi yapılır?',
        answer: 'Yüksek adetli kurumsal siparişlerde en ekonomik ve kaliteli sonuç için ofset baskı tercih edilir. Az adetli veya kişiye özel butik projelerde ise dijital baskı bantları kullanılır.'
      },
      {
        question: 'Magnet tasarımında nelere dikkat edilmeli?',
        answer: 'Telefon numarası ve unvanın büyük ve okunabilir olmasına, gereksiz metin kalabalığından kaçınılmasına, renk kontrastına ve kesim payı için kenarlardan en az 3 mm boşluk bırakılmasına dikkat edilmelidir.'
      },
      {
        question: 'Özel kesim magnetler fiyatı çok artırır mı?',
        answer: 'Düz kesim magnetlere oranla metal fantezi bıçak imalatı nedeniyle küçük bir kalıp maliyeti ve kesim firesi farkı eklenir. Ancak reklam geri dönüş hızı düşünüldüğünde bu bütçe oldukça avantajlı sığmaktadır.'
      },
      {
        question: '0.40 mm ve 0.50 mm mıknatıs arasında ne fark vardır?',
        answer: '0.40 mm mıknatıs dolap kapağında harika bir tutunma verir ve standart paket reklamlar için fazlasıyla yeterlidir. 0.50 mm ise üzerine bloknot defteri takılacak lüks magnet tiplerinde tercih edilmektedir.'
      },
      {
        question: 'Türkiye\'nin her yerine magnet gönderiliyor mu?',
        answer: 'Evet, Mavi Basım olarak 81 ilin tamamına hızlı ve güvenli kargo ile magnet gönderiyoruz. Ağır mıknatıslı tabakalardan oluşan magnet paketleri taşıma esnasında ezilmeye ve bükülmeye karşı çift oluklu Kraft kolilerle özenle paketlenerek sevk edilir.'
      },
      {
        question: 'Tasarımı siz hazırlıyor musunuz?',
        answer: 'Evet, profesyonel grafik tasarım ekibimiz firmanızın logo, telefon, adres ve QR kod gibi bilgilerini alarak sektörünüze en uygun tasarımı sıfırdan hazırlar. Siz tasarımın dijital PDF provasına onay vermeden kesinlikle baskıya geçilmez.'
      },
      {
        question: 'Mıknatıslı ürünler kargoda kırılır mı veya bükülür mü? Nasıl paketleniyor?',
        answer: 'Magnetler esnek ferrit mıknatıs tabakalarından üretildiğinden kırılma riski yoktur. Bükülme, ezilme ve köşe darbelerine karşı %100 koruma sağlamak adına, ağır paketlerin sevkiyatında mukavemetli çift oluklu Kraft ambalaj kolileri ve iç destek kartonları kullanmaktayız.'
      },
      {
        question: 'Baskıya başlamadan önce tasarımda kaç kez revizyon yaptırabilirim?',
        answer: 'Sipariş onayının ardından grafik ekibimiz size özel taslak hazırlar. Baskı aşamasına geçene kadar tasarım üzerinde herhangi bir sınır veya ek ücret olmaksızın dilediğiniz kadar revizyon talep edebilirsiniz.'
      },
      {
        question: 'Kendi hazırladığım tasarımı gönderirsem baskıdan önce kontrol ediliyor mu?',
        answer: 'Kesinlikle evet. Kendi hazırladığınız Adobe Illustrator (AI), PDF, Photoshop (PSD) veya CorelDRAW (CDR) formatındaki dosyaları bize ilettiğinizde, grafik ekibimiz baskı öncesinde çözünürlük, CMYK renk modu, kesim (taşma) payı ve güvenli alan sınırları açısından tasarımı detaylıca kontrol eder. Herhangi bir teknik hata veya kayma riski tespit edilirse, baskıya girmeden önce size ücretsiz teknik geri bildirim raporu sunulur ve tasarım düzeltildikten sonra dijital PDF provası ile nihai onayınız alınır.'
      },
      {
        question: 'Magnet kaç günde teslim edilir?',
        answer: 'Grafik onayınızın ardından magnetleriniz 3-4 iş günü içerisinde üretilir ve kargoya verilerek ortalama 1-2 iş günü içerisinde adresinize teslim edilir.'
      }
    ]
  },
  {
    slug: 'kartvizitte-mat-mi-parlak-mi',
    title: 'Kartvizit Baskısında Mat Selefon mu Parlak Selefon mu Tercih Edilmeli?',
    excerpt: 'Kartvizitiniz ilk izleniminizdir. Kurumsal kimliğinizi en doğru yansıtacak laminasyon türünün, selefonun, lak ve gofre uygulamalarının sırları bu makalede.',
    date: '20 Mayıs 2026',
    readTime: '7 Dk Okuma',
    category: 'Kartvizit & Prestij',
    image: '/images/kartvizit/kartvizit-baski.webp',
    schemaType: 'Article',
    content: `## Kartvizit Laminasyon Seçimi ve Sektörünüz İçin Doğru Karar

İş toplantılarında veya müşteri görüşmelerinde verdiğiniz kartvizit, siz o ortamdan ayrıldıktan sonra bile sizin adınıza konuşmaya devam eden bir marka elçisidir. Kartviziti alan kişinin parmak uçları, kağıdın dokusunu saniyeler içinde tahlil eder.

Kartvizit imalatında nihai fiyatı belirleyen temel unsurlar; seçilen kağıt gramajı (350 gr veya lüks 700 gr sıvamalı kuşe), yüzey kaplama selefon türü (mat veya parlak), lokal kabartma lak, altın/gümüş yaldız, oval veya özel fantezi kesim işçilikleri ve sipariş verilen adet miktarıdır. İhtiyacınıza en uygun bütçeyi belirlemek için bu kriterleri göz önünde bulundurmalısınız.

Kendinizi ifade edeceğiniz [Lüks Kartvizit Fiyatları](/kartvizit) listemize göz atabilir, kurumsal yazışmalar için [Antetli Kağıt sayfasına](/antetli) yönelebilir ya da evrak işleriniz için [Zarf Baskısı sayfasına](/zarf) ait çözümleri inceleyebilirsiniz.

### Kullanım Amacına Göre Kartvizit Seçim Rehberi

Kartvizit seçimi yaparken yalnızca faaliyet gösterdiğiniz sektörü değil, kartvizitleri hangi senaryoda ve ne amaçla kullanacağınızı da göz önünde bulundurmalısınız. İşte en yaygın pratik kullanım amaçlarına göre laminasyon seçim önerilerimiz:

- **Çok Dağıtılacak / Ekonomik Kartvizit:** Fuarlarda, kongrelerde veya toplu halkla ilişkiler etkinliklerinde geniş kitlelere dağıtacağınız tanıtım kartlarında, renkleri en canlı ve parlak haliyle yansıtan, bütçe dostu **Parlak Selefonlu Kartvizit** modellerini tercih edebilirsiniz.
- **Lüks Kurumsal Kartvizit:** İş ortaklarıyla kritik toplantılarda, premium müşteri ziyaretlerinde ve kurumsal vizyonunuzu en üst perdeden temsil etmek istediğiniz anlarda, parmak ucunda ipeksi/kadifemsi dokunuş bırakan **Mat Selefonlu** veya onun üzerine uygulanan şık **Kısmi Kabartma Laklı Kartvizit** modelleri tartışmasız en doğru seçenektir.
- **Üzerine Not Alınacak / Randevu Kartı:** Güzellik salonları, klinikler, veterinerler veya diş hekimleri gibi müşterisine bir sonraki seans tarihini kartın arkasına yazarak veren işletmelerde, kalemin kaymadan ve mürekkebi dağıtmadan yazabilmesine imkan sunan kendinden pürüzlü **Dokulu Tuale Kartvizit** modelleri tercih edilmelidir.
- **Renklerin Canlı Görünmesi İstenen Kreatif Kartvizitler:** Fotoğrafçılar, reklam ajansları, grafik tasarımcılar, moda tasarımcıları veya rengarenk ürün portföyüne sahip sanatçılar için renk pigmentlerini patlatan, derinlik katan ve tüm tonları en yüksek kontrastla sunan **Parlak Selefonlu Kartvizit** seçenekleri öne çıkmaktadır.

### Selefon Nedir? Neden Kullanılır?

Matbaacılıkta koruyucu plastik filme **Selefon** denir. Kartvizit baskısında en sık sorulan soru ise *"Mat selefon mu parlak selefon mu?"* sorusudur. **Mavi Basım** olarak hangi kaplamanın hangi iş kolu için daha uygun olduğunu açıklıyoruz.

:::info-cards
Mat Selefon Özellikleri
- Işığı yansıtmayan, kadifemsi, pürüzsüz ve ağırbaşlı koruyucu tabaka.
- Kartvizit renklerini daha pastel, oturaklı ve elit gösterir.
- Hukuk, mali müşavirlik, tıp, mimarlık ve kurumsal holdingler için idealdir.
- Üzerine lokal kabartma lak uygulandığında harika kontrast yaratır.
---
Parlak Selefon Özellikleri
- Kağıt yüzeyine uygulanan ve ışığı pırıl pırıl yansıtan parlak katman.
- Renk pigmentlerini oldukça canlı, parlak ve keskin gösterir.
- Reklam ajansları, kuaförler, start-up'lar ve kreatif tasarımcılar için uygundur.
- Kartviziti sudan, kirden ve sürtünmelerden maksimum derecede korur.
---
Gramaj ve Mukavemet
- Standart kartvizit üretiminde en az 350 gr kuşe kağıt kullanılmalıdır.
- Daha ince kağıtlar el sıkışırken bükülür ve kurumsal imajınızı sarsar.
- Daha yüksek kalite için 700 gr çift kat sıvamalı lüks seriler tercih edilmelidir.
:::

---

## Kartvizit Tasarımında En Sık Yapılan Hatalar

:::warning-box
- 350 gram altındaki ince, fason kağıtlar tercih etmek.
- Çok küçük fontlar (6 punto ve altı) kullanarak okunabilirliği düşürmek.
- Kesim bıçağının kayma payını hesaba katmadan sıfır kenar tasarım yapmak.
- Kabartma lak uygulamasını parlak selefonlu yüzeylerde denemek (kontrast oluşmaz).
:::

---

## Mavi Basım Premium Kartvizit Seçenekleri

:::importance-cards
350g Premium Kuşe | Kartınızın elden ele dolaşırken bükülmesini önleyen, standartların ötesinde tok ve sağlam kuşe mukavva yapısı. | /kartvizit
Kısmi Kabartma Lak | Logonuzun mat zemin üzerinde pırıl pırıl parlayarak parmak uçlarında muazzam bir dokunma hissi uyandırmasını sağlayan lokal kabartma lak. | /kartvizit
Oval Köşe Kesimi | Keskin köşeleri yumuşatarak ceplere girerken bükülmeyi önleyen ve modern bir hava katan özel oval bıçak kesimleri. | /kartvizit
Çift Yönlü Ofset | Ön ve arka yüzlerde renk kalibrasyonu yapılmış, pürüzsüz grafik netliği sunan çift taraflı yüksek kaliteli baskı teknolojisi. | /kartvizit
:::

:::gallery
/images/kartvizit/kartvizit-baski-detayi.webp | Mat Selefonlu Kartvizit | Dokusu: Yakın plan yüzey dokusu, yansıma yapmayan, pürüzsüz ve ağırbaşlı mat laminasyon. | /kartvizit
/images/kartvizit/kartvizit-yakin-cekim.webp | Parlak Selefonlu Kartvizit | Görünüm: Yansımalı ve göz alıcı görünüm, renkleri en parlak ve canlı haliyle öne çıkarır. | /kartvizit
/images/kartvizit/kartvizit-baski.webp | Mat Selefon + Kabartma Lak | Ayrıntı: Mat zemin üzerinde pırıl pırıl parlayan ve dokunulduğunda hissedilen şık lokal lak detayı. | /kartvizit
/images/kartvizit/kartvizit-tasarimi.webp | Oval Köşe Kesimi | Kesim: Köşelerin hassas fantezi bıçaklarla yuvarlatıldığı pürüzsüz ve modern görünüm. | /kartvizit
/images/kartvizit/kartvizit-ornegi.webp | Dokulu Tuale Kartvizit | Doku: Kendinden desenli, tuval dokusuna sahip lüks kâğıt detayı. | /kartvizit
:::

### Mükemmel Sonuç İçin Üretim Kombinasyonları

Kartvizitinizin etkileyiciliğini maksimuma çıkarmak için matbaamızda birden fazla premium özelliği eş zamanlı olarak bir araya getirebilirsiniz. Sıklıkla uyguladığımız ve en çok tercih edilen tescilli kombinasyonlar şunlardır:

1. **Mat Selefon + Kısmi Kabartma Lak + Oval Köşe Kesimi (En Çok Satan Premium Seri):** Kartvizit yüzeyine ipeksi mat selefon kaplanır; logonuz ve şirket unvanınız parlak lokal kabartma lak ile öne çıkarılır ve köşeler oval kesilerek hem estetik hem de cebe girerken yıpranmayan son derece lüks bir yapı oluşturulur.
2. **Mat Selefon + Oval Köşe Kesimi:** Sadelikten ve şıklıktan ödün vermeyen, sade kurumsal kimliğini ekonomik ama kaliteli bir dokunuşla tamamlamak isteyenler için en popüler kombinasyondur.
3. **Parlak Selefon + Standart Düz Kesim (Ekonomik Seri):** Yoğun adetlerde basılıp dağıtılacak, renklerin parlamasının ve canlılığın istendiği reklam projeleri için çift taraflı parlak selefon kaplaması ve standart düz kesim birleştirilir.

*Not: Dokulu tuale kağıtlar kendinden desenli ve emici bir yapıya sahip olduğundan, dokuyu kaybetmemek adına tuale kartvizitlerde selefon laminasyonu veya lokal kabartma lak uygulaması yapılmamaktadır. Tuale serisinde oval kesim kombinasyonu ise başarıyla uygulanabilmektedir.*

---

## Laminasyon Seçenekleri Karşılaştırma Tablosu

### Sektörünüze En Uygun Kartvizit Seçim Tablosu

Aşağıdaki karar tablosu, işletmenizin veya mesleğinizin prestijini en iyi yansıtacak laminasyon ve kağıt seçimini saniyeler içinde yapmanızı sağlar:

| Sektör / Meslek Grubu | Önerilen Model | Neden Bu Seçim? | Kombinasyon Önerisi |
| :--- | :--- | :--- | :--- |
| **Avukat, Mali Müşavir, Doktor, Yönetici** | Mat Selefonlu Kartvizit | Ağırbaşlı, prestijli, kurumsal ve güven veren elit görünüm sunar. | Mat Selefon + Kısmi Kabartma Lak |
| **Güzellik Salonu, Kuaför, Klinik** | Dokulu Tuale Kartvizit | Randevu tarihi ve saati arkasına tükenmez kalemle kolayca yazılabilir. | Dokulu Tuale + Oval Köşe Kesimi |
| **Reklam Ajansı, Fotoğrafçı, Kreatif** | Parlak Selefonlu Kartvizit | Canlı renk kontrastı, derin ve enerjik görsel zenginlik hissi kazandırır. | Parlak Selefon + Düz Giyotin Kesim |
| **İnşaat, Sanayi, Ağır Sanayi** | Çift Taraf Mat Sıvamalı (700g) | Elden ele dolaşırken bükülmeyen, bükülmeye karşı son derece dayanıklı kalın yapı. | Mat Sıvamalı (Kalın) + Gofre Kabartma |
| **E-Ticaret, Butik, Kafe, Restoran** | Oval Kesimli Kartvizit | Kutulardan ve ceplerden kayarak çıkabilen, köşeleri yıpranmayan sıcak tasarım. | Mat Selefon + Oval Köşe Kesimi |

<br/>

| Özellik / Format | Mat Selefonlu Kartvizit | Parlak Selefonlu Kartvizit | Dokulu Tuale Kartvizit |
| :--- | :--- | :--- | :--- |
| **Yüzey Dokusu** | Mat, Pürüzsüz, Kadifemsi | Parlak, Kaygan, Pürüzsüz | Kendinden Dokulu, Çizgili |
| **Renk Canlılığı** | Pastel ve Ağırbaşlı Tonlar | Aşırı Canlı ve Keskin Tonlar | Mat, Mürekkebi Emen Klasik Yapı |
| **Lokal Lak Uyumu** | Mükemmel Kontrast Oluşturur | Önerilmez (Lak Belli Olmaz) | Dokulu Yapıdan Ötürü Uygulanamaz |
| **Yazı Yazılabilirlik** | Kısmen Yazılabilir | Yazılamaz (Kaygandır) | Tükenmez ve Dolma Kalemle Kolayca Yazılır |
| **Çizilme Direnci** | Yüksek (Mikro çizikleri gizler) | Çok Yüksek (Sert yüzey koruması) | Düşük (Laminasyonsuzdur, yıpranabilir) |
| **Parmak İzi Hassasiyeti**| Parmak izi tutmaz, temiz kalır | Parmak izi ve yansıma gösterebilir | Parmak izi ve leke tutmaz |
| **Kullanım Ömrü** | Çok Uzun Ömürlü (Neme ve bükülmeye karşı dayanıklı) | Maksimum Uzun Ömürlü (Sıvıya ve aşınmaya karşı ekstra dayanıklı) | Orta Ömürlü (Neme karşı hassas, kutuda saklanmalı) |
| **Maliyet Seviyesi** | Orta Seviye | Ekonomik | Premium |
| **Kurumsal Prestij** | ★★★★★ | ★★★★☆ | ★★★★★ |

---

## 5 Adımda Kartvizit Siparişi

:::process-steps
Kartvizit Seçimi | Mat, parlak veya gofre kabartmalı modellerimizden birini belirleyin.
Tasarım Hazırlığı | Logonuzu ve unvan bilgilerinizi gönderin, mizanpajı hazırlayalım.
Dijital Onay | Baskıya girmeden önce hazırlanan şablonu PDF olarak onaylayın.
Ofset Üretim | Son teknoloji Heidelberg makinelerimizde yüksek çözünürlüklü baskı başlasın.
Adrese Teslim | Özel kutularında korunaklı şekilde kapınıza kadar teslim edilsin.
:::

:::info-box
### 🚚 Üretim ve Kargo Teslimat Süreleri
- **Standart Selefonlu Seriler (Mat / Parlak):** Grafik tasarım onayının ardından ortalama **2-3 iş günü** üretim süresi ve **1-2 iş günü** kargo teslimat süresi. (Toplam 3-5 iş gününde kapınızda).
- **Lüks Kabartma Laklı ve Özel Kesimli Seriler:** Ek işçilikler ve hassas kesim bıçak kalıpları nedeniyle ortalama **5-7 iş günü** üretim süresi ve **1-2 iş günü** kargo teslimat süresi. (Toplam 6-9 iş gününde kapınızda).
- **Gönderim Bölgesi:** Tüm Türkiye (81 il ve ilçeye anlaşmalı kargo firmaları ile sigortalı ve korunaklı kutularda teslimat).
:::

---

:::cta
TITLE: Kartvizit Ürün Sayfamızı Ziyaret Edin
DESC: Tüm mat, parlak ve özel tuale dokulu kartvizit modellerimizi yakından incelemek, güncel adet ve fiyat listelerini karşılaştırıp kolayca sipariş vermek için hemen ürün sayfamızı ziyaret edin.
BTN_TEXT: Kartvizit Ürün Sayfasına Git
BTN_LINK: /kartvizit
BTN_TEXT_2: Kartvizit Fiyat Listesi
BTN_LINK_2: /kartvizit
:::

:::cta
TITLE: Elit Kartvizit Tasarımları
DESC: Sektörünüze uygun, prestijinizi ilk dokunuşta hissettirecek lak kabartmalı ve çift taraflı lüks kartvizit tasarımlarınızı hazırlıyoruz. Kurumsal şablonunuzu tasarlamak için hemen ekibimizle görüşün.
BTN_TEXT: WhatsApp İletişim Hattı
BTN_LINK: https://wa.me/905321234567
:::`,
    faq: [
      {
        question: 'Mat selefonlu kartvizitin üzerine yazı yazılabilir mi?',
        answer: 'Evet. Mat selefon pürüzlü, ışığı yansıtmayan yapısı sayesinde tükenmez kalem veya asetat kalemiyle üzerine not alınmasına kısmen imkan verir.'
      },
      {
        question: 'Kabartma lak uygulaması parlak selefonda yapılabilir mi?',
        answer: 'Önerilmez. Kabartma lak mat selefonlu yüzeylerde parlayarak kendini gösterir. Parlak selefon üzerine parlak lak atıldığında kontrast oluşmayacağı için kabarma gözle seçilemez.'
      },
      {
        question: 'Oval kesim kartvizit laminasyonu nasıl olmalıdır?',
        answer: 'Oval kesim köşelere sahip kartlarda iki tarafın da aşınmaması için mat selefon kaplanması pürüzsüz kenarların korunmasına katkı sunar.'
      },
      {
        question: 'Minimum kaç adet kartvizit siparişi verebilirim?',
        answer: 'Matbaa üretimi ve verimlilik standartları gereğince minimum kartvizit sipariş adedi modeline göre değişmekle birlikte genellikle 1000 adettir. Çoklu personeli olan kurumsal firmalar için toplu adet planlaması esnek şekilde yapılabilmektedir.'
      },
      {
        question: 'Kartvizit baskısı ortalama kaç iş gününde hazırlanır?',
        answer: 'Standart mat veya parlak selefonlu kartvizitlerimiz tasarım onayınızdan sonra ortalama 2-3 iş günü içerisinde üretilir. Lokal kabartma lak, oval kesim veya sıvamalı lüks kartvizitlerin imalat süreci ise ek işçilik süreçleri sebebiyle ortalama 5-7 iş günüdür.'
      },
      {
        question: 'Türkiye genelinde gönderim yapıyor musunuz?',
        answer: 'Evet. Mavi Basım olarak İstanbul Topkapı merkezli tesislerimizden İzmir, Ankara, Bursa, Antalya, Muğla başta olmak üzere Türkiye’nin 81 iline ve ilçelerine anlaşmalı kargo firmalarımızla (Aras, Yurtiçi, MNG) korunaklı özel kutularda sigortalı gönderim yapıyoruz. Kargo takip numaranız SMS ve e-posta ile tarafınıza iletilmektedir.'
      },
      {
        question: 'Baskıya girmeden önce PDF prova gönderiyor musunuz?',
        answer: 'Kesinlikle evet. Tasarımınız hazır olsa bile, baskı öncesinde tüm çözünürlük, CMYK renk modu ve kesim (taşma) payı kontrollerini yapıp onaylamanız için size dijital PDF prova gönderiyoruz. Sizin nihai onayınız olmadan kesinlikle üretime başlamıyoruz.'
      },
      {
        question: 'Grafik tasarım desteği veriyor musunuz?',
        answer: 'Evet, profesyonel grafik tasarım ekibimiz logonuzu, unvanınızı ve iletişim bilgilerinizi en estetik ve okunabilir şekilde konumlandırarak sektörel standartlara uygun kartvizit mizanpajınızı tamamen ücretsiz olarak hazırlamaktadır.'
      },
      {
        question: 'Elimde sadece logo var, kartvizit tasarımı yapabilir misiniz?',
        answer: 'Kesinlikle evet. Elinizde yalnızca yüksek çözünürlüklü veya vektörel formatta (AI, PDF, CDR, PNG) logonuzun bulunması yeterlidir. Grafik tasarım ekibimiz unvan, isim, telefon, adres ve QR kod detaylarınızı logonuzun kurumsal renkleriyle harmanlayarak baskıya uygun şablonu hazırlar ve onayınıza sunar.'
      }
    ]
  },
  {
    slug: 'restoranlar-icin-en-etkili-reklam-urunleri',
    title: 'Restoranlar İçin En Etkili Çevrimdışı Reklam Ürünleri ve Kombinasyonları',
    excerpt: 'Yemek ve paket servis dükkanlarında broşür, magnet, Amerikan servis ve logolu karton çantaların bütünleşik gücü cirolarınızı nasıl katlar?',
    date: '19 Mayıs 2026',
    readTime: '8 Dk Okuma',
    category: 'Broşür & Reklam',
    image: '/images/amerikan-servis/restoran-amerikan-servis.webp',
    schemaType: 'Article',
    content: `## Restoranlarda Çevrimdışı Reklam ve Bütünsel Marka Gücü

Yemek ve paket servis dükkanlarında broşür, magnet, Amerikan servis ve logolu karton çantaların gücü, dijital pazarlama bütçelerinizi optimize ederken sipariş tekrar oranını ve müşteri sadakatini uzun vadeli olarak destekler.

Restoran masalarının vazgeçilmezi [Amerikan Servis sayfasına](/amerikan-servis) ait tasarımları görebilir, buzdolaplarını süsleyen [Magnet sayfasına](/magnet) ait fiyatları inceleyebilir, şık paketleriniz için [Karton Çanta sayfasına](/karton-canta) ve hesap kayıtları için [Adisyon ve Sipariş Koçanlarına](/makbuz-ve-formlar) ait taslakları sitemizden inceleyebilirsiniz.

:::callout
TITLE: 🍽️ İşletme Türünüze Göre En Doğru Reklam Ürün Kombinasyonları
İşletmenizin hizmet tarzına ve bütçenize göre en yüksek geri dönüşü alabileceğiniz ideal matbaa kombinasyonları şunlardır:
- **Pizzacı, Kebapçı ve Dönerciler (Paket Servis Odaklı):** **Özel Kesim Magnet + Katlamalı Menü Broşürü** ➡️ Paket servis poşetlerinin içine menü ekleyip, müşterinin mutfağında 7/24 kalıcı olmak için dolap kapaklarına magnet yerleştirmelisiniz.
- **Kafeler ve Butik Restoranlar (Masada Servis Odaklı):** **Baskılı Amerikan Servis + Adisyon Fişi + Masaüstü Menü** ➡️ Masaların her daim temiz, hijyenik ve şık görünmesini sağlarken, sipariş süreçlerinizi kolayca takip edersiniz.
- **Lüks Restoranlar ve Gurme Paket Servisler:** **Lüks Karton Çanta + Amerikan Servis + Kalın Mat Selefonlu Broşür** ➡️ Paket siparişlerinizi lüks karton çantalarda sunarak müşteride prestijli bir marka algısı oluşturur ve marka bilinirliğinizi artırırsınız.
:::

### En Etkili Restoran Reklam Ürünleri

Bir sosyal medya reklamı saniyeler içinde kaybolurken, buzdolabına asılan bir magnet veya paket içerisine atılan bir menü broşürü aylarca müşterinin karşısında kalır. En çok tercih edilen basılı ürünler şunlardır:

:::info-cards
Magnet & Buzdolabı Reklamı
- En yüksek geri dönüş oranına sahip, yıllarca dolapta asılı kalan mıknatıslı reklam.
- Üzerindeki telefon, WhatsApp ve QR Menü kodu siparişi hızlandırır.
- Özel döner, pizza veya su damlası şeklinde figürlü kesimler dikkat çeker.
---
Menü Broşürü & El İlanı
- Paket servis kutularına atılan, resimli ve fiyat listeli dikey tanıtımlar.
- Kampanyaları, indirimleri ve tatlı-içecek kombinasyonlarını müşteriye sunar.
- Yüksek çözünürlüklü iştah açıcı yemek fotoğrafları sipariş sepetini büyütür.
---
Amerikan Servis (Tepsi Kağıdı)
- Hem masada hijyen sağlar hem de müşterinin yemek beklerken okuduğu alandır.
- Kraft veya 80 gr 1. Hamur kağıtlar üzerine basılan menü ve sosyal medya linkleri.
- Müşteriyi QR kod ile Google yorumu yazmaya veya sosyal medyaya davet eder.
---
Karton Çanta & Paketleme
- Sokaklarda dolaşan, hareket halindeki kurumsal billboard reklamınızdır.
- Kaliteli ve sağlam ambalaj, müşteride doğrudan "lüks restoran" algısı yaratır.
- Taşınırken bükülmeyen lüks Bristol kartondan üretilmiş saplı çantalar.
:::

---

## Restoran Ambalaj ve Matbaa İşlerinde Yapılan Hatalar

:::warning-box
- Islaklık ve yağdan etkilenen selefonsuz, kalitesiz kağıtlar kullanmak.
- Okunamayacak kadar küçük basılmış QR kodları yerleştirmek.
- Gıda temasına uygun olmayan, kimyasal solvent kokulu mürekkeplerle basım yapmak.
- Siparişlerin yanına magnet veya broşür eklemeyi unutmak (büyük ciro kaybı).
- Ürünleri (özellikle kraft Amerikan servis ve kağıt poşetleri) nemli, buharlı veya doğrudan güneş ışığı alan ortamlarda saklayarak dalgalanmasına, sararmasına veya yapışkanlarının açılmasına sebep olmak.
- Magnetleri aşırı sıcak fırın veya ızgara yakınında depolayarak manyetik özelliklerinin zayıflamasına yol açmak.
:::

---

## Mavi Basım Restoran Matbaa Paketleri Avantajları

:::importance-cards
Gıda Sertifikalı Kağıt | Tarım ve Orman Bakanlığı standartlarına tam uyumlu, gıda temasına uygun kokusuz ve hijyenik selüloz malzemeler.
Vibrant Ofset Mürekkep | Yemeklerin tüm iştah açıcı renklerini capcanlı gösteren, solmayan ve akmayan fırınlanmış dikey ofset boyaları.
Ebat Alternatifleri | Amerikan servislerde 30x40 cm and 35x50 cm, menülerde ise katlamalı A4 ve DL broşür kesim zenginliği.
Bütünleşik Marka Uyumu | Tüm ürünlerde (karton çanta, adisyon, magnet, Amerikan servis) birebir aynı kurumsal renk kalibrasyonu (Pantone uyumu).
:::

---

## Restoran Ürünleri Karşılaştırma Tablosu

| Reklam Ürünü | Ortalama Ömür | Müşteri Geri Dönüş Sıklığı / Etki | Temel Odak Noktası |
| :--- | :--- | :--- | :--- |
| **Özel Figürlü Magnet** | 1 - 5 Yıl | Çok Yüksek (Mutfakta 7/24 sürekli görünürlük) | İletişim, Kolay Sipariş Telefonu, Hızlı Erişim |
| **Katlamalı Menü Broşürü** | 2 - 6 Ay | Yüksek (Paket servis sipariş hacmini artırır) | Tüm Yemek Seçenekleri, Fiyatlar ve Kombinasyonlar |
| **Amerikan Servis** | Tek Kullanım | Orta (Yemek beklerken anlık QR Menü taratımı) | Masada Hijyen, Günün Kampanyası, Sosyal Medya Linki |
| **Logolu Karton Çanta** | 1 - 3 Gün | Marka Bilinirliği (Sokakta yürüyen reklam etkisi) | Lüks Marka Algısı ve Güvenli Sıcak Taşıma |

### Restoran Türüne Göre İdeal Ürün Kombinasyon Tablosu

Aşağıdaki tablo, işletmenizin modeline en uygun reklam bütçesini ve ürün eşleşmesini saniyeler içinde belirlemenizi sağlar:

| Restoran Türü | Önerilen Ürün Paketi | Temel Hedef | Bütçe Seviyesi | İdeal Sipariş Adedi |
| :--- | :--- | :--- | :--- | :--- |
| **Paket Servis (Pizza, Kebap, Pide vb.)** | Özel Kesimli Magnet + Katlamalı Broşür | Dolapta kalıcı olmak ve paket siparişi artırmak | Ekonomik / Orta | 2.500+ adet |
| **Butik Cafe, Lokanta & Kahvaltı Salonu** | Amerikan Servis (Tepsi Kağıdı) + Adisyon Fişi | Masada hijyen sağlamak ve hızlı sipariş takibi | Bütçe Dostu | 5.000+ adet |
| **Lüks Restoran, Gurme Lezzetler & Steakhouse** | Lüks İp Saplı Karton Çanta + Mat Selefonlu Broşür | Üst düzey prestij yaratmak, elit marka algısı | Premium / Lüks | 1.000+ adet |
| **Pastane, Fırın & Tatlı Salonu** | Baskılı Kraft Çanta + Islak Mendil + Kartvizit | Pratik ve şık paketleme, hızlı müşteri iletişimi | Ekonomik | 3.000+ adet |

---

## 5 Adımda Restoran Paketi Siparişi

:::process-steps
Kombinasyon Seçin | İhtiyacınız olan restoran basılı materyallerini listeyip adetleri girin.
Menü Tasarımı | Yemek resimlerinizi ve güncel fiyat listenizi tasarım ekibimize iletin.
Onay Süreci | Hazırlanan mizanpajları dijital PDF prova ile detaylıca inceleyip onaylayın.
Seri Üretim | Gıda standartlarına uygun son teknoloji makine parkurumuzda basım başlasın.
Güvenli Kargo | Hasarsız sevkiyat kutularımızla Türkiye genelinde adresinize sevk edilsin.
:::

:::callout
TITLE: ⏱️ Restoran Ürünleri Ortalama Üretim ve Teslimat Süreleri
Siparişinizi onayladıktan sonra ürünlerinizin baskı, kuruma, kesim ve paketleme aşamalarının ne kadar süreceğini aşağıdaki güncel tablodan takip edebilirsiniz:

| Ürün Grubu | Ortalama Üretim Süresi | Kargo / Teslimat Süresi | En Hızlı Gönderim Şekli |
| :--- | :--- | :--- | :--- |
| **Baskılı Amerikan Servis** | 2 - 3 İş Günü | 1 - 2 İş Günü | Anlaşmalı Kargo / Ambar |
| **Özel Kesim / Figürlü Magnet** | 4 - 5 İş Günü | 1 - 2 İş Günü | Korunaklı Kutularla |
| **Karton Çanta / Ambalaj** | 5 - 7 İş Günü | 1 - 2 İş Günü | Ahşap Palet / Koli |
| **Adisyon ve Fatura Formları** | 2 - 3 İş Günü | 1 - 2 İş Günü | Güvenli Paketleme |
| **Katlamalı Broşür / El İlanı** | 3 - 4 İş Günü | 1 - 2 İş Günü | Çift Kırımlı Koli |
:::

### Anadolu'dan Restoran Paketi Siparişi ve Uzaktan Hizmet Süreci

Mavi Basım olarak yalnızca İstanbul değil; **Ankara**, **İzmir**, **Bursa**, **Antalya**, **Muğla**, **Trabzon**, **Samsun**, **Kayseri** başta olmak üzere Türkiye'nin 81 ilindeki restoran ve kafelerin tüm ambalaj ve matbaa ihtiyaçlarını kesintisiz karşılamaktayız:

1. **WhatsApp Üzerinden Hızlı Dosya İletimi:** Menü listenizi, logonuzu ve varsa görsellerinizi doğrudan WhatsApp veya e-posta yoluyla bize iletirsiniz.
2. **Ücretsiz Dijital PDF Prova Onayı:** Tasarım ekibimiz tarafından hazırlanan kurumsal şablon PDF formatında onayınıza sunulur. Siz yazılı 'BASKI ONAYI' vermeden üretime geçilmez.
3. **Ekonomik Anadolu Kargo ve Ambar Sevkiyatı:** Amerikan servisler ve ambalaj malzemeleri yüksek ağırlıklı ürünlerdir. Nakliye maliyetlerinizi en aza indirmek için anlaşmalı kargo firmalarımızın yanı sıra şehrinizdeki ambar kargo ağlarını da aktif olarak kullanmaktayız.
4. **Hasarsız Korunaklı Ambalaj:** Islaklık, nem ve taşıma sırasında oluşabilecek ezilmelere karşı tüm ürünleriniz çift kat oluklu mukavva kolilerle sarılarak güvenle kargolanır.

---

:::cta
TITLE: Restoran Reklam Kampanyası
DESC: Dükkanınızın cirosunu katlayacak, müşterilerin buzdolaplarını süsleyecek ve masalarınızda kurumsal duruş sergileyecek tüm restoran basılı reklam ürünlerinizi tek bir çatı altında hazırlıyoruz. Kampanya paketleri için hemen yazın.
BTN_TEXT: Fiyatları İncele
BTN_LINK: /brosur
BTN_TEXT_2: WhatsApp'tan Teklif Al
BTN_LINK_2: https://wa.me/905321234567
:::`,
    faq: [
      {
        question: 'Restoran için en etkili reklam ürünü hangisidir?',
        answer: 'Paket servis yapan işletmeler için en yüksek uzun vadeli görünürlük sağlayan ürün magnettir. Magnetin menü broşürü ile birlikte kullanılması daha etkili sonuç verebilir.'
      },
      {
        question: 'Amerikan servis reklam amacıyla kullanılabilir mi?',
        answer: 'Evet. Amerikan servis üzerine kampanyalar, QR kodlar, yeni ürünler ve menü bilgileri eklenerek hem hijyen hem de tanıtım amacıyla kullanılabilir.'
      },
      {
        question: 'Menü broşüründe hangi bilgiler bulunmalıdır?',
        answer: 'İşletme logosu, iletişim bilgileri, adres, QR kod, ürün fotoğrafları, fiyatlar, kampanyalar ve çalışma saatleri mutlaka yer almalıdır.'
      },
      {
        question: 'Paket servislerde broşür eklemek faydalı mıdır?',
        answer: 'Evet. Her siparişte broşür göndermek müşterinin diğer ürünleri incelemesini sağlar ve ek sipariş olasılığını artırabilir.'
      },
      {
        question: 'Restoran ve kafe baskı siparişlerinde minimum üretim adetleri nedir?',
        answer: 'Maliye ve matbaa süreçlerinin firesiz çalışabilmesi için özel baskılı Amerikan servislerde minimum 5.000 adet, magnetlerde 1.000 adet, karton çantalarda 1.000 adet ve adisyon/sipariş koçanlarında 5-10 cilt (yaklaşık 500-1000 sayfa) olarak üretim yapmaktayız. Yüksek adetler, birim maliyeti dramatik ölçüde düşürür.'
      },
      {
        question: 'Tasarımımız hazır değilse ambalaj veya matbaa siparişi verebilir miyiz?',
        answer: 'Kesinlikle evet. Menü fiyat listenizi, logonuzu ve varsa ürün fotoğraflarınızı bize WhatsApp veya e-posta ile iletmeniz yeterlidir. Uzman grafik tasarım kadromuz, restoranınızın kurumsal renklerine uygun mizanpajları tamamen ücretsiz olarak hazırlar ve baskıya girmeden önce onayınıza sunar.'
      },
      {
        question: 'Sipariş ettiğimiz ambalaj ve matbaa ürünleri gıda ile temasa uygun mudur?',
        answer: 'Evet. Amerikan servislerimizde ve ambalaj ürünlerimizde gıda ile teması uygun, kokusuz, Tarım ve Orman Bakanlığı standartlarına tam uyumlu yerli selüloz kağıtlar ve bitkisel soya bazlı gıda mürekkepleri kullanmaktayız. Ürünlerimiz sıcak servis esnasında hiçbir şekilde kanserojen madde veya koku salınımı yapmaz.'
      }
    ]
  },
  {
    slug: 'paket-servis-icin-magnet-rehberi',
    title: 'Paket Servis Yapan İşletmeler İçin Adım Adım Magnet Tasarım Rehberi',
    excerpt: 'Sucular, tüpçüler, restoranlar ve lokantalar için çöpe atılmayacak, dolapta daima en üst sırada kalacak özel kesimli magnet dizayn etmenin kuralları.',
    date: '18 Mayıs 2026',
    readTime: '6 Dk Okuma',
    category: 'Masaüstü & Promosyon',
    image: '/images/magnet/magnet-baski-tasarimi.webp',
    schemaType: 'Article',
    content: `## Paket Servis Yapan İşletmeler İçin Adım Adım Magnet Rehberi

Su bayileri, tüpçüler, lokantalar ve teknik servis dükkanları için en değerli reklam alanı, müşterilerin mutfağında bedelsiz olarak elde edilen buzdolabı yüzeyidir. Bu alanı rakiplerinize kaptırmamak için magnet tasarımlarınızı profesyonelce kurgulamanız gerekir.

Kurumsal iletişim için [Magnet sayfasına](/magnet) giderek özel kesimli magnet fiyatlarını görebilir, yanına dağıtacağınız [El İlanı sayfasına](/el-ilani) ait broşürler ve siparişlerde kullanacağınız [Amerikan Servis sayfasına](/amerikan-servis) ait kağıtları listeleyebilirsiniz.

:::info-cards
Özel Figürlü Kesim
- Sıradan düz kesim kare magnetler dolaplarda karmaşa içinde kaybolur.
- Sektörünüzü sembolize eden özel figürlü kesimler (su damlası vb.) ilgi çeker.
- Lazer kesimli özel bıçaklar sayesinde pürüzsüz estetik kenarlar sunulur.
---
Uzun Ömürlü Laminasyon
- Mutfaklar nemli, buharlı ve sıcak ortamlardır.
- Magnetlerin boyasının akmaması için mutlaka koruyucu parlak selefon çekilmelidir.
- Parlak kaplama, renkleri canlı gösterirken yağlanma ve kirlenmeyi engeller.
---
Doğru Bilgi Yerleşimi
- Müşteri dolaba baktığında saniyeler içinde numarayı görebilmelidir.
- Telefon numarası en kalın ve belirgin fontla yazılmalıdır.
- WhatsApp hattı ve QR Sipariş Menüsü eklenmesi geri dönüşü artırır.
:::

---

## Paket Servis Magnetlerinde Yapılan Hatalar

:::warning-box
- 0.40 mm mikron altındaki zayıf mıknatıslar seçip kapaktan düşmesi.
- Selefonsuz baskı yaparak kısa sürede renklerin sararması ve solması.
- Sipariş numarasını okunmayacak kadar küçük ve süslü yazı tipleriyle yazmak.
- Magnet alanına çok fazla yazı sığdırıp karmaşa yaratmak.
- Magnetleri apartman kapı girişlerine veya posta kutularına topluca, üst üste ve dağınık şekilde bırakarak israf etmek (Elden, paket servis siparişi ile birlikte veya kibarca tek tek posta kutularına bırakılmalıdır).
- Manyetik özelliğini korumak amacıyla nemli, rutubetli veya aşırı sıcak fırın/ızgara yakınındaki depolarda ambalajsız olarak muhafaza etmek (Bu durum mıknatıs gücünün zayıflamasına ve ürünlerin birbirine yapışmasına neden olur).
:::

---

## Mavi Basım Kalın Magnet Özellikleri

:::importance-cards
Kalın 0.40-0.50mm Levha | Buzdolabı üzerinde kayma yapmadan yıllarca sımsıkı tutunan yüksek manyetik mukavemetli yerli ferrit mıknatıslar.
Solmaz Canlı Mürekkep | Mutfaktaki ısı, nem ve ışık faktörlerinden etkilenmeyen solmaz UV dikey matbaa boyalarımız.
Mikro Çapaksız Kesim | Özel geliştirilmiş hidrolik lazer kalıplarımızla çapaksız, tertemiz ve pürüzsüz kesim kenarları.
Hızlı Tasarım Desteği | Logonuzla ve iletişim bilgilerinizle sektörünüze en uygun mizanpajı hazırlayan tecrübeli grafik kadromuz.
:::

---

### Magnet Kalınlığı Seçim Karar Tablosu

Buzdolabı üzerinde kaymadan duracak en doğru magnet kalınlığını işletmenizin bütçesine ve amacına göre kolayca belirleyebilirsiniz:

| İşletme Türü ve Dağıtım Amacı | Tavsiye Edilen Kalınlık | Mıknatıs Tutuş Gücü | Kullanım Alanı ve Örnekler |
| :--- | :--- | :--- | :--- |
| **Sokak ve Posta Kutusu Dağıtımı (Yoğun Promosyon)** | **0,40 mm İnce Magnet** | Standart | Yoğun adetli dağıtımlar, tüpçü ve sucu reklamları, fason tanıtımlar |
| **Paket Servis Siparişleri (Standart Esnaf Tanıtımı)** | **0,50 mm Standart Magnet** | Güçlü | Pizzacı, dönerci, restoran paketleri, teknik servis numaraları |
| **Promosyon Not Defterli / Bloknotlu Magnetler** | **0,50 mm + Bloknot** | Çok Güçlü | Eczaneler, emlakçılar, gurme restoranlar, müşteriye özel hediyelik |

---

## Magnet Kalite Değerlendirmesi

| Özellik / Format | 0,40 mm İnce Magnet | 0,50 mm Standart Magnet | 0,50 mm Bloknotlu Magnet |
| :--- | :--- | :--- | :--- |
| **Manyetik Tutunma** | Orta Derece (Standart Dağıtım) | Güçlü Derece (Uzun Ömürlü) | Çok Güçlü (Not Defterini Taşır) |
| **Kullanım Amacı** | Yoğun promosyon, bütçe dostu | Kaliteli yerel esnaf tanıtımı | Premium müşteri hediyesi, fonksiyonel |
| **Selefon Tipi** | Parlak Selefon | Ultra Parlak Selefon | Ultra Parlak Selefon |
| **Fiyat / Performans** | ★★★★★ | ★★★★★ | ★★★★☆ |

---

:::cta
TITLE: Paket Servis Magnet Siparişi
DESC: Su bayileri, tüpçüler ve tüm paket servis noktaları için buzdolaplarını ele geçirecek en güçlü, parlak selefonlu ve figür kesimli magnetlerin üretimini yapıyoruz. Hızlı şablon onayı almak için hemen iletişime geçin.
BTN_TEXT: Magnet Fiyatlarını İncele
BTN_LINK: /magnet
BTN_TEXT_2: WhatsApp Üzerinden İletişim
BTN_LINK_2: https://wa.me/905321234567
:::`,
    faq: [
      {
        question: 'Fiyat bültenini magnet arkasına basabilir miyiz?',
        answer: 'Magnetlerin arka yüzü manyetik levha olduğu için baskı yapılamaz. Ancak magnet yanına tutturulan delikli yırtmaçlı minik bloknot tasarımlarıyla fiyat bültenleri basılabilmektedir.'
      },
      {
        question: 'Üretim ve kargo süresi kaç iş günüdür?',
        answer: 'Özel kesimli magnetlerde tasarım onayı sonrası kalıp ve kesim hazırlığı yapıldığından ortalama üretim süresi 4-5 iş günüdür. Üretim tamamlandığında korunaklı ambalajlar içinde anlaşmalı kargoya verilir ve teslimat adresinize göre 1-2 iş günü içinde ulaştırılır.'
      },
      {
        question: 'Aynı magnet tasarımı farklı ebatlarda basılabilir mi?',
        answer: 'Evet. Ancak farklı ebatlar için kesim kalıplarının (bıçak) yeniden tasarlanması gerekir. Bu nedenle, aynı tasarımdan birden fazla ebatta sipariş vermek istediğinizde her ebat için ayrı adetlerde kalıp üretimi gerçekleştirilir. Sipariş öncesinde müşteri temsilcimize ebat taleplerinizi iletebilirsiniz.'
      }
    ]
  },
  {
    slug: 'kutu-baskida-en-cok-tercih-edilen-modeller',
    title: 'Kutu Baskıda En Çok Tercih Edilen Karton Modelleri ve Kalite Farkları',
    excerpt: 'Pastaneler, tekstil markaları, e-ticaret siteleri ve hediyelik eşya kutuları için Amerikan Bristol ve Kromo Karton seçim rehberi.',
    date: '17 Mayıs 2026',
    readTime: '8 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/kutu/ozel-kesim-kutu-tasarimi.webp',
    schemaType: 'Article',
    content: `## Kutu Baskısı ve Kurumsal Ambalaj Çözümleri

Bir e-ticaret kargosunun ya da bir pastane paketinin açılma anı (unboxing), müşterinizin markanızla en sıkı temas kurduğu andır. Sıradan fason koli yerine logonuzun pırıl pırıl parladığı, düzgün kesimli ve sağlam bir kutu müşteride doğrudan "kaliteli marka" intibası doğurur.

Kurumsal ambalaj ihtiyaçlarınız için [Özel Kutu Baskı fiyatlarımızı](/kutu) ve şık tasarımlı hazır modellerimizi hemen sipariş verebilir, kutularınızı etiketlemek ve mühürlemek için [Baskılı Etiket sayfamızı](/etiket) ziyaret ederek en uygun fiyatları inceleyebilir, lüks tamamlayıcı paketler için [Karton Çanta satın al](/karton-canta) sayfamızdan sipariş oluşturabilirsiniz.

:::callout
TITLE: 📝 Özel Kutu Siparişi Vermeden Önce Netleştirmeniz Gereken 5 Temel Kriter
Hızlı fiyat teklifi almak ve tam ürününüze uygun, sıfır hatalı bir kutu imalatı gerçekleştirmek için aşağıdaki kontrol listesini hazırlamanızı tavsiye ederiz:
- **Ürün Ölçüleri (En x Boy x Yükseklik):** Kutunun içine yerleştireceğiniz ürünün milimetrik dış ölçüleri (iç hacim payı dahil).
- **Taşıyacağı Toplam Ağırlık:** Kutunun taşıyacağı yük miktarı (karton kalınlığını ve dayanıklı kesim yapısını belirleyen en önemli unsurdur).
- **Gıda Teması Olup Olmadığı:** Gıda ürünleriyle doğrudan temas varsa gıda temas sertifikalı, Tarım ve Orman Bakanlığı standartlarına %100 uygun gıda kartonlarının (örneğin saf selüloz Amerikan Bristol) seçilmesi gerekir.
- **Baskı ve Üretim Adedi:** Heidelberg ofset baskı makinelerinin ve kalıplarının kurulum maliyetleri nedeniyle özel logolu kutu imalatlarında ekonomik sınırın minimum 1.000 adet olduğunu dikkate alınız.
- **Yüzey İşleme ve Aksesuarlar:** Kutunun dış yüzeyinde mat/parlak selefon koruması, lokal kısmi lak (parlaklık), gofre kabartma, altın/gümüş varak yaldız veya pencereli asetat gibi estetik detaylar.
:::

### En Çok Tercih Edilen Karton Ambalaj Malzemeleri

:::info-cards
Amerikan Bristol Karton
- İki yüzeyi de parlak beyaz, pürüzsüz ve son derece tok lüks ambalaj kartonu.
- Kozmetik, parfüm, lüks çikolata ve gıda kapaklarında tercih edilir.
- Varak yaldız, lokal lak ve gofre uygulamalarına mükemmel uyum gösterir.
---
Kromo Dubleks Karton
- Ön yüzü parlak beyaz kalsiyum sıvalı, arka yüzü ise gri renkli verimli karton.
- Pizza kutuları, kurabiye kutuları, yedek parça ve hızlı tüketim ambalajları.
- Maliyet etkin ve ekonomik üreticiden fiyat avantajı sunduğu için yüksek adetli siparişlerde idealdir.
---
:::

### Sektöre Göre Kutu Seçim Rehberi

İşletmeniz için en uygun kutuyu belirlerken, sattığınız ürünün cinsi ve sunduğunuz müşteri deneyimi başrol oynar:
- **E-Ticaret ve Ürün Sunumları:** Ürünlerinizi şık ve korunaklı bir unboxing deneyimiyle sunmak için Amerikan Bristol ve Kroma Karton ambalaj kutuları tercih edilir.
- **Pastane ve Unlu Mamuller:** Doğrudan gıda temasına uygun, iç yüzeyi kaplamalı veya saf selüloz Amerikan Bristol kartonlar tercih edilmelidir. Bu kutular gıdanın kokusunu ve tazeliğini korur.
- **Kozmetik ve Lüks Tüketim:** Marka prestijini ön plana çıkarmak için çift yüzü beyaz ve pürüzsüz Amerikan Bristol karton kullanılmalıdır. Üzerine yapılacak altın yaldız, lokal lak ve kabartma (gofre) gibi lüks bitişler bu kartonda kendini gösterir.
- **Tekstil ve Hazır Giyim:** Hem şık duruşu hem de üreticiden fiyat avantajı nedeniyle Amerikan Bristol veya Kroma Karton özel kesimli ürün kutuları idealdir.
- **Hediye ve Tanıtım Setleri:** Yüksek gramajlı Amerikan Bristol karton üzerine yapılan parlak/mat selefon ve özel baskı uygulamaları müşteride üst düzey unboxing etkisi yaratır.

---

### Doğru Ambalaj İçin Karton Seçim Karar Tablosu

Aşağıdaki tablo, paketleyeceğiniz ürünün niteliğine, ağırlığına ve marka segmentinize göre hangi karton ambalaj modelini tercih etmeniz gerektiğini hızlıca gösterir:

| Ürün Grubu / Sektör | Önerilen Karton Malzemesi | Önemli Seçim Kriteri | İdeal Gramaj / Mukavemet |
| :--- | :--- | :--- | :--- |
| **Pastane, Tatlı & Çikolata** | Amerikan Bristol Karton | Hijyen ve gıda temasına %100 uygunluk, kokusuz selüloz | 280 - 350 gr Amerikan Bristol |
| **Kozmetik, Parfüm & İlaç** | Amerikan Bristol (Lüks Selefonlu) | Şık, pürüzsüz görünüm; altın yaldız / gofre kabartmaya uygunluk | 300 - 350 gr Bristol Karton |
| **E-Ticaret & Ürün Ambalajı**| Amerikan Bristol / Kroma Karton | Şık sunum, yüksek baskı netliği ve ürün koruma | 300 - 350 gr Bristol / Kroma |
| **Tekstil, Giyim & Ayakkabı** | Kromo Karton / Bristol Karton | İç sunumda estetik, üreticiden maliyet etkin çözümler | 280 - 350 gr Kromo / Bristol Karton |
| **Hediyelik Eşya & Promosyon** | Bristol / Kroma Karton | Göze çarpan doku ve renk kalitesi, prestijli "unboxing" hissi | 350 gr Bristol / Kroma Karton |

### Kutu Tipi ve Karton İlişkisi Tablosu

Kutunun biçimi (kesim modeli), onun taşıma kapasitesini ve açılış mekanizmasını belirler. Aşağıdaki tablo, en sık tercih edilen kutu modellerinin hangi karton türleriyle imal edildiğini ve ideal kullanım amaçlarını açıklamaktadır:

| Kutu Modeli (Tipi) | En Uygun Karton Türü | Taşıma Kapasitesi ve Özelliği | Önerilen Kullanım Amacı |
| :--- | :--- | :--- | :--- |
| **Özel Kesim Ürün Kutusu** | Amerikan Bristol / Kroma Karton | Yüksek / Yan kilitleri ve dayanıklı gövdesiyle korur | E-ticaret ürünleri, tekstil, kozmetik setleri |
| **Pencereli / Asetatlı Kutu** | Amerikan Bristol / Kromo Karton | Orta / İçindeki ürünün dışarıdan görünmesini sağlar | Kurabiye, el yapımı sabun, hediyelik eşyalar |
| **Geçmeli / Dipli Kutu** | Amerikan Bristol Karton | Orta / Pratik kurulur, alt kilit ağırlıkla kilitlenir | İlaç, kozmetik şişeleri, dikiş macunu ambalajı |
| **Lüks Kapaklı Ürün Kutusu** | Amerikan Bristol Karton | Yüksek / Şık görünüm, parlak/mat selefon kaplama | Lüks takı, saat, prestijli kurumsal hediyeler |
| **Kendinden Saplı Kutu** | Kromo Karton / Amerikan Bristol | Yüksek / Ekstra poşet ihtiyacını ortadan kaldırır | Pasta, tart, yaş pasta ve catering servisleri |

---

## Kutu İmalatında Yapılan Kritik Hatalar

:::warning-box
- Kırım ve katlama noktalarında laminasyon (selefon) kaplatmamak (Karton katlanırken boyası çatlar).
- Gıda kutularında kimyasal kokulu solvent mürekkepler tercih etmek (Koku yiyeceğe geçer).
- Kilit mekanizmalarını yanlış hesaplayıp kutunun kendi kendine açılmasına yol açmak.
- Ürün ölçülerine tam oturmayan gevşek ambalajlar tasarlamak.
- Yanlış koli veya dalga modeli seçmek, ağır ürünlerde mukavemetsiz ince karton kullanıp yırtılmaya neden olmak.
- Kutuları nemli, rutubetli veya aşırı buharlı ortamlarda depolayarak dalgalanmasına, gevşemesine veya formunu kaybetmesine sebep olmak.
- Sevkiyat veya ambar nakliyesi esnasında kutuları aşırı ağır yükler altında üst üste kontrolsüzce istifleyip alt katmanların ezilmesine yol açmak.
- Tasarım dosyasında kesim çizgilerini (bıçak izini) baskı görselinden ayırmamak (Bıçak izleri kutunun üzerinde basılı olarak çıkar).
- Taşma payı (bleed) vermemek veya kesim sınırlarına çok yakın yazılar yerleştirmek (Milimetrik kaymalarda metinler kesilebilir).
- Tasarımları RGB renk uzayında hazırlamak (Baskıda CMYK renk uzayına dönerken tonlarda ve parlaklıkta ciddi sapmalar oluşur).
- Düşük çözünürlüklü görseller ve pikselli logolar kullanmak (Baskı sonrasında kutu üzerinde bulanık ve amatör bir görünüm doğar).
:::

---

## Mavi Basım Sağlam Ambalaj Avantajları

:::importance-cards
Gıda Dostu Selüloz | Tarım Bakanlığı onaylı, gıda ile teması %100 güvenli, kanserojen madde içermeyen pürüzsüz selüloz levhalar.
Çatlamaz Kırım Katlama | Katlama çizgilerinde boyanın dökülmesini ve kartonun yırtılmasını önleyen matbaasal selefon uygulamaları.
Lazerli Hassas Kesim | Otomatik kutu katlama makinelerine tam uyum sağlayan, sıfır hata kilitli kapak lazer bıçak kesimleri.
Lüks Ekstra Bitişler | Altın ve gümüş varak yaldızlar, gofre kabartmalar ve logonuzu parlatan lokal lak süslemeleri.
Sürdürülebilir Üretim | Çevreye duyarlı ormanlardan (FSC sertifikalı) elde edilen geri dönüştürülebilir sürdürülebilir hammaddeler.
Kalibrasyonlu Renk Standardı | Heidelberg ofset teknolojisi ile her baskı partisinde birebir aynı kurumsal kurumsal renk tutarlılığı.
Dijital PDF Prova Onayı | Baskı üretimine başlamadan önce kutu tasarımınızın yerleşimi, logo konumu, renkler ve yazılar dijital PDF prova olarak hazırlanır. Yazılı onayınız alınmadan üretime geçilmez.
Hassas Ölçü ve Kesim Kontrolü | Kesim ve kırım işlemleri sonrasında kutuların ölçüleri, katlama noktaları ve kilit mekanizmaları üretim toleranslarına göre kontrol edilerek hatalı ürünler ayıklanır.
Baskı ve Renk Tutarlılığı Kontrolü | Heidelberg ofset teknolojisi ile seri üretim boyunca renk yoğunluğu, tram netliği ve logo canlılığı sürekli kontrol altında tutulur.
Sevkiyat Öncesi Son Kalite Kontrol | Tamamlanan kutular katlama, kırım ve paketleme süreçlerinde son bir denetimden geçerek hasarsız ve korunaklı paletlerle sevk edilir.
:::

---

### Doğru Ambalaj İçin Karton Seçim Karar Tablosu

Aşağıdaki tablo, paketleyeceğiniz ürünün niteliğine, ağırlığına ve marka segmentinize göre hangi karton ambalaj modelini tercih etmeniz gerektiğini hızlıca gösterir:

| Ürün Grubu / Sektör | Önerilen Karton Malzemesi | Önemli Seçim Kriteri | İdeal Gramaj / Mukavemet |
| :--- | :--- | :--- | :--- |
| **Pastane, Tatlı & Çikolata** | Amerikan Bristol Karton | Hijyen ve gıda temasına %100 uygunluk, kokusuz selüloz | 280 - 350 gr Amerikan Bristol |
| **Kozmetik, Parfüm & İlaç** | Amerikan Bristol (Lüks Selefonlu) | Şık, pürüzsüz görünüm; altın yaldız / gofre kabartmaya uygunluk | 300 - 350 gr Bristol Karton |
| **E-Ticaret & Ürün Ambalajı**| Amerikan Bristol / Kroma Karton | Şık sunum, yüksek baskı netliği ve ürün koruma | 300 - 350 gr Bristol / Kroma |
| **Tekstil, Giyim & Ayakkabı** | Kromo Karton / Bristol Karton | İç sunumda estetik, üreticiden maliyet etkin çözümler | 280 - 350 gr Kromo / Bristol Karton |
| **Hediyelik Eşya & Promosyon** | Bristol / Kroma Karton | Göze çarpan doku ve renk kalitesi, prestijli "unboxing" hissi | 350 gr Bristol / Kroma Karton |

### Kutu Tipi ve Karton İlişkisi Tablosu

Kutunun biçimi (kesim modeli), onun taşıma kapasitesini ve açılış mekanizmasını belirler. Aşağıdaki tablo, en sık tercih edilen kutu modellerinin hangi karton türleriyle imal edildiğini ve ideal kullanım amaçlarını açıklamaktadır:

| Kutu Modeli (Tipi) | En Uygun Karton Türü | Taşıma Kapasitesi ve Özelliği | Önerilen Kullanım Amacı |
| :--- | :--- | :--- | :--- |
| **Özel Kesim Ürün Kutusu** | Amerikan Bristol / Kroma Karton | Yüksek / Yan kilitleri ve dayanıklı gövdesiyle korur | E-ticaret ürünleri, tekstil, kozmetik setleri |
| **Pencereli / Asetatlı Kutu** | Amerikan Bristol / Kromo Karton | Orta / İçindeki ürünün dışarıdan görünmesini sağlar | Kurabiye, el yapımı sabun, hediyelik eşyalar |
| **Geçmeli / Dipli Kutu** | Amerikan Bristol Karton | Orta / Pratik kurulur, alt kilit ağırlıkla kilitlenir | İlaç, kozmetik şişeleri, dikiş macunu ambalajı |
| **Lüks Kapaklı Ürün Kutusu** | Amerikan Bristol Karton | Yüksek / Şık görünüm, parlak/mat selefon kaplama | Lüks takı, saat, prestijli kurumsal hediyeler |
| **Kendinden Saplı Kutu** | Kromo Karton / Amerikan Bristol | Yüksek / Ekstra poşet ihtiyacını ortadan kaldırır | Pasta, tart, yaş pasta ve catering servisleri |

---

### Türkiye’nin 81 İline Güvenli Ambalaj Sevk Eden Güçlü Matbaa Altyapısı

Mavi Basım olarak sadece İstanbul merkezli firmalara değil; Ankara, İzmir, Bursa, Antalya, Adana, Konya, Gaziantep, Samsun, Trabzon ve Erzurum başta olmak üzere Türkiye'nin tüm illerindeki yerel esnaflarımıza ve e-ticaret butiklerimize kesintisiz ambalaj imalatı hizmeti sunuyoruz. Şehir dışından gelen ambalaj siparişlerinizde en ufak bir ezilme, yırtılma veya ıslanma riski olmaması için çift kat koruyucu paletli sevkiyat veya kalın mukavemetli ana kolilerimizle güvenli paketleme standartlarını harfiyen uyguluyoruz.

:::process-steps
Numune ve Bıçak Tasarımı | Ürününüzün milimetrik ölçülerini sizden alarak kutunun özel kesim bıçak şablonunu (taslağını) çiziyoruz.
Dijital PDF Onayı | Logonuzun ve grafik tasarımınızın kutu üzerindeki duruşunu gösteren dijital PDF provayı hazırlayıp baskı öncesi onayınıza sunuyoruz.
Heidelberg Ofset Baskı | Onayınızdan sonra siparişiniz Topkapı üretim parkurumuzda basılır, selefonlanır, lak/yaldız işlemleri yapılır ve bıçak kesimi uygulanır.
Hasarsız Paletli Sevk | Üretimi tamamlanan kutular düz (açık) şekilde, az yer kaplayacak ve kargoda zarar görmeyecek biçimde korunaklı sarılarak kargo veya ambarla kapınıza sevk edilir.
:::

:::cta
TITLE: Markanıza Özel Kutu Tasarımı ve Üretimi
DESC: Ürünlerinize değer katacak, sağlamlığı tescilli ve yüksek çözünürlüklü ofset baskılı karton kutular imal ediyoruz. Ücretsiz bıçak şablonu ve numune desteği için hemen WhatsApp hattımızdan bizimle iletişime geçin.
BTN_TEXT: Özel Kutu Fiyatlarını Alın
BTN_LINK: /kutu
BTN_TEXT_2: WhatsApp Müşteri Temsilcisi
BTN_LINK_2: https://wa.me/905321234567
:::`,
    faq: [
      {
        question: 'Karton kutu imalatında minimum sipariş miktarı (adet) nedir?',
        answer: 'Ofset baskı makinelerimizin kalıp kurulum ve hazırlık maliyetleri nedeniyle, özel logo baskılı karton kutu ve ambalaj imalatlarında minimum sipariş adedimiz 1.000 adettir.'
      },
      {
        question: 'Ürünüm için en doğru kutu modelini ve ölçüsünü nasıl belirlerim?',
        answer: 'Kutunun içerisine yerleştireceğiniz ürünün en, boy ve yükseklik ölçülerini milimetrik olarak ölçmeniz yeterlidir. Müşteri temsilcilerimiz ürününüzün ağırlığına ve hassasiyetine göre Amerikan Bristol veya Kromo Karton arasından en doğru malzemeyi ve kutu modelini ücretsiz olarak belirleyecektir.'
      },
      {
        question: 'Gıda ambalajlarında kullandığınız kartonlar sağlıklı mıdır?',
        answer: 'Evet. Gıda ürünleriyle doğrudan temas eden tüm ambalaj kutularımızda, Tarım ve Orman Bakanlığı gıda temas sertifikalı, koku yapmayan, %100 saf selüloz Amerikan Bristol gıda kartonları kullanıyoruz.'
      },
      {
        question: 'Şehir dışına (İstanbul dışına) gönderimlerde ambalajlar kargoda ezilir mi?',
        answer: 'Hayır. Mavi Basım olarak Türkiye’nin 81 iline sevkiyat yapıyoruz. Kutularınızı açık (katlanmamış) olarak, özel koruyucu paletler üzerine çift kat balonlu naylonlarla sararak veya kalın mukavemetli koli kutularıyla paketleyerek kargoya teslim ediyoruz. Kargo meşakkatinde deformasyon riski yaşanmaz.'
      }
    ]
  },
  {
    slug: 'amerikan-bristol-ile-kroma-karton-farki',
    title: 'Amerikan Bristol ile Kroma Karton Arasındaki Farklar Nelerdir?',
    excerpt: 'Ambalaj kutusu imalatında en çok kullanılan iki temel kağıt türü olan Amerikan Bristol ile Kroma Karton farkları, maliyet analizi ve doğru kullanım alanları.',
    date: '20 Mayıs 2026',
    readTime: '7 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/kutu/karton-kutu-baski-fiyatlari.webp',
    schemaType: 'Article',
    content: `## Amerikan Bristol ve Kroma Karton Seçim Rehberi

Karton ambalaj kutusu yaptırırken karşılaşılan en temel soru **"Amerikan Bristol mü, Kroma Karton mu kullanmalıyım?"** sorusudur. [Özel Kutu Baskı](/kutu) siparişlerinizde bütçenizi ve marka görünümünüzü doğrudan etkileyen bu iki kağıt türü, üretim teknikleri ve yüzey yapıları açısından belirgin farklara sahiptir.

### 1. Amerikan Bristol Karton Özellikleri
- **Yüzey Yapısı:** Çift yüzü pürüzsüz ve bembeyazdır.
- **Renk Performansı:** Yüksek kaliteli selüloz hamurundan üretildiği için CMYK ofset baskılarda pırıl pırıl, canlı renk doygunluğu sunar.
- **Kullanım Alanları:** Kozmetik kutusu üreticisi markalar, parfüm, lüks gıda, çikolata ve prestijli e-ticaret paketleri için ilk tercihtir.
- **Gramaj Çeşitleri:** 230 gr, 250 gr, 300 gr, 350 gr ve 400 gr Amerikan Bristol.

### 2. Kroma Karton Özellikleri
- **Yüzey Yapısı:** Ön yüzü beyaz kuşe kaplamalı, arka yüzü ise gri renklidir.
- **Ekonomik Maliyet:** Geri dönüştürülmüş lif içeren yapısı sayesinde seri üretim ambalaj kutularında ciddi bir birim fiyat avantajı sağlar.
- **Kullanım Alanları:** Gıda dışı ürün kutusu, yedek parça, tekstil, ampul ve seri ambalaj üretimi.
- **Gramaj Çeşitleri:** 230 gr, 250 gr, 300 gr, 350 gr ve 400 gr Kroma Karton.

:::callout
TITLE: 💡 Hangisini Seçmelisiniz?
Eğer ürününüz gıda ile doğrudan temas edecekse veya lüks kozmetik algısı yaratmak istiyorsanız kesinlikle **Amerikan Bristol** tercih etmelisiniz. Bütçe odaklı seri ambalajlarda ise **Kroma Karton** maliyet avantajı sunar.
:::`,
    faqList: [
      {
        question: 'Kroma karton gıda ambalajında kullanılır mı?',
        answer: 'Kroma kartonun arka yüzü gri ve geri dönüştürülmüş hamur içerdiği için doğrudan gıda temasına uygun değildir. Gıda temaslı kutularda %100 saf selüloz Amerikan Bristol kullanılmalıdır.'
      }
    ]
  },
  {
    slug: 'kutu-gramaji-nasil-secilir',
    title: 'Kutu Gramajı Nasıl Seçilir? 230gr - 400gr Karton Seçim Rehberi',
    excerpt: 'Ürününüzün ağırlığına, ebadına ve kargo dayanımına göre 230 gr, 250 gr, 300 gr, 350 gr veya 400 gr karton gramajı seçme teknikleri.',
    date: '21 Mayıs 2026',
    readTime: '6 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/kutu/urun-kutusu-baski.webp',
    schemaType: 'Article',
    content: `## Doğru Kutu Gramajı Seçiminin Önemi

Ambalaj kutusunun ürününüzü taşıyamayıp yırtılması veya tam tersi hafif bir ürün için gereksiz yüksek gramaj seçip maliyet artışı yaşamak sık yapılan hatalardandır. Mavi Basım olarak Topkapı imalat tesislerimizde ürettiğimiz karton gramajları şunlardır:

### Gramajına Göre Kullanım Kılavuzu:
* **230 gr - 250 gr Karton:** Hafif kozmetik tüpleri, sabun, eşarp, ilaç ve küçük elektronik aksesuar kutuları.
* **300 gr Karton:** Standart boy ürün kutusu, gıda dış ambalajı ve tekstil ambalajlarında en yaygın kullanılan ideal gramajdır.
* **350 gr Karton:** Ağır cam kavanozlar, lüks parfüm şişeleri, ayakkabı ve e-ticaret ambalaj kutuları.
* **400 gr Karton:** Ağır yedek parçalar, büyük boy hediyelik setler ve maksimum taşıma mukavemeti gerektiren lüks ambalajlar.`,
    faqList: [
      {
        question: 'Gramaj arttıkça kutu fiyatı çok değişir mi?',
        answer: 'Gramaj artışı ham madde maliyetini bir miktar etkiler ancak baskı ve bıçak kalıp maliyeti aynı kalır. Ağır ürünler için riske girmeyip 350 gr veya 400 gr karton seçilmesi önerilir.'
      }
    ]
  },
  {
    slug: 'kozmetik-kutusu-tasarim-rehberi',
    title: 'Kozmetik Kutusu Tasarım Rehberi: Lüks ve Şık Ambalaj Sırları',
    excerpt: 'Rafta albenisi yüksek, Soft Touch selefonlu, gofre kabartmalı ve altın varaklı kozmetik kutusu imalatı ipuçları.',
    date: '22 Mayıs 2026',
    readTime: '8 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/kutu/hediyelik-kutu-ornegi.webp',
    schemaType: 'Article',
    content: `## Kozmetik Sektöründe Ambalajın Gücü

Kozmetik ürünlerinde tüketicinin satın alma kararını %70 oranında dış ambalaj kalitesi belirler. Lüks bir kozmetik kutusunda şu detaylar öne çıkar:

* **Soft Touch Selefon:** Tüketicinin eline aldığında dokunsal lüks hissi veren kadifemsi yüzey.
* **Gofre Kabartma ve Varak Yaldız:** Logo ve marka isminin ışıkta parlamasını sağlayan sıcak yaldız.
* **Lokal UV Lak:** Yalnızca belirli desen ve yazılara parlaklık kazandıran kontrast işçilik.
* **350 gr Amerikan Bristol:** Pürüzsüz ve dik duran sağlam karton yapısı.`,
    faqList: [
      {
        question: 'Kozmetik kutusu tasarımında numune yapılıyor mu?',
        answer: 'Evet. Seri baskı öncesi plotter dijital kesim makinelerimizde maket numune üretip müşterimize sunuyoruz.'
      }
    ]
  },
  {
    slug: 'gida-kutularinda-karton-secimi',
    title: 'Gıda Kutularında Sağlıklı ve Hijyenik Karton Seçimi',
    excerpt: 'Baklava, çikolata, pastane ve fast food kutularında gıda güvenliği sertifikalı, koku yapmayan karton seçimi.',
    date: '23 Mayıs 2026',
    readTime: '6 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/kutu/butik-baklava-cikolata-kutusu.webp',
    schemaType: 'Article',
    content: `## Gıda Ambalajında Hijyen ve Standartlar

Gıda kutusu baskısında en kritik nokta kartonun gıda ile doğrudan temasa uygun olması ve kimyasal koku yaymamasıdır.

* **%100 Saf Selüloz Yapı:** Geri dönüştürülmüş atık kağıt içermeyen saf beyaz Amerikan Bristol.
* **Yağ ve Nem Bariyeri:** Baklava, tatlı ve burger kutularında iç çeper nem direnci.
* **Şeffaf Pencereli Asetat:** Tüketicinin gıdayı dışarıdan hijyenik şekilde görmesini sağlayan PVC pencere.`,
    faqList: [
      {
        question: 'Gıda kutularında kokusuz mürekkep mi kullanılıyor?',
        answer: 'Evet, gıda ambalajı baskılarımızda gıda tüzüğüne uygun, su bazlı ve kokusuz bitkisel mürekkep serileri kullanılmaktadır.'
      }
    ]
  },
  {
    slug: 'ofset-kutu-baski-nasil-yapilir',
    title: 'Ofset Kutu Baskı Nasıl Yapılır? Adım Adım Ambalaj İmalat Süreci',
    excerpt: 'Tasarım aşamasından Heidelberg baskı makinelerine, selefon kaplamadan Otomatik Bıçak kesim ve yapıştırmaya kutu üretim rehberi.',
    date: '24 Mayıs 2026',
    readTime: '8 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/kutu/kutu-baski-detayi.webp',
    schemaType: 'Article',
    content: `## Karton Kutu Üretim Aşamaları

Karton kutu imalatı yüksek hassasiyet gerektiren endüstriyel bir süreçtir:

1. **Bıçak İzi Çizimi ve Tasarım Oturtma:** Ürünün milimetrik ebatlarına göre vektörel şablon hazırlanır.
2. **CMYK Off-Set Baskı:** Heidelberg makinelerde yüksek kalitede tabaka baskı yapılır.
3. **Yüzey Kaplama (Selefon/Lak):** Koruyucu film ve parlaklık işlemleri kaplanır.
4. **Gofre ve Varak Yaldız (Varsa):** Sıcak baskı presleri uygulanır.
5. **Kazanlı Pres Bıçak Kesim:** Otomatik çelik bıçaklarla pilyaj ve kesim tamamlanır.
6. **Otomatik Yapıştırma ve Paketleme:** Otomatik tutkal hattında yan veya oto dip yapıştırması tamamlanarak kargoya hazırlanır.`,
    faqList: [
      {
        question: 'Ofset kutu baskı süresi kaç gündür?',
        answer: 'Baskı onayı verildikten sonra ortalama 5 - 7 iş günü içerisinde imalat tamamlanarak sevk edilir.'
      }
    ]
  },
  {
    slug: 'selefon-cesitleri-ve-ozellikleri',
    title: 'Ambalaj ve Kutularda Selefon Çeşitleri: Mat, Parlak ve Soft Touch Farkı',
    excerpt: 'Kutunuzun ömrünü uzatan, su ve nemden koruyan mat, parlak, Soft Touch, tek yüz ve çift yüz selefon laminasyonu.',
    date: '25 Mayıs 2026',
    readTime: '6 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/hakkimizda/selefon-nedir-mat-parlak-selefon-farklari.webp',
    schemaType: 'Article',
    content: `## Selefon Çeşitleri Rehberi

Selefon, baskılı kartonun üzerine termal ısı ile yapıştırılan mikron inceliğinde koruyucu plastiktir.

* **Mat Selefon:** Işığı yansıtmaz, kurumsal ve zarif bir görünüm sunar.
* **Parlak Selefon:** Renklerin canlılığını artırır, parmak izi ve kiri kolay temizlenir.
* **Soft Touch (Kadife) Selefon:** İpeksi ve kadifemsi lüks dokunuş hissi yaratır.
* **Çift Yüz Selefon:** Hem iç hem dış yüzeyi neme karşı tam korumaya alır.`,
    faqList: [
      {
        question: 'Selefonsuz kutu yapılır mı?',
        answer: 'Selefonsuz kutularda karton katlama yerlerinden çatlama yapabilir ve renkler aşınabilir. Bu sebeple mutlaka en az tek yüz selefon önerilir.'
      }
    ]
  },
  {
    slug: 'lak-cesitleri-lokal-uv-drip-off',
    title: 'Kutu Baskıda Lak Çeşitleri: Lokal UV, Drip Off ve Dispersiyon Lak',
    excerpt: 'Kutu ambalajınızda görsel derinlik katan lak uygulamaları: Lokal UV (Spot Lak), Drip Off kabarcıklı lak ve koruyucu laklar.',
    date: '26 Mayıs 2026',
    readTime: '7 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/hakkimizda/lak-nedir-lokal-lak-kabartma-lak-uygulamalari.webp',
    schemaType: 'Article',
    content: `## Lak Çeşitleri ve Kullanım Amaçları

* **Lokal UV (Spot Lak):** Mat selefon kaplı kutuda yalnızca logo veya ürün görselinin üzerine yüksek parlaklık katma işlemi.
* **Drip Off Lak:** Mat ve parlak pürüzlü dokuları aynı yüzeyde buluşturan yüksek teknolojili efekt lak.
* **Dispersiyon Lak:** Baskı mürekkebinin kurumasını hızlandıran ve çizilmeleri önleyen su bazlı ekolojik cila.`,
    faqList: [
      {
        question: 'Lokal UV lak her kağıda uygulanır mı?',
        answer: 'En yüksek kontrast efekti için lokal UV lak mat selefon kaplı yüzeylere uygulanmalıdır.'
      }
    ]
  },
  {
    slug: 'kutu-bicak-izi-nedir-nasil-hazirlanir',
    title: 'Kutu Bıçak İzi Nedir ve Baskıya Hazır Bıçak Şablonu Nasıl Hazırlanır?',
    excerpt: 'Kutunun düzgün katlanması ve kilitlenmesi için gereken kırmızı kırım, yeşil kesim ve pilyaj hatlarını çizme rehberi.',
    date: '27 Mayıs 2026',
    readTime: '7 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/kutu/ozel-kesim-kutu-tasarimi.webp',
    schemaType: 'Article',
    content: `## Kutu Bıçak İzi Çizim Standartları

Kutu bıçak izi, kartonun nereden kesileceğini, nereden katlanacağını (pilyaj) gösteren mimari vektörel şablondur.

* **Kesim Çizgisi (Kırmızı / Düz):** Çelik bıçağın kartonu tamamen keseceği sınır.
* **Pilyaj / Katlama Çizgisi (Mavi / Kesikli):** Kartonun kolay katlanması için ezileceği çizgi.
* **Taşma Payı (Bleed):** Bıçak kesim çizgisinden dışarıya +3 mm zemin uzatma payı.
* **Emniyet Payı:** Bıçak çizgisinden içeriye 3 mm mesafe.`,
    faqList: [
      {
        question: 'Bıçak izini Mavi Basım ücretsiz hazırlıyor mu?',
        answer: 'Evet. Sipariş veren müşterilerimize milimetrik ebatlarına uygun bıçak izini PDF olarak ücretsiz gönderiyoruz.'
      }
    ]
  },
  {
    slug: 'kutu-tasima-dayanimi-nasil-hesaplanir',
    title: 'Kutu Taşıma Dayanımı ve Karton Mukavemeti Nasıl Hesaplanır?',
    excerpt: 'Ürününüzün kargoda veya rafta ezilmemesi için karton gramajı, dip kilit yapısı ve istifleme dayanımı hesaplama.',
    date: '28 Mayıs 2026',
    readTime: '6 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/kutu/karton-kutu-baski-fiyatlari.webp',
    schemaType: 'Article',
    content: `## Karton Kutu Mukavemet Faktörleri

Bir kutunun taşıma kapasitesi 3 ana faktörle belirlenir:

1. **Karton Gramajı:** 230 gr ile 400 gr arasındaki karton kalitesi.
2. **Kutu Dip Kapanış Yapısı:** Otomatik kilitli dip (Oto kilit) modelleri düz dipe göre %50 daha fazla ağırlık taşır.
3. **Selefon Koruma Gücü:** Termal selefon karton liflerini birbirine bağlayarak patlama direncini artırır.`,
    faqList: [
      {
        question: 'Ağır ürünlerde oto kilit dip şart mıdır?',
        answer: 'Ağır veya kavanoz tipi ürünlerde ürünün alttan düşmemesi için oto kilit veya ters kilit dip tavsiye edilir.'
      }
    ]
  },
  {
    slug: 'el-ilani-dagitimi-ise-yariyor-mu',
    title: 'El İlanı Dağıtımı İşe Yarıyor mu? Bölgesel Reklamın Geri Dönüş Oranları',
    excerpt: 'El ilanı dağıtımının gerçek dönüş oranları, sektörel başarı analizleri, doğru ebat seçimleri ve kampanya öncesi kontrol listesi.',
    date: '16 Mayıs 2026',
    readTime: '6 Dk Okuma',
    category: 'Yerel Reklam',
    image: '/images/hakkimizda/el-ilani-dagitimi-ise-yariyor-mu-bolgesel-reklam.webp',
    schemaType: 'Article',
    content: `## El İlanı Dağıtımı ve Yerel Reklamın Geri Dönüş Oranları

Girişimcilerin dijital kanallardaki yüksek reklam maliyetlerine alternatif olarak tercih ettiği yerel el ilanları, dükkan etrafındaki 3 kilometrelik çemberde yaşayan potansiyel alıcıların tamamına doğrudan ulaşmanın en etkili yerel iletişim aracıdır. Doğru planlandığında, bölgesel el ilanı kampanyaları oldukça yüksek geri dönüş oranları sağlayabilir. Detaylı ürün ve ebat seçeneklerimizle bütçenizi optimize etmek için [El İlanı Fiyat Listesi](/el-ilani) sayfamızı inceleyebilirsiniz.

**Stratejik El İlanı Dağıtım Planı ve Hedef Bölgeler**
**Bölgesel tanıtım materyallerinizi bastırdıktan sonra hedefe ulaşmanın yolu plansızca sokakta dağıtmaktan değil, sektöre uygun stratejik konumlarda nokta atışı çalışmaktan geçer:**

*(Lütfen dikkat: Mavi Basım olarak esnaflarımızın ve markalarımızın el ilanı, broşür, magnet ve kartvizit gibi tüm kurumsal baskı ihtiyaçlarını yüksek ofset teknolojisiyle üretmekteyiz. El ilanı dağıtım hizmetimiz bulunmamaktadır; bu rehberdeki dağıtım planlamaları ve stratejik öneriler, müşterilerimizin bastırdıkları ilanlardan maksimum geri dönüş almalarını sağlamak amacıyla hazırlanmış danışmanlık tavsiyeleridir.)*

**El İlanı Dağıtımında Dikkat Edilmesi Gereken Yasal ve Etik Kurallar**
Apartman ve site yönetimlerinin ilan bırakma kuralları farklı olabilir. Belediye tarafından ilan dağıtımı yasaklanan alanlarda çalışma yapılmamalıdır. Araç camlarına izinsiz broşür bırakılması bazı bölgelerde şikayet konusu olabilir. Çevre kirliliğine neden olacak rastgele dağıtımlar marka algısını olumsuz etkileyebilir. İzinli ve hedef odaklı dağıtım, hem marka güvenini hem dönüşüm oranını artırır.

Aşağıdaki karşılaştırma tablosunda hangi işletmenin hangi lokasyonları, ne zaman hedeflemesi gerektiği özetlenmiştir:

| İşletme Türü | En Etkili Dağıtım Lokasyonları | En Uygun Gün & Saat Dilimi | Stratejik Dağıtım Tüyosu |
| :--- | :--- | :--- | :--- |
| **Restoran / Paket Servis** | Evlerin posta kutuları, kapı askıları, yakın plazalar | Perşembe - Pazar / 16:30 - 19:30 | İlana mutlaka güncel paket servis menüsü ve özel bir kupon kodu ekleyin. |
| **Halı Yıkama / Temizlik** | Apartman girişleri, posta kutuları, siteler | Mart - Mayıs ve Eylül - Kasım ayları | Bahar temizliği dönemlerinde cazip indirim paketleri sunarak aciliyet hissi yaratın. |
| **Güzellik / Kuaför** | Yakın siteler, kadınların yoğun olduğu caddeler | Hafta içi / 12:00 - 16:00 | "İlk fön veya saç kesimine özel %30 tanışma indirimi" gibi deneme bariyerini düşüren teklifler sunun. |
| **Su Bayisi / Esnaf** | Daire kapı kolları, apartman panoları | Her gün / 10:00 - 18:00 | İlanın magnet formunda olması buzdolabında kalıcı olmasını sağlar, [magnet sayfamızı inceleyin](/magnet). |

**Kampanya Öncesi 6 Maddelik Altın Kontrol Listesi**

Baskı siparişi vermeden ve ilanları sokaklara salmadan önce, reklam verimliliğini korumak için şu detayları mutlaka kontrol edin:

1. **Telefon Numarası Kontrolü:** İlanda yazan sabit ve WhatsApp hatlarının doğru, aktif ve çağrı alabiliyor olduğundan emin olun (En sık yapılan matbaa hatasıdır!).
2. **Adres ve Konum Doğruluğu:** Açık adresin, yol tarifinin veya gerekirse dükkanın haritadaki konumuna giden kısa bir adres bilgisinin doğruluğunu teyit edin.
3. **QR Kod Testi:** İlana yerleştirilen QR kodun mobil cihazlarda hızlıca taranıp taranmadığını ve doğru web sitesine/sosyal medyaya yönlendirdiğini mutlaka test edin. (Eğer broşürlerinize ek olarak ürünlerinize yapıştıracağınız rulo veya tabaka etiketler de düşünüyorsanız, [Etiket Baskı](/etiket) sayfamızdaki taranabilir şık karekodlu tasarımları da inceleyebilirsiniz.)
4. **Dil ve Yazım Kuralları Kontrolü:** İlan üzerindeki başlıklar, fiyatlar ve kampanya şartları son kez okunmalı, yazım hataları düzeltilmelidir. Hatalı basılan binlerce ilan düzeltilemez bir bütçe kaybına yol açar.
5. **Ölçü ve Kesim Payı Güvencesi:** İlanınızın kesilirken yazılarının gitmemesi için kenarlardan en az 3 mm taşma payı verildiğinden emin olun. (Kartvizit hazırlığı yaparken yapılan benzer kritik hataları incelemek için [Kartvizit Tasarım Hataları](/blog/kartvizit-tasarlar-iken-yapilan-hatalar) rehberimize göz atabilirsiniz.)
6. **Baskı Malzemesi ve Gramaj Uyumu:** Hedef kitleye ulaşacak ilanın yırtılmaması ve tok durması için ideal kuşe gramajının (örn. 135 gr veya 170 gr) seçildiğinden emin olun.
`,
    faq: [
      {
        question: "El ilanı dağıtımında en etkili gün hangisidir?",
        answer: "Paket servis ve restoranlar için Perşembe-Pazar arası akşam saatleri; genel hizmet ve yerel dükkanlar için ise Cumartesi günleri en yüksek dönüşüm oranını sağlar."
      },
      {
        question: "10.000 adet el ilanı dağıtımından ne kadar geri dönüş alabilirim?",
        answer: "Yerel ve doğru hedef kitleye yapılan dağıtımlarda geri dönüş oranı sektöre bağlı olarak %1 ile %3 arasında değişmektedir."
      }
    ]
  },
  {
    slug: 'etiket-baskida-rulo-mu-tabaka-mi',
    title: 'Rulo Etiket mi Tabaka Etiket mi? Ambalajınıza En Uygun Ürün Seçimi',
    excerpt: 'Pastane, kozmetik, lojistik ve endüstriyel ambalajlarda kuşe ve opak etiketlerin rulo veya tabaka halinde sipariş edilmesinin maliyet, adet ve zaman avantajları.',
    date: '11 Mayıs 2026',
    readTime: '8 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/etiket/yapiskanli-etiket-baski.webp',
    schemaType: 'Article',
    content: `## Rulo Etiket mi Tabaka Etiket mi? Ambalajınıza En Uygun Ürün Seçimi

Kozmetik ambalajları, gıda kavanozları veya kargo kutularının üzerine yapıştırılan etiketlerin formatı imalat maliyetlerinize ve operasyonel iş gücünüze doğrudan etki eder. Ambalaj yapısına göre doğru malzeme ve rulo/tabaka formatı seçimi bütçenizi korumanın temelidir. En güncel standart ölçü fiyatlarımızı saniyeler içinde karşılaştırmak ve siparişinizi bütçe limitlerinize göre planlamak için doğrudan [Yapışkanlı Etiket Fiyat Listesi](/etiket) sayfamızı ziyaret edebilirsiniz.

Ayrıca ambalajlarınız için [Özel Kutu Baskı](/kutu) tasarımlarımızı inceleyebilir, şık paket taşımaları için [Karton Çanta](/karton-canta) modellerimizi görebilirsiniz.

:::quick-decision
TITLE: ⚡ 30 Saniyede Doğru Malzemeyi Bulun (Pratik Özet)
- 📦 **Kargo Kutusu, Kuru Gıda ve Barkodlar:** En ekonomik çözüm için yarı parlak yüzeyli **Kuşe Etiket** tercih edin.
- 💧 **Su, Nem, Yağ ve Kimyasal Teması:** Islak alanlar ve yıkanan kaplar için yırtılmaz **[PP Opak Plastik](/etiket)** seçin.
- 🔍 **Cam Şişe ve Kavanozlarda Şık Saydamlık:** Ürünün içini gösteren pürüzsüz görünüm için **[Şeffaf Plastik](/etiket)** etiket kullanın.
- 🏷️ **Sipariş Adedi 1.000 Adet Altında ise:** Bobin makine kurulum ücretlerinden kaçınmak için plakalar halinde kesilen **[Tabaka Etiket](/etiket)** seçilmelidir.
- 🏭 **Sipariş Adedi 1.000 ve Üzerinde ise:** Otomatik yapıştırma makinelerine uyum ve düşük birim fiyat için bobine sarılı **[Rulo Etiket](/etiket)** seçilmelidir.
:::

## Hızlı Karar Tablosu

Aşağıdaki pratik eşleştirme tablosuyla aradığınız temel kritere göre en uygun çözümü anında belirleyebilirsiniz:

| Temel İhtiyacınız | Seçmeniz Gereken Malzeme ve Formatı | Örnek Kullanım Alanları |
| :--- | :--- | :--- |
| **Suya ve neme dayanıklı plastik** | [PP Opak Etiket Baskısı](/etiket) | Şampuan, duş jeli, zeytinyağı, turşu şişeleri |
| **Sıvının içi dışarıdan görünsün** | [Şeffaf Etiket Baskısı](/etiket) | Bal, reçel, lüks kozmetik ve serum kavanozları |
| **Ekonomik, bütçe dostu kağıt** | [Kuşe Etiket Baskısı](/etiket) | Kargo kolileri, barkodlar, kuru gıda paketleri |
| **Seri bantta otomatik yapıştırma** | **Rulo Etiket** (Bobine Sarım) | Seri imalat hatları, yüksek hızlı etiketleme |
| **Manuel, az adetli butik yapıştırma** | **Tabaka Etiket** (Plaka Halinde Kesim) | Butik mum atölyeleri, kısıtlı adetli özel seriler |

### Hangi Etiketi Seçmeliyim? Karar ve Kullanım Senaryosu Tablosu

| Kullanım Senaryosu / İhtiyaç | Önerilen Etiket Türü | Tercih Nedeni |
| :--- | :--- | :--- |
| Otomatik etiketleme makinesiyle hızlı şişe yapıştırma | **Rulo PP Opak Plastik** | Bobin akışına uygunluk, makine hızında sıfır kopma |
| Cam kavanoz içindeki reçel veya sosun net görünmesi | **Şeffaf Plastik Etiket** | Saydam yapısı sayesinde arkadaki ürünü mükemmel sergileme |
| Nemli, ıslak banyo ortamındaki şampuan ve duş jeli şişeleri | **PP Opak Plastik Etiket** | Su, nem ve yağa karşı tam koruma, kabarma yapmama |
| Kargo kolileri, sevkiyat barkodları ve lojistik etiketleri | **Tabaka Termal / Kuşe Etiket** | Çok düşük maliyet, pratik elle soyma ve hızlı kullanım |
| Butik mum, el yapımı sabun, az adetli özel tasarımlar | **Tabaka Kuşe Etiket** | Düşük siparişlerde kalıp maliyetsiz ve çok bütçe dostu |
| Derin dondurucuya veya soğuk dolaba girecek gıdalar | **PP Opak (Deep Freeze Tutkallı)** | Soğuk hava ve yoğuşma altında yapışkanlığını koruma |

:::cta
TITLE: Saniyeler İçinde Etiket Fiyatınızı Hesaplayın
DESC: Karar verdiğiniz etiket türünün güncel fiyat listesine ulaşmak ve anında siparişinizi planlamak için fiyat hesaplama sayfamızı ziyaret edin.
BTN_TEXT: Yapışkanlı Etiket Fiyat Listesi
BTN_LINK: /etiket
:::

### Doğrudan Hesaplayıp Sipariş Verebileceğiniz Popüler Seçenekler

Hangi etiketi seçeceğinize karar verdiyseniz, doğrudan ürün sayfalarına geçiş sağlayarak fiyat hesaplayabilir ve satın alma sürecine devam edebilirsiniz:

:::importance-cards
PP Opak Etiket Baskısı | Suya, neme ve yağa %100 dayanıklı, banyo ve zorlu dış mekan koşullarında yırtılmayan beyaz plastik bazlı etiketler. | /etiket
Şeffaf Etiket Baskısı | Cam kavanozlarda ve şık kozmetik ambalajlarında arkadaki sıvıyı gösteren tamamen şeffaf saydam pürüzsüz şıklık. | /etiket
Kuşe Etiket Baskısı | Kargo kutuları, lojistik barkodları ve nemsiz ortam kuru gıda ambalajları için en ekonomik yarı parlak kağıt etiketler. | /etiket
Rulo Etiket Baskısı | Seri üretim yapan dolum tesislerindeki otomatik etiketleme robotlarına tam uyumlu bobin sarım formatı. | /etiket
Tabaka Etiket Baskısı | 100 adetten başlayan düşük bütçeli siparişler ve elle manuel yapıştırma yapılacak butik tasarımlar için ideal kesim. | /etiket
:::

## Pratik Adımlarla Seçim Karar Ağacı

Doğru ambalaj etiketini saniyeler içinde belirlemek için şu mantıksal karar adımlarını takip edebilirsiniz:

1. **Ürününüz sıvı, su, nem veya yoğun yağ ile temas ediyor mu?**
   - **Evet** → Suya dayanıklı polimer yapılı PP Opak veya Şeffaf malzemelere yönelin. (Bkz: [Ofset Baskı ile Dijital Baskı Farkları](/blog/ofset-baski-ile-dijital-baski-farklari))
   - **Hayır** → En ekonomik olan yarı parlak kağıt tabanlı Kuşe malzemeyi seçin. (Bkz: [Kuşe Kağıt ve Bristol Karton Farkları](/blog/kuve-kagit-ve-bristol-karton-farklari))
2. **Ambalaj yüzeyinde şık bir saydamlık veya cam/sıvı netliği hedefleniyor mu?**
   - **Evet** → Şeffaf malzeme tercih edin (arkasına renklerin kaybolmaması için örtücü beyaz astar baskı uygulanır).
   - **Hayır** → Zemin rengini kapatan canlı beyaz yüzeyli PP Opak malzeme tercih edin.
3. **Etiket ambalaj üzerine nasıl yapıştırılacak?**
   - **Otomatik Makine veya Seri Bant** → Bobine sarılı, pürüzsüz taşıyıcılı Rulo formatını seçmelisiniz. (Minimum teknik limit: 1.000 Adet)
   - **El ile (Manuel / Butik)** → Taşıması ve soyulması pratik olan plakalar halindeki Tabaka formatını seçebilirsiniz. (Minimum teknik limit: 100 Adet)
4. **Planlanan veya hedeflediğiniz sipariş adediniz nedir?**
   - **1.000 Adet Altı (Düşük/Butik)** → Kalıp maliyeti sıfır olan ve dijital kesim yapılan Tabaka her koşulda en avantajlı seçenektir.
   - **1.000 - 5.000 Adet ve Üzeri (Yüksek/Endüstriyel)** → Birim fiyatı dramatik şekilde düşen endüstriyel Rulo seçilmeli ve bobin sipariş avantajlarından faydalanılmalıdır.

## Kullanım Sınırları ve Kaçınılması Gerekenler

Farklı etiket türlerinin ve formatlarının uygun olmadığı some kritik sakıncalı kullanım durumları şunlardır:

- **Kuşe Kağıt Malzemeler:** Islak, nemli banyo ortamlarında veya sızma riski olan zeytinyağı, kimyasal deterjan ambalajlarında kullanılmamalıdır. Kağıt yapısı sıvıyı emerek buruşur, yırtılır ve marka kalitesine zarar verir.
- **PP Opak Plastik Malzemeler:** Çok düşük adetli (100-200 adet) siparişlerde, rulo formatında makine kurulum maliyetleri nedeniyle bütçe dostu değildir. %100 ekolojik/doğal doku hedefleniyorsa plastik yapısından ötürü tercih edilmemelidir.
- **Şeffaf Plastik Malzemeler:** Koyu renkli sıvı veya yüzeylerin üzerine beyaz alt astar baskısı olmadan yapıştırılmamalıdır; yazılar ve logolar okunmaz hale gelir. Çok pürüzlü yüzeylerde hava kabarcığı gösterebilir.

:::info-cards
Rulo Formattaki Ürünler
- Şerit halinde bir bobine sarılmış, arkası pürüzsüz silikonlu taşıyıcıya sahip etiketlerdir.
- Otomatik etiketleme makinelerine ve seri üretim bantlarına tam uyum gösterir.
- El değmeden, saniyeler içinde binlerce ürüne yapıştırılarak iş gücünden %90 tasarruf sağlar.
- Sıvı ambalajları ve yüksek hızlı endüstriyel hatlar için son derece verimlidir.
---
Tabaka Formattaki Ürünler
- A4 veya A3 boyutlarındaki düz plakalar üzerine yarım kesimli olarak dizilmiş etiketlerdir.
- Herhangi bir otomatik makine parkuru gerekmektedir, el yardımıyla sökülüp pratik şekilde yapıştırılır.
- Düşük adetli siparişlerde (100 - 500 adet) kalıp maliyeti olmadığı için çok hesaplıdır.
- Butik dükkanlar, el yapımı tasarımlar ve küçük ölçekli gönderimler için idealdir.
- Su ve neme karşı tam koruma sağlayan [PP Opak Etiket Baskı](/etiket) ve cam şişelerinize şık bir görünüm kazandıran [Şeffaf Etiket Baskı](/etiket) çözümlerimizi de inceleyebilirsiniz.
:::

## Sektörel İhtiyaçlar ve Öneriler

Ürününüzün bulunduğu sektöre ve ambalajın maruz kalacağı koşullara göre doğru seçim yapmak, ürünün raftaki kalıcılığını doğrudan etkiler:

- **Kozmetik ([Şampuan](/etiket), Krem, Losyon):** Kozmetik ambalajları banyo ve duş gibi ıslak alanlarda durur. Üzerine krem veya bitkisel yağ bulaşma riski yüksektir. Bu sektör için mutlaka polipropilen bazlı rulo formatlar kullanılmalıdır. Sıradan kağıt yüzeyler ıslanarak kısa sürede yırtılır veya kalkar.
- **Gıda & Şarküteri (Peynir, Sosis, Yoğurt):** Soğutucu dolaplarda yoğuşma kaynaklı neme maruz kalan [gıda](/ambalaj) ambalajları için plastik bazlı koruyucu kaplamalar en güvenli seçenektir. Ürün dondurucuya (Deep Freeze) girecekse, özel akrilik dondurucu tutkallı çözümler tercih edilmelidir.
- **Bal & Reçel:** Cam kavanozun içindeki bal veya reçelin net görünmesi, müşteride satın alma güvenini artırır. Bu yüzden şeffaf plastikler (arka beyaz astar baskılı) veya el yapımı butik hissi uyandıran dokulu kuşe kağıtlar en doğru seçimdir.
- **Zeytinyağı:** Şişelerde sızan yağın etiketi lekelemesi sık yaşanır. Kağıt dokular yağı emerek lekelenirken, plastik bazlılar yağı geçirmez ve kolayca silinerek temiz kalır.
- **Baharat & Kuruyemiş:** Kilitli [doypack](/ambalaj) ambalajlar veya kavanozlar için pürüzsüz duruşuyla kuşe malzemeler maliyet açısından son derece idealdir.
- **Tekstil:** Ürünlerin üzerine yapıştırılan [barkod](/etiket), beden ve fiyat etiketlerinde iz bırakmayan hafif tutkallı kuşe veya karton sallama modeller tercih edilmelidir.
- **Kargo & Lojistik:** Kargo poşetleri ve kutularında hız en önemli faktördür. Barkod yazıcılardan hızlıca çıkarılabilen tabaka termal veya kuşe modeller en ekonomik ve hızlı çözümdür.
- **Kimyasal Ürünler (Deterjan, Endüstriyel Yağlar):** Ağır kimyasallara ve dış çevre koşullarına maruz kalan deterjan bidonları için aşınmaya dayanıklı plastikler tek seçenektir.

## Baskı ve Uygulamalarda Sık Yapılan Hatalar

:::warning-box
- Nemli ve ıslak yüzeylerde sıradan kağıt bazlı kuşe seçenekler kullanmak (nem kapınca buruşur).
- Rulo formatlarda otomatik makinenin sarım yönünü (akış yönü) yanlış sipariş etmek (doğru sarım yönünü seçerken dikkat etmeniz gereken teknik kuralları öğrenmek için aşağıdaki [Rulo Sarım Yönü Rehberi SSS](#faq) bölümümüzü okuyabilirsiniz).
- Metal veya pürüzlü ahşap yüzeylere zayıf yapışkanlı genel akrilik tutkal uygulamak.
- Şeffaf filmlerin altına beyaz zemin astarı (underwhite) dökülmesini talep etmemek (renklerin zayıf görünmesine yol açar).
:::

## Mavi Basım Üstün Ürün Çözümleri

:::importance-cards
Güçlü Tutkal | Cam, metal ve plastik yüzeylere yüksek tutunma sağlayan ithal akrilik yapışkan formülü.
PP Opak | Islak zeminlerde yırtılmayan, neme ve sıvı temaslarına dayanıklı polipropilen etiket teknolojisi.
Lazer Kesim | Arkasındaki silikon kağıdı koruyarak etiketi milimetrik kesen hassas yarım kesim sistemi.
Şeffaf Astar | Şeffaf filmlerde renklerin net okunmasını sağlayan arka beyaz örtücü boya uygulaması.
:::

:::gallery
/images/etiket/etiket-baski-ornegi.webp | Yarım Kesim Detayı | PP opak etiketlerimizin arkasındaki koruyucu silikon kağıdı çizmeden yapılan milimetrik yarım kesim (kiss-cut) kalitesi; manuel yapıştırmada soyulma hızını 3 kat artırarak işçilikten tasarruf sağlar.
/images/etiket/kuse-gorsel-etiket.webp | Kuşe Etiket Baskısı | Kuşe kağıt etiketlerimizin canlı renk geçirgenliği ve pürüzsüz selefon kaplaması; kuru gıda ve kutularda premium marka algısı oluşturarak satışları destekler.
/images/etiket/rulet-etiket-tasarimi.webp | Rulo Sarım Hattı | Otomatik etiketleme makinelerine tam uyumlu, bobine hatasız sarılmış rulo etiketler; seri üretim hatlarında sıfır kopma ve tıkanma garantisiyle duraksız imalat imkanı verir.
/images/etiket/etiket-baski-fiyatlari.webp | Canlı Renk Doğruluğu | CMYK ve Pantone standartlarına uygun renk kalibrasyonuyla basılmış etiket ruloları; kurumsal renklerinizin her partide birebir tutarlı kalmasını sağlar.
/images/etiket/seffaf-etiket-baski.webp | Güvenli Ambalaj ve Sevk | İstanbul Topkapı'daki tesislerimizde basılan ve spektrofotometre ile renk doğruluğu onaylanan rulolarınız, ezilmeyi önleyici koruyucu ambalajlarla Türkiye'nin her yerine hasarsız sevk edilir.
:::

## Baskı Yöntemi Seçimi

Etiketlerin imalatında kullanılan baskı teknolojisi, sipariş adedine, grafik detaylarına ve kullanım amacına göre seçilir. Hangi türde hangi baskı metodunun, hangi adetlerde ve ne tür avantajlar sağladığını aşağıdaki karşılaştırma tablomuzda özetledik:

| Ürün Türü | Baskı Yöntemi | Önerilen Adet | Öne Çıkan Avantajı |
| :--- | :--- | :--- | :--- |
| **Tabaka Kuşe** | Profesyonel Dijital Baskı | 100 - 500 Adet | Sıfır kalıp maliyeti, butik işlerde maksimum bütçe tasarrufu |
| **Rulo Kuşe** | Endüstriyel Flexo Baskı | 5.000 Adet ve Üzeri | Seri üretimde ultra düşük birim maliyeti, hızlı otomatik etiketleme |
| **Tabaka PP Opak** | Dijital Lazer Baskı | 100 - 1.000 Adet | Düşük adette suya dayanıklılık, özel kesim kalıbı gerektirmez |
| **Rulo PP Opak** | UV Flexo / Dijital Rulo | 2.000 Adet ve Üzeri | Yırtılmazlık, suya, neme ve kimyasallara karşı maksimum direnç |
| **Şeffaf Plastik** | Beyaz Alt Astarlı UV Rulo | 1.000 Adet ve Üzeri | Cam/sıvı arkasını gösteren saydam şıklık, renklerin canlılığı |

### Teknolojik Karşılaştırma Tablosu

| Baskı Teknolojisi | Kalıp / Kurulum Maliyeti | Baskı Hızı ve Kapasite | İnce Detay Kalitesi | Kimyasal ve Isı Direnci |
| :--- | :--- | :--- | :--- | :--- |
| **Dijital Baskı** | Sıfır (Kalıpsız) | Orta (Hızlı Başlangıç) | Ultra Yüksek (1200 dpi) | Orta (Selefon Kaplamalı) |
| **Flexo Baskı** | Yüksek (Kalıp Gerekir) | Çok Yüksek (Endüstriyel) | Yüksek | Çok Yüksek (UV Kurutmalı) |
| **UV Baskı** | Orta-Yüksek | Çok Yüksek (Seri Hat) | Çok Yüksek | Maksimum (Solmaz ve Aşınmaz) |

### Yanlış Teknoloji Tercihinin Sonuçları (Tercih Edilmemesi Gereken Durumlar)

Baskı kalitesinden ödün vermeden en doğru bütçeyi planlamak için hangi baskı teknolojisinin hangi koşullarda **tercih edilmemesi gerektiğini** bilmeniz gerekir:

| Baskı Teknolojisi | Hangi Siparişlerde Tercih Edilmemeli? | Ortaya Çıkabilecek Sorun ve Gereksiz Maliyetler |
| :--- | :--- | :--- |
| **Dijital Baskı** | • 2.000 adet ve üzeri yüksek hacimli rulo siparişlerde | • Yüksek adetlerde birim fiyat sabit kalır, flexo baskıya göre toplamda 2-3 kat daha fazla maliyet oluşturur. |
| **Flexo Baskı** | • 1.000 adetin altındaki düşük/butik siparişlerde<br>• Çoklu grafik varyasyonu olan az adetli işlerde | • Klişe (kalıp) kurulum ücretleri sipariş tutarını aşar, butik üretim bütçesini tamamen verimsiz hale getirir. |
| **UV Baskı** | • Kimyasal teması ve nem riski olmayan standart kargo ve koli barkodu etiketlerinde | • Ekstra UV koruma kürleme enerjisi ve hammadde fiyatı nedeniyle, sıradan işlerde gereksiz bütçe yükü oluşturur. |

Tesislerimizde ihtiyacınıza özel olarak uygulanan üç temel baskı teknolojisinin detayları şunlardır:

- **Endüstriyel Flexo Baskı:** Yüksek adetli (5.000 adet ve üzeri) siparişlerde kullanılır. Kalıp hazırlık süreci olsa da seri üretimde birim maliyeti inanılmaz derecede düşürür. Çok renkli ve yüksek hızlı etiketleme hatları için en ideal çözümdür. (Bkz: [Broşür Kağıt Seçim Rehberi](/blog/brosur-baskida-en-dogru-kagit-nasil-secilir))
- **Profesyonel Dijital Baskı:** Düşük veya orta adetli (100 - 1.000 adet) butik işlerde, özel bıçaklı ve değişken datalı projelerde tercih edilir. Kalıp maliyeti olmadığı için üretime hızlıca başlanır, küçük işletmeler için ilk sipariş bütçesini minimize eder.
- **Yüksek Dayanıklı UV Baskı:** Özellikle kozmetik, şampuan ve kimyasal deterjan etiketleri gibi sıvı temasının, güneş ışığının ve sürtünmenin yoğun olduğu durumlarda tercih edilir. Ultra-Viyole ışıkla anında kürlenen özel boyalar sayesinde, renklerin solması veya kimyasallarla aşınması engellenir. Hem rulo flexo hem de rulo dijital hatlarımızda UV kurutmalı baskı kalitesini uygulamaktayız.

## Üretim Kalitesi ve Teknik Standartlarımız

Mavi Basım İstanbul Topkapı matbaa tesislerimizde, ambalaj etiketlerinizin yüksek kalitede basılabilmesi için tüm üretim süreçleri uluslararası baskı ve kalite standartlarına (ISO 12647-2) uygun olarak yürütülür:

- **Üretim Parkurumuz:** Yüksek hızlı flexo bobin baskı sistemleri, rulo dijital baskı makineleri ve hassas kesim üniteleri.
- **Sertifikalı Birinci Sınıf Malzemeler:** Baskılarımızda kendinden yapışkanlı kağıt ve polipropilen substratlar kullanılmaktadır.
- **Milimetrik Kesim Toleransı (±0.2 mm):** Hassas kesim sistemlerimiz sayesinde etiketlerin kesim sapma toleransı en fazla **±0.2 mm** düzeyindedir.
- **Spektrofotometre ile Renk Tutarlılığı:** Tüm baskı partilerinde renk doğruluğu dijital ölçüm cihazlarıyla denetlenir, kurumsal renklerinizde yüksek renk tutarlılığı sağlanır.

### Adım Adım Etiket Üretim Sürecimiz

1. **Dosya ve Bıçak Kontrolü (Pre-press):** Grafik ekibimiz gönderdiğiniz tasarımı çözünürlük, CMYK renk doğruluğu ve milimetrik kesim bıçak payları açısından inceler ve onayınız için dijital PDF prova hazırlar.
2. **Baskı Öncesi Hazırlık ve Kalıp (Flexo/UV için):** Onaylanan tasarımlar için yüksek hassasiyetli klişeler (kalıplar) hazırlanır veya dijital baskı makinesi kalibrasyonları yapılır.
3. **Yüksek Çözünürlüklü Baskı:** Avery Dennison ve UPM Raflatac marka birinci sınıf kağıt/plastik malzemeler üzerine son teknoloji Gallus ve HP Indigo ünitelerimizde baskı işlemi gerçekleştirilir.
4. **Yüzey Koruma (Selefon/Lak):** Etiketlerin dış etkenlere dayanıklılığını artırmak amacıyla mat/parlak selefon kaplama veya UV koruyucu lak uygulaması yapılır.
5. **Hassas Lazer veya Bıçak Kesimi (Kiss-Cut):** Etiketler taşıyıcı silikon kağıda zarar vermeden milimetrik hassasiyetle (±0.2 mm toleransla) yarım kesilir.
6. **Kalite Kontrol ve Sevkiyat:** Spektrofotometre ile renk doğruluğu denetlenen etiket ruloları/tabakaları, koruyucu ambalajlarla sarılarak Türkiye'nin 81 iline kargolanır.

## Teknik Özellik ve Malzeme Mukayesesi

### Genel Özellik Karşılaştırma Tablosu

| Özellik / Parametre | Kuşe Kağıt Etiket | PP Opak Plastik Etiket | Şeffaf Plastik Etiket |
| :--- | :--- | :--- | :--- |
| **Malzeme Yapısı** | Kağıt Tabanlı (Yırtılır) | Plastik Tabanlı (Yırtılmaz) | Saydam Plastik (Yırtılmaz) |
| **Suya ve Neme Dayanıklılık**| Dayanıksız (Nem kapınca buruşur)| Dayanıklı ve Su Geçirmez | Dayanıklı ve Su Geçirmez |
| **En Sık Kullanım Alanı** | Kargo kutuları, kuru gıda paketleri| Kozmetik, şampuan, zeytinyağı | Cam kavanozlar, pencereler, kapılar |
| **Yüzey Görünümü** | Yarı Mat veya Yarı Parlak | Opak Canlı Beyaz | Tamamen Şeffaf / Arka Planı Gösteren |

### Etiket Kullanım Ömrü ve Dayanıklılık Mukayese Tablosu

Doğru malzeme seçimiyle ürünlerinizin raftaki ömrünü uzatmak için detaylı kullanım ömrü kriterlerini aşağıdaki tablodan inceleyebilirsiniz:

| Ömür ve Dayanıklılık Kriteri | Kuşe Kağıt Etiket | PP Opak Plastik Etiket | Şeffaf Plastik Etiket |
| :--- | :--- | :--- | :--- |
| **İç Mekan Kullanım Süresi** | 1 - 3 Yıl (Nemsiz ortamda sınırsız) | 5 - 10 Yıl (Yırtılmaz ve solmaz) | 5 - 10 Yıl (Sararma yapmaz) |
| **Dış Mekan Kullanım Süresi** | Sadece birkaç hafta (Isıyla bozulur) | 2 - 4 Yıl (Zorlu hava şartlarına dayanıklı) | 2 - 4 Yıl (Güneş altında solmaz) |
| **UV Işığına Maruz Kalma** | Renkler 1-3 ayda solar, kağıt sararır | UV korumalı boya sayesinde solma direnci çok yüksektir | Saydam yapı güneşe dayanıklıdır, sararmaz |
| **Raf Ömrü (Depolama)** | Uygun saklama koşullarında 2 Yıl | İthal tutkal yapısıyla 5 Yıl ve üzeri | İthal tutkal yapısıyla 5 Yıl ve üzeri |
| **Tavsiye Edilen Kullanım Alanı** | İç mekan gıda, koli, lojistik barkodlar | Banyo, kozmetik, deterjan, kimyasal kaplar | Cam şişe, şık likit şişeleri, kavanozlar |

### Yüzeye Göre Malzeme ve Yapışkan Seçimi Tablosu

Doğru yapışkanlı performans için yapıştırılacak yüzeyin yapısı ile malzemenin uyumlu olması gerekir. Aşağıdaki tablo hangi yüzeye hangi malzemenin uygulanacağını göstermektedir:

| Uygulama Yüzeyi | Önerilen Malzeme / Yapışkan Türü | Dikkat Edilmesi Gereken Hususlar |
| :--- | :--- | :--- |
| **Cam Şişe / Kavanoz** | Şeffaf Plastik veya PP Opak (Akrilik Yapışkan) | Yüzeyin tamamen kuru ve pürüzsüz olması gerekir. |
| **Plastik / PE Bidon** | PP Opak Plastik Etiket (Güçlü Akrilik) | Plastik yüzeylerin esnemesine karşı yırtılmayan PP opak idealdir. |
| **Karton / Oluklu Koli** | Kuşe Kağıt Etiket (Genel Akrilik veya Hotmelt) | Emici kağıt yüzeylerde standart akrilik veya hotmelt mükemmel tutunur. |
| **Pürüzlü / Metal Yüzey**| Kalın PP Opak (Kuvvetli Hotmelt / Non-Perm) | Pürüzlü yüzeylerde boşlukları doldurabilen yoğun tutkallı etiket seçilmelidir. |
| **Dondurulmuş Gıda** | PP Opak Plastik (Deep Freeze / Özel Don Tutkallı) | Standart yapışkanlar soğukta kristalize olup düşer, özel tutkal şarttır. |

## Başarı Hikayeleri

Teknik özellikleri gerçek hayattaki satın alma senaryolarına bağlayarak bütçe kararlarınızı daha kolay verebilirsiniz:

- **Natura Kozmetik - Şampuan Üreticisi (Rulo PP Opak):** "Banyo zeminindeki yoğun buhara ve sızan saç bakım yağlarına dayanması için yırtılmayan **Rulo PP Opak Etiket** tercih ettik. 10.000 adetlik siparişimiz, otomatik dolum makinelerimizin sarım hızıyla kusursuz uyum sağlayarak etiketleme sürelerimizi %85 düşürdük."
  > **Proje Bilgileri:**
  > • **Şehir:** Kocaeli (Gebze)
  > • **Faaliyet Sektörü:** Kozmetik ve Kişisel Bakım
  > • **Etiket Ölçüsü:** 60x120 mm (Özel Oval Kesim)
  > • **Sipariş Adedi:** 10.000 Adet (Rulo)
  > • **Üretim Süresi:** 3 İş Günü
  > • **Teslim Süresi:** 1 Gün (İstanbul-Gebze Kurye Sevkiyatı)
- **Toroslar Apiterapi - Organik Bal Üreticisi (Şeffaf Etiket):** "Kavanozlarımızın içindeki kehribar süzme bal renginin dışarıdan tam görünmesi bizim için kritikti. Mavi Basım grafik ekibinin logomuzun arkasına uyguladığı beyaz astar baskı sayesinde yazılar cam üzerinde silikleşmedi. 2.500 adetlik **Şeffaf Etiket** siparişimiz ambalajımıza son derece şık ve üst segment bir hava kattı."
  > **Proje Bilgileri:**
  > • **Şehir:** Muğla (Marmaris)
  > • **Faaliyet Sektörü:** Organik Gıda ve Arıcılık
  > • **Etiket Ölçüsü:** 70x70 mm (Kare Kesim)
  > • **Sipariş Adedi:** 2.500 Adet (Şeffaf Rulo)
  > • **Üretim Süresi:** 2 İş Günü
  > • **Teslim Süresi:** 2 Gün (Muğla Karayolu Kargo Sevkiyatı)
- **Aura Candle Studio - Butik Mum Atölyesi (Tabaka Kuşe):** "Sınırlı sayıda ürettiğimiz el yapımı soya mumları için yüksek adetli bütçe ayırmak istemedik. 200 adetlik butik sipariş imkanı sunan **Tabaka Kuşe Etiket** ile sıfır kalıp maliyetiyle her kokulu mum serisi için ayrı renklerde etiketlerimizi bütçemizi sarsmadan bastırdık."
  > **Proje Bilgileri:**
  > • **Şehir:** İzmir (Alaçatı)
  > • **Faaliyet Sektörü:** Hediyelik Eşya ve Butik Kozmetik
  > • **Etiket Ölçüsü:** 50x50 mm (Daire Kesim)
  > • **Sipariş Adedi:** 200 Adet (Tabaka)
  > • **Üretim Süresi:** 1 İş Günü
  > • **Teslim Süresi:** 2 Gün (İzmir Kargo Teslimatı)

## Sipariş ve Maliyet Planlaması

### Yaklaşık Sipariş Bütçe Planlaması
- **100 - 500 Adet (Butik Başlangıç):** Sadece **Tabaka Etiket** formatı rasyoneldir. Kalıp maliyeti yoktur, toplam bütçe ortalama **400 TL - 1.500 TL** arasındadır (İlk yatırım bütçesini minimumda tutmak için idealdir).
- **1.000 Adet (Eşik Değer):** Rulo veya Tabaka etiket arasındaki geçiş sınırıdır. Eğer el ile yapıştırma yapılacaksa Tabaka Etiket daha avantajlıdır.
- **5.000 Adet ve Üzeri (Seri Üretim):** **Rulo Etiket** açık ara en ekonomik format haline gelir. Etiket başına birim maliyet kuruş seviyelerine iner, toplam bütçe seçilen malzemeye göre **3.500 TL - 7.500 TL** aralığındadır.

### Fiyatı Etkileyen Temel Parametreler

| Maliyet Parametresi | Fiyatı Nasıl Etkiler? | Bütçe Tasarrufu İçin Önerimiz |
| :--- | :--- | :--- |
| **Sipariş Adedi** | Adet arttıkça birim maliyet çok sert düşer. | Yıllık tüketiminizi tek seferde sipariş ederek yüksek adet avantajından yararlanın. |
| **Malzeme Türü** | PP Opak / Şeffaf plastikler, kuşe kağıda göre %30-45 daha maliyetlidir. | Sıvı veya nem teması yoksa PP opak yerine ekonomik **Kuşe** malzeme seçin. |
| **Baskı Formatı** | Rulo etiket kurulum maliyeti düşük adetlerde fiyatı yükseltir. | 1.000 adetin altındaki tüm butik ve elle yapıştırılacak işlerde **Tabaka Etiket** tercih edin. |
| **Özel Bıçak Kesimi** | Standart kare/daire dışındaki özel kıvrımlı bıçaklar ek kalıp maliyeti getirebilir. | Matbaa arşivimizde hazır bulunan binlerce milimetrik standart bıçak şablonunu tercih ederek kalıp ücretinden kurtulun. |

:::cta
TITLE: Ürününüz İçin Özel Fiyat Teklifi Alın
DESC: İhtiyacınız olan adet ve ölçülere göre en avantajlı fiyat teklifini uzman ekibimizden dakikalar içinde almak için WhatsApp üzerinden hemen bizimle iletişime geçin.
BTN_TEXT: WhatsApp ile Hızlı Teklif Al
BTN_LINK: https://wa.me/905321234567
:::

## İstanbul Merkezli Türkiye Geneline Hızlı Teslimat

Tüm etiket imalat süreçlerimiz, **İstanbul Zeytinburnu Topkapı 2. Matbaacılar Sitesi**'ndeki üretim tesisimizde gerçekleştirilmektedir. Mavi Basım olarak geliştirdiğimiz lojistik altyapı sayesinde, İstanbul içindeki üreticilerden Anadolu'nun dört bir yanındaki kooperatif, sanayi bölgesi ve butik işletmelere kadar Türkiye'nin 81 iline kesintisiz teslimat sağlıyoruz.

## Anadolu'daki Üreticiler İçin Lojistik ve Tedarik

Türkiye'nin dört bir yanındaki kooperatifler, yerel tarım işletmeleri ve KOBİ'ler için ambalaj kalitesi, ulusal market raflarına çıkabilmenin en önemli anahtarıdır. Örneğin:
- **Ege ve Akdeniz'deki Zeytinyağı Kooperatifleri:** Sızan yağdan etkilenmeyen, pürüzsüz duruşuyla **PP Opak Rulo Etiketler** ile markalarını premium segmentte konumlandırıyor.
- **Doğu Anadolu ve Karadeniz'deki Arıcılık Birlikleri:** Bal kavanozlarının içindeki doğallığı sergileyen, beyaz alt astar baskılı **Şeffaf Etiketler** ile sahteciliğin önüne geçip güven aşılıyor.
- **Güneydoğu ve İç Anadolu'daki Kurutulmuş Gıda ve Baharat Girişimleri:** Düşük bütçelerle pazara girmelerini sağlayan **Tabaka Kuşe Etiket** modellerimizle şık doypack ambalajlar tasarlıyor.
- **Organize Sanayi Bölgelerinde (OSB) Üretim Yapan Firmalar:** Seri imalat bantlarındaki yüksek hızlı ambalajlama süreçlerinde duraksama yaşanmaması için yırtılmazlık mukavemeti en yüksek olan ve milimetrik yarım kesim kalitesine sahip **Rulo PP Opak Plastik** formatını tercih etmektedir.
- **Yüksek Hızlı Dolum Tesisleri:** Otomatik etiketleme robotlarının akışına mükemmel uyum sağlayan, sürtünmeye dayanıklı ve bobin sarım yönü özel olarak kalibre edilmiş **Rulo Etiketler** ile firesiz ve yüksek verimli imalat sürdürmektedir.
- **Fason ve Özel Marka (Private Label) Üreticileri:** Farklı markalar için çoklu grafik varyasyonlarında ama aynı ölçülerde üretim yaparken, kalıp maliyetlerini sıfırlayan ve değişken datalı basıma imkan tanıyan **Tabaka PP Opak** veya yüksek çözünürlüklü rulo dijital baskı çözümlerini tercih eder.
- **İhracat Yapan Üreticiler:** Sınır ötesi uzun sevkiyat yolculuklarında, konteyner içi yoğuşma nemine, aşırı sıcak/soğuk ısı değişimlerine ve gümrükteki sürtünmelere dayanacak, renkleri solmayan ve yüksek yapışma gücüne sahip **UV Baskılı PP Opak Plastik** etiketler ile markalarını dünya pazarında korur.

Sadece büyük şehirlere değil, Türkiye genelindeki tüm küçük ve büyük işletmelere şu güvenceleri sunuyoruz:

- **PDF Prova ve Hızlı Onay Sistemi:** Gönderdiğiniz tasarımlar grafik ekibimizce ücretsiz olarak bıçak payı, CMYK renk doğruluğu ve çözünürlük açısından kontrol edilir. Onayınız için hazırlanan dijital PDF prova sizden tam onay almadan baskı makinelerimiz çalıştırılmaz.
- **24 Saatte Üretime Başlama ve Hızlı Teslimat:** Prova onayınız alındıktan sonra 24 saat içinde üretime başlanır. Siparişiniz adet ve malzemeye bağlı olarak genellikle **2-4 iş günü** içinde tamamlanır.
- **Güvenli ve Korumalı Ambalajlama:** Rulo ve tabaka etiketleriniz taşıma esnasında nem kapmayacak ve ezilmeyecek şekilde kalın koruyucu bobin ambalajları ve mukavemetli kutularda paketlenir. Anlaşmalı kargo firmalarımızla hasarsız şekilde kapınıza teslim edilir.
- **Bıçak Arşivi Güvencesi:** Ürününüz için bir kez hazırlanan özel kesim bıçakları ve lazer kalıpları arşivimizde 5 yıl boyunca güvenle saklanır. Tekrar siparişlerinizde yeni kalıp ücreti ödemezsiniz.

## Teklif Talebi İçin Gerekli Bilgiler

Size en uygun fiyat teklifini dakikalar içinde hazırlayabilmemiz için aşağıdaki bilgileri bizimle paylaşabilirsiniz:

1. **Ölçü Bilgisi (En x Boy):** Milimetre (mm) cinsinden etiketinizin nihai kesim ölçüleri.
2. **Sipariş Adedi:** Kaç adet etiket basılmasını istediğiniz (Örn: 500 adet, 5.000 adet).
3. **Malzeme Türü:** Kuşe kağıt mi yoksa suya dayanıklı PP opak plastik mi?
4. **Sarım Yönü (Rulo ise):** Otomatik yapıştırma makinenizin akış yönü şablonu (Elle yapıştırılacaksa bu bilgi gerekli değildir).
5. **Kullanım Alanı:** Yapıştırılacak yüzey (Cam şişe, plastik bidon, karton koli vb.) ve saklama koşulları.

### Örnek Sipariş Teklifi Talebi

Teklif sürecini hızlandırmak için bizimle aşağıdaki gibi pratik bir örnek mesaj paylaşabilirsiniz:
> **Örnek Teklif Talebi:**
> "Merhaba, 50x80 mm ölçülerinde, suya dayanıklı PP Opak plastik malzemeden üretilecek şampuan etiketimiz için 2.000 adet fiyat teklifi almak istiyoruz. Ürünlerimiz banyo ortamında duracak, dolayısıyla güçlü yapışkanlı akrilik tutkal tercih etmekteyiz. Rulo sarım yönü 3. pozisyon (sağdan akışlı) olacaktır. Grafik tasarımımız PDF olarak hazırdır. Fiyat ve teslimat süresi hakkında bilgi alabilir miyiz?"

### Sipariş Öncesi Son Kontrol Listesi

Hatalı baskı ve zaman kaybını önlemek için siparişinizi tamamlamadan önce şu teknik detayları kontrol ettiğinizden emin olun:
- [ ] **Çözünürlük ve Format:** Tasarım dosyanızın en az 300 DPI çözünürlükte ve baskıya uygun vektörel formatta (PDF, AI, CDR) olduğundan emin olun.
- [ ] **Kesim Payı (Taşma Payı):** Etiket kenarlarında kesim esnasında kayma riskine karşı en az 2 mm taşma (kesim payı) bırakıldığını teyit edin.
- [ ] **Renk Modu:** Çalışmanızın RGB değil, matbaa standartlarına uygun **CMYK** renk modunda hazırlandığından emin olun.
- [ ] **Yüzey Uyumluluğu:** Yapıştırılacak yüzeyin (cam, metal, plastik, pürüzlü) ve saklama sıcaklığının (oda sıcaklığı, nem, derin dondurucu) seçilen etiket malzemesi ve tutkal türüyle eşleştiğini kontrol edin.
- [ ] **Sarım Yönü (Rulo Etiketler İçin):** Otomatik yapıştırma makinenizin teknik kılavuzundaki sarım yönü numarasıyla siparişinizin uyuştuğunu doğrulayın.

:::cta
TITLE: Markanıza Özel Profesyonel Etiket Teklifi
DESC: Ürünlerinize değer katacak rulo veya tabaka halinde kuşe, PP opak ve şeffaf etiketleri logonuzla üretiyoruz. Şişe ve kavanoz ölçülerinize uygun bıçak tasarımı hazırlatmak için hemen ekibimize yazın.
BTN_TEXT: WhatsApp Etiket Desteği
BTN_LINK: https://wa.me/905321234567
:::
5. **Hassas Lazer veya Bıçak Kesimi (Kiss-Cut):** Etiketler taşıyıcı silikon kağıda zarar vermeden milimetrik hassasiyetle (±0.2 mm toleransla) yarım kesilir.
6. **Kalite Kontrol ve Sevkiyat:** Spektrofotometre ile renk doğruluğu denetlenen etiket ruloları/tabakaları, koruyucu ambalajlarla sarılarak Türkiye'nin 81 iline kargolanır.

## Teknik Özellik ve Malzeme Mukayesesi

### Genel Özellik Karşılaştırma Tablosu

| Özellik / Parametre | Kuşe Kağıt Etiket | PP Opak Plastik Etiket | Şeffaf Plastik Etiket |
| :--- | :--- | :--- | :--- |
| **Malzeme Yapısı** | Kağıt Tabanlı (Yırtılır) | Plastik Tabanlı (Yırtılmaz) | Saydam Plastik (Yırtılmaz) |
| **Suya ve Neme Dayanıklılık**| Dayanıksız (Nem kapınca buruşur)| Dayanıklı ve Su Geçirmez | Dayanıklı ve Su Geçirmez |
| **En Sık Kullanım Alanı** | Kargo kutuları, kuru gıda paketleri| Kozmetik, şampuan, zeytinyağı | Cam kavanozlar, pencereler, kapılar |
| **Yüzey Görünümü** | Yarı Mat veya Yarı Parlak | Opak Canlı Beyaz | Tamamen Şeffaf / Arka Planı Gösteren |

### Yüzeye Göre Malzeme ve Yapışkan Seçimi Tablosu

Doğru yapışkanlı performans için yapıştırılacak yüzeyin yapısı ile malzemenin uyumlu olması gerekir. Aşağıdaki tablo hangi yüzeye hangi malzemenin uygulanacağını göstermektedir:

| Uygulama Yüzeyi | Önerilen Malzeme / Yapışkan Türü | Dikkat Edilmesi Gereken Hususlar |
| :--- | :--- | :--- |
| **Cam Şişe / Kavanoz** | Şeffaf Plastik veya PP Opak (Akrilik Yapışkan) | Yüzeyin tamamen kuru ve pürüzsüz olması gerekir. |
| **Plastik / PE Bidon** | PP Opak Plastik Etiket (Güçlü Akrilik) | Plastik yüzeylerin esnemesine karşı yırtılmayan PP opak idealdir. |
| **Karton / Oluklu Koli** | Kuşe Kağıt Etiket (Genel Akrilik veya Hotmelt) | Emici kağıt yüzeylerde standart akrilik veya hotmelt mükemmel tutunur. |
| **Pürüzlü / Metal Yüzey**| Kalın PP Opak (Kuvvetli Hotmelt / Non-Perm) | Pürüzlü yüzeylerde boşlukları doldurabilen yoğun tutkallı etiket seçilmelidir. |
| **Dondurulmuş Gıda** | PP Opak Plastik (Deep Freeze / Özel Don Tutkallı) | Standart yapışkanlar soğukta kristalize olup düşer, özel tutkal şarttır. |

## Başarı Hikayeleri

Teknik özellikleri gerçek hayattaki satın alma senaryolarına bağlayarak bütçe kararlarınızı daha kolay verebilirsiniz:

- **Natura Kozmetik - Şampuan Üreticisi (Rulo PP Opak):** "Banyo zeminindeki yoğun buhara ve sızan saç bakım yağlarına dayanması için yırtılmayan **Rulo PP Opak Etiket** tercih ettik. 10.000 adetlik siparişimiz, otomatik dolum makinelerimizin sarım hızıyla kusursuz uyum sağlayarak etiketleme sürelerimizi %85 düşürdük."
- **Toroslar Apiterapi - Organik Bal Üreticisi (Şeffaf Etiket):** "Kavanozlarımızın içindeki kehribar süzme bal renginin dışarıdan tam görünmesi bizim için kritikti. Mavi Basım grafik ekibinin logomuzun arkasına uyguladığı beyaz astar baskı sayesinde yazılar cam üzerinde silikleşmedi. 2.500 adetlik **Şeffaf Etiket** siparişimiz ambalajımıza son derece şık ve üst segment bir hava kattı."
- **Aura Candle Studio - Butik Mum Atölyesi (Tabaka Kuşe):** "Sınırlı sayıda ürettiğimiz el yapımı soya mumları için yüksek adetli bütçe ayırmak istemedik. 200 adetlik butik sipariş imkanı sunan **Tabaka Kuşe Etiket** ile sıfır kalıp maliyetiyle her kokulu mum serisi için ayrı renklerde etiketlerimizi bütçemizi sarsmadan bastırdık."

## Sipariş ve Maliyet Planlaması

### Yaklaşık Sipariş Bütçe Planlaması
- **100 - 500 Adet (Butik Başlangıç):** Sadece **Tabaka Etiket** formatı rasyoneldir. Kalıp maliyeti yoktur, toplam bütçe ortalama **400 TL - 1.500 TL** arasındadır (İlk yatırım bütçesini minimumda tutmak için idealdir).
- **1.000 Adet (Eşik Değer):** Rulo veya Tabaka etiket arasındaki geçiş sınırıdır. Eğer el ile yapıştırma yapılacaksa Tabaka Etiket daha avantajlıdır.
- **5.000 Adet ve Üzeri (Seri Üretim):** **Rulo Etiket** açık ara en ekonomik format haline gelir. Etiket başına birim maliyet kuruş seviyelerine iner, toplam bütçe seçilen malzemeye göre **3.500 TL - 7.500 TL** aralığındadır.

### Fiyatı Etkileyen Temel Parametreler

| Maliyet Parametresi | Fiyatı Nasıl Etkiler? | Bütçe Tasarrufu İçin Önerimiz |
| :--- | :--- | :--- |
| **Sipariş Adedi** | Adet arttıkça birim maliyet çok sert düşer. | Yıllık tüketiminizi tek seferde sipariş ederek yüksek adet avantajından yararlanın. |
| **Malzeme Türü** | PP Opak / Şeffaf plastikler, kuşe kağıda göre %30-45 daha maliyetlidir. | Sıvı veya nem teması yoksa PP opak yerine ekonomik **Kuşe** malzeme seçin. |
| **Baskı Formatı** | Rulo etiket kurulum maliyeti düşük adetlerde fiyatı yükseltir. | 1.000 adetin altındaki tüm butik ve elle yapıştırılacak işlerde **Tabaka Etiket** tercih edin. |
| **Özel Bıçak Kesimi** | Standart kare/daire dışındaki özel kıvrımlı bıçaklar ek kalıp maliyeti getirebilir. | Matbaa arşivimizde hazır bulunan binlerce milimetrik standart bıçak şablonunu tercih ederek kalıp ücretinden kurtulun. |

:::cta
TITLE: Ürününüz İçin Özel Fiyat Teklifi Alın
DESC: İhtiyacınız olan adet ve ölçülere göre en avantajlı fiyat teklifini uzman ekibimizden dakikalar içinde almak için WhatsApp üzerinden hemen bizimle iletişime geçin.
BTN_TEXT: WhatsApp ile Hızlı Teklif Al
BTN_LINK: https://wa.me/905321234567
:::

## İstanbul Merkezli Türkiye Geneline Hızlı Teslimat

Tüm etiket imalat süreçlerimiz, **İstanbul Zeytinburnu Topkapı 2. Matbaacılar Sitesi**'ndeki üretim tesisimizde gerçekleştirilmektedir. Mavi Basım olarak geliştirdiğimiz lojistik altyapı sayesinde, İstanbul içindeki üreticilerden Anadolu'nun dört bir yanındaki kooperatif, sanayi bölgesi ve butik işletmelere kadar Türkiye'nin 81 iline kesintisiz teslimat sağlıyoruz.

## Anadolu'daki Üreticiler İçin Lojistik ve Tedarik

Türkiye'nin dört bir yanındaki kooperatifler, yerel tarım işletmeleri ve KOBİ'ler için ambalaj kalitesi, ulusal market raflarına çıkabilmenin en önemli anahtarıdır. Örneğin:
- **Ege ve Akdeniz'deki Zeytinyağı Kooperatifleri:** Sızan yağdan etkilenmeyen, pürüzsüz duruşuyla **PP Opak Rulo Etiketler** ile markalarını premium segmentte konumlandırıyor.
- **Doğu Anadolu ve Karadeniz'deki Arıcılık Birlikleri:** Bal kavanozlarının içindeki doğallığı sergileyen, beyaz alt astar baskılı **Şeffaf Etiketler** ile sahteciliğin önüne geçip güven aşılıyor.
- **Güneydoğu ve İç Anadolu'daki Kurutulmuş Gıda ve Baharat Girişimleri:** Düşük bütçelerle pazara girmelerini sağlayan **Tabaka Kuşe Etiket** modellerimizle şık doypack ambalajlar tasarlıyor.

Sadece büyük şehirlere değil, Türkiye genelindeki tüm küçük ve büyük işletmelere şu güvenceleri sunuyoruz:

- **PDF Prova ve Hızlı Onay Sistemi:** Gönderdiğiniz tasarımlar grafik ekibimizce ücretsiz olarak bıçak payı, CMYK renk doğruluğu ve çözünürlük açısından kontrol edilir. Onayınız için hazırlanan dijital PDF prova sizden tam onay almadan baskı makinelerimiz çalıştırılmaz.
- **24 Saatte Üretime Başlama ve Hızlı Teslimat:** Prova onayınız alındıktan sonra 24 saat içinde üretime başlanır. Siparişiniz adet ve malzemeye bağlı olarak genellikle **2-4 iş günü** içinde tamamlanır.
- **Güvenli ve Korumalı Ambalajlama:** Rulo ve tabaka etiketleriniz taşıma esnasında nem kapmayacak ve ezilmeyecek şekilde kalın koruyucu bobin ambalajları ve mukavemetli kutularda paketlenir. Anlaşmalı kargo firmalarımızla hasarsız şekilde kapınıza teslim edilir.
- **Bıçak Arşivi Güvencesi:** Ürününüz için bir kez hazırlanan özel kesim bıçakları ve lazer kalıpları arşivimizde 5 yıl boyunca güvenle saklanır. Tekrar siparişlerinizde yeni kalıp ücreti ödemezsiniz.

## Teklif Talebi İçin Gerekli Bilgiler

Size en uygun fiyat teklifini dakikalar içinde hazırlayabilmemiz için aşağıdaki bilgileri bizimle paylaşabilirsiniz:

1. **Ölçü Bilgisi (En x Boy):** Milimetre (mm) cinsinden etiketinizin nihai kesim ölçüleri.
2. **Sipariş Adedi:** Kaç adet etiket basılmasını istediğiniz (Örn: 500 adet, 5.000 adet).
3. **Malzeme Türü:** Kuşe kağıt mı yoksa suya dayanıklı PP opak plastik mi?
4. **Sarım Yönü (Rulo ise):** Otomatik yapıştırma makinenizin akış yönü şablonu (Elle yapıştırılacaksa bu bilgi gerekli değildir).
5. **Kullanım Alanı:** Yapıştırılacak yüzey (Cam şişe, plastik bidon, karton koli vb.) ve saklama koşulları.

### Örnek Sipariş Teklifi Talebi

Teklif sürecini hızlandırmak için bizimle aşağıdaki gibi pratik bir örnek mesaj paylaşabilirsiniz:
> **Örnek Teklif Talebi:**
> "Merhaba, 50x80 mm ölçülerinde, suya dayanıklı PP Opak plastik malzemeden üretilecek şampuan etiketimiz için 2.000 adet fiyat teklifi almak istiyoruz. Ürünlerimiz banyo ortamında duracak, dolayısıyla güçlü yapışkanlı akrilik tutkal tercih etmekteyiz. Rulo sarım yönü 3. pozisyon (sağdan akışlı) olacaktır. Grafik tasarımımız PDF olarak hazırdır. Fiyat ve teslimat süresi hakkında bilgi alabilir miyiz?"

### Sipariş Öncesi Son Kontrol Listesi

Hatalı baskı ve zaman kaybını önlemek için siparişinizi tamamlamadan önce şu teknik detayları kontrol ettiğinizden emin olun:
- [ ] **Çözünürlük ve Format:** Tasarım dosyanızın en az 300 DPI çözünürlükte ve baskıya uygun vektörel formatta (PDF, AI, CDR) olduğundan emin olun.
- [ ] **Kesim Payı (Taşma Payı):** Etiket kenarlarında kesim esnasında kayma riskine karşı en az 2 mm taşma (kesim payı) bırakıldığını teyit edin.
- [ ] **Renk Modu:** Çalışmanızın RGB değil, matbaa standartlarına uygun **CMYK** renk modunda hazırlandığından emin olun.
- [ ] **Yüzey Uyumluluğu:** Yapıştırılacak yüzeyin (cam, metal, plastik, pürüzlü) ve saklama sıcaklığının (oda sıcaklığı, nem, derin dondurucu) seçilen etiket malzemesi ve tutkal türüyle eşleştiğini kontrol edin.
- [ ] **Sarım Yönü (Rulo Etiketler İçin):** Otomatik yapıştırma makinenizin teknik kılavuzundaki sarım yönü numarasıyla siparişinizin uyuştuğunu doğrulayın.

:::cta
TITLE: Markanıza Özel Profesyonel Etiket Teklifi
DESC: Ürünlerinize değer katacak rulo veya tabaka halinde kuşe, PP opak ve şeffaf etiketleri logonuzla üretiyoruz. Şişe ve kavanoz ölçülerinize uygun bıçak tasarımı hazırlatmak için hemen ekibimize yazın.
BTN_TEXT: WhatsApp Etiket Desteği
BTN_LINK: https://wa.me/905321234567
:::`,
    faq: [
      {
            "question": "Tasarım dosyam hazır değil, yine de baskı yaptırabilir miyim?",
            "answer": "Evet, tasarımınız hazır olmasa bile uzman grafik ekibimiz etiketinizin yerleşiminde, bıçak paylarının düzenlenmesinde ve kurumsal kimliğinize uygun şablonun oluşturulmasında size teknik destek sağlar. Sipariş öncesi logonuzu yüksek çözünürlüklü olarak iletmeniz yeterlidir."
      },
      {
            "question": "PP Opak Etiket nedir ve sudan etkilenir mi?",
            "answer": "PP Opak, polipropilen bazlı plastik bir etiket malzemesidir. Suya, neme, yağa, güneşe ve yırtılmaya karşı %100 dayanıklıdır. Kozmetik, şampuan, deterjan ve zeytinyağı ambalajları için en ideal çözümdür."
      },
      {
            "question": "Minimum ve maksimum sipariş adetleri nedir?",
            "answer": "Tabaka etiketlerde minimum siparişimiz 100 adettir ve butik işler için son derece ekonomiktir. Rulo etiketlerde ise bobin kurulum maliyetleri ve makine ayar fireleri nedeniyle minimum sipariş limitimiz 1.000 adettir (optimum bütçe için 5.000 adet önerilir). Herhangi bir maksimum adet sınırımız bulunmamaktadır."
      },
      {
            "question": "PP Opak ile Şeffaf Etiket arasındaki farklar nelerdir?",
            "answer": "PP Opak etiket beyaz plastik tabanlıdır, yapıştırıldığı yüzeyin altını tamamen kapatır. Şeffaf etiket ise tamamen saydam (şeffaf) plastik malzemeden üretilir; cam kavanoz veya şeffaf şişelerde içerideki sıvıyı doğrudan göstererek ambalaja entegre ve şık bir görünüm kazandırır."
      },
      {
            "question": "Rulo etiket siparişinde sarım yönü neden önemlidir?",
            "answer": "Eğer etiketleriniz otomatik etiketleme makinesiyle şişe veya kavanozlara yapıştırılacaksa, makinenizin rulo akış yönüne uygun sarım yönü (sarım pozisyonu) seçilmelidir. Yanlış sarım yönü etiketlerin şişelere ters, yan veya kayık yapışmasına neden olur. Elle yapıştırmalarda ise sarım yönü önemsizdir."
      },
      {
            "question": "Farklı şehirlerden verilen siparişlerde lojistik süreç nasıl ilerler?",
            "answer": "Zeytinburnu Topkapı 2. Matbaacılar Sitesi ndeki fabrikamızda üretilen etiketleriniz, rulo bobin koruyucularıyla özenle paketlenip hasar görmeyecek şekilde ambalajlanır. İzmir den Gaziantep e, Ankara dan Trabzon a kadar Türkiye nin tüm 81 iline anlaşmalı kargo firmalarımızla sigortalı ve güvenli şekilde sevk edilir."
      },
      {
            "question": "Siparişlerin üretim ve teslimat süresi ne kadardır?",
            "answer": "Tasarımınız grafik ekibimiz tarafından kontrol edildikten sonra hazırlanan PDF prova onayınız alınır. Prova onayının ardından 24 saat içinde üretime geçilir. Siparişinizin adet ve teknik özelliklerine göre üretim genellikle 2-4 iş günü içinde tamamlanır ve kargoya teslim edilir."
      },
      {
            "question": "Sipariş süreci nasıl işler, adımları nelerdir?",
            "answer": "Süreç oldukça basittir: 1) Talebinizi (ölçü, adet, malzeme) bize iletirsiniz. 2) Size özel fiyat teklifimizi sunarız. 3) Grafik ekibimiz tasarımınızı ücretsiz kontrol edip PDF onay provası gönderir. 4) Onayınızın ardından ödeme alınır ve üretime başlanır. 5) 2-4 iş günü içinde üretim tamamlanarak adresinize sevk edilir."
      }
]
  },
  {
    slug: 'kuve-kagit-ve-bristol-karton-farklari',
    title: 'Kuşe Kağıt ile Bristol Karton Arasındaki Dokusal ve Teknik Farklar',
    excerpt: 'Broşür ve cepli dosyalarda hangisi tercih edilmeli? Bristol kartonun sıvama dayanıklılığı ile kuşe kağıdın renk geçirgenliğinin karşılaştırması.',
    date: '10 Mayıs 2026',
    readTime: '6 Dk Okuma',
    category: 'Matbaa Teknik',
    image: '/images/dosya/cepli-dosya-tasarimi.webp',
    schemaType: 'Article',
    content: `## Kuşe Kağıt ile Bristol Karton Arasındaki Dokusal ve Teknik Farklar

Matbaada doğru malzeme seçimi hem görselliği belirler hem de bütçenizi optimize eder. Çoğu zaman birbirine karıştırılan **Kuşe Kağıt** ile **Amerikan Bristol Karton** arasındaki yapısal farklar ve kullanım sahaları, Mavi Basım teknik analizleri ile karşınızda.

Siparişleriniz için [Cepli Dosya sayfasına](/dosyalar) giderek şık klasörleri inceleyebilir, kuşe kağıttan üretilen [Broşür sayfasına](/brosur) ait modelleri görebilir ya da çok sayfalı [Katalog sayfasına](/kataloglar) ait kapak seçeneklerini inceleyebilirsiniz.

:::info-cards
Kuşe Kağıt Özellikleri
- Her iki yüzeyi de pürüzsüz mineral sıvamayla kaplanmış kuşe kâğıt kalitesi.
- Mürekkep emilim oranı son derece düşük olduğu için renkleri pırıl pırıl canlı gösterir.
- 90 gr ile 350 gr aralığında esnek ve katlanabilir gramaj yelpazesi bulunur.
- Broşürlerin, el ilanlarının iç sayfalarının ve tanıtım kataloglarının yıldızıdır.
---
Bristol Karton Özellikleri
- Ön yüzü parlak beyaz sıvanmış, arka yüzü ise kaba pürüzsüz karton dokuludur.
- Kağıdın lifleri inanılmaz derecede sıkı örülmüştür, bükülmeye karşı çok serttir.
- 250 gr ile 400 gr arasında değişen kalın ve tok bir mukavva yapısı sergiler.
- Cepli sunum klasörlerinde, ilaç kutularında ve lüks kitap kapaklarında kullanılır.
---
Dokusal Seçim Kuralları
- Kataloğunuzun iç sayfalarında esneklik için kuşe kağıt (135g - 170g) seçilmelidir.
- Kataloğunuzun dış kapaklarında ise tokluk için Amerikan Bristol tercih edilmelidir.
- Bristol kartonun sıvasız arka yüzüne yoğun resimli renkli baskı yapılması önerilmez.
:::

---

## Kağıt Seçiminde Yapılan Teknik Hatalar

:::warning-box
- Bristol kartonun sıvasız pürüzlü arka yüzeyine yüksek yoğunluklu fotoğraflar basmak (Renkler çamurlu çıkar).
- Kalın kuşe kağıtlara (170g ve üzeri) pilyaj (katlama çizgisi) vurmadan katlama yapmak (Kağıt çatlar).
- Lüks sunum cepli klasörlerinde esnek ince kuşe kağıt kullanıp klasörün bükülmesine sebep olmak.
- Kitapçık kapaklarında koruyucu selefon kaplatmayıp sırt kısımlarının yırtılmasına yol açmak.
:::

---

## Mavi Basım Üstün Kağıt Kalibrasyon Standartları

:::importance-cards
Avrupa İthal Selüloz | Sararma ve asitlenme yapmayan, uzun yıllar boyunca beyazlığını koruyan 1. sınıf orijinal kuşe ve Bristol karton ham maddeleri.
Hidrolik Pilyaj (Score) | 170g üzeri tüm kalın kağıtlarımızda lif kırılmalarını sıfırlayan, katlama çizgilerini jilet gibi düzgün açan hidrolik pilyaj.
Çift Yönlü Ofset Uyum | Ön yüzde ve arka yüzde renk kalibrasyonunu kaybetmeyen yüksek teknoloji mürekkep püskürtme hassasiyetimiz.
:::

---

## Kuşe ve Bristol Karşılaştırma Tablosu

| Teknik Parametre | Kuşe Kağıt Standardı | Amerikan Bristol Karton Standardı |
| :--- | :--- | :--- |
| **Yüzey Sıvaması** | İki yüzü de parlak veya mat sıvamalı | Yalnızca ön yüzü parlak beyaz sıvamalı |
| **Yapısal Esneklik**| Yüksek Esneklik (Kolayca katlanır) | Çok Sert ve Tok (Bükülmeye Dirençli Mukavva) |
| **Gramaj Yelpazesi**| 90 gr - 350 gr Arası | 250 gr - 400 gr Arası Kalın Kartonlar |
| **En Sık Kullanım** | El ilanı, broşür, katalog iç sayfaları | Cepli sunum klasörleri, ilaç ve kozmetik kutuları |
| **Kurumsal Derece** | ★★★★★ | ★★★★★ |

---

:::cta
TITLE: Doğru Kağıt Seçim Desteği
DESC: Tanıtım broşürünüz veya ambalaj kutunuz için en dayanıklı ve ekonomik kağıt gramajını uzman mühendislerimizle belirliyoruz. Kağıt numunelerimizden talep etmek ve fiyat almak için hemen iletişime geçin.
BTN_TEXT: WhatsApp Kağıt Danışmanlığı
BTN_LINK: https://wa.me/905321234567
:::`,
    faq: [
      {
        question: 'Bristol kartonun arkasına renkli baskı yapılır mı?',
        answer: 'Bristol kartonun arka yüzü sıvasız olduğu için yüksek yoğunluklu resimler donuk ve soluk çıkar. Arka yüzeye sadece hafif logo veya adres bilgisi basılması önerilir.'
      }
    ]
  },
  {
    slug: 'brosur-katlama-kirim-modelleri-nelerdir',
    title: 'Broşür Katlama (Kırım) Modelleri Nelerdir? Katlama Akış Kılavuzu',
    excerpt: 'A4 ve A3 broşürlerde akordeon, c-kırım, kapı kırım, pilyajlı çift kırım ve tek kırım katlama sanatı hakkında merak ettikleriniz.',
    date: '09 Mayıs 2026',
    readTime: '7 Dk Okuma',
    category: 'Broşür & Reklam',
    image: '/images/brosur/brosur-tasarimi-ve-baski.webp',
    schemaType: 'Article',
    content: `## Broşür Katlama (Kırım) Modelleri Nelerdir? Katlama Akış Kılavuzu

Broşür katlama modelleri, müşterinizin elindeki reklam belgesini açarken okuma sırasını ve algısını belirleyen kritik bir matbaa parametresidir. Doğru kırım yöntemiyle kurgulanmış bir broşür, sürprizli ve yönlendirici bir hikaye akışı yaratır.

Baskı siparişleriniz için [Broşür sayfasına](/brosur) bakarak kırım modellerini görebilir, çok sayfalı kurumsal işler için [Katalog sayfasına](/kataloglar) ait cilt alternatiflerini inceleyebilir ya da [El İlanı sayfasına](/el-ilani) giderek katlamasız broşür fiyatlarını görebilirsiniz.

:::info-cards
C-Kırım (İç İçe Katlama)
- A4 kağıdın iki kenarının içe doğru bükülerek birbiri üzerine katlandığı 6 panel (sayfa) sistemi.
- Müşteriniz broşürü eline aldığında ilk kapak panelini, açtığında ise tüm iç listeyi görür.
- Restoran yemek menüleri, fiyat listeleri ve kurumsal ürün tanıtımlarında en popüler katlamadır.
---
Akordeon Kırım (Z-Kırım)
- Kağıdın ters yönlerde kırılarak körük şeklinde açıldığı 6 veya 8 sayfalı katlama tipi.
- Özellikle geniş haritalar, teknik aşamalar ve yan yana durması gereken panoramik listeler için idealdir.
- Broşür katlandığında oldukça kompakt hale gelir ve cepte kolayca taşınabilir.
---
Kapı Katlama (Gate Fold)
- İki dış kenarın merkeze doğru katlanarak bir kapı gibi ortada buluştuğu lüks kırım modeli.
- Müşteriniz iki kenarı dışa doğru açtığında ortadaki devasa ana ürün görseli ile karşılaşır.
- Büyük gayrimenkul projeleri, lüks otomobil sunumları ve merak uyandıran kreatif reklamlar içindir.
:::

---

## Broşür Kırım ve Tasarımlarında Yapılan Grafik Hataları

:::warning-box
- Tüm katlama panellerinin genişliğini birebir aynı tasarlamak (İçe katlanan paneller sıkışıp bükülür).
- İçe katlanan en son panel genişliğini diğerlerinden en az 2 mm daha dar kurgulamamak.
- Kalın kağıtlarda katlama çizgilerine pilyaj (score izi) vurulmasını talep etmemek (Boyalar çatlar).
- Katlama çizgilerinin tam üzerine kritik logoları ve harfleri yerleştirip okunmaz kılmak.
:::

---

## Mavi Basım Profesyonel Kırım Teknolojileri

:::importance-cards
Otomatik Kırım Hattı | Yüksek hızlı kırım ünitelerimizde el değmeden, milimetrik hassasiyetle katlanan jilet gibi pürüzsüz paneller.
Çatlamayı Önleyen Pilyaj | 135g ve üzeri broşürlerinizde lif kırılmalarını önleyen hidrolik pres pilyaj uygulamalarımız.
Özel Katlama Varyasyonları | Sektörünüze özel akordeon, kapı katlama, paralel kırım ve pencereli katlama model zenginlikleri.
:::

---

## Broşür Kırım Modelleri Karşılaştırması

| Kırım Modeli | Toplam Panel (Sayfa) | Katlanmış Ebat Avantajı | En İdeal Kullanım Alanı | Kurumsal Algı |
| :--- | :--- | :--- | :--- | :--- |
| **Tek Kırım (V-Katlama)** | 4 Sayfa | Standart (A4'ü A5 yapar) | Basit kampanya duyuruları, tekli listeler | ★★★★☆ |
| **C-Kırım (İç Katlama)** | 6 Sayfa | Mükemmel (A4'ü DL boyutuna sığdırır) | Restoran menüleri, lüks otel tanıtımları | ★★★★★ |
| **Z-Kırım (Akordeon)** | 6 - 8 Sayfa | Çok Portatif (Körük şeklinde) | Teknik aşamalar, şehir haritaları, kroki | ★★★★★ |
| **Kapı Katlama (Gate)** | 6 Sayfa | Dikkat Çekici (Kapı açılımı) | Lüks konut sunumları, lansman davetleri | ★★★★★ |

---

:::cta
TITLE: Özel Katlamalı Broşür Siparişi
DESC: Markanızın hikayesini müşterilerinize sürprizli ve yönlendirici bir kırım akışı ile sunuyoruz. C-kırım, Z-kırım veya kapı katlamalı şablonlarımızı incelemek ve fiyat teklifi almak için hemen yazın.
BTN_TEXT: WhatsApp Kırım Şablonları
BTN_LINK: https://wa.me/905321234567
:::`,
    faq: [
      {
        question: 'Kırım sayısının artması kağıtta yırtılma yapar mı?',
        answer: 'Matbaamızda yüksek tonajlı otomatik kırım ünitelerinde hassas fırçalama ve pilyaj uygulandığı için kağıtlarda lif kırılması ve boya çatlaması yaşanmaz.'
      }
    ]
  },
  {
    slug: 'lokantalar-icin-amerikan-servis-ebatlari',
    title: 'Lokantalar ve Kafeler İçin İdeal Amerikan Servis Ebatları ve Kağıt Türleri',
    excerpt: 'Masada hijyeni pürüzsüz sağlarken marka gücünü şahlandıran tek kullanımlık Amerikan servislerin 1. Hamur ve Kraft kağıt özellikleri.',
    date: '08 Mayıs 2026',
    readTime: '6 Dk Okuma',
    category: 'Masaüstü & Promosyon',
    image: '/images/amerikan-servis/restoran-amerikan-servis.webp',
    schemaType: 'Article',
    content: `## Lokantalar ve Kafeler İçin İdeal Amerikan Servis Ebatları ve Kağıt Türleri

Amerikan servisler sadece çorba kasesinin altını korumaz; müşterinizin yemek beklediği o boşlukta markanızın kurumsal çizgisini, sosyal medya QR kodlarını sergileyen devasa bir okuma masası görevi üstlenir.

Masalarınız için [Baskılı Amerikan Servis](/amerikan-servis) paketlerini listeleyebilir, paket siparişlerinizin yanına [Tırnak Kesimli Özel Magnet](/magnet) dökümlerimizi ekleyebilir ya da şık taşıma ambalajları için [Karton Çanta sayfasına](/karton-canta) ait fiyat listelerini inceleyebilirsiniz.

:::info-cards
Standart Ölçü Kriterleri
- **30x40 cm:** Standart kafe masaları, kahve dükkanları ve tepsilere tam oturan kompakt boyut.
- **35x50 cm:** Geniş kebapçı ve balık restoran masaları için tüm tabak ve çatalları kaplayan lüks ebat.
- Doğru ebat seçimi masada tabakların taşmasını ve düzensiz görünümü kesinlikle önler.
---
Kağıt Çeşitleri ve Duruşu
- **80 gr Kraft Kağıt:** Doğal kahverengi pürüzlü dokusuyla hamburgerciler ve gurme kafelerin favorisidir.
- **80 gr 1. Hamur Kağıt:** Saf beyaz rengiyle yemek resimlerinin capcanlı parlamasını ve hijyen hissini sağlar.
- **90 gr Kuşe Kağıt:** Hafif parlak sıvamasıyla fotoğraf kalitesindeki görselleri en net yansıtan kaplamadır.
---
Gıda Güvenli Mürekkepler
- Amerikan servisler gıda ile doğrudan temas edebileceği için kimyasal solvent mürekkepler kullanılmamalıdır.
- Matbaamızda sıcak yemek buharından etkilenip akmayan, çevre dostu bitkisel soya bazlı boyalar tercih edilir.
- Ağır kimyasal koku yaymayan, koku hassasiyeti yüksek restoranlar için en dürüst çözümdür.
:::

---

## Amerikan Servis Kullanımında Sıkça Yapılan Hatalar

:::warning-box
- Gıda temasına uygun olmayan, kimyasal solvent kokulu sanayi boyalarıyla basım yapmak.
- Kaygan, parlak selefonlu kağıtlar seçip masada tabak ve bardakların kaymasına sebep olmak.
- Masa ölçülerini almadan çok büyük veya çok küçük Amerikan servis ebatları sipariş etmek.
- Amerikan servis alanını sadece logo koyarak boş bırakmak (Reklam alanını israf etmek).
:::

---

## Mavi Basım Hijyenik Amerikan Servis Üretimi

:::importance-cards
Bitkisel Soya Mürekkebi | Sıcak tabak buharından etkilenerek kesinlikle akmayan, gıda temasına %100 uygun bitkisel ve kokusuz soya mürekkeplerimiz.
Kraft ve 1. Hamur Çeşitleri | Doğal nostaljik cafe konseptleri için orijinal Kraft kağıt veya pürüzsüz temizlik hissi için bembeyaz 1. hamur selüloz.
Endüstriyel Kesim | Otomatik giyotin makinelerimizde milimetrik olarak sıfır hata ile kesilmiş, pürüzsüz ve düzgün kenar standartları.
:::

---

## Amerikan Servis Kağıt Karşılaştırması

| Kağıt Türü | Kağıt Rengi | Su ve Yağ Emiciliği | En Uygun Restoran Konsepti | Kurumsal İmaj |
| :--- | :--- | :--- | :--- | :--- |
| **80 gr Kraft Kağıt** | Doğal Kahverengi | Yüksek Emici (Yağ lekesini gizler) | Hamburgerciler, Steakhouse, Butik Kafeler | ★★★★★ |
| **80 gr 1. Hamur** | Saf Parlak Beyaz | Orta-Yüksek Emici (Hijyenik durur) | Kebapçılar, Aile Lokantaları, Balıkçılar | ★★★★★ |
| **90 gr Mat Kuşe** | Mat Pürüzsüz Beyaz | Düşük Emici (Görselleri çok net yansıtır)| Gurme Restoranlar, Otel Yemek Salonları | ★★★★☆ |

---

:::cta
TITLE: Masalarınıza Özel Amerikan Servis
DESC: Hem masalarınızın temizliğini koruyacak hem de müşterilerinize en yeni kampanyalarınızı ve QR menünüzü sunacak Amerikan servislerin tasarım ve üretimini yapıyoruz. Hızlı fiyat teklifi almak için hemen tıklayın.
BTN_TEXT: WhatsApp Fiyat Listesi
BTN_LINK: https://wa.me/905321234567
:::`,
    faq: [
      {
        question: 'Gıda ile temas eden Amerikan servisin mürekkebi akar mı?',
        answer: 'Baskı bandında sıcak yemek tabaklarından nem kapıp akmayan, çevre dostu fırınlanmış gıda sınıfı dikey mürekkepler tercih edilmektedir.'
      }
    ]
  },
  {
    slug: 'kabartma-lak-ve-gofre-baski-nedir',
    title: 'Kabartma Lak, Gofre ve Varak Yaldız Nedir? Premium Kartvizit Detayları',
    excerpt: 'Markanıza lüks ve elit bir imaj katmak amacıyla kartvizit, katalog ve dosya kapaklarında uygulanan gofre (kabartma) ve folyo yaldız sırlar.',
    date: '07 Mayıs 2026',
    readTime: '7 Dk Okuma',
    category: 'Kartvizit & Prestij',
    image: '/images/kartvizit/kartvizit-baski.webp',
    schemaType: 'Article',
    content: `## Kabartma Lak Gofre ve Varak Yaldız Nedir? Premium Kartvizit Sırları

Sıradan bir matbaa çıktısını premium bir prestij belgesine dönüştüren şey, üzerine uygulanan ekstra bitiş işlemlerdir (konfeksiyon süreçleri). Markanıza elit bir imaj katan bu dokunsal tekniklerin detaylarını inceliyoruz.

Şık bir imza için [Kabartma Laklı Kartvizit Fiyatları](/kartvizit) listemizi turlayabilir, firmanıza özel [Lüks Katalog Tasarımlarımızı](/kataloglar) sipariş verebilir ya da klasörleriniz için [Cepli Klasör sayfasına](/dosyalar) yönelik modellere göz atabilirsiniz.

:::info-cards
Kısmi Lak & Kabartma Lak
- Mat selefonlu kartvizitlerin üzerine logonun şekline göre şeffaf ıslak lak boyası dökülür.
- Ultraviyole (UV) fırınlarında saniyeler içinde dikey olarak fırınlanıp kurutulur.
- **Kabartma Lak:** Dokunulduğunda parmak uçlarında pürüzsüz bir kabarıklık ve hacim hissettirir.
- Mat zemin ile parlak kabartma lak arasındaki zıtlık, göz alıcı bir kontrast yaratır.
---
Gofre Baskı (Pres Kabartma)
- Erkek ve dişi metal kalıpların kağıdı araya sıkıştırarak yüksek basınçla ezmesi tekniği.
- Kağıdın arkasında çöküntü, ön yüzeyinde ise muazzam tırnağa takılan pürüzsüz kabarıklık kalır.
- Kalın fantezi tuale kağıtlara ve Amerikan Bristol kartonlara mükemmel şekilde kenetlenir.
- Logonuzun fiziksel olarak kağıttan yukarı fırlamasını sağlayan en asil pres yöntemidir.
---
Varak Yaldız (Folyo Pres)
- Kağıdın üzerine sıcak pirinç kalıplarla altın, gümüş veya bakır folyo tabakasının basılması.
- Işıltılı ve metalik metal yansımalarıyla lüks gayrimenkul ve kuyumcu markalarının gözdesidir.
- Kabartma lak veya gofre ile birleştirildiğinde muazzam bir derinlik hissiyatı uyandırır.
:::

---

## Premium Ekstra Uygulamalarda Yapılan Grafik Hataları

:::warning-box
- Parlak selefonlu kartvizit üzerine kabartma lak denemek (Zemin de parlak olduğu için lak hiç seçilemez).
- Kabartma lak veya gofre alanlarını çok ince (0.5 mm altı) çizgilerle tasarlamak (Pres makinesinde tutunamaz).
- Gofre uygulamasını çok ince gramajlı kağıtlara basıp derinlik elde edememek.
- Kabartma kalıp mizanpajlarını baskı PDF'ine ek olarak ayrı bir "Kalıp Sayfası" olarak göndermemek.
:::

---

## Mavi Basım Elit Konfeksiyon Ayrıcalıkları

:::importance-cards
Kusursuz Register Uyumu | Ofset baskı ile kabartma lak/gofre pres kalıplarının milimetrik olarak birebir üst üste oturmasını sağlayan hassas register teknolojimiz.
Özel Pirinç Pres Dişleri | Gofre kabartmalarında kağıdı yırtmadan, en keskin ve net yüksekliği veren ithal CNC kesim pirinç gofre kalıplarımız.
Zengin Folyo Kartelası | Altın ve gümüşün ötesinde, markanıza yakışacak rose-gold, hologramlı ve mat metalik varak folyo alternatifleri.
:::

---

## Premium Ekstra Bitişler Karşılaştırması

| Ekstra Uygulama | Dokunsal Hissiyat | Görsel Parlaklık | En İdeal Kağıt Gramajı | Kurumsal Derece |
| :--- | :--- | :--- | :--- | :--- |
| **Kısmi Kabartma Lak** | Pürüzsüz Kabarık Jel | Ultra Parlak Şeffaf | 350 gr Mat Selefonlu Kuşe | ★★★★★ |
| **Gofre (Pres)** | Doğal Kağıt Kabarıklığı | Mat (Kağıdın kendi rengi) | 350 gr Bristol veya Tuale | ★★★★★ |
| **Varak Yaldız (Folyo)**| Düz ve Metalik Pres | Ayna Efektli Altın/Gümüş | Tüm Kalın Kağıt Gramajları | ★★★★★ |

---

:::cta
TITLE: Lüks Kartvizit Tasarımı
DESC: Markanızı ilk el sıkışmada zirveye taşıyacak kabartma laklı, gofreli ve altın varaklı kartvizit projelerinizi profesyonelce hazırlıyoruz. Size özel pirinç kalıp taslaklarımızı incelemek için hemen yazın.
BTN_TEXT: WhatsApp Lüks Kart Tasarımı
BTN_LINK: https://wa.me/905321234567
:::`,
    faq: [
      {
        question: 'Gofre her kağıda uygulanabilir mi?',
        answer: 'Özellikle yüksek lifli ve kalın tuale fantezi kağıtlarda ya da Amerikan Bristol kartonlarda gofre uygulaması en etkileyici derinliği sunmaktadır.'
      }
    ]
  },
  {
    slug: 'oto-paspas-baskida-emici-kraft-farki',
    title: 'Oto Paspas Baskısında Emici Kraft Kağıt ve Sülfit Kağıt Farkları',
    excerpt: 'Oto yıkama ve teknik servislerin kullandığı kağıt oto paspas siparişlerinde emici kraft kağıdın çamuru tutması ve yırtılmama mukavemeti.',
    date: '06 Mayıs 2026',
    readTime: '6 Dk Okuma',
    category: 'Masaüstü & Promosyon',
    image: '/images/oto-paspas/oto-paspas-kagit-baski.webp',
    schemaType: 'Article',
    content: `## Oto Paspas Baskısında Emici Kraft Kağıt ve Sülfit Kağıt Farkları

Oto yıkama salonlarından sıfır gibi tertemiz çıkan bir aracın tabanına serilen kağıt paspaslar esnafın imajıdır. Ayak altındaki suyu ve çamuru emerek orijinal döşemeye geçirmemesi gerekir.

Hemen üretmek için [Baskılı Kağıt Oto Paspas](/oto-paspas) sitemizi gezebilir, ofis içi kurumsal [Bloknot Defteri sayfasına](/bloknotlar) ait imalatları görebilir ya da şık kurumsal paketler için [Karton Çanta sayfasına](/karton-canta) ait fiyatları öğrenebilirsiniz.

:::info-cards
Kraft Kağıt (Emici)
- Doğal ahşap selülozundan üretilen, ağartma işlemine maruz kalmayan kahverengi kart.
- Ayak altındaki ıslaklığı ve çamuru hızla içine çeker, çamurun döşemeye bulaşmasını kesin önler.
- Islakken yırtılması son derece zordur, araca binip inerken ayak altında bükülüp parçalanmaz.
- Doğal ahşap tonuyla oto yıkamalarda "premium ve kaliteli" esnaf imajı çizer.
---
Sülfit Kağıt (Ekonomik)
- Beyaz renkli, bir yönü pürüzsüz sıvamalı ve hafif kaygan olan ekonomik kağıt.
- Metrekare birim fiyatı çok ucuzdur, kısıtlı bütçeye sahip esnaflar için verimlidir.
- Beyaz zemin üzerine basılan kurumsal logoların pırıl pırıl ve keskin görünmesini sağlar.
- Su emicilik mukavemeti Kraft kağıt kadar yüksek ve dayanıklı değildir.
---
Ölçü ve Kesim Detayları
- Evrensel oto paspas ölçü standardı araç tabanlarına tam sığan **35x50 cm**'dir.
- Hassas giyotin kesimleri sayesinde kenarları düzgün ve pürüzsüz hatlara sahiptir.
- Kalın lif yapısı, paspasın ayakkabı tırnaklarına takılıp sıyrılmasını engeller.
:::

---

## Oto Paspas Baskılarında Yapılan Kritik Hatalar

:::warning-box
- Çok ince (50-60g) kağıtlar tercih edip, ayakkabı nemiyle saniyeler içinde yırtılması.
- Sülfit kağıt seçip ıslak ayakkabının kaymasına ve sürüş konforunu riske atmaya yol açmak.
- Çabuk solan, nemle dağılan kalitesiz solvent bazlı kimyasal boyalar kullanmak.
- Paspas alanını gereksiz yazılarla doldurup logonun kurumsal gücünü gölgelemek.
:::

---

## Mavi Basım Sağlam Oto Paspas Ayrıcalıkları

:::importance-cards
80 gr İthal Emici Kraft | Sudan ve çamurdan etkilenerek kesinlikle parçalanmayan, ayak altında sıyrılma yapmayan 1. sınıf emici Kraft paspas kağıdı.
Solmaz Sıvı Mürekkep | Ayakkabı altındaki suyla temas ettiğinde asla dağılmayan, otomobil döşemesine boya kusmayan fırınlanmış özel matbaa boyalarımız.
Evrensel 35x50cm Ebat | Tüm binek ve ticari araçların ön ve arka taban bölmelerine milimetrik olarak uyum sağlayan ideal paspas kesim ölçüsü.
:::

---

## Oto Paspas Kağıt Karşılaştırması

| Paspas Kağıdı | Su Emicilik | Islak Mukavemet | Birim Üretim Maliyeti | Esnaf Prestij Derecesi |
| :--- | :--- | :--- | :--- | :--- |
| **80 gr Emici Kraft** | En Üst Seviye | Çok Yüksek (Yırtılmaz) | Ekonomik-Orta | ★★★★★ |
| **70 gr Sülfit Kağıt** | Orta Seviye | Orta-Düşük (Islanınca yırtılabilir)| En Ucuz (Bütçe Dostu) | ★★★☆☆ |
| **80 gr 1. Hamur Kağıt**| Yüksek Seviye | Orta (Beyaz temiz görünüm sunar) | Orta | ★★★★☆ |

---

:::cta
TITLE: Markanıze Özel Oto Paspas
DESC: Oto yıkama ve servis noktanızın kalitesini müşterilerinize hissettirecek, ıslakken yırtılmayan ve kaymayan Kraft oto paspasların basımını yapıyoruz. Hızlı logo tasarımı hazırlatmak için hemen yazın.
BTN_TEXT: WhatsApp Paspas Siparişi
BTN_LINK: https://wa.me/905321234567
:::`,
    faq: [
      {
        question: 'Paspasların standart ölçüsü nedir?',
        answer: 'Genellikle araç tabanlarına tam sığacak şekilde tasarlanan 35x50 cm boyutları oto yıkama sektörü için evrensel standarttır.'
      }
    ]
  },
  {
    slug: 'antetli-kagit-baskisinda-80gr-1.hamur',
    title: 'Kurumsal Kimliğin Temeli: Antetli Kağıt Baskısında 80 gr 1. Hamur Standardı',
    excerpt: 'Lazer yazıcılarla tam uyumlu, sıkışma ve mürekkep dağıtma yapmayan logolu dikey kurumsal yazışma kağıdı seçerken bilinmesi gerekenler.',
    date: '05 Mayıs 2026',
    readTime: '6 Dk Okuma',
    category: 'Kartvizit & Prestij',
    image: '/images/antetli-kagit/antetli-kagit-baski-fiyatlari.webp',
    schemaType: 'Article',
    content: `## Kurumsal Kimliğin Temeli: Antetli Kağıt Baskısında 80 gr 1. Hamur Standardı

Kurumsal kimliğin en temel yapı taşlarından biri olan **antetli kağıt**, firmaların resmi yazışmalarında, teklif mektuplarında ve sözleşmelerinde kurumsal imajı doğrudan yansıtır. Doğru kağıt gramajı ve baskı kalitesi seçilmeyen belgeler, lazer yazıcılarda sıkışma, mürekkep dağılması gibi ciddi teknik sorunlar doğurabilir. 

Kurumsal belgeleriniz için [Antetli Kağıt Baskısı](/antetli) fiyatlarımızı inceleyebilir, kurumsal kimliğinizi tamamlayacak prestijli [Kartvizit sayfasına](/kartvizit) ait dökümleri görebilir ve resmi gönderimler için [Zarf Baskısı sayfasına](/zarf) yönelik tasarımları inceleyebilirsiniz.

:::info-cards
Lazer Yazıcı Dostu Yapı
- Ofis içi standart yazıcılarda (inkjet veya laserjet) kullanılan antetli kağıtların pürüzsüz bir yüzeye ve dengeli bir nem oranına sahip olması kritik önem taşır.
- Matbaamızda üretilen antetli kağıtlar, çift taraflı yüksek kaliteli 1. hamur selülozdan üretilmekte olup, yazıcı besleme tepsilerinde kayma veya sıkışma yapmadan pürüzsüz bir geçiş sağlar.
---
Baskı Hassasiyeti
- Logonuzun ve kurumsal çizgilerinizin orijinal renklerini koruyan CMYK yüksek çözünürlüklü ofset baskı teknolojisi.
- Kurumsal renklerinizin birebir yakalanması amacıyla Pantone kalibrasyonu yapılır.
---
Standart Ebat
- Resmi belgelerin evrensel standardı olan **A4 Ebat (21x29,7 cm)** kesim.
- Yazı yazılması veya üzerine not alınabilmesi için mat ve tok doku.
:::

---

## Antetli Kağıt Tasarımında En Sık Yapılan Hatalar

:::warning-box
- Yazıcılarda sıkışma yapan fason kağıtlar tercih etmek.
- 1. Hamur dışındaki pürüzlü fantezi kağıtlar kullanıp lazer tonerin dökülmesine yol açmak.
- Logonun renk profillerini RGB formatında bırakıp baskıda soluk tonlar elde etmek.
- Taşma payı bırakmayıp kenar çizgilerinin kesim esnasında yok olmasına sebep olmak.
:::

---

## Mavi Basım Yüksek Kaliteli Antetli Kağıt Avantajları

:::importance-cards
1. Sınıf 80g Selüloz | Tüm inkjet ve laserjet ofis yazıcılarıyla %100 uyumlu çalışan, yazıcı silindirlerinde bükülüp sıkışmayan saf selüloz antetli kağıtlar.
Yüksek Renk Hassasiyeti | Ofset parkurumuzda logonuzun orijinal kurumsal tonlarını (Pantone kalibrasyonlu) kağıda jilet gibi keskin aktaran dikey baskı ünitelerimiz.
A4 Evrensel Standart | Resmi evrak arşivlerine, sunum klasörlerine ve zarflara kusursuz sığan milimetrik A4 dikey kesim garantisi.
:::

---

## Antetli Kağıt Teknik Karşılaştırması

| Özellik / Parametre | 80 gr 1. Hamur Antetli Kağıt | 90 gr 1. Hamur Antetli Kağıt | Fotokopi Kağıdı (Baskısız) |
| :--- | :--- | :--- | :--- |
| **Yazıcı Uyumluluğu** | %100 Kusursuz (Standart Lazer) | %100 Kusursuz (Premium Lazer) | Değişken (Sıkışma riski yüksektir) |
| **Elde Yarattığı Tokluk**| İdeal Orta Kalınlık | Ağır ve Oldukça Tok Yapı | İnce ve Güvensiz Basit Yapı |
| **Baskı Kalitesi** | Canlı Ofset Renkler | Canlı Ofset Renkler | Baskısız Sade |
| **Kurumsal İmaj** | ★★★★★ | ★★★★★ | ★☆☆☆☆ |

---

:::cta
TITLE: Kurumsal Antetli Kağıt Baskısı
DESC: Ofisinizdeki tüm yazıcılarla tam uyumlu çalışacak, firmanızın logosuyla kurumsal kimliğinizi taçlandıracak antetli kağıtları en uygun ofset fiyatlarıyla üretiyoruz. Grafik prova onayı almak için hemen bizimle iletişime geçin.
BTN_TEXT: WhatsApp Antetli Kağıt Hattı
BTN_LINK: https://wa.me/905321234567
:::`,
    faq: [
      {
        question: 'Antetli kağıtlarda standart gramaj neden 80 gr tercih edilir?',
        answer: '80 gr. 1. Hamur kağıtlar, ofislerde kullanılan stagnant fotokopi kağıtlarıyla aynı gramajda olup, tüm lazer ve mürekkep püskürtmeli yazıcılarla en kusursuz ve sıkışmasız çalışan standarttır.'
      },
      {
        question: 'Çok renkli logolar antetli kağıtta kaliteli basılır mı?',
        answer: 'Evet, gelişmiş ofset baskı makinelerimizde kurumsal renkleriniz (Pantone veya CMYK) kağıt üzerine yüksek hassasiyetle ve netlikle aktarılır.'
      }
    ]
  },
  {
    slug: 'zarf-baskisinda-diplomat-ve-torba-zarf',
    title: 'Zarf Baskısında Diplomat Zarf, Torba Zarf ve Silikon Yapışkan Çeşitleri',
    excerpt: 'Muhasebe fatura gönderilerinde penceresiz diplomat zarfların ofset üretimi ve 1. Hamur torba zarflarda silikon yapışkan şerit ömrü.',
    date: '02 Mayıs 2026',
    readTime: '6 Dk Okuma',
    category: 'Kartvizit & Prestij',
    image: '/images/zarf/kurumsal-zarf-baski.webp',
    schemaType: 'Article',
    content: `## Yazışmaların Kurumsal Kabuğu: Pencereli & Penceresiz Silikonlu Zarf İmalatı

Kurumsal haberleşmenin, fatura gönderimlerinin ve resmi evrak transferlerinin vazgeçilmez bir diğer parçası da **kurumsal zarf** baskılarıdır. Doğru ebatta ve kaliteli tasarımla hazırlanan zarflar, alıcının eline ulaştığı ilk anda firmanızın ciddiyetini ve prestijini hissettirir.

Yazışmalarınız için [Zarf Baskısı](/zarf) modellerimizi görebilir, evraklarınızı koruyacak kurumsal [Cepli Dosya sayfasına](/dosyalar) ait klasörleri inceleyebilir ve resmi evraklar için [Antetli Kağıt sayfasına](/antetli) yönelik tasarımlara göz atabilirsiniz.

:::info-cards
Diplomat Zarf (10.5x24 cm)
- Muhasebe faturaları, e-arşiv çıktıları ve tek sayfalık kurumsal yazışmalar için idealdir.
- Evrak üzerindeki alıcı adresinin dışarıdan görünmesi için şeffaf pencereli veya adres alanı bulunmayan penceresiz seçenekleri bulunur.
- En çok tercih edilen kurumsal diplomat zarf modelidir.
---
Torba Zarf (24x32 cm / 26x35 cm)
- Çok sayfalı sözleşmeler, tapu belgeleri, broşürler ve kalın kurumsal evraklar için idealdir.
- Evrakların bükülmeden, düzgünce saklanarak taşınmasını sağlayan dikey geniş hacimli yapıdır.
- Firmanızın logosuyla ön yüze tek renk veya çok renkli ofset baskı yapılabilir.
---
Silikon Yapışkan Teknolojisi
- Zarflarımızın kapaklarında güçlü silikon yapışkan şerit teknolojisi kullanılmaktadır.
- Koruyucu bant söküldüğünde neme ve yırtılmaya dayanıklı güçlü yapışma sunar.
- Kuru depolarda 2 yıla kadar güçlü yapışma özelliğini kaybetmeden saklanabilir.
:::

---

## Zarf Siparişlerinde En Sık Yapılan Hatalar

:::warning-box
- Zarf kapağında zayıf yapıştırıcı kullanıp kargo taşınmasında zarfın açılmasına yol açmak.
- Gönderilecek evrakın kalınlığını hesaba katmadan küçük zarf ölçüsü seçmek.
- İçi görünmeyen opaklıkta olmayan, çok ince fason kağıttan zarf siparişi vermek.
- Pencere hizasını evrak üzerindeki adres alanıyla tam eşleştirmeden pencereli zarf seçmek.
:::

---

## Mavi Basım Güçlü Silikonlu Zarf Ayrıcalıkları

:::importance-cards
Güçlü Silikon Bant | Zarf kapağının taşıma ve kargo esnasında kendi kendine açılmasını kesinlikle engelleyen ultra mukavemetli silikon şerit yapışkan.
İçi Görünmez Güvenlik | Zarfın içindeki gizli ticari evrakların ışığa tutulduğunda dışarıdan görünmesini önleyen kalın, yüksek opaklıkta selüloz yapısı.
Pürüzsüz Ofset Logo | Gelişmiş zarf baskı makinelerimizde kurumsal logonuzun renklerini zarf yüzeyine sıfır kayma ile aktaran dikey ünitelerimiz.
:::

---

## Kurumsal Zarf Çeşitleri Karşılaştırması

| Zarf Modeli | Standart Ölçü | Pencere Seçeneği | En Uygun Gönderi Türü | Kurumsal Prestij |
| :--- | :--- | :--- | :--- | :--- |
| **Diplomat Zarf** | 10.5 x 24 cm | Pencereli veya Penceresiz | Muhasebe faturaları, tek sayfalık resmi teklifler | ★★★★★ |
| **Torba Zarf** | 24 x 32 cm / 26 x 35 cm | Genelde Penceresiz | Çok sayfalı sözleşmeler, tapular, broşürler, kataloglar | ★★★★★ |
| **Mektup Zarfı** | 11.4 x 16.2 cm | Penceresiz | Tebrik kartları, butik davetiyeler, hediye çekleri | ★★★★☆ |

---

:::cta
TITLE: Kurumsal Zarf Siparişi
DESC: Resmi faturalarınızı ve ticari sözleşmelerinizi en güvenli şekilde taşıyacak, güçlü silikonlu diplomat ve torba zarfların üretimini yapıyoruz. logonuzla sipariş şablonu hazırlatmak için hemen bizimle iletişime geçin.
BTN_TEXT: WhatsApp Zarf Hattı
BTN_LINK: https://wa.me/905321234567
:::`,
    faq: [
      {
        question: 'Zarflardaki silikon yapışkanın raf ömrü ne kadardır?',
        answer: 'Zarflarımızda kullanılan kaliteli silikon yapıştırıcı şeritler, nemsiz ve doğrudan güneş ışığı almayan ortamlarda saklandığında 2 yıla kadar güçlü yapışma özelliğini korur.'
      },
      {
        question: 'Pencereli and penceresiz diplomat zarf farkı nedir?',
        answer: 'Pencereli diplomat zarflarda, evrak üzerindeki adres bilgisinin dışarıdan görünmesi için şeffaf bir plastik pencere alanı bulunur. Penceresiz model ise tamamen kapalıdır.'
      }
    ]
  },
  {
    slug: 'emlak-yer-gosterme-belgesi-nedir',
    title: 'Yer Gösterme Belgesi Baskısı | Otokopili NCR Koçan Baskı',
    excerpt: `Yer Gösterme Belgesi, emlak danışmanlarının müşterilerine gösterdikleri taşınmazları kayıt altına almak amacıyla kullanılan resmi bir evraktır. Satılık ve kiralık gayrimenkul gösterimlerinde düzenlenen bu belge; müşteri bilgileri, taşınmaz bilgileri, gösterim tarihi ve tarafların imzalarını içerir. Düzenli şekilde hazırlanan Yer Gösterme Belgesi, gösterim sürecinin kayıt altına alınmasına yardımcı olur ve emlak ofislerinin evrak düzenini destekler.

Bu rehberde Yer Gösterme Belgesi hakkında en çok merak edilen soruların cevaplarını bulabilirsiniz. Yer Gösterme Belgesi nedir, nereden alınır, nasıl hazırlanır, nasıl doldurulur, örnekleri nelerdir, PDF, Word ve Excel formatları nasıl kullanılır, kaç nüsha hazırlanmalıdır, numaratör neden tercih edilir ve otokopili NCR koçan baskılarında dikkat edilmesi gereken teknik detaylar bu içerikte kapsamlı şekilde açıklanmaktadır.

Ayrıca firmanıza özel logolu, numaratörlü ve otokopili Yer Gösterme Belgesi baskı seçenekleri, A4 ve A5 ebat alternatifleri, teknik özellikler, baskı süreci, teslimat bilgileri ve sipariş aşamaları hakkında da ayrıntılı bilgiler yer almaktadır.`,
    date: '04 Haziran 2026',
    readTime: '6 Dk Okuma',
    category: 'Matbaa Bilgi',
    image: '/images/sozlesme/yer-gosterme-belgesi-otokopili.webp',
    schemaType: 'Article',
    content: `## Yer Gösterme Belgesi Nedir? Neden Kullanılır?

Emlak sektöründe güvenliğin, şeffaflığın ve profesyonelliğin temel adımlarından biri, gösterilen satılık veya kiralık gayrimenkullerin resmi olarak kayıt altına alınmasıdır. Bu amaçla kullanılan **Emlak Yer Gösterme Formu**, emlak danışmanları ile alıcı veya kiracı adayları arasında düzenlenen yasal bir **Yer Gösterme Sözleşmesi** olarak kabul edilir. Sektörde **Gayrimenkul Yer Gösterme Formu**, **Yer Gösterim Formu**, **Taşınmaz Gösterim Belgesi** veya **Emlak Gösterim Belgesi** gibi farklı isimlerle de bilinen bu evrak, verilen aracılık ve pazarlama hizmetinin en somut ve yasal delilidir.

Bu sözleşme, emlak ofislerinin harcadığı emeği ve portföy güvenliğini koruma altına alırken, müşterilerin de hangi taşınmazları hangi tarihte incelediğini şeffaf bir şekilde belgeler. Özellikle **yer gösterme belgesi otokopili** veya **yer gösterme belgesi koçan** olarak basıldığında, sahada karbon kağıdı arama zahmetini ortadan kaldırır ve hızlıca iki ya da üç nüsha olarak düzenlenebilir.

Emlak ofislerinin kurumsal evrak düzeninde [Yetki Belgesi rehberine](/makbuz-ve-formlar) yönelik standartlar hayati öneme sahiptir. Ayrıca emlakçılar için prestijli bir [Kartvizit sayfasına](/kartvizit) yönlenen özelleştirilmiş tasarımlar, ilan tanıtımlarında kullanılan [Broşür sayfası](/brosur) baskıları, resmi ödemelerin belgelenmesini sağlayan [Tahsilat Makbuzu sayfasına](/tahsilat-makbuzu) ait koçanlar ve alıcı-satıcı haklarını güvenceye alan [Sözleşme sayfasına](/sozlesme-baski) ait formlar bütünsel bir kurumsal imajı destekler.

---

## Yer Gösterme Belgesinin Yasal Dayanağı ve Zorunluluğu

Emlak ofislerinin bu belgeyi düzenlemesi keyfi bir uygulama değil, yasal bir zorunluluktur. [Ticaret Bakanlığı](https://www.ticaret.gov.tr) tarafından yürürlüğe konan **Taşınmaz Ticareti Yönetmeliği Madde 19** uyarınca, yetki belgeli emlak işletmelerinin müşterilerine gösterdiği her bir mülk için ayrı bir form düzenlemesi şart koşulmuştur.

Yönetmelik kurallarına uygun olarak hazırlanmayan veya imzasız düzenlenen bir **boş yer gösterme belgesi** hukuki bir değer taşımaz. Bu nedenle her gayrimenkul danışmanı sahaya çıkarken yanında **yer gösterme belgesi numaratörlü** ve kurumsal logolu koçanlarını bulundurmalıdır. Bu koçanlar sayesinde hem yasal denetimlerde cezalardan korunursunuz hem de olası komisyon anlaşmazlıklarında haklarınızı mahkemede kanıtlayabilirsiniz.

---

## Emlak Yer Gösterme Belgesinin Yapısı ve Bölümleri

Profesyonel bir **emlak yer gösterme belgesi örneği** içinde yer alan tüm alanların eksiksiz ve yasal mevzuata uygun şekilde tasarlanması gerekir. Formun yapısı şu 4 temel gruptan oluşmaktadır:

:::info-cards
:::

---

## Yer Gösterme Belgesi Nasıl Doldurulur? Adım Adım Rehber

Formun yasal olarak geçerli ve mahkemelerde bağlayıcı bir delil olabilmesi için doldurulurken şu sıralı adımların hassasiyetle uygulanması gerekir:

:::doldurma-adimlari
:::

---

## Formu Doldururken En Sık Yapılan Hatalar

Emlak danışmanlarının saha çalışmalarında telaşla yaptığı küçük hatalar, belgenin yasal geçerliliğini tamamen ortadan kaldırabilir. İşte yasal haklarınızı riske atmamak için kaçınmanız gereken kritik durumlar:

:::warning-box
:::

---

## Mavi Basım Otokopili Yer Gösterme Belgesi Özellikleri

Mavi Basım olarak gayrimenkul firmalarımızın profesyonelliğini sahada en iyi şekilde yansıtacak, en son teknoloji matbaa makinalarında üretilen **yer gösterme belgesi otokopili** koçan baskıları hazırlamaktayız. Baskılarımızın teknik ayrıcalıkları şunlardır:

:::importance-cards
:::

---

## Emlak Yer Gösterme Belgesi Baskı Seçenekleri Karşılaştırma Tablosu

İhtiyacınıza en uygun ebat ve nüsha modelini belirlemek için hazırladığımız sektörel karşılaştırma tablosunu inceleyebilirsiniz:

| Özellik / Format | Yer Gösterme Belgesi A4 | Yer Gösterme Belgesi A5 | Fotokopi Baskı (Önerilmez) |
| :--- | :--- | :--- | :--- |
| **Kullanım Amacı** | Yoğun Portföylü ve Sözleşme Maddeleri Geniş Kurumsal Firmalar | Mobil, Pratik ve Sahada Hızlı Kullanım İsteyen Danışmanlar | Güvencesiz, Kurumsallıktan Uzak, Kolay Kaybolan Tekli Yapraklar |
| **Ebat Ölçüsü** | 210 x 297 mm (Geniş Okuma Alanı / Yer Gösterme Belgesi A4) | 148 x 210 mm (Portatif Çanta Boyu / Yer Gösterme Belgesi A5) | Değişken (Düzensiz Kesim) |
| **Nüsha Seçenekleri** | 2 Nüsha (Asıl+Suret) veya 3 Nüsha | 2 Nüsha veya 3 Nüsha | Tek Sayfa (Kopyalama Yok) |
| **Kağıt Teknolojisi** | Kendinden Karbonlu Profesyonel NCR | Kendinden Karbonlu Profesyonel NCR | Sıradan Fotokopi Kağıdı (Karbonsuz) |
| **Güvenlik Takibi** | Ardışık 6 Haneli Numaratör Baskılı | Ardışık 6 Haneli Numaratör Baskılı | Numaratörsüz (Takip Edilemez) |
| **Cilt Tipi** | Üstten Tel Dikişli ve Mikro Perforajlı | Üstten Tel Dikişli ve Mikro Perforajlı | Ciltsiz Dağınık Kağıtlar |
| **Kurumsal İmaj** | En Üst Seviye Prestij | Yüksek ve Pratik Prestij | Çok Düşük / Gayriresmi |

---

## Gerçek Üretim ve Baskı Fotoğraflarımız

Aşağıda, tesislerimizde gayrimenkul firmaları için ürettiğimiz gerçek otokopili ve numaratörlü formların, koçanların ve yasal sözleşme tasarımlarının baskı fotoğraflarını inceleyebilirsiniz:

:::gallery
:::

---

## Ücretsiz Yer Gösterme Belgesi Şablonları ve İndirme Bağlantıları

Kendi yazıcınızdan **yer gösterme belgesi çıktısı** almak veya dijital arşiv oluşturmak istiyorsanız, aşağıda yer alan **yer gösterme belgesi ücretsiz** indirme bağlantılarından yararlanabilirsiniz. Ancak profesyonel bir marka imajı ve pratik saha kullanımı için kendinden karbonlu koçan siparişi vermenizi öneririz.

:::downloads
PDF | Yer Gösterme Belgesi Şablonu (PDF) | Boş, kullanıma hazır standart A5 PDF şablonu (yer gösterme belgesi örneği pdf) | /downloads/yer-gosterme-belgesi-bos-sablon.pdf | Hemen İndir (PDF)
Word | Yer Gösterme Belgesi Şablonu (Word) | Üzerinde düzenleme yapabileceğiniz kurumsal şablon (yer gösterme belgesi word) | /downloads/yer-gosterme-belgesi-bos-sablon.docx | Düzenle & İndir (Word)
Excel | Portföy Gösterim Çizelgesi (Excel) | Dijital ortamda portföy listeleme ve gösterim takip tablosu (yer gösterme belgesi excel) | /downloads/portfoy-gosterim-takip-cetveli.xlsx | Excel İndir (Excel)
:::

---

## 7 Adımda Kolay ve Hızlı Sipariş Süreci

Logonuzla ve firmanıza özel hazırlanan yasal mevzuata tam uyumlu formlarınızın tasarımından kapınıza teslimine kadar geçen süreç şu şekildedir:

:::process-steps
:::

---

:::cta
TITLE: Tasarım Desteği
DESC: Emlak ofisinizin logosu ve kurumsal bilgileriyle profesyonel yer gösterme belgesi tasarımınızı uzman grafik kadromuzla hazırlıyoruz. Baskı öncesinde PDF prova onayı almak için hemen bizimle iletişime geçin.
BTN_TEXT: Tasarım Desteği Alın
BTN_LINK: /iletisim
:::`,
    faq: [
      {
        question: 'Yer Gösterme Belgesi zorunlu mudur?',
        answer: 'Evet, Taşınmaz Ticareti Yönetmeliği Madde 19 hükümlerine göre yetki belgeli emlak işletmelerinin, müşterilerine gösterdikleri her taşınmaz için Yer Gösterme Belgesi düzenlemesi yasal olarak zorunludur.'
      },
      {
        question: 'Yer Gösterme Belgesi kaç yıl saklanır?',
        answer: 'Taşınmaz Ticareti Hakkında Yönetmelik gereğince düzenlenen tüm sözleşme ve yer gösterme belgelerinin emlak ofislerince en az 5 yıl süreyle saklanması ve arşivlenmesi zorunludur.'
      },
      {
        question: 'Yer Gösterme Belgesi noter onaylı mı olmalıdır?',
        answer: 'Hukuken yasal geçerlilik kazanması için noter onayına gerek yoktur. Emlak danışmanı ile potansiyel müşterinin karşılıklı ıslak imzası yasal olarak yeterlidir.'
      },
      {
        question: 'Yer Gösterme Belgesi iptal edilir mi?',
        answer: 'Düzenlenen bir belge tek taraflı olarak iptal edilemez. Ancak her iki tarafın karşılıklı mutabakatı ve yazılı beyanı ile geçerliliği sonlandırılabilir.'
      },
      {
        question: 'Yer Gösterme Belgesi hukuki delil midir?',
        answer: 'Evet, karşılıklı imzalanmış yer gösterme belgesi, olası komisyon anlaşmazlıklarında ve mahkeme süreçlerinde resmi yazılı delil (hukuki kanıt) olarak kabul edilir.'
      },
      {
        question: 'Yer Gösterme Belgesi elektronik ortamda hazırlanabilir mi?',
        answer: 'Evet, mevzuata uygun güvenli elektronik imza altyapıları veya doğrulanmış dijital emlak sistemleri üzerinden elektronik olarak hazırlanıp imzalanması mümkündür.'
      },
      {
        question: 'Yer Gösterme Belgesi olmadan komisyon alınabilir mi?',
        answer: 'Yer gösterme belgesi olmadan hak iddia etmek ve komisyon tahsilatı yapmak hukuki açıdan son derece zordur. Belge, hizmetin verildiğinin en somut yasal kanıtıdır.'
      }
    ]
  },{
    slug: 'online-matbaa-siparislerinde-nakliye-surecleri',
    title: 'Online Matbaacılık Siparişlerinde Topkapı’dan Kapıya Nakliye Kriterleri',
    excerpt: 'İstanbul Topkapı 2. Matbaacılar Sitesindeki fabrikamızdan 81 ile yapılan sevkiyatlarda hasarsız paketleme ve koli mukavemet analizleri.',
    date: '23 Nisan 2026',
    readTime: '7 Dk Okuma',
    category: 'Matbaa Teknik',
    image: '/images/katalog/tanitim-katalogu-ornegi.webp',
    schemaType: 'Article',
    content: `## Online Matbaacılık Siparişlerinde Topkapı’dan Kapıya Nakliye Kriterleri

Online matbaadan sipariş ettiğiniz binlerce adet ağır kitap, broşür veya kutular kargoda hırpalanarak sarsılırsa, müşterinize ulaşana kadar kenarları ezilebilir.

Tüm kurumsal ürünlerimizi [Mavi Basım Ana Sayfa](/matbaa) sitemizden online sipariş verebilir, [İletişim Adreslerimiz](/iletisim) üzerinden konumumuzu teyit edebilir ya da ambalaj siparişleriniz için [Özel Kutu sayfasına](/kutu) bakarak fiyatları görebilirsiniz.

:::info-cards
Çift Oluklu Kolileme
- Ağır broşür ve katalog paketlerinin altından yırtılmasını kesinlikle önleyen çift oluklu Kraft ambalajlama.
- Darbe emici yapısı sayesinde kargo aktarma merkezlerinde paketlerin ezilmesini engeller.
- Her kolinin ağırlığı taşıma standartlarına uygun olarak dengeli bir şekilde paylaştırılır.
---
Streçleme & Çemberleme
- Koli kapakları sıkıca bantlandıktan sonra endüstriyel pp çember makineleriyle gerdirilerek çemberlenir.
- Taşıma esnasında kolilerin açılması veya dağılması riski sıfıra indirilir.
- Yağmur ve neme karşı tüm koliler dıştan koruyucu streç film ile sımsıkı sarılır.
---
81 İle Güvenli Sevkiyat
- Mavi Basım güvencesiyle Türkiye'nin her yerine kargo sevkiyatı.
- Büyük hacimli ve ağır tonajlı paletli siparişlerinizde anlaşmalı ambar ve nakliye çözümleri.
- İzmir ve Ankara'ya 1-2 iş günü, diğer illerimize maksimum 3 iş gününde kapıya teslimat.
:::

---

## Matbaa Kargolarında Yaşanabilecek Pitfall'lar

:::warning-box
- İnce, fason tek oluklu karton koliler kullanıp kolinin yırtılarak içindekilerin dökülmesi.
- Yağışlı havalara karşı kolileri streç filmle sarmadan kargoya teslim etmek.
- Kolilerin üzerine "Hassas Ürün / Ezilmez" uyarı etiketleri yapıştırmamak.
- Kargo takip numarasını müşteriye anında iletmeyip teslimatta gecikmelere yol açmak.
:::

---

## Mavi Basım Hasarsız Nakliye Standartları

:::importance-cards
Double-Wall Ağır Hizmet | En ağır broşür ve kitap dökümlerinde dahi yırtılma ve patlama yapmayan, yüksek tonaj dayanımlı çift dalga Kraft kolilerimiz.
Endüstriyel Çemberleme | Kolilerin taşıma bantlarında dikey olarak açılmasını engelleyen sıcak gergi şerit çember bantlama teknolojisi.
Paletli Güvenli Sevk | Yüksek adetli ambalaj ve katalog siparişlerinizde ürünlerin dağılmasını önleyen ahşap paletli dikey istifleme standardı.
:::

---

## Sevkiyat Formatları Karşılaştırması

| Nakliye Metodu | Teslimat Hızı | Ağır Tonaj Dayanımı | En Uygun Sipariş Adeti | Güvenlik Seviyesi |
| :--- | :--- | :--- | :--- | :--- |
| **Anlaşmalı Kargo** | 1 - 3 İş Günü | Orta-Yüksek (Koli bazlı taşıma) | 1.000 - 5.000 Adet Kartvizit/Broşür | ★★★★★ |
| **Ambar & Komple Araç** | 2 - 4 İş Günü | En Üst Seviye (Paletli Taşıma) | 10.000 adet üzeri katalog, ağır kutular | ★★★★★ |
| **Kurye (İstanbul İçi)** | Aynı Gün (Birkaç Saat) | Hafif-Orta | Acil teslim edilmesi gereken numuneler | ★★★★★ |

---

:::cta
TITLE: Güvenli Nakliye Desteği
DESC: Sipariş ettiğiniz ağır matbaa ürünlerinin kapınıza sıfır hasarla, ezilmeden ve ıslanmadan ulaşması için en yüksek paketleme standartlarını uyguluyoruz. Sevkiyat koşulları ve kargo ücretleri hakkında bilgi almak için hemen yazın.
BTN_TEXT: WhatsApp Nakliye Hattı
BTN_LINK: https://wa.me/905321234567
:::`,
    faq: [
      {
        question: 'Kargo süresi kaç gündür?',
        answer: 'Baskısı tamamlanan paketleriniz kargoya verildikten sonra kargo mesafesine göre İzmir ve Ankara için 1-2 iş günü; diğer illerimiz için maksimum 3 iş gününde kapınıza ulaşır.'
      }
    ]
  },
{
    slug: 'etiketlerin-yapisan-yuzeylerin-mukavemeti',
    title: 'PP Opak, Şeffaf ve Kuşe Etiketlerde Yapışkan Mukavemeti Analizleri',
    excerpt: 'Plastik şampuan şişeleri, zeytinyağı cam şişeleri ve kargo kolileri için akrilik tutkal, hotmelt ve nonperm yapışkan standart farkları.',
    date: '27 Nisan 2026',
    readTime: '7 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/etiket/yapiskanli-etiket-baski.webp',
    schemaType: 'Article',
    content: `## PP Opak Şeffaf ve Kuşe Etiketlerde Yapışkan Mukavemeti Analizleri

Cam, metal veya pp plastik yüzeylerin enerjisi farklıdır. Yanlış tutkal seçimi, yapıştırdıktan 2 gün sonra etiketin kenarlardan kalkarak rulo gibi kıvrılmasına yol açar.

Etiket ihtiyaçlarınız için [Yapışkanlı Etiket Baskı](/etiket) fiyat listemizi turlayabilir, firmanıza özel [Ambalaj Kutuları sayfasına](/kutu) ait tasarımları inceleyebilir ve şık dükkan paketleri için [Karton Çanta sayfasına](/karton-canta) ait fiyatları görebilirsiniz.

:::info-cards
Akrilik Tutkal (Su Bazlı)
- Cam ve parlak plastik yüzeyler için harika bir tutunma gücü sunan şeffaf tutkal.
- Kozmetik şişeleri, şampuan kutuları ve cam kavanoz etiketlerinde en sık tercih edilen yapıştırıcıdır.
- Islanmaya ve neme karşı dayanıklı yapısıyla banyo gibi ıslak ortamlarda performansı yüksektir.
---
Hotmelt Tutkal (Kauçuk)
- Kauçuk bazlı, sarımsı renkli, sıcak ortamlarda yüksek mukavemet gösteren güçlü yapıştırıcı.
- Mukavva kutular, karton ambalajlar ve kargo kolileri üzerine mükemmel bir şekilde yapışır.
- Gözenekli yüzeylere derinlemesine nüfuz ederek etiketin sökülmesini imkansız hale getirir.
---
Nonperm Tutkal (Sökülebilir)
- Cam pencereler, kitap kapakları ve hassas elektronik cihazların üzerine yapıştırılan etiketler.
- Etiket söküldüğünde yüzeyde kesinlikle leke, iz, yapışkan artığı veya kağıt parçası bırakmaz.
- Ürün koruma bantlarında ve geçici bilgilendirme etiketlerinde en ideal narin tutkal formudur.
:::

---

## Etiket Tutkal Seçiminde Yapılan Kritik Hatalar

:::warning-box
- Gözenekli karton kolilerin üzerine tutunma gücü zayıf genel amaçlı ince akrilik etiket yapıştırmak.
- Cam şişelerde rulo şeklinde kıvrılma yapan sert plastik etiketlerde yanlış tutkal cinsi seçmek.
- Çok soğuk depolarda saklanacak gıdalar için soğuk dayanımı (deepfreeze tutkalı) olmayan etiket seçmek.
- Pürüzlü, pürüzsüz veya yağlı yüzeyleri temizlemeden etiketi doğrudan uygulamak.
:::

---

## Mavi Basım Üstün Tutkal Kalibrasyon Çözümleri

:::importance-cards
Akıllı Yüzey Eşleşmesi | Ürününüzün cam, plastik, metal veya mukavva olmasına göre en yüksek yapışma direncini sağlayan doğru tutkal kimyası eşleştirmesi.
Deepfreeze Soğuk Kalkanı | Buzdolabı ve derin dondurucu ortamlarında nem kapıp kendi kendine düşmeyen, -20 dereceye dayanıklı özel gıda etiketleri.
PP Opak Yırtılmaz Yapı | Tutkal gücüyle birleştiğinde esneyen ama asla yırtılmayan, kozmetik şişelerinde kavrama sağlayan mukavemetli plastik filmler.
:::

---

## Etiket Tutkalları Karşılaştırma Tablosu

| Tutkal Türü | Yapışkan Rengi | En Kusursuz Yapıştığı Yüzey | Sökülebilirlik Özelliği | Yapışma Mukavemeti |
| :--- | :--- | :--- | :--- | :--- |
| **Akrilik (Su Bazlı)** | Şeffaf | Cam, PET Şişe, Parlak Plastikler | Sökülemez (İz bırakır) | Yüksek (%90) |
| **Hotmelt (Kauçuk)** | Hafif Sarımsı | Karton Kutu, Koli, Mukavva, Kraft | Kesinlikle Sökülemez (Yırtarak çıkar) | Maksimum (%100) |
| **Nonperm (Leke Bırakmaz)**| Şeffaf | Cam, Kitap Kapağı, Beyaz Eşya | Çok Kolay Sökülür (Sıfır İz) | Hassas-Hafif (%30) |

---

:::cta
TITLE: Doğru Etiket Tutkal Analizi
DESC: Ürün ambalajınızın yapısına (cam, plastik, metal veya karton) en uygun, zamanla asla kalkma ve kabarma yapmayacak yapışkan mukavemetini belirliyoruz. Ücretsiz etiket numunelerimizden istemek için hemen yazın.
BTN_TEXT: WhatsApp Etiket Uzmanı
BTN_LINK: https://wa.me/905321234567
:::`,
    faq: [
      {
        question: 'Şeffaf etiketlerde beyaz renk baskı yapılıyor mu?',
        answer: 'Evet, şeffaf yüzeylerde renklerin görünmesi için altına özel "beyaz zemin astarı" (underwhite metalize) dökülerek canlılık sağlanmaktadır.'
      }
    ]
  },
  {
    slug: 'adisyon-ve-makbuzlarda-otokopili-kagit',
    title: 'Resmi Evraklarda Otokopili (Kendinden Karbonlu) Kağıt Teknolojisi',
    excerpt: 'Adisyon koçanları, tahsilat makbuzları ve teslimat fişlerinde alttaki nüshaya karbon kağıtsız yazıyı pürüzsüz geçiren mikrokapsül sırrı.',
    date: '25 Nisan 2026',
    readTime: '6 Dk Okuma',
    category: 'Makbuz & Muhasebe',
    image: '/images/adisyon/otokopili-adisyon-baski.webp',
    schemaType: 'Article',
    content: `## Resmi Evraklarda Otokopili (Kendinden Karbonlu) Kağıt Teknolojisi

Adisyon defterlerinde, tediye ve tahsilat makbuzlarında, üste yazılan kalemin yazısını alttaki sarı, pembe nüshalara karbon kağıdı koymadan sihirli bir şekilde geçiren kağıda **Otokopili Kağıt** denir. 

Resmi dökümler için [Adisyon ve Makbuz Baskı](/makbuz-ve-formlar) döküm sitemizi gezebilir, yanına kurumsal [Diplomat Zarflar sayfasına](/zarf) ait zarfları sipariş verebilir ve ödeme kayıtları için [Tahsilat Makbuzu sayfasına](/tahsilat-makbuzu) ait koçanları inceleyebilirsiniz.

:::info-cards
NCR Kimyasal Mikrokapsüller
- Otokopili (NCR) kağıtların üst nüshasının arkası renksiz boya içeren mikrokapsüllerle sıvalıdır.
- Alt nüshanın ön yüzü ise bu kapsülleri asitle çözen emici özel kille kaplıdır.
- Kalemle bastırarak yazıldığında kapsüller ezilir, boya kille birleşir ve altta koyu mavi yazı belirir.
- Araya karbon kağıdı koyma zahmetini tamamen ortadan kaldıran pratik saha teknolojisidir.
---
Mikro Perforaj Teknolojisi
- Evrakların koçandan ayrılırken yırtılmasını kesinlikle önleyen mikro tırtıklı perforaj hattı.
- Nüshalar koçandan saniyeler içinde, jilet gibi pürüzsüz ve düzgünce koparılabilir.
- Nüshaların karışmaması için de 1. Nüsha Beyaz, 2. Nüsha Pembe, 3. Nüsha Sarı standartları oturtulmuştur.
---
6 Haneli Seri Numaratör
- Maliye denetimlerinde ve muhasebe takibinde evrakların kaybolma riskini sıfıra indiren numaratör.
- Formların sağ üst köşesine basılan ardışık benzersiz 6 haneli seri numaraları.
- Geriye dönük muhasebe ve sevkiyat evrak arşivleme takibini kusursuz kurgular.
:::

---

## Resmi Evrak ve Makbuz Basımında Yapılan Hatalar

:::warning-box
- Kendinden karbon aktarımı yapmayan kalitesiz fason fotokopi kağıtları kullanmak.
- Resmi takibi imkansız kılan numaratörsüz (seri numarasız) makbuzlar basmak.
- Koçan cildinden koparırken kağıdın yırtılmasına sebep olan zayıf perforaj hattı.
- Üst nüshaya yazarken alt nüshalara yazının geçmesini engelleyen zayıf kapsüllü kağıt seçmek.
:::

---

## Mavi Basım Resmi Form Üretim Güvenceleri

:::importance-cards
Premium NCR Teknolojisi | En narin kalem dokunuşlarında dahi yazıyı alt nüshalara sıfır kayıpla, pürüzsüz ve koyu mavi renkte aktaran ithal NCR otokopili kağıtlar.
Flawless Mikro Perforaj | Koçandan nüshaları ayırırken kağıdı yırtmayan, saniyeler içinde kopmasını sağlayan profesyonel perfore dişlerimiz.
Ardışık Güvenli Numaratör | Geriye dönük denetim ve sevkiyat takiplerinizi hatasız yapmanızı sağlayan ardışık 6 haneli seri numara baskısı.
:::

---

## Otokopili Evrak Formatları Karşılaştırması

| Özellik / Parametre | A4 Otokopili Koçan | A5 Otokopili Koçan | Ciltsiz Tek Sayfa (Karbonsuz) |
| :--- | :--- | :--- | :--- |
| **Kullanım Amacı** | Sözleşmeler, detaylı teslimat formları | Adisyon, tahsilat makbuzları, servis fişleri | Basit bilgi notları, takibi olmayan evraklar |
| **Nüsha Seçenekleri**| 2 Nüsha (Asıl+Suret) veya 3 Nüsha | 2 Nüsha veya 3 Nüsha | Tek Sayfa (Kopyalama Yapılamaz) |
| **Ebat Ölçüsü** | 21.0 x 29.7 cm (Geniş Yazım Alanı) | 14.8 x 21.0 cm (Portatif Çanta Boyu) | Değişken / Standart A4 Fotokopi |
| **Evrak Takibi** | Ardışık 6 Haneli Seri Numaratörlü | Ardışık 6 Haneli Seri Numaratörlü | Numaratörsüz (Takip Edilemez) |
| **Kurumsal Derece** | ★★★★★ | ★★★★★ | ★☆☆☆☆ |

---

:::cta
TITLE: Otokopili Form Siparişi
DESC: Adisyon, tahsilat makbuzu, sevkiyat fişi ve teslimat formlarınızı kurumsal logonuzla, otokopili kendinden karbonlu ve numaratörlü olarak üretiyoruz. Resmi koçan tasarımlarınızı hazırlatmak için hemen yazın.
BTN_TEXT: WhatsApp Makbuz Hattı
BTN_LINK: https://wa.me/905321234567
:::`,
    faq: [
      {
        question: 'Otokopili kağıtlar kaç nüsha yapılabilir?',
        answer: 'İhtiyaca göre 2 nüshadan (Asıl + Suret) başlayıp 4 nüshaya kadar ardışık dökümler sorunsuzca sağlanabilmektedir.'
      }
    ]
  },
  {
    slug: 'ofset-baski-nasil-yapilir',
    title: 'Ofset Baskı Nasıl Yapılır? Teknik Üretim Aşamaları',
    excerpt: 'Ofset baskı teknolojisinin tüm detaylarını, kalıp hazırlamadan mürekkep ayarlarına ve kurutma aşamalarına kadar teknik adımlarıyla keşfedin.',
    date: '15 Temmuz 2026',
    readTime: '6 Dk Okuma',
    category: 'Teknik & Baskı',
    image: '/images/hakkimizda/tecrube-matbaa.webp',
    schemaType: 'Article',
    content: `## Ofset Baskı Teknolojisi Nedir ve Nasıl Çalışır?

Ofset baskı, günümüzde kitap, katalog, broşür, kutu ve ambalaj gibi yüksek tirajlı matbaa işlerinde en yaygın kullanılan profesyonel baskı teknolojisidir. Temeli, "yağ ile suyun birbirine karışmaması" fiziksel ilkesine dayanır. Ofset baskı makinesinde mürekkep doğrudan kağıda temas etmez; önce metal kalıptan kauçuk bir silindire (ofset blanket) aktarılır, oradan da kağıt yüzeyine basılır. Bu dolaylı aktarım yöntemi, hem baskı kalitesini mükemmelleştirir hem de metal kalıbın aşınmasını önler.

### Ofset Baskı Üretim Aşamaları

Mavi Basım Topkapı tesislerimizde ofset üretim süreci 4 temel teknik aşamada gerçekleştirilmektedir:

#### 1. Baskı Öncesi (CtoP - Computer to Plate)
Tasarım dosyalarınız grafik ekibimizce kontrol edildikten sonra lazer kalıp yazma ünitelerimizde alüminyum metal plakalara (kalıplara) aktarılır. CMYK sistemine göre her ana renk (Cyan, Magenta, Yellow, Key/Black) için ayrı bir metal kalıp hazırlanır.

#### 2. Makine Ayarlarının Yapılması (Hazırlık)
Hazırlanan metal kalıplar yüksek hassasiyetli ofset baskı makinelerinin ilgili ünitelerine monte edilir. Mürekkep merdanelerinin hazne ayarları, su-alkol dengesi ve kağıt ebat ayarları (giyotin hizalama) bilgisayarlı konsoldan hassas bir şekilde kalibre edilir.

#### 3. Baskı İşlemi (Üretim)
Kağıt tabakaları yüksek hızda besleme ünitesinden girer. Her üniteden geçerken sırasıyla mavi, kırmızı, sarı ve siyah renkler milimetrik hassasiyetle üst üste basılır (CMYK). Bu süreçte renklerin kaymaması için spektofotometrik ayarlar sürekli izlenir.

#### 4. Baskı Sonrası (Mücellit ve Sonlandırma)
Makinelerden çıkan ıslak baskılı tabakalar kurutulduktan sonra kesim, selefon kaplama, kırım, harmanlama, ciltleme ve paketleme gibi baskı sonrası işlemlere sevk edilir.

:::callout
TITLE: Neden Ofset Baskı Tercih Edilmeli?
Ofset baskı, özellikle yüksek adetli siparişlerde birim maliyetleri inanılmaz derecede düşürür. İlk kalıp hazırlama maliyeti yüksek olsa da, adet arttıkça birim fiyat "en ucuz matbaa" seviyesine gelir. Ayrıca çok geniş kağıt çeşitliliğine, gramajlarına (80gr - 400gr arası) ve Pantone gibi özel kurumsal renklerin birebir basılmasına imkan tanır.
:::`,
    faq: [
      {
        question: 'Ofset baskı için minimum sipariş adedi nedir?',
        answer: 'Ofset baskıda kurulum firesi ve kalıp hazırlığı maliyetli olduğundan, ekonomik fiyatlar elde etmek için minimum 1.000 adet sipariş verilmesi önerilir.'
      },
      {
        question: 'Ofset baskıda hangi mürekkepler kullanılır?',
        answer: 'Mavi Basım olarak gıda ambalajlarında koku yapmayan, sağlığa uygun bitkisel soya bazlı yüksek pigmentli Avrupa mürekkepler kullanmaktayız.'
      }
    ]
  },
  {
    slug: 'ofset-baski-ile-dijital-baski-farklari',
    title: 'Dijital Baskı ile Ofset Baskı Arasındaki Farklar',
    excerpt: 'Düşük ve yüksek tirajlı siparişlerinizde hangi baskı teknolojisini seçmelisiniz? Maliyet, hız ve kalite karşılaştırması.',
    date: '16 Temmuz 2026',
    readTime: '5 Dk Okuma',
    category: 'Teknik & Baskı',
    image: '/images/hakkimizda/tecrube-matbaa.webp',
    schemaType: 'Article',
    content: `## Dijital Baskı ve Ofset Baskı: Hangisini Seçmelisiniz?

Matbaa sektöründe en çok merak edilen konuların başında dijital baskı ile ofset baskı arasındaki teknik farklar gelmektedir. Her iki yöntem de yüksek kaliteli sonuçlar üretse de, çalışma prensipleri, üretim hızları, ideal sipariş adetleri ve maliyet yapıları açısından tamamen farklıdır.

### Temel Farklar ve Karşılaştırma

Aşağıdaki detaylı teknik karşılaştırma tablosu, ihtiyacınıza en uygun baskı türünü seçmenize yardımcı olacaktır:

| Özellik / Parametre | Ofset Baskı | Dijital Baskı |
| :--- | :--- | :--- |
| **Kurulum ve Kalıp** | Metal kalıp (CTP) hazırlanması zorunludur. | Kalıp gerektirmez, doğrudan bilgisayardan basılır. |
| **Ekonomik Tiraj** | 1.000 Adet ve üzeri (Yüksek tirajlarda çok ucuzdur). | 1 - 500 Adet arası (Düşük adetler için çok uygundur). |
| **Üretim Hızı** | Kalıp ve ayar süreci nedeniyle 2-4 iş günü sürer. | Dakikalar içinde basılır, aynı gün teslim edilebilir. |
| **Değişken Veri (Kişiselleştirme)**| Yapılamaz. Her tabaka birbirinin aynıdır. | Kolayca yapılır (İsim, barkod, numara değişebilir). |
| **Kağıt Esnekliği** | Her türlü özel dokulu kağıt, karton, kraft basılabilir. | Makinenin toner tutma yapısına uygun standart kağıtlar. |

### Ofset Baskının Avantajları
* **Mükemmel Renk Hassasiyeti:** Pantone ve metalik yaldız mürekkepleri basılabilir.
* **Büyük Adetlerde En Ucuz Fiyat:** Tiraj yükseldikçe birim maliyet neredeyse sıfıra yaklaşır.
* **Gramaj Çeşitliliği:** Çok ince kağıtlardan kalın kroma ve Amerikan Bristol kartonlara kadar sorunsuz üretim.

### Dijital Baskının Avantajları
* **Hızlı Sipariş Onayı ve Baskı:** Kalıp hazırlama süresi olmadığından "acil baskı" ihtiyaçlarında mükemmel çözüm.
* **Düşük Başlangıç Maliyeti:** 1 adet veya 50 adet gibi küçük siparişlerde kalıp ücreti ödemediğiniz için çok ekonomiktir.
* **Kişiselleştirilmiş İmalat:** Her bir basılı ürüne farklı isim, numara veya barkod basılabilir.`,
    faq: [
      {
        question: 'Az adetli broşür için hangi baskı türü uygundur?',
        answer: 'Eğer 100-200 adet gibi düşük adetli bir broşür istiyorsanız dijital baskı; 1.000 adet ve üzeri yüksek adetlerde ise ofset baskı tercih edilmelidir.'
      },
      {
        question: 'İki baskı arasında kalite farkı anlaşılır mı?',
        answer: 'Modern HP Indigo ve yüksek segment dijital baskı ünitelerimiz sayesinde, ofset ile dijital baskı arasındaki kalite farkı çıplak gözle neredeyse hiç anlaşılmamaktadır.'
      }
    ]
  },
  {
    slug: 'baski-sonrasi-islemler-nelerdir',
    title: 'Baskı Sonrası İşlemler Nelerdir? Mücellit Süreçleri',
    excerpt: 'Baskıdan çıkan kağıtların nihai ürüne dönüşmesini sağlayan kesim, kırım, harmanlama, ciltleme ve koruma süreçlerinin tüm detayları.',
    date: '17 Temmuz 2026',
    readTime: '7 Dk Okuma',
    category: 'Teknik & Baskı',
    image: '/images/hakkimizda/baski-sonrasi-islemler-mucellit-surecleri.webp',
    schemaType: 'Article',
    content: `## Baskı Sonrası İşlemler (Mücellit) Neden Önemlidir?

Bir matbaa ürününün kalitesi sadece basım kalitesiyle ölçülemez. Baskı makinesinden çıkan düz tabakaların kesilmesi, katlanması, ciltlenmesi ve şık detaylarla süslenmesi sürecine **Baskı Sonrası İşlemler** veya **Mücellit Süreçleri** denir. Bu işlemler, basılı materyalin nihai kullanım formuna kavuşmasını, dayanıklılığını ve lüks bir dokunuş kazanmasını sağlar.

Mavi Basım Topkapı tesislerimizde uygulanan en önemli baskı sonrası teknik süreçler şunlardır:

### 1. Giyotin Kesim (Ebatlama)
Baskı makinelerinden çıkan büyük ebatlı tabaka kağıtlar, bilgisayar programlı Polar giyotin kesim makinelerinde milimetrik hassasiyetle kesilerek nihai ürün ölçülerine (A4, A5, Kartvizit ebatı vb.) getirilir.

### 2. Selefon Kaplama
Ürünlerin yırtılmasını, ıslanmasını ve çizilmesini önlemek amacıyla yüzeylerine uygulanan çok ince plastik film tabakasıdır. Mat selefon ve parlak selefon olmak üzere iki çeşidi vardır.

### 3. Kırım (Katlama) ve Harmanlama
Broşür, katalog ve harita gibi ürünlerin özel katlama makinelerinden geçirilerek katlanması işlemidir. Sayfaların ardışık olarak sıraya dizilmesine ise harmanlama denir.

### 4. Ciltleme ve Birleştirme
Çok sayfalı katalog, dergi ve makbuz formlarında uygulanan birleştirme teknikleridir. **Tel dikiş**, **iplik dikiş**, **Amerikan cilt** (sıcak tutkallı) ve **spiral cilt** gibi yöntemler mevcuttur.

### 5. Özel Kesim (Bıçak Kesimi & Giyotin)
Karton çantalar, cepli sunum dosyaları ve kutuların düz hatlar dışındaki kıvrımlı ve pencereli şekillerde kesilmesi için özel çelik bıçaklar hazırlanarak kazanlı kesim makinelerinde hassas kesim yapılır.

### 6. Lak, Gofre ve Varak Yaldız
Ürünlere görsel prestij katmak için uygulanan estetik yüzey işlemleridir. Tasarımın belirli yerlerine parlaklık (Lak), kabartma (Gofre) veya altın-gümüş varak yaldız uygulanarak premium bir algı oluşturulur.`,
    faq: [
      {
        question: 'Baskı sonrası işlemler teslim süresini etkiler mi?',
        answer: 'Evet. Selefon, kırım gibi işlemler 1 gün; özel kesim bıçağı, gofre veya varak yaldız gibi kalıp gerektiren özel işçilikler ise teslim süresine ortalama 1-2 iş günü eklemektedir.'
      },
      {
        question: 'Kutularda hangi ciltleme/birleştirme yöntemi kullanılır?',
        answer: 'Kutu ve lüks ambalaj üretiminde genellikle mukavva sıvama, kenar yapıştırma ve kilitli dip kilitleme mekanizmaları tercih edilir.'
      }
    ]
  },
  {
    slug: 'selefon-nedir',
    title: 'Selefon Nedir? Mat ve Parlak Selefon Farkları',
    excerpt: 'Baskılı ürünlerinizin dayanıklılığını ve estetik görünümünü artıran ince koruyucu selefon tabakasının özellikleri ve kullanım alanları.',
    date: '18 Temmuz 2026',
    readTime: '4 Dk Okuma',
    category: 'Teknik & Baskı',
    image: '/images/hakkimizda/selefon-nedir-mat-parlak-selefon-farklari.webp',
    schemaType: 'Article',
    content: `## Selefon Nedir?

Selefon, matbaa üretiminde basımı tamamlanmış kağıt veya karton yüzeylerin üzerine ısı ve basınç yardımıyla kaplanan çok ince, şeffaf bir plastik film tabakasıdır. Genellikle 170 gr ve üzeri kalınlıktaki kuşe ve karton materyallerde (kartvizit, katalog kapağı, karton çanta, cepli dosya, kutu imalatı) uygulanır.

### Selefonun Temel Fonksiyonları

1. **Yüksek Koruma ve Dayanıklılık:** Kağıdın nemden, sudan, yağdan, kirden ve çizilmelerden etkilenmesini önler. Katlama yerlerinde çatlama ve yırtılmayı engeller.
2. **Estetik ve Dokusal Kalite:** Ürünün tok bir his kazanmasını sağlar, premium marka algısını güçlendirir.
3. **Baskı Kalitesini Koruma:** Mürekkebin zamanla solmasını veya sürtünmeyle dağılmasını %100 önler.

### Mat Selefon ve Parlak Selefon Farkı

* **Mat Selefon:** Işığı yansıtmaz, son derece sade, şık ve ağır bir görünüm sunar. Kurumsal dökümanlar, lüks kataloglar ve prestijli kartvizitler için idealdir. Özellikle üzerine kabartma lak uygulandığında lakın parlamasını belirginleştirerek mükemmel bir kontrast yaratır.
* **Parlak Selefon:** Renkleri çok daha canlı, parlak ve doygun gösterir. Ürün fotoğraflarının ve canlı renk tonlarının ön planda olduğu yemek menüleri, çocuk kitapları, kutular ve dikkat çekici broşürler için mükemmeldir. Dust ve parmak izini mat selefona göre daha az belli eder.`,
    faq: [
      {
        question: 'İnce kağıtlara selefon kaplanır mı?',
        answer: 'Genellikle 115gr ve 135gr gibi ince kuşe kağıtlara ısı ve çekme etkisiyle kağıtta kıvrılma yapabileceği için selefon kaplanması teknik olarak önerilmez; en az 170gr kuşe ve üzeri kartonlarda mükemmel sonuç verir.'
      },
      {
        question: 'Selefon çevreye zararlı mıdır?',
        answer: 'Kullandığımız selefon malzemeleri ultra ince geri dönüştürülebilir polimer yapıda olup, modern ayrıştırma tesislerinde kağıttan kolayca ayrıştırılabilmektedir.'
      }
    ]
  },
  {
    slug: 'lak-nedir',
    title: 'Lak Nedir? Lokal Lak ve Kabartma Lak Uygulamaları',
    excerpt: 'Katalog kapaklarında, kartvizitlerde ve lüks kutularda kullanılan lokal lak ve kabartma lak tekniklerinin detayları ve estetik katkıları.',
    date: '19 Temmuz 2026',
    readTime: '4 Dk Okuma',
    category: 'Teknik & Baskı',
    image: '/images/hakkimizda/lak-nedir-lokal-lak-kabartma-lak-uygulamalari.webp',
    schemaType: 'Article',
    content: `## Lak Nedir ve Neden Kullanılır?

Matbaa sektöründe **Lak** (Varnish/Spot UV), basılı ürünlerin belirli kısımlarını parlatmak, korumak veya dokunsal derinlik kazandırmak amacıyla uygulanan sıvı bazlı şeffaf bir kaplama tekniğidir. Genellikle mat selefon kaplanmış yüzeylerin üzerine lokal (bölgesel) olarak uygulanarak mat zemin üzerinde harika bir parlaklık ve kontrast oluşturur.

Mavi Basım bünyesinde en çok tercih edilen profesyonel lak uygulamaları şunlardır:

### 1. Dispersiyon Lak (Koruyucu Lak)
Baskı işlemi esnasında tüm tabakaya uygulanan, mürekkebin hızla kurumasını ve çizilmesini önleyen ince, koruyucu ve kokusuz bir lak türüdür. Genellikle yüksek tirajlı katalog sayfalarında tercih edilir.

### 2. Lokal Lak (Kısmi Lak / Spot UV)
Tasarımın sadece belirlenen alanlarına (örneğin kurumsal logonuzun, sloganınızın veya bir ürün görselinin üzerine) uygulanan şeffaf parlak tabakadır. Işığa tutulduğunda o alanların parlamasını sağlayarak harika bir görsel odak noktası oluşturur.

### 3. Kabartma Lak (3D Lak)
Lokal lakın daha kalın bir tabaka halinde uygulanarak fırınlanması işlemidir. Bu sayede uygulandığı alanda çıplak gözle görülebilen ve parmakla dokunulduğunda hissedilebilen 3D pürüzsüz bir kabartma dokusu oluşur. Lüks kartvizitlerin ve kozmetik kutularının vazgeçilmezidir.

:::callout
TITLE: Lak Tasarımı Yaparken Nelere Dikkat Edilmeli?
Lak uygulanacak alanların tasarım dosyasında (PDF veya AI formatında) ayrı bir vektörel katmanda (genellikle %100 K / Siyah renkte) ve birebir çakışacak şekilde belirtilmesi gerekir. Grafik departmanımız baskı öncesinde bu teknik ayarları sizin adınıza ücretsiz kontrol etmektedir.
:::`,
    faq: [
      {
        question: 'Kabartma lak her kağıda uygulanır mı?',
        answer: 'Kabartma lakın kağıt tarafından emilip sönmemesi için kağıdın önceden mat selefon ile kaplanmış olması teknik bir zorunluluktur.'
      },
      {
        question: 'Lak ile gofre (kabartma) arasındaki fark nedir?',
        answer: 'Gofre, kağıdı arkadan presleyerek fiziksel olarak kabartırken; kabartma lak, kağıdın üzerine kalın şeffaf kimyasal dökülerek arkada iz bırakmadan üstten kabartma sağlar.'
      }
    ]
  },
  {
    slug: 'varak-baski-nedir',
    title: 'Varak Baskı Nedir? Altın ve Gümüş Yaldız Teknikleri',
    excerpt: 'Sıcak varak yaldız uygulamalarıyla baskı ürünlerine prestij ve lüks katan metalik varak baskı tekniğinin özellikleri.',
    date: '20 Temmuz 2026',
    readTime: '5 Dk Okuma',
    category: 'Teknik & Baskı',
    image: '/images/hakkimizda/varak-baski-nedir-altin-gumus-yaldiz-teknikleri.webp',
    schemaType: 'Article',
    content: `## Varak Baskı (Sıcak Yaldız Baskı) Nedir?

Varak baskı, metalik pigmentli özel folyoların, yüksek sıcaklık ve basınç altında pirinç veya magnezyum klişeler (kalıplar) kullanılarak kağıt veya karton yüzeyine transfer edilmesi işlemidir. En popüler renkleri **altın (gold)** ve **gümüş (silver)** yaldız olmakla birlikte; bakır, bronz, hologram, kırmızı ve mavi gibi geniş bir metalik renk yelpazesi mevcuttur.

Lüks ambalaj kutularında, davetiyelerde, kitap kapaklarında ve premium kartvizitlerde markaya yüksek prestij katmak için tercih edilir.

### Sıcak Varak Baskı Nasıl Yapılır?

Mavi Basım Topkapı mücellithanemizde sıcak varak yaldız süreci şu teknik adımlarla yürütülür:

1. **Klişe Hazırlığı:** Tasarımda yaldız basılacak olan alanların çinko, magnezyum veya pirinç levhalar üzerine asitle indirilerek metal klişesi (mührü) üretilir.
2. **Kalıbın Isıtılması:** Hazırlanan metal klişe, varak yaldız baskı makinesinin ısı rezistanslı tablasına monte edilir ve ortalama 100°C - 150°C sıcaklığa kadar ısıtılır.
3. **Folyo Transferi:** Isıtılmış klişe ile kağıt arasından ince rulo halindeki varak yaldız folyosu geçer. Makine yüksek basınçla pres yaptığında folyo üzerindeki metalik katman eriyerek kağıt liflerine kalıcı olarak yapışır.
4. **Soğuma ve Kontrol:** Pres sonrasında yaldız anında sabitlenir. Mücellit ustalarımız tarafından yaldızın kenarlarında taşma veya dökülme olmaması için son kontrol yapılır.

### Varak Baskının Markanıza Sağladığı Değerler
* **Yüksek Görsel Dikkat:** Metalik parlaklığı sayesinde ışığı mükemmel yansıtır ve ürünün rafta veya masada anında fark edilmesini sağlar.
* **Lüks ve Seçkinlik Algısı:** Müşterilerde birinci sınıf, kaliteli ve değerli bir ürün/hizmet intibası uyandırır.
* **Kalıcılık:** Sıcak presleme yöntemiyle yapıldığı için yaldızlar zamanla soyulmaz veya dökülmez.`,
    faq: [
      {
        question: 'Varak yaldız baskı maliyetli midir?',
        answer: 'Her tasarım için ayrı metal klişe (kalıp) imal edildiğinden, düşük adetli işlerde klişe ücreti nedeniyle maliyetli görünebilir; ancak yüksek tirajlı imalatlarda birim maliyet son derece düşüktür.'
      },
      {
        question: 'Gümüş yaldız ile yaldızlı ofset mürekkep arasındaki fark nedir?',
        answer: 'Ofset yaldız mürekkebi mat bir metalik renk sunarken; sıcak varak yaldız gerçek ayna parlaklığında, ışıl ışıl bir metalik yüzey oluşturur.'
      }
    ]
  },
  {
    slug: 'fast-food-ve-restoran-ambalaj-kutulari-secim-rehberi',
    title: 'Fast Food ve Restoran Ambalaj Kutuları Seçim Rehberi: Hamburger, Dürüm, Pizza ve Cips Kutusu',
    excerpt: 'Restoran ve paket servis işletmeleri için gıda uyumlu Amerikan Bristol kartondan hamburger, dürüm, cips, noodle ve salata kutusu imalat rehberi.',
    date: '29 Mayıs 2026',
    readTime: '7 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/kutu/butik-baklava-cikolata-kutusu.webp',
    schemaType: 'Article',
    content: `## Paket Servis ve Fast Food Kutularında Doğru Karton Seçimi

Paket servis yapan restoranlar, burger salonları, dönerciler ve fırınlar için ambalaj kutusu sadece bir taşıyıcı değil, sıcacık lezzeti koruyan kritik bir araçtır. [Özel Kutu Baskı](/kutu) tesislerimizde ürettiğimiz gıda ambalaj kutuları yüksek gıda hijyeni tüzüğüne uygundur.

### Fast Food Kutularında Aranması Gereken Özellikler:
* **Gıda Uyumlu Selüloz Karton:** Geri dönüştürülmüş atık kağıt içermeyen, koku yapmayan 250 gr - 300 gr Amerikan Bristol Karton.
* **Buhar Tahliye Delikleri:** Hamburger ve cips kutularında buharın tahliye edilerek patates ve ekmeğin hamurlaşmasını önleyen özel havalandırma kesimleri.
* **Yağ Dayanımlı İç Kaplama:** Soslu, burgerli veya yağlı gıdalarda dışarıya yağ sızmasını engelleyen gıda selefonu veya yağ bariyeri.
* **Pratik Otomatik Kilit Dip:** Mutfak personelinin saniyeler içinde kolayca kurup doldurmasını sağlayan pratik kilit sistemi.

### En Çok Tercih Edilen Restoran Kutuları:
1. **Hamburger & Cheeseburger Kutusu:** Kilitli kapak yapısı ile taşımada açılmayan, ısıyı muhafaza eden kutular.
2. **Dürüm, Zurna Dürüm & Wrap Kutusu:** Çek-aç perforeli veya kulaklı kapanışlı, dökülmeden pratik yemeyi sağlayan ambalajlar.
3. **Cips, Nugget & Popcorn Kutusu:** Ağzı açık veya geçmeli, şık restoran logolu sunum kutuları.
4. **Noodle & Salata Kutusu:** Sıvı ve sos sızdırmazlığı artırılmış özel köşeli kutular.`,
    faqList: [
      {
        question: 'Fast food kutularında minimum baskı adedi kaçtır?',
        answer: 'Restoran ve paket servis kutusu imalatında minimum ekonomik baskı adedimiz 1.000 adettir.'
      }
    ]
  },
  {
    slug: 'pencereli-asetatli-kutu-uretim-teknikleri',
    title: 'Pencereli Asetatlı Kutu Üretim Teknikleri: Kurabiye, Sabun ve Hediyelik Kutusu',
    excerpt: 'İçindeki ürünü sergileyen şeffaf PVC ve Asetat pencereli karton kutuların üretim aşamaları, pencereli kilit sistemleri ve avantajları.',
    date: '30 Mayıs 2026',
    readTime: '6 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/kutu/hediyelik-kutu-ornegi.webp',
    schemaType: 'Article',
    content: `## Pencereli Kutular Neden Çok Tercih Edilir?

Pencereli karton kutular, tüketicinin kutuyu açmadan içerisindeki renkli kurabiyeleri, butik sabunları, takıları veya hediyelik eşyaları görmesini sağlar. Görsel şeffaflık satın alma güvenini %40 oranında artırır.

### Pencereli Asetat Yapıştırma Teknikleri:
* **Özel Bıçak Kesimi:** Kutunun ön kapağına veya yan duvarlarına istenilen geometrik formda (kalp, oval, kare veya marka logosu şeklinde) pencere deliği açılır.
* **Şeffaf Asetat / PVC Film:** 100 – 150 mikron kalınlığında kristal berraklığında şeffaf asetat filmi özel sıcak tutkal ünitelerinde kartonun iç yüzeyine yapıştırılır.
* **Gıda ve Hijyen Güvenliği:** Toz, kir ve el temasını tamamen engellerken ürünün taze görünümünü sergiler.`,
    faqList: [
      {
        question: 'Pencere şekli özel olarak tasarlanabilir mi?',
        answer: 'Evet, logonuzun biçiminde veya istediğiniz özel kesim formunda pencere deliği açılabilmektedir.'
      }
    ]
  },
  {
    slug: 'e-ticaret-ve-kargo-gonderi-kutusu-tasarimi',
    title: 'E-Ticaret ve Kargo Gönderi Kutusu Tasarımı: Dayanıklı ve Şık Unboxing',
    excerpt: 'E-ticaret markalarının müşterilerine unutulmaz bir kutu açma tecrübesi yaşatmasını sağlayan sağlam kargo gönderi ve hediye kutuları.',
    date: '31 Mayıs 2026',
    readTime: '7 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/sektor/e-ticaret-perakende/e-ticaret-urun-kutusu-kargo-paketleme.webp',
    schemaType: 'Article',
    content: `## E-Ticarette Kutu Açma (Unboxing) Deneyiminin Gücü

Günümüz e-ticaret dünyasında sipariş paketi, markanızın müşteriyle fiziksel olarak temas ettiği ilk noktadır.

* **350 gr - 400 gr Amerikan Bristol / Kroma Karton:** Kargo poşetinde ezilmeyen son derece rijit ve sağlam karton gövde.
* **Çift Taraf Baskı İmkanı:** Dış yüzeyde şık ve sade marka logosu, kapak içi açıldığında ise müşteriyi karşılayan "Senin İçin Hazırlandı" samimi mesaj alanı.
* **Ters Kilit veya Kulaklı Kapak Emniyeti:** Kargo kuryelerinin taşıması esnasında kendiliğinden açılmayan özel kilit mekanizması.`,
    faqList: [
      {
        question: 'E-ticaret kutularında iç baskı yapılıyor mu?',
        answer: 'Evet, özel projelerinizde kutunun iç yüzeyine tek renk veya CMYK özel iç baskı yapılabilmektedir.'
      }
    ]
  },
  {
    slug: 'luks-parfum-ve-taki-kutularinda-sicak-varak-yaldiz-ve-gofre',
    title: 'Lüks Parfüm, Kozmetik ve Takı Kutularında Sıcak Varak Yaldiz ve Gofre',
    excerpt: 'Altın yaldız, gümüş yaldız, 3D gofre kabartma ve Soft Touch kadife selefon birleşimiyle premium lüks kutu imalatı.',
    date: '01 Haziran 2026',
    readTime: '8 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/hakkimizda/varak-baski-nedir-altin-gumus-yaldiz-teknikleri.webp',
    schemaType: 'Article',
    content: `## Lüks Ambalajda İşçilik ve Prestij Sanatı

Yüksek fiyat segmentindeki parfümler, takılar, pırlantalar ve kozmetik serumlar lüks ambalajı hak eder. Mavi Basım mücellithanemizde uygulanan kombinasyonlar:

* **Soft Touch Kadife Selefon:** Parmak uçlarında kadifemsi lüks doku hissettirir.
* **Sıcak Altın / Gümüş Varak Yaldız:** 140°C sıcak presle logonuzu ışıl ışıl metalik yaldıza dönüştürür.
* **3D Gofre (Kabartma):** Pirinç dişi-erkek klişelerle logonun kartondan dışarıya 3 boyutlu çıkmasını sağlar.
* **Kısmi Lokal UV Lak:** Yaldız ve kabartma ile birleştiğinde büyüleyici bir derinlik efekti yaratır.`,
    faqList: [
      {
        question: 'Gofre kabartma ile yaldız aynı anda basılabilir mi?',
        answer: 'Evet. Önce sıcak varak yaldız basılır, ardından ikinci pasajda aynı noktaya gofre presi yapılarak yaldızlı kabartma elde edilir.'
      }
    ]
  },
  {
    slug: 'otomatik-kilit-dip-ve-ters-kilit-dip-kutu-farklari',
    title: 'Otomatik Kilit Dip (Oto Kilit) ile Ters Kilit Dip Kutu Farkları',
    excerpt: 'Kutu alt kapanış mekanizmalarından oto kilit, kilitli dip, düz dip ve ters kilit dip modellerinin dayanıklılık ve dolum hızı karşılaştırması.',
    date: '02 Haziran 2026',
    readTime: '6 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/kutu/ozel-kesim-kutu-tasarimi.webp',
    schemaType: 'Article',
    content: `## Kutu Alt Kapanış Mekanizmaları Karşılaştırması

Ürününüzün ağırlığına ve paketleme hattınızın hızına göre doğru alt kapanış mekanizmasını seçmek üretkenliğinizi doğrudan etkiler.

### 1. Oto Kilit Dip (Otomatik Kilitli Dip):
- **Nasıl Çalışır?** Fabrikasyon aşamasında alt kulakçıkları birbirine yapıştırılmıştır. Kutu iki yanından bastırıldığında alt taban otomatik olarak kurularak kilitlenir.
- **Avantajı:** Dolum sürecini hızlandırmaya yardımcı olur. Güçlü yük taşıma mukavemetine sahiptir.

### 2. Kilitli Dip (Geçmeli Kilitli Dip):
- **Nasıl Çalışır?** Altındaki 4 kulakçık paketleme esnasında personel tarafından sırayla birbirine kilitlenir.
- **Avantajı:** Ekstra yapıştırma maliyeti olmadığı için birim fiyatı biraz daha uygundur.

### 3. Ters Kilit Dip:
- **Nasıl Çalışır?** Üst kapak ile alt kapağın kulakçıkları birbirine zıt yönlere bakar. Ağır cam ve ilaç kutularında alt kapağın ağırlıkla açılmasını engeller.`,
    faqList: [
      {
        question: 'Ağır cam kavanozlar için hangi dip yapısı önerilir?',
        answer: 'Ağır cam veya sıvı ürünlerde tabanın açılmaması için kesinlikle Oto Kilit Dip veya Ters Kilit Dip tercih edilmelidir.'
      }
    ]
  },
  {
    slug: 'istanbul-topkapi-karton-kutu-ureticisi-toptan-imalat',
    title: 'İstanbul Topkapı Karton Kutu Üreticisi ile Toptan Ambalaj İmalat Avantajları',
    excerpt: 'Topkapı matbaa ve ambalaj sanayinde imalatçıdan direk kutu bastırmanın sunduğu fiyat, kalite ve hızlı teslimat avantajları.',
    date: '03 Haziran 2026',
    readTime: '7 Dk Okuma',
    category: 'Kutu & Ambalaj',
    image: '/images/kutu/urun-kutusu-baski.webp',
    schemaType: 'Article',
    content: `## Kaliteli Karton Kutu Siparişi Verirken Dikkat Edilmesi Gerekenler

Karton kutu ambalajları, ürünlerin güvenle taşınmasını sağlarken kurumsal imajınızı destekler. **Mavi Basım Matbaa & Reklam** olarak uygun fiyatlarla kaliteli karton kutu çözümleri sunmaktayız.

### Profesyonel Kutu Siparişinin Avantajları:
* **Uygun Fiyat Dengesi:** Şeffaf fiyat politikası ve kaliteli baskı materyalleri.
* **Vektörel Bıçak İzi Desteği:** Tasarımlarınız için milimetrik bıçak şablonları.
* **Dijital Maket Numune:** Onay öncesinde kutunun tasarımını kontrol etme olanağı.
* **81 İle Hızlı Kargo:** Güvenli paketleme ile zamanında teslimat.`,
    faqList: [
      {
        question: 'Kutu siparişleri nasıl teslim edilir?',
        answer: 'Özenle paketlenen ambalaj kutuları Türkiye’nin 81 iline kargo ile sevk edilmektedir.'
      }
    ]
  }
,
  {
    slug: '115-gr-mi-135-gr-mi',
    title: '115 gr Kuşe mi 135 gr Kuşe mi? Broşür ve El İlanı Kağıt Seçim Rehberi',
    excerpt: 'Broşür ve el ilanı baskılarında 115 gr ile 135 gr kuşe kağıt arasındaki farklar, maliyet avantajları, gramaj hissiyatı ve dağıtım tavsiyeleri.',
    date: '04 Haziran 2026',
    readTime: '6 Dk Okuma',
    category: 'Broşür & Reklam',
    image: '/images/brosur/katlamali-brosur-baski.webp',
    schemaType: 'Article',
    content: `## 115 gr ile 135 gr Kuşe Kağıt Arasındaki Temel Farklar

Broşür ve el ilanı siparişlerinde en sık karşılaşılan ikilem: **"115 gr kuşe mi yoksa 135 gr kuşe mi seçmeliyim?"** Her iki kağıt da matbaacılıkta en yaygın kullanılan hafif ve orta gramaj kuşe türleridir; ancak kullanım amacı, dağıtım şekli ve bütçeye göre doğru seçim yapmak maliyet ve geri dönüşü doğrudan etkiler.

---

### 1. Gramaj ve Doku Farkı

* **115 gr Kuşe Kağıt:** İnce ve esnek yapılıdır. Standart A4 veya A5 ebatlarında katlandığında veya açıldığında hafiflik hissi verir. Çok yüksek tirajlı (10.000, 20.000 veya 50.000 adet) sokak dağıtımları ve posta kutusu eklemeleri için optimize edilmiştir.
* **135 gr Kuşe Kağıt:** Türkiye matbaacılık sektöründe **altın standart** olarak kabul edilen broşür kağıdıdır. Ele alındığında tok bir duruş sergiler, arkasını gösterme (opaklık) oranı 115 gr'a göre daha yüksektir ve renk doygunluğu mükemmel görünür.

---

### 2. Koli Ağırlığı ve Dağıtım Lojistiği

Toplu dağıtımlarda kağıt gramajı, kargo ve dağıtımcı personel lojistiğinde önemli bir fark yaratır:

| Kriter | 115 gr Kuşe | 135 gr Kuşe |
| :--- | :--- | :--- |
| **Eldeki Tokluk Hissi** | Hafif ve esnek | Dengeli ve kaliteli |
| **Arka Yüz Geçirgenliği** | Çok düşük (Normal) | Neredeyse sıfır (Mükemmel) |
| **10.000 Adet A5 Ağırlığı** | ~35.9 kg | ~42.2 kg |
| **Tavsiye Edilen Kullanım** | Sokak, araç sileceği, toplu kurye | Mağaza içi, fuar, masaüstü, paket içi |
| **Birim Maliyet Oranı** | En ekonomik (%10-15 daha uygun) | Standart optimum fiyat/performans |

---

### 3. Hangisini Seçmelisiniz?

:::callout
- **115 gr Kuşe Tercih Edin Eğer:** Hedefiniz sokakta geniş kitlelere broşür dağıtmak, kapı kapı kurye ile bülten ulaştırmak veya en düşük birim maliyetle maksimum adet basmaksa.
- **135 gr Kuşe Tercih Edin Eğer:** Mağazanıza gelen müşterilerin eline vereceğiniz, fuar standında dağıtacağınız veya ürün kataloğunuzu özetleyen tok ve kaliteli bir tanıtım föyü istiyorsanız.
:::

[Broşür Baskı](/brosur) ve [El İlanı](/el-ilani) sayfalarımızdan online siparişinizi oluşturabilir veya Topkapı matbaa merkezimizden hızlı teslimat avantajlarından yararlanabilirsiniz.`,
    faqList: [
          {
                "question": "115 gr kuşe kağıt arkasındaki yazıyı gösterir mi?",
                "answer": "Hayır, kaliteli 115 gr parlak veya mat kuşe kağıtlarda arka yüz opaklığı %90 üzerindedir ve çift taraflı renkli baskılarda metinler birbirine karışmaz."
          },
          {
                "question": "Kırım ve katlama için 115 gr mı 135 gr mı daha uygundur?",
                "answer": "Her iki gramaj da katlamalı (Z kırım, broşür kırımı) baskılar için uygundur. 135 gr katlandığında daha tok ve düzgün dururken, 115 gr daha ince katlama çizgisi sunar."
          }
    ]
  },
  {
    slug: '135-gr-ve-170-gr-kuse-farklari',
    title: '135 gr ile 170 gr Kuşe Arasındaki Farklar: Hangi Gramaj Nerede Kullanılır?',
    excerpt: 'Broşür, katalog ve kurumsal tanıtım materyallerinde 135 gr standart kuşe ile 170 gr tok kuşe kağıt arasındaki doku, katlama ve prestij karşılaştırması.',
    date: '05 Haziran 2026',
    readTime: '6 Dk Okuma',
    category: 'Broşür & Reklam',
    image: '/images/brosur/brosur-tasarimi-ve-baski.webp',
    schemaType: 'Article',
    content: `## 135 gr ve 170 gr Kuşe Kağıt Karşılaştırması

Kurumsal tanıtım föyleri, menüler, katlamalı broşürler ve firma sunumlarında kağıdın kalınlığı markanızın algısını doğrudan belirler. **135 gr standart kuşe** ile **170 gr kalın kuşe** arasındaki farkları bu rehberde inceledik.

---

### 1. Dokunsal Kalite ve Mukavemet

* **135 gr Kuşe:** Standart broşür gramajıdır. Kolay katlanır, cebe veya çantaya koyulabilir ve yüksek adetli tanıtımlarda maliyet avantajı sağlar.
* **170 gr Kuşe:** Ağır ve lüks kuşe sınıfındadır. Masada dik durabilen, sayfaları çevrildiğinde tok bir ses çıkaran ve karton hissine yaklaşan özel bir malzemedir. Gayrimenkul projeleri, özel klinikler, mimarlık ofisleri ve premium restoranlar tarafından tercih edilir.

---

### 2. Kırım (Pilyaj) Gereksinimi

170 gr ve üzeri kağıtlarda katlama yapılırken kağıdın çatlamaması ve kırılma çizgisinin pürüzsüz olması için matbaada **pilyaj (kırım izi)** çekilmesi gerekir:

* **135 gr:** Direkt makinede katlanabilir (Z kırım, akordeon, içe katlama).
* **170 gr:** Katlama öncesi pilyaj çekilerek çatlamasız kusursuz lüks katlama sağlanır.

---

### 3. Karşılaştırma Özeti

| Özellik | 135 gr Kuşe | 170 gr Kuşe |
| :--- | :--- | :--- |
| **Kategori** | Standart Tanıtım Kuşesi | Prestij ve Lansman Kuşesi |
| **Masaüstü Duruşu** | Esnek | Dik ve tok |
| **Selefon Uyumu** | Mat veya parlak kaplanabilir | Mat/parlak selefonla lüks sonuç verir |
| **Kullanım Alanları** | Kampanya broşürleri, el ilanları | Menü, lüks lansman föyü, sertifika, davetiye içi |

İhtiyacınıza en uygun kağıt ve baskı seçenekleri için [Broşür Fiyatları](/brosur) sayfamızı ziyaret edebilirsiniz.`,
    faqList: [
          {
                "question": "170 gr kuşe kağıda selefon kaplanır mı?",
                "answer": "Evet. 170 gr kuşe üzerine uygulanan mat veya parlak selefon kaplama, broşürün yırtılmasını ve ıslanmasını önlerken lüks bir his katar."
          },
          {
                "question": "Restoran menüsü için 135 gr mı 170 gr mı tercih edilmeli?",
                "answer": "Masa üstünde duracak veya müşterilere sunulacak tek sayfa/katlamalı menülerde kesinlikle 170 gr kuşe (tercihen mat selefonlu) önerilir."
          }
    ]
  },
  {
    slug: 'kartvizit-tasarlar-iken-yapilan-hatalar',
    title: 'Kartvizit Tasarlarken Yapılan En Sık 7 Hata ve Çözüm Yolları',
    excerpt: 'Baskı öncesinde yapılan çözünürlük, RGB renk modu, taşma payı ve font convert hatalarını önleyerek kusursuz kurumsal kartvizit hazırlama rehberi.',
    date: '06 Haziran 2026',
    readTime: '7 Dk Okuma',
    category: 'Kartvizit & Prestij',
    image: '/images/kartvizit/kartvizit-tasarimi.webp',
    schemaType: 'Article',
    content: `## Kartvizit Tasarımında Sık Yapılan Hatalar ve Matbaa Çözümleri

Kartvizit, iş dünyasında ilk intibayı oluşturan en kritik kurumsal materyaldir. Ancak ekranda harika görünen bir tasarım, baskı kurallarına dikkat edilmediğinde bulanık, kesilmiş veya yanlış renklerle sonuçlanabilir.

---

### 1. RGB Renk Modunda Çalışmak (En Yaygın Hata)

* **Hata:** Tasarımı Photoshop veya Illustrator'da RGB modunda hazırlamak.
* **Sonuç:** Ekranda parlayan canlı maviler veya yeşiller, matbaa baskısında (CMYK) soluk ve mat çıkar.
* **Çözüm:** Tasarıma başlarken renk modunu mutlaka **CMYK (Cyan, Magenta, Yellow, Key/Black)** olarak seçin.

---

### 2. Taşma Payı (Bleed) Bırakmamak

* **Hata:** Tasarımı tam kesim ölçüsü olan 84x52 mm ebadında sıfıra sıfır hazırlamak.
* **Sonuç:** Giyotin bıçağı 1 mm kaydığında kartvizitin kenarlarında çirkin beyaz kenar çizgileri kalır.
* **Çözüm:** Tasarım alanını her kenardan +2 mm taşırarak **88x56 mm** olarak çalışın ve arka plan rengini bu alana yayın.

---

### 3. Yazıları Kesim Çizgisine Çok Yakın Bırakmak (Güvenli Alan)

* **Hata:** Telefon numaralarını veya logoyu kenara 1-2 mm mesafede konumlandırmak.
* **Sonuç:** Kesim sırasında yazıların bir kısmı giyotin altında kalıp kesilebilir.
* **Çözüm:** Tüm metin ve logoları kesim çizgisinden en az **4-5 mm içeride** (Güvenli Alan) tutun.

---

### 4. Fontları Convert (Outline) Etmemek

* **Hata:** Tasarım dosyasını fontları convert etmeden göndermek.
* **Sonuç:** Matbaa bilgisayarında font yüklü değilse Arial veya Times gibi varsayılan yazı tipine dönüşür.
* **Çözüm:** Göndermeden önce tüm metinleri seçip \`Ctrl+Shift+O\` (Create Outlines / Eğrilere Dönüştür) yapın.

---

### 5. Küçük Punto ve Düşük Kontrast

* **Hata:** Koyu gri zemin üzerine açık gri veya 5 pt gibi çok küçük yazılar kullanmak.
* **Sonuç:** Mat selefon altında yazıların okunması zorlaşır.
* **Çözüm:** Gövde metinlerinde minimum 7-8 pt, unvan ve isimlerde 9-11 pt kullanın ve yüksek kontrast sağlayın.

---

### 6. Düşük Çözünürlüklü Raster Görseller (72 DPI)

* **Hata:** Web sitelerinden kopyalanan 72 DPI logoları kartvizite yerleştirmek.
* **Sonuç:** Baskıda pikselli, tırtıklı ve bulanık logo görünümü.
* **Çözüm:** Vektörel logolar (AI, EPS, SVG, PDF) veya minimum **300 DPI** yüksek çözünürlüklü görseller kullanın.

---

### 7. 4 Renk Siyah (Rich Black) ile Küçük Yazı Yazmak

* **Hata:** Küçük 7 pt yazılarda C:75 M:68 Y:67 K:90 gibi karışık siyah kullanmak.
* **Sonuç:** Baskıda harflerin kenarında hafif renk kayması (hause) oluşur.
* **Çözüm:** Küçük metinlerde sadece **K:100 (Tek Renk Siyah)** kullanın.

Kusursuz kurumsal kartvizitler için [Kartvizit Baskı](/kartvizit) sayfamızı inceleyebilirsiniz.`,
    faqList: [
          {
                "question": "Kartvizit için ideal dosya formatı nedir?",
                "answer": "En ideal format, fontları convert edilmiş ve CMYK modunda kaydedilmiş vektörel PDF (PDF/X-1a) formatıdır."
          },
          {
                "question": "Standart kartvizit ölçüleri nedir?",
                "answer": "Türkiye standart kartvizit ebadı 84x52 mm olup, taşma payı ile birlikte çalışma alanı 88x56 mm olmalıdır."
          }
    ]
  },
  {
    slug: 'magnet-baski-olculeri-ve-tasarim-rehberi',
    title: 'Buzdolabı Magneti Ölçüleri, Bıçak Çizgileri ve Tasarım Rehberi',
    excerpt: '48x68 mm standart ölçü, oval kesim ve özel figürlü mıknatıslı magnetlerde taşma payı, mıknatıs mikron kalınlığı ve okunabilirlik kuralları.',
    date: '07 Haziran 2026',
    readTime: '6 Dk Okuma',
    category: 'Masaüstü & Promosyon',
    image: '/images/magnet/magnet-baski-tasarimi.webp',
    schemaType: 'Article',
    content: `## Buzdolabı Magneti Baskı Ölçüleri ve Tasarım İpuçları

Buzdolabı magnetleri, müşterilerin evlerinde ve ofislerinde yıllarca göz önünde kalan en etkili promosyon araçlarındandır. Doğru ebat, güçlü mıknatıs kalınlığı ve kusursuz bıçak kesimi ile siparişlerinizi katlayabilirsiniz.

---

### 1. Popüler Magnet Ölçüleri

* **48x68 mm (Klasik Dikdörtgen / Oval):** En popüler standart boyuttur. Su bayileri, tüpçüler, restoranlar ve çilingirler için optimum fiyat/performans sağlar.
* **68x98 mm (Büyük Boy Magnet):** Üzerine menü özeti, çalışma saatleri veya geniş hizmet listesi basmak isteyen işletmeler için idealdir.
* **Özel Figürlü / Bıçak Kesimli Magnet:** Pide, su damlası, pizza dilimi veya şirket logonuzun konturuna göre kesilen dikkat çekici özel şekillerdir.

---

### 2. Mıknatıs Mikron Kalınlığı ve Dayanıklılık

* **0.40 mm Mıknatıs:** Standart buzdolabı magnetleri için ideal esneklik ve yapışma kuvveti sağlar.
* **0.50 mm Mıknatıs:** Daha ağır ve sert tutuş arayan kurumsal promosyonlar için önerilir.
* **Selefon Kaplama:** Mavi Basım magnetlerinde baskı yüzeyi parlak selefon ile kaplanır; bu sayede mutfaktaki buhar, yağ ve neme karşı silinebilir ve solmaz özellik kazanır.

---

### 3. Magnet Tasarımında Dikkat Edilecek Kurallar

1. **Büyük ve Net Telefon / WhatsApp:** Magnetin ana amacı hızlı sipariş almaktır. Telefon numarası en az 2 metreden okunacak büyüklükte olmalıdır.
2. **Karekod (QR Menü) Entegrasyonu:** Müşterinin telefon kamerasıyla anında online menüye veya sipariş sayfasına ulaşmasını sağlar.
3. **Oval Köşe Emniyeti:** Oval kesimlerde köşeler yuvarlatıldığı için köşe uçlarına logo veya yazı yerleştirmeyiniz.

Detaylı fiyat ve model seçenekleri için [Magnet Baskı](/magnet) sayfamızı ziyaret edin.`,
    faqList: [
          {
                "question": "Magnet buzdolabından kayar mı?",
                "answer": "Hayır, kaliteli 0.40mm ve 0.50mm tabaka mıknatıslarımız buzdolabı metal yüzeyine sıkıca tutunur ve kayma yapmaz."
          },
          {
                "question": "Özel şekilli (figürlü) magnet yaptırabilir miyim?",
                "answer": "Evet, logonuzun veya ürününüzün şekline uygun özel kesim bıçağı hazırlayarak dilediğiniz formda magnet üretiyoruz."
          }
    ]
  },
  {
    slug: 'restoran-ve-paket-servis-icin-magnet-baski-onemi',
    title: 'Paket Servis ve Restoranlarda Magnet Baskının Önemi ve Satış Etkisi',
    excerpt: 'Restoran, kafe, su ve paket servis işletmelerinin buzdolabında yer alarak tekrarlayan müşteri siparişlerini ve ciroyu artırma yöntemleri.',
    date: '08 Haziran 2026',
    readTime: '6 Dk Okuma',
    category: 'Masaüstü & Promosyon',
    image: '/images/magnet/oval-kesim-magnet.webp',
    schemaType: 'Article',
    content: `## Restoran ve Paket Servis İşletmelerinde Magnetin Gücü

Yemeksepeti, Getir ve Trendyol gibi platformların yüksek komisyon oranlarına karşı restoranların en güçlü silahı **doğrudan telefon ve WhatsApp siparişleridir**. Müşterinin buzdolabına yapışan bir magnet, komisyonsuz siparişlerin anahtarıdır.

---

### 1. Neden Buzdolabı Magneti?

* **7/24 Görünürlük:** Buzdolabı kapağı günde ortalama 20-30 kez açılır. Markanız müşterinin bilinçaltına sürekli yerleşir.
* **Sıfır Komisyon:** Magnet üzerinden gelen telefon veya WhatsApp siparişlerinde aracı platformlara %30-40 komisyon ödemezsiniz.
* **Uzun Ömürlülük:** Broşürler birkaç gün içinde çöpe atılabilirken, kaliteli bir magnet buzdolabında 2-3 yıl boyunca asılı kalır.

---

### 2. Paket Servis Çantasına Magnet Ekleme Stratejisi

Her paket servis siparişinin içerisine:
1. Sipariş fişi veya faturası,
2. Bir adet şık oval kesim magnet,
3. Menüyü tanıtan bir adet [Broşür](/brosur) ekleyerek müşterinizi bir sonraki siparişte doğrudan aramaya teşvik edin.

---

### 3. Satış Artıran Magnet Tüyoları

* **Özel İndirim Kodu:** "Magnetten Arayanlara %10 İndirim" veya "Tatlı İkramı" gibi özel çağrılar ekleyin.
* **Okunabilir QR Kod:** Menüye giden hızlı karekod yerleştirin.
* **Yüksek Kaliteli Parlak Selefon:** Mutfak buharından etkilenmeyen silinebilir parlak selefon kaplama tercih edin.

Hemen sipariş vermek için [Magnet Fiyatları](/magnet) sayfamızı inceleyebilirsiniz.`,
    faqList: [
          {
                "question": "Magnet dağıtımı ne kadar sürede geri dönüş sağlar?",
                "answer": "Paket servis müşterilerine ulaştırılan magnetler, ilk 2 hafta içinde doğrudan sipariş olarak geri dönüş sağlamaya başlar."
          },
          {
                "question": "En çok sipariş alan restoran magneti ebadı hangisidir?",
                "answer": "48x68 mm oval kesim magnet, pratikliği ve ekonomik fiyatı sebebiyle paket servis sektörünün 1 numaralı tercihidir."
          }
    ]
  },
  {
    slug: 'cmyk-ofset-baski-ve-tasima-payi-rehberi',
    title: 'Matbaa Baskı Öncesi Dosya Hazırlama: CMYK Renk, 300 DPI ve Taşma Payı Rehberi',
    excerpt: 'Grafik tasarımcılar ve işletmeler için CMYK renk ayrımı, 300 DPI çözünürlük, en az 3 mm taşma payı (bleed) ve güvenli alan teknik rehberi.',
    date: '09 Haziran 2026',
    readTime: '8 Dk Okuma',
    category: 'Tasarım & Hazırlık',
    image: '/images/hakkimizda/baskiya-uygun-tasarim-hazirlama-rehberi.webp',
    schemaType: 'HowTo',
    content: `## Matbaaya Baskı Dosyası Nasıl Hazırlanır? Eksiksiz Teknik Kılavuz

Baskı öncesi hazırlık (Prepress), tasarımın matbaada sıfır hatayla basılmasını sağlayan en kritik aşamadır. Tasarımınızı matbaaya göndermeden önce aşağıdaki 5 altın kuralı mutlaka uygulayın.

---

### 1. CMYK Renk Uzayı Kuralı

* **Ekran (RGB):** Işık tabanlıdır (Kırmızı, Yeşil, Mavi).
* **Baskı (CMYK):** Mürekkep tabanlıdır (Cyan, Magenta, Yellow, Key/Siyah).
* **Kural:** Tasarım dosyanızı mutlaka CMYK modunda hazırlayın. RGB renkler matbaada otomatik dönüştürüldüğünde ton kaybı ve koyulaşma yaşanabilir.

---

### 2. 300 DPI Çözünürlük Standardı

* Web için 72 DPI yeterliyken, matbaa ofset baskıda pürüzsüz netlik için tüm raster fotoğrafların **300 DPI (Dots Per Inch)** çözünürlükte olması zorunludur.

---

### 3. Taşma Payı (Bleed) ve Güvenli Alan

Giyotin kesim makinelerinde mikro kaymaların tasarıma zarar vermemesi için:

* **Taşma Payı (+3 mm):** Zemin renklerini ve fotoğrafları kesim çizgisinin 3 mm dışına taşırın.
* **Güvenli Alan (-4 mm):** Logo, metin ve kritik iletişim bilgilerini kesim çizgisinden en az 4 mm içeride tutun.

---

### 4. Fontları Eğrilere Dönüştürme (Convert / Outline)

* Dosyanızdaki tüm yazı katmanlarını seçip Illustrator'da \`Type > Create Outlines\` veya CorelDRAW'da \`Ctrl+Q\` yaparak vektörel çizgiye dönüştürün. Bu sayede matbaada yazı tipleri kaymaz.

---

### 5. İdeal Baskı Formatı: PDF/X-1a:2001

* Tasarımınızı matbaaya gönderirken tüm katmanları birleştiren, renk profilini gömen ve fontları kilitleyen en güvenli format **PDF/X-1a:2001** veya yüksek kaliteli PDF formatıdır.

Tasarım hazırlığı ve baskı siparişleriniz için [Mavi Basım Matbaa](/matbaa) uzmanlarımızdan teknik destek alabilirsiniz.`,
    faqList: [
          {
                "question": "Taşma payı bırakmazsam ne olur?",
                "answer": "Kesim esnasında bıçak 1 mm kaysa dahi kartvizit veya broşürün kenarında beyaz boşluk şeritleri kalır."
          },
          {
                "question": "Canva veya Photoshop dosyaları matbaaya uygun mu?",
                "answer": "Evet, Canva veya Photoshop tasarımlarınızı PDF Baskı (CMYK - 300 DPI) formatında indirerek matbaaya gönderebilirsiniz."
          }
    ]
  },
  {
    slug: 'kartvizit-tasarimi-ve-baski-rehberi',
    title: 'Profesyonel Kartvizit Tasarımı ve Baskı Rehberi: Standart Ölçüler ve Kağıt Seçimi',
    excerpt: '84x52 mm standart kartvizit ebatları, 350 gr mat kuşe kağıt, kurumsal tipografi ve tasarım püf noktaları.',
    date: '10 Haziran 2026',
    readTime: '7 Dk Okuma',
    category: 'Kartvizit & Prestij',
    image: '/images/kartvizit/kartvizit-baski.webp',
    schemaType: 'Article',
    content: `## Profesyonel Kartvizit Tasarımı ve Baskı Aşamaları

Kurumsal kimliğinizi en iyi şekilde yansıtacak prestijli bir kartvizit hazırlarken dikkat etmeniz gereken ebatlar, kağıt gramajları ve tasarım hiyerarşisi.

---

### 1. Standart Kartvizit Ebatları

* **Türkiye Standardı:** 84x52 mm (Baskı hazırlık ebadı taşma payıyla birlikte 88x56 mm).
* **Avrupa Standardı:** 85x55 mm.
* **Kredi Kartı Ebadı:** 86x54 mm (Cüzdan kart gözlerine tam uyum sağlar).

---

### 2. Kağıt Gramajı ve Yüzey Kaplamaları

* **350 gr Mat Kuşe:** En çok tercih edilen tok ve kaliteli standart kartvizit kağıdıdır.
* **Mat Selefon:** Kartvizite ipeksi, parmak izi bırakmayan lüks bir dokunuş katar ve yıpranmasını önler.
* **Oval Köşe Kesimi:** Kartvizitin 4 köşesinin yuvarlatılmasıyla modern bir görünüm elde edilir.

---

### 3. Bilgi Hiyerarşisi

Bir kartvizitte karmaşayı önlemek için:
1. **Logo & Şirket İsmi:** En dikkat çekici alanda bulunmalıdır.
2. **Kişi Adı & Unvan:** Net ve okunaklı yazı tipiyle vurgulanmalıdır.
3. **İletişim Bilgileri:** Telefon, e-posta, web sitesi ve açık adres sade bir düzende listelenmelidir.
4. **QR Kod:** Dijital rehbere ekleme veya web sitesine yönlendirme sağlayan pratik bir çözümdür.

Kurumsal kartvizit siparişi için [Kartvizit Baskı Fiyatları](/kartvizit) sayfamızı ziyaret edin.`,
    faqList: [
          {
                "question": "Kartvizitte hangi kağıt gramajı kullanılmalı?",
                "answer": "Prestijli bir duruş için minimum 350 gr mat kuşe veya 350 gr Amerikan Bristol kağıt tercih edilmelidir."
          },
          {
                "question": "Çift taraflı kartvizit baskısı fiyatı çok etkiler mi?",
                "answer": "Hayır, çift taraflı mat selefonlu kartvizitler tek taraflıya kıyasla çok küçük bir farkla çok daha zengin bir kurumsal izlenim sunar."
          }
    ]
  },
  {
    slug: 'lakli-kabartmali-kartvizit-rehberi',
    title: 'Lüks ve Kabartma Laklı Kartvizit Baskı Rehberi: Özel Efektler ve Fiyatlar',
    excerpt: 'Mat selefon üzeri kısmi kabartma lak, gofre kabartma ve altın varak yaldız uygulamalarıyla prestijli kartvizit oluşturma rehberi.',
    date: '11 Haziran 2026',
    readTime: '7 Dk Okuma',
    category: 'Kartvizit & Prestij',
    image: '/images/kartvizit/kartvizit-baski-detayi.webp',
    schemaType: 'Article',
    content: `## Kabartma Laklı ve Lüks Kartvizitlerle Fark Yaratın

Üst düzey yöneticiler, avukatlar, doktorlar, mimarlar ve kurumsal şirketler için tasarlanan lüks kartvizitlerde özel baskı efektleri markaya prestij katar.

---

### 1. Kısmi Kabartma Lak (Spot UV) Nedir?

Mat selefon ile kaplanmış kartvizitin üzerine, sadece logonun veya belirli yazıların üzerine şeffaf, parlak ve hafif kabarık bir vernik tabakası uygulanır. Parmakla dokunulduğunda hissedilen bu kabartma, ışık altında parlayarak büyüleyici bir kontrast oluşturur.

---

### 2. Popüler Lüks Kartvizit Kombinasyonları

* **Mat Selefon + Kısmi Kabartma Lak:** Klasik ve en popüler lüks kombinasyon.
* **Kabartma Lak + Sıcak Altın/Gümüş Varak Yaldız:** Işıltılı metalik yaldız üzerine kabartma uygulanarak ultra lüks görünüm sağlanır.
* **Gofre (Derin Kabartma):** Kağıdın arkasından pres yapılarak logonun 3 boyutlu olarak öne çıkması sağlanır.
* **Sıvama (700 gr Kalın) Kartvizit:** İki adet 350 gr kartonun birbirine yapıştırılmasıyla bükülmeyen, ultra sert vip kartvizit üretilir.

---

### 3. Lak Filmi Dosyası Nasıl Hazırlanır?

Baskıya dosya gönderirken:
1. **CMYK Tasarım Katmanı:** Tüm renkli görseller ve metinler.
2. **Lak (Spot UV) Katmanı:** Sadece lak uygulanacak logoyu ayrı bir sayfada **%100 K (Siyah)** olarak belirtin.

Özel laklı ve kabartmalı siparişleriniz için [Kartvizit Modelleri](/kartvizit) sayfamızı inceleyin.`,
    faqList: [
          {
                "question": "Kabartma lak her türlü kağıda uygulanabilir mi?",
                "answer": "Kabartma lakın parlaması ve net tutunması için zemininde mutlaka mat selefon kaplama bulunmalıdır."
          },
          {
                "question": "Kabartma laklı kartvizit teslim süresi nedir?",
                "answer": "Özel lak ve kurutma fırını süreçleri sebebiyle laklı kartvizitler ortalama 3-5 iş günü içerisinde üretilip kargolanır."
          }
    ]
  }
];