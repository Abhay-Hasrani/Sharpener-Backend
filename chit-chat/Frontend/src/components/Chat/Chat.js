import { useDispatch, useSelector } from "react-redux";
import ChatBoxHeader from "./ChatBoxHeader";
import MessageItem from "./MessageItem";
import { useEffect, useRef, useState } from "react";
import {
  getReceiverMessages,
  messageActions,
} from "../store/redux/MessagesReducer";
import SendButton from "../UI/SendButton";
import axios from "axios";
import { addGroupMessageUrl, addMessageUrl } from "../../utils/myUrls";
import useSocket from "../hooks/useSocket";
import { CloseButton, OverlayTrigger, Tooltip } from "react-bootstrap";

const Chat = () => {
  const scrollToLastRef = useRef(null);
  const dispatch = useDispatch();
  let [file, setFile] = useState(null);
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
      if (file) {
        // console.log(file.name);
        userData.userFile = file;
        console.log(userData);
      }
      if (userData.messageText === "") return;
      const result = await axios.post(reqUrl, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  }
  function fileUploadHandler() {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.click();
    fileInput.addEventListener("change", (e) => {
      const selectedFile = e.target.files[0]; // Get the first selected file
      if (selectedFile) {
        setFile(selectedFile);
        console.log(`Selected file: ${selectedFile.name}`);
      } else {
        console.log("No file selected.");
      }
    });
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
        <form
          className="input-group mb-0"
          onSubmit={sendMessageFormHandler}
          encType="multipart/form-data"
        >
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="tooltip">Click to share files!</Tooltip>}
          >
            <button
              type="button"
              onClick={fileUploadHandler}
              className="btn btn-primary m-1"
            >
              <i className="fa-solid fa-file-export"></i>
            </button>
          </OverlayTrigger>
          <input
            type="text"
            className="form-control"
            placeholder="Enter text here..."
            name="messageText"
            autoComplete="off"
            autoFocus
          />
          <SendButton type="submit" />
        </form>
        {file && (
          <>
            <span className="fw-bold fs-10 me-1">{file.name}</span>
            <CloseButton onClick={() => setFile(null)} />
          </>
        )}
      </div>
    </div>
  );
};
export default Chat;
