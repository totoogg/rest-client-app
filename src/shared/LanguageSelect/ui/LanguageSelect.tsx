'use client';

import { RadioChangeEvent, Select } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import type { LanguageSelectProps } from '@/i18n/model/types';
import { useDevice } from '@/shared/hooks/use-device';
import { useCallback, useMemo, useState } from 'react';
import { Radio } from 'antd';

export const LanguageSelect = ({ locale }: LanguageSelectProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useDevice();
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ru'>(locale);

  const changeLanguage = useCallback(
    (newLang: 'en' | 'ru') => {
      const pathWithoutLang = pathname.slice(3);
      router.push(`/${newLang}${pathWithoutLang}`);
      setCurrentLanguage(newLang);
    },
    [pathname, router]
  );

  const switchLanguage = useCallback(
    ({ target: { value } }: RadioChangeEvent) => {
      changeLanguage(value);
    },
    [changeLanguage]
  );

  const options = useMemo(
    () => [
      { value: 'en', label: <span>{isMobile ? 'EN' : 'English'}</span> },
      { value: 'ru', label: <span>{isMobile ? 'RU' : 'Русский'}</span> },
    ],
    [isMobile]
  );

  return isMobile ? (
    <Radio.Group
      options={options}
      onChange={switchLanguage}
      value={currentLanguage}
      optionType="button"
      buttonStyle="solid"
    />
  ) : (
    <Select
      style={{ width: 180 }}
      value={currentLanguage}
      onChange={changeLanguage}
      options={options}
    />
  );
};
