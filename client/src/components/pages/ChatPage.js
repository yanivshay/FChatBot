import React, { useEffect } from "react";
import UsersList from "../UsersList";
import MessagesBox from "../MessagesBox";
import InputBox from "../InputBox";

import "../../styles/Chat.css";

const ChatPage = (props) => {
  const { actions, socket, userlist } = props;
  let replyMsg;

  useEffect(() => {
    socket.on("enterUser", (username) =>
      actions.updateMessages({ type: "ENTER_MESSAGE", username })
    );
    socket.on("leaveUser", (username) =>
      actions.updateMessages({ type: "LEAVE_MESSAGE", username })
    );
    socket.on("updateUserList", (userlist) => actions.updateUserList(userlist));
    socket.on("updateMessages", (message) => actions.updateMessages(message));
  }, []);

  const replyQuestion = (msg) => {
    replyMsg = { id: msg.id, content: msg.content };
  };

  const getReplyMsg = () => {
    return replyMsg;
  };

  return (
    <div class="app-layout">
      <div class="users">
        {`Online Users: ${Object.keys(userlist).length}`}
        <UsersList userlist={userlist} />
      </div>
      <div className="chat-section">
        <div class="messages">
          <MessagesBox {...props} replyQuestion={replyQuestion} />
        </div>
        <div class="input">
          <InputBox {...props} getReplyMsg={getReplyMsg} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
