import CourseLogo from '../shared/LogoComponents/CourseLogo';
import TeamFooter from './teamFooter';
const linkToCourse = 'https://rs.school/courses/reactjs';
const Footer = () => {
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

export default Footer;
