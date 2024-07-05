import gameSessionsManager from "../../session/game.session.js";

class LocationUpdateData {
  constructor(gameId, userId) {
    const game = gameSessionsManager.getGameSession(gameId);
    if (game) {
      this.users = game.getAllUserLocations();
      if (userId) {
        this.users = this.users.filter((user) => user.id !== userId);
      }
    }
  }
}

export default LocationUpdateData;
