import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ErrorPage from '../../app/error';
import { usePathname } from 'next/navigation';

const mockReset = vi.fn();
const mockError = {
  name: 'Test Error',
  message: 'Test error message',
  digest: '123',
};

beforeEach(() => {
  vi.mocked(usePathname).mockReturnValue('/en/some-page');
  vi.mock('next-intl', () => ({
    useTranslations: vi.fn(() => (key: string) => key),
  }));

  vi.mock('next/navigation', () => ({
    usePathname: vi.fn(),
  }));

  vi.mock('@/shared', () => ({
    Loader: () => <div data-testid="loader" />,
  }));

  vi.mock('@/shared/Link', () => ({
    NavLink: ({ onClick, text }: { onClick: () => void; text: string }) => (
      <button onClick={onClick}>{text}</button>
    ),
  }));
  vi.spyOn(console, 'error').mockReturnValue();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('ErrorPage page', () => {
  it('render', async () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);

    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.getByText('error.happen')).toBeInTheDocument();
    expect(screen.getByText('error.try')).toBeInTheDocument();
  });

  it('button click', async () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);

    fireEvent.click(screen.getByText('error.try'));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('remove loader', async () => {
    const { queryByTestId } = render(
      <ErrorPage error={mockError} reset={mockReset} />
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('set correct lang', async () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);

    const htmlElement = document.querySelector('html');
    expect(htmlElement).toHaveAttribute('lang', '/en');
  });

  it('empty pathname', async () => {
    vi.mocked(usePathname).mockReturnValue('');
    render(<ErrorPage error={mockError} reset={mockReset} />);

    const htmlElement = document.querySelector('html');
    expect(htmlElement).toHaveAttribute('lang', '');
  });
});
