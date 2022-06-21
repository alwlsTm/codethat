import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import CourseListPage from './pages/CourseListPage';
import QuestionListPage from "./pages/QuestionListPage";
import CoursePage from "./pages/CoursePage";

function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="courses" element={<CourseListPage />}></Route>
          <Route path="courses/react-frontend-development" element={<CoursePage />}></Route>
          <Route path="questions" element={<QuestionListPage />}></Route>
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default Main;