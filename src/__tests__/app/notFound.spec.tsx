import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { headers } from 'next/headers';
import { parseUrl } from '@/shared';
import NotFound from '../../app/not-found';
import { act } from 'react';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

const mockHeaders = vi.mocked(headers);
const mockParseUrl = vi.mocked(parseUrl);

beforeEach(() => {
  vi.mock('next/headers', () => ({
    headers: vi.fn(),
  }));

  vi.mock('@/shared', () => ({
    parseUrl: vi.fn(),
  }));

  vi.mock('@/widgets', () => ({
    NotFound: () => <div data-testid="custom-not-found" />,
  }));
  mockHeaders.mockReturnValue({
    get: (key: string) =>
      key === 'link'
        ? '<http://localhost:3000/en/some-page>; rel="preconnect"'
        : null,
  } as never);

  mockParseUrl.mockReturnValue({
    pathSegments: ['en'],
  } as never);

  vi.spyOn(console, 'error').mockReturnValue();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('NotFound page', () => {
  it('missing link', async () => {
    mockHeaders.mockReturnValue({
      get: () => null,
    } as never);

    mockParseUrl.mockReturnValue({
      pathSegments: [],
    } as never);

    render(<NotFound />);

    await whenStable();

    expect(document.documentElement).not.toHaveAttribute('lang');
  });

  it('invalid URL parsing', async () => {
    mockParseUrl.mockReturnValue({
      pathSegments: undefined,
    } as never);

    render(<NotFound />);

    await whenStable();

    expect(document.documentElement).not.toHaveAttribute('lang');
  });
});
