import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { getLang, subscribe } from '../store';
import { translations } from '../data/translations';

// Home page stub
export function Home() {
  const lang = getLang();
  const t = translations[lang];
  // Проверяем наличие фото (эмулируем, т.к. нет доступа к FS)
  const heroImg = '/pagePhoto/homePage.png';
  // const benefitsImg = '/pagePhoto/benefits.png'; // временно не используем
  return `
    <section class="hero">
      <div class="hero__bg" style="background-image:url('${heroImg}')"></div>
      <div class="hero__content">
        <h1 class="hero__title">${t.home.hero.replace(/\n/g, '<br>')}</h1>
      </div>
    </section>
    <section class="products-preview">
      <h2 class="products-preview__title">${t.home.products}</h2>
      <div class="products-preview__list">
        ${products.map(p => ProductCard(p, lang, true)).join('')}
      </div>
    </section>
    <section class="benefits benefits--grid">
      <h2 class="benefits__title">${t.home.benefits_title}</h2>
      <div class="benefits__grid">
        <div class="benefit benefit--light-brown">
          <div class="benefit__text benefit__text--left">${t.home.benefits[0]}</div>
          <div class="benefit__img benefit__img--photo1" style="background-image:url('/pagePhoto/photo1.png')"></div>
        </div>
        <div class="benefit benefit--green">
          <div class="benefit__img benefit__img--photo2" style="background-image:url('/pagePhoto/photo2.png')"></div>
          <div class="benefit__text benefit__text--right">${t.home.benefits[2]}</div>
        </div>
        <div class="benefit benefit--brown">
          <div class="benefit__text benefit__text--left">${t.home.benefits[1]}</div>
          <div class="benefit__img benefit__img--photo3" style="background-image:url('/pagePhoto/photo3.png')"></div>
        </div>
        <div class="benefit benefit--light-green">
          <div class="benefit__img benefit__img--photo4" style="background-image:url('/pagePhoto/photo4.png')"></div>
          <div class="benefit__text benefit__text--right">${t.home.benefits[3]}</div>
        </div>
      </div>
    </section>
  `;
}

export function initHome() {
  subscribe(() => {
    const main = document.getElementById('app-main');
    if (main && location.hash.replace('#', '') === '/') {
      main.innerHTML = Home();
      // Инициализируем обработчики сразу
      initProductCards();
    }
  });
  
  // Начальная инициализация
  initProductCards();
}

function initProductCards() {
  // Обработчик кликов по карточкам товаров
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (id) {
        location.hash = `/product/${id}`;
      }
    });
  });
}