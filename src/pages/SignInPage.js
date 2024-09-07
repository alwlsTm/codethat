import Container from "../components/Container";
import Button from "../components/Button";
import styles from './SignPage.module.css';
import logo from '../IMGS/logo.svg';
import useAuthForm from "../Hooks/useAuthForm";

function SignInPage() {
  const {
    email,
    password,
    errorMsg,
    handleEmailChange,
    handlePasswordChange,
    signInSubmit,
    navigate
  } = useAuthForm(false);

  return (
    <Container className={styles.container}>
      <img className={styles.logo} src={logo} alt="codethat"></img>
      <div className={styles.text}>
        <div>회원이 아니신가요?</div>
        <div className={styles.sign} onClick={() => navigate('/signUp')}>회원가입</div>
      </div>
      <form className={styles.form} onSubmit={signInSubmit}>
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
        {errorMsg && <span className={styles.error}>{errorMsg}</span>}
        <Button className={styles.submit}>로그인</Button>
      </form>
    </Container>
  );
}

export default SignInPage;