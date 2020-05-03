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
      <li className="user" key={uid}>
        {username === "ForteroBOT" ? (
          <Chip avatar={<Avatar src={botImage}></Avatar>} label={username} />
        ) : (
          <Chip avatar={<Avatar></Avatar>} label={username} />
        )}
      </li>
    );
  }

  return <ul className="users-list">{list}</ul>;
};

export default UsersList;
