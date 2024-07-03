import dotenv from "dotenv/config";

export const envConstants = {
  PORT: process.env.PORT || 5000,
  HOST: process.env.HOST || "0.0.0.0",
  VERSION: "1.0.0",
  DB_NAME: process.env.DB_NAME || "database1",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 3306,
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD,
};
