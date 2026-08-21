import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { TrendingUp, Building2, ShieldCheck } from "lucide-react";
import type { UserRole } from "@/lib/mock-data";
import { Navbar1 } from "@/components/ui/navbar-1";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("place2invest_user");
    if (!stored) return;
    try {
      const user = JSON.parse(stored);
      const map: Record<string, string> = {
        Investisseur: "/investisseur",
        "Porteur de Projet": "/porteur-de-projet",
        "Agent Conformité": "/admin/validation-ia",
        "Super Admin": "/admin/validation-ia",
      };
      const to = map[user.role];
      if (to) throw redirect({ to });
    } catch {
      // ignore
    }
  },
  component: LoginPage,
});

interface Espace {
  role: UserRole;
  section: "investisseur" | "porteur" | "conformite";
  icon: typeof TrendingUp;
  redirect: string;
}

const espaces: Espace[] = [
  {
    role: "Investisseur",
    section: "investisseur",
    icon: TrendingUp,
    redirect: "/investisseur",
  },
  {
    role: "Porteur de Projet",
    section: "porteur",
    icon: Building2,
    redirect: "/porteur-de-projet",
  },
  {
    role: "Agent Conformité",
    section: "conformite",
    icon: ShieldCheck,
    redirect: "/admin/validation-ia",
  },
];

function LoginPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-surface">
      {/* Navbar */}
      <Navbar1 />

      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-10">
        <div className="mb-12 text-center">
          <p className="label-sm text-primary">{t("login.connexion")}</p>
          <h1 className="headline-lg mt-2 text-on-surface">{t("login.choisissez")}</h1>
          <p className="mt-3 text-on-surface-variant">{t("login.description")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {espaces.map(({ role, section, icon: Icon, redirect }) => {
            const label = t(`login.espaces.${section}.label`);
            const titre = t(`login.espaces.${section}.titre`);
            const description = t(`login.espaces.${section}.description`);
            return (
              <Link
                key={role}
                to="/auth"
                search={{ role, redirect }}
                className="card-elevated group flex flex-col items-start gap-4 p-6 text-left transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-on-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="label-sm text-on-surface-variant">{label}</p>
                  <h3 className="headline-md mt-1.5 text-on-surface">{titre}</h3>
                  <p className="mt-2 text-sm text-on-surface-variant">{description}</p>
                </div>
                <span className="mt-auto text-sm font-semibold text-primary group-hover:underline">
                  {t("login.seConnecter")}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
