import { atom } from "recoil";

import { UserRes } from "../libs/types";

export const userState = atom<UserRes>({
  key: " userState",
  default: {
    uuid: "",
    name: "",
    number: 0,
    coin: 0,
  },
});
