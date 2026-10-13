# Mavi Basım Ana Sayfa Denetimi

**Canlı kontrol:** 13 Ekim 2026, Türkiye saati 23:32’de başlayan inceleme. İncelenen sayfa: https://mavibasim.com/

**Geçici puan: 87/100.** Önceki 92 puanlı kontrolde gözden kaçan yedi kategori hedefi ve şehir kartı kırpılması canlı denetimde doğrulandı. Bu puan Google sıralaması veya tüm alt sayfaların tam değerlendirmesi değildir. Mobil görünüm ve ölçülmüş performans eksikleri nedeniyle geçicidir.

**İşlem sınırı:** İnceleme sırasında uygulama kaynakları değiştirilmedi; düzeltme, merge veya canlı yayın işlemi yapılmadı. Yalnız bu Markdown raporu ayrı denetim dalına kaydedildi. Fiyat listeleri ve tablolarının verileri, başlıkları, satırları, HTML/JSX’i, stilleri, bağlantıları ve düğmeleri kesinlikle değiştirilmeyecek. Diğer sayfa içerikleri, tarifeleri ve URL’leri korunacak.

## 1. Yüksek — Yedi hizmet kategorisi yanlış ürün sayfasına gidiyor

**Yer:** Ana sayfadaki “Matbaa Hizmetlerimiz & Matbaa Ürünleri” / “Hizmet Kategorilerimiz” alanı (`#products`). Fiyat tablosu dışında.

| Bağlantı metni | Mevcut yanlış hedef | Doğrulanan mevcut doğru hedef |
|---|---|---|
| Sigorta Poliçeleri Baskı | `/sozlesme-baski` | `/sigorta-policeleri` |
| Tahsilat Makbuzu Baskı | `/para-makbuzu` | `/tahsilat-makbuzu` |
| Araç Kiralama Baskı | `/sozlesme-baski` | `/arac-kiralama` |
| Gider Makbuzu Baskı | `/para-makbuzu` | `/gider-makbuzu` |
| Giriş Bileti Baskı | `/adisyon` | `/giris-bileti` |
| Reçete Baskı | `/adisyon` | `/recete` |
| Tediye Makbuzu Baskı | `/para-makbuzu` | `/tediye-makbuzu` |

**Kanıt:** Yedi eşleşme hem güncel HTTP ilk HTML’sindeki gerçek href’lerde hem Chrome DOM’unda mevcut. Chrome’da “Reçete Baskı” bağlantısı tıklandı: adres `https://mavibasim.com/adisyon`, H1 “Adisyon Fişi Baskı ve Numaratörlü Adisyon Koçanı Fiyatları” oldu. Ayrı `/recete` sayfasının ilk HTML H1’i “Reçete Baskı Fiyatları ve Reçete Koçanı Baskısı”. Doğru hedeflerin yedisi HTTP 200 verdi ve her birinin mevcut başlık/H1 içeriği ilgili ürünü anlattı.

**Kaynak kanıtı:** `src/App.tsx` içindeki `getCategoryPath`, bu yedi ürün için genel/başka ürün yolları döndürüyor. Kaynakta bu işlevin kullanım yeri `CategoryList`; ana sayfa `#products` bölümünde çağrılıyor. Fiyat Listesi menüsünün hedef üreticisi değildir.

**Etki:** Müşteri seçtiği ürünü açamıyor; ana sayfanın bu bağlantılarının metni ile hedef ürün uyuşmuyor. İlgili mevcut ürün sayfasına verilmesi gereken iç bağlantı başka sayfaya gidiyor. Bunun tek başına Google sıralamasını ne kadar etkilediği ölçülmedi.

## 2. Düşük — Yedi şehir kartının açıklaması kırpılıyor

**Yer:** “Türkiye’nin 81 İline Online Matbaa ve Baskı Hizmeti” bölümünün “Öne Çıkan Şehirler” kartları (`#turkiye-geneli-matbaa`). Fiyat koruma alanı dışında.

**Kanıt:** Chrome, 1363×936 ekran (1348 px içerik genişliği). İstanbul, Ankara, İzmir, Muğla, Balıkesir, Bitlis ve Mardin kartlarının açıklama paragraflarında `clientHeight=30`, `scrollHeight=45` ölçüldü. Görüntüde açıklamalar iki satırdan sonra üç noktayla kesiliyor. İstanbul örneğinde tam metin “Türkiye'nin ticaret ve finans merkezi, kurumsal firmalar, ajanslar ve perakende devleri.”; ekranda son kısmı görünmüyor.

**Kaynak:** `src/components/CityLinksSection.tsx` açıklama paragrafındaki `line-clamp-2`. Bu bileşenin mevcut kullanımı ana sayfada.

**Etki:** Açıklamanın tamamı müşteri tarafından kart üzerinde okunamıyor. Metin ilk HTML’de bulunduğundan “Google metni göremiyor” sonucu çıkarılmadı. Diğer ekranlarda aynı sayıda kartın kırpıldığı iddia edilmedi.

## 3. Orta — Genel sipariş çağrısı yalnız katalog sayfasını açıyor

**Yer:** Korunan `#fiyatlar` bölümündeki “Online Sipariş Ver” bağlantısı.

**Kanıt:** Güncel ilk HTML ve Chrome DOM’u: bağlantı metni “Online Sipariş Ver”, href `/kataloglar`. Genel ürün/sipariş seçimi anlatan çağrı yalnız katalog ürününe yönleniyor.

**Etki:** Başka ürün sipariş etmek isteyen müşteri ilgisiz tek ürün ekranına taşınıyor.

**Müdahale edilmeyecek:** Bağlantı fiyat koruma alanında. Mevcut kural gereği hedefi, metni, HTML’si ve stili değiştirilmeyecek.

## 4. Düşük — Fiyat Listesi menüsündeki sayfa hedefleri href üretmiyor

**Yer:** Korunan ortak “Fiyat Listesi” menüsü.

**Kanıt:** Chrome’da menü açıldığında `#fiyat-listesi-dropdown-menu` içinde sayfa seçimi öğeleri `button`; gerçek href’li bağlantı sayısı 0. Örneğin Broşür, El İlanı, Afiş, Magnet, Kitap Ayracı, Yağ Kartı ve Etiket öğelerinde href yok. Menü açma düğmesinin kendisi hata sayılmadı; bulgu sayfaya götüren öğelerdir.

**Etki:** Bu menü öğeleri standart bağlantı davranışını ve href üzerinden taramayı sağlamıyor. Aynı ürünlerin başka alanlarda bağlantıları bulunduğundan bütün ürünlerin taranamadığı iddia edilmedi.

**Müdahale edilmeyecek:** Fiyat Listesi menüsündeki bağlantı/düğmeler koruma kapsamındadır; dönüştürülmeyecek.

## Puan dağılımı

| Kapsam | Ağırlık | Geçici puan |
|---|---:|---:|
| Prerender / hydration | 25 | 25 |
| Metadata / canonical / rota temizliği | 25 | 25 |
| Schema | 20 | 20 |
| Tarama / URL / bağlantılar | 15 | 9 |
| Başlık / görsel / kullanılabilirlik / ölçülmüş performans | 15 | 8 |
| **Toplam** | **100** | **87** |

Yedi yanlış kategori hedefi aynı eşleme sorununun örnekleri olarak tek grupta puanlandı. Şehir kartlarının yedi kırpılması da tek görünüm sorunu olarak değerlendirildi. Aynı sorun tekrar puan düşürmedi. Görünüm/performance kategorisindeki altı puan, henüz tamamlanmamış mobil/performans değerlendirmesine ayrıldı; altı doğrulanmış yeni hata anlamına gelmez. İsteğe bağlı özellik, video veya bölüm yokluğu hata sayılmadı.

## Önemli doğrulama sınırlamaları

- Bu canlı tarayıcı kontrolü masaüstü Chrome kapsamındadır. Gerçek mobil ekran, bütün klavye/odak senaryoları ve bütün tarayıcılar test edilmedi.
- Bu turda gerçek tıklama ile yanlış hedefin yeniden üretildiği ürün Reçete’dir. Diğer altı yanlış bağlantının href’i ve doğru mevcut hedeflerinin HTTP/H1 içeriği karşılaştırıldı; yedisinin tüm SPA geçişleri tek tek çalıştırılmış gibi sunulmadı.
- Ana sayfadan Adisyon’a geçiş ve ana sayfaya geri dönüş izlendi. Önceki 20 ürün dönüşü bu turda yeniden çalıştırılmadı. Ana sayfaya doğrudan açılışlar yapıldı.
- Beş banner düğmesi kullanılırken H1 sayısı kontrol edildi; hızlı tıklamalar arasındaki geçiş animasyonları her bannerın son piksel görüntüsünün ayrı ayrı tamamlanmış testi olarak sunulmadı.
- 18 lazy ürün görseli kaydırılarak yüklenme durumları kontrol edildi. Bu kontrol tüm mobil yükleme koşulları veya tüm site görsellerinin denetimi değildir.
- LCP, CLS ve INP ölçülmedi; laboratuvar veya gerçek kullanıcı sayıları yazılmadı. Search Console indeksleme, gerçek arama konumu ve müşteri dönüşümü ölçülmedi.
- Build/prerender bu inceleme sırasında yeniden çalıştırılmadı. Önceki düzeltme commit’i için başarılı GitHub CI, yeni bir build testi yapılmış gibi sunulmadı.
- Tarayıcı kayıtlarındaki `chrome-extension://.../content-script.bundle.js` kaynaklı “Error sending browser metadata to extension” kaydı site kaynaklı hata değildir; site kusuru olarak sayılmadı.
- Şirket geçmişi, makine kalibrasyonu, ticari garantiler gibi işletme iddialarının bağımsız belgeleri bu incelemede alınmadı; doğrulanmamış iddialar yanlışmış gibi raporlanmadı.

## ÇÖZÜM PROMPTU

Yalnız yukarıdaki 1 ve 2 numaralı doğrulanmış, fiyat koruma alanı dışındaki sorunları en küçük kalıcı kaynak değişikliğiyle düzelt:

1. `src/App.tsx` içindeki `getCategoryPath` işlevinin yedi yanlış ürün eşlemesini tabloda doğrulanan mevcut doğru hedeflerle değiştir. Diğer kategori hedeflerini, isimlerini ve sırasını koru. Yeni sayfa/route oluşturma; hedef alt sayfaların içeriklerini, tarifelerini veya URL’lerini değiştirme. Fiyat Listesi menüsüne müdahale etme.
2. `src/components/CityLinksSection.tsx` içinde yalnız şehir açıklama paragrafını kırpan `line-clamp-2` sınırlamasını kaldırıp metnin tamamının mevcut kartta satırlara sarılmasını sağla. Şehir sırasını, metinleri, bağlantıları, marka renklerini, fontları ve kart yapısını koru. Genel CSS değiştirme.
3. Canlıdaki 3 ve 4 numaralı sorunlara müdahale etme. **Fiyat listeleri ve tablolarının verileri, başlıkları, satırları, HTML/JSX’i, stilleri, bağlantıları ve düğmeleri kesinlikle değiştirilmeyecek.**
4. Mevcut build/prerender ve ilgili typecheck kontrollerini doğrula. Yedi kategori bağlantısının hem ilk HTML hem JS sonrası DOM’daki href’ini ve doğru ürün açılışını test et. Şehir açıklamalarını ölçülen masaüstü genişliğinde ve mobilde kontrol et. Fiyat koruma alanının HTML, bağlantı ve veri eşitliğini karşılaştır; hydration ve ana sayfaya geri dönüşte metadata temizliğini doğrula.
5. Yeni özellik, bölüm, görsel, framework, paket veya dış hizmet ekleme. Sağlıklı alanları yeniden yazma. Yalnız dist yaması yapma. Bu denetim veya çözüm promptu kapsamında merge/deploy yapma.

Bu inceleme sırasında çözüm uygulanmadı.
