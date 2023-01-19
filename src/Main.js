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

function Main() {
  return (
    <BrowserRouter>
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
          <Route path="signUp" element={<SignUpPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;