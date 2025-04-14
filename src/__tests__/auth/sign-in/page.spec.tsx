import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import Page from '@/app/[locale]/auth/sign-in/page';

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
            <div data-testid="sign-in-component">Mock Sign In</div>
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
  it('renders dynamic SignIn component', async () => {
    render(<Page />);

    const SignInComponent = await screen.findByTestId('sign-in-component');

    await whenStable();

    expect(SignInComponent).toBeInTheDocument();
    expect(SignInComponent.textContent).toBe('Mock Sign In');
  });
});
