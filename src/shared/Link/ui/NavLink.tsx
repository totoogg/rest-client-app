import { Button } from 'antd';
import { NavLinkProps } from '../model/types';

export const NavLink = ({ text }: NavLinkProps) => {
  return (
    <Button color="primary" variant="solid">
      {text}
    </Button>
  );
};
