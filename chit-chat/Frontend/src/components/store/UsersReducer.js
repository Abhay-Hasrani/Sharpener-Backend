import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authOnlineUsersUrl } from "../../utils/myUrls";

const initialState = {
  onlineUsers: [],
  user: JSON.parse(localStorage.getItem("user")) || {},
  receiver: JSON.parse(localStorage.getItem("receiver")) || null,
};
const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    setReceiver(state, action) {
      const id = action.payload;
      const currentReceiver = state.onlineUsers.find((item) => item.id === id);
      localStorage.setItem("receiver", JSON.stringify(currentReceiver));
      state.receiver = currentReceiver;
    },
    setUser(state, action) {
      const currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(currentUser));
      state.user = currentUser;
    },
  },
});

export function getOnlineUsers() {
  return async (dispatch) => {
    const result = await axios.get(authOnlineUsersUrl);
    const onlineUsers = result.data;
    dispatch(userActions.setOnlineUsers(onlineUsers));
  };
}
export const userActions = UserSlice.actions;
export default UserSlice.reducer;
