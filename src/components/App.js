import Nav from "./Nav";
import Footer from "./Footer";
import styles from './App.module.css';
import './App.font.css';

function App({ children }) {
  return (
    <>
      <Nav className={styles.nav} />
      <div className={styles.body}>{children}</div>
      <Footer className={styles.Footer} />
    </>
  );
}

export default App;
