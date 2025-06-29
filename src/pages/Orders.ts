import { getLang, subscribe } from '../store';
import { translations } from '../data/translations';

// Orders page stub
export function Orders() {
  const lang = getLang();
  const t = translations[lang];
  const bgImg = '/pagePhoto/order1.png';
  return `
    <nav class="breadcrumbs">
      <a href="#/">${t.breadcrumbs.home}</a> &rarr; <b>${t.breadcrumbs.orders}</b>
    </nav>
    <section class="orders-hero">
      <div class="orders-hero__bg" style="background-image:url('${bgImg}')"></div>
      <div class="orders-hero__content">
        <h1 class="orders-hero__title">${t.orders.title}</h1>
      </div>
    </section>
    <section class="orders-block">
      <div class="orders-block__inner">
        <h2>${t.orders.delivery_methods}</h2>
        <table class="orders-table">
          <tr><td>${t.orders.pickup}</td><td>${t.orders.pickup_address} <a href="https://www.google.com/maps?q=53.93335,27.34780" target="_blank" rel="noopener" title="Открыть в Google Maps">📍</a></td></tr>
          <tr><td>${t.orders.courier}</td><td></td></tr>
          <tr><td colspan="2">${t.orders.delivery_note}</td></tr>
        </table>
      </div>
    </section>
    <section class="orders-block">
      <div class="orders-block__inner">
        <h2>${t.orders.payment_methods}</h2>
        <table class="orders-table">
          <tr><td>${t.orders.cash}</td></tr>
          <tr><td>${t.orders.cashless}</td></tr>
        </table>
      </div>
    </section>
    <section class="orders-block">
      <div class="orders-block__inner">
        <h2>${t.orders.regions}</h2>
        <table class="orders-table">
          <tr><th>${t.orders.region_col}</th></tr>
          ${t.orders.region_list.map((r: string) => `<tr><td>${r}</td></tr>`).join('')}
        </table>
      </div>
    </section>
  `;
}

export function initOrders() {
  subscribe(() => {
    const main = document.getElementById('app-main');
    if (main && location.hash.replace('#', '') === '/orders') {
      main.innerHTML = Orders();
    }
  });
} 