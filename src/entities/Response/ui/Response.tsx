'use client';

import { RestClientContext } from '@/shared';
import { Input, Typography } from 'antd';
import React, { useContext } from 'react';
import styles from './Response.module.css';
import { useTranslations } from 'next-intl';

export const Response = () => {
  const { response } = useContext(RestClientContext);
  const t = useTranslations();

  return (
    <div className={styles.wrapper}>
      <h3>{t('restClient.response')}</h3>
      <div className={styles.content}>
        <h4>
          {t('restClient.status')}:{' '}
          {(response?.status || -1) > -1 && (
            <Typography.Text
              type={(response?.status || -1) > 399 ? 'danger' : 'success'}
            >
              {response?.status || -1}
            </Typography.Text>
          )}
        </h4>
        <Input.TextArea
          rows={10}
          value={response?.res || ''}
          readOnly
          style={{
            resize: 'none',
          }}
        />
      </div>
    </div>
  );
};
