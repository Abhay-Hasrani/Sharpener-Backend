import { createSlice } from "@reduxjs/toolkit";
import { getMessagesUrl } from "../../utils/myUrls";
import axios from "axios";
/**
 *
 * @param {string} messagesWithReceiverIdKey //Key for storing in messages in localstorage
 * @param {ArrayOfObjects} messagesArr // new Message Objects Array
 * @returns Updated Message Objects Array
 */
function addToLocalStorage(messagesWithReceiverIdKey, messagesArr) {
  const currentMessages = localStorage.getItem(messagesWithReceiverIdKey);
  if (!currentMessages) {
    // if messages are empty just create new item
    localStorage.setItem(
      messagesWithReceiverIdKey,
      JSON.stringify(messagesArr)
    );
    return messagesArr;
  }
  //if present add messages Arr to current one
  const currentMessagesArr = JSON.parse(currentMessages);
  const newMessagesArr = [...currentMessagesArr, ...messagesArr];
  //As memory is limited in local storage we will only keep only last 20 chats in local storage
  //so remove oldest chat if size greater than 20
  const memoryLimit = 20;
  while (newMessagesArr.length > memoryLimit) newMessagesArr.shift();
  localStorage.setItem(
    messagesWithReceiverIdKey,
    JSON.stringify(newMessagesArr)
  );
  return newMessagesArr;
}

function createLocalKeyForChatMessages(receiverId) {
  return "chatMessagesWithReceiver_ID=" + receiverId;
}

const initialState = { messages: [] };
const MessageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, action) {
      const {
        sentMessages,
        receivedMessages,
        newDataFlag,
        messagesWithReceiverIdKey,
      } = action.payload;
      const messages = [...sentMessages, ...receivedMessages];
      messages.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      let UpdatedMessagesArr = messages;
      //if newDataFlag is true means local storage cache is old/empty so fill it with new data
      if (newDataFlag) {
        UpdatedMessagesArr = addToLocalStorage(
          messagesWithReceiverIdKey,
          messages
        );
      } else {
        //else restore old messages from local storage
        // to make sure they are not overridden in state
        const chatMessages = localStorage.getItem(messagesWithReceiverIdKey);
        if (chatMessages) UpdatedMessagesArr = JSON.parse(chatMessages);
        else {
          //just create an empty localStorage element as no messages are between both members
          //UpdatedMessagesArr is empty in this case
          localStorage.setItem(messagesWithReceiverIdKey, UpdatedMessagesArr);
        }
      }
      state.messages = UpdatedMessagesArr;
    },
    addMessage(state, action) {
      const { newMessage, receiverId } = action.payload;
      const messagesWithReceiverIdKey =
        createLocalKeyForChatMessages(receiverId);
      const UpdatedMessagesArr = addToLocalStorage(messagesWithReceiverIdKey, [
        newMessage,
      ]);
      state.messages = UpdatedMessagesArr;
      // state.messages.push(newMessage);
    },
  },
});

export function getReceiverMessages(receiverId) {
  //below if case sets the receiver to current user on login
  //  as no receiver box is currently active/clicked
  if (!receiverId) {
    const inLocalStorage = localStorage.getItem("receiver");
    if (!inLocalStorage) {
      const localStorageUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("receiver", localStorageUser);
    }
    receiverId = JSON.parse(localStorage.getItem("receiver")).id;
  }

  let lastMessageId = 0;
  //Now i will check if messages with receiver with id=receiver exist in localstorage
  const messagesWithReceiverIdKey = createLocalKeyForChatMessages(receiverId);
  const chatMessages = localStorage.getItem(messagesWithReceiverIdKey);
  //if they exist find last message id between them which will be stored in last element
  if (chatMessages) {
    const chatMessagesArr = JSON.parse(chatMessages);
    if (chatMessagesArr.length > 0)
      lastMessageId = chatMessagesArr[chatMessagesArr.length - 1].id;
  }
  return async (dispatch) => {
    const result = await axios.post(getMessagesUrl + "/" + lastMessageId, {
      receiverId,
    });
    const { sentMessages, receivedMessages } = result.data;
    const newDataFlag = sentMessages.length > 0 || receivedMessages.length > 0;
    console.log(result.data);
    // newDataFlag means new messages are present
    dispatch(
      messageActions.setMessages({
        sentMessages,
        receivedMessages,
        newDataFlag,
        messagesWithReceiverIdKey,
      })
    );
  };
}

export const messageActions = MessageSlice.actions;
export default MessageSlice.reducer;
