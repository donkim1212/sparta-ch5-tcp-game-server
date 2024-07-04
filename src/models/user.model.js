import { errorCodes } from "../constants/error.constants.js";
import { protoTypeNames } from "../constants/proto.constants.js";
import gameSessionsManager from "../session/game.session.js";
import CustomError from "../utils/errors/classes/custom.error.js";
import { serialize } from "../utils/packet/packet-encoder.utils.js";
import PingData from "../protobuf/common/ping.proto.js";

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

  ping() {
    const now = Date.now();
    console.log(`[${this.id}] ping`);
    this.socket.write(serialize(protoTypeNames.common.Ping, new PingData(now)));
  }

  handlePong(data) {
    const now = Date.now();
    this.latency = (now - data.timestamp) / 2;
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
