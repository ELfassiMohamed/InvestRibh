import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ModeCardProps {
  slug: string;
  labelKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  count: number;
}

export function ModeCard({ slug, labelKey, descriptionKey, icon: Icon, count }: ModeCardProps) {
  const { t } = useTranslation();
  return (
    <Link
      to="/projets"
      search={{ mode: slug }}
      className="card-elevated group flex flex-col overflow-hidden bg-surface-lowest transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="flex items-center justify-between p-5 pb-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-on-primary">
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full bg-surface-container px-2.5 py-1 text-[11px] font-semibold text-on-surface-variant">
          {t("projectsIndex.count", { count })}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-5 pb-5">
        <h2 className="headline-md text-on-surface">{t(labelKey)}</h2>
        <p className="text-sm text-on-surface-variant">{t(descriptionKey)}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary">
          {t("modes.voirProjets")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
