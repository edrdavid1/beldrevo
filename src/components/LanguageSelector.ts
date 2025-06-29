import { getLang, setLang } from '../store';

export function LanguageSelector() {
  const lang = getLang();
  return `
    <button class="header__lang-btn" data-lang="be" ${lang === 'be' ? 'disabled' : ''}>Бел</button> /
    <button class="header__lang-btn" data-lang="ru" ${lang === 'ru' ? 'disabled' : ''}>Рус</button>
  `;
}

export function initLanguageSelector() {
  // Удаляем старые обработчики перед добавлением новых
  document.querySelectorAll('.header__lang-btn').forEach(btn => {
    btn.removeEventListener('click', handleLangClick);
  });
  
  // Добавляем новые обработчики
  document.querySelectorAll('.header__lang-btn').forEach(btn => {
    btn.addEventListener('click', handleLangClick);
  });
}

function handleLangClick(e: Event) {
  const target = e.target as HTMLElement;
  const lang = target.getAttribute('data-lang');
  
  // Проверяем, что кнопка не отключена
  if (lang && !target.hasAttribute('disabled')) {
    setLang(lang as 'ru' | 'be');
  }
} 