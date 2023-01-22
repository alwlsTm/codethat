import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase-config";
import Container from "../components/Container";
import styles from './SignUpPage.module.css';

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
      if (pwd_check) {  //일치
        await createUserWithEmailAndPassword(
          firebaseAuth,   //auth
          signUpEmail,    //이메일
          signUpPassword  //비밀번호
        );
        navigate('/');
        //console.log(firebaseAuth);
      } else {  //불일치
        setErrorMsg("비밀번호가 일치하지 않습니다.");
        setSignUpPassword("");
        setSignUpPassword2("");
      }
    } catch (error) {
      //console.log(error);
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
    <div>
      <Container>
        <div className={styles.text}>이미 회원이신가요?</div>
        <div
          className={styles.signIn}
          onClick={signInClick}>로그인</div>
        <form onSubmit={signUpSubmit}>
          <input
            type="email"
            value={signUpEmail}
            onChange={handleEmailChange}
            placeholder="이메일"
          ></input>
          <input
            type="password"
            value={signUpPassword}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
          ></input>
          <input
            type="password"
            value={signUpPassword2}
            onChange={handlePasswordChange2}
            placeholder="비밀번호 확인"
          ></input>
          {errorMsg && <span>{errorMsg}</span>}
          <button type="submit">회원가입</button>
        </form>
      </Container>
    </div>
  );
}

export default SignUpPage;