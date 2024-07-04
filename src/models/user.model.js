import { errorCodes } from "../constants/error.constants.js";
import gameSessionsManager from "../session/game.session.js";
import CustomError from "../utils/errors/classes/custom.error.js";

class User {
  constructor(id, playerId, socket) {
    this.id = id;
    this.playerId = playerId;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.sequence = 0;
    this.updatedAt = Date.now();
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.updatedAt = Date.now();
  }

  getNextSequence() {
    return ++this.sequence;
  }

  joinGame(gameId) {
    const game = gameSessionsManager.getGameSession(gameId);
    if (!game) {
      throw new CustomError(errorCodes.GAME_NOT_FOUND, `Can't join game: ID ${gameId}`);
    }

    this.gameId = gameId;
  }

  leaveGame() {
    this.gameId = null;
  }
}

export default User;
