/**
 * Données de démonstration pour la plateforme.
 * Tous les montants sont en MAD.
 */

export type ProjectType =
  | "Résidentiel"
  | "Commercial & Bureaux"
  | "Terrains & Lotissements"
  | "Projets neufs en collecte";

export type ProjectStatus = "En collecte" | "Financé" | "En construction" | "Livré";

export interface Project {
  id: string;
  nom: string;
  ville: string;
  typologie: ProjectType;
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
  pointsForts: string[];
  pointsVigilance: string[];
}

const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`;

export const projects: Project[] = [
  {
    id: "casa-anfa-residences",
    nom: "Anfa Park Résidences",
    ville: "Casablanca",
    typologie: "Résidentiel",
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
    pointsForts: [
      "Promoteur reconnu, 14 livraisons antérieures conformes.",
      "Permis de construire délivré et titre foncier purgé.",
      "Pré-commercialisation à 38 % avant lancement.",
    ],
    pointsVigilance: [
      "Sensibilité au calendrier des livraisons publiques voisines.",
    ],
  },
  {
    id: "rabat-hay-riad-bureaux",
    nom: "Hay Riad Business Center",
    ville: "Rabat",
    typologie: "Commercial & Bureaux",
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
    typologie: "Résidentiel",
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
    pointsForts: [
      "Rendement locatif courte durée estimé à 8,5 % net.",
      "Étude de marché Knight Frank fournie.",
    ],
    pointsVigilance: [
      "Saisonnalité touristique forte.",
      "Dépendance à la demande internationale.",
    ],
  },
  {
    id: "tanger-med-logistique",
    nom: "Tanger Med Logistique Phase II",
    ville: "Tanger",
    typologie: "Commercial & Bureaux",
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
    typologie: "Terrains & Lotissements",
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
    pointsForts: [
      "Carnet de réservations à 41 %.",
      "Sortie progressive : liquidité partielle dès 12 mois.",
    ],
    pointsVigilance: ["Cycle court, sensible à la conjoncture locale."],
  },
  {
    id: "fes-medina-restauration",
    nom: "Médina de Fès — Riad Patrimoine",
    ville: "Fès",
    typologie: "Projets neufs en collecte",
    image: img("photo-1582719478250-c89cae4dc85b"),
    description:
      "Restauration de 4 riads classés transformés en maison d'hôtes de luxe, partenariat avec opérateur hôtelier.",
    budgetTotal: 21_500_000,
    montantCollecte: 4_200_000,
    objectifCollecte: 16_000_000,
    ticketMinimum: 7_500,
    rendementCible: 10.1,
    dureeMois: 60,
    scoreRisque: 68,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 89,
    joursRestants: 45,
    pointsForts: [
      "Subvention du ministère de la Culture sécurisée (12 %).",
      "Opérateur hôtelier confirmé sur 9 ans.",
    ],
    pointsVigilance: ["Travaux en zone classée : délais administratifs."],
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

export type TransactionType =
  | "Dépôt"
  | "Investissement"
  | "Dividende"
  | "Retrait";

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
  { id: "TX-2026-0412", date: "2026-06-12", type: "Dividende", reference: "DVD-Q2-RHRB", montant: 8_420, projet: "Hay Riad Business Center", statut: "Confirmé" },
  { id: "TX-2026-0398", date: "2026-06-05", type: "Investissement", reference: "INV-AML-204", montant: -25_000, projet: "Agadir Marina — Lots viabilisés", statut: "Confirmé" },
  { id: "TX-2026-0376", date: "2026-05-28", type: "Dépôt", reference: "DEP-VIR-08821", montant: 50_000, statut: "Confirmé" },
  { id: "TX-2026-0341", date: "2026-05-12", type: "Dividende", reference: "DVD-Q2-CAR", montant: 3_180, projet: "Anfa Park Résidences", statut: "Confirmé" },
  { id: "TX-2026-0287", date: "2026-04-22", type: "Retrait", reference: "RET-BNK-00214", montant: -15_000, statut: "Confirmé" },
  { id: "TX-2026-0264", date: "2026-04-10", type: "Investissement", reference: "INV-TML-118", montant: -100_000, projet: "Tanger Med Logistique Phase II", statut: "Confirmé" },
];

export interface DistributionEvent {
  date: string;
  projectId: string;
  montantEstime: number;
  statut: "Planifié" | "En cours" | "Versé";
}

export const upcomingDistributions: DistributionEvent[] = [
  { date: "2026-07-15", projectId: "rabat-hay-riad-bureaux", montantEstime: 8_650, statut: "Planifié" },
  { date: "2026-08-01", projectId: "casa-anfa-residences", montantEstime: 3_240, statut: "Planifié" },
  { date: "2026-08-22", projectId: "tanger-med-logistique", montantEstime: 2_180, statut: "En cours" },
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
  { id: "SUB-2026-014", nom: "Résidence Bouskoura Garden", ville: "Casablanca", typologie: "Résidentiel", budget: 64_000_000, montantRecherche: 38_000_000, statut: "En analyse IA", dateMaj: "2026-06-10", avancement: 100 },
  { id: "SUB-2026-009", nom: "Plateau de bureaux CFC", ville: "Casablanca", typologie: "Commercial & Bureaux", budget: 110_000_000, montantRecherche: 72_000_000, statut: "Brouillon", dateMaj: "2026-05-28", avancement: 65 },
  { id: "SUB-2026-022", nom: "Lotissement Saïdia Beach", ville: "Saïdia", typologie: "Terrains & Lotissements", budget: 24_000_000, montantRecherche: 18_000_000, statut: "Soumis", dateMaj: "2026-06-15", avancement: 100 },
];

export interface SitePhase {
  nom: string;
  avancement: number;
  dateDebut: string;
  dateFinPrevue: string;
  statut: "Terminée" | "En cours" | "À venir";
}

export const sitePhases: SitePhase[] = [
  { nom: "Études & autorisations", avancement: 100, dateDebut: "2025-03-01", dateFinPrevue: "2025-07-30", statut: "Terminée" },
  { nom: "Terrassement & fondations", avancement: 100, dateDebut: "2025-08-15", dateFinPrevue: "2025-12-20", statut: "Terminée" },
  { nom: "Gros œuvre", avancement: 68, dateDebut: "2026-01-10", dateFinPrevue: "2026-09-30", statut: "En cours" },
  { nom: "Second œuvre & finitions", avancement: 0, dateDebut: "2026-10-01", dateFinPrevue: "2027-04-30", statut: "À venir" },
  { nom: "Livraison & VEFA", avancement: 0, dateDebut: "2027-05-01", dateFinPrevue: "2027-06-30", statut: "À venir" },
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
    id: "UPD-018",
    date: "2026-06-14",
    titre: "Coulage du 4ᵉ niveau terminé",
    description: "Le 4ᵉ niveau du bâtiment B a été coulé conformément au planning. Démarrage de l'étanchéité prévu lundi prochain.",
    image: img("photo-1503387762-592deb58ef4e"),
  },
  {
    id: "UPD-017",
    date: "2026-05-30",
    titre: "Livraison des menuiseries aluminium",
    description: "Les menuiseries du fournisseur certifié ont été livrées et stockées en zone sécurisée. Pose programmée en juillet.",
    image: img("photo-1541888946425-d81bb19240f5"),
  },
  {
    id: "UPD-016",
    date: "2026-05-12",
    titre: "Contrôle bureau Veritas — sans réserve",
    description: "Visite de contrôle structurelle du Bureau Veritas conclue sans réserve sur les niveaux R+1 à R+3.",
    image: img("photo-1581094288338-2314dddb7ece"),
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
    alertes: [
      "Étude de sol antérieure à 24 mois.",
      "Écart cadastral à clarifier.",
    ],
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

export type UserRole =
  | "Investisseur"
  | "Porteur de Projet"
  | "Agent Conformité"
  | "Super Admin";

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
  { id: "U-1042", nom: "Yasmine El Idrissi", email: "y.elidrissi@example.ma", role: "Investisseur", statut: "Actif", dateInscription: "2025-09-14", cin: "BE874512", rib: "230 780 1234567890123456 21" },
  { id: "U-1056", nom: "Karim Benali", email: "k.benali@example.ma", role: "Investisseur", statut: "En attente eKYC", dateInscription: "2026-06-02", cin: "A412998", rib: "011 810 0098712345678901 47" },
  { id: "U-2018", nom: "Atlas Promotion SARL", email: "contact@atlas-promotion.ma", role: "Porteur de Projet", statut: "Actif", dateInscription: "2024-03-22", cin: "RC-128409", rib: "164 320 0011223344556677 88" },
  { id: "U-2034", nom: "MZN Real Estate", email: "ops@mzn-re.ma", role: "Porteur de Projet", statut: "Suspendu", dateInscription: "2025-11-30", cin: "RC-204871", rib: "190 450 0044556677889900 12" },
  { id: "U-3001", nom: "Salma Ouazzani", email: "s.ouazzani@plateforme.ma", role: "Agent Conformité", statut: "Actif", dateInscription: "2024-01-08", cin: "BJ112090", rib: "—" },
  { id: "U-9001", nom: "Mehdi Tahiri", email: "m.tahiri@plateforme.ma", role: "Super Admin", statut: "Actif", dateInscription: "2023-06-01", cin: "BK998120", rib: "—" },
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
  { id: "LOG-91240", horodatage: "2026-06-18 14:32:08", utilisateur: "Mehdi Tahiri", role: "Super Admin", action: "Approbation projet", entite: "SUB-2026-014", ip: "196.200.144.21" },
  { id: "LOG-91232", horodatage: "2026-06-18 11:18:42", utilisateur: "Salma Ouazzani", role: "Agent Conformité", action: "Validation eKYC", entite: "U-1042", ip: "196.200.144.18" },
  { id: "LOG-91220", horodatage: "2026-06-18 09:04:15", utilisateur: "Salma Ouazzani", role: "Agent Conformité", action: "Rejet document", entite: "U-1056", ip: "196.200.144.18" },
  { id: "LOG-91201", horodatage: "2026-06-17 16:51:33", utilisateur: "Système IA", role: "Super Admin", action: "Analyse documentaire", entite: "SUB-2026-031", ip: "—" },
  { id: "LOG-91188", horodatage: "2026-06-17 10:22:09", utilisateur: "Mehdi Tahiri", role: "Super Admin", action: "Suspension compte", entite: "U-2034", ip: "196.200.144.21" },
  { id: "LOG-91174", horodatage: "2026-06-16 18:09:55", utilisateur: "Yasmine El Idrissi", role: "Investisseur", action: "Investissement confirmé", entite: "agadir-marina-lots", ip: "105.66.12.88" },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
