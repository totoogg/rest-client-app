import { Card, Flex, Typography } from 'antd';
import { TeamPeople } from '../model/typeDataTeam';
import { CheckCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';
const { Text, Link, Paragraph } = Typography;

export const CardAboutTeammate = ({
  fullName,
  translateName,
  linkGitHub,
  isHead,
  urlToPhoto,
  doneTasks,
}: TeamPeople) => {
  return (
    <Card
      title={translateName}
      variant="borderless"
      style={{
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      cover={
        <Image
          alt={fullName}
          src={urlToPhoto}
          width={250}
          height={135}
          style={{ objectFit: 'cover' }}
        />
      }
    >
      <Link>{linkGitHub}</Link>
      <Text>{isHead}</Text>
      <Flex vertical>
        {doneTasks.map((task) => (
          <Flex key={`${task}`} gap="10px">
            <CheckCircleOutlined twoToneColor="#52c41a" />
            <Paragraph>{task}</Paragraph>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};
