import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase-config";
import Container from "../components/Container";
import styles from './SignInPage.module.css';

function SignInPage() {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleEmailChange = (e) => setSignInEmail(e.target.value);
  const handlePasswordChange = (e) => setSignInPassword(e.target.value);

  const signUpClick = () => navigate('/signUp');  //회원가입 페이지로 이동

  //사용자의 로그인 상태
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    setUser(currentUser);
  })

  //로그인
  const signInSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        firebaseAuth,   //auth
        signInEmail,    //이메일
        signInPassword  //비밀번호
      );
      navigate('/');  //로그인 후 홈 이동
      // console.log(firebaseAuth);
    } catch (error) {
      console.log(error);
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
    <div>
      <Container>
        <div className={styles.text}>회원이 아니신가요?</div>
        <div
          onClick={signUpClick}
          className={styles.signUp}>회원가입</div>
        <form onSubmit={signInSubmit}>
          <input
            type="email"
            value={signInEmail}
            onChange={handleEmailChange}
            placeholder="이메일"
          ></input>
          <input
            type="password"
            value={signInPassword}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
          ></input>
          {errorMsg && <span>{errorMsg}</span>}
          <button type="submit">로그인</button>
        </form>
        <div>User Logged In: {user?.email}</div>
      </Container>
    </div>
  );
}

export default SignInPage;