import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import Page from '../../app/[locale]//rest-client/[[...slug]]/page';
import { parseUrl } from '@/shared';
import { render } from '@testing-library/react';

const mockParseUrl = vi.mocked(parseUrl);

beforeEach(() => {
  vi.mock('@/widgets', () => ({
    RestClient: () => <div data-testid="rest-client">RestClient</div>,
  }));

  vi.mock('@/shared', () => ({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    parseUrl: vi.fn(),
    RestClientProvider: ({ children }: { children: React.ReactNode }) =>
      children,
  }));

  mockParseUrl.mockReturnValue({
    pathSegments: ['rest-client', 'GET', 'encoded-url'],
    query: new URLSearchParams(),
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Page component', () => {
  it('render', async () => {
    const { container } = render(
      await Page({
        params: Promise.resolve({ slug: ['GET', 'encoded-url'] }),
        searchParams: Promise.resolve({ param: 'value' }),
      })
    );

    expect(
      container.querySelector('[data-testid="rest-client"]')
    ).toBeInTheDocument();
  });
});
