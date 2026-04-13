import { getPhotos } from './core/photos-generator.js';
import { renderPhotos } from './features/gallery-render.js';
import { initGalleryModal } from './features/gallery-init.js';

import './features/upload-modal.js';
import './form/form.js';
import './features/upload-scale.js';

const photos = getPhotos();
renderPhotos(photos);
initGalleryModal(photos);
