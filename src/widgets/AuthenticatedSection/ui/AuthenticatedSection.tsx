'use client';

import useTeamData from '@/entities/team/consts/dataTeam';
import { CardAboutTeammate } from '@/entities/team/ui/CardAboutTeammate';
import { useUser } from '@/shared/lib/context';
import { Col, Row } from 'antd';
import { useTranslations } from 'next-intl';

export const AuthenticatedSection = () => {
  const t = useTranslations();
  const user = useUser();
  const teamData = useTeamData();

  const username = user || t('homePage.noneUserNickName');

  return (
    <>
      <h2>
        {t('homePage.startMessageUser')},
        <span className="span-username">{username}</span>!
      </h2>
      <Row gutter={16}>
        {teamData &&
          teamData.map((person) => (
            <Col span={8} key={person.fullName}>
              <CardAboutTeammate {...person} />
            </Col>
          ))}
      </Row>
    </>
  );
};
