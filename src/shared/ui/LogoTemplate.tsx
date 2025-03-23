'use client';

import Icon from '@ant-design/icons';
import { FC, ReactNode } from 'react';

interface LogoProps {
  icon: ReactNode;
  size?: number;
  width?: number;
  height?: number;
}

const LogoTemplate: FC<LogoProps> = ({ icon, size = 32, width, height }) => {
  return (
    <Icon
      className="link-svg-icon"
      component={() => icon}
      style={{
        fontSize: `${size}px`,
        width: width ? `${width}px` : `${size}px`,
        height: height ? `${height}px` : `${size}px`,
      }}
    />
  );
};

export default LogoTemplate;

// 'use client';

// import Icon from '@ant-design/icons';
// import { FC, ReactNode } from 'react';
// import { Button } from 'antd';

// interface LogoProps {
//   icon: ReactNode;
//   size?: number;
//   width?: number;
//   height?: number;
// }

// const LogoTemplate: FC<LogoProps> = ({ icon }) => {
//   return (
//     // type="link"
//     <Button type="link">
//       <Icon
//         component={() => icon}
//         style={{
//           fontSize: `${20}px`,
//           // width: width ? `${width}px` : `${size}px`,
//           // height: height ? `${height}px` : `${size}px`,
//         }}
//       />
//     </Button>
//   );
// };

// export default LogoTemplate;
