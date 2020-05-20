import React from "react";

const LoginPage = ({ actions, socket }) => {
  let usernameField;

  const handleLogin = () => {
    const username = usernameField.value;

    if (username) {
      socket.on("uid", (uid) => actions.setUserId(uid));
      socket.emit("enter", username);
      actions.setUserName(username);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-page">
      <div className="title">Q&A Group Chat</div>
      <div className="login-text">
        <h3>This is awsome group chat with incredible smart chat bot</h3>
        <h4>
          Ask whatever is on your mind and get answer from your group friends or
          from the incredible bot
        </h4>
      </div>
      <div className="login-form">
        <input
          className="name-input"
          type="text"
          placeholder="Type your name"
          ref={(el) => (usernameField = el)}
          onKeyPress={handleKeyPress}
        />
        <button className="apply-button" onClick={handleLogin}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
