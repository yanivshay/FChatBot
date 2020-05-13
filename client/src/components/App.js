import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  setUserId,
  setUserName,
  updateMessages,
  updateUserList,
} from "../actions";

import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";

import "../styles/App.css";

const App = (props) => (
  <div className="main-container">
    <div className="title">Q&A Group Chat</div>
    {props.username ? <ChatPage {...props} /> : <LoginPage {...props} />}
  </div>
);

const mapStateToProps = (state) => ({
  username: state.users.username,
  uid: state.users.uid,
  userlist: state.users.userlist,
  socket: state.msgs.socket,
  messages: state.msgs.messages,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      setUserName,
      setUserId,
      updateUserList,
      updateMessages,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
