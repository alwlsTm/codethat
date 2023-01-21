import { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth } from "../firebase-config";
import Container from "../components/Container";

function SignInPage() {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState({});

  const handleEmailChange = (e) => setSignInEmail(e.target.value);
  const handlePasswordChange = (e) => setSignInPassword(e.target.value);

  //사용자의 로그인 상태
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    setUser(currentUser);
  })

  //로그인
  const signInSubmit = async () => {
    try {
      await signInWithEmailAndPassword(
        firebaseAuth,   //auth
        signInEmail,    //이메일
        signInPassword  //비밀번호
      );
      console.log(firebaseAuth);
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMsg("이메일을 확인해 주세요.");
          break;
        case 'auth/wrong-password':
          setErrorMsg("비밀번호를 확인해 주세요.");
          break;
        default:
          setErrorMsg("");
          break;
      }
    }
  };

  //로그아웃
  const SignOutClick = async () => {
    await signOut(firebaseAuth);
    console.log(firebaseAuth);
  }

  return (
    <div>
      <Container>
        <form onSubmit={signInSubmit}>
          <input
            value={signInEmail}
            onChange={handleEmailChange}
            placeholder="이메일을 입력해 주세요."
          ></input>
          <input
            value={signInPassword}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력해 주세요."
          ></input>
          {errorMsg && <span>{errorMsg}</span>}
          <div>User Logged In: {user?.email}</div>
          <button type="submit">로그인</button>
        </form>
        <button onClick={SignOutClick}>로그아웃</button>
      </Container>
    </div>
  );
}

export default SignInPage;