import { headerConstants } from "../constants/header.constants.js";
import userSessionsManager from "../session/user.session.js";
import { writeHeader } from "../utils/packet/header.utils.js";
import LocationUpdateData from "../protobuf/gameNotification/location-update.proto.js";
import packetEncoder from "../utils/packet/packet-encoder.utils.js";
import { protoTypeNames } from "../constants/proto.constants.js";

const locationUpdateHandler = async ({ socket, userId, payload }) => {
  const { x, y } = payload;
  const user = userSessionsManager.getUserByUserId(userId);
  /* do some calculation for x, y validation here */
  user.updatePosition(x, y);

  const data = new LocationUpdateData(0, userId);
  const serialized = packetEncoder(protoTypeNames.gameNotification.LocationUpdate, data);

  const header = writeHeader(serialized.length, headerConstants.packetTypes.LOCATION);
  return Buffer.concat([header, serialized]);
};

export default locationUpdateHandler;
