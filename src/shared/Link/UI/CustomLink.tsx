'use client';
import { Typography } from 'antd';
import { CustomLinkProps } from '../model/types';
const { Link } = Typography;

export const CustomLink = ({ href, text }: CustomLinkProps) => {
  return (
    <>
      <Link href={href} target="_blank" strong>
        {text}
      </Link>
    </>
  );
};
