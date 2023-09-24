export const baseUrl = "http://localhost:4000";

const authBaseUrl = baseUrl + "/auth";
export const authSignUpUrl = authBaseUrl + "/signUp";
export const authLogInUrl = authBaseUrl + "/login";
export const authLogOutUrl = authBaseUrl + "/logout";
export const authOnlineUsersUrl = authBaseUrl + "/getOnlineUsers";

const messageBaseUrl = baseUrl + "/message";
export const addMessageUrl = messageBaseUrl + "/add-message";
export const getMessagesUrl = messageBaseUrl + "/get-messages";
