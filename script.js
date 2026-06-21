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
      : "Ixera | Leadership continuity";
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      lang === "fr"
        ? "Conseils Ixera inc. est une firme de recherche de dirigeants et de cadres basée à Montréal. Recherche de dirigeants, planification de la relève, revue du risque managérial et continuité managériale pour PDG, conseils d'administration et propriétaires dirigeants."
        : "Conseils Ixera inc. is a Montréal-based executive and senior management search firm. Executive search, succession planning, leadership risk review and leadership continuity for CEOs, boards and owner-operators."
    );
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute(
      "content",
      lang === "fr"
        ? "Ixera | Continuité managériale"
        : "Ixera | Leadership continuity"
    );
  }
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute(
      "content",
      lang === "fr"
        ? "Recruter les bons dirigeants. Réduire le risque managérial. Préparer les décisions avant l’urgence."
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
    titleFr: "La relève de votre équipe de direction ne devrait jamais être une surprise.",
    titleEn: "The succession of your leadership team should never catch you off guard.",
    leadFr: "La gouvernance doit assurer la continuité managériale. Ixera procure une lecture indépendante du risque et de la relève, avant l’urgence.",
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

function openGate() {
  if (audienceGate) {
    audienceGate.classList.remove("is-hidden");
    window.scrollTo(0, 0);
  }
}

const brandLogo = document.getElementById("brandLogo");
if (brandLogo) {
  brandLogo.addEventListener("click", (e) => {
    e.preventDefault();
    openGate();
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

// ===== POP-UP MISSION ET VISION =====
const mvOverlay = document.getElementById("mvOverlay");
const mvClose = document.getElementById("mvClose");
const mvOpen = document.getElementById("mvOpen");

if (mvOverlay) {
  function openMv() {
    mvOverlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeMv() {
    mvOverlay.hidden = true;
    document.body.style.overflow = "";
  }

  if (mvOpen) {
    mvOpen.addEventListener("click", openMv);
  }
  if (mvClose) {
    mvClose.addEventListener("click", closeMv);
  }

  mvOverlay.addEventListener("click", (e) => {
    if (e.target === mvOverlay) {
      closeMv();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !mvOverlay.hidden) {
      closeMv();
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

// ===== APPARITIONS AU DÉFILEMENT =====
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const targets = document.querySelectorAll(
    ".section, .formed-by, .hero-copy, .stat-section, .value-stat-section"
  );

  if (prefersReduced || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  targets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
})();

// ===== LIEN DE MENU ACTIF SELON LA SECTION VISIBLE =====
(function () {
  const navLinks = Array.from(
    document.querySelectorAll('.nav-links a[href^="#"]')
  );
  if (!navLinks.length) return;

  const entries = [];
  navLinks.forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    const section = document.getElementById(id);
    if (section) entries.push({ link, section });
  });
  if (!entries.length) return;

  function setActive() {
    const marker = window.innerHeight * 0.35;
    let current = null;
    entries.forEach((e) => {
      const top = e.section.getBoundingClientRect().top;
      if (top <= marker) current = e;
    });

    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;
    if (atBottom) {
      current = entries[entries.length - 1];
    }

    navLinks.forEach((l) => l.classList.remove("is-active"));
    if (current) current.link.classList.add("is-active");
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setActive();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  setActive();
})();

// ===== FENÊTRE FORMULAIRE CONTACT =====
(function () {
  const overlay = document.getElementById("contactOverlay");
  const closeBtn = document.getElementById("contactClose");
  const openBtns = document.querySelectorAll(".contact-open");
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");
  if (!overlay || !form) return;

  function openContact() {
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeContact() {
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  openBtns.forEach((b) => b.addEventListener("click", openContact));
  if (closeBtn) closeBtn.addEventListener("click", closeContact);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeContact();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) closeContact();
  });

  function msg(key) {
    const lang = document.documentElement.lang === "en" ? "en" : "fr";
    const t = {
      sending: { fr: "Envoi en cours…", en: "Sending…" },
      ok: { fr: "Merci. Votre message est envoyé, on vous revient rapidement.", en: "Thank you. Your message was sent, we’ll get back to you quickly." },
      error: { fr: "Une erreur est survenue. Réessayez ou écrivez à jf.lavigne@ixera.ca.", en: "Something went wrong. Try again or email jf.lavigne@ixera.ca." }
    };
    return t[key][lang];
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.hidden = false;
    status.className = "contact-status";
    status.textContent = msg("sending");

    try {
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });
      const json = await res.json();
      if (json.success) {
        status.classList.add("is-ok");
        status.textContent = msg("ok");
        form.reset();
        setTimeout(closeContact, 2200);
      } else {
        status.classList.add("is-error");
        status.textContent = msg("error");
      }
    } catch (err) {
      status.classList.add("is-error");
      status.textContent = msg("error");
    }
  });
})();
