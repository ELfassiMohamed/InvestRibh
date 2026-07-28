import {
  aiValidationQueue as seedAiValidationQueue,
  auditLogs as seedAuditLogs,
  holdings as seedHoldings,
  platformUsers as seedUsers,
  portfolioEvolution as seedPortfolio,
  projects as seedProjects,
  sitePhases as seedPhases,
  siteUpdates as seedUpdates,
  submissionDrafts as seedDrafts,
  transactions as seedTransactions,
  upcomingDistributions as seedDistributions,
  type AiValidationItem,
  type AuditLog,
  type DistributionEvent,
  type Holding,
  type PlatformUser,
  type PortfolioPoint,
  type Project,
  type ProjectType,
  type SitePhase,
  type SiteUpdate,
  type SubmissionDraft,
  type Transaction,
  type UserRole,
} from "@/lib/mock-data";

const STORAGE_KEY = "place2invest_demo_store_v1";
const DEFAULT_INVESTOR_ID = "U-1042";
const DEFAULT_PORTEUR_ID = "U-2018";
const DEFAULT_PROJECT_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";
const DEFAULT_UPDATE_IMAGE =
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80";

export interface ProjectInput {
  nom: string;
  ville: string;
  typologie: ProjectType | string;
  description?: string;
  budgetTotal: number;
  objectifCollecte: number;
  ticketMinimum: number;
  rendementCible: number;
  dureeMois: number;
  pointsForts?: string[];
  pointsVigilance?: string[];
}

export interface UserInput {
  nom: string;
  email: string;
  role: UserRole;
  cin: string;
  rib: string;
}

export interface DraftInput {
  nom: string;
  ville: string;
  typologie: ProjectType | string;
  budget: number;
  montantRecherche: number;
}

export interface SiteUpdateInput {
  projectId: string;
  titre: string;
  description: string;
  image?: string;
}

type DemoHolding = Holding & { id: string; userId: string };
type DemoTransaction = Transaction & { userId: string };
type DemoDistributionEvent = DistributionEvent & { id: string };
type DemoPortfolioPoint = PortfolioPoint & { id: string; userId: string };
type DemoSubmissionDraft = SubmissionDraft & { porteurId: string };
type DemoSitePhase = SitePhase & { id: string; projectId: string };
type DemoSiteUpdate = SiteUpdate & { projectId: string };

interface DemoValidationDecision {
  id: string;
  submissionId: string;
  action: string;
  commentaire: string;
  date: string;
  decidedBy: string;
}

interface DemoStore {
  projects: Project[];
  users: PlatformUser[];
  holdings: DemoHolding[];
  transactions: DemoTransaction[];
  distributions: DemoDistributionEvent[];
  portfolio: DemoPortfolioPoint[];
  drafts: DemoSubmissionDraft[];
  phases: DemoSitePhase[];
  updates: DemoSiteUpdate[];
  aiQueue: AiValidationItem[];
  auditLogs: AuditLog[];
  validationDecisions: DemoValidationDecision[];
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function createInitialStore(): DemoStore {
  return {
    projects: clone(seedProjects),
    users: clone(seedUsers),
    holdings: seedHoldings.map((holding, index) => ({
      ...clone(holding),
      id: `holding-${index + 1}`,
      userId: DEFAULT_INVESTOR_ID,
    })),
    transactions: seedTransactions.map((transaction) => ({
      ...clone(transaction),
      userId: DEFAULT_INVESTOR_ID,
    })),
    distributions: seedDistributions.map((distribution, index) => ({
      ...clone(distribution),
      id: `distribution-${index + 1}`,
    })),
    portfolio: seedPortfolio.map((point, index) => ({
      ...clone(point),
      id: `portfolio-${index + 1}`,
      userId: DEFAULT_INVESTOR_ID,
    })),
    drafts: seedDrafts.map((draft) => ({
      ...clone(draft),
      porteurId: DEFAULT_PORTEUR_ID,
    })),
    phases: seedProjects.flatMap((project) =>
      seedPhases.map((phase, index) => ({
        ...clone(phase),
        id: `${project.id}-phase-${index + 1}`,
        projectId: project.id,
      })),
    ),
    updates: seedProjects.flatMap((project) =>
      seedUpdates.map((update) => ({
        ...clone(update),
        id: `${project.id}-${update.id}`,
        projectId: project.id,
      })),
    ),
    aiQueue: clone(seedAiValidationQueue),
    auditLogs: clone(seedAuditLogs),
    validationDecisions: [],
  };
}

function normalizeStore(value: Partial<DemoStore> | null): DemoStore {
  const initial = createInitialStore();
  if (!value || typeof value !== "object") return initial;

  return {
    projects: Array.isArray(value.projects) ? value.projects : initial.projects,
    users: Array.isArray(value.users) ? value.users : initial.users,
    holdings: Array.isArray(value.holdings) ? value.holdings : initial.holdings,
    transactions: Array.isArray(value.transactions)
      ? value.transactions
      : initial.transactions,
    distributions: Array.isArray(value.distributions)
      ? value.distributions
      : initial.distributions,
    portfolio: Array.isArray(value.portfolio) ? value.portfolio : initial.portfolio,
    drafts: Array.isArray(value.drafts) ? value.drafts : initial.drafts,
    phases: Array.isArray(value.phases) ? value.phases : initial.phases,
    updates: Array.isArray(value.updates) ? value.updates : initial.updates,
    aiQueue: Array.isArray(value.aiQueue) ? value.aiQueue : initial.aiQueue,
    auditLogs: Array.isArray(value.auditLogs) ? value.auditLogs : initial.auditLogs,
    validationDecisions: Array.isArray(value.validationDecisions)
      ? value.validationDecisions
      : initial.validationDecisions,
  };
}

function readStore(): DemoStore {
  if (typeof window === "undefined") return createInitialStore();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return normalizeStore(raw ? (JSON.parse(raw) as Partial<DemoStore>) : null);
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return createInitialStore();
  }
}

function writeStore(store: DemoStore) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function mutateStore<T>(mutator: (store: DemoStore) => T): T {
  const store = readStore();
  const result = mutator(store);
  writeStore(store);
  return clone(result);
}

function today() {
  return new Date().toISOString().split("T")[0];
}

function generateId(name: string, fallback: string) {
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);

  return `${slug || fallback}-${Date.now().toString(36).slice(-5)}`;
}

function sortProjects(projects: Project[]) {
  return [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.joursRestants - b.joursRestants,
  );
}

export function getAllUsersSync() {
  return clone(readStore().users);
}

export function resetDemoStore() {
  const store = createInitialStore();
  writeStore(store);
  return clone(store);
}

export async function getAllProjects() {
  return sortProjects(readStore().projects).map(clone);
}

export async function getProjectById(id: string) {
  return clone(readStore().projects.find((project) => project.id === id) ?? null);
}

export async function createProject(input: ProjectInput) {
  return mutateStore((store) => {
    const project: Project = {
      id: generateId(input.nom, "project"),
      nom: input.nom,
      ville: input.ville,
      typologie: input.typologie as ProjectType,
      image: DEFAULT_PROJECT_IMAGE,
      description: input.description ?? "Projet ajoute dans la demonstration locale.",
      budgetTotal: input.budgetTotal,
      montantCollecte: 0,
      objectifCollecte: input.objectifCollecte,
      ticketMinimum: input.ticketMinimum,
      rendementCible: input.rendementCible,
      dureeMois: input.dureeMois,
      scoreRisque: 70,
      scoreLabel: "Faible",
      statut: "En collecte",
      investisseurs: 0,
      joursRestants: 60,
      featured: false,
      pointsForts: input.pointsForts ?? [],
      pointsVigilance: input.pointsVigilance ?? [],
    };

    store.projects.unshift(project);
    return project;
  });
}

export async function updateProject(id: string, data: Partial<Project>) {
  return mutateStore((store) => {
    const index = store.projects.findIndex((project) => project.id === id);
    if (index === -1) return null;
    store.projects[index] = { ...store.projects[index], ...data };
    return store.projects[index];
  });
}

export async function deleteProject(id: string) {
  mutateStore((store) => {
    store.projects = store.projects.filter((project) => project.id !== id);
    store.holdings = store.holdings.filter((holding) => holding.projectId !== id);
    store.distributions = store.distributions.filter((distribution) => distribution.projectId !== id);
    store.phases = store.phases.filter((phase) => phase.projectId !== id);
    store.updates = store.updates.filter((update) => update.projectId !== id);
    return true;
  });
}

export async function getAllUsers() {
  return clone(
    [...readStore().users].sort((a, b) => b.dateInscription.localeCompare(a.dateInscription)),
  );
}

export async function getUserById(id: string) {
  return clone(readStore().users.find((user) => user.id === id) ?? null);
}

export async function getUserByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return clone(readStore().users.find((user) => user.email.toLowerCase() === normalized) ?? null);
}

export async function createUser(input: UserInput) {
  return mutateStore((store) => {
    const user: PlatformUser = {
      id: `U-${Date.now().toString(36).toUpperCase()}`,
      nom: input.nom,
      email: input.email,
      role: input.role,
      statut: "Actif",
      dateInscription: today(),
      cin: input.cin || "-",
      rib: input.rib || "-",
    };

    store.users.unshift(user);
    return user;
  });
}

export async function updateUser(id: string, data: Partial<PlatformUser>) {
  return mutateStore((store) => {
    const index = store.users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    store.users[index] = { ...store.users[index], ...data };
    return store.users[index];
  });
}

export async function deleteUser(id: string) {
  mutateStore((store) => {
    store.users = store.users.filter((user) => user.id !== id);
    return true;
  });
}

export async function toggleUserStatus(id: string) {
  return mutateStore((store) => {
    const index = store.users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    const nextStatus = store.users[index].statut === "Actif" ? "Suspendu" : "Actif";
    store.users[index] = { ...store.users[index], statut: nextStatus };
    return store.users[index];
  });
}

export async function getSubmissionDrafts(porteurId = DEFAULT_PORTEUR_ID) {
  return clone(
    [...readStore().drafts]
      .filter((draft) => draft.porteurId === porteurId)
      .sort((a, b) => b.dateMaj.localeCompare(a.dateMaj)),
  );
}

export async function getAllSubmissionDrafts() {
  return clone([...readStore().drafts].sort((a, b) => b.dateMaj.localeCompare(a.dateMaj)));
}

export async function createSubmissionDraft(input: DraftInput) {
  return mutateStore((store) => {
    const draft: DemoSubmissionDraft = {
      id: `SUB-${new Date().getFullYear()}-${String(Date.now()).slice(-3).padStart(3, "0")}`,
      nom: input.nom,
      ville: input.ville,
      typologie: input.typologie as ProjectType,
      budget: input.budget,
      montantRecherche: input.montantRecherche,
      statut: "Brouillon",
      dateMaj: today(),
      avancement: 100,
      porteurId: DEFAULT_PORTEUR_ID,
    };

    store.drafts.unshift(draft);
    return { id: draft.id };
  });
}

export async function updateSubmissionDraft(id: string, data: Partial<DemoSubmissionDraft>) {
  mutateStore((store) => {
    const index = store.drafts.findIndex((draft) => draft.id === id);
    if (index === -1) return false;
    store.drafts[index] = { ...store.drafts[index], ...data, dateMaj: today() };
    return true;
  });
}

export async function submitDraftToAi(id: string) {
  return mutateStore((store) => {
    const draftIndex = store.drafts.findIndex((draft) => draft.id === id);
    if (draftIndex === -1) return null;

    const draft = store.drafts[draftIndex];
    store.drafts[draftIndex] = { ...draft, statut: "Soumis", dateMaj: today() };

    if (!store.aiQueue.some((item) => item.submissionId === id)) {
      store.aiQueue.unshift({
        submissionId: id,
        nomProjet: draft.nom,
        porteur: "Atlas Promotion SARL",
        dateSoumission: today(),
        scoreRisque: 70,
        scoreFraude: 5,
        authenticiteDocuments: 90,
        synthese: "Dossier soumis via le portail. En attente d'analyse IA.",
        alertes: [],
      });
    }

    return { id, statut: "Soumis" };
  });
}

export async function getAiValidationQueue() {
  return clone(readStore().aiQueue);
}

export async function getValidationDecisions(submissionId: string) {
  return clone(
    readStore().validationDecisions.filter((decision) => decision.submissionId === submissionId),
  );
}

export async function submitDecision(
  submissionId: string,
  action: string,
  commentaire: string,
  decidedBy = "Mehdi Tahiri",
) {
  mutateStore((store) => {
    const decision: DemoValidationDecision = {
      id: `decision-${Date.now().toString(36)}`,
      submissionId,
      action,
      commentaire,
      date: today(),
      decidedBy,
    };

    const statusByAction: Record<string, SubmissionDraft["statut"]> = {
      approved: "Approuvé",
      "changes-requested": "En analyse IA",
      rejected: "Rejeté",
    };

    store.validationDecisions.unshift(decision);
    store.drafts = store.drafts.map((draft) =>
      draft.id === submissionId
        ? { ...draft, statut: statusByAction[action] ?? "Soumis", dateMaj: today() }
        : draft,
    );
    store.auditLogs.unshift({
      id: `LOG-${Date.now().toString(36).toUpperCase()}`,
      horodatage: `${today()} ${new Date().toTimeString().slice(0, 8)}`,
      utilisateur: decidedBy,
      role: "Agent Conformité",
      action:
        action === "approved"
          ? "Approbation projet"
          : action === "rejected"
          ? "Rejet document"
          : "Modifications demandées",
      entite: submissionId,
      ip: "-",
    });

    return true;
  });
}

export async function getSitePhases(projectId = "casa-anfa-residences") {
  return clone(readStore().phases.filter((phase) => phase.projectId === projectId));
}

export async function getSiteUpdates(projectId = "casa-anfa-residences") {
  return clone(
    readStore()
      .updates.filter((update) => update.projectId === projectId)
      .sort((a, b) => b.date.localeCompare(a.date)),
  );
}

export async function createSiteUpdate(input: SiteUpdateInput) {
  return mutateStore((store) => {
    const update: DemoSiteUpdate = {
      id: `UPD-${Date.now().toString(36).toUpperCase()}`,
      projectId: input.projectId,
      date: today(),
      titre: input.titre,
      description: input.description,
      image: input.image || DEFAULT_UPDATE_IMAGE,
    };

    store.updates.unshift(update);
    return update;
  });
}

export async function getAuditLogs() {
  return clone([...readStore().auditLogs].sort((a, b) => b.horodatage.localeCompare(a.horodatage)));
}

export async function getInvestorDashboardData(userId = DEFAULT_INVESTOR_ID) {
  const store = readStore();
  return clone({
    holdings: store.holdings.filter((holding) => holding.userId === userId),
    transactions: store.transactions
      .filter((transaction) => transaction.userId === userId)
      .sort((a, b) => b.date.localeCompare(a.date)),
    distributions: [...store.distributions].sort((a, b) => a.date.localeCompare(b.date)),
    portfolio: store.portfolio.filter((point) => point.userId === userId),
  });
}

export async function getSiteData(projectId = "casa-anfa-residences") {
  const [phases, updates] = await Promise.all([
    getSitePhases(projectId),
    getSiteUpdates(projectId),
  ]);
  return { phases, updates };
}
