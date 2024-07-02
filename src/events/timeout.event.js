import gameSessionsManager from "../session/game.session.js";
import userSessionsManager from "../session/user.session.js";

export const onTimeout = (socket) => () => {
  // disconnect socket and remove user(?) on timeout
  const game = gameSessionsManager.getGameSession(0);
  //   const user = userSessionsManager.
  //   game.removeUser();
};
