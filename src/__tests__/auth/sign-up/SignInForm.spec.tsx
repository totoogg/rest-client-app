import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { SignInForm } from '@/widgets/Authentification';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const signInMock = vi.fn();

vi.mock('@/shared/lib/auth', () => ({
  signIn: vi.fn(),
}));

describe('SignInForm', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({ push: mockPush });
  });

  it('renders the form correctly', () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('submits form and redirects on success', async () => {
    signInMock.mockResolvedValue('fake-token');

    render(<SignInForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.click(screen.getByText(/sign in/i));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
  });

  it('shows an error message on failure', async () => {
    signInMock.mockRejectedValue(new Error('Invalid credentials'));

    render(<SignInForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'WrongPassword123!' },
    });
    fireEvent.click(screen.getByText(/sign in/i));

    await waitFor(() =>
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    );
  });
});
