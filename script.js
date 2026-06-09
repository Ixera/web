const btn = document.getElementById("langToggle");

function setLang(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-fr]").forEach((el) => {
    el.textContent = el.dataset[lang];
  });

  btn.textContent = lang === "fr" ? "EN" : "FR";

  document.title =
    lang === "fr"
? "Ixera | Stratégie, leadership et relève"
: "Ixera | Strategy, leadership and succession";

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      lang === "fr"
? "Ixera aide les organisations à bâtir les bonnes équipes de direction en reliant la stratégie, le management et le marché des talents."
: "Ixera helps organizations build the right leadership teams by connecting strategy, management and the executive talent market."
    );
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
if (ogTitle) {
  ogTitle.setAttribute(
    "content",
    lang === "fr"
      ? "Ixera | Stratégie, leadership et relève"
      : "Ixera | Strategy, leadership and succession"
  );
}

const ogDescription = document.querySelector('meta[property="og:description"]');
if (ogDescription) {
  ogDescription.setAttribute(
    "content",
    lang === "fr"
      ? "Bâtir les bonnes équipes de direction avant que l’urgence ne dicte les choix."
      : "Building the right leadership teams before urgency drives the decision."
  );
}

  localStorage.setItem("ixera-language", lang);
}

const savedLanguage = localStorage.getItem("ixera-language");
const browserLanguage = navigator.language || navigator.userLanguage || "fr";

if (savedLanguage) {
  setLang(savedLanguage);
} else if (browserLanguage.toLowerCase().startsWith("fr")) {
  setLang("fr");
} else {
  setLang("en");
}

btn.addEventListener("click", () => {
  const currentLang = document.documentElement.lang === "fr" ? "en" : "fr";
  setLang(currentLang);
});
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

   if (!isOpen) {
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

if (audienceGate) {
  audienceChoices.forEach((choice) => {
    choice.addEventListener("click", () => {
      audienceGate.classList.add("is-hidden");
    });
  });
}
