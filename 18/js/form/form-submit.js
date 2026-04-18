import { sendForm } from '../core/api.js';
import { resetScale } from '../features/upload-scale.js';
import { resetEffects } from '../features/upload-effects.js';
import { closeUploadModal } from '../features/upload-modal.js';
import { isValid, resetValidation } from './validation.js';
import { showErrorMessage, showSuccessMessage } from '../widgets/messages.js';

const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const setSubmitButtonState = (isDisable) => {
  submitButton.disable = isDisable;
  submitButton.textContent = isDisable ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

const resetFormState = () => {
  uploadForm.reset();
  resetScale();
  resetEffects();
  resetValidation();
  closeUploadModal();
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  if (!isValid()) return;
  const formData = new FormData(uploadForm);

  try {
    setSubmitButtonState(true);
    await sendForm(formData);
    resetFormState();
    showSuccessMessage();
  } catch (err) {
    console.error(err);
    showErrorMessage();
  } finally {
    setSubmitButtonState(false);
  }
};

uploadForm.addEventListener('submit', onFormSubmit);
