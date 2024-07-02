import { envConstants } from "../constants/env.constants.js";
import { headerConstants } from "../constants/header.constants.js";

export const config = {
  server: {
    port: envConstants.PORT,
    host: envConstants.HOST,
  },
  client: {
    version: envConstants.VERSION,
  },
  packet: {
    totalLength: headerConstants.byteSizes.TOTAL_LENGTH_BYTES,
    packetType: headerConstants.byteSizes.PACKET_TYPE_BYTES,
  },
};
