import { Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import styles from './EmptyHistory.module.css';
import { NavLink } from '@/shared/Link';
import { useTranslations } from 'next-intl';

export const EmptyHistory = () => {
  const t = useTranslations();

  return (
    <>
      <Typography.Text>{t('history.emptyTitle')}</Typography.Text>
      <Typography.Text>
        {t('history.emptySuggest')}{' '}
        <Link href="/rest-client" className={styles.link}>
          <NavLink text={t('navLink.restClient')} />
        </Link>
      </Typography.Text>
    </>
  );
};
