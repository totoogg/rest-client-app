import { LangToggle } from '@/shared/LangToggle/index';
import { MainLogo } from '@/shared/Logo/index';
import { NavLink } from '@/shared/Link/index';
import Link from 'next/link';

export const Header = () => {
  return (
    <header>
      <h1>Header</h1>
      <Link href="/">
        <MainLogo />
      </Link>
      <LangToggle />
      <Link href="/auth/sign-in">
        <NavLink text="Sign In" />
      </Link>
      <Link href="/auth/sign-up">
        <NavLink text="Sign Up" />
      </Link>
    </header>
  );
};

Header.displayName = 'Header';
