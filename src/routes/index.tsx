import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Bitcoin,
  Rocket,
  HeartHandshake,
  Users,
  Gem,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { TopUtilityBar } from "@/components/TopUtilityBar";
import { HeroSearch } from "@/components/HeroSearch";

import heroImage from "@/assets/hero-place2invest.jpg";
import catImmobilier from "@/assets/cat-immobilier.jpg";
import catCrypto from "@/assets/cat-crypto.jpg";
import catStartup from "@/assets/cat-startup.jpg";
import catSolidaire from "@/assets/cat-solidaire.jpg";
import catCrowdfunding from "@/assets/cat-crowdfunding.jpg";
import catValeur from "@/assets/cat-valeur.jpg";
import espaceInvestisseurImg from "@/assets/espace-investisseur.jpg";
import espacePorteurImg from "@/assets/espace-porteur.jpg";
import { getSlugForCategorie, type ProjectCategorie } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Place2Invest" },
      {
        name: "description",
        content:
          "Place2Invest est votre plateforme digitale pour diversifier vos investissements : immobilier, startups, crypto, solidaire, crowdfunding et produits de forte valeur.",
      },
      { property: "og:title", content: "Place2Invest — Investissez dans le futur" },
      {
        property: "og:description",
        content:
          "Diversifiez vos investissements au Maroc : immobilier, crypto, startups, solidaire, crowdfunding et produits de forte valeur.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const categories = [
  { label: "Immobilier", categorie: "Immobilier" as ProjectCategorie, icon: Building2, image: catImmobilier },
  { label: "Monnaie virtuelle & Crypto", categorie: "Crypto" as ProjectCategorie, icon: Bitcoin, image: catCrypto },
  { label: "Startup & Affaires", categorie: "Startup & Affaires" as ProjectCategorie, icon: Rocket, image: catStartup },
  { label: "Solidaire", categorie: "Solidaire" as ProjectCategorie, icon: HeartHandshake, image: catSolidaire },
  { label: "Crowdfunding", categorie: "Crowdfunding" as ProjectCategorie, icon: Users, image: catCrowdfunding },
  { label: "Produit de forte valeur", categorie: "Produit de forte valeur" as ProjectCategorie, icon: Gem, image: catValeur },
];

const espaces = [
  {
    to: "/investisseur" as const,
    label: "Espace Investisseur",
    titre: "Diversifiez votre patrimoine",
    description:
      "Tableau de bord temps réel, simulateur de ROI fiscal marocain et portefeuille consolidé.",
    points: ["Opportunités qualifiées", "Suivi de performance", "Simulateur fiscal MA"],
    icon: TrendingUp,
    image: espaceInvestisseurImg,
  },
  {
    to: "/porteur-de-projet" as const,
    label: "Espace Porteur de Projet",
    titre: "Levez les fonds de votre opération",
    description:
      "Soumission de dossier guidée, suivi de collecte et avancement de chantier transparents.",
    points: ["Dossier guidé", "Collecte en direct", "Reporting investisseurs"],
    icon: Building2,
    image: espacePorteurImg,
  },
];


function HomePage() {


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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-3">
              {categories.map((c) => (
                <CategoryCard key={c.label} {...c} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nos espaces */}
      <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-10">
        <div className="mb-10 max-w-2xl">
          <p className="label-sm text-primary">Nos espaces</p>
          <h2 className="headline-lg mt-2 text-on-surface">
            Deux façons de faire grandir votre projet
          </h2>
          <p className="mt-3 text-on-surface-variant">
            Que vous cherchiez à placer votre épargne ou à financer votre
            opération, votre espace dédié vous attend.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {espaces.map(({ to, label, titre, description, points, icon: Icon, image }) => (
            <Link
              key={to}
              to={to}
              className="card-elevated group relative flex flex-col overflow-hidden bg-surface-lowest transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="relative aspect-[16/8] w-full overflow-hidden">
                <img
                  src={image}
                  alt={label}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/50 to-transparent" />
                <div className="absolute bottom-4 left-6 grid h-12 w-12 place-items-center rounded-2xl bg-primary text-on-primary shadow-elevated">
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-5 p-8">
                <div>
                  <p className="label-sm text-on-surface-variant">{label}</p>
                  <h3 className="headline-md mt-1.5 text-on-surface">{titre}</h3>
                  <p className="mt-2 text-sm text-on-surface-variant">{description}</p>
                </div>
                <ul className="space-y-2">
                  {points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-sm text-on-surface">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary">
                  Accéder à l'espace
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Formulaire d'intérêt */}
      <InterestForm />


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
  categorie,
  icon: Icon,
  image,
}: {
  label: string;
  categorie: ProjectCategorie;
  icon: typeof Building2;
  image: string;
}) {
  return (
    <Link
      to="/projects/$categorie"
      params={{ categorie: getSlugForCategorie(categorie) }}
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

const interets = [
  "Immobilier",
  "Monnaie virtuelle & Crypto",
  "Startup & Affaires",
  "Solidaire",
  "Crowdfunding",
  "Produit de forte valeur",
];

function InterestForm() {
  const [sent, setSent] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (v: string) =>
    setSelected((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  return (
    <section className="bg-surface-low">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="label-sm text-primary">Rejoignez-nous</p>
            <h2 className="headline-lg mt-2 text-on-surface">
              Dites-nous ce qui vous intéresse
            </h2>
            <p className="mt-3 max-w-md text-on-surface-variant">
              Laissez vos coordonnées et vos centres d'intérêt : notre équipe vous
              envoie en priorité les opportunités correspondant à votre profil.
            </p>
          </div>

          <div className="card-elevated bg-surface-lowest p-6 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <CheckCircle2 className="h-10 w-10 text-primary" />
                <h3 className="headline-md text-on-surface">Merci !</h3>
                <p className="text-sm text-on-surface-variant">
                  Votre demande a bien été enregistrée. Nous vous recontactons
                  très prochainement.
                </p>
              </div>
            ) : (
              <form
                className="grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nom complet" name="nom" placeholder="Amine El Mansouri" />
                  <Field label="E-mail" name="email" type="email" placeholder="vous@exemple.ma" />
                  <Field label="Téléphone" name="tel" type="tel" placeholder="+212 6 00 00 00 00" />
                  <div>
                    <label className="label-sm text-on-surface-variant" htmlFor="profil">
                      Je suis
                    </label>
                    <select
                      id="profil"
                      name="profil"
                      className="mt-2 w-full rounded-md border border-outline-variant bg-surface-lowest px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none"
                    >
                      <option>Investisseur</option>
                      <option>Porteur de projet</option>
                      <option>Partenaire</option>
                    </select>
                  </div>
                </div>

                <div>
                  <p className="label-sm text-on-surface-variant">Centres d'intérêt</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {interets.map((i) => {
                      const on = selected.includes(i);
                      return (
                        <button
                          type="button"
                          key={i}
                          onClick={() => toggle(i)}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                            on
                              ? "border-primary bg-primary text-on-primary"
                              : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                          }`}
                        >
                          {i}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="label-sm text-on-surface-variant" htmlFor="message">
                    Message (optionnel)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Montant envisagé, horizon d'investissement…"
                    className="mt-2 w-full rounded-md border border-outline-variant bg-surface-lowest px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition-colors hover:opacity-90"
                >
                  Envoyer ma demande
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="label-sm text-on-surface-variant" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={type !== "tel"}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-outline-variant bg-surface-lowest px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none"
      />
    </div>
  );
}

