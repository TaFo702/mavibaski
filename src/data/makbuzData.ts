export interface MakbuzDetail {
  seoTitle: string;
  seoDescription: string;
  breadcrumbTitle: string;
  h1Title: string;
  subtitle: string;
  gallery: Array<{ src: string; alt: string; title: string; desc: string }>;
  featureImage: string;
  featureImageAlt: string;
  specifications: Array<{ title: string; value: string; desc?: string }>;
  whatIsTitle: string;
  whatIsContent: string;
  whoUsesTitle: string;
  whoUsesItems: string[];
  usageAreasTitle: string;
  usageAreasItems: Array<{ title: string; desc: string }>;
  howToFillTitle: string;
  howToFillContent: string[];
  requiredInfoTitle: string;
  requiredInfoContent: string[];
  comparisonTitle?: string;
  comparisonTableRows?: Array<{ label: string; col1: string; col2: string }>;
  importanceTitle: string;
  importanceContent: string;
  otokopiTitle: string;
  otokopiContent: string;
  faqList: Array<{ q: string; a: string }>;
  extraSampleTitle?: string;
  extraSampleContent?: string[];
  orderProcessTitle?: string;
  orderProcessItems?: Array<{ step: string; title: string; desc: string }>;
  thingsToConsiderTitle?: string;
  thingsToConsiderItems?: Array<{ title: string; desc: string }>;
  designFieldsTitle?: string;
  designFieldsItems?: Array<{ field: string; desc: string }>;
  comparisonBaskiTitle?: string;
  comparisonBaskiRows?: Array<{ label: string; single: string; otokopi: string }>;
  numeratorImportanceTitle?: string;
  numeratorImportanceContent?: string;
  sectoralTitle?: string;
  sectoralItems?: string[];
}

export const MAKBUZ_DETAILS: Record<string, MakbuzDetail> = {
  "adisyon": {
    seoTitle: "Adisyon Fişi Baskı ve Numaratörlü Adisyon Koçanı Fiyatları | Mavi Basım",
    seoDescription: "Restoran, kafe ve lokantalar için logolu, numaratörlü adisyon fişi baskısı. Güncel adisyon fiyatlarımızı inceleyin, WhatsApp üzerinden hızlıca sipariş verin.",
    breadcrumbTitle: "Adisyon Fişi",
    h1Title: "Adisyon Fişi Baskı ve Numaratörlü Adisyon Koçanı Fiyatları",
    subtitle: "Restoran, kafe ve lokantalar için logolu ve numaratörlü adisyon fişi baskısı yapıyoruz. Güncel adisyon fiyatlarını inceleyerek istediğiniz cilt adedi için WhatsApp üzerinden sipariş verebilirsiniz.",
    featureImage: "/images/adisyon/restoran-adisyon-baski.webp",
    featureImageAlt: "14 × 20 cm numaratörlü adisyon fişi örneği",
    gallery: [
      {
        src: "/images/adisyon/otokopili-adisyon-baski.webp",
        alt: "2 nüshalı otokopili adisyon koçanı örneği",
        title: "Otokopili Numaratörlü Adisyon",
        desc: "Kendinden kopyalı otokopili kâğıda basılmış 2 nüshalı adisyon koçanı örneği."
      },
      {
        src: "/images/adisyon/adisyon-fisi-ornegi.webp",
        alt: "Logolu restoran adisyon koçanı",
        title: "Logolu Adisyon Fişi",
        desc: "Restoran ve kafeler için özel kurumsal logolu adisyon örneği."
      },
      {
        src: "/images/adisyon/numaratorlu-adisyon-kocani.webp",
        alt: "Tek nüsha 1. hamur adisyon baskısı",
        title: "Tek Nüsha Adisyon",
        desc: "70–80 gr 1. hamur kâğıda basılmış tek nüsha adisyon yaprağı."
      },
      {
        src: "/images/adisyon/restoran-adisyon-baski.webp",
        alt: "restoran-ve-kafe-adisyon-baski-ornegi",
        title: "Restoran & Kafe Adisyon Baskısı",
        desc: "Masa hesabı ve garson sipariş takibinde hızlı ve hatasız kullanım sağlayan pratik adisyon tasarımı."
      },
      {
        src: "/images/adisyon/adisyon-basimi-fiyatlari.webp",
        alt: "adisyon-basimi-fiyatlari-ve-ebatlari",
        title: "Adisyon Basımı ve Ebat Seçenekleri",
        desc: "14x20 cm ve 10x14 cm boyutlarında, üstten perforajlı ve kolay koparılabilen cilt yapısı."
      },
      {
        src: "/images/adisyon/adisyon-baski.webp",
        alt: "numaratorlu-garson-adisyon-kocani",
        title: "Numaratörlü Garson Sipariş Fişi",
        desc: "Ardışık seri numaralarıyla kasa açıkları ve kayıp hesap riskini ortadan kaldıran profesyonel koçan baskısı."
      }
    ],
    specifications: [
      { title: "Ebat (Standart)", value: "14 × 20 cm" },
      { title: "Kâğıt (Standart)", value: "70–80 gr 1. hamur beyaz kâğıt" },
      { title: "Cilt Yapısı (Standart)", value: "100 yaprak / cilt (tek nüsha)" },
      { title: "Baskı Rengi (Standart)", value: "Tek renk kurumsal baskı" },
      { title: "Numaratör (Standart)", value: "Ardışık seri numaralı baskı" },
      { title: "İsteğe Bağlı Seçenekler", value: "10 × 14 cm özel ebat, otokopili (kendinden kopyalı), 50 takımlı cilt, çok renkli baskı" }
    ],
    whatIsTitle: "Adisyon Fişi Nedir? Nerelerde Kullanılır?",
    whatIsContent: "Adisyon fişi; restoran, kafe, lokanta, bar ve otel gibi yeme-içme işletmelerinde müşterilerin siparişlerini ve hesap detaylarını kayıt altına alan matbu belgedir. Üzerinde tarih, masa numarası, ürün kalemleri, adet, birim fiyatı ve genel toplam alanı yer alır. Servis personelinin sipariş hatalarının azaltılmasına yardımcı olur, mutfağa veya bara doğru iletilmesini ve kasanın gün sonu hesap takibini kolaylaştırır. Standart olarak 14 × 20 cm boyutlarında tek nüsha (100 yaprak) üretilebildiği gibi, ihtiyaca göre otokopili (kendinden kopyalı) çok nüshalı olarak da hazırlanabilir. Ardışık seri numaratör baskısı sayesinde kayıp hesapların ve iptal edilen siparişlerin takibini kolaylaştırır.",
    whoUsesTitle: "Kimler Adisyon Kullanır?",
    whoUsesItems: ["Restoranlar", "Kafeler", "Lokantalar", "Barlar", "Pastaneler", "Otel restoranları"],
    usageAreasTitle: "Adisyonun İşletmelerde Kullanımı",
    usageAreasItems: [
      { title: "Masa ve Sipariş Takibi", desc: "Siparişlerin eksiksiz kayıt altına alınmasını ve servis düzenini sağlar." },
      { title: "Mutfak ve Kasa İletişimi", desc: "Servis personeli, mutfak ve kasa arasındaki sipariş aksamalarını önler." },
      { title: "Gün Sonu Kasa Takibi", desc: "Ardışık seri numaraları sayesinde günlük ciro ve sipariş kayıt kontrolünü kolaylaştırır." }
    ],
    howToFillTitle: "Adisyon Nasıl Doldurulur?",
    howToFillContent: [
      "Masa numarası ve sipariş saati ilgili kutucuklara yazılır.",
      "Siparişi alan servis elemanının adı veya kodu girilir.",
      "Sipariş edilen ürün adı, adet ve birim fiyatı sütunlara işlenir.",
      "Tüm kalemler toplanarak genel toplam hanesine yazılır."
    ],
    requiredInfoTitle: "Adisyon Üzerinde Bulunması Gereken Bilgiler",
    requiredInfoContent: [
      "Seri ve Sıra Numarası: Ardışık numaratör baskı alanı.",
      "Firma Bilgileri: Kurumsal logo, unvan, adres ve telefon bilgileri.",
      "Tarih ve Saat Alanı: İşlemin yapıldığı zaman dilimi.",
      "Masa Numarası / Servis Elemanı: Siparişin ve personelin takibi.",
      "Ürün, Adet ve Tutar Sütunları: Sipariş kalemlerinin detaylı dökümü."
    ],
    comparisonTitle: "Adisyon Fişi ile Sipariş Fişi Arasındaki Farklar",
    comparisonTableRows: [
      { label: "Kullanıldığı Alan", col1: "Restoran, kafe, lokanta ve yeme-içme alanları", col2: "Toptan, perakende, teknik servis ve imalathaneler" },
      { label: "Müşteriye Sunum", col1: "Müşteriye masada sunulur veya mutfak/kasa takibinde kullanılır", col2: "Müşteriye sipariş teyidi veya depoya teslimat belgesi olarak verilir" },
      { label: "Standart Nüsha", col1: "Standart olarak tek nüsha 100 yapraklı koçan tercih edilir", col2: "Standart olarak otokopili 2 veya 3 nüsha üretilir" },
      { label: "Numaratör Kullanımı", col1: "Masa ve kasa hesap takibini kolaylaştırmak için seri numaralı basılır", col2: "İş emri veya teslimat sırası takibi için numaratör kullanılır" },
      { label: "İşletme İçi İşlevi", col1: "Mutfak, bar ve kasa arasında sipariş aktarımını sağlar", col2: "Satış, depo ve kargo/teslimat süreçleri arasında iş akışını düzenler" }
    ],
    importanceTitle: "",
    importanceContent: "",
    otokopiTitle: "Tek Nüsha (Otokopisiz) Adisyon Nedir?",
    otokopiContent: "Alt nüshası bulunmayan, doğrudan orijinal 70-80 gr 1. hamur kağıt üzerine kayıt tutulmasını sağlayan ekonomik adisyon fişi seçeneğidir. Her koçanda 100 yaprak yer alır.",
    faqList: [
      {
        q: "Minimum adisyon siparişi kaç cilttir?",
        a: "Standart 14 × 20 cm tek nüsha adisyon baskısında minimum sipariş miktarı 5 cilttir. Her cilt 100 yapraktan oluşur. Mutfak, kafe veya restoranınızın ihtiyaçlarına göre daha yüksek adetli siparişler vererek birim maliyet avantajından yararlanabilirsiniz."
      },
      {
        q: "Adisyonlara logo ve firma bilgisi eklenebilir mi?",
        a: "Evet. Adisyon koçanlarınıza firmanızın logosu, unvanı, adresi, telefon bilgileri ve diğer kurumsal kimlik öğeleri ücretsiz grafik tasarım desteğimiz kapsamında eklenebilmektedir. Tasarım onayınız alındıktan sonra üretime geçilir."
      },
      {
        q: "Numaratör baskısı fiyata dahil midir?",
        a: "Fiyat tablomuzda belirtilen standart tek nüsha adisyon seçeneklerinde ardışık seri numaratör baskısı liste fiyatına dahildir. Koçanlarda ardışık sıra numaralı basım standart olarak uygulanmaktadır."
      },
      {
        q: "Adisyon baskısında hangi kâğıt kullanılır?",
        a: "Standart fiyat tablosundaki tek nüsha adisyon koçanlarında 70–80 gr 1. hamur beyaz kâğıt kullanılmaktadır. İsteğe bağlı olarak otokopili (kendinden kopyalı) kâğıt da tercih edilebilir."
      },
      {
        q: "Otokopili adisyon fiyatları aynı mıdır?",
        a: "Hayır. Otokopili ve çok nüshalı adisyon üretimi, kendinden kopyalı otokopi kâğıdı kullanımı ve ilave işçilik farkından dolayı tek nüsha 1. hamur ürünlerden ayrı olarak fiyatlandırılmaktadır."
      },
      {
        q: "Adisyon ölçüsü değiştirilebilir mi?",
        a: "Standart üretim ebadımız 14 × 20 cm'dir. İşletmenizin pratik kullanım ihtiyaçlarına göre 10 × 14 cm veya özel ebatlarda da adisyon koçanı üretimi gerçekleştirilmektedir."
      },
      {
        q: "Renkli adisyon baskısı yapılabilir mi?",
        a: "Evet. Fiyat tablosundaki ürünler tek renk kurumsal baskılıdır. Logonuzun ve kurumsal renklerinizin birebir uygulanması için çok renkli baskı seçeneğiyle de imalat yapılmaktadır."
      },
      {
        q: "Adisyon baskı süresi ve teslimatı ne kadardır?",
        a: "Tasarım onayının ardından adisyon koçanlarınız 3–5 iş günü içerisinde basılarak Türkiye'nin 81 iline anlaşmalı kargo ile gönderilmektedir."
      }
    ],
    orderProcessTitle: "Adisyon Sipariş Süreci",
    orderProcessItems: [
      { step: "01", title: "Cilt Adedi Seçimi", desc: "Fiyat tablosundan işletmenizin ihtiyacına uygun cilt adedini belirleyin." },
      { step: "02", title: "WhatsApp İletişim", desc: "Sipariş butonuna tıklayarak firmanıza ait logo ve iletişim detaylarını bize iletin." },
      { step: "03", title: "Ücretsiz Tasarım Onayı", desc: "Grafik ekibimizin hazırladığı adisyon taslağını ve numaratör aralığını kontrol ederek onaylayın." },
      { step: "04", title: "Üretim ve Teslimat", desc: "Onaylanan adisyon koçanları 3–5 iş günü içinde basılarak adresinize kargolanır." }
    ],
    thingsToConsiderTitle: "Adisyon Baskısında Dikkat Edilmesi Gerekenler",
    thingsToConsiderItems: [
      { title: "Kağıt ve Gramaj Seçimi", desc: "Tek nüsha ürünlerde 1. hamur kağıdın net yazıma imkan tanıması, otokopili ürünlerde ise karbon kaplamanın pürüzsüz kopya oluşturması gerekir." },
      { title: "Mikro Perfore Kesim Kalitesi", desc: "Servis esnasında yaprakların koçandan kolayca ayrılabilmesi için düzgün perfore hattı bulunmalıdır." },
      { title: "Pratik Kullanım Ölçüsü", desc: "Servis elemanlarının cüzdan veya sunum panosuna uyumlu 14x20 cm veya 10x14 cm ebatlar tercih edilmelidir." },
      { title: "Hataya Yer Vermeyen Numaratör", desc: "Kasa takibinde çakışma olmaması için seri numaralarının eksiksiz ve sıralı olarak basılması önemlidir." }
    ],
    designFieldsTitle: "Adisyon Tasarımında Bulunması Gereken Alanlar",
    designFieldsItems: [
      { field: "Kurumsal Marka Logosu", desc: "İşletmenizin kurumsal kimliğini öne çıkaran logo ve iletişim alanı." },
      { field: "Masa No ve Personel Kodu", desc: "Sipariş takibini ve garson koordinasyonunu sağlayan belirgin kutucuklar." },
      { field: "Tarih ve Saat Satırları", desc: "İşlem zamanını kayıt altına alan tarih ve saat haneleri." },
      { field: "Ürün, Adet ve Fiyat Sütunları", desc: "Sipariş kalemlerinin, miktarlarının ve tutarlarının yazıldığı düzenli sütunlar." },
      { field: "Genel Toplam Çerçevesi", desc: "Ödenecek toplam tutarın net olarak gösterildiği alt çerçeve." }
    ],
    comparisonBaskiTitle: "Tek Nüsha ve Otokopili Adisyon Karşılaştırması",
    comparisonBaskiRows: [
      { label: "Çalışma Şekli", single: "Sadece orijinal tek yaprak bulunur, alt kopyası yoktur.", otokopi: "Yazılan sipariş bilgileri alt nüshaya kendiliğinden aktarılır." },
      { label: "Kullanım Amacı", single: "Tek noktadan hesap takibi yapan işletmeler için uygundur.", otokopi: "Mutfak, bar ve kasa arasında eş zamanlı takip sağlar." },
      { label: "Kullanım Kolaylığı", single: "Ekonomik ve sade kullanım sunar.", otokopi: "Kopyalama ihtiyacı olan yoğun işletmelerde zaman kazandırır." },
      { label: "Maliyet", single: "En ekonomik adisyon fişi seçeneğidir.", otokopi: "Kopyalı kağıt yapısı nedeniyle farklı fiyatlandırılır." }
    ],
    numeratorImportanceTitle: "Adisyon Baskısında Numaratörün Önemi",
    numeratorImportanceContent: "Numaratörlü adisyonlar, restoran ve kafe işletmelerinde sipariş ve kasa takibini güvenli hale getiren en önemli araçtır. Ardışık seri numaraları sayesinde gün sonunda satılan ürünler ile kasadaki koçanlar eşleştirilerek kaçak ve kayıp hesap riskinin önüne geçilir."
  },
  "siparis-fisi": {
    seoTitle: "Sipariş Fişi Baskı Fiyatları 2026 | Otokopili ve Numaratörlü",
    seoDescription: "Firmaya özel logolu, otokopili ve numaratörlü sipariş fişi baskısı. 5 ciltten başlayan güncel fiyatları inceleyin, ücretsiz tasarım ve PDF prova ile sipariş verin.",
    breadcrumbTitle: "Sipariş Fişi",
    h1Title: "Numaratörlü Sipariş Fişi Baskı Fiyatları",
    subtitle: "Mağaza, atölye, üretici, toptancı, teknik servis ve sipariş üzerine çalışan işletmeler için firmaya özel logolu, otokopili ve numaratörlü sipariş fişi basıyoruz.\n\nSipariş fişleri; müşteri bilgilerini, ürün veya hizmet detaylarını, miktarı, fiyatı, teslim tarihini, ödeme koşullarını ve sipariş notlarını düzenli biçimde kayıt altına almanıza yardımcı olur.\n\n5 ciltten başlayan üretim seçenekleri, ücretsiz mizanpaj desteği ve baskı öncesi PDF prova onayıyla sipariş verebilirsiniz.",
    featureImage: "/images/siparis-fisi/siparis-fisi-basimi.webp",
    featureImageAlt: "14 × 20 cm numaratörlü otokopili sipariş fişi baskı örneği",
    gallery: [
      {
        src: "/images/siparis-fisi/siparis-fisi-basimi.webp",
        alt: "Logolu Sipariş Fişi Baskı Örneği",
        title: "Logolu Sipariş Fişi Baskısı",
        desc: "Firma logosu, müşteri bilgileri, ürün detayları, ödeme ve teslimat alanları bulunan kurumsal sipariş formu."
      },
      {
        src: "/images/siparis-fisi/kendinden-karbonlu-siparis-fisi.webp",
        alt: "Kendinden Karbonlu Otokopili Sipariş Fişi",
        title: "Otokopili Sipariş Formu",
        desc: "Üst nüshaya yazılan bilgilerin alt suretlere kendiliğinden aktarılmasını sağlayan kaliteli otokopili kâğıt."
      },
      {
        src: "/images/siparis-fisi/otokopili-siparis-fisi.webp",
        alt: "Perforajlı Tırtıklı Sipariş Fişi Koçanı",
        title: "Perforajlı ve Dikişli Cilt",
        desc: "Koçandan kolayca koparılması için tırtıklı perforaj hattı ve üstten tel dikişli sağlam ciltleme."
      },
      {
        src: "/images/siparis-fisi/siparis-fisi-ornegi.webp",
        alt: "Kırmızı Numaratörlü Sipariş Fişi Takip Formu",
        title: "Ardışık Numaratör Baskısı",
        desc: "Siparişlerin seri numarasına göre takip edilmesini ve arşivlenmesini kolaylaştıran kırmızı numaratör."
      },
      {
        src: "/images/siparis-fisi/siparis-fisi-kocani.webp",
        alt: "Sipariş Fişi Koçanı Baskı Örneği",
        title: "50 Takımlık Koçan Ambalajı",
        desc: "50 sipariş takımından oluşan üstten ciltli ve dip kapağı korumalı sipariş koçanları."
      }
    ],
    specifications: [
      { title: "Ölçü", value: "14 × 20 cm" },
      { title: "Kâğıt", value: "Kendinden kopyalı otokopili kâğıt" },
      { title: "Cilt yapısı", value: "50 takım" },
      { title: "Nüsha seçenekleri", value: "1 asıl + 1, 2 veya 3 suret" },
      { title: "Baskı", value: "Tek renk veya ilave renkli" },
      { title: "Numaratör", value: "Ardışık seri numarası dahil" },
      { title: "Tasarım", value: "Firma logosuna ve kullanım alanına özel" },
      { title: "Üretim süresi", value: "PDF prova onayından sonra 3–5 iş günü" },
      { title: "Minimum sipariş", value: "5 cilt" },
      { title: "Gönderim", value: "Türkiye geneli kargo" }
    ],
    whatIsTitle: "Sipariş Fişi Nedir?",
    whatIsContent: "Sipariş fişi; müşteriden alınan ürün veya hizmet siparişinin ayrıntılarını yazılı olarak kayıt altına almak için kullanılan ticari formdur. Sipariş fişinde ürün adı, miktar, fiyat, ödeme koşulu, teslim tarihi ve müşteri bilgileri gibi ayrıntılar bulunabilir. Otokopili üretim sayesinde üst nüshaya yazılan bilgiler alt suretlere ayrıca karbon kâğıdı kullanılmadan aktarılır. Sipariş fişi, siparişin taraflar ve işletme departmanları arasında aynı bilgilerle takip edilmesine yardımcı olur.",
    whoUsesTitle: "Sipariş Fişi Nerelerde Kullanılır?",
    whoUsesItems: [
      "Mobilya ve dekorasyon firmaları: Ölçü, model, renk, kumaş, teslim tarihi ve kapora bilgilerinin kayıt altına alınmasında kullanılır.",
      "Tekstil ve üretim atölyeleri: Ürün kodu, beden, renk, üretim adedi ve teslim programının üretim birimine aktarılmasını kolaylaştırır.",
      "Toptancı ve distribütörler: Müşteri, ürün, miktar, birim fiyat ve sevkiyat bilgilerinin düzenli takip edilmesini sağlar.",
      "Teknik servisler: Talep edilen işlem, ürün veya yedek parça, tahmini teslim tarihi ve müşteri notlarının kaydedilmesinde kullanılabilir.",
      "Mağaza ve perakende işletmeleri: Stokta bulunmayan veya müşteri için özel hazırlanacak ürünlerin ön sipariş kaydında tercih edilir.",
      "Organizasyon ve hizmet firmaları: Hizmet kapsamı, tarih, lokasyon, katılımcı sayısı, kapora ve kalan ödeme bilgilerinin yazılı hâle getirilmesine yardımcı olur.",
      "E-ticaret ve sosyal medya satıcıları: Telefon, WhatsApp veya sosyal medya üzerinden alınan özel siparişlerin üretim ve sevkiyat sürecine aktarılmasını kolaylaştırır."
    ],
    usageAreasTitle: "Neden Otokopili Sipariş Fişi Kullanılır?",
    usageAreasItems: [
      { title: "Karbon Kâğıtsız Kullanım", desc: "Ayrı karbon kâğıdı kullanımını ortadan kaldırır." },
      { title: "Departman İletişimi", desc: "Aynı sipariş bilgisinin farklı departmanlara aktarılmasını kolaylaştırır." },
      { title: "Hatasız Bilgi", desc: "Elle tekrar yazımdan kaynaklanan bilgi farklılıklarını azaltır." },
      { title: "Eş Zamanlı Nüsha", desc: "Müşteri ve işletme nüshalarının aynı anda hazırlanmasını sağlar." },
      { title: "Seri Arşivleme", desc: "Siparişlerin seri numarasına göre arşivlenmesini kolaylaştırır." }
    ],
    howToFillTitle: "Sipariş Fişi Siparişi Nasıl Verilir?",
    howToFillContent: [
      "1. Adet ve nüsha seçeneğinizi belirleyin: Fiyat tablosundan ihtiyacınıza uygun cilt adedini ve nüsha sayısını seçin.",
      "2. Logo ve firma bilgilerinizi gönderin: Firma logonuzu, iletişim bilgilerinizi ve fişte bulunmasını istediğiniz alanları WhatsApp üzerinden iletin. PDF, Word, Excel veya daha önce kullandığınız eski sipariş fişinin fotoğrafını gönderebilirsiniz.",
      "3. Tasarımınız hazırlansın: Mevcut logonuz ve firma bilgileriniz kullanılarak sipariş fişi mizanpajı hazırlanır. Standart mizanpaj ve en fazla üç revizyon ücretsizdir. Yeni logo tasarımı ve kapsamlı kurumsal kimlik çalışmaları ayrıca fiyatlandırılır.",
      "4. PDF provayı kontrol edin: Baskıya girmeden önce hazırlanmış PDF prova size gönderilir. Firma bilgilerini, telefon numaralarını, sipariş alanlarını, numaratörü ve metinleri kontrol ederek onay verirsiniz.",
      "5. Üretim ve kargo: Yazılı onayınızın ardından üretim başlatılır. Standart üretim süresi 3–5 iş günüdür. Tamamlanan ürünler özenle paketlenerek adresinize gönderilir."
    ],
    requiredInfoTitle: "Sipariş Fişi Tasarımında Bulunabilecek Alanlar",
    requiredInfoContent: [
      "Firma logosu ve ticari unvan",
      "Adres, telefon, e-posta ve internet sitesi",
      "Sipariş numarası",
      "Sipariş tarihi",
      "Müşteri adı veya firma unvanı",
      "Müşteri telefonu ve adresi",
      "Ürün veya hizmet açıklaması",
      "Ürün kodu",
      "Miktar ve birim",
      "Birim fiyat",
      "Toplam tutar",
      "Kapora veya avans bilgisi",
      "Kalan ödeme",
      "Teslim tarihi",
      "Teslimat adresi",
      "Ödeme şekli",
      "Sipariş notları",
      "Müşteri ve firma yetkilisi imza alanları"
    ],
    comparisonTitle: "Sipariş Fişi Fatura Yerine Geçer mi?",
    comparisonTableRows: [
      { label: "Temel amaç", col1: "Sipariş bilgilerini kayıt altına almak", col2: "Satışı mali olarak belgelemek" },
      { label: "Düzenlenme zamanı", col1: "Sipariş alınırken", col2: "Mevzuatta belirtilen satış sürecinde" },
      { label: "Ürün ve teslimat notları", col1: "Ayrıntılı biçimde eklenebilir", col2: "Mali belge kurallarına göre düzenlenir" },
      { label: "İşletme içi takip", col1: "Üretim, sevkiyat ve arşiv için kullanılabilir", col2: "Muhasebe ve mali kayıt amacı taşır" },
      { label: "Fatura yerine geçme", col1: "Hayır", col2: "Evet" }
    ],
    importanceTitle: "Mavi Basım Üretim ve Tasarım Güvencesi",
    importanceContent: "Sipariş fişleri İstanbul Topkapı’daki üretim tesisimizde hazırlanır. Yıllara dayanan matbaa üretim deneyimi, baskı öncesi PDF prova onayı, ücretsiz standart mizanpaj desteği, numaratör dahil fiyatlandırma, düşük adetli ve toptan üretim seçenekleri, Türkiye’nin 81 iline gönderim ve baskı öncesi dosya kontrolü ile sunulmaktadır. PDF prova onayınız alınmadan üretime başlanmaz.",
    otokopiTitle: "Baskıya Uygun Dosya Nasıl Gönderilir?",
    otokopiContent: "Hazır tasarımınız bulunuyorsa PDF, Adobe Illustrator veya yüksek çözünürlüklü görsel formatında gönderebilirsiniz. Yazıların okunabilir büyüklükte olması, kesim kenarlarına çok yakın bilgi yerleştirilmemesi ve logonun vektörel olması önerilir. Hazır tasarımınız yoksa eski fişinizin fotoğrafını, Word veya Excel örneğini göndermeniz yeterlidir. Baskıya uygun sayfa düzeni tarafımızdan hazırlanır.",
    faqList: [
      {
        q: "Sipariş fişi baskısında minimum sipariş miktarı nedir?",
        a: "Minimum üretim miktarı 5 cilttir. Her cilt kendinden kopyalı 50 sipariş takımı içerir."
      },
      {
        q: "Sipariş fişine firma logosu eklenebilir mi?",
        a: "Evet. Firma logonuz, ticari unvanınız, iletişim bilgileriniz ve istediğiniz sipariş alanları CMYK veya özel renklerde tasarıma eklenmektedir."
      },
      {
        q: "Tasarım hizmeti ücretli mi?",
        a: "Mevcut logonuz ve firma bilgileriniz kullanılarak hazırlanan standart mizanpaj ile en fazla üç revizyon ücretsizdir. Kapsamlı logo çizimi çalışmaları ayrıca fiyatlandırılır."
      },
      {
        q: "Kaç nüshalı sipariş fişi bastırabilirim?",
        a: "1 asıl + 1 suret (2 nüsha), 1 asıl + 2 suret (3 nüsha) veya 1 asıl + 3 suret (4 nüsha) seçeneklerinden birini tercih edebilirsiniz."
      },
      {
        q: "Numaratör fiyatlara dahil mi?",
        a: "Evet. Ardışık seri numarası veren numaratör baskısı fiyat tablosunda listelenen tüm fiyatlara dahildir."
      },
      {
        q: "Numaratör baskısı kırmızı mı siyah mı olur?",
        a: "Standart numaratör baskımız yüksek okunabilirlik ve arşivleme kolaylığı için kırmızı mürekkeple uygulanmaktadır."
      },
      {
        q: "Renkli sipariş fişi basılıyor mu?",
        a: "Evet. Standart tek renk (siyah veya lacivert) baskının yanı sıra ek renk ve çok renkli CMYK baskı seçenekleri sunulmaktadır."
      },
      {
        q: "Sipariş fişi ölçüsü değiştirilebilir mi?",
        a: "Standart ürün ölçümüz 14 × 20 cm’dir (A5 boyuna yakın). İsteğe göre 10 × 14 cm veya A4 (21 × 29.7 cm) özel ebatlarda da üretim yapılmaktadır."
      },
      {
        q: "Sipariş fişi fatura yerine geçer mi?",
        a: "Hayır. Sipariş fişi sipariş ve teslimat detaylarını kayıt altına alan iç ticari formdur; resmi fatura veya e-Fatura yerine geçmez."
      },
      {
        q: "Eski sipariş fişimi örnek olarak gönderebilir miyim?",
        a: "Evet. Eski fişinizin fotoğrafını WhatsApp üzerinden göndermeniz yeterlidir. Sayfa düzeniniz birebir yeni tasarıma uyarlanır."
      },
      {
        q: "Excel veya Word dosyasından baskı yapılabilir mi?",
        a: "Evet. Excel, Word veya serbest taslak olarak ilettiğiniz sipariş tabloları grafikerlerimiz tarafından baskıya uygun vektörel formata dönüştürülür."
      },
      {
        q: "Adobe Illustrator veya PDF dosyası kabul ediyor musunuz?",
        a: "Evet. Adobe Illustrator (.ai), CorelDRAW (.cdr) veya vektörel PDF formatındaki hazır tasarımlarınızı direkt baskıya alabiliyoruz."
      },
      {
        q: "Baskıdan önce tasarımı görebilir miyim?",
        a: "Evet. Üretim öncesinde hazırlanan PDF prova WhatsApp üzerinden onayınıza sunulur. Yazılı onayınız alınmadan baskıya geçilmez."
      },
      {
        q: "Üretim süresi ne kadardır ve acil baskı yapılır mı?",
        a: "PDF prova onayının ardından standart üretim süresi 3–5 iş günüdür. Acil sipariş durumlarında üretim programına göre öncelik sağlanabilmektedir."
      },
      {
        q: "Otokopili kâğıtta alt suret renk sıralaması nasıldır?",
        a: "Standart uygulamada üst nüsha beyaz, orta nüsha pembe/sarı, alt nüsha ise mavi veya yeşil kendinden kopyalı otokopili kâğıttır."
      },
      {
        q: "Perforajlı (tırtıklı) mı yoksa tutkallı cilt mi yapılıyor?",
        a: "Koçandan kolayca koparılabilmesi için sayfalar perforajlı (tırtıklı) olarak hazırlanır ve üstten veya yandan sağlam ciltleme yapılır."
      },
      {
        q: "İstanbul dışına gönderim yapılıyor mu?",
        a: "Evet. Üretimi tamamlanan sipariş fişleri İstanbul Topkapı tesisimizden Türkiye’nin 81 iline anlaşmalı kargo ile sevk edilmektedir."
      },
      {
        q: "Kargo ücretli mi?",
        a: "5.000 TL ve üzerindeki KDV hariç siparişlerde kargo ücretsizdir. Daha düşük tutarlı siparişlerde indirimli anlaşmalı kargo uygulanır."
      },
      {
        q: "Ödeme şekilleri nelerdir?",
        a: "Ödemelerinizi banka havalesi / EFT veya kredi kartı ile güvenli şekilde gerçekleştirebilirsiniz."
      },
      {
        q: "Sipariş fişine kaç satır ürün ekleyebilirsiniz?",
        a: "14 × 20 cm ebadındaki standart tasarımda 10-15 satır ürün/hizmet alanı rahatlıkla sığmaktadır. İhtiyacınıza göre satır sayısı özelleştirilebilir."
      }
    ]
  },
  "perakende-satis-fisi": {
    seoTitle: "Perakende Satış Fişi Koçanı Baskı Fiyatları | Mavi Basım",
    seoDescription: "Otokopili kendinden karbonlu perakende satış fişi baskısı. Küçük boy (10x14 cm), numaratörlü ve firma logolu koçanlı perakende satış fişi siparişi.",
    breadcrumbTitle: "Perakende Satış Fişi",
    h1Title: "Perakende Satış Fişi Baskısı",
    subtitle: "Mağazalar, hızlı satış yapan noktalar ve teknik servisler için küçük boy (10x14 cm) otokopili perakende fiş basımı.",
    featureImage: "/images/siparis-fisi/kendinden-karbonlu-siparis-fisi.webp",
    featureImageAlt: "Perakende satış fişi basımı",
    gallery: [
      {
        src: "/images/siparis-fisi/otokopili-siparis-fisi.webp",
        alt: "Küçük boy perakende satış fişi",
        title: "Kompakt Ebatlar",
        desc: "10x14 cm yapısı ile elde kolay tutulan, tezgahta ve cepte taşınabilen pratik tasarım."
      },
      {
        src: "/images/siparis-fisi/siparis-fisi-kocani.webp",
        alt: "Perakende fişi koçanı",
        title: "50 Takımlı Ciltler",
        desc: "Her bir perakende satış fişi cildi kendinden karbonlu 50 takımdan oluşur."
      },
      {
        src: "/images/siparis-fisi/siparis-fisi-ornegi.webp",
        alt: "Perakende fişi örneği",
        title: "Kurumsal Logolu Baskı",
        desc: "Müşteriye satılan ürünün firmanızdan alındığını gösteren logolu prestijli tasarım."
      }
    ],
    specifications: [
      { title: "Ölçü", value: "10 x 14 cm (Küçük Boy)" },
      { title: "Kağıt Türü", value: "Otokopili Kendinden Karbonlu Kağıt" },
      { title: "Nüsha Sayısı", value: "1 Asıl + 1 Suret veya 1 Asıl + 2 Suret" },
      { title: "Numaratör", value: "Sıralı Numaralı Seri Baskı" },
      { title: "Ciltleme", value: "Yırtılabilir Perforeli Üstten Tutkallı" },
      { title: "Baskı Rengi", value: "Siyah veya Kurumsal Renk" },
      { title: "Min Miktar", value: "5 Cilt" },
      { title: "Tasarım", value: "Şirkete Özel Logo ve İletişim Bilgisi" },
      { title: "Teslimat", value: "3 - 5 İş Günü" }
    ],
    whatIsTitle: "Perakende Satış Fişi Nedir?",
    whatIsContent: "Perakende Satış Fişi, mağazaların veya perakende hizmet noktalarının ürün/hizmet satışında müşteriye anında elden verdiği, fiyat ve adet belirten gayriresmi veya bilgi amaçlı nakit takip koçanıdır.",
    whoUsesTitle: "Kimler Perakende Satış Fişi Kullanır?",
    whoUsesItems: ["Giyim ve Ayakkabı Mağazaları", "Kırtasiye ve Hediyelik Eşya Dükkanları", "Hırdavatçılar", "Oto Parçacıları", "Kozmetik Satış Noktaları", "Şarküteriler"],
    usageAreasTitle: "Perakende Fişi Kullanım Kolaylıkları",
    usageAreasItems: [
      { title: "Hızlı Kayıt", desc: "Bilgisayar açmaya gerek kalmadan birkaç saniyede satılan ürünü ve fiyatı kayıt altına alır." },
      { title: "Müşteri Bilgilendirme", desc: "Müşterinin hangi ürün için ne kadar ödeme yaptığını net bir şekilde belgelendirir." },
      { title: "Kasa Mutabakatı", desc: "Gün sonunda kasadaki nakit parayla elden kesilen perakende fişlerinin toplamını karşılaştırmayı kolaylaştırır." }
    ],
    howToFillTitle: "Perakende Satış Fişi Nasıl Hazırlanır?",
    howToFillContent: [
      "Düzenleme tarihi ve saat yazılır.",
      "Müşteriye satılan ürünün adı ve teslim adedi yazılır.",
      "Ürünün birim fiyatı ve toplam fiyatı hesaplanarak kaydedilir.",
      "Fişi kesen personelin parafı atılarak asıl kopya müşteriye teslim edilir."
    ],
    requiredInfoTitle: "Perakende Satış Fişinde Bulunması Gereken Detaylar",
    requiredInfoContent: [
      "Sıralı Fiş Numarası",
      "Mağaza Adı, Logosu ve Telefon Numarası",
      "Tarih/Saat Bilgisi",
      "Ürün Adı, Adedi, Birim Fiyatı ve Toplam Tutar"
    ],
    comparisonTitle: "Perakende Satış Fişi ile Yazarkasa Fişi Karşılaştırması",
    comparisonTableRows: [
      { label: "Mali Geçerlilik", col1: "Bilgilendirme ve iş takibine yöneliktir, doğrudan vergi belgesi değildir.", col2: "Yazarkasadan otomatik çıkan resmi mali geçerliliği olan belgedir." },
      { label: "Yazım Şekli", col1: "Kalemle el yazısıyla kurumsal logolu şablona yazılır.", col2: "Cihaz tarafından termal kağıda elektronik basılır." },
      { label: "Esneklik", col1: "Özel müşteri notları ve iade taahhütleri eklenebilir.", col2: "Standart dar sabittir, not eklemeye elverişli değildir." }
    ],
    importanceTitle: "Müşteri İlişkilerinde Perakende Fişinin Gücü",
    importanceContent: "Sıcak satış işletmelerinde, üzerinde işletmenizin logosu ve adresi bulunan bir perakende satış fişinin müşteriye verilmesi, kurumsal güven duygusunu tazeleyen ve profesyonelliği ön plana çıkaran ekonomik bir reklam unsurudur.",
    otokopiTitle: "Otokopili Sistem Avantajı",
    otokopiContent: "Müşterinin kopyası ile dükkanda kalan kopyanın aynı olması, iade veya değişim taleplerinde olası suistimalleri önlemeye yardımcı olur.",
    faqList: [
      { q: "Perakende satış fişi resmi fatura yerine geçer mi?", a: "Hayır, vergi mükellefleri için fatura yerine geçmez. Bilgilendirme ve mağaza içi ürün değişim/takip süreçlerinde geçerlidir." },
      { q: "Özel ölçülerde perakende fişi basılabilir mi?", a: "Genellikle en kullanışlı ölçü olan 10x14 cm küçük boy basmaktayız. Talebinize göre A5 boyutta da basım yapabiliriz." },
      { q: "Nüshalar farklı renklerde mi üretiliyor?", a: "Evet, asıl nüsha beyaz, suret nüshalar ise sarı veya pembe otokopili kağıt üretilerek kolayca ayırt edilebilir." }
    ]
  },
  "para-makbuzu": {
    seoTitle: "Numaratörlü Para Makbuzu Baskı Fiyatları | Mavi Basım",
    seoDescription: "14×20 cm numaratörlü, otokopili para makbuzu baskı fiyatlarını; 2, 3 ve 4 nüsha seçenekleriyle 5 ciltten itibaren inceleyin.",
    breadcrumbTitle: "Para Makbuzu",
    h1Title: "Numaratörlü Para Makbuzu Baskı Fiyatları",
    subtitle: "Otokopili ve numaratörlü para makbuzu koçanları ile nakit teslimat ve tahsilat süreçlerinizi düzenli yönetin.",
    featureImage: "/images/para-makbuzu/numaratorlu-para-makbuzu.webp",
    featureImageAlt: "Logolu numaratörlü otokopili para makbuzu baskısı 14x20 cm",
    gallery: [
      {
        src: "/images/para-makbuzu/numaratorlu-para-makbuzu.webp",
        alt: "Logolu numaratörlü otokopili para makbuzu baskısı 14x20 cm",
        title: "Logolu Para Makbuzu Baskısı",
        desc: "Firma logosu, ödeyen, alan, tutar (yazı ve rakamla) ve açıklama alanları bulunan kurumsal para makbuzu."
      },
      {
        src: "/images/para-makbuzu/otokopili-para-makbuzu.webp",
        alt: "Kendinden karbonlu otokopili para makbuzu formu",
        title: "Otokopili Kopyalama Sistemi",
        desc: "Üst nüshaya yazılan tutar, tarih ve imzanın alt suretlere karbon kağıdı gerektirmeden net aktarılması."
      },
      {
        src: "/images/para-makbuzu/para-makbuzu-kocani.webp",
        alt: "Perforajlı telli cilt para makbuzu",
        title: "Perforajlı ve Dikişli Ciltleme",
        desc: "Yıllar boyu dağılmadan arşivde saklanabilen tel dikişli cilt ve kolay koparmayı sağlayan perfore hat."
      },
      {
        src: "/images/para-makbuzu/para-makbuzu-ornegi.webp",
        alt: "Kırmızı numaratörlü para makbuzu koçanı",
        title: "Ardışık Kırmızı Numaratör",
        desc: "Kasaya giren ve çıkan nakit akışını karışıklık olmadan seri numarasıyla izlemeyi sağlayan kırmızı numaratör."
      }
    ],
    specifications: [
      { title: "Ölçü", value: "14 × 20 cm (Standart Ebat)" },
      { title: "Kağıt Yapısı", value: "1. Sınıf Otokopi (Kendinden Karbonlu)" },
      { title: "Nüsha Seçenekleri", value: "1 Asıl + 1 Suret (2 Nüsha), 1 Asıl + 2 Suret (3 Nüsha), 1 Asıl + 3 Suret (4 Nüsha)" },
      { title: "Numaratör", value: "Kırmızı Seri Numaratör Baskısı Dahil" },
      { title: "Cilt Yapısı", value: "Her Ciltte 50 Takım (Üstten Tel Dikişli & Perforeli)" },
      { title: "Baskı Rengi", value: "Siyah veya Kurumsal Renk" },
      { title: "Minimum Sipariş", value: "5 Cilt" }
    ],
    whatIsTitle: "Para Makbuzu Nedir?",
    whatIsContent: "Para makbuzu; iki taraf arasında yapılan nakit teslimat, kapora veya elden ödeme işlemlerinin kayıt altına alınması amacıyla düzenlenen otokopili matbu belgedir.",
    whoUsesTitle: "Kimler Para Makbuzu Kullanır?",
    whoUsesItems: ["İnşaat ve Emlak Ofisleri", "Muhasebe ve Finans Departmanları", "Toptan Mal Satıcıları", "Dernekler ve Vakıflar", "Özel Kurslar ve Okullar", "Elden Ödeme Alıp Veren Tüm Firmalar"],
    sectoralTitle: "Para Makbuzu Kullanım Sektörleri",
    sectoralItems: ["Gayrimenkul Yatırım Ortaklıkları", "Şantiye ve Taşeron Yapı Ortakları", "Gıda ve Toptan Tedarikçiler", "Eğitim Branş Kursları", "Sosyal Yardım Yardımlaşma Dernekleri", "Hukuk ve Mali Müşavirlik Büroları"],
    usageAreasTitle: "Para Makbuzu Kullanım Durumları",
    usageAreasItems: [
      { title: "Elden Taşeron Ödemesi", desc: "Şantiye ortamında taşeron ustalara elden verilen haftalık hak ediş ödemelerini yazılı kayıt altına alır." },
      { title: "Kira Teslimi", desc: "Elden ödenen mesken ve dükkan kiralarında mal sahibinin ödemeyi aldığını kayıt altına almaya yardımcı olur." },
      { title: "Cari Ödeme Makbuzu", desc: "Cari hesap borcuna istinaden firmaların birbirine nakit aktarımını kaydeder." },
      { title: "Kapora Teslim Ödemesi", desc: "Gayrimenkul, kiralama veya hizmet alımlarında ön anlaşma bedeli olan kaporanın ödendiğini kayıt altına alır." }
    ],
    howToFillTitle: "",
    howToFillContent: [],
    requiredInfoTitle: "",
    requiredInfoContent: [],
    comparisonTitle: "",
    comparisonTableRows: [],
    importanceTitle: "",
    importanceContent: "",
    otokopiTitle: "",
    otokopiContent: "",
    faqList: [
      { q: "Para makbuzu ile tahsilat makbuzu arasındaki fark nedir?", a: "Para makbuzu genel nakit teslimat ve kapora kayıtları için kullanılırken; tahsilat makbuzu faturalı satışların veya cari hesap alacaklarının tahsilatında kullanılır." },
      { q: "Para makbuzu resmi fatura yerine geçer mi?", a: "Hayır. Para makbuzu vergi mevzuatı kapsamında fatura veya serbest meslek makbuzu yerine geçmez; taraflar arasındaki teslimatı belgeleyen iç kayıt evrakıdır." },
      { q: "Minimum sipariş adedi nedir?", a: "Para makbuzu baskısında minimum sipariş miktarı 5 cilttir. Her cilt 50 takımdan oluşur." },
      { q: "Firma logosu basılabilir mi?", a: "Evet. Firma logonuz, unvanınız ve adres bilgileriniz baskıya dahil edilebilir. Baskı öncesi PDF prova ile onayınız alınır." },
      { q: "Numaratör baskısı fiyata dahil midir?", a: "Evet. Sıralı kırmızı numaratör (seri no) baskısı tablodaki fiyatlara dahildir." }
    ]
  },
  "sozlesme-baski": {
    seoTitle: "Sözleşme Baskı | Numaratörlü Otokopili Sözleşme Koçanı Baskısı",
    seoDescription: "Sözleşme baskı hizmeti. Numaratörlü, otokopili, A4 20.5 x 28.5 cm net boy sözleşme koçanları. 1 asıl 1 suret, 1 asıl 2 suret ve 1 asıl 3 suret seçenekleriyle hızlı üretim.",
    breadcrumbTitle: "Sözleşme Baskı",
    h1Title: "Sözleşme Baskı | Numaratörlü Otokopili Sözleşme Koçanı",
    subtitle: "Hizmet, satış ve üyelik belgeleriniz için özel tasarlanan numaratörlü otokopili sözleşme koçanlarını ofset baskı tekniği ile üretime alıyoruz.",
    featureImage: "/images/sozlesme/numaratorlu-sozlesme-baski.webp",
    featureImageAlt: "Numaratörlü otokopili sözleşme baskı koçanı",
    gallery: [
      {
        src: "/images/sozlesme/kendinden-karbonlu-sozlesme.webp",
        alt: "Numaratörlü otokopili sözleşme koçanı baskı örneği",
        title: "Eksiksiz Çift Nüsha",
        desc: "Sözleşme şartları, imzalar ve müşteri beyanı tek seferde alt nüshaya pürüzsüz aktarılır."
      },
      {
        src: "/images/sozlesme/otokopili-sozlesme-basimi.webp",
        alt: "20,5 x 28,5 cm otokopili sözleşme koçanı",
        title: "A4 Net Boyut Ciltler",
        desc: "20.5 x 28.5 cm geniş alanı ile uzun hukuki maddelerin ve şartnamelerin rahat okunup basılmasına uygundur."
      },
      {
        src: "/images/sozlesme/sozlesme-ornegi-kocani.webp",
        alt: "Firma logolu karbonlu sözleşme formu baskısı",
        title: "Sıralı Arşivleme",
        desc: "Özel numaratör seri sistemi ile sözleşmelerinizi kronolojik ve sayısal takip altında tutabilirsiniz."
      }
    ],
    specifications: [
      { title: "Yaprak Sayısı", value: "50x2 (1 Asıl 1 Suret) / 50x3 (1 Asıl 2 Suret) / 50x4 (1 Asıl 3 Suret)", desc: "Her Ciltte 50 set (Takım) halinde; seçtiğiniz nüsha sayısına göre cilt başı 100, 150 veya 200 yaprak bulunur." },
      { title: "Kağıt Gramajı", value: "1. Sınıf Otokopili (Üst Yaprak CB: 54-56 gr/m², Orta Yaprak CFB: 53-54 gr/m², Alt Yaprak CF: 55-57 gr/m²)" },
      { title: "Baskı Türü", value: "Ofset Baskı" },
      { title: "Delik", value: "Kolay Koparma Perforeli (Fiyata dâhildir; talep halinde uygulanır)" },
      { title: "Numaratör", value: "Kırmızı Otomatik Seri Numaralı (Talep ettiğiniz başlangıç numarasından itibaren)" },
      { title: "Ölçü / Ebat", value: "20.5 x 28.5 cm (A4 Net Bitmiş Boyut)", desc: "Standart A4 boyutu 21x29.7 cm olmasına rağmen; profesyonel cilt sırtı yapıştırma ve kenar giyotin tıraşlama (hizalama kesimi) işlemlerinden ötürü ürün kargoya net 20.5 x 28.5 cm ebadında teslim edilmektedir." },
      { title: "Baskı Rengi", value: "Tek Renk (Kurumsal Pantone veya Siyah) veya Çok Renkli Seçenekler" },
      { title: "Tasarım Onayı", value: "PDF Taslak Onayından Sonra Üretim Başlangıcı" },
      { title: "Teslimat Süresi", value: "PDF Prova Onayından Sonra 3-5 İş Günü (Baskı ve Cilt Süresi)" }
    ],
    whatIsTitle: "Otokopili Sözleşme Koçanı Nedir?",
    whatIsContent: "Otokopili sözleşme koçanları; hizmet sözleşmeleri, üyelik formları, satış sözleşmeleri ve benzeri kurumsal evrakların düzenli şekilde kayıt altına alınmasını sağlayan matbu formlardır. Basınç duyarlı 1. sınıf otokopi kağıtları sayesinde yazılan bilgiler alt nüshalara otomatik olarak mürekkepsiz aktarılır. Firma logosu, iletişim bilgileri, genel ve özel şartnameler eklenerek kuruma özel tasarımlar hazırlanır.",
    whoUsesTitle: "Sözleşme Koçanlarını Kimler Tercih Eder?",
    whoUsesItems: ["Spor Salonları ve Fitness Merkezleri", "Emlak ve Gayrimenkul Ofisleri", "Araç Kiralama Firmaları", "Güzellik Merkezleri", "Eğitim Kurumları", "Sağlık ve Danışmanlık Merkezleri"],
    usageAreasTitle: "Karbonlu Sözleşme Defteri Avantajları",
    usageAreasItems: [
      { title: "Zaman Tasarrufu", desc: "Her defasında bilgisayardan çıktı alma ya da tarayıcı derdini bitirir, hazır şablona imzaları anında alır." },
      { title: "Kayıt ve Arşiv Kolaylığı", desc: "Islak imzalı sözleşmeler işletmelerin kayıt ve arşiv süreçlerinde yaygın olarak kullanılmaktadır." },
      { title: "Hızlı Kayıt", desc: "İnternet veya elektrik altyapısının olmadığı fiziki noktalarda da anında ve kesintisiz üyelik veya hizmet kaydı düzenlemenize imkan tanır." }
    ],
    howToFillTitle: "Otokopili Sözleşme Nasıl Doldurulur?",
    howToFillContent: [
      "Sözleşmenin tarafları (firma ve müşteri bilgileri) eksiksiz yazılır.",
      "Anlaşma konusu hizmet veya ürün detayları, ücreti ve ödeme planı doldurulur.",
      "Varsa özel maddeler veya taahhütler not edilir.",
      "Müşteri ve satıcı yetkilisi imzalayarak asıl nüshayı müşteriye sunar."
    ],
    requiredInfoTitle: "Numaratörlü Sözleşme Formunda Bulunması Gereken Bölümler",
    requiredInfoContent: [
      "Seri ve Sıra Numarası alanı",
      "Firma Resmi Bilgileri ve Temsilci Bilgisi",
      "Sözleşme Genel ve Özel Hukuki Şartları",
      "Tarafların Adres, T.C. Kimlik / Vergi No ve İmza Bölmeleri"
    ],
    importanceTitle: "Sözleşmelerde Numaratör Takibi Neden Önemlidir?",
    importanceContent: "Sözleşme koçanlarında yer alan ardışık numaratör (seri no) takibi, işletmeler için iç denetim ve arşiv mutabakat süreçlerinde kolaylık sağlar. Eksik veya atlanan bir sözleşme yaprağı (seri numarası) olup olmadığını kolayca takip edebilir, koçan dökümlerinde tam kontrol sağlayabilirsiniz.",
    otokopiTitle: "Otokopili Kağıt Kalitesi",
    otokopiContent: "Otokopi kağıdının mikrokapsüllü yapısı sayesinde, normal tükenmez kalem yazımı esnasında oluşan hafif basınç alt suretlere temiz, okunaklı ve lekesiz bir şekilde aktarılır.",
    sectoralTitle: "Hizmet Sözleşmesi Baskısı Nerelerde Kullanılır?",
    sectoralItems: [
      "Spor Salonları ve Fitness Merkezleri: Üyelik sözleşmeleri, üye taahhütnameleri, paket katılım sözleşmeleri ve aylık üyelik kayıt formları.",
      "Emlak ve Gayrimenkul Ofisleri: Alıcı/satıcı yer gösterme belgeleri, gayrimenkul kiralama sözleşmeleri ve alım-satım ön protokol formları.",
      "Güzellik Merkezleri: Müşteri rıza ve seans onay formları, epilasyon/bakım seans paket sözleşmeleri ve sorumluluk muafiyet belgeleri.",
      "Eğitim Kurumları: Kurs ve okul kayıt sözleşmeleri, veli onay/muvafakat formları ile taksitli ödeme taahhüt belgeleri.",
      "Araç Kiralama Firmaları: Günlük ve yıllık oto kiralama sözleşmeleri, araç teslim (check-in / check-out) ve iade tutanak koçanları.",
      "Sağlık ve Danışmanlık Merkezleri: Danışan ve hasta bilgilendirilmiş rıza onay formları, profesyonel danışmanlık hizmet sözleşmeleri ve gizlilik mukaveleleri."
    ],
    faqList: [
      { q: "Otokopili sözleşme koçanlarında logo basılabilir mi?", a: "Evet. Firma logonuz, iletişim bilgileriniz ve kurumsal bilgileriniz sözleşme tasarımına eklenerek baskıya hazırlanabilir." },
      { q: "Sözleşme koçanları kaç nüsha üretilebilir?", a: "İhtiyaca göre 1 asıl 1 suret, 1 asıl 2 suret veya 1 asıl 3 suret seçenekleriyle üretilebilmektedir." },
      { q: "Sözleşme baskılarında perfore uygulanıyor mu?", a: "Evet. Talep edilmesi halinde kolay koparma amaçlı perfore uygulaması yapılabilmektedir." },
      { q: "Türkiye'nin her iline gönderim yapıyor musunuz?", a: "Evet. İstanbul'daki üretim tesisimizden Türkiye'nin tüm illerine kargo gönderimi yapılmaktadır." },
      { q: "Sözleşme koçanı tasarımı ücretsiz mi?", a: "Mevcut logonuz ve firma bilgileriniz kullanılarak hazırlanan baskı tasarımları ücretsiz olarak hazırlanabilmektedir." },
      { q: "Sözleşmelerde numaratör numarası hangi renkte basılmaktadır?", a: "Sözleşme koçanlarımızda numaratör baskısı, yasal koruyuculuğu ve takibi kolaylaştırması açısından standart olarak kırmızı renkte ve otomatik sıralı olarak basılmaktadır." },
      { q: "Sözleşmelerde perfore seçeneği var mı, ücretli mi?", a: "Evet, sayfaların koçandan pürüzsüz ve kolayca yırtılabilmesi için talebinize bağlı olarak perfore (tırtıklı çizgi) seçeneği eklemekteyiz ve bu işlem için ek bir ücret talep etmiyoruz." },
      { q: "Kendi özel sözleşme tasarımımızı gönderebilir miyiz?", a: "Tabii ki. Mevcut Word, PDF, Excel veya taranmış sözleşme taslağınızı bize iletebilirsiniz. Grafik ekibimiz logonuzu ekleyerek baskıya uygun hale getirir ve PDF prova gönderir." },
      { q: "1 Asıl + 2 Suret sözleşmelerde renkler nasıldır?", a: "Genellikle en üst asıl nüsha beyaz otokopi kağıdına basılırken, 1. suret pembe, 2. suret sarı renkli kendinden karbonlu kağıtlara basılarak nüshaların kolayca ayrıştırılması sağlanır." },
      { q: "Türkiye geneli gönderimlerde kargo ücreti kime aittir?", a: "Ürünlerimizi hasar görmeyecek şekilde çift oluklu mukavemetli kolilerde ambalajlayıp anlaşmalı kargo firmamızla indirimli olarak adresinize gönderiyoruz. Kargo ücreti alıcıya aittir." },
      { q: "A4 Tam Boy ölçüsü neden 20,5 x 28,5 cm olarak verilmektedir?", a: "Standart A4 tabakası normalde 21 x 29,7 cm'dir. Ancak matbaacılık ve ciltleme standartları uyarınca, tutkal payları ve kenarların hizalanması amacıyla yapılan milimetrik giyotin kesimleri (tıraşlama) işlemlerinin ardından, kargoya teslim edilen bitmiş net ve kullanılabilir alan 20,5 x 28,5 cm olmaktadır." },
      { q: "Nüshaların renkleri farklı olabilir mi?", a: "Evet. Otokopili sözleşme koçanlarında üst yaprak beyaz, alt yapraklar ise sırasıyla pembe, sarı, yeşil veya mavi renklerde hazır üretilmektedir. Nüsha renklerinin bu standart renklerle üretilmesi fiyata dahildir ve ek ücret talep etmez." },
      { q: "Otokopili sözleşme koçanlarının arka yüzüne baskı uygulanabiliyor mu?", a: "Evet. Talebe bağlı olarak sözleşmelerin arka yüzüne kullanım şartları veya detaylı genel kurallar basılabilir; çift yönlü (arkalı önlü) baskı kalıp ve fiyat detayları için lütfen müşteri temsilcimizle iletişime geçiniz." },
      { q: "Otokopili sözleşme koçanlarında minimum sipariş miktarı nedir?", a: "Fiyat listesinde belirtilen minimum üretim miktarı 5 cilttir. Daha yüksek adetlerde birim maliyet avantajı oluşur." },
      { q: "Numaratör başlangıç numarasını ben belirleyebilir miyim?", a: "Evet. Siparişi başlatırken dilediğiniz başlangıç numarasını (örn; 0001 veya 01001 gibi) belirtebilirsiniz. Baskı ekibimiz numaratörü o sayıdan başlatmaktadır." }
    ]
  },
  "sigorta-policeleri": {
    seoTitle: "Sigorta Poliçesi ve Teklif Formu Baskısı | Mavi Basım",
    seoDescription: "Anlaşmalı indirimli kargo imkanıyla, sigorta acentelerine özel otokopili ve numaratörlü sigorta poliçe teklif formu koçanı baskısı. Hızlı teslimat.",
    breadcrumbTitle: "Sigorta Poliçeleri",
    h1Title: "A4 Sigorta Poliçesi ve Teklif Formu Baskısı | Mavi Basım",
    subtitle: "Acentenize özel logo baskılı, kendinden karbonlu (otokopili) ve sıralı numaratörlü sigorta teklif, talep ve onay formları.",
    featureImage: "/images/sigorta-policesi/sigorta-policesi-basimi.webp",
    featureImageAlt: "sigorta policesi basim fiyatlari",
    gallery: [
      {
        src: "/images/sigorta-policesi/sigorta-policesi-ornegi.webp",
        alt: "Sigorta teklif formu ornegi",
        title: "Kurumsal Logolu Şablon",
        desc: "Acentenizin logosu, levha numarası ve iletişim bilgilerinin yer aldığı güvenli baskı."
      },
      {
        src: "/images/sigorta-policesi/otokopili-sigorta-policesi.webp",
        alt: "Otokopili sigorta teklif formu",
        title: "A4 Ölçülerinde Geniş Alan",
        desc: "Tüm teminat maddelerini, muafiyet detaylarını ve müşteri imza alanlarını içeren tam boy şablon."
      },
      {
        src: "/images/sigorta-policesi/numaratorlu-sigorta-policesi.webp",
        alt: "Sigorta koçanı basımı",
        title: "Sıralı Seri No Takibi",
        desc: "İç denetim ve poliçe takibini kolaylaştıran yasal standartlarda kırmızı sıralı numaratör."
      }
    ],
    specifications: [
      { title: "Ölçü", value: "20.5 x 28.5 cm (A4 Net Boy)" },
      { title: "Kağıt Türü", value: "Otokopili (Kendinden Karbonlu)" },
      { title: "Nüsha Sayısı", value: "1 Asıl + 1 Suret veya 1 Asıl + 2 Suret" },
      { title: "Baskı Yönü", value: "Tek Yön (Ön Yüz) veya Çift Yön (Arka Yüz Şartname)" },
      { title: "Numaratör", value: "Sıralı Seri Numaralı (Kırmızı Baskı)" },
      { title: "Cilt Standardı", value: "Her Ciltte 50 Takım Belgeler" },
      { title: "Baskı Rengi", value: "Siyah, CMYK veya Özel Pantone Ofset Baskı" },
      { title: "Min Sipariş", value: "5 Cilt" },
      { title: "Teslim Süresi", value: "3 - 5 İş Günü" }
    ],
    whatIsTitle: "Sigorta Poliçesi Baskısı Nedir?",
    whatIsContent: "Sigorta poliçesi ve teklif formları; acentelerin kasko, trafik, DASK ve sağlık poliçelerinde müşterilerine düzenledikleri teminat detaylarını, prim tahsilatı şartlarını, poliçe yenileme taahhütlerini ve zeyilname değişikliklerini içeren ıslak imzalı otokopili belgelerdir. Otokopili poliçe koçanları ayrıca olası kaza ve riziko durumlarında hasar ihbarı kaydı ve dosya takibi için güvenli fiziksel arşiv imkanı sunar.",
    whoUsesTitle: "Sigorta Poliçesi Koçanlarını Kimler Kullanır?",
    whoUsesItems: ["Sigorta Acenteleri", "Sigorta Brokerları", "Sigorta Eksperleri", "Oto Galerileri", "Rent a Car İşletmeleri", "Bankalar & Finans Kuruluşları", "Leasing Şirketleri", "Filo Yönetim Firmaları", "Kurumsal Satış Ekipleri"],
    usageAreasTitle: "Kullanım Alanları ve Yararları",
    usageAreasItems: [
      { title: "Anında Poliçe & Teklif", desc: "Saha ziyaretlerinde veya internet kesintilerinde müşteriye anında ıslak imzalı teklif formu ve teminat belgesi sunar." },
      { title: "Zeyilname & Yenileme Kaydı", desc: "Poliçe kapsam değişikliklerini, adres/araç güncellemelerini ve yenileme onaylarını çift nüsha kayıt altına alır." },
      { title: "Hasar İhbarı & Prim Tahsilatı", desc: "Hasar ihbarı başvuru detaylarını ve peşin/taksitli prim tahsilatı şartlarını fiziki dosyada güvenle belgelendirir." }
    ],
    howToFillTitle: "Sigorta Poliçesi Nasıl Doldurulur?",
    howToFillContent: [
      "Sigortalının T.C. Kimlik / Vergi No ve araç plaka/şasi bilgileri yazılır.",
      "Teminat başlangıç ve bitiş tarihleri belirtilir.",
      "Poliçe prim tutarı, ödeme şekli (taksit/peşin) kaydedilir.",
      "Acente imza-kaşesi ve sigortalının ıslak imzası alınarak bir kopya müşteriye teslim edilir."
    ],
    requiredInfoTitle: "Poliçe Şablonunda Olması Gerekenler",
    requiredInfoContent: [
      "Acente Levha Kayıt No, Unvan ve Logo Bölgesi",
      "Seri Numaralı Kırmızı Numaratör Takip Alanı",
      "Teminat Türleri, Prim Limit Sütun tabloları",
      "Hukuki Uyuşmazlık ve Bilgilendirme Notları"
    ],
    comparisonTitle: "Otokopili Poliçe ile Elektronik Poliçe Farkı",
    comparisonTableRows: [
      { label: "Saha Pratikliği", col1: "İnternet ve bilgisayardan bağımsız anında sahada kesilebilir.", col2: "Sistem bağlantısı ve elektrik olmaksızın düzenlenemez." },
      { label: "Maliyet", col1: "Tek seferlik ekonomik matbaa baskı tutarı.", col2: "Yazılım şirketlerine ödenen yüksek aylık üyelik kotaları." },
      { label: "Dosyalama", col1: "Klasörlerde seri numarasından fiziksel olarak kolayca aranıp bulunur.", col2: "Siber hata veya sistem arızalarında veri kaybı riski taşır." }
    ],
    importanceTitle: "Acenteler İçin Seri Numaralı Takibin Önemi",
    importanceContent: "Acentenizin kestiği poliçe teklifleri ve taahhütnamelerin sıralı numaratörle takip edilmesi, şube veya çalışanların yaptığı işlemlerin mali denetimini kolaylaştırır ve yasal düzenlemelere (SEDDK, TOBB) uygun arşiv dökümü sağlar.",
    otokopiTitle: "Otokopili Poliçe Kağıdı Yapısı",
    otokopiContent: "Teminat listesi gibi karmaşık tabloların alt surete birebir kayma yapmadan, milimetrik hassasiyetle geçmesi için hassas baskı kalıpları ve yüksek kaliteli otokopi kağıtları kullanıyoruz.",
    faqList: [
      { q: "Sigorta poliçesi koçanlarına acente logosu basılabilir mi?", a: "Evet, sigorta poliçesi koçanlarına acentenizin logosu, iletişim bilgileri, levha numarası ve kurumsal kimlik unsurları eklenebilmektedir." },
      { q: "Numaratör başlangıç numarasını seçebilir miyim?", a: "Evet, sipariş verirken acentenizin kaldığı son seri numarasını belirtebilirsiniz. Yeni koçanlarınız belirttiğiniz başlangıç numarasından itibaren kopyalanarak basılır." },
      { q: "Arka yüze poliçe şartları baskısı yapılır mı?", a: "Evet, poliçe genel şartları, teminat klozları ve yasal açıklama metinleri koçanların arka yüzüne isteğe bağlı olarak tek renk (gri veya siyah) basılabilmektedir." },
      { q: "Kurumsal renk ve Pantone baskı uygulanabilir mi?", a: "Evet, acentenizin kurumsal kimlik renk kodlarına (CMYK veya özel Pantone renk) tam uyumlu yüksek hassasiyetli ofset baskı yapılmaktadır." },
      { q: "Acente levha kayıt kodu ve vergi bilgileri eklenebilir mi?", a: "Evet, TOBB / SEDDK acente levha kayıt numaranız, vergi daireniz ve acente yetki kodunuz şablona eksiksiz olarak yerleştirilir." },
      { q: "SEDDK ve yasal mevzuat standartlarına uygun hazırlanabilir mi?", a: "Evet, Sigortacılık ve Özel Emeklilik Düzenleme ve Denetleme Kurumu (SEDDK) mevzuatlarına uygun standart form alanları ve yasal bilgilendirme klozları şablonda hazır sunulur." },
      { q: "En az kaç cilt sigorta poliçesi siparişi verebilirim?", a: "Sigorta poliçesi baskılarında minimum sipariş miktarı 5 cilttir." },
      { q: "Sigorta poliçeleri kaç nüshalı basılabilir?", a: "İhtiyaca göre 2 nüsha (1 asıl 1 suret), 3 nüsha (1 asıl 2 suret) veya daha fazla nüshalı sigorta poliçesi baskısı yapılabilmektedir." },
      { q: "Sigorta poliçelerine numaratör basılabilir mi?", a: "Evet, evrak takibini ve iç denetimi kolaylaştırmak amacıyla sıralı kırmızı numaratörlü baskı uygulanmaktadır." },
      { q: "Özel tasarımlı sigorta poliçesi bastırabilir miyim?", a: "Evet, acentenizin ihtiyaçlarına uygun özel tasarımlı sigorta poliçesi ve teklif formu koçanları hazırlanabilmektedir." },
      { q: "Sigorta poliçeleri hangi kağıda basılmaktadır?", a: "Alt nüshalara bilgilerin pürüzsüz şekilde aktarılabilmesi için yüksek kaliteli kendinden karbonlu otokopili kağıtlar kullanılmaktadır." },
      { q: "Sigorta poliçesi ölçüleri değiştirilebilir mi?", a: "Evet, standart A4 (20.5 x 28.5 cm) ölçüsünün yanı sıra talebe göre A5 veya özel ebatlarda üretim yapılabilmektedir." },
      { q: "İstanbul dışına gönderim yapıyor musunuz?", a: "Evet, sigorta poliçesi siparişleri Türkiye'nin tüm il ve ilçelerine kargo ile gönderilmektedir." },
      { q: "Sigorta poliçesi baskısı kaç günde tamamlanır?", a: "Tasarım onayının ardından baskı süreci genellikle 3-5 iş günü içerisinde tamamlanarak kargoya teslim edilmektedir." }
    ]
  },
  "arac-kiralama": {
    seoTitle: "Araç Kiralama Sözleşmesi & Rent A Car Sözleşmesi Baskısı | Mavi Basım",
    seoDescription: "Kurumsal oto kiralama evrakları, rent a car sözleşmesi, araç kiralama sözleşmesi baskısı ve araç teslim tutanağı hasar tespit formu üretimi. Otokopili, sıralı numaratörlü.",
    breadcrumbTitle: "Araç Kiralama",
    h1Title: "Araç Kiralama Sözleşmesi Baskı & Rent A Car Formu",
    subtitle: "Araç kiralama sözleşmesi, araç teslim tutanağı ve araç hasar tespit formu baskı hizmetleri sunuyoruz. Otokopili ve numaratörlü olarak üretilen formlar, araç teslim ve iade süreçlerinin kayıt altına alınmasını sağlar.",
    featureImage: "/images/arac-kiralama/arac-kiralama-sozlesmesi-baski.webp",
    featureImageAlt: "arac-kiralama-sozlesmesi-baski.webp",
    gallery: [
      {
        src: "/images/arac-kiralama/rent-a-car-sozlesmesi-baski.webp",
        alt: "rent-a-car-sozlesmesi-baski.webp",
        title: "Rent A Car Sözleşmesi Baskı Örneği",
        desc: "İki nüshalı otokopili rent a car sözleşmesi koçanı baskı örneği."
      },
      {
        src: "/images/arac-kiralama/arac-kiralama-formu-ornegi.webp",
        alt: "arac-kiralama-formu-ornegi.webp",
        title: "Araç Kiralama Formu Örneği",
        desc: "Teslim alma ve iade anında yakıt ile km tespiti sağlayan araç teslim formu."
      },
      {
        src: "/images/arac-kiralama/otokopili-arac-kiralama-sozlesmesi.webp",
        alt: "otokopili-arac-kiralama-sozlesmesi.webp",
        title: "Otokopili Rent A Car Sözleşmesi",
        desc: "Müşteriyle olası hasar tartışmalarını bitiren gövde şablonlu hasar durum formu."
      }
    ],
    specifications: [
      { title: "Ölçü", value: "20.5 x 28.5 cm (A4 Net Boy) veya Özel Boylar" },
      { title: "Kağıt Türü", value: "Otokopili Kendinden Karbonlu Kağıt" },
      { title: "Nüsha Sayısı", value: "1 Asıl + 1 Suret veya 1 Asıl + 2 Suret" },
      { title: "Numaratör", value: "Ardışık Takip Sıra Numaralı Baskı" },
      { title: "Cilt Standardı", value: "Her Ciltte 50 Yaprak Takımı" },
      { title: "Baskı Rengi", value: "Siyah, Kırmızı veya Firmanızın Kurumsal Rengi" },
      { title: "Sipariş Miktarı", value: "5 Cilt, 10 Cilt, 20 Cilt, 30 Cilt, 50 Cilt" },
      { title: "Kağıt Kalitesi", value: "Yüksek Kalite Kopya Özellikli Kimyasal Kaplamalı" },
      { title: "Teslim Süresi", value: "Grafik tasarım onayından sonra 3-5 İş Günü" }
    ],
    whatIsTitle: "Araç Kiralama Sözleşmesi ve Formu Nedir?",
    whatIsContent: "Araç kiralama sözleşmesi ve rent a car teslim tutanakları; kiralayan şirket ile araç teslim alan müşteri arasında, kiralama süresini, depozito şartlarını, hasar ve sigorta durumlarını ile km bilgilerini yasal güvence altına almak için düzenlenen resmi ve hukuki belgelerdir. Otokopili yapısıyla yapılan işaretlemelerin ve girilen sözleşme maddelerinin kopyası saniyeler içinde alt nüshaya net bir şekilde aktarılır.",
    whoUsesTitle: "Araç Kiralama Formlarını Kimler Tercih Eder?",
    whoUsesItems: ["Oto Kiralama Şirketleri (Rent a Car)", "Lüks ve Ekonomik Araç Filoları", "Motosiklet ve Karavan Kiralama Ofisleri", "Yat ve Tekne Kiralama Acenteleri", "Operasyonel Filo Kiralama Firmaları"],
    usageAreasTitle: "Araç Kiralama Belgelerinin Kullanım Alanları",
    usageAreasItems: [
      { title: "Sözleşme Mutabakatı", desc: "Taraflar arasındaki kiralama bedeli, iade tarihi ve cezai şartları sabitleyerek olası anlaşmazlıkları yasal zeminde sonlandırır." },
      { title: "Hasar ve Kaporta Kontrolü", desc: "Araç teslim şablonları üstünde kaporta çizik, göçük ve kusurlarını işaretleyerek her iki tarafın hakkını güvenceye alır." },
      { title: "KM ve Depo Seviyesi Takibi", desc: "Aracın çıkış kilometresini ve depo yakıt seviyesini yazarak adil iade koşullarını garanti eder." }
    ],
    howToFillTitle: "Araç Kiralama Sözleşmesi Nasıl Doldurulur?",
    howToFillContent: [
      "Aracı kiralayan sürücünün ehliyet, kimlik ve adres bilgilerini tam doldurun.",
      "Aracın plaka, km ve yakıt seviyesini çıkış esnasında forma kaydedin.",
      "Gövde şablonu üzerinde mevcut ezik, çizik ve kusurları kalemle işaretleyin.",
      "Kiralama ücreti, depozito miktarı ve teslim şartlarını ekleyip ıslak imzalayın."
    ],
    requiredInfoTitle: "Araç Kiralama Sözleşmesinde Hangi Bilgiler Bulunur?",
    requiredInfoContent: [
      "Kiraya Veren ve Kiralayan Taraf Bilgileri",
      "Araç Bilgileri (Plaka, Marka, Model, KM, Yakıt)",
      "Sıralı Ardışık Seri Numarası",
      "Müşteri Ehliyet ve T.C. Kimlik Verileri",
      "Araç Hasar Tespit Gövde Şeması"
    ],
    comparisonTitle: "Otokopili Sözleşme ile Dijital Sözleşme Karşılaştırması",
    comparisonTableRows: [
      { label: "Saha Uyumluluğu", col1: "İnternet bağlantısından bağımsız her ortamda anında ıslak imza ile düzenlenir.", col2: "Mobil çekim alanı veya şarj sorunu olduğunda sözleşmeye erişim kesilir." },
      { label: "Hukuki Geçerlilik", col1: "Çift nüsha ıslak imzalı orijinal belge mahkemelerde tam ispat gücü taşır.", col2: "Yasal olarak tescillenmemiş dijital imzaların takibi ve doğrulanması zordur." },
      { label: "Maliyet", col1: "Tek seferlik çok ekonomik matbaa baskı bedeli ile yüzlerce nüsha basılır.", col2: "Aylık yüksek üyelik kotaları veya yazılım lisans ücretleri gerektirir." }
    ],
    importanceTitle: "Filo Yönetiminde Çift Sayfa Islak İmzanın Önemi",
    importanceContent: "Araç tesliminde ve iadesinde tutulan ıslak imzalı otokopili formlar, müşterinin kiralama süresince işlediği trafik cezaları, kaza hasarları veya geciken iadeler durumunda acentelerin yasal haklarını arayabilmeleri için en sağlam hukuki delildir.",
    otokopiTitle: "Mükemmel Otokopi Kalitesi",
    otokopiContent: "Mavi Basım tarafından ve en son teknoloji araç şablonlarıyla üretilen otokopili kağıt kalitesi sayesinde, kiralama koşullarının bulunduğu küçük puntolu yasal metinler dahi alt surette tamamen temiz ve okunaklı çıkar.",
    faqList: [
      { q: "Araç kiralama sözleşmelerinde minimum sipariş miktarı nedir?", a: "Araç kiralama sözleşmesi baskılarında minimum sipariş miktarı 5 cilttir." },
      { q: "Araç kiralama sözleşmelerine firma logosu basılabilir mi?", a: "Evet, araç kiralama sözleşmelerine firmanızın logosu, iletişim bilgileri ve kurumsal kimlik unsurları eklenebilmektedir." },
      { q: "Araç kiralama sözleşmeleri kaç nüshalı basılabilir?", a: "İhtiyaca göre 2 nüsha, 3 nüsha veya daha fazla nüshalı araç kiralama sözleşmesi üretilebilmektedir." },
      { q: "Araç kiralama sözleşmelerine numaratör basılabilir mi?", a: "Evet, evrak takibini kolaylaştırmak amacıyla numaratörlü baskı uygulanabilmektedir." },
      { q: "Sözleşmenin arkasına kiralama şartları basılabilir mi?", a: "Evet, sözleşmenin arka yüzüne kiralama koşulları, teslim şartları ve diğer yasal maddeler basılabilmektedir." },
      { q: "Hasar tespit şablonu özel olarak hazırlanabilir mi?", a: "Evet, binek araç, SUV, motosiklet, karavan veya ticari araç seçeneklerine uygun özel hasar tespit şablonları hazırlanabilmektedir." },
      { q: "Araç kiralama sözleşmeleri özel tasarlanabilir mi?", a: "Evet, firmanızın ihtiyaçlarına uygun özel tasarımlı araç kiralama sözleşmeleri hazırlanabilmektedir." },
      { q: "Araç kiralama sözleşmeleri hangi kağıda basılmaktadır?", a: "Alt nüshalara bilgilerin net şekilde aktarılabilmesi için kaliteli otokopili kağıtlar kullanılmaktadır." },
      { q: "İstanbul dışına gönderim yapıyor musunuz?", a: "Evet, araç kiralama sözleşmesi siparişleri Türkiye'nin tüm il ve ilçelerine kargo ile gönderilmektedir." },
      { q: "Araç kiralama sözleşmeleri kaç günde basılır?", a: "Tasarım onayının ardından baskı süreci genellikle 3-5 iş günü içerisinde tamamlanarak kargoya teslim edilmektedir." }
    ]
  },
  "gider-makbuzu": {
    seoTitle: "Gider Makbuzu Baskı Fiyatları | Otokopili ve Numaratörlü Gider Makbuzu Basımı",
    seoDescription: "Gider makbuzu baskı fiyatları. Otokopili ve numaratörlü gider makbuzu koçanları. Logolu özel tasarım, hızlı üretim ve Türkiye geneli kargo.",
    breadcrumbTitle: "Gider Makbuzu",
    h1Title: "Gider Makbuzu Baskı Fiyatları | Otokopili ve Numaratörlü Gider Makbuzu",
    subtitle: "Gider makbuzu, işletmelerin gerçekleştirdiği harcamaları ve yapılan ödemeleri kayıt altına almak amacıyla kullanılan önemli bir matbu evraktır. Özellikle ön muhasebe süreçlerinde belge düzeninin sağlanması, yapılan giderlerin takip edilmesi ve şirket içi kayıtların düzenli şekilde arşivlenebilmesi için tercih edilir. Farklı sektörlerde faaliyet gösteren firmalar günlük operasyonlarında gider makbuzu kullanımına ihtiyaç duyabilmektedir.\n\nOtokopili gider makbuzu koçanları, üst nüshaya yazılan bilgilerin alt nüshalara otomatik olarak aktarılmasını sağlayan kendinden karbonlu kağıtlardan üretilir. Bu yapı sayesinde ayrıca karbon kağıdı kullanmaya gerek kalmadan hızlı, temiz ve pratik bir kullanım elde edilir. Birden fazla nüsha oluşturulabilmesi, belge paylaşımını ve arşivleme süreçlerini kolaylaştırır.\n\nNumaratörlü gider makbuzu modellerinde ise her yaprak ardışık sıra numarası ile basılır. Bu sistem, belgelerin düzenli şekilde takip edilmesine yardımcı olurken kayıp veya eksik evrakların tespit edilmesini de kolaylaştırır. 1 asıl + 1 suret veya 1 asıl + 2 suret olarak hazırlanabilen gider makbuzları, farklı ölçü ve tasarım seçenekleriyle üretilebilmektedir.",
    featureImage: "/images/gider-makbuzu/numaratorlu-gider-makbuzu.webp",
    featureImageAlt: "gider makbuzu basım fiyatları",
    gallery: [
      {
        src: "/images/gider-makbuzu/gider-makbuzu-basimi.webp",
        alt: "Logolu gider makbuzu örneği",
        title: "Logolu Gider Makbuzu Örneği",
        desc: "Firma logonuzun ve resmi bilgilerinizin yer aldığı bu tasarım, ödemelerinizi belgelerken kurumsal ciddiyetinizi yansıtır. Genellikle tek renk veya firmanıza özel kurumsal renklerle kaliteli ofset olarak basılmaktadır."
      },
      {
        src: "/images/gider-makbuzu/otokopili-gider-makbuzu.webp",
        alt: "Otokopili gider makbuzu baskı",
        title: "Otokopili Gider Makbuzu Örneği",
        desc: "Kendinden karbonlu otokopi kağıdı kullanılan bu ürün, araya karbon kağıdı koyma zorunluluğunu ortadan kaldırır. Üst nüshaya yazılan tüm veriler alt sayfalara okunaklı ve lekesiz şekilde geçer."
      },
      {
        src: "/images/gider-makbuzu/numaratorlu-gider-makbuzu.webp",
        alt: "Numaratörlü gider makbuzu koçanı",
        title: "Numaratörlü Gider Makbuzu Örneği",
        desc: "Takip kolaylığı sağlayan ardışık seri numaralarına sahip koçanlardır. Finansal denetimlerde ve muhasebe arşivlerinde evrak kaybı riskini tamamen ortadan kaldıran profesyonel numaralandırma sistemiyle üretilir."
      },
      {
        src: "/images/gider-makbuzu/gider-makbuzu-kocani.webp",
        alt: "Gider makbuzu koçanı",
        title: "Gider Makbuzu Koçanı",
        desc: "Üstten tutkallı cilt yapısı ve kolay kopmayı sağlayan perfore (tırtıklı) dikiş hattı ile son derece dayanıklıdır. Dağılmayı önleyen sağlam yapısıyla uzun süre güvenle arşivlenebilir."
      },
      {
        src: "/images/gider-makbuzu/gider-pusulasi-makbuzu-ornegi.webp",
        alt: "14x20 gider makbuzu",
        title: "14x20 Gider Makbuzu Baskı",
        desc: "A5 yarım boy ölçüsüyle (14x20 cm) taşınabilirliği en yüksek modeldir. Hem geniş bir veri giriş alanı sunar hem de çekmece veya çantalarda fazla yer kaplamaz."
      },
      {
        src: "/images/gider-makbuzu/numaratorlu-gider-makbuzu.webp",
        alt: "Kurumsal gider makbuzu tasarımı",
        title: "Kurumsal Gider Makbuzu Tasarımı",
        desc: "Şirketinizin renk skalası ve görsel standartları doğrultusunda hazırlanan bu şablon, matbaa kalitesini artırır. Tamamen firmanızın kullanım alışkanlıklarına göre özel tablolarla şekillendirilir."
      }
    ],
    specifications: [
      { title: "Kağıt Türü", value: "Kendinden Karbonlu (Otokopili) Kağıt" },
      { title: "Ölçü", value: "A5 Yarım Boy (14x20 cm) veya A4 Tam Boy" },
      { title: "Nüsha Sayısı", value: "1 Asıl + 1 Suret (2 Nüsha) veya 1 Asıl + 2 Suret (3 Nüsha)" },
      { title: "Numaratör", value: "Sıralı Ardışık Numaralı Baskı" },
      { title: "Cilt Standardı", value: "Her Ciltte 50 Yaprak Takımı (50 Set)" },
      { title: "Baskı Rengi", value: "Tek Renk (Siyah / Lacivert) veya Çok Renkli Kurumsal Baskı" },
      { title: "Kullanım Amacı", value: "İşletme içi ödemelerin ve harcamaların pratik şekilde belgelenmesi." },
      { title: "Sipariş Miktarı", value: "5 Cilt, 10 Cilt, 20 Cilt, 30 Cilt, 50 Cilt" },
      { title: "Teslim Süresi", value: "Tasarım Onayından Sonra 3 - 5 İş Günü" }
    ],
    whatIsTitle: "Gider Makbuzu Baskı Ürün Özellikleri",
    whatIsContent: "Mavi Basım olarak yüksek kalitede ürettiğimiz gider makbuzu koçanları; otokopili baskı, sıralı numaratör, kolay koparma sağlayan perfore ve dayanıklı ciltleme gibi üstün teknik özelliklerle donatılmış, firmanıza özel tasarlanan profesyonel ürünlerdir.",
    whoUsesTitle: "Gider Makbuzu Koçanlarını Kimler Tercih Eder?",
    whoUsesItems: [
      "Şirketler ve Kurumsal Firmalar",
      "Esnaflar ve KOBİ'ler",
      "Muhasebe ve Finans Departmanları",
      "Mağazalar ve Şirket İçi Kasa Birimleri"
    ],
    usageAreasTitle: "Gider Makbuzu Baskı Avantajları",
    usageAreasItems: [
      { title: "Otokopili Baskı & Logo Baskısı", desc: "Kendinden kopyalı otokopili kağıt üzerine şirketinizin logosu ve bilgileri kurumsal renklerle ofset kalitesinde basılır." },
      { title: "Sıralı Numaratör", desc: "Tüm yapraklar otomatik makinelerle ardışık seri numaralarıyla basılarak hatasız belge takibi yapmanızı sağlar." },
      { title: "Perfore & Ciltleme", desc: "Kolayca yırtılıp koparılabilmesini sağlayan perfore (tırtık) hattı ve dağılmayı önleyen sağlam üstten tutkallı ciltleme." }
    ],
    howToFillTitle: "Gider Makbuzu Tasarımı Nasıl Hazırlanır?",
    howToFillContent: [
      "Firmanızın logosunu, unvanını ve adres bilgilerini şablona ekleyin.",
      "İhtiyacınıza özel tablo alanlarını (tutar, açıklama, ödeme şekli vb.) belirleyin.",
      "Belge takibini kolaylaştırmak için başlangıç numaratör numarasını belirtin."
    ],
    requiredInfoTitle: "Gider Makbuzu Baskısında Neler Bulunur?",
    requiredInfoContent: [
      "Firmanızın kurumsal logosu ve iletişim bilgileri",
      "Seri ve sıra takibi sağlayan otomatik numaratör baskısı",
      "Yaprakların kolayca koparılabilmesi için perfore (tırtık) hattı",
      "Nüshaların dağılmasını önleyen sağlam üstten ciltleme yapısı"
    ],
    importanceTitle: "Otokopili ve Numaratörlü Gider Makbuzu Koçanının Önemi",
    importanceContent: "Düzenli ve kurumsal bir tediye takibi için otokopili ve sıralı numaratörlü gider makbuzu koçanları işletmeler için büyük kolaylık sağlar. Mavi Basım kalitesiyle üretilen koçanlar, hem firmanızın profesyonel imajını yansıtır hem de evraklarınızın düzenli ve kaybolmadan saklanmasını mümkün kılar.",
    otokopiTitle: "Mükemmel Otokopi Baskı Kalitesi",
    otokopiContent: "Mavi Basım tarafından yüksek matbaa kalitesinde üretilen otokopili gider makbuzu modellerimiz, kendinden kopyalı kağıt teknolojisi sayesinde karbon kağıdı gereksinimini ortadan kaldırır. En alt nüshaya bile yazılar tamamen net ve temiz olarak geçer.",
    faqList: [
      {
        q: "Gider Makbuzu Nedir?",
        a: "Gider makbuzu, işletmeler tarafından kullanılan matbu evraklardan biridir. Yapılan ödemelerin ve işlemlerin kayıt altına alınmasına yardımcı olur. İhtiyaca göre otokopili gider makbuzu ve numaratörlü gider makbuzu olarak basılabilmektedir."
      },
      {
        q: "Gider Pusulası Nedir?",
        a: "Gider pusulası, çeşitli ticari işlemlerin belgelendirilmesinde kullanılan resmi evraklardan biridir. İşletmeler tarafından çeşitli ticari işlemlerin belgelendirilmesinde kullanılabilmektedir. Kullanım şekli ilgili mevzuata göre değişiklik gösterebilir."
      },
      {
        q: "Gider Makbuzu ile Gider Pusulası Aynı Mıdır?",
        a: "Bu iki belge günlük kullanımda zaman zaman birbirinin yerine kullanılsa da aynı belge değildir. Kullanım amacı ve düzenlenme şekilleri farklılık gösterebilir."
      },
      {
        q: "Gider Makbuzu Kaç Nüsha Olarak Basılır?",
        a: "Gider makbuzları genellikle 1 Asıl + 1 Suret veya 1 Asıl + 2 Suret olarak üretilmektedir. Talebe göre farklı nüsha seçenekleri de hazırlanabilmektedir. Otokopili baskı sayesinde tüm nüshalar tek seferde doldurulabilir."
      },
      {
        q: "Gider Makbuzunda Hangi Bilgiler Bulunmalıdır?",
        a: "Standart gider makbuzu tasarımlarında firma bilgileri, tarih alanı, seri ve sıra numarası, açıklama bölümü, tutar alanları ve imza bölümleri bulunabilir. İşletmenin ihtiyaçlarına göre özel alanlar da eklenebilmektedir."
      },
      {
        q: "Numaratörlü Gider Makbuzu Nedir?",
        a: "Numaratörlü gider makbuzu, her yaprağında sıralı numara bulunan baskı türüdür. Evrak takibini kolaylaştırır ve belge düzeninin korunmasına yardımcı olur. Özellikle yoğun evrak kullanan işletmeler tarafından tercih edilmektedir."
      },
      {
        q: "Gider Makbuzu Fiyatları Nasıl Belirlenir?",
        a: "Gider makbuzu fiyatları; baskı adedi, nüsha sayısı, cilt miktarı, baskı özellikleri ve tasarım taleplerine göre değişiklik gösterebilir. Numaratörlü gider makbuzu ve otokopili gider makbuzu seçenekleri fiyatlandırmayı etkileyebilir."
      },
      {
        q: "Gider Makbuzu Kaç Günde Teslim Edilir?",
        a: "Grafik tasarım onayının ardından üretim süreci genellikle 3-5 iş günü içerisinde tamamlanmaktadır. Teslimat süresi kargo firması ve gönderim adresine göre değişiklik gösterebilir."
      }
    ]
  },
  "giris-bileti": {
    seoTitle: "Numaratörlü Giriş Bileti / Etkinlik Bileti Baskısı | Mavi Basım",
    seoDescription: "Etkinlik, konser, sinema ve tiyatrolar için seri numaralı koçanlı giriş bileti basımı. 1. sınıf hamur kağıt, kolay koparılabilir perforeli bilet fiyatları.",
    breadcrumbTitle: "Giriş Bileti",
    h1Title: "Numaratörlü Giriş ve Etkinlik Bileti",
    subtitle: "Konser, tiyatro, müze, kulüp girişleri, çekilişler ve okul etkinlikleri için kolay koparılabilir tırtıklı (perforeli) biletler basıyoruz.",
    featureImage: "/images/giris-bileti/numaratorlu-giris-bileti-baski.webp",
    featureImageAlt: "etkinlik bilet basımı",
    gallery: [
      {
        src: "/images/giris-bileti/etkinlik-giris-bileti-baski.webp",
        alt: "Etkinlik giriş bileti",
        title: "Perforeli (Tırtıklı) Yapı",
        desc: "Biletin sol koçan kısmının müşteride, sağ dip koçan kısmının kasada kalmasını sağlayan kolay yırtma çizgisi."
      },
      {
        src: "/images/giris-bileti/giris-bileti-kocani.webp",
        alt: "Konser giriş bileti koçanı",
        title: "Sıralı Çift Numaratör",
        desc: "Biletin hem giren kişideki yaprağında hem de dip koçanında aynı seri numarasının yer aldığı çift yönlü güvenlik."
      },
      {
        src: "/images/giris-bileti/konser-giris-bileti-ornegi.webp",
        alt: "Etkinlik bilet örneği",
        title: "Renkli Baskı Seçeneği",
        desc: "Konser veya festivalin reklamını yapabileceğiniz, görsellerinizi yüksek kalitede yansıtan estetik kağıt baskısı."
      }
    ],
    specifications: [
      { title: "Kağıt Türü", value: "80 gr - 120 gr 1. Sınıf Hamur veya Kuşe Kağıt" },
      { title: "Ölçü", value: "14 x 20 cm veya Kişiselleştirilmiş Özel Dar Boylar" },
      { title: "Numaratör", value: "Çift Başlı Otomatik Sıralı Seri Numaralı" },
      { title: "Perforaj (Tırtık)", value: "Kolay Koparmak İçin 1 veya 2 Kırımlı Perfore Hattı" },
      { title: "Cilt Standardı", value: "Her Ciltte 100 Yaprak Bilet" },
      { title: "Baskı Rengi", value: "Tek Renk Ekonomik veya Albenili Tam Renkli CMYK" },
      { title: "Kullanım Amacı", value: "Kontrollü kapı girişi, çekiliş, konser ve özel davetler." },
      { title: "Min Sipariş", value: "5 Cilt (500 Yaprak)" },
      { title: "İmalat Süresi", value: "Tasarım Onayından Sonra 3 - 5 İş Günü" }
    ],
    whatIsTitle: "Giriş Bileti Baskısı Nedir?",
    whatIsContent: "Giriş bileti, etkinlik veya organizasyon alanlarına davetlilerin kontrollü bir şekilde girmesini sağlayan, üzerinde çift taraflı sıralı numaratör ve perfore yırtma hattı bulunan, sahteciliği zorlaştıran koçanlı matbaa ürünüdür.",
    whoUsesTitle: "Giriş Biletlerini Kimler Tercih Eder?",
    whoUsesItems: ["Konser ve Festival Organizatörleri", "Tiyatro, Sinema ve Sergi Salonları", "Makedonya / Dernek Davetleri", "Okul Çayları ve Mezuniyet Komiteleri", "Gece Kulüpleri ve Eğlence Mekanları", "Çekiliş ve Piyango Düzenleyen Kurumlar"],
    usageAreasTitle: "Göz Alıcı Giriş Biletlerinin Avantajları",
    usageAreasItems: [
      { title: "Kapı Giriş Kontrolü", desc: "Sıralı numaralar sayesinde kapıdan kaç kişinin giriş yaptığını net bir şekilde saymanızı ve denetlemenizi sağlar." },
      { title: "Sahtecilik Engeli", desc: "Matbaa kalıplarımızda basılan numaratörlü seri sistemi, sıradan yazıcı fotokopisiyle bilet çoğaltılmasını imkansız hale getirir." },
      { title: "Reklam Alanı", desc: "Biletin ön yüzeyine sponsor logoları koyarak organizasyon maliyetinizi hafifletebilirsiniz." }
    ],
    howToFillTitle: "Giriş Bileti Şablonu Nasıl Kurgulanır?",
    howToFillContent: [
      "Etkinliğin adı, tarihi, saati ve mekanı biletin merkezine büyük harflerle yazılır.",
      "Sol kısma biletin ücreti net bir şekilde eklenir.",
      "Perfore (tırtık) hattının hem sol hem sağ tarafına aynı sıralı numaratör konumlandırılır.",
      "Kapıdaki görevli bileti tırtık çizgisinden ikiye bölerek kontrol dipçiğini kutuya atar."
    ],
    requiredInfoTitle: "Bir Giriş Biletinde Olması Gerekenler",
    requiredInfoContent: [
      "Organizasyon Adı, Tarihi, Başlangıç Saati ve Mekan Detayı",
      "Seri Numaratörü (Hem bilette hem dip koçanda)",
      "Bilet Fiyatı (Ücretli ise) veya Davetiye Notu",
      "Giriş Şartları, Yaş Sınırı ve İade Kurallarını içeren Arka Yüz Notu"
    ],
    comparisonTitle: "Fiziksel Perforeli Bilet ile QR Kodlu Bilet Karşılaştırması",
    comparisonTableRows: [
      { label: "Hatıra Değeri", col1: "Etkinlik sonrasında katılımcılar tarafından yıllarca anı olarak saklanır.", col2: "Telefonda silinir gider, kalıcı bir hatıra hissi bırakmaz." },
      { label: "Giriş Hızı", col1: "Yırt-geç tekniğiyle kapıda saniyede 1 kişi geçebilir.", col2: "QR kod okuyucu kameranın odaklanmasını ve internet bağlantısını bekler, yavaşlama yapar." },
      { label: "Mali Güvenlik", col1: "Arşiv dip koçanı fiziki kasa denetimini %100 sağlar.", col2: "Yazılımsal hata ve veritabanı çökmelerinde bilet doğrulanamayabilir." }
    ],
    importanceTitle: "Etkinlik Güvenliğinde Çift Numaratörün Rolü",
    importanceContent: "Dip koçanlı giriş biletlerinde çift koldan numaratör basılması zorunludur. Bilet yırtıldığında dipçikte ve bilette kalan numaraların birbiriyle eşleşmesi, kapı görevlilerinin bilet satmadan kapıdan el altından insan almasını engelleyen en etkili fiziki güvenlik duvarıdır.",
    otokopiTitle: "Perforaj (Tırtık) Teknolojisi",
    otokopiContent: "Biletlerin kolayca yırtılması, misafirlerin kapıda bekletilmemesi için milimetrik yırtılma çizgisi olan perforaj işlemi matbaa makinelerimizde özel bıçaklar vasıtasıyla pürüzsüzce açılmaktadır.",
    faqList: [
      { q: "Giriş bileti üzerine kendi tasarımımı bastırabilir miyim?", a: "Evet, etkinlik, konser, organizasyon veya çekilişleriniz için hazırladığınız tasarımlar giriş biletlerine yüksek kaliteli baskı ile uygulanabilmektedir." },
      { q: "Giriş biletlerine numara basılabilir mi?", a: "Evet, bilet takibini kolaylaştırmak amacıyla sıralı numaralandırma yapılabilmektedir." },
      { q: "Giriş biletleri çekiliş kuponu olarak kullanılabilir mi?", a: "Evet, perforajlı yapısı sayesinde bir bölümü katılımcıda kalırken diğer bölümü çekiliş veya kontrol amaçlı kullanılabilmektedir." },
      { q: "Giriş biletlerinde perforaj uygulanabilir mi?", a: "Evet, kolay koparılabilmesi için giriş biletlerine perforaj uygulanabilmektedir." },
      { q: "Giriş bileti baskısında minimum sipariş miktarı nedir?", a: "Giriş bileti baskılarında minimum sipariş miktarı 5 cilttir." },
      { q: "Giriş biletleri hangi ölçülerde basılabilir?", a: "Standart ölçülerin yanı sıra etkinliğinize uygun özel ebatlarda giriş bileti baskısı yapılabilmektedir." },
      { q: "Giriş biletleri kaç yapraklı ciltler halinde hazırlanır?", a: "Kullanım amacına göre farklı adetlerde hazırlanabilmekle birlikte en yaygın tercih edilen seçenekler 50 ve 100 yapraklı ciltlerdir." },
      { q: "Renkli giriş bileti baskısı yapılabilir mi?", a: "Evet, giriş biletleri tek renk veya çok renkli olarak basılabilmektedir." },
      { q: "İstanbul dışına gönderim yapıyor musunuz?", a: "Evet, giriş bileti siparişleri Türkiye'nin tüm il ve ilçelerine kargo ile gönderilmektedir." },
      { q: "Giriş bileti baskısı kaç günde tamamlanır?", a: "Tasarım onayının ardından giriş bileti baskıları genellikle 3-5 iş günü içerisinde tamamlanarak kargoya teslim edilmektedir." }
    ]
  },
  "recete": {
    seoTitle: "Reçete Baskı Fiyatları 2026 | Numaratörlü Reçete Koçanı Baskısı",
    seoDescription: "Sağlık kuruluşlarına özel numaratörlü reçete koçanı baskısı. 14x20 cm ve A5 ölçülerde, otokopili veya 1. hamur reçete baskı seçenekleri.",
    breadcrumbTitle: "Reçete",
    h1Title: "Reçete Baskı Fiyatları ve Reçete Koçanı Baskısı",
    subtitle: "Kurumsal kullanım ihtiyaçlarına yönelik logolu, numaratörlü ve otokopili reçete koçanı baskı çözümleri.",
    featureImage: "/images/recete/numaratorlu-recete-basimi.webp",
    featureImageAlt: "numaratörlü reçete koçanı baskısı",
    gallery: [
      {
        src: "/images/recete/doktor-recetesi-basimi.webp",
        alt: "kurumsal reçete koçanı baskısı",
        title: "1. Sınıf Hamur Kağıt",
        desc: "Yazı yazmaya uygun 1. kalite 80gr hamur kağıt yapısı."
      },
      {
        src: "/images/recete/recete-ornegi-doktor.webp",
        alt: "numaratörlü reçete koçanı baskısı",
        title: "Örnek Matbu Düzen",
        desc: "Örnek koçan tasarımı yalnızca yerleşim düzenini göstermek amacıyla sunulmuştur."
      },
      {
        src: "/images/recete/otokopili-recete-baski.webp",
        alt: "otokopili reçete koçanı baskısı",
        title: "Otokopili Çift Nüsha",
        desc: "Otokopili seçenekler, kullanıcıların kendi iş akışlarına uygun olarak tercih edilebilir."
      }
    ],
    specifications: [
      { title: "Ölçü", value: "14,8 x 21 cm (A5 Ebadı) veya 14 x 20 cm (Yarım Boy)" },
      { title: "Kağıt Türü", value: "80 gr 1. Hamur Beyaz Kağıt veya Otokopili (Çift Nüsha)" },
      { title: "Sayfa / Yaprak", value: "50 Yaprak veya 100 Yaprak Cilt seçeneği" },
      { title: "Baskı Yönü", value: "Tek Yön Baskı" },
      { title: "Baskı Rengi", value: "1 Renk Siyah veya 4 Renk CMYK Kurumsal Renkli" },
      { title: "Cilt & Bitiş", value: "Üstten Tutkallı Bloknot veya Perforasyonlu (Tırtıklı) Cilt" },
      { title: "Numaratör", value: "Sıralı Özel Seri No (İsteğe Bağlı)" },
      { title: "Özel Tasarım", value: "Sağlık kuruluşlarının kurumsal taleplerine uygun tasarımlar hazırlanmaktadır." },
      { title: "Minimum Miktar", value: "5 Cilt" },
      { title: "Üretim & Teslimat", value: "3 - 5 İş Günü" }
    ],
    whatIsTitle: "Reçete Koçanı Baskısı Nedir ve Nerelerde Kullanılır?",
    whatIsContent: "Reçete koçanları, kurumların fiziki arşiv, bilgilendirme ve kurum içi kayıt süreçlerinde kullanılan basılı matbuat ürünleridir.",
    whoUsesTitle: "Reçete Koçanı Baskısının Kullanıldığı Sektörler",
    whoUsesItems: ["Özel Klinikler", "Poliklinikler", "Sağlık Merkezleri", "Diş Klinikleri", "Fizik Tedavi ve Tanı Merkezleri"],
    usageAreasTitle: "Reçete Koçanı Baskısının Avantajları",
    usageAreasItems: [
      { title: "Kurumsal Düzen", desc: "Kurumsal standartlara uygun hazırlanan basılı evraklar evrak takibinde kolaylık sağlar." },
      { title: "Marka İmajı", desc: "Kliniğin logosunu ve iletişim bilgilerini taşıyan tasarımlar kurumsal görünümü pekiştirir." },
      { title: "İş Akışına Uygunluk", desc: "Otokopili seçenekler, kullanıcıların kendi iş akışlarına uygun olarak tercih edilebilir." }
    ],
    howToFillTitle: "",
    howToFillContent: [],
    requiredInfoTitle: "",
    requiredInfoContent: [],
    comparisonTitle: "1. Hamur Reçete ile Otokopili Reçete Baskı Farkı",
    comparisonTableRows: [
      { label: "Kullanım Özelliği", col1: "Tek nüshadır.", col2: "Otokopili seçenekler, kullanıcıların kendi iş akışlarına uygun olarak tercih edilebilir." },
      { label: "Kağıt Özelliği", col1: "80gr 1. hamur kaliteli kağıttır.", col2: "Otokopi kağıdıdır, tükenmez kalemle yazıma uygundur." },
      { label: "Yaprak Adedi", col1: "Her ciltte 100 yaprak bulunur.", col2: "Her ciltte 50 takım (toplam 100 sayfa) yer alır." }
    ],
    importanceTitle: "Sağlık Kuruluşlarına Özel Reçete Koçanı Baskı Çözümleri",
    importanceContent: "Özel muayenehaneler, klinikler ve sağlık kuruluşlarının kurumsal matbuat ihtiyaçlarına yönelik üretilmektedir.",
    otokopiTitle: "Tutkallı ve Perforeli Reçete Koçanı Seçenekleri",
    otokopiContent: "Reçete koçanlarımızı isteğe göre kolay yırtılabilen perforeli veya tutkallı bloknot ciltli olarak hazırlıyoruz.",
    faqList: [
      { q: "Reçete koçanları numaratörlü basılabilir mi?", a: "Evet, evrak takibini kolaylaştırmak amacıyla reçete koçanlarına sıralı numaratör basılabilmektedir." },
      { q: "Reçete baskısı kaç iş gününde teslim edilir?", a: "Tasarım onayının ardından ortalama 3-5 iş günü içerisinde baskı tamamlanarak kargoya teslim edilir." },
      { q: "Reçetelerde logo kullanılabilir mi?", a: "Evet, unvan, klinik logosu, adres ve iletişim bilgileri tasarıma dahil edilebilir." },
      { q: "Reçete koçanları otokopili hazırlanabilir mi?", a: "Evet, isteğe bağlı olarak tek nüsha 1. hamur kağıda veya kendinden kopyalı çift nüsha otokopili kağıda basılabilmektedir." },
      { q: "Minimum sipariş adedi nedir?", a: "Reçete koçanı baskısında minimum üretim miktarı 5 cilttir." },
      { q: "Reçete koçanları hangi ölçülerde hazırlanır?", a: "Standart olarak A5 (14,8 x 21 cm) ve yarım boy (14 x 20 cm) ebatlarında imal edilmektedir." },
      { q: "Reçete kağıdı örneği gönderebilir misiniz?", a: "Evet, tasarım sürecinde kurumunuza özel hazırlanan reçete kağıdı örneği ve şablonu dijital olarak onayınıza sunulmaktadır." },
      { q: "Doktor reçetesi baskısında hangi bilgiler bulunmalıdır?", a: "Doktor reçetesi baskısında kurum/doktor unvanı, iletişim ve adres bilgileri, tarih, hasta adı-soyadı, tanı/reçete alanı ve imza/kaşe bölümü yer alır." },
      { q: "Reçete baskısında özel ölçü üretimi yapılabilir mi?", a: "Evet, standart A5 ve yarım boy ölçülerin dışında 9x21 cm, 10x20 cm gibi özel ebatlarda da üretim yapılabilmektedir." },
      { q: "Doktor promosyon reçetesi hangi ölçülerde basılır?", a: "Doktor promosyon reçeteleri genellikle 9x21 cm, 10x20 cm, 14x20 cm ve A5 (14,8x21 cm) ölçülerinde üretilmektedir." },
      { q: "İstanbul dışına kargo gönderimi yapıyor musunuz?", a: "Evet, online siparişleriniz Türkiye'nin tüm il ve ilçelerine kargo ile ulaştırılmaktadır." }
    ]
  },
  "senet": {
    seoTitle: "Borç Senedi ve Numaratörlü Senet Defteri Basımı | Mavi Basım",
    seoDescription: "Otokopili veya 1. hamur kağıda numaratörlü borç senedi defteri ve koçanı baskısı. Özel tasarımlı kurumsal senet basımı en uygun matbaa fiyatlarıyla.",
    breadcrumbTitle: "Senet",
    h1Title: "Numaratörlü Borç Senedi Baskısı",
    subtitle: "Mağazalar, galeriler, elden taksitle satış yapanlar için yasal haklarınızı koruyan, numaratörlü otokopili senet koçanları basıyoruz.",
    featureImage: "/images/senet/senet-defteri-baski.webp",
    featureImageAlt: "senet basimi fiyatlari",
    gallery: [
      {
        src: "/images/senet/borc-senedi-ornegi.webp",
        alt: "Borç senedi örneği",
        title: "Yasal Mevzuata Tam Uygun",
        desc: "Türk Ticaret Kanunu senet formatına, kefil, tediye tarihi, ödeme yeri ve imza alanlarına %100 uyumlu hatasız mizanpaj."
      },
      {
        src: "/images/senet/senet-basimi-fiyatlari.webp",
        alt: "Senet basım fiyatları",
        title: "Çift Nüsha Kopyalı",
        desc: "Otokopili yapısıyla senedin aslı kasada saklanırken bir kopyasının müşteriye teslim edilmesini sağlayan yapı."
      },
      {
        src: "/images/senet/senet-kocani-ornegi.webp",
        alt: "Senet defteri koçanı",
        title: "Sıralı Senet Arşivi",
        desc: "Senetlerin taksit takibini kolaylaştıran, protestolu senet takibini saniyeler içinde yapmanızı sağlayan seri numaralı numaratör."
      }
    ],
    specifications: [
      { title: "Ölçü", value: "14 x 20 cm (İdeal Cilt Boyutu)" },
      { title: "Kağıt Türü", value: "80 gr 1. Hamur Kalın Kağıt veya Otokopili" },
      { title: "Nüsha Sayısı", value: "Tek Nüsha ya da 1 Asıl + 1 Suret (Otokopili)" },
      { title: "Numaratör", value: "Taksit ve Dosya Takibi İçin Sıralı Seri Numaralı" },
      { title: "Cilt Standardı", value: "Her Ciltte 50 Takım (Otokopili) veya 100 Tek Sayfa (1. Hamur)" },
      { title: "Tasarım", value: "Kurumsal Logo, Firma Bilgileri ve İstenen Banka Bilgileri Entegrasyonu" },
      { title: "Baskı Rengi", value: "Siyah veya Kurumsal Renk" },
      { title: "Kargo", value: "Türkiye Geneline Teslimat" },
      { title: "İmalat Süresi", value: "3 - 5 İş Günü" }
    ],
    whatIsTitle: "Kurumsal Senet Baskısı Nedir?",
    whatIsContent: "Senet (Bonolar), alacaklının borçludan senede bağlı bir alacağına istinaden vadesinde ödeme almasını sağlayan, kıymetli bir evraktır. Kurumsal senet basımı, bu evrağın firmanızın bilgileriyle basılmasıdır.",
    whoUsesTitle: "Senet Defterlerini Kimler Kullanır?",
    whoUsesItems: ["Elden Taksitli Satış Yapan Sürücü Kursları", "Beyaz Eşya ve Mobilya Mağazaları", "Araç Alım Satım Galerileri", "Senetli İnşaat Projeleri / Müteahhitler", "Toptan Mal Dağıtan Fabrikalar", "Eğitim ve Etüt Merkezleri"],
    usageAreasTitle: "Senet Koçanı Tercih Etme Nedenleri",
    usageAreasItems: [
      { title: "Alacak Takip Gücü", desc: "Senet, alacakların düzenli takip edilmesini ve belgelenmesini kolaylaştıran bir ödeme takas planı sunar." },
      { title: "Taksitlendirme Pratikliği", desc: "Müşterinin taksitleri için sıralı numaratörlü senetler düzenlenerek düzenli ödeme planı kurgulanır." },
      { title: "Tahsilat Kolaylığı", desc: "Vadesi gelen senedin bankaya ciro edilmesi veya kasadan elden teslim edilip müşteriye iade edilmesi işlemlerini düzenli hale getirir." }
    ],
    howToFillTitle: "Senet Nasıl Doldurulur?",
    howToFillContent: [
      "Vade tarihi (tediye günü) yardımıyla senedin net tutarı rakamla yazılır.",
      "Borçlunun adı, soyadı, T.C. Kimlik numarası, adresi ve telefon bilgileri girilir.",
      "Tutar kısmı yazı ile baştan ve sondan kapatılarak yazılır.",
      "Borçlunun el yazısıyla imza atmasıyla düzenleme işlemi tamamlanır."
    ],
    requiredInfoTitle: "Bir Senedin Hukuken Geçerli Olması İçin Bulunması Gerekenler",
    requiredInfoContent: [
      "Belge üzerinde mutlaka 'Bono' veya 'Emre Yazılı Senet' ibaresinin yer alması",
      "Kayıtsız ve şartsız belirli bir bedeli ödeme vaadi",
      "Vade tarihi, düzenleme tarihi ve düzenleme yeri",
      "Borçlunun İmzası, T.C. Kimlik No ve Alacaklı Firmanın Firma Ünvanı"
    ],
    comparisonTitle: "Senetli Satış ile Kredi Kartı Taksitli Satış Karşılaştırması",
    comparisonTableRows: [
      { label: "Banka Komisyonu", col1: "Sıfır komisyondur, bankalara komisyon veya pos kesintisi verilmez.", col2: "Banka tarafından oranlara göre ciro komisyonları kesilir." },
      { label: "Limit Standardı", col1: "Müşterinin kredi kartı limitinden bağımsız, belirlenen limitler tanımlanabilir.", col2: "Müşterinin aktif kredi kartı limitiyle sınırlıdır." },
      { label: "Tahsilat Vadesi", col1: "Vadeler geldikçe ödeme alınarak nakit girişi sağlanır.", col2: "Banka blokaj süresine göre para bloke edilir veya komisyonla erken çözülür." }
    ],
    importanceTitle: "Sürücü Kursu ve Özel Okullarda Taksitli Senet Kullanımı",
    importanceContent: "Eğitim dönemleri boyunca aylık taksit ödeyen kursiyerler ve veliler için, her taksite özel logolu ve ardışık numaratörlü senetlerin düzenlenmesi, hem okul muhasebesinin taksit takibini kolaylaştırır hem de velilere her ödeme sonrasında senetlerini teslim ederek şeffaf bir mutabakat ortamı sunar.",
    otokopiTitle: "Mavi Basım Senet Ciltlerinin Özellikleri",
    otokopiContent: "Senetlerimizin koçandan koparıldığı hattı çok hassas perfore (yırtma tırtığı) ile üretiyoruz. Bu sayede senet yırtılırken diğer kısımlara zarar verilmeden, pürüzsüzce dosyadan ayrılır.",
    faqList: [
      { q: "Senedin borçlu kısmının altına kefil alanı ekleniyor mu?", a: "Evet. Şablonlarımıza isteğiniz üzere kefil imza ve sorumluluk alanlarını entegre etmekteyiz." },
      { q: "Senetlerin pul yapıştırılan alanı var mı?", a: "Evet, şablonlarımızda geleneksel veya isteğe bağlı olarak damga pulu çerçevesi bulundurmaktayız." },
      { q: "Senet defterini kaç günde basıyorsunuz?", a: "Tasarım detaylarında anlaştıktan sonra 3-4 iş günü gibi kısa bir sürede basım ve dikişli ciltleme işlemlerini bitirip size sevk ediyoruz." }
    ]
  },
  "tahsilat-ve-tediye-makbuzu": {
    seoTitle: "Tediye Makbuzu Baskı Fiyatları 2026 | Numaratörlü ve Otokopili",
    seoDescription: "Numaratörlü ve otokopili tediye makbuzu baskı fiyatları. 14x20 cm A5 ölçü, ücretsiz tasarım, PDF prova ve Türkiye geneli hızlı teslimat.",
    breadcrumbTitle: "Tediye Makbuzu",
    h1Title: "Numaratörlü ve Otokopili Tediye Makbuzu Baskı Fiyatları",
    subtitle: "Ücretsiz Word, Excel ve PDF örnekleri inceleyebilir, firmanıza özel numaratörlü ve otokopili tediye makbuzu baskısı için bizimle iletişime geçebilirsiniz.",
    featureImage: "/images/tediye-makbuzu/tediye-baski.webp",
    featureImageAlt: "Tediye makbuzu basimi",
    gallery: [
      {
        src: "/images/tediye-makbuzu/kendinden-karbonlu-tediye-makbuzu.webp",
        alt: "Kendinden karbonlu tediye makbuzu",
        title: "Otokopili Kağıt Yapısı",
        desc: "Kendinden karbonlu tediye makbuzu kağıt yapısı ile nüshalar arası net yazı aktarımı."
      },
      {
        src: "/images/tediye-makbuzu/tediye-makbuzu-kocani.webp",
        alt: "Tediye makbuzu koçanı",
        title: "Doldurulmuş Örnek Makbuz",
        desc: "Matbaamızda basılan tediye makbuzu koçanı örnek doldurma alanları ve seri numaralı görünümü."
      },
      {
        src: "/images/tediye-makbuzu/tediye-makbuzu-ornegi.webp",
        alt: "14x20 cm tediye makbuzu örneği",
        title: "Kurumsal Logolu Baskı",
        desc: "A5 boyutunda 14x20 cm tediye makbuzu kurumsal logolu ve özel tasarımlı baskı örneği."
      }
    ],
    specifications: [
      { title: "Ölçü", value: "14 x 20 cm (Yarım Boy)" },
      { title: "Kağıt Türü", value: "Otokopili Kendinden Carbonlu" },
      { title: "Cilt İçeriği", value: "Her Cilt 50 Takım" },
      { title: "Numaratör", value: "Otomatik Seri Numaralı" },
      { title: "Nüsha Seçenekleri", value: "1 Asıl + 1 Suret veya 1 Asıl + 2 Suret" },
      { title: "Cilt Seçenekleri", value: "5 Cilt, 10 Cilt, 20 Cilt, 30 Cilt, 50 Cilt" },
      { title: "Baskı Rengi", value: "Siyah veya Kurumsal Renk" },
      { title: "Kullanım Alanı", value: "Personel ödemeleri, cari hesap ödemeleri, tedarikçi ödemeleri ve kasa çıkış işlemleri." },
      { title: "Teslimat", value: "3-5 İş Günü" }
    ],
    whatIsTitle: "Tediye Makbuzu Nedir?",
    whatIsContent: "Tediye kelimesi, Arapça kökenli olup \"ödeme yapmak\" anlamına gelmektedir. Muhasebe ve ticari hayatta ise işletmelerin kasalarından çıkan nakit ödemeleri ifade etmek amacıyla kullanılmaktadır.\n\nTediye makbuzu, işletmelerde kasadan yapılan nakit ödemelerin kayıt altına alınması için kullanılan resmi bir muhasebe evrakıdır. Personel ödemeleri, cari hesap ödemeleri, tedarikçi ödemeleri ve kasa çıkış işlemlerinde kullanılır. Otokopili ve numaratörlü olarak basılan tediye makbuzları, yapılan ödemenin belgelenmesini ve arşivlenmesini sağlar.\n\nMavi Basım olarak İstanbul'daki üretim tesisimizde 14x20 cm A5 ölçülerinde kendinden karbonlu, seri numaralı ve kurumsal logolu tediye makbuzu koçanı üretimi yapıyoruz.",
    whoUsesTitle: "Kimler Kullanır?",
    whoUsesItems: ["Muhasebe Birimleri", "Mali Müşavirlik Ofisleri", "Üretim Firmaları", "Toptancılar", "Distribütörler", "Lojistik Firmaları", "İnşaat Firmaları", "Taşeron Firmalar", "Tedarikçi Ödemesi Yapan İşletmeler", "Cari Hesap Takibi Yapan Firmalar"],
    usageAreasTitle: "Tediye Makbuzu Kullanım Alanları",
    usageAreasItems: [
      { title: "Personel ödemeleri", desc: "Çalışanlara elden verilen avanslar, harçlıklar ya da maaşların elden ödenmesi durumunda nakit çıkışını kayıt altına almak amacıyla düzenlenir." },
      { title: "Cari hesap ödemeleri", desc: "Müşteriler veya iş ortakları ile yürütülen ticari ilişkilerde cari hesap mutabakatı ve borç kapatma süreçlerinde kasadan elden ödenen tutarları kayıt altında tutar." },
      { title: "Tedarikçi ödemeleri", desc: "Mal veya hizmet alımı yapılan tedarikçilere kasadan yapılan elden ödemelerin her iki taraf için de belgelenmesini sağlar." },
      { title: "Kasa çıkış işlemleri", desc: "Şirketin günlük küçük ofis harcamaları, kurye ödemeleri veya anlık nakit ihtiyaçları gibi her türlü genel kasa çıkış işlemleri sırasında resmi kayıtlara dayanak oluşturur." },
      { title: "Elden yapılan ödemeler", desc: "Herhangi bir banka kanalı kullanılmadan doğrudan muhataba nakit olarak teslim edilen tüm elden yapılan ödemeler esnasında ödemenin kayıt altına alınması amacıyla düzenlenir." }
    ],
    howToFillTitle: "Tediye Makbuzu Nasıl Doldurulur?",
    howToFillContent: [
      "Tediye makbuzu nakit hareketlerinin kayıt altına alınmasında kullanılır.",
      "Düzenleme esnasında belirli alanların doldurulması, kayıtların düzenli tutulmasına yardımcı olur.",
      "İlk aşamada, her tediye makbuzu koçanı üzerinde yer alan makbuz numarası alanı kontrol edilmelidir. Bu seri numarası evrakların takip edilmesine yardımcı olur.",
      "İkinci adım olarak tediye tarihi bilgisi gün, ay ve yıl formatında yazılmalıdır. Tediye tarihi, ödemenin gerçekleştirildiği günü ifade eder. Tediye makbuzlarında tarih bilgisi; muhasebe kayıtlarının, arşivleme süreçlerinin ve ödeme takibinin doğru yapılabilmesi açısından önem taşır.",
      "Son aşamada ödeyen ve ödeme alan taraf bilgileri, ödeme tutarı hem rakamla hem yazıyla ve açıklaması ile birlikte eksiksiz doldurularak karşılıklı imzalanır."
    ],
    requiredInfoTitle: "Tediye Makbuzunda Bulunması Gereken Bilgiler",
    requiredInfoContent: [
      "Tediye makbuzunda seri ve sıra numarası bulunabilir.",
      "İkinci olarak, belgenin tanzim edildiği anı gösteren düzenleme tarihi yer almalıdır.",
      "Diğer taraftan ödeyen bilgileri, yani parayı kasasından çıkaran işletmenin ünvanı, adresi ve vergi dairesi/numarası gibi detaylar bulunmalıdır.",
      "Ödeme alan bilgileri kısmında ise parayı teslim alan şahsın adı soyadı ya da firmanın firma ünvanı yazılı olmalıdır."
    ],
    comparisonTitle: "Tediye Makbuzu ile Tahsilat Makbuzu Arasındaki Fark",
    comparisonTableRows: [
      { label: "Para çıkışı", col1: "Kasadan para çıkışı gerçekleştiğinde düzenlenir", col2: "Para çıkışıyla ilgisi yoktur, parayı alan taraf düzenler" },
      { label: "Para girişi", col1: "Para girişiyle ilgisi yoktur", col2: "İşletme kasasına nakit girişi olduğunda düzenlenir" },
      { label: "Kullanım amacı", col1: "Yapılan ödemelerin elden teslim edildiğini belgeleme", col2: "Alınan ödemelerin elden teslim alındığını belgeleme" },
      { label: "Muhasebe kaydı", col1: "Kasa borç hanesinde değil, borçlu hesaplara veya giderlere alacak kaydı", col2: "Kasa hesabına borç, ödeme yapan tarafa alacak kaydı" },
      { label: "Düzenleyen taraf", col1: "Ödemeyi yapan (parayı teslim eden) işletme", col2: "Ödemeyi alan (parayı tahsil eden) işletme" }
    ],
    importanceTitle: "Numaratörlü Tediye Makbuzu Neden Kullanılır?",
    importanceContent: "Seri numaraları makbuzların takip edilmesini kolaylaştırır.",
    otokopiTitle: "Otokopili Tediye Makbuzu Nedir?",
    otokopiContent: "Otokopili tediye makbuzu, alt nüshalara yazı geçirmek için araya karbon kağıdı koymadan alt nüshalara yazı aktarılmasını sağlayan özel kimyasal kaplamalı kağıtlardan üretilen bir makbuz türüdür.",
    faqList: [
      { q: "Tediye makbuzu kaç yıl saklanmalıdır?", a: "Tediye makbuzları ve muhasebe belgeleri, Vergi Usul Kanunu uyarınca 5 yıl, Türk Ticaret Kanunu uyarınca ise 10 yıl süreyle saklanmalıdır." },
      { q: "Tediye makbuzu noter onaylı olur mu?", a: "Tediye makbuzları genel olarak şirket içi ve cari ödeme kayıtlarında kullanılan matbu evraklar olup noter onayı zorunluluğu bulunmamaktadır." },
      { q: "Tediye makbuzu tek nüsha düzenlenebilir mi?", a: "Tediye makbuzları en az 2 nüsha (1 asıl + 1 suret) olarak düzenlenmelidir. Bir nüsha parayı teslim alana verilirken diğer nüsha koçanda kalarak muhasebede arşivlenir." },
      { q: "Tediye makbuzu ile ödeme ispat edilir mi?", a: "Evet, imzalı ve kaşeli tediye makbuzu nakit olarak teslim edilen paranın muhatabına ulaştığını gösteren hukuki ve muhasebesel bir ispat belgesidir." },
      { q: "Tediye makbuzu muhasebede nasıl işlenir?", a: "Tediye makbuzları kasa çıkış fişi olarak muhasebe sistemine girilir ve ilgili cari hesabın veya gider kaleminin borç kapatmasında kullanılır." },
      { q: "Tediye makbuzu zorunlu mudur?", a: "Kasadan yapılan elden ödemelerin ve nakit hareketlerinin belgelenmesi, iç denetim ve muhasebe düzeni açısından zorunlu ve kritik bir uygulamadır." },
      { q: "Tediye makbuzu baskısında minimum sipariş miktarı nedir?", a: "Tediye makbuzu baskılarında minimum sipariş miktarı 5 cilttir." },
      { q: "Tediye makbuzu kaç nüsha basılabilir?", a: "İhtiyaca göre 1 Asıl + 1 Suret, 1 Asıl + 2 Suret veya daha fazla nüshalı tediye makbuzu üretilebilmektedir." },
      { q: "Tediye makbuzu numaratörlü basılabilir mi?", a: "Evet, evrak takibini kolaylaştırmak amacıyla tediye makbuzları numaratörlü olarak basılabilmektedir." },
      { q: "Tediye makbuzlarına firma logosu basılabilir mi?", a: "Evet, tediye makbuzlarına firma logosu, iletişim bilgileri ve kurumsal kimlik unsurları eklenebilmektedir." },
      { q: "Özel tasarım tediye makbuzu yaptırabilir miyim?", a: "Evet, işletmenizin ihtiyaçlarına uygun özel tasarımlı tediye makbuzları hazırlanabilmektedir." },
      { q: "Tediye makbuzu resmi evrak mıdır?", a: "Tediye makbuzu, işletmeler tarafından yapılan ödemelerin kayıt altına alınması amacıyla kullanılan bir belgedir." },
      { q: "Tediye makbuzu ölçüleri değiştirilebilir mi?", a: "Evet, standart ölçülerin yanı sıra talebe göre özel ebatlarda tediye makbuzu baskısı yapılabilmektedir." },
      { q: "İstanbul dışına gönderim yapıyor musunuz?", a: "Evet, tediye makbuzu siparişleri Türkiye'nin tüm il ve ilçelerine kargo ile gönderilmektedir." },
      { q: "Tediye makbuzu baskısı kaç günde tamamlanır?", a: "Tasarım onayının ardından tediye makbuzu baskıları genellikle 3-5 iş günü içerisinde tamamlanarak kargoya teslim edilmektedir." }
    ]
  },
  "tahsilat-makbuzu": {
    seoTitle: "Tahsilat Makbuzu Baskı Fiyatları | Otokopili ve Numaratörlü Tahsilat Makbuzu Basımı",
    seoDescription: "Tahsilat makbuzu baskı fiyatları. Otokopili ve numaratörlü tahsilat makbuzu koçanları. Logolu özel tasarım, hızlı üretim ve Türkiye geneli kargo.",
    breadcrumbTitle: "Tahsilat Makbuzu",
    h1Title: "Tahsilat Makbuzu Baskı Fiyatları | Otokopili ve Numaratörlü Tahsilat Makbuzu",
    subtitle: "Tahsilat makbuzu, işletmelerin gerçekleştirdiği tahsilatları ve alınan ödemeleri kayıt altına almak amacıyla kullanılan önemli bir matbu evraktır. Özellikle ön muhasebe süreçlerinde belge düzeninin sağlanması, alınan ödemelerin takip edilmesi ve şirket içi kayıtların düzenli şekilde arşivlenebilmesi için tercih edilir. Farklı sektörlerde faaliyet gösteren firmalar günlük operasyonlarında tahsilat makbuzu kullanımına ihtiyaç duyabilmektedir.\n\nOtokopili tahsilat makbuzu koçanları, üst nüshaya yazılan bilgilerin alt nüshalara otomatik olarak aktarılmasını sağlayan kendinden karbonlu kağıtlardan üretilir. Bu yapı sayesinde ayrıca karbon kağıdı kullanmaya gerek kalmadan hızlı, temiz ve pratik bir kullanım elde edilir. Birden fazla nüsha oluşturulabilmesi, belge paylaşımını ve arşivleme süreçlerini kolaylaştırır.\n\nNumaratörlü tahsilat makbuzu modellerinde ise her yaprak ardışık sıra numarası ile basılır. Bu sistem, belgelerin düzenli şekilde takip edilmesine yardımcı olurken kayıp veya eksik evrakların tespit edilmesini de kolaylaştırır. 1 asıl + 1 suret veya 1 asıl + 2 suret olarak hazırlanabilen tahsilat makbuzları, farklı ölçü ve tasarım seçenekleriyle üretilebilmektedir.",
    featureImage: "/images/tahsilat-makbuzu/otokopili-tahsilat-makbuzu.webp",
    featureImageAlt: "Tahsilat makbuzu basım fiyatları",
    gallery: [
      {
        src: "/images/tahsilat-makbuzu/tahsilat-makbuzu-ornegi.webp",
        alt: "Logolu tahsilat makbuzu örneği",
        title: "Logolu Tahsilat Makbuzu Örneği",
        desc: "Firmanızın unvanı, logosu, vergi bilgileri ve iletişim bilgileri baskıya eklenerek kurumsal kimliğinizi yansıtan makbuzlar hazırlanır. Hazır şablon kullanılabileceği gibi firmanıza özel yeni bir tasarım da oluşturulabilir."
      },
      {
        src: "/images/tahsilat-makbuzu/otokopili-tahsilat-makbuzu.webp",
        alt: "Otokopili tahsilat makbuzu baskı",
        title: "Otokopili Tahsilat Makbuzu Örneği",
        desc: "Tahsilat makbuzları, kendinden karbonlu otokopili kağıda basılır. Üst sayfaya yazılan bilgiler alt nüshalara otomatik olarak geçtiği için karbon kağıdı kullanmadan hızlı ve temiz bir kullanım sağlar."
      },
      {
        src: "/images/tahsilat-makbuzu/numaratorlu-tahsilat-makbuzu.webp",
        alt: "Numaratörlü tahsilat makbuzu koçanı",
        title: "Numaratörlü Tahsilat Makbuzu Örneği",
        desc: "Her yaprağa ardışık seri numarası uygulanarak evrakların sıralı şekilde takip edilmesi sağlanır. Bu sistem arşivleme, muhasebe kayıtları ve belge kontrol süreçlerinde büyük kolaylık sunar."
      },
      {
        src: "/images/tahsilat-makbuzu/tahsilat-makbuzu-kocani.webp",
        alt: "Tahsilat makbuzu koçanı",
        title: "Tahsilat Makbuzu Koçanı",
        desc: "Standart olarak her ciltte 50 takım yaprak bulunur. İhtiyaca göre 1 Asıl + 1 Suret veya 1 Asıl + 2 Suret seçenekleri hazırlanabilir. Üstten tutkallı ciltleme sayesinde yapraklar düzenli şekilde koparılır ve uzun süre dağılmadan kullanılabilir."
      },
      {
        src: "/images/tahsilat-makbuzu/kendinden-karbonlu-tahsilat-makbuzu.webp",
        alt: "Kendinden karbonlu tahsilat makbuzu",
        title: "Kendinden Karbonlu Tahsilat Makbuzu",
        desc: "Kendinden karbonlu kağıt, muhasebe, mağazacılık, servis hizmetleri, sağlık kuruluşları, eğitim kurumları ve birçok ticari işletmede yoğun olarak tercih edilmektedir. Aynı bilgilerin birden fazla nüshaya tek seferde aktarılmasını sağlayarak iş süreçlerini hızlandırır."
      },
      {
        src: "/images/tahsilat-makbuzu/tahsilat-makbuzu-ornegi.webp",
        alt: "Kurumsal tahsilat makbuzu tasarımı",
        title: "Kurumsal Tahsilat Makbuzu Tasarımı",
        desc: "Tahsilat makbuzları firmanızın çalışma sistemine göre tamamen özelleştirilebilir. Ödeme şekli, IBAN bilgisi, açıklama alanları, teslim eden/teslim alan bölümleri, kaşe alanı, QR kod ve diğer özel tablolar baskıya eklenebilir. Tasarım onaylandıktan sonra üretim süreci başlatılır."
      }
    ],
    specifications: [
      { title: "Kağıt Türü", value: "Kendinden Karbonlu (Otokopili) Kağıt" },
      { title: "Ölçü", value: "A5 Yarım Boy (14x20 cm) veya A4 Tam Boy" },
      { title: "Nüsha Sayısı", value: "1 Asıl + 1 Suret (2 Nüsha) veya 1 Asıl + 2 Suret (3 Nüsha)" },
      { title: "Numaratör", value: "Sıralı Ardışık Numaralı Baskı" },
      { title: "Cilt Standardı", value: "Her Ciltte 50 Yaprak Takımı (50 Set)" },
      { title: "Baskı Rengi", value: "Tek Renk (Siyah / Lacivert) veya Çok Renkli Kurumsal Baskı" },
      { title: "Kullanım Amacı", value: "İşletme içi alınan ödemelerin ve tahsilatların pratik şekilde belgelenmesi." },
      { title: "Sipariş Miktarı", value: "5 Cilt, 10 Cilt, 20 Cilt, 30 Cilt, 50 Cilt" },
      { title: "Teslim Süresi", value: "Tasarım Onayından Sonra 3 - 5 İş Günü" }
    ],
    whatIsTitle: "Tahsilat Makbuzu Baskı Ürün Özellikleri",
    whatIsContent: "Mavi Basım olarak yüksek kalitede ürettiğimiz tahsilat makbuzu koçanları; otokopili baskı, sıralı numaratör, kolay koparma sağlayan perfore ve dayanıklı ciltleme gibi üstün teknik özelliklerle donatılmış, firmanıza özel tasarlanan profesyonel ürünlerdir.",
    whoUsesTitle: "Tahsilat Makbuzu Koçanlarını Kimler Tercih Eder?",
    whoUsesItems: [
      "Şirketler ve Kurumsal Firmalar",
      "Esnaflar ve KOBİ'ler",
      "Muhasebe ve Finans Departmanları",
      "Mağazalar ve Şirket Kasa Birimleri"
    ],
    usageAreasTitle: "Tahsilat Makbuzu Baskı Avantajları",
    usageAreasItems: [
      { title: "Otokopili Baskı & Logo Baskısı", desc: "Kendinden kopyalı otokopili kağıt üzerine şirketinizin logosu ve bilgileri kurumsal renklerle ofset kalitesinde basılır." },
      { title: "Sıralı Numaratör", desc: "Tüm yapraklar otomatik makinelerle ardışık seri numaralarıyla basılarak hatasız belge takibi yapmanızı sağlar." },
      { title: "Perfore & Ciltleme", desc: "Kolayca yırtılıp koparılabilmesini sağlayan perfore (tırtık) hattı ve dağılmayı önleyen sağlam üstten tutkallı ciltleme." }
    ],
    howToFillTitle: "Tahsilat Makbuzu Tasarımı Nasıl Hazırlanır?",
    howToFillContent: [
      "Firmanızın logosunu, unvanını ve adres bilgilerini şablona ekleyin.",
      "İhtiyacınıza özel tablo alanlarını (tutar, açıklama, ödeme şekli vb.) belirleyin.",
      "Belge takibini kolaylaştırmak için başlangıç numaratör numarasını belirtin."
    ],
    requiredInfoTitle: "Tahsilat Makbuzu Baskısında Neler Bulunur?",
    requiredInfoContent: [
      "Firmanızın kurumsal logosu ve iletişim bilgileri",
      "Seri ve sıra takibi sağlayan otomatik numaratör baskısı",
      "Yaprakların kolayca koparılabilmesi için perfore (tırtık) hattı",
      "Nüshaların dağılmasını önleyen sağlam üstten ciltleme yapısı"
    ],
    importanceTitle: "Otokopili ve Numaratörlü Tahsilat Makbuzu Koçanının Önemi",
    importanceContent: "Düzenli ve kurumsal bir tahsilat takibi için otokopili ve sıralı numaratörlü tahsilat makbuzu koçanları işletmeler için büyük kolaylık sağlar. Mavi Basım kalitesiyle üretilen koçanlar, hem firmanızın profesyonel imajını yansıtır hem de evraklarınızın düzenli ve kaybolmadan saklanmasını mümkün kılar.",
    otokopiTitle: "Mükemmel Otokopi Baskı Kalitesi",
    otokopiContent: "Mavi Basım tarafından yüksek matbaa kalitesinde üretilen otokopili tahsilat makbuzu modellerimiz, kendinden kopyalı kağıt teknolojisi sayesinde karbon kağıdı gereksinimini ortadan kaldırır. En alt nüshaya bile yazılar tamamen net ve temiz olarak geçer.",
    faqList: [
      {
        q: "Tahsilat Makbuzu Nedir?",
        a: "Tahsilat makbuzu, işletmeler tarafından kullanılan matbu evraklardan biridir. Alınan ödemelerin ve tahsilat işlemlerinin kayıt altına alınmasına yardımcı olur. İhtiyaca göre otokopili, numaratörlü ve farklı nüsha seçenekleriyle üretilebilmektedir."
      },
      {
        q: "Tahsilat Makbuzu Hangi Durumlarda Kullanılır?",
        a: "İşletmeler, müşterilerinden elden nakit, çek veya senet gibi ödemeler aldıklarında bu ödeme işlemini kayıt altına almak için tahsilat makbuzu düzenler."
      },
      {
        q: "Tahsilat Makbuzu ile Tediye Makbuzu Farkı Nedir?",
        a: "Tahsilat makbuzu işletmeye bir para girişi olduğunda parayı alan tarafça düzenlenir. Tediye makbuzu ise kasadan para çıkışı yapıldığında ödemeyi yapan tarafça düzenlenir."
      },
      {
        q: "Tahsilat Makbuzu Kaç Nüsha Olarak Basılır?",
        a: "Tahsilat makbuzları genellikle 1 Asıl + 1 Suret veya 1 Asıl + 2 Suret olarak üretilmektedir. Talebe göre farklı nüsha seçenekleri de hazırlanabilmektedir. Otokopili baskı sayesinde tüm nüshalar tek seferde doldurulabilir."
      },
      {
        q: "Tahsilat Makbuzunda Hangi Bilgiler Bulunmalıdır?",
        a: "Standart tahsilat makbuzu tasarımlarında firma bilgileri, tarih alanı, seri ve sıra numarası, açıklama bölümü, tutar alanları ve imza bölümleri bulunur. İşletmenin ihtiyaçlarına göre özel alanlar da eklenebilmektedir."
      },
      {
        q: "Numaratörlü Tahsilat Makbuzu Nedir?",
        a: "Numaratörlü tahsilat makbuzu, her yaprağında sıralı numara bulunan baskı türüdür. Evrak takibini kolaylaştırır ve belge düzeninin korunmasına yardımcı olur. Özellikle yoğun evrak kullanan işletmeler tarafından tercih edilmektedir."
      },
      {
        q: "Tahsilat makbuzu fiyatını hangi özellikler etkiler?",
        a: "Tahsilat makbuzu fiyatları; baskı adedi, nüsha sayısı, cilt miktarı, baskı özellikleri ve tasarım taleplerine göre değişiklik gösterebilir. Numaratörlü tahsilat makbuzu ve otokopili tahsilat makbuzu seçenekleri fiyatlandırmayı etkileyebilir."
      },
      {
        q: "Tahsilat Makbuzu Kaç Günde Teslim Edilir?",
        a: "Grafik tasarım onayının ardından üretim süreci genellikle 3-5 iş günü içerisinde tamamlanmaktadır. Teslimat süresi kargo firması ve gönderim adresine göre değişiklik gösterebilir."
      },
      {
        q: "Tahsilat makbuzu baskısında minimum sipariş miktarı nedir?",
        a: "Tahsilat makbuzu baskılarında minimum sipariş miktarı 5 cilttir."
      },
      {
        q: "Tahsilat makbuzlarına firma logosu basılabilir mi?",
        a: "Evet, tahsilat makbuzlarına firma logosu, iletişim bilgileri ve kurumsal kimlik unsurları eklenebilmektedir."
      },
      {
        q: "Özel tasarım tahsilat makbuzu yaptırabilir miyim?",
        a: "Evet, işletmenizin ihtiyaçlarına uygun özel tasarımlı tahsilat makbuzları hazırlanabilmektedir."
      },
      {
        q: "İstanbul dışına gönderim yapıyor musunuz?",
        a: "Evet, tahsilat makbuzu siparişleri Türkiye'nin tüm il ve ilçelerine kargo ile gönderilmektedir."
      }
    ]
  }
};

// Aliases for matching map
MAKBUZ_DETAILS["tediye-makbuzu"] = MAKBUZ_DETAILS["tahsilat-ve-tediye-makbuzu"];

export const SOZLESME_BASKI_DATA = [
  {
    id: "sozlesme-baski",
    title: "SÖZLEŞME BASKI",
    ebat: "20,5 x 28,5 cm (TAM BOY)",
    ozellik: "Otokopili Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "15 CİLT", "20 CİLT", "25 CİLT", "30 CİLT", "40 CİLT", "50 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1650, 2050, 2700, 2950, 3450, 3750, 4750, 5450, 8950] },
      { label: "1 Asl+2 Su.", values: [1850, 2550, 3250, 3650, 4350, 4900, 6000, 7350, 12750] },
      { label: "1 Asl+3 Su.", values: [2050, 2800, 3650, 4350, 5050, 5800, 7550, 8950, 16000] },
      { label: "2. Renk Farkı", values: [700, 800, 950, 1000, 1050, 1050, 1300, 1600, 2400] }
    ]
  }
];

export const SIPARIS_FISI_DATA = [
  {
    id: "siparis-fisi",
    title: "SİPARİŞ FİŞİ",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otokopili Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "40 CİLT", "50 CİLT", "75 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1600, 1650, 2050, 2700, 3000, 3550, 4650, 5450] },
      { label: "1 Asl+2 Su.", values: [1650, 1850, 2550, 3250, 3650, 4350, 5700, 7600] },
      { label: "1 Asl+3 Su.", values: [1750, 2050, 2800, 3650, 4350, 5050, 7750, 9950] },
      { label: "2. Renk Farkı", values: [700, 700, 800, 950, 1050, 1200, 1400, 1850] }
    ]
  }
];

export const PARA_MAKBUZU_DATA = [
  {
    id: "para-makbuzu",
    title: "PARA MAKBUZU",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otokopili Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "50 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1850, 1900, 2250, 2900, 3750, 5650] },
      { label: "1 Asl+2 Su.", values: [1900, 2100, 2750, 3450, 4600, 7850] },
      { label: "1 Asl+3 Su.", values: [2000, 2250, 3000, 3900, 5300, 10150] },
      { label: "2. Renk Farkı", values: [500, 500, 600, 750, 950, 1600] }
    ]
  }
];

export const ADISYON_DATA = [
  {
    id: "adisyon",
    title: "ADİSYON BASKI (ADİSYON TABLOSU)",
    ebat: "14 x 20 cm",
    ozellik: "Tek Nüsha 70-80 Gr. 1. Hamur 100'lük Adisyon 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "40 CİLT", "50 CİLT", "100 CİLT", "200 CİLT", "500 CİLT", "1000 CİLT"],
    rows: [
      { label: "Fiyat", values: [1550, 1600, 1650, 2150, 2250, 3200, 4750, 10050, 17600] },
      { label: "Renk Farkı", values: [700, 700, 700, 750, 750, 1000, 1200, 2400, 2900] }
    ]
  }
];

export const SIGORTA_POLICELERI_DATA = [
  {
    id: "sigorta-policeleri",
    title: "SİGORTA POLİÇELERİ",
    ebat: "20,5 x 28,5 cm (TAM BOY)",
    ozellik: "Otokopili Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "40 CİLT", "50 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1650, 2050, 2950, 3750, 4750, 5450, 8950] },
      { label: "1 Asl+2 Su.", values: [1850, 2550, 3650, 4900, 6000, 7350, 12750] },
      { label: "2. Renk Farkı", values: [700, 800, 1000, 1050, 1300, 1600, 2400] }
    ]
  }
];

export const TAHSILAT_MAKBUZU_DATA = [
  {
    id: "tahsilat-makbuzu",
    title: "TAHSİLAT MAKBUZU",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otokopili Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "50 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1850, 1900, 2250, 2900, 3750, 5650] },
      { label: "1 Asl+2 Su.", values: [1900, 2100, 2750, 3450, 4600, 7850] },
      { label: "1 Asl+3 Su.", values: [2000, 2250, 3000, 3900, 5300, 10150] },
      { label: "2. Renk Farkı", values: [500, 500, 600, 750, 950, 1600] }
    ]
  }
];

export const ARAC_KIRALAMA_DATA = [
  {
    id: "arac-kiralama",
    title: "ARAÇ KİRALAMA",
    ebat: "20,5 x 28,5 cm (TAM BOY)",
    ozellik: "Otokopili Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "15 CİLT", "20 CİLT", "25 CİLT", "30 CİLT", "40 CİLT", "50 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1650, 2050, 2700, 2950, 3450, 3750, 4750, 5450, 8950] },
      { label: "1 Asl+2 Su.", values: [1850, 2550, 3250, 3650, 4350, 4900, 6000, 7350, 12750] },
      { label: "2. Renk Farkı", values: [700, 800, 950, 1000, 1050, 1050, 1300, 1600, 2400] }
    ]
  }
];

export const GIDER_MAKBUZU_DATA = [
  {
    id: "gider-makbuzu",
    title: "GİDER MAKBUZU",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otokopili Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "50 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1850, 1900, 2250, 2900, 3750, 5650] },
      { label: "1 Asl+2 Su.", values: [1900, 2100, 2750, 3450, 4600, 7850] },
      { label: "1 Asl+3 Su.", values: [2000, 2250, 3000, 3900, 5300, 10150] },
      { label: "2. Renk Farkı", values: [500, 500, 600, 750, 950, 1600] }
    ]
  }
];

export const GIRIS_BILETI_DATA = [
  {
    id: "giris-bileti",
    title: "GİRİŞ BİLETİ",
    ebat: "14 x 20 cm",
    ozellik: "Tek Nüsha 70-80 Gr. 1. Hamur 100'lük 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "40 CİLT", "50 CİLT", "75 CİLT", "100 CİLT"],
    rows: [
      { label: "Fiyat", values: [1550, 1600, 1650, 2150, 2250, 2650, 3200] },
      { label: "Renk Farkı", values: [700, 700, 700, 750, 750, 1000, 1000] }
    ]
  }
];

export const RECETE_DATA = [
  {
    id: "recete",
    title: "REÇETE",
    ebat: "14 x 20 cm",
    ozellik: "Tek Nüsha 70-80 Gr. 1. Hamur 100'lük 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "40 CİLT", "50 CİLT", "75 CİLT", "100 CİLT"],
    rows: [
      { label: "Fiyat", values: [1550, 1600, 1650, 2150, 2250, 2650, 3200] },
      { label: "Renk Farkı", values: [700, 700, 700, 750, 750, 1000, 1000] }
    ]
  }
];

export const SENET_DATA = [
  {
    id: "senet",
    title: "SENET",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otokopili Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "50 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1550, 1600, 1700, 2000, 2450] },
      { label: "1 Asl+2 Su.", values: [1600, 1700, 1850, 2250, 2950] },
      { label: "1 Asl+3 Su.", values: [1650, 1750, 2050, 2600, 3550] },
      { label: "2. Renk Farkı", values: [700, 700, 700, 750, 850] }
    ]
  }
];

export const TEDIYE_MAKBUZU_DATA = [
  {
    id: "tediye-makbuzu",
    title: "TEDİYE MAKBUZU",
    ebat: "14 x 20 cm (YARIM BOY)",
    ozellik: "Otokopili Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "30 CİLT", "50 CİLT", "100 CİLT"],
    rows: [
      { label: "1 Asıl + 1 Suret", values: [1850, 1900, 2250, 2900, 3750, 5650] },
      { label: "1 Asıl + 2 Suret", values: [1900, 2100, 2750, 3450, 4600, 7850] },
      { label: "1 Asıl + 3 Suret", values: [2000, 2250, 3000, 3900, 5300, 10150] },
      { label: "2. Renk Farkı", values: [500, 500, 600, 750, 950, 1600] }
    ]
  }
];

export const PERAKENDE_SATIS_FISI_DATA = [
  {
    id: "perakende-satis-fisi",
    title: "PERAKENDE SATIŞ FİŞİ (GAYRİRESMİ)",
    ebat: "10 X 14 cm. (KÜÇÜK BOY)",
    ozellik: "Otokopili Kağıda 1 Renk Baskılı - Numaratörlü",
    headers: ["5 CİLT", "10 CİLT", "20 CİLT", "50 CİLT", "75 CİLT", "100 CİLT", "200 CİLT", "250 CİLT", "300 CİLT", "500 CİLT"],
    rows: [
      { label: "1 Asl+1 Su.", values: [1550, 1600, 1700, 2450, 3150, 3550, 5800, 7050, 8000, 11600] },
      { label: "1 Asl+2 Su.", values: [1600, 1700, 1850, 2950, 3250, 4350, 7350, 8950, 11100, 16000] },
      { label: "1 Asl+3 Su.", values: [1650, 1750, 2050, 3550, 4550, 5050, 8950, 12200, 13800, 20300] },
      { label: "2. Renk Farkı", values: [700, 700, 700, 850, 950, 1050, 1550, 1850, 1850, 2400] }
    ]
  }
];

export const MAKBUZ_FORMLAR_ALL_DATA = [
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

export const CILT_ISLERI_DATA = [
  ...PERAKENDE_SATIS_FISI_DATA,
  ...ADISYON_DATA,
  ...PARA_MAKBUZU_DATA,
  ...SIPARIS_FISI_DATA,
  ...SOZLESME_BASKI_DATA
];
