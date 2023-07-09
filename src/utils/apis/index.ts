import axios from "axios";

import { LoginReq, LoginRes, UserRes } from "../libs/types";

const BASE_URL = "http://15.165.47.216:8080";
export const SOCKET_URL = "http://15.165.47.216:8888";

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
