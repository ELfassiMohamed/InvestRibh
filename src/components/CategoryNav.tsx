import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

type NavItem = { label: string; to: string; hasMenu?: boolean };

const items: NavItem[] = [
  { label: "Page principale", to: "/" },
  { label: "Biens", to: "/investisseur/projets" },
  { label: "Investissements collectifs", to: "/investisseur/projets", hasMenu: true },
  { label: "Investissement solidaire", to: "/investisseur/projets" },
  { label: "Annuaire des professionnels", to: "/" },
  { label: "Pratique", to: "/" },
  { label: "Espace communautaire", to: "/" },
  { label: "Marketplace", to: "/" },
];

export function CategoryNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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
                active
                  ? "text-primary"
                  : "text-on-surface hover:text-primary"
              }`}
            >
              {item.label}
              {item.hasMenu && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              {active && (
                <span className="absolute inset-x-4 -bottom-px h-0.5 bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
