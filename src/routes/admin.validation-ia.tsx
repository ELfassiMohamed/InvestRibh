import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, X, MessageSquare, Shield, AlertTriangle, FileCheck } from "lucide-react";

import { PageHeader } from "@/components/AppShell";
import { formatDate } from "@/lib/format";
import { useAiValidationQueue, useSubmitDecision } from "@/hooks/use-queries";

export const Route = createFileRoute("/admin/validation-ia")({
  component: ValidationIAPage,
});

function ValidationIAPage() {
  const { t } = useTranslation();
  const { data: queue = [], isLoading } = useAiValidationQueue();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [decisions, setDecisions] = useState<Record<string, { action: "approved" | "changes-requested" | "rejected"; comment: string }>>({});

  const submitDecision = useSubmitDecision();

  const selected = queue.find((q: any) => q.submissionId === selectedId) || queue[0];
  const selectedDecision = selected ? decisions[selected.submissionId] : null;

  const decisionLabel = (action: "approved" | "changes-requested" | "rejected") =>
    action === "approved"
      ? t("admin.validationIA.decisionApproved")
      : action === "changes-requested"
      ? t("admin.validationIA.decisionChanges")
      : t("admin.validationIA.decisionRejected");

  const decisionTone = (action: "approved" | "changes-requested" | "rejected") =>
    action === "approved"
      ? "text-success bg-success/10"
      : action === "changes-requested"
      ? "text-warning bg-warning/10"
      : "text-error bg-error/10";

  const decisionDetails = (action: "approved" | "changes-requested" | "rejected") => ({
    approved: { icon: Check, tone: "text-success bg-success/10", label: t("admin.validationIA.decisionApproved") },
    "changes-requested": { icon: MessageSquare, tone: "text-warning bg-warning/10", label: t("admin.validationIA.decisionChanges") },
    rejected: { icon: X, tone: "text-error bg-error/10", label: t("admin.validationIA.decisionRejected") },
  }[action]);

  const handleDecision = (action: "approved" | "changes-requested" | "rejected") => {
    if (!comment.trim() || !selected) return;
    submitDecision.mutate(
      { submissionId: selected.submissionId, action, commentaire: comment.trim() },
      {
        onSuccess: () => {
          setDecisions((prev) => ({ ...prev, [selected.submissionId]: { action, comment: comment.trim() } }));
          setComment("");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <>
        <PageHeader title={t("admin.validationIA.title")} description={t("admin.validationIA.loading")} />
        <p className="text-sm text-on-surface-variant">{t("admin.validationIA.loadingDossiers")}</p>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={t("admin.validationIA.title")}
        description={t("admin.validationIA.enAttente", { count: queue.length })}
      />

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="space-y-3">
          {queue.length === 0 ? (
            <p className="text-sm text-on-surface-variant">{t("admin.validationIA.aucunDossier")}</p>
          ) : (
            queue.map((q: any) => {
              const active = q.submissionId === (selected?.submissionId ?? queue[0]?.submissionId);
              const decision = decisions[q.submissionId];
              const d = decision ? decisionDetails(decision.action) : null;
              return (
                <button
                  key={q.submissionId}
                  onClick={() => { setSelectedId(q.submissionId); setComment(""); }}
                  className={`card-elevated w-full p-4 text-left transition-all ${
                    active ? "border-2 border-primary" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-mono text-xs text-on-surface-variant">{q.submissionId}</p>
                      <p className="mt-1 truncate text-sm font-bold text-on-surface">{q.nomProjet}</p>
                      <p className="text-xs text-on-surface-variant">{q.porteur}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <RiskBadge score={q.scoreRisque} />
                      {d && (
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${d.tone}`}>
                          <d.icon className="h-2.5 w-2.5" />
                          {d.label}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant">{formatDate(q.dateSoumission)}</span>
                    {q.alertes?.length > 0 && (
                      <span className="inline-flex items-center gap-1 font-semibold text-error">
                        <AlertTriangle className="h-3 w-3" />
                        {q.alertes.length > 1 ? t("admin.validationIA.alertes", { count: q.alertes.length }) : t("admin.validationIA.alerte", { count: 1 })}
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </aside>

        {selected && (
          <div className="space-y-6">
            <div className="card-elevated p-6">
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="label-sm text-on-surface-variant">{selected.submissionId}</p>
                  <h2 className="headline-lg mt-1 text-on-surface">{selected.nomProjet}</h2>
                  <p className="text-sm text-on-surface-variant">{t("admin.validationIA.porteur", { nom: selected.porteur })}</p>
                </div>
                <RiskBadge score={selected.scoreRisque} large />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <ScoreCard label={t("admin.validationIA.scoreRisque")} value={selected.scoreRisque} icon={<Shield />} tone="primary" />
                <ScoreCard
                  label={t("admin.validationIA.indiceFraude")}
                  value={selected.scoreFraude}
                  icon={<AlertTriangle />}
                  tone={selected.scoreFraude > 50 ? "error" : selected.scoreFraude > 20 ? "warning" : "success"}
                  inverse
                />
                <ScoreCard
                  label={t("admin.validationIA.authenticiteDocs")}
                  value={selected.authenticiteDocuments}
                  icon={<FileCheck />}
                  tone={selected.authenticiteDocuments > 80 ? "success" : selected.authenticiteDocuments > 60 ? "warning" : "error"}
                />
              </div>
            </div>

            <div className="card-elevated p-6">
              <h3 className="headline-md text-on-surface">{t("admin.validationIA.syntheseAgents")}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface">{selected.synthese}</p>

              {selected.alertes?.length > 0 && (
                <div className="mt-5 rounded-lg border border-error/30 bg-error/5 p-4">
                  <p className="label-sm text-error">{t("admin.validationIA.alertesTitle")}</p>
                  <ul className="mt-2 space-y-1.5">
                    {selected.alertes.map((a: string) => (
                      <li key={a} className="flex gap-2 text-sm text-on-surface">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="card-elevated p-6">
              {selectedDecision ? (
                <div>
                  <div className="flex items-center gap-2">
                    <div className={`grid h-8 w-8 place-items-center rounded-full ${decisionTone(selectedDecision.action)}`}>
                      {(() => {
                        const Icon = decisionDetails(selectedDecision.action).icon;
                        return <Icon className="h-4 w-4" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="headline-md text-on-surface">{decisionLabel(selectedDecision.action)}</h3>
                      <p className="text-xs text-on-surface-variant">{t("admin.validationIA.decisionEnregistree")}</p>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg border border-outline-variant bg-surface-low px-4 py-3">
                    <p className="text-xs font-medium text-on-surface-variant">{t("admin.validationIA.commentaire")}</p>
                    <p className="mt-1 text-sm text-on-surface">{selectedDecision.comment}</p>
                  </div>
                  <button
                    onClick={() => {
                      setDecisions((prev) => { const { [selected.submissionId]: _, ...rest } = prev; return rest; });
                      setComment("");
                    }}
                    className="mt-3 text-xs text-primary hover:underline"
                  >
                    {t("admin.validationIA.annulerDecision")}
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="headline-md text-on-surface">{t("admin.validationIA.decision")}</h3>
                  <label className="mt-3 flex items-center gap-2 text-sm text-on-surface">
                    <MessageSquare className="h-4 w-4" />
                    {t("admin.validationIA.commentaireObligatoire")}
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    placeholder={t("admin.validationIA.justifiez")}
                    className="mt-2 w-full rounded-md border border-outline-variant px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      disabled={!comment.trim() || submitDecision.isPending}
                      onClick={() => handleDecision("approved")}
                      className="flex items-center gap-1.5 rounded-md bg-success px-4 py-2 text-sm font-semibold text-on-success hover:opacity-90 disabled:opacity-40"
                    >
                      <Check className="h-4 w-4" /> {t("admin.validationIA.approuver")}
                    </button>
                    <button
                      disabled={!comment.trim() || submitDecision.isPending}
                      onClick={() => handleDecision("changes-requested")}
                      className="flex items-center gap-1.5 rounded-md bg-warning px-4 py-2 text-sm font-semibold text-on-warning hover:opacity-90 disabled:opacity-40"
                    >
                      <MessageSquare className="h-4 w-4" /> {t("admin.validationIA.demanderModifications")}
                    </button>
                    <button
                      disabled={!comment.trim() || submitDecision.isPending}
                      onClick={() => handleDecision("rejected")}
                      className="flex items-center gap-1.5 rounded-md bg-error px-4 py-2 text-sm font-semibold text-on-error hover:opacity-90 disabled:opacity-40"
                    >
                      <X className="h-4 w-4" /> {t("admin.validationIA.rejeter")}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function RiskBadge({ score, large }: { score: number; large?: boolean }) {
  const tone = score >= 75 ? "bg-success/10 text-success" : score >= 50 ? "bg-warning/10 text-warning" : "bg-error/10 text-error";
  return (
    <span className={`shrink-0 rounded-md font-bold ${tone} ${large ? "px-3 py-1.5 text-base" : "px-2 py-1 text-xs"}`}>
      {score}/100
    </span>
  );
}

function ScoreCard({ label, value, icon, tone, inverse }: { label: string; value: number; icon: React.ReactNode; tone: "primary" | "success" | "warning" | "error"; inverse?: boolean }) {
  const { t } = useTranslation();
  const colors = {
    primary: "text-primary bg-primary-container/20",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10",
    error: "text-error bg-error/10",
  };
  return (
    <div className="rounded-lg border border-outline-variant p-4">
      <div className="flex items-center gap-2">
        <div className={`grid h-8 w-8 place-items-center rounded-md ${colors[tone]}`}>{icon}</div>
        <p className="text-xs text-on-surface-variant">{label}</p>
      </div>
      <p className="mt-2 text-2xl font-bold text-on-surface">
        {value}
        <span className="text-sm font-normal text-on-surface-variant">/100</span>
      </p>
      <p className="text-[10px] text-on-surface-variant">
        {inverse ? t("admin.validationIA.echelleInverse") : t("admin.validationIA.echellePositive")}
      </p>
    </div>
  );
}
