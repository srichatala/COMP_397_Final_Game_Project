//Author:Srinivasarao Chatala
//Date-Created:04/25/2015
//Last-modified-by: Sri Chatala
//Last-modified-Date: 04/26/2015
//Description:


//Global variables
var canvas;
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

//initial function to load the game
function init() {

    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    // enable touch interactions if supported on the current device:
    createjs.Touch.enable(stage);
    score = 0;


    bg = new Image();
    bg.src = "assets/images/background.jpg";
    bg.onload = setBG;

    image = new Image();
    image.src = "assets/images/enemy.png";
    image.onload = createEnemies;
    

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

    createjs.Ticker.addEventListener("tick", handleTick);
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
