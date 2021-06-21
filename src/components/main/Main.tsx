import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router";
import styled from "@emotion/styled";

import FirstView from "./FirstView";
import SecondView from "./SecondView";
import Navigator from "./Navigator";

import useResize from "../../utils/hooks/public/useResize";
import { userState } from "../../utils/recoils";

const Main = () => {
  const history = useHistory();
  const divRef = useRef<HTMLDivElement>(null);
  const { uuid, name, coin, number } = useRecoilValue(userState);
  const width = useResize();
  const style = { flex: `0 0 ${width}px` };

  useEffect(() => {
    if (uuid === "" && name === "" && coin === 0 && number === 0) {
      history.push("/login");
      return;
    }
  }, []);

  return (
    <MainWrap height={window.screen.availHeight}>
      <div ref={divRef} style={{ width }}>
        <FirstView style={style} />
        <SecondView style={style} />
      </div>
      <Navigator divRef={divRef} width={width} />
    </MainWrap>
  );
};

const MainWrap = styled.main<{ height: number }>`
  width: 100%;
  > div {
    display: flex;
    align-items: center;
    min-height: 100vh;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    > div {
      text-align: center;
      font-size: 24px;
      scroll-snap-align: start;
      > * {
        margin: 18px auto;
        max-width: 500px;
      }
    }
  }
`;

export default Main;
