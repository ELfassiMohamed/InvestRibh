import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/porteur-de-projet")({
  component: PorteurLayout,
});

const nav = [
  { label: "Vue d'ensemble", to: "/porteur-de-projet" },
  { label: "Soumettre un projet", to: "/porteur-de-projet/soumission" },
  { label: "Suivi de collecte", to: "/porteur-de-projet/collecte/casa-anfa-residences" },
  { label: "Suivi de chantier", to: "/porteur-de-projet/chantier/casa-anfa-residences" },
];

function PorteurLayout() {
  return (
    <AppShell
      zone="Porteur de Projet"
      user={{ nom: "Atlas Promotion", role: "Promoteur agréé" }}
      nav={nav}
    >
      <Outlet />
    </AppShell>
  );
}
