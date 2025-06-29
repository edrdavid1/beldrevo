import { getLang, subscribe } from '../store';
import { translations } from '../data/translations';

// Footer component stub
export function Footer() {
  const lang = getLang();
  const t = translations[lang].footer;
  return `
    <footer class="footer">
      <div class="footer__content">
        <div class="footer__buyer">
          <h3>${t.info_title}</h3>
          <p>${t.info}</p>
        </div>
        <div class="footer__contacts">
          <h3>${t.contacts_title}</h3>
          <p><b>${t.phone1}</b><br>${t.phone1_note}</p>
          <p><b>${t.phone2}</b></p>
        </div>

      </div>
      <div class="footer__copyright">${t.copyright}</div>
    </footer>
  `;
}

export function initFooter() {
  subscribe(() => {
    const footer = document.querySelector('.footer');
    if (footer) {
      footer.outerHTML = Footer();
    }
  });
} 