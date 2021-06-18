import axios from "axios";

import { LoginReq, LoginRes, UserRes } from "../libs/types";

// const BASE_URL = "https://dsm-festival-2021";
const BASE_URL = "http://192.168.137.249:8080";
const request = axios.create({
  baseURL: BASE_URL,
});

export const postStudentLogin = (req: LoginReq) => {
  return request.post<LoginRes>("/user/auth", {
    ...req,
  });
};

export const postTeacherLogin = (req: LoginReq) => {
  return request.post<LoginRes>("/user/auth", {
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
