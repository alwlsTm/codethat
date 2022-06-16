import { useState } from "react";
import ListPage from '../components/ListPage';
import searchBarStyles from '../components/SearchBar.module.css';
import searchIcon from '../IMGS/search.svg';

function CourseListPage() {
  const [keyword, setKeyword] = useState(''); //검색 키워드 state

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  return (
    <>
      <ListPage
        variant="catalog"
        title="모든 코스"
        description="자체 제작된 코스들로 기초를 쌓으세요."
      >
      </ListPage>
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
    </>
  );
}

export default CourseListPage;