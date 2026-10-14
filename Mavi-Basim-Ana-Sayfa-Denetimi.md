# Mavi Basım — Zarf Düzeltmesi Sonrası Denetim

Sayfa: https://mavibasim.com/zarf  
Tarih: 14 Ekim 2026  
Kapsam: Onaylanan zarf prerender/hydration ve schema düzeltmeleri; ek teknik hata kontrolü.

## Geçici puan: 97/100

Önceki 80/100 puandaki prerender kaynaklı 10 ve schema kaynaklı 7 puanlık sorun giderildi. Kullanıcının önemsemediğini belirterek kapsam dışında bıraktığı galeri açıklaması ve WhatsApp örtüşmesi için önceki 3 puanlık not korunuyor. Bu değerlendirme Google sıralama puanı değildir. Mobil ve ölçülmüş performans doğrulaması tamamlanmadığından geçicidir.

| Kapsam | Puan |
| --- | ---: |
| Prerender / hydration | 25/25 |
| Metadata / canonical / rota temizliği | 25/25 |
| Schema | 20/20 |
| Tarama / URL / bağlantılar | 15/15 |
| Başlık / görsel / kullanılabilirlik / ölçülmüş performans | 12/15 |
| Toplam | 97/100 |

## Giderilen sorunlar ve kanıtları

### 1. İlk HTML'nin ayrı ve eksik zarf kopyası

Önceki ilk HTML, 6 ana içerik H2'si ve 5 bağlantı içeriyordu. Mevcut açıklamalar, sipariş süreci, ürün kartları ve rehberler bu kopyada eksikti; bazı metinler React sayfasıyla farklıydı.

Kaynak düzeltmesi: Mevcut App, router ve cart sağlayıcılarıyla aynı ZarfPage bileşeni build sırasında render ediliyor. Build tarafında yalnız zarfın lazy bileşeni doğrudan çözülüyor; tarayıcının mevcut lazy yüklemesi korunuyor. /zarf için ayrı HTML dizgesi kaldırıldı. Bu rota `data-prerendered="zarf"` ile işaretlenip hydrateRoot ile başlatılıyor. Dist dosyası elle yamalanmadı; yeni framework veya paket eklenmedi.

Canlı kanıt: HTTP 200; ilk HTML'de 11 ana içerik H2'si, 73 bağlantı ve mevcut üç sipariş düğmesi var. Canlı `#root` HTML'si yerelde test edilen üretim çıktısıyla bayt düzeyinde eşleşti. Kullanıcıya gösterilen içerik ve bağlantılar, yerel hydration testinde değişmedi; fiyat tablosunun mevcut DOM öğesi yeniden oluşturulmadı.

### 2. Farklı zarf modellerini tek Product / AggregateOffer altında toplama

Önceki kayıt Z1, Z2 ve Z3'ün farklı ebat, baskı türü ve adetlerini tek ürünün fiyat aralığı gibi gösteriyordu.

Kaynak düzeltmesi: Yalnız /zarf rotasının hatalı toplu Product/AggregateOffer kaydı kaldırıldı. Mevcut breadcrumb ve FAQ korunuyor; yeni şema türleri, stok iddiası, puan veya fiyat geçerlilik tarihi eklenmedi.

Canlı kanıt: İlk HTML ve Chrome DOM'unda bu rotanın şema türleri BreadcrumbList ve FAQPage. Antetli → zarf dönüşünde antetli şeması kalmıyor. Zarf → ana sayfa dönüşünde ürün veya breadcrumb kalıntısı bulunmadı.

Resmî dayanak: https://developers.google.com/search/docs/appearance/structured-data/product-snippet#aggregateoffer

## Kalan sorunlar

Bu kontrollerde, onaylanan kapsam içinde yeni doğrulanmış teknik hata bulunmadı.

Kullanıcı talebiyle müdahale edilmeyen iki not:

1. `zarf-baski-detalleri.webp` genel zarf görünümünü gösterirken “Zarf Kapatma Detayı” açıklaması taşıyor.
2. Masaüstü ilk ekranda sabit WhatsApp düğmesi Z3 sipariş düğmesinin sağ tarafıyla örtüşüyor.

Fiyat listeleri ve tablolarına bu not nedeniyle müdahale edilmedi. Bu iki not kalan çözüm kapsamına dahil değil.

## Fiyat ve dosya koruma kanıtı

- `src/components/Zarf.tsx` bütünüyle değişmedi. Git blob SHA'sı düzeltme öncesi ve sonrası `4ff0eb8c2c826dbd058f4feb8eb32d27a21fd1c7`.
- Fiyat verileri, tabloların mevcut JSX'si, stilleri, düğmeleri, notları ve sipariş detay bileşeni değiştirilmedi. Z1/Z2/Z3 fiyatları 2.500 / 3.000 / 3.900 ₺; ekstra adet fiyatları 1.950 / 2.100 / 2.600 ₺ olarak aynı.
- İlk HTML'de ayrı, eski WhatsApp bağlantıları yerine değişmeyen mevcut React fiyat bileşeninin sipariş düğmeleri render ediliyor. Düğmeler yeniden yazılmadı veya bağlantıya dönüştürülmedi.
- Yerel hydration testinde fiyat tablosunun outerHTML'si birebir aynı kaldı ve DOM öğesinin kimliği korundu. Canlı yenileme öncesi/sonrası fiyat HTML'si eşleşti.
- Canlı SPA dönüşünde tek serileştirme farkı CSS yazımındaki boşluk/noktalı virgül ve React'in boş ayırıcı yorumlarıydı. Etiketler, öznitelikler, CSS özellik/değerleri ve metin düğümleri karşılaştırıldığında fiyat DOM'u ve stilleri aynı.
- Canlı fiyat tablosu HTML SHA256: `d4a1a973a0e002ff3562cbafc931af07bc3e1c0e45f3fc964c2b75ec8d760b2c`.
- Başlangıç hash kaydındaki tüm veri, sabit ve public dosyaları korundu; 267 public dosyasında değişiklik yok.
- Diğer 293 rotanın üretilen HTML'si, build asset adları hariç önceki çıktıyla aynı. Diğer sayfaların içerikleri, tarifeleri ve URL'leri değiştirilmedi.
- `seoGenerator.ts` dosyasındaki küçülme, yalnız zarf için kullanılan eski paralel HTML ve hatalı schema kopyasının kaldırılmasından kaynaklanıyor. Görsel veya tarife dosyası silinmedi.

## Değişen dosyalar

| Dosya | Değişiklik |
| --- | --- |
| src/App.tsx | Build sırasında mevcut zarf bileşenini çözmek için sınırlı bileşen parametresi |
| src/prerenderHome.tsx | Aynı App ve ZarfPage ile zarf renderer'ı |
| scripts/prerender.ts | Yalnız /zarf için gerçek React çıktısı ve hydration işareti |
| src/main.tsx | Yalnız zarf prerender çıktısının hydration ile başlatılması |
| src/utils/seoGenerator.ts | Zarfın eski HTML kopyası ve toplu Product/AggregateOffer kaydının kaldırılması |
| validate-zarf-fix.cjs | İçerik/fiyat hydration korunması, sipariş davranışı, rota ve HTTP regresyon kontrolü |

## Doğrulama kaydı ve önemli sınırlar

Yerel üretim build/prerender/server build tamamlandı: 294 rota. Typecheck geçti. Değişen kaynaklarda ESLint 0 hata; mevcut uyarılar korunuyor. Zarf regresyon testinde ilk HTML/DOM metni ve bağlantıları, fiyat DOM kimliği, sipariş detayını açma/kapatma, doğrudan açılış, yeniden açılış, SPA dönüşleri ve üretim HTTP yanıtı doğrulandı. Ana sayfanın mevcut testinde 7 kategori ve 20 ürün dönüşü kontrol edildi.

GitHub Production Quality Gate #134, run ID 38527140262: başarıyla tamamlandı. PR #16 birleştirildi. Vercel, aşağıdaki merge commit'inin deployment durumunu başarılı bildirdi.

Chrome canlı kontrolleri: doğrudan zarf → Z1 sipariş detayı aç/kapat → antetli → zarf → ana sayfa → ürün menüsünden zarf → yenileme. Tek H1 ve tek metadata üretimi, doğru rota verisi ve fiyat korunması kontrol edildi. Site kaynaklı konsol hatası görülmedi; chrome-extension kaynaklı hatalar site hatası sayılmadı.

Sınırlar: Mobil boyut testi, LCP/CLS/INP ölçümü, Search Console URL incelemesi ve Google Rich Results Test yapılmadı. Google'ın indeks ve sıralama değişimi ölçülmedi. Fabrika sahipliği ve üretim beyanları bağımsız belgelerle doğrulanmadığından değiştirilmedi.

Kullanıcının sağladığı Planner/GSC özetinde ticari hedef /zarf; mevcut diplomat, torba, pencere ve logo konularını yeni sayfalara ayırmak için güçlü gerekçe yok. Bu nedenle URL, mevcut title, description ve H1 korundu. Eksik “20 güçlü kelime” üretilmedi. Kısmi ve tekrarlı GSC verisinden kesin URL çakışması veya birleşik pay hesaplanmadı; bu çalışma yeni bir Planner/GSC hesaplama raporu değildir.

Kaynak commit: 6413bcae6ce0e33af39c29472058b199f68019a0  
Yayın merge commit: 4537a340a7576197a0704d671c1502f7eacae96c  
PR: https://github.com/TaFo702/mavibaski/pull/16  
Deployment: https://vercel.com/kolay-basim/mavibaski/5DgAJd58Tx7bT17WHrrdLmB4sBDG  
Doğrulanan canlı giriş asset'i: /assets/index-B-ZzJel7.js

## ÇÖZÜM PROMPTU

Bu doğrulamalarda kalan, kapsam içindeki teknik sorun bulunmadı; yeni değişiklik yapma. Kullanıcının kapsam dışında bıraktığı görsel açıklaması ve WhatsApp örtüşmesine müdahale etme. Fiyat listeleri ve tablolarının verilerini, HTML/JSX'sini, stillerini, bağlantılarını ve düğmelerini kesinlikle koru. Mevcut /zarf URL'sini ve diğer sayfaları koru. Yeni sayfa veya anahtar kelime doldurma üretme.
