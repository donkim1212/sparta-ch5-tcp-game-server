import { errorCodes } from "../../constants/error.constants.js";
import { getProtoMessages } from "../../init/proto.init.js";
import CustomError from "../errors/classes/custom.error.js";
import { writeHeader } from "./header.utils.js";

/**
 *
 * @param {string} type name of proto message, e.g., 'common.CommonPacket'
 * @param {Object} data to be encoded
 * @param {number} headerTypeName one of protoTypeNames.packageName.typeNames
 * @returns packet encoded using protobuf message
 */
export const serialize = (type, data, headerTypeName) => {
  const [namespace, typeName] = type.split(".");
  const PayloadType = getProtoMessages()[namespace][typeName];

  const errMessage = PayloadType.verify(data);
  if (errMessage) {
    console.error(errMessage);
    throw new CustomError(errorCodes.PACKET_STRUCTURE_MISMATCH, "Error on verifying packet.");
  }
  const encoded = PayloadType.encode(data).finish();
  if (headerTypeName) {
    const header = writeHeader(encoded.length, headerTypeName);
    return Buffer.concat([header, encoded]);
  }

  return encoded;
};
/**
 *
 * @param {string} type name of proto message, e.g., 'common.CommonPacket'
 * @param {Object} data to be decoded
 * @returns decoded data
 */
export const deserialize = (type, data) => {
  const [namespace, typeName] = type.split(".");
  const PayloadType = getProtoMessages()[namespace][typeName];

  const decoded = PayloadType.decode(data);

  return decoded;
};
