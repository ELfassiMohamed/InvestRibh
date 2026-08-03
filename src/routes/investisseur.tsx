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

export const Route = createFileRoute("/investisseur")({
  beforeLoad: () => {
    const user = getStoredUser();
    if (!user) throw redirect({ to: "/login" });
    if (user.role !== "Investisseur") throw redirect({ to: "/login" });
  },
  component: InvestisseurLayout,
});

function InvestisseurLayout() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const nav = [
    { label: t("investor.nav.dashboard"), to: "/investisseur" },
    { label: t("investor.nav.simulateur"), to: "/investisseur/simulateur-roi" },
    { label: t("investor.nav.portefeuille"), to: "/investisseur/portefeuille" },
    { label: t("investor.nav.verification"), to: "/investisseur/verification-reglementaire" },
  ];
  return (
    <AppShell zone="Investisseur" nav={nav}>
      <Outlet />
    </AppShell>
  );
}
