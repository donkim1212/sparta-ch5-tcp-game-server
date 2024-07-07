import { headerConstants } from "../constants/header.constants.js";
import userSessionsManager from "../session/user.session.js";
import { writeHeader } from "../utils/packet/header.utils.js";
import LocationUpdateData from "../protobuf/gameNotification/location-update.proto.js";
import { serialize } from "../utils/packet/packet-encoder.utils.js";
import { protoTypeNames } from "../constants/proto.constants.js";
import { MAIN_GAME_ID } from "../constants/game.constants.js";

const locationUpdateHandler = async ({ socket, userId, payload }) => {
  const { x, y, inputX, inputY } = payload;

  const user = userSessionsManager.getUserByUserId(userId);

  /* do some calculation for x, y validation here */
  user.updatePosition(x, y, inputX, inputY);

  const data = new LocationUpdateData(MAIN_GAME_ID, userId);

  const serialized = serialize(protoTypeNames.gameNotification.LocationUpdate, data);
  const header = writeHeader(serialized.length, headerConstants.packetTypes.LOCATION);
  return Buffer.concat([header, serialized]);
};

export default locationUpdateHandler;
