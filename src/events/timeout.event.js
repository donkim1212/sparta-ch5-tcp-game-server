import gameSessionsManager from "../session/game.session.js";
import userSessionsManager from "../session/user.session.js";
import { handleError } from "../utils/errors/error-handler.js";

export const onTimeout = (socket) => async () => {
  try {
    console.log(`Client disconnected (timeout): ${socket.remoteAddress}:${socket.remotePort}`);
    const user = userSessionsManager.getUserBySocket(socket);
    await userDbQueries.updateUserLogin(user.id, user.x, user.y);
    userSessionsManager.removeUserByuserId(user.id);
    gameSessionsManager.getGameSession(0).removeUser(user.id);
  } catch (err) {
    handleError(socket, err);
  }
};
