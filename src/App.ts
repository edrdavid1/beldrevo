import { Header, initHeader } from './components/Header';
import { Footer, initFooter } from './components/Footer';

export function App() {
  return `
    <div class="app">
      ${Header()}
      <main id="app-main"></main>
      ${Footer()}
    </div>
  `;
}

// Инициализация компонентов после создания DOM
export function initApp() {
  // Инициализируем компоненты в правильном порядке
  initHeader();
  initFooter();
} 