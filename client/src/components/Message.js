import React from "react";

import "../styles/Messages.css";

const Message = (props) => {
  const { classType, message, handleFocus, index } = props;
  return (
    <li key={index} class={`${classType} clear`}>
      <div class="message">
        {message.replyMsg && (
          <p className="ans-p">{message.replyMsg.content}</p>
        )}
        <span class="message-user-name">{message.username}</span>
        <label className="message-time">{message.time}</label>
        <p class="message-text">{message.content}</p>
        {classType.includes("other") && message.id[0] === "q" && (
          <btn className="message-ans-btn" onClick={() => handleFocus(message)}>
            ANSWER
          </btn>
        )}
      </div>
    </li>
  );
};

export default Message;
