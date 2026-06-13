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
      ? "Ixera | Recherche de dirigeants à Montréal et continuité managériale"
      : "Ixera | Executive search in Montréal and management continuity";
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      lang === "fr"
        ? "Conseils Ixera inc. est une firme de recherche de dirigeants basée à Montréal. Nous aidons les PDG, les conseils et les propriétaires à recruter les bons hauts dirigeants et à assurer la continuité managériale."
        : "Conseils Ixera inc. is a Montréal-based executive search firm. We help CEOs, boards and owners recruit the right senior executives and ensure management continuity."
    );
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute(
      "content",
      lang === "fr"
        ? "Ixera | Recherche de dirigeants à Montréal et continuité managériale"
        : "Ixera | Executive search in Montréal and management continuity"
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

function closeGate() {
  if (audienceGate) {
    audienceGate.classList.add("is-hidden");
  }
}

if (audienceGate) {
  audienceChoices.forEach((choice) => {
    choice.addEventListener("click", closeGate);
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
