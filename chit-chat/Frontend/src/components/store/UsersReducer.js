import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authAllUsersUrl } from "../../utils/myUrls";

const initialState = {
  allUsers: [],
  user: JSON.parse(localStorage.getItem("user")) || {},
  receiver: JSON.parse(localStorage.getItem("receiver")) || null,
};
const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAllUsers(state, action) {
      state.allUsers = action.payload;
    },
    setReceiver(state, action) {
      const id = action.payload;
      const currentReceiver = state.allUsers.find((item) => item.id === id);
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

export function getAllUsers() {
  return async (dispatch) => {
    const result = await axios.get(authAllUsersUrl);
    const allUsers = result.data;
    dispatch(userActions.setAllUsers(allUsers));
  };
}
export const userActions = UserSlice.actions;
export default UserSlice.reducer;
