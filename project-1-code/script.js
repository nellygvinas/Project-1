window.onload = function() {
  
document.getElementById('game-board').style.display = "none";

// Declare variables
  let currentGame, currentUnicorn, controller;

  
 //Grab canvas and set canvas context
  const canvas = document.querySelector("#my-canvas");
  const ctx = canvas.getContext("2d");
  
    
  // CLASSES ---------------------------------------------------------------------------
  
    class Game {
      constructor(){
        this.unicorn = {}; // unicorn => object
        this.obstacles = []; // obstacles => array
        this.score = 0;
      }
    }
  
    class Unicorn {
      constructor(){
        this.x = 20;
        this.velocityX = 0;
        this.y = 450;
        this.velocityY = 0;
        this.width = 180;
        this.height = 160;
        this.jumping = true;
        this.img = '../images/unicorn-idle.gif';
      }
  
      drawUnicorn(){
        const unicornImg = new Image();
        unicornImg.src = this.img;
        // unicornImg.onload = function() {
        ctx.drawImage(unicornImg, this.x, this.y, this.width, this.height)
        // ctx.fillRect(50, 50, 100, 100)
        // }
      }
  
      moveUnicorn(num){
      //  ctx.clearRect(this.x, this.y, this.width, this.height);
       
        //If the up key is pressed and the unicorn is jumping, this happens.
        //Note, the unicorn is initially set to jumping as true. Therefore, the below
        //would only happen if the unicorn is already jumping and you press up again.
        if (controller.up && this.jumping === false) {
          // console.log("here")
          this.velocityY -= 50;
          this.jumping = true;
    
         }

        //If the left key is pressed, velocity increases (or decreases) by this amount
        if (controller.left) {
          this.x -= 0.10;
         }
         //If the right key is pressed, velocity increases (or decreases) by this amount
        if (controller.right) {
          this.x += 0.10;
         }

        
        // THEN THESE THINGS HAPPEN ONCE THE IFS ARE TESTED:
         this.velocityY += 0.55;// gravity
         this.x += this.velocityX; //
         this.y += this.velocityY;
         this.velocityX *= 0.9;// friction
         this.velocityY *= 0.9;// friction

      
        // If the unicorn is falling below floor line. Sets jumping to false. 
        // Unicorn starts at 450 on y, this makes sure it does not go past 450 (falling)
        if (this.y > 450) {
          this.jumping = false;
          this.y = 450;
          this.velocityY = 1.25;
        }
      
        // If unicorn is going off the left of the screen
        if (this.x < -30) {
          this.x = -30;
        } else if (this.x > 870) { // Stops unicorn from going past right boundary.
          this.x = 870;
        }  
        this.drawUnicorn();
      } // end of moveUnicorn function.
     } // end of Unicorn class.


    class Obstacle {
      constructor(x,y,width,height){
        this.x = 970;
        this.velocityX = 0;
        this.y = 450;
        this.width = 180;
        this.height = 160;
        this.img = '../images/evil-unicorn.png';
      }
  
      drawObstacle(){
        let obstacleImg = new Image();
        obstacleImg.src = this.img;
        ctx.drawImage(obstacleImg, this.x, this.y, this.width, this.height)
      }
  
      topXPosition(){
        return this.x;
      }
      topRightPosition(){
        return this.x + this.width;
      }
  
      topYPosition(){
        return this.y;
      }
      
      bottomYPosition(){
        return this.y + this.height;
      }

      } //End of Obstacle class.
     
// DETECT COLLISION ----------------------------------------------------

function detectCollision(obstacle){
 // If any of the below are false, return true. 
 // Statement 1: is the y of the unicorn greater than (lower than) the bottom position of the obstacle?.
 // Statement 2: is the current unicorn's x position and width less than the left x position of  
 // the obstacle?
 // Statement 3: is 
 
  return ((currentUnicorn.x + currentUnicorn.width - 75 > obstacle.topXPosition())
  && currentUnicorn.y + currentUnicorn.height - 100 > obstacle.topYPosition()) // && currentUnicorn.y + currentUnicorn.height < obstacle.bottomYPosition())
 }
 


 // BACKGROUND FUNCTIONS -----------------------------------------------------------------
  
 let background = new Image();
 background.src = '../images/forest01.png';
 
   
 let backgroundImage = {
  img: background,
  backgroundX: 0,
  speed: -1.5,
   
  move: function() {
    if (controller.right) {
      this.speed = -1.5;
      this.backgroundX += this.speed;
      this.backgroundX %= canvas.width;
    }

    if (controller.left) {
   this.speed = 1;   
   this.backgroundX += this.speed;
   this.backgroundX %= canvas.width;
    }

  //  if (this.backgroundX < 0) {
  //     this.backgroundX = 1025;
  //  } else if (this.backgroundX >= 1024) { // Stops unicorn from going past right boundary.
  //     this.backgroundX = 1023;
  //   }  

    //this.draw;
  },
   
  draw: function() {
    ctx.drawImage(this.img, this.backgroundX, 0);
     if (this.speed < 0) {
       ctx.drawImage(this.img, this.backgroundX + canvas.width, 0);
     } else {
         ctx.drawImage(this.img, this.backgroundX - canvas.width, 0);
     }
   },
 };
   
   
   function updateBackground() {
    backgroundImage.move();  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw();
      
     //requestAnimationFrame(updateBackground);
   }

   backgroundImage.onload = updateBackground;



  
 // CONTROLLER - ON KEYDOWN FUNCTION -------------------------------------------------------------------------
  
   
  controller = {
    left:false,
    right:false,
    up:false,
    unicornIdle: true,
    keyListener:function(event) {
      // When any key is pressed, the key state will be set to true. Conversely, if a key is released,
      //the key state will be false. Therefore, the controller values will become true
      //when a key is pressed. 
    let key_state = (event.type == "keydown") ? true:false;

    switch(event.keyCode) {
      case 37:// left key
        controller.left = key_state;
      break;
      case 38:// up key
        controller.up = key_state;
      break;
      case 39:// right key
        controller.right = key_state;
      break;
      }
     
    whereToGo = event.keycode;
    //currentGame.unicorn.moveUnicorn(whereToGo); 
    currentUnicorn.moveUnicorn(whereToGo);
     }

    }
  
  window.addEventListener("keydown", controller.keyListener)
  window.addEventListener("keyup", controller.keyListener);


  document.onkeydown = function (e) {
      //console.log('Your e is: ', e); 
      let whereToGo = e.keyCode;
      //currentGame.unicorn.moveUnicorn(whereToGo); 
      currentUnicorn.moveUnicorn(whereToGo);
    };

    
  // ON START BUTTON CLICK ------------------------------------------------------
  
  document.getElementById("start-button").onclick = function() {
    // Set start page display to none, and change canvas display to flex to appear.
    document.querySelector('.game-intro').style.display = "none";
    document.getElementById('game-board').style.display = "flex";
    
    startGame();
    // check to see if working
    console.log("start button clicked");
  }
    
  //--------------------------------------------------------------------------------------
  
  
  // START GAME FUNCTION ---------------------------------------------------------------------------
    
    function startGame() {
      //ctx.clearRect(0, 0, 1024, 600);
      //updateBackground();
      
      currentGame = new Game();
      currentUnicorn = new Unicorn();
      //currentObstacle = new Obstacle();

      currentGame.unicorn = currentUnicorn;
      // console.log(currentGame);
      //currentUnicorn.drawUnicorn();
      
      
      //currentObstacle.drawObstacle();
  
      console.log("game started");
  
      update();
    } // end of start game function ------------------
  
  
    
  // UPDATE ------------------------------------
    let frames = 0;
    
    function update(){
      // ctx.clearRect(0, 0 , 1024, 600);
      //currentUnicorn.drawUnicorn();  
    backgroundImage.move();  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw();

    currentUnicorn.drawUnicorn();
    currentUnicorn.moveUnicorn();
    frames ++;

      if (frames % 300 === 1) {
      let obstacle = new Obstacle(this.x, this.y, this.width, this.height);
      currentGame.obstacles.push(obstacle);
      }
      
      for (let i=0; i < currentGame.obstacles.length; i++){
        currentGame.obstacles[i].x -= 5
        currentGame.obstacles[i].drawObstacle();
        
        if(detectCollision(currentGame.obstacles[i])){
          alert("You hit the obstacle!");

          frames = 0;
          currentGame.score = 0;
          document.getElementById("score").innerHTML = currentGame.score;
  
          currentGame.obstacles = [];
          
          //document.querySelector('.game-intro').style.display = "flex";
          //document.getElementById('game-board').style.display = "none";

        }
  
        if(currentGame.obstacles[i].x <= 10){
          currentGame.obstacles.splice(i, 1);
          currentGame.score += 10;
          document.getElementById("score").innerHTML = currentGame.score;
        }


      }
      //currentObstacle.drawObstacle();
      //currentObstacle.x -= 0.75
      
     
      requestAnimationFrame(update);
  
    }
  
  } // end of window on-load function














