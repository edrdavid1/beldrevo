import type { Product } from '../data/products';
import '../styles/main.css';

export function ProductCard(product: Product, lang: 'ru' | 'be', clickable = false) {
  return `
    <div class="product-card" data-id="${product.id}" style="${clickable ? 'cursor:pointer;' : ''}">
      <div class="product-card__img-wrap">
        <img class="product-card__img" src="${product.gallery[0]}" alt="${product.name[lang]}" loading="lazy" />
      </div>
      <div class="product-card__bottom">
        <div class="product-card__name">${product.name[lang]}</div>
        <div class="product-card__desc">${product.description[lang]}</div>
        <div class="product-card__row">
          <div class="product-card__price">${product.price}</div>
          <div class="product-card__note">${product.note[lang]}</div>
        </div>
      </div>
    </div>
  `;
} 