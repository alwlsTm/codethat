import { useState } from "react";
import { getCourses } from "../api";
import CourseItem from "../components/CourseItem";
import ListPage from '../components/ListPage';
import styles from './CourseListPage.module.css';
import searchBarStyles from '../components/SearchBar.module.css';
import searchIcon from '../IMGS/search.svg';

//카탈로그 페이지
function CourseListPage() {
  const [keyword, setKeyword] = useState(''); //검색 키워드 state
  const courses = getCourses(); //코스 목록 데이터 불러오기

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  return (
    <>
      <ListPage
        variant="catalog"
        title="모든 코스"
        description="자체 제작된 코스들로 기초를 쌓으세요."
      >
        <form className={searchBarStyles.form} >
          <input
            name="keyword"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="검색으로 코스 찾기"
          >
          </input>
          <button type="submit">
            <img src={searchIcon} alt="검색"></img>
          </button>
        </form>
        <p>총 {courses.length}개 코스</p>
        <div className={styles.courseList}>
          {courses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </div>
      </ListPage>
    </>
  );
}

export default CourseListPage;