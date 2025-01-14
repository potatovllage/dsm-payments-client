import axios from "axios";

import { LoginReq, LoginRes, UserRes } from "../libs/types";

const BASE_URL = "https://payments.gmbot.dev";
export const SOCKET_URL = "https://qr.gmbot.dev";

const request = axios.create({
  baseURL: BASE_URL,
});

export const postStudentLogin = (req: LoginReq) => {
  return request.post<LoginRes>("/user/auth", {
    ...req,
  });
};

export const postTeacherLogin = (req: LoginReq) => {
  return request.post<LoginRes>("/user/auth/teacher", {
    ...req,
  });
};

export const getUser = (token: string) => {
  return request.get<UserRes>("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
