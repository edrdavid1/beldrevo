import { getLang, subscribe } from '../store';
import { translations } from '../data/translations';

// NotFound page stub
export function NotFound() {
  const lang = getLang();
  const t = translations[lang];
  return `
    <section class="notfound-page">
      <h1>${t.notfound.title}</h1>
      <a href="#/" class="notfound-page__btn">${t.notfound.to_home}</a>
    </section>
  `;
}

export function initNotFound() {
  subscribe(() => {
    const main = document.getElementById('app-main');
    if (main && location.hash.replace('#', '') !== '/' && 
        !location.hash.startsWith('#/products') && 
        !location.hash.startsWith('#/orders') && 
        !location.hash.startsWith('#/about') && 
        !location.hash.startsWith('#/product/')) {
      main.innerHTML = NotFound();
    }
  });
} 