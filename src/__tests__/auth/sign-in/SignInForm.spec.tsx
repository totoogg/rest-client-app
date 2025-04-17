import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/i18n/consts/en/translation.json';
import { signIn } from '@/shared/lib/auth';
import { SignInForm } from '@/widgets/Authentification';
import { useRouter } from 'next/navigation';

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
  signIn: vi.fn(),
}));

describe('SignInForm', () => {
  const mockPush = vi.fn();
  const signInMock = vi.mocked(signIn);

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

  it('renders the form correctly', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignInForm />
      </NextIntlClientProvider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getAllByText(/sign-in/i)[1]).toBeInTheDocument();
  });

  it('submits form and redirects on success', async () => {
    signInMock.mockResolvedValue('fake-token');

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignInForm />
      </NextIntlClientProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123!' },
    });

    fireEvent.click(screen.getAllByText(/sign-in/i)[1]);
  });

  it('shows an error message on failure', async () => {
    signInMock.mockRejectedValue(new Error('Invalid credentials'));

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignInForm />
      </NextIntlClientProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'WrongPassword123!' },
    });

    fireEvent.click(screen.getAllByText(/sign-in/i)[1]);

    await waitFor(() =>
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    );
  });
});
