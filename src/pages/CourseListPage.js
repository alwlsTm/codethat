import { useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { getCourses } from "../api";
import CourseItem from "../components/CourseItem";
import ListPage from '../components/ListPage';
import styles from './CourseListPage.module.css';
import searchBarStyles from '../components/SearchBar.module.css';
import searchIcon from '../IMGS/search.svg';

//카탈로그 페이지
function CourseListPage() {
  const [searchParams, setSearchParams] = useSearchParams();  //쿼리 스트링 파라미터 가져오기
  const initKeyword = searchParams.get('keyword');  //keyword 값 가져오기
  const [keyword, setKeyword] = useState(initKeyword || ''); //검색 키워드 state
  const courses = getCourses(initKeyword); //코스 목록 데이터 불러오기

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  const handleSubmit = (e) => { //입력폼을 Submit 했을 때 url의 쿼리 스트링 변경
    e.preventDefault();
    setSearchParams(  //url의 쿼리 스트링 변경(파라미터로 객체를 받음)
      keyword ?
        {
          keyword,
        } : {}  //keyword 값이 없을 경우 빈 객체 전달
    );
  };

  return (
    <>
      <ListPage
        variant="catalog"
        title="모든 코스"
        description="자체 제작된 코스들로 기초를 쌓으세요."
      >
        <form className={searchBarStyles.form} onSubmit={handleSubmit}>
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