import { combineReducers } from "redux";

import msgsReducer from "./msgsReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  msgs: msgsReducer,
  users: usersReducer,
});
