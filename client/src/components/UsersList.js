import React from "react";

import { Avatar } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import botImage from "../assets/images/bot.png";

import "../styles/Chat.css";

const UsersList = ({ userlist }) => {
  const list = [];

  for (let uid in userlist) {
    const username = userlist[uid];

    list.push(
      <li key={uid}>
        {/* {username === "ForteroBOT" ? (
          <Chip
            style={{ fontSize: "calc(0.5rem + 2vw)" }}
            avatar={<Avatar src={botImage}></Avatar>}
            label={username}
          />
        ) : (
          <Chip className="user" avatar={<Avatar></Avatar>} label={username} />
        )} */}
        {username === "ForteroBOT" ? (
          <div className="user">
            <img src={botImage} className="user-img" />
            <label className="user-label">{username}</label>
          </div>
        ) : (
          <div className="user">
            <img src={botImage} className="user-img" />
            <label className="user-label">{username}</label>
          </div>
        )}
      </li>
    );
  }

  return <ul className="users-list">{list}</ul>;
};

export default UsersList;
