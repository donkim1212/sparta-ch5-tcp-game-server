import dotenv from "dotenv/config";

export const envConstants = {
  PORT: process.env.PORT || 5000,
  HOST: process.env.HOST || "0.0.0.0",
  VERSION: "1.0.0",
};
