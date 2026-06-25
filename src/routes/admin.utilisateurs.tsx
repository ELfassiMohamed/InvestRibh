import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Eye, EyeOff, ShieldOff, ShieldCheck, RotateCcw } from "lucide-react";

import { PageHeader } from "@/components/AppShell";
import { platformUsers } from "@/lib/mock-data";
import type { UserRole } from "@/lib/mock-data";
import { formatDate, maskSensitive } from "@/lib/format";

export const Route = createFileRoute("/admin/utilisateurs")({
  component: UtilisateursPage,
});

const roles: UserRole[] = ["Investisseur", "Porteur de Projet", "Agent Conformité", "Super Admin"];

const allPermissions = [
  "Consulter projets",
  "Investir",
  "Consulter portefeuille",
  "Soumettre projet",
  "Suivi collecte",
  "Suivi chantier",
  "Valider dossiers",
  "Consulter eKYC",
  "Voir données sensibles (CIN/RIB)",
  "Suspendre comptes",
  "Gérer rôles",
  "Configurer plateforme",
];

const defaultMatrix: Record<UserRole, string[]> = {
  Investisseur: ["Consulter projets", "Investir", "Consulter portefeuille"],
  "Porteur de Projet": ["Soumettre projet", "Suivi collecte", "Suivi chantier"],
  "Agent Conformité": ["Valider dossiers", "Consulter eKYC", "Voir données sensibles (CIN/RIB)", "Suspendre comptes"],
  "Super Admin": [...allPermissions],
};

function UtilisateursPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "Tous">("Tous");
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [matrix, setMatrix] = useState<Record<UserRole, string[]>>(defaultMatrix);

  const togglePermission = (role: UserRole, permission: string) => {
    setMatrix((prev) => {
      const current = prev[role];
      const has = current.includes(permission);
      return {
        ...prev,
        [role]: has
          ? current.filter((p) => p !== permission)
          : [...current, permission],
      };
    });
  };

  const hasPermission = (role: UserRole, permission: string) =>
    matrix[role].includes(permission);

  const countEnabled = (perm: string) =>
    roles.filter((r) => matrix[r].includes(perm)).length;

  const filtered = platformUsers.filter(
    (u) =>
      (roleFilter === "Tous" || u.role === roleFilter) &&
      (u.nom.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())),
  );

  const toggleReveal = (id: string) => {
    const next = new Set(revealed);
    next.has(id) ? next.delete(id) : next.add(id);
    setRevealed(next);
  };

  return (
    <>
      <PageHeader
        title="Gestion des utilisateurs"
        description="Matrice de rôles RBAC et liste des comptes."
      />

      {/* Matrice de permissions */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="headline-md text-on-surface">Matrice des rôles</h2>
          <button
            onClick={() => setMatrix(defaultMatrix)}
            className="flex items-center gap-1.5 rounded-md border border-outline-variant px-3 py-1.5 text-xs font-medium text-on-surface-variant hover:bg-surface-container"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Réinitialiser
          </button>
        </div>
        <div className="card-elevated overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-low">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">Permission</th>
                {roles.map((r) => (
                  <th key={r} className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    {r}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
              {allPermissions.map((perm) => (
                <tr key={perm} className="hover:bg-surface-low/50">
                  <td className="px-4 py-2.5 text-on-surface">
                    <div className="flex items-center gap-2">
                      <span>{perm}</span>
                      <span className="text-[10px] text-on-surface-variant/60">({countEnabled(perm)}/{roles.length})</span>
                    </div>
                  </td>
                  {roles.map((r) => {
                    const has = hasPermission(r, perm);
                    return (
                      <td key={r} className="px-4 py-2.5 text-center">
                        <button
                          onClick={() => togglePermission(r, perm)}
                          className={`mx-auto block h-6 w-6 rounded-md transition-colors ${
                            has
                              ? "bg-success/20 hover:bg-success/30"
                              : "bg-surface-container hover:bg-surface-container-hover"
                          }`}
                          title={has ? `Retirer ${perm} pour ${r}` : `Ajouter ${perm} pour ${r}`}
                        >
                          {has && <span className="mx-auto block h-2 w-2 rounded-full bg-success" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Liste utilisateurs */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="headline-md text-on-surface">Comptes utilisateurs ({filtered.length})</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Rechercher…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-md border border-outline-variant py-2 pl-9 pr-3 text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as UserRole | "Tous")}
              className="rounded-md border border-outline-variant px-3 py-2 text-sm focus:border-primary focus:outline-none"
            >
              <option value="Tous">Tous les rôles</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="card-elevated overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-low text-left">
                <tr>
                  <Th>Utilisateur</Th>
                  <Th>Rôle</Th>
                  <Th>CIN</Th>
                  <Th>RIB</Th>
                  <Th>Statut</Th>
                  <Th>Inscrit</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50">
                {filtered.map((u) => {
                  const isRevealed = revealed.has(u.id);
                  return (
                    <tr key={u.id} className="hover:bg-surface-low">
                      <Td>
                        <p className="font-semibold text-on-surface">{u.nom}</p>
                        <p className="text-xs text-on-surface-variant">{u.email}</p>
                      </Td>
                      <Td>
                        <RoleBadge role={u.role} />
                      </Td>
                      <Td>
                        <span className="font-mono text-xs">{isRevealed ? u.cin : maskSensitive(u.cin)}</span>
                      </Td>
                      <Td>
                        <span className="font-mono text-xs">{isRevealed ? u.rib : maskSensitive(u.rib)}</span>
                      </Td>
                      <Td>
                        <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          u.statut === "Actif" ? "bg-success/10 text-success"
                          : u.statut === "Suspendu" ? "bg-error/10 text-error"
                          : "bg-warning/10 text-warning"
                        }`}>{u.statut}</span>
                      </Td>
                      <Td>{formatDate(u.dateInscription)}</Td>
                      <Td>
                        <div className="flex gap-1">
                          <button
                            onClick={() => toggleReveal(u.id)}
                            className="grid h-8 w-8 place-items-center rounded-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                            aria-label="Révéler données sensibles"
                          >
                            {isRevealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                          <button
                            className="grid h-8 w-8 place-items-center rounded-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                            aria-label={u.statut === "Suspendu" ? "Réactiver" : "Suspendre"}
                          >
                            {u.statut === "Suspendu" ? <ShieldCheck className="h-4 w-4 text-success" /> : <ShieldOff className="h-4 w-4" />}
                          </button>
                        </div>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

function RoleBadge({ role }: { role: UserRole }) {
  const tone =
    role === "Super Admin" ? "bg-primary text-on-primary"
    : role === "Agent Conformité" ? "bg-tertiary text-on-tertiary"
    : role === "Porteur de Projet" ? "bg-secondary text-on-secondary"
    : "bg-secondary-container text-on-secondary-container";
  return (
    <span className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${tone}`}>
      {role}
    </span>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 align-top">{children}</td>;
}
