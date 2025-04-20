import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import LocaleLayout from '../../app/layout';
import LocaleLayout1 from '../../app/[locale]/layout';
import { act } from 'react';
import { LanguageSelectProps } from '@/i18n/model/types';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
const mockParams = (locale: string) =>
  Promise.resolve({ locale }) as Promise<LanguageSelectProps>;
const mockChildren = <div data-testid="content">Test Content</div>;

beforeEach(() => {
  vi.mock('@ant-design/nextjs-registry', () => ({
    AntdRegistry: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="antd-registry">{children}</div>
    ),
  }));

  vi.mock('next-intl', () => ({
    hasLocale: vi.fn(),
    NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="intl-provider">{children}</div>
    ),
  }));

  vi.mock('@/shared/config/antd', () => ({
    AntdConfigProvider: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="antd-config">{children}</div>
    ),
  }));

  vi.spyOn(console, 'error').mockReturnValue();

  vi.mock('next/navigation', () => ({
    notFound: vi.fn(),
  }));

  vi.mock('@/widgets', () => ({
    Header: ({ locale }: { locale: string }) => (
      <header data-testid="header">Header ({locale})</header>
    ),
    Footer: () => <footer data-testid="footer">Footer</footer>,
  }));

  vi.mock('@/shared/lib/context', () => ({
    UserProvider: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="user-provider">{children}</div>
    ),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('LocaleLayout', () => {
  it('should render children correctly', async () => {
    const { container } = render(
      <LocaleLayout>
        <div>Test Content</div>
      </LocaleLayout>
    );

    await whenStable();

    await waitFor(() => {
      expect(container.querySelectorAll('div').length).toEqual(0);
    });
  });
});

describe('LocaleLayout1', () => {
  it('should render children correctly', async () => {
    const { container } = render(
      await LocaleLayout1({
        children: mockChildren,
        params: mockParams('en'),
      })
    );

    await whenStable();

    await waitFor(() => {
      expect(container.querySelectorAll('div').length).toEqual(3);
    });
  });
});
