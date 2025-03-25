import { FC } from 'react';
import TeamBlockFooter from './ui/TeamBlockFooter';
import dataTeam from './consts/dataTeam';

const FooterTeamBlock: FC = () => {
  return <TeamBlockFooter dataTeam={dataTeam} />;
};

export { FooterTeamBlock };
