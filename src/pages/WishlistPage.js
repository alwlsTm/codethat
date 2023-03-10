import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { onValue, ref, remove } from 'firebase/database';
import { firebaseAuth, firebaseDB } from '../firebase-config';
import Container from '../components/Container';
import CourseItem from '../components/CourseItem';
import Warn from '../components/Warn';
import styles from './WishlistPage.module.css';
import deleteButton from '../IMGS/closeButton.svg';
import Button from '../components/Button';

//위시리스트 페이지
function WishlistPage() {
  const [courses, setCourses] = useState([]); //위시리스트 코스 state
  const navigate = useNavigate();

  const handleDeleteClick = (courseKey) => { //위시리스트 삭제
    const userEmail = firebaseAuth.currentUser.email.replace('.', '');
    const wishlistRef = ref(firebaseDB, "wishlist/" + userEmail + `/${courseKey}`);
    remove(wishlistRef);  //key를 이용해 위시리스트 삭제
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {  //사용자가 로그인 상태라면
        const userEmail = currentUser.email.replace('.', '');
        const wishlistRef = ref(firebaseDB, "wishlist/" + userEmail); //DB(위시리스트) 레퍼런스

        onValue(wishlistRef, (snapshot) => {
          const wishlist = snapshot.val();
          if (wishlist) {
            setCourses(wishlist); //{key: {wishlist: ... }}
          } else {
            setCourses([]);
          }
        });
      } else {  //로그인 상태가 아니라면
        navigate('/signIn');
      }
    });
  }, []);

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>나의 위시리스트</h1>
      {courses.length === 0 ? (
        <>
          <Warn
            className={styles.emptyList}
            title="담아 놓은 코스가 없어요."
            description="카탈로그에서 나에게 필요한 코스를 찾아보세요." />
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