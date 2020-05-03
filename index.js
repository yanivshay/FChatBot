const express = require("express");
const bodyParser = require("body-parser");
const esClient = require("./services/elasticService");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

app.use(bodyParser.json());

if (["production"].includes(process.env.NODE_ENV)) {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}

app.get("/", function (req, res) {
  res.render("index");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});

esClient.ping();

var userList = {
  forterobot: "ForteroBOT",
};

io.on("connection", function (socket) {
  io.emit("updateUserList", userList);

  socket.on("enter", function (info) {
    userList[socket.id] = info;
    socket.emit("uid", socket.id);
    socket.broadcast.emit("enterUser", userList[socket.id]);
    io.emit("updateUserList", userList);
  });

  socket.on("updateMessages", function (message) {
    if (
      message.replyMsg &&
      message.replyMsg.id[0] === "q" &&
      message.replyMsg.id[0].slice(-4) !== "-bot"
    ) {
      let question = message.replyMsg.content;
      let answer = message.content;

      esClient.addDocument("chat", "message", {
        question,
        answer,
      });
    }

    io.emit("updateMessages", message);

    if (message.id[0] === "q") {
      // SEARCH IF THE QUESTION ALREADY ANSWERED
      esClient
        .search("chat", "message", {
          query: {
            bool: {
              must: {
                match: {
                  question: message.content,
                },
              },
            },
          },
        })
        .then(
          function (res) {
            if (res.body.hits.total.value > 0 && res.body.hits.max_score > 10) {
              let botMsg = {
                user_id: "forterobot",
                username: "ForteroBOT",
                content: res.body.hits.hits[0]._source.answer,
                time: message.time,
                id: "bot-" + message.id + "-bot",
                replyMsg: { id: message.id, content: message.content },
              };
              console.log(botMsg);
              io.emit("updateMessages", botMsg);
            }
          },
          function (err) {
            console.log(err.message);
          }
        );
    }
  });

  socket.on("leave", function (uid) {
    if (userList.hasOwnProperty(uid)) {
      socket.broadcast.emit("leaveUser", userList[uid]);
      delete userList[uid];
    }

    socket.broadcast.emit("updateUserList", userList);
    socket.disconnect(true);
  });

  socket.on("disconnect", function () {
    if (userList.hasOwnProperty(socket.id)) {
      socket.broadcast.emit("leaveUser", userList[socket.id]);
      delete userList[socket.id];
    }

    socket.broadcast.emit("updateUserList", userList);
  });
});
