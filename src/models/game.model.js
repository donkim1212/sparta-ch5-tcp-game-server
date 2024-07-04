import { gameStateConstants, gameConstants } from "../constants/game.constants.js";

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.state = gameStateConstants.WAITING;
  }

  addUser(user) {
    if (this.users.length >= gameConstants.MAX_PLAYERS) {
      throw new Error("Game session is full.");
    }
    this.users.push(user);
    // if (this.users.length === gameConstants.MAX_PLAYERS) {
    //   setTimeout(() => {
    //     this.startGame();
    //   }, 3000);
    // }
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  getAllUsers() {
    return this.users;
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
    this.state = gameStateConstants.WAITING;
  }

  startGame() {
    this.state = gameStateConstants.IN_PROGRESS;
  }
}

export default Game;
