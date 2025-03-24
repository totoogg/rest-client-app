import { FC } from 'react';
import { CustomLink } from '@/shared/Link/index';
import { DataTeamProps } from '../model/typeDataTeam';

const TeamBlockFooter: FC<DataTeamProps> = ({ dataTeam }) => {
  return (
    <div className="footer-team">
      {dataTeam &&
        dataTeam.map((person) => (
          <CustomLink
            href={person.linkGitHub}
            text={person.fullName}
            key={person.fullName}
          />
        ))}
    </div>
  );
};

export default TeamBlockFooter;
