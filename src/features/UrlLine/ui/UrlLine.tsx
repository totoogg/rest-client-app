'use client';

import { Loader, methods, RestClientContext, sendReq } from '@/shared';
import { Button, Input, Select, Typography } from 'antd';
import React, { FC, useContext, useEffect, useState } from 'react';
import styles from './UrlLine.module.css';
import { IUrlLineProps } from '../model/UrlLineTypes';
import { useTranslations } from 'next-intl';
import {
  useChangeUrl,
  useStartUrl,
  useValidSend,
  useValidVariable,
} from '../lib';
import { saveHistory } from '../util';

const selects = [...methods].map((method) => ({
  value: method,
  label: method,
}));

export const UrlLine: FC<IUrlLineProps> = ({ methodSelect, urlServer }) => {
  const { method, setMethod, error, setError, setResponse } =
    useContext(RestClientContext);

  const t = useTranslations();

  const [buttonValid, setButtonValid] = useState(false);
  const [input, setInput] = useState('');
  const [loader, setLoader] = useState(false);
  const [startChange, setStartChange] = useState(false);

  const { inputUrl } = useStartUrl(urlServer);
  const { valid } = useValidSend(input);
  useChangeUrl();
  useValidVariable(input, startChange);

  useEffect(() => {
    setMethod?.(methodSelect);
  }, [methodSelect, setMethod]);

  useEffect(() => {
    setInput(inputUrl);
  }, [inputUrl]);

  useEffect(() => {
    setButtonValid(valid);
  }, [valid]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setStartChange(true);
  };

  const handleChange = (value: string) => {
    setMethod?.(value);
  };

  const handleSend = async () => {
    if (input.length === 0) {
      setError?.((el) => ({ ...el, inputValid: true }));
    }

    if (buttonValid) {
      setLoader(true);
      let result = await sendReq(window.location.href);

      if (result.res === 'Server error') {
        result = {
          ...result,
          res: `${t('restClient.serverError')}`,
        };
      } else if (result.res === 'Invalid request') {
        result = {
          ...result,
          res: `${t('restClient.requestError')}`,
        };
      } else if (result.res === 'Network error. Could not send request') {
        result = {
          ...result,
          res: `${t('restClient.networkError')}`,
        };
      }

      saveHistory(window.location.href);
      setResponse?.(result);
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <h2>REST {t('restClient.title')}</h2>
      <div className={styles.wrapper}>
        <Select
          value={method}
          className={styles.select}
          onChange={handleChange}
          options={selects}
        />
        <div className={styles.content_input}>
          <Input
            value={input}
            onChange={handleInput}
            placeholder={t('restClient.inputPlaceholder')}
            className={styles.input}
            status={
              error?.inputValid || (error?.inputValidVariable || '').length > 0
                ? 'error'
                : ''
            }
          />
          <Typography.Text type="danger">
            &nbsp;{error?.inputValid && `${t('restClient.urlErrorFill')}.`}{' '}
            {(error?.inputValidVariable || '').length > 0 &&
              `${t('restClient.errorVariable')}: ${error?.inputValidVariable}`}
          </Typography.Text>
        </div>
        <Button
          type="primary"
          onClick={handleSend}
          className={!buttonValid ? styles['button-disable'] : ''}
        >
          {t('restClient.send')}
        </Button>
      </div>
    </>
  );
};
