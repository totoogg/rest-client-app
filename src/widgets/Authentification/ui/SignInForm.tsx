'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/shared/lib/auth';
import * as yup from 'yup';
import { FormField } from '@/widgets/Authentification/enums/form-field';
import { AuthenticationForm } from '@/shared/Form';
import { useTranslations } from 'next-intl';

const signInSchema = yup.object().shape({
  [FormField.Email]: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  [FormField.Password]: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Za-z]/, 'Password must contain at least one letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
});

export const SignInForm: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: Record<string, string>) => {
    setLoading(true);
    setError(undefined);

    try {
      const { email, password } = data;
      const token = await signIn(email, password);
      if (token) {
        router.push('/');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthenticationForm
      title={t('navLink.signIn')}
      schema={signInSchema}
      fields={[
        { name: FormField.Email, label: t('auth.email'), type: 'text' },
        {
          name: FormField.Password,
          label: t('auth.password'),
          type: 'password',
        },
      ]}
      onSubmitAction={onSubmit}
      loading={loading}
      error={error}
    />
  );
};
