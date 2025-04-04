'use client';

import React, { useCallback, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Typography,
  Card,
  Divider,
  Flex,
  Rate,
} from 'antd';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { createYupSync } from '@/shared/util/createYupSync';
import * as yup from 'yup';
import { evaluatePasswordStrength } from '@/shared/util/evaluatePasswordStrength';

const { Text } = Typography;

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'password';
}

interface AuthenticationFormProps {
  title: string;
  schema: yup.ObjectSchema<yup.AnyObject>;
  fields: FormField[];
  onSubmitAction: (data: Record<string, string>) => Promise<void>;
  loading: boolean;
  error?: string;
}

export const AuthenticationForm = ({
  title,
  schema,
  fields,
  onSubmitAction,
  loading,
  error,
}: AuthenticationFormProps) => {
  const t = useTranslations();
  const router = useRouter();
  const [form] = Form.useForm();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const password = Form.useWatch('password', form);

  const changePasswordStrength = useCallback(
    () => setPasswordStrength(evaluatePasswordStrength(password)),
    [password]
  );

  return (
    <Card title={title} variant="borderless">
      <Form
        name="auth-form"
        form={form}
        layout="vertical"
        style={{ width: 400 }}
        onFinish={onSubmitAction}
        autoComplete="off"
      >
        {fields.map(({ name, label, type }) => (
          <Form.Item
            key={name}
            label={label}
            name={name}
            rules={[createYupSync(schema, name, form.getFieldsValue)]}
          >
            {type === 'password' ? (
              <Input.Password onChange={changePasswordStrength} />
            ) : (
              <Input />
            )}
          </Form.Item>
        ))}

        {title === t('navLink.signUp') && (
          <Form.Item label={null}>
            <Rate disabled count={5} value={passwordStrength} />
          </Form.Item>
        )}

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {title}
          </Button>
        </Form.Item>
      </Form>

      {error && <Text type="danger">{error}</Text>}
      <Divider />

      <Flex justify="flex-end" align="center" gap="middle">
        {title === t('navLink.signIn') ? (
          <>
            {t('auth.noAccount')}
            <Button type="link" onClick={() => router.push('/auth/sign-up')}>
              {t('navLink.signUp')}
            </Button>
          </>
        ) : (
          <>
            {t('auth.haveAccount')}
            <Button type="link" onClick={() => router.push('/auth/sign-in')}>
              {t('navLink.signIn')}
            </Button>
          </>
        )}
      </Flex>
    </Card>
  );
};
