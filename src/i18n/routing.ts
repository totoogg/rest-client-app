import { defineRouting } from 'next-intl/routing';
import { fallbackLng, languages } from './settings';

export const routing = defineRouting({
  locales: languages,
  defaultLocale: fallbackLng,
});
