const btn = document.getElementById('langToggle');
let lang = 'fr';

function setLang(next) {
  lang = next;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-fr]').forEach((el) => {
    el.textContent = el.dataset[lang];
  });
  btn.textContent = lang === 'fr' ? 'EN' : 'FR';
  document.title = lang === 'fr'
    ? 'Conseils ixera | Continuité managériale'
    : 'Conseils ixera | Management continuity';
}

btn.addEventListener('click', () => setLang(lang === 'fr' ? 'en' : 'fr'));
