import { CourseLogo } from '@/shared/Logo';
import { FooterTeamBlock } from '@/entities/team';
import { linkToCourse } from '../Consts/dataForFooter';

export const Footer = () => {
  return (
    <footer>
      <h1>Footer</h1>
      <FooterTeamBlock />
      <p>2025</p>
      <a className="link" href={linkToCourse}>
        <CourseLogo />
      </a>
    </footer>
  );
};

Footer.displayName = 'Footer';
