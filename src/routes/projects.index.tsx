import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, User, Building2, Bitcoin, Rocket, HeartHandshake, Users, Gem } from "lucide-react";

import logoImage from "@/assets/place2invest_logo.png";
import catImmobilier from "@/assets/cat-immobilier.jpg";
import catCrypto from "@/assets/cat-crypto.jpg";
import catStartup from "@/assets/cat-startup.jpg";
import catSolidaire from "@/assets/cat-solidaire.jpg";
import catCrowdfunding from "@/assets/cat-crowdfunding.jpg";
import catValeur from "@/assets/cat-valeur.jpg";
import { useProjects } from "@/hooks/use-queries";
import {
  getSlugForCategorie,
  sectionMeta,
  sectionOrder,
  type ProjectCategorie,
} from "@/lib/mock-data";

export const Route = createFileRoute("/projects/")({
  component: ProjectsSectionsPage,
});

const sectionCards: {
  categorie: ProjectCategorie;
  icon: typeof Building2;
  image: string;
}[] = [
  { categorie: "Immobilier", icon: Building2, image: catImmobilier },
  { categorie: "Crypto", icon: Bitcoin, image: catCrypto },
  { categorie: "Startup & Affaires", icon: Rocket, image: catStartup },
  { categorie: "Solidaire", icon: HeartHandshake, image: catSolidaire },
  { categorie: "Crowdfunding", icon: Users, image: catCrowdfunding },
  { categorie: "Produit de forte valeur", icon: Gem, image: catValeur },
];

function ProjectsSectionsPage() {
  const { data: projects = [] } = useProjects();

  const countByCategorie = (categorie: ProjectCategorie) =>
    projects.filter((p: any) => p.categorie === categorie).length;

  return (
    <div className="min-h-screen bg-surface">
      {/* Top bar */}
      <div className="border-b border-outline-variant bg-surface-lowest">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="Place2Invest" className="h-9 rounded-lg object-contain" />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface sm:flex"
            >
              <ArrowLeft className="h-4 w-4" />
              Accueil
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-container"
            >
              <User className="h-4 w-4" />
              Se connecter
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8">
        <div className="mb-8">
          <h1 className="headline-lg text-on-surface">Sections d'investissement</h1>
          <p className="mt-1.5 text-on-surface-variant">
            Explorez chaque classe d'actifs sur sa page dédiée.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectionCards.map(({ categorie, icon: Icon, image }) => {
            const count = countByCategorie(categorie);
            const meta = sectionMeta[categorie];
            return (
              <Link
                key={categorie}
                to="/projects/$categorie"
                params={{ categorie: getSlugForCategorie(categorie) }}
                className="card-elevated group flex flex-col overflow-hidden bg-surface-lowest transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={image}
                    alt={meta.titre}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 rounded-md bg-on-surface/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-inverse-on-surface backdrop-blur-md">
                    {count} projet{count > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    <h2 className="headline-md text-on-surface">{meta.titre}</h2>
                  </div>
                  <p className="text-sm text-on-surface-variant">{meta.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary">
                    Voir la section
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 bg-inverse-surface text-inverse-on-surface">
        <div className="mx-auto max-w-[1280px] px-4 py-8 text-center text-xs opacity-60 sm:px-10">
          © {new Date().getFullYear()} Place2Invest. Investir comporte un risque de perte en capital.
        </div>
      </footer>
    </div>
  );
}
