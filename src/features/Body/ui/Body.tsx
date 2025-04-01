'use client';

import React, { FC, useContext, useState } from 'react';
import styles from './Body.module.css';
import { Input, Select, Typography } from 'antd';
import { RestClientContext } from '@/shared';
import { IBodyProps } from '../model/BodyTypes';
import { useTranslations } from 'next-intl';
import { useBodyStart, useChangeHeader, useValidVariable } from '../lib';

export const Body: FC<IBodyProps> = ({ bodyUrl }) => {
  const { setBody, error, setError } = useContext(RestClientContext);
  const t = useTranslations();

  const [inputBody, setInputBody] = useState('');
  const [showBody, setShowBody] = useState(false);
  const [createBody, setCreateBody] = useState(false);
  const [selectBody, setSelectBody] = useState('none');

  useBodyStart(bodyUrl, createBody, setInputBody, setShowBody, setSelectBody);
  useValidVariable(inputBody, selectBody);
  useChangeHeader(selectBody);

  const handleSelectBody = (value: string) => {
    setShowBody(value !== 'none');
    setSelectBody(value);
    setCreateBody(true);

    if (value === 'none') {
      setBody?.('');
    }

    if (value !== 'json') {
      setError?.((el) => ({
        ...el,
        errorBody: false,
      }));
    }
  };

  const handleInputBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputBody(e.target.value);
    setCreateBody(true);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tittle}>
        <h3>{t('restClient.body')}: </h3>
        <Select
          value={selectBody}
          className={styles.select}
          onChange={handleSelectBody}
          options={[
            { value: 'none', label: `${t('restClient.none')}` },
            { value: 'json', label: 'JSON' },
            { value: 'text', label: 'Text' },
          ]}
        />
      </div>
      {showBody && (
        <Input.TextArea
          status={
            (selectBody === 'json' && error?.errorBody) ||
            (error?.inputBodyValidVariable || '').length > 0
              ? 'error'
              : ''
          }
          style={{
            resize: 'none',
          }}
          rows={10}
          value={inputBody}
          onChange={handleInputBody}
        />
      )}
      <Typography.Text type="danger">
        &nbsp;
        {selectBody === 'json' &&
          error?.errorBody &&
          `${t('restClient.bodyError')}.`}{' '}
        {(error?.inputBodyValidVariable || '').length > 0 &&
          `${t('restClient.errorVariable')}: ${error?.inputBodyValidVariable}`}
      </Typography.Text>
    </div>
  );
};
