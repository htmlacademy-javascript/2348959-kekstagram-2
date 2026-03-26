import { getPhotos } from './setup.js';
import { renderPhotos } from './render-photos.js';
import { PHOTOS_NUMBER } from './data.js';
import './modal-open.js';

const photos = getPhotos(PHOTOS_NUMBER);
renderPhotos(photos);
