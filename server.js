import "dotenv/config";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { ImapFlow } from "imapflow";
import Database from "better-sqlite3";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import PDFDocument from "pdfkit";
import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT || 3000);
const adminApiToken = String(process.env.ADMIN_API_TOKEN || "").trim();
const adminUser = String(process.env.ADMIN_USER || "admin").trim();
const adminPass = String(process.env.ADMIN_PASS || "Modeliq2026!").trim();
const adminAllowedEmails = String(process.env.ADMIN_ALLOWED_EMAILS || "berntjanbosma@gmail.com")
  .split(",")
  .map((item) => item.trim().toLowerCase())
  .filter(Boolean);
const googleClientId = String(process.env.GOOGLE_CLIENT_ID || "").trim();
const googleClientSecret = String(process.env.GOOGLE_CLIENT_SECRET || "").trim();
const googleAllowedEmails = String(process.env.GOOGLE_ALLOWED_EMAILS || "")
  .split(",")
  .map((item) => item.trim().toLowerCase())
  .filter(Boolean);
if (googleAllowedEmails.length === 0) {
  googleAllowedEmails.push("berntjanbosma@gmail.com");
}
const googleAllowedDomain = String(process.env.GOOGLE_ALLOWED_DOMAIN || "").trim().toLowerCase();
const sessionTtlMs = Math.max(5, Number(process.env.ADMIN_SESSION_TTL_MINUTES || 720)) * 60 * 1000;
const backupIntervalMs = Math.max(1, Number(process.env.DB_BACKUP_INTERVAL_HOURS || 24)) * 60 * 60 * 1000;
const backupRetentionDays = Math.max(1, Number(process.env.DB_BACKUP_RETENTION_DAYS || 14));
const corsOriginRaw = String(process.env.CORS_ORIGIN || "*").trim();
const allowFileOrigin = String(process.env.ALLOW_FILE_ORIGIN || "true").trim().toLowerCase() === "true";
const backupDir = path.join(__dirname, "backups");
const gocardlessApiBase = String(process.env.GOCARDLESS_API_BASE || "https://bankaccountdata.gocardless.com").replace(/\/$/, "");
const appSessions = new Map();
const googleOauthStates = new Map();
let gocardlessTokenCache = {
  token: "",
  expiresAt: 0
};

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const db = new Database(path.join(dataDir, "modeliq.db"));
db.pragma("journal_mode = WAL");
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    goal TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    number TEXT,
    quote_id TEXT,
    quote_number TEXT,
    customer TEXT NOT NULL,
    customer_email TEXT,
    title TEXT NOT NULL,
    amount REAL NOT NULL,
    vat REAL NOT NULL,
    issue_date TEXT,
    due_date TEXT,
    status TEXT,
    reminders_sent INTEGER DEFAULT 0,
    paid_date TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS bookkeeping_entries (
    id TEXT PRIMARY KEY,
    quote_id TEXT,
    invoice_id TEXT,
    date TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    vat REAL NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    provider TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TEXT NOT NULL,
    last_login_at TEXT NOT NULL
  );
`);

try {
  db.exec("ALTER TABLE invoices ADD COLUMN customer_email TEXT");
} catch {
  // column may already exist
}

const insertLeadStmt = db.prepare(`
  INSERT INTO leads (name, company, email, goal, created_at)
  VALUES (@name, @company, @email, @goal, @createdAt)
`);

const upsertInvoiceStmt = db.prepare(`
  INSERT INTO invoices (
    id, number, quote_id, quote_number, customer, customer_email, title, amount, vat,
    issue_date, due_date, status, reminders_sent, paid_date, created_at, updated_at
  ) VALUES (
    @id, @number, @quoteId, @quoteNumber, @customer, @customerEmail, @title, @amount, @vat,
    @issueDate, @dueDate, @status, @remindersSent, @paidDate, @createdAt, @updatedAt
  )
  ON CONFLICT(id) DO UPDATE SET
    number = excluded.number,
    quote_id = excluded.quote_id,
    quote_number = excluded.quote_number,
    customer = excluded.customer,
    customer_email = excluded.customer_email,
    title = excluded.title,
    amount = excluded.amount,
    vat = excluded.vat,
    issue_date = excluded.issue_date,
    due_date = excluded.due_date,
    status = excluded.status,
    reminders_sent = excluded.reminders_sent,
    paid_date = excluded.paid_date,
    updated_at = excluded.updated_at
`);

const upsertBookStmt = db.prepare(`
  INSERT INTO bookkeeping_entries (
    id, quote_id, invoice_id, date, type, description, amount, vat, created_at, updated_at
  ) VALUES (
    @id, @quoteId, @invoiceId, @date, @type, @description, @amount, @vat, @createdAt, @updatedAt
  )
  ON CONFLICT(id) DO UPDATE SET
    quote_id = excluded.quote_id,
    invoice_id = excluded.invoice_id,
    date = excluded.date,
    type = excluded.type,
    description = excluded.description,
    amount = excluded.amount,
    vat = excluded.vat,
    updated_at = excluded.updated_at
`);

const upsertUserStmt = db.prepare(`
  INSERT INTO users (email, name, provider, role, created_at, last_login_at)
  VALUES (@email, @name, @provider, @role, @createdAt, @lastLoginAt)
  ON CONFLICT(email) DO UPDATE SET
    name = excluded.name,
    provider = excluded.provider,
    role = excluded.role,
    last_login_at = excluded.last_login_at
`);

const getUserByEmailStmt = db.prepare(`
  SELECT
    id,
    email,
    name,
    provider,
    role,
    created_at AS createdAt,
    last_login_at AS lastLoginAt
  FROM users
  WHERE email = ?
`);

function parseCorsOrigins(value) {
  if (!value || value === "*") {
    return "*";
  }
  const origins = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return origins.length > 0 ? origins : "*";
}

const corsOrigins = parseCorsOrigins(corsOriginRaw);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowFileOrigin && origin === "null") {
        callback(null, true);
        return;
      }
      if (corsOrigins === "*") {
        callback(null, true);
        return;
      }
      if (Array.isArray(corsOrigins) && corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
  })
);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));

function createSession(user) {
  const token = crypto.randomBytes(32).toString("hex");
  appSessions.set(token, {
    expiresAt: Date.now() + sessionTtlMs,
    user
  });
  return token;
}

function validateSession(token) {
  const session = appSessions.get(token);
  if (!session) {
    return null;
  }
  if (Date.now() > session.expiresAt) {
    appSessions.delete(token);
    return null;
  }
  session.expiresAt = Date.now() + sessionTtlMs;
  appSessions.set(token, session);
  return session;
}

function cleanExpiredSessions() {
  const now = Date.now();
  for (const [token, session] of appSessions.entries()) {
    if (!session?.expiresAt || session.expiresAt <= now) {
      appSessions.delete(token);
    }
  }
}

function getAuthToken(req) {
  const auth = String(req.headers.authorization || "");
  const bearerToken = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  const headerToken = String(req.headers["x-api-key"] || "").trim();
  return bearerToken || headerToken;
}

function serializeUser(user) {
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    email: user.email,
    name: user.name || "",
    role: user.role || "user",
    provider: user.provider || ""
  };
}

function resolveUserRole(email) {
  const normalized = String(email || "").trim().toLowerCase();
  if (canLoginWithAdminEmail(normalized) || canLoginWithGoogleEmail(normalized)) {
    return "admin";
  }
  return "user";
}

function upsertGoogleUser({ email, name }) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const now = new Date().toISOString();
  const role = resolveUserRole(normalizedEmail);
  upsertUserStmt.run({
    email: normalizedEmail,
    name: String(name || normalizedEmail.split("@")[0] || "").trim(),
    provider: "google",
    role,
    createdAt: now,
    lastLoginAt: now
  });
  return getUserByEmailStmt.get(normalizedEmail);
}

function createLocalAdminUser() {
  return {
    id: 0,
    email: `${adminUser}@local`,
    name: adminUser,
    provider: "local",
    role: "admin"
  };
}

function ensureGoogleOAuthConfig() {
  if (!googleClientId) {
    throw new Error("Google OAuth niet geconfigureerd. Vul GOOGLE_CLIENT_ID in.");
  }
}

function ensureGoogleOAuthCodeFlowConfig() {
  if (!googleClientId || !googleClientSecret) {
    throw new Error("Google OAuth code flow niet geconfigureerd. Vul GOOGLE_CLIENT_ID en GOOGLE_CLIENT_SECRET in.");
  }
}

function cleanExpiredGoogleStates() {
  const now = Date.now();
  for (const [state, payload] of googleOauthStates.entries()) {
    if (!payload?.expiresAt || payload.expiresAt <= now) {
      googleOauthStates.delete(state);
    }
  }
}

function createGoogleState(returnOrigin) {
  const state = crypto.randomBytes(20).toString("hex");
  googleOauthStates.set(state, {
    returnOrigin,
    expiresAt: Date.now() + 10 * 60 * 1000
  });
  return state;
}

function resolveGoogleRedirectUri(req) {
  const configured = String(process.env.GOOGLE_REDIRECT_URI || "").trim();
  if (configured) {
    return configured;
  }
  return `${req.protocol}://${req.get("host")}/api/admin/google/callback`;
}

function normalizePostMessageOrigin(value) {
  const input = String(value || "").trim();
  if (!input) {
    return "*";
  }
  if (input === "null" || input.startsWith("file:")) {
    return "*";
  }
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return input;
  }
  return "*";
}

function sendGooglePopupResult(res, returnOrigin, payload, message = "Google login verwerkt. Je mag dit venster sluiten.") {
  const serialized = JSON.stringify(payload).replace(/</g, "\\u003c");
  res.type("html");
  return res.send(`<!doctype html><html><body><script>
    (function () {
      var payload = ${serialized};
      try {
        if (window.opener && typeof window.opener.postMessage === "function") {
          window.opener.postMessage(payload, ${JSON.stringify(normalizePostMessageOrigin(returnOrigin))});
        }
      } catch (e) {}
      window.close();
    })();
  </script>${message}</body></html>`);
}

function canLoginWithGoogleEmail(email) {
  const normalized = String(email || "").trim().toLowerCase();
  if (!normalized) {
    return false;
  }
  if (googleAllowedEmails.length > 0 && !googleAllowedEmails.includes(normalized)) {
    return false;
  }
  if (googleAllowedDomain && !normalized.endsWith(`@${googleAllowedDomain}`)) {
    return false;
  }
  return true;
}

function canLoginWithAdminEmail(email) {
  const normalized = String(email || "").trim().toLowerCase();
  if (!normalized) {
    return false;
  }
  if (adminAllowedEmails.length === 0) {
    return false;
  }
  return adminAllowedEmails.includes(normalized);
}

async function exchangeGoogleCode({ code, redirectUri }) {
  ensureGoogleOAuthCodeFlowConfig();
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: googleClientId,
      client_secret: googleClientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    }).toString()
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error_description || payload.error || "Google token exchange mislukt.");
  }
  return payload;
}

async function fetchGoogleProfile(accessToken) {
  const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error_description || payload.error || "Google profiel ophalen mislukt.");
  }
  return payload;
}

async function verifyGoogleIdToken(idToken) {
  const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error_description || payload.error || "Google token validatie mislukt.");
  }
  const audience = String(payload.aud || "");
  if (!audience || audience !== googleClientId) {
    throw new Error("Google token audience ongeldig.");
  }
  const email = String(payload.email || "").trim().toLowerCase();
  const emailVerified = String(payload.email_verified || "").toLowerCase() === "true";
  return { email, emailVerified };
}

function requireAuth(req, res, next) {
  cleanExpiredSessions();
  const token = getAuthToken(req);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (adminApiToken && token === adminApiToken) {
    req.authUser = createLocalAdminUser();
    return next();
  }
  const session = validateSession(token);
  if (!session || !session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.authUser = session.user;
  return next();
}

function requireAdmin(req, res, next) {
  return requireAuth(req, res, () => {
    if (!req.authUser || req.authUser.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    return next();
  });
}

function optionalAuth(req, _res, next) {
  cleanExpiredSessions();
  const token = getAuthToken(req);
  if (!token) {
    req.authUser = null;
    return next();
  }
  if (adminApiToken && token === adminApiToken) {
    req.authUser = createLocalAdminUser();
    return next();
  }
  const session = validateSession(token);
  req.authUser = session?.user || null;
  return next();
}

function backupDatabase(reason = "scheduled") {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `modeliq-${reason}-${stamp}.db`;
  const destination = path.join(backupDir, fileName);
  db.pragma("wal_checkpoint(FULL)");
  fs.copyFileSync(path.join(dataDir, "modeliq.db"), destination);

  const retentionMs = backupRetentionDays * 24 * 60 * 60 * 1000;
  const files = fs
    .readdirSync(backupDir)
    .filter((item) => item.endsWith(".db"))
    .map((item) => {
      const full = path.join(backupDir, item);
      const stat = fs.statSync(full);
      return { full, mtimeMs: stat.mtimeMs };
    });
  const now = Date.now();
  files.forEach((file) => {
    if (now - file.mtimeMs > retentionMs) {
      fs.unlinkSync(file.full);
    }
  });
  return destination;
}

function startupValidation() {
  const warnings = [];
  if (!process.env.ADMIN_USER || !process.env.ADMIN_PASS) {
    warnings.push("ADMIN_USER/ADMIN_PASS niet ingesteld, default credentials actief.");
  }
  if (!adminApiToken) {
    warnings.push("ADMIN_API_TOKEN niet ingesteld; gebruik login-sessies.");
  }
  if (corsOrigins === "*") {
    warnings.push("CORS_ORIGIN staat open op *.");
  }
  if (!googleClientId || !googleClientSecret) {
    warnings.push("Google OAuth code flow niet geconfigureerd (GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET).");
  }
  if (!googleClientId) {
    warnings.push("Google One Tap niet geconfigureerd (GOOGLE_CLIENT_ID).");
  }
  warnings.forEach((line) => {
    // eslint-disable-next-line no-console
    console.warn(`[startup] ${line}`);
  });
}

function getSmtpTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

function getImapClient() {
  return new ImapFlow({
    host: process.env.IMAP_HOST,
    port: Number(process.env.IMAP_PORT || 993),
    secure: String(process.env.IMAP_SECURE || "true") === "true",
    auth: {
      user: process.env.IMAP_USER,
      pass: process.env.IMAP_PASS
    }
  });
}

function ensureMailConfig() {
  const required = [
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_PASS",
    "IMAP_HOST",
    "IMAP_USER",
    "IMAP_PASS",
    "MAIL_FROM"
  ];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Ontbrekende mail configuratie: ${missing.join(", ")}`);
  }
}

function ensureGoCardlessConfig() {
  const required = ["GOCARDLESS_SECRET_ID", "GOCARDLESS_SECRET_KEY"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Ontbrekende GoCardless configuratie: ${missing.join(", ")}`);
  }
}

async function getGoCardlessAccessToken() {
  ensureGoCardlessConfig();
  const now = Date.now();
  if (gocardlessTokenCache.token && now < gocardlessTokenCache.expiresAt) {
    return gocardlessTokenCache.token;
  }

  const response = await fetch(`${gocardlessApiBase}/api/v2/token/new/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret_id: process.env.GOCARDLESS_SECRET_ID,
      secret_key: process.env.GOCARDLESS_SECRET_KEY
    })
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.detail || payload.summary || "GoCardless token ophalen mislukt.");
  }

  const payload = await response.json();
  const token = String(payload.access || "");
  const expiresInSec = Number(payload.access_expires || 24 * 60 * 60);
  if (!token) {
    throw new Error("Leeg GoCardless access token ontvangen.");
  }
  gocardlessTokenCache = {
    token,
    expiresAt: now + Math.max(60, expiresInSec - 60) * 1000
  };
  return token;
}

async function gocardlessRequest(pathname, options = {}, allowRetry = true) {
  const token = await getGoCardlessAccessToken();
  const headers = {
    Accept: "application/json",
    ...options.headers,
    Authorization: `Bearer ${token}`
  };
  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${gocardlessApiBase}${pathname}`, {
    ...options,
    headers
  });

  if (response.status === 401 && allowRetry) {
    gocardlessTokenCache = { token: "", expiresAt: 0 };
    return gocardlessRequest(pathname, options, false);
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.detail || payload.summary || `GoCardless fout (${response.status})`);
  }

  return response.json().catch(() => ({}));
}

function getRevolutInstitution(institutions) {
  if (!Array.isArray(institutions)) {
    return null;
  }
  return institutions.find((item) => String(item?.name || "").toLowerCase().includes("revolut")) || null;
}

function listLocalProjects(limit = 100) {
  const srcRoot = path.dirname(__dirname);
  const entries = fs.readdirSync(srcRoot, { withFileTypes: true });
  const directories = entries
    .filter((entry) => entry.isDirectory())
    .filter((entry) => entry.name !== path.basename(__dirname))
    .slice(0, limit);

  return directories
    .map((entry) => {
      const projectPath = path.join(srcRoot, entry.name);
      const stat = fs.statSync(projectPath);
      const hasNode = fs.existsSync(path.join(projectPath, "package.json"));
      const hasPython = fs.existsSync(path.join(projectPath, "requirements.txt")) || fs.existsSync(path.join(projectPath, "pyproject.toml"));
      return {
        name: entry.name,
        path: projectPath,
        updatedAt: stat.mtime.toISOString(),
        stack: hasNode ? "Node.js" : hasPython ? "Python" : "Onbekend"
      };
    })
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

function formatEur(amount) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR"
  }).format(Number(amount || 0));
}

function sanitizeInvoiceForPdf(rawInvoice) {
  const invoice = rawInvoice && typeof rawInvoice === "object" ? rawInvoice : {};
  const amount = Number(invoice.amount || 0);
  const vat = Number(invoice.vat || 0);
  return {
    number: String(invoice.number || "FACTUUR"),
    customer: String(invoice.customer || "Onbekend"),
    title: String(invoice.title || "Diensten"),
    amount,
    vat,
    issueDate: String(invoice.issueDate || new Date().toISOString().slice(0, 10)),
    dueDate: String(invoice.dueDate || new Date().toISOString().slice(0, 10)),
    quoteNumber: String(invoice.quoteNumber || ""),
    status: String(invoice.status || "draft")
  };
}

function createInvoicePdfBuffer(rawInvoice) {
  const invoice = sanitizeInvoiceForPdf(rawInvoice);
  const vatAmount = (invoice.amount * invoice.vat) / 100;
  const totalIncl = invoice.amount + vatAmount;

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(22).fillColor("#1c2a68").text("MODELIQ", 50, 48);
    doc.fontSize(10).fillColor("#1f2937").text("AI Automation & Agents", 50, 76);
    doc.fontSize(10).text("hallo@modeliq.nl", 50, 90);

    doc.fontSize(11).fillColor("#111827");
    doc.text(`Factuur: ${invoice.number}`, 350, 48);
    doc.text(`Datum: ${invoice.issueDate}`, 350, 64);
    doc.text(`Vervaldatum: ${invoice.dueDate}`, 350, 80);
    doc.text(`Status: ${invoice.status}`, 350, 96);

    doc.moveTo(50, 128).lineTo(545, 128).strokeColor("#cfd8ea").stroke();

    doc.fontSize(12).fillColor("#111827").text("Factuur aan", 50, 146);
    doc.fontSize(11).text(invoice.customer, 50, 166);
    if (invoice.quoteNumber) {
      doc.fontSize(10).fillColor("#4b5563").text(`Referentie offerte: ${invoice.quoteNumber}`, 50, 184);
    }

    const tableTop = 230;
    doc.fillColor("#111827").fontSize(10);
    doc.text("Omschrijving", 50, tableTop);
    doc.text("Excl. btw", 340, tableTop, { width: 90, align: "right" });
    doc.text("BTW", 430, tableTop, { width: 60, align: "right" });
    doc.text("Totaal", 490, tableTop, { width: 55, align: "right" });
    doc.moveTo(50, tableTop + 14).lineTo(545, tableTop + 14).strokeColor("#cfd8ea").stroke();

    const rowTop = tableTop + 24;
    doc.fillColor("#111827");
    doc.text(invoice.title, 50, rowTop, { width: 260 });
    doc.text(formatEur(invoice.amount), 340, rowTop, { width: 90, align: "right" });
    doc.text(`${invoice.vat}%`, 430, rowTop, { width: 60, align: "right" });
    doc.text(formatEur(totalIncl), 490, rowTop, { width: 55, align: "right" });
    doc.moveTo(50, rowTop + 22).lineTo(545, rowTop + 22).strokeColor("#e5e7eb").stroke();

    const totalsTop = rowTop + 50;
    doc.fontSize(11);
    doc.text(`Subtotaal: ${formatEur(invoice.amount)}`, 360, totalsTop, { width: 185, align: "right" });
    doc.text(`BTW (${invoice.vat}%): ${formatEur(vatAmount)}`, 360, totalsTop + 18, { width: 185, align: "right" });
    doc.font("Helvetica-Bold").text(`Totaal incl. btw: ${formatEur(totalIncl)}`, 320, totalsTop + 42, { width: 225, align: "right" });
    doc.font("Helvetica");

    doc.fontSize(10).fillColor("#4b5563").text(
      `Betaaltermijn: tot ${invoice.dueDate}. Vermeld factuurnummer ${invoice.number} bij betaling.`,
      50,
      720,
      { width: 495 }
    );

    doc.end();
  });
}

app.get("/api/health", (_req, res) => {
  return res.json({
    ok: true,
    uptimeSec: Math.round(process.uptime()),
    now: new Date().toISOString(),
    dbPath: path.join(dataDir, "modeliq.db"),
    backupPath: backupDir,
    googleClientId: googleClientId || "",
    config: {
      mail: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.MAIL_FROM),
      gocardless: !!(process.env.GOCARDLESS_SECRET_ID && process.env.GOCARDLESS_SECRET_KEY),
      googleOAuth: !!googleClientId,
      googleCodeFlow: !!(googleClientId && googleClientSecret),
      corsRestricted: corsOrigins !== "*"
    }
  });
});

app.post("/api/admin/google/token", async (req, res) => {
  try {
    ensureGoogleOAuthConfig();
    const credential = String(req.body?.credential || "").trim();
    if (!credential) {
      return res.status(400).json({ error: "Google credential ontbreekt." });
    }
    const { email, emailVerified } = await verifyGoogleIdToken(credential);
    if (!email || !emailVerified) {
      return res.status(401).json({ error: "Google account heeft geen geverifieerd e-mailadres." });
    }
    if (!canLoginWithGoogleEmail(email)) {
      return res.status(401).json({ error: `Google account ${email} heeft geen admin toegang.` });
    }
    const user = upsertGoogleUser({
      email,
      name: String(email.split("@")[0] || "")
    });
    const token = createSession(serializeUser(user));
    return res.json({
      ok: true,
      token,
      user: serializeUser(user),
      expiresInMinutes: Math.round(sessionTtlMs / 60000)
    });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Google token login mislukt."
    });
  }
});

app.get("/api/admin/google/start", (req, res) => {
  const returnOrigin = String(req.query.returnOrigin || "").trim();
  try {
    ensureGoogleOAuthCodeFlowConfig();
    cleanExpiredGoogleStates();
    const state = createGoogleState(returnOrigin);
    const redirectUri = resolveGoogleRedirectUri(req);
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.set("client_id", googleClientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("scope", "openid email profile");
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("prompt", "select_account");
    return res.redirect(authUrl.toString());
  } catch (error) {
    return sendGooglePopupResult(
      res,
      returnOrigin,
      {
        type: "modeliq-admin-google-login",
        ok: false,
        error: error instanceof Error ? error.message : "Google login starten mislukt."
      },
      "Google login kon niet starten. Je mag dit venster sluiten."
    );
  }
});

app.get("/api/admin/google/callback", async (req, res) => {
  const state = String(req.query.state || "").trim();
  const code = String(req.query.code || "").trim();
  const oauthError = String(req.query.error || "").trim();
  cleanExpiredGoogleStates();
  const statePayload = googleOauthStates.get(state);
  googleOauthStates.delete(state);
  const returnOrigin = statePayload?.returnOrigin || "*";

  try {
    ensureGoogleOAuthConfig();
    if (!statePayload) {
      return sendGooglePopupResult(res, returnOrigin, {
        type: "modeliq-admin-google-login",
        ok: false,
        error: "Ongeldige OAuth state."
      });
    }
    if (oauthError) {
      return sendGooglePopupResult(res, returnOrigin, {
        type: "modeliq-admin-google-login",
        ok: false,
        error: `Google fout: ${oauthError}`
      });
    }
    if (!code) {
      return sendGooglePopupResult(res, returnOrigin, {
        type: "modeliq-admin-google-login",
        ok: false,
        error: "OAuth code ontbreekt."
      });
    }
    const redirectUri = resolveGoogleRedirectUri(req);
    const tokenPayload = await exchangeGoogleCode({ code, redirectUri });
    const googleProfile = await fetchGoogleProfile(String(tokenPayload.access_token || ""));
    const email = String(googleProfile.email || "").trim().toLowerCase();
    const emailVerified = !!googleProfile.email_verified;
    if (!email || !emailVerified) {
      return sendGooglePopupResult(res, returnOrigin, {
        type: "modeliq-admin-google-login",
        ok: false,
        error: "Google account heeft geen geverifieerd e-mailadres."
      });
    }
    if (!canLoginWithGoogleEmail(email)) {
      return sendGooglePopupResult(res, returnOrigin, {
        type: "modeliq-admin-google-login",
        ok: false,
        error: `Google account ${email} heeft geen toegang.`
      });
    }
    const user = upsertGoogleUser({
      email,
      name: String(googleProfile.name || email.split("@")[0] || "")
    });
    const token = createSession(serializeUser(user));
    return sendGooglePopupResult(res, returnOrigin, {
      type: "modeliq-admin-google-login",
      ok: true,
      token
    });
  } catch (error) {
    return sendGooglePopupResult(res, returnOrigin, {
      type: "modeliq-admin-google-login",
      ok: false,
      error: error instanceof Error ? error.message : "Google login mislukt."
    });
  }
});

app.post("/api/admin/login", (req, res) => {
  const username = String(req.body?.username || "").trim();
  const password = String(req.body?.password || "").trim();
  if (!username || !password) {
    return res.status(400).json({ error: "username en password zijn verplicht." });
  }
  if (username !== adminUser || password !== adminPass) {
    return res.status(401).json({ error: "Onjuiste login." });
  }
  const user = createLocalAdminUser();
  const token = createSession(user);
  return res.json({
    ok: true,
    token,
    user: serializeUser(user),
    expiresInMinutes: Math.round(sessionTtlMs / 60000)
  });
});

app.post("/api/admin/login-email", (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  if (!email) {
    return res.status(400).json({ error: "email is verplicht." });
  }
  if (!canLoginWithAdminEmail(email)) {
    return res.status(401).json({ error: "E-mailadres heeft geen admin toegang." });
  }
  const user = {
    id: 0,
    email,
    name: email.split("@")[0],
    provider: "email",
    role: "admin"
  };
  const token = createSession(user);
  return res.json({
    ok: true,
    token,
    user: serializeUser(user),
    expiresInMinutes: Math.round(sessionTtlMs / 60000)
  });
});

app.post("/api/auth/google", async (req, res) => {
  try {
    ensureGoogleOAuthConfig();
    const credential = String(req.body?.credential || "").trim();
    if (!credential) {
      return res.status(400).json({ error: "Google credential ontbreekt." });
    }
    const { email, emailVerified } = await verifyGoogleIdToken(credential);
    if (!email || !emailVerified) {
      return res.status(401).json({ error: "Google account heeft geen geverifieerd e-mailadres." });
    }
    const user = upsertGoogleUser({
      email,
      name: String(req.body?.name || email.split("@")[0] || "")
    });
    const token = createSession(serializeUser(user));
    return res.json({
      ok: true,
      token,
      user: serializeUser(user),
      expiresInMinutes: Math.round(sessionTtlMs / 60000)
    });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Google auth mislukt."
    });
  }
});

app.get("/api/auth/session", requireAuth, (req, res) => {
  return res.json({
    ok: true,
    user: req.authUser
  });
});

app.post("/api/auth/logout", requireAuth, (req, res) => {
  const bearerToken = getAuthToken(req);
  if (bearerToken && (!adminApiToken || bearerToken !== adminApiToken)) {
    appSessions.delete(bearerToken);
  }
  return res.json({ ok: true });
});

app.get("/api/admin/session", requireAdmin, (_req, res) => {
  return res.json({ ok: true, user: _req.authUser || null });
});

app.post("/api/admin/logout", requireAdmin, (req, res) => {
  const bearerToken = getAuthToken(req);
  if (bearerToken && (!adminApiToken || bearerToken !== adminApiToken)) {
    appSessions.delete(bearerToken);
  }
  return res.json({ ok: true });
});

app.post("/api/leads", (req, res) => {
  try {
    const name = String(req.body?.name || "").trim();
    const company = String(req.body?.company || "").trim();
    const email = String(req.body?.email || "").trim();
    const goal = String(req.body?.goal || "").trim();
    if (!name || !company || !email || !goal) {
      return res.status(400).json({ error: "name, company, email en goal zijn verplicht." });
    }
    insertLeadStmt.run({
      name,
      company,
      email,
      goal,
      createdAt: new Date().toISOString()
    });
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Lead opslaan mislukt."
    });
  }
});

app.get("/api/leads", requireAdmin, (req, res) => {
  try {
    const limit = Math.max(1, Math.min(200, Number(req.query.limit || 50)));
    const rows = db
      .prepare("SELECT id, name, company, email, goal, created_at AS createdAt FROM leads ORDER BY id DESC LIMIT ?")
      .all(limit);
    return res.json({ leads: rows });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Leads ophalen mislukt."
    });
  }
});

app.get("/api/invoices", requireAdmin, (_req, res) => {
  try {
    const rows = db
      .prepare(
        `SELECT
          id,
          number,
          quote_id AS quoteId,
          quote_number AS quoteNumber,
          customer,
          customer_email AS customerEmail,
          title,
          amount,
          vat,
          issue_date AS issueDate,
          due_date AS dueDate,
          status,
          reminders_sent AS remindersSent,
          paid_date AS paidDate
        FROM invoices
        ORDER BY created_at DESC`
      )
      .all();
    return res.json({ invoices: rows });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Facturen ophalen mislukt."
    });
  }
});

app.put("/api/invoices/sync", requireAdmin, (req, res) => {
  try {
    const invoices = Array.isArray(req.body?.invoices) ? req.body.invoices : [];
    const now = new Date().toISOString();
    const clearStmt = db.prepare("DELETE FROM invoices");
    const tx = db.transaction(() => {
      clearStmt.run();
      invoices.forEach((invoice) => {
        upsertInvoiceStmt.run({
          id: String(invoice.id || ""),
          number: String(invoice.number || ""),
          quoteId: String(invoice.quoteId || ""),
          quoteNumber: String(invoice.quoteNumber || ""),
          customer: String(invoice.customer || ""),
          customerEmail: String(invoice.customerEmail || ""),
          title: String(invoice.title || ""),
          amount: Number(invoice.amount || 0),
          vat: Number(invoice.vat || 0),
          issueDate: String(invoice.issueDate || ""),
          dueDate: String(invoice.dueDate || ""),
          status: String(invoice.status || ""),
          remindersSent: Number(invoice.remindersSent || 0),
          paidDate: String(invoice.paidDate || ""),
          createdAt: now,
          updatedAt: now
        });
      });
    });
    tx();
    return res.json({ ok: true, count: invoices.length });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Factuur sync mislukt."
    });
  }
});

app.get("/api/bookkeeping", requireAdmin, (_req, res) => {
  try {
    const rows = db
      .prepare(
        `SELECT
          id,
          quote_id AS quoteId,
          invoice_id AS invoiceId,
          date,
          type,
          description,
          amount,
          vat
        FROM bookkeeping_entries
        ORDER BY created_at DESC`
      )
      .all();
    return res.json({ entries: rows });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Boekhouding ophalen mislukt."
    });
  }
});

app.put("/api/bookkeeping/sync", requireAdmin, (req, res) => {
  try {
    const entries = Array.isArray(req.body?.entries) ? req.body.entries : [];
    const now = new Date().toISOString();
    const clearStmt = db.prepare("DELETE FROM bookkeeping_entries");
    const tx = db.transaction(() => {
      clearStmt.run();
      entries.forEach((entry) => {
        upsertBookStmt.run({
          id: String(entry.id || ""),
          quoteId: String(entry.quoteId || ""),
          invoiceId: String(entry.invoiceId || ""),
          date: String(entry.date || ""),
          type: String(entry.type || ""),
          description: String(entry.description || ""),
          amount: Number(entry.amount || 0),
          vat: Number(entry.vat || 0),
          createdAt: now,
          updatedAt: now
        });
      });
    });
    tx();
    return res.json({ ok: true, count: entries.length });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Boekhouding sync mislukt."
    });
  }
});

app.post("/api/bank/gocardless/link", requireAdmin, async (req, res) => {
  try {
    const country = String(req.body?.country || "NL")
      .trim()
      .toUpperCase()
      .slice(0, 2);
    const redirectFromBody = String(req.body?.redirectUrl || "").trim();
    const defaultRedirect = `${req.protocol}://${req.get("host")}/`;
    const redirect = redirectFromBody.startsWith("http") ? redirectFromBody : defaultRedirect;

    const institutionsPayload = await gocardlessRequest(`/api/v2/institutions/?country=${encodeURIComponent(country)}`);
    const institutions = Array.isArray(institutionsPayload) ? institutionsPayload : [];
    const revolutInstitution = getRevolutInstitution(institutions);
    if (!revolutInstitution) {
      return res.json({
        supported: false,
        country,
        message: `Revolut is niet gevonden bij GoCardless voor land ${country}.`,
        institutions: institutions.slice(0, 10).map((item) => ({
          id: item.id,
          name: item.name
        }))
      });
    }

    const requisitionPayload = await gocardlessRequest("/api/v2/requisitions/", {
      method: "POST",
      body: JSON.stringify({
        redirect,
        institution_id: revolutInstitution.id,
        reference: `modeliq-${Date.now()}`,
        user_language: "NL"
      })
    });

    return res.json({
      supported: true,
      country,
      institution: {
        id: revolutInstitution.id,
        name: revolutInstitution.name
      },
      requisitionId: requisitionPayload.id,
      link: requisitionPayload.link
    });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "GoCardless koppeling starten mislukt."
    });
  }
});

app.get("/api/bank/gocardless/requisition/:id", requireAdmin, async (req, res) => {
  try {
    const requisitionId = String(req.params.id || "").trim();
    if (!requisitionId) {
      return res.status(400).json({ error: "requisition id ontbreekt." });
    }
    const payload = await gocardlessRequest(`/api/v2/requisitions/${encodeURIComponent(requisitionId)}/`);
    return res.json({
      id: payload.id,
      status: payload.status,
      institutionId: payload.institution_id,
      accounts: Array.isArray(payload.accounts) ? payload.accounts : [],
      link: payload.link || ""
    });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "GoCardless status ophalen mislukt."
    });
  }
});

app.post("/api/invoices/pdf", requireAdmin, async (req, res) => {
  try {
    const pdfBuffer = await createInvoicePdfBuffer(req.body?.invoice);
    const number = String(req.body?.invoice?.number || "factuur");
    const safeName = number.replace(/[^A-Za-z0-9_-]/g, "_");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${safeName}.pdf"`);
    return res.send(pdfBuffer);
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "PDF genereren mislukt."
    });
  }
});

app.post("/api/invoices/mail-pdf", requireAdmin, async (req, res) => {
  try {
    ensureMailConfig();
    const to = String(req.body?.to || "").trim();
    const invoice = sanitizeInvoiceForPdf(req.body?.invoice);
    if (!to) {
      return res.status(400).json({ error: "to is verplicht." });
    }
    const pdfBuffer = await createInvoicePdfBuffer(invoice);
    const transporter = getSmtpTransporter();
    const subject = String(req.body?.subject || "").trim() || `Factuur ${invoice.number} - ${invoice.customer}`;
    const text =
      String(req.body?.text || "").trim() ||
      `Beste ${invoice.customer},\n\nIn de bijlage vind je factuur ${invoice.number}.\nVervaldatum: ${invoice.dueDate}\n\nMet vriendelijke groet,\nModeliq`;
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
      attachments: [
        {
          filename: `${invoice.number.replace(/[^A-Za-z0-9_-]/g, "_")}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf"
        }
      ]
    });
    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Factuur mailen mislukt."
    });
  }
});

app.post("/api/mail/send", requireAdmin, async (req, res) => {
  try {
    ensureMailConfig();
    const to = String(req.body?.to || "").trim();
    const subject = String(req.body?.subject || "").trim();
    const text = String(req.body?.text || "").trim();

    if (!to || !subject || !text) {
      return res.status(400).json({ error: "to, subject en text zijn verplicht." });
    }

    const transporter = getSmtpTransporter();
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text
    });

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Mail verzenden mislukt."
    });
  }
});

app.get("/api/mail/inbox", requireAdmin, async (req, res) => {
  const client = getImapClient();
  try {
    ensureMailConfig();
    const limit = Math.max(1, Math.min(50, Number(req.query.limit || 20)));

    await client.connect();
    await client.mailboxOpen("INBOX");
    const total = client.mailbox.exists;
    if (total === 0) {
      await client.logout();
      return res.json({ messages: [] });
    }

    const start = Math.max(1, total - limit + 1);
    const range = `${start}:${total}`;
    const rows = [];

    for await (const message of client.fetch(range, {
      envelope: true,
      bodyStructure: true,
      source: false
    })) {
      const from = message.envelope?.from?.[0];
      const fromLabel = from?.name || from?.address || "-";
      rows.push({
        id: String(message.uid),
        date: message.envelope?.date ? new Date(message.envelope.date).toISOString().slice(0, 10) : "",
        from: fromLabel,
        subject: message.envelope?.subject || "",
        snippet: ""
      });
    }

    await client.logout();
    rows.reverse();
    return res.json({ messages: rows });
  } catch (error) {
    try {
      await client.logout();
    } catch {
      // ignore logout failure
    }
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Inbox ophalen mislukt."
    });
  }
});

app.get("/api/projects", requireAdmin, (req, res) => {
  try {
    const limit = Math.max(1, Math.min(500, Number(req.query.limit || 200)));
    const projects = listLocalProjects(limit);
    return res.json({ projects });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Projecten ophalen mislukt."
    });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

startupValidation();
try {
  const backupPath = backupDatabase("startup");
  // eslint-disable-next-line no-console
  console.log(`Database backup gemaakt: ${backupPath}`);
} catch (error) {
  // eslint-disable-next-line no-console
  console.warn(`Database backup bij startup mislukt: ${error instanceof Error ? error.message : "onbekende fout"}`);
}
setInterval(() => {
  try {
    backupDatabase("daily");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Database backup mislukt: ${error instanceof Error ? error.message : "onbekende fout"}`);
  }
}, backupIntervalMs);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Modeliq app draait op http://localhost:${port}`);
});
