import { default as data } from './mock.json';

export function filterByKeyword(items, keyword) {
  const lowered = keyword.toLowerCase();  //keyword 소문자화
  return items.filter(({ title }) => title.toLowerCase().includes(lowered));  //items의 title로 필터링
}

//코스 상세정보 불러오기(카탈로그)
export function getCourseBySlug(courseSlug) {
  return data.courses.find((course) => (course.slug === courseSlug));
}

//질문 내용 불러오기(커뮤니티)
export function getQuestionById(questionId) {
  return data.questions.find((question) => (question.id === questionId));
}

//위시리스트
const WISHLIST_KEY = 'codethat-wishlist'; //key
const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '{}');

//위시리스트 추가
export function addWishlist(courseSlug) {
  wishlist[courseSlug] = true;  //코스 담기
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)); //데이터 저장
}

//위시리스트 삭제
export function deleteWishlist(courseSlug) {
  delete wishlist[courseSlug];  //코스 삭제
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)); //데이터 저장
}

//위시리스트 불러오기
export function getWishlist() {
  return data.courses.filter((course) => wishlist[course.slug]);
}