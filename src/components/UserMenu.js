import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebase-config';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../recoil/userAtom';
import styles from './UserMenu.module.css';
import personIcon from '../IMGS/person.png';

//Nav 유저 메뉴
function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);  //팝업 state
  const setUser = useSetRecoilState(userAtom);  //유저 state

  const handleButtonClick = useCallback((e) => { //유저 메뉴 클릭
    e.stopPropagation();  //기본 동작 막기
    setIsOpen((nextIsOpen) => !nextIsOpen);
  }, []);

  const SignOutClick = async () => {  //로그아웃
    await signOut(firebaseAuth);
    setUser("");
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
          <Link to="/wishlist">
            <li>위시리스트</li>
          </Link>
          <button className={styles.signOut} onClick={SignOutClick}>
            <li>로그아웃</li>
          </button>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;