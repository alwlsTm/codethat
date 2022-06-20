import { default as data } from './mock.json';

export function getCourses() {  //코스 목록 불러오기(카탈로그)
  return data.courses;
}

export function getQuestions() {  //질문 목록 불러오기(커뮤니티)
  return data.questions;
}