import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Menu } from '@/shared/Menu';
import * as antd from 'antd';
import * as navigator from 'next/navigation';

beforeEach(() => {
  vi.spyOn(console, 'error').mockReturnValue();
  vi.mock('next-intl', () => ({
    useTranslations: vi.fn(() => (key: string) => {
      const translations: Record<string, string> = {
        'navLink.restClient': 'REST Client',
        'navLink.history': 'History',
        'navLink.variables': 'Variables',
      };
      return translations[key];
    }),
  }));

  vi.mock('next/navigation', async () => {
    const actual = await vi.importActual('next/navigation');
    return {
      ...actual,
      usePathname: vi.fn(),
    };
  });

  vi.mock('@/shared/CustomLink', () => ({
    Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a data-testid="custom-link" href={href}>
        {children}
      </a>
    ),
  }));

  vi.mock('antd', () => ({
    Menu: vi.fn(({ items, onClick, selectedKeys, mode }) => (
      <div
        data-testid="antd-menu"
        data-mode={mode}
        data-selected={selectedKeys}
      >
        {items?.map((item: { key: string; label: string }) => (
          <button
            key={item.key}
            onClick={() => onClick?.({ key: item.key })}
            data-selected={selectedKeys.includes(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
    )),
    Typography: {
      Text: ({ children }: { children: React.ReactNode }) => (
        <span>{children}</span>
      ),
    },
  }));
  vi.spyOn(antd, 'Menu');
  vi.spyOn(navigator, 'usePathname').mockReturnValue('/en/rest-client');
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Menu component', () => {
  it('render', () => {
    render(<Menu />);

    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
  });

  it('correct selected', () => {
    vi.spyOn(navigator, 'usePathname').mockReturnValue('/en/history');
    render(<Menu />);

    const selectedButton = screen.getByText('History').closest('button');
    expect(selectedButton).toHaveAttribute('data-selected', 'true');
  });

  it('update selected', () => {
    render(<Menu />);

    const historyButton = screen.getByText('History');
    fireEvent.click(historyButton);

    const updatedButton = historyButton.closest('button');
    expect(updatedButton).toHaveAttribute('data-selected', 'true');
  });

  it('correct props to AntdMenu', () => {
    render(<Menu mode="vertical" />);

    const menu = screen.getByTestId('antd-menu');
    expect(menu).toHaveAttribute('data-mode', 'vertical');
    expect(menu).toHaveAttribute('data-selected', 'rest-client');
  });

  it('correct links', () => {
    render(<Menu />);

    const links = screen.getAllByTestId('custom-link');
    expect(links[0]).toHaveAttribute('href', '/rest-client');
    expect(links[1]).toHaveAttribute('href', '/history');
    expect(links[2]).toHaveAttribute('href', '/variables');
  });

  it('should handle root path correctly', () => {
    vi.spyOn(navigator, 'usePathname').mockReturnValue('/en');
    render(<Menu />);

    const menu = screen.getByTestId('antd-menu');
    expect(menu).toHaveAttribute('data-selected', '');
  });
});
