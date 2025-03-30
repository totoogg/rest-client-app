'use client';

import React, { FC, useContext, useEffect, useState } from 'react';
import styles from './Body.module.css';
import { Input, Select, Typography } from 'antd';
import { regExp, replaceVariable, RestClientContext } from '@/shared';
import { IBodyProps } from '../model/BodyTypes';

export const Body: FC<IBodyProps> = ({ bodyUrl }) => {
  const { setBody, headers, variables, error, setError, setHeaders } =
    useContext(RestClientContext);

  const [inputBody, setInputBody] = useState('');
  const [showBody, setShowBody] = useState(false);
  const [createBody, setCreateBody] = useState(false);

  const [selectBody, setSelectBody] = useState('none');

  useEffect(() => {
    if (bodyUrl && !createBody) {
      const textBody = decodeURIComponent(atob(decodeURIComponent(bodyUrl)));
      setInputBody(textBody);
      setBody?.(textBody);

      if (headers && headers?.length > 0) {
        const header = headers.find(
          (el) =>
            el.key === 'Content-Type' &&
            (el.value === 'application/json' || 'text/plain')
        );

        if (header) {
          const typeBody =
            typeof header?.value === 'string' &&
            (!header?.value || header.value.startsWith('text'))
              ? 'text'
              : 'json';

          if (typeBody === 'json') {
            try {
              setInputBody(JSON.stringify(JSON.parse(textBody), null, 4));
            } catch {
              setInputBody(textBody);
            }
          }

          setSelectBody(typeBody);
          setShowBody(true);
        }
      } else {
        setShowBody(true);
      }
    }
  }, [bodyUrl, createBody, headers, setBody]);

  useEffect(() => {
    const checkJson = (value: string) => {
      try {
        JSON.parse(value);
        setError?.((el) => ({
          ...el,
          errorBody: false,
        }));
      } catch {
        setError?.((el) => ({
          ...el,
          errorBody: true,
        }));
      }
    };

    if (regExp.test(inputBody)) {
      const res = replaceVariable(inputBody, variables, regExp);

      if (res.status === 'error') {
        setError?.((el) => ({
          ...el,
          inputBodyValidVariable: (res.res as string[]).join(', '),
        }));
      }

      if (res.status === 'fulfilled') {
        setError?.((el) => ({
          ...el,
          inputBodyValidVariable: '',
        }));
        setBody?.(res.res as string);

        if (selectBody === 'json') {
          checkJson(res.res as string);
        }
      }
    } else {
      setError?.((el) => ({
        ...el,
        inputBodyValidVariable: '',
      }));
      setBody?.(inputBody);

      if (selectBody === 'json') {
        checkJson(inputBody);
      }
    }
  }, [inputBody, selectBody, setBody, setError, variables]);

  useEffect(() => {
    setHeaders?.((val) => {
      const arr = [...val];
      const index = arr.findIndex(
        (el) =>
          el.key === 'Content-Type' &&
          (el.value === 'application/json' || 'text/plain')
      );

      if (index < 0 && selectBody !== 'none') {
        return [
          ...arr,
          {
            key: 'Content-Type',
            value: selectBody === 'json' ? 'application/json' : 'text/plain',
          },
        ];
      }

      if (index >= 0 && selectBody !== 'none') {
        arr[index] = {
          key: 'Content-Type',
          value: selectBody === 'json' ? 'application/json' : 'text/plain',
        };
      }

      if (selectBody === 'none' && index >= 0) {
        arr.splice(index, 1);
      }

      return arr;
    });
  }, [selectBody, setHeaders]);

  const handleSelectBody = (value: string) => {
    setShowBody(value !== 'none');
    setSelectBody(value);

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
        <h3>Body: </h3>
        <Select
          value={selectBody}
          className={styles.select}
          onChange={handleSelectBody}
          options={[
            { value: 'none', label: 'None' },
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
        &nbsp;{selectBody === 'json' && error?.errorBody && 'Invalid JSON.'}{' '}
        {(error?.inputBodyValidVariable || '').length > 0 &&
          `Non-existent variables: ${error?.inputBodyValidVariable}`}
      </Typography.Text>
    </div>
  );
};
