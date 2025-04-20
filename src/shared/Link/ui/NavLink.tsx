import { Button } from 'antd';
import { NavLinkProps } from '../model/types';

export const NavLink = ({ text, ...props }: NavLinkProps) => {
  return (
    <Button color="primary" variant="solid" {...props}>
      {text}
    </Button>
  );
};
