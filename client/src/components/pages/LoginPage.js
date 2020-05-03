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
  );
};

export default LoginPage;
