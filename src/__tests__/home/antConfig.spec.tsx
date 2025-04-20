import { render } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import * as antd from 'antd';
import { AntdConfigProvider } from '@/shared/config/antd/index';
import React from 'react';

beforeEach(() => {
  vi.mock('antd', () => ({
    ConfigProvider: vi.fn(({ children }) => children),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('AntdConfigProvider component', () => {
  it('theme configuration to ConfigProvider', () => {
    const mockConfigProvider = vi.spyOn(antd, 'ConfigProvider');

    render(
      <AntdConfigProvider>
        <div>Test</div>
      </AntdConfigProvider>
    );

    const expectedTheme = {
      components: {
        Select: {
          colorBgContainer: '#722ed1',
          colorBgElevated: '#722ed1',
          colorText: '#fff',
          optionSelectedBg: '#ffadd2',
        },
      },
      token: {
        colorPrimary: '#722ed1',
        borderRadius: 6,
        colorLink: '#722ed1',
        fontSize: 16,
      },
    };

    expect(mockConfigProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        theme: expectedTheme,
      }),
      undefined
    );
  });

  it('render children', () => {
    const { getByText } = render(
      <AntdConfigProvider>
        <div data-testid="test-child">Test Content</div>
      </AntdConfigProvider>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('custom theme', () => {
    const mockConfigProvider = vi.spyOn(antd, 'ConfigProvider');

    render(
      <AntdConfigProvider>
        <div />
      </AntdConfigProvider>
    );

    const themeConfig = mockConfigProvider.mock.calls[0][0].theme;

    expect(themeConfig).toMatchObject({
      token: expect.any(Object),
      components: expect.any(Object),
    });
  });
});
