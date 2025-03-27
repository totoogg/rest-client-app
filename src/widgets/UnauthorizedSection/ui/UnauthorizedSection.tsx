import { NavLink } from '@/shared/Link';
import {useTranslations} from 'next-intl';
import Link from 'next/link';

export const UnauthorizedSection = () => {
  const  t  = useTranslations();
  return (
    <>
      <h2>{t('homePage.startMessage')}</h2>
      <div className="buttons-block">
        <Link href="/auth/sign-in">
          <NavLink text={t('navLink.signIn')} />
        </Link>
        <Link href="/auth/sign-up">
          <NavLink text={t('navLink.signUp')} />
        </Link>
      </div>
    </>
  );
};
