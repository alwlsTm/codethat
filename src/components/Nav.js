import { Link } from 'react-router-dom';
import Container from './Container';
import UserMenu from "./UserMenu";
import styles from './Nav.module.css';
import logoImg from '../IMGS/logo.svg';

function Nav() {
  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to="/"><img src={logoImg} alt="codethat"></img></Link>
        <ul className={styles.menu}>
          <li><Link to="/courses">카탈로그</Link></li>
          <li><Link to="/questions">커뮤니티</Link></li>
          <li>
            <UserMenu />
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;