import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Bitcoin, Rocket, Briefcase, TrendingUp, ShieldCheck } from "lucide-react";

import { TopUtilityBar } from "@/components/TopUtilityBar";
import { HeroSearch } from "@/components/HeroSearch";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/mock-data";

import heroImage from "@/assets/hero-place2invest.jpg";
import catImmobilier from "@/assets/cat-immobilier.jpg";
import catCrypto from "@/assets/cat-crypto.jpg";
import catStartup from "@/assets/cat-startup.jpg";
import catAffaires from "@/assets/cat-affaires.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Place2Invest — Investissez dans le futur, aujourd'hui." },
      {
        name: "description",
        content:
          "Place2Invest est votre plateforme digitale pour diversifier vos investissements : immobilier, startups, art, crypto et talent.",
      },
    ],
  }),
  component: HomePage,
});

const categories = [
  { label: "Immobilier", to: "/projets" as const, icon: Building2, image: catImmobilier },
  { label: "Monnaie virtuelle & Crypto", to: "/projets" as const, icon: Bitcoin, image: catCrypto },
  { label: "Startup & Affaires", to: "/projets" as const, icon: Rocket, image: catStartup },
  { label: "Espace affaires", to: "/porteur-de-projet" as const, icon: Briefcase, image: catAffaires },
];

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

  return (
    <div className="min-h-screen bg-surface">
      <div className="relative">
        <TopUtilityBar />

        {/* HERO full-bleed */}
        <section className="relative overflow-hidden">
          <img
            src={heroImage}
            alt="Équipe de professionnels Place2Invest analysant des tableaux de bord financiers"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-black/10" />

          <div className="relative mx-auto max-w-[1280px] px-4 pt-12 pb-48 sm:px-10 sm:pt-16 sm:pb-56 lg:pb-64">
            {/* Logo badge */}
            <div className="mx-auto w-fit">
              <Link
                to="/"
                className="inline-flex items-center rounded-2xl bg-[#1d4dd8] px-6 py-3 shadow-elevated ring-1 ring-white/20"
              >
                <span className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Place
                  <span className="text-[#ff4ea1]">2</span>
                  invest
                </span>
              </Link>
            </div>

            {/* Search */}
            <div className="mx-auto mt-10 max-w-3xl">
              <HeroSearch />
            </div>

            {/* Headline */}
            <div className="mt-16 max-w-2xl sm:mt-24">
              <h1 className="display-lg text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.4)]">
                Investissez dans le futur,
                <br />
                aujourd'hui.
              </h1>
              <p className="body-md mt-5 max-w-xl text-white/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
                Place2Invest est votre plateforme digitale pour diversifier vos
                investissements dans l'immobilier, les startups, l'art, la crypto
                et le talent, tout en soutenant l'économie sociale et solidaire.
              </p>
            </div>
          </div>
        </section>

        {/* Category grid — overlapping hero bottom */}
        <div className="relative z-10 -mt-40 sm:-mt-44 lg:-mt-48">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-10">
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((c) => (
                <CategoryCard key={c.label} {...c} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3 espaces */}
      <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-10">
        <div className="mb-10">
          <p className="label-sm text-primary">Nos espaces</p>
          <h2 className="headline-lg mt-2 text-on-surface">Une plateforme, trois métiers</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {espaces.map(({ to, label, titre, description, icon: Icon }) => (
            <Link key={to} to={to} className="card-elevated group flex flex-col gap-4 p-6 hover:card-elevated-hover">
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

      {/* Projects */}
      <ProjectSection eyebrow="En ce moment" title="Projets en collecte" items={enCollecte} ctaLabel="Voir tous les projets" />
      <section className="bg-surface-low">
        <ProjectSection eyebrow="Coups de cœur" title="Sélection de l'équipe" items={featured} />
      </section>

      {/* Footer */}
      <footer className="bg-inverse-surface text-inverse-on-surface">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 sm:px-10 md:grid-cols-4">
          <div>
            <p className="text-lg font-bold">
              Place<span className="text-inverse-primary">2</span>invest
            </p>
            <p className="mt-2 text-sm opacity-70">
              Plateforme digitale d'investissement multi-actifs régulée au Maroc.
            </p>
          </div>
          {[
            { titre: "Plateforme", liens: ["Projets", "Comment ça marche", "Fiscalité MA", "Sécurité"] },
            { titre: "Société", liens: ["À propos", "Carrières", "Presse", "Contact"] },
            { titre: "Légal", liens: ["Mentions légales", "Conformité AMMC", "Confidentialité", "Cookies"] },
          ].map((col) => (
            <div key={col.titre}>
              <p className="label-sm">{col.titre}</p>
              <ul className="mt-3 space-y-2 text-sm opacity-80">
                {col.liens.map((l) => <li key={l} className="hover:opacity-100">{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-inverse-on-surface/10">
          <p className="mx-auto max-w-[1280px] px-4 py-4 text-xs opacity-60 sm:px-10">
            © {new Date().getFullYear()} Place2Invest. Investir comporte un risque de perte en capital.
          </p>
        </div>
      </footer>
    </div>
  );
}

function CategoryCard({
  label,
  to,
  icon: Icon,
  image,
}: {
  label: string;
  to: "/projets" | "/porteur-de-projet";
  icon: typeof Building2;
  image: string;
}) {
  return (
    <Link
      to={to}
      className="card-elevated group flex flex-col overflow-hidden bg-surface-lowest transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={image}
          alt={label}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center gap-2 px-4 py-3">
        <Icon className="h-4 w-4 shrink-0 text-primary" />
        <span className="truncate text-xs font-bold uppercase tracking-wider text-on-surface">
          {label}
        </span>
      </div>
    </Link>
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
            to="/projets"
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
