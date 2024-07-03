import User from "../models/user.model.js";
import { userSessions } from "./session.js";

const userSessionsManager = {
  addUser: (uuid, playerId, socket) => {
    const user = new User(uuid, playerId, socket);
    userSessions[uuid] = user;
    return user;
  },
  removeUserByuserId: (userId) => {
    if (userSessions[userId]) {
      delete userSessions[userId];
      console.log(`Removed user with ID ${id}`);
      return true;
    }
    return false;
  },
  /**
   *
   * @param {string} userId user's ID
   * @returns User instance, or undefined if dne.
   */
  getUserByUserId: (userId) => {
    return userSessions[userId];
  },
  getUserBySocket: (socket) => {
    for (const [userId, user] of Object.entries(userSessions)) {
      if (user.socket === socket) {
        return user;
      }
    }
    return null;
  },
  getNextSequence: (userId) => {
    if (!userSessions[userId]) {
      return null;
    }
    return userSessions[userId].getNextSequence();
  },
};

export default userSessionsManager;
