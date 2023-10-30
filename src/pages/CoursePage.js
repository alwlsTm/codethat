import { onValue, push, ref } from 'firebase/database';
import { firebaseDB } from '../firebase-config';
import { useEffect, useState } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../recoil/userAtom';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';
import CourseIcon from '../components/CourseIcon';
import styles from './CoursePage.module.css';

//코스 클릭 시 상세정보 페이지
function CoursePage() {
  const [course, setCourse] = useState([]); //코스 state
  const [value, setValue] = useState([]);   //위시리스트 체크 state
  const { courseSlug } = useParams();       //현재 페이지 경로의 courseSlug
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();           //페이지 이동

  const handleAddWishlistClick = () => {  //코스 담기
    if (user) {
      const wishlistRef = ref(firebaseDB, "wishlist/" + user); //DB(위시리스트) 레퍼런스

      //path - wishlist/userEmail/고유key/wishlist(slug, wishlist)
      push(wishlistRef, { //자동으로 고유key 생성
        slug: courseSlug,
        wishlist: course,
      });
      navigate('/wishlist');
    } else {  //로그인 상태가 아니라면
      navigate('/signIn');
    }
  };

  const handleWishlistClick = () => { //위시리스트로 이동
    navigate('/wishlist');
  };

  useEffect(() => { //코스 찾기
    const coursesRef = ref(firebaseDB, "courses"); //DB(카탈로그) 레퍼런스
    onValue(coursesRef, (snapshot) => {
      const courses = snapshot.val();
      const slug = courses.find((course) => course.slug === courseSlug);  //courseSlug 찾기
      setCourse(slug);
    });
  }, [courseSlug]);

  useEffect(() => { //위시리스트 체크
    if (user) {
      const wishlistRef = ref(firebaseDB, "wishlist/" + user);
      onValue(wishlistRef, (snapshot) => {
        if (snapshot.val()) {
          const wishlist = Object.values(snapshot.val());
          const value = wishlist.filter((val) => val.slug === courseSlug);  //위시리스트에 담겨있는 코스인지 체크
          setValue(value);
        }
      });
    }
  }, [user, courseSlug]);

  if (!course) {  //없는 코스일 경우
    return <Navigate to="/courses" />;
  }

  return (
    <>
      <div className={styles.header}>
        <Container className={styles.content}>
          <CourseIcon photoUrl={course.photoUrl} />
          <h1 className={styles.title}>{course.title}</h1>
          {value.length === 0 ? (
            <Button variant="round" onClick={handleAddWishlistClick}>
              + 코스 담기
            </Button>
          ) : (
            <Button variant="round" onClick={handleWishlistClick}>
              위시리스트로 이동
            </Button>
          )}
          <p className={styles.summary}>{course.summary}</p>
        </Container>
      </div>
      <Container className={styles.topics}>
        {course.topics?.map(({ topic }) => (
          <Card className={styles.topic} key={topic.slug}>
            <h3 className={styles.title}>{topic.title}</h3>
            <p className={styles.summary}>{topic.summary}</p>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default CoursePage;