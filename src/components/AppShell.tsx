import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, LogOut } from "lucide-react";
import type { ReactNode } from "react";

interface NavItem {
  label: string;
  to: string;
}

interface Props {
  zone: "Investisseur" | "Porteur de Projet" | "Conformité";
  user: { nom: string; role: string };
  nav: NavItem[];
  children: ReactNode;
}

const zoneTone = {
  Investisseur: "bg-primary text-on-primary",
  "Porteur de Projet": "bg-secondary text-on-secondary",
  Conformité: "bg-tertiary text-on-tertiary",
};

export function AppShell({ zone, user, nav, children }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const initials = user.nom
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-30 border-b border-outline-variant bg-surface-lowest/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-3 sm:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className={`grid h-9 w-9 place-items-center rounded-lg ${zoneTone[zone]} text-sm font-bold`}>
              P2
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-on-surface">Place2Invest</p>
              <p className="text-xs text-on-surface-variant">Espace {zone}</p>
            </div>
          </Link>

          <nav className="ml-6 hidden flex-1 items-center gap-1 overflow-x-auto lg:flex">
            {nav.map((item) => {
              const active = pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary-container/15 text-primary"
                      : "text-on-surface hover:bg-surface-container"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/"
              className="hidden items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface sm:flex"
            >
              <ArrowLeft className="h-4 w-4" />
              Site public
            </Link>
            <div className="flex items-center gap-2.5 rounded-full bg-surface-container px-2 py-1.5">
              <div className={`grid h-7 w-7 place-items-center rounded-full ${zoneTone[zone]} text-xs font-bold`}>
                {initials}
              </div>
              <div className="hidden text-xs sm:block">
                <p className="font-semibold text-on-surface">{user.nom}</p>
                <p className="text-on-surface-variant">{user.role}</p>
              </div>
            </div>
            <button aria-label="Déconnexion" className="grid h-9 w-9 place-items-center rounded-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* nav mobile */}
        <div className="border-t border-outline-variant/50 lg:hidden">
          <div className="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-4 py-2">
            {nav.map((item) => {
              const active = pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium ${
                    active ? "bg-primary text-on-primary" : "text-on-surface-variant"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8">{children}</main>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="headline-lg text-on-surface">{title}</h1>
        {description && <p className="mt-1.5 text-on-surface-variant">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
