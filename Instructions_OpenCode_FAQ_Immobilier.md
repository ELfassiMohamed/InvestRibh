# Instructions OpenCode — Page FAQ Immobilier (Place2Invest)

> À utiliser telles quelles : ouvrez `opencode` à la racine de votre projet, collez ce fichier (ou son contenu) comme prompt. Placez au préalable `FAQ_Immobilier_Place2Invest.md` à la racine du repo (ou dans `/docs`) — les instructions y font référence.

---

## 0. Étape préalable — exploration du projet (obligatoire avant de coder)

Avant d'écrire la moindre ligne de code, explore le dépôt pour identifier :
1. Le framework frontend utilisé (Angular attendu, conformément au stack MEAN du projet — mais **vérifie** en inspectant `package.json`, la présence d'`angular.json`, ou équivalent, plutôt que de le supposer).
2. La structure de dossiers existante pour les pages/composants (ex. `src/app/pages/`, `src/app/features/`, ou autre convention déjà en place).
3. Le système de style utilisé (SCSS pur, Tailwind, Angular Material, composants maison) en regardant un composant existant représentatif (ex. une page déjà stylée du parcours Investisseur).
4. La convention de routage existante (`app-routing.module.ts` ou fichiers de routes équivalents) pour savoir comment déclarer une nouvelle route.
5. Le système d'internationalisation s'il existe (i18n, fichiers de traduction) — le contenu FAQ est en français ; si le projet gère plusieurs langues, respecte ce mécanisme au lieu de coder le texte en dur.

Si le projet ne correspond pas à Angular, adapte l'implémentation à la stack réellement détectée en conservant la même logique fonctionnelle décrite ci-dessous.

---

## 1. Objectif

Ajouter une page **FAQ — Section Immobilier** à la plateforme de démonstration Place2Invest, accessible aux visiteurs et aux utilisateurs connectés, présentant les questions fréquentes propres à la verticale Immobilier (seule verticale active dans cette démo).

---

## 2. Contenu à intégrer

Utilise **exactement** le contenu du fichier `FAQ_Immobilier_Place2Invest.md` fourni dans le repo. Ne réécris pas les questions/réponses : structure-les en données (voir §3), sans altérer le texte.

Le fichier contient 6 catégories :
1. Comprendre Place2Invest Immobilier
2. Investir sur la plateforme
3. Sécurité, intelligence artificielle et conformité
4. Porteurs de projets (promoteurs)
5. Risques et garanties
6. Diaspora (MRE) et gestion du compte

Certaines réponses contiennent un marqueur `[DEMO]` suivi d'une précision entre crochets/italiques — ce sont des placeholders à garder visibles tels quels (ou à retirer si tu préfères une FAQ définitive), **pas des instructions de code**.

---

## 3. Spécifications fonctionnelles

- **Structure de données** : convertis le contenu Markdown en un tableau structuré (JSON/TS), par exemple :
  ```ts
  interface FaqItem {
    id: string;
    category: string;
    question: string;
    answer: string; // peut contenir du HTML simple (gras, italique)
  }
  ```
  Un seul fichier de données (ex. `faq-immobilier.data.ts`) contenant les 6 catégories et leurs questions, généré à partir du contenu fourni.

- **Affichage** : accordéon (accordion) groupé par catégorie.
  - Les catégories sont affichées comme des sections avec un titre.
  - Chaque question est repliée par défaut ; un clic/tap déplie la réponse.
  - Plusieurs questions peuvent être ouvertes simultanément (pas de comportement "un seul ouvert à la fois", sauf si le design system du projet impose déjà cette convention ailleurs — dans ce cas, reste cohérent avec l'existant).

- **Navigation par catégorie** : une barre de navigation ou des onglets en haut de page permettant de sauter directement à une catégorie (ancre `#securite-conformite`, etc.).

- **Recherche (optionnel mais recommandé)** : un champ de recherche filtrant les questions par mot-clé en temps réel (sur `question` et `answer`), qui masque les catégories sans résultat.

- **Lien de navigation** : ajoute un lien "FAQ" dans le menu/footer existant du parcours Immobilier, en respectant la structure de navigation déjà en place.

---

## 4. Spécifications techniques (si Angular confirmé à l'étape 0)

- Génère un composant dédié, par exemple `FaqImmobilierComponent`, avec la commande Angular CLI standard (`ng generate component ...`) plutôt qu'en créant les fichiers à la main, pour respecter les conventions du projet (module, spec file, etc.).
- Déclare une route `/faq` ou `/immobilier/faq` (choisis le préfixe cohérent avec les routes existantes du parcours Immobilier observées à l'étape 0).
- Utilise les composants d'accordéon déjà disponibles dans le projet s'il en existe (Angular Material `mat-expansion-panel`, ou composant maison) plutôt que d'en recoder un — vérifie d'abord si `@angular/material` ou une librairie UI est déjà une dépendance du projet.
- **Accessibilité** : chaque question doit être un bouton (`<button>`) avec `aria-expanded` synchronisé sur l'état ouvert/fermé, et `aria-controls` pointant vers l'identifiant de la réponse associée. Le contenu doit rester navigable au clavier (Tab + Entrée/Espace).
- **Responsive** : la page doit rester lisible sur mobile (empilement vertical, pas de tableau large qui déborde).

---

## 5. Style et design

- **Ne crée aucune nouvelle palette de couleurs.** Réutilise les variables CSS / thème / design tokens déjà définis dans le projet (repère-les à l'étape 0 : fichier de variables SCSS, thème Angular Material personnalisé, ou classes utilitaires existantes).
- Reprends la typographie et les composants déjà utilisés sur les autres pages du parcours Immobilier (boutons, titres de section, espacements) pour une cohérence visuelle immédiate avec le reste de la démo.
- Si le projet utilise déjà des icônes (chevron, plus/moins) pour d'autres éléments dépliables, réutilise la même icône pour l'indicateur d'ouverture/fermeture de l'accordéon.

---

## 6. SEO / méta-informations

- Ajoute un titre de page (`<title>`) du type « FAQ Immobilier – Place2Invest » et une balise meta description reprenant en une phrase l'objet de la page, en suivant le mécanisme déjà utilisé par le projet pour gérer les balises meta par route (`Title` service Angular, `Meta` service Angular, ou équivalent détecté à l'étape 0).

---

## 7. Étapes d'implémentation (ordre recommandé)

1. Explorer le repo (§0) et confirmer stack, conventions de dossiers, système de style, système de routage.
2. Créer le fichier de données structuré à partir de `FAQ_Immobilier_Place2Invest.md` (§3).
3. Générer le composant FAQ et son template (§3-4).
4. Implémenter le comportement accordéon + navigation par catégorie.
5. Implémenter la recherche par mot-clé (si retenue).
6. Ajouter la route et le lien de navigation vers la nouvelle page.
7. Appliquer le style en réutilisant les tokens/composants existants (§5).
8. Ajouter les balises meta (§6).
9. Vérifier la navigation clavier et les attributs ARIA.
10. Tester l'affichage en mobile et desktop.

---

## 8. Critères d'acceptation

- [ ] Les 6 catégories et l'ensemble des questions/réponses du fichier `FAQ_Immobilier_Place2Invest.md` sont présentes, sans altération du texte.
- [ ] Chaque question se déplie/replie au clic, et est également activable au clavier.
- [ ] La page est accessible depuis un lien visible du parcours Immobilier (menu ou footer).
- [ ] Aucune nouvelle couleur ou police n'a été introduite hors du système de design existant.
- [ ] La page s'affiche correctement sur un viewport mobile (ex. 375px de large) sans débordement horizontal.
- [ ] Le build du projet passe sans erreur après l'ajout (`ng build` ou équivalent détecté à l'étape 0).

---

## 9. Ce qu'il ne faut PAS faire

- Ne pas inventer de nouvelles réponses ou questions non présentes dans le fichier fourni.
- Ne pas coder cette page comme une page statique isolée déconnectée du routage/layout existant de l'application (elle doit s'intégrer au shell applicatif déjà en place — header, footer, thème).
- Ne pas supprimer les marqueurs `[DEMO]` sans le signaler explicitement dans le résumé final des changements — l'utilisateur doit savoir quelles réponses restent à finaliser avant une mise en production réelle.
