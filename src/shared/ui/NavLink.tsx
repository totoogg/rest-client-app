import { Button } from 'antd';

type NavLinkProps = {
  text: string;
};
const NavLink = ({ text }: NavLinkProps) => {
  return (
    <Button color="purple" variant="filled" value="large">
      {text}
    </Button>
  );
};

export default NavLink;
