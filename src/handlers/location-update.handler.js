import { headerConstants } from "../constants/header.constants.js";
import { getProtoMessages } from "../init/proto.init.js";
import gameSessionsManager from "../session/game.session.js";
import userSessionsManager from "../session/user.session.js";
import { writeHeader } from "../utils/header.utils.js";

const locationUpdateHandler = async ({ socket, userId, payload }) => {
  const { x, y } = payload;
  const user = userSessionsManager.getUserByUserId(userId);
  /* do some calculation for x, y validation here */
  user.updatePosition(x, y);

  const LocationUpdate = getProtoMessages().game.LocationUpdate;
  const game = gameSessionsManager.getGameSession(0);

  const filteredUsers = game.getAllUsers().filter((user) => user.id !== userId);

  const err = LocationUpdate.verify({ users: filteredUsers });
  if (err) {
    console.error(err);
  }

  const responsePayload = LocationUpdate.encode({ users: filteredUsers }).finish();
  const header = writeHeader(responsePayload.length, headerConstants.packetTypes.LOCATION);
  return Buffer.concat([header, responsePayload]);
};

export default locationUpdateHandler;
