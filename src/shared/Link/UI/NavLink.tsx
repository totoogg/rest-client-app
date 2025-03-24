import { Button } from 'antd';
import { NavLinkProps } from '../model/types';

export const NavLink = ({ text }: NavLinkProps) => {
  return (
    <Button color="purple" variant="filled" value="large">
      {text}
    </Button>
  );
};
