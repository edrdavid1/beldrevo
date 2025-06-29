import { Home, initHome } from '../pages/Home';
import { Products, initProducts } from '../pages/Products';
import { ProductDetail, initProductDetail } from '../pages/ProductDetail';
import { Orders, initOrders } from '../pages/Orders';
import { About, initAbout } from '../pages/About';
import { NotFound, initNotFound } from '../pages/NotFound';

const routes: Record<string, () => string> = {
  '/': Home,
  '/products': Products,
  '/orders': Orders,
  '/about': About,
};

const inits: Record<string, (() => void) | undefined> = {
  '/': initHome,
  '/products': initProducts,
  '/orders': initOrders,
  '/about': initAbout,
};

let currentRoute = '';

export function router() {
  const main = document.getElementById('app-main');
  if (!main) return;
  
  const hash = location.hash.replace('#', '') || '/';
  
  // Всегда перерисовываем при вызове роутера (для обновления языка)
  currentRoute = hash;
  
  // Product detail route
  if (hash.startsWith('/product/')) {
    main.innerHTML = ProductDetail();
    // Инициализируем сразу
    initProductDetail();
    return;
  }
  
  const page = routes[hash] || NotFound;
  main.innerHTML = page();
  
  // Инициализация реактивности для страницы сразу
  const initFn = inits[hash];
  if (initFn) {
    initFn();
  } else {
    // Инициализируем NotFound для неизвестных маршрутов
    initNotFound();
  }
}

export function initRouter() {
  window.addEventListener('hashchange', router);
  router();
} 