import { errorCodes } from "../../constants/error.constants.js";
import { userRemover } from "../user-remover.js";

export const handleError = (socket, error) => {
  try {
    if (error.code) {
      console.error(`Code: ${error.code}, Message: ${error.message}`);
    }
    switch (error.code) {
      case undefined: {
        console.error(error);
        break;
      }
      case errorCodes.SOCKET_ERROR: {
        userRemover(socket);
        break;
      }
      default: {
        userRemover(socket);
        break;
      }
    }

    // send response packet here
    // socket.write();
  } catch (err) {
    console.error(err);
  }
};
