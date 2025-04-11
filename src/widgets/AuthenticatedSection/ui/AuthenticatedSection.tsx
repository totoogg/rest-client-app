'use client';

import { useUser } from '@/shared/lib/context';
import { Card, Col, Row } from 'antd';
import { useTranslations } from 'next-intl';

export const AuthenticatedSection = () => {
  const t = useTranslations();
  const user = useUser();

  const username = user || 'Custom Username';

  return (
    <>
      <h2>
        {t('homePage.startMessageUser')},
        <span className="span-username">{username}</span>!
      </h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Uladzimir Hancharou" variant="borderless">
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Liudmila Burbouskaya" variant="borderless">
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Marharyta Parkalava" variant="borderless">
            Card content
          </Card>
        </Col>
      </Row>
    </>
  );
};
