import { get, ref } from "firebase/database"
import { firebaseDB } from "../../firebase-config"
import { atom, selector, selectorFamily } from "recoil";
import { filterByKeyword } from "../../api";

//firebase에서 카탈로그 데이터 가져오기
const getCourses = async () => {
  const coursesRef = ref(firebaseDB, "courses");
  return await get(coursesRef).then((snapshot) => {
    if (snapshot.val()) {
      return snapshot.val();
    }
  }).catch((error) => {
    console.log(error);
  })
}

//전체 코스 state
const courseState = atom({
  key: 'courseState',
  default: selector({
    key: 'courseState/default',
    get: async () => {
      return await getCourses();
    }
  }),
});

//코스 검색
export const courseFilterState = selectorFamily({
  key: 'courseFilterState',
  get: (keyword) => ({ get }) => {
    const courses = get(courseState);
    if (!keyword) return courses;
    else {
      return filterByKeyword(courses, keyword);
    }
  }
});

//코스 찾기
export const courseFindState = selectorFamily({
  key: 'courseFindState',
  get: (slug) => ({ get }) => {
    const courses = get(courseState);
    if (slug) {
      return courses.find((course) => course.slug === slug);
    }
  }
});