import { History } from '@/widgets';
import { ConfigProvider } from 'antd';

export default function Page() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Divider: {
            lineWidth: 2,
            colorSplit: '#ffec3d',
          },
        },
      }}
    >
      <History />
    </ConfigProvider>
  );
}
