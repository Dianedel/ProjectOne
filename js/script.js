// Definitions
// -----------

function Skieur () {
  this.width = 70;
  this.height = 75;
  this.x = (myCanvas.width/2) - (this.width/2);
  this.y = myCanvas.height/4;
  this.counter = counter;

}

Skieur.prototype.draw = function () {
  ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
}

function Obstacle (myImage, myWidth, myHeight) {
  this.image = myImage;
  this.width = myWidth;
  this.height = myHeight;
  this.isGood = true;
  this.isEaten = false;

  // initially off screen
  this.y = myCanvas.height;
  // random initial Y
  this.x = Math.floor(Math.random() * myCanvas.width) + 1;
  // random speed (1-10)
  this.speed = 3;
}

Obstacle.prototype.draw = function (isCollision) {
  if (!isCollision) {
    this.y -= this.speed;
   }
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};

function boxCollision (x1, y1, width1, height1, x2, y2, width2, height2) {
  return x1 < x2 + width2 &&
    x1 + width1 > x2 &&
    y1 < y2 + height2 &&
    height1 + y1 > y2;
}

// var restartButton = document.getElementById("restart");
// restartButton.onclick = restart;


// -----------------------------------------------------------------------------
// Canvas
// ------

var myCanvas = document.querySelector("canvas");

// make the canvas take up the entire screen
myCanvas.width = "800";
myCanvas.height = "600";

window.onresize = function () {
  // when the window is resized, resize the canvas
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;
};

var ctx = myCanvas.getContext("2d");

// Load images
var playerImg = new Image();
playerImg.src = "../img/skiGirl.png";

var treeImg = new Image();
treeImg.src = "../img/arbre.png";

var badManImg = new Image();
badManImg.src = "../img/snowball.png";

var rockImg = new Image();
rockImg.src = "../img/rock.png";

var pineTreeImg = new Image();
pineTreeImg.src = "../img/pineTree.png";

var obstacleImages = [treeImg, rockImg, pineTreeImg, /*eggplantImg*/];
var movingObstacles = [
  new Obstacle(treeImg, rockImg, pineTreeImg, 85,85)
];


// Add more obstacles over time
var addObstacle = setInterval(function () {
  var randomIndex = Math.floor(Math.random() * obstacleImages.length);
  var image = obstacleImages[randomIndex];

  var height = 85;
  if (image === rockImg) {
    var newObstacle = new Obstacle(image, 15, 15);
    height = 15;
  }
  else newObstacle = new Obstacle(image, 85,85)
  movingObstacles.push(newObstacle);

}, 200);

var skieur = new Skieur();

var counter = 1000;

var drawLoop = setInterval(function () {
  // erase the old drawings
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  // redraw everything
  skieur.draw();
  ctx.font = "26px sans-serif";
  ctx.fillStyle = "#0A7239";
  ctx.fillText("Life points : " + counter, 550, 30);

  var globalCollision = false;
  movingObstacles.forEach(function (oneObstacle) {
    // check collision with player
    var isCollision = boxCollision(skieur.x, skieur.y, skieur.width, skieur.height, oneObstacle.x, oneObstacle.y, oneObstacle.width, oneObstacle.height);
    if (isCollision) {
      globalCollision = true;
      counter -= 1;
      // continue if it's a good obstacle
      // console.log( "Aille");
      // console.log(counter);
      // if (oneObstacle.isGood) {
    }
  });
  movingObstacles.forEach(function (oneObstacle) {
    oneObstacle.draw(globalCollision);
  });

  if (counter <=0) {
    clearInterval( addObstacle );
    movingObstacles.forEach( function (oneObstacle ) {
      oneObstacle.speed = 0;
      ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
      ctx.drawImage (badManImg, 0,0,613,1060,400,35,306,530);
      ctx.font = "150px Agency FB";
      ctx.fillStyle = "black";
      ctx.fillText("GAME", 80, 260);
      ctx.fillStyle = "#FF5733";
      ctx.fillText("OVER", 80, 430);
    });
  }
}, 1000 / 60);
  // redraw 60 times a second for smooth animations


// -----------------------------------------------------------------------------
// User inputs
// -----------

var body = document.querySelector("body");
var audio = document.querySelector("audio")
body.onkeydown = function (event) {
  audio.play();
  switch (event.keyCode) {
    case 90: // Z key
    case 38: // up arrow
      skieur.y -= 7;
      event.preventDefault();
      break;

    case 83: // S key
    case 40: // down arrow
      skieur.y += 7;
      event.preventDefault();
      break;

    case 81: // Q key
    case 37: // left arrow
      skieur.x -= 7;
      event.preventDefault();
      break;

    case 68: // D key
    case 39: // right arrow
      skieur.x += 7;
      event.preventDefault();
      break;
  }
};
