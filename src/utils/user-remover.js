import userSessionsManager from "../session/user.session.js";
import userDbQueries from "../db/user.db.js";
import gameSessionsManager from "../session/game.session.js";
import { MAIN_GAME_ID } from "../constants/game.constants.js";

export const userRemover = (socket) => {
  const user = userSessionsManager.getUserBySocket(socket);
  console.log(`[${user.id}] Client disconnected: ${socket.remoteAddress}:${socket.remotePort}`);
  userDbQueries.updateUserLogin(user.id, user.x, user.y).then(() => {
    userSessionsManager.removeUserByuserId(user.id);
    gameSessionsManager.getGameSession(MAIN_GAME_ID).removeUser(user.id);
  });
};
