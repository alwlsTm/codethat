import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase-config";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../recoil/userAtom";
import Container from "../components/Container";
import Button from "../components/Button";
import styles from './SignPage.module.css';
import logo from '../IMGS/logo.svg';

//비밀번호 확인
function password_check(pwd1, pwd2) {
  return pwd1 === pwd2;
}

//회원가입 페이지
function SignUpPage() {
  const [signUpEmail, setSignUpEmail] = useState("");         //이메일 state
  const [signUpPassword, setSignUpPassword] = useState("");   //비밀번호 state
  const [signUpPassword2, setSignUpPassword2] = useState(""); //비밀번호 확인 state
  const [errorMsg, setErrorMsg] = useState("");               //에러 메시지 state
  const setUser = useSetRecoilState(userAtom);  //유저 state
  const navigate = useNavigate();

  const handleEmailChange = (e) => setSignUpEmail(e.target.value);
  const handlePasswordChange = (e) => setSignUpPassword(e.target.value);
  const handlePasswordChange2 = (e) => setSignUpPassword2(e.target.value);

  const signInClick = () => navigate('/signIn');  //로그인 페이지로 이동

  //회원가입
  const signUpSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      const pwd_check = password_check(signUpPassword, signUpPassword2); //비밀번호 확인
      if (pwd_check) {    //비밀번호 일치
        const signUpUser = await createUserWithEmailAndPassword(
          firebaseAuth,   //auth
          signUpEmail,    //이메일
          signUpPassword  //비밀번호
        );
        const user = signUpUser.user.email.split('@');
        setUser(user[0]);
        navigate('/');  //회원가입 후 홈 이동
      } else {  //비밀번호 불일치
        setErrorMsg("비밀번호가 일치하지 않습니다.");
        setSignUpPassword("");
        setSignUpPassword2("");
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMsg("잘못된 이메일입니다.");
          break;
        case 'auth/email-already-in-use':
          setErrorMsg("이미 존재하는 이메일입니다.");
          break;
        case 'auth/weak-password':
          setErrorMsg("비밀번호는 6자리 이상으로 입력해 주세요.");
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
        <div>이미 회원이신가요?</div>
        <div className={styles.sign} onClick={signInClick}>로그인</div>
      </div>
      <div>
        <form className={styles.form} onSubmit={signUpSubmit}>
          <input
            autoFocus
            type="email"
            value={signUpEmail}
            onChange={handleEmailChange}
            placeholder="이메일">
          </input>
          <input
            type="password"
            value={signUpPassword}
            onChange={handlePasswordChange}
            placeholder="비밀번호">
          </input>
          <input
            type="password"
            value={signUpPassword2}
            onChange={handlePasswordChange2}
            placeholder="비밀번호 확인">
          </input>
          {errorMsg && <span className={styles.error}>{errorMsg}</span>}
          <Button className={styles.submit}>회원가입</Button>
        </form>
      </div>
    </Container>
  );
}

export default SignUpPage;