import LogoTemplate from './UI/LogoTemplate';
import FireSvg from '@/assets/logo.svg';
import RsslogoSvg from '@/assets/rss-logo.svg';

export const CourseLogo = () => {
  return (
    <div>
      <LogoTemplate icon={<RsslogoSvg />} size={50} />
    </div>
  );
};

export const MainLogo = () => {
  return (
    <div>
      <LogoTemplate icon={<FireSvg />} size={50} />
    </div>
  );
};
