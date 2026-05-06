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
  space.classList.add("zooming");

  orbitalNodes.forEach((item) => {
    item.node.style.transition = "transform 0.65s ease, opacity 0.65s ease";
    item.node.style.transform += " scale(2.8)";
    item.node.style.opacity = "0";
  });
}

function closePortal() {
  portal.classList.remove("active");
  space.classList.remove("zooming");

  orbitalNodes.forEach((item) => {
    item.node.style.opacity = "1";
  });
}

backBtn.addEventListener("click", closePortal);
leadBtn.addEventListener("click", () => {
  leadDock.classList.add("open");
  if (nameInput) {
    nameInput.focus();
  }
});
leadToggle.addEventListener("click", () => {
  leadDock.classList.add("open");
  if (nameInput) {
    nameInput.focus();
  }
});

window.addEventListener("pointermove", (event) => {
  state.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
  state.targetY = (event.clientY / window.innerHeight - 0.5) * 2;
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && portal.classList.contains("active")) {
    closePortal();
  }
});

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(leadForm);
    const name = String(data.get("name") || "").trim();
    const company = String(data.get("company") || "").trim();
    const email = String(data.get("email") || "").trim();
    const goal = String(data.get("goal") || "").trim();

    const subject = encodeURIComponent(`Nieuwe aanvraag - ${company}`);
    const body = encodeURIComponent(
      `Naam: ${name}\nBedrijf: ${company}\nE-mail: ${email}\n\nProjectvraag:\n${goal}`
    );
    window.location.href = `mailto:hallo@modeliq.nl?subject=${subject}&body=${body}`;
    formStatus.textContent = "Bedankt! Je mailclient is geopend voor verzending.";
    leadForm.reset();
  });
}

function animate(now) {
  state.time = now;
  state.mouseX += (state.targetX - state.mouseX) * 0.03;
  state.mouseY += (state.targetY - state.mouseY) * 0.03;

  const tiltX = state.mouseY * 12;
  const tiltY = state.mouseX * -14;
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

openPortal(words[0]);
