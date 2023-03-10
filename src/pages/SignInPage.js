import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase-config";
import Container from "../components/Container";
import Button from "../components/Button";
import styles from './SignPage.module.css';
import logo from '../IMGS/logo.svg';

function SignInPage() {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setSignInEmail(e.target.value);
  const handlePasswordChange = (e) => setSignInPassword(e.target.value);

  const signUpClick = () => navigate('/signUp');  //회원가입 페이지로 이동

  //로그인
  const signInSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword( //로그인
        firebaseAuth,   //auth
        signInEmail,    //이메일
        signInPassword  //비밀번호
      );
      navigate('/');  //로그인 후 홈 이동
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMsg("이메일을 확인해 주세요.");
          break;
        case 'auth/wrong-password':
          setErrorMsg("비밀번호를 확인해 주세요.");
          setSignInPassword("");
          break;
        default:
          setErrorMsg("");
          break;
      }
    }
  };

  return (
    <Container className={styles.container}>
      <Link to="/">
        <img className={styles.logo} src={logo} alt="codethat"></img>
      </Link>
      <div className={styles.text}>
        <div>회원이 아니신가요?</div>
        <div
          className={styles.sign}
          onClick={signUpClick}>회원가입</div>
      </div>
      <div>
        <form className={styles.form} onSubmit={signInSubmit}>
          <input
            autoFocus
            className={styles.email}
            type="email"
            value={signInEmail}
            onChange={handleEmailChange}
            placeholder="이메일"
          ></input>
          <input
            className={styles.password}
            type="password"
            value={signInPassword}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
          ></input>
          {errorMsg && <span className={styles.error}>{errorMsg}</span>}
          <Button className={styles.submit}>로그인</Button>
        </form>
      </div>
    </Container>
  );
}

export default SignInPage;