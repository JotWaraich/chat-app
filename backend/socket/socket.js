import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methords: ["GET", "POST"],
  },
});

export const getRecieverSocketId = (recieverId) => {
  return userSockerMap[recieverId];
};

const userSockerMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != undefined) {
    userSockerMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSockerMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSockerMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSockerMap));
  });
});

export { app, io, server };
