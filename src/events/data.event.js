import { config } from "../config/config.js";
import { headerConstants } from "../constants/header.constants.js";
import { handleError } from "../utils/errors/error-handler.js";
import { parsePacket } from "../utils/packet/packet-parser.utils.js";
import { getHandlerByHandlerId } from "../handlers/index.js";
import { deserialize } from "../utils/packet/packet-encoder.utils.js";
import { protoTypeNames } from "../constants/proto.constants.js";
import userSessionsManager from "../session/user.session.js";
import { errorCodes } from "../constants/error.constants.js";

const headerSize = config.packet.totalLength + config.packet.packetType;

export const onData = (socket) => async (data) => {
  try {
    socket.buffer = Buffer.concat([socket.buffer, data]);

    while (socket.buffer.length >= headerSize) {
      if (!socket.buffer.nextTotalLength) {
        socket.buffer.nextTotalLength = socket.buffer.readIntBE(0, config.packet.totalLength);
      }

      if (socket.buffer.length < socket.buffer.nextTotalLength) {
        break;
      }

      const packetType = socket.buffer.readIntBE(config.packet.totalLength, config.packet.packetType);

      const packet = socket.buffer.subarray(headerSize, socket.buffer.nextTotalLength);
      socket.buffer = socket.buffer.subarray(socket.buffer.nextTotalLength);

      switch (packetType) {
        case headerConstants.packetTypes.PING: {
          const decoded = deserialize(protoTypeNames.common.Ping, packet);
          const user = userSessionsManager.getUserBySocket(socket);
          if (!user) {
            throw new CustomError(errorCodes.USER_NOT_FOUND, `User not found.`);
          }
          user.handlePong(decoded);
          break;
        }
        case headerConstants.packetTypes.NORMAL: {
          const parsed = parsePacket(packet);

          const handler = getHandlerByHandlerId(parsed.handlerId);

          const result = await handler({ socket, userId: parsed.userId, payload: parsed.payload });
          if (result && result instanceof Buffer) {
            socket.write(result);
          }
          break;
        }
      }
    }
  } catch (err) {
    handleError(socket, err);
  }
};
