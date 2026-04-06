import { getPhotos } from './setup.js';
import { renderPhotos } from './render-photos.js';
import { PHOTOS_NUMBER } from './data.js';
import { initModal } from './big-picture/init-modal.js';
import './upload-photo.js';
import './form.js';

const photos = getPhotos(PHOTOS_NUMBER);
renderPhotos(photos);
initModal(photos);
