import { useState } from 'react';
import { getQuestions } from '../api';
import Avatar from '../components/Avatar';
import Card from '../components/Card';
import DateText from '../components/DateText';
import ListPage from '../components/ListPage';
import searchBarStyles from '../components/SearchBar.module.css';
import searchIcon from '../IMGS/search.svg';
import styles from './QuestionListPage.module.css';

//질문 리스트 아이템
function QuestionItem({ question }) {
  return (
    <Card className={styles.questionItem} key={question.title}>
      <div className={styles.info}>
        <p className={styles.title}>
          {question.title}
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
        <p>총 {questions.length}개 질문</p>
        <div className={styles.questionList}>
          {questions.map((question) => (
            <QuestionItem key={question.id} question={question} />
          ))}
        </div>
      </ListPage>
    </>
  );
}

export default QuestionListPage;