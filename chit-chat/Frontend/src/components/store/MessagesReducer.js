import { createSlice } from "@reduxjs/toolkit";
import { getMessagesUrl } from "../../utils/myUrls";
import axios from "axios";

const initialState = { messages: [] };
const MessageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, action) {
      const { sentMessages, receivedMessages } = action.payload;
      const messages = [...sentMessages, ...receivedMessages];
      messages.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      state.messages = messages;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export function getReceiverMessages(receiverId) {
  if (!receiverId) receiverId = JSON.parse(localStorage.getItem("receiver")).id;
  return async (dispatch) => {
    const result = await axios.post(getMessagesUrl, { receiverId });
    // console.log(result.data);
    const { sentMessages, receivedMessages } = result.data;
    dispatch(messageActions.setMessages({ sentMessages, receivedMessages }));
  };
}

export const messageActions = MessageSlice.actions;
export default MessageSlice.reducer;
