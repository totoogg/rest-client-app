'use client';

import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { FC, useContext, useEffect, useState } from 'react';
import styles from './Headers.module.css';
import { RestClientContext } from '@/shared';
import { IHeadersProps } from '../model/HeadersTypes';
import { useTranslations } from 'next-intl';
import { useStartHeaders, useValidVariable } from '../lib';

export const Headers: FC<IHeadersProps> = ({ searchParams }) => {
  const { error, headers } = useContext(RestClientContext);
  const t = useTranslations();
  const [form] = useForm();
  const [headersInput, setHeadersInput] = useState<
    { key: string; value: string }[]
  >([]);

  const { startHeaders } = useStartHeaders(searchParams);
  useValidVariable(headersInput);

  useEffect(() => {
    setHeadersInput(startHeaders as { key: string; value: string }[]);
    form.setFieldsValue({ headers: startHeaders });
  }, [form, startHeaders]);

  useEffect(() => {
    form.setFieldsValue({ headers });
  }, [form, headers]);

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
            `${t('restClient.errorVariable')}: ${error?.headersValidVariable}`}
        </Typography.Text>
      </Form>
    </>
  );
};
