# Mavi Basım — Antetli Kağıt Denetimi ve Düzeltme Kaydı

İncelenen sayfa: https://mavibasim.com/antetli  
Tarih: 14 Ekim 2026  
Kapsam: Kullanıcının eklediği 65 soruluk metin; yalnız antetli sayfası ve onu doğrudan etkileyen kaynak üretimi. Kullanıcının açık düzeltme ve yayın onayıyla, önce kanıtlar toplandı, sonra kaynak düzeltmeleri uygulandı.

## 1. Puan

Düzeltme sonrası **94/100 — geçici teknik inceleme puanı**.

| Alan | Ağırlık | Değerlendirilen puan |
| --- | ---: | ---: |
| Prerender / ilk HTML / hydration | 25 | 25 |
| Metadata / canonical / rota temizliği | 25 | 25 |
| Yapılandırılmış veriler | 20 | 20 |
| Tarama / URL / bağlantılar | 15 | 15 |
| Başlık / görsel / kullanılabilirlik / ölçülmüş performans | 15 | 9 |
| Toplam | 100 | 94 |

Son alandaki 2 puan, korunacak fiyat tablosundaki aşağıda kanıtlanan başlık ilişkilendirmesi nedeniyle verilmedi. Kalan 4 puan mobil ve ölçülmüş performans kapsamı tamamlanmadığı için açık bırakıldı; bu, ölçülmemiş bir hatanın varlığı veya performans cezası anlamına gelmez. Aynı sorun farklı kategorilerden tekrar düşülmedi. Bu puan Google sıralama puanı veya ilk sayfa tahmini değildir.

## 2. Doğrulanmış sorunlar, kanıtları ve yapılan en küçük düzeltmeler

### A01 — Yüksek: İlk HTML ile gerçek sayfa farklıydı
İlgili sorular: 12, 16, 28, 53, 65.

Düzeltme öncesi canlı ilk HTML root içinde 3 H2 ve 13 bağlantı içeriyordu. Chrome'da JavaScript sonrası ana içerikte 11 H2, root içinde 66 bağlantı oluşuyordu. Sipariş süreci, baskı seçenekleri, dosya hazırlığı, fiyatı etkileyen faktörler, ölçüler ve ilgili rehberler gibi mevcut içerikler ilk HTML kopyasında yoktu.

Kaynak neden: getRouteSEO('/antetli') ayrı generateAntetliSSRBodyContent() şablonunu çağırıyor; tarayıcı ise mevcut AntetliPage bileşenini createRoot ile yeniden üretiyordu.

Etki: Sayfanın önemli mevcut açıklamaları ve bağlantıları JavaScript çalışmasına bağımlıydı; ilk HTML gerçek sayfa ile tutarlı değildi. Bu bulgu Google'ın sayfayı hiç indekslemediği iddiası değildir.

Düzeltme: Mevcut esbuild/React prerender akışına yalnız antetli rotasının gerçek AntetliPage bileşeni bağlandı; tarayıcının lazy route tercihi korundu. Antetli için eşleşen prerender işaretine hydrateRoot uygulandı. Eski şablonun aktif SEO üretimindeki import ve çağrısı kaldırıldı. Mevcut tablo bileşeni aynen render ediliyor; fiyat bölümüne yeni HTML/JSX yazılmadı.

Sonuç kanıtı: Üretilen gerçek rotada 11 H2 ve 66 bağlantı bulunuyor. Yerel regresyonda bütün root metni ve bağlantıları hydration öncesi/sonrası eşleşiyor; mevcut fiyat tablosu aynı DOM düğümü ve aynı HTML olarak korunuyor.

### A02 — Orta: Ebat/adet seçenekleri AggregateOffer altında tek ürüne toplandı
İlgili sorular: 24, 26, 49.

İlk HTML ve canlı DOM'daki antetli-product-schema, farklı A4/A5 ve adet seçeneklerini tek Product altında AggregateOffer lowPrice=2350, highPrice=5000, offerCount=6 olarak tanımlıyordu. Fiyat aralığı mevcut tablo tutarlarıyla eşleşiyor; sorun tutarlarda değil, farklı seçeneklerin bu şema ile toplanmasıdır.

Google Product snippet yönergesi AggregateOffer'ın ürün varyantlarını toplamak için kullanılmamasını belirtir:
https://developers.google.com/search/docs/appearance/structured-data/product-snippet#aggregateoffer

Etki: Sayfanın ebat/adet seçenekleri tek ürünün toplu teklifleri gibi temsil ediliyordu.

Düzeltme: Yalnız bu Product/AggregateOffer kaydı ve üretimi kaldırıldı. Mevcut şirket, WebSite, breadcrumb ve görünür 11 soruya dayanan FAQ kayıtları korunuyor. Yeni ürün, fiyat, stok, rating veya ticari koşul işaretlemesi oluşturulmadı.

### A03 — Orta: Tablo dışındaki sipariş açıklaması mevcut düğme davranışıyla uyuşmuyordu
İlgili sorular: 1, 36, 40.

Eski cümle, Hemen Sipariş Ver düğmesinin doğrudan WhatsApp sipariş hattına ulaştırdığını söylüyordu. Canlı Chrome kontrolünde ANT1 düğmesi önce ürün detay penceresini açtı; WhatsApp ile İletişim bağlantısı bu pencerenin içindeydi.

Etki: Müşteriye sonraki adım yanlış anlatılıyordu.

Düzeltme yalnız mevcut tablo dışı paragrafta:
“Fiyat listesinden ürün kodu, ebat ve adet seçimini yaptıktan sonra Hemen Sipariş Ver butonuyla ürün detayını açabilirsiniz. Açılan penceredeki WhatsApp ile İletişim bağlantısından logo, firma bilgileri ve sipariş detaylarını paylaşabilirsiniz. Baskı süreci sipariş bilgilerine göre planlanır.”

Tablo içindeki düğme, kod, handler, fiyat veya sipariş sistemi değiştirilmedi.

### A04 — Düşük: Bazı galeri açıklamaları görselden doğrulanamayan ayrıntılar içeriyordu
İlgili sorular: 10, 44.

- antetli-kagit-tasarimi.webp: alt metin “watermark (filigran) ayarı” diyordu; görsel firma logosu ve iletişim yerleşimini gösteriyor, bir ayar ekranı göstermiyor.
- antetli-kagit-baski-detayi.webp: alt metin 90 gr malzeme ve yüksek hassasiyet iddiası içeriyordu. Görsel makine üzerindeki çoklu antetli tasarımları gösteriyor; gramaj veya hassasiyet görselden doğrulanamıyor.
- tasarimli-antetli-kagit.webp: alt metin “matbaa kalıp dosya kontrol süreci” diyordu; görsel logo/renk hazırlığı yapılan grafik tasarım ekranını gösteriyor.

Etki: Görselin gerçekten gösterdiği içerikle açıklaması uyuşmuyordu.

Düzeltme:
- Tasarım örneğinin alt metni: “Logo ve iletişim bilgileri içeren antetli kağıt tasarım örneği”.
- Makine görselinin başlığı: “Antetli Kağıt Baskı Süreci”; alt metni: “Baskı makinesinde çoklu antetli kağıt tasarımları”; açıklaması: “Baskı makinesindeki antetli kağıt tasarımlarını gösteren görsel örneği.”
- Dosya hazırlığı görselinin alt metni: “Bilgisayar ekranında logo tasarımı ve baskı öncesi hazırlık”; açıklaması: “Grafik tasarım ekranında logo ve renk hazırlığını gösteren örnek.”

Görseller, dosyaları, boyutları ve galeri sayısı değiştirilmedi; işletmeye makine/tesis sahipliği atfedilmedi.

## 3. Koruma kuralı nedeniyle müdahale edilmeyecek sorun

### A05 — Tablo başlıklarının satır grubu ilişkisi
İlgili soru: 50.

Mevcut fiyat tablosunda bir tbody içinde 6 satır bulunuyor. “15x21 cm” ve “21x29.7 cm” hücrelerinin ikisi de scope="rowgroup", rowspan="3"; ikisi de aynı tbody içinde ve açık headers ilişkisi yok.

HTML standardında rowgroup kapsamı ilgili tbody/thead/tfoot satır grubuna uygulanır; yalnız rowspan kadar satırla sınırlı bir ebat grubu değildir. Bu yapı, alttaki A4 fiyat hücrelerinin A5 ebat başlığıyla da ilişkilendirilmesine yol açabilecek bir başlık ilişkisi sorunudur. Gerçek ekran okuyucu davranışı ayrıca test edilmedi.

Referans:
https://html.spec.whatwg.org/multipage/tables.html#attr-th-scope

**Fiyat koruma kuralı nedeniyle tabloya müdahale edilmedi.** Tablo HTML'si, scope, tbody, rowspan, başlıklar, veri, stiller ve düğmeler değiştirilmedi. Bu sorun çözüm promptuna alınmadı.

## 4. Önemli doğrulama sınırlamaları

- Mobil ekranlar, gerçek cihazlar ve ekran okuyucular test edilmedi.
- LCP, CLS ve INP laboratuvar veya gerçek kullanıcı verisiyle ölçülmedi; performans sayısı yazılmadı.
- GSC indeksleme/URL Inspection/Rich Results aracı kullanılmadı. Sıralama, trafik veya indekslenme kazanımı iddia edilmiyor.
- Yerelde npm run build, Vite sonrasında tsx CLI Unix soketinde EPERM hatasıyla durdu. Aynı prerender kaynak dosyası node --import tsx ile çalıştırıldı ve mevcut server bundle komutu ayrıca yürütüldü. Tek komutun yerelde geçtiği söylenmiyor.
- İnceleme masaüstü Chrome 1363 × 936 görünümü ve yerel DOM/HTTP regresyonlarıyla sınırlı. Tarayıcı eklentisi kaynaklı konsol mesajları site hatası sayılmadı.
- İşletmenin tüm üretim olanakları bağımsız ticari belgelerle doğrulanmadı; yeni işletme iddiası üretilmedi.
- Title 53 karakter; alternatif bir title, description veya H1 çalışması yapılmadı. Bu metinlerde doğrulanmış sorun olmadığı için değiştirilmedi.

## Kaynak ve koruma kanıtı

Fiyat listelerine ve tablolarına, onları besleyen veriye, başlık ve açıklamalarına, HTML/JSX'sine, stillerine ve düğmelerine kesinlikle dokunulmayacak kuralı uygulandı.

Antetli.tsx içindeki fiyat işaretinden galeri işaretine kadar bütün kaynak bölümünün önce/sonra SHA256 değeri aynı:
62417445aa1e5c82e8f8bd806bbccb67ffc4d678e5c7ba4519b20877c3d61a36

Diğer 293 rotanın üretilen HTML içeriği asset dosya adları normalize edilerek karşılaştırıldı; içerik farkı bulunmadı. Tarife veri dosyaları ve görsel dosyaları değişmedi. public/sitemap.xml içinde yalnız /antetli lastmod değeri gerçek düzenleme günü olan 2026-10-14 yapıldı.

Değişen kaynak dosyaları:
- src/App.tsx — yalnız antetli build bileşeni parametresi ve mevcut rotaya aktarımı.
- src/prerenderHome.tsx — antetli gerçek bileşen renderer'ı.
- scripts/prerender.ts — mevcut akışta antetli çıktısı ve işareti.
- src/main.tsx — yalnız eşleşen antetli HTML için hydration.
- src/utils/seoGenerator.ts — antetli statik kopya çağrısı ve uygunsuz schema üretiminin kaldırılması.
- src/data/antetliPageContent.ts — uygunsuz schema kaydı ve yalnız kanıtlanan galeri açıklamaları.
- src/components/Antetli.tsx — yalnız tablo dışı sipariş paragrafı.
- public/sitemap.xml — yalnız antetli lastmod.
- validate-antetli-fix.cjs — SSR/hydration, mevcut fiyat DOM düğümü, mevcut modal, rota dönüşü ve HTTP regresyonu.

Kaynak commit: bbc6fb720e23990df48fe99529d279ac2a7a12db  
PR: https://github.com/TaFo702/mavibaski/pull/20

Yayın merge commit: ffd9e4a2ace7b8f725f8332215616e8398371ae2  
GitHub Production Quality Gate #144, run 38604814508: success.  
Vercel production deployment: https://vercel.com/kolay-basim/mavibaski/7aWrPGcvJKA3SiX6caYbdenVdP3w  
Doğrulanan canlı giriş asset'i: /assets/index-BTpghzhK.js

Canlı HTTP yanıtı 200; #root çıktısı yerelde test edilen çıktı ile birebir aynı. Chrome'da doğrudan açılış, yenileme, mevcut ANT1 detay penceresi, antetli–zarf dönüşü ve ana sayfaya dönüş incelendi. Önceki/sonraki gerçek tarayıcı fiyat tablosunun tüm HTML'si, yalnız CSS stil boşluk/noktalı virgül serileştirmesi normalize edildiğinde birebir eşleşiyor; stil değerleri değişmedi. İlk HTML'deki mevcut bileşenden üretilen fiyat tablosunun SHA256 değeri: a9d2dc0fb7fb147b3b8cacc346368cf22cecec3ed61179b69f0e163512cdefca.

CI kalite kapısındaki Playwright spinner kontrolü tarayıcı executable kurulu olmadığı için atlandı; CI'da tam tarayıcı testinin yapıldığı iddia edilmiyor. Yukarıdaki canlı Chrome kontrolleri bu CI adımından ayrı yapıldı.

## ÇÖZÜM PROMPTU

A01–A04 için yukarıdaki en küçük kalıcı kaynak düzeltmeleri uygulandı. Güncel sürümde yalnız bu sorunların geri dönüp dönmediğini kontrol et. Yeni bölüm, görsel, özellik, paket, framework, route veya genel içerik yeniden yazımı yapma.

Fiyat listeleri ve fiyat tablolarının verilerine, hesaplamalarına, başlık/açıklamalarına, satır/sütunlarına, HTML/JSX'sine, caption/thead/th/scope ilişkilerine, bileşen/sınıf/stillerine, bağlantı ve düğmelerine kesinlikle dokunma. A05 tablo sorununun düzeltmesini bu kapsama alma.

Mevcut build/prerender akışında /antetli için gerçek değişmeyen bileşenin üretimini esas al. İlk HTML ve hydration sonrası metin/bağlantı tutarlılığını; tablonun aynı DOM düğümü olarak korunmasını; tek H1/title/description/canonical ve rota verisi temizliğini; mevcut detay penceresini; doğrudan açılış, yenileme ve ürün–ana sayfa dönüşünü doğrula. Ortak App/prerender değişikliklerinin diğer sayfaların içeriklerini etkilemediğini karşılaştır.

Kapsam içindeki sorunlar geri dönmemişse yeni değişiklik yapma. Mobil, ekran okuyucu, GSC veya performans testini yapılmış gibi sunma. Bu prompt yayınlama/deploy talimatı içermez.
