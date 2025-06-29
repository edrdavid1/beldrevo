import './styles/main.css';
import { App, initApp } from './App';
import { initRouter } from './router';

const root = document.getElementById('app') || createRoot();
root.innerHTML = App();

// Инициализируем компоненты после создания DOM
initApp();
initRouter();

function createRoot() {
  const el = document.createElement('div');
  el.id = 'app';
  document.body.appendChild(el);
  return el;
}

// main entry point stub 