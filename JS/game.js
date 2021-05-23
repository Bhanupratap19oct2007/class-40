class Game {
    constructor() {
    }
    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value",(data) => {
            gameState = data.val();
        });
    }
    update(state) {
        database.ref('/').update({
            gameState: state
        })
    }
    async start() {
        if(gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref("playerCount").once("value");
            if(playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
            car1 = createSprite(100,200);
            car2 = createSprite(300,200);
            car3 = createSprite(500,200);
            car4 = createSprite(700,200);
            cars = [car1,car2,car3,car4]

            car1.addImage(car1Img);
            car2.addImage(car2Img);
            car3.addImage(car3Img);
            car4.addImage(car4Img);

            reachedFinishPoint = false;
        }
    }
    play() {
        form.hide();
        Player.getPlayerinfo();
        player.getFinishedPlayers();
        if(allPlayers != undefined) {
            background(180);
            image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
            var index = 0;
            var x = 200;
            var y;

            for(var plr in allPlayers) {
                index = index+1;
                x = x+200;
                y = displayHeight-allPlayers[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;
                if(index === player.index) {
                    fill("red");
                    stroke(10);
                    ellipse(x,y,80,80);
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }
                textSize(25);
                textAlign(CENTER);
                fill("yellow");
                text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+80);
            }
        }
        if(keyDown(UP_ARROW) && player.index != null && reachedFinishPoint != true) {
            player.distance += 10;
            player.update();
        }
        if(player.distance > 4350 && reachedFinishPoint === false) {
            reachedFinishPoint = true;
            Player.updateFinishedPlayers();
            player.rank = finishedPlayers;
            player.update();
        }
        drawSprites();
    }
    displayRank() {
        camera.position.x = 0;
        camera.position.y = 0;
        Player.getPlayerinfo();
        imageMode(CENTER);
        image(bronzeImg,-displayWidth/4,displayHeight/9-100,200,240);
        image(silverImg,displayWidth/4,displayHeight/10-100,220,270);
        image(goldImg,0,-100,250,300);
        textAlign(CENTER);
        textSize(40);
        fill("white");
        for(var plr in allPlayers) {
            if(allPlayers[plr].rank === 1) {
                text("1st: " + allPlayers[plr].name,0,80);
            } else if(allPlayers[plr].rank === 2) {
                text("2nd: " + allPlayers[plr].name,displayWidth/4,displayHeight/10+78);
            } else if(allPlayers[plr].rank === 3) {
                text("3rd: " + allPlayers[plr].name,-displayWidth/4,displayHeight/9+80);
            } else {
                textSize(30);
                text("Better luck next time: " + allPlayers[plr].name,0,250);
            }
        }
    }
}