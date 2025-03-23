import dataTeam from '@/entities/team/dataTeam';
import MyLink from '@/shared/ui/Link';

const TeamBlock = () => {
  return (
    <div className="footer-team">
      {dataTeam &&
        dataTeam.map((people) => (
          <MyLink
            href={people.linkGitHub}
            text={people.fullName}
            key={people.fullName}
          />
        ))}
    </div>
  );
};

export default TeamBlock;
