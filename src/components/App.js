import { Outlet } from 'react-router-dom';
import Nav from "./Nav";
import Footer from "./Footer";
import styles from './App.module.css';
import './App.font.css';

//공통 레이아웃을 렌더링하는 컴포넌트
function App() {
  return (
    <>
      <Nav className={styles.nav} />
      <div className={styles.body}><Outlet /></div>
      <Footer className={styles.Footer} />
    </>
  );
}

export default App;
