'use client';
import '@/i18n/i18n';
import { CourseLogo } from '@/shared/Logo';
import { FooterTeamBlock } from '@/entities/Team';
import { linkToCourse } from '../consts/dataForFooter';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <h1>{t('page.footer')}</h1>
      <FooterTeamBlock />
      <p>2025</p>
      <a className="link" href={linkToCourse}>
        <CourseLogo />
      </a>
    </footer>
  );
};

Footer.displayName = 'Footer';
