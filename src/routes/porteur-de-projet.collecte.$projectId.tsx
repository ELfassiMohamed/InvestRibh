import { createFileRoute, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Check, Lock, TrendingUp, Users, Clock } from "lucide-react";

import { PageHeader } from "@/components/AppShell";
import { FundingProgressBar } from "@/components/FundingProgressBar";
import { KpiCard } from "@/components/KpiCard";
import { useProject } from "@/hooks/use-queries";
import { formatMAD } from "@/lib/format";

export const Route = createFileRoute("/porteur-de-projet/collecte/$projectId")({
  component: CollectePage,
});

const evolutionCollecte = [
  { jour: "S-12", collecte: 4_200_000 },
  { jour: "S-10", collecte: 9_800_000 },
  { jour: "S-8", collecte: 15_600_000 },
  { jour: "S-6", collecte: 23_400_000 },
  { jour: "S-4", collecte: 31_200_000 },
  { jour: "S-2", collecte: 38_100_000 },
  { jour: "Auj.", collecte: 42_300_000 },
];

const paliers = [
  { seuil: 10_000_000, labelKey: "porteur.collectePage.palier1", debloque: true },
  { seuil: 25_000_000, labelKey: "porteur.collectePage.palier2", debloque: true },
  { seuil: 40_000_000, labelKey: "porteur.collectePage.palier3", debloque: true },
  { seuil: 52_000_000, labelKey: "porteur.collectePage.palier4", debloque: false },
];

function CollectePage() {
  const { t } = useTranslation();
  const { projectId } = Route.useParams();
  const { data: project, isLoading, isError } = useProject(projectId);

  if (isLoading) {
    return (
      <>
        <PageHeader title={t("investor.loading")} description={t("investor.loadingSub")} />
        <p className="text-sm text-on-surface-variant">{t("investor.projets.fetching")}</p>
      </>
    );
  }

  if (isError || !project) {
    throw notFound();
  }

  const ticketMoyen = Math.round(project.montantCollecte / project.investisseurs);

  return (
    <>
      <PageHeader
        title={`${t("porteur.collectePage.title")} — ${project.nom}`}
        description={`${project.ville} · ${project.typologie}`}
      />

      <div className="card-elevated mb-6 p-6">
        <FundingProgressBar current={project.montantCollecte} target={project.objectifCollecte} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label={t("porteur.collectePage.investisseurs")} value={String(project.investisseurs)} hint={t("porteur.collectePage.souscripteurs")} icon={<Users className="h-5 w-5" />} />
        <KpiCard label={t("porteur.collectePage.ticketMoyen")} value={formatMAD(ticketMoyen)} icon={<TrendingUp className="h-5 w-5" />} />
        <KpiCard label={t("porteur.collectePage.joursRestants")} value={`${project.joursRestants} j`} hint={t("porteur.collectePage.avantCloture")} icon={<Clock className="h-5 w-5" />} />
        <KpiCard label={t("porteur.collectePage.resteCollecter")} value={formatMAD(project.objectifCollecte - project.montantCollecte)} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="card-elevated p-6">
          <h3 className="headline-md text-on-surface">{t("porteur.collectePage.evolution")}</h3>
          <p className="mt-1 text-xs text-on-surface-variant">{t("porteur.collectePage.dernieresSemaines")}</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <AreaChart data={evolutionCollecte}>
                <defs>
                  <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#693f2c" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#693f2c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eeeeee" vertical={false} />
                <XAxis dataKey="jour" stroke="#84746e" fontSize={12} />
                <YAxis stroke="#84746e" fontSize={12} tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} />
                <Tooltip formatter={(v: number) => formatMAD(v)} contentStyle={{ borderRadius: 8 }} />
                <Area type="monotone" dataKey="collecte" stroke="#693f2c" strokeWidth={2.5} fill="url(#gc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated p-6">
          <h3 className="headline-md text-on-surface">{t("porteur.collectePage.paliers")}</h3>
          <p className="mt-1 text-xs text-on-surface-variant">{t("porteur.collectePage.paliersDesc")}</p>
          <ul className="mt-5 space-y-4">
            {paliers.map((p) => (
              <li key={p.seuil} className="flex items-start gap-3">
                <div
                  className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                    p.debloque ? "bg-success text-on-success" : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  {p.debloque ? <Check className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-on-surface">{t(p.labelKey)}</p>
                  <p className="text-xs text-on-surface-variant">{t("porteur.collectePage.seuil")} : {formatMAD(p.seuil)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
