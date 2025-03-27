import { CourseLogo } from '@/shared/Logo';
import { FooterTeamBlock } from '@/entities/team';
import { linkToCourse } from '@/widgets/Footer/consts/dataForFooter';

export const Footer = () => {
  return (
    <footer>
      <FooterTeamBlock />
      <p>2025</p>
      <a className="link" href={linkToCourse}>
        <CourseLogo />
      </a>
    </footer>
  );
};

Footer.displayName = 'Footer';
