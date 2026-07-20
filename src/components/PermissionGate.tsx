import { useState, useEffect, type ReactNode } from "react";
import { Shield } from "lucide-react";
import { DemoNotice } from "./DemoNotice";

const PERMISSION_KEY = "place2invest_permission";
const ACCESS_CODE = "investbachterba7";

export function PermissionGate({ children }: { children: ReactNode }) {
  const [granted, setGranted] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(PERMISSION_KEY);
    if (stored === "true") { setGranted(true); setShowNotice(true); }
    setLoading(false);
  }, []);

  const handleSubmit = () => {
    setError("");
    if (code.trim().toLowerCase() !== ACCESS_CODE) {
      setError("Code incorrect. Veuillez réessayer.");
      return;
    }
    localStorage.setItem(PERMISSION_KEY, "true");
    setGranted(true);
    setShowNotice(true);
  };

  const handleNoticeDone = () => {
    setShowNotice(false);
  };

  if (loading) return null;

  if (granted) {
    return (
      <>
        {showNotice && <DemoNotice onDone={handleNoticeDone} />}
        {children}
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-surface-lowest p-8 pt-9 text-center shadow-2xl">
        <div className="mx-auto mb-5 flex size-[52px] items-center justify-center rounded-full bg-primary-container">
          <Shield className="size-6 text-primary" />
        </div>

        <h2 className="font-display text-xl font-semibold text-on-surface">
          Accès restreint
        </h2>
        <p className="mt-2 text-sm/relaxed text-on-surface-variant">
          Entrez le code de permission pour accéder à la plateforme.
        </p>

        <div className="mt-6">
          <input
            type="password"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(""); }}
            onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
            placeholder="Code de permission"
            className="w-full rounded-md border border-outline-variant bg-surface-lowest px-4 py-3 text-center font-mono text-sm tracking-wider focus:border-primary focus:outline-none"
            autoFocus
          />
        </div>

        {error && (
          <p className="mt-3 text-sm text-error">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-primary px-7 py-2.5 text-sm font-medium text-on-primary transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Valider
        </button>
      </div>
    </div>
  );
}
