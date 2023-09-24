import "./ChatBox.css";
import UsersListItem from "./UsersListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOnlineUsers } from "../store/UsersReducer";
import Chat from "./Chat";
const ChatBox = () => {
  const dispatch = useDispatch();
  const onlineUsers = useSelector((state) => state.users.onlineUsers);
  const receiver = useSelector((state) => state.users.receiver);
  const onlineUserList = onlineUsers.map((item, index) => (
    <UsersListItem key={index} {...item} />
  ));

  useEffect(() => {
    dispatch(getOnlineUsers());
  }, [dispatch]);
  return (
    <div className="container">
      <div className="row clearfix chat-box-container">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
              <ul className="list-unstyled chat-list mt-2 mb-0">
                {onlineUserList}
              </ul>
            </div>
            {receiver && <Chat />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
