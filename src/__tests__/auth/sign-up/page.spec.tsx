import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '@/app/[locale]/auth/sign-up/page';

beforeEach(() => {
  vi.mock('next/dynamic', () => ({
    default: vi.fn().mockImplementation(() => {
      return vi.fn(() => (
        <div data-testid="sign-up-component">Mock Sign Up</div>
      ));
    }),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Page component', () => {
  it('renders dynamic SignUp component', async () => {
    render(<Page />);

    const SignUpComponent = await screen.findByTestId('sign-up-component');

    expect(SignUpComponent).toBeInTheDocument();
    expect(SignUpComponent.textContent).toBe('Mock Sign Up');
  });
});
