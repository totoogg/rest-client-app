import { Card, Typography, Image } from 'antd';
import { TeamPeople } from '../model/typeDataTeam';
// import { Space, Typography } from 'antd';

const { Text, Link } = Typography;

export const CardAboutTeammate = ({
  fullName,
  translateName,
  linkGitHub,
  isHead,
  urlToPhoto,
}: TeamPeople) => {
  return (
    <Card title={translateName} variant="borderless">
      Card content
      <Image width={100} src={urlToPhoto} alt={fullName} />
      <Text>{fullName}</Text>
      <Link>{linkGitHub}</Link>
      <Text>{isHead}</Text>
      <Text>{urlToPhoto}</Text>
    </Card>
  );
};
