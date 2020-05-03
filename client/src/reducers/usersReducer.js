import { SET_USERNAME, SET_USERID, UPDATE_USER_LIST } from "../actions/types";

const initialState = {
  uid: "",
  username: "",
  userlist: {},
};

export default function commonFn(state = initialState, action) {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, username: action.username };
    case SET_USERID:
      return { ...state, uid: action.uid };
    case UPDATE_USER_LIST:
      return { ...state, userlist: action.userlist };
    default:
      return state;
  }
}
