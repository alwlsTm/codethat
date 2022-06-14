import styles from './UserMenu.module.css';
import personIcon from '../IMGS/person.png';

function UserMenu() {
  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton}>
        <img src={personIcon} alt="유저 메뉴"></img>
      </button>
    </div>
  );
}

export default UserMenu;