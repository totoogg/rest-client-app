import { Card, Col, Row } from 'antd';

export const AuthenticatedSection = () => {
  return (
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
  );
};
