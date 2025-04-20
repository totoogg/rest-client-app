import { Card, Divider, Typography } from 'antd';
import React, { FC } from 'react';
import styles from './ItemHistory.module.css';
import { IItemHistoryProps } from '../model/ItemHistoryTypes';
import { Link } from '@/shared';

export const ItemHistory: FC<IItemHistoryProps> = ({ href, method, url }) => {
  return (
    <Link href={href} className={styles.link}>
      <Card type="inner" hoverable>
        <div className={styles.title}>
          <Typography.Text type="success">{method}</Typography.Text>{' '}
          <Divider type="vertical" />
          <Typography.Text code>{url}</Typography.Text>
        </div>
      </Card>
    </Link>
  );
};
