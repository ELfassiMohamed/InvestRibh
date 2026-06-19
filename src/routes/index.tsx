import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, TrendingUp, ShieldCheck, Sparkles } from "lucide-react";

import { TopUtilityBar } from "@/components/TopUtilityBar";
import { CategoryNav } from "@/components/CategoryNav";
import { HeroSearch } from "@/components/HeroSearch";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elevated Equity — L'excellence immobilière à votre portée" },
      {
        name: "description",
        content:
          "Investissez dans la pierre marocaine à partir de 5 000 MAD. Projets analysés par IA, conformes AMMC, suivi temps réel.",
      },
    ],
  }),
  component: HomePage,
});

const espaces = [
  {
    to: "/investisseur" as const,
    label: "Espace Investisseur",
    titre: "Diversifiez votre patrimoine",
    description:
      "Tableau de bord temps réel, simulateur de ROI fiscal marocain, portefeuille consolidé.",
    icon: TrendingUp,
  },
  {
    to: "/porteur-de-projet" as const,
    label: "Espace Porteur de Projet",
    titre: "Levez les fonds de votre opération",
    description:
      "Soumission de dossier guidée, suivi de collecte et de chantier transparents.",
    icon: Building2,
  },
  {
    to: "/admin" as const,
    label: "Espace Conformité",
    titre: "Supervision et conformité AMMC",
    description:
      "Validation IA des dossiers, eKYC Bank Al-Maghrib, journal d'audit complet.",
    icon: ShieldCheck,
  },
];

function HomePage() {
  const enCollecte = projects.filter((p) => p.statut === "En collecte");
  const featured = projects.filter((p) => p.featured);
  const residentiel = projects.filter((p) => p.typologie === "Résidentiel");
  const commercial = projects.filter((p) => p.typologie === "Commercial & Bureaux");

  return (
    <div className="min-h-screen bg-surface">
      <TopUtilityBar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-surface-lowest">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <span className="label-sm w-fit rounded-md bg-primary-container/20 px-3 py-1.5 text-primary">
              Financement participatif immobilier · Maroc
            </span>
            <h1 className="display-lg mt-6 text-on-surface">
              L'excellence immobilière
              <br />
              <span className="text-primary">à votre portée.</span>
            </h1>
            <p className="body-lg mt-6 max-w-xl text-on-surface-variant">
              Investissez à partir de 5 000 MAD dans des projets marocains
              rigoureusement sélectionnés et analysés par notre pipeline
              d'intelligence artificielle. Conforme au cadre AMMC loi 15-18.
            </p>

            <div className="mt-8 max-w-2xl">
              <HeroSearch />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-on-surface-variant">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Agréé cadre AMMC 15-18
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Analyse IA multi-agents
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                +120 M MAD investis
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 h-64 w-64 rounded-full bg-primary-container/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl shadow-elevated">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
                alt="Vue architecturale d'un projet immobilier marocain de standing"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      i === 0 ? "bg-surface-lowest" : "bg-surface-lowest/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CategoryNav />

      {/* 3 espaces */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-10">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="label-sm text-primary">Nos espaces</p>
            <h2 className="headline-lg mt-2 text-on-surface">Une plateforme, trois métiers</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {espaces.map(({ to, label, titre, description, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="card-elevated group flex flex-col gap-4 p-6 hover:card-elevated-hover"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-on-primary">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="label-sm text-on-surface-variant">{label}</p>
                <h3 className="headline-md mt-1.5 text-on-surface">{titre}</h3>
                <p className="mt-2 text-sm text-on-surface-variant">{description}</p>
              </div>
              <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-primary">
                Accéder à l'espace
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Projets en collecte */}
      <ProjectSection
        eyebrow="En ce moment"
        title="Projets en collecte"
        items={enCollecte}
        ctaLabel="Accéder à l'espace Investisseur"
      />

      {/* Coups de cœur */}
      <section className="bg-surface-low">
        <ProjectSection
          eyebrow="Coups de cœur"
          title="Sélection de l'équipe"
          items={featured}
          ctaLabel="Voir tous les coups de cœur"
        />
      </section>

      {/* Résidentiel */}
      <ProjectSection
        eyebrow="Typologie"
        title="Immobilier résidentiel"
        items={residentiel}
      />

      {/* Commercial */}
      <section className="bg-surface-low">
        <ProjectSection
          eyebrow="Typologie"
          title="Commercial & bureaux"
          items={commercial}
        />
      </section>

      {/* Footer */}
      <footer className="bg-inverse-surface text-inverse-on-surface">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 sm:px-10 md:grid-cols-4">
          <div>
            <p className="text-lg font-bold">Elevated Equity</p>
            <p className="mt-2 text-sm opacity-70">
              Plateforme de financement participatif immobilier régulée au Maroc.
            </p>
          </div>
          {[
            { titre: "Plateforme", liens: ["Projets", "Comment ça marche", "Fiscalité MA", "Sécurité"] },
            { titre: "Société", liens: ["À propos", "Carrières", "Presse", "Contact"] },
            { titre: "Légal", liens: ["Mentions légales", "Conformité AMMC", "Politique de confidentialité", "Cookies"] },
          ].map((col) => (
            <div key={col.titre}>
              <p className="label-sm">{col.titre}</p>
              <ul className="mt-3 space-y-2 text-sm opacity-80">
                {col.liens.map((l) => (
                  <li key={l} className="hover:opacity-100">{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-inverse-on-surface/10">
          <p className="mx-auto max-w-[1280px] px-4 py-4 text-xs opacity-60 sm:px-10">
            © {new Date().getFullYear()} Elevated Equity. Les performances passées ne préjugent pas des performances futures. Investir comporte un risque de perte en capital.
          </p>
        </div>
      </footer>
    </div>
  );
}

function ProjectSection({
  eyebrow,
  title,
  items,
  ctaLabel,
}: {
  eyebrow: string;
  title: string;
  items: typeof projects;
  ctaLabel?: string;
}) {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-sm text-primary">{eyebrow}</p>
          <h2 className="headline-lg mt-2 text-on-surface">{title}</h2>
        </div>
        {ctaLabel && (
          <Link
            to="/investisseur/projets"
            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 3).map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
