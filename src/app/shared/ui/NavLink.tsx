type NavLinkProps = {
  text: string;
};
const NavLink = ({ text }: NavLinkProps) => {
  return <span className="nav-link">{text}</span>;
};

export default NavLink;
