import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import Warn from '../components/Warn';
import styles from './WishlistPage.module.css';

//위시리스트 페이지
function WishlistPage() {
  const [courses, setCourses] = useState([]); //위시리스트 코스 state

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>나의 위시리스트</h1>
      {courses.length === 0 && (
        <>
          <Warn
            className={styles.emptyList}
            title="담아 놓은 코스가 없어요."
            description="카탈로그에서 나에게 필요한 코스를 찾아보세요."
          />
          <div className={styles.link}>
            <Link to="/courses">
              <button>코스 찾아보기</button>
            </Link>
          </div>
        </>
      )}
    </Container>
  );
}

export default WishlistPage;