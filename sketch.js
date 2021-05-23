var database;
var gameState = 0;
var playerCount;
var form, game, player;
var allPlayers;
var car1,car2,car3,car4,cars;
var car1Img,car2Img,car3Img,car4Img,trackImg;
var finishedPlayers = 0,reachedFinishPoint;
var goldImg,silverImg,bronzeImg;

function preload() {
    car1Img = loadImage("Images/car1.png");
    car2Img = loadImage("Images/car2.png");
    car3Img = loadImage("Images/car3.png");
    car4Img = loadImage("Images/car4.png");
    trackImg = loadImage("Images/track.jpeg");
    goldImg = loadImage("Images/gold.png");
    silverImg = loadImage("Images/silver.png");
    bronzeImg = loadImage("Images/bronze.png");
}

function setup(){
    createCanvas(displayWidth-20,displayHeight-30);
    database = firebase.database();

    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    if(playerCount === 4 && finishedPlayers === 0) {
        game.update(1);   
    }

    if(finishedPlayers === 4) {
        gameState = 2;
    }

    if(gameState === 2 && finishedPlayers === 4) {
        game.displayRank();
    }

    if(gameState === 1) {
        clear();
        game.play();
    }
}