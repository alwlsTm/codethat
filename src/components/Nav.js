import Container from './Container';
import UserMenu from "./UserMenu";
import styles from './Nav.module.css';
import logoImg from '../IMGS/logo.svg';

function Nav() {
  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <img src={logoImg} alt="codethat"></img>
        <ul className={styles.menu}>
          <li>카탈로그</li>
          <li>커뮤니티</li>
          <li>
            <UserMenu />
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;