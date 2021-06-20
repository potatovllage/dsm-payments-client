import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { useHistory } from "react-router";
import styled from "@emotion/styled";

import FirstView from "./FirstView";
import SecondView from "./SecondView";

import { BsChevronDoubleLeft, BsChevronDoubleRight } from "../../assets";
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

  const onClickMove = (width: number) => {
    if (!divRef.current) return;

    divRef.current.scrollTo({ left: width, behavior: "smooth" });
  };

  return (
    <MainWrap height={window.screen.availHeight}>
      <div ref={divRef} style={{ width }}>
        <FirstView style={style} />
        <SecondView style={style} />
      </div>
      <nav>
        <BsChevronDoubleLeft onClick={() => onClickMove(-width)} />
        <BsChevronDoubleRight onClick={() => onClickMove(width)} />
      </nav>
    </MainWrap>
  );
};

const MainWrap = styled.main<{ height: number }>`
  width: 100%;
  padding-bottom: 50px;
  overflow-y: hidden;
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
  > nav {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    padding: 12px 0;
    background-color: white;
    box-shadow: 0 -1px 3px #b1b1b1;
    > svg {
      width: 40px;
      height: 24px;
      border-radius: 8px;
      box-shadow: 0px 0px 3px #303030;
      cursor: pointer;
    }
  }
`;

export default Main;
