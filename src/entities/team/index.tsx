import { FC } from 'react';
import TeamBlockFooter from '@/entities/team/ui/TeamBlockFooter';
import dataTeam from '@/entities/team/consts/dataTeam';

const FooterTeamBlock: FC = () => {
  return <TeamBlockFooter dataTeam={dataTeam} />;
};

export { FooterTeamBlock };
