const gameStateConstants = {
  WAITING: 0,
  IN_PROGRESS: 1,
};

const gameConstants = {
  MAX_PLAYERS: 4,
};

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.state = "waiting";
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
    this.state = "waiting";
  }

  startGame() {
    this.state = "inProgress";
  }
}

export default Game;
