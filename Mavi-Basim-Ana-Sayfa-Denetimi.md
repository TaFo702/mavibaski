# Mavi Basım Ana Sayfa Denetimi

**İşlem:** 14 Ekim 2026 — 13 Ekim canlı denetiminde bulunan iki kapsam içi sorunun kaynakta düzeltilmesi. Kullanıcı canlıya alma işlemini açıkça onayladı.

**Yayın durumu:** Kaynak düzeltmesi yerel kontrollerden geçti; GitHub kalite kontrolü, merge ve gerçek domain kontrolü bu raporun yayın kaydına eklenecek. Bu hazırlık kaydı tek başına canlı sitenin güncellendiği anlamına gelmez.

## Düzeltilen doğrulanmış sorunlar

### 1. Yedi kategori bağlantısının yanlış ürüne gitmesi

Ana sayfa `#products` alanının `getCategoryPath` eşlemesinde yalnız aşağıdaki hedefler değiştirildi. Mevcut diğer kategori hedefleri, metinler ve sıra korunmuştur.

| Ürün | Önceki yanlış hedef | Düzeltilen mevcut hedef |
|---|---|---|
| Sigorta Poliçeleri | `/sozlesme-baski` | `/sigorta-policeleri` |
| Tahsilat Makbuzu | `/para-makbuzu` | `/tahsilat-makbuzu` |
| Araç Kiralama | `/sozlesme-baski` | `/arac-kiralama` |
| Gider Makbuzu | `/para-makbuzu` | `/gider-makbuzu` |
| Giriş Bileti | `/adisyon` | `/giris-bileti` |
| Reçete | `/adisyon` | `/recete` |
| Tediye Makbuzu | `/para-makbuzu` | `/tediye-makbuzu` |

Önceki canlı kanıt: Reçete bağlantısı Adisyon sayfasını açıyordu; doğru yedi ürün sayfası HTTP 200 ve ilgili başlık/H1 içeriğiyle doğrulanmıştı. Kaynak değişikliği yalnız `src/App.tsx` içindeki yedi eşlemedir. Alt sayfaların içerikleri, fiyatları ve URL’leri yeniden yazılmadı.

### 2. Şehir kartı açıklamalarının iki satırda kırpılması

Önceki Chrome kontrolünde İstanbul, Ankara, İzmir, Muğla, Balıkesir, Bitlis ve Mardin açıklamaları 30 px alan içinde 45 px metin yüksekliğiyle kırpılıyordu. `src/components/CityLinksSection.tsx` içinde yalnız açıklama paragrafının `line-clamp-2` sınırlaması kaldırıldı. Şehir metinleri, sırası, hedefleri, fontları, renkleri ve kart yapısı aynı kaldı. Son ekran ölçümü canlı yayın sonrasında kaydedilecek.

## Fiyat koruması nedeniyle müdahale edilmeyen sorunlar

1. **Orta:** Korunan `#fiyatlar` bölümündeki genel “Online Sipariş Ver” bağlantısı `/kataloglar` hedefinde kalıyor; genel ürün seçimi yerine katalog sayfasını açıyor.
2. **Düşük:** Korunan “Fiyat Listesi” menüsündeki sayfa hedefleri button/navigate biçiminde; gerçek href üretmiyor.

Bu iki sorun değiştirilmedi. **Fiyat listeleri ve tablolarının verileri, başlıkları, satırları, HTML/JSX’i, stilleri, bağlantıları ve düğmeleri kesinlikle korunmuştur.**

## Doğrulama ve kapsam kanıtları

- Yerel dosyaların başlangıç Git blob SHA’ları GitHub `main` dosyalarıyla eşleşti. Uygulama değişikliğinin yalnız yedi hedef ve tek kırpma sınıfından oluştuğu, dosyaların kalan bütün içeriği karşılaştırılarak doğrulandı. Fiyat alanının kaynak kodu değişmedi.
- İlk HTML’deki yedi kategori href’i düzeltildi. Ana sayfanın bütün textContent değeri önceki build çıktısıyla aynı; `#fiyatlar` bölümünün bütün ilk HTML’si birebir aynı. Fiyat HTML SHA-256: `1383abdf31e28e33defdfd11f6cea9b7923cbe73cd6e68c6070dea3fd93713d2`.
- Mevcut Vite build, `node --import tsx scripts/prerender.ts` ve mevcut esbuild sunucu bundle aşamaları tamamlandı; 294 HTML üretildi. Yerel tsx IPC sınırlaması nedeniyle normal build’in geçtiği henüz bu yerel sonuçla iddia edilmez; tam npm quality sonucu GitHub CI ile kaydedilecek.
- Typecheck geçti. Değiştirilen kaynak dosyalarının ESLint kontrolü 0 hata verdi; mevcut uyarılar var. Mevcut CJS test dosyası repo ESLint ignore kapsamındadır; çalıştırma sonucu ayrıca doğrulandı.
- Mevcut `validate-home-fix.cjs` testi yedi kategori için gerçek React/JSDOM tıklaması, doğru URL/ürün H1 içeriği ve ana sayfaya geri dönüş kontrolleriyle genişletildi. Yedi kategori, önceki 20 ürün/hizmet dönüşü, ilk HTML/hydration tutarlılığı, metadata/schema, doğrudan açılış ve yeniden açılış kontrolleri tamamlandı. Hydration/console hatası kaydedilmedi.
- İlk hydration fiyat HTML eşitliği tam olarak karşılaştırıldı. SPA yeniden mount sonrası fiyat karşılaştırmasında yalnız React’in boş SSR ayraç yorumları (`<!-- -->`) karşılaştırma dışında bırakıldı; kalan markup birebir karşılaştırıldı. Uygulamanın fiyat koduna veya DOM’una bunun için müdahale edilmedi.
- Mevcut üretim HTTP testi geçti. Yeni framework, paket, özellik, görsel veya route eklenmedi.

## Önemli sınırlamalar

- Yeni yedi kategori geçişinin bu aşamadaki otomatik testi React/JSDOM ortamındadır. Gerçek Chrome ve domain sonuçları yayın kaydından okunmalıdır.
- Mobil görünüm, bütün klavye/odak senaryoları ve LCP/CLS/INP ölçümleri tamamlanmış sayılmadı. Ölçülmemiş performans sayısı yazılmadı.
- Search Console indeksleme/sıralama sonucu veya müşteri dönüşümü ölçülmedi; Google ilk sayfa garantisi verilmedi. Diğer sayfaların tam SEO denetimi bu işlem değildir.

## ÇÖZÜM PROMPTU

Bu iki doğrulanmış kaynak düzeltmesini tekrar yazma. Açık kullanıcı yayın talimatı kapsamında güncel PR head’i ve GitHub kalite kontrolü doğrulandıktan sonra değişikliği `main` dalına birleştir; mevcut Vercel yayınını ve gerçek `https://mavibasim.com/` yanıtını kontrol et. Yedi kategori href’ini ilk HTML ve JS sonrası DOM’da, doğru ürün açılışlarını ve şehir açıklamalarının kırpılmadığını gerçek tarayıcıda doğrula. Fiyat listeleri ve tablolarının verilerine, başlıklarına, satırlarına, HTML’sine, stillerine, bağlantılarına ve düğmelerine kesinlikle dokunma. Korunan iki sorun rapor olarak kalacak. Yeni özellik/paket veya ek kaynak düzeltmesi ekleme; doğrulanmamış test sonucu üretme.
