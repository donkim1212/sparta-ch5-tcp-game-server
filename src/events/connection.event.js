import { onData } from "./data.event.js";
import { onEnd } from "./end.event.js";
import { onError } from "./error.event.js";

export const onConnection = (socket) => {
  console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

  socket.buffer = Buffer.alloc(0);

  socket.on("data", onData(socket));
  socket.on("end", onEnd(socket));
  socket.on("error", onError(socket));
};
