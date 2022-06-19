import { useState } from 'react';
import { getQuestions } from '../api';
import ListPage from '../components/ListPage';
import searchBarStyles from '../components/SearchBar.module.css';
import searchIcon from '../IMGS/search.svg';

//커뮤니티 페이지
function QuestionListPage() {
  const [keyword, setKeyword] = useState(''); //검색 키워드 state
  const questions = getQuestions(); //질문 리스트 불러오기

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
      {questions.map((question) => (
        <ul>
          <li>{question.title}</li>
          <li>작성자: {question.writer.name}</li>
          <li>작성일: {question.createdAt}</li>
        </ul>
      ))}
    </>
  );
}

export default QuestionListPage;