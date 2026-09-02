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

const phoneReveal = document.querySelector('.phone-reveal');
if (phoneReveal) {
  phoneReveal.addEventListener('click', () => {
    phoneReveal.querySelector('b').textContent = '(262) 420-8240';
    phoneReveal.setAttribute('aria-expanded', 'true');
    phoneReveal.classList.add('revealed');
    phoneReveal.addEventListener('click', () => { window.location.href = 'tel:+12624208240'; }, { once: true });
  }, { once: true });
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    if (contactForm.querySelector('[name="_honey"]').value) {
      event.preventDefault();
      return;
    }
    const mailbox = atob('bWF0dEBzdHJ1Y3RzdXJlLmFwcA==');
    contactForm.action = `https://formsubmit.co/${mailbox}`;
  });
}
