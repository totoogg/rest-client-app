import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { AuthenticationForm } from '@/shared/Form';
import messages from '@/i18n/consts/en/translation.json';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('AuthenticationForm', () => {
  const mockPush = vi.fn();
  const mockOnSubmitAction = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({ push: mockPush });
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
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
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
    fireEvent.click(screen.getByText(/sign in/i));

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
