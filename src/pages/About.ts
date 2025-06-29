import { getLang, subscribe } from '../store';
import { translations } from '../data/translations';

// About page stub
export function About() {
  const lang = getLang();
  const t = translations[lang];
  const bgImg = '/pagePhoto/aboutUs1.png';
  return `
    <nav class="breadcrumbs">
      <a href="#/">${t.breadcrumbs.home}</a> &rarr; <b>${t.breadcrumbs.about}</b>
    </nav>
    <section class="about-hero">
      <div class="about-hero__bg" style="background-image:url('${bgImg}')"></div>
      <div class="about-hero__content">
        <h1 class="about-hero__title">${t.about.title}</h1>
      </div>
    </section>
    <section class="about-block">
      <h2>${t.about.contacts}</h2>
      <table class="about-table">
        <tr><td>${t.about.contact_person}</td><td>Марат</td></tr>
        <tr><td>${t.about.address}</td><td>Минский р-н , п.Ратомка ул.Корицкого 99, Минск, Беларусь <a href="https://www.google.com/maps?q=53.93335,27.34780" target="_blank" rel="noopener" title="Открыть в Google Maps">📍</a></td></tr>
        <tr><td>${t.about.phone}</td><td>+375 (29) 670-81-41 &nbsp; +375 (29) 685-11-85</td></tr>
      </table>
    </section>
    <section class="about-block">
      <h2>${t.about.schedule}</h2>
      <table class="about-table">
        <tr><th>${t.about.day}</th><th>${t.about.time}</th></tr>
        ${t.about.days.map((d: string, i: number) => `<tr><td>${d}</td><td>${i === 6 ? t.about.weekend : '09:30-19:30'}</td></tr>`).join('')}
      </table>
    </section>
    <section class="about-block">
      <h2>${t.about.about_title}</h2>
      <p>${t.about.about_text}</p>
    </section>
  `;
}

export function initAbout() {
  subscribe(() => {
    const main = document.getElementById('app-main');
    if (main && location.hash.replace('#', '') === '/about') {
      main.innerHTML = About();
    }
  });
} 