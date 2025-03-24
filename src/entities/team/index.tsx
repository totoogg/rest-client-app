import { FC } from 'react';
import TeamBlockFooter from './UI/TeamBlockFooter';
import dataTeam from './Consts/dataTeam';

const FooterTeamBlock: FC = () => {
  return <TeamBlockFooter dataTeam={dataTeam} />;
};

export { FooterTeamBlock };
