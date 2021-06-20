import { useRef, useState, useMemo } from "react";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";

import { BiLockAlt, BiBadge, BiAbacus, BiAdjust } from "../../assets";
import useToggle from "../../utils/hooks/public/useToggle";

type Props = { style: { flex: string } };

const flipCoin = (fromY: number, toY: number) =>
  css(keyframes`
  from {
      transform: translate(-50%, -50%) rotateY(${fromY}deg);
  }
  30% {
    top: 35%;
  }
  60% {
    top: 35%;
  }
  to {
    transform: translate(-50%, -50%) rotateY(${toY}deg);
  }
`);

const flipMillSec = 3000;
const flipFront = flipCoin(0, 1080);
const flipBack = flipCoin(-180, 900);
const flipOption = `${flipMillSec}ms cubic-bezier(0.2, 1, 0.15, 1.05) forwards`;

const SecondView = ({ style }: Props) => {
  const isAble = useRef<boolean>(true);
  const { toggle, onToggle } = useToggle();
  const [boothCount, setBoothCount] = useState<number>(0);

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
    if (boothCount >= 10) {
      return <p>맙소사 부스를 {boothCount}회 이용했어요!</p>;
    }
    if (boothCount >= 8) {
      return <p>무려 부스를 {boothCount}회 이용했어요!</p>;
    }
    if (boothCount >= 5) {
      return <p>벌써 부스를 {boothCount}회나 이용했어요!</p>;
    }
    if (boothCount >= 1) {
      return <p>부스를 {boothCount}회 이용했어요!</p>;
    }
    if (boothCount === 0) {
      return <p>아직 부스를 이용하지 않았어요.</p>;
    }
  }, [boothCount]);

  const printBadge = useMemo(() => {
    if (boothCount >= 10) {
      return (
        <>
          <BiLockAlt className="front" />
          <BiLockAlt className="back" />
        </>
      );
    }
    if (boothCount >= 8) {
      return (
        <>
          <BiBadge className="front" />
          <BiBadge className="back" />
        </>
      );
    }
    if (boothCount >= 5) {
      return (
        <>
          <BiAbacus className="front" />
          <BiAbacus className="back" />
        </>
      );
    }
    if (boothCount >= 0) {
      return (
        <>
          <BiAdjust className="front" />
          <BiAdjust className="back" />
        </>
      );
    }
  }, [boothCount]);

  return (
    <SecondViewWrap style={style} toggle={toggle}>
      <h1 className="title">부스를 이용해 뱃지를 획득하세요.</h1>
      <p className="desc">
        부스를 5회 이용하면 귀신의 집 뱃지를 획득할 수 있어요!
      </p>
      <div className="used-booth-count">{printBoothDescription}</div>
      <div className="badge" onClick={onClickFlipCoin}>
        {printBadge}
      </div>
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
    width: 50%;
    height: 300px;
    text-align: center;
    transform-style: preserve-3d;
    animation: jump 5000ms linear infinite;
    > svg {
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 200px;
      min-width: 150px;
      min-height: 150px;
      max-width: 300px;
      max-height: 300px;
      margin: auto;
      padding: 12px;
      border-radius: 50%;
      box-shadow: -3px 3px 5px #cfcfcf, inset 3px -3px 5px #6b6b6b;
      backface-visibility: hidden;
      cursor: pointer;
      &.front {
        transform: translate(-50%, -50%);
        animation: ${({ toggle }) =>
          toggle
            ? css`
                ${flipFront} ${flipOption}
              `
            : ""};
        z-index: 10;
      }
      &.back {
        transform: translate(-50%, -50%) rotateY(-180deg);
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
  @keyframes jump {
    43% {
      transform: translateY(0);
    }
    46% {
      transform: translateY(-10px);
    }
    50% {
      transform: translateY(0);
    }
    53% {
      transform: translateY(-10px);
    }
    56% {
      transform: translateY(0);
    }
  }
`;

export default SecondView;
