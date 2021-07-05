import { useRef, useMemo } from "react";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";

import { badgeGhostHouse } from "../../assets";
import useToggle from "../../utils/hooks/public/useToggle";
import { useRecoilValue } from "recoil";
import { userState } from "../../utils/recoils";

type Props = { style: { flex: string } };

const ghostHouseTimes = [
  "09:40 ~ 10:00",
  "10:40 ~ 11:00",
  "11:40 ~ 12:00",
  "13:40 ~ 14:00",
  "14:40 ~ 15:00",
  "15:40 ~ 16:00",
];

const ghostHouseAvailableTime = ghostHouseTimes.find((time) => {
  const t = +time.split(":")[0];
  const h = new Date().getHours();
  return t >= h;
});

const flipCoin = (fromY: number, toY: number) =>
  css(keyframes`
  from {
      transform: translate(-50%, -75%) rotateY(${fromY}deg);
  }
  30% {
    top: 35%;
  }
  60% {
    top: 35%;
  }
  to {
    transform: translate(-50%, -75%) rotateY(${toY}deg);
  }
`);

const flipMillSec = 3000;
const flipFront = flipCoin(0, 1080);
const flipBack = flipCoin(-180, 900);
const flipOption = `${flipMillSec}ms cubic-bezier(0.2, 1, 0.15, 1.05) forwards`;

const SecondView = ({ style }: Props) => {
  const isAble = useRef<boolean>(true);
  const { toggle, onToggle } = useToggle();
  const { countOfUsedBooth } = useRecoilValue(userState);

  const onClickFlipCoin = () => {
    if (isAble.current === false) return;

    isAble.current = false;
    onToggle();
    setTimeout(() => {
      isAble.current = true;
      onToggle();
    }, flipMillSec);
  };

  const printBoothDescription = useMemo(() => {
    if (countOfUsedBooth >= 10) {
      return <p>맙소사 부스를 {countOfUsedBooth}회 이용했어요!</p>;
    }
    if (countOfUsedBooth >= 8) {
      return <p>무려 부스를 {countOfUsedBooth}회 이용했어요!</p>;
    }
    if (countOfUsedBooth >= 5) {
      return <p>벌써 부스를 {countOfUsedBooth}회나 이용했어요!</p>;
    }
    if (countOfUsedBooth >= 1) {
      return <p>부스를 {countOfUsedBooth}회 이용했어요!</p>;
    }
    if (countOfUsedBooth === 0) {
      return <p>아직 부스를 이용하지 않았어요.</p>;
    }
  }, [countOfUsedBooth]);

  const printBadge = useMemo(() => {
    if (countOfUsedBooth >= 10) {
      return (
        <>
          <img
            src={badgeGhostHouse}
            alt="badge"
            title="badege"
            className="front"
          />
          <img
            src={badgeGhostHouse}
            alt="badge"
            title="badege"
            className="back"
          />
        </>
      );
    }
    if (countOfUsedBooth >= 8) {
      return (
        <>
          <img
            src={badgeGhostHouse}
            alt="badge"
            title="badege"
            className="front"
          />
          <img
            src={badgeGhostHouse}
            alt="badge"
            title="badege"
            className="back"
          />
        </>
      );
    }
    if (countOfUsedBooth >= 5) {
      return (
        <>
          <img
            src={badgeGhostHouse}
            alt="badge"
            title="badege"
            className="front"
          />
          <img
            src={badgeGhostHouse}
            alt="badge"
            title="badege"
            className="back"
          />
        </>
      );
    }
    if (countOfUsedBooth >= 0) {
      return (
        <>
          <img
            src={badgeGhostHouse}
            alt="badge"
            title="badege"
            className="front"
          />
          <img
            src={badgeGhostHouse}
            alt="badge"
            title="badege"
            className="back"
          />
        </>
      );
    }
  }, [countOfUsedBooth]);

  return (
    <SecondViewWrap id="second-view" style={style} toggle={toggle}>
      <h1 className="title">부스를 이용해 뱃지를 획득하세요.</h1>
      <p className="desc">
        부스를 5회 이용하면 귀신의 집 뱃지를 획득할 수 있어요!
      </p>
      <div className="used-booth-count">{printBoothDescription}</div>
      <div className="badge" onClick={onClickFlipCoin}>
        {printBadge}
      </div>
      <p className="notice">
        {ghostHouseAvailableTime ? (
          <>
            귀신의 집 뱃지 가지신 분은
            <br />
            <span className="time">{ghostHouseAvailableTime}</span>시에{" "}
            <a href="https://forms.gle/LX8W8baJe9a5pjnW9" target="_blank">
              이 링크
            </a>
            에서
            <br />
            참여 신청이 가능합니다!!
          </>
        ) : (
          "귀신의 집 운영기간이 끝났습니다."
        )}
      </p>
    </SecondViewWrap>
  );
};

const SecondViewWrap = styled.div<{ toggle: boolean }>`
  height: 100%;
  color: #242424;
  text-align: center;
  line-height: 1.5;
  > .badge {
    position: relative;
    transform: translateY(0);
    width: 50%;
    height: 250px;
    text-align: center;
    transform-style: preserve-3d;
    animation: jump 5000ms linear infinite;
    > img {
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translate(-50%, -75%);
      width: 160px;
      height: 160px;
      min-width: 150px;
      min-height: 150px;
      max-width: 300px;
      max-height: 300px;
      margin: auto;
      border-radius: 50%;
      box-shadow: -3px 3px 5px #cfcfcf, inset 3px -3px 5px #6b6b6b;
      backface-visibility: hidden;
      cursor: pointer;
      &.front {
        transform: translate(-50%, -75%);
        animation: ${({ toggle }) =>
          toggle
            ? css`
                ${flipFront} ${flipOption}
              `
            : ""};
        z-index: 10;
      }
      &.back {
        transform: translate(-50%, -75%) rotateY(-180deg);
        animation: ${({ toggle }) =>
          toggle
            ? css`
                ${flipBack} ${flipOption}
              `
            : ""};
      }
    }
  }
  > .title {
    font-size: 20px;
    font-weight: bold;
  }
  > .desc {
    width: 80%;
    font-size: 12px;
    line-height: 1.5;
    color: #afafaf;
    text-align: center;
    word-break: keep-all;
  }
  > .used-booth-count {
    bottom: 100px;
    color: #6b6b6b;
    font-size: 14px;
    > span {
      margin: 0 4px;
    }
  }
  > .notice {
    font-size: 16px;
    > .time {
      color: #4384f3;
    }
    > a {
      color: #ea2840;
    }
  }
  @keyframes jump {
    43% {
      transform: translateY(0);
    }
    46% {
      transform: translateY(calc(0 + -10px));
    }
    50% {
      transform: translateY(0);
    }
    53% {
      transform: translateY(calc(0 + -10px));
    }
    56% {
      transform: translateY(0);
    }
  }
`;

export default SecondView;
