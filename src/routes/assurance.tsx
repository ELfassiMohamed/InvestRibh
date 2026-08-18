import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Navbar1 } from "@/components/ui/navbar-1";
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
      {/* Navbar */}
      <Navbar1 />

      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="label-sm text-primary">{t("assurance.badge")}</p>
          <h1 className="headline-lg mt-2 text-on-surface">{t("assurance.title")}</h1>
          <p className="mt-3 text-on-surface-variant">{t("assurance.subtitle")}</p>
        </div>

        <ExploitationAssurance showHeader={false} />
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
