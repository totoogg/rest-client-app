import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../../app/[locale]/page';

beforeEach(() => {
  vi.mock('@/widgets', () => ({
    AuthenticatedSection: () => (
      <div data-testid="auth-section">Authenticated Content</div>
    ),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('HomePage page', () => {
  it('render', () => {
    render(<HomePage />);

    expect(screen.getByTestId('auth-section')).toBeInTheDocument();
    expect(screen.getByTestId('auth-section').textContent).toBe(
      'Authenticated Content'
    );
  });

  it('correct main', () => {
    const { container } = render(<HomePage />);

    const mainDiv = container.querySelector('.main');
    expect(mainDiv).toBeInTheDocument();
    expect(mainDiv).toContainElement(screen.getByTestId('auth-section'));
  });
});
