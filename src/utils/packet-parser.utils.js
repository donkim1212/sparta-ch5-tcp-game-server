import { config } from "../config/config.js";
import { getProtoMessages } from "../init/proto.init.js";
import CustomError from "./errors/classes/custom.error.js";
import { errorCodes } from "../constants/error.constants.js";
import { getProtoTypeNameByHandlerId } from "../handlers/index.js";
import protobuf from "protobufjs";

const protoMessages = getProtoMessages();

export const parsePacket = (data) => {
  try {
    const { handlerId, userId, version, payload } = protoMessages.common.CommonPacket.decode(data);

    verifyClientVersion(version);
    const decodedPayload = decodePayload(handlerId, payload);

    return {
      handlerId,
      userId,
      payload: decodedPayload,
    };
  } catch (err) {
    if (err instanceof protobuf.util.ProtocolError && !err.code) {
      err.code = errorCodes.PACKET_DECODE_ERROR;
      err.message = `Error decoding packet: ${err.message}`;
    }
    throw err;
  }
};

const verifyClientVersion = (version) => {
  if (version !== config.client.version) {
    throw new CustomError(
      errorCodes.CLIENT_VERSION_MISMATCH,
      `Client version mismatch: ${version} <> ${config.client.version}`,
    );
  }
};

const decodePayload = (handlerId, payload) => {
  try {
    const { namespace, typeName } = getProtoTypeNameByHandlerId(handlerId).split(".");
    const PayloadType = protoMessages[namespace][typeName];

    // decode throws error on missing req fields
    const decoded = PayloadType.decode(payload);
    // verifyPayloadFields(PayloadType.fields, decoded);

    return decoded;
  } catch (err) {
    if (err instanceof protobuf.util.ProtocolError) {
      err.code = errorCodes.PACKET_DECODE_ERROR;
      err.message = `Error decoding packet payload: ${err.message}`;
    }
    throw err;
  }
};

const verifyPayloadFields = (expectedFields, actualFields) => {
  for (const key of actualFields) {
    if (expectedFields[key] === undefined) {
      throw new CustomError(errorCodes.PACKET_STRUCTURE_MISMATCH, `Unknown field in payload: ${key}`);
    }
  }
  for (const key of expectedFields) {
    if (actualFields[key] === undefined) {
      throw new CustomError(errorCodes.PACKET_STRUCTURE_MISMATCH, `Missing field in payload: ${key}`);
    }
  }
};
