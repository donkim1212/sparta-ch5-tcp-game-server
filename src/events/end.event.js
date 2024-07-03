import userDbQueries from "../db/user.db.js";
import gameSessionsManager from "../session/game.session.js";
import { userSessions } from "../session/session.js";
import userSessionsManager from "../session/user.session.js";
import { handleError } from "../utils/errors/error-handler.js";

export const onEnd = (socket) => async () => {
  try {
    console.log(`Client disconnected: ${socket.remoteAddress}:${socket.remotePort}`);
    for (const [userId, user] of Object.entries(userSessions)) {
      if (user.socket === socket) {
        await userDbQueries.updateUserLogin(userId, user.x, user.y);
        user.x;
        userSessionsManager.removeUserByuserId(userId);
        gameSessionsManager.getGameSession(0).removeUser(userId);
        break;
      }
    }
  } catch (err) {
    handleError(socket, err);
  }
};
