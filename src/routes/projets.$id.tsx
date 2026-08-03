import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
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
  User,
} from "lucide-react";

import { FundingProgressBar } from "@/components/FundingProgressBar";
import { RiskScoreBadge } from "@/components/RiskScoreBadge";
import { formatMAD, formatPercent } from "@/lib/format";
import logoImage from "@/assets/place2invest_logo.png";
import { useProject } from "@/hooks/use-queries";

export const Route = createFileRoute("/projets/$id")({
  component: PublicProjetDetailPage,
});

function PublicProjetDetailPage() {
  const { t } = useTranslation();
  const { id } = Route.useParams();
  const { data: project, isLoading, isError } = useProject(id);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-surface"><p className="text-on-surface-variant">{t("common.loading")}</p></div>;
  }

  if (isError || !project) {
    throw notFound();
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Top bar */}
      <div className="border-b border-outline-variant bg-surface-lowest">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-8">
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <img src={logoImage} alt="Place2Invest" className="h-9 rounded-lg object-contain" />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/projets"
              className="hidden items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface sm:flex"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("projectDetail.tousProjets")}
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container"
            >
              <User className="h-4 w-4" />
              {t("projectDetail.loginInvest")}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8">
        <Link
          to="/projets"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> {t("projectDetail.backCatalogue")}
        </Link>

        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="headline-lg text-on-surface">{project.nom}</h1>
            <p className="mt-1 text-on-surface-variant">
              {project.typologie} · {project.ville}
            </p>
          </div>
          <RiskScoreBadge score={project.scoreRisque} label={project.scoreLabel} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Galerie + description */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl shadow-card">
              <img src={project.image} alt={project.nom} className="aspect-[16/10] w-full object-cover" />
            </div>

            <div className="card-elevated p-6">
              <h2 className="headline-md text-on-surface">{t("projectDetail.aPropos")}</h2>
              <p className="mt-3 text-on-surface-variant">{project.description}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <Detail icon={<MapPin className="h-4 w-4" />} label={t("projectDetail.localisation")} value={project.ville} />
                <Detail icon={<Calendar className="h-4 w-4" />} label={t("projectDetail.duree")} value={t("projectDetail.mois", { count: project.dureeMois })} />
                <Detail icon={<Users className="h-4 w-4" />} label={t("projectDetail.investisseurs")} value={String(project.investisseurs)} />
                <Detail icon={<TrendingUp className="h-4 w-4" />} label={t("projectDetail.rendementCible")} value={formatPercent(project.rendementCible)} />
                <Detail label={t("projectDetail.budgetTotal")} value={formatMAD(project.budgetTotal)} />
                <Detail label={t("projectDetail.ticketMin")} value={formatMAD(project.ticketMinimum)} />
              </div>
            </div>

            {/* Analyse IA */}
            <div className="card-elevated overflow-hidden">
              <div className="flex items-center gap-3 border-b border-outline-variant/50 bg-surface-low px-6 py-4">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-on-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="headline-md text-on-surface">{t("projectDetail.analyseIa")}</h2>
                  <p className="text-xs text-on-surface-variant">
                    {t("projectDetail.analyseIaSub", { score: project.scoreRisque })}
                  </p>
                </div>
              </div>
              <div className="grid gap-6 p-6 md:grid-cols-2">
                <div>
                  <p className="label-sm text-success">{t("projectDetail.pointsForts")}</p>
                  <ul className="mt-3 space-y-2">
                    {project.pointsForts.map((pt: string) => (
                      <li key={pt} className="flex gap-2 text-sm text-on-surface">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label-sm text-warning">{t("projectDetail.pointsVigilance")}</p>
                  <ul className="mt-3 space-y-2">
                    {project.pointsVigilance.map((pt: string) => (
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
              <h2 className="headline-md text-on-surface">{t("projectDetail.documents")}</h2>
              <ul className="mt-4 divide-y divide-outline-variant/50">
                {(t("projectDetail.docs", { returnObjects: true }) as string[]).map((doc: string) => (
                  <li key={doc} className="flex items-center justify-between py-3 text-sm">
                    <span className="text-on-surface">{doc}</span>
                    <button className="flex items-center gap-1.5 font-semibold text-primary hover:underline">
                      <Download className="h-4 w-4" /> {t("projectDetail.download")}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card-elevated overflow-hidden">
              <div className="border-b border-outline-variant/50 p-6">
                <FundingProgressBar
                  current={project.montantCollecte}
                  target={project.objectifCollecte}
                />
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-on-surface-variant">{t("projectDetail.investisseurs")}</p>
                    <p className="text-base font-bold text-on-surface">{project.investisseurs}</p>
                  </div>
                  <div>
                    <p className="text-on-surface-variant">{t("projectDetail.joursRestants")}</p>
                    <p className="text-base font-bold text-on-surface">{project.joursRestants}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 text-center">
                <p className="text-sm text-on-surface-variant">
                  {t("projectDetail.sidebarText")}
                </p>
                <Link
                  to="/login"
                  className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container"
                >
                  <User className="h-4 w-4" />
                  {t("projectDetail.sidebarLogin")}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 bg-inverse-surface text-inverse-on-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-8 text-center text-xs opacity-60 sm:px-10">
          © {new Date().getFullYear()} Place2Invest. {t("common.footer")}
        </div>
      </footer>
    </div>
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
