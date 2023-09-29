import { useDispatch, useSelector } from "react-redux";
import ChatBoxHeader from "./ChatBoxHeader";
import MessageItem from "./MessageItem";
import { useEffect, useRef } from "react";
import {
  getReceiverMessages,
  messageActions,
} from "../store/redux/MessagesReducer";
import SendButton from "../UI/SendButton";
import axios from "axios";
import { addGroupMessageUrl, addMessageUrl } from "../../utils/myUrls";
import useSocket from "../hooks/useSocket";

const Chat = () => {
  const scrollToLastRef = useRef(null);
  const dispatch = useDispatch();
  const socket = useSocket();
  const messages = useSelector((state) => state.messages.messages);
  const receiver = useSelector((state) => state.users.receiver);
  const isGroupInFocus = useSelector((state) => state.groups.isGroupInFocus);
  const group = useSelector((state) => state.groups.group);

  const messageItemList = messages.map((item, index) => (
    <MessageItem key={index} {...item} />
  ));

  useEffect(() => {
    function scrollToLastItem() {
      if (scrollToLastRef.current) {
        const list = scrollToLastRef.current;
        const lastItem = list.lastChild;
        lastItem && lastItem.scrollIntoView({ behavior: "smooth" }); // You can use 'auto' for immediate scroll
      }
    }

    scrollToLastItem();
  }, [messages]);

  useEffect(() => {
    // const intervalId = setInterval(() => {
    dispatch(getReceiverMessages(isGroupInFocus));
    // }, 1000);
    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [dispatch, isGroupInFocus]);

  useEffect(() => {
    if (!socket) return;
    socket.on("new-message", (userObj) => {
      console.log("message from", userObj);
      dispatch(getReceiverMessages(isGroupInFocus));
    });
    socket.on("group-check", (msg) => console.log(msg));
  }, [socket, isGroupInFocus, dispatch]);

  async function sendMessageFormHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {};
    for (const [name, value] of formData.entries()) userData[name] = value;
    try {
      let reqUrl;
      if (isGroupInFocus) {
        userData.groupId = group.id;
        reqUrl = addGroupMessageUrl;
      } else {
        userData.receiverId = receiver.id;
        reqUrl = addMessageUrl;
      }

      const result = await axios.post(reqUrl, userData);
      // console.log(result.data);
      const newMessage = result.data;
      if (!isGroupInFocus)
        dispatch(messageActions.addMessage({ newMessage, id: receiver.id }));
      else
        dispatch(
          messageActions.addMessage({
            newMessage,
            id: group.id,
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
        <ul ref={scrollToLastRef} className="m-b-0">
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
