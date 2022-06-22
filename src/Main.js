import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import CourseListPage from './pages/CourseListPage';
import QuestionListPage from "./pages/QuestionListPage";
import CoursePage from "./pages/CoursePage";
import QuestionPage from "./pages/QuestionPage";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route path="courses">
            <Route index element={<CourseListPage />}></Route>
            <Route path="react-frontend-development" element={<CoursePage />}></Route>
          </Route>
          <Route path="questions">
            <Route index element={<QuestionListPage />}></Route>
            <Route path="616825" element={<QuestionPage />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;