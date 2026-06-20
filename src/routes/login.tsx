import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { TrendingUp, Building2, ShieldCheck } from "lucide-react";
import type { UserRole } from "@/lib/mock-data";

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
  label: string;
  titre: string;
  description: string;
  icon: typeof TrendingUp;
  redirect: string;
}

const espaces: Espace[] = [
  {
    role: "Investisseur",
    label: "Espace Investisseur",
    titre: "Diversifiez votre patrimoine",
    description:
      "Tableau de bord, portefeuille, simulateur de ROI fiscal marocain.",
    icon: TrendingUp,
    redirect: "/investisseur",
  },
  {
    role: "Porteur de Projet",
    label: "Espace Porteur de Projet",
    titre: "Levez les fonds de votre opération",
    description:
      "Soumission de dossier guidée, suivi de collecte et de chantier.",
    icon: Building2,
    redirect: "/porteur-de-projet",
  },
  {
    role: "Agent Conformité",
    label: "Espace Conformité",
    titre: "Supervision et conformité AMMC",
    description:
      "Validation IA, eKYC Bank Al-Maghrib, journal d'audit.",
    icon: ShieldCheck,
    redirect: "/admin/validation-ia",
  },
];

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface">
      {/* Top bar */}
      <div className="border-b border-outline-variant bg-surface-lowest">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-10">
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-sm font-bold text-on-primary">
              EE
            </div>
            <span className="text-lg font-bold text-on-surface">
              Place<span className="text-primary">2</span>invest
            </span>
          </Link>
          <Link
            to="/projets"
            className="text-sm font-medium text-on-surface-variant hover:text-on-surface"
          >
            Découvrir les projets
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-10">
        <div className="mb-12 text-center">
          <p className="label-sm text-primary">Connexion</p>
          <h1 className="headline-lg mt-2 text-on-surface">
            Choisissez votre espace
          </h1>
          <p className="mt-3 text-on-surface-variant">
            Sélectionnez le rôle qui correspond à votre activité sur la
            plateforme. Les comptes de démonstration sont préremplis.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {espaces.map(({ role, label, titre, description, icon: Icon, redirect }) => (
            <button
              key={role}
              onClick={() => {
                login(role);
                navigate({ to: redirect });
              }}
              className="card-elevated group flex flex-col items-start gap-4 p-6 text-left transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-on-primary">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="label-sm text-on-surface-variant">{label}</p>
                <h3 className="headline-md mt-1.5 text-on-surface">{titre}</h3>
                <p className="mt-2 text-sm text-on-surface-variant">
                  {description}
                </p>
              </div>
              <span className="mt-auto text-sm font-semibold text-primary group-hover:underline">
                Se connecter →
              </span>
            </button>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-on-surface-variant">
          Comptes de démonstration — aucune authentification réelle requise.
          Les données sont fictives et non contractuelles.
        </p>
      </div>
    </div>
  );
}
