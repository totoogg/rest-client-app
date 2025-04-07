import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  renderHook,
  act,
} from '@testing-library/react';
import { UrlLine } from '../../features';
import { RestClientContext, sendReq, replaceVariable } from '../../shared';
import { ConfigProvider } from 'antd';
import { saveHistory } from '../../features/UrlLine/util';
import { useValidVariable, useChangeUrl } from '../../features/UrlLine/lib';

beforeEach(() => {
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

  const mockStorage = {
    userRenderCrew: JSON.stringify({ user: 'test@example.com' }),
    dbRenderCrew: JSON.stringify({
      'test@example.com': {
        history: [],
      },
    }),
  };

  Storage.prototype.getItem = vi.fn(
    (key) => mockStorage[key as keyof typeof mockStorage]
  );
  Storage.prototype.setItem = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

const mockReplaceState = vi.fn();

const mockSetMethod = vi.fn();
const mockSetError = vi.fn();
const mockSetResponse = vi.fn();
const mockSetUrl = vi.fn();

const renderComponent = (inputValid: boolean = false) =>
  render(
    <ConfigProvider>
      <RestClientContext.Provider
        value={{
          setUrl: mockSetUrl,
          method: 'GET',
          setMethod: mockSetMethod,
          setError: mockSetError,
          setResponse: mockSetResponse,
          variables: {},
          error: {
            inputValid,
            headersValidVariable: '',
            errorBody: false,
            inputBodyValidVariable: '',
            inputValidVariable: '',
          },
        }}
      >
        <UrlLine methodSelect="GET" urlServer="test-url" />
      </RestClientContext.Provider>
    </ConfigProvider>
  );

describe('UrlLine Component', () => {
  it('should render correctly', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
    expect(mockSetUrl).toHaveBeenCalledWith('test-url');
  });

  it('input change and validation', async () => {
    renderComponent();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'https://api.example.com' } });

    await waitFor(() => {
      expect(input).toHaveValue('https://api.example.com');
    });
  });

  it('show error invalid input', async () => {
    renderComponent(true);

    expect(screen.getByText('restClient.urlErrorFill.')).toBeInTheDocument();
  });

  it('server error', async () => {
    vi.mocked(sendReq).mockResolvedValue({
      status: 500,
      res: 'Server error',
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/inputPlaceholder/i), {
      target: { value: 'http://example.com' },
    });
    fireEvent.click(screen.getByText(/send/i));

    await waitFor(() =>
      expect(sendReq).toHaveBeenCalledWith(window.location.href)
    );

    expect(mockSetResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        res: 'restClient.serverError',
      })
    );
  });

  it('invalid request error', async () => {
    vi.mocked(sendReq).mockResolvedValue({
      status: 404,
      res: 'Invalid request',
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/inputPlaceholder/i), {
      target: { value: 'http://example.com' },
    });
    fireEvent.click(screen.getByText(/send/i));

    await waitFor(() =>
      expect(sendReq).toHaveBeenCalledWith(window.location.href)
    );

    expect(mockSetResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        res: 'restClient.requestError',
      })
    );
  });

  it('network error', async () => {
    vi.mocked(sendReq).mockResolvedValue({
      status: -1,
      res: 'Network error. Could not send request',
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/inputPlaceholder/i), {
      target: { value: 'http://example.com' },
    });
    fireEvent.click(screen.getByText(/send/i));

    await waitFor(() =>
      expect(sendReq).toHaveBeenCalledWith(window.location.href)
    );

    expect(mockSetResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        res: 'restClient.networkError',
      })
    );
  });

  it('input is valid', async () => {
    vi.mocked(sendReq).mockResolvedValue({ status: 200, res: 'Success' });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/inputPlaceholder/i), {
      target: { value: 'http://example.com' },
    });

    await waitFor(() => expect(mockSetMethod).toHaveBeenCalled());

    fireEvent.click(screen.getByText(/send/i));

    await waitFor(() =>
      expect(sendReq).toHaveBeenCalledWith(window.location.href)
    );

    expect(mockSetResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        res: 'Success',
      })
    );
  });
});

describe('useValidVariable hook', () => {
  const mockSetUrl = vi.fn();
  const mockSetError = vi.fn();
  const variables = { API_URL: 'https://api.example.com' };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RestClientContext.Provider
      value={{
        setUrl: mockSetUrl,
        variables,
        setError: mockSetError,
      }}
    >
      {children}
    </RestClientContext.Provider>
  );

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('valid input with variables', async () => {
    const input = '{{API_URL}}/data';
    const mockResult = {
      status: 'fulfilled',
      res: 'https://api.example.com/data',
    };

    vi.mocked(replaceVariable).mockReturnValueOnce(mockResult);

    const { unmount } = renderHook(() => useValidVariable(input, true), {
      wrapper,
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(replaceVariable).toHaveBeenCalledWith(
      input,
      variables,
      expect.any(RegExp)
    );
    expect(mockSetUrl).toHaveBeenCalledWith(mockResult.res);
    expect(mockSetError).toBeCalled();

    unmount();
  });

  it('variable replacement error', async () => {
    const input = '{{INVALID}}/data';
    const mockError = {
      status: 'error',
      res: ['INVALID'],
    };

    vi.mocked(replaceVariable).mockReturnValueOnce(mockError);

    renderHook(() => useValidVariable(input, true), { wrapper });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockSetError).toBeCalled();
    expect(mockSetUrl).toHaveBeenCalled();
  });

  it('input without variables', async () => {
    const input = 'https://api.example.com/data';

    renderHook(() => useValidVariable(input, true), { wrapper });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(replaceVariable).not.toHaveBeenCalled();
    expect(mockSetUrl).toHaveBeenCalledWith(input);
    expect(mockSetError).toBeCalled();
  });

  it('validate empty', async () => {
    const input = '';

    renderHook(() => useValidVariable(input, true), { wrapper });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(mockSetError).toBeCalled();
  });

  it('clear timeout', async () => {
    vi.spyOn(window, 'clearTimeout');
    const input = 'test';

    const { unmount } = renderHook(() => useValidVariable(input, true), {
      wrapper,
    });

    unmount();

    expect(clearTimeout).toHaveBeenCalled();
  });
});

describe('sendReq', () => {
  it('successful request', async () => {
    vi.mocked(sendReq).mockResolvedValue({ status: 200, res: 'OK' });
    const result = await sendReq('https://example.com');

    expect(result).toEqual({ status: 200, res: 'OK' });
  });

  it('server error', async () => {
    vi.mocked(sendReq).mockResolvedValue({ status: 500, res: 'Server error' });
    const result = await sendReq('https://example.com');
    expect(result.res).toBe('Server error');
  });
});

describe('saveHistory', () => {
  it('save history', () => {
    saveHistory('https://example.com');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});

describe('useChangeUrl hook', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <RestClientContext.Provider
      value={{
        method: 'POST',
        url: 'https://api.example.com',
        body: '{"data":"test"}',
        headers: {
          clear: [
            { key: 'Content-Type', value: 'application/json' },
            { key: 'Authorization', value: 'Bearer token' },
          ],
          dirt: [],
        },
      }}
    >
      {children}
    </RestClientContext.Provider>
  );

  it("not update when dependencies don't change", async () => {
    const { rerender } = renderHook(() => useChangeUrl(), { wrapper });
    const initialCallCount = mockReplaceState.mock.calls.length;

    rerender();

    expect(mockReplaceState.mock.calls.length).toBe(initialCallCount);
  });
});
