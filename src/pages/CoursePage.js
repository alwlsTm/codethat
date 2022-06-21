import { getCourseBySlug } from '../api';
import Card from '../components/Card';
import Container from '../components/Container';
import CourseIcon from '../components/CourseIcon';
import styles from './CoursePage.module.css';

//코스 클릭 시 상세정보 페이지
function CoursePage() {
  const course = getCourseBySlug('react-frontend-development');

  return (
    <>
      <div className={styles.header}>
        <Container className={styles.content}>
          <CourseIcon photoUrl={course.photoUrl} />
          <h1 className={styles.title}>{course.title}</h1>
          <button>+ 코스 담기</button>
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