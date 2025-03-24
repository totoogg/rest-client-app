'use client';
import { Typography } from 'antd';
import { CustomLinkProps } from '../model/types';
const { Link } = Typography;

export const CustomLink = ({ href, text }: CustomLinkProps) => {
  return (
    <>
      <Link
        href={href}
        target="_blank"
        className="custom-link"
        style={{
          color: '#f940ff',
          padding: '8px 12px',
        }}
      >
        {text}
      </Link>
    </>
  );
};
