import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as yup from 'yup';
import * as router from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { AuthenticationForm } from '@/shared/Form';
import messages from '../../i18n/consts/en/translation.json';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(),
  };
});

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

describe('AuthenticationForm', () => {
  const mockPush = vi.fn();
  const mockOnSubmitAction = vi.fn();

  beforeEach(() => {
    vi.spyOn(router, 'useRouter').mockReturnValue({
      push: mockPush,
      back: function (): void {
        throw new Error('Function not implemented.');
      },
      forward: function (): void {
        throw new Error('Function not implemented.');
      },
      refresh: function (): void {
        throw new Error('Function not implemented.');
      },
      replace: function (): void {
        throw new Error('Function not implemented.');
      },
      prefetch: function (): void {
        throw new Error('Function not implemented.');
      },
    });
  });

  it('renders form fields correctly', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AuthenticationForm
          title="Sign In"
          schema={yup.object().shape({
            email: yup.string().required(),
            password: yup.string().required(),
          })}
          fields={[
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'password', label: 'Password', type: 'password' },
          ]}
          onSubmitAction={mockOnSubmitAction}
          loading={false}
        />
      </NextIntlClientProvider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getAllByText(/sign in/i)[1]).toBeInTheDocument();
  });

  it('calls onSubmitAction when form is submitted', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AuthenticationForm
          title="Sign In"
          schema={yup.object().shape({
            email: yup.string().required(),
            password: yup.string().required(),
          })}
          fields={[
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'password', label: 'Password', type: 'password' },
          ]}
          onSubmitAction={mockOnSubmitAction}
          loading={false}
        />
      </NextIntlClientProvider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.click(screen.getAllByText(/sign in/i)[1]);

    await waitFor(() =>
      expect(mockOnSubmitAction).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123!',
      })
    );
  });

  it('displays error message when error is passed', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AuthenticationForm
          title="Sign In"
          schema={yup.object().shape({
            email: yup.string().required(),
            password: yup.string().required(),
          })}
          fields={[
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'password', label: 'Password', type: 'password' },
          ]}
          onSubmitAction={mockOnSubmitAction}
          loading={false}
          error="Invalid credentials"
        />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
