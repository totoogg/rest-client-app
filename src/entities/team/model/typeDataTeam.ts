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
  translateName: string;
  linkGitHub: TeamMemberGitHub;
  isHead: boolean;
  urlToPhoto: string;
  doneTasks: string[];
  aboutTeammate: string;
};

export type DataTeamProps = {
  dataTeam: TeamPeople[];
};
