import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Shield, Smartphone, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import type { UserRole } from "@/lib/mock-data";
import { getAllUsersSync } from "@/lib/local-demo-store";
import logoImage from "@/assets/place2invest_logo.png";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, string>) => ({
    role: search.role as UserRole | undefined,
    redirect: search.redirect ?? "/",
  }),
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("place2invest_user");
    if (!stored) return;
    try {
      const user = JSON.parse(stored);
      const map: Record<string, string> = {
        Investisseur: "/investisseur",
        "Porteur de Projet": "/porteur-de-projet",
        "Agent Conformité": "/admin/validation-ia",
        "Super Admin": "/admin/validation-ia",
      };
      const to = map[user.role];
      if (to) throw redirect({ to });
    } catch {
      // ignore
    }
  },
  component: AuthPage,
});

const MOCK_CODE = "936277";

const roleLabels: Record<string, { nom: string }> = {
  Investisseur: { nom: "Investisseur" },
  "Porteur de Projet": { nom: "Porteur de Projet" },
  "Agent Conformité": { nom: "Conformité" },
};

function getLast6(value: string): string {
  return value.replace(/\s/g, "").slice(-6);
}

function AuthPage() {
  const { t } = useTranslation();
  const { role, redirect: redirectTo } = Route.useSearch();
  const { login } = useAuth();
  const navigate = useNavigate();

  const user = role ? getAllUsersSync().find((u) => u.role === role && u.statut === "Actif") : null;

  const [step, setStep] = useState<1 | 2>(1);
  const [codeInput, setCodeInput] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);

  if (!role || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="text-center">
          <p className="text-on-surface-variant">{t("auth.invalidRole")}</p>
          <Link to="/login" className="mt-4 inline-block text-primary hover:underline">
            {t("auth.backToLogin")}
          </Link>
        </div>
      </div>
    );
  }

  const ribLast6 = user.rib !== "—" ? getLast6(user.rib) : null;
  const cinLast6 = getLast6(user.cin);

  const handleVerifyIdentity = () => {
    setError("");
    const input = codeInput.replace(/\s/g, "");
    if (!input) {
      setError(t("auth.enter6"));
      return;
    }
    if (input !== ribLast6 && input !== cinLast6) {
      setError(t("auth.invalidCode"));
      return;
    }
    setStep(2);
    setCodeInput("");
  };

  const handleVerifySms = () => {
    setError("");
    if (!smsCode) {
      setError(t("auth.enterSms"));
      return;
    }
    if (smsCode !== MOCK_CODE) {
      setError(t("auth.incorrectCode"));
      return;
    }
    setVerified(true);
    login(role);
    setTimeout(() => navigate({ to: redirectTo as "/" }), 1200);
  };

  if (verified) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
          <h2 className="mt-4 headline-md text-on-surface">{t("auth.success")}</h2>
          <p className="mt-2 text-on-surface-variant">{t("auth.redirecting")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="border-b border-outline-variant bg-surface-lowest">
        <div className="mx-auto flex max-w-[560px] items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="Place2Invest" className="h-9 rounded-lg object-contain" />
          </Link>
          <Link to="/login" className="text-sm text-on-surface-variant hover:text-on-surface">
            {t("common.back")}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[560px] px-4 py-16">
        {/* Steps indicator */}
        <div className="mb-10 flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
            step >= 1 ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant"
          }`}>1</div>
          <div className={`h-0.5 flex-1 ${step >= 2 ? "bg-primary" : "bg-surface-container"}`} />
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
            step >= 2 ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant"
          }`}>2</div>
        </div>

        {step === 1 && (
          <>
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary-container/20 text-primary">
                <Shield className="h-7 w-7" />
              </div>
              <h1 className="headline-lg text-on-surface">{t("auth.verifyIdentity")}</h1>
              <p className="mt-1 text-xs text-on-surface-variant">
                {t("auth.role", { role: roleLabels[role]?.nom ?? role })}
              </p>
            </div>

            <div className="card-elevated p-6">
              <label className="label-sm text-on-surface-variant">
                {t("auth.enterLast6")}
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={codeInput}
                  onChange={(e) => { setCodeInput(e.target.value); setError(""); }}
                  placeholder="ex: 123456"
                  className="flex-1 rounded-md border border-outline-variant bg-surface-lowest px-4 py-3 text-center font-mono text-lg tracking-[0.25em] focus:border-primary focus:outline-none"
                  autoFocus
                />
              </div>

              <div className="mt-3 rounded-md border border-dashed border-outline-variant bg-surface-lowest/50 p-2.5 text-xs leading-relaxed text-on-surface-variant">
                <p className="font-semibold text-on-surface">{t("auth.demo")}</p>
                {ribLast6 && <p>RIB : <span className="font-mono text-primary">{ribLast6}</span></p>}
                <p>CIN : <span className="font-mono text-primary">{cinLast6}</span></p>
              </div>

              {error && <p className="mt-3 text-sm text-error">{error}</p>}

              <button
                onClick={handleVerifyIdentity}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container"
              >
                {t("auth.verifyIdentityBtn")}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary-container/20 text-primary">
                <Smartphone className="h-7 w-7" />
              </div>
              <h1 className="headline-lg text-on-surface">{t("auth.verifyCode")}</h1>
              <p className="mt-2 text-on-surface-variant">
                {t("auth.smsSent")}
              </p>
              {ribLast6 && (
                <p className="mt-1 text-xs text-on-surface-variant">
                  {t("auth.endingWith", { last: ribLast6.slice(-2) })}
                </p>
              )}
            </div>

            <div className="card-elevated p-6">
              <label className="label-sm text-on-surface-variant">
                {t("auth.enter6Digit")}
              </label>
              <input
                type="text"
                maxLength={6}
                value={smsCode}
                onChange={(e) => { setSmsCode(e.target.value.replace(/\D/g, "")); setError(""); }}
                placeholder="123456"
                className="mt-2 w-full rounded-md border border-outline-variant bg-surface-lowest px-4 py-3 text-center font-mono text-lg tracking-[0.25em] focus:border-primary focus:outline-none"
                autoFocus
              />

              <div className="mt-3 rounded-md border border-dashed border-outline-variant bg-surface-lowest/50 p-2.5 text-xs leading-relaxed text-on-surface-variant">
                <p className="font-semibold text-on-surface">{t("auth.demo")}</p>
                <p>{t("auth.smsCode")} : <span className="font-mono text-primary">{MOCK_CODE}</span></p>
              </div>

              {error && <p className="mt-3 text-sm text-error">{error}</p>}

              <button
                onClick={handleVerifySms}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container"
              >
                {t("auth.validateCode")}
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => { setStep(1); setError(""); setSmsCode(""); }}
                className="mt-3 flex w-full items-center justify-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("auth.previousStep")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
