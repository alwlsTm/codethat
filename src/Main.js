import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import CourseListPage from './pages/CourseListPage';
import QuestionListPage from "./pages/QuestionListPage";
import CoursePage from "./pages/CoursePage";
import QuestionPage from "./pages/QuestionPage";
import NotFoundPage from "./pages/NotFoundPage";
import WishlistPage from "./pages/WishlistPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

function Main() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>로딩 중...</div>}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />}></Route>
            <Route path="courses">
              <Route index element={<CourseListPage />}></Route>
              <Route path=":courseSlug" element={<CoursePage />}></Route>
            </Route>
            <Route path="questions">
              <Route index element={<QuestionListPage />}></Route>
              <Route path=":questionId" element={<QuestionPage />}></Route>
            </Route>
            <Route path="wishlist" element={<WishlistPage />}></Route>
            <Route path="signIn" element={<SignInPage />}></Route>
            <Route path="signUp" element={<SignUpPage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Main;