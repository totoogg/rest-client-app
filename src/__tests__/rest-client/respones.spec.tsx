import { render, screen } from '@testing-library/react';
import { Response } from '../../entities';
import { RestClientContext } from '@/shared';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ConfigProvider } from 'antd';

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
        'restClient.response': 'Response',
        'restClient.status': 'Status',
      })[key],
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

const renderComponent = (response?: { status: number; res: string }) => {
  return render(
    <ConfigProvider>
      <RestClientContext.Provider value={{ response }}>
        <Response />
      </RestClientContext.Provider>
    </ConfigProvider>
  );
};

describe('Response component', () => {
  it('render', () => {
    renderComponent();

    expect(screen.getByText('Response')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('success', () => {
    renderComponent({ status: 200, res: 'OK' });

    const statusText = screen.getByText('200');
    expect(statusText).toHaveClass('ant-typography-success');
    expect(screen.getByRole('textbox')).toHaveValue('OK');
  });

  it('error', () => {
    renderComponent({ status: 404, res: 'Not Found' });

    const statusText = screen.getByText('404');
    expect(statusText).toHaveClass('ant-typography-danger');
    expect(screen.getByRole('textbox')).toHaveValue('Not Found');
  });

  it('status is -1', () => {
    renderComponent({ status: -1, res: 'Error' });

    expect(screen.queryByText('-1')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('Error');
  });

  it('undefined response', () => {
    renderComponent(undefined);

    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});
