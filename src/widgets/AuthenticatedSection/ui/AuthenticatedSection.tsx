'use client';

import { NavLink } from '@/shared/Link';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useUser } from '@/shared/lib/context';

export const AuthenticatedSection = () => {
  const t = useTranslations();
  const user = useUser();

  const username = user || 'Custom Username';

  return (
    <>
      <h2>
        {t('homePage.startMessageUser')},
        <span className="span-username">{username}</span>!
      </h2>
      <div className="buttons-block">
        <Link href="/rest-client">
          <NavLink text={t('navLink.restClient')} />
        </Link>
        <Link href="/history">
          <NavLink text={t('navLink.history')} />
        </Link>
        <Link href="/variables">
          <NavLink text={t('navLink.variables')} />
        </Link>
      </div>
    </>
  );
};
