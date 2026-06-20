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

export const Route = createFileRoute("/investisseur")({
  beforeLoad: () => {
    const user = getStoredUser();
    if (!user) throw redirect({ to: "/login" });
    if (user.role !== "Investisseur") throw redirect({ to: "/login" });
  },
  component: InvestisseurLayout,
});

const nav = [
  { label: "Tableau de bord", to: "/investisseur" },
  { label: "Simulateur ROI", to: "/investisseur/simulateur-roi" },
  { label: "Mon portefeuille", to: "/investisseur/portefeuille" },
];

function InvestisseurLayout() {
  const { user } = useAuth();
  return (
    <AppShell zone="Investisseur" nav={nav}>
      <Outlet />
    </AppShell>
  );
}
