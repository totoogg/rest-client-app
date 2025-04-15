'use client';

import { LanguageSelect } from '@/shared/LanguageSelect';
import { LanguageSelectProps } from '@/i18n/model/types';
import { NavLink } from '@/shared/Link';
import { useTranslations } from 'next-intl';
import { Button, Divider, Flex } from 'antd';
import { signOut } from '@/shared/lib/auth';
import { useRouter } from 'next/navigation';
import { useUser } from '@/shared/lib/context';
import { MainLogo } from '@/shared/Logo';
import { MenuPopover } from '@/shared/MenuPopover';
import { Menu } from '@/shared/Menu';
import { useDevice } from '@/shared/hooks/use-device';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';
import { Link, Loader } from '@/shared';

export const Header = ({ locale }: LanguageSelectProps) => {
  const t = useTranslations();
  const router = useRouter();
  const user = useUser();
  const isMobile = useDevice();
  const [loader, setLoader] = useState(true);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    const handleScroll = () => {
      timer = setTimeout(() => setIsScrolled(window.scrollY > 10), 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setLoader(false);
  }, []);

  const handleSignOut = async () => {
    await signOut();

    router.push('/');
  };

  return (
    <header
      className={[styles.header, isScrolled ? styles.scroll : ''].join(' ')}
    >
      {loader && <Loader />}
      <>
        {user && isMobile && <MenuPopover />}

        <Flex
          gap="middle"
          justify="flex-start"
          align="flex-end"
          className={styles.menuWrapper}
        >
          {(!user || !isMobile) && (
            <Link href="/" className={isScrolled ? styles.logo : ''}>
              <MainLogo />
            </Link>
          )}

          {user && !isMobile && <Menu />}
        </Flex>
      </>

      <Flex gap="small" wrap="nowrap">
        <LanguageSelect locale={locale} />

        <Divider type="vertical" className="vertical-divider" />

        {user ? (
          <Button onClick={handleSignOut} shape="round">
            {t('navLink.sighOut')}
          </Button>
        ) : (
          <Flex className="auth-buttons" justify="flex-end" wrap="nowrap">
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
