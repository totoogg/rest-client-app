import { NavLink } from '@/shared/Link';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const AuthenticatedSection = () => {
  const t = useTranslations();
  const username = 'Custom Username';
  return (
    <>
      <h2>
        {t('homePage.startMessageUser')},
        <span className="span-username">{username}</span>!
      </h2>
      <div className="buttons-block">
        <Link href="/auth/sign-in">
          <NavLink text={t('navLink.restClient')} />
        </Link>
        <Link href="/auth/sign-in">
          <NavLink text={t('navLink.history')} />
        </Link>
        <Link href="/auth/sign-in">
          <NavLink text={t('navLink.variables')} />
        </Link>
      </div>
    </>
  );
};
