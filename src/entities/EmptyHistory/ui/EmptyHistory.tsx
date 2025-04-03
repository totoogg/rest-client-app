import { Typography } from 'antd';
import Link from 'next/link';
import React from 'react';
import styles from './EmptyHistory.module.css';

export const EmptyHistory = () => {
  return (
    <>
      <Typography.Text>You haven&apos;t executed any requests</Typography.Text>
      <Typography.Text>
        It&apos;s empty here. Try:{' '}
        <Link href="/rest-client" className={styles.link}>
          <i>
            <b>REST Client</b>
          </i>
        </Link>
      </Typography.Text>
    </>
  );
};
