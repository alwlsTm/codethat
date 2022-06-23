import { Link } from 'react-router-dom';
import Container from "../components/Container";
import Warn from "../components/Warn";
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <Container className={styles.container}>
      <Warn
        variant="big"
        title="존재하지 않는 페이지에요."
        description="올바른 주소가 맞는지 다시 한 번 확인해 주세요."
      />
      <div className={styles.link}>
        <Link to="/"><button>홈으로 가기</button></Link>
      </div>
    </Container>
  );
}

export default NotFoundPage;