//Author:Srinivasarao Chatala
//Date-Created:04/25/2015
//Last-modified-by: Sri Chatala
//Last-modified-Date: 04/26/2015
//Description:


//Global variables
var canvas;
var startText;
var stage;
var bg;
var score;
var bmpList;
var bitmap;
var txt;
var play;
var gameTxt;
var mouseTarget;
var clicked;
var image;
var hero;
var stagewidth = 640;
var stageheight = 400;

//initial function to load the game
function init() {

    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    // enable touch interactions if supported on the current device:
    createjs.Touch.enable(stage);
    score = 0;
  
    welcomeText();
    bg = new Image();
    bg.src = "assets/images/background.jpg";
    bg.onload = setBG;

    image = new Image();
    image.src = "assets/images/enemy.png";
    image.onload = createEnemies;
    
    //Hero image loaded to kill enemies
    hero = new Image();
    hero.src = "assets/images/hero.png";
    hero.onload = loadHero;
}

function welcomeText(event) {
    startText = new createjs.Text("Click To Start", "50px Arial", "#FFFFFF");
    startText.x = 350;
    startText.y = 250;
    stage.addChild(startText);
    stage.update();
    stage.on("stagemousedown", startGame, null, false);
}
function startGame() {
    stage.removeChild(startText);
    createjs.Ticker.addEventListener("tick", handleTick);
}

//Background image
function setBG(event) {
    var bgrnd = new createjs.Bitmap(bg);
    stage.addChild(bgrnd);
    stage.update();

}

//create enemies 
function createEnemies(event) {
    var image = event.target;
    var container = new createjs.Container();
    stage.addChild(container);
    var l = 7;
    bmpList = [];
    for (var i = 0; i < l; i++) {
        bitmap = new createjs.Bitmap(image);
        container.addChild(bitmap);
        bitmap.name = "enemy" + i;
        resetEnemy(bitmap);
        bitmap.regX = bitmap.image.width / 2 | 0;
        bitmap.regY = bitmap.image.height / 2 | 0;
        bitmap.mouseEnabled = true;
        bmpList.push(bitmap);
    }

    txt = new createjs.Text("Score: 0", "24px impact", "#FFF");
    txt.textBaseline = "top";
    txt.x = 50;
    txt.y = 20;
    stage.addChild(txt);
    play = true;
}
//function to load the hero and to move right and left
function loadHero(event) {
    var container = new createjs.Container();
    stage.addChild(container);
    bitmap = new createjs.Bitmap(hero);
    container.addChild(bitmap);
    bitmap.x = 280;//position
    bitmap.y = 320;
    bitmap.scaleX = bitmap.scaleY = bitmap.scale = 0.9;//taille

    bitmap.on("mousedown", function (evt) {
        this.parent.addChild(this);
        this.offset = { x: this.x - evt.stageX, y: this.y - evt.stageY };
    });

    // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
    bitmap.on("pressmove", function (evt) {
        this.x = evt.stageX + this.offset.x;

        // indicate that the stage should be updated on the next tick:
        update = true;
    });

    bitmap.on("mouseup", function (evt) {
        stop();
    });
    createjs.Ticker.addEventListener("tick", handleTick);
}
function stop() {
    createjs.Ticker.removeEventListener("tick", handleTick);
}

function resetEnemy(enemy) {
    enemy.x = canvas.width + Math.random() *500;
    enemy.y = canvas.height * Math.random() | 200;
    enemy.speed = (Math.random() * 8) + 6;
}


//Moving the enemy
function handleTick() {
    //moving the enemy
    if (play == true) {
        var l = bmpList.length;
        for (var i = 0; i < l; i++) {
            var bmp = bmpList[i];
            if (bmp.x > -200) {
                bmp.x -= bmp.speed;
            } else {
                gameOver();
            }
        }
    }
    txt.text = "Score: " + score;
    stage.update();
}

//Game over function to display message
function gameOver() {
    gameTxt = new createjs.Text("Game Over\n\n", "36px impact", "#FFF");
    gameTxt.text += "Click to play again";
    gameTxt.textAlign = "center";
    gameTxt.x = canvas.width / 2;
    gameTxt.y = canvas.height / 3;
    stage.addChild(gameTxt);
    play = false;
    var l = bmpList.length;
    for (var i = 0; i < l; i++) {
        var bmp = bmpList[i];
        resetEnemy(bmp);
    }
    stage.update();
    canvas.onclick = handleClick;
}

//reset the score and start the game again
function handleClick() {
    canvas.onclick = null;
    stage.removeChild(gameTxt);
    score = 0;

    play = true;
}
