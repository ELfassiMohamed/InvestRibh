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

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/admin") {
      throw redirect({ to: "/admin/validation-ia" });
    }
    const user = getStoredUser();
    if (!user) throw redirect({ to: "/login" });
    if (user.role !== "Agent Conformité" && user.role !== "Super Admin") {
      throw redirect({ to: "/login" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const nav = [
    { label: t("admin.navValidation"), to: "/admin/validation-ia" },
    { label: t("admin.navUtilisateurs"), to: "/admin/utilisateurs" },
    { label: t("admin.navAudit"), to: "/admin/audit-ekyc" },
  ];
  return (
    <AppShell
      zone="Conformité"
      nav={nav}
    >
      <Outlet />
    </AppShell>
  );
}
