import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Building2, TrendingUp, CheckCircle2 } from "lucide-react";
import { TopUtilityBar } from "@/components/TopUtilityBar";
import { HeroSearch } from "@/components/HeroSearch";
import { ModeCard } from "@/components/ModeCard";
import { useProjects } from "@/hooks/use-queries";
import { modeMeta, projectHasMode } from "@/lib/modes";
import { type ExploitationMode, type Project } from "@/lib/mock-data";

import heroImage from "@/assets/hero-place2invest.jpg";
import espaceInvestisseurImg from "@/assets/espace-investisseur.jpg";
import espacePorteurImg from "@/assets/espace-porteur.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Place2Invest" },
      {
        name: "description",
        content:
          "Place2Invest est votre plateforme digitale pour investir en immobilier au Maroc : location longue durée, courte durée, revente ou promotion immobilière, avec couverture assurance stricte sur chaque mode d'exploitation.",
      },
      { property: "og:title", content: "Place2Invest — Investissez dans l'immobilier" },
      {
        property: "og:description",
        content:
          "Choisissez votre mode d'exploitation : location longue ou courte durée, revente ou promotion immobilière, analysés par notre pipeline IA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const espaces = [
  {
    to: "/investisseur" as const,
    labelKey: "home.espaceInvestisseur.label",
    titreKey: "home.espaceInvestisseur.titre",
    descriptionKey: "home.espaceInvestisseur.description",
    pointsKeys: [
      "home.espaceInvestisseur.points.0",
      "home.espaceInvestisseur.points.1",
      "home.espaceInvestisseur.points.2",
    ],
    icon: TrendingUp,
    image: espaceInvestisseurImg,
  },
  {
    to: "/porteur-de-projet" as const,
    labelKey: "home.espacePorteur.label",
    titreKey: "home.espacePorteur.titre",
    descriptionKey: "home.espacePorteur.description",
    pointsKeys: [
      "home.espacePorteur.points.0",
      "home.espacePorteur.points.1",
      "home.espacePorteur.points.2",
    ],
    icon: Building2,
    image: espacePorteurImg,
  },
];

function HomePage() {
  const { t } = useTranslation();
  const { data: projects = [] } = useProjects();

  const countByMode = (mode: ExploitationMode) =>
    projects.filter((p: Project) => projectHasMode(p, mode)).length;

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
                {t("hero.headline1")}
                <br />
                {t("hero.headline2")}
              </h1>
              <p className="body-md mt-5 max-w-xl text-white/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Mode chooser — overlapping hero bottom */}
        <div className="relative z-10 -mt-40 sm:-mt-44 lg:-mt-48">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-10">
            <div className="mb-8 max-w-2xl">
              <p className="label-sm text-primary">{t("home.modeLabel")}</p>
              <h2 className="headline-lg mt-2 text-on-surface">{t("home.modeTitle")}</h2>
              <p className="mt-3 text-on-surface-variant">{t("home.modeDesc")}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {modeMeta.map((m) => (
                <ModeCard
                  key={m.slug}
                  slug={m.slug}
                  labelKey={m.labelKey}
                  descriptionKey={m.descriptionKey}
                  icon={m.icon}
                  image={m.image}
                  count={countByMode(m.mode)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nos espaces */}
      <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-10">
        <div className="mb-10 max-w-2xl">
          <p className="label-sm text-primary">{t("home.espacesLabel")}</p>
          <h2 className="headline-lg mt-2 text-on-surface">{t("home.espacesTitle")}</h2>
          <p className="mt-3 text-on-surface-variant">{t("home.espacesDesc")}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {espaces.map(
            ({ to, labelKey, titreKey, descriptionKey, pointsKeys, icon: Icon, image }) => (
              <Link
                key={to}
                to={to}
                className="card-elevated group relative flex flex-col overflow-hidden bg-surface-lowest transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="relative aspect-[16/8] w-full overflow-hidden">
                  <img
                    src={image}
                    alt={t(labelKey)}
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
                    <p className="label-sm text-on-surface-variant">{t(labelKey)}</p>
                    <h3 className="headline-md mt-1.5 text-on-surface">{t(titreKey)}</h3>
                    <p className="mt-2 text-sm text-on-surface-variant">{t(descriptionKey)}</p>
                  </div>
                  <ul className="space-y-2">
                    {pointsKeys.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-sm text-on-surface">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                        {t(pt)}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary">
                    {t("home.accederEspace")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ),
          )}
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
            <p className="mt-2 text-sm opacity-70">{t("home.footer.tagline")}</p>
          </div>
          {[
            {
              id: "plateforme",
              titre: t("home.footer.plateforme"),
              liens: t("home.footer.plateformeLinks", { returnObjects: true }) as string[],
            },
            {
              id: "societe",
              titre: t("home.footer.societe"),
              liens: t("home.footer.societeLinks", { returnObjects: true }) as string[],
            },
            {
              id: "legal",
              titre: t("home.footer.legal"),
              liens: t("home.footer.legalLinks", { returnObjects: true }) as string[],
            },
          ].map((col) => (
            <div key={col.id}>
              <p className="label-sm">{col.titre}</p>
              <ul className="mt-3 space-y-2 text-sm opacity-80">
                {col.liens.map((l) => (
                  <li key={l} className="hover:opacity-100">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-inverse-on-surface/10">
          <p className="mx-auto max-w-[1280px] px-4 py-4 text-xs opacity-60 sm:px-10">
            © {new Date().getFullYear()} Place2Invest. {t("common.footer")}
          </p>
        </div>
      </footer>
    </div>
  );
}

const interetsKeys = modeMeta.map((m) => m.labelKey);

function InterestForm() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const interets = interetsKeys.map((k) => t(k));

  const toggle = (v: string) =>
    setSelected((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  return (
    <section className="bg-surface-low">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="label-sm text-primary">{t("home.rejoignezLabel")}</p>
            <h2 className="headline-lg mt-2 text-on-surface">{t("home.interetsTitle")}</h2>
            <p className="mt-3 max-w-md text-on-surface-variant">{t("home.interetsDesc")}</p>
          </div>

          <div className="card-elevated bg-surface-lowest p-6 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <CheckCircle2 className="h-10 w-10 text-primary" />
                <h3 className="headline-md text-on-surface">{t("home.merci")}</h3>
                <p className="text-sm text-on-surface-variant">{t("home.merciDesc")}</p>
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
                  <Field label={t("home.fields.nom")} name="nom" placeholder="Amine El Mansouri" />
                  <Field
                    label={t("home.fields.email")}
                    name="email"
                    type="email"
                    placeholder="vous@exemple.ma"
                  />
                  <Field
                    label={t("home.fields.tel")}
                    name="tel"
                    type="tel"
                    placeholder="+212 6 00 00 00 00"
                  />
                  <div>
                    <label className="label-sm text-on-surface-variant" htmlFor="profil">
                      {t("home.fields.jeSuis")}
                    </label>
                    <select
                      id="profil"
                      name="profil"
                      className="mt-2 w-full rounded-md border border-outline-variant bg-surface-lowest px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none"
                    >
                      <option>{t("home.fields.profilInvestisseur")}</option>
                      <option>{t("home.fields.profilPorteur")}</option>
                      <option>{t("home.fields.profilPartenaire")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <p className="label-sm text-on-surface-variant">{t("home.interets.label")}</p>
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
                    {t("home.fields.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder={t("home.fields.messagePlaceholder")}
                    className="mt-2 w-full rounded-md border border-outline-variant bg-surface-lowest px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition-colors hover:opacity-90"
                >
                  {t("home.fields.envoyer")}
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
