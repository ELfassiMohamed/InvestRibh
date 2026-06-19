import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, ChevronRight, FileText, Building, Coins } from "lucide-react";

import { PageHeader } from "@/components/AppShell";
import { KpiCard } from "@/components/KpiCard";
import { submissionDrafts, projects } from "@/lib/mock-data";
import { formatDate, formatMAD } from "@/lib/format";

export const Route = createFileRoute("/porteur-de-projet/")({
  component: PorteurHomePage,
});

const mesProjets = projects.slice(0, 2);

function PorteurHomePage() {
  const totalLeve = mesProjets.reduce((s, p) => s + p.montantCollecte, 0);

  return (
    <>
      <PageHeader
        title="Bonjour Atlas Promotion 👋"
        description="Vue consolidée de vos opérations en cours sur la plateforme."
        actions={
          <Link
            to="/porteur-de-projet/soumission"
            className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-container"
          >
            <Plus className="h-4 w-4" /> Soumettre un projet
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Projets actifs" value={String(mesProjets.length)} icon={<Building className="h-5 w-5" />} />
        <KpiCard label="Capital levé" value={formatMAD(totalLeve)} hint="Toutes opérations" icon={<Coins className="h-5 w-5" />} />
        <KpiCard label="Dossiers en cours" value={String(submissionDrafts.length)} hint="Soumissions / brouillons" icon={<FileText className="h-5 w-5" />} />
      </div>

      <section className="mt-8">
        <h2 className="headline-md mb-4 text-on-surface">Mes projets en collecte / chantier</h2>
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
                    Collecte
                  </Link>
                  <Link
                    to="/porteur-de-projet/chantier/$projectId"
                    params={{ projectId: p.id }}
                    className="flex-1 rounded-md border border-outline-variant px-3 py-2 text-center text-sm font-semibold text-on-surface hover:bg-surface-container"
                  >
                    Chantier
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="headline-md mb-4 text-on-surface">Mes soumissions</h2>
        <div className="card-elevated overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface-low text-left">
              <tr>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Projet</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Statut</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Avancement</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Mis à jour</th>
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
                      {s.statut}
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
                      Ouvrir <ChevronRight className="h-4 w-4" />
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
