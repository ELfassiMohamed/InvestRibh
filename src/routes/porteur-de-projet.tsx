import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/hooks/use-auth";

const AUTH_KEY = "place2invest_user";

function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export const Route = createFileRoute("/porteur-de-projet")({
  beforeLoad: () => {
    const user = getStoredUser();
    if (!user) throw redirect({ to: "/login" });
    if (user.role !== "Porteur de Projet") throw redirect({ to: "/login" });
  },
  component: PorteurLayout,
});

const nav = [
  { label: "Vue d'ensemble", to: "/porteur-de-projet" },
  { label: "Soumettre un projet", to: "/porteur-de-projet/soumission" },
  { label: "Suivi de collecte", to: "/porteur-de-projet/collecte/casa-anfa-residences" },
  { label: "Suivi de chantier", to: "/porteur-de-projet/chantier/casa-anfa-residences" },
];

function PorteurLayout() {
  const { user } = useAuth();
  return (
    <AppShell zone="Porteur de Projet" nav={nav}>
      <Outlet />
    </AppShell>
  );
}
