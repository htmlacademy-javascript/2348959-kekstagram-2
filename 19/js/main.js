import { getPhotos } from './core/api.js';
import { renderPhotos } from './features/gallery-render.js';
import { showDataError } from './widgets/messages.js';
import { initGalleryModal } from './features/gallery-init.js';

import './form/form.js';
import './form/form-submit.js';
import './features/upload-modal.js';
import './features/upload-scale.js';
import './features/upload-effects.js';
import { initFilters } from './features/gallery-filters.js';


const initApp = async () => {
  try {
    const photos = await getPhotos();
    initFilters(photos);
    renderPhotos(photos);
    initGalleryModal(photos);
  } catch (err) {
    showDataError();
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

initApp();
