import { Link, Navigate } from 'react-router-dom';
import { ref, remove } from 'firebase/database';
import { firebaseDB } from '../firebase-config';
import { useRecoilValue } from 'recoil';
import { userState, wishlistState } from '../recoil/atoms/userAtom';
import Container from '../components/Container';
import CourseItem from '../components/CourseItem';
import Warn from '../components/Warn';
import styles from './WishlistPage.module.css';
import deleteButton from '../IMGS/closeButton.svg';
import Button from '../components/Button';

//위시리스트 페이지
function WishlistPage() {
  const courses = useRecoilValue(wishlistState); //위시리스트 코스 state
  const user = useRecoilValue(userState);      //유저 state

  const handleDeleteClick = (courseKey) => { //위시리스트 삭제
    const wishlistRef = ref(firebaseDB, "wishlist/" + user + `/${courseKey}`);
    remove(wishlistRef);  //key를 이용해 위시리스트 삭제
  };

  if (!user) {
    return <Navigate to="/" />
  }

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>{user}님의 위시리스트</h1>
      {courses.length === 0 ? (
        <>
          <Warn
            className={styles.emptyList}
            title="담아 놓은 코스가 없어요."
            description="카탈로그에서 나에게 필요한 코스를 찾아보세요."
          />
          <div className={styles.link}>
            <Link to="/courses">
              <Button>코스 찾아보기</Button>
            </Link>
          </div>
        </>
      ) : (
        <ul className={styles.items}>
          {Object.entries(courses).map(([key, value]) => (
            <li key={key} className={styles.item}>
              <CourseItem course={value.wishlist} />
              <img
                className={styles.delete}
                src={deleteButton}
                alt="삭제"
                onClick={() => handleDeleteClick(key)}>
              </img>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

export default WishlistPage;