import { Link, NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atoms/userAtom';
import Container from './Container';
import UserMenu from "./UserMenu";
import styles from './Nav.module.css';
import logoImg from '../IMGS/logo.svg';

function getLinkStyle({ isActive }) { //현재 페이지가 내비게이션 링크에 해당될 경우, isActive는 true
  return {  //인라인 스타일 객체 리턴
    textDecoration: isActive ? 'underline' : undefined, //isActive가 true일 경우, 텍스트에 밑줄 추가
  }
}

function Nav() {
  const user = useRecoilValue(userState);

  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to="/">
          <img src={logoImg} alt="codethat"></img>
        </Link>
        <ul className={styles.menu}>
          <li>
            <NavLink to="/courses" style={getLinkStyle}>
              카탈로그
            </NavLink>
          </li>
          <li>
            <NavLink to="/questions" style={getLinkStyle}>
              커뮤니티
            </NavLink>
          </li>
          {user ? (
            <li>
              <UserMenu />
            </li>
          ) : (
            <li>
              <NavLink to="/signIn" style={getLinkStyle}>
                로그인
              </NavLink>
              /
              <NavLink to="/signUp" style={getLinkStyle}>
                회원가입
              </NavLink>
            </li>
          )}
        </ul>
      </Container>
    </div>
  );
}

export default Nav;