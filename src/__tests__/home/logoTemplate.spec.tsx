import { render } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import LogoTemplate from '../../shared/Logo/ui/LogoTemplate';

beforeEach(() => {
  vi.mock('@ant-design/icons', () => ({
    default: vi.fn(({ component, className, style }) => (
      <div data-testid="antd-icon" className={className} style={style}>
        {component()}
      </div>
    )),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

const TestSvg = () => <svg data-testid="test-svg" />;

describe('LogoTemplate component', () => {
  it('renders', () => {
    const { getByTestId } = render(
      <LogoTemplate icon={<TestSvg />} size={40} width={50} height={60} />
    );

    const icon = getByTestId('antd-icon');

    expect(icon).toHaveClass('link-svg-icon');
    expect(icon).toHaveStyle({
      fontSize: '40px',
      width: '50px',
      height: '60px',
    });

    expect(getByTestId('test-svg')).toBeInTheDocument();
  });

  it('not provided', () => {
    const { getByTestId } = render(
      <LogoTemplate icon={<TestSvg />} size={32} />
    );

    expect(getByTestId('antd-icon')).toHaveStyle({
      width: '32px',
      height: '32px',
    });
  });

  it('default size', () => {
    const { getByTestId } = render(<LogoTemplate icon={<TestSvg />} />);

    expect(getByTestId('antd-icon')).toHaveStyle({
      fontSize: '32px',
      width: '32px',
      height: '32px',
    });
  });

  it('prioritizes size', () => {
    const { getByTestId } = render(
      <LogoTemplate icon={<TestSvg />} size={30} width={40} height={50} />
    );

    expect(getByTestId('antd-icon')).toHaveStyle({
      width: '40px',
      height: '50px',
    });
  });
});
