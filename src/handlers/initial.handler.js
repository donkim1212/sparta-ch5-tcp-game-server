import gameSessionsManager from "../session/game.session.js";
import userSessionsManager from "../session/user.session.js";
import userDbQueries from "../db/user.db.js";
import packetEncoder from "../utils/packet/packet-encoder.utils.js";
import GameStartData from "../protobuf/gameNotification/game-start.proto.js";
import { protoTypeNames } from "../constants/proto.constants.js";
import { writeHeader } from "../utils/packet/header.utils.js";
import { headerConstants } from "../constants/header.constants.js";
import { MAIN_GAME_ID } from "../constants/game.constants.js";

const initialHandler = async ({ socket, userId, payload }) => {
  const { deviceId, playerId } = payload; // deviceId IS userId

  const game = gameSessionsManager.getGameSession(MAIN_GAME_ID);
  game.addUser(userSessionsManager.addUser(deviceId, playerId, socket));
  /* check if deviceId exists first */

  /* create user if dne */
  await userDbQueries.createUser(deviceId, 0, 0);
  const userData = await userDbQueries.findUserByDeviceId(deviceId);

  const data = new GameStartData(game.id, userData.x, userData.y);
  const serialized = packetEncoder(protoTypeNames.gameNotification.GameStart, data);
  const header = writeHeader(serialized.length, headerConstants.packetTypes.GAME_START);
  return Buffer.concat([header, serialized]);
};

export default initialHandler;
