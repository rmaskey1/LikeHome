import { atom } from "recoil";

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});

export const userInfoAtom = atom({
  key: "userInfo",
  default: null,
});
