import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Filter, ArrowLeft, ArrowRight, User } from "lucide-react";

import { FilterSelect } from "@/components/FilterSelect";
import { ProjectCard } from "@/components/ProjectCard";
import logoImage from "@/assets/place2invest_logo.png";
import { useProjects } from "@/hooks/use-queries";
import { sectionOrder, type Project, type ProjectCategorie } from "@/lib/mock-data";

export const Route = createFileRoute("/projets/")({
  component: PublicProjetsPage,
});

const statutValues = ["Tous", "En collecte", "Financé", "En construction", "Livré"];

function PublicProjetsPage() {
  const { t } = useTranslation();
  const { data: projects = [], isLoading } = useProjects();
  const [ville, setVille] = useState("Toutes");
  const [typologie, setTypologie] = useState("Toutes");
  const [statut, setStatut] = useState<string>(() => t("projets.tous"));
  const [ticketMax, setTicketMax] = useState(50_000);
  const [rendementMin, setRendementMin] = useState(0);

  const statuts = statutValues.map((s) => (s === "Tous" ? t("projets.tous") : t(`statuses.${s}`)));

  const villes = ["Toutes", ...Array.from(new Set(projects.map((p: Project) => p.ville)))];
  const typologies = ["Toutes", ...Array.from(new Set(projects.map((p: Project) => p.typologie)))];

  const filtered = useMemo(
    () =>
      projects.filter(
        (p: Project) =>
          (ville === "Toutes" || p.ville === ville) &&
          (typologie === "Toutes" || p.typologie === typologie) &&
          (statut === t("projets.tous") || p.statut === statut) &&
          p.ticketMinimum <= ticketMax &&
          p.rendementCible >= rendementMin,
      ),
    [ville, typologie, statut, ticketMax, rendementMin, projects, t],
  );

  const grouped = useMemo(() => {
    const sections = new Map<ProjectCategorie, Project[]>();
    for (const p of filtered) {
      const cat = (p.categorie as ProjectCategorie) ?? "Immobilier";
      if (!sections.has(cat)) sections.set(cat, []);
      sections.get(cat)!.push(p);
    }
    return sectionOrder
      .filter((cat) => sections.has(cat))
      .map((cat) => ({ categorie: cat, items: sections.get(cat)!.slice(0, 6) }));
  }, [filtered]);

  return (
    <div className="min-h-screen bg-surface">
      {/* Top bar */}
      <div className="border-b border-outline-variant bg-surface-lowest">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="Place2Invest" className="h-9 rounded-lg object-contain" />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface sm:flex"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("common.home")}
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container"
            >
              <User className="h-4 w-4" />
              {t("common.login")}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8">
        <div className="mb-8">
          <h1 className="headline-lg text-on-surface">{t("projets.title")}</h1>
          <p className="mt-1.5 text-on-surface-variant">
            {isLoading ? t("common.loading") : t("projets.count", { count: filtered.length })}
          </p>
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
            />{" "}
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

          <div className="space-y-12">
            {filtered.length === 0 ? (
              <div className="card-elevated p-12 text-center text-on-surface-variant">
                {t("common.noResults")}
              </div>
            ) : (
              grouped.map(({ categorie, items }) => (
                <section key={categorie}>
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <div>
                      <h2 className="headline-md text-on-surface">{categorie}</h2>
                      <p className="mt-1 text-sm text-on-surface-variant">
                        {t("projets.sectionCount", { count: items.length })}
                      </p>
                    </div>
                    <Link
                      to="/projects/$categorie"
                      params={{ categorie: "immobilier" }}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
                    >
                      {t("common.voirTout")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((p) => (
                      <ProjectCard key={p.id} project={p} />
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 bg-inverse-surface text-inverse-on-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-8 text-center text-xs opacity-60 sm:px-10">
          © {new Date().getFullYear()} Place2Invest. {t("common.footer")}
        </div>
      </footer>
    </div>
  );
}
