import {
  TeamMemberGitHub,
  TeamMemberName,
  TeamPeople,
} from '../model/typeDataTeam';

const dataTeam: TeamPeople[] = [
  {
    fullName: TeamMemberName.UladzimirHancharou,
    linkGitHub: TeamMemberGitHub.totoogg,
    isHead: true,
  },
  {
    fullName: TeamMemberName.LiudmilaBurbouskaya,
    linkGitHub: TeamMemberGitHub.burbuha,
    isHead: false,
  },
  {
    fullName: TeamMemberName.MarharytaParkalava,
    linkGitHub: TeamMemberGitHub.margaritabraun,
    isHead: false,
  },
];

export default dataTeam;
