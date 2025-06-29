import { products } from '../data/products';
import { getLang, subscribe } from '../store';
import { translations } from '../data/translations';

export function ProductDetail() {
  const lang = getLang();
  const t = translations[lang];
  // Получаем id из hash
  const hash = location.hash.replace('#', '');
  const id = hash.split('/')[2];
  const product = products.find(p => p.id === id);
  if (!product) {
    return `<section class="product-detail"><h1>${t.products.not_found}</h1></section>`;
  }
  // Главное фото — первая картинка из gallery
  if (typeof window !== 'undefined' && window.innerWidth < 700) {
    // Мобильная разметка
    return `
      <nav class="breadcrumbs">
        <a href="#/">${t.breadcrumbs.home}</a> &rarr; <a href="#/products">${t.breadcrumbs.products}</a> &rarr; <b>${product.name[lang]}</b>
      </nav>
      <section class="product-detail">
        <div class="product-detail__img-wrap">
          <img class="product-detail__img" src="${product.gallery[0]}" alt="${product.name[lang]}" id="main-product-img" loading="eager" />
        </div>
        <div class="product-detail__gallery">
          ${product.gallery.map((img, i) => `<img src="${img}" class="product-detail__thumb" alt="thumb" data-img-idx="${i}" loading="lazy" />`).join('')}
        </div>
        <div class="product-detail__info-col">
          <div class="product-detail__name">${product.name[lang]}</div>
          <div class="product-detail__desc">${product.description[lang]}</div>
          <div class="product-detail__price">${product.price}</div>
          <button class="product-detail__order-btn">${t.products.order_btn}</button>
          <div class="product-detail__note">${t.products.min_order}<br>${t.products.opt_note}</div>
        </div>
        <div class="product-detail__text">
          ${t.products.detail_text}
        </div>
      </section>
    `;
  }
  // Десктопная разметка по макету
  return `
    <nav class="breadcrumbs">
      <a href="#/">${t.breadcrumbs.home}</a> &rarr; <a href="#/products">${t.breadcrumbs.products}</a> &rarr; <b>${product.name[lang]}</b>
    </nav>
    <section class="product-detail">
      <div class="product-detail__main product-detail__main--desktop">
        <div class="product-detail__gallery-col">
          <div class="product-detail__gallery">
            ${product.gallery.map((img, i) => `<img src="${img}" class="product-detail__thumb" alt="thumb" data-img-idx="${i}" loading="lazy" />`).join('')}
          </div>
        </div>
        <div class="product-detail__img-col">
          <div class="product-detail__img-wrap">
            <img class="product-detail__img" src="${product.gallery[0]}" alt="${product.name[lang]}" id="main-product-img" loading="eager" />
          </div>
        </div>
        <div class="product-detail__info-col">
          <div class="product-detail__name">${product.name[lang]}</div>
          <div class="product-detail__desc">${product.description[lang]}</div>
          <div class="product-detail__price">${product.price}</div>
          <button class="product-detail__order-btn">${t.products.order_btn}</button>
          <div class="product-detail__note">${t.products.min_order}<br>${t.products.opt_note}</div>
        </div>
      </div>
      <div class="product-detail__text">
        ${t.products.detail_text}
      </div>
    </section>
  `;
}

export function initProductDetail() {
  subscribe(() => {
    const main = document.getElementById('app-main');
    if (main && location.hash.startsWith('#/product/')) {
      main.innerHTML = ProductDetail();
      // Инициализируем обработчики сразу
      initGallery();
      initOrderButton();
    }
  });
  
  // Начальная инициализация
  initGallery();
  initOrderButton();
}

function initGallery() {
  // Обработчик кликов по миниатюрам товаров
  document.querySelectorAll('.product-detail__thumb').forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      const mainImg = document.getElementById('main-product-img') as HTMLImageElement;
      if (mainImg) {
        mainImg.src = (e.target as HTMLImageElement).src;
      }
    });
  });
}

function initOrderButton() {
  // Обработчик кнопки заказа
  const orderBtn = document.querySelector('.product-detail__order-btn');
  if (orderBtn) {
    orderBtn.addEventListener('click', () => {
      showOrderModal();
    });
  }
}

function showOrderModal() {
  const lang = getLang();
  const t = translations[lang];
  
  // Создаем модальное окно
  const modal = document.createElement('div');
  modal.className = 'order-modal';
  modal.innerHTML = `
    <div class="order-modal__overlay"></div>
    <div class="order-modal__content">
      <button class="order-modal__close" aria-label="Закрыть">×</button>
      <h2 class="order-modal__title">${t.orders.title}</h2>
      <div class="order-modal__contacts">
        <div class="order-modal__contact-item">
          <strong>${t.about.phone}:</strong>
          <a href="tel:+375296708141">+375 (29) 670-81-41</a> - ${t.footer.phone1_note}
        </div>
        <div class="order-modal__contact-item">
          <strong>${t.about.phone}:</strong>
          <a href="tel:+375296851185">+375 (29) 685-11-85</a>
        </div>
        <div class="order-modal__contact-item">
          <strong>${t.about.address}:</strong>
          ${t.orders.pickup_address}
          <a href="https://www.google.com/maps?q=53.93335,27.34780" target="_blank" rel="noopener">📍</a>
        </div>
        <div class="order-modal__note">
          ${t.orders.delivery_note}
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Обработчики закрытия
  const closeBtn = modal.querySelector('.order-modal__close');
  const overlay = modal.querySelector('.order-modal__overlay');
  
  const closeModal = () => {
    document.body.removeChild(modal);
  };
  
  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);
  
  // Закрытие по Escape
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
}

function initProductImageZoom() {
  const wrap = document.querySelector('.product-detail__img-wrap');
  const img = document.getElementById('main-product-img');
  if (!wrap || !img) return;
  let zoomed = false;
  // Отключаем на мобильных
  if (window.innerWidth < 700) return;
  wrap.addEventListener('mousemove', e => {
    if (!zoomed) return;
    const event = e as MouseEvent;
    const rect = wrap.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
  });
  wrap.addEventListener('mouseenter', () => {
    zoomed = true;
    img.classList.add('product-detail__img--zoomed');
  });
  wrap.addEventListener('mouseleave', () => {
    zoomed = false;
    img.classList.remove('product-detail__img--zoomed');
    img.style.transformOrigin = '';
  });
} 