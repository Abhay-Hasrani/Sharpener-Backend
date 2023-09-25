import "./ChatBox.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../store/UsersReducer";
import Chat from "./Chat";
import UserList from "./UserList";
const ChatBox = () => {
  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.users.receiver);

  useEffect(() => {
    dispatch(getAllUsers());
    const intervalId = setInterval(() => {
      // dispatch(getAllUsers());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row clearfix chat-box-container">
        <div className="col-lg-12">
          <div className="card chat-app">
            <UserList />
            {receiver && <Chat />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
