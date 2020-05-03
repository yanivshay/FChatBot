import {
  SET_USERNAME,
  SET_USERID,
  UPDATE_USER_LIST,
  UPDATE_MESSAGE_LIST,
} from "./types";

export const setUserName = (username) => ({ type: SET_USERNAME, username });
export const setUserId = (uid) => ({ type: SET_USERID, uid });
export const updateUserList = (userlist) => ({
  type: UPDATE_USER_LIST,
  userlist,
});
export const updateMessages = (message) => ({
  type: UPDATE_MESSAGE_LIST,
  message,
});
