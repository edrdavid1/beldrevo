import { getLang, subscribe } from '../store';
import { translations } from '../data/translations';
import { LanguageSelector, initLanguageSelector } from './LanguageSelector';

// Header component stub
export function Header() {
  const lang = getLang();
  const t = translations[lang].header;
  return `
    <header class="header">
      <div class="header__left">
        <a href="#/" class="header__logo" id="header-logo">drevo.by</a>
        <div class="header__lang">
          ${LanguageSelector()}
        </div>
      </div>
      <button class="header__burger" id="header-burger" aria-label="Открыть меню">
        <span class="header__burger-bar"></span>
        <span class="header__burger-bar"></span>
        <span class="header__burger-bar"></span>
      </button>
      <button class="header__close" id="header-close" aria-label="Закрыть меню" style="display:none">
        <span class="header__close-bar header__close-bar1"></span>
        <span class="header__close-bar header__close-bar2"></span>
      </button>
      <nav class="header__nav">
        <a href="#/products" class="header__link">${t.products}</a>
        <a href="#/orders" class="header__link">${t.orders}</a>
        <a href="#/about" class="header__link">${t.about}</a>
      </nav>
      <div class="header__nav-overlay" id="header-nav-overlay"></div>
    </header>
  `;
}

export function initHeader() {
  // Инициализируем обработчики сразу
  initLanguageSelector();
  initHeaderLogo();
  initMobileMenu();
  
  // Подписываемся на изменения языка
  subscribe(() => {
    const header = document.querySelector('.header');
    if (header) {
      const oldHeader = header.outerHTML;
      header.outerHTML = Header();
      
      // Проверяем, действительно ли изменился контент
      const newHeader = document.querySelector('.header');
      if (newHeader && newHeader.outerHTML !== oldHeader) {
        // Переинициализируем обработчики только если контент изменился
        initLanguageSelector();
        initHeaderLogo();
        initMobileMenu();
      }
    }
  });
}

function initHeaderLogo() {
  const logo = document.getElementById('header-logo');
  if (logo) {
    // Удаляем старые обработчики
    logo.removeEventListener('click', handleLogoClick);
    // Добавляем новый обработчик
    logo.addEventListener('click', handleLogoClick);
  }
}

function handleLogoClick(e: Event) {
  e.preventDefault();
  location.hash = '/';
}

function initMobileMenu() {
  const burger = document.getElementById('header-burger');
  const close = document.getElementById('header-close');
  const overlay = document.getElementById('header-nav-overlay');

  if (burger) {
    // Удаляем старые обработчики
    burger.removeEventListener('click', handleBurgerClick);
    // Добавляем новый обработчик
    burger.addEventListener('click', handleBurgerClick);
  }

  if (close) {
    // Удаляем старые обработчики
    close.removeEventListener('click', handleCloseClick);
    // Добавляем новый обработчик
    close.addEventListener('click', handleCloseClick);
  }

  if (overlay) {
    // Удаляем старые обработчики
    overlay.removeEventListener('click', handleOverlayClick);
    // Добавляем новый обработчик
    overlay.addEventListener('click', handleOverlayClick);
  }
}

function handleBurgerClick() {
  const nav = document.querySelector('.header__nav');
  const close = document.getElementById('header-close');
  const burger = document.getElementById('header-burger');
  
  nav?.classList.add('header__nav--open');
  if (close) close.style.display = 'flex';
  if (burger) burger.style.display = 'none';
}

function handleCloseClick() {
  const nav = document.querySelector('.header__nav');
  const close = document.getElementById('header-close');
  const burger = document.getElementById('header-burger');
  
  nav?.classList.remove('header__nav--open');
  if (close) close.style.display = 'none';
  if (burger) burger.style.display = 'flex';
}

function handleOverlayClick() {
  const nav = document.querySelector('.header__nav');
  const close = document.getElementById('header-close');
  const burger = document.getElementById('header-burger');
  
  nav?.classList.remove('header__nav--open');
  if (close) close.style.display = 'none';
  if (burger) burger.style.display = 'flex';
} 