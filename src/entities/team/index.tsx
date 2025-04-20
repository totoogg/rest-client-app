import { FC } from 'react';
import TeamBlockFooter from '@/entities/team/ui/TeamBlockFooter';
import useTeamData from './consts/dataTeam';

const FooterTeamBlock: FC = () => {
  const teamData = useTeamData();
  return <TeamBlockFooter dataTeam={teamData} />;
};

export { FooterTeamBlock };
export { CardAboutTeammate } from './ui/CardAboutTeammate';
