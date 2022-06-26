import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getQuestions } from '../api';
import Avatar from '../components/Avatar';
import Card from '../components/Card';
import DateText from '../components/DateText';
import ListPage from '../components/ListPage';
import searchBarStyles from '../components/SearchBar.module.css';
import Warn from '../components/Warn';
import searchIcon from '../IMGS/search.svg';
import styles from './QuestionListPage.module.css';

//질문 리스트 아이템
function QuestionItem({ question }) {
  return (
    <Card className={styles.questionItem} key={question.title}>
      <div className={styles.info}>
        <p className={styles.title}>
          <Link to={`/questions/${question.id}`}>{question.title}</Link>
          {question.answers.length > 0 && (
            <span className={styles.count}>[{question.answers.length}]</span>
          )}
        </p>
        <p className={styles.date}>
          <DateText value={question.createdAt} />
        </p>
      </div>
      <div className={styles.writer}>
        <Avatar
          photo={question.writer.profile.photo}
          name={question.writer.name}
        />
      </div>
    </Card>
  );
}

//커뮤니티 페이지
function QuestionListPage() {
  const [searchParams, setSearchParams] = useSearchParams();  //
  const initKeyword = searchParams.get('keyword');  //keyword 값 가져오기
  const [keyword, setKeyword] = useState(initKeyword || ''); //검색 키워드 state
  const questions = getQuestions(initKeyword); //질문 리스트 불러오기

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
        variant="community"
        title="커뮤니티"
        description="코드댓의 11만 수강생들과 함께 공부해봐요."
      >
        <form className={searchBarStyles.form} onSubmit={handleSubmit}>
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
        <p>총 {questions.length}개 질문</p>
        <div>
          {initKeyword && questions.length === 0 ? (  //검색 결과가 없으면
            <Warn
              className={styles.emptyList}
              title="조건에 맞는 질문이 없어요."
              description="올바른 검색어가 맞는지 다시 한 번 확인해 주세요."
            />
          ) : ( //검색 결과가 있으면
            <div className={styles.questionList}>
              {questions.map((question) => (
                <QuestionItem key={question.id} question={question} />
              ))}
            </div>
          )}
        </div>
      </ListPage>
    </>
  );
}

export default QuestionListPage;