'use client';
import '@/i18n/i18n';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '@/shared/LanguageSelect';
import { MainLogo } from '@/shared/Logo';
import { NavLink } from '@/shared/Link';

export const Header = () => {
  const { t } = useTranslation();
  return (
    <header>
      <h1>{t('page.header')}</h1>
      <Link href="/">
        <MainLogo />
      </Link>
      <LanguageSelect />
      <Link href="/auth/sign-in">
        <NavLink text={t('navLink.signIn')} />
      </Link>
      <Link href="/auth/sign-up">
        <NavLink text={t('navLink.signUp')} />
      </Link>
    </header>
  );
};

Header.displayName = 'Header';
