import { useDispatch, useSelector } from "react-redux";
import ChatBoxHeader from "./ChatBoxHeader";
import MessageItem from "./MessageItem";
import { useEffect } from "react";
import { getReceiverMessages, messageActions } from "../store/MessagesReducer";
import SendButton from "../UI/SendButton";
import axios from "axios";
import { addGroupMessageUrl, addMessageUrl } from "../../utils/myUrls";

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const receiver = useSelector((state) => state.users.receiver);
  const isGroupInFocus = useSelector((state) => state.groups.isGroupInFocus);
  const group = useSelector((state) => state.groups.group);

  const messageItemList = messages.map((item, index) => (
    <MessageItem key={index} {...item} />
  ));

  useEffect(() => {
    // if (receiver)
    dispatch(getReceiverMessages(isGroupInFocus));

    const intervalId = setInterval(() => {
      // if (receiver) dispatch(getReceiverMessages());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, receiver]);

  async function sendMessageFormHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {};
    for (const [name, value] of formData.entries()) userData[name] = value;
    try {
      let reqUrl = addMessageUrl;
      userData.receiverId = receiver.id;
      if (isGroupInFocus) {
        userData.groupId = group.id;
        reqUrl = addGroupMessageUrl;
      }

      const result = await axios.post(reqUrl, userData);
      // console.log(result.data);
      const newMessage = result.data;
      if (!isGroupInFocus)
        dispatch(
          messageActions.addMessage({ newMessage, receiverId: receiver.id })
        );
      else
        dispatch(
          messageActions.addMessage({
            newMessage,
            groupId: group.id,
            isGroupId: true,
          })
        );
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="chat">
      <ChatBoxHeader />
      <div className="chat-history">
        <ul className="m-b-0">
          {/* <MessageItem /> */}
          {messageItemList}
        </ul>
      </div>
      <div className="chat-message clearfix">
        <form className="input-group mb-0" onSubmit={sendMessageFormHandler}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter text here..."
            name="messageText"
            autoComplete="off"
            autoFocus
          />
          <SendButton type={"submit"} />
        </form>
      </div>
    </div>
  );
};
export default Chat;
