import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
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

function PorteurLayout() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const nav = [
    { label: t("porteur.nav.overview"), to: "/porteur-de-projet" },
    { label: t("porteur.nav.submit"), to: "/porteur-de-projet/soumission" },
    { label: t("porteur.nav.collecte"), to: "/porteur-de-projet/collecte/casa-anfa-residences" },
    { label: t("porteur.nav.chantier"), to: "/porteur-de-projet/chantier/casa-anfa-residences" },
    { label: t("porteur.nav.verification"), to: "/porteur-de-projet/verification-reglementaire" },
  ];
  return (
    <AppShell zone="Porteur de Projet" nav={nav}>
      <Outlet />
    </AppShell>
  );
}
