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

export function router() {
  console.log('Роутер вызван, hash:', location.hash);
  
  const main = document.getElementById('app-main');
  if (!main) {
    console.log('Элемент app-main не найден');
    return;
  }
  
  const hash = location.hash.replace('#', '') || '/';
  console.log('Обрабатываем маршрут:', hash);
  
  // Всегда перерисовываем при вызове роутера (для обновления языка)
  
  // Product detail route
  if (hash.startsWith('/product/')) {
    console.log('Переход на страницу продукта');
    main.innerHTML = ProductDetail();
    // Инициализируем сразу
    initProductDetail();
    return;
  }
  
  const page = routes[hash] || NotFound;
  console.log('Рендерим страницу:', hash);
  main.innerHTML = page();
  
  // Инициализация реактивности для страницы сразу
  const initFn = inits[hash];
  if (initFn) {
    console.log('Инициализируем страницу:', hash);
    initFn();
  } else {
    // Инициализируем NotFound для неизвестных маршрутов
    console.log('Инициализируем NotFound');
    initNotFound();
  }
}

export function initRouter() {
  console.log('Инициализируем роутер');
  window.addEventListener('hashchange', () => {
    console.log('Событие hashchange сработало');
    router();
  });
  router();
} 