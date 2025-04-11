'use client';

import { Loader } from '@/shared';
import { NavLink } from '@/shared/Link';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const NotFound = () => {
  const t = useTranslations();
  const [loader, setLoader] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoader(false);
  }, []);

  return (
    <main>
      {loader && <Loader />}
      <h2>{t('error.notFound')}</h2>
      <h2>{t('error.notResource')}</h2>

      <Link href={pathname.slice(0, 3)}>
        <NavLink text={t('error.return')} />
      </Link>
    </main>
  );
};
