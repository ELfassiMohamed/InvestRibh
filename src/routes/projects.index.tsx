import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ShieldCheck, ArrowRight } from "lucide-react";

import { Navbar1 } from "@/components/ui/navbar-1";
import { ModeCard } from "@/components/ModeCard";
import { useProjects } from "@/hooks/use-queries";
import { modeMeta, projectHasMode } from "@/lib/modes";
import type { Project } from "@/lib/mock-data";

export const Route = createFileRoute("/projects/")({
  component: ProjectsModesPage,
});

function ProjectsModesPage() {
  const { t } = useTranslation();
  const { data: projects = [] } = useProjects();

  const countByMode = (mode: Project["modes"][number]) =>
    projects.filter((p: Project) => projectHasMode(p, mode)).length;

  return (
    <div className="min-h-screen bg-surface">
      {/* Navbar */}
      <Navbar1 />

      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="label-sm text-primary">{t("modes.sectionLabel")}</p>
          <h1 className="headline-lg text-on-surface">{t("modes.title")}</h1>
          <p className="mt-1.5 text-on-surface-variant">{t("modes.subtitle")}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modeMeta.map((m) => (
            <ModeCard
              key={m.slug}
              slug={m.slug}
              labelKey={m.labelKey}
              descriptionKey={m.descriptionKey}
              icon={m.icon}
              image={m.image}
              count={countByMode(m.mode)}
            />
          ))}
        </div>

        <Link
          to="/assurance"
          className="card-elevated group mt-14 flex flex-col items-start gap-4 bg-surface-lowest p-8 sm:flex-row sm:items-center sm:justify-between"
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
      <footer className="mt-20 bg-inverse-surface text-inverse-on-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-8 text-center text-xs opacity-60 sm:px-10">
          © {new Date().getFullYear()} Place2Invest. {t("common.footer")}
        </div>
      </footer>
    </div>
  );
}
