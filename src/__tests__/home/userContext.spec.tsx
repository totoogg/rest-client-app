import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { UserProvider, useUser } from '../../shared/lib/context';
import * as auth from '@/shared/lib/firebase';
import { NextOrObserver } from 'firebase/auth';
import type { Auth, User } from 'firebase/auth';

const mockUnsubscribe = vi.fn();
const mockOnAuthStateChanged = vi
  .spyOn(auth, 'onAuthStateChanged')
  .mockImplementation(() => {
    return mockUnsubscribe;
  });

beforeEach(() => {
  vi.mock('@/shared/lib/firebase', () => ({
    auth: {},
    onAuthStateChanged: vi.fn(),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});
describe('UserContext component', () => {
  it('provide null user', () => {
    const TestComponent = () => {
      const user = useUser();
      return <div>{user ? user : 'No user'}</div>;
    };

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(screen.getByText('No user')).toBeInTheDocument();
  });

  it('provide user', async () => {
    const mockUser = {
      displayName: 'John Doe',
      email: 'john@example.com',
      getIdToken: vi.fn().mockResolvedValue('token'),
    } as unknown as User;

    mockOnAuthStateChanged.mockImplementation(
      (auth: Auth, nextOrObserver: NextOrObserver<User | null>) => {
        if (typeof nextOrObserver === 'function') {
          nextOrObserver(mockUser);
        } else {
          nextOrObserver.next?.(mockUser);
        }
        return mockUnsubscribe;
      }
    );
    const TestComponent = () => {
      const user = useUser();
      return <div>{user}</div>;
    };

    await act(async () => {
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      );
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('email when displayName is missing', async () => {
    const mockUser = {
      email: 'john@example.com',
      getIdToken: vi.fn().mockResolvedValue('token'),
    } as unknown as User;

    mockOnAuthStateChanged.mockImplementation(
      (auth: Auth, nextOrObserver: NextOrObserver<User | null>) => {
        if (typeof nextOrObserver === 'function') {
          nextOrObserver(mockUser);
        } else {
          nextOrObserver.next?.(mockUser);
        }
        return mockUnsubscribe;
      }
    );

    const TestComponent = () => {
      const user = useUser();
      return <div>{user}</div>;
    };

    await act(async () => {
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      );
    });

    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});
