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
  const { deviceId, playerId } = payload; // deviceId IS userId

  const user = userSessionsManager.addUser(deviceId, playerId, socket);
  /* check if deviceId exists first */

  /* create user if dne */
  await userDbQueries.createUser(deviceId, 0, 0);
  const userData = await userDbQueries.findUserByDeviceId(deviceId);

  const game = gameSessionsManager.getGameSession(MAIN_GAME_ID);

  const data = new InitialResponseData(game.id, userData.x, userData.y);
  const serialized = serialize(protoTypeNames.response.InitialResponse, data);
  const header = writeHeader(serialized.length, headerConstants.packetTypes.GAME_START);
  game.addUser(user);
  return Buffer.concat([header, serialized]);
};

export default initialHandler;
