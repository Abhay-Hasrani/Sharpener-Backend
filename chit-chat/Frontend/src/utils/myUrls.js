export const baseUrl = "http://localhost:4000";

const authBaseUrl = baseUrl + "/auth";
export const authSignUpUrl = authBaseUrl + "/signUp";
export const authLogInUrl = authBaseUrl + "/login";
export const authLogOutUrl = authBaseUrl + "/logout";
export const authAllUsersUrl = authBaseUrl + "/getAllUsers";

const messageBaseUrl = baseUrl + "/message";
export const addMessageUrl = messageBaseUrl + "/add-message";
/**
 * add a queryParameter " /:lastMessageId " ans it will fetch messages from that point
 * if lastMessage is undefined || null it will get last messages
 * but NOTE ADD IT NO MATTER!!!
 */
export const getMessagesUrl = messageBaseUrl + "/get-messages";

const groupBaseUrl = baseUrl + "/group";
export const createGroupUrl = groupBaseUrl + "/create-group";
