import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Compass, MapPin, TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { TopUtilityBar } from "@/components/TopUtilityBar";
import { KpiCard } from "@/components/KpiCard";
import { formatPercent } from "@/lib/format";

export const Route = createFileRoute("/ou-investir")({
  head: () => ({
    meta: [
      { title: "Où investir ? Cartographie des tendances & ROI | Place2Invest" },
      {
        name: "description",
        content:
          "Cartographie des marchés : rendements par région du Maroc, ROI par classe d'actifs, tendances mondiales et secteurs porteurs pour orienter vos investissements.",
      },
      { property: "og:title", content: "Où investir ? Cartographie des tendances & ROI" },
      {
        property: "og:description",
        content:
          "Explorez les rendements par région, par classe d'actifs et les tendances de marché à grande échelle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OuInvestirPage,
});

type Region = {
  id: string;
  nom: string;
  roi: number; // rendement annuel moyen estimé %
  croissance: number; // évolution des prix sur 12 mois %
  tension: "Forte" | "Modérée" | "Émergente";
  secteur: string;
  x: number; // position relative sur la carte (%)
  y: number;
};

const regions: Region[] = [
  {
    id: "tanger",
    nom: "Tanger-Tétouan-Al Hoceïma",
    roi: 9.4,
    croissance: 11.2,
    tension: "Forte",
    secteur: "Logistique & industrie",
    x: 40,
    y: 8,
  },
  {
    id: "rabat",
    nom: "Rabat-Salé-Kénitra",
    roi: 7.8,
    croissance: 6.4,
    tension: "Modérée",
    secteur: "Résidentiel & services",
    x: 33,
    y: 26,
  },
  {
    id: "casablanca",
    nom: "Casablanca-Settat",
    roi: 8.6,
    croissance: 7.9,
    tension: "Forte",
    secteur: "Bureaux & fintech",
    x: 28,
    y: 36,
  },
  {
    id: "marrakech",
    nom: "Marrakech-Safi",
    roi: 10.1,
    croissance: 12.6,
    tension: "Forte",
    secteur: "Tourisme & hôtellerie",
    x: 32,
    y: 52,
  },
  {
    id: "agadir",
    nom: "Souss-Massa",
    roi: 8.9,
    croissance: 9.1,
    tension: "Émergente",
    secteur: "Agro & balnéaire",
    x: 22,
    y: 66,
  },
  {
    id: "fes",
    nom: "Fès-Meknès",
    roi: 6.7,
    croissance: 4.8,
    tension: "Modérée",
    secteur: "Résidentiel abordable",
    x: 45,
    y: 30,
  },
  {
    id: "oriental",
    nom: "Oriental",
    roi: 6.2,
    croissance: 3.9,
    tension: "Émergente",
    secteur: "Commerce frontalier",
    x: 60,
    y: 22,
  },
  {
    id: "dakhla",
    nom: "Dakhla-Oued Ed-Dahab",
    roi: 11.3,
    croissance: 15.4,
    tension: "Émergente",
    secteur: "Énergies & pêche",
    x: 12,
    y: 88,
  },
];

const classesActifs = [{ classe: "Immobilier MA", roi: 8.4, risque: 3 }];

const tendances = [
  { annee: "2021", immobilier: 5.1 },
  { annee: "2022", immobilier: 5.8 },
  { annee: "2023", immobilier: 6.6 },
  { annee: "2024", immobilier: 7.5 },
  { annee: "2025", immobilier: 8.1 },
  { annee: "2026", immobilier: 8.4 },
];

const marchesMondiaux = [
  { zone: "Maroc", roi: 8.4, note: "Hub africain, incitations fiscales ZAI" },
  { zone: "Afrique de l'Ouest", roi: 11.2, note: "Forte croissance démographique" },
  { zone: "Golfe (GCC)", roi: 9.6, note: "Capitaux abondants, immobilier premium" },
  { zone: "Asie du Sud-Est", roi: 10.8, note: "Industrialisation & tech" },
];

const tensionColor: Record<Region["tension"], string> = {
  Forte: "bg-primary text-on-primary",
  Modérée: "bg-tertiary-container text-on-surface",
  Émergente: "bg-secondary-container text-on-surface",
};

function OuInvestirPage() {
  const [activeRegion, setActiveRegion] = useState<string>("marrakech");

  const region = useMemo(
    () => regions.find((r) => r.id === activeRegion) ?? regions[0],
    [activeRegion],
  );
  const best = useMemo(() => [...regions].sort((a, b) => b.roi - a.roi)[0], []);
  const maxRoi = Math.max(...regions.map((r) => r.roi));

  return (
    <div className="min-h-screen bg-surface">
      <TopUtilityBar />

      {/* Header */}
      <header className="border-b border-outline-variant bg-surface-low">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-on-surface-variant hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
          <p className="label-sm mt-6 text-primary">Cartographie des marchés</p>
          <h1 className="display-lg mt-2 max-w-3xl text-on-surface">Où investir&nbsp;?</h1>
          <p className="body-md mt-4 max-w-2xl text-on-surface-variant">
            Une lecture à grande échelle des tendances d'investissement : rendements par région du
            Maroc, comparaison des classes d'actifs, dynamiques mondiales et secteurs porteurs.
            Données de marché indicatives, indépendantes des projets listés sur la plateforme.
          </p>
        </div>
      </header>

      {/* KPIs */}
      <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="ROI moyen marché (Maroc)"
            value={formatPercent(8.4)}
            hint="Immobilier — toutes zones confondues"
            trend={0.9}
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <KpiCard
            label="Région la plus rentable"
            value={best.nom.split("-")[0]}
            hint={`${formatPercent(best.roi)} de rendement estimé`}
            icon={<MapPin className="h-5 w-5" />}
          />
          <KpiCard
            label="Classe d'actifs la plus dynamique"
            value="Immobilier"
            hint="8,4 % — volatilité faible"
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>
      </section>

      {/* Cartographie */}
      <section className="mx-auto max-w-[1280px] px-4 pb-12 sm:px-10">
        <div className="mb-6 max-w-2xl">
          <p className="label-sm text-primary">Carte des rendements</p>
          <h2 className="headline-lg mt-2 text-on-surface">Tendances par région</h2>
          <p className="mt-2 text-on-surface-variant">
            Plus le point est large et intense, plus le rendement annuel estimé est élevé.
            Sélectionnez une région pour voir le détail.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="card-elevated relative aspect-[4/5] overflow-hidden bg-surface-lowest p-4 sm:aspect-[4/3]">
            <div className="absolute inset-4 rounded-xl bg-primary-container/10" />
            {regions.map((r) => {
              const scale = r.roi / maxRoi;
              const size = 26 + scale * 30;
              const on = r.id === activeRegion;
              return (
                <button
                  key={r.id}
                  onMouseEnter={() => setActiveRegion(r.id)}
                  onClick={() => setActiveRegion(r.id)}
                  aria-label={`${r.nom} — ${formatPercent(r.roi)}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all"
                  style={{ left: `${r.x}%`, top: `${r.y}%`, width: size, height: size }}
                >
                  <span
                    className={`absolute inset-0 rounded-full bg-primary transition-opacity ${
                      on ? "opacity-90" : "opacity-40"
                    }`}
                    style={{ opacity: on ? 0.95 : 0.25 + scale * 0.45 }}
                  />
                  {on && (
                    <span className="absolute -inset-2 animate-pulse rounded-full border-2 border-primary/50" />
                  )}
                  <span className="relative grid h-full w-full place-items-center text-[10px] font-bold text-on-primary">
                    {r.roi.toFixed(1)}
                  </span>
                </button>
              );
            })}
            <span className="absolute bottom-5 right-6 text-xs text-on-surface-variant">
              Rendement annuel estimé (%)
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="card-elevated bg-surface-lowest p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="label-sm text-on-surface-variant">Région sélectionnée</p>
                  <h3 className="headline-md mt-1 text-on-surface">{region.nom}</h3>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${tensionColor[region.tension]}`}
                >
                  Demande {region.tension.toLowerCase()}
                </span>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs text-on-surface-variant">Rendement estimé</dt>
                  <dd className="mt-1 text-2xl font-bold text-on-surface">
                    {formatPercent(region.roi)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-on-surface-variant">Prix / 12 mois</dt>
                  <dd className="mt-1 text-2xl font-bold text-success">
                    +{region.croissance.toFixed(1)} %
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-on-surface-variant">
                Secteur porteur :{" "}
                <span className="font-semibold text-on-surface">{region.secteur}</span>
              </p>
            </div>

            <div className="card-elevated bg-surface-lowest p-6">
              <p className="label-sm text-on-surface-variant">Classement des régions</p>
              <ul className="mt-3 space-y-2">
                {[...regions]
                  .sort((a, b) => b.roi - a.roi)
                  .slice(0, 5)
                  .map((r, i) => (
                    <li key={r.id}>
                      <button
                        onClick={() => setActiveRegion(r.id)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          r.id === activeRegion
                            ? "bg-primary-container/20 text-primary"
                            : "hover:bg-surface-low"
                        }`}
                      >
                        <span className="w-4 shrink-0 text-xs font-bold text-on-surface-variant">
                          {i + 1}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-on-surface">{r.nom}</span>
                        <span className="shrink-0 font-semibold">{formatPercent(r.roi)}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Classes d'actifs */}
      <section className="bg-surface-low">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-10">
          <div className="mb-8 max-w-2xl">
            <p className="label-sm text-primary">Comparatif</p>
            <h2 className="headline-lg mt-2 text-on-surface">Meilleurs ROI par classe d'actifs</h2>
            <p className="mt-2 text-on-surface-variant">
              Rendement annuel moyen observé sur le marché en 2026, à mettre en regard du niveau de
              risque (1 = faible, 10 = élevé).
            </p>
          </div>
          <div className="card-elevated bg-surface-lowest p-5">
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={classesActifs}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--outline-variant))"
                    vertical={false}
                  />
                  <XAxis dataKey="classe" tick={{ fontSize: 11 }} stroke="currentColor" />
                  <YAxis tick={{ fontSize: 11 }} stroke="currentColor" unit="%" />
                  <Tooltip formatter={(v: number) => `${v} %`} />
                  <Bar
                    dataKey="roi"
                    name="ROI moyen"
                    fill="hsl(var(--primary))"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {classesActifs.map((c) => (
                <span
                  key={c.classe}
                  className="rounded-full border border-outline-variant px-3 py-1 text-xs text-on-surface-variant"
                >
                  {c.classe} · risque {c.risque}/10
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tendances pluriannuelles */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-10">
        <div className="mb-8 max-w-2xl">
          <p className="label-sm text-primary">Historique</p>
          <h2 className="headline-lg mt-2 text-on-surface">Tendances 2021 – 2026</h2>
          <p className="mt-2 text-on-surface-variant">
            Évolution du rendement annuel par grande classe d'actifs.
          </p>
        </div>
        <div className="card-elevated bg-surface-lowest p-5">
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tendances} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--outline-variant))" />
                <XAxis dataKey="annee" tick={{ fontSize: 11 }} stroke="currentColor" />
                <YAxis tick={{ fontSize: 11 }} stroke="currentColor" unit="%" />
                <Tooltip formatter={(v: number) => `${v} %`} />
                <Line
                  type="monotone"
                  dataKey="immobilier"
                  name="Immobilier"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Zones mondiales */}
      <section className="bg-surface-low">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-10">
          <div className="mb-8 max-w-2xl">
            <p className="label-sm text-primary">À l'échelle mondiale</p>
            <h2 className="headline-lg mt-2 text-on-surface">Zones géographiques à surveiller</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {marchesMondiaux.map((m) => (
              <div key={m.zone} className="card-elevated bg-surface-lowest p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-on-surface">{m.zone}</h3>
                  <span className="rounded-full bg-primary-container/20 px-3 py-1 text-xs font-bold text-primary">
                    {formatPercent(m.roi)}
                  </span>
                </div>
                <p className="mt-3 text-sm text-on-surface-variant">{m.note}</p>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-low">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(m.roi / 12) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-10">
        <div className="card-elevated flex flex-col items-start gap-5 bg-surface-lowest p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-on-primary">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <h2 className="headline-md text-on-surface">Passez de la tendance à l'action</h2>
              <p className="mt-1 text-sm text-on-surface-variant">
                Explorez les opportunités disponibles sur Place2Invest ou simulez votre rendement.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/projets"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary hover:opacity-90"
            >
              Voir les projets
            </Link>
            <Link
              to="/investisseur/simulateur-roi"
              className="inline-flex items-center gap-2 rounded-full border border-outline-variant px-5 py-2.5 text-sm font-semibold text-on-surface hover:border-primary hover:text-primary"
            >
              Simulateur ROI
            </Link>
          </div>
        </div>
        <p className="mt-6 text-xs text-on-surface-variant">
          Données indicatives à visée informative, issues d'estimations de marché. Elles ne
          constituent pas un conseil en investissement.
        </p>
      </section>
    </div>
  );
}
