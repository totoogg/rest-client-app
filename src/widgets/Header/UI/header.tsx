import LangToggle from '../../../shared/LangToggle/LangToggle';
// import Logo from '../shared/Logo/logo';
import Logo from '../../../shared/LogoComponents/Logo';
import NavLink from '../../../shared/ui/NavLink';
import Link from 'next/link';

export const Header = () => {
  return (
    <header>
      <h1>Header</h1>
      <Link href="/">
        <Logo />
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
// export default Header;
