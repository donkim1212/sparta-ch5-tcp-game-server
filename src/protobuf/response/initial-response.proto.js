class InitialResponseData {
  constructor(gameId, x, y) {
    (this.gameId = gameId), (this.timestamp = Date.now());
    this.x = x;
    this.y = y;
  }
}

export default InitialResponseData;
