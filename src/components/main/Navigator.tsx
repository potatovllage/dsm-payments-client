import { RefObject } from "react";
import styled from "@emotion/styled";

import {
  IoQrCodeOutline,
  IoQrCode,
  RiCoupon2Line,
  RiCoupon2Fill,
} from "../../assets";
import useMovePage from "../../utils/hooks/useMovePage";

type Props = {
  divRef: RefObject<HTMLDivElement>;
  width: number;
};

const Navigator = ({ divRef, width }: Props) => {
  const { page, moveFirstPage, moveSecondPage } = useMovePage(divRef, width);

  return (
    <NavigatorWrap>
      {page === 1 ? (
        <IoQrCode className="active" onClick={moveFirstPage} />
      ) : (
        <IoQrCodeOutline onClick={moveFirstPage} />
      )}
      {page === 2 ? (
        <RiCoupon2Fill className="active" onClick={moveSecondPage} />
      ) : (
        <RiCoupon2Line onClick={moveSecondPage} />
      )}
    </NavigatorWrap>
  );
};

const NavigatorWrap = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 50px;
  background-color: white;
  > svg {
    width: 100%;
    height: 100%;
    padding: 12px;
    color: #9c9c9c;
    border-top: 1px solid #d0d0d0;
    cursor: pointer;
    &.active {
      border-top: 2px solid #496fff;
      color: #496fff;
    }
  }
`;

export default Navigator;
