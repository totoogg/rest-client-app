export enum TeamMemberName {
  UladzimirHancharou = 'Uladzimir Hancharou',
  LiudmilaBurbouskaya = 'Liudmila Burbouskaya',
  MarharytaParkalava = 'Marharyta Parkalava',
}

export enum TeamMemberGitHub {
  totoogg = 'https://github.com/totoogg',
  burbuha = 'https://github.com/burbuha',
  margaritabraun = 'https://github.com/margaritabraun',
}

export type TeamPeople = {
  fullName: TeamMemberName;
  linkGitHub: TeamMemberGitHub;
  isHead: boolean;
};

export type DataTeamProps = {
  dataTeam: TeamPeople[];
};
