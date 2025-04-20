import {
  render,
  screen,
  fireEvent,
  act,
  renderHook,
} from '@testing-library/react';
import { Body } from '../../features';
import { RestClientContext, replaceVariable } from '@/shared';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ConfigProvider } from 'antd';
import {
  useBodyStart,
  useChangeHeader,
  useValidVariable,
} from '@/features/Body/lib';
import * as nav from 'next/navigation';

beforeEach(() => {
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

  vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) =>
      ({
        'restClient.body': 'Request Body',
        'restClient.none': 'None',
        'restClient.bodyError': 'Invalid JSON',
        'restClient.errorVariable': 'Invalid variables',
      })[key],
  }));

  vi.mock('@/shared', async () => {
    const actual = await vi.importActual('@/shared');
    return {
      ...actual,
      regExp: /\{\{(\w+)\}\}/g,
      replaceVariable: vi.fn(),
    };
  });

  global.clearTimeout = vi.fn();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllMocks();
  vi.useRealTimers();
});

const mockSetHeaders = vi.fn();
const mockSetBody = vi.fn();
const mockSetError = vi.fn();
const mockSetInput = vi.fn();
const mockSetShow = vi.fn();
const mockSetSelect = vi.fn();

const query = {
  get: (key: string) => {
    if (key === 'Content-Type') {
      return 'text';
    }
    return null;
  },
  append: function (): void {
    throw new Error('Function not implemented.');
  },
  delete: function (): void {
    throw new Error('Function not implemented.');
  },
  set: function (): void {
    throw new Error('Function not implemented.');
  },
  sort: function (): void {
    throw new Error('Function not implemented.');
  },
  size: 0,
  getAll: function (): string[] {
    throw new Error('Function not implemented.');
  },
  has: function (): boolean {
    throw new Error('Function not implemented.');
  },
  forEach: function (): void {
    throw new Error('Function not implemented.');
  },
  entries: function (): URLSearchParamsIterator<[string, string]> {
    throw new Error('Function not implemented.');
  },
  keys: function (): URLSearchParamsIterator<string> {
    throw new Error('Function not implemented.');
  },
  values: function (): URLSearchParamsIterator<string> {
    throw new Error('Function not implemented.');
  },
  [Symbol.iterator]: function (): URLSearchParamsIterator<[string, string]> {
    throw new Error('Function not implemented.');
  },
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <RestClientContext.Provider
    value={{
      setHeaders: mockSetHeaders,
      headers: {
        clear: [],
        dirt: [],
      },
      setBody: mockSetBody,
      variables: { API_KEY: 'secret', TOKEN: '123' },
      setError: mockSetError,
      error: {
        inputValid: false,
        headersValidVariable: '',
        errorBody: false,
        inputBodyValidVariable: '',
        inputValidVariable: '',
      },
    }}
  >
    {children}
  </RestClientContext.Provider>
);

describe('Body component', () => {
  const renderComponent = (bodyUrl = '') =>
    render(
      <ConfigProvider>
        <RestClientContext.Provider
          value={{
            setBody: mockSetBody,
            setError: mockSetError,
            setHeaders: mockSetHeaders,
            error: {
              inputValid: false,
              headersValidVariable: '',
              errorBody: false,
              inputBodyValidVariable: '',
              inputValidVariable: '',
            },
            headers: { dirt: [], clear: [] },
          }}
        >
          <Body bodyUrl={bodyUrl} searchParams={{}} />
        </RestClientContext.Provider>
      </ConfigProvider>
    );

  it('render', () => {
    renderComponent();
    expect(screen.getByText('Request Body:')).toBeInTheDocument();
    expect(screen.getByText('None')).toBeInTheDocument();
  });

  it('textarea when JSON', async () => {
    renderComponent();

    fireEvent.mouseDown(screen.getByText('None'));
    fireEvent.click(screen.getByText('JSON'));

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('update body', async () => {
    renderComponent();

    fireEvent.mouseDown(screen.getByText('None'));
    fireEvent.click(screen.getByText('Text'));

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'test content' } });

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(mockSetBody).toHaveBeenCalledWith('test content');
  });

  it('invalid JSON', async () => {
    render(
      <ConfigProvider>
        <RestClientContext.Provider
          value={{
            setBody: mockSetBody,
            setError: mockSetError,
            setHeaders: mockSetHeaders,
            error: {
              errorBody: true,
              inputBodyValidVariable: '',
              inputValid: false,
              headersValidVariable: '',
              inputValidVariable: '',
            },
            headers: { dirt: [], clear: [] },
          }}
        >
          <Body bodyUrl="" searchParams={{}} />
        </RestClientContext.Provider>
      </ConfigProvider>
    );

    fireEvent.mouseDown(screen.getByText('None'));
    fireEvent.click(screen.getByText('JSON'));

    expect(screen.getByText('Invalid JSON.')).toBeInTheDocument();
  });
});

describe('useBodyStart', () => {
  it('bodyUrl', async () => {
    vi.mock('next/navigation', async () => {
      const actual =
        await vi.importActual<typeof import('next/navigation')>(
          'next/navigation'
        );
      return {
        ...actual,
        useSearchParams: () => {
          return {
            get: (key: string) => {
              if (key === 'Content-Type') {
                return 'application/json';
              }
              return null;
            },
          };
        },
      };
    });
    const bodyUrl = btoa(encodeURIComponent('test'));

    renderHook(() =>
      useBodyStart(bodyUrl, false, mockSetInput, mockSetShow, mockSetSelect, {})
    );

    expect(mockSetInput).toHaveBeenCalledWith('test');
    expect(mockSetSelect).toHaveBeenCalledWith('text');
  });

  it('initialize bodyUrl', async () => {
    vi.spyOn(nav, 'useSearchParams').mockImplementation(() => query);
    const bodyUrl = btoa(encodeURIComponent('test'));

    renderHook(() =>
      useBodyStart(bodyUrl, false, mockSetInput, mockSetShow, mockSetSelect, {})
    );

    expect(mockSetInput).toHaveBeenCalledWith('test');
    expect(mockSetSelect).toHaveBeenCalledWith('text');
  });

  it('initialize without bodyUrl', async () => {
    vi.spyOn(nav, 'useSearchParams').mockImplementation(() => ({
      ...query,
      get: (key: string) => {
        if (key === 'Content-Type') {
          return null;
        }
        return null;
      },
    }));
    const bodyUrl = btoa(encodeURIComponent('test'));

    renderHook(() =>
      useBodyStart(bodyUrl, false, mockSetInput, mockSetShow, mockSetSelect, {})
    );

    expect(mockSetInput).toHaveBeenCalledWith('test');
    expect(mockSetSelect).toHaveBeenCalledWith('text');
    expect(mockSetShow).toHaveBeenCalledWith(true);
  });
});

describe('useChangeHeader', () => {
  it('add header not exists', () => {
    renderHook((props) => useChangeHeader(props.selectBody), {
      initialProps: { selectBody: 'json' },
      wrapper,
    });

    expect(mockSetHeaders).toHaveBeenCalledWith(expect.any(Function));

    const updateFn = mockSetHeaders.mock.calls[0][0];
    const result = updateFn({
      clear: [],
      dirt: [],
    });

    expect(result).toEqual({
      clear: [{ key: 'Content-Type', value: 'application/json' }],
      dirt: [{ key: 'Content-Type', value: 'application/json' }],
    });
  });

  it('update header', () => {
    const initialHeaders = {
      clear: [
        { key: 'Content-Type', value: 'text/plain' },
        { key: 'Authorization', value: 'Bearer token' },
      ],
      dirt: [
        { key: 'Content-Type', value: 'text/plain' },
        { key: 'Authorization', value: 'Bearer token' },
      ],
    };

    renderHook((props) => useChangeHeader(props.selectBody), {
      initialProps: { selectBody: 'json' },
      wrapper,
    });

    const updateFn = mockSetHeaders.mock.calls[0][0];
    const result = updateFn(initialHeaders);

    expect(result.clear[0]).toEqual({
      key: 'Content-Type',
      value: 'application/json',
    });
    expect(result.dirt[0]).toEqual({
      key: 'Content-Type',
      value: 'application/json',
    });
  });

  it('remove header', () => {
    const initialHeaders = {
      clear: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Authorization', value: 'Bearer token' },
      ],
      dirt: [
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Authorization', value: 'Bearer token' },
      ],
    };

    renderHook((props) => useChangeHeader(props.selectBody), {
      initialProps: { selectBody: 'none' },
      wrapper,
    });

    const updateFn = mockSetHeaders.mock.calls[0][0];
    const result = updateFn(initialHeaders);

    expect(result.clear).toEqual([
      {
        key: 'Authorization',
        value: 'Bearer token',
      },
    ]);
    expect(result.dirt).toEqual([
      {
        key: 'Content-Type',
        value: 'application/json',
      },
      {
        key: 'Authorization',
        value: 'Bearer token',
      },
    ]);
  });

  it('empty bodyText and header', () => {
    const initialHeaders = {
      clear: [{ key: 'Authorization', value: 'Bearer token' }],
      dirt: [{ key: 'Authorization', value: 'Bearer token' }],
    };

    renderHook((props) => useChangeHeader(props.selectBody), {
      initialProps: { selectBody: 'none' },
      wrapper,
    });

    const updateFn = mockSetHeaders.mock.calls[0][0];
    const result = updateFn(initialHeaders);

    expect(result).toEqual(initialHeaders);
  });
});

describe('useValidVariable', () => {
  it('variable error', async () => {
    const errorVariables = ['API_KEY', 'INVALID'];
    vi.mocked(replaceVariable).mockReturnValueOnce({
      status: 'error',
      res: errorVariables,
    });

    renderHook(() => useValidVariable('{{API_KEY}} {{INVALID}}', 'text'), {
      wrapper,
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockSetError).toHaveBeenCalledWith(expect.any(Function));
  });

  it('valid variables', async () => {
    vi.mocked(replaceVariable).mockReturnValueOnce({
      status: 'fulfilled',
      res: 'secret 123',
    });

    renderHook(() => useValidVariable('{{API_KEY}} {{TOKEN}}', 'text'), {
      wrapper,
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockSetBody).toHaveBeenCalledWith('secret 123');
    expect(mockSetError).toHaveBeenCalledWith(expect.any(Function));
  });

  it('validate JSON', async () => {
    const invalidJSON = '{ "key": "value"';
    vi.mocked(replaceVariable).mockReturnValueOnce({
      status: 'fulfilled',
      res: invalidJSON,
    });

    renderHook(() => useValidVariable(invalidJSON, 'json'), { wrapper });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockSetError).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetError).toHaveBeenCalledTimes(2);
  });

  it('clearTimeout on unmount', async () => {
    vi.spyOn(window, 'clearTimeout');
    const { unmount } = renderHook(() => useValidVariable('test', 'text'), {
      wrapper,
    });

    unmount();
    expect(clearTimeout).toHaveBeenCalled();
  });

  it('call setError', async () => {
    renderHook(() => useValidVariable('test', 'text'), {
      wrapper,
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockSetError).toHaveBeenCalledWith(expect.any(Function));
  });

  it('validate JSON', async () => {
    vi.useFakeTimers();
    const mockSetError = vi.fn();

    renderHook(() => useValidVariable('{ invalid }', 'json'), {
      wrapper: ({ children }) => (
        <RestClientContext.Provider
          value={{
            setBody: vi.fn(),
            setError: mockSetError,
            variables: {},
          }}
        >
          {children}
        </RestClientContext.Provider>
      ),
    });

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(mockSetError).toHaveBeenCalledWith(expect.any(Function));
    vi.useRealTimers();
  });
});
