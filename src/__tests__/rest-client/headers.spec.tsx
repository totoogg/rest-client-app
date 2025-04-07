import { render, screen, fireEvent } from '@testing-library/react';
import { Headers } from '../../features';
import { RestClientContext } from '../../shared';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ConfigProvider } from 'antd';
import { renderHook, act } from '@testing-library/react';
import {
  useStartHeaders,
  useChangeHeaders,
  useValidVariable,
} from '../../features/Headers/lib';
import { replaceVariable } from '../../shared';
import React from 'react';

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  vi.mock('@/shared', async () => {
    const actual = await vi.importActual('@/shared');
    return {
      ...actual,
      sendReq: vi.fn(),
      parseUrl: vi.fn(() => ({
        pathSegments: ['rest-client', 'GET', 'encodedUrl'],
        query: new URLSearchParams(),
      })),
      regExp: /\{\{(\w+)\}\}/g,
      replaceVariable: vi.fn(),
    };
  });

  vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key,
  }));

  global.clearTimeout = vi.fn();

  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

const mockSetHeaders = vi.fn();
const mockSetError = vi.fn();

describe('Headers component', () => {
  const renderComponent = (searchParams = {}) =>
    render(
      <ConfigProvider>
        <RestClientContext.Provider
          value={{
            headers: { dirt: [], clear: [] },
            setHeaders: mockSetHeaders,
            error: {
              inputValid: false,
              headersValidVariable: '',
              errorBody: false,
              inputBodyValidVariable: '',
              inputValidVariable: '',
            },
            setError: mockSetError,
          }}
        >
          <Headers searchParams={searchParams} />
        </RestClientContext.Provider>
      </ConfigProvider>
    );

  it('add new header', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('restClient.headers'));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getAllByPlaceholderText('Key')).toHaveLength(1);
    expect(screen.getAllByPlaceholderText('Value')).toHaveLength(1);
  });

  it('remove header', async () => {
    const { container, getByText, queryByPlaceholderText } = renderComponent();

    fireEvent.click(getByText('restClient.headers'));
    fireEvent.click(container.querySelectorAll('span[class*="delete"]')[0]);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(queryByPlaceholderText('Key')).toBeNull();
  });

  it('update headers', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('restClient.headers'));

    const keyInput = screen.getByPlaceholderText('Key');
    const valueInput = screen.getByPlaceholderText('Value');

    fireEvent.change(keyInput, { target: { value: 'Content-Type' } });
    fireEvent.change(valueInput, { target: { value: 'application/json' } });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockSetHeaders).toHaveBeenCalledWith(expect.any(Function));
  });

  it('error message', async () => {
    render(
      <ConfigProvider>
        <RestClientContext.Provider
          value={{
            headers: { dirt: [], clear: [] },
            setHeaders: mockSetHeaders,
            error: {
              headersValidVariable: 'API_KEY',
              inputValid: false,
              errorBody: false,
              inputBodyValidVariable: '',
              inputValidVariable: '',
            },
            setError: mockSetError,
          }}
        >
          <Headers searchParams={{}} />
        </RestClientContext.Provider>
      </ConfigProvider>
    );

    expect(
      screen.getByText('restClient.errorVariable: API_KEY')
    ).toBeInTheDocument();
  });
});

describe('useStartHeaders', () => {
  it('initialize headers', async () => {
    const searchParams = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RestClientContext.Provider value={{ setHeaders: mockSetHeaders }}>
        {children}
      </RestClientContext.Provider>
    );

    renderHook(() => useStartHeaders(searchParams), { wrapper });

    act(() => {
      vi.runAllTimers();
    });

    expect(mockSetHeaders).toHaveBeenCalledWith({
      clear: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Authorization', value: 'Bearer token' },
      ],
      dirt: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Authorization', value: 'Bearer token' },
      ],
    });
  });
});

describe('useValidVariable', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RestClientContext.Provider
      value={{
        headers: { dirt: [{ key: '{{API_KEY}}', value: 'test' }], clear: [] },
        setHeaders: mockSetHeaders,
        variables: { API_KEY: 'secret' },
        setError: mockSetError,
      }}
    >
      {children}
    </RestClientContext.Provider>
  );

  it('replace variables', async () => {
    vi.mocked(replaceVariable).mockReturnValue({
      status: 'fulfilled',
      res: 'secret,test',
    });

    renderHook(() => useValidVariable(), { wrapper });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockSetHeaders).toHaveBeenCalledWith(expect.any(Function));
  });

  it('variable errors', async () => {
    vi.mocked(replaceVariable).mockReturnValue({
      status: 'error',
      res: ['API_KEY'],
    });

    renderHook(() => useValidVariable(), { wrapper });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockSetError).toHaveBeenCalledWith(expect.any(Function));
  });

  it('update error invalid variables', async () => {
    vi.mocked(replaceVariable).mockReturnValue({
      status: 'error',
      res: ['API_KEY', 'TOKEN'],
    });

    const initialError = {
      headersValidVariable: '',
      inputValid: false,
      errorBody: false,
      inputBodyValidVariable: '',
      inputValidVariable: 'existing',
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RestClientContext.Provider
        value={{
          headers: {
            dirt: [{ key: '{{API_KEY}}', value: '{{TOKEN}}' }],
            clear: [],
          },
          variables: { API_KEY: 'secret', TOKEN: '123' },
          setHeaders: vi.fn(),
          setError: mockSetError,
          error: initialError,
        }}
      >
        {children}
      </RestClientContext.Provider>
    );

    const { unmount } = renderHook(() => useValidVariable(), { wrapper });

    act(() => {
      vi.advanceTimersByTime(350);
    });

    expect(mockSetError).toHaveBeenCalledTimes(1);

    const [updateFn] = mockSetError.mock.calls[0];
    const newState = updateFn(initialError);

    expect(newState).toEqual({
      headersValidVariable: 'API_KEY, TOKEN',
      inputValid: false,
      errorBody: false,
      inputBodyValidVariable: '',
      inputValidVariable: 'existing',
    });

    unmount();
  });
});

describe('useChangeHeaders', () => {
  const initialHeaders = { dirt: [], clear: [] };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RestClientContext.Provider
      value={{
        headers: initialHeaders,
        setHeaders: mockSetHeaders,
      }}
    >
      {children}
    </RestClientContext.Provider>
  );

  it('update headers after delay', async () => {
    const { rerender } = renderHook(({ input }) => useChangeHeaders(input), {
      initialProps: { input: [] },
      wrapper,
    });

    const newHeaders = [{ key: 'Content-Type', value: 'application/json' }];

    rerender({ input: newHeaders as never });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockSetHeaders).toHaveBeenCalledWith(expect.any(Function));

    const updateFn = mockSetHeaders.mock.calls[0][0];
    const result = updateFn(initialHeaders);

    expect(result).toEqual({
      clear: structuredClone(initialHeaders.clear),
      dirt: newHeaders,
    });
  });
});
