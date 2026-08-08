import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft, User } from "lucide-react";

import logoImage from "@/assets/place2invest_logo.png";
import { ModeCard } from "@/components/ModeCard";
import { ExploitationAssurance } from "@/components/ExploitationAssurance";
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
              count={countByMode(m.mode)}
            />
          ))}
        </div>

        <ExploitationAssurance />
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
