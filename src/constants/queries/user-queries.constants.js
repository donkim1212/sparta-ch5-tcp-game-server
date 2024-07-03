const findUserByDeviceId = `
    SELECT *
    FROM user
    WHERE device_id = ?
`;

const createUser = `
    INSERT INTO user (id, device_id, x, y)
    VALUES (?, ?, ?, ?)
`;

const updateUserLogin = `
    UPDATE user
    SET last_login = CURRENT_TIMESTAMP,
        x = ?,
        y = ?
    WHERE device_id = ?
`;

const updateUserLocation = `
    UPDATE user
    SET x = ?, y = ?
    WHERE device_id = ?
`;

const USER_SQL_QUERIES = {
  FIND_USER_BY_DEVICE_ID: findUserByDeviceId,
  CREATE_USER: createUser,
  UPDATE_USER_LOGIN: updateUserLogin,
  UPDATE_USER_LOCATION: updateUserLocation,
};

export default USER_SQL_QUERIES;
