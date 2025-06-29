import { getLang } from '../store';
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