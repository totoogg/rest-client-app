'use client';

import Icon from '@ant-design/icons';
import { FC, ReactElement } from 'react';

interface LogoProps {
  icon: ReactElement;
  size?: number;
  width?: number;
  height?: number;
}

const LogoTemplate: FC<LogoProps> = ({ icon, size = 32, width, height }) => {
  return (
    <Icon
      component={() => icon}
      style={{
        fontSize: `${size}px`,
        width: width ? `${width}px` : `${size}px`,
        height: height ? `${height}px` : `${size}px`,
      }}
    />
  );
};

export default LogoTemplate;
