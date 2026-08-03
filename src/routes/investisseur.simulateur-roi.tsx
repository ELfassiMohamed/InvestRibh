import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Calculator, Info } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";

import { PageHeader } from "@/components/AppShell";
import { useProjects } from "@/hooks/use-queries";
import { formatMAD, formatPercent } from "@/lib/format";

export const Route = createFileRoute("/investisseur/simulateur-roi")({
  component: SimulateurPage,
});

/*
 * Paramètres fiscaux marocains — à valider par un expert fiscal avant production.
 * Les taux ci-dessous sont configurables via les variables suivantes.
 */
const FISCALITE = {
  // IR sur revenus fonciers (barème simplifié — tranche moyenne)
  tauxIRRevenusFonciers: 0.20,
  // Abattement forfaitaire de 40 % sur les revenus fonciers (article 64 CGI MA)
  abattementRevenusFonciers: 0.40,
  // Retenue à la source sur dividendes de parts
  tauxRetenueDividendes: 0.15,
  // Taxe sur le Profit Immobilier (TPI) en cas de revente
  tauxTPI: 0.20,
  // TVA sur location courte durée meublée (au-dessus du seuil)
  tauxTVALocationCD: 0.10,
} as const;

type Mode = "Location nue" | "Location meublée" | "Courte durée" | "Revente à terme";

const modes: Mode[] = ["Location nue", "Location meublée", "Courte durée", "Revente à terme"];

const modeKeys: Record<Mode, string> = {
  "Location nue": "locationNue",
  "Location meublée": "locationMeublee",
  "Courte durée": "courteDuree",
  "Revente à terme": "revente",
};

function SimulateurPage() {
  const { t } = useTranslation();
  const { data: projects = [], isLoading } = useProjects();
  const [montant, setMontant] = useState(50_000);
  const [duree, setDuree] = useState(5);
  const [mode, setMode] = useState<Mode>("Location nue");
  const [projetId, setProjetId] = useState("");

  const projet = projects.find((p) => p.id === projetId) ?? projects[0];

  if (isLoading || !projet) {
    return (
      <>
        <PageHeader title={t("simulator.title")} description={t("common.loading")} />
        <p className="text-sm text-on-surface-variant">{t("investor.loadingSub")}</p>
      </>
    );
  }

  const calcul = useMemo(() => calculerROI(montant, duree, mode, projet.rendementCible), [
    montant,
    duree,
    mode,
    projet.rendementCible,
  ]);

  // Projection sur N années
  const projection = Array.from({ length: duree + 1 }, (_, i) => ({
    annee: `${t("simulator.annee")} ${i}`,
    "Capital net": Math.round(montant * Math.pow(1 + calcul.rendementNet / 100, i)),
    "Capital brut": Math.round(montant * Math.pow(1 + projet.rendementCible / 100, i)),
  }));

  // Comparatif des modes
  const comparatif = modes.map((m) => {
    const c = calculerROI(montant, duree, m, projet.rendementCible);
    return {
      mode: t(`simulator.modes.${modeKeys[m]}`),
      "Cash-flow net annuel": Math.round(c.cashFlowNetAnnuel),
      "Rendement net %": Number(c.rendementNet.toFixed(2)),
    };
  });

  return (
    <>
      <PageHeader
        title={t("simulator.title")}
        description={t("simulator.subtitle")}
      />

      <div className="mb-4 flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/5 p-3 text-xs text-on-surface">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
        <p>{t("simulator.disclaimer")}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Paramètres */}
        <aside className="card-elevated h-fit p-6">
          <div className="mb-4 flex items-center gap-2">
            <Calculator className="h-4 w-4 text-primary" />
            <h2 className="headline-md text-on-surface">{t("simulator.parametres")}</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="label-sm text-on-surface-variant">{t("simulator.projetCible")}</label>
              <select
                value={projet.id}
                onChange={(e) => setProjetId(e.target.value)}
                className="mt-2 w-full rounded-md border border-outline-variant bg-surface-lowest px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nom} — {p.ville}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-sm text-on-surface-variant">
                {t("simulator.montant", { value: formatMAD(montant) })}
              </label>
              <input
                type="range"
                min={projet.ticketMinimum}
                max={500_000}
                step={projet.ticketMinimum}
                value={montant}
                onChange={(e) => setMontant(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>

            <div>
              <label className="label-sm text-on-surface-variant">
                {t("simulator.duree", { value: duree })}
              </label>
              <input
                type="range"
                min={1}
                max={15}
                value={duree}
                onChange={(e) => setDuree(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>

            <div>
              <label className="label-sm text-on-surface-variant">{t("simulator.modeLabel")}</label>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {modes.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`rounded-md border px-2 py-2 text-xs font-medium transition-colors ${
                      mode === m
                        ? "border-primary bg-primary text-on-primary"
                        : "border-outline-variant text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    {t(`simulator.modes.${modeKeys[m]}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Résultats */}
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard label={t("simulator.rendementNet")} value={`${calcul.rendementNet.toFixed(2)} %`} hint={t("simulator.annualise")} highlight />
            <ResultCard label={t("simulator.cashflowNet")} value={formatMAD(calcul.cashFlowNetAnnuel)} hint={t("simulator.apresFiscalite")} />
            <ResultCard label={t("simulator.gainTotal")} value={formatMAD(calcul.gainTotal)} hint={t("simulator.surDuree", { value: duree })} />
          </div>

          <div className="card-elevated p-6">
            <h3 className="headline-md text-on-surface">{t("simulator.projectionTitle")}</h3>
            <p className="mt-1 text-xs text-on-surface-variant">
              {t("simulator.projectionSub")}
            </p>
            <div className="mt-4 h-72">
              <ResponsiveContainer>
                <LineChart data={projection}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eeeeee" vertical={false} />
                  <XAxis dataKey="annee" stroke="#84746e" fontSize={12} />
                  <YAxis
                    stroke="#84746e"
                    fontSize={12}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(v: number) => formatMAD(v)}
                    contentStyle={{ borderRadius: 8 }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Capital brut" stroke="#845642" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                  <Line type="monotone" dataKey="Capital net" stroke="#693f2c" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-elevated p-6">
            <h3 className="headline-md text-on-surface">{t("simulator.comparatifTitle")}</h3>
            <div className="mt-4 h-72">
              <ResponsiveContainer>
                <BarChart data={comparatif}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eeeeee" vertical={false} />
                  <XAxis dataKey="mode" stroke="#84746e" fontSize={11} />
                  <YAxis stroke="#84746e" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => formatMAD(v)} />
                  <Bar dataKey="Cash-flow net annuel" fill="#693f2c" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-elevated p-6">
            <h3 className="headline-md text-on-surface">{t("simulator.fiscaliteTitle")}</h3>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <Row dt={t("simulator.mode")} dd={t(`simulator.modes.${modeKeys[mode]}`)} />
              <Row dt={t("simulator.rendementBrut")} dd={formatPercent(projet.rendementCible)} />
              <Row dt={t("simulator.irFonciers")} dd={formatPercent(FISCALITE.tauxIRRevenusFonciers * 100)} />
              <Row dt={t("simulator.abattement")} dd={formatPercent(FISCALITE.abattementRevenusFonciers * 100)} />
              <Row dt={t("simulator.retenueDividendes")} dd={formatPercent(FISCALITE.tauxRetenueDividendes * 100)} />
              <Row dt={t("simulator.tpi")} dd={formatPercent(FISCALITE.tauxTPI * 100)} />
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}

function calculerROI(montant: number, duree: number, mode: Mode, rendementBrut: number) {
  const cashFlowBrutAnnuel = (montant * rendementBrut) / 100;
  let cashFlowNetAnnuel = 0;
  let rendementNet = 0;

  if (mode === "Location nue" || mode === "Location meublée") {
    const baseImposable = cashFlowBrutAnnuel * (1 - FISCALITE.abattementRevenusFonciers);
    const impot = baseImposable * FISCALITE.tauxIRRevenusFonciers;
    cashFlowNetAnnuel = cashFlowBrutAnnuel - impot;
  } else if (mode === "Courte durée") {
    const tva = cashFlowBrutAnnuel * FISCALITE.tauxTVALocationCD;
    const baseImposable = (cashFlowBrutAnnuel - tva) * (1 - FISCALITE.abattementRevenusFonciers);
    const impot = baseImposable * FISCALITE.tauxIRRevenusFonciers;
    cashFlowNetAnnuel = cashFlowBrutAnnuel - tva - impot;
  } else {
    // Revente : pas de cash-flow annuel, gain en capital taxé en TPI à la sortie
    cashFlowNetAnnuel = 0;
  }

  if (mode === "Revente à terme") {
    const valeurFinaleBrute = montant * Math.pow(1 + rendementBrut / 100, duree);
    const plusValue = valeurFinaleBrute - montant;
    const tpi = plusValue * FISCALITE.tauxTPI;
    const gainNet = plusValue - tpi;
    rendementNet = (Math.pow((gainNet + montant) / montant, 1 / duree) - 1) * 100;
  } else {
    rendementNet = (cashFlowNetAnnuel / montant) * 100;
  }

  const gainTotal =
    mode === "Revente à terme"
      ? montant * Math.pow(1 + rendementNet / 100, duree) - montant
      : cashFlowNetAnnuel * duree;

  return { cashFlowNetAnnuel, rendementNet, gainTotal };
}

function ResultCard({ label, value, hint, highlight }: { label: string; value: string; hint?: string; highlight?: boolean }) {
  return (
    <div className={`card-elevated p-5 ${highlight ? "border-2 border-primary/20" : ""}`}>
      <p className="label-sm text-on-surface-variant">{label}</p>
      <p className={`mt-2 text-2xl font-bold ${highlight ? "text-primary" : "text-on-surface"}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-on-surface-variant">{hint}</p>}
    </div>
  );
}

function Row({ dt, dd }: { dt: string; dd: string }) {
  return (
    <div className="flex items-center justify-between rounded-md bg-surface-low px-3 py-2">
      <span className="text-on-surface-variant">{dt}</span>
      <span className="font-semibold text-on-surface">{dd}</span>
    </div>
  );
}
