import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/investisseur")({
  component: InvestisseurLayout,
});

const nav = [
  { label: "Tableau de bord", to: "/investisseur" },
  { label: "Catalogue de projets", to: "/investisseur/projets" },
  { label: "Simulateur ROI", to: "/investisseur/simulateur-roi" },
  { label: "Mon portefeuille", to: "/investisseur/portefeuille" },
];

function InvestisseurLayout() {
  return (
    <AppShell
      zone="Investisseur"
      user={{ nom: "Yasmine El Idrissi", role: "Investisseuse · KYC validé" }}
      nav={nav}
    >
      <Outlet />
    </AppShell>
  );
}
