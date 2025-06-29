import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { getLang, subscribe } from '../store';
import { translations } from '../data/translations';
import type { Product } from '../data/products';

// Расширяем Window для фильтров
declare global {
  interface Window {
    __productFilters?: {
      available: boolean;
      priceFrom: string;
      priceTo: string;
    };
  }
}

export function Products() {
  const lang = getLang();
  const t = translations[lang];
  // Фильтры по умолчанию
  const filters = window.__productFilters || { available: false, priceFrom: '', priceTo: '' };
  // Преобразуем цену в число для фильтрации
  function parsePrice(p: Product) {
    return parseFloat((p.price || '').replace(/[^\d.]/g, '')) || 0;
  }
  // Фильтрация
  const filtered = products.filter(p => {
    if (filters.available && !p.available) return false;
    const price = parsePrice(p);
    if (filters.priceFrom && price < parseFloat(filters.priceFrom)) return false;
    if (filters.priceTo && price > parseFloat(filters.priceTo)) return false;
    return true;
  });
  return `
    <nav class="breadcrumbs">
      <a href="#/">${t.breadcrumbs.home}</a> &rarr; <b>${t.breadcrumbs.products}</b>
    </nav>
    <section class="products-page">
      <form class="products-filters" onsubmit="return false;">
        <span class="products-filters__label">${t.products.filters}</span>
        <input class="products-filters__input" type="number" placeholder="${t.products.price_from}" name="priceFrom" value="${filters.priceFrom || ''}">
        <span class="products-filters__arrow">→</span>
        <input class="products-filters__input" type="number" placeholder="${t.products.price_to}" name="priceTo" value="${filters.priceTo || ''}">
        <label class="products-filters__checkbox-label">
          ${t.products.available} <input type="checkbox" name="available" ${filters.available ? 'checked' : ''}>
        </label>
        <button class="products-filters__btn" type="button">${t.products.apply}</button>
      </form>
      <div class="products-page__list">
        ${filtered.map(p => ProductCard(p, lang, true)).join('')}
      </div>
    </section>
  `;
}

export function initProducts() {
  subscribe(() => {
    const main = document.getElementById('app-main');
    if (main && location.hash.replace('#', '') === '/products') {
      main.innerHTML = Products();
      // Инициализируем обработчики сразу
      initProductCards();
      initFilters();
    }
  });
  
  // Начальная инициализация
  initProductCards();
  initFilters();
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

function initFilters() {
  const form = document.querySelector('.products-filters') as HTMLFormElement;
  const applyBtn = document.querySelector('.products-filters__btn') as HTMLButtonElement;
  
  if (form && applyBtn) {
    applyBtn.addEventListener('click', () => {
      const formData = new FormData(form);
      const filters = {
        available: formData.get('available') === 'on',
        priceFrom: formData.get('priceFrom') as string,
        priceTo: formData.get('priceTo') as string,
      };
      window.__productFilters = filters;
      // Перерисовываем страницу с новыми фильтрами
      const main = document.getElementById('app-main');
      if (main) {
        main.innerHTML = Products();
        // Инициализируем обработчики сразу
        initProductCards();
        initFilters();
      }
    });
  }
} 