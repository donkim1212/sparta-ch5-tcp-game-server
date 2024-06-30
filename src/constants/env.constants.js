import dotenv from "dotenv/config";

export const envConstants = {
  PORT: process.env.PORT || 5000,
  HOST: process.env.HOST || "127.0.0.1",
};
