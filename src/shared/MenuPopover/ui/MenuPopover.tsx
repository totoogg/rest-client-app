import React, { useState } from 'react';
import { Drawer, Flex } from 'antd';
import { Menu } from '@/shared/Menu/ui/Menu';
import { Link } from '@/i18n/navigation';
import { MainLogo } from '@/shared/Logo';
import { MenuOutlined } from '@ant-design/icons';

export const MenuPopover = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuOutlined onClick={showDrawer} style={{ fontSize: '40px' }} />
      <Drawer
        title={
          <Flex justify="center" align="center" gap="middle">
            <Link href="/">
              <MainLogo />
            </Link>
            <span>RENDER CREW</span>
          </Flex>
        }
        placement="top"
        onClose={onClose}
        open={open}
      >
        <Flex justify="center" align="center" gap="middle">
          <Menu mode="vertical" />
        </Flex>
      </Drawer>
    </>
  );
};
