import { Link } from 'react-router-dom';
import Card from "./Card";
import CourseIcon from "./CourseIcon";
import Tags from './Tags';
import styles from './CourseItem.module.css';

const DIFFICULTY = ['입문', '초급', '중급', '고급'];  //코스 난이도 변수

//코스 아이템
function CourseItem({ course }) {
  const difficulty = DIFFICULTY[course.difficulty || 0];  //코스 난이도

  return (
    <Card className={styles.courseItem}>
      <div className={styles.thumb}>
        <CourseIcon photoUrl={course.photoUrl} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link to={`/courses/${course.slug}`}>{course.title}</Link>
        </h2>
        <p className={styles.description}>{course.summary}</p>
        <div>
          <Tags values={[course.language, difficulty]} />
        </div>
      </div>
    </Card>
  );
}

export default CourseItem;
