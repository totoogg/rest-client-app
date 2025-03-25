'use client';
import { Select } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSelect: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: 'en' | 'ru') => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = i18n.language as 'en' | 'ru';

  return (
    <Select
      style={{ width: 120 }}
      value={currentLanguage}
      onChange={changeLanguage}
      options={[
        { value: 'en', label: <span>English</span> },
        { value: 'ru', label: <span>Русский</span> },
      ]}
    />
  );
};
