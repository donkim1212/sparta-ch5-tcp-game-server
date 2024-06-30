import dotenv from "dotenv/config";

export default envConstants = {
  PORT: process.env.PORT || 5000,
  HOST: process.env.HOST || "127.0.0.1",
};
