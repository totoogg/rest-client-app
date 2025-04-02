'use client';

import { Link } from '@/i18n/navigation';
import { LanguageSelect } from '@/shared/LanguageSelect';
import { MainLogo } from '@/shared/Logo';
import { LanguageSelectProps } from '@/i18n/model/types';
import { NavLink } from '@/shared/Link';
import { useTranslations } from 'next-intl';
import { Button, Divider, Flex } from 'antd';
import { signOut } from '@/shared/lib/auth';
import { useRouter } from 'next/navigation';
import { useUser } from '@/shared/lib/context';

export const Header = ({ locale }: LanguageSelectProps) => {
  const t = useTranslations();
  const router = useRouter();
  const user = useUser();

  const handleSignOut = async () => {
    await signOut();

    router.push('/auth/sign-in');
  };

  return (
    <header>
      <Link href="/">
        <MainLogo />
      </Link>

      <Flex gap="small" wrap>
        <LanguageSelect locale={locale} />

        <Divider type="vertical" className="vertical-divider" />

        {user ? (
          <Button onClick={handleSignOut} shape="round">
            {t('navLink.sighOut')}
          </Button>
        ) : (
          <Flex className="auth-buttons" justify="flex-end">
            <Link href="/auth/sign-up">
              <NavLink text={t('navLink.signUp')} variant="link" />
            </Link>

            <Link href="/auth/sign-in">
              <NavLink text={t('navLink.signIn')} shape="round" />
            </Link>
          </Flex>
        )}
      </Flex>
    </header>
  );
};

Header.displayName = 'Header';
