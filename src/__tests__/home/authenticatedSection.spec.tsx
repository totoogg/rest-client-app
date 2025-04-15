import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { AuthenticatedSection } from '@/widgets';
import * as user from '@/shared/lib/context';

beforeEach(() => {
  vi.mock('@/shared/lib/context', () => ({
    useUser: vi.fn(),
  }));

  vi.mock('next-intl', () => ({
    useTranslations: vi.fn(() => (key: string) => {
      const translations: { [key: string]: string } = {
        'homePage.startMessageUser': 'Welcome',
        'homePage.startMessage': 'Hello guest',
        'homePage.developers': 'Developers',
      };
      return translations[key];
    }),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

const developers = [
  'Uladzimir Hancharou',
  'Liudmila Burbouskaya',
  'Marharyta Parkalava',
];

describe('AuthenticatedSection component', () => {
  it('user greeting when authenticated', () => {
    vi.spyOn(user, 'useUser').mockReturnValue('JohnDoe');

    render(<AuthenticatedSection />);

    expect(screen.getByText('Welcome,', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('JohnDoe')).toBeInTheDocument();
    expect(screen.getByText('Welcome,', { exact: false })).toHaveClass(
      /title/i
    );
  });

  it('message when not authenticated', () => {
    vi.spyOn(user, 'useUser').mockReturnValue(null);

    render(<AuthenticatedSection />);

    expect(screen.getByText('Hello guest!')).toBeInTheDocument();
    expect(screen.queryByTestId('username-span')).toBeNull();
  });

  it('render developers', () => {
    const { container } = render(<AuthenticatedSection />);

    expect(screen.getByText('Developers')).toBeInTheDocument();
    const cards = container.querySelectorAll(
      'div[class*="ant-card-head-title"]'
    );
    expect(cards).toHaveLength(3);
    developers.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('render cards', () => {
    const { container } = render(<AuthenticatedSection />);

    const cards = container.querySelectorAll('div[class*="_card_"]');

    expect(cards).toHaveLength(3);
  });
});
