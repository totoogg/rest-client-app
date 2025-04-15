'use client';

import { Loader } from '@/shared';
import { NavLink } from '@/shared/Link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();

  useEffect(() => {
    setLoader(false);
  }, []);

  return (
    <html lang={pathname.slice(0, 3)}>
      <body>
        <main>
          {loader && <Loader />}
          <h2>{error.name}</h2>
          <h2>{t('error.happen')}</h2>
          <NavLink onClick={() => reset()} text={t('error.try')} />
        </main>
      </body>
    </html>
  );
}
