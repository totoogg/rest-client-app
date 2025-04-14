import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import Page from '@/app/[locale]/auth/sign-in/page';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

beforeEach(() => {
  vi.mock('@/widgets/Authentification', async () => {
    const actual = await vi.importActual('@/widgets/Authentification');
    return {
      ...actual,
      SignInForm: () => (
        <div data-testid="sign-in-component">Mock Sign In Form</div>
      ),
    };
  });

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
    expect(SignInComponent.textContent).toBe('Mock Sign In Form');
  });
});
