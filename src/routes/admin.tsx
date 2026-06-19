import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/admin") {
      throw redirect({ to: "/admin/validation-ia" });
    }
  },
  component: AdminLayout,
});

const nav = [
  { label: "Validation IA & conformité", to: "/admin/validation-ia" },
  { label: "Gestion des utilisateurs", to: "/admin/utilisateurs" },
  { label: "Audit & eKYC", to: "/admin/audit-ekyc" },
];

function AdminLayout() {
  return (
    <AppShell
      zone="Conformité"
      user={{ nom: "Salma Ouazzani", role: "Agent Conformité" }}
      nav={nav}
    >
      <Outlet />
    </AppShell>
  );
}
