import { createSlice } from "@reduxjs/toolkit";
import { getGroupMessagesUrl, getMessagesUrl } from "../../../utils/myUrls";
import axios from "axios";
/**
 *
 * @param {string} messagesWithChatIdKey //Key for storing in messages in localstorage
 * @param {ArrayOfObjects} messagesArr // new Message Objects Array
 * @returns Updated Message Objects Array
 */
function addToLocalStorage(messagesWithChatIdKey, messagesArr) {
  const currentMessages = localStorage.getItem(messagesWithChatIdKey);
  if (!currentMessages) {
    // if messages are empty just create new item
    localStorage.setItem(messagesWithChatIdKey, JSON.stringify(messagesArr));
    return messagesArr;
  }
  //if present add messages Arr to current one
  const currentMessagesArr = JSON.parse(currentMessages);
  const newMessagesArr = [...currentMessagesArr, ...messagesArr];
  //As memory is limited in local storage we will only keep only last 20 chats in local storage
  //so remove oldest chat if size greater than 20
  const memoryLimit = 20;
  while (newMessagesArr.length > memoryLimit) newMessagesArr.shift();
  localStorage.setItem(messagesWithChatIdKey, JSON.stringify(newMessagesArr));
  return newMessagesArr;
}

function createLocalKeyForChatMessages(receiverId, isGroupId) {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  return `chatMessagesWith${
    isGroupId ? "Group" : "Receiver"
  }_ID=${receiverId}User_ID=${userId}`;
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
        messagesWithChatIdKey,
      } = action.payload;
      const messages = [...sentMessages, ...receivedMessages];
      messages.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      let UpdatedMessagesArr = messages;
      //if newDataFlag is true means local storage cache is old/empty so fill it with new data
      if (newDataFlag) {
        UpdatedMessagesArr = addToLocalStorage(messagesWithChatIdKey, messages);
      } else {
        //else restore old messages from local storage
        // to make sure they are not overridden in state
        const chatMessages = localStorage.getItem(messagesWithChatIdKey);
        if (chatMessages) UpdatedMessagesArr = JSON.parse(chatMessages);
        else {
          //just create an empty localStorage element as no messages are between both members
          //UpdatedMessagesArr is empty in this case
          localStorage.setItem(messagesWithChatIdKey, UpdatedMessagesArr);
        }
      }
      state.messages = UpdatedMessagesArr;
    },
    addMessage(state, action) {
      let { newMessage, id, isGroupId } = action.payload;
      if (!isGroupId) isGroupId = false;
      // console.log(action.payload);
      const messagesWithChatIdKey = createLocalKeyForChatMessages(
        id,
        isGroupId
      );
      const UpdatedMessagesArr = addToLocalStorage(messagesWithChatIdKey, [
        newMessage,
      ]);
      state.messages = UpdatedMessagesArr;
      // state.messages.push(newMessage);
    },
  },
});

/**
 *
 * @param {boolean} isGroupId this boolean parameter specifies if the messages to fetch are for group chat so id is for group chat
 * @param {number} id (Optional) id of the receiver single or group ,
 * if id not provided messages are fetched for active group or receiver ,
 * if no active receiver or group just for messages with self
 * @returns function for fetching messages from server dispatching a Message Action
 */
export function getReceiverMessages(isGroupId, id) {
  //below if case handles refresh as state is reset and this function is called without id
  //also it sets the receiver to current user on login
  //as no receiver box is active/clicked on login
  if (!id) {
    const inLocalStorage = localStorage.getItem("receiver");
    if (!inLocalStorage) {
      const localStorageUser = localStorage.getItem("user");
      localStorage.setItem("receiver", localStorageUser);
    }
    id = JSON.parse(localStorage.getItem("receiver")).id;
  }

  //checking same case as above for group but if isGroupId is true there will always be a group
  if (isGroupId) {
    id = JSON.parse(localStorage.getItem("group")).id;
  }

  let lastMessageId = 0;
  //Now i will check if messages with receiver with id=receiver exist in localstorage
  const messagesWithChatIdKey = createLocalKeyForChatMessages(id, isGroupId);
  const chatMessages = localStorage.getItem(messagesWithChatIdKey);
  //if they exist find last message id between them which will be stored in last element
  if (chatMessages) {
    const chatMessagesArr = JSON.parse(chatMessages);
    if (chatMessagesArr.length > 0)
      lastMessageId = chatMessagesArr[chatMessagesArr.length - 1].id;
  }
  return async (dispatch) => {
    let reqBody = {
      receiverId: id,
    };
    let reqUrl = getMessagesUrl;
    if (isGroupId) {
      reqBody = {
        groupId: id,
      };
      reqUrl = getGroupMessagesUrl;
    }
    const result = await axios.post(reqUrl + "/" + lastMessageId, reqBody);
    const { sentMessages, receivedMessages } = result.data;
    const newDataFlag = sentMessages.length > 0 || receivedMessages.length > 0;
    // console.log(result.data);
    // newDataFlag means new messages are present
    dispatch(
      messageActions.setMessages({
        sentMessages,
        receivedMessages,
        newDataFlag,
        messagesWithChatIdKey,
      })
    );
  };
}

export const messageActions = MessageSlice.actions;
export default MessageSlice.reducer;
