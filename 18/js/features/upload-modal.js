import { resetScale } from './upload-scale.js';
import { resetEffects } from './upload-effects.js';
import { createModalController } from '../widgets/modal-controller.js';

const imgUpload = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('#upload-file');
const imgPreview = document.querySelector('.img-upload__preview img');
const closeButton = document.querySelector('.img-upload__cancel');
const effectPreview = document.querySelectorAll('.effects__preview');

const uploadModal = createModalController({
  modalElement: imgUpload,
  closeButton,
});

const openUploadModal = () => {
  resetScale();
  resetEffects();
  uploadModal.open();
};

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;
  const imageUrl = URL.createObjectURL(file);
  imgPreview.src = imageUrl;
  effectPreview.forEach((preview) => {
    preview.style.backgroundImage = `url(${imageUrl})`;
  });

  openUploadModal();
});

export const closeUploadModal = uploadModal.close;
