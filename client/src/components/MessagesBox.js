import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import Message from "./Message";
import "../styles/Messages.css";

const MessagesBox = ({ messages, uid, replyQuestion }) => {
  const messageElement = [];
  let messageEndLine;

  useEffect(() => {
    ReactDOM.findDOMNode(messageEndLine).scrollIntoView();
  });

  const handleFocus = (msg) => {
    document.getElementById("user-input").focus();
    replyQuestion(msg);
  };

  const generateSystemMsg = (message) => {
    return message.type === "ENTER_MESSAGE"
      ? `${message.username} entered the room`
      : `${message.username} left the room`;
  };

  for (let [index, message] of messages.entries()) {
    if (message.hasOwnProperty("type")) {
      let systemMsg = generateSystemMsg(message);

      messageElement.push(
        <div key={index} className="clear system-message">
          {systemMsg}
        </div>
      );
    } else {
      if (message.user_id === uid) {
        messageElement.push(
          <Message
            index={index}
            message={message}
            classType={"chat-item-me"}
            handleFocus={handleFocus}
          />
        );
      } else {
        messageElement.push(
          <Message
            message={message}
            classType={"chat-item-other"}
            handleFocus={handleFocus}
          />
        );
      }
    }
  }

  return (
    <div>
      <ul className="messages-list">{messageElement}</ul>
      <div className="clear" ref={(el) => (messageEndLine = el)} />
    </div>
  );
};

export default MessagesBox;
