import "./ChatBox.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../store/redux/UsersReducer";
import Chat from "./Chat";
import UserList from "./UserList";
import { getAllGroups } from "../store/redux/GroupsReducer";
import useSocket from "../hooks/useSocket";
const ChatBox = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.users.receiver);
  const group = useSelector((state) => state.groups.group);

  useEffect(() => {
    // const intervalId = setInterval(() => {
    dispatch(getAllUsers());
    dispatch(getAllGroups());
    // }, 1000);
    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [dispatch]);

  useEffect(() => {
    socket.on("user joined", (msg) => {
      console.log(msg);
      dispatch(getAllUsers());
      dispatch(getAllGroups());
    });
    
    socket.on("new-group", (msg) => {
      console.log(msg);
      dispatch(getAllGroups());
      dispatch(getAllUsers());
    });
  }, [socket, dispatch]);

  return (
    <div className="container">
      <div className="row clearfix chat-box-container">
        <div className="col-lg-12">
          <div className="card chat-app">
            <UserList />
            {(receiver || group) && <Chat />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
