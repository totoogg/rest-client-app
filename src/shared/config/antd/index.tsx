'use client';

import { ConfigProvider } from 'antd';
import React from 'react';

const COLORS = {
  primary: '#722ed1',
  selected: '#ffadd2',
  textLight: '#fff',
};

export const AntdConfigProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorBgContainer: COLORS.primary,
            colorBgElevated: COLORS.primary,
            colorText: COLORS.textLight,
            optionSelectedBg: COLORS.selected,
          },
        },
        token: {
          colorPrimary: COLORS.primary,
          borderRadius: 6,
          colorLink: COLORS.primary,
          fontSize: 16,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
