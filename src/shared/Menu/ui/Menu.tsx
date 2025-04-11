'use client';

import { MenuProps, Typography } from 'antd';
import { Menu as AntdMenu } from 'antd';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import React, { ReactElement, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

const { Text } = Typography;

type MenuItem = {
  label: ReactElement;
  key: string;
};

interface Props {
  mode?: 'horizontal' | 'vertical';
}

export const Menu = ({ mode = 'horizontal' }: Props) => {
  const t = useTranslations();
  const pathname = usePathname();

  const items: MenuItem[] = useMemo(
    () => [
      {
        label: (
          <Link href="/rest-client">
            <Text strong>{t('navLink.restClient')}</Text>
          </Link>
        ),
        key: 'rest-client',
      },
      {
        label: (
          <Link href="/history">
            <Text strong>{t('navLink.history')}</Text>
          </Link>
        ),
        key: 'history',
      },
      {
        label: (
          <Link href="/auth/sign-in">
            <Text strong>{t('navLink.variables')}</Text>
          </Link>
        ),
        key: 'variables',
      },
    ],
    [t]
  );

  const defaultKey = useMemo(
    () => items.find(({ key }: MenuItem) => pathname.includes(key))?.key,
    [items, pathname]
  );

  const [current, setCurrent] = useState<string>(defaultKey || '');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <AntdMenu
      style={{ backgroundColor: 'transparent', border: 'none' }}
      onClick={onClick}
      selectedKeys={[current]}
      mode={mode}
      items={items}
    />
  );
};
