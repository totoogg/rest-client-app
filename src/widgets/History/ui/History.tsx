'use client';

import { EmptyHistory, ItemHistory } from '@/entities';
import React from 'react';
import styles from './History.module.css';
import { IHistoryState } from '../model/typeState';
import { useGetHistory } from '../lib';

export const History = () => {
  const [history, setHistory] = React.useState<IHistoryState[]>([]);
  useGetHistory(setHistory);

  if (history.length === 0) {
    return <EmptyHistory />;
  }

  return (
    <>
      <h2>History Requests</h2>
      <div className={styles.wrapper}>
        {history.map((item) => (
          <ItemHistory
            href={item.href}
            method={item.method}
            textBody={item.textBody}
            url={item.url}
            key={item.id}
          />
        ))}
      </div>
    </>
  );
};
