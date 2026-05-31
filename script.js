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
    ? 'Ixera | Continuité managériale'
    : 'Ixera | Management continuity';
}

btn.addEventListener('click', () => setLang(lang === 'fr' ? 'en' : 'fr'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
