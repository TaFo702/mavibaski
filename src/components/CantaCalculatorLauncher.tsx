import { useEffect, useRef, useState } from 'react';
import { Calculator, ExternalLink, X } from 'lucide-react';

const CALCULATOR_URL = 'https://canta-hesaplayici.vercel.app/';

export function CantaCalculatorLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  const openCalculator = () => {
    setIsLoading(true);
    setIsOpen(true);
  };

  return (
    <section aria-label="Özel ölçü karton çanta fiyat hesabı" className="my-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Ölçünüze göre çanta fiyatı hesaplayın</h2>
        <p className="mt-1 text-sm text-slate-600">En, boy, körük ve adet seçerek teklifinizi görüntüleyin.</p>
      </div>
      <button
        type="button"
        onClick={openCalculator}
        aria-haspopup="dialog"
        className="min-h-11 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Calculator size={20} aria-hidden="true" />
        Çanta Fiyatı Hesapla
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="canta-calculator-title"
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 m-auto h-[94dvh] max-h-[94dvh] w-[96vw] max-w-[1440px] overflow-hidden rounded-xl border-0 p-0 shadow-2xl backdrop:bg-slate-950/70 open:flex open:flex-col"
      >
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 py-2 sm:px-5">
          <div>
            <h2 id="canta-calculator-title" className="text-sm sm:text-base font-bold text-slate-900">Karton Çanta Fiyat Hesaplayıcı</h2>
            {isLoading && isOpen && <p role="status" className="text-xs text-slate-500">Hesaplayıcı açılıyor…</p>}
          </div>
          <div className="flex items-center gap-2">
            <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer" className="min-h-11 inline-flex items-center gap-1.5 rounded-lg px-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100">
              Yeni sekmede aç <ExternalLink size={15} aria-hidden="true" />
            </a>
            <button type="button" aria-label="Hesaplayıcıyı kapat" onClick={() => dialogRef.current?.close()} className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
              <X size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
        {isOpen && (
          <iframe
            src={`${CALCULATOR_URL}?embed=1`}
            title="Karton çanta fiyat hesaplayıcı"
            className="min-h-0 w-full flex-1 border-0 bg-slate-50"
            sandbox="allow-scripts allow-forms allow-same-origin"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setIsLoading(false)}
          />
        )}
      </dialog>
    </section>
  );
}
