import fs from "fs";
import path from "path";
import url from "url";
import pools from "../connect.db.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const executeSqlFile = async (pool, filePath) => {
  const sql = fs.readFileSync(filePath, "utf8");
  const queries = sql
    .split(";")
    .map((query) => query.trim())
    .filter((query) => query.length > 0);
  for (const query of queries) {
    await pool.query(query);
  }
};

const createSchemas = async () => {
  const sqlDir = path.join(__dirname, "../sql");
  try {
    await executeSqlFile(pools.USER_DB, path.join(sqlDir, "user_db.sql"));

    console.log("Successfully created DB tables.");
  } catch (err) {
    console.error("Error creating DB tables:", err);
  }
};

createSchemas()
  .then(() => {
    console.log("Completed DB migration.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error on DB migration:", err);
    process.exit(1);
  });
