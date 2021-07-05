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
  id: number;
  createdAt: number;
  requestValue: number;
  tax: number;
  finalValue: number;
  sender: string;
  user: { uuid: string; number: number; name: string; coin: number };
  booth: { coin: number; id: string; name: string; totalCoin: number };
};
