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
  subscribe(() => {
    const header = document.querySelector('.header');
    if (header) {
      header.outerHTML = Header();
      // Инициализируем компоненты сразу
      initLanguageSelector();
      initHeaderLogo();
      initMobileMenu();
    }
  });
  
  // Начальная инициализация
  initLanguageSelector();
  initHeaderLogo();
  initMobileMenu();
}

function initHeaderLogo() {
  const logo = document.getElementById('header-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      location.hash = '/';
    });
  }
}

function initMobileMenu() {
  const burger = document.getElementById('header-burger');
  const close = document.getElementById('header-close');
  const nav = document.querySelector('.header__nav');
  const overlay = document.getElementById('header-nav-overlay');

  if (burger) {
    burger.addEventListener('click', () => {
      nav?.classList.add('header__nav--open');
      if (close) close.style.display = 'flex';
    });
  }

  if (close) {
    close.addEventListener('click', () => {
      nav?.classList.remove('header__nav--open');
      close.style.display = 'none';
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      nav?.classList.remove('header__nav--open');
      if (close) close.style.display = 'none';
    });
  }
} 