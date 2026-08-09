import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ModeCardProps {
  slug: string;
  labelKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  image: string;
  count: number;
}

export function ModeCard({
  slug,
  labelKey,
  descriptionKey,
  icon: Icon,
  image,
  count,
}: ModeCardProps) {
  const { t } = useTranslation();
  return (
    <Link
      to="/projets"
      search={{ mode: slug }}
      className="card-elevated group flex flex-col overflow-hidden bg-surface-lowest transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={image}
          alt={t(labelKey)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-xl bg-primary/90 text-on-primary backdrop-blur">
          <Icon className="h-5 w-5" />
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          {t("projectsIndex.count", { count })}
        </span>
        <h2 className="absolute bottom-3 left-4 right-4 headline-md text-white drop-shadow">
          {t(labelKey)}
        </h2>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-sm text-on-surface-variant">{t(descriptionKey)}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary">
          {t("modes.voirProjets")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
