import { envConstants } from "../constants/env.constants.js";

export const config = {
  server: {
    port: envConstants.PORT,
    host: envConstants.HOST,
  },
};
