import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/lib/mock-data";
import { formatMAD, formatPercent } from "@/lib/format";
import { FundingProgressBar } from "./FundingProgressBar";
import { RiskScoreBadge } from "./RiskScoreBadge";

export function ProjectCard({ project }: { project: Project }) {
  const [fav, setFav] = useState(false);

  return (
    <Link
      to="/investisseur/projets/$id"
      params={{ id: project.id }}
      className="card-elevated group block overflow-hidden hover:card-elevated-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.nom}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-md bg-on-surface/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-inverse-on-surface backdrop-blur-md">
          {project.typologie}
        </span>
        {project.featured && (
          <span className="absolute right-12 top-3 rounded-md bg-accent-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-on-surface">
            Coup de cœur
          </span>
        )}
        <button
          aria-label="Ajouter aux favoris"
          onClick={(e) => {
            e.preventDefault();
            setFav(!fav);
          }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-surface-lowest/90 backdrop-blur-md transition-transform hover:scale-110"
        >
          <Heart className={`h-4 w-4 ${fav ? "fill-error text-error" : "text-on-surface"}`} />
        </button>
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="headline-md truncate text-on-surface">{project.nom}</h3>
            <p className="mt-0.5 text-sm text-on-surface-variant">{project.ville}</p>
          </div>
          <RiskScoreBadge score={project.scoreRisque} label={project.scoreLabel} />
        </div>

        <FundingProgressBar
          current={project.montantCollecte}
          target={project.objectifCollecte}
        />

        <div className="grid grid-cols-2 gap-3 border-t border-outline-variant/50 pt-3 text-sm">
          <div>
            <p className="text-xs text-on-surface-variant">Ticket min.</p>
            <p className="font-semibold text-on-surface">{formatMAD(project.ticketMinimum)}</p>
          </div>
          <div>
            <p className="text-xs text-on-surface-variant">Rendement cible</p>
            <p className="font-semibold text-primary">{formatPercent(project.rendementCible)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
