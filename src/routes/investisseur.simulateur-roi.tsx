import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
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
import { projects } from "@/lib/mock-data";
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

function SimulateurPage() {
  const [montant, setMontant] = useState(50_000);
  const [duree, setDuree] = useState(5);
  const [mode, setMode] = useState<Mode>("Location nue");
  const [projetId, setProjetId] = useState(projects[0].id);

  const projet = projects.find((p) => p.id === projetId)!;

  const calcul = useMemo(() => calculerROI(montant, duree, mode, projet.rendementCible), [
    montant,
    duree,
    mode,
    projet.rendementCible,
  ]);

  // Projection sur N années
  const projection = Array.from({ length: duree + 1 }, (_, i) => ({
    annee: `An ${i}`,
    "Capital net": Math.round(montant * Math.pow(1 + calcul.rendementNet / 100, i)),
    "Capital brut": Math.round(montant * Math.pow(1 + projet.rendementCible / 100, i)),
  }));

  // Comparatif des modes
  const comparatif = modes.map((m) => {
    const c = calculerROI(montant, duree, m, projet.rendementCible);
    return {
      mode: m,
      "Cash-flow net annuel": Math.round(c.cashFlowNetAnnuel),
      "Rendement net %": Number(c.rendementNet.toFixed(2)),
    };
  });

  return (
    <>
      <PageHeader
        title="Simulateur de ROI"
        description="Estimez vos rendements nets selon le mode d'exploitation et la fiscalité marocaine."
      />

      <div className="mb-4 flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/5 p-3 text-xs text-on-surface">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
        <p>
          Les taux fiscaux utilisés (IR revenus fonciers, retenue dividendes, TPI, TVA)
          sont indicatifs et doivent être validés par un expert-comptable agréé avant toute
          décision d'investissement réelle. Cadre de référence : Code Général des Impôts du Maroc.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Paramètres */}
        <aside className="card-elevated h-fit p-6">
          <div className="mb-4 flex items-center gap-2">
            <Calculator className="h-4 w-4 text-primary" />
            <h2 className="headline-md text-on-surface">Paramètres</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="label-sm text-on-surface-variant">Projet cible</label>
              <select
                value={projetId}
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
                Montant à investir : {formatMAD(montant)}
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
                Durée de détention : {duree} ans
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
              <label className="label-sm text-on-surface-variant">Mode d'exploitation</label>
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
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Résultats */}
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <ResultCard label="Rendement net" value={`${calcul.rendementNet.toFixed(2)} %`} hint="Annualisé" highlight />
            <ResultCard label="Cash-flow net annuel" value={formatMAD(calcul.cashFlowNetAnnuel)} hint="Après fiscalité" />
            <ResultCard label="Gain total estimé" value={formatMAD(calcul.gainTotal)} hint={`Sur ${duree} ans`} />
          </div>

          <div className="card-elevated p-6">
            <h3 className="headline-md text-on-surface">Projection de votre capital</h3>
            <p className="mt-1 text-xs text-on-surface-variant">
              Comparaison rendement brut vs net (après prélèvements fiscaux marocains).
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
            <h3 className="headline-md text-on-surface">Comparatif des modes d'exploitation</h3>
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
            <h3 className="headline-md text-on-surface">Détail de la fiscalité appliquée</h3>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <Row dt="Mode" dd={mode} />
              <Row dt="Rendement brut cible" dd={formatPercent(projet.rendementCible)} />
              <Row dt="IR revenus fonciers" dd={formatPercent(FISCALITE.tauxIRRevenusFonciers * 100)} />
              <Row dt="Abattement forfaitaire" dd={formatPercent(FISCALITE.abattementRevenusFonciers * 100)} />
              <Row dt="Retenue dividendes" dd={formatPercent(FISCALITE.tauxRetenueDividendes * 100)} />
              <Row dt="Taxe Profit Immobilier (TPI)" dd={formatPercent(FISCALITE.tauxTPI * 100)} />
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
