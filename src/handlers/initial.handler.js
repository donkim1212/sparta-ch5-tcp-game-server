import gameSessionsManager from "../session/game.session.js";
import userSessionsManager from "../session/user.session.js";
import userDbQueries from "../db/user.db.js";
import { serialize } from "../utils/packet/packet-encoder.utils.js";
import InitialResponseData from "../protobuf/response/initial-response.proto.js";
import { protoTypeNames } from "../constants/proto.constants.js";
import { writeHeader } from "../utils/packet/header.utils.js";
import { headerConstants } from "../constants/header.constants.js";
import { MAIN_GAME_ID } from "../constants/game.constants.js";

const initialHandler = async ({ socket, userId, payload }) => {
  const { deviceId, playerId, latency, speed } = payload; // deviceId IS userId
  /* check if deviceId exists first */
  const userData = await userDbQueries.findUserByDeviceId(deviceId);
  /* create user if dne */
  if (!userData) {
    await userDbQueries.createUser(deviceId, 0, 0);
  }
  const user = userSessionsManager.addUser(deviceId, playerId, socket, speed);
  user.updatePosition(userData ? userData.x : 0, userData ? userData.y : 0, 0, 0);

  const game = gameSessionsManager.getGameSession(MAIN_GAME_ID);
  game.addUser(user);

  const data = new InitialResponseData(game.id, userData.x, userData.y);
  const serialized = serialize(protoTypeNames.response.InitialResponse, data);
  const header = writeHeader(serialized.length, headerConstants.packetTypes.GAME_START);
  return Buffer.concat([header, serialized]);
};

export default initialHandler;
