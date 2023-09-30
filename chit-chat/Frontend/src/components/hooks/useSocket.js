import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { makeUniqueRoomId } from "../../utils/helper";

let socket = null;
const useSocket = () => {
  const user = useSelector((state) => state.users.user);
  if (user && socket === null) {
    const socketInstance = io(`http://localhost:${process.env.port || 4000}`, {
      query: { roomId: makeUniqueRoomId(user.id, false) },
    });
    socketInstance.on("connect", () =>
      console.log(
        "socket for " +
          user.username +
          " connected with id = " +
          socketInstance.id
      )
    );
    socket = socketInstance;
  }

  return socket;
};

export default useSocket;
