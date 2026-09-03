# CODING_RULES.md - Kod Yazım Standartları ve Geliştirme Kuralları

Bu doküman, projedeki kod kalitesini, sürdürülebilirliği ve performansı garanti altına alan teknik kuralları tanımlar.

---

## 1. Mimari ve Dosya Yapısı

* **Modüler Yapı:** Tüm iş mantığı ve bileşenler küçük, tek bir sorumluluğa sahip (Single Responsibility Principle) dosyalara bölünmelidir. Dev `App.tsx` veya dev tek dosya yaklaşımlarından kaçınılmalıdır.
* **Tip Güvenliği (TypeScript):**
  * Tüm veri tipleri `/src/types.ts` veya ilgili modül altında açıkça tanımlanmalıdır.
  * `any` kullanımı kesinlikle yasaktır. Strict type kontrolü uygulanmalıdır.
* **Bileşen Ayrımı:**
  * Görsel bileşenler (`/src/components/`)
  * Veri ve konfigürasyonlar (`/src/data/`, `/src/constants/`)
  * Yardımcı fonksiyonlar (`/src/utils/`, `/src/lib/`) altında tutulmalıdır.

---

## 2. Performans ve Yükleme Hızı (Core Web Vitals)

* **Bundle Boyutu Optimization:** Kullanılmayan kütüphaneler projeden temizlenmelidir.
* **Görsel & Varlık Yükleme:** Ekran dışı görsellerde `loading="lazy"` kullanılmalı, ekran üstü (above the fold) kritik görseller önceden yüklenmelidir (`fetchpriority="high"`).
* **React Re-render Kontrolü:** `useEffect` bağımlılık dizileri eksiksiz olmalı, gereksiz durum güncellemelerinden ve sonsuz döngülerden kaçınılmalıdır.
* **Sunucu Tarafı Render & API Güvenliği:** Backend işlemleri `server.ts` üzerinden yürütülmeli; API anahtarları asla istemci koduna sızdırılmamalıdır.

---

## 3. Kod Düzeni ve Temiz Kod (Clean Code)

* **İsimlendirme:** Bileşen isimleri PascalCase, değişken ve fonksiyon isimleri camelCase, sabitler UPPER_SNAKE_CASE olmalıdır.
* **Bileşen Yapısı:** Yalnızca fonksiyonel bileşenler (Functional Components) ve React Hook'ları kullanılmalıdır.
* **Yan Etki Yönetimi:** Asenkron veri çekme ve durum değişimleri try-catch ve düzgün hata mesajları ile sarmalanmalıdır.
