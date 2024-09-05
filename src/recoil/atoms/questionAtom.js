import { get, ref } from "firebase/database"
import { firebaseDB } from "../../firebase-config"
import { atom, selector, selectorFamily } from "recoil";
import { filterByKeyword } from "../../api";

//firebase에서 커뮤니티 데이터 가져오기
export const getQuestions = async () => {
  const questionsRef = ref(firebaseDB, "questions");
  return await get(questionsRef).then((snapshot) => {
    if (snapshot.val()) {
      return snapshot.val();
    }
  }).catch((error) => {
    console.log(error);
  });
};

//전체 커뮤니티 state
export const questionState = atom({
  key: 'questionState',
  default: selector({
    key: 'questionState/default',
    get: async () => {
      return await getQuestions();
    }
  })
});

//질문 검색
export const questionFilterState = selectorFamily({
  key: 'questionFilterState',
  get: (keyword) => ({ get }) => {
    const questions = get(questionState);
    if (!keyword) {
      return questions;
    } else {
      return filterByKeyword(questions, keyword);
    }
  }
})

//질문 찾기
export const questionFindState = selectorFamily({
  key: 'questionFindState',
  get: (id) => ({ get }) => {
    const questions = get(questionState);
    if (id) {
      return questions.find((question) => question.id === id);
    }
  }
});