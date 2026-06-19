import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Search, ShieldCheck, Upload, UserCheck, Camera, AlertCircle, Filter } from "lucide-react";

import { PageHeader } from "@/components/AppShell";
import { auditLogs } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/audit-ekyc")({
  component: AuditEkycPage,
});

const ekycDossiers = [
  { user: "Yasmine El Idrissi", cinStatut: "validé", livenessStatut: "validé", ribStatut: "validé", date: "2026-06-12", banque: "Attijariwafa Bank" },
  { user: "Karim Benali", cinStatut: "en revue", livenessStatut: "à effectuer", ribStatut: "en attente", date: "2026-06-17", banque: "—" },
  { user: "Hassan Rachidi", cinStatut: "validé", livenessStatut: "validé", ribStatut: "en revue", date: "2026-06-15", banque: "BCP" },
  { user: "Nadia Cherkaoui", cinStatut: "rejeté", livenessStatut: "validé", ribStatut: "validé", date: "2026-06-10", banque: "CIH Bank" },
];

function AuditEkycPage() {
  const [tab, setTab] = useState<"audit" | "ekyc">("audit");
  const [search, setSearch] = useState("");

  return (
    <>
      <PageHeader
        title="Audit & eKYC"
        description="Conformité Bank Al-Maghrib · vérification d'identité et traçabilité complète."
        actions={
          <button className="flex items-center gap-1.5 rounded-md border border-outline-variant px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-container">
            <Download className="h-4 w-4" /> Exporter
          </button>
        }
      />

      <div className="mb-6 inline-flex rounded-lg bg-surface-container p-1">
        <button
          onClick={() => setTab("audit")}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
            tab === "audit" ? "bg-surface-lowest text-primary shadow-sm" : "text-on-surface-variant"
          }`}
        >
          Journal d'audit
        </button>
        <button
          onClick={() => setTab("ekyc")}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
            tab === "ekyc" ? "bg-surface-lowest text-primary shadow-sm" : "text-on-surface-variant"
          }`}
        >
          Vérifications eKYC
        </button>
      </div>

      {tab === "audit" && (
        <section>
          <div className="mb-4 flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Rechercher utilisateur, action, entité…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-md border border-outline-variant py-2 pl-9 pr-3 text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <button className="flex items-center gap-1.5 rounded-md border border-outline-variant px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-container">
              <Filter className="h-4 w-4" /> Filtres avancés
            </button>
          </div>

          <div className="card-elevated overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-surface-low text-left">
                  <tr>
                    <Th>Horodatage</Th>
                    <Th>Utilisateur</Th>
                    <Th>Rôle</Th>
                    <Th>Action</Th>
                    <Th>Entité</Th>
                    <Th>IP</Th>
                    <Th>ID</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/50">
                  {auditLogs
                    .filter(
                      (l) =>
                        !search ||
                        l.utilisateur.toLowerCase().includes(search.toLowerCase()) ||
                        l.action.toLowerCase().includes(search.toLowerCase()) ||
                        l.entite.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map((l) => (
                      <tr key={l.id} className="hover:bg-surface-low">
                        <Td className="font-mono text-xs">{l.horodatage}</Td>
                        <Td className="font-semibold">{l.utilisateur}</Td>
                        <Td>
                          <span className="rounded-md bg-surface-container px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                            {l.role}
                          </span>
                        </Td>
                        <Td>{l.action}</Td>
                        <Td className="font-mono text-xs text-primary">{l.entite}</Td>
                        <Td className="font-mono text-xs text-on-surface-variant">{l.ip}</Td>
                        <Td className="font-mono text-xs text-on-surface-variant">{l.id}</Td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {tab === "ekyc" && (
        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <h3 className="headline-md mb-4 text-on-surface">Dossiers eKYC</h3>
            <div className="card-elevated overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-surface-low text-left">
                    <tr>
                      <Th>Utilisateur</Th>
                      <Th>CIN</Th>
                      <Th>Vivacité</Th>
                      <Th>RIB</Th>
                      <Th>Banque</Th>
                      <Th>Date</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/50">
                    {ekycDossiers.map((d) => (
                      <tr key={d.user} className="hover:bg-surface-low">
                        <Td className="font-semibold">{d.user}</Td>
                        <Td><EkycStatusBadge statut={d.cinStatut} /></Td>
                        <Td><EkycStatusBadge statut={d.livenessStatut} /></Td>
                        <Td><EkycStatusBadge statut={d.ribStatut} /></Td>
                        <Td>{d.banque}</Td>
                        <Td>{d.date}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card-elevated p-5">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h3 className="headline-md text-on-surface">Module eKYC</h3>
              </div>
              <p className="text-xs text-on-surface-variant">
                Conforme aux exigences Bank Al-Maghrib pour l'identification à distance.
              </p>

              <label className="mt-4 flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-outline-variant py-6 text-on-surface-variant hover:border-primary hover:bg-surface-low">
                <Upload className="h-5 w-5" />
                <span className="text-xs font-medium">CIN recto</span>
                <input type="file" className="hidden" />
              </label>
              <label className="mt-2 flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-outline-variant py-6 text-on-surface-variant hover:border-primary hover:bg-surface-low">
                <Upload className="h-5 w-5" />
                <span className="text-xs font-medium">CIN verso</span>
                <input type="file" className="hidden" />
              </label>
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-on-primary hover:bg-primary-container">
                <Camera className="h-4 w-4" />
                Lancer la vérification de vivacité
              </button>
            </div>

            <div className="card-elevated p-5">
              <p className="label-sm text-on-surface-variant">Statistiques eKYC</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><UserCheck className="h-4 w-4 text-success" /> Validés</span>
                  <span className="font-bold text-on-surface">847</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><AlertCircle className="h-4 w-4 text-warning" /> En revue</span>
                  <span className="font-bold text-on-surface">23</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><AlertCircle className="h-4 w-4 text-error" /> Rejetés</span>
                  <span className="font-bold text-on-surface">12</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function EkycStatusBadge({ statut }: { statut: string }) {
  const tone =
    statut === "validé" ? "bg-success/10 text-success"
    : statut === "rejeté" ? "bg-error/10 text-error"
    : statut === "en revue" ? "bg-warning/10 text-warning"
    : "bg-surface-container text-on-surface-variant";
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tone}`}>
      {statut}
    </span>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}
