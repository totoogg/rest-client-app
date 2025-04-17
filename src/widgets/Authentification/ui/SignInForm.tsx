'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/shared/lib/auth';
import * as yup from 'yup';
import { FormField } from '@/widgets/Authentification/enums/form-field';
import { AuthenticationForm } from '@/shared/Form';
import { useTranslations } from 'next-intl';

export const SignInForm: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const signInSchema = useMemo(
    () =>
      yup.object().shape({
        [FormField.Email]: yup
          .string()
          .email(t('auth.invalidEmail'))
          .required(t('auth.required')),
        [FormField.Password]: yup
          .string()
          .min(8, t('auth.passwordMin'))
          .matches(/[A-Za-z]/, t('auth.passwordLetter'))
          .matches(/[0-9]/, t('auth.passwordNumber'))
          .matches(/[^A-Za-z0-9]/, t('auth.passwordSpecial'))
          .required(t('auth.required')),
      }),
    [t]
  );

  const onSubmit = async (data: Record<string, string>) => {
    setLoading(true);
    setError(undefined);

    try {
      const { email, password } = data;
      const token = await signIn(email, password);
      if (token) {
        router.refresh();
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
