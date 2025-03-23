import LogoTemplate from '../ui/LogoTemplate';
import FireSvg from '@/assets/logo.svg';

const MainLogo = () => {
  return (
    <div>
      <LogoTemplate icon={<FireSvg />} size={50} />
    </div>
  );
};

export default MainLogo;
