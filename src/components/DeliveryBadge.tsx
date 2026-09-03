import React from 'react';
import { Truck, Clock } from 'lucide-react';
import { getCategoryDeliveryDateString, CATEGORY_DELIVERY_DAYS, getDeliveryDateString } from '../utils/delivery';

interface DeliveryBadgeProps {
  categoryKey?: string;
  days?: number;
  customDaysLabel?: string;
  variant?: 'badge' | 'card' | 'inline' | 'banner';
  className?: string;
}

export const DeliveryBadge: React.FC<DeliveryBadgeProps> = ({
  categoryKey = 'brosur',
  days,
  customDaysLabel,
  variant = 'badge',
  className = ''
}) => {
  const deliveryDays = days ?? (CATEGORY_DELIVERY_DAYS[categoryKey.toLowerCase()] || 2);
  const daysText = customDaysLabel || `${deliveryDays} İş Günü`;
  const deliveryText = days !== undefined 
    ? getDeliveryDateString(days) 
    : getCategoryDeliveryDateString(categoryKey);

  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-bold ${className}`}>
        <Truck size={14} className="text-emerald-600 shrink-0" />
        <span>{deliveryText}</span>
      </span>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/90 rounded-2xl p-3.5 flex items-center gap-3 shadow-xs ${className}`}>
        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <Truck size={18} />
        </div>
        <div>
          <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">GÜNCEL TESLİMAT SÜRESİ ({daysText.toUpperCase()})</span>
          <span className="text-xs md:text-sm font-black text-emerald-950 block">{deliveryText}</span>
        </div>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-slate-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border border-slate-800 shadow-md ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Truck size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">Hızlı Baskı &amp; Kargolama</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">{daysText}</span>
            </div>
            <p className="text-xs md:text-sm font-bold text-white mt-0.5">{deliveryText}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 shrink-0">
          <Clock size={14} className="text-emerald-400" />
          <span>Topkapı Matbaa Noktasından Kargo</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-black tracking-tight ${className}`}>
      <Truck size={14} className="text-emerald-600 shrink-0" />
      <span>{deliveryText}</span>
    </div>
  );
};
