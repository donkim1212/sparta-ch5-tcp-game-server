import { protoTypeNames } from "../constants/proto.constants.js";
import { serialize } from "../utils/packet/packet-encoder.utils.js";
import PingData from "../protobuf/common/ping.proto.js";
import { headerConstants } from "../constants/header.constants.js";
import CustomError from "../utils/errors/classes/custom.error.js";
import { errorCodes } from "../constants/error.constants.js";
import { handleError } from "../utils/errors/error-handler.js";

class User {
  constructor(id, playerId, socket, speed) {
    this.socket = socket;
    this.latency = 0;
    this.ping();
    this.id = id;
    this.playerId = playerId;
    this.speed = speed;
    this.x = 0;
    this.y = 0;
    this.inputX = 0;
    this.inputY = 0;
    this.sequence = 0;
    this.updatedAt = Date.now();
  }

  updatePosition(x, y, inputX, inputY) {
    this.x = x;
    this.y = y;
    this.inputX = inputX;
    this.inputY = inputY;
    this.updatedAt = Date.now();
  }

  updateInputVector(inputX, inputY) {
    this.inputX = inputX;
    this.inputY = inputY;
    this.updatedAt = Date.now();
  }

  calculateNextPosition(latency) {
    // distance = speed * time
    const time = (latency <= 1 ? 1 : latency) / 1000; // latency in seconds
    const distance = this.speed * time;

    // angle can be obtained through input vector
    if (this.inputX === 0 && this.inputY === 0) {
      return { x: this.x, y: this.y };
    }
    const theta = this.calculateTheta();

    // dx = cos(angle) * distance
    const dx = Math.cos(theta) * distance;
    // console.log("-- theta:", theta, " | cos:", Math.cos(theta), " | sin:", Math.sin(theta), " | dx:", dx);
    // dy = sin(angle) * distance
    const dy = Math.sin(theta) * distance;
    this.x += dx;
    this.y += dy;
    return { x: this.x, y: this.y };
  }

  calculateTheta() {
    return Math.atan2(this.inputY, this.inputX);
  }

  getNextSequence() {
    return ++this.sequence;
  }

  ping() {
    try {
      const now = Date.now();
      if (now - this.updatedAt > 10000) {
        throw new CustomError(errorCodes.SOCKET_ERROR, `Socket timeout: ${[this.id]}`);
      }
      console.log(`[${this.id}] PING`);
      const pingPacket = serialize(protoTypeNames.common.Ping, new PingData(now), headerConstants.packetTypes.PING);

      this.socket.write(pingPacket);
    } catch (err) {
      handleError(this.socket, err);
    }
  }

  handlePong(data) {
    const now = Date.now();
    this.latency = (now - data.timestamp) / 2;
    console.log(`[${this.id}] PONG: ${this.latency}ms`);
  }

  // joinGame(gameId) {
  //   const game = gameSessionsManager.getGameSession(gameId);
  //   if (!game) {
  //     throw new CustomError(errorCodes.GAME_NOT_FOUND, `Can't join game: ID ${gameId}`);
  //   }

  //   this.gameId = gameId;
  // }

  // leaveGame() {
  //   this.gameId = null;
  // }
}

export default User;
