'use client';

import useTeamData from '@/entities/team/consts/dataTeam';
import { CardAboutTeammate } from '@/entities/team/ui/CardAboutTeammate';
import { useUser } from '@/shared/lib/context';
import { Flex } from 'antd';
import { useTranslations } from 'next-intl';
import styles from './AuthenticatedSection.module.css';

export const AuthenticatedSection = () => {
  const t = useTranslations();
  const user = useUser();
  const teamData = useTeamData();

  const username = user || t('homePage.noneUserNickName');

  return (
    <>
      {user ? (
        <h2 className={styles.title}>
          {t('homePage.startMessageUser')},
          <span className="span-username">{username}</span>!
        </h2>
      ) : (
        <h2 className={styles.title}>{t('homePage.startMessage')}!</h2>
      )}

      <Flex vertical align="center">
        <h2 className={styles.title}>{t('homePage.developers')}</h2>
        <Flex wrap gap={10} justify="center">
          {teamData &&
            teamData.map((person) => (
              // <Col span={8} key={person.fullName}>
              <CardAboutTeammate key={person.fullName} {...person} />
              // </Col>
            ))}
          {/* <Card
            className={styles.card}
            title="Uladzimir Hancharou"
            variant="borderless"
          > */}
          {/* content
          </Card>
          <Card
            className={styles.card}
            title="Liudmila Burbouskaya"
            variant="borderless"
          >
            content */}
          {/* </Card>
          <Card
            className={styles.card}
            title="Marharyta Parkalava"
            variant="borderless"
          >
            content
          </Card> */}
        </Flex>
      </Flex>
    </>
  );
};
