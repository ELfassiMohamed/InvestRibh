/**
 * Données de démonstration pour la plateforme.
 * Focus IMMOBILIER — tous les montants sont en MAD.
 */

export type ProjectCategorie = "Immobilier";

export type ProjectType =
  | "Résidentiel"
  | "Commercial & Bureaux"
  | "Terrains & Lotissements"
  | "Projets neufs en collecte";

export type ProjectStatus = "En collecte" | "Financé" | "En construction" | "Livré";

export type ExploitationMode =
  | "Location longue durée"
  | "Location courte durée"
  | "Revente"
  | "Promotion immobilière (chantier)";

export const modeOrder: ExploitationMode[] = [
  "Location longue durée",
  "Location courte durée",
  "Revente",
  "Promotion immobilière (chantier)",
];

export const modeSlugs: Record<ExploitationMode, string> = {
  "Location longue durée": "location-longue-duree",
  "Location courte durée": "location-courte-duree",
  Revente: "revente",
  "Promotion immobilière (chantier)": "promotion-immobiliere",
};

export const modeBySlug: Record<string, ExploitationMode> = Object.fromEntries(
  Object.entries(modeSlugs).map(([mode, slug]) => [slug, mode as ExploitationMode]),
);

export const getSlugForMode = (mode: ExploitationMode) => modeSlugs[mode];
export const getModeForSlug = (slug: string) => modeBySlug[slug];

export interface Project {
  id: string;
  nom: string;
  ville: string;
  categorie: ProjectCategorie;
  typologie: ProjectType;
  modes: ExploitationMode[];
  image: string;
  description: string;
  budgetTotal: number;
  montantCollecte: number;
  objectifCollecte: number;
  ticketMinimum: number;
  rendementCible: number; // % annuel
  dureeMois: number;
  scoreRisque: number; // 0-100 (100 = très sûr)
  scoreLabel: "Faible" | "Modéré" | "Élevé";
  statut: ProjectStatus;
  investisseurs: number;
  joursRestants: number;
  featured?: boolean;
  assurance: InsuranceProduct;
  pointsForts: string[];
  pointsVigilance: string[];
}

/* ───────────────────────────────────────────── */
/*  Méthodes d'exploitation & assurances         */
/* ───────────────────────────────────────────── */

export type ExploitationMethod = ExploitationMode;

export const exploitationMethods: ExploitationMode[] = modeOrder;

export interface InsuranceCritere {
  id: string;
  libelle: string;
}

export interface InsuranceProduct {
  id: string;
  method: ExploitationMode;
  nom: string;
  description: string;
  risqueCouvert: string;
  criteresStricts: InsuranceCritere[];
  primeAnnuelle: {
    type: "pourcentage" | "fixe";
    valeur: number;
    base: string;
    periode: "an" | "mois";
  };
  franchise: {
    type: "pourcentage" | "fixe";
    valeur: number;
    unite?: string;
  };
  partenaire: string;
}

export const insuranceProducts: InsuranceProduct[] = [
  {
    id: "assurance-chantier",
    method: "Promotion immobilière (chantier)",
    nom: "Garantie Chantier & Achèvement",
    description:
      "Sécurise votre investissement dans un programme neuf : achèvement des travaux, conformité d'exécution et validité du titre de propriété.",
    risqueCouvert:
      "Défaut d'achèvement des travaux, vices de conformité, inscription hypothécaire non purgée, retard de livraison.",
    criteresStricts: [
      { id: "c1", libelle: "Titre de propriété purgé et inscrit au nom du promoteur." },
      { id: "c2", libelle: "Permis de construire valide et en cours de validité." },
      { id: "c3", libelle: "Caution bancaire ou garantie financière couvrant 100% des travaux." },
      { id: "c4", libelle: "Score de risque IA du projet ≥ 75/100." },
      { id: "c5", libelle: "Garantie décennale et dci souscrites par le promoteur." },
    ],
    primeAnnuelle: { type: "pourcentage", valeur: 1.2, base: "montant investi", periode: "an" },
    franchise: { type: "pourcentage", valeur: 2, unite: "du montant réclamé" },
    partenaire: "AXA Art — Garantie construction",
  },
  {
    id: "assurance-location-longue",
    method: "Location longue durée",
    nom: "Protection Loyers & Dommages Locatifs",
    description:
      "Protège contre les impayés de loyer, les dommages locatifs et la responsabilité civile du locataire.",
    risqueCouvert:
      "Impayés de loyer, dommages locatifs, responsabilité civile du locataire, perte de revenus locatifs.",
    criteresStricts: [
      { id: "c1", libelle: "Diagnostic de performance énergétique (DPE) réalisé et transmis." },
      {
        id: "c2",
        libelle: "Garantie d'assurance décennale du bien toujours en cours de validité.",
      },
      { id: "c3", libelle: "Revenu mensuel du locataire ≥ 3 fois le loyer hors charges." },
      { id: "c4", libelle: "Caution bancaire ou caution solidaire bloquée sur un compte bloqué." },
      { id: "c5", libelle: "État des lieux d'entrée et de sortie signé par les deux parties." },
    ],
    primeAnnuelle: {
      type: "pourcentage",
      valeur: 3.5,
      base: "loyer mensuel TTC annuel",
      periode: "an",
    },
    franchise: { type: "fixe", valeur: 500, unite: "MAD par sinistre" },
    partenaire: "Wafacar Assurance — Location",
  },
  {
    id: "assurance-location-courte",
    method: "Location courte durée",
    nom: "Garantie Revenus & Dégâts Touristiques",
    description:
      "Couvre l'exploitation saisonnière : annulations, dégradations par occupants de passage et garantie de revenus touristiques.",
    risqueCouvert:
      "Pertes de revenus locatifs courts, dégradations causées par les occupants, risques d'annulation haute saison.",
    criteresStricts: [
      { id: "c1", libelle: "Logement meublé et équipé conformément aux normes en vigueur." },
      { id: "c2", libelle: "Conditions de location courte durée autorisées par la commune." },
      { id: "c3", libelle: "Assurance multirisque habitation professionnelle à jour." },
      { id: "c4", libelle: "Score de risque IA du bien ≥ 65/100." },
      { id: "c5", libelle: "Contrat de location types standardisés pour chaque mise en location." },
    ],
    primeAnnuelle: {
      type: "pourcentage",
      valeur: 4.2,
      base: "revenu locatif annuel estimé",
      periode: "an",
    },
    franchise: { type: "fixe", valeur: 750, unite: "MAD par sinistre" },
    partenaire: "Sanad Assurance — Location courte durée",
  },
  {
    id: "assurance-revente",
    method: "Revente",
    nom: "Garantie Valeur de Revente",
    description:
      "Assure contre le déclin de valeur, la difficulté de liquidité et le défaut de l'acquéreur final.",
    risqueCouvert:
      "Déclin de valeur du bien, difficulté de revente, défaut de l'acquéreur, marché immobilier tendu.",
    criteresStricts: [
      {
        id: "c1",
        libelle: "Étude de marché réalisée par un professionnel agréé (AGIRC, FNAIM, etc.).",
      },
      { id: "c2", libelle: "Période de détention minimale de 24 mois au compteur." },
      { id: "c3", libelle: "Score de risque IA du bien ≥ 65/100." },
      { id: "c4", libelle: "Diagnostic de liquidité préalable signé par un courtier agréé." },
      { id: "c5", libelle: "Clause de reprise garantie incluse dans le contrat de réservation." },
    ],
    primeAnnuelle: {
      type: "pourcentage",
      valeur: 1.8,
      base: "prix de revente estimé",
      periode: "an",
    },
    franchise: { type: "pourcentage", valeur: 3, unite: "du montant de la garantie" },
    partenaire: "Groupama — Garantie revente immobilier",
  },
];

export const getExploitationMethods = (): ExploitationMode[] => exploitationMethods;

export const getInsuranceByMethod = (method: ExploitationMode): InsuranceProduct | undefined =>
  insuranceProducts.find((i) => i.method === method);

export const getInsuranceByMode = getInsuranceByMethod;

export interface AssuranceParams {
  id: string;
  method: ExploitationMode;
  nom: string;
  description: string;
  risqueCouvert: string;
  criteresStricts: string[];
  primePourcentage: number;
  primeBase: string;
  franchise: { type: "pourcentage" | "fixe"; valeur: number; unite?: string };
  partenaire: string;
}

export const buildAssurance = ({
  id,
  method,
  nom,
  description,
  risqueCouvert,
  criteresStricts,
  primePourcentage,
  primeBase,
  franchise,
  partenaire,
}: AssuranceParams): InsuranceProduct => ({
  id,
  method,
  nom,
  description,
  risqueCouvert,
  criteresStricts: criteresStricts.map((libelle, i) => ({
    id: `${id}-c${i + 1}`,
    libelle,
  })),
  primeAnnuelle: {
    type: "pourcentage",
    valeur: primePourcentage,
    base: primeBase,
    periode: "an",
  },
  franchise,
  partenaire,
});

export const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`;

export const projects: Project[] = [
  {
    id: "casa-anfa-residences",
    nom: "Anfa Park Résidences",
    ville: "Casablanca",
    categorie: "Immobilier",
    typologie: "Résidentiel",
    modes: ["Location longue durée", "Revente"],
    image: img("photo-1568605114967-8130f3a36994"),
    description:
      "Programme résidentiel de standing au cœur du quartier Anfa, 48 appartements haut de gamme avec vue dégagée.",
    budgetTotal: 78_000_000,
    montantCollecte: 42_300_000,
    objectifCollecte: 52_000_000,
    ticketMinimum: 10_000,
    rendementCible: 9.4,
    dureeMois: 36,
    scoreRisque: 82,
    scoreLabel: "Faible",
    statut: "En collecte",
    investisseurs: 312,
    joursRestants: 21,
    featured: true,
    assurance: buildAssurance({
      id: "assurance-anfa-residences",
      method: "Location longue durée",
      nom: "Garantie Anfa Park Résidences",
      description:
        "Protection des revenus locatifs et de la valeur de revente pour le programme Anfa Park.",
      risqueCouvert:
        "Impayés de loyer, dégradations locatives et perte de valeur en cas de vente anticipée.",
      criteresStricts: [
        "Titre foncier purgé et inscrit au nom du promoteur.",
        "Score de risque du projet ≥ 80/100.",
        "Revenu du locataire ≥ 3× le loyer hors charges.",
        "Bail type signé avant mise en exploitation.",
        "Étude de liquidité du secteur Anfa jointe au dossier.",
      ],
      primePourcentage: 1.7,
      primeBase: "montant initial investi",
      franchise: { type: "pourcentage", valeur: 2.5, unite: "du montant réclamé" },
      partenaire: "AXA Art — Location longue durée",
    }),
    pointsForts: [
      "Promoteur reconnu, 14 livraisons antérieures conformes.",
      "Permis de construire délivré et titre foncier purgé.",
      "Pré-commercialisation à 38 % avant lancement.",
    ],
    pointsVigilance: ["Sensibilité au calendrier des livraisons publiques voisines."],
  },
  {
    id: "rabat-hay-riad-bureaux",
    nom: "Hay Riad Business Center",
    ville: "Rabat",
    categorie: "Immobilier",
    typologie: "Commercial & Bureaux",
    modes: ["Location longue durée"],
    image: img("photo-1497366216548-37526070297c"),
    description:
      "Immeuble tertiaire de 6 200 m² certifié HQE, déjà pré-loué à 62 % par deux administrations.",
    budgetTotal: 134_000_000,
    montantCollecte: 95_400_000,
    objectifCollecte: 95_400_000,
    ticketMinimum: 25_000,
    rendementCible: 7.8,
    dureeMois: 60,
    scoreRisque: 88,
    scoreLabel: "Faible",
    statut: "Financé",
    investisseurs: 487,
    joursRestants: 0,
    assurance: buildAssurance({
      id: "assurance-hay-riad",
      method: "Location longue durée",
      nom: "Garantie Hay Riad Business Center",
      description:
        "Couverture des impayés des locataires institutionnels et des dommages aux plateaux tertiaires.",
      risqueCouvert:
        "Impayés de loyers tertiaires, sinistres techniques et vacance locative prolongée.",
      criteresStricts: [
        "Baux fermes ≥ 9 ans souscrits par les locataires institutionnels.",
        "Taux d'occupation du portefeuille ≥ 95 % au moment de la souscription.",
        "Assurance multirisque déposée par le gestionnaire.",
        "Contrôle technique des installations CVC validé par bureau de contrôle agréé.",
        "Rapport de gestion trimestriel transmis au souscripteur.",
        "Mise à jour annuelle de l'évaluation du bien par expert certifié.",
      ],
      primePourcentage: 1.4,
      primeBase: "loyers annuels garantis",
      franchise: { type: "pourcentage", valeur: 2, unite: "du montant réclamé" },
      partenaire: "Sanad Assurance — Tertiaire",
    }),
    pointsForts: [
      "Locataires institutionnels avec baux fermes de 9 ans.",
      "Localisation prime, taux de vacance du secteur < 4 %.",
    ],
    pointsVigilance: ["Échéancier de chantier serré sur le lot CVC."],
  },
  {
    id: "marrakech-palmeraie-villas",
    nom: "Palmeraie Heritage Villas",
    ville: "Marrakech",
    categorie: "Immobilier",
    typologie: "Résidentiel",
    modes: ["Location courte durée", "Revente"],
    image: img("photo-1613490493576-7fde63acd811"),
    description:
      "12 villas d'architecte avec piscine privative dans la Palmeraie, marché locatif touristique premium.",
    budgetTotal: 56_000_000,
    montantCollecte: 18_900_000,
    objectifCollecte: 42_000_000,
    ticketMinimum: 15_000,
    rendementCible: 11.2,
    dureeMois: 48,
    scoreRisque: 71,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 156,
    joursRestants: 34,
    featured: true,
    assurance: buildAssurance({
      id: "assurance-palmeraie-villas",
      method: "Location courte durée",
      nom: "Garantie Palmeraie Heritage Villas",
      description:
        "Garantie des revenus locatifs touristiques et des dégâts causés par les locataires saisonniers.",
      risqueCouvert:
        "Dégradations par location courte durée, annulation de séjours et chute de taux d'occupation.",
      criteresStricts: [
        "Gestionnaire court séjour agréé et certifié par la plateforme.",
        "Occupation moyenne ≥ 150 nuits/an constatée sur 12 mois.",
        "Ameublement et équipements conformes au cahier des charges.",
        "Références vérifiées auprès de 3 propriétaires locatifs existants.",
      ],
      primePourcentage: 3.2,
      primeBase: "revenus locatifs annuels prévisionnels",
      franchise: { type: "pourcentage", valeur: 3, unite: "du montant réclamé" },
      partenaire: "Wafac Assurance — Location courte durée",
    }),
    pointsForts: [
      "Rendement locatif courte durée estimé à 8,5 % net.",
      "Étude de marché Knight Frank fournie.",
    ],
    pointsVigilance: ["Saisonnalité touristique forte.", "Dépendance à la demande internationale."],
  },
  {
    id: "tanger-med-logistique",
    nom: "Tanger Med Logistique Phase II",
    ville: "Tanger",
    categorie: "Immobilier",
    typologie: "Commercial & Bureaux",
    modes: ["Location longue durée"],
    image: img("photo-1565008447742-97f6f38c985c"),
    description:
      "Plateforme logistique de 24 000 m² adossée à la zone franche de Tanger Med, locataire industriel signé.",
    budgetTotal: 92_000_000,
    montantCollecte: 31_400_000,
    objectifCollecte: 64_000_000,
    ticketMinimum: 20_000,
    rendementCible: 8.6,
    dureeMois: 72,
    scoreRisque: 78,
    scoreLabel: "Faible",
    statut: "En collecte",
    investisseurs: 204,
    joursRestants: 12,
    assurance: buildAssurance({
      id: "assurance-tanger-med",
      method: "Location longue durée",
      nom: "Garantie Tanger Med Logistique",
      description:
        "Couverture du bail logistique signé avec le locataire industriel de la zone franche de Tanger Med.",
      risqueCouvert: "Impapiers du loyer industriel, dommages structurels du bâtiment logistique.",
      criteresStricts: [
        "Bail ferme 12 ans avec indexation annuelle obligatoire.",
        "Locataire noté ≥ BBB par agence de notation.",
        "Certificat de conformité incendie valide.",
        "Suivi du loyer par gestionnaire agréé.",
        "Rapport d'exploitation semestriel fourni à l'assureur.",
      ],
      primePourcentage: 1.3,
      primeBase: "loyers annuels garantis",
      franchise: { type: "pourcentage", valeur: 2, unite: "du montant réclamé" },
      partenaire: "Sanad Assurance — Logistique",
    }),
    pointsForts: [
      "Bail ferme 12 ans avec indexation annuelle.",
      "Zone franche : avantages fiscaux pour le locataire.",
    ],
    pointsVigilance: ["Concentration sur un locataire unique."],
  },
  {
    id: "agadir-marina-lots",
    nom: "Agadir Marina — Lots viabilisés",
    ville: "Agadir",
    categorie: "Immobilier",
    typologie: "Terrains & Lotissements",
    modes: ["Revente"],
    image: img("photo-1502672260266-1c1ef2d93688"),
    description:
      "Opération de viabilisation de 36 lots résidentiels en front de marina, revente progressive sur 24 mois.",
    budgetTotal: 28_000_000,
    montantCollecte: 22_750_000,
    objectifCollecte: 28_000_000,
    ticketMinimum: 5_000,
    rendementCible: 12.5,
    dureeMois: 24,
    scoreRisque: 65,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 421,
    joursRestants: 8,
    featured: true,
    assurance: buildAssurance({
      id: "assurance-agadir-marina",
      method: "Revente",
      nom: "Garantie Agadir Marina",
      description:
        "Protection de la marge en cas de revente progressive des lots viabilisés du front de marina.",
      risqueCouvert: "Déclin des prix de revente des lots et allongement du délai côtaus.",
      criteresStricts: [
        "Lots viabilisés et bornés avant démarrage de la revente.",
        "Prix de sortie plancher validé par expert immobilier.",
        "Carnet de réservations ≥ 40 % à la souscription.",
        "Rating du promoteur vérifié sur 3 opérations successives.",
      ],
      primePourcentage: 2.4,
      primeBase: "valeur de revente plancher",
      franchise: { type: "fixe", valeur: 25_000, unite: "MAD" },
      partenaire: "Groupama — Garantie revente",
    }),
    pointsForts: [
      "Carnet de réservations à 41 %.",
      "Sortie progressive : liquidité partielle dès 12 mois.",
    ],
    pointsVigilance: ["Cycle court, sensible à la conjoncture locale."],
  },
  {
    id: "bouskoura-garden-construction",
    nom: "Résidence Bouskoura Garden",
    ville: "Casablanca",
    categorie: "Immobilier",
    typologie: "Résidentiel",
    modes: ["Promotion immobilière (chantier)"],
    image: img("photo-1580587771525-78b9dba3b914"),
    description:
      "Promotion immobilière en chantier : 90 appartements à Bouskoura, gros œuvre engagé et livraison programmée à 18 mois.",
    budgetTotal: 64_000_000,
    montantCollecte: 22_400_000,
    objectifCollecte: 38_000_000,
    ticketMinimum: 7_000,
    rendementCible: 13.5,
    dureeMois: 24,
    scoreRisque: 76,
    scoreLabel: "Faible",
    statut: "En construction",
    investisseurs: 128,
    joursRestants: 15,
    assurance: buildAssurance({
      id: "assurance-bouskoura-chantier",
      method: "Promotion immobilière (chantier)",
      nom: "Garantie Chantier Bouskoura Garden",
      description:
        "Garantie d'achèvement du chantier et couverture des retards de livraison pour la résidence Bouskoura Garden.",
      risqueCouvert: "Retard de livraison, sinistre gros œuvre, hausse de coût des matériaux.",
      criteresStricts: [
        "Permis de construire valide et affiché sur site.",
        "Avancement gros œuvre ≥ 30 % constaté par expert.",
        "Promoteur disposant de références de 8 livraisons.",
        "Engagement de dommages-ouvrage souscrit par le promoteur.",
        "Plan d'assainissement financier du chantier approuvé.",
      ],
      primePourcentage: 4.5,
      primeBase: "montant initial investi par unité facturée",
      franchise: { type: "pourcentage", valeur: 4, unite: "du montant réclamé" },
      partenaire: "AXA Art — Garantie construction",
    }),
    pointsForts: [
      "Promoteur Atlas Promotion, 8 livraisons antérieures conformes.",
      "Permis de construire délivré et fondations réalisées.",
      "Pré-commercialisation à 45 % des unités.",
    ],
    pointsVigilance: [
      "Sensibilité aux délais des corps d'état secondaires.",
      "Dépendance à la conjoncture des matériaux.",
    ],
  },
  {
    id: "casa-zen-apartments",
    nom: "Casa Zen Apartments",
    ville: "Casablanca",
    categorie: "Immobilier",
    typologie: "Résidentiel",
    modes: ["Location courte durée", "Revente"],
    image: img("photo-1560448204-e02f11c3d0e2"),
    description:
      "28 studios meublés neufs en centre-ville de Casablanca, exploités en courte durée avec gestion clé en main.",
    budgetTotal: 34_000_000,
    montantCollecte: 12_800_000,
    objectifCollecte: 26_000_000,
    ticketMinimum: 8_000,
    rendementCible: 12.4,
    dureeMois: 36,
    scoreRisque: 69,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 89,
    joursRestants: 27,
    featured: true,
    assurance: buildAssurance({
      id: "assurance-casa-zen",
      method: "Location courte durée",
      nom: "Garantie Casa Zen Apartments",
      description:
        "Garantie des revenus courte durée et de l'état du mobilier des studios Casa Zen.",
      risqueCouvert:
        "Dégradations locatives, impayés de plateforme, variation du taux d'occupation.",
      criteresStricts: [
        "Gestion centralisée des plateformes courte durée.",
        "Occupation moyenne d'au moins 65 % sur 6 mois.",
        "Dossier de conformité incendie validé.",
        "Inventaire du mobilier signé à chaque entrée.",
        "Réserve de trésorerie d'un mois de loyers maintenue.",
      ],
      primePourcentage: 3.5,
      primeBase: "revenus locatifs annuels prévisionnels",
      franchise: { type: "pourcentage", valeur: 3, unite: "du montant réclamé" },
      partenaire: "Wafac Assurance — Courte durée",
    }),
    pointsForts: [
      "Livraison prévue sous 6 mois en studios meublés.",
      "Gestion centralisée court séjour incluse.",
    ],
    pointsVigilance: ["Dépendance au taux de remplissage du centre-ville."],
  },
  {
    id: "rabat-agdal-studio",
    nom: "Agdal Student Residences",
    ville: "Rabat",
    categorie: "Immobilier",
    typologie: "Résidentiel",
    modes: ["Location longue durée", "Location courte durée"],
    image: img("photo-1502005229762-cf1b2da7c5a6"),
    description:
      "12 studios premium à Agdal, loués aux étudiants toute l'année et en courte durée l'été.",
    budgetTotal: 21_000_000,
    montantCollecte: 9_600_000,
    objectifCollecte: 15_000_000,
    ticketMinimum: 6_000,
    rendementCible: 8.9,
    dureeMois: 36,
    scoreRisque: 74,
    scoreLabel: "Faible",
    statut: "En collecte",
    investisseurs: 77,
    joursRestants: 18,
    assurance: buildAssurance({
      id: "assurance-agdal-student",
      method: "Location longue durée",
      nom: "Garantie Agdal Student Residences",
      description: "Protection des loyers étudiants et des passages courte durée estivale.",
      risqueCouvert: "Impayés étudiants, sinistres de mobilier, saison touristique estivale.",
      criteresStricts: [
        "Garant co-signataire exigé sur chaque bail étudiant.",
        "Loyer inférieur à 35 % des revenus déclarés du garant.",
        "État des lieux photographié à chaque entrée.",
        "Passage en courte durée limité à 8 semaines par an.",
      ],
      primePourcentage: 2.4,
      primeBase: "loyers annuels garantis",
      franchise: { type: "pourcentage", valeur: 2.5, unite: "du montant réclamé" },
      partenaire: "AXA Art — Location longue durée",
    }),
    pointsForts: ["Demande étudiante structurelle à Agdal.", "Rendement annuel estimé à 6,5 %."],
    pointsVigilance: ["Saisonnalité estivale de la partie courte durée."],
  },
  {
    id: "marrakech-gateway-boutique",
    nom: "Gateway Boutique Hôtel",
    ville: "Marrakech",
    categorie: "Immobilier",
    typologie: "Commercial & Bureaux",
    modes: ["Location courte durée"],
    image: img("photo-1582719508461-905c673771fd"),
    description:
      "Boutique hôtel de 20 clés près du cœur touristique de Marrakech, exploité en courte durée premium.",
    budgetTotal: 48_000_000,
    montantCollecte: 41_400_000,
    objectifCollecte: 48_000_000,
    ticketMinimum: 12_000,
    rendementCible: 13.2,
    dureeMois: 48,
    scoreRisque: 66,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 240,
    joursRestants: 5,
    assurance: buildAssurance({
      id: "assurance-gateway-hotel",
      method: "Location courte durée",
      nom: "Garantie Gateway Boutique Hôtel",
      description:
        "Garantie d'exploitation touristique : revenus, dégradations et perte d'activité.",
      risqueCouvert:
        "Chute du taux d'occupation, dégradations clients, interruption d'exploitation.",
      criteresStricts: [
        "Licence d'exploitation touristique valide.",
        "RevPAR minimum garanti par le contrat de gestion.",
        "Audit qualité opérateur sur 12 mois.",
        "Assurance multirisque hôtelière obligatoire.",
        "Trésorerie d'exploitation égale à 3 mois de charges.",
      ],
      primePourcentage: 4,
      primeBase: "chiffre d'affaires annuel garanti",
      franchise: { type: "pourcentage", valeur: 3.5, unite: "du montant réclamé" },
      partenaire: "Wafac Assurance — Hôtellerie",
    }),
    pointsForts: [
      "Opérateur hôtelier accrédité.",
      "Emplacement central à proximité de la place Jemaa el-Fna.",
    ],
    pointsVigilance: ["Saisonnalité touristique forte à Marrakech."],
  },
  {
    id: "kenitra-garden-plots",
    nom: "Kenitra Garden Plots",
    ville: "Kenitra",
    categorie: "Immobilier",
    typologie: "Terrains & Lotissements",
    modes: ["Revente"],
    image: img("photo-1502672260266-1c1ef2d93688"),
    description:
      "Viabilisation de 60 lots résidentiels au nord de Kenitra dans une zone à urbanisation rapide.",
    budgetTotal: 26_000_000,
    montantCollecte: 15_800_000,
    objectifCollecte: 26_000_000,
    ticketMinimum: 4_000,
    rendementCible: 11.6,
    dureeMois: 30,
    scoreRisque: 64,
    scoreLabel: "Modéré",
    statut: "En construction",
    investisseurs: 172,
    joursRestants: 40,
    assurance: buildAssurance({
      id: "assurance-kenitra-plots",
      method: "Revente",
      nom: "Garantie Kenitra Garden Plots",
      description:
        "Protection de la marge de revente des lots viabilisés face à un retournement de conjoncture.",
      risqueCouvert: "Dépréciation du prix des lots et allongement du délai d'écoulement.",
      criteresStricts: [
        "Certificat de viabilisation définitif requis.",
        "Prix de revente plancher validé par deux experts.",
        "Étude de marché du secteur jointe au dossier.",
        "Division en lotissement conforme au plan communal.",
      ],
      primePourcentage: 1.9,
      primeBase: "valeur de revente plancher",
      franchise: { type: "fixe", valeur: 20_000, unite: "MAD" },
      partenaire: "Groupama — Revente terrains",
    }),
    pointsForts: ["Connexion autoroutière structurante.", "Carnet de réservations déjà à 35 %."],
    pointsVigilance: ["Écoulement sur 30 mois sensible au calendrier de vente."],
  },
  {
    id: "fes-atlas-view-residences",
    nom: "Atlas View Résidences",
    ville: "Fès",
    categorie: "Immobilier",
    typologie: "Résidentiel",
    modes: ["Location longue durée", "Revente"],
    image: img("photo-1512917774080-9991f1c4c750"),
    description:
      "75 logements à Fès combinant location longue durée puis revente graduée sur la durée du projet.",
    budgetTotal: 41_000_000,
    montantCollecte: 27_300_000,
    objectifCollecte: 32_000_000,
    ticketMinimum: 9_000,
    rendementCible: 9.1,
    dureeMois: 42,
    scoreRisque: 72,
    scoreLabel: "Faible",
    statut: "En construction",
    investisseurs: 110,
    joursRestants: 14,
    featured: true,
    assurance: buildAssurance({
      id: "assurance-fes-atlas",
      method: "Location longue durée",
      nom: "Garantie Fès Atlas View Résidences",
      description:
        "Couverture des loyers des logements puis de la valeur de revente en sortie de projet.",
      risqueCouvert: "Impayés de loyers, dommages locatifs, plus-value de revente insuffisante.",
      criteresStricts: [
        "Revenus des locataires supérieurs à 4 fois le loyer.",
        "Bail indexé avec gestion d'immeuble.",
        "Contrôle de chantier à chaque étape.",
        "Garantie de valeur plancher supérieure à 70 % du prix de revente cible.",
      ],
      primePourcentage: 2.6,
      primeBase: "loyers annuels et valeur cible",
      franchise: { type: "pourcentage", valeur: 3, unite: "du montant réclamé" },
      partenaire: "Sanad Assurance — Résidentiel",
    }),
    pointsForts: [
      "Modèle hybride location + revente à Fès.",
      "Pré-commercialisation à 40 % en phase chantier.",
    ],
    pointsVigilance: ["Attractivité locative variable selon le tissu économique local."],
  },
  {
    id: "essaouira-medina-suites",
    nom: "Essaouira Medina Suites",
    ville: "Essaouira",
    categorie: "Immobilier",
    typologie: "Résidentiel",
    modes: ["Location courte durée"],
    image: img("photo-1564013799919-ab600027ffc6"),
    description:
      "17 appartements réhabilités dans la médina d'Essaouira en exploitation touristique courte durée.",
    budgetTotal: 38_000_000,
    montantCollecte: 11_200_000,
    objectifCollecte: 30_000_000,
    ticketMinimum: 10_000,
    rendementCible: 12.1,
    dureeMois: 40,
    scoreRisque: 70,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 96,
    joursRestants: 29,
    assurance: buildAssurance({
      id: "assurance-essaouira-medina",
      method: "Location courte durée",
      nom: "Garantie Essaouira Medina Suites",
      description:
        "Garantie des revenus touristiques et de l'intégrité du patrimoine dans la médina d'Essaouira.",
      risqueCouvert:
        "Dégradations locatives touristiques, annulations, variation du taux d'occupation.",
      criteresStricts: [
        "Autorisation d'exploitation touristique valide.",
        "Gestionnaire certifié pour les hébergements de la médina.",
        "Contrat d'entretien ménager quotidien.",
        "Fréquentation moyenne supérieure à 120 nuits par an.",
      ],
      primePourcentage: 3.6,
      primeBase: "revenus locatifs annuels prévisionnels",
      franchise: { type: "pourcentage", valeur: 3, unite: "du montant réclamé" },
      partenaire: "Wafac Assurance — Médina",
    }),
    pointsForts: [
      "Notoriété touristique croissante d'Essaouira.",
      "Gestion locale par opérateur expérimenté.",
    ],
    pointsVigilance: ["Pics saisonniers et fragilité du tissu médina."],
  },
  {
    id: "safi-marine-offices",
    nom: "Safi Marine Business Center",
    ville: "Safi",
    categorie: "Immobilier",
    typologie: "Commercial & Bureaux",
    modes: ["Location longue durée"],
    image: img("photo-1486406146926-c627a92ad1ab"),
    description:
      "Plateau tertiaire de 3 800 m² à Safi avec un locataire emblématique de la filière phosphates.",
    budgetTotal: 52_000_000,
    montantCollecte: 33_700_000,
    objectifCollecte: 52_000_000,
    ticketMinimum: 18_000,
    rendementCible: 7.6,
    dureeMois: 54,
    scoreRisque: 81,
    scoreLabel: "Faible",
    statut: "Financé",
    investisseurs: 302,
    joursRestants: 0,
    assurance: buildAssurance({
      id: "assurance-safi-marine",
      method: "Location longue durée",
      nom: "Garantie Safi Marine Offices",
      description: "Couverture des loyers tertiaires du locataire industriel emblématique de Safi.",
      risqueCouvert: "Impayés de loyer, dommages aux plateaux de bureaux.",
      criteresStricts: [
        "Bail commercial d'au moins 7 ans.",
        "Locataire de la filière industrielle phosphates.",
        "Bâtiment conforme aux normes sismiques régionales.",
      ],
      primePourcentage: 1.2,
      primeBase: "loyers annuels garantis",
      franchise: { type: "pourcentage", valeur: 2, unite: "du montant réclamé" },
      partenaire: "ECEP — Assurances Bureaux industriels",
    }),
    pointsForts: [
      "Bâtiment neuf pré-loué à long terme.",
      "Locataire structurant du tissu industriel local.",
    ],
    pointsVigilance: ["Concentration sur un secteur industriel spécifique."],
  },
  {
    id: "tetouan-medina-suites",
    nom: "Tétouan Medina Suites",
    ville: "Tétouan",
    categorie: "Immobilier",
    typologie: "Résidentiel",
    modes: ["Location courte durée", "Revente"],
    image: img("photo-1500382017468-9049fed747ef"),
    description:
      "18 suites rénovées dans la médina classée de Tétouan, double sortie location courte durée et revente.",
    budgetTotal: 29_000_000,
    montantCollecte: 9_300_000,
    objectifCollecte: 24_000_000,
    ticketMinimum: 7_000,
    rendementCible: 11.8,
    dureeMois: 36,
    scoreRisque: 67,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 84,
    joursRestants: 22,
    assurance: buildAssurance({
      id: "assurance-tetouan-medina",
      method: "Location courte durée",
      nom: "Garantie Tétouan Medina Suites",
      description:
        "Garantie des revenus courte durée et de la valeur de revente des suites de Tétouan.",
      risqueCouvert: "Impayés courte durée, dégradations, dépréciation à la revente.",
      criteresStricts: [
        "Autorisation d'habitation touristique par suite.",
        "Gestion court séjour sous contrat.",
        "Titre foncier et copropriété régularisés.",
        "Prix de revente plancher fixé avec le promoteur.",
      ],
      primePourcentage: 3.4,
      primeBase: "revenus court durée et valeur cible",
      franchise: { type: "pourcentage", valeur: 3, unite: "du montant réclamé" },
      partenaire: "Wafac Assurance — Médina",
    }),
    pointsForts: [
      "Patrimoine historique valorisant la demande.",
      "Double sortie location et revente dès 24 mois.",
    ],
    pointsVigilance: ["Marché touristique marqué par la saisonnalité."],
  },
  {
    id: "nador-corniche-lots",
    nom: "Nador Corniche Lots",
    ville: "Nador",
    categorie: "Immobilier",
    typologie: "Terrains & Lotissements",
    modes: ["Revente"],
    image: img("photo-1506495432511-5d8869d2be5a"),
    description:
      "80 lots à bâtir sur la corniche de Nador, zone en croissance résidentielle proche de la future marina.",
    budgetTotal: 44_000_000,
    montantCollecte: 11_900_000,
    objectifCollecte: 34_000_000,
    ticketMinimum: 5_000,
    rendementCible: 12.7,
    dureeMois: 36,
    scoreRisque: 62,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 143,
    joursRestants: 33,
    assurance: buildAssurance({
      id: "assurance-nador-plots",
      method: "Revente",
      nom: "Garantie Nador Corniche Lots",
      description: "Protection de la marge de revente des lots de la corniche de Nador.",
      risqueCouvert: "Dépréciation des lots, ralentissement de la demande résidentielle.",
      criteresStricts: [
        "Certificat de viabilisation délivré.",
        "Prix plancher de revente validé par l'expert.",
        "Accès viabilisé et bornage à jour.",
        "Calendrier de revente sur 36 mois approuvé.",
      ],
      primePourcentage: 2,
      primeBase: "valeur de revente plancher",
      franchise: { type: "fixe", valeur: 15_000, unite: "MAD" },
      partenaire: "Groupama — Revente terrains",
    }),
    pointsForts: [
      "Secteur en forte croissance résidentielle.",
      "Proximité des travaux de la future marina.",
    ],
    pointsVigilance: ["Délai d'écoulement étendu sur 36 mois."],
  },
  {
    id: "benimellal-green-residences",
    nom: "Beni Mellal Green Residences",
    ville: "Beni Mellal",
    categorie: "Immobilier",
    typologie: "Résidentiel",
    modes: ["Location longue durée"],
    image: img("photo-1504674900247-0877df9cc836"),
    description:
      "60 logements familiaux à Beni Mellal, demande locative soutenue par l'axe économique régional.",
    budgetTotal: 24_000_000,
    montantCollecte: 13_100_000,
    objectifCollecte: 18_000_000,
    ticketMinimum: 5_000,
    rendementCible: 8.2,
    dureeMois: 30,
    scoreRisque: 75,
    scoreLabel: "Faible",
    statut: "En construction",
    investisseurs: 161,
    joursRestants: 9,
    assurance: buildAssurance({
      id: "assurance-benimellal",
      method: "Location longue durée",
      nom: "Garantie Beni Mellal Green Residences",
      description: "Couverture des loyers des logements familiaux de Beni Mellal.",
      risqueCouvert: "Impayés de loyers, vacance locative, entretien du bâti.",
      criteresStricts: [
        "Revenus du bail déclarés et vérifiés.",
        "Loyer dans la fourchette médiane du marché.",
        "Gestion par syndic agréé.",
      ],
      primePourcentage: 2.1,
      primeBase: "loyers annuels sécurisés",
      franchise: { type: "pourcentage", valeur: 2.5, unite: "du montant réclamé" },
      partenaire: "Sanad Assurance — Résidentiel",
    }),
    pointsForts: ["Axé sur la demande locative familiale.", "Livrable à horizon 24 mois."],
    pointsVigilance: ["Marché modeste avec marges locatives réduites."],
  },
  {
    id: "tetouan-centre-tertiaire",
    nom: "Centre Renaissance Tertiaire",
    ville: "Tétouan",
    categorie: "Immobilier",
    typologie: "Commercial & Bureaux",
    modes: ["Location longue durée"],
    image: img("photo-1493809842364-78817add7ffb"),
    description:
      "Immeuble tertiaire de 5 200 m² à Tétouan destiné aux services et aux professions libérales.",
    budgetTotal: 71_000_000,
    montantCollecte: 28_400_000,
    objectifCollecte: 58_000_000,
    ticketMinimum: 20_000,
    rendementCible: 8,
    dureeMois: 60,
    scoreRisque: 79,
    scoreLabel: "Faible",
    statut: "En collecte",
    investisseurs: 189,
    joursRestants: 26,
    assurance: buildAssurance({
      id: "assurance-tetouan-tertiaire",
      method: "Location longue durée",
      nom: "Garantie Renaissance Tertiaire",
      description: "Couverture des loyers tertiaires du patrimoine Renaissance de Tétouan.",
      risqueCouvert: "Impayés de loyers tertiaires, vacance, sinistres techniques.",
      criteresStricts: [
        "Bail commercial de 6 à 9 ans selon plateau.",
        "Taux de vacance du portefeuille limité à 20 %.",
        "Maintenance technique sous contrat.",
      ],
      primePourcentage: 1.5,
      primeBase: "loyers annuels nets",
      franchise: { type: "pourcentage", valeur: 2, unite: "du montant réclamé" },
      partenaire: "Sanad Assurance — Tertiaire",
    }),
    pointsForts: [
      "Zone tertiaire en développement.",
      "Diversification géographique du portefeuille.",
    ],
    pointsVigilance: ["Échéances longues à 60 mois."],
  },
  {
    id: "oujda-frontier-logistics",
    nom: "Oujda Frontier Logistics",
    ville: "Oujda",
    categorie: "Immobilier",
    typologie: "Commercial & Bureaux",
    modes: ["Location longue durée"],
    image: img("photo-1553406830-ef2513450d76"),
    description:
      "Plateforme logistique adossée aux échanges transfrontaliers entre le Maroc et l'Algérie.",
    budgetTotal: 66_000_000,
    montantCollecte: 45_900_000,
    objectifCollecte: 55_000_000,
    ticketMinimum: 15_000,
    rendementCible: 9,
    dureeMois: 54,
    scoreRisque: 77,
    scoreLabel: "Faible",
    statut: "En collecte",
    investisseurs: 176,
    joursRestants: 6,
    featured: true,
    assurance: buildAssurance({
      id: "assurance-oujda",
      method: "Location longue durée",
      nom: "Garantie Oujda Frontier Logistics",
      description: "Garantie des loyers logistiques transfrontaliers de la plateforme d'Oujda.",
      risqueCouvert: "Impayés du loyer logistique, sinistres d'activité.",
      criteresStricts: [
        "Bail logistique de 8 ans minimum.",
        "Locataire de la filière transport international.",
        "Suivi trimestriel des flux.",
      ],
      primePourcentage: 1.3,
      primeBase: "loyers annuels garantis",
      franchise: { type: "pourcentage", valeur: 2, unite: "du montant réclamé" },
      partenaire: "Wafac Assurance — Logistique",
    }),
    pointsForts: ["Adossement aux échanges transfrontaliers.", "Croissance des flux dans la zone."],
    pointsVigilance: ["Dépendance à la stabilité des échanges internationaux."],
  },
  {
    id: "casablanca-ain-sebaa",
    nom: "Aïn Sebaa Courtyard Résidences",
    ville: "Casablanca",
    categorie: "Immobilier",
    typologie: "Résidentiel",
    modes: ["Location longue durée"],
    image: img("photo-1600585154340-be6161a56a0c"),
    description:
      "Programme familial de 100 logements à Aïn Sebaa, demandé par les actifs de la zone industrielle voisine.",
    budgetTotal: 49_000_000,
    montantCollecte: 17_900_000,
    objectifCollecte: 36_000_000,
    ticketMinimum: 6_000,
    rendementCible: 8.7,
    dureeMois: 48,
    scoreRisque: 73,
    scoreLabel: "Faible",
    statut: "En construction",
    investisseurs: 190,
    joursRestants: 16,
    assurance: buildAssurance({
      id: "ass-ain-seba",
      method: "Location longue durée",
      nom: "Garantie Aïn Sebaa Résidences",
      description: "Couverture des loyers des logements familiaux d'Aïn Sebaa.",
      risqueCouvert: "Impayés de loyers, dommages locatifs, vacance locative.",
      criteresStricts: [
        "Revenus locataires justifiés.",
        "Bail de 3 ans pour les ménages.",
        "Gestion par l'agence de la zone.",
      ],
      primePourcentage: 2.3,
      primeBase: "loyers annuels",
      franchise: { type: "pourcentage", valeur: 2.5, unite: "du montant réclamé" },
      partenaire: "Sanad Assurance — Résidentiel",
    }),
    pointsForts: ["Emplacement industriel dynamique.", "Demande locative structurellement forte."],
    pointsVigilance: ["Proximité industrielle perçue différemment par le marché."],
  },
  {
    id: "mohammedia-front-beach",
    nom: "Mohammedia Front Beach Résidences",
    ville: "Mohammedia",
    categorie: "Immobilier",
    typologie: "Résidentiel",
    modes: ["Location courte durée", "Revente"],
    image: img("photo-1522708323590-d24dbb6b0267"),
    description:
      "22 appartements face à la plage de Mohammedia, exploitation touristique courte durée et revente.",
    budgetTotal: 33_000_000,
    montantCollecte: 10_700_000,
    objectifCollecte: 25_000_000,
    ticketMinimum: 7_000,
    rendementCible: 11.4,
    dureeMois: 36,
    scoreRisque: 71,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 108,
    joursRestants: 19,
    featured: true,
    assurance: buildAssurance({
      id: "assurance-mohammedia-front",
      method: "Location courte durée",
      nom: "Garantie Mohammedia Front Beach",
      description:
        "Garantie des revenus courte durée et de la valeur de revente face à la baie de Mohammedia.",
      risqueCouvert: "Dégradations locatives touristiques, annulations, dépréciation à la revente.",
      criteresStricts: [
        "Front de mer notoire avec accès plage direct.",
        "Gestion courte durée certifiée plateforme.",
        "Occupation moyenne supérieure à 60 % sur 6 mois.",
        "Prix de revente plancher validé par l'expert.",
      ],
      primePourcentage: 3.3,
      primeBase: "revenus courte durée + valeur cible",
      franchise: { type: "pourcentage", valeur: 3, unite: "du montant réclamé" },
      partenaire: "Wafac Assurance — Littoral",
    }),
    pointsForts: [
      "Emplacement face à la plage très demandé.",
      "Double sortie location courte durée et revente.",
    ],
    pointsVigilance: ["Rentabilité du littoral variable hors saison."],
  },
];

export interface Holding {
  projectId: string;
  unites: number;
  prixMoyen: number;
  valeurActuelle: number;
  dateAcquisition: string;
}

export const holdings: Holding[] = [
  {
    projectId: "casa-anfa-residences",
    unites: 12,
    prixMoyen: 10_000,
    valeurActuelle: 128_400,
    dateAcquisition: "2025-02-14",
  },
  {
    projectId: "rabat-hay-riad-bureaux",
    unites: 8,
    prixMoyen: 25_000,
    valeurActuelle: 214_800,
    dateAcquisition: "2024-11-03",
  },
  {
    projectId: "tanger-med-logistique",
    unites: 5,
    prixMoyen: 20_000,
    valeurActuelle: 103_200,
    dateAcquisition: "2025-05-21",
  },
  {
    projectId: "agadir-marina-lots",
    unites: 20,
    prixMoyen: 5_000,
    valeurActuelle: 108_600,
    dateAcquisition: "2025-01-09",
  },
];

export type TransactionType = "Dépôt" | "Investissement" | "Dividende" | "Retrait";

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  reference: string;
  montant: number;
  projet?: string;
  statut: "Confirmé" | "En attente" | "Rejeté";
}

export const transactions: Transaction[] = [
  {
    id: "TX-2026-0412",
    date: "2026-06-12",
    type: "Dividende",
    reference: "DVD-Q2-RHRB",
    montant: 8_420,
    projet: "Hay Riad Business Center",
    statut: "Confirmé",
  },
  {
    id: "TX-2026-0398",
    date: "2026-06-05",
    type: "Investissement",
    reference: "INV-AML-204",
    montant: -25_000,
    projet: "Agadir Marina — Lots viabilisés",
    statut: "Confirmé",
  },
  {
    id: "TX-2026-0376",
    date: "2026-05-28",
    type: "Dépôt",
    reference: "DEP-VIR-08821",
    montant: 50_000,
    statut: "Confirmé",
  },
  {
    id: "TX-2026-0341",
    date: "2026-05-12",
    type: "Dividende",
    reference: "DVD-Q2-CAR",
    montant: 3_180,
    projet: "Anfa Park Résidences",
    statut: "Confirmé",
  },
  {
    id: "TX-2026-0287",
    date: "2026-04-22",
    type: "Retrait",
    reference: "RET-BNK-00214",
    montant: -15_000,
    statut: "Confirmé",
  },
];

export interface DistributionEvent {
  date: string;
  projectId: string;
  montantEstime: number;
  statut: "Planifié" | "En cours" | "Versé";
}

export const upcomingDistributions: DistributionEvent[] = [
  {
    date: "2026-07-15",
    projectId: "rabat-hay-riad-bureaux",
    montantEstime: 8_650,
    statut: "Planifié",
  },
  {
    date: "2026-08-01",
    projectId: "casa-anfa-residences",
    montantEstime: 3_240,
    statut: "Planifié",
  },
  {
    date: "2026-08-22",
    projectId: "tanger-med-logistique",
    montantEstime: 2_180,
    statut: "En cours",
  },
  { date: "2026-09-10", projectId: "agadir-marina-lots", montantEstime: 6_700, statut: "Planifié" },
];

export interface PortfolioPoint {
  mois: string;
  valeur: number;
}

export const portfolioEvolution: PortfolioPoint[] = [
  { mois: "Jan", valeur: 412_000 },
  { mois: "Fév", valeur: 428_000 },
  { mois: "Mar", valeur: 445_200 },
  { mois: "Avr", valeur: 461_800 },
  { mois: "Mai", valeur: 488_300 },
  { mois: "Juin", valeur: 555_000 },
];

export interface SubmissionDraft {
  id: string;
  nom: string;
  ville: string;
  typologie: ProjectType;
  budget: number;
  montantRecherche: number;
  statut: "Brouillon" | "Soumis" | "En analyse IA" | "Approuvé" | "Rejeté";
  dateMaj: string;
  avancement: number;
}

export const submissionDrafts: SubmissionDraft[] = [
  {
    id: "SUB-2026-014",
    nom: "Résidence Bouskoura Garden",
    ville: "Casablanca",
    typologie: "Résidentiel",
    budget: 64_000_000,
    montantRecherche: 38_000_000,
    statut: "En analyse IA",
    dateMaj: "2026-06-10",
    avancement: 100,
  },
  {
    id: "SUB-2026-009",
    nom: "Plateau de bureaux CFC",
    ville: "Casablanca",
    typologie: "Commercial & Bureaux",
    budget: 110_000_000,
    montantRecherche: 72_000_000,
    statut: "Brouillon",
    dateMaj: "2026-05-28",
    avancement: 65,
  },
  {
    id: "SUB-2026-022",
    nom: "Lotissement Saïdia Beach",
    ville: "Saïdia",
    typologie: "Terrains & Lotissements",
    budget: 24_000_000,
    montantRecherche: 18_000_000,
    statut: "Soumis",
    dateMaj: "2026-06-15",
    avancement: 100,
  },
];

export interface SitePhase {
  nom: string;
  avancement: number;
  dateDebut: string;
  dateFinPrevue: string;
  statut: "Terminée" | "En cours" | "À venir";
}

export const sitePhases: SitePhase[] = [
  {
    nom: "Études & autorisations",
    avancement: 100,
    dateDebut: "2025-03-01",
    dateFinPrevue: "2025-07-30",
    statut: "Terminée",
  },
  {
    nom: "Terrassement & fondations",
    avancement: 100,
    dateDebut: "2025-08-15",
    dateFinPrevue: "2025-12-20",
    statut: "Terminée",
  },
  {
    nom: "Gros œuvre — RDC",
    avancement: 100,
    dateDebut: "2026-01-10",
    dateFinPrevue: "2026-04-15",
    statut: "Terminée",
  },
  {
    nom: "Gros œuvre — R+1 à R+3",
    avancement: 72,
    dateDebut: "2026-04-20",
    dateFinPrevue: "2026-09-30",
    statut: "En cours",
  },
  {
    nom: "Couverture & étanchéité",
    avancement: 15,
    dateDebut: "2026-08-01",
    dateFinPrevue: "2026-10-30",
    statut: "En cours",
  },
];

export interface SiteUpdate {
  id: string;
  date: string;
  titre: string;
  description: string;
  image: string;
}

export const siteUpdates: SiteUpdate[] = [
  {
    id: "UPD-021",
    date: "2026-06-18",
    titre: "Visite de chantier — Commission de sécurité",
    description:
      "Passage de la commission de sécurité provinciale. Avis favorable sous réserve du remplacement de deux extincteurs. PV transmis au bureau de contrôle.",
    image: img("photo-1590674899484-d5640f8545ea"),
  },
  {
    id: "UPD-020",
    date: "2026-06-10",
    titre: "Avancement R+3 — Coffrage en cours",
    description:
      "Le ferraillage du dernier refend du R+3 est terminé. Lancement du coffrage des poteaux prévu ce jeudi. Bétonnage estimé au 14 juin.",
    image: img("photo-1541888946425-d81bb19240f5"),
  },
  {
    id: "UPD-019",
    date: "2026-06-02",
    titre: "Réunion mensuelle — point budgétaire",
    description:
      "Budget consommé à 58 %. Écart de +2.3 % vs prévisionnel dû à la hausse du prix de l'acier. Avenant en cours de validation par le maître d'ouvrage.",
    image: img("photo-1454165804606-c3d57bc86b40"),
  },
  {
    id: "UPD-018",
    date: "2026-05-21",
    titre: "Coulage de la dalle du 4ᵉ niveau",
    description:
      "La dalle du 4ᵉ niveau (R+2) a été coulée le 21 mai avec 170 m³ de béton B25. Résistance à 28 jours conforme aux specs. Décoffrage dans 72h.",
    image: img("photo-1503387762-592deb58ef4e"),
  },
  {
    id: "UPD-017",
    date: "2026-05-08",
    titre: "Livraison des menuiseries aluminium",
    description:
      "Réception des menuiseries Aluminium-Tremie 4500 séries. Conformes au CCTP. Stockage en zone sécurisée. Pose programmée après l'étanchéité (semaine 32).",
    image: img("photo-1541888946425-d81bb19240f5"),
  },
];

// Validation IA — file d'attente admin
export interface AiValidationItem {
  submissionId: string;
  nomProjet: string;
  porteur: string;
  dateSoumission: string;
  scoreRisque: number;
  scoreFraude: number;
  authenticiteDocuments: number;
  synthese: string;
  alertes: string[];
}

export const aiValidationQueue: AiValidationItem[] = [
  {
    submissionId: "SUB-2026-014",
    nomProjet: "Résidence Bouskoura Garden",
    porteur: "Atlas Promotion SARL",
    dateSoumission: "2026-06-10",
    scoreRisque: 78,
    scoreFraude: 4,
    authenticiteDocuments: 96,
    synthese:
      "Dossier cohérent. Promoteur avec historique vérifié (8 livraisons). Cohérence entre budget prévisionnel et marché de référence. Plans validés par l'agent structure.",
    alertes: [],
  },
  {
    submissionId: "SUB-2026-022",
    nomProjet: "Lotissement Saïdia Beach",
    porteur: "Promo Oriental SA",
    dateSoumission: "2026-06-15",
    scoreRisque: 62,
    scoreFraude: 18,
    authenticiteDocuments: 84,
    synthese:
      "Étude de sol fournie mais datée de 2019. L'agent foncier signale une incohérence mineure sur la superficie cadastrale déclarée vs titre foncier (écart 2,3 %). Recommandation : demande de complément.",
    alertes: ["Étude de sol antérieure à 24 mois.", "Écart cadastral à clarifier."],
  },
  {
    submissionId: "SUB-2026-031",
    nomProjet: "Tour résidentielle Bni Yakhlef",
    porteur: "MZN Real Estate",
    dateSoumission: "2026-06-17",
    scoreRisque: 38,
    scoreFraude: 64,
    authenticiteDocuments: 41,
    synthese:
      "Dossier à risque élevé. L'agent d'authenticité documentaire détecte des traces de retouche numérique sur le permis de construire. Le porteur n'a aucun historique de livraison.",
    alertes: [
      "Document falsifié suspecté : permis de construire.",
      "Porteur sans historique vérifiable.",
      "Business plan : hypothèses de marché irréalistes (+34 % vs benchmark).",
    ],
  },
];

export type UserRole = "Investisseur" | "Porteur de Projet" | "Agent Conformité" | "Super Admin";

export interface PlatformUser {
  id: string;
  nom: string;
  email: string;
  role: UserRole;
  statut: "Actif" | "Suspendu" | "En attente eKYC";
  dateInscription: string;
  cin: string;
  rib: string;
}

export const platformUsers: PlatformUser[] = [
  {
    id: "U-1042",
    nom: "Yasmine El Idrissi",
    email: "y.elidrissi@example.ma",
    role: "Investisseur",
    statut: "Actif",
    dateInscription: "2025-09-14",
    cin: "BE874512",
    rib: "230 780 1234567890123456 21",
  },
  {
    id: "U-1056",
    nom: "Karim Benali",
    email: "k.benali@example.ma",
    role: "Investisseur",
    statut: "En attente eKYC",
    dateInscription: "2026-06-02",
    cin: "A412998",
    rib: "011 810 0098712345678901 47",
  },
  {
    id: "U-2018",
    nom: "Atlas Promotion SARL",
    email: "contact@atlas-promotion.ma",
    role: "Porteur de Projet",
    statut: "Actif",
    dateInscription: "2024-03-22",
    cin: "RC-128409",
    rib: "164 320 0011223344556677 88",
  },
  {
    id: "U-2034",
    nom: "MZN Real Estate",
    email: "ops@mzn-re.ma",
    role: "Porteur de Projet",
    statut: "Suspendu",
    dateInscription: "2025-11-30",
    cin: "RC-204871",
    rib: "190 450 0044556677889900 12",
  },
  {
    id: "U-3001",
    nom: "Salma Ouazzani",
    email: "s.ouazzani@plateforme.ma",
    role: "Agent Conformité",
    statut: "Actif",
    dateInscription: "2024-01-08",
    cin: "BJ112090",
    rib: "—",
  },
];

export interface AuditLog {
  id: string;
  horodatage: string;
  utilisateur: string;
  role: UserRole;
  action: string;
  entite: string;
  ip: string;
}

export const auditLogs: AuditLog[] = [
  {
    id: "LOG-91240",
    horodatage: "2026-06-18 14:32:08",
    utilisateur: "Mehdi Tahiri",
    role: "Super Admin",
    action: "Approbation projet",
    entite: "SUB-2026-014",
    ip: "196.200.144.21",
  },
  {
    id: "LOG-91232",
    horodatage: "2026-06-18 11:18:42",
    utilisateur: "Salma Ouazzani",
    role: "Agent Conformité",
    action: "Validation eKYC",
    entite: "U-1042",
    ip: "196.200.144.18",
  },
  {
    id: "LOG-91220",
    horodatage: "2026-06-18 09:04:15",
    utilisateur: "Salma Ouazzani",
    role: "Agent Conformité",
    action: "Rejet document",
    entite: "U-1056",
    ip: "196.200.144.18",
  },
  {
    id: "LOG-91201",
    horodatage: "2026-06-17 16:51:33",
    utilisateur: "Système IA",
    role: "Super Admin",
    action: "Analyse documentaire",
    entite: "SUB-2026-031",
    ip: "—",
  },
  {
    id: "LOG-91188",
    horodatage: "2026-06-17 10:22:09",
    utilisateur: "Mehdi Tahiri",
    role: "Super Admin",
    action: "Suspension compte",
    entite: "U-2034",
    ip: "196.200.144.21",
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
