'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/shared/lib/auth';
import * as yup from 'yup';
import { FormField } from '@/widgets/Authentification/enums/form-field';
import { AuthenticationForm } from '@/shared/Form';
import { useTranslations } from 'next-intl';

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const signUpSchema = useMemo(
    () =>
      yup.object().shape({
        [FormField.Email]: yup
          .string()
          .email(t('auth.invalidEmail'))
          .required(t('auth.required')),
        [FormField.FirstName]: yup.string().required(t('auth.required')),
        [FormField.LastName]: yup.string().required(t('auth.required')),
        [FormField.Password]: yup
          .string()
          .min(8, t('auth.passwordMin'))
          .matches(/[A-Za-z]/, t('auth.passwordLetter'))
          .matches(/[0-9]/, t('auth.passwordNumber'))
          .matches(/[^A-Za-z0-9]/, t('auth.passwordSpecial'))
          .required(t('auth.required')),
        [FormField.ConfirmPassword]: yup
          .string()
          .oneOf([yup.ref('password')], t('auth.passwordsMatch'))
          .required(t('auth.required')),
      }),
    [t]
  );

  const onSubmit = async (data: Record<string, string>) => {
    setLoading(true);
    setError(undefined);

    try {
      const { email, password, firstName, lastName } = data;
      const token = await signUp(email, password, `${firstName} ${lastName}`);
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
