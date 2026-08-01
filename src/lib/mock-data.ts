/**
 * Données de démonstration pour la plateforme.
 * Tous les montants sont en MAD.
 */

export type ProjectCategorie =
  | "Immobilier"
  | "Crypto"
  | "Startup & Affaires"
  | "Solidaire"
  | "Crowdfunding"
  | "Produit de forte valeur";

export type ProjectType =
  | "Résidentiel"
  | "Commercial & Bureaux"
  | "Terrains & Lotissements"
  | "Projets neufs en collecte"
  | "Fonds Crypto"
  | "Staking"
  | "Mining"
  | "NFT"
  | "Tokenisation"
  | "Startup Tech"
  | "Fintech"
  | "AgriTech"
  | "MedTech"
  | "SaaS"
  | "Logistique"
  | "Coopérative"
  | "Économie sociale"
  | "Impact social"
  | "Micro-crédit"
  | "Énergie verte"
  | "Film"
  | "Événement"
  | "Album"
  | "Produit local"
  | "Artisanat"
  | "Horlogerie"
  | "Vins & Spiritueux"
  | "Art"
  | "Or & Métaux précieux"
  | "Voitures de collection";

export type ProjectStatus = "En collecte" | "Financé" | "En construction" | "Livré";

export interface Project {
  id: string;
  nom: string;
  ville: string;
  categorie: ProjectCategorie;
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
    categorie: "Immobilier",
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
    categorie: "Immobilier",
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
    categorie: "Immobilier",
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
    categorie: "Immobilier",
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
    categorie: "Immobilier",
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

  // ─── Crypto ───
  {
    id: "btc-yield-atlas",
    nom: "Atlas Yield Fund BTC",
    ville: "Casablanca",
    categorie: "Crypto",
    typologie: "Fonds Crypto",
    image: img("photo-1518546305927-5a555bb7020d"),
    description:
      "Fonds indiciel passif adossé au Bitcoin avec rendement de prêt sécurisé, géré par une société agréée crypto-assets au Maroc.",
    budgetTotal: 24_000_000,
    montantCollecte: 14_600_000,
    objectifCollecte: 20_000_000,
    ticketMinimum: 5_000,
    rendementCible: 12.0,
    dureeMois: 36,
    scoreRisque: 58,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 264,
    joursRestants: 28,
    featured: true,
    pointsForts: [
      "Custodie chez un dépositaire réglementé.",
      "Stratégie de prêt garantie à 100 %.",
    ],
    pointsVigilance: ["Volatilité du cours du Bitcoin."],
  },
  {
    id: "stablecoin-renta",
    nom: "Stable Yield USDT",
    ville: "Rabat",
    categorie: "Crypto",
    typologie: "Staking",
    image: img("photo-1639322537228-f710d846310a"),
    description:
      "Portefeuille de staking en stablecoins sur protocoles audités, avec garde de fonds en vault multi-signatures.",
    budgetTotal: 15_000_000,
    montantCollecte: 15_000_000,
    objectifCollecte: 15_000_000,
    ticketMinimum: 5_000,
    rendementCible: 7.5,
    dureeMois: 24,
    scoreRisque: 72,
    scoreLabel: "Faible",
    statut: "Financé",
    investisseurs: 342,
    joursRestants: 0,
    pointsForts: [
      "Audit de sécurité annuel indépendant.",
      "Revenus quotidiens automatisés.",
    ],
    pointsVigilance: ["Dépendance aux taux DeFi."],
  },
  {
    id: "hash-mining-ouzoud",
    nom: "Ouzoud Hash Power",
    ville: "Beni Mellal",
    categorie: "Crypto",
    typologie: "Mining",
    image: img("photo-1518444065439-e933c06ce9cd"),
    description:
      "Ferme de minage alimentée par l'hydroélectricité du barrage d'Ouzoud, capacité cible de 8 MW.",
    budgetTotal: 45_000_000,
    montantCollecte: 18_200_000,
    objectifCollecte: 36_000_000,
    ticketMinimum: 10_000,
    rendementCible: 15.5,
    dureeMois: 48,
    scoreRisque: 52,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 138,
    joursRestants: 45,
    pointsForts: [
      "Coût d'énergie parmi les plus bas d'Afrique.",
      "Contrats de maintenance signés.",
    ],
    pointsVigilance: ["Sensibilité au prix de l'électricité."],
  },
  {
    id: "nft-art-medina",
    nom: "Medina Art Collection NFT",
    ville: "Marrakech",
    categorie: "Crypto",
    typologie: "NFT",
    image: img("photo-1541701494587-cb58502866ab"),
    description:
      "Collection NFT de 10 000 œuvres génératives d'artistes marocains, royalties reversées aux créateurs.",
    budgetTotal: 6_000_000,
    montantCollecte: 2_900_000,
    objectifCollecte: 5_000_000,
    ticketMinimum: 5_000,
    rendementCible: 18.0,
    dureeMois: 18,
    scoreRisque: 45,
    scoreLabel: "Élevé",
    statut: "En collecte",
    investisseurs: 412,
    joursRestants: 19,
    featured: true,
    pointsForts: [
      "Marché secondaire actif dès le lancement.",
      "Fonds documentaire et certificats numériques.",
    ],
    pointsVigilance: ["Marché NFT très volatil."],
  },
  {
    id: "token-art-essaouira",
    nom: "Essaouira Tokenisation",
    ville: "Essaouira",
    categorie: "Crypto",
    typologie: "Tokenisation",
    image: img("photo-1550684848-fac1c5b4e853"),
    description:
      "Tokenisation d'un riad patrimonial à Essaouira : chaque token représente une fraction de propriété locative.",
    budgetTotal: 9_500_000,
    montantCollecte: 5_800_000,
    objectifCollecte: 8_000_000,
    ticketMinimum: 5_000,
    rendementCible: 10.8,
    dureeMois: 60,
    scoreRisque: 63,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 96,
    joursRestants: 33,
    pointsForts: [
      "Rendement locatif touristique confirmé.",
      "Transparence on-chain des revenus.",
    ],
    pointsVigilance: ["Cadre réglementaire tokenisation en évolution."],
  },
  {
    id: "digital-gold-ref", 
    nom: "Digital Gold Refinery",
    ville: "Casablanca",
    categorie: "Crypto",
    typologie: "Fonds Crypto",
    image: img("photo-1610375461246-83df859d849d"),
    description:
      "Or numérique adossé à des réserves physiques certifiées, rachat garanti au cours de référence international.",
    budgetTotal: 30_000_000,
    montantCollecte: 30_000_000,
    objectifCollecte: 30_000_000,
    ticketMinimum: 10_000,
    rendementCible: 6.2,
    dureeMois: 24,
    scoreRisque: 74,
    scoreLabel: "Faible",
    statut: "Financé",
    investisseurs: 287,
    joursRestants: 0,
    pointsForts: [
      "Réserves auditées chaque trimestre.",
      "Valeur refuge décorrélée des actions.",
    ],
    pointsVigilance: ["Frais de garde annuels."],
  },

  // ─── Startup & Affaires ───
  {
    id: "fintech-simplex-pay",
    nom: "Simplex Pay — Fintech",
    ville: "Casablanca",
    categorie: "Startup & Affaires",
    typologie: "Fintech",
    image: img("photo-1556742049-0cfed4f6a45d"),
    description:
      "Application marocaine de paiement fractionné et de cagnottes familiales, déjà 80 000 utilisateurs actifs.",
    budgetTotal: 12_000_000,
    montantCollecte: 7_400_000,
    objectifCollecte: 10_000_000,
    ticketMinimum: 5_000,
    rendementCible: 21.0,
    dureeMois: 48,
    scoreRisque: 55,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 198,
    joursRestants: 25,
    featured: true,
    pointsForts: [
      "Agrément crypto-paiement en cours.",
      "Croissance de 32 % par trimestre.",
    ],
    pointsVigilance: ["Concurrence des géants du paiement."],
  },
  {
    id: "agritech-gharb-hub",
    nom: "AgriHub Gharb",
    ville: "Kénitra",
    categorie: "Startup & Affaires",
    typologie: "AgriTech",
    image: img("photo-1625246333195-78d9c38ad449"),
    description:
      "Plateforme d'irrigation intelligente et de pilotage des serres du Gharb via capteurs IoT et IA.",
    budgetTotal: 8_500_000,
    montantCollecte: 3_100_000,
    objectifCollecte: 7_000_000,
    ticketMinimum: 5_000,
    rendementCible: 17.5,
    dureeMois: 36,
    scoreRisque: 60,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 87,
    joursRestants: 41,
    pointsForts: [
      "Économies d'eau démontrées de 28 %.",
      "Contrats pilotes avec 3 coopératives.",
    ],
    pointsVigilance: ["Dépendance à l'équipement importé."],
  },
  {
    id: "medtech-tabib-care",
    nom: "Tabib Care — MedTech",
    ville: "Rabat",
    categorie: "Startup & Affaires",
    typologie: "MedTech",
    image: img("photo-1576091160399-112ba8d25d1d"),
    description:
      "Télémédecine et dossier médical partagé pour les cliniques privées marocaines, 45 cliniques partenaires.",
    budgetTotal: 14_000_000,
    montantCollecte: 14_000_000,
    objectifCollecte: 14_000_000,
    ticketMinimum: 10_000,
    rendementCible: 19.0,
    dureeMois: 42,
    scoreRisque: 58,
    scoreLabel: "Modéré",
    statut: "Financé",
    investisseurs: 173,
    joursRestants: 0,
    pointsForts: [
      "Revenu récurrent annuel stable.",
      "Partenariat avec l'ordre des médecins.",
    ],
    pointsVigilance: ["Sujette à la réglementation santé."],
  },
  {
    id: "saas-erp-atin",
    nom: "Atin ERP Pro",
    ville: "Casablanca",
    categorie: "Startup & Affaires",
    typologie: "SaaS",
    image: img("photo-1460925895917-afdab827c52f"),
    description:
      "ERP cloud pour les PME et TPE marocaines : comptabilité, facturation et paie conformes à la réglementation locale.",
    budgetTotal: 10_500_000,
    montantCollecte: 4_600_000,
    objectifCollecte: 9_000_000,
    ticketMinimum: 5_000,
    rendementCible: 16.8,
    dureeMois: 48,
    scoreRisque: 64,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 121,
    joursRestants: 15,
    pointsForts: [
      "Churn quasi nul sur 12 mois.",
      "Migration facile des concurrents locaux.",
    ],
    pointsVigilance: ["Taille du marché adressable limitée."],
  },
  {
    id: "logi-marketplace-souss",
    nom: "Souss Express — Logistique",
    ville: "Agadir",
    categorie: "Startup & Affaires",
    typologie: "Logistique",
    image: img("photo-1494412574643-ff11b0a5c1c3"),
    description:
      "Marketplace de livraison du dernier kilomètre dans le Souss, reliant coopératives et détaillants.",
    budgetTotal: 7_000_000,
    montantCollecte: 2_100_000,
    objectifCollecte: 5_500_000,
    ticketMinimum: 5_000,
    rendementCible: 14.5,
    dureeMois: 30,
    scoreRisque: 62,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 64,
    joursRestants: 52,
    pointsForts: [
      "Réseau de 120 livreurs indépendants.",
      "Contrats avec 4 coopératives agricoles.",
    ],
    pointsVigilance: ["Marge unitaire faible."],
  },
  {
    id: "edtech-tamazight-learn",
    nom: "Tamazight Learn",
    ville: "Oujda",
    categorie: "Startup & Affaires",
    typologie: "Startup Tech",
    image: img("photo-1509062522246-3755977927d7"),
    description:
      "EdTech d'apprentissage des langues berbères et arabes par IA, ciblant les diasporas et écoles marocaines.",
    budgetTotal: 5_500_000,
    montantCollecte: 1_900_000,
    objectifCollecte: 4_500_000,
    ticketMinimum: 5_000,
    rendementCible: 20.0,
    dureeMois: 36,
    scoreRisque: 48,
    scoreLabel: "Élevé",
    statut: "En collecte",
    investisseurs: 77,
    joursRestants: 60,
    featured: true,
    pointsForts: [
      "Niche peu concurrentielle et à forte identité.",
      "Soutien de fondations culturelles.",
    ],
    pointsVigilance: ["Monétisation encore à prouver."],
  },

  // ─── Solidaire ───
  {
    id: "coop-zaffran-taliouine",
    nom: "Coopérative Safran de Taliouine",
    ville: "Taliouine",
    categorie: "Solidaire",
    typologie: "Coopérative",
    image: img("photo-1515586838455-8f8f940d6853"),
    description:
      "Modernisation de la coopérative de safran de Taliouine : séchoirs solaires et labellisation AOP.",
    budgetTotal: 3_500_000,
    montantCollecte: 1_400_000,
    objectifCollecte: 2_800_000,
    ticketMinimum: 1_000,
    rendementCible: 8.0,
    dureeMois: 36,
    scoreRisque: 70,
    scoreLabel: "Faible",
    statut: "En collecte",
    investisseurs: 203,
    joursRestants: 22,
    featured: true,
    pointsForts: [
      "Impact social direct sur 320 familles.",
      "Certification bio en cours.",
    ],
    pointsVigilance: ["Dépendance aux conditions climatiques."],
  },
  {
    id: "ecole-ingenierie-atlas",
    nom: "École d'Ingénierie de l'Atlas",
    ville: "Marrakech",
    categorie: "Solidaire",
    typologie: "Impact social",
    image: img("photo-1523050854058-8df90110c9f1"),
    description:
      "Campus d'ingénierie à bourses pour les zones rurales du Haut Atlas, première promotion de 120 étudiants.",
    budgetTotal: 18_000_000,
    montantCollecte: 9_800_000,
    objectifCollecte: 15_000_000,
    ticketMinimum: 2_000,
    rendementCible: 6.5,
    dureeMois: 84,
    scoreRisque: 73,
    scoreLabel: "Faible",
    statut: "En collecte",
    investisseurs: 418,
    joursRestants: 30,
    pointsForts: [
      "Convention avec des entreprises recruteuses.",
      "Taux de réussite cible de 90 %.",
    ],
    pointsVigilance: ["Horizon de rendement long."],
  },
  {
    id: "microcredit-tiznit",
    nom: "Micro-crédit Tiznit Femmes",
    ville: "Tiznit",
    categorie: "Solidaire",
    typologie: "Micro-crédit",
    image: img("photo-1596526131083-e8c633c948d2"),
    description:
      "Fonds de micro-crédit dédié aux femmes entrepreneures de Tiznit, avec accompagnement et garantie solidaire.",
    budgetTotal: 4_000_000,
    montantCollecte: 4_000_000,
    objectifCollecte: 4_000_000,
    ticketMinimum: 1_000,
    rendementCible: 5.0,
    dureeMois: 60,
    scoreRisque: 78,
    scoreLabel: "Faible",
    statut: "Financé",
    investisseurs: 511,
    joursRestants: 0,
    pointsForts: [
      "Taux de remboursement de 96 %.",
      "Partenariat avec une ONG locale.",
    ],
    pointsVigilance: ["Rendement financier modeste."],
  },
  {
    id: "sante-rurale-taghazout",
    nom: "Santé Rurale du Haouz",
    ville: "Tahanaout",
    categorie: "Solidaire",
    typologie: "Impact social",
    image: img("photo-1579684385127-1ef15d508118"),
    description:
      "Unité médicale mobile connectée pour les douars isolés du Haouz : téléconsultations et pharmacie de proximité.",
    budgetTotal: 6_000_000,
    montantCollecte: 2_200_000,
    objectifCollecte: 5_000_000,
    ticketMinimum: 1_000,
    rendementCible: 7.0,
    dureeMois: 48,
    scoreRisque: 72,
    scoreLabel: "Faible",
    statut: "En collecte",
    investisseurs: 156,
    joursRestants: 27,
    pointsForts: [
      "Prise en charge de 18 000 consultations/an.",
      "Co-financement par le ministère de la Santé.",
    ],
    pointsVigilance: ["Logistique en zone accidentée."],
  },
  {
    id: "eau-potable-figuiq",
    nom: "Eau Potable pour Figuig",
    ville: "Figuig",
    categorie: "Solidaire",
    typologie: "Énergie verte",
    image: img("photo-1548839140-29a749e1cf4d"),
    description:
      "Réseau d'adduction et de dessalement solaire pour l'oasis de Figuig, sécurité hydrique pour 12 000 habitants.",
    budgetTotal: 9_000_000,
    montantCollecte: 5_600_000,
    objectifCollecte: 8_000_000,
    ticketMinimum: 2_000,
    rendementCible: 5.5,
    dureeMois: 60,
    scoreRisque: 74,
    scoreLabel: "Faible",
    statut: "En collecte",
    investisseurs: 231,
    joursRestants: 18,
    pointsForts: [
      "Subvention publique de 40 %.",
      "Impact environnemental mesurable.",
    ],
    pointsVigilance: ["Maintenance à distance complexe."],
  },
  {
    id: "solaire-villages-ouzoud",
    nom: "Solaire pour 12 Villages",
    ville: "Azilal",
    categorie: "Solidaire",
    typologie: "Énergie verte",
    image: img("photo-1509391366360-2e959784a276"),
    description:
      "Micro-réseaux solaires pour 12 villages non raccordés au réseau national autour d'Azilal.",
    budgetTotal: 7_500_000,
    montantCollecte: 7_500_000,
    objectifCollecte: 7_500_000,
    ticketMinimum: 1_000,
    rendementCible: 6.0,
    dureeMois: 72,
    scoreRisque: 76,
    scoreLabel: "Faible",
    statut: "Financé",
    investisseurs: 389,
    joursRestants: 0,
    featured: true,
    pointsForts: [
      "Électrification de 2 400 foyers.",
      "Crédits carbone vendables.",
    ],
    pointsVigilance: ["Durée longue avant retour."],
  },

  // ─── Crowdfunding ───
  {
    id: "film-atlas-festival",
    nom: "Film « Lueurs de l'Atlas »",
    ville: "Ouarzazate",
    categorie: "Crowdfunding",
    typologie: "Film",
    image: img("photo-1485846234645-a62644f84728"),
    description:
      "Long-métrage de fiction tourné à Ouarzazate, présélectionné pour le Festival International du Film de Marrakech.",
    budgetTotal: 5_000_000,
    montantCollecte: 1_700_000,
    objectifCollecte: 4_200_000,
    ticketMinimum: 500,
    rendementCible: 12.0,
    dureeMois: 24,
    scoreRisque: 55,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 612,
    joursRestants: 14,
    featured: true,
    pointsForts: [
      "Distribution internationale prévue.",
      "Cash-flow via droits de diffusion et festivals.",
    ],
    pointsVigilance: ["Résultat artistique incertain."],
  },
  {
    id: "festival-gnaoua-remix",
    nom: "Festival Gnaoua Remix",
    ville: "Essaouira",
    categorie: "Crowdfunding",
    typologie: "Événement",
    image: img("photo-1511671782779-c97d3d27a1d4"),
    description:
      "Édition augmentée du festival de musique gnaoua à Essaouira : scène internationale et retransmission en ligne.",
    budgetTotal: 8_000_000,
    montantCollecte: 2_900_000,
    objectifCollecte: 6_500_000,
    ticketMinimum: 1_000,
    rendementCible: 9.5,
    dureeMois: 18,
    scoreRisque: 66,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 348,
    joursRestants: 31,
    pointsForts: [
      "Billetterie prévente record.",
      "Sponsors nationaux confirmés.",
    ],
    pointsVigilance: ["Aléas météo et organisationnels."],
  },
  {
    id: "album-berber-fusion",
    nom: "Album « Fusion Berbère »",
    ville: "Agadir",
    categorie: "Crowdfunding",
    typologie: "Album",
    image: img("photo-1514320291840-2e0a9bf2a9ae"),
    description:
      "Album de fusion berbère-rock enregistré à Agadir, sortie vinyle et streaming, tournée dans 6 villes.",
    budgetTotal: 1_500_000,
    montantCollecte: 540_000,
    objectifCollecte: 1_200_000,
    ticketMinimum: 250,
    rendementCible: 8.0,
    dureeMois: 12,
    scoreRisque: 60,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 1_204,
    joursRestants: 9,
    pointsForts: [
      "Base de fans active de 40 000 abonnés.",
      "Revenus streaming et concerts.",
    ],
    pointsVigilance: ["Marge par unité faible."],
  },
  {
    id: "produit-local-argan",
    nom: "Série Argan & Co",
    ville: "Taroudant",
    categorie: "Crowdfunding",
    typologie: "Produit local",
    image: img("photo-1520333789090-1afc82db536a"),
    description:
      "Lancement d'une gamme cosmétique à l'huile d'argan équitable, produite et conditionnée localement.",
    budgetTotal: 2_800_000,
    montantCollecte: 1_100_000,
    objectifCollecte: 2_200_000,
    ticketMinimum: 500,
    rendementCible: 11.0,
    dureeMois: 24,
    scoreRisque: 64,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 429,
    joursRestants: 26,
    pointsForts: [
      "Précommandes déjà à 40 % de l'objectif.",
      "Circuit de distribution export prêt.",
    ],
    pointsVigilance: ["Pression concurrentielle élevée."],
  },
  {
    id: "artisanat-zellige-fes",
    nom: "Atelier Zellige de Fès",
    ville: "Fès",
    categorie: "Crowdfunding",
    typologie: "Artisanat",
    image: img("photo-1565625497944-b98e3152351f"),
    description:
      "Agrandissement d'un atelier de zellige à Fès et formation de 30 jeunes apprentis aux techniques traditionnelles.",
    budgetTotal: 3_200_000,
    montantCollecte: 3_200_000,
    objectifCollecte: 3_200_000,
    ticketMinimum: 500,
    rendementCible: 7.5,
    dureeMois: 36,
    scoreRisque: 72,
    scoreLabel: "Faible",
    statut: "Financé",
    investisseurs: 357,
    joursRestants: 0,
    featured: true,
    pointsForts: [
      "Commandes export en hausse de 55 %.",
      "Certification artisanale en cours.",
    ],
    pointsVigilance: ["Capacité de production limitée."],
  },
  {
    id: "marathon-des-sables-hub",
    nom: "Marathon Sables Hub",
    ville: "Merzouga",
    categorie: "Crowdfunding",
    typologie: "Événement",
    image: img("photo-1551632811-561732d1e306"),
    description:
      "Base de ravitaillement et d'hébergement pour les épreuves d'endurance du désert de Merzouga.",
    budgetTotal: 6_500_000,
    montantCollecte: 2_300_000,
    objectifCollecte: 5_000_000,
    ticketMinimum: 1_000,
    rendementCible: 10.0,
    dureeMois: 30,
    scoreRisque: 61,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 205,
    joursRestants: 38,
    pointsForts: [
      "Contrats multi-annuels avec 3 organisateurs.",
      "Activité toute l'année (tourisme sportif).",
    ],
    pointsVigilance: ["Saisonnalité forte."],
  },

  // ─── Produit de forte valeur ───
  {
    id: "montre-luxe-casa",
    nom: "Collection Horlogère Atelier",
    ville: "Casablanca",
    categorie: "Produit de forte valeur",
    typologie: "Horlogerie",
    image: img("photo-1524592094714-0f0654e20314"),
    description:
      "Fonds d'acquisition de montres de luxe (Rolex, Patek, Audemars) avec expertise et stockage sécurisé au Maroc.",
    budgetTotal: 12_000_000,
    montantCollecte: 6_800_000,
    objectifCollecte: 10_000_000,
    ticketMinimum: 10_000,
    rendementCible: 9.0,
    dureeMois: 60,
    scoreRisque: 67,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 142,
    joursRestants: 42,
    featured: true,
    pointsForts: [
      "Marché de l'occasion en forte croissance.",
      "Appréciation historique moyenne de 8 %/an.",
    ],
    pointsVigilance: ["Marché cyclique et spéculatif."],
  },
  {
    id: "whisky-single-malt-reserve",
    nom: "Réserve Single Malt Écossais",
    ville: "Rabat",
    categorie: "Produit de forte valeur",
    typologie: "Vins & Spiritueux",
    image: img("photo-1569529465841-dfecdab7503b"),
    description:
      "Fonds de spiritueux rares : fûts de single malt et éditions limitées, entreposés en cave sécurisée.",
    budgetTotal: 7_000_000,
    montantCollecte: 2_500_000,
    objectifCollecte: 5_500_000,
    ticketMinimum: 5_000,
    rendementCible: 10.5,
    dureeMois: 48,
    scoreRisque: 62,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 98,
    joursRestants: 35,
    pointsForts: [
      "Offre mondiale limitée structurellement.",
      "Revente via maisons d'enchères.",
    ],
    pointsVigilance: ["Marché de niche à liquidité réduite."],
  },
  {
    id: "diamant-certifie-ref",
    nom: "Diamants Certifiés Atlas",
    ville: "Casablanca",
    categorie: "Produit de forte valeur",
    typologie: "Or & Métaux précieux",
    image: img("photo-1605100804763-247f67b3557e"),
    description:
      "Panier de diamants certifiés GIA (>1 carat), achetés sous le marché retail et revendus aux joailliers.",
    budgetTotal: 9_000_000,
    montantCollecte: 9_000_000,
    objectifCollecte: 9_000_000,
    ticketMinimum: 10_000,
    rendementCible: 7.0,
    dureeMois: 36,
    scoreRisque: 70,
    scoreLabel: "Faible",
    statut: "Financé",
    investisseurs: 76,
    joursRestants: 0,
    pointsForts: [
      "Certification indépendante systématique.",
      "Résistance historique à l'inflation.",
    ],
    pointsVigilance: ["Spread d'achat/vente élevé."],
  },
  {
    id: "art-contemporain-maroc",
    nom: "Fonds Art Contemporain Marocain",
    ville: "Marrakech",
    categorie: "Produit de forte valeur",
    typologie: "Art",
    image: img("photo-1579783902614-a3fb3927b6a5"),
    description:
      "Collection d'œuvres d'artistes marocains émergents, exposée puis revendue via maisons de ventes internationales.",
    budgetTotal: 6_000_000,
    montantCollecte: 1_800_000,
    objectifCollecte: 5_000_000,
    ticketMinimum: 5_000,
    rendementCible: 13.0,
    dureeMois: 72,
    scoreRisque: 54,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 89,
    joursRestants: 50,
    pointsForts: [
      "Scène artistique marocaine en plein essor.",
      "Expositions à l'étranger programmées.",
    ],
    pointsVigilance: ["Valorisation très subjective."],
  },
  {
    id: "voiture-collection-motor",
    nom: "Motor Heritage Collection",
    ville: "Casablanca",
    categorie: "Produit de forte valeur",
    typologie: "Voitures de collection",
    image: img("photo-1503376780353-7e6692767b70"),
    description:
      "Garage de voitures classiques et youngtimers en parfait état, avec rénovation et revente sur le marché international.",
    budgetTotal: 15_000_000,
    montantCollecte: 7_100_000,
    objectifCollecte: 12_000_000,
    ticketMinimum: 15_000,
    rendementCible: 11.0,
    dureeMois: 60,
    scoreRisque: 60,
    scoreLabel: "Modéré",
    statut: "En collecte",
    investisseurs: 67,
    joursRestants: 20,
    pointsForts: [
      "Rareté croissante des modèles emblématiques.",
      "Atelier de restauration intégré.",
    ],
    pointsVigilance: ["Coûts de stockage et d'assurance élevés."],
  },
  {
    id: "or-physique-bullion",
    nom: "Bullion Or — Réserves Physiques",
    ville: "Marrakech",
    categorie: "Produit de forte valeur",
    typologie: "Or & Métaux précieux",
    image: img("photo-1621504450181-5d356f61d307"),
    description:
      "Lingots et pièces d'or physiques stockés en coffre bancaire, frappés par des établissements certifiés LBMA.",
    budgetTotal: 20_000_000,
    montantCollecte: 20_000_000,
    objectifCollecte: 20_000_000,
    ticketMinimum: 10_000,
    rendementCible: 6.8,
    dureeMois: 24,
    scoreRisque: 75,
    scoreLabel: "Faible",
    statut: "Financé",
    investisseurs: 254,
    joursRestants: 0,
    pointsForts: [
      "Actif tangible à liquidité mondiale.",
      "Certificat de propriété nominatif.",
    ],
    pointsVigilance: ["Coût de garde et prime de frappe."],
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
  { nom: "Gros œuvre — RDC", avancement: 100, dateDebut: "2026-01-10", dateFinPrevue: "2026-04-15", statut: "Terminée" },
  { nom: "Gros œuvre — R+1 à R+3", avancement: 72, dateDebut: "2026-04-20", dateFinPrevue: "2026-09-30", statut: "En cours" },
  { nom: "Couverture & étanchéité", avancement: 15, dateDebut: "2026-08-01", dateFinPrevue: "2026-10-30", statut: "En cours" },
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
    description: "Passage de la commission de sécurité provinciale. Avis favorable sous réserve du remplacement de deux extincteurs. PV transmis au bureau de contrôle.",
    image: img("photo-1590674899484-d5640f8545ea"),
  },
  {
    id: "UPD-020",
    date: "2026-06-10",
    titre: "Avancement R+3 — Coffrage en cours",
    description: "Le ferraillage du dernier refend du R+3 est terminé. Lancement du coffrage des poteaux prévu ce jeudi. Bétonnage estimé au 14 juin.",
    image: img("photo-1541888946425-d81bb19240f5"),
  },
  {
    id: "UPD-019",
    date: "2026-06-02",
    titre: "Réunion mensuelle — point budgétaire",
    description: "Budget consommé à 58 %. Écart de +2.3 % vs prévisionnel dû à la hausse du prix de l'acier. Avenant en cours de validation par le maître d'ouvrage.",
    image: img("photo-1454165804606-c3d57bc86b40"),
  },
  {
    id: "UPD-018",
    date: "2026-05-21",
    titre: "Coulage de la dalle du 4ᵉ niveau",
    description: "La dalle du 4ᵉ niveau (R+2) a été coulée le 21 mai avec 170 m³ de béton B25. Résistance à 28 jours conforme aux specs. Décoffrage dans 72h.",
    image: img("photo-1503387762-592deb58ef4e"),
  },
  {
    id: "UPD-017",
    date: "2026-05-08",
    titre: "Livraison des menuiseries aluminium",
    description: "Réception des menuiseries Aluminium-Tremie 4500 séries. Conformes au CCTP. Stockage en zone sécurisée. Pose programmée après l'étanchéité (semaine 32).",
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
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
