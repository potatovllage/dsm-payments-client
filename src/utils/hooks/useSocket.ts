import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import socketIO from "socket.io-client";

import { SOCKET_URL } from "../apis";
import { PaySuccessFulType } from "../libs/types";
import { userState } from "../recoils";

const useSocket = () => {
  const socket = useRef<SocketIOClient.Socket>();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    let socketConnectCount = 0;

    socket.current = socketIO.connect(SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.current.on("pay-successful", (msg: PaySuccessFulType) => {
      console.log("결제가 완료되었습니다.");
      console.log(`결제번호는 ${msg.id}입니다.`);
      console.log("결제일시 :", new Date().toLocaleTimeString());
      console.log("요청금액 :", msg.requestValue);
      console.log("세금 :", msg.tax);
      console.log("결제금액 :", msg.finalValue);
      console.log("결제부스 :", msg.sender);

      setUser(msg.user);
    });

    socket.current.on("connect_error", () => {
      socketConnectCount > 3
        ? socket.current?.disconnect()
        : socketConnectCount++;
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return { socket };
};

export default useSocket;
