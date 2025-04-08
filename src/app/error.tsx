'use client';

import { Loader } from '@/shared';
import { NavLink } from '@/shared/Link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(false);
  }, []);

  return (
    <main>
      {loader && <Loader />}
      <h2>{error.name}</h2>
      <h2>{t('error.happen')}</h2>
      <NavLink onClick={() => reset()} text={t('error.try')} />
    </main>
  );
}
