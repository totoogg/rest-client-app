import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '../../app/[locale]/history/page';
import { act } from 'react';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

beforeEach(() => {
  vi.mock('@/widgets', async () => {
    const actual = await vi.importActual('@/widgets');
    return {
      ...actual,
      History: () => <div data-testid="history-component">Mock History</div>,
    };
  });
  global.clearTimeout = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Page Component', () => {
  it('should handle component correctly', async () => {
    render(<Page />);

    await whenStable();

    expect(screen.getByTestId('history-component')).toBeInTheDocument();
  });
});
