'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/shared/lib/auth';
import * as yup from 'yup';
import { FormField } from '@/widgets/Authentification/enums/form-field';
import { AuthenticationForm } from '@/shared/Form';
import { useTranslations } from 'next-intl';

const signUpSchema = yup.object().shape({
  [FormField.Email]: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  [FormField.FirstName]: yup.string().required('First name is required'),
  [FormField.LastName]: yup.string().required('Last name is required'),
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
  [FormField.ConfirmPassword]: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: Record<string, string>) => {
    setLoading(true);
    setError(undefined);

    try {
      const { email, password, firstName, lastName } = data;
      const token = await signUp(email, password, `${firstName} ${lastName}`);
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
      title={t('navLink.signUp')}
      schema={signUpSchema}
      fields={[
        { name: FormField.FirstName, label: t('auth.firstName'), type: 'text' },
        { name: FormField.LastName, label: t('auth.lastName'), type: 'text' },
        { name: FormField.Email, label: t('auth.email'), type: 'text' },
        {
          name: FormField.Password,
          label: t('auth.password'),
          type: 'password',
        },
        {
          name: FormField.ConfirmPassword,
          label: t('auth.confirmPassword'),
          type: 'password',
        },
      ]}
      onSubmitAction={onSubmit}
      loading={loading}
      error={error}
    />
  );
};
