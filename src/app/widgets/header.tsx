import LangToggle from '../shared/LangToggle/LangToggle';
// import Logo from '../shared/Logo/logo';
import Logo from '../shared/LogoComponents/Logo';
import NavLink from '../shared/ui/NavLink';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <h1>Header</h1>
      <Logo />
      <LangToggle />
      <Link href="auth/sign-in">
        <NavLink text="Sign In" />
      </Link>
      <Link href="auth/sign-un">
        <NavLink text="Sign Un" />
      </Link>
    </header>
  );
};

export default Header;
