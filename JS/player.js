class Player {
    constructor() {
        this.name = null,
        this.index = 0,
        this.distance = 0,
        this.rank = 0
    }
    getCount() {
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value",(data) => {
            playerCount = data.val();
        });
    }
    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        })
    }
    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            rank: this.rank
        })
    }
    static getPlayerinfo() {
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value",(data) => {
            allPlayers = data.val();
        });
    }
    getFinishedPlayers() {
        var finishedPlayerRef = database.ref("finishedPlayers");
        finishedPlayerRef.on("value",(data) => {
            finishedPlayers = data.val();
        })
    }
    static updateFinishedPlayers() {
        database.ref('/').update({
            finishedPlayers: finishedPlayers+1
        })
    }
}