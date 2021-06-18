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
};
