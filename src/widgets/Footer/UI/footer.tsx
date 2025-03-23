import CourseLogo from '../../../shared/LogoComponents/CourseLogo';
import TeamFooter from '../../../entities/team/teamFooter';
const linkToCourse = 'https://rs.school/courses/reactjs';

export const Footer = () => {
  return (
    <footer>
      <h1>Footer</h1>
      {/* <a href={linkToCourse}>GitHub Link</a> */}
      <TeamFooter />
      <p>2025</p>
      <a className="link" href={linkToCourse}>
        <CourseLogo />
      </a>
    </footer>
  );
};

Footer.displayName = 'Footer';
// export default Footer;
