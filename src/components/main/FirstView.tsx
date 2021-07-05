import { useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import QRCodeCreator from "qrcode.react";
import styled from "@emotion/styled";

import { ImCoinDollar } from "../../assets";
import { userState } from "../../utils/recoils";

type Props = { style: { flex: string } };

const FirstView = ({ style }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const { uuid, coin } = useRecoilValue(userState);

  const downloadQRCode = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    if (canvas === null) return;

    const a = document.createElement("a");
    a.download = "dsm-festival-qrcode.png";
    a.href = canvas.toDataURL();
    a.click();
  };

  const canvasToImg = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    if (!canvas || !imgRef.current) return;

    imgRef.current.setAttribute("src", canvas.toDataURL("image/png"));
  };

  useEffect(() => {
    canvasToImg();
  }, [uuid]);

  return (
    <FirstViewWrap id="first-view" style={style}>
      <h1 className="title">축제 부스 이용을 위한 QR코드</h1>
      <p className="desc">
        이용하려는 부스에 QR코드로 결제하거나 QR코드 대신 고유번호로 결제하세요.
      </p>
      <QRCodeCreator
        id="canvas"
        value={uuid}
        style={{ display: "none", width: "25%", height: "25%" }}
      />
      <img
        ref={imgRef}
        id="qrcode"
        alt="qrcode"
        title="arcode"
        onClick={downloadQRCode}
      />
      <p className="uuid">
        <span>고유번호</span>
        <span>{uuid}</span>
      </p>
      <p className="flex-center price">
        <ImCoinDollar />
        <span>{coin}</span>
      </p>
    </FirstViewWrap>
  );
};

const FirstViewWrap = styled.div`
  background-color: #fff;
  color: #424242;
  > .uuid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    padding: 8px;
    border-radius: 4px;
    background-color: #f3f4f9;
    box-shadow: 0 1px 3px #f2f2f2;
    > span {
      &:first-of-type {
        color: #babbc0;
        font-size: 14px;
      }
      &:last-of-type {
        color: #6e6f74;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  > .title {
    font-size: 20px;
    font-weight: bold;
  }
  > p {
    width: 80%;
    font-size: 12px;
    line-height: 1.5;
    text-align: center;
    word-break: keep-all;
    &.desc {
      color: #afafaf;
    }
    &.price {
      > span {
        margin-left: 4px;
        font-size: 20px;
      }
      > svg {
        width: 20px;
        height: 20px;
      }
    }
  }
  #qrcode {
    min-width: 180px;
    min-height: 180px;
    width: 35%;
    height: 35%;
    max-width: 350px !important;
    max-height: 350px;
  }
`;

export default FirstView;
