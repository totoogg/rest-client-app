import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NotFound } from '@/widgets';
import * as path from 'next/navigation';

beforeEach(() => {
  vi.mock('next-intl', () => ({
    useTranslations: vi.fn(() => (key: string) => {
      const translations: { [key: string]: string } = {
        'error.notFound': 'Not Found',
        'error.notResource': 'Could not find requested resource',
        'error.return': 'Return Home',
      };
      return translations[key];
    }),
  }));

  vi.mock('next/navigation', async () => {
    const actual = await vi.importActual('next/navigation');
    return {
      ...actual,
      usePathname: vi.fn(() => '/en/page'),
    };
  });

  vi.mock('@/shared/Loader', () => ({
    Loader: () => <div data-testid="loader">Loading...</div>,
  }));

  vi.mock('@/shared/Link', () => ({
    NavLink: ({ text }: { text: string }) => (
      <button data-testid="nav-link">{text}</button>
    ),
  }));

  vi.mock('next/link', () => ({
    default: ({
      children,
      href,
    }: {
      children: React.ReactNode;
      href: string;
    }) => (
      <a data-testid="link" href={href}>
        {children}
      </a>
    ),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('NotFound component', () => {
  it('render loader ', async () => {
    const { queryByTestId } = render(<NotFound />);

    await waitFor(() => {
      expect(queryByTestId('loader')).not.toBeInTheDocument();
    });
  });

  it('display error messages', () => {
    render(<NotFound />);

    expect(screen.getByText('Not Found')).toBeInTheDocument();
    expect(
      screen.getByText('Could not find requested resource')
    ).toBeInTheDocument();
  });

  it('render return link', () => {
    render(<NotFound />);

    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('href', '/en');
    expect(screen.getByTestId('nav-link')).toHaveTextContent('Return Home');
  });

  it('pathname', () => {
    vi.spyOn(path, 'usePathname').mockReturnValue('/es/catalog/item123');
    render(<NotFound />);

    expect(screen.getByTestId('link')).toHaveAttribute('href', '/es');
  });
});
