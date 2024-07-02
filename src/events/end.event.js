export const onEnd = (socket) => () => {
  try {
    console.log(`Client disconnected: ${socket.remoteAddress}:${socket.remotePort}`);
  } catch (err) {
    //
  }
};
