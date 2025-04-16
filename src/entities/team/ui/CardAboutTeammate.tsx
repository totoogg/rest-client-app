import { Button, Card, Collapse, Flex, Typography } from 'antd';
import { TeamPeople } from '../model/typeDataTeam';
import {
  CaretRightOutlined,
  CheckCircleTwoTone,
  CrownTwoTone,
  GithubFilled,
  StarTwoTone,
} from '@ant-design/icons';

const { Text } = Typography;

export const CardAboutTeammate = ({
  fullName,
  translateName,
  linkGitHub,
  isHead,
  urlToPhoto,
  doneTasks,
  aboutTeammate,
}: TeamPeople) => {
  return (
    <Card
      title={translateName}
      extra={
        isHead ? (
          <CrownTwoTone twoToneColor="#52c41a" />
        ) : (
          <StarTwoTone twoToneColor="#ffec3d" />
        )
      }
      variant="borderless"
      style={{
        width: '350px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      styles={{
        header: {
          justifyContent: 'space-between',
          width: '100%',
        },
      }}
      cover={
        <img
          alt={fullName}
          src={urlToPhoto}
          width={250}
          height={135}
          style={{ objectFit: 'cover' }}
        />
      }
    >
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        items={[{ key: '1', label: 'About', children: <p>{aboutTeammate}</p> }]}
      />
      <Flex justify="center" style={{ padding: '5px 0' }}>
        <Button icon={<GithubFilled />} href={linkGitHub} target="_blank" />
      </Flex>
      <Flex vertical>
        {doneTasks.map((task) => (
          <Flex key={`${task}`} gap="10px">
            <CheckCircleTwoTone twoToneColor="#52c41a" />
            <Text>{task}</Text>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};
