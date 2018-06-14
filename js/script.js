// Definitions
// -----------

function Skieur () {
  this.width = 54;
  this.height = 60;
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
playerImg.src = "./img/skiMan.jpg";

var pineImg = new Image();
pineImg.src = "./img/pineTree.jpg";

// var badManImg = new Image();
// badManImg.src = "./img/snowball.png";

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
  //   newObstacle.isGo od = false;
  // }
  movingObstacles.push(newObstacle);
}, 200);

var skieur = new Skieur();

var counter = 600;




var drawLoop = setInterval(function () {
  // erase the old drawings
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  // redraw everything
  skieur.draw();

ctx.font = "18px Helvetica";
ctx.fillStyle = "#0A7239";
ctx.fillText("Rest of your Life " + counter, 550, 20);


  var globalCollision = false;

  movingObstacles.forEach(function (oneObstacle) {
    // check collision with player
    var isCollision = boxCollision(skieur.x, skieur.y, skieur.width, skieur.height, oneObstacle.x, oneObstacle.y, oneObstacle.width, oneObstacle.height);
    if (isCollision) {
      globalCollision = true;
      counter -= 1;
      if (counter <=0) {
        ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
        ctx.font = "36px Helvetica";
        ctx.strokeStyle = "#C70039";
        ctx.strokeText("GAME OVER !!!", 400, 40);
        clearInterval( addObstacle );
        movingObstacles.forEach( function (oneObstacle ) {
        oneObstacle.speed = 0;
        ctx.drawImage (badManImg, myCanvas.width, myCanvas.height)
        });
      }

      // continue if it's a good obstacle
      console.log( "Aille");
      console.log(counter);
      // if (oneObstacle.isGood) {
    }
  });
  movingObstacles.forEach(function (oneObstacle) {
    oneObstacle.draw(globalCollision);
  });
  // if (counter == 0){
  //   alert("Game Over!!!")
  // }
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

//----------------------------------------------------------------
//-----------BACKGROUND SNOW EFFECT------------------------------
//------------------------------------------------------------------

// (function() {
//   var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
//   function(callback) {
//       window.setTimeout(callback, 1000 / 60);
//   };
//   window.requestAnimationFrame = requestAnimationFrame;
// })();


// var flakes = [],
//   canvas = document.getElementById("canvas"),
//   ctx = canvas.getContext("2d"),
//   flakeCount = 400,
//   mX = -100,
//   mY = -100

//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

// function snow() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   for (var i = 0; i < flakeCount; i++) {
//       var flake = flakes[i],
//           x = mX,
//           y = mY,
//           minDist = 150,
//           x2 = flake.x,
//           y2 = flake.y;

//       var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
//           dx = x2 - x,
//           dy = y2 - y;

//       if (dist < minDist) {
//           var force = minDist / (dist * dist),
//               xcomp = (x - x2) / dist,
//               ycomp = (y - y2) / dist,
//               deltaV = force / 2;

//           flake.velX -= deltaV * xcomp;
//           flake.velY -= deltaV * ycomp;

//       } else {
//           flake.velX *= .98;
//           if (flake.velY <= flake.speed) {
//               flake.velY = flake.speed
//           }
//           flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
//       }

//       ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")";
//       flake.y += flake.velY;
//       flake.x += flake.velX;

//       if (flake.y >= canvas.height || flake.y <= 0) {
//           reset(flake);
//       }


//       if (flake.x >= canvas.width || flake.x <= 0) {
//           reset(flake);
//       }

//       ctx.beginPath();
//       ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
//       ctx.fill();
//   }
//   requestAnimationFrame(snow);
// };

// function reset(flake) {
//   flake.x = Math.floor(Math.random() * canvas.width);
//   flake.y = 0;
//   flake.size = (Math.random() * 3) + 2;
//   flake.speed = (Math.random() * 1) + 0.5;
//   flake.velY = flake.speed;
//   flake.velX = 0;
//   flake.opacity = (Math.random() * 0.5) + 0.3;
// }

// function init() {
//   for (var i = 0; i < flakeCount; i++) {
//       var x = Math.floor(Math.random() * canvas.width),
//           y = Math.floor(Math.random() * canvas.height),
//           size = (Math.random() * 3) + 2,
//           speed = (Math.random() * 1) + 0.5,
//           opacity = (Math.random() * 0.5) + 0.3;

//       flakes.push({
//           speed: speed,
//           velY: speed,
//           velX: 0,
//           x: x,
//           y: y,
//           size: size,
//           stepSize: (Math.random()) / 30,
//           step: 0,
//           opacity: opacity
//       });
//   }

//   snow();
// };

// canvas.addEventListener("mousemove", function(e) {
//   mX = e.clientX,
//   mY = e.clientY
// });

// window.addEventListener("resize",function(){
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// })

// init();
