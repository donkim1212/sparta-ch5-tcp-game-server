import { gameStateConstants } from "../constants/game.constants.js";
import Game from "../models/game.model.js";
import { gameSessions } from "./session.js";

const gameSessionsManager = {
  addGameSession: (id) => {
    const game = new Game(id);
    gameSessions[id] = game;
    console.log(`Created game session: ID ${id}`);
    return game;
  },
  removeGameSession: (id) => {
    if (gameSessions[id]) {
      delete gameSessions[id];
      console.log(`Removed game session: ID ${id}`);
      return true;
    }
    console.log(`Failed to remove game session: ID ${id}`);
    return false;
  },
  getGameSession: (id) => {
    return gameSessions[id];
  },
  getAllGameSessions: () => {
    return gameSessions;
  },
  getAllWaitingGameSessionIds: () => {
    const filteredIds = [];
    for (const [gameId, game] of Object.keys(gameSessions)) {
      if (game.state === gameStateConstants.WAITING) {
        filteredIds.push(gameId);
      }
    }
    return filteredIds;
  },
  getClosestWaitingGameSession: () => {
    for (const [gameId, game] of Object.keys(gameSessions)) {
      if (game.state === gameStateConstants.WAITING) {
        return game;
      }
    }
    return null;
  },
};

export default gameSessionsManager;
