class User {
  constructor(id, playerId, socket) {
    this.id = id;
    this.playerId = playerId;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.sequence = 0;
    this.updatedAt = Date.now();
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.updatedAt = Date.now();
  }

  getNextSequence() {
    return ++this.sequence;
  }
}

export default User;
