import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Plus, ChevronRight, FileText, Building, Coins } from "lucide-react";

import { PageHeader } from "@/components/AppShell";
import { KpiCard } from "@/components/KpiCard";
import { formatDate, formatMAD } from "@/lib/format";
import { useAuth } from "@/hooks/use-auth";
import { useProjects, useSubmissionDrafts } from "@/hooks/use-queries";

export const Route = createFileRoute("/porteur-de-projet/")({
  component: PorteurHomePage,
});

function PorteurHomePage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: projects = [] } = useProjects();
  const { data: submissionDrafts = [] } = useSubmissionDrafts();
  const mesProjets = projects.slice(0, 2);
  const totalLeve = mesProjets.reduce((s, p) => s + p.montantCollecte, 0);

  return (
    <>
      <PageHeader
        title={t("porteur.bonjour", { name: user?.nom?.split(" ")[0] ?? "Atlas Promotion" })}
        description={t("porteur.helloDesc")}
        actions={
          <Link
            to="/porteur-de-projet/soumission"
            className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-container"
          >
            <Plus className="h-4 w-4" /> {t("porteur.submitProject")}
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label={t("porteur.kpi.projetsActifs")} value={String(mesProjets.length)} icon={<Building className="h-5 w-5" />} />
        <KpiCard label={t("porteur.kpi.capitalLeve")} value={formatMAD(totalLeve)} hint={t("porteur.kpi.toutesOperations")} icon={<Coins className="h-5 w-5" />} />
        <KpiCard label={t("porteur.kpi.dossiers")} value={String(submissionDrafts.length)} hint={t("porteur.kpi.soumissions")} icon={<FileText className="h-5 w-5" />} />
      </div>

      <section className="mt-8">
        <h2 className="headline-md mb-4 text-on-surface">{t("porteur.mesProjets")}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {mesProjets.map((p) => (
            <div key={p.id} className="card-elevated overflow-hidden">
              <img src={p.image} alt={p.nom} className="aspect-[16/9] w-full object-cover" />
              <div className="p-5">
                <p className="text-xs text-on-surface-variant">{p.ville} · {p.typologie}</p>
                <h3 className="headline-md mt-1 text-on-surface">{p.nom}</h3>
                <div className="mt-3 flex gap-2">
                  <Link
                    to="/porteur-de-projet/collecte/$projectId"
                    params={{ projectId: p.id }}
                    className="flex-1 rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-on-primary hover:bg-primary-container"
                  >
                    {t("porteur.collecte")}
                  </Link>
                  <Link
                    to="/porteur-de-projet/chantier/$projectId"
                    params={{ projectId: p.id }}
                    className="flex-1 rounded-md border border-outline-variant px-3 py-2 text-center text-sm font-semibold text-on-surface hover:bg-surface-container"
                  >
                    {t("porteur.chantier")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="headline-md mb-4 text-on-surface">{t("porteur.mesSoumissions")}</h2>
        <div className="card-elevated overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface-low text-left">
              <tr>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant">{t("porteur.table.projet")}</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant">{t("porteur.table.statut")}</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant">{t("porteur.table.avancement")}</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant">{t("porteur.table.misAJour")}</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {submissionDrafts.map((s) => (
                <tr key={s.id} className="hover:bg-surface-low">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-on-surface">{s.nom}</p>
                    <p className="text-xs text-on-surface-variant">{s.ville} · {formatMAD(s.budget)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      s.statut === "Approuvé" ? "bg-success/10 text-success"
                      : s.statut === "Rejeté" ? "bg-error/10 text-error"
                      : s.statut === "En analyse IA" ? "bg-warning/10 text-warning"
                      : "bg-secondary-container text-on-secondary-container"
                    }`}>
                      {s.statut === "Approuvé" ? t("statuses.Approuvé") : s.statut === "Rejeté" ? t("statuses.Rejeté") : s.statut === "En analyse IA" ? t("statuses.En analyse IA") : s.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface-container">
                        <div className="h-full bg-primary" style={{ width: `${s.avancement}%` }} />
                      </div>
                      <span className="text-xs">{s.avancement}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">{formatDate(s.dateMaj)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link to="/porteur-de-projet/soumission" className="inline-flex items-center text-primary hover:underline">
                      {t("porteur.table.ouvrir")} <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
