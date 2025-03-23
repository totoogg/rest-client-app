import { Button } from 'antd';

type NavLinkProps = {
  text: string;
};
const NavLink = ({ text }: NavLinkProps) => {
  return (
    <Button color="default" variant="filled">
      {text}
    </Button>
  );
};

export default NavLink;
