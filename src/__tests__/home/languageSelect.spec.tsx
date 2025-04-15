import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LanguageSelect } from '@/shared/LanguageSelect';
import * as navigator from 'next/navigation';
import * as device from '@/shared/hooks/use-device';

const mockPush = vi.fn();
const mockPathname = '/en/some-page';
const mockUseDevice = vi.spyOn(device, 'useDevice');
const renderComponent = (locale: 'en' | 'ru' = 'en') => {
  return render(<LanguageSelect locale={locale} />);
};

beforeEach(() => {
  vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
    usePathname: vi.fn(),
  }));

  vi.mock('@/shared/hooks/use-device', () => ({
    useDevice: vi.fn(),
  }));

  vi.mock('antd', () => ({
    Select: vi.fn(({ onChange, options, value }) => (
      <select
        data-testid="desktop-select"
        onChange={(e) => onChange(e.target.value, e)}
        value={value}
      >
        {options.map((opt: { value: string; label: string }) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    )),
    Radio: {
      Group: vi.fn(({ onChange, options, value }) => (
        <div data-testid="mobile-radio">
          {options.map((opt: { value: string; label: string }) => (
            <label key={opt.value}>
              <input
                type="radio"
                value={opt.value}
                checked={value === opt.value}
                onChange={(e) =>
                  onChange({ target: { value: e.target.value } })
                }
              />
              {opt.label}
            </label>
          ))}
        </div>
      )),
    },
  }));
  vi.spyOn(navigator, 'useRouter').mockReturnValue({
    push: mockPush,
    back: function (): void {
      throw new Error('Function not implemented.');
    },
    forward: function (): void {
      throw new Error('Function not implemented.');
    },
    refresh: function (): void {
      throw new Error('Function not implemented.');
    },
    replace: function (): void {
      throw new Error('Function not implemented.');
    },
    prefetch: function (): void {
      throw new Error('Function not implemented.');
    },
  });
  vi.spyOn(navigator, 'usePathname').mockReturnValue(mockPathname);
  mockUseDevice.mockReturnValue(false);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('LanguageSelect component', () => {
  it('render desktop', () => {
    vi.spyOn(console, 'error').mockReturnValue();
    renderComponent();
    expect(screen.getByTestId('desktop-select')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-radio')).toBeNull();
  });

  it('render mobile', () => {
    mockUseDevice.mockReturnValue(true);
    renderComponent();
    expect(screen.getByTestId('mobile-radio')).toBeInTheDocument();
    expect(screen.queryByTestId('desktop-select')).toBeNull();
  });

  it('labels for desktop', () => {
    renderComponent();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Русский')).toBeInTheDocument();
  });

  it('labels for mobile', () => {
    mockUseDevice.mockReturnValue(true);
    renderComponent();
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('RU')).toBeInTheDocument();
  });

  it('change language', () => {
    vi.spyOn(navigator, 'usePathname').mockReturnValue(
      '/en/complex/path?query=123'
    );
    renderComponent();
    fireEvent.change(screen.getByTestId('desktop-select'), {
      target: { value: 'ru' },
    });

    expect(mockPush).toHaveBeenCalledWith('/ru/complex/path?query=123');
  });
});
