const btn = document.getElementById("langToggle");

function setLang(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-fr]").forEach((el) => {
    el.textContent = el.dataset[lang];
  });

  btn.textContent = lang === "fr" ? "EN" : "FR";

  document.title =
    lang === "fr"
      ? "Ixera | Continuité managériale"
      : "Ixera | Management continuity";

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
