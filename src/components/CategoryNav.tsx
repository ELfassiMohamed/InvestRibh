import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

type NavItem = { label: string; to: string; hasMenu?: boolean };

export function CategoryNav() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const items: NavItem[] = [
    { label: t("categoryNav.pagePrincipale"), to: "/" },
    { label: t("categoryNav.biens"), to: "/projets" },
    {
      label: t("categoryNav.investissementsCollectifs"),
      to: "/projets",
      hasMenu: true,
    },
    { label: t("categoryNav.investissementSolidaire"), to: "/projets" },
    { label: t("categoryNav.annuaire"), to: "/" },
    { label: t("categoryNav.pratique"), to: "/" },
    { label: t("categoryNav.espaceCommunautaire"), to: "/" },
    { label: t("categoryNav.marketplace"), to: "/" },
  ];

  return (
    <nav className="border-b border-outline-variant bg-surface-lowest">
      <div className="mx-auto flex max-w-[1280px] items-center gap-1 overflow-x-auto px-4 sm:px-10">
        {items.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`group relative flex shrink-0 items-center gap-1 px-4 py-4 text-sm font-medium transition-colors ${
                active ? "text-primary" : "text-on-surface hover:text-primary"
              }`}
            >
              {item.label}
              {item.hasMenu && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              {active && <span className="absolute inset-x-4 -bottom-px h-0.5 bg-primary" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
