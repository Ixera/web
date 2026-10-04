// Toujours revenir en haut de la page au chargement
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

const btn = document.getElementById("langToggle");

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
  if (typeof sizeAboutPortrait === "function") sizeAboutPortrait();
  if (typeof reserveHeroHeight === "function") reserveHeroHeight();
}

setLang(getInitialLang());

// À propos : la photo (entière, proportions intactes) prend la hauteur du bloc de texte
function sizeAboutPortrait() {
  const copy = document.querySelector(".about-copy");
  const img = document.querySelector(".about-portrait");
  const founder = document.querySelector(".about-founder");
  if (!copy || !img || !founder) return;
  if (window.matchMedia("(max-width:980px)").matches) {
    img.style.height = "";
    founder.style.width = "";
    return;
  }
  // Du haut du premier paragraphe au bas du dernier (le bouton est exclu)
  const paras = copy.querySelectorAll("p");
  if (!paras.length) return;
  const top = paras[0].getBoundingClientRect().top;
  const bottom = paras[paras.length - 1].getBoundingClientRect().bottom;
  const h = Math.round(bottom - top);
  img.style.height = h + "px";
  // La légende (nom, titre) ne dépasse jamais la largeur de la photo
  const name = founder.querySelector(".about-founder-name");
  if (img.naturalWidth && img.naturalHeight) {
    const w = Math.round(h * img.naturalWidth / img.naturalHeight);
    founder.style.width = w + "px";
    // Le nom reste sur une ligne : on réduit sa taille juste assez pour tenir dans la photo
    if (name) {
      name.style.fontSize = "";
      const needed = name.scrollWidth;
      if (needed > w) {
        const fs = parseFloat(getComputedStyle(name).fontSize);
        name.style.fontSize = Math.max(10, Math.floor(fs * (w - 2) / needed * 10) / 10) + "px";
      }
    }
  } else {
    founder.style.width = "";
    if (name) name.style.fontSize = "";
  }
}
window.addEventListener("load", sizeAboutPortrait);
window.addEventListener("resize", sizeAboutPortrait);
(function () {
  const img = document.querySelector(".about-portrait");
  if (img) img.addEventListener("load", sizeAboutPortrait);
})();
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(sizeAboutPortrait);
}

if (btn) {
  btn.addEventListener("click", () => {
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

// Variantes du hero selon le rôle choisi (FR + EN)
// Direction & Gouvernance alterne entre deux messages (fondu, 5 s chacun).
// Investisseurs & Fonds affiche un seul message fixe.
var heroVariants = {
  pdg: {
    messages: [
      {
        titleFr: "Avez-vous\nles bonnes personnes\naux bons postes\nde direction?",
        titleEn: "Do you have\nthe right people\nin the right\nleadership roles?",
        leadFr: "Nous relions votre stratégie, votre équipe et le marché des dirigeants pour bâtir l’équipe qu’il vous faut.",
        leadEn: "We connect your strategy, your team and the executive market to build and reinforce the team you need."
      },
      {
        titleFr: "Comment gérez-vous\nle risque de perdre\nun membre de votre\néquipe de direction?",
        titleEn: "How do you manage\nthe risk of losing\na member of your\nleadership team?",
        leadFr: "Nous suivons vos postes clés, la relève et le marché des dirigeants pour préparer vos options avant l’urgence.",
        leadEn: "We track your key positions, succession and the executive market to prepare your options before urgency strikes."
      }
    ]
  },
  invest: {
    messages: [
      {
        titleFr: "Le plan d’investissement\nest solide.\nL’équipe de direction\nl’est-elle autant?",
        titleEn: "The investment plan\nis solid.\nIs the leadership team\njust as strong?",
        leadFr: "Nous contrôlons votre risque managérial,\nde l’entrée à la sortie.",
        leadEn: "We manage your leadership risk,\nfrom entry to exit."
      }
    ]
  }
};

const HERO_ROTATE_MS = 10000;  // durée d’affichage de chaque message
const HERO_FADE_MS = 450;      // durée du fondu (doit suivre styles.css)
var heroTimer = null;
var heroIndex = 0;
var heroRole = "pdg";

function heroEls() {
  return {
    title: document.getElementById("heroTitle"),
    lead: document.getElementById("heroLead")
  };
}

// Écrit un message dans les attributs data-fr / data-en, puis réaffiche dans la langue courante
function writeHeroMessage(m) {
  const { title, lead } = heroEls();
  if (title) { title.dataset.fr = m.titleFr; title.dataset.en = m.titleEn; }
  if (lead) { lead.dataset.fr = m.leadFr; lead.dataset.en = m.leadEn; }
  setLang(document.documentElement.lang === "en" ? "en" : "fr");
}

// Réserve, sur la colonne de texte, la hauteur du plus long message du profil:
// le titre et le sous-titre coulent naturellement, mais la carte noire et la mise en page ne bougent pas.
function reserveHeroHeight() {
  if (typeof heroVariants === "undefined") return;
  const { title, lead } = heroEls();
  if (!title || !lead) return;
  const col = title.closest(".hero-copy") || title.parentElement;
  if (!col) return;
  const v = heroVariants[heroRole] || heroVariants.pdg;
  col.style.minHeight = "";
  if (v.messages.length < 2) return;
  const lang = document.documentElement.lang === "en" ? "en" : "fr";
  const keepT = title.textContent, keepL = lead.textContent;
  let max = 0;
  v.messages.forEach((m) => {
    title.textContent = lang === "en" ? m.titleEn : m.titleFr;
    lead.textContent = lang === "en" ? m.leadEn : m.leadFr;
    max = Math.max(max, col.offsetHeight);
  });
  title.textContent = keepT;
  lead.textContent = keepL;
  col.style.minHeight = max + "px";
}

function stopHeroRotation() {
  if (heroTimer) { clearTimeout(heroTimer); heroTimer = null; }
  const { title, lead } = heroEls();
  if (title) title.classList.remove("is-fading");
  if (lead) lead.classList.remove("is-fading");
}

function scheduleHeroRotation() {
  const v = heroVariants[heroRole];
  if (!v || v.messages.length < 2) return;
  heroTimer = setTimeout(() => {
    const { title, lead } = heroEls();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const next = () => {
      heroIndex = (heroIndex + 1) % v.messages.length;
      writeHeroMessage(v.messages[heroIndex]);
      if (title) title.classList.remove("is-fading");
      if (lead) lead.classList.remove("is-fading");
      scheduleHeroRotation();
    };
    if (reduce || !title || !lead) { next(); return; }
    title.classList.add("is-fading");
    lead.classList.add("is-fading");
    heroTimer = setTimeout(next, HERO_FADE_MS);
  }, HERO_ROTATE_MS);
}

// Textes qui varient selon le profil ailleurs dans la page (carte noire, Services).
// Chaque élément porte data-fr-pdg / data-en-pdg et data-fr-invest / data-en-invest.
function applyRoleVariants(role) {
  document.querySelectorAll("[data-fr-pdg]").forEach((el) => {
    let fr = el.getAttribute("data-fr-" + role);
    let en = el.getAttribute("data-en-" + role);
    if (fr === null) fr = el.getAttribute("data-fr-pdg");
    if (en === null) en = el.getAttribute("data-en-pdg");
    if (fr !== null) el.setAttribute("data-fr", fr);
    if (en !== null) el.setAttribute("data-en", en);
  });
}

function applyRole(role) {
  stopHeroRotation();
  heroRole = role in heroVariants ? role : "pdg";
  heroIndex = 0;
  const v = heroVariants[heroRole];
  applyRoleVariants(heroRole);
  writeHeroMessage(v.messages[0]);
  reserveHeroHeight();
  scheduleHeroRotation();
}

// Au chargement: message 1 du profil Direction & Gouvernance, puis alternance
window.addEventListener("load", () => {
  reserveHeroHeight();
  scheduleHeroRotation();
});
window.addEventListener("resize", reserveHeroHeight);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(reserveHeroHeight);

// Onglets de profil du hero
const roleTabs = document.querySelectorAll(".hero-role");

function setActiveTab(role) {
  roleTabs.forEach((tab) => {
    const active = tab.getAttribute("data-role") === role;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-pressed", String(active));
  });
}

roleTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const role = tab.getAttribute("data-role");
    if (role) {
      applyRole(role);
      setActiveTab(role);
      localStorage.setItem("ixera-role", role);
    }
  });
});

// Au chargement, le hero affiche toujours le profil Conseil d'administration.
// Le choix cliqué reste mémorisé uniquement pour préremplir le formulaire de contact.

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

  const roleMap = {
    pdg: "PDG | Direction générale",
    invest: "Investisseur"
  };

  function openContact() {
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    // Reprendre le profil actif sur la page (l'onglet sélectionné du hero)
    const activeTab = document.querySelector(".hero-role.is-active");
    const role = activeTab
      ? activeTab.getAttribute("data-role")
      : localStorage.getItem("ixera-role");
    const roleSelect = form.querySelector('select[name="role"]');
    if (role && roleSelect) {
      const mapped = roleMap[role];
      if (mapped) roleSelect.value = mapped;
    }
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
      error: { fr: "Une erreur est survenue. Réessayez ou écrivez à jf.lavigne@ixera.ca.", en: "Something went wrong. Try again or email jf.lavigne@ixera.ca." },
      badEmail: { fr: "Veuillez entrer une adresse courriel valide (exemple : nom@domaine.com).", en: "Please enter a valid email address (example: name@domain.com)." }
    };
    return t[key][lang];
  }

  const emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailField = form.querySelector('input[name="email"]');
    if (emailField && !emailRe.test(emailField.value.trim())) {
      status.hidden = false;
      status.className = "contact-status is-error";
      status.textContent = msg("badEmail");
      emailField.focus();
      return;
    }

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

// ===== ALIGNEMENT DU DESCRIPTIF (deux lignes de meme largeur, quelle que soit la police) =====
(function () {
  function fitBrandDesc() {
    var t = document.querySelector(".brand-desc .bd-top");
    var b = document.querySelector(".brand-desc .bd-bot");
    if (!t || !b) return;
    t.style.letterSpacing = "";
    b.style.letterSpacing = "";
    var tw = t.getBoundingClientRect().width;
    var bw = b.getBoundingClientRect().width;
    if (tw > bw) {
      var n = b.textContent.trim().length - 1;
      if (n > 0) b.style.letterSpacing = ((tw - bw) / n) + "px";
    } else if (bw > tw) {
      var m = t.textContent.trim().length - 1;
      if (m > 0) t.style.letterSpacing = ((bw - tw) / m) + "px";
    }
  }
  window.addEventListener("load", fitBrandDesc);
  window.addEventListener("resize", fitBrandDesc);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitBrandDesc);
  var lt = document.getElementById("langToggle");
  if (lt) lt.addEventListener("click", function () { setTimeout(fitBrandDesc, 40); });
  fitBrandDesc();
})();
