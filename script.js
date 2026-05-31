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
        ? "Ixera aide les propriétaires, dirigeants et conseils à relier la stratégie, le leadership et la capacité d'exécution."
        : "Ixera helps owners, executives and boards connect strategy, leadership and execution capability."
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
