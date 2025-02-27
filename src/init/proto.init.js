import fs from "fs";
import path from "path";
import url from "url";
import protobuf from "protobufjs";
import { errorCodes } from "../constants/error.constants.js";
import { protoTypeNames } from "../constants/proto.constants.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const protoDirname = path.join(__dirname, "../../protobuf");

const protoMessages = {};

const getAllProtoFilePaths = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllProtoFilePaths(filePath, fileList);
    } else if (path.extname(file) === ".proto") {
      fileList.push(filePath);
    }
  });

  return fileList;
};

const protoFiles = getAllProtoFilePaths(protoDirname);

export const loadProtoFiles = async () => {
  try {
    const root = new protobuf.Root();
    protoFiles.forEach((file) => root.loadSync(file));

    for (const [packageName, types] of Object.entries(protoTypeNames)) {
      protoMessages[packageName] = {};
      for (const [type, typeName] of Object.entries(types)) {
        protoMessages[packageName][type] = root.lookupType(typeName);
      }
    }

    Object.freeze(protoMessages);
    console.log(`Successfully loaded protobuf files.`);
  } catch (err) {
    err.code = errorCodes.INIT_ERROR;
    err.message = `Error loading proto files: ${err.message}`;
    console.error(err);
  }
};

export const getProtoMessages = () => protoMessages;
