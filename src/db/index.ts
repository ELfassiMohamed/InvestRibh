import Database from 'better-sqlite3';
import path from 'node:path';
import {
  projects as seedProjects,
  holdings as seedHoldings,
  transactions as seedTransactions,
  upcomingDistributions as seedDistributions,
  portfolioEvolution as seedPortfolio,
  submissionDrafts as seedDrafts,
  sitePhases as seedPhases,
  siteUpdates as seedUpdates,
  aiValidationQueue as seedAiQueue,
  platformUsers as seedUsers,
  auditLogs as seedAuditLogs,
} from '@/lib/mock-data';

let db: Database.Database | null = null;

function getDbPath(): string {
  if (process.env.NODE_ENV === 'production') {
    const tmp = process.env.TMPDIR || process.env.TEMP || '/tmp';
    return path.join(tmp, 'place2invest.db');
  }
  return path.join(process.cwd(), 'place2invest.db');
}

function getDb(): Database.Database {
  if (!db) {
    db = new Database(getDbPath());
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initSchema();
    seedIfEmpty();
  }
  return db;
}

function initSchema() {
  const d = getDb();
  d.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      nom TEXT NOT NULL,
      ville TEXT NOT NULL,
      typologie TEXT NOT NULL,
      image TEXT,
      description TEXT,
      budgetTotal REAL NOT NULL,
      montantCollecte REAL NOT NULL DEFAULT 0,
      objectifCollecte REAL NOT NULL,
      ticketMinimum REAL NOT NULL,
      rendementCible REAL NOT NULL,
      dureeMois INTEGER NOT NULL,
      scoreRisque INTEGER NOT NULL DEFAULT 50,
      scoreLabel TEXT NOT NULL DEFAULT 'Modéré',
      statut TEXT NOT NULL DEFAULT 'En collecte',
      investisseurs INTEGER NOT NULL DEFAULT 0,
      joursRestants INTEGER NOT NULL DEFAULT 30,
      featured INTEGER NOT NULL DEFAULT 0,
      pointsForts TEXT NOT NULL DEFAULT '[]',
      pointsVigilance TEXT NOT NULL DEFAULT '[]'
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      nom TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL,
      statut TEXT NOT NULL DEFAULT 'Actif',
      dateInscription TEXT NOT NULL,
      cin TEXT NOT NULL,
      rib TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS holdings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectId TEXT NOT NULL,
      userId TEXT NOT NULL DEFAULT 'U-1042',
      unites INTEGER NOT NULL,
      prixMoyen REAL NOT NULL,
      valeurActuelle REAL NOT NULL,
      dateAcquisition TEXT NOT NULL,
      FOREIGN KEY (projectId) REFERENCES projects(id)
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      type TEXT NOT NULL,
      reference TEXT NOT NULL,
      montant REAL NOT NULL,
      projet TEXT,
      statut TEXT NOT NULL DEFAULT 'Confirmé',
      userId TEXT NOT NULL DEFAULT 'U-1042'
    );

    CREATE TABLE IF NOT EXISTS distribution_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      projectId TEXT NOT NULL,
      montantEstime REAL NOT NULL,
      statut TEXT NOT NULL DEFAULT 'Planifié',
      FOREIGN KEY (projectId) REFERENCES projects(id)
    );

    CREATE TABLE IF NOT EXISTS portfolio_points (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mois TEXT NOT NULL,
      valeur REAL NOT NULL,
      userId TEXT NOT NULL DEFAULT 'U-1042'
    );

    CREATE TABLE IF NOT EXISTS submission_drafts (
      id TEXT PRIMARY KEY,
      nom TEXT NOT NULL,
      ville TEXT NOT NULL,
      typologie TEXT NOT NULL,
      budget REAL NOT NULL,
      montantRecherche REAL NOT NULL,
      statut TEXT NOT NULL DEFAULT 'Brouillon',
      dateMaj TEXT NOT NULL,
      avancement INTEGER NOT NULL DEFAULT 0,
      porteurId TEXT NOT NULL DEFAULT 'U-2018'
    );

    CREATE TABLE IF NOT EXISTS site_phases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      projectId TEXT NOT NULL DEFAULT 'casa-anfa-residences',
      nom TEXT NOT NULL,
      avancement INTEGER NOT NULL DEFAULT 0,
      dateDebut TEXT NOT NULL,
      dateFinPrevue TEXT NOT NULL,
      statut TEXT NOT NULL DEFAULT 'À venir',
      FOREIGN KEY (projectId) REFERENCES projects(id)
    );

    CREATE TABLE IF NOT EXISTS site_updates (
      id TEXT PRIMARY KEY,
      projectId TEXT NOT NULL DEFAULT 'casa-anfa-residences',
      date TEXT NOT NULL,
      titre TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      FOREIGN KEY (projectId) REFERENCES projects(id)
    );

    CREATE TABLE IF NOT EXISTS ai_validation_items (
      submissionId TEXT PRIMARY KEY,
      nomProjet TEXT NOT NULL,
      porteur TEXT NOT NULL,
      dateSoumission TEXT NOT NULL,
      scoreRisque INTEGER NOT NULL,
      scoreFraude INTEGER NOT NULL,
      authenticiteDocuments INTEGER NOT NULL,
      synthese TEXT NOT NULL,
      alertes TEXT NOT NULL DEFAULT '[]'
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      horodatage TEXT NOT NULL,
      utilisateur TEXT NOT NULL,
      role TEXT NOT NULL,
      action TEXT NOT NULL,
      entite TEXT NOT NULL,
      ip TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS validation_decisions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      submissionId TEXT NOT NULL,
      action TEXT NOT NULL,
      commentaire TEXT NOT NULL,
      date TEXT NOT NULL,
      decidedBy TEXT NOT NULL DEFAULT 'Mehdi Tahiri',
      FOREIGN KEY (submissionId) REFERENCES ai_validation_items(submissionId)
    );
  `);
}

function seedIfEmpty() {
  const d = getDb();
  const count = d.prepare('SELECT COUNT(*) as c FROM projects').get() as { c: number };
  if (count.c > 0) return;

  const insertProject = d.prepare(`INSERT INTO projects (id, nom, ville, typologie, image, description, budgetTotal, montantCollecte, objectifCollecte, ticketMinimum, rendementCible, dureeMois, scoreRisque, scoreLabel, statut, investisseurs, joursRestants, featured, pointsForts, pointsVigilance) VALUES (@id, @nom, @ville, @typologie, @image, @description, @budgetTotal, @montantCollecte, @objectifCollecte, @ticketMinimum, @rendementCible, @dureeMois, @scoreRisque, @scoreLabel, @statut, @investisseurs, @joursRestants, @featured, @pointsForts, @pointsVigilance)`);

  for (const p of seedProjects) {
    insertProject.run({
      ...p,
      featured: p.featured ? 1 : 0,
      pointsForts: JSON.stringify(p.pointsForts),
      pointsVigilance: JSON.stringify(p.pointsVigilance),
    });
  }

  const insertUser = d.prepare(`INSERT OR IGNORE INTO users (id, nom, email, role, statut, dateInscription, cin, rib) VALUES (@id, @nom, @email, @role, @statut, @dateInscription, @cin, @rib)`);
  for (const u of seedUsers) {
    insertUser.run(u);
  }

  const insertHolding = d.prepare(`INSERT INTO holdings (projectId, userId, unites, prixMoyen, valeurActuelle, dateAcquisition) VALUES (@projectId, @userId, @unites, @prixMoyen, @valeurActuelle, @dateAcquisition)`);
  for (const h of seedHoldings) {
    insertHolding.run({ ...h, userId: 'U-1042' });
  }

  const insertTx = d.prepare(`INSERT INTO transactions (id, date, type, reference, montant, projet, statut, userId) VALUES (@id, @date, @type, @reference, @montant, @projet, @statut, @userId)`);
  for (const t of seedTransactions) {
    insertTx.run({ ...t, userId: 'U-1042', projet: t.projet ?? null });
  }

  const insertDist = d.prepare(`INSERT INTO distribution_events (date, projectId, montantEstime, statut) VALUES (@date, @projectId, @montantEstime, @statut)`);
  for (const d of seedDistributions) {
    insertDist.run(d);
  }

  const insertPort = d.prepare(`INSERT INTO portfolio_points (mois, valeur, userId) VALUES (@mois, @valeur, @userId)`);
  for (const p of seedPortfolio) {
    insertPort.run({ ...p, userId: 'U-1042' });
  }

  const insertDraft = d.prepare(`INSERT INTO submission_drafts (id, nom, ville, typologie, budget, montantRecherche, statut, dateMaj, avancement, porteurId) VALUES (@id, @nom, @ville, @typologie, @budget, @montantRecherche, @statut, @dateMaj, @avancement, @porteurId)`);
  for (const s of seedDrafts) {
    insertDraft.run({ ...s, porteurId: 'U-2018' });
  }

  const insertPhase = d.prepare(`INSERT INTO site_phases (projectId, nom, avancement, dateDebut, dateFinPrevue, statut) VALUES (@projectId, @nom, @avancement, @dateDebut, @dateFinPrevue, @statut)`);
  for (const p of seedPhases) {
    insertPhase.run({ ...p, projectId: 'casa-anfa-residences' });
  }

  const insertUpdate = d.prepare(`INSERT INTO site_updates (id, projectId, date, titre, description, image) VALUES (@id, @projectId, @date, @titre, @description, @image)`);
  for (const u of seedUpdates) {
    insertUpdate.run({ ...u, projectId: 'casa-anfa-residences' });
  }

  const insertAi = d.prepare(`INSERT INTO ai_validation_items (submissionId, nomProjet, porteur, dateSoumission, scoreRisque, scoreFraude, authenticiteDocuments, synthese, alertes) VALUES (@submissionId, @nomProjet, @porteur, @dateSoumission, @scoreRisque, @scoreFraude, @authenticiteDocuments, @synthese, @alertes)`);
  for (const a of seedAiQueue) {
    insertAi.run({ ...a, alertes: JSON.stringify(a.alertes) });
  }

  const insertAudit = d.prepare(`INSERT INTO audit_logs (id, horodatage, utilisateur, role, action, entite, ip) VALUES (@id, @horodatage, @utilisateur, @role, @action, @entite, @ip)`);
  for (const a of seedAuditLogs) {
    insertAudit.run(a);
  }
}

// ─── Projects ───

export interface ProjectInput {
  nom: string;
  ville: string;
  typologie: string;
  description?: string;
  budgetTotal: number;
  objectifCollecte: number;
  ticketMinimum: number;
  rendementCible: number;
  dureeMois: number;
  pointsForts?: string[];
  pointsVigilance?: string[];
}

export function getAllProjects() {
  const d = getDb();
  const rows = d.prepare('SELECT * FROM projects ORDER BY featured DESC, joursRestants ASC').all() as any[];
  return rows.map(deserializeProject);
}

export function getProjectById(id: string) {
  const d = getDb();
  const row = d.prepare('SELECT * FROM projects WHERE id = ?').get(id) as any;
  return row ? deserializeProject(row) : null;
}

export function createProject(input: ProjectInput) {
  const d = getDb();
  const id = generateId(input.nom);
  d.prepare(`INSERT INTO projects (id, nom, ville, typologie, image, description, budgetTotal, montantCollecte, objectifCollecte, ticketMinimum, rendementCible, dureeMois, scoreRisque, scoreLabel, statut, investisseurs, joursRestants, featured, pointsForts, pointsVigilance) VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, 70, 'Faible', 'En collecte', 0, 60, 0, ?, ?)`).run(
    id, input.nom, input.ville, input.typologie, null, input.description ?? null, input.budgetTotal, input.objectifCollecte, input.ticketMinimum, input.rendementCible, input.dureeMois,
    JSON.stringify(input.pointsForts ?? []), JSON.stringify(input.pointsVigilance ?? [])
  );
  return getProjectById(id);
}

export function updateProject(id: string, data: Partial<ProjectInput & { statut: string; montantCollecte: number; investisseurs: number; joursRestants: number; scoreRisque: number; scoreLabel: string }>) {
  const d = getDb();
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      if (key === 'pointsForts' || key === 'pointsVigilance') {
        fields.push(`${key} = ?`);
        values.push(JSON.stringify(value));
      } else {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
  }
  if (fields.length === 0) return getProjectById(id);
  values.push(id);
  d.prepare(`UPDATE projects SET ${fields.join(', ')} WHERE id = ?`).run(...values);
  return getProjectById(id);
}

export function deleteProject(id: string) {
  const d = getDb();
  d.prepare('DELETE FROM projects WHERE id = ?').run(id);
}

function deserializeProject(row: any) {
  return {
    ...row,
    featured: !!row.featured,
    pointsForts: JSON.parse(row.pointsForts || '[]'),
    pointsVigilance: JSON.parse(row.pointsVigilance || '[]'),
  };
}

// ─── Users ───

export interface UserInput {
  nom: string;
  email: string;
  role: string;
  cin: string;
  rib: string;
}

export function getAllUsers() {
  const d = getDb();
  return d.prepare('SELECT * FROM users ORDER BY dateInscription DESC').all() as any[];
}

export function getUserById(id: string) {
  const d = getDb();
  return d.prepare('SELECT * FROM users WHERE id = ?').get(id) as any;
}

export function createUser(input: UserInput) {
  const d = getDb();
  const id = `U-${Date.now().toString(36).toUpperCase()}`;
  const today = new Date().toISOString().split('T')[0];
  d.prepare('INSERT INTO users (id, nom, email, role, statut, dateInscription, cin, rib) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(
    id, input.nom, input.email, input.role, 'Actif', today, input.cin, input.rib
  );
  return getUserById(id);
}

export function updateUser(id: string, data: Partial<UserInput & { statut: string }>) {
  const d = getDb();
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return getUserById(id);
  values.push(id);
  d.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`).run(...values);
  return getUserById(id);
}

export function deleteUser(id: string) {
  const d = getDb();
  d.prepare('DELETE FROM users WHERE id = ?').run(id);
}

// ─── Holdings ───

export function getHoldingsByUser(userId = 'U-1042') {
  const d = getDb();
  return d.prepare('SELECT * FROM holdings WHERE userId = ?').all(userId) as any[];
}

// ─── Transactions ───

export function getTransactionsByUser(userId = 'U-1042') {
  const d = getDb();
  return d.prepare('SELECT * FROM transactions WHERE userId = ? ORDER BY date DESC').all(userId) as any[];
}

// ─── Distribution Events ───

export function getDistributionEvents() {
  const d = getDb();
  return d.prepare('SELECT * FROM distribution_events ORDER BY date ASC').all() as any[];
}

// ─── Portfolio Points ───

export function getPortfolioPoints(userId = 'U-1042') {
  const d = getDb();
  return d.prepare('SELECT * FROM portfolio_points WHERE userId = ? ORDER BY id ASC').all(userId) as any[];
}

// ─── Submission Drafts ───

export interface DraftInput {
  nom: string;
  ville: string;
  typologie: string;
  budget: number;
  montantRecherche: number;
}

export function getSubmissionDrafts(porteurId = 'U-2018') {
  const d = getDb();
  return d.prepare('SELECT * FROM submission_drafts WHERE porteurId = ? ORDER BY dateMaj DESC').all(porteurId) as any[];
}

export function getAllSubmissionDrafts() {
  const d = getDb();
  return d.prepare('SELECT * FROM submission_drafts ORDER BY dateMaj DESC').all() as any[];
}

export function createSubmissionDraft(input: DraftInput) {
  const d = getDb();
  const id = `SUB-${new Date().getFullYear()}-${String(Date.now()).slice(-3).padStart(3, '0')}`;
  const today = new Date().toISOString().split('T')[0];
  d.prepare('INSERT INTO submission_drafts (id, nom, ville, typologie, budget, montantRecherche, statut, dateMaj, avancement, porteurId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(
    id, input.nom, input.ville, input.typologie, input.budget, input.montantRecherche, 'Brouillon', today, 100, 'U-2018'
  );
  return { id };
}

export function updateSubmissionDraft(id: string, data: Partial<DraftInput & { statut: string; avancement: number }>) {
  const d = getDb();
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return;
  fields.push('dateMaj = ?');
  values.push(new Date().toISOString().split('T')[0]);
  values.push(id);
  d.prepare(`UPDATE submission_drafts SET ${fields.join(', ')} WHERE id = ?`).run(...values);
}

export function submitDraftToAi(id: string) {
  const d = getDb();
  const draft = d.prepare('SELECT * FROM submission_drafts WHERE id = ?').get(id) as any;
  if (!draft) return null;
  d.prepare("UPDATE submission_drafts SET statut = 'Soumis', dateMaj = ? WHERE id = ?").run(new Date().toISOString().split('T')[0], id);
  d.prepare(`INSERT OR IGNORE INTO ai_validation_items (submissionId, nomProjet, porteur, dateSoumission, scoreRisque, scoreFraude, authenticiteDocuments, synthese, alertes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
    draft.id, draft.nom, 'Atlas Promotion SARL', new Date().toISOString().split('T')[0], 70, 5, 90, 'Dossier soumis via le portail. En attente d\'analyse IA.', '[]'
  );
  return { id: draft.id, statut: 'Soumis' };
}

// ─── AI Validation ───

export function getAiValidationQueue() {
  const d = getDb();
  const items = d.prepare('SELECT * FROM ai_validation_items').all() as any[];
  return items.map((item: any) => ({
    ...item,
    alertes: JSON.parse(item.alertes || '[]'),
  }));
}

export function getValidationDecisions(submissionId: string) {
  const d = getDb();
  return d.prepare('SELECT * FROM validation_decisions WHERE submissionId = ? ORDER BY date DESC').all(submissionId) as any[];
}

export function submitDecision(submissionId: string, action: string, commentaire: string, decidedBy = 'Mehdi Tahiri') {
  const d = getDb();
  const today = new Date().toISOString().split('T')[0];
  d.prepare('INSERT INTO validation_decisions (submissionId, action, commentaire, date, decidedBy) VALUES (?, ?, ?, ?, ?)').run(submissionId, action, commentaire, today, decidedBy);
  const statutMap: Record<string, string> = { approved: 'Approuvé', 'changes-requested': 'En analyse IA', rejected: 'Rejeté' };
  const newStatut = statutMap[action] || 'Soumis';
  d.prepare('UPDATE submission_drafts SET statut = ?, dateMaj = ? WHERE id = ?').run(newStatut, today, submissionId);
  d.prepare(`INSERT INTO audit_logs (id, horodatage, utilisateur, role, action, entite, ip) VALUES (?, ?, ?, ?, ?, ?, ?)`).run(
    `LOG-${Date.now().toString(36).toUpperCase()}`,
    `${today} ${new Date().toTimeString().slice(0, 8)}`,
    decidedBy,
    'Agent Conformité',
    action === 'approved' ? 'Approbation projet' : action === 'rejected' ? 'Rejet document' : 'Modifications demandées',
    submissionId,
    '—'
  );
}

// ─── Site Data ───

export function getSitePhases(projectId = 'casa-anfa-residences') {
  const d = getDb();
  return d.prepare('SELECT * FROM site_phases WHERE projectId = ? ORDER BY id ASC').all(projectId) as any[];
}

export function getSiteUpdates(projectId = 'casa-anfa-residences') {
  const d = getDb();
  return d.prepare('SELECT * FROM site_updates WHERE projectId = ? ORDER BY date DESC').all(projectId) as any[];
}

// ─── Audit Logs ───

export function getAuditLogs() {
  const d = getDb();
  return d.prepare('SELECT * FROM audit_logs ORDER BY horodatage DESC').all() as any[];
}

// ─── Lookup ───

export function getUserByEmail(email: string) {
  const d = getDb();
  return d.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
}

export function getInvestorDashboardData(userId = 'U-1042') {
  const holdings = getHoldingsByUser(userId);
  const transactions = getTransactionsByUser(userId);
  const distributions = getDistributionEvents();
  const portfolio = getPortfolioPoints(userId);
  return { holdings, transactions, distributions, portfolio };
}

// ─── Helpers ───

function generateId(name: string): string {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) + '-' + Date.now().toString(36).slice(-4);
}
