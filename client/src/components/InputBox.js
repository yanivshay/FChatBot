import React from "react";
import uniqid from "uniqid";

import "../styles/InputArea.css";

const InputBox = ({ socket, uid, username, getReplyMsg }) => {
  let msgField;

  const handleMessages = () => {
    const content = msgField.value;

    if (content) {
      socket.emit("updateMessages", {
        user_id: uid,
        username,
        content,
        id: generateMsgId(content),
        time: getTime(),
        replyMsg: getReplyMsg(),
      });
      msgField.value = "";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleMessages();
    }
  };

  const getTime = () => {
    const date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();

    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;

    return hour + ":" + minute;
  };

  const generateMsgId = (content) =>
    content[content.length - 1] === "?" ? uniqid("q-") : uniqid("a-");

  return (
    <div class="chat-controls">
      <textarea
        id="user-input"
        class="chat-controls-textarea"
        rows="2"
        cols="10"
        placeholder="What is on you'r mind?"
        ref={(el) => (msgField = el)}
        onKeyPress={handleKeyPress}
      ></textarea>
      <span class="material-icons controls-send" onClick={handleMessages}>
        send
      </span>
    </div>
  );
};

export default InputBox;
