import { TeamMemberName, TeamPeople } from '../model/typeDataTeam';

interface getDataForTeammateProps {
  fullData: TeamPeople[];
  selectedPerson: TeamMemberName;
}

export const getDataForTeammate = ({
  fullData,
  selectedPerson,
}: getDataForTeammateProps): TeamPeople | undefined => {
  const filtered = fullData.filter((item) => item.fullName === selectedPerson);
  return filtered[0];
};
