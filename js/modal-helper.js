import { isEscape } from './util.js';

const body = document.body;

// показывает/скрывает конкретный модал + блокировка скролла
const toggleModalVisibility = (modalElement, isVisible = true) => {
  body.classList.toggle('modal-open', isVisible);
  modalElement.classList.toggle('hidden', !isVisible);
};

// подписка на Esc, возвращает функцию для отписки
const subscribeEsc = (modalElement, closeFunc) => {
  const handler = (evt) => {
    if (!isEscape(evt)) {
      return;
    }
    // если модал скрыт, ничего не делаем
    if (modalElement.classList.contains('hidden')) {
      return;
    }

    closeFunc();
  };

  document.addEventListener('keydown', handler);

  return () => {
    document.removeEventListener('keydown', handler);
  };
};

// привязка кнопки закрытия к функции закрытия
const bindCloseButton = (buttonElement, closeFunc) => {
  buttonElement.addEventListener('click', closeFunc);
};

export {
  toggleModalVisibility,
  subscribeEsc,
  bindCloseButton
};
