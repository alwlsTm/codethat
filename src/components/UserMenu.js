import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebase-config';
import styles from './UserMenu.module.css';
import personIcon from '../IMGS/person.png';

//Nav 유저 메뉴
function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = useCallback((e) => { //유저 메뉴 클릭
    e.stopPropagation();  //기본 동작 막기
    setIsOpen((nextIsOpen) => !nextIsOpen);
  }, []);

  //로그아웃
  const SignOutClick = async () => {
    await signOut(firebaseAuth);
    // console.log(firebaseAuth);
  }

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = () => setIsOpen(false);  //팝업 닫기
    window.addEventListener('click', handleClickOutside);

    return () => {  //정리
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton} onClick={handleButtonClick}>
        <img src={personIcon} alt="유저 메뉴"></img>
      </button>
      {isOpen && (
        <ul className={styles.popup}>
          <Link to="/wishlist"><li>위시리스트</li></Link>
          <Link to="/signIn"><li>로그인</li></Link>
          <button
            className={styles.signOut}
            onClick={SignOutClick}
            disabled={!firebaseAuth.currentUser}
          ><li>로그아웃</li></button>
          <Link to="/signUp"><li>회원가입</li></Link>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;