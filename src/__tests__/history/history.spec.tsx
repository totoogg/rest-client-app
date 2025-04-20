import { render, screen } from '@testing-library/react';
import { History } from '../../widgets';
import * as hooks from '../../widgets/History/lib';
import { IHistoryState } from '../../widgets/History/model/typeState';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import React, { act } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../i18n/consts/en/translation.json';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

const mockHistory: IHistoryState[] = [
  {
    id: 1,
    method: 'GET',
    url: 'https://api.example.com/data',
    href: '/rest-client/GET/encodedUrl',
    textBody: undefined,
  },
];

beforeEach(() => {
  vi.mock('next/navigation', async () => {
    const actual = await vi.importActual('next/navigation');
    return {
      ...actual,
      useRouter: vi.fn(() => ({
        replace: vi.fn(),
        push: vi.fn(),
        prefetch: vi.fn(),
        refresh: vi.fn(),
        forward: vi.fn(),
        back: vi.fn(),
      })),
    };
  });

  global.clearTimeout = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('History Component', () => {
  it('renders EmptyHistory when no data', async () => {
    const useGetHistorySpy = vi.spyOn(hooks, 'useGetHistory');
    useGetHistorySpy.mockImplementation((setHistory) => {
      React.useEffect(() => {
        setHistory([]);
      }, [setHistory]);
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <History />
      </NextIntlClientProvider>
    );

    await whenStable();

    expect(
      screen.getByText(`You haven't executed any requests`)
    ).toBeInTheDocument();
  });

  it('renders history list with items', async () => {
    const useGetHistorySpy = vi.spyOn(hooks, 'useGetHistory');
    useGetHistorySpy.mockImplementation((setHistory) => {
      React.useEffect(() => {
        setHistory(mockHistory);
      }, [setHistory]);
    });
    const { container, getByText } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <History />
      </NextIntlClientProvider>
    );

    await whenStable();

    const items = container.querySelectorAll('div[class*="title"]');
    const method = container.querySelectorAll('span[class*="ant-typography"]');
    const url = container.querySelectorAll('code');
    const link = container.querySelectorAll('a');

    expect(getByText('History Requests')).toBeInTheDocument();
    expect(items).toHaveLength(mockHistory.length);
    expect(link[0]).toHaveAttribute('href', mockHistory[0].href);
    expect(method[0]).toHaveTextContent(mockHistory[0].method);
    expect(url[0]).toHaveTextContent(mockHistory[0].url);
  });
});
