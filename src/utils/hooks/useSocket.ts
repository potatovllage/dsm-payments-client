import { useEffect, useRef } from "react";
import socketIO from "socket.io-client";

import { SOCKET_URL } from "../apis";

const useSocket = () => {
  const socket = useRef<SocketIOClient.Socket>();

  useEffect(() => {
    let socketConnectCount = 0;

    socket.current = socketIO.connect(SOCKET_URL, {
      transports: ["websocket"],
      forceNew: true,
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
