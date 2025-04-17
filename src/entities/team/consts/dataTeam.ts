import {
  TeamMemberGitHub,
  TeamMemberName,
  TeamPeople,
} from '../model/typeDataTeam';

import { useTranslations } from 'next-intl';

const useTeamData = (): TeamPeople[] => {
  const t = useTranslations();

  const dataTeam: TeamPeople[] = [
    {
      fullName: TeamMemberName.UladzimirHancharou,
      translateName: t('teamTranslate.vovaname'),
      linkGitHub: TeamMemberGitHub.totoogg,
      isHead: true,
      urlToPhoto: '../../Vova.jpg',
      doneTasks: [
        t('Uladzimir Hancharou.0'),
        t('Uladzimir Hancharou.1'),
        t('Uladzimir Hancharou.2'),
        t('Uladzimir Hancharou.3'),
        t('Uladzimir Hancharou.4'),
        t('Uladzimir Hancharou.5'),
      ],
      aboutTeammate: t('teamTranslate.vovaAbout'),
    },
    {
      fullName: TeamMemberName.LiudmilaBurbouskaya,
      translateName: t('teamTranslate.ludaname'),
      linkGitHub: TeamMemberGitHub.burbuha,
      isHead: false,
      urlToPhoto: '../../Luda.jpg',
      doneTasks: [
        t('Liudmila Burbouskaya.0'),
        t('Liudmila Burbouskaya.1'),
        t('Liudmila Burbouskaya.2'),
        t('Liudmila Burbouskaya.3'),
        t('Liudmila Burbouskaya.4'),
        t('Liudmila Burbouskaya.5'),
        t('Liudmila Burbouskaya.6'),
      ],
      aboutTeammate: t('teamTranslate.ludaAbout'),
    },
    {
      fullName: TeamMemberName.MarharytaParkalava,
      translateName: t('teamTranslate.margoname'),
      linkGitHub: TeamMemberGitHub.margaritabraun,
      isHead: false,
      urlToPhoto: '../../Margo.jpg',
      doneTasks: [
        t('Marharyta Parkalava.0'),
        t('Marharyta Parkalava.1'),
        t('Marharyta Parkalava.2'),
        t('Marharyta Parkalava.3'),
        t('Marharyta Parkalava.4'),
      ],
      aboutTeammate: t('teamTranslate.margoAbout'),
    },
  ];

  return dataTeam;
};

export default useTeamData;
