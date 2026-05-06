const words = [
  {
    orbit: "impact",
    vision: "Impact",
    pitch: "We bouwen AI-oplossingen die binnen 6-8 weken resultaat laten zien.",
    bullets: ["Snelle pilot", "Heldere KPI's", "Focus op omzet en efficiëntie"]
  },
  {
    orbit: "intelligence",
    vision: "Inzicht",
    pitch: "Van ruwe data naar stuurinformatie waarop teams direct kunnen handelen.",
    bullets: ["Dashboarding", "Voorspellingen", "Datakwaliteit en governance"]
  },
  {
    orbit: "velocity",
    vision: "Versnelling",
    pitch: "Automatiseer repetitief werk zodat je team tijd wint op dagelijkse processen.",
    bullets: ["Workflow automation", "Minder handwerk", "Meer output per team"]
  },
  {
    orbit: "automation",
    vision: "Automatisering",
    pitch: "Agents en integraties die tickets, offertes en opvolging automatisch uitvoeren.",
    bullets: ["CRM-integraties", "Support automation", "Kwaliteitscontroles"]
  },
  {
    orbit: "clarity",
    vision: "Helderheid",
    pitch: "Elke oplossing krijgt een duidelijke scope, planning en business case.",
    bullets: ["Scope in 1 sessie", "Transparante aanpak", "Geen black-box project"]
  },
  {
    orbit: "trust",
    vision: "Vertrouwen",
    pitch: "We leveren veilig, compliant en uitlegbaar voor jouw organisatie.",
    bullets: ["Veilige architectuur", "Mens in de lus", "Audit-trace en controles"]
  },
  {
    orbit: "focus",
    vision: "Focus",
    pitch: "We kiezen alleen use-cases met directe bedrijfswaarde en haalbare implementatie.",
    bullets: ["Prioritering", "Roadmap", "Snel besluitvormingstraject"]
  },
  {
    orbit: "agents",
    vision: "AI Agents",
    pitch: "Digitale collega's die zelfstandig taken oppakken binnen jouw processen.",
    bullets: ["Sales agents", "Support agents", "Interne copilots"]
  },
  {
    orbit: "growth",
    vision: "Groei",
    pitch: "Gebruik AI als groeimotor voor betere klantservice en schaalbaarheid.",
    bullets: ["Meer conversie", "Snellere time-to-market", "Kostenverlaging"]
  },
  {
    orbit: "future",
    vision: "Toekomst",
    pitch: "We bouwen vandaag wat je organisatie morgen onderscheidend maakt.",
    bullets: ["Future-proof stack", "Schaalbaar ontwerp", "Langetermijnvisie"]
  },
  {
    orbit: "signal",
    vision: "Signaal",
    pitch: "Detecteer trends, afwijkingen en kansen eerder dan je concurrentie.",
    bullets: ["Anomaly detection", "Waarschuwingsflows", "Realtime inzichten"]
  },
  {
    orbit: "models",
    vision: "Modellen",
    pitch: "Van modelselectie tot productie: wij zorgen dat AI ook echt werkt in de praktijk.",
    bullets: ["Modelontwikkeling", "Monitoring", "Doorlopende optimalisatie"]
  }
];

const space = document.getElementById("space");
const wordLayer = document.getElementById("wordLayer");
const portal = document.getElementById("portal");
const visionWord = document.getElementById("visionWord");
const visionPitch = document.getElementById("visionPitch");
const visionList = document.getElementById("visionList");
const backBtn = document.getElementById("backBtn");
const leadBtn = document.getElementById("leadBtn");
const leadDock = document.getElementById("leadDock");
const leadForm = document.getElementById("leadForm");
const formStatus = document.getElementById("formStatus");
const nameInput = document.getElementById("name");
const leadToggle = document.getElementById("leadToggle");
const leadClose = document.getElementById("leadClose");
const aiHomeBtn = document.getElementById("aiHomeBtn");
const openIntakeTop = document.getElementById("openIntakeTop");
const quickButtons = Array.from(document.querySelectorAll(".quick-btn"));
const openAdminBtn = document.getElementById("openAdminBtn");
const adminModal = document.getElementById("adminModal");
const adminCloseBtn = document.getElementById("adminCloseBtn");
const adminForm = document.getElementById("adminForm");
const adminEmailInput = document.getElementById("adminEmail");
const adminEmailBtn = document.getElementById("adminEmailBtn");
const adminGoogleBtn = document.getElementById("adminGoogleBtn");
const adminStatus = document.getElementById("adminStatus");
const adminDock = document.getElementById("adminDock");
const adminLogoutBtn = document.getElementById("adminLogoutBtn");
const adminSettingsForm = document.getElementById("adminSettingsForm");
const adminSaveStatus = document.getElementById("adminSaveStatus");
const adminCtaText = document.getElementById("adminCtaText");
const adminMail = document.getElementById("adminMail");
const adminApiTokenInput = document.getElementById("adminApiToken");
const adminTabs = Array.from(document.querySelectorAll(".admin-tab"));
const adminPanels = Array.from(document.querySelectorAll(".admin-panel"));
const mailLinks = Array.from(document.querySelectorAll("a[href^='mailto:']"));
const leadSubmitBtn = document.getElementById("leadSubmitBtn");
const bookkeepingForm = document.getElementById("bookkeepingForm");
const bookRows = document.getElementById("bookRows");
const sumRevenue = document.getElementById("sumRevenue");
const sumCosts = document.getElementById("sumCosts");
const sumVat = document.getElementById("sumVat");
const sumNet = document.getElementById("sumNet");
const bookStatus = document.getElementById("bookStatus");
const bookExportBtn = document.getElementById("bookExportBtn");
const vatReportRows = document.getElementById("vatReportRows");
const vatReportSummary = document.getElementById("vatReportSummary");
const vatPeriodYear = document.getElementById("vatPeriodYear");
const vatPeriodQuarter = document.getElementById("vatPeriodQuarter");
const vatCopyBtn = document.getElementById("vatCopyBtn");
const vatRevenue21 = document.getElementById("vatRevenue21");
const vatRevenue9 = document.getElementById("vatRevenue9");
const vatRevenue0 = document.getElementById("vatRevenue0");
const vatOutputTax = document.getElementById("vatOutputTax");
const vatInputTax = document.getElementById("vatInputTax");
const vatNetTax = document.getElementById("vatNetTax");
const bankConnectForm = document.getElementById("bankConnectForm");
const bankProviderInput = document.getElementById("bankProvider");
const bankIbanInput = document.getElementById("bankIban");
const bankStatus = document.getElementById("bankStatus");
const bankImportForm = document.getElementById("bankImportForm");
const bankImportStatus = document.getElementById("bankImportStatus");
const bankCsv = document.getElementById("bankCsv");
const quoteForm = document.getElementById("quoteForm");
const quoteStatus = document.getElementById("quoteStatus");
const quoteBoard = document.getElementById("quoteBoard");
const flowDraft = document.getElementById("flowDraft");
const flowSent = document.getElementById("flowSent");
const flowAccepted = document.getElementById("flowAccepted");
const flowInvoiced = document.getElementById("flowInvoiced");
const kpiDraft = document.getElementById("kpiDraft");
const kpiSent = document.getElementById("kpiSent");
const kpiAccepted = document.getElementById("kpiAccepted");
const kpiInvoiced = document.getElementById("kpiInvoiced");
const kpiOutstanding = document.getElementById("kpiOutstanding");
const kpiOverdue = document.getElementById("kpiOverdue");
const invoiceRows = document.getElementById("invoiceRows");
const invoiceStatus = document.getElementById("invoiceStatus");
const invoiceRunAutomationBtn = document.getElementById("invoiceRunAutomationBtn");
const mailApiForm = document.getElementById("mailApiForm");
const mailApiBaseInput = document.getElementById("mailApiBase");
const mailSendForm = document.getElementById("mailSendForm");
const mailSyncBtn = document.getElementById("mailSyncBtn");
const mailRows = document.getElementById("mailRows");
const mailStatus = document.getElementById("mailStatus");
const candidateForm = document.getElementById("candidateForm");
const candidateRows = document.getElementById("candidateRows");
const candidateStatus = document.getElementById("candidateStatus");
const candidateSummary = document.getElementById("candidateSummary");
const automationForm = document.getElementById("automationForm");
const automationStatus = document.getElementById("automationStatus");
const autoDueDays = document.getElementById("autoDueDays");
const autoReminderDays = document.getElementById("autoReminderDays");
const autoBookOnPaid = document.getElementById("autoBookOnPaid");
const portfolioCards = document.getElementById("portfolioCards");
const caseModal = document.getElementById("caseModal");
const caseClose = document.getElementById("caseClose");
const caseTitle = document.getElementById("caseTitle");
const caseSector = document.getElementById("caseSector");
const caseChallenge = document.getElementById("caseChallenge");
const caseResults = document.getElementById("caseResults");
const caseCta = document.getElementById("caseCta");
const invoiceTemplateModal = document.getElementById("invoiceTemplateModal");
const invoiceTemplateClose = document.getElementById("invoiceTemplateClose");
const invoiceTemplateContent = document.getElementById("invoiceTemplateContent");
const invoiceTemplatePrint = document.getElementById("invoiceTemplatePrint");
const agentDock = document.getElementById("agentDock");
const agentToggle = document.getElementById("agentToggle");
const agentPanel = document.getElementById("agentPanel");
const agentClose = document.getElementById("agentClose");
const agentMessages = document.getElementById("agentMessages");
const agentForm = document.getElementById("agentForm");
const agentInput = document.getElementById("agentInput");
const CLICK_ZONE_SELECTORS = [
  ".kpi-card",
  ".book-summary",
  ".book-table-wrap",
  ".vat-report",
  ".flow-col",
  ".portfolio-dock",
  ".portfolio-item",
  ".agent-panel",
  ".case-card",
  ".invoice-template-card",
  ".info-card",
  ".admin-head",
  ".admin-note"
];

const ADMIN_SESSION_KEY = "modeliq_admin_session";
const SETTINGS_KEY = "modeliq_site_settings";
const BOOKKEEPING_KEY = "modeliq_bookkeeping_entries";
const QUOTE_KEY = "modeliq_quote_flow";
const BANK_LINK_KEY = "modeliq_bank_link";
const CANDIDATE_KEY = "modeliq_candidate_fits";
const INVOICE_KEY = "modeliq_invoices";
const AUTOMATION_KEY = "modeliq_automation_settings";
const MAIL_API_BASE_KEY = "modeliq_mail_api_base";
const ADMIN_API_TOKEN_KEY = "modeliq_admin_api_token";
const AUTH_USER_KEY = "modeliq_auth_user";
const DEFAULT_API_BASE = "http://localhost:3000";
let bookkeepingEntries = [];
let quotes = [];
let candidateFits = [];
let invoices = [];
let inboxMessages = [];
let activeInvoiceTemplate = null;
let googleGsiInitialized = false;
let googleGsiClientId = "";
let googleGsiResponseHandler = null;
let isAdminAuthenticated = false;
let currentAuthUser = null;
let automationSettings = {
  dueDays: 14,
  reminderDays: [3, 7, 14],
  autoBookOnPaid: true
};
const DEFAULT_INVOICE_NUMBER = "INV-2026-0001";
const DEFAULT_INVOICE_EMAIL = "finance@webston.nl";
const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
const portfolioCases = [
  {
    title: "Service Agent voor supportteam",
    sector: "SaaS / Customer Support",
    challenge: "Te veel handmatige tickets en te lange eerste reactietijd.",
    results: ["-42% ticketdruk", "Reactietijd van uren naar minuten", "24/7 triage op prioriteit"],
    topic: "support automation"
  },
  {
    title: "Sales Copilot voor offerteflow",
    sector: "B2B dienstverlening",
    challenge: "Offertes duurden te lang en opvolging was inconsistent.",
    results: ["+31% snellere offertelooptijd", "+18% win-rate", "Automatische follow-ups in CRM"],
    topic: "sales agents"
  },
  {
    title: "Forecasting model voor voorraad",
    sector: "Retail / E-commerce",
    challenge: "Overstock en out-of-stock door onbetrouwbare voorspellingen.",
    results: ["-22% voorraadkosten", "+15% beschikbaarheid", "Wekelijkse voorspelling per categorie"],
    topic: "forecasting modellen"
  }
];

const state = {
  mouseX: 0,
  mouseY: 0,
  targetX: 0,
  targetY: 0,
  time: 0
};

const orbitalNodes = words.map((item, index) => {
  const node = document.createElement("button");
  node.type = "button";
  node.className = "orbital-word";
  node.textContent = item.orbit;
  node.setAttribute("aria-label", `Open info: ${item.vision}`);
  node.style.fontSize = `${0.8 + (index % 3) * 0.28}rem`;
  node.style.background = "transparent";
  node.style.border = "0";
  node.style.padding = "0.2rem";
  node.style.font = "inherit";
  node.style.color = "inherit";

  node.addEventListener("click", () => openPortal(item));
  wordLayer.appendChild(node);

  return {
    node,
    angle: Math.random() * Math.PI * 2,
    radius: 120 + Math.random() * 250,
    depth: Math.random() * 800 - 400,
    speed: 0.0012 + Math.random() * 0.0018,
    wobble: 8 + Math.random() * 16
  };
});

function openPortal(itemData) {
  visionWord.textContent = itemData.vision;
  visionPitch.textContent = itemData.pitch;
  visionList.innerHTML = "";
  itemData.bullets.forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    visionList.appendChild(li);
  });

  portal.classList.add("active");
  portal.setAttribute("aria-hidden", "false");
  document.body.classList.add("portal-open");
  space.classList.add("zooming");

  orbitalNodes.forEach((item) => {
    item.node.style.transition = "transform 0.65s ease, opacity 0.65s ease";
    item.node.style.opacity = "0";
  });
}

function closePortal() {
  portal.classList.remove("active");
  portal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("portal-open");
  space.classList.remove("zooming");

  orbitalNodes.forEach((item) => {
    item.node.style.opacity = "1";
  });
}

function goHomeView() {
  closePortal();
  closeCaseModal();
  closeAdminModal();
  leadDock.classList.remove("open");
}

function openLeadDock(prefillTopic = "") {
  leadDock.classList.add("open");
  if (prefillTopic) {
    const goalInput = document.getElementById("goal");
    if (goalInput && !goalInput.value.trim()) {
      goalInput.value = `We willen hulp met ${prefillTopic}.`;
    }
  }
  if (nameInput) {
    nameInput.focus();
  }
}

function openCaseModal(portfolioCase) {
  caseTitle.textContent = portfolioCase.title;
  caseSector.textContent = portfolioCase.sector;
  caseChallenge.textContent = portfolioCase.challenge;
  caseResults.innerHTML = "";
  portfolioCase.results.forEach((result) => {
    const li = document.createElement("li");
    li.textContent = result;
    caseResults.appendChild(li);
  });
  caseCta.onclick = () => {
    openLeadDock(portfolioCase.topic);
    caseModal.classList.remove("active");
  };
  caseModal.classList.add("active");
  caseModal.setAttribute("aria-hidden", "false");
}

function closeCaseModal() {
  caseModal.classList.remove("active");
  caseModal.setAttribute("aria-hidden", "true");
}

function renderPortfolioCards() {
  if (!portfolioCards) {
    return;
  }
  portfolioCards.innerHTML = "";
  portfolioCases.forEach((portfolioCase) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "portfolio-item";
    button.innerHTML = `${portfolioCase.title}<small>${portfolioCase.sector}</small>`;
    button.addEventListener("click", () => openCaseModal(portfolioCase));
    portfolioCards.appendChild(button);
  });
}

function projectTopicFromName(name) {
  const value = String(name || "").toLowerCase();
  if (value.includes("support") || value.includes("helpdesk")) {
    return "support automation";
  }
  if (value.includes("sales") || value.includes("crm")) {
    return "sales automation";
  }
  if (value.includes("forecast") || value.includes("model")) {
    return "forecasting modellen";
  }
  if (value.includes("automation") || value.includes("agent")) {
    return "process automation";
  }
  return "ai project";
}

function projectCapabilities(topic, stack) {
  const base = [
    "Procesoptimalisatie met AI",
    "Dashboarding en rapportages",
    "Integraties met bestaande tools"
  ];
  if (topic.includes("support")) {
    return ["Ticket-triage automatiseren", "Klantvragen sneller afhandelen", "24/7 supportflows opzetten"];
  }
  if (topic.includes("sales")) {
    return ["Lead-opvolging automatiseren", "Offerteflow versnellen", "CRM opvolging verbeteren"];
  }
  if (topic.includes("forecast")) {
    return ["Vraag- en voorraadvoorspellingen", "Trendanalyse op data", "Scenario planning en alerts"];
  }
  if (stack === "Node.js") {
    return ["API-koppelingen bouwen", "Workflow automation", "Realtime notificaties"];
  }
  if (stack === "Python") {
    return ["Data-analyse pipelines", "ML/AI modellen toepassen", "Automatische rapportages"];
  }
  return base;
}

async function loadProjectsToPortfolio() {
  try {
    const payload = await apiRequest("/api/projects?limit=150", {
      headers: getApiHeaders()
    });
    const projects = Array.isArray(payload.projects) ? payload.projects : [];
    if (projects.length === 0) {
      return;
    }

    const existingTitles = new Set(portfolioCases.map((item) => item.title.toLowerCase()));
    projects.forEach((project, index) => {
      const projectName = String(project.name || "").trim();
      if (!projectName) {
        return;
      }
      const title = `Project ${String(index + 1).padStart(2, "0")}`;
      if (existingTitles.has(title.toLowerCase())) {
        return;
      }
      const updatedDate = String(project.updatedAt || "").slice(0, 10) || "onbekend";
      const stack = project.stack || "Onbekend";
      const topic = projectTopicFromName(projectName);
      const capabilities = projectCapabilities(topic, stack);
      portfolioCases.push({
        title,
        sector: `${stack} | geanonimiseerde case`,
        challenge: `Geanonimiseerde projectcase. Mogelijkheden op basis van stack en projecttype (update: ${updatedDate}).`,
        results: [
          `Technologie: ${stack}`,
          `Mogelijkheid: ${capabilities[0]}`,
          `Mogelijkheid: ${capabilities[1]}`,
          `Mogelijkheid: ${capabilities[2]}`
        ],
        topic
      });
      existingTitles.add(title.toLowerCase());
    });
    renderPortfolioCards();
  } catch {
    // laat standaard portfolio staan als project-endpoint niet beschikbaar is
  }
}

function addAgentMessage(role, text, actions = []) {
  if (!agentMessages) {
    return;
  }
  const message = document.createElement("article");
  message.className = `agent-msg ${role}`;
  message.textContent = text;
  if (actions.length > 0) {
    const actionBox = document.createElement("div");
    actionBox.className = "agent-actions";
    actions.forEach((action) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "agent-action";
      btn.textContent = action.label;
      btn.addEventListener("click", action.onClick);
      actionBox.appendChild(btn);
    });
    message.appendChild(actionBox);
  }
  agentMessages.appendChild(message);
  agentMessages.scrollTop = agentMessages.scrollHeight;
}

function openAgent() {
  agentDock.classList.add("open");
  if (agentMessages.children.length === 0) {
    addAgentMessage(
      "bot",
      "Ik help bezoekers snel de juiste case te vinden. Vraag bijvoorbeeld: sales automation, support agent of forecasting."
    );
  }
}

function closeAgent() {
  agentDock.classList.remove("open");
}

function ensureClickToast() {
  let toast = document.getElementById("globalClickToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "globalClickToast";
    toast.className = "global-click-toast";
    document.body.appendChild(toast);
  }
  return toast;
}

function showClickToast(message) {
  const toast = ensureClickToast();
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showClickToast.timeoutId);
  showClickToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 850);
}
showClickToast.timeoutId = 0;

function spawnClickBurst(event) {
  const burst = document.createElement("span");
  burst.className = "click-burst";
  burst.style.left = `${event.clientX}px`;
  burst.style.top = `${event.clientY}px`;
  document.body.appendChild(burst);
  window.setTimeout(() => burst.remove(), 400);
}

function getClickZoneMessage(zone) {
  if (!zone) {
    return "Klik geregistreerd.";
  }
  if (zone.closest("[data-panel='bookkeeping']")) {
    return "Boekhouding actief.";
  }
  if (zone.closest("[data-panel='invoices']")) {
    return "Factuurgedeelte actief.";
  }
  if (zone.closest("[data-panel='quotes']")) {
    return "Offerteflow actief.";
  }
  if (zone.closest(".portfolio-dock")) {
    return "Portfolio geselecteerd.";
  }
  if (zone.closest(".agent-panel")) {
    return "Agent paneel actief.";
  }
  return "Klik geregistreerd.";
}

function initClickEverywhere() {
  document.querySelectorAll(CLICK_ZONE_SELECTORS.join(",")).forEach((node) => {
    node.classList.add("click-zone");
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    spawnClickBurst(event);
    const interactiveTarget = target.closest("button, a, input, select, textarea, label");
    if (interactiveTarget) {
      return;
    }
    const zone = target.closest(".click-zone");
    if (!zone) {
      showClickToast("Klik ontvangen.");
      return;
    }
    zone.classList.add("click-pop");
    window.setTimeout(() => zone.classList.remove("click-pop"), 220);
    showClickToast(getClickZoneMessage(zone));
  });
}

function findMatchingCase(input) {
  const text = input.toLowerCase();
  const byKeyword = portfolioCases.find((item) => {
    const lookup = `${item.title} ${item.sector} ${item.challenge} ${item.topic}`.toLowerCase();
    return lookup.includes(text) || text.includes(item.topic.split(" ")[0]);
  });
  if (byKeyword) {
    return byKeyword;
  }
  if (text.includes("sales") || text.includes("offerte")) {
    return portfolioCases[1];
  }
  if (text.includes("support") || text.includes("service")) {
    return portfolioCases[0];
  }
  if (text.includes("forecast") || text.includes("voorraad")) {
    return portfolioCases[2];
  }
  return null;
}

function handleAgentQuestion(question) {
  addAgentMessage("user", question);
  const matched = findMatchingCase(question);
  if (matched) {
    addAgentMessage("bot", `Beste match: ${matched.title}. Wil je de details of direct een intake?`, [
      { label: "Bekijk case", onClick: () => openCaseModal(matched) },
      { label: "Plan intake", onClick: () => openLeadDock(matched.topic) }
    ]);
    return;
  }
  addAgentMessage(
    "bot",
    "Ik heb nog geen exacte match. Kies een richting en ik stuur je naar de juiste case.",
    [
      { label: "Sales", onClick: () => openCaseModal(portfolioCases[1]) },
      { label: "Support", onClick: () => openCaseModal(portfolioCases[0]) },
      { label: "Forecasting", onClick: () => openCaseModal(portfolioCases[2]) }
    ]
  );
}

function openAdminModal() {
  adminModal.classList.add("active");
  adminModal.setAttribute("aria-hidden", "false");
}

function closeAdminModal() {
  adminModal.classList.remove("active");
  adminModal.setAttribute("aria-hidden", "true");
}

function applySettings(settings) {
  const ctaText = settings?.ctaText || "Plan intake";
  const contactEmail = settings?.contactEmail || "hallo@modeliq.nl";

  leadBtn.textContent = ctaText;
  openIntakeTop.textContent = ctaText;
  leadToggle.textContent = ctaText;
  if (leadSubmitBtn) {
    leadSubmitBtn.textContent = ctaText;
  }

  mailLinks.forEach((link) => {
    link.setAttribute("href", `mailto:${contactEmail}`);
  });
}

function setAdminState(isLoggedIn) {
  if (isLoggedIn) {
    isAdminAuthenticated = true;
    adminDock.classList.add("open");
    document.body.classList.add("admin-open");
    localStorage.setItem(ADMIN_SESSION_KEY, "1");
    switchAdminTab("dashboard");
  } else {
    isAdminAuthenticated = false;
    adminDock.classList.remove("open");
    document.body.classList.remove("admin-open");
    localStorage.removeItem(ADMIN_SESSION_KEY);
  }
}

function switchAdminTab(tabName) {
  adminTabs.forEach((tab) => {
    const active = tab.dataset.tab === tabName;
    tab.classList.toggle("active", active);
  });
  adminPanels.forEach((panel) => {
    const active = panel.dataset.panel === tabName;
    panel.classList.toggle("active", active);
  });
}

function getStoredSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function formatEur(amount) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR"
  }).format(amount);
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function getApiBase() {
  const custom = (mailApiBaseInput?.value || "").trim();
  if (custom) {
    return custom.replace(/\/$/, "");
  }
  if (window.location.origin.startsWith("http")) {
    return window.location.origin;
  }
  return DEFAULT_API_BASE;
}

function getAdminApiToken() {
  const fromInput = String(adminApiTokenInput?.value || "").trim();
  if (fromInput) {
    return fromInput;
  }
  return String(localStorage.getItem(ADMIN_API_TOKEN_KEY) || "").trim();
}

function setAdminApiToken(token) {
  if (!token) {
    localStorage.removeItem(ADMIN_API_TOKEN_KEY);
    if (adminApiTokenInput) {
      adminApiTokenInput.value = "";
    }
    return;
  }
  localStorage.setItem(ADMIN_API_TOKEN_KEY, token);
  if (adminApiTokenInput) {
    adminApiTokenInput.value = token;
  }
}

function setCurrentAuthUser(user) {
  if (!user) {
    currentAuthUser = null;
    localStorage.removeItem(AUTH_USER_KEY);
    return;
  }
  currentAuthUser = {
    id: user.id,
    email: user.email,
    name: user.name || "",
    role: user.role || "user",
    provider: user.provider || ""
  };
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentAuthUser));
}

function loadCurrentAuthUser() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) {
      currentAuthUser = null;
      return;
    }
    currentAuthUser = JSON.parse(raw);
  } catch {
    currentAuthUser = null;
  }
}

function clearAdminAuth() {
  setAdminApiToken("");
  setCurrentAuthUser(null);
  setAdminState(false);
  closeAdminModal();
}

function hasAdminApiAccess() {
  return isAdminAuthenticated && !!getAdminApiToken() && currentAuthUser?.role === "admin";
}

function isFileOrigin() {
  return window.location.protocol === "file:";
}

function getApiHeaders() {
  const headers = { "Content-Type": "application/json" };
  const token = getAdminApiToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function apiRequest(pathname, options = {}) {
  const base = getApiBase();
  if (!base) {
    throw new Error("API URL ontbreekt.");
  }
  const response = await fetch(`${base}${pathname}`, options);
  if (!response.ok) {
    if (response.status === 401 && pathname !== "/api/admin/login") {
      clearAdminAuth();
    }
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || `API fout (${response.status})`);
  }
  return response.json().catch(() => ({}));
}

function loadMailApiBase() {
  const stored = localStorage.getItem(MAIL_API_BASE_KEY);
  if (mailApiBaseInput && stored) {
    mailApiBaseInput.value = stored;
  } else if (mailApiBaseInput) {
    mailApiBaseInput.value = getApiBase();
  }
}

function saveMailApiBase() {
  const base = (mailApiBaseInput?.value || "").trim();
  if (base) {
    localStorage.setItem(MAIL_API_BASE_KEY, base);
  } else {
    localStorage.removeItem(MAIL_API_BASE_KEY);
  }
}

function loadAdminApiToken() {
  const token = localStorage.getItem(ADMIN_API_TOKEN_KEY) || "";
  if (adminApiTokenInput && token) {
    adminApiTokenInput.value = token;
  }
}

async function loginAdmin(username, password) {
  const payload = await apiRequest("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const token = String(payload.token || "").trim();
  if (!token) {
    throw new Error("Login gelukt maar token ontbreekt.");
  }
  setAdminApiToken(token);
  setCurrentAuthUser(payload.user || { email: `${username}@local`, role: "admin", name: username, provider: "local" });
}

async function loginAdminWithEmail(email) {
  const payload = await apiRequest("/api/admin/login-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  const token = String(payload.token || "").trim();
  if (!token) {
    throw new Error("Login gelukt maar token ontbreekt.");
  }
  setAdminApiToken(token);
  setCurrentAuthUser(payload.user || { email, role: "admin", name: email.split("@")[0], provider: "email" });
}

async function loginAdminWithGooglePopup() {
  if (isFileOrigin()) {
    throw new Error("Open de app via http://localhost:3000 voor Google login (niet via file://).");
  }
  if (!window.google?.accounts?.id) {
    throw new Error("Google script nog niet geladen. Herlaad de pagina.");
  }
  return new Promise((resolve, reject) => {
    let done = false;
    const finish = (handler) => {
      if (done) {
        return;
      }
      done = true;
      handler();
    };
    const timeoutId = window.setTimeout(() => {
      finish(() => reject(new Error("Google login timeout. Probeer opnieuw.")));
    }, 120000);

    apiRequest("/api/health")
      .then((health) => {
        const clientId = String(health?.config?.googleOAuth ? health?.googleClientId || "" : "").trim();
        if (!clientId) {
          throw new Error("Google login is nog niet geconfigureerd op de server. Voeg GOOGLE_CLIENT_ID toe aan .env.");
        }
        googleGsiResponseHandler = async (response) => {
          try {
            const payload = await apiRequest("/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credential: response.credential })
            });
            const token = String(payload.token || "").trim();
            if (!token) {
              throw new Error("Google login gelukt maar token ontbreekt.");
            }
            setAdminApiToken(token);
            if (payload.user) {
              setCurrentAuthUser(payload.user);
            }
            window.clearTimeout(timeoutId);
            finish(() => resolve());
          } catch (error) {
            window.clearTimeout(timeoutId);
            finish(() => reject(error instanceof Error ? error : new Error("Google login mislukt.")));
          }
        };

        if (!googleGsiInitialized || googleGsiClientId !== clientId) {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response) => {
              if (googleGsiResponseHandler) {
                googleGsiResponseHandler(response);
              }
            }
          });
          googleGsiInitialized = true;
          googleGsiClientId = clientId;
        }

        window.google.accounts.id.prompt();
      })
      .catch((error) => {
        window.clearTimeout(timeoutId);
        finish(() => reject(error instanceof Error ? error : new Error("Google login configuratie mislukt.")));
      });
  });
}

async function attemptAutoGoogleLogin() {
  try {
    await loginAdminWithGooglePopup();
    if (currentAuthUser?.role === "admin") {
      setAdminState(true);
      adminStatus.textContent = "Succesvol ingelogd met Google.";
    } else {
      adminStatus.textContent = "Succesvol ingelogd als gebruiker.";
    }
    closeAdminModal();
    return true;
  } catch (error) {
    adminStatus.textContent = error instanceof Error ? error.message : "Google login mislukt.";
    return false;
  }
}

async function restoreAdminSession() {
  const token = getAdminApiToken();
  if (!token) {
    return;
  }
  try {
    const payload = await apiRequest("/api/auth/session", {
      headers: getApiHeaders()
    });
    setCurrentAuthUser(payload.user || null);
    if (payload.user?.role === "admin") {
      setAdminState(true);
    } else {
      setAdminState(false);
    }
  } catch {
    clearAdminAuth();
  }
}

function renderInbox() {
  if (!mailRows) {
    return;
  }
  mailRows.innerHTML = "";
  inboxMessages.forEach((msg) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${msg.date || "-"}</td>
      <td>${msg.from || "-"}</td>
      <td>${msg.subject || "-"}</td>
      <td>${msg.snippet || ""}</td>`;
    mailRows.appendChild(row);
  });
}

async function syncInbox() {
  const payload = await apiRequest("/api/mail/inbox?limit=20", {
    headers: getApiHeaders()
  });
  inboxMessages = Array.isArray(payload.messages) ? payload.messages : [];
  renderInbox();
}

async function sendMail({ to, subject, text }) {
  await apiRequest("/api/mail/send", {
    method: "POST",
    headers: getApiHeaders(),
    body: JSON.stringify({ to, subject, text })
  });
}

function addDays(dateStr, days) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function dayDiff(fromDateStr, toDateStr) {
  const from = new Date(fromDateStr);
  const to = new Date(toDateStr);
  return Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
}

function getQuarterRange(year, quarter) {
  const q = Math.max(1, Math.min(4, Number(quarter) || 1));
  const y = Number(year) || new Date().getFullYear();
  const startMonth = (q - 1) * 3;
  const start = new Date(Date.UTC(y, startMonth, 1));
  const end = new Date(Date.UTC(y, startMonth + 3, 0));
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10)
  };
}

async function saveBookkeeping() {
  localStorage.setItem(BOOKKEEPING_KEY, JSON.stringify(bookkeepingEntries));
  if (!hasAdminApiAccess()) {
    return;
  }
  try {
    await apiRequest("/api/bookkeeping/sync", {
      method: "PUT",
      headers: getApiHeaders(),
      body: JSON.stringify({ entries: bookkeepingEntries })
    });
  } catch {
    // fallback blijft localStorage
  }
}

function renderBookkeeping() {
  if (!bookRows) {
    return;
  }

  bookRows.innerHTML = "";
  let revenue = 0;
  let costs = 0;
  let vatBalance = 0;

  bookkeepingEntries.forEach((entry) => {
    const vatValue = (entry.amount * entry.vat) / 100;
    if (entry.type === "income") {
      revenue += entry.amount;
      vatBalance += vatValue;
    } else {
      costs += entry.amount;
      vatBalance -= vatValue;
    }

    const row = document.createElement("tr");
    row.innerHTML = `<td>${entry.date}</td>
      <td>${entry.type === "income" ? "Inkomst" : "Uitgave"}</td>
      <td>${entry.description}</td>
      <td>${formatEur(entry.amount)}</td>
      <td>${entry.vat}%</td>
      <td><button type="button" class="book-delete" data-entry-id="${entry.id}">Verwijder</button></td>`;
    bookRows.appendChild(row);
  });

  sumRevenue.textContent = formatEur(revenue);
  sumCosts.textContent = formatEur(costs);
  sumVat.textContent = formatEur(vatBalance);
  sumNet.textContent = formatEur(revenue - costs);
  renderVatReport();
  refreshDashboard();
}

function renderVatReport() {
  if (!vatReportRows || !vatReportSummary) {
    return;
  }
  const selectedYear = Number(vatPeriodYear?.value || new Date().getFullYear());
  const selectedQuarter = Number(vatPeriodQuarter?.value || Math.ceil((new Date().getMonth() + 1) / 3));
  const quarterRange = getQuarterRange(selectedYear, selectedQuarter);
  const vatByMonth = new Map();
  let revenue21 = 0;
  let revenue9 = 0;
  let revenue0 = 0;
  let outputTax = 0;
  let inputTax = 0;

  bookkeepingEntries.forEach((entry) => {
    if (!entry?.date) {
      return;
    }
    const period = String(entry.date).slice(0, 7);
    if (!/^\d{4}-\d{2}$/.test(period)) {
      return;
    }
    const vatAmount = (Number(entry.amount || 0) * Number(entry.vat || 0)) / 100;
    if (entry.date >= quarterRange.start && entry.date <= quarterRange.end) {
      const rate = Number(entry.vat || 0);
      if (entry.type === "income") {
        if (Math.abs(rate - 21) < 0.01) {
          revenue21 += Number(entry.amount || 0);
        } else if (Math.abs(rate - 9) < 0.01) {
          revenue9 += Number(entry.amount || 0);
        } else if (Math.abs(rate) < 0.01) {
          revenue0 += Number(entry.amount || 0);
        }
        outputTax += vatAmount;
      } else {
        inputTax += vatAmount;
      }
    }
    const current = vatByMonth.get(period) || { outputVat: 0, inputVat: 0 };
    if (entry.type === "income") {
      current.outputVat += vatAmount;
    } else {
      current.inputVat += vatAmount;
    }
    vatByMonth.set(period, current);
  });

  const periods = Array.from(vatByMonth.keys()).sort((a, b) => b.localeCompare(a));
  vatReportRows.innerHTML = "";

  if (periods.length === 0) {
    vatReportSummary.textContent = "Nog geen data voor BTW-rapportage.";
    return;
  }

  let totalOutput = 0;
  let totalInput = 0;

  periods.forEach((period) => {
    const monthData = vatByMonth.get(period) || { outputVat: 0, inputVat: 0 };
    totalOutput += monthData.outputVat;
    totalInput += monthData.inputVat;
    const saldo = monthData.outputVat - monthData.inputVat;
    const row = document.createElement("tr");
    row.innerHTML = `<td>${period}</td>
      <td>${formatEur(monthData.outputVat)}</td>
      <td>${formatEur(monthData.inputVat)}</td>
      <td>${formatEur(saldo)}</td>`;
    vatReportRows.appendChild(row);
  });

  const totalSaldo = totalOutput - totalInput;
  const netQuarter = outputTax - inputTax;
  if (vatRevenue21) {
    vatRevenue21.value = formatEur(revenue21);
  }
  if (vatRevenue9) {
    vatRevenue9.value = formatEur(revenue9);
  }
  if (vatRevenue0) {
    vatRevenue0.value = formatEur(revenue0);
  }
  if (vatOutputTax) {
    vatOutputTax.value = formatEur(outputTax);
  }
  if (vatInputTax) {
    vatInputTax.value = formatEur(inputTax);
  }
  if (vatNetTax) {
    vatNetTax.value = formatEur(netQuarter);
  }
  vatReportSummary.textContent = `Q${selectedQuarter} ${selectedYear}: af te dragen BTW ${formatEur(outputTax)} | voorbelasting ${formatEur(inputTax)} | netto ${formatEur(netQuarter)}. Over alle boekingen: ${formatEur(totalSaldo)}.`;
}

async function loadBookkeeping() {
  const canUseApi = hasAdminApiAccess();
  try {
    if (canUseApi) {
      const payload = await apiRequest("/api/bookkeeping", {
        headers: getApiHeaders()
      });
      if (Array.isArray(payload.entries)) {
        bookkeepingEntries = payload.entries.map((entry) => ({
          ...entry,
          id: entry.id || createId("book")
        }));
        localStorage.setItem(BOOKKEEPING_KEY, JSON.stringify(bookkeepingEntries));
        renderBookkeeping();
        return;
      }
    }
  } catch {
    // fallback localStorage
  }
  try {
    const raw = localStorage.getItem(BOOKKEEPING_KEY);
    bookkeepingEntries = raw ? JSON.parse(raw) : [];
    bookkeepingEntries = bookkeepingEntries.map((entry) => ({
      ...entry,
      id: entry.id || createId("book")
    }));
  } catch {
    bookkeepingEntries = [];
  }
  renderBookkeeping();
}

function saveAutomationSettings() {
  localStorage.setItem(AUTOMATION_KEY, JSON.stringify(automationSettings));
}

function loadAutomationSettings() {
  try {
    const raw = localStorage.getItem(AUTOMATION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      automationSettings = {
        dueDays: Number(parsed.dueDays) || 14,
        reminderDays: Array.isArray(parsed.reminderDays) ? parsed.reminderDays.map((value) => Number(value)).filter((value) => value > 0) : [3, 7, 14],
        autoBookOnPaid: parsed.autoBookOnPaid !== false
      };
    }
  } catch {
    automationSettings = { dueDays: 14, reminderDays: [3, 7, 14], autoBookOnPaid: true };
  }

  if (autoDueDays) {
    autoDueDays.value = String(automationSettings.dueDays);
  }
  if (autoReminderDays) {
    autoReminderDays.value = automationSettings.reminderDays.join(",");
  }
  if (autoBookOnPaid) {
    autoBookOnPaid.checked = automationSettings.autoBookOnPaid;
  }
}

async function saveInvoices() {
  localStorage.setItem(INVOICE_KEY, JSON.stringify(invoices));
  if (!hasAdminApiAccess()) {
    return;
  }
  try {
    await apiRequest("/api/invoices/sync", {
      method: "PUT",
      headers: getApiHeaders(),
      body: JSON.stringify({ invoices })
    });
  } catch {
    // fallback localStorage
  }
}

async function loadInvoices() {
  let loadedFromApi = false;
  const canUseApi = hasAdminApiAccess();
  try {
    if (canUseApi) {
      const payload = await apiRequest("/api/invoices", {
        headers: getApiHeaders()
      });
      if (Array.isArray(payload.invoices)) {
        invoices = payload.invoices;
        localStorage.setItem(INVOICE_KEY, JSON.stringify(invoices));
        loadedFromApi = true;
      }
    }
  } catch {
    // fallback localStorage
  }
  if (!loadedFromApi) {
    try {
      const raw = localStorage.getItem(INVOICE_KEY);
      invoices = raw ? JSON.parse(raw) : [];
    } catch {
      invoices = [];
    }
  }
  let mutated = false;
  const hasDefault = invoices.some((invoice) => invoice.number === DEFAULT_INVOICE_NUMBER);
  if (!hasDefault) {
    invoices.unshift({
      id: createId("inv"),
      number: DEFAULT_INVOICE_NUMBER,
      quoteId: "",
      quoteNumber: "OFF-2026-001",
      customer: "Webston B.V.",
      customerEmail: DEFAULT_INVOICE_EMAIL,
      title: "Mail automation",
      amount: 300,
      vat: 21,
      issueDate: "2026-05-06",
      dueDate: "2026-05-20",
      status: "sent",
      remindersSent: 0,
      paidDate: ""
    });
    mutated = true;
  }
  invoices = invoices.map((invoice) => {
    if (invoice.number === DEFAULT_INVOICE_NUMBER && !invoice.customerEmail) {
      mutated = true;
      return {
        ...invoice,
        customerEmail: DEFAULT_INVOICE_EMAIL
      };
    }
    return invoice;
  });
  if (mutated) {
    await saveInvoices();
  }
  renderInvoices();
}

async function refreshGoCardlessStatus(bankLink) {
  if (!bankLink?.requisitionId) {
    return bankLink;
  }
  if (!hasAdminApiAccess()) {
    return bankLink;
  }
  const payload = await apiRequest(`/api/bank/gocardless/requisition/${encodeURIComponent(bankLink.requisitionId)}`, {
    headers: getApiHeaders()
  });
  const accounts = Array.isArray(payload.accounts) ? payload.accounts : [];
  const next = {
    ...bankLink,
    gocardlessStatus: String(payload.status || ""),
    accounts,
    linked: String(payload.status || "") === "LN" || accounts.length > 0
  };
  localStorage.setItem(BANK_LINK_KEY, JSON.stringify(next));
  return next;
}

function formatBankStatus(bankLink) {
  if (!bankLink) {
    return "";
  }
  if (bankLink.provider === "gocardless") {
    if (bankLink.linked) {
      return `PSD2 gekoppeld via GoCardless (${bankLink.institutionName || "Revolut"}), accounts: ${bankLink.accounts?.length || 0}`;
    }
    return `PSD2 consent actief (${bankLink.institutionName || "Revolut"}), status: ${bankLink.gocardlessStatus || "PENDING"}`;
  }
  return `Gekoppeld: ${bankLink.provider} (${bankLink.iban})`;
}

function toggleBankConnectRequirements() {
  const provider = String(bankProviderInput?.value || "").trim();
  if (!bankIbanInput) {
    return;
  }
  const gocardlessMode = provider === "gocardless";
  bankIbanInput.required = !gocardlessMode;
  bankIbanInput.placeholder = gocardlessMode ? "Landcode (bijv. NL) of IBAN (optioneel)" : "NL00BANK0123456789";
}

async function loadBankLinkStatus() {
  try {
    const raw = localStorage.getItem(BANK_LINK_KEY);
    if (!raw) {
      return;
    }
    let data = JSON.parse(raw);
    if (data.provider === "gocardless" && data.requisitionId) {
      try {
        data = await refreshGoCardlessStatus(data);
      } catch {
        // keep cached state when API is not reachable
      }
    }
    bankStatus.textContent = formatBankStatus(data);
  } catch {
    bankStatus.textContent = "";
  }
}

function parseCsvTransactions(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines.length < 2) {
    return [];
  }
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const idxDate = header.indexOf("date");
  const idxDesc = header.indexOf("description");
  const idxAmount = header.indexOf("amount");
  const idxType = header.indexOf("type");
  const idxVat = header.indexOf("vat");
  if (idxDate === -1 || idxDesc === -1 || idxAmount === -1) {
    throw new Error("CSV moet kolommen hebben: date, description, amount");
  }

  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    const amountRaw = Number(String(cols[idxAmount] || "0").trim().replace(",", "."));
    const vatRaw = Number(String(cols[idxVat] || "21").trim().replace(",", "."));
    const typeRaw = String(cols[idxType] || "").trim().toLowerCase();
    const type = typeRaw === "expense" || amountRaw < 0 ? "expense" : "income";
    return {
      id: createId("book"),
      date: String(cols[idxDate] || "").trim(),
      description: String(cols[idxDesc] || "").trim(),
      amount: Math.abs(amountRaw),
      vat: Number.isNaN(vatRaw) ? 21 : vatRaw,
      type
    };
  });
}

function saveCandidates() {
  localStorage.setItem(CANDIDATE_KEY, JSON.stringify(candidateFits));
}

function loadCandidates() {
  try {
    const raw = localStorage.getItem(CANDIDATE_KEY);
    candidateFits = raw ? JSON.parse(raw) : [];
  } catch {
    candidateFits = [];
  }
  renderCandidates();
}

function getDomainMatch(domain) {
  if (domain === "sales") {
    return portfolioCases[1];
  }
  if (domain === "support") {
    return portfolioCases[0];
  }
  if (domain === "forecasting") {
    return portfolioCases[2];
  }
  return portfolioCases[1];
}

function evaluateCandidateFit(input) {
  const skills = input.skills
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  const role = input.role.toLowerCase();
  const domain = input.domain;

  let score = Math.min(25, input.years * 3);
  const skillText = skills.join(" ");

  const domainKeywords = {
    sales: ["sales", "crm", "lead", "automation", "revenue"],
    support: ["support", "service", "ticket", "chatbot", "nlp"],
    forecasting: ["forecast", "python", "sql", "statistics", "data", "ml"],
    general: ["ai", "llm", "python", "automation", "integration"]
  };

  const keywords = domainKeywords[domain] || domainKeywords.general;
  keywords.forEach((keyword) => {
    if (skillText.includes(keyword)) {
      score += 8;
    }
  });

  if (role.includes("engineer") || role.includes("scientist") || role.includes("consult")) {
    score += 10;
  }
  if (skills.length >= 5) {
    score += 8;
  }
  if (domain !== "general") {
    score += 10;
  }

  const fitScore = Math.min(100, Math.round(score));
  let note = "Mogelijke match";
  if (fitScore >= 80) {
    note = "Sterke match";
  } else if (fitScore >= 65) {
    note = "Goede match";
  } else if (fitScore < 45) {
    note = "Begeleiding nodig";
  }

  const bestMatch = getDomainMatch(domain);
  return {
    id: createId("cand"),
    name: input.name,
    fitScore,
    bestMatch: bestMatch.title,
    note
  };
}

function renderCandidates() {
  if (!candidateRows) {
    return;
  }
  candidateRows.innerHTML = "";
  candidateFits.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${item.name}</td>
      <td>${item.fitScore}%</td>
      <td>${item.bestMatch}</td>
      <td>${item.note}</td>`;
    candidateRows.appendChild(row);
  });

  if (candidateSummary) {
    if (candidateFits.length === 0) {
      candidateSummary.textContent = "Nog geen kandidaten beoordeeld.";
      return;
    }
    const average = Math.round(candidateFits.reduce((sum, item) => sum + item.fitScore, 0) / candidateFits.length);
    const strong = candidateFits.filter((item) => item.fitScore >= 80).length;
    candidateSummary.textContent = `Gemiddelde fit: ${average}% | Sterke matches: ${strong} van ${candidateFits.length}`;
  }
}

function refreshDashboard() {
  if (!kpiDraft) {
    return;
  }
  const counts = {
    draft: 0,
    sent: 0,
    accepted: 0,
    invoiced: 0
  };
  quotes.forEach((quote) => {
    if (counts[quote.status] !== undefined) {
      counts[quote.status] += 1;
    }
  });
  const today = new Date().toISOString().slice(0, 10);
  let outstanding = 0;
  let overdue = 0;
  invoices.forEach((invoice) => {
    if (invoice.status !== "paid") {
      outstanding += invoice.amount;
      if (dayDiff(invoice.dueDate, today) > 0) {
        overdue += invoice.amount;
      }
    }
  });
  kpiDraft.textContent = String(counts.draft);
  kpiSent.textContent = String(counts.sent);
  kpiAccepted.textContent = String(counts.accepted);
  kpiInvoiced.textContent = String(counts.invoiced);
  if (kpiOutstanding) {
    kpiOutstanding.textContent = formatEur(outstanding);
  }
  if (kpiOverdue) {
    kpiOverdue.textContent = formatEur(overdue);
  }
}

function saveQuotes() {
  localStorage.setItem(QUOTE_KEY, JSON.stringify(quotes));
}

function loadQuotes() {
  try {
    const raw = localStorage.getItem(QUOTE_KEY);
    quotes = raw ? JSON.parse(raw) : [];
  } catch {
    quotes = [];
  }
  renderQuotes();
}

function getQuoteActions(status) {
  if (status === "draft") {
    return [{ action: "send", label: "Markeer als sent" }, { action: "cancel", label: "Annuleer" }];
  }
  if (status === "sent") {
    return [
      { action: "accept", label: "Accepteer" },
      { action: "draft", label: "Terug naar draft" },
      { action: "cancel", label: "Annuleer" }
    ];
  }
  if (status === "accepted") {
    return [{ action: "invoice", label: "Maak factuur" }, { action: "cancel", label: "Annuleer" }];
  }
  return [];
}

function renderQuotes() {
  if (!flowDraft || !flowSent || !flowAccepted || !flowInvoiced) {
    return;
  }

  flowDraft.innerHTML = "";
  flowSent.innerHTML = "";
  flowAccepted.innerHTML = "";
  flowInvoiced.innerHTML = "";

  quotes.forEach((quote) => {
    const card = document.createElement("article");
    card.className = "quote-card";
    card.innerHTML = `<div class="quote-head">
        <span class="quote-id">${quote.number}</span>
        <span>${formatEur(quote.amount)}</span>
      </div>
      <div class="quote-customer">${quote.customer}</div>
      <p class="quote-meta">${quote.title} (${quote.vat}% btw)</p>`;

    const actions = getQuoteActions(quote.status);
    if (actions.length > 0) {
      const actionBox = document.createElement("div");
      actionBox.className = "quote-actions";
      actions.forEach((item) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "mini-btn";
        btn.textContent = item.label;
        btn.setAttribute("data-quote-id", quote.id);
        btn.setAttribute("data-action", item.action);
        actionBox.appendChild(btn);
      });
      card.appendChild(actionBox);
    }

    if (quote.status === "draft") {
      flowDraft.appendChild(card);
    } else if (quote.status === "sent") {
      flowSent.appendChild(card);
    } else if (quote.status === "accepted") {
      flowAccepted.appendChild(card);
    } else if (quote.status === "invoiced") {
      flowInvoiced.appendChild(card);
    }
  });
  refreshDashboard();
}

function createInvoiceFromQuote(quote) {
  const exists = invoices.find((invoice) => invoice.quoteId === quote.id);
  if (exists) {
    return exists;
  }
  const issueDate = new Date().toISOString().slice(0, 10);
  const invoice = {
    id: createId("inv"),
    number: `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(4, "0")}`,
    quoteId: quote.id,
    quoteNumber: quote.number,
    customer: quote.customer,
    customerEmail: quote.customerEmail || "",
    title: quote.title,
    amount: quote.amount,
    vat: quote.vat,
    issueDate,
    dueDate: addDays(issueDate, automationSettings.dueDays),
    status: "draft",
    remindersSent: 0,
    paidDate: ""
  };
  invoices.unshift(invoice);
  saveInvoices();
  renderInvoices();
  return invoice;
}

async function sendInvoiceMail(invoice, type = "invoice") {
  const subjectPrefix = type === "reminder" ? "Betaalherinnering" : "Factuur";
  const subject = `${subjectPrefix} ${invoice.number} - ${invoice.customer}`;
  const body = 
    `Beste ${invoice.customer},\n\n` +
      `${type === "reminder" ? "Dit is een herinnering voor de openstaande factuur." : "Hierbij sturen we je factuur."}\n` +
      `Factuur: ${invoice.number}\n` +
      `Omschrijving: ${invoice.title}\n` +
      `Bedrag excl. btw: ${formatEur(invoice.amount)}\n` +
      `BTW: ${invoice.vat}%\n` +
      `Vervaldatum: ${invoice.dueDate}\n\n` +
      `Met vriendelijke groet,\nModeliq`;
  try {
    await sendMail({
      to: invoice.customerEmail || DEFAULT_INVOICE_EMAIL,
      subject,
      text: body
    });
  } catch {
    const recipient = encodeURIComponent(String(invoice.customerEmail || "").trim());
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}

async function createInvoicePdf(invoice) {
  const base = getApiBase();
  if (!base) {
    throw new Error("API URL ontbreekt.");
  }
  const response = await fetch(`${base}/api/invoices/pdf`, {
    method: "POST",
    headers: getApiHeaders(),
    body: JSON.stringify({ invoice })
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || "PDF genereren mislukt.");
  }
  return response.blob();
}

async function downloadInvoicePdf(invoice) {
  try {
    const blob = await createInvoicePdf(invoice);
    const url = URL.createObjectURL(blob);
    const safeName = String(invoice.number || "factuur").replace(/[^A-Za-z0-9_-]/g, "_");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeName}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
    return "download";
  } catch {
    activeInvoiceTemplate = invoice;
    printActiveInvoiceTemplate();
    return "print";
  }
}

async function mailInvoicePdf(invoice, type = "invoice") {
  if (!invoice.customerEmail) {
    invoice.customerEmail = String(
      window.prompt(`E-mailadres voor factuur ${invoice.number}:`, DEFAULT_INVOICE_EMAIL) || ""
    ).trim();
  }
  if (!invoice.customerEmail) {
    throw new Error("Geen ontvanger opgegeven.");
  }
  const subjectPrefix = type === "reminder" ? "Betaalherinnering" : "Factuur";
  try {
    await apiRequest("/api/invoices/mail-pdf", {
      method: "POST",
      headers: getApiHeaders(),
      body: JSON.stringify({
        to: invoice.customerEmail,
        invoice,
        subject: `${subjectPrefix} ${invoice.number} - ${invoice.customer}`,
        text:
          `${type === "reminder" ? "Dit is een herinnering voor de openstaande factuur." : "In de bijlage vind je de factuur in PDF."}\n` +
          `Factuur: ${invoice.number}\nOmschrijving: ${invoice.title}\nBedrag excl. btw: ${formatEur(invoice.amount)}\n` +
          `BTW: ${invoice.vat}%\nVervaldatum: ${invoice.dueDate}\n\nMet vriendelijke groet,\nModeliq`
      })
    });
  } catch {
    await sendInvoiceMail(invoice, type);
  }
}

function markInvoicePaid(invoice) {
  invoice.status = "paid";
  invoice.paidDate = new Date().toISOString().slice(0, 10);
  if (automationSettings.autoBookOnPaid) {
    const existing = bookkeepingEntries.find((entry) => entry.invoiceId === invoice.id);
    if (!existing) {
      bookkeepingEntries.unshift({
        id: createId("book"),
        invoiceId: invoice.id,
        quoteId: invoice.quoteId,
        date: invoice.paidDate,
        type: "income",
        description: `Betaling ${invoice.number} - ${invoice.customer}`,
        amount: invoice.amount,
        vat: invoice.vat
      });
      saveBookkeeping();
      renderBookkeeping();
    }
  }
}

function renderInvoices() {
  if (!invoiceRows) {
    return;
  }
  const today = new Date().toISOString().slice(0, 10);
  invoiceRows.innerHTML = "";
  invoices.forEach((invoice) => {
    const overdue = invoice.status !== "paid" && dayDiff(invoice.dueDate, today) > 0;
    const statusLabel = overdue ? "overdue" : invoice.status;
    const row = document.createElement("tr");
    row.innerHTML = `<td>${invoice.number}</td>
      <td>${invoice.customer}</td>
      <td>${formatEur(invoice.amount)}</td>
      <td>${invoice.dueDate}</td>
      <td><span class="invoice-status ${statusLabel}">${statusLabel.toUpperCase()}</span></td>
      <td>
        <div class="invoice-actions">
          <button type="button" class="mini-btn" data-invoice-id="${invoice.id}" data-invoice-action="send">Verstuur</button>
          <button type="button" class="mini-btn" data-invoice-id="${invoice.id}" data-invoice-action="reminder">Herinner</button>
          <button type="button" class="mini-btn" data-invoice-id="${invoice.id}" data-invoice-action="pdf">Download PDF</button>
          <button type="button" class="mini-btn" data-invoice-id="${invoice.id}" data-invoice-action="template">Sjabloon</button>
          <button type="button" class="mini-btn" data-invoice-id="${invoice.id}" data-invoice-action="paid">Betaald</button>
        </div>
      </td>`;
    invoiceRows.appendChild(row);
  });
  refreshDashboard();
}

function runInvoiceAutomation(showStatus = true) {
  const today = new Date().toISOString().slice(0, 10);
  let reminders = 0;
  invoices.forEach((invoice) => {
    if (invoice.status === "paid") {
      return;
    }
    const daysLate = dayDiff(invoice.dueDate, today);
    if (daysLate > 0 && invoice.status !== "overdue") {
      invoice.status = "overdue";
    }
    const nextReminderMilestone = automationSettings.reminderDays[invoice.remindersSent] || null;
    if (invoice.status === "overdue" && nextReminderMilestone !== null && daysLate >= nextReminderMilestone) {
      invoice.remindersSent += 1;
      reminders += 1;
    }
  });
  saveInvoices();
  renderInvoices();
  if (showStatus && invoiceStatus) {
    invoiceStatus.textContent = reminders > 0 ? `${reminders} herinneringen klaar om te versturen.` : "Automatisering uitgevoerd.";
  }
}

function invoiceTemplateMarkup(invoice) {
  const vatAmount = (invoice.amount * invoice.vat) / 100;
  const totalIncl = invoice.amount + vatAmount;
  const statusLabel = invoice.status === "paid" ? "Betaald" : invoice.status === "overdue" ? "Achterstallig" : "Open";
  return `<article class="invoice-doc">
    <header class="invoice-doc-head">
      <div>
        <div class="invoice-doc-logo">MODELIQ</div>
        <div>AI Automation & Agents</div>
      </div>
      <div class="invoice-doc-meta">
        <div><strong>Factuur:</strong> ${invoice.number}</div>
        <div><strong>Datum:</strong> ${invoice.issueDate}</div>
        <div><strong>Vervaldatum:</strong> ${invoice.dueDate}</div>
        <div><strong>Status:</strong> ${statusLabel}</div>
      </div>
    </header>
    <section>
      <h3>Factuur aan</h3>
      <div><strong>${invoice.customer}</strong></div>
      <div>Referentie offerte: ${invoice.quoteNumber || "-"}</div>
    </section>
    <table class="invoice-doc-table">
      <thead>
        <tr>
          <th>Omschrijving</th>
          <th>Excl. btw</th>
          <th>BTW</th>
          <th>Totaal</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${invoice.title}</td>
          <td>${formatEur(invoice.amount)}</td>
          <td>${invoice.vat}% (${formatEur(vatAmount)})</td>
          <td>${formatEur(totalIncl)}</td>
        </tr>
      </tbody>
    </table>
    <div class="invoice-doc-total">
      <div><strong>Totaal excl. btw:</strong> ${formatEur(invoice.amount)}</div>
      <div><strong>Totaal incl. btw:</strong> ${formatEur(totalIncl)}</div>
    </div>
  </article>`;
}

function openInvoiceTemplate(invoice) {
  activeInvoiceTemplate = invoice;
  if (invoiceTemplateContent) {
    invoiceTemplateContent.innerHTML = invoiceTemplateMarkup(invoice);
  }
  invoiceTemplateModal?.classList.add("active");
  invoiceTemplateModal?.setAttribute("aria-hidden", "false");
}

function closeInvoiceTemplate() {
  invoiceTemplateModal?.classList.remove("active");
  invoiceTemplateModal?.setAttribute("aria-hidden", "true");
}

function printActiveInvoiceTemplate() {
  if (!activeInvoiceTemplate) {
    return;
  }
  const html = invoiceTemplateMarkup(activeInvoiceTemplate);
  const popup = window.open("", "_blank", "width=900,height=700");
  if (!popup) {
    return;
  }
  popup.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${activeInvoiceTemplate.number}</title><style>
    body{font-family:Segoe UI,Arial,sans-serif;background:#fff;color:#121826;margin:0;padding:24px}
    .invoice-doc-head{display:flex;justify-content:space-between;gap:16px;margin-bottom:16px}
    .invoice-doc-logo{font-weight:700;letter-spacing:.2em;font-size:18px;color:#1c2a68}
    .invoice-doc-meta{text-align:right;font-size:14px}
    .invoice-doc-table{width:100%;border-collapse:collapse;margin-top:12px}
    .invoice-doc-table th,.invoice-doc-table td{border-bottom:1px solid #d9dfec;padding:8px 6px;text-align:left;font-size:14px}
    .invoice-doc-total{margin-top:14px;text-align:right;font-size:14px}
  </style></head><body>${html}</body></html>`);
  popup.document.close();
  popup.focus();
  popup.print();
}

function addQuoteToBookkeeping(quote) {
  const existing = bookkeepingEntries.find((entry) => entry.quoteId === quote.id);
  if (existing) {
    return;
  }
  bookkeepingEntries.unshift({
    id: createId("book"),
    quoteId: quote.id,
    date: new Date().toISOString().slice(0, 10),
    type: "income",
    description: `Factuur ${quote.number} - ${quote.customer}`,
    amount: quote.amount,
    vat: quote.vat
  });
  saveBookkeeping();
  renderBookkeeping();
}

backBtn.addEventListener("click", closePortal);
leadBtn.addEventListener("click", () => {
  openLeadDock(visionWord.textContent.toLowerCase());
});
leadToggle.addEventListener("click", () => {
  openLeadDock();
});
leadClose.addEventListener("click", () => {
  leadDock.classList.remove("open");
});
aiHomeBtn.addEventListener("click", goHomeView);
openIntakeTop.addEventListener("click", () => {
  openLeadDock();
});
quickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const topic = button.dataset.topic;
    const match = words.find((item) => item.orbit === topic);
    if (match) {
      openPortal(match);
      openLeadDock(match.vision.toLowerCase());
    }
  });
});

if (!isCoarsePointer) {
  window.addEventListener("pointermove", (event) => {
    state.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
    state.targetY = (event.clientY / window.innerHeight - 0.5) * 2;
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && portal.classList.contains("active")) {
    closePortal();
    return;
  }
  if (event.key === "Escape" && invoiceTemplateModal?.classList.contains("active")) {
    closeInvoiceTemplate();
    return;
  }
  if (event.key === "Escape" && caseModal.classList.contains("active")) {
    closeCaseModal();
    return;
  }
  if (event.key === "Escape" && leadDock.classList.contains("open")) {
    leadDock.classList.remove("open");
  }
});

portal.addEventListener("click", (event) => {
  if (event.target === portal) {
    closePortal();
  }
});
caseClose.addEventListener("click", closeCaseModal);
caseModal.addEventListener("click", (event) => {
  if (event.target === caseModal) {
    closeCaseModal();
  }
});
openAdminBtn.addEventListener("click", async () => {
  if (getAdminApiToken()) {
    await restoreAdminSession();
    if (currentAuthUser?.role === "admin") {
      setAdminState(true);
      return;
    }
    openAdminModal();
    if (adminStatus) {
      adminStatus.textContent = "Je bent ingelogd als gebruiker. Alleen admin heeft toegang tot dit paneel.";
    }
    return;
  }
  openAdminModal();
});
adminCloseBtn.addEventListener("click", closeAdminModal);
adminLogoutBtn.addEventListener("click", () => {
  adminDock.classList.remove("open");
  document.body.classList.remove("admin-open");
  adminSaveStatus.textContent = "Paneel gesloten. Je blijft ingelogd.";
});
adminTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    switchAdminTab(tab.dataset.tab || "dashboard");
  });
});
adminModal.addEventListener("click", (event) => {
  if (event.target === adminModal) {
    closeAdminModal();
  }
});
agentToggle.addEventListener("click", () => {
  if (agentDock.classList.contains("open")) {
    closeAgent();
  } else {
    openAgent();
  }
});
agentClose.addEventListener("click", closeAgent);
if (agentForm) {
  agentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = String(agentInput.value || "").trim();
    if (!question) {
      return;
    }
    handleAgentQuestion(question);
    agentForm.reset();
  });
}

if (leadForm) {
  leadForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(leadForm);
    const name = String(data.get("name") || "").trim();
    const company = String(data.get("company") || "").trim();
    const email = String(data.get("email") || "").trim();
    const goal = String(data.get("goal") || "").trim();
    if (!name || !company || !email || !goal) {
      formStatus.textContent = "Vul alle velden in voor een complete aanvraag.";
      return;
    }

    try {
      await apiRequest("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, goal })
      });
      formStatus.textContent = "Bedankt! Je aanvraag is veilig opgeslagen.";
      leadForm.reset();
    } catch (error) {
      formStatus.textContent = error instanceof Error ? error.message : "Aanvraag opslaan mislukt.";
    }
  });
}

if (adminForm) {
  adminForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(adminForm);
    const email = String(data.get("adminEmail") || "").trim();
    const user = String(data.get("adminUser") || "").trim();
    const pass = String(data.get("adminPass") || "").trim();
    try {
      if (email && (!user || !pass)) {
        await loginAdminWithEmail(email);
      } else {
        await loginAdmin(user, pass);
      }
      setAdminState(true);
      adminStatus.textContent = "Succesvol ingelogd.";
      closeAdminModal();
      adminForm.reset();
      return;
    } catch (error) {
      adminStatus.textContent = error instanceof Error ? error.message : "Onjuiste login.";
    }
  });
}

if (adminEmailBtn) {
  adminEmailBtn.addEventListener("click", async () => {
    const email = String(adminEmailInput?.value || "").trim();
    if (!email) {
      adminStatus.textContent = "Vul je e-mailadres in.";
      return;
    }
    try {
      await loginAdminWithEmail(email);
      setAdminState(true);
      adminStatus.textContent = "Succesvol ingelogd met e-mail.";
      closeAdminModal();
      adminForm?.reset();
    } catch (error) {
      adminStatus.textContent = error instanceof Error ? error.message : "E-mail login mislukt.";
    }
  });
}

if (adminGoogleBtn) {
  adminGoogleBtn.addEventListener("click", async () => {
    try {
      await loginAdminWithGooglePopup();
      setAdminState(true);
      adminStatus.textContent = "Succesvol ingelogd met Google.";
      closeAdminModal();
    } catch (error) {
      adminStatus.textContent = error instanceof Error ? error.message : "Google login mislukt.";
    }
  });
}

if (adminSettingsForm) {
  adminSettingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const settings = {
      ctaText: String(adminCtaText.value || "").trim() || "Plan intake",
      contactEmail: String(adminMail.value || "").trim() || "hallo@modeliq.nl"
    };
    const token = String(adminApiTokenInput?.value || "").trim();
    if (token) {
      setAdminApiToken(token);
    }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    applySettings(settings);
    adminSaveStatus.textContent = "Instellingen en beveiliging opgeslagen.";
  });
}

if (bookkeepingForm) {
  bookkeepingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(bookkeepingForm);
    const date = String(data.get("bookDate") || "").trim();
    const type = String(data.get("bookType") || "").trim();
    const description = String(data.get("bookDescription") || "").trim();
    const amount = Number(data.get("bookAmount") || 0);
    const vat = Number(data.get("bookVat") || 0);

    if (!date || !description || amount <= 0 || vat < 0 || (type !== "income" && type !== "expense")) {
      bookStatus.textContent = "Controleer je invoer.";
      return;
    }

    bookkeepingEntries.unshift({
      id: createId("book"),
      date,
      type,
      description,
      amount,
      vat
    });
    saveBookkeeping();
    renderBookkeeping();
    bookkeepingForm.reset();
    const defaultVat = document.getElementById("bookVat");
    const defaultType = document.getElementById("bookType");
    if (defaultVat) {
      defaultVat.value = "21";
    }
    if (defaultType) {
      defaultType.value = "income";
    }
    bookStatus.textContent = "Boeking toegevoegd.";
  });
}

if (bookRows) {
  bookRows.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const entryId = target.getAttribute("data-entry-id");
    if (!target.classList.contains("book-delete") || entryId === null) {
      return;
    }
    bookkeepingEntries = bookkeepingEntries.filter((entry) => entry.id !== entryId);
    saveBookkeeping();
    renderBookkeeping();
    bookStatus.textContent = "Boeking verwijderd.";
  });
}

if (bookExportBtn) {
  bookExportBtn.addEventListener("click", () => {
    const header = "datum,type,omschrijving,bedrag_excl,btw_percentage\n";
    const body = bookkeepingEntries
      .map((entry) => `${entry.date},${entry.type},"${entry.description.replace(/"/g, '""')}",${entry.amount},${entry.vat}`)
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "modeliq-boekhouding.csv";
    link.click();
    URL.revokeObjectURL(url);
    bookStatus.textContent = "CSV geëxporteerd.";
  });
}

if (bankConnectForm) {
  toggleBankConnectRequirements();
  bankProviderInput?.addEventListener("change", toggleBankConnectRequirements);
  bankConnectForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(bankConnectForm);
    const provider = String(data.get("bankProvider") || "").trim();
    const iban = String(data.get("bankIban") || "").trim();
    const token = String(data.get("bankToken") || "").trim();
    if (!provider || (!iban && provider !== "gocardless")) {
      bankStatus.textContent = "Vul provider en IBAN in.";
      return;
    }
    if (provider === "gocardless") {
      const countryGuess = /^[A-Za-z]{2}/.test(iban) ? iban.slice(0, 2).toUpperCase() : "NL";
      try {
        const payload = await apiRequest("/api/bank/gocardless/link", {
          method: "POST",
          headers: getApiHeaders(),
          body: JSON.stringify({
            country: countryGuess,
            redirectUrl: window.location.href
          })
        });
        if (!payload.supported) {
          const examples = Array.isArray(payload.institutions) ? payload.institutions.map((item) => item.name).slice(0, 4).join(", ") : "";
          bankStatus.textContent = `${payload.message || "Revolut niet ondersteund in dit land."}${examples ? ` Beschikbaar: ${examples}` : ""}`;
          return;
        }
        const linkData = {
          provider: "gocardless",
          country: payload.country,
          institutionId: payload.institution?.id || "",
          institutionName: payload.institution?.name || "Revolut",
          requisitionId: payload.requisitionId,
          gocardlessStatus: "CR",
          linked: false,
          accounts: []
        };
        localStorage.setItem(BANK_LINK_KEY, JSON.stringify(linkData));
        bankStatus.textContent = `Consent gestart voor ${linkData.institutionName}. Rond af in het geopende PSD2-scherm.`;
        if (payload.link) {
          window.open(payload.link, "_blank", "noopener");
        }
      } catch (error) {
        bankStatus.textContent = error instanceof Error ? error.message : "PSD2 koppeling starten mislukt.";
      }
      return;
    }
    localStorage.setItem(
      BANK_LINK_KEY,
      JSON.stringify({
        provider,
        iban,
        tokenMasked: token ? "configured" : ""
      })
    );
    bankStatus.textContent = `Gekoppeld: ${provider} (${iban})`;
  });
}

if (bankImportForm) {
  bankImportForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = bankCsv?.files?.[0];
    if (!file) {
      bankImportStatus.textContent = "Kies eerst een CSV-bestand.";
      return;
    }

    const text = await file.text();
    let parsed = [];
    try {
      parsed = parseCsvTransactions(text);
    } catch (error) {
      bankImportStatus.textContent = error instanceof Error ? error.message : "CSV kon niet verwerkt worden.";
      return;
    }

    const valid = parsed.filter((item) => item.date && item.description && item.amount > 0);
    bookkeepingEntries = [...valid, ...bookkeepingEntries];

    valid.forEach((entry) => {
      const related = invoices.find((invoice) => {
        const matchNumber = entry.description.includes(invoice.number);
        const amountDelta = Math.abs(invoice.amount - entry.amount);
        return invoice.status !== "paid" && (matchNumber || amountDelta < 0.01);
      });
      if (related) {
        related.status = "paid";
        related.paidDate = entry.date;
      }
    });

    saveBookkeeping();
    renderBookkeeping();
    saveInvoices();
    renderInvoices();
    bankImportStatus.textContent = `${valid.length} transacties geïmporteerd en facturen gereconcilieerd.`;
    bankImportForm.reset();
  });
}

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(quoteForm);
    const customer = String(data.get("quoteCustomer") || "").trim();
    const title = String(data.get("quoteTitle") || "").trim();
    const amount = Number(data.get("quoteAmount") || 0);
    const vat = Number(data.get("quoteVat") || 0);

    if (!customer || !title || amount <= 0 || vat < 0) {
      quoteStatus.textContent = "Controleer de offertegegevens.";
      return;
    }

    const quoteNumber = `OFF-${new Date().getFullYear()}-${String(quotes.length + 1).padStart(3, "0")}`;
    quotes.unshift({
      id: createId("quote"),
      number: quoteNumber,
      customer,
      title,
      amount,
      vat,
      status: "draft"
    });
    saveQuotes();
    renderQuotes();
    quoteForm.reset();
    const quoteVatInput = document.getElementById("quoteVat");
    if (quoteVatInput) {
      quoteVatInput.value = "21";
    }
    quoteStatus.textContent = `Offerte ${quoteNumber} aangemaakt.`;
  });
}

if (quoteBoard) {
  quoteBoard.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const quoteId = target.getAttribute("data-quote-id");
    const action = target.getAttribute("data-action");
    if (!quoteId || !action) {
      return;
    }

    const quote = quotes.find((item) => item.id === quoteId);
    if (!quote) {
      return;
    }

    if (action === "send") {
      quote.status = "sent";
    } else if (action === "accept") {
      quote.status = "accepted";
    } else if (action === "invoice") {
      quote.status = "invoiced";
      const invoice = createInvoiceFromQuote(quote);
      if (invoiceStatus) {
        invoiceStatus.textContent = `Factuur ${invoice.number} aangemaakt vanuit ${quote.number}.`;
      }
    } else if (action === "draft") {
      quote.status = "draft";
    } else if (action === "cancel") {
      quotes = quotes.filter((item) => item.id !== quoteId);
    }

    saveQuotes();
    renderQuotes();
    quoteStatus.textContent = "Flow bijgewerkt.";
  });
}

if (invoiceRows) {
  invoiceRows.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const invoiceId = target.getAttribute("data-invoice-id");
    const action = target.getAttribute("data-invoice-action");
    if (!invoiceId || !action) {
      return;
    }
    const invoice = invoices.find((item) => item.id === invoiceId);
    if (!invoice) {
      return;
    }
    try {
      if (action === "send") {
        invoice.status = "sent";
        await mailInvoicePdf(invoice, "invoice");
      } else if (action === "reminder") {
        await mailInvoicePdf(invoice, "reminder");
        invoice.remindersSent += 1;
      } else if (action === "pdf") {
        const mode = await downloadInvoicePdf(invoice);
        if (invoiceStatus) {
          invoiceStatus.textContent =
            mode === "download"
              ? `PDF voor ${invoice.number} gedownload.`
              : `API URL ontbreekt: printdialoog geopend voor ${invoice.number}.`;
        }
      } else if (action === "template") {
        openInvoiceTemplate(invoice);
      } else if (action === "paid") {
        markInvoicePaid(invoice);
      }
      saveInvoices();
      renderInvoices();
      if (invoiceStatus && action !== "pdf") {
        invoiceStatus.textContent =
          action === "pdf" ? `PDF voor ${invoice.number} gedownload.` : `Factuur ${invoice.number} bijgewerkt.`;
      }
    } catch (error) {
      if (invoiceStatus) {
        invoiceStatus.textContent = error instanceof Error ? error.message : "Factuuractie mislukt.";
      }
    }
  });
}

if (invoiceRunAutomationBtn) {
  invoiceRunAutomationBtn.addEventListener("click", () => {
    runInvoiceAutomation(true);
  });
}

invoiceTemplateClose?.addEventListener("click", closeInvoiceTemplate);
invoiceTemplateModal?.addEventListener("click", (event) => {
  if (event.target === invoiceTemplateModal) {
    closeInvoiceTemplate();
  }
});
invoiceTemplatePrint?.addEventListener("click", printActiveInvoiceTemplate);

if (automationForm) {
  automationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const days = Number(autoDueDays?.value || 14);
    const reminders = String(autoReminderDays?.value || "3,7,14")
      .split(",")
      .map((item) => Number(item.trim()))
      .filter((value) => value > 0)
      .sort((a, b) => a - b);

    automationSettings = {
      dueDays: Math.max(1, Math.min(90, days)),
      reminderDays: reminders.length > 0 ? reminders : [3, 7, 14],
      autoBookOnPaid: !!autoBookOnPaid?.checked
    };
    saveAutomationSettings();
    if (automationStatus) {
      automationStatus.textContent = "Automatisering opgeslagen.";
    }
  });
}

if (mailApiForm) {
  mailApiForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveMailApiBase();
    if (mailStatus) {
      mailStatus.textContent = "Mail API URL opgeslagen.";
    }
  });
}

if (mailSendForm) {
  mailSendForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(mailSendForm);
    const to = String(data.get("mailTo") || "").trim();
    const subject = String(data.get("mailSubject") || "").trim();
    const text = String(data.get("mailBody") || "").trim();
    if (!to || !subject || !text) {
      if (mailStatus) {
        mailStatus.textContent = "Vul alle mailvelden in.";
      }
      return;
    }
    try {
      await sendMail({ to, subject, text });
      if (mailStatus) {
        mailStatus.textContent = "Mail succesvol verstuurd.";
      }
      mailSendForm.reset();
    } catch (error) {
      if (mailStatus) {
        mailStatus.textContent = error instanceof Error ? error.message : "Mail verzenden mislukt.";
      }
    }
  });
}

if (mailSyncBtn) {
  mailSyncBtn.addEventListener("click", async () => {
    try {
      await syncInbox();
      if (mailStatus) {
        mailStatus.textContent = `${inboxMessages.length} mails opgehaald.`;
      }
    } catch (error) {
      if (mailStatus) {
        mailStatus.textContent = error instanceof Error ? error.message : "Inbox ophalen mislukt.";
      }
    }
  });
}

if (vatPeriodYear) {
  vatPeriodYear.addEventListener("change", renderVatReport);
}
if (vatPeriodQuarter) {
  vatPeriodQuarter.addEventListener("change", renderVatReport);
}
if (vatCopyBtn) {
  vatCopyBtn.addEventListener("click", async () => {
    const text = [
      `BTW aangifte Q${vatPeriodQuarter?.value || ""} ${vatPeriodYear?.value || ""}`,
      `Omzet 21%: ${vatRevenue21?.value || ""}`,
      `Omzet 9%: ${vatRevenue9?.value || ""}`,
      `Omzet 0%: ${vatRevenue0?.value || ""}`,
      `BTW af te dragen: ${vatOutputTax?.value || ""}`,
      `Voorbelasting: ${vatInputTax?.value || ""}`,
      `Netto BTW: ${vatNetTax?.value || ""}`
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      vatReportSummary.textContent = "BTW samenvatting gekopieerd naar klembord.";
    } catch {
      vatReportSummary.textContent = text;
    }
  });
}

if (candidateForm) {
  candidateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(candidateForm);
    const name = String(data.get("candidateName") || "").trim();
    const role = String(data.get("candidateRole") || "").trim();
    const skills = String(data.get("candidateSkills") || "").trim();
    const years = Number(data.get("candidateYears") || 0);
    const domain = String(data.get("candidateDomain") || "general").trim();

    if (!name || !role || !skills || years < 0) {
      candidateStatus.textContent = "Vul alle kandidaatvelden correct in.";
      return;
    }

    const result = evaluateCandidateFit({ name, role, skills, years, domain });
    candidateFits.unshift(result);
    saveCandidates();
    renderCandidates();
    candidateStatus.textContent = `${result.name} beoordeeld met ${result.fitScore}% fit.`;
    candidateForm.reset();
    const domainInput = document.getElementById("candidateDomain");
    if (domainInput) {
      domainInput.value = "sales";
    }
  });
}

function animate(now) {
  state.time = now;
  state.mouseX += (state.targetX - state.mouseX) * 0.03;
  state.mouseY += (state.targetY - state.mouseY) * 0.03;

  const tiltX = state.mouseY * (isCoarsePointer ? 4 : 12);
  const tiltY = state.mouseX * (isCoarsePointer ? -5 : -14);
  space.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

  orbitalNodes.forEach((item, index) => {
    item.angle += item.speed;

    const pulse = Math.sin(state.time * 0.0012 + index) * item.wobble;
    const x = Math.cos(item.angle) * (item.radius + pulse);
    const y = Math.sin(item.angle * 1.25) * (item.radius * 0.35 + pulse);
    const z = Math.sin(item.angle * 0.7 + index) * item.depth;

    const perspective = 700;
    const scale = (perspective + z) / perspective;
    const alpha = Math.max(0.25, Math.min(1, scale));

    item.node.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
    item.node.style.opacity = `${alpha}`;
  });

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
renderPortfolioCards();

const settings = getStoredSettings();
if (settings) {
  applySettings(settings);
  adminCtaText.value = settings.ctaText || "";
  adminMail.value = settings.contactEmail || "";
}

async function initApp() {
  if (isFileOrigin()) {
    window.location.replace(`${DEFAULT_API_BASE}/`);
    return;
  }
  loadMailApiBase();
  loadAdminApiToken();
  loadCurrentAuthUser();
  await restoreAdminSession();
  await loadBookkeeping();
  loadAutomationSettings();
  await loadInvoices();
  loadQuotes();
  await loadBankLinkStatus();
  loadCandidates();
  runInvoiceAutomation(false);
  initClickEverywhere();
}
initApp();

const todayInput = document.getElementById("bookDate");
if (todayInput && !todayInput.value) {
  todayInput.value = new Date().toISOString().slice(0, 10);
}

if (vatPeriodYear && !vatPeriodYear.value) {
  vatPeriodYear.value = String(new Date().getFullYear());
}
if (vatPeriodQuarter && !vatPeriodQuarter.value) {
  vatPeriodQuarter.value = String(Math.ceil((new Date().getMonth() + 1) / 3));
}
renderVatReport();
