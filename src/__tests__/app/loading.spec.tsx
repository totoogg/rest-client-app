import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import Loading from '../../app/loading';
import Loading1 from '../../app/[locale]/loading';
import Loading2 from '../../app/[locale]/rest-client/[[...slug]]/loading';
import Loading3 from '../../app/[locale]/history/loading';
import Loading4 from '../../app/[locale]/auth/sign-in/loading';
import Loading5 from '../../app/[locale]/auth/sign-up/loading';

beforeEach(() => {
  vi.useFakeTimers();
  vi.mock('@/shared', () => ({
    Loader: () => <div data-testid="loader" />,
  }));
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe('Loading', () => {
  it('show loader', () => {
    render(<Loading />);
    render(<Loading1 />);
    render(<Loading2 />);
    render(<Loading3 />);
    render(<Loading4 />);
    render(<Loading5 />);

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('show loader after timeout', () => {
    render(<Loading />);
    render(<Loading1 />);
    render(<Loading2 />);
    render(<Loading3 />);
    render(<Loading4 />);
    render(<Loading5 />);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getAllByTestId('loader').length).toEqual(6);
  });

  it('clean up timeout', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
    const { unmount } = render(<Loading />);

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it('not show loader before timeout', () => {
    const { unmount } = render(<Loading />);

    act(() => {
      vi.advanceTimersByTime(50);
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });
});
