import { useCallback, useEffect, useState } from 'react';
import styles from './UserMenu.module.css';
import personIcon from '../IMGS/person.png';

//Nav 유저 메뉴
function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = useCallback((e) => { //유저 메뉴 클릭
    e.stopPropagation();  //기본 동작 막기
    setIsOpen((nextIsOpen) => !nextIsOpen);
  }, []);

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
          <li>위시리스트</li>
          <li className={styles.disabled}>회원가입</li>
          <li className={styles.disabled}>로그인</li>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;