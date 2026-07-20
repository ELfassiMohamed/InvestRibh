import { useState, useEffect } from "react";
import { Info } from "lucide-react";

export function DemoNotice({ onDone }: { onDone?: () => void }) {
  const [open, setOpen] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => { setOpen(false); onDone?.(); }, 250);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center motion-reduce:animate-none">
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none"
        style={{ opacity: closing ? 0 : 1 }}
        onClick={handleClose}
      />
      <div
        className="relative mx-4 w-full max-w-sm rounded-2xl bg-surface-lowest p-8 pt-9 text-center shadow-2xl transition-all duration-300 motion-reduce:transition-none"
        style={{
          opacity: closing ? 0 : 1,
          transform: closing ? "translateY(10px) scale(0.96)" : "translateY(0) scale(1)",
        }}
      >
        <div className="mx-auto mb-5 flex size-[52px] items-center justify-center rounded-full bg-primary-container">
          <Info className="size-6 text-primary" />
        </div>

        <h2 className="font-display text-xl font-semibold text-on-surface">
          Plateforme de démonstration en cours de développement
        </h2>
        <p className="mt-2 text-sm/relaxed text-on-surface-variant">
          Ceci est une version de test. Aucune donnée personnelle n'est collectée ou conservée.
        </p>

        <div className="mx-auto my-5 h-px w-3/4 bg-border" />

        <h2 className="font-display text-xl font-semibold text-on-surface" dir="rtl">
          منصة تجريبية قيد التطوير
        </h2>
        <p className="mt-2 text-sm/relaxed text-on-surface-variant" dir="rtl">
          هذه نسخة تجريبية. لا يتم جمع أو حفظ أي بيانات شخصية.
        </p>

        <button
          onClick={handleClose}
          className="mt-7 inline-flex items-center justify-center rounded-xl bg-primary px-7 py-2.5 text-sm font-medium text-on-primary transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          autoFocus
        >
          Continue / استمر
        </button>
      </div>
    </div>
  );
}
