import styled from "@emotion/styled";

import { PaySuccessFulType } from "../../utils/libs/types";

type Props = {
  closeModal: () => void;
} & PaySuccessFulType;

const PaySuccessFulModal = ({
  id,
  requestValue,
  tax,
  finalValue,
  createdAt,
  closeModal,
  booth: { name },
}: Props) => {
  return (
    <PaySuccessFulWrap>
      <h2>결제가 완료되었습니다.</h2>
      <p>
        <span>결제번호</span>
        <span>{id}</span>
      </p>
      <hr />
      <p>
        <span>결제부스</span>
        <span>{name}</span>
      </p>
      <hr />
      <p>
        <span>요청금액</span>
        <span>{requestValue}</span>
      </p>
      <p>
        <span>세금</span>
        <span className="tax">{Math.abs(tax)}</span>
      </p>
      <p>
        <span>결제금액</span>
        <span className="finalValue">{finalValue}</span>
      </p>
      <hr />
      <p>
        <span>결제일시</span>
        <span>{new Date(createdAt).toLocaleTimeString()}</span>
      </p>
      <button onClick={closeModal}>닫기</button>
    </PaySuccessFulWrap>
  );
};

const PaySuccessFulWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 80%;
  padding: 16px;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 1px 3px #a2a2a2;
  font-size: 14px;
  > h2 {
    margin-bottom: 16px;
    font-size: 16px;
    text-align: center;
  }
  > p {
    line-height: 2;
    > span {
      display: inline-block;
      width: 50%;
      &:first-of-type {
        color: #888888;
      }
      &.tax {
        color: #ea2840;
      }
      &.finalValue {
        color: #60c3e7;
      }
    }
  }
  > button {
    width: 100%;
    margin-top: 16px;
    padding: 8px;
    border: 0;
    background-color: #48bbe4;
    color: white;
  }
`;

export default PaySuccessFulModal;
