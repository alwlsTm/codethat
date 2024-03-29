import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase-config";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../recoil/userAtom";
import Container from "../components/Container";
import Button from "../components/Button";
import styles from './SignPage.module.css';
import logo from '../IMGS/logo.svg';

function SignInPage() {
  const [signInEmail, setSignInEmail] = useState("");       //이메일 state
  const [signInPassword, setSignInPassword] = useState(""); //패스워드 state
  const [errorMsg, setErrorMsg] = useState("");             //에러 메시지 state
  const setUser = useSetRecoilState(userAtom);  //유저 state
  const navigate = useNavigate();

  const handleEmailChange = (e) => setSignInEmail(e.target.value);
  const handlePasswordChange = (e) => setSignInPassword(e.target.value);

  const signUpClick = () => navigate('/signUp');  //회원가입 페이지로 이동

  //로그인
  const signInSubmit = async (e) => {
    e.preventDefault();
    try {
      const signInUser = await signInWithEmailAndPassword( //로그인
        firebaseAuth,   //auth
        signInEmail,    //이메일
        signInPassword  //비밀번호
      );
      const user = signInUser.user.email.split('@');
      setUser(user[0]);
      navigate('/');  //로그인 후 홈 이동
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMsg("이메일을 확인해 주세요.");
          break;
        case 'auth/user-not-found':
          setErrorMsg("입력한 아이디가 없습니다.");
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
      <img className={styles.logo} src={logo} alt="codethat"></img>
      <div className={styles.text}>
        <div>회원이 아니신가요?</div>
        <div className={styles.sign} onClick={signUpClick}>회원가입</div>
      </div>
      <form className={styles.form} onSubmit={signInSubmit}>
        <input
          autoFocus
          type="email"
          value={signInEmail}
          onChange={handleEmailChange}
          placeholder="이메일">
        </input>
        <input
          type="password"
          value={signInPassword}
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