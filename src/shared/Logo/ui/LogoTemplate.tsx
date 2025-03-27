'use client';

import Icon from '@ant-design/icons';
import { FC } from 'react';
import { LogoProps } from '../model/types';

const LogoTemplate: FC<LogoProps> = ({ icon, size = 32, width, height }) => {
  return (
    <Icon
      className="link-svg-icon"
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
