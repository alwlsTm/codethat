import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

//사용자 state
export const userState = atom({
  key: 'userState',
  default: "",
  effects_UNSTABLE: [persistAtom],
});

//사용자 위시리스트 state
export const wishlistState = atom({
  key: 'wishlistState',
  default: [],
});