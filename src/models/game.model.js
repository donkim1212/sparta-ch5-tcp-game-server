import { gameStateConstants, gameConstants } from "../constants/game.constants.js";
import IntervalManager from "../managers/interval.manager.js";

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.intervalManager = new IntervalManager();
    this.state = gameStateConstants.WAITING;
  }

  addUser(user) {
    if (this.users.length >= gameConstants.MAX_PLAYERS) {
      throw new Error("Game session is full.");
    }
    this.users.push(user);

    this.intervalManager.addPlayer(user.id, user.ping, 1000); // user.ping.bind(user)
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
    this.intervalManager.removePlayer(userId);
    this.users = this.users.filter((user) => user.id !== userId);
    this.state = gameStateConstants.WAITING;
  }

  startGame() {
    this.state = gameStateConstants.IN_PROGRESS;
  }
}

export default Game;
