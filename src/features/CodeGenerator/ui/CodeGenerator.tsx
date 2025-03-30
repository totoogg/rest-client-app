'use client';

import { Select, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import styles from './CodeGenerator.module.css';
import { RestClientContext } from '@/shared';
import { languages } from '../consts/languages';
import { convert } from 'postman-code-generators';
import { Request } from 'postman-collection';

export const CodeGenerator = () => {
  const { method, url, body, headers, error } = useContext(RestClientContext);
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
        header: headers,
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
  }, [body, headers, method, selectCodeGenerate, url]);

  const handleCode = (value: string) => {
    setShowCodeGenerate(value !== 'none');
    setSelectCodeGenerate(value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h3>Code: </h3>
        <Select
          defaultValue="none"
          className={styles.select}
          onChange={handleCode}
          options={[
            { value: 'none', label: 'None' },
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
        <div>
          {url &&
          error?.headersValidVariable.length === 0 &&
          error?.inputBodyValidVariable.length === 0 &&
          error?.inputValidVariable.length === 0 ? (
            <code className={styles.code}>
              <pre>{codeGenerate}</pre>
            </code>
          ) : (
            <Typography.Text type="danger">
              &nbsp;{error?.inputValid && 'Fill in the URL.'}{' '}
              {(error?.inputBodyValidVariable || '').length > 0 &&
                `Incorrect variables in body.`}{' '}
              {(error?.inputValidVariable || '').length > 0 &&
                `Incorrect variables in URL.`}{' '}
              {(error?.headersValidVariable || '').length > 0 &&
                `Incorrect variables in headers.`}
            </Typography.Text>
          )}
        </div>
      )}
    </div>
  );
};
