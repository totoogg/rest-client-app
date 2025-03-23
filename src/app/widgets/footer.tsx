import CourseLogo from '../shared/LogoComponents/CourseLogo';
const linkToCourse = 'https://rs.school/courses/reactjs';
const Footer = () => {
  return (
    <footer>
      <h1>Footer</h1>
      <a href={linkToCourse}>GitHub Link</a>
      <p>2025</p>
      <a className="link" href={linkToCourse}>
        <CourseLogo />
      </a>
    </footer>
  );
};

export default Footer;
