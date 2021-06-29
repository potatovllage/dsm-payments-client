import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "@emotion/styled";

import FirstView from "./FirstView";
import SecondView from "./SecondView";
import Navigator from "./Navigator";
import withNeedAuth from "./withNeedAuth";

import { useResize, useMovePage, useSocket } from "../../utils/hooks";
import { userState } from "../../utils/recoils";
import { getUser } from "../../utils/apis";

const Main = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const { number } = useRecoilValue(userState);
  const width = useResize();
  const style = { flex: `0 0 ${width}px` };
  const { socket } = useSocket();
  const setUser = useSetRecoilState(userState);
  const {
    page,
    moveFirstPage,
    moveSecondPage,
    onClickMoveFirstPage,
    onClickMoveSecondPage,
  } = useMovePage(divRef, width);

  const setUserInfo = async () => {
    const token = localStorage.getItem("accessToken");

    if (token === null) return;

    const { data } = await getUser(token);

    setUser(data);
  };

  useEffect(() => {
    if (number === 0 || socket.current === undefined) return;

    socket.current.emit("receipt-join", { number });
  }, [number, socket]);

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      const visibleTargetIdx = entries.findIndex((e) => e.isIntersecting);

      if (visibleTargetIdx === 0) moveFirstPage();
      else if (visibleTargetIdx === 1) moveSecondPage();
    };

    const options = {
      root: document.getElementById("scroll-area"),
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(callback, options);
    const firstTarget = document.getElementById("first-view");
    const secondTarget = document.getElementById("second-view");

    if (!firstTarget || !secondTarget) return;

    observer.observe(firstTarget);
    observer.observe(secondTarget);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setUserInfo();
  }, []);

  return (
    <MainWrap id="scroll-area" height={window.screen.availHeight}>
      <div ref={divRef} style={{ width }}>
        <FirstView style={style} />
        <SecondView style={style} />
      </div>
      <Navigator
        page={page}
        onClickMoveFirstPage={onClickMoveFirstPage}
        onClickMoveSecondPage={onClickMoveSecondPage}
      />
    </MainWrap>
  );
};

const MainWrap = styled.main<{ height: number }>`
  width: 100%;
  > div {
    display: flex;
    align-items: center;
    min-height: 85vh;
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

export default withNeedAuth(Main);
