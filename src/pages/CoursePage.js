import { onValue, ref } from 'firebase/database';
import { firebaseDB } from '../firebase-config';
import { useEffect, useState } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { addWishlist } from '../api';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';
import CourseIcon from '../components/CourseIcon';
import styles from './CoursePage.module.css';

//코스 클릭 시 상세정보 페이지
function CoursePage() {
  const [course, setCourse] = useState([]); //코스 state
  const { courseSlug } = useParams(); //현재 페이지의 경로의 파라미터가 저장되어 있음
  const navigate = useNavigate();     //페이지 이동

  const handleAddWishlistClick = () => {  //코스 담기
    addWishlist(course.slug);
    navigate('/wishlist');
  };

  useEffect(() => {
    const courseRef = ref(firebaseDB, "courses"); //DB(카탈로그) 레퍼런스
    onValue(courseRef, (snapshot) => {
      const courses = snapshot.val();

      const slug = courses.find((course) => course.slug === courseSlug);  //courseSlug 찾기
      setCourse(slug);
    });
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
          <Button variant="round" onClick={handleAddWishlistClick}>
            + 코스 담기
          </Button>
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