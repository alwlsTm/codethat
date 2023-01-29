import { arrayUnion, doc, setDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseDB } from '../firebase-config';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { addWishlist, getCourseBySlug } from '../api';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';
import CourseIcon from '../components/CourseIcon';
import styles from './CoursePage.module.css';

//코스 클릭 시 상세정보 페이지
function CoursePage() {
  const { courseSlug } = useParams(); //현재 페이지의 경로의 파라미터가 저장되어 있음
  const course = getCourseBySlug(courseSlug); //courseSlug 값에 따라서 알맞는 데이터를 렌더링
  const navigate = useNavigate();     //페이지 이동

  if (!course) {  //없는 코스일 경우
    return <Navigate to="/courses" />;  //카탈로그 페이지로 이동(리다이렉트)
  }

  const handleAddWishlistClick = async () => {  //코스 담기
    try {
      if (firebaseAuth.currentUser) { //사용자가 로그인 상태라면
        await setDoc(doc(
          firebaseDB,
          "wishlist/" + `${firebaseAuth.currentUser.email}` //path - wishlist/사용자 이메일
        ), {
          wishlist: arrayUnion(`${course.slug}`), //필드: 값
        }, { merge: true });  //DB에 저장된 기존 위시리스트 배열과 병합
      } else {  //사용자가 로그인 상태가 아니라면
        navigate('/signIn');  //로그인 페이지로 이동
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        {course.topics.map(({ topic }) => (
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