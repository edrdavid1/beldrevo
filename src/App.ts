import { Header, initHeader } from './components/Header';
import { Footer, initFooter } from './components/Footer';

export function App() {
  // Инициализируем компоненты сразу
  initHeader();
  initFooter();
  
  return `
    <div class="app">
      ${Header()}
      <main id="app-main"></main>
      ${Footer()}
    </div>
  `;
} 