import io from "socket.io-client";
import { UPDATE_MESSAGE_LIST } from "../actions/types";

const initialState = {
  messages: [],
  socket: io("localhost:5000"),
};

export default function commonFn(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MESSAGE_LIST:
      return { ...state, messages: [...state.messages, action.message] };
    default:
      return state;
  }
}
