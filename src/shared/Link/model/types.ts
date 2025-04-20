import { ButtonProps } from 'antd';

export type CustomLinkProps = {
  href: string;
  text: string;
};

export interface NavLinkProps extends ButtonProps {
  text: string;
}
