import Container from './Container';
import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <Container>
        <ul className={styles.links}>
          <li>코드댓 소개</li>
          <li>개인정보 취급방침</li>
          <li>사용자 이용약관</li>
          <li>자주 묻는 질문</li>
        </ul>
      </Container>
    </div>
  );
}

export default Footer;