import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Link } from '@/shared';
import * as router from 'next/navigation';
import * as react from 'react';

const mockPush = vi.fn();
const mockReplace = vi.fn();
const mockStartTransition = vi.fn((callback) => callback());

beforeEach(() => {
  vi.mock('next/navigation', async () => {
    const actual = await vi.importActual('next/navigation');
    return {
      ...actual,
      useRouter: vi.fn(() => ({
        push: vi.fn(),
        replace: vi.fn(),
      })),
    };
  });

  vi.mock('react', async () => {
    const actual = await vi.importActual('react');
    return {
      ...actual,
      useTransition: vi.fn(() => [false, vi.fn()]),
    };
  });

  vi.spyOn(router, 'useRouter').mockImplementation(() => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: vi.fn(),
    refresh: vi.fn(),
    forward: vi.fn(),
    back: vi.fn(),
  }));

  vi.spyOn(react, 'useTransition').mockImplementation(() => [
    false,
    mockStartTransition,
  ]);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Link component', () => {
  it('call router.push', async () => {
    render(<Link href="/test">Test</Link>);

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(mockPush).toHaveBeenCalledWith('/test');
    expect(mockReplace).not.toHaveBeenCalled();
    expect(mockStartTransition).toHaveBeenCalled();
  });

  it('call router.replace', async () => {
    render(
      <Link href="/test" replace>
        Test
      </Link>
    );

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(mockReplace).toHaveBeenCalledWith('/test');
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockStartTransition).toHaveBeenCalled();
  });

  it('show loader', async () => {
    vi.spyOn(react, 'useTransition').mockImplementation(() => [
      true,
      mockStartTransition,
    ]);

    const { container } = render(<Link href="/test">Test</Link>);

    expect(
      container.querySelectorAll('span[class*="loader"]')[0]
    ).toBeInTheDocument();
  });
});
