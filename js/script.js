// Definitions
// -----------

function Skieur () {
  this.width = 54;
  this.height = 60;
  this.x = (myCanvas.width/2) - (this.width/2);
  this.y = myCanvas.height/4;
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

Obstacle.prototype.draw = function () {
  this.y -= this.speed;
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};

function boxCollision (x1, y1, width1, height1, x2, y2, width2, height2) {
  return x1 < x2 + width2 &&
    x1 + width1 > x2 &&
    y1 < y2 + height2 &&
    height1 + y1 > y2;
}


// -----------------------------------------------------------------------------
// Canvas
// ------

var myCanvas = document.querySelector("canvas");

// make the canvas take up the entire screen
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

window.onresize = function () {
  // when the window is resized, resize the canvas
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;
};

var ctx = myCanvas.getContext("2d");

// Load images
var playerImg = new Image();
playerImg.src = "./img/skiMan.jpg";

var pineImg = new Image();
pineImg.src = "./img/pineTree.jpg";

// var pizzaImg = new Image();
// pizzaImg.src = "./images/pizza.png";

// var broccoliImg = new Image();
// broccoliImg.src = "./images/broccoli.png";

// var eggplantImg = new Image();
// eggplantImg.src = "./images/eggplant.png";

var obstacleImages = [pineImg, /*pizzaImg, broccoliImg, eggplantImg*/];
var movingObstacles = [
  new Obstacle(pineImg, 35, 35)
];


// Add more obstacles over time
var addObstacle = setInterval(function () {
  var randomIndex = Math.floor(Math.random() * obstacleImages.length);
  var image = obstacleImages[randomIndex];

  // var height = 60;
  // if (image === pizzaImg) {
  //   height = 40;
  // }

  var newObstacle = new Obstacle(image, 35, 35);
  // if (image === broccoliImg || image === eggplantImg) {
  //   newObstacle.isGood = false;
  // }
  movingObstacles.push(newObstacle);
}, 200);

var skieur = new Skieur();

var drawLoop = setInterval(function () {
  // erase the old drawings
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  // redraw everything
  skieur.draw();

  // var affiche = window.prompt("brrrrr!!");
  // affiche.draw();

  movingObstacles.forEach(function (oneObstacle) {
    // check collision with player
    var isCollision = boxCollision(skieur.x, skieur.y, skieur.width, skieur.height, oneObstacle.x, oneObstacle.y, oneObstacle.width, oneObstacle.height);
    if (isCollision) {
      // clearInterval(drawLoop) && affiche;

        // stop.movingObstacles();
      // continue if it's a good obstacle
      console.log( "OUCH")
      // if (oneObstacle.isGood) {
      //   oneObstacle.isEaten = true;
    }
    else {
      oneObstacle.draw();
    //   // GAME OVER if it's a bad obstacle
    //   // (stop the loops to freeze the game)
    //   clearInterval(drawLoop);
    //   clearInterval(addObstacle);
    // }
    }
    oneObstacle.draw();
  });

  // remove eaten obstacles from the array
  // movingObstacles = movingObstacles.filter(function (oneObstacle) {
  //   return !oneObstacle.isEaten;
  // });
}, 1000 / 60);
  // redraw 60 times a second for smooth animations


// -----------------------------------------------------------------------------
// User inputs
// -----------

var body = document.querySelector("body");
body.onkeydown = function (event) {
  switch (event.keyCode) {
    case 90: // Z key
    case 38: // up arrow
      skieur.y -= 5;
      event.preventDefault();
      break;

    case 83: // S key
    case 40: // down arrow
      skieur.y += 5;
      event.preventDefault();
      break;

    case 81: // Q key
    case 37: // left arrow
      skieur.x -= 5;
      event.preventDefault();
      break;

    case 68: // D key
    case 39: // right arrow
      skieur.x += 5;
      event.preventDefault();
      break;
  }
};
