import gameSessionsManager from "../session/game.session.js";
import { loadProtoFiles } from "./proto.init.js";

export const initServer = async () => {
  try {
    // load assets / proto files here
    await loadProtoFiles();
    gameSessionsManager.addGameSession(0);
  } catch (err) {
    //
    console.error(err);
    process.exit(1);
  }
};
