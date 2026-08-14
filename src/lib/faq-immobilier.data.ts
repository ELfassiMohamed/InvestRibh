export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "comprendre",
    title: "Comprendre Place2Invest Immobilier",
    items: [
      {
        id: "comprendre-quest-ce",
        question: "Qu'est-ce que Place2Invest ?",
        answer:
          "Place2Invest est une plateforme d'investissement collaboratif qui permet d'investir dans l'immobilier marocain à partir d'un montant accessible, sans passer par un crédit bancaire classique. Chaque bien proposé est analysé par un moteur d'intelligence artificielle avant d'être ouvert aux investisseurs, puis fractionné en parts numériques que vous pouvez acquérir directement depuis la plateforme.",
      },
      {
        id: "comprendre-fonctionnement",
        question: "Comment fonctionne l'investissement immobilier participatif ?",
        answer:
          "Un porteur de projet (promoteur) soumet un bien ou un programme immobilier sur la plateforme. Après vérification et analyse par notre pipeline IA (risque, viabilité, détection de fraude), le projet est publié. Les investisseurs achètent des parts numériques du projet jusqu'à ce que l'objectif de collecte soit atteint. Une fois le bien exploité (location, revente, ou achèvement du programme), les revenus sont reversés aux investisseurs au prorata de leur participation.",
      },
      {
        id: "comprendre-fractionnement",
        question: "Qu'est-ce que le « fractionnement » d'un bien immobilier ?",
        answer:
          "C'est le principe qui permet de diviser la valeur d'un bien immobilier en un grand nombre de parts numériques de faible montant. Plutôt que d'acheter un appartement entier, vous achetez une fraction de sa valeur — comme une action pour une entreprise, mais pour un bien immobilier.",
      },
      {
        id: "comprendre-difference",
        question:
          "En quoi est-ce différent d'un achat immobilier classique ou d'un crédit bancaire ?",
        answer:
          "Vous n'avez pas besoin d'apport personnel élevé, de dossier de crédit, ni de gérer le bien vous-même (locataires, entretien, fiscalité locale). Vous investissez le montant de votre choix, vous suivez la performance depuis votre tableau de bord, et la gestion opérationnelle reste à la charge du porteur de projet.",
      },
    ],
  },
  {
    id: "investir",
    title: "Investir sur la plateforme",
    items: [
      {
        id: "investir-montant-minimum",
        question: "Quel est le montant minimum pour investir ?",
        answer:
          "Le ticket d'entrée est volontairement bas afin de rendre l'immobilier accessible à un public plus large qu'un investissement classique — l'objectif est de permettre un premier investissement sans avoir à mobiliser l'épargne d'un apport immobilier traditionnel. `[DEMO]` *(montant exact à définir selon le paramétrage de la campagne de démonstration)*",
      },
      {
        id: "investir-choisir",
        question: "Comment choisir un projet dans lequel investir ?",
        answer:
          "Chaque projet dispose d'une fiche détaillée : localisation, type de bien, montant recherché, durée estimée, rendement cible, et surtout un **score généré par notre IA** qui évalue objectivement le risque et la viabilité économique du projet. Vous pouvez comparer plusieurs projets avant de décider.",
      },
      {
        id: "investir-rendement",
        question: "Quel rendement puis-je espérer ?",
        answer:
          "Le rendement affiché sur chaque projet est une **estimation**, calculée par notre simulateur de ROI à partir des caractéristiques du bien, et non une garantie. Comme tout investissement immobilier, le rendement réel dépend de la performance effective du projet (location, revente, délais de construction).",
      },
      {
        id: "investir-duree",
        question: "Sur quelle durée mon argent est-il investi ?",
        answer:
          "Chaque projet affiche une durée cible indicative (par exemple le temps de construction puis de commercialisation, ou une durée de détention locative). Il s'agit d'un placement de moyen à long terme : contrairement à une épargne classique, les fonds investis ne sont pas destinés à être retirés à tout moment.",
      },
      {
        id: "investir-suivi",
        question: "Comment suivre l'évolution de mon investissement ?",
        answer:
          "Votre tableau de bord personnel affiche en temps réel la valeur de votre portefeuille, le cash-flow généré, les dividendes cumulés et le rendement moyen pondéré de l'ensemble de vos investissements. Un coffre-fort documentaire centralise vos attestations et l'historique de toutes vos transactions.",
      },
      {
        id: "investir-plusieurs-projets",
        question: "Puis-je investir dans plusieurs projets à la fois ?",
        answer:
          "Oui. Vous pouvez répartir votre capital sur plusieurs projets afin de diversifier votre exposition, exactement comme vous le feriez avec un portefeuille financier classique.",
      },
    ],
  },
  {
    id: "securite-conformite",
    title: "Sécurité, intelligence artificielle et conformité",
    items: [
      {
        id: "securite-donnees",
        question: "Comment mes données personnelles sont-elles protégées ?",
        answer:
          "Vos données sensibles (pièce d'identité, RIB) sont chiffrées selon des standards bancaires (AES-256), les communications avec la plateforme sont sécurisées (TLS), et chaque action est enregistrée dans un journal d'audit horodaté, incluant le rôle de l'utilisateur et l'adresse IP concernée.",
      },
      {
        id: "securite-ekyc",
        question: "Pourquoi dois-je vérifier mon identité (eKYC) avant d'investir ?",
        answer:
          "La vérification d'identité à distance (eKYC), incluant un test de vivacité, est une étape obligatoire avant toute opération. Elle permet de vous authentifier de façon sûre, de sécuriser votre compte, et de respecter les obligations réglementaires applicables à toute plateforme de financement participatif au Maroc.",
      },
      {
        id: "securite-ia",
        question:
          "Quel est le rôle exact de l'intelligence artificielle dans le processus d'investissement ?",
        answer:
          "Avant qu'un projet ne soit publié, notre pipeline d'IA multi-agents l'analyse selon plusieurs critères : viabilité économique, cohérence des documents fournis, détection de signaux de fraude, et estimation du rendement potentiel. Chaque analyse produit un rapport **explicable** : vous voyez sur quels critères le score du projet repose, ce n'est pas une « boîte noire ».",
      },
      {
        id: "securite-reglementee",
        question: "Place2Invest est-elle une plateforme réglementée ?",
        answer:
          "Place2Invest est conçue pour opérer dans le cadre de la loi n° 15-18 relative au financement participatif, sous la supervision de l'Autorité Marocaine du Marché des Capitaux (AMMC) pour les opérations d'investissement en capital, et dans le respect des exigences de Bank Al-Maghrib et de la CNDP pour la protection des données personnelles. `[DEMO]` *La version de démonstration illustre ce fonctionnement cible ; le dossier d'agrément est en cours de constitution.*",
      },
      {
        id: "securite-suspect",
        question:
          "Que se passe-t-il si un projet ou un porteur de projet est signalé comme suspect ?",
        answer:
          "Toute anomalie détectée par le module de conformité IA est transmise à un agent de conformité humain pour validation avant toute suite donnée. Aucune décision de blocage ou de signalement n'est prise uniquement par l'algorithme.",
      },
    ],
  },
  {
    id: "porteurs-de-projets",
    title: "Porteurs de projets (promoteurs)",
    items: [
      {
        id: "porteurs-soumettre",
        question: "Comment un promoteur peut-il proposer un projet sur Place2Invest ?",
        answer:
          "Le porteur de projet crée un compte dédié et soumet son dossier via un formulaire structuré en plusieurs étapes : présentation du bien, plans techniques, documents juridiques et business plan. Le dossier est ensuite analysé par notre pipeline IA avant validation par un agent de conformité.",
      },
      {
        id: "porteurs-documents",
        question: "Quels documents sont nécessaires pour soumettre un projet ?",
        answer:
          "Les pièces techniques (plans, permis de construire le cas échéant), les documents juridiques attestant de la propriété ou des droits sur le bien, ainsi qu'un plan de financement détaillé (business plan) sont demandés lors de la soumission.",
      },
      {
        id: "porteurs-avancement",
        question: "Comment les investisseurs suivent-ils l'avancement du chantier ?",
        answer:
          "Une fois la collecte lancée, le porteur de projet peut publier des mises à jour régulières sur l'avancement des travaux et le respect des différentes phases de construction, visibles directement par les investisseurs ayant financé le projet — pour maintenir une communication continue et transparente.",
      },
    ],
  },
  {
    id: "risques-et-garanties",
    title: "Risques et garanties",
    items: [
      {
        id: "risques-principaux",
        question: "Quels sont les principaux risques d'un investissement immobilier participatif ?",
        answer:
          "Comme tout investissement, le capital n'est pas garanti : la valeur du bien peut évoluer, un chantier peut prendre du retard, et le rendement estimé n'est jamais assuré. Il s'agit d'un placement en capital, à distinguer d'un produit d'épargne réglementée.",
      },
      {
        id: "risques-collecte",
        question: "Que se passe-t-il si un projet n'atteint pas son objectif de collecte ?",
        answer:
          "Si le montant cible n'est pas atteint dans le délai imparti, la campagne est clôturée sans être exécutée et les montants déjà engagés par les investisseurs sont restitués, selon les modalités précisées sur la fiche de chaque projet.",
      },
      {
        id: "risques-capital-garanti",
        question: "Mon capital est-il garanti par Place2Invest ?",
        answer:
          "Non. Place2Invest est un intermédiaire technologique qui met en relation investisseurs et porteurs de projets, dans un cadre sécurisé et vérifié par IA — la plateforme n'est pas un assureur et ne garantit pas le capital investi ni le rendement affiché.",
      },
    ],
  },
  {
    id: "diaspora-et-gestion-du-compte",
    title: "Diaspora (MRE) et gestion du compte",
    items: [
      {
        id: "diaspora-mre",
        question: "Un Marocain résidant à l'étranger (MRE) peut-il investir depuis l'étranger ?",
        answer:
          "Oui, la plateforme est pensée pour être utilisable à distance de bout en bout : ouverture de compte, vérification d'identité (eKYC) et investissement peuvent se faire en ligne, sans nécessiter de déplacement au Maroc.",
      },
      {
        id: "compte-creer",
        question: "Comment créer un compte sur Place2Invest ?",
        answer:
          "L'inscription se fait en ligne : création du compte, vérification d'identité (eKYC) et authentification à deux facteurs (2FA) par SMS avant de pouvoir accéder aux projets et investir.",
      },
      {
        id: "compte-support",
        question: "Comment contacter le support en cas de question ?",
        answer:
          "Un formulaire de contact et un centre d'aide sont accessibles depuis votre espace personnel pour toute question relative à votre compte, un projet, ou le fonctionnement de la plateforme. `[DEMO]` *(canal de support à préciser : email, chat, téléphone)*",
      },
    ],
  },
];
