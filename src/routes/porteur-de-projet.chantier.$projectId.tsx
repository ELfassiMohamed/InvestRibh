import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Calendar, Image as ImageIcon } from "lucide-react";

import { PageHeader } from "@/components/AppShell";
import { useCreateSiteUpdate, useProject, useSiteData } from "@/hooks/use-queries";
import { formatDateLong } from "@/lib/format";

export const Route = createFileRoute("/porteur-de-projet/chantier/$projectId")({
  component: ChantierPage,
});

function ChantierPage() {
  const { t } = useTranslation();
  const { projectId } = Route.useParams();
  const { data: project, isLoading: projectLoading, isError } = useProject(projectId);
  const { data: siteData, isLoading: siteLoading } = useSiteData(projectId);
  const createUpdate = useCreateSiteUpdate();
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  const sitePhases = siteData?.phases ?? [];
  const updates = siteData?.updates ?? [];

  if (projectLoading || siteLoading) {
    return (
      <>
        <PageHeader title={t("investor.loading")} description={t("investor.loadingSub")} />
        <p className="text-sm text-on-surface-variant">{t("porteur.chantierPage.title")}...</p>
      </>
    );
  }

  if (isError || !project) {
    throw notFound();
  }

  const avancementGlobal = Math.round(
    sitePhases.length
      ? sitePhases.reduce((s, p) => s + p.avancement, 0) / sitePhases.length
      : 0,
  );

  const handlePublish = async () => {
    if (!newTitle.trim() || !newDesc.trim()) return;
    const image = newImage ? await readFileAsDataUrl(newImage) : undefined;
    createUpdate.mutate({
      projectId,
      titre: newTitle.trim(),
      description: newDesc.trim(),
      image,
    });
    setNewTitle("");
    setNewDesc("");
    setNewImage(null);
    setShowForm(false);
  };

  return (
    <>
      <PageHeader
        title={`${t("porteur.chantierPage.title")} — ${project.nom}`}
        description={t("porteur.chantierPage.description")}
        actions={
          <button
            onClick={() => { setShowForm(!showForm); setNewTitle(""); setNewDesc(""); setNewImage(null); }}
            className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-container"
          >
            <Plus className="h-4 w-4" /> {t("porteur.chantierPage.nouvellePublication")}
          </button>
        }
      />

      <div className="card-elevated mb-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="label-sm text-on-surface-variant">{t("porteur.chantierPage.avancement")}</p>
            <p className="mt-1 text-3xl font-bold text-primary">{avancementGlobal} %</p>
          </div>
          <p className="text-sm text-on-surface-variant">
            {t("porteur.chantierPage.livraisonPrevue")} : <span className="font-semibold text-on-surface">30 juin 2027</span>
          </p>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-surface-container">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${avancementGlobal}%` }} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Timeline phases */}
        <div className="card-elevated p-6">
          <h3 className="headline-md text-on-surface">{t("porteur.chantierPage.phasesConstruction")}</h3>
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
                      {t("porteur.chantierPage.du")} {formatDateLong(p.dateDebut)} {t("porteur.chantierPage.au")} {formatDateLong(p.dateFinPrevue)}
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
              <h3 className="headline-md mb-3 text-on-surface">{t("porteur.chantierPage.nouvellePublication")}</h3>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={t("porteur.chantierPage.titreMiseAJour")}
                className="mb-3 w-full rounded-md border border-outline-variant px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              <textarea
                rows={3}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder={t("porteur.chantierPage.decrivez")}
                className="mb-3 w-full rounded-md border border-outline-variant px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              <label className="mb-3 flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-outline-variant py-6 text-sm text-on-surface-variant hover:bg-surface-low">
                <ImageIcon className="h-5 w-5" />
                {newImage ? newImage.name : t("porteur.chantierPage.ajouterMedia")}
                <input type="file" className="hidden" accept="image/*,video/*" onChange={(e) => setNewImage(e.target.files?.[0] ?? null)} />
              </label>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-md border border-outline-variant px-4 py-2 text-sm font-medium hover:bg-surface-container"
                >
                  {t("porteur.chantierPage.annuler")}
                </button>
                <button
                  onClick={handlePublish}
                  disabled={!newTitle.trim() || !newDesc.trim() || createUpdate.isPending}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-container disabled:opacity-50"
                >
                  {createUpdate.isPending ? t("porteur.chantierPage.publicationEnCours") : t("porteur.chantierPage.envoyer")}
                </button>
              </div>
            </div>
          )}

          <h3 className="headline-md mb-4 text-on-surface">{t("porteur.chantierPage.historiquePublications")}</h3>
          <div className="space-y-4">
            {updates.map((u) => (
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

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
