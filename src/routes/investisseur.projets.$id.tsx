import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Download,
} from "lucide-react";

import { PageHeader } from "@/components/AppShell";
import { FundingProgressBar } from "@/components/FundingProgressBar";
import { RiskScoreBadge } from "@/components/RiskScoreBadge";
import { getProject } from "@/lib/mock-data";
import { formatMAD, formatPercent } from "@/lib/format";

export const Route = createFileRoute("/investisseur/projets/$id")({
  loader: ({ params }) => {
    const project = getProject(params.id);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjetDetailPage,
});

function ProjetDetailPage() {
  const { project } = Route.useLoaderData();
  const [unites, setUnites] = useState(1);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const montant = unites * project.ticketMinimum;
  const rendementAnnuel = (montant * project.rendementCible) / 100;

  return (
    <>
      <Link
        to="/investisseur/projets"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au catalogue
      </Link>

      <PageHeader
        title={project.nom}
        description={`${project.typologie} · ${project.ville}`}
        actions={<RiskScoreBadge score={project.scoreRisque} label={project.scoreLabel} />}
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Galerie + description */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl shadow-card">
            <img src={project.image} alt={project.nom} className="aspect-[16/10] w-full object-cover" />
          </div>

          <div className="card-elevated p-6">
            <h2 className="headline-md text-on-surface">À propos du projet</h2>
            <p className="mt-3 text-on-surface-variant">{project.description}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Detail icon={<MapPin className="h-4 w-4" />} label="Localisation" value={project.ville} />
              <Detail icon={<Calendar className="h-4 w-4" />} label="Durée" value={`${project.dureeMois} mois`} />
              <Detail icon={<Users className="h-4 w-4" />} label="Investisseurs" value={String(project.investisseurs)} />
              <Detail icon={<TrendingUp className="h-4 w-4" />} label="Rendement cible" value={formatPercent(project.rendementCible)} />
              <Detail label="Budget total" value={formatMAD(project.budgetTotal)} />
              <Detail label="Ticket min." value={formatMAD(project.ticketMinimum)} />
            </div>
          </div>

          {/* Analyse IA */}
          <div className="card-elevated overflow-hidden">
            <div className="flex items-center gap-3 border-b border-outline-variant/50 bg-surface-low px-6 py-4">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-on-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h2 className="headline-md text-on-surface">Synthèse de l'analyse IA</h2>
                <p className="text-xs text-on-surface-variant">
                  Pipeline multi-agents · score global {project.scoreRisque}/100
                </p>
              </div>
            </div>
            <div className="grid gap-6 p-6 md:grid-cols-2">
              <div>
                <p className="label-sm text-success">Points forts</p>
                <ul className="mt-3 space-y-2">
                  {project.pointsForts.map((pt) => (
                    <li key={pt} className="flex gap-2 text-sm text-on-surface">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label-sm text-warning">Points de vigilance</p>
                <ul className="mt-3 space-y-2">
                  {project.pointsVigilance.map((pt) => (
                    <li key={pt} className="flex gap-2 text-sm text-on-surface">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="card-elevated p-6">
            <h2 className="headline-md text-on-surface">Documents du projet</h2>
            <ul className="mt-4 divide-y divide-outline-variant/50">
              {[
                "Notice d'information AMMC",
                "Titre foncier",
                "Permis de construire",
                "Business plan détaillé",
                "Étude de sol",
                "Plans architecturaux",
              ].map((doc) => (
                <li key={doc} className="flex items-center justify-between py-3 text-sm">
                  <span className="text-on-surface">{doc}</span>
                  <button className="flex items-center gap-1.5 font-semibold text-primary hover:underline">
                    <Download className="h-4 w-4" /> Télécharger
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar — investir */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-elevated overflow-hidden">
            <div className="border-b border-outline-variant/50 p-6">
              <FundingProgressBar
                current={project.montantCollecte}
                target={project.objectifCollecte}
              />
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-on-surface-variant">Investisseurs</p>
                  <p className="text-base font-bold text-on-surface">{project.investisseurs}</p>
                </div>
                <div>
                  <p className="text-on-surface-variant">Jours restants</p>
                  <p className="text-base font-bold text-on-surface">{project.joursRestants}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 flex items-center gap-1.5 text-xs text-on-surface-variant">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full ${
                      s <= step ? "bg-primary" : "bg-surface-container"
                    }`}
                  />
                ))}
              </div>

              {step === 1 && (
                <>
                  <p className="label-sm text-on-surface-variant">Étape 1 — Sélection</p>
                  <label className="mt-3 block text-sm text-on-surface">
                    Nombre d'unités
                  </label>
                  <div className="mt-2 flex items-center rounded-md border border-outline-variant">
                    <button
                      onClick={() => setUnites(Math.max(1, unites - 1))}
                      className="px-3 py-2 text-on-surface hover:bg-surface-container"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={unites}
                      onChange={(e) => setUnites(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-transparent py-2 text-center font-semibold text-on-surface outline-none"
                    />
                    <button
                      onClick={() => setUnites(unites + 1)}
                      className="px-3 py-2 text-on-surface hover:bg-surface-container"
                    >
                      +
                    </button>
                  </div>

                  <dl className="mt-5 space-y-2 text-sm">
                    <Row label="Montant investi" value={formatMAD(montant)} />
                    <Row label="Rendement annuel estimé" value={formatMAD(rendementAnnuel)} highlight />
                    <Row label="Sur la durée totale" value={formatMAD((rendementAnnuel * project.dureeMois) / 12)} />
                  </dl>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="label-sm text-on-surface-variant">Étape 2 — Vérification KYC</p>
                  <p className="mt-3 text-sm text-on-surface">
                    Votre dossier eKYC est <span className="font-bold text-success">validé</span> ✓
                  </p>
                  <p className="mt-2 text-xs text-on-surface-variant">
                    CIN vérifié · RIB confirmé · Vivacité contrôlée (Bank Al-Maghrib).
                  </p>
                </>
              )}

              {step === 3 && (
                <>
                  <p className="label-sm text-on-surface-variant">Étape 3 — Paiement</p>
                  <p className="mt-3 text-sm text-on-surface">
                    Virement sécurisé depuis le RIB enregistré.
                  </p>
                  <div className="mt-3 rounded-md bg-surface-low p-3 text-xs text-on-surface-variant">
                    Montant à débiter : <span className="font-bold text-on-surface">{formatMAD(montant)}</span>
                  </div>
                </>
              )}

              {step === 4 && (
                <div className="text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
                  <p className="mt-3 font-semibold text-on-surface">Investissement confirmé</p>
                  <p className="mt-1 text-xs text-on-surface-variant">
                    Référence INV-{project.id.slice(0, 6).toUpperCase()}-{Date.now().toString().slice(-4)}
                  </p>
                </div>
              )}

              <div className="mt-6 flex gap-2">
                {step > 1 && step < 4 && (
                  <button
                    onClick={() => setStep((step - 1) as 1 | 2 | 3)}
                    className="flex-1 rounded-md border border-outline-variant px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container"
                  >
                    Retour
                  </button>
                )}
                {step < 4 && (
                  <button
                    onClick={() => setStep((step + 1) as 2 | 3 | 4)}
                    disabled={project.statut !== "En collecte"}
                    className="flex-1 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container disabled:opacity-50"
                  >
                    {step === 1 ? "Continuer" : step === 2 ? "Aller au paiement" : "Confirmer"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function Detail({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface-low p-3">
      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
        {icon}
        {label}
      </div>
      <p className="mt-1 text-sm font-semibold text-on-surface">{value}</p>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2 last:border-0">
      <dt className="text-on-surface-variant">{label}</dt>
      <dd className={`font-bold ${highlight ? "text-primary" : "text-on-surface"}`}>{value}</dd>
    </div>
  );
}
