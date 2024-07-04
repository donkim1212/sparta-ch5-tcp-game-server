import { config } from "../config/config.js";
import { headerConstants } from "../constants/header.constants.js";
import { handleError } from "../utils/errors/error-handler.js";
import { parsePacket } from "../utils/packet/packet-parser.utils.js";
import { getHandlerByHandlerId } from "../handlers/index.js";

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
      // console.log("=====PACKET TYPE:", packetType);
      // remove completed packet from buffer
      const packet = socket.buffer.subarray(headerSize, socket.buffer.nextTotalLength);
      socket.buffer = socket.buffer.subarray(socket.buffer.nextTotalLength);

      switch (packetType) {
        case headerConstants.packetTypes.PING: {
          console.log(`PING`);
          break;
        }
        case headerConstants.packetTypes.NORMAL: {
          const parsed = parsePacket(packet);
          // console.log(`NORMAL | parsed: ${parsed}`, parsed);

          const handler = getHandlerByHandlerId(parsed.handlerId);

          const result = await handler({ socket, userId: parsed.userId, payload: parsed.payload });
          if (result && result instanceof Buffer) {
            socket.write(result);
          }
          break;
        }
        case headerConstants.packetTypes.LOCATION: {
          // const parsedLocation = parsePacket(packet);
          console.log("UpdateLocation");
          // console.log(`LOCATION | parsed: ${parsedLocation}`, parsedLocation);
          break;
        }
      }

      socket.buffer.nextTotalLength = 0;
    }
  } catch (err) {
    handleError(socket, err);
  }
};
