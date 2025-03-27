import { CourseLogo } from '@/shared/Logo';
import { FooterTeamBlock } from '@/entities/Team';
import { linkToCourse } from '../consts/dataForFooter';

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
