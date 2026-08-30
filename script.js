const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const comparison = document.querySelector('.phone-comparison');
const comparisonRange = document.querySelector('.comparison-range');
const revisionButtons = document.querySelectorAll('[data-revision-view]');

function setRevisionComparison(value) {
  if (!comparison || !comparisonRange) return;
  comparison.style.setProperty('--comparison', `${value}%`);
  comparisonRange.value = value;
  revisionButtons.forEach(button => {
    const selected = (button.dataset.revisionView === 'current' && Number(value) === 100)
      || (button.dataset.revisionView === 'outdated' && Number(value) === 0);
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

if (comparisonRange) {
  comparisonRange.addEventListener('input', event => setRevisionComparison(event.target.value));
}

revisionButtons.forEach(button => button.addEventListener('click', () => {
  setRevisionComparison(button.dataset.revisionView === 'current' ? 100 : 0);
}));
