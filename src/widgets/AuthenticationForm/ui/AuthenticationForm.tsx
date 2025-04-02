'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/shared/lib/auth';
import { Button, Form, FormProps, Input } from 'antd';
import { useTranslations } from 'next-intl';
import Title from 'antd/lib/typography/Title';

type FieldType = {
  email: string;
  password: string;
};

export const AuthenticationForm = ({ isSignUp }: { isSignUp: boolean }) => {
  const t = useTranslations();
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoading(true);
    setError(undefined);

    try {
      const { email, password } = values;
      let token: string | undefined;

      if (isSignUp) {
        token = await signUp(email, password);
      } else {
        token = await signIn(email, password);
      }

      if (token) {
        router.push('/');
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Title level={2}>
        {t(isSignUp ? 'navLink.signUp' : 'navLink.signIn')}
      </Title>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {t(isSignUp ? 'navLink.signUp' : 'navLink.signIn')}
          </Button>
        </Form.Item>
      </Form>

      {error}

      <p>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <Button
          type="link"
          onClick={() =>
            router.push(`/auth/${isSignUp ? 'sign-in' : 'sign-up'}`)
          }
        >
          {t(isSignUp ? 'navLink.signIn' : 'navLink.signUp')}
        </Button>
      </p>
    </div>
  );
};
