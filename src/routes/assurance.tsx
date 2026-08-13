import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, ShieldCheck, User } from "lucide-react";

import logoImage from "@/assets/place2invest_logo.png";
import { ExploitationAssurance } from "@/components/ExploitationAssurance";

export const Route = createFileRoute("/assurance")({
  head: () => ({
    meta: [
      { title: "Assurance par méthode d'exploitation — Place2Invest" },
      {
        name: "description",
        content:
          "Chaque voie d'exploitation immobilière est couverte par un produit d'assurance aux critères stricts : garantie chantier, protection loyers, garantie revenus touristiques et valeur de revente.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AssurancePage,
});

function AssurancePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-surface">
      {/* Top bar */}
      <div className="border-b border-outline-variant bg-surface-lowest">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="Place2Invest" className="h-9 rounded-lg object-contain" />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/projets"
              className="hidden items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface sm:flex"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("assurance.backToProjects")}
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container"
            >
              <User className="h-4 w-4" />
              {t("common.login")}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="label-sm text-primary">{t("assurance.badge")}</p>
          <h1 className="headline-lg mt-2 text-on-surface">{t("assurance.title")}</h1>
          <p className="mt-3 text-on-surface-variant">{t("assurance.subtitle")}</p>
        </div>

        <ExploitationAssurance showHeader={false} />

        <div className="card-elevated mt-14 flex flex-col items-start gap-4 bg-surface-lowest p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-on-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="headline-md text-on-surface">{t("assurance.ctaTitle")}</h2>
              <p className="mt-1 text-sm text-on-surface-variant">{t("assurance.ctaDesc")}</p>
            </div>
          </div>
          <Link
            to="/projets"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container"
          >
            {t("assurance.ctaAction")}
            <ArrowRight className="h-4 w-4" />
          </Link>
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
