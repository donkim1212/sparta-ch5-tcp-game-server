import { errorCodes } from "../../constants/error.constants.js";
import { getProtoMessages } from "../../init/proto.init.js";
import CustomError from "../errors/classes/custom.error.js";

/**
 *
 * @param {string} type name of proto message, e.g., 'common.CommonPacket'
 * @param {Object} data to be encoded
 * @returns packet encoded using protobuf message
 */
const packetEncoder = (type, data) => {
  const [namespace, typeName] = type.split(".");
  const PayloadType = getProtoMessages()[namespace][typeName];

  const errMessage = PayloadType.verify(data);
  if (errMessage) {
    console.error(errMessage);
    throw new CustomError(errorCodes.PACKET_STRUCTURE_MISMATCH, "Error on verifying packet.");
  }
  const encoded = PayloadType.encode(data).finish();

  return encoded;
};

export default packetEncoder;
