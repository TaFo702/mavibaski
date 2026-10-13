# Mavi Basım Ana Sayfa Denetimi

**İşlem:** 14 Ekim 2026 — 13 Ekim canlı denetiminde bulunan iki kapsam içi sorunun kaynakta düzeltilmesi. Kullanıcı canlıya alma işlemini açıkça onayladı.

**Yayın durumu:** PR #15 `main` dalına birleştirildi; GitHub tam kalite kontrolü ve Vercel yayını tamamlandı. Gerçek `https://mavibasim.com/` ilk HTML’si ve Chrome kontrolleriyle iki düzeltmenin canlıya geldiği doğrulandı.

**Geçici puan: 92/100.** Puan dağılımı: prerender/hydration 25/25, metadata/canonical/rota temizliği 25/25, schema 20/20, tarama/URL/bağlantılar 13/15, başlık/görsel/kullanılabilirlik/ölçülmüş performans 9/15. İki puan korunan bağlantı sorunlarına, altı puan tamamlanmamış mobil/performans değerlendirmesine ayrıldı; altı yeni hata olduğu anlamına gelmez. Google sıralaması veya tüm alt sayfaların tam denetimi değildir.

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

Önceki Chrome kontrolünde İstanbul, Ankara, İzmir, Muğla, Balıkesir, Bitlis ve Mardin açıklamaları 30 px alan içinde 45 px metin yüksekliğiyle kırpılıyordu. `src/components/CityLinksSection.tsx` içinde yalnız açıklama paragrafının `line-clamp-2` sınırlaması kaldırıldı. Şehir metinleri, sırası, hedefleri, fontları, renkleri ve kart yapısı aynı kaldı. Son ekran ölçümü aşağıdaki canlı doğrulama kaydındadır.

## Fiyat koruması nedeniyle müdahale edilmeyen sorunlar

1. **Orta:** Korunan `#fiyatlar` bölümündeki genel “Online Sipariş Ver” bağlantısı `/kataloglar` hedefinde kalıyor; genel ürün seçimi yerine katalog sayfasını açıyor.
2. **Düşük:** Korunan “Fiyat Listesi” menüsündeki sayfa hedefleri button/navigate biçiminde; gerçek href üretmiyor.

Bu iki sorun değiştirilmedi. **Fiyat listeleri ve tablolarının verileri, başlıkları, satırları, HTML/JSX’i, stilleri, bağlantıları ve düğmeleri kesinlikle korunmuştur.**

## Doğrulama ve kapsam kanıtları

- Yerel dosyaların başlangıç Git blob SHA’ları GitHub `main` dosyalarıyla eşleşti. Uygulama değişikliğinin yalnız yedi hedef ve tek kırpma sınıfından oluştuğu, dosyaların kalan bütün içeriği karşılaştırılarak doğrulandı. Fiyat alanının kaynak kodu değişmedi.
- İlk HTML’deki yedi kategori href’i düzeltildi. Ana sayfanın bütün textContent değeri önceki build çıktısıyla aynı; `#fiyatlar` bölümünün bütün ilk HTML’si birebir aynı. Fiyat HTML SHA-256: `1383abdf31e28e33defdfd11f6cea9b7923cbe73cd6e68c6070dea3fd93713d2`.
- Mevcut Vite build, `node --import tsx scripts/prerender.ts` ve mevcut esbuild sunucu bundle aşamaları tamamlandı; 294 HTML üretildi. Yerel tsx IPC sınırlaması nedeniyle normal build’in geçtiği henüz bu yerel sonuçla iddia edilmez; GitHub’daki normal npm quality zinciri de run 131 ile başarıyla tamamlandı.
- Typecheck geçti. Değiştirilen kaynak dosyalarının ESLint kontrolü 0 hata verdi; mevcut uyarılar var. Mevcut CJS test dosyası repo ESLint ignore kapsamındadır; çalıştırma sonucu ayrıca doğrulandı.
- Mevcut `validate-home-fix.cjs` testi yedi kategori için gerçek React/JSDOM tıklaması, doğru URL/ürün H1 içeriği ve ana sayfaya geri dönüş kontrolleriyle genişletildi. Yedi kategori, önceki 20 ürün/hizmet dönüşü, ilk HTML/hydration tutarlılığı, metadata/schema, doğrudan açılış ve yeniden açılış kontrolleri tamamlandı. Hydration/console hatası kaydedilmedi.
- İlk hydration fiyat HTML eşitliği tam olarak karşılaştırıldı. SPA yeniden mount sonrası fiyat karşılaştırmasında yalnız React’in boş SSR ayraç yorumları (`<!-- -->`) karşılaştırma dışında bırakıldı; kalan markup birebir karşılaştırıldı. Uygulamanın fiyat koduna veya DOM’una bunun için müdahale edilmedi.
- Mevcut üretim HTTP testi geçti. Yeni framework, paket, özellik, görsel veya route eklenmedi.

## Önemli sınırlamalar

- Yeni yedi kategori geçişinin bu aşamadaki otomatik testi React/JSDOM ortamındadır. Gerçek Chrome ve domain sonuçları yayın kaydından okunmalıdır.
- Mobil görünüm, bütün klavye/odak senaryoları ve LCP/CLS/INP ölçümleri tamamlanmış sayılmadı. Ölçülmemiş performans sayısı yazılmadı.
- Search Console indeksleme/sıralama sonucu veya müşteri dönüşümü ölçülmedi; Google ilk sayfa garantisi verilmedi. Diğer sayfaların tam SEO denetimi bu işlem değildir.

## Canlı yayın doğrulaması — 14 Ekim 2026

- PR #15: https://github.com/TaFo702/mavibaski/pull/15 — birleştirildi.
- Kaynak/test commit’i: `a7d95474dc4766bb874ae808040a8d1f316cd38f`; merge commit’i: `fd3240a9dddbb92d3faf8fb6184dea7b2f237a9c`.
- GitHub `Production Quality Gate` run 131 / `38471377024`: `completed`, `success`. Başarılı sonuç doğrulandıktan sonra merge yapıldı.
- Merge commit’inin Vercel durumu `success`: https://vercel.com/kolay-basim/mavibaski/CPBMt7EsFtwsbkpiUt6NfSchEJM1
- Gerçek domain 14 Ekim 2026 00:39 Türkiye saati kontrolünde HTTP 200 verdi. Yedi doğru href ilk HTML’de mevcut, şehir açıklamalarında kırpma sınıfı yok; fiyat bölümünün HTML’si değişmeden korunan önceki çıktıyla birebir aynı. Yeni istemci asset’i `/assets/index-BWyx_aSl.js`.
- Chrome’da yedi ürün bağlantısının href’i, açılan adresi, ilgili ürün H1 içeriği ve ana sayfaya dönüşü doğrulandı. Sigorta Poliçeleri pointer tıklamasıyla; diğer altı ürün Enter ile etkinleştirilerek kontrol edildi. Bunlar yedi pointer tıklaması yapılmış gibi sunulmadı. Dönüşlerde ana sayfanın title/description/canonical tekilliği, tek H1, 7 fiyat veri satırı ve Product verisinin temizlenmesi doğrulandı.
- Chrome’da 1363×936 ekranında 17 şehir açıklamasının tamamı ölçüldü; `scrollHeight > clientHeight` nedeniyle kırpılan açıklama kalmadı. Daha önce kesilen yedi açıklamada görünür yükseklik 30 px’den 45 px’e çıktı, içerik yüksekliği de 45 px. Metinler değiştirilmedi.
- Kaynak dosyaları/test dosyası GitHub’a aktarıldıktan sonra, yerelde test edilen dosyalarla Git blob SHA ve içerik eşitliği doğrulandı. Kaynakta yeni özellik veya ek değişiklik yapılmadı.
- İzlenen tarayıcı kayıtlarındaki hata mesajları `chrome-extension://.../content-script.bundle.js` kaynaklıydı; site hatası olarak sayılmadı. Mobil ve Core Web Vitals sınırlamaları sürüyor.

## ÇÖZÜM PROMPTU

Yayınlanan iki kaynak düzeltmesini koru; aynı işi tekrar uygulama. Kalan doğrulanmış iki sorun fiyat koruma alanında olduğundan bunlara müdahale etme. **Fiyat listeleri ve tablolarının verilerine, başlıklarına, satırlarına, HTML/JSX’ine, stillerine, bağlantılarına ve düğmelerine kesinlikle dokunma.** Bu işlem kapsamında başka doğrulanmış kaynak düzeltmesi kalmadığı için yeni özellik, bölüm, görsel, paket, route veya genel CSS değişikliği yapma. Mobil/performans ölçümü yapılmadıysa yapılmış gibi yazma. Diğer sayfaların içeriklerini, tarifelerini ve URL’lerini koru.
