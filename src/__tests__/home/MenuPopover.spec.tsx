import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MenuPopover } from '../../shared/MenuPopover';

beforeEach(() => {
  vi.mock('@ant-design/icons', () => ({
    MenuOutlined: vi.fn(({ onClick }) => (
      <button data-testid="menu-icon" onClick={onClick} />
    )),
  }));

  vi.mock('@/shared/Menu/ui/Menu', () => ({
    Menu: vi.fn(() => <div data-testid="menu" />),
  }));

  vi.mock('@/i18n/navigation', () => ({
    Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a data-testid="main-logo-link" href={href}>
        {children}
      </a>
    ),
  }));

  vi.mock('@/shared/Logo', () => ({
    MainLogo: () => <div data-testid="main-logo" />,
  }));

  vi.mock('antd', () => ({
    Drawer: vi.fn(({ title, children, open, onClose }) => (
      <div data-testid="drawer" data-open={open}>
        <div data-testid="drawer-header">{title}</div>
        <button data-testid="close-btn" onClick={onClose} />
        {children}
      </div>
    )),
    Flex: vi.fn(({ children }) => <div>{children}</div>),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('MenuPopover component', () => {
  it('render menu', () => {
    render(<MenuPopover />);

    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
    expect(screen.getByTestId('drawer')).toHaveAttribute('data-open', 'false');
  });

  it('open drawer', () => {
    render(<MenuPopover />);

    fireEvent.click(screen.getByTestId('menu-icon'));
    expect(screen.getByTestId('drawer')).toHaveAttribute('data-open', 'true');
  });

  it('correct header', () => {
    render(<MenuPopover />);
    fireEvent.click(screen.getByTestId('menu-icon'));

    const header = screen.getByTestId('drawer-header');
    expect(header).toContainElement(screen.getByTestId('main-logo-link'));
    expect(screen.getByTestId('main-logo-link')).toHaveAttribute('href', '/');
    expect(header).toHaveTextContent('RENDER CREW');
  });

  it('render vertical', () => {
    render(<MenuPopover />);
    fireEvent.click(screen.getByTestId('menu-icon'));

    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  it('close drawer', () => {
    render(<MenuPopover />);
    fireEvent.click(screen.getByTestId('menu-icon'));

    fireEvent.click(screen.getByTestId('close-btn'));
    expect(screen.getByTestId('drawer')).toHaveAttribute('data-open', 'false');
  });
});
