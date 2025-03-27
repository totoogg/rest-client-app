import {Link} from '@/i18n/navigation';
import { LanguageSelect } from '@/shared/LanguageSelect';
import { MainLogo } from '@/shared/Logo';
import { LanguageSelectProps } from '@/i18n/model/types';
import { NavLink } from '@/shared/Link';
import { useTranslations } from 'next-intl';

const authentication: boolean = false;

export const Header = ({ locale }:  LanguageSelectProps ) => {
  const t = useTranslations();
  return (
    <header>
      <Link href="/">
        <MainLogo />
      </Link>
      <LanguageSelect locale={locale}/>
      {authentication ? (
        <Link href="/auth/sign-out">
          <NavLink text={t('navLink.sighOut')} />
        </Link>
      ) : (
        <>
          <Link href="/auth/sign-in">
            <NavLink text={t('navLink.signIn')} />
          </Link>
          <Link href="/auth/sign-up">
            <NavLink text={t('navLink.signUp')} />
          </Link>
        </>
      )}
    </header>
  );
};

Header.displayName = 'Header';
