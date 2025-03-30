'use client';

import {
  Loader,
  methods,
  parseUrl,
  regExp,
  replaceVariable,
  RestClientContext,
  sendReq,
} from '@/shared';
import { Button, Input, Select, Typography } from 'antd';
import React, { FC, useContext, useEffect, useState } from 'react';
import styles from './UrlLine.module.css';
import { IUrlLineProps } from '../model/UrlLineTypes';
import { useTranslations } from 'next-intl';

const selects = [...methods].map((method) => ({
  value: method,
  label: method,
}));

export const UrlLine: FC<IUrlLineProps> = ({ methodSelect, urlServer }) => {
  const {
    method,
    setMethod,
    url,
    setUrl,
    body,
    headers,
    variables,
    error,
    setError,
    setResponse,
  } = useContext(RestClientContext);
  const t = useTranslations();
  const [buttonValid, setButtonValid] = useState(false);
  const [input, setInput] = useState('');

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setMethod?.(methodSelect);
  }, [methodSelect, setMethod]);

  useEffect(() => {
    const urlStart = parseUrl(window.location.href).pathSegments.slice(0, 2);
    const urlStr = btoa(encodeURIComponent(url || ''));
    let urlHeaders = '';
    let bodyText = '';
    let json = false;

    if (headers) {
      urlHeaders = headers
        .map(
          (el) =>
            `${encodeURIComponent(el.key)}=${encodeURIComponent(el.value)}`
        )
        .join('&');
    }

    if (body) {
      try {
        bodyText = JSON.parse(body);
        json = true;
      } catch {
        bodyText = body;
        json = false;
      }
    }

    const bodyUrl = btoa(
      body
        ? json
          ? encodeURIComponent(JSON.stringify(bodyText))
          : encodeURIComponent(bodyText)
        : ''
    );

    window.history.replaceState(
      {},
      '',
      `/${urlStart[0]}/${urlStart[1]}/${method}${urlStr ? `/${urlStr}` : ''}${bodyUrl ? `/${bodyUrl}` : ''}${
        urlHeaders?.length ? `?${urlHeaders}` : ''
      }`
    );
  }, [body, headers, method, url]);

  useEffect(() => {
    let url = '';

    try {
      url = atob(decodeURIComponent(urlServer));
    } catch {
      url = urlServer;
    }

    setUrl?.(decodeURIComponent(url));
    setInput(decodeURIComponent(url));
  }, [setUrl, urlServer]);

  useEffect(() => {
    if (regExp.test(input)) {
      const res = replaceVariable(input, variables, regExp);

      if (res.status === 'error') {
        setError?.((el) => ({
          ...el,
          inputValidVariable: (res.res as string[]).join(', '),
        }));
      }

      if (res.status === 'fulfilled') {
        const url = String(res.res);

        setError?.((el) => ({
          ...el,
          inputValidVariable: '',
        }));
        setUrl?.(url);
      }
    } else {
      const url = input;

      setError?.((el) => ({
        ...el,
        inputValidVariable: '',
      }));
      setUrl?.(url);
    }
  }, [input, setError, setUrl, variables]);

  useEffect(() => {
    if (
      !input ||
      error?.inputValid ||
      (error?.inputValidVariable || '').length > 0 ||
      error?.errorBody ||
      (error?.headersValidVariable || '').length > 0 ||
      (error?.inputBodyValidVariable || '').length > 0
    ) {
      setButtonValid(false);
    } else {
      setButtonValid(true);
    }
  }, [
    error?.errorBody,
    error?.headersValidVariable,
    error?.inputBodyValidVariable,
    error?.inputValid,
    error?.inputValidVariable,
    input,
  ]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    if (e.target.value.length === 0) {
      setError?.((el) => ({ ...el, inputValid: true }));
    } else {
      setError?.((el) => ({ ...el, inputValid: false }));
    }
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
      }

      if (result.res === 'Invalid request') {
        result = {
          ...result,
          res: `${t('restClient.requestError')}`,
        };
      }

      if (result.res === 'Network error. Could not send request') {
        result = {
          ...result,
          res: `${t('restClient.networkError')}`,
        };
      }

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
