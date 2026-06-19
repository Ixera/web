// Toujours revenir en haut de la page au chargement
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

const btn = document.getElementById("langToggle");
const gateBtn = document.getElementById("gateLangToggle");

function getInitialLang() {
  const savedLanguage = localStorage.getItem("ixera-language");
  const browserLanguage = navigator.language || navigator.userLanguage || "fr";
  if (savedLanguage) {
    return savedLanguage;
  }
  return browserLanguage.toLowerCase().startsWith("fr") ? "fr" : "en";
}

function setLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-fr]").forEach((el) => {
    el.textContent = el.dataset[lang];
  });
  if (btn) {
    btn.textContent = lang === "fr" ? "EN" : "FR";
  }
  if (gateBtn) {
    gateBtn.textContent = lang === "fr" ? "EN" : "FR";
  }
  document.title =
    lang === "fr"
      ? "Ixera | Continuité managériale"
      : "Ixera | Management continuity";
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      lang === "fr"
        ? "Conseils Ixera inc. est une firme de recherche de dirigeants et de cadres basée à Montréal. Recherche de dirigeants, planification de la relève, revue du risque de leadership et continuité managériale pour PDG, conseils d'administration et propriétaires dirigeants."
        : "Conseils Ixera inc. is a Montréal-based executive and senior management search firm. Executive search, succession planning, leadership risk review and management continuity for CEOs, boards and owner-operators."
    );
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute(
      "content",
      lang === "fr"
        ? "Ixera | Continuité managériale"
        : "Ixera | Management continuity"
    );
  }
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute(
      "content",
      lang === "fr"
        ? "Recruter les bons dirigeants. Réduire le risque de leadership. Préparer les décisions avant l’urgence."
        : "Recruit the right executives. Reduce leadership risk. Prepare decisions before urgency."
    );
  }
  localStorage.setItem("ixera-language", lang);
}

setLang(getInitialLang());

if (btn) {
  btn.addEventListener("click", () => {
    const currentLang = document.documentElement.lang === "fr" ? "en" : "fr";
    setLang(currentLang);
  });
}

if (gateBtn) {
  gateBtn.addEventListener("click", () => {
    const currentLang = document.documentElement.lang === "fr" ? "en" : "fr";
    setLang(currentLang);
  });
}

document.querySelectorAll(".hero-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const panelId = toggle.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".hero-toggle").forEach((item) => {
      item.setAttribute("aria-expanded", "false");
    });
    document.querySelectorAll(".hero-panel").forEach((item) => {
      item.hidden = true;
    });
    if (!isOpen && panel) {
      toggle.setAttribute("aria-expanded", "true");
      panel.hidden = false;
    }
  });
});

document.querySelectorAll(".approach-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const item = toggle.closest(".approach-step");
    const detail = item.querySelector(".approach-detail");
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    detail.hidden = isOpen;
  });
});

const audienceGate = document.getElementById("audienceGate");
const audienceChoices = document.querySelectorAll(".audience-choice");

// Variantes du hero selon le rôle choisi (FR + EN)
const heroVariants = {
  pdg: {
    titleFr: "Votre meilleur dirigeant est votre plus grand risque.",
    titleEn: "Your best executive is your biggest risk.",
    leadFr: "Quand un poste clé repose sur une seule personne, votre stratégie devient fragile. Ixera réduit ce risque.",
    leadEn: "When a key position rests on one person, your strategy becomes fragile. Ixera reduces that risk."
  },
  ca: {
    titleFr: "La relève de votre équipe de direction ne devrait jamais vous surprendre.",
    titleEn: "The succession of your leadership team should never catch you off guard.",
    leadFr: "La gouvernance doit assurer la continuité du leadership. Ixera procure une lecture indépendante du risque et de la relève, avant l’urgence.",
    leadEn: "Governance must ensure leadership continuity. Ixera provides an independent reading of risk and succession, before urgency strikes."
  },
  invest: {
    titleFr: "La profondeur de gestion détermine la valeur de votre entreprise.",
    titleEn: "Management depth determines the value of your company.",
    leadFr: "Une solide équipe de direction protège votre valeur à l’entrée et maximise votre multiple à la sortie. Ixera la bâtit avec vous.",
    leadEn: "A strong leadership team protects your value at entry and maximizes your multiple at exit. Ixera builds it with you."
  }
};

function applyRole(role) {
  const v = heroVariants[role] || heroVariants.pdg;
  const heroTitle = document.getElementById("heroTitle");
  const heroLead = document.getElementById("heroLead");
  if (heroTitle) {
    heroTitle.dataset.fr = v.titleFr;
    heroTitle.dataset.en = v.titleEn;
  }
  if (heroLead) {
    heroLead.dataset.fr = v.leadFr;
    heroLead.dataset.en = v.leadEn;
  }
  // Réafficher dans la langue courante
  setLang(document.documentElement.lang === "en" ? "en" : "fr");
}

function closeGate() {
  if (audienceGate) {
    audienceGate.classList.add("is-hidden");
  }
}

if (audienceGate) {
  audienceChoices.forEach((choice) => {
    choice.addEventListener("click", () => {
      const role = choice.getAttribute("data-role");
      if (role) {
        applyRole(role);
      }
      closeGate();
    });
  });

  // Fermeture au clavier (Échap) pour l'accessibilité
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !audienceGate.classList.contains("is-hidden")) {
      closeGate();
    }
  });
}

const distinctionOpen = document.getElementById("distinctionOpen");
const distinctionClose = document.getElementById("distinctionClose");
const distinctionOverlay = document.getElementById("distinctionOverlay");

if (distinctionOpen && distinctionOverlay) {
  distinctionOpen.addEventListener("click", () => {
    distinctionOverlay.hidden = false;
    document.body.style.overflow = "hidden";
  });

  function closeDistinction() {
    distinctionOverlay.hidden = true;
    document.body.style.overflow = "";
  }

  if (distinctionClose) {
    distinctionClose.addEventListener("click", closeDistinction);
  }

  distinctionOverlay.addEventListener("click", (e) => {
    if (e.target === distinctionOverlay) {
      closeDistinction();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !distinctionOverlay.hidden) {
      closeDistinction();
    }
  });
}
// ===== COMPTE À REBOURS — à ajouter à la fin de script.js =====
(function () {
  const el = document.getElementById("countdown");
  if (!el) return;
  const deadline = new Date(el.dataset.deadline).getTime();

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const diff = deadline - Date.now();
    if (diff <= 0) {
      el.querySelectorAll("[data-cd]").forEach((n) => (n.textContent = "00"));
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    el.querySelector('[data-cd="days"]').textContent = days;
    el.querySelector('[data-cd="hours"]').textContent = pad(hours);
    el.querySelector('[data-cd="minutes"]').textContent = pad(mins);
    el.querySelector('[data-cd="seconds"]').textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();
