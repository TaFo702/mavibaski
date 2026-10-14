# Bloknotlar — inceleme ve uygulama kaydı

15 Ekim 2026. URL: https://mavibasim.com/bloknotlar

## Ön inceleme: 63/100 — geçici

Puanlama, kullanıcı metnindeki 25/25/20/15/15 ağırlıklarına dayanır. Doğrulanmış sorunlar 32 puanlık kesinti oluşturdu. Mobil ekranlar ve ölçülmüş performans için ayrılan 5 puan başarı kabul edilmedi; ölçüm bekliyor. Puan Google değerlendirmesi veya sıralama tahmini değildir.

| Öncelik | Soru | Kanıt ve etkisi | Kesinti |
| --- | --- | --- | --- |
| 1 | 12, 16, 53 | Ayrı statik üretici ilk HTML'de iki tablo üretirken mevcut React sayfası beş tablo ve ek bölümler gösteriyor. İlk HTML'de sipariş düğmesi yerine doğrudan WhatsApp bağlantıları bulunuyor; JavaScript açılışı içerik ve kontrolleri değiştiriyor. | −12 |
| 2 | 24, 49 | Kapaklı/kapaksız modeller ve farklı ebatlar tek Product/AggregateOffer içinde sunuluyor. Bu kayıt kategori grubunu tek ürün gibi işaretliyor. | −8 |
| 3 | 10, 44 | İlk galeri resmi kapaksızken kapaklı/sırt dikişi anlatılıyor; ikinci resim kapaklıyken kapaksız deniyor; dördüncü resimde spiral görünürken koçanlı ve gramaj anlatılıyor; beşinci resim birden fazla notluk türünü gösterirken yalnız spiral anlatılıyor. | −4 |
| 4 | 18 | Gerçek paylaşım görseli 1536×1024; metadata 1200×630 bildiriyor. | −2 |
| 5 | 8, 40 | CYP parlak selefon kartında modele özgü bilgi yerine genel bloknot paragrafı var. Teknik bölümde gramaj birimi kağıt kalınlığı olarak etiketlenmiş. | −2 |
| 6 | 8, 26 | A6 kapaklı karşılaştırma satırının bütçe sütununda malzeme açıklaması bulunuyor. Kapak karar kartlarındaki +%10/+%12/+%25 ifadeleri sabit tarife ilişkisini doğru yansıtmıyor. Örneğin B16 12.800 TL → B17 13.500 TL artışı yaklaşık %5,47; kartta +%10 yazıyor. | −4 |

Ürün zengin sonucu kullanım amacı için kaynak: https://developers.google.com/search/docs/appearance/structured-data/product-snippet . Google, Product işaretlemesinde tek ürün/aynı ürün varyantlarına odaklanılmasını; AggregateOffer'ın varyant kümesi için kullanılmamasını belirtiyor. Burada yalnız metadata düzeltildi, tarife değiştirilmedi.

## Koruma kuralı nedeniyle müdahale edilmeyecek

- Beş mevcut tablo: fiyat, kapak/cilt karşılaştırması, kapaklı/kapaksız karşılaştırması ve ebat tablosu. HTML/JSX, caption, başlık, scope, satır, sınıf, stil, düğme ve veri kaynakları değiştirilmeyecek.
- Bütçe sütunundaki yanlış malzeme açıklaması ve fiyat kartlarındaki sabit yüzde ifadeleri fiyatlandırma açıklaması kapsamındadır; düzeltme dışında tutulur.
- Ürün kodları, adetler, ölçüler, 550 TL özel kesim farkı, KDV, ödeme, kargo ve mevcut 5–7 iş günü bilgisi korunur.

## Sonucu sınırlayan kontroller

Gerçek tarayıcıda masaüstü açılışı incelendi. Kaydedilen konsol hatası Chrome eklentisine aittir; site hatası sayılmadı. Farklı telefon ekranları, LCP/CLS/INP, gerçek kullanıcı performansı, GSC URL Denetimi ve Google Rich Results Test yapılmadı. Beklenen yayımlanmış sürüm bilinmeden eski asset iddiası üretilmedi. Title 66 karakter; yalnız uzunluğu nedeniyle değişiklik önerilmedi.

## ÇÖZÜM PROMPTU

Mevcut BloknotlarPage bileşenini build sırasında değiştirmeden render et; ilk HTML ile React başlangıcını hydration üzerinden aynı kaynağa bağla. Kategoriye uygunsuz Product/AggregateOffer kaydını metadata'dan kaldır; mevcut breadcrumb ve SSS'yi tek kaynaktan yönet. Paylaşım görselinin metadata ölçüsünü gerçek 1536×1024 dosyayla eşleştir. Görsel dosyalarını değiştirmeden galeri başlık, açıklama ve alt metinlerini görünen modele göre düzelt. Tablo dışındaki CYP açıklamasını ve gramaj etiketini düzelt. Fiyat listesi, tablolar, fiyat açıklamaları, adetler, ürün özellikleri ve teslimat bilgileri korunmalı. Mevcut build kontrolünü, ilk HTML, hydration, metadata, SSS eşleşmesi, sayfa geçişleri ve sipariş detaylarını doğrula; ortak teknik değişikliklerin diğer sayfalara etkisini karşılaştır. Kaynak koddan kalıcı çözüm uygula, dist dosyasını elle düzenleme.

## Kullanıcı onayıyla uygulanan düzeltmeler

- Build sırasında gerçek BloknotlarPage render ediliyor; mevcut lazy istemci rotası korunuyor. Bloknotlar için hydration eklendi. Eski statik tablo üreticisinin kodu değiştirilmedi; rotanın onu kullanması durduruldu.
- Bileşenin ayrı schema effect'i kaldırıldı. Merkezi rota kaynağı breadcrumb, görünür 20 SSS, işletme ve WebSite verilerini yönetiyor. Kategori Product/AggregateOffer kaydı kaldırıldı.
- Beş galeri öğesinin metinleri kapaksız, kapaklı, kutulu masaüstü notluk, spiralli ve karma tasarım görselleriyle eşleştirildi. Altıncı mevcut küp bloknot görseli korundu. Fotoğraflardan kağıt gramajı veya cilt kalitesi çıkarılmadı. Görseldeki ebatların tarife kesim ölçülerini temsil etmediği belirtildi.
- Ölçü SSS'sinde mevcut cm değerleri aynen korunup bunların fiyat listesindeki ebat grupları olduğu netleştirildi. Fiyat tablosundaki ölçü/etiketlere dokunulmadı.
- CYP paragrafı parlak selefon modelini anlatıyor. Teknik bölümde yalnız “Yaprak kağıt kalınlığı” etiketi “İç sayfa gramajı” oldu; 80 gr/m² değeri aynı.
- Sitemap içinde yalnız `/bloknotlar` kaydının lastmod tarihi bu içerik değişikliğinin UTC tarihi olan 2026-10-14 (Türkiye: 15 Ekim) ile güncellendi.
- Title, meta description, H1, görsel dosyaları ve mevcut ticari bilgiler korunuyor. Yeni bölüm, satış sistemi, sayfa veya blog eklenmedi.

## Doğrulama ve kapsam

TypeScript başarılı. Değişen içerik/prerender dosyalarının ESLint kontrolünde hata yok; mevcut fiyat işlevindeki eski any uyarısı korunuyor. Yerel npm run build, tsx IPC socket izni nedeniyle durdu; Vite aşaması tamamlandı. Aynı prerender `node --import tsx scripts/prerender.ts` ile, sunucu derlemesi mevcut esbuild komutuyla tamamlandı. 294 URL üretildi.

validate-bloknotlar-fix.cjs; doğrudan açılış, yenileme, hydration'da aynı fiyat tablosu düğümünün ve içeriğin korunması, tekil metadata, 20 SSS/FAQ şema eşleşmesi, geçerli JSON-LD, doğru başlık sırası, sayfalar arası geçiş ve sipariş detayının açılıp kapanmasını kontrol ediyor. Mevcut dosyalar denetimi de tekrar çalıştırıldı.

Beş tablo JSX'i önceki sürümle birebir aynı. Render edilen tablo DOM'u önceki React çıktısıyla karşılaştırıldı; yalnız SSR/istemci arasındaki eşdeğer inline CSS boşlukları normalleştirildi. Hücre, düğme, fiyat, scope, class ve stil değerleri korunuyor. Hydration öncesi/sonrası gerçek tablo HTML'si ayrıca birebir kontrol ediliyor.

Önceki ana sürüm ayrı checkout'ta build/prerender edildi. Asset dosya adları normalleştirilerek 294 HTML karşılaştırıldı: yalnız bloknotlar/index.html değişti; diğer 293 sayfanın üretilen HTML içeriği aynı.

## Düzeltme sonrası geçici puan: 91/100

| Alan | Doğrulanmış puan | Açıklama |
| --- | --- | --- |
| İlk HTML ve hydration | 25/25 | Yerel otomatik denetim kapsamı |
| Metadata ve canonical | 25/25 | Kaynak ve DOM denetim kapsamı |
| Yapılandırılmış veri | 20/20 | Yerel ayrıştırma ve görünür SSS eşleşmesi; Google test aracı ölçülmedi |
| Tarama, URL ve bağlantı | 15/15 | İncelenen URL/bağlantı kapsamı |
| Başlık, görsel, kullanılabilirlik ve performans | 6/15 | Koruma kapsamındaki iki sorun −4; mobil/performance için 5 puan ölçüm bekliyor |

Koruma kapsamındaki iki sorun giderilmedi. Ölçülmeyen 5 puan hata kesintisi değildir; başarılı kontrol kabul edilerek puana eklenmedi. Bu puan tam mobil/performance denetimi veya ilk 10 garantisi değildir.

CI ilk denemede sitemap için Türkiye günü kullanıldığından UTC gelecekteki tarih kontrolünde durdu. Son kayıt UTC 2026-10-14 olarak düzeltildi; validator ve workflow kuralları değiştirilmedi.
