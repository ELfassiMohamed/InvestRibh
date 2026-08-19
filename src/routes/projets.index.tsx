import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Filter, ShieldCheck, ArrowRight } from "lucide-react";

import { FilterSelect } from "@/components/FilterSelect";
import { ProjectCard } from "@/components/ProjectCard";
import { ModeTabs } from "@/components/ModeTabs";
import { Navbar1 } from "@/components/ui/navbar-1";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { useProjects } from "@/hooks/use-queries";
import { getModeMetaBySlug, projectHasMode } from "@/lib/modes";
import type { Project } from "@/lib/mock-data";

export const Route = createFileRoute("/projets/")({
  validateSearch: (search: Record<string, unknown>) => {
    const result: { mode?: string; q?: string } = {};
    if (typeof search.mode === "string") result.mode = search.mode;
    if (typeof search.q === "string") result.q = search.q;
    return result;
  },
  component: PublicProjetsPage,
});

const statutValues = ["Tous", "En collecte", "Financé", "En construction", "Livré"];

function PublicProjetsPage() {
  const { t } = useTranslation();
  const navigate = Route.useNavigate();
  const { mode, q } = Route.useSearch();

  const { data: projects = [], isLoading } = useProjects();
  const [ville, setVille] = useState("Toutes");
  const [typologie, setTypologie] = useState("Toutes");
  const [statut, setStatut] = useState<string>(() => t("projets.tous"));
  const [ticketMax, setTicketMax] = useState(50_000);
  const [rendementMin, setRendementMin] = useState(0);

  const statuts = statutValues.map((s) => (s === "Tous" ? t("projets.tous") : t(`statuses.${s}`)));

  const modeLabel = mode ? getModeMetaBySlug(mode)?.mode : undefined;

  const villes = ["Toutes", ...Array.from(new Set(projects.map((p: Project) => p.ville)))];
  const typologies = ["Toutes", ...Array.from(new Set(projects.map((p: Project) => p.typologie)))];

  const filtered = useMemo(
    () =>
      projects.filter(
        (p: Project) =>
          (modeLabel === undefined || projectHasMode(p, modeLabel)) &&
          (q === undefined ||
            q.trim() === "" ||
            p.nom.toLowerCase().includes(q.toLowerCase()) ||
            p.ville.toLowerCase().includes(q.toLowerCase()) ||
            (p.description ?? "").toLowerCase().includes(q.toLowerCase())) &&
          (ville === "Toutes" || p.ville === ville) &&
          (typologie === "Toutes" || p.typologie === typologie) &&
          (statut === t("projets.tous") || p.statut === statut) &&
          p.ticketMinimum <= ticketMax &&
          p.rendementCible >= rendementMin,
      ),
    [modeLabel, q, ville, typologie, statut, ticketMax, rendementMin, projects, t],
  );

  const setMode = (slug?: string) =>
    void navigate({ search: (prev) => ({ ...prev, mode: slug, q: prev.q }) });

  return (
    <div className="min-h-screen bg-surface">
      {/* Navbar */}
      <Navbar1 />

      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8">
        <div className="mb-8">
          <h1 className="headline-lg text-on-surface">{t("projets.title")}</h1>
          <p className="mt-1.5 text-on-surface-variant">
            {isLoading ? t("common.loading") : t("projets.count", { count: filtered.length })}
          </p>
        </div>

        <div className="mb-8">
          <p className="label-sm text-on-surface-variant">{t("projets.modeFilter")}</p>
          <div className="mt-2">
            <ModeTabs value={mode} onChange={setMode} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Filtres */}
          <aside className="card-elevated h-fit p-5">
            <div className="mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <p className="label-sm text-on-surface">{t("projets.filter")}</p>
            </div>
            <FilterSelect
              label={t("projets.ville")}
              value={ville}
              options={villes}
              onChange={setVille}
            />
            <FilterSelect
              label={t("projets.typologie")}
              value={typologie}
              options={typologies}
              onChange={setTypologie}
            />
            <FilterSelect
              label={t("projets.statut")}
              value={statut}
              options={statuts}
              onChange={setStatut}
            />
            <div className="mt-5">
              <label className="label-sm text-on-surface-variant">
                {t("common.ticketMax", { value: ticketMax.toLocaleString("fr-FR") })}
              </label>
              <input
                type="range"
                min={5_000}
                max={50_000}
                step={5_000}
                value={ticketMax}
                onChange={(e) => setTicketMax(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>
            <div className="mt-5">
              <label className="label-sm text-on-surface-variant">
                {t("common.rendementMin", { value: rendementMin.toFixed(1) })}
              </label>
              <input
                type="range"
                min={0}
                max={15}
                step={0.5}
                value={rendementMin}
                onChange={(e) => setRendementMin(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>
            <button
              onClick={() => {
                setVille("Toutes");
                setTypologie("Toutes");
                setStatut(t("projets.tous"));
                setTicketMax(50_000);
                setRendementMin(0);
              }}
              className="mt-6 w-full rounded-md border border-outline-variant px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-container"
            >
              {t("common.reset")}
            </button>
          </aside>

          <div>
            {filtered.length === 0 ? (
              <div className="card-elevated p-12 text-center text-on-surface-variant">
                {t("common.noResults")}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8">
        <Link
          to="/assurance"
          className="card-elevated group flex flex-col items-start gap-4 bg-surface-lowest p-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-on-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="headline-md text-on-surface">{t("assurance.ctaTitle")}</h2>
              <p className="mt-1 text-sm text-on-surface-variant">{t("assurance.ctaDesc")}</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors group-hover:bg-primary-container">
            {t("assurance.ctaAction")}
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>

      {/* Footer */}
      <CinematicFooter />
    </div>
  );
}
