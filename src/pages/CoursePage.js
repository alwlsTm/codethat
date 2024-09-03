import { onValue, push, ref } from 'firebase/database';
import { firebaseDB } from '../firebase-config';
import { useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState, wishlistState } from '../recoil/atoms/userAtom';
import { courseFindState } from '../recoil/atoms/courseAtom';
import Button from '../components/Button';
import Card from '../components/Card';
import Container from '../components/Container';
import CourseIcon from '../components/CourseIcon';
import styles from './CoursePage.module.css';

//코스 클릭 시 상세정보 페이지
function CoursePage() {
  const [wish, setWish] = useRecoilState(wishlistState);   //위시리스트 state
  const { courseSlug } = useParams();       //현재 페이지 경로의 courseSlug
  const course = useRecoilValue(courseFindState(courseSlug));  //해당 코스 state
  const user = useRecoilValue(userState);   //유저 state
  const navigate = useNavigate();           //페이지 이동

  //위시리스트 체크
  const check = Object.values(wish).filter((v) => v.slug === courseSlug);

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

  useEffect(() => {
    if (user) {
      const wishlistRef = ref(firebaseDB, "wishlist/" + user);
      onValue(wishlistRef, (snapshot) => {
        if (snapshot.val()) {
          setWish(snapshot.val());
        } else {
          setWish([]);
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
          {check.length === 0 ? (
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