'use client';

import {
  methods,
  parseUrl,
  regExp,
  replaceVariable,
  RestClientContext,
} from '@/shared';
import { Button, Input, Select, Typography } from 'antd';
import React, { FC, useContext, useEffect, useState } from 'react';
import styles from './UrlLine.module.css';
import { IUrlLineProps } from '../model/UrlLineTypes';

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
  } = useContext(RestClientContext);
  const [buttonValid, setButtonValid] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    setMethod?.(methodSelect);
  }, [methodSelect, setMethod]);

  useEffect(() => {
    const urlStart = parseUrl(window.location.href).pathSegments.slice(0, 2);

    let urlHeaders = '';

    if (headers) {
      urlHeaders = headers
        .map(
          (el) =>
            `${encodeURIComponent(el.key)}=${encodeURIComponent(el.value)}`
        )
        .join('&');
    }

    window.history.replaceState(
      {},
      '',
      `/${urlStart[0]}/${urlStart[1]}/${method}${url ? `/${url}` : ''}${body ? `/${body}` : ''}${
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

    setUrl?.(urlServer);
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
        const url = btoa(encodeURIComponent(String(res.res)));

        setError?.((el) => ({
          ...el,
          inputValidVariable: '',
        }));
        setUrl?.(url);
      }
    } else {
      const url = btoa(encodeURIComponent(input));

      setError?.((el) => ({
        ...el,
        inputValidVariable: '',
      }));
      setUrl?.(url);
    }
  }, [input, setError, setUrl, variables]);

  useEffect(() => {
    if (
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
      // router.refresh();
      // const result = await sendReq(window.location.href);
      // setResponse(result);
      // console.log(result);
    }
  };

  return (
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
          placeholder="Enter URL or paste text"
          className={styles.input}
          status={
            error?.inputValid || (error?.inputValidVariable || '').length > 0
              ? 'error'
              : ''
          }
        />
        <Typography.Text type="danger">
          &nbsp;{error?.inputValid && 'Fill in the URL.'}{' '}
          {(error?.inputValidVariable || '').length > 0 &&
            `Non-existent variables: ${error?.inputValidVariable}`}
        </Typography.Text>
      </div>
      <Button
        type="primary"
        onClick={handleSend}
        className={!buttonValid ? styles['button-disable'] : ''}
      >
        Send
      </Button>
    </div>
  );
};
