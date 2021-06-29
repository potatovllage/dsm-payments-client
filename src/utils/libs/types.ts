export type BoothType = {
  name: string;
  used: boolean;
};

export type LoginReq = {
  id: string;
  password: string;
};

export type LoginRes = {
  accessToken: string;
};

export type UserRes = {
  number: number;
  name: string;
  uuid: string;
  coin: number;
  countOfUsedBooth: number;
};

export type PaySuccessFulType = {
  finalValue: number;
  id: number;
  requestValue: number;
  sender: string;
  tax: number;
  user: UserRes;
};
