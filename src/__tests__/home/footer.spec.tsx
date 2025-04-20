import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Footer } from '@/widgets';
import { CourseLogo, MainLogo } from '@/shared/Logo';
import { FooterTeamBlock } from '@/entities/team';
import { linkToCourse } from '@/widgets/Footer/consts/dataForFooter';
import { CustomLink } from '@/shared/Link';
import { afterEach } from 'node:test';

const mockDataTeam = [
  { fullName: 'Uladzimir Hancharou', linkGitHub: 'https://github.com/1' },
  { fullName: 'Liudmila Burbouskaya', linkGitHub: 'https://github.com/2' },
  { fullName: 'Marharyta Parkalava', linkGitHub: 'https://github.com/3' },
];

beforeEach(() => {
  vi.mock('@/assets/rss-logo.svg', () => ({
    default: () => <svg data-testid="rss-logo" />,
  }));

  vi.mock('@/assets/logo.svg', () => ({
    default: () => <svg data-testid="fire-logo" />,
  }));

  vi.mock('@/shared/Logo/ui/LogoTemplate', () => ({
    default: ({ icon, size }: { icon: React.ReactNode; size: number }) => (
      <div data-testid="logo-template" data-size={size}>
        {icon}
      </div>
    ),
  }));
  vi.mock('@/entities/team/ui/TeamBlockFooter', () => ({
    default: ({ dataTeam }: { dataTeam: typeof mockDataTeam }) => (
      <div data-testid="team-block">
        {dataTeam.map((person) => (
          <CustomLink
            key={person.fullName}
            href={person.linkGitHub}
            text={person.fullName}
          />
        ))}
      </div>
    ),
  }));
  vi.mock('next-intl', () => ({
    useTranslations: () => (key: string) => ({})[key],
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Footer component', () => {
  it('render footer', () => {
    const { container, getByTestId, getByText } = render(<Footer />);

    expect(getByTestId('team-block')).toBeInTheDocument();
    expect(getByText('2025')).toBeInTheDocument();
    expect(getByTestId('rss-logo')).toBeInTheDocument();
    expect(
      container.querySelectorAll(
        'a[href*="https://rs.school/courses/reactjs"]'
      )[0]
    ).toHaveAttribute('href', linkToCourse);
  });
});

describe('CourseLogo component', () => {
  it('render RSS logo', () => {
    render(<CourseLogo />);

    const logo = screen.getByTestId('logo-template');
    expect(logo).toHaveAttribute('data-size', '50');
    expect(screen.getByTestId('rss-logo')).toBeInTheDocument();
  });
});

describe('MainLogo component', () => {
  it('render logo', () => {
    render(<MainLogo />);

    const logo = screen.getByTestId('logo-template');
    expect(logo).toHaveAttribute('data-size', '50');
    expect(screen.getByTestId('fire-logo')).toBeInTheDocument();
  });
});

describe('FooterTeamBlock component', () => {
  it('render team', () => {
    render(<FooterTeamBlock />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(mockDataTeam.length);

    mockDataTeam.forEach((person) => {
      expect(screen.getByText(person.fullName)).toBeInTheDocument();
    });
  });
});

describe('CustomLink component', () => {
  it('render link', () => {
    const testProps = {
      href: 'https://test.com',
      text: 'Test Link',
    };

    render(<CustomLink {...testProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', testProps.href);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveTextContent(testProps.text);
  });
});
