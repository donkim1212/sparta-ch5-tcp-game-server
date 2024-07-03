import mysql from "mysql2/promise";
import { config } from "../config/config.js";

const { databases } = config;

const createPool = (dbConfig) => {
  const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  const originalQuery = pool.query;

  pool.query = (sql, params) => {
    console.log(`[${Date(Date.now())}] Executing query: ${sql} ${params ? `, ${JSON.stringify(params)}` : ``}`);
    return originalQuery.call(pool, sql, params);
  };

  return pool;
};

const pools = {
  USER_DB: createPool(databases.USER_DB),
};

export default pools;
