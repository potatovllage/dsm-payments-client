import { atom } from "recoil";

import { UserRes } from "../libs/types";

export const userState = atom<UserRes>({
  key: " userState",
  default: {
    uuid: "",
    name: "",
    number: 2115,
    coin: 0,
    countOfUsedBooth: 0,
  },
});
