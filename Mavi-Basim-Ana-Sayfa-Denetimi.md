# Mavi Basım Ana Sayfa Denetimi

**İşlem:** Ana sayfanın kaynak kodda düzeltilmesi — 13 Ekim 2026.

**Geçici puan: 92/100.** Önceki denetim: 44/100. Yeni puan, düzeltilmiş kaynak ve yerel test çıktısı içindir; canlı sitenin yayınlanmış durumunu veya Google sıralamasını göstermez. Yayınlama/deploy yapılmadı. Google’da ilk sayfa konumu garanti edilmez.

Kaynak: kullanıcının gönderdiği `mavibaski.rar`. Teslim: `Mavi-Basim-Duzeltilmis-Proje.zip`. Düzeltmeler kaynak koddadır; yalnız dist HTML’sine yapılan bir yama değildir. ZIP, mevcut kaynak kodu, SEO ve ürün verilerini, görselleri, yapılandırmaları ve doğrulama dosyalarını içerir. Kurulum bağımlılıkları, üretilmiş dist ve Git geçmişi ZIP’e konulmadı.

**Koruma kuralı:** Fiyat listeleri ve tablolarının verileri, başlıkları, satırları, HTML/JSX’i, stilleri, bağlantıları ve düğmeleri değiştirilmedi. Ana sayfanın fiyat bölümünün tamamı ve 18 kartın fiyat bloğu, özgün bileşenin render çıktısıyla birebir karşılaştırıldı. İki çıktının HTML’si aynı. Marka renkleri, fontlar, logo, görsel dosyaları, beş banner ve geçiş sistemi korunmuştur.

## 1/6 — Kapsam, başlık ve giriş

**Geçici kapsam puanı: 100/100; tam sayfa değerlendirmesi değildir.**

### Giderilen sorun — B16: Kanıtlanmayan kesin üstünlük ifadesi

Hızlı erişim paragrafındaki “Türkiye'nin lider” ifadesi, mevcut hizmeti anlatan “Türkiye geneline hizmet veren” ifadesiyle değiştirildi. Yeni işletme iddiası eklenmedi. Kaynak: `src/App.tsx`, hızlı erişim bölümü.

Metadata çakışmasının çözümünde mevcut SEO kaynağındaki title esas alındı: **Matbaa ve Baskı Çözümleri | Mavi Basım — 38 karakter.** Banner H1’i ve sağlıklı giriş metinleri yeniden yazılmadı. Katı karakter sınırı uygulanmadı.

Bu kapsamda kalan doğrulanmış sorun yok.

### ÇÖZÜM PROMPTU — 1/6

Bu kapsamda ek değişiklik yapma. Mevcut başlık ve hizmet metinlerini yeniden yazma. **Fiyat listeleri ve tablolarının verilerine, başlıklarına, satırlarına, HTML’sine, stillerine, bağlantılarına ve düğmelerine dokunma.** Deploy yapma.

## 2/6 — Prerender ve hydration

**Geçici kapsam puanı: 100/100 (25/25); gerçek tarayıcı sınırlaması aşağıdadır.**

### Giderilen sorun — B01: İlk HTML’de yalnız H1 bulunması

Önceki root içeriği yalnız H1’di. `scripts/prerender.ts` artık `/` rotasında mevcut React uygulama kabuğunu ve `HomePage` bileşenini `src/prerenderHome.tsx` üzerinden render ediyor. Ayrı statik içerik kopyası oluşturulmadı; fiyat tablosu değişmeyen mevcut JSX’ten üretiliyor.

Üretilen ilk HTML ve istemci DOM’u: **369 root bağlantısı, 17 görünür SSS, 7 fiyat satırı.** Ana sayfa metninin tamamı ve bağlantı hedeflerinin sırası hydration öncesi/sonrası karşılaştırıldı; eşleşti. Fiyat bölümünün HTML’si hydration sonrasında da aynı kaldı. Testte içerik kaybı, çoğalma veya React hydration hatası oluşmadı.

`src/main.tsx`, ana sayfanın işaretlenmiş prerender çıktısında `hydrateRoot` kullanıyor. Diğer rotaların mevcut istemci başlangıcı korunuyor. Sunucu, üretilmiş ana sayfaya tekrar schema eklemiyor; fallback için ayrı build şablonunu kullanıyor. Bu şablon, mevcut ana sayfanın yanlışlıkla 404 içeriği olarak sunulmasını da önlüyor.

**Doğrulama sınırı:** Hydration ve etkileşim testleri React + JSDOM ile yapıldı. Gerçek Chrome hydration testi yapıldı şeklinde sunulmaz. Geliştirme ve üretim sunucusu HTTP testlerinde `/` ve `/?s=kartvizit` 200 verdi. Kaynak build aşamaları tamamlandı; 294 HTML üretildi. Prerender yeniden çalıştırıldığında da tamamlandı.

### ÇÖZÜM PROMPTU — 2/6

Kaynakta kanıtlanmış kalan prerender sorunu yok; ek düzeltme uygulama. Mevcut çıktıyı gerçek tarayıcıda açılış ve yenileme ile doğrula; yalnız yeniden üretilen somut bir hata varsa en küçük kaynak düzeltmesini yap. İkinci statik içerik kopyası, yeni paket veya dist yaması oluşturma. **Fiyat listeleri ve tablolarının verilerine, başlıklarına, satırlarına, HTML’sine, stillerine, bağlantılarına ve düğmelerine dokunma.** Deploy yapma.

## 3/6 — Metadata, canonical ve schema

**Geçici kapsam: metadata 25/25, schema 20/20.**

### Giderilen sorunlar — B02–B06

- **Mükerrer ve eski rota verileri:** Prerender etiketlerine sahiplik işareti verildi. `RouteSEOHead`, rota değişiminde önceki rotaya ait etiketleri temizliyor; React/Helmet tarafından yönetilen etiketleri silmiyor. Ana sayfadaki ikinci Helmet üreticisi ve ortak bileşenlerin ana sayfa için çakışan üretimleri kaldırıldı. Metadata için mevcut SEO kaynağı kullanılıyor.
- **Geçersiz tür:** Ana sayfa schema’sındaki `PrintingService` kaldırıldı; mevcut `Organization`, `LocalBusiness`, şirket bilgileri ve geçerli ItemList korundu.
- **Görünür SSS ile ayrı schema:** SSS ve FAQPage aynı `HOME_FAQS` kaynağından üretiliyor. Testte 17 soru ve 17 cevap görünür kayıtlarla birebir eşleşti.
- **Çalışmayan SearchAction:** `/?s=` adresi sonuç üretmediği için bu schema eylemi kaldırıldı. Yeni arama özelliği/route eklenmedi.
- **Yanlış OG ölçüleri:** Ana sayfanın mevcut 512×512 logo dosyası için OG ölçüleri 512×512 yapıldı. Dosya yeniden boyutlandırılmadı; ürünlerin metadata görselleri değiştirilmedi.

İlk HTML, yenileme, doğrudan kartvizit açılışı → ana sayfa ve ana sayfa → ürün → ana sayfa testlerinde ana sayfada bir title, bir description ve `https://mavibasim.com/` değerinde bir canonical doğrulandı. `document.title`, OG ve Twitter verileri aynı ana sayfa kaynağına döndü. Product ve ürün breadcrumb’ı ana sayfada kalmadı.

**B18 — Ek doğrulanan teknik hata:** Cepli dosya bileşeninin eski temizleme seçicisi React 19’un yönettiği head etiketlerini de siliyordu. Ürün → ana sayfa dönüşünde `removeChild` hatası yeniden üretildi. `src/components/Dosyalar.tsx` içinde yalnız bu seçici, sahipliği işaretlenmiş prerender etiketlerini hedefleyecek şekilde düzeltildi. Sayfanın kalan içeriği, fiyatları, JSX’i ve URL’si birebir aynı. Son testte bu hata tekrar oluşmadı.

Ana sayfaya dönüş **20 ürün/hizmet rotasında** test edildi: kartvizit, broşür, magnet, etiket, kutu, karton çanta, antetli, makbuz ve formlar, el ilanı, katalog, kitap ayracı, yağ kartı, zarf, dosyalar, bloknotlar, küp bloknot, Amerikan servis, oto paspas, afiş ve sipariş fişi.

**Koruma kanıtı:** Ana sayfa dışındaki sitemap rotalarının 293 SEO nesnesi özgün kaynakla karşılaştırıldı; title, description, canonical, schema/OG ekleri ve mevcut bodyContent değerleri değişmedi. Bu karşılaştırma, 293 sayfanın ayrı ayrı tam SEO denetiminin yapıldığı anlamına gelmez.

### ÇÖZÜM PROMPTU — 3/6

Bu kapsamda kanıtlanmış kalan ana sayfa hatası yok; yeni metadata/schema üreticisi ekleme. Gerçek tarayıcıda aynı geçişleri doğrula; mevcut şirket bilgilerini ve geçerli ItemList’leri koru. Schema fiyatlarını yeniden hesaplama. **Fiyat listeleri ve tablolarının verilerine, başlıklarına, satırlarına, HTML’sine, stillerine, bağlantılarına ve düğmelerine dokunma.** Deploy yapma.

## 4/6 — Bağlantılar ve menüler

**Geçici kapsam puanı: 87/100 (13/15).**

### Giderilen sorunlar — B07–B10 ve B17

- Kategori alanındaki 30 sayfa hedefi ve Matbaa Ürünleri menüsündeki sayfa hedefleri gerçek Link/href oldu. Hedefleri, metinleri, sıraları ve stilleri korunuyor. Menü açma ve sekme düğmeleri düğme olarak kaldı.
- Altı rehber kartının ilgisiz `/brosur` çağrıları düzeltildi. Maliyet hesabı kartı doğrulanan mevcut `/blog/matbaa-fiyatlarini-neler-belirler` yazısına bağlandı. Diğer beş kartta doğrulanmış yazı olmadığı için yanıltıcı “Yazıyı Oku” çağrısı kaldırıldı; yeni yazı/URL oluşturulmadı.
- Tablo dışındaki genel fiyat çağrısı `/#fiyatlar`, süreç çağrısı `/#siparis-sureci`, genel ürün/sipariş çağrıları `/#products` hedeflerine bağlandı. Bölüm kimlikleri kaynakta doğrulandı; DOM testinde her çağrı kendi bölümünü hedefledi.
- “Tasarımını Ücretsiz Denetlet” hazır mesajı teknik tasarım kontrolü istemek üzere düzeltildi. Telefon numarası aynı; mesaj gönderilmedi.
- Hover ile açılan menünün ilk pointer tıklamasında kapanması giderildi. JSDOM’da mouse giriş + ilk tıklama ve Escape davranışı test edildi. Menü içerikleri ve mevcut klavye düzeni değiştirilmedi. Gerçek pointer/klavye tarayıcı testi yapılmış gibi sunulmaz.

### Fiyat koruması nedeniyle müdahale edilmeyen sorunlar

1. `#fiyatlar` içindeki genel **Online Sipariş Ver** çağrısı `/kataloglar` hedefinde kaldı. Genel ürün seçimi yerine katalog sayfasına götürmesi kaynakta doğrulanıyor; bu bağlantı korunan fiyat bölümünde.
2. **Fiyat Listesi** menüsündeki sayfa hedefleri button/navigate biçiminde kaldı; bu öğeler href üretmiyor. Korunan fiyat listesi bağlantıları/düğmeleri dönüştürülmedi. Bunun bütün ürünlerin taranamadığı anlamına geldiği iddia edilmez.

### ÇÖZÜM PROMPTU — 4/6

Kalan iki sorun fiyat koruma alanında olduğundan bunlara müdahale etme. Kapsam dışındaki çağrıları veya ürün URL’lerini değiştirme. Bu kapsamda ek düzeltme yok. **Fiyat listeleri ve tablolarının verilerine, başlıklarına, satırlarına, HTML’sine, stillerine, bağlantılarına ve düğmelerine dokunma.** Deploy yapma.

## 5/6 — Görünüm ve doğru anlatım

**Geçici kapsam puanı: 60/100 (9/15).** Kalan altı puan, görsel/performans test kapsamı nedeniyle değerlendirmeye alınmadı; doğrulanmış altı yeni hata anlamına gelmez.

### Kaynakta düzeltilen doğrulanmış sorunlar — B11–B15

- Banner metni için okların iki yanında yerel boşluk ve alt kontroller için boşluk ayrıldı. İlk sunucu renderında metin/görselin opacity 0 kalmasını önlemek için yalnız ilk giriş animasyonu devre dışı bırakıldı; beş banner ve sonraki geçişler korunuyor.
- Kart açıklaması/özellik/çağrı metinlerindeki kırpma sınıfları kaldırıldı ve satır sarmaya izin verildi. Fiyat bloklarının HTML/class verileri değişmedi. Genel CSS değiştirilmedi.
- Teknik kolajın ofset makine parkuru, selefon örneklerinin makine ve tasarım ekranının ekip kıdemi kanıtı gibi anlatılması düzeltildi. Yalnız ilgili başlık, alt ve açıklamalar düzenlendi; aynı altı görsel korundu.
- PNG için CMYK hazırlama talimatı düzeltildi. PDF provasının bütün hataları “%100 engellediği” ve “Sıfır Hatalı Baskı Güvencesi” ifadeleri, mevcut dosya kontrolü/PDF onayı iş akışının sınırlarıyla uyumlu hale getirildi. İade/yeniden basım koşulları, üretim süreleri, minimum adet ve ödeme şartları yeniden belirlenmedi.
- “E-E-A-T Şeffaflık & Üretim Standartları” → “Baskı ve Üretim Standartları”; “Hızlı Erişim & İç Linkleme Merkezi” → “Hızlı Erişim”. Matbuu, sebob, TÜRKİYENİN ve bölüm başlığındaki & boşluğu düzeltildi.

**Önemli sınır:** Düzenlenen kartların ve bannerın son geometrisi gerçek masaüstü/mobil tarayıcı ekranında ölçülemedi. Bu nedenle tüm kırpılma/örtüşme sorunlarının her ekranda giderildiği iddia edilmez. JSDOM geometrik yerleşim ve gerçek klavye/pointer davranışı için yeterli kanıt değildir.

### ÇÖZÜM PROMPTU — 5/6

Doğrulanmış yeni bir görünüm hatası olmadan ek CSS/içerik değişikliği yapma. Yerel build’i gerçek masaüstü ve mobil tarayıcıda kontrol et; yalnız yeniden üretilen örtüşme/kırpılmayı ilgili ana sayfa metin alanında düzelt. Beş bannerı, görselleri, renkleri ve fontları koru. **Fiyat listeleri ve tablolarının verilerine, başlıklarına, satırlarına, HTML’sine, stillerine, bağlantılarına ve düğmelerine dokunma.** Fiyat alanında görünüm sorunu varsa yalnız raporla. Deploy yapma.

## 6/6 — Son kontrol, puan ve sınırlar

| Kapsam | Ağırlık | Geçici puan | Kalan sorun / test sınırı |
|---|---:|---:|---|
| Prerender/hydration | 25 | 25 | Gerçek Chrome doğrulaması eksik; HTTP ve React/JSDOM testleri mevcut |
| Metadata/canonical/rota temizliği | 25 | 25 | Canlı yayında bu sürüm test edilmedi |
| Schema | 20 | 20 | Tam Google canlı URL incelemesi yapılmadı |
| Tarama/URL/bağlantılar | 15 | 13 | Korunan fiyat çağrısı ve fiyat menüsü hedefleri |
| Başlık/görsel/kullanılabilirlik/performans | 15 | 9 | Gerçek mobil/masaüstü geometri ve Core Web Vitals ölçümü eksik |
| **Toplam** | **100** | **92** | **Düzeltilmiş yerel sürüm için geçici** |

Aynı sorun iki kez puanlanmadı. İsteğe bağlı özellik, video veya yeni bölüm yokluğu hata sayılmadı. Bu puan Google ilk sayfa, satış ya da trafik sonucu ölçümü değildir.

### Kalan doğrulanmış sorunlar — önem sırası

1. **Orta:** Korunan fiyat bölümündeki genel sipariş çağrısının tek ürün/katalog hedefine gitmesi.
2. **Düşük:** Korunan fiyat menüsündeki sayfa hedeflerinin gerçek href üretmemesi.

İkisine de fiyat koruma kuralı nedeniyle müdahale edilmedi. Koruma alanı dışında kalan ve yeniden doğrulanmış bir kaynak hatası testler sonunda açık kalmadı; görsel test eksikleri “sorun yok” kanıtı değildir.

### Doğrulama kanıtları

- Mevcut Vite build, `node --import tsx scripts/prerender.ts` ve mevcut esbuild sunucu bundle aşamaları tamamlandı. 294 sayfa HTML’si üretildi; ikinci prerender çalışması da tamamlandı. Paket/framework eklenmedi; package.json ve lockfile aynı.
- `npm run typecheck` tamamlandı. Değiştirilen dosyaların ESLint kontrolünde hata yok; mevcut dosyalarda uyarılar var. Tam proje lint/quality zincirinin geçtiği iddia edilmez.
- `node validate-home-fix.cjs`: ilk HTML/hydration metin ve bağlantı eşleşmesi, fiyat koruması, metadata/schema, bölüm çağrıları, menü state/Escape, 20 ürün/hizmetten dönüş, doğrudan kartvizit → ana sayfa ve yeniden açılış testleri tamamlandı. Testte console/hydration hatası kaydedilmedi.
- `node validate-home-http.cjs` ve `node validate-home-http.cjs --dev`: geliştirme/üretimde ana sayfa ve kartvizit HTTP 200, bilinmeyen adres HTTP 404; başlık/description/canonical tekilliği ve ana sayfa içeriği kontrol edildi. Üretim sunucusunda ana sayfanın 26 farklı yerel görsel kaynağı HTTP 200 ve image content-type verdi. Bu, gerçek lazy yükleme veya görsel geometri ölçümü değildir.
- 485 özgün proje dosyası byte düzeyinde aynı. Altı mevcut dosyada sınırlı düzeltme var: `src/App.tsx`, `src/main.tsx`, `src/utils/seoGenerator.ts`, `scripts/prerender.ts`, `server.ts`, `src/components/Dosyalar.tsx`. App içindeki kapsam dışı 73 deklarasyon aynı; Dosyalar dosyasında yalnız SEO temizleme seçicisi değişti.
- Fiyat bölümü, fiyat menüsü içeriği ve kart fiyat bloğu kaynaklarının SHA-256 karşılaştırmaları eşleşti. Özgün React renderıyla tam fiyat bölümü ve 18 fiyat bloğunun HTML karşılaştırmaları da eşleşti.

### Önemli doğrulama sınırlamaları

- Normal `npm run build` içindeki tsx CLI, bu ortamda izin verilmeyen Unix IPC soketi nedeniyle önceki çalışmada durdu. Bu bir site hatası olarak puanlanmadı. Aynı prerender kaynağı Node’un tsx loader’ı ile çalıştırıldı; normal tek komutun burada geçtiği söylenmez. Build aşamaları yukarıdaki biçimde test edildi.
- Gerçek Chrome testine gereken headless tarayıcı indirilemedi. Mobil ekran, gerçek odak sırası, lazy görsellerin tarayıcı yüklenmesi ve son CSS geometrisi tamamlanmadı.
- LCP, CLS ve INP ölçülmedi; laboratuvar veya gerçek kullanıcı değeri yazılmadı. Search Console, gerçek arama konumları, tıklamalar, dönüşümler ve Google’ın canlı URL işleme sonucu alınmadı.
- Canlı site değiştirilmedi. Beklenen yayın sürümü hakkında çıkarım yapılmadı; canlı asset’in eski olduğu iddia edilmedi. Alt sayfaların tamamına ilk sayfa garantisi verilmedi ve ayrı tam denetimleri tamamlanmış sayılmadı.

### ÇÖZÜM PROMPTU — 6/6

Bu rapordaki düzeltilmiş kaynak sürümünü esas al. Fiyat koruma alanındaki kalan iki soruna müdahale etme. Kapsam içinde kanıtlanmış yeni kaynak hatası olmadığı için ek değişiklik uygulama. Gerçek tarayıcıda açılış, yenileme, mobil görünüm, banner kontrolleri, klavye erişimi, lazy görseller ve ürün → ana sayfa dönüşlerini doğrula. Yalnız yeniden üretilen somut bir hata varsa en küçük kalıcı kaynak düzeltmesini yap ve bu raporu güncelle. Ölçmediğin performans/Google sonucunu yazma. Yeni özellik, bölüm, görsel, route, framework, paket veya dış hizmet ekleme; yalnız dist yaması yapma. **Fiyat listeleri ve tablolarının verileri, başlıkları, satırları, HTML’si, stilleri, bağlantıları ve düğmeleri kesinlikle değiştirilmeyecek.** Diğer sayfaların içeriklerini, tarifelerini ve URL’lerini koru. Yayınlama/deploy yapma.


## GitHub işlemi — 13 Ekim 2026

Depo: `TaFo702/mavibaski`. Düzeltme dalı: `codex/ana-sayfa-seo-20261013`. Başlangıç commit’i: `ddc0447a94cb352210eee281064c5b4f6c91c9c6`. GitHub `main` ile özgün RAR’daki commit aynı olduğundan yeniden içerik geliştirilmedi; test edilmiş 12 kaynak/test dosyası tek değişiklik kümesiyle aktarıldı. Bu Markdown dosyası işlem raporudur. Fiyat listeleri, tablolar, ürün verileri, public görseller ve diğer sayfa içerikleri aynı kalır. Ana dala merge veya canlı deploy bu işlemin parçası değildir.

Doğrulama: Mevcut 20 rota dönüşü, React/JSDOM hydration, geliştirme/üretim HTTP ve fiyat HTML eşitlik kontrolleri önceki aşamada tamamlandı. Aktarılan 12 dosyanın byte içeriği test edilmiş ZIP ile eşleşir. Yeni test yapılmış gibi sunulmaz. Gerçek mobil/masaüstü tarayıcı geometri kontrolü ve tam quality zinciri tamamlanmadığından 92/100 puan geçicidir. Fiyat koruması nedeniyle kalan iki bağlantı sorunu önceki bölümlerde açıklanmıştır.

### ÇÖZÜM PROMPTU — GitHub işlemi

Bu dalda bulunan test edilmiş düzeltmeleri esas al. Aynı işi yeniden yazma. Fiyat listeleri ve tablolarının verilerine, başlıklarına, satırlarına, HTML’sine, stillerine, bağlantılarına ve düğmelerine dokunma. Diğer sayfa içeriklerini ve URL’lerini koru. Kanıtlanmış yeni hata olmadan ek değişiklik yapma; merge/deploy yapma.


## Yayın öncesi kontrol — 13 Ekim 2026

- PR #14: https://github.com/TaFo702/mavibaski/pull/14
- Kaynak düzeltme commit'i: `3b5b6250c57efa5c8359b3653f5da290521a953e`.
- GitHub Actions `Production Quality Gate`, run 127 / `38460539045`: `completed`, `success`. `Run Full Quality Gate` adımı başarıyla tamamlandı. Bu sonuç, önceki yerel ortamda tam quality komutunun doğrulanamamış olmasından ayrı bir GitHub CI kanıtıdır.
- Vercel'in düzeltme dalı için commit durumu `success`; bu tek başına ana domainin güncellendiği anlamına gelmez.
- `https://mavibasim.com/` için 13 Ekim 2026 23:13 Türkiye saati kontrolünde HTTP 200, ilk HTML'de `#root` 55 karakter, 0 gerçek bağlantı, `data-prerendered` işareti ve `#fiyatlar` bölümü yok. İstemci asset'i `/assets/index-W5OUHuw1.js`. Bu kontrol, hazırlanan ana sayfa prerender düzeltmesinin henüz bu domainin ilk HTML'sinde görülmediğini doğrular.
- PR incelemeye hazır duruma getirildi. `main` dalına merge girişimi otomatik onay denetimince reddedildi: önceki açık yayınlama yasağı nedeniyle sonraki şikâyet kesin merge/deploy onayı kabul edilmedi. Reddedilen işlem uygulanmadı; canlı yayın başlatılamadı. Kesin PR/main/canlı yayın onayı bekleniyor.
- Bu aşamada yalnız rapor güncellendi; kaynak düzeltmeler yeniden yazılmadı. Fiyat listeleri, tablolar, görseller, diğer sayfaların içerikleri ve URL'leri için mevcut koruma kuralları devam ediyor.
- Gerçek tarayıcı/mobil/CWV test sınırlamaları sürüyor; geçici puan 92/100.

### ÇÖZÜM PROMPTU — yayın adımı

Yalnız açık kullanıcı onayından sonra, `TaFo702/mavibaski` deposundaki PR #14'ün güncel head SHA'sını ve kalite kontrolünü doğrula; bu PR'ı `main` dalına birleştir. Mevcut Vercel yayın sürecinin sonucunu ve `https://mavibasim.com/` yanıtını kontrol et. Yayınlandığını yalnız gerçek domainin yeni prerender çıktısını sunmasıyla doğrula. Fiyat listeleri ve tablolarının verilerine, başlıklarına, satırlarına, HTML'sine, stillerine, bağlantılarına ve düğmelerine kesinlikle müdahale etme. Yeni kaynak düzeltmesi veya yeni yayın sistemi ekleme.
