'use client';
import { Typography } from 'antd';
const { Link } = Typography;

type LinkProps = {
  href: string;
  text: string;
};

const MyLink = ({ href, text }: LinkProps) => {
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

export default MyLink;
