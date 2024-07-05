import { protoTypeNames } from "../constants/proto.constants.js";
import { serialize } from "../utils/packet/packet-encoder.utils.js";
import PingData from "../protobuf/common/ping.proto.js";
import { headerConstants } from "../constants/header.constants.js";

class User {
  constructor(id, playerId, socket, speed) {
    this.id = id;
    this.playerId = playerId;
    this.socket = socket;
    this.speed = speed;
    this.x = 0;
    this.y = 0;
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

  calculateNextPosition() {
    // distance = speed * time
    const time = this.latency / 1000; // latency in seconds
    const distance = this.speed * time;

    // angle can be obtained through input vector
    const theta = this.calculateTheta();

    // dx = cos(angle) * distance
    const dx = Math.cos(theta) * distance;
    // dy = sin(angle) * distance
    const dy = Math.sin(theta) * distance;
    // nextX = this.x + dx;
    // nextY = this.y + dy;
    return { x: this.x + dx, y: this.y + dy };
  }

  calculateTheta() {
    return Math.atan2(this.inputY, this.inputX);
  }

  getNextSequence() {
    return ++this.sequence;
  }

  ping() {
    const now = Date.now();
    console.log(`[${this.id}] PING`);
    const pingPacket = serialize(protoTypeNames.common.Ping, new PingData(now), headerConstants.packetTypes.PING);

    this.socket.write(pingPacket);
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
