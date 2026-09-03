/**
 * Dynamic delivery date utility for Mavi Basım
 * Calculates estimated dispatch/delivery date based on lead days.
 * Formats: "Teslimat 30 Temmuz 2026 Perşembe Günü Kargoya Verilir"
 */

export const CATEGORY_DELIVERY_DAYS: Record<string, number> = {
  brosur: 2,
  'el-ilani': 2,
  magnet: 4,
  zarf: 3,
  'karton-canta': 5,
  makbuz: 4,
  'makbuz-ve-formlar': 4,
  bloknot: 7,
  'amerikan-servis': 3,
  etiket: 3,
  dosya: 7,
  antetli: 3,
  katalog: 5,
  kutu: 6,
  afis: 3,
  kartvizit: 2,
  ambalaj: 5,
  'oto-paspas': 3,
  'yag-karti': 3,
  'kitap-ayraci': 3,
  default: 2
};

export function getDeliveryDateString(businessDaysToAdd: number = 2): string {
  const targetDate = new Date();
  let remainingDays = businessDaysToAdd;

  while (remainingDays > 0) {
    targetDate.setDate(targetDate.getDate() + 1);
    const dayOfWeek = targetDate.getDay();
    // 0 = Pazar, 6 = Cumartesi (Skip weekends)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      remainingDays--;
    }
  }

  const day = targetDate.getDate();
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];
  const days = [
    "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"
  ];

  const monthName = months[targetDate.getMonth()];
  const year = targetDate.getFullYear();
  const dayName = days[targetDate.getDay()];

  return `Baskıya uygun dosya, ödeme ve PDF onayı bugün tamamlanırsa tahmini kargoya veriliş tarihi: ${day} ${monthName} ${year} ${dayName}`;
}

export function getCategoryDeliveryDateString(categoryKey: string): string {
  if (!categoryKey) return getDeliveryDateString(2);
  const normalizedKey = categoryKey.toLowerCase().trim();
  const days = CATEGORY_DELIVERY_DAYS[normalizedKey] ?? CATEGORY_DELIVERY_DAYS.default;
  return getDeliveryDateString(days);
}
