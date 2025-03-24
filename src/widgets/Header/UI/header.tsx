'use client';
import { LangToggle } from '@/shared/LangToggle/index';
import { MainLogo } from '@/shared/Logo/index';
import { NavLink } from '@/shared/Link/index';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import '@/i18n/i18n';

export const Header = () => {
  const { t } = useTranslation();
  return (
    <header>
      <h1>{t('page.header')}</h1>
      <Link href="/">
        <MainLogo />
      </Link>
      <LangToggle />
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
