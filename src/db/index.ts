import initSqlJs, { type Database as SqlJsDatabase } from 'sql.js';
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

let db: SqlJsDatabase | null = null;
let initPromise: Promise<void> | null = null;

async function getDb(): Promise<SqlJsDatabase> {
  if (db) return db;

  if (!initPromise) {
    initPromise = (async () => {
      const SQL = await initSqlJs();
      const instance = new SQL.Database();
      instance.run('PRAGMA foreign_keys = ON');
      instance.run('PRAGMA journal_mode = MEMORY');
      initSchema(instance);
      seedIfEmpty(instance);
      db = instance;
    })();
  }

  await initPromise;
  return db!;
}

function initSchema(d: SqlJsDatabase) {
  d.run(`
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

function seedIfEmpty(d: SqlJsDatabase) {
  const result = d.exec('SELECT COUNT(*) as c FROM projects');
  const count = result.length > 0 ? (result[0].values[0][0] as number) : 0;
  if (count > 0) return;

  for (const p of seedProjects) {
    d.run(
      `INSERT INTO projects (id, nom, ville, typologie, image, description, budgetTotal, montantCollecte, objectifCollecte, ticketMinimum, rendementCible, dureeMois, scoreRisque, scoreLabel, statut, investisseurs, joursRestants, featured, pointsForts, pointsVigilance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        p.id, p.nom, p.ville, p.typologie, p.image, p.description,
        p.budgetTotal, p.montantCollecte, p.objectifCollecte, p.ticketMinimum,
        p.rendementCible, p.dureeMois, p.scoreRisque, p.scoreLabel, p.statut,
        p.investisseurs, p.joursRestants, p.featured ? 1 : 0,
        JSON.stringify(p.pointsForts), JSON.stringify(p.pointsVigilance),
      ],
    );
  }

  for (const u of seedUsers) {
    d.run(
      `INSERT OR IGNORE INTO users (id, nom, email, role, statut, dateInscription, cin, rib) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [u.id, u.nom, u.email, u.role, u.statut, u.dateInscription, u.cin, u.rib],
    );
  }

  for (const h of seedHoldings) {
    d.run(
      `INSERT INTO holdings (projectId, userId, unites, prixMoyen, valeurActuelle, dateAcquisition) VALUES (?, ?, ?, ?, ?, ?)`,
      [h.projectId, 'U-1042', h.unites, h.prixMoyen, h.valeurActuelle, h.dateAcquisition],
    );
  }

  for (const t of seedTransactions) {
    d.run(
      `INSERT INTO transactions (id, date, type, reference, montant, projet, statut, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [t.id, t.date, t.type, t.reference, t.montant, t.projet ?? null, t.statut, 'U-1042'],
    );
  }

  for (const ev of seedDistributions) {
    d.run(
      `INSERT INTO distribution_events (date, projectId, montantEstime, statut) VALUES (?, ?, ?, ?)`,
      [ev.date, ev.projectId, ev.montantEstime, ev.statut],
    );
  }

  for (const p of seedPortfolio) {
    d.run(
      `INSERT INTO portfolio_points (mois, valeur, userId) VALUES (?, ?, ?)`,
      [p.mois, p.valeur, 'U-1042'],
    );
  }

  for (const s of seedDrafts) {
    d.run(
      `INSERT INTO submission_drafts (id, nom, ville, typologie, budget, montantRecherche, statut, dateMaj, avancement, porteurId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [s.id, s.nom, s.ville, s.typologie, s.budget, s.montantRecherche, s.statut, s.dateMaj, s.avancement, 'U-2018'],
    );
  }

  for (const p of seedPhases) {
    d.run(
      `INSERT INTO site_phases (projectId, nom, avancement, dateDebut, dateFinPrevue, statut) VALUES (?, ?, ?, ?, ?, ?)`,
      ['casa-anfa-residences', p.nom, p.avancement, p.dateDebut, p.dateFinPrevue, p.statut],
    );
  }

  for (const u of seedUpdates) {
    d.run(
      `INSERT INTO site_updates (id, projectId, date, titre, description, image) VALUES (?, ?, ?, ?, ?, ?)`,
      [u.id, 'casa-anfa-residences', u.date, u.titre, u.description, u.image],
    );
  }

  for (const a of seedAiQueue) {
    d.run(
      `INSERT INTO ai_validation_items (submissionId, nomProjet, porteur, dateSoumission, scoreRisque, scoreFraude, authenticiteDocuments, synthese, alertes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [a.submissionId, a.nomProjet, a.porteur, a.dateSoumission, a.scoreRisque, a.scoreFraude, a.authenticiteDocuments, a.synthese, JSON.stringify(a.alertes)],
    );
  }

  for (const a of seedAuditLogs) {
    d.run(
      `INSERT INTO audit_logs (id, horodatage, utilisateur, role, action, entite, ip) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [a.id, a.horodatage, a.utilisateur, a.role, a.action, a.entite, a.ip],
    );
  }
}

function queryAll(d: SqlJsDatabase, sql: string, params: any[] = []): any[] {
  const stmt = d.prepare(sql);
  if (params.length > 0) stmt.bind(params);
  const rows: any[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

function queryOne(d: SqlJsDatabase, sql: string, params: any[] = []): any | null {
  const stmt = d.prepare(sql);
  if (params.length > 0) stmt.bind(params);
  const row = stmt.step() ? stmt.getAsObject() : null;
  stmt.free();
  return row;
}

function runSql(d: SqlJsDatabase, sql: string, params: any[] = []) {
  if (params.length > 0) {
    const stmt = d.prepare(sql);
    stmt.bind(params);
    stmt.step();
    stmt.free();
  } else {
    d.run(sql);
  }
}

// ─── Types ───

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

export interface UserInput {
  nom: string;
  email: string;
  role: string;
  cin: string;
  rib: string;
}

export interface DraftInput {
  nom: string;
  ville: string;
  typologie: string;
  budget: number;
  montantRecherche: number;
}

// ─── Projects ───

export async function getAllProjects() {
  const d = await getDb();
  const rows = queryAll(d, 'SELECT * FROM projects ORDER BY featured DESC, joursRestants ASC');
  return rows.map(deserializeProject);
}

export async function getProjectById(id: string) {
  const d = await getDb();
  const row = queryOne(d, 'SELECT * FROM projects WHERE id = ?', [id]);
  return row ? deserializeProject(row) : null;
}

export async function createProject(input: ProjectInput) {
  const d = await getDb();
  const id = generateId(input.nom);
  runSql(d,
    `INSERT INTO projects (id, nom, ville, typologie, image, description, budgetTotal, montantCollecte, objectifCollecte, ticketMinimum, rendementCible, dureeMois, scoreRisque, scoreLabel, statut, investisseurs, joursRestants, featured, pointsForts, pointsVigilance) VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, 70, 'Faible', 'En collecte', 0, 60, 0, ?, ?)`,
    [
      id, input.nom, input.ville, input.typologie, null, input.description ?? null,
      input.budgetTotal, input.objectifCollecte, input.ticketMinimum,
      input.rendementCible, input.dureeMois,
      JSON.stringify(input.pointsForts ?? []),
      JSON.stringify(input.pointsVigilance ?? []),
    ],
  );
  return getProjectById(id);
}

export async function updateProject(id: string, data: Record<string, any>) {
  const d = await getDb();
  const fields: string[] = [];
  const values: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }
  if (fields.length === 0) return getProjectById(id);
  values.push(id);
  runSql(d, `UPDATE projects SET ${fields.join(', ')} WHERE id = ?`, values);
  return getProjectById(id);
}

export async function deleteProject(id: string) {
  const d = await getDb();
  runSql(d, 'DELETE FROM projects WHERE id = ?', [id]);
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

export async function getAllUsers() {
  const d = await getDb();
  return queryAll(d, 'SELECT * FROM users ORDER BY dateInscription DESC');
}

export async function getUserById(id: string) {
  const d = await getDb();
  return queryOne(d, 'SELECT * FROM users WHERE id = ?', [id]);
}

export async function createUser(input: UserInput) {
  const d = await getDb();
  const id = `U-${Date.now().toString(36).toUpperCase()}`;
  const today = new Date().toISOString().split('T')[0];
  runSql(d, 'INSERT INTO users (id, nom, email, role, statut, dateInscription, cin, rib) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id, input.nom, input.email, input.role, 'Actif', today, input.cin, input.rib]);
  return getUserById(id);
}

export async function updateUser(id: string, data: Record<string, any>) {
  const d = await getDb();
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
  runSql(d, `UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
  return getUserById(id);
}

export async function deleteUser(id: string) {
  const d = await getDb();
  runSql(d, 'DELETE FROM users WHERE id = ?', [id]);
}

export async function getUserByEmail(email: string) {
  const d = await getDb();
  return queryOne(d, 'SELECT * FROM users WHERE email = ?', [email]);
}

// ─── Holdings ───

export async function getHoldingsByUser(userId = 'U-1042') {
  const d = await getDb();
  return queryAll(d, 'SELECT * FROM holdings WHERE userId = ?', [userId]);
}

// ─── Transactions ───

export async function getTransactionsByUser(userId = 'U-1042') {
  const d = await getDb();
  return queryAll(d, 'SELECT * FROM transactions WHERE userId = ? ORDER BY date DESC', [userId]);
}

// ─── Distribution Events ───

export async function getDistributionEvents() {
  const d = await getDb();
  return queryAll(d, 'SELECT * FROM distribution_events ORDER BY date ASC');
}

// ─── Portfolio Points ───

export async function getPortfolioPoints(userId = 'U-1042') {
  const d = await getDb();
  return queryAll(d, 'SELECT * FROM portfolio_points WHERE userId = ? ORDER BY id ASC', [userId]);
}

// ─── Submission Drafts ───

export async function getSubmissionDrafts(porteurId = 'U-2018') {
  const d = await getDb();
  return queryAll(d, 'SELECT * FROM submission_drafts WHERE porteurId = ? ORDER BY dateMaj DESC', [porteurId]);
}

export async function getAllSubmissionDrafts() {
  const d = await getDb();
  return queryAll(d, 'SELECT * FROM submission_drafts ORDER BY dateMaj DESC');
}

export async function createSubmissionDraft(input: DraftInput) {
  const d = await getDb();
  const id = `SUB-${new Date().getFullYear()}-${String(Date.now()).slice(-3).padStart(3, '0')}`;
  const today = new Date().toISOString().split('T')[0];
  runSql(d,
    'INSERT INTO submission_drafts (id, nom, ville, typologie, budget, montantRecherche, statut, dateMaj, avancement, porteurId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [id, input.nom, input.ville, input.typologie, input.budget, input.montantRecherche, 'Brouillon', today, 100, 'U-2018']);
  return { id };
}

export async function updateSubmissionDraft(id: string, data: Record<string, any>) {
  const d = await getDb();
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
  runSql(d, `UPDATE submission_drafts SET ${fields.join(', ')} WHERE id = ?`, values);
}

export async function submitDraftToAi(id: string) {
  const d = await getDb();
  const draft = queryOne(d, 'SELECT * FROM submission_drafts WHERE id = ?', [id]);
  if (!draft) return null;
  const today = new Date().toISOString().split('T')[0];
  runSql(d, "UPDATE submission_drafts SET statut = 'Soumis', dateMaj = ? WHERE id = ?", [today, id]);
  runSql(d,
    `INSERT OR IGNORE INTO ai_validation_items (submissionId, nomProjet, porteur, dateSoumission, scoreRisque, scoreFraude, authenticiteDocuments, synthese, alertes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [draft.id, draft.nom, 'Atlas Promotion SARL', today, 70, 5, 90, 'Dossier soumis via le portail. En attente d\'analyse IA.', '[]']);
  return { id: draft.id, statut: 'Soumis' };
}

// ─── AI Validation ───

export async function getAiValidationQueue() {
  const d = await getDb();
  const items = queryAll(d, 'SELECT * FROM ai_validation_items');
  return items.map((item: any) => ({
    ...item,
    alertes: JSON.parse(item.alertes || '[]'),
  }));
}

export async function getValidationDecisions(submissionId: string) {
  const d = await getDb();
  return queryAll(d, 'SELECT * FROM validation_decisions WHERE submissionId = ? ORDER BY date DESC', [submissionId]);
}

export async function submitDecision(submissionId: string, action: string, commentaire: string, decidedBy = 'Mehdi Tahiri') {
  const d = await getDb();
  const today = new Date().toISOString().split('T')[0];
  runSql(d, 'INSERT INTO validation_decisions (submissionId, action, commentaire, date, decidedBy) VALUES (?, ?, ?, ?, ?)',
    [submissionId, action, commentaire, today, decidedBy]);
  const statutMap: Record<string, string> = { approved: 'Approuvé', 'changes-requested': 'En analyse IA', rejected: 'Rejeté' };
  const newStatut = statutMap[action] || 'Soumis';
  runSql(d, 'UPDATE submission_drafts SET statut = ?, dateMaj = ? WHERE id = ?', [newStatut, today, submissionId]);
  runSql(d,
    'INSERT INTO audit_logs (id, horodatage, utilisateur, role, action, entite, ip) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [`LOG-${Date.now().toString(36).toUpperCase()}`, `${today} ${new Date().toTimeString().slice(0, 8)}`, decidedBy, 'Agent Conformité',
      action === 'approved' ? 'Approbation projet' : action === 'rejected' ? 'Rejet document' : 'Modifications demandées',
      submissionId, '—']);
}

// ─── Site Data ───

export async function getSitePhases(projectId = 'casa-anfa-residences') {
  const d = await getDb();
  return queryAll(d, 'SELECT * FROM site_phases WHERE projectId = ? ORDER BY id ASC', [projectId]);
}

export async function getSiteUpdates(projectId = 'casa-anfa-residences') {
  const d = await getDb();
  return queryAll(d, 'SELECT * FROM site_updates WHERE projectId = ? ORDER BY date DESC', [projectId]);
}

// ─── Audit Logs ───

export async function getAuditLogs() {
  const d = await getDb();
  return queryAll(d, 'SELECT * FROM audit_logs ORDER BY horodatage DESC');
}

// ─── Dashboard ───

export async function getInvestorDashboardData(userId = 'U-1042') {
  const holdings = await getHoldingsByUser(userId);
  const transactions = await getTransactionsByUser(userId);
  const distributions = await getDistributionEvents();
  const portfolio = await getPortfolioPoints(userId);
  return { holdings, transactions, distributions, portfolio };
}

// ─── Helpers ───

function generateId(name: string): string {
  return name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) + '-' + Date.now().toString(36).slice(-4);
}
