const testDbConnection = async (pool, dbName) => {
  try {
    const [rows] = await pool.query(`SELECT 1 + 1 AS solution`);
    console.log(`${dbName} | Test query Result: ${rows[0].solution}`);
  } catch (err) {
    console.error(`${dbName} | Test query ERROR: ${err}`);
  }
};

const testAllDbConnections = async (pools) => {
  await testDbConnection(pools.USER_DB, "USER_DB");
};

export { testDbConnection, testAllDbConnections };
