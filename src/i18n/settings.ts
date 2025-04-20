import { Language } from './model/types';

export const fallbackLng = 'en';

export const languages: Language[] = [fallbackLng, 'ru'];
export const defaultNS = 'translation';
export const cookieName = 'i18next';

export function getOptions(lang = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lang,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
