import { Card, Divider, Typography } from 'antd';
import Link from 'next/link';
import React, { FC } from 'react';
import styles from './ItemHistory.module.css';
import { IItemHistoryProps } from '../model/ItemHistoryTypes';
import { bodyPretty } from '../util';

export const ItemHistory: FC<IItemHistoryProps> = ({
  href,
  textBody,
  method,
  url,
}) => {
  return (
    <Link href={href} className={styles.link}>
      <Card type="inner" hoverable>
        <>
          <div
            className={[
              styles.title,
              textBody ? styles['title-with-body'] : '',
            ].join(' ')}
          >
            <Typography.Text type="success">{method}</Typography.Text>{' '}
            <Divider type="vertical" />
            <Typography.Text code>{url}</Typography.Text>
          </div>
        </>
        {textBody && (
          <Card type="inner">
            <div className={styles['wrapper-body']}>
              <Typography.Text code>Body:</Typography.Text>
              <Typography.Text>
                {' '}
                <pre
                  style={{
                    background: 'none',
                    border: 'none',
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {bodyPretty(textBody)}
                </pre>
              </Typography.Text>
            </div>
          </Card>
        )}
      </Card>
    </Link>
  );
};
