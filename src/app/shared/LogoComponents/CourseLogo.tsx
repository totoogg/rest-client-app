import LogoTemplate from '../ui/LogoTemplate';
import RsslogoSvg from '../../../assets/rss-logo.svg';

const CourseLogo = () => {
  return (
    <div>
      <LogoTemplate icon={<RsslogoSvg />} size={50} />
    </div>
  );
};

export default CourseLogo;
