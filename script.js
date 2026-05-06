const words = [
  { orbit: "impact", vision: "impact" },
  { orbit: "intelligence", vision: "inzicht" },
  { orbit: "velocity", vision: "versnelling" },
  { orbit: "automation", vision: "automatisering" },
  { orbit: "clarity", vision: "helderheid" },
  { orbit: "trust", vision: "vertrouwen" },
  { orbit: "focus", vision: "focus" },
  { orbit: "agents", vision: "agents" },
  { orbit: "growth", vision: "groei" },
  { orbit: "future", vision: "toekomst" },
  { orbit: "signal", vision: "signaal" },
  { orbit: "models", vision: "modellen" }
];

const space = document.getElementById("space");
const wordLayer = document.getElementById("wordLayer");
const portal = document.getElementById("portal");
const visionWord = document.getElementById("visionWord");
const backBtn = document.getElementById("backBtn");

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
  node.setAttribute("aria-label", `Open visie: ${item.vision}`);
  node.style.fontSize = `${0.8 + (index % 3) * 0.28}rem`;
  node.style.background = "transparent";
  node.style.border = "0";
  node.style.padding = "0.2rem";
  node.style.font = "inherit";
  node.style.color = "inherit";

  node.addEventListener("click", () => openPortal(item.vision));
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

function openPortal(visionText) {
  visionWord.textContent = visionText;
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

window.addEventListener("pointermove", (event) => {
  state.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
  state.targetY = (event.clientY / window.innerHeight - 0.5) * 2;
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && portal.classList.contains("active")) {
    closePortal();
  }
});

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
