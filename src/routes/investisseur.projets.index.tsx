import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter } from "lucide-react";

import { PageHeader } from "@/components/AppShell";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/mock-data";

export const Route = createFileRoute("/investisseur/projets/")({
  component: ProjetsPage,
});

const villes = ["Toutes", ...Array.from(new Set(projects.map((p) => p.ville)))];
const typologies = ["Toutes", ...Array.from(new Set(projects.map((p) => p.typologie)))];
const statuts = ["Tous", "En collecte", "Financé", "En construction", "Livré"];

function ProjetsPage() {
  const [ville, setVille] = useState("Toutes");
  const [typologie, setTypologie] = useState("Toutes");
  const [statut, setStatut] = useState("Tous");
  const [ticketMax, setTicketMax] = useState(50_000);
  const [rendementMin, setRendementMin] = useState(0);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (ville === "Toutes" || p.ville === ville) &&
          (typologie === "Toutes" || p.typologie === typologie) &&
          (statut === "Tous" || p.statut === statut) &&
          p.ticketMinimum <= ticketMax &&
          p.rendementCible >= rendementMin,
      ),
    [ville, typologie, statut, ticketMax, rendementMin],
  );

  return (
    <>
      <PageHeader
        title="Catalogue de projets"
        description={`${filtered.length} projets disponibles à l'investissement.`}
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Filtres */}
        <aside className="card-elevated h-fit p-5">
          <div className="mb-4 flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            <p className="label-sm text-on-surface">Filtrer votre recherche</p>
          </div>

          <FilterSelect label="Ville" value={ville} options={villes} onChange={setVille} />
          <FilterSelect label="Typologie" value={typologie} options={typologies} onChange={setTypologie} />
          <FilterSelect label="Statut" value={statut} options={statuts} onChange={setStatut} />

          <div className="mt-5">
            <label className="label-sm text-on-surface-variant">
              Ticket maximum : {ticketMax.toLocaleString("fr-FR")} MAD
            </label>
            <input
              type="range"
              min={5_000}
              max={50_000}
              step={5_000}
              value={ticketMax}
              onChange={(e) => setTicketMax(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </div>

          <div className="mt-5">
            <label className="label-sm text-on-surface-variant">
              Rendement minimum : {rendementMin.toFixed(1)} %
            </label>
            <input
              type="range"
              min={0}
              max={15}
              step={0.5}
              value={rendementMin}
              onChange={(e) => setRendementMin(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </div>

          <button
            onClick={() => {
              setVille("Toutes");
              setTypologie("Toutes");
              setStatut("Tous");
              setTicketMax(50_000);
              setRendementMin(0);
            }}
            className="mt-6 w-full rounded-md border border-outline-variant px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-container"
          >
            Réinitialiser
          </button>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="card-elevated p-12 text-center text-on-surface-variant">
              Aucun projet ne correspond à ces critères.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-4">
      <label className="label-sm text-on-surface-variant">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-md border border-outline-variant bg-surface-lowest px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
