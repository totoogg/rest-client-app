'use client';

import { Input, Select, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import styles from './CodeGenerator.module.css';
import { RestClientContext } from '@/shared';
import { languages } from '../consts/languages';
import { convert } from 'postman-code-generators';
import { Request } from 'postman-collection';
import { useTranslations } from 'next-intl';

export const CodeGenerator = () => {
  const { method, url, body, headers, error } = useContext(RestClientContext);
  const t = useTranslations();
  const [showCodeGenerate, setShowCodeGenerate] = useState(false);
  const [selectCodeGenerate, setSelectCodeGenerate] = useState('none');
  const [codeGenerate, setCodeGenerate] = useState(``);

  useEffect(() => {
    const generateCode = () => {
      const options = {
        indentCount: 4,
        indentType: 'Space' as const,
        trimRequestBody: true,
        followRedirect: true,
      };

      const customRequest = new Request({
        url: url || '',
        method: method || 'GET',
        header: headers?.clear,
        body: body
          ? {
              mode: 'raw',
              raw: body,
            }
          : undefined,
      });

      convert(
        languages[selectCodeGenerate].lang,
        languages[selectCodeGenerate].variant,
        customRequest,
        options,
        (_, code) => {
          setCodeGenerate(code);
        }
      );
    };
    if (selectCodeGenerate !== 'none') {
      generateCode();
    }
  }, [body, headers?.clear, method, selectCodeGenerate, url]);

  const handleCode = (value: string) => {
    setShowCodeGenerate(value !== 'none');
    setSelectCodeGenerate(value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h3>{t('restClient.code')}: </h3>
        <Select
          defaultValue="none"
          className={styles.select}
          onChange={handleCode}
          options={[
            { value: 'none', label: `${t('restClient.none')}` },
            { value: 'fetch', label: 'JavaScript (Fetch api)' },
            { value: 'xhr', label: 'JavaScript (XHR)' },
            { value: 'node', label: 'NodeJS' },
            { value: 'python', label: 'Python' },
            { value: 'java', label: 'Java' },
            { value: 'csharp', label: 'C#' },
            { value: 'go', label: 'Go' },
          ]}
        />
      </div>
      {showCodeGenerate && (
        <div className={styles.code}>
          {url &&
          error?.headersValidVariable.length === 0 &&
          error?.inputBodyValidVariable.length === 0 &&
          error?.inputValidVariable.length === 0 ? (
            <Input.TextArea
              rows={10}
              value={codeGenerate}
              readOnly
              style={{
                resize: 'none',
              }}
            />
          ) : (
            <Typography.Text type="danger">
              &nbsp;{error?.inputValid && `${t('restClient.urlErrorFill')}.`}{' '}
              {(error?.inputBodyValidVariable || '').length > 0 &&
                `${t('restClient.codeErrorBody')}.`}{' '}
              {(error?.inputValidVariable || '').length > 0 &&
                `${t('restClient.codeErrorUrl')}.`}{' '}
              {(error?.headersValidVariable || '').length > 0 &&
                `${t('restClient.codeErrorHeaders')}.`}
            </Typography.Text>
          )}
        </div>
      )}
    </div>
  );
};
