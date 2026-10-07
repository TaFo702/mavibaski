# İlk altı aşamalı teknik site denetimi

Tarih: 7 Ekim 2026. Denetim bulut ortamındaki depo, geliştirme sunucusu ve yerel üretim sunucusunda yapıldı. Canlı siteye dağıtım, GitHub'a gönderim veya ortam yapılandırması kaydı/yayımlaması yapılmadı.

Fiyatlar, hesaplama/indirim kuralları, ürün özellikleri ve ticari bilgiler değiştirilmedi. SEO başlıkları, açıklamalar, canonical adresleri, şemalar, sitemap ve içerik optimizasyonu bu çalışmanın kapsamına alınmadı. `seoGenerator.ts` içindeki değişiklik yalnızca mevcut e-ticaret görsellerinin ilk HTML yanıtına eklenmesidir.

| Aşama | Yapılan kontrol ve sonuç |
| --- | --- |
| 1. Kod ve derleme | TypeScript geçti. Lint: 0 hata, başlangıçta da bulunan 407 uyarı. Üretim derlemesi geçti; 288 HTML dosyası oluşturuldu. |
| 2. HTTP ve sunucu | Geliştirmedeki yanlış 200 yanıtları ve noktalı geçerli blog adresinin 404 vermesi düzeltildi. Gerçek sunucuda 4 geçersiz adres testi geçti. Mevcut `validate:http`: 25/25. WWW ve sorgu parametrelerini koruyan mevcut yönlendirmeler doğrulandı. |
| 3. Görseller ve dosyalar | E-ticaret sayfasındaki 6 görsel ilk HTML'e eklendi; mevcut yollar, açıklamalar ve boyutlar kullanıldı. Tarayıcıda 6 görsel çözümlenip yüklendi. Üretim HTTP taramasındaki 107 statik dosya başarılı. Google kaynaklı iletişim görseli için ortamın ağ vekili 403 verdi. |
| 4. Masaüstü ve mobil | 29 temsili sayfa, 1440 ve 390 pikselde toplam 58 kez açıldı. Son taramada uygulama hatası, yerel dosya hatası veya sayfa taşması görülmedi. Katalog tablosunun taşması düzeltildi; 360, 390, 768 ve 1440 pikselde ayrıca doğrulandı. |
| 5. Gezinme ve sipariş | Aramadan kartvizite geçiş, ürün seçimi, sepete ekleme, sepet temizleme ve WhatsApp sipariş URL'si doğrulandı. Mobil menüden broşüre geçiş ve menünün kapanması geçti. Yanlış makbuz ve antetli bağlantıları mevcut sayfalara düzeltildi. Sipariş URL'si test içinde yakalandı; mesaj/sipariş gönderilmedi. |
| 6. Güvenlik ve performans | Npm güvenlik uyarıları 23'ten 0'a indi. Mevcut bağımlılık aralıkları içinde güncelleme yapıldı; ana sürüm yükseltmesi yapılmadı. Kilit dosyasıyla yeniden kurulum ve SQLite yerel bağımlılığı doğrulandı. Üretimde özel dosya istekleri 404; bozuk/aşırı büyük JSON istekleri 400/413 verdi ve hata yığını açığa çıkmadı. |

## Düzeltilen teknik hatalar

- E-ticaret görselleri tarayıcıda tanımlıydı, sunucunun ilk HTML'ini oluşturan bölümde eksikti. `src/utils/eTicaretImages.ts` yalnızca etkin manifest kayıtlarını ekler; ana görsel eager/high, diğerleri lazy yüklenir.
- Katalog fiyat tablosu mobilde tüm sayfayı genişletiyordu. Tablo sarmalayıcısına yatay kaydırma eklendi; fiyat hücreleri ve ürün bilgileri aynı kaldı.
- Vite'ın SPA HTML yanıtı, Express'in geliştirme ortamındaki 404 işleminden önce dönüyordu. HTML yanıtlarının kontrolü Express'e bırakıldı.
- Sunucu nokta içeren bütün adresleri dosya sanıyordu. `/blog/antetli-kagit-baskisinda-80gr-1.hamur` gibi tanımlı sayfalara izin verildi; tanımsız dosyalar hâlâ 404 verir.
- Makbuz sayfasındaki `/makbuz/...` bağlantıları ve makbuz/karton çanta sayfalarındaki `/antetli-kagit` bağlantıları mevcut sayfa adreslerine düzeltildi. Bağlantı dışındaki açıklama metinleri değişmedi.
- Eski geçersiz adres testi, geç yüklenen React bileşenlerini statik render ile bekleyemiyordu. Gerçek HTTP ve Chromium kontrolleriyle değiştirildi. Yeni teknik tarayıcı testi yukarıdaki düzeltmelerin tekrar bozulmasını kontrol eder.

## Açık kalanlar ve sınırlar

- `/reklam-urunleri`: bağlantılar var, karşılık gelen yayınlanabilir sayfa/ruta ait içerik yok; HTTP 404. Yeni ürün/kategori içeriği uydurulmadı. Hedef sayfanın ne olacağı belirlenmeli.
- `/Mavi-Basim-Fiyat-Listesi.pdf`: bloknot sayfasındaki indirme bağlantısının dosyası depoda yok; HTTP 404. Gerçek, onaylı PDF gerekli; fiyat belgesi oluşturulmadı.
- İletişim görseli: `streetviewpixels-pa.googleapis.com` isteği ortamın ağ vekilinde engellendi. Bu, canlı sitedeki görselin de bozuk olduğunu göstermez. Ortam ağ ayarları değiştirilmedi.
- Son genel HTTP taraması 290 hedefi kontrol etti ve yukarıdaki iki eksik hedef nedeniyle başarısız çıktı; kalan hedefler geçti. Dolayısıyla bütün site için hatasız sonucu verilmez.
- Lint'in 407 mevcut uyarısı, büyük dosyalar ve diğer kod borçları toplu olarak değiştirilmedi.
- En büyük ortak JavaScript paketi yaklaşık 512 kB, gzip ile 164 kB. Gerçek kullanıcı ağıyla Core Web Vitals/Lighthouse ölçümü yapılmadı; performans puanı veya hız artışı iddia edilmiyor.
- Tarayıcı denetimi 29 temsili sayfayı kapsadı; her şehir ve blog sayfası tarayıcıda ayrı ayrı açılmadı. Sitemap hedefleri ve bu sayfalardaki yerel bağlantılar HTTP üzerinden kontrol edildi.
- SEO odaklı metadata, sitemap, içerik ve şema denetimlerinin tamamı çalıştırılmadı. `npm run quality` için tüm kontroller geçti iddiası yok.
- Doğrulanmış paket yöneticisi npm'dir. `package-lock.json` güncellendi; `bun.lock` bu çalışmada güncellenmedi veya doğrulanmadı.

## Kontrolleri tekrarlama

Çalışma dizini `/workspace/mavibaski`, doğrulanmış çalışma zamanı Node.js 24'tür.

Gerektiğinde aynı kilit dosyasından kurulum:

```bash
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
```

Bir terminalde geliştirme sunucusu:

```bash
npm --ignore-scripts run dev
```

Diğer terminalde kontroller:

```bash
npm run typecheck
npm run lint
npm --ignore-scripts run build
npm run validate:http
npm run validate:routes
npm run validate:mutations
npm run validate:invalid
npm run validate:technical
npm audit --cache /workspace/.npm-cache
```

`validate:routes` 287/287, `validate:mutations` 25/25 geçti. `validate:invalid` ve `validate:technical` gerçek çalışan uygulama gerektirir; geliştirme ve üretim sunucularında doğrulandı. Chromium yolu varsayılan olarak mevcut `/usr/bin/chromium` üzerinden bulunur; başka ortamda `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` ile değiştirilebilir. `TEST_BASE_URL` ile test adresi seçilebilir.

`--ignore-scripts`, `dev`/`build` komutlarının kendisini çalıştırır; takip edilen görsel manifestini yeniden yazan `predev`/`prebuild` adımlarını atlar. Yeni görseller eklendiğinde manifest yenilemesi ayrı ve incelenebilir bir değişiklik olarak ele alınmalıdır.

Üretim doğrulaması için geliştirme sunucusunu durdurduktan sonra:

```bash
NODE_ENV=production npm start
```

Sunucu 3000 portunu kullanır. Bu komut bulut makinesinde yerel üretim modunu başlatır; canlı siteye dağıtım yapmaz.
