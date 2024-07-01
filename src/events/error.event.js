import { errorCodes } from "../constants/error.constants.js";
import CustomError from "../utils/errors/classes/custom.error.js";
import { handleError } from "../utils/errors/error-handler.js";

export const onError = (socket) => (error) => {
  handleError(socket, new CustomError(errorCodes.SOCKET_ERROR, error.message));
};
