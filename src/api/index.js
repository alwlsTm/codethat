import { default as data } from './mock.json';

function filterByKeyword(items, keyword) {
  const lowered = keyword.toLowerCase();  //keyword 소문자화
  return items.filter(({ title }) => title.toLowerCase().includes(lowered));  //items의 title로 필터링
}

export function getCourses(keyword) {  //코스 목록 불러오기(카탈로그)
  if (!keyword) return data.courses;
  return filterByKeyword(data.courses, keyword);
}

export function getQuestions(keyword) {  //질문 목록 불러오기(커뮤니티)
  if (!keyword) return data.questions;
  return filterByKeyword(data.questions, keyword);
}

export function getCourseBySlug(courseSlug) { //코스 상세정보 불러오기(카탈로그)
  return data.courses.find((course) => (course.slug === courseSlug));
}

export function getQuestionById(questionId) { //질문 내용 불러오기(커뮤니티)
  return data.questions.find((question) => (question.id === questionId));
}