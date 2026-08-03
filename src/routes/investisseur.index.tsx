import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Wallet,
  TrendingUp,
  CalendarClock,
  Coins,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { PageHeader } from "@/components/AppShell";
import { KpiCard } from "@/components/KpiCard";
import { formatDate, formatMAD } from "@/lib/format";
import { useAuth } from "@/hooks/use-auth";
import { useInvestorDashboard, useProjects } from "@/hooks/use-queries";

export const Route = createFileRoute("/investisseur/")({
  component: DashboardPage,
});

const COLORS = ["#693f2c", "#845642", "#c9a44c", "#585e6c", "#46494c"];

function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: dashboard, isLoading } = useInvestorDashboard();
  const { data: allProjects = [] } = useProjects();

  if (isLoading || !dashboard) {
    return (
      <>
        <PageHeader title={t("investor.loading")} description={t("investor.loadingSub")} />
        <p className="text-sm text-on-surface-variant">{t("investor.fetching")}</p>
      </>
    );
  }

  const { holdings, transactions, portfolioEvolution, upcomingDistributions } = dashboard as any;
  const getProject = (id: string) => allProjects.find((p: any) => p.id === id);

  const valeurTotale = holdings.reduce((s: any, h: any) => s + h.valeurActuelle, 0);
  const totalInvesti = holdings.reduce((s: any, h: any) => s + h.unites * h.prixMoyen, 0);
  const dividendesCumules = transactions
    .filter((t: any) => t.type === "Dividende")
    .reduce((s: any, t: any) => s + t.montant, 0);
  const cashflowMensuel = Math.round(dividendesCumules / 6);
  const rendementMoyen =
    holdings.reduce((s: any, h: any) => {
      const p = getProject(h.projectId);
      return s + (p?.rendementCible ?? 0) * h.valeurActuelle;
    }, 0) / valeurTotale;

  const repartition = (holdings as any[]).reduce((acc: Record<string, number>, h: any) => {
    const p = getProject(h.projectId);
    if (!p) return acc;
    acc[p.typologie] = (acc[p.typologie] ?? 0) + h.valeurActuelle;
    return acc;
  }, {});
  const pieData = Object.entries(repartition).map(([name, value]) => ({ name, value }));

  return (
    <>
      <PageHeader
        title={t("investor.bonjour", { name: user?.nom?.split(" ")[0] ?? "Yasmine" })}
        description={t("investor.helloDesc")}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label={t("investor.kpi.valeurPortefeuille")}
          value={formatMAD(valeurTotale)}
          hint={t("investor.kpi.capitalInvesti", { value: formatMAD(totalInvesti) })}
          trend={6.2}
          icon={<Wallet className="h-5 w-5" />}
        />
        <KpiCard
          label={t("investor.kpi.cashflowMensuel")}
          value={formatMAD(cashflowMensuel)}
          hint={t("investor.kpi.moyenne6Mois")}
          trend={4.1}
          icon={<Coins className="h-5 w-5" />}
        />
        <KpiCard
          label={t("investor.kpi.dividendes")}
          value={formatMAD(dividendesCumules)}
          hint={t("investor.kpi.depuisPremier")}
          trend={12.4}
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <KpiCard
          label={t("investor.kpi.rendementMoyen")}
          value={`${rendementMoyen.toFixed(2)} %`}
          hint={t("investor.kpi.annualise")}
          trend={0.3}
          icon={<CalendarClock className="h-5 w-5" />}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="card-elevated p-6">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="label-sm text-on-surface-variant">{t("investor.evolution.label")}</p>
              <h2 className="headline-md mt-1 text-on-surface">{t("investor.evolution.title")}</h2>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={portfolioEvolution}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#693f2c" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#693f2c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eeeeee" vertical={false} />
                <XAxis dataKey="mois" stroke="#84746e" fontSize={12} />
                <YAxis
                  stroke="#84746e"
                  fontSize={12}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(v: number) => formatMAD(v)}
                  contentStyle={{ borderRadius: 8, border: "1px solid #d6c3bb" }}
                />
                <Area
                  type="monotone"
                  dataKey="valeur"
                  stroke="#693f2c"
                  strokeWidth={2.5}
                  fill="url(#g1)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated p-6">
          <p className="label-sm text-on-surface-variant">{t("investor.repartition.label")}</p>
          <h2 className="headline-md mt-1 text-on-surface">{t("investor.repartition.title")}</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => formatMAD(v)} />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* Prochaines distributions */}
        <div className="card-elevated p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="headline-md text-on-surface">{t("investor.distributions.title")}</h2>
            <span className="text-xs text-on-surface-variant">
              {t("investor.distributions.count", { count: upcomingDistributions.length })}
            </span>
          </div>
          <ul className="divide-y divide-outline-variant/50">
            {upcomingDistributions.map((d: any) => {
              const p = getProject(d.projectId);
              return (
                <li key={d.date + d.projectId} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-on-surface">{p?.nom}</p>
                    <p className="text-xs text-on-surface-variant">
                      {formatDate(d.date)} · {p?.ville}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-success">{formatMAD(d.montantEstime)}</p>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wide ${
                        d.statut === "Versé"
                          ? "text-success"
                          : d.statut === "En cours"
                          ? "text-warning"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {d.statut === "Versé" ? t("investor.distributions.versé") : d.statut === "En cours" ? t("investor.distributions.enCours") : d.statut}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Activité récente */}
        <div className="card-elevated p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="headline-md text-on-surface">{t("investor.activite.title")}</h2>
            <Link
              to="/investisseur/portefeuille"
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              {t("investor.activite.voirTout")}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="divide-y divide-outline-variant/50">
            {transactions.slice(0, 5).map((t: any) => (
              <li key={t.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-on-surface">
                    {t.type} {t.projet ? `· ${t.projet}` : ""}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {formatDate(t.date)} · {t.reference}
                  </p>
                </div>
                <span
                  className={`text-sm font-bold ${
                    t.montant >= 0 ? "text-success" : "text-on-surface"
                  }`}
                >
                  {t.montant >= 0 ? "+" : ""}
                  {formatMAD(t.montant)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="label-sm text-primary">{t("investor.suggestions.label")}</p>
            <h2 className="headline-md mt-1 text-on-surface">{t("investor.suggestions.title")}</h2>
          </div>
          <Link
            to="/projets"
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            {t("investor.suggestions.catalogue")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allProjects
            .filter((p: any) => p.statut === "En collecte")
            .slice(0, 3)
            .map((p: any) => (
              <Link
                key={p.id}
                to="/projets/$id"
                params={{ id: p.id }}
                className="card-elevated overflow-hidden hover:card-elevated-hover"
              >
                <img src={p.image} alt={p.nom} className="aspect-[16/9] w-full object-cover" />
                <div className="p-4">
                  <p className="text-xs text-on-surface-variant">{p.ville} · {p.typologie}</p>
                  <p className="mt-1 font-semibold text-on-surface">{p.nom}</p>
                  <p className="mt-1 text-sm font-bold text-primary">
                    {p.rendementCible.toFixed(1)} % {t("investor.suggestions.cible")}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
