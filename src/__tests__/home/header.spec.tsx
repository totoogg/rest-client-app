import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Header } from '@/widgets';
import { useUser } from '@/shared/lib/context';
import * as device from '@/shared/hooks/use-device';
import { signOut } from '@/shared/lib/auth';
import * as router from 'next/navigation';

const mockUser = 'Test User';
const mockSignOut = vi.hoisted(() => vi.fn());
const mockPush = vi.fn();

beforeEach(() => {
  vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key,
  }));

  vi.mock('@/shared/lib/auth', () => ({
    signOut: vi.fn(),
  }));

  vi.mock('next/navigation', async () => {
    const actual = await vi.importActual('next/navigation');
    return {
      ...actual,
      useRouter: vi.fn(() => ({
        replace: vi.fn(),
        push: vi.fn(),
        prefetch: vi.fn(),
        refresh: vi.fn(),
        forward: vi.fn(),
        back: vi.fn(),
      })),
    };
  });

  vi.mock('@/shared/MenuPopover', () => ({
    MenuPopover: () => <div data-testid="menu-popover">Menu Popover</div>,
  }));

  vi.mock('@/shared/LanguageSelect', () => ({
    LanguageSelect: () => (
      <div data-testid="language-select">Language Select</div>
    ),
  }));

  vi.mock('@/shared/Menu', () => ({
    Menu: () => <div data-testid="menu">Menu</div>,
  }));

  vi.mock('@/shared/Logo', () => ({
    MainLogo: () => <div data-testid="main-logo">Main Logo</div>,
  }));

  vi.mock('@/shared/hooks/use-device', () => ({
    useDevice: vi.fn(() => ({ isMobile: false })),
  }));

  vi.mock('@/shared/lib/context', () => ({
    useUser: vi.fn(() => null),
  }));

  vi.spyOn(router, 'useRouter').mockImplementation(() => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
    refresh: vi.fn(),
    forward: vi.fn(),
    back: vi.fn(),
  }));
  vi.spyOn(device, 'useDevice').mockReturnValue(false);
  vi.mocked(useUser).mockReturnValue(null);
  vi.mocked(signOut).mockImplementation(mockSignOut);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Header component', () => {
  it('render', () => {
    vi.mocked(useUser).mockReturnValue(mockUser);
    vi.spyOn(device, 'useDevice').mockReturnValue(false);

    render(<Header locale="en" />);

    expect(
      screen.getByRole('link', { name: /main logo/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId('language-select')).toBeInTheDocument();
  });

  it('shows authorization buttons for unauthorized user', () => {
    vi.spyOn(device, 'useDevice').mockReturnValue(false);
    vi.mocked(useUser).mockReturnValue(null);

    render(<Header locale="en" />);

    expect(screen.getByText('navLink.signUp')).toBeInTheDocument();
    expect(screen.getByText('navLink.signIn')).toBeInTheDocument();
  });

  it('shows the logout button for the logged in user', () => {
    vi.mocked(useUser).mockReturnValue(mockUser);
    vi.spyOn(device, 'useDevice').mockReturnValue(false);

    render(<Header locale="en" />);

    expect(screen.getByText('navLink.sighOut')).toBeInTheDocument();
  });

  it('signOut', async () => {
    vi.mocked(useUser).mockReturnValue(mockUser);
    vi.spyOn(device, 'useDevice').mockReturnValue(false);

    render(<Header locale="en" />);

    fireEvent.click(screen.getByText('navLink.sighOut'));

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  it('menu', () => {
    vi.spyOn(device, 'useDevice').mockReturnValue(true);
    vi.mocked(useUser).mockReturnValue(mockUser);

    render(<Header locale="en" />);

    expect(screen.getByTestId('menu-popover')).toBeInTheDocument();
  });

  it('MenuPopover', () => {
    vi.mocked(useUser).mockReturnValue(mockUser);
    vi.spyOn(device, 'useDevice').mockReturnValue(true);

    render(<Header locale="en" />);

    expect(screen.getByTestId('menu-popover')).toBeInTheDocument();
  });

  it('add class scroll', async () => {
    vi.mocked(useUser).mockReturnValue(mockUser);
    vi.spyOn(device, 'useDevice').mockReturnValue(true);

    render(<Header locale="en" />);

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    await waitFor(
      () => {
        const header = screen.getByRole('banner');
        expect(header).toHaveClass(/scroll/);
      },
      { timeout: 200 }
    );
  });

  it('hides loader after loading', async () => {
    vi.mocked(useUser).mockReturnValue(mockUser);
    vi.spyOn(device, 'useDevice').mockReturnValue(true);

    const { container } = render(<Header locale="en" />);

    await waitFor(() => {
      expect(
        container.querySelectorAll('span[class*="loader"]').length
      ).toEqual(0);
    });
  });
});
