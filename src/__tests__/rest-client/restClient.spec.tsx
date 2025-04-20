import { render, screen } from '@testing-library/react';
import { RestClient } from '../../widgets';
import { RestClientContext } from '@/shared';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import styles from '../../widgets/RestClient/ui/RestClient.module.css';

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

  vi.mock('@/features', () => ({
    Body: () => <div data-testid="body-component">Body</div>,
    CodeGenerator: () => (
      <div data-testid="codegen-component">CodeGenerator</div>
    ),
    Headers: () => <div data-testid="headers-component">Headers</div>,
    UrlLine: ({
      methodSelect,
      urlServer,
    }: {
      methodSelect: string;
      urlServer: string;
    }) => (
      <div data-testid="urlline-component">
        {methodSelect}-{urlServer}
      </div>
    ),
  }));

  vi.mock('@/entities', () => ({
    Response: () => <div data-testid="response-component">Response</div>,
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

const mockContextValue = {
  response: { status: -1, res: '' },
  error: {
    inputValid: false,
    headersValidVariable: '',
    errorBody: false,
    inputBodyValidVariable: '',
    inputValidVariable: '',
  },
  headers: { clear: [], dirt: [] },
  setHeaders: vi.fn(),
  setBody: vi.fn(),
  setError: vi.fn(),
};

const renderComponent = (props = { slug: [''], searchParams: {} }) => {
  return render(
    <RestClientContext.Provider value={mockContextValue}>
      <RestClient {...props} />
    </RestClientContext.Provider>
  );
};

describe('RestClient component', () => {
  it('render', () => {
    renderComponent();

    expect(screen.getByTestId('urlline-component')).toBeInTheDocument();
    expect(screen.getByTestId('headers-component')).toBeInTheDocument();
    expect(screen.getByTestId('body-component')).toBeInTheDocument();
    expect(screen.getByTestId('codegen-component')).toBeInTheDocument();
    expect(screen.getByTestId('response-component')).toBeInTheDocument();
  });

  it('correct props to UrlLine and Body', () => {
    const slug = ['POST', 'encodedUrl', 'bodyContent'];
    const searchParams = { param1: 'value1' };

    renderComponent({ slug, searchParams });

    const urlLine = screen.getByTestId('urlline-component');
    expect(urlLine.textContent).toBe('POST-encodedUrl');
  });

  it('empty slug array', () => {
    renderComponent({ slug: [], searchParams: {} });

    const urlLine = screen.getByTestId('urlline-component');
    expect(urlLine.textContent).toBe('-');
  });

  it('layout classes', () => {
    const { container } = renderComponent();

    const flexContainer = container.querySelectorAll(
      'div[class*="wrapper"]'
    )[0];
    expect(flexContainer).toHaveClass(styles.wrapper);
    expect(flexContainer).toHaveClass('ant-flex');
    expect(flexContainer).toHaveClass('ant-flex-vertical');
  });
});
