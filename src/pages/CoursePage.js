import { onValue, push, ref } from 'firebase/database';
import { firebaseAuth, firebaseDB } from '../firebase-config';
import { useEffect, useState } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';
import CourseIcon from '../components/CourseIcon';
import styles from './CoursePage.module.css';

//코스 클릭 시 상세정보 페이지
function CoursePage() {
  const [course, setCourse] = useState([]); //코스 state
  const [isValue, setIsValue] = useState([]); //위시리스트 체크 state
  const { courseSlug } = useParams(); //현재 페이지 경로의 courseSlug
  const navigate = useNavigate();     //페이지 이동

  const handleAddWishlistClick = () => {  //코스 담기
    if (firebaseAuth.currentUser) { //사용자가 로그인 상태라면
      const userEmail = firebaseAuth.currentUser.email.replace('.', '');
      const wishlistRef = ref(firebaseDB, "wishlist/" + userEmail); //DB(위시리스트) 레퍼런스

      push(wishlistRef, { //자동으로 고유key 생성
        slug: courseSlug,
        wishlist: course, //path - wishlist/userEmail/고유key/wishlist
      });
      navigate('/wishlist');
    } else {  //로그인 상태가 아니라면
      navigate('/signIn');
    }
  };

  const handleWishlistClick = () => { //위시리스트로 이동
    navigate('/wishlist');
  };

  useEffect(() => {
    const coursesRef = ref(firebaseDB, "courses"); //DB(카탈로그) 레퍼런스
    onValue(coursesRef, (snapshot) => {
      const courses = snapshot.val();
      const slug = courses.find((course) => course.slug === courseSlug);  //courseSlug 찾기
      setCourse(slug);
    });
  }, [courseSlug]);

  useEffect(() => {
    if (firebaseAuth.currentUser) {
      const userEmail = firebaseAuth.currentUser.email.replace('.', '');
      const wishlistRef = ref(firebaseDB, "wishlist/" + userEmail);

      onValue(wishlistRef, (snapshot) => {
        if (snapshot.val()) {
          const wishlist = Object.values(snapshot.val());
          const value = wishlist.filter((val) => val.slug === courseSlug);  //
          setIsValue(value);
        }
      });
    }
  }, [courseSlug]);

  if (!course) {  //없는 코스일 경우
    return <Navigate to="/courses" />;
  }

  return (
    <>
      <div className={styles.header}>
        <Container className={styles.content}>
          <CourseIcon photoUrl={course.photoUrl} />
          <h1 className={styles.title}>{course.title}</h1>
          {isValue.length === 0 ? (
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