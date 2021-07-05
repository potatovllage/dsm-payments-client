import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "@emotion/styled";

import FirstView from "./FirstView";
import SecondView from "./SecondView";
import Navigator from "./Navigator";
import withNeedAuth from "./withNeedAuth";
import PaySuccessFulModal from "./PaySuccessFulModal";

import {
  useResize,
  useMovePage,
  useSocket,
  useLoading,
} from "../../utils/hooks";
import { userState } from "../../utils/recoils";
import { getUser } from "../../utils/apis";
import Loading from "../Loading";
import { PaySuccessFulType } from "../../utils/libs/types";

const Main = () => {
  const history = useHistory();
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
  const { loading, startLoading, endLoading } = useLoading(false);
  const [payRes, setPayRes] = useState<PaySuccessFulType | null>(null);

  const setUserInfo = async () => {
    const token = localStorage.getItem("accessToken");

    if (token === null) return;

    startLoading();
    try {
      const { data } = await getUser(token);

      setUser(data);
    } catch (err) {
      alert("유저 정보 가져오기 실패");
      history.push("/login");
    }
    endLoading();
  };

  const closeModal = () => {
    setPayRes(null);
  };

  useEffect(() => {
    if (number === 0 || socket.current === undefined) return;

    socket.current.emit("receipt-join", { number });
  }, [number, socket]);

  useEffect(() => {
    if (!socket.current) return;

    socket.current.on("pay-successful", (msg: PaySuccessFulType) => {
      setPayRes(msg);
      setUserInfo();
    });
  }, []);

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
      observer.unobserve(firstTarget);
      observer.unobserve(secondTarget);
      observer.disconnect();
    };
  }, [loading]);

  useEffect(() => {
    setUserInfo();
  }, []);

  return (
    <MainWrap id="scroll-area" height={window.screen.availHeight}>
      <div
        id="view-wrap"
        ref={divRef}
        style={{ width, justifyContent: loading ? "center" : "flex-start" }}
      >
        {loading ? (
          <Loading width="100px" height="100px" />
        ) : (
          <>
            <FirstView style={style} />
            <SecondView style={style} />
          </>
        )}
      </div>
      <Navigator
        page={page}
        onClickMoveFirstPage={onClickMoveFirstPage}
        onClickMoveSecondPage={onClickMoveSecondPage}
      />
      {payRes && <PaySuccessFulModal {...payRes} closeModal={closeModal} />}
    </MainWrap>
  );
};

const MainWrap = styled.main<{ height: number }>`
  width: 100%;
  > #view-wrap {
    display: flex;
    align-items: center;
    min-height: 85vh;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    ::-webkit-scrollbar {
      display: none;
    }
    > div {
      text-align: center;
      font-size: 24px;
      scroll-snap-align: start;
      > * {
        margin: 12px auto;
        max-width: 500px;
      }
    }
  }
`;

export default withNeedAuth(Main);
