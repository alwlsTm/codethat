import { getQuestionById } from '../api';
import classNames from 'classnames';
import Avatar from '../components/Avatar';
import Card from '../components/Card';
import Container from '../components/Container';
import DateText from '../components/DateText';
import styles from './QuestionPage.module.css';

//커뮤니티 질문 클릭 시 페이지
//질문 & 답변
function QuestionPage() {
  const question = getQuestionById('616825'); //질문 내용 불러오기

  return (
    <>
      <div className={styles.header}>
        <Container>
          <div className={styles.question}>
            <div className={styles.questionInfo}>
              <div className={styles.content}>
                <div className={styles.title}>
                  {question.title}
                </div>
                <div className={styles.date}>
                  <DateText value={question.createdAt} />
                </div>
              </div>
              <Writer className={styles.author} writer={question.writer} />
            </div>
            <p
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: question.content }}
            >
            </p>
          </div>
        </Container>
      </div>
      <Container>
        <h2 className={styles.count}>
          {question.answers.length}개 답변
        </h2>
        {question.answers.length > 0 && (
          question.answers.map((answer) => (
            <Answer
              key={answer.id}
              className={styles.answerItem}
              answer={answer}
            />
          ))
        )}
      </Container>
    </>
  );
}

//작성자 프로필
function Writer({ className, writer }) {
  return (
    <div className={classNames(className, styles.writer)}>
      <div className={styles.info}>
        <div className={styles.name}>{writer.name}</div>
        <div className={styles.level}>{writer.level}</div>
      </div>
      <Avatar photo={writer.profile.photo} name={writer.name} />
    </div>
  );
}

//답변자 프로필
function Answer({ className, answer }) {
  return (
    <Card className={classNames(styles.answer, className)}>
      <p dangerouslySetInnerHTML={{ __html: answer.content }}></p>
      <div className={styles.answerInfo}>
        <div className={styles.date}>
          <DateText value={answer.createdAt} />
        </div>
        <Writer writer={answer.writer} />
      </div>
    </Card>
  );
}

export default QuestionPage;