'use client';

import { Select } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import type { LanguageSelectProps } from '@/i18n/model/types';

export const LanguageSelect = ({ locale }: LanguageSelectProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLang: 'en' | 'ru') => {
    const pathWithoutLang = pathname.slice(3);
    router.push(`/${newLang}${pathWithoutLang}`);
  };

  return (
    <Select
      style={{ width: 180 }}
      value={locale}
      onChange={changeLanguage}
      options={[
        { value: 'en', label: <span>English</span> },
        { value: 'ru', label: <span>Русский</span> },
      ]}
    />
  );
};
