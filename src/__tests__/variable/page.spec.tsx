import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '../../app/[locale]/variables/page';
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
            <div data-testid="variable-component">Mock Variable</div>
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
  it('render dynamic Variable component', async () => {
    render(<Page />);

    const variableComponent = await screen.findByTestId('variable-component');

    await whenStable();

    expect(variableComponent).toBeInTheDocument();
    expect(variableComponent.textContent).toBe('Mock Variable');
  });
});
