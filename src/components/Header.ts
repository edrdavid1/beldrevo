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
        <a href="#/products" class="header__link" data-route="/products">${t.products}</a>
        <a href="#/orders" class="header__link" data-route="/orders">${t.orders}</a>
        <a href="#/about" class="header__link" data-route="/about">${t.about}</a>
      </nav>
      <div class="header__nav-overlay" id="header-nav-overlay"></div>
    </header>
  `;
}

export function initHeader() {
  // Инициализируем обработчики сразу
  initLanguageSelector();
  initHeaderHandlers();
  
  // Подписываемся на изменения языка
  subscribe(() => {
    const header = document.querySelector('.header');
    if (header) {
      header.outerHTML = Header();
      
      // Переинициализируем обработчики после перерисовки
      initLanguageSelector();
      initHeaderHandlers();
    }
  });
}

function initHeaderHandlers() {
  // Добавляем небольшую задержку для гарантии загрузки DOM
  setTimeout(() => {
    console.log('Инициализирую обработчики header');
    
    // Логотип
    const logo = document.getElementById('header-logo');
    if (logo) {
      console.log('Найден логотип');
      logo.addEventListener('click', (e) => {
        console.log('Клик по логотипу');
        e.preventDefault();
        closeMobileMenu();
        location.hash = '/';
      });
    }

    // Бургер меню
    const burger = document.getElementById('header-burger');
    if (burger) {
      console.log('Найден бургер');
      burger.addEventListener('click', () => {
        console.log('Клик по бургеру');
        const nav = document.querySelector('.header__nav');
        const close = document.getElementById('header-close');
        
        nav?.classList.add('header__nav--open');
        if (close) close.style.display = 'flex';
        burger.style.display = 'none';
      });
    }

    // Кнопка закрытия
    const close = document.getElementById('header-close');
    if (close) {
      console.log('Найдена кнопка закрытия');
      close.addEventListener('click', () => {
        console.log('Клик по кнопке закрытия');
        closeMobileMenu();
      });
    }

    // Оверлей
    const overlay = document.getElementById('header-nav-overlay');
    if (overlay) {
      console.log('Найден оверлей');
      overlay.addEventListener('click', () => {
        console.log('Клик по оверлею');
        closeMobileMenu();
      });
    }

    // Ссылки навигации
    const links = document.querySelectorAll('.header__link');
    console.log('Найдено ссылок:', links.length);
    links.forEach((link, index) => {
      console.log(`Инициализирую ссылку ${index}:`, link.textContent);
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const route = link.getAttribute('data-route');
        console.log('Клик по ссылке:', route);
        
        closeMobileMenu();
        if (route) {
          location.hash = route;
        }
      });
    });
  }, 10);
}

function closeMobileMenu() {
  const nav = document.querySelector('.header__nav');
  const close = document.getElementById('header-close');
  const burger = document.getElementById('header-burger');
  
  nav?.classList.remove('header__nav--open');
  if (close) close.style.display = 'none';
  if (burger) burger.style.display = 'flex';
} 