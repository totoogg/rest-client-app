'use client';

import { EmptyHistory, ItemHistory } from '@/entities';
import React from 'react';
import styles from './History.module.css';
import { IHistoryState } from '../model/typeState';
import { useGetHistory } from '../lib';
import { useTranslations } from 'next-intl';

export const History = () => {
  const [history, setHistory] = React.useState<IHistoryState[]>([]);
  useGetHistory(setHistory);
  const t = useTranslations();

  if (history.length === 0) {
    return <EmptyHistory />;
  }

  return (
    <>
      <h2>{t('history.title')}</h2>
      <div className={styles.wrapper}>
        {history.map((item) => (
          <ItemHistory
            href={item.href}
            method={item.method}
            url={item.url}
            key={item.id}
          />
        ))}
      </div>
    </>
  );
};
