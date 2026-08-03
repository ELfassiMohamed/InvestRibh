import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

interface PlanResult {
  rank: number;
  name: string;
  description: string;
  type: string;
  nb_etages: number;
  surface_utile_m2: number;
  cout_estime_dh: number;
  delai_mois: number;
  mcdm_score: number;
  mcdm_recommended: boolean;
  conformite: {
    risk_level: string;
    classification: string;
    key_points: string[];
    details: string;
    sources: string[];
  };
}

interface ApiResponse {
  query: string;
  terrain: Record<string, unknown>;
  regulations: { query: string; regulations: { source: string; text: string; score: number }[] };
  plans: PlanResult[];
  mcdm: Record<string, unknown>;
  conformite_summary: { plan_name: string; risk_level: string; classification: string; sources: string[] }[];
}

export function VerificationReglementairePage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/taxonomie/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), method: "wsm" }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: t("verif.serverError") }));
        throw new Error(err.error || `Erreur ${res.status}`);
      }
      const data: ApiResponse = await res.json();
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : t("verif.connError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="headline-lg text-on-surface">{t("verif.title")}</h1>
        <p className="mt-1.5 text-on-surface-variant">
          {t("verif.subtitle")}
        </p>
      </div>

      <div className="rounded-2xl border border-outline-variant bg-surface-lowest p-6 shadow-sm sm:p-8">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("verif.placeholder")}
          rows={4}
          className="w-full resize-none rounded-xl border border-outline bg-surface px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !query.trim()}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {loading ? t("verif.analysing") : t("verif.submit")}
        </button>
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-error/10 p-4 text-sm text-error">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-6">
          <div>
            <h2 className="mb-4 text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
              {t("verif.plansRecommandes", { count: result.plans.length })}
            </h2>
            {result.plans.map((plan) => (
              <div
                key={plan.rank}
                className={`mb-4 rounded-xl border p-5 ${
                  plan.mcdm_recommended
                    ? "border-primary/30 bg-primary-container/5 ring-1 ring-primary/10"
                    : "border-outline-variant bg-surface-lowest"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">#{plan.rank}</span>
                      <h3 className="font-semibold text-on-surface">{plan.name}</h3>
                      {plan.mcdm_recommended && <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />}
                    </div>
                    <p className="mt-1 text-sm text-on-surface-variant line-clamp-2">{plan.description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-bold text-on-surface">{(plan.mcdm_score * 100).toFixed(0)}%</p>
                    <p className="text-xs text-on-surface-variant">{t("verif.score")}</p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-on-surface-variant">
                  <span>{plan.type}</span>
                  <span>{plan.surface_utile_m2} m²</span>
                  <span>{plan.nb_etages} {t("verif.etages", { count: plan.nb_etages })}</span>
                  <span>{plan.cout_estime_dh.toLocaleString("fr-FR")} DH</span>
                  <span>{plan.delai_mois} {t("verif.mois", { count: plan.delai_mois })}</span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      plan.conformite.risk_level === "Faible"
                        ? "bg-success/10 text-success"
                        : plan.conformite.risk_level === "Moyen"
                          ? "bg-warning/10 text-warning"
                          : "bg-error/10 text-error"
                    }`}
                  >
                    {t("verif.risque", { label: plan.conformite.risk_level.toLowerCase() })}
                  </span>
                  <span className="text-xs text-on-surface-variant">{plan.conformite.classification}</span>
                </div>

                {plan.conformite.key_points.length > 0 && (
                  <ul className="mt-2 space-y-0.5">
                    {plan.conformite.key_points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-on-surface-variant">
                        <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-on-surface-variant/40" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {result.regulations.regulations.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                {t("verif.reglementations")}
              </h2>
              <div className="space-y-2">
                {result.regulations.regulations.map((reg, i) => (
                  <div key={i} className="rounded-lg border border-outline-variant bg-surface-lowest p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-medium text-on-surface">{reg.source}</p>
                      <span className="shrink-0 text-xs text-on-surface-variant">{(reg.score * 100).toFixed(0)}%</span>
                    </div>
                    <p className="mt-1 text-xs text-on-surface-variant line-clamp-3">{reg.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
