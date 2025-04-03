'use client';

import React from 'react';
import { Button, Form, Input, Typography, Card, Divider, Flex } from 'antd';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { createYupSync } from '@/shared/util/createYupSync';
import * as yup from 'yup';

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

export const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
  title,
  schema,
  fields,
  onSubmitAction,
  loading,
  error,
}) => {
  const t = useTranslations();
  const router = useRouter();
  const [form] = Form.useForm();

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
            {type === 'password' ? <Input.Password /> : <Input />}
          </Form.Item>
        ))}

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
