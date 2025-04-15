import { render, screen, fireEvent, renderHook } from '@testing-library/react';
import { CodeGenerator } from '../../features';
import { RestClientContext } from '@/shared';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ConfigProvider } from 'antd';
import * as postman from 'postman-code-generators';
import { useCodeGenerator } from '@/features/CodeGenerator/lib';
import { Request } from 'postman-collection';
import { act } from 'react';

const whenStable = async () =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

const mockSetCode = vi.fn();

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

  vi.mock('postman-code-generators', () => ({
    convert: vi.fn(
      (
        language: string,
        variant: string,
        request: unknown,
        options: unknown,
        callback: (error: Error | null, code?: string) => void
      ) => {
        callback(null, 'generated-code');
      }
    ) as unknown as typeof import('postman-code-generators').convert,
  }));

  vi.mock('../lib/useCodeGenerator', () => ({
    useCodeGenerator: vi.fn(),
  }));

  vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) =>
      ({
        'restClient.code': 'Code',
        'restClient.none': 'None',
        'restClient.urlErrorFill': 'URL required',
        'restClient.codeErrorBody': 'Body error',
        'restClient.codeErrorUrl': 'URL error',
        'restClient.codeErrorHeaders': 'Headers error',
      })[key],
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

const mockContextValue = {
  url: 'https://api.example.com',
  method: 'GET',
  body: '{"data":"test"}',
  headers: {
    clear: [{ key: 'Content-Type', value: 'application/json' }],
    dirt: [],
  },
  error: {
    inputValid: false,
    inputValidVariable: '',
    inputBodyValidVariable: '',
    headersValidVariable: '',
    errorBody: false,
  },
};

const renderComponent = () =>
  render(
    <ConfigProvider>
      <RestClientContext.Provider value={mockContextValue}>
        <CodeGenerator />
      </RestClientContext.Provider>
    </ConfigProvider>
  );

describe('CodeGenerator component', () => {
  it('render', () => {
    renderComponent();
    expect(screen.getByText('Code:')).toBeInTheDocument();
    expect(screen.getByText('None')).toBeInTheDocument();
  });

  it('show code', () => {
    renderComponent();

    fireEvent.mouseDown(screen.getByText('None'));
    fireEvent.click(screen.getByText('JavaScript (Fetch api)'));

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('error', async () => {
    const errorContext = {
      ...mockContextValue,
      error: {
        inputValid: true,
        inputValidVariable: 'var1',
        inputBodyValidVariable: 'var2',
        headersValidVariable: 'var3',
        errorBody: true,
      },
    };

    render(
      <ConfigProvider>
        <RestClientContext.Provider value={errorContext}>
          <CodeGenerator />
        </RestClientContext.Provider>
      </ConfigProvider>
    );

    fireEvent.mouseDown(screen.getByText('None'));
    fireEvent.click(screen.getByText('JavaScript (Fetch api)'));

    await whenStable();

    expect(
      screen.getByText('URL required. Body error. URL error. Headers error.')
    ).toBeInTheDocument();
  });
});

describe('useCodeGenerator', () => {
  it('generate code with body', () => {
    const mockContextValue = {
      method: 'POST',
      url: 'https://api.example.com',
      body: '{"data":"test"}',
      headers: {
        clear: [{ key: 'Content-Type', value: 'application/json' }],
        dirt: [],
      },
    };
    const { rerender } = renderHook(
      ({ lang }) => useCodeGenerator(lang, mockSetCode),
      {
        initialProps: { lang: 'none' },
        wrapper: ({ children }) => (
          <RestClientContext.Provider value={mockContextValue}>
            {children}
          </RestClientContext.Provider>
        ),
      }
    );

    const customRequest = new Request({
      url: 'https://api.example.com',
      method: 'POST',
      header: [
        {
          key: 'Content-Type',
          value: 'application/json',
        },
      ],
      body: undefined,
    });

    const options = {
      indentCount: 4,
      indentType: 'Space' as const,
      trimRequestBody: true,
      followRedirect: true,
    };

    rerender({ lang: 'fetch' });

    postman.convert(
      'JavaScript',
      'Fetch',
      customRequest,
      options,
      (_, code) => {
        expect(code).toEqual('generated-code');
      }
    );

    expect(mockSetCode).toHaveBeenCalledWith('generated-code');
  });

  it('generate code without body', () => {
    const mockContextValue = {
      method: 'POST',
      url: 'https://api.example.com',
      body: undefined,
      headers: {
        clear: [{ key: 'Content-Type', value: 'application/json' }],
        dirt: [],
      },
    };
    const { rerender } = renderHook(
      ({ lang }) => useCodeGenerator(lang, mockSetCode),
      {
        initialProps: { lang: 'none' },
        wrapper: ({ children }) => (
          <RestClientContext.Provider value={mockContextValue}>
            {children}
          </RestClientContext.Provider>
        ),
      }
    );

    const customRequest = new Request({
      url: 'https://api.example.com',
      method: 'POST',
      header: [
        {
          key: 'Content-Type',
          value: 'application/json',
        },
      ],
      body: {
        mode: 'raw',
        raw: '{"data":"test"}',
      },
    });

    const options = {
      indentCount: 4,
      indentType: 'Space' as const,
      trimRequestBody: true,
      followRedirect: true,
    };

    rerender({ lang: 'fetch' });

    postman.convert(
      'JavaScript',
      'Fetch',
      customRequest,
      options,
      (_, code) => {
        expect(code).toEqual('generated-code');
      }
    );

    expect(mockSetCode).toHaveBeenCalledWith('generated-code');
  });
});
