enum TeamMemberName {
  UladzimirHancharou = 'Uladzimir Hancharou',
  LiudmilaBurbouskaya = 'Liudmila Burbouskaya',
  MarharytaParkalava = 'Marharyta Parkalava',
}

enum TeamMemberGitHub {
  totoogg = 'https://github.com/totoogg',
  burbuha = 'https://github.com/burbuha',
  margaritabraun = 'https://github.com/margaritabraun',
}

type TeamPeople = {
  fullName: TeamMemberName;
  linkGitHub: TeamMemberGitHub;
  isHead: boolean;
};

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
