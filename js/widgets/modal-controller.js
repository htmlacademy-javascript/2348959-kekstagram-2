import { isEscape } from '../core/util.js';

const body = document.body;

export const createModalController = ({
  modalElement,
  openClass = 'modal-open',
  hiddenClass = 'hidden',
  canClose = null,
  closeModal = null,
  closeButton = null
}) => {
  let escHandler = null;

  const close = () => {
    if (openClass) {
      body.classList.remove(openClass);
    }
    modalElement.classList.add(hiddenClass);
    if (closeModal) {
      closeModal();
    }
    if(escHandler) {
      document.removeEventListener('keydown', escHandler);
      escHandler = null;
    }
  };

  const open = () => {
    if (openClass) {
      body.classList.add(openClass);
    }
    modalElement.classList.remove(hiddenClass);

    escHandler = (evt) => {
      if (!isEscape(evt)) {
        return;
      }
      if (canClose && !canClose()) {
        return;
      }
      if (modalElement.classList.contains(hiddenClass)) {
        return;
      }
      close();
    };

    document.addEventListener('keydown', escHandler);
  };

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      if (canClose && !canClose()) {
        return;
      }
      close();
    });
  }

  return { open, close };
};
