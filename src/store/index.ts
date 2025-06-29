// store stub 
import { router } from '../router';

type Lang = 'ru' | 'be';

let lang: Lang = 'ru';
const listeners: (() => void)[] = [];
let routerTimeout: number | null = null;

export function getLang(): Lang {
  return lang;
}

export function setLang(newLang: Lang) {
  if (lang !== newLang) {
    lang = newLang;
    
    listeners.forEach(fn => {
      fn();
    });
    
    // Дебаунсинг для предотвращения множественных перерисовок
    if (routerTimeout) {
      clearTimeout(routerTimeout);
    }
    
    routerTimeout = setTimeout(() => {
      router();
      routerTimeout = null;
    }, 10);
  }
}

export function subscribe(fn: () => void) {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx !== -1) {
      listeners.splice(idx, 1);
    }
  };
} 