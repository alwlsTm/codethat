import Container from "../components/Container";
import Button from "../components/Button";
import styles from './SignPage.module.css';
import logo from '../IMGS/logo.svg';
import useAuthForm from "../Hooks/useAuthForm";

//회원가입 페이지
function SignUpPage() {
  const {
    email,
    password,
    password2,
    errorMsg,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordChange2,
    signUpSubmit,
    navigate
  } = useAuthForm(true);

  return (
    <Container className={styles.container}>
      <img className={styles.logo} src={logo} alt="codethat"></img>
      <div className={styles.text}>
        <div>이미 회원이신가요?</div>
        <div className={styles.sign} onClick={() => navigate('/signIn')}>로그인</div>
      </div>
      <form className={styles.form} onSubmit={signUpSubmit}>
        <input
          autoFocus
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일">
        </input>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호">
        </input>
        <input
          type="password"
          value={password2}
          onChange={handlePasswordChange2}
          placeholder="비밀번호 확인">
        </input>
        {errorMsg && <span className={styles.error}>{errorMsg}</span>}
        <Button className={styles.submit}>회원가입</Button>
      </form>
    </Container>
  );
}

export default SignUpPage;