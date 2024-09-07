import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/atoms/userAtom";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../firebase-config";

function useAuthForm(isSignUp = false) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordChange2 = (e) => setPassword2(e.target.value);

  //회원가입
  const signUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (password !== password2) {  //비밀번호 불일치
      setErrorMsg('');
      setPassword('');
      setPassword2('');
      return;
    }
    try {
      const signUpUser = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = signUpUser.user.email.split('@');
      setUser(user[0]);
      navigate('/');  //회원가입 완료 후 홈 이동
    } catch (error) {
      handleError(error);
    }
  };

  //로그인
  const signInSubmit = async (e) => {
    e.preventDefault();
    try {
      const signInUser = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = signInUser.user.email.split('@');
      setUser(user[0]);
      navigate('/');  //로그인 완료 후 홈 이동
    } catch (error) {
      handleError(error);
    }
  };

  //에러 처리
  const handleError = (error) => {
    switch (error.code) {
      case "auth/invalid-email":
        setErrorMsg("잘못된 이메일입니다.");
        break;
      case "auth/user-not-found":
        setErrorMsg("입력한 아이디가 없습니다.");
        break;
      case "auth/email-already-in-use":
        setErrorMsg("이미 존재하는 이메일입니다.");
        break;
      case "auth/wrong-password":
        setErrorMsg("비밀번호가 일치하지 않습니다.");
        setPassword("");
        break;
      case "auth/weak-password":
        setErrorMsg("비밀번호는 6자리 이상으로 입력해 주세요.");
        break;
      default:
        setErrorMsg("");
        break;
    }
  };

  return {
    email,
    password,
    password2,
    errorMsg,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordChange2,
    signInSubmit,
    signUpSubmit,
    navigate
  };
}

export default useAuthForm;