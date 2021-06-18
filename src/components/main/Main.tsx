import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router";
import styled from "@emotion/styled";

import FirstView from "./FirstView";
import SecondView from "./SecondView";

import useResize from "../../utils/hooks/public/useResize";
import { userState } from "../../utils/recoils";

const Main = () => {
  const history = useHistory();
  const { uuid, name, coin, number } = useRecoilValue(userState);
  const width = useResize();
  const style = { flex: `0 0 ${width}px` };

  useEffect(() => {
    console.log({ uuid, name, price: coin });
    if (uuid === "" && name === "" && coin === 0 && number === 0) {
      history.push("/login");
      return;
    }
  }, []);

  return (
    <MainWrap height={window.screen.availHeight}>
      <div style={{ width }}>
        <SecondView style={style} />
        <FirstView style={style} />
      </div>
    </MainWrap>
  );
};

const MainWrap = styled.main<{ height: number }>`
  width: 100%;
  overflow-y: hidden;
  > div {
    display: flex;
    align-items: center;
    min-height: 100vh;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    > div {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      font-size: 24px;
      scroll-snap-align: start;
      > * {
        margin: 18px 0;
        max-width: 500px;
      }
    }
  }
`;

export default Main;
