import { v4 as uuidv4 } from "uuid";
import pools from "./connect.db.js";
import USER_SQL_QUERIES from "../constants/queries/user-queries.constants.js";
import { toCamelCase } from "../utils/transform-case.utils.js";

const userDbQueries = {
  findUserByDeviceId: async (deviceId) => {
    const [rows] = await pools.USER_DB.query(USER_SQL_QUERIES.FIND_USER_BY_DEVICE_ID, [deviceId]);
    return toCamelCase(rows[0]);
  },
  createUser: async (deviceId, x, y) => {
    const id = uuidv4();
    await pools.USER_DB.query(USER_SQL_QUERIES.CREATE_USER, [id, deviceId, x, y]);
    return { id, deviceId };
  },
  updateUserLogin: async (deviceId, x, y) => {
    await pools.USER_DB.query(USER_SQL_QUERIES.UPDATE_USER_LOGIN, [x, y, deviceId]);
  },
  updateUserLocation: async (deviceId, x, y) => {
    await pools.USER_DB.query(USER_SQL_QUERIES.UPDATE_USER_LOCATION, [x, y, deviceId]);
  },
};

export default userDbQueries;
