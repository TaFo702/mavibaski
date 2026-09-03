import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ShieldCheck, Printer, Truck, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants/contact';
import { WhatsAppIcon } from './WhatsAppIcon';

export interface InternalLink {
  label: string;
  path: string;
}

export interface TrustSignal {
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  text: string;
}

export interface CategoryHeroProps {
  title: string;
  titleId?: string;
  badge?: string;
  description: React.ReactNode;
  relatedLinks?: InternalLink[];
  customCtaText?: string;
  customCtaLink?: string;
  trustSignals?: TrustSignal[];
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({
  title,
  titleId,
  badge,
  description,
  relatedLinks = [],
  customCtaText = "Özel Ölçü / Toptan Teklif Al",
  customCtaLink,
  trustSignals
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 mb-6 shadow-sm">
      {/* Breadcrumb & H1 Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3 flex-wrap">
          <Link to="/" className="bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors shrink-0" title="Ana Sayfaya Dön">
            <ChevronRight size={18} className="rotate-180 text-slate-700" />
          </Link>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 id={titleId} className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900">
                {title}
              </h1>
              {badge && (
                <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </div>
          </div>
        </div>

        <a
          href={customCtaLink || WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm shrink-0 self-start md:self-auto hover:scale-105 active:scale-95"
        >
          <WhatsAppIcon size={16} />
          {customCtaText}
        </a>
      </div>

      {/* Meta-Aligned Intro Description */}
      <div className="text-slate-600 font-semibold text-xs sm:text-sm leading-relaxed mb-4">
        {description}
      </div>

      {/* Internal Link Badges (if provided) */}
      {relatedLinks.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap text-xs mb-4 pt-1">
          <span className="font-bold text-slate-400 uppercase text-[11px] tracking-wider">İlgili Baskı Kategorileri:</span>
          {relatedLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className="bg-slate-100 hover:bg-primary/10 hover:text-primary text-slate-700 font-bold px-2.5 py-1 rounded-lg border border-slate-200/60 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Micro Trust Signals Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] font-bold text-slate-700">
        {(trustSignals || [
          { icon: Printer, text: "Topkapı Hizmet ve Koordinasyon Noktası" },
          { icon: CheckCircle2, text: "Baskıya Hazır Dosya İçin Teknik Kontrol" },
          { icon: Truck, text: "Türkiye Geneline Anlaşmalı Kargo" },
          { icon: ShieldCheck, text: "Farklı Ebat ve Gramaj İçin Özel Teklif" }
        ]).map((item, idx) => {
          const IconComp = item.icon || CheckCircle2;
          return (
            <div key={idx} className="flex items-center gap-2">
              <IconComp className="text-primary w-4 h-4 shrink-0" />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
