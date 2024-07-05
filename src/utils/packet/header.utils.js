import { config } from "../../config/config.js";
const headerSize = config.packet.totalLength + config.packet.packetType;

/**
 * Read buffer's header and return it as an object.
 * @param {Buffer} buffer buffer to be read
 * @returns buffer's header as key-value pair object
 */
export const readHeader = (buffer) => {
  return {
    totalLength: buffer.readIntBE(0, config.packet.totalLength),
    packetType: buffer.readIntBE(config.packet.totalLength, config.packet.packetType),
  };
};

export const detachHeader = (buffer) => {
  const header = buffer.subarray(0, headerSize);
  buffer = buffer.subarray(headerSize, buffer.length);
  return [readHeader(header), buffer];
};

/**
 * Construct a header Buffer with given information.
 * @param {Number} length length of packet's data
 * @param {Number} packetType packet's type as defined in headerConstants.packetTypes
 * @returns header as a Buffer
 */
export const writeHeader = (length, packetType) => {
  const buffer = Buffer.alloc(headerSize);
  buffer.writeIntBE(length + headerSize, 0, config.packet.totalLength);
  buffer.writeIntBE(packetType, config.packet.totalLength, config.packet.packetType);
  return buffer;
};
