'use client';

import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { FC, useContext, useEffect, useState } from 'react';
import styles from './Headers.module.css';
import { regExp, replaceVariable, RestClientContext } from '@/shared';
import { IHeadersProps } from '../model/HeadersTypes';
import { useTranslations } from 'next-intl';

export const Headers: FC<IHeadersProps> = ({ searchParams }) => {
  const { setHeaders, setError, variables, error, headers } =
    useContext(RestClientContext);
  const t = useTranslations();
  const [form] = useForm();
  const [headersInput, setHeadersInput] = useState<
    { key: string; value: string }[]
  >([]);

  useEffect(() => {
    if (Object.keys(searchParams).length > 0) {
      const headersArr = Object.entries(searchParams)
        .map((el) => {
          if (Array.isArray(el[1])) {
            return el[1].map((val) => ({
              key: decodeURIComponent(el[0]),
              value: decodeURIComponent(val),
            }));
          }

          return {
            key: decodeURIComponent(el[0] as string),
            value: decodeURIComponent(el[1] as string),
          };
        })
        .flat();

      setHeaders?.(headersArr as { key: string; value: string }[]);
      setHeadersInput(headersArr as { key: string; value: string }[]);
      form.setFieldsValue({ headers: headersArr });
    }
  }, [form, searchParams, setHeaders]);

  useEffect(() => {
    form.setFieldsValue({ headers });
  }, [form, headers]);

  useEffect(() => {
    const headersStr = headersInput.map((el) => Object.values(el)).join(', ');

    if (regExp.test(headersStr)) {
      const res = replaceVariable(headersStr, variables, regExp);
      if (res.status === 'error') {
        setError?.((error) => ({
          ...error,
          headersValidVariable: (res.res as string[]).join(', '),
        }));
      }

      if (res.status === 'fulfilled') {
        setError?.((error) => ({
          ...error,
          headersValidVariable: '',
        }));
        setHeaders?.(
          (res.res as string)
            .split(', ')
            .map((el) => el.split(','))
            .map((el) => ({ key: el[0], value: el[1] }))
        );
      }
    } else {
      setError?.((error) => ({
        ...error,
        headersValidVariable: '',
      }));
      setHeaders?.(headersInput);
    }
  }, [headersInput, setError, setHeaders, variables]);

  const handleChangeHeader = () => {
    const headers = form
      .getFieldsValue(['headers', 'key', 'value'])
      .headers.map(
        (el: { key: string | undefined; value: string | undefined }) => {
          const obj = el ?? {};

          return {
            key: obj.key ?? '',
            value: obj.value ?? '',
          };
        }
      );
    setHeadersInput(headers);
  };

  return (
    <>
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onChange={handleChangeHeader}
        className={styles.wrapper}
        autoComplete="off"
      >
        <Form.List name="headers">
          {(fields, { add, remove }) => (
            <div
              className={
                (error?.headersValidVariable || '').length > 0
                  ? styles.error
                  : ''
              }
            >
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  {t('restClient.headers')}
                </Button>
              </Form.Item>

              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className={styles['form-line']}>
                  <Form.Item
                    {...restField}
                    name={[name, 'key']}
                    className={styles['form-item']}
                  >
                    <Input placeholder="Key" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'value']}
                    className={styles['form-item']}
                  >
                    <Input placeholder="Value" />
                  </Form.Item>
                  <CloseOutlined
                    onClick={() => {
                      remove(name);
                      handleChangeHeader();
                    }}
                    className={styles.delete}
                  />
                </div>
              ))}
            </div>
          )}
        </Form.List>
        <Typography.Text type="danger">
          &nbsp;
          {(error?.headersValidVariable || '').length > 0 &&
            `${t('restClient.errorVariable')}}: ${error?.headersValidVariable}`}
        </Typography.Text>
      </Form>
    </>
  );
};
