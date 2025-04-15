'use client';

import { useUser } from '@/shared/lib/context';
import { Card, Flex } from 'antd';
import { useTranslations } from 'next-intl';
import styles from './AuthenticatedSection.module.css';

export const AuthenticatedSection = () => {
  const t = useTranslations();
  const user = useUser();

  const username = user;

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
          <Card
            className={styles.card}
            title="Uladzimir Hancharou"
            variant="borderless"
          >
            content
          </Card>
          <Card
            className={styles.card}
            title="Liudmila Burbouskaya"
            variant="borderless"
          >
            content
          </Card>
          <Card
            className={styles.card}
            title="Marharyta Parkalava"
            variant="borderless"
          >
            content
          </Card>
        </Flex>
      </Flex>
    </>
  );
};
