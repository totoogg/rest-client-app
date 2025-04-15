import {
  TeamMemberGitHub,
  TeamMemberName,
  TeamPeople,
} from '../model/typeDataTeam';

import { useTranslations } from 'next-intl';

// const t = useTranslations();

const useTeamData = (): TeamPeople[] => {
  const t = useTranslations();

  const dataTeam: TeamPeople[] = [
    {
      fullName: TeamMemberName.UladzimirHancharou,
      translateName: t('teamTranslate.vovaname'),
      linkGitHub: TeamMemberGitHub.totoogg,
      isHead: true,
      urlToPhoto: '../../Vova.jpg',
    },
    {
      fullName: TeamMemberName.LiudmilaBurbouskaya,
      translateName: t('teamTranslate.ludaname'),
      linkGitHub: TeamMemberGitHub.burbuha,
      isHead: false,
      urlToPhoto: '../../Luda.jpg',
    },
    {
      fullName: TeamMemberName.MarharytaParkalava,
      translateName: t('teamTranslate.margoname'),
      linkGitHub: TeamMemberGitHub.margaritabraun,
      isHead: false,
      urlToPhoto: '../Margo.jpg',
    },
  ];

  return dataTeam;
};

export default useTeamData;
