import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Eye, EyeOff, FileText } from "lucide-react";

import { PageHeader } from "@/components/AppShell";
import { formatDate, formatMAD, maskSensitive } from "@/lib/format";
import { useInvestorDashboard, useProjects } from "@/hooks/use-queries";

export const Route = createFileRoute("/investisseur/portefeuille")({
  component: PortefeuillePage,
});

const documents = [
  { nom: "Attestation de propriété — Anfa Park", type: "Attestation", date: "2025-02-20" },
  { nom: "Contrat d'investissement — Tanger Med", type: "Contrat", date: "2025-05-22" },
  { nom: "Relevé fiscal 2025", type: "Fiscal", date: "2026-01-15" },
  { nom: "Attestation de propriété — Agadir Marina", type: "Attestation", date: "2025-01-12" },
];

function PortefeuillePage() {
  const [showRib, setShowRib] = useState(false);
  const rib = "230 780 1234567890123456 21";
  const { data: dashboard, isLoading } = useInvestorDashboard();
  const { data: allProjects = [] } = useProjects();

  if (isLoading || !dashboard) {
    return (
      <>
        <PageHeader title="Mon portefeuille" description="Vue détaillée de vos participations." />
        <p className="text-sm text-on-surface-variant">Chargement…</p>
      </>
    );
  }

  const { holdings, transactions } = dashboard;
  const getProject = (id: string) => allProjects.find((p: any) => p.id === id);

  return (
    <>
      <PageHeader
        title="Mon portefeuille"
        description="Vue détaillée de vos participations, historique sécurisé et coffre-fort documentaire."
      />

      {/* Bandeau compte */}
      <div className="card-elevated mb-6 flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <p className="label-sm text-on-surface-variant">RIB de référence</p>
          <p className="mt-1 font-mono text-lg font-bold text-on-surface">
            {showRib ? rib : maskSensitive(rib)}
          </p>
        </div>
        <button
          onClick={() => setShowRib(!showRib)}
          className="flex items-center gap-1.5 rounded-md border border-outline-variant px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-container"
        >
          {showRib ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showRib ? "Masquer" : "Révéler"}
        </button>
      </div>

      {/* Participations */}
      <section className="mb-8">
        <h2 className="headline-md mb-4 text-on-surface">Participations</h2>
        <div className="card-elevated overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-low text-left">
                <tr>
                  <Th>Projet</Th>
                  <Th>Unités</Th>
                  <Th>Prix moyen</Th>
                  <Th>Valeur actuelle</Th>
                  <Th>+/-</Th>
                  <Th>Acquisition</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50">
                {holdings.map((h) => {
                  const p = getProject(h.projectId);
                  const invest = h.unites * h.prixMoyen;
                  const variation = ((h.valeurActuelle - invest) / invest) * 100;
                  return (
                    <tr key={h.projectId} className="hover:bg-surface-low">
                      <Td>
                        <p className="font-semibold text-on-surface">{p?.nom}</p>
                        <p className="text-xs text-on-surface-variant">{p?.ville}</p>
                      </Td>
                      <Td>{h.unites}</Td>
                      <Td>{formatMAD(h.prixMoyen)}</Td>
                      <Td className="font-semibold">{formatMAD(h.valeurActuelle)}</Td>
                      <Td>
                        <span className={variation >= 0 ? "text-success" : "text-error"}>
                          {variation >= 0 ? "+" : ""}
                          {variation.toFixed(2)} %
                        </span>
                      </Td>
                      <Td>{formatDate(h.dateAcquisition)}</Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Historique transactions */}
        <section>
          <h2 className="headline-md mb-4 text-on-surface">Historique des transactions</h2>
          <div className="card-elevated overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-surface-low text-left">
                  <tr>
                    <Th>Date</Th>
                    <Th>Type</Th>
                    <Th>Référence</Th>
                    <Th>Montant</Th>
                    <Th>Statut</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50">
                  {transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-surface-low">
                      <Td>{formatDate(t.date)}</Td>
                      <Td>
                        <p className="font-semibold text-on-surface">{t.type}</p>
                        {t.projet && (
                          <p className="text-xs text-on-surface-variant">{t.projet}</p>
                        )}
                      </Td>
                      <Td>
                        <span className="font-mono text-xs">{t.reference}</span>
                      </Td>
                      <Td className={`font-semibold ${t.montant >= 0 ? "text-success" : "text-on-surface"}`}>
                        {t.montant >= 0 ? "+" : ""}
                        {formatMAD(t.montant)}
                      </Td>
                      <Td>
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                            t.statut === "Confirmé"
                              ? "bg-success/10 text-success"
                              : t.statut === "En attente"
                              ? "bg-warning/10 text-warning"
                              : "bg-error/10 text-error"
                          }`}
                        >
                          {t.statut}
                        </span>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Coffre-fort */}
        <section>
          <h2 className="headline-md mb-4 text-on-surface">Coffre-fort documentaire</h2>
          <div className="card-elevated divide-y divide-outline-variant/50">
            {documents.map((doc) => (
              <div key={doc.nom} className="flex items-center gap-3 p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-container/20 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-on-surface">{doc.nom}</p>
                  <p className="text-xs text-on-surface-variant">
                    {doc.type} · {formatDate(doc.date)}
                  </p>
                </div>
                <button aria-label="Télécharger" className="grid h-9 w-9 place-items-center rounded-md text-primary hover:bg-surface-container">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
      {children}
    </th>
  );
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}
