import { handleError } from "../utils/errors/error-handler.js";
import { userRemover } from "../utils/user-remover.js";

export const onEnd = (socket) => async () => {
  try {
    userRemover(socket);
  } catch (err) {
    handleError(socket, err);
  }
};
