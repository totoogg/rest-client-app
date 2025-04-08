import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '../../app/[locale]/history/page';
import { act } from 'react';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

beforeEach(() => {
  vi.mock('next/dynamic', () => ({
    default: vi.fn().mockImplementation(() => {
      const Component = vi.fn(() => {
        const LoadedComponent = vi
          .fn()
          .mockImplementation(() => (
            <div data-testid="history-component">Mock History</div>
          ));
        return <LoadedComponent />;
      });
      return Component;
    }),
  }));

  global.clearTimeout = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Page component', () => {
  it('render dynamic History component', async () => {
    render(<Page />);

    const historyComponent = await screen.findByTestId('history-component');

    await whenStable();

    expect(historyComponent).toBeInTheDocument();
    expect(historyComponent.textContent).toBe('Mock History');
  });
});
