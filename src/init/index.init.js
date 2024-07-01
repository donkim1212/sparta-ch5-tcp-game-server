import { loadProtoFiles } from "./proto.init.js";

export const initServer = async () => {
  try {
    // load assets / proto files here
    await loadProtoFiles();
  } catch (err) {
    //
    console.error(err);
    process.exit(1);
  }
};
