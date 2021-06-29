import { FC, ChangeEvent, useCallback, useRef, KeyboardEvent } from "react";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import { AxiosResponse } from "axios";

import styled from "@emotion/styled";

import LoginHead from "./LoginHead";
import LoginInput from "./LoginInput";

import { LoginReq, LoginRes } from "../../utils/libs/types";
import { getUser } from "../../utils/apis";
import { userState } from "../../utils/recoils";
import useLoading from "../../utils/hooks/public/useLoading";

type Props = {
  id: string;
  password: string;
  onChangeId: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  postLogin: (req: LoginReq) => Promise<AxiosResponse<LoginRes>>;
};

const LoginCommon: FC<Props> = ({
  id,
  password,
  onChangeId,
  onChangePassword,
  postLogin,
  children,
}) => {
  const idRef = useRef<HTMLLabelElement>(null);
  const passwordRef = useRef<HTMLLabelElement>(null);
  const history = useHistory();
  const setUser = useSetRecoilState(userState);
  const { loading, startLoading, endLoading } = useLoading();

  const checkValidation = () => {
    if (!idRef.current || !passwordRef.current) return;

    idRef.current.classList.remove("error");
    passwordRef.current.classList.remove("error");

    if (id.trim() === "") {
      idRef.current.focus();
      idRef.current.classList.add("error");
      return false;
    }

    idRef.current.classList.remove("error");

    if (password.trim() === "") {
      passwordRef.current.focus();
      passwordRef.current.classList.add("error");
      return false;
    }

    passwordRef.current.classList.remove("error");

    return true;
  };

  const login = async () => {
    startLoading();

    // setTimeout(() => {
    //   setUser({
    //     uuid: "1234567",
    //     name: "테스트",
    //     number: 1111,
    //     coin: 1000000000,
    //     countOfUsedBooth: 5,
    //   });
    //   localStorage.setItem(
    //     "accessToken",
    //     "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjQ1MTgyMDUsImV4cCI6MTYyNDYwNDYwNSwic3ViIjoiYXNkZiIsInR5cGUiOiJib290aCJ9.cEExgm3Wr_v0OvU4nvZlAR8qMTKBbEqFMGodCG75j-0"
    //   );

    //   history.push("/");
    // }, 2000);

    try {
      const {
        data: { accessToken },
      } = await postLogin({ id, password });

      localStorage.setItem("accessToken", accessToken);

      const userInfo = await getUserInfo(accessToken);

      if (!userInfo) return;

      setUser(userInfo);
      history.push("/");
    } catch (err) {
      alert("로그인에 실패했어요.");
      endLoading();
    }
  };

  const onClickLogin = useCallback(() => {
    if (checkValidation()) login();
  }, [id, password, idRef.current, passwordRef.current]);

  const onKeyPressLogin = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && checkValidation()) login();
    },
    [id, password, idRef.current, passwordRef.current]
  );

  const getUserInfo = async (accessToken: string) => {
    try {
      const { data } = await getUser(accessToken);

      return data;
    } catch (err) {
      alert("유저 정보 불러오기에 실패했어요.");
    }
  };

  return (
    <LoginWrap>
      <LoginHead />
      <div className="body">
        <LoginInput
          inputAttr={{
            type: "text",
            id: "id",
            placeholder: "아이디를 입력해주세요.",
            autoComplete: "off",
            autoFocus: true,
            value: id,
            onChange: onChangeId,
          }}
          name="아이디"
          inputRef={idRef}
        />
        <LoginInput
          inputAttr={{
            type: "password",
            id: "password",
            placeholder: "비밀번호를 입력해주세요.",
            autoComplete: "off",
            value: password,
            onChange: onChangePassword,
            onKeyPress: onKeyPressLogin,
          }}
          name="비밀번호"
          inputRef={passwordRef}
        />
        {children}
        {loading ? (
          <ul>
            <DotLoaderWrap wait={100} />
            <DotLoaderWrap wait={200} />
            <DotLoaderWrap wait={300} />
          </ul>
        ) : (
          <button
            disabled={[id, password].some((v) => v.trim() === "")}
            onClick={onClickLogin}
          >
            로그인
          </button>
        )}
      </div>
    </LoginWrap>
  );
};

const LoginWrap = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  > * {
    width: 100%;
    max-width: 500px;
  }
  > .body {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 100px;
    background-color: white;
    > p {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 80%;
      > a {
        font-size: 12px;
        color: #2a77f4;
      }
    }
  }
  button {
    width: 80%;
    margin-top: 20px;
    padding: 16px;
    border: 0;
    border-radius: 8px;
    background-color: #2a77f4;
    color: white;
    transition: 300ms;
    &:disabled {
      background-color: #8c8c8c;
    }
    &:hover {
      transform: scale(1.03);
    }
    &:active {
      transform: scale(0.97);
    }
  }
  ul {
    display: flex;
    margin-top: 40px;
  }
  @keyframes dotLoader {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const DotLoaderWrap = styled.li<{ wait: number }>`
  width: 14px;
  height: 14px;
  margin: 0 4px;
  border-radius: 50%;
  background-color: #d0d0d0;
  animation: dotLoader 1000ms ${({ wait }) => wait}ms
    cubic-bezier(0.3, 1, 0.2, 0.95) infinite;
`;

export default LoginCommon;
