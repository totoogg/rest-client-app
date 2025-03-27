import { CustomTypeOptions } from 'i18next';

export type Language = 'en' | 'ru';

export interface ParamsLanguage {
  params: {
    locale: Language;
  };
}

export interface TranslationResources {
  translation: {
    title: string;
    'to-second-page': string;
  };
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: TranslationResources['translation'];
    };
  }
}

export type Namespace = keyof CustomTypeOptions['resources'];

export interface LanguageSelectProps {
  locale: Language;
}
