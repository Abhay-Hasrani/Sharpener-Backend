import axios from "axios";
import { addMessageUrl } from "../../utils/myUrls";
import "./ChatBox.css";
import ChatBoxHeader from "./ChatBoxHeader";
import MessageItem from "./MessageItem";
import UsersListItem from "./UsersListItem";
const ChatBox = () => {
  async function hey() {
    console.log("hey");
    const newMessage = await axios.post(addMessageUrl, {
      messageText: "first message",
      receiverId: 3,
    });
  }
  // hey();
  return (
    <div className="container">
      <div className="row clearfix">
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
                <UsersListItem />
              </ul>
            </div>
            <div className="chat">
              <ChatBoxHeader />
              <div className="chat-history">
                <ul className="m-b-0">
                  <MessageItem />
                  <MessageItem sentByOther={true} />
                </ul>
              </div>
              <div className="chat-message clearfix">
                <div className="input-group mb-0">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa-solid fa-paper-plane"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter text here..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
