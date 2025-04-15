import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/i18n/consts/en/translation.json';
import { SignUpForm } from '@/widgets/Authentification';
import { useRouter } from 'next/navigation';
import { signUp } from '@/shared/lib/auth';

global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
}));

vi.mock('@/shared/lib/auth', () => ({
  signUp: vi.fn(),
}));

describe('SignUpForm', () => {
  const mockPush = vi.fn();
  const signUpMock = vi.mocked(signUp);

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render form fields correctly', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignUpForm />
      </NextIntlClientProvider>
    );

    expect(screen.getByLabelText('First name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
  });

  it('should show error when invalid data is submitted', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignUpForm />
      </NextIntlClientProvider>
    );

    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'invalidemail' },
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'short' },
    });
    fireEvent.click(screen.getAllByText(/sign-up/i)[1]);

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      expect(
        screen.getByText('Password must be at least 8 characters')
      ).toBeInTheDocument();
    });
  });

  it('should call signUp and redirect on success', async () => {
    signUpMock.mockResolvedValue('fake-token');

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignUpForm />
      </NextIntlClientProvider>
    );

    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.input(screen.getByLabelText('First name'), {
      target: { value: 'John' },
    });
    fireEvent.input(screen.getByLabelText('Last name'), {
      target: { value: 'Doe' },
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'Password1!' },
    });
    fireEvent.input(screen.getByLabelText('Confirm password'), {
      target: { value: 'Password1!' },
    });
    fireEvent.click(screen.getAllByText(/sign-up/i)[1]);

    await waitFor(() => {
      expect(signUpMock).toHaveBeenCalledWith(
        'user@example.com',
        'Password1!',
        'John Doe'
      );
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('should show error message if signUp fails', async () => {
    signUpMock.mockRejectedValue(new Error('Sign-up failed'));

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignUpForm />
      </NextIntlClientProvider>
    );

    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.input(screen.getByLabelText('First name'), {
      target: { value: 'John' },
    });
    fireEvent.input(screen.getByLabelText('Last name'), {
      target: { value: 'Doe' },
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'Password1!' },
    });
    fireEvent.input(screen.getByLabelText('Confirm password'), {
      target: { value: 'Password1!' },
    });
    fireEvent.click(screen.getAllByText(/sign-up/i)[1]);

    await waitFor(() => {
      expect(screen.getByText('Sign-up failed')).toBeInTheDocument();
    });
  });
});
