import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase-config";
import Container from "../components/Container";

function SignUpPage() {
  const [signUpEmail, setSignUpEmail] = useState("");       //이메일 state
  const [signUpPassword, setSignUpPassword] = useState(""); //비밀번호 state
  const [errorMsg, setErrorMsg] = useState("");             //에러 메시지 state

  const handleEmailChange = (e) => setSignUpEmail(e.target.value);
  const handlePasswordChange = (e) => setSignUpPassword(e.target.value);

  //회원가입
  const signUpSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");
      await createUserWithEmailAndPassword(
        firebaseAuth,   //auth
        signUpEmail,    //이메일
        signUpPassword  //비밀번호
      );
      setSignUpEmail("");
      setSignUpPassword("");
      //console.log(firebaseAuth);
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
        <form onSubmit={signUpSubmit}>
          <input
            value={signUpEmail}
            onChange={handleEmailChange}
            placeholder="이메일을 입력해 주세요."
          ></input>
          <input
            value={signUpPassword}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력해 주세요."
          ></input>
          {errorMsg && <span>{errorMsg}</span>}
          <button type="submit">회원가입</button>
        </form>
      </Container>
    </div>
  );
}

export default SignUpPage;