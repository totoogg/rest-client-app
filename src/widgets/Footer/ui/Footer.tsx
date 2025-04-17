import { CourseLogo } from '@/shared/Logo';
import { FooterTeamBlock } from '@/entities/team';
import { linkToCourse } from '@/widgets/Footer/consts/dataForFooter';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <FooterTeamBlock />
        <p>2025</p>
        <a className="link" href={linkToCourse}>
          <CourseLogo />
        </a>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
