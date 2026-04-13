import { EFFECT_SETTINGS } from '../core/data.js';

const imgPreview = document.querySelector('.img-upload__preview img');
const imgEffects = document.querySelector('.img-upload__effects');

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

let currentEffect = 'none';

// иницаилизация слайдера при загрузке модуля
noUiSlider.create(effectLevelSlider, {
  range: {
    min: EFFECT_SETTINGS.none.min,
    max: EFFECT_SETTINGS.none.max,
  },
  start: EFFECT_SETTINGS.none.start,
  step: EFFECT_SETTINGS.none.step,
  connect: 'lower',
});

// применение текущения значения слайдера к картинке
const applyEffect = () => {
  const settings = EFFECT_SETTINGS[currentEffect];
  const value = Number(effectLevelSlider.noUiSlider.get());

  effectLevelValue.value = value;

  if (currentEffect === 'none') {
    imgPreview.style.filter = 'none';
    return;
  }

  imgPreview.style.filter = settings.apply(value);
};

// обвновляем интенсивность эффекта при изменении положения слайдера
effectLevelSlider.noUiSlider.on('update', applyEffect);

// переключение эффекта по клику на миниатюру (радиобаттоны)
const onEffectChange = (evt) => {
  const target = evt.target;

  if (!target.classList.contains('effects__radio')) {
    return;
  }

  currentEffect = target.value; // none, chrome, sepia, marvin, phobos, heat
  const settings = EFFECT_SETTINGS[currentEffect];

  // применение эффектов к слайдеру под выбранный эффект
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: settings.min,
      max: settings.max,
    },
    start: settings.start,
    step: settings.step,
  });

  applyEffect(); // применение новых эффектов из слайдера к фотке
};

// слушатель на эффектах
imgEffects.addEventListener('change', onEffectChange);

// сброс эффектов
export const resetEffects = () => {
  currentEffect = 'none';
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: EFFECT_SETTINGS.none.min,
      max: EFFECT_SETTINGS.none.max,
    },
    start: EFFECT_SETTINGS.none.start,
    step: EFFECT_SETTINGS.none.step,
  });

  applyEffect();
};
