import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from "./UsersReducer";
import MessageReducer from "./MessagesReducer";

const store = configureStore({
  reducer: { users: UsersReducer, messages: MessageReducer },
});

export default store;
