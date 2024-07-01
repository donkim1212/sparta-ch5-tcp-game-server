import { errorCodes } from "../constants/error.constants.js";
import { handlerIds } from "../constants/handler.constants.js";
import { protoTypeNames } from "../constants/proto.constants.js";
import CustomError from "../utils/errors/classes/custom.error.js";
import initialHandler from "./initial.handler.js";
import locationUpdateHandler from "./location-update.handler.js";

const handlers = {
  [handlerIds.INITIAL]: {
    handler: initialHandler,
    protoType: protoTypeNames.common.InitialPacket,
  },
  [handlerIds.LOCATION_UPDATE]: {
    handler: locationUpdateHandler,
    protoType: protoTypeNames.game.LocationUpdate,
  },
};

export const getHandlerByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new CustomError(errorCodes.UNKNOWN_HANDLER_ID, `Cannot find handler with handlerId: ${handlerId}`);
  }
  return handlers[handlerId].handler;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new CustomError(errorCodes.UNKNOWN_HANDLER_ID, `Cannot find proto type with handlerId: ${handlerId}`);
  }
  return handlers[handlerId].protoType;
};
