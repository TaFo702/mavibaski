import { CITY_SEARCH_CONTENT } from './citySearchContent';
import type { CityInfo } from './cityData';
import { PHONE_NUMBER } from '../constants/contact';

export interface PrintOrderGuide {
  name: string;
  path: string;
  use: string;
  choices: readonly string[];
  quoteFields: readonly string[];
  question: string;
  answer: string;
}

// Real product decisions shared where the service is shared. These are not
// claims about a city's industry, local demand, office or delivery speed.
export const PRINT_ORDER_GUIDES: Record<string, PrintOrderGuide> = {
  'Kartvizit': {
    name: 'Kartvizit', path: '/kartvizit',
    use: 'İletişim bilgilerini, unvanı ve kurumsal kimliği küçük bir alanda sunmak için kullanılır. Aynı kurumda farklı çalışanlar için ayrı isimli çalışmalar hazırlanabilir.',
    choices: ['Tek veya çift yüz baskıya, kullanılacak bilgi miktarına göre karar verin.', 'Kâğıt ve yüzey işlemi seçimini yalnız görünüme göre yapmayın; üzerine yazı yazılacaksa bunu teklif sırasında belirtin.'],
    quoteFields: ['Kapalı ebat', 'Her isim için baskı adedi', 'Tek / çift yüz', 'Kâğıt ve yüzey işlemi', 'Logo ve güncel iletişim bilgileri'],
    question: 'Farklı çalışanların kartvizitlerini tek siparişte isteyebilir miyim?',
    answer: 'İsimleri ve her isim için istediğiniz adedi ayrı ayrı iletin. Unvan, telefon, e-posta ve varsa QR bağlantısını onay öncesinde kontrol edin; toplam adet tek başına bu ayrımı göstermez.'
  },
  'Broşür': {
    name: 'Broşür', path: '/brosur',
    use: 'Hizmetleri, ürünleri veya bir kampanyayı müşteriye anlatmak için tercih edilir. Dağıtılacak tek yaprak ile katlanmış bir tanıtım çalışmasının yerleşimi farklı hazırlanır.',
    choices: ['Açık ebat ile katlandıktan sonraki kapalı ebadı ayrı belirtin.', 'Katlama çizgisine gelen metinleri ve sayfa sırasını prova üzerinde kontrol edin; dağıtım adedini baskı adediyle birlikte planlayın.'],
    quoteFields: ['Açık ve kapalı ebat', 'Baskı adedi', 'Tek / çift yüz', 'Kâğıt tercihi', 'Kırım / katlama biçimi'],
    question: 'Katlamalı broşürde teklif için hangi ölçüyü vermeliyim?',
    answer: 'Hem kâğıdın açık ölçüsünü hem katlandıktan sonraki ölçüyü iletin. Katlama şeklini de yazın; yalnız “A4 broşür” demek kırım ve yerleşim ihtiyacını açıklamaz.'
  },
  'Katalog': {
    name: 'Katalog', path: '/kataloglar',
    use: 'Çok sayıda ürün veya hizmeti sayfa düzeni içinde sunar. Ürün kodu, görsel, açıklama ve iletişim bilgilerinin bir arada kontrol edilmesi gerekir.',
    choices: ['İç sayfalar ile kapağın kâğıt tercihini ayrı değerlendirin.', 'Cilt biçimini sayfa sayısı ve kullanım şekliyle birlikte belirleyin; kapak dahil toplam sayıyı açıkça belirtin.'],
    quoteFields: ['Kapalı ebat', 'Kapak dahil sayfa sayısı', 'Baskı adedi', 'İç / kapak kâğıdı', 'Cilt tercihi'],
    question: 'Katalog teklifinde sayfa sayısını nasıl bildirmeliyim?',
    answer: 'Kapak dahil toplam sayfa sayısını ve kapağın ayrı kâğıda basılıp basılmayacağını belirtin. Yaprak sayısı ile sayfa sayısı aynı değildir; iki yüzü kullanılan bir yaprak iki sayfadır.'
  },
  'Etiket': {
    name: 'Etiket', path: '/etiket',
    use: 'Ürünün adı, marka bilgisi ve tanıtımını ambalaj üzerinde taşır. Malzeme seçiminde tasarım kadar yapıştırılacak yüzey ve kullanım ortamı da önemlidir.',
    choices: ['Cam, plastik, karton gibi uygulanacak yüzeyi belirtin.', 'Nem, soğuk ortam veya sürtünme ihtiyacını paylaşın; ölçü ve kesim şekli netleşmeden yalnız adet üzerinden seçim yapmayın.'],
    quoteFields: ['Etiket ölçüsü', 'Baskı adedi', 'Yapıştırılacak yüzey', 'Kullanım koşulları', 'Malzeme ve kesim biçimi'],
    question: 'Etiket için kuşe veya plastik malzemeyi nasıl seçmeliyim?',
    answer: 'Etiketin nerede kullanılacağını ve su, nem ya da soğukla temas edip etmeyeceğini belirtin. Malzeme seçimi bu koşullara göre değerlendirilir; her yüzey ve ortam için tek malzeme varsayılmaz.'
  },
  'Kutu': {
    name: 'Kutu', path: '/kutu',
    use: 'Ürünün sunumu ve ambalajlanması için değerlendirilir. Kutunun içine girecek ürünün ölçüsü ile kutunun dış ölçüsü farklı olabilir.',
    choices: ['En, boy ve yüksekliği; mümkünse ürün ölçüsü veya örneğiyle birlikte paylaşın.', 'Sunum kutusu ile taşıma ambalajı ihtiyacını ayırın. Ağır veya kırılabilir ürünlerde iç koruma ve kargo ambalajını ayrıca değerlendirin.'],
    quoteFields: ['En × boy × yükseklik', 'Ürün ağırlığı ve kullanım amacı', 'Sipariş adedi', 'Karton tercihi', 'Kesim / kapak ve baskı bilgisi'],
    question: 'Kutu için ürün ölçüsü yeterli midir?',
    answer: 'Ürün ölçüsüne ek olarak ağırlığı, kutuda kaç ürün bulunacağını ve kutunun sunum veya kargo için kullanılacağını belirtin. İç yerleşim ve koruma ihtiyacı netleştirilmeden uygunluk varsayılmaz.'
  },
  'Magnet': {
    name: 'Magnet', path: '/magnet',
    use: 'Telefon, marka ve sipariş bağlantısı gibi bilgileri mıknatıslı bir reklam ürünü üzerinde sunar. Tasarımın uzaktan okunabilirliği kullanımda önemlidir.',
    choices: ['Ebat ve kesim şekliyle birlikte telefon ve logo yerleşimini planlayın.', 'İnce yazılar yerine okunabilir iletişim bilgilerine öncelik verin; QR kod varsa bağlantıyı ve okunurluğu prova aşamasında kontrol edin.'],
    quoteFields: ['Ebat', 'Baskı adedi', 'Kesim şekli', 'Malzeme / kalınlık tercihi', 'Telefon, logo ve varsa QR bağlantısı'],
    question: 'Magnet tasarımında QR kod kullanabilir miyim?',
    answer: 'Bağlantıyı ve kullanılacak kodu dosyayla birlikte iletin. Kodun boyutu ve çevresindeki boşluk önemlidir; onay vermeden önce bağlantının doğru açıldığını kontrol edin.'
  },
  'Karton Çanta': {
    name: 'Karton Çanta', path: '/karton-canta',
    use: 'Ürün tesliminde ve kurumsal sunumda kullanılan baskılı taşıma ambalajıdır. Üç boyut ve taşınacak ürün birlikte değerlendirilir.',
    choices: ['En, boy ve körük ölçüsünü ayrı ayrı verin; ürünün sığıp sığmayacağını kapalı ölçüyle kontrol edin.', 'Taşınacak ağırlığı, sap ve yüzey tercihini paylaşın. Kâğıt ve takviye ihtiyacı bu kullanıma göre ele alınır.'],
    quoteFields: ['En × boy × körük', 'Sipariş adedi', 'Taşınacak ürün ve ağırlığı', 'Kâğıt / yüzey tercihi', 'Sap tercihi'],
    question: 'Karton çantada körük ölçüsü neden gerekli?',
    answer: 'Körük, çantanın derinliğini ve ürüne ayırdığı hacmi etkiler. Yalnız en ve boyla teklif istemek ürünün yerleşimini açıklamaz; taşınacak ürünün ölçüsü ve ağırlığını da ekleyin.'
  },
  'Makbuz': {
    name: 'Makbuz ve Formlar', path: '/makbuz-ve-formlar',
    use: 'Ödeme, tahsilat veya işletme içi kayıt işlemlerinde kullanılan farklı matbu formlar bulunur. Önce kullanılacak formun türü belirlenmelidir.',
    choices: ['Tahsilat, tediye veya para makbuzu gibi ihtiyaç duyduğunuz formu açıkça belirtin.', 'Nüsha, cilt ve numaratör tercihini ayırın; cilt adediyle toplam yaprak adedini birbirine karıştırmayın.'],
    quoteFields: ['Form türü ve ebat', 'Nüsha sayısı', 'Cilt adedi', 'Numaratör ve başlangıç numarası', 'Firma bilgileri ve örnek form'],
    question: 'Makbuzda nüsha sayısı ile cilt adedi aynı mıdır?',
    answer: 'Hayır. Nüsha, bir işlem için oluşacak asıl ve kopya sayısını; cilt adedi ise sipariş edilecek koçan sayısını belirtir. Teklifte ikisini ayrı ayrı yazın.'
  },
  'Sipariş Fişi': {
    name: 'Sipariş Fişi', path: '/siparis-fisi',
    use: 'Müşteri, ürün, adet ve teslim bilgilerini matbu bir formda kaydetmeye yardımcı olur. Kullanılacak alanlar işletmenin sipariş akışına göre belirlenir.',
    choices: ['Ürün kodu, açıklama, adet ve imza gibi alanların çalışma düzeninizi karşılayıp karşılamadığını kontrol edin.', 'Asıl ve kopyanın kimde kalacağını düşünerek nüsha sayısını seçin; numara takibi gerekiyorsa başlangıcı belirtin.'],
    quoteFields: ['Form ebadı', 'Nüsha sayısı', 'Cilt adedi', 'Numaratör tercihi', 'Form alanları ve firma bilgileri'],
    question: 'Sipariş fişi teklifine örnek form eklemeli miyim?',
    answer: 'Mevcut formunuz veya alan listesini iletmeniz yerleşim ihtiyacını açıklamayı kolaylaştırır. Ürün, adet, teslim ve imza alanlarıyla birlikte ebat, nüsha ve cilt adedini paylaşın.'
  },
  'Zarf': {
    name: 'Zarf', path: '/zarf',
    use: 'Kurumsal yazışma ve evrak sunumu için kullanılır. İçine konulacak belge ve gönderim biçimi zarf seçimini etkiler.',
    choices: ['Belgenin katlanarak mı düz olarak mı yerleşeceğini belirleyin.', 'Pencere ve baskı yüzü tercihlerini belirtin; adres alanının yerleşimini prova üzerinde kontrol edin.'],
    quoteFields: ['Zarf türü ve ebat', 'Baskı adedi', 'Pencereli / penceresiz', 'Baskı yüzü', 'Logo ve adres bilgileri'],
    question: 'Zarf seçerken hangi belge ölçüsünü bildirmeliyim?',
    answer: 'Yerleştireceğiniz belgenin ölçüsünü ve katlanıp katlanmayacağını yazın. Pencereli zarf istiyorsanız adresin evrak üzerindeki konumunu da paylaşın.'
  },
  'Dosya': {
    name: 'Cepli Dosya', path: '/dosyalar',
    use: 'Teklif, sözleşme ve tanıtım evraklarını bir arada sunmaya yardımcı olur. Kapak, cep ve kartvizit yuvası yerleşimi birlikte planlanır.',
    choices: ['Taşınacak evrakın ebadını ve yaklaşık miktarını belirtin.', 'Cep ve kartvizit kesimi talebini paylaşın; kesim çizgisiyle tasarımın örtüşmesini onaydan önce kontrol edin.'],
    quoteFields: ['Kapalı ebat', 'Sipariş adedi', 'Cep ve kesim tercihi', 'Karton / yüzey işlemi', 'Yerleştirilecek evrak bilgisi'],
    question: 'Cepli dosyada kartvizit yuvası nasıl belirtilir?',
    answer: 'Kartvizit yuvası isteğini ve kullanılacak kartvizitin ölçüsünü teklif sırasında paylaşın. Cep ile kesim çizgilerinin yerleşimini prova üzerinde birlikte kontrol edin.'
  },
  'Amerikan Servis': {
    name: 'Amerikan Servis', path: '/amerikan-servis',
    use: 'Masa üzerinde marka, menü veya kampanya bilgisini sunmak için kullanılır. Yerleşim, masada ayrılacak alana göre hazırlanır.',
    choices: ['Kullanılacak yüzeyin ölçüsüne göre ebadı belirleyin.', 'Kâğıt, adet ve tek / çift yüz tercihini paylaşın; sık değişen fiyat ve kampanya bilgilerini onaydan önce kontrol edin.'],
    quoteFields: ['Ebat', 'Baskı adedi', 'Kâğıt tercihi', 'Tek / çift yüz', 'Menü ve kampanya dosyası'],
    question: 'Amerikan servis üzerinde menü ve QR kod birlikte olabilir mi?',
    answer: 'Yerleşim ve okunurluk elveriyorsa birlikte değerlendirilebilir. Kodun yönlendiği bağlantıyı, menü metnini ve kullanılacak ebadı dosyayla birlikte paylaşın.'
  },
  'Sözleşme': {
    name: 'Sözleşme', path: '/sozlesme-baski',
    use: 'İşletmenin hazırladığı sözleşme metnini matbu evrak olarak çoğaltmak için değerlendirilir. Baskı öncesi metin ve imza alanlarının son hali gerekir.',
    choices: ['Sayfa sayısı, nüsha ve cilt biçimini ayrı belirtin.', 'Metin, firma bilgileri ve imza alanlarını onaylayın. Baskı hizmeti sözleşme içeriğinin hukuki uygunluğunu doğrulama anlamına gelmez.'],
    quoteFields: ['Ebat ve sayfa sayısı', 'Nüsha sayısı', 'Cilt / sipariş adedi', 'Numaratör tercihi', 'Onaylanmış metin dosyası'],
    question: 'Sözleşme metnini baskıdan önce kim kontrol etmeli?',
    answer: 'Metin ve hukuki içerik sipariş veren tarafından doğrulanmalıdır. Teknik dosya ve PDF prova kontrolünde ise yerleşim, baskı alanı ve metnin dosyadaki görünümü değerlendirilir.'
  },
  'El İlanı': {
    name: 'El İlanı', path: '/el-ilani',
    use: 'Bir kampanya veya hizmetin kısa mesajını dağıtılabilir baskı üzerinde sunar. Mesaj, iletişim bilgisi ve kullanım süresi birlikte planlanır.',
    choices: ['Ebat ve tek / çift yüz tercihini içerik miktarına göre belirleyin.', 'Adres, telefon ve kampanya tarihlerini kontrol edin; dağıtılacak miktarla baskı adedini birlikte düşünün.'],
    quoteFields: ['Ebat', 'Baskı adedi', 'Kâğıt tercihi', 'Tek / çift yüz', 'Güncel kampanya metni'],
    question: 'El ilanı için tek yüz mü çift yüz mü seçmeliyim?',
    answer: 'Kısa kampanya mesajı tek yüzde çözülebilir; ürün veya hizmet ayrıntıları fazlaysa iki yüz değerlendirilir. Metin ve görselleri ebatla birlikte ileterek yerleşimi netleştirin.'
  },
  'Afiş': {
    name: 'Afiş', path: '/afis',
    use: 'Duyuru veya kampanyanın uzaktan fark edilmesini amaçlayan baskıdır. Asılacağı yer ve okunacağı mesafe tasarım kararını etkiler.',
    choices: ['İç veya dış kullanım ihtiyacını ve asılacak yüzeyi paylaşın.', 'Ana mesajı okunabilir boyutta tutun; ölçü ve kullanılacak malzemeyi uygulama koşullarıyla birlikte değerlendirin.'],
    quoteFields: ['Ebat', 'Baskı adedi', 'İç / dış kullanım', 'Malzeme tercihi', 'Uygulama yeri ve dosya'],
    question: 'Afiş için yalnız ebat belirtmem yeterli mi?',
    answer: 'Ebatla birlikte nerede kullanılacağını ve nasıl uygulanacağını belirtin. İç mekân duyurusu ile dış ortamda kullanılacak çalışma aynı koşulları taşımayabilir.'
  },
  'Bloknot': {
    name: 'Bloknot', path: '/bloknotlar',
    use: 'Toplantı ve günlük notlarda kurumsal kimliği taşır. Kullanılacak yazı alanı, yaprak düzeni ve cilt biçimi birlikte değerlendirilir.',
    choices: ['Yaprak sayısını, baskılı yüzü ve tutkal / spiral gibi cilt tercihini belirtin.', 'Logo ve iletişim bilgileri için ayrılacak alanın not yazmayı zorlaştırmamasına dikkat edin.'],
    quoteFields: ['Ebat', 'Bloknot adedi', 'Yaprak sayısı', 'Kâğıt ve cilt tercihi', 'Baskılı yüz ve yerleşim'],
    question: 'Bloknot adedi ile yaprak sayısını nasıl yazmalıyım?',
    answer: 'Kaç bloknot istediğinizi ve her bloknotta kaç yaprak bulunacağını ayrı yazın. Tek / çift yüz baskı ve cilt tercihini de eklerseniz kapsam daha net değerlendirilir.'
  },
  'Oto Paspas': {
    name: 'Oto Paspas', path: '/oto-paspas',
    use: 'Servis ve araç teslim süreçlerinde marka bilgisini baskılı kâğıt üzerinde sunmak için kullanılır. Araçta kullanılacağı alanın ölçüsü önemlidir.',
    choices: ['Ebat ve kâğıt tercihini kullanım amacına göre değerlendirin.', 'Logo, iletişim bilgisi ve baskı yönünü paylaşın. Kâğıt baskılı ürün ile kalıcı araç paspası ihtiyacını ayrı belirtin.'],
    quoteFields: ['Ebat', 'Baskı adedi', 'Kâğıt tercihi', 'Baskı yönü', 'Logo ve iletişim bilgileri'],
    question: 'Oto paspas teklifinde hangi kullanım bilgisini vermeliyim?',
    answer: 'Servis veya araç tesliminde kullanılacak baskılı kâğıt ürünü istediğinizi, ebadı ve sipariş adedini belirtin. Logo dosyasını ve varsa tercih ettiğiniz kâğıdı ekleyin.'
  }
};

export const CITY_PRODUCT_GROUPS: readonly { name: string; products: readonly (readonly [string, string])[] }[] = [
  { name: 'Broşür ve Duyuru', products: [['Broşür','/brosur'],['El İlanı','/el-ilani'],['Afiş','/afis']] },
  { name: 'Reklam ve Ambalaj', products: [['Magnet','/magnet'],['Kitap Ayracı','/kitap-ayraci'],['Yağ Kartı','/yag-karti'],['Etiket','/etiket'],['Amerikan Servis','/amerikan-servis'],['Oto Paspas','/oto-paspas'],['Kutu','/kutu'],['Ambalaj','/ambalaj']] },
  { name: 'Kurumsal Ürünler', products: [['Kartvizit','/kartvizit'],['Zarf','/zarf'],['Antetli Kâğıt','/antetli'],['Cepli Dosya','/dosyalar'],['Katalog','/kataloglar'],['Bloknot','/bloknotlar'],['Küp Bloknot','/kup-bloknot'],['Karton Çanta','/karton-canta']] },
  { name: 'Makbuz ve Formlar', products: [['Adisyon','/adisyon'],['Sipariş Fişi','/siparis-fisi'],['Para Makbuzu','/para-makbuzu'],['Sözleşme','/sozlesme-baski'],['Sigorta Poliçeleri','/sigorta-policeleri'],['Tahsilat Makbuzu','/tahsilat-makbuzu'],['Araç Kiralama','/arac-kiralama'],['Gider Makbuzu','/gider-makbuzu'],['Giriş Bileti','/giris-bileti'],['Reçete','/recete'],['Tediye Makbuzu','/tediye-makbuzu']] }
];

export function getCityOrderGuides(city: CityInfo): PrintOrderGuide[] {
  return CITY_SEARCH_CONTENT[city.slug].products.map(product => {
    const guide = PRINT_ORDER_GUIDES[product];
    if (!guide) throw new Error(`Missing product order guide: ${city.slug} / ${product}`);
    return guide;
  });
}

export function getCityOrderFAQ(city: CityInfo) {
  return [
    ...getCityOrderGuides(city).map(guide => ({ question: guide.question, answer: guide.answer })),
    { question: 'Baskı dosyam hazır değilse nasıl ilerleyebilirim?', answer: 'Ürün, ölçü, adet, logo ve metinlerin durumunu paylaşın. Grafik desteği var. Tasarım desteğinin kapsamı ve varsa bedeli teklif aşamasında değerlendirilir. Baskıya hazır dosyanın teknik kontrolü ve PDF prova kontrolü ücretsizdir.' },
    { question: 'PDF prova onayı neyi kapsar?', answer: 'Prova üzerinde metin, iletişim bilgileri, sayfa sırası ve yerleşim kontrol edilir. PDF prova fiziksel baskının rengini, kâğıt dokusunu veya karton sertliğini birebir temsil etmez. Dijital onay alınmadan baskıya başlanmaz.' },
    { question: `${city.name} siparişlerinde üretim ve kargo süresi nasıl belirlenir?`, answer: 'Üretim ve teslim süresi ürün, adet, malzeme ve onay sürecine göre teklif aşamasında paylaşılır. Baskının hazırlanması ve kargonun taşıma süresi ayrı değerlendirilir; gönderim planı için açık adres ve ilçe bilgisi istenir.' }
  ];
}

export function getCityServiceSchema(city: CityInfo) {
  const canonical = `https://mavibasim.com/${city.slug}`;
  return {
    '@context': 'https://schema.org', '@type': 'Service', '@id': `${canonical}#service`,
    name: `${city.name} Matbaa ve Baskı Hizmetleri`, serviceType: 'Matbaa ve Baskı Hizmetleri',
    url: canonical, description: CITY_SEARCH_CONTENT[city.slug].desc,
    provider: { '@type': 'LocalBusiness', name: 'Mavi Basım Matbaa & Reklam', url: 'https://mavibasim.com', telephone: PHONE_NUMBER,
      address: { '@type': 'PostalAddress', streetAddress: 'Topkapı 2. Matbaacılar Sitesi B Blok No:2NB Zeytinburnu', addressLocality: 'İstanbul', addressCountry: 'TR' } },
    areaServed: { '@type': 'AdministrativeArea', name: city.name }
  };
}

export function getCityFAQSchema(city: CityInfo) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: getCityOrderFAQ(city).map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) };
}
