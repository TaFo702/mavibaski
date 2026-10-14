# Mavi Basım — Zarf Keyword / GSC İçerik Uygulama Raporu

Sayfa: https://mavibasim.com/zarf  
Tarih: 14 Ekim 2026  
Veri dayanağı: Kullanıcının paylaştığı Planner/GSC analiz özeti ve yedi öncelikli ticari sorgu.

## İşlem ve puan

Önceki işlemde teknik prerender/hydration ve schema düzeltmeleri uygulanmıştı; bu sorgular için içerik düzenlemesi yapılmamıştı. Bu işlemde eksik kalan içerik çalışması tamamlandı: yalnız üç mevcut paragraf ve bir mevcut blog bağlantısı düzenlendi. Kaynak değişikliği yalnız `src/components/Zarf.tsx` dosyasında.

Önceki teknik denetimin geçici puanı 97/100 olarak korunuyor. Anahtar kelimelerin metinde bulunması ayrıca Google sıralama puanı değildir. Yeni GSC konum, tıklama veya CTR ölçümü yapılmadı.

## Verilen sorgular için yapılan işlemler

Aşağıdaki Planner/GSC değerleri kullanıcının sağladığı rapordan alınmıştır; yeniden veri çekimi veya hesaplama sonucu değildir. Her sorguda raporlanan tıklama 0, CTR %0. Hedef URL sütunu bu çalışmanın ticari içerik hedefidir; sorgu bazında doğrulanmış GSC URL kaydı olarak sunulmuyor.

| Sorgu | Planner aylık hacim | GSC gösterim | Konum | İşlem | Ticari hedef |
| --- | ---: | ---: | ---: | --- | --- |
| baskılı zarf | 500 | 36 | 34,8 | Girişte ürün seçimi cümlesine doğal biçimde işlendi | /zarf |
| zarf bastırma | 50 | 16 | 37,9 | Mevcut sipariş hazırlığı paragrafına işlendi | /zarf |
| diplomat zarf baskı | 50 | 18 | 38,0 | Mevcut seçim rehberindeki ifade korundu | /zarf |
| diplomat zarf baskı fiyatları | 50 | 18 | 29,4 | Mevcut H1 ve içerik korundu | /zarf |
| baskılı diplomat zarf | 50 | 5 | 46,8 | Mevcut seçim rehberindeki ifade korundu | /zarf |
| baskılı diplomat zarf fiyatları | 50 | 7 | 40,9 | Model seçimi paragrafındaki fiyat karşılaştırmasına işlendi | /zarf |
| torba zarf baskı fiyatları | 50 | 2 | 30,0 | Aynı fiyat karşılaştırması paragrafına işlendi | /zarf |

Düzenleme öncesinde üç tam ifade metinde bulunmuyordu: zarf bastırma, baskılı diplomat zarf fiyatları, torba zarf baskı fiyatları. Bu, ilgili model veya fiyat konularının tamamen eksik olduğu şeklinde yorumlanmadı. Aynı konularda yeni sayfa veya bölüm açılmadı; bütün eşanlamlı sorgular için ayrı tekrar paragrafları oluşturulmadı.

## Değişen üç mevcut paragraf

1. Girişin ürün seçimi cümlesi:

> Kurumsal evrak ve yazışma gönderimlerinizde kullanacağınız baskılı zarf için diplomat veya torba zarf seçeneklerini değerlendirebilirsiniz.

2. Mevcut model seçimi paragrafı:

> Baskılı diplomat zarf fiyatları ile torba zarf baskı fiyatları, ebat, baskı türü ve sipariş adedine göre mevcut fiyat listesinden karşılaştırılabilir. Model seçimi için diplomat ve torba zarf seçim rehberini inceleyebilirsiniz.

Bu paragraftaki “diplomat ve torba zarf seçim rehberini” bağlantısı mevcut yazıya gider:

https://mavibasim.com/blog/zarf-baskisinda-diplomat-ve-torba-zarf

3. Mevcut sipariş hazırlığı paragrafı:

> Zarf bastırma talebinizden önce logo, ölçü, zarf modeli ve adet bilgilerini netleştirin. Logo ve tasarım dosyalarının baskıya uygun formatta iletilmesi önerilir.

Fiyat açıklaması tabloların dışında kalan mevcut model seçimi paragrafındadır. Fiyat listesi başlığı, açıklaması, tablosu veya düğmeleri yeniden yazılmadı.

## Yapılmayan GSC/Planner işlemleri ve veri sınırları

- Google Search Console hesabına veya Google Keyword Planner'a bağlanılmadı. Yeni veri çekilmedi; indeksleme isteği veya GSC panelinde işlem yapılmadı.
- Yirmi Planner CSV dosyası bu işlemde yeniden birleştirilmedi. 268/213 veya 35/28 sayılarını yeniden doğruladığım iddia edilmiyor.
- Raporda sözü edilen 10 içerik fırsatının tam listesi ve 30 günlük planın ayrıntıları paylaşılan özette yok. Bu işlem yalnız verilen yedi sorgunun uygulanmasıdır; görülmeyen üç fırsat veya plan adımı uydurulmadı.
- Tek URL kümesi toplamı 7 tıklama / 556 gösterim ile ana URL toplamı 4 / 289 arasındaki fark bu site metni değişikliğiyle çözülmedi. Tekrarlı sorgular ve eksik sorgu–URL alanları için kesin pay veya URL çakışması hesabı yapılmadı.
- Fırsat puanları yeniden hesaplanmadı. Güncel sıralama kazanımı, indekslenme veya ilk sayfa sonucu ölçülmedi.
- Bu değişiklik kaydı rapora ve GitHub'a yazıldı; ayrı bir GSC analiz uygulamasının SEO çalışma geçmişine otomatik kayıt eklenmedi.

## Koruma kanıtları

Fiyat listeleri ve tabloları kesinlikle değiştirilmeyecek kuralı uygulandı.

- Kaynaktaki fiyat bölümünün tamamı düzeltme öncesi kopyasıyla birebir eşleşiyor.
- Üç tablo JSX bloğu, başlıkları, hücreleri, stilleri, bağlantıları ve düğmeleri birebir aynı.
- Galeri kayıtları ve bütün public dosyaları aynı. Kullanıcının kapsam dışında bıraktığı görsel açıklaması ve WhatsApp örtüşmesine müdahale edilmedi.
- Tarife ve sabit dosyaları aynı; başka ürün veya blog sayfası değiştirilmedi.
- Title, description ve H1 değişmedi. Yeni sayfa, route, bölüm, görsel, framework veya paket eklenmedi.
- Fiyat tablosunun ilk HTML'si önceki canlı HTML ile birebir aynı. SHA256:

`d4a1a973a0e002ff3562cbafc931af07bc3e1c0e45f3fc964c2b75ec8d760b2c`

- Diğer 293 sayfanın üretilen HTML'si, asset dosya adları dışında önceki çıktıyla aynı.
- Zarf dosyasının bütünü, onaylanan üç metin düzenlemesi ve bağlantı nedeniyle değişti: önceki Git blob SHA `4ff0eb8c2c826dbd058f4feb8eb32d27a21fd1c7`, yeni SHA `e02c033ac78e0f6d6ecf16dc467cc5dbfbe2a38b`. Korunan fiyat bölümünün ve tabloların baytları değişmedi.

## Doğrulama ve yayın

Üretim Vite/prerender/server build tamamlandı: 294 rota. Typecheck geçti. Zarf dosyasında ESLint 0 hata; önceki dört kullanılmayan import/değişken uyarısı kaldı. Mevcut zarf regresyonu; ilk HTML/hydration metin ve bağlantı eşleşmesi, fiyat tablosunun DOM kimliği, sipariş detayını açma/kapatma, rota dönüşleri, yenileme ve üretim HTTP testlerini geçti.

GitHub Production Quality Gate #137, run ID 38529872009 başarılı. PR #17 birleştirildi. Vercel merge commit'inin deployment durumunu başarılı bildirdi.

Canlı HTTP yanıtı 200. Yedi hedef ifade ilk HTML ve Chrome DOM'unda bulunuyor. Canlı `#root` çıktısı yerelde doğrulanan çıktı ile birebir aynı. Ana içerikte 11 H2 ve sayfada 74 bağlantı var. Yeni rehber bağlantısı Chrome'da klavye ile açılıp doğru URL ve makale H1'i doğrulandı; zarf sayfasına dönüş kontrol edildi.

Önemli sınırlar: Mobil boyut, LCP/CLS/INP ve Search Console indeks/performans doğrulaması bu işlemde yapılmadı. Yedi tam ifadenin varlığı, anahtar kelime yoğunluğu hedefi veya sıralama başarısı olarak kabul edilmedi.

Kaynak commit: f28e62ca26efe624d61a422cbfceea9d5017a129  
Yayın merge commit: a1b3e93d8b664860bcc4783e1a1fb3339f6ffd91  
PR: https://github.com/TaFo702/mavibaski/pull/17  
Deployment: https://vercel.com/kolay-basim/mavibaski/HJipQ5tts1MazFrH7uWsPjd84HG1  
Doğrulanan canlı giriş asset'i: /assets/index-DUncTk1e.js

## Kalan sorunlar ve ÇÖZÜM PROMPTU

Bu değişikliğin doğrulamasında yeni kapsam içi teknik hata bulunmadı. Önceki görsel açıklaması ve WhatsApp örtüşmesi kullanıcı talebiyle kapsam dışında.

Yeni içerik veya URL üretme. Fiyat listeleri ve tablolarının verilerini, başlıklarını, HTML/JSX'sini, stillerini, bağlantılarını ve düğmelerini kesinlikle koru. Görülmeyen Planner/GSC satırlarını, fırsatları veya sıralama sonucunu uydurma. Sonraki performans değerlendirmesinde yalnız /zarf için sorgu–URL bilgisi içeren, aynı uzunlukta dönemleri ve aynı filtreleri kullanan gerçek GSC verisini karşılaştır. Tekrarlı kayıtlar netleşmeden küme ve ana URL toplamlarını birleştirme.
