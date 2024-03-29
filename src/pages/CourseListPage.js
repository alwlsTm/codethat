import { onValue, ref } from "firebase/database";
import { firebaseDB } from "../firebase-config";
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { filterByKeyword } from "../api";
import CourseItem from "../components/CourseItem";
import ListPage from '../components/ListPage';
import styles from './CourseListPage.module.css';
import searchBarStyles from '../components/SearchBar.module.css';
import searchIcon from '../IMGS/search.svg';
import Warn from "../components/Warn";

//카탈로그 페이지
function CourseListPage() {
  const [courses, setCourses] = useState([]);  //코스 state
  const [searchParams, setSearchParams] = useSearchParams();  //쿼리 스트링 파라미터 가져오기
  const initKeyword = searchParams.get('keyword');            //keyword 값 가져오기
  const [keyword, setKeyword] = useState(initKeyword || '');  //검색 키워드 state

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  const handleSubmit = (e) => { //입력폼 Submit시 url의 쿼리 스트링 변경
    e.preventDefault();
    setSearchParams(  //url의 쿼리 스트링 변경(파라미터로 객체를 받음)
      keyword ?
        {
          keyword,
        } : {}  //keyword 값이 없을 경우 빈 객체 전달
    );
  };

  useEffect(() => {
    const coursesRef = ref(firebaseDB, "courses");  //DB(카탈로그) 레퍼런스
    onValue(coursesRef, (snapshot) => { //레퍼런스에서 데이터 읽기
      const course = snapshot.val();
      if (!initKeyword) { //키워드가 없으면
        setCourses(course);
      } else {  //키워드가 있으면
        const filterItems = filterByKeyword(course, initKeyword); //필터링
        setCourses(filterItems);
      }
    });
  }, [initKeyword]);

  return (
    <>
      <Helmet>
        <title>카탈로그</title>
      </Helmet>
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
            placeholder="검색으로 코스 찾기">
          </input>
          <button type="submit">
            <img src={searchIcon} alt="검색"></img>
          </button>
        </form>
        <p>총 {courses.length}개 코스</p>
        {initKeyword && courses.length === 0 ? (  //검색 결과가 없으면
          <Warn
            className={styles.emptyList}
            title="조건에 맞는 코스가 없어요."
            description="올바른 검색어가 맞는지 다시 한 번 확인해 주세요."
          />
        ) : ( //검색 결과가 있다면
          <div className={styles.courseList}>
            {courses.map((course) => (
              <CourseItem
                key={course.id}
                course={course}
              />
            ))}
          </div>
        )}
      </ListPage>
    </>
  );
}

export default CourseListPage;