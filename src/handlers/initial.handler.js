import gameSessionsManager from "../session/game.session.js";
import userSessionsManager from "../session/user.session.js";

const initialHandler = async ({ socket, userId, payload }) => {
  const { deviceId, playerId } = payload; // deviceId IS userId

  const game = gameSessionsManager.getGameSession(0);
  game.addUser(userSessionsManager.addUser(deviceId, playerId, socket));
};

export default initialHandler;
