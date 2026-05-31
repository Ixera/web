const btn = document.getElementById('langToggle');
let lang = 'fr';

function setLang(next) {
  lang = next;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-fr]').forEach((el) => {
    const value = el.dataset[lang];
    if (value) el.textContent = value;
  });
  btn.textContent = lang === 'fr' ? 'EN' : 'FR';
  document.title = lang === 'fr'
    ? 'conseils ixera | Continuité managériale'
    : 'conseils ixera | Management continuity';
}

btn.addEventListener('click', () => setLang(lang === 'fr' ? 'en' : 'fr'));
