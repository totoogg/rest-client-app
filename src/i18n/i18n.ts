import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { TranslationTypes } from './translations/TranslationTypes';
import en from './translations/en_translation.json';
import ru from './translations/ru_translation.json';

const resources: Record<string, { translation: TranslationTypes }> = {
  en: { translation: en },
  ru: { translation: ru },
};

i18n.use(initReactI18next).init({
  resources,
  detection: {
    order: ['localStorage'],
    caches: ['localStorage'],
    lookupLocalStorage: 'i18nextLng',
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
