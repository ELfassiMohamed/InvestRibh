import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Calendar, Image as ImageIcon } from "lucide-react";

import { PageHeader } from "@/components/AppShell";
import { getProject, sitePhases, siteUpdates } from "@/lib/mock-data";
import type { Project } from "@/lib/mock-data";
import { formatDateLong } from "@/lib/format";

export const Route = createFileRoute("/porteur-de-projet/chantier/$projectId")({
  loader: ({ params }): { project: Project } => {
    const project = getProject(params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  component: ChantierPage,
});

function ChantierPage() {
  const { project } = Route.useLoaderData() as { project: Project };
  const [showForm, setShowForm] = useState(false);

  const avancementGlobal = Math.round(
    sitePhases.reduce((s, p) => s + p.avancement, 0) / sitePhases.length,
  );

  return (
    <>
      <PageHeader
        title={`Suivi de chantier — ${project.nom}`}
        description="Mettez à jour l'avancement et publiez des actualités visibles par vos investisseurs."
        actions={
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-container"
          >
            <Plus className="h-4 w-4" /> Nouvelle publication
          </button>
        }
      />

      <div className="card-elevated mb-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="label-sm text-on-surface-variant">Avancement global</p>
            <p className="mt-1 text-3xl font-bold text-primary">{avancementGlobal} %</p>
          </div>
          <p className="text-sm text-on-surface-variant">
            Livraison prévue : <span className="font-semibold text-on-surface">30 juin 2027</span>
          </p>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-surface-container">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${avancementGlobal}%` }} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Timeline phases */}
        <div className="card-elevated p-6">
          <h3 className="headline-md text-on-surface">Phases de construction</h3>
          <ol className="mt-5 space-y-5">
            {sitePhases.map((p, i) => (
              <li key={p.nom} className="relative pl-8">
                <div
                  className={`absolute left-0 top-0 grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                    p.statut === "Terminée"
                      ? "bg-success text-on-success"
                      : p.statut === "En cours"
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  {i + 1}
                </div>
                {i < sitePhases.length - 1 && (
                  <div className="absolute left-3 top-6 h-full w-0.5 -translate-x-1/2 bg-outline-variant" />
                )}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-on-surface">{p.nom}</p>
                    <p className="text-xs text-on-surface-variant">
                      Du {formatDateLong(p.dateDebut)} au {formatDateLong(p.dateFinPrevue)}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-primary">{p.avancement}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-container">
                  <div
                    className={`h-full rounded-full ${
                      p.statut === "Terminée" ? "bg-success" : "bg-primary"
                    }`}
                    style={{ width: `${p.avancement}%` }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Publications */}
        <div>
          {showForm && (
            <div className="card-elevated mb-4 p-5">
              <h3 className="headline-md mb-3 text-on-surface">Nouvelle publication</h3>
              <input
                type="text"
                placeholder="Titre de la mise à jour"
                className="mb-3 w-full rounded-md border border-outline-variant px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              <textarea
                rows={3}
                placeholder="Décrivez l'avancement, les points marquants…"
                className="mb-3 w-full rounded-md border border-outline-variant px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              <label className="mb-3 flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-outline-variant py-6 text-sm text-on-surface-variant hover:bg-surface-low">
                <ImageIcon className="h-5 w-5" />
                Ajouter une photo ou vidéo
                <input type="file" className="hidden" />
              </label>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-md border border-outline-variant px-4 py-2 text-sm font-medium hover:bg-surface-container"
                >
                  Annuler
                </button>
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-container">
                  Publier
                </button>
              </div>
            </div>
          )}

          <h3 className="headline-md mb-4 text-on-surface">Historique des publications</h3>
          <div className="space-y-4">
            {siteUpdates.map((u) => (
              <article key={u.id} className="card-elevated overflow-hidden">
                <img src={u.image} alt={u.titre} className="aspect-[16/8] w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDateLong(u.date)}
                  </div>
                  <h4 className="headline-md mt-1.5 text-on-surface">{u.titre}</h4>
                  <p className="mt-2 text-sm text-on-surface-variant">{u.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
