import './styles/main.css';
import { App } from './App';
import { initRouter } from './router';

const root = document.getElementById('app') || createRoot();
root.innerHTML = App();
initRouter();

function createRoot() {
  const el = document.createElement('div');
  el.id = 'app';
  document.body.appendChild(el);
  return el;
}

// main entry point stub 