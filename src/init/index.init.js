import { MAIN_GAME_ID } from "../constants/game.constants.js";
import pools from "../db/connect.db.js";
import gameSessionsManager from "../session/game.session.js";
import { testAllDbConnections } from "../utils/db/test-db-connection.js";
import { loadProtoFiles } from "./proto.init.js";

export const initServer = async () => {
  try {
    // load assets / proto files here
    await loadProtoFiles();
    await testAllDbConnections(pools);
    gameSessionsManager.addGameSession(MAIN_GAME_ID);
  } catch (err) {
    //
    console.error(err);
    process.exit(1);
  }
};
