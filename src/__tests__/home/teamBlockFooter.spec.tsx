import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TeamBlockFooter from '@/entities/team/ui/TeamBlockFooter';
import {
  DataTeamProps,
  TeamMemberGitHub,
  TeamMemberName,
} from '@/entities/team/model/typeDataTeam';

beforeEach(() => {
  vi.mock('@/shared/Link', () => ({
    CustomLink: vi.fn(({ href, text }) => (
      <a data-testid="custom-link" href={href}>
        {text}
      </a>
    )),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

const mockDataTeam: DataTeamProps = {
  dataTeam: [
    {
      fullName: TeamMemberName.UladzimirHancharou,
      linkGitHub: TeamMemberGitHub.totoogg,
      isHead: false,
      translateName: TeamMemberName.UladzimirHancharou,
      urlToPhoto: '',
      doneTasks: [],
      aboutTeammate: '',
    },
    {
      fullName: TeamMemberName.LiudmilaBurbouskaya,
      linkGitHub: TeamMemberGitHub.burbuha,
      isHead: false,
      translateName: TeamMemberName.LiudmilaBurbouskaya,
      urlToPhoto: '',
      doneTasks: [],
      aboutTeammate: '',
    },
    {
      fullName: TeamMemberName.MarharytaParkalava,
      linkGitHub: TeamMemberGitHub.margaritabraun,
      isHead: false,
      translateName: TeamMemberName.MarharytaParkalava,
      urlToPhoto: '',
      doneTasks: [],
      aboutTeammate: '',
    },
  ],
};

describe('TeamBlockFooter component', () => {
  it('renders', () => {
    render(<TeamBlockFooter dataTeam={mockDataTeam.dataTeam} />);

    const links = screen.getAllByTestId('custom-link');
    expect(links).toHaveLength(mockDataTeam.dataTeam.length);
  });

  it('correct names and links', () => {
    render(<TeamBlockFooter dataTeam={mockDataTeam.dataTeam} />);

    mockDataTeam.dataTeam.forEach((member) => {
      const link = screen.getByText(member.fullName);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', member.linkGitHub);
    });
  });

  it('dataTeam is empty', () => {
    render(<TeamBlockFooter dataTeam={[]} />);

    expect(screen.queryByTestId('custom-link')).not.toBeInTheDocument();
  });
});
