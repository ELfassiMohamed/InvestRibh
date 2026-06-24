import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, MessageSquare, Shield, AlertTriangle, FileCheck } from "lucide-react";

import { PageHeader } from "@/components/AppShell";
import { aiValidationQueue } from "@/lib/mock-data";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/admin/validation-ia")({
  component: ValidationIAPage,
});

function ValidationIAPage() {
  const [selectedId, setSelectedId] = useState(aiValidationQueue[0].submissionId);
  const [comment, setComment] = useState("");
  const [decisions, setDecisions] = useState<Record<string, { action: "approved" | "changes-requested" | "rejected"; comment: string }>>({});

  const selected = aiValidationQueue.find((q) => q.submissionId === selectedId)!;
  const selectedDecision = decisions[selectedId];

  const handleDecision = (action: "approved" | "changes-requested" | "rejected") => {
    if (!comment.trim()) return;
    setDecisions((prev) => ({ ...prev, [selectedId]: { action, comment: comment.trim() } }));
    setComment("");
  };

  const decisionDetails = {
    approved: { icon: Check, label: "Approuvé", tone: "text-success bg-success/10" },
    "changes-requested": { icon: MessageSquare, label: "Modifications demandées", tone: "text-warning bg-warning/10" },
    rejected: { icon: X, label: "Rejeté", tone: "text-error bg-error/10" },
  } as const;

  return (
    <>
      <PageHeader
        title="Validation IA & conformité"
        description={`${aiValidationQueue.length} dossiers en attente de revue.`}
      />

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* File d'attente */}
        <aside className="space-y-3">
          {aiValidationQueue.map((q) => {
            const active = q.submissionId === selectedId;
            const decision = decisions[q.submissionId];
            const d = decision ? decisionDetails[decision.action] : null;
            return (
              <button
                key={q.submissionId}
                onClick={() => setSelectedId(q.submissionId)}
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
                  {q.alertes.length > 0 && (
                    <span className="inline-flex items-center gap-1 font-semibold text-error">
                      <AlertTriangle className="h-3 w-3" />
                      {q.alertes.length} alerte{q.alertes.length > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </aside>

        {/* Détail */}
        <div className="space-y-6">
          <div className="card-elevated p-6">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="label-sm text-on-surface-variant">{selected.submissionId}</p>
                <h2 className="headline-lg mt-1 text-on-surface">{selected.nomProjet}</h2>
                <p className="text-sm text-on-surface-variant">Porteur : {selected.porteur}</p>
              </div>
              <RiskBadge score={selected.scoreRisque} large />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <ScoreCard label="Score de risque" value={selected.scoreRisque} icon={<Shield />} tone="primary" />
              <ScoreCard
                label="Indice de fraude"
                value={selected.scoreFraude}
                icon={<AlertTriangle />}
                tone={selected.scoreFraude > 50 ? "error" : selected.scoreFraude > 20 ? "warning" : "success"}
                inverse
              />
              <ScoreCard
                label="Authenticité documents"
                value={selected.authenticiteDocuments}
                icon={<FileCheck />}
                tone={selected.authenticiteDocuments > 80 ? "success" : selected.authenticiteDocuments > 60 ? "warning" : "error"}
              />
            </div>
          </div>

          <div className="card-elevated p-6">
            <h3 className="headline-md text-on-surface">Synthèse des agents IA</h3>
            <p className="mt-3 text-sm leading-relaxed text-on-surface">{selected.synthese}</p>

            {selected.alertes.length > 0 && (
              <div className="mt-5 rounded-lg border border-error/30 bg-error/5 p-4">
                <p className="label-sm text-error">Alertes</p>
                <ul className="mt-2 space-y-1.5">
                  {selected.alertes.map((a) => (
                    <li key={a} className="flex gap-2 text-sm text-on-surface">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Décision */}
          <div className="card-elevated p-6">
            {selectedDecision ? (
              <div>
                <div className="flex items-center gap-2">
                  <div className={`grid h-8 w-8 place-items-center rounded-full ${decisionDetails[selectedDecision.action].tone}`}>
                    {(() => {
                      const Icon = decisionDetails[selectedDecision.action].icon;
                      return <Icon className="h-4 w-4" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="headline-md text-on-surface">{decisionDetails[selectedDecision.action].label}</h3>
                    <p className="text-xs text-on-surface-variant">Décision enregistrée</p>
                  </div>
                </div>
                <div className="mt-4 rounded-lg border border-outline-variant bg-surface-low px-4 py-3">
                  <p className="text-xs font-medium text-on-surface-variant">Commentaire</p>
                  <p className="mt-1 text-sm text-on-surface">{selectedDecision.comment}</p>
                </div>
                <button
                  onClick={() => {
                    setDecisions((prev) => { const { [selectedId]: _, ...rest } = prev; return rest; });
                    setComment("");
                  }}
                  className="mt-3 text-xs text-primary hover:underline"
                >
                  Annuler la décision
                </button>
              </div>
            ) : (
              <>
                <h3 className="headline-md text-on-surface">Décision</h3>
                <label className="mt-3 flex items-center gap-2 text-sm text-on-surface">
                  <MessageSquare className="h-4 w-4" />
                  Commentaire (obligatoire et journalisé)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="Justifiez votre décision…"
                  className="mt-2 w-full rounded-md border border-outline-variant px-3 py-2 text-sm focus:border-primary focus:outline-none"
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    disabled={!comment.trim()}
                    onClick={() => handleDecision("approved")}
                    className="flex items-center gap-1.5 rounded-md bg-success px-4 py-2 text-sm font-semibold text-on-success hover:opacity-90 disabled:opacity-40"
                  >
                    <Check className="h-4 w-4" /> Approuver
                  </button>
                  <button
                    disabled={!comment.trim()}
                    onClick={() => handleDecision("changes-requested")}
                    className="flex items-center gap-1.5 rounded-md bg-warning px-4 py-2 text-sm font-semibold text-on-warning hover:opacity-90 disabled:opacity-40"
                  >
                    <MessageSquare className="h-4 w-4" /> Demander modifications
                  </button>
                  <button
                    disabled={!comment.trim()}
                    onClick={() => handleDecision("rejected")}
                    className="flex items-center gap-1.5 rounded-md bg-error px-4 py-2 text-sm font-semibold text-on-error hover:opacity-90 disabled:opacity-40"
                  >
                    <X className="h-4 w-4" /> Rejeter
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
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
        {inverse ? "0 = sain · 100 = critique" : "0 = critique · 100 = excellent"}
      </p>
    </div>
  );
}
