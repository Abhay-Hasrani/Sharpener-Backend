import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from "./UsersReducer";
import MessageReducer from "./MessagesReducer";
import GroupsReducer from "./GroupsReducer";

const store = configureStore({
  reducer: {
    users: UsersReducer,
    groups: GroupsReducer,
    messages: MessageReducer,
  },
});

export default store;
