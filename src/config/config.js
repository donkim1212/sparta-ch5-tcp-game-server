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
  databases: {
    USER_DB: {
      database: envConstants.DB_NAME,
      host: envConstants.DB_HOST,
      port: envConstants.DB_PORT,
      user: envConstants.DB_USER,
      password: envConstants.DB_PASSWORD,
    },
  },
};
