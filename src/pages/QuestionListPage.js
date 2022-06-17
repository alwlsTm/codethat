import { useState } from 'react';
import ListPage from '../components/ListPage';
import searchBarStyles from '../components/SearchBar.module.css';
import searchIcon from '../IMGS/search.svg';

//커뮤니티 페이지
function QuestionListPage() {
  const [keyword, setKeyword] = useState(''); //검색 키워드 state

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  return (
    <>
      <ListPage
        variant="community"
        title="커뮤니티"
        description="코드댓의 11만 수강생들과 함께 공부해봐요."
      >
      </ListPage>
      <form className={searchBarStyles.form}>
        <input
          name="keyword"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="검색으로 질문 찾기"
        >
        </input>
        <button type="submit">
          <img src={searchIcon} alt="검색"></img>
        </button>
      </form>
    </>
  );
}

export default QuestionListPage;