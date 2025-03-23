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
      <Link href={href} target="_blank" className="custom-link">
        {text}
      </Link>
    </>
  );
};

export default MyLink;
